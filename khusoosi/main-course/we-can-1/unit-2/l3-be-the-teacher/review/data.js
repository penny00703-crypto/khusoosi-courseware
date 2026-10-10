/* We Can 1 · Lesson 10 · four-station home review */
const LESSON = {
  book: 'We Can 1',
  unit: 'Unit 2',
  lesson: 'L10',
  title: 'Be the Teacher',
  heroChar: 'scene-be-the-teacher.png',
  officialAudio: 'a_official_verified_cd1_19.mp3',
  actions: [
    {id:'stand', en:'Please stand up.', ar:'قف من فضلك', img:'action-stand-up.png', audio:'a_official_verified_stand_up.mp3', speak:'Please stand up.', speakAudio:'a_official_verified_stand_up.mp3', hint:'Please…'},
    {id:'sit', en:'Please sit down.', ar:'اجلس من فضلك', img:'action-sit-down.png', audio:'a_official_verified_sit_down.mp3', speak:'Please sit down.', speakAudio:'a_official_verified_sit_down.mp3', hint:'Please…'},
    {id:'front', en:'Please come to the front.', ar:'تعال إلى الأمام من فضلك', img:'action-come-front.png', audio:'a_official_verified_come_front.mp3', speak:'Please come to the front.', speakAudio:'a_official_verified_come_front.mp3', hint:'Please…'},
    {id:'line', en:'Please make a line.', ar:'كوّنوا صفًا من فضلكم', img:'action-line.png', audio:'a_official_verified_make_line.mp3', speak:'Please make a line.', speakAudio:'a_official_verified_make_line.mp3', hint:'Please…'},
    {id:'circle', en:'Please make a circle.', ar:'كوّنوا دائرة من فضلكم', img:'action-circle.png', audio:'a_official_verified_make_circle.mp3', speak:'Please make a circle.', speakAudio:'a_official_verified_make_circle.mp3', hint:'Please…'},
    {id:'seat', en:'Please go back to your seat.', ar:'عُد إلى مقعدك من فضلك', img:'action-go-seat.png', audio:'a_official_verified_go_seat.mp3', speak:'Please go back to your seat.', speakAudio:'a_official_verified_go_seat.mp3', hint:'Please…'}
  ],
  matchQuiz: [
    {answer:'stand', options:['stand','sit','front']},
    {answer:'circle', options:['line','circle','seat']},
    {answer:'seat', options:['front','seat','sit']}
  ],
  speakIds: ['stand','front','line','sit'],
  examQuiz: [
    {image:'line', options:['line','circle'], answer:'line'},
    {image:'sit', options:['stand','sit'], answer:'sit'}
  ]
};
