/* ============================================================
 * 复习页数据文件 · 每节课只改这一个文件
 * We Can 1 · Unit 1 L4 · Global Lesson 5「Alphabet & My Name Card」
 * 素材全部引用 ../assets/（复用正价课课件素材，零新增）
 * book=We Can 1 / unit=Unit 1 / lesson=L4 / lessonKey=wc1-u1-l4
 * ============================================================ */
const LESSON = {
  book:  "We Can 1",
  unit:  "Unit 1",
  lesson:"L4",
  title: "Alphabet & My Name Card",
  heroChar: "sec_alphabet_clean.png",

  // 关卡1：字母听读卡（PIL 磁贴图 + 字母名音频）——A–H 校内测查范围全曝光
  words: [
    { en:"A", ar:"حرف إيه",  img:"tile_A.png", audio:"a_t_ltr_A.mp3" },
    { en:"B", ar:"حرف بي",   img:"tile_B.png", audio:"a_t_ltr_B.mp3" },
    { en:"C", ar:"حرف سي",   img:"tile_C.png", audio:"a_t_ltr_C.mp3" },
    { en:"D", ar:"حرف دي",   img:"tile_D.png", audio:"a_t_ltr_D.mp3" },
    { en:"E", ar:"حرف إي",  img:"tile_E.png", audio:"a_t_ltr_E.mp3" },
    { en:"F", ar:"حرف إف",   img:"tile_F.png", audio:"a_t_ltr_F.mp3" },
    { en:"G", ar:"حرف جي",   img:"tile_G.png", audio:"a_t_ltr_G.mp3" },
    { en:"H", ar:"حرف إتش",  img:"tile_H.png", audio:"a_t_ltr_H.mp3" }
  ],

  // 关卡2：听音选字母（answer = 正确选项在 options 里的下标）——形近/音近混淆对专项
  listenQuiz: [
    { audio:"a_t_ltr_C.mp3", options:["G","C","E"],   answer:1 },
    { audio:"a_t_ltr_B.mp3", options:["D","B","A"],   answer:1 },
    { audio:"a_t_ltr_F.mp3", options:["F","H","E"],   answer:0 }
  ],

  // 关卡3：对话跟读（姓名卡两句过关句 + 首字母问答）
  dialogue: {
    img: "sec_alphabet_clean.png",
    lines: [
      { en:"My name's Noura.",        audio:"a_t_my_names_noura.mp3" },
      { en:"This is my name card.",   audio:"a_t_name_card.mp3" },
      { en:"What's the first letter of your name?", audio:"a_t_first_letter.mp3" },
      { en:"Show me your name card.", audio:"a_t_show_card.mp3" }
    ]
  },

  // 关卡4：考试接口（Workbook pp.69–70 题型：听字母选答案）
  examQuiz: [
    { audio:"a_t_ltr_G.mp3", q:"Listen and choose.",
      options:["The letter C.","The letter G."], answer:1 },
    { audio:"a_t_ltr_H.mp3", q:"Listen and choose.",
      options:["The letter H.","The letter A."], answer:0 }
  ]
};
