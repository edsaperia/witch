// The ley line's pulse (Ed, 2026-10-06: "The wave timing indicator should point towards the leyline pulse"): a glow
// travelling along the line's current link, from the last stone reached toward the next wave's, as the countdown to that
// wave runs: at the start of the link just after a wave, at the next stone as the wave comes. Its place is a share of the
// link's length (by arc length, so it moves at an even pace however the link wanders). The HUD's wave pointer
// (render/view.ts) and the ley line's shader (render/leylines.ts) both take it from here, so they agree.
import type { ForestMap } from "./map";
import type { PartyState } from "./party";
import { waveCountdown } from "./party";
import { leyChain } from "./leylines";

export type P2 = readonly [number, number];

/** How far along the current link the pulse is, 0 to 1: the countdown's share run. While home boots up it waits at the
 *  link's start: it sets off as the boot ends (Ed, 2026-10-06: "The wave pointer first appears when bootup finishes"). */
export function pulseProgress(p: PartyState, map: ForestMap, time: number): number {
  const cd = waveCountdown(p, map, time);
  if (cd.booting) return 0;
  return Math.max(0, Math.min(1, Number.isFinite(cd.gone) ? cd.gone : 0));
}

/** Seconds the wave pointer takes to fade in once the boot is over. */
export const POINTER_FADE = 0.6;
/** How much the wave pointer shows, 0 to 1: none while home boots up (the dancefloor's boot ring shows that), fading in
 *  over POINTER_FADE seconds as the boot ends and the pulse sets off, then fully. */
export function pointerShown(p: PartyState, map: ForestMap, time: number): number {
  if (waveCountdown(p, map, time).booting) return 0;
  if (!(p.bootUntil > 0)) return 1;
  return Math.max(0, Math.min(1, (time - p.bootUntil) / POINTER_FADE));
}

/** The point a share t (0 to 1) of the way along a polyline, by arc length. */
export function pointAlong(line: readonly P2[], t: number): { x: number; z: number } {
  if (!line.length) return { x: 0, z: 0 };
  if (line.length === 1) return { x: line[0][0], z: line[0][1] };
  let total = 0;
  for (let i = 1; i < line.length; i++) total += Math.hypot(line[i][0] - line[i - 1][0], line[i][1] - line[i - 1][1]);
  let want = Math.max(0, Math.min(1, t)) * total;
  for (let i = 1; i < line.length; i++) {
    const a = line[i - 1], b = line[i], d = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (want <= d || i === line.length - 1) { const f = d > 0 ? Math.min(1, want / d) : 0; return { x: a[0] + (b[0] - a[0]) * f, z: a[1] + (b[1] - a[1]) * f }; }
    want -= d;
  }
  const l = line[line.length - 1];
  return { x: l[0], z: l[1] };
}

/** The current link as a straight line, from the last stone reached to the next (the ley chain's), when the drawn
 *  route isn't to hand; null when there's no next stone. */
export function straightLink(p: PartyState, map: ForestMap): P2[] | null {
  const c = leyChain(p, map, 1, 0), a = c.stones[c.current], b = c.stones[c.current + 1];
  return a && b ? [[a.x, a.z], [b.x, b.z]] : null;
}

/** Where the pulse is now: along `link` (the drawn route of the current link, if the renderer has it; else straight);
 *  null while home boots up (it hasn't set off). */
export function leyPulse(p: PartyState, map: ForestMap, time: number, link?: readonly P2[] | null): { x: number; z: number; t: number } | null {
  if (waveCountdown(p, map, time).booting) return null;
  const line = link && link.length > 1 ? link : straightLink(p, map);
  if (!line) return null;
  const t = pulseProgress(p, map, time);
  return { ...pointAlong(line, t), t };
}

/** When the game clock starts (Ed, 2026-10-06: at the party spell): the spell's time, 0 in a build without the spell (the
 *  start of play), null while waiting for it (the clock at 00:00, not running). */
export function clockStart(p: PartyState): number | null {
  return p.spellAt === undefined ? 0 : p.spellAt;
}
/** The game clock's seconds now: from its start, 0 before it. */
export function clockSeconds(p: PartyState, time: number): number {
  const s = clockStart(p);
  return s === null ? 0 : Math.max(0, time - s);
}
/** Whether to prompt her to cast the party spell (waiting for it). */
export const awaitingSpell = (p: PartyState): boolean => p.spellAt === null;

/** The game clock (Ed, 2026-10-06: "a game clock at the top middle of the screen mm:ss counting up from 0"): minutes and
 *  seconds of play, the minutes running on past 99 as needed. */
export function clockText(seconds: number): string {
  const s = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}
