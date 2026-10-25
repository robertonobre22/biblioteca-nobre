/* Biblioteca Nobre — visualização ampliada de imagens públicas.
   Funciona com capas e ilustrações inseridas dinamicamente pelos leitores. */
(()=>{'use strict';
const selector='.book-cover img, .chapter-figure img, .sheet img, .container img';
const style=document.createElement('style');
style.textContent=`
.bn-zoomable{cursor:zoom-in}
.bn-image-viewer{position:fixed;inset:0;z-index:9999;background:rgba(9,6,14,.96);display:flex;align-items:center;justify-content:center;padding:64px 18px 24px}
.bn-image-viewer[hidden]{display:none}
.bn-image-viewer img{display:block;max-width:100%;max-height:calc(100dvh - 110px);width:auto;height:auto;object-fit:contain;box-shadow:0 8px 40px #0009;cursor:zoom-out}
.bn-image-viewer button{position:absolute;top:12px;right:12px;min-height:44px;padding:10px 15px;border-radius:6px;background:#f3e4d0;color:#221825;border:2px solid #d1ab73;font:600 16px system-ui;cursor:pointer}
.bn-image-viewer .bn-caption{position:absolute;bottom:0;left:8px;right:8px;text-align:center;padding:6px;color:#f4e3ca;font:14px system-ui}
body.bn-image-viewer-open{overflow:hidden}
.bn-zoomable:focus-visible,.bn-image-viewer button:focus-visible{outline:3px solid #e6bc7a;outline-offset:4px}
`;
document.head.append(style);
const overlay=document.createElement('div');overlay.className='bn-image-viewer';overlay.hidden=true;overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Imagem ampliada');
const image=document.createElement('img');const close=document.createElement('button');close.type='button';close.textContent='Fechar ×';close.setAttribute('aria-label','Fechar imagem ampliada');
const caption=document.createElement('div');caption.className='bn-caption';overlay.append(image,close,caption);document.body.append(overlay);
let previous=null;
function dismiss(){if(overlay.hidden)return;overlay.hidden=true;image.removeAttribute('src');document.body.classList.remove('bn-image-viewer-open');if(previous&&previous.isConnected)previous.focus();previous=null}
function open(original){previous=original;image.src=original.currentSrc||original.src;image.alt=original.alt||'Ilustração ampliada';caption.textContent=original.alt||'';overlay.hidden=false;document.body.classList.add('bn-image-viewer-open');close.focus()}
function eligible(img){return img.matches(selector)&&!!(img.currentSrc||img.src)}
function enrich(root){const images=root.nodeType===1?[...(root.matches('img')?[root]:[]),...root.querySelectorAll('img')]:[];for(const img of images){if(!eligible(img)||img.dataset.bnZoom==='1')continue;img.dataset.bnZoom='1';img.classList.add('bn-zoomable');img.setAttribute('tabindex','0');img.setAttribute('role','button');img.setAttribute('aria-label','Ampliar '+(img.alt||'imagem'));img.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();open(img)}})}}
document.addEventListener('click',event=>{const img=event.target.closest?.('img');if(img&&eligible(img)){event.preventDefault();open(img)}});close.addEventListener('click',dismiss);overlay.addEventListener('click',event=>{if(event.target===overlay||event.target===image)dismiss()});document.addEventListener('keydown',event=>{if(overlay.hidden)return;if(event.key==='Escape'){event.preventDefault();dismiss()}if(event.key==='Tab'){event.preventDefault();close.focus()}});
enrich(document.body);new MutationObserver(changes=>{for(const change of changes){for(const node of change.addedNodes){if(node.nodeType===1)enrich(node)}}}).observe(document.body,{childList:true,subtree:true});
})();