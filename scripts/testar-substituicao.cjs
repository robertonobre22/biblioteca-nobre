'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),dir=fs.mkdtempSync(path.join(os.tmpdir(),'biblioteca-troca-'));
try {
 const source=path.join(root,'livros/darius.json'),book=JSON.parse(fs.readFileSync(source,'utf8'));
 const fresh={title:book.chapters[0].title,paragraphs:['Parágrafo temporário de teste; não publica conteúdo.']};
 const input=path.join(dir,'novo.json'),output=path.join(dir,'saida.json');
 fs.writeFileSync(input,JSON.stringify(fresh));
 const r=cp.spawnSync(process.execPath,[path.join(root,'scripts/preparar-substituicao.cjs'),'--livro','livros/darius.json','--indice','1','--entrada',input,'--saida',output],{cwd:root,encoding:'utf8'});
 assert.equal(r.status,0,r.stderr);
 const prepared=JSON.parse(fs.readFileSync(output,'utf8'));
 assert.equal(prepared.chapters.length,book.chapters.length);
 assert.equal(prepared.chapters[0].paragraphs[0],fresh.paragraphs[0]);
 assert.deepEqual(prepared.chapters.slice(1),book.chapters.slice(1));
 assert.deepEqual(JSON.parse(fs.readFileSync(source,'utf8')),book);
 const again=cp.spawnSync(process.execPath,[path.join(root,'scripts/preparar-substituicao.cjs'),'--livro','livros/darius.json','--indice','1','--entrada',input,'--saida',output],{cwd:root});
 assert.notEqual(again.status,0,'Nunca sobrescrever uma prévia existente');
 console.log('OK: substituição isolada, original preservado e sobrescrita bloqueada.');
} finally {fs.rmSync(dir,{recursive:true,force:true})}
