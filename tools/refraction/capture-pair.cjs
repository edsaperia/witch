// Called by the coordinator's already allocated browser/capture runner after staging an actual game scene.
// No browser launch, server, listener, simulation advance or scheduling is owned by this helper.
const fs = require('node:fs/promises'), path = require('node:path');

async function capturePair(page, expectedSha, output, kind, requireCombinedPotion = false) {
  if (!/^[a-f0-9]{40}$/.test(expectedSha)) throw Error('Require the full tested source SHA');
  if (!['fire', 'ring'].includes(kind)) throw Error('Require fire or ring: never accept an empty effect comparison');
  const version = () => page.evaluate(async () => {
    const response = await fetch(new URL('version.json', location.href), { cache: 'no-store' });
    if (!response.ok) throw Error('version.json unavailable');
    return response.json();
  });
  const served = await version();
  if (!String(served.version).includes(expectedSha.slice(0, 7))) throw Error('Served build label does not match requested SHA');
  const state = await page.evaluate(async () => {
    const w = window.witch, manual = w.manual; w.manual = true;
    await w.view.assets.whenIdle();
    const gl = w.view.renderer.getContext(), debug = gl.getExtension('WEBGL_debug_renderer_info');
    return { manual, time: w.game.clock.time, enabled: w.view.post.refractionEnabled, key: w.compareKey?.(), renderer: debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER) };
  });
  const render = enabled => page.evaluate(({ enabled, time }) => {
    const w = window.witch, p = w.view.post; p.refractionEnabled = enabled; w.view.render(time);
    return { count: p.refraction.count, shapes: p.refraction.shapes.slice(0, p.refraction.count).map(v => v.toArray()), states: p.refraction.states.slice(0, p.refraction.count).map(v => v.toArray()), clock: w.game.clock.time,
      potion: { wobble: p.potionWobble, canopy: p.potionCanopy, time: p.potionTime } };
  }, { enabled, time: state.time });
  await fs.mkdir(output, { recursive: true });
  try {
    await render(false); const off = await page.screenshot({ path: path.join(output, 'off.png'), timeout: 120000 });
    const forms = await render(true);
    if (requireCombinedPotion && !(forms.potion.wobble > 0 && forms.potion.canopy > 0)) throw Error('Stage actual active wobble and the canopy grading potion together; combined comparison refused');
    if (!forms.states.some(s => (kind === 'fire' ? s[1] < 0.5 : s[1] >= 0.5))) throw Error(`No active ${kind} at the staged clock; comparison refused`);
    const on = await page.screenshot({ path: path.join(output, 'on.png'), timeout: 120000 });
    await render(false); const returned = await page.screenshot({ path: path.join(output, 'off-return.png'), timeout: 120000 });
    if (JSON.stringify(await version()) !== JSON.stringify(served)) throw Error('Build changed during capture');
    const result = { expectedSha, served, kind, ...state, forms, offPngByteIdentity: off.equals(returned), onPngDiffers: !off.equals(on), limitation: 'Capture only: no GPU timing, allocation/memory measurement or automatic foreground acceptance. PNG byte comparisons are not pixel-diff counts. Caller verifies full CI source SHA and scene comparability.' };
    await fs.writeFile(path.join(output, 'capture.json'), JSON.stringify(result, null, 2));
    return result;
  } finally { await page.evaluate(({ enabled, manual }) => { window.witch.view.post.refractionEnabled = enabled; window.witch.manual = manual; }, state); }
}
module.exports = { capturePair };
