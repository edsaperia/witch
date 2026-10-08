// The soundsystem generator (Ed, 2026-10-08: "the soundsystems in the game look pretty similar right now; I'd like for there to
// be a variety, for them all to point towards the dancefloor ... and broadly for the ones further away to be larger. Ideally we
// don't see any exactly identical ones on the map, so maybe we should make a generator."). Each area's soundsystem is a genome
// seeded from its area, grown from art/soundsystem.js's hand-made stacks (the same hewn-stone cabinets: bass bins with crystal
// cones over a glowing scoop, mid horns, flared horns, floating tweeter stones; runes, moss, shards, motes), now varied in:
//   tiers (2 to 5, more the further out), what each is (bass, mid, horn, tweet), how many blocks and how big, the profile
//   (stepped, straight, a tower, a wide wall), the crystal's colour (CRYSTALS), the stone's tint (STONES), moss, shards, the runes'
//   style, a lean and a sideways shift between tiers, and the projector on top (PROJECTORS: Ed, 2026-10-08, "every area stack gets
//   a projector on top"; the rendering builder's sky hologram rises from it, so the sprite carries its top as `projector`);
// drawn at any yaw (each turned to the dancefloor: soundsystemYaw), and sized by how far out it stands (soundsystemScale).
// soundsystemSet(map list) deals a map's whole set, re-rolling any two too alike (soundsystemSignature) so no two look the same.
//   node tools/soundsystem/sheet.mjs <png> [seed]   draws a map's set side by side
import { M, hash2, runeGlyph, hsv2rgb } from "./core.js";
import { Model, render } from "./model3d.js";
import { witchHeight } from "./witch.js";
import { dancefloorSpeakerFacing } from "./soundsystem.js";

// The crystal colours: glow, core (its brightest) and the crystal's body; and the stone tints: stone, its dark (carving, cracks).
export const CRYSTALS = {
  cyan: [.53, .76], violet: [.75, .63], amber: [.09, .8], rose: [.94, .62], lime: [.24, .7], teal: [.47, .78], gold: [.13, .65],
  magenta: [.84, .7], ice: [.58, .38], ember: [.02, .78], jade: [.38, .66],
};
export const STONES = {
  slate: [[78, 80, 94], [36, 36, 48]], basalt: [[58, 58, 66], [26, 26, 32]], sandstone: [[124, 102, 82], [62, 46, 38]],
  greenstone: [[74, 88, 78], [34, 42, 38]], granite: [[104, 100, 104], [50, 46, 52]], bluestone: [[70, 82, 106], [30, 36, 54]],
  redstone: [[106, 72, 66], [52, 32, 32]],
};
/** The damage stages (Ed, 2026-10-08): the health share below which each shows (stage 1, 2, 3); destroyed at none. */
export const DAMAGE_STAGES = [0.75, 0.5, 0.25];
export const PROFILES = ["stepped", "straight", "tower", "wall"];
export const PROJECTORS = ["lens", "crystal", "orb", "prism"];
const SS_KINDS = ["bass", "mid", "horn", "tweet"];

const ssPick = (list, u) => list[Math.min(list.length - 1, Math.floor(u * list.length))];
/** Seeded numbers for a genome: r(k) in 0..1. */
const ssRng = (seed, salt) => k => hash2(seed, salt * 97 + k, 4211);

/** A soundsystem's genome from its seed (an area's), how far out it stands (0 by the dancefloor to 1 at the map's edge) and a salt
 *  (bumped to re-roll one too like another). Plain data: what to build, never pixels. */
export function soundsystemGenome(seed, far = 0.5, salt = 0) {
  const r = ssRng(seed, salt), f = Math.max(0, Math.min(1, far));
  const profile = ssPick(PROFILES, r(1));
  // tiers: more the further out (2 to 5), always bass at the foot; tweeters on top more often than not
  const nT = Math.max(2, Math.min(5, Math.round(2 + f * 2.2 + (r(2) - 0.5) * 1.6)));
  const tiers = [];
  for (let t = 0; t < nT; t++) {
    const top = t === nT - 1, u = r(10 + t);
    const kind = t === 0 ? "bass" : top && r(3) < 0.7 ? "tweet" : t === 1 && u < 0.35 ? "bass" : ssPick(["mid", "horn", "horn", "mid", "bass"], u);
    // blocks across, by profile: stepped narrows, straight keeps, a tower stays narrow, a wall is wide; wider the further out
    const base = profile === "tower" ? 2 : profile === "wall" ? 4 : 3, extra = f > 0.55 && r(20 + t) < f ? 1 : 0;
    let n = kind === "tweet" ? 1 + Math.floor(r(30 + t) * 3) : profile === "stepped" ? Math.max(1, base + extra - t) : profile === "tower" ? 1 + (t === 0 ? 1 : Math.floor(r(30 + t) * 2)) : base + extra - (t > 1 && r(30 + t) < 0.4 ? 1 : 0);
    n = Math.max(1, Math.min(5, n));
    const sz = { bass: [.24, .25, .28], mid: [.44, .15, .25], horn: [.21, .22, .23], tweet: [.18, .08, .16] }[kind];
    const k = 0.82 + r(40 + t) * 0.36, kw = kind === "mid" ? 1 / Math.max(1, n * 0.6) : 1;
    tiers.push({ kind, n, size: [+(sz[0] * k * Math.min(1.2, kw * 1.2)).toFixed(3), +(sz[1] * (0.85 + r(50 + t) * 0.3)).toFixed(3), +(sz[2] * k).toFixed(3)] });
  }
  return {
    seed, salt, far: +f.toFixed(3), profile, tiers,
    crystal: ssPick(Object.keys(CRYSTALS), r(4)), stone: ssPick(Object.keys(STONES), r(5)),
    moss: +(r(6) ** 1.4).toFixed(2), shards: 2 + Math.floor(r(7) * 7), rune: Math.floor(r(8) * 4), runeAll: r(9) < 0.3,
    lean: +((r(60) - 0.5) * 0.12).toFixed(3), shift: +((r(61) - 0.5) * 0.16).toFixed(3),
    projector: ssPick(PROJECTORS, r(62)), projectorSize: +(0.85 + r(63) * 0.4).toFixed(2),
  };
}

/** What makes two look alike at a glance: their shape (tiers and blocks), profile, crystal, stone and projector. Two with the same
 *  signature count as identical, and the set re-rolls one of them. */
export const soundsystemSignature = g => [g.profile, g.tiers.map(t => t.kind[0] + t.n).join(""), g.crystal, g.stone, g.projector].join("|");
/** How many visible traits two differ in (0: the same at a glance). */
export function soundsystemDiff(a, b) {
  let d = 0;
  for (const k of ["profile", "crystal", "stone", "projector"]) if (a[k] !== b[k]) d++;
  if (a.tiers.map(t => t.kind[0] + t.n).join("") !== b.tiers.map(t => t.kind[0] + t.n).join("")) d++;
  return d;
}
/** A map's whole set: [{ id, seed, far }] in, a genome each out, none sharing a signature with another (and none of the same crystal
 *  and stone as another within `near` of the list's neighbours... kept simple: every signature its own; re-rolled by salt). */
export function soundsystemSet(list, { minDiff = 2 } = {}) {
  const out = [];
  for (const a of list) {
    let g = null;
    for (let salt = 0; salt < 60; salt++) {
      g = soundsystemGenome(a.seed, a.far, salt);
      if (out.every(o => soundsystemDiff(o, g) >= minDiff)) break;
    }
    out.push(g);
  }
  return out;
}

/** The yaw (degrees, 0 facing us) of one standing (dx, dz) metres from the dancefloor's centre (x east, z towards the camera):
 *  "ring", as the dancefloor speakers (Ed: "for them all to point towards the dancefloor (like the central speaker ones do; back
 *  facing ones face outwards)"): along the line to the centre, facing it from the far side and away from it on the near side, so
 *  every one shows its front; "toward": always facing the centre (the near ones show their carved backs). */
export function soundsystemYaw(dx, dz, mode = "ring") {
  const ring = Math.atan2(dx, dz) * 180 / Math.PI;
  if (mode === "toward") { const y = 180 - ring; return ((y + 180) % 360 + 360) % 360 - 180; }
  return dancefloorSpeakerFacing(ring).yaw;
}
/** How much bigger than the old stacks one is, by how far out it stands (0..1): near to far, eased. */
export const soundsystemScale = (far, near = 0.8, farK = 1.6) => near + (farK - near) * (Math.max(0, Math.min(1, far)) ** 0.85);

export function soundsystemGenColours(g) {
  const [h, s] = CRYSTALS[g.crystal] ?? CRYSTALS.cyan, [stone, dark] = STONES[g.stone] ?? STONES.slate;
  const glow = hsv2rgb(h, s, 1), core = hsv2rgb(h, s * 0.18, 1), body = hsv2rgb(h, s * 0.35, 0.86);
  return { [M.STONE]: stone, [M.STONED]: dark, [M.MOSS]: [72, 108, 58], [M.CRYSTAL]: body, [M.RUNE]: glow, [M.GLOW]: glow, [M.MAGIC2]: core, [M.WOOD]: [150, 96, 52], [M.LINE]: [24, 24, 34], [M.FRAME]: [196, 170, 110] };
}

// The stack as a model, from its genome: as art/soundsystem.js's stackModel, its tiers, profile, lean and shift from the genome,
// runes on its back too (so it reads turned away), and its projector on top. Returns the model, the stack's top and the
// projector's top (model units).
function genModel(G, frame, state, stage = 1) {
  // damage by stage (Ed, 2026-10-08: "a few stages of damaged"), each stack breaking its own way (seeded from its genome):
  //   1 cracks and a flickering cone; 2 a block knocked off, a tweeter tilted, its moss scorched, its projector cracked;
  //   3 most of its top fallen, the stack leaning, its glow guttering
  const m = new Model({ blend: .02 }), st = state === "damaged" ? Math.max(1, Math.min(3, stage)) : 0, dmg = st > 0, pump = dmg ? 0 : [0, .5, 1][frame % 3];
  const dark = i => dmg && hash2(i, frame + st * 7, 31) < [0, .25, .45, .72][st], crackW = [0, .1, .13, .17][st];
  let y = 0, g = 1, cone = 0, runeK = G.seed % 997 + G.rune * 211;
  const front = .3, moss = G.moss;
  const stone = (top, frontZ, k, cracks) => p => {
    if (cracks && Math.abs(Math.sin(p[0] * 37 + p[1] * 23 + Math.sin(p[2] * 17) * 2)) < (crackW || .07)) return M.STONED;
    if (moss > .05 && p[1] > top - .02 && (p[2] > frontZ - .06 || hash2(Math.floor(p[0] * 30), Math.floor(p[2] * 30), k) < .2) && hash2(Math.floor(p[0] * 40), Math.floor(p[2] * 40), k + 1) < moss * .9) return st >= 2 && hash2(Math.floor(p[0] * 40), Math.floor(p[1] * 40), k + 3) < .65 ? M.STONED : M.MOSS; // (scorched from stage 2)
    return undefined;
  };
  const disc = (cx, cy, z, r, grp, i) => {
    const off = dark(i), sw = 1 + pump * .08;
    m.ell([cx, cy, z], [r * 1.18, r * 1.18, .06], M.STONED, { group: grp, cut: true });
    m.ell([cx, cy, z - .02], [r * sw, r * sw, .035 + pump * .025], M.CRYSTAL, { group: 900 + i, paint: p => {
      const d = Math.hypot(p[0] - cx, p[1] - cy) / (r * sw);
      if (off) return d < .3 ? M.GLOW : M.CRYSTAL;
      return d < .2 + pump * .15 ? M.MAGIC2 : d < .5 ? M.GLOW : d < .78 ? M.CRYSTAL : M.GLOW;
    } });
  };
  // a rune carved on a block's side (the side we see) and, for every block, its back (so it reads turned away from us)
  const rs = [.12, .1, .15, .08][G.rune];
  const runePaint = (bx, by, bh, bw, bd, fz, k, base, side) => p => {
    const S = Math.min(bh, bd) * 1.5;
    if (side && p[0] > bx + bw - .022) { const u = (fz - bd - p[2]) / S + .5, v = (by - p[1]) / S + .5; if (u >= 0 && u <= 1 && v >= 0 && v <= 1 && runeGlyph(u, v, k, rs)) return dmg && hash2(k, frame, 5) < .5 ? M.STONED : M.RUNE; }
    if (p[2] < fz - bd * 2 + .022) { const S2 = Math.min(bh, bw) * 1.5, u = (p[0] - bx) / S2 + .5, v = (by - p[1]) / S2 + .5; if (u >= 0 && u <= 1 && v >= 0 && v <= 1 && runeGlyph(u, v, k + 5, rs)) return dmg && hash2(k, frame, 6) < .5 ? M.STONED : M.RUNE; }
    return base(p);
  };
  const tiers = G.tiers, t0 = tiers[0], w0 = t0.n * t0.size[0] + .02, scoopH = .08, sd = t0.size[2];
  m.box([0, scoopH, front - sd], [w0, scoopH, sd], M.STONE, { group: g, round: .03, rough: .006, paint: stone(scoopH * 2, front, 3, dmg) });
  m.box([0, scoopH * .9, front], [w0 - .06, scoopH * .45, .12], M.STONED, { group: g, cut: true, paint: p => p[2] < front - .07 ? M.GLOW : undefined });
  for (let i = 1; i < t0.n; i++) m.box([-w0 + i * w0 * 2 / t0.n, scoopH * .9, front - .06], [.015, scoopH * .45, .06], M.STONE, { group: g });
  y = scoopH * 2; g++;
  const fallen = [], nT = tiers.length;
  // stage 2: one block knocked off (which, from the genome); stage 3: the top tiers fallen too, the stack leaning one way
  const knockT = (() => { const c = tiers.map((t, i) => i).filter(i => i > 0 && tiers[i].kind !== "tweet"); return c.length ? c[Math.floor(hash2(G.seed, 1, 82) * c.length)] : 0; })();
  const knockI = Math.floor(hash2(G.seed, 2, 82) * tiers[knockT].n), cut = st >= 3 ? Math.max(1, nT - 1 - (hash2(G.seed, 3, 82) < .5 ? 1 : 0)) : nT;
  const lean3 = st >= 3 ? (hash2(G.seed, 4, 82) < .5 ? 1 : -1) * .06 : 0;
  let cx = 0, topW = w0;
  tiers.forEach(({ kind, n, size: [bw, bh, bd] }, ti) => {
    if (ti >= cut) { for (let i = 0; i < Math.min(n, 3); i++) fallen.push([cx + (i - 1) * bw * 1.6 + (hash2(G.seed, ti, 83 + i) - .5) * .3, bw, bh, bd, ti * 3 + i]); return; } // (fallen at its foot)
    const gap = kind === "tweet" ? .14 : .01, float = kind === "tweet" ? .09 : 0, rowW = n * bw * 2 + (n - 1) * gap;
    if (ti > 0) cx += G.shift * (ti % 2 ? 1 : -.6) * bw + (G.lean + lean3) * bh * 2; // (each tier a little off the one below: a lean, a sideways shift)
    const fz = front - ti * .035, by = y + float + bh;
    for (let i = 0; i < n; i++) {
      const bx = cx - rowW / 2 + bw + i * (bw * 2 + gap);
      if (st >= 2 && ti === knockT && i === knockI && (n > 1 || ti > 0)) { fallen.push([bx, bw, bh, bd, ti * 3 + i]); continue; }
      const tw = st >= 2 && kind === "tweet" && hash2(G.seed, i, 84) < .6, tilt = tw ? [1, .14 * (i % 2 ? 1 : -1), 0] : undefined, by2 = tw ? by - .04 : by;
      const base = stone(by2 + bh, fz, g, dmg), side = kind !== "tweet" && (G.runeAll || i === n - 1);
      m.box([bx, by2, fz - bd], [bw - .005, bh, bd], M.STONE, { group: g, round: .035, rough: .004, dir: tilt, paint: kind === "tweet" ? base : runePaint(bx, by2, bh, bw - .005, bd, fz, runeK++, base, side) });
      if (kind === "bass") disc(bx, by + .02, fz, Math.min(bw, bh) * .72, g, cone++);
      if (kind === "mid") {
        m.ell([bx, by, fz], [bw * .8, bh * .7, bd * .9], M.STONED, { group: g, cut: true, paint: p => p[2] < fz - bd * .45 ? (dark(cone) ? M.STONED : M.GLOW) : undefined });
        m.box([bx, by, fz - bd * .5], [.018, bh * .6, bd * .45], M.STONE, { group: g });
        cone++;
      }
      if (kind === "horn") {
        const my = by + bh * .25;
        m.seg([bx, my, fz - bd * 1.5], [bx, my, fz + .03], .03, Math.min(bw, bh) * .78, M.STONED, { group: g, cut: true, paint: p => p[2] < fz - bd * .55 ? (dark(cone) ? M.STONED : M.GLOW) : undefined });
        disc(bx, by - bh * .6, fz, bh * .22, g, cone++);
      }
      if (kind === "tweet") for (const dx of [-.5, 0, .5]) disc(bx + dx * bw * 1.15, by2, fz, bh * .55, g, cone++);
      g++;
    }
    if (kind !== "tweet") { m.box([cx, y + bh * 2 + .012, fz - .015], [rowW / 2 + .01, .012, .015], M.WOOD, { group: g++, round: .008 }); y += .024; }
    if (kind === "tweet" && !dmg) m.flat([cx, y + float / 2, fz - bd], [1, 0, 0], [0, 1, 0], rowW / 2, float / 2, (s, t) => Math.abs(t) < .45 && Math.sin(s * 23) > -.4 ? M.GLOW : null, { group: g++, bend: 0 });
    y += bh * 2 + float; topW = rowW / 2;
  });
  const top = y, pz = front - Math.min(cut, nT) * .035 - .12, crackedP = st >= 2;
  // the projector on top (Ed, 2026-10-08): a stone cradle holding what the sky hologram rises from
  const P = G.projectorSize, pg = 600;
  m.box([cx, top + .03 * P, pz], [Math.min(topW, .2) * P, .03 * P, .14 * P], M.STONE, { group: pg, round: .02, rough: .004, paint: stone(top + .06 * P, pz + .14 * P, 77, dmg) }); // its plinth
  let ptop;
  if (G.projector === "lens") { // a stone ring standing up, a glowing lens in it facing the sky
    const c = [cx, top + .16 * P, pz];
    m.seg([cx - .1 * P, top + .06 * P, pz], [cx - .12 * P, top + .2 * P, pz], .03 * P, .025 * P, M.STONE, { group: pg + 1 });
    m.seg([cx + .1 * P, top + .06 * P, pz], [cx + .12 * P, top + .2 * P, pz], .03 * P, .025 * P, M.STONE, { group: pg + 2 });
    m.ell(c, [.13 * P, .035 * P, .13 * P], M.FRAME, { group: pg + 3 });
    m.ell([c[0], c[1] + .02 * P, c[2]], [.1 * P, .03 * P, .1 * P], M.CRYSTAL, { group: pg + 4, paint: p => crackedP ? (hash2(Math.floor(p[0] * 60), Math.floor(p[2] * 60), 91) < .3 ? M.STONED : M.CRYSTAL) : Math.hypot(p[0] - c[0], p[2] - c[2]) < .05 * P ? M.MAGIC2 : M.GLOW });
    ptop = [c[0], c[1] + .06 * P, c[2]];
  } else if (G.projector === "crystal") { // a tall crystal standing in a claw of stone
    for (const a of [0, 2.1, 4.2]) m.seg([cx + Math.cos(a) * .09 * P, top + .06 * P, pz + Math.sin(a) * .07 * P], [cx + Math.cos(a) * .05 * P, top + .2 * P, pz + Math.sin(a) * .04 * P], .03 * P, .012 * P, M.STONE, { group: pg + 1 });
    const tip = [cx + .02 * P, top + .46 * P, pz];
    m.seg([cx, top + .06 * P, pz], tip, .07 * P, .006, M.CRYSTAL, { group: pg + 2, paint: p => crackedP ? (p[1] > top + .3 * P ? M.STONED : M.CRYSTAL) : p[1] > top + .3 * P ? M.MAGIC2 : p[1] > top + .16 * P ? M.GLOW : undefined });
    ptop = tip;
  } else if (G.projector === "orb") { // a glowing orb held up by stone prongs
    const c = [cx, top + .22 * P, pz];
    for (const a of [.5, 2.6, 4.7]) m.seg([cx + Math.cos(a) * .1 * P, top + .06 * P, pz + Math.sin(a) * .08 * P], [cx + Math.cos(a) * .09 * P, top + .24 * P, pz + Math.sin(a) * .07 * P], .025 * P, .012 * P, M.STONE, { group: pg + 1 });
    m.ell(c, [.1 * P, .1 * P, .1 * P], M.GLOW, { group: pg + 2, paint: p => crackedP ? (Math.abs(p[0] - c[0] - (p[1] - c[1]) * .6) < .012 ? M.STONED : M.CRYSTAL) : p[1] > c[1] + .03 * P && p[0] < c[0] ? M.MAGIC2 : undefined });
    ptop = [c[0], c[1] + .1 * P, c[2]];
  } else { // a prism: a four-sided crystal pyramid on the plinth
    const h = .3 * P;
    m.seg([cx, top + .06 * P, pz], [cx, top + .06 * P + h, pz], .1 * P, .004, M.CRYSTAL, { group: pg + 1, paint: p => crackedP ? (Math.abs(p[0] - cx - (p[1] - top) * .3) < .01 ? M.STONED : M.CRYSTAL) : p[1] > top + .06 * P + h * .55 ? M.MAGIC2 : M.GLOW });
    ptop = [cx, top + .06 * P + h, pz];
  }
  // crystal shards at the foot, their number and lean from the genome
  for (let i = 0; i < G.shards; i++) {
    const a = hash2(G.seed, i, 71) * Math.PI * 2, rad = w0 * (.8 + hash2(G.seed, i, 72) * .4), x = Math.cos(a) * rad, z = .1 + Math.sin(a) * .35, len = .14 + hash2(G.seed, i, 73) * .26, lean = (hash2(G.seed, i, 74) - .5) * .9;
    if (st >= 2 && i % 2) { m.seg([x, .03, z], [x + .12, .05, z + .04], .04, .02, M.CRYSTAL, { group: 700 + i }); continue; }
    m.seg([x, 0, z], [x + lean * len, len, z + .05], .04 + len * .05, .006, M.CRYSTAL, { group: 700 + i, paint: p => p[1] > len * (.65 - pump * .1) && !dmg ? M.GLOW : undefined });
  }
  for (const [bx, bw, bh, bd, k] of fallen) { const s2 = hash2(G.seed, k, 85) < .5 ? 1 : -1, dx = s2 * (.35 + hash2(G.seed, k, 86) * .35); m.box([bx + dx, bw * .75, front + .2 + hash2(G.seed, k, 87) * .2], [bw, bh, bd], M.STONE, { group: g++, dir: [.6 * s2, .8, .2 + hash2(G.seed, k, 88) * .3], round: .035, rough: .007, paint: stone(1, 0, 9 + k, true) }); }
  return { m, top, ptop };
}

// The destroyed one: a pile of broken blocks, its projector's crystal cracked among them.
function genRubble(G) {
  const m = new Model({ blend: .02 }), r = (i, k) => hash2(i, k, G.seed * 13 + 7), w = G.tiers[0].n * G.tiers[0].size[0];
  m.ell([.1, .1, .62], [.14, .12, .1], M.GLOW, { group: 1, paint: p => p[1] > .16 ? M.MAGIC2 : undefined });
  m.seg([.1, .1, .6], [.02, .5, .66], .07, .01, M.GLOW, { group: 2, paint: p => p[1] > .35 ? M.MAGIC2 : M.CRYSTAL });
  const n = 10 + G.tiers.length * 3;
  for (let i = 0; i < n; i++) {
    const a = i * 2.4, rad = .15 + r(i, 1) * w * 1.1, x = Math.cos(a) * rad, z = Math.sin(a) * rad * .6, s = .09 + r(i, 2) * .1, h = Math.max(.05, (w + .1 - rad) * .45) + s * .5;
    m.box([x, h * .7, z], [s * 1.3, s, s * 1.1], M.STONE, { group: 10 + i, dir: [Math.cos(a * 1.7), .4 + r(i, 3), Math.sin(a * 2.3)], round: .03, rough: .008, paint: p => Math.abs(Math.sin(p[0] * 41 + p[1] * 29)) < .08 ? M.STONED : p[1] > h * .7 + s * .6 && r(i, 4) < G.moss * .5 ? M.MOSS : undefined });
  }
  for (let i = 0; i < 4; i++) { const a = i * 1.7 + 1, x = Math.cos(a) * .4, z = Math.sin(a) * .25; m.ell([x, .05, z], [.09, .08, .03], M.CRYSTAL, { group: 50 + i, dir: [Math.cos(a), .5, Math.sin(a)], paint: () => r(i, 5) < .3 ? M.GLOW : undefined }); }
  return m;
}

function genMotes(sp, n, seed) {
  let k = 0;
  for (let i = 0; i < 2000 && k < n; i++) {
    const x = Math.floor(hash2(i, seed, 1) * sp.w), y = Math.floor(hash2(i, seed, 2) * sp.h * .7);
    if (sp.get(x, y) || sp.get(x + 1, y) || sp.get(x - 1, y) || sp.get(x, y + 1) || sp.get(x, y - 1) || sp.get(x, y + 2)) continue;
    sp.px(x, y, k % 3 ? M.GLOW : M.MAGIC2); k++;
  }
  return sp;
}

/** One generated soundsystem's sprite: genome G at `yaw` (degrees, 0 facing us), `size` times the old stacks' height (three times
 *  the witch's; its scale fixed by the genome's playing frame 0, so every state shares it), state "playing" (frame 0..2), "damaged"
 *  (frame 0..1, at `stage` 1 to 3: SOUNDSYSTEM_DAMAGE) or "destroyed". Returns { sp, origin: its middle on the ground, projector: its projector's top (the sky hologram's
 *  anchor), both in the sprite's pixels }. */
const genScales = new Map();
export function soundsystemGenSprite(st = {}, G, { yaw = 0, size = 1, frame = 0, state = "playing", stage = 1 } = {}) {
  const H = witchHeight(st) * 3 * size, key = `${G.seed}:${G.salt}:${H}`, ry = yaw * Math.PI / 180;
  if (!genScales.has(key)) { if (genScales.size > 256) genScales.clear(); genScales.set(key, render(genModel(G, 0, "playing").m, { height: H, yaw: 0 }).s); }
  const scale = genScales.get(key);
  if (state === "destroyed") {
    const R = render(genRubble(G), { scale, yaw: ry }), [ox, oy] = R.project([0, 0, 0]);
    return { sp: genMotes(R.sp, 3, G.seed % 97), origin: { x: +ox.toFixed(1), y: +oy.toFixed(1) }, projector: null };
  }
  const { m, ptop } = genModel(G, frame, state, stage), R = render(m, { scale, yaw: ry }), [ox, oy] = R.project([0, 0, 0]), [px, py] = R.project(ptop);
  genMotes(R.sp, state === "damaged" ? 5 - stage : 10 + frame * 2, G.seed % 97 + frame);
  return { sp: R.sp, origin: { x: +ox.toFixed(1), y: +oy.toFixed(1) }, projector: { x: +px.toFixed(1), y: +py.toFixed(1) } };
}
