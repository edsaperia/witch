// Frame-stepped interactions (manual loop): the software renderer runs ~1 fps, so held keys don't reliably land.
const {start}=require('/tmp/qa/serve.cjs');const pw=require('playwright');const fs=require('fs');
const OUT=process.env.OUT, Q=process.env.Q||'layout=ed&seed=123&quick=1&resume=1', PORT=+(process.env.PORT||8768);
const prop=JSON.parse(fs.readFileSync('/home/user/witch/docs/evidence/treehouse-layout-ed-2026-10-31.v2-proposal.json'));
const pts=prop.objects.filter(p=>p.id.startsWith('hat-point:')).map(p=>({n:+p.id.split(':')[1],x:p.x,z:p.z})).sort((a,b)=>a.n-b.n);
const R={};const errors=[];const log=(k,v)=>{R[k]=v;console.log(k,JSON.stringify(v).slice(0,700));fs.writeFileSync(OUT+'/results-stepped2.json',JSON.stringify({R,errors},null,1));};
(async()=>{const s=await start(PORT);const b=await pw.chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"]});
const p=await (await b.newContext({viewport:{width:1280,height:720}})).newPage();
p.on('pageerror',e=>errors.push('pageerror: '+e.message));p.on('console',m=>{if(m.type()==='error')errors.push('console: '+m.text())});
const shot=async n=>{try{await p.screenshot({path:`${OUT}/${n}.png`,timeout:60000})}catch(e){console.log('shotfail',n)}};
const load=async()=>{const t0=Date.now();await p.goto(`http://127.0.0.1:${PORT}/?${Q}`);await p.waitForFunction(()=>window.witch&&window.witch.ready,null,{timeout:300000,polling:500});return (Date.now()-t0)/1000;};
const st=()=>p.evaluate(()=>{const g=window.witch.game,W=g.witches[0];return {x:+g.witch.x.toFixed(2),z:+g.witch.z.toFixed(2),mode:g.witch.mode,perch:!!g.witch.perch,seated:!!g.witch.seated,t:+g.clock.time.toFixed(2),wear:W.spells.hat,hatHas:W.hat.has,hatDown:W.hat.down?{x:+W.hat.down.x.toFixed(2),z:+W.hat.down.z.toFixed(2)}:null,left:W.hat.left.map(h=>h.spell),floor:W.house?.hats,overflow:W.house?.hatOverflow,reserved:W.house?.hatReserved,spellAt:g.party?.spellAt??null,wake:g.wake?{beat:g.wake.beat,open:!!g.wake.open}:null,baskets:g.mushrooms?.baskets,ingredients:g.mushrooms?.ingredients?.length,flights:g.mushrooms?.flights?.length}});
const C={moveX:0,moveZ:0,toggleMode:false,zoom:0};
const frames=(n,extra={},draw=true)=>p.evaluate(([n,c,e,draw])=>{for(let k=0;k<n;k++)window.witch.frame(k===0?{...c,...e}:c,1/60,draw&&k===n-1);},[n,C,extra,draw]);
const goto=(x,z)=>p.evaluate(([x,z])=>{const g=window.witch.game;g.witch={...g.witch,x,z,vx:0,vz:0,seated:false,perch:true};},[x,z]);
const step=async(name,fn)=>{try{await fn()}catch(e){log(name+'_ERROR',e.message)}};
log('loadSecs',await load());
await p.evaluate(()=>{window.witch.manual=true;});
await frames(2);log('a0',await st());await shot('s-a0-wake');
// wake: snooze with E, then walk off (moveZ) until up
await step('a',async()=>{await frames(3,{place:true,sigil:true});log('a_E',await st());
 for(let i=0;i<20;i++){await frames(30,{moveZ:-1},false);const s=await st();if(s.wake?.open||s.wake?.beat==='up')break;}
 await frames(1);log('a_up',await st());await shot('s-a1-up');});
const at=await p.evaluate(()=>{const g=window.witch.game;return g.witches[0].house?.hatPointOrigin??null});
const world=pts.map(q=>({n:q.n,x:at.x+q.x,z:at.z+q.z}));
const take=id=>p.evaluate(id=>window.witch.take('hat',id),id);
await step('b',async()=>{
 for(const id of ['helmet','healing','harvest','dowsing','sentry','bramble','slingshot','gathering','mine','lullaby','cyclone','nursing','edgeseer','routeseer']) await take(id);
 log('b_all14',await st());
 const s0=await st();await goto(s0.hatDown.x,s0.hatDown.z);await frames(2);await frames(3,{hat:true});await frames(5);
 log('b_picked_plain_hat_off_point1',await st());
 await frames(3,{moveX:1},false);await frames(5);log('b_after_refresh',await st());
 await p.evaluate(()=>window.witch.shot('object:hats'));await frames(3);await shot('s2-b-hats-after-plain-lifted');});
await step('e',async()=>{
 await p.evaluate(()=>{const g=window.witch.game;for(const k in g.mushrooms.baskets)g.mushrooms.baskets[k]=Math.max(3,g.mushrooms.baskets[k]);});
 const res={};
 for(const c of ['red','orange','yellow','green','turquoise','white']){
  await p.evaluate(c=>{window.witch.shot('object:mushroom-basket:'+c);},c);await frames(2);
  for(let i=0;i<10;i++){const q=await st();if(q.ingredients<3)break;await frames(120,{},false);}
  const b0=await st();await frames(3,{place:true,sigil:true});await frames(90,{},true);const b1=await st();
  res[c]={before:b0.baskets[c],after:b1.baskets[c],ingredientsBefore:b0.ingredients,ingredientsAfter:b1.ingredients};}
 log('e_baskets_rest',res);await shot('s2-e-last-basket');});
await step('d',async()=>{
 await p.evaluate(()=>{window.witch.manual=false;});
 await goto(at.seat.x,at.seat.z+0.3);await p.waitForTimeout(3000);
 await p.keyboard.down('e');await p.waitForTimeout(3000);await p.keyboard.up('e');await p.waitForTimeout(4000);
 const buttons=await p.evaluate(()=>[...document.querySelectorAll('button')].filter(b=>b.offsetParent).map(b=>b.textContent.trim()).filter(Boolean).slice(0,30));
 log('d_afterE',{s:await st(),buttons});await shot('s2-d1-booth');
 const btn=p.locator('button',{hasText:/party started/i});
 if(await btn.count()){await btn.first().click({timeout:30000});await p.waitForTimeout(6000);log('d_afterStart',await st());await shot('s2-d2-started');
  await p.waitForTimeout(15000);log('d_later',await st());await shot('s2-d3-later');}});
log('errors',errors);await b.close();s.close();})().catch(e=>{log('FATAL',e.message);process.exit(1)});
