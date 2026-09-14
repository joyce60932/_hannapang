/*
 * presets/timing.js — 預設主題：〈同樣每月 1 萬，早開始差多少？〉
 * ------------------------------------------------------------------
 * 時間 × 複利（早開始 vs 晚開始）。模板 B（極簡白對比）。
 * 打包時用 --preset presets/timing.js 注入；在 app.js 之前執行、可用 window.ART。
 *
 * 數字（每月 1 萬、年化 8%、存到 40 歲）：
 *   16 年 → 387 萬｜26 年 → 1,042 萬｜36 年 → 2,496 萬｜封面差 2,100 萬
 */
window.CAROUSEL_PRESET = {
  ns: 'timing',
  active: 'B',
  states: {
    B: (function () {
      var A = window.ART || {};
      return {
        template: 'B',
        settings: {
          headerLabel: '換個角度，看待時間',
          signature: '@_hannapang',
          footNote: '依本篇設定價格試算',
          hashtag: '#時間與複利',
        },
        caption:
          '我沒辦法給孩子全世界，\n但我可以給他，\n一個「早一點開始」的時間。\n\n' +
          '同樣每月一萬，\n早開始十年，\n差的不是錢，是整個未來的選項。\n\n' +
          '時間不會等人，\n但它會獎勵，早出發的人。\n\n' +
          '#龐玉涵 #幣圈媽媽 #時間與複利',
        cards: [
          // 1 封面｜破題數字
          { id: 't1', type: 'cover', img: A.hourglass || '',
            title: '同樣每月存 1 萬\n早開始 20 年 = 多滾 2,100 萬 😳',
            price: '每月 1 萬 · 年化 8%（示意）',
            note: '時間，才是複利最貴的成本 →' },
          // 2 情緒提問（純文字置中）
          { id: 't2', type: 'cta',
            title: '真正貴的不是錢\n是「時間」',
            note: '你以為，給孩子錢就夠了嗎？\n同樣每月 1 萬，早開始、晚開始，結果差到你不敢相信。' },
          // 3 對比 VS｜早 vs 晚
          { id: 't3', type: 'compare', leftImg: A.piggy || '', rightImg: A.money || '',
            leftLabel: '晚開始（24 歲起）', leftPrice: '存 16 年', leftCap: '40 歲時', leftBig: '387 萬',
            rightLabel: '早開始（4 歲起）', rightPrice: '存 36 年', rightCap: '40 歲時', rightBig: '2,496 萬',
            note: '同月同金額，只差起跑時間\n差了 2,100 萬' },
          // 4 A
          { id: 't4', type: 'stat', img: A.coinGrowth || '',
            kicker: '24 歲才開始 · 存到 40 歲', big: '387 萬',
            label: '16 年 × 每月 1 萬（本金 192 萬）',
            note: '有存，但錯過最會滾的那幾年' },
          // 5 B
          { id: 't5', type: 'stat', img: A.coinGrowth || '',
            kicker: '14 歲開始 · 存到 40 歲', big: '1,042 萬',
            label: '26 年 × 每月 1 萬（本金 312 萬）',
            note: '只早 10 年，多滾出 600 多萬' },
          // 6 C
          { id: 't6', type: 'stat', img: A.money || '',
            kicker: '4 歲就開始 · 存到 40 歲', big: '2,496 萬',
            label: '36 年 × 每月 1 萬（本金 432 萬）',
            note: '（示意試算，年化會浮動、投資有風險）' },
          // 7 我的選擇 / CTA
          { id: 't7', type: 'cta',
            title: '我選擇\n從孩子 4 歲就開始',
            note: '① 每月 15 號，定期定額 1 萬\n② 不追高、不停手，讓時間工作\n追蹤我，一起記錄 →' },
        ],
      };
    })(),
  },
};
