// Seeded single-cap mushrooms on the witch's art grid. Only the spots emit light.
import { Sprite, M, rng, hsv2rgb, bake, defaultCanvas } from "./core.js";
import { witchHeight } from "./witch.js";

export const MUSHROOM_TYPES = {
  red: { hue: .99, sat: .82 }, yellow: { hue: .14, sat: .86 },
  green: { hue: .30, sat: .70 }, blue: { hue: .61, sat: .77 },
  orange: { hue: .065, sat: .90 }, purple: { hue: .76, sat: .66 },
  pink: { hue: .91, sat: .58 }, turquoise: { hue: .48, sat: .76 },
  white: { hue: .13, sat: .08 },
};
export const BIOME_MUSHROOMS = {
  temperate: "red", cold: "blue", "mountains and glaciers": "white",
  volcanic: "orange", badlands: "purple", hot: "yellow",
  "mangrove swamp": "turquoise", jungle: "pink", "cold rainforest": "green",
};

// Editing limits and default [min, max]. Fractional controls display as percentages.
export const MUSHROOM_RANGES = {
  height: { label: "Height / witch", range: [.5, 2 / 3], limits: [0, 1.5], percent: true },
  pointiness: { label: "Flat → pointed", range: [.4, .7], limits: [0, 1], percent: true },
  width: { label: "Cap width / height", range: [.65, 1.04], limits: [0, 3], percent: true },
  cap: { label: "Cap depth / height", range: [.28, .43], limits: [0, 1], percent: true },
  bend: { label: "Stem bend", range: [-.15, .15], limits: [-1, 1], percent: true },
  twist: { label: "Stem twist", range: [-.1, .1], limits: [-1, 1], percent: true },
  lean: { label: "Cap tilt", range: [-.07, .07], limits: [-1, 1], percent: true },
  curl: { label: "Rim curl", range: [0, .12], limits: [0, 1], percent: true },
  stem: { label: "Stem thickness / height", range: [.18, .27], limits: [0, 1], percent: true },
  spotCount: { label: "Spot count (space permitting)", range: [5, 7], limits: [0, 18] },
  spotRadius: { label: "Spot radius / cap radius", range: [.065, .115], limits: [0, 1], percent: true },
  spotVariation: { label: "Spot size variation", range: [.45, .45], limits: [0, 1], percent: true },
  bigSpots: { label: "Big spots", range: [.5, .5], limits: [0, 1], percent: true },
};

export function mushroomRanges(ranges = {}) {
  return Object.fromEntries(Object.entries(MUSHROOM_RANGES).map(([key, d]) => {
    const value = ranges[key] ?? d.range;
    if (!Array.isArray(value) || value.length !== 2 || !value.every(Number.isFinite)) throw new TypeError(`Invalid mushroom range: ${key}`);
    const pair = value.map(x => Math.max(d.limits[0], Math.min(d.limits[1], x))).sort((a, b) => a - b);
    return [key, key === "spotCount" ? pair.map(Math.round) : pair];
  }));
}

export function mushroomGenome(type = "red", seed = 0, ranges = {}) {
  if (!Object.hasOwn(MUSHROOM_TYPES, type)) throw new RangeError(`Unknown mushroom type: ${type}`);
  const r = rng((seed >>> 0) ^ Math.imul(Object.keys(MUSHROOM_TYPES).indexOf(type) + 1, 104729));
  const sampled = Object.fromEntries(Object.entries(mushroomRanges(ranges)).map(([k, [a, b]]) =>
    [k, k === "spotCount" ? Math.min(b, a + Math.floor(r() * (b - a + 1))) : a + (b - a) * r()]));
  return { type, seed, ...sampled, ratio: sampled.height };
}

export function mushroomColours(type = "red") {
  const c = MUSHROOM_TYPES[type];
  if (!c) throw new RangeError(`Unknown mushroom type: ${type}`);
  const saturation = type === "white" ? .03 : Math.max(.72, c.sat);
  return { [M.BODY]: hsv2rgb(c.hue, c.sat, .83),
    [M.BELLY]: [209, 190, 145], [M.ACCENT]: [139, 109, 91],
    [M.GLOW]: hsv2rgb(c.hue, saturation, 1), [M.MAGIC2]: hsv2rgb(c.hue, saturation * .25, 1) };
}

export function mushroomSprite(st = {}, { type = "red", seed = 0, ranges = {} } = {}) {
  const g = mushroomGenome(type, seed, ranges), H = Math.round(witchHeight(st) * g.height);
  const half = Math.ceil(H * (g.width / 2 + Math.abs(g.bend) + Math.abs(g.twist) + g.stem));
  const W = half * 2 + 6, sp = new Sprite(W, H + 4), foot = half + 3, bottom = H + 1;
  const capX = foot + H * g.bend, rx = H * g.width / 2;
  if (!H) {
    sp.anchors = { ground: [foot, bottom + 1] }; sp.genome = g;
    sp.spots = []; sp.capMask = new Uint8Array(sp.m.length); return sp;
  }
  const rise = H * g.cap * (.45 + .9 * g.pointiness), depth = Math.max(1, H * .075);
  const profile = u => {
    const round = Math.sqrt(Math.max(0, 1 - u * u)), cone = 1 - Math.abs(u);
    const pointed = Math.max(0, (g.pointiness - .4) / .6);
    const curve = round * (1 - pointed) + cone * pointed;
    const rim = g.lean * H * u - g.curl * H * Math.pow(Math.abs(u), 5);
    return [rim - rise * curve, rim];
  };
  let highest = 0, lowest = 0;
  // Measure at the actual column centres so even a thin pointed cap reaches the requested height.
  for (let x = 1; x < W - 1; x++) {
    const u = (x + .5 - capX) / rx;
    if (Math.abs(u) < 1) {
      highest = Math.min(highest, profile(u)[0]);
      lowest = Math.max(lowest, profile(u)[1] + depth * Math.sqrt(1 - u * u));
    }
  }
  // Fit extreme tilt/curl combinations into the requested total height without clipping.
  const verticalScale = Math.min(1, Math.max(0, H - 1) / Math.max(1, lowest - highest));
  const rimY = 2 - highest * verticalScale;
  const centre = t => foot + H * (g.bend * t + g.twist * Math.sin(t * Math.PI * 2));
  for (let y = Math.floor(rimY); g.stem > 0 && y <= bottom; y++) {
    const t = Math.max(0, Math.min(1, (bottom - y) / Math.max(1, bottom - rimY))), cx = centre(t);
    const radius = Math.max(.8, H * g.stem * (.50 - .16 * t + .10 * Math.cos(t * Math.PI * 2)));
    for (let x = Math.floor(cx - radius); x <= cx + radius; x++) {
      const nx = (x + .5 - cx) / radius;
      if (Math.abs(nx) <= 1) sp.px(x, y, M.BELLY, nx, -.1, Math.sqrt(1 - nx * nx));
    }
  }
  for (let x = 1; x < W - 1; x++) {
    const u = (x + .5 - capX) / rx; if (!rx || Math.abs(u) >= 1) continue;
    const [upper, lower] = profile(u), top = rimY + upper * verticalScale, rim = rimY + lower * verticalScale;
    const under = depth * Math.sqrt(1 - u * u) * verticalScale;
    for (let y = Math.max(1, Math.floor(top)); y < Math.min(bottom, rim + under); y++) {
      if (y + .5 < top) continue;
      if (y + .5 > rim) {
        const a = Math.atan2((y + .5 - rim) / depth, u);
        sp.px(x, y, Math.cos(a * 17) > .65 ? M.BELLY : M.ACCENT, u * .5, .5, .7);
      } else {
        const v = (y + .5 - top) / Math.max(1, rim - top), nx = u * .8, ny = -.7 + v * .8;
        sp.px(x, y, M.BODY, nx, ny, Math.sqrt(Math.max(.02, 1 - nx * nx - ny * ny)));
      }
    }
  }
  // Pack whole rasterised spots with a one-pixel cap margin at edges and between spots.
  // Reject rather than clip: small caps can fit fewer than the requested count.
  const capMask = Uint8Array.from(sp.m, m => m === M.BODY ? 1 : 0), occupied = new Uint8Array(sp.m.length);
  const candidates = [];
  for (let i = 0; i < capMask.length; i++) if (capMask[i]) candidates.push(i);
  const rand = rng((seed >>> 0) ^ 0x6a09e667 ^ Math.imul(Object.keys(MUSHROOM_TYPES).indexOf(type) + 1, 97));
  const placed = [];
  const minY = candidates.reduce((a, i) => Math.min(a, Math.floor(i / W)), sp.h);
  const maxY = candidates.reduce((a, i) => Math.max(a, Math.floor(i / W)), 0);
  // Normalised cap coordinates stop a wide cap's horizontal axis dominating spacing.
  const distance = (a, b) => Math.hypot((a.x - b.x) / Math.max(1, rx * 2), (a.y - b.y) / Math.max(1, maxY - minY));
  const bigCount = Math.round(g.spotCount * g.bigSpots);
  for (let slot = 0; g.spotRadius > 0 && slot < g.spotCount && candidates.length; slot++) {
    // Reserve room for the chosen number of large spots before filling with small ones.
    const big = slot < bigCount;
    const size = 1 + g.spotVariation * (big ? .35 + rand() * .65 : -(.35 + rand() * .65));
    const radius = Math.max(.55, rx * g.spotRadius * size);
    let best = null, bestScore = -Infinity;
    for (let attempt = 0; attempt < 160; attempt++) {
    const at = candidates[Math.floor(rand() * candidates.length)], cx = at % W + .5, cy = Math.floor(at / W) + .5;
    const pixels = [];
    let valid = true;
    for (let y = Math.floor(cy - radius); valid && y <= cy + radius; y++) for (let x = Math.floor(cx - radius); valid && x <= cx + radius; x++) {
      const d = ((x + .5 - cx) / radius) ** 2 + ((y + .5 - cy) / radius) ** 2;
      if (d > 1) continue;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const xx = x + dx, yy = y + dy, i = yy * W + xx;
        if (xx < 0 || xx >= W || yy < 0 || yy >= sp.h || !capMask[i] || occupied[i]) valid = false;
      }
      pixels.push([x, y, d]);
    }
    if (!valid || !pixels.length) continue;
    const candidate = { x: cx, y: cy, radius, pixels };
    let score = placed.length ? Math.min(...placed.map(p => distance(candidate, p))) : rand();
    // Prefer a triangle to three beads in a row, when the cap has room for it.
    if (placed.length === 2) {
      const [a, b] = placed;
      score += Math.abs((b.x - a.x) * (cy - a.y) - (b.y - a.y) * (cx - a.x)) / Math.max(1, rx * 2 * (maxY - minY));
    }
    score *= .9 + rand() * .2;
    if (score > bestScore) { best = candidate; bestScore = score; }
    }
    if (!best) continue;
    const { x: cx, y: cy, pixels } = best;
    const highlight = pixels.reduce((a, p) => {
      const cost = q => (q[0] + .5 - (cx - radius * .3)) ** 2 + (q[1] + .5 - (cy - radius * .4)) ** 2;
      return cost(p) < cost(a) ? p : a;
    });
    for (const [x, y] of pixels) {
      const shine = pixels.length > 1 && ((x === highlight[0] && y === highlight[1]) ||
        Math.hypot(x + .5 - (cx - radius * .3), y + .5 - (cy - radius * .4)) < radius * .32);
      sp.recolour(x, y, shine ? M.MAGIC2 : M.GLOW); occupied[y * W + x] = 1;
    }
    placed.push({ x: cx, y: cy, radius, big, pixels: pixels.map(([x, y]) => y * W + x) });
  }
  sp.anchors = { ground: [foot, bottom + 1] };
  sp.genome = g; sp.spots = placed; sp.capMask = capMask;
  return sp;
}

export function bakeMushroom(st = {}, options = {}, makeCanvas = defaultCanvas) {
  const sp = mushroomSprite(st, options);
  return { ...bake(sp, mushroomColours(sp.genome.type), st, "bare", makeCanvas),
    anchors: sp.anchors, genome: sp.genome, spots: sp.spots, scale: 1 };
}
