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
   img.src=block.src;img.alt=block.alt;img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label','Ampliar ilustração: '+block.alt);cap.textContent=block.alt;fig.append(img,cap);article.append(fig);
   const show=()=>{document.getElementById('big').src=img.src;document.getElementById('big').alt=img.alt;document.getElementById('caption').textContent=img.alt;document.getElementById('zoom').showModal()};
   img.addEventListener('click',show);img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show()}});
  }
 }
 }catch(err){article.textContent='Não foi possível carregar esta prévia: '+err.message}
})();
const cont=document.getElementById('continuous'),pages=document.getElementById('pages');cont.addEventListener('click',()=>{document.body.classList.remove('pagina');cont.setAttribute('aria-pressed','true');pages.setAttribute('aria-pressed','false')});pages.addEventListener('click',()=>{document.body.classList.add('pagina');cont.setAttribute('aria-pressed','false');pages.setAttribute('aria-pressed','true')});document.getElementById('close').addEventListener('click',()=>document.getElementById('zoom').close());
