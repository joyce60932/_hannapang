/*
 * presets/dca-why.js — 定期定額系列 #2
 * ------------------------------------------------------------------
 * 〈為什麼小資更該定期定額（不是有錢才能投資）〉— 反轉鉤子 + 破除門檻。
 * 模板 B（極簡白對比）。打包時用 --preset presets/dca-why.js。
 * 數字：每月 3,000（≈一天 100 元）、年化 8%、20 年 ≈ 177 萬。
 * 合規：講觀念與自己的做法，不報明牌、不保證報酬。
 */
window.CAROUSEL_PRESET = {
  ns: 'dca_why',
  active: 'B',
  states: {
    B: (function () {
      var A = window.ART || {};
      return {
        template: 'B',
        settings: {
          headerLabel: '定期定額・入門',
          signature: '@_hannapang',
          footNote: '我的做法，非投資建議',
          hashtag: '#定期定額大富翁',
        },
        caption:
          '很多人跟我說：\n「等我有錢一點再開始投資。」\n\n' +
          '但真相是——\n不是有錢才能投資，\n是投資，才會讓你有錢。\n\n' +
          '每月 3,000（一天 100 元），\n年化 8%、20 年，\n也能滾出約 177 萬。\n\n' +
          '你缺的從來不是本金，\n是「開始」。\n\n' +
          '#龐玉涵 #幣圈媽媽 #定期定額大富翁',
        cards: [
          // 1 封面｜好奇缺口鉤子（答案藏到內頁）
          { id: 'w1', type: 'cover', img: A.bubbleTea || '',
            title: '每天 100 元\n20 年後會變多少？',
            price: '小資也能滾出的數字，你可能想不到',
            note: '答案往右滑 →' },
          // 2 共鳴（第一人稱、不說教）
          { id: 'w2', type: 'cta',
            title: '我一開始也想\n「等有錢再說」',
            note: '但每晚一年開始，就少一年複利。\n後來我才懂：時間，才是小資最強的優勢。' },
          // 3 小額力量（數字）
          { id: 'w3', type: 'stat', img: A.money || '',
            kicker: '每月 3,000（一天 100 元）', big: '20 年 ≈ 177 萬',
            label: '年化 8%（示意），比一杯手搖飲還少',
            note: '小額 × 時間，一樣能滾出一桶金' },
          // 4 三個理由
          { id: 'w4', type: 'cta',
            title: '小資更該定期定額\n因為…',
            note: '① 小額就能開始（幾千元也行）\n② 自動扣款，幫你逼出紀律\n③ 不用一大筆錢、不用挑時機' },
          // 5 對比 VS：等有錢 vs 現在開始
          { id: 'w5', type: 'compare', leftImg: A.hourglass || '', rightImg: A.calendar || '',
            leftLabel: '等有錢再說', leftPrice: '一直等…', leftCap: '結果', leftBig: '可能一直是 0',
            rightLabel: '現在每月 3,000', rightPrice: '定期定額', rightCap: '20 年後', rightBig: '約 177 萬',
            note: '你缺的不是本金，是「開始」' },
          // 6 門檻其實很低
          { id: 'w6', type: 'stat', img: A.piggy || '',
            kicker: '定期定額的門檻', big: '比你想的低',
            label: '不少平台幾百、幾千元就能開始定期定額',
            note: '投資，從來不是有錢人的專利' },
          // 7 CTA
          { id: 'w7', type: 'cta',
            title: '先開始\n再長大',
            note: '① 這個月先設一筆小額\n② 讓時間替你賺\n\n下一篇：新手定期定額的 3 步驟\n追蹤 @_hannapang →' },
        ],
      };
    })(),
  },
};
