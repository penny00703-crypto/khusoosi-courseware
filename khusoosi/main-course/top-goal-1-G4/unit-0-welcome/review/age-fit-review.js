'use strict';
const spokenArabic={S1:'سمِّ شيئين في الصورة.',S2:'ما الشيء الممتع والمثير في المدرسة؟',S3:'أين كنت في يوم الاحتفال؟'};
const spokenModelArabic={S1:['camera','guitar','drums','balloons','bus'].map(id=>L1_WORD_BY_ID[id].ar).join('، '),S2:'أعتقد أنّ الألعاب ممتعة ومثيرة.',S3:'كنّا في ساحة اللعب.'};
function addAgeSupport(){for(const [id,text]of Object.entries(spokenArabic)){const c=document.querySelector('[data-speak="'+id+'"]');if(c&&!c.querySelector('.speak-ar')){const p=document.createElement('p');p.className='speak-ar';p.lang='ar';p.dir='rtl';p.textContent=text;c.querySelector('h3').after(p);}if(c&&!c.querySelector('.model-ar')){const p=document.createElement('p');p.className='ar model-ar';p.lang='ar';p.dir='rtl';p.textContent=spokenModelArabic[id];c.querySelector('.help>p').after(p);}}
 for(const [id,text]of [['written','كتبتُ جملة على ورقتي.'],['checked','راجعتُ جملتي وصحّحتُ ما يحتاج إلى تعديل.']]){const label=document.getElementById(id).closest('label');if(!label.querySelector('[lang=ar]')){label.classList.add('bilingual-label');const span=document.createElement('span');span.lang='ar';span.dir='rtl';span.textContent=text;label.append(span);}}
}
const baseReviewRender=render;render=function(){baseReviewRender();addAgeSupport();};addAgeSupport();
