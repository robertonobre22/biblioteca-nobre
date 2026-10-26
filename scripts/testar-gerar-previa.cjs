'use strict';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),book=path.join(root,'exemplos/livro-ilustrado'),temp=fs.mkdtempSync(path.join(os.tmpdir(),'bn-previews-'));
try{
 const source=fs.readFileSync(path.join(book,'capitulos/capitulo-01.md'),'utf8');
 const updated=fs.readFileSync(path.join(book,'capitulos/capitulo-01-revisado.md'),'utf8');
 const newer=path.join(temp,'novo.md'),dest=path.join(temp,'saida');fs.writeFileSync(newer,updated);
 const cmd=()=>cp.spawnSync(process.execPath,[path.join(root,'scripts/gerar-previa-revisao.cjs'),'--obra',book,'--capitulo','c001','--novo',newer,'--saida',dest],{encoding:'utf8'});
 const run=cmd();assert.equal(run.status,0,run.stderr);
 const report=JSON.parse(fs.readFileSync(path.join(dest,'revisao.json'),'utf8'));assert.equal(report.publicado,false);
 assert.equal(fs.readFileSync(path.join(dest,report.original),'utf8'),source);
 assert.equal(fs.readFileSync(path.join(dest,report.revisao),'utf8'),updated);
 assert.equal(fs.readFileSync(path.join(book,'capitulos/capitulo-01.md'),'utf8'),source);
 assert(fs.readFileSync(path.join(dest,'comparar.js'),'utf8').includes("'capitulos/original.md'"));
 assert.notEqual(cmd().status,0,'Sobrescrita indevida');
 console.log('OK: prévia de revisão gerada, sem alteração do livro.');
}finally{fs.rmSync(temp,{recursive:true,force:true})}
