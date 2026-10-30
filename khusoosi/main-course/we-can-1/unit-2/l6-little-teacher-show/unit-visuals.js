'use strict';
window.U2_VISUALS=(()=>{
 const assets=new URL('assets/',document.currentScript.src).href;
 const people=[
 {file:'body-complete.jpg',w:590,h:935,face:'175 15 255 260',points:{head:[[305,140,115]],shoulders:[[210,299,22],[397,299,22]],knees:[[238,685,25],[362,685,25]],toes:[[175,868,24],[413,868,24]],eyes:[[272,166,17],[352,169,17]],ears:[[215,188,18],[399,194,18]],nose:[[310,193,10]],mouth:[[310,224,18]]}},
 {file:'body-new.png',w:1024,h:1536,face:'330 12 335 340',points:{head:[[500,175,165]],shoulders:[[365,432,35],[651,432,35]],knees:[[423,1100,38],[604,1100,38]],toes:[[345,1425,40],[674,1428,40]],eyes:[[455,215,18],[550,211,18]],ears:[[391,256,20],[611,250,20]],nose:[[507,250,12]],mouth:[[506,289,22]]}}
 ];
 const faceParts=['eyes','ears','mouth','nose'];
 function body(part=null,{variant=0,interactive=false,face=faceParts.includes(part),marked=true,color='#1670e8'}={}){
 const p=people[variant%2],ids=interactive?(face?faceParts:['head','shoulders','knees','toes']):part?[part]:[];
 const rings=ids.map((k,j)=>p.points[k].map(([x,y,r],i)=>`<g ${interactive?`role="button" tabindex="0" aria-label="Spot ${j+1} ${i+1}" data-part="${k}"`:''} class="body-point"><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="white" stroke-width="${p.w/95}"/><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${marked&&k===part?color:interactive?'#72899d':'#ff735c'}" stroke-width="${p.w/220}"/><circle cx="${x}" cy="${y}" r="${Math.max(r,p.w/30)}" fill="transparent"/></g>`).join('')).join('');
 return `<svg xmlns="http://www.w3.org/2000/svg" class="unit-body" viewBox="${face?p.face:`0 0 ${p.w} ${p.h}`}" role="${interactive?'group':'img'}" aria-label="${interactive?'Choose the correct spot':'Marked body part'}"><image href="${assets+p.file}" width="${p.w}" height="${p.h}"/>${rings}</svg>`;
 }
 const classFiles={front:'action-come-front.png',seat:'action-go-seat.png',stand:'action-stand-up.png',sit:'action-sit-down.png',circle:'action-circle.png',line:'action-line.png'};
 function classroom(id){return `<img src="${assets+classFiles[id]}" alt="Classroom action picture">`;}
 return {body,classroom,people};
})();
