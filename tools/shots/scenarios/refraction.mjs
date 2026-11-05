// Wrap the still-owned #1543 foreground driver and analyze its true held pairs; this does not migrate that driver during review.
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { decodePng, diffPixels, actorMask, writeComparison } from '../pixels.mjs';
const require = createRequire(import.meta.url);
export async function run({ page, loadStill, url, expectedSha, output, options }) {
  if (!options.driver) throw Error('Require exact #1543 foreground.cjs path; keep its ownership/commit recorded');
  const { captureForeground } = require(path.resolve(options.driver));
  const capture = await loadStill(page, { url, expectedSha });
  try {
    if (await page.evaluate(() => window.witch.game.clock.paused)) await page.keyboard.press('Enter');
    await capture.step(60);
    const staged = await captureForeground(page, expectedSha, output, { fire: options.fire, stageCreature: true });
    const measures = [];
    for (const [i, stage] of staged.stages.entries()) {
      const directory = path.join(output, `crossing-${i}`), read = async name => decodePng(await fs.readFile(path.join(directory, name)));
      const off = await read('off.png'), on = await read('on.png'), returned = await read('off-return.png'), absent = await read('off-nowitch.png');
      const noise = await writeComparison(path.join(directory, 'noise'), off, returned);
      const box = stage.bodyEnvelope, envelope = { left: Math.floor(box.left * off.width), right: Math.ceil(box.right * off.width), top: Math.floor((1 - box.top) * off.height), bottom: Math.ceil((1 - box.bottom) * off.height) };
      const mask = actorMask(off, absent, 24, envelope), body = await writeComparison(path.join(directory, 'opaque-body'), off, on, { mask });
      const maskPixels = [...mask].reduce((a, b) => a + b, 0), full = diffPixels(off, on);
      const measure = { crossing: i, noise, body, maskPixels, wholeChanged: full.count, overlap: stage.overlapsPlume, foreground: stage.foreground };
      measures.push(measure);
      if (noise.count || !maskPixels || !stage.overlapsPlume || !stage.foreground) throw Error(`Invalid held foreground case ${i}: inspect saved diagnostics`);
    }
    const creatures = [];
    for (const [i, stage] of staged.creatures.entries()) {
      const directory = path.join(output, `creature-${i}`), read = async name => decodePng(await fs.readFile(path.join(directory, name)));
      const off = await read('off.png'), on = await read('on.png'), returned = await read('off-return.png'), absent = await read('off-nocreatures.png');
      const noise = await writeComparison(path.join(directory, 'noise'), off, returned), mask = actorMask(off, absent, 24);
      const index = stage.pair.forms.states.findIndex(s => s[1] < .5), shape = stage.pair.forms.shapes[index];
      if (!shape) throw Error('Creature case lacks active fire');
      for (let pixel = 0; pixel < mask.length; pixel++) {
        const x = (pixel % off.width + .5) / off.width, y = 1 - (Math.floor(pixel / off.width) + .5) / off.height;
        if (Math.hypot((x - shape[0]) / shape[2], (y - shape[1]) / shape[3]) >= .8) mask[pixel] = 0;
      }
      const maskPixels = [...mask].reduce((a, b) => a + b, 0), body = await writeComparison(path.join(directory, 'opaque-creatures'), off, on, { mask });
      creatures.push({ id: stage.id, lateral: stage.lateral, noise, body, maskPixels, maskScope: 'All actual creature geometry removed; thresholded pixels inside plume interior only' });
      if (noise.count || !maskPixels) throw Error(`Creature case ${i} is noisy or lacks real opaque-body/plume overlap`);
    }
    const result = { expectedSha, driver: options.driver, driverSha: options.driverSha ?? null, measures, creatures,
      maskInterpretation: { threshold: 24, kind: 'actor-removal contrast mask', opacityProven: false, criterion: 'Strict zero changed pixels remains unchanged; a contrast mask alone does not certify sprite opacity or depth coverage.' },
      guardZeroBodyPixels: measures.every(m => m.body.count === 0) && creatures.length > 0 && creatures.every(m => m.body.count === 0), limitation: 'Stable meaningful body-mask pixels only. Creature mask includes all actual creature geometry in plume interior. GPU/memory unmeasured.' };
    await fs.writeFile(path.join(output, 'guard-review.json'), JSON.stringify(result, null, 2));
    if (!result.guardZeroBodyPixels) throw Error('Foreground guard still changes actor-difference-mask pixels; guard-review.json contains exact counts (opacity not established by the mask)');
    return result;
  } finally { await capture.release(); }
}
