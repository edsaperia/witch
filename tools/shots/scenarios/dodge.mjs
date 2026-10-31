// True OFF/ON/OFF-return at the repaired default echo strength, via captureVisible (not mesh.hide followed by View.update).
import fs from 'node:fs/promises';
import path from 'node:path';
export async function run({ page, loadStill, url, expectedSha, output }) {
  const capture = await loadStill(page, { url, expectedSha });
  const cases = [];
  try {
    if (await page.evaluate(() => window.witch.game.clock.paused)) await page.keyboard.press('Enter');
    await capture.step(60);
    // Actual clear-ground shot seam and gameplay input; no in-page cooldown/alpha edits.
    await page.evaluate(() => { const w = window.witch, d = w.game.map.dancefloor; const r = w.shot(`at:${d.x},${d.z + d.radius + 14}`); if (!r.ok) throw Error(r.say); });
    await capture.step(15, { moveX: 1 });
    const diagnostics = [];
    for (const [name, frames, controls] of [['departure-3frames', 3, { dash: true, moveX: -1 }], ['departure-9frames', 6, {}], ['arrival-15frames', 6, {}]]) {
      await capture.step(frames, controls);
      const state = await page.evaluate(() => { const w = window.witch, e = w.view.dodgeEchoes; return { time: w.game.herTime, dashAt: w.game.witches[0].dash.at, until: w.game.witches[0].dash.until, alpha: e.batches.map(b => b.mesh.material.uniforms.uSilhouette.value.w), poses: e.history.echoes.map(p => ({ x: p.x, z: p.z, born: p.born, alpha: p.alpha })) }; });
      const result = await capture.compare({ output: path.join(output, name), read: () => window.witch.view.dodgeEchoes.captureVisible,
        write: on => { window.witch.view.dodgeEchoes.captureVisible = on; },
        validate: () => { const e = window.witch.view.dodgeEchoes; if (!e.enabled || !e.batches.some(b => b.items.length)) throw Error('No actual live echo at this staged clock'); } });
      cases.push({ name, state, result });
      if (cases.length === 1 && !result.full.count) {
        await page.evaluate(() => {
          const v = window.witch.view;
          window.__dodgeLayerDiagnostic = { mode: '', sources: [v.spellFx.trail, v.trail.mesh, v.swoopTrails.mesh].filter(Boolean).map(mesh => [mesh, mesh.visible]),
            orders: v.dodgeEchoes.batches.map(b => [b.mesh, b.mesh.renderOrder]), tone: { ...v.post.tuning.tone } };
        });
        try {
          for (const mode of ['no-motes-ribbons', 'neutral-levels', 'after-ribbons']) {
            await page.evaluate(mode => { window.__dodgeLayerDiagnostic.mode = mode; }, mode);
            const measured = await capture.compare({ output: path.join(output, `diagnostic-${mode}`), prepareFrame: false,
              read: () => window.witch.view.dodgeEchoes.captureVisible,
              write: on => {
                const v = window.witch.view, d = window.__dodgeLayerDiagnostic;
                v.dodgeEchoes.captureVisible = on;
                for (const [mesh, visible] of d.sources) mesh.visible = d.mode === 'no-motes-ribbons' ? false : visible;
                for (const [mesh, order] of d.orders) mesh.renderOrder = d.mode === 'after-ribbons' ? 12.1 : order;
                v.post.tuning.tone.black = d.mode === 'neutral-levels' ? 0 : d.tone.black;
                v.post.tuning.tone.gamma = d.mode === 'neutral-levels' ? 1 : d.tone.gamma;
              } });
            diagnostics.push({ mode, measured });
          }
        } finally { await page.evaluate(() => {
          const v = window.witch.view, d = window.__dodgeLayerDiagnostic;
          for (const [mesh, visible] of d.sources) mesh.visible = visible;
          for (const [mesh, order] of d.orders) mesh.renderOrder = order;
          Object.assign(v.post.tuning.tone, d.tone); delete window.__dodgeLayerDiagnostic;
        }); }
      }
    }
    const result = { expectedSha, cases, diagnostics, defaultHasPixels: cases[0].result.full.count > 0, limitation: 'Visibility/arrival timing only. Diagnostic layer changes are restored and not production fixes. Moving-camera/occlusion/turn/rapid and GPU acceptance remain separate cases.' };
    await fs.writeFile(path.join(output, 'dodge-review.json'), JSON.stringify(result, null, 2));
    if (!result.defaultHasPixels) throw Error('Default-strength true OFF/ON is still empty; layer-isolation diagnostics saved');
    return result;
  } finally { await capture.release(); }
}
