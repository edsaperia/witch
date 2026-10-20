// Ten sails in place without growing (docs/plans/sail-without-reload.md, test C3; PR 5): serves the built game (dist/), loads
// island A with ?sail=inplace&quick=1&creator=0&debug=sail, starts it, then sails A→B→C→A… ten times through the real sail path
// (window.witch.sail: main.ts sailFromChart, as the map table's chart sails, its flight end given and its flight skipped), each
// landing, its art let in, then a few drawn frames and about 5 s of play stepped; after each landing it records the renderer's live
// textures, geometries and programs, the JS heap after a forced GC (CDP), the DOM's nodes, the listeners on window and document
// (CDP DOMDebugger), and the page's workers. Passes when, from sail 2 on, programs, listeners, workers and DOM nodes are the same
// after every sail, textures and geometries the same at each return to an island, and the heap within 5% of sail 2's; and no
// page error (under ?debug=sail a reader left on an old night that steps it throws: rules/game.ts stepGame). Then Back (C6): the
// pause menu open, the island and seed unchanged, the URL the night's; and the fallback (C4): a sail made to fail loads the
// island's link as the old way does. Writes previews/sail/leak.json.
// Run `npm run build` first. Playwright from the machine's global install.
//   node tools/sail/leak.cjs [out dir]   ISLANDS=home,fox,wolf SEEDS=123,4242,777 SAILS=10
const http = require("http");
const fs = require("fs");
const path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const root = path.resolve(__dirname, "../../dist");
const out = path.resolve(process.argv[2] || path.join(__dirname, "../../previews/sail"));
const ISLANDS = (process.env.ISLANDS || "home,fox,wolf").split(","), SEEDS = (process.env.SEEDS || "123,4242,777").split(",").map(Number), SAILS = Number(process.env.SAILS || 10);
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

const settled = page => page.waitForFunction(() => window.witch && window.witch.ready && window.witch.view.assets.pending === 0, null, { timeout: 2400000, polling: 500 });
async function play(page) {
  // a few drawn frames where she stands (the island's own GPU resources made), then about 5 s of play stepped, off the decks and back
  await page.evaluate(async ({ DT, idle }) => {
    window.witch.manual = true;
    for (let i = 0; i < 4; i++) { window.witch.frame(idle, DT, true); await new Promise(r => setTimeout(r, 0)); }
    for (let i = 0; i < 300; i++) { window.witch.frame({ ...idle, moveX: i < 150 ? 1 : -1 }, DT, i % 75 === 74); if (i % 30 === 29) await new Promise(r => setTimeout(r, 0)); }
    window.witch.manual = false;
  }, { DT, idle });
  await settled(page);
}

async function measure(page, cdp) {
  await cdp.send("HeapProfiler.collectGarbage");
  await cdp.send("HeapProfiler.collectGarbage");
  const heap = await cdp.send("Runtime.getHeapUsage");
  const listeners = async expr => { const { result } = await cdp.send("Runtime.evaluate", { expression: expr }); const r = await cdp.send("DOMDebugger.getEventListeners", { objectId: result.objectId }); await cdp.send("Runtime.releaseObject", { objectId: result.objectId }); return r.listeners.length; };
  const r = await page.evaluate(() => {
    const v = window.witch.view, i = v.renderer.info, g = window.witch.game;
    return { textures: i.memory.textures, geometries: i.memory.geometries, programs: (i.programs ?? []).length, dom: document.getElementsByTagName("*").length, island: g.tuning.map?.island, seed: g.seed, url: location.search };
  });
  return { ...r, heapMB: +(heap.usedSize / 1048576).toFixed(1), winListeners: await listeners("window"), docListeners: await listeners("document"), workers: page.workers().length };
}

async function main() {
  fs.mkdirSync(out, { recursive: true });
  const server = await serve(), port = server.address().port, errors = [], rows = [];
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--autoplay-policy=no-user-gesture-required"] });
  const context = await browser.newContext({ viewport: { width: 960, height: 540 } });
  const page = await context.newPage();
  page.on("pageerror", e => errors.push(e.message));
  page.on("console", m => { if (m.type() === "error") errors.push(`console: ${m.text()}`); });
  page.on("crash", () => { console.error("the page crashed"); process.exit(1); });
  const cdp = await context.newCDPSession(page);
  const base = `http://127.0.0.1:${port}/`;
  await page.goto(`${base}?island=${ISLANDS[0]}&seed=${SEEDS[0]}&quick=1&creator=0&sail=inplace&debug=sail`);
  log("loaded");
  await settled(page);
  log("ready");
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 120000 });
  await play(page);
  rows.push({ sail: 0, ...(await measure(page, cdp)), ms: 0 });
  log("boot", JSON.stringify(rows[0]));
  for (let s = 1; s <= SAILS; s++) {
    const k = s % ISLANDS.length, island = ISLANDS[k], seed = SEEDS[k], ts = Date.now();
    const inPlace = await page.evaluate(({ island, seed }) => window.witch.sail(island, seed), { island, seed });
    if (!inPlace) throw new Error(`sail ${s}: not in place`);
    await settled(page);
    await page.keyboard.press("Shift"); // (skips the flight in to her decks: it lands and the night starts)
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 120000 });
    const ms = Date.now() - ts;
    await play(page);
    const row = { sail: s, ...(await measure(page, cdp)), ms };
    rows.push(row);
    log(`sail ${s} → ${island}`, JSON.stringify(row));
    if (row.island !== island || row.seed !== seed) errors.push(`sail ${s}: on ${row.island} ${row.seed}, not ${island} ${seed}`);
  }

  // The checks, from sail 2 on.
  const fails = [], from = rows.filter(r => r.sail >= 2), r2 = rows.find(r => r.sail === 2);
  for (const k of ["programs", "winListeners", "docListeners", "workers", "dom"]) { const vals = [...new Set(from.map(r => r[k]))]; if (vals.length > 1) fails.push(`${k} differ from sail 2 on: ${from.map(r => r[k]).join(", ")}`); }
  for (const island of ISLANDS) {
    const at = from.filter(r => r.island === island);
    for (const k of ["textures", "geometries"]) { const vals = [...new Set(at.map(r => r[k]))]; if (vals.length > 1) fails.push(`${k} on ${island} differ between visits: ${at.map(r => r[k]).join(", ")}`); }
  }
  for (const r of from) if (r.heapMB > r2.heapMB * 1.05) fails.push(`heap at sail ${r.sail} ${r.heapMB} MB, over 5% above sail 2's ${r2.heapMB} MB`);

  // Back (C6): the pause menu, the night unchanged, its URL kept.
  const before = await page.evaluate(() => ({ url: location.search, seed: window.witch.game.seed, island: window.witch.game.tuning.map?.island }));
  await page.goBack({ timeout: 5000 }).catch(() => {}); // (the same page: a popstate, no load)
  await page.waitForFunction(() => document.getElementById("pause-sliders")?.classList.contains("open"), null, { timeout: 60000 }).catch(() => {});
  const after = await page.evaluate(() => ({ url: location.search, seed: window.witch.game.seed, island: window.witch.game.tuning.map?.island, paused: window.witch.game.clock.paused, menu: !!document.getElementById("pause-sliders")?.classList.contains("open") }));
  const back = { before, after, ok: after.menu && after.paused && after.url === before.url && after.seed === before.seed && after.island === before.island };
  log("Back", JSON.stringify(back));
  if (!back.ok) fails.push(`Back: ${JSON.stringify(back)}`);
  await page.keyboard.press("Escape"); // (resumed)

  // The fallback (C4): a sail made to fail loads the island's link as the old way does, quietly.
  const nav = page.waitForURL(u => /arrive=1/.test(String(u)), { timeout: 120000 }).then(() => page.url(), () => null);
  const ret = await page.evaluate(({ island, seed }) => window.witch.sail(island, seed, { fail: true }), { island: ISLANDS[1], seed: SEEDS[1] }).catch(e => `navigated (${String(e).slice(0, 60)})`);
  const went = await nav, want = `${base}?island=${ISLANDS[1]}&seed=${SEEDS[1]}&arrive=1`;
  const fallback = { returned: ret, went, ok: went === want };
  log("fallback", JSON.stringify(fallback));
  if (!fallback.ok) fails.push(`fallback: went to ${went}, not ${want}`);
  const real = errors.filter(e => !/sail in place: it went wrong/.test(e)); // (the fallback's own console line)

  fs.writeFileSync(path.join(out, "leak.json"), JSON.stringify({ islands: ISLANDS, seeds: SEEDS, rows, back, fallback, fails, errors: real }, null, 1));
  await browser.close(); server.close();
  const cols = ["sail", "island", "textures", "geometries", "programs", "heapMB", "dom", "winListeners", "docListeners", "workers", "ms"];
  console.log("\n| " + cols.join(" | ") + " |\n|" + cols.map(() => "---").join("|") + "|");
  for (const r of rows) console.log("| " + cols.map(c => r[c]).join(" | ") + " |");
  if (real.length) console.error("errors:\n" + real.join("\n"));
  console.log(fails.length ? `\nFAIL\n${fails.join("\n")}` : "\nok: flat over the sails");
  if (fails.length || real.length) process.exit(1);
}
main().catch(e => { console.error(e); process.exit(1); });
