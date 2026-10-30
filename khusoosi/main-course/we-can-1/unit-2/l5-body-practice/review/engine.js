'use strict';
(()=>{
 const A='../assets/',voice=document.getElementById('voice'),$=id=>document.getElementById(id);
 const canonical=new URL(LESSON.canonical);
 const preview=location.protocol!=='https:'||location.hostname!==canonical.hostname||!location.pathname.startsWith(canonical.pathname)||new URLSearchParams(location.search).has('qa');
 const state={stations:[false,false,false,false],firstTry:0,quizTotal:LESSON.matchQuiz.length+LESSON.examQuiz.length};
 const action=id=>REVIEW_ACTIONS.find(a=>a.id===id),visual=a=>`<img src="${A+a.img}" alt="${a.domain==='letter'?'Letter shape':a.domain==='part'?'Marked body part':'Action picture'}">`;
 const topic=a=>a.domain==='letter'?'الحروف':a.domain==='part'?'أجزاء الجسم':'التعليمات';
 const stop=()=>{voice.pause();voice.removeAttribute('src');document.querySelectorAll('.playing').forEach(b=>b.classList.remove('playing'));};
 const play=(a,onPlayed)=>{stop();voice.src=A+a.audio;voice.playbackRate=1;voice.play().then(()=>{if(onPlayed)onPlayed();}).catch(()=>$('report-status').textContent='تعذّر تشغيل الصوت؛ حاول مرة أخرى.');};
 const shuffle=items=>{const copy=[...items];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;};
 voice.onended=()=>document.querySelectorAll('.playing').forEach(b=>b.classList.remove('playing'));
 if(preview){$('preview-note').hidden=false;$('name-form').hidden=true;}
 function done(i){if(state.stations[i])return;state.stations[i]=true;$('st'+(i+1)).classList.add('done');if(state.stations.every(Boolean))final();}
 const practiced=new Set(),all=LESSON.groups.flatMap(g=>g.ids);
 function practiceProgress(){
  $('practice-progress').innerHTML=LESSON.groups.map(g=>`${g.ar}: <bdi dir="ltr">${g.ids.filter(id=>practiced.has(id)).length} / ${g.ids.length}</bdi>`).join(' · ');
  $('st1-done').disabled=!all.every(id=>practiced.has(id));
 }
 function addCards(ids,container){
  ids.forEach(id=>{const a=action(id),b=document.createElement('button');b.className='word-card '+(a.domain==='letter'?'letter':'');
   b.dataset.word=id;b.setAttribute('aria-label','Practise '+a.en);b.innerHTML=`<span class="card-visual">${visual(a)}</span><span class="en">${a.domain==='letter'?a.en.toUpperCase()+' · '+a.en:a.en}</span><span class="ar">${a.ar}</span><span class="card-status"></span>`;
   b.onclick=()=>play(a,()=>{practiced.add(id);b.classList.add('played','playing');b.querySelector('.card-status').textContent='✓';practiceProgress();});container.appendChild(b);
  });
 }
 LESSON.groups.forEach((g,i)=>{
  const details=document.createElement('details');details.className='word-set';details.open=true;
  details.innerHTML=`<summary>${g.ar}<span class="en">${g.name}</span><span class="group-count">${g.ids.length} للمراجعة الآن</span></summary><div class="cards"></div><details class="more-words"><summary>المزيد · ${g.extraIds.length} إضافية</summary><div class="cards"></div></details>`;
  addCards(g.ids,details.querySelector('.cards'));addCards(g.extraIds,details.querySelector('.more-words .cards'));$('word-groups').appendChild(details);
 });
 practiceProgress();
 const moveTo=id=>{stop();$(id).scrollIntoView({block:'start',behavior:'smooth'});};
 $('st1-done').onclick=()=>{done(0);moveTo('st2');};
 let listenIndex=0,readIndex=0;
 function choiceTask(which){
  const isListen=which==='listen',qs=isListen?LESSON.matchQuiz:LESSON.examQuiz,index=isListen?listenIndex:readIndex,q=qs[index],a=action(q.answer);
  let attempted=false,locked=false,heard=!isListen;
  $(which+'-round').innerHTML=`${topic(a)} · السؤال <bdi dir="ltr">${index+1} / ${qs.length}</bdi>`;
  $(which+'-feedback').textContent='';$(which+'-next').hidden=true;
  if(isListen){$('listen-audio').onclick=()=>play(a,()=>{heard=true;$(which+'-options').querySelectorAll('button').forEach(b=>b.disabled=locked);});}else{$('read-prompt').textContent=q.cap||a.en;}
  const opts=$(which+'-options');opts.innerHTML='';
  shuffle(q.options).forEach((id,i)=>{const b=document.createElement('button');b.className='choice';b.dataset.choice=id;b.setAttribute('aria-label','Picture '+(i+1));b.innerHTML=visual(action(id))+`<span class="choice-num">${i+1}</span>`;
   b.disabled=!heard;b.onclick=()=>{if(locked||!heard)return;stop();if(id===q.answer){locked=true;if(!attempted)state.firstTry++;b.classList.add('correct');opts.querySelectorAll('button').forEach(x=>x.disabled=true);$(which+'-feedback').textContent='أحسنت!';$(which+'-next').hidden=false;}else{attempted=true;b.classList.add('wrong');$(which+'-feedback').textContent=isListen?'استمع مرة أخرى، ثم جرّب.':'اقرأ الكلمات مرة أخرى، ثم جرّب.';}};opts.appendChild(b);});
  $(which+'-next').textContent=index===qs.length-1?'تمّت المحطة ✔':'التالي';
  $(which+'-next').onclick=()=>{if(!locked)return;stop();if(index===qs.length-1){done(isListen?1:3);$(which+'-next').disabled=true;if(isListen)moveTo('st3');return;}if(isListen)listenIndex++;else readIndex++;choiceTask(which);moveTo(isListen?'st2':'st4');};
 }
 choiceTask('listen');choiceTask('read');
 let speakIndex=0,attempted=false,modelShown=false,retrying=false;
 function speak(){
  attempted=false;modelShown=false;retrying=false;const a=action(LESSON.speakIds[speakIndex]);
  $('speak-round').innerHTML=`${topic(a)} · المحاولة <bdi dir="ltr">${speakIndex+1} / ${LESSON.speakIds.length}</bdi>`;$('speak-image').innerHTML=visual(a);$('speak-answer').textContent='Your turn.';
  $('speak-attempt').disabled=false;$('speak-model').disabled=true;$('speak-hide').hidden=true;$('speak-next').disabled=true;
  $('speak-attempt').onclick=()=>{stop();attempted=true;$('speak-attempt').disabled=true;$('speak-model').disabled=false;$('speak-next').disabled=false;};
  $('speak-model').onclick=()=>{if(!attempted)return;modelShown=true;play(a);$('speak-answer').textContent=a.en;$('speak-hide').hidden=false;$('speak-next').disabled=true;};
  $('speak-hide').onclick=()=>{if(!modelShown)return;stop();retrying=true;attempted=false;modelShown=false;$('speak-answer').textContent='Help hidden. Say it again.';$('speak-hide').hidden=true;$('speak-attempt').disabled=false;$('speak-model').disabled=true;$('speak-next').disabled=true;};
  $('speak-next').textContent=speakIndex===LESSON.speakIds.length-1?'تمّت المحطة ✔':'التالي';
  $('speak-next').onclick=()=>{if(!attempted||modelShown)return;stop();if(speakIndex===LESSON.speakIds.length-1){done(2);$('speak-next').disabled=true;moveTo('st4');return;}speakIndex++;speak();moveTo('st3');};
 }
 speak();
 function final(){
  const stars=state.firstTry/state.quizTotal>=.8?3:state.firstTry/state.quizTotal>=.6?2:1;
  $('final').hidden=false;$('stars').textContent='⭐'.repeat(stars);$('score').innerHTML=`الصحيح من أول محاولة: <bdi dir="ltr">${state.firstTry} / ${state.quizTotal}</bdi>`;moveTo('final');
  if(preview){$('report-status').textContent='Preview only · no data sent';return;}
  // Identity is confirmed for this attempt. No name inherited from another learner.
  let submitted=false;
  $('send').onclick=async()=>{const name=$('student-name').value.trim();if(!name||submitted)return;submitted=true;$('send').disabled=true;
   const url='https://awogcxsegaamenwnjsmg.supabase.co',key='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhd29nY3hzZWdhYW1lbnduanNtZyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzg5MTA1OTMzLCJleHAiOjIxMDQ2ODE5MzN9.rfHrkaTFsOMkhUiC66lY5z4FyLuwYFch-5ZNyywgnDA';
   try{const r=await fetch(url+'/rest/v1/review_records',{method:'POST',headers:{apikey:key,Authorization:'Bearer '+key,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({student_name:name,book:LESSON.book,unit:LESSON.unit,lesson:LESSON.lesson,stars,first_try:state.firstTry,quiz_total:state.quizTotal})});if(!r.ok)throw Error('submit');$('report-status').textContent='تم إرسال النتيجة.';}catch{$('report-status').textContent='لم يتم الإرسال. حاول مرة أخرى.';submitted=false;$('send').disabled=false;}
  };
 }
 document.querySelectorAll('.word-set,.more-words').forEach(d=>d.addEventListener('toggle',stop));
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
})();
