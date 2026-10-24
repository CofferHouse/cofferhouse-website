(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),small=matchMedia('(max-width:900px), (pointer:coarse)');
 const leaves=[...document.querySelectorAll('main > .page')].filter(page=>!['cover','house'].includes(page.id));
 const visible=new Set();let frame=null;
 leaves.forEach(page=>{page.classList.add('book-leaf');const edge=document.createElement('i');edge.className='leaf-edge';edge.setAttribute('aria-hidden','true');page.append(edge);});
 function layoutTop(node){let y=0;for(let current=node;current;current=current.offsetParent)y+=current.offsetTop;return y;}
 function render(){frame=null;if(document.hidden)return;const disabled=reduced.matches||small.matches;document.body.classList.toggle('leaf-motion',!disabled);
  for(const page of disabled?leaves:visible){const top=layoutTop(page)-window.scrollY;const arriving=disabled?0:Math.min(1,Math.max(0,(top-80)/(innerHeight*.85)));const eased=arriving*arriving*(3-2*arriving);page.style.setProperty('--leaf-arrival',eased.toFixed(4));}
 }
 const schedule=()=>{if(frame===null&&!document.hidden)frame=requestAnimationFrame(render);};
 if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)visible.add(entry.target);else visible.delete(entry.target);});schedule();},{rootMargin:'100px'});leaves.forEach(page=>observer.observe(page));}else leaves.forEach(page=>visible.add(page));
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});reduced.addEventListener('change',schedule);small.addEventListener('change',schedule);
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&frame!==null){cancelAnimationFrame(frame);frame=null;}else schedule();});schedule();
})();
