// Read-only diagnosis: for each real fire, stage her 1 m south as the helper does and record which batch draws her.
const L=require('./lib.cjs'),fs=require('fs');
(async()=>{const {b,page,errs}=await L.open(process.argv[2]);
await L.step(page,30); await L.settle(page);
const r=await page.evaluate(async()=>{const w=window.witch,v=w.view,g=w.game;w.manual=true;const t=g.clock.time;const saved={witch:g.witch,camera:g.camera};const out=[];
 const fires=v.worldFires.filter(f=>f.scale>0.1);
 for(const f of fires){for(const d of [1,3,6]){const s=w.shot(`at:${f.x},${f.z+d}`);v.render(t);await v.assets.whenIdle();for(let i=0;i<2;i++)v.render(t);
  out.push({fire:[+f.x.toFixed(1),+f.z.toFixed(1)],d,shot:s.ok,witchBatchItems:v.witchBatch.items.length,bareItems:v.bareBatch?.items?.length??null,hatHas:g.witches[0].hat.has,hatDown:!!g.witches[0].hat.down,herIdle:!!v.partyWitchView.herIdle,mode:g.witch.mode,ground:+w.groundHeight(f.x,f.z+d).toFixed(2)});}}
 g.witch=saved.witch;g.camera=saved.camera;return {t,clockAfter:g.clock.time,out};});
fs.writeFileSync('/tmp/fg/probe2.json',JSON.stringify({r,errs},null,1));console.log(JSON.stringify(r));await b.close();})().catch(e=>{console.error(e);process.exit(1)});
