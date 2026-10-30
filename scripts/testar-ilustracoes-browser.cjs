'use strict';
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  for(const size of [{width:1366,height:768,name:'desktop'},{width:390,height:844,name:'celular'}]){
   const page=await browser.newPage({viewport:size});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   const text='A abertura descreve as Brumas, a estrada e os viajantes. ';
   const md='# Capítulo experimental\n\n'+Array.from({length:18},(_,i)=>'Parte '+i+'. '+text.repeat(8)).join('\n\n')+'\n\n![Ilustração grande](imagens/exemplo.png)\n\nFim da cena.';
   await page.route('**/capitulo-01.md',route=>route.fulfill({status:200,contentType:'text/markdown',body:md}));
   await page.route('**/imagens/exemplo.png',route=>route.fulfill({status:200,contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1600"><rect width="900" height="1600" fill="#b6a48b"/></svg>'}));
   await page.goto('http://127.0.0.1:8765/exemplos/livro-ilustrado/index.html');
   const img=page.locator('#chapter figure img');await img.waitFor();
   await img.evaluate(el=>el.decode());
   await page.getByRole('button',{name:'Visual de página'}).click();
   await page.waitForTimeout(200);
   const info=await page.evaluate(()=>{const a=document.getElementById('chapter'),im=a.querySelector('figure img'),f=im.closest('figure');return {width:im.getBoundingClientRect().width,height:im.getBoundingClientRect().height,contentWidth:a.clientWidth,figHeight:f.getBoundingClientRect().height,articleHeight:a.clientHeight,naturalRatio:im.naturalWidth/im.naturalHeight}});
   assert(info.width<=info.contentWidth,size.name+': imagem excedeu largura');
   assert(info.figHeight<info.articleHeight,size.name+': figura excedeu altura da página');
   assert(Math.abs(info.width/info.height-info.naturalRatio)<0.02,size.name+': proporção distorcida');
   const pages=await page.locator('#page-status').innerText();assert(/Página 1 de [2-9]\d*/.test(pages),size.name+': paginação ausente: '+pages);
   assert.equal(errors.length,0,errors.join('; '));
   console.log('OK: imagem vertical sem corte/distorção de proporção ('+size.name+')');
   await page.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
