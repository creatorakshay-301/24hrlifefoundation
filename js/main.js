document.addEventListener('DOMContentLoaded',()=>{
 const menu=document.getElementById('menuToggle'),nav=document.getElementById('mainNav');
 if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));}
 const current=(location.pathname.split('/').pop()||'index.html').replace('.html','');
 document.querySelectorAll('[data-nav]').forEach(a=>{if(a.dataset.nav===current || (current==='index'&&a.dataset.nav==='home'))a.classList.add('active');});
 const lang=document.getElementById('languageSelect');
 function setLanguage(code){const dict=window.translations?.[code];if(!dict)return;document.documentElement.lang=code;document.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;if(dict[key]!==undefined)el.innerHTML=dict[key];});localStorage.setItem('foundation-language',code);}
 if(lang){const saved=localStorage.getItem('foundation-language')||'en';lang.value=saved;setLanguage(saved);lang.addEventListener('change',()=>setLanguage(lang.value));}
 const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
 const amountButtons=[...document.querySelectorAll('.amount-option')],custom=document.getElementById('customAmount'),selected=document.getElementById('selectedAmount'),enquiry=document.getElementById('donationEnquiry');let chosen=1000;
 function updateAmount(value){chosen=value; if(selected)selected.textContent='₹'+Number(value||0).toLocaleString('en-IN');amountButtons.forEach(b=>b.classList.toggle('is-selected',Number(b.dataset.amount)===Number(value)&&(!custom||!custom.value)));if(enquiry){const msg=`Hello, I would like to enquire about contributing ₹${Number(value||0).toLocaleString('en-IN')} to 24 Hr Life Foundation. Please share the verified official process and details.`;enquiry.href='https://wa.me/918275474087?text='+encodeURIComponent(msg);}}
 amountButtons.forEach(b=>b.addEventListener('click',()=>{if(custom)custom.value='';updateAmount(Number(b.dataset.amount));}));if(custom){custom.addEventListener('input',()=>{const val=Math.max(0,Number(custom.value||0));amountButtons.forEach(b=>b.classList.remove('is-selected'));updateAmount(val);});}if(amountButtons.length)updateAmount(chosen);
 const volunteer=document.getElementById('volunteerForm');if(volunteer)volunteer.addEventListener('submit',e=>{e.preventDefault();if(!volunteer.reportValidity())return;const name=document.getElementById('volName').value.trim(),phone=document.getElementById('volPhone').value.trim(),area=document.getElementById('volArea').value,message=document.getElementById('volMessage').value.trim();const text=`Volunteer enquiry for 24 Hr Life Foundation%0AName: ${name}%0APhone: ${phone}%0AArea of interest: ${area}%0AAbout: ${message||'Not provided'}`;window.open('https://wa.me/918275474087?text='+encodeURIComponent(text),'_blank','noopener');document.getElementById('volunteerStatus').textContent='WhatsApp is opening. Please review and send your message.';});
 const contact=document.getElementById('contactForm');if(contact)contact.addEventListener('submit',e=>{e.preventDefault();if(!contact.reportValidity())return;const name=document.getElementById('contactName').value.trim(),email=document.getElementById('contactEmail').value.trim(),topic=document.getElementById('contactTopic').value,message=document.getElementById('contactMessage').value.trim();const text=`Contact enquiry for 24 Hr Life Foundation%0AName: ${name}%0AEmail: ${email||'Not provided'}%0ATopic: ${topic}%0AMessage: ${message}`;window.open('https://wa.me/918275474087?text='+encodeURIComponent(text),'_blank','noopener');document.getElementById('contactStatus').textContent='WhatsApp is opening. Please review and send your message.';});

 const workDetails={
  education:{title:'Education',eyebrow:'LEARNING & OPPORTUNITY',image:'assets/education.jpg',description:'We encourage learning, student participation and access to educational resources through community-led initiatives, guidance and partnerships with schools and educators.'},
  health:{title:'Health',eyebrow:'WELL-BEING & AWARENESS',image:'assets/health.jpg',description:'We promote health awareness and preventive education by supporting responsible outreach and collaboration with qualified healthcare professionals.'},
  environment:{title:'Environment',eyebrow:'CARE FOR OUR SHARED HOME',image:'assets/environment.jpg',description:'We encourage practical environmental responsibility through tree plantation, cleanliness, conservation awareness and local community participation.'},
  social:{title:'Social Work',eyebrow:'COMMUNITY & DIGNITY',image:'assets/Social Work.jpg',description:'We support inclusive community participation and work towards responsible local assistance initiatives based on identified needs.'}
 };
 const workDialog=document.getElementById('workDialog');
 if(workDialog){
  document.querySelectorAll('[data-work]').forEach(card=>card.addEventListener('click',()=>{
   const item=workDetails[card.dataset.work];if(!item)return;
   document.getElementById('workDialogImage').src=item.image;
   document.getElementById('workDialogImage').alt=item.title+' initiative';
   document.getElementById('workDialogEyebrow').textContent=item.eyebrow;
   document.getElementById('workDialogTitle').textContent=item.title;
   document.getElementById('workDialogDescription').textContent=item.description;
   workDialog.showModal();
  }));
  workDialog.querySelector('.work-dialog__close').addEventListener('click',()=>workDialog.close());
  workDialog.addEventListener('click',e=>{if(e.target===workDialog)workDialog.close();});
 }
});
