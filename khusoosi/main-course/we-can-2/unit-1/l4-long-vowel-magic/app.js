/* ================================================================
   We Can 2 · Unit 1 Feelings · L4 (25-min 1v1 paid lesson)
   Long Vowel Magic · mastery checkpoint: hear 8 of 12 words and
   point to the right sound card (a / a_e / i / i_e), 6/8 to pass;
   plus one school-style missing-letter item (c_a_p → cape)
   anchors: apple · cape · pin · pine (GOAL 08)
   book=We Can 2 / unit=Unit 1 / lesson=L4 / lessonKey=wc2-u1-l4
   theme: textbook purple #7b5ea7 / deep #4a3a6e / amber #ffc84a
   audio: jingle anchors = official CD1 11 slices (a_official_jingle_*);
          CD1 12/13/14 missing from package
          → a_t_* support voice, labelled "Practice model"
   ================================================================ */
const A = 'assets/';
const $ = s => document.querySelector(s);

/* ---------- audio bus: stop-all on page turn ---------- */
let curAudio = null;
let audioWarnTimer = null;
function audioFail(){
  toast('لا يوجد صوت؟ تأكد من كتم الصوت ودرجة الصوت ثم اضغط مجددًا · No sound? Check silent mode & volume, tap again');
  clearTimeout(audioWarnTimer);
}
function play(src, onend){
  stopAudio();
  curAudio = new Audio(audioUrl(src));
  curAudio.preload = 'auto';
  curAudio.addEventListener('error', audioFail, {once:true});
  const p = curAudio.play();
  if (p && p.catch) p.catch(audioFail);
  if (onend) curAudio.addEventListener('ended', onend, {once:true});
}
function playSlow(src, onend){
  stopAudio();
  curAudio = new Audio(audioUrl(src));
  curAudio.playbackRate = .78;
  curAudio.addEventListener('error', audioFail, {once:true});
  const p = curAudio.play();
  if (p && p.catch) p.catch(audioFail);
  if (onend) curAudio.addEventListener('ended', onend, {once:true});
}
function stopAudio(){ if(curAudio){ curAudio.pause(); curAudio.currentTime=0; curAudio=null; } }
/* navigation token: any delayed audio scheduled before a page turn is cancelled */
let navToken = 0;
function later(fn, ms){ const t = navToken; setTimeout(()=>{ if (t === navToken) fn(); }, ms); }

/* ---------- audio preloader: blob-cache every clip so taps play instantly ---------- */
const audioBlobs = {};
const AUDIO_MANIFEST = ["a_official_ans_hungry.mp3","a_official_ans_scared.mp3","a_official_ans_thirsty.mp3","a_official_jingle_a.mp3","a_official_jingle_i.mp3","a_official_wtm.mp3","a_t_cap.mp3","a_t_clap_word.mp3","a_t_clock.mp3","a_t_lock.mp3","a_t_long.mp3","a_t_magic_e.mp3","a_t_missing_e.mp3","a_t_pat_apron.mp3","a_t_pat_cap.mp3","a_t_pat_cape.mp3","a_t_pat_iron.mp3","a_t_pat_pin.mp3","a_t_pat_pine.mp3","a_t_pat_tap.mp3","a_t_pat_time.mp3","a_t_pat_tim.mp3","a_t_short.mp3","a_t_soundcheck.mp3","a_t_w_apple.mp3","a_t_w_apron.mp3","a_t_w_cap.mp3","a_t_w_cape.mp3","a_t_w_ink.mp3","a_t_w_iron.mp3","a_t_w_pin.mp3","a_t_w_pine.mp3","a_t_w_tap.mp3","a_t_w_tape.mp3","a_t_w_tim.mp3","a_t_w_time.mp3","a_t_welldone.mp3","a_t_yourturn_ask.mp3","a_t_yourturn_say.mp3","sfx_correct.mp3","sfx_pop.mp3","sfx_success.mp3","sfx_wrong.mp3"];
AUDIO_MANIFEST.forEach(f=>{
  fetch(A+f).then(r=> r.ok ? r.blob() : Promise.reject(f))
    .then(b=>{ audioBlobs[f]=URL.createObjectURL(b); }).catch(()=>{});
});
function audioUrl(src){ return audioBlobs[src] || (A+src); }
let curSfx = null;
function sfx(src){ try{ if(curSfx){curSfx.pause();} curSfx = new Audio(audioUrl(src)); const p=curSfx.play(); if(p&&p.catch)p.catch(()=>{});}catch(e){} }
document.addEventListener('pointerdown', function warm(){
  document.removeEventListener('pointerdown', warm);
  try{ const u=new Audio(audioUrl('sfx_pop.mp3')); u.volume=0.01; const p=u.play(); if(p&&p.catch)p.catch(()=>{}); }catch(e){}
});

/* ---------- toast + assessment state ---------- */
let toastTimer = null;
const assessment = { check1:null, check2:null, errors:new Set() };
function toast(msg){
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(()=>t.classList.remove('show'), 1800);
}

/* ---------- screen framework ---------- */
const screensHost = $('#screens');
const screens = [];

const TEACHER_GUIDES = [
  '<b>Set up:</b> Tap the sound-check speaker once — the button turns green when sound plays through. Keep this under one minute.',
  '<b>Warm-up 1 (1.5 min):</b> L3 comes back as a listening game: play the sentence — the student taps the matching picture. The sentence words appear only AFTER they tap right. Three rounds.',
  '<b>Warm-up 2 (1 min):</b> Now the student asks YOU: "What\'s the matter?" Act your answer big — yawn, drink, eyes wide. If you do not want to act, just point at one of the three pictures and answer with a full sentence.',
  '<b>Today\'s book:</b> Point at the page image: this lesson is We Can 2, Unit 1, pages 10–11 — phonics day: the letter sounds a and i, short and long.',
  '<b>Three missions (30 sec):</b> Read the three cards together — hear it, say it, win at school. That is the whole lesson map. Do not explain more here.',
  '<b>Magic e concept (1.5 min):</b> Play the motto on the text line: "Magic e! The e makes the letter say its NAME!" Then play cap → cape with the two small speakers. One idea only — never explain spelling rules beyond this.',
  '<b>Short a group (2 min):</b> All three cards follow the jingle pattern: "a, a, apple / cap / tap". Tap 🔊, student repeats the pattern twice. apple = official audio; cap/tap = practice model.',
  '<b>Long A group (2 min):</b> apron, cape, tape — pattern "A, A, ___!" (the letter NAME). cape/tape = magic e words; apron = anchor, do NOT call it magic e. Exaggerate: caaape.',
  '<b>Listen & choose · a (1.5 min):</b> Ears only — play a word, student taps SHORT or LONG. Four rounds. Wrong → replay once.',
  '<b>Short i group (1.5 min):</b> ink (official jingle), pin, Tim — pattern "i, i, ___!". Tim is the parrot\'s NAME — names can have short i too.',
  '<b>Long I group (1.5 min):</b> iron, pine, time — pattern "I, I, ___!". pine/time = magic e words; iron = "I says its name" anchor.',
  '<b>Listen & choose · i (1.5 min):</b> Same routine with the i words — pin, pine, Tim, time.',
  '<b>Jingle (1.5 min):</b> Official CD1 11 anchors: "A says … a, a, apple" and "I says … i, i, ink". The student only needs to join on the last two words (apple! / ink!). Participation is enough.',
  '<b>Fun Time game (2.5 min):</b> The book\'s own game, page 11: you say "I says …" — the student completes with the picture: "i, i, pine!" Then tap 🔊 to check. Four rounds, then swap roles if time allows.',
  '<b>Recycle (1.5 min):</b> L2 ears back (book page 6): cap / clap / lock / clock — listen and tap the picture. Fast, confident, no teaching.',
  '<b>Check 1 (3 min):</b> Eight words, no help. Play a word; the student points to a sound card and says "long" or "short". Tap the card they chose. Record error type FIRST, then the level. A = 8/8 · B = 6–7 · C = 5 or fewer.',
  '<b>Repair (4 min):</b> Fixed seven steps — repair only the pairs that broke. Meaning (Arabic once) → Slow → Contrast → Model → Build → Hide help → Try again. Check 2 uses eight fresh draws.',
  '<b>School practice 1 (1 min):</b> Just like the book: the words sit inside boxes 1 and 2 — hear one word, tap its number. Two rounds: cap/cape, then pin/pine.',
  '<b>School practice 2 (1 min):</b> Missing letter: c_a_p → add e → cape; p_i_n → add e → pine. Student says the word aloud first, then taps the letter.',
  '<b>Record:</b> Set A, B, or C from Check 1/2 evidence; never award badges for page completion. Badge name for parents: Word Wizard.',
  '<b>Exit (1 min):</b> Four anchor words fast — apple, cape, pin, pine: long or short? Then send the home-review link to the parent.'
];

function addScreen(objective, html, init){
  const el = document.createElement('section');
  el.className = 'screen';
  el.innerHTML = html;
  screensHost.appendChild(el);
  const api = init ? (init(el) || {}) : {};
  screens.push({ objective, el, onEnter: api.onEnter, onLeave: api.onLeave });
}

let cur = 0;
function show(i){
  i = Math.max(0, Math.min(screens.length-1, i));
  if (screens[cur] && screens[cur].onLeave) screens[cur].onLeave();
  navToken++;
  stopAudio();
  cur = i;
  screens.forEach((s,k)=> s.el.classList.toggle('active', k===i));
  $('#objective').textContent = screens[i].objective;
  $('#teacher-copy').innerHTML = TEACHER_GUIDES[i] || '';
  $('#page-num').textContent = (i+1) + ' / ' + screens.length;
  $('#progress').style.width = ((i+1)/screens.length*100) + '%';
  $('#btn-prev').disabled = (i===0);
  $('#btn-next').disabled = (i===screens.length-1);
  document.querySelectorAll('#thumbs button').forEach((b,k)=> b.classList.toggle('cur', k===i));
  if (screens[i].onEnter) screens[i].onEnter();
}

/* ---------- stage scaling ---------- */
function fit(){
  const s = Math.min(window.innerWidth/1280, window.innerHeight/720);
  $('#stage').style.transform = 'scale(' + s + ')';
}
window.addEventListener('resize', fit);

/* ---------- watermark tiles ---------- */
(function(){
  const w = $('#watermark');
  for (let y=0; y<5; y++) for (let x=0; x<4; x++){
    const sp = document.createElement('span');
    sp.textContent = 'khusoosi · خصوصي';
    sp.style.left = (x*340 + (y%2)*120) + 'px';
    sp.style.top = (y*150 + 20) + 'px';
    w.appendChild(sp);
  }
})();

$('#btn-ar').addEventListener('click', ()=>{
  const on = document.body.classList.toggle('ar-on');
  $('#btn-ar').setAttribute('aria-pressed', on);
});
$('#btn-teacher').addEventListener('click', ()=>{
  const on = document.body.classList.toggle('teacher-on');
  $('#btn-teacher').setAttribute('aria-pressed', on);
});

$('#btn-prev').addEventListener('click', ()=> show(cur-1));
$('#btn-next').addEventListener('click', ()=> show(cur+1));
$('#btn-thumbs').addEventListener('click', ()=> $('#thumbs').classList.toggle('open'));
$('#btn-fs').addEventListener('click', ()=>{
  if (document.fullscreenElement) document.exitFullscreen();
  else document.documentElement.requestFullscreen().catch(()=>{});
});
document.addEventListener('keydown', e=>{
  if (e.key==='ArrowRight') show(cur+1);
  if (e.key==='ArrowLeft') show(cur-1);
});

/* ================================================================
   SCREENS
   ================================================================ */
screensHost.addEventListener('click', e=>{
  const b = e.target.closest('[data-audio]');
  if (b){ play(b.dataset.audio); toast(b.dataset.toast || 'Listen and repeat'); }
});

const ICONS = {
  mic:'<svg viewBox="0 0 24 24" width="34" height="34" fill="#6a4fa3"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3zm6-3a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.94V22h2v-2.06A8 8 0 0 0 20 12h-2z"/></svg>',
  cam:'<svg viewBox="0 0 24 24" width="34" height="34" fill="#6a4fa3"><path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/></svg>',
  net:'<svg viewBox="0 0 24 24" width="34" height="34" fill="#6a4fa3"><path d="M12 21l3.5-4.5a5 5 0 0 0-7 0L12 21zm0-18C7.4 3 3.2 4.7 0 7.4l2 2.4A15.9 15.9 0 0 1 12 6c3.9 0 7.4 1.5 10 3.8l2-2.4C20.8 4.7 16.6 3 12 3zm0 6c-3 0-5.8 1.1-7.9 3l2 2.4A8.9 8.9 0 0 1 12 12c2.3 0 4.4.8 6 2.2l1.9-2.4A11.9 11.9 0 0 0 12 9z"/></svg>',
  pen:'<svg viewBox="0 0 24 24" width="34" height="34" fill="#6a4fa3"><path d="M3 17.2V21h3.8L17.9 9.9l-3.8-3.8L3 17.2zM20.7 7a1 1 0 0 0 0-1.4l-2.3-2.3a1 1 0 0 0-1.4 0l-1.8 1.8 3.8 3.8 1.7-1.9z"/></svg>'
};

/* the 12 words: word, sound class, colour, Arabic gloss, image, audio */
const WORDS = [
  ['apple','a', '#d94f4f','تفاحة','w_apple.jpg','a_t_w_apple.mp3'],
  ['apron','ae','#2563eb','مريلة','w_apron.jpg','a_t_w_apron.mp3'],
  ['cap',  'a', '#d94f4f','قبعة','w_cap.jpg','a_t_w_cap.mp3'],
  ['cape', 'ae','#2563eb','رداء','w_cape.jpg','a_t_w_cape.mp3'],
  ['tap',  'a', '#d94f4f','صنبور','w_tap.jpg','a_t_w_tap.mp3'],
  ['tape', 'ae','#2563eb','شريط لاصق','w_tape.jpg','a_t_w_tape.mp3'],
  ['ink',  'i', '#0891b2','حبر','w_ink.jpg','a_t_w_ink.mp3'],
  ['iron', 'ie','#7b5ea7','مكواة','w_iron.jpg','a_t_w_iron.mp3'],
  ['pin',  'i', '#0891b2','دبوس','w_pin.jpg','a_t_w_pin.mp3'],
  ['pine', 'ie','#7b5ea7','شجرة صنوبر','w_pine.jpg','a_t_w_pine.mp3'],
  ['Tim',  'i', '#0891b2','اسم الببغاء','w_tim.jpg','a_t_w_tim.mp3'],
  ['time', 'ie','#7b5ea7','وقت','w_time.jpg','a_t_w_time.mp3']
];
const WBY = Object.fromEntries(WORDS.map(w=>[w[0],w]));
const SND = { a:['a','#d94f4f','short'], ae:['a_e','#2563eb','long'], i:['i','#0891b2','short'], ie:['i_e','#7b5ea7','long'] };

/* ---------- S1 · class setup (full Arabic) ---------- */
addScreen('class setup', `
  <div style="direction:rtl; text-align:center; width:100%;">
    <h1 style="font-size:42px; color:#463a5e; margin-bottom:26px;">قبل أن نبدأ الدرس</h1>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:18px; max-width:900px; margin:0 auto 26px;">
      ${[['mic','افتح الميكروفون والكاميرا'],['net','تأكد أن الإنترنت يعمل بشكل جيد'],
         ['cam','اجلس في مكان هادئ ومريح'],['pen','جهّز الورقة والقلم']].map(([k,t])=>`
        <div class="card" style="display:flex; align-items:center; gap:16px; padding:18px 24px;">
          ${ICONS[k]}<span style="font-size:24px; font-weight:700; color:#544867;">${t}</span>
        </div>`).join('')}
    </div>
    <button id="soundcheck" class="speaker" style="transition:transform .25s, box-shadow .25s, background .25s;"></button>
    <div id="soundcheck-label" style="font-size:20px; color:#8a6d3b; margin-top:10px; font-weight:700;">اضغط لاختبار الصوت</div>
  </div>`, el=>({
  onEnter(){
    const btn = el.querySelector('#soundcheck');
    const label = el.querySelector('#soundcheck-label');
    btn.onclick = ()=>{
      stopAudio();
      const au = new Audio(audioUrl('a_t_soundcheck.mp3'));
      curAudio = au;
      btn.style.transform = 'scale(1.12)';
      btn.style.boxShadow = '0 0 0 12px rgba(123,94,167,.16), 0 3px 0 #5a4385';
      label.textContent = '… استمع';
      au.addEventListener('ended', ()=>{
        btn.style.transform = '';
        btn.style.background = '#24a66a url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'white\'%3E%3Cpath d=\'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z\'/%3E%3C/svg%3E") center/30px no-repeat';
        btn.style.boxShadow = '0 3px 0 #187c50';
        label.textContent = 'الصوت يعمل ✓';
      }, {once:true});
      au.addEventListener('error', ()=>{
        btn.style.transform = '';
        btn.style.boxShadow = '0 0 0 5px #e8443a';
        label.textContent = 'الصوت لا يعمل — تأكد من السماعات ثم اضغط مرة أخرى';
      }, {once:true});
      au.play().catch(()=>{ label.textContent = 'اضغط مرة أخرى'; });
    };
  }
}));

/* ---------- S2 · warm-up 1 of 2: L3 feelings — listen & match ---------- */
addScreen('Warm-up 1 · listen and match', `
  <div style="text-align:center; width:100%; max-width:1000px;">
    <span class="source-badge">WARM-UP · FROM LESSON 3 · 1 OF 2</span>
    <div style="font-size:40px; font-weight:800; color:#3d3356; margin:14px 0 4px;">Listen — tap the matching picture!</div>
    <div class="ar" style="font-size:19px; color:#7a8aa0; margin-bottom:18px;">استمع واضغط على الصورة الصحيحة</div>
    <div style="display:flex; align-items:center; gap:16px; justify-content:center; margin-bottom:16px;">
      <button id="wm-play" class="speaker" style="width:74px; height:74px;"></button>
      <span id="wm-round" class="card" style="padding:8px 18px; font-size:18px; font-weight:800; color:#8a6d3b;">Round 1 / 3</span>
    </div>
    <div style="display:flex; gap:22px; justify-content:center;">
      ${[['hungry','ft_hungry.jpg','#d97706'],['thirsty','ft_thirsty.jpg','#2563eb'],['scared','ft_scared.jpg','#db4f7e']].map(([w,img,c])=>`
      <div class="card wm-pic" data-w="${w}" style="cursor:pointer; padding:14px; width:280px;">
        <img class="pic" src="${A}${img}" style="width:100%; height:175px; object-fit:contain;">
        <div class="wm-word" style="font-size:24px; font-weight:800; color:${c}; margin-top:8px; visibility:hidden;">I'm ${w}.</div>
      </div>`).join('')}
    </div>
  </div>`, el=>{
  const AU={'hungry':'a_official_ans_hungry.mp3','thirsty':'a_official_ans_thirsty.mp3','scared':'a_official_ans_scared.mp3'};
  let deck=[], di=0;
  function deal(){ deck=['hungry','thirsty','scared'].sort(()=>Math.random()-.5); di=0; paint(); }
  function paint(){
    el.querySelector('#wm-round').textContent = di<3 ? ('Round '+(di+1)+' / 3') : 'Done!';
    el.querySelectorAll('.wm-pic').forEach(p=>{ p.style.border=''; p.style.background=''; });
  }
  function playW(){ if (di<3) play(AU[deck[di]]); }
  el.querySelector('#wm-play').onclick=playW;
  el.querySelectorAll('.wm-pic').forEach(p=> p.onclick=()=>{
    if (di>=3) return;
    if (p.dataset.w===deck[di]){
      sfx('sfx_correct.mp3'); p.style.border='3px solid #1f9d6c'; p.style.background='#e8f8f0';
      p.querySelector('.wm-word').style.visibility='visible';
      di++; later(()=>{ paint(); if(di<3){ playW(); } else { sfx('sfx_success.mp3'); toast('All three! Now read the sentences!'); } }, 900);
    } else { sfx('sfx_wrong.mp3'); toast('Listen again!'); later(playW, 500); }
  });
  return { onEnter(){ deal();
    el.querySelectorAll('.wm-word').forEach(w=> w.style.visibility='hidden');
    later(playW, 450); } };
});

/* ---------- S3 · warm-up 2 of 2: student asks ME ---------- */
addScreen('Warm-up 2 · you ask me', `
  <div style="text-align:center; width:100%; max-width:1000px;">
    <span class="source-badge">WARM-UP · FROM LESSON 3 · 2 OF 2</span>
    <div style="font-size:42px; font-weight:800; color:#3d3356; margin:14px 0 4px;">Your turn — ask ME!</div>
    <div class="ar" style="font-size:19px; color:#7a8aa0; margin-bottom:16px;">الآن اسألني أنت</div>
    <div class="card" style="padding:20px 30px; max-width:720px; margin:0 auto 14px;">
      <div style="display:flex; align-items:center; gap:18px; justify-content:center;">
        <button class="speaker" data-audio="a_t_yourturn_ask.mp3" data-toast="Your turn — ask me!"
          style="width:80px; height:80px; background-size:38px;"></button>
        <div style="font-size:42px; font-weight:800; color:#463a5e;">"What<b style="color:#d94f4f;">'s</b> the matter?"</div>
      </div>
    </div>
    <div style="font-size:20px; color:#8a6d3b; font-weight:700; margin-bottom:10px;">I act one — you watch! (Teacher: or just point at a picture 👇)</div>
    <div style="display:flex; gap:18px; justify-content:center;">
      ${[['hungry','ft_hungry.jpg','#d97706'],['thirsty','ft_thirsty.jpg','#2563eb'],['scared','ft_scared.jpg','#db4f7e']].map(([w,img,c])=>`
      <div class="card" style="padding:10px; width:195px;">
        <img class="pic" src="${A}${img}" style="width:100%; height:118px; object-fit:contain;">
        <div style="font-size:19px; font-weight:800; color:${c}; margin-top:6px;">I'm ${w}.</div>
      </div>`).join('')}
    </div>
  </div>`);

/* ---------- S4 · today's book ---------- */
addScreen('Today’s book', `
  <div style="display:flex; gap:48px; align-items:center; width:100%; justify-content:center;">
    <div style="max-width:520px;">
      <span class="source-badge">TODAY · FROM YOUR BOOK</span>
      <h1 style="font-size:42px; color:#3d3356; margin:14px 0 10px;">This is today's lesson!</h1>
      <div class="ar" style="font-size:19px; color:#7a8aa0; margin-bottom:18px;">درس اليوم من كتابك</div>
      <div style="font-size:22px; font-weight:700; color:#6a4fa3;">We Can 2 · Unit 1 · Pages 10–11</div>
    </div>
    <div style="text-align:center;">
      <img class="pic" src="${A}book_p16.jpg" style="height:480px; box-shadow:0 10px 26px rgba(0,0,0,.22); border-radius:10px;">
      <div style="font-size:15px; font-weight:700; color:#8a6d3b; margin-top:6px;">We Can 2 · Unit 1 · Page 10</div>
    </div>
  </div>`);

/* ---------- S5 · today's three missions ---------- */
addScreen('Today · three missions', `
  <div style="text-align:center; width:100%; max-width:1080px;">
    <span class="source-badge">TODAY · THREE MISSIONS</span>
    <div style="font-size:38px; font-weight:800; color:#3d3356; margin:12px 0 16px;">Today you will …</div>
    <div style="display:flex; gap:20px; justify-content:center; align-items:stretch;">
      <div class="card" style="width:320px; padding:20px 18px;">
        <div style="font-size:44px;">👂</div>
        <div style="font-size:22px; font-weight:800; color:#6a4fa3; margin:6px 0 8px;">1 · HEAR IT</div>
        <div style="font-size:19px; font-weight:700; color:#463a5e; line-height:1.5;">short <b style="color:#d94f4f;">a</b> or long <b style="color:#2563eb;">a_e</b>?<br>short <b style="color:#0891b2;">i</b> or long <b style="color:#7b5ea7;">i_e</b>?</div>
        <div class="ar" style="font-size:15px; color:#7a8aa0; margin-top:8px;">أميّز الصوت القصير والطويل</div>
      </div>
      <div class="card" style="width:320px; padding:20px 18px;">
        <div style="font-size:44px;">🗣️</div>
        <div style="font-size:22px; font-weight:800; color:#6a4fa3; margin:6px 0 8px;">2 · SAY IT</div>
        <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap;">
          ${['apple','cape','pin','pine'].map(w=>`
            <span class="pill" style="background:${WBY[w][2]}1f; color:${WBY[w][2]}; border:2px solid ${WBY[w][2]}; font-size:20px;">${w}</span>`).join('')}
        </div>
        <div class="ar" style="font-size:15px; color:#7a8aa0; margin-top:8px;">أقرأ وأقول الكلمات الأربع</div>
      </div>
      <div class="card" style="width:320px; padding:20px 18px;">
        <div style="font-size:44px;">🎯</div>
        <div style="font-size:22px; font-weight:800; color:#6a4fa3; margin:6px 0 8px;">3 · WIN AT SCHOOL</div>
        <div style="font-size:19px; font-weight:700; color:#463a5e; line-height:1.5;">number <b style="color:#d94f4f;">1</b> or <b style="color:#2563eb;">2</b>?<br>add the <b style="color:#d97706;">magic e</b>!</div>
        <div class="ar" style="font-size:15px; color:#7a8aa0; margin-top:8px;">أسئلة مثل اختبار المدرسة</div>
      </div>
    </div>
  </div>`);

/* ---------- S6 · Magic e concept ---------- */
addScreen('Magic e · the one idea', `
  <div style="text-align:center; width:100%; max-width:1020px;">
    <span class="source-badge">THE ONE IDEA · REMEMBER THIS</span>
    <div style="position:relative; width:940px; max-width:100%; margin:14px auto 0;">
      <img class="pic" src="${A}magic_e.jpg" style="width:100%; border-radius:16px; box-shadow:0 10px 26px rgba(74,58,110,.18);">
    </div>
    <div style="margin-top:14px; display:flex; align-items:center; justify-content:center; gap:12px; flex-wrap:wrap;">
      <button class="speaker small" data-audio="a_t_magic_e.mp3" data-toast="Magic e! Say it with me!"></button>
      <span style="font-size:26px; font-weight:800; color:#3d3356;">Magic <b style="color:#d97706;">e</b> makes the letter say its <b style="color:#2563eb;">NAME</b>:</span>
      <span style="display:inline-flex; align-items:center; gap:8px;">
        <button class="speaker small" data-audio="a_t_w_cap.mp3" data-toast="cap — short a"></button>
        <b style="font-size:26px; color:#d94f4f;">cap</b>
        <span style="font-size:26px;">🪄</span>
        <button class="speaker small" data-audio="a_t_w_cape.mp3" data-toast="cape — long A!"></button>
        <b style="font-size:26px; color:#2563eb;">cape</b>
      </span>
    </div>
    <div class="ar" style="font-size:17px; color:#7a8aa0; margin-top:6px;">حرف e السحري يجعل الحرف يقول اسمه</div>
  </div>`);

/* ---------- input group helper ---------- */
function wordCard(w, au, badge){
  const [word, cls, c, ar, img] = WBY[w];
  return `
    <div class="card wc-in" data-w="${word}" style="padding:14px; width:280px; cursor:pointer; text-align:center;">
      <img class="pic" src="${A}${img}" style="width:100%; height:150px; object-fit:contain;">
      <div style="display:flex; align-items:center; justify-content:center; gap:12px; margin-top:8px;">
        <button class="speaker small" data-audio="${au}" data-toast="Say it two times!"></button>
        <span style="font-size:26px; font-weight:800; color:${c};">${word}</span>
      </div>
      ${badge || ''}
      <div class="ar" style="font-size:16px; color:#7a8aa0; margin-top:4px;">${ar}</div>
    </div>`;
}

/* ---------- S7 · short a group: apple · cap · tap ---------- */
addScreen('Short a · apple cap tap', `
  <div style="text-align:center; width:100%;">
    <span class="source-badge">PHONICS · CD1 11 · OFFICIAL JINGLE + PRACTICE WORDS · SHORT A</span>
    <div style="font-size:24px; font-weight:800; color:#3d3356; margin:12px 0 14px;">
      Short <b style="color:#d94f4f;">a</b> — like <b style="color:#d94f4f;">a</b>pple!</div>
    <div style="display:flex; gap:24px; justify-content:center;">
      ${wordCard('apple','a_official_jingle_a.mp3','<div style="font-size:14px; font-weight:800; color:#24a66a; margin-top:6px;">♪ official jingle</div>')}
      ${wordCard('cap','a_t_pat_cap.mp3')}
      ${wordCard('tap','a_t_pat_tap.mp3')}
    </div>
    <div style="margin-top:12px; font-size:17px; font-weight:700; color:#8a6d3b;">Tap 🔊 — hear "a, a, ___!" — you say it too!</div>
  </div>`, el=>({
  onEnter(){
    el.querySelectorAll('.wc-in').forEach(c=> c.onclick=e=>{
      if (e.target.closest('.speaker')) return;
      play(WBY[c.dataset.w][5]); toast('Listen — then you say it!');
    });
  }
}));

/* ---------- S8 · long A group: apron · cape · tape ---------- */
addScreen('Long A · apron cape tape', `
  <div style="text-align:center; width:100%;">
    <span class="source-badge">PHONICS · PRACTICE MODEL (CD1 12 PENDING) · LONG A</span>
    <div style="font-size:24px; font-weight:800; color:#3d3356; margin:12px 0 14px;">
      Long <b style="color:#2563eb;">A</b> — the letter says its <b style="color:#2563eb;">NAME</b>!</div>
    <div style="display:flex; gap:24px; justify-content:center;">
      ${wordCard('apron','a_t_pat_apron.mp3','<div style="font-size:14px; font-weight:800; color:#8a6d3b; margin-top:6px;">anchor: A says its name</div>')}
      ${wordCard('cape','a_t_pat_cape.mp3','<div style="font-size:14px; font-weight:800; color:#d97706; margin-top:6px;">✨ magic e</div>')}
      ${wordCard('tape','a_t_pat_tape.mp3','<div style="font-size:14px; font-weight:800; color:#d97706; margin-top:6px;">✨ magic e</div>')}
    </div>
    <div style="margin-top:12px; font-size:17px; font-weight:700; color:#8a6d3b;">Tap 🔊 — hear "A, A, ___!" — stretch it: caaape!</div>
  </div>`, el=>({
  onEnter(){
    el.querySelectorAll('.wc-in').forEach(c=> c.onclick=e=>{
      if (e.target.closest('.speaker')) return;
      play(WBY[c.dataset.w][5]); toast('Listen — then you say it!');
    });
  }
}));

/* ---------- S11 · listen & choose: a vs a_e ---------- */
addScreen('Listen · long or short (a)', `
  <div style="text-align:center; width:100%; max-width:900px;">
    <span class="source-badge">EARS ONLY · LONG OR SHORT?</span>
    <div style="display:flex; align-items:center; gap:16px; justify-content:center; margin:14px 0 18px;">
      <button id="lc-play" class="speaker" style="width:72px; height:72px;"></button>
      <span id="lc-round" class="card" style="padding:8px 18px; font-size:18px; font-weight:800; color:#8a6d3b;">Round 1 / 4</span>
    </div>
    <div style="display:flex; gap:30px; justify-content:center;">
      <button class="lc-pick" data-cls="a" style="width:300px; height:130px; border:none; border-radius:20px; cursor:pointer;
        background:#fdf0ec; border:3px solid #d94f4f; font-size:34px; font-weight:800; color:#d94f4f;">
        a<br><span style="font-size:18px; font-weight:700;">short · apple</span></button>
      <button class="lc-pick" data-cls="ae" style="width:300px; height:130px; border:none; border-radius:20px; cursor:pointer;
        background:#eef4fd; border:3px solid #2563eb; font-size:34px; font-weight:800; color:#2563eb;">
        a_e<br><span style="font-size:18px; font-weight:700;">long · cape</span></button>
    </div>
    <div style="margin-top:16px; font-size:19px; font-weight:700; color:#8a6d3b;">Listen → tap SHORT or LONG</div>
  </div>`, el=>{
  const POOL=['cap','cape','tap','tape','apple','apron'];
  let deck=[], di=0;
  function deal(){ deck=POOL.sort(()=>Math.random()-.5).slice(0,4); di=0; paint(); }
  function paint(){
    el.querySelector('#lc-round').textContent = di<4 ? ('Round '+(di+1)+' / 4') : 'Done!';
    el.querySelectorAll('.lc-pick').forEach(p=>{ p.style.boxShadow=''; });
  }
  function playW(){ if (di<4) play(WBY[deck[di]][5]); }
  el.querySelector('#lc-play').onclick=playW;
  el.querySelectorAll('.lc-pick').forEach(p=> p.onclick=()=>{
    if (di>=4) return;
    if (p.dataset.cls===WBY[deck[di]][1]){
      sfx('sfx_correct.mp3'); p.style.boxShadow='0 0 0 6px #1f9d6c55';
      di++; later(()=>{ paint(); if(di<4){ playW(); } else { sfx('sfx_success.mp3'); toast('All four! Great ears!'); } }, 800);
    } else { sfx('sfx_wrong.mp3'); toast('Listen again!'); later(playW, 500); }
  });
  return { onEnter(){ deal(); later(playW, 450); } };
});

/* ---------- S10 · short i group: ink · pin · Tim ---------- */
addScreen('Short i · ink pin Tim', `
  <div style="text-align:center; width:100%;">
    <span class="source-badge">PHONICS · CD1 11 · OFFICIAL JINGLE + PRACTICE WORDS · SHORT I</span>
    <div style="font-size:24px; font-weight:800; color:#3d3356; margin:12px 0 14px;">
      Short <b style="color:#0891b2;">i</b> — like <b style="color:#0891b2;">i</b>nk!</div>
    <div style="display:flex; gap:24px; justify-content:center;">
      ${wordCard('ink','a_official_jingle_i.mp3','<div style="font-size:14px; font-weight:800; color:#24a66a; margin-top:6px;">♪ official jingle</div>')}
      ${wordCard('pin','a_t_pat_pin.mp3')}
      ${wordCard('Tim','a_t_pat_tim.mp3','<div style="font-size:14px; font-weight:800; color:#8a6d3b; margin-top:6px;">the parrot\'s name!</div>')}
    </div>
    <div style="margin-top:12px; font-size:17px; font-weight:700; color:#8a6d3b;">Tap 🔊 — hear "i, i, ___!" — you say it too!</div>
  </div>`, el=>({
  onEnter(){
    el.querySelectorAll('.wc-in').forEach(c=> c.onclick=e=>{
      if (e.target.closest('.speaker')) return;
      play(WBY[c.dataset.w][5]); toast('Listen — then you say it!');
    });
  }
}));

/* ---------- S11 · long I group: iron · pine · time ---------- */
addScreen('Long I · iron pine time', `
  <div style="text-align:center; width:100%;">
    <span class="source-badge">PHONICS · PRACTICE MODEL (CD1 13 PENDING) · LONG I</span>
    <div style="font-size:24px; font-weight:800; color:#3d3356; margin:12px 0 14px;">
      Long <b style="color:#7b5ea7;">I</b> — the letter says its <b style="color:#7b5ea7;">NAME</b>!</div>
    <div style="display:flex; gap:24px; justify-content:center;">
      ${wordCard('iron','a_t_pat_iron.mp3','<div style="font-size:14px; font-weight:800; color:#8a6d3b; margin-top:6px;">anchor: I says its name</div>')}
      ${wordCard('pine','a_t_pat_pine.mp3','<div style="font-size:14px; font-weight:800; color:#d97706; margin-top:6px;">✨ magic e</div>')}
      ${wordCard('time','a_t_pat_time.mp3','<div style="font-size:14px; font-weight:800; color:#d97706; margin-top:6px;">✨ magic e</div>')}
    </div>
    <div style="margin-top:12px; font-size:17px; font-weight:700; color:#8a6d3b;">Tap 🔊 — hear "I, I, ___!" — stretch it: piiine!</div>
  </div>`, el=>({
  onEnter(){
    el.querySelectorAll('.wc-in').forEach(c=> c.onclick=e=>{
      if (e.target.closest('.speaker')) return;
      play(WBY[c.dataset.w][5]); toast('Listen — then you say it!');
    });
  }
}));

/* ---------- S14 · listen & choose: i vs i_e ---------- */
addScreen('Listen · long or short (i)', `
  <div style="text-align:center; width:100%; max-width:900px;">
    <span class="source-badge">EARS ONLY · LONG OR SHORT?</span>
    <div style="display:flex; align-items:center; gap:16px; justify-content:center; margin:14px 0 18px;">
      <button id="lci-play" class="speaker" style="width:72px; height:72px;"></button>
      <span id="lci-round" class="card" style="padding:8px 18px; font-size:18px; font-weight:800; color:#8a6d3b;">Round 1 / 4</span>
    </div>
    <div style="display:flex; gap:30px; justify-content:center;">
      <button class="lci-pick" data-cls="i" style="width:300px; height:130px; border:none; border-radius:20px; cursor:pointer;
        background:#ecfafb; border:3px solid #0891b2; font-size:34px; font-weight:800; color:#0891b2;">
        i<br><span style="font-size:18px; font-weight:700;">short · pin</span></button>
      <button class="lci-pick" data-cls="ie" style="width:300px; height:130px; border:none; border-radius:20px; cursor:pointer;
        background:#f3eefb; border:3px solid #7b5ea7; font-size:34px; font-weight:800; color:#7b5ea7;">
        i_e<br><span style="font-size:18px; font-weight:700;">long · pine</span></button>
    </div>
    <div style="margin-top:16px; font-size:19px; font-weight:700; color:#8a6d3b;">Listen → tap SHORT or LONG</div>
  </div>`, el=>{
  const POOL=['pin','pine','Tim','time','ink','iron'];
  let deck=[], di=0;
  function deal(){ deck=POOL.sort(()=>Math.random()-.5).slice(0,4); di=0; paint(); }
  function paint(){
    el.querySelector('#lci-round').textContent = di<4 ? ('Round '+(di+1)+' / 4') : 'Done!';
    el.querySelectorAll('.lci-pick').forEach(p=>{ p.style.boxShadow=''; });
  }
  function playW(){ if (di<4) play(WBY[deck[di]][5]); }
  el.querySelector('#lci-play').onclick=playW;
  el.querySelectorAll('.lci-pick').forEach(p=> p.onclick=()=>{
    if (di>=4) return;
    if (p.dataset.cls===WBY[deck[di]][1]){
      sfx('sfx_correct.mp3'); p.style.boxShadow='0 0 0 6px #1f9d6c55';
      di++; later(()=>{ paint(); if(di<4){ playW(); } else { sfx('sfx_success.mp3'); toast('All four! Great ears!'); } }, 800);
    } else { sfx('sfx_wrong.mp3'); toast('Listen again!'); later(playW, 500); }
  });
  return { onEnter(){ deal(); later(playW, 450); } };
});

/* ---------- S15 · jingle: official anchors ---------- */
addScreen('Jingle · A says · I says', `
  <div style="text-align:center; width:100%; max-width:900px;">
    <span class="source-badge">PHONICS JINGLE · CD1 11 · OFFICIAL AUDIO</span>
    <div style="font-size:24px; font-weight:800; color:#3d3356; margin:12px 0 16px;">
      Sing with the book — you sing the last two words!</div>
    ${[['a_official_jingle_a.mp3','A says … <b style="color:#d94f4f;">a, a</b>, <b style="color:#d94f4f;">apple</b>!','#d94f4f'],
       ['a_official_jingle_i.mp3','I says … <b style="color:#0891b2;">i, i</b>, <b style="color:#0891b2;">ink</b>!','#0891b2']].map(([au,t,c])=>`
    <div class="card" style="display:flex; align-items:center; gap:16px; padding:18px 24px; margin-bottom:14px;">
      <button class="speaker" data-audio="${au}" data-toast="Sing the last two words!"></button>
      <div style="font-size:27px; font-weight:800; color:#463a5e;">${t}</div>
    </div>`).join('')}
    <div style="display:flex; gap:14px; justify-content:center; margin-top:8px;">
      ${[1,2].map(n=>`<button class="sing-done" data-n="${n}" style="height:46px; padding:0 22px; border:none;
        border-radius:23px; background:#f3eefb; color:#4a3a6e; font-size:17px; font-weight:800; cursor:pointer;">We sang both! ×${n}</button>`).join('')}
    </div>
  </div>`, el=>({
  onEnter(){
    el.querySelectorAll('.sing-done').forEach(b=> b.onclick=()=>{
      b.style.background='#24a66a'; b.style.color='#fff'; b.textContent='✓ ×'+b.dataset.n;
      sfx('sfx_correct.mp3');
    });
  }
}));

/* ---------- S14 · Fun Time: the book's mime game (page 11) ---------- */
addScreen('Fun Time · mime and say', `
  <div style="display:flex; gap:36px; align-items:center; width:100%; max-width:1160px; justify-content:center;">
    <div style="text-align:center;">
      <span class="source-badge">FUN TIME · BOOK PAGE 11 · PHONICS GAME (CD1 14 PENDING)</span>
      <img class="pic" src="${A}game_mime.jpg" style="width:540px; border-radius:14px; box-shadow:0 8px 20px rgba(0,0,0,.18); margin-top:12px;">
      <div style="font-size:15px; font-weight:700; color:#8a6d3b; margin-top:6px;">We Can 2 · Unit 1 · Page 11 · Fun Time</div>
    </div>
    <div style="width:470px; text-align:center;">
      <div style="font-size:24px; font-weight:800; color:#3d3356; line-height:1.6; margin-bottom:14px; text-align:left;">
        1️⃣ I say: <b style="color:#6a4fa3;">"I says …"</b><br>
        2️⃣ You finish with the picture:<br><b style="color:#7b5ea7;">"i, i, pine!"</b><br>
        3️⃣ Tap 🔊 — check yourself!
      </div>
      <div class="card" style="padding:16px 18px;">
        <div id="mg-round" style="font-size:16px; font-weight:800; color:#8a6d3b;">Round 1 / 4</div>
        <div style="min-height:150px; display:flex; align-items:center; justify-content:center; margin:8px 0;">
          <img id="mg-pic" class="pic" src="${A}w_pine.jpg" style="max-height:150px; max-width:100%; object-fit:contain;">
        </div>
        <div id="mg-line" style="font-size:27px; font-weight:800; color:#463a5e; visibility:hidden;">i, i, <b style="color:#7b5ea7;">pine</b>!</div>
        <div style="display:flex; gap:12px; justify-content:center; margin-top:12px;">
          <button id="mg-say" class="pill" style="background:#f3eefb; color:#4a3a6e; font-size:17px; height:46px; cursor:pointer;">🗣️ I said it!</button>
          <button id="mg-hear" class="pill" style="background:#24a66a; color:#fff; font-size:17px; height:46px; cursor:pointer;">🔊 Hear &amp; check</button>
        </div>
      </div>
    </div>
  </div>`, el=>{
  /* book game: teacher says "I says ..." — student completes with the picture word */
  const DECK=[['i, i','pine','w_pine.jpg','a_t_pat_pine.mp3','#7b5ea7'],
              ['a, a','apple','w_apple.jpg','a_official_jingle_a.mp3','#d94f4f'],
              ['I, I','time','w_time.jpg','a_t_pat_time.mp3','#7b5ea7'],
              ['A, A','cape','w_cape.jpg','a_t_pat_cape.mp3','#2563eb']];
  let di=0, said=false;
  function paint(){
    const [snd,word,img] = DECK[di] || ['','',''];
    el.querySelector('#mg-round').textContent = di<4 ? ('Round '+(di+1)+' / 4') : 'Done!';
    el.querySelector('#mg-pic').src = A+img;
    const line = el.querySelector('#mg-line');
    line.innerHTML = snd+', <b style="color:'+DECK[di][4]+'">'+word+'</b>!';
    line.style.visibility='hidden';
    said=false;
  }
  el.querySelector('#mg-say').onclick=()=>{
    if (di>=4) return;
    said=true; sfx('sfx_pop.mp3');
    el.querySelector('#mg-line').style.visibility='visible';
    toast('You said it — now hear and check!');
  };
  el.querySelector('#mg-hear').onclick=()=>{
    if (di>=4) return;
    if (!said){ toast('Say it first — then check!'); return; }
    el.querySelector('#mg-line').style.visibility='visible';
    play(DECK[di][3]);
    later(()=>{ di++; if (di<4){ sfx('sfx_correct.mp3'); paint(); }
      else { sfx('sfx_success.mp3'); toast('Great game! Four rounds done!'); } }, 2200);
  };
  return { onEnter(){ di=0; paint(); } };
});

/* ---------- S15 · recycle: cap/clap/lock/clock ears from L2 (book page 6) ---------- */
addScreen('Quick ears · Lesson 2 words', `
  <div style="text-align:center; width:100%; max-width:960px;">
    <span class="source-badge">FROM LESSON 2 · BOOK PAGE 6 · QUICK EARS</span>
    <div style="font-size:30px; font-weight:800; color:#3d3356; margin:12px 0 4px;">You know these! Listen — tap the picture!</div>
    <div style="display:flex; align-items:center; gap:16px; justify-content:center; margin:12px 0 14px;">
      <button id="rc-play" class="speaker" style="width:64px; height:64px;"></button>
      <span id="rc-round" class="card" style="padding:6px 16px; font-size:17px; font-weight:800; color:#8a6d3b;">1 / 4</span>
    </div>
    <div style="display:flex; gap:20px; justify-content:center;">
      ${[['cap','l2_cap.jpg'],['clap','l2_clap.jpg'],['lock','l2_lock.jpg'],['clock','l2_clock.jpg']].map(([w,img])=>`
      <div class="card rc-pic" data-w="${w}" style="cursor:pointer; padding:14px; width:205px;">
        <img class="pic" src="${A}${img}" style="width:100%; height:135px; object-fit:contain;">
        <div style="font-size:21px; font-weight:800; color:#463a5e; margin-top:8px;">${w}</div>
      </div>`).join('')}
    </div>
  </div>`, el=>{
  const WORDS4=['cap','clap','lock','clock'];
  const AU={'cap':'a_t_cap.mp3','clap':'a_t_clap_word.mp3','lock':'a_t_lock.mp3','clock':'a_t_clock.mp3'};
  let deck=[], di=0;
  function deal(){ deck=[...WORDS4].sort(()=>Math.random()-.5); di=0; paint(); }
  function paint(){ el.querySelector('#rc-round').textContent = di<4 ? (di+1)+' / 4' : 'Done!';
    el.querySelectorAll('.rc-pic').forEach(p=>{ p.style.border=''; p.style.background=''; }); }
  function playW(){ if (di<4) play(AU[deck[di]]); }
  el.querySelector('#rc-play').onclick=playW;
  el.querySelectorAll('.rc-pic').forEach(p=> p.onclick=()=>{
    if (di>=4) return;
    if (p.dataset.w===deck[di]){
      sfx('sfx_correct.mp3'); p.style.border='3px solid #1f9d6c'; p.style.background='#e8f8f0';
      di++; later(()=>{ paint(); if(di<4){ playW(); } else { sfx('sfx_success.mp3'); toast('All four!'); } }, 700);
    } else { sfx('sfx_wrong.mp3'); toast('Listen again!'); playW(); }
  });
  return { onEnter(){ deal(); later(playW, 400); } };
});

/* ---------- S18 · Check 1: eight words, point to the sound card ---------- */
addScreen('Check 1 · point to the sound', `
  <div style="text-align:center; width:100%;">
    <span class="source-badge">CHECK 1 · NO HELP · NO ARABIC</span>
    <div style="font-size:24px; font-weight:800; color:#3d3356; margin:12px 0 6px;">
      Hear a word — point to its sound card and say "long" or "short"!</div>
    <div style="display:flex; align-items:center; gap:14px; justify-content:center; margin:8px 0 14px;">
      <button id="c1-play" class="speaker" style="width:68px; height:68px;"></button>
      <span id="c1-round" class="card" style="padding:8px 18px; font-size:18px; font-weight:800; color:#8a6d3b;">Word 1 / 8</span>
    </div>
    <div style="display:flex; gap:16px; justify-content:center;">
      ${Object.entries(SND).map(([k,[label,c,len]])=>`
      <button class="c1-card" data-cls="${k}" style="width:210px; height:120px; border:none; border-radius:18px; cursor:pointer;
        background:${c}14; border:3px solid ${c}; font-size:30px; font-weight:800; color:${c};">
        ${label}<br><span style="font-size:16px; font-weight:700;">${len}</span></button>`).join('')}
    </div>
    <div class="teacher-only" style="margin-top:14px; justify-content:center;">
      <span class="pill" style="background:#f3eefb; color:#4a3a6e; font-size:14px;">Teacher: tap the card the STUDENT chose — the screen judges it</span>
    </div>
  </div>
  <div class="teacher-only" style="position:absolute; left:44px; right:44px; bottom:12px; gap:8px; align-items:center; justify-content:center; flex-wrap:wrap;">
    <span class="pill" style="background:#3d3356;color:#fff;">Error:</span>
    <button class="pill error-tag" data-error="a-ae-mix">a / a_e mix</button>
    <button class="pill error-tag" data-error="i-ie-mix">i / i_e mix</button>
    <button class="pill error-tag" data-error="guess-before-end">Guesses before word ends</button>
    <button class="pill error-tag" data-error="silent">Silent / gives up</button>
    <button class="pill rate-tag green" data-rate="A">A · 8/8</button>
    <button class="pill rate-tag" data-rate="B" style="background:#ffc84a;color:#3d3356;">B · 6–7</button>
    <button class="pill rate-tag coral" data-rate="C">C · ≤5</button>
  </div>`, el=>{
  let deck=[], di=0, score=0;
  function deal(){ deck=WORDS.map(w=>w[0]).sort(()=>Math.random()-.5).slice(0,8); di=0; score=0; paint(); }
  function paint(){
    el.querySelector('#c1-round').textContent = di<8 ? ('Word '+(di+1)+' / 8') : ('Done — score '+score+'/8, record below');
    el.querySelectorAll('.c1-card').forEach(p=>{ p.style.boxShadow=''; });
  }
  function playW(){ if (di<8) play(WBY[deck[di]][5]); }
  el.querySelector('#c1-play').onclick=playW;
  el.querySelectorAll('.c1-card').forEach(p=> p.onclick=()=>{
    if (di>=8) return;
    if (p.dataset.cls===WBY[deck[di]][1]){
      score++; sfx('sfx_correct.mp3'); p.style.boxShadow='0 0 0 6px #1f9d6c55';
    } else { sfx('sfx_wrong.mp3'); p.style.boxShadow='0 0 0 6px #d94f4f55'; }
    later(()=>{ di++; paint(); if(di<8) later(playW, 400);
      else toast('Score '+score+' / 8 — record the level.'); }, 900);
  });
  el.querySelectorAll('.error-tag').forEach(b=>b.onclick=()=>{
    assessment.errors.add(b.dataset.error); b.style.background='#ffc84a'; b.style.color='#3d3356';
  });
  el.querySelectorAll('.rate-tag').forEach(b=>b.onclick=()=>{
    assessment.check1=b.dataset.rate; sfx('sfx_correct.mp3'); toast('Check 1 recorded: '+b.dataset.rate);
  });
  return { onEnter(){
    deal();
    assessment.check1=null; assessment.check2=null; assessment.errors.clear();
    el.querySelectorAll('.error-tag').forEach(b=>{b.style.background='';b.style.color='';});
    later(playW, 500);
  } };
});

/* ---------- S19 · fixed repair path + Check 2 ---------- */
addScreen('Repair · Check 2', `
  <div style="display:grid; grid-template-columns:400px 1fr; gap:48px; align-items:center; width:100%; max-width:1080px;">
    <div class="card" style="height:420px; display:flex; align-items:center; justify-content:center; padding:16px; background:#fdf6ec;">
      <img src="${A}magic_e.jpg" style="max-width:100%; max-height:100%; object-fit:contain; border-radius:14px;" alt="magic e">
    </div>
    <div>
      <span class="source-badge">HELP FADES → CHECK 2</span>
      <h1 style="font-size:40px; color:#3d3356; margin:14px 0 12px;">Fix the sound, hear again</h1>
      <div id="repair-view" class="card" style="min-height:170px; display:flex; align-items:center; justify-content:center;
        text-align:center; font-size:27px; font-weight:800; color:#3d3356; line-height:1.5; padding:16px 22px;">
        <button class="speaker" data-audio="a_t_w_cape.mp3"></button>
      </div>
    </div>
  </div>
  <div class="teacher-only" style="position:absolute; left:30px; right:30px; bottom:12px; gap:6px; align-items:center; justify-content:center; flex-wrap:wrap;">
    ${['Meaning','Slow','Contrast','Model','Build','Hide help','Try again'].map((t,i)=>`<button class="pill repair-step" data-step="${i}" style="background:#f3eefb;color:#4a3a6e;">${i+1}. ${t}</button>`).join('')}
    <button class="pill check2-rate green" data-rate="A">A</button>
    <button class="pill check2-rate" data-rate="B" style="background:#ffc84a;color:#3d3356;">B</button>
    <button class="pill check2-rate coral" data-rate="C">C</button>
  </div>`, el=>{
  const view=el.querySelector('#repair-view');
  let nextStep=0;
  const steps=[
    /* 1 Meaning — Arabic once */
    ()=>{ view.innerHTML='<div><div style="font-size:23px;">قصير = short · طويل = long</div>'+
      '<div class="ar" style="display:block; color:#24a66a; font-size:21px; margin-top:8px;">الصوت القصير مثل apple · الصوت الطويل: الحرف يقول اسمه مثل cape</div></div>'; },
    /* 2 Slow */
    ()=>{ view.innerHTML='<div style="font-size:23px;">Listen slowly — short, then long.</div>';
      playSlow('a_t_w_cap.mp3', ()=> later(()=> playSlow('a_t_w_cape.mp3'), 500)); },
    /* 3 Contrast — cap/cape + pin/pine side by side */
    ()=>{ view.innerHTML=`<div style="display:flex; gap:14px; justify-content:center; align-items:center;">
        <span class="card" style="padding:10px 16px; border:2px solid #d94f4f; color:#d94f4f;">cap</span>
        <span style="font-size:24px;">🪄</span>
        <span class="card" style="padding:10px 16px; border:2px solid #2563eb; color:#2563eb;">cape</span>
        <span style="width:20px;"></span>
        <span class="card" style="padding:10px 16px; border:2px solid #0891b2; color:#0891b2;">pin</span>
        <span style="font-size:24px;">🪄</span>
        <span class="card" style="padding:10px 16px; border:2px solid #7b5ea7; color:#7b5ea7;">pine</span>
      </div>`; },
    /* 4 Model — exaggerate */
    ()=>{ view.innerHTML='<div style="font-size:22px;">Watch my mouth: <span style="color:#d94f4f;">cap.</span> … <span style="color:#2563eb;">caaape.</span></div>';
      play('a_t_w_cap.mp3', ()=> later(()=> play('a_t_w_cape.mp3'), 500)); },
    /* 5 Build */
    ()=>{ view.innerHTML=`<div style="display:flex; gap:8px; justify-content:center; font-size:22px; align-items:center;">
        <span class="pill blue">c</span><span class="pill blue">a</span><span class="pill blue">p</span>
        <span style="font-size:24px;">+</span><span class="pill coral">e</span>
        <span style="font-size:24px;">→</span><span class="pill green">cape</span></div>`;
      later(()=> play('a_t_missing_e.mp3'), 300); },
    /* 6 Hide help */
    ()=>{ view.innerHTML='<div style="font-size:22px;color:#6e7b8b;">No cards now. Just listen and say long or short.</div>'; },
    /* 7 Try again = Check 2: fresh eight */
    ()=>{ view.innerHTML='<div style="display:flex; flex-direction:column; gap:12px; align-items:center;">'+
        '<div style="font-size:21px;">Check 2 — eight fresh words. Hear one, say long or short!</div>'+
        '<button class="speaker" id="c2-play" style="width:64px; height:64px;"></button>'+
        '<div id="c2-round" style="font-size:17px; font-weight:800; color:#8a6d3b;">Word 1 / 8</div></div>';
      const fresh=WORDS.map(w=>w[0]).sort(()=>Math.random()-.5).slice(0,8);
      let fi=0;
      const pb=view.querySelector('#c2-play'), rb=view.querySelector('#c2-round');
      pb.onclick=()=>{ if(fi<8) play(WBY[fresh[fi]][5]); };
      /* teacher taps speaker again after student answers to advance */
      pb.addEventListener('dblclick', ()=>{});
      view.addEventListener('click', function adv(e){
        if (e.target.closest('#c2-play')) return;
      });
      /* simple advance: long-press替代 — 用右下角教师区点击 round 文本前进 */
      rb.style.cursor='pointer'; rb.title='Tap to next word';
      rb.onclick=()=>{ if(fi<8){ fi++; sfx('sfx_pop.mp3'); rb.textContent = fi<8 ? ('Word '+(fi+1)+' / 8') : 'Done — record below';
        if(fi<8) later(()=>play(WBY[fresh[fi]][5]), 300); } };
      toast('Check 2 — tap the counter for the next word.');
      later(()=>{ if(fi<8) play(WBY[fresh[0]][5]); }, 600); }
  ];
  el.querySelectorAll('.repair-step').forEach(b=>b.onclick=()=>{
    const i=+b.dataset.step;
    if(i>nextStep){ toast('Use the next repair step.'); return; }
    steps[i](); b.style.background='#24a66a'; b.style.color='#fff';
    if(i===nextStep) nextStep=Math.min(6,nextStep+1);
  });
  el.querySelectorAll('.check2-rate').forEach(b=>b.onclick=()=>{
    assessment.check2=b.dataset.rate; sfx('sfx_success.mp3'); toast('Check 2 recorded: '+b.dataset.rate);
  });
  return { onEnter(){ nextStep=0; view.innerHTML='<button class="speaker" data-audio="a_t_w_cape.mp3"></button>';
    el.querySelectorAll('.repair-step').forEach(b=>{b.style.background='#f3eefb';b.style.color='#4a3a6e';}); } };
});

/* ---------- S18 · school practice 1: listen and number (words in the boxes) ---------- */
addScreen('School practice 1 · number 1 or 2', `
  <div style="width:100%; max-width:900px; text-align:center;">
    <span class="source-badge">SCHOOL-STYLE PRACTICE · 1 OF 2</span>
    <div style="font-size:26px; font-weight:800; color:#3d3356; margin:12px 0 4px;">Listen — tap the number!</div>
    <div class="ar" style="font-size:16px; color:#7a8aa0; margin-bottom:12px;">استمع واضغط على الرقم الصحيح</div>
    <div style="display:flex; align-items:center; gap:16px; justify-content:center; margin-bottom:14px;">
      <button id="sn-play" class="speaker" style="width:68px; height:68px;"></button>
      <span id="sn-round" class="card" style="padding:8px 18px; font-size:18px; font-weight:800; color:#8a6d3b;">Item 1 / 2</span>
    </div>
    <div style="display:flex; gap:30px; justify-content:center;">
      <button class="sn-pick" data-n="1" style="width:290px; border:none; border-radius:18px; cursor:pointer; padding:14px;
        background:#fdf0ec; border:3px solid #d94f4f;">
        <span style="font-size:44px; font-weight:800; color:#d94f4f;">1</span><br>
        <img class="pic sn-img1" src="${A}w_cap.jpg" style="height:110px; object-fit:contain; margin:6px 0;">
        <div class="sn-word1" style="font-size:26px; font-weight:800; color:#d94f4f;">cap</div>
      </button>
      <button class="sn-pick" data-n="2" style="width:290px; border:none; border-radius:18px; cursor:pointer; padding:14px;
        background:#eef4fd; border:3px solid #2563eb;">
        <span style="font-size:44px; font-weight:800; color:#2563eb;">2</span><br>
        <img class="pic sn-img2" src="${A}w_cape.jpg" style="height:110px; object-fit:contain; margin:6px 0;">
        <div class="sn-word2" style="font-size:26px; font-weight:800; color:#2563eb;">cape</div>
      </button>
    </div>
    <div id="sn-ans" class="card" style="display:none; margin:14px auto 0; max-width:380px; padding:12px 18px;
      font-size:24px; font-weight:800; color:#1f9d6c;"></div>
  </div>`, el=>{
  /* like the book: words sit inside the numbered boxes; hear one → tap its number */
  const ITEMS=[ {w1:'cap', i1:'w_cap.jpg', w2:'cape', i2:'w_cape.jpg', au:'a_t_w_cape.mp3', ans:'2'},
                {w1:'pin', i1:'w_pin.jpg', w2:'pine', i2:'w_pine.jpg', au:'a_t_w_pin.mp3',  ans:'1'} ];
  let di=0;
  function paint(){
    const it = ITEMS[di] || ITEMS[0];
    el.querySelector('#sn-round').textContent = di<2 ? ('Item '+(di+1)+' / 2') : 'Done!';
    el.querySelector('.sn-img1').src = A+it.i1; el.querySelector('.sn-word1').textContent = it.w1;
    el.querySelector('.sn-img2').src = A+it.i2; el.querySelector('.sn-word2').textContent = it.w2;
    el.querySelector('#sn-ans').style.display='none';
    el.querySelectorAll('.sn-pick').forEach(p=> p.style.boxShadow='');
  }
  function playW(){ if (di<2) play(ITEMS[di].au); }
  el.querySelector('#sn-play').onclick=playW;
  el.querySelectorAll('.sn-pick').forEach(p=> p.onclick=()=>{
    if (di>=2) return;
    if (p.dataset.n===ITEMS[di].ans){
      sfx('sfx_correct.mp3'); p.style.boxShadow='0 0 0 6px #1f9d6c55';
      const ans=el.querySelector('#sn-ans');
      ans.innerHTML = '✓ number '+ITEMS[di].ans+'!';
      ans.style.display='block';
      di++; later(()=>{ paint(); if(di<2) later(playW, 500); else sfx('sfx_success.mp3'); }, 1300);
    } else { sfx('sfx_wrong.mp3'); toast('Listen again!'); later(playW, 500); }
  });
  return { onEnter(){ di=0; paint(); later(playW, 450); } };
});

/* ---------- S21 · school practice 2: add the magic e ---------- */
addScreen('School practice 2 · add magic e', `
  <div style="width:100%; max-width:820px; text-align:center;">
    <span class="source-badge">SCHOOL-STYLE PRACTICE · 2 OF 2</span>
    <div style="font-size:22px; font-weight:750; color:#3d3356; margin:14px 0 6px;">
      Say the new word aloud — then tap the missing letter.
      <span class="ar" style="font-size:16px; color:#7a8aa0;"> · قُل الكلمة ثم اضغط الحرف الناقص</span></div>
    <div style="display:flex; align-items:center; gap:14px; justify-content:center; margin-bottom:14px;">
      <button class="speaker small" data-audio="a_t_missing_e.mp3" data-toast="Add the magic e!"></button>
      <span style="font-size:17px; color:#8a6d3b; font-weight:700;">"Add the magic e! c-a-p … cape!"</span>
    </div>
    <div id="ml-item" style="font-size:44px; font-weight:800; color:#463a5e; letter-spacing:10px; margin-bottom:18px;">c a p _</div>
    <div style="display:flex; gap:18px; justify-content:center;">
      ${[['e',1],['a',0],['i',0]].map(([L,ok])=>`
      <div class="card ml-o" data-ok="${ok}" style="padding:14px 34px; cursor:pointer;
        font-size:36px; font-weight:800; color:#463a5e;">${L}</div>`).join('')}
    </div>
    <div id="ml-ans" class="card" style="display:none; margin:16px auto 0; max-width:380px; padding:12px 18px;
      font-size:26px; font-weight:800; color:#1f9d6c;"></div>
  </div>`, el=>{
  const ITEMS=[['c a p _','cape','a_t_w_cape.mp3'],['p i n _','pine','a_t_w_pine.mp3']];
  let di=0;
  function paint(){
    el.querySelector('#ml-item').textContent = ITEMS[di][0];
    el.querySelector('#ml-ans').style.display='none';
    el.querySelectorAll('.ml-o').forEach(o=>{ o.style.background=''; o.style.border=''; });
  }
  el.querySelectorAll('.ml-o').forEach(o=> o.onclick=()=>{
    if (di>=2) return;
    if (o.dataset.ok==='1'){
      sfx('sfx_success.mp3'); o.style.background='#d9f2e5'; o.style.border='2px solid #1f9d6c';
      const ans=el.querySelector('#ml-ans');
      ans.textContent='✨ '+ITEMS[di][1]+'!'; ans.style.display='block';
      play(ITEMS[di][2]);
      di++; if (di<2) later(()=>{ sfx('sfx_pop.mp3'); paint(); }, 2000);
      else later(()=>{ el.querySelector('#ml-item').textContent='✓ ✓'; }, 2000);
    } else { sfx('sfx_wrong.mp3'); toast('Which letter does the magic?'); }
  });
  return { onEnter(){ di=0; paint(); } };
});

/* ---------- S22 · evidence-based achievement ---------- */
addScreen('Learning record', `
  <div style="text-align:center;">
    <span class="source-badge">TODAY’S EVIDENCE</span>
    <h1 class="title" style="margin:12px 0 6px;">I can hear long and short!</h1>
    <div class="ar" style="font-size:18px; color:#7a8aa0; margin-bottom:18px;">اليوم أستطيع أن أميّز الأصوات</div>
    <div style="display:flex; gap:26px; justify-content:center;">
      ${[['Hear short a / long a_e','a_t_w_cape.mp3','#2563eb'],
         ['Hear short i / long i_e','a_t_w_pine.mp3','#7b5ea7'],
         ['Say: apple · cape · pin · pine','a_t_w_apple.mp3','#d97706']]
        .map(([t,au,c])=>`
        <div class="badge" data-audio="${au}" style="cursor:pointer; width:270px; padding:24px 16px; border-radius:22px;
          background:#fff; box-shadow:0 6px 18px rgba(60,40,10,.12); border:3px solid ${c};">
          <div style="width:70px; height:70px; margin:0 auto 12px; border-radius:50%; background:${c};
            display:flex; align-items:center; justify-content:center;">
            <svg viewBox="0 0 24 24" width="38" height="38" fill="#fff"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>
          </div>
          <div style="font-size:20px; font-weight:700; color:#463a5e;">${t}</div>
        </div>`).join('')}
    </div>
    <div style="margin-top:14px;">
      <img class="pic" src="${A}goals_box.jpg" style="width:560px; border-radius:10px; box-shadow:0 6px 16px rgba(60,40,10,.14);">
      <div style="font-size:14px; font-weight:700; color:#8a6d3b; margin-top:4px;">We Can 2 · Unit 1 · Page 11 · I Can goals</div>
    </div>
    <div style="margin-top:12px;">
      <span class="pill" style="background:#fff3d6; color:#b45309; font-size:17px;">Badge: Word Wizard 🧙</span>
    </div>
    <div id="ability-level" class="card" style="display:inline-flex; margin-top:12px; padding:10px 20px; font-size:19px; font-weight:800; color:#3d3356;">Level: not recorded</div>
  </div>`, el=>({
  onEnter(){
    const level=assessment.check2 || assessment.check1 || 'Not recorded';
    const copy={A:'A · Independent',B:'B · With help, then independent',C:'C · Keep practising','Not recorded':'Not recorded'}[level];
    const colors={A:'#24a66a',B:'#ffc84a',C:'#f59e0b','Not recorded':'#e5edf2'};
    const box=el.querySelector('#ability-level'); box.textContent='Level: '+copy; box.style.borderColor=colors[level];
    try{ localStorage.setItem('khusoosi:wc2-u1-l4:result', level);
      localStorage.setItem('khusoosi:wc2-u1-l4:errors', JSON.stringify([...assessment.errors])); }catch(e){}
    if(level!=='Not recorded') later(()=>sfx('sfx_success.mp3'),250);
  }
}));

/* ---------- S23 · exit task + home review ---------- */
addScreen('Exit task · Home review', `
  <div style="display:flex; gap:40px; width:100%; justify-content:center; align-items:stretch;">
    <div class="card" style="width:520px; padding:26px 30px; text-align:center;">
      <div style="font-size:26px; font-weight:750; color:#3d3356; margin-bottom:6px;">Four anchor words — long or short?</div>
      <div class="ar" style="font-size:16px; color:#7a8aa0; margin-bottom:16px;">أربع كلمات — طويل أم قصير؟</div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
        ${['apple','cape','pin','pine'].map(w=>`
        <button class="exit-w" data-w="${w}" style="border:none; background:#fff; border-radius:14px; padding:12px;
          cursor:pointer; box-shadow:0 3px 10px rgba(40,30,60,.12);">
          <img src="${A}${WBY[w][4]}" style="width:100%; height:115px; object-fit:contain;">
          <div style="font-size:20px; font-weight:800; color:${WBY[w][2]}; margin-top:6px;">${w}</div>
        </button>`).join('')}
      </div>
      <div style="margin-top:12px; font-size:17px; color:#6e7b8b; font-weight:700;">Tap one — say "long!" or "short!" first, then hear it.</div>
    </div>
    <div class="card" style="width:520px; padding:26px 30px; text-align:center;">
      <div style="font-size:26px; font-weight:700; color:#463a5e; margin-bottom:6px;">Homework</div>
      <div class="ar" style="font-size:16px; color:#7a8aa0; margin-bottom:16px;">الواجب المنزلي</div>
      <div style="font-size:21px; font-weight:700; color:#8a6d3b; margin-bottom:14px; line-height:1.5;">Find one "magic e" word at home.<br>Say it to someone: cape! pine!</div>
      <div style="background:#fdf6ec; border:2px dashed #d9c9a3; border-radius:16px; padding:14px 18px;">
        <div style="font-size:21px; font-weight:750; color:#3d3356;">Home review · four stations</div>
        <div style="font-size:15px; color:#a08c5b; margin-top:4px;">words → listen & choose → jingle → exam style</div>
      </div>
      <div style="display:flex; align-items:center; gap:22px; margin-top:16px; justify-content:center;">
        <img src="${A}sec_qr_review.png" alt="home review QR" style="width:132px; height:132px; border-radius:14px; box-shadow:0 4px 12px rgba(60,40,10,.18);">
        <div style="text-align:center;">
          <a href="review/" target="_blank" style="display:flex; align-items:center; justify-content:center; gap:12px;
            background:#24a66a; border-radius:16px; padding:15px 22px; text-decoration:none;
            box-shadow:0 3px 0 #187c50;">
            <span style="font-size:21px; font-weight:800; color:#fff;">Open home review →</span>
          </a>
          <div style="font-size:15px; color:#8a6d3b; margin-top:10px; font-weight:700;">Scan the code — or tap the button</div>
          <div class="ar" style="font-size:15px; color:#7a8aa0; margin-top:2px;">امسح الرمز أو اضغط الزر</div>
        </div>
      </div>
      <div style="font-size:14px; color:#8a6d3b; margin-top:12px; font-weight:700;">Teacher: copy this link and send it to the parent</div>
    </div>
  </div>`, el=>{
  el.querySelectorAll('.exit-w').forEach(b=> b.onclick=()=>{
    play(WBY[b.dataset.w][5]);
    toast('Did you say long or short first?');
  });
  return { onEnter(){} };
});

/* ---------- boot ---------- */
(function(){
  const th = $('#thumbs');
  screens.forEach((s,k)=>{
    const b = document.createElement('button');
    b.textContent = (k+1) + ' · ' + s.objective;
    b.onclick = ()=>{ show(k); th.classList.remove('open'); };
    th.appendChild(b);
  });
})();
const query=new URLSearchParams(location.search);
const p0=parseInt(query.get('p')||'1',10);
if (query.get('ar')){ document.body.classList.add('ar-on'); $('#btn-ar').setAttribute('aria-pressed','true'); }
if (query.get('teacher')){ document.body.classList.add('teacher-on'); $('#btn-teacher').setAttribute('aria-pressed','true'); }
fit(); show(isNaN(p0)?0:p0-1);
