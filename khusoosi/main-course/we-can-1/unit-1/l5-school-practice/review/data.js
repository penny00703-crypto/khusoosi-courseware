/* ============================================================
 * 复习页数据文件 · 每节课只改这一个文件
 * We Can 1 · Unit 1 L5 · Global Lesson 6「School Practice」
 * 素材全部引用 ../assets/（复用正价课课件素材，零新增）
 * book=We Can 1 / unit=Unit 1 / lesson=L5 / lessonKey=wc1-u1-l5
 * ============================================================ */
const LESSON = {
  book:  "We Can 1",
  unit:  "Unit 1",
  lesson:"L5",
  title: "School Practice",
  heroChar: "hero_stations.png",

  // 关卡1：校内操作词听读卡（PIL 图标磁贴）——听懂题目要求是本课地基
  words: [
    { en:"Listen", ar:"اسمع",    img:"tile_listen.png", audio:"a_t_listen.mp3" },
    { en:"Circle", ar:"ضع دائرة", img:"tile_circle.png", audio:"a_t_circle.mp3" },
    { en:"Match",  ar:"صِل",     img:"tile_match.png",  audio:"a_t_match.mp3" },
    { en:"Trace",  ar:"تتبّع",    img:"tile_trace.png",  audio:"a_t_trace.mp3" }
  ],

  // 关卡2：听问句选答句（3 轮）—— Station 1/4 混合：2 问答 + 1 字母
  listenQuiz: [
    { audio:"a_t_whats_your_name.mp3", options:["My name's Noura.","I'm fine, thank you.","Good-bye."], answer:0 },
    { audio:"a_t_how_are_you.mp3",     options:["Good morning.","I'm fine, thank you.","My name's Noura."], answer:1 },
    { audio:"a_t_ltr_C.mp3",           options:["G","C","E"], answer:1 }
  ],

  // 关卡3：情境句跟读（Station 2 三情境核心句）
  dialogue: {
    img: "sec_char_noura.png",
    lines: [
      { en:"Good morning.",              audio:"a_t_good_morning.mp3" },
      { en:"How are you?",               audio:"a_t_how_are_you.mp3" },
      { en:"I'm fine, thank you.",       audio:"a_t_im_fine.mp3" },
      { en:"Good-bye. See you again.",   audio:"a_t_goodbye_seeyou.mp3" }
    ]
  },

  // 关卡4：考试接口（Workbook pp.63–70 题型：听颜色/听字母选答案）
  examQuiz: [
    { audio:"a_t_green.mp3", q:"Listen and circle.",
      options:["Green.","Red."], answer:0 },
    { audio:"a_t_ltr_H.mp3", q:"Listen and choose.",
      options:["The letter H.","The letter A."], answer:0 }
  ]
};
