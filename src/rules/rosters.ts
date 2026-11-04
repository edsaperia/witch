// Rosters (Ed, 2026-10-10/11; docs/backlog/journey.md "Rosters", "One rule for every island"): every kind of legend tells of
// its own island, always the same one. Kind K, introduced in phase q (the kinds table, src/rules/kinds.ts), has its island in phase p = q + 1, on
// its bearing from home; the island's seed comes from where it lies (its bearing and phase ring), so its shape, size and roster
// all follow from islandOf(K) alone. Its roster (its mix of area types, a kind being an area type's species): K plentiful (about
// 1 area in 6), 1-3 kinds new to phase p from nearby on the chart, the rest by weight (nearby bearings strongly, opposite ones
// almost never, recently introduced kinds favoured), every other kind on at most 2 areas (Ed, 2026-10-28: "we should reduce the
// number of repeats. Of its own kind, we should have about 1 in 6 as we have now. Of other kinds, there should be no more than 2";
// it was about a third as many kinds as areas, each about three times), and on one area while the island's compass neighbourhood has kinds left (Ed, 2026-11-04: rosterOf). Each night's legends (1 in 5 areas)
// are dealt from the roster, favouring kinds whose islands aren't found yet, never K. Home (Ed, 2026-11-04): one area per island
// she's found, at least 5 (homeRoster); its legends as any island's, an unfound phase-1 island's among them while there is one
// (dealLegends); no challenge and no find till every island is found.
// Where each type lies is the night's (Ed, 2026-10-28, rules/deal.ts): the island's shapes are its world's, and each night its types are
// dealt onto them along that night's route, K first, no kind twice in a row.
import { archipelago, rememberArchipelago, type Archipelago } from "./archipelago";
import { KINDS_TABLE, type KindInfo } from "./kinds";
export type { KindInfo };
import { AREAS } from "../../art/areas.js";
import { hash2, rng } from "./random";
import { TUNING } from "./tuning";

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

/** Areas a phase's islands have (Ed, 2026-11-04: "We could make waves 5 / 10 / 15 / 20 / 25 / 30 / 64", "yes, start island sizes"):
 *  the tuning's islands.phaseSizes, phase 1 first (10 / 15 / 20 / 25 / 30; 10 / 20 / 30 / 40 / 50 till then), the last for any
 *  phase past it. */
export const PHASE_SIZES: readonly number[] = TUNING.islands?.phaseSizes ?? [10, 15, 20, 25, 30];
export const sizeOfPhase = (p: number, sizes: readonly number[] = PHASE_SIZES) => Math.max(1, Math.round(sizes[Math.min(sizes.length, Math.max(1, p)) - 1] ?? 10));
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

/** Kind K's island in the world: phase its kind's + 1, on its bearing; null for a kind not in the table. (`sizes` a phase's areas:
 *  the map's tuning's, where a decision's slider moved them; the chart foresees the built ones. Its roster's compass neighbourhood
 *  the tuning's: a night's map passes its own, rules/map.ts.) */
export function islandOf(kind: string, world = 0, sizes: readonly number[] = PHASE_SIZES, neighbourhood = ROSTER_NEIGHBOURHOOD): Island | null {
  const info = KINDS[kind];
  if (!info) return null;
  const phase = info.phase + 1, size = sizeOfPhase(phase, sizes), bearing = bearingOf(kind, world), seed = islandSeed(phase, bearing, world);
  return { kind, phase, bearing, size, seed, roster: rosterOf(kind, phase, bearing, size, seed, neighbourhood), patch: worldOf(world).islands.get(kind)?.patch, turn: worldOf(world).islands.get(kind)?.turn };
}

/** A world's archipelago made elsewhere (a worker's: app/mapPrep.ts), taken as worldOf's. */
export const rememberWorld = (a: Archipelago): void => rememberArchipelago(a, KIND_NAMES.length);

/** The world's archipelago (rules/archipelago.ts): every island's place on the chart and its patch. */
export const worldOf = (world = 0) => archipelago(world, KIND_NAMES.map(k => { const phase = KINDS[k].phase + 1, bearing = bearingOf(k, world); return { id: k, phase, bearing, seed: islandSeed(phase, bearing, world) }; }), islandSeed(0, 0, world));

/** The kinds with an area type (art/areas.js: an area's creature): only they can have areas (every designed kind has one today;
 *  a kind designed before its area would wait for it). */
export const AREA_KINDS: ReadonlySet<string> = new Set((AREAS as unknown as { creature: string }[]).map(a => a.creature));

/** The kinds she knows: home's 10, then each kind whose island she's found (its legend's quest done in a night she then won:
 *  app/chartSave.ts found), in the order found; designed kinds with an area type only, none twice. The zoo's (rules/zooMap.ts); home
 *  itself was one area each of these till Ed's 2026-11-04 home (homeRoster, below). */
export function knownKinds(found: readonly string[] = []): string[] {
  const known = homeKinds();
  for (const k of found) if (KINDS[k] && !isPlaceholder(k) && AREA_KINDS.has(k) && !known.includes(k)) known.push(k);
  return known;
}

// Home (Ed, 2026-11-04: "home has 5 areas chosen at random from the phase 1 creatures, and grows as you unlock islands, and has no
// challenge area. When you unlock every island, home gets a challenge area and you get a special reward for completing it."; his
// answers: the phase 1 creatures are home's 10 starting kinds, whose islands are the phase-1 islands; random each night, "always to
// somewhere new if possible"; "no find at home until endgame"; the special reward "we'll figure this out later"; every island is
// all on the chart). Home's areas tonight: one per kind whose island she's found (any kind, home's too), then, while that's under 5
// (tuning home.start), home's starting kinds whose islands she hasn't found, chosen at random each night (seeded by the night). Its
// legends (Ed, 2026-11-04: "Home legends: Same as other islands, which I think is 1 in 5? But including undiscovered islands of
// phase 1 if possible"): legendsFor(size), unfound islands first, and while any phase-1 island is unfound one of them an unfound
// phase-1 island's; so while there's one, at least one such kind is among tonight's areas, one more area past the found ones where
// it must.

/** Home's least size (Ed, 2026-11-04: "home has 5 areas"): tuning home.start. */
export const HOME_START = 5;

/** The kinds whose islands she's found (app/chartSave.ts found), in the order found: designed kinds with an area type only, none twice. */
export function foundKinds(found: readonly string[] = []): string[] {
  const out: string[] = [];
  for (const k of found) if (KINDS[k] && !isPlaceholder(k) && AREA_KINDS.has(k) && !out.includes(k)) out.push(k);
  return out;
}

/** Whether she's found every island on the chart (Ed, 2026-11-04: "When you unlock every island, home gets a challenge area"):
 *  every designed kind's with an area type (64; a placeholder's island is never played). */
export function allIslandsFound(found: readonly string[] = []): boolean {
  const f = new Set(foundKinds(found));
  return REAL_KINDS.every(k => !AREA_KINDS.has(k) || f.has(k));
}

/** Whether home has its endgame tonight, its challenge area and find (Ed, 2026-11-04: "no find at home until endgame"): once she's
 *  found every island on the chart (allIslandsFound), or `at` of them (tuning home.challengeAt: 64, every one; lower to bring it on
 *  early, to play it). */
export const homeEndgame = (found: readonly string[] = [], at?: number): boolean =>
  allIslandsFound(found) || (at != null && foundKinds(found).length >= at);

/** Home's kinds tonight (see above): the found ones in the order found, then home's starting kinds whose islands are unfound, in
 *  the night's seeded order, up to `start` (and one at least while any is left). The same count every night for one `found`. */
export function homeRoster(found: readonly string[] = [], night = 0, start = HOME_START): string[] {
  const mine = foundKinds(found);
  const spare = homeKinds().filter(k => AREA_KINDS.has(k) && !mine.includes(k))
    .map((k, i) => ({ k, h: hash2(i, night, 7369) })).sort((a, b) => a.h - b.h).map(x => x.k);
  return [...mine, ...spare.slice(0, Math.max(start - mine.length, spare.length ? 1 : 0))];
}

/** How many areas home has for a campaign that's found `found` (homeRoster's count, any night). */
export const homeSize = (found: readonly string[] = [], start = HOME_START): number => homeRoster(found, 0, start).length;

/** How far home's crowds have grown (Ed, 2026-11-04: home "reaching full packs only when all islands are found"): the share of the
 *  islands on the chart (the designed kinds with an area type, 64) whose island she's found (foundKinds; home's starting kinds'
 *  phase-1 islands among them, as home's areas count them: homeRoster), 0 to 1. */
export function foundShare(found: readonly string[] = []): number {
  const all = REAL_KINDS.filter(k => AREA_KINDS.has(k)).length;
  return all > 0 ? Math.min(1, Math.max(0, foundKinds(found).length / all)) : 1;
}

/** Home's island (the Ent's) in the world: one area each of `kinds` (homeRoster: 5 at first, growing as islands are found, 64 at
 *  the end); its shape fixed for the campaign (its seed the world's, as an island in the middle), growing outward (rules/map.ts:
 *  its first areas keep their places, each new one an area further out; which kind is where is the night's deal, rules/deal.ts). */
export function homeIsland(world = 0, kinds: readonly string[] = homeRoster(), size = kinds.length): Island {
  // (at least `size` areas: past one each, the kinds again in turn, the old ?island=20 home)
  const counts = new Map<string, number>(), n = Math.max(size, kinds.length);
  for (let i = 0; i < n; i++) { const k = kinds[i % kinds.length]; counts.set(k, (counts.get(k) ?? 0) + 1); }
  return { kind: "home", phase: 0, bearing: 0, size: n, seed: islandSeed(0, 0, world), roster: [...counts].map(([kind, areas]) => ({ kind, areas })), patch: worldOf(world).islands.get("home")?.patch, turn: worldOf(world).islands.get("home")?.turn };
}

/** Home's island as the sea chart draws it for a campaign that's found `found` (its shape: its size, any night's kinds). */
export const homeShape = (world = 0, found: readonly string[] = [], start = HOME_START): Island => homeIsland(world, homeRoster(found, 0, start));

/** The most areas any kind but the island's own has on its roster (Ed, 2026-10-28), and only once its compass neighbourhood has run
 *  out of kinds (Ed, 2026-11-04: rosterOf). */
export const OTHERS_MAX = 2;
/** The island's own kind's areas: about 1 in 6, at least 2. */
export const ownAreas = (size: number) => Math.max(2, Math.round(size / 6));
/** An island's compass neighbourhood (Ed, 2026-11-04, rosterOf): the kinds whose islands lie within this many degrees either side of
 *  its bearing (the tuning's map.rosterNeighbourhood). */
export const ROSTER_NEIGHBOURHOOD: number = TUNING.map?.rosterNeighbourhood ?? 90;

/** Kind K's island's roster (the rule above), seeded. Its other kinds (Ed, 2026-11-04: "Now that islands have fewer areas, we can
 *  have fewer (none?) repeats of creature types on an island, besides the island of the creature type itself"; he chose the middle
 *  way): one area each while its compass neighbourhood (kinds within `neighbourhood` degrees of its bearing) has kinds left; only
 *  when it runs out, second areas to those kinds (OTHERS_MAX), and only past that, kinds from further round the compass. */
export function rosterOf(K: string, phase: number, bearing: number, size: number, seed: number, neighbourhood = ROSTER_NEIGHBOURHOOD): { kind: string; areas: number }[] {
  // (only designed kinds: a placeholder's island's roster is made of the designed kinds alone, never itself)
  const r = rng(seed ^ 0x5eed), eligible = REAL_KINDS.filter(k => KINDS[k].phase <= phase), real = !isPlaceholder(K);
  const own = real ? ownAreas(size) : 0, left = size - (real ? Math.min(size - 1, own) : 0);
  const chosen: string[] = real ? [K] : [];
  // 1-3 kinds new to this phase (more on bigger islands), the nearest on the chart first, a little seeded jitter
  const fresh = eligible.filter(k => k !== K && KINDS[k].phase === phase)
    .map(k => ({ k, d: apart(KINDS[k].bearing, bearing) + r() * 30 })).sort((a, b) => a.d - b.d).map(x => x.k);
  const nFresh = Math.min(fresh.length, Math.max(1, left), Math.max(1, Math.min(3, Math.round(size / 15))));
  chosen.push(...fresh.slice(0, nFresh));
  // the rest by weight: near bearings strongly, opposite ones almost never; recently introduced kinds favoured
  const weight = (k: string) => {
    const near = Math.cos((apart(KINDS[k].bearing, bearing) * Math.PI) / 180) * 0.5 + 0.5; // 1 alongside, 0 opposite
    const recent = phase - KINDS[k].phase <= 1 ? 1.75 : 1; // (introduced the phase before)
    return (0.02 + near * near) * recent;
  };
  const draw = (from: string[], upTo: number) => {
    while (chosen.length < upTo && from.length) {
      const ws = from.map(weight), total = ws.reduce((a, b) => a + b, 0);
      let x = r() * total, i = 0;
      while (i < from.length - 1 && (x -= ws[i]) > 0) i++;
      chosen.push(from.splice(i, 1)[0]);
    }
  };
  const rest = eligible.filter(k => !chosen.includes(k) && KINDS[k].phase < phase); // (the kinds new to it are only the 1-3 above)
  const inHood = (k: string) => neighbourhood > 0 && apart(KINDS[k].bearing, bearing) <= neighbourhood; // (0: no neighbourhood)
  const near = rest.filter(inHood), far = rest.filter(k => !inHood(k));
  const mine = real ? 1 : 0;
  // a kind an area while the neighbourhood lasts; then its kinds take second areas, and only if even that is short, the far ones
  draw(near, mine + left);
  draw(far, Math.min(eligible.length, mine + Math.ceil(left / OTHERS_MAX)));
  // K plentiful (about 1 area in 6, at least 2), the others' areas shared as evenly as they go (1 or 2 each), the extras (the
  // second areas) the neighbourhood's first, by the seed (neighbourhood 0: none near, every island as the rule of 2026-10-28)
  const others = chosen.slice(mine), base = Math.floor(left / others.length), extra = left - base * others.length;
  const key = (k: string, i: number) => hash2(i, seed, 7349) + (inHood(k) ? 0 : 1);
  const order = others.map((k, i) => ({ k, h: key(k, i) })).sort((a, b) => a.h - b.h).map(x => x.k);
  const share = others.map(k => ({ kind: k, areas: base + (order.indexOf(k) < extra ? 1 : 0) }));
  return real ? [{ kind: K, areas: size - left }, ...share] : share;
}

/** The night's legends on an island: legendsFor(size) kinds dealt from its roster, never its own kind, no two alike; kinds whose
 *  islands aren't `found` yet first (a found one only to make up the number); `prefer` (kinds she can quest for early: the
 *  route's first areas) has one dealt where it can. At home, while any phase-1 island is unfound and its kind is on the roster,
 *  one of them is an unfound phase-1 kind (Ed, 2026-11-04: "including undiscovered islands of phase 1 if possible"), an early one
 *  where there is one; with one legend, it wins over `prefer`. Seeded by the night. */
export function dealLegends(island: Island, night: number, found: ReadonlySet<string> = new Set(), prefer: readonly string[] = []): string[] {
  const pool = [...new Set(island.roster.map(x => x.kind))].filter(k => k !== island.kind && !isPlaceholder(k));
  const n = Math.min(pool.length, legendsFor(island.size));
  const keyed = pool.map((k, i) => ({ k, h: hash2(i, night, 7351 + island.seed % 1000) + (found.has(k) ? 1 : 0) })).sort((a, b) => a.h - b.h).map(x => x.k);
  const dealt = keyed.slice(0, n);
  const early = keyed.filter(k => prefer.includes(k));
  if (n && early.length && !dealt.some(k => prefer.includes(k))) dealt[n - 1] = early[0];
  if (island.kind === "home" && n) {
    const phase1 = new Set(homeKinds()), open = keyed.filter(k => phase1.has(k) && !found.has(k)).sort((a, b) => Number(prefer.includes(b)) - Number(prefer.includes(a)));
    if (open.length && !dealt.some(k => open.includes(k))) {
      // (in place of the last that isn't the early quest's; with one legend, that one)
      let i = n - 1;
      while (i > 0 && prefer.includes(dealt[i])) i--;
      dealt[i] = open[0];
    }
  }
  return dealt;
}

/** What rules/islandShape.ts islandCoast needs to draw an island's outline as the map makes it (the sea chart, the dreams): its
 *  kind, its kind's phase, its own seed (the world's: islandOf(kind, world), homeIsland(world)) and its areas. With tuning.islands.coast for a kind's
 *  island (the map's own for home). */
export const coastSpec = (island: Island): { kind: string; phase: number; seed: number; areas: number } =>
  ({ kind: island.kind, phase: Math.max(0, island.phase - 1), seed: island.seed, areas: island.size });
