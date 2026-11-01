// Stage real witch poses crossing a real campfire plume in the coordinator's already allocated capture page.
//   await captureForeground(page, SOURCE_SHA, outputDirectory, { fire: { x, z } });
// No browser/server launch or simulation step. Saves OFF/ON/OFF-return at five lateral positions and rejects an empty foreground case.
const fs = require('node:fs/promises'), path = require('node:path');
const { capturePair } = require('./capture-pair.cjs');
const { installCaptureHold, restoreCaptureHold, probeRenderDrift } = require('./capture-hold.cjs');
const { readHeldDepth, inspectDepthPoints } = require('./depth-readback.cjs');

async function captureForeground(page, expectedSha, output, options = {}) {
  const crossings=options.crossings??[0,1,2,3,4];
  if(!Array.isArray(crossings)||!crossings.length||crossings.length>5||new Set(crossings).size!==crossings.length||crossings.some(i=>!Number.isInteger(i)||i<0||i>4))throw Error('Invalid crossing selection');
  const depthCapture=async(directory,label)=>{
    if(!options.depthReadback)return;
    const frame=await page.evaluate(readHeldDepth),points=options.depthPoints??Array.from({length:9},(_,i)=>({x:495+i%3,y:254+Math.floor(i/3)}));
    const selected=inspectDepthPoints(frame,points);
    await fs.writeFile(path.join(directory,`${label}-depth.json`),JSON.stringify({ ...frame, selected },null,2));
  };
  const before = await page.evaluate(async ({ requested, creatureId }) => {
    const w = window.witch, g = w.game, v = w.view;
    if (g.tuning.bare || v.fly || v.telescope) throw Error('Require ordinary clothed ground view');
    if (g.mushrooms?.trips?.[g.witches[0]?.id ?? 0]) throw Error('Use an ordinary no-potion foreground scene');
    const fires = v.worldFires.filter(f => f.scale > 0.1);
    const fire = requested ? fires.find(f => Math.hypot(f.x - requested.x, f.z - requested.z) < 0.01)
      : fires.sort((a, b) => Math.hypot(a.x - g.witch.x, a.z - g.witch.z) - Math.hypot(b.x - g.witch.x, b.z - g.witch.z))[0];
    if (!fire) throw Error('Require a real existing campfire; no synthetic emitter is installed');
    const creature = g.creatures.find(c => (creatureId === null || c.id === creatureId) && c.friendly && !c.gone && !c.boss && !c.leashed) ?? null;
    if (creatureId !== null && !creature) throw Error('creatureId must identify an existing friendly, unleashed, non-boss creature');
    // Keep the original objects in-page: shot() replaces both rather than editing them.
    if (window.__refractionForeground) throw Error('Foreground staging already active');
    await v.assets.whenIdle();
    window.__refractionForeground = { witch: g.witch, camera: g.camera, manual: w.manual, enabled: v.post.refractionEnabled,
      creature, creaturePosition: creature && { ...creature }, introFocus: g.introFocus, hadIntroFocus: Object.hasOwn(g, 'introFocus') };
    w.manual = true;
    return { fire: { x: fire.x, z: fire.z, scale: fire.scale }, time: g.clock.time, creatureId: creature?.id ?? null };
  }, { requested: options.fire ?? null, creatureId: options.creatureId ?? null });

  const stage = async (x, z) => page.evaluate(async ({ x, z, time, fire }) => {
    const w = window.witch, v = w.view, g = w.game;
    const result = w.shot(`at:${x},${z}`);
    if (!result.ok) throw Error(result.say);
    v.post.refractionEnabled = true;
    // Render once to request the actual pose art, wait for it, then settle the same frozen frame.
    v.render(time); await v.assets.whenIdle();
    for (let i = 0; i < 4; i++) v.render(time);
    if (g.clock.time !== time) throw Error('Foreground staging advanced the simulation clock');
    const batch = v.witchBatch.items.length ? v.witchBatch : v.bareBatch;
    if (!batch?.items.length || batch.items[0].frame.h !== v.witchFrameH) throw Error('Witch body not visible in either batch: staging refused');
    const mesh = batch.mesh, u = mesh.material.uniforms;
    const nearest = v.worldFires.filter(f => f.scale > 0.1).sort((a, b) => Math.hypot(a.x - x, a.z - z) - Math.hypot(b.x - x, b.z - z))[0];
    if (!nearest || Math.hypot(nearest.x - fire.x, nearest.z - fire.z) > 0.01) throw Error('Another fire became nearest; choose an isolated real fire');
    const bend = p => {
      const b = u.uBend.value, f = u.uBendFwd.value;
      const d = Math.max(0, (p.x - b.y) * f.x + (p.z - b.z) * f.y);
      p.y -= b.x * d * d; return p;
    };
    const projectedFire = bend(v.camera.position.clone().set(fire.x, w.groundHeight(fire.x, fire.z) + 2.3, fire.z)).project(v.camera);
    const fx = v.post.refraction, index = fx.states.findIndex((s, i) => i < fx.count && s.y < 0.5);
    if (index < 0) throw Error('No active fire form: check URL/quality/comfort');
    const shape = fx.shapes[index], supportDepth = fx.states[index].x;
    if (Math.hypot(projectedFire.x * 0.5 + 0.5 - shape.x, projectedFire.y * 0.5 + 0.5 - shape.y) > 0.001) throw Error('Active form does not match the requested real fire');
    // Reconstruct the visible body quad from the actual instance buffers and shared billboard/bend uniforms.
    // This is a conservative envelope, not an opaque-sprite mask or proof of the guard passing.
    const geo = mesh.geometry, base = geo.getAttribute('iPos'), size = geo.getAttribute('iSize'), corners = geo.getAttribute('position');
    const points = [];
    for (let i = 0; i < corners.count; i++) {
      const cx = corners.getX(i) * size.getX(0), cy = corners.getY(i) * size.getY(0), lean = u.uLean.value;
      const p = v.camera.position.clone().set(base.getX(0), base.getY(0), base.getZ(0));
      p.addScaledVector(u.uRight.value, cx + lean.x * cy).addScaledVector(u.uUp.value, cy + lean.y * cx);
      bend(p).project(v.camera); points.push([p.x * 0.5 + 0.5, p.y * 0.5 + 0.5, p.z * 0.5 + 0.5]);
    }
    // Expand by one art texel for the sprite shader's base pixelSnap.
    const px = 1 / v.post.scene.width, py = 1 / v.post.scene.height;
    const box = { left: Math.min(...points.map(p => p[0])) - px, right: Math.max(...points.map(p => p[0])) + px, bottom: Math.min(...points.map(p => p[1])) - py, top: Math.max(...points.map(p => p[1])) + py };
    const qx = Math.max(box.left, Math.min(box.right, shape.x)), qy = Math.max(box.bottom, Math.min(box.top, shape.y));
    const ellipseRadius = Math.hypot((qx - shape.x) / shape.z, (qy - shape.y) / shape.w);
    const depth = Math.max(...points.map(p => p[2]));
    return { witch: { x: g.witch.x, z: g.witch.z }, batch: batch === v.bareBatch ? 'bareBatch' : 'witchBatch', camera: v.camera.position.toArray(), bodyEnvelope: box,
      fireShape: shape.toArray(), supportDepth, farthestBodyDepth: depth,
      foreground: depth < supportDepth, overlapsPlume: ellipseRadius < 0.8, ellipseRadius,
      lowResolution: v.post.scene.width ? [v.post.scene.width, v.post.scene.height] : null };
  }, { x, z, time: before.time, fire: before.fire });

  try {
    await fs.mkdir(output, { recursive: true });
    // A normal start may have no friendly creature. The existing shot stager borrows a real fox, friendly and unleashed.
    if (before.creatureId === null && options.stageCreature !== false) before.creatureId = await page.evaluate(() => {
      const w = window.witch, g = w.game, saved = window.__refractionForeground;
      const originals = new Map(g.creatures.map(c => [c, { ...c }]));
      saved.creatureOriginals = originals; // Roll back even if a staging assertion below fails.
      const result = w.shot('creature:fox@1');
      if (!result.ok) throw Error(`Cannot stage required creature: ${result.say}`);
      const creature = g.creatures.find(c => c.x !== originals.get(c).x || c.z !== originals.get(c).z || c.species !== originals.get(c).species);
      if (!creature || !creature.friendly || creature.leashed) throw Error('Existing shot stager did not supply a friendly, unleashed creature');
      saved.creature = creature; saved.creaturePosition = originals.get(creature);
      delete saved.creatureOriginals;
      return creature.id;
    });
    // Camera is south of the fire. Find a real foreground depth whose body overlaps the plume's interior.
    let distance = null;
    for (const d of [1, 2, 3, 4, 6]) {
      const m = await stage(before.fire.x, before.fire.z + d);
      if (m.foreground && m.overlapsPlume) { distance = d; break; }
    }
    if (distance === null) throw Error('No verified foreground/body-plume overlap: choose another existing fire; never accept an empty guard case');
    const stages = [];
    for (const [i, lateral] of [-2, -1, 0, 1, 2].entries()) {
      if(!crossings.includes(i))continue;
      let metadata = await stage(before.fire.x + lateral, before.fire.z + distance);
      const directory = path.join(output, `crossing-${i}`);
      const drift = await page.evaluate(probeRenderDrift);
      metadata = await stage(before.fire.x + lateral, before.fire.z + distance);
      const hold = await page.evaluate(installCaptureHold);
      let pair;
      try {
        await page.screenshot({ timeout: 120000 }); // Compile/warm SwiftShader before the measured screenshots.
        pair = await capturePair(page, expectedSha, directory, 'fire');
        if(options.depthReadback){
          const old=await page.evaluate(()=>window.witch.view.post.refractionEnabled);
          try{for(const enabled of [false,true]){await page.evaluate(enabled=>{const w=window.witch;w.view.post.refractionEnabled=enabled;w.view.render(w.game.clock.time);},enabled);await depthCapture(directory,enabled?'on':'off');}}
          finally{await page.evaluate(enabled=>{const w=window.witch;w.view.post.refractionEnabled=enabled;w.view.render(w.game.clock.time);},old);}
        }
        // With View update held, SpriteBatch.set cannot undo this temporary visibility mask.
        await page.evaluate(time => {
          const v = window.witch.view, state = window.__refractionCaptureHold;
          state.maskVisibility = [v.witchBatch, v.bareBatch].filter(Boolean).flatMap(b => b.meshes).map(mesh => [mesh, mesh.visible]);
          for (const [mesh] of state.maskVisibility) mesh.visible = false;
          v.post.refractionEnabled = false; v.render(time);
        }, before.time);
        try { await page.screenshot({ path: path.join(directory, 'off-nowitch.png'), timeout: 120000 }); await depthCapture(directory,'off-nowitch'); }
        finally { await page.evaluate(() => { for (const [mesh, visible] of window.__refractionCaptureHold.maskVisibility) mesh.visible = visible; }); }
      } finally { await page.evaluate(restoreCaptureHold); }
      const record = { lateral, ...metadata, drift, hold, pair };
      await fs.writeFile(path.join(directory, 'foreground.json'), JSON.stringify(record, null, 2)); stages.push(record);
    }
    if (!stages.some(s => s.foreground && s.overlapsPlume)) throw Error('Crossing lost the required foreground overlap');
    const creatures = [];
    if (options.captureCreatures!==false && before.creatureId !== null) for (const [i, lateral] of [-0.5, 0, 0.5].entries()) {
      const metadata = await page.evaluate(async ({ fire, distance, lateral, time }) => {
        const w = window.witch, v = w.view, c = window.__refractionForeground.creature;
        const result = w.shot(`at:${fire.x + 8},${fire.z + distance}`);
        if (!result.ok) throw Error(result.say);
        c.x = fire.x + lateral; c.z = fire.z + Math.min(0.5, distance); c.cell = w.game.map.cellSafe(c.x, c.z).cell;
        v.post.refractionEnabled = true; v.render(time); await v.assets.whenIdle();
        for (let j = 0; j < 4; j++) v.render(time);
        return { id: c.id, species: c.species, level: c.level, x: c.x, z: c.z, camera: v.camera.position.toArray(), limitation: 'Real existing creature; body overlap and actual rig/sprite depth require image inspection, not inferred from the witch envelope.' };
      }, { fire: before.fire, distance, lateral, time: before.time });
      const directory = path.join(output, `creature-${i}`), hold = await page.evaluate(installCaptureHold);
      try {
        await page.screenshot({ timeout: 120000 });
        const pair = await capturePair(page, expectedSha, directory, 'fire');
        await page.evaluate(time => {
          const v = window.witch.view, state = window.__refractionCaptureHold;
          const batches = [...v.creatureBatches.values(), ...(v.rig?.batches instanceof Map ? v.rig.batches.values() : [])];
          state.maskVisibility = batches.flatMap(b => b.meshes).map(mesh => [mesh, mesh.visible]);
          for (const [mesh] of state.maskVisibility) mesh.visible = false;
          v.post.refractionEnabled = false; v.render(time);
        }, before.time);
        try { await page.screenshot({ path: path.join(directory, 'off-nocreatures.png'), timeout: 120000 }); }
        finally { await page.evaluate(() => { for (const [mesh, visible] of window.__refractionCaptureHold.maskVisibility) mesh.visible = visible; }); }
        const record = { lateral, ...metadata, hold, pair }; creatures.push(record);
        await fs.writeFile(path.join(directory, 'foreground.json'), JSON.stringify(record, null, 2));
      } finally { await page.evaluate(restoreCaptureHold); }
    }
    const result = { expectedSha, ...before, distance, stages, creatures, limitation: 'Staged quad envelopes/depth only; inspect opaque body pixels in OFF/ON/OFF-return diffs. No pixel, foreground, GPU or memory pass is asserted.' };
    await fs.writeFile(path.join(output, 'foreground.json'), JSON.stringify(result, null, 2)); return result;
  } finally {
    await page.evaluate(restoreCaptureHold);
    await page.evaluate(() => {
      const w = window.witch, saved = window.__refractionForeground;
      if (!saved) return;
      w.game.witch = saved.witch; w.game.camera = saved.camera;
      if (saved.creature) {
        for (const key of Object.keys(saved.creature)) if (!Object.hasOwn(saved.creaturePosition, key)) delete saved.creature[key];
        Object.assign(saved.creature, saved.creaturePosition);
      }
      if (saved.creatureOriginals) for (const [creature, original] of saved.creatureOriginals) {
        for (const key of Object.keys(creature)) if (!Object.hasOwn(original, key)) delete creature[key];
        Object.assign(creature, original);
      }
      if (saved.hadIntroFocus) w.game.introFocus = saved.introFocus; else delete w.game.introFocus;
      w.view.post.refractionEnabled = saved.enabled; w.manual = saved.manual; delete window.__refractionForeground;
    });
  }
}
module.exports = { captureForeground };
