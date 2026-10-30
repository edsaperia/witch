// Stage 0 evidence, cloud/browser slot ONLY. Build first with WITCH_SHA set to the checkout HEAD: npx vite build
// node tools/magic-mock/capture.cjs [output directory]
// Uses the real forest/renderer/camera. Real GPU queries or null with a reason, never CPU time labelled GPU.
const fs = require('node:fs'), path = require('node:path'), http = require('node:http');
const { execFileSync } = require('node:child_process');
let playwright; try { playwright = require(process.env.PLAYWRIGHT_MODULE||'playwright'); } catch { playwright = require('/opt/node22/lib/node_modules/playwright'); }
const root = path.resolve(process.env.DIST || 'dist'), out = path.resolve(process.argv[2] || 'previews/magic-mock');
const production=process.env.FX_PRODUCTION==='1';
const modes=production?(process.env.FX_ELEMENTS||Object.keys(JSON.parse(fs.readFileSync(path.resolve('config/fx/elements.json'),'utf8'))).join(',')).split(','):['1','iso','frost'];
const types = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.ogg':'audio/ogg','.woff2':'font/woff2'};
(async()=>{
  fs.mkdirSync(out,{recursive:true});
  const commit=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
  const build=JSON.parse(fs.readFileSync(path.join(root,'version.json'),'utf8'));
  if(!build.version.includes(commit.slice(0,7)))throw Error('Build is not stamped with this HEAD. Set WITCH_SHA to git rev-parse HEAD, then npx vite build.');
  const server=http.createServer((req,res)=>{
    const p=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://x').pathname));
    if(!p.startsWith(root+path.sep) && p!==root) {res.writeHead(403);res.end();return;}
    const f=p===root?path.join(root,'index.html'):p;
    fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'content-type':types[path.extname(f)]||'application/octet-stream'});res.end(e?'':b);});
  });
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const browser=await playwright.chromium.launch({args:process.env.FX_GPU==='hardware'?['--use-gl=angle','--use-angle=d3d11','--ignore-gpu-blocklist']:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
  const errors=[], evidence={commit,build,modes:{}};
  try {
    for(const mode of modes) {
      const page=await browser.newPage({viewport:{width:1600,height:900}});
      page.on('pageerror',e=>errors.push(String(e)));
      page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
      const query=production?`lookdemo=fx:${mode}`:`fxmock=${mode}`;
      await page.goto(`http://127.0.0.1:${server.address().port}/?shot=area:bluebell-glade&seed=123&zoom=2&ladder=off&${query}`);
      const served=await page.evaluate(async()=>fetch('version.json',{cache:'no-store'}).then(r=>r.json()));
      if(served.version!==build.version)throw Error('Server build identity mismatch');
      await page.waitForFunction(()=>window.witch?.ready,null,{timeout:600000});
      const device=await page.evaluate(()=>{const gl=window.witch.view.renderer.getContext(),ext=gl.getExtension('WEBGL_debug_renderer_info');return ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER);});
      if(process.env.FX_GPU==='hardware'&&/swiftshader|llvmpipe|software/i.test(device))throw Error(`Hardware measurement requested but renderer is ${device}`);
      await page.evaluate(()=>{window.witch.manual=true;});
      if(await page.evaluate(()=>window.witch.game.clock.paused)){
        await page.keyboard.press('Enter');
        await page.waitForFunction(()=>!window.witch.game.clock.paused,null,{timeout:60000});
      }
      await page.waitForFunction(()=>{
        const start=document.getElementById('start');return !start || getComputedStyle(start).display==='none';
      },null,{timeout:60000});
      const shot=await page.evaluate(()=>window.witch.lastShot);
      if(!shot?.ok)throw Error(`scene failed: ${JSON.stringify(shot)}`);
      const frame=async(time)=>page.evaluate(({time,production})=>{
        const w=window.witch; if(w.view.fxMock)w.view.fxMock.time=time;
        if(production){w.view.magic.captureTime=time;w.view.magic.galleryTime=time;}
        w.frame({moveX:0,moveZ:0,toggleMode:false,zoom:0},1/60,true);
      },{time,production});
      for(let i=0;i<30;i++) {
        await frame(1+i/60);
        if(errors.length)throw Error(errors.join('\n'));
        await page.waitForFunction(()=>window.witch.view.assets.pending===0,null,{timeout:600000});
      }
      await page.waitForFunction(production?()=>window.witch.view.magic:()=>window.witch.view.fxMock,null,{timeout:60000});
      if(!production&&mode==='frost') await page.waitForFunction(()=>window.witch.view.fxMock.tree,null,{timeout:60000});
      const state=await page.evaluate(production=>({version:document.title,camera:window.witch.game.camera,lights:window.witch.view.stats.lights,effectLights:production?window.witch.view.magic.stats.lights:window.witch.view.fxMock.lightsUsed,budget:window.witch.game.tuning.lightBudget,treeReady:production?null:!!window.witch.view.fxMock.tree}),production);
      evidence.modes[mode]={state};
      for(const [label,time] of (production?[['forms-1',1.5],['forms-2',1.5],['forms-3',1.5],['iso',1.5]]:[['active',1.5],['thaw',5],['clear',7]])) {
        if(production)await page.evaluate(label=>{window.witch.view.magic.galleryPage=label==='iso'?3:Number(label.slice(-1))-1;},label);
        await frame(time); await page.screenshot({path:path.join(out,`${mode}-${label}.png`),timeout:300000});
      }
      if(production){await page.evaluate(()=>{window.witch.view.magic.galleryPage=0;});await frame(1.5);}
      // Compare exactly the same frozen simulation/time with the mock hidden/visible.
      evidence.modes[mode].timing=await page.evaluate(async(production)=>{
        const w=window.witch,v=w.view,gl=v.renderer.getContext(),ext=gl.getExtension('EXT_disjoint_timer_query_webgl2');
        const fx=production?v.magic:v.fxMock;
        const debug=gl.getExtension('WEBGL_debug_renderer_info');
        const renderer=debug?gl.getParameter(debug.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER);
        if(!ext)return {renderer,gpuMs:null,reason:'EXT_disjoint_timer_query_webgl2 unavailable'};
        const result={renderer,samples:[]};
        for(const enabled of Array.from({length:20},(_,i)=>i%2===1)) {
          fx.enabled=enabled;if(production){fx.captureTime=1.5;fx.galleryTime=1.5;}else fx.time=1.5;
          for(let i=0;i<2;i++)w.frame({moveX:0,moveZ:0,toggleMode:false,zoom:0},0,true);
          const q=gl.createQuery();gl.beginQuery(ext.TIME_ELAPSED_EXT,q);
          w.frame({moveX:0,moveZ:0,toggleMode:false,zoom:0},0,true);
          gl.endQuery(ext.TIME_ELAPSED_EXT);gl.flush();
          const end=performance.now()+120000;
          while(!gl.getQueryParameter(q,gl.QUERY_RESULT_AVAILABLE)&&performance.now()<end)await new Promise(r=>setTimeout(r,50));
          const ready=gl.getQueryParameter(q,gl.QUERY_RESULT_AVAILABLE),disjoint=gl.getParameter(ext.GPU_DISJOINT_EXT);
          result.samples.push({enabled,gpuMs:ready&&!disjoint?gl.getQueryParameter(q,gl.QUERY_RESULT)/1e6:null,disjoint,ready,effectLights:production?fx.stats.lights:fx.lightsUsed,totalLights:v.stats.lights});
          gl.deleteQuery(q);
        }
        fx.enabled=true;return result;
      },production);
      if(production){
        await page.evaluate(()=>{window.witch.view.magic.galleryPage=3;window.witch.view.magic.galleryDark=true;});
        await frame(1.5);
        const beamOn=await page.screenshot({path:path.join(out,`${mode}-iso-dark.png`),timeout:300000});
        await page.evaluate(()=>{window.witch.view.magic.enabled=false;});await frame(1.5);
        const beamOff=await page.screenshot({timeout:300000});
        const beamPixels=await page.evaluate(async({on,off})=>{
          const pixels=async(src)=>{const img=new Image();img.src='data:image/png;base64,'+src;await img.decode();const c=document.createElement('canvas');c.width=img.width;c.height=img.height;const ctx=c.getContext('2d');ctx.drawImage(img,0,0);return {data:ctx.getImageData(0,0,c.width,c.height).data,width:c.width,height:c.height};};
          const a=await pixels(on),b=await pixels(off);let changed=0;
          for(let y=110;y<a.height-30;y++)for(let x=0;x<a.width;x++){const k=(y*a.width+x)*4;if(Math.max(Math.abs(a.data[k]-b.data[k]),Math.abs(a.data[k+1]-b.data[k+1]),Math.abs(a.data[k+2]-b.data[k+2]))>20)changed++;}
          return changed;
        },{on:beamOn.toString('base64'),off:beamOff.toString('base64')});
        evidence.modes[mode].beamPixels=beamPixels;
        if(beamPixels<50)throw Error(`Beam visibility regression: only ${beamPixels} changed dark-background pixels`);
        await page.evaluate(()=>{window.witch.view.magic.enabled=true;});
        await page.evaluate(()=>{window.witch.view.magic.galleryPage=0;window.witch.view.magic.galleryDark=true;});
        await frame(1.5);await page.screenshot({path:path.join(out,`${mode}-dark.png`),timeout:300000});
        await page.evaluate(()=>{window.witch.view.magic.galleryDark=false;});
        if(mode!=='fire'&&mode!=='frost'&&mode!=='party'){await page.close();continue;}
      }
      let frostTree=null;
      if(production&&mode==='frost'){
        await page.evaluate(()=>{window.witch.view.magic.galleryVisible=false;});
        await frame(0);
        frostTree=await page.evaluate(()=>{
          const w=window.witch,g=w.game,p=[...g.forest.treesNear(g.witch.x,g.witch.z,30)]
            .filter(p=>p.z<g.witch.z).sort((a,b)=>Math.hypot(a.x-g.witch.x,a.z-g.witch.z+8)-Math.hypot(b.x-g.witch.x,b.z-g.witch.z+8))[0];
          if(!p)throw Error('No real forest tree for frost proof');
          w.view.magic.emit('frost','burst',p.x,1,p.z,3,2,1.2,100001);
          return {x:p.x,z:p.z,type:p.type};
        });
        evidence.modes[mode].frostTree={...frostTree,samples:[]};
      }
      const frames=path.join(out,`frames-${mode}`);fs.mkdirSync(frames,{recursive:true});const jpeg=[];
      for(let i=0;i<(mode==='frost'?48:18);i++) {
        await frame(i/6);await page.screenshot({path:path.join(frames,`${String(i).padStart(3,'0')}.png`),timeout:300000});
        jpeg.push(await page.screenshot({type:'jpeg',quality:85,timeout:300000}));
        if(frostTree&&[9,27,45].includes(i)){
          const amount=await page.evaluate(p=>window.witch.view.magic.field.at(p.x,p.z,'frost'),frostTree);
          evidence.modes[mode].frostTree.samples.push({time:i/6,amount});
          await page.screenshot({path:path.join(out,`frost-tree-${i===9?'active':i===27?'thaw':'clear'}.png`),timeout:300000});
          if(i===9&&amount<0.1)throw Error('Tree did not receive a frost imprint');
          if(i===45&&amount!==0)throw Error('Tree frost did not fully decay');
        }
      }
      execFileSync(process.env.FFMPEG_BINARY||'ffmpeg',['-y','-f','image2pipe','-r','6','-c:v','mjpeg','-i','pipe:0','-c:v','libvpx','-pix_fmt','yuv420p',path.join(out,`${mode}-cycle.webm`)],{input:Buffer.concat(jpeg),stdio:['pipe','ignore','pipe']});
      await page.close();
      fs.writeFileSync(path.join(out,'evidence.json'),JSON.stringify({...evidence,errors},null,2));
    }
    evidence.errors=errors;fs.writeFileSync(path.join(out,'evidence.json'),JSON.stringify(evidence,null,2));
    if(errors.length)throw Error(errors.join('\n'));
  } finally {fs.writeFileSync(path.join(out,'evidence.json'),JSON.stringify({...evidence,errors},null,2));await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
