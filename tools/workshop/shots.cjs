// The Workshop's room in play (Ed, 2026-10-22/23; docs/backlog/workshop.md): the built game (DIST, default dist/) at 1600×900, her
// broom's save set first (FOUND, the parts found, default six of them; FITTED, those on her broom, default the Rocket set) and
// tonight's find made a part she hasn't found (TONIGHT, default the Curled tip), then she's stood at the broom's one station, the
// lathe (Ed, 2026-10-29), its menu in (`broom.png`; a card chosen: `broom-fit.png`, the Ladder in the chassis, the Pile driver
// whole; card by card down to its colours, `broom-colours.png`, and its pegboard, `broom-pegboard.png`), and in the room's middle,
// the menu away, her broom and the parts on the pegboard (`room.png`), then closer to the bay and the pegboard, scenery now
// (`pegboard-near.png`, `bay-near.png`), and on the Terrace carrying her broom (`terrace.png`, `terrace-walk.png`).
// Fails on a page error, or a station whose menu doesn't come in.
//   npm run build && node tools/workshop/shots.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/workshop-room", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const H = require("../../config/house/load.mjs").loadHouse();
const FOUND = (process.env.FOUND ?? "missile,fairing,nozzles,ladder,twigs,canoe").split(",").filter(Boolean);
const [tip = null, chassis = null, exhaust = null] = (process.env.FITTED ?? "missile,fairing,nozzles").split(",").map(s => s || null);
const TONIGHT = process.env.TONIGHT ?? "curl";
const room = H.rooms.find(r => r.id === "workshop"), cx = (room.x0 + room.x1) / 2, cz = (room.z0 + room.z1) / 2;
/** Where she stands to use object `id` (as rules/houseRooms.ts objectFront: on its side facing the room's middle), `gap` m off it. */
const front = (id, gap = 0.7) => {
  const o = H.objects.find(q => q.id === id), dx = cx - o.x, dz = cz - o.z, side = Math.abs(dx) > Math.abs(dz);
  return side ? [o.x + Math.sign(dx) * (o.w / 2 + gap), o.z] : [o.x, o.z + Math.sign(dz) * (o.d / 2 + gap)];
};
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], out = {};
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.addInitScript(([found, fitted]) => { try { localStorage.setItem("witch.broom", JSON.stringify({ v: 1, found, fitted })); } catch { /* */ } }, [FOUND, { tip, chassis, exhaust }]);
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off&opening=old`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 600000, polling: 500 });
    // tonight's find a part she hasn't found (its cell glows on the pegboard)
    await page.evaluate(item => { const g = window.witch.game; if (g.trunk) Object.assign(g.trunk, { kind: "part", item, found: false }); }, TONIGHT);
    const put = ([x, z]) => page.evaluate(([x, z]) => { const g = window.witch.game, Th = g.map.treehouse; g.witch = { ...g.witch, x: Th.x + x, z: Th.z + z, vx: 0, vz: 0, mode: "ground", lift: 0, perch: true, seated: false }; }, [x, z]);
    // (the camera brought to her: in the house the night runs at a tenth, so the real loop's frames, slow under a software GL, would
    // take minutes to ease it there; stepped by hand, then the loop back on for the station's menu)
    const settle = () => page.evaluate(() => { const w = window.witch; w.manual = true; for (let i = 0; i < 240; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, i % 60 === 59); w.manual = false; });
    const shot = async name => { await page.screenshot({ path: path.join(outDir, `${name}.png`), timeout: 300000 }); console.log("shot", name); };
    const at = async id => {
      await put(front(id)); await settle();
      for (let i = 0; i < 5 && !(await page.evaluate(() => !!document.querySelector("#station-panel.in"))); i++) { await page.keyboard.press("KeyE"); for (let j = 0; j < 40 && !(await page.evaluate(() => !!document.querySelector("#station-panel.in"))); j++) await page.waitForTimeout(500); } /* (one E, then up to 20 s for a slow frame to see it: E closes it too) */ // (E at it: Ed's playtest, 2026-10-26)
      await page.waitForFunction(id => document.querySelector("#station-panel.in") && document.querySelector("#station-panel .sp-head b")?.textContent, id, { timeout: 300000, polling: 500 });
      await page.waitForTimeout(12000); // (its pictures baked a few a frame; the camera easing in)
      out[id] = await page.evaluate(() => document.querySelector("#station-panel .sp-head")?.textContent);
    };
    // the broom's one station at the lathe (Ed, 2026-10-29: "The broom area can probably just be one station instead of two"): its
    // part cards first, then (PageDown, card by card) its colours and fit, then the pegboard
    await at("lathe"); await shot("broom");
    // a card chosen: down to the chassis's line (the Jet-bike fairing, fitted), one along to the Ladder, chosen (Space: choose to
    // change, Ed 2026-10-28): on her broom at once, the Pile driver whole (the Ladder and the Jet nozzles: Ground pound)
    await page.keyboard.press("ArrowDown"); await page.waitForTimeout(800);
    await page.keyboard.press("ArrowRight"); await page.waitForTimeout(800);
    await page.keyboard.press("Space"); await page.waitForTimeout(6000);
    out.fitted = await page.evaluate(() => window.witch.game.spells.parts);
    out.spell = await page.evaluate(() => window.witch.game.spells.broom);
    await shot("broom-fit");
    for (let i = 0; i < 3; i++) { await page.keyboard.press("PageDown"); await page.waitForTimeout(500); }
    await page.waitForTimeout(3000); await shot("broom-colours");
    for (let i = 0; i < 3; i++) { await page.keyboard.press("PageDown"); await page.waitForTimeout(500); }
    await page.waitForTimeout(3000); await shot("broom-pegboard");
    out.cards = await page.evaluate(() => [...document.querySelectorAll("#station-panel .sp-shelf .sp-lab b")].map(e => e.textContent));
    await put([cx, cz + 2.5]); await settle();
    await page.waitForFunction(() => !document.querySelector("#station-panel.in"), null, { timeout: 120000, polling: 500 });
    await page.waitForTimeout(10000);
    await shot("room");
    // closer, the menus away (she stands past a station's reach): the pegboard's parts, her broom on the bay
    for (const [id, name] of [["pegboard", "pegboard-near"], ["broomBay", "bay-near"]]) { // (scenery now: no prompt, no menu)
      await put(front(id, 3.2)); await settle();
      await page.waitForFunction(() => !document.querySelector("#station-panel.in"), null, { timeout: 120000, polling: 500 });
      await page.waitForTimeout(8000);
      await shot(name);
    }
    // on the Terrace (the hub's floor) she carries her broom (Ed, 2026-10-23: "she holds it when she's on the terrace"), standing and
    // walking a step
    await put([0, 3]); await settle();
    await page.waitForTimeout(6000);
    await shot("terrace");
    await page.evaluate(() => { const w = window.witch; w.manual = true; for (let i = 0; i < 25; i++) w.frame({ moveX: 1, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, i === 24); w.manual = false; });
    await shot("terrace-walk");
  } finally { await browser.close(); server.close(); }
  console.log(JSON.stringify(out));
  if (errors.length) { console.error("page errors:\n" + errors.join("\n")); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
