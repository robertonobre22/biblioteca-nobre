'use strict';
(()=>{const track=document.querySelector('#featured-track'),prev=document.querySelector('#feature-prev'),next=document.querySelector('#feature-next'),progress=document.querySelector('#feature-progress');
if(!track||!prev||!next||!progress)return;
const cards=[...track.querySelectorAll('.featured-book')];
function current(){const left=track.scrollLeft;let closest=0,dist=Infinity;cards.forEach((card,i)=>{let v=Math.abs(card.offsetLeft-cards[0].offsetLeft-left);if(v<dist){dist=v;closest=i}});return closest}
function update(){const n=current();progress.style.transform='translateX('+(100*n)+'%)';prev.disabled=n===0;next.disabled=n===cards.length-1}
function go(delta){const n=Math.min(cards.length-1,Math.max(0,current()+delta));cards[n].scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',inline:'start',block:'nearest'});requestAnimationFrame(update)}
prev.addEventListener('click',()=>go(-1));next.addEventListener('click',()=>go(1));track.addEventListener('scroll',()=>requestAnimationFrame(update),{passive:true});addEventListener('resize',update);update();
})();