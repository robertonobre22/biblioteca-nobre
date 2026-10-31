'use strict';
const { chromium }=require('playwright');
const assert=require('node:assert/strict');
const pages=[
 ['estante','index.html'],['netheril','ler.html'],['darius','darius.html'],
 ['strahd','poderes-sombrios.html'],['elaris','entre-tramas-experimental.html'],
 ['bunker','o-bunker.html'],['ostean','ostean-previa-capa-ampliavel.html']
];
const screens=[{name:'celular',width:390,height:844},{name:'tablet',width:768,height:1024},{name:'desktop',width:1366,height:768}];
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  for(const screen of screens)for(const [name,pathname] of pages){
   const page=await browser.newPage({viewport:{width:screen.width,height:screen.height}});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   const response=await page.goto('http://127.0.0.1:8765/'+pathname,{waitUntil:'domcontentloaded'});
   assert.equal(response.status(),200,name+' http');
   await page.locator('.bn-site-header .bn-brand').waitFor();
   const css=await page.evaluate(()=>[...document.styleSheets].some(s=>s.href?.includes('biblioteca-nobre-unificado.css')));
   assert(css,'missing common CSS '+name);
   const m=await page.evaluate(()=>({viewport:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
   assert(m.scroll<=m.viewport+3,name+' '+screen.name+' overflow '+JSON.stringify(m));
   if(name==='bunker'){
    assert.equal(await page.locator('.bunker-chapter').count(),2);
    await page.locator('#chapter-select').selectOption('1');
    await page.locator('#night').click();await page.locator('#night').click();
   }
   if(name==='ostean'){
    assert.equal(await page.locator('.unit').count(),88);
    assert.equal(await page.locator('figure').count()>=28,true);
    await page.locator('#view').selectOption('continuous');
    await page.locator('#theme').click();
   }
   if(['netheril','darius','strahd'].includes(name))assert.equal(await page.locator('#chapter').count(),1);
   if(name==='elaris')assert.equal(await page.locator('.sheet').count(),1);
   assert.equal(errors.length,0,name+' '+screen.name+': '+errors.join('; '));
   await page.screenshot({path:'/tmp/bn-'+name+'-'+screen.name+'.png',fullPage:false});
   console.log('OK '+name+' '+screen.name);
   await page.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
