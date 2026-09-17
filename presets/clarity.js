/*
 * presets/clarity.js — 插播時事：〈CLARITY 法案 表決未過〉結果版
 * ------------------------------------------------------------------
 * 美國加密「市場結構」法案，9/15 參院程序性表決「未通過」（未達 60 票）。
 * 模板 B（極簡白對比）。內容依使用者提供之文章要點 + 公開報導，不臆測。
 * 合規：時事整理，非投資建議。
 */
window.CAROUSEL_PRESET = {
  ns: 'clarity',
  active: 'B',
  states: {
    B: (function () {
      var A = window.ART || {};
      return {
        template: 'B',
        settings: {
          headerLabel: '幣圈大事・結果',
          signature: '@_hannapang',
          footNote: '時事整理，非投資建議',
          hashtag: '#CLARITY法案',
        },
        caption:
          '幣圈關注的《CLARITY 法案》，\n9/15 在美國參議院——沒過。\n\n' +
          '這是一項想「用法律明確規定加密貨幣由誰管」的法案，\n但程序性表決未達 60 票（贊成約 50），卡關了。\n\n' +
          '卡在哪？\n民主黨多數反對，\n不滿共和黨沒回應他們要的「道德條款」\n（涉川普家族的加密獲利爭議）。\n\n' +
          '沒過，代表明確法規可能還要再等。\n但說真的——\n法案會晃，你的紀律不用跟著晃。\n\n' +
          '（時事整理，非投資建議）\n\n' +
          '#龐玉涵 #幣圈媽媽 #CLARITY法案',
        cards: [
          // 1 封面｜結果鉤子
          { id: 'c1', type: 'cover', img: A.bitcoin || '',
            title: '加密大法\n卡關了',
            price: '《CLARITY 法案》9/15 參院表決未過',
            note: '為什麼沒過？往右滑 →' },
          // 2 一句話：這法案是什麼
          { id: 'c2', type: 'cta',
            title: '先搞懂\n它想做什麼',
            note: '《CLARITY 法案》想用「法律」明確規定：\n加密貨幣到底由誰管、算商品還是證券。' },
          // 3 核心：誰來管（SEC vs CFTC）
          { id: 'c3', type: 'compare', leftImg: A.scale || '', rightImg: A.bitcoin || '',
            leftLabel: 'SEC（證券）', leftPrice: '交易所/券商/清算', leftCap: '主要管', leftBig: '數位證券',
            rightLabel: 'CFTC（商品）', rightPrice: '商品監管框架', rightCap: '主要管', rightBig: '多數代幣・現貨',
            note: '被歸哪一邊，規則差很多——\n這正是法案想釐清的事' },
          // 4 本來被期待什麼
          { id: 'c4', type: 'cta',
            title: '本來\n被寄予厚望',
            note: '一旦通過，美國加密產業第一次「有法可循」：\n企業不必外流、DeFi 有邊界、傳統金融更敢進場。' },
          // 5 結果｜票數
          { id: 'c5', type: 'stat', img: A.scale || '',
            kicker: '9/15 程序性表決', big: '差約 10 票',
            label: '需 60 票才能推進，贊成僅約 50，未過',
            note: '幾乎沿黨派分裂：多數民主黨反對' },
          // 6 為什麼沒過
          { id: 'c6', type: 'cta',
            title: '卡在\n哪裡？',
            note: '民主黨多數反對——\n不滿共和黨沒回應他們要的「道德條款」，\n該條款涉及川普家族的加密獲利爭議。' },
          // 7 接下來 / 觀點
          { id: 'c7', type: 'cta',
            title: '接下來\n呢？',
            note: '・沒過，明確法規可能還要再等\n・盧米斯曾警告：拖下去，下次機會恐等到 2030\n・Armstrong：就算法案沒過，SEC／CFTC 也會自己出規則' },
          // 8 CTA｜綁回定期定額主軸
          { id: 'c8', type: 'cta',
            title: '法案會晃\n你的紀律不用跟著晃',
            note: '消息面天天變，能長期累積的是紀律。\n定期定額，不追消息殺進殺出。\n\n追蹤 @_hannapang 看幣圈大事整理 →' },
        ],
      };
    })(),
  },
};
