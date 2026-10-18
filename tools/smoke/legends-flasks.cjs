// Ed's legends-and-flasks ruling (2026-10-18): the built game (DIST, default dist/) at 1280×720 on a seed. A quest done: one of
// the kind the nearest sleeping legend dreams of (a baby: any age will do) follows her into its circle, and it wakes happy, its
// island found tonight (the circle's panel says so). A flask drunk: on a flask's sigil with followers of each age, E drinks it and
// every one following her grows up to an adult. Fails on a page error or either not happening. Writes <out dir>/*.png.
//   npm run build && node tools/smoke/legends-flasks.cjs [out dir] [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/legends-flasks", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 600000, polling: 500 });
    const step = (o, dt = 0.05) => page.evaluate(([o, dt]) => { const w = window.witch, C = o => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }); w.manual = true; w.frame(C(o), dt); }, [o, dt]);
    const steps = async (n, o = {}) => { for (let i = 0; i < n; i++) await step(i === 0 ? o : {}); };
    // Followers: n of the wild, of a kind and level, leashed and on her stack beside her.
    const follow = (specs) => page.evaluate(specs => {
      const g = window.witch.game, w = g.witch, used = new Set(g.leash.stack);
      return specs.map(([species, level], i) => {
        const c = g.creatures.filter(c => !c.gone && !c.boss && !c.leashed && !used.has(c.id) && Math.hypot(c.x - w.x, c.z - w.z) > 200)[0]; used.add(c.id);
        const px = w.x - 5 + i * 3.5, pz = w.z + 3;
        Object.assign(c, { species: species ?? c.species, level, x: px, z: pz, tx: px, tz: pz, leashed: true, state: "leashed", enraged: false, siege: undefined, circle: undefined, hp: undefined, fight: undefined, asleep: undefined, napUntil: undefined, cell: g.map.cellSafe(px, pz).cell });
        g.leash.stack.push(c.id);
        return c.id;
      });
    }, specs);
    const levels = ids => page.evaluate(ids => ids.map(id => { const c = window.witch.game.creatures[id]; return `${c.species}${c.level}`; }).join(" "), ids);

    // 1. A quest done: the nearest sleeping legend with an open quest and a clearing; one of the kind it dreams of (a baby) follows
    // her into its circle; it wakes happy and the circle's panel says its island is found tonight.
    const L = await page.evaluate(() => {
      const g = window.witch.game, D = g.map.dancefloor, cl = g.map.legendClearings || [];
      const L = g.creatures.filter(c => c.boss && !c.gone && c.questOpen && c.quest && cl.some(k => Math.hypot(k.legend.x - c.x, k.legend.z - c.z) <= k.r)).sort((a, b) => Math.hypot(a.x - D.x, a.z - D.z) - Math.hypot(b.x - D.x, b.z - D.z))[0];
      const k = cl.find(q => Math.hypot(q.legend.x - L.x, q.legend.z - L.z) <= q.r);
      g.witch = { ...g.witch, x: k.x + k.r * 0.15, z: k.z + k.r * 0.5, seated: false, mode: "ground", lift: 0, vx: 0, vz: 0 };
      return { id: L.id, species: L.species, wants: L.quest.species, k };
    });
    console.log("legend", L.species, "dreams of", L.wants);
    await steps(60);
    await page.waitForTimeout(8000); // (the art round her in)
    await steps(20);
    await page.screenshot({ path: path.join(outDir, "quest-before.png") });
    const [gift] = await follow([[L.wants, 0]]);
    await page.evaluate(([gift, k]) => { const c = window.witch.game.creatures[gift]; Object.assign(c, { x: k.x - 2, z: k.z + k.r * 0.4, tx: k.x - 2, tz: k.z + k.r * 0.4 }); }, [gift, L.k]);
    await steps(30);
    const after = await page.evaluate(id => { const g = window.witch.game, c = g.creatures[id], el = document.querySelector(".legend-panel"); return { state: c.legendState, tonight: g.islandsTonight, panel: el && el.style.display !== "none" ? el.textContent : null }; }, L.id);
    console.log("quest done:", JSON.stringify(after));
    if (after.state !== "happy") errors.push(`quest: the legend is ${after.state}, not happy`);
    if (!after.tonight.includes(L.species)) errors.push("quest: its island isn't found tonight");
    await steps(40);
    await page.screenshot({ path: path.join(outDir, "quest-done.png") });

    // 2. A flask drunk: on the nearest flask's sigil, with a baby, a young one and an adult following; E drinks it.
    const r = await page.evaluate(() => {
      const g = window.witch.game, w = g.witch, r = g.relics.filter(r => r.state === "lying").sort((a, b) => Math.hypot(a.sx - w.x, a.sz - w.z) - Math.hypot(b.sx - w.x, b.sz - w.z))[0];
      for (const id of g.leash.stack.splice(0)) Object.assign(g.creatures[id], { leashed: false, gone: true });
      g.leash.placed.splice(0);
      g.witch = { ...g.witch, x: r.sx, z: r.sz + 1, seated: false, mode: "ground", lift: 0, vx: 0, vz: 0 };
      return { id: r.id, kind: r.kind, x: r.x, z: r.z };
    });
    await steps(60);
    await page.waitForTimeout(8000);
    const mine = await follow([[null, 0], [null, 1], [null, 0], [null, 2]]);
    await page.evaluate(([r]) => { const g = window.witch.game; g.witch = { ...g.witch, x: g.relics[r.id].sx, z: g.relics[r.id].sz }; }, [r]);
    await steps(30);
    console.log("before:", await levels(mine));
    await page.screenshot({ path: path.join(outDir, "flask-before.png") });
    await step({ place: true });
    await steps(4);
    await page.screenshot({ path: path.join(outDir, "flask-drinking.png") });
    await steps(60);
    const lv = await levels(mine), state = await page.evaluate(id => window.witch.game.relics[id].state, r.id);
    console.log("after:", lv, "flask", state);
    if (state !== "used") errors.push(`flask: ${state}, not drunk`);
    if (!lv.split(" ").every(s => s.endsWith("2"))) errors.push(`flask: followers ${lv}, not all adults`);
    await page.screenshot({ path: path.join(outDir, "flask-after.png") });
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log("ok");
})().catch(e => { console.error(e); process.exit(1); });
