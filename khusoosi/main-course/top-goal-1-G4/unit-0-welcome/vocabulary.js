'use strict';
// US IPA follows Cambridge; plural forms drums/balloons add the voiced /z/ ending.
const L1_VOCAB=[
 {id:'camera',word:'camera',ipa:'/ˈkæm.rə/',ar:'كاميرا',example:'I have a camera.',exampleAr:'لديّ كاميرا.',alt:'One complete camera with a large lens.',group:'school'},
 {id:'guitar',word:'guitar',ipa:'/ɡɪˈtɑːr/',ar:'غيتار',example:'This is my guitar.',exampleAr:'هذا غيتاري.',alt:'One complete wooden acoustic guitar.',group:'school'},
 {id:'drums',word:'drums',ipa:'/drʌmz/',ar:'طبول',example:'I play the drums.',exampleAr:'أعزف على الطبول.',alt:'Two complete drums with drumsticks.',group:'school'},
 {id:'balloons',word:'balloons',ipa:'/bəˈluːnz/',ar:'بالونات',example:'I see three balloons.',exampleAr:'أرى ثلاثة بالونات.',alt:'Exactly three colorful balloons with strings.',group:'school'},
 {id:'bus',word:'bus',ipa:'/bʌs/',ar:'حافلة',example:'I go to school by bus.',exampleAr:'أذهب إلى المدرسة بالحافلة.',alt:'A complete yellow school bus.',group:'school'},
 {id:'playground',word:'playground',ipa:'/ˈpleɪ.ɡraʊnd/',ar:'ساحة اللعب',example:'We play on the playground.',exampleAr:'نلعب في ساحة اللعب.',alt:'A complete school playground with a slide and swings.',group:'school'},
 {id:'brilliant',word:'brilliant',ipa:'/ˈbrɪl.jənt/',ar:'رائع',example:'The picture is brilliant.',exampleAr:'الصورة رائعة.',alt:'A child shows an excellent painting and the teacher gives a thumbs up.',group:'describing'},
 {id:'exciting',word:'exciting',ipa:'/ɪkˈsaɪ.t̬ɪŋ/',ar:'مثير وممتع',example:'The game is exciting.',exampleAr:'اللعبة مثيرة وممتعة.',alt:'Children enjoy an exciting board game.',group:'describing'},
 {id:'afraid',word:'afraid',ipa:'/əˈfreɪd/',ar:'خائف / خائفة',example:'I am afraid.',exampleAr:'أنا خائف.',alt:'A child steps back with a gentle fearful expression and hands close to the chest.',group:'describing'},
 {id:'surprised',word:'surprised',ipa:'/sɚˈpraɪzd/',ar:'متفاجئ / متفاجئة',example:'I am surprised!',exampleAr:'أنا متفاجئة!',alt:'A girl is delighted and surprised to find a toy in a gift box.',group:'describing'},
 {id:'different',word:'different',ipa:'/ˈdɪf.ɚ.ənt/',ar:'مختلف',example:'The bags are different.',exampleAr:'الحقيبتان مختلفتان.',alt:'Two complete school bags with clearly different colors and designs.',group:'describing'},
 {id:'dangerous',word:'dangerous',ipa:'/ˈdeɪn.dʒɚ.əs/',ar:'خطير',example:'Playing in the road is dangerous.',exampleAr:'اللعب في الطريق خطير.',alt:'A ball is in the road near a car; a child stays safely with an adult on the sidewalk.',group:'describing'},
 {id:'naughty',word:'naughty',ipa:'/ˈnɑː.t̬i/',ar:'مشاغب',example:'The puppy is naughty.',exampleAr:'الجرو مشاغب.',alt:'A playful puppy has chewed a notebook and holds a pencil in its mouth.',group:'describing'},
 {id:'terrible',word:'terrible',ipa:'/ˈter.ə.bəl/',ar:'سيئ جدًا',example:'The soup tastes terrible.',exampleAr:'مذاق الحساء سيئ جدًا.',alt:'A child tastes soup and makes a mild yuck expression.',group:'describing'}
,{id:'photo',word:'photo',ipa:'/ˈfoʊ.toʊ/',ar:'صورة فوتوغرافية',example:'This is my photo.',exampleAr:'هذه صورتي.',alt:'A printed photograph of a playground.',group:'school'}
,{id:'poster',word:'poster',ipa:'/ˈpoʊ.stɚ/',ar:'ملصق',example:'This is a poster.',exampleAr:'هذا ملصق.',alt:'A school celebration poster pinned on a wall.',group:'school'}
];
const L1_WORD_BY_ID=Object.fromEntries(L1_VOCAB.map(w=>[w.id,w]));
