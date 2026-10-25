// The view taking another night in place (docs/plans/sail-without-reload.md, PR 4b: View.setGame), checked against a fresh page:
// serves the built game (dist/), loads seed A with ?debug=sail&quick=1&creator=0, starts it and steps a little, then swaps to seed B
// in place (window.witch.debugSwap: app/night.ts startNight, the view's setGame, its prepare, play started) and steps B as the bench's
// boot scene does; separately loads seed B fresh and steps it the same; each settled as the bench settles (tools/bench/frames.cjs:
// the page's clock held, the same moment drawn till it's the same twice running) and the game's canvas read (its own pixels, at the
// game's resolution: none of the HTML over it, the debug overlay's timings among them); then compares the two
// pixel by pixel (the differing pixels' count, box and a 12 by 6 grid; a diff picture). Also logs the renderer's live textures,
// geometries and programs after each step, and after swapping A to B to A to B, so the counts can be seen to come back.
// SAIL=1 (test C2, PR 5): the same through the real sail path instead, as the map table's chart sails (in place by default, the tuning's sail.inPlace;
// window.witch.sail: main.ts sailFromChart, the night recorded on the chart, its link pushed, the night made and started as a
// sail's is when the chart gives no flight end), A on ISLAND_A (home) and B on ISLAND_B (fox), the fresh page of B with the same
// switches; its files sail-*.png and sail.json.
// Run `npm run build` first. Playwright from the machine's global install.
//   node tools/sail/swap.cjs [out dir] (default previews/sail/)   A=123 B=165272 ISLAND_A=<island> ISLAND_B=<island> STEPS=60 SAIL=1
const http = require("http");
const fs = require("fs");
const path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const root = path.resolve(__dirname, "../../dist");
const out = path.resolve(process.argv[2] || path.join(__dirname, "../../previews/sail"));
const SAIL = !!process.env.SAIL, A = process.env.A || "123", B = process.env.B || "165272", STEPS = Number(process.env.STEPS || 60);
const ISLAND_A = process.env.ISLAND_A || (SAIL ? "home" : ""), ISLAND_B = process.env.ISLAND_B || (SAIL ? "fox" : "");
/** The files' names: the sail's apart from the debug swap's. */
const F = name => (SAIL ? `sail-${name}` : name);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png" };
const DT = 1 / 60, idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

function serve() {
  const server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
    const file = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
    if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise(r => server.listen(0, "127.0.0.1", () => r(server)));
}

// (the bench's own: frames stepped at a fixed 1/60 s without drawing, the page's clock the bench's while it settles)
const CLOCK = `(() => { const real = performance.now.bind(performance); let held = null; performance.now = () => (held === null ? real() : held); window.__benchClock = v => { held = v; }; })();`;
async function frames(page, n, c) {
  return page.evaluate(async ({ n, c, DT }) => {
    for (let i = 0; i < n; i++) { window.witch.frame(c, DT, false); if (i % 30 === 29) await new Promise(r => setTimeout(r, 0)); }
  }, { n, c, DT });
}
async function settle(page, file) {
  await page.evaluate(async () => {
    let t = 1e7;
    for (let k = 0; k < 80; k++) { window.__benchClock(t += 100); window.witch.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 0); if (k % 10 === 9) await new Promise(r => setTimeout(r, 30)); }
  });
  // Unlike the bench (two runs of one page, its art arriving alike), the page swapped in place already holds much of the art a fresh
  // one is still waiting for (the species', the page's own): so the art asked for is all let in, and the scenery listed again where
  // she is, before the shot (else what differs could be when the art came, not what the swap left behind).
  for (let round = 0; round < 10; round++) {
    await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 2400000, polling: 500 });
    const asked = await page.evaluate(async () => { window.witch.view.lastBuild.version = -1; for (let k = 0; k < 8; k++) { window.witch.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 0); await new Promise(r => setTimeout(r, 30)); } return window.witch.view.assets.pending; });
    if (!asked) break;
  }
  // (the game's canvas's own pixels, as drawn: none of the page's HTML over it, the debug overlay's timings among them)
  const shoot = async () => Buffer.from((await page.evaluate(() => document.getElementById("game").toDataURL("image/png"))).split(",")[1], "base64");
  let prev = null, same = 0, settled = false, tries = 0;
  for (let i = 0; i < 30; i++) {
    tries = i + 1;
    await page.evaluate(async () => { for (let k = 0; k < 4; k++) { window.witch.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 0); document.getAnimations().forEach(a => a.cancel()); await new Promise(r => setTimeout(r, 30)); } });
    const buf = await shoot();
    if (prev && buf.equals(prev)) { if (++same >= 2) { settled = true; break; } } else same = 0;
    prev = buf;
  }
  fs.writeFileSync(file, prev);
  await page.evaluate(() => window.__benchClock(null));
  return { settled, tries };
}
/** The renderer's live GPU resources and what's held of the art, and where the game is. */
const resources = page => page.evaluate(() => {
  const v = window.witch.view, i = v.renderer.info, g = window.witch.game;
  return { textures: i.memory.textures, geometries: i.memory.geometries, programs: (i.programs ?? []).length, sets: v.assets.sets(), gen: v.assets.gen, seed: g.seed, time: +g.clock.time.toFixed(3), x: +g.witch.x.toFixed(3), z: +g.witch.z.toFixed(3), scene: v.scene.children.length };
});
async function ready(page) {
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
  await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 2400000, polling: 1000 });
}
/** The map table's live chart off (its islands are a worker's, a race by the shot: as the bench does) and the spell cast long since. */
const steady = page => page.evaluate(() => { window.witch.manual = true; const v = window.witch.view; if (v.mapTable) { v.mapTable.drop(); v.mapTable.mesh.visible = false; v.mapTable = null; } });
const cast = page => page.evaluate(() => { const p = window.witch.game.party; if (p.spellAt === null) p.spellAt = -100; });
/** B's own steps (the bench's boot scene): off the decks, then the home ring booting. */
async function stepB(page) { await frames(page, 60, { ...idle, moveX: 1 }); await frames(page, 240, idle); }
async function swap(page, seed, island) {
  if (SAIL) {
    // (no flight end, as when the chart can't fly: the night starts as it's ready, with no real frames stepping it first, as the
    // fresh page's Enter starts it; tools/sail/leak.cjs flies in and skips)
    const inPlace = await page.evaluate(({ seed, island }) => window.witch.sail(island, Number(seed), { end: null }), { seed, island });
    if (!inPlace) throw new Error("the sail wasn't in place");
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 120000 });
  } else await page.evaluate(({ seed, island }) => window.witch.debugSwap(Number(seed), island || undefined), { seed, island });
  await ready(page);
  await steady(page);
  await cast(page);
}

async function compare(page, a, b, name) {
  const r = await page.evaluate(async ({ a, b }) => {
    const load = async s => { const i = new Image(); i.src = "data:image/png;base64," + s; await i.decode(); const c = document.createElement("canvas"); c.width = i.width; c.height = i.height; const x = c.getContext("2d"); x.drawImage(i, 0, 0); return { c, x, d: x.getImageData(0, 0, i.width, i.height) }; };
    const A = await load(a), B = await load(b);
    if (A.c.width !== B.c.width || A.c.height !== B.c.height) return { n: -1 };
    let n = 0, most = 0; const outp = A.x.createImageData(A.c.width, A.c.height), W = A.c.width, H = A.c.height;
    let x0 = W, y0 = H, x1 = -1, y1 = -1; const grid = new Array(72).fill(0);
    for (let k = 0; k < A.d.data.length; k += 4) {
      const d = Math.max(Math.abs(A.d.data[k] - B.d.data[k]), Math.abs(A.d.data[k + 1] - B.d.data[k + 1]), Math.abs(A.d.data[k + 2] - B.d.data[k + 2]));
      if (d) { n++; most = Math.max(most, d); outp.data[k] = 255; outp.data[k + 3] = 255; const px = (k >> 2) % W, py = Math.floor((k >> 2) / W); if (px < x0) x0 = px; if (px > x1) x1 = px; if (py < y0) y0 = py; if (py > y1) y1 = py; grid[Math.floor(py * 6 / H) * 12 + Math.floor(px * 12 / W)]++; }
      else { outp.data[k] = B.d.data[k] >> 2; outp.data[k + 1] = B.d.data[k + 1] >> 2; outp.data[k + 2] = B.d.data[k + 2] >> 2; outp.data[k + 3] = 255; }
    }
    A.x.putImageData(outp, 0, 0);
    return { n, most, total: A.d.data.length / 4, box: n ? [x0, y0, x1, y1] : null, grid: n ? Array.from({ length: 6 }, (_, r) => grid.slice(r * 12, r * 12 + 12).join(" ")) : null, diff: n ? A.c.toDataURL("image/png").split(",")[1] : null };
  }, { a: fs.readFileSync(a).toString("base64"), b: fs.readFileSync(b).toString("base64") });
  if (r.diff) fs.writeFileSync(path.join(out, `diff-${name}.png`), Buffer.from(r.diff, "base64"));
  delete r.diff;
  return r;
}

async function main() {
  fs.mkdirSync(out, { recursive: true });
  const server = await serve(), port = server.address().port, errors = [], report = { sail: SAIL, A, B, islandA: ISLAND_A || null, islandB: ISLAND_B || null };
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const context = await browser.newContext({ viewport: { width: 960, height: 540 } });
  const open = async (seed, island) => {
    const page = await context.newPage();
    await page.addInitScript(CLOCK);
    page.on("pageerror", e => errors.push(`seed ${seed}: ${e.message}`));
    page.on("console", m => { if (m.type() === "error") errors.push(`seed ${seed} console: ${m.text()}`); });
    await page.goto(`http://127.0.0.1:${port}/?${island ? `island=${island}&` : ""}seed=${seed}&quick=1&creator=0&debug=sail${SAIL ? "&opening=old" : ""}`); // (SAIL: the old landing at her decks, as the fresh page starts: a sail lands her in bed now, app/opening.ts sailLandsInBed)
    await ready(page);
    await steady(page);
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000 });
    await cast(page);
    return page;
  };

  // B fresh.
  log(`seed ${B} fresh`);
  const fresh = await open(B, ISLAND_B);
  await stepB(fresh);
  report.freshShot = await settle(fresh, path.join(out, F("fresh.png")));
  report.fresh = await resources(fresh);
  log("fresh", JSON.stringify(report.fresh));
  await fresh.close();

  // A, then B in place.
  log(`seed ${A}, then ${B} in place`);
  const page = await open(A, ISLAND_A);
  await frames(page, STEPS, { ...idle, moveX: 1 });
  report.a = await resources(page);
  log("A", JSON.stringify(report.a));
  await swap(page, B, ISLAND_B);
  report.ab0 = await resources(page);
  await stepB(page);
  report.swapShot = await settle(page, path.join(out, F("swapped.png")));
  report.ab = await resources(page);
  log("A→B", JSON.stringify(report.ab));
  report.pixels = await compare(page, path.join(out, F("fresh.png")), path.join(out, F("swapped.png")), F("swapped"));
  log("pixels", JSON.stringify(report.pixels));
  // And back and forth: A→B→A→B, the counts after each.
  await swap(page, A, ISLAND_A);
  await stepB(page);
  await settle(page, path.join(out, F("swapped-aba.png")));
  report.aba = await resources(page);
  log("A→B→A", JSON.stringify(report.aba));
  await swap(page, B, ISLAND_B);
  await stepB(page);
  report.ababShot = await settle(page, path.join(out, F("swapped-abab.png")));
  report.abab = await resources(page);
  log("A→B→A→B", JSON.stringify(report.abab));
  report.pixelsAbab = await compare(page, path.join(out, F("fresh.png")), path.join(out, F("swapped-abab.png")), F("swapped-abab"));
  log("pixels A→B→A→B", JSON.stringify(report.pixelsAbab));
  if (SAIL) report.url = await page.evaluate(() => location.search); // (the night's own link, pushed)
  await page.close();
  report.errors = errors;
  fs.writeFileSync(path.join(out, SAIL ? "sail.json" : "swap.json"), JSON.stringify(report, null, 1));
  await browser.close(); server.close();
  const counts = k => `${report[k].textures} textures, ${report[k].geometries} geometries, ${report[k].programs} programs`;
  console.log(`\nfresh B:   ${counts("fresh")}\nA:         ${counts("a")}\nA→B:       ${counts("ab")}\nA→B→A:     ${counts("aba")}\nA→B→A→B:   ${counts("abab")}`);
  console.log(`pixels differing, A→B against fresh B: ${report.pixels.n} of ${report.pixels.total}; A→B→A→B: ${report.pixelsAbab.n}`);
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
}
main().catch(e => { console.error(e); process.exit(1); });
