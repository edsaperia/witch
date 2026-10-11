// The beach's decorations, placed (Ed, 2026-10-06: "The beach should have a few beach decorations, sparsely: shells, star
// fish, conch, footprints of people and creatures. No towels or deckchairs or human items, just nature."; art/beach.js):
// seeded by the map and the coast's sector, so the same beach every time and nothing made but near her. Finds lie
// scattered on the wet and dry sand (never in the woods' ragged edge), rocks on its rocky stretches; now and then a trail
// of footprints (bare feet, a paw, a hoof, a bird's) wanders along the sand and fades out. Knobs: the tuning's beach.decor.
import { hash2, rng } from "./random";
import type { Beach } from "./mapShape";

/** The knobs (tuning beach.decor): finds a sector on average, a trail's chance a sector, its prints (fewest, most), the
 *  edge left clear inland (the woods' ragged edge), sectors round the coast; the prints' weights (foot, paw, hoof, bird). */
export interface BeachDecorKnobs { on: boolean; finds: number; trails: number; prints: number[]; clear: number; sectors: number; kinds: number[] }

/** One piece on the sand: an art id (a print's "<id>~<heading>"), where, mirrored or not, its size (a fading print smaller). */
export interface BeachItem { id: string; x: number; z: number; flip: boolean; scale: number; print: boolean }

const FINDS: [string, number][] = [["shell-cockle", 3], ["shell-scallop", 2], ["shell-whelk", 2], ["starfish", 1.2], ["starfish-violet", 0.6], ["conch", 0.5], ["seaweed", 2], ["pebbles", 1.5]];
const ROCKY: [string, number][] = [["rock", 2], ["rocks", 3], ["pebbles", 2], ["seaweed", 1], ["shell-whelk", 0.5]];
/** Each print: its art id, the stride between steps (m), the feet's spread either side of the line (m), whether a left foot mirrors. */
const PRINT_KINDS = [
  { id: "print-foot", stride: 0.75, spread: 0.13, mirror: false }, // (at a few pixels the left foot reads as the right: none mirrored, so each keeps its heading)
  { id: "print-paw", stride: 0.5, spread: 0.1, mirror: false },
  { id: "print-hoof", stride: 0.65, spread: 0.12, mirror: false },
  { id: "print-bird", stride: 0.22, spread: 0.05, mirror: false },
];

const pick = (list: [string, number][], u: number) => { const total = list.reduce((t, [, w]) => t + w, 0); let a = u * total; for (const [id, w] of list) { if ((a -= w) <= 0) return id; } return list[list.length - 1][0]; };

/** The beach's decorations by sector (made as asked for, then kept). Each loop of coast is cut into sectors about as long as the
 *  sea's coast's would be in K.sectors (so the same knob reads the same on any island). */
export class BeachDecor {
  private cache = new Map<number, BeachItem[]>();
  /** Each loop's count of sectors. */
  private counts: number[];
  constructor(private beach: Beach, private seed: number, private K: BeachDecorKnobs, private headings = 8) {
    const loops = beach.land.loops, longest = Math.max(1, ...loops.filter(L => L.sea).map(L => L.length)), len = longest / Math.max(1, K.sectors);
    this.counts = loops.map(L => Math.max(1, Math.round(L.length / len)));
  }

  /** Every sector's key, all round every loop of coast. */
  sectorKeys(): number[] { return this.counts.flatMap((n, loop) => Array.from({ length: n }, (_, k) => loop * 1e6 + k)); }

  /** The sector (x, z) lies by: its loop of coast and its place along it, as one key. */
  sectorOf(x: number, z: number): number { const s = this.beach.land.shore(x, z); return this.key(s.loop, s.s); }
  private key(loop: number, s: number): number { const n = this.counts[loop], L = this.beach.land.loops[loop]; return loop * 1e6 + ((Math.floor((s / L.length) * n) % n) + n) % n; }

  /** Everything within `r` metres of (x, z) (from the sectors round it; a trail reaches a few sectors on). */
  near(x: number, z: number, r: number, out: BeachItem[] = []): BeachItem[] {
    out.length = 0;
    if (!this.K.on || this.beach.intoSand(x, z) < -r) return out;
    const sh = this.beach.land.shore(x, z);
    if (sh.loop < 0) return out;
    const n = this.counts[sh.loop], L = this.beach.land.loops[sh.loop], arc = L.length / n, s = this.key(sh.loop, sh.s) - sh.loop * 1e6, reach = Math.min(Math.floor(n / 2), Math.ceil(r / Math.max(1, arc)) + 3);
    for (let k = -reach; k <= reach; k++) for (const it of this.sector(sh.loop * 1e6 + (((s + k) % n) + n) % n)) if (Math.abs(it.x - x) < r && Math.abs(it.z - z) < r) out.push(it);
    return out;
  }

  /** One sector's pieces: its finds, and any trail that starts in it. */
  sector(key: number): BeachItem[] {
    let list = this.cache.get(key);
    if (list) return list;
    list = [];
    const loop = Math.floor(key / 1e6), k = key - loop * 1e6, B = this.beach, K = this.K, r = rng(this.seed * 4513 + k * 97 + 11 + loop * 7919);
    const span = B.land.loops[loop].length / this.counts[loop], s0 = k * span;
    // Finds: about K.finds a sector, more on a rocky stretch (its rocks).
    const rocky = B.rockyAlong(loop, s0 + span / 2), n = Math.floor(K.finds * (1 + rocky * 2) + r());
    for (let i = 0; i < n; i++) {
      const s = s0 + r() * span, p = this.onSand(loop, s, r());
      if (!p) continue;
      const id = pick(rocky > 0.4 ? ROCKY : FINDS, r());
      list.push({ id, x: p.x, z: p.z, flip: r() < 0.5, scale: 0.85 + r() * 0.3, print: false });
    }
    // Now and then a trail of footprints, wandering along the sand and fading out.
    if (r() < K.trails) this.trail(list, loop, s0 + r() * span, r);
    this.cache.set(key, list);
    if (this.cache.size > 256) this.cache.delete(this.cache.keys().next().value!); // (only near her: the oldest let go)
    return list;
  }

  /** A point on the sand `s` metres round loop `loop`, `u` of the way across what's left of it (from the water's edge in to the
   *  woods' ragged edge, which is left clear), or null where there's no room. */
  private onSand(loop: number, s: number, u: number): { x: number; z: number } | null {
    const B = this.beach, c = B.land.along(loop, s), w = B.sandAlong(loop, s), room = w - this.K.clear - 1.5;
    if (room <= 0.5) return null;
    const d = 1.5 + u * room, x = c.x - c.nx * d, z = c.z - c.nz * d;
    return B.intoSand(x, z) >= this.K.clear && B.intoSea(x, z) <= -1.5 ? { x, z } : null; // (where the coast bends, the sand nearer elsewhere: none)
  }

  /** A trail from `s` metres round loop `loop`: a walker (a person, a paw, a hoof, a bird) heading along the coast one way,
   *  wandering, kept on the sand, its prints left and right of its line; the last third thinning and fading out. */
  private trail(list: BeachItem[], loop: number, s: number, r: () => number): void {
    const K = this.K, B = this.beach, kind = PRINT_KINDS[["print-foot", "print-paw", "print-hoof", "print-bird"].indexOf(pick(PRINT_KINDS.map((p, i) => [p.id, K.kinds[i]] as [string, number]), r()))];
    const start = this.onSand(loop, s, 0.2 + r() * 0.6);
    if (!start) return;
    const n = Math.round(K.prints[0] + r() * (K.prints[1] - K.prints[0])), dir = r() < 0.5 ? 1 : -1, c = B.land.along(loop, s);
    let x = start.x, z = start.z, turn = 0;
    // Along the coast (its tangent: the land on its left), a little in or out.
    let h = Math.atan2(c.nx, -c.nz) + (dir < 0 ? Math.PI : 0) + (r() - 0.5) * 0.6;
    for (let i = 0; i < n; i++) {
      // Wander: a slow drift of heading; back toward the middle of the sand if it strays to either edge.
      turn = turn * 0.85 + (r() - 0.5) * 0.12;
      const into = B.intoSand(x, z), sea = B.intoSea(x, z);
      if (into < K.clear + 2) h -= dir * 0.08; // (too near the woods: out toward the sea)
      else if (sea > -2.5) h += dir * 0.08; // (at the water: back up the sand)
      h += turn;
      x += Math.cos(h) * kind.stride; z += Math.sin(h) * kind.stride;
      if (B.intoSand(x, z) < K.clear || B.intoSea(x, z) > -0.5) break;
      const side = i % 2 ? 1 : -1, px = x - Math.sin(h) * kind.spread * side, pz = z + Math.cos(h) * kind.spread * side;
      // Fading out over its last third: some missing, the rest smaller.
      const fade = Math.max(0, (i - n * 0.66) / (n * 0.34));
      if (fade > 0 && hash2(i, Math.round(x * 10), 31) < fade * 0.8) continue;
      const head = ((Math.round((h / (Math.PI * 2)) * this.headings) % this.headings) + this.headings) % this.headings;
      list.push({ id: `${kind.id}~${head}`, x: px, z: pz, flip: kind.mirror && side < 0, scale: 1 - fade * 0.35, print: true });
    }
  }
}
