// The stump generator (Ed, 2026-10-29: "they should mostly look sawn and flat on top, but they don't have to be perfectly round";
// "the same model viewed from different directions, to get variety"). A species genome, a seed and an angle make one stump.
// Loaded after draw.js; adds PIECES.stumpgen (spec.genome, spec.seed, spec.angle).
const STUMP_GENOMES = {
  // (home) a great oak: broad and low, lobed, flaring into long ropey roots, an old tan top, moss on its north
  oak: { D: 10, spread: 25, H: 1.0, r0: 1.7, h: 1.25, lobes: [6, 8], amp: [0.35, 0.6], width: 0.3, flare: 0.55, flute: 0.25, roots: [8, 10], rootLen: [1.6, 2.4], rootArch: 0.9, branch: 0.5, top: "old", hollow: [0, 0.25], slab: 0, split: 0.3, bark: [78, 62, 50], root: [118, 104, 92], wood: [196, 156, 108], heart: [150, 104, 64], moss: 0.5 },
  // (cold rainforest) a red cedar: huge, deeply fluted, stringy red bark, a grey weathered top with a rotted heart
  cedar: { D: 12, spread: 24, H: 1.3, r0: 2.2, h: 1.7, lobes: [9, 12], amp: [0.18, 0.3], width: 0.22, flare: 0.9, flute: 0.6, roots: [6, 8], rootLen: [1.0, 1.6], rootArch: 0.8, branch: 0.3, top: "weathered", hollow: [0.18, 0.32], slab: 0, split: 0.5, bark: [112, 66, 48], root: [110, 84, 70], wood: [168, 160, 150], heart: [96, 74, 58], moss: 0.9 },
  // (cold) a spruce: narrower, shallow roots spreading far over the ground, a pale fresh top, frost
  spruce: { D: 8.5, spread: 26, H: 0.8, r0: 1.3, h: 0.95, lobes: [5, 7], amp: [0.25, 0.4], width: 0.35, flare: 0.45, flute: 0.2, roots: [10, 13], rootLen: [2.0, 2.8], rootArch: 0.45, branch: 0.6, top: "fresh", hollow: [0, 0], slab: 0, split: 0.2, bark: [74, 64, 60], root: [104, 94, 88], wood: [222, 196, 140], heart: [196, 156, 96], moss: 0.1, frost: 0.28 },
  // (mountains) a Scots pine: plated orange-grey bark, its top sawn in uneven slabs, resin, roots gripping
  pine: { D: 9, spread: 22, H: 0.9, r0: 1.45, h: 1.05, lobes: [5, 7], amp: [0.3, 0.5], width: 0.34, flare: 0.5, flute: 0.3, roots: [6, 8], rootLen: [1.3, 2.0], rootArch: 1.0, branch: 0.4, top: "slabs", hollow: [0, 0.15], slab: 0.35, split: 0.3, bark: [128, 82, 56], root: [120, 100, 84], wood: [214, 178, 120], heart: [176, 112, 58], moss: 0.3 },
  // (jungle) a kapok: tall plank buttresses fanning out like walls, smooth grey-green bark, pale soft wood
  kapok: { D: 7, spread: 24, H: 1.2, r0: 1.1, h: 2.0, lobes: [4, 6], amp: [0.7, 1.0], width: 0.13, flare: 1.0, flute: 0.1, roots: [4, 6], rootLen: [1.8, 2.6], rootArch: 1.5, branch: 0.2, plank: true, top: "fresh", hollow: [0, 0.1], slab: 0, split: 0.1, bark: [72, 70, 62], root: [84, 82, 74], wood: [226, 210, 172], heart: [204, 180, 136], moss: 0.6 },
  // (volcanic) charred: black bark split by heat, the top in burnt slabs, ash grey on top
  charred: { D: 10, spread: 22, H: 1.0, r0: 1.8, h: 1.3, lobes: [6, 8], amp: [0.25, 0.4], width: 0.3, flare: 0.5, flute: 0.4, roots: [6, 8], rootLen: [1.2, 1.9], rootArch: 0.9, branch: 0.4, top: "charred", hollow: [0.2, 0.4], slab: 0.3, split: 0.7, bark: [34, 30, 30], root: [46, 40, 38], wood: [70, 64, 60], heart: [30, 26, 26], moss: 0 },
  // (mangrove) lifted on a cage of stilt roots arching down into the water
  mangrove: { D: 7, spread: 22, H: 1.4, r0: 1.05, h: 2.3, lift: 0.6, lobes: [5, 7], amp: [0.15, 0.25], width: 0.3, flare: 0.2, flute: 0.2, roots: [18, 22], rootLen: [1.6, 2.4], rootArch: 0.9, branch: 0.3, stilts: true, top: "fresh", hollow: [0, 0.15], slab: 0, split: 0.2, bark: [96, 84, 70], root: [112, 98, 82], wood: [196, 140, 100], heart: [150, 86, 60], moss: 0.4 },
  // (hot) a baobab: a fat smooth bottle of a trunk, grey-pink, its fibrous top soft and pale, few short roots
  baobab: { D: 12, spread: 18, H: 1.2, r0: 2.5, h: 1.6, lobes: [5, 7], amp: [0.18, 0.3], width: 0.4, flare: -0.15, flute: 0.08, roots: [3, 5], rootLen: [0.8, 1.3], rootArch: 0.7, branch: 0.2, top: "fibrous", hollow: [0.15, 0.4], slab: 0, split: 0.2, bark: [150, 126, 116], root: [140, 120, 110], wood: [214, 196, 160], heart: [176, 150, 112], moss: 0 },
  // (badlands) a juniper: silver, twisted, split into strands, sparse and gnarled
  juniper: { D: 8, spread: 22, H: 0.9, r0: 1.45, h: 1.15, lobes: [4, 6], amp: [0.35, 0.6], width: 0.28, flare: 0.5, flute: 0.55, twist: 1.1, roots: [5, 7], rootLen: [1.4, 2.2], rootArch: 1.0, branch: 0.5, top: "weathered", hollow: [0.1, 0.3], slab: 0.15, split: 0.8, bark: [118, 114, 108], root: [126, 120, 112], wood: [196, 186, 170], heart: [150, 112, 82], moss: 0 },
};

PIECES.stumpgen = function ({ plot, lit, mix, hash: H, step }, spec) {
  const G = STUMP_GENOMES[spec.genome], seed = spec.seed ?? 1, ang = spec.angle ?? 0;
  const rnd = (k, a = 0) => H(seed * 17.13 + k, a, seed * 3.7);
  const pick = ([a, b], k) => a + (b - a) * rnd(k), pickI = (r, k) => Math.round(pick(r, k));
  const ca = Math.cos(ang), sa = Math.sin(ang);
  // (local to world: turned by its angle; the light and the moss stay the world's)
  const P = (x, z, y, c, o) => plot(x * ca - z * sa, x * sa + z * ca, y, c, o);
  const N = (nx, nz, ny) => { const l = Math.hypot(nx, nz, ny) || 1; return [(nx * ca - nz * sa) / l, (nx * sa + nz * ca) / l, ny / l]; };
  const K = spec.scale ?? 1.7, h = G.H / K * (0.85 + 0.3 * rnd(2)), lift = (G.lift ?? 0) / K; let r0 = 1;
  const nL = pickI(G.lobes, 3), lobes = [];
  for (let i = 0; i < nL; i++) lobes.push({ a: (i / nL) * Math.PI * 2 + (rnd(10 + i) - 0.5) * (Math.PI * 1.2 / nL), A: pick(G.amp, 20 + i), w: G.width * (0.7 + 0.6 * rnd(30 + i)) });
  const splitA = rnd(5) < G.split ? rnd(6) * Math.PI * 2 : null;
  
  const twist = G.twist ?? 0;
  // its outline at height y (0 the ground, h the top): lobes swelling toward the ground, clefts between them, a split
  const radius = (t, y) => {
    const u = Math.max(0, 1 - (y - lift) / (h - lift)), tw = t - twist * (y / h);
    let s = 0;
    for (const L of lobes) { let d = Math.abs(((tw - L.a + Math.PI * 3) % (Math.PI * 2)) - Math.PI); s += L.A * Math.exp(-((d / L.w) ** 2)) * (G.plank ? 0.15 + 1.6 * u * u : 0.6 + G.flare * u * u * 1.6); }
    let r = r0 * (1 + s - G.flute * 0.25) * (1 + (G.flare < 0 ? G.flare * Math.sin(Math.min(1, (y - lift) / (h - lift)) * Math.PI) * -1 : 0));
    r *= 1 - G.flute * 0.18 * (0.5 + 0.5 * Math.cos(tw * nL * 2.0 + 0.5)) * (0.4 + 0.6 * u);
    if (splitA !== null) { const d = Math.abs(((tw - splitA + Math.PI * 3) % (Math.PI * 2)) - Math.PI); if (d < 0.05) r *= 0.82; }
    return r;
  };
  // (sized: the top D metres across on average, its roots out to spread/2)
  { let m = 0; for (let i = 0; i < 64; i++) m += radius((i / 64) * Math.PI * 2, h); r0 = (G.D / 2 / K) / (m / 64) * (0.9 + 0.2 * rnd(1)); }
  // (the ring on its top: inside the narrowest of its outline, and the stack above it)
  { let mn = 1e9; for (let i = 0; i < 180; i++) mn = Math.min(mn, radius((i / 180) * Math.PI * 2, h)); mn *= K; spec.ringY = h * K + 0.04; spec.ringR = mn * 0.5; spec.ringCell = Math.min(0.6, (mn * 0.9 - spec.ringR) / 5.5); spec.ringBase = G.wood.map(v => v * 0.6); spec.top = h; }
  const reach = G.spread / 2 / K * (0.85 + 0.15 * rnd(4)), thick = G.D / 10;
  // the top: sawn flat, a little tilted; slabs (the saw went at different heights); its hollow
  const tilt = [(rnd(7) - 0.5) * 0.08, (rnd(8) - 0.5) * 0.08], hollow = pick(G.hollow, 9) * r0, nS = 3 + pickI([0, 3], 11);
  const slabCuts = Array.from({ length: nS }, (_, i) => (i / nS) * Math.PI * 2 + rnd(40 + i) * 0.8).sort((a, b) => a - b);
  const slabOf = t => { const tt = ((t % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2); let k = slabCuts.findIndex(c => c > tt); if (k < 0) k = 0; return k; };
  const topY = (x, z) => { const t = Math.atan2(z, x); return h + x * tilt[0] + z * tilt[1] - (G.slab ? G.slab * rnd(50 + slabOf(t)) : 0); };
  const bark = G.bark, frost = G.frost ?? 0;
  const mossy = (wx, wz, y, c, up) => { // (moss on its north (away) side and on top surfaces; frost the same way)
    const north = wz / Math.max(0.01, Math.hypot(wx, wz));
    const clump = 0.5 + 0.22 * Math.sin(wx * 1.9 + wz * 0.7 + y * 2.1) + 0.18 * Math.sin(wz * 2.6 - wx * 1.3 + y * 3.3) + 0.1 * Math.sin(wx * 5.1 + wz * 4.3) + (H(Math.round(wx * 14), Math.round(wz * 14), Math.round(y * 14)) - 0.5) * 0.12;
    if (G.moss && north > 0.15 && clump < G.moss * (north - 0.15) * (up ? 0.75 : 0.65)) c = H(Math.round(wx * 5), Math.round(y * 5)) > 0.4 ? [70, 104, 50] : [92, 124, 62];
    if (frost && (up || north > 0.3) && clump < frost * (up ? 0.75 : 0.35)) c = [214, 224, 236];
    return c;
  };
  // the sides: bark with vertical furrows following the twist, darker in the clefts
  for (let y = lift; y <= h + 0.02; y += step * 0.4) for (let t = 0, r = radius(0, y); t < Math.PI * 2; t += step * 0.7 / Math.max(r, Math.abs((radius(t + 0.004, y) - r) / 0.004), 0.3), r = radius(t, y)) {
    const x = Math.cos(t) * r, z = Math.sin(t) * r;
    if (y > topY(x, z)) continue;
    const dr = (radius(t + 0.01, y) - radius(t - 0.01, y)) / 0.02, rU = (radius(t, y + 0.02) - radius(t, y - 0.02)) / 0.04;
    let nx = Math.cos(t) * r + Math.sin(t) * dr, nz = Math.sin(t) * r - Math.cos(t) * dr; const nl = Math.hypot(nx, nz); nx /= nl; nz /= nl;
    const tw = t - twist * (y / h), furrow = H(Math.floor(tw * r0 * 9), Math.floor(y * (G.top === "fibrous" ? 2 : 0.6))) < 0.35 ? 0.72 : 1, cleft = Math.min(1, r / (r0 * 1.1));
    let c = bark.map(v => v * furrow * (0.65 + 0.35 * cleft));
    if (G.top === "charred" && H(Math.floor(tw * 20), Math.floor(y * 9)) < 0.06) c = [255, 110, 40].map(v => v * 0.45);
    const wx = x * ca - z * sa, wz = x * sa + z * ca;
    c = mossy(wx, wz, y, c, false);
    P(x, z, y, lit(c.map(v => v * 1.25), N(nx, nz, -rU * 0.6), 0.5));
  }
  // the top face
  const rings = 14 + pickI([0, 10], 12);
  for (let x = -r0 * 3; x <= r0 * 3; x += step) for (let z = -r0 * 3; z <= r0 * 3; z += step) {
    const p = Math.hypot(x, z), t = Math.atan2(z, x), R = radius(t, h); if (p > R) continue;
    const q = p / R, y = topY(x, z), wobble = Math.sin(t * 3 + seed) * 0.02 + Math.sin(t * 7) * 0.01;
    const ring = Math.floor((q + wobble) * rings) % 2, check = Math.abs(Math.sin(t * (2.5 + nL * 0.5) + seed)) < 0.025 && q > 0.25;
    let c;
    if (G.top === "weathered") { c = mix(G.wood, [120, 116, 110], 0.15 * ring); if (check || Math.abs(Math.sin(t * 9 + seed * 2)) < 0.012) c = [44, 40, 38]; }
    else if (G.top === "charred") { c = mix([62, 58, 56], [96, 92, 88], hash01(x, z)); if (check) c = [150, 60, 30]; }
    else if (G.top === "fibrous") { c = mix(G.wood, G.heart, 0.25 * ring + 0.3 * hash01(x * 3, z * 3)); }
    else { c = ring ? G.wood : mix(G.wood, G.heart, 0.25); if (q < 0.35) c = mix(c, G.heart, 0.6); if (check) c = mix(G.heart, [40, 30, 24], 0.6); }
    if (G.top !== "charred") c = mix(c, [124, 118, 108], G.top === "weathered" ? 0.15 : 0.42); // (cut long ago: weathered grey)
    if (q > 0.93) c = bark.map(v => v * 1.1); // (the bark's edge round the cut)
    if (p < hollow) { const k = p / hollow; c = mix([18, 14, 12], [70, 52, 40], k * k); P(x, z, y - (1 - k) * 0.5, c, { top: true }); continue; }
    if (G.top === "old" && H(Math.round(x * 6), Math.round(z * 6)) < 0.1) c = mix(c, [130, 120, 104], 0.6); // (weathering)
    const wx = x * ca - z * sa, wz = x * sa + z * ca;
    c = mossy(wx, wz, y, c, true);
    P(x, z, y, lit(c, [-tilt[0] * 3, -tilt[1] * 3, 1], 0.55).map(v => v * 0.9), { top: true });
  }
  // the slabs' walls (where the saw went at different heights)
  if (G.slab) for (let i = 0; i < nS; i++) { const t = slabCuts[i] + 0.002; for (let p = hollow; p <= radius(t, h); p += step) { const x = Math.cos(t) * p, z = Math.sin(t) * p, a = topY(x, z), b = topY(Math.cos(t - 0.01) * p, Math.sin(t - 0.01) * p); for (let y = Math.min(a, b); y <= Math.max(a, b); y += step) P(x, z, y, lit(G.wood.map(v => v * 0.7), N(-Math.sin(t), Math.cos(t), 0), 0.4)); } }
  // the roots: one out of most lobes and a few between, snaking, branching, arching into the ground and surfacing again
  const nR = pickI(G.roots, 13);
  const root = (a0, s0, y0, len, half, k, depth, vf = G.stilts ? 1 : Math.min(1, h * 0.6 / (half * 1.5))) => {
    return rootFrom(Math.cos(a0) * s0, Math.sin(a0) * s0, a0, y0, len, half, k, depth, vf);
  };
  const rootFrom = (px, pz, a0, y0, len, half, k, depth, vf) => {
    let a = a0, lastSeg = -1;
    const dives = G.stilts ? [] : [[0.38 + 0.22 * H(k, 31, depth), 0.09 + 0.07 * H(k, 32, depth)], ...(H(k, 33, depth) < 0.55 ? [[0.72 + 0.12 * H(k, 34, depth), 0.07 + 0.05 * H(k, 35, depth)]] : [])].filter((_, i) => H(k, 36 + i, depth) < 0.8);
    const branchAt = depth ? [] : [len * (0.3 + 0.2 * H(k, 21)), ...(H(k, 22) < G.branch ? [len * (0.55 + 0.15 * H(k, 23))] : [])];
    for (let s = 0; s < len; s += step) {
      const t = s / len, seg = Math.floor(s / 0.6); if (seg !== lastSeg) { lastSeg = seg; if (seg > 0) a += (H(k * 5 + seg, depth, 3) - 0.5) * 0.5; }
      px += Math.cos(a) * step; pz += Math.sin(a) * step; const cx = px, cz = pz, w = half * (1 - t * 0.55) * (0.9 + 0.2 * Math.sin(s * 3.1 + k));
      let arch;
      if (G.stilts) arch = y0 * Math.cos(t * Math.PI / 2) + 0.35 * G.rootArch * Math.sin(t * Math.PI); // (high from the trunk, down into the water)
      // (hugging the ground: high where it leaves the trunk, settling onto the earth, a gentle swell or two, sinking near its end)
      else {
        arch = y0 * (1 - t) ** 2.5 + w * 0.25 * Math.sin(t * Math.PI * (2 + rnd(k, 5) * 2)) * (1 - t) - (t > 0.85 ? (t - 0.85) * 4 * w : 0);
        // (Ed: "roots can go underground and sometimes emerge again further out")
        for (const [c0, wd] of dives) arch -= 1.8 * w * Math.max(0, 1 - Math.abs(t - c0) / wd);
      }
      if (arch > -w * 0.3) for (let v = -w; v <= w; v += step) {
        const qq = v / w, y = (arch + w * Math.sqrt(Math.max(0, 1 - qq * qq)) * (G.stilts ? 0.8 : 0.42)) * vf; if (y < 0.01) continue;
        const x = cx - Math.sin(a) * v, z = cz + Math.cos(a) * v, ridge = Math.abs(Math.sin(s * 5 + qq * 2 + k)) < 0.12 ? 0.78 : 1;
        let c = mix(G.root, bark.map(v => v * 1.25), 0.5).map(c0 => c0 * ridge); const wx = x * ca - z * sa, wz = x * sa + z * ca; c = mossy(wx, wz, y, c, qq > -0.2 && qq < 0.4);
        P(x, z, y, lit(c, N(-Math.sin(a) * qq * 0.9, Math.cos(a) * qq * 0.9, 0.7), 0.5));
        if (!G.stilts && Math.abs(qq) > 0.8) for (let y2 = 0; y2 < y; y2 += step) P(x, z, y2, lit(c.map(v => v * 0.72), N(-Math.sin(a) * Math.sign(qq), Math.cos(a) * Math.sign(qq), 0.1), 0.5));
      }
      else for (let v = -w * 1.1; v <= w * 1.1; v += step * 2) { const q2 = v / (w * 1.1), hy = Math.max(0.012, (arch + w) * 0.25 * vf) * (1 - q2 * q2); if (H(Math.round(s * 30), Math.round(v * 30)) < 0.75) P(cx - Math.sin(a) * v, cz + Math.cos(a) * v, hy, lit([62, 48, 34], N(-Math.sin(a) * q2, Math.cos(a) * q2, 1), 0.55)); } // (the earth heaved over it where it runs under)
      if (depth < 1 && branchAt.length && s >= branchAt[0]) { branchAt.shift(); const side = H(k, s, 2) > 0.5 ? 1 : -1; rootFrom(px, pz, a + side * (0.4 + 0.4 * H(k, s, 4)), Math.max(0.03, arch), len * (1 - t) * (0.6 + 0.4 * H(k, s, 5)), w * 0.6, k * 11 + s, depth + 1, vf); }
    }
  };
  for (let i = 0; i < nR; i++) {
    const L = lobes[i % nL], a = i < nL ? L.a : (i / nR) * Math.PI * 2 + rnd(60 + i);
    const startR = radius(a, lift) * (G.stilts ? 0.6 : 0.85), half = (G.plank ? 0.16 : 0.4 + 0.45 * rnd(70 + i)) * thick * (G.stilts ? 0.7 : 1);
    root(a + (rnd(97 + i) - 0.5) * 0.5, startR, G.stilts ? lift * (0.8 + 0.5 * rnd(80 + i)) : h * 0.18, (reach - startR) * (G.stilts ? 0.55 + 0.3 * rnd(95 + i) : (0.6 + 0.4 * rnd(90 + i)) * (i < nL ? 1 : 0.6)), half, i + 1, 0);
  }
  if (G.plank) for (const L of lobes) { /* plank buttresses are in the outline itself */ }
};
const hash01 = (x, z) => { const h = Math.sin(Math.round(x * 9) * 12.9898 + Math.round(z * 9) * 78.233) * 43758.5453; return h - Math.floor(h); };
// its ground: the earth darkened under its roots and fading out, dead leaves, a few chips; no ring of anything
SURROUNDS.stumpgen = ctx => {
  const { R, mix, floor } = ctx;
  apron(ctx, 0, R * 1.2, [44, 34, 24], 0.3);
  scatter(ctx, R * 0.3, R * 1.3, 0.45, 0.25, (e, n, t, h) => blob(ctx, e, n, 0.08 + 0.08 * h, 0.02, mix(floor, h > 0.5 ? [70, 52, 34] : [58, 72, 40], 0.45)));
};
WIDE.stumpgen = { tint: [60, 70, 40], kin: () => {} };
