/* ============================================================
 * 复习页数据文件 · 每节课只改这一个文件
 * We Can 2 · Unit 1 · L4「Long Vowel Magic」
 * book=We Can 2 / unit=Unit 1 / lesson=L4 / lessonKey=wc2-u1-l4
 * 素材全部引用 ../assets/（复用正价课课件素材，零新增）
 * ============================================================ */
const LESSON = {
  book:  "We Can 2",
  unit:  "Unit 1",
  lesson:"L4",
  title: "Long Vowel Magic",
  heroChar: "magic_e.jpg",           // 首页形象：本课 Magic E 巫师

  // 关卡1：词句听读卡（教材裁图 + 单词音 + 阿语释义）
  words: [
    { en:"apple", ar:"تفاحة",  img:"w_apple.jpg", audio:"a_t_w_apple.mp3" },
    { en:"cap",   ar:"قبعة",   img:"w_cap.jpg",   audio:"a_t_w_cap.mp3"   },
    { en:"cape",  ar:"عباءة",  img:"w_cape.jpg",  audio:"a_t_w_cape.mp3"  },
    { en:"pin",   ar:"دبوس",   img:"w_pin.jpg",   audio:"a_t_w_pin.mp3"   },
    { en:"pine",  ar:"صنوبر",  img:"w_pine.jpg",  audio:"a_t_w_pine.mp3"  },
    { en:"tape",  ar:"شريط",   img:"w_tape.jpg",  audio:"a_t_w_tape.mp3"  }
  ],

  // 关卡2：听音选词（长短音听辨 → 选单词，对应过关标准 6/8）
  listenQuiz: [
    { audio:"a_t_w_cape.mp3", options:["cap","cape","tape"],  answer:1 },
    { audio:"a_t_w_pin.mp3",  options:["pin","pine","time"],  answer:0 },
    { audio:"a_t_w_time.mp3", options:["Tim","tap","time"],   answer:2 }
  ],

  // 关卡3：口诀跟读（官方字母 jingle 切片）
  dialogue: {
    img: "magic_e.jpg",
    lines: [
      { en:"A says a, a, apple!", audio:"a_official_jingle_a.mp3" },
      { en:"I says i, i, ink!",   audio:"a_official_jingle_i.mp3" }
    ]
  },

  // 关卡4：考试接口（校内题型仿题：听音编号 + missing letter·待真题核对）
  examQuiz: [
    { audio:"a_t_w_cape.mp3", q:'Listen. Is it number 1 or number 2?',
      options:["1 — cap", "2 — cape"], answer:1 },
    { audio:"a_t_missing_e.mp3", q:'p i n → p i n e. What letter is missing?',
      options:["e", "a", "o"], answer:0 }
  ]
};
