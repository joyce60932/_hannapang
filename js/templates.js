/*
 * templates.js — 模板註冊表
 * ------------------------------------------------------------------
 * 每套模板定義：CSS、字型、卡片型態、編輯欄位 schema、render()、預設內容。
 * 製作器（app.js）與匯出（export.js）都照這張表運作，之後要加第三套只要在這裡加一個物件。
 *
 *   A：黑金真人照（故事風）—— 滿版真人照 + 鵝黃金字，文字沉左下
 *   B：極簡白對比（機會成本）—— 白底 + 去背產品圖 + 大數字，置中堆疊 / 左右 VS
 */
(function (global) {
  'use strict';

  // 共用文字工具
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function emphasize(s) { return s.replace(/\*([^*]+)\*/g, '<em>$1</em>'); }
  function nl2br(s) { return s.replace(/\r?\n/g, '<br>'); }
  function fmtText(s) { return nl2br(esc(s)); }
  function fmtHead(s) { return nl2br(emphasize(esc(s))); }
  function pad2(n) { return String(n).padStart(2, '0'); }

  function uid() { return 'c' + Math.random().toString(36).slice(2, 9); }

  // 取內建插圖（assets.js），沒有就回空字串
  function art(name) { return (global.ART && global.ART[name]) || ''; }

  // ================================================================
  //  模板 B：極簡白對比
  // ================================================================
  var CSS_B = `
  .bcard{
    position:relative; width:1080px; height:1350px;
    background:#f5f4f1; color:#1b1b1b;
    font-family:'Noto Sans TC',sans-serif; overflow:hidden;
  }
  /* 頂部標語（每頁置中）*/
  .bcard .b-top{
    position:absolute; top:60px; left:0; right:0; text-align:center;
    font-size:30px; font-weight:500; letter-spacing:.32em; color:#3a3a3a;
  }
  /* 右上頁碼 pill */
  .bcard .b-page{
    position:absolute; top:52px; right:56px;
    background:#8b8b8b; color:#fff; border-radius:999px;
    padding:7px 20px; font-size:26px; letter-spacing:.04em;
  }
  /* 中間主區：垂直置中 */
  .bcard .b-main{
    position:absolute; left:0; right:0; top:150px; bottom:230px;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    padding:0 80px; text-align:center;
  }
  /* 底部署名 */
  .bcard .b-sign{
    position:absolute; left:0; right:0; bottom:74px; text-align:center;
  }
  .bcard .b-rule{width:42px; height:1px; background:#c3c0ba; margin:0 auto 22px;}
  .bcard .b-name{
    font-family:'Noto Serif TC',serif; font-weight:500; font-size:30px;
    letter-spacing:.36em; color:#2a2a2a; padding-left:.36em;
  }
  .bcard .b-foot{margin-top:14px; font-size:20px; color:#a2a2a2; letter-spacing:.05em;}

  /* 去背圖 */
  .bcard .b-photo{display:flex; align-items:center; justify-content:center;}
  .bcard .b-photo img{max-width:100%; max-height:100%; object-fit:contain;}
  .bcard .b-photo-empty{
    border:1.5px dashed #ccc8c0; border-radius:16px; color:#b0aca3;
    font-size:26px; letter-spacing:.1em; padding:40px;
  }

  /* 封面 */
  .bcard .b-cover-img{width:100%; height:440px; margin-bottom:56px;}
  .bcard .b-title{
    font-size:70px; font-weight:400; line-height:1.34; color:#1a1a1a; letter-spacing:.02em;
  }
  .bcard .b-price{margin-top:30px; font-size:32px; font-weight:400; color:#8a8a8a; letter-spacing:.04em;}
  .bcard .b-note{margin-top:30px; font-size:27px; line-height:1.7; color:#adaba4;}

  /* 對比 */
  .bcard .b-compare{position:relative; display:flex; width:100%; align-items:flex-start;}
  .bcard .b-col{flex:1; text-align:center; padding:0 30px;}
  .bcard .b-col-r{border-left:1px solid #dedbd4;}
  .bcard .b-col .b-photo{height:300px; margin-bottom:34px;}
  .bcard .b-label{font-size:33px; font-weight:500; color:#2a2a2a;}
  .bcard .b-minirule{width:26px; height:1px; background:#cfccc5; margin:16px auto;}
  .bcard .b-cprice{font-size:42px; font-weight:600; color:#1a1a1a;}
  .bcard .b-cap{font-size:25px; color:#9a9a9a; margin-top:6px;}
  .bcard .b-big{font-size:60px; font-weight:600; color:#1a1a1a; margin-top:4px;}
  .bcard .b-vs{
    position:absolute; left:50%; top:150px; transform:translate(-50%,-50%);
    background:#f5f4f1; padding:8px 12px;
    font-size:34px; font-weight:500; letter-spacing:.08em; color:#8a8a8a;
  }
  .bcard .b-compare-note{
    margin-top:56px; font-size:27px; line-height:1.7; color:#9a9a9a; text-align:center; width:100%;
  }

  /* 單一大數字 */
  .bcard .b-kicker{font-size:31px; font-weight:500; letter-spacing:.1em; color:#8a8a8a; margin-bottom:26px;}
  .bcard .b-bignum{font-size:132px; font-weight:600; line-height:1.02; color:#141414; letter-spacing:.01em;}
  .bcard .b-statlabel{margin-top:24px; font-size:35px; font-weight:400; color:#2f2f2f;}
  .bcard .b-statnote{margin-top:18px; font-size:26px; line-height:1.7; color:#adaba4;}

  /* CTA / 結尾 */
  .bcard .b-cta-title{font-size:64px; font-weight:400; line-height:1.4; color:#1a1a1a;}
  .bcard .b-cta-note{margin-top:34px; font-size:29px; line-height:1.8; color:#8f8d86;}
  `;

  function bImg(src, cls, emptyLabel) {
    if (src) return '<div class="b-photo ' + cls + '"><img src="' + src + '" alt=""></div>';
    return '<div class="b-photo ' + cls + ' b-photo-empty">' + esc(emptyLabel || '去背 PNG') + '</div>';
  }

  function renderB(card, index, total, settings, active) {
    var type = card.type || 'cover';
    var cls = 'slide bcard b-' + type + (active ? ' on' : '');
    var top = settings.headerLabel
      ? '<div class="b-top">' + fmtText(settings.headerLabel) + '</div>' : '';
    var page = index > 0
      ? '<div class="b-page">' + (index + 1) + '/' + total + '</div>' : '';

    var main = '';
    if (type === 'compare') {
      main =
        '<div class="b-main">' +
          '<div class="b-compare">' +
            '<div class="b-col b-col-l">' +
              bImg(card.leftImg, 'b-col-photo', '左圖') +
              '<div class="b-label">' + fmtText(card.leftLabel) + '</div>' +
              '<div class="b-minirule"></div>' +
              '<div class="b-cprice">' + fmtText(card.leftPrice) + '</div>' +
              '<div class="b-cap">' + fmtText(card.leftCap) + '</div>' +
              '<div class="b-minirule"></div>' +
              '<div class="b-big">' + fmtText(card.leftBig) + '</div>' +
            '</div>' +
            '<div class="b-col b-col-r">' +
              bImg(card.rightImg, 'b-col-photo', '右圖') +
              '<div class="b-label">' + fmtText(card.rightLabel) + '</div>' +
              '<div class="b-minirule"></div>' +
              '<div class="b-cprice">' + fmtText(card.rightPrice) + '</div>' +
              '<div class="b-cap">' + fmtText(card.rightCap) + '</div>' +
              '<div class="b-minirule"></div>' +
              '<div class="b-big">' + fmtText(card.rightBig) + '</div>' +
            '</div>' +
            '<div class="b-vs">VS.</div>' +
          '</div>' +
          (card.note ? '<div class="b-compare-note">' + fmtText(card.note) + '</div>' : '') +
        '</div>';
    } else if (type === 'stat') {
      main =
        '<div class="b-main">' +
          (card.img ? bImg(card.img, 'b-cover-img') : '') +
          (card.kicker ? '<div class="b-kicker">' + fmtText(card.kicker) + '</div>' : '') +
          '<div class="b-bignum">' + fmtText(card.big) + '</div>' +
          (card.label ? '<div class="b-statlabel">' + fmtText(card.label) + '</div>' : '') +
          (card.note ? '<div class="b-statnote">' + fmtText(card.note) + '</div>' : '') +
        '</div>';
    } else if (type === 'cta') {
      main =
        '<div class="b-main">' +
          '<div class="b-cta-title">' + fmtText(card.title) + '</div>' +
          (card.note ? '<div class="b-cta-note">' + fmtText(card.note) + '</div>' : '') +
        '</div>';
    } else {
      // cover
      main =
        '<div class="b-main">' +
          bImg(card.img, 'b-cover-img') +
          '<div class="b-title">' + fmtText(card.title) + '</div>' +
          (card.price ? '<div class="b-price">' + fmtText(card.price) + '</div>' : '') +
          (card.note ? '<div class="b-note">' + fmtText(card.note) + '</div>' : '') +
        '</div>';
    }

    var sign =
      '<div class="b-sign">' +
        '<div class="b-rule"></div>' +
        '<div class="b-name">' + esc(settings.signature || '') + '</div>' +
        (settings.footNote ? '<div class="b-foot">' + fmtText(settings.footNote) + '</div>' : '') +
      '</div>';

    return '<div class="' + cls + '" data-i="' + index + '">' + top + page + main + sign + '</div>';
  }

  // ================================================================
  //  預設內容
  // ================================================================
  function defaultStateA() {
    return {
      template: 'A',
      settings: { seriesLabel: '幣圈媽媽 ✦', account: '@_hannapang', hashtag: '#複利的力量' },
      caption:
        '我不是要你什麼都別買，\n而是想讓你看見——\n那杯「才 150 元」的飲料，\n10 年後，其實是 80 幾萬。\n\n' +
        '小錢不是小事，\n它只是還沒被你看見的複利。\n\n' +
        '從今天起，\n留一杯的錢，給未來的自己。\n\n' +
        '#龐玉涵 #幣圈媽媽 #複利的力量',
      cards: [
        { id: uid(), type: 'cover', anchor: '每天一杯手搖飲', head: '10 年，喝掉 *54 萬* 😱', body: '', close: '你少賺的，比這更多… →', credit: '', img: '' },
        { id: uid(), type: 'inner', anchor: '才 150 元', head: '真正讓你*存不到錢*的', body: '一天才 150 元，你從來沒把它加起來過。\n讓你存不到錢的，從來不是大筆花費，而是那些「才 150 元」的小確幸。', close: '小錢，才是關鍵', credit: '', img: '' },
        { id: uid(), type: 'inner', anchor: 'A ｜每天喝掉', head: '10 年後，剩 *0 元*', body: '💰 一天一杯約 150 元\n一個月：約 4,500 元\n一年：約 54,000 元\n10 年後：0 元', close: '只剩習慣（和體重 😅）', credit: '', img: '' },
        { id: uid(), type: 'inner', anchor: 'B ｜存起來', head: '10 年存下 *54 萬*', body: '💰 一天少喝一杯，把錢存下來\n每月存 4,500 元\n10 年本金：540,000 元', close: '有存到，但錢只是「不動」', credit: '', img: '' },
        { id: uid(), type: 'inner', anchor: 'C ｜拿去投資', head: '10 年滾出 *82 萬*', body: '💰 每月 4,500 元，假設年化 8%\n投入本金：540,000 元\n10 年後約：820,000 元\n（示意試算，投資有風險）', close: '同一杯的錢，多滾出 28 萬', credit: '', img: '' },
        { id: uid(), type: 'inner', anchor: '我的選擇', head: '把其中*一杯*，換成未來', body: '我沒有戒掉所有小確幸，只是把「其中一杯」，換成投資未來的自己。\n① 每天一杯的錢 → 每月定期定額\n② 不痛不癢，卻能滾 10 年。', close: '差距，都是從「一杯」開始', credit: '', img: '' },
        { id: uid(), type: 'cta', anchor: '換你了', head: '留一杯的錢，給*未來的自己*', body: '我把每個月的定期定額紀錄，都更新在這裡。\n想一起滾出下一個 10 年嗎？', close: '追蹤我，一起記錄 →', credit: '', img: '' },
      ],
    };
  }

  function defaultStateB() {
    return {
      template: 'B',
      settings: {
        headerLabel: '換個角度，看待花費',
        signature: '@_hannapang',
        footNote: '依本篇設定價格試算',
        hashtag: '#複利的力量',
      },
      caption:
        '我不是要你什麼都別買，\n而是想讓你看見——\n那杯「才 150 元」的飲料，\n10 年後，其實是 80 幾萬。\n\n' +
        '小錢不是小事，\n它只是還沒被你看見的複利。\n\n' +
        '從今天起，\n留一杯的錢，給未來的自己。\n\n' +
        '#龐玉涵 #幣圈媽媽 #複利的力量',
      cards: [
        { id: uid(), type: 'cover', img: art('bubbleTea'), title: '一杯手搖飲的錢\n10 年能變成什麼？', price: '每天一杯 · NT$150', note: '從一杯，到一筆本金\n差別只在有沒有開始' },
        { id: uid(), type: 'compare', leftImg: art('bubbleTea'), rightImg: art('coinGrowth'),
          leftLabel: '每天喝掉', leftPrice: 'NT$54,000／年', leftCap: '10 年後', leftBig: '0 元',
          rightLabel: '拿去投資', rightPrice: '年化 8%', rightCap: '10 年後', rightBig: '82 萬',
          note: '同一筆錢\n差了快 82 萬' },
        { id: uid(), type: 'stat', img: art('bubbleTea'), kicker: 'A ｜每天喝掉', big: '0 元', label: '10 年後只剩習慣', note: '（和多出來的體重 😅）' },
        { id: uid(), type: 'stat', img: art('piggy'), kicker: 'B ｜存起來不投資', big: '54 萬', label: '10 年本金，但錢只是「不動」', note: '' },
        { id: uid(), type: 'stat', img: art('coinGrowth'), kicker: 'C ｜拿去定期定額', big: '82 萬', label: '每月 4,500 × 年化 8% × 10 年', note: '（示意試算，投資有風險）' },
        { id: uid(), type: 'cta', title: '留一杯的錢\n給未來的自己', note: '我把每月定期定額紀錄更新在這裡\n想一起滾出下一個 10 年嗎？' },
      ],
    };
  }

  // ================================================================
  //  註冊表
  // ================================================================
  global.TEMPLATES = {
    A: {
      id: 'A',
      name: '黑金真人照（故事風）',
      css: global.CARD_CSS,
      bg: '#000',
      W: global.CARD_W, H: global.CARD_H,
      types: [
        { id: 'cover', label: '封面' },
        { id: 'inner', label: '內頁' },
        { id: 'cta', label: 'CTA' },
      ],
      settingsSchema: [
        { key: 'seriesLabel', label: '系列英文標（頂欄右）', kind: 'text' },
        { key: 'account', label: '帳號 ID（每張頁尾）', kind: 'text' },
        { key: 'hashtag', label: '主題 Hashtag（Caption 末行）', kind: 'text' },
      ],
      fields: function () {
        return [
          { key: 'img', label: '照片（自動裁 1080×1350）', kind: 'image', imageMode: 'cover' },
          { key: 'anchor', label: '錨點（歌名／主題詞）', kind: 'text' },
          { key: 'head', label: '標題（關鍵字用 *星號* 包 → 變鵝黃）', kind: 'text' },
          { key: 'body', label: '內文（可換行）', kind: 'textarea' },
          { key: 'close', label: '收尾句', kind: 'text' },
          { key: 'credit', label: 'Photo credit（非本人照才填，可留空）', kind: 'text' },
        ];
      },
      newCard: function (type) {
        return { id: uid(), type: type, anchor: '', head: '', body: '', close: '', credit: '', img: '' };
      },
      titlePreview: function (card) {
        return ((card.anchor || '') + ' ' + (card.head || '')).replace(/\*/g, '').replace(/\n/g, ' ').trim();
      },
      render: global.renderCardHTML,
      defaultState: defaultStateA,
    },

    B: {
      id: 'B',
      name: '極簡白對比（機會成本）',
      css: CSS_B,
      bg: '#f5f4f1',
      W: 1080, H: 1350,
      types: [
        { id: 'cover', label: '封面' },
        { id: 'compare', label: '對比 VS' },
        { id: 'stat', label: '單一大數字' },
        { id: 'cta', label: 'CTA / 結尾' },
      ],
      settingsSchema: [
        { key: 'headerLabel', label: '頂部標語（每頁置中）', kind: 'text' },
        { key: 'signature', label: '署名（底部）', kind: 'text' },
        { key: 'footNote', label: '底部小字', kind: 'text' },
        { key: 'hashtag', label: '主題 Hashtag（Caption 末行）', kind: 'text' },
      ],
      fields: function (type) {
        if (type === 'compare') {
          return [
            { key: 'leftImg', label: '左：去背圖', kind: 'image', imageMode: 'transparent' },
            { key: 'leftLabel', label: '左：名稱', kind: 'text' },
            { key: 'leftPrice', label: '左：價格', kind: 'text' },
            { key: 'leftCap', label: '左：說明（同一筆預算…）', kind: 'text' },
            { key: 'leftBig', label: '左：大數字', kind: 'text' },
            { key: 'rightImg', label: '右：去背圖', kind: 'image', imageMode: 'transparent' },
            { key: 'rightLabel', label: '右：名稱', kind: 'text' },
            { key: 'rightPrice', label: '右：價格', kind: 'text' },
            { key: 'rightCap', label: '右：說明（可以換成…）', kind: 'text' },
            { key: 'rightBig', label: '右：大數字', kind: 'text' },
            { key: 'note', label: '底部註解（可換行）', kind: 'textarea' },
          ];
        }
        if (type === 'stat') {
          return [
            { key: 'img', label: '去背圖（可留空）', kind: 'image', imageMode: 'transparent' },
            { key: 'kicker', label: '小標（A｜每天喝掉…）', kind: 'text' },
            { key: 'big', label: '大數字', kind: 'text' },
            { key: 'label', label: '數字下方說明', kind: 'text' },
            { key: 'note', label: '註解（可換行）', kind: 'textarea' },
          ];
        }
        if (type === 'cta') {
          return [
            { key: 'title', label: '大標（可換行）', kind: 'textarea' },
            { key: 'note', label: '說明（可換行）', kind: 'textarea' },
          ];
        }
        // cover
        return [
          { key: 'img', label: '去背主圖', kind: 'image', imageMode: 'transparent' },
          { key: 'title', label: '大標（可換行）', kind: 'textarea' },
          { key: 'price', label: '副標／價格', kind: 'text' },
          { key: 'note', label: '小灰字（可換行）', kind: 'textarea' },
        ];
      },
      newCard: function (type) {
        if (type === 'compare') {
          return { id: uid(), type: type, leftImg: '', rightImg: '', leftLabel: '', leftPrice: '', leftCap: '同一筆預算', leftBig: '', rightLabel: '', rightPrice: '', rightCap: '可以換成', rightBig: '', note: '' };
        }
        if (type === 'stat') return { id: uid(), type: type, img: '', kicker: '', big: '', label: '', note: '' };
        if (type === 'cta') return { id: uid(), type: type, title: '', note: '' };
        return { id: uid(), type: type, img: '', title: '', price: '', note: '' };
      },
      titlePreview: function (card) {
        var t = card.title || card.big || card.kicker ||
          ((card.leftLabel || '') + ' vs ' + (card.rightLabel || ''));
        return String(t).replace(/\n/g, ' ').trim();
      },
      render: renderB,
      defaultState: defaultStateB,
    },
  };

  global.TEMPLATE_ORDER = ['A', 'B'];
  global.newUid = uid;
})(window);
