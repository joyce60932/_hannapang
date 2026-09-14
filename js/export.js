/*
 * export.js
 * ------------------------------------------------------------------
 * 把目前的內容打包成一支「單一自足的 HTML」（規格 §12）：
 *   - 圖片 base64 內嵌、無任何外部路徑
 *   - 可預覽、可導覽、可下載 1080×1350 PNG、可複製 Caption
 *   - 卡片 HTML 直接用 renderCardHTML 預先產好烤進檔案（與預覽完全一致）
 *
 * 這支輸出的檔案就是「最終成品」，可以拿去用 Chrome / Safari 本機開啟。
 */
(function (global) {
  'use strict';

  function pad2(n) { return String(n).padStart(2, '0'); }

  function buildStandaloneHTML(state) {
    var settings = state.settings;
    var cards = state.cards;
    var total = cards.length;

    var stageInner = cards
      .map(function (c, i) {
        return global.renderCardHTML(c, i, total, settings, i === 0);
      })
      .join('\n');

    var dots = cards
      .map(function (_, i) {
        return '<div class="dot' + (i === 0 ? ' on' : '') + '"></div>';
      })
      .join('');

    var caption = state.caption || '';
    var accountSafe = (settings.account || 'hanna').replace(/[^a-zA-Z0-9_]/g, '') || 'hanna';

    // 只在整個檔案裡出現一次的執行期腳本（導覽／縮放／下載／複製）
    var runtime =
      "  var N = document.querySelectorAll('.card').length;\n" +
      "  var stage = document.getElementById('stage');\n" +
      "  var cards = [].slice.call(document.querySelectorAll('.card'));\n" +
      "  var dotsEl = [].slice.call(document.querySelectorAll('.dot'));\n" +
      "  var cur = 0;\n" +
      "  function show(i){ cur=(i+N)%N; cards.forEach(function(c,k){c.classList.toggle('on',k===cur);});\n" +
      "    dotsEl.forEach(function(d,k){d.classList.toggle('on',k===cur);}); }\n" +
      "  document.getElementById('prev').onclick=function(){show(cur-1);};\n" +
      "  document.getElementById('next').onclick=function(){show(cur+1);};\n" +
      "  addEventListener('keydown',function(e){ if(e.key==='ArrowLeft')show(cur-1); if(e.key==='ArrowRight')show(cur+1); });\n" +
      "  function fit(){ var s=Math.min((innerWidth-40)/1080,(innerHeight*0.72)/1350);\n" +
      "    stage.style.transform='scale('+s+')'; stage.style.height=(1350*s)+'px'; }\n" +
      "  addEventListener('resize',fit); fit();\n" +
      "  function dl(cardEl, name){\n" +
      "    return (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){\n" +
      "      var clone=cardEl.cloneNode(true);\n" +
      "      Object.assign(clone.style,{position:'fixed',left:'-9999px',top:'0',transform:'none',display:'block'});\n" +
      "      document.body.appendChild(clone);\n" +
      "      return html2canvas(clone,{scale:1,backgroundColor:'#000',useCORS:true,logging:false}).then(function(canvas){\n" +
      "        document.body.removeChild(clone);\n" +
      "        return new Promise(function(r){canvas.toBlob(function(b){var a=document.createElement('a');\n" +
      "          a.href=URL.createObjectURL(b);a.download=name;a.click();URL.revokeObjectURL(a.href);r();},'image/png');});\n" +
      "      });\n" +
      "    });\n" +
      "  }\n" +
      "  document.getElementById('dlOne').onclick=function(){ dl(cards[cur],'" + accountSafe + "_'+String(cur+1).padStart(2,'0')+'.png'); };\n" +
      "  document.getElementById('dlAll').onclick=function(){ var p=Promise.resolve();\n" +
      "    cards.forEach(function(c,i){ p=p.then(function(){return dl(c,'" + accountSafe + "_'+String(i+1).padStart(2,'0')+'.png');}); }); };\n" +
      "  var cap=document.getElementById('cap'); cap.textContent=CAPTION;\n" +
      "  document.getElementById('copyCap').onclick=function(){ navigator.clipboard.writeText(CAPTION).then(function(){\n" +
      "    var b=document.getElementById('copyCap'); b.textContent='已複製 ✓'; setTimeout(function(){b.textContent='複製整段 Caption';},1500); }); };\n";

    return (
'<!DOCTYPE html>\n' +
'<html lang="zh-Hant"><head>\n' +
'<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">\n' +
'<title>' + esc(settings.seriesLabel || '輪播貼文') + '</title>\n' +
global.CARD_FONTS_LINK + '\n' +
'<script src="' + global.HTML2CANVAS_SRC + '"><\/script>\n' +
'<style>\n' +
'*{margin:0;padding:0;box-sizing:border-box}\n' +
"body{background:#111;color:#eee;font-family:'Noto Sans TC',sans-serif;min-height:100vh;display:flex;flex-direction:column;align-items:center;gap:16px;padding:20px}\n" +
'.stage{position:relative;width:1080px;height:1350px;transform-origin:top center}\n' +
'.card{position:absolute;inset:0;display:none}\n' +
'.card.on{display:block}\n' +
global.CARD_CSS + '\n' +
'.nav{display:flex;gap:12px;align-items:center;flex-wrap:wrap;justify-content:center}\n' +
".btn{font-family:'Noto Sans TC';font-size:15px;font-weight:500;color:#111;background:#f6dfa3;border:none;border-radius:999px;padding:11px 22px;cursor:pointer}\n" +
'.ghost{background:transparent;color:#f6dfa3;border:1px solid rgba(246,223,163,.5)}\n' +
'.dots{display:flex;gap:6px}.dot{width:8px;height:8px;border-radius:50%;background:#555}.dot.on{background:#f6dfa3}\n' +
'.note{max-width:560px;font-size:13px;line-height:1.7;color:#c9b98a;background:rgba(246,223,163,.08);border:1px solid rgba(246,223,163,.22);border-radius:12px;padding:12px 16px;text-align:center}\n' +
'.cap{max-width:560px;width:100%;background:#1b1b1b;border-radius:12px;padding:16px;white-space:pre-wrap;font-size:14px;line-height:1.7;color:#ddd}\n' +
'</style></head><body>\n' +
'  <div class="stage" id="stage">\n' + stageInner + '\n  </div>\n' +
'  <div class="nav">\n' +
'    <button class="btn ghost" id="prev">◀</button>\n' +
'    <div class="dots" id="dots">' + dots + '</div>\n' +
'    <button class="btn ghost" id="next">▶</button>\n' +
'  </div>\n' +
'  <div class="nav">\n' +
'    <button class="btn" id="dlOne">下載此張</button>\n' +
'    <button class="btn" id="dlAll">下載全部</button>\n' +
'    <button class="btn ghost" id="copyCap">複製整段 Caption</button>\n' +
'  </div>\n' +
'  <div class="note">⚠️ 下載要用 <b>Chrome / Safari 在本機開啟這個 HTML</b> 才有效，在對話預覽框內點按鈕沒反應是正常現象。</div>\n' +
'  <div class="cap" id="cap"></div>\n' +
'<script>\n' +
'  var CAPTION = ' + JSON.stringify(caption) + ';\n' +
runtime +
'<\/script></body></html>'
    );
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  global.buildStandaloneHTML = buildStandaloneHTML;
})(window);
