// Run only through run.cjs and the reviewed kernel job. No execution on import.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),crypto=require('node:crypto');
const { TARGET, assert, classifyGround }=require('./contract.cjs');
const { bootProbe }=require('./legacy-probe.cjs');
// The pinned artifact declares no favicon and contains no favicon.ico. This optional browser request is harness-only.
function absentFavicon(root,name) {return name==='/favicon.ico'&&!fs.existsSync(path.join(root,'favicon.ico'));}
function metadata(classify) {
  const sources=new WeakMap(),attached=new WeakMap(),compiles=new WeakMap();
  for(const proto of [WebGLRenderingContext.prototype,WebGL2RenderingContext.prototype]) {
    const source=proto.shaderSource,attach=proto.attachShader,compile=proto.compileShader,link=proto.linkProgram;
    proto.shaderSource=function(shader,text){sources.set(shader,text);return source.call(this,shader,text);};
    proto.attachShader=function(program,shader){const shaders=attached.get(program)||[];shaders.push(shader);attached.set(program,shaders);return attach.call(this,program,shader);};
    proto.compileShader=function(shader){const at=performance.now(),value=compile.call(this,shader);compiles.set(shader,{at,callMs:performance.now()-at});return value;};
    proto.linkProgram=function(program){const value=link.call(this,program),row=window.__intel.links.findLast(r=>r.object===program);
      if(row)for(const shader of attached.get(program)||[]){const text=sources.get(shader)||'',ground=classify(text);if(ground){row.ground=ground;row.fragment=text;row.fragmentCompile=compiles.get(shader)??null;}}
      return value;
    };
  }
}
async function main(local, out) {
  assert(process.env.OWNED_RUN_CONTROL && process.env.INTEL_SLOT && process.env.PRECEDING_RELEASE, 'Owned kernel slot required');
  const pw=require(local.playwrightModule),started=Date.now(),end=started+230000;
  const report={target:TARGET,started:new Date(started).toISOString(),note:'Single ordered no-lakes then forced full-lakes session; no cache purge/repeat. Readiness walls include polling, not compiler CPU. No game timing/visual acceptance.',rows:[],errors:[]};
  fs.mkdirSync(out,{recursive:true});const save=()=>fs.writeFileSync(path.join(out,'measurement.json'),JSON.stringify(report,null,2));save();
  let browser,page;
  const server=http.createServer((req,res)=>{try{
    const name=decodeURIComponent(new URL(req.url,'http://local').pathname),base=path.resolve(local.artifactDir),file=path.resolve(base,'.'+name);
    if(file!==base&&!file.startsWith(base+path.sep)){res.writeHead(403).end();return;}
    if(absentFavicon(base,name)){res.writeHead(204).end();return;}
    const p=fs.statSync(file).isDirectory()?path.join(file,'index.html'):file;
    res.setHeader('Cache-Control','no-store');res.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.json':'application/json','.css':'text/css','.png':'image/png','.webp':'image/webp','.ogg':'audio/ogg'})[path.extname(p)]||'application/octet-stream');
    fs.createReadStream(p).on('error',()=>res.destroy()).pipe(res);
  }catch{res.writeHead(404).end();}});
  let timer;
  try {
    await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
    const base='http://127.0.0.1:'+server.address().port;
    const served=await(await fetch(base+'/version.json')).json();assert(served.version===TARGET.version,'Wrong served version');report.served=served;save();
    timer=setTimeout(()=>{report.errors.push('230s driver deadline');save();process.exitCode=1;void browser?.close();server.closeAllConnections();server.close();},230000);
    browser=await pw.chromium.launch({headless:true,executablePath:local.browserPath,args:['--use-gl=angle','--use-angle=d3d11','--ignore-gpu-blocklist']});
    for(const fixture of [{id:'no-lakes',island:'home',seed:'123',extra:'',limit:70000},{id:'full-lakes',island:'fox',seed:'424242',extra:'&lakelook=water',limit:140000}]) {
      assert(Date.now()<end-10000,'No time for another phase');
      const context=await browser.newContext({viewport:{width:960,height:540}});page=await context.newPage();
      page.on('pageerror',e=>{report.errors.push(String(e));save();});
      const consoleErrors=[];page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text());});
      await page.addInitScript({content:'('+bootProbe.toString()+')();('+metadata.toString()+')('+classifyGround.toString()+');'});
      report.active=fixture.id;save();
      await page.goto(base+'/?creator=0&quick=1&timing=1&world=0&warmChart=0&prepChart=0&ladder=off&island='+fixture.island+'&seed='+fixture.seed+fixture.extra,{waitUntil:'domcontentloaded',timeout:15000});
      await page.waitForFunction(()=>window.witch?.view?.renderer,null,{timeout:15000});
      const gpu=await page.evaluate(()=>{const gl=window.witch.view.renderer.getContext(),ext=gl.getExtension('WEBGL_debug_renderer_info');return ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):null;});
      assert(/Intel/i.test(gpu??'')&&!/SwiftShader|llvmpipe/i.test(gpu),'Intel hardware renderer not verified');
      const version=await page.evaluate(async()=>await(await fetch('./version.json',{cache:'no-store'})).json());
      assert(version.version===TARGET.version,'Browser served a different version');
      const limit=Math.min(fixture.limit,end-Date.now()-10000);
      await page.waitForFunction(expected=>{const rows=window.__intel?.links.filter(r=>r.ground&&(expected==='no-lakes'?r.ground.family==='no-lakes':r.ground.family==='lakes'))||[];
        return [false,true].every(beach=>rows.some(r=>r.ground.beach===beach&&r.parallel&&r.readyAt!==null));},fixture.id,{timeout:limit,polling:100});
      const data=await page.evaluate(()=>({links:window.__intel.links.filter(r=>r.ground).map(({object,...r})=>({...r,compileWallMs:r.readyAt===null?null:r.readyAt-r.at})),worstRAF:Math.max(0,...window.__intel.frames.map(f=>f.ms))}));
      const links=data.links.map(({fragment,...r})=>({...r,fragmentSha256:crypto.createHash('sha256').update(fragment).digest('hex')}));
      const required=['WATER','ICE','LAVA','OASIS','SINKHOLE','TARN','TAR','RUST','LILY'];
      if(fixture.id==='full-lakes')assert(links.filter(r=>r.ground.family==='lakes').every(r=>required.every(k=>r.ground.defines.includes('GROUND_LAKE_'+k))),'Full nine-kind family not observed; no fixture substitution');
      assert(!consoleErrors.length&&!report.errors.length,'Page reported errors');
      report.rows.push({fixture,gpu,version,links,worstRAF:data.worstRAF,consoleErrors});save();await context.close();page=null;
    }
  } catch(e) {
    report.errors.push(String(e));save();
    if(page)try{report.partial=await Promise.race([page.evaluate(()=>({links:window.__intel?.links.filter(r=>r.ground).map(({object,fragment,...r})=>r)})),new Promise((_,reject)=>setTimeout(()=>reject(Error('partial capture deadline')),750))]);}catch{}
    process.exitCode=1;
  } finally {
    clearTimeout(timer);if(browser)await Promise.race([browser.close(),new Promise(ok=>setTimeout(ok,3000))]);
    server.closeAllConnections();await new Promise(ok=>server.close(()=>ok()));
    report.ended=new Date().toISOString();report.wallMs=Date.now()-started;save();
  }
  assert(report.rows.length===2&&!report.errors.length,'Incomplete measurement; no retry inferred');
}
if(require.main===module)main(JSON.parse(fs.readFileSync(process.argv[2],'utf8')),path.resolve(process.argv[3])).catch(e=>{console.error(String(e));process.exitCode=1;});
module.exports={metadata,absentFavicon};
