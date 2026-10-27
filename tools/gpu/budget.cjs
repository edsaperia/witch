// The GPU memory budget measured (the coordinator's ask, Ed-approved 2026-10-26; render/gpuLedger.ts, render/view/gpuBudget.ts):
// the built game (DIST, default dist/) in headless Chromium, flown a fixed 1/60 s at a time (drawn every DRAW-th frame, so art
// uploads as it would), the ledger read every 5 s of game time: MB in all and by kind, the budget, the sets let go. Scenes (ONLY):
//   night   a night (SEED) from its decks: a loop out over the island in the treetops and back on foot;
//   sail    then a sail in place to ISLAND (window.witch.sail) and the same loop there;
//   zoo     the full zoo (?zoo&all): out to its farthest islands each way and back, in the treetops;
//   tight   the night again under a small budget (TIGHT MB: gpu.mb, gpu.floor), so the budget lets art go on an ordinary night.
// Each scene also tracks pops (view.trackPops: anything appearing or vanishing in clear view; the cloud's 1-2 s software frames
// pop for their own reason, #311, so compare with a run without the budget) and every set let go with how long it had gone unused
// (none under the tuning's gpu.keep: nothing let go was in use). Writes <out>/budget.json and a frame from each scene. Fails on a
// page error.
//   npm run build && node tools/gpu/budget.cjs [out dir]   DIST=dist SEED=123 ISLAND=fox ONLY=night,sail,zoo,tight SECS=120 DRAW=4 TIGHT=220
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const out = path.resolve(process.argv[2] || "previews/gpu-budget");
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const SEED = process.env.SEED || "123", ISLAND = process.env.ISLAND || "fox", SECS = Number(process.env.SECS || 120), DRAW = Number(process.env.DRAW || 4), TIGHT = Number(process.env.TIGHT || 220);
const ONLY = (process.env.ONLY || "night,sail,zoo,tight").split(",");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

// (in the page: the ledger now, MB)
const LEDGER = () => {
  const v = window.witch.view, r = v.ledger.report(v.renderer), mb = b => Math.round(b / 1048576);
  return { mb: mb(r.total), budget: Math.round(v.gpu.budgetMB), kinds: Object.fromEntries(Object.entries(r.byKind).map(([k, b]) => [k, mb(b)]).filter(([, b]) => b)), textures: r.textures, evicted: v.gpu.evicted, ooms: v.gpu.ooms, sets: v.assets.sets() };
};
// (in the page: a flight through points, a fixed frame at a time, drawn every `draw`-th, the ledger sampled every 5 s)
const ROUTE = async ([pts, mode, secs, draw]) => {
  const Wt = window.witch, g = Wt.game, wb = () => g.witches[0].body, v = Wt.view;
  const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
  g.witches[0].body = { ...wb(), x: pts[0][0], z: pts[0][1], vx: 0, vz: 0, seated: false, perch: undefined, mode, lift: mode === "ground" ? 0 : 1 };
  Wt.manual = true; g.clock.paused = false;
  v.pops = []; v.trackPops = true;
  const ch = new MessageChannel(), yieldTask = () => new Promise(r => { ch.port1.onmessage = () => r(); ch.port2.postMessage(0); });
  const samples = [], mb = b => Math.round(b / 1048576);
  let i = 1, stuck = 0, lastD = Infinity, peak = 0;
  for (let f = 0; f < secs * 60 && i < pts.length; f++) {
    const b = wb(), dx = pts[i][0] - b.x, dz = pts[i][1] - b.z, L = Math.hypot(dx, dz);
    if (L < 4) { i++; stuck = 0; lastD = Infinity; continue; }
    if (L > lastD - 0.01) { if (++stuck > 120) { i++; stuck = 0; lastD = Infinity; continue; } } else stuck = 0;
    lastD = L;
    Wt.frame({ ...idle, moveX: dx / L, moveZ: dz / L }, 1 / 60, f % draw === 0);
    g.zooExit = undefined; g.zooPush = 0;
    peak = Math.max(peak, v.ledger.total);
    if (f % 300 === 0) { const r = v.ledger.report(v.renderer); samples.push({ t: Math.round(f / 60), x: Math.round(b.x), z: Math.round(b.z), mb: mb(r.total), budget: Math.round(v.gpu.budgetMB), trees: mb(r.byKind.trees || 0), creatures: mb(r.byKind.creatures || 0), evicted: v.gpu.evicted }); }
    await yieldTask();
  }
  v.trackPops = false; Wt.manual = false;
  return { samples, peakMB: mb(peak), pops: v.pops.length, popsSeen: v.pops.slice(0, 12), let: v.gpu.log.slice(-40), keep: g.tuning.gpu.keep };
};
// (in the page: a loop round home, out to `reach` m each way)
const LOOP = reach => { const g = window.witch.game, f = g.map.dancefloor || { x: g.witch.x, z: g.witch.z }, pts = [[f.x, f.z + 30]]; for (let k = 0; k <= 8; k++) { const a = (k / 8) * Math.PI * 2; pts.push([f.x + Math.cos(a) * reach, f.z + Math.sin(a) * reach]); } pts.push([f.x, f.z + 30]); return pts; };

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], report = { seed: SEED, island: ISLAND, secs: SECS, draw: DRAW };
  const ready = page => page.waitForFunction(() => window.witch && window.witch.ready && window.witch.view.assets.pending === 0, null, { timeout: 2400000, polling: 1000 });
  const open = async (name, query) => {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(`${name}: ${e.message}`));
    await page.goto(`http://127.0.0.1:${server.address().port}/${query}`);
    await ready(page);
    await page.evaluate(() => { const g = window.witch.game; g.clock.paused = false; window.witch.manual = true; g.witches[0].kit = { invites: true, broom: true }; if (g.party.spellAt === null) g.party.spellAt = -100; });
    return page;
  };
  const shot = (page, name) => page.screenshot({ path: path.join(out, `${name}.png`), timeout: 300000 });
  const run = async (page, name, pts, mode) => {
    const at = await page.evaluate(`(${LEDGER})()`);
    log(name, "at the start", JSON.stringify(at));
    const r = await page.evaluate(`(${ROUTE})(${JSON.stringify([pts, mode, SECS, DRAW])})`);
    r.start = at; r.end = await page.evaluate(`(${LEDGER})()`);
    r.letInUse = r.let.filter(e => e.idle < r.keep).length; // (sets let go that were used under gpu.keep s before: should be none)
    log(name, "after", JSON.stringify(r.end), `peak ${r.peakMB} MB, pops ${r.pops}, let go ${r.end.evicted} (in use: ${r.letInUse})`);
    await shot(page, name);
    return r;
  };
  try {
    const night = `?seed=${SEED}&creator=0&wave=off&opening=old`;
    if (ONLY.includes("night") || ONLY.includes("sail")) {
      const page = await open("night", night);
      report.night = await run(page, "night", await page.evaluate(`(${LOOP})(900)`), "treetop");
      if (ONLY.includes("sail")) {
        const inPlace = await page.evaluate(({ seed, island }) => window.witch.sail(island, Number(seed), { end: null }), { seed: 165272, island: ISLAND });
        if (!inPlace) throw new Error("the sail wasn't in place");
        await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 600000 });
        await ready(page);
        await page.evaluate(() => { const p = window.witch.game.party; if (p.spellAt === null) p.spellAt = -100; });
        report.sail = await run(page, "sail", await page.evaluate(`(${LOOP})(900)`), "treetop");
      }
      await page.close();
    }
    if (ONLY.includes("zoo")) {
      const page = await open("zoo", "?zoo&all&creator=0");
      const pts = await page.evaluate(() => {
        const L = window.witch.game.map.zoo.layout, h = L.home, I = [...L.islands];
        const far = [0, 1, 2, 3].map(q => I.reduce((m, a) => { const ang = Math.atan2(a.z - h.z, a.x - h.x), want = (q * Math.PI) / 2 - Math.PI; const da = Math.abs(Math.atan2(Math.sin(ang - want), Math.cos(ang - want))); const s = Math.hypot(a.x - h.x, a.z - h.z) * Math.cos(da); return s > m.s ? { s, a } : m; }, { s: -1, a: I[0] }).a);
        const fly = [[h.x, h.z]]; for (const a of far) fly.push([a.x, a.z], [h.x, h.z]);
        return fly;
      });
      report.zoo = await run(page, "zoo", pts, "treetop");
      await page.close();
    }
    if (ONLY.includes("tight")) {
      const page = await open("tight", `${night}&set=gpu.mb=${TIGHT};gpu.floor=${TIGHT};gpu.ceil=${TIGHT}`);
      report.tight = await run(page, "tight", await page.evaluate(`(${LOOP})(900)`), "treetop");
      await page.close();
    }
  } finally { await browser.close(); server.close(); }
  fs.writeFileSync(path.join(out, "budget.json"), JSON.stringify(report, null, 1));
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  log("ok");
})().catch(e => { console.error(e); process.exit(1); });
