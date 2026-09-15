/*
 * assets.js — 內建向量插圖（SVG，透明去背，data URI）
 * ------------------------------------------------------------------
 * 給模板 B 當預設圖片用。全部自繪、無版權、透明背景、可縮放、體積小、完全自足。
 * 使用者之後可用真實去背 PNG 覆蓋。
 */
(function (global) {
  'use strict';

  function uri(svg) {
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  // 手搖飲杯（扁平插畫風：漸層奶茶 + 珍珠 + 粗吸管）
  var bubbleTea =
    '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="380" viewBox="0 0 300 380" fill="none">' +
    '<defs><linearGradient id="tea" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#e8cca7"/><stop offset="0.55" stop-color="#d2a675"/><stop offset="1" stop-color="#bd8a55"/>' +
    '</linearGradient></defs>' +
    '<ellipse cx="150" cy="362" rx="92" ry="15" fill="#000000" opacity="0.08"/>' +
    '<path d="M70 72 L230 72 L214 340 Q212 352 200 352 L100 352 Q88 352 86 340 Z" fill="#ffffff" stroke="#33302b" stroke-width="5" stroke-linejoin="round"/>' +
    '<path d="M79 152 L221 152 L214 340 Q212 352 200 352 L100 352 Q88 352 86 340 Z" fill="url(#tea)"/>' +
    '<rect x="79" y="150" width="142" height="11" rx="3" fill="#f1e4d0"/>' +
    '<g fill="#241a14">' +
    '<circle cx="108" cy="338" r="12"/><circle cx="130" cy="341" r="12"/><circle cx="152" cy="338" r="12"/><circle cx="174" cy="341" r="12"/><circle cx="196" cy="337" r="12"/>' +
    '<circle cx="119" cy="323" r="12"/><circle cx="141" cy="324" r="12"/><circle cx="163" cy="323" r="12"/><circle cx="185" cy="323" r="12"/>' +
    '<circle cx="130" cy="309" r="11"/><circle cx="152" cy="309" r="11"/><circle cx="174" cy="309" r="11"/>' +
    '</g>' +
    '<rect x="152" y="26" width="20" height="128" rx="10" transform="rotate(11 162 90)" fill="#4a3b30"/>' +
    '<path d="M70 72 L230 72 L214 340 Q212 352 200 352 L100 352 Q88 352 86 340 Z" fill="none" stroke="#33302b" stroke-width="5" stroke-linejoin="round"/>' +
    '<ellipse cx="150" cy="72" rx="80" ry="14" fill="#ffffff" stroke="#33302b" stroke-width="5"/>' +
    '</svg>';

  // 千元鈔扇（一疊鈔票展開，藍綠色系；風格化、非真鈔複製）
  var money = (function () {
    var notes = '';
    var angles = [-46, -27.5, -9, 9, 27.5, 46];
    angles.forEach(function (a) {
      notes +=
        '<g transform="rotate(' + a + ' 170 258)">' +
        '<rect x="94" y="44" width="152" height="76" rx="9" fill="#a9d2dc" stroke="#4b7d8b" stroke-width="4"/>' +
        '<rect x="104" y="54" width="132" height="56" rx="6" fill="none" stroke="#6ea3b0" stroke-width="2"/>' +
        '<circle cx="128" cy="82" r="17" fill="#8bc0cd" stroke="#4b7d8b" stroke-width="2"/>' +
        '<text x="205" y="90" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#33616e" text-anchor="middle">1000</text>' +
        '</g>';
    });
    return '<svg xmlns="http://www.w3.org/2000/svg" width="340" height="300" viewBox="0 0 340 300" fill="none">' +
      '<ellipse cx="170" cy="286" rx="96" ry="12" fill="#000000" opacity="0.07"/>' +
      notes + '</svg>';
  })();

  // 錢幣成長（上升箭頭 + 遞增金幣）
  var coinGrowth =
    '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240" fill="none">' +
    '<path d="M30 205 L110 150 L200 70" stroke="#2f2b26" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M176 70 L200 70 L200 94" stroke="#2f2b26" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<g stroke="#9a7b32" stroke-width="4">' +
    '<circle cx="58" cy="200" r="30" fill="#e0be6a"/><circle cx="120" cy="158" r="30" fill="#e0be6a"/><circle cx="184" cy="112" r="30" fill="#e0be6a"/>' +
    '</g>' +
    '<g stroke="#9a7b32" stroke-width="3" fill="none">' +
    '<circle cx="58" cy="200" r="20"/><circle cx="120" cy="158" r="20"/><circle cx="184" cy="112" r="20"/></g>' +
    '</svg>';

  // 撲滿存錢
  var piggy =
    '<svg xmlns="http://www.w3.org/2000/svg" width="260" height="230" viewBox="0 0 260 230" fill="none">' +
    '<path d="M40 120 Q40 70 110 66 Q140 40 150 62 Q200 66 214 110 Q236 112 236 132 Q236 150 214 150 Q206 176 176 188 L178 208 Q178 214 172 214 L154 214 Q148 214 148 208 L146 196 Q120 200 96 194 L94 208 Q94 214 88 214 L70 214 Q64 214 64 208 L66 184 Q46 166 44 140 Q30 138 30 126 Q30 120 40 120 Z" fill="#e7d4c4" stroke="#2f2b26" stroke-width="5" stroke-linejoin="round"/>' +
    '<circle cx="196" cy="120" r="7" fill="#2f2b26"/>' +
    '<rect x="96" y="74" width="52" height="9" rx="4" transform="rotate(-8 122 78)" fill="#2f2b26"/>' +
    '<g stroke="#9a7b32" stroke-width="4"><circle cx="122" cy="34" r="20" fill="#e0be6a"/></g>' +
    '<line x1="122" y1="52" x2="122" y2="66" stroke="#9a7b32" stroke-width="4"/>' +
    '</svg>';

  // 沙漏（時間）
  var hourglass =
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="264" viewBox="0 0 200 264" fill="none">' +
    '<rect x="32" y="18" width="136" height="15" rx="7" fill="#8a6d3a"/>' +
    '<rect x="32" y="231" width="136" height="15" rx="7" fill="#8a6d3a"/>' +
    '<path d="M52 33 L148 33 L100 132 Z" fill="#f1ede6" stroke="#8a6d3a" stroke-width="4" stroke-linejoin="round"/>' +
    '<path d="M100 132 L52 231 L148 231 Z" fill="#f1ede6" stroke="#8a6d3a" stroke-width="4" stroke-linejoin="round"/>' +
    '<path d="M72 74 L128 74 L100 132 Z" fill="#e0be6a"/>' +
    '<path d="M62 231 L138 231 L100 184 Z" fill="#e0be6a"/>' +
    '<line x1="100" y1="132" x2="100" y2="196" stroke="#e0be6a" stroke-width="4"/>' +
    '</svg>';

  // 紙飛機（出國／旅行）
  var plane =
    '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="210" viewBox="0 0 240 210" fill="none">' +
    '<path d="M24 148 Q74 150 112 128" stroke="#c3c0ba" stroke-width="3" stroke-dasharray="2 11" stroke-linecap="round"/>' +
    '<path d="M28 118 L214 38 L112 128 Z" fill="#c9e4ea" stroke="#4b7d8b" stroke-width="4" stroke-linejoin="round"/>' +
    '<path d="M214 38 L124 178 L112 128 Z" fill="#8bc0cd" stroke="#4b7d8b" stroke-width="4" stroke-linejoin="round"/>' +
    '<path d="M112 128 L124 178 L104 150 Z" fill="#a9d2dc" stroke="#4b7d8b" stroke-width="4" stroke-linejoin="round"/>' +
    '</svg>';

  // 糖（方糖堆）
  var sugar =
    '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="210" viewBox="0 0 240 210" fill="none">' +
    '<g fill="#ffffff" stroke="#c9b58a" stroke-width="4" stroke-linejoin="round">' +
    '<rect x="42" y="132" width="52" height="52" rx="6"/><rect x="98" y="132" width="52" height="52" rx="6"/><rect x="154" y="132" width="52" height="52" rx="6"/>' +
    '<rect x="70" y="80" width="52" height="52" rx="6"/><rect x="126" y="80" width="52" height="52" rx="6"/>' +
    '<rect x="98" y="28" width="52" height="52" rx="6"/>' +
    '</g>' +
    '<g stroke="#e6d6b4" stroke-width="3" stroke-linecap="round">' +
    '<line x1="54" y1="150" x2="70" y2="150"/><line x1="110" y1="150" x2="126" y2="150"/><line x1="166" y1="150" x2="182" y2="150"/>' +
    '<line x1="82" y1="98" x2="98" y2="98"/><line x1="138" y1="98" x2="154" y2="98"/><line x1="110" y1="46" x2="126" y2="46"/>' +
    '</g></svg>';

  // 體重計
  var scale =
    '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="210" viewBox="0 0 240 210" fill="none">' +
    '<rect x="38" y="44" width="164" height="134" rx="26" fill="#eceae4" stroke="#7a756c" stroke-width="5"/>' +
    '<rect x="58" y="62" width="124" height="98" rx="16" fill="#ffffff" stroke="#7a756c" stroke-width="4"/>' +
    '<path d="M80 142 A42 42 0 0 1 160 142" fill="none" stroke="#cfcabf" stroke-width="4"/>' +
    '<g stroke="#b8b2a6" stroke-width="3" stroke-linecap="round">' +
    '<line x1="84" y1="126" x2="92" y2="130"/><line x1="102" y1="112" x2="107" y2="120"/><line x1="120" y1="106" x2="120" y2="115"/><line x1="138" y1="112" x2="133" y2="120"/><line x1="156" y1="126" x2="148" y2="130"/>' +
    '</g>' +
    '<line x1="120" y1="142" x2="150" y2="112" stroke="#c94f4f" stroke-width="5" stroke-linecap="round"/>' +
    '<circle cx="120" cy="142" r="7" fill="#7a756c"/>' +
    '<rect x="70" y="178" width="18" height="14" rx="4" fill="#7a756c"/><rect x="152" y="178" width="18" height="14" rx="4" fill="#7a756c"/>' +
    '</svg>';

  // 行事曆（定期扣款）
  var calendar =
    '<svg xmlns="http://www.w3.org/2000/svg" width="220" height="210" viewBox="0 0 220 210" fill="none">' +
    '<rect x="26" y="36" width="168" height="150" rx="16" fill="#ffffff" stroke="#4b7d8b" stroke-width="5"/>' +
    '<path d="M26 62 a16 16 0 0 1 16 -16 h136 a16 16 0 0 1 16 16 v14 h-168 Z" fill="#a9d2dc" stroke="#4b7d8b" stroke-width="5" stroke-linejoin="round"/>' +
    '<line x1="70" y1="24" x2="70" y2="52" stroke="#4b7d8b" stroke-width="9" stroke-linecap="round"/>' +
    '<line x1="150" y1="24" x2="150" y2="52" stroke="#4b7d8b" stroke-width="9" stroke-linecap="round"/>' +
    '<g fill="#d7e6ea">' +
    '<circle cx="62" cy="104" r="7"/><circle cx="102" cy="104" r="7"/><circle cx="158" cy="104" r="7"/>' +
    '<circle cx="62" cy="140" r="7"/><circle cx="158" cy="140" r="7"/>' +
    '<circle cx="62" cy="166" r="7"/><circle cx="102" cy="166" r="7"/><circle cx="158" cy="166" r="7"/>' +
    '</g>' +
    '<circle cx="110" cy="140" r="28" fill="#e0be6a" stroke="#9a7b32" stroke-width="4"/>' +
    '<path d="M98 140 l8 9 l17 -19" stroke="#ffffff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  global.ART = {
    bubbleTea: uri(bubbleTea),
    money: uri(money),
    coinGrowth: uri(coinGrowth),
    piggy: uri(piggy),
    hourglass: uri(hourglass),
    plane: uri(plane),
    sugar: uri(sugar),
    scale: uri(scale),
    calendar: uri(calendar),
  };
})(window);
