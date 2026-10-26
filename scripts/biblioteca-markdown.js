/* Parser restrito para texto literário: sem HTML executável. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.BNMarkdown=api})(typeof globalThis!=='undefined'?globalThis:this,function(){
 function inline(text){
  const tokens=[];const re=/(\*\*([^*\n]+)\*\*|__([^_\n]+)__|\*([^*\n]+)\*|_([^_\n]+)_)/g;let at=0,m;
  while((m=re.exec(text))){if(m.index>at)tokens.push({type:'text',text:text.slice(at,m.index)});tokens.push({type:m[2]||m[3]?'strong':'em',text:m[2]||m[3]||m[4]||m[5]});at=re.lastIndex}
  if(at<text.length)tokens.push({type:'text',text:text.slice(at)});return tokens.length?tokens:[{type:'text',text}];
 }
 function parse(markdown){
  const lines=markdown.replace(/\r\n?/g,'\n').split('\n');const blocks=[];let buffer=[];
  const flush=()=>{if(buffer.length){const text=buffer.join(' ').trim();if(text)blocks.push({type:'paragraph',text,inlines:inline(text)});buffer=[]}};
  for(const line of lines){const s=line.trim();if(!s){flush();continue}
   if(/^<[^>]*>/.test(s))throw Error('HTML não permitido neste formato');
   const image=s.match(/^!\[([^\]]*)\]\((imagens\/[\w.-]+\.(?:webp|png|jpe?g))\)$/i);
   if(image){flush();blocks.push({type:'image',alt:image[1],src:image[2]});continue}
   if(/^!\[/.test(s))throw Error('Referência de imagem inválida: '+s);
   const heading=s.match(/^(#{1,3})\s+(.+)$/);
   if(heading){flush();blocks.push({type:'heading',level:heading[1].length,text:heading[2],inlines:inline(heading[2])});continue}
   if(/^(\*\s*\*\s*\*|---+|___+)$/.test(s)){flush();blocks.push({type:'separator'});continue}
   buffer.push(s);
  }flush();return blocks;
 }
 return {parse,inline};
});
