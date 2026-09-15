/*
 * presets/health.js — 預設主題：〈每天一杯手搖飲，喝掉的不只是錢〉
 * ------------------------------------------------------------------
 * 手搖飲的機會成本 2.0：糖 / 熱量 / 體重 / 健康 vs 投資 + 健康 + 未來出國。
 * 模板 B（極簡白對比）。打包時用 --preset presets/health.js 注入。
 *
 * 假設（皆示意、因人而異）：每天 1 杯、10 年 = 3,650 杯
 *   糖：一杯全糖珍奶 ≈ 60g（≈12 顆方糖）→ 219,000 g = 219 公斤
 *   熱量：一杯 ≈ 600 大卡 → 2,190,000 = 219 萬大卡
 *   錢：每月 4,500（≈每天 150）、年化 8%、10 年 ≈ 82 萬
 *   出國：82 萬 ÷ 3 萬（日本自由行/次）≈ 27 次
 */
window.CAROUSEL_PRESET = {
  ns: 'health',
  active: 'B',
  states: {
    B: (function () {
      var A = window.ART || {};
      return {
        template: 'B',
        settings: {
          headerLabel: '換個角度，看待花費',
          signature: '@_hannapang',
          footNote: '數字為示意估算，因人而異',
          hashtag: '#把手搖飲換成未來',
        },
        caption:
          '那杯「才 150 元」的手搖飲，\n你喝掉的，不只是錢。\n\n' +
          '10 年 3,650 杯，\n是 219 公斤的糖、219 萬大卡，\n還有你沒發現的體重和血糖。\n\n' +
          '如果把其中一杯，\n換成投資未來的自己——\n82 萬、更輕盈的身體，\n還有好幾趟出國的機會。\n\n' +
          '同一杯的錢，\n可以喝掉，也可以飛出去。\n\n' +
          '#龐玉涵 #幣圈媽媽 #把手搖飲換成未來',
        cards: [
          // 1 封面｜反常識具象鉤子
          { id: 'h1', type: 'cover', img: A.bubbleTea || '',
            title: '每天一杯手搖飲\n10 年喝掉 219 公斤糖 😱',
            price: '＋ 219 萬大卡　＋ 說不定的脂肪肝',
            note: '同一杯的錢，還能換一個更好的未來 →' },
          // 2 糖
          { id: 'h2', type: 'stat', img: A.sugar || '',
            kicker: '10 年喝進的糖', big: '219 公斤',
            label: '一杯 ≈ 60g 糖（12 顆方糖）× 3,650 杯',
            note: 'WHO 建議每天 <25g，一杯就超標 2 倍' },
          // 3 熱量
          { id: 'h3', type: 'stat', img: A.bubbleTea || '',
            kicker: '10 年多吃的熱量', big: '219 萬大卡',
            label: '一杯 ≈ 600 大卡（一個便當）× 3,650 杯',
            note: '若沒消耗，約每 12 天多胖 1 公斤的節奏' },
          // 4 對比 VS｜喝掉 vs 換成投資
          { id: 'h4', type: 'compare', leftImg: A.bubbleTea || '', rightImg: A.money || '',
            leftLabel: '每天喝掉', leftPrice: '10 年後', leftCap: '你得到', leftBig: '0 元 + 219kg 糖',
            rightLabel: '換成投資', rightPrice: '10 年後', rightCap: '你得到', rightBig: '82 萬 + 健康',
            note: '同一杯的錢，兩種未來' },
          // 5 出國
          { id: 'h5', type: 'stat', img: A.plane || '',
            kicker: '82 萬能做什麼', big: '出國 27 次',
            label: '以日本自由行 ≈ 3 萬／次估算',
            note: '同樣的錢，喝掉？還是飛出去？' },
          // 6 我的選擇
          { id: 'h6', type: 'cta',
            title: '我把一杯\n換成投資 + 健康',
            note: '① 每天那杯的錢 → 每月定期定額\n② 少一點糖，多一點未來\n真正的複利，是錢和身體一起變好。' },
          // 7 CTA
          { id: 'h7', type: 'cta',
            title: '留一杯的錢\n也留住你的健康',
            note: '追蹤我，一起把小錢變成未來 →' },
        ],
      };
    })(),
  },
};
