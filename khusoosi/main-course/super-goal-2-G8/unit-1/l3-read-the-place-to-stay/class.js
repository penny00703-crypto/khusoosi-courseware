const A = text => text ? `<p class="ar" lang="ar" dir="rtl">${text}</p>` : '';
const snd = (id,text) => `<button class="play" aria-label="Play: ${text}" data-audio="${id}">▶</button>`;
const line = (text,id) => `<div class="line"><span>${text}</span>${id?snd(id,text):''}</div>`;
const pair = (left,right) => `<div class="pair"><div>${left}</div><div>${right}</div></div>`;
const card = (label,body) => `<article class="card"><span class="label">${label}</span>${body}</article>`;
const photo = (id,alt) => `<figure><img src="assets/${id==='desk'?'sb-6-0':'hostel'}.jpg" alt="${alt}"><figcaption>Super Goal 2 · Student Book p. ${id==='desk'?'6':'7'}</figcaption></figure>`;
const help = (text,ar,id) => `<div class="help-wrap"><button data-help aria-expanded="false">Need a model?</button><div class="help-panel" hidden>${line(text,id)}${A(ar)}</div></div>`;
const CLOCK = ()=>'';
const map = () => `<div class="floor-plan" aria-label="Lobby floor plan"><span>Café</span><span>Bookshop</span><span>Elevators</span><div>CORRIDOR</div><span>Reception</span><span>Seating</span><span>Lounge</span></div>`;
const devices=[['الميكروفون','قل مرحبًا. هل يسمعك معلّمك؟'],['الكاميرا','لوّح بيدك. هل يراك معلّمك؟'],['الاتصال','هل الصوت والصورة واضحان؟'],['ورقة وقلم','جهّزهما لملاحظاتك.']];
function response(p,i){
 const model=p.help?help(p.help):'';
 const retry=p.again?`<details class="retry"><summary>Try a new version</summary><p>${p.again}</p></details>`:'';
 return `<h2>${p.prompt}</h2>${A(p.ar)}${model}${retry}`;
}
function renderPage(p,i){
 if(p.options)return {title:p.title,chapter:LESSON.skill,type:'quiz',after:'Say your choice before your teacher clicks.',rounds:[{q:p.prompt,options:p.options,answer:p.key,explain:p.hint,ar:'اقرأ التفسير ثم حاول مرة أخرى.',correct:p.retry}]};
 let html;
 if(p.word)html=pair(photo(p.photo,p.photo==='desk'?'Hotel front desk':'Hostel setting'),card('WORD IN CONTEXT',line(p.title,p.word)+`<p class="ipa">${p.ipa}</p>`+A(p.ar)+line(p.example,p.word+'-ex')+'<p class="mini">Say it, then use it in a reply.</p>'));
 else if(p.lines)html=card('MODEL',p.lines.map(([s,id])=>id && s!==SOUNDS[id] && !s.includes(SOUNDS[id]) ? line(s)+line(SOUNDS[id],id) : line(s,id)).join(''));
 else if(p.sound)html=pair(card('LISTEN AND FOLLOW',line(SOUNDS[p.sound],p.sound)),response(p,i));
 else if(p.text)html=pair(card('READ THE TEXT',`<p class="reading">${p.text}</p>`),response(p,i));
 else if(p.map)html=pair(card('LOBBY PLAN',map()),response(p,i));
 else if(p.photo)html=pair(photo(p.photo,p.photo==='desk'?'Guest at a hotel reception desk':'A hostel building in the textbook'),response(p,i));
 else html=pair(card(LESSON.skill==='Writing'?'ON PAPER':'YOUR TURN',`<h2>${p.prompt}</h2>${A(p.ar)}`),(p.help?help(p.help):'')+(p.again?`<details class="retry"><summary>Try a new version</summary><p>${p.again}</p></details>`:''));
 return {title:p.title,chapter:'Unit 1 / '+LESSON.skill,html:`<div class="lesson-body">${html}</div>`};
}
const PAGES=[
 {title:'جاهز للدرس؟',chapter:'Get connected',html:`<div class="devices" lang="ar" dir="rtl">${devices.map(([a,b])=>card('',`<h2>${a}</h2>${A(b)}`)).join('')}</div><div class="sound-check">${line('Hello! Can you hear me?','sound-check')}</div>`},
 {title:LESSON.title,custom:true,html:pair(`<div class="chapter">UNIT 1 / ${LESSON.skill}</div><h1 class="unit-hero">${LESSON.title}</h1><p>${LESSON.goal}</p>`,photo(LESSON.n===4?'stay':'desk',LESSON.n===4?'A hostel building in the textbook':'Hotel reception'))},
 ...LESSON.pages.map(renderPage),
 {title:'Practise after class',chapter:'Unit 1 / Review',html:pair(card('YOUR REVIEW','<h2>Listen, speak, read and write.</h2>'+A('استمع وتكلّم واقرأ واكتب. ستجد كل الأنشطة في صفحة واحدة.')), "<div class=\"release-review\"><a href=\"review/\"><img src=\"assets/homework-qr.png\" alt=\"QR code for this lesson\u2019s homework\"></a><a class=\"button primary\" href=\"review/\">Open homework \u2197</a></div>")}
];
