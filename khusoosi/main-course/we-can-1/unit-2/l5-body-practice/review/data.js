'use strict';
const LESSON={book:'We Can 1',unit:'Unit 2',lesson:'L12',
 canonical:'https://penny00703-crypto.github.io/khusoosi-courseware/khusoosi/main-course/we-can-1/unit-2/l5-body-practice/review/',
 groups:[
  {name:'Commands',ar:'التعليمات',topic:'commands',ids:['close','raise','front','line'],extraIds:['open','clap','stand','sit','circle','seat']},
  {name:'Body parts',ar:'أجزاء الجسم',topic:'parts',ids:['shoulders','knees','ears','nose'],extraIds:['head','toes','eyes','mouth']},
  {name:'Letter names',ar:'أسماء الحروف',topic:'letters',ids:['letter-b','letter-d','letter-p','letter-q','letter-m','letter-y'],extraIds:[...'acefghijklnorstuvwxz'].map(k=>'letter-'+k)}
 ],
 matchQuiz:[
  {answer:'raise',options:['close','clap','raise']},
  {answer:'front',options:['front','seat','sit']},
  {answer:'ears',options:['ears','mouth','eyes']},
  {answer:'knees',options:['toes','head','knees']},
  {answer:'letter-q',options:['letter-p','letter-g','letter-q']},
  {answer:'letter-m',options:['letter-n','letter-m','letter-w']}
 ],
 speakIds:['close','line','shoulders','nose','letter-b','letter-y'],
 examQuiz:[
  {answer:'open',options:['open','close','raise']},
  {answer:'seat',options:['front','seat','sit']},
  {answer:'mouth',options:['nose','eyes','mouth']},
  {answer:'toes',options:['knees','toes','shoulders']},
  {answer:'letter-h',cap:'H',options:['letter-k','letter-h','letter-n']},
  {answer:'letter-r',cap:'R',options:['letter-r','letter-p','letter-b']}
 ]
};
// Body-part naming is not a Touch command. Keep the classroom data untouched.
const REVIEW_ACTIONS=L12_DATA.actions.map(a=>a.domain==='touch'?{...a,en:a.id,ar:{head:'الرأس',shoulders:'الكتفان',knees:'الركبتان',toes:'أصابع القدمين',eyes:'العينان',ears:'الأذنان',mouth:'الفم',nose:'الأنف'}[a.id],audio:'a_word_'+a.id+'.mp3',domain:'part'}:a);
