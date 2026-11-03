// The challenge pack's frame time (Ed, 2026-11-03: "128 animal pack is the ultimate challenge"), in headless Chromium on the built
// game: the late-campaign home with every kind known (KINDS, 64 by default: a 128-animal pack), her down in the middle of its circle
// (?shot=challenge:0, app/shot.ts) with her health held, the pack watching, then hunting her; and, for comparison on the same
// machine, the bench's own wave fight (tools/bench/frames.cjs "wave-fight": a debug arena below the dancefloor, a wave called in).
// Each frame stepped at a fixed 1/60 s (window.witch.frame, rules then view): the rules' step, the view's render and its parts.
// In the cloud the `draw` part is the software renderer's (SwiftShader); the rest is the CPU's own.
//   npx vite build && node tools/bench/pack-frames.cjs [out.json]
// KINDS (64), SEED (1), SIZE (1280x720), WARM (frames before timing, 360: the wild watch's 4 s and the pack closing in), FRAMES
// (timed, 240), SCENES (pack,wave), DIST (dist/), SHOT (a png of the pack's last frame, optional).
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const out = process.argv[2];
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const [W, H] = (process.env.SIZE || "1280x720").split("x").map(Number), WARM = Number(process.env.WARM || 360), FRAMES = Number(process.env.FRAMES || 240);
const KINDS = Number(process.env.KINDS || 64), SEED = process.env.SEED || 1, SCENES = (process.env.SCENES || "pack,wave").split(",");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.error(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);
// (every kind she can know, home's 10 first: rules/rosters.ts knownKinds; the link's ?found= takes them)
const KNOWN = "hedgehog,squirrel,hare,fox,marten,stoat,mole,snail,dormouse,badger,beetle,boar,otter,heron,newt,woodlouse,moth,bat,toad,raven,elk,wolf,lynx,ram,salamander,spider,snake,cat,stag,beaver,bear,owl,arcticfox,ibex,redpanda,komodo,meerkat,armadillo,fennec,lion,crocodile,dragonfly,tiger,flyingsquirrel,roe,penguin,frosttroll,snowleopard,frostwyrm,griffin,sphinx,stegosaurus,rattlesnake,scorpion,rhino,cheetah,hydra,crab,featheredserpent,elephant,jaguar,raccoon,unicorn,polarbear".split(",");

const pct = (s, p) => s[Math.min(s.length - 1, Math.floor(p * s.length))];
const sum = (times, f) => { const v = times.map(f).sort((a, b) => a - b), m = v.reduce((a, b) => a + b, 0) / Math.max(1, v.length); return { mean: +m.toFixed(2), p50: +pct(v, 0.5).toFixed(2), p95: +pct(v, 0.95).toFixed(2), worst: +v[v.length - 1].toFixed(2) }; };

async function scene(browser, port, name) {
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  const errors = [];
  page.on("pageerror", e => errors.push(e.message));
  const found = KNOWN.slice(10, KINDS).join(",");
  const q = name === "pack" ? `?shot=challenge:0&island=home&found=${found}&seed=${SEED}&creator=0` : `?quick=1&creator=0&seed=${SEED}&arena=wolf*3@2,boar*2@1`;
  log(name, "loading", q.slice(0, 120));
  await page.goto(`http://127.0.0.1:${port}/${q}`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 1200000, polling: 500 });
  await page.evaluate(() => { window.witch.manual = true; });
  if (await page.evaluate(() => window.witch.game.clock.paused)) {
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000, polling: 200 }).catch(() => {});
  }
  const info = await page.evaluate(n => { const g = window.witch.game; return { creatures: g.creatures.length, pack: g.challenge?.pack.length ?? 0, radius: g.challenge?.radius ?? 0, kinds: g.map.island?.roster.length, scene: n }; }, name);
  log(name, JSON.stringify(info));
  // (frames stepped in the page: her health held; the pack's scene still, the wave's walking circles with a wave called in)
  const run = (n, timed, wave) => page.evaluate(async ({ n, timed, wave }) => {
    const w = window.witch, A = w.view.assets, times = [];
    for (let i = 0; i < n; i++) {
      w.game.witches[0].health.hp = 1e9;
      const c = wave ? { moveX: Math.cos(i / 40), moveZ: Math.sin(i / 40), toggleMode: false, zoom: 0, nextWave: wave === "call" && i === 0 } : { moveX: Math.cos(i / 120) * 0.4, moveZ: Math.sin(i / 120) * 0.4, toggleMode: false, zoom: 0 };
      const r = w.frame(c, 1 / 60, true);
      if (timed) times.push({ step: r.step, render: r.render, ms: { ...r.ms } });
      if (A.urgentKeys.size) await A.whenIdle(true);
      if (i % 30 === 29) await new Promise(r => setTimeout(r, 0));
    }
    return times;
  }, { n, timed, wave });
  if (name === "pack") await page.evaluate(() => window.witch.shot("challenge:0"));
  else { await run(30, false, "walk"); await run(1, false, "call"); }
  // (the art in before timing)
  for (let round = 0; round < 20; round++) {
    await run(10, false, name === "wave" && "walk");
    const p = await page.evaluate(() => window.witch.view.assets.pending);
    log(name, `art round ${round}: ${p} pending`);
    if (p === 0) break;
    for (let t = 0; t < 7200; t += 30) { if (await page.evaluate(() => window.witch.view.assets.pending) === 0) break; await new Promise(r => setTimeout(r, 30000)); log(name, `art: ${await page.evaluate(() => window.witch.view.assets.pending)} pending`); }
  }
  for (let done = 0; done < WARM; done += 60) { await run(Math.min(60, WARM - done), false, name === "wave" && "walk"); log(name, `warm ${done + 60}/${WARM}`); }
  const near = await page.evaluate(() => { const g = window.witch.game, ch = g.challenge, w = g.witch; if (!ch) return null; let hunting = 0, close = 0; for (const id of ch.pack) { const c = g.creatures[id]; if (c.hunting !== undefined) hunting++; if (Math.hypot(c.x - w.x, c.z - w.z) < 8) close++; } return { hunting, within8m: close }; });
  const times = await run(FRAMES, true, name === "wave" && "walk");
  if (name === "pack" && process.env.SHOT) await page.screenshot({ path: process.env.SHOT });
  const parts = {};
  for (const t of times) for (const [k, v] of Object.entries(t.ms)) (parts[k] ??= []).push(v);
  const byPart = Object.fromEntries(Object.entries(parts).map(([k, v]) => [k, +(v.reduce((a, b) => a + b, 0) / v.length).toFixed(2)]).sort((a, b) => b[1] - a[1]).slice(0, 14));
  const fx = await page.evaluate(() => { const v = window.witch.view; return { creaturesDrawn: v.creatureCount?.() ?? null }; }).catch(() => null);
  await page.close();
  return { ...info, near, frames: times.length, step: sum(times, t => t.step), render: sum(times, t => t.render), cpuNoDraw: sum(times, t => t.step + t.render - (t.ms.draw ?? 0)), total: sum(times, t => t.step + t.render), byPart, fx, errors: errors.slice(0, 5) };
}

(async () => {
  if (!fs.existsSync(path.join(root, "index.html"))) throw new Error(`no build in ${root}`);
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const result = { size: `${W}x${H}`, warm: WARM, frames: FRAMES };
  try { for (const s of SCENES) { result[s] = await scene(browser, server.address().port, s); log(s, JSON.stringify(result[s])); } }
  finally { await browser.close(); server.close(); }
  const text = JSON.stringify(result, null, 1);
  if (out) fs.writeFileSync(out, text);
  console.log(text);
})().catch(e => { console.error(e); process.exit(1); });
