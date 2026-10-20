/* ================================================================
   We Can 2 · Unit 1 Feelings · L3 (25-min 1v1 paid lesson)
   What's the Matter? · mastery checkpoint: see 4 of 6 feeling
   pictures, answer "I'm ___." independently + ask back once
   secondary: six feelings hungry/thirsty/hot/cold/sleepy/scared
   receptive: He's/She's (Same as the Leader) · school-test items
   book=We Can 2 / unit=Unit 1 / lesson=L3 / lessonKey=wc2-u1-l3
   theme: textbook purple #7b5ea7 / deep #4a3a6e / amber #ffc84a
   audio: Words in Action = official CD1 08 slices (a_official_*);
          Same as the Leader CD1 09/10 missing from package
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
const AUDIO_MANIFEST = ["a_official_ans_cold.mp3","a_official_ans_hot.mp3","a_official_ans_hungry.mp3","a_official_ans_scared.mp3","a_official_ans_sleepy.mp3","a_official_ans_thirsty.mp3","a_official_chant_clap.mp3","a_official_intro.mp3","a_official_qa_cold.mp3","a_official_qa_hot.mp3","a_official_qa_hungry.mp3","a_official_qa_scared.mp3","a_official_qa_sleepy.mp3","a_official_qa_thirsty.mp3","a_official_wtm.mp3","a_t_h_ninth.mp3","a_t_hes_hungry.mp3","a_t_hes_thirsty.mp3","a_t_howareyou.mp3","a_t_im.mp3","a_t_imfine.mp3","a_t_matter.mp3","a_t_no_eighth.mp3","a_t_soundcheck.mp3","a_t_the.mp3","a_t_w_cold.mp3","a_t_w_hot.mp3","a_t_w_hungry.mp3","a_t_w_scared.mp3","a_t_w_sleepy.mp3","a_t_w_thirsty.mp3","a_t_welldone.mp3","a_t_whats.mp3","a_t_whats_matter_slow.mp3","a_t_yourturn_ask.mp3","sfx_correct.mp3","sfx_pop.mp3","sfx_success.mp3","sfx_wrong.mp3"];
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
  '<b>Warm-up 1 (1 min):</b> Play the clap verse from L2; the student sings along and claps on 👏 👏. One pass, fast and warm.',
  '<b>Warm-up 2 (1 min):</b> Play the trick: "H is the ninth letter of the alphabet." The student fixes you out loud: "No, it\'s the eighth letter." One trick only.',
  '<b>Today\'s book:</b> Point at the page image: this lesson is We Can 2, Unit 1, pages 8–9 — six feelings and a new question.',
  '<b>Mission 1 of 2:</b> Read it together — today the student will say six feelings with "I\'m ___." Keep it to ten seconds.',
  '<b>Mission 2 of 2:</b> Read it together — the student will ask YOU "What\'s the matter?" Be playful; promise to act sick, cold, scared…',
  '<b>Input · Needs (2.5 min):</b> hungry and thirsty. Play each official answer; the student points and says "I\'m ___." twice per word. Arabic plays once — then English only. If the two get mixed later, put the eat/drink pictures side by side.',
  '<b>Input · Temperature (2.5 min):</b> hot and cold. Listen for the full "I\'m hot." — the #1 error today is dropping am ("I hot"). If it happens, exaggerate the "I\'m" mouth shape three times; no grammar lecture. Fan vs jacket pictures fix hot/cold mix-ups.',
  '<b>Input · States (2 min):</b> sleepy and scared. Act them: sleepy = yawn; scared = eyes wide, step back. Never use shivering/hugging-arms for scared — that belongs to cold.',
  '<b>All six (1.5 min):</b> Point-and-say round: tap a card, the student says "I\'m ___." BEFORE the audio plays. One fast pass through all six.',
  '<b>Listen & tap (2 min):</b> Ears only — play the answer, the student taps the matching picture. Four rounds. Wrong tap → replay once, no hint.',
  '<b>The question (2 min):</b> What\'s the matter? The apostrophe-s is the trap: play the official question, then the slow one. Student asks three times; "What the matter?" → slow replay + finger on the \'s block.',
  '<b>Two tracks (1 min):</b> Meet a friend → "How are you?" / "I\'m fine." See someone is NOT okay → "What\'s the matter?" Exposure only — never tested. Ten seconds per card.',
  '<b>Clinic demo (1 min):</b> Watch one full round: the patient speaks, you hear the answer, the right medicine gets picked. Student just watches and listens.',
  '<b>Feelings Clinic (3.5 min):</b> Four patients. Each round: the student asks "What\'s the matter?" out loud FIRST → tap the patient to hear the answer → tap the right medicine. Pass = 3 of 4 rounds with an independent question.',
  '<b>Same as the Leader (2 min):</b> You say "He\'s hungry!" — the student does the action (rub tummy / drink / fan / shiver / yawn / eyes wide). He\'s is listen-only today. Practice-model voice: official CD1 09/10 tracks are not in the package yet.',
  '<b>Check 1 (3 min):</b> No words, no Arabic. Four pictures, one at a time — ask "What\'s the matter?" for each; the student answers "I\'m ___." Record error type FIRST, then the level. A = 4 independent · B = 3 · C = 2 or fewer.',
  '<b>Repair (4 min):</b> Fixed seven steps — repair only what broke. Meaning (Arabic once) → Slow → Contrast → Model → Build → Hide help → Try again. Check 2 uses the fresh pictures.',
  '<b>School practice 1 (1 min):</b> Listen to the question; the student says the answer aloud BEFORE tapping. School-style item, pending verification against the current workbook.',
  '<b>School practice 2 (1 min):</b> Look at the picture; the student says the word aloud first, then taps it.',
  '<b>Record:</b> Set A, B, or C from Check 1/2 evidence; never award badges for page completion. Badge name for parents: Feelings Doctor.',
  '<b>Exit (1 min):</b> The student asks YOU "What\'s the matter?" — act your answer! Then two quick pictures. Send the home-review link to the parent.'
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

/* feeling palette: word, colour, Arabic gloss, remedy icon, remedy word */
const FEEL = [
  ['hungry','#d97706','جائع','rx_pizza.jpg','pizza'],
  ['thirsty','#2563eb','عطشان','rx_water.jpg','water'],
  ['hot','#dc2626','يشعر بالحر','rx_fan.jpg','fan'],
  ['cold','#0891b2','يشعر بالبرد','rx_jacket.jpg','jacket'],
  ['sleepy','#7b5ea7','نعسان','rx_bed.jpg','bed'],
  ['scared','#db4f7e','خائف','rx_teddy.jpg','teddy bear']
];
const FC = Object.fromEntries(FEEL.map(f=>[f[0],f[1]]));
const FAR = Object.fromEntries(FEEL.map(f=>[f[0],f[2]]));
const FRX = Object.fromEntries(FEEL.map(f=>[f[0],f[3]]));

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

/* ---------- S2 · warm-up 1 of 2: sing the clap verse from L2 ---------- */
addScreen('Warm-up 1 · sing', `
  <div style="text-align:center; width:100%; max-width:860px;">
    <span class="source-badge">WARM-UP · FROM LESSON 2 · 1 OF 2</span>
    <div style="font-size:32px; font-weight:800; color:#3d3356; margin:16px 0 6px;">Sing the clap verse with the book!</div>
    <div class="ar" style="font-size:18px; color:#7a8aa0; margin-bottom:24px;">غُنَّ أغنية التصفيق مع الكتاب</div>
    <button class="speaker" data-audio="a_official_chant_clap.mp3" data-toast="Sing! Clap on the beat!"
      style="width:92px; height:92px; background-size:44px;"></button>
    <div style="margin-top:18px; font-size:24px; font-weight:800; color:#463a5e;">
      If you're <b style="color:#d97706;">happy</b> and you <b style="color:#d97706;">know</b> it,
      <b style="color:#7b5ea7;">clap</b> your <b style="color:#7b5ea7;">hands</b>. <span style="font-size:26px;">👏 👏</span></div>
  </div>`);

/* ---------- S3 · warm-up 2 of 2: fix one ordinal trick from L2 ---------- */
addScreen('Warm-up 2 · fix my trick', `
  <div style="text-align:center; width:100%; max-width:860px;">
    <span class="source-badge">WARM-UP · FROM LESSON 2 · 2 OF 2</span>
    <div style="font-size:32px; font-weight:800; color:#3d3356; margin:16px 0 8px;">Fix my trick!</div>
    <div class="ar" style="font-size:18px; color:#7a8aa0; margin-bottom:22px;">صحِّح خطأي</div>
    <div class="card" style="padding:24px 32px; max-width:680px; margin:0 auto;">
      <div style="display:flex; align-items:center; gap:16px; justify-content:center;">
        <button class="speaker" data-audio="a_t_h_ninth.mp3" data-toast='"H is the ninth letter." — fix me!'
          style="width:72px; height:72px; background-size:34px;"></button>
        <div style="font-size:27px; font-weight:800; color:#463a5e;">"H is the <b style="color:#d94f4f;">ninth</b> letter of the alphabet."</div>
      </div>
      <button id="wu-reveal" class="pill" style="margin-top:18px; background:#f3eefb; color:#4a3a6e;">Say your fix first — then check</button>
      <div id="wu-fix" style="display:none; margin-top:14px; font-size:25px; font-weight:800; color:#1f9d6c;">
        "No, it's the <b>eighth</b> letter."</div>
    </div>
  </div>`, el=>({
  onEnter(){
    el.querySelector('#wu-reveal').onclick=()=>{
      el.querySelector('#wu-fix').style.display='block';
      el.querySelector('#wu-reveal').style.display='none';
      play('a_t_no_eighth.mp3'); sfx('sfx_correct.mp3');
    };
  }
}));

/* ---------- S4 · today's book: where this lesson lives ---------- */
addScreen('Today’s book', `
  <div style="display:flex; gap:48px; align-items:center; width:100%; justify-content:center;">
    <div style="max-width:520px;">
      <span class="source-badge">TODAY · FROM YOUR BOOK</span>
      <h1 style="font-size:42px; color:#3d3356; margin:14px 0 10px;">This is today's lesson!</h1>
      <div class="ar" style="font-size:19px; color:#7a8aa0; margin-bottom:18px;">درس اليوم من كتابك</div>
      <div style="font-size:22px; font-weight:700; color:#6a4fa3;">We Can 2 · Unit 1 · Pages 8–9</div>
    </div>
    <div style="text-align:center;">
      <img class="pic" src="${A}book_p14.jpg" style="width:400px; box-shadow:0 10px 26px rgba(0,0,0,.22); border-radius:10px;">
      <div style="font-size:15px; font-weight:700; color:#8a6d3b; margin-top:6px;">We Can 2 · Unit 1 · Page 8</div>
    </div>
  </div>`);

/* ---------- S5 · mission 1 of 2: six feelings ---------- */
addScreen('Mission 1 · six feelings', `
  <div style="text-align:center; width:100%; max-width:900px;">
    <span class="source-badge">TODAY · MISSION 1 OF 2</span>
    <div class="card" style="padding:26px 32px; margin-top:18px;">
      <div style="font-size:27px; font-weight:800; color:#463a5e; line-height:1.5; margin-bottom:18px;">
        Say six feelings: "<b style="color:#7b5ea7;">I'm</b> ___."</div>
      <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
        ${FEEL.map(([w,c])=>`
          <span class="pill" style="background:${c}1f; color:${c}; border:2px solid ${c}; font-size:20px;">${w}</span>`).join('')}
      </div>
      <div class="ar" style="font-size:17px; color:#7a8aa0; margin-top:16px;">قُل ستَّ مشاعر: أنا ___</div>
    </div>
  </div>`);

/* ---------- S6 · mission 2 of 2: ask back ---------- */
addScreen('Mission 2 · ask me!', `
  <div style="text-align:center; width:100%; max-width:900px;">
    <span class="source-badge">TODAY · MISSION 2 OF 2</span>
    <div class="card" style="padding:26px 32px; margin-top:18px;">
      <div style="display:flex; align-items:center; gap:18px; justify-content:center;">
        <button class="speaker" data-audio="a_official_wtm.mp3" style="width:72px; height:72px; background-size:34px;"></button>
        <div style="text-align:left;">
          <div style="font-size:30px; font-weight:800; color:#463a5e;">Ask ME: "<b style="color:#d97706;">What's the matter?</b>"</div>
          <div class="ar" style="font-size:17px; color:#7a8aa0; margin-top:6px;">اسألني: ما الأمر؟</div>
        </div>
      </div>
      <div style="margin-top:16px; font-size:19px; color:#6e7b8b; font-weight:700;">
        I will act sick, cold, scared… you ask me!</div>
    </div>
  </div>`);

/* ---------- input group helper ---------- */
function feelCard(w){
  return `
    <div class="card feel-in" data-w="${w}" style="padding:14px; width:340px; cursor:pointer; text-align:center;">
      <img class="pic" src="${A}ft_${w}.jpg" style="width:100%; height:190px; object-fit:contain;">
      <div style="display:flex; align-items:center; justify-content:center; gap:12px; margin-top:10px;">
        <button class="speaker small" data-audio="a_official_ans_${w}.mp3" data-toast="Say it two times!"></button>
        <span style="font-size:27px; font-weight:800; color:${FC[w]};">I'm ${w}.</span>
      </div>
      <div class="ar" style="font-size:17px; color:#7a8aa0; margin-top:6px;">أنا ${FAR[w]}</div>
    </div>`;
}

/* ---------- S7 · input: needs — hungry & thirsty ---------- */
addScreen('New feelings · needs', `
  <div style="text-align:center; width:100%;">
    <span class="source-badge">WORDS IN ACTION · CD1 08 · OFFICIAL AUDIO · GROUP 1 OF 3</span>
    <div style="font-size:26px; font-weight:800; color:#3d3356; margin:12px 0 4px;">Eat? Drink? Point and say!</div>
    <div class="ar" style="font-size:17px; color:#7a8aa0; margin-bottom:14px;">أشر وقُل مرتين</div>
    <div style="display:flex; gap:30px; justify-content:center;">
      ${feelCard('hungry')}
      ${feelCard('thirsty')}
    </div>
    <div style="margin-top:12px; font-size:17px; font-weight:700; color:#8a6d3b;">
      🍕 eat → hungry · 🥤 drink → thirsty</div>
  </div>`, el=>({
  onEnter(){
    el.querySelectorAll('.feel-in').forEach(c=> c.onclick=e=>{
      if (e.target.closest('.speaker')) return;
      play('a_official_ans_'+c.dataset.w+'.mp3');
      toast('Listen — then you say it!');
    });
  }
}));

/* ---------- S8 · input: temperature — hot & cold ---------- */
addScreen('New feelings · temperature', `
  <div style="text-align:center; width:100%;">
    <span class="source-badge">WORDS IN ACTION · CD1 08 · OFFICIAL AUDIO · GROUP 2 OF 3</span>
    <div style="font-size:26px; font-weight:800; color:#3d3356; margin:12px 0 4px;">Listen for "<b style="color:#7b5ea7;">I'm</b>" — don't drop it!</div>
    <div class="ar" style="font-size:17px; color:#7a8aa0; margin-bottom:14px;">استمع إلى "I'm" وقُلها كاملة</div>
    <div style="display:flex; gap:30px; justify-content:center;">
      ${feelCard('hot')}
      ${feelCard('cold')}
    </div>
    <div style="margin-top:12px; font-size:17px; font-weight:700; color:#8a6d3b;">
      🌀 fan → hot · 🧥 jacket → cold</div>
  </div>`, el=>({
  onEnter(){
    el.querySelectorAll('.feel-in').forEach(c=> c.onclick=e=>{
      if (e.target.closest('.speaker')) return;
      play('a_official_ans_'+c.dataset.w+'.mp3');
      toast('Listen — then you say it!');
    });
  }
}));

/* ---------- S9 · input: states — sleepy & scared ---------- */
addScreen('New feelings · states', `
  <div style="text-align:center; width:100%;">
    <span class="source-badge">WORDS IN ACTION · CD1 08 · OFFICIAL AUDIO · GROUP 3 OF 3</span>
    <div style="font-size:26px; font-weight:800; color:#3d3356; margin:12px 0 4px;">Act it: 😮 yawn — 😨 eyes wide, step back!</div>
    <div class="ar" style="font-size:17px; color:#7a8aa0; margin-bottom:14px;">مثِّل الشعور وقُله</div>
    <div style="display:flex; gap:30px; justify-content:center;">
      ${feelCard('sleepy')}
      ${feelCard('scared')}
    </div>
    <div style="margin-top:12px; font-size:17px; font-weight:700; color:#8a6d3b;">
      sleepy = yawn · scared = eyes WIDE — never shiver! (shiver = cold)</div>
  </div>`, el=>({
  onEnter(){
    el.querySelectorAll('.feel-in').forEach(c=> c.onclick=e=>{
      if (e.target.closest('.speaker')) return;
      play('a_official_ans_'+c.dataset.w+'.mp3');
      toast('Listen — then act it and say it!');
    });
  }
}));

/* ---------- S10 · all six: point & say round ---------- */
addScreen('All six · point and say', `
  <div style="text-align:center; width:100%;">
    <span class="source-badge">ALL SIX · YOU SAY IT FIRST</span>
    <div style="font-size:24px; font-weight:800; color:#3d3356; margin:12px 0 14px;">
      Tap a card — YOU say "I'm ___." before the book does!</div>
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:14px; max-width:960px; margin:0 auto;">
      ${FEEL.map(([w,c])=>`
        <div class="card six-card" data-w="${w}" style="padding:10px; cursor:pointer; text-align:center;">
          <img class="pic" src="${A}ft_${w}.jpg" style="width:100%; height:120px; object-fit:contain;">
          <div style="font-size:21px; font-weight:800; color:${c}; margin-top:6px;">I'm ${w}.</div>
        </div>`).join('')}
    </div>
  </div>`, el=>({
  onEnter(){
    el.querySelectorAll('.six-card').forEach(c=> c.onclick=()=>{
      play('a_official_ans_'+c.dataset.w+'.mp3');
      toast('Did you say it first?');
    });
  }
}));

/* ---------- S11 · listen & tap the picture (ears only) ---------- */
addScreen('Listen · tap the picture', `
  <div style="text-align:center; width:100%; max-width:1000px;">
    <span class="source-badge">EARS ONLY · CD1 08 · OFFICIAL AUDIO</span>
    <div style="display:flex; align-items:center; gap:16px; justify-content:center; margin:12px 0 14px;">
      <button id="lt-play" class="speaker" style="width:68px; height:68px;"></button>
      <span id="lt-round" class="card" style="padding:8px 18px; font-size:18px; font-weight:800; color:#8a6d3b;">Round 1 / 4</span>
    </div>
    <div style="display:flex; gap:14px; justify-content:center;">
      ${FEEL.map(([w])=>`
        <div class="card lt-pic" data-w="${w}" style="cursor:pointer; padding:10px; width:150px;">
          <img class="pic" src="${A}f_${w}.jpg" style="width:100%; height:120px; object-fit:contain;">
        </div>`).join('')}
    </div>
    <div style="margin-top:14px; font-size:19px; font-weight:700; color:#8a6d3b;">Listen → tap the matching picture</div>
  </div>`, el=>{
  let deck=[], di=0;
  function deal(){ deck=FEEL.map(f=>f[0]).sort(()=>Math.random()-.5).slice(0,4); di=0; paint(); }
  function paint(){
    el.querySelector('#lt-round').textContent = di<4 ? ('Round '+(di+1)+' / 4') : 'Done!';
    el.querySelectorAll('.lt-pic').forEach(p=>{ p.style.border=''; p.style.background=''; });
  }
  function playW(){ if (di<4) play('a_official_ans_'+deck[di]+'.mp3'); }
  el.querySelector('#lt-play').onclick=playW;
  el.querySelectorAll('.lt-pic').forEach(p=> p.onclick=()=>{
    if (di>=4) return;
    if (p.dataset.w===deck[di]){
      sfx('sfx_correct.mp3'); p.style.border='3px solid #1f9d6c'; p.style.background='#e8f8f0';
      di++; later(()=>{ paint(); if(di<4){ playW(); } else { sfx('sfx_success.mp3'); toast('All four! Great ears!'); } }, 800);
    } else { sfx('sfx_wrong.mp3'); toast('Listen again!'); later(playW, 500); }
  });
  return { onEnter(){ deal(); later(playW, 450); } };
});

/* ---------- S12 · the question: What's the matter? ---------- */
addScreen('The question · What\'s the matter?', `
  <div style="text-align:center; width:100%; max-width:900px;">
    <span class="source-badge">THE QUESTION · CD1 08 · OFFICIAL AUDIO</span>
    <div class="card" style="padding:26px 34px; margin-top:16px;">
      <div style="display:flex; align-items:center; gap:18px; justify-content:center;">
        <button class="speaker" data-audio="a_official_wtm.mp3" data-toast="Listen to the question"
          style="width:76px; height:76px; background-size:36px;"></button>
        <div style="text-align:left;">
          <div style="font-size:34px; font-weight:800; color:#463a5e;">
            <span style="color:#7b5ea7;">What<b style="color:#d94f4f;">'s</b></span> the <span style="color:#d97706;">matter?</span></div>
          <div class="ar" style="font-size:17px; color:#7a8aa0; margin-top:4px;">ما الأمر؟ — لا تنسَ 's</div>
        </div>
      </div>
      <div style="display:flex; gap:10px; justify-content:center; margin-top:20px; align-items:center;">
        ${[['a_t_whats.mp3',"What's",'#7b5ea7'],['a_t_the.mp3','the','#4a3a6e'],['a_t_matter.mp3','matter?','#d97706']].map(([au,t,c])=>`
          <button class="pill build-b" data-audio="${au}" style="background:${c}; color:#fff; font-size:24px; height:52px; padding:0 24px; cursor:pointer;">${t}</button>`).join('')}
        <button id="q-slow" class="pill" style="background:#f3eefb; color:#4a3a6e; font-size:18px; height:52px; cursor:pointer;">🐢 slow</button>
      </div>
      <div style="margin-top:16px; font-size:19px; font-weight:700; color:#8a6d3b;">Ask me three times — don't drop the 's!</div>
    </div>
  </div>`, el=>({
  onEnter(){
    el.querySelector('#q-slow').onclick=()=> playSlow('a_t_whats_matter_slow.mp3');
  }
}));

/* ---------- S13 · two tracks: How are you vs What's the matter ---------- */
addScreen('Two questions · two moments', `
  <div style="width:100%; max-width:1000px; text-align:center;">
    <span class="source-badge">JUST WATCH · NOT A TEST</span>
    <div style="font-size:24px; font-weight:800; color:#3d3356; margin:12px 0 16px;">
      Two moments, two questions!</div>
    <div style="display:flex; gap:30px; justify-content:center;">
      <div class="card" style="width:440px; padding:22px 26px; border-top:6px solid #24a66a;">
        <div style="font-size:20px; font-weight:800; color:#24a66a; margin-bottom:10px;">😊 You meet a friend — all looks fine</div>
        <div style="display:flex; align-items:center; gap:12px; justify-content:center;">
          <button class="speaker small" data-audio="a_t_howareyou.mp3"></button>
          <span style="font-size:23px; font-weight:800; color:#463a5e;">How are you?</span>
        </div>
        <div style="display:flex; align-items:center; gap:12px; justify-content:center; margin-top:10px;">
          <button class="speaker small" data-audio="a_t_imfine.mp3"></button>
          <span style="font-size:23px; font-weight:800; color:#6a4fa3;">I'm fine, thanks.</span>
        </div>
      </div>
      <div class="card" style="width:440px; padding:22px 26px; border-top:6px solid #d97706;">
        <div style="font-size:20px; font-weight:800; color:#d97706; margin-bottom:10px;">😟 Someone is NOT okay — you see it</div>
        <div style="display:flex; align-items:center; gap:12px; justify-content:center;">
          <button class="speaker small" data-audio="a_official_wtm.mp3"></button>
          <span style="font-size:23px; font-weight:800; color:#463a5e;">What's the matter?</span>
        </div>
        <div style="display:flex; align-items:center; gap:12px; justify-content:center; margin-top:10px;">
          <button class="speaker small" data-audio="a_official_ans_hungry.mp3"></button>
          <span style="font-size:23px; font-weight:800; color:#6a4fa3;">I'm hungry.</span>
        </div>
      </div>
    </div>
  </div>`);

/* ---------- S14 · Feelings Clinic: watch one round ---------- */
addScreen('Feelings Clinic · watch', `
  <div style="width:100%; max-width:1060px; text-align:center;">
    <span class="source-badge">GAME · FEELINGS CLINIC · WATCH ONE ROUND</span>
    <div style="display:flex; gap:26px; align-items:center; justify-content:center; margin-top:14px;">
      <div style="position:relative; width:520px;">
        <img class="pic" src="${A}clinic_scene.jpg" style="width:100%; border-radius:16px; box-shadow:0 10px 26px rgba(74,58,110,.18);">
      </div>
      <div style="width:420px; text-align:left;">
        <div class="card" style="display:flex; align-items:center; gap:12px; padding:12px 16px; margin-bottom:12px;">
          <button class="speaker small" data-audio="a_official_wtm.mp3"></button>
          <span style="font-size:21px; font-weight:800; color:#463a5e;">① You ask: "What's the matter?"</span>
        </div>
        <div class="card" style="display:flex; align-items:center; gap:12px; padding:12px 16px; margin-bottom:12px;">
          <button class="speaker small" data-audio="a_official_ans_hungry.mp3"></button>
          <span style="font-size:21px; font-weight:800; color:#463a5e;">② Patient: "I'm hungry."</span>
        </div>
        <div class="card" style="display:flex; align-items:center; gap:12px; padding:12px 16px;">
          <img src="${A}rx_pizza.jpg" style="width:52px; height:52px; border-radius:12px;">
          <span style="font-size:21px; font-weight:800; color:#d97706;">③ Pick the right medicine!</span>
        </div>
      </div>
    </div>
  </div>`);

/* ---------- S15 · Feelings Clinic: the real game, 4 patients ---------- */
addScreen('Feelings Clinic · your turn', `
  <div style="width:100%; max-width:1100px; text-align:center;">
    <div style="display:flex; align-items:center; justify-content:center; gap:16px; margin-bottom:8px;">
      <span class="source-badge">FEELINGS CLINIC · 4 PATIENTS</span>
      <span id="cl-stars" style="font-size:24px; letter-spacing:4px; color:#f59e0b;">☆☆☆☆</span>
    </div>
    <div style="display:flex; gap:26px; justify-content:center; align-items:flex-start;">
      <div style="width:430px;">
        <div class="card" style="padding:14px; text-align:center;">
          <div id="cl-pic-wrap" style="height:250px; display:flex; align-items:center; justify-content:center;">
            <img id="cl-pic" class="pic" src="${A}f_hungry.jpg" style="max-height:240px;">
          </div>
          <div style="display:flex; gap:12px; justify-content:center; margin-top:10px;">
            <button id="cl-ask" class="pill" style="background:#7b5ea7; color:#fff; font-size:18px; height:48px; cursor:pointer;">
              🎤 You ask first!</button>
            <button id="cl-hear" class="speaker" style="width:52px; height:52px; background-size:26px;" disabled></button>
          </div>
          <div id="cl-stage" style="margin-top:8px; font-size:16px; font-weight:800; color:#8a6d3b;">Patient 1 / 4 — ask, then listen</div>
        </div>
      </div>
      <div style="width:520px;">
        <div style="font-size:20px; font-weight:800; color:#3d3356; margin-bottom:10px;">Pick the right medicine:</div>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px;">
          ${FEEL.map(([w,c,ar,rx,rxw])=>`
            <div class="card rx-pick" data-w="${w}" style="padding:8px; cursor:pointer; text-align:center;">
              <img class="pic" src="${A}${rx}" style="width:100%; height:100px; object-fit:contain;">
              <div style="font-size:15px; font-weight:800; color:${c}; margin-top:2px;">${rxw}</div>
            </div>`).join('')}
        </div>
      </div>
    </div>
  </div>`, el=>{
  let deck=[], di=0, stars=0, phase='ask';
  function paint(){
    const w = deck[di];
    el.querySelector('#cl-pic').src = A+'f_'+w+'.jpg';
    el.querySelector('#cl-stage').textContent = di<4 ? ('Patient '+(di+1)+' / 4 — ask, then listen') : 'Clinic closed — great doctor!';
    el.querySelector('#cl-stars').textContent = '★'.repeat(stars)+'☆'.repeat(Math.max(0,4-stars));
    el.querySelector('#cl-hear').disabled = false;
    el.querySelectorAll('.rx-pick').forEach(p=>{ p.style.border=''; p.style.background=''; });
    phase='ask';
  }
  el.querySelector('#cl-ask').onclick=()=>{
    if (di>=4) return;
    play('a_t_yourturn_ask.mp3');
    toast('Your voice: "What\'s the matter?"');
    phase='hear';
  };
  el.querySelector('#cl-hear').onclick=()=>{
    if (di>=4) return;
    if (phase==='ask'){ toast('Ask first! "What\'s the matter?"'); play('a_t_yourturn_ask.mp3'); }
    play('a_official_ans_'+deck[di]+'.mp3');
    phase='pick';
  };
  el.querySelectorAll('.rx-pick').forEach(p=> p.onclick=()=>{
    if (di>=4) return;
    if (phase!=='pick'){ toast('Ask and listen first!'); return; }
    if (p.dataset.w===deck[di]){
      stars++; sfx('sfx_correct.mp3');
      p.style.border='3px solid #1f9d6c'; p.style.background='#e8f8f0';
      el.querySelector('#cl-stars').textContent = '★'.repeat(stars)+'☆'.repeat(Math.max(0,4-stars));
      later(()=>{ di++; sfx('sfx_pop.mp3');
        if (di<4) paint();
        else { paint(); el.querySelector('#cl-pic-wrap').innerHTML='<div style="font-size:60px;">🩺✨</div>';
          if (stars>=3) sfx('sfx_success.mp3'); toast('Clinic: '+stars+' / 4 patients cured!'); }
      }, 1200);
    } else { sfx('sfx_wrong.mp3'); toast('Listen again!'); play('a_official_ans_'+deck[di]+'.mp3'); }
  });
  return { onEnter(){
    deck=FEEL.map(f=>f[0]).sort(()=>Math.random()-.5).slice(0,4); di=0; stars=0; paint();
  } };
});

/* ---------- S16 · Same as the Leader (receptive He's) ---------- */
addScreen('Same as the Leader', `
  <div style="display:flex; gap:34px; width:100%; align-items:center; justify-content:center;">
    <div style="width:460px; text-align:center;">
      <img class="pic" src="${A}leader_scene.jpg" style="width:100%; max-height:420px; object-fit:contain; border-radius:14px; box-shadow:0 8px 22px rgba(60,40,10,.15);">
      <div style="font-size:16px; font-weight:700; color:#8a6d3b; margin-top:6px;">We Can 2 · Unit 1 · Page 9</div>
    </div>
    <div style="width:480px;">
      <span class="source-badge">SAME AS THE LEADER · PRACTICE MODEL (CD1 09/10 PENDING)</span>
      <div style="font-size:23px; font-weight:800; color:#3d3356; margin:14px 0 6px;">I say it — you DO it!</div>
      <div class="ar" style="font-size:17px; color:#7a8aa0; margin-bottom:16px;">أقول وأنت تمثِّل</div>
      ${[['a_t_hes_hungry.mp3','"He\'s hungry!"','🙆 rub your tummy'],
         ['a_t_hes_thirsty.mp3','"He\'s thirsty!"','🥤 drink!']].map(([au,t,act])=>`
      <div class="card" style="display:flex; align-items:center; gap:14px; padding:14px 20px; margin-bottom:12px;">
        <button class="speaker" data-audio="${au}" data-toast="Do the action!"></button>
        <div style="text-align:left;">
          <div style="font-size:24px; font-weight:800; color:#463a5e;">${t}</div>
          <div style="font-size:17px; color:#8a6d3b; font-weight:700;">${act}</div>
        </div>
      </div>`).join('')}
      <div style="font-size:17px; color:#6e7b8b; font-weight:700;">Teacher says more: "He's hot!" → fan yourself · "He's cold!" → shiver · "He's sleepy!" → yawn · "He's scared!" → eyes wide!</div>
    </div>
  </div>`);

/* ---------- S17 · Check 1: four pictures, no words ---------- */
addScreen('Check 1 · show me', `
  <div style="text-align:center; width:100%;">
    <span class="source-badge">CHECK 1 · NO WORDS · NO ARABIC</span>
    <div style="font-size:26px; font-weight:800; color:#3d3356; margin:12px 0 4px;">I ask — you answer: "I'm ___."</div>
    <div style="display:flex; gap:26px; justify-content:center; align-items:center; margin-top:14px;">
      <div class="card" style="width:360px; height:360px; display:flex; align-items:center; justify-content:center; padding:14px;">
        <img id="c1-pic" class="pic" src="${A}f_hungry.jpg" style="max-height:330px;">
      </div>
      <div style="width:300px;">
        <button class="speaker" data-audio="a_official_wtm.mp3" data-toast="Ask: What's the matter?"
          style="width:76px; height:76px; background-size:36px;"></button>
        <div style="font-size:19px; color:#6e7b8b; font-weight:700; margin-top:10px;">Ask for each picture.<br>Student answers out loud.</div>
        <button id="c1-next" style="margin-top:16px; height:52px; padding:0 28px; border:none; border-radius:26px;
          background:#6a4fa3; color:#fff; font-size:20px; font-weight:750; cursor:pointer;
          box-shadow:0 3px 0 #4a3a6e;">Next picture →</button>
        <div id="c1-round" class="card" style="display:inline-block; margin-top:14px; padding:6px 18px;
          font-size:17px; font-weight:800; color:#8a6d3b;">Picture 1 / 4</div>
      </div>
    </div>
  </div>
  <div class="teacher-only" style="position:absolute; left:44px; right:44px; bottom:12px; gap:8px; align-items:center; justify-content:center; flex-wrap:wrap;">
    <span class="pill" style="background:#3d3356;color:#fff;">Error:</span>
    <button class="pill error-tag" data-error="hungry-thirsty-mix">hungry/thirsty mix</button>
    <button class="pill error-tag" data-error="missing-am">drops am ("I hot")</button>
    <button class="pill error-tag" data-error="scared-sleepy-mix">scared/sleepy mix</button>
    <button class="pill error-tag" data-error="question-no-s">"What the matter?"</button>
    <button class="pill error-tag" data-error="silent">Silent / gives up</button>
    <button class="pill rate-tag green" data-rate="A">A · 4/4</button>
    <button class="pill rate-tag" data-rate="B" style="background:#ffc84a;color:#3d3356;">B · 3/4</button>
    <button class="pill rate-tag coral" data-rate="C">C · ≤2</button>
  </div>`, el=>{
  let deck=[], di=0;
  function paint(){
    el.querySelector('#c1-pic').src = A+'f_'+deck[di]+'.jpg';
    el.querySelector('#c1-round').textContent = di<4 ? ('Picture '+(di+1)+' / 4') : 'Done — record below';
  }
  el.querySelector('#c1-next').onclick=()=>{
    if (di<3){ di++; sfx('sfx_pop.mp3'); paint(); }
    else if (di===3){ di++; paint(); toast('Now record the level.'); }
  };
  el.querySelectorAll('.error-tag').forEach(b=>b.onclick=()=>{
    assessment.errors.add(b.dataset.error); b.style.background='#ffc84a'; b.style.color='#3d3356';
  });
  el.querySelectorAll('.rate-tag').forEach(b=>b.onclick=()=>{
    assessment.check1=b.dataset.rate; sfx('sfx_correct.mp3'); toast('Check 1 recorded: '+b.dataset.rate);
  });
  return { onEnter(){
    deck=FEEL.map(f=>f[0]).sort(()=>Math.random()-.5).slice(0,4); di=0; paint();
    assessment.check1=null; assessment.check2=null; assessment.errors.clear();
    el.querySelectorAll('.error-tag').forEach(b=>{b.style.background='';b.style.color='';});
  } };
});

/* ---------- S18 · fixed repair path + Check 2 ---------- */
addScreen('Repair · Check 2', `
  <div style="display:grid; grid-template-columns:400px 1fr; gap:48px; align-items:center; width:100%; max-width:1080px;">
    <div class="card" style="height:420px; display:flex; align-items:center; justify-content:center; padding:16px;">
      <img src="${A}clinic_scene.jpg" style="width:100%; height:100%; object-fit:cover; border-radius:14px;" alt="clinic">
    </div>
    <div>
      <span class="source-badge">HELP FADES → CHECK 2</span>
      <h1 style="font-size:40px; color:#3d3356; margin:14px 0 12px;">Fix the feeling, ask again</h1>
      <div id="repair-view" class="card" style="min-height:170px; display:flex; align-items:center; justify-content:center;
        text-align:center; font-size:27px; font-weight:800; color:#3d3356; line-height:1.5; padding:16px 22px;">
        <button class="speaker" data-audio="a_official_wtm.mp3"></button>
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
    /* 1 Meaning — Arabic once, six mini-cards */
    ()=>{ view.innerHTML='<div><div style="font-size:21px; margin-bottom:10px;">Tap the broken one — Arabic plays once:</div><div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap;">'+
      FEEL.map(([w,c,ar])=>`<button class="pill rp-mean" data-w="${w}" style="background:${c}; color:#fff; font-size:18px; cursor:pointer;">${w}</button>`).join('')+
      '</div><div id="rp-ar" class="ar" style="display:block; color:#24a66a; font-size:22px; margin-top:10px; min-height:28px;"></div></div>';
      view.querySelectorAll('.rp-mean').forEach(b=> b.onclick=()=>{
        view.querySelector('#rp-ar').textContent = 'أنا '+FAR[b.dataset.w];
        play('a_t_w_'+b.dataset.w+'.mp3');
      }); },
    /* 2 Slow */
    ()=>{ view.innerHTML='<div style="font-size:23px;">Listen slowly — question, then answer.</div>';
      playSlow('a_t_whats_matter_slow.mp3', ()=> later(()=> playSlow('a_official_ans_hungry.mp3'), 500)); },
    /* 3 Contrast — the three classic confusions side by side */
    ()=>{ view.innerHTML=`<div style="display:flex; flex-direction:column; gap:10px; font-size:19px;">
        <div style="display:flex; gap:10px; align-items:center; justify-content:center;">
          <span style="font-size:22px;">🍕 eat</span><span style="color:#d97706; font-weight:800;">hungry</span>
          <span style="color:#24a66a; font-weight:800;">≠</span>
          <span style="font-size:22px;">🥤 drink</span><span style="color:#2563eb; font-weight:800;">thirsty</span>
        </div>
        <div style="display:flex; gap:10px; align-items:center; justify-content:center;">
          <span style="font-size:22px;">🌀 fan</span><span style="color:#dc2626; font-weight:800;">hot</span>
          <span style="color:#24a66a; font-weight:800;">≠</span>
          <span style="font-size:22px;">🧥 jacket</span><span style="color:#0891b2; font-weight:800;">cold</span>
        </div>
        <div style="display:flex; gap:10px; align-items:center; justify-content:center;">
          <span style="font-size:22px;">😮 yawn</span><span style="color:#7b5ea7; font-weight:800;">sleepy</span>
          <span style="color:#24a66a; font-weight:800;">≠</span>
          <span style="font-size:22px;">😨 eyes wide</span><span style="color:#db4f7e; font-weight:800;">scared</span>
        </div></div>`; },
    /* 4 Model — exaggerated I'm */
    ()=>{ view.innerHTML='<div style="font-size:22px;">Watch my mouth: <span style="color:#7b5ea7;">I\'m … I\'m … I\'m hot.</span></div>';
      play('a_t_im.mp3', ()=> later(()=> play('a_t_im.mp3'), 350)); },
    /* 5 Build */
    ()=>{ view.innerHTML=`<div style="display:flex; flex-direction:column; gap:12px; align-items:center;">
        <div style="display:flex; gap:8px; font-size:20px;">
          <button class="pill blue" data-audio="a_t_im.mp3" style="cursor:pointer;">I'm</button>
          <button class="pill coral" data-audio="a_t_w_hot.mp3" style="cursor:pointer;">hot.</button>
        </div>
        <div style="display:flex; gap:8px; font-size:20px;">
          <button class="pill blue" data-audio="a_t_whats.mp3" style="cursor:pointer;">What's</button>
          <button class="pill blue" data-audio="a_t_the.mp3" style="cursor:pointer;">the</button>
          <button class="pill coral" data-audio="a_t_matter.mp3" style="cursor:pointer;">matter?</button>
        </div></div>`; },
    /* 6 Hide help */
    ()=>{ view.innerHTML='<div style="font-size:22px;color:#6e7b8b;">No words now. Just pictures and voices.</div>'; },
    /* 7 Try again = Check 2: fresh pictures */
    ()=>{ view.innerHTML='<div style="display:flex; flex-direction:column; gap:12px; align-items:center;">'+
        '<div style="font-size:21px;">New patients — ask me, then answer for each!</div>'+
        '<div style="display:flex; gap:14px;" id="c2-row"></div></div>';
      const fresh=FEEL.map(f=>f[0]).sort(()=>Math.random()-.5).slice(0,4);
      const row=view.querySelector('#c2-row');
      fresh.forEach(w=>{
        const b=document.createElement('button');
        b.style.cssText='border:none;background:#fff;border-radius:12px;padding:6px;cursor:pointer;box-shadow:0 3px 10px rgba(40,30,60,.12);';
        b.innerHTML='<img src="'+A+'f_'+w+'.jpg" style="width:86px; height:86px; object-fit:contain; border-radius:8px;">';
        b.onclick=()=> play('a_official_qa_'+w+'.mp3');
        row.appendChild(b);
      });
      toast('Check 2 — four fresh pictures.'); }
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
  return { onEnter(){ nextStep=0; view.innerHTML='<button class="speaker" data-audio="a_official_wtm.mp3"></button>';
    el.querySelectorAll('.repair-step').forEach(b=>{b.style.background='#f3eefb';b.style.color='#4a3a6e';}); } };
});

/* ---------- S19 · school practice 1: listen & choose the answer ---------- */
addScreen('School practice 1 · listen and choose', `
  <div style="width:100%; max-width:760px; text-align:center;">
    <span class="source-badge">SCHOOL-STYLE PRACTICE · 1 OF 2</span>
    <div style="font-size:22px; font-weight:750; color:#3d3356; margin:16px 0 20px;">
      Say your answer first — then tap it.
      <span class="ar" style="font-size:16px; color:#7a8aa0;"> · قُل إجابتك أولًا ثم اضغطها</span></div>
    <div style="display:flex; align-items:center; justify-content:center; gap:16px; margin-bottom:20px;">
      <button class="speaker" data-audio="a_official_wtm.mp3" data-toast="What's the matter?"></button>
      <div class="card" style="padding:14px 22px; font-size:25px; font-weight:800; color:#463a5e;">What's the matter?</div>
    </div>
    <div style="max-width:560px; margin:0 auto;">
      ${[["I'm hungry.",1],["I'm fine, thanks.",0],["I'm six years old.",0]].map(([t,ok])=>`
      <div class="card sp1-o" data-ok="${ok}" style="padding:16px 22px; margin-bottom:14px; cursor:pointer;
        font-size:23px; font-weight:800; color:#463a5e; text-align:center;">${t}</div>`).join('')}
    </div>
  </div>`, el=>{
  el.querySelectorAll('.sp1-o').forEach(o=> o.onclick=()=>{
    if (o.dataset.ok==='1'){ sfx('sfx_success.mp3'); o.style.background='#d9f2e5'; o.style.border='2px solid #1f9d6c';
      play('a_official_ans_hungry.mp3'); toast('A feeling answer!'); }
    else { sfx('sfx_wrong.mp3'); toast('Someone is NOT okay — which answer fits?'); later(()=> play('a_official_wtm.mp3'), 400); }
  });
});

/* ---------- S20 · school practice 2: look & choose the word ---------- */
addScreen('School practice 2 · look and choose', `
  <div style="width:100%; max-width:820px; text-align:center;">
    <span class="source-badge">SCHOOL-STYLE PRACTICE · 2 OF 2</span>
    <div style="font-size:22px; font-weight:750; color:#3d3356; margin:16px 0 18px;">
      Look at the boy. Say the word first — then tap: "I'm ___."
      <span class="ar" style="font-size:16px; color:#7a8aa0;"> · انظر الصورة وقُل الكلمة أولًا</span></div>
    <div class="card" style="display:inline-block; padding:14px; margin-bottom:18px;">
      <img class="pic" src="${A}f_hot.jpg" style="height:230px;">
    </div>
    <div style="display:flex; gap:18px; justify-content:center;">
      ${[['hot',1],['cold',0],['sleepy',0]].map(([w,ok])=>`
      <div class="card sp2-o" data-ok="${ok}" style="padding:16px 30px; cursor:pointer;
        font-size:27px; font-weight:800; color:#463a5e;">${w}</div>`).join('')}
    </div>
  </div>`, el=>{
  el.querySelectorAll('.sp2-o').forEach(o=> o.onclick=()=>{
    if (o.dataset.ok==='1'){ sfx('sfx_success.mp3'); o.style.background='#d9f2e5'; o.style.border='2px solid #1f9d6c';
      play('a_official_ans_hot.mp3'); toast("I'm hot!"); }
    else { sfx('sfx_wrong.mp3'); toast('Look at his face — red! Fan needed!'); }
  });
});

/* ---------- S21 · evidence-based achievement ---------- */
addScreen('Learning record', `
  <div style="text-align:center;">
    <span class="source-badge">TODAY’S EVIDENCE</span>
    <h1 class="title" style="margin:12px 0 6px;">I can ask and answer!</h1>
    <div class="ar" style="font-size:18px; color:#7a8aa0; margin-bottom:18px;">اليوم أستطيع أن أقول</div>
    <div style="display:flex; gap:26px; justify-content:center;">
      ${[['Six feelings: "I\'m ___."','a_official_qa_scared.mp3','#d97706'],
         ['Ask: "What\'s the matter?"','a_official_wtm.mp3','#7b5ea7'],
         ['Help a friend: pick the medicine','a_t_yourturn_ask.mp3','#24a66a']]
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
      <img class="pic" src="${A}goals_box.jpg" style="width:520px; border-radius:10px; box-shadow:0 6px 16px rgba(60,40,10,.14);">
      <div style="font-size:14px; font-weight:700; color:#8a6d3b; margin-top:4px;">We Can 2 · Unit 1 · Page 9 · I Can goals</div>
    </div>
    <div style="margin-top:12px;">
      <span class="pill" style="background:#fff3d6; color:#b45309; font-size:17px;">Badge: Feelings Doctor</span>
    </div>
    <div id="ability-level" class="card" style="display:inline-flex; margin-top:12px; padding:10px 20px; font-size:19px; font-weight:800; color:#3d3356;">Level: not recorded</div>
  </div>`, el=>({
  onEnter(){
    const level=assessment.check2 || assessment.check1 || 'Not recorded';
    const copy={A:'A · Independent',B:'B · With help, then independent',C:'C · Keep practising','Not recorded':'Not recorded'}[level];
    const colors={A:'#24a66a',B:'#ffc84a',C:'#f59e0b','Not recorded':'#e5edf2'};
    const box=el.querySelector('#ability-level'); box.textContent='Level: '+copy; box.style.borderColor=colors[level];
    try{ localStorage.setItem('khusoosi:wc2-u1-l3:result', level);
      localStorage.setItem('khusoosi:wc2-u1-l3:errors', JSON.stringify([...assessment.errors])); }catch(e){}
    if(level!=='Not recorded') later(()=>sfx('sfx_success.mp3'),250);
  }
}));

/* ---------- S22 · exit task + home review ---------- */
addScreen('Exit task · Home review', `
  <div style="display:flex; gap:40px; width:100%; justify-content:center; align-items:stretch;">
    <div class="card" style="width:520px; padding:26px 30px; text-align:center;">
      <div style="font-size:26px; font-weight:750; color:#3d3356; margin-bottom:6px;">Now YOU ask ME!</div>
      <div class="ar" style="font-size:16px; color:#7a8aa0; margin-bottom:16px;">الآن اسألني أنت</div>
      <div style="display:flex; align-items:center; gap:14px; justify-content:center; margin-bottom:14px;">
        <button class="speaker" data-audio="a_t_yourturn_ask.mp3" data-toast="Ask me!"></button>
        <div style="font-size:23px; font-weight:800; color:#463a5e; text-align:left;">"What's the matter?"<br>
          <span style="color:#6e7b8b; font-size:18px;">I will act — you ask!</span></div>
      </div>
      <div style="font-size:19px; font-weight:700; color:#8a6d3b; margin-bottom:12px;">Then two quick patients:</div>
      <div style="display:flex; gap:16px; justify-content:center;">
        ${['cold','sleepy'].map(w=>`
          <button class="exit-pic" data-w="${w}" style="border:none; background:#fff; border-radius:14px; padding:8px;
            cursor:pointer; box-shadow:0 3px 10px rgba(40,30,60,.12);">
            <img src="${A}f_${w}.jpg" style="width:110px; height:110px; object-fit:contain; border-radius:10px;">
          </button>`).join('')}
      </div>
      <div id="exit-note" style="margin-top:12px; font-size:17px; color:#6e7b8b; font-weight:700;">Tap a patient — answer "I'm ___." out loud, then hear the book.</div>
    </div>
    <div class="card" style="width:520px; padding:26px 30px; text-align:center;">
      <div style="font-size:26px; font-weight:700; color:#463a5e; margin-bottom:6px;">Homework</div>
      <div class="ar" style="font-size:16px; color:#7a8aa0; margin-bottom:16px;">الواجب المنزلي</div>
      <div style="font-size:21px; font-weight:700; color:#8a6d3b; margin-bottom:14px; line-height:1.5;">Ask someone at home: "What's the matter?"<br>Act one feeling — let them guess!</div>
      <div style="background:#fdf6ec; border:2px dashed #d9c9a3; border-radius:16px; padding:14px 18px;">
        <div style="font-size:21px; font-weight:750; color:#3d3356;">Home review · four stations</div>
        <div style="font-size:15px; color:#a08c5b; margin-top:4px;">words → listen & choose → ask & answer → exam style</div>
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
  el.querySelectorAll('.exit-pic').forEach(b=> b.onclick=()=>{
    play('a_official_ans_'+b.dataset.w+'.mp3');
    toast('Did you say it first?');
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
