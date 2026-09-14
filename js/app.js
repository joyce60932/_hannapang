/*
 * app.js — 製作器主程式
 * ------------------------------------------------------------------
 * 狀態管理 + 編輯介面 + 即時預覽 + 下載 PNG + 匯出獨立 HTML。
 * 卡片視覺來自 card-style.js / render.js，這裡只負責操作與資料。
 */
(function () {
  'use strict';

  var STORE_KEY = 'hanna_carousel_v1';

  // 把卡片設計系統 CSS 注入頁面，讓預覽與匯出長得一致
  (function injectCardCSS() {
    var style = document.createElement('style');
    style.textContent = window.CARD_CSS;
    document.head.appendChild(style);
  })();

  // ── 預設內容（第一次開啟時的範例，之後可整段替換）──
  function defaultState() {
    return {
      settings: {
        seriesLabel: 'HANNA STORY ✦',
        account: '@_hannapang',
        hashtag: '#理財知識',
      },
      caption:
        '存不到錢\n不是你賺得不夠\n\n' +
        '是沒有第一桶本金\n再拼都像倉鼠跑滾輪\n跑得再快，還是停在原地\n\n' +
        '能利滾利的是錢\n不是你的體力\n\n' +
        '想存出第一桶\n再讓錢自己滾\n留言「+7」，我把完整流程私訊給你\n\n' +
        '#理財知識',
      cards: [
        {
          id: uid(), type: 'cover', anchor: '第一桶金',
          head: '存不到錢\n不是你*賺得不夠*', body: '', close: '而是還沒開始', credit: '', img: '',
        },
        {
          id: uid(), type: 'inner', anchor: '倉鼠滾輪',
          head: '再拼都像*跑滾輪*',
          body: '沒有第一桶本金，跑得再快，還是停在原地。能利滾利的是錢，不是你的體力。',
          close: '先存本金，再讓錢滾錢', credit: '', img: '',
        },
        {
          id: uid(), type: 'cta', anchor: '換你了',
          head: '想存出第一桶金？',
          body: '留言「+7」，我把完整流程私訊給你。',
          close: '留言告訴我', credit: '', img: '',
        },
      ],
    };
  }

  function uid() {
    return 'c' + Math.random().toString(36).slice(2, 9);
  }

  // ── 讀取 / 儲存 ──
  var state = load() || defaultState();
  var cur = 0;                 // 目前預覽的卡片 index
  var openId = state.cards[0] && state.cards[0].id;  // 目前展開的編輯卡

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function save() {
    var el = document.getElementById('saveState');
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
      el.textContent = '已自動儲存';
    } catch (e) {
      // 圖片太多會超過 localStorage 容量 → 退而只存文字
      try {
        var stripped = JSON.parse(JSON.stringify(state));
        stripped.cards.forEach(function (c) { c.img = ''; });
        localStorage.setItem(STORE_KEY, JSON.stringify(stripped));
        el.textContent = '已存文字（照片過大未存，請盡快匯出）';
      } catch (e2) {
        el.textContent = '無法自動儲存';
      }
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
    t.textContent = msg;
    t.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('on'); }, 1800);
  }

  var KIND_LABEL = { cover: '封面', inner: '內頁', cta: 'CTA' };

  // ================================================================
  //  編輯區
  // ================================================================
  function buildEditor() {
    // 全域設定
    $('setSeries').value = state.settings.seriesLabel;
    $('setAccount').value = state.settings.account;
    $('setHashtag').value = state.settings.hashtag;
    $('setCaption').value = state.caption;

    var list = $('cardList');
    list.innerHTML = '';
    state.cards.forEach(function (card, i) {
      list.appendChild(buildCardItem(card, i));
    });
  }

  function titlePreview(card) {
    var t = (card.anchor || '') + ' ' + (card.head || '');
    t = t.replace(/\*/g, '').replace(/\n/g, ' ').trim();
    return t || '（空白）';
  }

  function buildCardItem(card, i) {
    var total = state.cards.length;
    var kindCls = card.type === 'cover' ? '' : 'inner';
    var isOpen = card.id === openId;

    var item = el(
      '<div class="card-item ' + (isOpen ? 'open ' : '') + (i === cur ? 'active' : '') + '"></div>'
    );

    // 標頭
    var head = el(
      '<div class="card-head">' +
        '<span class="idx">' + (i + 1) + '</span>' +
        '<span class="kind ' + kindCls + '">' + KIND_LABEL[card.type] + '</span>' +
        '<span class="title-preview">' + esc(titlePreview(card)) + '</span>' +
        '<span class="chevron">▶</span>' +
      '</div>'
    );
    head.addEventListener('click', function () {
      openId = (openId === card.id) ? null : card.id;
      cur = i;
      buildEditor();
      buildPreview();
    });
    item.appendChild(head);

    // 內容
    var body = el('<div class="card-body"></div>');

    // 類型
    var fType = el(
      '<div class="field"><label>類型</label>' +
        '<select>' +
          '<option value="cover">封面（上→下漸層，字沉左下）</option>' +
          '<option value="inner">內頁（整片均勻遮罩，字沉左下）</option>' +
          '<option value="cta">CTA（均勻遮罩，收尾置中）</option>' +
        '</select></div>'
    );
    var sel = fType.querySelector('select');
    sel.value = card.type;
    sel.addEventListener('change', function () {
      card.type = sel.value;
      onStructureChange();
    });
    body.appendChild(fType);

    // 照片
    var thumb = el(
      '<div class="photo-thumb">' + (card.img ? '' : '未放照片') + '</div>'
    );
    if (card.img) thumb.style.backgroundImage = 'url(' + card.img + ')';
    var slot = el('<div class="photo-slot"></div>');
    var actions = el('<div class="photo-actions"></div>');
    var fileBtn = el(
      '<label class="btn ghost sm btn-file">' + (card.img ? '更換照片' : '上傳照片') +
        '<input type="file" accept="image/*"></label>'
    );
    var fileInput = fileBtn.querySelector('input');
    fileInput.addEventListener('change', function () {
      var f = fileInput.files && fileInput.files[0];
      if (!f) return;
      thumb.textContent = '處理中…';
      window.cropPhoto(f, 0.10).then(function (dataURL) {
        card.img = dataURL;
        thumb.textContent = '';
        thumb.style.backgroundImage = 'url(' + dataURL + ')';
        fileBtn.firstChild.textContent = '更換照片';
        buildPreview();
        save();
        toast('照片已裁成 1080×1350');
      }).catch(function () {
        thumb.textContent = '失敗';
        toast('照片處理失敗');
      });
      fileInput.value = '';
    });
    actions.appendChild(fileBtn);
    if (card.img) {
      var rm = el('<button class="btn danger sm">移除照片</button>');
      rm.addEventListener('click', function () {
        card.img = '';
        buildEditor();
        buildPreview();
        save();
      });
      actions.appendChild(rm);
    }
    slot.appendChild(thumb);
    slot.appendChild(actions);
    body.appendChild(slot);

    // 文字欄位
    body.appendChild(textField(card, 'anchor', '錨點（歌名／主題詞）', 'input'));
    body.appendChild(textField(card, 'head', '標題（關鍵字用 *星號* 包 → 變鵝黃）', 'input'));
    body.appendChild(textField(card, 'body', '內文（可換行；建議寫成連續段落）', 'textarea'));
    body.appendChild(textField(card, 'close', '收尾句', 'input'));
    body.appendChild(textField(card, 'credit', 'Photo credit（非本人照才填，可留空）', 'input'));

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
    tools.appendChild(up);
    tools.appendChild(down);
    tools.appendChild(del);
    body.appendChild(tools);

    item.appendChild(body);
    return item;
  }

  // 一個文字欄位，input 事件即時更新 state + 預覽（不重建編輯區，保留焦點）
  function textField(card, key, label, kind) {
    var f = el('<div class="field"><label>' + esc(label) + '</label></div>');
    var input =
      kind === 'textarea'
        ? el('<textarea rows="3"></textarea>')
        : el('<input type="text">');
    input.value = card[key] || '';
    input.addEventListener('input', function () {
      card[key] = input.value;
      buildPreview();
      // 更新此卡標頭的預覽字
      var itemHead = input.closest('.card-item').querySelector('.title-preview');
      if (itemHead) itemHead.textContent = titlePreview(card);
      save();
    });
    f.appendChild(input);
    return f;
  }

  function moveCard(i, dir) {
    var j = i + dir;
    if (j < 0 || j >= state.cards.length) return;
    var tmp = state.cards[i];
    state.cards[i] = state.cards[j];
    state.cards[j] = tmp;
    cur = j;
    onStructureChange();
  }

  function onStructureChange() {
    buildEditor();
    buildPreview();
    save();
  }

  // ================================================================
  //  預覽區
  // ================================================================
  function buildPreview() {
    var total = state.cards.length;
    if (cur >= total) cur = total - 1;
    if (cur < 0) cur = 0;

    var stage = $('stage');
    stage.innerHTML = state.cards
      .map(function (c, i) {
        return window.renderCardHTML(c, i, total, state.settings, i === cur);
      })
      .join('');

    var dots = $('dots');
    dots.innerHTML = '';
    state.cards.forEach(function (_, i) {
      var d = el('<div class="dot ' + (i === cur ? 'on' : '') + '"></div>');
      d.addEventListener('click', function () { showCard(i); });
      dots.appendChild(d);
    });

    updateCaptionPreview();
    fit();
  }

  function showCard(i) {
    var total = state.cards.length;
    cur = (i + total) % total;
    var cards = document.querySelectorAll('#stage .card');
    var dots = document.querySelectorAll('#dots .dot');
    cards.forEach(function (c, k) { c.classList.toggle('on', k === cur); });
    dots.forEach(function (d, k) { d.classList.toggle('on', k === cur); });
    // 同步編輯區的 active 標示
    var items = document.querySelectorAll('#cardList .card-item');
    items.forEach(function (it, k) { it.classList.toggle('active', k === cur); });
  }

  function fit() {
    var wrap = document.querySelector('.stage-wrap');
    var box = $('stageBox');
    var stage = $('stage');
    var avail = Math.min(wrap.clientWidth, 560);
    var s = Math.min(avail / 1080, (window.innerHeight * 0.66) / 1350);
    stage.style.transform = 'scale(' + s + ')';
    box.style.width = 1080 * s + 'px';
    box.style.height = 1350 * s + 'px';
  }
  window.addEventListener('resize', fit);

  // ── Caption ──
  function fullCaption() {
    return state.caption || '';
  }
  function updateCaptionPreview() {
    $('capPreview').textContent = fullCaption();
  }

  // ================================================================
  //  下載 PNG（html2canvas，規格 §8）
  // ================================================================
  function downloadCard(index) {
    var cardEl = document.querySelectorAll('#stage .card')[index];
    if (!cardEl) return Promise.resolve();
    var accountSafe = (state.settings.account || 'hanna').replace(/[^a-zA-Z0-9_]/g, '') || 'hanna';
    var name = accountSafe + '_' + String(index + 1).padStart(2, '0') + '.png';
    var ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    return ready.then(function () {
      var clone = cardEl.cloneNode(true);
      Object.assign(clone.style, {
        position: 'fixed', left: '-9999px', top: '0', transform: 'none', display: 'block',
      });
      document.body.appendChild(clone);
      return window.html2canvas(clone, {
        scale: 1, backgroundColor: '#000', useCORS: true, logging: false,
      }).then(function (canvas) {
        document.body.removeChild(clone);
        return new Promise(function (res) {
          canvas.toBlob(function (b) {
            var a = document.createElement('a');
            a.href = URL.createObjectURL(b);
            a.download = name;
            a.click();
            URL.revokeObjectURL(a.href);
            res();
          }, 'image/png');
        });
      });
    });
  }

  // ================================================================
  //  匯出獨立 HTML
  // ================================================================
  function exportHTML() {
    var html = window.buildStandaloneHTML(state);
    var blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    var a = document.createElement('a');
    var accountSafe = (state.settings.account || 'hanna').replace(/[^a-zA-Z0-9_]/g, '') || 'hanna';
    a.href = URL.createObjectURL(blob);
    a.download = accountSafe + '_carousel.html';
    a.click();
    URL.revokeObjectURL(a.href);
    toast('已匯出獨立 HTML');
  }

  // ================================================================
  //  事件綁定
  // ================================================================
  function bind() {
    $('setSeries').addEventListener('input', function () {
      state.settings.seriesLabel = this.value; buildPreview(); save();
    });
    $('setAccount').addEventListener('input', function () {
      state.settings.account = this.value; buildPreview(); save();
    });
    $('setHashtag').addEventListener('input', function () {
      state.settings.hashtag = this.value; save();
    });
    $('setCaption').addEventListener('input', function () {
      state.caption = this.value; updateCaptionPreview(); save();
    });
    $('btnFillHashtag').addEventListener('click', function () {
      var tag = (state.settings.hashtag || '').trim();
      if (!tag) { toast('先在全域設定填主題 Hashtag'); return; }
      var cap = state.caption.replace(/\s*$/, '');
      // 若末行已是同一個 tag 就不重複加
      if (!new RegExp(tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*$').test(cap)) {
        cap += '\n\n' + tag;
      }
      state.caption = cap;
      $('setCaption').value = cap;
      updateCaptionPreview();
      save();
    });

    $('btnAddInner').addEventListener('click', function () {
      var c = { id: uid(), type: 'inner', anchor: '', head: '', body: '', close: '', credit: '', img: '' };
      state.cards.push(c);
      openId = c.id; cur = state.cards.length - 1;
      onStructureChange();
    });
    $('btnAddCta').addEventListener('click', function () {
      var c = { id: uid(), type: 'cta', anchor: '', head: '', body: '', close: '', credit: '', img: '' };
      state.cards.push(c);
      openId = c.id; cur = state.cards.length - 1;
      onStructureChange();
    });

    $('pvPrev').addEventListener('click', function () { showCard(cur - 1); });
    $('pvNext').addEventListener('click', function () { showCard(cur + 1); });
    window.addEventListener('keydown', function (e) {
      if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      if (e.key === 'ArrowLeft') showCard(cur - 1);
      if (e.key === 'ArrowRight') showCard(cur + 1);
    });

    $('dlOne').addEventListener('click', function () {
      toast('產生 PNG 中…');
      downloadCard(cur);
    });
    $('dlAll').addEventListener('click', function () {
      toast('產生全部 PNG 中…');
      var p = Promise.resolve();
      state.cards.forEach(function (_, i) {
        p = p.then(function () { return downloadCard(i); });
      });
    });
    $('copyCap').addEventListener('click', function () {
      navigator.clipboard.writeText(fullCaption()).then(function () {
        toast('Caption 已複製');
      }, function () {
        toast('複製失敗，請手動選取');
      });
    });

    $('btnExport').addEventListener('click', exportHTML);
    $('btnReset').addEventListener('click', function () {
      if (!confirm('確定要清空所有內容、恢復預設範例嗎？')) return;
      state = defaultState();
      cur = 0;
      openId = state.cards[0].id;
      buildEditor();
      buildPreview();
      save();
      toast('已重設');
    });
  }

  // ── 啟動 ──
  buildEditor();
  buildPreview();
  bind();
  // 字型載入後重畫一次，避免預覽字寬跑掉
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fit);
  }
})();
