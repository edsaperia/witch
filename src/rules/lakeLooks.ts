// What each lake looks like (Ed, 2026-10-12, docs/backlog/journey.md "Lakes by biome"; in play since 2026-10-23: "We should make
// the biome lakes in game"): its island's biomes by where it lies on the sea chart, each lake one of the two its bearing lies
// between, by their odds, seeded by the lake. One source for the sea chart (app/chartOutlines.worker.ts) and the game
// (render/lakeLooks.ts), so a lake in play is the one the chart drew. Looks only: every lake plays as water (rules/lakes.ts).
import type { LandMap } from "./land";
import { lakeKnobs, type LakeKnobs } from "./lakes";
import { bearingOf, islandOf, KINDS, worldOf } from "./rosters";

/** What a biome's lakes become (Ed, 2026-10-12: "In the cold biomes lakes become frozen. In the volcano biome lakes become lava.
 *  In the desert biome lakes become oases. In the jungle biome, lakes become sinkholes."): ice (in play a glacier: Ed,
 *  2026-10-23, "a craggy glacier with ice peaks"), lava, an oasis, a sinkhole, else water: north cold, east volcanic (rocky
 *  before), south hot, west jungle. The diagonals have their own: a glacial tarn in the mountains and glaciers (NE), a tar pit in
 *  the cold rainforest (NW; a hot spring till Ed, 2026-10-13: it looked like somewhere you could walk), a rust pool in the
 *  badlands (SE; a hot spring's colours: Ed, 2026-10-23), a lily pond in the mangrove swamp (SW). Temperate keeps water. */
export type LakeLook = "water" | "ice" | "lava" | "oasis" | "sinkhole" | "tarn" | "tar" | "rust" | "lily";
/** The looks by number, as the shaders know them (the chart's LAKE_FRAG uLook, the ground's lake looks). */
export const LOOK_IDS: readonly LakeLook[] = ["water", "ice", "lava", "oasis", "sinkhole", "tarn", "tar", "rust", "lily"];
export const LAKE_LOOKS: Record<string, LakeLook> = { cold: "ice", volcanic: "lava", hot: "oasis", jungle: "sinkhole", "mountains and glaciers": "tarn", "cold rainforest": "tar", badlands: "rust", "mangrove swamp": "lily" };

/** The compass's biomes, N first and on clockwise every 45° (the kinds table's by direction; east volcanic, rocky before: Ed,
 *  2026-10-23, "Can we call 'rocky' 'volcanic'?"). An island's biome blends the two its bearing lies between, by how near it is
 *  to each (Ed, 2026-10-12: "These blend smoothly; ones on the border might have both"). */
export const COMPASS = ["cold", "mountains and glaciers", "volcanic", "badlands", "hot", "mangrove swamp", "jungle", "cold rainforest"];
export interface Blend { a: string; b: string; /** a's share, 0.5 to 1 */ w: number }
export function blendAt(bearing: number): Blend {
  const d = (((bearing % 360) + 360) % 360) / 45, i = Math.floor(d) % 8, t = d - Math.floor(d);
  return t <= 0.5 ? { a: COMPASS[i], b: COMPASS[(i + 1) % 8], w: 1 - t } : { a: COMPASS[(i + 1) % 8], b: COMPASS[i], w: t };
}

/** An island's biomes: its land's blend, its lakes' (null: plain water) and the share of its lakes that take them. */
export interface IslandBiome { blend: Blend; lakeBlend: Blend | null; lakeShare: number }
const TEMPERATE: Blend = { a: "temperate", b: "temperate", w: 1 };

/** Where an island lies on the sea chart, as a compass bearing from home (degrees): the archipelago's place, else its kind's. */
export function islandBearing(id: string, world: number): number {
  const at = worldOf(world).islands.get(id);
  return at ? (Math.atan2(at.x, -at.y) * 180) / Math.PI : bearingOf(id, world);
}

/** Island `id`'s biomes (phase its island's): temperate as it stands; else a blend by its bearing (the volcanic too, since it
 *  became the east compass point: Ed, 2026-10-23); its lakes by its bearing's biomes from the tuning's lakes.biomeFrom
 *  phase on (Ed, 2026-10-12: "biome lakes can start appearing one phase earlier"), half of them in that first phase, all further
 *  out (Ed: "half the lakes in the third ring are special. Further out they're all special, further in they're all plain"). */
export function islandBiome(id: string, world: number, phase: number, knobs: Pick<LakeKnobs, "biomeFrom" | "biomeFirstShare">): IslandBiome {
  if (id === "home") return { blend: TEMPERATE, lakeBlend: null, lakeShare: 0 };
  const bearing = islandBearing(id, world), blend = islandBlend(id, world);
  const lakeBlend = phase >= knobs.biomeFrom ? blendAt(bearing) : null;
  return { blend, lakeBlend, lakeShare: !lakeBlend ? 0 : phase === knobs.biomeFrom ? knobs.biomeFirstShare : 1 };
}

/** Island `id`'s land's biomes: temperate (home, and a temperate kind's island) as it stands; else the two its bearing lies
 *  between (blendAt). */
export function islandBlend(id: string, world: number): Blend {
  const biome = id === "home" ? "temperate" : KINDS[id]?.biome ?? "temperate";
  return biome === "temperate" ? TEMPERATE : blendAt(islandBearing(id, world));
}
/** How strongly an island's forests take its biome's look, by its ring (Ed, 2026-10-25: "Lower phase non-home biome areas can be
 *  semi-temperate looking; higher phase biomes are more extreme; so there's a smoother transition between phases"): the tuning's
 *  biomeLooks.strength, its first for phase `from`, the next for the ring after and so on, the last for any further out; 1 nearer
 *  in (those are temperate) or without the knob. */
export function biomeStrength(phase: number, T?: BiomeLooks): number {
  if (!T || !T.strength.length || phase < T.from) return 1;
  return Math.max(0, Math.min(1, T.strength[Math.min(T.strength.length - 1, phase - T.from)]));
}
/** The tuning's biomeLooks (rules/tuning.ts). */
export interface BiomeLooks { from: number; strength: number[] }

/** The key of island `id`'s biome blend, for its forests' look (art/flora/biomes.js biomeLook; the area art's jobs and their cache,
 *  render/artBuild.ts): "a|b|w", its share to two places, then "|s" at a strength under full (its ring's, biomeStrength: so a
 *  ring's art is kept apart from another's); undefined on a temperate island (its art as it always was). */
export function biomeKey(id: string, world: number, T?: BiomeLooks): string | undefined {
  const B = islandBlend(id, world);
  if (B.a === "temperate" && B.b === "temperate") return undefined;
  const s = biomeStrength(islandOf(id, world)?.phase ?? 0, T);
  if (s >= 1) return B.a === B.b ? B.a : `${B.a}|${B.b}|${B.w.toFixed(2)}`;
  return `${B.a}|${B.b}|${B.w.toFixed(2)}|${s.toFixed(2)}`;
}

/** A seeded number in 0..1 from two integers. */
export const rand = (a: number, b: number) => { let x = Math.imul(a ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul(b + 0x632be5ab, 0xc2b2ae35); x ^= x >>> 15; x = Math.imul(x, 0x2c1b3c6d); x ^= x >>> 12; return (x >>> 0) / 4294967296; };

/** The look of the lake whose shore is loop `k` of its island's lakes' map (the loop nearest its middle), on the island's seed. */
export function lookOfLoop(k: number, seed: number, b: IslandBiome): LakeLook {
  const LB = b.lakeBlend;
  if (!LB || rand(seed, k * 7919 + 29) >= b.lakeShare) return "water";
  return LAKE_LOOKS[rand(seed, k * 7919 + 13) < LB.w ? LB.a : LB.b] ?? "water";
}

/** The middles of a lakes' map's shore loops (m). */
export function loopMiddles(L: LandMap): { x: number; z: number }[] {
  return L.loops.map(l => { let sx = 0, sz = 0; const m = l.pts.length / 2; for (let k = 0; k < m; k++) { sx += l.pts[k * 2]; sz += l.pts[k * 2 + 1]; } return { x: sx / m, z: sz / m }; });
}
/** The loop whose middle is nearest (x, z). */
export function nearestLoop(mids: { x: number; z: number }[], x: number, z: number): number {
  let best = 0, bd = Infinity;
  mids.forEach((p, k) => { const d = Math.hypot(p.x - x, p.z - z); if (d < bd) { bd = d; best = k; } });
  return best;
}

/** Every lake on a map's lakes' grid and its look: `lake` each sample's lake (-1 ashore), `looks` each lake's. A lake is the
 *  water joined across the grid; its look its shore loop's nearest its middle (as the chart finds it on its own grid). */
export function lakesOf(L: LandMap, seed: number, b: IslandBiome): { lake: Int32Array; looks: LakeLook[] } {
  const n = L.cols * L.rows, lake = new Int32Array(n).fill(-1), looks: LakeLook[] = [], mids = loopMiddles(L), stack: number[] = [];
  for (let i0 = 0; i0 < n; i0++) {
    if (L.dist[i0] <= 0 || lake[i0] >= 0) continue;
    const id = looks.length; let sx = 0, sz = 0, count = 0;
    lake[i0] = id; stack.push(i0);
    while (stack.length) {
      const i = stack.pop()!, r = (i / L.cols) | 0, c = i - r * L.cols;
      sx += L.x0 + c * L.step; sz += L.z0 + r * L.step; count++;
      for (const j of [c > 0 ? i - 1 : -1, c < L.cols - 1 ? i + 1 : -1, i - L.cols, i + L.cols]) if (j >= 0 && j < n && L.dist[j] > 0 && lake[j] < 0) { lake[j] = id; stack.push(j); }
    }
    looks.push(lookOfLoop(nearestLoop(mids, sx / count, sz / count), seed, b));
  }
  return { lake, looks };
}

/** A map's island's biomes (map.island, the tuning's map.world), or plain water's with no island. */
export function mapBiome(island: { kind: string; phase: number } | null, tuning: { map?: { world?: number }; lakes?: Partial<LakeKnobs> }): IslandBiome {
  return island ? islandBiome(island.kind, tuning.map?.world ?? 0, island.phase, lakeKnobs(tuning)) : { blend: TEMPERATE, lakeBlend: null, lakeShare: 0 };
}

/** An undiscovered island's lake in the zoo (Ed, 2026-10-26: "Islands that are not discovered yet appear as that biome's lake"):
 *  its biome's lake look, by its bearing on the chart (the first of the two biomes it lies between), water where the biome has none. */
export const zooLakeLook = (kind: string, world: number): LakeLook => LAKE_LOOKS[blendAt(islandBearing(kind, world)).a] ?? "water";
