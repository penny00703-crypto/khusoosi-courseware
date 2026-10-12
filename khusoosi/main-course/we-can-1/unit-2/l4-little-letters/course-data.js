'use strict';
window.L11_DATA=(()=>{
  const groups=['abcd','efgh','ijkl','mnop','qrst','uvwxyz'].map(x=>[...x]);
  const stages=[{kind:'prep',name:'Ready'},{kind:'warm',name:'Big to little'}];
  groups.forEach((g,i)=>{stages.push({kind:'input',group:i,name:`Meet ${g[0]}–${g.at(-1)}`},{kind:'group',group:i,name:`Use ${g[0]}–${g.at(-1)}`});});
  stages.push(...[
    ['shape','Short, tall, tail'],['puzzle','Fix the letter path'],['core','Your letter names'],
    ['repair','A little help'],['book','In your book'],['reverse','Letter challenges'],
    ['school','School practice'],['exit','One last letter'],['finish','Take it home']
  ].map(([kind,name])=>({kind,name})));
  const errors={
    b:'For b/d: the tall line comes first in b, last in d. Point at the line, then the bowl. Do not introduce letter sounds.',
    d:'For b/d: the tall line comes first in b, last in d. Point at the line, then the bowl.',
    p:'For p/q: the tail line is on the left in p and on the right in q. Point to the line, then the bowl.',
    q:'For p/q: the tail line is on the left in p and on the right in q. Point to the line, then the bowl.',
    i:'For i/j/l: i has a dot and a short body; j has a dot and goes below the line; l is tall with no dot.',
    j:'For i/j/l: i has a dot and a short body; j has a dot and goes below the line; l is tall with no dot.',
    l:'For i/j/l: i has a dot and a short body; j has a dot and goes below the line; l is tall with no dot.',
    m:'For m/n: point to the two arches of m and the one arch of n.',
    n:'For m/n: point to the two arches of m and the one arch of n.'
  };
  const features={a:'Closed round body and a short stem on the right.',b:'Tall line on the left, bowl on the right.',c:'An open curve, with its opening to the right.',d:'Bowl on the left, tall line on the right.',e:'A short crossbar inside the open curve.',f:'Tall hook with a crossbar.',g:'Round body with a part below the line.',h:'Tall line and one arch.',i:'A dot above a short body.',j:'A dot above a body that goes below the line.',k:'Tall line with two slanting arms.',l:'Tall line; no dot.',m:'Two arches.',n:'One arch.',o:'A closed round shape; no extra stem.',p:'Tail line on the left, bowl on the right.',q:'Bowl on the left, tail line on the right.',r:'Short stem with one small shoulder.',s:'Two curves pointing different ways.',t:'A line with a crossbar.',u:'A rounded bottom.',v:'Two slanting sides meeting at a point.',w:'Two joined v-like parts.',x:'Two crossing slanting lines.',y:'Two arms joining a part below the line.',z:'Top line, slant, bottom line.'};
  return Object.freeze({letters:[...'abcdefghijklmnopqrstuvwxyz'],groups,stages,pages:stages.map(x=>x.name),errors,features,
    teacher:{
      prep:'Check audio. Explain in Arabic: stay seated; you say/point, I click. Confirm the sound. Pages → Start a new class archives this lesson’s current progress and starts again, without touching homework.',
      warm:'Point to A/a and H/h. Ask the child to name them, then model if needed. Both forms have the same letter name. Start the new group; no reveal sequence or fictional companion.',
      shape:'Consolidate the four-line models already taught in the groups: a body on2–3, b reaches1 and rests on3, g body on2–3 with tail to4. Point rather than lecture. Do not test the English category labels. The full SB19 activity is available. Keep this brief to protect naming/repair time.',
      puzzle:'Ask for the missing letter before clicking the child’s choice. Three short paths test order, not independent naming. Wrong: point to the neighbours, let the child say the row, then retry. Do not turn this into an extra alphabet recital.',
      core:'Ask “What’s its name?” Wait3–5 seconds without a model. Correct: continue. Wrong/silent/letter sound instead of name: Help or Model, then let the child repeat. That target returns on the help page. Teaching criterion6/8 independent names; listen to judge, do not score clicks.',
      repair:'Only revisit names that needed help. Show both forms and model the name. Use Slow or Compare only if needed. Hide help, then ask the same name in a new typeface. Still wrong: Help again. No compulsory long click-through and no oral score.',
      book:'SB18 Activity1 and all letter pairs are visible; Activity2 stem is cropped away. Point to two pairs and ask the small-letter names. CD1 21 chant is missing from the supplied package; no fake chant. Names elsewhere are CD1 22 excerpts.',
      reverse:'Six challenges: three same-letter handwriting corrections (b height, p tail length, a position), then three backward trails covering z through a once. Ask which version fits the four lines. Wrong: compare the actual selected version with our model, explain one grid feature, hide help and retry the same letter. Correct: name it. In each trail, fill the gap, then point/read the whole row before Next. No blind backward memorisation. These H5 handwriting tasks supplement Goal15–16; they are not original Workbook questions or proof of actual writing.',
      school:'WB77/78 Activity1 appears separately. Link forward/backward pointing to the book, then two silent uppercase→lowercase tasks. Ask the child to point AND name the selected lowercase. Wrong: compare the tall/tail line and retry. These H5 matching tasks are adaptations, not original Workbook questions. Handwriting is on paper at home; WB CD2 16–17 are missing.',
      exit:'One lowercase not used in the eight core tasks. Ask its name without a capital/model. If wrong/silent, use Help, listen and repeat, hide help, then try the same name in a new typeface before finishing. A supported retry is not an independent first answer. If still difficult, Help again; do not announce mastery or use a completion button as evidence.',
      finish:'Ask the child to point at one favourite little letter and say its name as a natural goodbye. Introduce the four home stations. The QR points to the locked future review URL; this version is local and not published. Do not submit local QA results to production.'
    },
    canonicalReview:'https://penny00703-crypto.github.io/khusoosi-courseware/khusoosi/main-course/we-can-1/unit-2/l4-little-letters/review/'
  });
})();
