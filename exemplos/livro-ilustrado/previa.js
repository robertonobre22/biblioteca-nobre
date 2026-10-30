'use strict';
(async()=>{
 const article=document.getElementById('chapter');
 function appendInline(parent,inlines){for(const token of inlines){const el=token.type==='text'?document.createTextNode(token.text):document.createElement(token.type==='strong'?'strong':'em');if(token.type!=='text')el.textContent=token.text;parent.append(el)}}
 try{
 const manifest=await fetch('manifesto.json').then(r=>{if(!r.ok)throw Error('Manifesto indisponível');return r.json()});
 const chapter=manifest.chapters[0];if(!/^capitulos\/[\w-]+\.md$/.test(chapter.file))throw Error('Caminho de capítulo inválido');
 const md=await fetch(chapter.file).then(r=>{if(!r.ok)throw Error('Capítulo indisponível');return r.text()});
 article.replaceChildren();
 for(const block of BNMarkdown.parse(md)){
  if(block.type==='heading'){const h=document.createElement('h'+block.level);appendInline(h,block.inlines);article.append(h)}
  if(block.type==='paragraph'){const p=document.createElement('p');appendInline(p,block.inlines);article.append(p)}
  if(block.type==='separator'){const hr=document.createElement('hr');hr.setAttribute('aria-label','Separação de cena');article.append(hr)}
  if(block.type==='image'){
   const fig=document.createElement('figure'),img=document.createElement('img'),cap=document.createElement('figcaption');
   img.src=block.src;img.alt=block.alt;img.decoding='async';img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label','Ampliar ilustração: '+block.alt);cap.textContent=block.alt;fig.append(img,cap);article.append(fig);
   const show=()=>{document.getElementById('big').src=img.src;document.getElementById('big').alt=img.alt;document.getElementById('caption').textContent=img.alt;document.getElementById('zoom').showModal()};
   img.addEventListener('click',show);img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show()}});
  }
 }
 }catch(err){article.textContent='Não foi possível carregar esta prévia: '+err.message}
})();
const cont=document.getElementById('continuous'),pages=document.getElementById('pages');
const article=document.getElementById('chapter'),nav=document.getElementById('page-navigation'),previous=document.getElementById('previous'),next=document.getElementById('next'),status=document.getElementById('page-status');
let index=0,total=1,resizeTimer;
function pageMetrics(){const style=getComputedStyle(article);const pad=parseFloat(style.paddingLeft)+parseFloat(style.paddingRight);return {width:Math.max(1,article.clientWidth),inner:Math.max(1,article.clientWidth-pad)}}
function setupPagination(){
 if(!document.body.classList.contains('pagina'))return;
 const m=pageMetrics();article.style.columnWidth=m.inner+'px';
 // Browser layout provides the true horizontal span of the CSS columns.
 total=Math.max(1,Math.ceil((article.scrollWidth-1)/m.width));
 index=Math.min(index,total-1);article.scrollLeft=index*m.width;
 status.textContent='Página '+(index+1)+' de '+total;
 previous.disabled=index===0;next.disabled=index>=total-1;
}
function mode(paged){
 document.body.classList.toggle('pagina',paged);
 cont.setAttribute('aria-pressed',String(!paged));pages.setAttribute('aria-pressed',String(paged));
 nav.hidden=!paged;
 if(!paged){article.style.columnWidth='';article.scrollLeft=0;index=0;return}
 index=0;requestAnimationFrame(setupPagination);
}
function move(delta){index=Math.max(0,Math.min(total-1,index+delta));setupPagination();article.focus({preventScroll:true})}
cont.addEventListener('click',()=>mode(false));pages.addEventListener('click',()=>mode(true));
previous.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(setupPagination,150)});
new MutationObserver(()=>{for(const img of article.querySelectorAll('img')){if(!img.dataset.pageLoad){img.dataset.pageLoad='1';img.addEventListener('load',setupPagination)}}}).observe(article,{childList:true,subtree:true});
document.getElementById('close').addEventListener('click',()=>document.getElementById('zoom').close());
