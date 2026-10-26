// Where she is in the oak, on screen (Ed's playtest, 2026-10-25: "When you get to a station and zoom in, it doesn't seem to accurately
// know where the witch is"; "When you invite while you're in the treehouse, the invites come from a place where the witch isn't"):
// the built game, her put in front of house objects or in a room (?shot=object:<id> | room:<id>, app/shot.ts) or by the Terrace's
// record shelf (terrace), the frames stepped till the camera's settled; then at a station E and standing still (the close-up,
// camera.station). For each, in pixels on screen: her feet as drawn (view.witchBase), her head, the screen's middle (the camera's
// aim), where a 💌 thrown now starts as drawn (view.inviteStart: render/invites.ts letterAt) and the rules' place. Fails if a 💌
// starts further from her feet than she's tall (and MAX px), or a station's close-up doesn't come or hasn't all of her on screen,
// right of the middle (clear of its panel). Writes <out>/<id>.png (marks: her feet green, the 💌's start pink, the rules' place
// blue, the middle white) and positions.json.
//   npm run build && node tools/house/positions.cjs [out] [dist]   OBJECTS (terrace,wardrobe,…,room:bedroom,…), SIZE (1280x720), MAX (24)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outArg = "previews/house/positions", distArg] = process.argv.slice(2);
const out = path.resolve(outArg), root = path.resolve(distArg || path.join(__dirname, "../../dist"));
const [W, H] = (process.env.SIZE || "1280x720").split("x").map(Number), MAX = Number(process.env.MAX || 24);
const OBJECTS = (process.env.OBJECTS || "terrace,wardrobe,dressingTable,shoeRack,pegboard,mirror,cloakPegs,bags,room:bedroom,room:workshop,room:solarium").split(",");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], bad = [], rows = [];
  try {
    for (const id of OBJECTS) {
      const page = await browser.newPage({ viewport: { width: W, height: H } });
      page.on("pageerror", e => errors.push(`${id}: ${e.message}`));
      const scene = id === "terrace" ? "object:recordShelf" : id.includes(":") ? id : `object:${id}`, station = id !== "terrace" && !id.includes(":");
      await page.goto(`http://127.0.0.1:${server.address().port}/?shot=${scene}&seed=123&quick=1`);
      await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 1800000, polling: 500 });
      await page.evaluate(() => { window.witch.manual = true; window.witch.game.clock.paused = false; }); // (no key: Enter would cast the party spell and seat her at her decks)
      const said = await page.evaluate(s => window.witch.lastShot ?? window.witch.shot(s), scene);
      if (!said.ok) { bad.push(`${id}: ${said.say}`); await page.close(); continue; }
      const step = (n, c = {}) => page.evaluate(([n, c]) => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...c }, 1 / 60, i === n - 1); }, [n, c]);
      const where = () => page.evaluate(([W, H]) => {
        const w = window.witch, v = w.view, g = w.game, B = v.witchBase, px = ([x, y]) => [Math.round((x + 1) / 2 * W), Math.round((1 - y) / 2 * H)], L = v.inviteStart(g);
        return { feet: px(v.screenOf(B.x, B.y, B.z, true)), top: px(v.screenOf(B.x, B.y + v.witchTall, B.z, true)), mid: [W / 2, H / 2], letter: px(v.screenOf(L.x, L.y, L.z, L.world)), rules: px(v.screenOf(g.witch.x, 0, g.witch.z)), station: g.camera.station ?? 0 };
      }, [W, H]);
      await step(180);
      const walk = await where();
      // (at a station: E read by the page's own loop opens it; standing still there, framing as main.ts sets it, the camera closes in)
      if (station) { await page.evaluate(() => { window.witch.manual = false; }); await page.keyboard.press("KeyE"); await page.waitForTimeout(5000); await page.evaluate(() => { window.witch.manual = true; }); await step(240, { framing: true }); }
      const close = station ? await where() : walk;
      await page.evaluate(([pts]) => { const s = document.getElementById("start"); if (s) s.style.display = "none"; for (const [x, y, c] of pts) { const d = document.createElement("div"); d.style.cssText = `position:fixed;left:${x - 6}px;top:${y - 6}px;width:12px;height:12px;border:2px solid ${c};border-radius:50%;z-index:99;pointer-events:none`; document.body.append(d); } }, [[[...close.feet, "#4f4"], [...close.letter, "#f6c"], [...close.rules, "#4af"], [...close.mid, "#fff"]]]);
      await page.screenshot({ path: path.join(out, `${id.replace(":", "-")}.png`) });
      const d = (a, b) => Math.round(Math.hypot(a[0] - b[0], a[1] - b[1]));
      const row = { id, tall: d(walk.top, walk.feet), letterFromFeet: d(walk.letter, walk.feet), rulesFromFeet: d(walk.rules, walk.feet), feet: walk.feet, ...(station ? { closeFeet: close.feet, closeTop: close.top, closeOn: close.station } : {}) };
      rows.push(row);
      log(JSON.stringify(row));
      if (row.letterFromFeet > row.tall + MAX) bad.push(`${id}: a 💌 starts ${row.letterFromFeet} px from her feet; she's ${row.tall} px tall`);
      const framed = close.feet[0] > W / 2 && close.feet[0] < W && close.feet[1] <= H && close.top[1] >= 0;
      if (station && (close.station < 0.99 || !framed)) bad.push(`${id}: the close-up ${close.station < 0.99 ? "never came" : `has her feet at ${close.feet}, her head at ${close.top}`}`);
      await page.close();
    }
  } finally { await browser.close(); server.close(); }
  fs.writeFileSync(path.join(out, "positions.json"), JSON.stringify(rows, null, 1));
  if (errors.length) console.error("page errors:\n" + errors.join("\n"));
  if (bad.length) console.error("FAILED:\n" + bad.join("\n"));
  process.exit(errors.length || bad.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
