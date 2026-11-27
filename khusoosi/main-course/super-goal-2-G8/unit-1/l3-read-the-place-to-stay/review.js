const r=LESSON.review;
const questions=[...r.listen,...r.read];
const key='ruwaud:g8:u1:l'+LESSON.n+':review:'+(location.hostname.endsWith('.github.io')?'online':'preview')+':'+(new URLSearchParams(location.search).has('qa')?'qa':'normal');
let first={},done={},self={},voice=null,active=null;
try{({first={},done={},self={}}=JSON.parse(localStorage.getItem(key)||'{}'));}catch{}
const save=()=>{try{localStorage.setItem(key,JSON.stringify({first,done,self}));}catch{}};
const ar=t=>`<p class="ar" lang="ar" dir="rtl">${t}</p>`;
const audio=(id,t)=>`<button data-play="${id}" aria-label="${t}">▶ استمع</button>`;
const maps={'map-across':['☕','—','🛗','🛎','—','—'],'map-near':['☕','🛎','🛗','—','—','—'],'map-between':['☕','📚','🛗','🛎','—','—']};
function option(x){
 return maps[x]?`<span class="mini-map">${maps[x].map(i=>`<span>${i}</span>`).join('')}</span>`:x;
}
function item(q,i,listen){
 return `<article class="review-item" data-item="${i}"><h3>${i+1}. ${listen?'استمع واختر الصورة أو البطاقة':q.prompt}</h3>${listen?audio(q.id,'Play listening question'):' '}<div class="review-options ${listen?'visual-options':''}">${q.options.map((x,j)=>`<button data-q="${i}" data-a="${j}" ${done[i]?'disabled':''} class="${done[i]&&j===q.key?'right':''}">${option(x)}</button>`).join('')}</div><p role="status" class="feedback">${done[i]?'صحيح ✓':''}</p></article>`;
}
const model=t=>`<details><summary>عرض نموذج بعد المحاولة</summary><p>${t}</p></details>`;
const tick=(id,t)=>`<label class="check"><input type="checkbox" data-self="${id}" ${self[id]?'checked':''}> ${t}</label>`;
function render(){
 document.querySelector('#review').innerHTML=`<div class="review-head"><img src="../assets/logo-ruwaud.png" alt="Ruwaud رواد"><div><p>SUPER GOAL 2 / UNIT 1</p><h1>${LESSON.title}</h1></div></div>${ar('أنهِ الأقسام الأربعة. تحتاج إلى ورقة وقلم.')}${'<p id="progress" role="status"></p>'}
 <section><h2 lang="ar" dir="rtl">١ · استمع واقرأ</h2><figure class="review-photo"><img src="../assets/${LESSON.n===4?'hostel':'sb-6-0'}.jpg" alt="Student Book scene"></figure>${r.resources.map(id=>`<div class="resource"><span>${SOUNDS[id]}</span>${audio(id,'Play example')}</div>`).join('')}${ar(['','', 'راجع الفرق بين رقم الغرفة، الطابق، وعدد الليالي.','راجع حوار الاستقبال وكيفية وصف موقع المكان.','راجع مفردات النُّزل والغرفة المشتركة والمطبخ والمغسلة.','راجع السؤال المهذّب وتاريخ الوصول ومدة الإقامة وعدد الضيوف.'][LESSON.n])}</section>
 <section><h2 lang="ar" dir="rtl">٢ · استمع واختر</h2>${r.listen.map((q,i)=>item(q,i,true)).join('')}</section>
 <section><h2 lang="ar" dir="rtl">٣ · تكلّم</h2>${r.oral.map(([q,a],i)=>`<article class="review-item"><h3>${q}</h3>${ar('حاول بصوت مسموع، ثم افتح النموذج عند الحاجة. أغلقه وحاول من جديد.')}${model(a)}${tick('o'+i,'حاولت التحدث')}</article>`).join('')}</section>
 <section><h2 lang="ar" dir="rtl">٤ · اقرأ واكتب</h2>${r.read.map((q,i)=>item(q,i+r.listen.length,false)).join('')}<article class="review-item"><h3>${r.write[0]}</h3>${ar('اكتب على الورقة، ثم قارن بالنموذج وعدّل إجابتك.')}${model(r.write[1])}${tick('w','كتبت وراجعت')}</article></section>
 <section><h2 lang="ar" dir="rtl">نتيجة التدريب</h2><p id="score"></p>${ar('الدرجة لأسئلة الاستماع والقراءة فقط. تُحفظ هذه المحاولة على هذا الجهاز.')}${'<button id="reset">محاولة جديدة</button>'}</section><p id="audio-feedback" role="status"></p>`;
 progress();
}
function progress(){
 document.querySelector('#progress').textContent=`الأسئلة ${Object.values(done).filter(Boolean).length}/${questions.length} · التحدث والكتابة ${Object.values(self).filter(Boolean).length}/3`;
 document.querySelector('#score').textContent=`الإجابات الصحيحة من أول محاولة: ${Object.values(first).filter(Boolean).length} / ${questions.length}`;
}
function stop(){
 if(voice) voice.pause();
 if(active)active.classList.remove('playing');
 voice=null;active=null;
}
document.addEventListener('click',e=>{
 const b=e.target.closest('button');
 if(!b||b.disabled)return;
 if(b.dataset.play){
  if(active===b){stop();return;}
  stop();document.querySelector('#audio-feedback').textContent='';
  const clip=new Audio('../assets/audio/'+b.dataset.play+'.mp3');
  voice=clip;active=b;b.classList.add('playing');
  clip.onended=()=>{if(voice===clip)stop();};
  clip.play().catch(()=>{if(voice===clip){stop();document.querySelector('#audio-feedback').textContent='تعذّر تشغيل الصوت. حاول مرة أخرى.';}});
  return;
 }
 if(b.dataset.q!==undefined){
  const i=Number(b.dataset.q), q=questions[i], yes=Number(b.dataset.a)===q.key;
  if(done[i])return;
  if(!(i in first))first[i]=yes;
  if(yes)done[i]=true;
  b.classList.add(yes?'right':'wrong');
  const item=b.closest('.review-item');
  item.querySelector('.feedback').textContent=yes?'صحيح ✓':q.hint;
  if(yes)item.querySelectorAll('[data-a]').forEach(x=>x.disabled=true);
  save();progress();return;
 }
 if(b.id==='reset'&&confirm('هل تريد بدء محاولة جديدة لهذه الحصة؟')){stop();first={};done={};self={};save();render();}
});
document.addEventListener('change',e=>{
 if(e.target.dataset.self){self[e.target.dataset.self]=e.target.checked;save();progress();}
});
window.addEventListener('pagehide',stop);
render();
