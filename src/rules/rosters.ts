// Rosters (Ed, 2026-10-10/11; docs/backlog/journey.md "Rosters", "One rule for every island"): every kind of legend tells of
// its own island, always the same one. Kind K, introduced in phase q (the kinds table, src/rules/kinds.ts), has its island in phase p = q + 1, on
// its bearing from home; the island's seed comes from where it lies (its bearing and phase ring), so its shape, size and roster
// all follow from islandOf(K) alone. Its roster (its mix of area types, a kind being an area type's species): K plentiful (about
// 1 area in 6), 1-3 kinds new to phase p from nearby on the chart, the rest by weight (nearby bearings strongly, opposite ones
// almost never, recently introduced kinds favoured), every other kind on at most 2 areas (Ed, 2026-10-28: "we should reduce the
// number of repeats. Of its own kind, we should have about 1 in 6 as we have now. Of other kinds, there should be no more than 2";
// it was about a third as many kinds as areas, each about three times), so about half as many kinds as areas. Each night's legends (1 in 5 areas)
// are dealt from the roster, favouring kinds whose islands aren't found yet, never K. Home: one area per kind she knows.
import { archipelago, rememberArchipelago, type Archipelago } from "./archipelago";
import { KINDS_TABLE, type KindInfo } from "./kinds";
export type { KindInfo };
import { AREAS } from "../../art/areas.js";
import { hash2, rng } from "./random";

export const KINDS: Record<string, KindInfo> = KINDS_TABLE;
/** Every kind, placeholders too (about 64: one island each). */
export const KIND_NAMES = Object.keys(KINDS);
/** A kind not designed yet (unknown-NN): its island has a seed, size and coast, shown as '?' on the chart, but it's never played,
 *  dealt or put on a playable island. */
export const isPlaceholder = (k: string): boolean => !!KINDS[k]?.placeholder;
/** The kinds that are designed: creatures, area types and legends. */
export const REAL_KINDS = KIND_NAMES.filter(k => !isPlaceholder(k));
/** Whether an island ("home" or a kind) can be played. */
export const playableIsland = (island: string): boolean => island === "home" || (!!KINDS[island] && !isPlaceholder(island));

/** An island: its legend kind ("home" for home), phase (0 home), bearing (degrees from north), size (areas the waves reach),
 *  seed (its shape and areas) and roster (each kind with how many areas it has, adding up to size). */
export interface Island { kind: string; phase: number; bearing: number; size: number; seed: number; roster: { kind: string; areas: number }[]; /** its patch on the chart (rules/archipelago.ts): how far it may reach from its home's middle (m) by angle */ patch?: Float32Array; /** and how far its own shape is turned there (radians) */ turn?: number }

/** Areas a phase's islands have (journey.md: 10 / 20 / 30 / 40 / 50). */
export const sizeOfPhase = (p: number) => 10 * Math.max(1, p);
/** Legends a night on an island of `size` areas: 1 in 5, at least one. */
export const legendsFor = (size: number) => Math.max(1, Math.round(size / 5));

/** The kinds she knows at the start (introduced at home), in the table's order. */
export const homeKinds = (): string[] => KIND_NAMES.filter(k => KINDS[k].phase === 0);

/** How far apart two bearings are, 0 to 180 degrees. */
const apart = (a: number, b: number) => { const d = Math.abs(((a - b) % 360 + 360) % 360); return d > 180 ? 360 - d : d; };

// The world seed (Ed, 2026-10-11): one a campaign, chosen when it starts (the sea chart's Start over; app/chartSave.ts). Within
// a campaign every island's shape is fixed (its coast, areas and roster, and where it lies on the chart): from the world seed and
// its kind. What's inside it (trees, scenery, creatures, the night's legends) changes each night, from the night's own seed (the
// run's: rules/map.ts generateMap). World 0 is the table's own world (bearings as the table gives them): the first campaign's.

/** An island's seed from where it lies (its bearing and its phase ring) in the world. */
export const islandSeed = (phase: number, bearing: number, world = 0) => Math.floor(hash2(Math.round(bearing * 10), phase, 7331 + world) * 2147483646) + 1;

/** Where kind K's island lies in the world: its table bearing, nudged up to 7 degrees either way by the world seed (world 0: as given). */
export function bearingOf(kind: string, world = 0): number {
  const b = KINDS[kind]?.bearing ?? 0;
  return world ? (((b + (hash2(KIND_NAMES.indexOf(kind), world, 7361) - 0.5) * 14) % 360) + 360) % 360 : b;
}

/** Kind K's island in the world: phase its kind's + 1, on its bearing; null for a kind not in the table. */
export function islandOf(kind: string, world = 0): Island | null {
  const info = KINDS[kind];
  if (!info) return null;
  const phase = info.phase + 1, size = sizeOfPhase(phase), bearing = bearingOf(kind, world), seed = islandSeed(phase, bearing, world);
  return { kind, phase, bearing, size, seed, roster: rosterOf(kind, phase, bearing, size, seed), patch: worldOf(world).islands.get(kind)?.patch, turn: worldOf(world).islands.get(kind)?.turn };
}

/** A world's archipelago made elsewhere (a worker's: app/mapPrep.ts), taken as worldOf's. */
export const rememberWorld = (a: Archipelago): void => rememberArchipelago(a, KIND_NAMES.length);

/** The world's archipelago (rules/archipelago.ts): every island's place on the chart and its patch. */
export const worldOf = (world = 0) => archipelago(world, KIND_NAMES.map(k => { const phase = KINDS[k].phase + 1, bearing = bearingOf(k, world); return { id: k, phase, bearing, seed: islandSeed(phase, bearing, world) }; }), islandSeed(0, 0, world));

/** The kinds with an area type (art/areas.js: an area's creature): only they can have areas (every designed kind has one today;
 *  a kind designed before its area would wait for it). */
export const AREA_KINDS: ReadonlySet<string> = new Set((AREAS as unknown as { creature: string }[]).map(a => a.creature));

/** The kinds she knows (Ed, 2026-10-10, journey.md "Home's size"): home's 10, then each kind whose island she's found (its legend's
 *  quest done in a night she then won: app/chartSave.ts found), in the order found; designed kinds with an area type only, none twice. */
export function knownKinds(found: readonly string[] = []): string[] {
  const known = homeKinds();
  for (const k of found) if (KINDS[k] && !isPlaceholder(k) && AREA_KINDS.has(k) && !known.includes(k)) known.push(k);
  return known;
}

/** Home's island (the Ent's) in the world: one area per kind she knows (knownKinds: 10 at first, growing as islands are found,
 *  about 64 at the end); its shape fixed for the campaign (its seed the world's, as an island in the middle), growing outward
 *  (rules/map.ts: its first areas keep their places and kinds, each new kind an area further out). */
export function homeIsland(world = 0, known: readonly string[] = homeKinds(), size = known.length): Island {
  // (at least `size` areas: past one each, the kinds again in turn, the old ?island=20 home)
  const counts = new Map<string, number>(), n = Math.max(size, known.length);
  for (let i = 0; i < n; i++) { const k = known[i % known.length]; counts.set(k, (counts.get(k) ?? 0) + 1); }
  return { kind: "home", phase: 0, bearing: 0, size: n, seed: islandSeed(0, 0, world), roster: [...counts].map(([kind, areas]) => ({ kind, areas })), patch: worldOf(world).islands.get("home")?.patch, turn: worldOf(world).islands.get("home")?.turn };
}

/** The most areas any kind but the island's own has on its roster (Ed, 2026-10-28). */
export const OTHERS_MAX = 2;
/** The island's own kind's areas: about 1 in 6, at least 2. */
export const ownAreas = (size: number) => Math.max(2, Math.round(size / 6));

/** Kind K's island's roster (the rule above), seeded. */
export function rosterOf(K: string, phase: number, bearing: number, size: number, seed: number): { kind: string; areas: number }[] {
  // (only designed kinds: a placeholder's island's roster is made of the designed kinds alone, never itself)
  const r = rng(seed ^ 0x5eed), eligible = REAL_KINDS.filter(k => KINDS[k].phase <= phase), real = !isPlaceholder(K);
  // (enough kinds that none but K is on more than OTHERS_MAX areas, if the eligible kinds run to it)
  const own = real ? ownAreas(size) : 0, want = Math.max(2, Math.min(eligible.length, (real ? 1 : 0) + Math.ceil((size - own) / OTHERS_MAX)));
  const chosen: string[] = real ? [K] : [];
  // 1-3 kinds new to this phase (more on bigger islands), the nearest on the chart first, a little seeded jitter
  const fresh = eligible.filter(k => k !== K && KINDS[k].phase === phase)
    .map(k => ({ k, d: apart(KINDS[k].bearing, bearing) + r() * 30 })).sort((a, b) => a.d - b.d).map(x => x.k);
  const nFresh = Math.min(fresh.length, want - chosen.length, Math.max(1, Math.min(3, Math.round(size / 15))));
  chosen.push(...fresh.slice(0, nFresh));
  // the rest by weight: near bearings strongly, opposite ones almost never; recently introduced kinds favoured
  const weight = (k: string) => {
    const near = Math.cos((apart(KINDS[k].bearing, bearing) * Math.PI) / 180) * 0.5 + 0.5; // 1 alongside, 0 opposite
    const recent = phase - KINDS[k].phase <= 1 ? 1.75 : 1; // (introduced the phase before)
    return (0.02 + near * near) * recent;
  };
  const rest = eligible.filter(k => !chosen.includes(k) && KINDS[k].phase < phase); // (the kinds new to it are only the 1-3 above)
  while (chosen.length < want && rest.length) {
    const ws = rest.map(weight), total = ws.reduce((a, b) => a + b, 0);
    let x = r() * total, i = 0;
    while (i < rest.length - 1 && (x -= ws[i]) > 0) i++;
    chosen.push(rest.splice(i, 1)[0]);
  }
  // K plentiful (about 1 area in 6, at least 2), the other areas shared as evenly as they go (1 or 2 each), the extras by the seed
  if (!real) return shareOut(chosen, size, seed);
  const mine = Math.min(size - (chosen.length - 1), own), left = size - mine, others = chosen.slice(1), base = Math.floor(left / others.length);
  const extra = left - base * others.length, order = others.map((k, i) => ({ k, h: hash2(i, seed, 7349) })).sort((a, b) => a.h - b.h).map(x => x.k);
  return [{ kind: K, areas: mine }, ...others.map(k => ({ kind: k, areas: base + (order.indexOf(k) < extra ? 1 : 0) }))];
}

/** `size` areas shared among `kinds` as evenly as they go, the extras by the seed. */
function shareOut(kinds: string[], size: number, seed: number): { kind: string; areas: number }[] {
  const base = Math.floor(size / kinds.length), extra = size - base * kinds.length;
  const order = kinds.map((k, i) => ({ k, h: hash2(i, seed, 7349) })).sort((a, b) => a.h - b.h).map(x => x.k);
  return kinds.map(k => ({ kind: k, areas: base + (order.indexOf(k) < extra ? 1 : 0) }));
}

/** The night's legends on an island: legendsFor(size) kinds dealt from its roster, never its own kind, no two alike; kinds whose
 *  islands aren't `found` yet first (a found one only to make up the number); `prefer` (kinds she can quest for early: the
 *  route's first areas) has one dealt where it can. Seeded by the night. */
export function dealLegends(island: Island, night: number, found: ReadonlySet<string> = new Set(), prefer: readonly string[] = []): string[] {
  const pool = island.roster.map(x => x.kind).filter(k => k !== island.kind && !isPlaceholder(k));
  const n = Math.min(pool.length, legendsFor(island.size));
  const keyed = pool.map((k, i) => ({ k, h: hash2(i, night, 7351 + island.seed % 1000) + (found.has(k) ? 1 : 0) })).sort((a, b) => a.h - b.h).map(x => x.k);
  const dealt = keyed.slice(0, n);
  const early = keyed.filter(k => prefer.includes(k));
  if (n && early.length && !dealt.some(k => prefer.includes(k))) dealt[n - 1] = early[0];
  return dealt;
}

/** What rules/islandShape.ts islandCoast needs to draw an island's outline as the map makes it (the sea chart, the dreams): its
 *  kind, its kind's phase, its own seed (the world's: islandOf(kind, world), homeIsland(world)) and its areas. With tuning.islands.coast for a kind's
 *  island (the map's own for home). */
export const coastSpec = (island: Island): { kind: string; phase: number; seed: number; areas: number } =>
  ({ kind: island.kind, phase: Math.max(0, island.phase - 1), seed: island.seed, areas: island.size });
