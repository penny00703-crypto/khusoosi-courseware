/* ============================================================
 * 复习页数据文件 · 每节课只改这一个文件
 * We Can 2 · Unit 1 · L1「Nice to Meet You!」
 * book=We Can 2 / unit=Unit 1 / lesson=L1 / lessonKey=wc2-u1-l1
 * 素材全部引用 ../assets/（复用正价课课件素材，零新增）
 * ============================================================ */
const LESSON = {
  book:  "We Can 2",
  unit:  "Unit 1",
  lesson:"L1",
  title: "Nice to Meet You!",
  heroChar: "sec_char_cat.png",     // 首页人物形象（Labeeb 绿猫 = 本课教材角色）

  // 关卡1：词句听读卡（教材图 + 音 + 阿语释义）
  words: [
    { en:"Nice to meet you",  ar:"سعيد بلقائك",     img:"wc2_talk_a.png", audio:"a_t_tt1.mp3"  },
    { en:"I'm great, thanks", ar:"أنا بخير، شكرًا", img:"wc2_talk_b.png", audio:"a_t_tt4.mp3"  },
    { en:"first – fifth",     ar:"الأول – الخامس",  img:"wc2_line.png",   audio:"a_t_line.mp3" }
  ],

  // 关卡2：听音选句（answer = 正确选项在 options 里的下标）
  listenQuiz: [
    { audio:"a_t_tt4.mp3",   options:["I'm great, thanks.","I'm fine, thank you.","I'm third!"], answer:0 },
    { audio:"a_t_third.mp3", options:["I'm first!","I'm third!","I'm fifth!"],                    answer:1 },
    { audio:"a_t_tt1.mp3",   options:["Hi. It's nice to meet you.","Hi. How are you?","I'm fine."], answer:0 }
  ],

  // 关卡3：对话跟读（教材 Talk Time 五个话轮）
  dialogue: {
    img: "wc2_talk_a.png",
    lines: [
      { en:"Hi. It's nice to meet you.",   audio:"a_t_tt1.mp3" },
      { en:"It's nice to meet you, too.",  audio:"a_t_tt2.mp3" },
      { en:"Hi. How are you?",             audio:"a_t_tt3.mp3" },
      { en:"I'm great, thanks. And you?",  audio:"a_t_tt4.mp3" },
      { en:"I'm fine.",                    audio:"a_t_tt5.mp3" }
    ]
  },

  // 关卡4：考试接口（听问句选答句，校内题型仿题·待真题核对）
  examQuiz: [
    { audio:"a_t_tt3.mp3", q:"Hi. How are you?",
      options:["I'm great, thanks. And you?", "It's nice to meet you."], answer:0 },
    { audio:"a_t_tt1.mp3", q:"Hi. It's nice to meet you.",
      options:["I'm fine.", "It's nice to meet you, too."], answer:1 }
  ]
};
