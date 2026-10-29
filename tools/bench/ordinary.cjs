// The free-running ordinary-play route for stalls.cjs (ROUTE=1): ground, treetops, house,
// party, a wave landing and the existing fight arena. No sail/chart/arrival; one browser, the game's real loop and audio.
// SECONDS is the requested total dwell time (mode transitions add time). Teleports between
// scenes are included, not hidden by settling or waiting for all background art to finish.
const fs = require("fs");
const path = require("path");
const { pageKey } = require("./comparable.cjs");
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function ordinary(page, seconds, out) {
  const { loadHouse } = await import("../../config/house/load.mjs");
  const H = loadHouse(), turn = (H.turn ?? 0) * Math.PI / 180;
  const rooms = ["terrace", "parlour", "bestiary", "studio"].map(id => H.rooms.find(r => r.id === id));
  const keys = {}, dwell = seconds * 1000 / 7;
  let previous = null;
  await page.evaluate(() => {
    const v = window.witch.view, render = v.render;
    window.__ordinary = { label: "ground", rows: [], render, forest: [], methods: {} };
    const forest = window.witch.game.forest;
    for (const name of ["treesNear", "bushesNear", "bedsNear", "wallsNear", "setPiecesNear", "rimNear", "decorNear", "relicsNear", "lightsNear"]) {
      const original = forest[name];
      window.__ordinary.methods[name] = original;
      forest[name] = function (...args) {
        const start = performance.now(), result = original.apply(this, args), ms = performance.now() - start;
        if (ms > 5) window.__ordinary.forest.push({ name, ms });
        return result;
      };
    }
    v.render = function (...args) {
      window.__ordinary.forest = [];
      const result = render.apply(this, args), p = window.__ordinary, g = window.witch.game;
      p.rows.push({ label: p.label, at: performance.now(), ms: { ...this.ms }, forest: p.forest, mode: g.witch.perch ? "house" : g.witch.mode, wave: g.party.wave, x: g.witch.x, z: g.witch.z });
      return result;
    };
    const w = window.witch.game.witch;
    w.perch = false; w.mode = "ground"; w.lift = 0;
  });
  const label = async name => {
    if (previous) keys[previous] = await pageKey(page, { spot: `ordinary route: ${previous}` });
    await page.evaluate(name => { window.__ordinary.label = name; }, name);
    keys[name] = null; previous = name;
  };
  const hold = async (key, ms) => { await page.keyboard.down(key); try { await wait(ms); } finally { await page.keyboard.up(key); } };
  try {
    await label("ground");
    await wait(dwell);
    await label("ground-moving"); await hold("ArrowDown", dwell);
    await label("treetops");
    await page.keyboard.press("Space");
    await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 30000 });
    await hold("ArrowRight", dwell);
    await label("house");
    for (const room of rooms) {
      const x = room.x * Math.cos(turn) + room.z * Math.sin(turn), z = -room.x * Math.sin(turn) + room.z * Math.cos(turn);
      await page.evaluate(({ x, z }) => {
        const g = window.witch.game, t = g.map.treehouse, W = g.witches[0];
        W.body = { ...W.body, x: t.x + x, z: t.z + z, vx: 0, vz: 0, perch: true, mode: "ground", lift: 0, seated: false };
      }, { x, z });
      await hold("ArrowRight", dwell / rooms.length);
    }
    await label("party");
    await page.evaluate(() => {
      const g = window.witch.game, d = g.map.dancefloor, W = g.witches[0];
      if (!d) throw new Error("ordinary route needs the home dancefloor");
      W.body = { ...W.body, x: d.x + 15, z: d.z + 15, vx: 0, vz: 0, perch: false, mode: "ground", lift: 0, seated: false };
    });
    await hold("ArrowLeft", dwell);
    await label("wave"); await page.keyboard.press("KeyN"); await hold("ArrowRight", dwell);
    await label("fight");
    await page.evaluate(() => window.witch.arena("wolf*3@2,boar*2@1"));
    await hold("ArrowLeft", dwell);
    keys[previous] = await pageKey(page, { spot: `ordinary route: ${previous}` });
  } finally {
    await page.evaluate(() => {
      window.witch.view.render = window.__ordinary.render;
      Object.assign(window.witch.game.forest, window.__ordinary.methods);
    });
  }
  const rows = await page.evaluate(() => window.__ordinary.rows);
  const limit = Number(process.env.REFRESH_MS ?? 50), segments = {};
  for (const name of Object.keys(keys)) {
    const rr = rows.filter(r => r.label === name), refresh = rr.map(r => r.ms.refresh ?? 0);
    segments[name] = { key: keys[name], frames: rr.length, modes: [...new Set(rr.map(r => r.mode))], waves: [...new Set(rr.map(r => r.wave))], worstRefresh: Math.max(0, ...refresh), overBudget: refresh.filter(ms => ms > limit).length };
  }
  const result = { limit, segments, rows };
  fs.writeFileSync(path.join(out, "ordinary.json"), JSON.stringify(result));
  console.log("ordinary route:", JSON.stringify(Object.fromEntries(Object.entries(segments).map(([name, s]) => [name, { ...s, key: undefined }]))));
  // Retain all evidence before failing. This is a scheduler CPU budget, not a GPU/frame-rate promise.
  if (Object.values(segments).some(s => !s.frames || s.overBudget)) process.exitCode = 1;
  if (!segments.treetops.modes.includes("treetop") || !segments.house.modes.includes("house")) process.exitCode = 1;
  return result;
}
module.exports = { ordinary };
