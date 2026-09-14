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
})(window);
