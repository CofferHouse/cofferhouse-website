(() => {
 const main=document.querySelector('main');
 if(!main||document.querySelector('#book-portal'))return;
 const section=document.createElement('section');section.id='book-portal';section.setAttribute('aria-label','Open the CofferHouse storybook');
 section.innerHTML=`<div class="portal-stage"><div class="portal-camera"><div class="portal-paper"><span class="notebook-page-frame" aria-hidden="true"></span><img class="portal-world" src="assets/cofferhouse-expanded-house-v2.webp" width="1672" height="941" alt="The illustrated CofferHouse inside the book" fetchpriority="high" decoding="async"><span class="portal-paper-caption">OUR HOUSE. OUR STORY.</span><div class="inside-seal"><b>BUILT ON ARC</b><span>BUILT TOGETHER</span></div></div><div class="portal-lid"><div class="portal-front"><small>COLORING BOOK No. 4444<br>BUILT ON ARC</small><img class="portal-emblem" src="assets/cofferhouse-arch-vector.svg" width="96" height="96" alt=""><h1 aria-label="The CofferHouse"><span>THE</span><span class="portal-brand-text" aria-label="Coffer"><i class="brand-orange">C</i><i class="brand-gold">O</i><i class="brand-teal">F</i><i class="brand-orange">F</i><i class="brand-gold">E</i><i class="brand-teal">R</i></span><span class="portal-brand-text" aria-label="House"><i class="brand-orange">H</i><i class="brand-gold">O</i><i class="brand-teal">U</i><i class="brand-orange">S</i><i class="brand-gold">E</i></span></h1><p>A DeFi house drawn by a kid.<br>Built by everyone inside.</p><p class="portal-cover-note">please color<br>outside the lines!</p></div><div class="portal-back"><div class="inside-mission"><small>ON ARC. WITH OUR COMMUNITY.</small><h2>A House built<br>together.</h2><p>Our aim is to make financial tools easier to understand and explore responsibly.</p><p>Clear information. Community participation. Progress, step by step.</p><b>A membership is the key.<br>The community makes it a House.</b></div></div></div></div><div class="portal-hint"><b>SCROLL TO OPEN THE BOOK</b><span>↓</span></div><span class="portal-step" aria-hidden="true">01 / OPEN THE COVER</span><a class="portal-skip" href="#house">SKIP TO THE HOUSE ↗</a></div>`;
 main.prepend(section);
 const doodles=document.createElement('div');doodles.className='desk-doodles';doodles.setAttribute('aria-hidden','true');doodles.innerHTML='<img src="assets/trait-purple-cat.png" alt=""><img src="assets/trait-seven-petal-flower.png" alt=""><img src="assets/trait-crooked-heart.png" alt="">';section.querySelector('.portal-stage').prepend(doodles);
 const stage=section.querySelector('.portal-stage'),step=section.querySelector('.portal-step');
 const houseUI=document.createElement('div');houseUI.className='portal-house-ui in-view';houseUI.setAttribute('aria-hidden','true');
 document.querySelectorAll('#house .chapter-card,#house .comic-arrow').forEach(node=>{const copy=node.cloneNode(true);copy.querySelectorAll('[id]').forEach(child=>child.removeAttribute('id'));copy.removeAttribute('id');houseUI.append(copy);});section.querySelector('.portal-stage').append(houseUI);
 const front=section.querySelector('.portal-front'),back=section.querySelector('.portal-back'),house=document.querySelector('#house');
 house.classList.add('book-handoff');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let frame=null,onScreen=true,shownProgress=null,lastTime=0;
 const clamp=x=>Math.min(1,Math.max(0,x));
 const ease=x=>x*x*(3-2*x);
 const segment=(p,a,b)=>ease(clamp((p-a)/(b-a)));
 function render(time=0){
  frame=null;if(document.hidden||!onScreen)return;
  const width=stage.clientWidth,height=stage.clientHeight;
  const bw=Math.min(width*.72,460,height*.68),bh=Math.min(height*.72,bw*1.34);
  const rect=section.getBoundingClientRect();
  const target=reduced.matches?0:clamp(-rect.top/Math.max(1,rect.height-height));
  const dt=lastTime?Math.min(64,Math.max(1,time-lastTime)):16;lastTime=time;
  if(shownProgress===null||reduced.matches||target===0||target===1)shownProgress=target;
  else shownProgress+=(target-shownProgress)*(1-Math.exp(-dt/55));
  if(Math.abs(target-shownProgress)<.0001)shownProgress=target;
  const p=shownProgress;
  const opening=segment(p,.045,.43),enter=segment(p,.45,.91),finish=segment(p,.91,1);
  front.style.visibility=opening>.5?'hidden':'visible';
  back.style.visibility=opening>.5?'visible':'hidden';
  const options=reduced.matches?0:segment(p,.915,.995);
  houseUI.style.opacity=String(options);houseUI.style.pointerEvents=options>.9?'auto':'none';houseUI.setAttribute('aria-hidden',String(options<.9));houseUI.inert=options<.9;
  house.style.opacity=reduced.matches||p>=.999?'1':'0';house.style.pointerEvents=reduced.matches||p>=.999?'':'none';house.style.transform='none';
  const initialX=(width-bw)/2,initialY=(height-bh)/2;
  const vars={
   '--paper-reveal':String(segment(p,.10,.17)),'--desk-opacity':String(1-enter),'--book-w':bw+'px','--book-h':bh+'px',
   '--book-x':(bw*.5*opening*(1-enter))+'px',
   '--book-tilt':(-4*(1-opening))+'deg',
   '--lid-angle':(-180*opening)+'deg',
   '--lid-opacity':String(1-segment(p,.48,.66)),
   '--clip-x':(initialX*(1-enter))+'px','--clip-y':(initialY*(1-enter))+'px',
   '--world-scale':String((Math.min(bw/width,bh/height)*.86)*(1-enter)+1.015*enter),
   '--paper-shade':String(1-enter),'--paper-label':String(segment(p,.15,.35)*(1-segment(p,.46,.62))),
   '--hint-opacity':String(1-segment(p,.02,.15)),'--step-opacity':String(segment(p,.1,.2)*(1-finish))
  };
  for(const [key,value]of Object.entries(vars))stage.style.setProperty(key,value);
  const stepText=p<.43?'01 / OPEN THE COVER':p<.85?'02 / STEP INTO THE DRAWING':'03 / WELCOME INSIDE';
  if(Math.abs(target-shownProgress)>.0001)frame=requestAnimationFrame(render);
  if(step.dataset.stepText!==stepText||step.dataset.lang!==document.documentElement.lang){step.textContent=window.CofferI18n?.translate(stepText)||stepText;step.dataset.stepText=stepText;step.dataset.lang=document.documentElement.lang;}
 }
 const schedule=()=>{if(frame===null&&onScreen&&!document.hidden)frame=requestAnimationFrame(render);};
 if('IntersectionObserver'in window)new IntersectionObserver(entries=>{onScreen=entries[0].isIntersecting;if(onScreen)schedule();},{rootMargin:'100px'}).observe(section);
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});
 reduced.addEventListener('change',schedule);
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&frame!==null){cancelAnimationFrame(frame);frame=null;}else schedule();});
 // A menu return must land after the portal handoff, not 84px before it.
 // Native scroll-padding otherwise leaves the actual House hidden at p < 1.
 function returnToHouse(behavior){
  house.classList.add('in-view');
  const top=house.getBoundingClientRect().top+window.scrollY+2;
  window.scrollTo({top,behavior:reduced.matches?'instant':behavior});
  schedule();
 }
 document.addEventListener('click',event=>{
  const link=event.target.closest?.('a[href="#house"]');
  if(!link||event.defaultPrevented||event.button>0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();returnToHouse('smooth');
  if(location.hash!=='#house')history.pushState(null,'','#house');
 });
 window.addEventListener('hashchange',()=>{if(location.hash==='#house')returnToHouse('instant');});
 document.addEventListener('DOMContentLoaded',()=>{if(location.hash==='#house')requestAnimationFrame(()=>returnToHouse('instant'));});
 document.documentElement.classList.add('book-portal-enabled');
 document.querySelectorAll('a[href="#cover"]').forEach(a=>a.setAttribute('href','#book-portal'));
 if(location.hash==='#cover')section.scrollIntoView({behavior:'instant'});
 document.addEventListener('DOMContentLoaded',()=>document.querySelector('#languageSelect')?.addEventListener('change',schedule));
 schedule();
})();
