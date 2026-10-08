// The party's life (rules/partyGuests.ts; render/view/creatures.ts): happy guests at the party's places, dancing on the beat.
// Loads the built game (DIST, default dist/) at 1280×720 on a seed, brings a crowd of the forest's creatures home as happy
// guests (window.witch.guest; on an older build, as they were: all round the dancefloor), puts each at its spot to save the
// walk, and saves stills over the busiest party place and over the dancefloor, and frames a beat apart at the party place.
//   npm run build && node tools/smoke/party-life.cjs <out dir> [seed]   (PARTY_AT=x,z to look at a given place)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/party-life", seed = "123"] = process.argv.slice(2);
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
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000 });
    await page.waitForFunction(() => window.witch.view.assets.partyObjectArt(), null, { timeout: 600000, polling: 1000 }); // (the party's decorations drawn)
    await page.waitForFunction(() => window.witch.game.clock.time > 6, null, { timeout: 600000, polling: 500 });
    const spots = await page.evaluate(() => {
      const W = window.witch, g = W.game, home = g.map.centreCell, D = g.map.dancefloor;
      // A crowd from all over the forest: two of each of several kinds, young and adult.
      const kinds = new Map();
      for (const c of g.creatures) if (!c.gone && !c.boss && c.level > 0 && c.level < 3 && (kinds.get(c.species) ?? 0) < 2 && kinds.size < 9) kinds.set(c.species, (kinds.get(c.species) ?? 0) + 1);
      const picked = g.creatures.filter(c => !c.gone && !c.boss && c.level > 0 && c.level < 3).filter(c => { const k = kinds.get(c.species); if (!k) return false; kinds.set(c.species, k - 1); return true; });
      const ids = picked.map(o => { const id = g.creatures.length; g.creatures.push({ ...o, id, cell: home, homeX: D.x, homeZ: D.z, x: D.x, z: D.z, fight: undefined, siege: undefined, enraged: false }); return id; });
      g.byArea = null;
      for (const id of ids) {
        const c = g.creatures[id];
        if (W.guest) W.guest(id); else { c.state = "happy"; c.anchorX = D.x; c.anchorZ = D.z; c.range = 10; c.dancing = true; } // (as before: round the dancefloor)
        const a = (id * 2.399) % (Math.PI * 2), d = c.range * 0.55; c.x = c.tx = c.anchorX + Math.cos(a) * d; c.z = c.tz = c.anchorZ + Math.sin(a) * d;
      }
      // (the guests at party places, each in its slot round one: grouped by place, a few metres across)
      const by = new Map(); for (const id of ids) { const c = g.creatures[id]; if (c.range >= 5) continue; const k = `${Math.round(c.anchorX / 6)},${Math.round(c.anchorZ / 6)}`, e = by.get(k) ?? { n: 0, x: 0, z: 0 }; e.n++; e.x += c.anchorX; e.z += c.anchorZ; by.set(k, e); }
      const best = [...by.values()].sort((a, b) => b.n - a.n)[0];
      return { party: best ? [+(best.x / best.n).toFixed(1), +(best.z / best.n).toFixed(1)] : [D.x + 18, D.z + 6], floor: [D.x, D.z], guests: ids.length, places: by.size };
    });
    console.log(JSON.stringify(spots));
    const fly = async ([x, z], name, frames) => {
      await page.evaluate(([x, z]) => { const g = window.witch.game; g.witch = { ...g.witch, x: x - 7, z: z + 5, seated: false, mode: "ground", lift: 0 }; }, [x, z]);
      await page.waitForTimeout(3000);
      await page.waitForFunction(t => window.witch.game.clock.time > t, (await page.evaluate(() => window.witch.game.clock.time)) + 3, { timeout: 600000, polling: 500 }); // (game time: the decorations pop up a couple of seconds after the party)
      await page.screenshot({ path: path.join(outDir, `${name}.png`) });
      console.log(name, "party objects drawn:", await page.evaluate(() => window.witch.view.partyObjects.count));
      if (process.env.LOG) console.log(await page.evaluate(n => window.witch.game.creatures.slice(-n).map(c => `${c.species} ${c.x.toFixed(1)},${c.z.toFixed(1)} anchor ${c.anchorX.toFixed(1)},${c.anchorZ.toFixed(1)} r${c.range}`).join("\n"), spots.guests));
      for (let i = 0; i < frames; i++) { await page.waitForTimeout(160); await page.screenshot({ path: path.join(outDir, `${name}-${i}.png`) }); }
    };
    await fly(process.env.PARTY_AT ? process.env.PARTY_AT.split(",").map(Number) : spots.party, "party-place", 6); // (PARTY_AT=x,z: the same place for a before-and-after)
    await fly(spots.floor, "dancefloor", 0);
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
})();
