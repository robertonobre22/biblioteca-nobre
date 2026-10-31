'use strict';
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  for(const vp of [{name:'celular',width:390,height:844},{name:'tablet',width:768,height:1024},{name:'computador',width:1366,height:768}]){
   const page=await browser.newPage({viewport:{width:vp.width,height:vp.height},deviceScaleFactor:1});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto('http://127.0.0.1:8765/index.html');
   await page.locator('.book-card').first().waitFor();
   assert.equal(await page.locator('.book-card').count(),6);
   assert.equal(await page.locator('.featured-book').count(),3);
   const over=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
   assert(over.scroll<=over.width+2,'rolagem horizontal '+vp.name+': '+JSON.stringify(over));
   await page.locator('[data-filter="Romance"]').click();assert.equal(await page.locator('.book-card').count(),2);
   await page.locator('[data-filter="all"]').click();assert.equal(await page.locator('.book-card').count(),6);
   await page.locator('#search').fill('Bunker');assert.equal(await page.locator('.book-card').count(),1);
   await page.locator('#search').fill('');assert.equal(await page.locator('.book-card').count(),6);
   await page.locator('#feature-next').click();
   await page.waitForTimeout(450);
   assert.equal(errors.length,0,errors.join('; '));
   await page.screenshot({path:'/tmp/capa-biblioteca-'+vp.name+'.png',fullPage:true});
   console.log('OK '+vp.name+': 6 obras, filtro, busca, destaques e sem overflow');
   await page.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});