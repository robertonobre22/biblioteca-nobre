// Auditoria HTTP pública: sem credenciais, sem envio de formulários.
const assert=require('node:assert/strict');
const root='https://biblioteca-nobre.pages.dev';
const paths=['/','/ler.html','/darius.html','/poderes-sombrios.html','/entre-tramas-experimental.html','/assets/image-viewer.js','/assets/catalogo.js','/catalogo.json'];
async function get(path){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
 try{const r=await fetch(root+path,{signal:controller.signal,headers:{'User-Agent':'BibliotecaNobre-SiteCheck/1.0','Cache-Control':'no-cache'}});assert(r.ok,path+' retornou HTTP '+r.status);return await r.text()}
 finally{clearTimeout(timer)}
}
(async()=>{
 const results=new Map();
 for(const path of paths){const body=await get(path);assert(body.length>15,path+' vazio');results.set(path,body);console.log('OK',path)}
 const home=results.get('/');
 assert(home.includes('https://forms.gle/BNYQ3cGT5m9xwhoc8'),'Formulário ausente da página principal');
 for(const p of ['/','/ler.html','/darius.html','/poderes-sombrios.html','/entre-tramas-experimental.html']){
  const html=results.get(p);
  assert(html.includes('assets/image-viewer.js'),'Visualizador ausente: '+p);
  assert(html.includes('https://forms.gle/BNYQ3cGT5m9xwhoc8'),'Contato ausente: '+p);
 }
 const data=JSON.parse(results.get('/catalogo.json'));
 for(const book of data.books){for(const property of ['href','cover']){if(!book[property])continue;const path='/'+book[property];if(results.has(path))continue;await get(path);console.log('OK',path)}}
 console.log('Verificação pública concluída com sucesso.');
})().catch(error=>{console.error('FALHA:',error.message);process.exitCode=1});
