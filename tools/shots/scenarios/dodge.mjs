// True OFF/ON/OFF-return at the repaired default echo strength, via captureVisible (not mesh.hide followed by View.update).
import fs from 'node:fs/promises';
import path from 'node:path';
export const INFORMATIONAL_STAGES = Object.freeze(['arrival', 'occlusion', 'camera', 'rapid', 'turn']);
export function selectStages(requested = INFORMATIONAL_STAGES) {
  if (!Array.isArray(requested) || requested.length > INFORMATIONAL_STAGES.length || new Set(requested).size !== requested.length || requested.some(name => !INFORMATIONAL_STAGES.includes(name))) throw Error('Unknown or duplicate informational dodge stage');
  return [...requested];
}
export function arrivalStepCount(time, until) {
  if (!Number.isFinite(time) || !Number.isFinite(until)) throw Error('Need actual finite blink clocks');
  const frames = Math.max(1, Math.ceil(Math.max(0, until - time) * 60 - 1e-9) + 1);
  if (frames > 600) throw Error('Arrival exceeds bounded stepping budget');
  return frames;
}
export function worldPoseDrift(before, after) {
  if (!before.length || before.length !== after.length || before.some((pose, i) => !Number.isFinite(pose.born) || pose.born !== after[i].born)) return null;
  let max = 0;
  for (let i = 0; i < before.length; i++) {
    if (![before[i].x, before[i].y, before[i].z, after[i].x, after[i].y, after[i].z].every(Number.isFinite)) return null;
    max = Math.max(max, Math.hypot(before[i].x - after[i].x, before[i].y - after[i].y, before[i].z - after[i].z));
  }
  return max;
}
// Self-contained browser function; sampled history and actual camera are evidence, not reconstructed poses.
export function echoState() {
  const w = window.witch, v = w.view, e = v.dodgeEchoes, W = w.game.witches[0], D = W.dash;
  return { time: w.game.herTime, worldTime: w.game.clock.time, dashAt: D.at, until: D.until, readyAt: D.readyAt,
    from: [D.fromX, D.fromZ], to: [D.toX, D.toZ], charges: D.charges, sharedCooldownLeft: W.cool?.left,
    body: { x: W.body.x, z: W.body.z, facing: W.body.facing, heading: W.body.heading, mode: W.body.mode },
    equipment: { hat: W.spells?.hat, broom: W.spells?.broom, parts: { ...W.spells?.parts } },
    alpha: e.batches.map(b => b.mesh.material.uniforms.uSilhouette.value.w), liveInstances: e.batches.reduce((n, b) => n + b.items.length, 0),
    poses: e.history.echoes.map(p => ({ x: p.x, y: p.y, z: p.z, born: p.born, alpha: p.alpha, flip: p.pose.sprite.flip, uv: [...p.pose.sprite.frame.uv] })),
    camera: { matrix: v.camera.matrixWorld.toArray(), position: v.camera.position.toArray(), zoom: w.game.camera.zoom, zoomStep: w.game.camera.zoomStep } };
}
class NotStaged extends Error {}
export async function run({ page, loadStill, url, expectedSha, output, options = {} }) {
  const requestedStages = selectStages(options.stages);
  if (options.occluder && (!Number.isFinite(options.occluder.x) || !Number.isFinite(options.occluder.z))) throw Error('Occluder hint must be a finite real-tree location');
  const capture = await loadStill(page, { url, expectedSha });
  const cases = [], informational = [], diagnostics = [];
  let driverStatus = 'in-progress';
  const save = () => fs.writeFile(path.join(output, 'dodge-review.json'), JSON.stringify({ expectedSha, cases, diagnostics, informational, requestedStages,
    driverStatus, informationalOnly: true, acceptance: 'NOT_EVALUATED', defaultHasPixels: cases[0]?.result.full.count > 0,
    limitation: 'Only captured exact-head evidence. Informational staging is not visual/GPU acceptance; missing overlap, an empty effect, or unchanged camera is never a pass. The caller must allocate a bounded stage subset and verify actual renderer.' }, null, 2));
  const readState = () => page.evaluate(echoState);
  const compareEchoes = async name => {
    const before = await readState();
    if (!before.liveInstances) throw new NotStaged('No actual live echo at this staged clock');
    const result = await capture.compare({ output: path.join(output, name), read: () => window.witch.view.dodgeEchoes.captureVisible,
      write: on => { window.witch.view.dodgeEchoes.captureVisible = on; },
      validate: () => { const e = window.witch.view.dodgeEchoes; if (!e.enabled || !e.batches.some(b => b.items.length)) throw Error('No actual live echo at this staged clock'); } });
    return { state: before, after: await readState(), result };
  };
  const clearGround = async () => {
    const staged = await page.evaluate(() => { const w = window.witch, d = w.game.map.dancefloor; return w.shot(`at:${d.x},${d.z + d.radius + 14}`); });
    if (!staged.ok) throw new NotStaged(staged.say);
    await capture.step(15, { moveX: 1 });
  };
  const startLegalDash = async (moveX, moveZ = 0) => {
    const before = await readState();
    // Real button presses only. No timer/charge/alpha writes; first accepted blink ends this bounded search.
    for (let attempts = 1; attempts <= 180; attempts++) {
      await capture.step(1, { dash: true, moveX, moveZ });
      const after = await readState();
      if (after.dashAt !== before.dashAt && Number.isFinite(after.dashAt)) {
        if (!Math.hypot(after.to[0] - after.from[0], after.to[1] - after.from[1])) throw new NotStaged('Blink accepted but did not relocate; no movement case established');
        return { attempts, before, accepted: after };
      }
    }
    throw new NotStaged('No legal blink accepted within 180 real input frames; no cooldown was bypassed');
  };
  try {
    await fs.mkdir(output, { recursive: true });
    await save();
    if (await page.evaluate(() => window.witch.game.clock.paused)) await page.keyboard.press('Enter');
    await capture.step(60);
    // Actual clear-ground shot seam and gameplay input; no in-page cooldown/alpha edits.
    await page.evaluate(() => { const w = window.witch, d = w.game.map.dancefloor; const r = w.shot(`at:${d.x},${d.z + d.radius + 14}`); if (!r.ok) throw Error(r.say); });
    await capture.step(15, { moveX: 1 });
    for (const [name, frames, controls] of [['departure-3frames', 3, { dash: true, moveX: -1 }], ['departure-9frames', 6, {}], ['arrival-15frames', 6, {}]]) {
      await capture.step(frames, controls);
      const state = await page.evaluate(() => { const w = window.witch, e = w.view.dodgeEchoes; return { time: w.game.herTime, dashAt: w.game.witches[0].dash.at, until: w.game.witches[0].dash.until, alpha: e.batches.map(b => b.mesh.material.uniforms.uSilhouette.value.w), poses: e.history.echoes.map(p => ({ x: p.x, z: p.z, born: p.born, alpha: p.alpha })) }; });
      const result = await capture.compare({ output: path.join(output, name), read: () => window.witch.view.dodgeEchoes.captureVisible,
        write: on => { window.witch.view.dodgeEchoes.captureVisible = on; },
        validate: () => { const e = window.witch.view.dodgeEchoes; if (!e.enabled || !e.batches.some(b => b.items.length)) throw Error('No actual live echo at this staged clock'); } });
      cases.push({ name, state, result });
      await save(); // Preserve each completed pair if the external slot watchdog ends a later stage.
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
            await save();
          }
        } finally { await page.evaluate(() => {
          const v = window.witch.view, d = window.__dodgeLayerDiagnostic;
          for (const [mesh, visible] of d.sources) mesh.visible = visible;
          for (const [mesh, order] of d.orders) mesh.renderOrder = order;
          Object.assign(v.post.tuning.tone, d.tone); delete window.__dodgeLayerDiagnostic;
        }); }
      }
    }
    for (const stage of requestedStages) {
      const record = { stage, informationalOnly: true, acceptance: 'NOT_EVALUATED', status: 'staging', captures: [] };
      informational.push(record); await save();
      try {
        if (stage === 'occlusion') {
          const tree = await page.evaluate(hint => {
            const g = window.witch.game, d = g.map.dancefloor;
            const candidates = g.forest.treesNear(hint?.x ?? d.x, hint?.z ?? d.z + d.radius + 40, hint ? 8 : 96)
              .filter(p => Number.isFinite(p.x) && Number.isFinite(p.z) && (!hint || Math.hypot(p.x - hint.x, p.z - hint.z) < .25));
            candidates.sort((a, b) => Math.hypot(a.x - d.x, a.z - d.z) - Math.hypot(b.x - d.x, b.z - d.z));
            const p = candidates[0]; return p ? { x: p.x, z: p.z, type: p.type, variant: p.variant, flip: p.flip } : null;
          }, options.occluder ?? null);
          if (!tree) throw new NotStaged('No real existing tree found in the bounded query; no synthetic occluder installed');
          const at = await page.evaluate(tree => window.witch.shot(`at:${tree.x},${tree.z - 3}`), tree);
          if (!at.ok) throw new NotStaged(at.say);
          await capture.step(6);
          record.input = await startLegalDash(1); await capture.step(2);
          record.geometry = await page.evaluate(tree => {
            const w = window.witch, v = w.view, e = v.dodgeEchoes, pose = e.history.echoes[0], uniforms = e.batches[0]?.mesh.material.uniforms;
            if (!pose || !uniforms?.uBend || !uniforms?.uBendFwd) return { tree, coverageProven: false, reason: 'Missing actual echo/bend uniforms' };
            const project = p => { const q = v.camera.position.clone().set(p.x, p.y, p.z), B = uniforms.uBend.value, F = uniforms.uBendFwd.value;
              const d = Math.max(0, (q.x - B.y) * F.x + (q.z - B.z) * F.y); q.y -= B.x * d * d; q.project(v.camera);
              return { x: (q.x + 1) / 2, y: (1 - q.y) / 2, depth: (q.z + 1) / 2 }; };
            const trunk = project({ ...tree, y: w.groundHeight(tree.x, tree.z) }), echo = project(pose);
            return { tree, trunkFoot: trunk, echoFoot: echo, treeFootNearer: trunk.depth < echo.depth,
              horizontalSeparation: Math.abs(trunk.x - echo.x), coverageProven: false, limitation: 'Real-tree candidate and projected foot ordering only; actual trunk/echo alpha and depth overlap still require captured inspection.' };
          }, tree);
          record.captures.push(await compareEchoes('informational-occlusion'));
          record.status = 'candidate-captured-unverified';
        } else {
          await clearGround();
          record.input = await startLegalDash(stage === 'turn' ? -1 : 1);
          if (stage === 'arrival' || stage === 'turn') {
            const at = await readState(); await capture.step(arrivalStepCount(at.time, at.until));
            const arrived = await readState();
            record.arrivalWitness = { until: arrived.until, actualVisibleBorn: arrived.poses.filter(p => p.born >= arrived.until).map(p => p.born) };
            if (!record.arrivalWitness.actualVisibleBorn.length) throw new NotStaged('No echo born at an actual visible arrival');
            if (stage === 'turn') {
              record.beforeTurn = arrived;
              await capture.step(6, { moveX: 1 });
              record.afterTurn = await readState();
              record.bodyFacingChanged = record.beforeTurn.body.facing !== record.afterTurn.body.facing;
              if (!record.bodyFacingChanged) throw new NotStaged('Body did not turn while a real echo remained; not a turn proof');
            }
            record.captures.push(await compareEchoes(`informational-${stage}`));
          } else if (stage === 'camera') {
            await capture.step(2); record.beforeCamera = await readState();
            await capture.step(3, { zoom: 1, moveX: .5 }); record.afterCamera = await readState();
            record.cameraMoved = record.beforeCamera.camera.matrix.some((x, i) => Math.abs(x - record.afterCamera.camera.matrix[i]) > 1e-9);
            record.matchedWorldPoseDriftMetres = worldPoseDrift(record.beforeCamera.poses, record.afterCamera.poses);
            if (!record.cameraMoved) throw new NotStaged('Camera matrix did not change; no moving-camera case was established');
            record.captures.push(await compareEchoes('informational-camera'));
          } else if (stage === 'rapid') {
            record.repeats = [];
            for (let repeat = 0; repeat < 3; repeat++) {
              const input = repeat ? await startLegalDash(repeat % 2 ? -1 : 1) : record.input;
              await capture.step(2); const captured = await compareEchoes(`informational-rapid-${repeat + 1}`);
              record.repeats.push({ repeat: repeat + 1, input, captured }); await save();
            }
            record.rapidMeaning = 'Three real accepted blinks at their actual charge/shared-cooldown gate; not artificial 0.1-second repeats or a proof of a particular equipment configuration.';
          }
          record.status = 'captured-unverified';
        }
      } catch (error) {
        record.error = error.message;
        record.status = error instanceof NotStaged ? 'not-staged' : 'invalid-capture';
        record.lastState = await readState().catch(() => null);
        await save();
        if (!(error instanceof NotStaged)) throw error; // Clock/version/noise/source failures remain fatal.
      }
      await save();
    }
    const result = { expectedSha, cases, diagnostics, informational, requestedStages, informationalOnly: true, acceptance: 'NOT_EVALUATED', defaultHasPixels: cases[0].result.full.count > 0, limitation: 'Informational stage artifacts only; actual opacity/occlusion, camera visual continuity, GPU/memory and product acceptance require canonical review. No equipment/cooldown/alpha was edited.' };
    driverStatus = 'completed'; await save();
    if (!result.defaultHasPixels) throw Error('Default-strength true OFF/ON is still empty; layer-isolation diagnostics saved');
    return result;
  } catch (error) { driverStatus = 'failed'; await save().catch(() => {}); throw error; }
  finally { await capture.release(); }
}
