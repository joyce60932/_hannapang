# 輪播貼文製作器 — HANNA STORY

@_hannapang 專用的 Instagram **輪播貼文製作器**（純前端網頁，開了就能用）。
內建**兩套可切換的模板**，每套各自存一份內容、互不覆蓋：

| 模板 | 風格 | 適合 |
|---|---|---|
| **A｜黑金真人照** | 純黑底 + 全出血真人照 + 鵝黃金 `#f6dfa3`，文字沉左下 | 故事型、觀點型、情緒 |
| **B｜極簡白對比** | 白底 + 去背產品圖 + 大數字，置中堆疊 / 左右 VS | 機會成本、價格對比、開箱 |

兩套都輸出 IG 直式 1080×1350，可下載 PNG、複製 Caption、匯出獨立 HTML。
右上角「模板」下拉即可切換。

## 這個工具做什麼

1. **填文案** — 每張卡填錨點、標題、內文、收尾句；標題關鍵字用 `*星號*` 包住會變鵝黃。
2. **放照片** — 上傳照片會在瀏覽器裡自動裁成精確 1080×1350（保留上半的臉）並壓縮，
   避開 html2canvas 忽略 `object-fit` 會把直式照拉扁的問題。
3. **即時預覽** — 右側原生 1080×1350 卡片，縮小顯示，左右切換每一張。
4. **下載 PNG** — 用 html2canvas 輸出乾淨的 1080×1350 PNG（單張或全部）。
5. **複製 Caption** — 短斷句 + 單一主題 hashtag，一鍵複製到 IG。
6. **匯出獨立 HTML** — 打包成一支**單一自足的 HTML**（圖片 base64 內嵌、無外部路徑），
   之後不需要這個工具也能開啟、預覽、下載、複製。

## 怎麼用

直接用 **Chrome / Safari 本機開啟 `index.html`** 即可。

> ⚠️ 下載 PNG 一定要在本機瀏覽器開啟才有效；在對話預覽框內點下載沒反應是正常現象。

線上字型（Noto Serif/Sans TC）與 html2canvas 由 CDN 載入，第一次使用需連網。

## 卡片三種型態（規格 §4）

| 型態 | 遮罩 | 文字對齊 | 用途 |
|---|---|---|---|
| **封面 cover** | 上→下漸層（上淺下深） | 左下 | 整篇鉤子，上半露臉露構圖 |
| **內頁 inner** | 整片均勻純色 | 左下 | 文字佔大半張 |
| **CTA cta** | 整片均勻純色 | 置中 | 收尾行動訴求 |

## 檔案結構

```
index.html          製作器介面
css/app.css         工具操作介面樣式
js/card-style.js    模板 A 的卡片設計系統 CSS（黑金真人照）
js/render.js        模板 A 的卡片 HTML 產生器
js/templates.js     模板註冊表（A/B 的 CSS、欄位 schema、render、預設內容）
js/photo.js         照片裁切 1080×1350（A）／去背 PNG 等比縮放（B）
js/export.js        打包成單一自足的獨立 HTML（依模板）
js/app.js           狀態管理、編輯、預覽、下載、匯出、模板切換
docs/template-spec.md      模板 A 原始版型規格
docs/scripts/              貼文文案腳本
```

## 要再加一套模板？

在 `js/templates.js` 的 `TEMPLATES` 加一個物件（`css` / `types` / `settingsSchema` /
`fields()` / `newCard()` / `render()` / `defaultState()`），並把 id 加進 `TEMPLATE_ORDER` 即可，
`app.js` 與 `export.js` 會自動支援，不用改別的地方。

## 想換品牌色

只改 `js/card-style.js` 裡的 `--gold`（`#f6dfa3`）一個變數，其餘結構不動。

## 資料儲存

編輯內容會自動存在瀏覽器 localStorage。照片較大時可能超過容量，屆時只會保留文字，
請盡快用「匯出獨立 HTML」把成品存下來。
