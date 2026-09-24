/* Four-station home review · v2.9
 * Station 1 = listen and repeat
 * Station 2 = audio-only discrimination
 * Station 3 = guided spoken production
 * Station 4 = silent school-style reading recognition
 */
(function(){
  const A='../assets/';
  const player=document.getElementById('player');
  const state={firstTry:0,quizTotal:LESSON.matchQuiz.length+LESSON.examQuiz.length,stations:[false,false,false,false]};
  const action=id=>LESSON.actions.find(x=>x.id===id);
  const dots=a=>(a.points||[]).map(([x,y,size])=>`<span class="part-dot" style="left:${x}%;top:${y}%;width:${size}%;aspect-ratio:1"></span>`).join('');
  const visual=a=>a.focus==='body'
    ? `<span class="action-thumb part-visual body-part-visual" role="img" aria-label="${a.en}"><span class="body-canvas"><img src="${A}body-map-boy-sports-v2.jpg" alt="">${dots(a)}</span></span>`
    : `<span class="action-thumb part-visual focus-${a.focus||'face'}" role="img" aria-label="${a.en}"><span class="part-bg" style="background-image:url('${A}body-map-boy-sports-v2.jpg')"></span>${dots(a)}</span>`;
  const SB_URL='https://awogcxsegaamenwnjsmg.supabase.co';
  const SB_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhd29nY3hzZWdhYW1lbnduanNtZyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzg5MTA1OTMzLCJleHAiOjIxMDQ2ODE5MzN9.rfHrkaTFsOMkhUiC66lY5z4FyLuwYFch-5ZNyywgnDA';

  function play(file){player.src=A+file;player.play().catch(()=>{});}
  function playOfficial(){play(LESSON.officialAudio);}
  function sfx(name){new Audio(A+name).play().catch(()=>{});}
  function done(i){if(state.stations[i])return;state.stations[i]=true;document.getElementById('st'+(i+1)).classList.add('done');if(state.stations.every(Boolean))setTimeout(showFinal,400);}
  function report(name,stars){
    fetch(SB_URL+'/rest/v1/review_records',{method:'POST',headers:{apikey:SB_KEY,Authorization:'Bearer '+SB_KEY,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({student_name:name,book:LESSON.book,unit:LESSON.unit,lesson:LESSON.lesson,stars,first_try:state.firstTry,quiz_total:state.quizTotal})})
      .then(r=>{document.getElementById('report-status').textContent=r.ok?'✅ أُرسل إلى معلمتك!':'⚠️ لم يُرسل، جرّبي لاحقًا';})
      .catch(()=>{document.getElementById('report-status').textContent='⚠️ لم يُرسل، جرّبي لاحقًا';});
  }

  document.getElementById('hd-lesson').textContent=`${LESSON.book} · ${LESSON.unit} · ${LESSON.lesson}`;
  document.getElementById('hero-title').textContent=LESSON.title;
  document.getElementById('hero-char').src=A+LESSON.heroChar;

  const practiced=new Set();
  LESSON.actions.forEach((a,i)=>{
    const card=document.createElement('button');
    card.className='word-card';
    card.innerHTML=`${visual(a)}<div class="wen en">${a.en}</div><div class="war">${a.ar}</div>`;
    card.onclick=()=>{play(a.audio);card.classList.add('played');practiced.add(i);if(practiced.size===LESSON.actions.length)document.getElementById('st1-done').disabled=false;};
    document.getElementById('word-row').appendChild(card);
  });
  document.getElementById('official-track').onclick=playOfficial;
  document.getElementById('st1-done').onclick=()=>{sfx('sfx_success.mp3');done(0);};

  let listenIndex=0;
  function renderListen(){
    const q=LESSON.matchQuiz[listenIndex],target=action(q.answer);
    let attempted=false;
    document.getElementById('st2-round').textContent=`السؤال ${listenIndex+1} / ${LESSON.matchQuiz.length}`;
    const prompt=document.getElementById('st2-prompt');
    prompt.textContent='🔊  استمع فقط · Listen only';
    prompt.onclick=()=>play(target.audio);
    const opts=document.getElementById('st2-opts');opts.innerHTML='';
    q.options.forEach(id=>{
      const a=action(id),b=document.createElement('button');
      b.className='opt action-option image-only';
      b.setAttribute('aria-label','picture option');
      b.innerHTML=visual(a);
      b.onclick=()=>{
        if(b.classList.contains('correct'))return;
        if(id===q.answer){
          b.classList.add('correct');if(!attempted)state.firstTry++;sfx('sfx_correct.mp3');
          setTimeout(()=>{listenIndex++;listenIndex<LESSON.matchQuiz.length?renderListen():done(1);},650);
        }else{
          attempted=true;b.classList.add('wrong');sfx('sfx_wrong.mp3');setTimeout(()=>b.classList.remove('wrong'),450);
        }
      };
      opts.appendChild(b);
    });
  }
  renderListen();

  let speakIndex=0,modelHeard=false;
  function renderSpeak(){
    const ids=LESSON.speakIds||LESSON.actions.slice(0,4).map(x=>x.id),a=action(ids[speakIndex]);
    modelHeard=false;
    document.getElementById('speak-round').textContent=`الجملة ${speakIndex+1} / ${ids.length}`;
    document.getElementById('speak-img').innerHTML=visual(a);
    document.getElementById('speak-img').setAttribute('aria-label',a.en);
    document.getElementById('speak-answer').textContent='Touch your …';
    document.getElementById('speak-next').disabled=true;
    document.getElementById('speak-next').textContent=speakIndex===ids.length-1?'تمّ ✔':'التالي';
    document.getElementById('speak-hint').onclick=()=>{document.getElementById('speak-answer').textContent=a.hint||'Touch your…';};
    document.getElementById('speak-check').onclick=()=>{play(a.speakAudio||a.audio);document.getElementById('speak-answer').textContent=a.speak||a.en;modelHeard=true;document.getElementById('speak-next').disabled=false;};
    document.getElementById('speak-next').onclick=()=>{if(!modelHeard)return;if(speakIndex===ids.length-1){sfx('sfx_success.mp3');done(2);document.getElementById('speak-next').disabled=true;}else{speakIndex++;renderSpeak();}};
  }
  renderSpeak();

  let examIndex=0;
  function renderExam(){
    const q=LESSON.examQuiz[examIndex],target=action(q.image);
    let attempted=false;
    document.getElementById('st4-round').textContent=`السؤال ${examIndex+1} / ${LESSON.examQuiz.length}`;
    const picture=document.getElementById('st4-picture');picture.innerHTML=visual(target);picture.setAttribute('aria-label',target.en);
    const opts=document.getElementById('st4-opts');opts.innerHTML='';
    q.options.forEach(id=>{
      const a=action(id),b=document.createElement('button');
      b.className='opt action-option text-only en';
      b.innerHTML=`<span class="en">${a.en}</span>`;
      b.onclick=()=>{
        if(b.classList.contains('correct'))return;
        if(id===q.answer){
          b.classList.add('correct');if(!attempted)state.firstTry++;sfx('sfx_correct.mp3');
          setTimeout(()=>{examIndex++;examIndex<LESSON.examQuiz.length?renderExam():done(3);},650);
        }else{
          attempted=true;b.classList.add('wrong');sfx('sfx_wrong.mp3');setTimeout(()=>b.classList.remove('wrong'),450);
        }
      };
      opts.appendChild(b);
    });
  }
  renderExam();

  const stationParam=new URLSearchParams(location.search).get('station');
  if(/^[1-4]$/.test(stationParam||''))setTimeout(()=>document.getElementById('st'+stationParam).scrollIntoView({block:'start'}),250);

  function showFinal(){
    const ratio=state.firstTry/state.quizTotal,stars=ratio>=.8?3:ratio>=.6?2:1;
    document.getElementById('stars').innerHTML=[1,2,3].map(i=>`<span class="${i<=stars?'':'dim'}">⭐</span>`).join('');
    document.getElementById('final-msg').textContent=stars===3?'مذهل! أنت قائد الجسم اليوم!':'أحسنت! راجع الحركات مرة أخرى.';
    document.getElementById('final-score').textContent=`الأسئلة الصحيحة من أول مرة: ${state.firstTry} / ${state.quizTotal}`;
    document.getElementById('final-card').classList.add('show');sfx('sfx_success.mp3');
    const saved=localStorage.getItem('khusoosi_name');
    if(saved)report(saved,stars);
    else{
      document.getElementById('name-row').style.display='flex';
      document.getElementById('name-btn').onclick=()=>{const v=document.getElementById('name-input').value.trim();if(!v)return;localStorage.setItem('khusoosi_name',v);document.getElementById('name-row').style.display='none';report(v,stars);};
    }
  }

  if(location.search.includes('selftest=1')){
    setTimeout(()=>{document.querySelectorAll('.word-card').forEach(x=>x.click());document.getElementById('st1-done').click();},500);
  }
})();
