// The flask in her sigil stack (render/leash/stack.ts, rules/leash.ts stackOrder; Ed's playtest, 2026-10-08: "Flasks should behave
// like other sigils in this regard; sit in the stack, and cycle when it cycles"): the built game (DIST, default dist/) at 1280×720
// on a seed; three creatures leashed to her and the first relic carried (put there for the picture), on the ground at home; a crop
// of her stack before, after one cycle (the flask, at the bottom, to the top) and after another (a creature's sigil to the top,
// the flask a place down). Fails on a page error or the flask not where the rules put it. Writes <out dir>/*.png.
//   npm run build && node tools/smoke/flask-stack.cjs [out dir] [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/flask-stack", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 600000, polling: 500 });
    console.log(await page.evaluate(() => {
      const g = window.witch.game, D = g.map.dancefloor, x = D.x + 40, z = D.z + 30; // (home's open ground)
      g.witch = { ...g.witch, x, z, seated: false, mode: "ground", lift: 0 }; const w = g.witch;
      const near = g.creatures.filter(c => !c.gone && !c.boss && c.level < 3 && !c.leashed).sort((a, b) => Math.hypot(a.x - w.x, a.z - w.z) - Math.hypot(b.x - w.x, b.z - w.z)).slice(0, 3);
      near.forEach((c, i) => { const px = x - 6 + i * 4, pz = z + 4; Object.assign(c, { x: px, z: pz, tx: px, tz: pz, leashed: true, state: "leashed", enraged: false, siege: undefined }); g.leash.stack.push(c.id); });
      const r = g.relics[0]; r.state = "carried"; g.leash.relics.push(r.id); (g.leash.relicAt ??= {})[r.id] = g.leash.stack.length; // (picked up last: at the bottom)
      g.byArea = null;
      return `leashed ${near.map(c => `${c.species}${c.level}`).join(" ")}, carrying relic ${r.id} (${r.kind})`;
    }));
    const step = (o, dt = 0.05) => page.evaluate(([o, dt]) => { const w = window.witch, C = o => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }); w.manual = true; w.frame(C(o), dt); }, [o, dt]);
    const order = () => page.evaluate(() => { const s = window.witch.game.leash, n = s.stack.length, out = []; for (let k = 0; k <= n; k++) { for (const r of s.relics) if (Math.min(n, s.relicAt?.[r] ?? n) === k) out.push("flask"); if (k < n) out.push(window.witch.game.creatures[s.stack[k]].species); } return out; });
    const clip = { x: 640 - 170, y: 360 - 330, width: 340, height: 400 };
    const shoot = async (name, want) => {
      for (let i = 0; i < 40; i++) await step({});
      const o = await order();
      console.log(name, "top to bottom:", o.join(", "));
      if (o.indexOf("flask") !== want) errors.push(`${name}: the flask is at ${o.indexOf("flask")} from the top, not ${want}`);
      await page.screenshot({ path: path.join(outDir, `${name}.png`), clip });
    };
    await shoot("before", 3);
    await step({ cycle: true });
    await shoot("cycled-once", 0);
    await step({ cycle: true });
    await shoot("cycled-twice", 1);
    await page.screenshot({ path: path.join(outDir, "screen.png") });
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log("ok");
})().catch(e => { console.error(e); process.exit(1); });
