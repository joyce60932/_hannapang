/*
 * presets/growth-template.js — 「成長型思維」系列・可重複空白模板
 * ------------------------------------------------------------------
 * 每次要出新一篇（新書/電影/神話）就用這支：只改文字＋插圖。
 * 模板 B（白色），每頁都有圖片位。@_hannapang。
 * 每張卡的文字先放「該頁要寫什麼」的提示，替換掉即可。
 */
window.CAROUSEL_PRESET = {
  ns: 'growth_tpl',
  version: '1',
  active: 'B',
  states: {
    B: (function () {
      return {
        template: 'B',
        settings: {
          headerLabel: '成長型思維',
          signature: '@_hannapang',
          footNote: '',
          hashtag: '#成長型思維',
        },
        caption:
          '（Caption：短斷句、一句一行、意群間空一行。\n' +
          '把整篇的核心洞見濃縮成 3–5 句，最後一句丟出互動提問，\n' +
          '再換行放主題標籤。）\n\n' +
          '#龐玉涵 #幣圈媽媽 #成長型思維',
        cards: [
          { id: 'g1', type: 'cover', img: '',
            title: '《作品名》\n一句金句反轉鉤子',
            price: '副標：一句引言或懸念',
            note: '封面＝整篇鉤子。滑到這張，會想看下一張嗎？不會就重寫 →' },
          { id: 'g2', type: 'cta', img: '',
            title: '切入提問',
            note: '用一個大家有共鳴的問題開場。\n（例：一個人，為什麼要花十年才回得了家？）' },
          { id: 'g3', type: 'cta', img: '',
            title: '洞見 1',
            note: '一頁一個人性／成長洞見，關鍵句放最後一行。' },
          { id: 'g4', type: 'cta', img: '',
            title: '洞見 2',
            note: '換一個角度，繼續往「讀者自己」靠近。' },
          { id: 'g5', type: 'cta', img: '',
            title: '洞見 3',
            note: '越往後，越貼近讀者的真實處境。' },
          { id: 'g6', type: 'cta', img: '',
            title: '洞見 4（可留可刪）',
            note: '看內容長度決定要不要這頁。' },
          { id: 'g7', type: 'cta', img: '',
            title: '轉折・回到自己',
            note: '從作品拉回「你自己」——最溫柔、或最痛的那一刀。' },
          { id: 'g8', type: 'cta', img: '',
            title: '收束金句',
            note: '一句能被存起來、被轉發的總結。' },
          { id: 'g9', type: 'cta', img: '',
            title: 'CTA・回扣長期',
            note: '① 互動提問（你正走在哪一段…？留言）\n② 輕扣長期／複利（呼應理財 IP）\n③ 追蹤 @_hannapang' },
        ],
      };
    })(),
  },
};
