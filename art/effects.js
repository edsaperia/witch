// Attack effects (Stage 5: creatures' movement and attacks, Ed): the art the prototype draws for a fight, in the game's
// pixel style, at its 16 art pixels a metre. Every effect is a little pixel sprite, mostly light (glowing: drawn unlit), in
// neutral greys the game tints: red for the wild, a party animal's own neon for the party (effectColours(tint)). Pixels that
// keep their own colour (a stone, a wooden barb, a feather) are left out of the tint mask (sp.tint: 1 = tint this pixel).
//
//   projectiles  spit (a glob and its drips), barb (a thorn dart and its streak), lobSeed and lobStone (lobbed, spinning, with
//                lobShadow under them on the ground), feather (a feather dart), mote (a glowing mote): drawn flying right;
//                the game turns or mirrors them to their heading. Anchors: centre (where the shot is), tail (where its trail leaves).
//   beams        beamShort and beamLong, each in three parts: Start (the flare at the mouth), Loop (a strip that repeats exactly
//                every `period` pixels along the beam, scrolling as it plays) and End (where it hits). Drawn running right.
//                Anchors: start's mouth (where the creature's mouth is) and joint (where the loop begins), end's joint and hit.
//   pulses       quakeRing (a ground decal: the shockwave running out to the quake's radius, cracking the ground), sporeCloud
//                (a standing cloud of spores, billowing) and sporeStain (the ground under it).
//   telegraphs   targetCircle (a ground decal round where a lob will land, tightening), line (a ground strip along a beam's or a
//                charge's path, its chevrons marching; repeats every `period` px, with lineStart and lineEnd: a cap and an
//                arrowhead), windupFlash (a glint gathering at the creature's head as it winds up) and quakeReach (a ground
//                decal: the quake's full reach, pulsing, while a legend winds up).
//   hits         hitSpark and hitSparkBig (bursts where a blow or shot lands).
//   status       slowRing (a ground decal of sticky drips round a slowed creature's feet, turning), slowMark (a spiral over its
//                head) and knockback (a burst and speed lines, pushed right: mirror for left) with dust (kicked up at its feet).
//
// Ground decals are drawn from straight above in ground space (x across, y into the screen): the game lays them flat (and its
// camera foreshortens them); standing ones stand up like every other sprite. Each comes in two variants: light (for the dark
// forest and the night: a soft halo round it) and dark (for bright ground, the dancefloor, a lit party: a dark rim round it),
// and at two zooms: ground (as drawn) and treetop (2.5 times as big, every stroke three times as thick, so it still reads from
// the treetops, where the camera is about 2.6 times as far; the ringed decals, sized to an attack's radius, keep their size and
// thicken their strokes). ATTACK_EFFECTS says which effects each attack in config/combat.json
// uses.
import { M, Sprite, hash2 } from "./core.js";

export const EFFECT_PPM = 16;            // art pixels a metre (the prototype's artPixelsPerMetre)
export const EFFECT_TREETOP_SCALE = 2.5; // treetop variants: this much bigger (so they show about as big as on the ground), strokes three times as thick;
// ground decals with a radius (the game sizes them to the attack's) keep their size, only their strokes thicken
export const EFFECT_TREETOP_SHRINK = 2.6; // how much smaller the treetop camera shows things than the nearest ground camera
// Materials, brightest first: the hot core, the body, its edge, the halo (all glowing), and the dark rim (not glowing).
const CORE = M.MAGIC2, BODY = M.MAGIC, EDGE = M.GLOW, HALO = M.COLLAR, RIM = M.LINE;
const RANK = { [RIM]: 1, [HALO]: 2, [EDGE]: 3, [BODY]: 4, [CORE]: 5 };
const LIT = new Set([CORE, BODY, EDGE, HALO]);

// The catalogue: family, plane (standing or ground), frames and fps, whether it loops, its size in metres (ground zoom), and the
// attacks it serves (config/combat.json, Stage 5's lob and beam too).
export const EFFECTS = [
  { id: "spit", family: "projectile", plane: "standing", frames: 3, fps: 12, loop: true, metres: [.9, .5], attacks: ["spit", "longspit"] },
  { id: "barb", family: "projectile", plane: "standing", frames: 2, fps: 12, loop: true, metres: [1.3, .35], attacks: ["barb", "longbarb"] },
  { id: "lobSeed", family: "projectile", plane: "standing", frames: 4, fps: 10, loop: true, metres: [.6, .6], attacks: ["lob"] },
  { id: "lobStone", family: "projectile", plane: "standing", frames: 4, fps: 8, loop: true, metres: [.8, .8], attacks: ["biglob"] },
  { id: "lobShadow", family: "projectile", plane: "ground", frames: 1, fps: 1, loop: true, metres: [.9, .9], attacks: ["lob", "biglob"] },
  { id: "feather", family: "projectile", plane: "standing", frames: 2, fps: 10, loop: true, metres: [1.1, .45], attacks: ["longspit", "longbarb"] },
  { id: "mote", family: "projectile", plane: "standing", frames: 4, fps: 10, loop: true, metres: [.7, .7], attacks: ["spit", "barb"] },
  { id: "beamShortStart", family: "beam", plane: "standing", frames: 3, fps: 14, loop: true, metres: [.9, .9], attacks: ["beam"] },
  { id: "beamShortLoop", family: "beam", plane: "standing", frames: 4, fps: 14, loop: true, metres: [2, .55], period: 32, attacks: ["beam"] },
  { id: "beamShortEnd", family: "beam", plane: "standing", frames: 3, fps: 14, loop: true, metres: [1, 1], attacks: ["beam"] },
  { id: "beamLongStart", family: "beam", plane: "standing", frames: 3, fps: 12, loop: true, metres: [1.4, 1.4], attacks: ["widebeam"] },
  { id: "beamLongLoop", family: "beam", plane: "standing", frames: 4, fps: 12, loop: true, metres: [2, 1.1], period: 32, attacks: ["widebeam"] },
  { id: "beamLongEnd", family: "beam", plane: "standing", frames: 3, fps: 12, loop: true, metres: [1.6, 1.6], attacks: ["widebeam"] },
  { id: "quakeRing", family: "pulse", plane: "ground", frames: 6, fps: 9, loop: false, metres: [11, 11], radius: 5.5, attacks: ["quake"] },
  { id: "sporeCloud", family: "pulse", plane: "standing", frames: 4, fps: 5, loop: true, metres: [3, 2], attacks: ["biglob"] },
  { id: "sporeStain", family: "pulse", plane: "ground", frames: 1, fps: 1, loop: true, metres: [4, 4], radius: 2, attacks: ["biglob"] },
  { id: "targetCircle", family: "telegraph", plane: "ground", frames: 4, fps: 6, loop: true, metres: [4, 4], radius: 1.8, attacks: ["lob", "biglob"] },
  { id: "line", family: "telegraph", plane: "ground", frames: 4, fps: 8, loop: true, metres: [2, 1], period: 16, attacks: ["spit", "barb", "longspit", "longbarb", "beam", "widebeam", "nip", "maul"] },
  { id: "lineStart", family: "telegraph", plane: "ground", frames: 1, fps: 1, loop: true, metres: [.5, 1], attacks: ["spit", "barb", "longspit", "longbarb", "beam", "widebeam", "nip", "maul"] },
  { id: "lineEnd", family: "telegraph", plane: "ground", frames: 1, fps: 1, loop: true, metres: [1, 1.4], attacks: ["spit", "barb", "longspit", "longbarb", "beam", "widebeam", "nip", "maul"] },
  { id: "windupFlash", family: "telegraph", plane: "standing", frames: 4, fps: 8, loop: false, metres: [1.2, 1.2], attacks: ["nip", "maul", "spit", "barb", "longspit", "longbarb", "lob", "biglob", "beam", "widebeam", "quake"] },
  { id: "quakeReach", family: "telegraph", plane: "ground", frames: 4, fps: 6, loop: true, metres: [11, 11], radius: 5.5, attacks: ["quake"] },
  { id: "hitSpark", family: "hit", plane: "standing", frames: 4, fps: 16, loop: false, metres: [1, 1], attacks: ["nip", "spit", "barb", "longspit", "longbarb", "lob", "beam"] },
  { id: "hitSparkBig", family: "hit", plane: "standing", frames: 4, fps: 14, loop: false, metres: [1.8, 1.8], attacks: ["maul", "biglob", "widebeam", "quake"] },
  { id: "slowRing", family: "status", plane: "ground", frames: 4, fps: 6, loop: true, metres: [2, 2], radius: .8, attacks: ["barb", "longbarb", "biglob", "widebeam"] },
  { id: "slowMark", family: "status", plane: "standing", frames: 2, fps: 3, loop: true, metres: [.6, .6], attacks: ["barb", "longbarb", "biglob", "widebeam"] },
  { id: "knockback", family: "status", plane: "standing", frames: 3, fps: 12, loop: false, metres: [1.6, 1], attacks: ["maul", "quake"] },
  { id: "dust", family: "status", plane: "standing", frames: 4, fps: 10, loop: false, metres: [1.2, .7], attacks: ["maul", "quake"] },
];
export const EFFECT_BY_ID = Object.fromEntries(EFFECTS.map(e => [e.id, e]));
// Which effects each attack uses: what flies (or the beam's parts), its telegraph, where it lands, and what it leaves on the target.
export const ATTACK_EFFECTS = {
  nip: { windup: "windupFlash", telegraph: ["lineStart", "line", "lineEnd"], hit: "hitSpark" },
  maul: { windup: "windupFlash", telegraph: ["lineStart", "line", "lineEnd"], hit: "hitSparkBig", status: ["knockback", "dust"] },
  spit: { windup: "windupFlash", telegraph: ["lineStart", "line", "lineEnd"], projectile: "spit", hit: "hitSpark" },
  longspit: { windup: "windupFlash", telegraph: ["lineStart", "line", "lineEnd"], projectile: "feather", hit: "hitSpark" },
  barb: { windup: "windupFlash", telegraph: ["lineStart", "line", "lineEnd"], projectile: "barb", hit: "hitSpark", status: ["slowRing", "slowMark"] },
  longbarb: { windup: "windupFlash", telegraph: ["lineStart", "line", "lineEnd"], projectile: "feather", hit: "hitSpark", status: ["slowRing", "slowMark"] },
  lob: { windup: "windupFlash", telegraph: ["targetCircle"], projectile: "lobSeed", shadow: "lobShadow", hit: "hitSpark" },
  biglob: { windup: "windupFlash", telegraph: ["targetCircle"], projectile: "lobStone", shadow: "lobShadow", hit: "hitSparkBig", lingers: ["sporeCloud", "sporeStain"], status: ["slowRing", "slowMark"] },
  beam: { windup: "windupFlash", telegraph: ["lineStart", "line", "lineEnd"], beam: ["beamShortStart", "beamShortLoop", "beamShortEnd"], hit: "hitSpark" },
  widebeam: { windup: "windupFlash", telegraph: ["lineStart", "line", "lineEnd"], beam: ["beamLongStart", "beamLongLoop", "beamLongEnd"], hit: "hitSparkBig", status: ["slowRing", "slowMark"] },
  quake: { windup: "windupFlash", telegraph: ["quakeReach"], pulse: "quakeRing", hit: "hitSparkBig", status: ["knockback", "dust"] },
};
// Species whose shots aren't the plain glob: the glowing ones throw motes, the raven feathers (its long shots, by level).
export const SPECIES_PROJECTILE = { moth: "mote", glowworm: "mote", bat: "mote", raven: "feather", woodlouse: "barb", owl: "lobSeed" };

// The colours: greys (the game multiplies the tinted pixels by the tint) or tinted here (tint: [r, g, b] 0-255).
export function effectColours(tint) {
  const t = tint ? tint.map(v => v / 255) : [1, 1, 1], mix = (k, w) => t.map(v => Math.round(255 * Math.min(1, k * (v * (1 - w) + w))));
  return { [CORE]: mix(1, .75), [BODY]: mix(1, .2), [EDGE]: mix(.78, 0), [HALO]: mix(.5, 0), [RIM]: mix(.16, 0),
    [M.STONE]: [150, 146, 140], [M.STONED]: [92, 88, 86], [M.TRUNK]: [104, 70, 44], [M.BARKL]: [150, 108, 66], [M.BELLY]: [232, 228, 214], [M.NOSE]: [12, 10, 16], [M.LEAF]: [92, 138, 70] };
}

// ---- drawing ----
// A canvas for one effect: put(x, y, mat) keeps the brighter material where two meet; disc, ring, line and blob draw
// shapes; physical (lit) pixels get a ball's normals; finish() adds the variant's halo or rim and the tint mask.
class Canvas {
  constructor(w, h) { this.sp = new Sprite(Math.max(1, Math.ceil(w)), Math.max(1, Math.ceil(h))); this.w = this.sp.w; this.h = this.sp.h; this.tint = new Uint8Array(this.w * this.h); }
  put(x, y, m, n = [0, 0, 1], tint = true) {
    x = Math.floor(x); y = Math.floor(y); if (x < 0 || y < 0 || x >= this.w || y >= this.h) return;
    const i = y * this.w + x, old = this.sp.m[i];
    if (old && (RANK[old] || 9) > (RANK[m] || 9) && RANK[m]) return; // a lit material never covers a brighter one, or a solid thing
    if (old && !RANK[old] && RANK[m]) return;
    this.sp.m[i] = m; this.sp.n.set(n, i * 3); this.tint[i] = tint && LIT.has(m) ? 1 : 0;
  }
  disc(cx, cy, r, m, o = {}) { for (let y = Math.floor(cy - r - 1); y <= cy + r + 1; y++) for (let x = Math.floor(cx - r - 1); x <= cx + r + 1; x++) { const dx = (x + .5 - cx) / (o.sx || 1), dy = (y + .5 - cy) / (o.sy || 1); if (dx * dx + dy * dy <= r * r) this.put(x, y, o.mat ? o.mat(dx / r, dy / r) : m, o.ball ? ball(dx / r, dy / r) : undefined, o.tint ?? true); } }
  ring(cx, cy, r, w, m, o = {}) { for (let y = Math.floor(cy - r - w - 1); y <= cy + r + w + 1; y++) for (let x = Math.floor(cx - r - w - 1); x <= cx + r + w + 1; x++) { const dx = x + .5 - cx, dy = (y + .5 - cy) / (o.sy || 1), d = Math.hypot(dx, dy), a = Math.atan2(dy, dx); if (Math.abs(d - r) <= w / 2 && (!o.keep || o.keep(a))) this.put(x, y, m); } }
  line(x0, y0, x1, y1, w, m, o = {}) { const L = Math.hypot(x1 - x0, y1 - y0), n = Math.max(1, Math.ceil(L * 2)); for (let i = 0; i <= n; i++) { const t = i / n, ww = o.taper ? w * (1 - t * o.taper) : w; this.disc(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, Math.max(.5, ww / 2), m, o); } }
  // the variant: light, a 1-px halo round every glowing pixel (soft, for the dark); dark, a 1-px dark rim round everything (for bright ground)
  finish(variant, wrap = false) { // wrap: a repeating strip, its ends joining
    const { w, h } = this, m0 = this.sp.m.slice();
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = y * w + x; if (m0[i]) continue;
      let lit = false, any = false;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const X = wrap ? (x + dx + w) % w : x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= w || Y >= h) continue; const v = m0[Y * w + X]; if (v) { any = true; if (LIT.has(v) && v !== HALO) lit = true; } }
      if (variant === "dark" ? any : lit) { this.sp.m[i] = variant === "dark" ? RIM : HALO; this.sp.n.set([0, 0, 1], i * 3); this.tint[i] = 1; }
    }
    this.sp.tint = this.tint;
    return this.sp;
  }
}
const ball = (u, v) => { const z = Math.sqrt(Math.max(0, 1 - u * u - v * v)); return [u, v, z]; };
// a glowing blob: the hot core, the body and its edge, as three nested discs
function glow(c, x, y, r, o = {}) { c.disc(x, y, r, EDGE, o); c.disc(x, y, r * .72, BODY, o); if (r * .38 >= .5) c.disc(x, y, r * .38, CORE, o); else c.put(x, y, CORE); }

// Each effect's drawing: (c, f, S) with the frame f and the stroke scale S (1 ground, 2 treetop); px: art pixels a metre at this zoom.
// Returns the anchors (in pixels) beyond centre; centre defaults to the middle.
const DRAW = {
  spit(c, f, S) { // a glob, wobbling, drips trailing behind it
    const cy = c.h / 2, gx = c.w * .68, wob = [0, .12, -.08][f];
    glow(c, gx, cy, c.h * .3, { sx: 1.15 + wob, sy: 1 - wob });
    for (const [k, r] of [[.38, .14], [.2, .1], [.07, .07]]) glow(c, c.w * k, cy + [0, 1, -1][(f + Math.round(k * 9)) % 3] * S * .5, Math.max(1, c.h * r) * (S > 1 ? 1.2 : 1));
    return { tail: [c.w * .05, cy] };
  },
  barb(c, f, S) { // a thorn dart, point right, its glowing streak behind
    const cy = c.h / 2, L = c.w;
    c.line(L * .02, cy, L * .5, cy, Math.max(1, c.h * .28), [EDGE, BODY][f], { taper: -.6 });
    c.line(L * .1, cy, L * .45, cy, Math.max(1, c.h * .12), CORE);
    for (let x = Math.floor(L * .42); x < L - 1; x++) { const t = (x - L * .42) / (L * .58), hw = Math.max(.5, c.h * .32 * (1 - t)); for (let y = Math.floor(cy - hw); y <= cy + hw; y++) c.put(x, y, t > .75 ? M.BARKL : y < cy ? M.BARKL : M.TRUNK, [0, (y - cy) / (hw + .5), .8], false); }
    return { tail: [L * .02, cy], tip: [L - 1, cy] };
  },
  lobSeed(c, f) { // an acorn-like seed, tumbling a quarter turn a frame, a faint glow round it
    const cx = c.w / 2, cy = c.h / 2, r = c.w * .3, a = f * Math.PI / 2;
    glow(c, cx, cy, r * 1.45);
    for (let y = 0; y < c.h; y++) for (let x = 0; x < c.w; x++) { const dx = x + .5 - cx, dy = y + .5 - cy, u = dx * Math.cos(a) + dy * Math.sin(a), v = -dx * Math.sin(a) + dy * Math.cos(a), d = Math.hypot(u / 1.15, v); if (d > r) continue; c.sp.m[y * c.w + x] = 0; c.put(x, y, u < -r * .25 ? M.BARKL : M.TRUNK, ball(dx / r, dy / r), false); }
    return {};
  },
  lobStone(c, f) { // a lumpy stone, turning, a faint glow round it
    const cx = c.w / 2, cy = c.h / 2, r = c.w * .3, a = f * Math.PI / 2;
    glow(c, cx, cy, r * 1.4);
    for (let y = 0; y < c.h; y++) for (let x = 0; x < c.w; x++) { const dx = x + .5 - cx, dy = y + .5 - cy, ang = Math.atan2(dy, dx) - a, R = r * (1 + .12 * Math.sin(ang * 3) + .08 * Math.cos(ang * 5)); if (Math.hypot(dx, dy) > R) continue; c.sp.m[y * c.w + x] = 0; c.put(x, y, hash2(Math.floor((dx * Math.cos(a) + dy * Math.sin(a)) / 2), Math.floor((dy * Math.cos(a) - dx * Math.sin(a)) / 2), 4) < .3 ? M.STONED : M.STONE, ball(dx / R, dy / R), false); }
    return {};
  },
  lobShadow(c) { c.disc(c.w / 2, c.h / 2, c.w * .4, M.NOSE, { sy: .6, tint: false }); return {}; }, // a dark oval on the ground under the lob
  feather(c, f, S) { // a feather dart: a quill, a pale vane fluttering, its tip glowing, a streak behind
    const cy = c.h / 2, L = c.w, fl = [0, 1][f] * S;
    c.line(0, cy, L * .35, cy, Math.max(1, c.h * .2), EDGE);
    c.line(L * .3, cy, L - 2, cy, Math.max(1, S), M.TRUNK, { tint: false });
    for (let x = Math.floor(L * .3); x < L * .82; x++) { const t = (x - L * .3) / (L * .52), hw = c.h * .42 * Math.sin(Math.PI * Math.min(1, t * 1.1)); for (let y = Math.floor(cy - hw - (x % 3 === 0 ? fl : 0)); y <= cy + hw * .7; y++) if (y !== Math.floor(cy)) c.put(x, y, (x + y) % 4 === 0 ? M.STONE : M.BELLY, [0, (y - cy) / (hw + 1), .9], false); }
    glow(c, L - 2, cy, Math.max(1.2, c.h * .2));
    return { tail: [0, cy], tip: [L - 1, cy] };
  },
  mote(c, f) { const r = c.w * [.3, .34, .38, .34][f]; glow(c, c.w / 2, c.h / 2, r); for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + f * .4; c.put(c.w / 2 + Math.cos(a) * r * 1.25, c.h / 2 + Math.sin(a) * r * 1.25, BODY); } return { tail: [c.w * .1, c.h / 2] }; },
  // beams: the start's flare at the mouth, the loop that tiles, the end's splash
  beamStart(c, f, S, thick) { const cy = c.h / 2, R = c.h * [.36, .42, .4][f]; glow(c, c.w * .42, cy, R); c.line(c.w * .42, cy, c.w, cy, thick, BODY); c.line(c.w * .42, cy, c.w, cy, Math.max(1, thick * .4), CORE); for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3 + f * .5; c.line(c.w * .42, cy, c.w * .42 + Math.cos(a) * R * 1.3, cy + Math.sin(a) * R * 1.3, Math.max(1, S), EDGE); } return { mouth: [c.w * .42, cy], joint: [c.w - 1, cy] }; },
  beamLoop(c, f, S, thick, period) { // repeats exactly every period px; the bulges travel a quarter period a frame
    const cy = c.h / 2;
    for (let x = 0; x < c.w; x++) { const ph = ((x - f * period / 4) / period) * Math.PI * 2, hw = thick / 2 * (1 + .28 * Math.sin(ph)), hc = Math.max(.5, thick * .2 * (1 + .5 * Math.sin(ph + 1))); for (let y = 0; y < c.h; y++) { const d = Math.abs(y + .5 - cy); if (d <= hc) c.put(x, y, CORE); else if (d <= hw * .7) c.put(x, y, BODY); else if (d <= hw) c.put(x, y, EDGE); else if (d <= hw + 1.5 && (Math.floor((x + f * period / 4) / 2) % 4 === 0)) c.put(x, y, HALO); } }
    return { joint: [0, cy] };
  },
  beamEnd(c, f, S, thick) { const cy = c.h / 2, hx = c.w * .5, R = c.h * [.3, .4, .36][f]; c.line(0, cy, hx, cy, thick, BODY); c.line(0, cy, hx, cy, Math.max(1, thick * .4), CORE); glow(c, hx, cy, R); for (let k = 0; k < 7; k++) { const a = (k / 7) * Math.PI * 2 + f; c.line(hx, cy, hx + Math.cos(a) * R * (1.3 + .3 * ((k + f) % 2)), cy + Math.sin(a) * R * (1.3 + .3 * ((k + f) % 2)), Math.max(1, S), k % 2 ? EDGE : BODY); } return { joint: [0, cy], hit: [hx, cy] }; },
  quakeRing(c, f, S) { // the shockwave running out over six frames, cracks behind it
    const cx = c.w / 2, cy = c.h / 2, R0 = c.w / 2 - 2, k = (f + 1) / 6, R = R0 * (.2 + .8 * k);
    c.ring(cx, cy, R, (3 - k * 1.5) * S, f < 5 ? BODY : EDGE); c.ring(cx, cy, R - 2 * S, Math.max(1, S), CORE, { keep: a => f < 4 });
    for (let j = 0; j < 7; j++) { const a = (j / 7) * Math.PI * 2 + hash2(j, 1, 7) * .6, r1 = R0 * .12, r2 = Math.min(R - 3 * S, R0 * (.2 + .55 * k)); if (r2 <= r1) continue; let px = cx + Math.cos(a) * r1, py = cy + Math.sin(a) * r1, aa = a; for (let s = r1; s < r2; s += 9) { aa += (hash2(j, Math.floor(s), 9) - .5) * .35; const nx = cx + Math.cos(aa) * Math.min(r2, s + 9), ny = cy + Math.sin(aa) * Math.min(r2, s + 9); c.line(px, py, nx, ny, Math.max(1, S), f > 3 ? EDGE : BODY); px = nx; py = ny; } } // cracks running out from the middle, a little crooked
    return { radiusPx: R0 };
  },
  sporeCloud(c, f) { // puffs of spores, billowing; a few bright motes in it
    for (let k = 0; k < 9; k++) { const a = k * 2.4, rr = c.h * (.18 + .08 * hash2(k, f, 3)), x = c.w / 2 + Math.cos(a) * c.w * .3 * hash2(k, 0, 5) + Math.sin(f * 1.6 + k) * 1.5, y = c.h * .58 + Math.sin(a) * c.h * .22 * hash2(k, 1, 5) - k % 3; c.disc(x, y, rr, EDGE); c.disc(x - rr * .25, y - rr * .3, rr * .6, BODY); }
    for (let k = 0; k < 6; k++) c.put(c.w * hash2(k, f, 11), c.h * (.15 + .7 * hash2(k, f, 13)), CORE);
    return { base: [c.w / 2, c.h - 1] };
  },
  sporeStain(c) { const cx = c.w / 2, cy = c.h / 2; for (let k = 0; k < 14; k++) { const a = k * 2.4, r = c.w * .42 * Math.sqrt(hash2(k, 2, 3)); c.disc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, c.w * (.06 + .05 * hash2(k, 4, 5)), k % 3 ? EDGE : BODY); } return { radiusPx: c.w * .45 }; },
  targetCircle(c, f, S) { // a ring tightening to where it lands, four ticks pointing in, a cross at its middle
    const cx = c.w / 2, cy = c.h / 2, R0 = c.w / 2 - 2 - S, R = R0 * (1 - .1 * f / 3);
    c.ring(cx, cy, R, (1.5 + f * .4) * S, f === 3 ? CORE : BODY);
    for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + Math.PI / 4; c.line(cx + Math.cos(a) * R, cy + Math.sin(a) * R, cx + Math.cos(a) * R * .72, cy + Math.sin(a) * R * .72, 2 * S, BODY); }
    c.line(cx - 3 * S, cy, cx + 3 * S, cy, S, EDGE); c.line(cx, cy - 3 * S, cx, cy + 3 * S, S, EDGE);
    return { radiusPx: R0 };
  },
  line(c, f, S, period) { // chevrons pointing along the path (right), marching a quarter period a frame; repeats every period px
    const cy = c.h / 2, hw = c.h * .38;
    for (let x = 0; x < c.w; x++) { const ph = ((x - f * period / 4) % period + period) % period; for (let y = 0; y < c.h; y++) { const d = Math.abs(y + .5 - cy); if (d > hw) continue; const chev = ph - (period * .25 + d * .9); if (chev >= 0 && chev < 2 * S) c.put(x, y, d < hw * .35 ? BODY : EDGE); } if (Math.floor(x / 2) % 2 === 0) { c.put(x, cy - hw - S, EDGE); c.put(x, cy + hw + S - 1, EDGE); } }
    return { centre: [0, cy] };
  },
  lineStart(c, f, S) { const cy = c.h / 2; c.disc(c.w * .5, cy, c.h * .2, BODY); c.ring(c.w * .5, cy, c.h * .3, S, EDGE); return { joint: [c.w - 1, cy] }; },
  lineEnd(c, f, S) { const cy = c.h / 2, hw = c.h * .45; for (let x = 0; x < c.w; x++) { const t = x / c.w, w = hw * (1 - t); for (let y = Math.floor(cy - w); y <= cy + w; y++) c.put(x, y, Math.abs(y + .5 - cy) < w - 1.5 * S ? (t > .55 ? BODY : HALO) : EDGE); } return { joint: [0, cy], tip: [c.w - 1, cy] }; },
  windupFlash(c, f, S) { // a glint gathering: a point, a four-pointed star growing, a ring flashing out
    const cx = c.w / 2, cy = c.h / 2, R = c.w / 2 - 1, k = [.25, .5, .8, 1][f];
    glow(c, cx, cy, Math.max(1, R * .22 * k * 1.5));
    for (let a = 0; a < 4; a++) { const ang = a * Math.PI / 2 + Math.PI / 4 * (f % 2); c.line(cx, cy, cx + Math.cos(ang) * R * k, cy + Math.sin(ang) * R * k, Math.max(1, 1.6 * S), BODY, { taper: .8 }); }
    if (f === 3) c.ring(cx, cy, R * .8, S, EDGE);
    return {};
  },
  quakeReach(c, f, S) { // the quake's whole reach, a dashed ring pulsing, ticks pointing out
    const cx = c.w / 2, cy = c.h / 2, R = c.w / 2 - 2 - S;
    c.ring(cx, cy, R, (1.5 + .5 * (f % 2)) * S, f % 2 ? BODY : EDGE, { keep: a => Math.floor(((a + Math.PI) / (Math.PI * 2)) * 36 + f * .5) % 3 !== 2 });
    for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; c.line(cx + Math.cos(a) * R * .9, cy + Math.sin(a) * R * .9, cx + Math.cos(a) * R, cy + Math.sin(a) * R, 1.5 * S, BODY); }
    return { radiusPx: R };
  },
  hitSpark(c, f, S, big) { // a burst: a flash, then rays flying out and fading
    const cx = c.w / 2, cy = c.h / 2, R = c.w / 2 - 1, k = [.35, .65, .9, 1][f], n = big ? 10 : 7;
    if (f < 2) glow(c, cx, cy, R * (.35 + .2 * f));
    for (let j = 0; j < n; j++) { const a = (j / n) * Math.PI * 2 + hash2(j, big ? 2 : 1, 3) * .5, r0 = R * k * .45, r1 = R * k * (.75 + .25 * hash2(j, 5, 7)); c.line(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0, cx + Math.cos(a) * r1, cy + Math.sin(a) * r1, Math.max(1, (f < 3 ? 1.6 : 1) * S), f < 2 ? CORE : f < 3 ? BODY : EDGE); }
    return {};
  },
  slowRing(c, f, S) { // sticky drips round its feet, turning
    const cx = c.w / 2, cy = c.h / 2, R = c.w / 2 - 2 - S;
    c.ring(cx, cy, R * .8, Math.max(1, S), EDGE, { keep: a => Math.floor(((a + Math.PI) / (Math.PI * 2)) * 16) % 2 === 0 });
    for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2 + f * Math.PI / 12; glow(c, cx + Math.cos(a) * R * .8, cy + Math.sin(a) * R * .8, Math.max(1.2, 1.5 * S)); }
    return { radiusPx: R };
  },
  slowMark(c, f, S) { // a spiral, like a snail's shell, turning a little
    const cx = c.w / 2, cy = c.h / 2, R = c.w / 2 - 1; let px = cx, py = cy;
    for (let t = 0; t <= 1; t += .04) { const a = t * Math.PI * 3.2 + f * .6, r = R * t, x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r; c.line(px, py, x, y, Math.max(1, S * 1.3), t < .3 ? CORE : BODY); px = x; py = y; }
    return { base: [cx, c.h - 1] };
  },
  knockback(c, f, S) { // a burst at the left where it was struck, speed lines streaming right (the way it's pushed)
    const cy = c.h / 2, k = [.4, .8, 1][f];
    glow(c, c.w * .16, cy, c.h * (.3 - f * .06));
    for (let j = 0; j < 4; j++) { const y = cy + (j - 1.5) * c.h * .22, x0 = c.w * (.22 + .08 * (j % 2)), x1 = x0 + c.w * .6 * k; c.line(x0, y, x1, y, Math.max(1, S), j % 2 ? EDGE : BODY, { taper: .7 }); }
    for (let j = 0; j < 2; j++) c.line(c.w * .7 * k + c.w * .1, cy + (j ? 1 : -1) * c.h * .3, c.w * .85 * k + c.w * .1, cy, Math.max(1, 1.5 * S), BODY); // a chevron pointing on
    return { impact: [c.w * .16, cy] };
  },
  dust(c, f) { // a puff of dust at its feet (lit, not glowing; drawn in stone greys)
    for (let k = 0; k < 6; k++) { const a = Math.PI * (.05 + .9 * k / 5), r = c.w * (.12 + .3 * (f + 1) / 4), x = c.w / 2 + Math.cos(a) * r, y = c.h - 2 - Math.sin(a) * r * .5, rr = c.h * (.22 - f * .03); if (rr > .5) c.disc(x, y, rr, M.STONE, { ball: true, tint: false, mat: (u, v) => v < -.2 ? M.BELLY : M.STONE }); }
    return { base: [c.w / 2, c.h - 1] };
  },
};

// One frame of one effect: { sp (a Sprite; sp.tint the tint mask), anchors: { centre, ... } in pixels from the top-left, metres, px
// (art pixels a metre at this zoom), period (a repeating strip's, in px), radiusPx (a ring's) }. variant "light" | "dark";
// zoom "ground" | "treetop".
export function effectSprite(id, { frame = 0, variant = "light", zoom = "ground" } = {}) {
  const E = EFFECT_BY_ID[id]; if (!E) throw new Error(`no effect "${id}"`);
  const big = zoom === "treetop", K = big && !E.radius ? EFFECT_TREETOP_SCALE : 1, S = big ? 3 : 1, px = EFFECT_PPM * K, f = frame % E.frames;
  const period = E.period ? E.period * (big ? 2 : 1) : undefined;
  let w = Math.round(E.metres[0] * px), h = Math.round(E.metres[1] * px);
  if (period) w = period * Math.max(1, Math.round(w / period)); // a repeating strip: a whole number of periods
  if (E.plane === "ground" && !period && !/^line/.test(id)) { w += w % 2; h += h % 2; }
  const c = new Canvas(w, h), base = id.replace(/^beam(Short|Long)/, "beam"), long = /^beamLong/.test(id), thick = Math.max(2, E.metres[1] * px * (long ? .5 : .55) * (id.endsWith("Loop") ? 1 : .55));
  let a;
  if (base === "beamStart") a = DRAW.beamStart(c, f, S, thick);
  else if (base === "beamLoop") a = DRAW.beamLoop(c, f, S, thick, period);
  else if (base === "beamEnd") a = DRAW.beamEnd(c, f, S, thick);
  else if (id === "line") a = DRAW.line(c, f, S, period);
  else if (id === "hitSparkBig") a = DRAW.hitSpark(c, f, S, true);
  else a = DRAW[id](c, f, S);
  const sp = c.finish(variant, !!period), anchors = { centre: [w / 2, h / 2] }, extra = {};
  for (const [k, v] of Object.entries(a || {})) if (Array.isArray(v)) anchors[k] = [+v[0].toFixed(1), +v[1].toFixed(1)]; else extra[k] = +v.toFixed(1);
  return { sp, anchors, metres: [w / px, h / px], px, plane: E.plane, ...(period ? { period } : {}), ...extra };
}
