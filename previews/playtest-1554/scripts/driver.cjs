// Capture the five chain poses and three near/far night mushroom colours on an allocated cloud renderer.
//   node tools/shot/playtest-render.cjs <served-url> <expected-sha> <output-dir>
// Run once on the base and once on the slice. A fixed seed and presentation-only poses make the frames comparable.
const fs = require('node:fs'), path = require('node:path');
let playwright; try { playwright = require('playwright'); } catch { playwright = require('/opt/node22/lib/node_modules/playwright'); }
async function main() {
  const [base, sha, out] = process.argv.slice(2);
  if (!base || !/^[0-9a-f]{7,40}$/i.test(sha) || !out) throw Error('Expected served URL, commit SHA and output directory');
  const url = new URL(base.endsWith('/') ? base : base + '/');
  const version = await (await fetch(new URL('version.json', url), { cache: 'no-store' })).json();
  if (!version.version.includes(sha.slice(0, 7))) throw Error('Unexpected served version: ' + JSON.stringify(version));
  fs.mkdirSync(out, { recursive: true });
  const browser = await playwright.chromium.launch({ args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'] });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    const errors = []; page.setDefaultTimeout(120000); const T0=Date.now(), timings={};
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    url.search = '?shot=creature:fox@2&seed=123';
    await page.goto(url.href);
    await page.waitForFunction(() => window.witch?.ready, null, { timeout: 600000 });
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
    timings.ready_s=(Date.now()-T0)/1000; await draw(); await page.evaluate(() => window.witch.view.assets.whenIdle()); await draw();
    const renderer = await page.evaluate(() => { const gl=window.witch.view.renderer.getContext(); const e=gl.getExtension('WEBGL_debug_renderer_info'); return e?gl.getParameter(e.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER); });
    { const t=Date.now(); await page.screenshot({ path: path.join(out, '_warmup.png'), timeout: 300000 }); timings.warmup_s=(Date.now()-t)/1000; }
    const shot = async name => {
      await draw();
      const t=Date.now(); await page.screenshot({ path: path.join(out, name + '.png'), timeout: 300000 }); timings[name]=(Date.now()-t)/1000;
    };
    for (const [name, ground, dt] of [['chain',false,0],['falling',true,.25],['path',true,.5],['lifting',false,.25],['rejoined',false,.5]]) {
      await page.evaluate(ground => {
        const { c } = window.fixture, w = window.witch, witch = w.game.witch;
        c.travelling = ground;
        c.route = ground ? { points: [c, { x: c.x-4, z: c.z-3 }, witch], next: 1, tx: witch.x, tz: witch.z } : undefined;
      }, ground);
      await draw(); // Render the mode edge at the previous time before advancing to the requested pose.
      await page.evaluate(dt => { const g = window.witch.game; g.clock.time += dt; g.herTime += dt; }, dt);
      await shot(name);
    }
    for (const colour of ['blue','red','turquoise']) for (const [label, distance] of [['near',4],['far',24]]) {
      await page.evaluate(({colour,distance}) => {
        const g = window.witch.game; g.leash.stack = [];
        window.fixture.c.leashed = false;
        if (!g.mushrooms) throw Error('Mushroom system unavailable');
        g.mushrooms.patches = [{ id:'playtest', seed:64, x:g.witch.x, z:g.witch.z-distance, type:colour, picked:false }];
      }, {colour,distance});
      await shot(colour + '-' + label);
    }
    timings.total_s=(Date.now()-T0)/1000; fs.writeFileSync(path.join(out,'run.json'), JSON.stringify({renderer, timings, errors},null,1));
    if (errors.length) throw Error(errors.join('\n'));
    fs.writeFileSync(path.join(out,'version.json'), JSON.stringify(version));
  } finally { await browser.close(); }
}
main().catch(e => {console.error(e); process.exitCode=1;});
