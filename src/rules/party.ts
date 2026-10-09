// The party spreads (Ed): at the start only home, the dancefloor's area, is partified. Every
// `interval` seconds a wave comes and wakes one area (Ed, v149), chosen as soon as the previous one
// woke (see pickNext), which gets a soundsystem and is partified. Seeded and deterministic; no
// drawing here.
import { bootSeconds, stonesTurned } from "./bootRing";
import { hash2, rng, vnoise } from "./random";
import type { ForestMap } from "./map";
import type { Cell } from "./partition";
import { addCrossings, leyRoute, spiralOrder, spiralWith, type LeyRoute } from "./leyroute";
import { pulseSpeed, stretchLengths } from "./pulseRoute";

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
  /** Cleared before its wave (Ed, 2026-10-07: clearing an area of its wild creatures transforms its runestone at once;
   *  rules/clear.ts): its wave, when it comes, only celebrates. `wave` is then the wave it was cleared during (the one to come). */
  early?: boolean;
  /** When its wave came to it already playing (cleared before it) and celebrated (game.ts: the waveCelebrate event), so
   *  the view can keep its lasers on from then on without remembering the event (art builder 2's ask). */
  celebrated?: number;
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
  /** Areas reached before their wave (cleared: rules/clear.ts), standing or since ruined, whose wave hasn't come yet: the
   *  waves keep to the route (Ed, 2026-10-07: "each wave still targets the next stone on the route"), so the picker still
   *  stops at them, and that wave does nothing to the rules but celebrate (game.ts: the waveCelebrate event). */
  ahead?: Set<string>;
  /** The game time each wave came (waveAt[w - 1] for wave w), whatever it did: an area's own time can be earlier (cleared
   *  before it), so the music reckons the waves from these (rules/musicPlan.ts musicCue). */
  waveAt?: number[];
  /** When each area's wave reached it (key → the game time and the wave), whatever came of it after (its soundsystem since
   *  lost, the area ruined): the ley line's stones reached (rules/leylines.ts waveReached). Home isn't in it. */
  waveReached?: Map<string, { at: number; wave: number }>;
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
   *  sets off from the treehouse then, running down to the home ring and round it at the pulse's speed (rules/bootRing.ts).
   *  Undefined until then. */
  bootFrom?: number;
  /** The wave's pulse (Ed, 2026-10-09: "Pure constant speed"): metres `d` run along the current stretch (the links from
   *  the last stone reached through each of the next wave's in turn, `lens`, rules/pulseRoute.ts) as of game time `at`,
   *  running on at `v` m/s (leyLines.pulseSpeed times the tempo) from then. Before `at` it waits (the boot). */
  pulse: { d: number; at: number; v: number; lens: number[] };
}

export const cellKey = (c: Cell) => `${c[0]},${c[1]}`;

/** Whether a wave has passed an area already (or it's home): partified or ruined, and not one reached early whose wave is
 *  still to come (`ahead`). The picker steps over these. */
const passed = (p: PartyState, key: string) => (p.areas.has(key) || !!p.ruined?.has(key)) && !p.ahead?.has(key);
/** The party as if area `key` had been passed by a wave (for planning ahead): `ahead` without it. */
const withoutAhead = (p: PartyState, key: string): Set<string> | undefined => {
  if (!p.ahead?.has(key)) return p.ahead;
  const out = new Set(p.ahead); out.delete(key); return out;
};

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
  const boot = bootSeconds(map); // (from her leaving the decks: the boot's pulse down to the ring and round it)
  const p: PartyState = { areas: new Map([[cellKey(map.centreCell), home]]), wave: 0, nextAt: Infinity, paused: false, next: [], last: null, bootUntil: boot, afterNext: [], areasPerWave: Math.max(1, map.tuning.party.areasPerWave), pulse: { d: 0, at: 0, v: 0, lens: [] } };
  p.next = pickSet(p, map, p.areasPerWave);
  planAhead(p, map);
  resetPulse(p, map, boot + map.tuning.party.startDelay);
  return p;
}

/** The pulse sets off (again) from the last stone reached at game time `at`, on the next wave's stretch: after the boot, after
 *  each wave, after a wave brought on by hand (the debug key). `carry`: metres it has run past the stone already. */
export function resetPulse(p: PartyState, map: ForestMap, at: number, carry = 0): void {
  p.pulse = { d: carry, at, v: pulseSpeed(map), lens: stretchLengths(p, map) };
  p.nextAt = pulseDue(p, at);
}
/** The stretch's whole length (m). */
const stretchOf = (p: PartyState): number => { let L = 0; for (const l of p.pulse.lens) L += l; return L; };
/** Metres the pulse has run along its stretch at `time` (on from its last reckoning at its speed then, never past the end). */
export function pulseMetres(p: PartyState, time: number): number {
  const P = p.pulse;
  if (!P) return 0;
  return Math.max(0, Math.min(stretchOf(p), P.d + (p.paused ? 0 : P.v * Math.max(0, time - P.at))));
}
/** When the pulse will reach the stretch's end (the next wave), at its speed now; Infinity with no speed or no stretch. */
function pulseDue(p: PartyState, time: number): number {
  const P = p.pulse, L = stretchOf(p);
  if (!L || !(P.v > 0) || p.paused) return Infinity;
  return Math.max(time, P.at) + Math.max(0, L - pulseMetres(p, Math.max(time, P.at))) / P.v;
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

export type Picker = "route" | "noisy";

/** Choose the area the next wave wakes, by the tuning's picker:
 *  - route (default; Ed, 2026-10-06: the ley line "should cover the entire set of waves the whole
 *    time" and have "no crossings"): the next area in the map's planned order the party hasn't
 *    (routeOf: the noisy picker's order, untangled, rules/leyroute.ts);
 *  - noisy: of the dormant areas bordering the party (no islands), the `candidates`
 *    cheapest by distance to the dancefloor times a smooth seeded wobble (lobes, not a disc),
 *    not beside the last pick if there's another, one at random (the route's own fallback, past
 *    the crossing rules). */
export function pickNext(p: PartyState, map: ForestMap, picker: Picker = map.tuning.party.picker as Picker, candidates?: Cell[], salt = 0, border?: Set<string>): Cell | null {
  if (picker === "route") {
    for (const key of routeOf(map).order) if (!passed(p, key)) { const c = key.split(",").map(Number) as unknown as Cell; candidates?.push(c); return c; }
    return null;
  }
  const N = map.tuning.party.noisy, r = rng(map.seed * 131 + p.wave * 7919 + 3 + salt * 104729);
  const touching = border ?? new Set<string>(); // (the dormant areas bordering the party: wavePlan keeps its own)
  if (!border) for (const k of p.areas.keys()) for (const nk of map.neighbours.get(k) ?? []) if (!passed(p, nk)) touching.add(nk);
  const dormant: { key: string; cell: Cell; dist: number; cost: number }[] = [];
  for (const c of cellsOf(map)) if (!passed(p, c.key)) dormant.push(c);
  const frontier = dormant.filter(c => touching.has(c.key));
  const pool = frontier.length ? frontier : dormant;
  if (!pool.length) return null;
  let best = [...pool].sort((a, b) => a.cost - b.cost).slice(0, Math.max(1, N.candidates));
  if (N.spreadFromLast && p.last) {
    const beside = map.neighbours.get(cellKey(p.last)) ?? new Set<string>();
    const away = best.filter(c => !beside.has(c.key));
    if (away.length) best = away;
  }
  candidates?.push(...best.map(c => c.cell));
  return best[Math.floor(r() * best.length)].cell;
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
    v = { ...v, areas: new Map(v.areas).set(cellKey(c), dummyArea(c)), ahead: withoutAhead(v, cellKey(c)), last: c };
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
    let ahead = v.ahead;
    for (const c of set) { areas.set(cellKey(c), dummyArea(c)); ahead = withoutAhead({ ...v, ahead }, cellKey(c)); }
    return { ...v, areas, ahead, wave, last: set[set.length - 1] };
  };
  const v1 = woke(p, p.next, p.wave + 1);
  p.afterNext = pickSet(v1, map, n);
}

/** Every dormant area's wave number (Ed, 2026-10-04: "a big glowing number above the stones", a
 *  design aid): the waves the seeded picker will choose, run forward from now exactly as spreadWave
 *  and planAhead would (next, then the after-next, then on), by area key. */
export function wavePlan(p: PartyState, map: ForestMap): Map<string, number> {
  const out = new Map<string, number>(), areas = new Map(p.areas), frontier = new Set<string>(), ahead = p.ahead?.size ? new Set(p.ahead) : undefined;
  // The same picks pickSet makes, but adding to one party and its frontier as it goes (copying
  // them for every pick cost a frame or three, once a wave).
  const add = (c: Cell) => {
    const k = cellKey(c);
    areas.set(k, dummyArea(c)); frontier.delete(k); ahead?.delete(k);
    for (const nk of map.neighbours.get(k) ?? []) if (!areas.has(nk) || ahead?.has(nk)) frontier.add(nk);
  };
  for (const k of areas.keys()) for (const nk of map.neighbours.get(k) ?? []) if (!areas.has(nk) || ahead?.has(nk)) frontier.add(nk);
  for (const c of p.next) { out.set(cellKey(c), p.wave + 1); add(c); }
  let last = p.next[p.next.length - 1];
  for (let wave = p.wave + 1; last; wave++) { // wave: the one just woken (in the plan)
    let picked = false;
    for (let k = 0; k < p.areasPerWave; k++) {
      const c = pickNext({ ...p, areas, ahead, wave, last }, map, undefined, undefined, k, frontier);
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

/** Spread the party one ring now. Returns the newly partified areas; an area reached already (cleared before its wave:
 *  rules/clear.ts) is not among them: its wave changes nothing in the rules (Ed, 2026-10-07: "no enrage, no second
 *  soundsystem"), and if its soundsystem stands, `celebrate` (if given) is told, for the fireworks and its lasers. */
export function spreadWave(p: PartyState, map: ForestMap, time: number, celebrate?: (a: Partified, wave: number) => void): Partified[] {
  const wave = p.wave + 1, fresh: Partified[] = [];
  for (const { key: k, cell: c, from } of nextWave(p, map)) {
    (p.waveReached ??= new Map()).set(k, { at: time, wave });
    if (p.ahead?.delete(k)) {
      const a = p.areas.get(k);
      if (a) { a.early = undefined; a.celebrated = time; celebrate?.(a, wave); }
      continue;
    }
    const a: Partified = { cell: c, wave, at: time, from, soundsystem: soundsystemFor(map, c) };
    p.areas.set(k, a);
    fresh.push(a);
  }
  p.wave = wave;
  (p.waveAt ??= [])[wave - 1] = time;
  if (p.next.length) p.last = p.next[p.next.length - 1];
  // The confirmed after-next is the next now (the same as picking it afresh), unless the number of
  // witches has changed since (then it's picked afresh), and the plan moves on a wave.
  p.next = p.afterNext.length === p.areasPerWave ? p.afterNext : pickSet(p, map, p.areasPerWave);
  planAhead(p, map);
  return fresh;
}

/** An area cleared of its wild creatures before its wave (Ed, 2026-10-07; rules/clear.ts): partified now, as its wave
 *  would (its soundsystem rises), and remembered as `ahead` so its wave, when it comes, only celebrates. The plan of the
 *  waves doesn't change (they keep to the route). Returns the new area, or null if it had the party (or is ruined). */
export function clearArea(p: PartyState, map: ForestMap, cell: Cell, time: number): Partified | null {
  const k = cellKey(cell);
  if (p.areas.has(k) || p.ruined?.has(k)) return null;
  let from: Cell = map.centreCell, best = Infinity;
  const site = map.siteOf(cell[0], cell[1]);
  for (const nk of map.neighbours.get(k) ?? []) {
    const a = p.areas.get(nk);
    if (!a) continue;
    const s = map.siteOf(a.cell[0], a.cell[1]), dd = Math.hypot(s.x - site.x, s.z - site.z);
    if (dd < best) { best = dd; from = a.cell; }
  }
  const a: Partified = { cell, wave: p.wave + 1, at: time, from, soundsystem: soundsystemFor(map, cell), early: true };
  p.areas.set(k, a);
  (p.ahead ??= new Set()).add(k);
  return a;
}

/** Advance the party's clock: a wave whenever its time comes (unless paused). The boot-up waits for her to leave her decks
 *  (Ed, 2026-10-06: "three seconds after you leave your decks" the first stone turns, and the boot's minutes run from it),
 *  the party spell cast (or in a game without it, `spellAt` undefined: the tools and tests, as soon as she's off them):
 *  then `bootFrom` is set and the boot's end and the first wave's countdown are reckoned from it. */
export function stepParty(p: PartyState, map: ForestMap, time: number, dt: number, seated = false, celebrate?: (a: Partified, wave: number) => void, rate = 1): Partified[] {
  const P = p.pulse;
  if (p.bootFrom === undefined && p.spellAt !== null && !seated) {
    p.bootFrom = time; p.bootUntil = time + bootSeconds(map); P.at = p.bootUntil + map.tuning.party.startDelay; P.d = 0;
  }
  const waiting = p.bootFrom === undefined;
  if (waiting) { P.at += dt; p.bootUntil += dt; p.nextAt = pulseDue(p, time); return []; } // (still at her decks: the boot waits)
  if (p.paused) { if (time < p.bootUntil) { p.bootFrom = (p.bootFrom ?? time) + dt; p.bootUntil += dt; } P.at += dt; p.nextAt = pulseDue(p, time); return []; } // (held where it is, the boot too)
  // At a constant speed along the route (Ed, 2026-10-09: "Pure constant speed", leyLines.pulseSpeed m/s), times the party's
  // tempo (rules/beat.ts tempoRate: faster for her knockdowns): reckoned on to now at its speed so far, then at the new one.
  if (time >= P.at) { P.d = pulseMetres(p, time); P.at = time; P.v = pulseSpeed(map) * rate; }
  // A wave lands as the pulse reaches the stretch's last stone; it runs straight on along the next stretch.
  let fresh: Partified[] = [];
  for (let guard = 0; guard < 4 && p.pulse.lens.length && p.pulse.d >= stretchOf(p) - 1e-9; guard++) {
    const over = p.pulse.d - stretchOf(p);
    fresh = fresh.concat(spreadWave(p, map, time, celebrate));
    resetPulse(p, map, time, over); p.pulse.v = pulseSpeed(map) * rate;
  }
  p.nextAt = pulseDue(p, time);
  return fresh;
}

/** How far along its stretch the wave's pulse is, in links (0 to the stretch's count: one a wave, a link a stone): the links
 *  it has passed, and its share of the one it's on by length (Ed, 2026-10-09: "Pure constant speed"). Nothing else moves it
 *  (Ed, 2026-10-08: "Losing a soundsystem no longer touches the wave countdown"). */
export function pulseLinksIn(p: PartyState, time: number): number {
  const lens = p.pulse?.lens ?? [];
  let d = pulseMetres(p, time);
  for (let i = 0; i < lens.length; i++) { if (d < lens[i] || i === lens.length - 1) return i + Math.min(1, d / Math.max(1e-9, lens[i])); d -= lens[i]; }
  return 0;
}

/** Seconds left until the next wave (the stretch's metres left over the pulse's speed now), and the share of the stretch run
 *  (0-1), for the bar; while the home speakers boot up (booting), how far the boot has got (0-1) and its seconds left. */
export function waveCountdown(p: PartyState, map: ForestMap, time: number): { left: number; gone: number; booting: boolean; boot: number; bootLeft: number } {
  const L = stretchOf(p), d = pulseMetres(p, time), v = p.pulse?.v || pulseSpeed(map), B = bootSeconds(map);
  const left = !L || p.paused || !(v > 0) ? Infinity : Math.max(0, p.pulse.at - time) + (L - d) / v;
  const bootLeft = Math.max(0, p.bootUntil - time);
  return { left, gone: L > 0 ? Math.min(1, d / L) : 0, booting: bootLeft > 0, boot: B > 0 ? 1 - Math.min(1, bootLeft / B) : 1, bootLeft };
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

/** The ley line's route for this map (rules/leyroute.ts): the spiral (Ed, 2026-10-06: spiralOrder,
 *  untangled, then a few crossings added within his rules). Past the crossing rules, the noisy
 *  picker's order, untangled. Worked out once a map. */
export function routeOf(map: ForestMap): LeyRoute {
  return leyRoute(map, () => spiralOrder(map), () => {
    const m: ForestMap = { ...map, tuning: { ...map.tuning, party: { ...map.tuning.party, picker: "noisy" } } };
    return [...wavePlan(newParty(m), m).keys()];
  }, r => addCrossings(map, r), () => [4, 5, 6, 7, 8, 9].map(K => spiralWith(map, K)));
}
