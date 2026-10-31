// Allocated <=270s Intel smoke-veil default/three/off walk and unchanged-look capture.
// EXPECT_SHA=<full> INTEL_SLOT=<fresh grant> PRECEDING_RELEASE=<actual FREE> node tools/bench/veil-readback-intel.cjs <dist> <out>
// Requires PLAYWRIGHT_MODULE and optional CHROMIUM; PREPARE_ONLY=1 never launches a browser.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),crypto=require('node:crypto');
const {execFileSync}=require('node:child_process');
const {cpu,quietPolicy,laptopState}=require('./veil-laptop-guard.cjs');
const {analyse}=require('./veil-readback-model.cjs');
const MAX_MS=270000,WORK_MS=258000,FRAMES=600;
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
function hardware(info){if(!/Intel/i.test(info.gpu)||!/D3D11|Direct3D11/i.test(info.gpu)||/SwiftShader|llvmpipe|Basic Render/i.test(info.gpu)||!info.khr||!info.timer)throw Error('Intel D3D11/KHR/GPU timer required');}
function fixture(){
  const W=window.witch,g=W.game,v=W.view;
  if(g.party.wave<2)throw Error('Real wave>=2 required');
  W.manual=true;g.clock.paused=false;v.sceneryFixed=120;
  g.clock.time=20;g.herTime=20;
  const d=g.map.dancefloor,near=W.shot(`at:${d.x},${d.z+4}`);if(!near.ok)throw Error(near.say);v.render(20);
  const fires=v.smoke.drawnFires(),list=[];
  for(let i=0;i<fires.n;i++){const o=i*fires.stride;if(fires.a[o+3]>.5)list.push({x:fires.a[o],z:fires.a[o+2]});}
  list.sort((a,b)=>a.x-b.x||a.z-b.z);const fire=list[0];if(!fire)throw Error('No burning campfire in actual smoke draw');
  const r=W.shot(`at:${fire.x+1.5},${fire.z+4}`);if(!r.ok)throw Error(r.say);
  g.witch={...g.witch,mode:'ground',lift:0,vx:0,vz:0,seated:false,perch:undefined};g.camera.lift=0;
  // Same diagnostic invite-letter grid as tools/occlusion/envelope-shots, over real wave smoke.
  g.witches[0].invites.letters.length=0;
  for(const dz of [6,10,14,18,24,30])for(const dx of [-3,0,3,6]){
    const n=900010+g.witches[0].invites.letters.length;
    g.witches[0].invites.letters.push({n,x:fire.x+dx,z:fire.z-dz,vx:0,vz:0,flown:0,at:g.clock.time,r:.01,range:1e6,pierce:0,bounce:0,split:false,home:false,slip:false,hit:g.creatures.map(c=>c.id)});
  }
  return {seed:123,world:0,island:10,wave:g.party.wave,fire,route:'ground-X-30-step-shuttle-600-fixed-steps',indicatorFixture:'24 existing invitation letters at fixed grid',clock:g.clock.time};
}
async function settle(){
  const W=window.witch,v=W.view;let stable=0;
  for(let i=0;i<360;i++){
    if(window.__veilStop)throw Error(window.__veilStop);
    v.render(W.game.clock.time,i%12===0);await v.assets.whenIdle(true);await new Promise(requestAnimationFrame);
    if(!v.assets.urgentKeys.size&&!v.stats.pendingGround&&!v.stats.forestMissing&&v.readiness.stage==='ready'&&(v.renderer.info.programs||[]).every(p=>p.isReady()))stable++;else stable=0;
    if(stable>=12)return;
  }
  throw Error('Visible smoke fixture did not settle');
}
async function walk(count){
  const W=window.witch,g=W.game,v=W.view,gl=v.renderer.getContext(),ext=gl.getExtension('EXT_disjoint_timer_query_webgl2'),frames=[];
  window.__veilFrames=frames;
  let last=await new Promise(requestAnimationFrame),previous;
  for(let i=0;i<=count;i++){
    if(window.__veilStop)throw Error(window.__veilStop);
    const now=await new Promise(requestAnimationFrame),intervalMs=now-last;last=now;
    if(previous)frames.push({...previous,intervalMs});
    if(i===count)break;
    if(gl.isContextLost()||gl.getParameter(ext.GPU_DISJOINT_EXT))throw Error('Lost/disjoint GPU');
    W.frame({moveX:Math.floor(i/30)%2===0?1:-1,moveZ:0,toggleMode:false,zoom:0},1/60,true);
    if((v.renderer.info.programs||[]).some(p=>!p.isReady()||p.diagnostics?.runnable===false))throw Error('Shader compilation/error during measured route');
    const probes=v.occlusion.pool.filter(p=>p.key&&p.used===v.occlusion.frame).length,smoke=v.smoke.drawnFires();
    previous={probeMs:v.ms.veilRead||0,veilMs:v.ms.veil||0,activeProbe:probes>0,probes,smokeDrawn:!!v.smoke.mesh.visible&&smoke.n>0,fireCount:smoke.n,x:g.witch.x,z:g.witch.z,clock:g.clock.time};
  }
  return frames;
}
async function captureState(){
  const W=window.witch,g=W.game,v=W.view;
  // Fixed time, treetop view through the actual column, as the original smoke-occlusion proof.
  const f=window.__veilFixture.fire;g.clock.time=20;g.herTime=20;
  g.witch={...g.witch,x:f.x+1.5,z:f.z+4,vx:0,vz:0,mode:'treetop',lift:1};g.camera.lift=1;
  for(let i=0;i<120;i++){if(window.__veilStop)throw Error(window.__veilStop);v.render(20);await new Promise(requestAnimationFrame);}
  const p=v.occlusion.pool.filter(p=>p.key&&p.used===v.occlusion.frame);
  if(!p.length||!v.smoke.mesh.visible||!v.smoke.drawnFires().n)throw Error('Capture lacks active smoke/probes');
  if(v.occlusion.veilRead!=='off'&&!p.some(p=>p.veil>.05))throw Error('Capture lacks a visibly smoke-veiled indicator');
  return {camera:v.camera.matrixWorld.elements,projection:v.camera.projectionMatrix.elements,clock:g.clock.time,witch:[g.witch.x,g.witch.z,g.witch.lift],probes:p.map(p=>({key:p.key,position:p.u.toArray(),veil:p.veil})),drawCalls:v.renderer.info.render.calls};
}
async function compareImages([a,b]){
  const load=src=>new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=src;});
  const A=await load(a),B=await load(b);if(A.width!==B.width||A.height!==B.height)throw Error('Capture dimensions differ');
  const c=document.createElement('canvas');c.width=A.width;c.height=A.height;const x=c.getContext('2d');
  x.drawImage(A,0,0);const p=x.getImageData(0,0,c.width,c.height).data;x.clearRect(0,0,c.width,c.height);x.drawImage(B,0,0);const q=x.getImageData(0,0,c.width,c.height).data;
  let changed=0,worst=0;for(let i=0;i<p.length;i+=4){let d=0;for(let k=0;k<4;k++)d=Math.max(d,Math.abs(p[i+k]-q[i+k]));if(d)changed++;worst=Math.max(worst,d);}
  return {changedPixels:changed,worstChannelDelta:worst,totalPixels:c.width*c.height};
}
async function main(){
  const started=Date.now(),sha=process.env.EXPECT_SHA,root=path.resolve(process.argv[2]||'dist'),out=path.resolve(process.argv[3]||'veil-readback-intel');
  if(!/^[a-f0-9]{40}$/.test(sha||''))throw Error('Exact EXPECT_SHA required');
  if(execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim()!==sha||execFileSync('git',['status','--porcelain','--untracked-files=no'],{encoding:'utf8'}).trim())throw Error('Exact clean checkout required');
  const version=JSON.parse(fs.readFileSync(path.join(root,'version.json'),'utf8'));
  if(!version.version.includes(sha.slice(0,7)))throw Error('Prepared dist does not identify exact head');
  const entryPath=fs.readFileSync(path.join(root,'index.html'),'utf8').match(/src="([^"]+\.js)"/);
  if(!entryPath)throw Error('Missing built entry');const entry=fs.readFileSync(path.join(root,entryPath[1].replace(/^\//,'')));
  if(!entry.includes(Buffer.from(sha.slice(0,7))))throw Error('Entry SHA does not match prepared build');
  if(process.env.PREPARE_ONLY==='1'){console.log(JSON.stringify({preparedOnly:true,sha,version,browserStarted:false}));return;}
  if(process.platform!=='win32'||!process.env.INTEL_SLOT||!process.env.PRECEDING_RELEASE)throw Error('Fresh canonical laptop grant and actual preceding FREE required');
  fs.mkdirSync(out,{recursive:true});const report={sha,version,grant:process.env.INTEL_SLOT,precedingRelease:process.env.PRECEDING_RELEASE,startedAt:new Date().toISOString(),budgetMs:MAX_MS,arms:[],errors:[],complete:false,status:'INCONCLUSIVE',capturePolicy:'default vs three exact pixels; off sensitivity only',fixtureNote:'Real campfire/wave/ground walking, diagnostic invitation-letter grid; capture uses fixed treetop smoke view.'};
  const save=()=>fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2));
  let browserServer,browser,server,hard,deadline,ticker,activePage,lastQuiet,safetyError,stopping=false,pending=Promise.resolve(),rejectStop;
  const stop=new Promise((_,reject)=>{rejectStop=reject;});stop.catch(()=>{});
  const bounded=p=>Promise.race([p,stop]),remaining=()=>WORK_MS-(Date.now()-started);
  const quiet=()=>{if(safetyError)throw safetyError;const s=laptopState(),p=quietPolicy(s,report.browserPid,lastQuiet);lastQuiet={idleMs:s.idleMs};return p;};
  try{
    hard=setTimeout(()=>{report.error='270s hard cap';save();void browserServer?.kill().catch(()=>{});server?.closeAllConnections();server?.close();setTimeout(()=>process.exit(2),500);},MAX_MS-1000);
    deadline=setTimeout(()=>rejectStop(Error('258s work cap; cleanup reserved')),Math.max(1,remaining()));
    report.preflight=quiet();const initialCPU=await cpu();if(initialCPU.percent>=70)throw Error('CPU contamination');
    ticker=setInterval(()=>{pending=pending.then(async()=>{if(stopping)return;try{const p=quiet(),c=await cpu();const arm=report.arms.at(-1);if(arm){arm.quietProofs.push(p);arm.cpu.push(c.percent);}if(c.percent>=70)throw Error('CPU contamination');}catch(e){safetyError=e;report.error=String(e);if(activePage&&!activePage.isClosed())await activePage.evaluate(s=>{window.__veilStop=s;},String(e)).catch(()=>{});}save();});},5000);
    const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2','.ogg':'audio/ogg','.wasm':'application/wasm'};
    server=http.createServer((req,res)=>{let f=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://x').pathname));if(f!==root&&!f.startsWith(root+path.sep)){res.writeHead(403);return res.end();}if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');try{res.setHeader('content-type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f));}catch{report.errors.push('404 '+req.url);res.writeHead(404);res.end();}});
    await bounded(new Promise(r=>server.listen(0,'127.0.0.1',r)));const base=`http://127.0.0.1:${server.address().port}`;
    const pw=require(process.env.PLAYWRIGHT_MODULE||'playwright');browserServer=await bounded(pw.chromium.launchServer({headless:true,...(process.env.CHROMIUM?{executablePath:process.env.CHROMIUM}:{}),args:['--use-gl=angle','--use-angle=d3d11','--ignore-gpu-blocklist','--disable-background-timer-throttling','--disable-renderer-backgrounding']}));report.browserPid=browserServer.process().pid;browser=await bounded(pw.chromium.connect(browserServer.wsEndpoint()));
    const context=await browser.newContext({viewport:{width:960,height:540},deviceScaleFactor:1});
    await context.addInitScript(()=>{localStorage.clear();localStorage.setItem('witch.player',JSON.stringify({master:0,music:0,effects:0,voices:0,muteBackground:true,quality:'high',shake:false,screen:'',reduceFlashing:false,talk:'hold',textSize:1,glyphs:'auto',rumble:false}));let W;Object.defineProperty(window,'witch',{configurable:true,get:()=>W,set:v=>{W=v;if(Object.getOwnPropertyDescriptor(v??{},'manual')?.set)v.manual=true;}});});
    const images={},states={};
    for(const mode of ['default','three','off']){
      if(remaining()<15000)throw Error('Insufficient shared budget');const proof=quiet(),load=await cpu();if(load.percent>=70)throw Error('CPU contamination');
      const arm={mode,frames:[],cpu:[load.percent],quietProofs:[proof]};report.arms.push(arm);save();
      const page=await context.newPage();activePage=page;let closing=false;
      page.on('pageerror',e=>{if(!closing){report.errors.push(String(e));rejectStop(e);}});page.on('console',m=>{if(!closing&&m.type()==='error'){report.errors.push(m.text());rejectStop(Error(m.text()));}});
      await bounded(page.goto(base+'/?seed=123&world=0&island=10&wave=3&creator=0&ladder=off&px=1&recording=0'+(mode==='default'?'':'&veilread='+mode),{timeout:Math.max(1,remaining())}));
      await bounded(page.waitForFunction(()=>{if(window.__veilStop)throw Error(window.__veilStop);return window.witch?.ready;},null,{timeout:Math.max(1,remaining())}));
      await bounded(page.keyboard.press('Enter'));
      const served=await bounded(page.evaluate(async()=>await(await fetch('./version.json',{cache:'no-store'})).json()));if(JSON.stringify(served)!==JSON.stringify(version))throw Error('Served SHA/build mismatch');arm.served=served;
      const info=await bounded(page.evaluate(()=>{const gl=window.witch.view.renderer.getContext(),d=gl.getExtension('WEBGL_debug_renderer_info');return {gpu:d?gl.getParameter(d.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER),khr:!!gl.getExtension('KHR_parallel_shader_compile'),timer:!!gl.getExtension('EXT_disjoint_timer_query_webgl2')};}));hardware(info);if(report.hardware&&JSON.stringify(report.hardware)!==JSON.stringify(info))throw Error('Hardware changed');report.hardware=info;
      await bounded(page.evaluate(settle));const f=await bounded(page.evaluate(fixture));arm.fixture=f;arm.fixtureKey=hash(JSON.stringify(f));await bounded(page.evaluate(f=>{window.__veilFixture=f;},f));await bounded(page.evaluate(settle));
      arm.quietProofs.push(quiet());arm.frames=await bounded(page.evaluate(walk,FRAMES));arm.quietProofs.push(quiet());
      arm.routeKey=hash(JSON.stringify(arm.frames.map(f=>[f.x,f.z,f.clock])));if(report.arms.some(a=>a.routeKey&&a.routeKey!==arm.routeKey))throw Error('Actual walking route/state differs across arms');save();
      states[mode]=await bounded(page.evaluate(captureState));images[mode]=await bounded(page.screenshot({path:path.join(out,mode+'.png'),timeout:Math.max(1,remaining())}));
      if(mode==='off'){
        const identity=s=>JSON.stringify({...s,probes:s.probes.map(({veil,...p})=>p)});
        if(identity(states.default)!==identity(states.three))throw Error('Default/Three capture scene geometry differs');
        report.look=await bounded(page.evaluate(compareImages,[...['default','three'].map(m=>'data:image/png;base64,'+images[m].toString('base64'))]));
        report.sensitivity=await bounded(page.evaluate(compareImages,[...['three','off'].map(m=>'data:image/png;base64,'+images[m].toString('base64'))]));
      }
      arm.capture=states[mode];arm.probeTimingScope='in-frame veilRead poll/copy only; old Three async timer work is not directly attributed, so p95 reproduction criterion may be needed';const endCPU=await cpu();arm.cpu.push(endCPU.percent);if(endCPU.percent>=70)throw Error('CPU contamination');quiet();closing=true;await bounded(page.close());save();
    }
    stopping=true;clearInterval(ticker);await pending;quiet();
    report.analysis=analyse(report.arms);report.status=report.analysis.status;
    if(report.look.changedPixels||!report.sensitivity.changedPixels){report.status='INCONCLUSIVE';report.error='Look mismatch or absent off sensitivity';}
    if(report.errors.length)throw Error('Resource/page errors');report.complete=true;
  }catch(e){report.error=String(e.stack||e);report.status='INCONCLUSIVE';process.exitCode=2;}
  finally{
    stopping=true;clearInterval(ticker);clearTimeout(deadline);await pending;
    if(!report.complete&&activePage&&!activePage.isClosed()){
      let partialTimer;try{const frames=await Promise.race([activePage.evaluate(()=>window.__veilFrames||[]),new Promise((_,reject)=>{partialTimer=setTimeout(()=>reject(Error('Partial frame retrieval timeout')),500);})]);if(report.arms.length)report.arms.at(-1).frames=frames;}catch(e){report.partialFrameError=String(e);}finally{clearTimeout(partialTimer);}
    }
    report.analysis??=analyse(report.arms);
    let cleanup;try{await Promise.race([browserServer?.close(),new Promise((resolve,reject)=>{cleanup=setTimeout(()=>Promise.resolve(browserServer?.kill()).then(resolve,reject),4000);})]);}catch{await browserServer?.kill().catch(()=>{});}finally{clearTimeout(cleanup);}
    server?.closeAllConnections();if(server?.listening)await new Promise(r=>server.close(r));
    report.browserClosed=!browserServer||browserServer.process().exitCode!==null||browserServer.process().signalCode!==null;report.serverClosed=!server?.listening;report.elapsedMs=Date.now()-started;report.endedAt=new Date().toISOString();if(!report.browserClosed||!report.serverClosed){report.complete=false;report.status='INCONCLUSIVE';}save();clearTimeout(hard);
  }
  if(report.status!=='PASS')process.exitCode=2;console.log(JSON.stringify({status:report.status,complete:report.complete,analysis:report.analysis,look:report.look,sensitivity:report.sensitivity,error:report.error,elapsedMs:report.elapsedMs}));
}
module.exports={hardware,MAX_MS,WORK_MS,FRAMES};
if(require.main===module)main().catch(e=>{console.error(e.stack||e);process.exitCode=2;});
