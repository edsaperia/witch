// Capture the five chain poses and three near/far night mushroom colours on an allocated headless renderer slot.
//   node tools/shot/playtest-render.cjs <served-url> <expected-sha> <output-dir> [chains|stumps|mushrooms]
// Run once on the base and once on the slice. A fixed seed and presentation-only poses make the frames comparable.
const fs = require('node:fs'), path = require('node:path');
let playwright; try { playwright = require('playwright'); } catch { playwright = require('/opt/node22/lib/node_modules/playwright'); }
async function main() {
  const [base, sha, out, mode = 'chains'] = process.argv.slice(2);
  if (!base || !/^[0-9a-f]{7,40}$/i.test(sha) || !out) throw Error('Expected served URL, commit SHA and output directory');
  const url = new URL(base.endsWith('/') ? base : base + '/');
  const version = await (await fetch(new URL('version.json', url), { cache: 'no-store' })).json();
  if (!version.version.includes(sha.slice(0, 7))) throw Error('Unexpected served version: ' + JSON.stringify(version));
  fs.mkdirSync(out, { recursive: true });
  const browser = await playwright.chromium.launch({ args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'] });
  // A single build and mode per allocated slot. Leave time to close Chromium before 270 s.
  const limit = setTimeout(() => { process.exitCode = 1; void browser.close(); }, 250000);
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    url.search = mode === 'stumps' ? '?seed=123' : '?shot=creature:fox@2&seed=123';
    await page.goto(url.href);
    await page.waitForFunction(() => window.witch?.ready, null, { timeout: 600000 });
    if (mode === 'stumps') {
      if (await page.evaluate(() => window.witch.game.clock.paused)) await page.keyboard.press('Enter');
      await require('./stump-diagnostic.cjs').capture(page, out);
      if (errors.length) throw Error(errors.join('\n'));
      fs.writeFileSync(path.join(out,'version.json'), JSON.stringify(version));
      return;
    }
    if (!['chains','mushrooms'].includes(mode)) throw Error('Unknown capture mode');
    await page.evaluate(() => {
      const w = window.witch; w.manual = true;
      const g = w.game, scene = w.shot('creature:fox@2');
      if (!scene.ok) throw Error(scene.say);
      const c = g.creatures.find(c => c.species === 'fox' && c.level === 2 && c.x === scene.x + 6 && c.z === scene.z);
      if (!c) throw Error('Could not set up the adult');
      g.leash.stack = [c.id]; c.leashed = true; c.x = g.witch.x + 12;
      window.fixture = { c };
    });
    const draw = () => page.evaluate(() => {
      const w = window.witch; w.view.render(w.game.clock.time, true);
      w.view.renderer.getContext().finish();
    });
    await draw(); await page.evaluate(() => window.witch.view.assets.whenIdle()); await draw();
    const shot = async name => {
      await draw();
      await page.screenshot({ path: path.join(out, name + '.png'), timeout: 300000 });
    };
    if (mode === 'chains') {
      const trace = [];
      const sample = () => page.evaluate(() => {
        const {view:v,game:g}=window.witch;
        const right = window.witch.spriteRight();
        return {time:g.clock.time, camera:v.camera.position.toArray(), camLift:v.camLift, canopy:v.canopyNow,
          cells:v.grass.cells.size, tufts:v.grass.stats.tufts, grassBuildMs:v.grass.stats.buildMs,
          right:right.toArray(), viewport:[v.width,v.height], scale:v.mpp};
      });
      await page.evaluate(() => {
        const w=window.witch, g=w.game, c=window.fixture.c, r=w.spriteRight();
        for(const other of g.creatures) if(other!==c) other.gone=true;
        c.x=g.witch.x+r.x*15; c.z=g.witch.z+r.z*15;
        window.fixture.bend={x:g.witch.x+r.x*8+r.z*7,z:g.witch.z+r.z*8-r.x*7};
      });
      // Same pose and clocks for both probes. Only the renderer's grass-build budget changes.
      await shot('grass-before-settle'); trace.push({initial:await sample()});
      await page.evaluate(() => { window.witch.game.tuning.groundCover.budgetMs=Infinity; });
      await draw(); await shot('grass-settled'); trace.push({settled:await sample()});
      await page.evaluate(() => { window.witch.game.tuning.groundCover.on=false; });
      await shot('grass-hidden-control');
      await page.evaluate(() => { window.witch.game.tuning.groundCover.on=true; });
      await shot('chain');
      const advance = dt => page.evaluate(dt => { const g=window.witch.game; g.clock.time+=dt; g.herTime+=dt; },dt);
      for (const [phase,ground] of [['fall',true],['lift',false]]) {
        await page.evaluate(ground=>{
          const {c,bend}=window.fixture, w=window.witch.game.witch;
          c.travelling=ground;
          c.route=ground?{points:[c,bend,w],next:1,tx:w.x,tz:w.z}:undefined;
        },ground);
        await draw();
        const thumbnails=[];
        for(let frame=0;frame<=30;frame++) {
          if(frame) await advance(1/60);
          await draw();
          const png=await page.screenshot({timeout:20000});
          const name=phase+'-'+String(frame).padStart(2,'0');
          fs.writeFileSync(path.join(out,name+'.png'),png);
          thumbnails.push(png.toString('base64'));
          if(frame===30) fs.writeFileSync(path.join(out,(ground?'path-off-route':'rejoined')+'.png'),png);
        }
        const strip=await page.evaluate(async images=>{
          const canvas=document.createElement('canvas'); canvas.width=3200; canvas.height=720;
          const ctx=canvas.getContext('2d');
          for(let i=0;i<images.length;i++) {
            const img=new Image(); img.src='data:image/png;base64,'+images[i]; await img.decode();
            ctx.drawImage(img,i%10*320,Math.floor(i/10)*180,320,180);
          }
          return canvas.toDataURL('image/png').split(',')[1];
        },thumbnails);
        fs.writeFileSync(path.join(out,phase+'-strip.png'),Buffer.from(strip,'base64'));
        trace.push({phase,state:await sample()});
      }
      fs.writeFileSync(path.join(out,'grass-and-camera.json'),JSON.stringify(trace,null,2));
    }
    if (mode === 'mushrooms')
    for (const colour of ['blue','red','turquoise']) for (const [label, distance] of [['near',4],['far',24]]) {
      await page.evaluate(({colour,distance}) => {
        const g = window.witch.game; g.leash.stack = [];
        window.fixture.c.leashed = false;
        if (!g.mushrooms) throw Error('Mushroom system unavailable');
        g.mushrooms.patches = [{ id:'playtest', seed:64, x:g.witch.x, z:g.witch.z-distance, type:colour, picked:false }];
      }, {colour,distance});
      await shot(colour + '-' + label);
    }
    if (errors.length) throw Error(errors.join('\n'));
    fs.writeFileSync(path.join(out,'version.json'), JSON.stringify(version));
  } finally { clearTimeout(limit); await browser.close(); }
}
main().catch(e => {console.error(e); process.exitCode=1;});
