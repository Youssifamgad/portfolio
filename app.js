const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const toggle=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
toggle?.addEventListener('click',()=>{const open=navigation.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
navigation?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navigation.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navigation?.classList.contains('open')){navigation.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.focus();}});
if(!reducedMotion&&'IntersectionObserver' in window){document.body.classList.add('motion-ready');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
let scheduled=false;
if(!reducedMotion&&matchMedia('(pointer:fine)').matches){const hero=document.querySelector('.hero');const visual=document.querySelector('.hero-visual');hero?.addEventListener('pointermove',event=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{const rect=hero.getBoundingClientRect();const x=(event.clientX-rect.left)/rect.width;const y=(event.clientY-rect.top)/rect.height;document.documentElement.style.setProperty('--mx',`${x*100}%`);document.documentElement.style.setProperty('--my',`${y*70}%`);visual?.style.setProperty('--px',`${(x-.5)*12}px`);visual?.style.setProperty('--py',`${(y-.5)*10}px`);scheduled=false;});});hero?.addEventListener('pointerleave',()=>{visual?.style.setProperty('--px','0px');visual?.style.setProperty('--py','0px');});}
const filterButtons=document.querySelectorAll('[data-filter]');
filterButtons.forEach(button=>button.addEventListener('click',()=>{filterButtons.forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;});}));
const lightbox=document.querySelector('#lightbox');let imageTrigger;
document.querySelectorAll('[data-lightbox]').forEach(button=>button.addEventListener('click',()=>{imageTrigger=button;const img=lightbox.querySelector('img');img.src=button.dataset.lightbox;img.alt=button.dataset.caption||'';lightbox.querySelector('p').textContent=img.alt;lightbox.showModal();}));
lightbox?.querySelector('.lightbox-close').addEventListener('click',()=>lightbox.close());
lightbox?.addEventListener('click',event=>{if(event.target===lightbox){const box=lightbox.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)lightbox.close();}});
lightbox?.addEventListener('close',()=>imageTrigger?.focus());
