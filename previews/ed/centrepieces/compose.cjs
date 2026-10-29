// Compose the centrepiece mocks: each captured frame with its centrepiece drawn in (draw.js), cropped to a tile with a label;
// the 3x3 grid (compass order, home in the middle) and each at 3x.
//   node compose.cjs <shots dir> <out dir>
const fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [shots, outDir] = process.argv.slice(2);
const meta = { ...(fs.existsSync(path.join(shots, "meta-home.json")) ? JSON.parse(fs.readFileSync(path.join(shots, "meta-home.json"))) : {}), ...JSON.parse(fs.readFileSync(path.join(shots, "meta.json"))) };
const ENEMY = [[200, 30, 70], [255, 40, 40], [255, 140, 30], [255, 226, 60]], FRIEND = [[255, 120, 200], [190, 150, 255], [110, 190, 255], [40, 225, 215]];
const SIZE = [0.81, 0.9, 1, 1.1];
// (bottom first: enemies, then friends above them, each side by rank: Ed's runestone stacks)
const stackOf = (own, friends) => [
  { sp: own, rgb: ENEMY[2], size: SIZE[2] }, { sp: own, rgb: ENEMY[1], size: SIZE[1] },
  { sp: friends[0], rgb: FRIEND[2], size: SIZE[2] }, { sp: friends[1], rgb: FRIEND[1], size: SIZE[1] }, { sp: friends[2] ?? friends[0], rgb: FRIEND[1], size: SIZE[1] },
];
// The grid in compass order: NW N NE / W home E / SW S SE.
const TILES = [
  { area: "moonpool-glade", name: "Moonpool glade", biome: "cold rainforest (NW)", piece: "moonpool", what: "moon pool", top: 0.3, reflect: true, own: "unicorn", friends: ["owl", "stag", "hare"] },
  { area: "snowy-taiga", name: "Snowy taiga", biome: "cold (N)", piece: "icedome", what: "frozen spring: an ice dome", top: 0.85, own: "wolf", friends: ["elk", "fox", "hare"] },
  { area: "crags", name: "Crags", biome: "mountains & glaciers (NE)", piece: "cushion", what: "moss campion cushion", top: 1.15, own: "ibex", friends: ["raven", "lynx", "hare"] },
  { area: "river-jungle", name: "River jungle", biome: "jungle (W)", piece: "rafflesia", what: "rafflesia flower", top: 0.6, own: "jaguar", friends: ["snake", "bat", "heron"] },
  { area: "old-oaks", name: "Old oaks", biome: "temperate (home)", piece: "stump", what: "great oak stump", top: 1.3, own: "fox", friends: ["hare", "owl", "stag"] },
  { area: "cinder-slopes", name: "Cinder slopes", biome: "volcanic (E)", piece: "basalt", what: "basalt columns", top: 1.9, own: "stegosaurus", friends: ["beetle", "moth", "boar"] },
  { area: "mangrove-pools", name: "Mangrove pools", biome: "mangrove swamp (SW)", piece: "lilypad", what: "giant water-lily pad", top: 0.6, own: "dragonfly", friends: ["heron", "crab", "snake"] },
  { area: "savanna", name: "Savanna", biome: "hot (S)", piece: "saltpan", what: "salt pan", top: 0.2, own: "lion", friends: ["elk", "snake", "hare"] },
  { area: "red-canyon", name: "Red canyon", biome: "badlands (SE)", piece: "geode", what: "open geode", top: 0.75, own: "scorpion", friends: ["snake", "lynx", "raven"] },
];
const TW = 1180, TH = 960, SW = Number(process.env.SW || 1600), SH = Number(process.env.SH || 1000);
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await playwright.chromium.launch(), page = await browser.newPage({ viewport: { width: 3700, height: 3000 } });
  page.on("console", m => console.log("page:", m.text()));
  page.on("pageerror", e => console.log("page error:", e.message));
  await page.setContent("<html><body></body></html>");
  await page.addScriptTag({ content: `window.SIGILS = ${fs.readFileSync(path.join(__dirname, "sigils.json"))};` });
  await page.addScriptTag({ content: fs.readFileSync(path.join(__dirname, "draw.js"), "utf8").replace("const PIECES", "var PIECES").replace(/SIGILS\[/g, "window.SIGILS[") });
  const tiles = [], report = [];
  for (const T of TILES) {
    const M = meta[T.area]; if (!M) { console.log("no capture for", T.area); continue; }
    const bg = "data:image/png;base64," + fs.readFileSync(path.join(shots, `${T.area}.png`)).toString("base64");
    const r = await page.evaluate(s => window.mock(s), { bg, meta: M, piece: T.piece, top: T.top, reflect: !!T.reflect, stack: stackOf(T.own, T.friends) });
    const full = Buffer.from(r.png.split(",")[1], "base64");
    fs.writeFileSync(path.join(outDir, `full-${T.area}.png`), full);
    const x0 = Math.round(Math.max(0, Math.min(SW - TW, r.at[0] - TW / 2))), y0 = Math.round(Math.max(0, Math.min(SH - TH, r.at[1] - TH + 330)));
    tiles.push({ T, png: r.png, x0, y0, at: r.at });
    report.push({ area: T.area, biome: T.biome, what: T.what, contrast: r.contrast });
    console.log(T.area, JSON.stringify(r.contrast));
  }
  // the grid and the 3x close-ups, drawn in the page
  const res = await page.evaluate(async ({ tiles, TW, TH }) => {
    const load = async s => { const im = new Image(); im.src = s; await im.decode(); return im; };
    const gap = 6, G = document.createElement("canvas"); G.width = TW * 3 + gap * 4; G.height = TH * 3 + gap * 4;
    const g = G.getContext("2d"); g.imageSmoothingEnabled = false; g.fillStyle = "#0b0b10"; g.fillRect(0, 0, G.width, G.height);
    const zooms = [];
    for (let i = 0; i < tiles.length; i++) {
      const t = tiles[i], im = await load(t.png), gx = gap + (i % 3) * (TW + gap), gy = gap + Math.floor(i / 3) * (TH + gap);
      g.drawImage(im, t.x0, t.y0, TW, TH, gx, gy, TW, TH);
      g.fillStyle = "rgba(0,0,0,0.72)"; g.fillRect(gx, gy + TH - 52, TW, 52);
      g.fillStyle = "#fff"; g.font = "bold 17px monospace"; g.fillText(`${t.T.name} · ${t.T.biome}`, gx + 12, gy + TH - 30);
      g.fillStyle = "#ffd98a"; g.font = "15px monospace"; g.fillText(t.T.what, gx + 12, gy + TH - 10);
      // 3x: the centrepiece and its ring, nearest
      const Z = document.createElement("canvas"), cw = 480, ch = 260; Z.width = cw * 3; Z.height = ch * 3 + 40;
      const z = Z.getContext("2d"); z.imageSmoothingEnabled = false; z.fillStyle = "#0b0b10"; z.fillRect(0, 0, Z.width, Z.height);
      z.drawImage(im, Math.round(t.at[0] - cw / 2), Math.round(t.at[1] - ch * 0.62), cw, ch, 0, 0, cw * 3, ch * 3);
      z.fillStyle = "#fff"; z.font = "bold 20px monospace"; z.fillText(`${t.T.name} · ${t.T.biome} · ${t.T.what} (3x)`, 12, ch * 3 + 28);
      zooms.push({ area: t.T.area, png: Z.toDataURL("image/png") });
    }
    return { grid: G.toDataURL("image/png"), zooms };
  }, { tiles, TW, TH });
  fs.writeFileSync(path.join(outDir, "centrepieces-grid.png"), Buffer.from(res.grid.split(",")[1], "base64"));
  for (const z of res.zooms) fs.writeFileSync(path.join(outDir, `3x-${z.area}.png`), Buffer.from(z.png.split(",")[1], "base64"));
  fs.writeFileSync(path.join(outDir, "contrast.json"), JSON.stringify(report, null, 1));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
