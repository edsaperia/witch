// The legend circle's explainer (render/leash.ts drawCirclePanel; Ed, 2026-10-06): the built game (DIST, default dist/) at
// 1600×900 on a seed, the witch on the ground inside two legends' clearings in turn, each asleep (its quest open), its boon
// already hers, restless, angry and happy (the game paused for each shot), and once just outside (no panel). Writes
// <out dir>/<species>-<state>.png and outside.png.
//   npm run build && node tools/smoke/legend-panel.cjs [out dir] [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/legend-panel", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 600000, polling: 500 });
    await page.waitForTimeout(20000); // (the forest's art in)
    // two sleeping legends with clearings, the nearest home first
    const picks = await page.evaluate(() => {
      const g = window.witch.game, D = g.map.dancefloor, cl = g.map.legendClearings || [];
      const ls = g.creatures.filter(c => c.boss && !c.gone && c.quest && cl.some(k => Math.hypot(k.legend.x - c.x, k.legend.z - c.z) <= k.r)).sort((a, b) => Math.hypot(a.x - D.x, a.z - D.z) - Math.hypot(b.x - D.x, b.z - D.z));
      const out = [], seen = new Set(); for (const c of ls) { if (seen.has(c.species)) continue; seen.add(c.species); out.push(c.id); if (out.length === 2) break; }
      return out;
    });
    const settle = s => page.waitForTimeout(s);
    for (const id of picks) {
      for (const state of ["asleep", "boon", "restless", "angry", "happy"]) {
        const info = await page.evaluate(([id, state]) => {
          const g = window.witch.game, c = g.creatures[id], k = g.map.legendClearings.find(q => Math.hypot(q.legend.x - c.x, q.legend.z - c.z) <= q.r);
          c.legendState = state === "boon" ? "asleep" : state; c.quest.done = state === "boon" || state === "happy" ? 1 : undefined;
          g.witch = { ...g.witch, x: k.x + k.r * 0.15, z: k.z + k.r * 0.45, seated: false, mode: "ground", lift: 0, vx: 0, vz: 0 };
          g.clock.paused = false;
          return { species: c.species, r: Math.round(k.r) };
        }, [id, state]);
        await settle(1500);
        await page.evaluate(([id, state]) => { const g = window.witch.game, c = g.creatures[id]; c.legendState = state === "boon" ? "asleep" : state; c.quest.done = state === "boon" || state === "happy" ? 1 : undefined; g.clock.paused = true; }, [id, state]); // (held there for the shot)
        const want = state === "boon" ? "asleep" : state;
        await page.waitForFunction(([want, done]) => { const el = document.querySelector(".legend-panel"); return el && el.dataset.state === want && !!el.querySelector("p.done") === done && +el.style.opacity > .9; }, [want, state === "boon" || state === "happy"], { timeout: 120000, polling: 200 }).catch(() => {});
        await settle(1500);
        const shown = await page.evaluate(() => { const el = document.querySelector(".legend-panel"); return el && el.style.display !== "none" ? { text: el.textContent, opacity: el.style.opacity } : null; });
        console.log(info.species, state, JSON.stringify(shown));
        if (!shown || !(+shown.opacity > 0.9)) errors.push(`${info.species} ${state}: no panel`);
        await page.screenshot({ path: path.join(outDir, `${info.species}-${state}.png`) });
      }
    }
    // just outside the last circle: the panel fades out
    await page.evaluate(id => { const g = window.witch.game, c = g.creatures[id], k = g.map.legendClearings.find(q => Math.hypot(q.legend.x - c.x, q.legend.z - c.z) <= q.r); g.witch = { ...g.witch, x: k.x, z: k.z + k.r + 6 }; g.clock.paused = false; }, picks[picks.length - 1]);
    await page.waitForFunction(() => { const el = document.querySelector(".legend-panel"); return !el || el.style.display === "none"; }, null, { timeout: 15000, polling: 200 }).catch(() => {});
    const after = await page.evaluate(() => { const el = document.querySelector(".legend-panel"), g = window.witch.game; return el ? `${el.style.display}|${el.style.opacity}|witch ${Math.round(g.witch.x)},${Math.round(g.witch.z)} ${g.witch.mode} paused ${g.clock.paused}` : "absent"; });
    console.log("outside", after);
    if (!after.startsWith("none") && after !== "absent") errors.push("panel still shown outside the circle");
    await page.screenshot({ path: path.join(outDir, "outside.png") });
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
