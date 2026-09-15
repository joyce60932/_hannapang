/*
 * presets/dca-intro.js — 定期定額系列 #1
 * ------------------------------------------------------------------
 * 〈定期定額是什麼？用一杯手搖飲解釋〉— 入門教育，承接手搖飲招牌梗。
 * 模板 B（極簡白對比）。打包時用 --preset presets/dca-intro.js。
 * 合規：講觀念與自己的做法，不報明牌、不保證報酬。
 */
window.CAROUSEL_PRESET = {
  ns: 'dca_intro',
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
          '常有人問我：\n「我不會挑股票，也能投資嗎？」\n\n' +
          '可以。\n方法叫「定期定額」——\n固定時間、固定金額、自動買進，不管漲跌。\n\n' +
          '就像你每天買一杯手搖飲，\n從來不會猶豫「今天奶茶會不會降價」。\n把這個習慣，用在投資就對了。\n\n' +
          '投資最難的從來不是選股，\n是「持續」。\n\n' +
          '先從一杯手搖飲的錢開始，\n讓時間和複利工作。\n\n' +
          '#龐玉涵 #幣圈媽媽 #定期定額大富翁',
        cards: [
          // 1 封面｜反常識鉤子
          { id: 'd1', type: 'cover', img: A.calendar || '',
            title: '不會挑股票\n也能開始投資？',
            price: '3 分鐘搞懂「定期定額」',
            note: '其實你早就會了——就像每天買手搖飲 →' },
          // 2 定義
          { id: 'd2', type: 'cta',
            title: '定期定額\n其實就 3 件事',
            note: '① 固定時間（例如每月 15 號）\n② 固定金額（例如 3,000 元）\n③ 自動買進，不管漲跌' },
          // 3 手搖飲比喻（承接招牌梗）
          { id: 'd3', type: 'cta',
            title: '就像每天\n一杯手搖飲',
            note: '你不會為了「今天奶茶會不會降價」而猶豫，\n你就是固定買。\n定期定額，就是把這個習慣用在投資。' },
          // 4 最大好處：不用擇時
          { id: 'd4', type: 'stat', img: A.coinGrowth || '',
            kicker: '定期定額最大的好處', big: '不用猜高低點',
            label: '漲的時候買少、跌的時候買多，成本自動平均',
            note: '省下投資最難的一關：進場時機' },
          // 5 對比 VS：靠感覺 vs 定期定額
          { id: 'd5', type: 'compare', leftImg: A.coinGrowth || '', rightImg: A.calendar || '',
            leftLabel: '靠感覺進場', leftPrice: '要一直盯盤', leftCap: '結果', leftBig: '常常追高殺低',
            rightLabel: '定期定額', rightPrice: '設定好就好', rightCap: '結果', rightBig: '紀律 + 複利',
            note: '投資最難的不是選股，是「持續」' },
          // 6 金額怎麼抓（承接手搖飲）
          { id: 'd6', type: 'stat', img: A.bubbleTea || '',
            kicker: '每月扣多少才對？', big: '從一杯手搖飲開始',
            label: '先從你不心疼的小額（例如每月 3,000）',
            note: '重點是開始 + 持續，不是金額大小' },
          // 7 CTA
          { id: 'd7', type: 'cta',
            title: '先開始\n再慢慢加',
            note: '① 這個月先設定一筆小額\n② 讓時間和複利工作\n\n下一篇：新手定期定額的 3 步驟\n追蹤 @_hannapang 一起走 →' },
        ],
      };
    })(),
  },
};
