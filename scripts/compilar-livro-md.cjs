'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {parse}=require('./biblioteca-markdown.js');
function build(manifestPath){
 const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8')),folder=path.dirname(manifestPath);
 assert(manifest.id&&Array.isArray(manifest.chapters)&&manifest.chapters.length,'Manifesto inválido');
 const chapters=manifest.chapters.map((item,i)=>{
  assert(/^capitulos\/[\w-]+\.md$/.test(item.file),'Caminho do capítulo inválido');
  const blocks=parse(fs.readFileSync(path.join(folder,item.file),'utf8'));
  for(const b of blocks)if(b.type==='image')assert(fs.existsSync(path.join(folder,b.src)),'Imagem não encontrada: '+b.src);
  assert(blocks.length,'Capítulo vazio');return {id:item.id||String(i+1),title:item.title,blocks};
 });
 return {id:manifest.id,title:manifest.title,chapters};
}
module.exports={build};
if(require.main===module){const [input,output]=process.argv.slice(2);assert(input&&output,'Informe manifesto e caminho de saída');fs.writeFileSync(output,JSON.stringify(build(path.resolve(input)),null,2)+'\n',{flag:'wx'});console.log('Arquivo intermediário gerado:',output)}
