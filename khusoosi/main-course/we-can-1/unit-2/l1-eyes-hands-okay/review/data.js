/* We Can 1 · Unit 2 · L1 home review data
 * Official audio remains one uncut textbook track. Aria support voice is used
 * only for short instructions, slow models and independent practice prompts.
 */
const LESSON = {
  book: 'We Can 1',
  unit: 'Unit 2',
  lesson: 'L8',
  title: 'Eyes, Hands, Okay!',
  heroChar: 'sec_eyes_open_close.png',
  officialAudio: 'a_official_cd1_14_15.mp3',
  actions: [
    {id:'close', en:'Close your eyes.', ar:'أغمض عينيك', img:'sec_close_eyes_full-v2.png', pos:'center', audio:'a_t_close_eyes.mp3', speak:'Close your eyes.', hint:'Close…'},
    {id:'open',  en:'Open your eyes.',  ar:'افتح عينيك', img:'sec_open_eyes_full-v2.png', pos:'center', audio:'a_t_open_eyes.mp3', speak:'Open your eyes.', hint:'Open…'},
    {id:'raise', en:'Raise your hands.', ar:'ارفع يديك', img:'sec_raise_hands_full-v2.png', pos:'center', audio:'a_t_raise_hands.mp3', speak:'Raise your hands.', hint:'Raise…'},
    {id:'clap',  en:'Clap your hands.',  ar:'صفّق بيديك', img:'sec_clap_hands_full-v2.png', pos:'center', audio:'a_t_clap_hands.mp3', speak:'Clap your hands.', hint:'Clap…'}
  ],
  matchQuiz: [
    {answer:'close', options:['close','open','raise','clap']},
    {answer:'clap', options:['close','open','raise','clap']},
    {answer:'open', options:['close','open','raise','clap']},
    {answer:'raise', options:['close','open','raise','clap']}
  ],
  speakIds: ['close','open','raise','clap'],
  examQuiz: [
    {image:'close', options:['close','open'], answer:'close'},
    {image:'raise', options:['clap','raise'], answer:'raise'},
    {image:'open', options:['open','clap'], answer:'open'}
  ]
};
