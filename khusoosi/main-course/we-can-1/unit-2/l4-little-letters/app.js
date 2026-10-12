'use strict';
(()=>{
  const D=L11_DATA,V=L11_VISUALS,ABC=D.letters,qa=new URLSearchParams(location.search).get('qa')==='1';
  const KEY='khusoosi:classroom:wc1:u2:l4:little-letters:v4:'+(qa?'qa':'preview');
  const kind=()=>D.stages[s.page].kind;
  const groupIndex=()=>D.stages[s.page].group;
  const lesson=document.querySelector('#lesson'),voice=document.querySelector('#voice');
  const speaker='<span class="speaker" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z"/></svg></span>';
  const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const reshuffle=a=>{const b=shuffle(a);if(b.length>1&&b.join('')===a.join(''))b.push(b.shift());return b;};
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const button=(act,text,cls='primary',attrs='')=>`<button class="${cls}" data-action="${act}" ${attrs}>${text}</button>`;
  const title=(k,h,t='')=>`<p class="kicker">${k}</p><h1>${h}</h1>${t?`<p class="instruction">${t}</p>`:''}`;
  const split=(left,right,cls='')=>`<div class="split ${cls}"><div class="copy">${left}</div>${right}</div>`;
  const guide=()=>'';
  const file=k=>'official-letter-'+k+'.mp3';
  const model=k=>`<button class="model-card" data-action="letter-model" data-key="${k}">${speaker}<span>${k}</span></button><div class="source">OFFICIAL LETTER NAME · CD1 22 EXCERPT</div>`;
  const similar={a:'o',b:'d',c:'e',d:'b',e:'c',f:'t',g:'q',h:'n',i:'j',j:'i',k:'h',l:'i',m:'n',n:'m',o:'a',p:'q',q:'p',r:'n',s:'z',t:'f',u:'v',v:'u',w:'m',x:'k',y:'v',z:'s'};
  const fresh=()=>{
    const tasks=D.groups.map(g=>shuffle(g.filter(l=>!['b','d','p','q'].includes(l)))[0]);
    tasks.push(shuffle(['b','d'])[0],shuffle(['p','q'])[0]);
    const groups=D.groups.map(g=>({teach:0,echo:false,round:0,targets:shuffle(g).slice(0,4),options:[],picked:null,phase:'task',support:0,attempt:false,editing:false,wrong:null,hint:false,model:false,usedHelp:false,hadError:false}));
    groups.forEach(g=>{const k=g.targets[1];g.gridFault=V.faultsFor(k)[0];g.gridOptions=shuffle(['correct',...V.faultsFor(k)]);g.gridPicked=null;g.gridHelp=false;});
    const fixes=shuffle([{type:'grid',target:'b',fault:'short'},{type:'grid',target:'p',fault:'short-tail'},{type:'grid',target:'a',fault:'raised'}]).map(q=>({...q,options:shuffle(['correct',...V.faultsFor(q.target)])}));
    const trails=['zyxwvutsr','qponmlkji','hgfedcba'].map((str,i)=>({type:'trail',row:[...str],gap:[2,4,5][i],target:[...str][[2,4,5][i]],options:shuffle([...[str[[2,4,5][i]],str[[1,3,6][i]],str[[3,5,4][i]]]])}));
    return{schema:5,page:0,sound:false,warm:0,warmReveal:false,groups,heard:{},upperHint:false,shape:'a',shapeBook:false,puzzle:0,puzzlePicked:null,puzzleChoices:[shuffle(['b','c','d']),shuffle(['l','m','n']),shuffle(['w','y','z'])],core:0,tasks:shuffle(tasks),attempted:false,hint:false,model:false,helpTargets:[],helpTypes:{},repair:0,step:0,contrast:false,retry:false,retryAttempt:false,bookDone:false,backPos:0,smallSteps:false,gameTasks:[...fixes,...trails],gameRound:0,gameEditing:false,gamePicked:null,gameRead:false,gameHelp:false,wb:'forward',school:0,schoolMode:false,schoolPicked:null,schoolChoices:[shuffle(['b','d','p']),shuffle(['g','q','p'])],exit:shuffle(ABC.filter(l=>!tasks.includes(l)))[0],exitDone:false,exitRetry:false,exitRetryAttempt:false};
  };
  let s=fresh(),playToken=0,gapTimer,noticeTimer;
  try{const data=JSON.parse(localStorage.getItem(KEY)||'null');if(data?.schema===5&&data.groups?.length===6&&data.tasks?.length===8)s=data;}catch{}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(s));}catch{}}
  function notice(text){clearTimeout(noticeTimer);const n=document.querySelector('#notice');n.textContent=text;n.hidden=false;noticeTimer=setTimeout(()=>n.hidden=true,3500);}
  function stop(){playToken++;clearTimeout(gapTimer);voice.pause();voice.currentTime=0;voice.onended=null;document.querySelectorAll('.playing').forEach(b=>b.classList.remove('playing'));}
  function play(name,b,rate=1,done){stop();voice.src='assets/'+name;voice.playbackRate=rate;voice.preservesPitch=true;b?.classList.add('playing');voice.onended=()=>{b?.classList.remove('playing');done?.();};voice.play().catch(e=>{if(e.name!=='AbortError')notice('Audio could not play. Please try again.');});}
  function tile(k,action='play-letter',classes='',extra=''){return `<button class="letter-tile ${classes}" data-action="${action}" data-key="${k}" aria-label="Letter ${k}" ${extra}>${s.upperHint&&kind()==='input'?`<span class="cap">${k.toUpperCase()}</span>`:''}${k}</button>`;}
  function glyph(k,newLook=false){return `<div class="glyph-panel ${newLook?'new-look':''}"><span class="giant-letter">${k}</span></div>`;}
  function currentTarget(){return kind()==='core'?s.tasks[s.core]:kind()==='repair'?s.helpTargets[s.repair]:kind()==='group'?s.groups[groupIndex()].targets[s.groups[groupIndex()].round]:kind()==='input'?D.groups[groupIndex()][s.groups[groupIndex()].teach]:s.exit;}
  function resetTurn(){s.attempted=false;s.hint=false;s.model=false;}
  function ready(){switch(kind()){case 'prep':return s.sound;case 'warm':return s.warm>=2;case 'input':return s.groups[groupIndex()].teach>=D.groups[groupIndex()].length;case 'group':return s.groups[groupIndex()].round>=4;case 'puzzle':return s.puzzle>=3;case 'core':return s.core>=8;case 'repair':return s.repair>=s.helpTargets.length;case 'book':return s.bookDone;case 'reverse':return s.gameRound>=6;case 'school':return s.school>=2;case 'exit':return s.exitDone;case 'finish':return false;default:return true;}}
  function syncNext(){document.querySelector('#next').disabled=!ready();}
  function render(){stop();const p=s.page;document.querySelector('#objective').textContent=D.pages[p];document.querySelector('#page-number').textContent=`${p+1} / ${D.pages.length}`;document.querySelector('#progress').style.width=(p+1)/D.pages.length*100+'%';document.querySelector('#back').disabled=p===0;document.querySelector('#thumbs').hidden=true;document.querySelector('#pages').setAttribute('aria-expanded','false');showTeacher(false);
    ({prep,warm:warmup,input,group:groupPractice,shape:shapes,puzzle,core:oral,repair,book,reverse,school,exit:oral,finish})[kind()]();
    const masks={'sb18-alphabet-activity.png':[880,985,0,65,34,65],'sb19-shape-activity.png':[800,822,0,120,34,72],'wb78-activity1.png':[793,756,0,733,550,23]};
    for(const img of lesson.querySelectorAll('.book-frame img')){const key=img.getAttribute('src').split('/').pop(),m=masks[key];if(m){const [w,h,x,y,mw,mh]=m,clipH=key==='sb18-alphabet-activity.png'?915:h;const label=img.alt,extra=key==='sb19-shape-activity.png'?'<rect x="0" y="0" width="480" height="38" fill="white"/><rect x="0" y="804" width="180" height="18" fill="white"/>':'';img.parentElement.style.width=(w/clipH*470)+'px';img.parentElement.innerHTML=`<svg viewBox="0 0 ${w} ${clipH}" style="width:100%;height:100%" role="img" aria-label="${escape(label)}"><image width="${w}" height="${h}" href="assets/${key}"/><rect x="${x}" y="${y}" width="${mw}" height="${mh}" fill="white"/>${extra}</svg>`;}}
    syncNext();save();
  }
  function prep(){lesson.innerHTML=split(`<div class="prep">${title('WE CAN 1 · LESSON 11','أهلاً بك!','ابقَ جالساً. شاهد الحروف،<br>وقل أسماءها لمعلّمك.')}${button('sound',speaker+'<span>Hello! Can you hear me?</span>','guide')}${button('sound-ok',s.sound?'الصوت واضح ✓':'أسمع الصوت بوضوح','primary wide')}<p class="note">المعلّم يضغط على الشاشة.</p></div>`,`<div class="prep-cards"><div><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="3"><path d="M8 22v-3a12 12 0 0 1 24 0v3M8 21v11h5V21H8zm19 0v11h5V21h-5z"/></svg>اختبر الصوت</div><div><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="3"><rect x="5" y="8" width="30" height="21" rx="3"/><path d="M20 29v7M12 36h16"/></svg>شاهد الحروف</div><div><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 9h28v20H18l-9 6v-6H6z"/></svg>قل اسم الحرف</div></div>`);}
  function warmup(){lesson.innerHTML=split(title('QUICK REVIEW','Big and<br><em>small.</em>','Say the letter names.')+button('warm-done','Start a–d →','primary wide')+'<div class="source">U1 REVIEW · LETTER NAMES</div>',`<div class="direct-letter-grid two-cards">${['a','h'].map(pairCard).join('')}</div>`);}
  function pairCard(k){return `<button class="pair-card ${s.heard[k]?'selected':''}" data-action="teach-model" data-key="${k}" aria-label="Play letter name ${k.toUpperCase()}">${V.gridPair(k)}<span class="pair-audio">${speaker}<span>${k.toUpperCase()} / ${k}</span></span></button>`;}
  function input(){
    const gi=groupIndex(),list=D.groups[gi];
    lesson.innerHTML=split(title('LETTER NAMES · '+(gi+1)+' / 6',`${list[0].toUpperCase()}${list[0]} –<br><em>${list.at(-1).toUpperCase()}${list.at(-1)}</em>`,'Say the name.<br>Look at the four lines.')+button('teach-done','Now practise →','primary wide')+'<div class="source">OFFICIAL LETTER NAMES · CD1 22<br>FOUR-LINE HANDWRITING MODEL</div>',`<div class="direct-letter-grid ${list.length>4?'six-cards':''}">${list.map(pairCard).join('')}</div>`,'direct-input');
  }
  const gridOption=(k,fault,action,picked,locked,index)=>`<button class="grid-option ${locked&&fault==='correct'?'correct':picked===fault?'wrong':''}" data-action="${action}" data-key="${fault}" ${locked?'disabled':''} aria-label="Option ${index+1}"><span class="option-number">${index+1}</span>${V.grid(false,k,fault)}</button>`;
  function gridHelp(k,fault,action){
    lesson.innerHTML=split(title('SAME LETTER · CHECK THE LINES','Look at<br><em>the lines.</em>',V.hint(k))+button(action,'Hide help. Try again →','primary wide'),`<div class="grid-help-board"><div class="grid-comparison"><div class="comparison-card">${V.grid(false,k,fault)}<span>${k}: ${V.faultLabel[fault]}</span></div><div class="comparison-card model-example">${V.grid(false,k,'correct',true)}<span>Our handwriting model</span></div></div></div>`,'grid-support');
  }
  function groupGrid(gi,g,k){
    if(g.gridHelp){gridHelp(k,g.gridPicked||g.gridFault,'group-grid-retry');return;}
    const solved=g.gridPicked==='correct';
    lesson.innerHTML=split(practiceSteps(gi,1)+title('PRACTICE 2 / 4','Fix the<br><em>handwriting.</em>','Same letter.<br>Which one fits the lines?')+(solved?button('group-next','Say one without help →','primary wide'):''),`<div class="challenge-board writing-board"><div class="grid-fault ${solved?'fixed':''}">${V.grid(false,k,solved?'correct':g.gridFault)}<span>${solved?'Fixed':'Check this letter'}</span></div><div class="grid-options">${g.gridOptions.map((f,i)=>gridOption(k,f,'group-grid-pick',g.gridPicked,solved,i)).join('')}</div><div class="feedback">${solved?'Say its name.':'Point to the best-written letter.'}</div></div>`);
  }
  function groupPractice(){
    const gi=groupIndex(),g=s.groups[gi],list=D.groups[gi];
    if(g.round>=4){lesson.innerHTML=split(title('GROUP '+(gi+1)+' · FOUR TURNS FINISHED','Match.<br>Fix.<br><em>Say.</em>')+button('advance',gi===5?'Letter shapes →':'Next group →'),`<div class="group-workshop"><div class="shelf-letters">${list.map(l=>`<span>${l.toUpperCase()} ${l}</span>`).join('')}</div><p>Uppercase · Lowercase · Letter name</p></div>`);return;}
    const k=currentTarget();
    if(g.round===1){groupGrid(gi,g,k);return;}
    if(g.phase==='support'){
      const c=g.round<2?g.picked:similar[k];
      const labels=['Compare the shapes.','Say the letter name.','Uppercase. Lowercase.'];
      const support=g.support===0?(g.round<2||g.contrast?`<div class="contrast">${tile(k,'letter-model','chosen')}${c&&c!==k?tile(c,'letter-model'):''}</div>`:`<div class="shape-demo">${V.lines(k)}</div>${button('group-contrast','Compare if needed','outline wide')}`):g.support===1?model(k)+button('slow',speaker+'<span>Slow · '+k+'</span>','outline wide',`data-key="${k}"`):`<div class="hint-card">${k.toUpperCase()} → ${k}</div>`;
      lesson.innerHTML=split(title('A LITTLE HELP','Look.<br><em>Say. Try.</em>',labels[g.support])+guide(g.support===0?'look':'say')+support+button('group-support-next',g.support===2?'Hide help. Try again →':'Continue →','primary wide'),glyph(k),'support');return;
    }
    if(g.round<2){
      if(!g.options.length)g.options=shuffle([k,...shuffle(list.filter(l=>l!==k)).slice(0,2)]);
      const picked=g.picked,solved=picked===k;
      lesson.innerHTML=`<div class="centered group-point">${practiceSteps(gi,g.round)}${title('PRACTICE 1 / 4','Find the small letter.')}<div class="capital-cue"><span>${k.toUpperCase()}</span></div><div class="choice-row">${g.options.map(l=>tile(l,'group-pick',solved&&l===k?'correct':'',solved?'disabled':'')).join('')}</div><div class="feedback">${solved?`<span>Say the letter name.</span>${button('group-next','Check the handwriting →')}`:'Point. Then say the name.'}</div></div>`;
      if(g.phase==='retry')lesson.querySelector('.choice-row').classList.add('new-choice-font');return;
    }
    const retry=g.phase==='retry',attempt=g.attempt;
    let left=practiceSteps(gi,g.round)+title('PRACTICE '+(g.round+1)+' / 4',retry?'Say it<br><em>again.</em>':'What’s its<br><em>name?</em>','Say the name to your teacher.');
    left+=button('group-attempt',attempt?'I tried it ✓':'I tried it','primary wide',attempt?'disabled':'')+button('group-support','Help','outline wide')+button('group-next',g.round===2?'Another letter →':'Finish this group →','outline wide',attempt?'':'disabled');
    lesson.innerHTML=split(left,glyph(k,retry),'oral-turn');
  }
  function practiceSteps(gi,r){return `<div class="practice-steps" aria-label="Four practice turns in group ${gi+1}">${['1 Match','2 Fix','3 Say','4 Say'].map((t,i)=>`<span class="${i===r?'current':i<r?'done':''}">${t}</span>`).join('')}</div>`;}
  function shapes(){const k=s.shape,labels={a:'Short letters',b:'Tall letters',g:'Tail letters'};const left=title('A LITTLE SHAPE DISCOVERY','Short. Tall.<br><em>A little tail.</em>','Look where the letter sits.')+guide('look')+`<div class="shape-tabs">${['a','b','g'].map(l=>button('shape',labels[l],'outline '+(k===l?'selected':''),`data-key="${l}"`)).join('')}</div>`+model(k)+button('shape-book',s.shapeBook?'Back to the letter →':'See it in your book →','outline wide')+'<div class="source">STUDENT BOOK 19 · CD1 22<br>SHAPE EXPLORATION · NO TEST</div>';lesson.innerHTML=split(left,s.shapeBook?'<div class="book-frame shapes"><img src="assets/sb19-shape-activity.png" alt="Complete short, tall and tail letter activity from Student Book19"></div>':`<div class="art-panel"><div style="width:370px;height:390px">${V.lines(k)}</div></div>`);}
  const paths=[['a','b','c'],['l','m','n'],['x','y','z']];
  function puzzle(){if(s.puzzle>=3){lesson.innerHTML=split(title('THE PATH IS READY','Little letters,<br><em>in order.</em>','Now say their names without a model.')+button('advance','My letter names →'),`<div class="art-panel">${V.scene(true)}</div>`);return;}const row=paths[s.puzzle],target=row[1],picked=s.puzzlePicked;lesson.innerHTML=`<div class="centered">${title('FIX THE LETTER PATH · '+(s.puzzle+1)+' / 3','Which letter is missing?')}${guide('say')}<div class="puzzle">${row.map((k,i)=>i===1?`<span class="letter-tile ${picked===target?'correct':'missing'}">${picked===target?target:'?'}</span>`:`<span class="letter-tile">${k}</span>`).join('')}</div><div class="choice-row">${s.puzzleChoices[s.puzzle].map(k=>tile(k,'puzzle-choice',picked===k&&k!==target?'wrong':'',picked===target?'disabled':'')).join('')}</div><div class="feedback">${picked===target?`<span>The path is fixed.</span>${button('puzzle-next',s.puzzle===2?'All three paths →':'Next path →')}`:picked?'<span>Look at the neighbours. Try again.</span>':'Say it first. Then choose.'}</div></div>`;}
  function oral(){const core=kind()==='core',done=core?s.core>=8:s.exitDone;if(done){lesson.innerHTML=split(title('LETTER NAMES','Good<br><em>work.</em>')+button('advance',core?'A little help →':'Take it home →'),`<div class="art-panel">${V.scene(true)}</div>`);return;}const k=currentTarget();
    if(!core&&s.exitRetry){lesson.innerHTML=split(title('HELP HIDDEN · SAME LAST LETTER','One last<br><em>try.</em>','Say its name without an uppercase clue.')+guide('say')+button('exit-retry-attempt',s.exitRetryAttempt?'I tried it ✓':'I tried it','primary wide',s.exitRetryAttempt?'disabled':'')+button('exit-retry-done','Take it home →','outline wide',s.exitRetryAttempt?'':'disabled')+button('exit-help-again','Help again','outline wide'),glyph(k,true),'oral-turn');return;}
    let left=title(core?'YOUR LETTER NAMES':'ONE LAST LETTER',core?'What’s its<br><em>name?</em>':'One new<br><em>little letter.</em>','Say the name to your teacher.')+guide('say');if(s.hint&&!s.model)left+=`<div class="hint-card">${k.toUpperCase()}</div>`;if(s.model)left+=model(k);left+=button('attempt',s.attempted?'I tried it ✓':'I tried it','primary wide',s.attempted?'disabled':'')+`<div class="actions">${button('oral-help','Help','outline',s.hint?'disabled':'')}${button('oral-model','Model','outline',!s.attempted?'disabled':'')}</div>`+button('oral-next',core?'Next letter →':s.hint||s.model?'Hide help. Try again →':'Continue →','outline wide',s.attempted?'':'disabled')+`<p class="progress-note">${core?'LETTER '+(s.core+1)+' OF 8':'YOUR LAST TURN'}</p>`;lesson.innerHTML=split(left,glyph(k),'oral-turn');}
  function repair(){const k=s.helpTargets[s.repair];if(!k){lesson.innerHTML=split(title('ONE LETTER, A NEW LOOK','Letters can<br><em>look different.</em>','Point to the small letters in your book.')+guide('look')+button('advance','In your book →'),`<div class="art-panel"><div class="caps-pair"><span class="letter-tile">a</span><span class="bridge-arrow">=</span><span class="letter-tile" style="font-family:Georgia,serif;font-weight:400">a</span></div></div>`);return;}
    const firstWordOnly=s.helpTypes[k]==='capital';if(firstWordOnly)s.retry=true;
    if(s.retry){lesson.innerHTML=split(title('SAME LETTER · NEW LOOK','Your<br><em>turn again.</em>','Say the name. No uppercase clue.')+guide('say')+button('retry-attempt',s.retryAttempt?'I tried it ✓':'I tried it','primary wide',s.retryAttempt?'disabled':'')+`<div class="actions">${button('repair-done','Continue →','outline',s.retryAttempt?'':'disabled')}${button('retry-reset','Try again','outline')}</div>`+button('retry-help','Help again','outline wide')+'<div class="note">Same letter. A different typeface.</div>',glyph(k,true));return;}
    const support=`<div class="hint-card">${k.toUpperCase()} → ${k}</div>`+model(k)+button('slow',speaker+'<span>Slow · '+k+'</span>','outline wide',`data-key="${k}"`)+button('contrast','Compare if needed','outline wide')+button('repair-hide','Hide help. Say it again →','primary wide');
    lesson.innerHTML=split(title('LETTER NAME HELP','Read with<br><em>your teacher.</em>')+support,s.contrast?`<div class="art-panel"><div class="contrast">${tile(k,'letter-model','chosen')}${tile(similar[k],'letter-model')}</div></div>`:glyph(k),'support');}
  function book(){lesson.innerHTML=split(title('WE CAN 1 · PHONICS','Big and<br><em>small letters.</em>','Point to the little letters.<br>Say the names with your teacher.')+guide('look')+button('book-done',s.bookDone?'Our turn is finished ✓':'Our turn is finished','primary wide',s.bookDone?'disabled':'')+'<div class="source">STUDENT BOOK 18 · GOAL 15</div>','<div class="book-frame alphabet"><img src="assets/sb18-alphabet-activity.png" alt="Complete Alphabet Chant activity with big and small letter pairs"></div>');}
  function reverse(){
    const q=s.gameTasks[s.gameRound];
    if(!q){lesson.innerHTML=split(title('SIX LETTER CHALLENGES FINISHED','Match.<br>Read.<br><em>Correct.</em>','Now try the school tasks.')+button('advance','School practice →'),`<div class="art-panel">${V.scene(true)}</div>`);return;}
    if(q.type==='grid'){
      if(s.gameHelp){gridHelp(q.target,s.gamePicked||q.fault,'game-grid-retry');return;}
      const solved=s.gamePicked==='correct';
      lesson.innerHTML=split(title('LETTER CHALLENGE · '+(s.gameRound+1)+' / 6','Fix the<br><em>handwriting.</em>','Same letter.<br>Which one fits the lines?')+(solved?'<p class="note">Say its name.</p>'+button('game-next','Next challenge →','primary wide'):''),`<div class="challenge-board writing-board"><div class="grid-fault ${solved?'fixed':''}">${V.grid(false,q.target,solved?'correct':q.fault)}<span>${solved?'Fixed':'Check this letter'}</span></div><div class="grid-options">${q.options.map((f,i)=>gridOption(q.target,f,'game-grid-pick',s.gamePicked,solved,i)).join('')}</div><div class="feedback">${solved?'Same letter. Correct position.':'Point to the best-written letter.'}</div></div>`);return;
    }
    const solved=s.gamePicked===q.target;
    const progress=`<div class="challenge-progress">${s.gameTasks.map((_,i)=>`<span class="${i===s.gameRound?'current':i<s.gameRound?'done':''}">${i+1}</span>`).join('')}</div>`;
    const left=progress+title('LETTER CHALLENGE · '+(s.gameRound+1)+' / 6','Fix the<br><em>letter trail.</em>','Go backwards. Find the gap.')+(solved?button('game-read',s.gameRead?'We read this row ✓':'Read this row together','outline wide',s.gameRead?'disabled':'')+button('game-next',s.gameRound===5?'All six finished →':'Next challenge →','primary wide',!s.gameRead?'disabled':''):'')+'<div class="source">H5 LETTER PRACTICE · GOAL 16 IN THE TRAILS</div>';
    const visual=`<div class="trail-direction">z → a · Row ${s.gameRound-2} / 3</div><div class="trail-row">${q.row.map((k,i)=>i===q.gap&&!solved?'<span class="trail-gap">?</span>':tile(k,'play-letter',i===q.gap?'correct':'')).join('')}</div>`;
    lesson.innerHTML=split(left,`<div class="challenge-board trail-board">${visual}<div class="choice-row">${q.options.map(k=>tile(k,'game-pick',solved&&k===q.target?'correct':s.gamePicked===k?'wrong':'',solved?'disabled':'')).join('')}</div><div class="feedback">${solved?'Fixed. Now read it.':s.gamePicked?'Check the neighbours. Try again.':'Choose a small letter.'}</div></div>`,'challenge');
  }
  function school(){if(!s.schoolMode){const isForward=s.wb==='forward';lesson.innerHTML=split(title('SCHOOL CONNECTION','Little letters<br><em>in your book.</em>','Point and say.<br>Trace on paper at home.')+guide('look')+`<div class="actions">${button('wb-forward','a → z','outline')}${button('wb-back','z → a','outline')}</div>`+button('school-start','Try two matching tasks →','primary wide')+`<div class="source">WORKBOOK ${isForward?77:78} · ACTIVITY 1<br>H5 MATCHES NEXT ARE ADAPTATIONS</div>`,`<div class="book-frame wb"><img src="assets/wb${isForward?'77':'78'}-activity1.png" alt="Complete Workbook${isForward?'77':'78'} Activity1, excluding adjacent tracing exercise"></div>`);return;}if(s.school>=2){lesson.innerHTML=split(title('SCHOOL PRACTICE TRIED','One <em>last letter.</em>','Say its name without an uppercase clue.')+button('advance','My last letter →'),`<div class="art-panel">${V.scene(true)}</div>`);return;}const k=['b','q'][s.school],picked=s.schoolPicked;lesson.innerHTML=`<div class="centered">${title('READ AND MATCH · '+(s.school+1)+' / 2','Find the small letter.')}<div class="caps-pair"><span class="letter-tile">${k.toUpperCase()}</span><span class="bridge-arrow">→</span><span class="letter-tile ${picked===k?'correct':''}">${picked===k?k:'?'}</span></div><div class="choice-row">${s.schoolChoices[s.school].map(l=>tile(l,'school-choice',picked===l&&l!==k?'wrong':'',picked===k?'disabled':'')).join('')}</div><div class="feedback">${picked===k?button('school-next',s.school===1?'One last letter →':'Next task →'):picked?'Look again at the shape.':'Match without audio.'}</div><div class="source">NO AUDIO · H5 UPPERCASE / LOWERCASE TRANSFER</div></div>`;}
  function finish(){const local=['localhost','127.0.0.1',''].includes(location.hostname);lesson.innerHTML=split(title('WE CAN 1 · LITTLE LETTERS','Good<br><em>work!</em>')+`<div class="summary-art">${V.scene(true)}</div>`+'<p class="note">Uppercase · Lowercase · Letter names</p>',`<div class="review-card home-review-card"><h2>A little practice at home</h2><p>Listen · Find · Say · Match</p><button class="qr-enlarge" data-action="qr-open" aria-label="Enlarge home practice QR"><img src="assets/review-qr-v2.png" alt="Home practice QR"><span>Enlarge QR</span></button><a href="review/index.html" target="_blank" rel="noopener" class="primary">Home practice ↗</a><p class="note">${local?'Local preview · QR opens the online homework':'Scan or tap to open this lesson’s homework'}</p></div>`);document.querySelector('#qr-dialog p').textContent=local?'QR opens the online homework, not this local preview.':'Scan or tap to open this lesson’s homework.';}
  function next(){if(ready()&&s.page<D.pages.length-1){s.page++;resetTurn();render();}}
  function act(action,b){const k=b.dataset.key;
    if(action==='qr-open'){stop();document.querySelector('#qr-dialog').showModal();return;}
    if(action==='qr-close'){document.querySelector('#qr-dialog').close();return;}
    if(action==='group-grid-pick'){const g=s.groups[groupIndex()];if(g.gridPicked==='correct')return;g.gridPicked=k;if(k!=='correct'){g.gridHelp=true;g.usedHelp=true;g.hadError=true;}render();return;}
    if(action==='group-grid-retry'){const g=s.groups[groupIndex()];g.gridHelp=false;g.gridPicked=null;g.gridOptions=reshuffle(g.gridOptions);render();return;}
    if(action==='game-grid-pick'){if(s.gamePicked==='correct')return;s.gamePicked=k;s.gameHelp=k!=='correct';render();return;}
    if(action==='game-grid-retry'){s.gameHelp=false;s.gamePicked=null;const q=s.gameTasks[s.gameRound];q.options=reshuffle(q.options);render();return;}
    if(action==='warm-done'){s.warm=2;next();return;}
    if(action==='teach-model'){s.heard[k]=true;render();play(file(k),lesson.querySelector(`[data-action="teach-model"][data-key="${k}"]`));return;}
    if(action==='teach-done'){s.groups[groupIndex()].teach=D.groups[groupIndex()].length;next();return;}
    if(action==='group-attempt'){s.groups[groupIndex()].attempt=true;render();return;}
    if(action==='group-contrast'){s.groups[groupIndex()].contrast=true;render();return;}
    if(action==='group-support'){const g=s.groups[groupIndex()];g.usedHelp=true;g.phase='support';g.support=0;g.contrast=false;g.attempt=false;render();return;}
    if(action==='group-support-next'){const g=s.groups[groupIndex()];g.support++;if(g.support>=3){g.phase='retry';g.picked=null;g.options=reshuffle(g.options);g.attempt=false;g.contrast=false;}render();return;}
    if(action==='group-pick'){const g=s.groups[groupIndex()],target=currentTarget();if(g.picked===target)return;g.picked=k;if(k!==target){g.hadError=true;g.usedHelp=true;g.phase='support';g.support=0;}render();return;}
    if(action==='group-edit'){s.groups[groupIndex()].editing=true;render();return;}
    if(action==='group-next'){const g=s.groups[groupIndex()];if(g.round===1?g.gridPicked!=='correct':g.round===0?g.picked!==currentTarget():!g.attempt)return;g.round++;g.options=[];g.picked=null;g.phase='task';g.support=0;g.attempt=false;g.editing=false;g.contrast=false;render();return;}
    if(action==='advance'){next();return;}
    if(action==='sound'){play('a_t_soundcheck_seated.mp3',b);return;}if(action==='sound-ok'){s.sound=true;render();return;}
    if(action==='letter-model'||action==='slow'){play(file(k),b,action==='slow'?.8:1);return;}
    if(action==='play-letter'){document.querySelectorAll('.letter-tile').forEach(x=>x.classList.toggle('active',x===b));play(file(k),b);return;}
    if(action==='bridge'){s.warmReveal=true;render();return;}if(action==='warm-next'){s.warm++;s.warmReveal=false;render();return;}
    if(action==='shape'){s.shape=k;render();return;}if(action==='shape-book'){s.shapeBook=!s.shapeBook;render();return;}
    if(action==='puzzle-choice'){if(s.puzzlePicked===paths[s.puzzle][1])return;s.puzzlePicked=k;render();return;}if(action==='puzzle-next'){if(s.puzzlePicked!==paths[s.puzzle][1])return;s.puzzle++;s.puzzlePicked=null;render();return;}
    if(action==='attempt'){s.attempted=true;render();return;}
    if(action==='oral-help'){const target=currentTarget();s.hint=true;s.helpTypes[target]??='capital';if(kind()==='core'&&!s.helpTargets.includes(target))s.helpTargets.push(target);render();return;}
    if(action==='oral-model'){if(!s.attempted)return;const target=currentTarget();s.model=true;s.helpTypes[target]='full-model';if(kind()==='core'&&!s.helpTargets.includes(target))s.helpTargets.push(target);render();play(file(target),lesson.querySelector('.model-card'));return;}
    if(action==='oral-next'){if(!s.attempted)return;if(kind()==='core')s.core++;else if(s.hint||s.model){s.exitRetry=true;s.exitRetryAttempt=false;}else s.exitDone=true;resetTurn();render();return;}
    if(action==='exit-retry-attempt'){s.exitRetryAttempt=true;render();return;}
    if(action==='exit-retry-done'){if(!s.exitRetryAttempt)return;s.exitDone=true;render();return;}
    if(action==='exit-help-again'){s.exitRetry=false;s.exitRetryAttempt=false;s.attempted=true;s.hint=true;s.model=true;render();play(file(s.exit),lesson.querySelector('.model-card'));return;}
    if(action==='repair-next'){s.step++;s.contrast=false;if(s.step>=6)s.retry=true;render();return;}if(action==='repair-back'){s.step=Math.max(0,s.step-1);render();return;}if(action==='contrast'){s.contrast=true;render();return;}
    if(action==='repair-hide'){s.retry=true;s.retryAttempt=false;s.contrast=false;render();return;}
    if(action==='retry-help'){s.helpTypes[currentTarget()]='full-model';s.step=0;s.retry=false;s.retryAttempt=false;render();return;}
    if(action==='retry-attempt'){s.retryAttempt=true;render();return;}if(action==='retry-reset'){s.retryAttempt=false;render();return;}if(action==='repair-done'){if(!s.retryAttempt)return;s.repair++;s.step=0;s.retry=false;s.retryAttempt=false;render();return;}
    if(action==='book-done'){s.bookDone=true;render();return;}
    if(action==='game-edit'){s.gameEditing=true;render();return;}
    if(action==='game-pick'){const q=s.gameTasks[s.gameRound];if(s.gamePicked===q.target)return;s.gamePicked=k;render();return;}
    if(action==='game-read'){s.gameRead=true;render();return;}
    if(action==='game-next'){const q=s.gameTasks[s.gameRound];if(s.gamePicked!==(q.type==='grid'?'correct':q.target)||q.type==='trail'&&!s.gameRead)return;s.gameRound++;s.gameEditing=false;s.gameRead=false;s.gamePicked=null;s.gameHelp=false;render();return;}
    if(action==='wb-forward'||action==='wb-back'){s.wb=action==='wb-forward'?'forward':'back';render();return;}if(action==='school-start'){s.schoolMode=true;render();return;}
    if(action==='school-choice'){if(s.schoolPicked===['b','q'][s.school])return;s.schoolPicked=k;render();return;}if(action==='school-next'){if(s.schoolPicked!==['b','q'][s.school])return;s.school++;s.schoolPicked=null;render();return;}
    if(action==='new-class'){try{const history=JSON.parse(localStorage.getItem(KEY+':history')||'[]');history.push({savedAt:new Date().toISOString(),progress:s});localStorage.setItem(KEY+':history',JSON.stringify(history));}catch{}s=fresh();render();return;}
    if(action==='teacher-close'){showTeacher(false);return;}if(action==='jump'){s.page=+b.dataset.page;resetTurn();render();return;}
  }
  function teacherText(){
    const t=kind(),k=currentTarget();
    if(t==='input'){
      return '<p><strong>Teach:</strong> point to each pair. Say the name; the child repeats. Its audio is the official letter NAME, not a sound.</p><p><strong>Four lines:</strong> point to lines 1–4. Line 3 is the resting line. Most uppercase bodies use lines 1–3 (Q has a small finishing tail). Short lowercase bodies use 2–3; tall parts reach 1; tails reach 4. The dots of i/j sit above their bodies. Point out the current group’s height/position BEFORE its correction task. Do not demand English category labels.</p><p><strong>Then:</strong> one uppercase match, one same-letter handwriting correction, two names without a model. Explain only one placement feature at a time; no writing mastery claim.</p>';
    }
    if(t==='group'){
      const g=s.groups[groupIndex()];
      if(g.round===1)return '<p><strong>Same letter throughout:</strong> ask “Which one fits the lines?” The child points; click their actual choice. All three use the same letter; only height/position/tail length changes.</p><p><strong>Teaching cue:</strong> '+escape(V.hint(k))+'</p><p>Wrong: the model and selected error appear together. Explain the one placement difference; Hide help returns to the same target with moved choices. Correct: point to the repaired letter, say its name, then continue to the two oral turns. This is visual handwriting recognition, not a test of the child’s real writing.</p>';
      if(g.round>=4)return '<p>Four turns finished: one match, one correction, two names without a model. Continue to the next group.</p>';
      if(g.phase==='support')return `<p><strong>Step ${g.support+1}/3:</strong> ${g.support===0?'Point to one shape feature. Compare the actual selected wrong letter; for oral confusion, use Compare only when relevant.':g.support===1?'Play the name; let the child repeat. Slow is optional.':'Show the uppercase/lowercase pair once, then hide it and retry.'}</p><p>${escape(D.features[k])}${g.round<2&&g.picked&&g.picked!==k?'<br>Selected '+escape(g.picked)+': '+escape(D.features[g.picked]):''}</p>${(g.round<2?g.picked===similar[k]:g.contrast)&&D.errors[k]?'<p>'+escape(D.errors[k])+'</p>':''}<p>Still wrong: help again, then retry the same target. No oral score.</p>`;
      if(g.round<2)return '<p><strong>Task '+(g.round+1)+'/3:</strong> '+(g.round===0?'Ask “Find the small letter.” Click the child’s actual choice, then ask its name.':'Ask “What is wrong?” The child points to the incorrect small letter. Click it, let the child choose the replacement, then read the corrected pair.')+'</p><p>A wrong choice starts short support. Hide the help and retry the same target with moved choices/new font.</p>';
      return '<p>Ask “What’s its name?” Wait 3–5 seconds, no model/capital first.</p><p>Correct: continue. Wrong/silent/letter sound instead of name: Help → short explanation/model → hide support → same-letter naming.</p><p>I tried it means a speaking turn, not a correct score.</p>';
    }
    let text='<p>'+escape(D.teacher[t]||'')+'</p>';
    if(t==='repair'&&k&&!s.retry)text+='<p><strong>Shape cue:</strong> '+escape(D.features[k])+' '+escape(s.contrast?D.errors[k]||'':'')+'</p>';
    return text;
  }
  function showTeacher(open){const panel=document.querySelector('#teacher-panel');panel.hidden=!open;document.querySelector('#teacher').setAttribute('aria-expanded',String(open));panel.innerHTML=`<div class="teacher-heading"><h2>Teacher guide</h2>${button('teacher-close','×','','aria-label="Close teacher panel"')}</div><h3>${s.page+1}. ${D.pages[s.page]}</h3>${teacherText()}`;panel.scrollTop=0;}
  document.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(b&&!b.disabled)act(b.dataset.action,b);});
  document.querySelector('#back').onclick=()=>{if(s.page>0){s.page--;render();}};document.querySelector('#next').onclick=next;document.querySelector('#teacher').onclick=()=>showTeacher(document.querySelector('#teacher-panel').hidden);
  document.querySelector('#pages').onclick=()=>{const p=document.querySelector('#thumbs');p.hidden=!p.hidden;document.querySelector('#pages').setAttribute('aria-expanded',String(!p.hidden));p.innerHTML=D.pages.map((name,i)=>button('jump',`${i+1}. ${escape(name)}`,i===s.page?'current':'',`data-page="${i}"`)).join('')+button('new-class','Start a new class','new-class');showTeacher(false);};
  document.querySelector('#fullscreen').onclick=()=>{const p=document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();p?.catch(()=>notice('Use the browser full-screen control.'));};
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){showTeacher(false);document.querySelector('#thumbs').hidden=true;}});
  function fit(){document.querySelector('#stage').style.transform=`translate(-50%,-50%) scale(${Math.min(innerWidth/1280,innerHeight/720)})`;}
  addEventListener('resize',fit);addEventListener('pagehide',()=>{stop();save();});fit();render();
})();
