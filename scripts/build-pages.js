/*
 * build-pages.js — 產生 GitHub Pages「工具首頁」
 * ------------------------------------------------------------------
 * 把 dist/ 的單檔工具複製到 docs/t/，並生成 docs/index.html（手機友善的清單）。
 *   node scripts/build-pages.js
 * GitHub Pages 設定：Settings → Pages → Branch: 本分支 /docs。
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const DOCS = path.join(ROOT, 'docs');
const TOOLS = path.join(DOCS, 't');

// 分組目錄：group → [ [檔名, 標題, 說明] ]
const CATALOG = [
  ['工具', [
    ['輪播貼文製作器.html', '空白工具', '模板 A/B 可切，從零開始'],
  ]],
  ['定期定額大富翁', [
    ['定期定額01-入門-製作器.html', '#1 定期定額是什麼', '用一杯手搖飲解釋'],
    ['定期定額02-為什麼小資-製作器.html', '#2 為什麼小資更該做', '每天100元→20年177萬'],
    ['定期定額03-父母18歲-製作器.html', '父母篇・18歲那年', '你能給孩子什麼'],
    ['幫兒子存錢-銀行vs0050vs比特幣-製作器.html', '銀行 vs 0050 vs 比特幣', '幫兒子每月存1萬'],
    ['早開始複利-製作器.html', '早開始 vs 晚開始', '時間複利，差2100萬'],
    ['珍奶健康對比-製作器.html', '手搖飲的健康代價', '糖/熱量 vs 投資+出國'],
  ]],
  ['時事', [
    ['時事-CLARITY法案-製作器.html', 'CLARITY 法案（結果版）', '75%→5%、49:50 未過'],
    ['時事教學-失業金與幣價-製作器.html', '失業金與幣價', '新手白話・央行放水'],
  ]],
  ['成長型思維', [
    ['成長型思維-奧德賽-製作器.html', '《奧德賽》', '走回自己'],
    ['成長型思維-系列模板-製作器.html', '★ 系列空白模板', '出新一篇用這個'],
  ]],
  ['故事型長文・幣圈教官', [
    ['故事型長文01-桅杆止損-製作器.html', '#1 綁在桅杆上', '止損 × 1%風險'],
    ['故事型長文-系列模板-製作器.html', '★ 系列空白模板', '出新一篇用這個'],
  ]],
];

fs.mkdirSync(TOOLS, { recursive: true });
// 清掉舊的 t/，再從 dist 複製一份
fs.readdirSync(TOOLS).forEach((f) => fs.unlinkSync(path.join(TOOLS, f)));
let copied = 0;
CATALOG.forEach(([, items]) => items.forEach(([file]) => {
  const src = path.join(DIST, file);
  if (fs.existsSync(src)) { fs.copyFileSync(src, path.join(TOOLS, file)); copied++; }
  else console.warn('缺檔：' + file);
}));

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

let cards = '';
CATALOG.forEach(([group, items]) => {
  cards += '<h2>' + esc(group) + '</h2>\n';
  items.forEach(([file, title, desc]) => {
    const href = './t/' + encodeURIComponent(file);
    cards += '<a class="card" href="' + href + '"><span class="t">' + esc(title) +
      '</span><span class="d">' + esc(desc) + '</span></a>\n';
  });
});

const html =
'<!DOCTYPE html><html lang="zh-Hant"><head>\n' +
'<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">\n' +
'<title>輪播貼文製作器・工具首頁</title>\n' +
'<style>\n' +
'*{margin:0;padding:0;box-sizing:border-box}\n' +
"body{background:#0e0e0e;color:#ece7dc;font-family:'Noto Sans TC',system-ui,-apple-system,sans-serif;line-height:1.6;padding:22px 16px 60px;max-width:640px;margin:0 auto}\n" +
'h1{font-size:22px;letter-spacing:.04em;margin-bottom:4px}h1 .m{color:#f6dfa3}\n' +
'.sub{color:#9a9482;font-size:13px;margin-bottom:8px}\n' +
'.note{font-size:12px;color:#c9b98a;background:rgba(246,223,163,.08);border:1px solid rgba(246,223,163,.22);border-radius:12px;padding:10px 14px;margin:14px 0 22px;line-height:1.7}\n' +
'h2{font-size:13px;letter-spacing:.14em;color:#f6dfa3;text-transform:uppercase;margin:22px 0 10px}\n' +
'.card{display:flex;flex-direction:column;gap:2px;background:#161513;border:1px solid rgba(246,223,163,.16);border-radius:14px;padding:15px 17px;margin-bottom:10px;text-decoration:none;color:inherit}\n' +
'.card:active{border-color:rgba(246,223,163,.5)}\n' +
'.card .t{font-size:16px;font-weight:700}\n' +
'.card .d{font-size:12px;color:#9a9482}\n' +
'</style></head><body>\n' +
'<h1><span class="m">✦</span> 輪播貼文製作器</h1>\n' +
'<div class="sub">@_hannapang ・ 手機/電腦都能開來改文字</div>\n' +
'<div class="note">點一篇打開 → 直接改文字、上傳圖 → 下載 PNG / 複製 Caption。<br>' +
'⚠️ 編輯存在「這台裝置的瀏覽器」，手機和電腦<b>不會自動同步</b>；要互通就用工具裡的「匯出獨立 HTML」互傳。</div>\n' +
cards +
'</body></html>';

fs.writeFileSync(path.join(DOCS, 'index.html'), html);
console.log('已複製 ' + copied + ' 支工具到 docs/t/，並產生 docs/index.html');
