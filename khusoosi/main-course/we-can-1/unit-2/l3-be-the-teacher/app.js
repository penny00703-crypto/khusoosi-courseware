'use strict';
(()=>{
  const D=L10_DATA,T=D.targets,V=L10_VISUALS,qa=new URLSearchParams(location.search).get('qa')==='1';
  const KEY='khusoosi:classroom:wc1:u2:l3:teaching-v216:'+(qa?'qa':'preview');
  const lesson=document.querySelector('#lesson'),audio=document.querySelector('#voice');
  const speaker='<span class="speaker" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z"/></svg></span>';
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let history=[],storageOkay=true,teacherView='notes',timer,lastScene=null;
  const shuffle=(list,seed)=>{let a=list.slice();for(let i=a.length-1;i>0;i--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;let j=seed%(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;};
  function choices(key,seed){let distractors=shuffle(Object.keys(T).filter(k=>k!==key&&k!==T[key].other),seed);return shuffle([key,T[key].other,distractors[0]],seed+51);}
  function fresh(){const seed=Date.now()>>>0;const keys=shuffle(['stand','sit','front','seat',seed%2?'line':'circle'],seed);return {schema:3,id:'class-'+Date.now().toString(36),seed,page:0,sound:false,heard:{},group:'line',game:0,fixed:false,comp:0,questions:keys.map((k,i)=>({key:k,choices:choices(k,seed+i*73),help:false,picked:null,record:null})),oral:0,attempt:{sent:false,help:false,hint:false,attempted:false,model:false},repairQueue:null,repairIndex:0,repairStep:0,repairPick:null,groupPhase:'first',groupDone:false,bookRound:0,schoolStage:0,school:0,schoolItems:['circle','seat'].map((k,i)=>({key:k,choices:choices(k,seed+600+i*47),picked:null})),exitKey:seed%2?'stand':'sit',exitDone:false,records:[],started:new Date().toISOString()};}
  let s=fresh();
  try{const data=JSON.parse(localStorage.getItem(KEY)||'null');if(data?.schema===3&&data.current?.questions?.length===5){s=data.current;history=Array.isArray(data.history)?data.history:[];}}catch{storageOkay=false;}
  function save(){try{localStorage.setItem(KEY,JSON.stringify({schema:3,current:s,history}));storageOkay=true;}catch{storageOkay=false;notice('Progress stays in this tab.');}}
  function stop(){audio.pause();audio.currentTime=0;document.querySelectorAll('.playing').forEach(b=>{b.classList.remove('playing');b.removeAttribute('aria-busy');});}
  function play(file,button,rate=1){stop();if(file==='a_t_okay.mp3'){const caption=lesson.querySelector('.scene-bubble');if(caption)caption.textContent='Okay!';}audio.src='assets/'+file;audio.playbackRate=rate;audio.preservesPitch=true;if(button){button.classList.add('playing');button.setAttribute('aria-busy','true');}audio.play().catch(()=>notice('Audio could not play. Please try again.'));audio.onended=()=>{button?.classList.remove('playing');button?.removeAttribute('aria-busy');};audio.onerror=()=>notice('This audio file is unavailable.');}
  function notice(msg){clearTimeout(timer);const n=document.querySelector('#notice');n.textContent=msg;n.hidden=false;timer=setTimeout(()=>n.hidden=true,4000);}
  function model(key,action='audio',slow=false){return `<button class="model" data-action="${action}" data-key="${key}">${speaker}<span>${T[key].text}</span></button>${slow?'<div class="source-label">OFFICIAL MODEL · SLOW PLAYBACK</div>':''}`;}
  function guide(){return `<button class="guide" data-action="guide">${speaker}<span>Your turn. Give a command.</span></button>`;}
  function title(kicker,title,instruction=''){return `<p class="eyebrow">${kicker}</p><h1>${title}</h1>${instruction?`<p class="instruction">${instruction}</p>`:''}`;}
  function layout(left,right,classes=''){return `<div class="lesson-layout ${classes}"><div class="lesson-copy">${left}</div>${right}</div>`;}
  function goal(key){return `<div class="goal-block"><span>YOUR GOAL · LOOK, THEN SPEAK</span>${V.goal(key,'pip')}</div>`;}
  function moveScene(){
    const scene=lesson.querySelector('.scene-wrap');
    if(!scene){lastScene=null;return;}
    const actors=[...scene.querySelectorAll('.actor')];
    const now={character:scene.dataset.character,poses:actors.map(a=>({position:a.getAttribute('transform'),upper:a.lastElementChild.getAttribute('transform')}))};
    if(lastScene?.character===now.character&&lastScene.poses.length===actors.length&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
      const cssTransform=t=>t.replace(/translate\(([-\d.]+) ([-\d.]+)\)/,'translate($1px, $2px)');
      actors.forEach((a,i)=>{
        const previous=lastScene.poses[i],next=now.poses[i];
        if(previous.position!==next.position)a.animate([{transform:cssTransform(previous.position)},{transform:cssTransform(next.position)}],{duration:500,easing:'cubic-bezier(.22,1,.36,1)'});
        if(previous.upper!==next.upper)a.lastElementChild.animate([{transform:cssTransform(previous.upper)},{transform:cssTransform(next.upper)}],{duration:450,easing:'cubic-bezier(.22,1,.36,1)'});
      });
    }
    lastScene=now;
  }
  function button(action,label,cls='primary action',attrs=''){return `<button class="${cls}" data-action="${action}" ${attrs}>${label}</button>`;}
  const pairPages={2:['stand','sit'],3:['front','seat'],4:['line','circle']};
  function firstRecords(skill){return s.records.filter(r=>r.skill===skill&&r.phase==='first');}
  function locked(){return [7,9,12].includes(s.page)||s.page===8&&repairStage()==='recheck';}
  function allowed(){
    switch(s.page){case 0:return s.sound;case 1:return s.heard.open&&s.heard.nose;case 2:case 3:case 4:return pairPages[s.page].every(k=>s.heard[k]);case 5:return s.game>=3;case 6:return s.comp>=5;case 7:return s.oral>=2;case 8:return s.repairQueue!==null&&s.repairIndex>=s.repairQueue.length;case 9:return s.groupDone;case 10:return s.bookRound>=2;case 11:return s.school>=2;case 12:return s.exitDone;default:return true;}
  }
  function currentOralKey(){return s.page===7?['sit','stand'][s.oral]:s.page===9?s.group:s.exitKey;}
  function addRecord(key,skill,grade,help,extra={}){const r={id:s.id+'-'+s.records.length,session:s.id,target:key,sentence:T[key].text,skill,phase:'first',first_check:grade,help_used:help,help_type:help?'first-word/model':'none',created_at:new Date().toISOString(),rechecks:[],scope:'local-classroom-preview',actor:skill==='spoken-command'?'teacher':'teacher-operated-choice',...extra};s.records.push(r);save();return r;}
  function render(){stop();const p=s.page;document.querySelector('#objective').textContent=D.pages[p];document.querySelector('#progress').style.width=((p+1)/D.pages.length*100)+'%';document.querySelector('#thumbs').hidden=true;document.querySelector('#pages').setAttribute('aria-expanded','false');document.querySelector('#page-number').textContent=`${p+1} / ${D.pages.length}`;document.querySelector('#back').disabled=p===0;const next=document.querySelector('#next');next.disabled=!allowed();next.textContent='Next →';next.hidden=p===13;document.querySelector('#teacher-panel').hidden=true;document.querySelector('#teacher').setAttribute('aria-expanded','false');
    if(p===0)renderPrep();if(p===1)renderWarmup();if(pairPages[p])renderInput();if(p===5)renderGame();if(p===6)renderComprehension();if(p===7)renderOral();if(p===8)renderRepair();if(p===9){if(s.groupPhase==='repair')renderRepair(true);else renderOral();}if(p===10)renderBook();if(p===11)renderSchool();if(p===12)renderOral();if(p===13)renderResults();
    const workbook=lesson.querySelector('img[src$="workbook-goal13-activity1.png"]');
    if(workbook)workbook.parentElement.innerHTML='<svg viewBox="0 0 831 698" style="width:100%;height:100%" role="img" aria-label="Complete Workbook Activity 1; adjacent Activity 2 excluded"><image width="831" height="698" href="assets/workbook-goal13-activity1.png"/><rect x="0" y="679" width="320" height="19" fill="white"/></svg>';
    const supportRecord=(s.page===8||s.page===9&&s.groupPhase==='repair')?repairRecord(s.page===9):null;
    if(supportRecord&&(supportRecord.first_check==='C'||supportRecord.first_check==='practice-request')&&repairStage(s.page===9)==='support'){
      supportRecord.repair_status='in-progress';
      supportRecord.support_events??=[];
      if(!supportRecord.support_events.some(e=>e.step===s.repairStep))supportRecord.support_events.push({step:s.repairStep,label:repairSteps[s.repairStep],event:'support-shown',at:new Date().toISOString()});
    }
    moveScene();next.hidden=false;next.disabled=!allowed()||s.page===13;save();renderTeacher();
  }
  function renderPrep(){lesson.innerHTML=layout(`<div class="prep">${title('READY TO LEARN','أهلاً بك!')}<p>ابقَ جالساً. شاهد روبو،<br>وتحدّث مع معلّمك.</p><p>المعلّم يضغط على الشاشة.</p><button class="guide" data-action="sound">${speaker}<span>Hello! Can you hear me?</span></button>${button('sound-confirm',s.sound?'الصوت واضح ✓':'أسمع الصوت بوضوح')}${s.sound?'<span class="sound-done">لنبدأ!</span>':''}</div>`,`<div class="prep-art" lang="ar" dir="rtl"><div class="prep-card"><span>🎧</span> اختبر الصوت</div><div class="prep-card"><span>👀</span> شاهد الشاشة</div><div class="prep-card"><span>💬</span> تكلّم مع معلّمك</div></div>`);}
  function renderWarmup(){const key=s.warmup||'open';lesson.innerHTML=layout(title('A QUICK HELLO','Hello, <span class="accent">Robo!</span>','Say it. Robo will try it.')+`<div class="model-list"><button class="model" data-action="warmup" data-key="open">${speaker}<span>Open your eyes.</span></button><button class="model" data-action="warmup" data-key="nose">${speaker}<span>Touch your nose.</span></button></div><div class="source-label">PRACTICE · FAMILIAR WORDS</div>`,key==='open'?V.scene(s.heard.open?'stand':'closed','robo',s.heard.open?'Hello!':'…') :V.scene('nose','robo','My nose!'));}
  function renderInput(){const keys=pairPages[s.page],key=s.model&&keys.includes(s.model)?s.model:keys[0];const heads={2:['UP AND DOWN','Teach <span class="accent">Robo.</span>','Watch Robo. Say it with me.'],3:['HERE AND THERE','Where should <span class="accent">Robo go?</span>','Watch where Robo goes. Say it.'],4:['TOGETHER','Help the <span class="accent">friends.</span>','Watch the group. Say it.']};let left=title(...heads[s.page])+`<div class="model-list">${keys.map(k=>model(k,'input')).join('')}</div><div class="source-label"><span>OFFICIAL AUDIO</span> · CD1 19</div>`;if(s.page===4)left+=`<div class="mission-choice">${['line','circle'].map(k=>`<button class="${s.group===k?'selected':''}" data-action="pick-group" data-key="${k}">My mission: ${k}</button>`).join('')}</div>`;lesson.innerHTML=layout(left,V.scene(key,'robo','Okay!',true));}
  const errors=['stand','seat','circle'];
  function renderGame(){if(s.game>=3){lesson.innerHTML=layout(title('THREE MIX-UPS FIXED','Thanks, <span class="accent">teacher!</span>','Now find the actions by yourself.')+button('advance','Find the action →'),V.scene('stand','robo','Thank you!',true));return;}const k=errors[s.game];lesson.innerHTML=layout(title('A LITTLE MIX-UP','Help <span class="accent">Robo!</span>','Robo got it wrong.<br>Say it again.')+model(k)+button(s.fixed?'game-next':'correct',s.fixed?(s.game===2?'All fixed →':'One more mix-up →'):'Let Robo try again →')+`<div class="counter">MIX-UP ${s.game+1} OF 3 · SPEAK TO HELP</div>`,V.scene(s.fixed?k:T[k].other,'robo',s.fixed?'Okay!':'Oops…',s.fixed));}
  function choiceCards(q,action,disabled=false){return `<div class="choice-row">${q.choices.map((key,i)=>`<button class="choice-card ${q.picked===key?'picked':''} ${q.picked!==null&&key===q.key?'correct':''}" data-action="${action}" data-key="${key}" ${disabled||q.picked!==null?'disabled':''}>${V.art(key,q.variant||'robo',true)}<span class="card-letter">${'ABC'[i]}</span></button>`).join('')}</div>`;}
  function renderComprehension(){if(s.comp>=5){lesson.innerHTML=layout(title('FIVE ACTIONS TRIED','Now <span class="accent">you lead!</span>','Look at a goal. Give your own command.')+button('advance','Your commands →'),V.scene('stand','pip','Your turn.'));return;}const q=s.questions[s.comp];lesson.innerHTML=`<div class="choice-screen"><div class="choice-top">${title('FIND THE ACTION · '+(s.comp+1)+' / 5','Which picture?')}${model(q.key)}<div class="source-label">READ + LISTEN · POINT TO ONE PICTURE</div></div>${choiceCards(q,'comp-choice')}<div class="choice-feedback">${q.picked!==null?`<span>${q.picked===q.key?'That’s the action.':'We’ll practise this one together.'}</span>${button('comp-next','Next action →','primary')}`:button('comp-help',q.help?'Slow model used':'Help: one slow model','outline mini-tool',q.help?'disabled':'')}</div></div>`;}
  function oralActions(recheck=false){
    const a=s.attempt;
    return `<div class="oral-actions">${button(recheck?'repair-turn-done':'oral-next',recheck?'Continue →':s.page===7&&s.oral===0?'Next command →':'Continue →','outline',a.sent?'':'disabled')}${!recheck?button('oral-hint','Help','outline',a.hint?'disabled':''):button('repair-repeat','Try again','outline')}</div>`;
  }
  function renderOral(){
    const done=s.page===7?s.oral>=2:s.page===9?s.groupDone:s.exitDone;
    if(done){
      lesson.innerHTML=layout(title('MISSION COMPLETE','Good work, <span class="accent">teacher.</span>','Let’s keep going.')+button('advance',s.page===7?'A little help →':s.page===9?'In your book →':'Take it home →'),V.scene('stand','pip','Thank you!',false));return;
    }
    const k=currentOralKey(),a=s.attempt,groupRetry=s.page===9&&s.groupPhase==='recheck';
    const variant=s.page===7||s.page===9&&!groupRetry?'robo':'pip';
    const head=s.page===7?['YOU’RE IN CHARGE','You’re the <span class="accent">teacher!</span>']:s.page===9?['YOUR CHOSEN GROUP MISSION','Lead the <span class="accent">friends.</span>']:['ONE LAST MISSION','Your <span class="accent">last command.</span>'];
    let left=title(...head)+guide()+goal(k)+(a.hint?'<div class="hint-caption">Please…</div>':'')+(a.model?model(k):'')+button('send',a.sent?'Command sent ✓':'Send command →','primary action',a.sent?'disabled':'')+`<div class="small-note">${a.sent?'Okay! Check the action.':'Say it first. Then send.'}</div>`;
    if(!groupRetry)left+=`<div class="oral-hint-row">${button('attempted','I tried it','outline',a.attempted?'disabled':'')}${button('oral-model','Model after trying','outline',!a.attempted||groupRetry?'disabled':'')}</div>`;
    if(s.page===7)left+=`<div class="counter">MISSION ${s.oral+1} OF 2</div>`;
    left+=oralActions(groupRetry);
    lesson.innerHTML=layout(left,V.scene(a.sent?k:T[k].other,variant,a.sent?'Okay!':'Your turn.',a.sent),'check-scene');
  }
  function ensureQueue(){if(s.repairQueue!==null)return; s.repairQueue=s.records.filter(r=>['spoken-command','text-audio-comprehension'].includes(r.skill)&&r.stage!=='group'&&(r.first_check==='B'||r.first_check==='C'||r.help_used)).map(r=>r.id);s.repairIndex=0;s.repairStep=0;s.attempt={sent:false,help:false,hint:false,attempted:false,model:false};save();}
  function repairRecord(group=false){return group?s.records.find(r=>r.id===s.groupRepairId):s.records.find(r=>r.id===s.repairQueue?.[s.repairIndex]);}
  function repairStage(group=false){const r=repairRecord(group);return r?.help_type==='first-word'||r?.first_check==='B'||s.repairStep>=6?'recheck':'support';}
  const repairSteps=['Meaning','Slow','Contrast','Model','Build','Hide help'];
  function renderRepair(group=false){if(!group)ensureQueue();const r=repairRecord(group);if(!r){lesson.innerHTML=layout(title('READY TO LEAD','You’re <span class="accent">ready!</span>','Try saying two commands to Robo.')+'<div class="all-a">You choose the order.<p>Say it first. Then show Robo’s action.</p></div>'+`<div class="mission-choice">${button('extension-stand','Robo: action 1','outline')}${button('extension-sit','Robo: action 2','outline')}</div>`+button('advance','Lead the group →'),V.scene(s.extensionPose||'stand','robo','Your turn.'));return;}
    const k=r.target,stage=repairStage(group);
    if(stage==='recheck'&&r.skill==='text-audio-comprehension'){
      let options=choices(k,s.seed+811+s.repairIndex*31);
      const original=s.questions.find(q=>q.key===k);
      if(original&&original.choices.join(',')===options.join(','))options=[options[1],options[2],options[0]];
      const q={key:k,choices:options,picked:s.repairPick,variant:'pip'};
      lesson.innerHTML=`<div class="choice-screen"><div class="choice-top">${title('TRY WITH PIP · SAME ACTION','Find the action again.')}${model(k)}<div class="source-label">READ + LISTEN · NO EXTRA HELP</div></div>${choiceCards(q,'repair-choice')}<div class="choice-feedback">${s.repairPick?`<span>${s.repairPick===k?'That’s the action.':'Keep practising this action.'}</span>${button('repair-complete','Continue →','primary')}`:'Point to one picture.'}</div></div>`;return;
    }
    if(stage==='recheck'){const a=s.attempt;lesson.innerHTML=layout(title('TRY WITH A NEW FRIEND','Teach <span class="accent">Pip.</span>')+guide()+goal(k)+button('send',a.sent?'Command sent ✓':'Send command →','primary action',a.sent?'disabled':'')+'<div class="small-note">No words. Say it first. Then send.</div>'+oralActions(true),V.scene(a.sent?k:T[k].other,'pip',a.sent?'Okay!':'Your turn.',a.sent),'check-scene');return;}
    const step=repairSteps[s.repairStep];let content='';if(step==='Meaning')content=V.goal(k)+`<div class="small-caption">${T[k].meaning}</div>`+model(k);if(step==='Slow')content=model(k,'slow',true);if(step==='Contrast')content=`<div class="contrast-pair"><div class="chosen">${V.goal(k)}<span>This action</span></div><div>${V.goal(T[k].other)}<span>Different action</span></div></div>`+model(k);if(step==='Model')content=model(k);if(step==='Build')content=`<div class="build-line">${T[k].text.split(' ').map(w=>`<span>${w}</span>`).join(' ')}</div>`+model(k);if(step==='Hide help')content=goal(k)+'<div class="small-caption">A new friend. Your turn next.</div>';
    const instructions={'Meaning':'Look at the action.','Slow':'Listen. Say it slowly.','Contrast':'Different actions. One command.','Model':'Listen. Say it with me.','Build':'Put the words together.','Hide help':'Ready? Try without the words.'};lesson.innerHTML=layout(`<div class="repair">${title('A LITTLE HELP, THEN YOUR TURN','Let’s <span class="accent">try together.</span>',instructions[step])}${content}<div class="repair-controls">${button('repair-back','← Back step','outline',s.repairStep===0?'disabled':'')}${button('repair-next',s.repairStep===5?'Try with Pip →':'Continue →','primary')}</div></div>`,V.scene(step==='Hide help'?T[k].other:k,'robo',step==='Hide help'?'Your turn next.':'Together.'),'repair-scene');
  }
  function renderBook(){const k=s.bookRound===0?'stand':'sit';let left=title('WE CAN 1 · IN YOUR BOOK','Be the <span class="accent">Teacher.</span>','You: give a command.<br>Your teacher: “Okay!”')+model(k)+`<button class="guide dialogue-reply" data-action="okay">${speaker}<span>Okay!</span></button>`+button('book-next',s.bookRound>=2?'Two turns practised ✓':'Partner turn done →','primary action',s.bookRound>=2?'disabled':'')+`<div class="counter">${Math.min(s.bookRound+1,2)} / 2 PARTNER TURNS</div><div class="source-pill">STUDENT BOOK 16–17 · GOALS 13–14<br>COMMAND: OFFICIAL CD1 19 · REPLY: PRACTICE</div><div class="support-disclaimer">Teacher: full CD1 20 dialogue track pending.</div>`;lesson.innerHTML=layout(left,'<div class="book-picture"><img src="assets/scene-be-the-teacher.png" alt="Complete textbook partner activity: people giving instructions"></div>','book-copy');}
  function renderSchool(){if(s.schoolStage===0){lesson.innerHTML=layout(title('SCHOOL CONNECTION','Words in <span class="accent">your book.</span>','Look at the activity.<br>Then read and find the picture.')+button('school-start','Try a reading task →')+`<div class="source-label">WORKBOOK 75 · ACTIVITY 1 · GOAL 13<br>Paper tracing: practise on WB75–76 at home.</div>`,'<div class="book-picture"><img src="assets/workbook-goal13-activity1.png" alt="Complete Workbook Activity 1: commands to practise and trace"></div>','school-start');return;}if(s.school>=2){lesson.innerHTML=layout(title('READING TRANSFER','Two sentences <span class="accent">tried.</span>','One last spoken mission is next.')+button('advance','One last mission →'),V.scene('stand','pip','Your turn.'));return;}const q=s.schoolItems[s.school];lesson.innerHTML=`<div class="choice-screen"><div class="choice-top">${title('SCHOOL PRACTICE · '+(s.school+1)+' / 2','Read. Find the picture.')}<div class="school-target">${T[q.key].text}</div><div class="source-label">NO AUDIO · H5 READING TRANSFER</div></div>${choiceCards(q,'school-choice')}<div class="choice-feedback">${q.picked?`<span>${q.picked===q.key?'That’s the action.':'Read again. Look at the different actions.'}</span>${button('school-next','Continue →','primary')}`:'Read the sentence. Point to one picture.'}</div></div>`;}
  function renderResults(){
    lesson.innerHTML=`<div class="result-grid"><div class="result-copy">${title('THANKS, LITTLE TEACHER','You helped <span class="accent">Robo!</span>')}<div class="finish-scene">${V.art('stand','robo',true)}</div><p class="finish-note">Watch · Say · Give a command</p></div><div class="review-card"><h2>A little practice at home</h2><p>Listen · Understand · Speak · Read</p><img src="assets/review-preview-qr.png" alt="QR for this lesson’s home practice"><a class="primary" href="review/index.html" target="_blank" rel="noopener">Home practice ↗</a></div></div>`;
  }
  function resetAttempt(){s.attempt={sent:false,help:false,hint:false,attempted:false,model:false};}
  function advance(){if(!allowed()){notice('Finish the current task before continuing.');return;}if(s.page<13){s.page++;resetAttempt();render();}}
  function completeOral(){
    if(!s.attempt.sent)return;
    const a=s.attempt,k=currentOralKey(),stage=s.page===7?'core':s.page===9?'group':'exit';
    const r=addRecord(k,'spoken-command',a.help?'practice-request':'practice-turn',a.help,{
      stage,event:'spoken-turn-completed',help_type:a.model?'guided-practice':a.hint?'first-word':'none',
      mastery_claim:false
    });
    resetAttempt();
    if(stage==='core')s.oral++;
    if(stage==='exit')s.exitDone=true;
    if(stage==='group'){
      if(!a.help)s.groupDone=true;
      else{s.groupRepairId=r.id;s.groupPhase=a.model?'repair':'recheck';s.repairStep=0;}
    }
    render();
  }
  function finishRepair(group=false){const r=repairRecord(group);if(r&&(r.first_check==='C'||r.first_check==='practice-request')){r.help_type='guided-seven-step';r.repair_status='completed';}s.repairPick=null;s.repairStep=0;resetAttempt();if(group){s.groupPhase='done';s.groupDone=true;}else s.repairIndex++;render();}
  function completeRepairTurn(){
    if(!s.attempt.sent)return;
    const group=s.page===9,r=repairRecord(group);if(!r)return;
    r.rechecks.push({target:r.target,skill:r.skill,event:'spoken-turn-completed',mastery_claim:false,help_visible:false,character:'pip',created_at:new Date().toISOString()});
    save();finishRepair(group);
  }
  function onAction(action,b){const k=b.dataset.key;
    if(action==='advance'){advance();return;}
    if(action==='sound')play('a_t_soundcheck_seated.mp3',b);if(action==='sound-confirm'){s.sound=true;render();}
    if(action==='warmup'){s.warmup=k;s.heard[k]=true;render();play(k==='open'?'warmup-open-eyes.mp3':'warmup-touch-nose.mp3',lesson.querySelector(`[data-key="${k}"]`));}
    if(action==='input'){s.model=k;s.heard[k]=true;render();play(T[k].file,lesson.querySelector(`[data-key="${k}"]`));}
    if(action==='pick-group'){s.group=k;render();}if(action==='audio')play(T[k].file,b);if(action==='slow'){play(T[k].file,b,.8);}if(action==='guide')play('a_t_give_command.mp3',b);if(action==='okay')play('a_t_okay.mp3',b);
    if(action==='correct'){s.fixed=true;render();play('a_t_okay.mp3',b);}
    if(action==='game-next'){s.game++;s.fixed=false;render();}
    if(action==='comp-help'){const q=s.questions[s.comp];q.help=true;save();render();play(T[q.key].file,lesson.querySelector('.model'),.8);}
    if(action==='comp-choice'){const q=s.questions[s.comp];if(q.picked!==null)return;q.picked=k;const grade=k===q.key?(q.help?'B':'A'):'C';const r=addRecord(q.key,'text-audio-comprehension',grade,q.help,{picked:k,options:q.choices.slice(),stage:'comprehension',help_type:q.help?'one-slow-model':'none'});q.record=r.id;render();}
    if(action==='comp-next'){if(s.questions[s.comp].picked!==null){s.comp++;render();}}
    if(action==='send'){s.attempt.sent=true;s.attempt.attempted=true;render();play('a_t_okay.mp3');}
    if(action==='attempted'){s.attempt.attempted=true;render();}if(action==='oral-model'){if(!s.attempt.attempted)return;s.attempt.help=true;s.attempt.model=true;s.attempt.sent=false;render();play(T[currentOralKey()].file,lesson.querySelector('.model'));}
    if(action==='oral-hint'){s.attempt.help=true;s.attempt.hint=true;s.attempt.sent=false;render();}
    if(action==='oral-next')completeOral();
    if(action==='repair-next'){s.repairStep++;resetAttempt();render();}if(action==='repair-back'){s.repairStep=Math.max(0,s.repairStep-1);render();}
    if(action==='repair-turn-done')completeRepairTurn();
    if(action==='repair-repeat'){resetAttempt();render();}
    if(action==='repair-choice'){if(s.repairPick!==null)return;const r=repairRecord();s.repairPick=k;r.rechecks.push({target:r.target,skill:r.skill,result:k===r.target?'independent':'needs-help',picked:k,help_visible:false,character:'pip',created_at:new Date().toISOString()});save();render();}
    if(action==='repair-complete')finishRepair();
    if(action==='extension-stand'||action==='extension-sit'){s.extensionPose=action.endsWith('stand')?'stand':'sit';render();play('a_t_okay.mp3');}
    if(action==='book-next'){if(s.bookRound<2){s.bookRound++;render();}}
    if(action==='school-start'){s.schoolStage=1;render();}if(action==='school-choice'){const q=s.schoolItems[s.school];if(q.picked!==null)return;q.picked=k;addRecord(q.key,'reading-picture-match',k===q.key?'A':'C',false,{picked:k,options:q.choices.slice(),stage:'school'});render();}if(action==='school-next'){if(s.schoolItems[s.school].picked!==null){s.school++;render();}}
    if(action==='teacher-close')showTeacher(false);
    if(action==='jump-page'){s.page=Number(b.dataset.page);resetAttempt();render();}
    save();
  }
  function renderTeacher(){document.querySelector('#teacher-panel').innerHTML=`<div class="teacher-heading"><h2>Teacher guide</h2>${button('teacher-close','×','outline','aria-label="Close teacher panel"')}</div><h3>${s.page+1}. ${esc(D.pages[s.page])}</h3><p>${D.teacher[s.page]}</p>`;}
  function showTeacher(open){document.querySelector('#teacher-panel').hidden=!open;document.querySelector('#teacher').setAttribute('aria-expanded',String(open));renderTeacher();document.querySelector('#teacher-panel').scrollTop=0;}
  document.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(b&&!b.disabled)onAction(b.dataset.action,b);});
  document.querySelector('#back').onclick=()=>{if(s.page>0){s.page--;render();}};document.querySelector('#next').onclick=advance;document.querySelector('#teacher').onclick=()=>showTeacher(document.querySelector('#teacher-panel').hidden);
  document.querySelector('#pages').onclick=()=>{const panel=document.querySelector('#thumbs');panel.hidden=!panel.hidden;document.querySelector('#pages').setAttribute('aria-expanded',String(!panel.hidden));panel.innerHTML=D.pages.map((name,i)=>`<button data-action="jump-page" data-page="${i}" class="${i===s.page?'current':''}">${i+1}. ${esc(name)}</button>`).join('');showTeacher(false);};
  document.querySelector('#fullscreen').onclick=()=>{const p=document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();p.catch(()=>notice('Use the browser full-screen control.'));};document.addEventListener('keydown',e=>{if(e.key==='Escape')showTeacher(false);});
  function fit(){document.querySelector('#stage').style.transform=`translate(-50%,-50%) scale(${Math.min(innerWidth/1280,innerHeight/720)})`;}
  addEventListener('resize',fit);addEventListener('pagehide',()=>{stop();save();});fit();render();
})();
