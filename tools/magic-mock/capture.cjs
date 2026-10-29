// Stage 0 evidence, cloud/browser slot ONLY. Build first with WITCH_SHA set to the checkout HEAD: npx vite build
// node tools/magic-mock/capture.cjs [output directory]
// Uses the real forest/renderer/camera. Real GPU queries or null with a reason, never CPU time labelled GPU.
const fs = require('node:fs'), path = require('node:path'), http = require('node:http');
const { execFileSync } = require('node:child_process');
let playwright; try { playwright = require('playwright'); } catch { playwright = require('/opt/node22/lib/node_modules/playwright'); }
const root = path.resolve(process.env.DIST || 'dist'), out = path.resolve(process.argv[2] || 'previews/magic-mock');
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
  const browser=await playwright.chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
  const errors=[], evidence={commit,build,modes:{}};
  try {
    for(const mode of ['1','iso','frost']) {
      const page=await browser.newPage({viewport:{width:1600,height:900}});
      page.on('pageerror',e=>errors.push(String(e)));
      page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
      await page.goto(`http://127.0.0.1:${server.address().port}/?shot=area:bluebell-glade&seed=123&zoom=2&ladder=off&fxmock=${mode}`);
      const served=await page.evaluate(async()=>fetch('version.json',{cache:'no-store'}).then(r=>r.json()));
      if(served.version!==build.version)throw Error('Server build identity mismatch');
      await page.waitForFunction(()=>window.witch?.ready,null,{timeout:600000});
      await page.evaluate(()=>{window.witch.manual=true;});
      const shot=await page.evaluate(()=>window.witch.lastShot);
      if(!shot?.ok)throw Error(`scene failed: ${JSON.stringify(shot)}`);
      const frame=async(time)=>page.evaluate(time=>{
        const w=window.witch; if(w.view.fxMock)w.view.fxMock.time=time;
        w.frame({moveX:0,moveZ:0,toggleMode:false,zoom:0},1/60,true);
      },time);
      for(let i=0;i<30;i++) {
        await frame(1.5);
        await page.waitForFunction(()=>window.witch.view.assets.pending===0,null,{timeout:600000});
      }
      await page.waitForFunction(()=>window.witch.view.fxMock,null,{timeout:60000});
      if(mode==='frost') await page.waitForFunction(()=>window.witch.view.fxMock.tree,null,{timeout:60000});
      const state=await page.evaluate(()=>({version:document.title,camera:window.witch.game.camera,lights:window.witch.view.stats.lights,effectLights:window.witch.view.fxMock.lightsUsed,budget:window.witch.game.tuning.lightBudget,treeReady:!!window.witch.view.fxMock.tree}));
      evidence.modes[mode]={state};
      for(const [label,time] of [['active',1.5],['thaw',5],['clear',7]]) {
        await frame(time); await page.screenshot({path:path.join(out,`${mode}-${label}.png`),timeout:300000});
      }
      // Compare exactly the same frozen simulation/time with the mock hidden/visible.
      evidence.modes[mode].timing=await page.evaluate(async()=>{
        const w=window.witch,v=w.view,gl=v.renderer.getContext(),ext=gl.getExtension('EXT_disjoint_timer_query_webgl2');
        const debug=gl.getExtension('WEBGL_debug_renderer_info');
        const renderer=debug?gl.getParameter(debug.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER);
        if(!ext)return {renderer,gpuMs:null,reason:'EXT_disjoint_timer_query_webgl2 unavailable'};
        const result={renderer,samples:[]};
        for(const enabled of [false,true,false,true]) {
          v.fxMock.enabled=enabled;v.fxMock.time=1.5;
          for(let i=0;i<2;i++)w.frame({moveX:0,moveZ:0,toggleMode:false,zoom:0},0,true);
          const q=gl.createQuery();gl.beginQuery(ext.TIME_ELAPSED_EXT,q);
          w.frame({moveX:0,moveZ:0,toggleMode:false,zoom:0},0,true);
          gl.endQuery(ext.TIME_ELAPSED_EXT);gl.flush();
          const end=performance.now()+120000;
          while(!gl.getQueryParameter(q,gl.QUERY_RESULT_AVAILABLE)&&performance.now()<end)await new Promise(r=>setTimeout(r,50));
          const ready=gl.getQueryParameter(q,gl.QUERY_RESULT_AVAILABLE),disjoint=gl.getParameter(ext.GPU_DISJOINT_EXT);
          result.samples.push({enabled,gpuMs:ready&&!disjoint?gl.getQueryParameter(q,gl.QUERY_RESULT)/1e6:null,disjoint,ready,effectLights:v.fxMock.lightsUsed,totalLights:v.stats.lights});
          gl.deleteQuery(q);
        }
        v.fxMock.enabled=true;return result;
      });
      const frames=path.join(out,`frames-${mode}`);fs.mkdirSync(frames,{recursive:true});
      for(let i=0;i<(mode==='frost'?48:18);i++) {await frame(i/6);await page.screenshot({path:path.join(frames,`${String(i).padStart(3,'0')}.png`),timeout:300000});}
      execFileSync('ffmpeg',['-y','-framerate','6','-i',path.join(frames,'%03d.png'),'-c:v','libvpx-vp9','-pix_fmt','yuv420p',path.join(out,`${mode}-cycle.webm`)],{stdio:'ignore'});
      await page.close();
    }
    evidence.errors=errors;fs.writeFileSync(path.join(out,'evidence.json'),JSON.stringify(evidence,null,2));
    if(errors.length)throw Error(errors.join('\n'));
  } finally {await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
