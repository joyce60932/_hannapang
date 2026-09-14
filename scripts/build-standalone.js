/*
 * build-standalone.js
 * ------------------------------------------------------------------
 * 把多檔的製作器（index.html + css + js）打包成「單一 HTML 檔」，
 * 讓使用者存到桌面雙擊即用，不需要資料夾。
 *
 *   node scripts/build-standalone.js [輸出路徑]
 *   node scripts/build-standalone.js --preset presets/timing.js --out dist/xxx.html
 *
 * --preset：注入一個「預設主題」JS（設定 window.CAROUSEL_PRESET），
 *           在 app.js 之前執行，讓打包後的單檔開檔就是該主題的內容。
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// 解析參數：位置參數當輸出路徑；--preset / --out 具名參數
const argv = process.argv.slice(2);
let presetFile = null;
let out = null;
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--preset') presetFile = argv[++i];
  else if (argv[i] === '--out') out = argv[++i];
  else out = argv[i];
}
const OUT = out || path.join(ROOT, 'dist', '輪播貼文製作器.html');

const presetJS = presetFile ? fs.readFileSync(path.resolve(ROOT, presetFile), 'utf8') : null;

let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

// 內嵌本地 CSS：<link rel="stylesheet" href="css/app.css">
html = html.replace(/<link rel="stylesheet" href="(css\/[^"]+)">/g, function (_, href) {
  const css = fs.readFileSync(path.join(ROOT, href), 'utf8');
  return '<style>\n' + css + '\n</style>';
});

// 內嵌本地 JS：<script src="js/xxx.js"></script>（CDN 的 http(s) 保留）
// app.js 之前先插入 preset（若有），確保 window.CAROUSEL_PRESET 在 app 啟動前就緒。
html = html.replace(/<script src="(js\/[^"]+)"><\/script>/g, function (_, src) {
  const js = fs.readFileSync(path.join(ROOT, src), 'utf8');
  let out = '';
  if (presetJS && /\/app\.js$/.test(src)) {
    out += '<script>\n' + presetJS + '\n</script>\n';
  }
  out += '<script>\n' + js + '\n</script>';
  return out;
});

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html);

const kb = Math.round(fs.statSync(OUT).size / 1024);
console.log('輸出：' + OUT + ' （' + kb + ' KB）' + (presetFile ? '  [preset: ' + presetFile + ']' : ''));
console.log('沒有本地 js/ 參照：' + !/src="js\//.test(html) + '｜沒有本地 css/ 參照：' + !/href="css\//.test(html));
