/* AAB bilingual behavior: no analytics, network requests or form data storage */
(()=>{
'use strict';
const nav=document.getElementById('primaryNav');
const toggle=document.getElementById('navToggle');
if(toggle&&nav){toggle.addEventListener('click',()=>{const opened=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(opened));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');}));document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');}});}
const locale=document.body.dataset.language==='en'?'en':'th', i18n=window.AAB_I18N||{};
try{if(/\/(th|en)\/?$/.test(window.location.pathname))localStorage.setItem('aab_language',locale);}catch(e){}
for(const a of document.querySelectorAll('.lang-switch')){a.addEventListener('click',()=>{try{localStorage.setItem('aab_language',a.dataset.lang)}catch(e){}const hash=window.location.hash||'';if(hash&&hash!=="#top")a.href=a.href.split('#')[0]+hash;});}
const year=document.getElementById('year');if(year)year.textContent=String(new Date().getFullYear());
const dateField=document.querySelector('input[name="date"]');if(dateField){const d=new Date();dateField.min=[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');}
const f=document.getElementById('bookingForm');const result=document.getElementById('bookingResult');const output=document.getElementById('bookingMessage');const feedback=document.getElementById('copyFeedback');
if(f&&result&&output){f.addEventListener('submit',e=>{e.preventDefault();if(!f.reportValidity())return;const fd=new FormData(f);const get=name=>String(fd.get(name)||'').trim();const fallback=i18n.not_specified||'-';const parts=[i18n.form_msg_intro||'AAB appointment',`${i18n.form_msg_name}: ${get('customer')}`,`${i18n.form_msg_phone}: ${get('phone')}`,`${i18n.form_msg_model}: ${get('vehicle')||fallback}`,`${i18n.form_msg_date}: ${get('date')||fallback}`,`${i18n.form_msg_service}: ${get('service')||fallback}`,`${i18n.form_msg_details}: ${get('details')||fallback}`,i18n.form_msg_end||''];output.value=parts.join('\n');result.hidden=false;result.scrollIntoView({behavior:'smooth',block:'nearest'});});}
const copy=document.getElementById('copyMessage');if(copy&&output){copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(output.value);feedback.textContent=i18n.copy_done||'Copied';}catch(e){output.focus();output.select();feedback.textContent=i18n.copy_fail||'Select and copy the text manually';}});}
})();

/* SEO measurement hooks: activate by adding a valid Google Analytics 4 configuration. No personal form values are sent. */
(()=>{
 const report=(event,params)=>{if(typeof window.gtag==='function')window.gtag('event',event,params||{});};
 document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a)return;const href=a.href||'';if(/^tel:/i.test(a.getAttribute('href')||''))report('phone_click',{contact_method:'phone'});else if(/line\.me\//.test(href))report('line_click',{contact_method:'line'});else if(/maps\.app\.goo\.gl/.test(href))report('directions_click',{contact_method:'maps'});});
 const form=document.getElementById('bookingForm');if(form)form.addEventListener('submit',()=>{if(form.checkValidity())report('booking_form_prepared',{contact_method:'line_copy'});});
})();
