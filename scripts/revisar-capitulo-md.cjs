#!/usr/bin/env node
'use strict';
// Prepara uma revisão de capítulo Markdown em cópia separada; nunca publica.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const args=process.argv.slice(2);function option(k){const i=args.indexOf(k);return i===-1?null:args[i+1]}
if(args.includes('--help')){console.log('node scripts/revisar-capitulo-md.cjs --manifesto caminho/manifesto.json --capitulo c001 --novo /tmp/novo.md --saida /tmp/revisao.md');process.exit(0)}
try {
 const manifestPath=path.resolve(option('--manifesto')||''),id=option('--capitulo'),fresh=path.resolve(option('--novo')||''),dest=path.resolve(option('--saida')||'');
 assert(id&&option('--manifesto')&&option('--novo')&&option('--saida'),'Parâmetros obrigatórios ausentes');
 assert(dest!==fresh,'A saída não pode substituir o arquivo recebido');
 const folder=path.dirname(manifestPath),manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
 assert(Array.isArray(manifest.chapters),'Manifesto inválido');
 const matches=manifest.chapters.filter(c=>c.id===id);assert(matches.length===1,'ID inexistente ou duplicado');
 const chapter=matches[0];assert(/^capitulos\/[\w-]+\.md$/.test(chapter.file),'Caminho de capítulo inválido');
 const originalPath=path.resolve(folder,chapter.file);
 assert(dest!==originalPath&&dest!==manifestPath,'Nunca sobrescrever obra ou manifesto');
 assert(!fs.existsSync(dest)&&!fs.existsSync(dest+'.relatorio.json'),'Saída existente; escolha outro nome');
 const original=fs.readFileSync(originalPath,'utf8'),next=fs.readFileSync(fresh,'utf8');
 assert(next.trim(),'Capítulo novo está vazio');
 const images=text=>[...text.matchAll(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/gm)].map(m=>({alt:m[1],src:m[2]}));
 const before=images(original),after=images(next);
 for(const im of after){assert(/^imagens\/[\w.-]+\.(png|webp|jpg|jpeg)$/i.test(im.src),'Imagem fora da pasta: '+im.src);assert(fs.existsSync(path.join(folder,im.src)),'Imagem ausente: '+im.src)}
 const sha=t=>crypto.createHash('sha256').update(t).digest('hex');
 const report={obra:manifest.id,capitulo:id,titulo:chapter.title,originalSha256:sha(original),revisaoSha256:sha(next),imagensAntes:before,imagensDepois:after,imagensAlteradas:JSON.stringify(before)!==JSON.stringify(after),paragrafosAntes:original.split(/\n\s*\n/).filter(x=>x.trim()).length,paragrafosDepois:next.split(/\n\s*\n/).filter(x=>x.trim()).length,publicado:false,observacao:'Prévia apenas; comparar conteúdo e imagens, solicitar aprovação antes de publicar.'};
 fs.writeFileSync(dest,next,{flag:'wx'});fs.writeFileSync(dest+'.relatorio.json',JSON.stringify(report,null,2)+'\n',{flag:'wx'});
 console.log(JSON.stringify(report,null,2));
} catch(e){console.error('ERRO: '+e.message);process.exitCode=1}
