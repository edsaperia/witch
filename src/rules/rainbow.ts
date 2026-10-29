// The rainbow wave (Ed, 2026-10-29, after a playtest: "the spark feels slow but I don't know what to do with the time"): clearing a
// soundsystem early (its stone converted before its wave comes: rules/party.ts clearArea, `early`) sends a rainbow wave along the
// ley line, all the way along the route from home to its last stone, "a little slower than you fly at ground speed" so she can follow
// it (`speed`, a share of witch.groundSpeed), the line it passes over shown as it goes, even where it isn't drawn yet, and fading
// back after it's gone (`linger` s): "reveal now, not cumulative". Each early clear sends its own (at most `max` at once). Here
// where each is along the route (m, from where the first link leaves the boot ring: rules/leypulse.ts routeLengths) and the
// point on the ground there; the view draws it (render/leash/rainbow.ts, render/leylines.ts).
import type { ForestMap } from "./map";
import type { PartyState } from "./party";
import { leyChain } from "./leylines";
import { routeLengths } from "./leypulse";
import { linkLine } from "./pulseRoute";
import type { Tuning } from "./tuning";

export interface RainbowKnobs { on: boolean; speed: number; linger: number; max: number; bars?: number; spacing?: number; cell?: number; height?: number }
export const rainbowKnobs = (t: Tuning): RainbowKnobs => ({ on: true, speed: 0.85, linger: 6, max: 4, ...(t.leyLines?.rainbow ?? {}) });
/** Its speed (m/s): a share of her speed on the ground. */
export const rainbowSpeed = (t: Tuning): number => Math.max(0.1, (t.groundSpeed ?? 19.25) * rainbowKnobs(t).speed);

/** A wave on its way: its front and the end of the line it still shows (m along the route; the front no further than the route's
 *  end), and how far the line has faded back where it passed `linger` seconds ago (the tail). */
export interface RainbowFront { front: number; tail: number; total: number }

/** Every wave on its way at `time`, from when each set off (`starts`, game times). */
export function rainbowFronts(p: PartyState, map: ForestMap, starts: readonly number[], time: number): RainbowFront[] {
  if (!starts.length) return [];
  const t = map.tuning, v = rainbowSpeed(t), K = rainbowKnobs(t), total = routeLengths(p, map).reduce((a, b) => a + b, 0), out: RainbowFront[] = [];
  for (const at of starts) {
    const m = (time - at) * v, tail = m - K.linger * v;
    if (m >= 0 && tail < total) out.push({ front: Math.min(m, total), tail, total });
  }
  return out;
}

/** The waves still on their way (or still showing the line behind them), the rest let go. */
export const liveRainbows = (p: PartyState, map: ForestMap, starts: readonly number[], time: number): number[] => {
  const v = rainbowSpeed(map.tuning), K = rainbowKnobs(map.tuning), total = routeLengths(p, map).reduce((a, b) => a + b, 0);
  return starts.filter(at => (time - at) * v - K.linger * v < total);
};

/** A new wave from an early clear at `time`, the oldest let go past `max`. */
export function sendRainbow(starts: number[], t: Tuning, time: number): void {
  const K = rainbowKnobs(t);
  if (!K.on) return;
  starts.push(time);
  while (starts.length > Math.max(1, K.max)) starts.shift();
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
