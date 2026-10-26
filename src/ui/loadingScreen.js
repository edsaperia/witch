// The loading screen (Ed, 2026-10-26; the mock and its notes on claude/ed-shots, previews/ed/loading-screen/): a night sky, a dim
// irregular galaxy lying behind, and in the middle the Ent's World Tree (its sigil's strokes, art/sigils.js WORLD_TREE) drawn in
// stars, COVEN over it and RUSH under it in Cinzel Decorative (OFL), every star of them the load's progress: they light one by
// one in a random order weighted toward the edge ("random, weighted towards the edge, filling the middle last"), each flashing as
// it lights, all one warm gold, the star nearest the middle last. When the game is ready that last star goes supernova (after
// Cassiopeia A, Ed's reference): a white flash, a ragged shell of red, blue, gold and green gas opening out from it, the screen
// white, then the white falling away straight onto her dark bedroom and her alarm ("transitioning straight to the dark bedroom
// and the alarm going off").
// Plain JS on a 2D canvas at one art pixel a canvas pixel: no three.js, nothing to wait for, so it's up at the page's first paint
// (src/loading.js starts it) while the game's code loads and its night is made. main.ts drives it through `window.witchLoading`:
// `set(share)` as the load goes (0 to 1), `finish()` once the game's ready, `cancel()` for a start with no wake-up.
import treeStrokes from "./loadingTree.json";

const rand = seed => () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

/** How the stars light: the edge first by EDGE (0 plain random), RATE stars a second at most (a jump in the load fills over a
 *  moment), each flashing for FLASH s, the unlit ones at GHOST (0: an empty sky, Ed's call, the seal showing only as it lights); the supernova to white over NOVA s, the white clearing over CLEAR s. The tuning's loading block sets them (startLoadingScreen's knobs). */
let EDGE = 1, RATE = 90, FLASH = 0.6, NOVA = 2.6, CLEAR = 1.2, GHOST = 0, FPS = 10;
const STAR = [255, 214, 140];

/** The seal's stars, in seal units (its middle at 0, 0): the tree's strokes resampled every SP, each a little off its line, then the
 *  two words, then their order. */
function makeSeal(font) {
  const stars = [], r = rand(3), jr = () => (r() - 0.5) * 0.012, SP = 0.02, MERGE = SP * 0.45;
  const starAt = (x, y) => { for (const s of stars) if (Math.hypot(s.x - x, s.y - y) < MERGE) return; stars.push({ x, y }); };
  for (const poly of treeStrokes) {
    starAt(poly[0][0] - 0.5, poly[0][1] - 0.5);
    let run = 0;
    for (let i = 1; i < poly.length; i++) {
      const [x0, y0] = poly[i - 1], [x1, y1] = poly[i]; run += Math.hypot(x1 - x0, y1 - y0);
      let turn = false;
      if (i < poly.length - 1) { const [x2, y2] = poly[i + 1], a = Math.atan2(y1 - y0, x1 - x0), b = Math.atan2(y2 - y1, x2 - x1); turn = Math.abs(((b - a + 3 * Math.PI) % (2 * Math.PI)) - Math.PI) > 0.6; }
      if (run >= SP || i === poly.length - 1 || turn) { starAt(x1 - 0.5 + jr(), y1 - 0.5 + jr()); run = 0; }
    }
  }
  // the words: each drawn in the font, thinned to its strokes' centre lines (Zhang-Suen), a star every SPACING pixels along them;
  // laid straight over and under the seal at one size
  const words = [word("COVEN", font), word("RUSH", font)], R = 0.66, sc = Math.min(...words.map(w => Math.min(1.2 / (w.x1 - w.x0), 0.62 / (w.y1 - w.y0))));
  words.forEach((w, k) => { for (const [x, y] of w.pts) stars.push({ x: (x - (w.x0 + w.x1) / 2) * sc, y: k === 0 ? -R + (y - w.y1) * sc - 0.02 : R + (y - w.y0) * sc + 0.02 }); });
  // the order: random, weighted to the edge, the star nearest the middle last
  const o = rand(20261026), far = Math.max(...stars.map(s => Math.hypot(s.x, s.y)));
  const mid = stars.reduce((b, s, i) => (Math.hypot(s.x, s.y) < Math.hypot(stars[b].x, stars[b].y) ? i : b), 0);
  const order = stars.map((s, i) => ({ i, k: o() - EDGE * Math.hypot(s.x, s.y) / far })).sort((a, b) => a.k - b.k).map(e => e.i).filter(i => i !== mid);
  order.push(mid);
  order.forEach((i, n) => (stars[i].at = n));
  return stars;
}

/** A word's stars: its centre lines' pixels, none nearer than SPACING to another (the font drawn at 190 px, thickened a little first
 *  so its hairlines survive the thinning). */
function word(text, font) {
  const w = 1300, h = 700, c = document.createElement("canvas"); c.width = w; c.height = h;
  const g = c.getContext("2d", { willReadFrequently: true });
  g.font = `190px ${font}`; g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = g.strokeStyle = "#fff"; g.lineWidth = 3; g.lineJoin = "round"; g.letterSpacing = "34px"; // (Ed: "space the letters out a bit more")
  g.strokeText(text, w / 2, h / 2); g.fillText(text, w / 2, h / 2);
  const d = g.getImageData(0, 0, w, h).data, img = new Uint8Array(w * h);
  let bx0 = w, bx1 = 0, by0 = h, by1 = 0;
  for (let i = 0; i < w * h; i++) if (d[i * 4 + 3] > 110) { img[i] = 1; const x = i % w, y = (i / w) | 0; bx0 = Math.min(bx0, x); bx1 = Math.max(bx1, x); by0 = Math.min(by0, y); by1 = Math.max(by1, y); }
  const at = (x, y) => img[y * w + x];
  for (let changed = true; changed;) {
    changed = false;
    for (const pass of [0, 1]) {
      const del = [];
      for (let y = Math.max(1, by0 - 1); y <= Math.min(h - 2, by1 + 1); y++) for (let x = Math.max(1, bx0 - 1); x <= Math.min(w - 2, bx1 + 1); x++) {
        if (!img[y * w + x]) continue;
        const p = [at(x, y - 1), at(x + 1, y - 1), at(x + 1, y), at(x + 1, y + 1), at(x, y + 1), at(x - 1, y + 1), at(x - 1, y), at(x - 1, y - 1)];
        const B = p[0] + p[1] + p[2] + p[3] + p[4] + p[5] + p[6] + p[7]; if (B < 2 || B > 6) continue;
        let A = 0; for (let k = 0; k < 8; k++) if (!p[k] && p[(k + 1) % 8]) A++; if (A !== 1) continue;
        if (pass === 0 ? p[0] * p[2] * p[4] || p[2] * p[4] * p[6] : p[0] * p[2] * p[6] || p[0] * p[4] * p[6]) continue;
        del.push(y * w + x);
      }
      for (const i of del) img[i] = 0;
      if (del.length) changed = true;
    }
  }
  const SPACING = 20, pts = [], cell = new Map();
  for (let x = bx0; x <= bx1; x++) for (let y = by0; y <= by1; y++) {
    if (!img[y * w + x]) continue;
    const cx = Math.floor(x / SPACING), cy = Math.floor(y / SPACING);
    let near = false;
    for (let i = -1; i <= 1 && !near; i++) for (let j = -1; j <= 1 && !near; j++) for (const q of cell.get(`${cx + i},${cy + j}`) ?? []) if (Math.hypot(q[0] - x, q[1] - y) < SPACING) { near = true; break; }
    if (near) continue;
    pts.push([x, y]); const k = `${cx},${cy}`; cell.set(k, [...(cell.get(k) ?? []), [x, y]]);
  }
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  for (const [x, y] of pts) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  return { pts, x0, x1, y0, y1 };
}

// value noise and its octaves, for the galaxy's gas and the supernova's shell
const noise = (a, b) => {
  const h = (i, j) => { const v = Math.sin(i * a + j * b) * 43758.5453; return v - Math.floor(v); };
  const vn = (x, y) => { const i = Math.floor(x), j = Math.floor(y), fx = x - i, fy = y - j, u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy); return (h(i, j) * (1 - u) + h(i + 1, j) * u) * (1 - v) + (h(i, j + 1) * (1 - u) + h(i + 1, j + 1) * u) * v; };
  return (x, y) => { let s = 0, f = 1, w = 0.5; for (let o = 0; o < 5; o++) { s += w * vn(x * f + o * 17.3, y * f - o * 9.1); f *= 2.05; w *= 0.5; } return s; };
};

/** The galaxy's gas (after Ed's reference, NGC 346): a lopsided torn cloud of blue-violet, white-lavender where it's thickest, a
 *  dark dust lane winding through it; GL seal units across, a picture GT pixels a side. */
const GL = 1.75, GT = 220;
function gasPicture() {
  const c = document.createElement("canvas"); c.width = c.height = GT;
  const g = c.getContext("2d"), img = g.createImageData(GT, GT), d = img.data, fbm = noise(127.1, 311.7);
  for (let j = 0; j < GT; j++) for (let i = 0; i < GT; i++) {
    const X = (i / GT * 2 - 1) * GL, Y = (j / GT * 2 - 1) * GL, ang = Math.atan2(Y, X);
    const edge = 0.85 + 0.35 * Math.sin(ang * 2 + 0.6) + 0.25 * Math.sin(ang * 3 - 1.2) + 0.55 * (fbm(Math.cos(ang) * 1.5 + 4, Math.sin(ang) * 1.5 + 4) - 0.5);
    const lobe = Math.exp(-(((X + 0.75) ** 2) / 0.16 + ((Y - 0.55) ** 2) / 0.09)), wisp = Math.exp(-(((X - 0.7) ** 2) / 0.35 + ((Y + 0.45) ** 2) / 0.05));
    const m = Math.max(0, 1 - Math.hypot(X - 0.05, (Y - 0.05) * 1.15) / edge) + lobe * 0.8 + wisp * 0.5;
    const fine = fbm(X * 6 + 1, Y * 6 + 7), k = Math.min(1, Math.max(0, m * (0.55 + 0.9 * fbm(X * 2.2 + 10, Y * 2.2 + 3)) - 0.12) * (0.7 + 0.5 * fine));
    const lane = Y - (0.32 + 0.18 * Math.sin(X * 2.4 + 0.5) + 0.06 * Math.sin(X * 7.3)), dark = 0.85 * Math.exp(-((lane / (0.035 + 0.03 * fine)) ** 2)) * Math.min(1, m * 2) * (Math.abs(X) < 1.05 ? 1 : 0);
    const col = k < 0.5 ? [30 + 80 * k, 50 + 120 * k, 150 + 200 * k] : [70 + 300 * (k - 0.5), 110 + 220 * (k - 0.5), 250], o = (j * GT + i) * 4;
    d[o] = Math.min(255, col[0] * (1 - dark) + 70 * dark); d[o + 1] = Math.min(255, col[1] * (1 - dark) + 35 * dark); d[o + 2] = Math.min(255, col[2] * (1 - dark) + 25 * dark);
    d[o + 3] = Math.round(255 * Math.min(1, k * 0.85 * (1 - dark * 0.6) + dark * 0.55 * Math.min(1, m)));
  }
  g.putImageData(img, 0, 0);
  return c;
}

/** The galaxy's stars: a young blue-white cluster, an old orange one, knots in the gas, and a scattered field. */
function galaxyStars() {
  const out = [], r = rand(31), gauss = () => (r() + r() + r() + r() - 2) * 0.87;
  const rgb = h => [1, 3, 5].map(k => parseInt(h.slice(k, k + 2), 16));
  const cluster = (cx, cy, sd, n, cols, bright) => { for (let i = 0; i < n; i++) { const a = Math.abs(gauss()); out.push({ x: cx + gauss() * sd * (0.4 + a), y: cy + gauss() * sd * (0.4 + a), c: rgb(cols[Math.floor(r() * cols.length)]), a: bright * (0.35 + 0.65 * r()), big: r() < 0.03 }); } };
  cluster(0.62, 0.62, 0.17, 450, ["#ffffff", "#dfe6ff", "#bcd0ff", "#f0e8ff"], 0.6);
  cluster(1.15, -0.2, 0.17, 550, ["#ffc58a", "#ffb070", "#ffe0b0", "#ff9f60"], 0.75);
  cluster(-0.62, 0.55, 0.07, 90, ["#ffffff", "#cfe0ff"], 0.9);
  cluster(-0.35, -0.35, 0.06, 70, ["#ffffff", "#dfe6ff"], 0.8);
  cluster(0.78, -0.2, 0.06, 60, ["#ffffff", "#e8ddff"], 0.8);
  for (let i = 0; i < 900; i++) out.push({ x: (r() - 0.5) * 3.2, y: (r() - 0.5) * 3.2, c: rgb(r() < 0.5 ? "#ffd0a0" : "#d8e2ff"), a: 0.25 + 0.5 * r(), big: r() < 0.01 });
  return out;
}

/** The supernova's remnant (after Cassiopeia A): a ragged shell, a red haze round it, blue wisps inside, gold filaments along it,
 *  green patches. */
function remnantPicture() {
  const T = 300, c = document.createElement("canvas"); c.width = c.height = T;
  const g = c.getContext("2d"), img = g.createImageData(T, T), d = img.data, fbm = noise(157.1, 271.7), ridge = (x, y, p) => Math.pow(1 - Math.abs(2 * fbm(x, y) - 1), p);
  for (let j = 0; j < T; j++) for (let i = 0; i < T; i++) {
    const u = i / T * 2 - 1, v = j / T * 2 - 1, r = Math.hypot(u, v), ang = Math.atan2(v, u);
    const rr = 0.66 + 0.24 * (fbm(Math.cos(ang) * 2 + 5, Math.sin(ang) * 2 + 5) - 0.5), shell = Math.exp(-(((r - rr) / (0.16 + 0.06 * fbm(u * 3, v * 3))) ** 2));
    const inner = Math.max(0, 1 - r / rr) * 0.55, halo = Math.exp(-(((r - rr - 0.12) / 0.2) ** 2));
    const fil = ridge(u * 4.2 + 1, v * 4.2, 6), fil2 = ridge(u * 8 + 7, v * 8 + 2, 10), wisp = ridge(u * 3 + 11, v * 3 - 4, 4);
    const green = Math.max(0, Math.min(1, (fbm(u * 1.6 + 20, v * 1.6 - 3) - 0.56) / 0.12)) * shell * (u < 0.1 ? 1 : 0.35), fade = Math.max(0, Math.min(1, (1 - r) / 0.12));
    const R = (190 * halo * 0.6 + 200 * shell * 0.35 + 255 * fil * shell * 0.75 + 255 * fil2 * shell * 0.55 + 20 * green) * (1 - 0.6 * green) * fade;
    const G = (25 * halo * 0.3 + 40 * shell * 0.25 + 120 * fil * shell * 0.75 + 190 * fil2 * shell * 0.55 + 120 * green) * fade;
    const B = (140 * halo * 0.5 + 255 * (inner * 1.1 + shell * 0.6) * (0.25 + 0.75 * wisp * wisp) + 20 * fil2 * shell + 40 * green) * fade, o = (j * T + i) * 4;
    d[o] = Math.min(255, R); d[o + 1] = Math.min(255, G); d[o + 2] = Math.min(255, B); d[o + 3] = Math.min(255, Math.max(R, G, B));
  }
  g.putImageData(img, 0, 0);
  return c;
}

/** Start the loading screen over the page; `font` the CSS font family for the words (loaded by the caller). */
/** `knobs` the tuning's loading block (edge, rate, flash, ghost, nova, clear, fps), any left out as built. */
export function startLoadingScreen(font, knobs = {}) {
  ({ edge: EDGE = EDGE, rate: RATE = RATE, flash: FLASH = FLASH, ghost: GHOST = GHOST, nova: NOVA = NOVA, clear: CLEAR = CLEAR, fps: FPS = FPS } = knobs);
  const root = document.createElement("div");
  root.id = "loading-screen";
  root.style.cssText = "position:fixed;inset:0;z-index:1000;background:#05060e;pointer-events:none";
  const cv = document.createElement("canvas");
  cv.style.cssText = "position:absolute;inset:0;width:100%;height:100%;image-rendering:pixelated";
  const white = document.createElement("div");
  white.style.cssText = "position:absolute;inset:0;background:#fffaf0;opacity:0";
  root.append(cv, white);
  document.body.append(root);
  const x = cv.getContext("2d");
  let W = 0, H = 0, sky = [], stars = [], N = 0, gas = null, gal = null, remnant = null, back = null, img = null;
  const seal = () => Math.min(W, H) * (W < H ? 0.5 : 0.36);
  const fit = () => {
    const u = innerWidth < 700 ? 2 : 3; W = Math.ceil(innerWidth / u); H = Math.ceil(innerHeight / u); cv.width = W; cv.height = H;
    // the sky's stars at their depths (a few in front, most far behind), the Milky Way's band of fainter ones
    const r = rand(7), S = seal(), ax = (W / S) * 0.75, ay = (H / S) * 0.75, one = (z, x0, y0, band) => { const k = (8 + z) / 8; return { x: x0 * ax * k * 1.4, y: y0 * ay * k * 1.4, z, b: r(), tw: 1 + r() * 3, ph: r() * 6.28, hue: r(), band }; };
    sky = Array.from({ length: Math.round(W * H / 34) }, () => (r() < 0.05 ? one(-3.5 - r() * 2.5, (r() - 0.5) * 2, (r() - 0.5) * 2, false) : one(0.6 + Math.pow(r(), 0.7) * 30, (r() - 0.5) * 2, (r() - 0.5) * 2, false)));
    for (let i = 0; i < Math.round(W * H / 30); i++) { const t = (r() - 0.5) * 2.4, off = (r() + r() + r() - 1.5) * 0.28; sky.push(one(14 + r() * 16, t * 0.9 - off * 0.45, -t * 0.5 - off * 0.9, true)); }
    for (const st of sky) st.c = st.hue < 0.4 ? [255, 196, 140] : st.hue < 0.55 ? [255, 226, 190] : st.hue < 0.75 ? [190, 206, 255] : [240, 242, 255]; // (many warm orange, the rest blue-white)
    // the night's gradient and the Milky Way's glow, drawn once; each frame starts from them
    const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#04050d"); gr.addColorStop(0.7, "#0a0c22"); gr.addColorStop(1, "#10133a");
    x.fillStyle = gr; x.fillRect(0, 0, W, H);
    for (let i = -3; i <= 3; i++) { const cx = W / 2 + i * 0.42 * W * 0.6, cy = H / 2 - i * 0.24 * H * 0.6, R = Math.min(W, H) * 0.34, g = x.createRadialGradient(cx, cy, 0, cx, cy, R); g.addColorStop(0, "rgba(120,110,200,0.09)"); g.addColorStop(1, "rgba(120,110,200,0)"); x.fillStyle = g; x.fillRect(0, 0, W, H); }
    back = x.getImageData(0, 0, W, H).data.slice(); img = x.createImageData(W, H);
  };
  fit();
  addEventListener("resize", fit);
  // the camera's slow sway round the seal's middle, coming a little nearer as it completes: the sky's depths sliding past each other
  let cam = { cy: 1, sy: 0, cp: 1, sp: 0, d: 8 };
  const project = (X, Y, Z) => {
    const x1 = X * cam.cy + Z * cam.sy, z1 = -X * cam.sy + Z * cam.cy, y2 = Y * cam.cp - z1 * cam.sp, zz = Y * cam.sp + z1 * cam.cp + cam.d;
    if (zz < 0.2) return null;
    const k = 8 / zz, S = seal(); return [W / 2 + x1 * S * k, H / 2 + y2 * S * k, k];
  };
  const px = (X, Y, c) => { x.fillStyle = c; x.fillRect(Math.round(X), Math.round(Y), 1, 1); }; // (the supernova's, a few frames)
  // the frame's own pixels: light added into a buffer (one array write a pixel; the canvas calls a pixel cost the game's load seconds
  // in the cloud's software renderer, 2026-10-26: 243 s to ready against 35 s without)
  const add = (X, Y, r, g, b, a) => {
    X = Math.round(X); Y = Math.round(Y); if (X < 0 || Y < 0 || X >= W || Y >= H || a <= 0) return;
    const d = img.data, i = (Y * W + X) * 4; d[i] += r * a; d[i + 1] += g * a; d[i + 2] += b * a;
  };
  const cross = (X, Y, r, g, b, a, reach) => { for (let i = 1; i <= reach; i++) { const f = a * (1 - (i - 1) / (reach + 0.5)); add(X + i, Y, r, g, b, f); add(X - i, Y, r, g, b, f); add(X, Y + i, r, g, b, f); add(X, Y - i, r, g, b, f); } };

  let share = 0, lit = 0, finishAt = -1, novaAt = -1, done = false, t0 = performance.now(), lastFrame = 0;
  const litAt = [];
  // the heavy pictures made a little after the first paint, so the sky's up at once
  setTimeout(() => { gas = gasPicture(); gal = galaxyStars(); }, 50);
  document.fonts.load(`190px ${font}`).catch(() => {}).then(() => { stars = makeSeal(font); N = stars.length; });
  (window.requestIdleCallback ?? (f => setTimeout(f, 1500)))(() => { remnant = remnantPicture(); });

  const frame = now => {
    if (done) return;
    requestAnimationFrame(frame);
    // FPS frames a second while the game loads (each one costs it: at 20 a second its cold load in the cloud came 5.4 s later, 42.5 s
    // against 37.1 s, 2026-10-26), about 20 once it's ready, for the supernova
    if (now - lastFrame < (finishAt < 0 ? 1000 / FPS - 4 : 48) || document.hidden) return;
    const dt = Math.min(0.25, (now - (lastFrame || now)) / 1000), t = (now - t0) / 1000;
    lastFrame = now;
    // the stars lit: toward the load's share (the last star only once it's finished), at most RATE a second
    const want = N ? (finishAt >= 0 ? N : Math.min(N - 1, Math.floor(share * (N - 1)))) : 0;
    const next = Math.min(want, lit + Math.max(1, RATE * dt * (finishAt >= 0 ? 4 : 1)));
    for (let i = Math.floor(lit); i < Math.floor(next); i++) litAt[i] = t;
    lit = next;
    const n = Math.floor(lit), p = N ? n / N : 0;
    if (finishAt >= 0 && N && n >= N && novaAt < 0) novaAt = now; // (the supernova's clock: from the last star lighting)
    const hand = novaAt < 0 ? 0 : (now - novaAt) / 1000;
    cam = (() => { const yaw = 0.1 * Math.sin(t * 0.21), pitch = 0.055 * Math.sin(t * 0.17 + 1.3); return { cy: Math.cos(yaw), sy: Math.sin(yaw), cp: Math.cos(pitch), sp: Math.sin(pitch), d: 8 * (1 - 0.12 * p) }; })();
    // the sky: from the drawn gradient, its stars added at their depths
    img.data.set(back);
    for (const s of sky) {
      const q = project(s.x, s.y, s.z); if (!q) continue;
      const [X, Y, k] = q, a = Math.min(1, (s.band ? 0.18 + 0.4 * s.b : 0.4 + 0.6 * s.b) * (0.65 + 0.35 * Math.sin(t * s.tw + s.ph)) * Math.min(1.5, 0.55 + k)), [r, g, b] = s.c;
      add(X, Y, r, g, b, a);
      if (k > 1.6 || (!s.band && s.b > 0.985)) cross(X, Y, r, g, b, a * 0.45, !s.band && s.b > 0.993 ? 4 : 1); // (the nearest and the brightest a small cross, the brightest spiked)
    }
    // the galaxy's stars, dim, turning slowly
    const spin = t * 0.012, cs = Math.cos(spin), sn = Math.sin(spin);
    if (gal) for (const g of gal) { const q = project(g.x * cs - g.y * sn, g.x * sn + g.y * cs, 0.06); if (!q) continue; add(q[0], q[1], g.c[0], g.c[1], g.c[2], g.a * 0.4); if (g.big) cross(q[0], q[1], g.c[0], g.c[1], g.c[2], g.a * 0.2, 2); }
    // the seal: unlit stars a faint ghost, lit ones gold, each flashing as it lights; all brightening as the last one goes
    const flare = Math.min(1, hand / 0.5);
    for (const s of stars) {
      const q = project(s.x, s.y, 0); if (!q) continue;
      const [X, Y] = q;
      if (s.at >= n) { if (GHOST > 0) add(X, Y, 150, 160, 210, GHOST); continue; }
      const fresh = Math.max(0, 1 - (t - (litAt[s.at] ?? -99)) / FLASH), f = Math.max(fresh, flare), tw = 0.85 + 0.15 * Math.sin(t * 2.3 + s.x * 40);
      add(X, Y, 255, 248, 226, Math.min(1, tw + flare + f * 0.5));
      cross(X, Y, STAR[0], STAR[1], STAR[2], (0.45 + 0.55 * f) * 0.55, 1);
      if (f > 0) { add(X + 1, Y + 1, STAR[0], STAR[1], STAR[2], f * 0.5); add(X - 1, Y + 1, STAR[0], STAR[1], STAR[2], f * 0.5); add(X + 1, Y - 1, STAR[0], STAR[1], STAR[2], f * 0.5); add(X - 1, Y - 1, STAR[0], STAR[1], STAR[2], f * 0.5); cross(X, Y, 255, 250, 235, fresh * 0.5, 3); }
    }
    x.putImageData(img, 0, 0);
    // the galaxy's gas over it all, added light, laid in the seal's plane
    if (gas) {
      const O = project(0, 0, 0.06), Xa = project(GL * cs, GL * sn, 0.06), Ya = project(-GL * sn, GL * cs, 0.06);
      if (O && Xa && Ya) { const k = 2 / GT, ax = (Xa[0] - O[0]) * k, ay = (Xa[1] - O[1]) * k, bx = (Ya[0] - O[0]) * k, by = (Ya[1] - O[1]) * k;
        x.save(); x.globalCompositeOperation = "lighter"; x.globalAlpha = 0.26; x.setTransform(ax, ay, bx, by, O[0] - (ax + bx) * GT / 2, O[1] - (ay + by) * GT / 2); x.drawImage(gas, 0, 0); x.restore(); }
    }
    // the supernova: the last star's flash, then its remnant opening out, the screen to white, then the white clearing onto the game
    if (novaAt >= 0) {
      const last = stars.find(s => s.at === N - 1), c = last && project(last.x, last.y, 0), m = Math.max(W, H);
      const k = Math.min(1, hand / NOVA), ease = 1 - Math.pow(1 - k, 2.2), f = Math.max(0, 1 - hand / 0.7);
      if (c && f > 0) { const r0 = 3 + (1 - f) * m * 0.05, g = x.createRadialGradient(c[0], c[1], 0, c[0], c[1], r0 * 3); g.addColorStop(0, `rgba(255,255,255,${f})`); g.addColorStop(1, "rgba(255,240,200,0)"); x.fillStyle = g; x.fillRect(c[0] - r0 * 3, c[1] - r0 * 3, r0 * 6, r0 * 6);
        const L = m * 0.35 * (1 - f * 0.5); for (let i = 1; i < L; i++) { const a = ((1 - i / L) * f).toFixed(2); for (const [dx, dy] of [[i, 0], [-i, 0], [0, i], [0, -i]]) px(c[0] + dx, c[1] + dy, `rgba(255,248,220,${a})`); } }
      if (c && remnant) { const R = (0.04 + 0.9 * ease) * m * 0.62; x.save(); x.globalCompositeOperation = "lighter"; x.globalAlpha = Math.min(0.85, k * 2.2); x.translate(c[0], c[1]); x.rotate(k * 0.25); x.drawImage(remnant, -R, -R, 2 * R, 2 * R); x.restore(); }
      const w = hand < NOVA ? Math.pow(Math.max(0, (hand - NOVA * 0.72) / (NOVA * 0.28)), 1.6) : 1;
      white.style.opacity = w.toFixed(3);
      if (hand >= NOVA) { cv.style.display = "none"; root.style.background = "transparent"; white.style.opacity = Math.max(0, 1 - (hand - NOVA) / CLEAR).toFixed(3); }
      if (hand >= NOVA + CLEAR) close();
    }
  };
  requestAnimationFrame(frame);
  function close() { done = true; removeEventListener("resize", fit); root.remove(); }
  // The load's progress: its phases by the game's timing marks, each its share of a cold load's time (the cloud's, 2026-10-26: the
  // code and the map 6%, the world's 19 build steps 13%, the ground round her 9%, the art workers' sets 66%, the shaders, textures
  // and first draws 6%: render/view.ts readiness), each filling by its own count.
  const has = m => performance.getEntriesByName(m).length > 0;
  const loadShare = () => {
    const v = api.view;
    if (has("witch:prep-idle")) return 0.94 + 0.06 * (v?.readiness?.share ?? 0);
    if (has("witch:prep-ground") && v) { const tot = v.assets.done + v.assets.pending; return 0.28 + 0.66 * (tot ? v.assets.done / tot : 0); }
    if (has("witch:view")) return 0.19 + 0.09 * ["witch:prep-start", "witch:prep-warm", "witch:prep-ground"].filter(has).length / 3;
    if (has("witch:game")) return 0.06 + 0.13 * Math.min(1, performance.getEntriesByType("mark").filter(m => m.name.startsWith("witch:build-")).length / 19);
    return 0.06 * ["witch:prep", "witch:map-prep", "witch:game"].filter(has).length / 3;
  };
  const poll = setInterval(() => { if (done) clearInterval(poll); else api.set(loadShare()); }, 100);
  const api = {
    /** The game's view, once it has one (main.ts): its art's count and its shaders' readiness. */
    view: null,
    /** The load's progress, 0 to 1 (never going back). */
    set(s) { share = Math.max(share, Math.min(1, s)); },
    /** The game's ready: the last stars light, the last goes supernova, and the screen clears onto the game. */
    finish() { if (finishAt < 0) { remnant ??= remnantPicture(); finishAt = performance.now(); } },
    /** Gone at once (a start with no wake-up behind it). */
    cancel() { close(); },
  };
  return api;
}
