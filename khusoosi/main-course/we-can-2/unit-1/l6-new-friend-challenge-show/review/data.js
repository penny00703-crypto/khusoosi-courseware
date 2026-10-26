/* lessonKey: wc2-u1-l6 (front-end identity only; never added to report payload) */
const LESSON={
  book:'We Can 2',
  unit:'Unit 1',
  lesson:'L6',
  title:'New Friend Challenge Show',
  heroChar:'wc2_talk_a.png',
  officialAudio:'a_official_chant_clap.mp3',
  actions:[
    {id:'meet',en:"It's nice to meet you, too.",ar:'يسعدني لقاؤك أيضًا',img:'wc2_talk_b.png',audio:'a_official_tt2.mp3',speak:"It's nice to meet you, too.",hint:"It's nice …"},
    {id:'greet',en:"I'm great, thanks. And you?",ar:'أنا بخير، شكرًا. وأنت؟',img:'wc2_talk_b.png',audio:'a_official_tt4.mp3',speak:"I'm great, thanks. And you?",hint:"I'm great …"},
    {id:'third',en:"I'm third!",ar:'أنا الثالث!',img:'sec_queue.png',audio:'a_t_third.mp3',speak:"I'm third!",hint:"I'm …"},
    {id:'fifth',en:"I'm fifth!",ar:'أنا الخامس!',img:'l2_ordinals.png',audio:'a_t_fifth.mp3',speak:"I'm fifth!",hint:"I'm …"},
    {id:'chant',en:"If you're happy and you know it, clap your hands.",ar:'إذا كنت سعيدًا وتعرف ذلك، صفّق بيديك',img:'l2_chant_girl.jpg',audio:'a_official_chant_clap.mp3',speak:"If you're happy and you know it, clap your hands.",hint:"If you're happy …"},
    {id:'sixth',en:"No, it's the sixth letter.",ar:'لا، إنه الحرف السادس',img:'l2_confusion_book.jpg',audio:'a_t_no_sixth.mp3',speak:"No, it's the sixth letter.",hint:'No …'},
    {id:'matter',en:"What's the matter?",ar:'ما الأمر؟',img:'ft_hungry.jpg',audio:'a_official_wtm.mp3',speak:"What's the matter?",hint:"What's …"},
    {id:'hungry',en:"I'm hungry.",ar:'أنا جائع',img:'ft_hungry.jpg',audio:'a_official_ans_hungry.mp3',speak:"I'm hungry.",hint:"I'm …"},
    {id:'cold',en:"I'm cold.",ar:'أنا أشعر بالبرد',img:'ft_cold.jpg',audio:'a_official_ans_cold.mp3',speak:"I'm cold.",hint:"I'm …"},
    {id:'cap',en:'cap',ar:'قبعة',img:'w_cap.jpg',audio:'a_t_w_cap.mp3',speak:'cap',hint:'c …'},
    {id:'cape',en:'cape',ar:'رداء',img:'w_cape.jpg',audio:'a_t_w_cape.mp3',speak:'cape',hint:'c …'},
    {id:'pin',en:'pin',ar:'دبوس',img:'w_pin.jpg',audio:'a_t_w_pin.mp3',speak:'pin',hint:'p …'},
    {id:'pine',en:'pine',ar:'صنوبر',img:'w_pine.jpg',audio:'a_t_w_pine.mp3',speak:'pine',hint:'p …'},
    {id:'goodbye',en:'Good-bye. See you.',ar:'وداعًا. أراك لاحقًا',img:'wc2_talk_a.png',audio:'a_t_goodbye_seeyou.mp3',speak:'Good-bye. See you.',hint:'Good-bye …'}
  ],
  matchQuiz:[
    {answer:'meet',options:['goodbye','meet','greet']},
    {answer:'third',options:['fifth','third','sixth']},
    {answer:'cold',options:['cold','hungry','goodbye']},
    {answer:'cape',options:['cap','pine','cape']}
  ],
  speakIds:['meet','third','sixth','matter','goodbye'],
  examQuiz:[
    {image:'hungry',options:['cold','hungry','goodbye'],answer:'hungry'},
    {image:'cape',options:['cap','cape','pine'],answer:'cape'},
    {image:'sixth',options:['third','sixth','chant'],answer:'sixth'},
    {image:'goodbye',options:['goodbye','meet','matter'],answer:'goodbye'}
  ]
};
