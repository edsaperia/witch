// A border between two areas, on the ground and from the treetops (Ed's #887: planting blending across the borders):
//   node tools/forest/border.cjs <dist dir> <seed> <out prefix> [nth border]
// Loads the built game on that seed, walks out from the dancefloor due east (ANGLE=<degrees> another way) until the area under
// her changes for the nth time (default 2: past home's own edge), puts her on foot on that border,
// lets the forest grow and screenshots <prefix>-ground.png, then rises and screenshots <prefix>-treetops.png. Prints the two
// area types. Run it on two builds (the old one's dist and the new) for a before and after.
const http = require("http"), fs = require("fs"), path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [dir, seed = "123", prefix = "previews/border", nth = "2"] = process.argv.slice(2), root = path.resolve(dir);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  const file = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
server.listen(0, "127.0.0.1", async () => {
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage({ viewport: { width: 960, height: 540 } }), errors = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/?opening=old&seed=${seed}&spell=auto&pulse=off`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000, polling: 500 });
  await page.keyboard.press("Enter"); // (past the start screen)
  await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000 });
  // the border: due east (or ANGLE) from the dancefloor, the nth change of area
  const spot = await page.evaluate(([nth, ang]) => {
    const g = window.witch.game, m = g.map, d = m.dancefloor, a = ang * Math.PI / 180;
    let last = m.areaAt(d.x, d.z), n = 0;
    for (let r = 2; r < 2000; r += 2) {
      const x = d.x + Math.cos(a) * r, z = d.z + Math.sin(a) * r, here = m.areaAt(x, z);
      if (here.cell[0] !== last.cell[0] || here.cell[1] !== last.cell[1]) { n++; if (n >= nth) return { x, z, from: last.look, to: here.look }; last = here; }
    }
    return null;
  }, [Number(nth), Number(process.env.ANGLE ?? 0)]);
  if (!spot) { console.log("no border found"); process.exit(1); }
  const step = (n, o = {}) => page.evaluate(([n, o]) => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, 1 / 60, i === n - 1); }, [n, o]);
  await page.evaluate(([x, z]) => { const g = window.witch.game; g.witch = { ...g.witch, x, z, seated: false, perch: undefined, vx: 0, vz: 0, mode: "ground", lift: 0 }; }, [spot.x, spot.z]);
  await step(60); await page.waitForTimeout(20000); await step(120); await page.waitForTimeout(8000); await step(2);
  await page.screenshot({ path: `${prefix}-ground.png` });
  await step(1, { toggleMode: true }); await step(240); await page.waitForTimeout(20000); await step(120); await page.waitForTimeout(8000); await step(2);
  await page.screenshot({ path: `${prefix}-treetops.png` });
  console.log(`border at ${Math.round(spot.x)}, ${Math.round(spot.z)}: area types ${spot.from} | ${spot.to}; ${errors.length ? "errors: " + errors.slice(0, 2).join(" | ") : "no page errors"} → ${prefix}-ground.png, ${prefix}-treetops.png`);
  await browser.close(); server.close();
  process.exit(errors.length ? 1 : 0);
});
