// The attack legibility audit's contact sheet (Ed, 2026-11-13: "Attack legibility audit of home island creatures"; youths only):
// the built game (dist/, or DIST) in headless Chromium, the Fight Arena (?fight=) with one youth of each kind against her standing
// still at the game's normal camera (no zoom), and two frames a kind: late in a wind-up aimed at her (WIND s before it lets go,
// its telegraph and tell showing), and HIT s after a blow lands on her (the hit, and whatever it leaves on her). Her hits are kept
// topped up so she's never knocked out. Rows = kinds, each whole frame at half size, labelled. Run `npx vite build` first.
//   OUT=/tmp/sheet.png node tools/balance/attack-audit-sheet.cjs [--kinds hare,stoat] [--wait 45]
const http = require("http"), fs = require("fs"), path = require("path");
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const root = path.resolve(process.env.DIST || path.resolve(__dirname, "../../dist"));
const KINDS = arg("kinds", "hedgehog,squirrel,hare,fox,bee,stoat,mole,snail,dormouse,badger").split(","), WAIT = +arg("wait", 45);
const WIND = +(process.env.WIND || 0.2), HIT = +(process.env.HIT || 0.12), OUT = process.env.OUT || "attack-audit-sheet.png", W = 1280, H = 720;
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".svg": "image/svg+xml", ".mp3": "audio/mpeg", ".ogg": "audio/ogg", ".woff2": "font/woff2" };
const serve = () => new Promise(r => { const s = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); }); s.listen(0, () => r(s)); });

(async () => {
  const server = await serve(), browser = await pw.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const rows = [];
  for (const kind of KINDS) {
    const page = await browser.newPage({ viewport: { width: W, height: H } }), errors = [];
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?creator=0&seed=123&fight=7&pack=${kind}*1@1`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 30000 });
    await page.addStyleTag({ content: "body * { visibility: hidden !important } canvas { visibility: visible !important }" });
    const t0 = await page.evaluate(() => window.witch.game.clock.time);
    let wind = null, hit = null, note = "";
    // (polled every frame in the page: her hits topped up; the first wind-up at her near its end, then the first blow on her)
    while ((!wind || !hit) && (await page.evaluate(() => window.witch.game.clock.time)) - t0 < WAIT) {
      const s = await page.evaluate(({ WIND, HIT }) => new Promise(done => {
        const g = window.witch.game, w = g.witches[0], hurt0 = w.health.hurtAt;
        const tick = () => {
          w.health.hp = Math.max(w.health.hp, 3);
          const c = g.creatures.find(q => q.fight && q.fight.target && q.fight.target.kind === "witch" && q.fight.windupUntil > 0);
          if (c && c.fight.windupUntil - g.clock.time <= WIND) return done({ kind: "wind", what: c.fight.spellCast !== undefined ? "grammar" : `pack ${c.fight.packMove ?? ""}` });
          if (w.health.hurtAt !== hurt0) { const at = g.clock.time; const wait = () => (g.clock.time - at >= HIT ? done({ kind: "hit" }) : requestAnimationFrame(wait)); return wait(); }
          if (g.clock.time > 1e9) return done(null);
          requestAnimationFrame(tick);
        };
        setTimeout(() => done({ kind: "timeout" }), 4000); tick();
      }), { WIND, HIT });
      if (s?.kind === "wind" && !wind) { wind = (await page.screenshot()).toString("base64"); note = s.what; await page.waitForTimeout(400); }
      else if (s?.kind === "hit" && !hit) hit = (await page.screenshot()).toString("base64");
      else if (s?.kind === "wind") await page.waitForTimeout(400);
    }
    console.log(kind, wind ? "wind-up" : "no wind-up", hit ? "hit" : "no hit", note, errors.length ? errors.slice(0, 2) : "");
    rows.push({ kind, wind, hit, note });
    await page.close();
  }
  const sheet = await browser.newPage();
  const url = await sheet.evaluate(async ({ rows, W, H }) => {
    const load = s => new Promise(r => { if (!s) return r(null); const i = new Image(); i.onload = () => r(i); i.src = "data:image/png;base64," + s; });
    const cw = W / 2, ch = H / 2, lab = 120, top = 28, c = document.createElement("canvas"); c.width = lab + cw * 2; c.height = top + rows.length * ch;
    const g = c.getContext("2d"); g.fillStyle = "#111"; g.fillRect(0, 0, c.width, c.height); g.imageSmoothingEnabled = false;
    g.fillStyle = "#eee"; g.font = "bold 16px sans-serif"; g.fillText("wind-up (0.2 s before it lets go)", lab + 10, 20); g.fillText("0.12 s after a blow lands on her", lab + cw + 10, 20);
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i], y = top + i * ch, [a, b] = await Promise.all([load(r.wind), load(r.hit)]);
      g.fillStyle = "#eee"; g.font = "bold 18px sans-serif"; g.fillText(r.kind, 8, y + ch / 2); g.font = "12px sans-serif"; g.fillText("youth", 8, y + ch / 2 + 18); if (r.note) g.fillText(r.note, 8, y + ch / 2 + 34);
      for (const [im, x] of [[a, lab], [b, lab + cw]]) { if (im) g.drawImage(im, 0, 0, W, H, x, y, cw, ch); else { g.fillStyle = "#555"; g.fillText("none in time", x + 20, y + ch / 2); } }
      g.strokeStyle = "#333"; g.strokeRect(lab, y, cw * 2, ch);
    }
    return c.toDataURL("image/png");
  }, { rows, W, H });
  fs.writeFileSync(OUT, Buffer.from(url.split(",")[1], "base64"));
  console.log("wrote", OUT);
  await browser.close(); server.close();
})();
