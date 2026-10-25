'use strict';
(async()=>{
 const load=async file=>{const r=await fetch(file);if(!r.ok)throw Error('Arquivo indisponível: '+file);return r.text()};
 function blocks(md){return md.replace(/\r\n/g,'\n').split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean).filter(x=>!/^# /.test(x))}
 function tokenize(block){const im=block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);return im?{type:'image',text:im[1]+' — '+im[2]}:{type:'text',text:block.replace(/\s*\n\s*/g,' ')}}
 function align(a,b){
  const n=a.length,m=b.length,dp=Array.from({length:n+1},()=>Array(m+1).fill(0));
  for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)dp[i][j]=a[i].text===b[j].text&&a[i].type===b[j].type?1+dp[i+1][j+1]:Math.max(dp[i+1][j],dp[i][j+1]);
  const left=[],right=[];let i=0,j=0;
  while(i<n||j<m){if(i<n&&j<m&&a[i].text===b[j].text&&a[i].type===b[j].type){left.push({...a[i],state:'same'});right.push({...b[j],state:'same'});i++;j++}
   else if(j<m&&(i===n||dp[i][j+1]>=dp[i+1][j])){right.push({...b[j],state:'added'});j++}
   else{left.push({...a[i],state:'removed'});i++}}
  return {left,right};
 }
 function render(id,items){const element=document.getElementById(id);for(const item of items){const node=document.createElement('p');node.className='block '+(item.type==='image'?'image ':'')+(item.state==='same'?'':item.state);node.textContent=item.type==='image'?'Ilustração: '+item.text:item.text;element.append(node)}}
 try{const [oldText,newText]=await Promise.all([load('capitulos/capitulo-01.md'),load('capitulos/capitulo-01-revisado.md')]);const result=align(blocks(oldText).map(tokenize),blocks(newText).map(tokenize));render('before',result.left);render('after',result.right);const removed=result.left.filter(x=>x.state==='removed').length,added=result.right.filter(x=>x.state==='added').length;document.getElementById('summary').textContent=removed+' bloco(s) anterior(es) removido(s) ou alterado(s); '+added+' bloco(s) novo(s) ou alterado(s). Itens marcados por cor indicam diferenças de blocos, não de palavras.'}catch(e){document.getElementById('summary').textContent='Falha ao carregar comparação: '+e.message}
})();