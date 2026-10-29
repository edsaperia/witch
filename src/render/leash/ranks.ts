// Rank sigils (Ed, 2026-10-27, after mocks 3 to 9: "I think larger sigils is good. I think embers are good. I think colours-for-rank
// is good; it's more important in rapid gameplay to be able to tell ranks apart than creatures"; tuning leash.ranks; the default since Ed, 2026-10-27:
// "go ahead and push all the new sigil work"; ?sigils=old the old look):
// every leash sigil (her stack, placed sigils, happy runes, the ghost, the treetop projection, the bond) is the bare glyph in its
// rank's colour (a baby's purple on either side; a friend's three blues, an enemy's three reds: no ring, no disc), embers rising off its strokes (more,
// bigger, brighter and higher each rank; a legend's white-hot), and a youth in her stack has two rows of round dots off to the
// right of its glyph, one a berry it still eats on the move (bright eaten, dim not; all bright, they pulse: ready), the last berry
// (eaten only at a sigil she's put down: rules/berries.ts lastBerry) its adult moment on the ground. Pure helpers here; the
// drawing is render/leash.ts's and render/leash/stack.ts's.
import type { Creature } from "../../rules/creatures";
import type { Tuning } from "../../rules/tuning";
import { toEvolve } from "../../rules/berries";
import { hash2 } from "../../rules/random";
import type { Instances } from "./glyphs";

export interface RankKnobs {
  on: boolean;
  /** The leash hex grid's size (m) while on (leash.hex.size; ?sigils=old puts it back to OLD_HEX). */
  hex: number;
  /** A placed sigil's glyph, across (m). */
  glyph: number;
  /** A friend's colours (hers, and the invited), baby to legend (0-255): the baby's purple, then three blues by intensity, a youth's
   *  muted, an adult's strong, a legend's the most saturated and vivid, pure brilliant blue, and shiny (legendShine) (Ed, 2026-10-29:
   *  "more strictly do hostile reds vs friendly blues, no purples"; "baby sigils are purple (neither friend nor enemy)"; on the
   *  legend: "the colour doesn't say 'elite' to me. It should be shiny or very saturated or clearly at the end of the colour
   *  progression"; before, a lightness ramp to a pale legend, and before that pink, light purple, light blue and turquoise). */
  colours: number[][];
  /** An enemy's (the wild still at their stone), baby to legend: the same purple for a baby, then three reds by intensity, a youth's
   *  muted, an adult's strong, a legend's a blazing red (no pink, magenta or purple). The baby's purple is the only purple there is. */
  enemy: number[][];
  /** Each rank's sigil size, baby to legend, against an adult's (Ed, 2026-10-28: today's size the adult's, about 10% a step; a legend's
   *  1.35 since Ed's "I didn't notice any legends in any runestone sigil stacks", 2026-10-29: "Bigger is ok"). */
  sizes: number[];
  /** Embers a sigil on the ground gives off, by rank: how many at once, each one's size (m) and how high it rises (m); in her stack, `stack` of that. */
  embers: { count: number[]; size: number[]; rise: number[]; stack: number };
  /** A youth's dots in her stack: at most this many a row (two rows). */
  dotsPerRow: number;
  /** A rune stone's rune, its glow (Ed, 2026-10-27: "Make runestone sigils glow brighter"): its baked colour times this, hue kept. */
  stoneGlow: number;
  /** Over each rune stone (Ed, 2026-10-28; render/leash/stones.ts): its area's sigils in a column, shown within `range` m of her
   *  (fading over the last `fade`); the spell's spot `south` m south of it, `size` m across, fully on within `near` m and gone past
   *  `far`; the cast's ring of `bars` bars `radius` m round the stone's foot, each step `cell` m, stretched north-south by `ringTilt` against the camera's foreshortening; the conversion `convert` seconds. */
  stones?: { range: number; fade: number; south: number; size: number; near: number; far: number; bars: number; radius: number; cell: number; convert: number; ringTilt?: number };
  /** The leashes as chains (render/leash/chain.ts): a link's length (m) by rank, youth to legend (babies have no leash: Ed, 2026-10-11, and again 2026-10-28); a legend's tether's links `tether` times
   *  its rank's; a slack leash `slack` longer than its span; and their motion (chain.ts ChainMotion: damping, gravity, arcPull,
   *  iterations, jump). */
  chain?: { link: number[]; tether: number; slack: number; damping: number; gravity: number; arcPull: number; iterations: number; jump: number };
}

export const STONES_DEFAULT = { range: 90, fade: 20, south: 4, size: 4.4, near: 5, far: 10, bars: 36, radius: 4.4, cell: 0.55, convert: 2.4, ringTilt: 1.6 };
export const CHAIN_DEFAULT = { link: [0.62, 0.78, 1], tether: 1.3, slack: 0.12, damping: 0.96, gravity: 9.8, arcPull: 60, iterations: 6, jump: 8 };

export const RANKS_DEFAULT: RankKnobs = {
  on: true, hex: 6, glyph: 5,
  colours: [[180, 100, 255], [125, 145, 195], [55, 115, 220], [0, 135, 255]],
  enemy: [[180, 100, 255], [190, 105, 100], [225, 45, 40], [255, 55, 15]],
  sizes: [0.81, 0.9, 1, 1.35],
  embers: { count: [3, 5, 8, 12], size: [0.22, 0.26, 0.3, 0.36], rise: [1.6, 2.1, 2.8, 3.6], stack: 0.4 },
  dotsPerRow: 4, stoneGlow: 2.4,
};

/** The leash hex grid's size (m) before the rank sigils (4: leash.spacing's density), as ?sigils=old brings it back. */
export const OLD_HEX = 4;

export const rankKnobs = (t: Tuning): RankKnobs => ({ ...RANKS_DEFAULT, ...(t.leash.ranks ?? {}) });
export const stoneKnobs = (t: Tuning): NonNullable<RankKnobs["stones"]> => ({ ...STONES_DEFAULT, ...(t.leash.ranks?.stones ?? {}) });
export const chainKnobs = (t: Tuning): NonNullable<RankKnobs["chain"]> => ({ ...CHAIN_DEFAULT, ...(t.leash.ranks?.chain ?? {}) });
export const ranksOn = (t: Tuning): boolean => !!t.leash.ranks?.on;

/** A rank: 0 baby, 1 youth, 2 adult, 3 legend (any higher level a legend's). */
export const rankOf = (c: Pick<Creature, "level">): number => Math.max(0, Math.min(3, c.level));

/** The rank's colour, 0 to 1: a friend's (hers, the invited) or an enemy's (the wild at their stone). */
export function rankColour(t: Tuning, rank: number, friend = true): [number, number, number] {
  const K = rankKnobs(t), c = (friend ? K.colours : K.enemy)[Math.max(0, Math.min(3, rank))] ?? [255, 255, 255];
  return [c[0] / 255, c[1] / 255, c[2] / 255];
}

/** The rank's sigil size against an adult's (Ed, 2026-10-28): 0.81, 0.9, 1, and a legend 1.35 (coordinator, 2026-10-29: unmistakable). */
export const rankSize = (t: Tuning, rank: number): number => rankKnobs(t).sizes[Math.max(0, Math.min(3, rank))] ?? 1;

/** A youth's dots in her stack: one for each berry it eats on the move (its cost to adult, less the last, eaten at a placed sigil:
 *  rules/berries.ts lastBerry), and how many it has eaten; none for any other rank. Read from the rules (toEvolve), so it follows
 *  the berry tuning. */
export function youthDots(c: Pick<Creature, "level" | "species">, fed: number, t: Tuning): { n: number; lit: number } {
  if (c.level !== 1) return { n: 0, lit: 0 };
  const need = toEvolve(1, t, c.species);
  if (!Number.isFinite(need)) return { n: 0, lit: 0 };
  const n = Math.max(0, Math.round(need) - 1);
  return { n, lit: Math.max(0, Math.min(n, Math.floor(fed))) };
}

/** The dots drawn, two rows of at most `perRow`: a youth needing more (before the berry costs came down to 3 / 4 / 8, a strong
 *  one had 15 on the move) shows the most there's room for, lit in proportion. */
export function shownDots(d: { n: number; lit: number }, perRow = 4): { n: number; lit: number } {
  const max = perRow * 2;
  return d.n <= max ? d : { n: max, lit: d.lit >= d.n ? max : Math.floor((d.lit * max) / d.n) };
}

/** Where a youth's dot i of n sits beside its glyph, in units of the glyph's size from its middle (x right, y up): two rows off to
 *  the right, filling across in pairs (top, bottom), the bottom row half a dot on, so the rows interlock; at most `perRow` a row. */
export function dotAt(i: number, n: number, perRow = 4): { x: number; y: number } {
  const cols = Math.min(perRow, Math.ceil(n / 2)), col = Math.min(cols - 1, Math.floor(i / 2)), row = i % 2;
  return { x: 0.66 + col * 0.3 + row * 0.15, y: row ? -0.14 : 0.14 };
}

/** The opaque pixels of a glyph in the atlas, as offsets from its middle in units of its size (x right, y down the atlas): where
 *  its embers start. Kept to `max` of them, evenly. */
export function glyphPoints(alpha: Uint8ClampedArray, w: number, max = 96): [number, number][] {
  const all: [number, number][] = [];
  for (let i = 3; i < alpha.length; i += 4) if (alpha[i]) { const k = (i - 3) / 4; all.push([(k % w + 0.5) / w - 0.5, (Math.floor(k / w) + 0.5) / w - 0.5]); }
  if (all.length <= max) return all;
  const out: [number, number][] = [];
  for (let j = 0; j < max; j++) out.push(all[Math.floor((j * all.length) / max)]);
  return out;
}

/** Embers off a sigil's strokes: `pts` its glyph's pixels (glyphPoints), at (x, y, z), `size` across; `flat` lying on the ground
 *  (they rise off it), else standing in her stack (they rise up the screen from it). Each a loop of its own, seeded by `seed`. */
export function drawEmbers(batch: Instances, dot: number[], pts: [number, number][], x: number, y: number, z: number, size: number, flat: boolean, rank: number, col: [number, number, number], time: number, seed: number, E: RankKnobs["embers"], scale = 1): void {
  if (!pts.length) return;
  const r = Math.max(0, Math.min(3, rank)), n = Math.max(1, Math.round(E.count[r] * scale)), sz = E.size[r] * (flat ? 1 : 0.6), rise = E.rise[r] * (flat ? 1 : scale);
  for (let i = 0; i < n; i++) {
    const life = (time * (0.32 + 0.12 * hash2(seed, i, 71)) + hash2(seed, i, 73)) % 1, p = pts[Math.floor(hash2(seed, i, 79) * pts.length)];
    const drift = Math.sin((life * 0.8 + hash2(seed, i, 83)) * Math.PI * 2) * 0.12 * size * 0.3;
    const hot = r === 3 ? 0.9 * (1 - life) : 0.55 * (1 - life); // (white at the core when it leaves the stroke; a legend's white-hot)
    const cr = col[0] + (1 - col[0]) * hot, cg = col[1] + (1 - col[1]) * hot, cb = col[2] + (1 - col[2]) * hot, a = life < 0.8 ? 1 : (1 - life) / 0.2;
    const s = sz * (1 - life * 0.45);
    if (flat) batch.add(x + p[0] * size + drift, y + 0.1 + life * rise, z + p[1] * size, s, dot, cr, cg, cb, a);
    else batch.add(x + p[0] * size + drift, y - p[1] * size + life * rise, z + 0.05, s, dot, cr, cg, cb, a);
  }
}

/** A legend's sigil's shine (Ed, 2026-10-29: "shiny or very saturated"; the ring of dots it had first, "not a good idea"): what its
 *  instances carry (render/leash/glyphs.ts Instances.add `shine`): 0 for any other rank; for a legend, every `period` s for 40% of
 *  it, a glint sweeping across its glyph corner to corner (2 + where the glint is, -0.3 to 1.3; 1 between glints). `seed` sets each one's glint apart. */
export function legendShine(rank: number, time: number, seed = 0, period = 2.6): number {
  if (rank < 3) return 0;
  const k = (((time / period + seed * 0.37) % 1) + 1) % 1;
  return k < 0.4 ? 2 + (k / 0.4) * 1.6 - 0.3 : 1;
}

/** The rank on an area's rune stone (Ed, 2026-10-27: "Runestone sigils adopt the new colour scheme; they are the colour of the
 *  highest level animal in their area"), by its cell's key ("cx,cy"): the highest level among the animals that live there now (a
 *  legend's, asleep or awake, while it's home), or EMPTY_STONE with none. Only the area's own: not hers (leashed, carried or left at
 *  a sigil), nor any gone, fleeing, travelling or off dancing at the party; so it changes as they grow, are recruited away, come
 *  home or leave. */
export const EMPTY_STONE = 4;
type Resident = Pick<Creature, "cell" | "level" | "leashed"> & Partial<Pick<Creature, "gone" | "fleeUntil" | "travelling" | "dancing" | "partyLegend" | "state">>;
export function areaTopRanks(creatures: readonly Resident[], out = new Map<string, number>()): Map<string, number> {
  out.clear();
  for (const c of creatures) {
    if (c.gone || c.leashed || c.state === "happy" || c.fleeUntil !== undefined || c.travelling || c.dancing || c.partyLegend) continue; // (only the still hostile: Ed, 2026-10-28, the stone in the enemy palette)
    const k = c.cell[0] + "," + c.cell[1], r = rankOf(c);
    if ((out.get(k) ?? -1) < r) out.set(k, r);
  }
  return out;
}
export const stoneRank = (top: Map<string, number>, cell: readonly [number, number]): number => top.get(cell[0] + "," + cell[1]) ?? EMPTY_STONE;
/** An empty area's stone: its rune unlit, the dark of a cold stone's carving (its 4th: none of the white a lit rune's brightest
 *  pixels take, render/islandArt.ts recolour); its light, beam and motes a little cold moonlight (EMPTY_STONE_LIGHT of a lit one's). */
export const EMPTY_STONE_RGB = [70, 72, 86, 0];
/** A lit rank stone's rune: its brightest pixels only this share toward white, so its rank's colour holds (a species' neon, 1). */
export const STONE_WHITE = 0.3;
export const EMPTY_STONE_LIGHT = 0.3;
