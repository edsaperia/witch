// node run.cjs <label> <url> <outdir> [capture]
const L=require('./lib.cjs'),fs=require('fs'),path=require('path');
const [label,url,out,cap]=process.argv.slice(2); fs.mkdirSync(out,{recursive:true});
const log=(...a)=>{console.log(`[${label} ${new Date().toISOString().slice(11,19)}]`,...a)};
(async()=>{const {b,page,errs,loadS}=await L.open(url); log('load s',loadS);
 const meta={label,url,loadS,scenes:{}};
 const info=()=>page.evaluate(()=>{const w=window.witch,g=w.game,v=w.view,p=v.post;return {t:g.clock.time,spellAt:g.party.spellAt,x:g.witch.x,z:g.witch.z,enabled:p.refractionEnabled,count:p.refraction?.count,states:p.refraction?p.refraction.states.slice(0,p.refraction.count).map(s=>s.toArray()):null,shapes:p.refraction?p.refraction.shapes.slice(0,p.refraction.count).map(s=>s.toArray()):null,wobble:p.potionWobble,canopy:p.potionCanopy,version:null}});
 const freeze=()=>page.evaluate(()=>{if(!window.__pn){window.__pn=performance.now.bind(performance);window.__dn=Date.now;} performance.now=()=>1000000; Date.now=()=>1790000000000;});
 const thaw=()=>page.evaluate(()=>{if(window.__pn){performance.now=window.__pn;Date.now=window.__dn;}});
 const shoot=async name=>{ const t0=Date.now(); await L.settle(page,2); await freeze(); await page.evaluate(()=>{const w=window.witch;w.view.render(w.game.clock.time);}); const a=await page.screenshot({path:path.join(out,name+'.png')});
   await page.evaluate(()=>{const w=window.witch;w.view.render(w.game.clock.time);}); const a2=await page.screenshot({path:path.join(out,name+'-again.png')});
   meta.scenes[name]={...(await info()),stableBytes:a.equals(a2),wallS:(Date.now()-t0)/1000}; await thaw(); log(name,JSON.stringify(meta.scenes[name]).slice(0,300)); };
 const capture=async(kind,dir,combined=false)=>{ if(!cap)return; const {capturePair}=require('/home/user/witch/tools/refraction/capture-pair.cjs'); const t0=Date.now();
   await freeze(); try{ const r=await capturePair(page,cap,path.join(out,dir),kind,combined); meta['capture_'+dir]={ok:true,wallS:(Date.now()-t0)/1000,result:r}; log('capture',dir,'ok'); }catch(e){ meta['capture_'+dir]={ok:false,error:String(e.message),wallS:(Date.now()-t0)/1000}; log('capture',dir,'FAIL',e.message);} await thaw(); };
 let r=await L.step(page,30); await L.settle(page);
 await shoot('start');
 // ordinary cast through the rules' castParty control, then 12 frames (0.2 s)
 r=await L.step(page,1,{castParty:true},1); r=await L.step(page,12,{},4); meta.castFrames=r;
 await shoot('ring');
 await capture('ring','cap-ring');
 // beach campfire: put her 3 m in front (camera side) of the beach fire nearest
 const f=await page.evaluate(()=>{const w=window.witch,g=w.game,v=w.view;const fs=v.worldFires.slice().sort((a,b)=>((a.x-g.witch.x)**2+(a.z-g.witch.z)**2)-((b.x-g.witch.x)**2+(b.z-g.witch.z)**2));return fs.map(f=>({x:f.x,z:f.z}));});
 const fire=f[0]; meta.fire=fire;
 await page.evaluate(({x,z})=>window.witch.shot(`at:${x},${z+3}`),fire); r=await L.step(page,60,{},10); await L.settle(page,4);
 await shoot('fire');
 await capture('fire','cap-fire');
 // combined: Thick Canopy trip (blue+red+white) begun now: wobble (trip indicator) + canopy grading
 await page.evaluate(()=>{const g=window.witch.game;g.mushrooms.trips[g.witches[0].id]={recipe:['blue','red','white'],key:'blue+red+white',at:g.clock.time,until:g.clock.time+600};});
 r=await L.step(page,30,{},10); await L.settle(page,3);
 await shoot('combined');
 await capture('fire','cap-combined',true);
 meta.errors=errs; fs.writeFileSync(path.join(out,'meta.json'),JSON.stringify(meta,null,1)); log('errors',errs.length, errs.slice(0,5).join(' | ')); await b.close();
})().catch(e=>{console.error(label,'FATAL',e);process.exit(1)});
