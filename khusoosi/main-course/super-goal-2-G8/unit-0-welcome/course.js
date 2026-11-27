const A = text => `<p class="ar" lang="ar" dir="rtl">${text}</p>`;
const snd = (id, text) => `<button class="play" data-audio="${id}" aria-label="Play: ${text}">▶</button>`;
const line = (text, id) => `<div class="line"><span>${text}</span>${id ? snd(id, text) : ''}</div>`;
const pic = (name, alt, caption) => `<figure><img src="assets/${name}.jpg" alt="${alt}"><figcaption>${caption}</figcaption></figure>`;
const lobby = () => pic('sb-6-0','A guest speaks to staff at a hotel reception desk','Super Goal 2 · Student Book p. 6');
const festival = () => pic('sb-3-0','Visitors introduce themselves at the writers festival','Super Goal 2 · Student Book p. 3');
const pair = (left, right) => `<div class="pair"><div>${left}</div><div>${right}</div></div>`;
const card = (label, body) => `<article class="card"><span class="label">${label}</span>${body}</article>`;
const help = (text, ar, audio) => `<div class="help-wrap"><button data-help aria-expanded="false">Need a model?</button><div class="help-panel" hidden>${line(text,audio)}${A(ar)}</div></div>`;
const reveal = (id, label, body) => `<button data-reveal="${id}" aria-expanded="false">${label}</button><div id="${id}" class="help-panel" hidden>${body}</div>`;
const oral = (q, ar, model, modelAr, audio) => ({q, ar, model, modelAr, audio});
const role = (title, chapter, rounds) => ({title, chapter, type:'oral', rounds, note:'Take one turn at a time.'});
const screen = (title, chapter, html) => ({title, chapter, html});
const devices = [
  ['01','الميكروفون','قل مرحبًا. هل يسمعك معلّمك؟'],
  ['02','الكاميرا','لوّح بيدك. هل يراك معلّمك؟'],
  ['03','الاتصال','هل الصوت والصورة واضحان؟'],
  ['04','ورقة وقلم','جهّزهما لكتابة بطاقة قصيرة.']
];
const PAGES = [
  screen('جاهز للدرس؟','Welcome · Get connected',`<div class="devices" lang="ar" dir="rtl">${devices.map(([n,t,s])=>card(n,`<h2>${t}</h2>${A(s)}`)).join('')}</div><div class="sound-check">${line('Hello! Can you hear me?','sound-check')}</div>`),
  {title:'Festival Check-in',custom:true,html:pair(`<div class="chapter">WELCOME / SUPER GOAL 2</div><h1 class="hero">Festival<br>Check-in</h1><p>Meet someone. Get directions. Pick up your pass.</p>${A('تعارف، اسأل عن المكان، ثم جهّز بطاقة دخولك.')}`,lobby())},
  role('Start with what you know','Meet the visitor',[
    oral('Hi. What’s your name?','أجب باسمك، ثم اسأل معلّمك.','Hi. I’m ____. What’s your name?','استخدم اسمك أو اسمًا تختاره.'),
    oral('Where are you from?','قل من أين أنت، ثم اسأل معلّمك.','I’m from ____. Where are you from?','اذكر مدينتك أو بلدك.')
  ]),
  screen('Greet a visitor','At the festival',pair(festival(),card('FIRST MEETING',line('Hi. Nice to meet you.','hello')+line('Nice to meet you, too.')+A('سعدت بلقائك. / سعدت بلقائك أيضًا.')+'<p class="mini">Say the first line. Wait for the reply. Swap roles.</p>'))),
  screen('Ask why they are here','At reception',pair(lobby(),card('QUESTION → REPLY',line('Are you here for the festival?','purpose')+line('Yes, I am.','yes')+line('No, I’m not. I’m on vacation.')+A('هل أنت هنا لحضور المهرجان؟ نعم، أنا هنا لحضوره. / لا، أنا في إجازة.')))),
  {title:'Choose a reply by meaning',chapter:'Meet the visitor',type:'quiz',after:'Say your choice before your teacher clicks.',rounds:[
    {q:'Are you here for the festival?',audio:'purpose',options:['Yes, I am.','I’m from Riyadh.'],answer:0,explain:'“Are you…?” takes a yes/no reply here.',ar:'هذا السؤال يحتاج إلى نعم أو لا.',correct:'Yes, I am. Now give a negative reply.'},
    {q:'Where are you from?',options:['No, I’m not.','I’m from Abha.'],answer:1,explain:'“Where” asks for a place.',ar:'أجب باسم مدينة أو بلد.',correct:'I’m from Abha. Now answer with your own city.'}
  ]},
  screen('Check the spelling','At reception',pair(card('GUEST PASS', '<h2>Faris Ali</h2><div class="pass-grid"><span>First name</span><b>Faris</b><span>Last name</span><b>Ali</b></div>'+A('الاسم الأول: فارس. اسم العائلة: علي.')),card('ASK → SPELL',line('How do you spell your last name?','name')+line('A–L–I. Ali.','spell')+A('كيف تتهجّى اسم عائلتك؟')+'<p class="mini">Say the letters slowly, then say the name.</p>'))),
  role('Ask before you write','Check a visitor’s name',[
    oral('You’re at the desk. Ask the visitor to spell their last name.','معلّمك زائر. اسأله عن تهجئة اسم العائلة.','How do you spell your last name?','اسأل أولًا وانتظر الإجابة.'),
    oral('Swap roles. Say and spell a last name.','أنت الزائر الآن. قل اسم عائلة وتهجَّه.','Ali. A–L–I.','يمكنك استخدام اسم تختاره.')
  ]),
  screen('Ask for directions','Find the restaurant',pair(card('LOBBY MAP','<div class="map"><span>Reception</span><span>Elevators</span><span class="destination">Restaurant</span></div>'+A('الاستقبال ← المصاعد ← المطعم على اليمين.')),card('ASK → GUIDE',line('Excuse me. Where’s the restaurant?','where')+line('Behind the elevators, on your right.','direction')+A('عذرًا، أين المطعم؟ خلف المصاعد، على يمينك.')+'<p class="mini">Point to the route, then give the direction.</p>'))),
  screen('Give a different direction','Swap roles',pair(card('LOBBY MAP','<div class="map reversed"><span>Reception</span><span>Elevators</span><span class="destination">Bookshop</span></div>'),'<h2>Where’s the bookshop?</h2>'+A('اسأل عن المكتبة، ثم بدّل الدور ودلّ معلّمك على المكان.')+help('Behind the elevators, on your left.','خلف المصاعد، على يسارك.'))),
  screen('Read the visitor’s message','Find two details',pair(card('MESSAGE FROM A VISITOR','<p>Hi, I’m Leen Omar. I’m from Jeddah. I’m here for the writers festival. See you at the hotel.</p>'),'<h2>What is Leen’s last name? Why is she here?</h2>'+A('حدّد اسم العائلة وسبب الزيارة من الرسالة.')+reveal('reading-key','Check the evidence','<p><b>Omar</b> · “Leen Omar”</p><p><b>The writers festival</b> · “I’m here for the writers festival.”</p>'))),
  screen('Write a guest pass','On paper',pair(card('GUEST PASS','<div class="pass-grid"><span>First name</span><b>________</b><span>Last name</span><b>________</b><span>City</span><b>________</b><span>Visit</span><b>________</b></div>'),'<h2>Make up a visitor. Fill in the four fields.</h2>'+A('اختر شخصية خيالية واكتب بياناتها. اعرض البطاقة على الكاميرا.')+reveal('pass-model','Compare after writing','<p>Faris · Ali · Abha · Writers festival</p>'+A('تحقّق من ترتيب الاسمين والحروف الكبيرة. صحّح حقلًا إن لزم.')))),
  screen('Introduce your visitor and say goodbye','Hand over the pass',pair(festival(),card('YOUR VISITOR',line('I’d like to introduce you to Faris.','intro')+line('Bye. Take care.','bye')+A('عرّف معلّمك بالشخصية التي كتبتها، ثم قل عبارة وداع.')+'<p class="mini">Use the name on your own pass.</p>'))),
  role('Check in with a new visitor','Your final exchange',[
    oral('You’re at reception. Greet your teacher and ask if they are here for the festival. Ask for their last-name spelling.','رحّب بالزائر، ثم اسأله عن سبب زيارته وتهجئة اسم عائلته.','Hi. Are you here for the festival? How do you spell your last name?','قل سؤالًا واحدًا وانتظر الرد. أخفِ النموذج ثم أعد المحاولة.'),
    oral('Swap roles. Give a new name, spell it and say why you’re here.','بدّل الدور واستعمل اسمًا جديدًا وقل سبب الزيارة.','I’m Noor Salem. S–A–L–E–M. I’m here for the festival.','استخدم اسمًا جديدًا عند إعادة المحاولة.')
  ]),
  screen('Keep your guest pass','See you next lesson',pair(pic('sb-7-4','Buildings and a mountain landscape','Super Goal 2 · Student Book p. 7'),'<h2>Next up: listen for hotel details.</h2><p>Read your pass aloud once before the next lesson.</p>'+A('اقرأ بطاقتك بصوت مسموع قبل الدرس القادم.')))
];
const CLOCK = () => '';
const photo = (id, alt) => pic(id, alt, 'Super Goal 2');

PAGES.push({title:'Practise after class',chapter:'Welcome / Review',html:pair(card('YOUR REVIEW','<h2>Listen, speak, read and write.</h2>'+A('امسح الرمز أو افتح التدريبات من الرابط.')), "<div class=\"release-review\"><a href=\"review/\"><img src=\"assets/homework-qr.png\" alt=\"QR code for this lesson\u2019s homework\"></a><a class=\"button primary\" href=\"review/\">Open homework \u2197</a></div>")});
