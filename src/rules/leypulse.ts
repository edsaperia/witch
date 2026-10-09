// The ley line's pulse (Ed, 2026-10-06: "The wave timing indicator should point towards the leyline pulse"): a glow
// travelling along the line's current link, from the last stone reached toward the next wave's, as the countdown to that
// wave runs: at the start of the link just after a wave, at the next stone as the wave comes. Its place is a share of the
// link's length (by arc length, so it moves at an even pace however the link wanders). The HUD's wave pointer
// (render/view.ts) and the ley line's shader (render/leylines.ts) both take it from here, so they agree.
import type { ForestMap } from "./map";
import type { PartyState } from "./party";
import { pulseLinksIn, pulseMetres, waveCountdown } from "./party";
import { behindLength, linkLength } from "./pulseRoute";
import { leyChain, leyKey, questsMove, waveReached } from "./leylines";
import { cellKey } from "./party";

export type P2 = readonly [number, number];

/** How far the wave's pulse is past the last stone reached, in links (Ed, 2026-10-09: "Pure constant speed": its metres
 *  along the stretch at leyLines.pulseSpeed times the tempo, party.ts pulseMetres), so with two or more stones a wave it runs
 *  on through each in turn rather than jumping them as the wave lands; 0 to 1 with one. While home boots up it waits at the
 *  link's start: it sets off as the boot ends (Ed, 2026-10-06: "The wave pointer first appears when bootup finishes"). */
export function pulseProgress(p: PartyState, map: ForestMap, time: number): number {
  if (waveCountdown(p, map, time).booting) return 0;
  return pulseLinksIn(p, time);
}

/** The pulse's distance along the whole route (m), from where the first link leaves the boot ring: the route behind the last
 *  stone reached, and its run since. */
export function pulseRouteMetres(p: PartyState, map: ForestMap, time: number): number {
  if (!p.pulse) return 0;
  return behindLength(p, map) + (waveCountdown(p, map, time).booting ? 0 : pulseMetres(p, time));
}

const chainLens = new WeakMap<object, { key: number; lens: number[] }>();
/** Every link's length along the route (m), the first from where it leaves the boot ring (rules/pulseRoute.ts), as the chain
 *  stands (worked out again only when it changes). */
export function routeLengths(p: PartyState, map: ForestMap): number[] {
  const key = leyKey(p), hit = chainLens.get(p);
  if (hit && hit.key === key) return hit.lens;
  const c = leyChain(p, map), lens: number[] = [];
  for (let k = 0; k + 1 < c.stones.length; k++) lens.push(linkLength(map, c.stones[k], c.stones[k + 1]));
  chainLens.set(p, { key, lens });
  return lens;
}
/** Metres along the route (from where it leaves the boot ring) as links: the links passed and the share of the one it's in. */
export function metresToLinks(lens: readonly number[], m: number): number {
  for (let i = 0; i < lens.length; i++) { if (m < lens[i]) return i + Math.max(0, m) / lens[i]; m -= lens[i]; }
  return lens.length;
}
/** How far the line's front is along the route (m): `reveal` times the pulse's distance (Ed, 2026-10-08, kept 2026-10-09), but
 *  from the first stone, which the front reaches as the boot ends, till that catches up (the boot's branch, render/leylines.ts). */
export function frontMetres(p: PartyState, map: ForestMap, time: number, reveal: number, fromFirst = true): number {
  const m = pulseRouteMetres(p, map, time), C1 = routeLengths(p, map)[0] ?? 0;
  return fromFirst && m < C1 ? C1 + (reveal - 1) * m : reveal * m;
}

/** How many of the route's stones the line has reached (home not counted): the ley chain's current stone's place in it. */
export function stonesReached(p: PartyState, map: ForestMap): number {
  if (!p.areas) return p.wave; // (a bare party, as the render tests make: a stone a wave)
  const home = cellKey(map.centreCell), done = questsMove(map) ? p.leyDone : undefined;
  let n = 0;
  for (const k of p.areas.keys()) if (k !== home && (waveReached(p, k) !== undefined || done?.has(k))) n++;
  for (const k of p.waveReached?.keys() ?? []) if (k !== home && !p.areas.has(k)) n++; // (ruined since)
  for (const k of done?.keys() ?? []) if (!p.areas.has(k) && !p.waveReached?.has(k)) n++;
  return n;
}

/** The wave's pulse's distance along the whole route, in links from the treehouse: continuous and never going back (Ed,
 *  2026-10-08), the line's front reckoned from it (render/leylines.ts leyReveal: `reveal` times as far). */
export function pulseLinks(p: PartyState, map: ForestMap, time: number): number {
  return stonesReached(p, map) + pulseProgress(p, map, time);
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

/** How many times the pulse's pace the drawn line's tip grows (Ed, 2026-10-06: "The leyline can still travel three times faster than the pulse"). */
export const TIP_PACE = 3;
/** When the drawn ley line's growing tip reaches each stone on the route (Ed, 2026-10-06: "The column of light above a
 *  runestone first appears when the leyline meets it"): stone key → game time; null before the party spell (the tip
 *  hasn't set off). The shared seam for the line's reveal (render/leylines.ts leyReveal) and the stones' beacons
 *  (render/view/home.ts). The tip branches off the boot ring as the boot's pulse goes round it and reaches the first stone
 *  as the boot ends (Ed, 2026-10-07); then on at `reveal` times the pulse's distance along the route (frontMetres), the pulse
 *  at a constant speed (Ed, 2026-10-09): each stone's time by the pulse's distance and speed at `time` (now: a time ahead
 *  moves sooner as a knockdown's BPM speeds the pulse). A stone its wave (or quest) has already reached counts as reached
 *  then, if sooner; one cleared before its wave doesn't (waveReached). */
export function leyReachTimes(p: PartyState, map: ForestMap, time = p.pulse?.at ?? 0): Map<string, number> | null {
  if (clockStart(p) === null) return null;
  const r = Math.max(1.0001, map.tuning.leyLines.reveal ?? TIP_PACE), { stones } = leyChain(p, map), lens = routeLengths(p, map), out = new Map<string, number>();
  const done = (questsMove(map) ? p.leyDone : undefined) ?? new Map<string, number>();
  // The pulse's distance and speed now (a wave, so the front, at a constant speed along the route: Ed, 2026-10-09), and when
  // it sets off if it hasn't: each stone's time by the distance the pulse must run for the front to reach it.
  const v = p.pulse?.v || map.tuning.leyLines.pulseSpeed || 4, m = pulseRouteMetres(p, map, time), C1 = lens[0] ?? 0, wait = Math.max(0, (p.pulse?.at ?? 0) - time);
  let C = 0;
  stones.forEach((s, k) => {
    if (k > 0) C += lens[k - 1] ?? 0;
    const key = cellKey(s.cell), at = key === cellKey(map.centreCell) ? -Infinity : waveReached(p, key) ?? Infinity, was = Math.min(at, done.get(key) ?? Infinity); // (cleared early: at its wave's pace, not its clear)
    const mk = C < r * C1 ? Math.max(0, (C - C1) / (r - 1)) : C / r; // (the pulse's distance as the front reaches it)
    const tip = k === 0 ? -Infinity : k === 1 ? p.bootUntil : time + (mk > m ? wait : 0) + (mk - m) / v;
    out.set(key, Math.min(tip, was));
  });
  return out;
}

/** A runestone's column of light at `time`, given when the line's tip reached it (leyReachTimes; undefined: not on the
 *  line): null before the tip reaches it (no column); after, how far it has shot up (0-1, over the first `flare` × 0.35
 *  seconds) and its flare-up as the line meets it (1 fading to 0 over `flare` seconds), then up for good. */
export function columnShown(reachedAt: number | undefined, time: number, flare: number): { up: number; flare: number } | null {
  if (reachedAt === undefined || time < reachedAt) return null;
  const since = time - reachedAt;
  return { up: Math.min(1, since / Math.max(1e-3, flare * 0.35)), flare: Math.max(0, 1 - since / Math.max(1e-3, flare)) };
}
