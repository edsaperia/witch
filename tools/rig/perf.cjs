// The live rig's cost (#79 stage 5): COUNT wild creatures (default 300, half wolves and half snakes,
// roaming round the witch), stepped frame by frame at a fixed 1/60 s for FRAMES frames (default 300)
// with the rig off and then on (?rig=1), timing the view's own work for the creatures (view.ms) and
// the whole frame's JS (rules and view; not the software renderer's drawing here). Prints a table.
// Run `npm run build` first.
const http = require("http"), fs = require("fs"), path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(__dirname, "../../dist"), COUNT = +(process.env.COUNT || 300), FRAMES = +(process.env.FRAMES || 300);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png" };
function serve() {
  const server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
    const file = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
    if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise(r => server.listen(0, "127.0.0.1", () => r(server)));
}
const pct = (a, p) => { const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(s.length * p))]; };
(async () => {
  const server = await serve(), port = server.address().port, rows = [];
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  for (const rig of ["0", "1"]) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } }), errors = [];
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${port}/?seed=123&spell=auto&debug&rig=${rig}&arena=${encodeURIComponent("boar*1,wolf*12@1")}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 30000 });
    // the crowd: clones of the arena's wild wolves, half turned to snakes, scattered round her and set roaming
    await page.evaluate(n => {
      const g = window.witch.game, w = g.witch, wild = g.creatures.filter(c => !c.gone && !c.leashed && c.species === "wolf");
      for (let i = 0; i < n; i++) {
        const src = wild[i % wild.length], a = (i * 2.399) % (Math.PI * 2), r = 4 + (i % 25) * 1.1;
        const c = { ...src, id: g.creatures.length, species: i % 2 ? "snake" : "wolf", x: w.x + Math.cos(a) * r, z: w.z + Math.sin(a) * r * 0.6, rest: 0, fight: undefined, charge: undefined };
        c.tx = c.x + Math.cos(a + 1.5) * 6; c.tz = c.z + Math.sin(a + 1.5) * 6; c.homeX = c.x; c.homeZ = c.z; c.anchorX = c.x; c.anchorZ = c.z;
        g.creatures.push(c); (window.__crowd ??= []).push({ c, dx: c.x - w.x, dz: c.z - w.z });
      }
      for (const c of wild) c.gone = true;
    }, COUNT);
    // let the parts and sprites arrive (the rig's come from the art workers)
    await page.waitForFunction(r => r === "0" || (window.witch.view.rig && window.witch.view.rig.stats.creatures >= window.witch.view.stats.creatures * 0.95), rig, { timeout: 600000, polling: 1000 }).catch(() => {});
    await page.waitForTimeout(3000);
    // (they wandered while the parts baked: put them back round her, just before the timing)
    await page.evaluate(() => { const g = window.witch.game; for (const { c, dx, dz } of window.__crowd) { c.gone = false; c.x = g.witch.x + dx; c.z = g.witch.z + dz; c.tx = c.x + dz * 0.3; c.tz = c.z - dx * 0.3; c.rest = 0; } });
    const r = await page.evaluate(async frames => {
      const w = window.witch, idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, dt = 1 / 60, out = { view: [], creatures: [], step: [], rigMs: [], drawn: 0, rigged: 0, instances: 0 };
      w.manual = true;
      for (let i = 0; i < frames; i++) {
        const f = w.frame(idle, dt, true);
        out.view.push(f.render); out.creatures.push(f.ms.creatures ?? 0); out.step.push(f.step); out.rigMs.push(w.view.rig ? w.view.rig.stats.ms : 0);
        if (i % 30 === 0) await new Promise(res => setTimeout(res, 0));
      }
      const g = w.game, near = g.creatures.filter(c => !c.gone && Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 40);
      out.kinds = [...new Set(near.map(c => `${c.species}@${c.level}${c.leashed ? "L" : ""}${c.enraged ? "E" : ""}${c.boss ? "B" : ""}`))].join(" ");
      out.drawn = w.view.stats.creatures; const rs = w.view.rig && w.view.rig.stats; out.rigged = rs ? rs.creatures : 0; out.instances = rs ? rs.instances : 0;
      w.manual = false;
      return out;
    }, FRAMES);
    rows.push({ rig, ...r, errors });
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`| rig | creatures drawn | rigged | rig instances | view's creature work p50 / p99 (ms) | of which the rig p50 (ms) | rules step p50 (ms) | errors |\n|---|---|---|---|---|---|---|---|`);
  for (const r of rows) console.log("kinds:", r.kinds);
  for (const r of rows) console.log(`| ${r.rig === "1" ? "on" : "off"} | ${r.drawn} | ${r.rigged} | ${r.instances} | ${pct(r.creatures, .5).toFixed(2)} / ${pct(r.creatures, .99).toFixed(2)} | ${pct(r.rigMs, .5).toFixed(2)} | ${pct(r.step, .5).toFixed(2)} | ${r.errors.length ? r.errors.slice(0, 2).join("; ") : "none"} |`);
})();
