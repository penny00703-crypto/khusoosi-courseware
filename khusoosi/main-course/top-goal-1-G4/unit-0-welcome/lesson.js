'use strict';
const $=id=>document.getElementById(id), esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const qaMode=new URLSearchParams(location.search).get('qa');
const KEY='top-goal-1:1448:part1:welcome:l1:main:v4:'+(qaMode===null?'preview':'qa:'+(qaMode||'default'));
let state;try{state=JSON.parse(localStorage.getItem(KEY))||{};}catch{state={};}state.answers??={};let page=Math.max(0,state.page||0),audio=null;
const points={camera:[18,33],guitar:[39,62],drums:[61,63],balloons:[75,14],bus:[91,35]};
const scene=(dots=false)=>`<div class="scene"><img src="assets/school.jpg" alt="Four children at a school celebration, with a camera, guitar, drums, balloons and a school bus.">${dots?Object.entries(points).map(([k,p],i)=>`<button class="dot" data-point="${k}" style="left:${p[0]}%;top:${p[1]}%" aria-label="Picture spot ${i+1}">${i+1}</button>`).join(''):''}</div>`;
const sound=(id,label='Listen to the model')=>`<button class="model-audio" data-audio="${id}">▶ ${label}</button>`;
const help=(html)=>`<div class="support"><button data-help>Need a model?</button><div class="help" hidden>${html}</div></div>`;
const quiz=(id,prompt,options,answer,hint)=>{let a=state.answers[id]||{};return `<div class="quiz" data-quiz="${id}" data-answer="${answer}"><p>${prompt}</p><div class="choices">${options.map((x,i)=>`<button data-choice="${i}" ${a.done?'disabled':''} class="${a.done&&i===answer?'right':''}">${x}</button>`).join('')}</div><div class="feedback">${a.done?'Yes. Now say the whole sentence.':''}</div><div class="help" hidden>${hint}</div><button class="repeat-item" data-repeat="${id}" ${a.done?'':'hidden'}>Try this item again</button></div>`;};
const eyebrow=(n)=>`<p class="eyebrow">Welcome · ${n}</p>`;
const freq=(n)=>`<div class="days" aria-label="${n} out of five school days">${Array.from({length:5},(_,i)=>`<span class="${i<n?'on':''}"></span>`).join('')}</div>`;
const bars=()=>`<div class="bars-panel panel"><p class="small">Height chart</p><div class="bars"><div class="personbar" style="height:120px"><span class="height">130 cm</span><b>Sami</b></div><div class="personbar" style="height:155px;background:#e0b77d"><span class="height">140 cm</span><b>Ali</b></div><div class="personbar" style="height:190px;background:#d691aa"><span class="height">150 cm</span><b>Noor</b></div></div></div>`;
const story=`<p class="line">Yesterday was our school celebration.</p><p class="line">We were on the playground.</p><p class="line">The music was brilliant.</p><p class="line">There were balloons.</p><p class="line">I was excited.</p>`;
const pages=[];
function save(){state.page=page;localStorage.setItem(KEY,JSON.stringify(state));}
function stop(){if(audio){audio.pause();audio.currentTime=0;audio=null;}$('audio-status').textContent='';}
function play(id){stop();audio=new Audio(`assets/audio/${id}.mp3`);$('audio-status').textContent='Playing practice model…';audio.onended=()=>{$('audio-status').textContent='Model finished.';};audio.onerror=()=>{$('audio-status').textContent='Audio unavailable. Please try again.';};audio.play().catch(()=>{$('audio-status').textContent='Audio could not start. Try the button again.';});}
function render(){stop();$('lesson').innerHTML=pages[page].html();$('lesson').dataset.page=page+1;$('count').textContent=`${page+1} / ${pages.length}`;$('bar').style.width=((page+1)/pages.length*100)+'%';$('back').disabled=page===0;$('next').disabled=page===pages.length-1;$('page-list').hidden=true;save();}
$('back').onclick=()=>{if(page>0){page--;render();}};$('next').onclick=()=>{if(page<pages.length-1){page++;render();}};
$('pages').onclick=()=>{const n=$('page-list');n.hidden=!n.hidden;if(!n.hidden)n.innerHTML=pages.map((p,i)=>`<button data-jump="${i}" class="${i===page?'selected-page':''}">${i+1}. ${p.title}</button>`).join('');};
$('page-list').onclick=e=>{let b=e.target.closest('[data-jump]');if(b){page=+b.dataset.jump;render();}};
$('full').onclick=()=>{if(document.fullscreenElement)document.exitFullscreen();else $('stage').requestFullscreen?.();};
const restartDialog=document.createElement('dialog');restartDialog.innerHTML='<h2>Start a new class?</h2><p>Only this lesson’s classroom progress will reset. The previous attempt stays saved locally.</p><div class="actions"><button id="cancel-new">Cancel</button><button id="confirm-new" class="primary">Start new class</button></div>';document.body.append(restartDialog);
$('restart').onclick=()=>restartDialog.showModal();$('cancel-new').onclick=()=>restartDialog.close();$('confirm-new').onclick=()=>{localStorage.setItem(KEY+':previous',JSON.stringify(state));state={answers:{}};page=0;restartDialog.close();render();};
$('lesson').onclick=e=>{
 let b=e.target.closest('button');if(!b)return;
 if(b.dataset.repeat){const id=b.dataset.repeat;state.history??={};state.history[id]??=[];state.history[id].push({...state.answers[id]});state.answers[id]={first:true,done:false};save();render();return;}
 if(b.hasAttribute('data-help')){const h=b.parentElement.querySelector('.help');h.hidden=!h.hidden;b.textContent=h.hidden?'Need a model?':'Hide the model';if(h.hidden)stop();return;}
 if(b.dataset.audio){play(b.dataset.audio);return;}
 if(b.dataset.word){let w=b.dataset.word;play(w);$('point-caption').textContent=w==='playground'?'The school playground is the whole outdoor space.':`Find the ${w}.`;$('lesson').querySelectorAll('.dot').forEach(d=>d.classList.toggle('active',d.dataset.point===w));return;}
 if(b.dataset.point){$('lesson').querySelectorAll('.dot').forEach(d=>d.classList.remove('active'));b.classList.add('active');return;}
 if(b.dataset.proof!==undefined){const good=+b.dataset.proof===1;b.classList.add(good?'right':'wrong');$('proof-feedback').textContent=good?'Yes. Now tell me: what was exciting?':'Find the place: where were we?';return;}
 if(b.dataset.choice!==undefined){let q=b.closest('.quiz'),id=q.dataset.quiz,a=state.answers[id]??={first:true,done:false};if(a.done)return;let good=+b.dataset.choice===+q.dataset.answer;if(!good){a.first=false;b.classList.add('wrong');q.querySelector('.feedback').textContent='Use the help. Then choose again.';q.querySelector('.help').hidden=false;}else{a.done=true;b.classList.add('right');q.querySelectorAll('[data-choice]').forEach(x=>x.disabled=true);q.querySelector('.help').hidden=true;q.querySelector('.feedback').textContent='Yes. Say it. Then try the new example.';q.querySelector('[data-repeat]').hidden=false;}save();}
};
document.addEventListener('keydown',e=>{if(/INPUT|TEXTAREA/.test(e.target.tagName)||!$('page-list').hidden)return;if(e.key==='ArrowRight')$('next').click();if(e.key==='ArrowLeft')$('back').click();});
function fit(){let scale=Math.min(innerWidth/1280,innerHeight/720);$('stage').style.transform=`translate(-50%,-50%) scale(${scale})`;}addEventListener('resize',fit);addEventListener('pagehide',stop);
