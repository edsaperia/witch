// The great stumps (Ed, 2026-10-29; runeMarkers.stump): which stump each area has (its spec, dealt here so the rules and the view
// agree; render/markers.ts draws them) and the shape of its cut, where she casts the soundsystem spell (Ed, 2026-10-29: "The area in
// which I can cast the soundsystem spell should be the whole trunk. (cut part, not the roots)"): the stump's own model's outline under
// its saw cut (art/props/stumps.js stumpCut), built from its spec, not drawn. No drawing here.
import { stumpCut, stumpForArea, CUT_ANGLES } from "../../art/props/stumps.js";
import { AREA_BY_ID } from "../../art/areas.js";
import { AREA_TYPES, type ForestMap } from "./map";
import { biomeKey } from "./lakeLooks";
import { hash2 } from "./random";
import type { Tuning } from "./tuning";

/** An area's great stump: its form (art/props/stumps.js STUMP_GENOMES key), seed and the angle it's seen from (radians), the area type
 *  it's fitted to (its id: its main tree's bark, its ground), the biome (art/flora/biomes.js key) and how irregular it's grown
 *  (runeMarkers.stump.irregular). */
export interface StumpSpec { species: string; seed: number; yaw: number; area?: string; biome?: string; irregular?: number }

/** An island's own art seed (render/artCache.ts uses it for the island's trees; here, its stumps'). */
export function islandArtSeed(world: number, island: string): number {
  let h = 2166136261;
  for (const c of `art|${world}|${island}`) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return (h >>> 0) % 1000000;
}

/** The great stumps dealt (Ed, 2026-10-29: "we could make them all treestumps"): every area's centrepiece a giant tree's stump, each
 *  area type's its own (Ed: "a different stump per area type ... they just have to fit in with the area's look"): its main tree's form
 *  and bark in the island's biome, its ground's moss and earth (art/props/stumps.js stumpForArea), `variants` of each type dealt round
 *  its areas, each seen from its own angle and mirrored at random. */
export interface StumpDeal { specs: Map<string, StumpSpec>; flip: Map<string, boolean> }
export function stumpDeal(t: Tuning, map: ForestMap): StumpDeal {
  const S = t.runeMarkers.stump!, island = t.map?.island ?? "home", world = t.map?.world ?? 0, base = islandArtSeed(world, island);
  const biome = biomeKey(island, world, t.biomeLooks), n = Math.max(1, Math.round(S.variants)), irregular = S.irregular ?? 0;
  const specs = new Map<string, StumpSpec>(), flip = new Map<string, boolean>(), seen = new Map<number, number>();
  const AREA = AREA_BY_ID as Record<string, unknown>;
  const order = [...map.cells].sort((a, b) => hash2(a[0], a[1], base) - hash2(b[0], b[1], base));
  for (const [cx, cy] of order) {
    const type = map.typeOf(cx, cy), area = AREA_TYPES[type].id, k = seen.get(type) ?? 0; seen.set(type, k + 1);
    const v = k % n, seed = base * 7 + type * 131 + v * 101;
    specs.set(`${cx},${cy}`, { species: stumpForArea(AREA[area], biome) as string, seed, yaw: hash2(type, v, base + 77) * Math.PI * 2, area, ...(biome ? { biome } : {}), ...(irregular ? { irregular } : {}) });
    flip.set(`${cx},${cy}`, hash2(cx, cy, base + 3) < 0.5);
  }
  return { specs, flip };
}

/** Each map's deal and its stumps' cuts, made as they're wanted (a cut is a few milliseconds' work: only for the stumps she comes near). */
const MADE = new WeakMap<ForestMap, { key: string; deal: StumpDeal; cuts: Map<string, number[] | null> }>();
function madeFor(t: Tuning, map: ForestMap) {
  const S = t.runeMarkers.stump!, key = `${t.map?.island ?? "home"}|${t.map?.world ?? 0}|${S.variants}|${S.irregular ?? 0}|${JSON.stringify(t.biomeLooks ?? null)}`;
  let m = MADE.get(map);
  if (!m || m.key !== key) MADE.set(map, (m = { key, deal: stumpDeal(t, map), cuts: new Map() }));
  return m;
}
/** A map's stump deal (made once a map and tuning). */
export const stumpDealOf = (t: Tuning, map: ForestMap): StumpDeal => madeFor(t, map).deal;

/** An area's stump's cut on the ground: its radius (m) round the stump's middle (the area's soundsystem spot) at CUT_ANGLES even angles
 *  from east towards the south (+z), as the view lays it (its yaw and mirroring); null with the stumps off or none dealt. */
export function stumpCutOf(t: Tuning, map: ForestMap, cell: readonly [number, number]): number[] | null {
  if (!t.runeMarkers?.stump?.on) return null;
  const m = madeFor(t, map), k = `${cell[0]},${cell[1]}`;
  if (m.cuts.has(k)) return m.cuts.get(k)!;
  const s = m.deal.specs.get(k), cut = s ? (stumpCut(s.species, { seed: s.seed, yaw: s.yaw, irregular: s.irregular ?? 0 }, m.deal.flip.get(k) ?? false) as number[]) : null;
  m.cuts.set(k, cut);
  return cut;
}

/** The cut's radius (m) towards (dx, dz) from its middle: between its two nearest measured angles. */
export function cutRadius(cut: readonly number[], dx: number, dz: number): number {
  const N = cut.length, u = (((Math.atan2(dz, dx) / (Math.PI * 2)) * N) % N + N) % N, i = Math.floor(u), q = u - i;
  return cut[i] * (1 - q) + cut[(i + 1) % N] * q;
}

/** How far (m) a point (dx, dz from the stump's middle) lies outside the cut: 0 or less on it. */
export const pastCut = (cut: readonly number[], dx: number, dz: number): number => Math.hypot(dx, dz) - cutRadius(cut, dx, dz);

/** The widest any stump's cut can reach (m): a bound for skipping the far ones before building their cuts. */
export const CUT_BOUND = 12;
export { CUT_ANGLES };
