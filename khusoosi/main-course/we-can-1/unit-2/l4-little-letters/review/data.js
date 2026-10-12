/* WC1 / Unit2 / Lesson11 · letters, not classroom commands. */
const letters=[...'abcdefghijklmnopqrstuvwxyz'];
const LESSON={
  book:'We Can 1',unit:'Unit 2',lesson:'L11',title:'Little Letters a–z',heroChar:'letter-a.svg',
  actions:letters.map(l=>({id:l,en:l,ar:'الحرف '+l.toUpperCase(),img:'letter-'+l+'.svg',audio:'official-letter-'+l+'.mp3',speak:l.toUpperCase(),speakAudio:'official-letter-'+l+'.mp3',hint:l.toUpperCase()})),
  matchQuiz:[{answer:'b',options:['d','b','p']},{answer:'q',options:['g','p','q']},{answer:'i',options:['i','j','l']},{answer:'m',options:['n','m','w']},{answer:'x',options:['v','y','x']},{answer:'z',options:['z','s','c']}],
  speakIds:['a','b','d','p','q','z'],
  examQuiz:[{image:'b',imageFile:'capital-b.svg',options:['d','b','p'],answer:'b'},{image:'g',imageFile:'capital-g.svg',options:['q','p','g'],answer:'g'},{image:'m',imageFile:'capital-m.svg',options:['m','n','w'],answer:'m'},{image:'y',imageFile:'capital-y.svg',options:['v','y','u'],answer:'y'}]
};
function mix(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
LESSON.matchQuiz=mix(LESSON.matchQuiz).map(q=>({...q,options:mix(q.options)}));
LESSON.examQuiz=mix(LESSON.examQuiz).map(q=>({...q,options:mix(q.options)}));
