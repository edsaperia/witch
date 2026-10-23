// Pack combat's shot sheet (rules/combat/packs.ts; docs/backlog/combat.md build step 1): the built game (DIST, default dist/) at
// 1280x720 on a seed, pack combat on (the default since Ed, 2026-10-20; it was ?set=combat.packs.on=true), and for each kind its debug arena (?arena=pack-<kind>:
// a wild pack of three young and two adults coming for her) played headless till each moment of its fight: the tell (every member
// glowing), the combo (wind-ups and shots), its special, and the lull (its retreat). Fails on a page error or a moment that never
// comes. Writes <out dir>/<kind>-<moment>.png.
//   npm run build && node tools/smoke/packs.cjs [out dir] [seed] [kinds]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/packs", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  const kinds = (process.argv[4] || "hedgehog,squirrel,hare,fox,marten,stoat,mole,snail,dormouse,badger").split(",");
  try {
    for (const kind of kinds) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
      page.on("pageerror", e => errors.push(`${kind}: ${e.message}`));
      await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off&arena=pack-${kind}`);
      await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
      await page.keyboard.press("Enter");
      await page.waitForFunction(() => window.witch.game.clock.time > 1, null, { timeout: 600000, polling: 500 });
      await page.evaluate(() => { window.witch.manual = true; });
      // Play on (rules only, her health held) till `want` holds, up to `max` game seconds; then a few drawn frames and the shot.
      const until = (want, max) => page.evaluate(([want, max]) => {
        const w = window.witch, g = w.game, C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, end = g.clock.time + max;
        const pack = () => [...(g.combat.packs?.values() ?? [])].find(s => !s.hers);
        const test = {
          tell: () => pack()?.phase === "tell" && g.clock.time - pack().at > 0.25,
          combo: () => pack()?.phase === "combo" && (g.combat.shots.length > 0 || g.combat.beams.length > 0 || pack().members.some(id => g.creatures[id].fight?.lunge)),
          special: () => sp > 0 && g.clock.time - sp > 0.3,
          lull: () => pack()?.phase === "lull" && (g.clock.time - pack().at) > (pack().until - pack().at) * 0.45,
        }[want];
        let sp = -1; // (when its special went: each frame's events go with the frame)
        while (g.clock.time < end) { g.witches[0].health.hp = 99; w.frame(C, 1 / 30, false); if (sp < 0 && g.combat.events.some(e => e.kind === "packSpecial")) sp = g.clock.time; if (test()) return true; }
        return false;
      }, [want, max]);
      for (const moment of ["tell", "combo", "special", "lull"]) {
        const ok = await until(moment, 40);
        if (!ok) { errors.push(`${kind}: no ${moment} in 40 s`); continue; }
        await page.evaluate(() => { const w = window.witch; for (let i = 0; i < 3; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, true); });
        const info = await page.evaluate(() => { const g = window.witch.game, p = [...(g.combat.packs?.values() ?? [])].find(s => !s.hers); return `${p?.phase} combo ${p?.combo} t ${g.clock.time.toFixed(1)}`; });
        console.log(kind, moment, info);
        await page.screenshot({ path: path.join(outDir, `${kind}-${moment}.png`), timeout: 600000 });
      }
      await page.close();
    }
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log("ok");
})().catch(e => { console.error(e); process.exit(1); });
