// The lighting survey (Ed, 2026-10-06: "look at lighting in different scenes"): the same seeds and views
// every time, as screenshots OUT/<seed>-<scene>.png, so a lighting change can be judged before and after.
// Per seed: home's party on the ground and from the treetops; three far areas of different types, in
// their clearing and among the trees (the first from the treetops too); and six waves on, the newest
// party on the ground and from the treetops. Usage, from the repository root after npm run build:
//   node tools/lighting/survey.cjs [out dir] [extra URL params, e.g. "&light=plain"]
// ROOT (default dist/), SEEDS (default 123,165272). Headless Chromium (software GL): slow, minutes a seed.
const http=require("http"),fs=require("fs"),path=require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root=process.env.ROOT||path.resolve(__dirname,"../../dist"),out=path.resolve(process.argv[2]||process.env.OUT||"previews/lighting/now"),Q=process.argv[3]||process.env.Q||"",seeds=(process.env.SEEDS||"123,165272").split(",").map(Number);
const types={".html":"text/html",".js":"text/javascript",".json":"application/json",".png":"image/png",".css":"text/css"};
const srv=http.createServer((q,r)=>{const p=path.join(root,decodeURIComponent(new URL(q.url,"http://x").pathname));const f=fs.existsSync(p)&&fs.statSync(p).isDirectory()?path.join(p,"index.html"):p;if(!fs.existsSync(f)){r.writeHead(404);r.end();return;}r.writeHead(200,{"content-type":types[path.extname(f)]||"application/octet-stream"});fs.createReadStream(f).pipe(r);});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{await new Promise(r=>srv.listen(0,"127.0.0.1",r));const port=srv.address().port;fs.mkdirSync(out,{recursive:true});
const b=await playwright.chromium.launch({args:["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"]});
for (const seed of seeds) {
 const page=await (await b.newContext({viewport:{width:1280,height:720}})).newPage(), errs=[];
 page.on("pageerror",e=>errs.push(String(e)));
 await page.goto(`http://127.0.0.1:${port}/?creator=0&seed=${seed}&wave=off${Q}`);
 await page.waitForFunction(()=>window.witch&&window.witch.ready,null,{timeout:300000});
 await page.keyboard.press("Enter"); await sleep(1500);
 await page.evaluate(()=>{window.witch.manual=true;const g=window.witch.game;g.clock.paused=false;g.witch={...g.witch,seated:false};});
 const fr=(n,c={})=>page.evaluate(([n,c])=>{for(let i=0;i<n;i++)window.witch.frame({moveX:0,moveZ:0,toggleMode:false,zoom:0,...c},1/60,i===n-1);},[n,c]);
 const settle=async()=>{await page.waitForFunction(()=>window.witch.view.assets.pending===0,null,{timeout:900000,polling:500}).catch(()=>{});await fr(40);};
 const mode=()=>page.evaluate(()=>window.witch.game.witch.mode);
 const to=async(m)=>{ if((await mode()==="ground")!==(m==="ground")){await fr(1,{toggleMode:true});await fr(200);} };
 const shot=async(name)=>{await settle();await page.screenshot({path:`${out}/${seed}-${name}.png`});console.log(seed,name);};
 const tp=(x,z)=>page.evaluate(([x,z])=>{const g=window.witch.game;g.witch={...g.witch,x,z,vx:0,vz:0};g.camera={...g.camera,tx:x,tz:z};},[x,z]);
 // home: the dancefloor's party
 await fr(90,{moveX:0.4,moveZ:-0.7}); await shot("home-ground");
 await to("treetop"); await shot("home-treetop"); await to("ground");
 // three far areas of different types: in the clearing, and among the trees
 const sites=await page.evaluate(()=>{const g=window.witch.game,m=g.map,w=g.witch,seen=new Set(),out=[];const all=[];
   for(let y=0;y<m.n;y++)for(let x=0;x<m.n;x++){const s=m.siteOf(x,y),t=m.typeOf(x,y);all.push({x:s.x,z:s.z,t,d:Math.hypot(s.x-w.x,s.z-w.z)});}
   all.sort((a,b)=>a.d-b.d);for(const s of all){if(s.d<250||seen.has(s.t))continue;seen.add(s.t);out.push(s);if(out.length===3)break;}return out;});
 for (const [k,s] of sites.entries()) {
   await tp(s.x,s.z); await fr(30); await shot(`area${k}-t${s.t}-clearing`);
   await tp(s.x+28,s.z+18); await fr(30); await shot(`area${k}-t${s.t}-trees`);
   if(k===0){ await to("treetop"); await shot(`area${k}-t${s.t}-treetop`); await to("ground"); }
 }
 // late game: six waves on, a newly partified area
 const home=await page.evaluate(()=>{const d=window.witch.game.map.dancefloor;return {x:d.x,z:d.z};});
 await tp(home.x+10,home.z+20);
 for(let i=0;i<6;i++){ await fr(1,{nextWave:true}); await fr(240); }
 const pa=await page.evaluate(()=>{const g=window.witch.game;let best=null;for(const a of g.party.areas.values()){if(!a.soundsystem)continue;const s=g.map.soundsystemSpot(a.cell[0],a.cell[1]);if(!best||a.at>best.at)best={at:a.at,x:s.x,z:s.z};}return best;});
 if (pa) { await tp(pa.x+6,pa.z+14); await fr(120); await shot("late-party-ground"); await to("treetop"); await shot("late-party-treetop"); }
 console.log(seed,"errors",errs.slice(0,3));
 await page.close();
}
await b.close();srv.close();})();
