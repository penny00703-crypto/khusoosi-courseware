/* lessonKey: wc2-u1-l5 (front-end identity only; never added to report payload) */
const LESSON={
  book:'We Can 2',
  unit:'Unit 1',
  lesson:'L5',
  title:'School Practice',
  heroChar:'wc2_talk_a.png',
  actions:[
    {id:'greet',en:"I'm great, thanks. And you?",ar:'أنا بخير، شكرًا. وأنت؟',img:'wc2_talk_b.png',audio:'a_official_tt4.mp3',speak:"I'm great, thanks. And you?",hint:"I'm great …"},
    {id:'chant',en:"If you're happy and you know it, clap your hands.",ar:'إذا كنت سعيدًا وتعرف ذلك، صفّق بيديك',img:'l2_chant_girl.jpg',audio:'a_official_chant_clap.mp3',speak:"If you're happy and you know it, clap your hands.",hint:"If you're happy …"},
    {id:'sixth',en:"No, it's the sixth letter.",ar:'لا، إنه الحرف السادس',img:'l2_confusion_book.jpg',audio:'a_t_no_sixth.mp3',speak:"No, it's the sixth letter.",hint:'No …'},
    {id:'hungry',en:"I'm hungry.",ar:'أنا جائع',img:'ft_hungry.jpg',audio:'a_official_ans_hungry.mp3',speak:"I'm hungry.",hint:"I'm …"},
    {id:'thirsty',en:"I'm thirsty.",ar:'أنا عطشان',img:'ft_thirsty.jpg',audio:'a_official_ans_thirsty.mp3',speak:"I'm thirsty.",hint:"I'm …"},
    {id:'cold',en:"I'm cold.",ar:'أنا أشعر بالبرد',img:'ft_cold.jpg',audio:'a_official_ans_cold.mp3',speak:"I'm cold.",hint:"I'm …"},
    {id:'scared',en:"I'm scared.",ar:'أنا خائف',img:'ft_scared.jpg',audio:'a_official_ans_scared.mp3',speak:"I'm scared.",hint:"I'm …"},
    {id:'cap',en:'cap',ar:'قبعة',img:'w_cap.jpg',audio:'a_t_w_cap.mp3',speak:'cap',hint:'c …'},
    {id:'cape',en:'cape',ar:'رداء',img:'w_cape.jpg',audio:'a_t_w_cape.mp3',speak:'cape',hint:'c …'},
    {id:'pin',en:'pin',ar:'دبوس',img:'w_pin.jpg',audio:'a_t_w_pin.mp3',speak:'pin',hint:'p …'},
    {id:'pine',en:'pine',ar:'صنوبر',img:'w_pine.jpg',audio:'a_t_w_pine.mp3',speak:'pine',hint:'p …'},
    {id:'tape',en:'tape',ar:'شريط لاصق',img:'w_tape.jpg',audio:'a_t_w_tape.mp3',speak:'tape',hint:'t …'}
  ],
  matchQuiz:[
    {answer:'hungry',options:['thirsty','hungry','scared']},
    {answer:'cold',options:['cold','hungry','thirsty']},
    {answer:'cape',options:['cap','tape','cape']},
    {answer:'pine',options:['pin','cape','pine']}
  ],
  speakIds:['greet','sixth','hungry','cape'],
  examQuiz:[
    {image:'hungry',options:['thirsty','hungry','cold'],answer:'hungry'},
    {image:'cape',options:['cap','cape','tape'],answer:'cape'},
    {image:'sixth',options:['sixth','greet','chant'],answer:'sixth'},
    {image:'greet',options:['greet','chant','sixth'],answer:'greet'}
  ]
};
