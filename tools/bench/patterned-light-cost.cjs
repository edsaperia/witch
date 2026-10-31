// Bounded Intel-only patterned-light GPU comparison: real home, party and blink scenes, default ON then explicit off.
// Prepared exact-SHA dist, fresh canonical allocation + preceding FREE required. Never starts from an import or PREPARE_ONLY.
// EXPECT_SHA=<full> INTEL_SLOT=<grant> PRECEDING_RELEASE=<actual FREE> node tools/bench/patterned-light-cost.cjs <dist> <out>
// PLAYWRIGHT_MODULE=<module> CHROMIUM=<exe> FRAMES=48 PREPARE_ONLY=1
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),os=require('node:os');
const {execFileSync}=require('node:child_process'),{createHash}=require('node:crypto');
const MAX_MS=270000,WORK_MS=258000,FRAME_BUDGET_MS=1000/60;
const GPU_BUDGET={median:.5,p95:1}; // Canonical1542#6546555189, 2026-10-31; never raised by the runner.
const percentile=(values,p)=>{if(!values.length||values.some(v=>!Number.isFinite(v)||v<0))throw Error('Missing or invalid GPU samples');const a=[...values].sort((a,b)=>a-b);return a[Math.max(0,Math.min(a.length-1,Math.ceil(a.length*p)-1))];};
function capabilities(info){if(!/Intel/i.test(info.gpu)||!/D3D11|Direct3D11/i.test(info.gpu)||/SwiftShader|llvmpipe|Basic Render/i.test(info.gpu))throw Error('Intel D3D11 hardware required');if(!info.khr||!info.timer)throw Error('KHR and disjoint GPU timer required');return info;}
function pair(on,off){
  if(on.fingerprint!==off.fingerprint)throw Error('ON/OFF real scene, sources or geometry differ');
  if(on.gpu.length!==off.gpu.length||on.gpu.length<32)throw Error('Paired GPU sample count mismatch or insufficient');
  const a={median:percentile(on.gpu,.5),p95:percentile(on.gpu,.95)},b={median:percentile(off.gpu,.5),p95:percentile(off.gpu,.95)};
  const delta={median:a.median-b.median,p95:a.p95-b.p95};
  return {on:a,off:b,delta,frameBudgetMs:FRAME_BUDGET_MS,onP95HeadroomMs:FRAME_BUDGET_MS-a.p95,deltaFrameShare:{median:delta.median/FRAME_BUDGET_MS,p95:delta.p95/FRAME_BUDGET_MS},incrementalCeilingMs:GPU_BUDGET,withinCeiling:delta.median<=GPU_BUDGET.median&&delta.p95<=GPU_BUDGET.p95};
}
const hash=s=>createHash('sha256').update(s).digest('hex');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function cpu(){const a=os.cpus();await sleep(1000);let idle=0,total=0;os.cpus().forEach((c,i)=>{idle+=c.times.idle-a[i].times.idle;for(const k in c.times)total+=c.times[k]-a[i].times[k];});const percent=100*(1-idle/total);if(!(total>0)||!Number.isFinite(percent)||percent<0||percent>100)throw Error('CPU telemetry unavailable');return {at:new Date().toISOString(),percent};}
function laptopState(){
  const script=`Add-Type -TypeDefinition 'using System; using System.Runtime.InteropServices; public static class PatternedInput { [StructLayout(LayoutKind.Sequential)] public struct Last { public uint size; public uint time; } [DllImport("user32.dll")] public static extern bool GetLastInputInfo(ref Last x); public static uint Idle() { Last x = new Last(); x.size = (uint)Marshal.SizeOf(x); if (!GetLastInputInfo(ref x)) throw new Exception("Last input unavailable"); return unchecked((uint)Environment.TickCount - x.time); } }'; $taskIdle=[PatternedInput]::Idle(); $taskBrowsers=@(Get-CimInstance Win32_Process | Where-Object { $_.Name -match 'chrome|chromium|msedge|headless' -and $_.CommandLine -match '--headless|--remote-debugging-pipe' } | Select-Object ProcessId,Name); @{idleMs=$taskIdle;headless=$taskBrowsers}|ConvertTo-Json -Depth 4 -Compress`;
  return JSON.parse(execFileSync('powershell.exe',['-NoProfile','-NonInteractive','-Command',script],{encoding:'utf8',windowsHide:true,timeout:10000}));
}
function setup(scene){
  const W=window.witch,g=W.game;W.manual=true;g.clock.paused=false;g.clock.time=20;g.herTime=20;g.alpha=0;
  W.view.sceneryFixed=120; // same explicit drawn radius in both arms; not a performance adaptation.
  if(scene==='home'){const r=W.shot('room:terrace');if(!r.ok)throw Error(r.say);g.camera.lift=0;return {scene,room:'terrace'};}
  const entries=[...g.party.areas].filter(([,a])=>a.soundsystem).sort(([a],[b])=>a<b?-1:a>b?1:0);
  if(!entries.length)throw Error('No actual playing soundsystem');
  const [key,a]=entries[0],s=a.soundsystem,r=W.shot(`at:${s.x},${s.z+12}`);if(!r.ok)throw Error(r.say);g.camera.lift=0;
  return {scene,key,source:{x:s.x,z:s.z}};
}
async function settle(){
  const W=window.witch,v=W.view;let last,stable=0;
  for(let i=0;i<720;i++){
    v.render(W.game.clock.time,i%12===0);
    await Promise.race([v.assets.whenIdle(true),new Promise((_,reject)=>setTimeout(()=>reject(Error('Urgent visible art timeout')),45000))]);
    v.render(W.game.clock.time,false);
    last={urgent:v.assets.urgentKeys.size,ground:v.stats.pendingGround,missing:v.stats.forestMissing,ready:v.readiness.stage,programs:(v.renderer.info.programs||[]).every(p=>p.isReady())};
    if(!last.urgent&&!last.ground&&!last.missing&&last.ready==='ready'&&last.programs)stable++;else stable=0;
    if(stable>=3){v.render(W.game.clock.time);v.renderer.getContext().finish();return last;}
    await new Promise(r=>setTimeout(r,16));
  }
  throw Error('Visible scene incomplete: '+JSON.stringify(last));
}
function blink(){const W=window.witch,before=W.game.witches[0].dash.at;W.frame({moveX:1,moveZ:0,toggleMode:false,zoom:0,dash:true},1/60);for(let i=0;i<7;i++)W.frame({moveX:0,moveZ:0,toggleMode:false,zoom:0},1/60);if(W.game.witches[0].dash.at===before)throw Error('Ordinary blink blocked');return {...W.game.witches[0].dash};}
async function measure({scene,on,frames,remaining}){
  const W=window.witch,g=W.game,v=W.view,U=W.lightUniforms,gl=v.renderer.getContext(),ext=gl.getExtension('EXT_disjoint_timer_query_webgl2');
  const start=performance.now(),gpu=[],cpuMs=[],round=x=>Math.round(x*1e6)/1e6;
  const creatureBytes=new TextEncoder().encode(JSON.stringify(g.creatures.map(c=>[c.id,c.x,c.z,c.level,c.species,c.state])));
  const creatureHash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',creatureBytes)),b=>b.toString(16).padStart(2,'0')).join('');
  const snapshot=()=>{
    const count=U.uLightCount.value,patterns=U.uLightPattern.value.slice(0,count).map(p=>p.toArray());
    const active=patterns.filter(p=>p[0]>0&&p[2]>0);
    if(active.length>3||(!on&&active.length))throw Error('Slot cap or explicit off failed');
    if(on){const kind=scene==='home'?4:scene==='blink'?5:1;if(!active.some(p=>kind===1?p[0]>=1&&p[0]<=3:p[0]===kind))throw Error('Requested real pattern missing');}
    if(scene==='home'&&on){const i=patterns.findIndex(p=>p[0]===4&&p[2]>0),p=U.uLightPos.value[i];if(p.y-W.groundHeight(p.x,p.z)<=3)throw Error('Home scene substituted a forest source');}
    const vector=a=>a.map(p=>p.toArray().map(round));
    return {scene,clock:round(g.clock.time),herTime:round(g.herTime),witch:[g.witch.x,g.witch.z,g.witch.lift].map(round),creatureHash,camera:v.camera.matrixWorld.elements.map(round),projection:v.camera.projectionMatrix.elements.map(round),lights:count,positions:vector(U.uLightPos.value.slice(0,count)),colours:vector(U.uLightCol.value.slice(0,count)),drawCalls:v.renderer.info.render.calls,triangles:v.renderer.info.render.triangles,canvas:[gl.drawingBufferWidth,gl.drawingBufferHeight],scenery:120};
  };
  if(!ext)throw Error('GPU timer unavailable');W.frameStats.ext=null;
  for(let i=0;i<12;i++){v.render(g.clock.time);await new Promise(requestAnimationFrame);}
  gl.finish();if((v.renderer.info.programs||[]).some(p=>!p.isReady()))throw Error('Shaders still compiling after warmup');let descriptor,serial,patterns,compiles=0;
  const compile=gl.compileShader,link=gl.linkProgram;
  gl.compileShader=function(...args){compiles++;return compile.apply(this,args);};gl.linkProgram=function(...args){compiles++;return link.apply(this,args);};
  try{for(let i=0;i<frames;i++){
    if(performance.now()-start>remaining)throw Error('Per-stage shared deadline');
    if(gl.isContextLost()||gl.getParameter(ext.GPU_DISJOINT_EXT)||gl.getQuery(ext.TIME_ELAPSED_EXT,gl.CURRENT_QUERY))throw Error('Lost/disjoint GPU or another timer active');
    const q=gl.createQuery();if(!q)throw Error('GPU query allocation failed');
    try{
      gl.beginQuery(ext.TIME_ELAPSED_EXT,q);const t=performance.now();v.render(g.clock.time);cpuMs.push(performance.now()-t);gl.endQuery(ext.TIME_ELAPSED_EXT);gl.flush();
      for(let poll=0;!gl.getQueryParameter(q,gl.QUERY_RESULT_AVAILABLE);poll++){if(poll>=120||performance.now()-start>remaining)throw Error('GPU query did not complete');await new Promise(requestAnimationFrame);}
      if(gl.getParameter(ext.GPU_DISJOINT_EXT))throw Error('Disjoint GPU sample; whole run rejected');
      const ms=gl.getQueryParameter(q,gl.QUERY_RESULT)/1e6;if(!Number.isFinite(ms)||ms<0)throw Error('Invalid GPU time');gpu.push(ms);
    }finally{if(gl.getQuery(ext.TIME_ELAPSED_EXT,gl.CURRENT_QUERY)===q)gl.endQuery(ext.TIME_ELAPSED_EXT);gl.deleteQuery(q);}
    if(gl.getError()!==gl.NO_ERROR||(v.renderer.info.programs||[]).some(p=>!p.isReady()||p.diagnostics?.runnable===false))throw Error('GL/shader error or pending compilation');
    if(compiles)throw Error('Shader compilation/link inside timed window');
    const d=snapshot(),s=JSON.stringify(d);if(serial&&s!==serial)throw Error('Frozen scene geometry/sources drifted during GPU samples');descriptor=d;serial=s;
    patterns=U.uLightPattern.value.slice(0,U.uLightCount.value).map(p=>p.toArray());
  }}finally{gl.compileShader=compile;gl.linkProgram=link;}
  return {descriptor,patterns,gpu,cpuMs,key:W.compareKey('patterned-light-cost:'+scene),gl:{maxFragmentUniformVectors:gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS)}};
}
async function main(){
  const started=Date.now(),root=path.resolve(process.argv[2]||'dist'),out=path.resolve(process.argv[3]||'patterned-light-cost'),sha=process.env.EXPECT_SHA;
  if(!/^[a-f0-9]{40}$/.test(sha||''))throw Error('EXPECT_SHA must be exact full head');
  if(execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim()!==sha||execFileSync('git',['status','--porcelain','--untracked-files=no'],{encoding:'utf8'}).trim())throw Error('Exact clean tracked checkout required');
  const version=JSON.parse(fs.readFileSync(path.join(root,'version.json'),'utf8'));if(!version.version.includes(sha.slice(0,7)))throw Error('Prepared dist SHA mismatch');
  const index=fs.readFileSync(path.join(root,'index.html'),'utf8'),asset=index.match(/src="([^"]+\.js)"/);if(!asset)throw Error('No built entry asset');
  const entry=fs.readFileSync(path.join(root,asset[1].replace(/^\//,'')));if(!entry.includes(Buffer.from(sha.slice(0,7))))throw Error('Built entry does not identify head');
  if(process.env.PREPARE_ONLY==='1'){console.log(JSON.stringify({status:'PREPARED_ONLY',sha,version,entryHash:hash(entry),browserStarted:false}));return;}
  if(process.platform!=='win32'||!process.env.INTEL_SLOT||!process.env.PRECEDING_RELEASE)throw Error('Windows, fresh canonical slot grant and actual preceding FREE required');
  const frames=Number(process.env.FRAMES||48);
  if(!Number.isInteger(frames)||frames<32||frames>120||process.env.GPU_DELTA_BUDGET_MS!==undefined)throw Error('Invalid sample count or attempted budget override');
  fs.mkdirSync(out,{recursive:true});const report={sha,version,entryHash:hash(entry),grant:process.env.INTEL_SLOT,precedingRelease:process.env.PRECEDING_RELEASE,startedAt:new Date(started).toISOString(),budgetMs:MAX_MS,frames,order:['default-on','explicit-off'],sceneOrder:['home','party','blink'],viewport:[960,540],pixelScale:1,scenery:120,errors:[],cpu:[],arms:[],complete:false,status:'INSUFFICIENT',note:'Single paired steady GPU diagnostic; full View.render timed, frozen real scenes. ON first, OFF can benefit from caches. No cold-cache, startup or broad gameplay claim.'};
  let browserServer,browser,server,cpuTimer,hardTimer,workTimer,rejectStop,initialIdle,cpuPending=Promise.resolve();
  const stop=new Promise((_,reject)=>{rejectStop=reject;});stop.catch(()=>{});
  const fail=e=>{report.error=String(e);rejectStop(e instanceof Error?e:Error(String(e)));};
  const save=()=>fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2));
  const bounded=p=>Promise.race([p,stop]);
  const remaining=()=>Math.max(1,WORK_MS-(Date.now()-started));
  try{
    hardTimer=setTimeout(()=>{report.error='Hard270s deadline';report.status='INSUFFICIENT';report.complete=false;report.browserServerClosed=false;report.elapsedMs=Date.now()-started;save();void browserServer?.kill().catch(()=>{});server?.closeAllConnections();server?.close();setTimeout(()=>process.exit(2),1000);},MAX_MS-1000);
    workTimer=setTimeout(()=>fail(Error('258s work deadline; cleanup reserved')),remaining());
    const state=laptopState();report.preconditions=state;initialIdle=state.idleMs;
    if(state.idleMs<60000||state.headless.length)throw Error('Laptop must be idle60s with no other headless/Playwright browser');
    const load=await cpu();report.cpu.push(load);if(load.percent>=70)throw Error('CPU contamination at start');
    cpuTimer=setInterval(()=>{cpuPending=cpuPending.then(async()=>{try{const c=await cpu();report.cpu.push(c);if(c.percent>=70){report.timingsContaminated=true;fail(Error('CPU>=70%; timing rejected'));}save();}catch(e){fail(e);}});},10000);
    const mime={'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.woff2':'font/woff2','.png':'image/png','.webp':'image/webp','.ogg':'audio/ogg','.wasm':'application/wasm'};
    server=http.createServer((req,res)=>{const pth=new URL(req.url,'http://x').pathname;if(pth==='/favicon.ico'){res.writeHead(204);return res.end();}let f=path.resolve(root,'.'+decodeURIComponent(pth));if(f!==root&&!f.startsWith(root+path.sep)){res.writeHead(403);return res.end();}if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');try{res.setHeader('content-type',mime[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f));}catch{report.errors.push('HTTP404 '+req.url);fail(Error('HTTP404 '+req.url));res.writeHead(404);res.end();}});
    await bounded(new Promise(r=>server.listen(0,'127.0.0.1',r)));const base=`http://127.0.0.1:${server.address().port}`;
    const pw=require(process.env.PLAYWRIGHT_MODULE||'playwright');
    browserServer=await bounded(pw.chromium.launchServer({headless:true,...(process.env.CHROMIUM?{executablePath:process.env.CHROMIUM}:{}),args:['--use-gl=angle','--use-angle=d3d11','--ignore-gpu-blocklist','--disable-background-timer-throttling','--disable-renderer-backgrounding']}));
    report.browserPid=browserServer.process().pid;browser=await bounded(pw.chromium.connect(browserServer.wsEndpoint()));
    const context=await browser.newContext({viewport:{width:960,height:540},deviceScaleFactor:1});
    await context.addInitScript(()=>{
      localStorage.clear();localStorage.setItem('witch.player',JSON.stringify({master:0,music:0,effects:0,voices:0,muteBackground:true,quality:'high',shake:false,screen:'',reduceFlashing:false,talk:'hold',textSize:1,glyphs:'auto',rumble:false}));
      let hooks;Object.defineProperty(window,'witch',{configurable:true,get:()=>hooks,set:value=>{hooks=value;if(Object.getOwnPropertyDescriptor(value??{},'manual')?.set)value.manual=true;}});
    });
    for(const on of [true,false]){
      const page=await context.newPage();let closing=false;page.setDefaultTimeout(30000);page.setDefaultNavigationTimeout(30000);
      page.on('pageerror',e=>{if(!closing){report.errors.push(String(e));fail(e);}});page.on('console',m=>{if(!closing&&m.type()==='error'){report.errors.push(m.text());fail(Error(m.text()));}});page.on('requestfailed',r=>{if(!closing){report.errors.push('Fetch failed '+r.url());fail(Error('Resource failure'));}});
      await bounded(page.goto(base+'/?seed=123&world=0&island=10&wave=3&shot=room:terrace&ladder=off&px=1&recording=0'+(on?'':'&patternlight=off')));
      await bounded(page.waitForFunction(()=>window.witch?.ready,null,{timeout:remaining()}));
      const served=await bounded(page.evaluate(async()=>await (await fetch('./version.json',{cache:'no-store'})).json()));if(JSON.stringify(served)!==JSON.stringify(version))throw Error('Actual served build mismatch');
      const info=await bounded(page.evaluate(()=>{const gl=window.witch.view.renderer.getContext(),d=gl.getExtension('WEBGL_debug_renderer_info');return {gpu:d?gl.getParameter(d.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER),khr:!!gl.getExtension('KHR_parallel_shader_compile'),timer:!!gl.getExtension('EXT_disjoint_timer_query_webgl2')};}));capabilities(info);if(report.hardware&&JSON.stringify(info)!==JSON.stringify(report.hardware))throw Error('GPU changed across arms');report.hardware=info;
      const arm={on,served,scenes:[]};report.arms.push(arm);
      for(const scene of report.sceneOrder){
        report.stage={on,scene,phase:'setup'};save();
        if(remaining()<12000)throw Error('Insufficient shared budget for another scene');
        const activity=laptopState();if(activity.idleMs<initialIdle||activity.headless.some(p=>p.ProcessId!==report.browserPid))throw Error('New user input or another headless process; timing rejected');
        const fixture=await bounded(page.evaluate(setup,scene));report.stage.phase='settle';await bounded(page.evaluate(settle));
        if(scene==='blink')fixture.blink=await bounded(page.evaluate(blink));
        report.stage.phase='GPU samples';save();const data=await bounded(page.evaluate(measure,{scene,on,frames,remaining:remaining()}));
        if(remaining()<12000)throw Error('Insufficient shared budget for final scene guards');
        const after=laptopState();if(after.idleMs<initialIdle||after.headless.some(p=>p.ProcessId!==report.browserPid))throw Error('Input/concurrent browser during samples; timing rejected');
        arm.scenes.push({scene,fixture,...data,fingerprint:hash(JSON.stringify({fixture,descriptor:data.descriptor}))});save();
        if(!on){const result={scene,...pair(report.arms[0].scenes.find(s=>s.scene===scene),arm.scenes.find(s=>s.scene===scene))};(report.pairs??=[]).push(result);save();if(!result.withinCeiling){report.overBudget=true;throw Error('Canonical incremental GPU budget exceeded in '+scene);}}
      }
      closing=true;await bounded(page.close());
    }
    if(remaining()<12000)throw Error('Insufficient shared budget for end guards');
    clearInterval(cpuTimer);await cpuPending;const endLoad=await cpu();report.cpu.push(endLoad);if(report.cpu.some(c=>c.percent>=70))throw Error('CPU contamination at end');
    if(laptopState().idleMs<initialIdle)throw Error('New user input at end; timing rejected');
    if(report.errors.length)throw Error('Page/resource errors');
    report.complete=true;report.status='PASS';
  }catch(e){report.error=String(e.stack||e);report.complete=false;report.status=report.overBudget?'OVER_BUDGET':'INSUFFICIENT';process.exitCode=2;}
  finally{
    clearInterval(cpuTimer);clearTimeout(workTimer);await cpuPending;
    let cleanupTimer;try{await Promise.race([browserServer?.close(),new Promise((resolve,reject)=>{cleanupTimer=setTimeout(()=>{Promise.resolve(browserServer?.kill()).then(resolve,reject);},4000);})]);}catch{await browserServer?.kill().catch(()=>{});}finally{clearTimeout(cleanupTimer);}
    server?.closeAllConnections();if(server?.listening)await new Promise(r=>server.close(r));
    report.browserServerClosed=!browserServer||browserServer.process().exitCode!==null||browserServer.process().signalCode!==null;report.serverClosed=!server?.listening;report.endedAt=new Date().toISOString();report.elapsedMs=Date.now()-started;report.timingsContaminated=!!report.timingsContaminated||report.cpu.some(c=>c.percent>=70);if(!report.browserServerClosed||!report.serverClosed||report.errors.length||report.timingsContaminated){report.complete=false;report.status='INSUFFICIENT';process.exitCode=2;}save();clearTimeout(hardTimer);
  }
  console.log(JSON.stringify({status:report.status,complete:report.complete,pairs:report.pairs,error:report.error,elapsedMs:report.elapsedMs,browserClosed:report.browserServerClosed,serverClosed:report.serverClosed}));
}
module.exports={percentile,pair,capabilities,MAX_MS,WORK_MS,GPU_BUDGET};
if(require.main===module)main().catch(e=>{console.error(e.stack||e);process.exitCode=2;});
