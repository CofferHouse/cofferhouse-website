(() => {
 const main=document.querySelector('main');if(!main||!document.querySelector('#book-portal'))return;
 const section=document.createElement('section');section.id='book-closing';section.setAttribute('aria-label','Close the CofferHouse notebook');
 section.innerHTML=`<div class="closing-stage"><div class="portal-camera"><div class="portal-paper"><span class="notebook-page-frame" aria-hidden="true"></span><img class="portal-world" src="assets/cofferhouse-expanded-house-v2.webp" width="1672" height="941" alt="The House on the last notebook page"><span class="closing-inner-label">TO BE CONTINUED...</span><div class="inside-seal"><b>BUILT ON ARC</b><span>BUILT TOGETHER</span></div></div><div class="portal-lid"><div class="portal-front closing-last-page"><small>ONE HOUSE. MANY HANDS.</small><h2>Made by<br>everyone<br>inside.</h2><p>Thank you for visiting.</p><img src="assets/trait-crooked-heart.png" width="75" height="75" alt=""></div><div class="portal-back closing-back-cover"><img src="assets/cofferhouse-arch-official.png" width="95" height="95" alt="CofferHouse emblem"><b class="closing-official-brand" aria-label="CofferHouse"><i class="brand-orange">C</i><i class="brand-gold">O</i><i class="brand-teal">F</i><i class="brand-orange">F</i><i class="brand-gold">E</i><i class="brand-teal">R</i><i class="brand-orange">H</i><i class="brand-gold">O</i><i class="brand-teal">U</i><i class="brand-orange">S</i><i class="brand-gold">E</i></b><span>BUILT ON ARC</span><p>Our story continues.</p></div></div></div><div class="closing-caption"><p>The next chapter is yours.</p><a href="#book-portal">OPEN THE BOOK AGAIN ↑</a><a href="#archive">EXPLORE MEMBERSHIPS ↗</a></div></div>`;
 main.append(section);const stage=section.querySelector('.closing-stage'),front=section.querySelector('.portal-front'),back=section.querySelector('.portal-back');const reduced=matchMedia('(prefers-reduced-motion: reduce)');let frame=null,visible=true,shownDistance=null,lastTime=0;
 const clamp=x=>Math.min(1,Math.max(0,x));const ease=x=>x*x*(3-2*x);
 // Keep the actual planning-room DOM in one pinned camera, including its links
 // and translated text. Reading and retreat share the same scroll surface.
 const room=document.querySelector('#roadmap');
 const viewport=document.createElement('div');viewport.className='closing-room-viewport';
 const anchor=document.createComment('Planning room original position');
 if(room&&!reduced.matches){room.before(anchor);stage.append(viewport);viewport.append(room);section.classList.add('continuous-room-exit');}
 function render(time=0){frame=null;if(document.hidden||!visible)return;const w=stage.clientWidth,h=stage.clientHeight,bw=Math.min(w*.72,460,h*.68),bh=Math.min(h*.72,bw*1.34);
  const active=room&&!reduced.matches;
  if(active&&room.parentNode!==viewport){room.before(anchor);viewport.append(room);section.classList.add('continuous-room-exit');}
  if(!active&&room&&room.parentNode===viewport){anchor.after(room);section.classList.remove('continuous-room-exit');}
  const read=active?Math.max(0,room.scrollHeight-h):0;
  const runway=reduced.matches?'100svh':(read+h*6)+'px';if(section.style.height!==runway)section.style.height=runway;
  const rect=section.getBoundingClientRect(),targetDistance=Math.max(0,-rect.top);
  const dt=lastTime?Math.min(64,Math.max(1,time-lastTime)):16;lastTime=time;
  if(shownDistance===null||reduced.matches||rect.top>0)shownDistance=targetDistance;
  else shownDistance+=(targetDistance-shownDistance)*(1-Math.exp(-dt/60));
  if(Math.abs(targetDistance-shownDistance)<.25)shownDistance=targetDistance;
  const distance=shownDistance;
  const p=reduced.matches?1:clamp((distance-read)/(h*5));
  const roomExit=ease(clamp((p-.025)/.395));
  const retreat=ease(clamp((p-.42)/.33)),closing=ease(clamp((p-.75)/.23));
  // Retire the reading layer before retreating: never shrink a floating webpage.
  // The left wing is the planning room in the original 1672 × 941 drawing.
  // Compute its camera position in object-fit:cover coordinates on any screen.
  const imageScale=Math.max(w/1672,h/941),ix=(.105-.5)*1672*imageScale,iy=(.48-.5)*941*imageScale;
  const zoom=Math.exp(Math.log(4.2)*(1-roomExit));
  const boundX=w*(zoom-1)/2,boundY=h*(zoom-1)/2;
  const cameraX=Math.max(-boundX,Math.min(boundX,ix*(roomExit-zoom))),cameraY=Math.max(-boundY,Math.min(boundY,iy*(roomExit-zoom)));
  viewport.style.transform='none';
  viewport.style.opacity=String(1-ease(clamp(p/.06)));
  viewport.style.visibility=p>=.06?'hidden':'visible';
  viewport.inert=p>.08;
  if(active)room.style.setProperty('--room-read-y',(-Math.min(distance,read))+'px');
  front.style.visibility=closing<.5?'visible':'hidden';back.style.visibility=closing>=.5?'visible':'hidden';
  const shift=bw*.5*closing;
  const vars={'--book-w':bw+'px','--book-h':bh+'px','--book-x':shift+'px','--book-tilt':'0deg','--lid-angle':(-180*closing)+'deg','--lid-opacity':String(ease(clamp((p-.58)/.12))),'--close-left':((w*.5-bw)*retreat)+'px','--close-right':(w*.5*retreat)+'px','--clip-y':((h-bh)*.5*retreat)+'px','--world-scale':String(zoom*(1-retreat)+Math.min(bw/w,bh/h)*.86*retreat),'--room-camera-x':cameraX+'px','--room-camera-y':cameraY+'px','--retreat':String(retreat),'--end-label':String(ease(clamp((p-.62)/.1))),'--closing-caption':String(ease(clamp((p-.96)/.035)))};
  for(const[k,v]of Object.entries(vars))stage.style.setProperty(k,v);
  if(Math.abs(targetDistance-shownDistance)>.25)frame=requestAnimationFrame(render);
 }
 const schedule=()=>{if(frame===null&&visible&&!document.hidden)frame=requestAnimationFrame(render);};
 if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule();},{rootMargin:'100px'}).observe(section);
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});reduced.addEventListener('change',schedule);document.addEventListener('visibilitychange',()=>{if(document.hidden&&frame!==null){cancelAnimationFrame(frame);frame=null;}else schedule();});schedule();
})();
