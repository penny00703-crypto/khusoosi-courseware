'use strict';
window.L12_DATA={
  identity:{book:'We Can 1',unit:'Unit 2',lesson:'L12',key:'wc1:u2:l5:v1',canonical:'https://penny00703-crypto.github.io/khusoosi-courseware/khusoosi/main-course/we-can-1/unit-2/l5-body-practice/'},
  actions:[
    {id:'close',en:'Close your eyes.',ar:'أغمض عينيك',img:'action-close_eyes.png',audio:'a_t_close_eyes.mp3',domain:'body',hint:'Close …'},
    {id:'open',en:'Open your eyes.',ar:'افتح عينيك',img:'action-open_eyes.png',audio:'a_t_open_eyes.mp3',domain:'body',hint:'Open …'},
    {id:'raise',en:'Raise your hands.',ar:'ارفع يديك',img:'action-raise_hands.png',audio:'a_t_raise_hands.mp3',domain:'body',hint:'Raise …'},
    {id:'clap',en:'Clap your hands.',ar:'صفّق بيديك',img:'action-clap_hands.png',audio:'a_t_clap_hands.mp3',domain:'body',hint:'Clap …'},
    ...['head','shoulders','knees','toes','eyes','ears','mouth','nose'].map((k,i)=>({id:k,en:`Touch your ${k}.`,ar:['المس رأسك','المس كتفيك','المس ركبتيك','المس أصابع قدميك','المس عينيك','المس أذنيك','المس فمك','المس أنفك'][i],img:`body-${k}.jpg`,audio:`a_t_touch_${k}.mp3`,domain:'touch',hint:'Touch your …'})),
    ...[['stand','stand up','stand_up'],['sit','sit down','sit_down'],['front','come to the front','come_front'],['line','make a line','make_line'],['circle','make a circle','make_circle'],['seat','go back to your seat','go_seat']].map(([id,text,file],i)=>({id,en:`Please ${text}.`,ar:['قف من فضلك','اجلس من فضلك','تعال إلى الأمام من فضلك','كوّنوا صفًا من فضلكم','كوّنوا دائرة من فضلكم','عُد إلى مقعدك من فضلك'][i],img:`class-${id}.svg`,audio:`a_official_verified_${file}.mp3`,domain:'class',hint:'Please …'})),
    ...[...'abcdefghijklmnopqrstuvwxyz'].map(k=>({id:`letter-${k}`,en:k,ar:'اسم الحرف',img:`letter-${k}.svg`,audio:`official-letter-${k}.mp3`,domain:'letter',hint:k.toUpperCase()}))
  ],
  stages:[
    ['prep','Body Practice'],['warm','Remember the moves'],['bodybook','In your workbook'],['act','Listen, read, and do'],['bodytalk','Tell your teacher'],
    ['chant','Our body beat'],['pointbig','Four body parts'],['pointface','Four face parts'],['touchbook','Point and practice'],['touchtalk','Give a touch command'],
    ['classbook','Classroom tasks'],['classpick','Choose the action'],['classtalk','Run the picture classroom'],
    ['letterinput','Big and little'],['lettertalk','Read the little letters'],['alphabetbook','Point and say'],['trace','Air-write O and P'],
    ['fix','Fix the action'],['check','Your turn'],['school','Read and choose'],['exit','One last turn'],['finish','Take it home']
  ].map(([kind,name])=>({kind,name}))
};
