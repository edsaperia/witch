// The wake-up's keys beside the bed (Ed, 2026-10-26: "This should just be WASD in keycaps to the left of the bed and 'E snooooze' to
// the right", "or the equivalent for controller"; render/houseRooms.ts): a fresh profile's first load (?opening=bedroom), her in bed
// with her alarm ringing at the house camera, shot on the keyboard and on a pad (the view's device held at "pad"), and checked: no
// wake card at the foot of the screen, the keys beside the bed on each side.
//   npm run build && node tools/opening/wake-keys.cjs [out dir]   (DIST=dist; default previews/opening/wake-keys)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const out = path.resolve(process.argv[2] || path.join(__dirname, "../../previews/opening/wake-keys"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], problems = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?opening=bedroom&quick=1`);
    await page.waitForFunction(() => window.witch?.game?.wake?.beat === "alarm", null, { timeout: 1200000, polling: 1000 });
    log("in bed, her alarm ringing");
    await page.waitForTimeout(4000);
    const look = () => page.evaluate(() => {
      const card = document.getElementById("wake-card"), shown = el => !!el && getComputedStyle(el).display !== "none" && el.getBoundingClientRect().width > 0;
      const box = document.getElementById("house-tags"), kids = box ? [...box.children].filter(shown).map(el => { const r = el.getBoundingClientRect(); return { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height), text: el.textContent }; }) : [];
      return { beat: window.witch.game.wake?.beat, card: shown(card) && !!card.textContent, shown: kids };
    });
    for (const device of ["keys", "pad"]) {
      if (device === "pad") await page.evaluate(() => Object.defineProperty(window.witch.view, "useDevice", { get: () => "pad", set() {}, configurable: true }));
      await page.waitForTimeout(2500);
      const s = await look();
      log(device, JSON.stringify(s));
      if (s.beat !== "alarm") problems.push(`${device}: the alarm stopped (${s.beat})`);
      if (s.card) problems.push(`${device}: the wake card is still shown`);
      if (!s.shown.some(k => k.text === "") || !s.shown.some(k => /snooooze/.test(k.text))) problems.push(`${device}: not both sides' keys shown`);
      await page.screenshot({ path: path.join(out, `alarm-${device}.png`), timeout: 300000 });
    }
  } finally { await browser.close(); server.close(); }
  if (errors.length) problems.push(`page errors: ${errors.join(" | ")}`);
  for (const p of problems) console.log("FAIL", p);
  process.exit(problems.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
