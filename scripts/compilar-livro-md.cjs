'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
function build(manifestPath){
 const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8')),folder=path.dirname(manifestPath);
 assert(manifest.id&&Array.isArray(manifest.chapters)&&manifest.chapters.length,'Manifesto inválido');
 const chapters=manifest.chapters.map((item,i)=>{
  assert(/^capitulos\/[\w-]+\.md$/.test(item.file),'Caminho do capítulo inválido');
  const lines=fs.readFileSync(path.join(folder,item.file),'utf8').replace(/\r\n/g,'\n').split('\n');
  const blocks=[];let buffer=[];
  const flush=()=>{if(buffer.length){blocks.push({type:'paragraph',text:buffer.join(' ').trim()});buffer=[]}};
  for(const line of lines){const trimmed=line.trim();if(!trimmed){flush();continue}
   const image=trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
   if(image){flush();assert(/^imagens\/[\w.-]+\.(webp|png|jpg|jpeg)$/i.test(image[2]),'Imagem fora da pasta');assert(fs.existsSync(path.join(folder,image[2])),'Imagem ausente');blocks.push({type:'image',src:image[2],alt:image[1]});continue}
   assert(!trimmed.startsWith('<'),'HTML não suportado neste protótipo');
   if(trimmed.startsWith('# ')){flush();continue}
   buffer.push(trimmed);
  }flush();assert(blocks.length,'Capítulo vazio');return {id:item.id||String(i+1),title:item.title,blocks};
 });
 return {id:manifest.id,title:manifest.title,chapters};
}
module.exports={build};
if(require.main===module){const [input,output]=process.argv.slice(2);assert(input&&output,'Informe manifesto e caminho de saída');fs.writeFileSync(output,JSON.stringify(build(path.resolve(input)),null,2)+'\n',{flag:'wx'});console.log('Arquivo intermediário gerado:',output)}
