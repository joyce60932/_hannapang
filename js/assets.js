/*
 * assets.js — 內建向量插圖（SVG，透明去背，data URI）
 * ------------------------------------------------------------------
 * 給模板 B 當預設圖片用。SVG 本身透明、可縮放、體積小、完全自足。
 * 使用者之後可用真實去背 PNG 覆蓋。
 */
(function (global) {
  'use strict';

  function uri(svg) {
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  // 手搖飲杯（珍珠奶茶）
  var bubbleTea =
    '<svg xmlns="http://www.w3.org/2000/svg" width="220" height="280" viewBox="0 0 220 280" fill="none">' +
    '<rect x="120" y="28" width="15" height="92" rx="7" transform="rotate(12 127 74)" fill="#c9695f"/>' +
    '<path d="M34 92 Q110 32 186 92 Z" fill="#ece7dd" stroke="#2f2b26" stroke-width="5" stroke-linejoin="round"/>' +
    '<rect x="30" y="90" width="160" height="17" rx="6" fill="#ece7dd" stroke="#2f2b26" stroke-width="5"/>' +
    '<path d="M43 108 L177 108 L161 258 Q159 268 149 268 L71 268 Q61 268 59 258 Z" fill="#ffffff" stroke="#2f2b26" stroke-width="5" stroke-linejoin="round"/>' +
    '<path d="M52 168 L168 168 L161 258 Q159 268 149 268 L71 268 Q61 268 59 258 Z" fill="#e3d2b4"/>' +
    '<g fill="#3a2f27">' +
    '<circle cx="78" cy="250" r="9"/><circle cx="100" cy="255" r="9"/><circle cx="122" cy="250" r="9"/>' +
    '<circle cx="143" cy="253" r="9"/><circle cx="90" cy="238" r="9"/><circle cx="113" cy="240" r="9"/><circle cx="134" cy="238" r="9"/>' +
    '</g>' +
    '<path d="M43 108 L177 108 L161 258 Q159 268 149 268 L71 268 Q61 268 59 258 Z" fill="none" stroke="#2f2b26" stroke-width="5" stroke-linejoin="round"/>' +
    '</svg>';

  // 錢幣成長（投資：上升箭頭 + 遞增金幣）
  var coinGrowth =
    '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240" fill="none">' +
    '<path d="M30 205 L110 150 L200 70" stroke="#2f2b26" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M176 70 L200 70 L200 94" stroke="#2f2b26" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<g stroke="#9a7b32" stroke-width="4">' +
    '<circle cx="58" cy="200" r="30" fill="#e0be6a"/>' +
    '<circle cx="120" cy="158" r="30" fill="#e0be6a"/>' +
    '<circle cx="184" cy="112" r="30" fill="#e0be6a"/>' +
    '</g>' +
    '<g stroke="#9a7b32" stroke-width="3" fill="none">' +
    '<circle cx="58" cy="200" r="20"/><circle cx="120" cy="158" r="20"/><circle cx="184" cy="112" r="20"/>' +
    '</g>' +
    '</svg>';

  // 撲滿存錢（存起來不投資）
  var piggy =
    '<svg xmlns="http://www.w3.org/2000/svg" width="260" height="230" viewBox="0 0 260 230" fill="none">' +
    '<path d="M40 120 Q40 70 110 66 Q140 40 150 62 Q200 66 214 110 Q236 112 236 132 Q236 150 214 150 Q206 176 176 188 L178 208 Q178 214 172 214 L154 214 Q148 214 148 208 L146 196 Q120 200 96 194 L94 208 Q94 214 88 214 L70 214 Q64 214 64 208 L66 184 Q46 166 44 140 Q30 138 30 126 Q30 120 40 120 Z" fill="#e7d4c4" stroke="#2f2b26" stroke-width="5" stroke-linejoin="round"/>' +
    '<circle cx="196" cy="120" r="7" fill="#2f2b26"/>' +
    '<rect x="96" y="74" width="52" height="9" rx="4" transform="rotate(-8 122 78)" fill="#2f2b26"/>' +
    '<g stroke="#9a7b32" stroke-width="4"><circle cx="122" cy="34" r="20" fill="#e0be6a"/></g>' +
    '<line x1="122" y1="52" x2="122" y2="66" stroke="#9a7b32" stroke-width="4"/>' +
    '</svg>';

  global.ART = {
    bubbleTea: uri(bubbleTea),
    coinGrowth: uri(coinGrowth),
    piggy: uri(piggy),
  };
})(window);
