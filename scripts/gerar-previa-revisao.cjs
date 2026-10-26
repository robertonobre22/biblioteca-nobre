#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const args=process.argv.slice(2);function opt(name){let i=args.indexOf(name);return i<0?null:args[i+1]}
try{
 const base=opt('--obra'),id=opt('--capitulo'),novo=opt('--novo'),saida=opt('--saida');
 assert(base&&id&&novo&&saida,'Obrigatórios: --obra, --capitulo, --novo, --saida');
 const dir=path.resolve(base),dest=path.resolve(saida),manifest=JSON.parse(fs.readFileSync(path.join(dir,'manifesto.json'),'utf8'));
 const items=manifest.chapters.filter(c=>c.id===id);assert(items.length===1,'Capítulo inexistente ou duplicado');
 const file=items[0].file;assert(/^capitulos\/[\w-]+\.md$/.test(file),'Caminho inválido');
 const src=path.join(dir,file),old=fs.readFileSync(src,'utf8'),text=fs.readFileSync(novo,'utf8');
 assert(text.trim(),'Revisão vazia');
 assert(!dest.startsWith(dir+path.sep)&&dest!==dir,'Saída deve ficar fora da obra para não alterar material publicado');
 assert(!fs.existsSync(dest),'Pasta de saída já existe');
 const images=t=>[...t.matchAll(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/gm)].map(m=>({alt:m[1],src:m[2]}));
 for(const im of images(text)){assert(/^imagens\/[\w.-]+\.(png|webp|jpg|jpeg)$/i.test(im.src),'Imagem inválida: '+im.src);assert(fs.existsSync(path.join(dir,im.src)),'Imagem inexistente: '+im.src)}
 fs.mkdirSync(dest,{recursive:true});
 const relative='capitulos/original.md',review='capitulos/revisado.md';
 fs.mkdirSync(path.join(dest,'capitulos'));
 fs.writeFileSync(path.join(dest,relative),old,{flag:'wx'});
 fs.writeFileSync(path.join(dest,review),text,{flag:'wx'});
 const sha=v=>crypto.createHash('sha256').update(v).digest('hex');
 const report={obra:manifest.id,capitulo:id,titulo:items[0].title,original:'capitulos/original.md',revisao:'capitulos/revisado.md',shaOriginal:sha(old),shaRevisado:sha(text),imagensOriginal:images(old),imagensRevisao:images(text),publicado:false};
 fs.writeFileSync(path.join(dest,'revisao.json'),JSON.stringify(report,null,2)+'\n',{flag:'wx'});
 const template=fs.readFileSync(path.join(__dirname,'../exemplos/livro-ilustrado/comparacao.html'),'utf8');
 const viewer=fs.readFileSync(path.join(__dirname,'../exemplos/livro-ilustrado/comparar.js'),'utf8');
 fs.writeFileSync(path.join(dest,'index.html'),template.replace('src="comparar.js"','src="comparar.js"'),{flag:'wx'});
 fs.writeFileSync(path.join(dest,'comparar.js'),viewer.replaceAll("'capitulos/capitulo-01.md'","'capitulos/original.md'").replaceAll("'capitulos/capitulo-01-revisado.md'","'capitulos/revisado.md'"),{flag:'wx'});
 console.log(JSON.stringify({dest,report},null,2));
}catch(e){console.error('ERRO: '+e.message);process.exitCode=1}
