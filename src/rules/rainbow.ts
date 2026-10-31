// The rainbow wave (Ed, 2026-10-29, after a playtest: "the spark feels slow but I don't know what to do with the time"): clearing a
// soundsystem early (its stone converted before its wave comes: rules/party.ts clearArea, `early`) sends a rainbow wave along the
// ley line. Ed's second pass (2026-10-29): "1/ originate at the early soundsystem 2/ go in both directions along the route, the
// backwards direction should stop at the spark 3/ be twice as fast 4/ be three times longer 5/ have no silver trail". So it sets off
// from the cleared soundsystem's stone (`from`, m along the route), at `speed` times her speed on the ground (1.7, twice the 0.85 of
// before), in two runs: one on to the route's end, one back toward home that stops where it meets the wave's pulse, the spark
// (rules/leypulse.ts pulseRouteMetres), both `bars` bars long (84, three times the 28 of before); nothing is shown behind it (the
// line it used to reveal for a while is gone). Each early clear sends its own (at most `max` at once). Here where each run is along
// the route (m, from where the first link leaves the boot ring: rules/leypulse.ts routeLengths); the view draws it
// (render/leash/rainbow.ts).
import type { ForestMap } from "./map";
import type { PartyState } from "./party";
import { leyChain } from "./leylines";
import { pulseRouteMetres, routeLengths } from "./leypulse";
import { linkLine } from "./pulseRoute";
import type { Tuning } from "./tuning";

export interface RainbowKnobs { on: boolean; speed: number; max: number; bars?: number; spacing?: number; cell?: number; height?: number; route?: { spacing: number; height: number; cell: number; on?: boolean } }
export const rainbowKnobs = (t: Tuning): RainbowKnobs => ({ on: true, speed: 1.7, max: 4, ...(t.leyLines?.rainbow ?? {}) });
/** Its speed (m/s): a share of her speed on the ground. */
export const rainbowSpeed = (t: Tuning): number => Math.max(0.1, (t.groundSpeed ?? 19.25) * rainbowKnobs(t).speed);
/** The row of bars' length (m): `bars` of them `spacing` apart. */
export const rainbowLength = (t: Tuning): number => { const K = rainbowKnobs(t); return Math.max(1, Math.round(K.bars ?? 84)) * (K.spacing ?? 1.4); };

/** A wave: when it set off and from where (m along the route: the early-cleared soundsystem's stone). */
export interface RainbowWave { at: number; from: number }
/** One of a wave's two runs at a moment: its head (m along the route), which way it runs (1 on toward the route's end, -1 back
 *  toward home), and the stretch its bars may stand on (`lo` to `hi`, m): from where it set off to the route's end, or from the
 *  spark back up to where it set off. Its bars stand at head - dir x i x spacing (render/leash/rainbow.ts). */
export interface RainbowRun { head: number; dir: 1 | -1; lo: number; hi: number }

const total = (p: PartyState, map: ForestMap): number => routeLengths(p, map).reduce((a, b) => a + b, 0);

/** Every run on its way at `time`. The forward one till its last bar has passed the route's end; the backward one (only when it
 *  set off ahead of the spark) till its last bar has met the spark, or home. */
export function rainbowRuns(p: PartyState, map: ForestMap, waves: readonly RainbowWave[], time: number): RainbowRun[] {
  if (!waves.length) return [];
  const t = map.tuning, v = rainbowSpeed(t), L = rainbowLength(t), end = total(p, map), spark = pulseRouteMetres(p, map, time), out: RainbowRun[] = [];
  for (const w of waves) {
    const d = (time - w.at) * v;
    if (d < 0) continue;
    const ahead = w.from + d;
    if (ahead - L < end) out.push({ head: ahead, dir: 1, lo: w.from, hi: end });
    const lo = Math.max(0, spark), back = w.from - d;
    if (w.from > lo && back + L > lo) out.push({ head: back, dir: -1, lo, hi: w.from });
  }
  return out;
}

/** The waves still on their way (either run), the rest let go. */
export const liveRainbows = (p: PartyState, map: ForestMap, waves: readonly RainbowWave[], time: number): RainbowWave[] =>
  waves.filter(w => rainbowRuns(p, map, [w], time).length > 0);

/** A new wave from an early clear at `time`, setting off `from` m along the route; the oldest let go past `max`. */
export function sendRainbow(waves: RainbowWave[], t: Tuning, time: number, from: number): void {
  const K = rainbowKnobs(t);
  if (!K.on) return;
  waves.push({ at: time, from });
  while (waves.length > Math.max(1, K.max)) waves.shift();
}

/** How far along the route (m) an area's stone is: where its wave's soundsystem stands on the line; null off the route. */
export function stoneMetres(p: PartyState, map: ForestMap, cell: readonly [number, number]): number | null {
  const c = leyChain(p, map), lens = routeLengths(p, map);
  for (let j = 1; j < c.stones.length; j++) {
    if (c.stones[j].cell[0] !== cell[0] || c.stones[j].cell[1] !== cell[1]) continue;
    let m = 0;
    for (let k = 0; k < j && k < lens.length; k++) m += lens[k];
    return m;
  }
  return null;
}

/** The point `m` metres along the route (from where it leaves the boot ring) and the way it runs there (a unit vector). */
export function routePoint(p: PartyState, map: ForestMap, m: number): { x: number; z: number; dx: number; dz: number } | null {
  const c = leyChain(p, map), lens = routeLengths(p, map);
  for (let k = 0; k + 1 < c.stones.length; k++) {
    if (m > lens[k] && k + 2 < c.stones.length) { m -= lens[k]; continue; }
    const line = linkLine(map, c.stones[k], c.stones[k + 1]);
    let L = 0;
    for (let i = 1; i < line.length; i++) L += Math.hypot(line[i][0] - line[i - 1][0], line[i][1] - line[i - 1][1]);
    let want = Math.max(0, Math.min(1, m / Math.max(1, lens[k]))) * L;
    for (let i = 1; i < line.length; i++) {
      const a = line[i - 1], b = line[i], d = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (want <= d || i === line.length - 1) { const f = d > 0 ? Math.min(1, want / d) : 0; return { x: a[0] + (b[0] - a[0]) * f, z: a[1] + (b[1] - a[1]) * f, dx: d > 0 ? (b[0] - a[0]) / d : 1, dz: d > 0 ? (b[1] - a[1]) / d : 0 }; }
      want -= d;
    }
    const l = line[line.length - 1];
    return { x: l[0], z: l[1], dx: 1, dz: 0 };
  }
  return null;
}
