// The travelling animals' leash routes from above, as the rules re-plan them while she flies the treetops (Ed, 2026-10-06:
// "their travel paths (denoted by the leash dots) jump around as the path is updated"): N travellers follow her as she
// flies at treetop speed, turning hard, on a real map. Prints how far the drawn route's middle jumps in a frame, raw (the
// newest plan) and eased (render/routeEase.ts), and how sharply the creatures themselves turn; writes a frame strip, the
// raw routes above and the eased below, over a re-plan or two.
//   node tools/leash/route-strip.mjs [seed] [out.png]   (FRAMES=8 panels, EVERY=6 frames apart, N=4 travellers)
import { openRules } from "../balance/lib.mjs";

const seed = Number(process.argv[2] ?? 123), out = process.argv[3] ?? "previews/leash-route/strip.png";
const FRAMES = +(process.env.FRAMES ?? 8), EVERY = +(process.env.EVERY ?? 3), N = +(process.env.N ?? 4);
const R = await openRules();
const { TUNING } = await R.load("/src/rules/tuning.ts"), { generateMap } = await R.load("/src/rules/map.ts"), { stepTraveller } = await R.load("/src/rules/travel.ts");
const { easeRoute, ROUTE_SAMPLES } = await R.load("/src/render/routeEase.ts");
const map = generateMap(seed, TUNING), dt = 1 / 60, V = TUNING.treetopSpeed;
// Her: at treetop speed from home, turning hard (a quarter turn every 1.5 s, at 120° a second), one way then the other.
const her = { x: map.home?.x ?? 0, z: map.home?.z ?? 0, h: 0 };
const turnAt = t => { const k = Math.floor(t / 1.5), into = t - k * 1.5; return into < 0.75 ? (k % 3 === 2 ? -1 : 1) * (Math.PI * 2 / 3) : 0; };
const cs = Array.from({ length: N }, (_, i) => ({ id: i, x: her.x - 120 - i * 40, z: her.z + (i - N / 2) * 50, level: 1, species: "wolf", speed: 2.4, walk: 0, facing: 1, tx: 0, tz: 0 }));
const shapes = new Map(), frames = [];
let lastRaw = new Map(), lastEased = new Map(), jumpRaw = [], jumpEased = [], turns = [], replans = 0, prevHead = new Map();
const total = Math.round(8 / dt);
for (let f = 0; f < total; f++) {
  const t = f * dt;
  her.h += turnAt(t) * dt; her.x += Math.cos(her.h) * V * dt; her.z += Math.sin(her.h) * V * dt;
  const panel = { her: { ...her }, raw: [], eased: [], cs: [] };
  for (const c of cs) {
    const was = c.route, px = c.x, pz = c.z;
    stepTraveller(c, her.x, her.z, map, dt, TUNING);
    if (c.route !== was) replans++;
    const head = Math.atan2(c.z - pz, c.x - px);
    if (prevHead.has(c.id)) { let d = Math.abs(head - prevHead.get(c.id)); if (d > Math.PI) d = Math.PI * 2 - d; turns.push(d / dt); }
    prevHead.set(c.id, head);
    const r = c.route, plan = [{ x: c.x, z: c.z }, ...r.points.slice(Math.min(r.next, r.points.length - 1), -1), { x: her.x, z: her.z }];
    const e = easeRoute(shapes.get(c.id), plan, t, 0.3); shapes.set(c.id, e.shape);
    // The raw route resampled the same way (the plan's bend, uneased), for a fair comparison at its middle.
    const raw = easeRoute(undefined, plan, t, 0.3).line, mr = raw[ROUTE_SAMPLES / 2], me = e.line[ROUTE_SAMPLES / 2];
    if (f > 60) {
      if (lastRaw.has(c.id)) jumpRaw.push(Math.hypot(mr.x - lastRaw.get(c.id).x, mr.z - lastRaw.get(c.id).z));
      if (lastEased.has(c.id)) jumpEased.push(Math.hypot(me.x - lastEased.get(c.id).x, me.z - lastEased.get(c.id).z));
    }
    lastRaw.set(c.id, mr); lastEased.set(c.id, me);
    panel.raw.push(plan); panel.eased.push(e.line); panel.cs.push({ x: c.x, z: c.z });
  }
  frames.push(panel);
}
await R.close();
const pct = (a, p) => { const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(p * s.length))]; };
const step = V * dt; // (what the middle moves anyway as she flies)
console.log(`seed ${seed}: ${N} travellers, ${(replans / 8).toFixed(1)} re-plans a second in all`);
console.log(`route middle's move a frame (m): raw p50 ${pct(jumpRaw, .5).toFixed(2)} p99 ${pct(jumpRaw, .99).toFixed(2)} max ${Math.max(...jumpRaw).toFixed(2)} | eased p50 ${pct(jumpEased, .5).toFixed(2)} p99 ${pct(jumpEased, .99).toFixed(2)} max ${Math.max(...jumpEased).toFixed(2)} (her own move a frame ${step.toFixed(2)})`);
console.log(`the creatures' own turning (°/s): p50 ${(pct(turns, .5) * 57.3).toFixed(0)} p99 ${(pct(turns, .99) * 57.3).toFixed(0)} max ${(Math.max(...turns) * 57.3).toFixed(0)}`);
// The frame strip: zoomed on the middle of the route that jumps most, around that jump.
let worst = 0, wi = 0, wc = 0; for (let i = 71; i < frames.length; i++) for (let c = 0; c < N; c++) { const a = frames[i - 1].raw[c], b = frames[i].raw[c], ma = easeRoute(undefined, a, 0, 1).line[ROUTE_SAMPLES / 2], mb = easeRoute(undefined, b, 0, 1).line[ROUTE_SAMPLES / 2], d = Math.hypot(ma.x - mb.x, ma.z - mb.z); if (d > worst) { worst = d; wi = i; wc = c; } }
const start = Math.max(0, wi - EVERY * Math.floor(FRAMES / 2)), pick = Array.from({ length: FRAMES }, (_, k) => frames[Math.min(frames.length - 1, start + k * EVERY)]);
const W = 260, H = 260, cols = ["#ff5fa2", "#5fd3ff", "#ffd35f", "#9dff5f", "#c08bff", "#ff9b5f"], HALF = +(process.env.HALF ?? 45);
const centre = easeRoute(undefined, frames[wi].raw[wc], 0, 1).line[ROUTE_SAMPLES / 2], mx = centre.x - HALF, mz = centre.z - HALF;
const sc = (W - 20) / (HALF * 2), P = (p, ox, oy) => `${(ox + 10 + (p.x - mx) * sc).toFixed(1)},${(oy + 10 + (p.z - mz) * sc).toFixed(1)}`;
const dots = (line, ox, oy, col) => { let s = "", carry = 0; const gap = 5; for (let i = 1; i < line.length; i++) { const a = line[i - 1], b = line[i], seg = Math.hypot(b.x - a.x, b.z - a.z); let u = carry; for (; u < seg; u += gap) { const k = u / seg; s += `<circle cx="${P({ x: a.x + (b.x - a.x) * k, z: a.z + (b.z - a.z) * k }, ox, oy).split(",")[0]}" cy="${P({ x: a.x + (b.x - a.x) * k, z: a.z + (b.z - a.z) * k }, ox, oy).split(",")[1]}" r="1.6" fill="${col}"/>`; } carry = u - seg; } return s; };
let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W * FRAMES}" height="${H * 2 + 54}"><rect width="100%" height="100%" fill="#0d1420"/>`;
pick.forEach((p, k) => {
  for (const [row, lines] of [[0, p.raw], [1, p.eased]]) {
    const ox = k * W, oy = 24 + row * H;
    svg += `<clipPath id="c${k}${row}"><rect x="${ox + 2}" y="${oy + 2}" width="${W - 4}" height="${H - 4}"/></clipPath><g clip-path="url(#c${k}${row})">`;
    svg += `<rect x="${ox + 2}" y="${oy + 2}" width="${W - 4}" height="${H - 4}" fill="none" stroke="#2a3550"/>`;
    lines.forEach((l, i) => { svg += dots(l, ox, oy, cols[i % cols.length]); const c = p.cs[i]; svg += `<circle cx="${P(c, ox, oy).split(",")[0]}" cy="${P(c, ox, oy).split(",")[1]}" r="3.5" fill="${cols[i % cols.length]}" stroke="#fff"/>`; });
    svg += `</g>`;
  }
  svg += `<text x="${k * W + 8}" y="16" fill="#aab" font-family="monospace" font-size="12">+${(k * EVERY / 60).toFixed(2)} s</text>`;
});
svg += `<text x="8" y="${H * 2 + 44}" fill="#aab" font-family="monospace" font-size="12">${HALF * 2} m across, the middle of a traveller's route (her at ${V} m/s, turning hard) · top: as before, each re-plan drawn at once · bottom: eased (render/routeEase.ts)</text></svg>`;
let pw; try { pw = await import("playwright"); } catch { pw = await import("/opt/node22/lib/node_modules/playwright/index.js"); }
const browser = await (pw.chromium ?? pw.default.chromium).launch(), page = await browser.newPage({ viewport: { width: W * FRAMES, height: H * 2 + 54 } });
await page.setContent(`<body style="margin:0">${svg}</body>`); await page.screenshot({ path: out }); await browser.close();
console.log(`wrote ${out}`);
