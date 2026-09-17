/*
 * presets/clarity.js — 插播時事：〈CLARITY 法案 表決未過〉結果版 v2
 * ------------------------------------------------------------------
 * 9/15 參院程序性表決 49:50 未過（需 60 票）。模板 B（極簡白對比）。
 * 內容依使用者提供之報導要點，不臆測。合規：時事整理，非投資建議。
 */
window.CAROUSEL_PRESET = {
  ns: 'clarity',
  version: '3',   // 內容有更新就改這個 → 使用者開檔會自動載入新內容
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
          '程序性表決 49：50，未達推進所需的 60 票；\n民主黨全體反對，還有 4 名共和黨倒戈。\n\n' +
          '預測市場更早就不看好：\nPolymarket「今年內簽成法律」的機率，\n從 3 月約 75%，一路掉到 5%。\n\n' +
          '消息一出，BTC 一度跌逾 5%、失守 7.5 萬美元，\n但市場沒有系統性恐慌——機構早已部分消化。\n\n' +
          '法案沒有完全死（眾院早前已 294 票通過文本），\n戰場只是從「要不要管」轉向「細則怎麼訂」。\n\n' +
          '法案會晃，你的紀律不用跟著晃。\n\n' +
          '（時事整理，非投資建議）\n\n' +
          '#龐玉涵 #幣圈媽媽 #CLARITY法案',
        cards: [
          // 1 封面｜Polymarket 數字鉤子
          { id: 'c1', type: 'cover', img: A.bitcoin || '',
            title: '3 月還有 75%\n現在剩 5%',
            price: '《CLARITY 法案》9/15 闖關失敗',
            note: '怎麼回事？往右滑 →' },
          // 2 一句話：這法案是什麼
          { id: 'c2', type: 'cta',
            title: '先搞懂\n它想做什麼',
            note: '《CLARITY 法案》想用法律明確：加密貨幣由誰管——\n把主要監管權交給 CFTC（商品），\n也讓銀行、券商更好參與。' },
          // 3 核心：誰來管（SEC vs CFTC）
          { id: 'c3', type: 'compare', leftImg: A.scale || '', rightImg: A.bitcoin || '',
            leftLabel: 'SEC（證券）', leftPrice: '交易所/券商/清算', leftCap: '主要管', leftBig: '數位證券',
            rightLabel: 'CFTC（商品）', rightPrice: '商品監管框架', rightCap: '主要管', rightBig: '多數代幣・現貨',
            note: '被歸哪一邊，規則差很多——\n這正是法案想釐清的事' },
          // 4 結果｜票數
          { id: 'c4', type: 'stat', img: A.scale || '',
            kicker: '9/15 參院程序表決', big: '49 : 50',
            label: '需 60 票才能推進，未過',
            note: '民主黨全體反對 ＋ 4 名共和黨倒戈' },
          // 5 預測市場崩跌
          { id: 'c5', type: 'stat', img: '',
            kicker: '預測市場怎麼看', big: '75% → 5%',
            label: 'Polymarket：「今年內簽成法律」的機率',
            note: '從 3 月一路崩跌，幾乎不抱希望' },
          // 6 市場反應（有跌但沒崩）
          { id: 'c6', type: 'cta',
            title: '幣價\n怎麼反應？',
            note: '消息一出，BTC 一度跌逾 5%、失守 7.5 萬美元。\n但市場沒有系統性恐慌——\n機構其實早就部分消化了這個預期。' },
          // 6.5 白宮顧問金句
          { id: 'c7a', type: 'cta',
            title: '白宮顧問\n怎麼說？',
            note: '白宮加密顧問 Patrick Witt：「令人非常失望。」\n他警告：美國若繼續卡關，未來標準恐由布魯塞爾或北京主導，\n而不是華盛頓與紐約。' },
          // 7 沒完全死
          { id: 'c7', type: 'cta',
            title: '但法案\n還沒死',
            note: '眾議院早前已 294 票跨黨派通過文本，\n共和黨新草案也納入民主黨逾百項修改。\n戰場，從「要不要管」轉向「細則怎麼訂」。' },
          // 8 CTA｜綁回定期定額主軸
          { id: 'c8', type: 'cta',
            title: '法案會晃\n你的紀律不用跟著晃',
            note: '消息面天天變，能長期累積的是紀律。\n定期定額，不追消息殺進殺出。\n\n追蹤 @_hannapang 看幣圈大事整理 →' },
        ],
      };
    })(),
  },
};
