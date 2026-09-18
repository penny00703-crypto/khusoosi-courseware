/* ============================================================
 * 复习页数据文件 · 每节课只改这一个文件
 * We Can 1 · Unit 1 L6 · Global Lesson 7「My First Friend Show」
 * 素材全部引用 ../assets/（复用正价课课件素材，零新增）
 * book=We Can 1 / unit=Unit 1 / lesson=L6 / lessonKey=wc1-u1-l6
 * ============================================================ */
const LESSON = {
  book:  "We Can 1",
  unit:  "Unit 1",
  lesson:"L6",
  title: "My First Friend Show",
  heroChar: "sec_char_noura.png",

  // 关卡1：五色听读卡（单元收官课，颜色是全册最高频复现词）
  words: [
    { en:"red",    ar:"أحمر",   img:"col_red.png",    audio:"a_t_red.mp3" },
    { en:"yellow", ar:"أصفر",   img:"col_yellow.png", audio:"a_t_yellow.mp3" },
    { en:"blue",   ar:"أزرق",   img:"col_blue.png",   audio:"a_t_blue.mp3" },
    { en:"green",  ar:"أخضر",   img:"col_green.png",  audio:"a_t_green.mp3" },
    { en:"purple", ar:"بنفسجي", img:"col_purple.png", audio:"a_t_purple.mp3" }
  ],

  // 关卡2：听问句选答句（3 轮）—— 2 问答 + 1 字母，对应六件事前半
  listenQuiz: [
    { audio:"a_t_whats_your_name.mp3", options:["My name's Noura.","I'm fine, thank you.","Good-bye."], answer:0 },
    { audio:"a_t_how_are_you.mp3",     options:["Good morning.","I'm fine, thank you.","My name's Noura."], answer:1 },
    { audio:"a_t_ltr_C.mp3",           options:["G","C","E"], answer:1 }
  ],

  // 关卡3：New Friend Day 完整对话跟读（六件事口语主线）
  dialogue: {
    img: "sec_labeeb_clean.png",
    lines: [
      { en:"Hello!",                   audio:"a_t_hello.mp3" },
      { en:"My name's Noura.",         audio:"a_t_my_names_noura.mp3" },
      { en:"I'm fine, thank you.",     audio:"a_t_im_fine.mp3" },
      { en:"Good-bye. See you again.", audio:"a_t_goodbye_seeyou.mp3" }
    ]
  },

  // 关卡4：考试接口（听颜色/听字母选答案，与正课 S15 同结构）
  examQuiz: [
    { audio:"a_t_green.mp3", q:"Listen and circle.",
      options:["Green.","Red."], answer:0 },
    { audio:"a_t_ltr_H.mp3", q:"Listen and choose.",
      options:["The letter H.","The letter A."], answer:0 }
  ]
};
