// Mock (concept, not the art): the zoo's fence as Versailles' gilded railings, five times taller (Ed, 2026-10-26, round 2: "Make it
// more Versailles. Add fleur-de-lis tips, a curly scroll band and proper urns on the posts. Make it five times taller"): about 5.5 m,
// 42 art pixels at the game's scale (about 0.13 m an art pixel; she is about 15). Bars every 4 pixels, each a lit and a dark pixel
// with two clear between (half of it see-through, so the animals inside show); a fleur-de-lis on each; a band of C-scrolls meeting at
// rosettes near the foot and another near the top; a pilaster every 4 m (30 pixels) topped with a footed urn and its flame; a gilt
// streetlamp every 30 m standing over the railing (about 8 m), its lantern lighting a warm pool on the ground. Gold in three
// tones with a near-black edge (gold, not brass). Draws a close-up and paints the run along a game frame's fence line.
//   node tools/zoo/versailles-tall-mock.cjs close <out.png>
//   node tools/zoo/versailles-tall-mock.cjs frame <frame.png> <out.png> <P> <x,y;x,y;...> [lamp share,...] [label]
const fs = require("fs");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [mode, ...rest] = process.argv.slice(2);

/** The run's pixels, in art pixels up from the ground (y 0) along it (i: the column): [i, y, tone] with tone o, d, m, l, h. */
function railing(cols, lampsAt) {
  const gold = new Map(), keyOf = (i, y) => `${i},${y}`, put = (i, y, t, edge = true) => gold.set(keyOf(i, y), { i, y, t, edge });
  // (the rails: bottom, the scroll bands' rails, the top)
  for (let i = 0; i < cols; i++) {
    for (const [y, t] of [[0, "d"], [1, "m"], [9, "l"], [10, "d"], [29, "l"], [30, "d"], [37, "l"], [38, "d"]]) put(i, y, t, false);
  }
  // (the bars: a lit pixel and a dark one, two clear between, 2 to 41, a fleur-de-lis on each)
  for (let i = 1; i < cols - 1; i += 4) {
    for (let y = 2; y <= 40; y++) { if ((y >= 3 && y <= 8) || (y >= 31 && y <= 36)) continue; put(i, y, "l", false); put(i + 1, y, "d", false); }
    // every other bar a fleur-de-lis (a collar, the tall middle petal, the side petals curling out and down), the rest a spear point
    const fleur = ((i - 1) / 4) % 2 === 0;
    const tip = fleur
      ? [[-1, 41, "m"], [0, 41, "l"], [1, 41, "m"], [2, 41, "d"], [0, 42, "h"], [1, 42, "d"],
         [0, 43, "h"], [1, 43, "l"], [0, 44, "h"], [1, 44, "m"], [0, 45, "h"], [1, 45, "d"], [0, 46, "l"], [1, 46, "d"], [0, 47, "h"],
         [-1, 43, "l"], [-2, 43, "l"], [-3, 44, "l"], [-3, 45, "m"], [-2, 46, "m"],
         [2, 43, "m"], [3, 43, "d"], [4, 44, "d"], [4, 45, "d"], [3, 46, "d"]]
      : [[0, 41, "l"], [1, 41, "d"], [-1, 42, "l"], [0, 42, "h"], [1, 42, "m"], [2, 42, "d"], [0, 43, "h"], [1, 43, "d"], [0, 44, "l"]];
    for (const [dx, dy, t] of tip) put(i + dx, dy, t);
  }
  // (the scroll bands, 3-8 and 31-36: C-scrolls back to back, each pair an S, a rosette where they meet, every 12 columns)
  for (const base of [3, 31]) for (let i = 0; i < cols; i++) {
    const u = i % 12;
    for (let v = 0; v < 6; v++) {
      const y = base + v;
      for (const [cx, open] of [[3, 1], [9, -1]]) { // (a C opening right, then one opening left)
        const dx = u - cx, dy = v - 2.5, r = Math.hypot(dx, dy);
        if (Math.abs(r - 2.3) < 0.62 && dx * open < -0.3) put(i, y, dy > 0 ? "l" : "m"); // (the C: its open side to its neighbour's)
        if (r < 0.7 || (Math.abs(dy) < 0.6 && dx * open < 0 && dx * open > -1.2)) put(i, y, "h"); // (its curl, running in to the middle)
      }
    }
    if (u === 0 || u === 6) for (const [dx, dy, t] of [[0, 2, "h"], [0, 3, "h"], [-1, 2, "l"], [1, 3, "d"], [0, 1, "m"], [0, 4, "d"]]) put(i + dx, base + dy, t); // (the rosette)
  }
  // (the pilasters every 30 columns, to 44, a capital, a footed urn and its flame)
  for (let i = 0; i < cols; i += 30) {
    for (let y = 0; y <= 44; y++) { put(i - 2, y, "h"); put(i - 1, y, "l"); put(i, y, "m"); put(i + 1, y, "d"); }
    for (const y of [45, 46]) for (let dx = -3; dx <= 2; dx++) put(i + dx, y, dx < -1 ? "h" : dx < 1 ? "l" : "d"); // (the capital)
    const urn = [1, 2, 1, 1, 2, 3, 4, 4, 4, 3, 2, 4]; // (half-widths up it: foot, stem, the swell of the body, its neck, the lip)
    urn.forEach((hw, k) => { for (let dx = -hw; dx <= hw - 1; dx++) put(i + dx, 47 + k, dx < -hw + 1 ? "h" : dx < 0 ? "l" : dx < hw - 1 ? "m" : "d"); });
    for (const [dx, dy, t] of [[-1, 59, "l"], [0, 59, "m"], [-1, 60, "h"], [0, 60, "l"], [-1, 61, "h"], [0, 62, "l"]]) put(i + dx, dy, t); // (the flame finial)
  }
  // (the lamps: a gilt post to 60 just in front of the railing, a scrolled foot, an arm, a lantern 61-68 glowing)
  const lamps = [];
  for (const i of lampsAt) {
    for (let y = 0; y <= 60; y++) { put(i, y, "l"); put(i + 1, y, "d"); }
    for (const [dx, dy, t] of [[-2, 0, "l"], [-1, 0, "l"], [2, 0, "d"], [3, 0, "d"], [-1, 1, "l"], [2, 1, "d"], [-1, 20, "h"], [2, 20, "d"], [-1, 40, "h"], [2, 40, "d"]]) put(i + dx, dy, t);
    lamps.push(i);
  }
  // (the edge: a near-black pixel round the ornament, never filling the bars' gaps)
  const out = [...gold.values()];
  for (const g of out) if (g.edge) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const k = keyOf(g.i + dx, g.y + dy); if (!gold.has(k)) gold.set(k, { i: g.i + dx, y: g.y + dy, t: "o", edge: false }); }
  return { px: [...gold.values()], lamps };
}

const TONES = { o: "#1d1206", d: "#7c4c12", m: "#cf9526", l: "#ffd56a", h: "#fff4c4" };

(async () => {
  const b = await playwright.chromium.launch(), p = await b.newPage();
  const paint = (args) => p.evaluate(async ({ w, h, bg, P, base, rail, lamps, label, pool, squash, tones }) => {
    const c = document.createElement("canvas"); c.width = w; c.height = h; const g = c.getContext("2d");
    if (bg) { const im = new Image(); im.src = bg; await im.decode(); g.drawImage(im, 0, 0); } else { g.fillStyle = "#1b2420"; g.fillRect(0, 0, w, h); g.fillStyle = "#4b4740"; g.fillRect(0, base[0][1] + 2, w, h); }
    // (the pools first, on the ground under each lantern)
    for (const i of lamps) {
      const [x, y] = base[Math.min(base.length - 1, i)];
      g.save(); g.globalCompositeOperation = "lighter"; g.translate(x, y + 2 * P); g.scale(1, squash);
      const gr = g.createRadialGradient(0, 0, 0, 0, 0, pool * P); gr.addColorStop(0, "rgba(255,200,110,0.7)"); gr.addColorStop(0.45, "rgba(255,170,80,0.3)"); gr.addColorStop(1, "rgba(255,150,60,0)");
      g.fillStyle = gr; g.beginPath(); g.arc(0, 0, pool * P, 0, Math.PI * 2); g.fill(); g.restore();
    }
    for (const q of rail) { const at = base[q.i]; if (!at) continue; g.fillStyle = tones[q.t]; g.fillRect(Math.round(at[0]), Math.round(at[1] - q.y * P), Math.ceil(P), Math.ceil(P)); }
    // (the lanterns: a gilt frame round warm glass, a crown, glowing)
    for (const i of lamps) {
      const at = base[Math.min(base.length - 1, i)];
      g.save(); g.shadowColor = "rgba(255,210,120,0.95)"; g.shadowBlur = P * 8;
      for (let yy = 61; yy <= 68; yy++) for (let xx = -2; xx <= 3; xx++) { const edge = xx === -2 || xx === 3 || yy === 61 || yy === 68; g.fillStyle = edge ? tones.m : yy === 67 ? "#fff1c2" : "#ffd98a"; g.fillRect(at[0] + xx * P, at[1] - yy * P, P, P); }
      g.restore();
      for (const [xx, yy, t] of [[-1, 69, "l"], [0, 69, "h"], [1, 69, "l"], [2, 69, "d"], [0, 70, "l"], [1, 70, "d"], [0, 71, "h"]]) { g.fillStyle = tones[t]; g.fillRect(at[0] + xx * P, at[1] - yy * P, P, P); }
    }
    if (label) { g.font = "15px monospace"; g.fillStyle = "#fff"; g.strokeStyle = "#000"; g.lineWidth = 3; g.strokeText(label, 14, h - 14); g.fillText(label, 14, h - 14); }
    return c.toDataURL("image/png");
  }, args);
  const save = (file, d) => fs.writeFileSync(file, Buffer.from(d.split(",")[1], "base64"));
  if (mode === "close") {
    // (a 10 m run, two pilasters, a lamp, at 5 screen pixels an art pixel, with a 15-pixel figure for her height)
    const [out] = rest, P = 5, cols = 78, base = []; for (let i = 0; i < cols; i++) base.push([30 + i * P, 420]);
    const { px, lamps } = railing(cols, [44]);
    let d = await paint({ w: 460, h: 470, bg: null, P, base, rail: px, lamps, label: "", pool: 12, squash: 0.3, tones: TONES });
    // (her height beside it: a plain figure, 15 art pixels)
    d = await p.evaluate(async ({ d, P }) => { const c = document.createElement("canvas"); c.width = 460; c.height = 470; const g = c.getContext("2d"); const im = new Image(); im.src = d; await im.decode(); g.drawImage(im, 0, 0); g.fillStyle = "#6a3d8f"; g.fillRect(400, 420 - 15 * P, 3 * P, 15 * P); g.fillRect(397, 420 - 15 * P, 9 * P, P); g.fillStyle = "#fff"; g.font = "13px monospace"; g.fillText("her", 398, 435); g.fillText("5.5 m", 4, 420 - 42 * P + 4); return c.toDataURL("image/png"); }, { d, P });
    save(out, d);
  } else {
    // (along the frame's fence line, given in screen pixels; a column every P screen pixels along it)
    const [frame, out, Ps, line, lampShares = "", label = ""] = rest, P = Number(Ps);
    const pts = line.split(";").map(s => s.split(",").map(Number)), base = [];
    for (let k = 0; k < pts.length - 1; k++) { const [x0, y0] = pts[k], [x1, y1] = pts[k + 1], L = Math.hypot(x1 - x0, y1 - y0), n = Math.max(1, Math.round(L / P)); for (let j = 0; j < n; j++) base.push([x0 + ((x1 - x0) * j) / n, y0 + ((y1 - y0) * j) / n]); }
    const lamps = lampShares ? lampShares.split(",").map(s => Math.round(Number(s) * (base.length - 1))) : [];
    const { px } = railing(base.length, lamps);
    const bg = "data:image/png;base64," + fs.readFileSync(frame).toString("base64");
    save(out, await paint({ w: 1280, h: 720, bg, P, base, rail: px, lamps, label, pool: 70, squash: 0.4, tones: TONES }));
  }
  await b.close(); console.log("wrote", rest[rest.length - (mode === "close" ? 1 : 0)] ?? "");
})().catch(e => { console.error(e); process.exit(1); });
