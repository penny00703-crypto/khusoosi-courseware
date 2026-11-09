const RELEASE_CONFIG={"lesson":6,"unit":"Unit 1","ids":["l6-r1","l6-r2","l6-r3","l6-r4","l6-r5","l6-r6"],"key":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3b2djeHNlZ2FhbWVud25qc21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxMDU5MzMsImV4cCI6MjEwNDY4MTkzM30.rfHrkaTFsOMkhUiC66lY5z4FyLuwYFch-5ZNyywgnDA"};
(()=>{
const config=RELEASE_CONFIG,button=document.getElementById('export'),status=document.getElementById('export-status'),nameInput=document.getElementById('student');let busy=false;
nameInput.value='';
button.textContent='Send result · إرسال النتيجة';
const confirmBox=document.createElement('dialog');confirmBox.innerHTML='<h2>Send your result?</h2><p lang="ar" dir="rtl">تحقّق من اسمك ونتيجتك قبل الإرسال إلى لوحة المتابعة.</p><p id="send-summary"></p><button id="send-confirm">Send · إرسال</button> <button id="send-cancel">Cancel · إلغاء</button>';document.body.append(confirmBox);
let pending;
button.onclick=()=>{const ids=config.ids,done=ids.filter(id=>state.answers[id]?.done).length,first=ids.filter(id=>state.answers[id]?.done&&state.answers[id].first).length,name=nameInput.value.trim();
if(!name||done!==ids.length){status.textContent='Complete all listening / reading questions and enter your name. أكمل الأسئلة واكتب اسمك.';return;}
pending={student_name:name,book:'We Can 3 · 1448 · Part 1',unit:config.unit,lesson:'L'+config.lesson,stars:first/ids.length>=.8?3:first/ids.length>=.6?2:1,first_try:first,quiz_total:ids.length};
if(state.submitted===JSON.stringify(pending)){status.textContent='Already sent successfully. تم إرسال هذه النتيجة بالفعل.';return;}
document.getElementById('send-summary').textContent=name+' · L'+config.lesson+' · '+first+' / '+ids.length+' first try';confirmBox.showModal();};
document.getElementById('send-cancel').onclick=()=>confirmBox.close();
document.getElementById('send-confirm').onclick=async()=>{if(busy)return;confirmBox.close();
if(location.hostname!=='penny00703-crypto.github.io'||new URLSearchParams(location.search).has('qa')){status.textContent='Preview / QA: production submission blocked. معاينة فقط؛ لم تُرسل النتيجة.';return;}
busy=true;button.disabled=true;document.getElementById('restart').disabled=true;nameInput.disabled=true;status.textContent='Sending… جارٍ الإرسال';const control=new AbortController(),timer=setTimeout(()=>control.abort(),15000);
try{const response=await fetch('https://awogcxsegaamenwnjsmg.supabase.co/rest/v1/review_records',{method:'POST',headers:{apikey:config.key,Authorization:'Bearer '+config.key,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify(pending),signal:control.signal});if(!response.ok)throw new Error('HTTP '+response.status);state.submitted=JSON.stringify(pending);save();status.textContent='Result sent successfully. تم إرسال النتيجة بنجاح.';}
catch(error){status.textContent=error.name==='AbortError'?'Connection timed out. Check the dashboard before retrying to avoid a duplicate. انتهت المهلة؛ تحقّق من اللوحة قبل إعادة الإرسال.':'Could not confirm submission. Check the connection / dashboard, then try again. تعذّر تأكيد الإرسال؛ تحقّق ثم حاول مجددًا.';}
finally{clearTimeout(timer);busy=false;button.disabled=false;document.getElementById('restart').disabled=false;nameInput.disabled=false;}};
document.getElementById('confirm-reset').addEventListener('click',()=>{status.textContent='New practice started. بدأت محاولة جديدة.';});
})();