'use strict';
window.U2_REVIEW=(()=>{
 const base=(window.U2_BASE||window.L12_DATA).actions;
 const parts=['head','shoulders','knees','toes','eyes','ears','mouth','nose'];
 const partArabic=['الرأس','الكتفان','الركبتان','أصابع القدمين','العينان','الأذنان','الفم','الأنف'];
 const commands=base.filter(a=>['body','class'].includes(a.domain)).map(a=>({...a,topic:'commands',kind:'command'}));
 const body=parts.map((p,i)=>({id:'part-'+p,en:p,ar:partArabic[i],audio:'a_word_'+p+'.mp3',img:'body-'+p+'.jpg',part:p,topic:'body',kind:'part'}));
 const letters=base.filter(a=>a.domain==='letter').map(a=>({...a,topic:'letters',kind:'letter'}));
 const bank=[...commands,...body,...letters],sets=['abcdef','ghijkl','mnopqr','stuvwx','yzbdpq'];
 const action=id=>bank.find(a=>a.id===id),topics={commands:{en:'Commands',ar:'التعليمات'},body:{en:'Body parts',ar:'أجزاء الجسم'},letters:{en:'26 letters',ar:'الحروف الـ26'}};
 const confusions={close:['open','clap'],open:['close','raise'],raise:['clap','stand'],clap:['raise','close'],front:['seat','line'],seat:['front','sit'],stand:['sit','seat'],sit:['stand','seat'],circle:['line','front'],line:['circle','seat'],'part-head':['part-shoulders','part-knees'],'part-shoulders':['part-head','part-knees'],'part-knees':['part-toes','part-shoulders'],'part-toes':['part-knees','part-shoulders'],'part-eyes':['part-ears','part-nose'],'part-ears':['part-eyes','part-nose'],'part-mouth':['part-nose','part-eyes'],'part-nose':['part-mouth','part-eyes']};
 const letterConfusions={a:'od',b:'dp',c:'eo',d:'bp',e:'cf',f:'tl',g:'qy',h:'nk',i:'jl',j:'ig',k:'hx',l:'it',m:'nw',n:'mh',o:'ac',p:'qb',q:'pg',r:'nv',s:'cz',t:'fl',u:'vn',v:'uw',w:'mv',x:'ky',y:'gv',z:'sx'};
 function question(answer,pool,extra={}){const distractors=answer.startsWith('letter-')?[...letterConfusions[answer.slice(7)]].map(k=>'letter-'+k):confusions[answer];return {answer,options:[answer,...distractors],...extra};}
 function build(setIndex=0,cycle=0){
  const index=((setIndex%sets.length)+sets.length)%sets.length,ks=[...sets[index]],rotated=ks.slice((cycle%3)*2).concat(ks.slice(0,(cycle%3)*2)),ls=rotated.map(k=>'letter-'+k);
  const commandSets=[['raise','clap','stand','seat'],['open','close','front','circle'],['clap','raise','sit','line'],['open','raise','circle','seat'],['close','clap','front','line']];
  const cs=commandSets[index],bs=[0,1,2,3].map(i=>'part-'+parts[(index*2+i)%8]),today=[...cs,...bs,...ls];
  const listening=[question(cs[0],commands.map(a=>a.id)),question(cs[2],commands.filter(a=>a.domain==='class').map(a=>a.id)),question(bs[0],body.map(a=>a.id)),question(bs[1],body.map(a=>a.id)),question(ls[0],letters.map(a=>a.id)),question(ls[1],letters.filter(a=>!ls.slice(0,2).includes(a.id)).map(a=>a.id))];
  const speaking=[cs[1],cs[3],bs[2],bs[3],ls[2],ls[3]];
  const reading=[question(cs[1],commands.filter(a=>a.domain==='body').map(a=>a.id)),question(cs[3],commands.filter(a=>a.domain==='class').map(a=>a.id)),question(bs[2],body.map(a=>a.id)),question(bs[3],body.map(a=>a.id)),question(ls[4],letters.map(a=>a.id),{cap:rotated[4].toUpperCase()}),question(ls[5],letters.map(a=>a.id),{cap:rotated[5].toUpperCase()})];
  return {index,today,listening,speaking,reading};
 }
 return {bank,action,topics,sets,build};
})();
