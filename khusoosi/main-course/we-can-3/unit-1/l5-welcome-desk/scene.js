const originalPageContent=pageContent;
pageContent=function(p){if(!p.v2)return originalPageContent(p);return `<div class="scene-heading"><h1>${p.title}</h1>${ar(p.ar)}</div>`+p.html.replace('{{questions}}',p.questions?`<div class="questions ${p.questions.length>1?'two-q':''}">${p.questions.map(question).join('')}</div>`:'');};
const revealed={};
document.addEventListener('click',e=>{let b=e.target.closest('[data-fact]');if(!b)return;const k=b.dataset.fact;revealed[k]=!revealed[k];const a=document.querySelector(`[data-fact-answer="${k}"]`);a.hidden=!revealed[k];b.textContent=revealed[k]?'Hide answer':'Reveal answer';b.setAttribute('aria-expanded',String(revealed[k]));if(!revealed[k])stop();});
const baseRender=render;render=function(){baseRender();document.querySelectorAll('[data-fact]').forEach(b=>{let k=b.dataset.fact;const a=document.querySelector(`[data-fact-answer="${k}"]`);a.hidden=!revealed[k];b.textContent=revealed[k]?'Hide answer':'Reveal answer';b.setAttribute('aria-expanded',String(!!revealed[k]));});};
render();
