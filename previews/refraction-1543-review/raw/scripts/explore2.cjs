const L=require('./lib.cjs');
(async()=>{const {b,page,errs,loadS}=await L.open(process.argv[2]); console.log('load',loadS);
 const info=()=>page.evaluate(()=>{const w=window.witch,g=w.game,v=w.view,p=v.post;return {t:g.clock.time,spellAt:g.party.spellAt,x:g.witch.x,z:g.witch.z,seated:g.witch.seated,po:v.partyObjects.ready,fires:v.worldFires.map(f=>[+(f.x-g.witch.x).toFixed(1),+(f.z-g.witch.z).toFixed(1),+f.scale.toFixed(2)]),count:p.refraction.count,states:p.refraction.states.slice(0,p.refraction.count).map(s=>s.toArray().map(x=>+x.toFixed(3))),shapes:p.refraction.shapes.slice(0,p.refraction.count).map(s=>s.toArray().map(x=>+x.toFixed(3))),mush:!!g.mushrooms, trips:g.mushrooms&&Object.keys(g.mushrooms.trips||{})}});
 console.log(JSON.stringify(await L.step(page,30)), JSON.stringify(await info()));
 await L.settle(page); console.log(JSON.stringify(await info()));
 let r=await L.step(page,3,{castParty:true},1); console.log('cast',JSON.stringify(r),JSON.stringify(await info()));
 await page.screenshot({path:'/tmp/qa/e2-cast.png'});
 for(let k=0;k<6;k++){ r=await L.step(page,300,{},30); await L.idle(page); console.log(JSON.stringify(r),JSON.stringify(await info())); }
 await page.screenshot({path:'/tmp/qa/e2-late.png'}); console.log(errs.join('\n')); await b.close();})();
