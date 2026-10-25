// The dressing stations in the built game (Ed's playtest of v4273, 2026-10-23: "When the camera zooms in on the witch, it aims at her
// feet, and so when you're zoomed close her head is off screen"; "When choosing clothes etc I can't select them, I can only move the
// selector around"). For each of her dressing stations (the bedroom's, and the cloak pegs in the Cloakroom; ?shot=object:<id>, app/shot.ts), the loop running as in play:
//  - framing: once she's choosing, all of her is on screen and the part being chosen near the middle (camera.station.parts), at the
//    start's zoom and again with the zoom all the way in (Z);
//  - choosing: the arrow keys and a click each put an owned item on her, and her drawn look follows (the view's assets: her look now,
//    and at a hat-off station her hat-off frames for it); Enter, E and Space choose in the panel, not in the game (she neither rises
//    nor puts anything down), a locked item saying it isn't found yet.
// Fails on any of those or a page error; writes <out>/<station>-<zoom>.png.
//   npm run build && node tools/stations/check.cjs [out] [dist]   (about 10 minutes in the cloud; ONLY=wardrobe,shoeRack)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outArg = "previews/stations", distArg] = process.argv.slice(2);
const out = path.resolve(outArg), root = path.resolve(distArg || path.join(__dirname, "../../dist"));
const W = 1280, H = 720, ONLY = process.env.ONLY ? process.env.ONLY.split(",") : null;
const STATIONS = ["wardrobe", "dressingTable", "shoeRack", "cloakPegs"];
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const fails = [], ok = (cond, what) => { log(cond ? "ok  " : "FAIL", what); if (!cond) fails.push(what); };
  try {
    for (const id of STATIONS) {
      if (ONLY && !ONLY.includes(id)) continue;
      const page = await browser.newPage({ viewport: { width: W, height: H } });
      page.on("pageerror", e => fails.push(`${id}: page error ${e.message}`));
      await page.goto(`http://127.0.0.1:${server.address().port}/?shot=object:${id}&seed=123`);
      await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
      // (the start card's any key: Q, which the station's panel leaves alone, as it takes Enter, E and Space)
      await page.keyboard.press("KeyQ");
      await page.waitForFunction(() => document.querySelector("#station-panel")?.classList.contains("in") && !window.witch.game.clock.paused, null, { timeout: 300000, polling: 500 });
      const settle = async () => { await page.waitForTimeout(1500); await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 900000, polling: 500 }); await page.waitForTimeout(3000); };
      // Where she's drawn on screen: her feet (the view's witchBase) and her top (up her sprite by her drawn height).
      const her = () => page.evaluate(([W, H]) => {
        const v = window.witch.view, c = v.camera, b = v.witchBase, up = window.witch.spriteUp(), V = c.position.constructor;
        const at = k => { const p = new V(b.x + up.x * v.witchTall * k, b.y + up.y * v.witchTall * k, b.z + up.z * v.witchTall * k).project(c); return [(p.x * 0.5 + 0.5) * W, (-p.y * 0.5 + 0.5) * H]; };
        return { feet: at(0), top: at(1), aim: window.witch.game.camera.stationAim ?? 0, choosing: window.witch.game.camera.station ?? 0 };
      }, [W, H]);
      for (const zoom of ["start", "closest"]) {
        if (zoom === "closest") { for (let i = 0; i < 10; i++) { await page.keyboard.press("KeyZ"); await page.waitForTimeout(150); } }
        await settle();
        const h = await her(), mid = h.feet[1] + (h.top[1] - h.feet[1]) * h.aim;
        await page.screenshot({ path: path.join(out, `${id}-${zoom}.png`) });
        log(id, zoom, JSON.stringify({ feet: h.feet.map(Math.round), top: h.top.map(Math.round), aim: +h.aim.toFixed(2), choosing: +h.choosing.toFixed(2) }));
        ok(h.choosing > 0.9, `${id} (${zoom} zoom): the camera's in on her, choosing`);
        ok(h.top[1] >= 0 && h.feet[1] <= H, `${id} (${zoom} zoom): all of her on screen (top ${Math.round(h.top[1])}, feet ${Math.round(h.feet[1])} of ${H})`);
        ok(Math.abs(mid - H / 2) < H * 0.12, `${id} (${zoom} zoom): the part chosen near the middle (${Math.round(mid)} of ${H})`);
      }
      // Choosing: what's in focus, what she wears, and what's drawn on her.
      const state = () => page.evaluate(() => { const p = document.querySelector("#station-panel"), f = p.querySelector(".focus"); return { worn: [...p.querySelectorAll(".sp-card.worn")].map(e => `${e.dataset.line}:${e.dataset.col}`), focus: f ? `${f.dataset.line}:${f.dataset.col}` : null, locked: !!f?.classList.contains("locked"), detail: p.querySelector(".sp-detail")?.innerText ?? "", saved: localStorage.getItem("witch.genome"), drawn: JSON.stringify(window.witch.view.assets.witchGenome ?? null), witch: { y: window.witch.game.witch.mode, perch: !!window.witch.game.witch.perch } }; });
      const owned = await page.evaluate(() => [...document.querySelectorAll("#station-panel .sp-card:not(.locked)")].map(e => `${e.dataset.line}:${e.dataset.col}`));
      const s0 = await state();
      if (owned.length >= 2) {
        const other = owned.find(o => !s0.worn.includes(o));
        // the arrow keys (from the first card, right to the next owned one)
        const [line, col] = other.split(":").map(Number);
        const box = await page.evaluate(([l, c]) => { const e = document.querySelector(`#station-panel .sp-card[data-line="${l}"][data-col="${c}"]`), r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }, [line, col]);
        await page.mouse.click(box[0], box[1]); await settle();
        let s = await state();
        ok(s.worn.includes(other), `${id}: a click on an owned item puts it on her (worn ${s.worn})`);
        ok(s.saved && JSON.stringify(JSON.parse(s.saved)) === s.drawn, `${id}: her drawn look is the one chosen`);
        await page.mouse.move(W - 20, H - 20); // (the pointer off the panel: the arrows next)
        await page.keyboard.press("ArrowLeft"); await settle();
        s = await state();
        ok(!s.worn.includes(other), `${id}: an arrow key onto another owned item puts that on instead (worn ${s.worn})`);
        ok(s.saved && JSON.stringify(JSON.parse(s.saved)) === s.drawn, `${id}: her drawn look follows the arrow key's choice`);
      } else log(id, `fewer than two owned items in its first row (${owned.length}): click and arrows on items skipped`);
      // Enter, E and Space: chosen in the panel, never the game's (no rise, nothing put down); on a locked item, not found yet.
      const locked = await page.evaluate(() => { const e = document.querySelector("#station-panel .sp-card.locked"); if (!e) return null; const r = e.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
      for (const key of ["Enter", "KeyE", "Space"]) {
        const before = await state();
        await page.keyboard.press(key); await page.waitForTimeout(800);
        const after = await state();
        ok(after.witch.perch && after.witch.y === "ground", `${id}: ${key} stays in the panel (she's still on foot in the house)`);
        ok(JSON.stringify(after.worn) === JSON.stringify(before.worn), `${id}: ${key} on the item she wears keeps it on`);
      }
      if (locked) {
        await page.mouse.click(locked[0], locked[1]); await page.waitForTimeout(500); await page.keyboard.press("Enter"); await page.waitForTimeout(500);
        const s = await state();
        ok(/not found yet/i.test(s.detail), `${id}: Enter on a locked item says it's not found yet ("${s.detail.replace(/\s+/g, " ").trim()}")`);
      }
      await page.close();
    }
  } finally { await browser.close(); server.close(); }
  if (fails.length) { console.error(`\n${fails.length} failed:\n` + fails.join("\n")); process.exit(1); }
  log("all ok");
})().catch(e => { console.error(e); process.exit(1); });
