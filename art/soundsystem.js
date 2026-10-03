// The soundsystem: the thing the party defends (Ed: "Our soundsystem looks like this, but maybe
// we can make it also a bit like a magic fantasy rock"). A custom sound-system stack, a stepped
// wall of cabinets wider at the bottom, hewn from dark stone instead of plywood:
//   - bottom: bass bins, each a block with one big cone, over a folded-horn "scoop";
//   - middle: wide, shallow mid-bass horns, flaring inwards;
//   - upper: mid horns, a square-ish flared mouth over a deep throat;
//   - top: tweeter stones, floating a little above the stack with light in the gaps.
// The cones and tweeters are glowing crystal discs, the horns glow from deep inside, runes are
// carved into the blocks, moss grows on their edges, crystal shards sprout at the base and
// motes drift up. Built in 3D (model3d.js) at the same angle as everything else, turned
// towards the viewer. When it plays the cones pump (frames 0..2: the discs swell and brighten).
// States: "playing" (3 frames), "damaged" (cracked, a stone fallen, the glow flickering: 2
// frames) and "destroyed" (a rubble pile with a dying glow: 1 frame).
import { M, hash2, runeGlyph } from "./core.js";
import { sigilHit } from "./sigils.js";
import { Model, render } from "./model3d.js";
import { witchHeight } from "./witch.js";

// Three stacks, each with its own crystal colour: tiers listed bottom to top.
//   kind: bass | mid | horn | tweet; n blocks of half-size [w, h, d] (model units)
export const SOUNDSYSTEMS = [
  { id: "stack", crystal: "cyan", tiers: [["bass", 4, [.24, .25, .28]], ["mid", 2, [.46, .15, .25]], ["horn", 4, [.21, .22, .23]], ["tweet", 2, [.21, .08, .17]]] },
  { id: "wall", crystal: "violet", tiers: [["bass", 3, [.31, .3, .3]], ["mid", 2, [.44, .16, .26]], ["horn", 2, [.3, .25, .24]], ["tweet", 1, [.26, .09, .18]]] },
  { id: "tower", crystal: "amber", tiers: [["bass", 2, [.28, .27, .29]], ["bass", 2, [.25, .24, .27]], ["horn", 2, [.25, .23, .23]], ["tweet", 3, [.15, .07, .15]]] },
];
const CRYSTAL = { cyan: [[60, 220, 255], [210, 250, 255], [150, 205, 225]], violet: [[175, 95, 255], [240, 215, 255], [180, 160, 225]], amber: [[255, 170, 50], [255, 238, 200], [225, 190, 140]] };

export function soundsystemColours(variant = 0) {
  const [glow, core, crystal] = CRYSTAL[SOUNDSYSTEMS[variant % SOUNDSYSTEMS.length].crystal];
  return { [M.STONE]: [78, 80, 94], [M.STONED]: [36, 36, 48], [M.MOSS]: [72, 108, 58], [M.CRYSTAL]: crystal, [M.RUNE]: glow, [M.GLOW]: glow, [M.MAGIC2]: core, [M.WOOD]: [150, 96, 52], [M.LINE]: [24, 24, 34] };
}

// The stack as a model. frame 0..2 pumps the cones; state "playing" | "damaged"; for damaged,
// frame 0 or 1 is the flicker. Returns the model and how tall the intact stack is (model units).
function stackModel(variant, frame, state, sigil) {
  const V = SOUNDSYSTEMS[variant % SOUNDSYSTEMS.length], m = new Model({ blend: .02 }), dmg = state === "damaged";
  const pump = dmg ? 0 : [0, .5, 1][frame % 3], dark = (i) => dmg && (hash2(i, frame, 31) < .5); // a flickering cone
  let y = 0, g = 1, front = .3, cone = 0, runeK = variant * 7;
  const stone = (top, frontZ, k, cracks) => p => {
    if (cracks && Math.abs(Math.sin(p[0] * 37 + p[1] * 23 + Math.sin(p[2] * 17) * 2)) < .07) return M.STONED;
    if (p[1] > top - .02 && (p[2] > frontZ - .06 || hash2(Math.floor(p[0] * 30), Math.floor(p[2] * 30), k) < .2) && hash2(Math.floor(p[0] * 40), Math.floor(p[2] * 40), k + 1) < .6) return M.MOSS; // moss along the front edges, in patches
    return undefined;
  };
  // a crystal disc set into a block's face: a socket carved round it, the disc bulging out
  const disc = (cx, cy, z, r, grp, i) => {
    const off = dark(i), sw = 1 + pump * .08;
    m.ell([cx, cy, z], [r * 1.18, r * 1.18, .06], M.STONED, { group: grp, cut: true });
    m.ell([cx, cy, z - .02], [r * sw, r * sw, .035 + pump * .025], M.CRYSTAL, { group: 900 + i, paint: p => {
      const d = Math.hypot(p[0] - cx, p[1] - cy) / (r * sw);
      if (off) return d < .3 ? M.GLOW : M.CRYSTAL;
      return d < .2 + pump * .15 ? M.MAGIC2 : d < .5 ? M.GLOW : d < .78 ? M.CRYSTAL : M.GLOW;
    } });
  };
  // one big carved rune on the side of a block (the side we see), in the magic stones' glyphs
  const runePaint = (bx, by, bh, bw, bd, fz, k, base) => p => {
    if (p[0] > bx + bw - .022) {
      const S = Math.min(bh, bd) * 1.5, u = (fz - bd - p[2]) / S + .5, v = (by - p[1]) / S + .5;
      if (u >= 0 && u <= 1 && v >= 0 && v <= 1 && (sigil ? sigilHit(sigil, u, v, .065) : runeGlyph(u, v, k, .12))) return dmg && hash2(k, frame, 5) < .5 ? M.STONED : M.RUNE;
    }
    return base(p);
  };
  // the scoop under the bass bins: a long plinth with a glowing slot
  const tiers = V.tiers, w0 = tiers[0][1] * tiers[0][2][0] + .02, scoopH = .08, sd = tiers[0][2][2];
  m.box([0, scoopH, front - sd], [w0, scoopH, sd], M.STONE, { group: g, round: .03, rough: .006, paint: stone(scoopH * 2, front, 3, dmg) });
  m.box([0, scoopH * .9, front], [w0 - .06, scoopH * .45, .12], M.STONED, { group: g, cut: true, paint: p => p[2] < front - .07 ? M.GLOW : undefined });
  for (let i = 1; i < tiers[0][1]; i++) m.box([-w0 + i * w0 * 2 / tiers[0][1], scoopH * .9, front - .06], [.015, scoopH * .45, .06], M.STONE, { group: g }); // the scoop's internal panels
  y = scoopH * 2; g++;
  const fallen = [];
  tiers.forEach(([kind, n, [bw, bh, bd]], ti) => {
    const float = kind === "tweet" ? .09 : 0, rowW = n * bw * 2 + (n - 1) * (kind === "tweet" ? .14 : .01);
    const fz = front - ti * .035, by = y + float + bh;
    for (let i = 0; i < n; i++) {
      const bx = -rowW / 2 + bw + i * (bw * 2 + (kind === "tweet" ? .14 : .01));
      if (dmg && kind === "horn" && i === n - 1) { fallen.push([bx, bw, bh, bd]); continue; } // knocked off the stack
      const tilt = dmg && kind === "tweet" ? [1, .12 * (i % 2 ? 1 : -1), 0] : undefined, by2 = dmg && kind === "tweet" ? by - .04 : by;
      const base = stone(by2 + bh, fz - bd + bd, g, dmg);
      const carved = i === n - 1 - (dmg && kind === "horn" ? 1 : 0) && kind !== "tweet"; // the end block we see the side of
      m.box([bx, by2, fz - bd], [bw - .005, bh, bd], M.STONE, { group: g, round: .035, rough: .004, dir: tilt, paint: carved ? runePaint(bx, by2, bh, bw - .005, bd, fz, runeK++, base) : base });
      if (kind === "bass") disc(bx, by + .02, fz, Math.min(bw, bh) * .72, g, cone++);
      if (kind === "mid") { // a wide, shallow horn: a flared hollow with a fin down the middle
        m.ell([bx, by, fz], [bw * .8, bh * .7, bd * .9], M.STONED, { group: g, cut: true, paint: p => p[2] < fz - bd * .45 ? (dark(cone) ? M.STONED : M.GLOW) : undefined });
        m.box([bx, by, fz - bd * .5], [.018, bh * .6, bd * .45], M.STONE, { group: g });
        cone++;
      }
      if (kind === "horn") { // a flared mouth over a deep throat
        const my = by + bh * .25;
        m.seg([bx, my, fz - bd * 1.5], [bx, my, fz + .03], .03, Math.min(bw, bh) * .78, M.STONED, { group: g, cut: true, paint: p => p[2] < fz - bd * .55 ? (dark(cone) ? M.STONED : M.GLOW) : undefined });
        disc(bx, by - bh * .6, fz, bh * .22, g, cone++);
      }
      if (kind === "tweet") for (const dx of [-.5, 0, .5]) disc(bx + dx * bw * 1.15, by2, fz, bh * .55, g, cone++);
      g++;
    }
    // a wooden lintel along the top of the tier: a little of the plywood's warmth
    if (kind !== "tweet") { const cut = dmg && kind === "horn" ? bw : 0; m.box([-cut, y + bh * 2 + .012, fz - .015], [rowW / 2 + .01 - cut, .012, .015], M.WOOD, { group: g++, round: .008 }); y += .024; }
    // the gap of light under the floating tweeters
    if (kind === "tweet" && !dmg) m.flat([0, y + float / 2, fz - bd], [1, 0, 0], [0, 1, 0], rowW / 2, float / 2, (s, t) => Math.abs(t) < .45 && Math.sin(s * 23) > -.4 ? M.GLOW : null, { group: g++, bend: 0 });
    y += bh * 2 + float;
  });
  const top = y;
  // crystal shards at the base and corners
  const shards = [[-w0 - .04, .25, .34, -.3], [w0 + .02, .2, .3, .35], [-w0 + .15, .4, .22, -.1], [w0 - .2, .42, .18, .2], [.1, .45, .16, .15], [-w0 - .1, -.25, .26, -.4], [w0 + .08, -.2, .24, .45]];
  shards.forEach(([x, z, len, lean], i) => {
    if (dmg && i % 2) { m.seg([x, .03, z], [x + .12, .05, z + .04], .04, .02, M.CRYSTAL, { group: 700 + i }); return; } // snapped
    const tip = [x + lean * len, len, z + .05];
    m.seg([x, 0, z], tip, .045 + len * .05, .006, M.CRYSTAL, { group: 700 + i, paint: p => p[1] > len * (.65 - pump * .1) && !dmg ? M.GLOW : undefined });
    m.seg([x + .04, 0, z - .03], [x + .04 + lean * len * .5, len * .55, z], .03, .005, M.CRYSTAL, { group: 720 + i });
  });
  // floating chips of rock round the top
  if (!dmg) for (const [x, dy, z, r] of [[-.55, .1, .1, .03], [.6, .16, 0, .025], [.15, .24, -.1, .02]]) m.ell([x, top + dy - .1, z], [r, r * .8, r], M.STONE, { group: 800 + Math.round(x * 100), extra: true, rough: .004 });
  // damaged: the knocked-off block lies tilted at the foot of the stack
  for (const [bx, bw, bh, bd] of fallen) {
    m.box([bx + .45, bw * .75, front + .25], [bw, bh, bd], M.STONE, { group: g++, dir: [.6, .8, .2], round: .035, rough: .007, paint: stone(1, 0, 9, true) });
  }
  return { m, top };
}

// The destroyed stack: a pile of broken blocks with a dying glow among them.
function rubbleModel(variant) {
  const m = new Model({ blend: .02 }), r = (i, k) => hash2(i, k, variant * 13 + 7);
  m.ell([.1, .1, .62], [.14, .12, .1], M.GLOW, { group: 1, paint: p => p[1] > .16 ? M.MAGIC2 : undefined }); // the core, still glowing
  m.seg([.1, .1, .6], [.02, .5, .66], .07, .01, M.GLOW, { group: 2, paint: p => p[1] > .35 ? M.MAGIC2 : M.CRYSTAL }); // a cracked crystal standing out of the pile
  for (let i = 0; i < 16; i++) {
    const a = i * 2.4, rad = .15 + r(i, 1) * .75, x = Math.cos(a) * rad, z = Math.sin(a) * rad * .6, s = .09 + r(i, 2) * .1, h = Math.max(.05, (.8 - rad) * .45) + s * .5;
    m.box([x, h * .7, z], [s * 1.3, s, s * 1.1], M.STONE, { group: 10 + i, dir: [Math.cos(a * 1.7), .4 + r(i, 3), Math.sin(a * 2.3)], round: .03, rough: .008, paint: p => Math.abs(Math.sin(p[0] * 41 + p[1] * 29)) < .08 ? M.STONED : p[1] > h * .7 + s * .6 && r(i, 4) < .25 ? M.MOSS : undefined });
  }
  for (let i = 0; i < 4; i++) { const a = i * 1.7 + 1, x = Math.cos(a) * .4, z = Math.sin(a) * .25; m.ell([x, .05, z], [.09, .08, .03], M.CRYSTAL, { group: 50 + i, dir: [Math.cos(a), .5, Math.sin(a)], paint: p => r(i, 5) < .3 ? M.GLOW : undefined }); } // fallen cones
  for (let i = 0; i < 4; i++) { const x = -.7 + i * .45; m.seg([x, 0, .4 - i * .1], [x + .1, .08 + r(i, 6) * .1, .42 - i * .1], .03, .01, M.CRYSTAL, { group: 60 + i }); } // broken shards
  return m;
}

// Motes of light drifting up: a few pixels in the empty space above and round the stack.
function motes(sp, n, seed) {
  let k = 0;
  for (let i = 0; i < 2000 && k < n; i++) {
    const x = Math.floor(hash2(i, seed, 1) * sp.w), y = Math.floor(hash2(i, seed, 2) * sp.h * .7);
    if (sp.get(x, y) || sp.get(x + 1, y) || sp.get(x - 1, y) || sp.get(x, y + 1) || sp.get(x, y - 1) || sp.get(x, y + 2)) continue;
    sp.px(x, y, k % 3 ? M.GLOW : M.MAGIC2); k++;
  }
  return sp;
}

// About three times the witch's height, so it reads from the treetops.
export const soundsystemHeight = st => witchHeight(st) * 3;

const scales = new Map();
// One soundsystem sprite. variant 0..2; state "playing" (frame 0..2), "damaged" (frame 0..1),
// "destroyed". All states of a variant share one scale, so the rubble is smaller than the stack.
// sigil: a creature's id, to carve its sigil (sigils.js) instead of the generic runes.
export function soundsystemSprite(st = {}, { variant = 0, frame = 0, state = "playing", sigil } = {}) {
  const H = soundsystemHeight(st), key = variant + ":" + H;
  if (!scales.has(key)) scales.set(key, render(stackModel(variant, 0, "playing").m, { height: H }).s);
  const scale = scales.get(key);
  if (state === "destroyed") return motes(render(rubbleModel(variant), { scale }).sp, 3, variant * 5 + 1);
  const { sp } = render(stackModel(variant, frame, state, sigil).m, { scale });
  return motes(sp, state === "damaged" ? 4 : 10 + frame * 2, variant * 5 + frame);
}

// Every soundsystem, baked: [{ id, crystal, playing: [3], damaged: [2], destroyed }].
export function soundsystems(st, bk) {
  return SOUNDSYSTEMS.map((V, variant) => {
    const col = soundsystemColours(variant), b = o => bk(soundsystemSprite(st, { variant, ...o }), col);
    return { id: V.id, crystal: V.crystal, playing: [0, 1, 2].map(frame => b({ frame })), damaged: [0, 1].map(frame => b({ frame, state: "damaged" })), destroyed: b({ state: "destroyed" }) };
  });
}
