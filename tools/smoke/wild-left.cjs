// What's left to clear an area (Ed's playtest, 2026-10-07: "When I invite all the animals in an area ... the soundsystem
// doesn't transform": some of its own were out of sight, asleep or lying knocked down). The built game (DIST, default dist/)
// at 1600×900: she lands in a wild area, all but two of its own are made happy; the line under the clock must say "2 wild
// animals left here" and two pointers must show; then the last two too: the line goes and its soundsystem rises. Fails on a
// script error or any of those. Writes <out dir>/wild-left.png.
//   npm run build && node tools/smoke/wild-left.cjs [out dir] [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/wild-left", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], bad = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 600000, polling: 500 });
    const now = () => page.evaluate(() => window.witch.game.clock.time);
    const wait = async s => page.waitForFunction(t => window.witch.game.clock.time > t, (await now()) + s, { timeout: 600000, polling: 200 });
    // An area the route reaches early, with at least three of its own holding it: she lands by one of them.
    const key = await page.evaluate(() => {
      const g = window.witch.game; g.witches[0].health.hp = 1e6;
      const holds = c => !c.gone && !c.leashed && !c.boss && !c.circle && c.fleeUntil !== Infinity && c.state !== "happy";
      const by = new Map();
      for (const c of g.creatures) if (holds(c)) { const k = `${c.cell[0]},${c.cell[1]}`; by.set(k, [...(by.get(k) ?? []), c]); }
      const [k, list] = [...by].filter(([k, l]) => l.length >= 3 && !g.party.areas.has(k)).sort((a, b) => a[1].length - b[1].length)[0];
      const c = list[0];
      g.witch = { ...g.witch, x: c.x + 2, z: c.z + 2, seated: false, mode: "ground", lift: 0, vx: 0, vz: 0 };
      return k;
    });
    await wait(2);
    const happy = n => page.evaluate(([k, n]) => {
      const g = window.witch.game, holds = c => !c.gone && !c.leashed && !c.boss && !c.circle && c.fleeUntil !== Infinity && c.state !== "happy";
      const list = g.creatures.filter(c => `${c.cell[0]},${c.cell[1]}` === k && holds(c));
      for (const c of list.slice(0, Math.max(0, list.length - n))) { c.state = "happy"; c.enraged = false; c.asleep = false; c.napUntil = undefined; c.fight = undefined; c.watchUntil = undefined; }
      return list.length;
    }, [key, n]);
    await happy(2);
    await wait(1);
    const text = await page.evaluate(() => document.getElementById("wild-left")?.textContent ?? "");
    const pointers = await page.evaluate(() => window.witch.view.wildPointers.filter(p => p["cue"].canvas.style.display !== "none" && +p["cue"].canvas.style.opacity > 0).length);
    await page.screenshot({ path: path.join(outDir, "wild-left.png") });
    console.log("two left:", JSON.stringify({ key, text, pointers }));
    if (!/^2 wild animals left here/.test(text)) bad.push(`the line says "${text}", wanted "2 wild animals left here"`);
    if (pointers < 2) bad.push(`${pointers} pointers, wanted 2`);
    await happy(0);
    await wait(1.5);
    const after = await page.evaluate(k => ({ text: document.getElementById("wild-left")?.textContent ?? "", cleared: window.witch.game.party.areas.has(k) }), key);
    console.log("none left:", JSON.stringify(after));
    if (after.text) bad.push(`the line still says "${after.text}"`);
    if (!after.cleared) bad.push("the area wasn't cleared");
    await page.screenshot({ path: path.join(outDir, "wild-left-cleared.png") });
  } finally { await browser.close(); server.close(); }
  if (errors.length || bad.length) { console.error([...errors, ...bad].join("\n")); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
