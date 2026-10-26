// Mock (concept, not the art): the zoo's fence as Versailles' gilded railings (Ed, 2026-10-26: "I'm thinking more like the gold fence
// at the palace of Versailles"; "The fence has streetlamps along it that cast light, every 30 metres or so"), in the bold pixel
// style at the game's scale (about 0.13 m an art pixel: the fence 1.1 m, about 8 art pixels; posts with urns every 4 m, 30 pixels; a gilt lamp
// with a lantern head every 30 m, a warm pool of light on the ground under it). Writes a close-up (8x) and the in-game frame
// with the fence painted along the island's edge.
//   node tools/zoo/versailles-mock.cjs <frame.png> <frame-out.png> <close-out.png>
const fs = require("fs");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [frame, out, close] = process.argv.slice(2);
(async () => {
  const b = await playwright.chromium.launch(), p = await b.newPage();
  const src = "data:image/png;base64," + fs.readFileSync(frame).toString("base64");
  const draw = (w, h, bg, scene) => p.evaluate(async ([w, h, bg, scene]) => {
    const c = document.createElement("canvas"); c.width = w; c.height = h; const g = c.getContext("2d");
    if (bg) { const im = new Image(); im.src = bg; await im.decode(); g.drawImage(im, 0, 0); } else { g.fillStyle = "#26302a"; g.fillRect(0, 0, w, h); g.fillStyle = "#5b5649"; g.fillRect(0, h * 0.62, w, h); }
    const P = scene.px, C = { o: "#1d1206", d: "#7c4c12", m: "#cf9526", l: "#ffd56a", h: "#fff4c4", warm: "#ffd98a", glass: "#fff1c2" };
    const px = (x, y, col) => { g.fillStyle = col; g.fillRect(Math.round(x * P), Math.round(y * P), P, P); };
    // (a light pool under each lamp first: warm, soft, on the ground)
    for (const L of scene.lamps) {
      const gr = g.createRadialGradient(L.x * P, (L.y + 1) * P, 0, L.x * P, (L.y + 1) * P, scene.pool * P);
      gr.addColorStop(0, "rgba(255,200,110,0.75)"); gr.addColorStop(0.45, "rgba(255,170,80,0.32)"); gr.addColorStop(1, "rgba(255,150,60,0)");
      g.save(); g.globalCompositeOperation = "lighter"; g.translate(L.x * P, (L.y + 1) * P); g.scale(1, scene.squash); g.translate(-L.x * P, -(L.y + 1) * P);
      g.fillStyle = gr; g.beginPath(); g.arc(L.x * P, (L.y + 1) * P, scene.pool * P, 0, Math.PI * 2); g.fill(); g.restore();
    }
    // (the run, art pixel by art pixel along its base line: x, y of the ground under each column)
    const run = scene.run; // [[x, y], ...] one per art-pixel column, left to right
    for (let i = 0; i < run.length; i++) {
      const [x, y] = run[i];
      // the lower band: two rails with a rosette every 4 columns
      px(x, y, C.o); px(x, y - 1, i % 4 === 1 ? C.h : C.d); px(x, y - 2, i % 4 === 1 ? C.l : C.m); px(x, y - 3, C.o);
      // the bars, every other column, a spearhead on each
      if (i % 2 === 0) { for (let k = 4; k <= 5; k++) px(x, y - k, C.m); px(x, y - 6, C.l); px(x, y - 7, C.h); px(x - 1, y - 6, C.o); px(x + 1, y - 6, C.o); px(x, y - 8, C.o); }
    }
    // taller posts with urns every 30 columns (4 m)
    for (let i = 0; i < run.length; i += 30) {
      const [x, y] = run[i];
      for (let k = 0; k <= 8; k++) { px(x - 1, y - k, C.o); px(x, y - k, k > 6 ? C.l : C.l); px(x + 1, y - k, C.d); px(x + 2, y - k, C.o); }
      for (const [dx, dy, k] of [[-1, -9, "o"], [0, -9, "m"], [1, -9, "d"], [2, -9, "o"], [-1, -10, "o"], [0, -10, "h"], [1, -10, "l"], [2, -10, "o"], [0, -11, "o"], [1, -11, "o"], [0, -12, "l"], [1, -12, "o"]]) px(x + dx, y + dy, C[k]);
    }
    // the streetlamps: a gilt post about 3.5 m (26 px), a scrolled foot, a lantern head glowing warm
    for (const L of scene.lamps) {
      const x = L.x, y = L.y;
      for (let k = 0; k <= 22; k++) { px(x - 1, y - k, C.o); px(x, y - k, C.l); px(x + 1, y - k, C.d); px(x + 2, y - k, C.o); }
      for (const [dx, dy, k] of [[-2, 0, "o"], [-1, 0, "m"], [2, 0, "m"], [3, 0, "o"], [-2, -1, "o"], [3, -1, "o"]]) px(x + dx, y + dy, C[k]);
      // the lantern: a gilt frame round warm glass, a crown on top
      g.save(); g.shadowColor = "rgba(255,210,120,0.9)"; g.shadowBlur = P * 6;
      for (let yy = -27; yy <= -23; yy++) for (let xx = -2; xx <= 3; xx++) px(x + xx, y + yy, (xx === -2 || xx === 3 || yy === -27 || yy === -23) ? C.m : yy === -26 ? C.glass : C.warm);
      g.restore();
      for (let xx = -2; xx <= 3; xx++) { px(x + xx, y - 28, C.o); px(x + xx, y - 22, C.o); }
      px(x, y - 29, C.l); px(x + 1, y - 29, C.d); px(x, y - 30, C.h);
    }
    if (scene.label) { g.font = "16px monospace"; g.fillStyle = "#fff"; g.strokeStyle = "#000"; g.lineWidth = 3; g.strokeText(scene.label, 16, h - 16); g.fillText(scene.label, 16, h - 16); }
    return c.toDataURL("image/png");
  }, [w, h, bg, scene]);
  // the close-up: 8x, a run of 6 m with two posts and a lamp
  {
    const P = 6, run = []; for (let i = 0; i < 64; i++) run.push([4 + i, 36]);
    const d = await draw(432, 260, null, { px: P, run, lamps: [{ x: 49, y: 36 }], pool: 14, squash: 0.35 });
    fs.writeFileSync(close, Buffer.from(d.split(",")[1], "base64"));
  }
  // over the in-game frame: along the island's edge (an arc across the lower third), 4 screen px an art pixel; a lamp every 30 m
  // (about 225 art px, a screen's width at this zoom)
  {
    const P = 4, run = []; for (let i = 0; i < 320; i++) { const sx = i * P; run.push([i, Math.round((470 + 0.00012 * (sx - 640) ** 2 - 40 * Math.sin(sx / 300)) / P)]); }
    const lamps = [60, 285].map(i => ({ x: run[i][0], y: run[i][1] })); // (30 m apart: 225 art pixels, about a screen's width)
    const d = await draw(1280, 720, src, { px: P, run, lamps, pool: 60, squash: 0.45, label: "concept: Versailles railings 1.1 m, posts with urns every 4 m, a gilt lamp every 30 m lighting the ground" });
    fs.writeFileSync(out, Buffer.from(d.split(",")[1], "base64"));
  }
  await b.close(); console.log("wrote", out, close);
})().catch(e => { console.error(e); process.exit(1); });
