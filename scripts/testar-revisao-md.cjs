'use strict';
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),cp=require('node:child_process'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),folder=path.join(root,'exemplos/livro-ilustrado'),temp=fs.mkdtempSync(path.join(os.tmpdir(),'bn-md-'));
try{
 const source=fs.readFileSync(path.join(folder,'capitulos/capitulo-01.md'),'utf8');
 const manifest=fs.readFileSync(path.join(folder,'manifesto.json'),'utf8');
 const updated=source.replace('A segunda frase aparece','Uma frase revisada aparece');
 const incoming=path.join(temp,'novo.md'),out=path.join(temp,'revisado.md');fs.writeFileSync(incoming,updated);
 const call=()=>cp.spawnSync(process.execPath,[path.join(root,'scripts/revisar-capitulo-md.cjs'),'--manifesto',path.join(folder,'manifesto.json'),'--capitulo','c001','--novo',incoming,'--saida',out],{encoding:'utf8'});
 let r=call();assert.equal(r.status,0,r.stderr);
 const report=JSON.parse(fs.readFileSync(out+'.relatorio.json','utf8'));
 assert.equal(report.publicado,false);assert.equal(report.imagensAlteradas,false);
 assert.deepEqual(report.imagensAntes,report.imagensDepois);
 assert.equal(fs.readFileSync(out,'utf8'),updated);
 assert.equal(fs.readFileSync(path.join(folder,'capitulos/capitulo-01.md'),'utf8'),source);
 assert.equal(fs.readFileSync(path.join(folder,'manifesto.json'),'utf8'),manifest);
 assert.notEqual(call().status,0,'Não pode sobrescrever arquivo revisado');
 fs.writeFileSync(path.join(temp,'sem-imagem.md'),'Texto novo.\n\n![Ausente](imagens/ausente.png)\n');
 r=cp.spawnSync(process.execPath,[path.join(root,'scripts/revisar-capitulo-md.cjs'),'--manifesto',path.join(folder,'manifesto.json'),'--capitulo','c001','--novo',path.join(temp,'sem-imagem.md'),'--saida',path.join(temp,'outra.md')],{encoding:'utf8'});
 assert.notEqual(r.status,0,'Referência de imagem inexistente precisa falhar');
 console.log('OK: capítulo preservado, imagens conferidas, relatório criado e sobrescrita bloqueada');
}finally{fs.rmSync(temp,{force:true,recursive:true})}
