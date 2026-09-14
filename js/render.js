/*
 * render.js
 * ------------------------------------------------------------------
 * 由「一張卡的資料」產生卡片 HTML 字串。
 * 製作器預覽與匯出的獨立 HTML 共用這支，確保兩邊長得一模一樣。
 *
 * 卡片資料格式：
 *   {
 *     type:  'cover' | 'inner' | 'cta',
 *     anchor:'錨點（歌名／主題詞）',
 *     head:  '標題，關鍵字用 *星號* 包住 → 會變鵝黃 <em>',
 *     body:  '內文段落（換行會保留）',
 *     close: '收尾句',
 *     credit:'Photo from IG@xxx（非本人照才填，可留空）',
 *     img:   'data:image/jpeg;base64,...'（可留空 → 顯示占位）
 *   }
 */
(function (global) {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // *關鍵字* → <em>關鍵字</em>（在跳脫之後套用，安全）
  function emphasize(s) {
    return s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  }

  function nl2br(s) {
    return s.replace(/\r?\n/g, '<br>');
  }

  // 標題：跳脫 → 星號轉 em → 換行
  function fmtHead(s) {
    return nl2br(emphasize(esc(s)));
  }
  // 一般文字：跳脫 → 換行
  function fmtText(s) {
    return nl2br(esc(s));
  }

  function pad2(n) {
    return String(n).padStart(2, '0');
  }

  /**
   * @param {object} card   卡片資料
   * @param {number} index  0-based
   * @param {number} total  總張數
   * @param {object} settings { seriesLabel, account }
   * @param {boolean} active 是否為目前顯示中（加上 .on）
   */
  function renderCardHTML(card, index, total, settings, active) {
    var type = card.type || 'inner';
    var cls =
      'slide ' +
      (type === 'cover' ? 'cover' : type === 'cta' ? 'inner cta' : 'inner');
    if (active) cls += ' on';

    var num = pad2(index + 1) + '｜' + pad2(total);
    var seriesLabel = esc(settings.seriesLabel || '');
    var account = esc(settings.account || '');

    var photo = card.img
      ? '<img class="photo" src="' + card.img + '" alt="">'
      : '<div class="photo photo-empty"></div>';

    var credit = card.credit
      ? '<div class="credit">' + fmtText(card.credit) + '</div>'
      : '';

    // 錨點 + 標題 共用左側金線
    var anchorEl = card.anchor
      ? '<div class="anchor">' + fmtHead(card.anchor) + '</div>'
      : '';
    var headEl = card.head
      ? '<div class="head">' + fmtHead(card.head) + '</div>'
      : '';
    var accent =
      anchorEl || headEl
        ? '<div class="accent">' + anchorEl + headEl + '</div>'
        : '';

    var bodyEl = card.body ? '<div class="body">' + fmtText(card.body) + '</div>' : '';
    var closeEl = card.close ? '<div class="close">' + fmtText(card.close) + '</div>' : '';

    return (
      '<div class="card ' + cls + '" data-i="' + index + '">' +
        photo +
        '<div class="grad"></div>' +
        '<div class="topbar"><span>' + num + '</span><span>' + seriesLabel + '</span></div>' +
        credit +
        '<div class="tz">' +
          accent +
          bodyEl +
          '<div class="rule"></div>' +
          closeEl +
          '<div class="foot">' + account + '</div>' +
        '</div>' +
      '</div>'
    );
  }

  global.renderCardHTML = renderCardHTML;
})(window);
