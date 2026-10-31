// Exercise the built game's mushroom pickup, kitchen unload and three-ingredient brew; keep actual View screenshots.
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '../../dist'), out = path.resolve(__dirname, '../../previews/mushrooms/ingame');
const H = require('../../config/house/load.mjs').loadHouse(), kitchen = H.rooms.find(r => r.id === 'kitchen');
const colours = ['blue','purple','pink','red','orange','yellow','green','turquoise','white'];
const types = { '.html':'text/html', '.js':'text/javascript', '.json':'application/json', '.css':'text/css', '.png':'image/png', '.wasm':'application/wasm' };
const fail = text => { throw new Error(text); };
(async () => {
  fs.mkdirSync(out, { recursive:true });
  const server = http.createServer((req,res) => {
    let file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403); res.end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'content-type':types[path.extname(file)] || 'application/octet-stream' });fs.createReadStream(file).pipe(res);
  });
  await new Promise(r => server.listen(0,'127.0.0.1',r));
  const browser = await chromium.launch({ args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'] });
  const errors=[];
  try {
    const page=await browser.newPage({viewport:{width:1280,height:800}});
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=64&quick=1&creator=0&wave=off&opening=old`);
    await page.waitForFunction(()=>window.witch?.ready,null,{timeout:900000,polling:1000});
    console.log('Game ready');await page.keyboard.press('Enter');
    await page.waitForFunction(()=>window.witch.game.clock.time>1,null,{timeout:600000,polling:500});
    await page.evaluate(()=>{window.witch.manual=true;const g=window.witch.game;g.wake=null;g.party.spellAt=-100;g.clock.paused=false;});
    const step=async(n,controls={})=>page.evaluate(([n,controls])=>{for(let i=0;i<n;i++)window.witch.frame({moveX:0,moveZ:0,toggleMode:false,zoom:0,...(i===0?controls:{})},1/60,i===n-1)},[n,controls]);
    await page.evaluate(()=>{const g=window.witch.game,p=g.mushrooms.patches[0];Object.assign(g.witch,{x:p.x,z:p.z,vx:0,vz:0,perch:false,mode:'ground',lift:0,seated:false});});
    await step(120);await page.screenshot({path:path.join(out,'wild-mushroom.png')});
    await step(1,{place:true});
    if(!await page.evaluate(()=>window.witch.game.mushrooms.patches[0].picked))fail('Place did not pick mushroom');
    console.log('Place collected mushroom');
    await page.evaluate(([x,z])=>{const g=window.witch.game;Object.assign(g.witch,{x:g.map.treehouse.x+x,z:g.map.treehouse.z+z,vx:0,vz:0,perch:true,mode:'ground',lift:0,seated:false});},[kitchen.x,kitchen.z+3]);
    await step(120);
    if(await page.evaluate(()=>window.witch.game.mushrooms.carried[0]?.length??0))fail('Kitchen did not unload');
    await page.screenshot({path:path.join(out,'empty-cauldron.png')});console.log('Kitchen unloaded');
    for(const [i,type] of ['blue','pink','orange'].entries()) {
      const index=colours.indexOf(type),angle=Math.PI-index*Math.PI/8;
      await page.evaluate(([x,z,type])=>{const g=window.witch.game;g.mushrooms.baskets[type]++;Object.assign(g.witch,{x:g.map.treehouse.x+x,z:g.map.treehouse.z+z,vx:0,vz:0});},[kitchen.x+Math.cos(angle)*kitchen.r*.78,kitchen.z+Math.sin(angle)*kitchen.r*.78,type]);
      await step(1,{sigil:true});await step(60);
      await page.screenshot({path:path.join(out,`ingredient-${i+1}.png`)});
      console.log('Added',type);
    }
    if(!await page.evaluate(()=>window.witch.game.mushrooms.smoke))fail('Third ingredient did not make smoke');
    await step(600);
    const result=await page.evaluate(()=>{const g=window.witch.game;return {trip:g.mushrooms.trips[0],perch:g.witch.perch,stargazing:g.witch.stargazing,ingredients:g.mushrooms.ingredients.length,smoke:g.mushrooms.smoke};});
    if(!result.trip||result.perch||!result.stargazing||result.ingredients||result.smoke)fail('Wake/reset failed: '+JSON.stringify(result));
    if(Math.abs(result.trip.until-result.trip.at-600)>.001)fail('Potion duration is not 600 game seconds');
    await page.waitForFunction(()=>!!window.witch.view.assets.partyWitchArt(null),null,{timeout:120000});
    // The behind-house reveal is deliberately advanced only by real draws, not the fast rules-only frames above.
    await page.evaluate(()=>{for(let i=0;i<12;i++)window.witch.frame({moveX:0,moveZ:0,toggleMode:false,zoom:0},.1,true);});
    console.log('Wake view',await page.evaluate(()=>{const w=window.witch,v=w.view,g=w.game;return {body:{x:g.witch.x,z:g.witch.z,perch:g.witch.perch,stargazing:g.witch.stargazing},herIdle:v.partyWitchView.herIdle,beach:v.beachView.gazing,camera:g.camera,base:v.witchBase,treehouse:g.map.treehouse};}));
    await page.screenshot({path:path.join(out,'waking-on-grass.png')});
    if(!await page.evaluate(()=>window.witch.view.partyWitchView.herIdle && (window.witch.game.camera.gaze??0)<.01))fail('Inland recovery must show her lying pose without the beach camera');
    if(errors.length)fail(errors.join('\n'));
    console.log('PASS pickup, unloading, basket throws, smoke, wake and 600-second trip; screenshots in '+out);
  } finally {await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
