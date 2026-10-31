// Prepared build only. No browser without a fresh canonical allocation and actual prior browser-free report.
// EXPECT_SHA=<full> INTEL_SLOT=<grant-comment> PRECEDING_RELEASE=<report> node tools/bench/ground-warm.mjs <dist> <out>
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {createServer} from 'node:http';
import {createRequire} from 'node:module';
import {preflight} from './ground-warm-preflight.mjs';
import {closeWarmChart,waitWarmFunction} from './ground-warm-controls.mjs';
const abort=message=>{console.error(`FAIL ground-warm: ${message}`);process.exit(1);};
const require=createRequire(import.meta.url), root=path.resolve(process.argv[2]||'dist'), out=path.resolve(process.argv[3]||'ground-warm-probe');
const cloud=process.platform!=='win32', scale=Number(process.env.TIMEOUT_SCALE||(cloud?'5':'1'));
const budget=Number(process.env.PROBE_BUDGET_MS||(cloud?'2880000':'420000'));
if(!Number.isFinite(scale)||scale<1||scale>(cloud?5:1)||!Number.isFinite(budget)||budget<1000||budget>(cloud?2880000:420000))abort('Invalid bounded probe timeout configuration');
const waitMs=ms=>ms*scale;
if(!process.env.EXPECT_SHA||!process.env.INTEL_SLOT||!process.env.PRECEDING_RELEASE)abort('Exact SHA, new allocation and canonical preceding release required');
if(cloud&&process.env.CLOUD_RIG!=='1')abort('Cloud rig requires canonical allocation');
const insufficient=message=>{console.error(`INSUFFICIENT ground-warm: preflight: ${message}`);process.exit(2);};
let version;try{version=JSON.parse(fs.readFileSync(path.join(root,'version.json'),'utf8'));}catch(error){insufficient(`Prepared version unreadable: ${error.message}`);}
if(!version.version.includes(process.env.EXPECT_SHA.slice(0,7)))insufficient('Prepared build SHA mismatch');
let fixture;
try{fixture=await preflight(root,process.env.EXPECT_SHA);}catch(error){console.error(`INSUFFICIENT ground-warm: preflight: ${error.message}`);process.exit(2);}
fs.mkdirSync(out,{recursive:true});
const report={sha:process.env.EXPECT_SHA,grant:process.env.INTEL_SLOT,precedingRelease:process.env.PRECEDING_RELEASE,version,timeoutScale:scale,budgetMs:budget,startedAt:new Date().toISOString(),errors:[],cpu:[],complete:false,status:'INSUFFICIENT',note:'Single candidate lifecycle/cache-identity probe. No boot/travel speedup inference; no OS shader-cache purge. Historical666.7ms frame is not a gate.'};
const save=()=>fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2));
const cpu=async()=>{const a=os.cpus();await new Promise(r=>setTimeout(r,1000));let idle=0,total=0;os.cpus().forEach((c,i)=>{idle+=c.times.idle-a[i].times.idle;for(const k in c.times)total+=c.times[k]-a[i].times[k];});return {at:new Date().toISOString(),percent:100*(1-idle/total)};};
let browser,timer,cpuTimer,page;
const wait=(predicate,options)=>waitWarmFunction(page,predicate,options);
const snapshot=async stage=>{
  if(!page||page.isClosed())return;
  try{
    const state=await page.evaluate(()=>({at:performance.now(),paused:document.body.classList.contains('paused'),chartOpen:!!document.getElementById('chart-overlay'),warm:window.witch?.groundWarmStatus,body:window.witch?.game?.witch&&{perch:!!window.witch.game.witch.perch,mode:window.witch.game.witch.mode},marks:performance.getEntriesByType('mark').filter(m=>m.name.startsWith('ground:warm-')).map(m=>({name:m.name,at:m.startTime,detail:m.detail&&{id:m.detail.id,seed:m.detail.seed,world:m.detail.world,reason:m.detail.reason,programs:m.detail.programs}}))}));
    (report.stages??=[]).push({stage,...state});save();
  }catch(error){(report.snapshotErrors??=[]).push(String(error));}
};
const server=createServer((req,res)=>{const pathname=new URL(req.url,'http://x').pathname;if(pathname==='/favicon.ico'){res.writeHead(204);return res.end();}let file=path.resolve(root,'.'+decodeURIComponent(pathname));if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');try{res.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.json':'application/json','.css':'text/css'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{report.errors.push('HTTP404 '+req.url);res.writeHead(404);res.end();}});
try{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));save();report.cpu.push(await cpu());
  const pw=require(process.env.PLAYWRIGHT_MODULE||'playwright');
  browser=await pw.chromium.launch({headless:true,...(process.env.CHROMIUM?{executablePath:process.env.CHROMIUM}:{}),args:cloud?['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']:['--use-gl=angle','--use-angle=d3d11','--ignore-gpu-blocklist']});
  timer=setTimeout(async()=>{report.error=`${budget/1000}s deadline`;report.status='INSUFFICIENT';save();const force=setTimeout(()=>{console.log('INSUFFICIENT ground-warm: cleanup deadline');process.exit(2);},5000);try{await browser?.close();}finally{clearTimeout(force);}},budget);
  cpuTimer=setInterval(async()=>{report.cpu.push(await cpu());save();},10000);
  const context=await browser.newContext({viewport:{width:960,height:540}});page=await context.newPage();
  page.setDefaultTimeout(waitMs(30000));page.setDefaultNavigationTimeout(waitMs(30000));
  page.on('pageerror',e=>report.errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
  // Deliberately fixed randomness in this lifecycle-only fixture: every offered/chart seed is preflighted.
  await page.addInitScript(f=>{Math.random=()=>f.random;localStorage.setItem(f.saveKey,JSON.stringify(f.save));},fixture);
  await page.goto(`http://127.0.0.1:${server.address().port}/${fixture.url}`);
  report.served=await page.evaluate(async()=>await (await fetch('./version.json',{cache:'no-store'})).json());
  if(!report.served.version.includes(process.env.EXPECT_SHA.slice(0,7)))throw Error('Actual served SHA mismatch');
  await wait(()=>window.witch?.view,{timeout:waitMs(150000)});
  const capabilities=await page.evaluate(()=>{const gl=window.witch.view.renderer.getContext(),d=gl.getExtension('WEBGL_debug_renderer_info');return {gpu:d?gl.getParameter(d.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER),parallel:!!gl.getExtension('KHR_parallel_shader_compile')};});
  report.gpu=capabilities.gpu;report.parallel=capabilities.parallel;
  if(process.platform==='win32'&&(!/Intel/i.test(report.gpu)||/SwiftShader/i.test(report.gpu)))throw Error('Intel hardware required');
  if(cloud&&!/SwiftShader/i.test(report.gpu))throw Error('Allocated cloud probe requires SwiftShader');
  if(!report.parallel){const error=new Error('KHR_parallel_shader_compile unavailable; production correctly does no warm work on this context');error.name='InsufficientError';throw error;}
  await wait(()=>window.witch?.ready,{timeout:waitMs(150000)});await page.keyboard.press('Space');
  await wait(()=>getComputedStyle(document.getElementById('start')).display==='none');
  const inside=async()=>page.evaluate(shot=>{const w=window.witch,r=w.shot(shot);if(!r.ok)throw Error(r.say);w.precompileGround=true;},fixture.inside);
  const outside=async()=>page.evaluate(shot=>{const w=window.witch,r=w.shot(shot);if(!r.ok)throw Error(r.say);},fixture.outside);
  const counts=async()=>page.evaluate(()=>performance.getEntriesByType('mark').filter(m=>/^ground:warm-(prepare|submit|poll)$/.test(m.name)).map(m=>m.name));
  await inside();await wait(()=>window.witch.groundWarmStatus.preparing,{timeout:waitMs(60000)});await snapshot('descriptor-active');await outside();
  await wait(()=>!window.witch.groundWarmStatus.eligible);const before=await counts();await page.waitForTimeout(waitMs(500));const after=await counts();
  if(JSON.stringify(before)!==JSON.stringify(after))throw Error('Work continued after leaving mid-prepare');report.midPrepareExit=true;await snapshot('descriptor-exit');
  await page.evaluate(()=>window.witch.chart());
  await wait(()=>window.witch.groundWarmStatus.eligible);report.mapEligibility=true;
  await wait(()=>window.witch.groundWarmStatus.active,{timeout:waitMs(90000)});await snapshot('gpu-active');await closeWarmChart(page);
  await wait(()=>!document.getElementById('chart-overlay')&&!document.body.classList.contains('paused')&&!window.witch.groundWarmStatus.eligible);const beforeGpu=await counts();await page.waitForTimeout(waitMs(500));const afterGpu=await counts();
  if(JSON.stringify(beforeGpu)!==JSON.stringify(afterGpu))throw Error('Submission/poll continued outside after GPU submission');report.midGpuExit=true;
  await snapshot('gpu-exit');await inside();await snapshot('treehouse-reentry');
  await wait(()=>window.witch.groundWarmStatus.eligible);await wait(()=>window.witch.groundWarmStatus.retained>0,{timeout:waitMs(90000)});await snapshot('retained');
  const target=await page.evaluate(()=>{const marks=performance.getEntriesByType('mark'),submit=marks.find(m=>m.name==='ground:warm-submit');const prepare=marks.filter(m=>m.name==='ground:warm-prepare'&&m.startTime<=submit.startTime).at(-1);return {id:prepare.detail.id,seed:prepare.detail.seed,...submit.detail,targets:window.witch.groundWarmStatus.targets};});
  if(target.id!==target.targets[0])throw Error('First compile target was not nearest reachable island');report.target=target;
  if(target.id!==fixture.targets[0].id||target.seed!==fixture.seed)throw Error('Runtime target differs from preflight fixture');
  await page.evaluate(async t=>{await window.witch.sail(t.id,t.seed);},target);
  await wait(()=>window.witch.ready,{timeout:waitMs(150000)});
  report.live=await page.evaluate(()=>{const w=window.witch,p=w.view.renderer.properties.get(w.view.ground.programMaterial);return {island:w.game.map.island?.kind,seed:w.game.seed,keys:[...(p.programs?.keys()??[])],programs:[...(p.programs?.values()??[])].map(p=>p.id)};});
  if(report.live.seed!==target.seed||!target.keys.some(k=>report.live.keys.includes(k))||!target.programs.some(id=>report.live.programs.includes(id)))throw Error('Exact normal-ground cache key/program was not reused');
  report.marks=await page.evaluate(()=>performance.getEntriesByType('mark').filter(m=>m.name.startsWith('ground:warm-')).map(m=>({name:m.name,at:m.startTime,detail:m.detail})));
  if(report.errors.length)throw Error(report.errors.join('; '));report.complete=true;report.status='PASS';
}catch(error){await snapshot('error');const deadline=report.error?.includes('deadline');report.error=String(error?.stack||error);report.status=report.errors.length?'FAIL':deadline||error?.name==='TimeoutError'||error?.name==='InsufficientError'?'INSUFFICIENT':'FAIL';process.exitCode=report.status==='INSUFFICIENT'?2:1;}
finally{clearTimeout(timer);clearInterval(cpuTimer);await browser?.close();await new Promise(r=>server.close(r));report.cpu.push(await cpu());report.timingsContaminated=report.cpu.some(c=>c.percent>=70);report.endedAt=new Date().toISOString();save();console.log(`${report.status} ground-warm: ${report.complete?'exact program reuse and lifecycle gates observed':report.error}`);console.log(JSON.stringify({status:report.status,complete:report.complete,error:report.error,endedAt:report.endedAt}));}
