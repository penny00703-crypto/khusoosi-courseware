/* ============================================================
 * 复习页数据文件 · 每节课只改这一个文件
 * We Can 1 · Global Lesson 1「Ready for We Can!」
 * 素材全部引用 ../assets/（复用正价课课件素材，零新增）
 * ============================================================ */
const LESSON = {
  book:  "We Can 1",
  unit:  "Ready for We Can",
  lesson:"Lesson 1",
  title: "Ready for We Can!",
  heroChar: "sec_char_noura.png",     // 首页人物形象

  // 关卡1：单词听读卡（图 + 音 + 阿语释义）
  words: [
    { en:"Look",   ar:"انظر",  img:"sec_textbook_intro_2.jpg", audio:"a_r_look.wav"   },
    { en:"Listen", ar:"استمع", img:"sec_teacher.png",         audio:"a_r_listen.wav" },
    { en:"Point",  ar:"أشر",   img:"sec_action_book.jpg",     audio:"a_r_point.wav"  }
  ],

  // 关卡2：听音选词（answer = 正确选项在 options 里的下标）
  listenQuiz: [
    { audio:"a_r_look.wav",   options:["Look","Listen","Point"], answer:0 },
    { audio:"a_r_listen.wav", options:["Point","Listen","Look"], answer:1 },
    { audio:"a_r_point.wav",  options:["Listen","Look","Point"], answer:2 }
  ],

  // 关卡3：对话跟读（教材 Dialogue 1）
  dialogue: {
    img: "sec_textbook_intro_2.jpg",
    lines: [
      { en:"Listen.",            audio:"a_r_listen.wav" },
      { en:"Open your book.",    audio:"a_r_open.wav" },
      { en:"Okay.",              audio:"a_r_okay.wav" },
      { en:"Again, please.",     audio:"a_r_again.wav" }
    ]
  },

  // 关卡4：考试接口（听问句选答句，与校内题型一致）
  examQuiz: [
    { audio:"a_r_open.wav", q:"Listen and choose.",
      options:["Open your book.", "Take a pencil."], answer:0 },
    { audio:"a_r_pencil.wav", q:"Listen and choose.",
      options:["Show me.", "Take a pencil."], answer:1 }
  ]
};
