'use strict';
window.U2_VISUALS=(()=>{
 const points={head:[[200,110,61]],shoulders:[[151,204,16],[249,204,16]],knees:[[170,432,16],[230,432,16]],toes:[[165,588,14],[235,588,14]],eyes:[[180,108,9],[220,108,9]],ears:[[144,116,11],[256,116,11]],nose:[[200,126,9]],mouth:[[200,148,11]]};
 const faceParts=['eyes','ears','nose','mouth'];
 function person(variant=0){
  const shirt=variant%2?'#eaaa42':'#57a8b6',skin=variant%2?'#dba17b':'#edbd98';
  return `<ellipse cx="200" cy="611" rx="91" ry="12" fill="#17324d12"/><g stroke="#875e48" stroke-width="3" stroke-linejoin="round">
   <path d="M157 366h28v190q0 13-14 13t-15-13zM215 366h28v190q0 13-14 13t-14-13z" fill="${skin}"/>
   <path d="M157 553q13 10 27 3v29q0 15-19 15h-16q-12-1-10-11l10-24zM215 557q13 6 28-4l8 12 10 24q2 10-10 11h-17q-19 0-19-15z" fill="${skin}"/>
   ${[0,1,2,3,4].map(i=>`<ellipse cx="${148+i*7}" cy="${588+(i===0?-2:0)}" rx="4.4" ry="6.5" fill="${skin}" stroke-width="1.5"/><ellipse cx="${252-i*7}" cy="${588+(i===0?-2:0)}" rx="4.4" ry="6.5" fill="${skin}" stroke-width="1.5"/>`).join('')}
   <path d="M151 205l-23 78-6 43M249 205l23 78 6 43" fill="none" stroke="${skin}" stroke-width="26" stroke-linecap="round"/>
   <ellipse cx="119" cy="337" rx="14" ry="20" fill="${skin}"/><ellipse cx="281" cy="337" rx="14" ry="20" fill="${skin}"/>
   <path d="M184 173v25h32v-25" fill="${skin}"/><path d="M151 200q49-16 98 0l15 41-23 9v77h-82v-77l-23-9z" fill="${shirt}" stroke="#396174"/>
   <path d="M159 325h82l9 49h-37l-13-28-13 28h-37z" fill="#365575" stroke="#29435c"/><path d="M165 435h10M225 435h10" fill="none" stroke="#c28d6b" stroke-width="2"/>
   <ellipse cx="144" cy="116" rx="12" ry="20" fill="${skin}"/><ellipse cx="256" cy="116" rx="12" ry="20" fill="${skin}"/><ellipse cx="200" cy="115" rx="54" ry="64" fill="${skin}"/>
   <path d="M148 100q-10-54 39-58 57-8 66 42l-2 22-14-31q-47 24-77 6z" fill="#614636" stroke="#614636"/>
   <path d="M170 94q10-5 19-1M211 93q10-4 19 1" fill="none" stroke="#614636" stroke-width="3"/>
   <ellipse cx="180" cy="108" rx="5" ry="7" fill="#17324d" stroke="none"/><ellipse cx="220" cy="108" rx="5" ry="7" fill="#17324d" stroke="none"/>
   <path d="M200 115l-4 13h9" fill="none" stroke-width="2.2"/><path d="M187 144q13 13 26 0" fill="#fff" stroke="#a75f50" stroke-width="2.4"/>
  </g>`;
 }
 function body(part=null,{variant=0,interactive=false,face=faceParts.includes(part),marked=true}={}){
  const ids=face?faceParts:['head','shoulders','knees','toes'];
  const rings=(interactive?ids:part?[part]:[]).map(k=>points[k].map(([x,y,r],i)=>`<g ${interactive?`role="button" tabindex="0" aria-label="Choose ${k}${points[k].length>1?' '+(i+1):''}" data-part="${k}"`:''} class="body-point"><circle cx="${x}" cy="${y}" r="${r}" fill="${marked&&k===part?'#1670e822':'transparent'}" stroke="${marked&&k===part?'#1670e8':'#ff735c'}" stroke-width="${face?2.4:4}"/><circle cx="${x}" cy="${y}" r="${Math.max(r,face?12:22)}" fill="transparent" stroke="none"/></g>`).join('')).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" class="unit-body ${face?'unit-face':''}" viewBox="${face?'120 35 160 155':'75 25 250 605'}" role="${interactive?'group':'img'}" aria-label="${interactive?'Choose a body part':'Marked body part'}">${person(variant)}${rings}</svg>`;
 }
 function action(pose,variant=1){
  const skin=variant%2?'#dba17b':'#edbd98';let art=person(variant);
  if(pose==='close')art=art.replace('<ellipse cx="180" cy="108" rx="5" ry="7" fill="#17324d" stroke="none"/><ellipse cx="220" cy="108" rx="5" ry="7" fill="#17324d" stroke="none"/>','<path d="M173 108q7 6 14 0M213 108q7 6 14 0" fill="none" stroke="#17324d" stroke-width="3" stroke-linecap="round"/>');
  if(pose==='raise'||pose==='clap'){
   art=art.replace(/<path d="M151 205l-23 78-6 43M249 205l23 78 6 43"[^>]*\/>/,'').replace(/<ellipse cx="119"[^>]*\/><ellipse cx="281"[^>]*\/>/,'');
   art+=`<g fill="${skin}" stroke-linecap="round" stroke-linejoin="round"><path d="${pose==='raise'?'M151 205L110 145 125 68M249 205L290 145 275 68':'M151 205L144 257 192 248M249 205L256 257 208 248'}" fill="none" stroke="${skin}" stroke-width="24"/><ellipse cx="${pose==='raise'?125:194}" cy="${pose==='raise'?50:246}" rx="${pose==='raise'?13:8}" ry="20" stroke="#875e48" stroke-width="2"/><ellipse cx="${pose==='raise'?275:207}" cy="${pose==='raise'?50:246}" rx="${pose==='raise'?13:8}" ry="20" stroke="#875e48" stroke-width="2"/></g>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="40 5 320 625" role="img" aria-label="Action picture">${art}</svg>`;
 }
 return {body,points,person,action};
})();
