// Called only by the coordinator's allocated cloud browser runner; owns no browser/server/listener.
// Two fresh private pages, the same built source/seed/arena, on=false then true; caller owns cleanup.
const fs = require('node:fs/promises'), path = require('node:path');
const { spawnSync } = require('node:child_process');
const { holdSimulation, startingBoundary } = require('../bench/hold-simulation.cjs');

async function captureFight(page, { baseUrl, expectedSha, output, on, seed = 123, seconds = 4, fps = 12 }) {
  if (process.platform === 'win32' || !(process.env.GITHUB_ACTIONS === 'true' || process.env.WITCH_CLOUD_CPU === '1')) throw Error('Canonical-allocated cloud capture only');
  if (!/^[a-f0-9]{40}$/.test(expectedSha) || typeof on !== 'boolean') throw Error('Require exact tested source SHA and explicit spacing state');
  const errors = [], error = e => errors.push(e.message);
  page.on('pageerror', error);
  await fs.mkdir(output, { recursive: true });
  const url = new URL(baseUrl);
  for (const [k, v] of Object.entries({ seed, spacing: on ? 1 : 0, arena: 'wolf*1@0,boar*2@2,wolf*2@2,fox*2@2,hare*2@2', quick: 1, opening: 'old', loadmist: 0, resume: 0 })) url.searchParams.set(k, String(v));
  try {
    await page.addInitScript(holdSimulation);
    await page.goto(url.href);
    await page.waitForFunction(() => window.witch?.ready && window.witch.view.assets.pending === 0, null, { timeout: 240000 });
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000 });
    await page.evaluate(() => window.witch.view.assets.whenIdle());
    const start = await page.evaluate(startingBoundary);
    // Private measurement override at the held zero-step boundary; no public gameplay switch.
    await page.evaluate(value => { window.witch.game.tuning.combatSpacing = value; }, on);
    const source = await page.evaluate(async () => {
      const w = window.witch, g = w.game, response = await fetch(new URL('version.json', location.href), { cache: 'no-store' });
      if (!response.ok) throw Error('Missing served build identity');
      return { version: await response.json(), seed: g.seed, spacing: g.tuning.combatSpacing === true,
        initial: g.arena.ids.map(id => { const c = g.creatures[id]; return { id, species: c.species, level: c.level, x: c.x, z: c.z }; }) };
    });
    if (!String(source.version.version).includes(expectedSha.slice(0, 7)) || source.seed !== seed || source.spacing !== on) throw Error('Capture source/seed/switch mismatch');
    const samples = [];
    for (let i = 0; i < Math.round(seconds * fps); i++) {
      samples.push(await page.evaluate(({ dt, at }) => {
        const w = window.witch, g = w.game;
        g.witches[0].health.hp = 1e6;
        w.frame({ moveX: Math.cos(at / 5), moveZ: Math.sin(at / 5), toggleMode: false, zoom: 0, autoTalk: false }, dt);
        return { time: g.clock.time, creatures: g.arena.ids.map(id => { const c = g.creatures[id]; return { id, x: c.x, z: c.z, hop: !!c.hop, windup: !!c.fight?.windupUntil, lunge: !!c.fight?.lunge, charge: !!c.charge }; }) };
      }, { dt: 1 / fps, at: i / fps }));
      await page.screenshot({ path: path.join(output, `frame-${String(i).padStart(4, '0')}.png`), timeout: 30000 });
      if (errors.length) throw Error(`Capture page error: ${errors.join('; ')}`);
    }
    const video = path.join(output, 'fight.webm');
    const encode = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(output, 'frame-%04d.png'), '-an', '-c:v', 'libvpx-vp9', '-crf', '30', '-b:v', '0', video], { encoding: 'utf8', timeout: 60000 });
    if (encode.status !== 0) throw Error(`Cloud clip encoding failed: ${encode.error?.message ?? encode.stderr}`);
    const result = { expectedSha, source, start, seconds, fps, samples, errors, video, limitation: 'Ground-disc calibration/CPU metrics and screenshot/video evidence are separate; visual spacing is for Ed/coordinator to judge. No local browser or runtime multiplayer exercised.' };
    await fs.writeFile(path.join(output, 'capture.json'), JSON.stringify(result, null, 2) + '\n');
    return result;
  } finally { page.off('pageerror', error); }
}
module.exports = { captureFight };
