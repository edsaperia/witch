// The zoo laid out like the sea chart (rules/zooMap.ts), shot from the built game: on foot by an island's gold fence, at a legend
// asleep in its circle at an island's middle, by an undiscovered island's lake (its sigil faint on the water), at the edge where the
// water pours off into space, on the Ent's plaza, and from the treetops over the streets. Each waits for its art (the view's trees,
// the art queue empty) or WAIT seconds. Fails on a page error.
//   npm run build && node tools/zoo/shots.cjs [out] [dist]   WAIT (s, 120), SIZE (1280x720), ONLY (names: fence,legend,exit,leave-tree,leave-edge,...)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outArg = "previews/zoo/shots", distArg] = process.argv.slice(2);
const out = path.resolve(outArg), root = path.resolve(distArg || path.join(__dirname, "../../dist"));
const [W, H] = (process.env.SIZE || "1280x720").split("x").map(Number), WAIT = Number(process.env.WAIT || 120), ONLY = process.env.ONLY ? process.env.ONLY.split(",") : null;
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  const load = async query => {
    const page = await browser.newPage({ viewport: { width: W, height: H } });
    page.on("pageerror", e => errors.push(`${query}: ${e.message}`));
    await page.goto(`http://127.0.0.1:${server.address().port}/?${query}&creator=0`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 1800000, polling: 500 });
    await page.keyboard.press("Enter");
    return page;
  };
  const shoot = async (page, name, where) => {
    if (ONLY && !ONLY.includes(name)) return;
    await page.evaluate(([x, z, mode]) => { const g = window.witch.game, Wb = g.witches[0]; Wb.body = { ...Wb.body, x, z, vx: 0, vz: 0, seated: false, perch: false, mode, lift: mode === "ground" ? 0 : 1 }; }, where);
    const tb = Date.now();
    await page.waitForTimeout(8000);
    while ((Date.now() - tb) / 1000 < WAIT) { const s = await page.evaluate(() => ({ q: window.witch.view.assets.queue.length, busy: window.witch.view.assets.workers.some(w => w.busy) })); if (!s.q && !s.busy) break; await page.waitForTimeout(4000); }
    await page.waitForTimeout(2000);
    await page.evaluate(() => { for (const id of ["start", "zoo-bar"]) { const e = document.getElementById(id); if (e) e.style.display = "none"; } document.querySelectorAll(".zoo-bar,#zoo-jump").forEach(e => e.style.display = "none"); });
    await page.screenshot({ path: path.join(out, `${name}.png`) });
    log(name, "done");
  };
  try {
    // (every island found: ?all)
    const p = await load("zoo&all");
    const L = await p.evaluate(() => { const Z = window.witch.game.map.zoo.layout, I = Z.islands.find(J => J.kind === "wolf") ?? Z.islands[0], at = a => { const n = I.reach.length, t = ((a + Math.PI) / (Math.PI * 2)) * n, i = Math.floor(t), f = t - i; return I.reach[((i % n) + n) % n] * (1 - f) + I.reach[(((i + 1) % n) + n) % n] * f; }; return { I: { x: I.x, z: I.z, south: at(Math.PI / 2), kind: I.kind }, home: Z.home, reach: Z.reach }; });
    log("island", JSON.stringify(L.I));
    await shoot(p, "fence", [L.I.x + 10, L.I.z + L.I.south + 7, "ground"]); // (on the street by its south shore, the fence before her)
    await shoot(p, "words", [L.I.x + 4, L.I.z + L.I.south + 34, "ground"]); // (on the street just south of its fence, its inscription before her)
    await shoot(p, "fly-over", [L.I.x + 10, L.I.z + L.I.south, "treetop"]); // (in the treetops right over its fence)
    await shoot(p, "legend", [L.I.x, L.I.z + 34, "ground"]); // (south of its circle at the middle, its legend asleep in it)
    await shoot(p, "plaza", [L.home.x, L.home.z + 18, "ground"]); // (in the Ent's circle at the middle, its World Tree carving)
    await shoot(p, "plaza-above", [L.home.x, L.home.z + 40, "treetop"]);
    // (its little treehouse, the way out, just north of the circle: from a way off, then at it with its "exit" prompt)
    await shoot(p, "exit-far", [L.home.x + 3, L.home.z - 60 + 10, "ground"]);
    await shoot(p, "exit", [L.home.x + 1.5, L.home.z - 67 + 3, "ground"]);
    await shoot(p, "above", [L.I.x, L.I.z + L.I.south + 40, "treetop"]);
    await shoot(p, "edge", [L.home.x, L.home.z - (L.reach + 120 + 4), "ground"]); // (on the water's band by the north edge, the lip and the fall ahead)
    await shoot(p, "edge-above", [L.home.x, L.home.z - (L.reach + 120 - 10), "treetop"]);
    await p.close();
    // (a fresh save: the islands she hasn't found, lakes)
    const q = await load("zoo&found=");
    const K = await q.evaluate(() => { const Z = window.witch.game.map.zoo.layout, w = window.witch.game.witch; const I = Z.islands.filter(J => !J.found).sort((a, b) => Math.hypot(a.x - Z.home.x, a.z - Z.home.z) - Math.hypot(b.x - Z.home.x, b.z - Z.home.z))[0]; return { x: I.x, z: I.z, most: I.most, kind: I.kind }; });
    log("lake", JSON.stringify(K));
    await shoot(q, "lake", [K.x, K.z + K.most + 18, "ground"]);
    await shoot(q, "lake-words", [K.x + 3, K.z + K.most + 14, "ground"]);
    await shoot(q, "lake-above", [K.x, K.z + K.most + 30, "treetop"]);
    await q.close();
    // (the way out: E at the little treehouse, then flying on out past the edge; a ?zoo link with no night under it goes to the
    // game's ordinary start, the same page without ?zoo)
    for (const [name, how] of [["leave-tree", "tree"], ["leave-edge", "edge"]]) {
      if (ONLY && !ONLY.includes(name)) continue;
      const r = await load("zoo&seed=7");
      await r.waitForTimeout(4000);
      const H = await r.evaluate(() => window.witch.game.map.zoo.layout.home), R = await r.evaluate(() => window.witch.game.map.zoo.layout.reach);
      if (how === "tree") { await r.evaluate(([x, z]) => { const Wb = window.witch.game.witches[0]; Wb.body = { ...Wb.body, x, z, vx: 0, vz: 0, seated: false, mode: "ground", lift: 0 }; }, [H.x, H.z - 67 + 2]); await r.waitForTimeout(1500); await r.keyboard.press("KeyE"); }
      else { await r.evaluate(([x, z]) => { const Wb = window.witch.game.witches[0]; Wb.body = { ...Wb.body, x, z, vx: 0, vz: 0, seated: false, mode: "ground", lift: 0 }; }, [H.x, H.z - (R + 120 - 12)]); await r.keyboard.down("KeyW"); }
      await r.waitForTimeout(how === "tree" ? 300 : 3000);
      await r.screenshot({ path: path.join(out, `${name}-fade.png`) });
      await r.waitForURL(u => !/[?&]zoo\b/.test(String(u)), { timeout: 30000 }).catch(() => {});
      const url = r.url(); log(name, "→", url);
      if (/[?&]zoo\b/.test(url)) errors.push(`${name}: still in the zoo (${url})`);
      await r.close();
    }
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error("page errors:\n" + errors.join("\n")); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
