/*
 * app.js — 製作器主程式（多模板）
 * ------------------------------------------------------------------
 * 依 templates.js 的註冊表運作：全域設定、卡片欄位、預覽、下載都由模板 schema 驅動。
 * 每套模板各自存一份內容（切換不會互相覆蓋）。
 */
(function () {
  'use strict';

  var STORE_PREFIX = 'hanna_carousel_v3_';   // 每模板一份：..._A / ..._B
  var ACTIVE_KEY = 'hanna_active_v3';

  var HINTS = {
    A: '滿版真人照 + 鵝黃金字，文字沉左下。標題想讓關鍵字變<b>鵝黃</b>，用星號包住：<b>10 年喝掉 *54 萬*</b>。上傳照片會自動裁成 1080×1350。',
    B: '白底 + 去背產品圖 + 大數字（機會成本／對比）。上傳<b>去背 PNG</b>（透明背景）效果最好。「對比 VS」頁左右各放一張圖與大數字；文字可換行。',
  };

  // 把模板 CSS 注入頁面（切換時替換）
  var tplStyle = document.createElement('style');
  document.head.appendChild(tplStyle);

  // ── 狀態 ──
  var activeTemplate = loadActive();
  var state = loadState(activeTemplate) || window.TEMPLATES[activeTemplate].defaultState();
  var cur = 0;
  var openId = state.cards[0] && state.cards[0].id;

  function tpl() { return window.TEMPLATES[state.template]; }

  function loadActive() {
    try {
      var a = localStorage.getItem(ACTIVE_KEY);
      return (a && window.TEMPLATES[a]) ? a : 'A';
    } catch (e) { return 'A'; }
  }
  function saveActive() {
    try { localStorage.setItem(ACTIVE_KEY, activeTemplate); } catch (e) {}
  }
  function loadState(t) {
    try {
      var raw = localStorage.getItem(STORE_PREFIX + t);
      if (!raw) return null;
      var s = JSON.parse(raw);
      s.template = t;
      return s;
    } catch (e) { return null; }
  }
  function save() {
    var el = $('saveState');
    try {
      localStorage.setItem(STORE_PREFIX + state.template, JSON.stringify(state));
      el.textContent = '已自動儲存';
    } catch (e) {
      try {
        var stripped = JSON.parse(JSON.stringify(state));
        stripped.cards.forEach(function (c) {
          Object.keys(c).forEach(function (k) {
            if (typeof c[k] === 'string' && c[k].indexOf('data:image') === 0) c[k] = '';
          });
        });
        localStorage.setItem(STORE_PREFIX + state.template, JSON.stringify(stripped));
        el.textContent = '已存文字（照片過大未存，請盡快匯出）';
      } catch (e2) { el.textContent = '無法自動儲存'; }
    }
  }

  // ── DOM 小工具 ──
  function $(id) { return document.getElementById(id); }
  function el(html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  var toastTimer;
  function toast(msg) {
    var t = $('toast');
    t.textContent = msg; t.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('on'); }, 1800);
  }

  // ================================================================
  //  模板切換
  // ================================================================
  function buildTemplateSelect() {
    var sel = $('tplSelect');
    sel.innerHTML = '';
    window.TEMPLATE_ORDER.forEach(function (id) {
      var o = el('<option value="' + id + '">' + esc(window.TEMPLATES[id].name) + '</option>');
      sel.appendChild(o);
    });
    sel.value = activeTemplate;
    sel.addEventListener('change', function () {
      switchTemplate(sel.value);
    });
  }

  function switchTemplate(t) {
    if (t === state.template) return;
    save();                                  // 存目前模板
    activeTemplate = t;
    saveActive();
    state = loadState(t) || window.TEMPLATES[t].defaultState();
    cur = 0;
    openId = state.cards[0] && state.cards[0].id;
    buildAll();
    toast('已切換到「' + window.TEMPLATES[t].name + '」');
  }

  // ================================================================
  //  編輯區
  // ================================================================
  function buildEditor() {
    $('hintBlock').innerHTML = HINTS[state.template] || '';

    // 全域設定
    var sf = $('settingsFields');
    sf.innerHTML = '';
    tpl().settingsSchema.forEach(function (spec) {
      sf.appendChild(settingsField(spec));
    });

    // Caption
    $('setCaption').value = state.caption || '';

    // 新增卡片按鈕（依模板型態）
    var ab = $('addButtons');
    ab.innerHTML = '';
    tpl().types.forEach(function (ty) {
      if (ty.id === 'cover') return;   // 封面通常只有一張，不放快速新增
      var b = el('<button class="btn ghost sm">＋ ' + esc(ty.label) + '</button>');
      b.addEventListener('click', function () {
        var c = tpl().newCard(ty.id);
        state.cards.push(c);
        openId = c.id; cur = state.cards.length - 1;
        onStructureChange();
      });
      ab.appendChild(b);
    });

    // 卡片列表
    var list = $('cardList');
    list.innerHTML = '';
    state.cards.forEach(function (card, i) { list.appendChild(buildCardItem(card, i)); });
  }

  function settingsField(spec) {
    var f = el('<div class="field"><label>' + esc(spec.label) + '</label></div>');
    var input = el('<input type="text">');
    input.value = (state.settings[spec.key] != null) ? state.settings[spec.key] : '';
    input.addEventListener('input', function () {
      state.settings[spec.key] = input.value;
      buildPreview(); save();
    });
    f.appendChild(input);
    return f;
  }

  function buildCardItem(card, i) {
    var total = state.cards.length;
    var isOpen = card.id === openId;
    var typeLabel = (function () {
      var ty = tpl().types.filter(function (t) { return t.id === card.type; })[0];
      return ty ? ty.label : card.type;
    })();
    var kindCls = card.type === 'cover' ? '' : 'inner';

    var item = el('<div class="card-item ' + (isOpen ? 'open ' : '') + (i === cur ? 'active' : '') + '"></div>');

    var head = el(
      '<div class="card-head">' +
        '<span class="idx">' + (i + 1) + '</span>' +
        '<span class="kind ' + kindCls + '">' + esc(typeLabel) + '</span>' +
        '<span class="title-preview">' + esc(tpl().titlePreview(card) || '（空白）') + '</span>' +
        '<span class="chevron">▶</span>' +
      '</div>'
    );
    head.addEventListener('click', function () {
      openId = (openId === card.id) ? null : card.id;
      cur = i; buildEditor(); buildPreview();
    });
    item.appendChild(head);

    var body = el('<div class="card-body"></div>');

    // 類型
    var fType = el('<div class="field"><label>類型</label><select></select></div>');
    var sel = fType.querySelector('select');
    tpl().types.forEach(function (ty) {
      sel.appendChild(el('<option value="' + ty.id + '">' + esc(ty.label) + '</option>'));
    });
    sel.value = card.type;
    sel.addEventListener('change', function () {
      var d = tpl().newCard(sel.value);
      Object.keys(d).forEach(function (k) {
        if (k !== 'id' && k !== 'type' && !(k in card)) card[k] = d[k];
      });
      card.type = sel.value;
      onStructureChange();
    });
    body.appendChild(fType);

    // 欄位（依模板 schema）
    tpl().fields(card.type).forEach(function (spec) {
      if (spec.kind === 'image') body.appendChild(imageField(card, spec));
      else body.appendChild(textField(card, spec));
    });

    // 工具列
    var tools = el('<div class="card-tools"></div>');
    var up = el('<button class="btn ghost sm">▲ 上移</button>');
    var down = el('<button class="btn ghost sm">▼ 下移</button>');
    var del = el('<button class="btn danger sm">刪除此卡</button>');
    up.disabled = i === 0;
    down.disabled = i === total - 1;
    up.addEventListener('click', function () { moveCard(i, -1); });
    down.addEventListener('click', function () { moveCard(i, 1); });
    del.addEventListener('click', function () {
      if (total <= 1) { toast('至少要保留一張卡'); return; }
      state.cards.splice(i, 1);
      if (cur >= state.cards.length) cur = state.cards.length - 1;
      onStructureChange();
    });
    tools.appendChild(up); tools.appendChild(down); tools.appendChild(del);
    body.appendChild(tools);

    item.appendChild(body);
    return item;
  }

  function textField(card, spec) {
    var f = el('<div class="field"><label>' + esc(spec.label) + '</label></div>');
    var input = spec.kind === 'textarea'
      ? el('<textarea rows="3"></textarea>')
      : el('<input type="text">');
    input.value = card[spec.key] || '';
    input.addEventListener('input', function () {
      card[spec.key] = input.value;
      buildPreview();
      var itemHead = input.closest('.card-item').querySelector('.title-preview');
      if (itemHead) itemHead.textContent = tpl().titlePreview(card) || '（空白）';
      save();
    });
    f.appendChild(input);
    return f;
  }

  function imageField(card, spec) {
    var f = el('<div class="field"><label>' + esc(spec.label) + '</label></div>');
    var slot = el('<div class="photo-slot"></div>');
    var thumb = el('<div class="photo-thumb' + (spec.imageMode === 'transparent' ? ' transparent' : '') + '">' + (card[spec.key] ? '' : '未放') + '</div>');
    if (card[spec.key]) {
      thumb.style.backgroundImage = 'url(' + card[spec.key] + ')';
      thumb.style.backgroundSize = spec.imageMode === 'transparent' ? 'contain' : 'cover';
      thumb.style.backgroundRepeat = 'no-repeat';
      thumb.style.backgroundPosition = 'center';
    }
    var actions = el('<div class="photo-actions"></div>');
    var fileBtn = el('<label class="btn ghost sm btn-file">' + (card[spec.key] ? '更換' : '上傳') + '<input type="file" accept="image/*"></label>');
    var fileInput = fileBtn.querySelector('input');
    fileInput.addEventListener('change', function () {
      var fl = fileInput.files && fileInput.files[0];
      if (!fl) return;
      thumb.textContent = '處理中…';
      var job = spec.imageMode === 'transparent'
        ? window.fitPhoto(fl, 1000)
        : window.cropPhoto(fl, 0.10);
      job.then(function (dataURL) {
        card[spec.key] = dataURL;
        buildEditor(); buildPreview(); save();
        toast(spec.imageMode === 'transparent' ? '去背圖已放入' : '照片已裁成 1080×1350');
      }).catch(function () { thumb.textContent = '失敗'; toast('圖片處理失敗'); });
      fileInput.value = '';
    });
    actions.appendChild(fileBtn);
    if (card[spec.key]) {
      var rm = el('<button class="btn danger sm">移除</button>');
      rm.addEventListener('click', function () {
        card[spec.key] = ''; buildEditor(); buildPreview(); save();
      });
      actions.appendChild(rm);
    }
    slot.appendChild(thumb); slot.appendChild(actions);
    f.appendChild(slot);
    return f;
  }

  function moveCard(i, dir) {
    var j = i + dir;
    if (j < 0 || j >= state.cards.length) return;
    var tmp = state.cards[i]; state.cards[i] = state.cards[j]; state.cards[j] = tmp;
    cur = j; onStructureChange();
  }

  function onStructureChange() { buildEditor(); buildPreview(); save(); }

  // ================================================================
  //  預覽區
  // ================================================================
  function buildPreview() {
    tplStyle.textContent = tpl().css;

    var total = state.cards.length;
    if (cur >= total) cur = total - 1;
    if (cur < 0) cur = 0;

    var stage = $('stage');
    stage.innerHTML = state.cards
      .map(function (c, i) { return tpl().render(c, i, total, state.settings, i === cur); })
      .join('');

    var dots = $('dots');
    dots.innerHTML = '';
    state.cards.forEach(function (_, i) {
      var d = el('<div class="dot ' + (i === cur ? 'on' : '') + '"></div>');
      d.addEventListener('click', function () { showCard(i); });
      dots.appendChild(d);
    });

    $('capPreview').textContent = state.caption || '';
    fit();
  }

  function showCard(i) {
    var total = state.cards.length;
    cur = (i + total) % total;
    document.querySelectorAll('#stage .slide').forEach(function (c, k) { c.classList.toggle('on', k === cur); });
    document.querySelectorAll('#dots .dot').forEach(function (d, k) { d.classList.toggle('on', k === cur); });
    document.querySelectorAll('#cardList .card-item').forEach(function (it, k) { it.classList.toggle('active', k === cur); });
  }

  function fit() {
    var wrap = document.querySelector('.stage-wrap');
    var box = $('stageBox'), stage = $('stage');
    var avail = Math.min(wrap.clientWidth, 560);
    var s = Math.min(avail / 1080, (window.innerHeight * 0.66) / 1350);
    stage.style.transform = 'scale(' + s + ')';
    box.style.width = 1080 * s + 'px';
    box.style.height = 1350 * s + 'px';
  }
  window.addEventListener('resize', fit);

  // ================================================================
  //  下載 PNG
  // ================================================================
  function downloadCard(index) {
    var cardEl = document.querySelectorAll('#stage .slide')[index];
    if (!cardEl) return Promise.resolve();
    var seed = (state.settings.account || state.settings.signature || 'hanna').replace(/[^a-zA-Z0-9_]/g, '') || 'hanna';
    var name = seed + '_' + String(index + 1).padStart(2, '0') + '.png';
    var bg = tpl().bg || '#000';
    var ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    return ready.then(function () {
      var clone = cardEl.cloneNode(true);
      Object.assign(clone.style, { position: 'fixed', left: '-9999px', top: '0', transform: 'none', display: 'block' });
      document.body.appendChild(clone);
      return window.html2canvas(clone, { scale: 1, backgroundColor: bg, useCORS: true, logging: false })
        .then(function (canvas) {
          document.body.removeChild(clone);
          return new Promise(function (res) {
            canvas.toBlob(function (b) {
              var a = document.createElement('a');
              a.href = URL.createObjectURL(b); a.download = name; a.click();
              URL.revokeObjectURL(a.href); res();
            }, 'image/png');
          });
        });
    });
  }

  function exportHTML() {
    var html = window.buildStandaloneHTML(state);
    var seed = (state.settings.account || state.settings.signature || 'hanna').replace(/[^a-zA-Z0-9_]/g, '') || 'hanna';
    var blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = seed + '_' + state.template + '_carousel.html';
    a.click();
    URL.revokeObjectURL(a.href);
    toast('已匯出獨立 HTML');
  }

  // ================================================================
  //  事件
  // ================================================================
  function bind() {
    $('setCaption').addEventListener('input', function () {
      state.caption = this.value; $('capPreview').textContent = this.value; save();
    });
    $('btnFillHashtag').addEventListener('click', function () {
      var tag = (state.settings.hashtag || '').trim();
      if (!tag) { toast('先在全域設定填主題 Hashtag'); return; }
      var cap = (state.caption || '').replace(/\s*$/, '');
      if (!new RegExp(tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*$').test(cap)) {
        cap += '\n\n' + tag;
      }
      state.caption = cap; $('setCaption').value = cap; $('capPreview').textContent = cap; save();
    });

    $('pvPrev').addEventListener('click', function () { showCard(cur - 1); });
    $('pvNext').addEventListener('click', function () { showCard(cur + 1); });
    window.addEventListener('keydown', function (e) {
      if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      if (e.key === 'ArrowLeft') showCard(cur - 1);
      if (e.key === 'ArrowRight') showCard(cur + 1);
    });

    $('dlOne').addEventListener('click', function () { toast('產生 PNG 中…'); downloadCard(cur); });
    $('dlAll').addEventListener('click', function () {
      toast('產生全部 PNG 中…');
      var p = Promise.resolve();
      state.cards.forEach(function (_, i) { p = p.then(function () { return downloadCard(i); }); });
    });
    $('copyCap').addEventListener('click', function () {
      navigator.clipboard.writeText(state.caption || '').then(
        function () { toast('Caption 已複製'); },
        function () { toast('複製失敗，請手動選取'); }
      );
    });

    $('btnExport').addEventListener('click', exportHTML);
    $('btnReset').addEventListener('click', function () {
      if (!confirm('確定要清空「' + tpl().name + '」的內容、恢復預設範例嗎？')) return;
      state = window.TEMPLATES[state.template].defaultState();
      cur = 0; openId = state.cards[0].id;
      buildAll(); toast('已重設此模板');
    });
  }

  function buildAll() { buildEditor(); buildPreview(); }

  // ── 啟動 ──
  buildTemplateSelect();
  buildAll();
  bind();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
})();
