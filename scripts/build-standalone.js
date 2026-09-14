/*
 * build-standalone.js
 * ------------------------------------------------------------------
 * 把多檔的製作器（index.html + css + js）打包成「單一 HTML 檔」，
 * 讓使用者存到桌面雙擊即用，不需要資料夾。
 *
 *   node scripts/build-standalone.js [輸出路徑]
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = process.argv[2] || path.join(ROOT, 'dist', '輪播貼文製作器.html');

let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

// 內嵌本地 CSS：<link rel="stylesheet" href="css/app.css">
html = html.replace(/<link rel="stylesheet" href="(css\/[^"]+)">/g, function (_, href) {
  const css = fs.readFileSync(path.join(ROOT, href), 'utf8');
  return '<style>\n' + css + '\n</style>';
});

// 內嵌本地 JS：<script src="js/xxx.js"></script>（CDN 的 http(s) 保留）
html = html.replace(/<script src="(js\/[^"]+)"><\/script>/g, function (_, src) {
  const js = fs.readFileSync(path.join(ROOT, src), 'utf8');
  return '<script>\n' + js + '\n</script>';
});

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html);

const kb = Math.round(fs.statSync(OUT).size / 1024);
const leftover = (html.match(/(?:src|href)="(?!https?:)[^"]+"/g) || []);
console.log('輸出：' + OUT + ' （' + kb + ' KB）');
console.log('剩餘本地外部參照（應為 0）：' + leftover.length + (leftover.length ? ' → ' + leftover.join(', ') : ''));
