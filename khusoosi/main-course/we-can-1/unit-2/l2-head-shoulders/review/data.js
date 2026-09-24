/* We Can 1 · Lesson 9 · four-station home review */
const LESSON = {
  book: 'We Can 1', unit: 'Unit 2', lesson: 'L9',
  title: 'Head, Shoulders, Knees and Toes',
  heroChar: 'body-map-boy-sports-v2.jpg', officialAudio: 'a_official_cd1_16_18.mp3',
  actions: [
    {id:'head', en:'head', ar:'الرأس', focus:'body', points:[[50,12,14]], audio:'a_t_head.mp3', speak:'Touch your head.', speakAudio:'a_t_touch_head.mp3', hint:'Touch your…'},
    {id:'shoulders', en:'shoulders', ar:'الكتفان', focus:'body', points:[[42,39,10],[57,39,10]], audio:'a_t_shoulders.mp3', speak:'Touch your shoulders.', speakAudio:'a_t_touch_shoulders.mp3', hint:'Touch your…'},
    {id:'knees', en:'knees', ar:'الركبتان', focus:'body', points:[[44,68.5,10],[54,68.5,10]], audio:'a_t_knees.mp3', speak:'Touch your knees.', speakAudio:'a_t_touch_knees.mp3', hint:'Touch your…'},
    {id:'toes', en:'toes', ar:'أصابع القدم', focus:'body', points:[[41,91,10],[56,91,10]], audio:'a_t_toes.mp3', speak:'Touch your toes.', speakAudio:'a_t_touch_toes.mp3', hint:'Touch your…'},
    {id:'eyes', en:'eyes', ar:'العينان', focus:'face', points:[[43,29,11],[57,29,11]], audio:'a_t_eyes.mp3', speak:'Touch your eyes.', speakAudio:'a_t_touch_eyes.mp3', hint:'Touch your…'},
    {id:'ears', en:'ears', ar:'الأذنان', focus:'face', points:[[32,31,11],[68,31,11]], audio:'a_t_ears.mp3', speak:'Touch your ears.', speakAudio:'a_t_touch_ears.mp3', hint:'Touch your…'},
    {id:'mouth', en:'mouth', ar:'الفم', focus:'face', points:[[50,36,12]], audio:'a_t_mouth.mp3', speak:'Touch your mouth.', speakAudio:'a_t_touch_mouth.mp3', hint:'Touch your…'},
    {id:'nose', en:'nose', ar:'الأنف', focus:'face', points:[[50,35,11]], audio:'a_t_nose.mp3', speak:'Touch your nose.', speakAudio:'a_t_touch_nose.mp3', hint:'Touch your…'}
  ],
  matchQuiz: [
    {answer:'head', options:['head','knees','ears','nose']},
    {answer:'ears', options:['eyes','ears','mouth','toes']},
    {answer:'knees', options:['shoulders','knees','head','mouth']},
    {answer:'nose', options:['eyes','ears','mouth','nose']}
  ],
  speakIds: ['head','shoulders','knees','toes'],
  examQuiz: [
    {image:'shoulders', options:['shoulders','knees'], answer:'shoulders'},
    {image:'mouth', options:['mouth','nose'], answer:'mouth'},
    {image:'toes', options:['head','toes'], answer:'toes'}
  ]
};
