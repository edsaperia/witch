// Harness-only renderer contract: finish GPU commands and await tracked async readback promises.
function installCompletion(renderer) {
  const pending = new Set(), originalRead = renderer.readRenderTargetPixelsAsync, originalRender = renderer.render;
  let failure, passes = [];
  if (originalRead) renderer.readRenderTargetPixelsAsync = function (...args) {
    const result = originalRead.apply(this, args), tracked = Promise.resolve(result);
    pending.add(tracked);
    tracked.then(() => pending.delete(tracked), e => { failure = e; pending.delete(tracked); });
    return result;
  };
  renderer.render = function (scene, camera, ...args) {
    const before = { ...this.info.render }, target = this.getRenderTarget?.();
    try { return originalRender.call(this, scene, camera, ...args); }
    finally { passes.push({ pass: passes.length, scene: scene.name || scene.type || 'unnamed',
      target: target ? [target.width, target.height] : null,
      calls: this.info.render.calls - before.calls, triangles: this.info.render.triangles - before.triangles }); }
  };
  return {
    begin() { passes = []; },
    passes() { return passes.map(p => ({ ...p })); },
    async complete() {
      renderer.getContext().finish();
      while (pending.size) await Promise.all([...pending]);
      if (failure) throw failure;
    },
    restore() { renderer.render = originalRender; if (originalRead) renderer.readRenderTargetPixelsAsync = originalRead; }
  };
}
module.exports = { installCompletion };
