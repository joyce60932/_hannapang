/*
 * photo.js
 * ------------------------------------------------------------------
 * 瀏覽器內把照片預裁成「精確 1080×1350（4:5）」+ 壓縮成 base64（規格 §6）。
 *
 * 為什麼在瀏覽器裁：html2canvas 會忽略 CSS object-fit，直式照直接塞會被拉扁。
 * 所以照片框比例必須＝卡片比例。原本規格用 Python 預裁，這裡改用 canvas 裁，
 * 效果一樣、還不用另外跑 Python。
 *
 *   - 太寬 → 裁左右（置中）
 *   - 太高 → 裁上下，保留上半的臉（topBias 越小保留越多上半）
 *   - JPEG 品質由高往下降，壓到 ≤ ~400KB（規格 §6 規則三）
 */
(function (global) {
  'use strict';

  var OUT_W = 1080;
  var OUT_H = 1350;
  var RATIO = OUT_W / OUT_H; // 0.8
  var MAX_KB = 400;

  function dataURLBytes(dataURL) {
    // base64 內容長度 * 3/4 ≈ 位元組數
    var i = dataURL.indexOf(',');
    var b64 = i >= 0 ? dataURL.slice(i + 1) : dataURL;
    return Math.floor((b64.length * 3) / 4);
  }

  function loadImage(src) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () { resolve(img); };
      img.onerror = function () { reject(new Error('圖片讀取失敗')); };
      img.src = src;
    });
  }

  function fileToDataURL(file) {
    return new Promise(function (resolve, reject) {
      var fr = new FileReader();
      fr.onload = function () { resolve(fr.result); };
      fr.onerror = function () { reject(new Error('檔案讀取失敗')); };
      fr.readAsDataURL(file);
    });
  }

  /**
   * 把一個 File / dataURL 裁成 1080×1350 的 base64 JPEG。
   * @param {File|string} input   File 物件或 dataURL 字串
   * @param {number} topBias      裁上下時保留上半的比例（0~1，預設 0.10）
   * @returns {Promise<string>}   data:image/jpeg;base64,...
   */
  function cropPhoto(input, topBias) {
    if (topBias == null) topBias = 0.10;

    var srcPromise =
      typeof input === 'string' ? Promise.resolve(input) : fileToDataURL(input);

    return srcPromise.then(loadImage).then(function (im) {
      var W = im.naturalWidth;
      var H = im.naturalHeight;
      var sx, sy, sw, sh;

      if (W / H > RATIO) {
        // 太寬 → 裁左右
        sw = Math.round(H * RATIO);
        sh = H;
        sx = Math.round((W - sw) * 0.5);
        sy = 0;
      } else {
        // 太高 → 裁上下，保留上半的臉
        sw = W;
        sh = Math.round(W / RATIO);
        sx = 0;
        sy = Math.round((H - sh) * topBias);
      }

      var canvas = document.createElement('canvas');
      canvas.width = OUT_W;
      canvas.height = OUT_H;
      var ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(im, sx, sy, sw, sh, 0, 0, OUT_W, OUT_H);

      // 品質由 0.92 往下降，壓到 ≤ 400KB
      var q = 0.92;
      var out = canvas.toDataURL('image/jpeg', q);
      while (dataURLBytes(out) / 1024 > MAX_KB && q > 0.4) {
        q -= 0.07;
        out = canvas.toDataURL('image/jpeg', q);
      }
      return out;
    });
  }

  global.cropPhoto = cropPhoto;

  /**
   * 極簡白模板用：把去背 PNG 等比縮到 maxDim 內、保留透明背景、輸出 PNG。
   * 不裁切（產品/物件圖要完整），太大就再縮一級。
   * @param {File|string} input
   * @param {number} maxDim 最長邊上限（預設 1000）
   * @returns {Promise<string>} data:image/png;base64,...
   */
  function fitPhoto(input, maxDim) {
    if (maxDim == null) maxDim = 1000;
    var srcPromise =
      typeof input === 'string' ? Promise.resolve(input) : fileToDataURL(input);

    return srcPromise.then(loadImage).then(function (im) {
      function renderAt(dim) {
        var W = im.naturalWidth, H = im.naturalHeight;
        var scale = Math.min(1, dim / Math.max(W, H));
        var w = Math.max(1, Math.round(W * scale));
        var h = Math.max(1, Math.round(H * scale));
        var canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        var ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.clearRect(0, 0, w, h);           // 保留透明
        ctx.drawImage(im, 0, 0, w, h);
        return canvas.toDataURL('image/png');
      }
      var dim = maxDim;
      var out = renderAt(dim);
      // PNG 無法調品質，太大就縮尺寸（上限 ~700KB）
      while (dataURLBytes(out) / 1024 > 700 && dim > 500) {
        dim -= 150;
        out = renderAt(dim);
      }
      return out;
    });
  }

  global.fitPhoto = fitPhoto;

  /**
   * 一鍵去背（適合「單色/白底」商品照）。
   * 從四邊往內 flood fill，把與背景色相近、且和邊緣相連的像素設為透明，
   * 主體內部的白色不會被誤刪；邊緣做一階羽化。
   * 對灰牆、複雜背景效果有限（需要真正的去背 App）。
   * @param {File|string} input
   * @param {object} opts { maxDim=1000, tolerance=48 }
   * @returns {Promise<string>} 透明 PNG data URI
   */
  function removeSolidBg(input, opts) {
    opts = opts || {};
    var maxDim = opts.maxDim || 1000;
    var tol = opts.tolerance || 48;
    var tol2 = tol + 34;                       // 羽化外緣
    var srcPromise = typeof input === 'string' ? Promise.resolve(input) : fileToDataURL(input);

    return srcPromise.then(loadImage).then(function (im) {
      var scale = Math.min(1, maxDim / Math.max(im.naturalWidth, im.naturalHeight));
      var w = Math.max(1, Math.round(im.naturalWidth * scale));
      var h = Math.max(1, Math.round(im.naturalHeight * scale));
      var canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(im, 0, 0, w, h);
      var id = ctx.getImageData(0, 0, w, h);
      var d = id.data;
      var N = w * h;

      // 背景色 = 四角平均
      function rgbAt(p) { var i = p * 4; return [d[i], d[i + 1], d[i + 2]]; }
      var cs = [rgbAt(0), rgbAt(w - 1), rgbAt((h - 1) * w), rgbAt(N - 1)];
      var bg = [0, 0, 0];
      cs.forEach(function (c) { bg[0] += c[0]; bg[1] += c[1]; bg[2] += c[2]; });
      bg = [bg[0] / 4, bg[1] / 4, bg[2] / 4];
      function distP(p) {
        var i = p * 4, dr = d[i] - bg[0], dg = d[i + 1] - bg[1], db = d[i + 2] - bg[2];
        return Math.sqrt(dr * dr + dg * dg + db * db);
      }

      var stateArr = new Uint8Array(N);         // 0 未定, 1 背景(透明)
      var stack = [];
      function seed(x, y) { var p = y * w + x; if (!stateArr[p] && distP(p) < tol) { stateArr[p] = 1; stack.push(p); } }
      for (var x = 0; x < w; x++) { seed(x, 0); seed(x, h - 1); }
      for (var y = 0; y < h; y++) { seed(0, y); seed(w - 1, y); }
      while (stack.length) {
        var p = stack.pop(); var px = p % w, py = (p - px) / w;
        if (px > 0) { var l = p - 1; if (!stateArr[l] && distP(l) < tol) { stateArr[l] = 1; stack.push(l); } }
        if (px < w - 1) { var r = p + 1; if (!stateArr[r] && distP(r) < tol) { stateArr[r] = 1; stack.push(r); } }
        if (py > 0) { var u = p - w; if (!stateArr[u] && distP(u) < tol) { stateArr[u] = 1; stack.push(u); } }
        if (py < h - 1) { var dn = p + w; if (!stateArr[dn] && distP(dn) < tol) { stateArr[dn] = 1; stack.push(dn); } }
      }

      for (var q = 0; q < N; q++) {
        var i4 = q * 4;
        if (stateArr[q] === 1) { d[i4 + 3] = 0; continue; }
        var dd = distP(q);
        if (dd < tol2) {                          // 邊緣羽化：靠近背景且鄰接透明區
          var qx = q % w, qy = (q - qx) / w, adj = false;
          if (qx > 0 && stateArr[q - 1] === 1) adj = true;
          else if (qx < w - 1 && stateArr[q + 1] === 1) adj = true;
          else if (qy > 0 && stateArr[q - w] === 1) adj = true;
          else if (qy < h - 1 && stateArr[q + w] === 1) adj = true;
          if (adj) {
            var a = Math.round(((dd - tol) / (tol2 - tol)) * 255);
            d[i4 + 3] = Math.max(0, Math.min(255, a));
          }
        }
      }

      ctx.putImageData(id, 0, 0);
      var out = canvas.toDataURL('image/png');
      // 太大再縮一次（透明 PNG 用 fitPhoto 二次壓）
      if (dataURLBytes(out) / 1024 > 700) return fitPhoto(out, 800);
      return out;
    });
  }

  global.removeSolidBg = removeSolidBg;
})(window);
