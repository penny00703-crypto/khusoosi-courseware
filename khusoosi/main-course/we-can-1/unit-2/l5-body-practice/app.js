'use strict';
(()=>{
 const D=L12_DATA,A='assets/',V=L11_VISUALS,C=L10_VISUALS;
 const published=location.protocol==='https:'&&location.hostname==='penny00703-crypto.github.io'&&location.pathname.startsWith(new URL(D.identity.canonical).pathname)&&!new URLSearchParams(location.search).has('qa');
 const $=id=>document.getElementById(id),voice=$('voice');
 const namespace=D.identity.key+(new URLSearchParams(location.search).has('qa')?':qa':location.protocol==='https:'?':class':':preview');
 let state={page:0,turns:{}};
 try{const previous=JSON.parse(localStorage.getItem(namespace));if(previous?.page>=0&&previous.page<D.stages.length)state=previous;}catch{}
 const save=()=>{try{localStorage.setItem(namespace,JSON.stringify(state));}catch{}};
 const ts=kind=>state.turns[kind]||(state.turns[kind]={i:0,attempt:false,mode:'try',complete:false});
 const action=id=>D.actions.find(a=>a.id===id);
 const img=a=>`<img src="${A+a.img}" alt="${a.domain==='letter'?'Lowercase letter':a.domain==='touch'?'Marked body part':'Action picture'}">`;
 const art=a=>a.domain==='class'?C.art(a.id):img(a);
 const icon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 4V5L7 9zm12-2v3a4 4 0 010 4v3a7 7 0 000-10z"/></svg>';
 const audio=(a,label=a.en)=>`<button class="guide" data-audio="${a.audio}" data-caption="${a.en}"><span class="speaker">${icon}</span><span>${label}</span></button>`;
 const note=a=>a.domain==='class'?'Official CD1 19 excerpt':a.domain==='letter'?'Official CD1 22 · letter name':'Practice model · approved A voice';
 // Production provenance stays in the source map, not the child's task area.
 const source=text=>'';
 const split=(left,right,cls='')=>`<div class="split ${cls}"><div class="copy">${left}</div>${right}</div>`;
 const lead=(k,title,instruction)=>`<p class="kicker">${k}</p><h1>${title}</h1><p class="instruction">${instruction}</p>`;
 const panel=(a,cls='')=>`<div class="task-art ${cls}">${art(a)}</div>`;
 const turn=(s,ids)=>`<p class="progress-note">TURN ${Math.min(s.i+1,ids.length)} / ${ids.length}</p>`;
 let blockNext=false;
 function stop(){voice.pause();voice.removeAttribute('src');document.querySelectorAll('.playing').forEach(e=>e.classList.remove('playing'));}
 function play(file,b,slow=false){stop();voice.src=A+file;voice.playbackRate=slow?.8:1;voice.preservesPitch=true;if(b)b.classList.add('playing');voice.play().catch(()=>toast('Audio could not play. Please try again.'));}
 voice.onended=()=>document.querySelectorAll('.playing').forEach(e=>e.classList.remove('playing'));
 function toast(msg){$('notice').textContent=msg;$('notice').hidden=false;setTimeout(()=>$('notice').hidden=true,2500);}
 function button(text,id,cls='primary',disabled=false){return `<button id="${id}" class="${cls}" ${disabled?'disabled':''}>${text}</button>`;}
 function continueTurn(s,ids){s.mode='try';s.wrong=null;if(s.i===ids.length-1){s.complete=true;s.attempt=true;s.correct=true;}else{s.i++;s.attempt=false;s.correct=false;}save();render();}
 function bindAudio(){document.querySelectorAll('[data-audio]').forEach(b=>b.onclick=()=>play(b.dataset.audio,b,b.dataset.slow==='true'));}
 function oral(kind,ids,title,instruction){
  const s=ts(kind),a=action(ids[s.i]);blockNext=!s.complete;
  const helped=s.mode==='help';
  const contrast=a.domain==='letter'?action(`letter-${{b:'d',d:'b',p:'q',q:'p',g:'y',l:'i',x:'z',y:'g'}[a.en]||'m'}`):null;
  const display=helped?`<div class="oral-model">${audio(a)}<button class="guide slow-model" data-audio="${a.audio}" data-slow="true" data-caption="${a.en}"><span class="speaker">${icon}</span><span>Slow model</span></button><p class="note">${note(a)}</p></div>`:s.mode==='retry'?'<p class="retry-label">Help hidden. Say it again.</p>':'<p class="retry-label">Your words. No model yet.</p>';
  const left=lead(kind==='check'?'YOUR TURN':kind==='exit'?'LAST TURN':'SAY IT',title,instruction)+turn(s,ids)+display+
    `<div class="oral-buttons">${helped?button('Hide help & try again','hide','outline'):button(s.attempt?'Attempt made ✓':'I tried it','attempt','primary',s.attempt||s.complete)+button('Help / model','model','outline',!s.attempt||s.complete)+button(s.i===ids.length-1?'Finish turns':'Next turn →','turn-next','primary',!s.attempt||s.complete)}</div>`+
    (s.complete?'<p class="note">Turns finished. Continue →</p>':'');
  $('lesson').innerHTML=split(left,`<div class="oral-art"><div class="task-art ${a.domain==='touch'?'body-target':''}">${art(a)}</div>${helped&&contrast?`<div class="letter-contrast">${img(a)}${img(contrast)}<small>Find the line / tail.</small></div>`:''}</div>`,'oral-turn');
  if($('attempt'))$('attempt').onclick=()=>{s.attempt=true;save();render();};
  if($('model'))$('model').onclick=()=>{s.mode='help';save();render();};
  if($('hide'))$('hide').onclick=()=>{stop();s.mode='retry';s.attempt=false;save();render();};
  if($('turn-next'))$('turn-next').onclick=()=>continueTurn(s,ids);
 }
 const points={head:[[315,105,65]],shoulders:[[188,337,30],[415,337,30]],knees:[[236,645,30],[364,645,30]],toes:[[177,870,29],[413,872,29]],eyes:[[119,166,18],[200,166,18]],ears:[[63,178,19],[260,178,19]],mouth:[[160,220,22]],nose:[[160,193,18]]};
 function mapSvg(face,interactive=true,highlight=null){
  const ids=face?['eyes','ears','mouth','nose']:['head','shoulders','knees','toes'];
  return `<svg class="body-map" viewBox="0 0 ${face?330:590} ${face?305:935}" role="group" aria-label="Complete ${face?'face':'body'} map"><image href="${A}${face?'face':'body'}-complete.jpg" width="${face?330:590}" height="${face?305:935}"/>${ids.map(k=>points[k].map(([x,y,r],i)=>`<g ${interactive?`role="button" tabindex="0" aria-label="Point to ${k}${points[k].length>1?' · '+(i+1):''}" data-part="${k}"`:''} class="part-marker ${highlight===k?'marked':''}"><circle cx="${x}" cy="${y}" r="${face?12:k==='head'?58:24}" fill="${highlight===k?'#1670e833':'#ffffff18'}" stroke="#fff" stroke-width="${face?4:7}"/><circle cx="${x}" cy="${y}" r="${face?10:k==='head'?55:21}" fill="none" stroke="${highlight===k?'#1670e8':'#ff735c'}" stroke-width="${face?2:3}"/><circle cx="${x}" cy="${y}" r="${face?13:r+12}" fill="transparent" stroke="none"/></g>`).join('')).join('')}</svg>`;
 }
 function compare(s,target){return `<div class="comparison"><div>${art(action(s.wrong))}<b>Your choice</b></div><div>${art(target)}<b>Try this meaning</b></div></div><p class="note">${target.domain==='class'?({sit:'Sit: body is on the chair.',seat:'Seat: return to the chair.',circle:'Circle: people around a round space.',front:'Front: move towards the board.'}[target.id]||'Look at the action, not the position.'):target.domain==='touch'?'Touch your + the body part. Point to the same part on yourself.':target.domain==='letter'?`Uppercase ${target.en.toUpperCase()} matches lowercase ${target.en}. Compare the letter shape.`:'Compare the eyes / hands in both pictures.'}</p>`;}
 function choices(kind,questions,title,instruction,silent=false){
  const s=ts(kind),q=questions[s.i],a=action(q.answer);blockNext=!s.complete;
  const help=s.mode==='help';
  let left=lead(silent?'SCHOOL PRACTICE · H5':'MATCH THE MEANING',title,instruction)+turn(s,questions);
  left+=q.cap?`<div class="capital-prompt">${q.cap}</div>`:silent?`<div class="reading-prompt">${a.en}</div>`:audio(a);
  left+=!silent?source(note(a)):source('Reading transfer · not an original WB listening item');
  if(help)left+=button('Hide help & try again','hide','outline');
  else left+=`<p class="choice-feedback">${s.correct?'That picture matches.':s.mode==='retry'?'Help hidden. Try the same item.':'Look at all the choices.'}</p>${button(s.i===questions.length-1?'Finish tasks':'Next task →','turn-next','primary',!s.correct||s.complete)}`;
  $('lesson').innerHTML=split(left,help?`<div class="choice-workshop help-workshop">${compare(s,a)}</div>`:`<div class="choice-workshop"><div class="image-options">${q.options.map((id,i)=>`<button class="image-option ${s.correct&&id===a.id?'correct':''}" data-choice="${id}" aria-label="Picture ${i+1}" ${s.correct?'disabled':''}>${art(action(id))}<span>${i+1}</span></button>`).join('')}</div>${s.complete?'<p class="note">Tasks finished.</p>':''}</div>`,silent?'reading-task':'');
  document.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{if(b.dataset.choice===a.id){s.correct=true;}else{s.wrong=b.dataset.choice;s.mode='help';}save();render();});
  if($('hide'))$('hide').onclick=()=>{s.mode='retry';s.correct=false;save();render();};
  if($('turn-next'))$('turn-next').onclick=()=>continueTurn(s,questions);
 }
 function pointTask(kind,ids,face){
  const s=ts(kind),a=action(ids[s.i]);blockNext=!s.complete;
  const help=s.mode==='help';
  $('lesson').innerHTML=split(lead('POINT ON YOURSELF',face?'Eyes, ears,<br>mouth, nose':'Head to toes','Point on your body.<br>Then find it in the picture.')+turn(s,ids)+audio(a)+source(note(a))+
   `<p class="choice-feedback">${help?`You chose ${s.wrong}. Look at ${a.id}.`:s.correct?'Now point on yourself.':s.mode==='retry'?'Help hidden. Try the same part.':'Point. Choose the same part.'}</p>`+
   (help?button('Hide help & try again','hide','outline'):button(s.i===ids.length-1?'Finish parts':'Next part →','turn-next','primary',!s.correct||s.complete)),
   `<div class="map-panel ${face?'face-map':''}">${mapSvg(face,!help&&!s.complete,help||s.complete?a.id:null)}${help?`<div class="map-help"><b>${s.wrong}</b> → <b>${a.id}</b></div>`:''}</div>`);
  document.querySelectorAll('[data-part]').forEach(b=>{const choose=()=>{if(b.dataset.part===a.id)s.correct=true;else{s.wrong=b.dataset.part;s.mode='help';}save();render();};b.onclick=choose;b.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose();}};});
  if($('hide'))$('hide').onclick=()=>{s.mode='retry';s.correct=false;save();render();};
  if($('turn-next'))$('turn-next').onclick=()=>continueTurn(s,ids);
 }
 const workbookAudio={71:['close','open','raise','clap'],72:['close','open','raise','clap'],74:['head','nose','mouth','shoulders','knees','toes'],75:['stand','line','sit','circle'],76:['stand','front','line','circle']};
 function book(kind,pages,title,instruction){
  const s=ts(kind),p=pages[s.i],ids=workbookAudio[p];
  const heading=p===72?'Give a command.<br>Say “Okay.”':title;
  const task=p===72?'Take turns. Listen and reply.':instruction;
  const models=ids.map(id=>audio(action(id))).join('')+(p===72?audio({en:'Okay!',audio:'a_practice_okay.mp3'}):'');
  $('lesson').innerHTML=split(lead('WORKBOOK · PRACTISE',heading,task)+`<div class="book-tabs">${pages.map((n,i)=>button(`WB ${n}`,`wb-${n}`,i===s.i?'primary':'outline')).join('')}</div><div class="workbook-audio"><p class="audio-label">${p<=74?'Practice models':'Official sentence models · SB CD1 19'}</p>${models}</div>`,`<div class="book-frame l12-book"><img src="${A}wb-${p}-activity1.jpg" alt="Complete workbook ${p} activity 1"></div>`,'workbook-task');
  pages.forEach((n,i)=>$(`wb-${n}`).onclick=()=>{s.i=i;save();render();});
 }
 function render(){
  stop();blockNext=false;const stage=D.stages[state.page],kind=stage.kind,s=ts(kind);
  if(kind==='prep')$('lesson').innerHTML=split(lead('WE CAN 1 · UNIT 2 · LESSON 12','Body<br><em>Practice</em>','Move. Point. Speak.<br>Read your little letters.')+audio({en:'Hello! Can you hear me?',audio:'soundcheck.mp3'})+button('Start a new class','new-class','outline')+source('School Practice · no new language'),`<div class="mission-grid"><div>${panel(action('raise'))}<b>Body actions</b></div><div>${panel(action('head'))}<b>Touch commands</b></div><div>${panel(action('circle'))}<b>Classroom commands</b></div><div class="mission-letters"><div>${V.gridPair('p')}</div><b>Little letters</b></div></div>`);
  else if(kind==='warm'){
   const ids=['close','open','raise','clap'];$('lesson').innerHTML=split(lead('WARM-UP','Look.<br>Give a command.','Choose two pictures. Say the commands.')+button(s.reveal?'Hide models':'Show models','warm-model','outline'),`<div class="warm-grid">${ids.map(id=>`<div class="warm-card">${panel(action(id))}${s.reveal?audio(action(id)):''}</div>`).join('')}</div>`);$('warm-model').onclick=()=>{s.reveal=!s.reveal;save();render();};
  }else if(kind==='bodybook')book(kind,[71,72],'Listen.<br>Do the action.','Play a command. Do the action.');
  else if(kind==='act'){
   const ids=['raise','close','clap','open'],a=action(ids[s.i]);blockNext=!s.complete;
   $('lesson').innerHTML=split(lead('BODY ACTIONS','Do the action','Read or listen. Then move safely.')+turn(s,ids)+audio(a)+source(note(a))+button(s.reveal?'Show picture':'Hide picture','act-picture','outline')+`<div class="actions">${button(s.i===ids.length-1?'Finish actions':'Next action →','act-next')}</div>`,s.reveal?'<div class="task-art hidden-art"><span>Do it yourself.</span></div>':panel(a));$('act-picture').onclick=()=>{s.reveal=!s.reveal;save();render();};$('act-next').onclick=()=>{s.reveal=false;continueTurn(s,ids);};
  }else if(kind==='bodytalk')oral(kind,['close','raise'],'You tell me','Look. Give your teacher the command.');
  else if(kind==='chant')$('lesson').innerHTML=split(lead('OUR BODY BEAT','Chant<br>and point','Point to each part as you say it.')+audio({en:'Head, shoulders, knees, and toes.',audio:'official-chant-first-line.mp3'})+source('Official CD1 16 · clean first-line excerpt'),`<div class="chant-panel"><div class="chant-words"><span>Head,</span><span>shoulders,</span><span>knees,</span><span>and toes.</span></div>${mapSvg(false,false)}</div>`);
  else if(kind==='pointbig')pointTask(kind,['head','shoulders','knees','toes'],false);
  else if(kind==='pointface')pointTask(kind,['ears','nose','eyes','mouth'],true);
  else if(kind==='touchbook')book(kind,[74],'Listen.<br>Point and say.','Find the part. Give the command.');
  else if(kind==='touchtalk')oral(kind,['knees','mouth'],'Give a<br>touch command','Look at the rings.<br>Tell your teacher what to touch.');
  else if(kind==='classbook')book(kind,[75,76],'Listen.<br>Give a command.','Point to the people. Tell them what to do.');
  else if(kind==='classpick')choices(kind,[{answer:'sit',options:['front','stand','sit']},{answer:'circle',options:['circle','line','seat']},{answer:'front',options:['seat','front','sit']}],'Which picture?','Read the command.<br>Choose the matching action.');
  else if(kind==='classtalk')oral(kind,['line','seat','stand'],'You give<br>the instruction','Tell the people in the picture what to do.');
  else if(kind==='letterinput'){
   const groups=['bdp','qgl','myx'],g=groups[s.i];$('lesson').innerHTML=split(lead('LITTLE LETTERS','Big + little','Say the letter names.<br>Look at their writing lines.')+`<div class="book-tabs">${groups.map((x,i)=>button(x.split('').join(' · '),`letter-set-${i}`,i===s.i?'primary':'outline')).join('')}</div>`+source('Official CD1 22 letter names · same four-line models as L11'),`<div class="letter-set">${[...g].map(k=>`<div class="letter-model">${V.gridPair(k)}${audio(action('letter-'+k),k.toUpperCase()+' · '+k)}</div>`).join('')}</div>`);groups.forEach((_,i)=>$(`letter-set-${i}`).onclick=()=>{s.i=i;save();render();});
  }else if(kind==='lettertalk')oral(kind,['letter-b','letter-d','letter-q'],'Name the<br>little letter','Say its name before the model.');
  else if(kind==='alphabetbook'){
   const pages=[77,78],p=pages[s.i];$('lesson').innerHTML=split(lead('WORKBOOK · PRACTISE','Point.<br>Say the names.','Point to a letter. Say its name.')+`<div class="book-tabs">${pages.map((n,i)=>button(`WB ${n}`,`wb-${n}`,i===s.i?'primary':'outline')).join('')}</div>`+source(`WB ${p} · PDF ${p+6} · activity 1`)+button(s.models?'Hide name buttons':'Play letter names','alphabet-help','outline'),`<div class="alphabet-wrap"><div class="book-frame l12-book"><img src="${A}wb-${p}-activity1.jpg" alt="Whole lowercase alphabet activity"></div>${s.models?`<div class="alphabet-audio">${[...(p===78?'zyxwvutsrqponmlkjihgfedcba':'abcdefghijklmnopqrstuvwxyz')].map(k=>`<button data-audio="official-letter-${k}.mp3" data-caption="${k}" aria-label="Letter ${k}"><img src="${A}letter-${k}.svg" alt="${k}"></button>`).join('')}</div>`:''}</div>`);pages.forEach((n,i)=>$(`wb-${n}`).onclick=()=>{s.i=i;save();render();});$('alphabet-help').onclick=()=>{s.models=!s.models;save();render();};
  }else if(kind==='trace'){
   const k=['o','p'][s.i];$('lesson').innerHTML=split(lead('TRACE','Air-write<br>'+k.toUpperCase(),'Watch. Trace the capital in the air.')+audio(action('letter-'+k),k.toUpperCase()+' · '+k)+`<div class="book-tabs">${['o','p'].map((n,i)=>button(n.toUpperCase(),`trace-${n}`,i===s.i?'primary':'outline')).join('')}</div>`+'<p class="note">Tall capital: line 1 to line 3.</p>',`<div class="trace-panel">${V.gridPair(k)}<span class="trace-caption">${k.toUpperCase()} → trace in the air</span></div>`);['o','p'].forEach((n,i)=>$(`trace-${n}`).onclick=()=>{s.i=i;save();render();});
  }else if(kind==='fix'){
   const qs=[{answer:'head',options:['knees','nose','head']},{answer:'sit',options:['sit','seat','stand']}];choices(kind,qs,'Fix the action','Read the words.<br>Replace the wrong picture.');if(s.mode!=='help'){const wrong=action(['knees','stand'][s.i]);const workshop=$('lesson').querySelector('.choice-workshop');workshop.classList.add('fix-workshop');workshop.insertAdjacentHTML('afterbegin',`<div class="wrong-demo">${art(wrong)}<span>Wrong action</span></div>`);}
  }else if(kind==='check')oral(kind,['clap','toes','circle','letter-g','letter-l','letter-x'],'Your turn','Give the command.<br>For a letter, say its name.');
  else if(kind==='school')choices(kind,[{answer:'open',options:['close','open','clap']},{answer:'mouth',options:['mouth','nose','ears']},{answer:'seat',options:['sit','front','seat']},{answer:'letter-h',cap:'H',options:['letter-k','letter-n','letter-h']}],'Read. Choose.','Match the words or the letter.',true);
  else if(kind==='exit')oral(kind,['open','ears','front','letter-y'],'One last turn','Give the command.<br>For a letter, say its name.');
  else if(kind==='finish')$('lesson').innerHTML=split(lead('TAKE IT HOME','Four ways<br>to practise','Listen + repeat.<br>Listen + find.<br>Say it yourself.<br>Read without sound.')+`<a class="primary" href="review/${published?'':'?qa=1'}" target="_blank" rel="noopener">${published?'Open home practice':'Open local review preview'} ↗</a>`+source('L12 · Unit 2 L5 · new lesson identity'),`<div class="review-card l12-review"><h2>Home practice</h2><img src="assets/review-qr.png" alt="L12 review QR"><button id="enlarge-qr" class="outline">Enlarge QR</button><p class="preview-label">${published?'We Can 1 · Unit 2 · L12':'Local preview · not published yet'}</p><p>${published?'Scan to open L12 home practice.':'The QR targets the future online review.<br>Use the preview link for this draft.'}</p></div>`);
  bindAudio();
  if($('new-class'))$('new-class').onclick=()=>{try{localStorage.setItem(namespace+':previous-class',JSON.stringify(state));}catch{}state={page:0,turns:{}};save();render();toast('New class started. Earlier progress is saved separately.');};
  if($('enlarge-qr'))$('enlarge-qr').onclick=()=>{$('qr-dialog').querySelector('p').textContent=published?'L12 home practice · canonical online link':'Preview only. Publish first.';$('qr-dialog').showModal();};
  $('page-number').textContent=`${state.page+1} / ${D.stages.length}`;$('objective').textContent=stage.name;$('progress').style.width=`${(state.page+1)/D.stages.length*100}%`;
  $('back').disabled=state.page===0;$('next').disabled=blockNext||state.page===D.stages.length-1;
  $('thumbs').innerHTML=D.stages.map((a,i)=>`<button data-page="${i}" class="${i===state.page?'current':''}">${i+1} · ${a.name}</button>`).join('');
  document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>{state.page=+b.dataset.page;$('thumbs').hidden=true;$('pages').setAttribute('aria-expanded','false');save();render();});
 }
 function resize(){const scale=Math.min(innerWidth/1280,innerHeight/720);$('stage').style.transform=`translate(-50%,-50%) scale(${scale})`;}
 $('back').onclick=()=>{if(state.page>0){state.page--;save();render();}};
 $('next').onclick=()=>{if(!blockNext&&state.page<D.stages.length-1){state.page++;save();render();}};
 $('pages').onclick=()=>{$('thumbs').hidden=!$('thumbs').hidden;$('pages').setAttribute('aria-expanded',!$('thumbs').hidden);};
 $('fullscreen').onclick=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>toast('Full screen is not available in this browser.'));
 $('qr-close').onclick=()=>$('qr-dialog').close();
 document.onkeydown=e=>{if(e.target.closest('button,a,input,textarea,dialog'))return;if(e.key==='ArrowRight')$('next').click();if(e.key==='ArrowLeft')$('back').click();if(e.key==='Escape'){$('thumbs').hidden=true;$('pages').setAttribute('aria-expanded','false');}};
 window.addEventListener('resize',resize);resize();render();
})();
