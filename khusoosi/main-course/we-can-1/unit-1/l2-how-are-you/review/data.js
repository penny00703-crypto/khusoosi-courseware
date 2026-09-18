/* We Can 1 · Unit 1 · L2 · Global Lesson 3 · lessonKey=wc1-u1-l2 */
const LESSON = {
  book: "We Can 1",
  unit: "Unit 1",
  lesson: "L2",
  title: "Hello, How Are You?",
  heroChar: "sec_greeting_class.png",
  words: [
    { en:"How are you?", ar:"كيف حالك؟", img:"sec_greeting_class.png", audio:"a_t_how_are_you.mp3" },
    { en:"I'm fine, thank you.", ar:"أنا بخير، شكرًا", img:"sec_char_wolf.png", audio:"a_t_fine_thank_you.mp3" },
    { en:"And you?", ar:"وأنت؟", img:"sec_char_cat.png", audio:"a_t_and_you.mp3" },
    { en:"Good-bye.", ar:"إلى اللقاء", img:"sec_goodbye_class.png", audio:"a_t_goodbye.mp3" }
  ],
  listenQuiz: [
    { audio:"a_t_how_are_you.mp3", options:["I'm fine, thank you.","My name's Ali.","Good-bye."], answer:0 },
    { audio:"a_t_fine_thank_you.mp3", options:["Hello!","And you?","See you again."], answer:1 },
    { audio:"a_t_goodbye.mp3", options:["How are you?","I'm fine.","See you again."], answer:2 }
  ],
  dialogue: {
    img: "sec_greeting_class.png",
    lines: [
      { en:"Hello! How are you?", audio:"a_t_check_prompt.mp3" },
      { en:"I'm fine, thank you.", audio:"a_t_fine_thank_you.mp3" },
      { en:"And you?", audio:"a_t_and_you.mp3" },
      { en:"I'm fine.", audio:"a_t_im_fine.mp3" },
      { en:"Good-bye. See you again.", audio:"a_t_goodbye_see_you.mp3" }
    ]
  },
  examQuiz: [
    { audio:"a_t_how_are_you.mp3", q:"Listen and choose.", options:["My name's Noura.","I'm fine, thank you."], answer:1 },
    { audio:"a_t_goodbye.mp3", q:"Listen and choose.", options:["See you again.","How are you?"], answer:0 }
  ]
};
