const {chromium}=require('playwright');
(async()=>{
 const url=process.argv[2]; const t0=Date.now();
 const b=await chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"]});
 const page=await b.newPage({viewport:{width:960,height:540}});
 const errs=[]; page.on('pageerror',e=>errs.push('pageerror: '+e.message)); page.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text())});
 await page.addInitScript(()=>{ let s=12345; Math.random=()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};
   let W; Object.defineProperty(window,'witch',{configurable:true,get(){return W},set(v){W=v; if(window.__freezeEarly) try{v.manual=true}catch(e){}}});
   window.__freezeEarly = new URLSearchParams(location.search).has('early'); });
 await page.goto(url);
 await page.waitForFunction(()=>window.witch&&window.witch.ready,null,{timeout:400000,polling:500}).catch(e=>console.log('not ready',e.message));
 console.log('ready after',(Date.now()-t0)/1000);
 const s=await page.evaluate(()=>{const w=window.witch,g=w.game,v=w.view;return {manual:w.manual,t:g.clock.time,paused:g.clock.paused,spellAt:g.party.spellAt,x:g.witch.x,z:g.witch.z,mode:g.witch.mode,perch:g.witch.perch,po:v.partyObjects.ready,fires:v.worldFires.length,areas:g.party.areas.size,ref:v.post.refractionEnabled,dance:g.map.dancefloor, beach:v.beachView?.on}});
 console.log(JSON.stringify(s)); console.log(errs.join('\n')); await page.screenshot({path:'/tmp/qa/explore.png'}); await b.close();
})();
