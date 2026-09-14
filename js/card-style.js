/*
 * card-style.js
 * ------------------------------------------------------------------
 * 「五月天真人照輪播模板」的卡片設計系統 CSS（規格 §2、§3、§7、§12）。
 *
 * 這段 CSS 是「唯一真相來源」：
 *   - 製作器的即時預覽會把它注入 <style>
 *   - 匯出的獨立 HTML 也直接內嵌同一份
 * 兩邊共用同一份，保證「預覽長怎樣、下載出來就長怎樣」。
 *
 * 想換品牌色：只改下面的 --gold 一個變數即可，其餘結構不動（規格 §2）。
 */
(function (global) {
  'use strict';

  // Google Fonts：標題 Noto Serif TC 700／內文 Noto Sans TC 300、500（規格 §1）
  global.CARD_FONTS_LINK =
    '<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@500;700&family=Noto+Sans+TC:wght@300;400;500&display=swap" rel="stylesheet">';

  // html2canvas 1.4.1（規格 §8）
  global.HTML2CANVAS_SRC =
    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';

  // 卡片原生尺寸（規格 §1）
  global.CARD_W = 1080;
  global.CARD_H = 1350;

  global.CARD_CSS = `
  :root{
    --gold:#f6dfa3;                 /* 鵝黃金：唯一主色（規格 §2） */
    --gold-line:rgba(246,223,163,.8);
    --gold-rule:rgba(246,223,163,.45);
  }

  /* 一張原生卡：1080×1350 純黑底、全出血（規格 §1、§3） */
  .card{
    position:relative; width:1080px; height:1350px;
    background:#000; overflow:hidden;
    font-family:'Noto Sans TC',sans-serif;
  }
  .card .photo{
    position:absolute; top:0; left:0; width:1080px; height:1350px;
    object-fit:cover; display:block;
  }
  /* 沒放照片時的占位（純預覽用；匯出前請補上照片） */
  .card .photo-empty{
    background:
      radial-gradient(120% 80% at 50% 0%, #262015 0%, #000 70%);
  }
  .card .photo-empty::after{
    content:'尚未放入照片'; position:absolute; inset:0;
    display:flex; align-items:center; justify-content:center;
    color:rgba(246,223,163,.35); font-size:34px; letter-spacing:.2em;
  }

  /* 遮罩（規格 §7） */
  .card .grad{position:absolute; inset:0;}
  .card.cover .grad{
    background:linear-gradient(to bottom,
      rgba(0,0,0,.22) 0%, transparent 14%, transparent 46%,
      rgba(0,0,0,.20) 60%, rgba(0,0,0,.58) 78%,
      rgba(0,0,0,.88) 90%, #000 100%);
  }
  .card.inner .grad{background:rgba(0,0,0,.52);}   /* 依照片亮度在 .45–.62 之間微調 */

  /* 頂欄：01｜08 ── 系列英文標（規格 §3） */
  .card .topbar{
    position:absolute; top:52px; left:0; right:0; padding:0 66px;
    display:flex; justify-content:space-between; align-items:center;
    color:rgba(255,255,255,.85); font-size:23px; letter-spacing:.22em;
    text-shadow:0 1px 8px rgba(0,0,0,.8);
  }

  /* Photo credit：僅非本人照才加，top:104px（規格 §3） */
  .card .credit{
    position:absolute; top:104px; left:0; right:0; padding:0 66px;
    color:rgba(255,255,255,.72); font-size:19px; letter-spacing:.04em;
    text-shadow:0 1px 8px rgba(0,0,0,.9);
  }

  /* 文字區：沉左下（規格 §3） */
  .card .tz{
    position:absolute; left:0; right:0; bottom:0; padding:0 66px 52px;
    text-align:left;
  }
  .card.cta .tz{text-align:center;}   /* CTA 例外置中（規格 §4） */

  /* 左側金線：錨點＋標題共用（規格 §3） */
  .card .accent{
    border-left:4px solid var(--gold-line);
    padding-left:26px; margin-left:-30px; margin-bottom:24px;
  }
  .card.cta .accent{border:none; padding:0; margin:0 0 24px;}

  .card .anchor{
    font-family:'Noto Serif TC',serif; font-weight:700; font-size:60px;
    color:var(--gold); line-height:1.25;
  }
  .card .head{
    font-family:'Noto Serif TC',serif; font-weight:700; font-size:60px;
    color:#fff; line-height:1.3; margin-top:6px;
  }
  .card .head em{color:var(--gold); font-style:normal;}   /* 關鍵字包 <em> → 鵝黃 */

  .card .body{
    font-family:'Noto Sans TC',sans-serif; font-weight:300; font-size:25px;
    line-height:1.72; color:rgba(255,255,255,.86); margin-top:6px;
  }
  .card .rule{
    width:80px; height:1px; background:var(--gold-rule); margin:26px 0;
  }
  .card.cta .rule{margin:26px auto;}

  .card .close{
    font-size:32px; font-weight:500; color:var(--gold); line-height:1.4;
  }
  .card .foot{
    margin-top:26px; font-size:19px; color:rgba(255,255,255,.34);
    letter-spacing:.05em;
  }

  /* 所有文字用雙層陰影浮字，取代暗色底板（規格 §3、§12） */
  .card .anchor,.card .head,.card .body,.card .close,.card .foot,.card .credit{
    text-shadow:0 1px 8px rgba(0,0,0,.95), 0 2px 26px rgba(0,0,0,.75);
  }
  `;
})(window);
