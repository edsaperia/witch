// The stump sheet: each biome's species on its own area's frame, 4 variants (seed, angle) side by side, and the 3x3 grid.
//   node sheet.cjs <shots dir> <out dir>
const fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [shots, outDir] = process.argv.slice(2);
const meta = JSON.parse(fs.readFileSync(path.join(shots, "meta.json")));
const ROWS = (process.env.ONLY ? r => r.filter(x => process.env.ONLY.split(",").includes(x[1])) : r => r)([
  ["moonpool-glade", "cedar", "Moonpool glade · cold rainforest (NW) · red cedar"],
  ["snowy-taiga", "spruce", "Snowy taiga · cold (N) · spruce, frosted"],
  ["crags", "pine", "Crags · mountains (NE) · Scots pine, slabbed"],
  ["river-jungle", "kapok", "River jungle · jungle (W) · kapok, plank buttresses"],
  ["old-oaks", "oak", "Old oaks · temperate (home) · oak"],
  ["cinder-slopes", "charred", "Cinder slopes · volcanic (E) · charred"],
  ["mangrove-pools", "mangrove", "Mangrove pools · swamp (SW) · stilt roots"],
  ["savanna", "baobab", "Savanna · hot (S) · baobab"],
  ["red-canyon", "juniper", "Red canyon · badlands (SE) · juniper, twisted"],
]);
const VARS = [[1, 0], [2, 1.7], [3, 3.4], [4, 5.0]];
const CW = 1150, CH = 760, SPREAD = { oak: 25, cedar: 24, spruce: 26, pine: 22, kapok: 26, charred: 22, mangrove: 22, baobab: 18, juniper: 22 };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await playwright.chromium.launch(), page = await browser.newPage({ viewport: { width: 3000, height: 3000 } });
  page.on("pageerror", e => console.log("page error:", e.message));
  await page.setContent("<html><body></body></html>");
  await page.addScriptTag({ content: `window.SIGILS = ${fs.readFileSync(path.join(__dirname, "sigils.json"))};` });
  await page.addScriptTag({ content: fs.readFileSync(path.join(__dirname, "draw.js"), "utf8").replace("const PIECES", "var PIECES").replace(/SIGILS\[/g, "window.SIGILS[") });
  await page.addScriptTag({ content: fs.readFileSync(path.join(__dirname, "stumps.js"), "utf8") });
  const cells = [];
  for (const [area, genome, label] of ROWS) {
    const bg = "data:image/png;base64," + fs.readFileSync(path.join(shots, `${area}.png`)).toString("base64");
    for (const [seed, angle] of VARS) {
      const r = await page.evaluate(s => window.mock(s), { bg, meta: meta[area], piece: "stumpgen", genome, seed, angle, top: 1.4, stack: [], r: 12.5 / 1.7, off: 15 });
      cells.push({ png: r.png, at: r.at, label: `${label}  · seed ${seed}, ${Math.round(angle * 57.3)}°` });
      console.log(area, seed, JSON.stringify(r.contrast));
    }
  }
  const res = await page.evaluate(async ({ cells, CW, CH }) => {
    const load = async s => { const im = new Image(); im.src = s; await im.decode(); return im; };
    const out = [];
    for (let row = 0; row < cells.length / 4; row++) {
      const G = document.createElement("canvas"); G.width = CW * 2 + 4; G.height = CH * 2 + 34;
      const g = G.getContext("2d"); g.imageSmoothingEnabled = false; g.fillStyle = "#0b0b10"; g.fillRect(0, 0, G.width, G.height);
      for (let i = 0; i < 4; i++) { const c = cells[row * 4 + i], im = await load(c.png); g.drawImage(im, Math.round(c.at[0] - CW / 2), Math.round(c.at[1] - CH * 0.55), CW, CH, (i % 2) * (CW + 4), Math.floor(i / 2) * (CH + 4), CW, CH); }
      g.fillStyle = "#fff"; g.font = "bold 18px monospace"; g.fillText(cells[row * 4].label.split("  ·")[0] + "  ·  4 seeds and angles", 10, CH * 2 + 26);
      out.push(G.toDataURL("image/png"));
    }
    return out;
  }, { cells, CW, CH });
  res.forEach((d, i) => fs.writeFileSync(path.join(outDir, `row-${i}-${ROWS[i][1]}.png`), Buffer.from(d.split(",")[1], "base64")));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
