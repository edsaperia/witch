// The party spreads (Ed): at the start only home, the dancefloor's area, is partified. Every
// `interval` seconds a wave comes and wakes one area (Ed, v149), chosen as soon as the previous one
// woke (see pickNext), which gets a soundsystem and is partified. Seeded and deterministic; no
// drawing here.
import type { Tuning } from "./tuning";
import { hash2, rng, vnoise } from "./random";
import type { ForestMap } from "./map";
import type { Cell } from "./partition";

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
  /** Forecasting (Ed, 2026-10-04): the area the wave after next will wake (confirmed too: the
   *  picker is seeded, so it's what that wave will pick), and the probable ones for the wave
   *  after that (the picker's candidates then, about forecast.probable of them). */
  afterNext: Cell[];
  /** Areas whose soundsystem was destroyed (rules/combat.ts): the party there is over; no wave wakes them again. */
  ruined?: Set<string>;
  probable: Cell[];
  /** Waves further the forecast sees (a legend buff, rules/buffs.ts): 1 or more and the wave after
   *  the after-next is confirmed too, so `probable` holds just the areas it will wake. */
  seeAhead?: number;
  /** How many areas each wave wakes: one per witch present (Ed, 2026-10-04), read at each wave. */
  areasPerWave: number;
  /** Game time the home speaker ring finishes booting up (Ed, 2026-10-04): the first wave's countdown starts then. */
  bootUntil: number;
}

export const cellKey = (c: Cell) => `${c[0]},${c[1]}`;

export function newParty(map: ForestMap): PartyState {
  const home: Partified = { cell: map.centreCell, wave: 0, at: 0, from: null, soundsystem: null };
  const boot = map.tuning.boot.time;
  const p: PartyState = { areas: new Map([[cellKey(map.centreCell), home]]), wave: 0, nextAt: boot + map.tuning.party.startDelay + map.tuning.party.interval, paused: false, next: [], last: null, bootUntil: boot, afterNext: [], probable: [], areasPerWave: Math.max(1, map.tuning.party.areasPerWave) };
  p.next = pickSet(p, map, p.areasPerWave);
  planAhead(p, map);
  return p;
}

export type Picker = "noisy" | "near3" | "near3touch" | "nearest";

/** Choose the area the next wave wakes, by the tuning's picker (?picker= in the URL):
 *  - noisy (default): of the dormant areas bordering the party (no islands), the `candidates`
 *    cheapest by distance to the dancefloor times a smooth seeded wobble (lobes, not a disc),
 *    not beside the last pick if there's another, one at random;
 *  - near3: of all the dormant areas, the 3 nearest the dancefloor, one at random;
 *  - near3touch: the same among those bordering the party;
 *  - nearest: the nearest dormant area bordering the party. */
export function pickNext(p: PartyState, map: ForestMap, picker: Picker = map.tuning.party.picker as Picker, candidates?: Cell[], salt = 0): Cell | null {
  const d = map.dancefloor, N = map.tuning.party.noisy, r = rng(map.seed * 131 + p.wave * 7919 + 3 + salt * 104729);
  const touching = new Set<string>();
  for (const k of p.areas.keys()) for (const nk of map.neighbours.get(k) ?? []) if (!p.areas.has(nk)) touching.add(nk);
  const dormant: { key: string; cell: Cell; dist: number }[] = [];
  for (let cy = 0; cy < map.n; cy++) for (let cx = 0; cx < map.n; cx++) {
    const key = `${cx},${cy}`;
    if (p.areas.has(key) || p.ruined?.has(key)) continue;
    const s = map.soundsystemSpot(cx, cy);
    dormant.push({ key, cell: [cx, cy], dist: Math.hypot(s.x - d.x, s.z - d.z) });
  }
  const frontier = dormant.filter(c => touching.has(c.key));
  const pool = picker === "near3" ? dormant : frontier.length ? frontier : dormant;
  if (!pool.length) return null;
  if (picker === "nearest") { const c = [...pool].sort((a, b) => a.dist - b.dist)[0].cell; candidates?.push(c); return c; }
  if (picker === "noisy") {
    const L = N.lobeSize, s0 = map.seed + 911;
    const cost = (c: { cell: Cell; dist: number }) => {
      const site = map.siteOf(c.cell[0], c.cell[1]);
      const n = 0.65 * vnoise(site.x / L, site.z / L, s0) + 0.35 * vnoise(site.x / (L / 2.3), site.z / (L / 2.3), s0 + 1);
      return c.dist * (1 + N.wobble * (n - 0.5) * 2);
    };
    let best = [...pool].sort((a, b) => cost(a) - cost(b)).slice(0, Math.max(1, N.candidates));
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
 *  (confirmed: the same seed, the same party), and its candidates the wave after (probable). */
export function planAhead(p: PartyState, map: ForestMap): void {
  p.afterNext = []; p.probable = [];
  if (!p.next.length) return;
  const n = p.areasPerWave, woke = (v: PartyState, set: Cell[], wave: number): PartyState => {
    const areas = new Map(v.areas);
    for (const c of set) areas.set(cellKey(c), dummyArea(c));
    return { ...v, areas, wave, last: set[set.length - 1] };
  };
  const v1 = woke(p, p.next, p.wave + 1);
  p.afterNext = pickSet(v1, map, n);
  if (!p.afterNext.length) return;
  const cands: Cell[] = [];
  const third = pickSet(woke(v1, p.afterNext, p.wave + 2), map, n, cands);
  p.probable = (p.seeAhead ?? 0) >= 1 && third.length ? third : cands.slice(0, Math.max(1, map.tuning.forecast.probable * n));
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

/** Advance the party's clock: a wave whenever its time comes (unless paused). */
export function stepParty(p: PartyState, map: ForestMap, time: number, dt: number): Partified[] {
  if (p.paused) { p.nextAt += dt; if (time < p.bootUntil) p.bootUntil += dt; return []; }
  if (time < p.nextAt) return [];
  p.nextAt += map.tuning.party.interval;
  return spreadWave(p, map, time);
}

/** Seconds left until the next wave, and the share of the interval gone (0-1), for the bar; while
 *  the home speakers boot up (booting), how far the boot has got (0-1) and its seconds left. */
export function waveCountdown(p: PartyState, map: ForestMap, time: number): { left: number; gone: number; booting: boolean; boot: number; bootLeft: number } {
  const left = Math.max(0, p.nextAt - time), interval = map.tuning.party.interval, B = map.tuning.boot.time;
  const bootLeft = Math.max(0, p.bootUntil - time);
  return { left, gone: 1 - Math.min(1, left / interval), booting: bootLeft > 0, boot: B > 0 ? 1 - Math.min(1, bootLeft / B) : 1, bootLeft };
}

/** How many of the home ring's `count` speakers have powered on by `time`: one by one round the
 *  ring over the boot (Ed, 2026-10-04), all of them once it's done. */
export function speakersOn(p: PartyState, map: ForestMap, time: number, count: number): number {
  const B = map.tuning.boot.time;
  if (B <= 0 || time >= p.bootUntil) return count;
  const k = 1 - (p.bootUntil - time) / B;
  return Math.max(0, Math.min(count, Math.floor(k * (count + 1))));
}

/** A spawn marker (Ed, v147): a rune stone on the spot where an area's soundsystem will stand,
 *  until the party reaches it; awake when the next wave will take its area, dormant otherwise. */
export interface SpawnMarker { key: string; cell: Cell; x: number; z: number; awake: boolean; /** Forecasting: next (awake), afterNext, probable or dormant. */ stage: "next" | "afterNext" | "probable" | "dormant" }

/** The spawn markers: one for every area the party hasn't reached (where its soundsystem will stand). */
export function spawnMarkers(p: PartyState, map: ForestMap): SpawnMarker[] {
  const next = new Set(nextWave(p, map).map(c => c.key)), out: SpawnMarker[] = [];
  const after = new Set(p.afterNext.map(cellKey)), probable = new Set(p.probable.map(cellKey));
  for (let cy = 0; cy < map.n; cy++) for (let cx = 0; cx < map.n; cx++) {
    const key = `${cx},${cy}`;
    if (p.areas.has(key)) continue;
    const s = map.soundsystemSpot(cx, cy), awake = next.has(key);
    out.push({ key, cell: [cx, cy], x: s.x, z: s.z, awake, stage: awake ? "next" : after.has(key) ? "afterNext" : probable.has(key) ? "probable" : "dormant" });
  }
  return out;
}

/** How many symbols ring a rune stone (Ed, 2026-10-04): all of them on the next stone (the last
 *  appearing confirms it); the after-next stone fills through the middle range as the countdown
 *  runs (`gone`, 0-1); a probable one flickers between 1 and probableMax (`flicker`, 0-1, the
 *  view's); none on the rest. */
export function symbolCount(stage: SpawnMarker["stage"], gone: number, flicker: number, t: Tuning): number {
  const F = t.forecast;
  if (stage === "next") return F.symbols;
  if (stage === "afterNext") return Math.round(F.afterNext[0] + (F.afterNext[1] - F.afterNext[0]) * Math.max(0, Math.min(1, gone)));
  if (stage === "probable") return 1 + Math.min(F.probableMax - 1, Math.floor(Math.max(0, Math.min(0.999, flicker)) * F.probableMax));
  return 0;
}
