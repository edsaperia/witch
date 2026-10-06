// The sleeping legends' dream bubbles (render/leash.ts drawDreams, index.html .bubble.dream; the art director, #235: "a soft,
// round thought bubble with a couple of small puffs leading up to it ... quieter than the art"): the built game (DIST, default
// dist/) at 1280×720 on a seed; the witch set down on the ground beside the nearest dreaming legend, a still of its bubble; then
// it made restless (its nightmare's face, the ink reddening) for another. Writes previews/dreams/.
//   npm run build && node tools/smoke/dreams.cjs [out dir] [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/dreams", seed = "123"] = process.argv.slice(2);
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
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 4, null, { timeout: 600000, polling: 500 });
    const legend = await page.evaluate(() => {
      const g = window.witch.game, w = g.witch, near = g.creatures.filter(c => c.boss && c.legendState === "asleep" && c.quest && c.quest.done === undefined).sort((a, b) => Math.hypot(a.x - w.x, a.z - w.z) - Math.hypot(b.x - w.x, b.z - w.z))[0];
      if (!near) return null;
      g.witch = { ...g.witch, x: near.x + 6, z: near.z + 9, vx: 0, vz: 0, seated: false, mode: "ground", lift: 0 };
      return { id: near.id, species: near.species, wants: near.quest.species };
    });
    if (!legend) throw new Error("no dreaming legend");
    console.log("legend", JSON.stringify(legend));
    const wait = async s => page.waitForFunction(t => window.witch.game.clock.time > t, (await page.evaluate(() => window.witch.game.clock.time)) + s, { timeout: 600000, polling: 500 });
    await wait(4);
    const shoot = async name => {
      const b = await page.evaluate(() => { const e = document.querySelector(".bubble.dream.on"); if (!e || e.style.display === "none") return null; const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
      console.log(name, JSON.stringify(b));
      if (!b) throw new Error(`${name}: no dream bubble showing`);
      const cx = b.x + b.w / 2, cy = b.y + b.h, clip = { x: Math.max(0, cx - 260), y: Math.max(0, cy - 260), width: 520, height: 400 };
      await page.screenshot({ path: path.join(outDir, `${name}.png`), clip });
      await page.screenshot({ path: path.join(outDir, `${name}-screen.png`) });
    };
    await shoot("dream");
    // restless: its nightmare (the face, the ink reddening)
    await page.evaluate(id => { const c = window.witch.game.creatures[id]; c.restlessness = 0.6; }, legend.id);
    await wait(1);
    await shoot("nightmare");
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
