/* ============================================================
 * 复习页数据文件 · 每节课只改这一个文件
 * We Can 2 · Unit 1 · L2「If You're Happy」
 * book=We Can 2 / unit=Unit 1 / lesson=L2 / lessonKey=wc2-u1-l2
 * 素材全部引用 ../assets/（复用正价课课件素材，零新增）
 * ============================================================ */
const LESSON = {
  book:  "We Can 2",
  unit:  "Unit 1",
  lesson:"L2",
  title: "If You're Happy",
  heroChar: "l2_chant_girl.jpg",     // 首页人物形象（教材 p6 拍手女孩 = 本课教材角色）

  // 关卡1：词句听读卡（教材图 + 音 + 阿语释义）
  words: [
    { en:"clap your hands", ar:"صفِّق بيديك",      img:"l2_snd_clap.png",  audio:"a_t_clap_hands.mp3" },
    { en:"happy",           ar:"سعيد",             img:"l2_clap_scene.jpg",audio:"a_t_happy.mp3"      },
    { en:"sixth – tenth",   ar:"السادس – العاشر",  img:"l2_ordinals.png",  audio:"a_t_line2.mp3"      }
  ],

  // 关卡2：听音选句（answer = 正确选项在 options 里的下标）
  listenQuiz: [
    { audio:"a_t_eighth.mp3",    options:["sixth","eighth","tenth"], answer:1 },
    { audio:"a_t_cap.mp3",       options:["cap","clap","clock"],     answer:0 },
    { audio:"a_t_h_ninth.mp3",   options:["H is the eighth letter.","H is the ninth letter.","H is the tenth letter."], answer:1 }
  ],

  // 关卡3：chant 跟唱（教材 clap 段，官方音频切片）
  dialogue: {
    img: "l2_chant_girl.jpg",
    lines: [
      { en:"If you're happy and you know it, clap your hands. 👏 👏", audio:"a_official_clap_a.mp3" },
      { en:"If you're happy and you know it, clap your hands. 👏 👏", audio:"a_official_clap_b.mp3" },
      { en:"If you're happy and you know it, then your face will surely show it. If you're happy and you know it, clap your hands. 👏 👏", audio:"a_official_clap_c.mp3" }
    ]
  },

  // 关卡4：考试接口（序数纠错，校内题型仿题·待真题核对）
  examQuiz: [
    { audio:"a_t_f_seventh.mp3", q:'"F is the seventh letter of the alphabet."',
      options:["No, it's the sixth letter.", "Yes, that's right!"], answer:0 },
    { audio:"a_t_j_tenth.mp3",  q:'"J is the tenth letter of the alphabet."',
      options:["No, it's the ninth letter.", "Yes, that's right!"], answer:1 }
  ]
};
