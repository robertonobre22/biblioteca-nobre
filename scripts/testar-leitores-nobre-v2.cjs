'use strict';
const { chromium } = require('playwright');
const assert = require('node:assert/strict');

const BASE='http://127.0.0.1:8765/';
const viewports=[
 {name:'celular',width:390,height:844},
 {name:'tablet',width:768,height:1024},
 {name:'computador',width:1366,height:768}
];
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  for(const vp of viewports){
   for(const book of ['ostean','bunker']){
    const page=await browser.newPage({viewport:{width:vp.width,height:vp.height},deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(BASE+(book==='ostean'?'ostean-previa-capa-ampliavel.html':'o-bunker.html'),{waitUntil:'domcontentloaded'});
    await page.locator('body').waitFor();
    assert.equal(await page.locator('link[rel="icon"]').count()>0,true,book+': favicon ausente');
    if(book==='ostean'){
     assert.equal(await page.locator('.unit').count(),88);
     assert.equal(await page.locator('.reader figure').count(),28);
     await page.locator('#home').click();
     await page.locator('.cover img').waitFor({state:'visible'});
     await page.locator('#jump').selectOption('0');
     await page.locator('#view').selectOption('continuous');
     assert.equal(await page.locator('.unit.active').count(),1);
     await page.locator('#view').selectOption('page');
     await page.locator('#bigger').click();
     await page.locator('#theme').click();
     await page.locator('#theme').click();
    }else{
     assert.equal(await page.locator('.bunker-chapter').count(),2);
     await page.locator('#chapter-select').selectOption('1');
     await page.locator('#reading-mode').selectOption('pages');
     if(await page.locator('#page-next').isEnabled()) await page.locator('#page-next').click();
     await page.locator('#reading-mode').selectOption('continuous');
     await page.locator('#night').click();
     await page.locator('#night').click();
    }
    const horizontal=await page.evaluate(()=>({
      viewport:document.documentElement.clientWidth,
      scroll:document.documentElement.scrollWidth,
      body:document.body.scrollWidth
    }));
    assert(horizontal.scroll<=horizontal.viewport+2,
     book+' '+vp.name+': rolagem horizontal: '+JSON.stringify(horizontal));
    assert.equal(errors.length,0,book+' '+vp.name+': '+errors.join('; '));
    await page.screenshot({path:'/tmp/'+book+'-'+vp.name+'.png',fullPage:false});
    console.log('OK '+book+' '+vp.name+': favicon, controles, narrativa, sem erros e sem overflow');
    await page.close();
   }
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
