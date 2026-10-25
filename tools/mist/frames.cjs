// The loading mist in the built game (Ed, 2026-10-24; render/loadingMist.ts), and the order the island's area types load in.
//   npm run build && node tools/mist/frames.cjs [out] [dist]
// Frames (the default): a plain first load (the bedroom opening, so the art workers all draw till the party spell), the bedroom's
// gate off (?mistgate=0) and each type's trees held back to land one every ARTDELAY seconds (?artdelay=), her put over the
// treetops south of the treehouse (window.witch.shot), the frames stepped one at a time while pictures are saved: the mist over
// the undrawn areas and its rolling back out from the treehouse as each type lands. The mist's front runs on the page's clock, a
// frame counting at most 0.1 s, so on the cloud's slow renderer each stepped frame is a tenth of a second of it.
// ORDER=1: the loading order alone, nothing held back or moved: a plain first load watched in real time till every area type the
// island has is in (or TIMEOUT s), then each type by its nearest area to the treehouse, when it landed, whether from the art cache
// (an older build's too: the order comes from the view's art timings) and, where the build logs them, when and how it was asked.
// SIZE (960x540), ARTDELAY (s, 20), FRAMES (frames to step, 300), EVERY (a picture every N frames, 20), SPOT
// ("treetop": over the treetops 160 m south of the treehouse, clear of its rooms; "x,z[,treetop]"; or any shot scene, e.g.
// "object:recordShelf" on the Terrace), MIST (1; 0: ?loadmist=0, to time the frames
// without it), TIMEOUT (s, 3600), EXTRA (more of the link). Writes <out>/frame-NNN.png and <out>/order.json.
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outArg = "previews/mist", distArg] = process.argv.slice(2);
const out = path.resolve(outArg), root = path.resolve(distArg || path.join(__dirname, "../../dist"));
const [W, H] = (process.env.SIZE || "960x540").split("x").map(Number), DELAY = Number(process.env.ARTDELAY ?? 20), FRAMES = Number(process.env.FRAMES || 300), EVERY = Number(process.env.EVERY || 20);
const SPOT = process.env.SPOT || "treetop", MIST = process.env.MIST ?? "1", ORDER = process.env.ORDER === "1", TIMEOUT = Number(process.env.TIMEOUT || 3600) * 1000;
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

// Each type by its nearest area to the treehouse, and when its set landed (the view's art timings, ms from the page's start).
const state = page => page.evaluate(() => {
  const v = window.witch.view, g = window.witch.game, m = g.map, h = m.treehouse, A = v.assets, M = v.loadingMist;
  const near = new Map();
  for (let y = m.first; y < m.first + m.n; y++) for (let x = m.first; x < m.first + m.n; x++) {
    if (x === m.centreCell[0] && y === m.centreCell[1]) continue;
    const s = m.siteOf(x, y), t = m.typeOf(x, y), d = Math.hypot(s.x - h.x, s.z - h.z);
    if (!(near.get(t) <= d)) near.set(t, d);
  }
  const landedAt = new Map();
  for (const q of A.timings) { const k = /^type:(\d+)$/.exec(q.set); if (k && !landedAt.has(+k[1])) landedAt.set(+k[1], { at: q.at, cached: q.cached, ms: q.ms }); }
  const rows = [...near].sort((a, b) => a[1] - b[1]).map(([t, d]) => {
    const L = A.typeLog?.get(t), T = landedAt.get(t);
    return { type: t, id: window.witch.areaTypeId(t), near: Math.round(d), asked: L ? Math.round(L.asked) : null, urgent: L ? L.urgent : null, landed: T ? Math.round(T.at) : null, cached: T ? T.cached : null, drawMs: T ? Math.round(T.ms) : null, front: M ? Math.round(Math.min(99999, Math.max(-99999, M.frontOf(t)))) : null };
  });
  return { rows, mist: !!M && !M.done, drawn: v.islandDrawn() };
});

function report(rows, file, extra = {}) {
  console.log("\nArea types by their nearest area to the treehouse (ms from the page's start):");
  console.table(rows.map(r => ({ type: r.id, "near (m)": r.near, asked: r.asked, urgent: r.urgent, landed: r.landed, cached: r.cached, "drawn in (ms)": r.drawMs })));
  const byLanding = rows.filter(r => r.landed !== null).sort((a, b) => a.landed - b.landed);
  console.log("landing order:", byLanding.map(r => `${r.id} (${r.near} m)`).join(", "));
  const rank = byLanding.map(r => rows.indexOf(r));
  let inversions = 0; for (let i = 0; i < rank.length; i++) for (let j = i + 1; j < rank.length; j++) if (rank[i] > rank[j]) inversions++;
  console.log(`out of nearest-first order: ${inversions} of ${(rank.length * (rank.length - 1)) / 2} pairs`);
  fs.writeFileSync(file, JSON.stringify({ ...extra, rows, byLanding: byLanding.map(r => r.id), inversions }, null, 1));
}

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  let code = 0;
  try {
    const page = await browser.newPage({ viewport: { width: W, height: H } });
    page.on("pageerror", e => errors.push(e.message));
    // (no ?seed=: a link naming its night skips the bedroom opening, app/opening.ts; the night's seed is the page's own)
    const q = [ORDER ? "" : `mistgate=0&loadmist=${MIST}${DELAY > 0 ? `&artdelay=${DELAY}` : ""}`, process.env.EXTRA ?? ""].filter(Boolean).join("&");
    const link = `http://127.0.0.1:${server.address().port}/${q ? "?" + q : ""}`;
    log("loading", link.replace(/^http:\/\/[^/]+/, ""));
    await page.goto(link);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: TIMEOUT, polling: 500 });
    log("ready");
    if (ORDER) {
      let s = await state(page);
      while (s.rows.some(r => r.landed === null) && Date.now() - t0 < TIMEOUT) {
        await page.waitForTimeout(10000);
        s = await state(page);
        log(`${s.rows.filter(r => r.landed !== null).length} of ${s.rows.length} types in`);
      }
      report(s.rows, path.join(out, "order.json"), { link: link.replace(/^http:\/\/[^/]+/, "") });
    } else {
      await page.evaluate(() => { window.witch.manual = true; });
      // (out of her bed and room: the wake-up over, its card and dark gone, as once she's walked out with the gate off)
      const scene = await page.evaluate(spot => { const g = window.witch.game, h = g.map.treehouse; g.wake = undefined; for (const id of ["wake-veil", "wake-card"]) document.getElementById(id)?.remove(); /* (the wake card and its dark: the page loop hides them, not the stepped frames) */ return window.witch.shot(spot === "treetop" ? `at:${h.x},${h.z + 160},treetop` : spot.includes(":") ? spot : `at:${spot}`); }, SPOT);
      log("scene:", scene.say);
      const frames = [];
      let s = await state(page);
      const shoot = async i => { await page.screenshot({ path: path.join(out, `frame-${String(i).padStart(3, "0")}.png`) }); log(`frame ${i}`, JSON.stringify({ mist: s.mist, landed: s.rows.filter(q => q.landed !== null).map(q => q.id), fronts: s.rows.map(q => q.front) })); };
      await shoot(0);
      for (let i = 1; i <= FRAMES; i++) {
        const r = await page.evaluate(() => window.witch.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 10, true));
        frames.push({ i, render: +r.render.toFixed(2), mist: s.mist });
        if (i % EVERY === 0 || i === FRAMES) { s = await state(page); await shoot(i); }
      }
      const on = frames.filter(f => f.mist).map(f => f.render), off = frames.filter(f => !f.mist).map(f => f.render);
      const med = a => a.length ? +[...a].sort((x, y) => x - y)[Math.floor(a.length / 2)].toFixed(1) : null;
      console.log(`frames' own work (rules and view): with the mist showing ${on.length} frames, median ${med(on)} ms; with it gone ${off.length}, median ${med(off)} ms`);
      report(s.rows, path.join(out, "order.json"), { link: link.replace(/^http:\/\/[^/]+/, ""), frames });
    }
  } catch (e) { console.error(e); code = 1; } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error("page errors:\n" + errors.join("\n")); code = 1; }
  process.exit(code);
})();
