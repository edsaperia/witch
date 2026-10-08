// The sleeping legends' dream bubbles (render/leash/bubbles.ts drawDreams, render/thoughtCloud.ts; Ed, 2026-10-08: pixel thought
// bubbles, small clouds rising to a large one, one symbol at a time): the built game (DIST, default dist/) at 1280×720 on a seed;
// the witch set down on the ground beside the nearest dreaming legend, a crop of its bubble showing each symbol (its face, the
// sigil it dreams of, the flask), and one as a nightmare. Fails on a page error or a symbol that never shows. Writes previews/dreams/.
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
    await page.evaluate(() => { window.witch.game.clock.paused = true; });
    // the bubble's box, and which symbol shows whole (opacity 1)
    const look = () => page.evaluate(() => {
      const e = document.querySelector(".thought.dream"); if (!e || e.style.display === "none") return null;
      const r = e.getBoundingClientRect(), s = [...e.querySelectorAll("canvas:not(.cloud)")].find(c => c.style.display !== "none" && c.style.opacity === "1.00");
      return { x: r.x, y: r.y, w: r.width, h: r.height, left: e.style.left, top: e.style.top, kind: s ? ["emoji", "sigil", "flask"].find(k => s.classList.contains(k)) : null };
    });
    const shoot = async (name, want, limit = 60000) => {
      const end = Date.now() + limit;
      let b = await look();
      while ((!b || (want && b.kind !== want)) && Date.now() < end) { await page.waitForTimeout(100); b = await look(); }
      console.log(name, JSON.stringify(b));
      if (!b || (want && b.kind !== want)) { errors.push(`${name}: no ${want || "bubble"} showing`); return; }
      const clip = { x: Math.max(0, b.x - 30), y: Math.max(0, b.y - 30), width: b.w + 60, height: b.h + 120 };
      await page.screenshot({ path: path.join(outDir, `${name}.png`), clip });
    };
    await shoot("emoji", "emoji");
    await shoot("sigil", "sigil");
    await shoot("flask", "flask", 120000);
    await page.screenshot({ path: path.join(outDir, "screen.png") });
    await page.evaluate(id => { window.witch.game.creatures[id].restlessness = 0.75; }, legend.id);
    await shoot("nightmare-emoji", "emoji");
    await shoot("nightmare-sigil", "sigil");
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
