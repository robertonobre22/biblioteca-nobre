// Verificações locais sem dependências nem acesso a informações privadas.
const fs=require('node:fs');const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');const exists=p=>fs.existsSync(path.join(root,p));
const catalog=JSON.parse(fs.readFileSync(path.join(root,'catalogo.json'),'utf8'));
assert(Array.isArray(catalog.books)&&catalog.books.length>0,'Catálogo sem livros');
const seen=new Set();let count=0;
for(const b of catalog.books){
 assert(typeof b.id==='string'&&/^[a-z0-9-]+$/.test(b.id),'ID inválido');
 assert(!seen.has(b.id),'ID duplicado: '+b.id);seen.add(b.id);
 assert(typeof b.title==='string'&&b.title.trim(),'Título ausente');
 for(const field of ['href','cover']){
  if(!b[field])continue;
  assert(!/^(https?:|\/\/)/i.test(b[field]),field+' externo não permitido em '+b.id);
  assert(!b[field].includes('..'),'Caminho inseguro em '+b.id);
  assert(exists(b[field]),field+' não encontrado: '+b[field]);count++;
 }
}
const htmls=fs.readdirSync(root).filter(f=>f.endsWith('.html'));
for(const file of htmls){
 const html=fs.readFileSync(path.join(root,file),'utf8');
 assert(!/^(<<<<<<< |=======|>>>>>>> )/m.test(html),'Marcador de conflito em '+file);
 const links=[...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)].map(m=>m[1]);
 for(const link of links){
  if(/^(https?:|mailto:|tel:|#|data:|\/\/)/i.test(link))continue;
  const clean=decodeURIComponent(link.split(/[?#]/)[0]);
  if(!clean||clean.startsWith('/'))continue;
  assert(!clean.includes('..'),'Referência insegura: '+file+' → '+clean);
  assert(exists(clean),'Referência ausente: '+file+' → '+clean);
 }
}
console.log('OK: '+catalog.books.length+' obras, '+count+' referências de catálogo, '+htmls.length+' páginas HTML verificadas.');
