/* We Can 2 · Unit 1 · L5 · School Practice
 * book=We Can 2 / unit=Unit 1 / lesson=L5 / lessonKey=wc2-u1-l5
 * 25-minute design budget; online 1v1; teacher controls the screen.
 */
const A='assets/';
const $=s=>document.querySelector(s);
const LESSON_KEY='wc2-u1-l5';
const STORE='khusoosi:'+LESSON_KEY+':progress';

const style=document.createElement('style');
style.textContent=`
  .wrap{width:100%;max-width:1120px;text-align:center}.wide{width:100%;max-width:1160px}
  .lead{font-size:34px;line-height:1.25;font-weight:850;color:#3d3356;margin:10px 0 8px}
  .sub{font-size:18px;line-height:1.45;color:#6f6680;font-weight:650;margin-bottom:14px}
  .grid4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;width:100%}
  .grid2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;width:100%}
  .task-card{background:#fff;border:2px solid #e7dfef;border-radius:22px;padding:18px;box-shadow:0 10px 25px rgba(57,40,82,.08)}
  .task-title{font-size:27px;font-weight:850;color:#3d3356;line-height:1.3;margin-bottom:10px}
  .task-note{font-size:15px;font-weight:750;color:#8b5d14;margin-top:10px}
  .options{display:flex;gap:14px;justify-content:center;align-items:stretch;flex-wrap:wrap;margin-top:14px}
  .choice{border:3px solid #d9cdea;background:#fff;border-radius:18px;min-width:180px;max-width:310px;flex:1;padding:14px;cursor:pointer;color:#3d3356;font-size:21px;font-weight:800;line-height:1.3}
  .choice img{display:block;width:100%;height:145px;object-fit:contain;margin:auto}
  .choice:hover{border-color:#7b5ea7;transform:translateY(-2px)}.choice:disabled{cursor:default;transform:none}
  .choice.correct{border-color:#16875b;background:#e9f8f0;color:#146c4a}.choice.wrong{border-color:#c94b55;background:#fff0f1;color:#9d3440}
  .action{min-height:46px;padding:10px 20px;border:0;border-radius:14px;background:#7b5ea7;color:#fff;font-size:17px;font-weight:800;cursor:pointer;box-shadow:0 3px 0 #513d75}
  .action.secondary{background:#f3eefb;color:#4a3a6e;box-shadow:0 3px 0 #d7c9e7}.action.amber{background:#ffc84a;color:#4a3a6e;box-shadow:0 3px 0 #d9a514}
  .action.green{background:#16875b;box-shadow:0 3px 0 #0f6542}.action:disabled{opacity:.42;cursor:not-allowed;box-shadow:none}
  .row{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap}.feedback{min-height:30px;margin-top:12px;font-size:20px;font-weight:850;color:#4a3a6e}
  .audio-line{display:flex;align-items:center;justify-content:center;gap:14px;margin:10px 0}.caption{font-size:22px;font-weight:800;color:#463a5e;line-height:1.4}
  .tag{display:inline-block;padding:7px 12px;border-radius:999px;background:#f3eefb;color:#4a3a6e;font-size:13px;font-weight:850;letter-spacing:.25px}
  .school-note{display:inline-block;margin-top:8px;padding:6px 12px;border-radius:9px;background:#fff4d7;color:#80550d;font-size:13px;font-weight:750}
  .station-card{padding:18px;text-align:center}.station-card .num{font-size:15px;color:#7b5ea7;font-weight:850}.station-card h3{font-size:23px;color:#3d3356;margin:7px 0}.station-card p{font-size:16px;color:#6f6680;line-height:1.4}
  .station-card.current{outline:4px solid #ffc84a;background:#fffcf3}.station-card.done{border-color:#16875b}
  .dialogue{display:grid;grid-template-columns:44px 1fr;gap:8px 12px;align-items:center;text-align:left}.dialogue .speaker{width:42px;height:42px;background-size:22px}.dialogue .line{font-size:21px;font-weight:750;color:#3d3356;line-height:1.35}
  .repair-steps{display:flex;gap:7px;justify-content:center;flex-wrap:wrap;margin-top:12px}.repair-steps button{font-size:14px;padding:8px 11px;min-height:38px}
  .repair-steps button.done{background:#16875b;color:#fff}.repair-view{min-height:260px;display:flex;align-items:center;justify-content:center;padding:18px}
  .evidence{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;width:100%}.evidence .task-card{min-height:160px;padding:16px}.evidence h3{font-size:20px;color:#4a3a6e}.evidence p{font-size:17px;margin-top:12px;line-height:1.45;color:#51455f}
  .op-card{cursor:pointer;text-align:center;padding:16px 10px}.op-icon{height:62px;display:flex;align-items:center;justify-content:center;color:#7b5ea7}.op-card h3{font-size:24px;color:#3d3356}.op-card .ar{font-size:16px;color:#6f6680;margin-top:5px}
  .mini-label{font-size:14px;font-weight:800;color:#7b5ea7;text-transform:uppercase;letter-spacing:.4px}.hidden-answer{visibility:hidden}
  .book-ref{font-size:14px;font-weight:700;color:#7b6c87;margin-top:6px}.help-flash{background:#fff4d7;border:2px dashed #d9a514;border-radius:12px;padding:10px;font-size:22px;font-weight:850;color:#6b480d}
  #new-class{margin-top:8px;background:#fff;color:#4a3a6e;border:2px solid #7b5ea7;border-radius:10px;padding:8px 12px;font-weight:800;cursor:pointer}
`;
document.head.appendChild(style);

/* Audio bus and observable QA events. */
let curAudio=null,curSfx=null,navToken=0,toastTimer=null;
const audioBlobs={};
window.__qaAudio=[];
const AUDIO_MANIFEST=[
'a_t_soundcheck.mp3','a_t_listen.mp3','a_t_circle.mp3','a_t_match.mp3','a_t_trace.mp3',
'a_official_tt1.mp3','a_official_tt2.mp3','a_official_tt3.mp3','a_official_tt4.mp3','a_official_tt5.mp3',
'a_official_chant_clap.mp3','a_t_f_seventh.mp3','a_t_no_sixth.mp3','a_t_e_fifth.mp3','a_t_b_first.mp3','a_t_no_second.mp3',
'a_official_wtm.mp3','a_official_ans_hungry.mp3','a_official_ans_thirsty.mp3','a_official_ans_hot.mp3','a_official_ans_cold.mp3','a_official_ans_sleepy.mp3','a_official_ans_scared.mp3',
'a_t_w_apple.mp3','a_t_w_apron.mp3','a_t_w_cap.mp3','a_t_w_cape.mp3','a_t_w_tap.mp3','a_t_w_tape.mp3','a_t_w_ink.mp3','a_t_w_iron.mp3','a_t_w_pin.mp3','a_t_w_pine.mp3','a_t_w_tim.mp3','a_t_w_time.mp3',
'a_t_missing_e.mp3','sfx_correct.mp3','sfx_wrong.mp3','sfx_success.mp3','sfx_pop.mp3'];
AUDIO_MANIFEST.forEach(f=>fetch(A+f).then(r=>r.ok?r.blob():Promise.reject(f)).then(b=>audioBlobs[f]=URL.createObjectURL(b)).catch(()=>{}));
function audioUrl(src){return audioBlobs[src]||(A+src);}
function trackAudio(au,src,event){window.__qaAudio.push({src,event,time:Date.now()});}
function play(src,onend,slow=false){
  stopAudio();const au=new Audio(audioUrl(src));curAudio=au;au.preload='auto';au.playbackRate=slow?.78:1;
  au.addEventListener('playing',()=>trackAudio(au,src,'playing'));
  au.addEventListener('ended',()=>{trackAudio(au,src,'ended');if(onend)onend();},{once:true});
  au.addEventListener('error',()=>{trackAudio(au,src,'error');toast('No sound? Check volume, then tap again.');},{once:true});
  const p=au.play();if(p&&p.catch)p.catch(()=>trackAudio(au,src,'blocked'));
}
function stopAudio(){if(curAudio){curAudio.pause();curAudio.currentTime=0;curAudio=null;}if(curSfx){curSfx.pause();curSfx.currentTime=0;curSfx=null;}}
function sfx(src){try{curSfx=new Audio(audioUrl(src));curSfx.addEventListener('playing',()=>trackAudio(curSfx,src,'playing'));curSfx.addEventListener('ended',()=>trackAudio(curSfx,src,'ended'),{once:true});const p=curSfx.play();if(p&&p.catch)p.catch(()=>{});}catch(e){}}
function later(fn,ms){const token=navToken;return setTimeout(()=>{if(token===navToken)fn();},ms);}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),1800);}
function shuffle(list){const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function readJSON(key,fallback){try{const v=localStorage.getItem(key);return v?JSON.parse(v):fallback;}catch(e){return fallback;}}
const state=readJSON(STORE,{check1:null,check2:{},rushErrors:[],help:[],exit:[],stations:null});
function save(){try{localStorage.setItem(STORE,JSON.stringify(state));}catch(e){}}
window.__lessonState=state;

const FEELINGS={
  hungry:{img:'ft_hungry.jpg',audio:'a_official_ans_hungry.mp3',ar:'جائع'},
  thirsty:{img:'ft_thirsty.jpg',audio:'a_official_ans_thirsty.mp3',ar:'عطشان'},
  hot:{img:'ft_hot.jpg',audio:'a_official_ans_hot.mp3',ar:'يشعر بالحر'},
  cold:{img:'ft_cold.jpg',audio:'a_official_ans_cold.mp3',ar:'يشعر بالبرد'},
  sleepy:{img:'ft_sleepy.jpg',audio:'a_official_ans_sleepy.mp3',ar:'نعسان'},
  scared:{img:'ft_scared.jpg',audio:'a_official_ans_scared.mp3',ar:'خائف'}
};
const WORDS={
  apple:{cls:'a',img:'w_apple.jpg',audio:'a_t_w_apple.mp3',ar:'تفاحة'},apron:{cls:'ae',img:'w_apron.jpg',audio:'a_t_w_apron.mp3',ar:'مريلة'},
  cap:{cls:'a',img:'w_cap.jpg',audio:'a_t_w_cap.mp3',ar:'قبعة'},cape:{cls:'ae',img:'w_cape.jpg',audio:'a_t_w_cape.mp3',ar:'رداء'},
  tap:{cls:'a',img:'w_tap.jpg',audio:'a_t_w_tap.mp3',ar:'صنبور'},tape:{cls:'ae',img:'w_tape.jpg',audio:'a_t_w_tape.mp3',ar:'شريط'},
  ink:{cls:'i',img:'w_ink.jpg',audio:'a_t_w_ink.mp3',ar:'حبر'},iron:{cls:'ie',img:'w_iron.jpg',audio:'a_t_w_iron.mp3',ar:'مكواة'},
  pin:{cls:'i',img:'w_pin.jpg',audio:'a_t_w_pin.mp3',ar:'دبوس'},pine:{cls:'ie',img:'w_pine.jpg',audio:'a_t_w_pine.mp3',ar:'صنوبر'},
  Tim:{cls:'i',img:'w_tim.jpg',audio:'a_t_w_tim.mp3',ar:'اسم'},time:{cls:'ie',img:'w_time.jpg',audio:'a_t_w_time.mp3',ar:'وقت'}
};
const STATIONS={greeting:'Greeting',ordinal:'Chant & numbers',feelings:'Feelings',sounds:'Sounds'};
const textOpt=(id,text)=>({id,text});
const picOpt=(id,img,text='')=>({id,img,text});
const TASKS={
  greetHow:{station:'greeting',title:'Listen. Say your answer. Then choose.',audio:'a_official_tt3.mp3',caption:'Hi. How are you?',options:[textOpt('great',"I'm great, thanks. And you?"),textOpt('fine',"I'm fine."),textOpt('meet',"It's nice to meet you, too.")],answer:'great',hint:"I'm …"},
  greetNice:{station:'greeting',title:'Listen. Say your answer. Then choose.',audio:'a_official_tt1.mp3',caption:"Hi. It's nice to meet you.",options:[textOpt('too',"It's nice to meet you, too."),textOpt('great',"I'm great, thanks. And you?"),textOpt('bye','Good-bye.')],answer:'too',hint:"It's …"},
  ordinalF:{station:'ordinal',title:'Fix the mistake. Say it, then choose.',audio:'a_t_f_seventh.mp3',caption:'F is the seventh letter of the alphabet.',options:[textOpt('sixth',"No, it's the sixth letter."),textOpt('yes',"Yes, that's right."),textOpt('fifth',"No, it's the fifth letter.")],answer:'sixth',hint:'No …'},
  ordinalE:{station:'ordinal',title:'Listen. Is it right?',audio:'a_t_e_fifth.mp3',caption:'E is the fifth letter of the alphabet.',options:[textOpt('yes',"Yes, that's right."),textOpt('fourth',"No, it's the fourth letter."),textOpt('sixth',"No, it's the sixth letter.")],answer:'yes',hint:'Yes …'},
  ordinalB:{station:'ordinal',title:'A new trick. Fix it.',audio:'a_t_b_first.mp3',caption:'B is the first letter of the alphabet.',options:[textOpt('second',"No, it's the second letter."),textOpt('yes',"Yes, that's right."),textOpt('third',"No, it's the third letter.")],answer:'second',hint:'No …'},
  feelHungry:{station:'feelings',title:'Listen and match.',audio:FEELINGS.hungry.audio,caption:"I'm hungry.",options:[picOpt('hungry',FEELINGS.hungry.img),picOpt('thirsty',FEELINGS.thirsty.img),picOpt('scared',FEELINGS.scared.img)],answer:'hungry',hint:"I'm …"},
  feelThirsty:{station:'feelings',title:'Listen and match.',audio:FEELINGS.thirsty.audio,caption:"I'm thirsty.",options:[picOpt('cold',FEELINGS.cold.img),picOpt('thirsty',FEELINGS.thirsty.img),picOpt('sleepy',FEELINGS.sleepy.img)],answer:'thirsty',hint:"I'm …"},
  feelCold:{station:'feelings',title:'Listen and match.',audio:FEELINGS.cold.audio,caption:"I'm cold.",options:[picOpt('hot',FEELINGS.hot.img),picOpt('cold',FEELINGS.cold.img),picOpt('hungry',FEELINGS.hungry.img)],answer:'cold',hint:"I'm …"},
  feelScared:{station:'feelings',title:'Listen and match.',audio:FEELINGS.scared.audio,caption:"I'm scared.",options:[picOpt('sleepy',FEELINGS.sleepy.img),picOpt('scared',FEELINGS.scared.img),picOpt('thirsty',FEELINGS.thirsty.img)],answer:'scared',hint:"I'm …"},
  feelSleepy:{station:'feelings',title:'Listen and match.',audio:FEELINGS.sleepy.audio,caption:"I'm sleepy.",options:[picOpt('scared',FEELINGS.scared.img),picOpt('sleepy',FEELINGS.sleepy.img),picOpt('hot',FEELINGS.hot.img)],answer:'sleepy',hint:"I'm …"},
  feelHot:{station:'feelings',title:'Listen and match.',audio:FEELINGS.hot.audio,caption:"I'm hot.",options:[picOpt('hot',FEELINGS.hot.img),picOpt('cold',FEELINGS.cold.img),picOpt('hungry',FEELINGS.hungry.img)],answer:'hot',hint:"I'm …"}
};
['cap','cape','tap','tape','pin','pine','Tim','time','apple','apron','ink','iron'].forEach(w=>{
  const cls=WORDS[w].cls;
  TASKS['sound'+w]={station:'sounds',title:'Listen to the whole word. Short or long?',audio:WORDS[w].audio,caption:'One word. Choose its sound.',heard:w,options:[textOpt('a','a · short'),textOpt('ae','a_e · long'),textOpt('i','i · short'),textOpt('ie','i_e · long')].filter(o=>(cls==='a'||cls==='ae')?['a','ae'].includes(o.id):['i','ie'].includes(o.id)),answer:cls,hint:'Short or long?'};
});
const PARALLEL={greetHow:'greetNice',greetNice:'greetHow',ordinalF:'ordinalB',ordinalB:'ordinalF',ordinalE:'ordinalF',feelHungry:'feelThirsty',feelThirsty:'feelHungry',feelCold:'feelHot',feelHot:'feelCold',feelScared:'feelSleepy',feelSleepy:'feelScared',soundcape:'soundcap',soundcap:'soundcape',soundpin:'soundpine',soundpine:'soundpin',soundtap:'soundtape',soundtape:'soundtap',soundTim:'soundtime',soundtime:'soundTim',soundapple:'soundapron',soundapron:'soundapple',soundink:'soundiron',soundiron:'soundink'};
Object.entries(TASKS).forEach(([id,t])=>t.id=id);

/* One locked-answer task renderer. Practice mode retries; check modes use Next. */
function choiceTask(host,task,cfg={}){
  let locked=false,helped=false,answered=false,helpTimer=null,gated=!!cfg.gated;
  host.dataset.task=task.id||'';
  host.__task=task;
  host.innerHTML=`<div class="task-card">
    <div class="mini-label">${cfg.label||STATIONS[task.station]||'Practice'}</div>
    <div class="task-title">${task.title}</div>
    <div class="audio-line"><button class="speaker task-play" aria-label="Play audio"></button><div class="caption task-caption">${task.caption||''}</div></div>
    <div class="options"></div><div class="row help-row" style="margin-top:10px"></div>
    <div class="feedback" aria-live="polite"></div><div class="row next-row"></div></div>`;
  const opts=host.querySelector('.options'),feedback=host.querySelector('.feedback'),nextRow=host.querySelector('.next-row');
  const playBtn=host.querySelector('.task-play');playBtn.onclick=()=>play(task.audio);
  if(cfg.help){
    const hb=document.createElement('button');hb.className='action secondary';hb.textContent='Help · first words';hb.onclick=()=>{
      if(answered)return;helped=true;stopAudio();const old=host.querySelector('.help-flash');if(old)old.remove();
      const h=document.createElement('div');h.className='help-flash';h.textContent=task.hint||'Listen again.';host.querySelector('.help-row').appendChild(h);
      clearTimeout(helpTimer);helpTimer=setTimeout(()=>h.remove(),5000);cfg.onHelp&&cfg.onHelp();
    };host.querySelector('.help-row').appendChild(hb);
  }
  shuffle(task.options).forEach(o=>{
    const b=document.createElement('button');b.className='choice';b.dataset.id=o.id;b.disabled=gated;
    b.innerHTML=(o.img?`<img src="${A}${o.img}" alt="">`:'')+(o.text?`<span>${o.text}</span>`:'');
    b.onclick=()=>{
      if(gated||locked||answered)return;
      const correct=o.id===task.answer;
      if(!correct&&cfg.retry){b.classList.add('wrong');sfx('sfx_wrong.mp3');feedback.textContent='Listen and try again.';later(()=>b.classList.remove('wrong'),450);return;}
      locked=true;answered=true;opts.querySelectorAll('button').forEach(x=>x.disabled=true);b.classList.add(correct?'correct':'wrong');
      if(!correct){const right=[...opts.querySelectorAll('button')].find(x=>x.dataset.id===task.answer);if(right)right.classList.add('correct');}
      sfx(correct?'sfx_correct.mp3':'sfx_wrong.mp3');feedback.textContent=correct?'Correct. Say the complete answer aloud.':'Not yet. Look at the correct answer; you will try a new one.';
      if(task.heard)host.querySelector('.task-caption').textContent='You heard: '+task.heard;
      cfg.onAnswer&&cfg.onAnswer({correct,helped,task});
      if(cfg.next!==false){const n=document.createElement('button');n.className='action amber';n.textContent=cfg.nextLabel||'Next question';n.onclick=()=>{stopAudio();cfg.onNext&&cfg.onNext({correct,helped,task});};nextRow.appendChild(n);}
    };opts.appendChild(b);
  });
  return {play:()=>playBtn.click(),unlock(){gated=false;opts.querySelectorAll('button').forEach(x=>x.disabled=false);},get helped(){return helped;}};
}

/* Player framework. */
const screensHost=$('#screens'),screens=[];
const TEACHER_GUIDES=[
'<b>Set up (under 1 min):</b> Tap sound check. Confirm microphone, camera, network and paper. Do not teach here.',
'<b>Warm-up (1.5 min):</b> Two fast retrieval items. If this device has L4 sound errors, sounds come first; otherwise the order is random. Ask for a response before each choice. This is activation, not reteaching.',
'<b>Map (30 sec):</b> Point to all four stations. Say: first I show you, then you do it alone. The goal is at least three independent school-style answers.',
'<b>Command words (1.5 min):</b> Model Listen / Circle / Match / Number / Trace. Student points or moves a finger on the screen. Number has teacher voice only; no unrelated audio is substituted. These items are temporary until the 1448 Workbook is checked.',
'<b>Station 1 model (1 min):</b> Play the five turns in order. Student points to A or B and listens. Then model the target response once. Keep all five turns visible.',
'<b>Station 1 practice (1 min):</b> Ask “How are you?” Student answers aloud before tapping. If the answer breaks, use Help, then Model, then Hide help and Try again. Do not count a button click as spoken mastery.',
'<b>Station 2 model (1 min):</b> Play the official clap verse. Student joins only happy / clap your hands. Tap the two missing keyword cards after singing.',
'<b>Station 2 practice (1.5 min):</b> Play the false F statement. Student says the correction before choosing. If fifth/sixth is confused, contrast E fifth and F sixth, then hide the model and repeat the correction.',
'<b>Station 3 model (1 min):</b> Ask “What’s the matter?” with the full official question. Student answers from the picture in a complete sentence. Listen for “I’m”, not “I hungry”.',
'<b>Station 3 practice (1 min):</b> Play the answer and match the picture. After the choice, the student repeats the full revealed sentence. Contrast hot/cold only if those meanings are confused.',
'<b>Station 4 practice (1 min):</b> Student hears a complete word and taps box 1 or 2. The target word appears after the answer so this remains listening discrimination.',
'<b>Writing link (1 min):</b> Student says the new word, then adds e. Complete both cap→cape and pin→pine. This is a short classroom writing-recognition action; paper tracing can follow.',
'<b>Rush (2.5 min):</b> Eight mixed items, two per station. One answer per item; use the explicit Next button. Accuracy before speed. Wrong items are stored for the next page, not retaught here.',
'<b>Rush repair (1.5 min):</b> Review only items missed in Rush. Each retry is a parallel item for the same ability. If there were no errors, move on without inventing a problem.',
'<b>Check 1 (3 min):</b> Four stations in random order, no Arabic, no Model and no Help. One locked answer per station. For spoken stations, require the oral response before the click. The count records independent objective answers only.',
'<b>Repair + Check 2 (4 min):</b> Repair only the first failed station. Follow Meaning → Slow → Contrast → Model → Build → Hide help → Try again. Check 2 is a new item for the same ability. If all four passed, continue without repair.',
'<b>School interface (1 min):</b> Two listen-and-number items. These are temporary H5 imitation items pending the current 1448 Workbook, not verified original Workbook questions.',
'<b>School interface (1 min):</b> One picture match and one missing-letter item. No Arabic. Keep the pending-verification label visible.',
'<b>Evidence (30 sec):</b> Read only what happened: independent answer, helped answer, retry, or not checked. Do not turn the card into an A/B/C grade or a claim of complete mastery.',
'<b>Exit (1 min):</b> Four fresh quick items. Help gives only a minimal hint for five seconds; using Help adds a parallel retry after support is hidden. Open Review or show the QR. Local preview does not prove production data delivery.'
];
function addScreen(objective,html,init){const el=document.createElement('section');el.className='screen';el.innerHTML=html;screensHost.appendChild(el);const api=init?(init(el)||{}):{};screens.push({objective,el,onEnter:api.onEnter,onLeave:api.onLeave});}
let cur=0;
function show(i){
  i=Math.max(0,Math.min(screens.length-1,i));if(screens[cur]&&screens[cur].onLeave)screens[cur].onLeave();navToken++;stopAudio();clearTimeout(toastTimer);$('#toast').classList.remove('show');cur=i;
  screens.forEach((s,k)=>s.el.classList.toggle('active',k===i));$('#objective').textContent=screens[i].objective;$('#teacher-copy').innerHTML=TEACHER_GUIDES[i]||'';
  $('#page-num').textContent=(i+1)+' / '+screens.length;$('#progress').style.width=((i+1)/screens.length*100)+'%';$('#btn-prev').disabled=i===0;$('#btn-next').disabled=i===screens.length-1;
  document.querySelectorAll('#thumbs button[data-page]').forEach((b,k)=>b.classList.toggle('cur',k===i));if(screens[i].onEnter)screens[i].onEnter();
}
function fit(){const s=Math.min(window.innerWidth/1280,window.innerHeight/720);$('#stage').style.transform='scale('+s+')';}
window.addEventListener('resize',fit);
(function(){const w=$('#watermark');for(let y=0;y<5;y++)for(let x=0;x<4;x++){const sp=document.createElement('span');sp.textContent='khusoosi · خصوصي';sp.style.left=(x*340+(y%2)*120)+'px';sp.style.top=(y*150+20)+'px';w.appendChild(sp);}})();
$('#btn-ar').onclick=()=>{const on=document.body.classList.toggle('ar-on');$('#btn-ar').setAttribute('aria-pressed',on);};
$('#btn-teacher').onclick=()=>{const on=document.body.classList.toggle('teacher-on');$('#btn-teacher').setAttribute('aria-pressed',on);};
$('#btn-prev').onclick=()=>show(cur-1);$('#btn-next').onclick=()=>show(cur+1);$('#btn-thumbs').onclick=()=>$('#thumbs').classList.toggle('open');
$('#btn-fs').onclick=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{});
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')show(cur+1);if(e.key==='ArrowLeft')show(cur-1);});
screensHost.addEventListener('click',e=>{const b=e.target.closest('[data-audio]');if(b)play(b.dataset.audio);});

const ICONS={
 mic:'<svg viewBox="0 0 24 24" width="34" height="34" fill="#6a4fa3"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3zm6-3a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.94V22h2v-2.06A8 8 0 0 0 20 12h-2z"/></svg>',
 cam:'<svg viewBox="0 0 24 24" width="34" height="34" fill="#6a4fa3"><path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/></svg>',
 net:'<svg viewBox="0 0 24 24" width="34" height="34" fill="#6a4fa3"><path d="M12 21l3.5-4.5a5 5 0 0 0-7 0L12 21zm0-18C7.4 3 3.2 4.7 0 7.4l2 2.4A15.9 15.9 0 0 1 12 6c3.9 0 7.4 1.5 10 3.8l2-2.4C20.8 4.7 16.6 3 12 3zm0 6c-3 0-5.8 1.1-7.9 3l2 2.4A8.9 8.9 0 0 1 12 12c2.3 0 4.4.8 6 2.2l1.9-2.4A11.9 11.9 0 0 0 12 9z"/></svg>',
 pen:'<svg viewBox="0 0 24 24" width="34" height="34" fill="#6a4fa3"><path d="M3 17.2V21h3.8L17.9 9.9l-3.8-3.8L3 17.2zM20.7 7a1 1 0 0 0 0-1.4l-2.3-2.3a1 1 0 0 0-1.4 0l-1.8 1.8 3.8 3.8 1.7-1.9z"/></svg>'
};

/* S1 */
addScreen('Class setup',`<div style="direction:rtl;text-align:center;width:100%"><h1 style="font-size:42px;color:#463a5e;margin-bottom:24px">قبل أن نبدأ الدرس</h1><div class="grid2" style="max-width:900px;margin:0 auto 24px">${[['mic','افتح الميكروفون والكاميرا'],['net','تأكد أن الإنترنت يعمل بشكل جيد'],['cam','اجلس في مكان هادئ ومريح'],['pen','جهّز الورقة والقلم']].map(([k,t])=>`<div class="card" style="display:flex;align-items:center;gap:16px;padding:17px 22px">${ICONS[k]}<span style="font-size:23px;font-weight:700;color:#544867">${t}</span></div>`).join('')}</div><button id="soundcheck" class="speaker"></button><div id="soundcheck-label" style="font-size:20px;color:#76582b;margin-top:10px;font-weight:700">اضغط لاختبار الصوت</div><div id="soundcheck-text" dir="ltr" style="font-size:15px;color:#6f6680;margin-top:6px">Hello! Can you hear me?</div></div>`,el=>({onEnter(){const b=el.querySelector('#soundcheck'),label=el.querySelector('#soundcheck-label');b.onclick=()=>{b.style.boxShadow='0 0 0 12px rgba(123,94,167,.16),0 3px 0 #5a4385';label.textContent='… استمع';play('a_t_soundcheck.mp3',()=>{b.style.backgroundColor='#24a66a';b.style.boxShadow='0 3px 0 #187c50';label.textContent='الصوت يعمل ✓';});};}}));

/* S2 */
addScreen('Warm-up · two quick answers',`<div class="wrap"><span class="tag">WARM-UP · FROM YOUR LAST LESSONS</span><div class="lead">Two quick answers. Ready?</div><div class="sub">Listen, answer, then tap.</div><div id="warm-status" class="mini-label"></div><div id="warm-task"></div></div>`,el=>{
  let deck=[],i=0;
  function paint(){if(i>=deck.length){el.querySelector('#warm-task').innerHTML='<div class="task-card"><div class="lead">Warm-up complete.</div><div class="sub">Now four stations.</div></div>';return;}choiceTask(el.querySelector('#warm-task'),TASKS[deck[i]],{label:'Quick '+(i+1)+' / 2',onNext:()=>{i++;paint();}});}
  return{onEnter(){const errors=readJSON('khusoosi:wc2-u1-l4:errors',[]);const soundFirst=Array.isArray(errors)&&errors.some(x=>/mix|guess|sound/.test(x));deck=soundFirst?['soundcape','feelCold']:shuffle(['soundcape','feelCold']);el.querySelector('#warm-status').textContent=soundFirst?'This device: sound practice comes first.':'Two mixed review items.';i=0;paint();}};
});

/* S3 */
addScreen('Today · four stations',`<div class="wrap"><span class="tag">UNIT 1 · SCHOOL PRACTICE</span><div class="lead">Four stations. First with me, then by yourself.</div><div class="sub">Your goal: at least 3 independent station answers.</div><div class="grid4">${[['1','Greeting','Answer a real question.'],['2','Chant & numbers','Sing keywords. Fix a mistake.'],['3','Feelings','Ask and answer.'],['4','Sounds','Hear short and long. Add e.']].map(([n,t,p])=>`<div class="task-card station-card"><div class="num">STATION ${n}</div><h3>${t}</h3><p>${p}</p></div>`).join('')}</div><div class="school-note">School-style items are temporary H5 adaptations pending the current 1448 Workbook.</div></div>`);

/* S4 */
const OPS=[['Listen','استمع','a_t_listen.mp3','M3 9v6h4l5 5V4L7 9H3z'],['Circle','ضع دائرة','a_t_circle.mp3','M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 3a6 6 0 1 1 0 12 6 6 0 0 1 0-12z'],['Match','صِل','a_t_match.mp3','M4 7h5v3H4zm11 10h5v3h-5zM8 8h8v8h3v3h-3v-8H8z'],['Number','رقّم','', 'M5 4h14v16H5zM8 8h2v2H8zm0 6h6v2H8z'],['Trace','تتبّع','a_t_trace.mp3','M4 18L18 4l2 2L6 20H4v-2zm4-1l2 2-2 2-2-2z']];
addScreen('School command words',`<div class="wrap"><span class="tag">SCHOOL COMMANDS · TEMPORARY U1 SET</span><div class="lead">Hear it. Show the action.</div><div class="grid4" style="grid-template-columns:repeat(5,minmax(0,1fr));margin-top:18px">${OPS.map(([en,ar,au,path])=>`<button class="task-card op-card" data-op="${en}" ${au?`data-audio="${au}"`:''}><div class="op-icon"><svg viewBox="0 0 24 24" width="52" height="52" fill="currentColor"><path d="${path}"/></svg></div><h3>${en}</h3><div class="ar">${ar}</div></button>`).join('')}</div><div id="op-feedback" class="feedback">Point, circle, match, number or trace with one finger.</div><div class="school-note">Temporary command list · pending 1448 Workbook verification</div></div>`,el=>({onEnter(){el.querySelectorAll('.op-card').forEach(b=>b.addEventListener('click',()=>{el.querySelector('#op-feedback').textContent=b.dataset.op==='Number'?'Teacher says “Number.” Write 1, then 2.':b.dataset.op+': show the action with one finger.';}));}}));

/* S5 */
addScreen('Station 1 · greeting model',`<div class="wide" style="display:grid;grid-template-columns:300px 1fr;gap:30px;align-items:center"><div><img class="pic" src="${A}wc2_talk_b.png" style="width:100%;max-height:390px"><div class="book-ref">Student Book · Unit 1 · Talk Time</div></div><div class="task-card"><span class="tag">STATION 1 · LISTEN TO ALL FIVE TURNS</span><div class="dialogue" style="margin-top:14px">${[['a_official_tt1.mp3',"A · Hi. It's nice to meet you."],['a_official_tt2.mp3',"B · It's nice to meet you, too."],['a_official_tt3.mp3','A · Hi. How are you?'],['a_official_tt4.mp3',"B · I'm great, thanks. And you?"],['a_official_tt5.mp3',"A · I'm fine."]].map(([au,t])=>`<button class="speaker" data-audio="${au}" aria-label="Play line"></button><div class="line">${t}</div>`).join('')}</div></div></div>`);

/* S6 */
addScreen('Station 1 · say before you choose',`<div class="wrap"><span class="tag">STATION 1 · YOUR TURN</span><div class="lead">Answer aloud first. Then choose.</div><div class="grid2" style="align-items:center;max-width:980px;margin:auto"><img class="pic" src="${A}wc2_talk_b.png" style="height:300px"><div class="task-card"><div class="audio-line"><button class="speaker small" data-audio="a_official_tt3.mp3"></button><div class="caption">“How are you?”</div></div><div id="greet-model" style="min-height:54px;margin-top:8px;font-size:22px;font-weight:850;color:#4a3a6e">Your answer is hidden.</div><div class="row" style="margin-top:8px"><button id="greet-tried" class="action">I answered</button><button id="greet-help" class="action secondary" disabled>Help</button><button id="greet-model-btn" class="action secondary" disabled>Model</button></div><div class="row" style="margin-top:8px"><button id="greet-hide" class="action amber" disabled>Hide help · Try again</button></div><div class="row" style="margin-top:10px"><button class="action secondary greet-choice" data-ok="1" disabled>I'm great, thanks. And you?</button><button class="action secondary greet-choice" data-ok="0" disabled>It's nice to meet you, too.</button></div><div id="greet-choice-feedback" class="feedback"></div></div></div></div>`,el=>{
  let tried=false;
  return{onEnter(){tried=false;const view=el.querySelector('#greet-model'),choices=[...el.querySelectorAll('.greet-choice')];view.textContent='Your answer is hidden.';const triedBtn=el.querySelector('#greet-tried'),help=el.querySelector('#greet-help'),model=el.querySelector('#greet-model-btn'),hide=el.querySelector('#greet-hide');triedBtn.disabled=false;help.disabled=true;model.disabled=true;hide.disabled=true;choices.forEach(b=>{b.disabled=true;b.classList.remove('green');});el.querySelector('#greet-choice-feedback').textContent='';
    triedBtn.onclick=()=>{tried=true;triedBtn.disabled=true;help.disabled=false;model.disabled=false;view.textContent='Now choose the response you said.';choices.forEach(b=>b.disabled=false);};
    help.onclick=()=>{view.innerHTML='<span class="help-flash">I’m great …</span>';hide.disabled=false;state.help.push('greeting-practice');save();};
    model.onclick=()=>{if(!tried)return;view.textContent="I'm great, thanks. And you?";play('a_official_tt4.mp3');hide.disabled=false;};
    hide.onclick=()=>{stopAudio();view.textContent='No words now. Answer the same question again.';help.disabled=true;model.disabled=true;hide.disabled=true;triedBtn.disabled=false;triedBtn.textContent='I answered again';choices.forEach(b=>b.disabled=true);};
    choices.forEach(b=>b.onclick=()=>{if(b.dataset.ok==='1'){b.classList.add('green');sfx('sfx_correct.mp3');el.querySelector('#greet-choice-feedback').textContent='That matches the Unit 1 response.';}else{sfx('sfx_wrong.mp3');el.querySelector('#greet-choice-feedback').textContent='Listen to the question and try again.';}});
  }};
});

/* S7 */
addScreen('Station 2 · chant model',`<div class="wide" style="display:grid;grid-template-columns:260px 1fr;gap:30px;align-items:center"><div><img class="pic" src="${A}l2_chant_girl.jpg" style="height:390px"><div class="book-ref">Student Book · Unit 1 · Page 6</div></div><div class="task-card"><span class="tag">OFFICIAL CHANT · CLAP VERSE</span><div class="audio-line"><button class="speaker" data-audio="a_official_chant_clap.mp3"></button><div class="caption">Listen, sing the keywords, then tap them.</div></div><div style="font-size:24px;line-height:1.55;font-weight:750;color:#3d3356;text-align:left">If you're <button class="keyword action secondary" data-key="happy">happy</button> and you know it,<br><button class="keyword action secondary" data-key="clap">clap your hands</button>.<br>If you're happy and you know it, then your face will surely show it.<br>If you're happy and you know it, clap your hands.</div><div id="chant-feedback" class="feedback">Find 2 keyword groups.</div></div></div>`,el=>({onEnter(){const found=new Set();el.querySelectorAll('.keyword').forEach(b=>b.onclick=()=>{found.add(b.dataset.key);b.classList.remove('secondary');b.classList.add('green');el.querySelector('#chant-feedback').textContent=found.size===2?'Both keyword groups found. Sing once more.':found.size+' / 2 keyword groups';});}}));

/* S8 */
addScreen('Station 2 · fix the number',`<div class="wrap"><span class="tag">STATION 2 · CONFUSION GAME</span><div class="lead">Say the correction. Then choose it.</div><div id="ordinal-practice"></div><div id="ord-model-text" class="feedback"></div><div class="row" style="margin-top:8px"><button id="ord-tried" class="action">I said it</button><button id="ord-model" class="action secondary" disabled>Model</button><button id="ord-hide" class="action amber" disabled>Hide help · Say again</button></div></div>`,el=>{
  let controller;
  return{onEnter(){const tried=el.querySelector('#ord-tried'),model=el.querySelector('#ord-model'),hide=el.querySelector('#ord-hide'),modelText=el.querySelector('#ord-model-text');tried.disabled=false;tried.textContent='I said it';model.disabled=true;hide.disabled=true;modelText.textContent='';
    controller=choiceTask(el.querySelector('#ordinal-practice'),TASKS.ordinalF,{retry:true,next:false,gated:true});
    tried.onclick=()=>{tried.disabled=true;model.disabled=false;controller.unlock();};
    model.onclick=()=>{modelText.textContent="No, it's the sixth letter.";play('a_t_no_sixth.mp3');hide.disabled=false;};
    hide.onclick=()=>{stopAudio();modelText.textContent='';model.disabled=true;hide.disabled=true;tried.disabled=false;tried.textContent='I corrected it again';controller=choiceTask(el.querySelector('#ordinal-practice'),TASKS.ordinalF,{retry:true,next:false,gated:true});};
  }};
});

/* S9 */
addScreen('Station 3 · feelings model',`<div class="wide" style="display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:center"><div class="task-card"><span class="tag">ASK WITH THE COMPLETE QUESTION</span><div class="audio-line"><button class="speaker" data-audio="a_official_wtm.mp3"></button><div class="caption" style="font-size:32px">What<b style="color:#d97706">’s</b> the matter?</div></div><div class="ar" style="font-size:18px;color:#6f6680">ما الأمر؟</div><div class="sub" style="margin-top:18px">Teacher asks. Student answers with “I’m …”.</div></div><div class="task-card"><img class="pic" src="${A}${FEELINGS.hungry.img}" style="width:100%;height:240px"><div class="audio-line"><button class="speaker" data-audio="${FEELINGS.hungry.audio}"></button><div class="caption">I’m hungry.</div></div></div></div>`);

/* S10 */
addScreen('Station 3 · listen and match',`<div class="wrap"><span class="tag">STATION 3 · TWO ROUNDS</span><div class="lead">Listen and match. Then repeat the sentence.</div><div id="feel-practice"></div></div>`,el=>{let deck=[],i=0;function paint(){if(i>=deck.length){el.querySelector('#feel-practice').innerHTML='<div class="task-card"><div class="lead">Two feeling answers matched.</div></div>';return;}choiceTask(el.querySelector('#feel-practice'),TASKS[deck[i]],{retry:true,next:false,onAnswer:()=>{const n=document.createElement('button');n.className='action amber';n.textContent=i===deck.length-1?'Finish station':'Next picture';n.onclick=()=>{i++;paint();};el.querySelector('#feel-practice .next-row').appendChild(n);}});}return{onEnter(){deck=shuffle(['feelHungry','feelCold']);i=0;paint();}};});

/* S11 */
addScreen('Station 4 · listen and number',`<div class="wrap"><span class="tag">STATION 4 · LISTEN TO THE WHOLE WORD</span><div class="lead">Hear one word. Tap box 1 or box 2.</div><div id="sound-number"></div></div>`,el=>{
  const rounds=[{left:'cap',right:'cape',target:'cape'},{left:'pin',right:'pine',target:'pin'}];let i=0;
  function paint(){if(i>=rounds.length){el.querySelector('#sound-number').innerHTML='<div class="task-card"><div class="lead">Two listening rounds complete.</div></div>';return;}const r=rounds[i];const t={station:'sounds',title:'Which box?',audio:WORDS[r.target].audio,caption:'One word. The word stays hidden until you answer.',heard:r.target,options:[picOpt('1',WORDS[r.left].img,'1 · '+r.left),picOpt('2',WORDS[r.right].img,'2 · '+r.right)],answer:r.target===r.left?'1':'2'};choiceTask(el.querySelector('#sound-number'),t,{retry:true,next:false,onAnswer:()=>{const n=document.createElement('button');n.className='action amber';n.textContent=i===0?'Next pair':'Finish station';n.onclick=()=>{i++;paint();};el.querySelector('#sound-number .next-row').appendChild(n);}});}
  return{onEnter(){i=0;paint();}};
});

/* S12 */
addScreen('Station 4 · add e',`<div class="wrap"><span class="tag">SAY THE NEW WORD · THEN ADD E</span><div class="lead">cap → cap_ &nbsp;&nbsp; pin → pin_</div><div id="missing-e"></div></div>`,el=>{
  const rounds=[{base:'c a p _',word:'cape'},{base:'p i n _',word:'pine'}];let i=0;
  function paint(){if(i>=rounds.length){el.querySelector('#missing-e').innerHTML='<div class="task-card"><div class="lead">cape · pine</div><div class="sub">You added e to both words.</div></div>';return;}const r=rounds[i];const t={station:'sounds',title:r.base+'  →  say it, then choose',audio:'a_t_missing_e.mp3',caption:'Add the magic e.',options:[textOpt('a','a'),textOpt('e','e'),textOpt('i','i')],answer:'e'};choiceTask(el.querySelector('#missing-e'),t,{retry:true,next:false,onAnswer:()=>{play(WORDS[r.word].audio);const n=document.createElement('button');n.className='action amber';n.textContent=i===0?'Next word':'Finish';n.onclick=()=>{i++;paint();};el.querySelector('#missing-e .next-row').appendChild(n);}});}
  return{onEnter(){i=0;paint();}};
});

/* S13 */
addScreen('Unit 1 Rush · eight mixed items',`<div class="wrap"><span class="tag">UNIT 1 RUSH · ACCURACY FIRST</span><div class="lead">Eight questions. One answer, then Next.</div><div id="rush-task"></div></div>`,el=>{
  let deck=[],i=0;
  function paint(){if(i>=deck.length){el.querySelector('#rush-task').innerHTML=`<div class="task-card"><div class="lead">Rush complete.</div><div class="sub">${state.rushErrors.length?'Your missed items move to the next page.':'No Rush errors this round.'}</div></div>`;save();return;}choiceTask(el.querySelector('#rush-task'),TASKS[deck[i]],{label:'Rush '+(i+1)+' / 8',onAnswer:r=>{if(!r.correct&&!state.rushErrors.includes(r.task===TASKS[deck[i]]?deck[i]:'')){const id=deck[i];if(!state.rushErrors.includes(id))state.rushErrors.push(id);}save();},onNext:()=>{i++;paint();}});}
  return{onEnter(){deck=shuffle(['greetHow','greetNice','ordinalF','ordinalE','feelHungry','feelScared','soundcape','soundpin']);i=0;state.rushErrors=[];paint();}};
});

/* S14 */
addScreen('Rush review · same ability, new item',`<div class="wrap"><span class="tag">RUSH REVIEW · ONLY MISSED ITEMS</span><div class="lead">Look. Try a new one.</div><div id="rush-retry"></div></div>`,el=>{
  let deck=[],i=0;
  function paint(){if(i>=deck.length){el.querySelector('#rush-retry').innerHTML='<div class="task-card"><div class="lead">Rush review complete.</div></div>';return;}choiceTask(el.querySelector('#rush-retry'),TASKS[deck[i]],{label:'Try again · same ability',retry:true,next:false,onAnswer:()=>{const n=document.createElement('button');n.className='action amber';n.textContent='Next review item';n.onclick=()=>{i++;paint();};el.querySelector('#rush-retry .next-row').appendChild(n);}});}
  return{onEnter(){deck=state.rushErrors.map(id=>PARALLEL[id]||id);i=0;if(!deck.length)el.querySelector('#rush-retry').innerHTML='<div class="task-card"><div class="lead">No Rush errors.</div><div class="sub">Move to independent Check 1.</div></div>';else paint();}};
});

/* S15 */
addScreen('Check 1 · four independent stations',`<div class="wrap"><span class="tag">CHECK 1 · NO ARABIC · NO HELP</span><div class="lead">Four stations. Answer by yourself.</div><div id="check1-task"></div></div>`,el=>{
  let deck=[],i=0;
  function paint(){if(i>=deck.length){const count=Object.values(state.check1).filter(x=>x.firstTry).length;el.querySelector('#check1-task').innerHTML=`<div class="task-card"><div class="lead">${count} / 4 independent answers</div><div class="sub">Next: repair one failed station, then check it again.</div></div>`;save();return;}const id=deck[i];choiceTask(el.querySelector('#check1-task'),TASKS[id],{label:'Check 1 · '+(i+1)+' / 4',onAnswer:r=>{state.check1[r.task.station]={firstTry:r.correct,error:r.correct?null:'first answer incorrect',source:id};save();},onNext:()=>{i++;paint();}});}
  return{onEnter(){deck=shuffle(['greetHow','ordinalF','feelCold','soundpine']);i=0;state.check1={};state.check2={};paint();}};
});

/* S16 */
addScreen('Repair one station · Check 2',`<div class="wide"><span class="tag">HELP FADES · SAME ABILITY · NEW ITEM</span><div class="lead" id="repair-title">Repair one station</div><div class="grid2" style="align-items:start"><div id="repair-visual" class="task-card repair-view"></div><div><div id="repair-copy" class="task-card" style="min-height:190px;font-size:22px;font-weight:750;line-height:1.45;color:#3d3356"></div><div class="repair-steps">${['Meaning','Slow','Contrast','Model','Build','Hide help','Try again'].map((t,i)=>`<button class="action secondary repair-step" data-step="${i}">${i+1} ${t}</button>`).join('')}</div></div></div></div>`,el=>{
  let target=null,nextStep=0;
  const content={
    greeting:{meaning:'How are you? = كيف حالك؟<br>Answer about YOU.',audio:'a_official_tt3.mp3',contrast:'Question: How are you?<br>Answer: I’m great, thanks.',model:"I'm great, thanks. And you?",modelAudio:'a_official_tt4.mp3',build:'I’m → great, thanks → And you?',visual:'wc2_talk_b.png'},
    ordinal:{meaning:'F is number 6.<br>E is 5; F is 6.',audio:'a_t_f_seventh.mp3',contrast:'E = fifth<br>F = sixth',model:"No, it's the sixth letter.",modelAudio:'a_t_no_sixth.mp3',build:'No → it’s the → sixth → letter',visual:'l2_ordinals.png'},
    feelings:{meaning:'cold = يشعر بالبرد<br>hot = يشعر بالحر',audio:'a_official_wtm.mp3',contrast:'I’m cold. ≠ I’m hot.',model:"I'm cold.",modelAudio:'a_official_ans_cold.mp3',build:'I’m → cold',visual:'ft_cold.jpg'},
    sounds:{meaning:'short a: cap<br>long a_e: cape',audio:'a_t_w_pine.mp3',contrast:'pin = short i<br>pine = long i_e',model:'pine',modelAudio:'a_t_w_pine.mp3',build:'p → i → n → e',visual:'magic_e.jpg'}
  };
  function paintStep(step){const c=content[target];stopAudio();el.querySelector('#repair-visual').innerHTML=`<img class="pic" src="${A}${c.visual}" style="max-height:250px;width:100%">`;
    if(step===0)el.querySelector('#repair-copy').innerHTML=c.meaning;
    if(step===1){el.querySelector('#repair-copy').textContent='Listen slowly. Watch, then repeat.';play(c.audio,null,true);}
    if(step===2)el.querySelector('#repair-copy').innerHTML=c.contrast;
    if(step===3){el.querySelector('#repair-copy').textContent=c.model;play(c.modelAudio);}
    if(step===4)el.querySelector('#repair-copy').innerHTML='<div class="help-flash">'+c.build+'</div>';
    if(step===5){el.querySelector('#repair-copy').textContent='No model. No Arabic. Get ready for a new item.';el.querySelector('#repair-visual').innerHTML='<div class="lead">Help is hidden.</div>';}
    if(step===6){const id={greeting:'greetNice',ordinal:'ordinalB',feelings:'feelHot',sounds:'soundcap'}[target];el.querySelector('#repair-copy').innerHTML='<div class="mini-label">CHECK 2</div>';choiceTask(el.querySelector('#repair-copy'),TASKS[id],{label:'Check 2 · new item',onAnswer:r=>{state.check2[target]={correct:r.correct,source:id};save();},nextLabel:'Finish Check 2',onNext:()=>toast('Check 2 recorded. Continue to school practice.')});}
  }
  return{onEnter(){nextStep=0;el.querySelectorAll('.repair-step').forEach(b=>{b.disabled=false;b.classList.remove('done');b.classList.add('secondary');});const checks=state.check1||{};const failed=Object.keys(STATIONS).filter(k=>checks[k]&&!checks[k].firstTry);const missing=Object.keys(STATIONS).filter(k=>!checks[k]);target=failed[0]||null;
    if(missing.length===4){el.querySelector('#repair-title').textContent='Complete Check 1 first';el.querySelector('#repair-visual').innerHTML='<button id="go-check1" class="action">Go to Check 1</button>';el.querySelector('#repair-copy').textContent='Four independent answers are needed before repair.';el.querySelectorAll('.repair-step').forEach(b=>b.disabled=true);el.querySelector('#go-check1').onclick=()=>show(14);return;}
    if(!target){el.querySelector('#repair-title').textContent='All four Check 1 answers were independent';el.querySelector('#repair-visual').innerHTML='<div class="lead">No repair needed.</div>';el.querySelector('#repair-copy').textContent='Continue. Do not invent an error or repeat the whole unit.';el.querySelectorAll('.repair-step').forEach(b=>b.disabled=true);return;}
    el.querySelector('#repair-title').textContent='Repair: '+STATIONS[target];el.querySelector('#repair-copy').textContent='Start with Meaning. Follow the seven steps in order.';el.querySelector('#repair-visual').innerHTML=`<img class="pic" src="${A}${content[target].visual}" style="max-height:250px;width:100%">`;
    el.querySelectorAll('.repair-step').forEach(b=>b.onclick=()=>{const step=+b.dataset.step;if(step!==nextStep){toast('Follow the next repair step.');return;}paintStep(step);b.classList.remove('secondary');b.classList.add('done');nextStep++;});
  }};
});

/* S17 */
addScreen('School interface · Number',`<div class="wrap"><span class="tag">SCHOOL INTERFACE · NUMBER</span><div class="lead">Listen. Tap number 1 or 2.</div><div id="school-number"></div><div class="school-note">Temporary H5 imitation · pending current 1448 Workbook verification</div></div>`,el=>{
  const rounds=[{left:'tap',right:'tape',target:'tape'},{left:'Tim',right:'time',target:'Tim'}];let i=0;
  function paint(){if(i>=rounds.length){el.querySelector('#school-number').innerHTML='<div class="task-card"><div class="lead">Number task complete.</div></div>';return;}const r=rounds[i];choiceTask(el.querySelector('#school-number'),{station:'sounds',title:'Which number?',audio:WORDS[r.target].audio,caption:'Listen to one complete word.',heard:r.target,options:[picOpt('1',WORDS[r.left].img,'1 · '+r.left),picOpt('2',WORDS[r.right].img,'2 · '+r.right)],answer:r.target===r.left?'1':'2'},{retry:true,next:false,onAnswer:()=>{const n=document.createElement('button');n.className='action amber';n.textContent=i===0?'Next item':'Finish';n.onclick=()=>{i++;paint();};el.querySelector('#school-number .next-row').appendChild(n);}});}
  return{onEnter(){i=0;paint();}};
});

/* S18 */
addScreen('School interface · Match and write',`<div class="wrap"><span class="tag">SCHOOL INTERFACE · MATCH + MISSING LETTER</span><div class="lead">Match the picture. Then add e.</div><div id="school-match"></div><div class="school-note">Temporary H5 imitation · pending current 1448 Workbook verification</div></div>`,el=>{
  let i=0;
  function paint(){
    if(i===0){
      choiceTask(el.querySelector('#school-match'),TASKS.feelThirsty,{label:'Match · no Arabic',next:false,retry:true,onAnswer:()=>{
        const n=document.createElement('button');n.className='action amber';n.textContent='Next: missing letter';n.onclick=()=>{i=1;paint();};el.querySelector('#school-match .next-row').appendChild(n);
      }});
    }else{
      choiceTask(el.querySelector('#school-match'),{station:'sounds',title:'p i n _  →  choose the missing letter',audio:'a_t_missing_e.mp3',caption:'Add the magic e.',options:[textOpt('e','e'),textOpt('a','a'),textOpt('o','o')],answer:'e'},{retry:true,next:false,onAnswer:()=>{play('a_t_w_pine.mp3');}});
    }
  }
  return{onEnter(){i=0;paint();}};
});

/* S19 */
addScreen('Today’s learning evidence',`<div class="wrap"><span class="tag">ACTUAL CLASSROOM ACTIONS · NOT A GRADE</span><div class="lead">What happened today?</div><div class="evidence" id="evidence"></div><div class="sub" style="margin-top:18px">Review includes all four station types and the items that still need practice.</div></div>`,el=>({onEnter(){const c=state.check1||{};el.querySelector('#evidence').innerHTML=Object.entries(STATIONS).map(([k,title])=>{let text='Not checked';if(c[k])text=c[k].firstTry?'Independent objective answer':'First answer incorrect';if(state.check2[k])text+=state.check2[k].correct?' · Check 2 correct':' · Check 2 needs practice';return`<div class="task-card"><div class="mini-label">${STATIONS[k]}</div><h3>${c[k]?'Task completed':'Not completed'}</h3><p>${text}</p></div>`;}).join('');state.stations=c;save();}}));

/* S20 */
addScreen('Exit · four quick tasks + Review',`<div class="wide" style="display:grid;grid-template-columns:1.5fr .85fr;gap:24px;align-items:start"><div><span class="tag">EXIT · HELP HIDES AFTER 5 SECONDS</span><div class="lead">Four quick tasks.</div><div id="exit-task"></div></div><div class="task-card" style="text-align:center"><div class="task-title">Home Review</div><img src="${A}sec_qr_review.png" alt="Home review QR" style="width:190px;height:190px;object-fit:contain;background:#fff"><a href="review/" target="_blank" class="action green" style="display:inline-block;text-decoration:none;margin-top:10px">Open four-station Review</a><div class="sub" style="margin-top:12px;font-size:15px">Scan the code or tap the button.</div><div class="ar" style="font-size:15px;color:#6f6680">امسح الرمز أو اضغط الزر</div></div></div>`,el=>{
  let queue=[],i=0,retried=new Set();
  function paint(){if(i>=queue.length){el.querySelector('#exit-task').innerHTML='<div class="task-card"><div class="lead">Exit tasks complete.</div><div class="sub">Choose Review for more practice.</div></div>';save();return;}const item=queue[i],id=item.id;choiceTask(el.querySelector('#exit-task'),TASKS[id],{label:'Exit · '+(i+1)+' / '+queue.length,help:true,onHelp:()=>{if(!state.help.includes('exit-'+id))state.help.push('exit-'+id);save();},onAnswer:r=>{state.exit.push({id,correct:r.correct,helped:r.helped,retry:!!item.retry});save();if(r.helped&&!item.retry&&!retried.has(id)){retried.add(id);queue.push({id:PARALLEL[id]||id,retry:true});}},onNext:()=>{i++;paint();}});}
  return{onEnter(){queue=[{id:'greetNice'},{id:'ordinalE'},{id:'feelSleepy'},{id:'soundtap'}];i=0;retried=new Set();state.exit=[];paint();}};
});

/* Pages, local continuation, and a new-class reset scoped to this lesson. */
(function(){const th=$('#thumbs');screens.forEach((s,k)=>{const b=document.createElement('button');b.dataset.page=k;b.textContent=(k+1)+' · '+s.objective;b.onclick=()=>{show(k);th.classList.remove('open');};th.appendChild(b);});const reset=document.createElement('button');reset.id='new-class';reset.textContent='Start a new class';reset.onclick=()=>{try{const old=localStorage.getItem(STORE);if(old){const history=readJSON('khusoosi:'+LESSON_KEY+':history',[]);history.push({savedAt:new Date().toISOString(),progress:JSON.parse(old)});localStorage.setItem('khusoosi:'+LESSON_KEY+':history',JSON.stringify(history.slice(-10)));}localStorage.removeItem(STORE);}catch(e){}location.href=location.pathname+'?p=1';};th.appendChild(reset);})();
const query=new URLSearchParams(location.search);const p0=parseInt(query.get('p')||'1',10);if(query.get('ar')){document.body.classList.add('ar-on');$('#btn-ar').setAttribute('aria-pressed','true');}if(query.get('teacher')){document.body.classList.add('teacher-on');$('#btn-teacher').setAttribute('aria-pressed','true');}
fit();show(Number.isNaN(p0)?0:p0-1);
