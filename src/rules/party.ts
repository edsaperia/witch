// The party spreads (Ed, 2026-10-03): at the start only home, the dancefloor's area, is partified.
// Every `interval` seconds a wave comes: every area touching a partified area (sharing a border
// in the fractal partition) gets a soundsystem and is partified too, so the party grows a ring of
// areas at a time. Seeded and deterministic; no drawing here.
import { hash2, rng } from "./random";
import type { ForestMap } from "./map";
import type { Cell } from "./partition";
import { anchorOf } from "./creatures";

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
}

export const cellKey = (c: Cell) => `${c[0]},${c[1]}`;

export function newParty(map: ForestMap): PartyState {
  const home: Partified = { cell: map.centreCell, wave: 0, at: 0, from: null, soundsystem: null };
  return { areas: new Map([[cellKey(map.centreCell), home]]), wave: 0, nextAt: map.tuning.party.startDelay + map.tuning.party.interval, paused: false };
}

/** Where an area's soundsystem stands: in its clearing, beside its centre, inside its own ground. */
export function soundsystemFor(map: ForestMap, cell: Cell): Soundsystem {
  const s = map.siteOf(cell[0], cell[1]), r = rng(map.seed * 17 + cell[0] * 53 + cell[1] * 911);
  const [ax, az] = anchorOf(map, [cell[0], cell[1]], s.x, s.z, map.areaSize * 0.75);
  const variant = Math.floor(hash2(cell[0], cell[1], map.seed + 77) * 3) % 3;
  for (let i = 0; i < 24; i++) {
    const a = r() * Math.PI * 2, d = 3 + r() * 4, x = ax + Math.cos(a) * d, z = az + Math.sin(a) * d + 3;
    const c = map.areaAt(x, z).cell;
    if (c[0] === cell[0] && c[1] === cell[1]) return { x, z, variant };
  }
  return { x: ax, z: az, variant };
}

const inMap = (map: ForestMap, c: Cell) => c[0] >= 0 && c[1] >= 0 && c[0] < map.n && c[1] < map.n;

/** Spread the party one ring now. Returns the newly partified areas. */
export function spreadWave(p: PartyState, map: ForestMap, time: number): Partified[] {
  const wave = p.wave + 1, fresh: Partified[] = [];
  const candidates = new Map<string, Cell>();
  const from = new Map<string, Cell>();
  for (const [k, a] of p.areas) for (const nk of map.neighbours.get(k) ?? []) {
    if (p.areas.has(nk) || candidates.has(nk)) continue;
    const c = nk.split(",").map(Number) as unknown as Cell;
    if (!inMap(map, c)) continue;
    candidates.set(nk, c);
    from.set(nk, a.cell);
  }
  // A seeded order, and maxPerWave of them if the ring is too big.
  const list = [...candidates.entries()].sort((a, b) => hash2(a[1][0], a[1][1], map.seed + wave) - hash2(b[1][0], b[1][1], map.seed + wave));
  const max = map.tuning.party.maxPerWave > 0 ? map.tuning.party.maxPerWave : Infinity;
  for (const [k, c] of list.slice(0, max)) {
    const a: Partified = { cell: c, wave, at: time, from: from.get(k) ?? null, soundsystem: soundsystemFor(map, c) };
    p.areas.set(k, a);
    fresh.push(a);
  }
  p.wave = wave;
  return fresh;
}

/** Advance the party's clock: a wave whenever its time comes (unless paused). */
export function stepParty(p: PartyState, map: ForestMap, time: number, dt: number): Partified[] {
  if (p.paused) { p.nextAt += dt; return []; }
  if (time < p.nextAt) return [];
  p.nextAt += map.tuning.party.interval;
  return spreadWave(p, map, time);
}

/** Seconds left until the next wave, and the share of the interval gone (0-1), for the bar. */
export function waveCountdown(p: PartyState, map: ForestMap, time: number): { left: number; gone: number } {
  const left = Math.max(0, p.nextAt - time), interval = map.tuning.party.interval;
  return { left, gone: 1 - Math.min(1, left / interval) };
}
