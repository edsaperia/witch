// Playwright init script: intercept the existing hook synchronously, before the first RAF.
// Polling for ready (or even polling for witch) leaves an uncontrolled simulation window.
function holdSimulation() {
  let hook;
  Object.defineProperty(window, "witch", {
    configurable: true,
    enumerable: true,
    get() { return hook; },
    set(value) {
      value.manual = true;
      if (value.manual !== true) throw Error("Benchmark cannot hold this build's simulation");
      hook = value;
    },
  });
}
// Run inside the page after the explicit start gesture and all requested art has landed.
function startingBoundary({ paused = false } = {}) {
  const w = window.witch, g = w.game;
  if (!w.manual || !w.ready || w.view.assets.pending !== 0 || g.clock.paused !== paused || g.clock.time !== 0 || g.herTime !== 0 || g.acc !== 0)
    throw Error("Benchmark did not reach the held, ready, art-idle zero-step boundary");
  return { time: g.clock.time, herTime: g.herTime, acc: g.acc, alpha: g.alpha,
    x: g.witch.x, z: g.witch.z, mode: g.witch.mode, seated: !!g.witch.seated, wave: g.party.wave,
    islandReady: g.islandReady ?? false, paused: g.clock.paused, artPending: w.view.assets.pending, manual: w.manual, ready: w.ready };
}
module.exports = { holdSimulation, startingBoundary };
