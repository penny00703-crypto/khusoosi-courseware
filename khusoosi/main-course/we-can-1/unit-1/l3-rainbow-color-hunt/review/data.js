/* ============================================================
 * 复习页数据文件 · 每节课只改这一个文件
 * We Can 1 · Unit 1 L3 · Global Lesson 4「Rainbow Color Hunt」
 * 素材全部引用 ../assets/（复用正价课课件素材，零新增）
 * book=We Can 1 / unit=Unit 1 / lesson=L3 / lessonKey=wc1-u1-l3
 * ============================================================ */
const LESSON = {
  book:  "We Can 1",
  unit:  "Unit 1",
  lesson:"L3",
  title: "Rainbow Color Hunt",
  heroChar: "sec_rainbow_clean.png",

  // 关卡1：单词听读卡（教材原色豆图 + 音 + 阿语释义）——10 色全部曝光
  words: [
    { en:"red",    ar:"أحمر",    img:"col_red.png", audio:"a_t_red.mp3"    },
    { en:"orange", ar:"برتقالي", img:"col_orange.png", audio:"a_t_orange.mp3" },
    { en:"yellow", ar:"أصفر",    img:"col_yellow.png", audio:"a_t_yellow.mp3" },
    { en:"green",  ar:"أخضر",    img:"col_green.png", audio:"a_t_green.mp3"  },
    { en:"blue",   ar:"أزرق",    img:"col_blue.png", audio:"a_t_blue.mp3"   },
    { en:"purple", ar:"بنفسجي",  img:"col_purple.png", audio:"a_t_purple.mp3" },
    { en:"pink",   ar:"وردي",    img:"col_pink.png", audio:"a_t_pink.mp3"   },
    { en:"white",  ar:"أبيض",    img:"col_white.png", audio:"a_t_white.mp3"  },
    { en:"black",  ar:"أسود",    img:"col_black.png", audio:"a_t_black.mp3"  },
    { en:"brown",  ar:"بني",     img:"col_brown.png", audio:"a_t_brown.mp3"  }
  ],

  // 关卡2：听音选词（answer = 正确选项在 options 里的下标）——混淆对专项
  listenQuiz: [
    { audio:"a_t_blue.mp3",   options:["green","blue","black"],   answer:1 },
    { audio:"a_t_purple.mp3", options:["pink","purple","blue"],   answer:1 },
    { audio:"a_t_yellow.mp3", options:["yellow","red","white"],   answer:0 }
  ],

  // 关卡3：对话跟读（What color is it? 问答链）
  dialogue: {
    img: "sec_rainbow_clean.png",
    lines: [
      { en:"What color is it?", audio:"a_t_what_color.mp3" },
      { en:"This is red.",      audio:"a_t_this_is_red.mp3" },
      { en:"This is blue.",     audio:"a_t_this_is_blue.mp3" },
      { en:"Show me something green.", audio:"a_t_show_me_green.mp3" }
    ]
  },

  // 关卡4：考试接口（听指令选答句，与校内 Color Race 同题型）
  examQuiz: [
    { audio:"a_t_touch_yellow.mp3", q:"Listen and choose.",
      options:["Touch something yellow.", "Touch something purple."], answer:0 },
    { audio:"a_t_show_me_green.mp3", q:"Listen and choose.",
      options:["Show me something blue.", "Show me something green."], answer:1 }
  ]
};
