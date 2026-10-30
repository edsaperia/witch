// Intel UHD busy-fight gate. One coordinated browser, no fullsuite/smoke.
// WITCH_SHA=<head> npx vite build; node tools/magic-mock/budget.cjs [output]
// PLAYWRIGHT_MODULE, PLAYWRIGHT_BROWSERS_PATH as capture.cjs. Hardware D3D11 is required.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),cp=require('node:child_process');
let pw;try{pw=require(process.env.PLAYWRIGHT_MODULE||'playwright');}catch{pw=require('/opt/node22/lib/node_modules/playwright');}
const out=path.resolve(process.argv[2]||'previews/magic-budget'),root=path.resolve(process.env.DIST||'dist');
const samples=Number(process.env.SAMPLES||20),types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.ogg':'audio/ogg','.png':'image/png','.woff2':'font/woff2'};
(async()=>{
  fs.mkdirSync(out,{recursive:true});const head=cp.execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
  const build=JSON.parse(fs.readFileSync(path.join(root,'version.json'),'utf8'));
  if(!build.version.includes(head.slice(0,7)))throw Error('Build does not match HEAD');
  const server=http.createServer((req,res)=>{const p=path.resolve(root,'.'+new URL(req.url,'http://x').pathname),f=p===root?path.join(root,'index.html'):p;if(p!==root&&!p.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'content-type':types[path.extname(f)]||'application/octet-stream'});res.end(e?'':b);});});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const browser=await pw.chromium.launch({args:['--use-gl=angle','--use-angle=d3d11','--ignore-gpu-blocklist']});
  const result={head,build,viewport:[1600,900],errors:[],variants:{}};
  try{
    const page=await browser.newPage({viewport:{width:1600,height:900}});
    page.on('pageerror',e=>result.errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')result.errors.push(m.text());});
    await page.goto(`http://127.0.0.1:${server.address().port}/?fight=123&pack=fox*8@2,wolf*8@2,owl*8@2&seed=123&creator=0&spell=auto&ladder=off`);
    await page.waitForFunction(()=>window.witch?.ready,null,{timeout:600000});
    await page.evaluate(()=>{window.witch.manual=true;window.witch.game.witches[0].health.hurtAt=Infinity;});
    if(await page.evaluate(()=>window.witch.game.clock.paused)){await page.keyboard.press('Enter');await page.waitForFunction(()=>!window.witch.game.clock.paused,null,{timeout:60000});}
    await page.waitForFunction(()=>getComputedStyle(document.getElementById('start')).display==='none',null,{timeout:60000});
    const frame=async(n,draw=true)=>page.evaluate(({n,draw})=>{const w=window.witch;for(let i=0;i<n;i++)w.frame({moveX:0,moveZ:0,toggleMode:false,zoom:0},1/60,draw&&i===n-1);},{n,draw});
    for(let i=0;i<8;i++){await frame(10);await page.waitForFunction(()=>window.witch.view.assets.pending===0,null,{timeout:600000});if(result.errors.length)throw Error(result.errors.join('\n'));}
    result.fixture=await page.evaluate(()=>{const w=window.witch,g=w.game;return {clock:g.clock.time,creatures:g.creatures.filter(c=>!c.gone&&Math.hypot(c.x-g.witch.x,c.z-g.witch.z)<45).length,spells:g.combat.spells?.bodies?.length??null,camera:g.camera,quality:w.ladder?.state};});
    result.fixture.invulnerableForSustainedMeasurement=true;
    if(result.fixture.creatures<12)throw Error('Busy-fight fixture has fewer than 12 nearby creatures');
    await page.evaluate(()=>{
      const w=window.witch,m=w.view.magic,finish=m.finish.bind(m);window.__fxBudget={profile:'fire',low:false,baseTime:w.game.herTime+1};
      m.finish=function(budget){const s=window.__fxBudget,wx=w.game.witch.x,wz=w.game.witch.z;
        if(s.profile!=='none')for(let i=0;i<12;i++){
          const type=s.profile==='all'?['fire','frost','party','beam'][i%4]:s.profile;
          const x=wx+(i%4-1.5)*5,z=wz-8-Math.floor(i/4)*5;
          if(type==='beam')m.beam('fire',x-2,z,x+2,z,1.5,1.2,2,0.8,70000+i);
          else m.draw(type,type==='party'?'pillar':i%2?'burst':'projectile',x,type==='party'?4:1.5,z,2,type==='party'?0.5:1,0.8,0.3,70000+i);
        }finish(budget);
      };
    });
    for(const name of ['fire','frost','party','beam','all','frost-low','all-low']){
      console.log('budget',name);
      const row=await page.evaluate(async({name,samples})=>{
        const w=window.witch,v=w.view,m=v.magic,s=window.__fxBudget,gl=v.renderer.getContext(),ext=gl.getExtension('EXT_disjoint_timer_query_webgl2'),debug=gl.getExtension('WEBGL_debug_renderer_info');
        const renderer=debug?gl.getParameter(debug.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER);
        if(/swiftshader|software|llvmpipe/i.test(renderer))throw Error('Hardware required: '+renderer);
        if(!ext)throw Error('Hardware timer queries unavailable');
        s.profile=name.replace('-low','');s.low=name.endsWith('-low');m.reset();
        Object.assign(m.quality,{distortion:!s.low,imprints:!s.low,secondary:!s.low,lightCap:s.low?2:6,particles:s.low?0.5:1});
        const input={moveX:0,moveZ:0,toggleMode:false,zoom:0};
        for(let i=0;i<15;i++){m.captureTime=s.baseTime+i/60;w.frame(input,0,true);}
        m.captureTime=s.baseTime+0.25;
        const rows=[];
        for(let i=0;i<samples;i++){
          m.enabled=i%2===1;for(let warm=0;warm<2;warm++)w.frame(input,0,true);
          const q=gl.createQuery();gl.beginQuery(ext.TIME_ELAPSED_EXT,q);const t=performance.now();w.frame(input,0,true);const cpuMs=performance.now()-t;gl.endQuery(ext.TIME_ELAPSED_EXT);gl.flush();
          const deadline=performance.now()+60000;while(!gl.getQueryParameter(q,gl.QUERY_RESULT_AVAILABLE)&&performance.now()<deadline)await new Promise(r=>setTimeout(r,10));
          const ready=gl.getQueryParameter(q,gl.QUERY_RESULT_AVAILABLE),disjoint=gl.getParameter(ext.GPU_DISJOINT_EXT);
          rows.push({enabled:m.enabled,gpuMs:ready&&!disjoint?gl.getQueryParameter(q,gl.QUERY_RESULT)/1e6:null,cpuMs,ready,disjoint,lights:m.stats.lights,totalLights:v.stats.lights});gl.deleteQuery(q);
        }
        m.enabled=true;return {renderer,samples:rows};
      },{name,samples});
      if(result.errors.length)throw Error(result.errors.join('\n'));
      const median=a=>{a.sort((a,b)=>a-b);return(a[(a.length-1)>>1]+a[a.length>>1])/2;};
      const off=row.samples.filter(r=>!r.enabled&&r.gpuMs!==null).map(r=>r.gpuMs),on=row.samples.filter(r=>r.enabled&&r.gpuMs!==null).map(r=>r.gpuMs);
      const delta=median(on)-median(off),limit=name.startsWith('all')?1.5:0.6;
      result.variants[name]={...row,baselineMedian:median(off),effectsMedian:median(on),delta,limit,pass:off.length===samples/2&&on.length===samples/2&&delta<=limit};
      await page.screenshot({path:path.join(out,`${name}.png`)});
      fs.writeFileSync(path.join(out,'budget.json'),JSON.stringify(result,null,2));
    }
    result.pass=Object.values(result.variants).every(v=>v.pass)&&result.variants['all-low'].delta<result.variants.all.delta&&result.variants['frost-low'].delta<result.variants.frost.delta;
    if(!result.pass)process.exitCode=1;
  }finally{fs.writeFileSync(path.join(out,'budget.json'),JSON.stringify(result,null,2));await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
