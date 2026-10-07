// The stargazing camera round the coast (Ed, 2026-10-07: "check in 12 different directions for a nice composition"):
//   node tools/beach/bearings.cjs <dist dir> <out dir> [seed]
// Loads the built game once and, for each of the twelve bearings of beach.camera.bearings (every 30 degrees from the
// north, clockwise), puts her on the sand there, walks her out until she lies down to stargaze, lets the view settle and
// screenshots it as <out>/<bearing>.png. TRY="angle,distance,look,seaward;..." also shoots each of those settings at every
// bearing (as <bearing>-<angle>-<distance>-<look>-<seaward>.png) for picking the table's entries, `seaward` the metres it
// stands out over the water sideways (the table's side: seaward × the bearing's sine, east +); ONLY="0,90,..." just those.
// Then a contact sheet of the twelve: montage <out>/[0-9]*.png ... (see the end).
const http = require("http"), fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [dir, outDir, seed = "123"] = process.argv.slice(2), root = path.resolve(dir);
const TRY = (process.env.TRY || "").split(";").filter(Boolean).map(s => s.split(",").map(Number));
const ONLY = process.env.ONLY ? process.env.ONLY.split(",").map(Number) : null;
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  const file = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
server.listen(0, "127.0.0.1", async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage({ viewport: { width: 960, height: 540 } }), errors = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&spell=auto&creator=0`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000, polling: 500 });
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 30000 });
  const step = (n, o = {}) => page.evaluate(([n, o]) => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, 1 / 60, i === n - 1); return !!w.game.witch.stargazing; }, [n, o]);
  const table = await page.evaluate(() => JSON.parse(JSON.stringify(window.witch.game.tuning.beach.camera.bearings)));
  const setAll = (a, d, l, sw, deg) => page.evaluate(([a, d, l, sd]) => { const B = window.witch.game.tuning.beach.camera.bearings; B.angle.fill(a); B.distance.fill(d); B.look.fill(l); (B.side ??= []).length = 12; B.side.fill(sd); }, [a, d, l, Math.round((sw || 0) * Math.sin((deg * Math.PI) / 180) * 10) / 10]);
  const restore = () => page.evaluate(t => { const B = window.witch.game.tuning.beach.camera.bearings; for (const k of ["angle", "distance", "look", "side"]) if (t[k]) B[k].splice(0, 12, ...t[k]); }, table);
  for (let i = 0; i < 12; i++) {
    const deg = i * 30;
    if (ONLY && !ONLY.includes(deg)) continue;
    // on the sand at that bearing (0 north = -z, clockwise: east = +x), a little inside the edge, then out until she lies down
    // (where the sand all but vanishes on a rocky stretch she can't lie down: a few degrees along the coast instead)
    let lying = false;
    for (const nudge of [0, 6, -6, 12, -12]) {
      const out = await page.evaluate(deg => {
        const g = window.witch.game, c = g.map.bounds.circle, b = (deg * Math.PI) / 180, nx = Math.sin(b), nz = -Math.cos(b), r = c.r - 40;
        g.witch = { ...g.witch, x: c.x + nx * r, z: c.z + nz * r, seated: false, stargazing: false, vx: 0, vz: 0, mode: "ground", lift: 0 };
        return { nx, nz };
      }, deg + nudge);
      for (let k = 0; k < 120 && !lying; k++) lying = await step(10, { moveX: out.nx * 0.4, moveZ: out.nz * 0.4 });
      if (lying) { if (nudge) console.log(`  (${deg}°: lying ${nudge}° along the coast)`); break; }
    }
    await page.waitForFunction(() => window.witch.view.assets.partyWitchArt(null), null, { timeout: 180000, polling: 250 }); // (her stargazing pose drawn)
    await step(600); // (about ten seconds: down onto the sand and settled)
    await page.waitForTimeout(600); await step(2);
    const shoot = async name => { const lie = await step(30); await page.waitForTimeout(300); await step(2); await page.screenshot({ path: path.join(outDir, name) }); if (!lie) console.log(`  (${name}: not lying)`); };
    await shoot(`${String(deg).padStart(3, "0")}.png`);
    for (const [a, d, l, sw = 0] of TRY) { await setAll(a, d, l, sw, deg); await shoot(`${String(deg).padStart(3, "0")}-${a}-${d}-${l}-${sw}.png`); }
    if (TRY.length) await restore();
    const w = await page.evaluate(() => { const g = window.witch.game; return { x: Math.round(g.witch.x), z: Math.round(g.witch.z), area: window.witch.areaUnderWitch ? window.witch.areaUnderWitch() : "" }; });
    console.log(`${deg}°: ${lying ? "lying" : "NOT lying"} at ${w.x}, ${w.z} (${w.area})`);
  }
  console.log(errors.length ? "errors: " + errors.slice(0, 3).join(" | ") : "no page errors");
  await browser.close(); server.close();
  // the contact sheet of the table as it stands: four across, each labelled with its bearing
  const shots = fs.readdirSync(outDir).filter(f => /^\d{3}\.png$/.test(f)).sort();
  if (shots.length) {
    try {
      execFileSync("montage", [...shots.flatMap(f => ["-label", `${Number(f.slice(0, 3))}°`, path.join(outDir, f)]), "-tile", "4x", "-geometry", "480x270+4+4", "-pointsize", "18", "-background", "#111", "-fill", "#eee", path.join(outDir, "sheet.png")]);
      console.log(`contact sheet: ${path.join(outDir, "sheet.png")}`);
    } catch (e) { console.log("no contact sheet (montage):", e.message); }
  }
  process.exit(errors.length ? 1 : 0);
});
