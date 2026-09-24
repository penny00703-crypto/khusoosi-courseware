/* We Can 1 · Unit 2 · L1 · Eyes, Hands, Okay!
   Blueprint V1.0 · 17 screens · 25 minutes · teacher-led 1v1 */
const A = 'assets/';
const $ = s => document.querySelector(s);
let curAudio = null;
let officialStopTimer = null;

function stopAudio(){
  clearTimeout(officialStopTimer);
  if(curAudio){ curAudio.pause(); curAudio.currentTime = 0; curAudio = null; }
}
function playOfficial(start=0, end=null){
  stopAudio();
  curAudio = new Audio(A + 'a_official_cd1_14_15.mp3');
  curAudio.currentTime = start;
  curAudio.play().catch(()=>{});
  if(end) officialStopTimer = setTimeout(stopAudio, Math.max(0,(end-start)*1000));
}
let curSfx = null;
function sfx(name){
  try{ if(curSfx)curSfx.pause(); curSfx=new Audio(A+name); curSfx.play().catch(()=>{}); }catch(e){}
}
let toastTimer=null;
function toast(message){
  const el=$('#toast'); el.textContent=message; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('show'),1700);
}

const COMMANDS = [
  {id:'close', text:'Close your eyes.', ar:'أغمض عينيك', visual:'eyes-left',audio:'a_t_close_eyes.mp3',slow:'a_t_close_eyes_slow.mp3'},
  {id:'open', text:'Open your eyes.', ar:'افتح عينيك', visual:'eyes-right',audio:'a_t_open_eyes.mp3',slow:'a_t_open_eyes_slow.mp3'},
  {id:'raise', text:'Raise your hands.', ar:'ارفع يديك', visual:'hands-left',audio:'a_t_raise_hands.mp3',slow:'a_t_raise_hands_slow.mp3'},
  {id:'clap', text:'Clap your hands.', ar:'صفّق بيديك', visual:'hands-right',audio:'a_t_clap_hands.mp3',slow:'a_t_clap_hands_slow.mp3'}
];
const commandById = id => COMMANDS.find(x=>x.id===id);
const visual = (cmd, label='', cls='', withAudio=false) => `<div class="action-card ${cls}" data-command="${cmd.id}">
  <div class="action-visual ${cmd.visual}"></div>${label?`<div style="font-size:22px;font-weight:850;margin-top:10px;text-align:center;">${label}</div>`:''}${withAudio?`<button class="speaker small" data-audio="${cmd.audio}" aria-label="Play ${cmd.text}"></button>`:''}</div>`;

const assessment = {
  check1:{close:null,open:null,raise:null,clap:null,active:null,okay:null},
  check2:null, errors:new Set(), repairTarget:null
};

const TEACHER_GUIDES = [
  '<b>Set up:</b> Keep this under one minute. The camera must show the learner’s upper body. Use the official-audio button only to confirm sound.',
  '<b>Quick check:</b> Say “Hello” and ask for one familiar color. Do not score this as Unit 2. Then point to your eyes and hands.',
  '<b>Promise:</b> Today the learner will understand four body commands and give one eyes command independently.',
  '<b>Input:</b> Model close and open once with your own eyes. Then keep your face still and let the learner respond to the picture.',
  '<b>Input:</b> Model raise and clap once. Keep the two actions clearly different.',
  '<b>Routine:</b> You give one command. The learner does it, then says “Okay!” Record Okay separately from command comprehension.',
  '<b>Listening:</b> Click New command. Read the Teacher cue exactly once. The learner taps the matching picture. No Arabic unless the learner is stuck during practice.',
  '<b>Book connection:</b> Play the official CD1 14–15 long track. Stop after the relevant classroom pass if needed; do not present generated speech as official audio.',
  '<b>Guided:</b> Read each command. Learner performs and says Okay. Use the visible sentence only during this supported round.',
  '<b>Fast response:</b> Play one command. The learner moves before you reveal the small answer picture. Use four rounds; do not show the answer first.',
  '<b>Role swap:</b> Learner chooses Close or Open and commands the on-screen learner. Accept one clear complete command.',
  '<b>Boss Rush:</b> Play the command, then let the learner compare it with the changing action picture and choose Match or Not a match. This is listening judgement, not another movement round.',
  '<b>Check 1:</b> Hide Arabic, sentence frames and teacher actions. Read four commands in order. Add one active Close/Open prompt and record Okay separately.',
  '<b>Repair:</b> Select only one failed target. Follow Meaning → Slow → Contrast → Model → Build → Hide help → Try again. Check 2 uses a different command or picture.',
  '<b>Textbook task:</b> Use a new order. Learner completes two real actions and gives one Close/Open command before any click.',
  '<b>Record:</b> Keep Check 1 evidence visible. Check 2 improvement is separate and never overwrites the original result.',
  '<b>Exit:</b> Learner looks at one picture and gives the command. Help reveals only the first word. Then the family scans the lesson-specific QR to open the four-station review.'
];

const screensHost=$('#screens');
const screens=[];
function addScreen(objective, html, init){
  const el=document.createElement('section'); el.className='screen'; el.innerHTML=html;
  screensHost.appendChild(el); const api=init?init(el):{};
  screens.push({objective,el,onEnter:api.onEnter,onLeave:api.onLeave});
}
let cur=0;
function show(i){
  i=Math.max(0,Math.min(screens.length-1,i));
  if(screens[cur]?.onLeave)screens[cur].onLeave();
  stopAudio(); cur=i;
  screens.forEach((s,k)=>s.el.classList.toggle('active',k===i));
  $('#objective').textContent=screens[i].objective;
  $('#teacher-copy').innerHTML=TEACHER_GUIDES[i]||'';
  $('#page-num').textContent=`${i+1} / ${screens.length}`;
  $('#progress').style.width=`${(i+1)/screens.length*100}%`;
  $('#btn-prev').disabled=i===0; $('#btn-next').disabled=i===screens.length-1;
  document.querySelectorAll('#thumbs button').forEach((b,k)=>b.classList.toggle('cur',k===i));
  if(i>=12)document.body.classList.remove('ar-on');
  if(screens[i].onEnter)screens[i].onEnter();
}
function fit(){ $('#stage').style.transform=`scale(${Math.min(innerWidth/1280,innerHeight/720)})`; }
addEventListener('resize',fit);

(()=>{ const w=$('#watermark'); for(let y=0;y<5;y++)for(let x=0;x<4;x++){
  const sp=document.createElement('span'); sp.textContent='khusoosi · خصوصي';
  sp.style.left=`${x*340+(y%2)*120}px`; sp.style.top=`${y*150+20}px`; w.appendChild(sp);
}})();
$('#btn-ar').onclick=()=>{ if(cur>=12){toast('Arabic is hidden during independent checks');return;}
  const on=document.body.classList.toggle('ar-on'); $('#btn-ar').setAttribute('aria-pressed',on); };
$('#btn-teacher').onclick=()=>{ const on=document.body.classList.toggle('teacher-on'); $('#btn-teacher').setAttribute('aria-pressed',on); };
$('#btn-prev').onclick=()=>show(cur-1); $('#btn-next').onclick=()=>show(cur+1);
$('#btn-thumbs').onclick=()=>$('#thumbs').classList.toggle('open');
$('#btn-fs').onclick=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{});
addEventListener('keydown',e=>{if(e.key==='ArrowRight')show(cur+1);if(e.key==='ArrowLeft')show(cur-1);});
screensHost.addEventListener('click',e=>{const b=e.target.closest('[data-audio]');if(b){e.stopPropagation();stopAudio();curAudio=new Audio(A+b.dataset.audio);curAudio.play().catch(()=>{});}});

addScreen('class setup', `<div style="direction:rtl;text-align:center;width:100%;">
  <h1 style="font-size:42px;color:#17324d;margin-bottom:24px;">قبل أن نبدأ الدرس</h1>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;max-width:900px;margin:auto;">
    ${[['Mic','افتح الميكروفون'],['Camera','اجعل الجزء العلوي من جسمك ظاهرًا'],['Internet','تأكد من اتصال الإنترنت'],['Space','اجلس في مكان آمن للحركة']].map(x=>`<div class="card" style="display:flex;gap:16px;align-items:center;font-size:23px;font-weight:750;color:#3a4a63;"><span class="pill blue">${x[0]}</span>${x[1]}</div>`).join('')}
  </div><div style="display:flex;justify-content:center;gap:12px;margin-top:24px;"><button class="primary" data-audio="a_t_soundcheck.mp3">اختبار الصوت</button><button class="ghost" id="sound-stop">إيقاف</button></div></div>`,el=>({onEnter(){el.querySelector('#sound-stop').onclick=stopAudio;}}));

addScreen('Quick check', `<div style="width:100%;text-align:center;"><span class="source-badge">COPY ME · NOT SCORED</span><h1 class="title" style="margin:12px 0 18px;">Show me!</h1><div class="action-pair" style="max-width:960px;margin:auto;">
  <div class="card" style="padding:12px;"><div class="action-visual eyes-right" style="height:300px;"></div><b style="display:block;font-size:31px;color:#1670e8;margin-top:8px;">eyes</b></div>
  <div class="card" style="padding:12px;"><div class="action-visual hands-left" style="height:300px;"></div><b style="display:block;font-size:31px;color:#ff735c;margin-top:8px;">hands</b></div>
  </div><div class="ar" style="font-size:21px;color:#1f9d6c;margin-top:12px;">أرني عينيك · أرني يديك</div></div>`);

addScreen('Today’s mission', `<div style="display:flex;gap:46px;align-items:center;width:100%;justify-content:center;">
  <div style="max-width:670px;"><span class="source-badge">WE CAN 1 · UNIT 2 · GOALS 09–10</span><h1 class="title" style="text-align:left;margin:16px 0 14px;">Be the boss of your body</h1><div style="display:flex;align-items:center;gap:14px;margin-bottom:14px;"><button class="speaker small" data-audio="a_t_mission.mp3" aria-label="Play today's mission"></button><div style="font-size:24px;font-weight:850;color:#17324d;">Listen. Move. Give one command.</div></div>
    ${[['1','Do four body commands'],['2','Say Okay after you move'],['3','Give one eyes command']].map(x=>`<div class="card" style="display:flex;align-items:center;gap:18px;padding:14px 20px;margin:12px 0;"><span class="pill blue">${x[0]}</span><b style="font-size:25px;color:#17324d;">${x[1]}</b></div>`).join('')}
  </div><div style="width:330px;text-align:center;"><img src="${A}textbook_cover.png" class="pic" style="height:360px;box-shadow:0 14px 30px rgba(23,50,77,.18);"><div class="source-badge" style="margin-top:12px;">Student Book · pp.12–13</div></div></div>`);

addScreen('Eyes: close or open', `<h1 class="title" style="margin-bottom:20px;">Close or open?</h1><div class="action-pair" style="max-width:980px;">${visual(commandById('close'),'Close your eyes.','',true)}${visual(commandById('open'),'Open your eyes.','',true)}</div><div class="ar" style="font-size:22px;color:#1f9d6c;margin-top:14px;">أغمض عينيك · افتح عينيك</div>`);
addScreen('Hands: raise or clap', `<h1 class="title" style="margin-bottom:20px;">Raise or clap?</h1><div class="action-pair" style="max-width:980px;">${visual(commandById('raise'),'Raise your hands.','',true)}${visual(commandById('clap'),'Clap your hands.','',true)}</div><div class="ar" style="font-size:22px;color:#1f9d6c;margin-top:14px;">ارفع يديك · صفّق بيديك</div>`);

addScreen('Move, then say Okay', `<div style="text-align:center;max-width:900px;"><span class="source-badge">CLASS RESPONSE</span><h1 style="font-size:76px;color:#17324d;margin:20px 0 8px;">Okay!</h1><div style="font-size:27px;color:#59697b;">Hear the command → move → say <b style="color:#ff735c;">Okay!</b></div><button class="speaker" data-audio="a_t_move_okay.mp3" style="margin:18px auto 0;"></button><div class="card" style="margin-top:22px;display:flex;gap:20px;align-items:center;justify-content:center;font-size:28px;font-weight:800;"><span class="pill blue">1</span> Move <span style="color:#c6d1dc;">→</span><span class="pill coral">2</span> Say “Okay!”</div><div class="ar" style="font-size:22px;color:#1f9d6c;margin-top:18px;">نفّذ الحركة ثم قل: حسنًا</div></div>`);

addScreen('Listen and choose', `<div style="width:100%;text-align:center;"><div style="display:flex;justify-content:center;gap:14px;align-items:center;margin-bottom:18px;"><h1 class="title" style="font-size:38px;">Listen. Tap the action.</h1><span class="score-chip" id="listen-score">0 / 4</span></div><div class="choice-grid" id="listen-grid">${COMMANDS.map(c=>visual(c)).join('')}</div><button class="primary" id="listen-next" style="margin-top:18px;">New command</button><div class="teacher-only card" id="listen-cue" style="position:absolute;right:34px;bottom:18px;font-size:20px;font-weight:850;color:#17324d;">Teacher cue</div></div>`,el=>{
  let target=null,round=0,score=0;
  function next(){target=COMMANDS[round%4];el.querySelector('#listen-cue').textContent=`Read once: ${target.text}`;el.querySelector('#listen-next').dataset.audio=target.audio;el.querySelectorAll('.action-card').forEach(x=>x.classList.remove('correct','wrong'));}
  el.querySelector('#listen-next').onclick=()=>{round=(round+1)%4;next();};
  el.querySelectorAll('.action-card').forEach(card=>card.onclick=()=>{if(!target)return;const ok=card.dataset.command===target.id;card.classList.add(ok?'correct':'wrong');if(ok){score++;sfx('sfx_correct.mp3');round++;el.querySelector('#listen-score').textContent=`${Math.min(score,4)} / 4`;setTimeout(next,450);}else{sfx('sfx_wrong.mp3');toast('Listen again');}});
  return{onEnter(){round=0;score=0;el.querySelector('#listen-score').textContent='0 / 4';next();}};
});

addScreen('Student Book audio', `<div style="display:flex;align-items:center;gap:44px;width:100%;justify-content:center;"><div style="width:610px;height:405px;"><img src="${A}sec_eyes_open_close.png" class="pic" style="width:100%;height:100%;object-fit:cover;"></div><div style="max-width:410px;"><span class="source-badge">OFFICIAL AUDIO · CD1 14–15</span><h1 class="title" style="text-align:left;margin:18px 0;">Listen, shout, and do</h1><p style="font-size:22px;line-height:1.55;color:#59697b;">Use the complete official Unit 2 Talk Time track. Move when you hear the command.</p><div style="display:flex;gap:12px;margin-top:24px;"><button class="primary" id="official-play">Play official track</button><button class="ghost" id="official-stop">Stop</button></div></div></div>`,el=>({onEnter(){el.querySelector('#official-play').onclick=()=>playOfficial();el.querySelector('#official-stop').onclick=stopAudio;},onLeave:stopAudio}));

addScreen('Guided body commands', `<div style="width:100%;text-align:center;"><h1 class="title" style="font-size:38px;margin-bottom:16px;">Listen. Move. Say “Okay!”</h1><div class="card" id="guided-card" style="max-width:850px;margin:auto;display:flex;align-items:center;gap:28px;text-align:left;"></div><div style="margin-top:18px;"><button class="primary" id="guided-next">Next command</button></div></div>`,el=>{
  let n=0;function draw(){const c=COMMANDS[n%4];el.querySelector('#guided-card').innerHTML=`<div class="action-visual ${c.visual}" style="width:410px;flex:none;"></div><div><div style="font-size:36px;font-weight:850;color:#17324d;">${c.text}</div><button class="speaker small" data-audio="${c.audio}" style="margin-top:14px;"></button><div style="font-size:25px;color:#ff735c;font-weight:850;margin-top:14px;">Move → Okay!</div><div class="ar" style="font-size:20px;color:#1f9d6c;margin-top:8px;">${c.ar}</div></div>`;}el.querySelector('#guided-next').onclick=()=>{n++;draw();};return{onEnter(){n=0;draw();}};
});

addScreen('Fast listen and move', `<div style="display:grid;grid-template-columns:1fr 440px;gap:34px;align-items:center;width:100%;max-width:1050px;"><div style="text-align:left;"><span class="source-badge">LISTEN FIRST · MOVE BEFORE REVEAL</span><h1 class="title" style="text-align:left;margin:16px 0 10px;">Hear it. Do it.</h1><p style="font-size:23px;color:#59697b;line-height:1.5;margin-bottom:18px;">Keep your eyes on the teacher.<br>Move before the picture appears.</p><div id="quick-rounds" style="display:flex;gap:10px;margin-bottom:22px;"></div><div style="display:flex;gap:10px;flex-wrap:wrap;"><button class="primary" id="quick-hear">Hear command</button><button class="ghost" id="quick-show">Show answer</button><button class="ghost" id="quick-next">Next round</button></div><div class="teacher-only card" id="quick-cue" style="margin-top:14px;text-align:left;font-weight:850;color:#17324d;"></div></div><div class="card" style="height:420px;padding:16px;display:flex;align-items:center;justify-content:center;"><div id="quick-wait" style="font-size:31px;font-weight:900;color:#17324d;text-align:center;line-height:1.45;">Listen.<br>Move.</div><img id="quick-img" alt="answer action" style="display:none;width:100%;height:100%;object-fit:contain;border-radius:18px;"></div></div>`,el=>{
  const order=['close','raise','open','clap'];const files={close:'sec_close_eyes_full-v2.png',open:'sec_open_eyes_full-v2.png',raise:'sec_raise_hands_full-v2.png',clap:'sec_clap_hands_full-v2.png'};let n=0;
  function draw(){const c=commandById(order[n]);el.querySelector('#quick-rounds').innerHTML=order.map((_,i)=>`<span class="score-chip" style="${i===n?'color:#1670e8;border-color:#1670e8;':''}">${i+1}</span>`).join('');el.querySelector('#quick-wait').style.display='block';el.querySelector('#quick-img').style.display='none';el.querySelector('#quick-img').src=A+files[c.id];el.querySelector('#quick-cue').textContent=`Play once: ${c.text} Learner moves before Show answer.`;el.querySelector('#quick-hear').onclick=()=>{stopAudio();curAudio=new Audio(A+c.audio);curAudio.play().catch(()=>{});};el.querySelector('#quick-show').onclick=()=>{el.querySelector('#quick-wait').style.display='none';el.querySelector('#quick-img').style.display='block';};}
  el.querySelector('#quick-next').onclick=()=>{n=(n+1)%order.length;draw();};return{onEnter(){n=0;draw();}};
});

addScreen('You are the boss', `<div style="display:flex;align-items:center;gap:48px;width:100%;justify-content:center;"><div style="width:570px;height:390px;"><img src="${A}sec_eyes_open_close.png" class="pic" style="width:100%;height:100%;object-fit:cover;"></div><div style="max-width:430px;"><span class="source-badge">GOAL 10 · SPEAK</span><h1 class="title" style="text-align:left;margin:18px 0;">Give one command</h1><div class="card" style="font-size:30px;font-weight:850;line-height:1.5;color:#17324d;"><span style="color:#1670e8;">Close</span> your eyes.<br><span style="color:#ff735c;">Open</span> your eyes.</div><p style="font-size:21px;color:#59697b;margin-top:16px;">Choose one. The teacher or character does it.</p></div></div>`);

addScreen('Boss Rush', `<div style="display:grid;grid-template-columns:520px 1fr;gap:36px;align-items:center;width:100%;max-width:1050px;"><div class="card" style="height:430px;padding:16px;"><img id="rush-img" alt="action to judge" style="width:100%;height:100%;object-fit:contain;border-radius:18px;"></div><div style="text-align:left;"><span class="source-badge">LISTEN + LOOK + JUDGE</span><div style="display:flex;align-items:center;gap:14px;margin:14px 0;"><h1 class="title" style="font-size:40px;text-align:left;margin:0;">Does it match?</h1><span class="score-chip" id="rush-score">0 / 6</span></div><div class="card" style="font-size:23px;color:#59697b;line-height:1.5;padding:16px 18px;">1 · Hear the command<br>2 · Look at the action<br>3 · Choose</div><button class="primary" id="rush-hear" style="margin-top:18px;">Hear command</button><div style="display:flex;gap:10px;margin-top:12px;"><button class="primary green" id="rush-right">Match</button><button class="primary coral" id="rush-wrong">Not a match</button></div><button class="ghost" id="rush-next" style="margin-top:12px;">Next picture</button><div class="teacher-only card" id="rush-cue" style="margin-top:12px;font-weight:850;color:#17324d;"></div></div></div>`,el=>{
  const rounds=[['close','close'],['raise','clap'],['open','open'],['clap','raise'],['close','open'],['raise','raise']];const files={close:'sec_close_eyes_full-v2.png',open:'sec_open_eyes_full-v2.png',raise:'sec_raise_hands_full-v2.png',clap:'sec_clap_hands_full-v2.png'};let round=0,score=0,answered=false;
  function draw(){const [heard,shown]=rounds[round];const target=commandById(heard);answered=false;el.querySelector('#rush-img').src=A+files[shown];el.querySelector('#rush-cue').textContent=`Audio: ${target.text} Picture: ${commandById(shown).text}`;el.querySelector('#rush-hear').onclick=()=>{stopAudio();curAudio=new Audio(A+target.audio);curAudio.play().catch(()=>{});};}
  function answer(same){if(answered)return;answered=true;const [heard,shown]=rounds[round];const ok=(heard===shown)===same;if(ok){score++;sfx('sfx_correct.mp3');toast('Good listening!');}else{sfx('sfx_wrong.mp3');toast('Listen and look again');}el.querySelector('#rush-score').textContent=`${score} / 6`;}
  el.querySelector('#rush-right').onclick=()=>answer(true);el.querySelector('#rush-wrong').onclick=()=>answer(false);el.querySelector('#rush-next').onclick=()=>{round=(round+1)%rounds.length;draw();};return{onEnter(){round=0;score=0;el.querySelector('#rush-score').textContent='0 / 6';draw();}};
});

addScreen('Check 1 · independent', `<div style="width:100%;text-align:center;"><span class="source-badge">CHECK 1 · NO HELP</span><h1 class="title" style="margin:12px 0;">Show what you can do</h1><div style="display:flex;justify-content:center;gap:16px;margin:16px 0;">${COMMANDS.map((c,i)=>`<div class="score-chip" id="check-dot-${c.id}">${i+1}</div>`).join('')}<div class="score-chip" id="check-dot-active">Speak</div><div class="score-chip" id="check-dot-okay">Okay</div></div><div class="card" style="max-width:790px;margin:auto;font-size:28px;color:#59697b;">Listen to your teacher. Do the action.<br><b style="color:#17324d;">Then give one eyes command.</b></div><div class="teacher-only" style="position:absolute;left:70px;right:70px;bottom:18px;display:flex;gap:12px;align-items:flex-start;"><div class="card" style="flex:1;text-align:left;"><b id="check-cue" style="font-size:19px;color:#17324d;"></b><div class="check-panel"><button class="grade-a" data-grade="A">A · Independent</button><button class="grade-b" data-grade="B">B · With help</button><button class="grade-c" data-grade="C">C · Not yet</button></div><div class="error-row">${['Meaning','Opposite','Body part','Attention','No speech'].map(e=>`<button data-error="${e}">${e}</button>`).join('')}</div></div><button class="primary" id="check-next">Next item</button></div></div>`,el=>{
  const items=['close','open','raise','clap','active','okay'];let n=0;function cue(){const id=items[n];const text=id==='active'?'Show one eyes picture. Learner gives Close/Open command.':id==='okay'?'Give one familiar command. Score the spoken Okay separately.':`Read once, with hands still: ${commandById(id).text}`;el.querySelector('#check-cue').textContent=text;}
  el.querySelectorAll('[data-grade]').forEach(b=>b.onclick=()=>{const id=items[n];assessment.check1[id]=b.dataset.grade;const dot=el.querySelector(`#check-dot-${id}`);dot.textContent=`${id==='active'?'Speak':id==='okay'?'Okay':n+1}: ${b.dataset.grade}`;dot.style.color=b.dataset.grade==='A'?'#168653':b.dataset.grade==='B'?'#b06b00':'#c83d34';});
  el.querySelectorAll('[data-error]').forEach(b=>b.onclick=()=>{assessment.errors.add(b.dataset.error);b.style.background='#ff735c';});el.querySelector('#check-next').onclick=()=>{n=Math.min(items.length-1,n+1);cue();};return{onEnter(){n=0;cue();}};
});

addScreen('Repair and Check 2', `<div style="width:100%;text-align:center;"><span class="source-badge">REPAIR ONLY THE FAILED ITEM</span><h1 class="title" style="font-size:38px;margin:12px 0;">Try it a new way</h1><div class="card" id="repair-stage" style="max-width:820px;margin:auto;min-height:320px;display:flex;align-items:center;justify-content:center;font-size:28px;color:#17324d;"></div><div class="teacher-only" style="position:absolute;left:48px;right:48px;bottom:16px;display:flex;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap;">${['Meaning','Slow','Contrast','Model','Build','Hide help','Try again'].map((s,i)=>`<button class="ghost repair-step" data-step="${i}">${i+1}. ${s}</button>`).join('')}<div class="check-panel" style="width:330px;margin:0;"><button class="grade-a" data-check2="A">A</button><button class="grade-b" data-check2="B">B</button><button class="grade-c" data-check2="C">C</button></div></div></div>`,el=>{
  let target=commandById('open');function selectTarget(){const failed=COMMANDS.find(c=>assessment.check1[c.id]&&assessment.check1[c.id]!=='A');target=failed||commandById('open');assessment.repairTarget=target.id;}
  const content=[()=>`<div><div class="action-visual ${target.visual}" style="width:520px;height:270px;"></div><b>${target.text}</b><div class="ar" style="font-size:20px;color:#1f9d6c;">${target.ar}</div></div>`,()=>`<div><button class="speaker" data-audio="${target.slow}"></button><b style="display:block;font-size:42px;margin-top:16px;">${target.text.split(' ').map(x=>`<span style="margin:0 8px;">${x}</span>`).join('')}</b><p style="font-size:20px;color:#59697b;margin-top:14px;">Slow support once.</p></div>`,()=>`<div class="action-pair" style="width:760px;">${target.id==='close'||target.id==='open'?visual(commandById('close'),'Close'):visual(commandById('raise'),'Raise')}${target.id==='close'||target.id==='open'?visual(commandById('open'),'Open'):visual(commandById('clap'),'Clap')}</div>`,()=>`<div><div class="action-visual ${target.visual}" style="width:520px;height:270px;"></div><button class="speaker small" data-audio="${target.audio}"></button><b style="display:block;font-size:34px;margin-top:10px;">${target.text}</b></div>`,()=>`<div style="font-size:44px;font-weight:850;"><span style="color:#1670e8;">${target.text.split(' ')[0]}</span> your <span style="color:#ff735c;">${target.text.includes('eyes')?'eyes':'hands'}</span>.</div>`,()=>`<div><span class="pill blue">HELP HIDDEN</span><h2 style="font-size:38px;margin-top:22px;">Listen again.</h2></div>`,()=>`<div><div class="action-visual ${target.visual}" style="width:520px;height:270px;"></div><button class="speaker small" data-audio="${target.audio}"></button><h2 style="font-size:32px;margin-top:12px;">New try.</h2></div>`];
  el.querySelectorAll('.repair-step').forEach(b=>b.onclick=()=>{el.querySelector('#repair-stage').innerHTML=content[+b.dataset.step]();});el.querySelectorAll('[data-check2]').forEach(b=>b.onclick=()=>{assessment.check2=b.dataset.check2;toast(`Check 2: ${b.dataset.check2}`);});return{onEnter(){selectTarget();el.querySelector('#repair-stage').innerHTML=content[0]();}};
});

addScreen('Textbook task', `<div style="width:100%;text-align:center;"><span class="source-badge">TEXTBOOK TASK · SB pp.12–13</span><h1 class="title" style="font-size:38px;margin:12px 0;">Listen and do. Then be the boss.</h1><div class="action-pair" style="max-width:900px;margin:auto;">${visual(commandById('clap'),'1 · Do the action')}${visual(commandById('open'),'2 · Give the command')}</div><div style="display:flex;justify-content:center;gap:12px;margin-top:16px;"><button class="primary" id="book-audio">Official CD1 14–15</button><button class="ghost" id="book-stop">Stop</button></div></div>`,el=>({onEnter(){el.querySelector('#book-audio').onclick=()=>playOfficial();el.querySelector('#book-stop').onclick=stopAudio;},onLeave:stopAudio}));

addScreen('My body boss badge', `<div style="width:100%;text-align:center;"><span class="source-badge">CHECK 1 + CHECK 2 EVIDENCE</span><h1 class="title" style="margin:12px 0 18px;">My Body Boss card</h1><div id="result-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;max-width:980px;margin:auto;"></div><div id="result-note" style="font-size:19px;color:#59697b;margin-top:18px;"></div></div>`,el=>({onEnter(){const actionGrades=COMMANDS.map(c=>assessment.check1[c.id]).filter(Boolean);const actionA=actionGrades.filter(x=>x==='A').length;const cards=[['Listen & move',`${actionA} / 4 independent`],['Give a command',assessment.check1.active||'Not recorded'],['Say Okay',assessment.check1.okay||'Not recorded']];el.querySelector('#result-grid').innerHTML=cards.map(([k,v])=>`<div class="card" style="min-height:150px;display:flex;flex-direction:column;justify-content:center;"><b style="font-size:23px;color:#17324d;">${k}</b><span style="font-size:30px;color:#1670e8;font-weight:850;margin-top:14px;">${v}</span></div>`).join('');el.querySelector('#result-note').textContent=assessment.check2?`Check 2 improvement: ${assessment.repairTarget||'target'} → ${assessment.check2}. Check 1 remains unchanged.`:'Check 2 was not recorded.';}}));

addScreen('Exit task', `<div style="display:grid;grid-template-columns:500px 1fr 190px;align-items:center;gap:30px;width:100%;max-width:1120px;"><div class="card" style="height:420px;padding:14px;"><img src="${A}sec_close_eyes_full-v2.png" alt="boy closing his eyes" style="width:100%;height:100%;object-fit:contain;border-radius:18px;"></div><div style="text-align:left;"><span class="source-badge">EXIT · SAY IT YOURSELF</span><h1 class="title" style="text-align:left;margin:16px 0;">Give the command</h1><p style="font-size:23px;color:#59697b;line-height:1.5;">Tell the character what to do.</p><button class="ghost" id="exit-help" style="margin:18px 0;">Help</button><div id="exit-clue" style="font-size:34px;font-weight:850;color:#1670e8;min-height:48px;"></div></div><a href="review/index.html" style="text-decoration:none;text-align:center;color:#17324d;font-weight:850;"><img src="${A}sec_qr_review.png" alt="Scan to open home review" style="width:180px;height:180px;border-radius:16px;background:#fff;padding:8px;box-shadow:0 12px 28px rgba(23,50,77,.14);"><span style="display:block;margin-top:10px;font-size:19px;">Scan for review</span><span class="ar" style="display:block;color:#1f9d6c;margin-top:4px;">امسح للمراجعة</span></a></div>`,el=>({onEnter(){el.querySelector('#exit-clue').textContent='';el.querySelector('#exit-help').onclick=()=>el.querySelector('#exit-clue').textContent='Close…';}}));

screens.forEach((s,i)=>{const b=document.createElement('button');b.textContent=`${i+1} · ${s.objective}`;b.onclick=()=>{$('#thumbs').classList.remove('open');show(i);};$('#thumbs').appendChild(b);});
const q=new URLSearchParams(location.search);const requested=Math.max(1,Math.min(17,Number(q.get('p'))||1));
if(q.get('teacher')==='1'){document.body.classList.add('teacher-on');$('#btn-teacher').setAttribute('aria-pressed','true');}
fit();show(requested-1);
