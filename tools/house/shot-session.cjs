// Shared house-shot protocol. No game changes, no dropped draws, no larger capture timeout.
const { holdSimulation, startingBoundary } = require("../bench/hold-simulation.cjs");
function installClock() {
  const real = performance.now.bind(performance);
  let held = null;
  performance.now = () => held === null ? real() : held;
  window.__houseShotClock = value => { held = value; };
  window.__houseShotRealNow = real;
}
async function install(page) {
  await page.addInitScript(holdSimulation);
  await page.addInitScript(installClock);
}
async function start(page) {
  await page.waitForFunction(() => window.witch?.ready, null, { timeout: 900000, polling: 1000 });
  if (await page.evaluate(() => window.witch.game.clock.paused)) await page.keyboard.press("Enter");
  await page.waitForFunction(() => !window.witch.game.clock.paused && window.witch.view.assets.pending === 0, null, { timeout: 900000, polling: 1000 });
  return page.evaluate(startingBoundary);
}
// Complete every full draw before submitting another. This preserves the 120 rendered frames,
// while making a GPU backlog distinguishable from screenshot/compositor failure.
async function step(page, controls, count, dt = 1 / 60) {
  if (dt > 0) await page.evaluate(() => window.__houseShotClock(null));
  let worstDraw = 0, worstFinish = 0;
  for (let i = 0; i < count; i++) {
    const cost = await page.evaluate(({ controls, dt }) => {
      const w = window.witch, now = window.__houseShotRealNow, begin = now();
      w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...controls }, dt);
      const submitted = now(), gl = w.view.renderer.getContext();
      if (gl.isContextLost()) throw Error("House shot WebGL context lost");
      gl.finish();
      return { draw: submitted - begin, finish: now() - submitted };
    }, { controls, dt });
    worstDraw = Math.max(worstDraw, cost.draw); worstFinish = Math.max(worstFinish, cost.finish);
    if ((i + 1) % 30 === 0) console.log("house-frame", i + 1, JSON.stringify({ worstDraw, worstFinish }));
    // The next frame integrates the same completed art, regardless of worker scheduling.
    await page.evaluate(() => window.witch.view.assets.whenIdle());
  }
  return { frames: count, worstDraw, worstFinish };
}
async function prepareShot(page) {
  await page.evaluate(() => window.witch.view.assets.whenIdle());
  // Same deterministic fade settling protocol as tools/bench/frames.cjs; simulation does not step.
  for (let i = 1; i <= 80; i++) {
    await page.evaluate(t => window.__houseShotClock(t), 1e7 + i * 100);
    await step(page, {}, 1, 0);
  }
  return page.evaluate(() => {
    const w = window.witch, g = w.game, v = w.view;
    document.getAnimations().forEach(a => a.cancel());
    return { time: g.clock.time, herTime: g.herTime, acc: g.acc, x: g.witch.x, z: g.witch.z,
      mode: g.witch.mode, perch: !!g.witch.perch, manual: w.manual, pending: v.assets.pending,
      wallClock: performance.now(), houseVisible: !!v.houseRooms?.floor.visible,
      camera: v.camera.matrixWorld.elements.slice(), projection: v.camera.projectionMatrix.elements.slice(),
      lightTime: w.lightUniforms.uTime.value, lightRealTime: w.lightUniforms.uRealTime.value,
      glLost: v.renderer.getContext().isContextLost(), drawCalls: v.renderer.info.render.calls };
  });
}
async function capture(page, options) {
  const first = await page.screenshot(options), second = await page.screenshot({ ...options, path: undefined });
  if (!first.equals(second)) throw Error("House shot changed between held captures; parity precondition failed");
  return first;
}
module.exports = { installClock, install, start, step, prepareShot, capture };
