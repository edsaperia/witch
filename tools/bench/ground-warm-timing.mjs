// Allocated Intel-only ON/OFF sail timing pair; prepared exact build, one shared 270s deadline, no retries.
// EXPECT_SHA, INTEL_SLOT and PRECEDING_RELEASE are required; args: dist output-directory.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {createServer} from 'node:http';
import {createRequire} from 'node:module';
import {preflight} from './ground-warm-preflight.mjs';
import {waitWarmFunction} from './ground-warm-controls.mjs';
import {observeArrivalGround,groundReuseObservation} from './ground-warm-observation.mjs';
import {groundShaderKey} from './ground-warm-key.mjs';
import {startSailTiming,timingArm,compareTiming} from './ground-warm-timing-data.mjs';
const root=path.resolve(process.argv[2]||'dist'),out=path.resolve(process.argv[3]||'ground-warm-timing');
const sha=process.env.EXPECT_SHA,budget=Number(process.env.PROBE_BUDGET_MS||270000);
if(process.platform!=='win32'||!sha||!process.env.INTEL_SLOT||!process.env.PRECEDING_RELEASE||!Number.isFinite(budget)||budget<1000||budget>270000)throw Error('Exact SHA, fresh Intel allocation, prior FREE and <=270s budget required');
const version=JSON.parse(fs.readFileSync(path.join(root,'version.json'),'utf8'));
if(!version.version.includes(sha.slice(0,7)))throw Error('Prepared build SHA mismatch');
// Fail before importing Playwright or opening a listener when preparation is absent/stale.
const fixture=await preflight(root,sha),target=fixture.targets[0];
fs.mkdirSync(out,{recursive:true});
const report={sha,version,grant:process.env.INTEL_SLOT,precedingRelease:process.env.PRECEDING_RELEASE,startedAt:new Date().toISOString(),budgetMs:budget,order:['ON','OFF'],fixture,arms:[],cpu:[],errors:[],status:'INSUFFICIENT',complete:false,
  protocol:'ON then OFF, separate fresh browsers/contexts, equal treehouse dwell; full wall frames overlap sail/arrival boundary. No OS shader-cache purge, no cold-cache claim. Sail p95 noise=max(2ms,5% OFF p95).'};
const save=()=>fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2));
let browser,page,timer,cpuTimer,deadline=false,dwellMs=0;
const server=createServer((req,res)=>{
  const pathname=new URL(req.url,'http://local').pathname;if(pathname==='/favicon.ico'){res.writeHead(204);return res.end();}
  let file=path.resolve(root,'.'+decodeURIComponent(pathname));
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  try{res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}
  catch{report.errors.push('HTTP404 '+req.url);res.writeHead(404);res.end();}
});
let previousCpu=os.cpus();
const sampleCpu=()=>{const next=os.cpus();let idle=0,total=0;next.forEach((c,i)=>{idle+=c.times.idle-previousCpu[i].times.idle;for(const k in c.times)total+=c.times[k]-previousCpu[i].times[k];});previousCpu=next;if(total>0)report.cpu.push({at:new Date().toISOString(),percent:100*(1-idle/total)});};
try{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));report.port=server.address().port;save();
  const wallStart=Date.now();
  timer=setTimeout(()=>{deadline=true;report.error='Shared 270s pair deadline';save();const force=setTimeout(()=>process.exit(2),5000);browser?.close().finally(()=>clearTimeout(force));},budget);
  cpuTimer=setInterval(()=>{sampleCpu();save();},1000);
  const pw=createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE||'playwright');
  for(const mode of report.order){
    const arm={mode,startedAt:new Date().toISOString(),errors:[]};report.arms.push(arm);save();
    browser=await pw.chromium.launch({headless:true,...(process.env.CHROMIUM?{executablePath:process.env.CHROMIUM}:{}),args:['--use-gl=angle','--use-angle=d3d11','--ignore-gpu-blocklist']});
    const context=await browser.newContext({viewport:{width:960,height:540}});page=await context.newPage();
    page.setDefaultTimeout(90000);page.setDefaultNavigationTimeout(30000);
    page.on('pageerror',e=>arm.errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')arm.errors.push(m.text());});
    await page.addInitScript(f=>{Math.random=()=>f.random;localStorage.setItem(f.saveKey,JSON.stringify(f.save));},fixture);
    // ON omits the switch: this measures the production default, not the runtime setter.
    await page.goto(`http://127.0.0.1:${server.address().port}/${fixture.url}${mode==='OFF'?'&precompileGround=0':''}`);
    arm.served=await page.evaluate(async()=>await (await fetch('./version.json',{cache:'no-store'})).json());
    if(!arm.served.version.includes(sha.slice(0,7)))throw Error('Actual served SHA mismatch');
    const wait=predicate=>waitWarmFunction(page,predicate,{timeout:90000});
    await wait(()=>window.witch?.view);
    arm.capabilities=await page.evaluate(()=>{const gl=window.witch.view.renderer.getContext(),d=gl.getExtension('WEBGL_debug_renderer_info');return {gpu:d?gl.getParameter(d.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER),parallel:!!gl.getExtension('KHR_parallel_shader_compile')};});
    if(!/Intel/i.test(arm.capabilities.gpu)||/SwiftShader/i.test(arm.capabilities.gpu)||!arm.capabilities.parallel)throw Error('Intel hardware and KHR required');
    if(mode==='OFF'&&arm.capabilities.gpu!==report.arms[0].capabilities.gpu)throw Error('Paired GPU differs');
    await wait(()=>window.witch.ready);await page.keyboard.press('Space');await wait(()=>getComputedStyle(document.getElementById('start')).display==='none');
    const dwellStart=await page.evaluate(({inside,on})=>{const w=window.witch;if(w.precompileGround!==on)throw Error('Production default/off-switch mismatch');const result=w.shot(inside);if(!result.ok)throw Error(result.say);return performance.now();},{inside:fixture.inside,on:mode==='ON'});
    if(mode==='ON'){
      await wait(()=>window.witch.groundWarmStatus.retained>0);
      arm.warm=await page.evaluate(()=>{const marks=performance.getEntriesByType('mark'),submit=marks.find(m=>m.name==='ground:warm-submit'),prepare=marks.filter(m=>m.name==='ground:warm-prepare'&&m.startTime<=submit.startTime).at(-1);return {id:prepare.detail.id,seed:prepare.detail.seed,...submit.detail};});
      if(arm.warm.id!==target.id||arm.warm.seed!==target.seed)throw Error('Warm target differs from fixture');
      dwellMs=await page.evaluate(start=>performance.now()-start,dwellStart);
    }else await page.waitForTimeout(dwellMs);
    arm.dwellMs=await page.evaluate(start=>performance.now()-start,dwellStart);
    await page.evaluate(observeArrivalGround,target);await page.evaluate(startSailTiming,target);
    await wait(()=>window.__groundWarmTiming?.done&&window.__groundWarmTiming.sailResolved);
    arm.raw=await page.evaluate(()=>({timing:window.__groundWarmTiming,arrival:window.__groundWarmArrival,enabled:window.witch.precompileGround,marks:performance.getEntriesByType('mark').filter(m=>m.name.startsWith('ground:warm-')).map(m=>({name:m.name,at:m.startTime,detail:m.detail}))}));
    const draw=arm.raw.arrival.firstDraw;
    arm.shaderRecipeMatch=groundShaderKey(draw)===target.shaderKey;
    if(!arm.shaderRecipeMatch||draw.island!==target.id||draw.seed!==target.seed)throw Error('Arrival recipe/identity mismatch');
    if(mode==='ON'){arm.reuse=groundReuseObservation(arm.warm,arm.raw.arrival);if(arm.reuse.status!=='PASS')throw Error(arm.reuse.reason);}
    else if(arm.raw.marks.some(m=>/^ground:warm-(prepare|submit|poll)$/.test(m.name)))throw Error('OFF arm warmed ground');
    arm.metrics=timingArm(arm.raw.timing);
    if(arm.errors.length||report.errors.length)throw Error('Page/resource errors');
    arm.endedAt=new Date().toISOString();save();await browser.close();browser=null;page=null;
    if(deadline)throw Error('Shared pair deadline');
  }
  report.wallMs=Date.now()-wallStart;
  sampleCpu();report.timingsContaminated=report.cpu.some(c=>c.percent>=70);
  report.comparison=compareTiming(report.arms[0].metrics,report.arms[1].metrics,report.timingsContaminated);
  report.status=report.comparison.status;report.complete=report.status==='PASS';
  if(report.status!=='PASS')process.exitCode=report.status==='INSUFFICIENT'?2:1;
}catch(error){
  if(page&&!page.isClosed())try{report.failedState=await page.evaluate(()=>({timing:window.__groundWarmTiming,arrival:window.__groundWarmArrival,warm:window.witch?.groundWarmStatus}));}catch{}
  report.error=String(error?.stack||error);report.status=deadline||error?.name==='TimeoutError'?'INSUFFICIENT':'FAIL';process.exitCode=report.status==='INSUFFICIENT'?2:1;
}finally{
  clearTimeout(timer);clearInterval(cpuTimer);await browser?.close();await new Promise(r=>server.close(r));sampleCpu();
  report.timingsContaminated=report.cpu.some(c=>c.percent>=70);
  if(report.timingsContaminated&&report.status==='PASS'){report.status='INSUFFICIENT';report.comparison.status='INSUFFICIENT';report.complete=false;process.exitCode=2;}
  report.endedAt=new Date().toISOString();save();console.log(JSON.stringify({status:report.status,complete:report.complete,comparison:report.comparison,error:report.error,endedAt:report.endedAt}));
}
