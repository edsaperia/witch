// The challenge pack's frame time (Ed, 2026-11-03: "128 animal pack is the ultimate challenge"), in headless Chromium on the built
// game: the late-campaign home with every kind known (KINDS, 64 by default: a 128-animal pack), her down in the middle of its circle
// (?shot=challenge:0, app/shot.ts) with her health held, the pack watching, then hunting her; and, for comparison on the same
// machine, the bench's own wave fight (tools/bench/frames.cjs "wave-fight": a debug arena below the dancefloor, a wave called in).
// Each frame stepped at a fixed 1/60 s (window.witch.frame, rules then view): the rules' step, the view's render and its parts; the
// warm-up and FRAMES timed frames undrawn (the view's CPU work alone: in the cloud the `draw` part is the software renderer's,
// SwiftShader, seconds a frame with the 128 animals), then DRAWN (30) drawn. Each chunk logged as it goes.
//   npx vite build && node tools/bench/pack-frames.cjs [out.json]
// KINDS (64), SEED (1), SIZE (1280x720), WARM (frames before timing, 360: the wild watch's 4 s and the pack closing in), FRAMES
// (timed, 240), SCENES (pack,wave), DIST (dist/), SHOT (a png of the pack's last frame, optional), ABOVE (a png of the circle
// from over the treetops, zoomed out, optional), SCENE (the pack's shot scene, challenge:0; e.g. challenge:0,won=8), PROFILE (a path prefix: the undrawn timed frames' CPU profile).
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const out = process.argv[2];
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const [W, H] = (process.env.SIZE || "1280x720").split("x").map(Number), WARM = Number(process.env.WARM || 360), FRAMES = Number(process.env.FRAMES || 240), DRAWN = Number(process.env.DRAWN || 30);
const KINDS = Number(process.env.KINDS || 64), SEED = process.env.SEED || 1, SCENES = (process.env.SCENES || "pack,wave").split(",");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.error(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);
// (every kind she can know, home's 10 first: rules/rosters.ts knownKinds; the link's ?found= takes them)
const KNOWN = "hedgehog,squirrel,hare,fox,bee,stoat,mole,snail,dormouse,badger,beetle,boar,otter,heron,newt,woodlouse,moth,bat,toad,raven,elk,wolf,lynx,ram,salamander,spider,snake,cat,stag,beaver,bear,owl,arcticfox,ibex,redpanda,komodo,meerkat,armadillo,fennec,lion,crocodile,dragonfly,tiger,flyingsquirrel,roe,penguin,frosttroll,snowleopard,frostwyrm,griffin,sphinx,stegosaurus,rattlesnake,scorpion,rhino,cheetah,hydra,crab,featheredserpent,elephant,jaguar,raccoon,unicorn,polarbear".split(",");

const pct = (s, p) => s[Math.min(s.length - 1, Math.floor(p * s.length))];
const sum = (times, f) => { const v = times.map(f).sort((a, b) => a - b), m = v.reduce((a, b) => a + b, 0) / Math.max(1, v.length); return { mean: +m.toFixed(2), p50: +pct(v, 0.5).toFixed(2), p95: +pct(v, 0.95).toFixed(2), worst: +v[v.length - 1].toFixed(2) }; };

async function scene(browser, port, name) {
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  const errors = [];
  page.on("pageerror", e => errors.push(e.message));
  page.on("crash", () => log(name, "PAGE CRASHED"));
  page.on("console", m => { if (m.type() === "error") log(name, "console error:", m.text().slice(0, 200)); });
  const found = KNOWN.slice(10, KINDS).join(",");
  const q = name === "pack" ? `?shot=challenge:0&island=home&found=${found}&seed=${SEED}&creator=0` : `?opening=old&loadmist=0&quick=1&creator=0&seed=${SEED}&arena=wolf*3@2,boar*2@1`;
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
  const run = (n, timed, wave, draw = true) => page.evaluate(async ({ n, timed, wave, draw }) => {
    const w = window.witch, A = w.view.assets, times = [];
    for (let i = 0; i < n; i++) {
      w.game.witches[0].health.hp = 1e9;
      const c = wave ? { moveX: Math.cos(i / 40), moveZ: Math.sin(i / 40), toggleMode: false, zoom: 0, nextWave: wave === "call" && i === 0 } : { moveX: Math.cos(i / 120) * 0.4, moveZ: Math.sin(i / 120) * 0.4, toggleMode: false, zoom: 0 };
      const r = w.frame(c, 1 / 60, draw);
      if (timed) times.push({ step: r.step, render: r.render, ms: { ...r.ms } });
      if (A.urgentKeys.size) await A.whenIdle(true);
      if (i % 30 === 29) await new Promise(r => setTimeout(r, 0));
    }
    return times;
  }, { n, timed, wave, draw });
  if (name === "pack") await page.evaluate(s => window.witch.shot(s), process.env.SCENE || "challenge:0");
  else { await run(30, false, "walk"); await run(1, false, "call"); }
  // (the art in before timing)
  for (let round = 0; round < 20; round++) {
    await run(10, false, name === "wave" && "walk", round === 0);
    const p = await page.evaluate(() => window.witch.view.assets.pending);
    log(name, `art round ${round}: ${p} pending, heap ${await page.evaluate(() => Math.round((performance.memory?.usedJSHeapSize ?? 0) / 2 ** 20))} MB`);
    if (p === 0) break;
    for (let t = 0; t < 7200; t += 30) { if (await page.evaluate(() => window.witch.view.assets.pending) === 0) break; await new Promise(r => setTimeout(r, 30000)); log(name, `art: ${await page.evaluate(() => window.witch.view.assets.pending)} pending`); }
  }
  for (let done = 0; done < WARM; done += 60) { await run(Math.min(60, WARM - done), false, name === "wave" && "walk", false); log(name, `warm ${done + 60}/${WARM}`); }
  const near = await page.evaluate(() => { const g = window.witch.game, ch = g.challenge, w = g.witch; if (!ch) return null; let hunting = 0, close = 0; for (const id of ch.pack) { const c = g.creatures[id]; if (c.hunting !== undefined) hunting++; if (Math.hypot(c.x - w.x, c.z - w.z) < 8) close++; } return { hunting, within8m: close }; });
  // (timed in chunks, each logged: the view's CPU work without drawing (the software renderer's draw is no guide), then a few drawn)
  const times = [], drawn = [];
  const chunk = (t, what) => log(name, `${what} ${t.length}: cpu ${sum(t, q => q.step + q.render - (q.ms.draw ?? 0)).mean} ms, step ${sum(t, q => q.step).mean} ms, total ${sum(t, q => q.step + q.render).mean} ms`);
  // (PROFILE: the page's CPU profile over the undrawn timed frames, to <PROFILE>-<scene>.cpuprofile; build with --minify false for names)
  const cdp = process.env.PROFILE ? await page.context().newCDPSession(page) : null;
  if (cdp) { await cdp.send("Profiler.enable"); await cdp.send("Profiler.setSamplingInterval", { interval: 200 }); await cdp.send("Profiler.start"); }
  for (let done = 0; done < FRAMES; done += 30) { times.push(...await run(Math.min(30, FRAMES - done), true, name === "wave" && "walk", false)); chunk(times, "undrawn"); }
  if (cdp) { const { profile } = await cdp.send("Profiler.stop"); fs.writeFileSync(`${process.env.PROFILE}-${name}.cpuprofile`, JSON.stringify(profile)); }
  for (let done = 0; done < DRAWN; done += 10) { drawn.push(...await run(Math.min(10, DRAWN - done), true, name === "wave" && "walk", true)); chunk(drawn, "drawn"); }
  if (name === "pack" && process.env.SHOT) await page.screenshot({ path: process.env.SHOT, timeout: 600000 });
  // (ABOVE: a picture of the whole circle from over the treetops, zoomed out, after the timing)
  if (name === "pack" && process.env.ABOVE) {
    await page.evaluate(() => window.witch.shot(`challenge:${Math.round(window.witch.game.challenge.radius * 0.6)},treetop`));
    await page.evaluate(() => { const w = window.witch; for (let i = 0; i < 90; i++) { w.game.witches[0].health.hp = 1e9; w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: i < 8 ? 1 : 0 }, 1 / 60, i > 80); } });
    await page.screenshot({ path: process.env.ABOVE, timeout: 600000 });
  }
  const parts = {};
  for (const t of times) for (const [k, v] of Object.entries(t.ms)) (parts[k] ??= []).push(v);
  const byPart = Object.fromEntries(Object.entries(parts).map(([k, v]) => [k, +(v.reduce((a, b) => a + b, 0) / v.length).toFixed(2)]).sort((a, b) => b[1] - a[1]).slice(0, 14));
  const fx = await page.evaluate(() => { const v = window.witch.view; return { creaturesDrawn: v.creatureCount?.() ?? null }; }).catch(() => null);
  await page.close();
  return { ...info, near, frames: times.length, step: sum(times, t => t.step), render: sum(times, t => t.render), cpuNoDraw: sum(times, t => t.step + t.render - (t.ms.draw ?? 0)), byPart, drawn: { frames: drawn.length, step: sum(drawn, t => t.step), render: sum(drawn, t => t.render), total: sum(drawn, t => t.step + t.render), draw: sum(drawn, t => t.ms.draw ?? 0) }, fx, errors: errors.slice(0, 5) };
}

(async () => {
  if (!fs.existsSync(path.join(root, "index.html"))) throw new Error(`no build in ${root}`);
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--js-flags=--max-old-space-size=8192"] });
  const result = { size: `${W}x${H}`, warm: WARM, frames: FRAMES };
  try { for (const s of SCENES) { result[s] = await scene(browser, server.address().port, s); log(s, JSON.stringify(result[s])); } }
  finally { await browser.close(); server.close(); }
  const text = JSON.stringify(result, null, 1);
  if (out) fs.writeFileSync(out, text);
  console.log(text);
})().catch(e => { console.error(e); process.exit(1); });
