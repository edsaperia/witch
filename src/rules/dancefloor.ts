// The dancefloor's tile-lighting engine (Ed, v160: "It reacts to the witch standing on it, and also
// 'switches on' at the start of the game. It has different levels of intensity as the party grows.
// We should have a system to light squares rather than just an art asset."). A 32 x 32 grid of
// glass tiles inside a circle (the art's DISCO_MASK), each lit each frame with a colour and an
// intensity (0 off, 1 to 3 brighter and brighter), composed from layers, bottom to top:
//   1. the pattern: the art's library (art/dancefloor.js) and procedural generators (rings,
//      spokes, sweep, chequer, sparkle, stripes), sequenced on the beat, one after another in a
//      seeded order with no immediate repeats, changing on bar lines through a transition (wipe,
//      iris, dissolve, burst); an area's own shape joins the mix once its area has the party;
//   2. events: pulses travelling out towards an area the party has just reached, a flash where a
//      sigil was placed, the tiles under creatures dancing on the floor;
//   3. the witch: the tiles under her in her glow, a ripple out from her on each beat, a fading
//      trail of footsteps, and a big ripple when she lands on it;
//   4. intensity, from the party's level (dancefloor.levels: how many partified areas each level
//      takes): low, a few tiles, slow, two colours, simple patterns; high, more of everything, up
//      to a full rave.
// The floor starts dark and switches on once, when the witch first leaves the treehouse's terrace:
// the art's boot sequence, then the first pattern on the next bar line.
// No drawing here: the view makes the tiles a texture and the floor's light from `average`.
import { DISCO_GRID, DISCO_MASK, DISCO_RADIUS, DISCO_TRANSITIONS, discoPatterns, discoTransition } from "../../art/dancefloor.js";
import { NEON } from "../../art/sigils.js";
import { hash2, vnoise } from "./random";
import type { Tuning } from "./tuning";

export const GRID = DISCO_GRID as number;
const MASK = DISCO_MASK as Uint8Array, C = GRID / 2, R = DISCO_RADIUS as number;
type Rgb = [number, number, number];
/** A neon by name (art/sigils.js NEON), cyan if unknown. */
export const neon = (name: string | undefined): Rgb => ((NEON as unknown as Record<string, Rgb>)[name ?? ""] ?? [50, 235, 255]);

/** A pattern: frames of palette indices (0 off), `beats` long at `fpb` frames a beat, or a generator. */
export interface FloorPattern {
  id: string; kind: string; level: number; beats: number; fpb: number; palette: string[];
  frames?: Uint8Array[]; area?: string;
  /** A procedural pattern: the palette index at tile (x, y) (from the centre, in tiles) at beat b. */
  gen?: (x: number, y: number, b: number) => number;
}

const ang = (x: number, y: number) => Math.atan2(y, x);
/** Patterns that need no art: shapes from the tile coordinates and the beat. */
export const GENERATORS: FloorPattern[] = [
  { id: "gen-rings", kind: "loop", level: 1, beats: 8, fpb: 4, palette: ["cyan", "pink"], gen: (x, y, b) => { const r = Math.hypot(x, y) - b * 2; return ((r % 6) + 6) % 6 < 1.2 ? 1 + (Math.floor(b) % 2) : 0; } },
  { id: "gen-spokes", kind: "loop", level: 2, beats: 8, fpb: 4, palette: ["lemon", "violet"], gen: (x, y, b) => { const a = (ang(x, y) + b * 0.4) / (Math.PI / 4); return Math.abs(a - Math.round(a)) < 0.12 ? 1 + (Math.round(a) & 1) : 0; } },
  { id: "gen-sweep", kind: "loop", level: 1, beats: 4, fpb: 4, palette: ["acid", "mint"], gen: (x, y, b) => { const d = (((ang(x, y) - b * (Math.PI / 2)) % (Math.PI * 2)) + Math.PI * 4) % (Math.PI * 2); return d < 0.5 ? 1 : d < 1.1 ? 2 : 0; } },
  { id: "gen-chequer", kind: "fill", level: 2, beats: 4, fpb: 1, palette: ["pink", "blue"], gen: (x, y, b) => ((Math.floor(x / 2) + Math.floor(y / 2) + Math.floor(b)) & 1 ? 1 : 2) },
  { id: "gen-sparkle", kind: "fill", level: 3, beats: 8, fpb: 4, palette: ["cyan", "magenta", "lemon"], gen: (x, y, b) => { const h = hash2(Math.floor(x + C), Math.floor(y + C), Math.floor(b * 4)); return h < 0.18 ? 1 + Math.floor(h * 16.6) % 3 : 0; } },
  { id: "gen-stripes", kind: "loop", level: 2, beats: 8, fpb: 4, palette: ["orange", "violet"], gen: (x, y, b) => { const s = ((x + y + b * 3) % 8 + 8) % 8; return s < 2 ? 1 : s < 3 ? 2 : 0; } },
];

let library: FloorPattern[] | null = null;
/** The art's patterns (but the switch-on) and the generators. */
export function floorPatterns(): FloorPattern[] {
  if (!library) library = [...(discoPatterns() as FloorPattern[]).filter(p => p.kind !== "boot"), ...GENERATORS];
  return library;
}
const bootPattern = (): FloorPattern => (discoPatterns() as FloorPattern[]).find(p => p.kind === "boot")!;

export interface FloorEvent { kind: "wave" | "sigil"; at: number; /** wave: the direction out (radians, x right, z down); sigil: unused */ dir: number; rgb: Rgb }

export interface FloorState {
  /** When it switched on (game time), or null while it's still dark. */
  on: number | null;
  /** The pattern playing (an index into floorPatterns()), from which beat; the one coming in, and its transition. */
  pattern: number; from: number;
  next: number | null; transition: { id: string; start: number; beats: number; angle: number } | null;
  /** How many patterns have played (seeds the order). */
  played: number;
  ripples: { x: number; y: number; at: number; big: boolean }[];
  trail: { x: number; y: number; at: number }[];
  events: FloorEvent[];
  /** The witch's last tile and lift, to see steps and landings; the last beat she rippled on. */
  last: { x: number; y: number; lift: number; beat: number } | null;
}

export function newFloor(): FloorState {
  return { on: null, pattern: 0, from: 0, next: null, transition: null, played: 0, ripples: [], trail: [], events: [], last: null };
}

/** The party's level, 1 to the number of thresholds + 1, from how many areas have the party. */
export function floorLevel(partified: number, t: Tuning): number {
  let l = 1;
  for (const k of t.dancefloor.levels) if (partified >= k) l++;
  return Math.min(4, l);
}

/** Where a point on the ground falls on the grid (tile units, fractional) for a floor at (cx, cz) of `radius` metres. */
export function tileOf(x: number, z: number, cx: number, cz: number, radius: number): { x: number; y: number } {
  const m = radius / R;
  return { x: (x - cx) / m + C, y: (z - cz) / m + C };
}

const beatOf = (time: number, t: Tuning, inp?: { beatAt?: (time: number) => number }) => (inp?.beatAt ? inp.beatAt(time) : (time * t.beat.bpm) / 60);
const BOOT_BEATS = () => bootPattern().beats;

/** Switch it on (once). */
export function switchOn(f: FloorState, time: number): void {
  if (f.on === null) f.on = time;
}

/** Pick the pattern after `cur`: seeded, suited to the level, never the same one twice running. */
export function pickPattern(cur: number, played: number, level: number, partifiedAreas: ReadonlySet<string>, seed: number): number {
  const lib = floorPatterns(), ok: number[] = [];
  lib.forEach((p, i) => {
    if (i === cur || p.level > level) return;
    if (p.kind === "area" && !(p.area && partifiedAreas.has(p.area))) return; // an area's shape once it has the party
    ok.push(i);
  });
  if (!ok.length) return cur;
  return ok[Math.floor(hash2(played, seed, 977) * ok.length)];
}

export interface FloorInputs {
  time: number; seed: number; level: number;
  /** Beats gone by at a game time (the beat clock, rules/beat.ts); without it, time × beat.bpm / 60. */
  beatAt?: (time: number) => number;
  /** The area types (ids) that have the party: their shapes join the mix. */
  partifiedAreas: ReadonlySet<string>;
  /** The witch on the grid (tile units), her lift (0 ground, 1 treetops) and glow colour. */
  witch: { x: number; y: number; lift: number; rgb: Rgb };
  /** Creatures dancing on the floor, on the grid, in their colours. */
  dancers: { x: number; y: number; rgb: Rgb }[];
  /** The moon's phase (rules/moon.ts: 0 new, 0.5 full): before the first wave the floor shows only the moon (Ed, 2026-10-06). */
  moon?: { phase: number };
}

/** Advance the sequence and the witch's marks to `time` (call every frame). */
export function stepFloor(f: FloorState, inp: FloorInputs, t: Tuning): void {
  const D = t.dancefloor.tiles, beat = beatOf(inp.time, t, inp);
  if (f.on === null) return;
  const bootEnd = beatOf(f.on, t, inp) + BOOT_BEATS();
  if (beat < bootEnd) { f.from = Math.ceil(bootEnd / 4) * 4; f.pattern = pickPattern(-1, 0, inp.level, inp.partifiedAreas, inp.seed); return; }
  // On a bar line once the pattern has played its length (held longer at lower levels), the next comes in.
  const lib = floorPatterns(), p = lib[f.pattern], hold = p.beats * (inp.level >= 4 ? 1 : inp.level >= 2 ? 2 : 3), bar = Math.floor(beat / 4) * 4;
  if (!f.transition && beat >= f.from && bar >= f.from + Math.max(4, hold) && bar === Math.floor(beat / 4) * 4) {
    const next = pickPattern(f.pattern, f.played + 1, inp.level, inp.partifiedAreas, inp.seed);
    const tr = (DISCO_TRANSITIONS as { id: string; beats: number }[])[Math.floor(hash2(f.played, inp.seed, 979) * DISCO_TRANSITIONS.length)];
    f.next = next; f.transition = { id: tr.id, start: bar, beats: tr.beats, angle: hash2(f.played, inp.seed, 981) * Math.PI * 2 };
  }
  if (f.transition && beat >= f.transition.start + f.transition.beats) {
    f.pattern = f.next!; f.from = f.transition.start; f.next = null; f.transition = null; f.played++;
  }
  // The witch: on it when low over a tile inside the circle.
  const w = inp.witch, on = w.lift < D.witchLift && onFloor(w.x, w.y);
  if (on) {
    const L = f.last;
    if (L && L.lift >= D.witchLift * 0.5 && w.lift < 0.05) f.ripples.push({ x: w.x, y: w.y, at: inp.time, big: true }); // a landing
    if (!L || Math.floor(beat) !== L.beat) f.ripples.push({ x: w.x, y: w.y, at: inp.time, big: false }); // a ripple on each beat
    if (w.lift < 0.05 && (!L || Math.floor(L.x) !== Math.floor(w.x) || Math.floor(L.y) !== Math.floor(w.y))) f.trail.push({ x: w.x, y: w.y, at: inp.time });
  }
  f.last = { x: w.x, y: w.y, lift: w.lift, beat: Math.floor(beat) };
  f.ripples = f.ripples.filter(r => inp.time - r.at < D.rippleTime * (r.big ? 2 : 1));
  f.trail = f.trail.filter(s => inp.time - s.at < D.trailTime).slice(-48);
  f.events = f.events.filter(e => inp.time - e.at < D.eventTime);
}

/** A trigger: a pulse out towards an area the party just reached (dir: radians, x right, z down), or a flash for a sigil placed. */
export function floorEvent(f: FloorState, e: FloorEvent): void {
  if (f.on !== null) f.events.push(e);
}

const onFloor = (x: number, y: number) => { const i = Math.floor(x), j = Math.floor(y); return i >= 0 && j >= 0 && i < GRID && j < GRID && MASK[j * GRID + i] === 1; };

export interface FloorTiles {
  /** Per tile: r, g, b (0-255) and intensity (0 off, 1-3). */
  rgbi: Uint8Array;
  /** The lit tiles' average colour (0-1) and how much of the floor is lit (0-1, by intensity). */
  average: Rgb; lit: number;
}

/** The floor's tiles at `time`: every layer composed. */
export function composeFloor(f: FloorState, inp: FloorInputs, t: Tuning, out?: Uint8Array): FloorTiles {
  const D = t.dancefloor.tiles, rgbi = out ?? new Uint8Array(GRID * GRID * 4), level = inp.level, time = inp.time, beat = beatOf(time, t, inp);
  rgbi.fill(0);
  if (f.on === null) { if (inp.moon) moonTiles(rgbi, inp.moon.phase, time, t); return summary(rgbi); }
  const set = (n: number, c: Rgb, i: number, add = false) => {
    if (!MASK[n] || i <= 0) return;
    const k = n * 4, cur = rgbi[k + 3];
    if (add && cur) { for (let q = 0; q < 3; q++) rgbi[k + q] = Math.min(255, rgbi[k + q] + c[q] * 0.6); rgbi[k + 3] = Math.min(3, cur + i); return; }
    if (i < cur && !add) return;
    rgbi[k] = c[0]; rgbi[k + 1] = c[1]; rgbi[k + 2] = c[2]; rgbi[k + 3] = Math.min(3, i);
  };
  const base = Math.max(1, Math.min(3, Math.round(level * 0.75))), colours = level >= 3 ? 4 : 2;
  const valueOf = (p: FloorPattern, from: number, n: number) => {
    const b = Math.max(0, beat - from);
    if (p.gen) { const x = (n % GRID) + 0.5 - C, y = Math.floor(n / GRID) + 0.5 - C; return p.gen(x, y, b * (0.6 + 0.2 * level)); }
    const fr = p.frames!, k = Math.floor(b * p.fpb) % fr.length;
    return fr[k][n];
  };
  const colourOf = (p: FloorPattern, v: number): Rgb => neon(p.palette[Math.min(v, colours, p.palette.length) - 1] ?? p.palette[0]);
  // 1. The pattern (or the switch-on sequence), and the next one through the transition's mask.
  const bootFrom = beatOf(f.on, t, inp), booting = beat < bootFrom + BOOT_BEATS();
  const lib = floorPatterns(), p = booting ? bootPattern() : lib[f.pattern], from = booting ? bootFrom : f.from;
  const tr = !booting && f.transition && f.next !== null ? f.transition : null;
  const mask = tr ? (discoTransition(tr.id, Math.min(1, Math.max(0, (beat - tr.start) / tr.beats)), { angle: tr.angle }) as Uint8Array) : null;
  const q = tr ? lib[f.next!] : null;
  for (let n = 0; n < GRID * GRID; n++) {
    if (!MASK[n]) continue;
    const m = mask ? mask[n] : 0;
    if (m === 2) { set(n, colourOf(q!, 1), 3); continue; }
    const pp = m ? q! : p, v = valueOf(pp, m ? tr!.start : from, n);
    if (v) set(n, colourOf(pp, v), booting ? 2 : Math.min(3, base + (v === 1 && level >= 3 ? 1 : 0)));
    else if (level >= 4 && hash2(n, Math.floor(beat * 2), 51) < 0.03) set(n, colourOf(pp, 1 + (n % pp.palette.length)), 1); // a full floor sparkles between
  }
  // 2. Events: a band travelling out towards the area the party reached; a flash out from the centre for a sigil.
  for (const e of f.events) {
    const k = (time - e.at) / D.eventTime, front = k * (R + 2);
    for (let n = 0; n < GRID * GRID; n++) {
      if (!MASK[n]) continue;
      const x = (n % GRID) + 0.5 - C, y = Math.floor(n / GRID) + 0.5 - C, r = Math.hypot(x, y);
      if (Math.abs(r - front) > 1.2) continue;
      if (e.kind === "wave") { let d = Math.abs(Math.atan2(y, x) - e.dir); d = Math.min(d, Math.PI * 2 - d); if (d > 0.7) continue; }
      set(n, e.rgb, 3);
    }
  }
  for (const c of inp.dancers) { const i = Math.floor(c.x), j = Math.floor(c.y); if (onFloor(c.x, c.y)) set(j * GRID + i, c.rgb, 2 + (Math.floor(beat) % 2)); }
  // 3. The witch: footsteps fading, ripples out from her, and the tiles under her in her glow.
  const W = inp.witch;
  for (const s of f.trail) { const k = 1 - (time - s.at) / D.trailTime; if (onFloor(s.x, s.y)) set(Math.floor(s.y) * GRID + Math.floor(s.x), W.rgb, Math.ceil(k * 2)); }
  for (const rp of f.ripples) {
    const life = D.rippleTime * (rp.big ? 2 : 1), k = (time - rp.at) / life, front = k * (rp.big ? R * 1.6 : 7);
    for (let n = 0; n < GRID * GRID; n++) {
      if (!MASK[n]) continue;
      const d = Math.hypot((n % GRID) + 0.5 - rp.x, Math.floor(n / GRID) + 0.5 - rp.y);
      if (Math.abs(d - front) < 0.7) set(n, W.rgb, Math.max(1, Math.round((1 - k) * 3)));
    }
  }
  if (W.lift < D.witchLift && onFloor(W.x, W.y)) {
    for (let n = 0; n < GRID * GRID; n++) {
      if (!MASK[n]) continue;
      const d = Math.hypot((n % GRID) + 0.5 - W.x, Math.floor(n / GRID) + 0.5 - W.y);
      if (d < 2.6) set(n, W.rgb, d < 1 ? 3 : d < 1.9 ? 2 : 1);
    }
  }
  // 4. Intensity: at low levels only some of the lit tiles show, so the floor is sparse and calm.
  if (level <= 1) for (let n = 0; n < GRID * GRID; n++) if (rgbi[n * 4 + 3] && hash2(n, Math.floor(beat / 2), 53) > D.lowLevelShare) rgbi[n * 4 + 3] = 0;
  // 5. The first wave: the full moon flares out over the switch-on and fades into the party.
  const fl = t.moon.floor.flare, k = (time - f.on) / Math.max(0.01, fl);
  if (inp.moon && k >= 0 && k < 1) {
    const P = t.moon.floor.palette, front = R * t.moon.floor.size + (R + 3) * (1 - (1 - k) ** 3), i = Math.ceil(3 * (1 - k) ** 0.7);
    for (let n = 0; n < GRID * GRID; n++) {
      if (!MASK[n]) continue;
      const d = Math.hypot((n % GRID) + 0.5 - C, Math.floor(n / GRID) + 0.5 - C);
      if (d > front || rgbi[n * 4 + 3] > i) continue;
      const c = d > front - 1.5 ? P[1] : P[2];
      rgbi[n * 4] = c[0]; rgbi[n * 4 + 1] = c[1]; rgbi[n * 4 + 2] = c[2]; rgbi[n * 4 + 3] = i;
    }
  }
  return summary(rgbi);
}

/** The lit tiles' average colour and how much of the floor is lit, for the floor's light. */
function summary(rgbi: Uint8Array): FloorTiles {
  let sr = 0, sg = 0, sb = 0, si = 0, tiles = 0;
  for (let n = 0; n < GRID * GRID; n++) {
    if (!MASK[n]) continue;
    tiles++;
    const i = rgbi[n * 4 + 3];
    if (!i) continue;
    sr += rgbi[n * 4] * i; sg += rgbi[n * 4 + 1] * i; sb += rgbi[n * 4 + 2] * i; si += i;
  }
  return { rgbi, average: si ? [sr / si / 255, sg / si / 255, sb / si / 255] : [0, 0, 0], lit: si / (tiles * 3) };
}

const SEAS: [number, number, number][] = [[-0.28, -0.3, 0.27], [0.18, -0.38, 0.17], [0.08, 0.05, 0.2], [-0.38, 0.22, 0.14], [0.3, 0.32, 0.1]]; // the moon's dark seas (x, y, radius in its radii), as we see them

/** The floor before the first wave (Ed, 2026-10-06: "only phases of the moon (a new animation), in muted
 *  twilight colours"): the moon at `phase` (0 new, 0.5 full; the sky's own, rules/moon.ts) in the middle,
 *  its lit side soft silver with slate seas, its dark side a faint dusky violet, and a few stars twinkling
 *  slowly round it. Waxing it fills from the right (as seen from the south), waning it empties from it. */
export function moonTiles(rgbi: Uint8Array, phase: number, time: number, t: Tuning): void {
  const F = t.moon.floor, P = F.palette, mr = R * F.size, waxing = phase < 0.5, lit = 0.5 - 0.5 * Math.cos(phase * Math.PI * 2);
  // the thinnest crescents at least two tiles at their widest, so they read from the ground camera (the art director, #252)
  const xt = lit > 0.01 ? Math.min(Math.cos(phase * Math.PI * 2), 1 - 2 / mr) : Math.cos(phase * Math.PI * 2);
  const set = (n: number, c: number[], i: number) => { rgbi[n * 4] = c[0]; rgbi[n * 4 + 1] = c[1]; rgbi[n * 4 + 2] = c[2]; rgbi[n * 4 + 3] = i; };
  for (let n = 0; n < GRID * GRID; n++) {
    if (!MASK[n]) continue;
    const x = (n % GRID) + 0.5 - C, y = Math.floor(n / GRID) + 0.5 - C, d = Math.hypot(x, y);
    if (d < mr) {
      const nx = x / mr, s = Math.sqrt(Math.max(0, 1 - (y / mr) ** 2)), on = waxing ? nx > xt * s : nx < -xt * s;
      if (on) set(n, SEAS.some(([sx, sy, sr]) => Math.hypot(nx - sx, y / mr - sy) < sr * (0.85 + 0.3 * vnoise(x * 0.9, y * 0.9, 61))) ? P[1] : P[2], 2); // its seas in slate
      else if ((Math.floor(x + C) + Math.floor(y + C)) % 2 === 0) set(n, P[0], 1); // the dark side, faint (earthshine), in an even dither
    } else if (d > mr + 1.5) {
      // Stars, each with its own slow rate, coming and going.
      const h = hash2(n, 0, 71), on = hash2(n, Math.floor(time / (2.5 + 3 * h) + h * 9), 73) < F.stars;
      if (on) set(n, h > 0.7 ? P[2] : P[0], 1);
    }
  }
}
