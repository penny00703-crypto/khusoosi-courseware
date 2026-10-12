'use strict';
window.L11_VISUALS=(()=>{
  // Canonical school handwriting: four lines44/76/108/140; baseline108.
  // Same paths in teaching and error options; single-storey a/g; tall f.
  const categories={short:'aceimnorsuvwxz',tall:'bdfhklt',tail:'gjpqy'};
  const round='M8 92C8 82 16 76 28 76C40 76 48 82 48 92C48 102 40 108 28 108C16 108 8 102 8 92Z';
  const lower={
    a:[round+' M48 76V108'],
    b:['M8 44V108 M8 92C8 82 16 76 28 76C40 76 48 82 48 92C48 102 40 108 28 108C16 108 8 102 8 92'],
    c:['M48 81C43 78 38 76 28 76C16 76 8 82 8 92C8 102 16 108 28 108C38 108 43 106 48 103'],
    d:[round+' M48 44V108'],
    e:['M8 92H48C48 82 40 76 28 76C16 76 8 82 8 92C8 102 16 108 28 108C38 108 43 106 48 103'],
    f:['M20 108V62Q20 44 40 44 M8 76H38'],
    g:[round+' M48 76V108','M48 108V123Q48 140 28 140Q16 140 10 133'],
    h:['M8 44V108 M8 92Q8 76 28 76Q48 76 48 92V108'],
    i:['M28 76V108','', '28'],
    j:['M36 76V108','M36 108V123Q36 140 20 140Q10 140 8 134','36'],
    k:['M8 44V108 M48 76L8 94 M25 87L48 108'], l:['M28 44V108'],
    m:['M6 76V108 M6 90Q6 76 19 76Q32 76 32 90V108 M32 90Q32 76 45 76Q58 76 58 90V108'],
    n:['M8 76V108 M8 92Q8 76 28 76Q48 76 48 92V108'], o:[round],
    p:[round+' M8 76V108','M8 108V140'], q:[round+' M48 76V108','M48 108V140'],
    r:['M16 76V108 M16 92Q16 76 38 76'],
    s:['M46 81Q38 76 28 76Q10 76 10 84Q10 90 28 92Q48 95 48 101Q48 108 28 108Q16 108 8 103'],
    t:['M28 44V95Q28 108 42 108 M10 76H46'],
    u:['M8 76V92Q8 108 28 108Q48 108 48 92V76 M48 92V108'],
    v:['M8 76L28 108L48 76'], w:['M4 76L16 108L30 76L44 108L58 76'],
    x:['M8 76L48 108 M48 76L8 108'],
    y:['M8 76L28 108 M48 76L28 108','M28 108L20 126Q14 140 6 140'],
    z:['M8 76H48L8 108H48']
  };
  const upper={
    A:'M4 108L30 44L56 108 M15 82H45',
    B:'M8 108V44H30Q52 44 52 60Q52 76 30 76H8 M30 76Q56 76 56 92Q56 108 30 108H8',
    C:'M54 52Q44 44 30 44Q4 44 4 76Q4 108 30 108Q44 108 54 100',
    D:'M8 44V108H26Q56 108 56 76Q56 44 26 44Z', E:'M54 44H8V108H54 M8 76H44',
    F:'M54 44H8V108 M8 76H44', G:'M54 52Q44 44 30 44Q4 44 4 76Q4 108 30 108Q44 108 54 100V80H34',
    H:'M8 44V108 M52 44V108 M8 76H52', I:'M12 44H48 M30 44V108 M12 108H48',
    J:'M12 44H52 M42 44V87Q42 108 24 108Q8 108 8 90',
    K:'M8 44V108 M54 44L8 80 M24 67L54 108', L:'M8 44V108H54',
    M:'M4 108V44L30 80L56 44V108', N:'M8 108V44L52 108V44',
    O:'M4 76Q4 44 30 44Q56 44 56 76Q56 108 30 108Q4 108 4 76Z',
    P:'M8 108V44H30Q54 44 54 64Q54 84 30 84H8',
    Q:'M4 76Q4 44 30 44Q56 44 56 76Q56 108 30 108Q4 108 4 76Z M36 91L57 114',
    R:'M8 108V44H30Q54 44 54 64Q54 84 30 84H8 M30 84L56 108',
    S:'M52 52Q44 44 30 44Q8 44 8 60Q8 71 30 76Q54 81 54 94Q54 108 30 108Q16 108 6 100',
    T:'M4 44H56 M30 44V108', U:'M8 44V84Q8 108 30 108Q52 108 52 84V44',
    V:'M4 44L30 108L56 44', W:'M2 44L14 108L30 62L46 108L58 44',
    X:'M6 44L54 108 M54 44L6 108', Y:'M4 44L30 76L56 44 M30 76V108', Z:'M6 44H54L6 108H54'
  };
  const category=k=>Object.keys(categories).find(c=>categories[c].includes(k));
  const faultsFor=k=>category(k)==='short'?['tall','raised']:category(k)==='tall'?['short','dropped']:['short-tail','raised'];
  const hint=k=>category(k)==='short'?'The small body sits between lines 2 and 3.':category(k)==='tall'?'The tall part reaches line 1; the letter rests on line 3.':'The body sits between lines 2 and 3; the tail reaches line 4.';
  const faultLabel={tall:'too tall',raised:'too high',short:'too short',dropped:'too low','short-tail':'tail too short'};
  function glyph(k,{cap=false,fault='correct',x=0}={}){
    const transforms={tall:'translate(0 108) scale(1 2) translate(0 -108)',short:'translate(0 108) scale(1 .5) translate(0 -108)',raised:'translate(0 -20)',dropped:'translate(0 32)'};
    const parts=lower[k];
    return `<g transform="translate(${x} 0)" data-glyph="${cap?k.toUpperCase():k}" data-case="${cap?'upper':'lower'}" data-fault="${fault}" data-category="${category(k)}"><g transform="${transforms[fault]||''}" fill="none" stroke="${cap?'#17324d':'#1670e8'}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><path d="${cap?upper[k.toUpperCase()]:parts[0]}"/>${!cap&&parts[1]?`<path data-tail="true" d="${parts[1]}" ${fault==='short-tail'?'transform="translate(0 108) scale(1 .2) translate(0 -108)"':''}/>`:''}${!cap&&parts[2]?`<circle cx="${parts[2]}" cy="58" r="2.4" fill="#1670e8" stroke="none"/>`:''}</g></g>`;
  }
  function grid(pair=false,k='a',fault='correct',zone=false){
    const width=pair?250:180;
    return `<svg class="handwriting-grid" viewBox="0 0 ${width} 174" role="img" aria-label="${pair?'Uppercase '+k.toUpperCase()+' and lowercase ':''}${k} on four handwriting lines${fault==='correct'?'':', '+faultLabel[fault]}">${zone?`<rect x="26" y="${category(k)==='tall'?44:76}" width="${width-46}" height="${category(k)==='short'?32:64}" rx="3" fill="#eaf4ff"/>`:''}${[44,76,108,140].map((y,i)=>`<line x1="26" x2="${width-20}" y1="${y}" y2="${y}" stroke="${i===2?'#ce7865':'#bacddb'}" stroke-width="${i===2?1.7:1.2}" ${i===2?'':'stroke-dasharray="5 4"'}/><text x="13" y="${y+4}" text-anchor="middle" font-family="Arial" font-size="10" fill="#718497">${i+1}</text>`).join('')}${pair?glyph(k,{cap:true,x:50})+glyph(k,{x:147}):glyph(k,{fault,x:72})}</svg>`;
  }
  function scene(){return `<svg viewBox="0 0 760 470" role="img" aria-label="Uppercase and lowercase letters"><rect width="760" height="470" rx="25" fill="#e8f3f8"/>${['a','b','c','x','y','z'].map((k,i)=>{const x=38+(i%3)*237,y=38+Math.floor(i/3)*202;return `<rect x="${x}" y="${y}" width="210" height="186" rx="22" fill="${i%2?'#fff3de':'#fff'}"/><svg x="${x+8}" y="${y+14}" width="194" height="158" viewBox="0 0 250 174">${grid(true,k).replace(/^<svg[^>]*>|<\/svg>$/g,'')}</svg>`;}).join('')}</svg>`;}
  return {scene,lines:k=>grid(false,k),grid,gridPair:k=>grid(true,k),category,faultsFor,hint,faultLabel};
})();
