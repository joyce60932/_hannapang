/*
 * presets/clarity.js — 插播時事：〈3 分鐘看懂 CLARITY 法案〉
 * ------------------------------------------------------------------
 * 美國加密「市場結構」法案，9/15 參院程序性表決。模板 B（極簡白對比）。
 * 內容依使用者提供之文章要點（四、五段），全部有依據、不臆測。
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
          headerLabel: '幣圈今晚大事',
          signature: '@_hannapang',
          footNote: '時事整理，非投資建議',
          hashtag: '#CLARITY法案',
        },
        caption:
          '美國今晚（9/15）有件幣圈大事：\n《CLARITY 法案》要在參議院闖關。\n\n' +
          '它想做一件事——\n用「法律」明確規定：\n加密貨幣到底由誰管、算商品還是證券。\n\n' +
          '過了，美國加密產業第一次「有法可循」；\n沒過，下次機會可能要等好幾年。\n\n' +
          '但說真的，消息面天天變，\n能長期累積的，是你的紀律。\n\n' +
          '（時事整理，非投資建議）\n\n' +
          '#龐玉涵 #幣圈媽媽 #CLARITY法案',
        cards: [
          // 1 封面｜好奇鉤子
          { id: 'c1', type: 'cover', img: A.bitcoin || '',
            title: '美國今晚\n要幫加密立法？',
            price: '《CLARITY 法案》9/15 參院闖關',
            note: '通過會怎樣？往右滑 →' },
          // 2 一句話
          { id: 'c2', type: 'cta',
            title: 'CLARITY 法案\n一句話是什麼？',
            note: '美國第一次想用「法律」明確規定：\n加密貨幣到底由誰管、算商品還是證券。' },
          // 3 核心：誰來管（SEC vs CFTC）
          { id: 'c3', type: 'compare', leftImg: A.scale || '', rightImg: A.bitcoin || '',
            leftLabel: 'SEC（證券）', leftPrice: '交易所/券商/清算', leftCap: '主要管', leftBig: '數位證券',
            rightLabel: 'CFTC（商品）', rightPrice: '商品監管框架', rightCap: '主要管', rightBig: '多數代幣・現貨',
            note: '被歸哪一邊，規則差很多——\nCLARITY 想把界線寫進法律' },
          // 4 最大改變：執法 → 立法
          { id: 'c4', type: 'cta',
            title: '從「邊做邊罰」\n變成「有法可循」',
            note: '過去監管靠執法、界線不清；\n若通過，等於第一次把整套規則寫進聯邦法律。' },
          // 5 為什麼是大事（整合利多）
          { id: 'c5', type: 'cta',
            title: '為什麼\n這是大事？',
            note: '① 企業有明確法律基礎，不必跑去國外\n② DeFi／開發者有更清楚的邊界\n③ 傳統銀行、券商更敢進場' },
          // 6 今晚關卡
          { id: 'c6', type: 'stat', img: A.calendar || '',
            kicker: '9/15 今晚', big: '程序性表決',
            label: '美東下午 2:15・通常需 60 票終結辯論',
            note: '過了才往下走——過關 ≠ 正式通過' },
          // 7 圈內觀點
          { id: 'c7', type: 'cta',
            title: '圈內\n怎麼看？',
            note: '・希爾：有信心拿到足夠票數\n・盧米斯：這次沒過，下次機會恐等到 2030\n・Armstrong：就算沒過，SEC／CFTC 也會出規則' },
          // 8 CTA｜綁回定期定額主軸
          { id: 'c8', type: 'cta',
            title: '與其猜今晚過不過\n不如顧好你能控制的',
            note: '消息面天天變，能長期累積的是紀律。\n定期定額，不追消息殺進殺出。\n\n追蹤 @_hannapang 看幣圈大事整理 →' },
        ],
      };
    })(),
  },
};
