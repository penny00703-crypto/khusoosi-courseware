/* ================================================================
   We Can 1 · Unit 1 My Friends · L1 (25-min 1v1 paid lesson)
   17 screens · mastery checkpoint: read 4 dialogue lines aloud
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
function stopAudio(){ if(curAudio){ curAudio.pause(); curAudio.currentTime=0; curAudio=null; } }
let curSfx = null;
function sfx(src){ try{ if(curSfx){curSfx.pause();} curSfx = new Audio(A+src); curSfx.play().catch(()=>{});}catch(e){} }

/* ---------- toast ---------- */
let toastTimer = null;
function toast(msg){
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(()=>t.classList.remove('show'), 1800);
}

/* ---------- screen framework ---------- */
const screensHost = $('#screens');
const screens = [];   // {obj, objective, el, onEnter, onLeave}

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
  $('#objective').textContent = 'Objective · ' + screens[i].objective;
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
addScreen('warm-up = lesson preview', `
  <div style="display:flex; align-items:center; gap:48px; width:100%; justify-content:center;">
    <div style="position:relative; width:400px; height:440px;">
      <img class="pic" src="${A}sec_teacher.png" style="width:100%; height:100%;">
    </div>
    <div style="max-width:520px;">
      <div class="card" style="position:relative; font-size:30px; font-weight:700; color:#2b3a55; line-height:1.5;">
        Hello! I'm your teacher.<br>Say <span style="color:#ff8c42;">hello</span> to me!
        <span class="ar" style="font-size:20px; color:#7a8aa0; margin-top:8px;">قُل مرحبا للمعلمة!</span>
      </div>
      <div style="display:flex; gap:18px; margin-top:26px; align-items:center;">
        <button class="speaker" data-audio="a_t_leadin.mp3"></button>
        <button id="leadin-done" style="height:56px; padding:0 28px; border:none; border-radius:28px;
          background:#1f9d6c; color:#fff; font-size:20px; font-weight:700; cursor:pointer;
          box-shadow:0 3px 0 #157a52;">I said Hello!</button>
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
addScreen('learning contract', `
  <div style="display:flex; gap:44px; align-items:center; width:100%; justify-content:center;">
    <div style="max-width:560px;">
      <h1 style="font-size:34px; color:#2b3a55; margin-bottom:6px;">Today we learn from YOUR school book</h1>
      <div style="font-size:19px; color:#8a6d3b; margin-bottom:18px;">By the end of this lesson, you can:</div>
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
function wordScreen(objective, img, word, phon, ar, sentence, auWord, auSentence, extra){
  return addScreen(objective, `
    <div style="display:flex; align-items:center; gap:56px; width:100%; justify-content:center;">
      <div style="width:400px; height:400px; position:relative;">
        <img class="pic" src="${A}${img}" style="width:100%; height:100%; box-shadow:0 8px 22px rgba(60,40,10,.15);">
        ${extra||''}
      </div>
      <div style="text-align:center; max-width:520px;">
        <div data-audio="${auWord}" style="cursor:pointer; font-size:64px; font-weight:700; color:#2b3a55;">${word}</div>
        <div style="font-size:26px; color:#f6b93b; font-weight:700; margin:4px 0 6px;">${phon}</div>
        <div class="ar" style="font-size:24px; color:#1f9d6c; font-weight:700; margin-bottom:10px;">${ar}</div>
        <div class="card" style="display:inline-flex; align-items:center; gap:14px; padding:12px 22px; margin-top:10px;">
          <button class="speaker small" data-audio="${auSentence}"></button>
          <span style="font-size:26px; font-weight:700; color:#2b6cb0;">${sentence}</span>
        </div>
        <div style="margin-top:14px; font-size:17px; color:#a08c5b;">Tap the word · Listen · Repeat 2 times</div>
      </div>
    </div>`);
}
wordScreen('learn "hello"', 'sec_hello_boy.png', 'hello', '/həˈləʊ/', 'مرحبا', 'Hello, teacher!', 'a_t_hello.mp3', 'a_t_hello_sentence.mp3');
wordScreen('learn "hi"', 'sec_hi_girl.png', 'hi', '/haɪ/', 'هاي', 'Hi, Labeeb!', 'a_t_hi.mp3', 'a_t_hi_sentence.mp3',
  `<div style="position:absolute; bottom:-14px; left:50%; transform:translateX(-50%); background:#fff;
     border:2px solid #f0e2c8; border-radius:18px; padding:6px 16px; font-size:19px; font-weight:700; color:#8a6d3b;">
     hello = hi</div>`);
wordScreen('learn "name"', 'sec_nametag.png', 'name', '/neɪm/', 'اِسم', "My name's Noura.", 'a_t_name.mp3', 'a_t_name_sentence.mp3',
  `<div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-58%); font-size:44px;
     font-weight:700; color:#2b6cb0; pointer-events:none;">Noura</div>`);

/* ---------- S7 · balloon listening game (tap only) ---------- */
addScreen('word practice — listen & pop', `
  <div id="balloon-field" style="position:relative; width:1180px; height:520px; border-radius:22px;
    overflow:hidden; background:url('${A}sec_bg_sky.png') center/cover;">
    <div style="position:absolute; top:14px; left:0; right:0; display:flex; justify-content:center; gap:26px; z-index:3;">
      <div class="card" style="padding:8px 20px; font-size:20px; font-weight:700; color:#2b6cb0;" id="bl-score">Score: 0</div>
      <button class="speaker small" id="bl-play" style="align-self:center;"></button>
      <div class="card" style="padding:8px 20px; font-size:20px; font-weight:700; color:#e8443a;" id="bl-left">Round: 1 / 8</div>
    </div>
    <div id="bl-hint" style="position:absolute; inset:0; display:none; align-items:center; justify-content:center;
      font-size:26px; font-weight:700; color:#2b6cb0; background:#ffffffb0; z-index:4; border-radius:22px;">
      Tap the balloon with the word you hear!</div>
  </div>`, el=>{
  const words = [
    {w:'hello', au:'a_t_hello.mp3', c:'#ff8c42'},
    {w:'hi',    au:'a_t_hi.mp3',    c:'#2b6cb0'},
    {w:'name',  au:'a_t_name.mp3',  c:'#1f9d6c'}
  ];
  let round=0, score=0, combo=0, target=null, timer=null, hintT=null;
  const field = el.querySelector('#bl-hint').parentElement;
  function clearBalloons(){ field.querySelectorAll('.bl-b').forEach(b=>b.remove()); }
  function nextRound(){
    clearTimeout(timer); clearTimeout(hintT); clearBalloons();
    if (round>=8){ el.querySelector('#bl-hint').style.display='flex';
      el.querySelector('#bl-hint').innerHTML = 'Great job! Score: '+score; sfx('sfx_success.mp3'); return; }
    round++; el.querySelector('#bl-left').textContent = 'Round: '+round+' / 8';
    const order=[0,1,2].sort(()=>Math.random()-.5);
    target = order[0];
    const pos=[150,500,850];
    order.forEach((wi,k)=>{
      const b=document.createElement('button');
      b.className='bl-b'; b.textContent=words[wi].w;
      b.style.cssText=`position:absolute; left:${pos[k]}px; top:120px; width:180px; height:220px;
        border:none; cursor:pointer; border-radius:50% 50% 48% 48%; font-size:30px; font-weight:700; color:#fff;
        background:radial-gradient(circle at 35% 30%, #ffffff88, ${words[wi].c} 45%);
        box-shadow:0 8px 16px rgba(0,0,0,.18); animation:blFloat 2.6s ease-in-out ${k*.4}s infinite alternate; z-index:2;`;
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
  function playCurrent(){ if(target!==null && round<=8) play(words[target].au); }
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
  ['a_t_d1_l1.mp3','a_t_d1_l2.mp3','a_t_d1_l3.mp3','a_t_d1_l4.mp3']);

/* ---------- dialogue practice factory (S9 / S11) ---------- */
function dialoguePractice(objective, lines, audios, note){
  return addScreen(objective, `
    <div style="width:100%; max-width:880px;">
      <div style="text-align:center; font-size:22px; font-weight:700; color:#8a6d3b; margin-bottom:16px;">
        Listen and repeat 2 times — the card turns green! ${note||''}
        <div class="ar" style="font-size:17px; color:#7a8aa0;">استمع وكرر مرتين</div>
      </div>
      <div class="dp-cards"></div>
    </div>`, el=>{
    const host = el.querySelector('.dp-cards');
    let counts=[];
    function render(){
      host.innerHTML = lines.map((t,k)=>`
        <div class="card dp-c" data-k="${k}" style="display:flex; align-items:center; gap:16px; padding:14px 22px;
          margin-bottom:12px; cursor:pointer; transition:background .3s;
          ${counts[k]>=2 ? 'background:#d9f2e5; border:2px solid #1f9d6c;' : ''}">
          <button class="speaker small" data-audio="${audios[k]}"></button>
          <span style="font-size:27px; font-weight:700; color:#2b3a55; flex:1;">${t}</span>
          <span style="font-size:20px; font-weight:700; color:${counts[k]>=2?'#1f9d6c':'#c9b48a'};">
            ${counts[k]>=2 ? 'Done!' : counts[k]+' / 2'}</span>
        </div>`).join('');
      host.querySelectorAll('.dp-c').forEach(c=>{
        c.onclick=e=>{
          if (e.target.closest('.speaker')) return;
          const k=+c.dataset.k;
          play(audios[k], ()=>{ counts[k]=Math.min(2,counts[k]+1); render();
            if (counts.every(x=>x>=2)){ sfx('sfx_success.mp3'); toast('All lines green — great reading!'); } });
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
  '· Wave and point while you read!');

/* ---------- S12 · whack-a-friend main game (60s, combo) ---------- */
addScreen('main game — listen & tap', `
  <div id="whack-field" style="position:relative; width:1180px; height:520px; border-radius:22px;
    overflow:hidden; background:url('${A}sec_bg_desert.png') center/cover;">
    <div style="position:absolute; top:12px; left:0; right:0; display:flex; justify-content:center; gap:22px; z-index:5;">
      <div class="card" id="wk-score" style="padding:8px 18px; font-size:20px; font-weight:700; color:#2b6cb0;">Score: 0</div>
      <div class="card" id="wk-combo" style="padding:8px 18px; font-size:20px; font-weight:700; color:#e8443a;">Combo x0</div>
      <div class="card" id="wk-time" style="padding:8px 18px; font-size:20px; font-weight:700; color:#1f9d6c;">60s</div>
    </div>
    <div id="wk-start" style="position:absolute; inset:0; z-index:6; display:flex; flex-direction:column;
      align-items:center; justify-content:center; background:#ffffffc8; border-radius:22px;">
      <div style="font-size:30px; font-weight:700; color:#2b3a55; margin-bottom:8px;">Who is talking?</div>
      <div style="font-size:20px; color:#8a6d3b; margin-bottom:20px;">Listen — then tap the friend who said it!</div>
      <div class="ar" style="font-size:17px; color:#7a8aa0; margin-bottom:18px;">استمع ثم اضغط على الصديق الذي يتكلم</div>
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
    {img:'sec_char_wolf.png',  lines:['a_t_d2_l4.mp3','a_t_d2_l1.mp3'], x:167},
    {img:'sec_char_cat.png',   lines:['a_t_d1_l4.mp3','a_t_d1_l1.mp3'], x:512},
    {img:'sec_char_noura.png', lines:['a_t_name_sentence.mp3','a_t_hi_sentence.mp3'], x:872}
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
      </div>`;
    field.appendChild(wrap);
    const img=wrap.querySelector('img');
    img.onclick=()=>{
      if (!running || active===null) return;
      if (k===active){ sfx('sfx_hit.mp3'); combo++; score+=10*combo;
        if (combo>1){ sfx('sfx_combo.mp3'); }
        toast(combo>1?'Combo x'+combo+'!':'Got it!');
        img.style.transform='translate(-50%,110%)'; active=null;
        clearTimeout(popT); clearTimeout(hintT); update(); popT=setTimeout(pop, 420);
      } else { combo=0; sfx('sfx_wrong.mp3'); toast('Not this friend!'); update(); }
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
    hintT=setTimeout(()=>{ toast('Tap the friend who is talking!'); },3000);
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

/* ---------- S13 · mastery checkpoint (teacher-verified) ---------- */
addScreen('mastery checkpoint', `
  <div style="width:100%; max-width:860px;">
    <div style="text-align:center; margin-bottom:14px;">
      <span style="font-size:24px; font-weight:700; color:#2b3a55;">Read all 4 lines aloud — tap the check when you read it!</span>
      <div class="ar" style="font-size:17px; color:#7a8aa0;">اقرأ الجمل الأربع بصوت عالٍ</div>
    </div>
    <div class="mc-cards"></div>
    <div class="mc-pass" style="display:none; text-align:center; margin-top:10px; font-size:28px; font-weight:700; color:#1f9d6c;">
      You did it! Checkpoint passed!</div>
  </div>`, el=>{
  const lines=[['Hello.','a_t_d1_l1.mp3'],['Hi.','a_t_d1_l2.mp3'],
    ["What's your name?",'a_t_d1_l3.mp3'],["My name's ___.",'a_t_d1_l4.mp3']];
  let done=[];
  const host=el.querySelector('.mc-cards');
  function render(){
    host.innerHTML=lines.map(([t,au],k)=>`
      <div class="card" style="display:flex; align-items:center; gap:16px; padding:12px 22px; margin-bottom:10px;
        ${done[k]?'background:#d9f2e5; border:2px solid #1f9d6c;':''}">
        <button class="speaker small" data-audio="${au}"></button>
        <span style="font-size:28px; font-weight:700; color:#2b3a55; flex:1;">${t}</span>
        <button class="mc-ck" data-k="${k}" style="width:52px; height:52px; border-radius:50%; border:3px solid ${done[k]?'#1f9d6c':'#d9c9a3'};
          background:${done[k]?'#1f9d6c':'#fff'}; cursor:pointer;">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="${done[k]?'#fff':'#d9c9a3'}"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>
        </button>
      </div>`).join('');
    host.querySelectorAll('.mc-ck').forEach(b=> b.onclick=()=>{
      const k=+b.dataset.k; done[k]=!done[k];
      if(done[k]) sfx('sfx_correct.mp3');
      render();
      if (done.every(x=>x)){ el.querySelector('.mc-pass').style.display='block'; sfx('sfx_success.mp3'); }
      else el.querySelector('.mc-pass').style.display='none';
    });
  }
  return { onEnter(){ done=[false,false,false,false]; el.querySelector('.mc-pass').style.display='none'; render(); } };
});

/* ---------- S14 · Mini Challenge (scaffold fades) ---------- */
addScreen('mini challenge — real talk', `
  <div style="width:100%; max-width:900px; text-align:center;">
    <div style="font-size:26px; font-weight:700; color:#2b3a55; margin-bottom:4px;">Mini Challenge — talk to your teacher!</div>
    <div class="ar" style="font-size:17px; color:#7a8aa0; margin-bottom:14px;">تحدّث مع معلمتك باسمك الحقيقي</div>
    <div class="card" style="padding:22px 30px; text-align:left;">
      <div style="display:flex; align-items:center; gap:14px; margin-bottom:14px;">
        <button class="speaker small" data-audio="a_t_challenge.mp3"></button>
        <span style="font-size:27px; font-weight:700; color:#2b6cb0;">Teacher: Hello! What's your name?</span>
      </div>
      <div style="display:flex; align-items:center; gap:14px;">
        <div style="width:44px;"></div>
        <span id="ch-answer" style="font-size:27px; font-weight:700; color:#e8443a;"></span>
      </div>
    </div>
    <div style="display:flex; gap:16px; justify-content:center; margin-top:20px;">
      <button class="ch-r" data-r="0" style="height:50px; padding:0 26px; border:none; border-radius:25px;
        background:#f6b93b; color:#fff; font-size:19px; font-weight:700; cursor:pointer;">Round 1 · with help</button>
      <button class="ch-r" data-r="1" style="height:50px; padding:0 26px; border:none; border-radius:25px;
        background:#e8443a; color:#fff; font-size:19px; font-weight:700; cursor:pointer;">Round 2 · on your own!</button>
    </div>
  </div>`, el=>{
  const ans=el.querySelector('#ch-answer');
  el.querySelectorAll('.ch-r').forEach(b=> b.onclick=()=>{
    sfx('sfx_correct.mp3');
    ans.innerHTML = b.dataset.r==='0'
      ? 'You: Hi! My name\'s <u>&nbsp;your name&nbsp;</u> .'
      : 'You: _______ ! My _______ _______ !';
    play('a_t_challenge.mp3');
  });
  return { onEnter(){ ans.innerHTML='You: Hi! My name\'s <u>&nbsp;your name&nbsp;</u> .'; } };
});

/* ---------- S15 · exam interface (real-exam Q&A formats) ---------- */
addScreen('exam drill — Q&A match', `
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
    {q:'a_t_d1_l3.mp3', opts:[["My name's Noura.",1],["I'm fine, thank you.",0]]},
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
  const pairs=[["Hello.","Hi."],["What's your name?","My name's Noura."],["How are you?","I'm fine, thank you."]];
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

/* ---------- S16 · achievement summary ---------- */
addScreen('review & achievement', `
  <div style="text-align:center;">
    <h1 class="title" style="margin-bottom:6px;">Today I can say...</h1>
    <div class="ar" style="font-size:18px; color:#7a8aa0; margin-bottom:22px;">اليوم أستطيع أن أقول</div>
    <div style="display:flex; gap:30px; justify-content:center;">
      ${[['Hello!','a_t_hello.mp3','#ff8c42'],['What\'s your name?','a_t_d1_l3.mp3','#2b6cb0'],['My name\'s ___!','a_t_name_sentence.mp3','#1f9d6c']]
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
    <div style="margin-top:24px; font-size:19px; color:#8a6d3b;">Tap a badge to hear it again</div>
  </div>`, el=>({
  onEnter(){ setTimeout(()=>sfx('sfx_success.mp3'), 250); }
}));

/* ---------- S17 · exit quiz + homework ---------- */
addScreen('exit quiz & homework', `
  <div style="display:flex; gap:40px; width:100%; justify-content:center; align-items:stretch;">
    <div class="card" style="width:520px; padding:26px 30px; text-align:center;">
      <div style="font-size:26px; font-weight:700; color:#2b3a55; margin-bottom:6px;">Exit Quiz — say it to your teacher!</div>
      <div class="ar" style="font-size:16px; color:#7a8aa0; margin-bottom:16px;">أجب بصوت عالٍ بدون مساعدة</div>
      <div style="display:flex; align-items:center; gap:14px; justify-content:center; margin-bottom:14px;">
        <button class="speaker" data-audio="a_t_d1_l3.mp3"></button>
        <span style="font-size:28px; font-weight:700; color:#2b6cb0;">What's your name?</span>
      </div>
      <div style="font-size:30px; font-weight:700; color:#e8443a;">You: Hi! My name's _______ .</div>
    </div>
    <div class="card" style="width:520px; padding:26px 30px; text-align:center;">
      <div style="font-size:26px; font-weight:700; color:#2b3a55; margin-bottom:6px;">Homework</div>
      <div class="ar" style="font-size:16px; color:#7a8aa0; margin-bottom:16px;">الواجب المنزلي</div>
      <div style="font-size:23px; font-weight:700; color:#8a6d3b; margin-bottom:14px;">Workbook · pages 63–64 · Trace and write</div>
      <div style="background:#fdf6ec; border:2px dashed #d9c9a3; border-radius:16px; padding:18px;">
        <div style="font-size:52px; font-weight:700; color:#c9b48a; letter-spacing:8px;
          -webkit-text-stroke:1px #c9b48a; font-family:'Comic Sans MS',cursive;">H e l l o</div>
        <div style="font-size:17px; color:#a08c5b; margin-top:8px;">Trace the word, then write your name</div>
      </div>
    </div>
  </div>`);

/* ---------- boot ---------- */
screens.forEach((s,k)=>{
  const b=document.createElement('button');
  b.textContent=(k+1)+' · '+s.objective.slice(0,10);
  b.onclick=()=>{ $('#thumbs').classList.remove('open'); show(k); };
  $('#thumbs').appendChild(b);
});
const p0=parseInt(new URLSearchParams(location.search).get('p')||'1',10);
if (new URLSearchParams(location.search).get('ar')){ document.body.classList.add('ar-on'); $('#btn-ar').setAttribute('aria-pressed','true'); }
fit(); show(isNaN(p0)?0:p0-1);
