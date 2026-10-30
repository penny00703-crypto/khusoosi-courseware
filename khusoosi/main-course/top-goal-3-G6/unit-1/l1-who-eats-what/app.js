const A = 'assets/';
const player = document.getElementById('player');
const slide = document.getElementById('slide');
const events = [];
let current = 0;
let arabic = false;
let selectedMatch = null;
let builder = [];
let supportBranch = '';
let revealedLines = 1;
let swapped = false;
let watchTimers = [];
let practice = { round1: false, round2: false, hidden: false };
const state = { independent1: '', retest: '', challengeActive: false, challengePassive: false, exit: [] };
window.lessonEvents = events;

const img = (file, cls = 'lesson-image') => `<img class="${cls}" src="${A}${file}" alt="Animal lesson visual">`;
const obj = (text) => `<div class="objective">Objective · ${text}</div>`;
const tr = (en, ar) => `<div>${en}<div class="ar">${ar}</div></div>`;
const listen = (file, label = 'Listen') => `<button class="listen-button" data-audio="${file}"><span class="speaker"></span>${label}</button>`;
const source = (extra = '') => `<div class="source">Top Goal 3 · U1L1 · SB10–12 / WB124–126${extra ? ' · ' + extra : ''}</div>`;
const evidence = (id, label = 'Record response') => `<div class="button-row"><button class="small-button evidence-button" data-evidence="${id}" data-value="independent">Independent</button><button class="small-button evidence-button" data-evidence="${id}" data-value="supported">Needs help</button><span id="${id}Status" class="muted">${label}</span></div>`;
const frame = (objective, title, body, extraSource = '') => `<div class="slide-inner">${obj(objective)}<div class="title-row"><h1>${title}</h1></div>${body}${source(extraSource)}</div>`;
const log = (name, detail = {}) => { events.push({ name, detail, slide: current + 1, at: new Date().toISOString() }); console.log('Lesson event', name, detail); };
const shuffle = (items) => [...items].sort(() => Math.random() - .5);

const slides = [
  { title: 'Before class', render: () => `<div class="slide-inner arabic-only">${obj('check equipment')}<h1>قبل أن نبدأ الدرس</h1><p class="subtitle">جهّز نفسك للتعلم والمشاركة.</p><div class="content center"><div class="column"><ul class="checklist prep-checklist"><li><img class="prep-icon" src="${A}icon_devices.png" alt="">افتح الميكروفون والكاميرا.</li><li><img class="prep-icon" src="${A}icon_wifi.png" alt="">تأكد من أن الإنترنت يعمل جيدًا.</li><li><img class="prep-icon" src="${A}icon_quiet.png" alt="">اجلس في مكان هادئ ومريح.</li><li><img class="prep-icon" src="${A}icon_notebook.png" alt="">جهّز القلم والدفتر.</li></ul><div class="button-row"><button class="listen-button" data-audio="a_t_sound_check.mp3"><span class="speaker"></span>اضغط للاستماع وتجربة الصوت</button><span id="soundStatus">استمع إلى الجملة بوضوح.</span></div></div></div></div>` },
  { title: 'Free talk', render: () => frame('build rapport', 'Free talk', `<div class="free-talk-scene"><div class="image-card free-talk-visual">${img('sec_00_online_hello_v2.jpg','')}</div><div class="free-talk-panel"><div class="card coral free-talk-hello"><div class="big-sentence">Hello! Let’s get to know each other.</div></div><div class="card free-talk-question"><div class="sentence">What’s your name?</div><div class="ar">ما اسمك؟</div></div><div class="card free-talk-question"><div class="sentence">Which animal do you like?</div><div class="ar">أي حيوان تحب؟</div></div><button class="primary-button free-talk-action" data-action="rapport">I answered</button></div></div>`) },
  { title: 'One fact, two ways', render: () => frame('notice the target sentence', 'One fact. Two ways to say it.', `<div class="content center"><div class="column">${img('sec_07_sharks_fish.jpg')}</div><div class="column"><div class="card"><div class="sentence">Sharks eat fish.</div><div class="ar">تأكل أسماك القرش الأسماك.</div>${listen('a_t_sharks_eat_fish.mp3')}</div><div id="hookTarget" class="card soft"><div class="sentence muted">Your new sentence appears here.</div></div><button class="primary-button" data-action="revealHook">Change the starting point</button><p class="subtitle">Today: start with the animal or thing that receives the action.</p></div></div>`) },
  { title: 'Who eats what?', render: () => frame('activate known language', 'Point and say: Who eats what?', `<div class="fact-explore">${[['sec_05_beetles_insects.jpg','Beetles','insects'],['sec_07_sharks_fish.jpg','Sharks','fish'],['sec_06_frogs_butterflies.jpg','Frogs','butterflies']].map(([f,animal,food],i)=>`<div class="fact-row"><img src="${A}${f}" alt="${animal} and ${food}"><div class="fact-copy"><span class="fact-kicker">0${i+1} · ANIMAL FACT</span><strong>${animal} <span>+</span> ${food}</strong></div><span class="fact-arrow">→</span></div>`).join('')}</div><div class="button-row"><button class="secondary-button" data-action="showFacts">Check after our answers</button><span id="factDirection" class="sentence teal-text"></span></div>`) },
  ...[
    ['insect','/ˈɪnsekt/','حشرة','An ant is an insect.','sec_01_insect.jpg','a_t_insect.mp3','نملة حشرة.'],
    ['beetle','/ˈbiːtəl/','خنفساء','The beetle is small.','sec_02_beetle.jpg','a_t_beetle.mp3','الخنفساء صغيرة.'],
    ['butterfly','/ˈbʌtərflaɪ/','فراشة','A butterfly can fly.','sec_03_butterfly.jpg','a_t_butterfly.mp3','يمكن للفراشة أن تطير.'],
    ['tortoise','/ˈtɔːrtəs/','سلحفاة','The tortoise is slow.','sec_04_tortoise.jpg','a_t_tortoise.mp3','السلحفاة بطيئة.']
  ].map(([word,phonetic,meaning,example,file,audio,ar]) => ({ title: word, render: () => frame('understand and say ' + word, word, `<div class="vocab-layout"><div class="image-card vocab-visual">${img(file,'')}</div><div class="vocab-panel"><div><div class="word">${word}</div><div class="phonetic">${phonetic}</div></div><div class="meaning">${meaning}</div><div class="vocab-example"><span>IN A SENTENCE</span><div class="sentence">${example}</div><div class="ar">${ar}</div></div><div class="button-row">${listen(audio,'Listen and repeat')}</div></div></div>`) })),
  { title: 'Picture match', render: () => {
    const cards = [
      ...['insect','beetle','butterfly','tortoise'].map((key,i)=>({key,type:'picture',html:`<img src="${A}${['sec_01_insect.jpg','sec_02_beetle.jpg','sec_03_butterfly.jpg','sec_04_tortoise.jpg'][i]}" alt="${key}">`})),
      ...['insect','beetle','butterfly','tortoise'].map(key=>({key,type:'word',html:`<div class="match-word">${key}</div>`}))
    ];
    return frame('match words and meanings', 'Match the picture and the word.', `<div class="match-grid">${shuffle(cards).map(c=>`<button class="card match-card ${c.type}" data-match="${c.key}" data-type="${c.type}">${c.html}</button>`).join('')}</div><div class="button-row"><button class="secondary-button" data-action="resetSlide">Reset</button><span class="muted">Choose one picture and one word.</span></div>`);
  } },
  { title: 'Same fact, new start', render: () => frame('understand doer and receiver', 'Same fact. New starting point.', `<div class="content center"><div class="column">${img('sec_05_beetles_insects.jpg')}<p class="subtitle">The animals do not move. The fact does not change.</p></div><div class="column"><div class="card"><div class="sentence">Beetles <span class="highlight">eat</span> insects.</div><div class="labels"><span>doer</span><span>action</span><span>receiver</span></div></div><div class="model-arrow">↓</div><div id="meaningTarget" class="card soft" hidden><div class="sentence"><span class="teal-text">Insects</span> are eaten <span class="highlight">by beetles</span>.</div><div class="labels"><span>receiver</span><span>action</span><span>doer</span></div><div class="ar">تتغذى الخنافس على الحشرات.</div></div><button class="primary-button" data-action="modelHeard">Change the starting point</button></div></div>`) },
  { title: 'Build the sentence', render: () => frame('build and say the target', 'Build it. Then say it.', `<div class="content"><div class="column">${img('sec_07_sharks_fish.jpg')}<div class="card"><div class="sentence">Sharks eat fish.</div></div></div><div class="column"><div id="sentenceSlot" class="sentence-slot sentence">Your sentence appears here.</div><div id="wordChips" class="button-row">${['are','Fish','by','eaten','sharks','.'].map(w=>`<button class="word-chip" data-word="${w}">${w}</button>`).join('')}</div><div class="button-row"><button class="secondary-button" data-action="resetBuilder">Reset</button><button class="primary-button" data-action="studentBuilt">Student said it</button></div></div></div>`) },
  { title: 'Choose, complete, say', render: () => frame('practise with less support', 'Choose. Complete. Then say.', `<div class="practice-grid"><div class="card practice-card">${img('sec_06_frogs_butterflies.jpg')}<h3>Round 1 · Choose</h3><button class="choice" data-choice="correct">Butterflies are eaten by frogs.</button><button class="choice" data-choice="wrong">Frogs are eaten by butterflies.</button></div><div class="card practice-card">${img('sec_10_tortoises_plants.jpg')}<h3>Round 2 · Complete</h3><div class="sentence">Plants <span id="blank" class="highlight">___ ___</span> by tortoises.</div><div class="button-row"><button class="word-chip" data-complete="are eaten">are eaten</button><button class="word-chip" data-complete="eat">eat</button></div><button class="primary-button" data-action="sayBoth">Hide the answers and say both</button></div></div>`) },
  { title: 'Independent try', render: () => frame('say one sentence without a model', 'Your turn. No model.', `<div class="content center"><div class="column">${img('sec_08_birds_insects.jpg')}</div><div class="column"><div class="card coral"><h2>Start with <span class="highlight">Insects</span>.</h2><p class="sentence">Say one complete sentence.</p><div class="ar">ابدأ بكلمة Insects وقل جملة كاملة.</div></div>${evidence('independent1')}<button class="secondary-button" data-action="checkIndependent">Check after the response</button><div id="independentAnswer" class="card" hidden><div class="sentence">Insects are eaten by birds.</div>${listen('a_t_insects_are_eaten_by_birds.mp3')}</div></div></div>`) },
  { title: 'Fix one thing', render: () => frame('correct the actual difficulty', 'What do you need to fix?', `<div class="fix-layout"><div class="image-card fix-visual">${img('sec_08_birds_insects.jpg','')}</div><div class="fix-work"><div class="fix-step">1 · CHOOSE THE HELP YOU NEED</div><div id="supportPanel" class="card fix-card"><p class="subtitle">Try first. Then choose one kind of help.</p><div class="support-choices"><button class="choice" data-support="roles">Who eats what?</button><button class="choice" data-support="be">Build the sentence</button><button class="choice" data-support="form">eat or eaten?</button></div></div><button class="primary-button" data-action="hideSupport">2 · Hide the help and try again</button><span id="retryStatus" class="muted">The model stays hidden until you ask for help.</span></div></div>`) },
  { title: 'Parallel retest', render: () => frame('transfer to a new fact', 'New fact. No sentence blocks.', `<div class="content center"><div class="column">${img('sec_09_cats_mice.jpg')}</div><div class="column"><div class="card gold"><h2>Start with <span class="highlight">Mice</span>.</h2><p class="sentence">Your turn.</p></div>${evidence('retest')}<button class="secondary-button" data-action="checkRetest">Check after the response</button><div id="retestAnswer" class="card" hidden><div class="sentence">Mice are eaten by cats.</div>${listen('a_t_mice_are_eaten_by_cats.mp3')}</div></div></div>`) },
  { title: 'Animal fact reporters', render: () => frame('use the target in a dialogue', 'Animal fact reporters', `<div class="roleplay-layout"><div class="roleplay-visuals"><img src="${A}sec_07_sharks_fish.jpg" alt="Sharks and fish"><img src="${A}sec_05_beetles_insects.jpg" alt="Beetle and insects"></div><div class="dialogue-panel"><div class="card roleplay-line visible"><div class="avatar-label">Reporter</div><div class="sentence">What happens to the fish?</div></div><div class="card roleplay-line observer"><div class="avatar-label">Observer</div><div class="sentence observer-answer">Fish are eaten by sharks.</div></div><div class="card roleplay-line"><div class="avatar-label">Reporter</div><div class="sentence">What eats the insects?</div></div><div class="card roleplay-line observer"><div class="avatar-label">Observer</div><div class="sentence observer-answer">Beetles eat insects.</div></div><div class="button-row"><button class="secondary-button" data-action="revealLine">Reveal next line</button><button class="primary-button" data-action="swapRoles">Swap roles</button></div></div></div>`) },
  { title: 'Watch and check', render: () => frame('understand a new visual', 'Watch. What happens?', `<div class="content center"><div class="column"><div id="watchSequence" class="watch-sequence"><div class="watch-frame active" data-frame="0"><img src="${A}sec_06_frogs_butterflies.jpg" alt="A frog watches a butterfly"><span>1 · Look</span></div><div class="watch-frame" data-frame="1"><img src="${A}sec_06_frogs_butterflies.jpg" alt="The frog moves toward the butterfly"><span>2 · Watch</span><b class="watch-direction">→</b></div><div class="watch-frame" data-frame="2"><img src="${A}sec_06_frogs_butterflies.jpg" alt="The frog and butterfly at the end"><span>3 · Check</span></div></div></div><div class="column"><button class="primary-button" data-action="watchVisual">Play the 3-frame visual</button><div id="watchCaption" class="card" hidden><div class="sentence">A frog eats a butterfly.</div><div class="ar">يأكل ضفدع فراشة.</div></div><div class="card coral"><h2>Start with <span class="highlight">A butterfly</span>.</h2></div><button class="secondary-button" data-action="checkWatch">Check after the response</button><div id="watchAnswer" class="card" hidden><div class="sentence">A butterfly is eaten by a frog.</div>${listen('a_t_butterfly_is_eaten_by_frog.mp3')}</div></div></div>`, 'Self-created three-frame visual') },
  { title: 'Mini Challenge', render: () => frame('use both forms independently', 'You are the animal expert.', `<div class="challenge-layout"><img class="challenge-visual" src="${A}sec_10_tortoises_plants.jpg" alt="Tortoise and plants"><div class="challenge-panel"><div id="challengeTask" class="card gold"><h2>No model. Two tasks.</h2><p class="sentence">1. Say the fact.</p><p class="sentence">2. Start with <span class="highlight">Plants</span> and say it in a new way.</p></div><div class="challenge-evidence"><button class="small-button evidence-button" data-challenge="active">Fact: independent</button><button class="small-button evidence-button" data-challenge="passive">New form: independent</button></div><button class="secondary-button" data-action="checkChallenge">Check after both responses</button><div id="challengeAnswer" class="card" hidden><div class="sentence">Tortoises eat plants.<br>Plants are eaten by tortoises.</div>${listen('a_t_tortoises_plants.mp3')}</div></div></div>`) },
  { title: 'School format', render: () => frame('use the same skill in writing', 'Same skill. New items.', `<div class="content"><div class="column card"><h3>1 · Put the words in order</h3><div id="schoolSlot" class="sentence-slot sentence">Your answer</div><div class="button-row">${['are','Insects','by','eaten','birds','.'].map(w=>`<button class="word-chip school-word" data-word="${w}">${w}</button>`).join('')}</div><button class="secondary-button" data-action="resetSchool">Reset</button></div><div class="column card"><h3>2 · Look and write</h3><img class="lesson-image" style="height:190px" src="${A}sec_07_sharks_fish.jpg" alt="Sharks and fish"><input id="schoolInput" class="text-input" placeholder="Write the sentence." autocomplete="off"><button class="primary-button" data-action="checkWriting">Check my sentence</button><div id="writingFeedback" class="subtitle"></div></div></div>`, 'WB126 same skill · New items') },
  { title: 'Exit Quiz', render: () => frame('show what you can do', 'One last new fact.', `<div class="content center"><div class="column">${img('sec_20_frogs_insects.png')}</div><div class="column"><div class="card coral"><h2>Start with <span class="highlight">Insects</span>.</h2><p class="sentence">Say one complete sentence.</p></div><div class="criteria"><button class="small-button" data-criterion="roles">Correct roles</button><button class="small-button" data-criterion="form">are eaten</button><button class="small-button" data-criterion="complete">Complete sentence</button></div><button class="secondary-button" data-action="checkExit">Check after the response</button><div id="exitAnswer" class="card" hidden><div class="sentence">Insects are eaten by frogs.</div>${listen('a_t_insects_are_eaten_by_frogs.mp3')}</div></div></div>`) },
  { title: 'Review', render: () => frame('recognise your progress', 'Today I learned…', `<div class="summary-layout"><ul class="checklist"><li><span class="checkmark">✓</span>I can name 4 living things: insect, beetle, butterfly, tortoise.</li><li><span class="checkmark">✓</span>I can say who eats what: Sharks eat fish.</li><li><span class="checkmark">✓</span>I can change the starting point: Fish are eaten by sharks.</li><li><span class="checkmark">✓</span>I can say and write a new fact without a full model.</li></ul><button class="primary-button" data-action="reviewComplete">I reviewed today’s lesson</button></div>`) },
  { title: 'Next lesson', render: () => frame('preview the next learning goal', 'Next: Are they found here?', `<div class="next-lesson"><div class="card gold next-model"><h2>A new place. A new question.</h2><p class="big-sentence">Are these animals found here?</p><div class="button-row"><span class="pill">Yes, they are.</span><span class="pill">No, they aren’t.</span></div><div class="ar">في الدرس القادم: نسأل عن الحيوانات وأماكن وجودها ونجيب.</div></div><div class="next-steps"><div class="card"><span class="step-number">1</span><h2>Ask about animals in a new place.</h2></div><div class="card"><span class="step-number">2</span><h2>Use a passive question.</h2></div><div class="card"><span class="step-number">3</span><h2>Give a short answer.</h2></div></div></div>`) },
  { title: 'After-class review', render: () => frame('review after class', 'After-class review', `<div class="review-layout"><div class="review-tasks"><div class="card review-task"><span class="step-number">1</span><div><h2>Picture words.</h2><p class="review-example">Images · phonetics · Arabic · audio</p></div></div><div class="card review-task"><span class="step-number">2</span><div><h2>Pure listening.</h2><p class="review-example">Hear a word · choose a picture</p></div></div><div class="card review-task"><span class="step-number">3</span><div><h2>Independent speaking.</h2><p class="review-example">Try · model if needed · hide · retry</p></div></div><div class="card review-task"><span class="step-number">4</span><div><h2>Reading and grammar.</h2><p class="review-example">Read without audio · first-try score</p></div></div></div><div class="card review-link-card"><span class="review-link-label">4-STATION REVIEW</span><h2>Open your review.</h2><p class="subtitle">Listen, say, and read.</p><img class="review-qr" src="assets/qr_after_class_review.png" alt="QR code for after-class review"><span class="review-qr-label">Scan to review</span><a class="primary-button" href="review.html" target="_blank" rel="noopener">Open review →</a><p class="review-ar">افتح صفحة المراجعة وأكمل المحطات الأربع.</p></div></div>`) }
];

function scaleStage() {
  const scale = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
  document.getElementById('stage').style.transform = `scale(${scale})`;
}
function stopAudio() { player.pause(); player.currentTime = 0; document.querySelectorAll('[data-audio].playing').forEach(b=>b.classList.remove('playing')); }
let toastTimer;
function toast(message) { const el = document.getElementById('toast'); el.textContent = message; el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(()=>el.classList.remove('show'), 2200); }
function playAudio(button) {
  const file = button.dataset.audio;
  if (button.classList.contains('playing')) { stopAudio(); return; }
  stopAudio();
  player.src = A + file;
  button.classList.add('playing');
  player.play().then(()=>toast('Listen and repeat.')).catch(()=>toast('Audio could not play. Please try again.'));
  log('audio_played', { file });
}
player.addEventListener('ended', ()=>document.querySelectorAll('[data-audio].playing').forEach(b=>b.classList.remove('playing')));
function render() {
  stopAudio();
  watchTimers.forEach(clearTimeout); watchTimers = [];
  slide.className = 'slide' + (arabic ? ' arabic-on' : '');
  slide.innerHTML = slides[current].render();
  document.getElementById('pageLabel').textContent = `${current + 1} / ${slides.length}`;
  document.getElementById('progressBar').style.width = `${(current + 1) / slides.length * 100}%`;
  document.getElementById('prevButton').disabled = current === 0;
  document.getElementById('nextButton').disabled = current === slides.length - 1;
  document.querySelectorAll('.thumb').forEach((t,i)=>t.classList.toggle('active',i===current));
  builder = []; selectedMatch = null; supportBranch = ''; revealedLines = 1; swapped = false; practice = { round1: false, round2: false, hidden: false };
}
function go(index) { if(index<0||index>=slides.length)return; current=index; render(); }
function resetEvidence(id, value) {
  state[id] = value;
  const status = document.getElementById(id + 'Status');
  if(status){status.textContent=value==='independent'?'Recorded: independent':'Recorded: support needed';status.className=value==='independent'?'evidence':'evidence supported';}
  log(id + '_result', { value });
}

slide.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.audio) {
    playAudio(button);
    if (button.dataset.audio === 'a_t_sound_check.mp3') { const s=document.getElementById('soundStatus'); if(s)s.textContent='تم تشغيل الصوت. هل تسمع بوضوح؟'; log('sound_check_complete'); }
    return;
  }
  if (button.dataset.match) {
    if (!selectedMatch) { selectedMatch=button; button.classList.add('selected'); return; }
    if (selectedMatch===button) { button.classList.remove('selected'); selectedMatch=null; return; }
    if (selectedMatch.dataset.match===button.dataset.match && selectedMatch.dataset.type!==button.dataset.type) {
      selectedMatch.classList.add('matched'); button.classList.add('matched'); selectedMatch.classList.remove('selected'); selectedMatch=null; toast('Great match!');
      if(document.querySelectorAll('.match-card.matched').length===8)log('vocabulary_match_complete');
    } else { selectedMatch.classList.remove('selected'); selectedMatch=null; toast('Try again. Look at the picture.'); }
    return;
  }
  if (button.classList.contains('word-chip') && button.dataset.word && !button.classList.contains('school-word')) {
    if(button.classList.contains('used'))return;
    builder.push(button.dataset.word); button.classList.add('used');
    const slot=document.getElementById('sentenceSlot'); if(slot)slot.textContent=builder.join(' ').replace(' .','.');
    if(builder.length===6){if(builder.join(' ')==='Fish are eaten by sharks .'){stopAudio();player.src=A+'a_t_fish_are_eaten_by_sharks.mp3';player.play().catch(()=>{});toast('Correct. Listen, then say it.');}else toast('Check the starting point and word order.');}
    return;
  }
  if (button.classList.contains('school-word')) {
    if(button.classList.contains('used'))return;
    button.classList.add('used');
    const slot=document.getElementById('schoolSlot'); slot.dataset.answer=((slot.dataset.answer||'')+' '+button.dataset.word).trim(); slot.textContent=slot.dataset.answer.replace(' .','.');
    if(slot.dataset.answer==='Insects are eaten by birds .')toast('Correct word order.');
    return;
  }
  if (button.dataset.choice) { const ok=button.dataset.choice==='correct';button.classList.add(ok?'correct':'wrong');if(ok)practice.round1=true;toast(ok?'Correct. Say it aloud.':'Who eats what? Check the roles.'); return; }
  if (button.dataset.complete) { if(button.dataset.complete==='are eaten'){practice.round2=true;document.getElementById('blank').textContent='are eaten';toast('Complete. Finish both rounds, then hide the answers.');}else toast('Start with Plants. Use are eaten.'); return; }
  if (button.dataset.fix) { const ok=button.dataset.fix==='are';document.getElementById('fixBlank').textContent=ok?'are':'___';document.getElementById('fixFeedback').textContent=ok?'Correct: Fish are eaten by sharks. Now say it.':'Try again. Fish is plural, so use are.';document.getElementById('fixFeedback').className='fix-feedback '+(ok?'correct':'wrong');if(ok)log('sentence_corrected',{answer:'are'});return; }
  if (button.dataset.evidence) { resetEvidence(button.dataset.evidence,button.dataset.value); return; }
  if (button.dataset.challenge) { const key=button.dataset.challenge==='active'?'challengeActive':'challengePassive';state[key]=true;button.classList.add('selected');toast('Independent evidence recorded.');log('mini_challenge_result',state);return; }
  if (button.dataset.criterion) { button.classList.toggle('selected'); const c=button.dataset.criterion;state.exit=state.exit.includes(c)?state.exit.filter(x=>x!==c):[...state.exit,c];log('exit_quiz_result',{criteria:state.exit});return; }
  if (button.dataset.support) {
    supportBranch=button.dataset.support;
    const content={roles:'<div><h2>Who does the eating? Who receives it?</h2><p class="sentence">Birds eat insects. → Insects are eaten by birds.</p><div class="ar">من يقوم بالأكل؟ ومن يقع عليه الفعل؟</div></div>',be:'<div><h2>Use the sentence frame.</h2><p class="big-sentence">Insects + <span class="highlight">are</span> + eaten + by birds.</p></div>',form:'<div><h2>Compare the verb form.</h2><p class="sentence">Birds <span class="highlight">eat</span> insects.<br>Insects are <span class="highlight">eaten</span> by birds.</p></div>'};
    document.getElementById('supportPanel').innerHTML=content[supportBranch];document.getElementById('retryStatus').textContent='Help is shown. Hide it before retrying.';log('support_branch_used',{branch:supportBranch});return;
  }
  const action=button.dataset.action;
  if(!action)return;
  const actions={
    rapport:()=>{toast('Nice to meet you!');log('icebreaker_response');},
    revealHook:()=>{const target=document.getElementById('hookTarget');target.className='card coral';target.innerHTML=`<div class="sentence">Fish are eaten by sharks.</div><div class="ar">تتغذى أسماك القرش على الأسماك.</div>${listen('a_t_fish_are_eaten_by_sharks.mp3')}`;button.disabled=true;log('hook_revealed');},
    showFacts:()=>{const answers=['Beetles eat insects.','Sharks eat fish.','Frogs eat butterflies.'];document.querySelectorAll('.fact-copy strong').forEach((el,i)=>el.textContent=answers[i]);document.getElementById('factDirection').textContent='Doer → action → receiver';button.disabled=true;log('baseline_active_sentence');},
    resetSlide:()=>render(),
    modelHeard:()=>{document.getElementById('meaningTarget').hidden=false;button.disabled=true;toast('The fact stays the same.');log('meaning_model_revealed');},
    resetBuilder:()=>{builder=[];stopAudio();document.querySelectorAll('.word-chip').forEach(b=>b.classList.remove('used'));document.getElementById('sentenceSlot').textContent='Your sentence appears here.';},
    studentBuilt:()=>{if(builder.join(' ')!=='Fish are eaten by sharks .'){toast('Build the correct sentence first.');return;}toast('Speaking evidence recorded.');log('sentence_built_and_spoken');},
    sayBoth:()=>{if(!practice.round1||!practice.round2){toast('Complete both rounds first.');return;}if(!practice.hidden){practice.hidden=true;document.querySelectorAll('.practice-card .choice').forEach(b=>{b.style.visibility='hidden';b.disabled=true;});document.getElementById('blank').textContent='___ ___';document.querySelectorAll('.practice-card .word-chip').forEach(b=>{b.style.visibility='hidden';b.disabled=true;});button.textContent='We said both without pointing';toast('Answers hidden. Say both sentences.');return;}toast('Controlled practice complete.');log('controlled_practice_complete');},
    checkIndependent:()=>{document.getElementById('independentAnswer').hidden=false;},
    hideSupport:()=>{document.getElementById('supportPanel').innerHTML='<div class="fix-hidden"><h2>Your turn. No model.</h2><p class="sentence">Look at the picture and say the sentence again.</p></div>';document.getElementById('retryStatus').textContent='Help is hidden. Start with Insects.';log('support_hidden_for_retry',{branch:supportBranch});},
    checkRetest:()=>{document.getElementById('retestAnswer').hidden=false;},
    revealLine:()=>{const lines=[...document.querySelectorAll('.roleplay-line')];if(revealedLines<lines.length){lines[revealedLines].classList.add('visible');revealedLines++;}else toast('All lines revealed.');},
    swapRoles:()=>{swapped=!swapped;document.querySelectorAll('.roleplay-line').forEach(l=>l.classList.add('visible'));document.querySelectorAll('.observer-answer').forEach(a=>a.style.visibility=swapped?'hidden':'visible');button.textContent=swapped?'Show answers':'Swap roles';if(swapped)log('roleplay_swap_complete');},
    watchVisual:()=>{watchTimers.forEach(clearTimeout);watchTimers=[];button.disabled=true;const frames=[...document.querySelectorAll('.watch-frame')];frames.forEach((f,i)=>f.classList.toggle('active',i===0));document.getElementById('watchCaption').hidden=true;[1,2].forEach(i=>watchTimers.push(setTimeout(()=>frames.forEach((f,j)=>f.classList.toggle('active',j===i)),i*1400)));watchTimers.push(setTimeout(()=>{document.getElementById('watchCaption').hidden=false;button.disabled=false;toast('Now say the fact.');log('watch_check_complete');},4200));},
    checkWatch:()=>{document.getElementById('watchAnswer').hidden=false;},
    checkChallenge:()=>{document.getElementById('challengeTask').hidden=true;document.getElementById('challengeAnswer').hidden=false;},
    resetSchool:()=>{const slot=document.getElementById('schoolSlot');slot.dataset.answer='';slot.textContent='Your answer';document.querySelectorAll('.school-word').forEach(b=>b.classList.remove('used'));},
    checkWriting:()=>{const value=document.getElementById('schoolInput').value.trim().toLowerCase().replace(/\s+/g,' ');const ok=value==='fish are eaten by sharks.'||value==='fish are eaten by sharks';document.getElementById('writingFeedback').textContent=ok?'Correct: roles, are eaten, complete sentence.':'Check: Fish + are eaten + by sharks.';log('school_format_complete',{writing:ok?'correct':'retry'});},
    checkExit:()=>{document.getElementById('exitAnswer').hidden=false;},
    reviewComplete:()=>{toast('Review complete.');log('lesson_review_view');},
    saveFeedback:()=>{const s=document.getElementById('feedbackPerformance');if(s)s.value='شارك وأجاب باستقلالية';toast('Saved on this device.');log('teacher_feedback_complete');}
  };
  if(actions[action])actions[action]();
});

document.getElementById('prevButton').addEventListener('click',()=>go(current-1));
document.getElementById('nextButton').addEventListener('click',()=>go(current+1));
document.getElementById('arabicToggle').addEventListener('click',()=>{arabic=!arabic;slide.classList.toggle('arabic-on',arabic);document.getElementById('arabicToggle').setAttribute('aria-pressed',String(arabic));toast(arabic?'Arabic support on':'Arabic support off');});
document.getElementById('fullscreenButton').addEventListener('click',()=>{if(!document.fullscreenElement)document.documentElement.requestFullscreen?.();else document.exitFullscreen?.();});
const dialog=document.getElementById('thumbnailDialog');
document.getElementById('gridButton').addEventListener('click',()=>dialog.showModal());
document.getElementById('closeDialog').addEventListener('click',()=>dialog.close());
const grid=document.getElementById('thumbnailGrid');
slides.forEach((s,i)=>{const b=document.createElement('button');b.className='thumb';b.innerHTML=`${i+1}. ${s.title}<span>${i===0?'Before class':i>21?'After class':'Lesson'}</span>`;b.addEventListener('click',()=>{dialog.close();go(i);});grid.appendChild(b);});
document.addEventListener('keydown',(e)=>{if(dialog.open)return;if(e.key==='ArrowRight')go(current+1);if(e.key==='ArrowLeft')go(current-1);if(e.key==='Escape')stopAudio();});
window.addEventListener('resize',scaleStage);
const requestedPage = Number(new URLSearchParams(window.location.search).get('page'));
if (requestedPage >= 1 && requestedPage <= slides.length) current = requestedPage - 1;
scaleStage();
render();
