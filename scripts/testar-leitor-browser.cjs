'use strict';
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  for(const viewport of [{width:1366,height:768,name:'desktop'},{width:390,height:844,name:'celular'}]){
   const page=await browser.newPage({viewport:{width:viewport.width,height:viewport.height},deviceScaleFactor:1});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   // Conteúdo ficcional longo para exercer a paginação sem mudar o acervo.
   const paragraph='A pequena crônica experimental descreve a passagem por uma estrada de fantasia, com detalhes e pausas tipográficas. ';
   const demo='# Capítulo de demonstração\n\n'+Array.from({length:44},(_,i)=>'**Cena '+(i+1)+'** — '+paragraph.repeat(5)).join('\n\n')+'\n\n![Um ponto gráfico ilustrativo](imagens/exemplo.png)\n\nFim da demonstração.';
   await page.route('**/exemplos/livro-ilustrado/capitulos/capitulo-01.md',route=>route.fulfill({status:200,contentType:'text/markdown; charset=utf-8',body:demo}));
   await page.goto('http://127.0.0.1:8765/exemplos/livro-ilustrado/index.html');
   await page.locator('#chapter p').first().waitFor();
   assert.equal(await page.locator('#chapter figure').count(),1);
   await page.getByRole('button',{name:'Visual de página'}).click();
   await page.waitForTimeout(250);
   const status=await page.locator('#page-status').innerText();
   const total=Number(status.match(/de (\d+)/)?.[1]||0);
   assert(total>1,viewport.name+': não dividiu o texto longo: '+status);
   await page.locator('#next').click();
   assert.match(await page.locator('#page-status').innerText(),/Página 2 de /);
   assert(!await page.locator('#previous').isDisabled());
   const metrics=await page.locator('#chapter').evaluate(el=>({scrollWidth:el.scrollWidth,clientWidth:el.clientWidth,scrollLeft:el.scrollLeft}));
   assert(metrics.scrollLeft>0,viewport.name+': página não avançou visualmente');
   await page.getByRole('button',{name:'Leitura contínua'}).click();
   assert(await page.locator('#page-navigation').isHidden());
   const heading=await page.locator('#chapter h1').innerText();assert(heading.includes('Capítulo'));
   assert.equal(errors.length,0,errors.join('; '));
   console.log('OK '+viewport.name+': '+total+' páginas, avançar/voltar, ilustração e leitura contínua');
   await page.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
