/* ============================================================
 * 复习页数据文件 · 每节课只改这一个文件
 * We Can 1 · Unit 1 · L1「Hello! What's your name?」
 * 素材全部引用 ../assets/（复用正价课课件素材，零新增）
 * ============================================================ */
const LESSON = {
  book:  "We Can 1",
  unit:  "Unit 1",
  lesson:"L1",
  title: "Hello! What's your name?",
  heroChar: "sec_char_noura.png",     // 首页人物形象

  // 关卡1：单词听读卡（图 + 音 + 阿语释义）
  words: [
    { en:"Hello", ar:"مرحبًا", img:"sec_hello_boy.png", audio:"a_t_hello.mp3" },
    { en:"Hi",    ar:"أهلًا",  img:"sec_hi_girl.png",   audio:"a_t_hi.mp3"    },
    { en:"name",  ar:"اِسم",   img:"sec_nametag.png",   audio:"a_t_name.mp3"  }
  ],

  // 关卡2：听音选词（answer = 正确选项在 options 里的下标）
  listenQuiz: [
    { audio:"a_t_hello.mp3", options:["Hello","Hi","name"], answer:0 },
    { audio:"a_t_name.mp3",  options:["Hi","name","Hello"], answer:1 },
    { audio:"a_t_hi.mp3",    options:["name","Hello","Hi"], answer:2 }
  ],

  // 关卡3：对话跟读（教材 Dialogue 1）
  dialogue: {
    img: "sec_dialog1.png",
    lines: [
      { en:"Hello.",              audio:"a_t_d1_l1.mp3" },
      { en:"Hi.",                 audio:"a_t_d1_l2.mp3" },
      { en:"What's your name?",   audio:"a_t_d1_l3.mp3" },
      { en:"My name's Labeeba.",  audio:"a_t_d1_l4.mp3" }
    ]
  },

  // 关卡4：考试接口（听问句选答句，与校内题型一致）
  examQuiz: [
    { audio:"a_t_d1_l3.mp3", q:"What's your name?",
      options:["My name's Noura.", "I'm fine, thank you."], answer:0 },
    { audio:"a_t_d1_l3.mp3", q:"What's your name?",
      options:["Hello!", "My name's Labeeb."], answer:1 }
  ]
};
