// The great oak's crown over the treehouse (mock, Ed 2026-10-24): one canopy over the whole house, thick clumps and thin gappy
// patches, the oak's dark furrowed limbs showing through the gaps; a soft hole round her, the Terrace's take-off open to the sky.
// crownPass: the crown laid over the indoor view (house-v4.html's render). outside(): the oak from outside at night.
(function () {
const A = 24 * Math.PI / 180, HC = 5; // the indoor camera's pitch; the crown's underside, metres over the floor
// night leaves, darkest (a lobe's underside) to moonlit top; bark, darkest (a furrow) to lit ridge; moss on the limbs' tops
const LEAF = [[12, 22, 20], [20, 36, 28], [30, 52, 36], [48, 76, 48], [84, 112, 72]];
const BARK = [[24, 20, 20], [40, 33, 30], [58, 48, 42], [80, 68, 56]];
const MOSS = [[34, 50, 30], [52, 72, 40]];
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + .5) / 16);
const n3 = (x, y, z) => (noise(x, y) + noise(y + 31.7, z) + noise(z + 57.1, x + 13.3)) / 3;
const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

// ---- the crown's limbs in plan (the indoor view): over the house's own spine and branches, running on past the branch rooms and
// forking into twigs to the crown's edge; each trunk room sends two more out over its open side ----
const CL = [];
for (let i = 1; i < TRUNK.length; i++) CL.push({ a: TRUNK[i - 1], b: TRUNK[i], bend: i % 2 ? 1.5 : -1.5, w0: 2.4, w1: 2 });
for (const r of BRANCH) { const p = byId[r.from], L = Math.hypot(r.x - p.x, r.z - p.z), ux = (r.x - p.x) / L, uz = (r.z - p.z) / L;
  CL.push({ a: p, b: r, bend: r.bend, w0: 1.8, w1: 1.2 });
  for (const k of [-.7, .05, .6]) { const c = Math.cos(k), s = Math.sin(k), dx = ux * c - uz * s, dz = ux * s + uz * c, len = 10 + 6 * hash(r.x + k, r.z);
    CL.push({ a: r, b: { x: r.x + dx * len, z: r.z + dz * len }, bend: (hash(k, r.x) - .5) * 3, w0: .8, w1: .3 }); } }
for (const l of BARK_LIMBS) if (!l.root) CL.push(l); // revision 4: the limbs carrying on past the branch rooms, the topmost limbs over the Turret
for (const r of TRUNK) for (const k of [0, 1]) { const ang = (r.side > 0 ? Math.PI : 0) + (k ? .8 : -.8) + (hash(r.x, k) - .5) * .6, len = r.r + 9;
  CL.push({ a: r, b: { x: r.x + Math.cos(ang) * len, z: r.z + Math.sin(ang) * len }, bend: (hash(r.z, k) - .5) * 3, w0: 1, w1: .35 }); }
// the crown's density: big clumps (lobes) and smaller ones, thinning towards its ragged edge
const dens = (x, z) => fbm(x * .07 + 11, z * .07) * .65 + fbm(x * .21, z * .21 + 4) * .35;

let OPT = null; // { her: [x, z] or null, holeR: m }
window.crownSet = o => { OPT = o; };
window.crownPass = function (img, W, H, x0, z0, ZK, dist) {
  if (!OPT) return;
  const sh = Math.round(HC * Math.cos(A) * PPM * (ZK < 1 ? 1 : 0)), dzc = ZK < 1 ? HC / Math.tan(A) : 0; // (the crown 5 m up: on screen it sits 5 m x cos 24 higher)
  const her = OPT.her, hi = her ? (her[0] - x0) * PPM : 0, hj = her ? (her[1] - z0) * PPM * ZK - .8 * Math.cos(A) * PPM : 0;
  const RH = (OPT.holeR || 7) * PPM, RE = 1.8 * PPM, d = img.data, mask = new Uint8Array(W * H); // (mask: 1 the crown's leaves or limbs, 2 a gap)
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
    const k = j * W + i, x = x0 + (i + .5) / PPM, z = z0 + (j + .5) / (PPM * ZK), zc = z + dzc;
    if (her) { const r = Math.hypot(i - hi, j - hj); if (r < RH || (r < RH + RE && BAYER[(i & 3) + (j & 3) * 4] > (r - RH) / RE)) continue; } // the see-through hole
    const dC = j + sh < H ? dist[(j + sh) * W + i] : field(x, zc).d, ext = 9 + (fbm(x * .09, zc * .09) - .5) * 10;
    if (dC > ext) continue; // past the crown's ragged edge
    if (Math.hypot(x - TAKEOFF.x, zc - TAKEOFF.z) < 9 + (fbm(x * .3, zc * .3) - .5) * 4) continue; // the take-off, open to the sky
    const edge = Math.max(0, (dC - (ext - 7)) / 7) * .2, cd = dens(x, zc) - edge;
    let c = null;
    if (cd > .5) { // a thick clump: lit on its top (north) face, dark underneath (south), the leaves' own speckle
      const g = dens(x, zc - 1.2) - dens(x, zc + 1.2), leafy = noise(i * .3, j * .5) * .6 + noise(i * .7 + 9, j * 1.1) * .4, s = (cd - .5) * 3.5 - g * 9 + (leafy - .5) * 1.6;
      c = LEAF[s < .05 ? 0 : s < .4 ? 1 : s < .8 ? 2 : s < 1.2 ? 3 : 4];
    } else if (cd > .4 && hash(i >> 1, (j >> 1) + 7) < (cd - .4) / .1 * .55) c = LEAF[hash(i, j) < .5 ? 1 : 2]; // a thin patch: sprays
    if (!c) { // a gap: the oak's limbs, or the floor far below in the crown's shade
      let best = 1e9, bt = 0, bs = 0, bw = 1, bl = 1;
      for (const l of CL) { const [s, t, side] = limbFine(l, x, zc); if (s < best) { best = s; bt = t; bs = side; bw = l.w0 + (l.w1 - l.w0) * t; bl = Math.hypot(l.b.x - l.a.x, l.b.z - l.a.z); } }
      if (best < 0) { const across = bs / bw, fur = noise(bt * bl * .7, across * 2.4 + bl);
        c = fur < .36 ? BARK[0] : across < -.45 ? BARK[3] : across < .35 ? BARK[2] : BARK[1];
        if (across < -.2 && fbm(x * .7, zc * .7) > .62) c = MOSS[hash(i, j) < .5 ? 0 : 1]; }
      else { d[k * 4] *= .22; d[k * 4 + 1] *= .26; d[k * 4 + 2] *= .34; mask[k] = 2; continue; }
    }
    d[k * 4] = c[0]; d[k * 4 + 1] = c[1]; d[k * 4 + 2] = c[2]; mask[k] = 1;
  }
  // the string lights in the crown overhead: swags along its limbs and strings across its clumps, each bulb a pixel where the crown is
  // (none in her hole: they're up in the crown, cut away with it), its glow on the leaves round it and through the gaps onto the floor
  if (OPT.lights) { if (!IN_BULBS) IN_BULBS = inBulbs(); const gl = new Float32Array(W * H * 3), RG = 6, vis = [];
    for (const B of IN_BULBS) { const i = Math.floor((B.x - x0) * PPM), j = Math.floor((B.z - dzc - z0) * PPM * ZK + B.down * Math.cos(A) * PPM);
      if (i < 0 || j < 0 || i >= W || j >= H || mask[j * W + i] !== 1) continue; vis.push([i, j, B]);
      for (let jj = Math.max(0, j - RG); jj <= Math.min(H - 1, j + RG); jj++) for (let ii = Math.max(0, i - RG); ii <= Math.min(W - 1, i + RG); ii++) { const q = Math.hypot(ii - i, jj - j) / RG; if (q >= 1 || !mask[jj * W + ii]) continue;
        const f = (1 - q) * (1 - q) * (mask[jj * W + ii] === 2 ? .5 : .3), k = (jj * W + ii) * 3; gl[k] += B.c[0] * f; gl[k + 1] += B.c[1] * f; gl[k + 2] += B.c[2] * f; } }
    for (let k = 0; k < W * H; k++) for (let c = 0; c < 3; c++) d[k * 4 + c] = Math.min(255, d[k * 4 + c] + gl[k * 3 + c]);
    for (const [i, j, B] of vis) { const k = (j * W + i) * 4; d[k] = B.c[0]; d[k + 1] = B.c[1]; d[k + 2] = B.c[2]; }
  }
};
let IN_BULBS = null;
function inBulbs() { // the strings in plan (crown-space x, z), each bulb's drop below the swag's ends (m, shown lower on screen)
  const PAL = ["#fff1d6", "#ff6fcf", "#5fe8ff", "#ffe25c", "#b48cff", "#7dff8a"].map(h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16))), out = [];
  const str = (a, b, sag, o) => { const L = Math.hypot(b.x - a.x, b.z - a.z), n = Math.max(2, Math.round(L / 1.4)); for (let i = 0; i <= n; i++) { const u = i / n; out.push({ x: a.x + (b.x - a.x) * u, z: a.z + (b.z - a.z) * u, down: sag * 4 * u * (1 - u), c: PAL[(i + o) % 6] }); } };
  let o = 0;
  for (const l of CL) { if (l.w0 < .7) continue; const L = Math.hypot(l.b.x - l.a.x, l.b.z - l.a.z), nx = -(l.b.z - l.a.z) / L, nz = (l.b.x - l.a.x) / L, cx = (l.a.x + l.b.x) / 2 + nx * l.bend * 2, cz = (l.a.z + l.b.z) / 2 + nz * l.bend * 2;
    const at = t => ({ x: (1 - t) * (1 - t) * l.a.x + 2 * (1 - t) * t * cx + t * t * l.b.x, z: (1 - t) * (1 - t) * l.a.z + 2 * (1 - t) * t * cz + t * t * l.b.z }), n = Math.max(1, Math.round(L / 8));
    for (let i = 0; i < n; i++) str(at(i / n), at((i + 1) / n), 1.4, o++); }
  for (let i = 0; i < 70; i++) { const r = [...TRUNK, ...BRANCH][i % 14], a = hash(i, 3) * 6.28, d = hash(i, 4) * (r.r + 6), p = { x: r.x + Math.cos(a) * d, z: r.z + Math.sin(a) * d }, b = hash(i, 5) * 6.28, L = 9 + hash(i, 6) * 9;
    str(p, { x: p.x + Math.cos(b) * L, z: p.z + Math.sin(b) * L }, 2.5, o++); }
  return out; }
window.crownAfter = function (P, scale) { // her, a small pink marker where she stands
  if (!OPT || !OPT.her) return; const [px, pz] = P(OPT.her[0], OPT.her[1]), u = PPM * scale;
  ctx.fillStyle = "#ff7ac8"; ctx.strokeStyle = "#2a0a20"; ctx.lineWidth = Math.max(1, scale * .6);
  ctx.beginPath(); ctx.ellipse(px, pz - .75 * u, .35 * u, .75 * u, 0, 0, 7); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(px - .6 * u, pz - 1.4 * u); ctx.lineTo(px + .6 * u, pz - 1.4 * u); ctx.lineTo(px, pz - 2.6 * u); ctx.closePath(); ctx.fillStyle = "#3a1840"; ctx.fill(); ctx.stroke();
};

// ---- outside: the oak in the woods at night, an orthographic camera looking north and down ----
const FLOOR = 32; // the house's floor, metres up the oak
const TRUNK_AT = [-8, 44]; // (revision 4: the trunk stands under the Dining Room, its roots spreading below it on the plan)
function tubeInto(P, knots, kind = "bark") { // a Catmull-Rom through [x, y, z, r] knots, as spheres a third of a radius apart
    const k = [knots[0], ...knots, knots[knots.length - 1]];
    for (let i = 1; i < k.length - 2; i++) { const [p0, p1, p2, p3] = [k[i - 1], k[i], k[i + 1], k[i + 2]], L = Math.hypot(p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]);
      const n = Math.max(2, Math.ceil(L / (Math.min(p1[3], p2[3]) * .2)));
      for (let s = 0; s < n; s++) { const t = s / n, t2 = t * t, t3 = t2 * t, q = [0, 1, 2, 3].map(c => .5 * (2 * p1[c] + (-p0[c] + p2[c]) * t + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * t2 + (-p0[c] + 3 * p1[c] - 3 * p2[c] + p3[c]) * t3));
        const ax = [p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]].map(v => v / L);
        P.push({ c: q.slice(0, 3), r: q[3], kind, ax }); } } }
// the close-up's patch: a great limb forking under two thick clumps and a thin, gappy one, sprays at its edge
function closeup() { const P = [];
  tubeInto(P, [[-30, -2, 6, 2.6], [-12, 0, 2, 2.3], [4, -1, -1, 2], [24, 1, -4, 1.7]]);
  tubeInto(P, [[-6, -.5, 1.5, 1.4], [0, 1, 8, 1], [6, 2, 14, .5]]); tubeInto(P, [[10, -.5, -2, 1.1], [14, 2, -10, .7], [20, 4, -14, .3]]);
  tubeInto(P, [[0, 1, 8, .5], [-5, 3, 12, .25]]);
  for (const [x, y, z, r, thin] of [[-16, 7, -10, 9, 0], [14, 8, -14, 8.5, 0], [-4, 6, -18, 7, 0], [2, 4, 9, 7, .52], [16, 3, 8, 5.5, .58], [-18, 3, 12, 4, .45],
    [7, 2, 17, 2.6, .3], [-1, 1.5, 15, 2.2, .35], [21, 1, 13, 2, .3], [-22, 2, 20, 2.4, .35]]) P.push({ c: [x, y, z], r, kind: "leaf", thin });
  return P; }
let PRIMS = null; const STRINGS = [], BULBS = [];
function build() {
  const P = [], R = (a, b) => a + (b - a) * Math.random();
  let seed = 7; Math.random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; // (the same oak every time)
  const tube = (knots, kind) => tubeInto(P, knots, kind), limbKnots = []; // (limbKnots: every limb's knots, for the string lights)
  const [tx, tz] = TRUNK_AT;
  // the trunk, short and massive, its root buttresses flaring into the ground
  tube([[tx, -2, tz, 11], [tx, 8, tz, 8.5], [tx + 1, 16, tz - 1, 7.5], [tx, 22, tz, 7]]);
  for (let i = 0; i < 6; i++) { const a = i / 6 * 6.28 + .4, c = Math.cos(a), s = Math.sin(a);
    tube([[tx + c * 4, 9, tz + s * 4, 4.5], [tx + c * 10, 3, tz + s * 10, 3.6], [tx + c * 17, 0, tz + s * 17, 2.2], [tx + c * 22, -1, tz + s * 22, 1.2]]); }
  // the great limbs: up in a V from the low split, then out almost level, dipping and rising, forking towards the edge
  const GREAT = [
    [[tx, 20, tz, 6.5], [18, 36, -18, 5.4], [40, 40, -40, 4.4], [62, 35, -58, 3.4], [84, 41, -72, 2]],
    [[tx, 20, tz, 6.5], [-16, 35, -14, 5.4], [-40, 39, -30, 4.4], [-62, 33, -38, 3.2], [-86, 38, -46, 1.8]],
    [[tx, 20, tz, 6], [20, 33, 16, 5], [44, 36, 30, 4], [68, 31, 40, 3], [88, 35, 50, 1.6]],
    [[tx, 20, tz, 6], [-14, 32, 20, 5], [-36, 35, 38, 4], [-58, 30, 52, 3], [-80, 34, 64, 1.6]],
    [[tx, 20, tz, 6], [0, 42, -20, 4.6], [-4, 62, -40, 3.2], [2, 74, -62, 2]],
    [[tx, 20, tz, 5.5], [-6, 34, 28, 4.4], [-10, 33, 52, 3.2], [-14, 37, 78, 1.6]],
  ];
  const ends = [];
  for (const g of GREAT) { tube(g); limbKnots.push(g);
    for (let i = 1; i < g.length - 1; i++) for (let f = 0; f < 2; f++) { // forks: smaller twisting branches, out and up to the crown's shell
      const [x, y, z, r] = g[i], out = Math.atan2(z - tz, x - tx) + R(-.9, .9), len = R(18, 30), up = R(8, 26);
      const e = [x + Math.cos(out) * len, y + up, z + Math.sin(out) * len, .5];
      tube([[x, y, z, r * .55], [(x + e[0]) / 2 + R(-4, 4), y + up * .4 + R(-3, 3), (z + e[2]) / 2 + R(-4, 4), r * .35], e]); ends.push(e); } }
  // the house's own limb: its rooms ride on it, the bark showing below their floors
  for (let i = 1; i < TRUNK.length; i++) { const a = TRUNK[i - 1], b = TRUNK[i]; tube([[a.x, FLOOR - 5.5, a.z, 4.5], [(a.x + b.x) / 2 + (i % 2 ? 2 : -2), FLOOR - 6, (a.z + b.z) / 2, 4], [b.x, FLOOR - 5.5, b.z, 3.8]]); }
  tube([[tx, 20, tz, 6], [(tx + 10) / 2, FLOOR - 9, (tz + 8) / 2, 5], [10, FLOOR - 5.5, 8, 4.5]]);
  for (const r of BRANCH) { const p = byId[r.from], k = [[p.x, FLOOR - 4, p.z, 3], [(p.x + r.x) / 2, FLOOR - 4 + r.bend * .4, (p.z + r.z) / 2, 2.4], [r.x, FLOOR - 3.5, r.z, 2]]; tube(k); limbKnots.push(k); }
  // revision 4: each branch limb carries on past its room as bark, rising gently, forking to twigs out into the crown; the Turret's top limbs too
  const yOf = new Map(); for (const l of BARK_LIMBS) { if (l.root) continue; const ya = yOf.get(l.a) ?? FLOOR - 3.5, L = Math.hypot(l.b.x - l.a.x, l.b.z - l.a.z), yb = ya + L * (l.a === byId.turret || yOf.get(l.a) > FLOOR + 6 ? .55 : .3); yOf.set(l.b, yb);
    const nx = -(l.b.z - l.a.z) / L, nz = (l.b.x - l.a.x) / L, k = [[l.a.x, ya, l.a.z, l.w0 * .75], [(l.a.x + l.b.x) / 2 + nx * l.bend, (ya + yb) / 2 - 1, (l.a.z + l.b.z) / 2 + nz * l.bend, (l.w0 + l.w1) * .37], [l.b.x, yb, l.b.z, Math.max(.25, l.w1 * .75)]];
    tube(k); if (l.w0 > .7) limbKnots.push(k); }
  // the leaves: billowing lobes on a broad low dome (2:1), its outer ends sagging, its inner, lower crown left open
  const CX = 0, CZ = -4, RX = 92, RZ = 88, Y0 = 44, RY = 46;
  for (let n = 0; n < 480; n++) {
    const th = R(0, 6.283), ph = Math.asin(Math.random()) * 1.4 / 1.5708, sh = R(.8, 1.02), sag = 16 * Math.pow(Math.cos(ph), 6);
    const x = CX + RX * Math.cos(ph) * Math.cos(th) * sh, z = CZ + RZ * Math.cos(ph) * Math.sin(th) * sh, y = Y0 + RY * Math.sin(ph) * sh - sag;
    if (Math.hypot(x - TAKEOFF.x, z - TAKEOFF.z) < 18) continue; // the take-off's edge: open to the sky
    const dn = fbm(th * 1.6 + 3, ph * 2.6 + 1); if (dn < .3 && ph < 1.1) continue; // the gaps between the clumps
    const r = R(9, 14) * (1 - .3 * (1 - ph / 1.4) * Math.cos(ph)) * (ph > .9 ? 1.25 : 1);
    P.push({ c: [x, y, z], r, kind: "leaf", thin: dn < .45 ? .5 : 0 });
    if (ph < .55) for (let s = 0; s < 3; s++) { const a = th + R(-.5, .5), q = [x + Math.cos(a) * (r + R(1, 5)), y - R(0, 7), z + Math.sin(a) * (r + R(1, 5))]; // sprays and twigs sticking out of the edge
      P.push({ c: q, r: R(2, 3.5), kind: "leaf", thin: .3 }); tube([[x + Math.cos(a) * r * .5, y - 2, z + Math.sin(a) * r * .5, .7], [q[0], q[1], q[2], .3]]); }
  }
  for (const e of ends) P.push({ c: [e[0], e[1] + 2, e[2]], r: R(5, 8), kind: "leaf", thin: .35 }); // a clump at each fork's end
  // the string lights: swags hung under the limbs, and strings draped from clump to clump over the crown's top
  const PAL = ["#fff1d6", "#ff6fcf", "#5fe8ff", "#ffe25c", "#b48cff", "#7dff8a"].map(h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)));
  const string = (A, B, sag) => { const L = Math.hypot(B[0] - A[0], B[1] - A[1], B[2] - A[2]), n = Math.max(2, Math.round(L / 1.4)), sid = STRINGS.length, o = Math.floor(R(0, 6)), pts = [];
    for (let i = 0; i <= n; i++) { const u = i / n; pts.push([A[0] + (B[0] - A[0]) * u, A[1] + (B[1] - A[1]) * u - sag * 4 * u * (1 - u), A[2] + (B[2] - A[2]) * u]); }
    STRINGS.push({ A, B, sag, sid }); pts.forEach((p, i) => BULBS.push({ p, c: PAL[(i + o) % 6], u: i / n, sid, ph: R(0, 1) })); };
  for (const k of limbKnots) { let prev = null, acc = 0; // along each limb, a swag every 8 m or so, hung just under it
    for (let i = 1; i < k.length; i++) { const a = k[i - 1], b = k[i], L = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
      for (let d = 0; d < L; d += 8) { const u = d / L, q = [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u - (a[3] + (b[3] - a[3]) * u) * .95, a[2] + (b[2] - a[2]) * u];
        if (prev) string(prev, q, 1.4); prev = q; } } }
  const tops = P.filter(q => q.kind === "leaf" && q.r >= 8 && q.c[1] > Y0 - 6);
  for (const a of tops) { let best = null, bd = 1e9; for (const b of tops) { const d = Math.hypot(b.c[0] - a.c[0], b.c[2] - a.c[2]); if (b !== a && d > 12 && d < bd) { bd = d; best = b; } }
    if (!best || bd > 34) continue; const dx = (best.c[0] - a.c[0]) / bd, dz = (best.c[2] - a.c[2]) / bd;
    string([a.c[0] + dx * a.r * .55, a.c[1] + a.r * .9, a.c[2] + dz * a.r * .55], [best.c[0] - dx * best.r * .55, best.c[1] + best.r * .9, best.c[2] - dz * best.r * .55], 1.5); }
  for (const a of tops) { if (R(0, 1) > .55) continue; // garlands looped round a clump, lying on its leaves
    const el = R(.25, .7), o = R(0, 6.28), n = Math.round(2 * Math.PI * a.r * Math.cos(el) / 1.4), sid = STRINGS.length, k0 = Math.floor(R(0, 6));
    for (let i = 0; i < n; i++) { const th = o + i / n * 6.283, w = el + .12 * Math.sin(th * 3); BULBS.push({ p: [a.c[0] + a.r * 1.02 * Math.cos(w) * Math.cos(th), a.c[1] + a.r * 1.02 * Math.sin(w), a.c[2] + a.r * 1.02 * Math.cos(w) * Math.sin(th)], c: PAL[(i + k0) % 6], u: i / n, sid, ph: R(0, 1) }); }
    STRINGS.push({ ring: true, sid }); }
  // the woods round about: lower crowns, each two or three rounded clumps
  for (let gx = -330; gx < 330; gx += 11) for (let gz = -300; gz < 260; gz += 11) {
    const x = gx + R(-4, 4), z = gz + R(-4, 4), dr = Math.hypot((x - CX) / 1.05, z - CZ); if (dr < 82 + R(0, 14)) continue;
    const h = R(8, 13); for (let s = 0; s < 3; s++) P.push({ c: [x + R(-3, 3), h + R(-2, 2), z + R(-3, 3)], r: R(4, 6), kind: "wood" }); }
  return P;
}
const LIGHTS = () => [...TRUNK, ...BRANCH].filter(r => !r.locked).map(r => [r.x, FLOOR + 2.5, r.z, r.r + 7]);
let LT = null;
const glowAt = (x, y, z) => { let g = 0; for (const [lx, ly, lz, lr] of LT) { const d = Math.hypot(x - lx, (y - ly) * 1.3, z - lz); if (d < lr) g += (1 - d / lr) ** 2; } return Math.min(1, g); };

window.crownData = () => { if (!PRIMS) PRIMS = build(); LT = LIGHTS(); return { PRIMS, BULBS, FLOOR, glowAt }; };
window.outside = function ({ lights = 0, patch = false, pitch, cx, cy, cz, s, W, H, scale = 2, title = "", her = null, holeR = 14, moon = false }) {
  if (!PRIMS) PRIMS = build(); LT = patch ? [] : LIGHTS(); const prims = patch ? closeup() : PRIMS;
  const p = pitch * Math.PI / 180, sp = Math.sin(p), cp = Math.cos(p), F = [0, -sp, -cp], U = [0, cp, -sp];
  const L = (v => { const m = Math.hypot(...v); return v.map(c => c / m); })([-.45, .8, .25]); // the moon: high, west, a little behind her
  const zb = new Float32Array(W * H).fill(1e9), col = new Uint8ClampedArray(W * H * 4);
  const proj = q => { const dx = q[0] - cx, dy = q[1] - cy, dz = q[2] - cz; return [W / 2 + dx * s, H / 2 - (dy * cp - dz * sp) * s, -dy * sp - dz * cp]; };
  const FOG = [26, 34, 58];
  // the ground and the sky behind the far woods
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) { const u = (i + .5 - W / 2) / s, v = -(j + .5 - H / 2) / s, qy = cy + v * cp, qz = cz - v * sp, lam = qy / sp, gz = qz - lam * cp, k = j * W + i;
    let c; if (gz < -305 && !patch) { const t = j / H; c = mix([8, 12, 30], [30, 40, 70], Math.min(1, t * 2.2)); if (hash(i, j) > .9965) c = [200, 210, 230]; }
    else { const n = fbm((cx + u) * .1, gz * .1); c = mix(n > .55 ? [14, 22, 18] : [10, 16, 14], FOG, Math.min(.7, Math.max(0, (lam - 120) / 500))); }
    col.set([...c, 255], k * 4); }
  if (moon) { const mx = W * .16, my = H * .1, mr = W * .035; for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) { const d = Math.hypot(i - mx, j - my); if (d < mr * 3 && zb[j * W + i] === 1e9) { const k = (j * W + i) * 4;
      if (d < mr) { const c = mix([236, 232, 210], [200, 196, 176], noise(i * .3, j * .3) > .6 ? 1 : 0); col.set([...c, 255], k); } else if (j < H * .4) { const g = (1 - (d - mr) / (mr * 2)) * .25; for (let c = 0; c < 3; c++) col[k + c] += 120 * g; } } } }
  const hs = her ? proj(her) : null, RH = holeR * s, RE = 3 * s;
  const put = (i, j, t, c) => { const k = j * W + i; zb[k] = t; col[k * 4] = c[0]; col[k * 4 + 1] = c[1]; col[k * 4 + 2] = c[2]; };
  if (!patch) // the floors: wood lit warm by the rooms' lamps, seen where the crown lets them
  { const xs = [...TRUNK, ...BRANCH].map(r => r.x), zs = [...TRUNK, ...BRANCH].map(r => r.z), corners = [];
    for (const x of [Math.min(...xs) - 16, Math.max(...xs) + 16]) for (const z of [Math.min(...zs) - 16, Math.max(...zs) + 16]) corners.push(proj([x, FLOOR, z]));
    const i0 = Math.max(0, Math.floor(Math.min(...corners.map(c => c[0])))), i1 = Math.min(W, Math.ceil(Math.max(...corners.map(c => c[0])))), j0 = Math.max(0, Math.floor(Math.min(...corners.map(c => c[1])))), j1 = Math.min(H, Math.ceil(Math.max(...corners.map(c => c[1]))));
    VIEW = "game";
    for (let j = j0; j < j1; j++) for (let i = i0; i < i1; i++) { const u = (i + .5 - W / 2) / s, v = -(j + .5 - H / 2) / s, qy = cy + v * cp, qz = cz - v * sp, lam = (qy - FLOOR) / sp, x = cx + u, z = qz - lam * cp;
      let near = 1e9; for (const r of [...TRUNK, ...BRANCH]) near = Math.min(near, Math.hypot(x - r.x, z - r.z) - r.r); if (near > 14) continue;
      const f = field(x, z); if (f.d > 0) continue;
      let c = f.d > -.6 ? BARK[hash(i, j) < .5 ? 1 : 2] : floorTone(x, z, f.parts, false); const g = glowAt(x, FLOOR, z); c = mix(c.map(v => v * .55), [230, 160, 90], g * .35);
      put(i, j, lam, c); } }
  // everything else, sphere by sphere through the depth buffer
  for (const q of prims) {
    const [sx, sy, tc] = proj(q.c), R = q.r * s, i0 = Math.max(0, Math.floor(sx - R)), i1 = Math.min(W, Math.ceil(sx + R)), j0 = Math.max(0, Math.floor(sy - R)), j1 = Math.min(H, Math.ceil(sy + R));
    if (i0 >= i1 || j0 >= j1) continue;
    let e1, e2; if (q.ax) { const a = q.ax, t = Math.abs(a[1]) < .9 ? [0, 1, 0] : [1, 0, 0]; e1 = [a[1] * t[2] - a[2] * t[1], a[2] * t[0] - a[0] * t[2], a[0] * t[1] - a[1] * t[0]]; const m = Math.hypot(...e1); e1 = e1.map(v => v / m); e2 = [a[1] * e1[2] - a[2] * e1[1], a[2] * e1[0] - a[0] * e1[2], a[0] * e1[1] - a[1] * e1[0]]; }
    for (let j = j0; j < j1; j++) for (let i = i0; i < i1; i++) {
      const u = (i + .5 - sx) / s, v = -(j + .5 - sy) / s, qq = u * u + v * v; if (qq >= q.r * q.r) continue;
      const h = Math.sqrt(q.r * q.r - qq), t = tc - h; if (t >= zb[j * W + i]) continue;
      const P = [q.c[0] + u - h * F[0], q.c[1] + v * U[1] - h * F[1], q.c[2] + v * U[2] - h * F[2]], n = [(P[0] - q.c[0]) / q.r, (P[1] - q.c[1]) / q.r, (P[2] - q.c[2]) / q.r];
      const lam = n[0] * L[0] + n[1] * L[1] + n[2] * L[2], rr = qq / (q.r * q.r);
      let c;
      if (q.kind === "bark") {
        if (hs && P[1] > FLOOR + 1) { const r = Math.hypot(i - hs[0], j - hs[1]); if (r < RH || (r < RH + RE && BAYER[(i & 3) + (j & 3) * 4] > (r - RH) / RE)) continue; }
        const along = P[0] * q.ax[0] + P[1] * q.ax[1] + P[2] * q.ax[2], ang = Math.atan2(n[0] * e2[0] + n[1] * e2[1] + n[2] * e2[2], n[0] * e1[0] + n[1] * e1[1] + n[2] * e1[2]);
        const fur = noise(along * .35, ang * Math.max(1.5, q.r * 1.1)), sh = lam * .8 + .25;
        c = fur < .34 ? BARK[0] : sh > .75 ? BARK[3] : sh > .4 ? BARK[2] : BARK[1];
        if (n[1] > .55 && fbm(P[0] * .4, P[2] * .4 + P[1] * .2) > .58) c = MOSS[hash(i, j) < .5 ? 0 : 1];
        const g = glowAt(...P); if (g > 0) c = mix(c, [190, 120, 64], g * .55 * Math.max(.3, -n[1] + .6));
      } else {
        const nn = n3(P[0] * .32, P[1] * .32, P[2] * .32) * .75 + n3(P[0] * 1.1 + 5, P[1] * 1.1, P[2] * 1.1) * .25, fine = n3(P[0] * 1.4, P[1] * 1.4 + 3, P[2] * 1.4);
        if (rr > .45 + (nn - .3) * 1.5) continue; // the lobe's ragged, lumpy edge
        if (q.thin && n3(P[0] * .7 + 9, P[1] * .7, P[2] * .7) * .5 + n3(P[0] * 2.2, P[1] * 2.2 + 4, P[2] * 2.2) * .5 < q.thin) continue; // a thin, gappy patch
        if (q.kind === "leaf" && hs) { const r = Math.hypot(i - hs[0], j - hs[1]); if (r < RH || (r < RH + RE && BAYER[(i & 3) + (j & 3) * 4] > (r - RH) / RE)) continue; }
        const sh = lam * .85 + (nn - .5) * 1.2 + (fine - .5) * .9 + (hash((i / 3) | 0, (j / 3) | 0) - .5) * .25 + (n[1] < -.25 ? -.5 : 0);
        c = LEAF[sh < -.05 ? 0 : sh < .3 ? 1 : sh < .62 ? 2 : sh < .9 ? 3 : 4];
        if (q.kind === "wood") { const sd = Math.hypot((P[0] + 8) / 100, (P[2] - 6) / 96); c = LEAF[sh < .2 ? 0 : sh < .7 ? 1 : 2].map(v => v * (sd < 1.12 ? .5 : .72)); } // (the oak's shadow on the woods round its foot)
        else { const g = glowAt(...P); if (g > 0) c = mix(c, [150, 120, 50], g * .45 * Math.max(.2, -n[1] + .5)); }
      }
      const fog = Math.min(.75, Math.max(0, (t - 140) / 520)); if (fog > 0) c = mix(c, FOG, fog);
      put(i, j, t, c);
    }
  }
  // the string lights: off, dark glass on a dark wire (seen near); on, each bulb a pixel of the party's palette (two near), its glow on what's round it.
  // lights between 0 and 1: switching on, running along each string from its start (the party's start at the decks)
  if (!patch && BULBS.length) {
    const near = s >= 6, gl = new Float32Array(W * H * 3), RG = Math.max(2.5, s * 1.1), vis = [];
    if (near) for (const S of STRINGS) { if (S.ring) continue; const L = Math.hypot(S.B[0] - S.A[0], S.B[1] - S.A[1], S.B[2] - S.A[2]), n = Math.ceil(L / .3);
      for (let i = 0; i <= n; i++) { const u = i / n, q = [S.A[0] + (S.B[0] - S.A[0]) * u, S.A[1] + (S.B[1] - S.A[1]) * u - S.sag * 4 * u * (1 - u), S.A[2] + (S.B[2] - S.A[2]) * u], [x, y, t] = proj(q), a = x | 0, b = y | 0;
        if (a < 0 || b < 0 || a >= W || b >= H || t > zb[b * W + a] + .5) continue; if (hs && q[1] > FLOOR + 1 && Math.hypot(a - hs[0], b - hs[1]) < RH) continue; const k = (b * W + a) * 4; col[k] = 16; col[k + 1] = 13; col[k + 2] = 14; } }
    for (const B of BULBS) { const [x, y, t] = proj(B.p), a = x | 0, b = y | 0; if (a < 0 || b < 0 || a >= W || b >= H || t > zb[b * W + a] + .8) continue;
      if (hs && B.p[1] > FLOOR + 1 && Math.hypot(a - hs[0], b - hs[1]) < RH) continue;
      const on = lights > 0 && B.u <= lights, fog = Math.min(.6, Math.max(0, (t - 140) / 700)); vis.push([a, b, on, B, fog]);
      if (on) { const r = Math.ceil(RG); for (let j = Math.max(0, b - r); j <= Math.min(H - 1, b + r); j++) for (let i = Math.max(0, a - r); i <= Math.min(W - 1, a + r); i++) {
        const d = Math.hypot(i - a, j - b) / RG; if (d >= 1) continue; const f = (1 - d) * (1 - d) * .5 * (1 - fog), k = (j * W + i) * 3; gl[k] += B.c[0] * f; gl[k + 1] += B.c[1] * f; gl[k + 2] += B.c[2] * f; } } }
    for (let k = 0; k < W * H; k++) for (let c = 0; c < 3; c++) col[k * 4 + c] += gl[k * 3 + c];
    for (const [a, b, on, B, fog] of vis) { const tw = 1 - .35 * .5 * (1 + Math.sin(B.ph * 40)), c = on ? mix(B.c.map(v => Math.min(255, v * (.85 + .3 * tw))), FOG, fog * .5) : B.c.map(v => v * .18 + 18);
      if (!on && !near) continue; const sz = near ? 2 : 1; for (let j = b; j < Math.min(H, b + sz); j++) for (let i = a; i < Math.min(W, a + sz); i++) { const k = (j * W + i) * 4; col[k] = c[0]; col[k + 1] = c[1]; col[k + 2] = c[2]; } }
  }
  const im = new ImageData(col, W, H), tmp = document.createElement("canvas"); tmp.width = W; tmp.height = H; tmp.getContext("2d").putImageData(im, 0, 0);
  cv.width = W * scale; cv.height = H * scale; ctx.imageSmoothingEnabled = false; ctx.drawImage(tmp, 0, 0, W * scale, H * scale);
  if (hs) { ctx.fillStyle = "#ff7ac8"; ctx.strokeStyle = "#2a0a20"; ctx.lineWidth = 2; const u = s * scale; ctx.beginPath(); ctx.ellipse(hs[0] * scale, hs[1] * scale, .5 * u, 1 * u, 0, 0, 7); ctx.fill(); ctx.stroke(); }
  if (title) { ctx.font = `bold ${Math.round(9 * scale)}px sans-serif`; ctx.textAlign = "left"; ctx.lineWidth = 4; ctx.strokeStyle = "#000"; ctx.fillStyle = "#fff"; ctx.strokeText(title, 8 * scale, 14 * scale); ctx.fillText(title, 8 * scale, 14 * scale); }
};
})();
