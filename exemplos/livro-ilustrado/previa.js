'use strict';
(async()=>{
 const article=document.getElementById('chapter');
 try{
 const manifest=await fetch('manifesto.json').then(r=>{if(!r.ok)throw Error('Manifesto indisponível');return r.json()});
 const chapter=manifest.chapters[0];if(!/^capitulos\/[\w-]+\.md$/.test(chapter.file))throw Error('Caminho de capítulo inválido');
 const md=await fetch(chapter.file).then(r=>{if(!r.ok)throw Error('Capítulo indisponível');return r.text()});
 article.replaceChildren();const title=document.createElement('h1');title.textContent=chapter.title;article.append(title);
 let buffer=[];function flush(){if(!buffer.length)return;const p=document.createElement('p');p.textContent=buffer.join(' ');article.append(p);buffer=[]}
 for(const line of md.replace(/\r\n/g,'\n').split('\n')){const value=line.trim();if(!value){flush();continue}
 if(value.startsWith('# ')){flush();continue}
 const image=value.match(/^!\[([^\]]*)\]\((imagens\/[\w.-]+\.(?:png|webp|jpe?g))\)$/i);
 if(image){flush();const fig=document.createElement('figure'),img=document.createElement('img'),cap=document.createElement('figcaption');img.src=image[2];img.alt=image[1];img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label','Ampliar ilustração: '+image[1]);cap.textContent=image[1];fig.append(img,cap);article.append(fig);
 const show=()=>{document.getElementById('big').src=img.src;document.getElementById('big').alt=img.alt;document.getElementById('caption').textContent=img.alt;document.getElementById('zoom').showModal()};img.addEventListener('click',show);img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show()}});continue}buffer.push(value)
 }flush()
 }catch(err){article.textContent='Não foi possível carregar esta prévia: '+err.message}
})();
const cont=document.getElementById('continuous'),pages=document.getElementById('pages');cont.addEventListener('click',()=>{document.body.classList.remove('pagina');cont.setAttribute('aria-pressed','true');pages.setAttribute('aria-pressed','false')});pages.addEventListener('click',()=>{document.body.classList.add('pagina');cont.setAttribute('aria-pressed','false');pages.setAttribute('aria-pressed','true')});document.getElementById('close').addEventListener('click',()=>document.getElementById('zoom').close());
