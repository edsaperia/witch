const {chromium}=require('playwright');
const C={moveX:0,moveZ:0,toggleMode:false,zoom:0};
async function open(url){
 const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"]});
 const page=await b.newPage({viewport:{width:960,height:540}});
 const errs=[]; page.on('pageerror',e=>errs.push('pageerror: '+e.message)); page.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text())});
 await page.addInitScript(()=>{ let s=12345; Math.random=()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};
   let W; Object.defineProperty(window,'witch',{configurable:true,get(){return W},set(v){W=v; try{v.manual=true}catch(e){}}}); });
 const t0=Date.now(); await page.goto(url);
 await page.waitForFunction(()=>window.witch&&window.witch.ready,null,{timeout:400000,polling:500});
 return {b,page,errs,loadS:(Date.now()-t0)/1000};
}
// step n frames of 1/60 with controls; draw every `every` frames and the last
async function step(page,n,ctrl={},every=10){
 return page.evaluate(({n,ctrl,every,C})=>{const w=window.witch;let frames=0;for(let i=0;i<n;i++){const d=(i%every===every-1)||i===n-1; w.frame({...C,...(i===0?ctrl:{})},1/60,d); if(d)frames++;} return {t:w.game.clock.time,drawn:frames};},{n,ctrl,every,C});
}
async function idle(page){ await page.evaluate(()=>window.witch.view.assets.whenIdle()); }
async function settle(page,rounds=4){ for(let i=0;i<rounds;i++){ await idle(page); await page.evaluate(()=>{const w=window.witch; w.view.render(w.game.clock.time);}); } await idle(page); }
module.exports={open,step,idle,settle,C};
