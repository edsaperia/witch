const fs = require('fs'), path = require('path'), http = require('http');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = path.resolve('dist'), out = path.resolve('previews/first-night/local');
const version = JSON.parse(fs.readFileSync(path.join(root,'version.json')));
const expected = process.env.EXPECTED_SHA;
if (!expected || !version.version.includes(expected.slice(0,7))) throw Error('Build SHA mismatch');
fs.mkdirSync(out,{recursive:true});
const evidence = { local:true, expected, version, viewport:[1280,720], fixture:'Quick-art shot; wakeUp(false), alarm/stretch marked up; debug positioning only. Actual keys/click/pad choose through the live station panel. Indoor forest disabled as pause smoke does. Stump health made invulnerable. Not a human walkthrough.', checks:[], errors:[], warnings:[] };
const mime={'.html':'text/html','.js':'text/javascript','.json':'application/json','.png':'image/png','.woff2':'font/woff2','.ogg':'audio/ogg','.wasm':'application/wasm','.css':'text/css'};
const server=http.createServer((req,res)=>{if(req.url==='/favicon.ico'){res.writeHead(204);res.end();return;}let f=path.join(root,decodeURIComponent(new URL(req.url,'http://x').pathname)); if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html'); if(!f.startsWith(root)||!fs.existsSync(f)){res.writeHead(404);res.end();return;}res.writeHead(200,{'Content-Type':mime[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(res);});
const check=(ok,what,data)=>{evidence.checks.push({ok,what,data});console.log(`${ok?'PASS':'FAIL'} ${what}`,data?JSON.stringify(data):'');if(!ok)throw Error(what);};
let browser,page;
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r)); const base=`http://127.0.0.1:${server.address().port}`;
 check((await (await fetch(`${base}/version.json`)).json()).version===version.version,'served version matches built commit',version);
 browser=await chromium.launch({args:['--use-gl=angle','--use-angle=d3d11','--ignore-gpu-blocklist']});
 page=await browser.newPage({viewport:{width:1280,height:720}}); page.setDefaultTimeout(120000);
 page.on('pageerror',e=>evidence.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')evidence.errors.push(m.text());if(m.type()==='warning'&&evidence.warnings.length<15)evidence.warnings.push(m.text());});
 await page.addInitScript(()=>{window.__padButtons=Array(17).fill(false);window.__padOn=false;Object.defineProperty(navigator,'getGamepads',{configurable:true,value:()=>window.__padOn?[{id:'DualSense standard test pad',index:0,connected:true,mapping:'standard',timestamp:performance.now(),axes:[0,0,0,0],buttons:window.__padButtons.map(p=>({pressed:p,touched:p,value:p?1:0}))}]:[]});});
 await page.goto(`${base}/?shot=object:wardrobe&seed=123&newWitch=1`);
 await page.waitForFunction(()=>window.witch?.ready,null,{timeout:300000});
 await page.keyboard.press('KeyQ');
 await page.waitForFunction(()=>getComputedStyle(document.getElementById('start')).display==='none',null,{timeout:120000});
 evidence.renderer=await page.evaluate(()=>{const gl=window.witch.view.renderer.getContext(),e=gl.getExtension('WEBGL_debug_renderer_info');return e?gl.getParameter(e.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER);});
 console.log('Renderer',evidence.renderer);
 await page.evaluate(()=>{const a=window.witch,g=a.game;a.wakeUp(false);g.wake.beat='up';g.wake.open=true;g.clock.paused=false;Object.defineProperty(g,'islandReady',{get:()=>false,set(){},configurable:true});});
 const station=async id=>{
   if(await page.locator('#station-panel.in').count()){await page.keyboard.press('KeyE');await page.waitForFunction(()=>!document.querySelector('#station-panel.in'));}
   await page.evaluate(id=>window.witch.shot(`object:${id}`),id);
   await page.waitForTimeout(500);
   if(!await page.locator(`#station-panel.in[data-station="${id}"]`).count())await page.keyboard.press('KeyE');
   await page.waitForFunction(id=>document.querySelector('#station-panel.in')?.dataset.station===id,id);
   await page.mouse.move(2,2); await page.waitForTimeout(1000);
 };
 const settle=async()=>{await page.waitForTimeout(1500);await page.waitForFunction(()=>[...window.witch.view.assets.inFlight].every(k=>/^(partyObjects|relics|creature)s?:/.test(k)),null,{timeout:120000}).catch(()=>{});};
 for(const [id,slot,how] of [['wardrobe','top','Space'],['shoeRack','shoes','Space'],['bags','bits','pad'],['cloakPegs','cloak','click']]){
   await station(id);
   const before=await page.evaluate(()=>({pile:[...window.witch.game.wake.pile],detail:document.querySelector('#station-panel .sp-detail')?.innerText,ticks:document.querySelectorAll('#station-panel .sp-tick').length,selected:document.querySelectorAll('#station-panel .sp-grid .sel').length}));
   check(before.pile.includes(slot)&&!before.detail?.includes('Wearing.')&&before.ticks===0&&before.selected===0,`${id}: saved default is not falsely marked worn`,before);
   if(id==='wardrobe'){await settle();await page.screenshot({path:path.join(out,'01-default-before.png')});}
   if(how==='click')await page.locator('#station-panel .focus[data-line]').first().click();
   else if(how==='pad'){await page.evaluate(()=>{window.__padOn=true;});await page.waitForTimeout(500);await page.evaluate(()=>{window.__padButtons[0]=true;});await page.waitForTimeout(600);await page.evaluate(()=>{window.__padButtons[0]=false;});}
   else await page.keyboard.press(how);
   await page.waitForFunction(slot=>!window.witch.game.wake.pile.includes(slot),slot);
   check(true,`${id}: unchanged default chosen with ${how} dresses its piece`);
   if(id==='wardrobe'){await settle();await page.screenshot({path:path.join(out,'01-default-after.png')});}
 }
 const focus=await page.locator('#station-panel .focus[data-line]').first().getAttribute('data-line');
 await page.keyboard.press('Escape');await page.waitForFunction(()=>document.body.classList.contains('paused')&&document.querySelector('#pause-sliders.open'));await page.waitForTimeout(700);
 const paused=await page.locator('#station-panel').evaluate(e=>({visibility:getComputedStyle(e).visibility,id:e.dataset.station}));
 check(paused.visibility==='hidden'&&paused.id==='cloakPegs','pause hides station text while retaining station',paused);
 await page.screenshot({path:path.join(out,'02-paused-station.png')});
 await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.body.classList.contains('paused'));
 check(await page.locator('#station-panel').evaluate(e=>getComputedStyle(e).visibility==='visible')&&await page.locator('#station-panel .focus[data-line]').first().getAttribute('data-line')===focus,'resume restores station and focus');
 await station('dressingTable');await page.keyboard.press('KeyE');await page.waitForFunction(()=>!document.querySelector('#station-panel.in'));await settle();
 const labels=await page.evaluate(()=>[...document.querySelectorAll('body > div')].filter(e=>/^\d+ m$/.test(e.textContent.trim())).map(e=>({text:e.textContent,opacity:getComputedStyle(e).opacity,visibility:getComputedStyle(e).visibility,display:getComputedStyle(e).display})));
 check(labels.length>0&&labels.every(e=>e.opacity!=='0'||e.visibility==='hidden'||e.display==='none'),'invisible distances are also hidden from accessibility',labels);
 evidence.distanceUse=await page.evaluate(()=>({use:window.witch.view.usePrompt.id,x:window.witch.game.witch.x,z:window.witch.game.witch.z,hat:window.witch.game.witches[0].hat.down}));
 check(evidence.distanceUse.use==='dressingTable','distance capture is at actual dressing-table use position',evidence.distanceUse);
 await page.screenshot({path:path.join(out,'04-dressing-table-distance.png')});
 const stump=await page.evaluate(()=>{const a=window.witch,g=a.game;delete g.wake;Object.defineProperty(g,'islandReady',{value:true,writable:true,configurable:true});g.party.spellAt=undefined;g.party.paused=true;const home=g.map.centreCell.join(',');const cell=g.map.cells.find(c=>c.join(',')!==home&&!g.party.areas.has(c.join(','))&&g.creatures.some(k=>k.cell.join(',')===c.join(',')&&!k.gone&&!k.boss&&k.level>0&&k.state!=='happy'));if(!cell)throw Error('no hostile stump');const p=g.map.soundsystemSpot(...cell);a.shot(`at:${p.x},${p.z}`);const W=g.witches[0];W.hat.has=true;W.hat.down=null;W.hat.hold=g.herTime-10;W.health.hp=1e6;return {cell,p,hold:g.tuning.leash.hatHold};});
 await page.waitForTimeout(1500);const t=await page.evaluate(()=>window.witch.game.herTime);await page.keyboard.down('KeyE');await page.waitForFunction(([t,h])=>window.witch.game.herTime-t>h+.25,[t,stump.hold],{timeout:60000});await page.keyboard.up('KeyE');
 const hat=await page.evaluate(()=>({down:window.witch.game.witches[0].hat.down,casting:window.witch.game.witches[0].casting??null}));check(hat.down===null&&hat.casting===null,'Use held at hostile unready stump keeps hat on and does not cast',{stump,hat});await settle();await page.screenshot({path:path.join(out,'03-unready-stump-hat.png')});
 check(evidence.errors.length===0,'no page/console errors',evidence.errors);
 evidence.passed=true;
})().catch(async e=>{evidence.failure=e.stack;process.exitCode=1;console.error(e.stack);if(page)await page.screenshot({path:path.join(out,'failure.png'),timeout:30000}).catch(()=>{});}).finally(async()=>{fs.writeFileSync(path.join(out,'evidence.json'),JSON.stringify(evidence,null,2));if(browser)await browser.close();await new Promise(r=>server.close(r));console.log('BROWSER CLOSED');});
