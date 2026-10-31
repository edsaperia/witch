// Capture-only hold of an already prepared ordinary scene: redraw Post without running View's stateful update again.
// Installed/restored in-page by foreground.cjs; no production rendering behavior or clocks are changed.
function installCaptureHold(root = window) {
  if (root.__refractionCaptureHold) throw Error('Capture hold already installed');
  const w = root.witch, v = w.view;
  if (v.fly || v.telescope || w.game.cauldron || v.cauldronLook) throw Error('Require ordinary world Post for capture hold');
  const descriptor = Object.getOwnPropertyDescriptor(v, 'render');
  const time = w.game.clock.time, camera = v.camera.matrixWorld.toArray();
  const state = { view: v, descriptor, time, calls: 0, camera };
  root.__refractionCaptureHold = state;
  v.render = function (at, draw = true) {
    if (at !== time || w.game.clock.time !== time) throw Error('Capture hold cannot advance time');
    if (!draw) return;
    // Post reads refractionEnabled each draw; form positions/depths and all other scene state remain as prepared.
    v.magic.hideBackdrop(v.scene);
    try { v.post.render(v.scene, v.camera); state.calls++; }
    finally { v.magic.restoreBackdrop(v.scene); }
  };
  return { time, camera, mode: 'prepared-scene Post redraw; View update bypassed' };
}
function restoreCaptureHold(root = window) {
  const state = root.__refractionCaptureHold;
  if (!state) return;
  if (state.maskVisibility) for (const [mesh, visible] of state.maskVisibility) mesh.visible = visible;
  if (state.descriptor) Object.defineProperty(state.view, 'render', state.descriptor);
  else delete state.view.render;
  delete root.__refractionCaptureHold;
}

/** Consecutive full-render diagnostics: report changed buffers/uniforms, not a guessed visual cause. */
function probeRenderDrift(root = window) {
  const w = root.witch, v = w.view, time = w.game.clock.time;
  const hash = a => { let h = 2166136261; for (const x of a) { const s = String(x); for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); } return h >>> 0; };
  const snapshot = () => {
    const out = { camLift: v.camLift, canopyNow: v.canopyNow, mistClock: v.mistClock, camera: v.camera.matrixWorld.toArray() };
    v.scene.traverse(o => {
      if (!o.visible) return;
      const key = `${o.name || o.type}:${o.id}`;
      if (o.geometry) for (const [name, a] of Object.entries(o.geometry.attributes)) {
        const array = a.array || a.data?.array;
        if (array) out[`${key}/attribute/${name}`] = hash(array);
      }
      if (o.instanceMatrix?.array) out[`${key}/instanceMatrix`] = hash(o.instanceMatrix.array);
      for (const m of Array.isArray(o.material) ? o.material : o.material ? [o.material] : []) {
        for (const [name, uniform] of Object.entries(m.uniforms || {})) {
          const value = uniform.value;
          if (typeof value === 'number' || typeof value === 'boolean') out[`${key}/uniform/${name}`] = value;
          else if (value?.toArray) out[`${key}/uniform/${name}`] = value.toArray();
          else if (Array.isArray(value) && value.every(x => typeof x === 'number' || x?.toArray)) out[`${key}/uniform/${name}`] = value.map(x => x?.toArray ? x.toArray() : x);
        }
      }
    });
    return out;
  };
  const before = snapshot(); v.render(time); const after = snapshot();
  const changes = Object.keys(after).filter(k => JSON.stringify(before[k]) !== JSON.stringify(after[k])).map(key => ({ key, before: before[key], after: after[key] }));
  return { time, changes, limitation: 'CPU state/resource changes only; pixel attribution requires canonical renders. No production fix inferred.' };
}
module.exports = { installCaptureHold, restoreCaptureHold, probeRenderDrift };
