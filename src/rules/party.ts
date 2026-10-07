// The party spreads (Ed): at the start only home, the dancefloor's area, is partified. Every
// `interval` seconds a wave comes and wakes one area (Ed, v149), chosen as soon as the previous one
// woke (see pickNext), which gets a soundsystem and is partified. Seeded and deterministic; no
// drawing here.
import { stonesTurned } from "./bootRing";
import { hash2, rng, vnoise } from "./random";
import type { ForestMap } from "./map";
import type { Cell } from "./partition";
import { addCrossings, leyRoute, spiralOrder, spiralWith, variedOrder, type LeyRoute } from "./leyroute";

export interface Soundsystem { x: number; z: number; variant: number }

export interface Partified {
  cell: Cell;
  /** The wave that partified it (0 for home). */
  wave: number;
  /** Game time it was partified, for the transition. */
  at: number;
  /** The partified neighbour the party came from (the transition sweeps from that side). */
  from: Cell | null;
  /** Its soundsystem (home has the dancefloor instead). */
  soundsystem: Soundsystem | null;
}

export interface PartyState {
  areas: Map<string, Partified>;
  wave: number;
  /** Game time of the next wave. */
  nextAt: number;
  paused: boolean;
  /** The areas the next wave will wake (Ed, v149: one area a wave; 2026-10-04: one per witch in
   *  the game, areasPerWave), chosen as soon as the previous ones woke, so the players know where
   *  to go; empty when every area has the party. */
  next: Cell[];
  /** The area the last wave woke (the picker spreads away from it). */
  last: Cell | null;
  /** The area the wave after next will wake (Ed, 2026-10-04; confirmed too: the picker is seeded, so it's what that wave
   *  will pick). (The forecast's probable set for the wave after, and its rings of symbols, went with Ed's 2026-10-06 note:
   *  the ley line, its pulse and the beacons show what's coming.) */
  afterNext: Cell[];
  /** Areas whose soundsystem was destroyed (rules/combat.ts): the party there is over; no wave wakes them again. */
  ruined?: Set<string>;
  /** Areas whose quest is done before their wave (rules/leylines.ts onAreaDone): key → game time. The ley line moves on from them. */
  leyDone?: Map<string, number>;
  /** How many areas each wave wakes: one per witch present (Ed, 2026-10-04), read at each wave. */
  areasPerWave: number;
  /** Game time the home speaker ring finishes booting up (Ed, 2026-10-04; 5 minutes from her first step, 2026-10-05): the first wave's countdown starts then. */
  bootUntil: number;
  /** The party spell (Ed, 2026-10-06: the game starts when she casts it, setting off the boot): undefined in a build without
   *  it (the game clock runs from the start of play); null while waiting for it (the clock at 00:00, a prompt to cast it);
   *  the game time she cast it. Set by the boot-up's own rules; read by the HUD (rules/leypulse.ts clockStart). */
  spellAt?: number | null;
  /** When she left her decks (Ed, 2026-10-06), the spell cast (or in a build without it, her first step): the boot's pulse
   *  sets off from the treehouse then, turns the first stone boot.firstAfter seconds later, and the boot's minutes run
   *  from that first speaker (rules/bootRing.ts). Undefined until then. */
  bootFrom?: number;
}

export const cellKey = (c: Cell) => `${c[0]},${c[1]}`;

/** The party spell's cast (Ed, 2026-10-06: "there is a button on the screen that says "CAST THE PARTY SPELL", when you
 *  press it, the witch does a spellcasting animation, the pulse appears, and starts going around the dancefloor runestone
 *  ring, and you can start moving around"): seconds the cast takes, in which she can't move yet. */
export const PARTY_CAST = 1.2;
/** Casts the party spell at `time`, if waiting for it: the game clock and the boot-up start (the boot's minutes from now).
 *  Returns whether it was cast. The renderer's hook: `party.spellAt` turning from null to a time. */
export function castPartySpell(p: PartyState, _map: ForestMap, time: number): boolean {
  if (p.spellAt !== null) return false;
  p.spellAt = time;
  return true; // (the boot sets off when she leaves her decks: stepParty)
}
/** Whether she's held still by the party spell: waiting for it, or still casting it. */
export const heldBySpell = (p: PartyState, time: number): boolean => p.spellAt === null || (p.spellAt !== undefined && time < p.spellAt + PARTY_CAST);

export function newParty(map: ForestMap): PartyState {
  const home: Partified = { cell: map.centreCell, wave: 0, at: 0, from: null, soundsystem: null };
  const boot = map.tuning.boot.time + Math.max(0, map.tuning.boot.firstAfter ?? 0); // (from her leaving the decks: the first stone's seconds, then the boot)
  const p: PartyState = { areas: new Map([[cellKey(map.centreCell), home]]), wave: 0, nextAt: boot + map.tuning.party.startDelay + map.tuning.party.interval, paused: false, next: [], last: null, bootUntil: boot, afterNext: [], areasPerWave: Math.max(1, map.tuning.party.areasPerWave) };
  p.next = pickSet(p, map, p.areasPerWave);
  planAhead(p, map);
  return p;
}

/** Every area's cell, its soundsystem's distance from the dancefloor and its noisy picker's cost
 *  (distance times a smooth seeded wobble: lobes, not a disc), worked out once per map. */
const CELLS = new WeakMap<ForestMap, { key: string; cell: Cell; dist: number; cost: number }[]>();
function cellsOf(map: ForestMap) {
  let out = CELLS.get(map);
  if (out) return out;
  const d = map.dancefloor, N = map.tuning.party.noisy, L = N.lobeSize, s0 = map.seed + 911;
  out = [];
  for (const [cx, cy] of map.cells) {
    const s = map.soundsystemSpot(cx, cy), site = map.siteOf(cx, cy), dist = Math.hypot(s.x - d.x, s.z - d.z);
    const n = 0.65 * vnoise(site.x / L, site.z / L, s0) + 0.35 * vnoise(site.x / (L / 2.3), site.z / (L / 2.3), s0 + 1);
    out.push({ key: `${cx},${cy}`, cell: [cx, cy], dist, cost: dist * (1 + N.wobble * (n - 0.5) * 2) });
  }
  CELLS.set(map, out);
  return out;
}

export type Picker = "route" | "noisy" | "near3" | "near3touch" | "nearest";

/** Choose the area the next wave wakes, by the tuning's picker (?picker= in the URL):
 *  - route (default; Ed, 2026-10-06: the ley line "should cover the entire set of waves the whole
 *    time" and have "no crossings"): the next area in the map's planned order the party hasn't
 *    (routeOf: the noisy picker's order, untangled, rules/leyroute.ts);
 *  - noisy: of the dormant areas bordering the party (no islands), the `candidates`
 *    cheapest by distance to the dancefloor times a smooth seeded wobble (lobes, not a disc),
 *    not beside the last pick if there's another, one at random;
 *  - near3: of all the dormant areas, the 3 nearest the dancefloor, one at random;
 *  - near3touch: the same among those bordering the party;
 *  - nearest: the nearest dormant area bordering the party. */
export function pickNext(p: PartyState, map: ForestMap, picker: Picker = map.tuning.party.picker as Picker, candidates?: Cell[], salt = 0, border?: Set<string>): Cell | null {
  if (picker === "route") {
    for (const key of routeOf(map).order) if (!p.areas.has(key) && !p.ruined?.has(key)) { const c = key.split(",").map(Number) as unknown as Cell; candidates?.push(c); return c; }
    return null;
  }
  const N = map.tuning.party.noisy, r = rng(map.seed * 131 + p.wave * 7919 + 3 + salt * 104729);
  const touching = border ?? new Set<string>(); // (the dormant areas bordering the party: wavePlan keeps its own)
  if (!border) for (const k of p.areas.keys()) for (const nk of map.neighbours.get(k) ?? []) if (!p.areas.has(nk)) touching.add(nk);
  const dormant: { key: string; cell: Cell; dist: number; cost: number }[] = [];
  for (const c of cellsOf(map)) if (!p.areas.has(c.key) && !p.ruined?.has(c.key)) dormant.push(c);
  const frontier = dormant.filter(c => touching.has(c.key));
  const pool = picker === "near3" ? dormant : frontier.length ? frontier : dormant;
  if (!pool.length) return null;
  if (picker === "nearest") { const c = [...pool].sort((a, b) => a.dist - b.dist)[0].cell; candidates?.push(c); return c; }
  if (picker === "noisy") {
    let best = [...pool].sort((a, b) => a.cost - b.cost).slice(0, Math.max(1, N.candidates));
    if (N.spreadFromLast && p.last) {
      const beside = map.neighbours.get(cellKey(p.last)) ?? new Set<string>();
      const away = best.filter(c => !beside.has(c.key));
      if (away.length) best = away;
    }
    candidates?.push(...best.map(c => c.cell));
    return best[Math.floor(r() * best.length)].cell;
  }
  const three = [...pool].sort((a, b) => a.dist - b.dist).slice(0, 3);
  candidates?.push(...three.map(c => c.cell));
  return three[Math.floor(r() * three.length)].cell;
}

/** A wave's areas: `n` picked one after another, each as if the ones before had already woken,
 *  so they're all different (and, from the same party, always the same). */
export function pickSet(p: PartyState, map: ForestMap, n: number, candidates?: Cell[]): Cell[] {
  const out: Cell[] = [];
  let v = p;
  for (let k = 0; k < n; k++) {
    const c = pickNext(v, map, undefined, k === n - 1 ? candidates : undefined, k);
    if (!c) break;
    out.push(c);
    v = { ...v, areas: new Map(v.areas).set(cellKey(c), dummyArea(c)), last: c };
  }
  return out;
}
const dummyArea = (c: Cell): Partified => ({ cell: c, wave: 0, at: 0, from: null, soundsystem: null });

/** Plan the waves after `next` (Ed, 2026-10-04): what the picker will choose once next has woken
 *  (confirmed: the same seed, the same party). */
export function planAhead(p: PartyState, map: ForestMap): void {
  p.afterNext = [];
  if (!p.next.length) return;
  const n = p.areasPerWave, woke = (v: PartyState, set: Cell[], wave: number): PartyState => {
    const areas = new Map(v.areas);
    for (const c of set) areas.set(cellKey(c), dummyArea(c));
    return { ...v, areas, wave, last: set[set.length - 1] };
  };
  const v1 = woke(p, p.next, p.wave + 1);
  p.afterNext = pickSet(v1, map, n);
}

/** Every dormant area's wave number (Ed, 2026-10-04: "a big glowing number above the stones", a
 *  design aid): the waves the seeded picker will choose, run forward from now exactly as spreadWave
 *  and planAhead would (next, then the after-next, then on), by area key. */
export function wavePlan(p: PartyState, map: ForestMap): Map<string, number> {
  const out = new Map<string, number>(), areas = new Map(p.areas), frontier = new Set<string>();
  // The same picks pickSet makes, but adding to one party and its frontier as it goes (copying
  // them for every pick cost a frame or three, once a wave).
  const add = (c: Cell) => {
    const k = cellKey(c);
    areas.set(k, dummyArea(c)); frontier.delete(k);
    for (const nk of map.neighbours.get(k) ?? []) if (!areas.has(nk)) frontier.add(nk);
  };
  for (const k of areas.keys()) for (const nk of map.neighbours.get(k) ?? []) if (!areas.has(nk)) frontier.add(nk);
  for (const c of p.next) { out.set(cellKey(c), p.wave + 1); add(c); }
  let last = p.next[p.next.length - 1];
  for (let wave = p.wave + 1; last; wave++) { // wave: the one just woken (in the plan)
    let picked = false;
    for (let k = 0; k < p.areasPerWave; k++) {
      const c = pickNext({ ...p, areas, wave, last }, map, undefined, undefined, k, frontier);
      if (!c) break;
      out.set(cellKey(c), wave + 1); add(c); last = c; picked = true;
    }
    if (!picked) break;
  }
  return out;
}

/** Where an area's soundsystem stands: in its clearing, beside its centre, inside its own ground. */
export function soundsystemFor(map: ForestMap, cell: Cell): Soundsystem {
  // The spot is the map's (reserved from the start, so scenery keeps clear of it).
  const variant = Math.floor(hash2(cell[0], cell[1], map.seed + 77) * 3) % 3;
  return { ...map.soundsystemSpot(cell[0], cell[1]), variant };
}


/** The areas the next wave will partify (one per witch, Ed 2026-10-04), and where the party comes
 *  to each from: its nearest partified neighbour, or home if none touches it. */
export function nextWave(p: PartyState, map: ForestMap): { key: string; cell: Cell; from: Cell }[] {
  return p.next.map(cell => {
    const key = cellKey(cell), site = map.siteOf(cell[0], cell[1]);
    let from: Cell = map.centreCell, best = Infinity;
    for (const nk of map.neighbours.get(key) ?? []) {
      const a = p.areas.get(nk);
      if (!a) continue;
      const s = map.siteOf(a.cell[0], a.cell[1]), dd = Math.hypot(s.x - site.x, s.z - site.z);
      if (dd < best) { best = dd; from = a.cell; }
    }
    return { key, cell, from };
  });
}

/** Spread the party one ring now. Returns the newly partified areas. */
export function spreadWave(p: PartyState, map: ForestMap, time: number): Partified[] {
  const wave = p.wave + 1, fresh: Partified[] = [];
  for (const { key: k, cell: c, from } of nextWave(p, map)) {
    const a: Partified = { cell: c, wave, at: time, from, soundsystem: soundsystemFor(map, c) };
    p.areas.set(k, a);
    fresh.push(a);
  }
  p.wave = wave;
  if (fresh.length) p.last = fresh[fresh.length - 1].cell;
  // The confirmed after-next is the next now (the same as picking it afresh), unless the number of
  // witches has changed since (then it's picked afresh), and the plan moves on a wave.
  p.next = p.afterNext.length === p.areasPerWave ? p.afterNext : pickSet(p, map, p.areasPerWave);
  planAhead(p, map);
  return fresh;
}

/** Advance the party's clock: a wave whenever its time comes (unless paused). The boot-up waits for her to leave her decks
 *  (Ed, 2026-10-06: "three seconds after you leave your decks" the first stone turns, and the boot's minutes run from it),
 *  the party spell cast (or in a game without it, `spellAt` undefined: the tools and tests, as soon as she's off them):
 *  then `bootFrom` is set and the boot's end and the first wave's countdown are reckoned from it. */
export function stepParty(p: PartyState, map: ForestMap, time: number, dt: number, seated = false): Partified[] {
  if (p.bootFrom === undefined && p.spellAt !== null && !seated) {
    const left = p.nextAt - p.bootUntil; // (the countdown after the boot, as it was set)
    p.bootFrom = time; p.bootUntil = time + Math.max(0, map.tuning.boot.firstAfter ?? 0) + map.tuning.boot.time; p.nextAt = p.bootUntil + left;
  }
  const waiting = p.bootFrom === undefined;
  if (p.paused || (waiting && time < p.bootUntil)) { p.nextAt += dt; if (time < p.bootUntil) p.bootUntil += dt; return []; }
  if (time < p.nextAt) return [];
  p.nextAt += map.tuning.party.interval;
  return spreadWave(p, map, time);
}

/** A soundsystem lost (Ed, 2026-10-05): the next wave comes `by` seconds sooner, at once if less
 *  is left (the next step brings it); each loss takes its own `by` off, and the gap after the wave
 *  is the interval as ever. Returns the seconds it took off. */
export function hurryWave(p: PartyState, time: number, by: number): number {
  const was = p.nextAt;
  p.nextAt = Math.max(time, p.nextAt - Math.max(0, by));
  return was - p.nextAt;
}

/** Seconds left until the next wave, and the share of the interval gone (0-1), for the bar; while
 *  the home speakers boot up (booting), how far the boot has got (0-1) and its seconds left. */
export function waveCountdown(p: PartyState, map: ForestMap, time: number): { left: number; gone: number; booting: boolean; boot: number; bootLeft: number } {
  const left = Math.max(0, p.nextAt - time), interval = map.tuning.party.interval, B = map.tuning.boot.time;
  const bootLeft = Math.max(0, p.bootUntil - time);
  return { left, gone: 1 - Math.min(1, left / interval), booting: bootLeft > 0, boot: B > 0 ? 1 - Math.min(1, bootLeft / B) : 1, bootLeft };
}

/** How many of the home ring's `count` speakers have turned on by `time`: each as the boot's pulse reaches its stone,
 *  round the ring clockwise from the top (rules/bootRing.ts; Ed, 2026-10-06), all of them once the boot is done. */
export function speakersOn(p: PartyState, map: ForestMap, time: number, count: number): number {
  return Math.min(count, stonesTurned(p, map, time));
}


/** A spawn marker (Ed, v147): a rune stone on the spot where an area's soundsystem will stand,
 *  until the party reaches it; awake when the next wave will take its area, dormant otherwise. */
export interface SpawnMarker { key: string; cell: Cell; x: number; z: number; awake: boolean; /** Next (awake), after-next, or dormant. */ stage: "next" | "afterNext" | "dormant" }

/** The spawn markers: one for every area the party hasn't reached (where its soundsystem will stand). */
export function spawnMarkers(p: PartyState, map: ForestMap): SpawnMarker[] {
  const next = new Set(nextWave(p, map).map(c => c.key)), out: SpawnMarker[] = [];
  const after = new Set(p.afterNext.map(cellKey));
  for (const [cx, cy] of map.cells) {
    const key = `${cx},${cy}`;
    if (p.areas.has(key)) continue;
    const s = map.soundsystemSpot(cx, cy), awake = next.has(key);
    out.push({ key, cell: [cx, cy], x: s.x, z: s.z, awake, stage: awake ? "next" : after.has(key) ? "afterNext" : "dormant" });
  }
  return out;
}

/** The ley line's route for this map (rules/leyroute.ts), by party.route (?route=): "spiral" (the
 *  default; Ed, 2026-10-06: spiralOrder, untangled, then a few crossings added within his rules) or
 *  "varied" (the order before it: petals round home, then sweeps, lobes or combs, untangled). Past
 *  the crossing rules, the noisy picker's order, untangled. Worked out once a map. */
export function routeOf(map: ForestMap): LeyRoute {
  const varied = map.tuning.party.route === "varied";
  return leyRoute(map, () => (varied ? variedOrder(map) : spiralOrder(map)), () => {
    const m: ForestMap = { ...map, tuning: { ...map.tuning, party: { ...map.tuning.party, picker: "noisy" } } };
    return [...wavePlan(newParty(m), m).keys()];
  }, varied ? undefined : r => addCrossings(map, r), varied ? undefined : () => [4, 5, 6, 7, 8, 9].map(K => spiralWith(map, K)));
}
