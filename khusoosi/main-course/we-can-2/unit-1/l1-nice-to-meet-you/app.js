/* ================================================================
   We Can 2 · Unit 1 Feelings · L1 (25-min 1v1 paid lesson)
   Nice to Meet You! · mastery checkpoint: five-turn first-meeting
   dialogue, fully from memory · secondary: ordinals first–fifth
   book=We Can 2 / unit=Unit 1 / lesson=L1 / lessonKey=wc2-u1-l1
   theme: textbook purple #7b5ea7 / deep #4a3a6e / amber #ffc84a
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

/* ---------- toast + assessment state ---------- */
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
  '<b>Set up:</b> Tap the sound-check speaker once — the button turns green when the sound plays through. Keep this under one minute.',
  '<b>Warm-up (2 min cap):</b> Two real rounds with the student on camera. Round 1 — ask "What\'s your name?", the student answers with their real name. Round 2 — "How are you?", accept any WC1 answer: "I\'m fine, thank you." is correct here. One round each; do not linger.',
  '<b>Outcome:</b> Point to the We Can 2 cover: same book as school. State the one goal — a simple first talk, five turns, no reading.',
  '<b>Input (1.5 min):</b> Play the full track once. Student listens and points to who is talking. Replay once if needed. Official CD1 03 audio is pending — the speaker plays a teacher-voice recording for now.',
  '<b>Turns 1–2 (2.5 min):</b> Reveal line by line; student repeats each twice. If "too" drops, show the contrast pair and build it back: nice → to meet → you, too.',
  '<b>Turns 3–5 (2.5 min):</b> Position B must say "I\'m great, thanks. And you?" If the student falls back to WC1 "I\'m fine, thank you.", contrast old vs new: "Last year: fine. This year: great!" Note: "I\'m fine." alone is NOT wrong — it is turn 5.',
  '<b>Stage habits:</b> Four habits for every talk: big smiles, gestures, strong voice, eye contact. Demo once, do not drill. These come back at every Exit task.',
  '<b>Ordinals (2.5 min):</b> I\'m first! … I\'m fifth! Student says each position. Understandable is enough — do not over-correct /θ/ (30 seconds max).',
  '<b>Greeting Line:</b> Point to a character — the student says their position BEFORE you tap. Then the student picks their own spot and says it.',
  '<b>Flash check:</b> Show the number card; the student says "I\'m ___!" before you reveal. Wrong answer → play the audio once and move on.',
  '<b>Elevator game (3.5 min):</b> With frames, student completes the full five-turn round for each new friend. If one turn breaks, rebuild only that turn. Pass = two clean rounds in a row.',
  '<b>Wrap-up:</b> Listen to each turn once, then the student says the whole talk without reading.',
  '<b>Check 1 (3 min):</b> No words, no Arabic. The wolf opens; the student completes the round from memory. Record the error type FIRST, then help. A = fully independent · B = one prompt · C = two or more breaks.',
  '<b>Repair (4 min):</b> Fixed seven steps — repair only the broken turn. Contrast step: "Last year: fine. This year: great!" Check 2 uses a different character.',
  '<b>School practice (2 min):</b> Student answers aloud BEFORE clicking. These items follow workbook formats and are pending verification against real exam papers.',
  '<b>Record:</b> Set A, B, or C from Check 1/2 evidence; never award badges for page completion.',
  '<b>Exit (1 min):</b> Tap a position — the student says "I\'m ___!" Help shows only "I\'m …". Then send the home-review link to the parent.'
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
  mic:'<svg viewBox="0 0 24 24" width="34" height="34" fill="#6a4fa3"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3zm6-3a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.94V22h2v-2.06A8 8 0 0 0 20 12h-2z"/></svg>',
  cam:'<svg viewBox="0 0 24 24" width="34" height="34" fill="#6a4fa3"><path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/></svg>',
  net:'<svg viewBox="0 0 24 24" width="34" height="34" fill="#6a4fa3"><path d="M12 21l3.5-4.5a5 5 0 0 0-7 0L12 21zm0-18C7.4 3 3.2 4.7 0 7.4l2 2.4A15.9 15.9 0 0 1 12 6c3.9 0 7.4 1.5 10 3.8l2-2.4C20.8 4.7 16.6 3 12 3zm0 6c-3 0-5.8 1.1-7.9 3l2 2.4A8.9 8.9 0 0 1 12 12c2.3 0 4.4.8 6 2.2l1.9-2.4A11.9 11.9 0 0 0 12 9z"/></svg>',
  pen:'<svg viewBox="0 0 24 24" width="34" height="34" fill="#6a4fa3"><path d="M3 17.2V21h3.8L17.9 9.9l-3.8-3.8L3 17.2zM20.7 7a1 1 0 0 0 0-1.4l-2.3-2.3a1 1 0 0 0-1.4 0l-1.8 1.8 3.8 3.8 1.7-1.9z"/></svg>'
};

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
      const au = new Audio(A + 'a_t_soundcheck.mp3');
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

/* ---------- S2 · warm-up: teacher ↔ student, two real rounds ---------- */
addScreen('Warm-up · say hello to me', `
  <div style="display:flex; align-items:center; gap:40px; width:100%; justify-content:center;">
    <div style="display:flex; flex-direction:column; align-items:center; gap:14px;">
      <img src="${A}sec_teacher.png" style="width:170px; height:170px; border-radius:50%; object-fit:cover;
        object-position:center 8%; border:6px solid #7b5ea7; box-shadow:0 10px 26px rgba(40,30,60,.25); background:#fff;">
      <span class="pill" style="background:#7b5ea7; color:#fff;">Teacher</span>
    </div>
    <div style="width:600px;">
      <span class="source-badge">WE CAN 1 → WE CAN 2</span>
      <div id="wu-rounds" style="margin-top:14px;">
        ${[
          ['a_t_askname.mp3','Hello! What\'s your name?','My name\'s ___.','أخبرني باسمك'],
          ['a_t_wc2_leadin.mp3','How are you?','I\'m fine, thank you.','كيف حالك؟']
        ].map(([au,q,a,ar],k)=>`
        <div class="card wu-round" data-k="${k}" style="padding:14px 20px; margin-bottom:14px; transition:all .25s;">
          <div style="display:flex; align-items:center; gap:12px;">
            <button class="speaker small" data-audio="${au}"></button>
            <span style="font-size:26px; font-weight:750; color:#3d3356;">${q}</span>
          </div>
          <div style="display:flex; align-items:center; gap:12px; margin-top:10px; padding-left:34px;">
            <span style="font-size:24px; font-weight:800; color:#b45309;">${a}</span>
            <button class="wu-done" data-k="${k}" style="height:42px; padding:0 18px; border:none; border-radius:21px;
              background:#f3eefb; color:#7b5ea7; font-size:16px; font-weight:800; cursor:pointer;">I said it!</button>
          </div>
          <div class="ar" style="font-size:16px; color:#7a8aa0; margin-top:6px;">${ar}</div>
        </div>`).join('')}
      </div>
      <div style="display:flex; align-items:center; gap:12px; margin-top:4px;">
        <button class="pill" data-audio="a_official_name.mp3" style="background:#4a3a6e; color:#fff; cursor:pointer; border:none;">♪ Hear the book's own talk · WC1 CD</button>
      </div>
    </div>
    <div style="display:flex; flex-direction:column; align-items:center; gap:14px;">
      <div style="width:170px; height:170px; border-radius:50%; background:#fff; border:6px dashed #f59e0b;
        display:flex; align-items:center; justify-content:center; font-size:34px; font-weight:800; color:#b45309;">YOU</div>
      <span class="pill" style="background:#ffc84a; color:#4a3a6e;">Student</span>
    </div>
  </div>`, el=>({
  onEnter(){
    el.querySelectorAll('.wu-done').forEach(b=> b.onclick=()=>{
      const k=+b.dataset.k;
      const card=el.querySelector('.wu-round[data-k="'+k+'"]');
      card.style.border='2px solid #24a66a';
      card.style.background='#e8f8f0';
      b.textContent='✓'; b.style.background='#24a66a'; b.style.color='#fff';
      sfx('sfx_correct.mp3');
      if (k===0) setTimeout(()=>play('a_t_myname.mp3'), 350);
      else setTimeout(()=>play('a_t_wc2_reply.mp3'), 350);
      if ([...el.querySelectorAll('.wu-done')].every(x=>x.textContent==='✓'))
        setTimeout(()=>toast('Great! You remember WC1!'), 600);
    });
  }
}));

/* ---------- S3 · promise page: goals + textbook badge ---------- */
addScreen('Today’s mission', `
  <div style="display:flex; gap:44px; align-items:center; width:100%; justify-content:center;">
    <div style="max-width:560px;">
      <span class="source-badge">WE CAN 2 · UNIT 1 · GOALS 01–02</span>
      <h1 style="font-size:40px; color:#3d3356; margin:14px 0 6px;">A simple first talk</h1>
      <div style="font-size:19px; color:#6e7b8b; margin-bottom:18px;">By the end, you can have a real first talk in English — five turns, no reading.</div>
      ${[['a_t_tt1.mp3','Say <b style="color:#f59e0b;">"It\'s nice to meet you"</b>','قُل: سعيد بلقائك'],
         ['a_t_tt4.mp3','Answer <b style="color:#6a4fa3;">"I\'m great, thanks"</b>','قُل: أنا بخير، شكرًا'],
         ['a_t_first.mp3','Say <b style="color:#1f9d6c;">"I\'m first!"</b> your line number','قُل رقمك في الصف']].map(([au,en,ar])=>`
        <div class="card" style="display:flex; align-items:center; gap:14px; padding:12px 18px; margin-bottom:12px;">
          <button class="speaker small" data-audio="${au}"></button>
          <div><div style="font-size:23px; color:#463a5e;">${en}</div>
          <div class="ar" style="font-size:17px; color:#7a8aa0;">${ar}</div></div>
        </div>`).join('')}
    </div>
    <div style="text-align:center;">
      <div style="position:relative; width:300px; margin:0 auto;">
        <img class="pic" src="${A}wc2_cover.png" style="width:100%; box-shadow:0 10px 26px rgba(0,0,0,.22); border-radius:10px;">
        <div style="position:absolute; top:-16px; right:-16px; background:#7b5ea7; color:#fff;
          font-weight:700; font-size:16px; padding:8px 14px; border-radius:20px; transform:rotate(6deg);
          box-shadow:0 4px 10px rgba(0,0,0,.25);">Unit 1</div>
      </div>
      <div style="margin-top:14px; font-size:19px; font-weight:700; color:#6a4fa3;">We Can 2 · Same as your school!</div>
      <div class="ar" style="font-size:16px; color:#7a8aa0; margin-top:4px;">نفس كتاب المدرسة</div>
    </div>
  </div>`);

/* ---------- S4 · full-track listening: two new friends ---------- */
addScreen('Listen · the book’s talk', `
  <div style="text-align:center; width:100%;">
    <span class="source-badge">TALK TIME · BOOK PAGES 10–11</span>
    <div style="display:flex; gap:26px; justify-content:center; margin-top:16px;">
      <div style="position:relative; width:430px;">
        <img class="pic" src="${A}wc2_talk_a.png" style="width:100%; box-shadow:0 8px 22px rgba(60,40,10,.15);">
        <div style="position:absolute; bottom:-12px; left:50%; transform:translateX(-50%); background:#fff;
          border:2px solid #f0e2c8; border-radius:16px; padding:4px 14px; font-size:16px; font-weight:800; color:#8a6d3b;">Turns 1–2</div>
      </div>
      <div style="position:relative; width:430px;">
        <img class="pic" src="${A}wc2_talk_b.png" style="width:100%; box-shadow:0 8px 22px rgba(60,40,10,.15);">
        <div style="position:absolute; bottom:-12px; left:50%; transform:translateX(-50%); background:#fff;
          border:2px solid #f0e2c8; border-radius:16px; padding:4px 14px; font-size:16px; font-weight:800; color:#8a6d3b;">Turns 3–5</div>
      </div>
    </div>
    <div style="display:flex; align-items:center; justify-content:center; gap:18px; margin-top:26px;">
      <button class="speaker" data-audio="a_t_tt_all.mp3" data-toast="Listen — who is talking?"></button>
      <div style="text-align:left;">
        <div style="font-size:24px; font-weight:750; color:#3d3356;">Listen. Point to who is talking.</div>
        <div class="ar" style="font-size:17px; color:#7a8aa0;">استمع وأشِر إلى المتحدث</div>
      </div>
    </div>
    <div class="teacher-only" style="margin-top:14px; justify-content:center;">
      <span class="pill" style="background:#fff3d6; color:#b45309; font-size:14px;">♪ Official audio pending · CD1 03 · teacher voice for now</span>
    </div>
  </div>`);

/* ---------- dialogue input factory (S5 / S6) ---------- */
function dialogueInput(objective, img, lines, audios, extra){
  return addScreen(objective, `
    <div style="display:flex; gap:36px; width:100%; align-items:center; justify-content:center;">
      <div style="width:540px; max-height:430px; display:flex; align-items:center;"><img class="pic" src="${A}${img}" style="width:100%; box-shadow:0 8px 22px rgba(60,40,10,.15);"></div>
      <div style="width:540px;">
        <div class="dg-lines" style="min-height:260px;"></div>
        <div style="display:flex; gap:14px; margin-top:14px; align-items:center; flex-wrap:wrap;">
          <button class="dg-reveal" style="height:48px; padding:0 24px; border:none; border-radius:24px;
            background:#6a4fa3; color:#fff; font-size:19px; font-weight:700; cursor:pointer;
            box-shadow:0 3px 0 #4a3a6e;">Reveal next line</button>
          ${extra||''}
        </div>
      </div>
    </div>`, el=>{
    const host = el.querySelector('.dg-lines');
    let n = 0;
    function render(){
      host.innerHTML = (n===0 ? `<div style="display:flex; align-items:center; justify-content:center;
          height:240px; font-size:22px; font-weight:700; color:#b9a577; text-align:center;">
          Tap "Reveal next line" to start the talk</div>` : '')
        + lines.slice(0,n).map((t,k)=>`
        <div class="card" style="display:flex; align-items:center; gap:12px; padding:10px 16px; margin-bottom:10px;
          ${k%2? 'margin-left:60px; background:#f3eefb;' : 'margin-right:60px;'}">
          <button class="speaker small" data-audio="${audios[k]}"></button>
          <span style="font-size:24px; font-weight:700; color:#463a5e;">${t}</span>
        </div>`).join('');
      el.querySelector('.dg-reveal').style.visibility = n>=lines.length ? 'hidden':'visible';
    }
    el.querySelector('.dg-reveal').onclick=()=>{
      if (n<lines.length){ play(audios[n]); n++; render(); }
    };
    return { onEnter(){ n=0; render(); } };
  });
}
dialogueInput('Turns 1–2 · nice to meet you', 'wc2_talk_a.png',
  ["Hi. It's nice to meet you.", "It's nice to meet you, <b style='color:#e8443a;'>too</b>."],
  ['a_t_tt1.mp3','a_t_tt2.mp3'],
  `<span style="font-size:18px; font-weight:700; color:#e8443a;">Don't drop "too"!</span>
   <span class="ar" style="font-size:16px; color:#7a8aa0;">too = أيضًا</span>`);
dialogueInput('Turns 3–5 · how are you', 'wc2_talk_b.png',
  ["Hi. How are you?", "I'm <b style='color:#1f9d6c;'>great</b>, thanks. And you?", "I'm fine."],
  ['a_t_tt3.mp3','a_t_tt4.mp3','a_t_tt5.mp3'],
  `<span style="font-size:18px; font-weight:700; color:#1f9d6c;">Upgrade: fine → GREAT!</span>
   <span class="ar" style="font-size:16px; color:#7a8aa0;">هذه السنة: great</span>`);

/* ---------- S7 · stage habits: four performance norms ---------- */
addScreen('Stage habits', `
  <div style="text-align:center; width:100%;">
    <span class="source-badge">EVERY TALK · EVERY TIME</span>
    <h1 style="font-size:38px; color:#3d3356; margin:12px 0 4px;">Talk like a star</h1>
    <div class="ar" style="font-size:18px; color:#7a8aa0; margin-bottom:20px;">تحدّث مثل النجوم</div>
    <div style="display:flex; gap:22px; justify-content:center;">
      ${[
        ['#ffc84a','Big smiles','ابتسامة كبيرة','<circle cx="32" cy="32" r="26" fill="#fff"/><circle cx="23" cy="26" r="4" fill="#3d3356"/><circle cx="41" cy="26" r="4" fill="#3d3356"/><path d="M20 38 Q32 50 44 38" stroke="#3d3356" stroke-width="4" fill="none" stroke-linecap="round"/>'],
        ['#7b5ea7','Gestures','حركات','<rect x="22" y="26" width="20" height="24" rx="9" fill="#fff"/><rect x="20" y="10" width="6" height="20" rx="3" fill="#fff"/><rect x="29" y="7" width="6" height="23" rx="3" fill="#fff"/><rect x="38" y="10" width="6" height="20" rx="3" fill="#fff"/><path d="M50 18 Q58 12 54 6" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>'],
        ['#f59e0b','Strong voice','صوت قوي','<path d="M12 26 L30 18 L30 46 L12 38 Z" fill="#fff"/><path d="M36 24 Q44 32 36 40" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M42 18 Q54 32 42 46" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>'],
        ['#24a66a','Eye contact','تواصل بالعيون','<ellipse cx="20" cy="32" rx="12" ry="9" fill="#fff"/><circle cx="20" cy="32" r="4.5" fill="#3d3356"/><ellipse cx="46" cy="32" rx="12" ry="9" fill="#fff"/><circle cx="46" cy="32" r="4.5" fill="#3d3356"/>']
      ].map(([c,en,ar,svg])=>`
        <div class="card" style="width:240px; padding:22px 14px; text-align:center;">
          <div style="width:92px; height:92px; margin:0 auto 14px; border-radius:50%; background:${c};
            display:flex; align-items:center; justify-content:center; box-shadow:0 8px 18px rgba(40,30,60,.16);">
            <svg viewBox="0 0 64 64" width="58" height="58">${svg}</svg>
          </div>
          <div style="font-size:22px; font-weight:800; color:#3d3356;">${en}</div>
          <div class="ar" style="font-size:16px; color:#7a8aa0; margin-top:4px;">${ar}</div>
        </div>`).join('')}
    </div>
  </div>`);

/* ---------- S8 · ordinal input: first–fifth ---------- */
addScreen('Ordinals · first to fifth', `
  <div style="display:flex; gap:36px; width:100%; align-items:center; justify-content:center;">
    <div style="width:470px; position:relative;">
      <img class="pic" src="${A}wc2_line.png" style="width:100%; box-shadow:0 8px 22px rgba(60,40,10,.15);">
      <div style="position:absolute; top:-12px; left:-12px; background:#6a4fa3; color:#fff; font-weight:800;
        font-size:15px; padding:6px 14px; border-radius:16px; box-shadow:0 4px 10px rgba(0,0,0,.2);">FUN TIME · Greeting Line</div>
    </div>
    <div style="width:560px;">
      <div style="display:flex; align-items:center; gap:14px; margin-bottom:14px;">
        <button class="speaker" data-audio="a_t_line.mp3" data-toast="First to fifth — listen all"></button>
        <div style="font-size:22px; font-weight:750; color:#3d3356;">Line up! Say your place.</div>
      </div>
      ${[['first','#f59e0b'],['second','#ec6f9c'],['third','#7b5ea7'],['fourth','#24a66a'],['fifth','#4a3a6e']].map(([w,c],k)=>`
        <div class="card" data-audio="a_t_${w}.mp3" style="display:flex; align-items:center; gap:16px; padding:9px 18px;
          margin-bottom:9px; cursor:pointer;">
          <span style="width:46px; height:46px; border-radius:50%; background:${c}; color:#fff; display:flex;
            align-items:center; justify-content:center; font-size:20px; font-weight:800;">${k+1}</span>
          <span style="font-size:27px; font-weight:800; color:#463a5e;">I'm <b style="color:${c};">${w}</b>!</span>
        </div>`).join('')}
    </div>
  </div>`);

/* ---------- S9 · Greeting Line practice: five friends in a row ---------- */
addScreen('Greeting Line practice', `
  <div style="text-align:center; width:100%;">
    <span class="source-badge">SAY IT BEFORE YOU TAP</span>
    <div style="font-size:24px; font-weight:750; color:#3d3356; margin:12px 0 4px;">Point → say the place → tap to check</div>
    <div class="ar" style="font-size:17px; color:#7a8aa0; margin-bottom:16px;">قُل رقم المكان ثم اضغط لتتأكد</div>
    <div style="display:flex; gap:18px; justify-content:center; align-items:flex-end;">
      ${[['sec_teacher.png','first','#f59e0b'],['sec_char_noura.png','second','#ec6f9c'],
         ['sec_char_cat.png','third','#7b5ea7'],['sec_char_wolf.png','fourth','#24a66a'],[null,'fifth','#4a3a6e']]
        .map(([img,w,c])=>`
        <div class="line-friend" data-audio="a_t_${w}.mp3" style="cursor:pointer; width:190px;">
          <div style="height:230px; display:flex; align-items:flex-end; justify-content:center;">
            ${img
              ? `<img src="${A}${img}" style="max-width:170px; max-height:230px; object-fit:contain;">`
              : `<div style="width:130px; height:130px; border-radius:50%; background:#fff;
                   border:4px dashed #4a3a6e; display:flex; align-items:center; justify-content:center;
                   font-size:30px; font-weight:800; color:#4a3a6e;">YOU</div>`}
          </div>
          <div style="margin-top:10px; background:${c}; color:#fff; font-size:21px; font-weight:800;
            padding:8px 0; border-radius:16px; box-shadow:0 3px 0 rgba(0,0,0,.18);">I'm ${w}!</div>
        </div>`).join('')}
    </div>
  </div>`);

/* ---------- S10 · ordinal flash check ---------- */
addScreen('Ordinal flash check', `
  <div style="text-align:center; width:100%;">
    <span class="source-badge">NO SOUND FIRST — YOU SAY IT</span>
    <div style="display:flex; gap:40px; justify-content:center; align-items:center; margin-top:18px;">
      <div class="card" style="width:340px; height:340px; display:flex; flex-direction:column; align-items:center; justify-content:center;">
        <div id="fc-num" style="font-size:130px; font-weight:800; color:#6a4fa3; line-height:1;">?</div>
        <div style="font-size:20px; color:#6e7b8b; margin-top:8px;">Where do you stand?</div>
      </div>
      <div style="width:380px;">
        <div id="fc-answer" class="card" style="min-height:110px; display:flex; align-items:center; justify-content:center;
          font-size:32px; font-weight:800; color:#3d3356;">Say it first!</div>
        <div style="display:flex; gap:14px; margin-top:18px; justify-content:center;">
          <button id="fc-reveal" style="height:52px; padding:0 30px; border:none; border-radius:26px;
            background:#f59e0b; color:#fff; font-size:20px; font-weight:750; cursor:pointer;
            box-shadow:0 3px 0 #b45309;">Reveal</button>
          <button id="fc-next" style="height:52px; padding:0 30px; border:none; border-radius:26px;
            background:#6a4fa3; color:#fff; font-size:20px; font-weight:750; cursor:pointer;
            box-shadow:0 3px 0 #4a3a6e;">Next card</button>
        </div>
        <div id="fc-round" class="card" style="display:inline-block; margin-top:16px; padding:6px 18px;
          font-size:17px; font-weight:800; color:#8a6d3b;">Card 1 / 5</div>
      </div>
    </div>
  </div>`, el=>{
  const ORD=['first','second','third','fourth','fifth'];
  let deck=[], di=0;
  function deal(){ deck=[0,1,2,3,4].sort(()=>Math.random()-.5); di=0; paint(); }
  function paint(){
    el.querySelector('#fc-num').textContent = di<5 ? (deck[di]+1) : '✓';
    el.querySelector('#fc-answer').textContent = di<5 ? 'Say it first!' : 'All five — great ears!';
    el.querySelector('#fc-round').textContent = di<5 ? ('Card '+(di+1)+' / 5') : 'Done!';
  }
  el.querySelector('#fc-reveal').onclick=()=>{
    if (di>=5) return;
    const w=ORD[deck[di]];
    el.querySelector('#fc-answer').innerHTML='I\'m <b style="color:#7b5ea7;">'+w+'</b>!';
    play('a_t_'+w+'.mp3');
  };
  el.querySelector('#fc-next').onclick=()=>{
    if (di<5){ di++; sfx('sfx_pop.mp3'); paint(); }
    else { deal(); }
  };
  return { onEnter(){ deal(); } };
});

/* ---------- S11 · New Friend Elevator: three full rounds ---------- */
addScreen('New Friend Elevator', `
  <div style="display:flex; gap:34px; width:100%; justify-content:center; align-items:stretch;">
    <div style="width:640px; display:flex; flex-direction:column;">
      <div style="display:flex; align-items:center; gap:16px; margin-bottom:12px;">
        <span class="source-badge">NEW FRIEND ELEVATOR</span>
        <span id="ev-round" class="card" style="padding:6px 16px; font-size:17px; font-weight:800; color:#f59e0b;">Friend 1 / 3</span>
      </div>
      <div style="display:flex; gap:20px; flex:1;">
        <div class="card" style="width:210px; display:flex; align-items:center; justify-content:center; padding:12px;">
          <img id="ev-friend" src="${A}sec_char_noura.png" style="max-width:180px; max-height:330px; object-fit:contain;">
        </div>
        <div id="ev-lines" style="flex:1;"></div>
      </div>
    </div>
    <div style="width:300px;">
      <div class="card" style="height:100%; min-height:440px; position:relative; overflow:hidden; padding:14px;
        background:linear-gradient(180deg,#e9e0f5,#d5c6ec);">
        <div style="text-align:center; font-size:18px; font-weight:800; color:#3d3356; margin-bottom:10px;">FRIENDS ABOARD</div>
        ${[3,2,1].map(f=>`
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
            <span style="width:38px; height:38px; border-radius:10px; background:#3d3356; color:#fff;
              display:flex; align-items:center; justify-content:center; font-size:17px; font-weight:800;">F${f}</span>
            <div id="ev-slot${f}" style="flex:1; height:56px; border-radius:12px; background:#ffffff90;
              border:2px dashed #b8a6d0; display:flex; align-items:center; justify-content:center;
              font-size:15px; font-weight:700; color:#7a8aa0;">waiting…</div>
          </div>`).join('')}
        <div id="ev-win" style="position:absolute; inset:0; display:none; flex-direction:column; align-items:center;
          justify-content:center; background:#fffffff0; z-index:5;">
          <div style="font-size:34px; font-weight:800; color:#3d3356;">All friends aboard!</div>
          <div style="font-size:20px; color:#24a66a; font-weight:750; margin-top:10px;">Three full talks — amazing!</div>
        </div>
      </div>
    </div>
  </div>`, el=>{
  const FRIENDS=[
    {img:'sec_char_noura.png', name:'Noura'},
    {img:'sec_char_cat.png',   name:'Labeeb'},
    {img:'sec_char_wolf.png',  name:'Wolf'}
  ];
  const LINES=[
    {t:"Hi. It's nice to meet you.",      au:'a_t_tt1.mp3', who:'friend'},
    {t:"It's nice to meet you, too.",     au:'a_t_tt2.mp3', who:'you'},
    {t:"Hi. How are you?",                au:'a_t_tt3.mp3', who:'friend'},
    {t:"I'm great, thanks. And you?",     au:'a_t_tt4.mp3', who:'you'},
    {t:"I'm fine.",                       au:'a_t_tt5.mp3', who:'friend'}
  ];
  let round=0, step=0;
  function render(){
    el.querySelector('#ev-round').textContent = 'Friend '+Math.min(round+1,3)+' / 3';
    el.querySelector('#ev-friend').src = A + FRIENDS[Math.min(round,2)].img;
    el.querySelector('#ev-lines').innerHTML = LINES.map((l,k)=>`
      <div class="card ev-line" data-k="${k}" style="display:flex; align-items:center; gap:10px; padding:8px 14px;
        margin-bottom:8px; cursor:pointer; transition:all .2s;
        ${k<step ? 'background:#e8f8f0; border:2px solid #24a66a; opacity:.75;' :
          k===step ? 'border:3px solid #f59e0b; box-shadow:0 8px 20px rgba(255,140,66,.25);' : 'opacity:.55;'}">
        <span style="min-width:64px; font-size:13px; font-weight:800; letter-spacing:.5px;
          color:${l.who==='friend'?'#7b5ea7':'#e8443a'};">${l.who==='friend'?'FRIEND':'YOU'}</span>
        <button class="speaker small" data-audio="${l.au}" style="width:38px;height:38px;background-size:20px;"></button>
        <span style="font-size:19px; font-weight:700; color:#463a5e; flex:1;">${l.t}</span>
        <span style="font-size:18px; font-weight:800; color:${k<step?'#24a66a':'#c4ccd4'};">${k<step?'✓':(k===step?'▶':'')}</span>
      </div>`).join('');
    el.querySelectorAll('.ev-line').forEach(c=> c.onclick=e=>{
      if (e.target.closest('.speaker')) return;   // speaker = listen only
      const k=+c.dataset.k;
      if (k!==step){ toast(k<step?'Already done!':'Say the highlighted line first!'); return; }
      play(LINES[k].au, ()=>{
        step++;
        if (step>=LINES.length){
          sfx('sfx_success.mp3');
          const slot=el.querySelector('#ev-slot'+(round+1));
          slot.innerHTML='<b style="color:#24a66a;">'+FRIENDS[round].name+' is aboard!</b>';
          slot.style.border='2px solid #24a66a';
          round++;
          if (round>=3){ setTimeout(()=>{ el.querySelector('#ev-win').style.display='flex'; sfx('sfx_combo.mp3'); }, 500); }
          else { step=0; setTimeout(()=>{ render(); toast('New friend! Say hello!'); }, 700); return; }
        }
        render();
      });
    });
  }
  return {
    onEnter(){
      round=0; step=0;
      el.querySelector('#ev-win').style.display='none';
      [1,2,3].forEach(f=>{ const s=el.querySelector('#ev-slot'+f);
        s.innerHTML='waiting…'; s.style.border='2px dashed #b8a6d0'; });
      render();
    }
  };
});

/* ---------- S12 · wrap-up: five turns, listen then say ---------- */
addScreen('Say the whole talk', `
  <div style="width:100%; max-width:880px;">
    <div style="text-align:center; font-size:22px; font-weight:700; color:#8a6d3b; margin-bottom:16px;">
      Listen to each turn once, then say the whole talk without reading.
      <div class="ar" style="font-size:17px; color:#7a8aa0;">استمع ثم قل الحوار كاملًا دون قراءة</div>
    </div>
    <div class="dp-cards"></div>
  </div>`, el=>{
  const lines=["Hi. It's nice to meet you.","It's nice to meet you, too.","Hi. How are you?",
    "I'm great, thanks. And you?","I'm fine."];
  const audios=['a_t_tt1.mp3','a_t_tt2.mp3','a_t_tt3.mp3','a_t_tt4.mp3','a_t_tt5.mp3'];
  const host = el.querySelector('.dp-cards');
  let counts=[];
  function render(){
    host.innerHTML = lines.map((t,k)=>`
      <div class="card dp-c" data-k="${k}" style="display:flex; align-items:center; gap:16px; padding:12px 22px;
        margin-bottom:10px; cursor:pointer; transition:background .3s;
        ${counts[k]>=1 ? 'background:#e8f8f0; border:2px solid #24a66a;' : ''}">
        <button class="speaker small" data-audio="${audios[k]}"></button>
        <span style="font-size:25px; font-weight:700; color:#463a5e; flex:1;">${t}</span>
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

/* ---------- S13 · Check 1: five turns, no frames, no Arabic ---------- */
addScreen('Check 1 · Real talk', `
  <div style="display:grid; grid-template-columns:430px 1fr; gap:54px; align-items:center; width:100%; max-width:1080px;">
    <div class="card" style="height:430px; display:flex; align-items:center; justify-content:center;">
      <img src="${A}sec_char_wolf.png" style="width:330px; height:360px; object-fit:contain;" alt="new character">
    </div>
    <div>
      <span class="source-badge">CHECK 1 · NO HELP</span>
      <h1 style="font-size:42px; color:#3d3356; margin:16px 0 8px;">The wolf says hi!</h1>
      <p style="font-size:22px; color:#6e7b8b; line-height:1.5;">The wolf opens. You keep the talk going — all five turns, no reading.</p>
      <div style="display:flex; align-items:center; gap:18px; margin-top:28px;">
        <button class="speaker" data-audio="a_t_tt1.mp3" data-toast="Listen — then YOU talk"></button>
        <div class="card" style="display:flex; gap:18px; padding:14px 20px; font-size:18px; font-weight:800; color:#3d3356;">
          <span>1 · Listen</span><span>2 · Answer</span><span>3 · Keep going</span>
        </div>
      </div>
    </div>
  </div>
  <div class="teacher-only" style="position:absolute; left:44px; right:44px; bottom:16px; gap:8px; align-items:center; justify-content:center;">
    <span class="pill" style="background:#3d3356;color:#fff;">Error:</span>
    <button class="pill error-tag" data-error="missing-too">Drops "too"</button>
    <button class="pill error-tag" data-error="fine-fallback">B: says "I'm fine" only</button>
    <button class="pill error-tag" data-error="ordinal-slur">Ordinal slur</button>
    <button class="pill error-tag" data-error="silent">Silent / gives up</button>
    <button class="pill rate-tag green" data-rate="A">A</button>
    <button class="pill rate-tag" data-rate="B" style="background:#ffc84a;color:#3d3356;">B</button>
    <button class="pill rate-tag coral" data-rate="C">C</button>
  </div>`, el=>{
  el.querySelectorAll('.error-tag').forEach(b=>b.onclick=()=>{
    assessment.errors.add(b.dataset.error); b.style.background='#ffc84a'; b.style.color='#3d3356';
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
      <h1 style="font-size:40px; color:#3d3356; margin:14px 0 12px;">Try with a new friend</h1>
      <div id="repair-view" class="card" style="min-height:170px; display:flex; align-items:center; justify-content:center;
        text-align:center; font-size:27px; font-weight:800; color:#3d3356; line-height:1.5; padding:16px 22px;">
        <button class="speaker" data-audio="a_t_tt1.mp3"></button>
      </div>
    </div>
  </div>
  <div class="teacher-only" style="position:absolute; left:30px; right:30px; bottom:12px; gap:6px; align-items:center; justify-content:center; flex-wrap:wrap;">
    ${['Meaning','Slow','Contrast','Model','Build','Hide help','Try again'].map((t,i)=>`<button class="pill repair-step" data-step="${i}" style="background:#f3eefb;color:#7b5ea7;">${i+1}. ${t}</button>`).join('')}
    <button class="pill check2-rate green" data-rate="A">A</button>
    <button class="pill check2-rate" data-rate="B" style="background:#ffc84a;color:#3d3356;">B</button>
    <button class="pill check2-rate coral" data-rate="C">C</button>
  </div>`, el=>{
  const view=el.querySelector('#repair-view');
  let nextStep=0;
  const steps=[
    /* 1 Meaning — Arabic once, the broken meaning only */
    ()=>{ view.innerHTML='<div><div style="font-size:44px;">🤝</div><div style="font-size:24px;">nice to meet you</div><div class="ar" style="display:block;color:#24a66a;font-size:22px;">سعيد بلقائك · وأنت؟ = and you?</div></div>'; },
    /* 2 Slow — full round at .78 rate */
    ()=>{ view.innerHTML='<div style="font-size:24px;">Listen slowly. Five turns.</div>'; playSlow('a_t_tt_all.mp3'); },
    /* 3 Contrast — old vs new + too pair */
    ()=>{ view.innerHTML=`<div style="display:flex; flex-direction:column; gap:10px; font-size:22px;">
        <div style="display:flex; gap:14px; align-items:center;">
          <span class="card" style="padding:8px 16px; color:#9aa7b4; text-decoration:line-through;">I'm fine, thank you.</span>
          <span style="color:#24a66a; font-weight:800;">→</span>
          <span class="card" style="padding:8px 16px; color:#1f9d6c; border:2px solid #1f9d6c;">I'm great, thanks. And you?</span>
        </div>
        <div style="display:flex; gap:14px; align-items:center;">
          <span class="card" style="padding:8px 16px; color:#9aa7b4;">…meet you.</span>
          <span style="color:#e8443a; font-weight:800;">≠</span>
          <span class="card" style="padding:8px 16px; color:#e8443a; border:2px solid #e8443a;">…meet you, too.</span>
        </div></div>`;
      play('a_t_contrast.mp3'); },
    /* 4 Model — full model, teacher voice */
    ()=>{ view.innerHTML='<div style="font-size:22px;">Watch me. Then you.<br><span style="color:#7b5ea7;">Hi! It\'s nice to meet you. … I\'m great, thanks. And you?</span></div>'; play('a_t_tt_all.mp3'); },
    /* 5 Build — chunk both weak spots */
    ()=>{ view.innerHTML=`<div style="display:flex; flex-direction:column; gap:12px; font-size:20px;">
        <div style="display:flex; gap:8px; justify-content:center;"><span class="pill blue">nice</span><span class="pill blue">to meet</span><span class="pill blue">you, too</span></div>
        <div style="display:flex; gap:8px; justify-content:center;"><span class="pill green">I'm</span><span class="pill green">great,</span><span class="pill green">thanks.</span><span class="pill green">And you?</span></div></div>`; },
    /* 6 Hide help */
    ()=>{ view.innerHTML='<div style="font-size:22px;color:#6e7b8b;">Look at your new friend. No words now.</div>'; },
    /* 7 Try again = Check 2 */
    ()=>{ view.innerHTML='<button class="speaker" data-audio="a_t_tt1.mp3"></button>'; play('a_t_tt1.mp3'); toast('Check 2 — five turns, no reading.'); }
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
  return { onEnter(){ nextStep=0; view.innerHTML='<button class="speaker" data-audio="a_t_tt1.mp3"></button>';
    el.querySelectorAll('.repair-step').forEach(b=>{b.style.background='#f3eefb';b.style.color='#7b5ea7';}); } };
});

/* ---------- S15 · school-style practice (workbook format, pending verification) ---------- */
addScreen('School practice', `
  <div style="display:flex; gap:40px; width:100%; justify-content:center;">
    <div style="width:520px;">
      <div style="font-size:22px; font-weight:700; color:#463a5e; margin-bottom:4px; text-align:center;">1 · Listen and choose</div>
      <div class="ar" style="font-size:16px; color:#7a8aa0; text-align:center; margin-bottom:10px;">استمع واختر الإجابة</div>
      <div style="text-align:center; margin-bottom:12px;">
        <button class="speaker" id="ex-q"></button>
        <span class="card" style="display:inline-block; padding:8px 16px; font-size:19px; color:#8a6d3b; margin-left:12px;" id="ex-round">1 / 2</span>
      </div>
      <div id="ex-opts"></div>
    </div>
    <div style="width:520px;">
      <div style="font-size:22px; font-weight:700; color:#463a5e; margin-bottom:4px; text-align:center;">2 · Which place do you hear?</div>
      <div class="ar" style="font-size:16px; color:#7a8aa0; text-align:center; margin-bottom:10px;">أي رقم تسمع؟</div>
      <div style="text-align:center; margin-bottom:12px;">
        <button class="speaker" id="ex-q2" data-audio="a_t_third.mp3"></button>
        <span class="card" style="display:inline-block; padding:8px 16px; font-size:19px; color:#8a6d3b; margin-left:12px;">ordinal</span>
      </div>
      <div id="ex-opts2"></div>
      <div style="font-size:15px; color:#a08c5b; text-align:center; margin-top:10px;">Say your answer first, then tap</div>
    </div>
  </div>`, el=>{
  /* part 1: listen & choose, 2 rounds — key contrast items */
  const rounds=[
    {q:'a_t_tt3.mp3', opts:[["I'm great, thanks. And you?",1],["It's nice to meet you.",0]]},
    {q:'a_t_tt1.mp3', opts:[["I'm fine.",0],["It's nice to meet you, too.",1]]}
  ];
  let ri=0;
  function renderChoose(){
    el.querySelector('#ex-round').textContent=(ri+1)+' / 2';
    const opts=[...rounds[ri].opts].sort(()=>Math.random()-.5);
    el.querySelector('#ex-opts').innerHTML=opts.map(([t,ok])=>`
      <div class="card ex-o" data-ok="${ok}" style="padding:14px 20px; margin-bottom:12px; cursor:pointer;
        font-size:21px; font-weight:700; color:#463a5e; text-align:center;">${t}</div>`).join('');
    el.querySelectorAll('.ex-o').forEach(o=> o.onclick=()=>{
      if (o.dataset.ok==='1'){ sfx('sfx_correct.mp3'); o.style.background='#d9f2e5'; o.style.border='2px solid #1f9d6c';
        setTimeout(()=>{ if(ri<1){ ri++; renderChoose(); playQ(); } else toast('Listening part done!'); },700);
      } else { sfx('sfx_wrong.mp3'); toast('Listen again!'); playQ(); }
    });
  }
  function playQ(){ play(rounds[ri].q); }
  el.querySelector('#ex-q').onclick=playQ;
  /* part 2: ordinal listen & choose, 1 round */
  const opts2=[["I'm first!",0],["I'm third!",1],["I'm fifth!",0]].sort(()=>Math.random()-.5);
  el.querySelector('#ex-opts2').innerHTML=opts2.map(([t,ok])=>`
    <div class="card ex-o2" data-ok="${ok}" style="padding:14px 20px; margin-bottom:12px; cursor:pointer;
      font-size:23px; font-weight:800; color:#463a5e; text-align:center;">${t}</div>`).join('');
  el.querySelectorAll('.ex-o2').forEach(o=> o.onclick=()=>{
    if (o.dataset.ok==='1'){ sfx('sfx_success.mp3'); o.style.background='#d9f2e5'; o.style.border='2px solid #1f9d6c';
      toast('Ordinal nailed!'); }
    else { sfx('sfx_wrong.mp3'); toast('Listen again!'); play('a_t_third.mp3'); }
  });
  return { onEnter(){ ri=0; renderChoose(); setTimeout(playQ,400); } };
});

/* ---------- S16 · evidence-based achievement ---------- */
addScreen('Learning record', `
  <div style="text-align:center;">
    <span class="source-badge">TODAY’S EVIDENCE</span>
    <h1 class="title" style="margin:12px 0 6px;">I can have a first talk!</h1>
    <div class="ar" style="font-size:18px; color:#7a8aa0; margin-bottom:22px;">اليوم أستطيع أن أقول</div>
    <div style="display:flex; gap:30px; justify-content:center;">
      ${[['Say "nice to meet you"','a_t_tt1.mp3','#f59e0b'],['Say "I\'m great, thanks"','a_t_tt4.mp3','#7b5ea7'],['Say my line number','a_t_first.mp3','#24a66a']]
        .map(([t,au,c])=>`
        <div class="badge" data-audio="${au}" style="cursor:pointer; width:280px; padding:26px 18px; border-radius:22px;
          background:#fff; box-shadow:0 6px 18px rgba(60,40,10,.12); border:3px solid ${c};">
          <div style="width:74px; height:74px; margin:0 auto 14px; border-radius:50%; background:${c};
            display:flex; align-items:center; justify-content:center;">
            <svg viewBox="0 0 24 24" width="40" height="40" fill="#fff"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>
          </div>
          <div style="font-size:22px; font-weight:700; color:#463a5e;">${t}</div>
        </div>`).join('')}
    </div>
    <div style="margin-top:18px;">
      <span class="pill" style="background:#fff3d6; color:#b45309; font-size:17px;">Badge: First Talk in G2</span>
    </div>
    <div id="ability-level" class="card" style="display:inline-flex; margin-top:16px; padding:10px 20px; font-size:19px; font-weight:800; color:#3d3356;">Level: not recorded</div>
  </div>`, el=>({
  onEnter(){
    const level=assessment.check2 || assessment.check1 || 'Not recorded';
    const copy={A:'A · Independent',B:'B · With help, then independent',C:'C · Keep practising','Not recorded':'Not recorded'}[level];
    const colors={A:'#24a66a',B:'#ffc84a',C:'#f59e0b','Not recorded':'#e5edf2'};
    const box=el.querySelector('#ability-level'); box.textContent='Level: '+copy; box.style.borderColor=colors[level];
    if(level!=='Not recorded') setTimeout(()=>sfx('sfx_success.mp3'),250);
  }
}));

/* ---------- S17 · exit task + home review (no QR until pipeline verified) ---------- */
addScreen('Exit task · Home review', `
  <div style="display:flex; gap:40px; width:100%; justify-content:center; align-items:stretch;">
    <div class="card" style="width:520px; padding:26px 30px; text-align:center;">
      <div style="font-size:26px; font-weight:750; color:#3d3356; margin-bottom:6px;">Show me your line number!</div>
      <div class="ar" style="font-size:16px; color:#7a8aa0; margin-bottom:16px;">أخبرني برقمك في الصف</div>
      <div style="display:flex; align-items:center; gap:14px; justify-content:center; margin-bottom:14px;">
        <img src="${A}sec_char_noura.png" style="width:150px;height:150px;object-fit:contain;" alt="new person">
        <button class="speaker" data-audio="a_t_exit.mp3"></button>
      </div>
      <div style="display:flex; gap:8px; justify-content:center; margin-bottom:14px;">
        ${['1st','2nd','3rd','4th','5th'].map((p,k)=>`
          <button class="exit-pos" data-w="${['first','second','third','fourth','fifth'][k]}" style="width:56px; height:56px;
            border:none; border-radius:14px; background:#7b5ea7; color:#fff; font-size:17px; font-weight:800;
            cursor:pointer; box-shadow:0 3px 0 #5a4385;">${p}</button>`).join('')}
      </div>
      <div id="exit-cue" style="min-height:42px; font-size:26px; font-weight:800; color:#f59e0b;">Teacher picks a place — you say it!</div>
      <button id="exit-help" class="pill" style="margin-top:16px;background:#f3eefb;color:#7b5ea7;">Help · first word only</button>
    </div>
    <div class="card" style="width:520px; padding:26px 30px; text-align:center;">
      <div style="font-size:26px; font-weight:700; color:#463a5e; margin-bottom:6px;">Homework</div>
      <div class="ar" style="font-size:16px; color:#7a8aa0; margin-bottom:16px;">الواجب المنزلي</div>
      <div style="font-size:22px; font-weight:700; color:#8a6d3b; margin-bottom:14px; line-height:1.5;">Say the five-turn talk to someone at home.<br>Tell them your line number!</div>
      <div style="background:#fdf6ec; border:2px dashed #d9c9a3; border-radius:16px; padding:14px 18px;">
        <div style="font-size:21px; font-weight:750; color:#3d3356;">Home review · four stations</div>
        <div style="font-size:15px; color:#a08c5b; margin-top:4px;">words → listen & choose → read the talk → exam style</div>
      </div>
      <a href="review/" target="_blank" style="display:flex; align-items:center; justify-content:center; gap:12px;
        margin-top:14px; background:#24a66a; border-radius:16px; padding:16px 14px; text-decoration:none;
        box-shadow:0 3px 0 #187c50;">
        <span style="font-size:22px; font-weight:800; color:#fff;">Open home review →</span>
      </a>
      <div style="font-size:15px; color:#8a6d3b; margin-top:10px; font-weight:700;">Teacher: copy this link and send it to the parent</div>
    </div>
  </div>`, el=>{
  el.querySelectorAll('.exit-pos').forEach(b=> b.onclick=()=>{
    el.querySelectorAll('.exit-pos').forEach(x=>x.style.background='#7b5ea7');
    b.style.background='#f59e0b';
    el.querySelector('#exit-cue').textContent='Your place: '+b.textContent+' — say it!';
    toast('Student says: I\'m '+b.dataset.w+'!');
  });
  el.querySelector('#exit-help').onclick=()=>{ el.querySelector('#exit-cue').textContent='I\'m …'; toast('Only the first words. Finish it yourself.'); };
  return { onEnter(){ el.querySelector('#exit-cue').textContent='Teacher picks a place — you say it!';
    el.querySelectorAll('.exit-pos').forEach(x=>x.style.background='#7b5ea7'); } };
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
