/* ================================================================
   We Can 1 · Unit 1 My Friends · L1 (25-min 1v1 paid lesson)
   17 screens · mastery checkpoint: complete a real name exchange
   ================================================================ */
const A = 'assets/';
const $ = s => document.querySelector(s);

/* ---------- audio bus: stop-all on page turn ---------- */
let curAudio = null;
function play(src, onend){
  stopAudio();
  curAudio = new Audio(A + src);
  curAudio.play().catch(()=>{});
  if (onend) curAudio.addEventListener('ended', onend, {once:true});
}
function playSlow(src, onend){
  stopAudio();
  curAudio = new Audio(A + src);
  curAudio.playbackRate = .78;
  curAudio.play().catch(()=>{});
  if (onend) curAudio.addEventListener('ended', onend, {once:true});
}
function stopAudio(){ if(curAudio){ curAudio.pause(); curAudio.currentTime=0; curAudio=null; } }
let curSfx = null;
function sfx(src){ try{ if(curSfx){curSfx.pause();} curSfx = new Audio(A+src); curSfx.play().catch(()=>{});}catch(e){} }

/* ---------- toast ---------- */
let toastTimer = null;
const assessment = { check1:null, check2:null, errors:new Set() };
function toast(msg){
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(()=>t.classList.remove('show'), 1800);
}

/* ---------- screen framework ---------- */
const screensHost = $('#screens');
const screens = [];   // {obj, objective, el, onEnter, onLeave}

const TEACHER_GUIDES = [
  '<b>Set up:</b> Check sound quickly. Keep this under one minute.',
  '<b>Lead-in:</b> Reuse the ready-for-class routine, then greet naturally. Accept Hello, Hi, or a wave before teaching.',
  '<b>Outcome:</b> Point to the school-book source and state the one real-life goal: ask and answer a name.',
  '<b>Input:</b> Model Hello once. Student waves and says it. Do not over-drill the isolated word.',
  '<b>Input:</b> Contrast Hi with Hello as two greetings, not a fixed question-and-answer pair.',
  '<b>Meaning:</b> Use the name tag to establish the intent. Avoid IPA teaching; move quickly to the full exchange.',
  '<b>Function check:</b> Student says the meaning first; teacher clicks the matching card. Require 3 of 4 without Arabic.',
  '<b>Book connection:</b> Play the official CD1 03-04 track once, then reveal and replay only the four target turns.',
  '<b>Supported practice:</b> One guided round is enough. If the learner completes it cleanly, move on.',
  '<b>Role swap:</b> Teacher is Labeeb; student is Labeeba. Use wave and point-to-self actions.',
  '<b>Fading:</b> Remove one line at a time. The learner must still produce the whole exchange.',
  '<b>Response game:</b> Listen for intent, then choose and say the reply. Do not guess the speaker.',
  '<b>Check 1:</b> New character asks the learner. Hide Arabic and sentence frames. Record error type before helping.',
  '<b>Repair:</b> Follow Meaning → Slow → Contrast → Model → Build → Hide help → Try again. Check 2 uses a different character.',
  '<b>School practice:</b> Learner answers aloud before clicking. Only name-exchange items belong here.',
  '<b>Record:</b> Set A, B, or C from Check 1/2 evidence; do not award badges for page completion.',
  '<b>Exit:</b> Third new character. No full answer. Help reveals only the first word. Then open the existing home review.'
];

function addScreen(objective, html, init){
  const el = document.createElement('section');
  el.className = 'screen';
  el.innerHTML = html;
  screensHost.appendChild(el);
  const api = init ? init(el) : {};
  screens.push({ objective, el, onEnter: api.onEnter, onLeave: api.onLeave });
}

let cur = 0;
function show(i){
  i = Math.max(0, Math.min(screens.length-1, i));
  if (screens[cur] && screens[cur].onLeave) screens[cur].onLeave();
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

/* ---------- stage scaling: always full 16:9, any window ---------- */
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

/* ---------- Arabic toggle: default pure English, not remembered ---------- */
$('#btn-ar').addEventListener('click', ()=>{
  const on = document.body.classList.toggle('ar-on');
  $('#btn-ar').setAttribute('aria-pressed', on);
});

$('#btn-teacher').addEventListener('click', ()=>{
  const on = document.body.classList.toggle('teacher-on');
  $('#btn-teacher').setAttribute('aria-pressed', on);
});

/* ---------- nav ---------- */
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
/* delegated speaker buttons: any element with data-audio plays it */
screensHost.addEventListener('click', e=>{
  const b = e.target.closest('[data-audio]');
  if (b){ play(b.dataset.audio); toast(b.dataset.toast || 'Listen and repeat'); }
});

const ICONS = {
  mic:'<svg viewBox="0 0 24 24" width="34" height="34" fill="#2b6cb0"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3zm6-3a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.94V22h2v-2.06A8 8 0 0 0 20 12h-2z"/></svg>',
  cam:'<svg viewBox="0 0 24 24" width="34" height="34" fill="#2b6cb0"><path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/></svg>',
  net:'<svg viewBox="0 0 24 24" width="34" height="34" fill="#2b6cb0"><path d="M12 21l3.5-4.5a5 5 0 0 0-7 0L12 21zm0-18C7.4 3 3.2 4.7 0 7.4l2 2.4A15.9 15.9 0 0 1 12 6c3.9 0 7.4 1.5 10 3.8l2-2.4C20.8 4.7 16.6 3 12 3zm0 6c-3 0-5.8 1.1-7.9 3l2 2.4A8.9 8.9 0 0 1 12 12c2.3 0 4.4.8 6 2.2l1.9-2.4A11.9 11.9 0 0 0 12 9z"/></svg>',
  pen:'<svg viewBox="0 0 24 24" width="34" height="34" fill="#2b6cb0"><path d="M3 17.2V21h3.8L17.9 9.9l-3.8-3.8L3 17.2zM20.7 7a1 1 0 0 0 0-1.4l-2.3-2.3a1 1 0 0 0-1.4 0l-1.8 1.8 3.8 3.8 1.7-1.9z"/></svg>'
};

/* ---------- S1 · class setup (full Arabic) ---------- */
addScreen('class setup', `
  <div style="direction:rtl; text-align:center; width:100%;">
    <h1 style="font-size:42px; color:#2b3a55; margin-bottom:26px;">قبل أن نبدأ الدرس</h1>
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:18px; max-width:900px; margin:0 auto 26px;">
      ${[['mic','افتح الميكروفون والكاميرا'],['net','تأكد أن الإنترنت يعمل بشكل جيد'],
         ['cam','اجلس في مكان هادئ ومريح'],['pen','جهّز الورقة والقلم']].map(([k,t])=>`
        <div class="card" style="display:flex; align-items:center; gap:16px; padding:18px 24px;">
          ${ICONS[k]}<span style="font-size:24px; font-weight:700; color:#3a4a63;">${t}</span>
        </div>`).join('')}
    </div>
    <button class="speaker" data-audio="a_t_soundcheck.mp3" data-toast="Sound check"></button>
    <div style="font-size:20px; color:#8a6d3b; margin-top:8px;">اضغط لاختبار الصوت</div>
  </div>`);

/* ---------- S2 · Lead-in: say hello to the teacher ---------- */
addScreen('Warm-up', `
  <div style="display:flex; align-items:center; gap:48px; width:100%; justify-content:center;">
    <div style="position:relative; width:400px; height:440px;">
      <img class="pic" src="${A}sec_teacher.png" style="width:100%; height:100%;">
    </div>
    <div style="max-width:520px;">
      <span class="source-badge">READY → GREET</span>
      <div class="card" style="position:relative; font-size:34px; font-weight:750; color:#17324d; line-height:1.35; margin-top:14px;">
        Bag away. Book ready.<br><span style="color:#ff735c;">Hello!</span>
        <span class="ar" style="font-size:20px; color:#6e7b8b; margin-top:8px;">جهّز نفسك ثم قل مرحبًا</span>
      </div>
      <div style="display:flex; gap:18px; margin-top:26px; align-items:center;">
        <button class="speaker" data-audio="a_t_leadin.mp3"></button>
        <button id="leadin-done" style="height:56px; padding:0 28px; border:none; border-radius:28px;
          background:#24a66a; color:#fff; font-size:20px; font-weight:750; cursor:pointer;
          box-shadow:0 3px 0 #187c50;">I greeted my teacher</button>
      </div>
    </div>
  </div>`, el=>({
  onEnter(){
    el.querySelector('#leadin-done').onclick = ()=>{
      sfx('sfx_correct.mp3');
      setTimeout(()=>play('a_t_leadin_reply.mp3'), 350);
      toast('Great! You said hello!');
    };
  }
}));

/* ---------- S3 · promise page: goals + textbook badge ---------- */
addScreen('Today’s mission', `
  <div style="display:flex; gap:44px; align-items:center; width:100%; justify-content:center;">
    <div style="max-width:560px;">
      <span class="source-badge">WE CAN 1 · UNIT 1 · GOALS 01–02</span>
      <h1 style="font-size:40px; color:#17324d; margin:14px 0 6px;">Meet someone new</h1>
      <div style="font-size:19px; color:#6e7b8b; margin-bottom:18px;">By the end, you can ask and answer a name.</div>
      ${[['a_t_goal1.mp3','Say <b style="color:#ff8c42;">Hello</b> and <b style="color:#ff8c42;">Hi</b>','قُل: مرحبا'],
         ['a_t_goal2.mp3','Ask <b style="color:#2b6cb0;">"What\'s your name?"</b>','اسأل: ما اسمك؟'],
         ['a_t_goal3.mp3','Say <b style="color:#1f9d6c;">"My name\'s ___"</b>','قُل اسمك']].map(([au,en,ar])=>`
        <div class="card" style="display:flex; align-items:center; gap:14px; padding:12px 18px; margin-bottom:12px;">
          <button class="speaker small" data-audio="${au}"></button>
          <div><div style="font-size:23px; color:#2b3a55;">${en}</div>
          <div class="ar" style="font-size:17px; color:#7a8aa0;">${ar}</div></div>
        </div>`).join('')}
    </div>
    <div style="text-align:center;">
      <div style="position:relative; width:280px; margin:0 auto;">
        <img class="pic" src="${A}textbook_cover.png" style="width:100%; box-shadow:0 10px 26px rgba(0,0,0,.22); border-radius:10px;">
        <div style="position:absolute; top:-16px; right:-16px; background:#e8443a; color:#fff;
          font-weight:700; font-size:16px; padding:8px 14px; border-radius:20px; transform:rotate(6deg);
          box-shadow:0 4px 10px rgba(0,0,0,.25);">Unit 1</div>
      </div>
      <div style="margin-top:14px; font-size:19px; font-weight:700; color:#2b6cb0;">We Can 1 · Same as your school!</div>
      <div class="ar" style="font-size:16px; color:#7a8aa0; margin-top:4px;">نفس كتاب المدرسة</div>
    </div>
  </div>`);

/* ---------- word screen factory (S4-S6) ---------- */
function wordScreen(objective, img, word, cue, ar, sentence, auWord, auSentence, extra){
  return addScreen(objective, `
    <div style="display:flex; align-items:center; gap:56px; width:100%; justify-content:center;">
      <div style="width:400px; height:400px; position:relative;">
        <img class="pic" src="${A}${img}" style="width:100%; height:100%; box-shadow:0 8px 22px rgba(60,40,10,.15);">
        ${extra||''}
      </div>
      <div style="text-align:center; max-width:520px;">
        <div data-audio="${auWord}" style="cursor:pointer; font-size:64px; font-weight:700; color:#2b3a55;">${word}</div>
        <div style="font-size:15px; color:#1670e8; font-weight:800; margin:8px 0 6px; letter-spacing:1.2px;">${cue}</div>
        <div class="ar" style="font-size:24px; color:#1f9d6c; font-weight:700; margin-bottom:10px;">${ar}</div>
        <div class="card" style="display:inline-flex; align-items:center; gap:14px; padding:12px 22px; margin-top:10px;">
          <button class="speaker small" data-audio="${auSentence}"></button>
          <span style="font-size:26px; font-weight:700; color:#2b6cb0;">${sentence}</span>
        </div>
        <div style="margin-top:14px; font-size:17px; color:#6e7b8b;">Listen · Say it · Use the action</div>
      </div>
    </div>`);
}
wordScreen('Greeting 1', 'sec_hello_boy.png', 'Hello!', 'GREETING · WAVE', 'مرحبا', 'Hello, teacher!', 'a_t_hello.mp3', 'a_t_hello_sentence.mp3');
wordScreen('Greeting 2', 'sec_hi_girl.png', 'Hi!', 'GREETING · WAVE', 'أهلًا', 'Hi, Labeeb!', 'a_t_hi.mp3', 'a_t_hi_sentence.mp3',
  `<div style="position:absolute; bottom:-14px; left:50%; transform:translateX(-50%); background:#fff;
     border:2px solid #f0e2c8; border-radius:18px; padding:6px 16px; font-size:19px; font-weight:700; color:#8a6d3b;">
     hello = hi</div>`);
wordScreen('Name meaning', 'sec_nametag.png', 'name', 'WHO ARE YOU?', 'اِسم', "My name's Noura.", 'a_t_name.mp3', 'a_t_name_sentence.mp3',
  `<div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-58%); font-size:44px;
     font-weight:700; color:#2b6cb0; pointer-events:none;">Noura</div>`);

/* ---------- S7 · balloon listening game (tap only) ---------- */
addScreen('Listen for meaning', `
  <div id="balloon-field" style="position:relative; width:1180px; height:520px; border-radius:22px;
    overflow:hidden; background:url('${A}sec_bg_sky.png') center/cover;">
    <div style="position:absolute; top:14px; left:0; right:0; display:flex; justify-content:center; gap:26px; z-index:3;">
      <div class="card" style="padding:8px 20px; font-size:20px; font-weight:700; color:#2b6cb0;" id="bl-score">Score: 0</div>
      <button class="speaker small" id="bl-play" style="align-self:center;"></button>
      <div class="card" style="padding:8px 20px; font-size:20px; font-weight:700; color:#ff735c;" id="bl-left">Round: 1 / 4</div>
    </div>
    <div id="bl-hint" style="position:absolute; inset:0; display:none; align-items:center; justify-content:center;
      font-size:26px; font-weight:700; color:#2b6cb0; background:#ffffffb0; z-index:4; border-radius:22px;">
      Say the meaning, then tap the matching card.</div>
  </div>`, el=>{
  const words = [
    {w:'Greet', au:['a_t_hello.mp3','a_t_hi.mp3'], c:'#ff735c'},
    {w:'Ask a name', au:['a_t_d1_l3.mp3'], c:'#1670e8'},
    {w:'Say a name', au:['a_t_d1_l4.mp3','a_t_name_sentence.mp3'], c:'#24a66a'}
  ];
  let round=0, score=0, combo=0, target=null, timer=null, hintT=null;
  const field = el.querySelector('#bl-hint').parentElement;
  function clearBalloons(){ field.querySelectorAll('.bl-b').forEach(b=>b.remove()); }
  function nextRound(){
    clearTimeout(timer); clearTimeout(hintT); clearBalloons();
    if (round>=4){ el.querySelector('#bl-hint').style.display='flex';
      el.querySelector('#bl-hint').innerHTML = 'Great job! Score: '+score; sfx('sfx_success.mp3'); return; }
    round++; el.querySelector('#bl-left').textContent = 'Round: '+round+' / 4';
    const order=[0,1,2].sort(()=>Math.random()-.5);
    target = order[0];
    const pos=[150,500,850];
    order.forEach((wi,k)=>{
      const b=document.createElement('button');
      b.className='bl-b'; b.textContent=words[wi].w;
      b.style.cssText=`position:absolute; left:${pos[k]}px; top:120px; width:180px; height:220px;
        border:none; cursor:pointer; border-radius:28px; font-size:25px; font-weight:800; color:#fff;
        background:${words[wi].c}; box-shadow:0 14px 28px rgba(23,50,77,.18);
        animation:blFloat 2.6s ease-in-out ${k*.4}s infinite alternate; z-index:2;`;
      b.onclick=()=>{
        if (wi===target){ sfx('sfx_pop.mp3'); combo++; score+=10*combo;
          if(combo>1) sfx('sfx_combo.mp3');
          el.querySelector('#bl-score').textContent='Score: '+score;
          toast(combo>1 ? 'Combo x'+combo+'!' : 'Correct!'); nextRound(); playCurrent();
        } else { combo=0; sfx('sfx_wrong.mp3');
          b.style.animation='blShake .4s'; setTimeout(()=>b.style.animation='',420); toast('Try again!'); }
      };
      field.appendChild(b);
    });
    hintT=setTimeout(()=>{ toast('Tap the balloon!'); }, 3000);
  }
  function playCurrent(){ if(target!==null && round<=4){ const set=words[target].au; play(set[Math.floor(Math.random()*set.length)]); } }
  el.querySelector('#bl-play').onclick=playCurrent;
  return {
    onEnter(){ round=0; score=0; combo=0;
      el.querySelector('#bl-score').textContent='Score: 0';
      el.querySelector('#bl-hint').style.display='none';
      setTimeout(()=>{ nextRound(); playCurrent(); }, 300); },
    onLeave(){ clearTimeout(timer); clearTimeout(hintT); clearBalloons(); }
  };
});

/* ---------- dialogue input factory (S8 / S10) ---------- */
function dialogueInput(objective, img, lines, audios, extra){
  return addScreen(objective, `
    <div style="display:flex; gap:36px; width:100%; align-items:center; justify-content:center;">
      <div style="width:560px; max-height:430px; display:flex; align-items:center;"><img class="pic" src="${A}${img}" style="width:100%; box-shadow:0 8px 22px rgba(60,40,10,.15);"></div>
      <div style="width:520px;">
        <div class="dg-lines" style="min-height:300px;"></div>
        <div style="display:flex; gap:14px; margin-top:14px; align-items:center;">
          <button class="dg-reveal" style="height:48px; padding:0 24px; border:none; border-radius:24px;
            background:#2b6cb0; color:#fff; font-size:19px; font-weight:700; cursor:pointer;
            box-shadow:0 3px 0 #1d4e82;">Reveal next line</button>
          ${extra||''}
        </div>
      </div>
    </div>`, el=>{
    const host = el.querySelector('.dg-lines');
    let n = 0;
    function render(){
      host.innerHTML = (n===0 ? `<div style="display:flex; align-items:center; justify-content:center;
          height:280px; font-size:22px; font-weight:700; color:#b9a577; text-align:center;">
          Tap "Reveal next line" to start the talk</div>` : '')
        + lines.slice(0,n).map((t,k)=>`
        <div class="card" style="display:flex; align-items:center; gap:12px; padding:10px 16px; margin-bottom:10px;
          ${k%2? 'margin-left:60px; background:#eef6ff;' : 'margin-right:60px;'}">
          <button class="speaker small" data-audio="${audios[k]}"></button>
          <span style="font-size:24px; font-weight:700; color:#2b3a55;">${t}</span>
        </div>`).join('');
      el.querySelector('.dg-reveal').style.visibility = n>=lines.length ? 'hidden':'visible';
    }
    el.querySelector('.dg-reveal').onclick=()=>{
      if (n<lines.length){ play(audios[n]); n++; render(); }
    };
    return { onEnter(){ n=0; render(); } };
  });
}
dialogueInput('dialogue 1 input', 'sec_dialog1.png',
  ['Hello.','Hi.',"What's your name?","My name's Labeeba."],
  ['a_t_d1_l1.mp3','a_t_d1_l2.mp3','a_t_d1_l3.mp3','a_t_d1_l4.mp3'],
  `<button class="pill blue" data-audio="a_official_cd1_03_04.mp3">Official CD1 03–04</button>`);

/* ---------- dialogue practice factory (S9 / S11) ---------- */
function dialoguePractice(objective, lines, audios, note){
  return addScreen(objective, `
    <div style="width:100%; max-width:880px;">
      <div style="text-align:center; font-size:22px; font-weight:700; color:#8a6d3b; margin-bottom:16px;">
        Listen once, then say it without reading. ${note||''}
        <div class="ar" style="font-size:17px; color:#7a8aa0;">استمع ثم قلها دون قراءة</div>
      </div>
      <div class="dp-cards"></div>
    </div>`, el=>{
    const host = el.querySelector('.dp-cards');
    let counts=[];
    function render(){
      host.innerHTML = lines.map((t,k)=>`
        <div class="card dp-c" data-k="${k}" style="display:flex; align-items:center; gap:16px; padding:14px 22px;
          margin-bottom:12px; cursor:pointer; transition:background .3s;
          ${counts[k]>=1 ? 'background:#e8f8f0; border:2px solid #24a66a;' : ''}">
          <button class="speaker small" data-audio="${audios[k]}"></button>
          <span style="font-size:27px; font-weight:700; color:#2b3a55; flex:1;">${t}</span>
          <span style="font-size:20px; font-weight:700; color:${counts[k]>=1?'#24a66a':'#9aa7b4'};">
            ${counts[k]>=1 ? 'Ready' : 'Listen'}</span>
        </div>`).join('');
      host.querySelectorAll('.dp-c').forEach(c=>{
        c.onclick=e=>{
          if (e.target.closest('.speaker')) return;
          const k=+c.dataset.k;
          play(audios[k], ()=>{ counts[k]=1; render();
            if (counts.every(x=>x>=1)){ sfx('sfx_success.mp3'); toast('Now say the talk without reading.'); } });
        };
      });
    }
    return { onEnter(){ counts=lines.map(()=>0); render(); } };
  });
}
dialoguePractice('dialogue 1 repeat', ['Hello.','Hi.',"What's your name?","My name's Labeeba."],
  ['a_t_d1_l1.mp3','a_t_d1_l2.mp3','a_t_d1_l3.mp3','a_t_d1_l4.mp3']);
dialogueInput('dialogue 2 input — with actions', 'sec_dialog2.png',
  ['Hello.','Hi.',"What's your name?","My name's Labeeb."],
  ['a_t_d2_l1.mp3','a_t_d2_l2.mp3','a_t_d2_l3.mp3','a_t_d2_l4.mp3'],
  `<span style="font-size:18px; font-weight:700; color:#8a6d3b;">Wave your hand! · Point to yourself!</span>
   <span class="ar" style="font-size:16px; color:#7a8aa0;">لوّح بيدك · أشِر إلى نفسك</span>`);
dialoguePractice('dialogue 2 repeat with actions', ['Hello.','Hi.',"What's your name?","My name's Labeeb."],
  ['a_t_d2_l1.mp3','a_t_d2_l2.mp3','a_t_d2_l3.mp3','a_t_d2_l4.mp3'],
  '· Wave and point while you speak!');

/* ---------- S12 · response mission (60s, combo) ---------- */
addScreen('Choose the reply', `
  <div id="whack-field" style="position:relative; width:1180px; height:520px; border-radius:22px;
    overflow:hidden; background:url('${A}sec_bg_desert.png') center/cover;">
    <div style="position:absolute; top:12px; left:0; right:0; display:flex; justify-content:center; gap:22px; z-index:5;">
      <div class="card" id="wk-score" style="padding:8px 18px; font-size:20px; font-weight:700; color:#2b6cb0;">Score: 0</div>
      <div class="card" id="wk-combo" style="padding:8px 18px; font-size:20px; font-weight:700; color:#e8443a;">Combo x0</div>
      <div class="card" id="wk-time" style="padding:8px 18px; font-size:20px; font-weight:700; color:#1f9d6c;">60s</div>
    </div>
    <div id="wk-start" style="position:absolute; inset:0; z-index:6; display:flex; flex-direction:column;
      align-items:center; justify-content:center; background:#ffffffc8; border-radius:22px;">
      <div style="font-size:30px; font-weight:750; color:#17324d; margin-bottom:8px;">What should you say?</div>
      <div style="font-size:20px; color:#6e7b8b; margin-bottom:20px;">Listen · say the reply · tap the matching card</div>
      <div class="ar" style="font-size:17px; color:#6e7b8b; margin-bottom:18px;">استمع ثم قل الرد واختر البطاقة المناسبة</div>
      <button id="wk-go" style="height:60px; padding:0 44px; border:none; border-radius:30px; background:#ff8c42;
        color:#fff; font-size:24px; font-weight:700; cursor:pointer; box-shadow:0 4px 0 #d96f2a;">Start!</button>
    </div>
    <div id="wk-end" style="position:absolute; inset:0; z-index:6; display:none; flex-direction:column;
      align-items:center; justify-content:center; background:#ffffffc8; border-radius:22px;"></div>
  </div>
  <style>
    @keyframes blFloat { from{transform:translateY(0)} to{transform:translateY(-26px)} }
    @keyframes blShake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-10px)} 75%{transform:translateX(10px)} }
    @keyframes wkPop { from{transform:translate(-50%,100%)} to{transform:translate(-50%,0)} }
  </style>`, el=>{
  const field = el.querySelector('#whack-field');
  const friends = [
    {img:'sec_char_wolf.png',  reply:'Hi!', lines:['a_t_d1_l1.mp3','a_t_d2_l1.mp3'], x:167},
    {img:'sec_char_cat.png',   reply:"My name’s Ali.", lines:['a_t_d1_l3.mp3','a_t_d2_l3.mp3'], x:512},
    {img:'sec_char_noura.png', reply:'Hello!', lines:['a_t_d1_l2.mp3','a_t_d2_l2.mp3'], x:872}
  ];
  let score=0, combo=0, left=60, active=null, tick=null, popT=null, hintT=null, running=false;
  const holes=[];
  friends.forEach((f,k)=>{
    const wrap=document.createElement('div');
    wrap.style.cssText=`position:absolute; left:${f.x}px; bottom:38px; width:190px; height:280px; z-index:2; pointer-events:none;`;
    wrap.innerHTML=`
      <div style="position:absolute; inset:0; overflow:hidden;">
        <img src="${A}${f.img}" style="position:absolute; bottom:0; left:50%; width:170px; height:220px;
          object-fit:contain; transform:translate(-50%,110%); transition:transform .16s ease-out;
          pointer-events:auto; cursor:pointer;">
      </div>
      <div style="position:absolute; bottom:-2px; left:8px; right:8px; background:#fff; border:2px solid #e5edf2;
        border-radius:18px; padding:8px; text-align:center; font-size:18px; font-weight:800; color:#17324d;">${f.reply}</div>`;
    field.appendChild(wrap);
    const img=wrap.querySelector('img');
    img.onclick=()=>{
      if (!running || active===null) return;
      if (k===active){ sfx('sfx_hit.mp3'); combo++; score+=10*combo;
        if (combo>1){ sfx('sfx_combo.mp3'); }
        toast(combo>1?'Combo x'+combo+' — say it!':'Correct — say the reply!');
        img.style.transform='translate(-50%,110%)'; active=null;
        clearTimeout(popT); clearTimeout(hintT); update(); popT=setTimeout(pop, 420);
      } else { combo=0; sfx('sfx_wrong.mp3'); toast('Listen to the intent again.'); update(); }
    };
    holes.push(img);
  });
  function update(){
    el.querySelector('#wk-score').textContent='Score: '+score;
    el.querySelector('#wk-combo').textContent='Combo x'+combo;
    el.querySelector('#wk-time').textContent=left+'s';
  }
  function pop(){
    if (!running) return;
    active=Math.floor(Math.random()*3);
    holes.forEach(h=>h.style.transform='translate(-50%,110%)');
    holes[active].style.transform='translate(-50%,0)';
    const f=friends[active];
    play(f.lines[Math.floor(Math.random()*f.lines.length)]);
    hintT=setTimeout(()=>{ toast('Say the reply before you tap.'); },3000);
    popT=setTimeout(pop, Math.max(1400, 2600 - (60-left)*22));
  }
  el.querySelector('#wk-go').onclick=()=>{
    el.querySelector('#wk-start').style.display='none';
    running=true; score=0; combo=0; left=60; update(); pop();
    tick=setInterval(()=>{
      left--; update();
      if (left<=0){
        clearInterval(tick); clearTimeout(popT); clearTimeout(hintT); running=false;
        holes.forEach(h=>h.style.transform='translate(-50%,110%)');
        sfx('sfx_success.mp3');
        const end=el.querySelector('#wk-end');
        end.style.display='flex';
        end.innerHTML=`<div style="font-size:34px; font-weight:700; color:#2b3a55;">Time's up!</div>
          <div style="font-size:26px; font-weight:700; color:#ff8c42; margin:10px 0;">Score: ${score}</div>
          <button id="wk-again" style="height:52px; padding:0 36px; border:none; border-radius:26px;
            background:#2b6cb0; color:#fff; font-size:20px; font-weight:700; cursor:pointer;">Play again</button>`;
        end.querySelector('#wk-again').onclick=()=>{ end.style.display='none';
          el.querySelector('#wk-start').style.display='flex'; };
      }
    },1000);
  };
  return { onEnter(){ if (new URLSearchParams(location.search).get('play')) setTimeout(()=>el.querySelector('#wk-go').click(), 200); },
    onLeave(){ clearInterval(tick); clearTimeout(popT); clearTimeout(hintT); running=false; } };
});

/* ---------- S13 · Check 1: real exchange, no sentence frame ---------- */
addScreen('Check 1 · Real talk', `
  <div style="display:grid; grid-template-columns:430px 1fr; gap:54px; align-items:center; width:100%; max-width:1080px;">
    <div class="card" style="height:430px; display:flex; align-items:center; justify-content:center;">
      <img src="${A}sec_char_wolf.png" style="width:330px; height:360px; object-fit:contain;" alt="new character">
    </div>
    <div>
      <span class="source-badge">CHECK 1 · NO HELP</span>
      <h1 style="font-size:42px; color:#17324d; margin:16px 0 8px;">Meet someone new</h1>
      <p style="font-size:22px; color:#6e7b8b; line-height:1.5;">Listen. Answer with your real name. Then ask back.</p>
      <div style="display:flex; align-items:center; gap:18px; margin-top:28px;">
        <button class="speaker" data-audio="a_t_d1_l3.mp3" data-toast="Listen — answer — ask back"></button>
        <div class="card" style="display:flex; gap:18px; padding:14px 20px; font-size:18px; font-weight:800; color:#17324d;">
          <span>1 · Listen</span><span>2 · Answer</span><span>3 · Ask back</span>
        </div>
      </div>
    </div>
  </div>
  <div class="teacher-only" style="position:absolute; left:44px; right:44px; bottom:16px; gap:8px; align-items:center; justify-content:center;">
    <span class="pill" style="background:#17324d;color:#fff;">Error:</span>
    <button class="pill error-tag" data-error="repeat">Repeats question</button>
    <button class="pill error-tag" data-error="name-only">Name only</button>
    <button class="pill error-tag" data-error="form">Wrong form</button>
    <button class="pill error-tag" data-error="silent">Silent after text hides</button>
    <button class="pill rate-tag green" data-rate="A">A</button>
    <button class="pill rate-tag" data-rate="B" style="background:#ffc84a;color:#17324d;">B</button>
    <button class="pill rate-tag coral" data-rate="C">C</button>
  </div>`, el=>{
  el.querySelectorAll('.error-tag').forEach(b=>b.onclick=()=>{
    assessment.errors.add(b.dataset.error); b.style.background='#ffc84a'; b.style.color='#17324d';
  });
  el.querySelectorAll('.rate-tag').forEach(b=>b.onclick=()=>{
    assessment.check1=b.dataset.rate; sfx('sfx_correct.mp3'); toast('Check 1 recorded: '+b.dataset.rate);
  });
  return { onEnter(){ assessment.check1=null; assessment.check2=null; assessment.errors.clear();
    el.querySelectorAll('.error-tag').forEach(b=>{b.style.background='';b.style.color='';}); } };
});

/* ---------- S14 · fixed repair path + Check 2 ---------- */
addScreen('Repair · Check 2', `
  <div style="display:grid; grid-template-columns:410px 1fr; gap:48px; align-items:center; width:100%; max-width:1080px;">
    <div class="card" style="height:420px; display:flex; align-items:center; justify-content:center;">
      <img src="${A}sec_char_cat.png" style="width:320px; height:350px; object-fit:contain;" alt="second new character">
    </div>
    <div>
      <span class="source-badge">HELP FADES → CHECK 2</span>
      <h1 style="font-size:40px; color:#17324d; margin:14px 0 12px;">Try with a new person</h1>
      <div id="repair-view" class="card" style="min-height:170px; display:flex; align-items:center; justify-content:center;
        text-align:center; font-size:27px; font-weight:800; color:#17324d; line-height:1.5;">
        <button class="speaker" data-audio="a_t_d2_l3.mp3"></button>
      </div>
    </div>
  </div>
  <div class="teacher-only" style="position:absolute; left:30px; right:30px; bottom:12px; gap:6px; align-items:center; justify-content:center; flex-wrap:wrap;">
    ${['Meaning','Slow','Contrast','Model','Build','Hide help','Try again'].map((t,i)=>`<button class="pill repair-step" data-step="${i}" style="background:#eaf4ff;color:#1670e8;">${i+1}. ${t}</button>`).join('')}
    <button class="pill check2-rate green" data-rate="A">A</button>
    <button class="pill check2-rate" data-rate="B" style="background:#ffc84a;color:#17324d;">B</button>
    <button class="pill check2-rate coral" data-rate="C">C</button>
  </div>`, el=>{
  const view=el.querySelector('#repair-view');
  let nextStep=0;
  const steps=[
    ()=>{ view.innerHTML='<div><div style="font-size:54px;">?</div><div class="ar" style="display:block;color:#24a66a;">ما اسمك؟</div></div>'; },
    ()=>{ view.innerHTML='<div>Listen slowly. Then point to yourself.</div>'; playSlow('a_t_d1_l3.mp3'); },
    ()=>{ view.innerHTML='<div style="display:flex;gap:18px;"><span class="card" style="color:#1670e8;">What’s your name?</span><span class="card" style="color:#ff735c;">My name’s …</span></div>'; },
    ()=>{ view.innerHTML='<div>Hello! <span style="color:#1670e8;">My name’s Noura.</span><br><span style="color:#ff735c;">What’s your name?</span></div>'; play('a_t_challenge.mp3'); },
    ()=>{ view.innerHTML='<div style="display:flex;gap:12px;"><span class="pill blue">My</span><span class="pill blue">name’s</span><span class="pill blue">your name</span></div>'; },
    ()=>{ view.innerHTML='<div style="font-size:22px;color:#6e7b8b;">Look at the new person. No words now.</div>'; },
    ()=>{ view.innerHTML='<button class="speaker" data-audio="a_t_d2_l3.mp3"></button>'; play('a_t_d2_l3.mp3'); toast('Check 2 — answer and ask back.'); }
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
  return { onEnter(){ nextStep=0; view.innerHTML='<button class="speaker" data-audio="a_t_d2_l3.mp3"></button>';
    el.querySelectorAll('.repair-step').forEach(b=>{b.style.background='#eaf4ff';b.style.color='#1670e8';}); } };
});

/* ---------- S15 · exam interface (real-exam Q&A formats) ---------- */
addScreen('School practice', `
  <div style="display:flex; gap:40px; width:100%; justify-content:center;">
    <div style="width:520px;">
      <div style="font-size:22px; font-weight:700; color:#2b3a55; margin-bottom:4px; text-align:center;">1 · Listen and choose</div>
      <div class="ar" style="font-size:16px; color:#7a8aa0; text-align:center; margin-bottom:10px;">استمع واختر الإجابة</div>
      <div style="text-align:center; margin-bottom:12px;">
        <button class="speaker" id="ex-q"></button>
        <span class="card" style="display:inline-block; padding:8px 16px; font-size:19px; color:#8a6d3b; margin-left:12px;" id="ex-round">1 / 2</span>
      </div>
      <div id="ex-opts"></div>
    </div>
    <div style="width:520px;">
      <div style="font-size:22px; font-weight:700; color:#2b3a55; margin-bottom:4px; text-align:center;">2 · Match the pairs</div>
      <div class="ar" style="font-size:16px; color:#7a8aa0; text-align:center; margin-bottom:10px;">صِل السؤال بالإجابة</div>
      <div style="display:flex; gap:24px;" id="ex-match">
        <div id="ex-qs" style="flex:1;"></div>
        <div id="ex-as" style="flex:1;"></div>
      </div>
      <div style="font-size:15px; color:#a08c5b; text-align:center; margin-top:8px;">Tap a question, then tap its answer</div>
    </div>
  </div>`, el=>{
  /* part 1: listen & choose, 2 rounds */
  const rounds=[
    {q:'a_t_d1_l3.mp3', opts:[["My name's Noura.",1],["Hello!",0]]},
    {q:'a_t_d1_l3.mp3', opts:[["Hello!",0],["My name's Labeeb.",1]]}
  ];
  let ri=0;
  function renderChoose(){
    el.querySelector('#ex-round').textContent=(ri+1)+' / 2';
    const opts=[...rounds[ri].opts].sort(()=>Math.random()-.5);
    el.querySelector('#ex-opts').innerHTML=opts.map(([t,ok])=>`
      <div class="card ex-o" data-ok="${ok}" style="padding:14px 20px; margin-bottom:12px; cursor:pointer;
        font-size:23px; font-weight:700; color:#2b3a55; text-align:center;">${t}</div>`).join('');
    el.querySelectorAll('.ex-o').forEach(o=> o.onclick=()=>{
      if (o.dataset.ok==='1'){ sfx('sfx_correct.mp3'); o.style.background='#d9f2e5'; o.style.border='2px solid #1f9d6c';
        setTimeout(()=>{ if(ri<1){ ri++; renderChoose(); playQ(); } else toast('Listening part done!'); },700);
      } else { sfx('sfx_wrong.mp3'); toast('Listen again!'); playQ(); }
    });
  }
  function playQ(){ play(rounds[ri].q, ); }
  el.querySelector('#ex-q').onclick=playQ;
  /* part 2: tap-tap matching */
  const pairs=[["Hello.","Hi."],["What's your name?","My name's Noura."],["Hi.","Hello."]];
  let selQ=null, matched=0;
  function renderMatch(){
    matched=0; selQ=null;
    const qs=[...pairs].sort(()=>Math.random()-.5);
    const as=[...pairs].sort(()=>Math.random()-.5);
    el.querySelector('#ex-qs').innerHTML=qs.map(([q,a],k)=>`
      <div class="card ex-mq" data-a="${a}" style="padding:12px 16px; margin-bottom:12px; cursor:pointer;
        font-size:20px; font-weight:700; color:#2b6cb0; text-align:center;">${q}</div>`).join('');
    el.querySelector('#ex-as').innerHTML=as.map(([q,a])=>`
      <div class="card ex-ma" data-a="${a}" style="padding:12px 16px; margin-bottom:12px; cursor:pointer;
        font-size:20px; font-weight:700; color:#e8443a; text-align:center;">${a}</div>`).join('');
    el.querySelectorAll('.ex-mq').forEach(q=> q.onclick=()=>{
      el.querySelectorAll('.ex-mq').forEach(x=>x.style.border='none');
      q.style.border='2px solid #f6b93b'; selQ=q;
    });
    el.querySelectorAll('.ex-ma').forEach(a=> a.onclick=()=>{
      if(!selQ){ toast('Tap a question first!'); return; }
      if (selQ.dataset.a===a.dataset.a){
        sfx('sfx_correct.mp3'); matched++;
        selQ.style.cssText+=';opacity:.25;pointer-events:none;'; a.style.cssText+=';opacity:.25;pointer-events:none;';
        selQ=null;
        if(matched===3){ sfx('sfx_success.mp3'); toast('All matched — exam style nailed!'); }
      } else { sfx('sfx_wrong.mp3'); toast('Try another answer!'); }
    });
  }
  return { onEnter(){ ri=0; renderChoose(); renderMatch(); setTimeout(playQ,400); } };
});

/* ---------- S16 · evidence-based achievement ---------- */
addScreen('Learning record', `
  <div style="text-align:center;">
    <span class="source-badge">TODAY’S EVIDENCE</span>
    <h1 class="title" style="margin:12px 0 6px;">I can meet someone new</h1>
    <div class="ar" style="font-size:18px; color:#7a8aa0; margin-bottom:22px;">اليوم أستطيع أن أقول</div>
    <div style="display:flex; gap:30px; justify-content:center;">
      ${[['Greet','a_t_hello.mp3','#ff735c'],['Ask a name','a_t_d1_l3.mp3','#1670e8'],['Answer a name','a_t_name_sentence.mp3','#24a66a']]
        .map(([t,au,c],k)=>`
        <div class="badge" data-audio="${au}" style="cursor:pointer; width:280px; padding:26px 18px; border-radius:22px;
          background:#fff; box-shadow:0 6px 18px rgba(60,40,10,.12); border:3px solid ${c};">
          <div style="width:74px; height:74px; margin:0 auto 14px; border-radius:50%; background:${c};
            display:flex; align-items:center; justify-content:center;">
            <svg viewBox="0 0 24 24" width="40" height="40" fill="#fff"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>
          </div>
          <div style="font-size:24px; font-weight:700; color:#2b3a55;">${t}</div>
        </div>`).join('')}
    </div>
    <div id="ability-level" class="card" style="display:inline-flex; margin-top:22px; padding:10px 20px; font-size:19px; font-weight:800; color:#17324d;">Level: not recorded</div>
  </div>`, el=>({
  onEnter(){
    const level=assessment.check2 || assessment.check1 || 'Not recorded';
    const copy={A:'A · Independent',B:'B · With help, then independent',C:'C · Keep practising','Not recorded':'Not recorded'}[level];
    const colors={A:'#24a66a',B:'#ffc84a',C:'#ff735c','Not recorded':'#e5edf2'};
    const box=el.querySelector('#ability-level'); box.textContent='Level: '+copy; box.style.borderColor=colors[level];
    if(level!=='Not recorded') setTimeout(()=>sfx('sfx_success.mp3'),250);
  }
}));

/* ---------- S17 · exit quiz + homework ---------- */
addScreen('Exit task · Home review', `
  <div style="display:flex; gap:40px; width:100%; justify-content:center; align-items:stretch;">
    <div class="card" style="width:520px; padding:26px 30px; text-align:center;">
      <div style="font-size:26px; font-weight:750; color:#17324d; margin-bottom:6px;">One last real talk</div>
      <div class="ar" style="font-size:16px; color:#7a8aa0; margin-bottom:16px;">أجب بصوت عالٍ بدون مساعدة</div>
      <div style="display:flex; align-items:center; gap:14px; justify-content:center; margin-bottom:14px;">
        <img src="${A}sec_char_noura.png" style="width:170px;height:170px;object-fit:contain;" alt="new person">
        <button class="speaker" data-audio="a_t_d1_l3.mp3"></button>
      </div>
      <div id="exit-cue" style="min-height:42px; font-size:28px; font-weight:800; color:#ff735c;">Answer. Then ask back.</div>
      <button id="exit-help" class="pill" style="margin-top:16px;background:#eef6ff;color:#1670e8;">Help · first word only</button>
    </div>
    <div class="card" style="width:520px; padding:26px 30px; text-align:center;">
      <div style="font-size:26px; font-weight:700; color:#2b3a55; margin-bottom:6px;">Homework</div>
      <div class="ar" style="font-size:16px; color:#7a8aa0; margin-bottom:16px;">الواجب المنزلي</div>
      <div style="font-size:23px; font-weight:700; color:#8a6d3b; margin-bottom:14px;">Workbook · pages 63–64 · Trace and write</div>
      <div style="background:#fdf6ec; border:2px dashed #d9c9a3; border-radius:16px; padding:14px 18px;">
          <div style="font-size:40px; font-weight:750; color:#9aa7b4; letter-spacing:8px;">H e l l o</div>
        <div style="font-size:15px; color:#a08c5b; margin-top:4px;">Trace the word, then write your name</div>
      </div>
      <div style="display:flex; align-items:center; gap:16px; margin-top:14px; background:#fff; border:2px solid #e8d5b0; border-radius:16px; padding:10px 14px;">
        <img src="assets/sec_qr_review.png" alt="Review QR" style="width:118px; height:118px; border-radius:8px;">
        <div style="text-align:left;">
          <div style="font-size:19px; font-weight:700; color:#17324d; line-height:1.5; direction:rtl;">امسح الرمز وراجع الدرس في البيت</div>
          <div style="font-size:15px; color:#8a6d3b; margin-top:6px; font-weight:700;">Scan & review at home · earn your stars!</div>
        </div>
      </div>
    </div>
  </div>`, el=>{
  el.querySelector('#exit-help').onclick=()=>{ el.querySelector('#exit-cue').textContent='My …'; toast('Only the first word. Finish it yourself.'); };
  return { onEnter(){ el.querySelector('#exit-cue').textContent='Answer. Then ask back.'; } };
});

/* ---------- boot ---------- */
screens.forEach((s,k)=>{
  const b=document.createElement('button');
  b.textContent=(k+1)+' · '+s.objective.slice(0,10);
  b.onclick=()=>{ $('#thumbs').classList.remove('open'); show(k); };
  $('#thumbs').appendChild(b);
});
const query=new URLSearchParams(location.search);
const p0=parseInt(query.get('p')||'1',10);
if (query.get('ar')){ document.body.classList.add('ar-on'); $('#btn-ar').setAttribute('aria-pressed','true'); }
if (query.get('teacher')){ document.body.classList.add('teacher-on'); $('#btn-teacher').setAttribute('aria-pressed','true'); }
fit(); show(isNaN(p0)?0:p0-1);
