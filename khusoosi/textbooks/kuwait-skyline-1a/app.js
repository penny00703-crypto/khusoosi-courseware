'use strict';
const $=s=>document.querySelector(s);let data,book,index=0,mode='page',zoom=1,token=0;const positions={};let toastTimer;
function tell(s){$('#toast').textContent=s;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').textContent='',2400)}
function source(n){return data.assetBase+book.id+'/'+String(n+(book.sourceStart||1)-1).padStart(4,'0')+'.webp'}
function fit(){if(!book)return;const [w,h]=book.sizes[index],v=$('#viewport'),pad=innerWidth<=760?20:40;let ratio=mode==='page'?Math.min((v.clientWidth-pad)/w,(v.clientHeight-pad)/h):mode==='width'?(v.clientWidth-pad)/w:zoom;ratio=Math.max(.05,ratio);$('#pageImage').style.width=(w*ratio)+'px';$('#pageImage').style.height=(h*ratio)+'px';$('#scale').textContent=mode==='page'?'Fit page':mode==='width'?'Fit width':Math.round(ratio*100)+'%';$('#fit').textContent=mode==='width'?'Fit page':'Fit width';return ratio}
function save(){positions[book.id]=index}
async function show(n){index=Math.max(0,Math.min(book.pages-1,Number.isFinite(n)?Math.floor(n):0));const my=++token;$('#page').value=index+1;$('#page').max=book.pages;$('#total').textContent='/ '+book.pages;$('#prev').disabled=index===0;$('#next').disabled=index===book.pages-1;$('#readingPrev').disabled=index===0;$('#readingNext').disabled=index===book.pages-1;$('#readingCount').textContent=(index+1)+' / '+book.pages;$('#status').textContent='Loading page '+(index+1)+' / جارٍ تحميل الصفحة…';$('#pageImage').style.visibility='hidden';fit();save();const img=new Image();img.src=source(index+1);try{await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('timeout')),20000);img.onload=()=>{clearTimeout(timer);resolve()};img.onerror=()=>{clearTimeout(timer);reject(Error('image'))};if(img.complete&&img.naturalWidth){clearTimeout(timer);resolve()}});if(my!==token)return;$('#pageImage').src=img.src;$('#pageImage').alt=book.label+' · Page '+(index+1);$('#pageImage').style.visibility='visible';$('#status').textContent='';$('#viewport').scrollTo(0,0);if(index+1<book.pages){const next=new Image();next.src=source(index+2)}}catch{if(my!==token)return;$('#status').replaceChildren(document.createTextNode('Unable to load this page / تعذّر تحميل الصفحة.'));const b=document.createElement('button');b.textContent='Retry / إعادة المحاولة';b.onclick=()=>show(index);$('#status').append(b)}}
function select(id,n){book=data.books.find(b=>b.id===id)||data.books[0];for(const b of document.querySelectorAll('.tab')){const active=b.dataset.id===book.id;b.setAttribute('aria-selected',active);b.tabIndex=active?0:-1}show(n??positions[book.id]??0)}
$('#prev').onclick=()=>show(index-1);$('#next').onclick=()=>show(index+1);$('#page').onchange=e=>show(Math.floor(Number(e.target.value))-1);$('#page').onkeydown=e=>{if(e.key==='Enter'){show(Math.floor(Number(e.target.value))-1);e.target.blur()}};
$('#plus').onclick=()=>{zoom=Math.min(2.5,fit()*1.2);mode='custom';fit()};$('#minus').onclick=()=>{zoom=Math.max(.1,fit()/1.2);mode='custom';fit()};$('#fit').onclick=()=>{mode=mode==='width'?'page':'width';fit()};$('#focus').onclick=()=>{document.body.classList.add('focused');fit();tell('Esc: show controls / إظهار الأدوات · ← →: turn pages')};$('#restore').onclick=()=>{document.body.classList.remove('focused');fit()};
$('#fullscreen').onclick=async()=>{
 if(document.fullscreenElement){await exitReading();return}
 document.body.classList.add('focused');fit();$('#viewport').focus();
 try{await document.documentElement.requestFullscreen()}catch{tell('Reading mode / وضع القراءة')}
};
document.addEventListener('fullscreenchange',()=>{
 $('#fullscreen span').textContent=document.fullscreenElement?'Exit full screen':'Full screen';
 fit();
});
async function exitReading(){document.body.classList.remove('focused');if(document.fullscreenElement){try{await document.exitFullscreen()}catch{}}fit();$('#viewport').focus()}
$('#readingPrev').onclick=()=>show(index-1);$('#readingNext').onclick=()=>show(index+1);$('#readingExit').onclick=exitReading;
window.addEventListener('resize',fit);
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'){document.body.classList.remove('focused');fit();return}
 if(!book||e.target.matches('input,textarea,select')||e.target.isContentEditable)return;
 const reading=!!document.fullscreenElement||document.body.classList.contains('focused');
 const pageKey=['PageDown','PageUp'].includes(e.key);
 const arrow=['ArrowRight','ArrowLeft'].includes(e.key);
 if(pageKey||(arrow&&(reading||!e.target.closest('[role=tablist]')))){
  e.preventDefault();show(index+(['ArrowRight','PageDown'].includes(e.key)?1:-1));return;
 }
 if(arrow&&e.target.closest('[role=tablist]')){
  e.preventDefault();const i=data.books.indexOf(book),d=e.key==='ArrowRight'?1:-1;
  select(data.books[(i+d+data.books.length)%data.books.length].id);document.querySelector('.tab[aria-selected=true]').focus();return;
 }
 if(e.key.toLowerCase()==='f'){$('#fullscreen').click()}
});
Promise.resolve({"title": "Skyline English 1A", "grade": 1, "assetBase": "./pages/", "books": [{"id": "student-1a", "english": "Student’s Book · Semester 1", "arabic": "كتاب الطالب · الفصل الأول", "label": "Skyline English 1A", "pages": 98, "sizes": [[1478, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1503, 1900], [1478, 1900]], "sourceStart": 1}]}).then(d=>{data=d;for(const b of d.books){const btn=document.createElement('button');btn.className='tab';btn.dataset.id=b.id;btn.setAttribute('role','tab');const strong=document.createElement('strong');strong.textContent=b.english;const small=document.createElement('small');small.textContent=b.arabic;small.lang='ar';small.dir='rtl';btn.append(strong,small);btn.onclick=()=>select(b.id);$('#tabs').append(btn)}const parts=location.hash.slice(1).split('/');history.replaceState(null,'',location.pathname+location.search);select(parts[0],Math.max(0,Number(parts[1]||1)-1))}).catch(()=>$('#status').textContent='Unable to load books. Please refresh / تعذّر تحميل الكتب. يرجى تحديث الصفحة.');

window.addEventListener('hashchange',()=>{if(!data)return;const parts=location.hash.slice(1).split('/');select(parts[0],Math.max(0,Number(parts[1]||1)-1));history.replaceState(null,'',location.pathname+location.search)});
