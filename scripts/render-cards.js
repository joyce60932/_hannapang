/*
 * render-cards.js — 把一支 preset 的每一頁渲染成 1080×1350 PNG
 * ------------------------------------------------------------------
 * 用無頭 Chromium（Playwright）截圖，給「只有手機、無法本機下載 PNG」時用。
 *   node scripts/render-cards.js presets/ppi.js <輸出資料夾>
 * 需求：環境已裝 playwright 與 chromium（雲端 session 預設有）。
 */
'use strict';
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

global.window = global;
const R = path.resolve(__dirname, '..');
require(path.join(R, 'js/card-style.js'));
require(path.join(R, 'js/render.js'));
require(path.join(R, 'js/assets.js'));
require(path.join(R, 'js/templates.js'));

const presetPath = process.argv[2];
const outDir = process.argv[3] || path.join(R, 'rendered');
if (!presetPath) { console.error('用法: node scripts/render-cards.js <preset> <outDir>'); process.exit(1); }

require(path.resolve(presetPath));            // 設定 window.CAROUSEL_PRESET
const P = window.CAROUSEL_PRESET;
const t = P.active;
const st = P.states[t]; st.template = t;
const tpl = window.TEMPLATES[t];
const cards = st.cards, total = cards.length, settings = st.settings;

function pageHtml(cardHtml) {
  return '<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8">' +
    window.CARD_FONTS_LINK +
    '<style>*{margin:0;padding:0;box-sizing:border-box}' +
    'html,body{width:1080px;height:1350px;overflow:hidden;background:' + (tpl.bg || '#000') + '}' +
    tpl.css + '</style></head><body>' + cardHtml + '</body></html>';
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const launchOpts = { args: ['--no-sandbox'] };
  if (process.env.HTTPS_PROXY) launchOpts.proxy = { server: process.env.HTTPS_PROXY };
  const browser = await chromium.launch(launchOpts);
  const ctx = await browser.newContext({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1, ignoreHTTPSErrors: true });
  const page = await ctx.newPage();
  const seed = (settings.account || settings.signature || 'card').replace(/[^a-zA-Z0-9_]/g, '') || 'card';
  for (let i = 0; i < total; i++) {
    const html = tpl.render(cards[i], i, total, settings, true);
    await page.setContent(pageHtml(html), { waitUntil: 'domcontentloaded' });
    await Promise.race([
      page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {}),
      page.waitForTimeout(4000),
    ]);
    await page.waitForTimeout(300);
    const name = seed + '_' + String(i + 1).padStart(2, '0') + '.png';
    await page.screenshot({ path: path.join(outDir, name), clip: { x: 0, y: 0, width: 1080, height: 1350 } });
    console.log('✓ ' + name);
  }
  await browser.close();
  console.log('完成：' + total + ' 張 → ' + outDir);
})().catch((e) => { console.error(e); process.exit(1); });
