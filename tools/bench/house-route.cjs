const PHASES = ["uniforms", "sources", "party", "markers", "grass+lights", "witch", "refresh", "creatures", "hud", "leash", "draw"];
const COLUMNS = ["frame", "section", "start", "wall", "step", "render", "witchStart", "witchEnd", "x", "z", ...PHASES];
function houseRoute(H) {
  const A = ((H.turn || 0) * Math.PI) / 180, room = id => H.rooms.find(r => r.id === id);
  const limb = (a, b) => { const c = H.corridors.find(q => q.id === `${a}-${b}`) || H.corridors.find(q => q.id === `${b}-${a}`); return c.id === `${a}-${b}` ? c.pts : [...c.pts].reverse(); };
  const plan = [[0, 0], ...limb("terrace", "parlour"), ...limb("parlour", "bestiary"), [room("bestiary").x, room("bestiary").z], ...limb("bestiary", "parlour"), ...limb("parlour", "terrace"), ...limb("terrace", "studio"), [room("studio").x, room("studio").z]];
  return plan.map(([u, v]) => [u * Math.cos(A) + v * Math.sin(A), -u * Math.sin(A) + v * Math.cos(A)]);
}
// Self-contained Playwright callback, shared with quick smoke. Profiling changes
// only diagnostic sampling; the controls, step lengths and route are the same.
function walkHouse({ route, profile = false, phases = [] }) {
  const W = window.witch, g = W.game, b = () => g.witches[0].body, t = g.map.treehouse;
  const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
  W.manual = true;
  let f = 0, i = 0, worst = 0, at = null, n = 0, witchStart = NaN, witchEnd = NaN;
  const stride = 10 + phases.length, samples = profile ? new Float64Array(7200 * stride) : null;
  const originalTime = W.view.time;
  if (profile && typeof originalTime !== "function") throw Error("Build lacks the View phase-timing hook");
  if (profile) W.view.time = function (part) {
    const result = originalTime.call(this, part);
    // Use the exact clock reads that View.time already takes, not a second timer.
    if (part === "grass+lights") witchStart = this.lap;
    if (part === "witch") witchEnd = this.lap;
    return result;
  };
  let anchor;
  if (profile) { performance.mark("house-profile-walk-start"); anchor = performance.getEntriesByName("house-profile-walk-start").at(-1).startTime; }
  const advance = (controls, section) => {
    witchStart = witchEnd = NaN;
    const start = profile ? performance.now() : 0, r = W.frame(controls, 1 / 60, false);
    if (samples) {
      const k = n++ * stride;
      samples[k] = f; samples[k + 1] = section; samples[k + 2] = start;
      samples[k + 3] = performance.now() - start; samples[k + 4] = r.step; samples[k + 5] = r.render;
      samples[k + 6] = witchStart; samples[k + 7] = witchEnd; samples[k + 8] = b().x - t.x; samples[k + 9] = b().z - t.z;
      for (let p = 0; p < phases.length; p++) samples[k + 10 + p] = r.ms[phases[p]] ?? NaN;
    }
    return r.ms.witch || 0;
  };
  try {
    for (; f < 60 * 8 && b().seated; f++) advance({ ...idle, moveZ: -1 }, 0);
    for (; i < route.length && f < 60 * 120; f++) {
      const dx = t.x + route[i][0] - b().x, dz = t.z + route[i][1] - b().z, L = Math.hypot(dx, dz);
      if (L < (i === route.length - 1 ? 0.6 : 1.2)) { i++; continue; }
      const ms = advance({ ...idle, moveX: dx / L, moveZ: dz / L }, 1);
      if (ms > worst) { worst = ms; at = [+(b().x - t.x).toFixed(1), +(b().z - t.z).toFixed(1)]; }
    }
    const got = i === route.length;
    g.witches[0].body = { ...b(), x: t.x, z: t.z, vx: 0, vz: 0, perch: true, mode: "ground", lift: 0, seated: false };
    return { got, worst, at, frames: f, anchor, samples: samples ? Array.from(samples.subarray(0, n * stride)) : undefined };
  } finally { if (profile) W.view.time = originalTime; W.manual = false; }
}
module.exports = { PHASES, COLUMNS, houseRoute, walkHouse };
