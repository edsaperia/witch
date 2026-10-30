// Largest shipped world: art loading/drawing can depend on area diversity and world extent.
// CI only unless the coordinator grants a laptop slot. Uses the shared dist build; never rebuilds the game.
//   NODE_PATH=.pw/node_modules node tools/smoke/large-world.cjs
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),os=require('node:os'),cp=require('node:child_process');
const {buildSync}=require('esbuild'),playwright=require('playwright');
const root=path.resolve(__dirname,'../..'),dist=path.join(root,'dist'),out=path.join(root,'large-world');
fs.mkdirSync(out,{recursive:true});
const temporary=fs.mkdtempSync(path.join(os.tmpdir(),'witch-world-')),bundle=path.join(temporary,'fixture.cjs');
buildSync({stdin:{contents:'import { largestShippedWorld } from "./src/test/worlds"; console.log(JSON.stringify(largestShippedWorld()));',resolveDir:root,loader:'ts'},bundle:true,platform:'node',format:'cjs',outfile:bundle,logLevel:'warning'});
const fixture=JSON.parse(cp.execFileSync(process.execPath,[bundle],{encoding:'utf8'}));fs.rmSync(bundle);fs.rmdirSync(temporary);
const evidence={fixture,startedAt:new Date().toISOString(),areas:[],errors:[],complete:false};let browser;
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png'};
const server=http.createServer((req,res)=>{let file=path.resolve(dist,'.'+decodeURIComponent(new URL(req.url,'http://local').pathname));if(file===dist)file=path.join(dist,'index.html');if(!file.startsWith(dist+path.sep)){res.writeHead(403);return res.end();}fs.readFile(file,(error,bytes)=>{res.writeHead(error?404:200,{'content-type':types[path.extname(file)]??'application/octet-stream'});res.end(error?'':bytes);});});
(async()=>{try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 browser=await playwright.chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const page=await browser.newPage({viewport:{width:960,height:540}});page.on('pageerror',e=>evidence.errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')evidence.errors.push(m.text());});
 const query=new URLSearchParams({island:fixture.island,world:String(fixture.world),seed:String(fixture.seed),found:fixture.found.join(','),quick:'1',creator:'0',wave:'off'});
 await page.goto(`http://127.0.0.1:${server.address().port}/?${query}`);
 await page.waitForFunction(()=>window.witch?.ready,null,{timeout:300000});await page.evaluate(()=>{window.witch.manual=true;});
 const version=JSON.parse(fs.readFileSync(path.join(dist,'version.json'),'utf8'));
 const served=await page.evaluate(async()=>({version:await(await fetch('version.json',{cache:'no-store'})).json(),build:window.witch.compareKey().build}));
 evidence.version=served;
 if(served.version.version!==version.version||served.build!==version.version||!process.env.EXPECTED_SHA||!version.version.includes(process.env.EXPECTED_SHA.slice(0,7)))throw Error('Shared artifact served SHA does not match the assigned revision');
 if(await page.evaluate(()=>window.witch.game.clock.paused))await page.keyboard.press('Enter');
 const world=await page.evaluate(()=>{const w=window.witch,g=w.game,m=g.map,byType=new Map();for(const [x,z]of m.cells){const type=m.typeOf(x,z);if(!byType.has(type))byType.set(type,{type,id:w.areaTypeId(type),...m.siteOf(x,z)});}return{island:g.tuning.map.island,seed:g.seed,cells:m.cells.length,types:[...byType.values()].sort((a,b)=>a.type-b.type)};});
 evidence.world=world;
 if(world.seed!==fixture.seed||world.island!==fixture.island||world.cells<fixture.areas||world.types.length<fixture.areaKinds)throw Error('Largest-world fixture did not load');
 const n=Math.min(12,world.types.length),sites=Array.from({length:n},(_,i)=>world.types[Math.floor(i*(world.types.length-1)/Math.max(1,n-1))]);
 const loaded=new Set(),drawn=new Set();
 for(const site of sites){const start=Date.now();
  const shot=await page.evaluate(site=>window.witch.shot(`at:${site.x},${site.z}`),site);if(!shot.ok)throw Error(shot.say);
  for(let stage=0;stage<4;stage++){
   await page.evaluate(()=>{const w=window.witch;for(let i=0;i<20;i++)w.frame({moveX:0,moveZ:0,toggleMode:false,zoom:0},1/60,i===19);});
   await page.waitForFunction(()=>window.witch.view.assets.pending===0,null,{timeout:180000});
  }
  const result=await page.evaluate(()=>{const v=window.witch.view;return{loaded:[...v.typeBatches.keys()].filter(t=>v.assets.hasType(t)),drawn:[...v.typeBatches.entries()].filter(([,b])=>b.count>0&&b.meshes.some(m=>m.visible)).map(([t])=>t),calls:v.renderer.info.render.calls,triangles:v.renderer.info.render.triangles};});
  for(const type of result.loaded)loaded.add(type);for(const type of result.drawn)drawn.add(type);
  if(!result.calls||!result.triangles)throw Error('No drawing at '+site.id);
  evidence.areas.push({site,...result,elapsedMs:Date.now()-start});console.log('Largest world area',site.id,JSON.stringify(result));
 }
 evidence.loadedTypes=[...loaded];evidence.drawnTypes=[...drawn];
 if(loaded.size<n||drawn.size<n)throw Error(`Insufficient distinct area art coverage: loaded${loaded.size}/drawn${drawn.size}, need${n}`);
 if(evidence.errors.length)throw Error(evidence.errors.join('\n'));evidence.complete=true;
}catch(error){evidence.failure=String(error);console.error(error);process.exitCode=1;}finally{
 evidence.finishedAt=new Date().toISOString();fs.writeFileSync(path.join(out,'evidence.json'),JSON.stringify(evidence,null,2));
 if(browser)await browser.close();await new Promise(r=>server.close(r));
}})();
