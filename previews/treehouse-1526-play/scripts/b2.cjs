const {start}=require('/tmp/qa/serve.cjs');const pw=require('playwright');const fs=require('fs');
const OUT=process.env.OUT, Q=process.env.Q||'layout=ed&seed=123&quick=1&resume=1', PORT=+(process.env.PORT||8767);
const prop=JSON.parse(fs.readFileSync('/home/user/witch/docs/evidence/treehouse-layout-ed-2026-10-31.v2-proposal.json'));
const pts=prop.objects.filter(p=>p.id.startsWith('hat-point:')).map(p=>({n:+p.id.split(':')[1],x:p.x,z:p.z})).sort((a,b)=>a.n-b.n);
const R={points:pts.length};const errors=[];const log=(k,v)=>{R[k]=v;console.log(k,JSON.stringify(v).slice(0,600));fs.writeFileSync(OUT+'/results.json',JSON.stringify({R,errors},null,1));};
(async()=>{const s=await start(PORT);const b=await pw.chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"]});
const ctx=await b.newContext({viewport:{width:1280,height:720}});const p=await ctx.newPage();
p.on('pageerror',e=>errors.push('pageerror: '+e.message));p.on('console',m=>{if(m.type()==='error')errors.push('console: '+m.text())});
const shot=async n=>{try{await p.screenshot({path:`${OUT}/${n}.png`,timeout:60000})}catch(e){console.log('shotfail',n)}};
const load=async()=>{const t0=Date.now();await p.goto(`http://127.0.0.1:${PORT}/?${Q}`);await p.waitForFunction(()=>window.witch&&window.witch.ready,null,{timeout:300000,polling:500});return (Date.now()-t0)/1000;};
const st=()=>p.evaluate(()=>{const g=window.witch.game,W=g.witches[0];return {x:+g.witch.x.toFixed(2),z:+g.witch.z.toFixed(2),mode:g.witch.mode,perch:!!g.witch.perch,seated:!!g.witch.seated,paused:g.clock.paused,t:+g.clock.time.toFixed(1),wear:W.spells.hat,hatHas:W.hat.has,hatDown:W.hat.down?{x:+W.hat.down.x.toFixed(1),z:+W.hat.down.z.toFixed(1)}:null,left:W.hat.left.map(h=>h.spell),floor:W.house?.hats,overflow:W.house?.hatOverflow,reserved:W.house?.hatReserved,spellAt:g.party?.spellAt??null,wake:g.wake?{beat:g.wake.beat,open:!!g.wake.open}:null}});
const goto=(x,z)=>p.evaluate(([x,z])=>{const g=window.witch.game;g.witch={...g.witch,x,z,vx:0,vz:0,seated:false,perch:true};},[x,z]);
const pressE=async()=>{await p.keyboard.down('e');await p.waitForTimeout(400);await p.keyboard.up('e');await p.waitForTimeout(1500);};
const step=async(name,fn)=>{try{await fn()}catch(e){log(name+'_ERROR',e.message)}};
log('loadSecs',await load());
await step('a',async()=>{
await p.waitForTimeout(6000);
const a0=await st();await shot('a1-wake');
const bed=await p.evaluate(()=>{const g=window.witch.game,s={...g.witch},c={...g.camera};const r=window.witch.shot('object:bed');g.witch=s;g.camera=c;return r;});
log('a_wake',{state:a0,bedFront:bed,distToBedFront:+Math.hypot(a0.x-bed.x,a0.z-bed.z).toFixed(2)});
await pressE();await p.waitForTimeout(3000);log('a_afterE',await st());await shot('a2-after-snooze');
await p.keyboard.down('w');await p.waitForTimeout(1500);await p.keyboard.up('w');await p.waitForTimeout(1500);log('a_afterWalk',await st());await shot('a3-walked');});
const at=await p.evaluate(()=>{const g=window.witch.game;return g.witches[0].house?.hatPointOrigin??g.map.treehouse});
const world=pts.map(q=>({n:q.n,x:at.x+q.x,z:at.z+q.z}));log('hatPointsWorld',world.slice(0,3));
const take=id=>p.evaluate(id=>window.witch.take('hat',id),id);
const ids=['helmet','healing','harvest','dowsing','sentry','bramble','slingshot','gathering','mine','lullaby','cyclone','nursing','edgeseer','routeseer'];
await step('b',async()=>{
log('b0',await st());
log('b_take_helmet',{ok:await take('helmet'),s:await st()});
log('b_take_healing',{ok:await take('healing'),s:await st()});
await p.evaluate(()=>window.witch.shot('object:hats'));await p.waitForTimeout(6000);await shot('b1-two-hats');
await goto(world[0].x,world[0].z);await p.waitForTimeout(800);await pressE();log('b_pickup_point1',await st());await shot('b2-picked-point1');
log('b_take_harvest_after_pickup',{ok:await take('harvest'),s:await st()});
await goto(world[3].x,world[3].z);await p.waitForTimeout(800);await pressE();log('b_E_at_empty_point4',await st());
for(const id of ids.slice(3)) await take(id);
log('b_all_taken',await st());await p.evaluate(()=>window.witch.shot('object:hats'));await p.waitForTimeout(6000);await shot('b3-all-hats');
const f=await st();const occ=(f.floor||[]).findIndex(x=>x);await goto(world[occ].x,world[occ].z);await p.waitForTimeout(800);await pressE();log('b_free_point_'+(occ+1),await st());
await p.waitForTimeout(2000);log('b_after_refresh',await st());});
await step('c',async()=>{
await p.waitForTimeout(7000);const before=await st();log('c_before',before);
log('c_storage',await p.evaluate(async()=>{const o={};for(const k of Object.keys(localStorage))o[k]=localStorage.getItem(k).length;let dbs=[];try{dbs=(await indexedDB.databases()).map(d=>d.name)}catch{};return {ls:o,dbs}}));
log('c_reloadSecs',await load());await p.waitForTimeout(6000);const after=await st();log('c_after',after);await shot('c1-after-reload');
log('c_notice',await p.evaluate(()=>document.body.innerText.match(/[^\n]*saved night[^\n]*/i)?.[0]??null));
log('c_match',{floor:JSON.stringify(before.floor)===JSON.stringify(after.floor),overflow:JSON.stringify(before.overflow)===JSON.stringify(after.overflow),wear:before.wear===after.wear});});
await step('d',async()=>{
const seat=await p.evaluate(()=>{const g=window.witch.game;return (g.witches[0].house?.hatPointOrigin??g.map.treehouse)?.seat??null});log('d_seat',seat);
await goto(seat.x,seat.z);await p.waitForTimeout(3000);await shot('d1-at-desk');await pressE();await p.waitForTimeout(3000);log('d_afterE',await st());await shot('d2-after-E');
await p.waitForTimeout(6000);log('d_later',await st());await shot('d3-later');});
await step('e',async()=>{
log('e_mush0',await p.evaluate(()=>JSON.stringify(window.witch.game.mushrooms??null)));
log('e_cauldron',await p.evaluate(()=>window.witch.shot('object:cauldron')));await p.waitForTimeout(7000);await shot('e1-cauldron');
await pressE();log('e_cauldron_E',{s:await st(),panels:await p.evaluate(()=>[...document.querySelectorAll('[id]')].filter(e=>e.offsetParent&&/station|kitchen|cauldron|potion|panel|mush/i.test(e.id)).map(e=>e.id))});await shot('e2-cauldron-E');
await p.keyboard.press('Escape');await p.waitForTimeout(1000);
for(const c of ['blue','purple','pink','red','orange','yellow','green','turquoise','white']){const r=await p.evaluate(c=>window.witch.shot('object:mushroom-basket:'+c),c);await p.waitForTimeout(4000);await shot('e3-basket-'+c);const m0=await p.evaluate(()=>JSON.stringify(window.witch.game.mushrooms));await pressE();const m1=await p.evaluate(()=>JSON.stringify(window.witch.game.mushrooms));log('e_basket_'+c,{shot:r,changed:m0!==m1,m1:(m1||'').slice(0,300)});await p.keyboard.press('Escape');}});
await step('f',async()=>{
for(const r of ['bedroom','turret','boudoir','parlour','terrace','dining','kitchen','workshop','cloakroom','studio','solarium','bestiary','bedroom2','bedroom3']){const x=await p.evaluate(r=>window.witch.shot('room:'+r),r);await p.waitForTimeout(5000);await shot('f-room-'+r);log('f_'+r,x);}});
log('errors',errors);await b.close();s.close();})().catch(e=>{log('FATAL',e.message);process.exit(1)});
