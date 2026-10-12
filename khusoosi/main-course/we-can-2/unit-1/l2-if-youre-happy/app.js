/* ================================================================
   We Can 2 · Unit 1 Feelings · L2 (25-min 1v1 paid lesson)
   If You're Happy · mastery checkpoint: sing the clap verse +
   fix a wrong letter-position statement ("No, it's the sixth letter.")
   secondary: ordinals sixth–tenth · receptive: cap/clap/lock/clock
   book=We Can 2 / unit=Unit 1 / lesson=L2 / lessonKey=wc2-u1-l2
   theme: textbook purple #7b5ea7 / deep #4a3a6e / amber #ffc84a
   audio: chant = official CD1 05 slices (a_official_*);
          Confusion Game / Sounds CD1 06-07 missing from package
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
  curAudio = new Audio(A + src);
  curAudio.preload = 'auto';
  curAudio.addEventListener('error', audioFail, {once:true});
  const p = curAudio.play();
  if (p && p.catch) p.catch(audioFail);
  if (onend) curAudio.addEventListener('ended', onend, {once:true});
}
function playSlow(src, onend){
  stopAudio();
  curAudio = new Audio(A + src);
  curAudio.playbackRate = .78;
  curAudio.addEventListener('error', audioFail, {once:true});
  const p = curAudio.play();
  if (p && p.catch) p.catch(audioFail);
  if (onend) curAudio.addEventListener('ended', onend, {once:true});
}
function stopAudio(){ if(curAudio){ curAudio.pause(); curAudio.currentTime=0; curAudio=null; } }
let curSfx = null;
function sfx(src){ try{ if(curSfx){curSfx.pause();} curSfx = new Audio(A+src); const p=curSfx.play(); if(p&&p.catch)p.catch(()=>{});}catch(e){} }
document.addEventListener('pointerdown', function warm(){
  document.removeEventListener('pointerdown', warm);
  try{ const u=new Audio(A+'sfx_pop.mp3'); u.volume=0.01; const p=u.play(); if(p&&p.catch)p.catch(()=>{}); }catch(e){}
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
  '<b>Warm-up 1 (1 min):</b> Play the greeting; the student answers "It\'s nice to meet you, too." One pass, fast and warm.',
  '<b>Warm-up 2 (1 min):</b> Tap any kid in the line; the student says the place word BEFORE the tap plays it — "first!", "second!"… One pass through the five.',
  '<b>Outcome:</b> Show the book page: today = a chant, new line numbers sixth–tenth, and the Confusion Game. State the one goal: sing the clap part and fix my tricks.',
  '<b>Input (2 min):</b> Play the official chant once. Student listens and claps along. Only the clap verse is a target today — the other verses are just fun exposure, never tested.',
  '<b>Clap verse lines 1–2 (2.5 min):</b> Play each slice, student sings it back twice. Keywords must be heard out loud: happy, know, clap your hands.',
  '<b>Clap verse lines 3–4 + full verse (3 min):</b> Same routine, then sing the whole clap verse together up to three times. Clap on the beat.',
  '<b>Ordinals input (2.5 min):</b> Run the axis: first–fifth fast (they know these), then sixth–tenth slowly, one card at a time. Point and say. Understandable is enough — do not over-correct /θ/ (30 seconds max).',
  '<b>Flash check:</b> Show the number; the student says the word BEFORE you reveal. Wrong → play the audio once and move on.',
  '<b>Confusion Game demo (2 min):</b> Play the trick: "F is the seventh letter of the alphabet." Student judges right or wrong, then hears the fix: "No, it\'s the sixth letter. G is the seventh letter." Act it out — be sneaky, then laugh.',
  '<b>Guided tricks (2.5 min):</b> One card at a time, sentence frame on screen. Student says the full fix out loud BEFORE tapping "check". The letter strip on top is for counting support. Pass = two independent fixes.',
  '<b>Trick Star game (3 min):</b> No frames. Six cards — some true, some tricks. Student answers out loud first, then taps Right or Trick, then checks. Speed second, correctness first.',
  '<b>Sounds (2 min):</b> Receptive only — play a word, student taps the picture. cap/clap/lock/clock. No spelling rules today; this seeds L4. Practice-model voice: the official CD1 06 track is not in the package yet.',
  '<b>Check 1 · station 1:</b> No help, no Arabic. Play the clap verse; the student sings it — keywords must be heard out loud. Note breaks silently; record on the next page.',
  '<b>Check 1 · station 2 + record:</b> Play the two tricks; the student fixes them out loud. Record error type FIRST, then the level. A = both stations independent · B = one prompt · C = two or more breaks.',
  '<b>Repair (4 min):</b> Fixed seven steps — repair only what broke. Contrast step targets the fifth/sixth border and the trick-fix chunks. Check 2 uses fresh items: a C trick and one chant re-run.',
  '<b>School practice 1 (1 min):</b> Student answers aloud BEFORE tapping. School-style item, pending verification against the current 1448 workbook.',
  '<b>School practice 2 (1 min):</b> Same routine — say the fix aloud first, then tap the matching sentence.',
  '<b>Record:</b> Set A, B, or C from Check 1/2 evidence; never award badges for page completion.',
  '<b>Exit (1 min):</b> One last trick — play it, the student fixes you. Then sing the clap verse once together and send the home-review link to the parent.'
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

/* ordinal palette: 1-5 from L1, 6-10 matched to the book's own colors */
const ORD1 = [['first','#d97706'],['second','#db4f7e'],['third','#7b5ea7'],['fourth','#24a66a'],['fifth','#4a3a6e']];
const ORD2 = [['sixth','#7b5ea7'],['seventh','#f59e0b'],['eighth','#ec6ba0'],['ninth','#d94f4f'],['tenth','#1f9d6c']];

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

/* ---------- S2 · warm-up 1 of 2: the greeting from L1 ---------- */
addScreen('Warm-up 1 · say hi', `
  <div style="text-align:center; width:100%; max-width:860px;">
    <span class="source-badge">WARM-UP · FROM LESSON 1 · 1 OF 2</span>
    <div style="font-size:32px; font-weight:800; color:#3d3356; margin:16px 0 6px;">Say hi to me — like last time!</div>
    <div class="ar" style="font-size:18px; color:#7a8aa0; margin-bottom:26px;">حيّيني مثل المرة الماضية</div>
    <div class="card" style="padding:26px 34px; max-width:700px; margin:0 auto;">
      <div style="display:flex; align-items:center; gap:16px; justify-content:center;">
        <button class="speaker" data-audio="a_official_tt1.mp3" style="width:72px; height:72px; background-size:34px;"></button>
        <span style="font-size:28px; font-weight:800; color:#3d3356;">"Hi. It's nice to meet you."</span>
      </div>
      <div style="margin:22px 0 4px; font-size:17px; font-weight:700; color:#8a6d3b;">YOUR TURN →</div>
      <div style="display:flex; align-items:center; gap:16px; justify-content:center;">
        <span style="font-size:27px; font-weight:800; color:#d97706;">It's nice to meet you, too.</span>
        <button class="wu-done" style="height:46px; padding:0 22px; border:none; border-radius:23px;
          background:#f3eefb; color:#4a3a6e; font-size:17px; font-weight:800; cursor:pointer;">I said it!</button>
      </div>
    </div>
  </div>`, el=>({
  onEnter(){
    const b=el.querySelector('.wu-done');
    b.onclick=()=>{ b.textContent='✓'; b.style.background='#24a66a'; b.style.color='#fff';
      sfx('sfx_correct.mp3'); setTimeout(()=>{ play('a_t_welldone.mp3'); },300); };
  }
}));

/* ---------- S3 · warm-up 2 of 2: the line, first–fifth flash ---------- */
addScreen('Warm-up 2 · the line', `
  <div style="text-align:center; width:100%; max-width:920px;">
    <span class="source-badge">WARM-UP · FROM LESSON 1 · 2 OF 2</span>
    <div style="font-size:32px; font-weight:800; color:#3d3356; margin:16px 0 6px;">Tap a kid — you say the place!</div>
    <div class="ar" style="font-size:18px; color:#7a8aa0; margin-bottom:18px;">اضغط طفلًا وقُل مكانه في الصف</div>
    <div style="position:relative; width:760px; max-width:100%; margin:0 auto;">
      <img class="pic" src="${A}sec_queue.png" style="width:100%; border-radius:16px; box-shadow:0 10px 26px rgba(74,58,110,.16);">
      ${ORD1.map(([w,c],k)=>{
        const x=[28.7,43.5,58.8,73.8,87.5][k];
        return `<button class="warm-kid" data-audio="a_t_${w}.mp3" data-toast="You say it too!"
          style="position:absolute; left:${x-5.5}%; top:18%; width:11%; height:70%;
          background:transparent; border:none; cursor:pointer; border-radius:12px;"></button>`;
      }).join('')}
    </div>
    <div style="margin-top:14px; font-size:19px; font-weight:700; color:#8a6d3b;">Student says it first — then tap to check. ★</div>
  </div>`);

/* ---------- S3 · promise page: goals + textbook badge ---------- */
addScreen('Today’s mission', `
  <div style="display:flex; gap:44px; align-items:center; width:100%; justify-content:center;">
    <div style="max-width:580px;">
      <span class="source-badge">WE CAN 2 · UNIT 1 · GOALS 03–04</span>
      <h1 style="font-size:40px; color:#3d3356; margin:14px 0 6px;">Sing, count, and trick me!</h1>
      <div style="font-size:19px; color:#6e7b8b; margin-bottom:18px;">By the end, you can sing the clap song, say sixth to tenth, and catch my tricks.</div>
      ${[['a_official_clap_a.mp3','Sing: "If you\'re <b style="color:#d97706;">happy</b> and you <b style="color:#d97706;">know</b> it, <b style="color:#d97706;">clap</b> your <b style="color:#d97706;">hands</b>"','غُنَّ معي أغنية التصفيق'],
         ['a_t_line2.mp3','Say "<b style="color:#7b5ea7;">sixth</b> to <b style="color:#1f9d6c;">tenth</b>"','قُل من السادس إلى العاشر'],
         ['a_t_full_example.mp3','Fix my trick: "<b style="color:#d94f4f;">No</b>, it\'s the <b style="color:#d94f4f;">sixth</b> letter."','صحِّح خطأي']].map(([au,en,ar])=>`
        <div class="card" style="display:flex; align-items:center; gap:14px; padding:12px 18px; margin-bottom:12px;">
          <button class="speaker small" data-audio="${au}"></button>
          <div><div style="font-size:22px; color:#463a5e;">${en}</div>
          <div class="ar" style="font-size:17px; color:#7a8aa0;">${ar}</div></div>
        </div>`).join('')}
    </div>
    <div style="text-align:center;">
      <div style="position:relative; width:320px; margin:0 auto;">
        <img class="pic" src="${A}l2_confusion_book.png" style="width:100%; box-shadow:0 10px 26px rgba(0,0,0,.22); border-radius:10px;">
        <div style="position:absolute; top:-16px; right:-16px; background:#7b5ea7; color:#fff;
          font-weight:700; font-size:16px; padding:8px 14px; border-radius:20px; transform:rotate(6deg);
          box-shadow:0 4px 10px rgba(0,0,0,.25);">Pages 6–7</div>
      </div>
      <div style="margin-top:14px; font-size:19px; font-weight:700; color:#6a4fa3;">We Can 2 · Same as your school!</div>
      <div class="ar" style="font-size:16px; color:#7a8aa0; margin-top:4px;">نفس كتاب المدرسة</div>
    </div>
  </div>`);

/* ---------- S4 · chant full listen (official) ---------- */
addScreen('Listen · the chant', `
  <div style="text-align:center; width:100%;">
    <span class="source-badge">RHYTHMS AND LISTENING · CD1 05 · OFFICIAL AUDIO</span>
    <div style="margin-top:12px; font-size:26px; font-weight:800; color:#3d3356;">
      Listen and <span style="color:#d97706;">clap with them!</span></div>
    <div class="ar" style="font-size:18px; color:#7a8aa0; margin-top:4px;">استمع وصفِّق معهم</div>
    <div style="position:relative; width:860px; max-width:100%; margin:16px auto 0;">
      <img class="pic" src="${A}l2_clap_scene.png" style="width:100%; border-radius:14px; box-shadow:0 8px 22px rgba(60,40,10,.15);">
      <button class="speaker" data-audio="a_official_chant_all.mp3" data-toast="The whole chant — listen and do"
        style="position:absolute; bottom:16px; left:16px; width:72px; height:72px; background-size:34px;
          box-shadow:0 6px 16px rgba(74,58,110,.45); border:3px solid #fff;"></button>
      <div style="position:absolute; bottom:16px; right:16px; background:#fff; border-radius:16px;
        padding:8px 16px; font-size:16px; font-weight:800; color:#8a6d3b; box-shadow:0 4px 10px rgba(0,0,0,.15);">
        If You're Happy and You Know It</div>
    </div>
    <div class="teacher-only" style="margin-top:16px; justify-content:center; gap:12px;">
      <span class="pill" style="background:#e8f8f0; color:#187c50; font-size:14px;">♪ Official · sb_2 track 03 · full chant 2.5s→end · only the clap verse is a target; other verses are exposure</span>
    </div>
  </div>`);

/* ---------- S5 · clap verse input ①: lines 1–2 ---------- */
addScreen('The clap verse · lines 1–2', `
  <div style="display:flex; gap:36px; width:100%; align-items:center; justify-content:center;">
    <div style="width:300px; text-align:center;">
      <img class="pic" src="${A}l2_chant_girl.png" style="width:100%; max-height:400px; object-fit:contain;">
      <div style="font-size:16px; font-weight:700; color:#8a6d3b; margin-top:6px;">From your book, page 6</div>
    </div>
    <div style="width:640px;">
      <span class="source-badge">SING AFTER THE BOOK · OFFICIAL AUDIO</span>
      ${[['a_official_clap_a.mp3','1'], ['a_official_clap_b.mp3','2']].map(([au,n])=>`
      <div class="card" style="display:flex; align-items:center; gap:16px; padding:16px 22px; margin-top:14px;">
        <button class="speaker" data-audio="${au}"></button>
        <div>
          <div style="font-size:25px; font-weight:800; color:#463a5e; line-height:1.45;">
            If you're <b style="color:#d97706;">happy</b> and you <b style="color:#d97706;">know</b> it,
            <b style="color:#7b5ea7;">clap</b> your <b style="color:#7b5ea7;">hands</b>.
            <span style="font-size:24px;">👏 👏</span></div>
          <div class="ar" style="font-size:16px; color:#7a8aa0; margin-top:4px;">إذا كنت سعيدًا وتعرف ذلك، صفِّق بيديك</div>
        </div>
      </div>`).join('')}
      <div style="margin-top:12px; font-size:17px; color:#8a6d3b; font-weight:700;">Sing each line twice. Clap on 👏 👏!</div>
    </div>
  </div>`);

/* ---------- S6 · clap verse input ②: lines 3–4 + full verse ---------- */
addScreen('The clap verse · sing it all', `
  <div style="text-align:center; width:100%; max-width:900px;">
    <span class="source-badge">LINES 3–4 · THEN THE WHOLE VERSE</span>
    <div class="card" style="display:flex; align-items:center; gap:16px; padding:16px 22px; margin:16px 0;">
      <button class="speaker" data-audio="a_official_clap_c.mp3"></button>
      <div style="text-align:left;">
        <div style="font-size:24px; font-weight:800; color:#463a5e; line-height:1.5;">
          If you're <b style="color:#d97706;">happy</b> and you <b style="color:#d97706;">know</b> it,
          then your <b style="color:#d97706;">face</b> will surely <b style="color:#d97706;">show</b> it,<br>
          If you're <b style="color:#d97706;">happy</b> and you <b style="color:#d97706;">know</b> it,
          <b style="color:#7b5ea7;">clap</b> your <b style="color:#7b5ea7;">hands</b>. <span style="font-size:22px;">👏 👏</span></div>
        <div class="ar" style="font-size:16px; color:#7a8aa0; margin-top:4px;">إذا كنت سعيدًا وتعرف ذلك، سيظهر ذلك على وجهك</div>
      </div>
    </div>
    <button id="sing-all" style="height:64px; padding:0 34px; border:none; border-radius:32px; cursor:pointer;
      background:linear-gradient(135deg,#7b5ea7,#4a3a6e); color:#fff; font-size:24px; font-weight:800;
      box-shadow:0 4px 0 #4a3a6e;">♪ Sing the whole verse with the book!</button>
    <div style="display:flex; gap:14px; justify-content:center; margin-top:16px;">
      ${[1,2,3].map(n=>`<button class="sing-done" data-n="${n}" style="height:46px; padding:0 22px; border:none;
        border-radius:23px; background:#f3eefb; color:#4a3a6e; font-size:17px; font-weight:800; cursor:pointer;">We sang it! ×${n}</button>`).join('')}
    </div>
  </div>`, el=>({
  onEnter(){
    el.querySelector('#sing-all').onclick=()=>{ play('a_official_chant_clap.mp3'); toast('Sing together! Clap on the beat!'); };
    el.querySelectorAll('.sing-done').forEach(b=> b.onclick=()=>{
      b.style.background='#24a66a'; b.style.color='#fff'; b.textContent='✓ ×'+b.dataset.n;
      sfx('sfx_correct.mp3');
    });
  }
}));

/* ---------- S7 · ordinal input: sixth–tenth on the axis ---------- */
addScreen('New line numbers · sixth to tenth', `
  <div style="display:flex; gap:30px; width:100%; align-items:center; justify-content:center;">
    <div style="width:520px;">
      <img class="pic" src="${A}l2_ordinals.png" style="width:100%; box-shadow:0 8px 22px rgba(60,40,10,.15);">
      <div style="text-align:center; font-size:16px; font-weight:700; color:#8a6d3b; margin-top:6px;">Your book, page 7</div>
    </div>
    <div style="width:560px;">
      <div style="display:flex; align-items:center; gap:14px; margin-bottom:12px;">
        <button class="speaker small" data-audio="a_t_line.mp3" data-toast="first to fifth — fast review"></button>
        <div style="font-size:20px; font-weight:750; color:#6e7b8b;">You know: first … fifth</div>
      </div>
      <div style="display:flex; align-items:center; gap:14px; margin-bottom:14px;">
        <button class="speaker" data-audio="a_t_line2.mp3" data-toast="sixth to tenth — new!"></button>
        <div style="font-size:22px; font-weight:800; color:#3d3356;">New: sixth … tenth!</div>
      </div>
      ${ORD2.map(([w,c],k)=>`
        <div class="card" data-audio="a_t_${w}.mp3" style="display:flex; align-items:center; gap:16px; padding:8px 18px;
          margin-bottom:8px; cursor:pointer;">
          <span style="width:44px; height:44px; border-radius:50%; background:${c}; color:#fff; display:flex;
            align-items:center; justify-content:center; font-size:19px; font-weight:800;">${k+6}</span>
          <span style="font-size:26px; font-weight:800; color:#463a5e;">${w}</span>
        </div>`).join('')}
    </div>
  </div>`);

/* ---------- S8 · ordinal flash check 6–10 ---------- */
addScreen('Flash check · sixth to tenth', `
  <div style="text-align:center; width:100%;">
    <span class="source-badge">NO SOUND FIRST — YOU SAY IT</span>
    <div style="display:flex; gap:40px; justify-content:center; align-items:center; margin-top:18px;">
      <div class="card" style="width:340px; height:340px; display:flex; flex-direction:column; align-items:center; justify-content:center;">
        <div id="fc-num" style="font-size:130px; font-weight:800; color:#6a4fa3; line-height:1;">?</div>
        <div style="font-size:20px; color:#6e7b8b; margin-top:8px;">Say this number's word!</div>
      </div>
      <div style="width:380px;">
        <div id="fc-answer" class="card" style="min-height:110px; display:flex; align-items:center; justify-content:center;
          font-size:34px; font-weight:800; color:#3d3356;">Say it first!</div>
        <div style="display:flex; gap:14px; margin-top:18px; justify-content:center;">
          <button id="fc-reveal" style="height:52px; padding:0 30px; border:none; border-radius:26px;
            background:#d97706; color:#fff; font-size:20px; font-weight:750; cursor:pointer;
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
  const ORD=['sixth','seventh','eighth','ninth','tenth'];
  const COL={'sixth':'#7b5ea7','seventh':'#f59e0b','eighth':'#ec6ba0','ninth':'#d94f4f','tenth':'#1f9d6c'};
  let deck=[], di=0;
  function deal(){ deck=[0,1,2,3,4].sort(()=>Math.random()-.5); di=0; paint(); }
  function paint(){
    el.querySelector('#fc-num').textContent = di<5 ? (deck[di]+6) : '✓';
    el.querySelector('#fc-answer').textContent = di<5 ? 'Say it first!' : 'All five — great ears!';
    el.querySelector('#fc-round').textContent = di<5 ? ('Card '+(di+1)+' / 5') : 'Done!';
  }
  el.querySelector('#fc-reveal').onclick=()=>{
    if (di>=5) return;
    const w=ORD[deck[di]];
    el.querySelector('#fc-answer').innerHTML='<b style="color:'+COL[w]+';">'+w+'</b>';
    play('a_t_'+w+'.mp3');
  };
  el.querySelector('#fc-next').onclick=()=>{
    if (di<5){ di++; sfx('sfx_pop.mp3'); paint(); }
    else { deal(); }
  };
  return { onEnter(){ deal(); } };
});

/* ---------- S9 · Confusion Game demo ---------- */
addScreen('Confusion Game · watch the trick', `
  <div style="display:flex; gap:32px; width:100%; align-items:center; justify-content:center;">
    <div style="width:520px;">
      <img class="pic" src="${A}l2_confusion_book.png" style="width:100%; box-shadow:0 8px 22px rgba(60,40,10,.15);">
      <div style="text-align:center; font-size:16px; font-weight:700; color:#8a6d3b; margin-top:6px;">Fun Time · your book, page 7</div>
    </div>
    <div style="width:560px;">
      <span class="source-badge">CONFUSION GAME · TRY AND TRICK!</span>
      <div style="font-size:22px; font-weight:750; color:#3d3356; margin:12px 0;">I say something. <span style="color:#d94f4f;">Am I right — or am I tricking you?</span></div>
      <div class="card" style="display:flex; align-items:center; gap:14px; padding:14px 20px; margin-bottom:12px;">
        <button class="speaker" data-audio="a_t_f_seventh.mp3"></button>
        <div style="font-size:23px; font-weight:800; color:#463a5e;">"F is the <b style="color:#d94f4f;">seventh</b> letter of the alphabet."</div>
      </div>
      <div id="demo-verdict" style="display:flex; gap:14px; margin-bottom:12px;">
        <button class="demo-btn" data-ok="0" style="flex:1; height:56px; border:none; border-radius:16px; cursor:pointer;
          background:#24a66a; color:#fff; font-size:21px; font-weight:800; box-shadow:0 3px 0 #187c50;">Right! ✓</button>
        <button class="demo-btn" data-ok="1" style="flex:1; height:56px; border:none; border-radius:16px; cursor:pointer;
          background:#d94f4f; color:#fff; font-size:21px; font-weight:800; box-shadow:0 3px 0 #a33030;">It's a trick! ✗</button>
      </div>
      <div id="demo-fix" class="card" style="display:none; padding:14px 20px; border:2px solid #d94f4f;">
        <div style="display:flex; align-items:center; gap:14px;">
          <button class="speaker small" data-audio="a_t_full_example.mp3"></button>
          <div style="font-size:22px; font-weight:800; color:#463a5e;">"No, it's the <b style="color:#7b5ea7;">sixth</b> letter. G is the seventh letter."</div>
        </div>
        <div class="ar" style="font-size:16px; color:#7a8aa0; margin-top:6px;">لا، إنه الحرف السادس. G هو الحرف السابع</div>
      </div>
    </div>
  </div>`, el=>({
  onEnter(){
    el.querySelectorAll('.demo-btn').forEach(b=> b.onclick=()=>{
      if (b.dataset.ok==='1'){
        sfx('sfx_correct.mp3');
        el.querySelector('#demo-fix').style.display='block';
        setTimeout(()=> play('a_t_full_example.mp3'), 350);
        toast('You caught the trick!');
      } else { sfx('sfx_wrong.mp3'); toast('Count the letters: A-B-C-D-E-F…'); }
    });
  }
}));

/* ---------- S11 · guided tricks: one card at a time ---------- */
addScreen('Confusion Game · your turn', `
  <div style="text-align:center; width:100%; max-width:860px;">
    <span class="source-badge">YOUR TURN · SAY THE FIX OUT LOUD FIRST</span>
    <div style="display:flex; gap:7px; justify-content:center; margin:16px 0 20px;">
      ${['A','B','C','D','E','F','G','H','I','J'].map((L,k)=>`
        <span style="display:inline-flex; flex-direction:column; width:52px; height:58px; align-items:center; justify-content:center;
          background:#fff; border:2px solid #e3d5b8; border-radius:12px;">
          <b style="font-size:21px; color:#6a4fa3; line-height:1;">${L}</b>
          <i style="font-size:12px; color:#a08c5b; font-style:normal; margin-top:2px;">${k+1}</i></span>`).join('')}
    </div>
    <div class="card" style="padding:28px 34px;">
      <div id="gt-round" style="font-size:16px; font-weight:800; color:#8a6d3b; margin-bottom:14px;">Card 1 / 4</div>
      <div style="display:flex; align-items:center; gap:18px; justify-content:center;">
        <button id="gt-play" class="speaker" style="width:72px; height:72px; background-size:34px;"></button>
        <div id="gt-say" style="font-size:27px; font-weight:800; color:#463a5e;"></div>
      </div>
      <div style="margin-top:18px; font-size:19px; color:#6e7b8b; font-weight:700;">Your fix, out loud: "No, it's the ___ letter." — or "Yes!"</div>
      <div id="gt-ans" class="card" style="display:none; margin:16px auto 0; max-width:520px; padding:14px 20px;
        font-size:24px; font-weight:800; color:#1f9d6c; border:2px solid #1f9d6c;"></div>
      <div style="margin-top:18px; display:flex; gap:14px; justify-content:center;">
        <button id="gt-check" style="height:54px; padding:0 30px; border:none; border-radius:27px; cursor:pointer;
          background:#d97706; color:#fff; font-size:20px; font-weight:800; box-shadow:0 3px 0 #b45309;">I said it — check!</button>
        <button id="gt-next" style="height:54px; padding:0 30px; border:none; border-radius:27px; cursor:pointer;
          background:#6a4fa3; color:#fff; font-size:20px; font-weight:800; box-shadow:0 3px 0 #4a3a6e; display:none;">Next card →</button>
      </div>
    </div>
  </div>`, el=>{
  const DECK=[
    {q:'a_t_f_seventh.mp3', say:'"F is the seventh letter."', a:'a_t_no_sixth.mp3',  at:'No, it\'s the <b>sixth</b> letter.'},
    {q:'a_t_j_tenth.mp3',   say:'"J is the tenth letter."',   a:'a_t_yes_right.mp3', at:'<b>Yes!</b> J is the tenth letter.'},
    {q:'a_t_h_ninth.mp3',   say:'"H is the ninth letter."',   a:'a_t_no_eighth.mp3', at:'No, it\'s the <b>eighth</b> letter.'},
    {q:'a_t_b_first.mp3',   say:'"B is the first letter."',   a:'a_t_no_second.mp3', at:'No, it\'s the <b>second</b> letter.'}
  ];
  let di=0;
  function paint(){
    el.querySelector('#gt-round').textContent = di<4 ? ('Card '+(di+1)+' / 4') : 'All four — great fixing!';
    el.querySelector('#gt-say').innerHTML = di<4 ? DECK[di].say : '✓ ✓ ✓ ✓';
    el.querySelector('#gt-ans').style.display='none';
    el.querySelector('#gt-check').style.display = di<4 ? '' : 'none';
    el.querySelector('#gt-next').style.display='none';
    el.querySelector('#gt-play').style.display = di<4 ? '' : 'none';
  }
  el.querySelector('#gt-play').onclick=()=>{ if(di<4) play(DECK[di].q); };
  el.querySelector('#gt-check').onclick=()=>{
    if (di>=4) return;
    const ans=el.querySelector('#gt-ans');
    ans.innerHTML=DECK[di].at; ans.style.display='block';
    sfx('sfx_correct.mp3'); play(DECK[di].a);
    el.querySelector('#gt-check').style.display='none';
    el.querySelector('#gt-next').style.display='';
  };
  el.querySelector('#gt-next').onclick=()=>{ di++; sfx('sfx_pop.mp3'); paint();
    if(di<4) setTimeout(()=>play(DECK[di].q), 400); else sfx('sfx_success.mp3'); };
  return { onEnter(){ di=0; paint(); setTimeout(()=>play(DECK[0].q), 400); } };
});

/* ---------- S11 · Trick Star: main game, no frames ---------- */
addScreen('Trick Star · the real game', `
  <div style="width:100%; max-width:1020px; text-align:center;">
    <div style="display:flex; align-items:center; justify-content:center; gap:16px; margin-bottom:10px;">
      <span class="source-badge">TRICK STAR · NO HELP NOW</span>
      <span id="ts-stars" style="font-size:26px; letter-spacing:4px;">☆☆☆☆☆☆</span>
    </div>
    <div style="font-size:23px; font-weight:800; color:#3d3356; margin-bottom:14px;">
      Listen to my card. Then tap <span style="color:#24a66a;">Right</span> or <span style="color:#d94f4f;">Trick</span>.
      <span class="ar" style="font-size:16px; color:#7a8aa0; font-weight:700;"> · استمع ثم اضغط صح أم خطأ</span></div>
    <div style="display:flex; gap:22px; align-items:center; justify-content:center;">
      <div style="position:relative; width:430px;">
        <img class="pic" src="${A}l2_confusion_bg.png" style="width:100%; border-radius:14px; box-shadow:0 8px 22px rgba(60,40,10,.15);">
      </div>
      <div style="width:480px;">
        <div style="display:flex; align-items:center; gap:14px; justify-content:center; margin-bottom:12px;">
          <button id="ts-play" class="speaker" style="width:72px; height:72px; background-size:34px;"></button>
          <span id="ts-round" class="card" style="padding:8px 18px; font-size:18px; font-weight:800; color:#8a6d3b;">Card 1 / 6</span>
        </div>
        <div style="display:flex; gap:14px; margin-bottom:12px;">
          <button id="ts-right" style="flex:1; height:60px; border:none; border-radius:16px; cursor:pointer;
            background:#24a66a; color:#fff; font-size:23px; font-weight:800; box-shadow:0 3px 0 #187c50;">Right! ✓</button>
          <button id="ts-trick" style="flex:1; height:60px; border:none; border-radius:16px; cursor:pointer;
            background:#d94f4f; color:#fff; font-size:23px; font-weight:800; box-shadow:0 3px 0 #a33030;">Trick! ✗</button>
        </div>
        <div id="ts-ans" class="card" style="display:none; padding:14px 18px; font-size:21px; font-weight:800;
          color:#463a5e; text-align:center;"></div>
      </div>
    </div>
  </div>`, el=>{
  const DECK=[
    {q:'a_t_c_fourth.mp3', trick:true,  fix:'a_t_no_third.mp3',  txt:'No, it\'s the <b>third</b> letter.'},
    {q:'a_t_e_fifth.mp3',  trick:false, fix:'a_t_yes_right.mp3', txt:'<b>Yes!</b> E is the fifth letter.'},
    {q:'a_t_i_ninth.mp3',  trick:false, fix:'a_t_yes_right.mp3', txt:'<b>Yes!</b> I is the ninth letter.'},
    {q:'a_t_f_seventh.mp3',trick:true,  fix:'a_t_no_sixth.mp3',  txt:'No, it\'s the <b>sixth</b> letter.'},
    {q:'a_t_d_fourth.mp3', trick:false, fix:'a_t_yes_right.mp3', txt:'<b>Yes!</b> D is the fourth letter.'},
    {q:'a_t_h_ninth.mp3',  trick:true,  fix:'a_t_no_eighth.mp3', txt:'No, it\'s the <b>eighth</b> letter.'}
  ];
  let di=0, stars=0, answered=false;
  function paint(){
    el.querySelector('#ts-round').textContent = di<6 ? ('Card '+(di+1)+' / 6') : 'Done!';
    el.querySelector('#ts-stars').textContent = '★'.repeat(stars)+'☆'.repeat(Math.max(0,6-stars));
    el.querySelector('#ts-stars').style.color = '#f59e0b';
    el.querySelector('#ts-ans').style.display='none';
    answered=false;
  }
  function playCard(){ if (di<6) play(DECK[di].q); }
  function judge(saidTrick){
    if (di>=6 || answered) return;
    answered=true;
    const card=DECK[di];
    const correct = (saidTrick===card.trick);
    const ans=el.querySelector('#ts-ans');
    ans.innerHTML = card.txt; ans.style.display='block';
    ans.style.border = correct ? '2px solid #1f9d6c' : '2px solid #d94f4f';
    if (correct){ stars++; sfx('sfx_correct.mp3'); }
    else sfx('sfx_wrong.mp3');
    setTimeout(()=> play(card.fix), 300);
    el.querySelector('#ts-stars').textContent = '★'.repeat(stars)+'☆'.repeat(Math.max(0,6-stars));
    setTimeout(()=>{ di++; sfx('sfx_pop.mp3');
      if (di<6){ paint(); setTimeout(playCard, 600); }
      else { paint(); if (stars>=5) sfx('sfx_success.mp3'); toast('Trick Star: '+stars+' / 6'); }
    }, 2600);
  }
  el.querySelector('#ts-play').onclick=playCard;
  el.querySelector('#ts-right').onclick=()=>judge(false);
  el.querySelector('#ts-trick').onclick=()=>judge(true);
  return { onEnter(){ di=0; stars=0; paint(); setTimeout(playCard, 500); } };
});

/* ---------- S12 · Sounds: cap / clap / lock / clock (receptive) ---------- */
addScreen('Sounds · listen and tap the picture', `
  <div style="text-align:center; width:100%; max-width:920px;">
    <span class="source-badge">SOUNDS AND LETTERS · PRACTICE MODEL (CD1 06 PENDING)</span>
    <div style="font-size:24px; font-weight:750; color:#3d3356; margin:12px 0 4px;">
      Listen → tap the matching picture</div>
    <div class="ar" style="font-size:17px; color:#7a8aa0; margin-bottom:14px;">استمع واضغط الصورة الصحيحة</div>
    <div style="display:flex; align-items:center; gap:16px; justify-content:center; margin-bottom:16px;">
      <button id="sd-play" class="speaker" style="width:64px; height:64px;"></button>
      <span id="sd-round" class="card" style="padding:6px 16px; font-size:17px; font-weight:800; color:#8a6d3b;">1 / 4</span>
    </div>
    <div style="display:flex; gap:20px; justify-content:center;">
      ${[['cap','l2_snd_cap.png'],['clap','l2_snd_clap.png'],['lock','l2_snd_lock.png'],['clock','l2_snd_clock.png']].map(([w,img])=>`
      <div class="card sd-pic" data-w="${w}" style="cursor:pointer; padding:14px; width:200px;">
        <img class="pic" src="${A}${img}" style="width:100%; height:130px; object-fit:contain;">
        <div style="font-size:21px; font-weight:800; color:#463a5e; margin-top:8px;">${w}</div>
      </div>`).join('')}
    </div>
  </div>`, el=>{
  const WORDS=['cap','clap','lock','clock'];
  const AU={'cap':'a_t_cap.mp3','clap':'a_t_clap_word.mp3','lock':'a_t_lock.mp3','clock':'a_t_clock.mp3'};
  let deck=[], di=0;
  function deal(){ deck=[...WORDS].sort(()=>Math.random()-.5); di=0; paint(); }
  function paint(){ el.querySelector('#sd-round').textContent = di<4 ? (di+1)+' / 4' : 'Done!';
    el.querySelectorAll('.sd-pic').forEach(p=>{ p.style.border=''; p.style.background=''; }); }
  function playW(){ if (di<4) play(AU[deck[di]]); }
  el.querySelector('#sd-play').onclick=playW;
  el.querySelectorAll('.sd-pic').forEach(p=> p.onclick=()=>{
    if (di>=4) return;
    if (p.dataset.w===deck[di]){
      sfx('sfx_correct.mp3'); p.style.border='3px solid #1f9d6c'; p.style.background='#e8f8f0';
      di++; setTimeout(()=>{ paint(); if(di<4){ playW(); } else { sfx('sfx_success.mp3'); toast('All four! Great ears!'); } }, 700);
    } else { sfx('sfx_wrong.mp3'); toast('Listen again!'); playW(); }
  });
  return { onEnter(){ deal(); setTimeout(playW, 400); } };
});

/* ---------- S14 · Check 1, station 1: sing the clap verse, no words ---------- */
addScreen('Check 1 · sing', `
  <div style="text-align:center; width:100%; max-width:820px;">
    <span class="source-badge">CHECK 1 · STATION 1 OF 2 · NO WORDS ON SCREEN</span>
    <div style="font-size:32px; font-weight:800; color:#3d3356; margin:16px 0 8px;">Sing the clap verse!</div>
    <div style="font-size:20px; color:#6e7b8b; margin-bottom:24px;">The book sings with you — your voice sings the keywords:<br><b style="color:#d97706;">happy · know · clap your hands</b></div>
    <button class="speaker" data-audio="a_official_chant_clap.mp3" data-toast="Sing with the book!" style="width:88px; height:88px; background-size:42px;"></button>
    <div style="margin-top:16px; font-size:34px;">👏 👏</div>
  </div>`);

/* ---------- S15 · Check 1, station 2: fix two tricks, no frames ---------- */
addScreen('Check 1 · fix my tricks', `
  <div style="text-align:center; width:100%; max-width:820px;">
    <span class="source-badge">CHECK 1 · STATION 2 OF 2 · NO FRAMES</span>
    <div style="font-size:32px; font-weight:800; color:#3d3356; margin:16px 0 8px;">Fix my two tricks!</div>
    <div style="font-size:20px; color:#6e7b8b; margin-bottom:24px;">Listen to each one. Out loud: "No, it's the ___ letter."</div>
    <div style="display:flex; gap:24px; justify-content:center;">
      <button class="speaker" data-audio="a_t_h_ninth.mp3" data-toast="Trick 1 — fix me!" style="width:88px; height:88px; background-size:42px;"></button>
      <button class="speaker" data-audio="a_t_f_seventh.mp3" data-toast="Trick 2 — fix me!" style="width:88px; height:88px; background-size:42px;"></button>
    </div>
  </div>
  <div class="teacher-only" style="position:absolute; left:44px; right:44px; bottom:16px; gap:8px; align-items:center; justify-content:center;">
    <span class="pill" style="background:#3d3356;color:#fff;">Error:</span>
    <button class="pill error-tag" data-error="ordinal-border">fifth/sixth border mix</button>
    <button class="pill error-tag" data-error="fix-breaks">Fix sentence breaks</button>
    <button class="pill error-tag" data-error="chant-silent">Chant keywords silent</button>
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
  <div style="display:grid; grid-template-columns:400px 1fr; gap:48px; align-items:center; width:100%; max-width:1080px;">
    <div class="card" style="height:420px; display:flex; align-items:center; justify-content:center; padding:16px;">
      <img src="${A}l2_confusion_bg.png" style="width:100%; height:100%; object-fit:cover; border-radius:14px;" alt="game friends">
    </div>
    <div>
      <span class="source-badge">HELP FADES → CHECK 2</span>
      <h1 style="font-size:40px; color:#3d3356; margin:14px 0 12px;">Fix the fix, sing again</h1>
      <div id="repair-view" class="card" style="min-height:170px; display:flex; align-items:center; justify-content:center;
        text-align:center; font-size:27px; font-weight:800; color:#3d3356; line-height:1.5; padding:16px 22px;">
        <button class="speaker" data-audio="a_t_full_example.mp3"></button>
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
    ()=>{ view.innerHTML='<div><div style="font-size:40px;">🃏</div><div style="font-size:23px;">No, it\'s the sixth letter.</div><div class="ar" style="display:block;color:#24a66a;font-size:21px;">لا، إنه الحرف السادس · لا = No</div></div>'; },
    /* 2 Slow */
    ()=>{ view.innerHTML='<div style="font-size:23px;">Listen slowly.</div>'; playSlow('a_t_full_example.mp3'); },
    /* 3 Contrast — fifth/sixth border + right vs trick */
    ()=>{ view.innerHTML=`<div style="display:flex; flex-direction:column; gap:10px; font-size:21px;">
        <div style="display:flex; gap:10px; align-items:center; justify-content:center;">
          <span class="card" style="padding:8px 14px; color:#4a3a6e; border:2px solid #4a3a6e;">5 = fifth</span>
          <span style="color:#24a66a; font-weight:800;">→</span>
          <span class="card" style="padding:8px 14px; color:#7b5ea7; border:2px solid #7b5ea7;">6 = sixth</span>
        </div>
        <div style="display:flex; gap:10px; align-items:center; justify-content:center;">
          <span class="card" style="padding:8px 14px; color:#d94f4a; text-decoration:line-through;">F = seventh</span>
          <span style="color:#24a66a; font-weight:800;">→</span>
          <span class="card" style="padding:8px 14px; color:#1f9d6c; border:2px solid #1f9d6c;">F = sixth</span>
        </div></div>`; },
    /* 4 Model */
    ()=>{ view.innerHTML='<div style="font-size:22px;">Watch me. Then you.<br><span style="color:#7b5ea7;">No, it\'s the sixth letter.</span></div>'; play('a_t_no_sixth.mp3'); },
    /* 5 Build */
    ()=>{ view.innerHTML=`<div style="display:flex; gap:8px; justify-content:center; font-size:20px;">
        <span class="pill coral">No,</span><span class="pill blue">it's the</span><span class="pill blue">sixth</span><span class="pill blue">letter.</span></div>`; },
    /* 6 Hide help */
    ()=>{ view.innerHTML='<div style="font-size:22px;color:#6e7b8b;">No words now. Just fix me.</div>'; },
    /* 7 Try again = Check 2: fresh C trick + chant re-run */
    ()=>{ view.innerHTML='<div style="display:flex; flex-direction:column; gap:12px; align-items:center;"><div style="font-size:21px;">New trick — fix me! Then sing the clap verse once more.</div><div style="display:flex; gap:14px;"><button class="speaker" data-audio="a_t_c_fourth.mp3" data-toast="Check 2 trick — fix me!"></button><button class="speaker" data-audio="a_official_chant_clap.mp3" data-toast="Check 2 chant — sing!"></button></div></div>'; toast('Check 2 — fix the trick, then sing.'); }
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
  return { onEnter(){ nextStep=0; view.innerHTML='<button class="speaker" data-audio="a_t_full_example.mp3"></button>';
    el.querySelectorAll('.repair-step').forEach(b=>{b.style.background='#f3eefb';b.style.color='#4a3a6e';}); } };
});

/* ---------- S15 · school practice 1: complete the chant line ---------- */
addScreen('School practice 1 · listen and complete', `
  <div style="width:100%; max-width:760px; text-align:center;">
    <span class="source-badge">SCHOOL-STYLE PRACTICE · 1 OF 2</span>
    <div style="font-size:22px; font-weight:750; color:#3d3356; margin:16px 0 20px;">
      Say your answer first — then listen and tap the missing word.
      <span class="ar" style="font-size:16px; color:#7a8aa0;"> · قُل إجابتك أولًا ثم استمع واضغط الكلمة الناقصة</span></div>
    <div style="display:flex; align-items:center; justify-content:center; gap:16px; margin-bottom:14px;">
      <button class="speaker" data-audio="a_official_clap_a.mp3" data-toast="Listen — what word is missing?"></button>
      <div class="card" style="padding:14px 22px; font-size:25px; font-weight:800; color:#463a5e;">
        If you're happy and you know it, <span style="color:#d94f4f;">___</span> your hands.</div>
    </div>
    <div id="ex-opts" style="display:flex; gap:18px; justify-content:center;">
      ${[['clap',1],['stamp',0],['snap',0]].map(([w,ok])=>`
      <div class="card ex-o" data-ok="${ok}" style="padding:18px 30px; cursor:pointer;
        font-size:28px; font-weight:800; color:#463a5e;">${w}</div>`).join('')}
    </div>
  </div>`, el=>{
  el.querySelectorAll('.ex-o').forEach(o=> o.onclick=()=>{
    if (o.dataset.ok==='1'){ sfx('sfx_success.mp3'); o.style.background='#d9f2e5'; o.style.border='2px solid #1f9d6c';
      play('a_t_clap_hands.mp3'); toast('clap your hands!'); }
    else { sfx('sfx_wrong.mp3'); toast('Listen again!'); play('a_official_clap_a.mp3'); }
  });
});

/* ---------- S16 · school practice 2: pick the fix ---------- */
addScreen('School practice 2 · listen and choose the fix', `
  <div style="width:100%; max-width:760px; text-align:center;">
    <span class="source-badge">SCHOOL-STYLE PRACTICE · 2 OF 2</span>
    <div style="font-size:22px; font-weight:750; color:#3d3356; margin:16px 0 20px;">
      Say the fix out loud — then listen and tap the matching sentence.
      <span class="ar" style="font-size:16px; color:#7a8aa0;"> · قُل التصحيح بصوت عالٍ ثم استمع واضغط الجملة الصحيحة</span></div>
    <div style="margin-bottom:18px;">
      <button class="speaker" data-audio="a_t_f_seventh.mp3" data-toast='"F is the seventh letter of the alphabet."'></button>
    </div>
    <div id="ex-opts2" style="max-width:560px; margin:0 auto;">
      ${[["No, it's the sixth letter.",1],["No, it's the eighth letter.",0],["Yes, that's right!",0]].map(([t,ok])=>`
      <div class="card ex-o2" data-ok="${ok}" style="padding:16px 22px; margin-bottom:14px; cursor:pointer;
        font-size:23px; font-weight:800; color:#463a5e; text-align:center;">${t}</div>`).join('')}
    </div>
  </div>`, el=>{
  el.querySelectorAll('.ex-o2').forEach(o=> o.onclick=()=>{
    if (o.dataset.ok==='1'){ sfx('sfx_success.mp3'); o.style.background='#d9f2e5'; o.style.border='2px solid #1f9d6c';
      play('a_t_no_sixth.mp3'); toast('Fix nailed!'); }
    else { sfx('sfx_wrong.mp3'); toast('Count again: A-B-C-D-E-F!'); }
  });
});

/* ---------- S17 · evidence-based achievement ---------- */
addScreen('Learning record', `
  <div style="text-align:center;">
    <span class="source-badge">TODAY’S EVIDENCE</span>
    <h1 class="title" style="margin:12px 0 6px;">I can sing and catch tricks!</h1>
    <div class="ar" style="font-size:18px; color:#7a8aa0; margin-bottom:22px;">اليوم أستطيع أن أقول</div>
    <div style="display:flex; gap:30px; justify-content:center;">
      ${[['Sing the clap verse','a_official_chant_clap.mp3','#f59e0b'],['Say sixth to tenth','a_t_line2.mp3','#7b5ea7'],['Fix a trick','a_t_full_example.mp3','#24a66a']]
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
      <span class="pill" style="background:#fff3d6; color:#b45309; font-size:17px;">Badge: Happy Chanter</span>
    </div>
    <div id="ability-level" class="card" style="display:inline-flex; margin-top:16px; padding:10px 20px; font-size:19px; font-weight:800; color:#3d3356;">Level: not recorded</div>
  </div>`, el=>({
  onEnter(){
    const level=assessment.check2 || assessment.check1 || 'Not recorded';
    const copy={A:'A · Independent',B:'B · With help, then independent',C:'C · Keep practising','Not recorded':'Not recorded'}[level];
    const colors={A:'#24a66a',B:'#ffc84a',C:'#f59e0b','Not recorded':'#e5edf2'};
    const box=el.querySelector('#ability-level'); box.textContent='Level: '+copy; box.style.borderColor=colors[level];
    try{ localStorage.setItem('khusoosi:wc2-u1-l2:result', level);
      localStorage.setItem('khusoosi:wc2-u1-l2:errors', JSON.stringify([...assessment.errors])); }catch(e){}
    if(level!=='Not recorded') setTimeout(()=>sfx('sfx_success.mp3'),250);
  }
}));

/* ---------- S18 · exit task + home review ---------- */
addScreen('Exit task · Home review', `
  <div style="display:flex; gap:40px; width:100%; justify-content:center; align-items:stretch;">
    <div class="card" style="width:520px; padding:26px 30px; text-align:center;">
      <div style="font-size:26px; font-weight:750; color:#3d3356; margin-bottom:6px;">One last trick — fix me!</div>
      <div class="ar" style="font-size:16px; color:#7a8aa0; margin-bottom:16px;">صحِّح خطأي الأخير</div>
      <div style="display:flex; align-items:center; gap:14px; justify-content:center; margin-bottom:14px;">
        <button class="speaker" data-audio="a_t_b_first.mp3" data-toast='"B is the first letter." — fix me!'></button>
        <div style="font-size:22px; font-weight:800; color:#463a5e; text-align:left;">"B is the first letter."<br><span style="color:#6e7b8b; font-size:18px;">Your fix: "No, it's the ___ letter."</span></div>
      </div>
      <button id="exit-reveal" class="pill" style="background:#f3eefb;color:#4a3a6e;">Check the fix</button>
      <div id="exit-ans" style="display:none; margin-top:12px; font-size:24px; font-weight:800; color:#1f9d6c;">"No, it's the second letter."</div>
      <button id="exit-sing" style="display:block; margin:18px auto 0; height:52px; padding:0 26px; border:none;
        border-radius:26px; background:linear-gradient(135deg,#7b5ea7,#4a3a6e); color:#fff; font-size:19px;
        font-weight:800; cursor:pointer; box-shadow:0 3px 0 #4a3a6e;">♪ Sing the clap verse one last time</button>
    </div>
    <div class="card" style="width:520px; padding:26px 30px; text-align:center;">
      <div style="font-size:26px; font-weight:700; color:#463a5e; margin-bottom:6px;">Homework</div>
      <div class="ar" style="font-size:16px; color:#7a8aa0; margin-bottom:16px;">الواجب المنزلي</div>
      <div style="font-size:22px; font-weight:700; color:#8a6d3b; margin-bottom:14px; line-height:1.5;">Sing the clap verse to someone at home.<br>Play the Confusion Game: trick them with a letter!</div>
      <div style="background:#fdf6ec; border:2px dashed #d9c9a3; border-radius:16px; padding:14px 18px;">
        <div style="font-size:21px; font-weight:750; color:#3d3356;">Home review · four stations</div>
        <div style="font-size:15px; color:#a08c5b; margin-top:4px;">words → listen & choose → sing the chant → exam style</div>
      </div>
      <a href="review/" target="_blank" style="display:flex; align-items:center; justify-content:center; gap:12px;
        margin-top:14px; background:#24a66a; border-radius:16px; padding:16px 14px; text-decoration:none;
        box-shadow:0 3px 0 #187c50;">
        <span style="font-size:22px; font-weight:800; color:#fff;">Open home review →</span>
      </a>
      <div style="font-size:15px; color:#8a6d3b; margin-top:10px; font-weight:700;">Teacher: copy this link and send it to the parent</div>
    </div>
  </div>`, el=>{
  el.querySelector('#exit-reveal').onclick=()=>{
    el.querySelector('#exit-ans').style.display='block'; play('a_t_no_second.mp3'); };
  el.querySelector('#exit-sing').onclick=()=>{ play('a_official_chant_clap.mp3'); toast('Sing together!'); };
  return { onEnter(){ el.querySelector('#exit-ans').style.display='none'; } };
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
