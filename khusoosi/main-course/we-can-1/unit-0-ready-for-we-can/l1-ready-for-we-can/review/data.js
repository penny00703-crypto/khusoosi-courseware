/*
 * We Can 1 · Introduction · Global Lesson 1 "Welcome to We Can"
 * book=We Can 1 / unit=Introduction / lesson=Lesson 1
 * Audio filenames are stable page interfaces. Replace textbook lines with
 * verified official tracks/cuts when the official package is delivered.
 */
const LESSON = {
  book: "We Can 1",
  unit: "Introduction",
  lesson: "Lesson 1",
  title: "Welcome to We Can",
  heroChar: "sec_welcome_class.png",
  words: [
    {en:"Put your bag away.",ar:"ضع حقيبتك في مكانها",img:"sec_bag_source_clean.png",audio:"a_t_put_bag_away.mp3"},
    {en:"Please take a seat.",ar:"تفضل بالجلوس",img:"sec_take_seat.png",audio:"a_t_take_seat.mp3"},
    {en:"Take out your book.",ar:"أخرج كتابك",img:"sec_book_source_clean.png",audio:"a_t_take_book.mp3"}
  ],
  listenQuiz: [
    {audio:"a_t_put_bag_away.mp3",options:["Put your bag away.","Take out your book.","Please take a seat."],answer:0},
    {audio:"a_t_take_seat.mp3",options:["Take out your pencil.","Please take a seat.","Please open the window."],answer:1},
    {audio:"a_t_open_window.mp3",options:["Take out your book.","Put your bag away.","Please open the window."],answer:2}
  ],
  dialogue: {
    img:"sec_welcome_class.png",
    lines:[
      {en:"Welcome!",audio:"a_t_welcome.mp3"},
      {en:"Please take a seat.",audio:"a_t_take_seat.mp3"},
      {en:"Okay.",audio:"a_t_okay.mp3"},
      {en:"Thank you.",audio:"a_t_thank_you.mp3"},
      {en:"You're welcome.",audio:"a_t_youre_welcome.mp3"}
    ]
  },
  examQuiz: [
    {audio:"a_t_take_book.mp3",q:"Listen and choose.",options:["Take out your book.","Put your bag away."],answer:0},
    {audio:"a_t_take_pencil.mp3",q:"Listen and choose.",options:["Please open the window.","Take out your pencil."],answer:1}
  ]
};
