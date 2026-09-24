/*
 * presets/story-template.js — 「故事型長文・幣圈教官」系列・可重複空白模板
 * ------------------------------------------------------------------
 * 人設：Hanna 龐玉涵｜教路人交易的幣圈教官（理性而溫暖、給工具不給答案）。
 * 模板 A（黑金滿版真人照）。8 頁故事型長文架構，篩選「想學習的人」。
 * 每張卡先放「該頁要寫什麼」的提示，替換掉即可；照片自己插。
 * ⚠️ 合規：不喊單、不報明牌、不保證獲利，只給觀念＋工具＋止損紀律；結尾附免責。
 */
window.CAROUSEL_PRESET = {
  ns: 'story_tpl',
  version: '1',
  active: 'A',
  states: {
    A: (function () {
      return {
        template: 'A',
        settings: {
          seriesLabel: '幣圈教官',
          account: '@_hannapang',
          hashtag: '#幣圈教官',
        },
        caption:
          '（Caption：短斷句、口語。把故事的金句＋那條規則濃縮 3–5 句，\n' +
          '最後放分享台詞與「私訊 +6 領工具」，再換行放標籤。\n' +
          '結尾務必：以上為個人分享，不構成投資建議。）\n\n' +
          '#龐玉涵 #幣圈教官 #交易紀律',
        cards: [
          // P1 封面：反常識鉤子
          { id: 's1', type: 'cover', anchor: '主題詞（例：止損）',
            head: '封面鉤子：衝突畫面＋一句話\n（關鍵字用 *星號* 變金）', body: '',
            close: '看完這篇，你會知道＿＿', credit: '' },
          // P2 故事（上）
          { id: 's2', type: 'inner', anchor: '故事',
            head: '', body: '故事（上）：完整講一個真實或經典故事。\n前半段不提交易——這是在篩選願意讀完的人。',
            close: '', credit: '' },
          // P3 故事（下）
          { id: 's3', type: 'inner', anchor: '故事',
            head: '', body: '故事（下）：把故事講完，留一個張力/轉折點。',
            close: '', credit: '' },
          // P4 轉折：拉進讀者
          { id: 's4', type: 'inner', anchor: '轉折',
            head: '現在，想想你上次…', body: '寫出讀者真實會做的「具體失敗行為」——越具體越好，\n讓人覺得「在說我」。',
            close: '', credit: '' },
          // P5 比喻金句
          { id: 's5', type: 'inner', anchor: '金句',
            head: '一句把故事和交易接起來的話\n（關鍵字用 *星號* 上金，可截圖收藏）', body: '',
            close: '', credit: '' },
          // P6 一條可執行規則
          { id: 's6', type: 'inner', anchor: '一條規則',
            head: '只給一個動作', body: '連到教學核心：方向判斷／1% 風險／系統流程。\n給工具，不給明牌。',
            close: '', credit: '' },
          // P7 真實經歷/學生案例
          { id: 's7', type: 'inner', anchor: '我的經歷',
            head: '', body: '你自己的真實經歷，或學生案例——建立可信度。',
            close: '', credit: '' },
          // P8 工具 + CTA
          { id: 's8', type: 'cta', anchor: '換你了',
            head: '給你一個工具', body: '檢查表／清單（例：下單前止損檢查表\n方向確認 → 止損位置 → 虧損 ≤ 1% → 寫下出場條件）',
            close: '分享給需要的朋友，配一句「＿」\n想知道我怎麼判斷方向，私訊「+6」\n以上為個人分享，不構成投資建議', credit: '' },
        ],
      };
    })(),
  },
};
