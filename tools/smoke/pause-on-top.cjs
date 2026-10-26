// The pause page over everything (Ed's playtest, 2026-10-23: "pause menu should go on top of e.g. map screen and other things
// like that"; platform/freeze.ts): each overlay opened in turn (the sea chart, the map table's chart, a dressing station, the
// Workshop's bay and pegboard, the telescope, the finds dev panel), then Esc: the pause page's sliders are
// on top where they stand, nothing of the overlay is hit in the middle of the screen, a key and the pad (a stubbed one: the
// d-pad, B) reach nothing under it, and Esc again comes back to the overlay as it was. Fails on any of those or a page error.
// `node tools/smoke/pause-on-top.cjs [dist]`; SHOTS=1 saves previews/pause-on-top-<case>.png.
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.argv[2] || "dist");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".ogg": "audio/ogg", ".wasm": "application/wasm", ".woff2": "font/woff2" };
const H = require("../../config/house/load.mjs").loadHouse();
const fail = [];
const check = (ok, what) => { console.log(`${ok ? "ok  " : "FAIL"} ${what}`); if (!ok) fail.push(what); };
/** Where she stands to use object `id`: on its side facing its room's middle (the hub's for the hub's), `gap` m off it. */
const front = (id, gap = 0.7) => {
  const o = H.objects.find(q => q.id === id), r = H.rooms.find(q => q.id === o.room); // (the oak's rooms' boxes overlap: its own)
  const cx = r ? (r.x0 + r.x1) / 2 : 0, cz = r ? (r.z0 + r.z1) / 2 : 0, dx = cx - o.x, dz = cz - o.z, side = Math.abs(dx) > Math.abs(dz);
  return side ? [o.x + Math.sign(dx || 1) * (o.w / 2 + gap), o.z] : [o.x, o.z + Math.sign(dz || 1) * (o.d / 2 + gap)];
};
// Each case: how it opens, what of it shows, and something of it to compare before and after the pause (it mustn't change).
const CASES = [
  { id: "sea-chart", open: p => p.evaluate(() => window.witch.chart()), sel: "#chart-overlay" },
  { id: "map-table", at: "mapTable", sel: "#chart-overlay" },
  { id: "wardrobe", at: "wardrobe", sel: "#station-panel.in", state: true },
  { id: "broom-bay", at: "broomBay", sel: "#station-panel.in", state: true },
  { id: "pegboard", at: "pegboard", sel: "#station-panel.in", state: true },
  // (at an instrument Esc is hers, Ed 2026-10-23: "Esc (a gamepad's B) steps her away, the next Esc pauses": so not here)
  { id: "telescope", open: p => p.evaluate(() => window.witch.telescope.look(0, 0.5)), on: () => window.witch.telescope.on },
  { id: "finds-dev", open: p => p.evaluate(() => document.getElementById("finds-dev-btn")?.click()), sel: "#finds-dev.on" },
];
(async () => {
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--autoplay-policy=no-user-gesture-required"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on("pageerror", e => errors.push(`page error: ${e.message}`));
  // A pad of our own (window.__pad: null, none; else its pressed buttons), and a count of the keys that reach the document.
  await page.addInitScript(() => {
    window.__pad = null; window.__keys = 0;
    const pad = () => { const p = window.__pad; return p ? { connected: true, index: 0, id: "stub", mapping: "standard", axes: [0, 0, 0, 0], buttons: Array.from({ length: 17 }, (_, i) => ({ pressed: p.includes(i), value: p.includes(i) ? 1 : 0 })) } : null; };
    Object.defineProperty(Navigator.prototype, "getGamepads", { configurable: true, writable: true, value: () => [pad(), null, null, null] });
    document.addEventListener("keydown", () => { window.__keys++; });
  });
  await page.goto(`http://127.0.0.1:${server.address().port}/?creator=0&quick=1&seed=123&wave=off&debug`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 300000, polling: 500 });
  const put = ([x, z]) => page.evaluate(([x, z]) => { const g = window.witch.game, T = g.map.treehouse; g.witch = { ...g.witch, x: T.x + x, z: T.z + z, vx: 0, vz: 0, mode: "ground", lift: 0, perch: true, seated: false }; }, [x, z]);
  const away = () => page.evaluate(() => { const g = window.witch.game, T = g.map.treehouse; g.witch = { ...g.witch, x: T.x, z: T.z + 1, vx: 0, vz: 0 }; });
  const paused = () => page.evaluate(() => !!document.querySelector("#pause-sliders.open"));
  for (const C of CASES) {
    // open it
    const isOpen = () => C.on ? page.evaluate(C.on) : page.evaluate(([sel, shown]) => { const e = document.querySelector(sel); return !!e && (!shown || getComputedStyle(e).display !== "none"); }, [C.sel, !!C.shown]);
    // (a house object: stood at it, then E, pressed till the rules' step has seen her there: nothing opens by nearness, Ed's playtest of 2026-10-26)
    if (C.at) { await put(front(C.at)); for (let i = 0; i < 20 && (await isOpen()); i++) await page.waitForTimeout(500); /* (the last station's panel out as she leaves it) */ for (let i = 0; i < 5 && !(await isOpen()); i++) { await page.keyboard.press("KeyE"); for (let j = 0; j < 40 && !(await isOpen()); j++) await page.waitForTimeout(500); } /* (one E, then up to 20 s for a slow frame to see it: E closes it too) */ } else await C.open(page);
    try { await page.waitForFunction(C.on ? C.on : ([sel, shown]) => { const e = document.querySelector(sel); return !!e && (!shown || getComputedStyle(e).display !== "none"); }, C.on ? null : [C.sel, !!C.shown], { timeout: 120000, polling: 250 }); }
    catch { check(false, `${C.id}: opens`); continue; }
    await page.waitForTimeout(1500); // (slid in)
    // (the focus as its line and place along it: the panel repaints its cards on its own)
    const focus = () => page.evaluate(() => [...document.querySelectorAll("#station-panel .focus")].map(e => { const l = e.closest("[data-line]"); return `${l?.dataset.line}:${l?.dataset.col ?? e.dataset.col ?? ""}`; }).join(" "));
    const before = C.state ? await focus() : null;
    // pause
    await page.keyboard.press("Escape");
    try { await page.waitForFunction(() => !!document.querySelector("#pause-sliders.open"), null, { timeout: 120000, polling: 250 }); } catch { /* checked below */ }
    // (the sliders slid all the way in: a .22 s transition, slower under a software GL's long frames)
    try { await page.waitForFunction(() => (document.getElementById("pause-sliders")?.getBoundingClientRect().left ?? -1) >= 0, null, { timeout: 30000, polling: 200 }); } catch { /* checked below */ }
    check(await paused(), `${C.id}: Esc pauses`);
    check(await isOpen(), `${C.id}: the overlay is still there under the pause`);
    const top = await page.evaluate(() => {
      const s = document.getElementById("pause-sliders")?.getBoundingClientRect(), mid = (x, y) => document.elementFromPoint(x, y);
      const atSliders = s ? mid(s.left + s.width / 2, s.top + Math.min(200, s.height / 2)) : null;
      const atMiddle = mid(innerWidth * 0.62, innerHeight / 2);
      const under = ["#chart-overlay", "#station-panel", "#studio-panel", "#finds-dev", "canvas"];
      const tag = e => e ? `${e.tagName}#${e.id}.${typeof e.className === "string" ? e.className : ""}` : "none";
      return { sliders: !!atSliders?.closest("#pause-sliders"), at: tag(atSliders), box: s ? [s.left, s.top, s.width, s.height].map(Math.round).join(",") : "none", middle: under.find(q => atMiddle?.closest(q)) ?? null, what: atMiddle ? `${atMiddle.tagName}#${atMiddle.id}.${atMiddle.className}` : "none" };
    });
    check(top.sliders, `${C.id}: the pause page's sliders are on top where they stand (${top.at}; sliders at ${top.box})`);
    if (!top.sliders) { // (what kept them out: a sighting on CI that doesn't happen here; the next one says why)
      const why = await page.evaluate(() => new Promise(res => {
        const el = document.getElementById("pause-sliders"), t0 = document.timeline.currentTime, p0 = performance.now(); let frames = 0;
        const tick = () => { frames++; if (performance.now() - p0 < 2000) requestAnimationFrame(tick); else res({ cls: el?.className, transform: el ? getComputedStyle(el).transform : null, transition: el ? getComputedStyle(el).transition : null, anims: el ? el.getAnimations().map(a => `${a.playState} ${a.currentTime}`) : [], timeline: [t0, document.timeline.currentTime], frames, left: el?.getBoundingClientRect().left, frozen: !!document.querySelector("#pause-shield")?.offsetParent, panel: document.getElementById("station-panel")?.className, hidden: document.hidden, visibility: document.visibilityState }); };
        requestAnimationFrame(tick);
      }));
      console.log(`  ${C.id}: sliders out: ${JSON.stringify(why)}`);
    }
    check(top.middle === null, `${C.id}: nothing under the pause takes a click in the middle (${top.what})`);
    if (process.env.SHOTS) { fs.mkdirSync("previews", { recursive: true }); await page.screenshot({ path: `previews/pause-on-top-${C.id}.png` }); }
    // keys and the pad reach nothing under it
    const k0 = await page.evaluate(() => window.__keys);
    for (const key of ["ArrowDown", "ArrowRight", "KeyD", "Enter", "KeyE"]) await page.keyboard.press(key);
    check(await page.evaluate(() => window.__keys) === k0, `${C.id}: keys reach nothing under the pause`);
    await page.evaluate(() => { window.__pad = [13, 15]; }); await page.waitForTimeout(700);
    await page.evaluate(() => { window.__pad = [1]; }); await page.waitForTimeout(700);
    await page.evaluate(() => { window.__pad = null; }); await page.waitForTimeout(300);
    check(await paused(), `${C.id}: the pad didn't unpause it`);
    check(await isOpen(), `${C.id}: the pad's B didn't shut the overlay under the pause`);
    if (C.state) { const after = await focus(); check(after === before, `${C.id}: the d-pad and keys didn't move its focus (${before} → ${after})`); }
    // resume: back to it as it was
    await page.keyboard.press("Escape");
    await page.waitForTimeout(800);
    check(!(await paused()), `${C.id}: Esc resumes`);
    check(await isOpen(), `${C.id}: back to the overlay on resume`);
    // close it for the next one
    if (C.id === "sea-chart") await page.evaluate(() => document.querySelector("#chart-overlay button[title*='lose'], #chart-overlay .close")?.click());
    if (C.id === "map-table") { await page.keyboard.press("KeyE"); await page.waitForTimeout(600); } // (E again: it's put away; walking doesn't, Ed 2026-10-26)
    if (C.on) await page.evaluate(() => window.witch.telescope.close());
    if (C.id === "finds-dev") await page.evaluate(() => document.getElementById("finds-dev-btn")?.click());
    await away(); await page.waitForTimeout(1500);
    if (await page.evaluate(() => !!document.querySelector("#chart-overlay"))) console.log(`info ${C.id}: a chart is still up after it`);
  }
  check(errors.length === 0, `no page errors${errors.length ? ": " + errors.slice(0, 3).join("; ") : ""}`);
  await browser.close(); server.close();
  if (fail.length) { console.log(`FAILED (${fail.length}):\n` + fail.join("\n")); process.exit(1); }
  console.log("all ok");
})().catch(e => { console.error(e); process.exit(1); });
