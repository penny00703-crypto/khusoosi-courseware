/* ============================================================
 * 复习页数据文件 · 每节课只改这一个文件
 * We Can 2 · Unit 1 · L3「What's the Matter?」
 * book=We Can 2 / unit=Unit 1 / lesson=L3 / lessonKey=wc2-u1-l3
 * 素材全部引用 ../assets/（复用正价课课件素材，零新增）
 * ============================================================ */
const LESSON = {
  book:  "We Can 2",
  unit:  "Unit 1",
  lesson:"L3",
  title: "What's the Matter?",
  heroChar: "clinic_scene.jpg",      // 首页形象：本课 Feelings Clinic 场景

  // 关卡1：词句听读卡（教材图 + 官方音频 + 阿语释义）
  words: [
    { en:"hungry",  ar:"جائع",        img:"ft_hungry.jpg",  audio:"a_official_ans_hungry.mp3"  },
    { en:"thirsty", ar:"عطشان",       img:"ft_thirsty.jpg", audio:"a_official_ans_thirsty.mp3" },
    { en:"hot",     ar:"يشعر بالحر",  img:"ft_hot.jpg",     audio:"a_official_ans_hot.mp3"     },
    { en:"cold",    ar:"يشعر بالبرد", img:"ft_cold.jpg",    audio:"a_official_ans_cold.mp3"    },
    { en:"sleepy",  ar:"نعسان",       img:"ft_sleepy.jpg",  audio:"a_official_ans_sleepy.mp3"  },
    { en:"scared",  ar:"خائف",        img:"ft_scared.jpg",  audio:"a_official_ans_scared.mp3"  }
  ],

  // 关卡2：听音选词（官方答句切片 → 选单词）
  listenQuiz: [
    { audio:"a_official_ans_sleepy.mp3",  options:["sleepy","scared","hungry"],  answer:0 },
    { audio:"a_official_ans_thirsty.mp3", options:["hungry","thirsty","cold"],   answer:1 },
    { audio:"a_official_ans_cold.mp3",    options:["hot","sleepy","cold"],       answer:2 }
  ],

  // 关卡3：问答跟读（教材 Words in Action 官方音频）
  dialogue: {
    img: "wolf_pair.jpg",
    lines: [
      { en:"What's the matter?", audio:"a_official_wtm.mp3" },
      { en:"I'm hungry.",        audio:"a_official_ans_hungry.mp3"  },
      { en:"I'm thirsty.",       audio:"a_official_ans_thirsty.mp3" },
      { en:"I'm scared.",        audio:"a_official_ans_scared.mp3"  }
    ]
  },

  // 关卡4：考试接口（听问句选答句，校内高频题型仿题·待真题核对）
  examQuiz: [
    { audio:"a_official_wtm.mp3", q:'"What\'s the matter?"',
      options:["I'm hungry.", "I'm fine, thanks.", "I'm six years old."], answer:0 },
    { audio:"a_official_qa_hot.mp3", q:'Listen: "What\'s the matter?" — "…"',
      options:["I'm hot.", "I'm cold.", "I'm sleepy."], answer:0 }
  ]
};
