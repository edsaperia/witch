// The telescope mock's sheets (tools/telescope/mock-shots.cjs takes the renders): each render through an eyepiece (a round lens,
// a brass ring, the compass bearing round it, the controls under it), laid out as the pan round (N, E, S, W), the zoom (wide to
// close on one heading) and the same view at half the render resolution (for a weak GPU). Headless Chromium draws the sheets.
//   node tools/telescope/mock-sheet.cjs <shots dir> <out dir> [far shots dir]
const fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [dir, outDir, farDir] = process.argv.slice(2);
const meta = JSON.parse(fs.readFileSync(path.join(dir, "shots.json"), "utf8")), far = farDir ? JSON.parse(fs.readFileSync(path.join(farDir, "shots.json"), "utf8")) : null;
const img = (d, n) => "data:image/png;base64," + fs.readFileSync(path.join(d, n + ".png")).toString("base64");
const BEAR = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
const shot = (d, name) => (d === dir ? meta : far).shots.find(s => s.name === name);
// One eyepiece, w × h: the render cropped to a circle, a stepped brass rim, the bearing on a compass bezel, the controls below.
function eyepiece(d, name, w, h, o = {}) {
  const s = shot(d, name), r = Math.round(h * 0.39), cx = w / 2, cy = h * 0.52, b = s.heading;
  const ticks = [];
  for (let a = -60; a <= 60; a += 5) {
    const deg = (b + a + 360) % 360, x = cx + (a / 60) * r * 0.95, major = deg % 45 === 0;
    ticks.push(`<div style="position:absolute;left:${x - 1}px;top:${cy - r - 26}px;width:2px;height:${major ? 12 : 6}px;background:${major ? "#e8c070" : "#8a6a3a"}"></div>`);
    if (major) ticks.push(`<div style="position:absolute;left:${x - 14}px;top:${cy - r - 44}px;width:28px;text-align:center;color:#e8c070;font:bold 13px monospace">${BEAR[deg / 45]}</div>`);
  }
  const zoom = Math.round((40 / s.fov) * 10) / 10;
  return `<div class="ep" style="width:${w}px;height:${h}px">
    <div class="lens" style="left:${cx - r}px;top:${cy - r}px;width:${2 * r}px;height:${2 * r}px">
      <img src="${img(d, name)}" style="${o.half ? "image-rendering:pixelated;" : ""}width:${(2 * r * 1280) / 800}px;height:${2 * r}px;left:${r - (r * 1280) / 800}px">
      <div class="glass"></div>
    </div>
    <div class="rim" style="left:${cx - r - 14}px;top:${cy - r - 14}px;width:${2 * r + 28}px;height:${2 * r + 28}px"></div>
    <div class="rim2" style="left:${cx - r - 6}px;top:${cy - r - 6}px;width:${2 * r + 12}px;height:${2 * r + 12}px"></div>
    ${ticks.join("")}
    <div style="position:absolute;left:${cx - 7}px;top:${cy - r - 30}px;width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;border-top:9px solid #ffde8a"></div>
    <div class="ui" style="top:${cy + r + 22}px">${b}° ${BEAR[Math.round(b / 45) % 8]} &nbsp;·&nbsp; ×${zoom} &nbsp;·&nbsp; ◀ ▶ pan &nbsp; ▲ ▼ zoom &nbsp; E / Esc leave</div>
    ${o.label ? `<div class="label">${o.label}</div>` : ""}
  </div>`;
}
const css = `body{margin:0;background:#07060c;color:#ddd;font:14px system-ui}
.sheet{padding:24px;display:flex;flex-wrap:wrap;gap:18px;width:1556px}
h1{font:600 22px system-ui;margin:0 0 4px 24px;padding-top:20px;color:#f0e0c0} p.note{margin:0 24px;color:#aaa;max-width:1900px}
.ep{position:relative;background:radial-gradient(ellipse at center,#0e0b14 0%,#030205 70%);overflow:hidden;border-radius:6px}
.lens{position:absolute;border-radius:50%;overflow:hidden;background:#000}
.lens img{position:absolute;top:0}
.glass{position:absolute;inset:0;border-radius:50%;box-shadow:inset 0 0 40px 18px rgba(0,0,0,.85),inset 0 0 4px 2px rgba(0,0,0,.9);background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.05),rgba(255,255,255,0) 40%)}
.rim{position:absolute;border-radius:50%;border:8px solid #6b4a22;box-shadow:0 0 0 3px #2a1a0a,inset 0 0 0 3px #a8803e}
.rim2{position:absolute;border-radius:50%;border:3px solid #c9a050}
.ui{position:absolute;left:0;right:0;text-align:center;color:#e8c070;font:bold 13px monospace;letter-spacing:.5px}
.label{position:absolute;left:12px;top:10px;color:#fff;font:600 14px system-ui;background:rgba(0,0,0,.55);padding:3px 8px;border-radius:4px}`;
const W = 760, H = 520, cost = (d, n) => { const s = shot(d, n); return `${s.calls} draw calls, ${(s.triangles / 1000).toFixed(0)}k triangles`; };
const sheets = {
  "telescope-pan": `<h1>Through the telescope: panning round from the crow's nest</h1><p class="note">The game's own view, turned to each bearing from the treehouse's crow's nest (eye at 50 m, over the 24 m treetops), seed 123 after three waves. Forest drawn out to ${meta.reach} m (the game draws 360 m round her today). The game's camera only ever looks north; for these shots the camera, the sprites' facing and the world's bend were turned with the telescope.</p>
    <div class="sheet">${["n-wide", "e-wide", "s-wide", "w-wide"].map(n => eyepiece(dir, n, W, H, { label: `${shot(dir, n).heading}°, wide · ${cost(dir, n)}` })).join("")}</div>`,
  "telescope-zoom": `<h1>Zooming in (the same bearing, wide to close)</h1><p class="note">Wide is the game's field of view doubled (×1); close is ×3 and ×5. The forest is drawn out to ${meta.reach} m here; the game draws 360 m round her today, so a close look at the island's far side needs it drawn further (or a cheaper far forest).</p>
    <div class="sheet">${["s-wide", "s-zoom"].map(n => eyepiece(dir, n, W, H, { label: `${shot(dir, n).heading}° · ×${Math.round(40 / shot(dir, n).fov * 10) / 10}` })).join("")}${["e-wide", "e-zoom"].map(n => eyepiece(far ? farDir : dir, n, W, H, { label: `${shot(far ? farDir : dir, n).heading}° · ×${Math.round(40 / shot(far ? farDir : dir, n).fov * 10) / 10}${far ? ` · drawn to ${far.reach} m` : ""}` })).join("")}</div>`,
  "telescope-weak-gpu": `<h1>For a weak GPU (Ed's Intel UHD): the lens at half resolution</h1><p class="note">The lens covers about 60% of the screen; drawing it at half resolution (a quarter of the pixels), scaled up square, keeps the pixel art and quarters the fill. Left: full; right: half. The game's own view from the treehouse: ${meta.game.calls} draw calls, ${(meta.game.triangles / 1000).toFixed(0)}k triangles; the telescope's wide view ${cost(dir, "n-wide")}.</p>
    <div class="sheet" id="half">${eyepiece(dir, "n-wide", W, H, { label: "full resolution" })}${eyepiece(dir, "n-wide", W, H, { label: "half resolution", half: true })}</div>`,
};
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await playwright.chromium.launch();
  try {
    for (const [name, body] of Object.entries(sheets)) {
      const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
      await page.setContent(`<!doctype html><style>${css}</style>${body}`);
      if (name === "telescope-weak-gpu") // (the half: the render scaled down by 2 and back up, nearest)
        await page.evaluate(async () => { const im = document.querySelectorAll("#half img")[1], c = document.createElement("canvas"), i = new Image(); i.src = im.src; await i.decode(); c.width = i.width / 2; c.height = i.height / 2; const x = c.getContext("2d"); x.imageSmoothingEnabled = false; x.drawImage(i, 0, 0, c.width, c.height); im.src = c.toDataURL(); await im.decode(); });
      await page.screenshot({ path: path.join(outDir, name + ".png"), fullPage: true });
      await page.close();
    }
  } finally { await browser.close(); }
  console.log("sheets in", outDir);
})();
