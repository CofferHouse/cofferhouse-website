(() => {
 const house=document.querySelector('#house'),cover=document.querySelector('#cover');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),desktop=matchMedia('(min-width:901px) and (pointer:fine)');
 const connection=navigator.connection;let frame=null;const visible=new Set([house,cover]);
 const staticMode=()=>reduced.matches||!desktop.matches||Boolean(connection?.saveData);
 const clamp=value=>Math.min(1,Math.max(0,value));
 function update(){frame=null;if(document.hidden)return;
  const stopped=staticMode();document.body.classList.toggle('motion-static',stopped);
  if(visible.has(house)){const b=house.getBoundingClientRect();house.style.setProperty('--house-progress',stopped?'0':clamp(-b.top/Math.max(1,b.height-innerHeight)).toFixed(4));}
  if(visible.has(cover)){const b=cover.getBoundingClientRect();cover.style.setProperty('--cover-progress',stopped?'0':clamp(-b.top/Math.max(1,b.height)).toFixed(4));}
 }
 const schedule=()=>{if(frame===null&&!document.hidden&&visible.size)frame=requestAnimationFrame(update);};
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting)visible.add(e.target);else visible.delete(e.target);}schedule();},{rootMargin:'100px'}).observe(house);
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting)visible.add(e.target);else visible.delete(e.target);}schedule();},{rootMargin:'100px'}).observe(cover);
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});
 function configure(){document.body.classList.toggle('motion-static',staticMode());if(reduced.matches){house.style.setProperty('--house-progress','0');cover.style.setProperty('--cover-progress','0');}schedule();}
 reduced.addEventListener('change',configure);desktop.addEventListener('change',configure);connection?.addEventListener('change',configure);
 document.addEventListener('visibilitychange',()=>{document.body.classList.toggle('motion-paused',document.hidden);if(document.hidden&&frame!==null){cancelAnimationFrame(frame);frame=null;}else schedule();});
 // Honor reduced-motion preferences in the original chapter-jump buttons too.
 document.addEventListener('click',event=>{const target=event.target.closest('[data-jump]');if(target&&reduced.matches){event.preventDefault();event.stopImmediatePropagation();document.querySelector(target.dataset.jump)?.scrollIntoView({behavior:'instant'});}},true);
 configure();
})();
