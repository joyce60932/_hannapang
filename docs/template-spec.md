# 五月天真人照輪播模板 — 完整規格（for code）

> 這份文件是一個**可重複使用的版型規格**。把它貼進 Claude Code 後，
> 只要再提供「每一張的文案 + 對應照片」，就能產出一支**單一自足的 HTML**
> （圖片 base64 內嵌、可預覽、可下載 1080×1350 PNG、可複製 Caption）。
>
> 生成時請嚴格遵守下面的數值與規則，八張卡的字級、對齊、顏色、間距節奏必須一致，
> 只有「照片」和「文字量」會變。

---

## 0. 何時用這個模板

- 適用：**故事型、觀點型**內容（個人故事、關係情感、思維洞見、強烈論點）。
- 不適用：K 棒、圖表、數據教學 → 那是另一套「奶油色知識模板」，不要混用。
- 核心美學：純黑底 + 全出血真人照 + 鵝黃金（`#f6dfa3`）為唯一主色，文字沉左下、大量留白。

---

## 1. 輸出規格

| 項目 | 值 |
|---|---|
| 卡片尺寸 | **1080 × 1350**（IG 直式 4:5），原生像素 |
| 背景 | 純黑 `#000` |
| 預覽 | 原生 1080×1350 卡片，用 CSS `transform: scale()` 縮小顯示 |
| 下載 | html2canvas 1.4.1 輸出 **1080×1350 PNG**（乾淨 4:5，不可有黑邊） |
| 檔案 | 單一 `.html`，所有圖片 **base64 內嵌**，無任何外部路徑 |
| 字型 | 標題 `Noto Serif TC` 700／內文 `Noto Sans TC` 300、500 |

---

## 2. 色彩系統

| 用途 | 色值 |
|---|---|
| 背景 | `#000` |
| 主色（錨點／強調字／收尾／金線） | 鵝黃金 `#f6dfa3` |
| 標題白字 | `#fff` |
| 內文 | 白 86% `rgba(255,255,255,.86)` |
| 頂欄 | 白 85% `rgba(255,255,255,.85)` |
| 頁尾 | 白 34% `rgba(255,255,255,.34)` |
| 金線（左側直線） | `rgba(246,223,163,.8)` |
| 金色分隔線 | `rgba(246,223,163,.45)` |

> 想換品牌色：只替換 `#f6dfa3` 這一個變數即可，其餘結構不動。

---

## 3. 版面結構（由上到下）＋ 精確數值

所有數值以 **1080×1350 原生卡**為準。

```
┌─────────────────────────────┐
│ 頂欄  01｜08        HANNA STORY ✦ │  ← top:52px, padding:0 66px
│                                   │
│                                   │
│         （照片全出血）             │
│                                   │
│                                   │
│  ▍錨點（鵝黃）                     │  ← 文字區沉左下
│  ▍標題白字，關鍵字鵝黃              │     padding:0 66px 52px
│  內文段落…                         │     全部靠左對齊
│  ── 金線                          │
│  收尾句（鵝黃）                     │
│  @_hannapang                      │
└─────────────────────────────┘
```

### 逐層數值

| 元素 | 規格 |
|---|---|
| **頂欄** | `position:absolute; top:52px; padding:0 66px;` flex 兩端對齊 |
| 頂欄左 | 頁碼 `01｜08`（固定顯示，`0N｜總數`） |
| 頂欄右 | `HANNA STORY ✦`（或該系列英文標）|
| 頂欄字 | 23px，`letter-spacing:.22em`，白 85% |
| **Photo credit**（僅非本人照才加）| 白色小字，`top:104px`，例：`Photo from IG@imayday55555` |
| **照片** | 全出血，`position:absolute; top:0; left:0;`（見 §6 照片處理）|
| **遮罩** | 見 §7 |
| **文字區** | `position:absolute; bottom:0; padding:0 66px 52px;` 全靠左 |
| 左側金線 | `border-left:4px solid rgba(246,223,163,.8); padding-left:26px; margin-left:-30px;`（錨點＋標題共用這條線）|
| **錨點**（歌名／主題詞）| `Noto Serif TC` 700，**60px**，鵝黃 `#f6dfa3` |
| **標題** | `Noto Serif TC` 700，**60px**，白；關鍵字包 `<em>` → 鵝黃、`font-style:normal` |
| **內文** | `Noto Sans TC` 300，**25px**，`line-height:1.72`，白 86%；**寫成連續段落，不要一句一行** |
| 金色分隔線 | `width` 依設計，`height:1px`，`background:rgba(246,223,163,.45)` |
| **收尾句** | 32px，鵝黃 `#f6dfa3`，weight 500 |
| **頁尾** | `@_hannapang`，19px，白 34% |
| **文字陰影**（所有文字，取代暗底）| `text-shadow:0 1px 8px rgba(0,0,0,.95), 0 2px 26px rgba(0,0,0,.75);` |

> 錨點與標題**同字級**，讓錨點成為主要視覺錨。文字絕不加暗色底板，靠雙層陰影浮字。

### 排版共同規則

- 所有內容文字（錨點／標題／內文）**靠左、往左下沉、由下往上堆**，留白集中在卡片上半。
- 內容底停在**頁尾上方的安全線**，不壓到頁尾；`@帳號` 左下、`頁碼` 右下，八張位置一致。
- 內頁三層文字沉到左下、內文變長時會頂到視覺內框，`padding` 要預留。

---

## 4. 三種卡片的差異

| 卡片 | 文字對齊 | 遮罩 | 說明 |
|---|---|---|---|
| **封面** | 左下 | **上→下漸層**（上淺下深）| 主標壓下半、上半露臉露構圖 |
| **內頁** | 左下 | **整片均勻純色** | 文字佔大半張，整張都要壓得住 |
| **CTA（最後一張）** | **置中** | 均勻純色 | 收尾行動訴求置中，更集中有力 |

封面與內頁用**同一套左下形式**，不另做特殊構圖；只有 CTA 例外置中。

---

## 5. 封面鉤子檢查

封面那句＝整篇鉤子。定稿前自問：**一個不認識你的人滑到這張，會想看下一張嗎？** 不會 → 重寫。
避免三件事：太早講結論、超過兩句、要想一下才懂（清晰優先）。

---

## 6. 照片處理（關鍵，錯了會扭曲或有黑邊）

**規則一：照片一定要先在 Python 預裁成「該格框的精確比例」，再注入 HTML。**
html2canvas **會忽略 CSS `object-fit`**，直式照直接塞會被拉扁。全出血封面／內頁請一律裁成 **1080×1350（4:5）**，讓照片框比例＝卡片比例，就不需要靠 object-fit。

**規則二：照片一律 base64 內嵌。**
用 `<img src="data:image/jpeg;base64,…">`，**不要用檔案路徑、也不要用 CSS `background-image`**。
聊天沙盒 iframe 讀不到外部路徑，只有內嵌 base64 才能「預覽看得到、PNG 也截得到」。

**規則三：控制檔案大小**，單張壓到 ≤ ~400KB（JPEG，品質由高往下降到達標）。

```python
# 照片預裁 + 壓縮 + base64
from PIL import Image
import io, base64

def prep(src, out_w=1080, out_h=1350, top_bias=0.10):
    ratio = out_w / out_h                      # 0.8
    im = Image.open(src).convert("RGB")
    W, H = im.size
    if W / H > ratio:                          # 太寬 → 裁左右
        new_w = int(round(H * ratio)); x = int((W-new_w)*0.5)
        im = im.crop((x, 0, x+new_w, H))
    else:                                       # 太高 → 裁上下（保留上半的臉）
        new_h = int(round(W / ratio)); removed = H-new_h
        y = int(round(removed * top_bias))     # top_bias 越小，保留越多上半
        im = im.crop((0, y, W, y+new_h))
    im = im.resize((out_w, out_h), Image.LANCZOS)
    q = 90
    while q >= 40:
        buf = io.BytesIO()
        im.save(buf, "JPEG", quality=q, optimize=True, progressive=True)
        if len(buf.getvalue())/1024 <= 400: break
        q -= 5
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()
```

---

## 7. 遮罩壓法（真人照當底）

**封面 — 上→下漸層**（上半保留照片顏色與臉，下半壓黑讓字浮起）：

```css
background:linear-gradient(to bottom,
  rgba(0,0,0,.22) 0%, transparent 14%, transparent 46%,
  rgba(0,0,0,.20) 60%, rgba(0,0,0,.58) 78%,
  rgba(0,0,0,.88) 90%, #000 100%);
```

**內頁 — 整片均勻純色**（文字佔大半張，整張壓得住）：

```css
background:rgba(0,0,0,.52);   /* 依照片亮度在 .45–.62 之間調 */
```

**調整依據**

- 遮罩一律**黑色**（中性不偏色，最能讓金字白字浮起）；除非整篇是強色溫主題才換帶色溫深色。
- **照片越亮、壓越重**（暗照輕、亮照重）；文字落在亮部再加深、落在暗部可放輕。
- **一定要看渲染再定案**：不夠清楚就以 5–8% 一階往上加，太悶就往下降。

---

## 8. html2canvas 下載（避免黑邊／扭曲）

- **不要傳 `width`／`height` 給 html2canvas**（傳了會把小卡塞進大畫布 → 黑邊）。
- 卡片用原生 1080×1350，下載時 `scale: 1` 即得 1080×1350。
- 下載前 `await document.fonts.ready`，確保字型已載入才截圖。
- 用**離螢幕 clone**：`position:fixed; left:-9999px`（**不要用 `opacity:0`**），截完移除。
- 若卡片在預覽時被 `transform:scale()` 縮過，clone 出來的節點必須是**未被 transform 的原生尺寸**。

```js
async function downloadCard(cardEl, filename){
  if (document.fonts?.ready) await document.fonts.ready;
  const clone = cardEl.cloneNode(true);
  Object.assign(clone.style, { position:'fixed', left:'-9999px', top:'0', transform:'none' });
  document.body.appendChild(clone);
  const canvas = await html2canvas(clone, { scale:1, backgroundColor:'#000', useCORS:true, logging:false });
  document.body.removeChild(clone);
  await new Promise(res => canvas.toBlob(b=>{
    const a=document.createElement('a'); a.href=URL.createObjectURL(b);
    a.download=filename; a.click(); URL.revokeObjectURL(a.href); res();
  },'image/png'));
}
```

---

## 9. 一定要顯示在畫面上的下載提示

把這句**寫進 HTML 的提示區**（不能只寫在規格裡）：

> ⚠️ 下載要用 **Chrome / Safari 在本機開啟這個 HTML** 才有效，在對話預覽框內點按鈕沒反應是正常現象。

---

## 10. Caption 格式（附「複製整段」鍵）

- Caption 區放一顆「**複製整段**」按鈕（放在下載鍵旁），一鍵複製到剪貼簿。
- **固定短斷句格式**：每行一句短句、口語，意群之間空一行，最後一行接 CTA，
  再換行放**單一主題 hashtag**（只放這篇主題那一個，不要一串）。

```
存不到錢
不是你賺得不夠

是沒有第一桶本金
再拼都像倉鼠跑滾輪
跑得再快，還是停在原地

能利滾利的是錢
不是你的體力

想存出第一桶
再讓錢自己滾
留言「+7」，我把完整流程私訊給你

#理財知識
```

---

## 11. 顯示元素（一次設定，不逐張問）

- **帳號 ID**：`@_hannapang`，自動帶到每張頁尾。
- **頁碼**：每張右上／頂欄固定 `0N｜總數`。
- **固定 Hashtag**：若有，顯示為封面小標籤；每篇完整串放 Caption 最後一行。**沒設定就整個不顯示**，不要留「未設定」空欄。

---

## 12. 參考實作骨架（多卡＋導覽＋下載＋複製）

> 把 `CARDS` 換成實際內容、`img` 換成 §6 產生的 base64 即可。字型用 Google Fonts link；
> 若要離線可攜，改成 base64 內嵌字型。

```html
<!DOCTYPE html>
<html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@500;700&family=Noto+Sans+TC:wght@300;400;500&display=swap" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#111;color:#eee;font-family:'Noto Sans TC',sans-serif;
       min-height:100vh;display:flex;flex-direction:column;align-items:center;gap:16px;padding:20px}
  /* 預覽舞台：把 1080 原生卡縮小顯示 */
  .stage{position:relative;width:1080px;height:1350px;transform-origin:top center}
  .card{position:absolute;inset:0;width:1080px;height:1350px;background:#000;overflow:hidden;display:none}
  .card.on{display:block}
  .card .photo{position:absolute;top:0;left:0;width:1080px;height:1350px;object-fit:cover}
  .card .grad{position:absolute;inset:0}
  .cover .grad{background:linear-gradient(to bottom,rgba(0,0,0,.22)0%,transparent 14%,transparent 46%,rgba(0,0,0,.20)60%,rgba(0,0,0,.58)78%,rgba(0,0,0,.88)90%,#000 100%)}
  .inner .grad{background:rgba(0,0,0,.52)}
  .topbar{position:absolute;top:52px;left:0;right:0;padding:0 66px;display:flex;justify-content:space-between;
          color:rgba(255,255,255,.85);font-size:23px;letter-spacing:.22em;text-shadow:0 1px 8px rgba(0,0,0,.8)}
  .tz{position:absolute;left:0;right:0;bottom:0;padding:0 66px 52px;text-align:left}
  .card.cta .tz{text-align:center}
  .accent{border-left:4px solid rgba(246,223,163,.8);padding-left:26px;margin-left:-30px;margin-bottom:24px}
  .card.cta .accent{border:none;padding:0;margin:0 0 24px}
  .anchor{font-family:'Noto Serif TC',serif;font-weight:700;font-size:60px;color:#f6dfa3;line-height:1.25}
  .head{font-family:'Noto Serif TC',serif;font-weight:700;font-size:60px;color:#fff;line-height:1.3;margin-top:6px}
  .head em{color:#f6dfa3;font-style:normal}
  .body{font-family:'Noto Sans TC',sans-serif;font-weight:300;font-size:25px;line-height:1.72;color:rgba(255,255,255,.86);margin-top:6px}
  .rule{width:80px;height:1px;background:rgba(246,223,163,.45);margin:26px 0}
  .card.cta .rule{margin:26px auto}
  .close{font-size:32px;font-weight:500;color:#f6dfa3;line-height:1.4}
  .foot{margin-top:26px;font-size:19px;color:rgba(255,255,255,.34);letter-spacing:.05em}
  .anchor,.head,.body,.close,.foot{text-shadow:0 1px 8px rgba(0,0,0,.95),0 2px 26px rgba(0,0,0,.75)}
  .nav{display:flex;gap:12px;align-items:center}
  .btn{font-family:'Noto Sans TC';font-size:15px;font-weight:500;color:#111;background:#f6dfa3;border:none;border-radius:999px;padding:11px 22px;cursor:pointer}
  .ghost{background:transparent;color:#f6dfa3;border:1px solid rgba(246,223,163,.5)}
  .dots{display:flex;gap:6px}.dot{width:8px;height:8px;border-radius:50%;background:#555}.dot.on{background:#f6dfa3}
  .note{max-width:560px;font-size:13px;line-height:1.7;color:#c9b98a;background:rgba(246,223,163,.08);
        border:1px solid rgba(246,223,163,.22);border-radius:12px;padding:12px 16px;text-align:center}
  .cap{max-width:560px;width:100%;background:#1b1b1b;border-radius:12px;padding:16px;white-space:pre-wrap;
       font-size:14px;line-height:1.7;color:#ddd}
</style></head><body>

  <div class="stage" id="stage"></div>

  <div class="nav">
    <button class="btn ghost" id="prev">◀</button>
    <div class="dots" id="dots"></div>
    <button class="btn ghost" id="next">▶</button>
  </div>
  <div class="nav">
    <button class="btn" id="dlOne">下載此張</button>
    <button class="btn" id="dlAll">下載全部</button>
    <button class="btn ghost" id="copyCap">複製整段 Caption</button>
  </div>

  <div class="note">⚠️ 下載要用 <b>Chrome / Safari 在本機開啟這個 HTML</b> 才有效，在對話預覽框內點按鈕沒反應是正常現象。</div>
  <div class="cap" id="cap"></div>

<script>
  // ===== 內容：改這裡 =====
  const TOTAL_LABEL = "HANNA STORY ✦";
  const CARDS = [
    { type:"cover", img:"data:image/jpeg;base64,____", anchor:"錨點", head:"標題，<em>關鍵字</em>", body:"", close:"收尾句" },
    { type:"inner", img:"data:image/jpeg;base64,____", anchor:"錨點", head:"標題", body:"內文段落…", close:"收尾句" },
    // …更多內頁…
    { type:"cta",   img:"data:image/jpeg;base64,____", anchor:"換你了", head:"如果今天給你一個選擇", body:"你最想用投資，換到什麼？", close:"留言告訴我" },
  ];
  const CAPTION = `第一句\n第二句\n\n最後一句 CTA\n\n#單一主題標籤`;
  // ========================

  const N = CARDS.length, stage = document.getElementById('stage');
  CARDS.forEach((c,i)=>{
    const cls = c.type==="cover"?"cover":c.type==="cta"?"inner cta":"inner";
    const num = String(i+1).padStart(2,'0')+"｜"+String(N).padStart(2,'0');
    stage.insertAdjacentHTML('beforeend',
      `<div class="card ${cls} ${i===0?'on':''}" data-i="${i}">
         <img class="photo" src="${c.img}">
         <div class="grad"></div>
         <div class="topbar"><span>${num}</span><span>${TOTAL_LABEL}</span></div>
         <div class="tz">
           <div class="accent"><div class="anchor">${c.anchor}</div>${c.head?`<div class="head">${c.head}</div>`:''}</div>
           ${c.body?`<div class="body">${c.body}</div>`:''}
           <div class="rule"></div>
           ${c.close?`<div class="close">${c.close}</div>`:''}
           <div class="foot">@_hannapang</div>
         </div>
       </div>`);
  });
  const dots = document.getElementById('dots');
  CARDS.forEach((_,i)=>dots.insertAdjacentHTML('beforeend',`<div class="dot ${i===0?'on':''}"></div>`));

  let cur = 0;
  const cards = [...document.querySelectorAll('.card')];
  const dotsEl = [...document.querySelectorAll('.dot')];
  function show(i){ cur=(i+N)%N; cards.forEach((c,k)=>c.classList.toggle('on',k===cur));
                    dotsEl.forEach((d,k)=>d.classList.toggle('on',k===cur)); }
  document.getElementById('prev').onclick=()=>show(cur-1);
  document.getElementById('next').onclick=()=>show(cur+1);
  addEventListener('keydown',e=>{ if(e.key==='ArrowLeft')show(cur-1); if(e.key==='ArrowRight')show(cur+1); });

  // 預覽縮放
  function fit(){ const s=Math.min((innerWidth-40)/1080,(innerHeight*0.72)/1350);
                 stage.style.transform=`scale(${s})`; stage.style.height=(1350*s)+'px'; }
  addEventListener('resize',fit); fit();

  async function dl(cardEl, name){
    if(document.fonts?.ready) await document.fonts.ready;
    const clone=cardEl.cloneNode(true);
    Object.assign(clone.style,{position:'fixed',left:'-9999px',top:'0',transform:'none',display:'block'});
    document.body.appendChild(clone);
    const canvas=await html2canvas(clone,{scale:1,backgroundColor:'#000',useCORS:true,logging:false});
    document.body.removeChild(clone);
    await new Promise(r=>canvas.toBlob(b=>{const a=document.createElement('a');
      a.href=URL.createObjectURL(b);a.download=name;a.click();URL.revokeObjectURL(a.href);r();},'image/png'));
  }
  document.getElementById('dlOne').onclick=()=>dl(cards[cur],`hanna_${String(cur+1).padStart(2,'0')}.png`);
  document.getElementById('dlAll').onclick=async()=>{ for(let i=0;i<N;i++) await dl(cards[i],`hanna_${String(i+1).padStart(2,'0')}.png`); };

  const cap=document.getElementById('cap'); cap.textContent=CAPTION;
  document.getElementById('copyCap').onclick=async()=>{ await navigator.clipboard.writeText(CAPTION);
    const b=document.getElementById('copyCap'); b.textContent='已複製 ✓'; setTimeout(()=>b.textContent='複製整段 Caption',1500); };
</script></body></html>
```

---

## 13. 建置檢查清單

- [ ] 照片已在 Python 預裁成 1080×1350，base64 內嵌，無外部路徑、無 `background-image`。
- [ ] html2canvas **未傳 width/height**，用 `scale`；clone 以 `position:fixed;left:-9999px` 離螢幕。
- [ ] 下載前 `await document.fonts.ready`。
- [ ] JS 以 `node --check` 驗證通過。
- [ ] 下載提示句已顯示在畫面上。
- [ ] 頁碼 `0N｜總數`、`@_hannapang`、封面鉤子檢查都過。
- [ ] Caption 為短斷句 + 單一主題 hashtag，附「複製整段」鍵。
