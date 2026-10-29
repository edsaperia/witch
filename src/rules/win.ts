// The end of the route (Ed, 2026-10-10; docs/backlog/journey.md "The end of the route"): the night won.
//   Last call: the next wave's stone is the route's last (finalStone): the wave pointer shows 🎉 for it.
//   Stragglers: the last wave landed, while any enraged animal lives, a pointer to the one nearest the centre (winTarget).
//     Enraged legends don't count (Ed, 2026-10-11): they never hold the win up.
//   The island cleared (Ed, 2026-10-12): every area cleared before its wave, the waves still to come would only celebrate, so
//     the stragglers (then the lap) come at once, not when the wave's pulse reaches the route's end.
//   Victory lap: none left, two fast pulses set off at once from where the wave's pulse is on the line (Ed, 2026-10-12), one
//     racing back along the route to home (winPulse), the other on to the route's end (winPulseOut), every stone either passes
//     firing its fireworks (a waveCelebrate event, as a celebrated wave's), the music on to its victory section (musicPlan's
//     cue). The waves stop as the lap sets off.
//   The win, as the lap reaches home: the island's sigil (islandSigil), the night's legends woken (Ed, 2026-10-11: not in the
//     conga, but they come home and dance there as party legends) save any still enraged, which calm and go back to sleep in
//     their clearing; every other animal on the island a party animal in one giant conga line round
//     the dancefloor; fireworks from every standing soundsystem. Nothing fights after; the waves are over.
//   The conga follows her (Ed's playtest, 2026-10-26: "when you're on the ground in the home area, the line should follow
//     you"): while she's on the ground in the home area (not up at the treehouse, nor in the treetops), the line's leader
//     trails followLead m behind her along where she's walked and the rest follow single file, congaGap apart (its trail starts
//     through the line as it stands, so they file after her from where they are); anywhere else, back round the dancefloor.
//   Then it settles (settled; no card since Ed's 2026-10-26 "Remove the end cards"): the guidance pins lead her home, to the map
//     table for the islands found tonight by quests (found: g.islandsTonight; Ed, 2026-10-18: the win itself finds none, and only a
//     won night keeps them), then to bed (rules/guidance.ts).
// The losing still comes first: home's speakers down before the win, the party's over as ever (rules/partyOver.ts). No drawing.
import type { Game } from "./game";
import { runawayArrives } from "./runaway";
import type { Creature } from "./creatures";
import { LEGEND } from "./creatures";
import { befriend } from "./creatureStates";
import { lull } from "./legends";
import { islandSigilOf } from "./dancefloor";
import { allReached, cellKey } from "./party";
import { leyChain } from "./leylines";
import { pulseProgress } from "./leypulse";
import { goneAtWin } from "./finds";
import { homeArea } from "./homeArea";
import { updateTrail } from "./babies";

/** A point on one of the lap's pulses' runs: a stone (its key; "" for where it set off), where it stands, when the pulse passes
 *  it, and its place along the ley route as drawn (links: home's stone 0, the route's j-th stone j). */
export interface LapPoint { key: string; x: number; z: number; at: number; links: number }

export type WinPhase = "stragglers" | "lap" | "won";

export interface WinState {
  phase: WinPhase;
  /** When the last wave landed (stragglers began), the lap set off, and the night was won (game time). */
  lastWaveAt: number;
  lapAt?: number;
  wonAt?: number;
  /** The stragglers' pointer: the enraged animal nearest the centre, re-picked every win.retarget seconds. */
  target: number | null;
  pickedAt: number;
  /** The home pulse's run: where it set off (the wave's pulse's place as the lap began), then the stones reached, last first,
   *  home last. */
  lap: LapPoint[];
  /** Fired so far (the lap's points passed, where it set off among them). */
  fired: number;
  /** The outward pulse's run: where it set off, then the route's stones still ahead (each cleared before its wave), in order;
   *  just where it set off when the route was done. And its points passed. */
  out?: LapPoint[];
  firedOut?: number;
  /** The island's sigil (islandSigil: a kind's island its kind's, home the World Tree's). */
  sigil: string;
  /** The islands found tonight by quests (Ed, 2026-10-18: "Just winning an island does not unlock more islands"; g.islandsTonight:
   *  the sea chart's), and the night's dealt legends still enraged at the end (calmed, back to sleep), by kind. */
  found: string[];
  lost: string[];
  /** The finale has settled (win.settleAfter seconds after the win): the guidance pins lead her home (rules/guidance.ts) and the
   *  night is recorded on the sea chart. */
  settled: boolean;
  /** The conga: the leader's starting angle round the dancefloor (towards her, as the night's won), and how many dance in it. */
  lead: number;
  congaSize: number;
  /** Following her (WinTuning follow): where she's walked, newest first, flat [x0, z0, x1, z1, ...], begun through the line as it
   *  stood; none while the line goes round the dancefloor. */
  trail?: number[];
}

export interface WinTuning {
  /** The lap's pulses, m/s along the route (back to home, and on to its end). */
  lapSpeed: number;
  /** The conga: its pace round the dancefloor (m/s), the gap between dancers (m), and its smallest radius (m). */
  congaSpeed: number;
  congaGap: number;
  congaRadius: number;
  /** Joining: how fast a dancer walks to its place (m/s); out of her sight (this far from her, m) it's simply there. */
  joinSpeed: number;
  seen: number;
  /** Following her on the ground in the home area: on; the leader's distance behind her (m); and the dancers' pace to their places
   *  while following, at least joinSpeed and this many times her own speed (so the line keeps up with her broom). */
  follow: boolean;
  followLead: number;
  followSpeed: number;
  /** The woken legends' places (Ed, 2026-10-11, from art1's #691: a ring inside the conga's hid it from the ground): on the
   *  dancefloor's far (north) side, beyond the conga's ring and behind everything from the north-facing camera: arcs legendGap m
   *  outside the conga's circle, legendRow m apart, places legendSpace m apart along them from due north out to legendArc
   *  degrees across, none within legendSpace / 2 of the treehouse's clearing. */
  legendGap: number;
  legendRow: number;
  legendSpace: number;
  legendArc: number;
  /** The island's sigil on the dancefloor as it's won: seconds to draw it on, and how long it holds. */
  flareDraw: number;
  flare: number;
  /** Seconds from the win until it settles (the pins lead her home); how often the stragglers' pointer re-picks. */
  settleAfter: number;
  retarget: number;
}

export const WIN_DEFAULT: WinTuning = { lapSpeed: 120, congaSpeed: 2.5, congaGap: 2.4, congaRadius: 34, joinSpeed: 14, seen: 120, follow: true, followLead: 5, followSpeed: 1.25, legendGap: 12, legendRow: 14, legendSpace: 14, legendArc: 150, flareDraw: 3, flare: 16, settleAfter: 20, retarget: 0.25 };
const tuningOf = (g: Game): WinTuning => ({ ...WIN_DEFAULT, ...(g.tuning.win ?? {}) });

/** A legend (an area's, or any at the legend level). */
const isLegend = (c: Creature) => !!c.boss || c.level === LEGEND;

/** The route's last wave has landed: no stone left to wake. */
export const routeDone = (g: Game): boolean => g.party.wave > 0 && g.party.next.length === 0;

/** The island's cleared (Ed, 2026-10-12): every area on it has the party (or is ruined) before the route's last wave, which
 *  would only celebrate. */
export const islandCleared = (g: Game): boolean => g.party.wave > 0 && allReached(g.party, g.map);

/** The next wave's stone is the route's last (the wave pointer's 🎉). */
export const finalStone = (g: Game): boolean => g.party.next.length > 0 && g.party.afterNext.length === 0;

/** An enraged animal that holds the win up: not a legend (Ed, 2026-10-11), not gone. */
export const straggler = (c: Creature): boolean => !c.gone && !!c.enraged && !isLegend(c);

/** The straggler nearest the centre (the dancefloor), or null. */
export function nearestStraggler(g: Game): Creature | null {
  const d0 = g.map.dancefloor;
  let best: Creature | null = null, bd = Infinity;
  for (const c of g.creatures) if (straggler(c)) { const d = Math.hypot(c.x - d0.x, c.z - d0.z); if (d < bd) { bd = d; best = c; } }
  return best;
}

/** The stragglers' pointer's creature, while there are stragglers. */
export const winTarget = (g: Game): Creature | null => (g.win?.phase === "stragglers" && g.win.target !== null ? g.creatures[g.win.target] : null);

/** The night's dealt legends (rules/rosters.ts dealLegends: the map's legendKinds, each a legend in an area of its kind); a map
 *  dealt none (no rosters: the radius map, old seeds' tools) has every area legend. */
export const dealtLegends = (g: Game): Creature[] => { const K = g.map.legendKinds ?? []; return g.creatures.filter(c => !!c.boss && (!K.length || K.includes(c.species))); };

/** The island's own sigil (art/sigils.js islandSigil of rules/dancefloor.ts islandOf: the rosters' island's kind, its legend
 *  kind's sigil; home's, the World Tree). */
export const islandSigil = (g: Game): string => islandSigilOf(g.map);

/** The island's sigil flaring on the dancefloor as the night's won: drawn on again over win.flareDraw seconds, held for
 *  win.flare seconds (then the floor's party patterns again), or null. */
export function winFlare(g: Game): { sigil: string; drawn: number } | null {
  const w = g.win;
  if (w?.phase !== "won" || w.wonAt === undefined) return null;
  const T = tuningOf(g), since = g.clock.time - w.wonAt;
  return since < T.flare ? { sigil: w.sigil, drawn: Math.min(1, since / Math.max(1e-3, T.flareDraw)) } : null;
}

/** The lap's two runs (Ed, 2026-10-12), both from where the wave's pulse is on the ley line now (at the route's last stone once
 *  it's done): home, through every stone reached, last first; and out, through the stones still ahead, to the route's end. */
function lapRuns(g: Game, from: number, speed: number): { home: LapPoint[]; out: LapPoint[] } {
  const p = g.party, c = leyChain(p, g.map), S = c.stones, n = S.length;
  const links = Math.max(0, Math.min(n - 1, c.current + (routeDone(g) ? 0 : pulseProgress(p, g.map, from))));
  const k = Math.floor(links), a = S[k], b = S[Math.min(n - 1, k + 1)], f = links - k;
  const start: LapPoint = { key: "", x: a.x + (b.x - a.x) * f, z: a.z + (b.z - a.z) * f, at: from, links };
  const run = (stones: number[]): LapPoint[] => {
    let d = 0, prev: { x: number; z: number } = start;
    return [start, ...stones.map(i => { const s = S[i]; d += Math.hypot(s.x - prev.x, s.z - prev.z); prev = s; return { key: i === 0 ? "home" : cellKey(s.cell), x: s.x, z: s.z, at: from + d / speed, links: i }; })];
  };
  const home: number[] = [], out: number[] = [];
  for (let i = k; i >= 0; i--) home.push(i);
  for (let i = k + 1; i < n; i++) out.push(i);
  return { home: run(home), out: run(out) };
}

/** Where a run's pulse is at time `t`: between which points and how far (0 to 1), and its place along the route; null once
 *  it's there (or with nowhere to go). */
function along(R: LapPoint[] | undefined, t: number): { from: { x: number; z: number }; to: { x: number; z: number }; share: number; x: number; z: number; links: number } | null {
  if (!R || R.length < 2 || t >= R[R.length - 1].at) return null;
  let i = 0;
  while (i < R.length - 2 && t >= R[i + 1].at) i++;
  const a = R[i], b = R[i + 1], share = Math.max(0, Math.min(1, (t - a.at) / Math.max(1e-6, b.at - a.at)));
  return { from: a, to: b, share, x: a.x + (b.x - a.x) * share, z: a.z + (b.z - a.z) * share, links: a.links + (b.links - a.links) * share };
}

/** Where the lap's home pulse is: between which points and how far (0 to 1), or null outside the lap. */
/** (`links`: its place along the ley route as drawn, home's stone 0 and the route's j-th stone j.) */
export function winPulse(g: Game): ReturnType<typeof along> {
  const w = g.win;
  return w?.phase === "lap" ? along(w.lap, g.clock.time) : null;
}

/** Where the lap's outward pulse is (on to the route's end, through the stones cleared before their waves), or null: none
 *  outside the lap and after it, nor once it's there (it may still run after the win). */
export function winPulseOut(g: Game): ReturnType<typeof along> {
  const w = g.win;
  return w && w.phase !== "stragglers" ? along(w.out, g.clock.time) : null;
}

/** How far along the route (links) the line is lit from the lap on (the outward pulse lights it as it goes; all of it once
 *  it's there), or null before the lap. */
export function winLit(g: Game): number | null {
  const w = g.win;
  if (!w || w.phase === "stragglers" || !w.out?.length) return null;
  return winPulseOut(g)?.links ?? w.out[w.out.length - 1].links;
}

/** The conga's dancers: every animal on the island but the legends, in their places' order (round from the leader). */
function congaOrder(g: Game, lead: number): Creature[] {
  const d0 = g.map.dancefloor, all = g.creatures.filter(c => !c.gone && !isLegend(c));
  const back = (c: Creature) => { const a = Math.atan2(c.z - d0.z, c.x - d0.x); return ((lead - a) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2); };
  return all.sort((a, b) => back(a) - back(b) || a.id - b.id);
}

/** The conga's circle: big enough for every dancer, never under win.congaRadius. */
export const congaRadius = (n: number, T: WinTuning): number => Math.max(T.congaRadius, (n * T.congaGap) / (Math.PI * 2));

/** Dancer i's place at time `t` (the leader, 0, round the dancefloor anticlockwise; each one congaGap behind the one before). */
export function congaPlace(g: Game, i: number, n: number, t: number): { x: number; z: number; facing: 1 | -1; away: boolean } {
  const T = tuningOf(g), w = g.win!, R = congaRadius(n, T), d0 = g.map.dancefloor;
  const a = w.lead + (T.congaSpeed * (t - (w.wonAt ?? t))) / R - (i * T.congaGap) / R;
  const vx = -Math.sin(a), vz = Math.cos(a);
  return { x: d0.x + Math.cos(a) * R, z: d0.z + Math.sin(a) * R, facing: vx < 0 ? -1 : 1, away: vz < 0 };
}

/** The woken legends' `n` places north of the dancefloor (WinTuning legendGap..legendArc): along arcs round it beyond the conga's
 *  circle, from due north outward, alternately west and east, a row further out once one's full; clear of the treehouse. */
export function legendPlaces(g: Game, n: number): { x: number; z: number }[] {
  const T = tuningOf(g), d0 = g.map.dancefloor, th = g.map.treehouse, keep = g.tuning.treehouse.clear + T.legendSpace / 2;
  const north = -Math.PI / 2, half = (T.legendArc * Math.PI) / 360, out: { x: number; z: number }[] = [];
  for (let row = 0; out.length < n && row < 64; row++) {
    const R = congaRadius(Math.max(0, g.win?.congaSize ?? 0), T) + T.legendGap + row * T.legendRow, step = T.legendSpace / R;
    for (let k = 0; out.length < n && k * step <= half; k++) for (const side of k ? [-1, 1] : [1]) {
      if (out.length >= n) break;
      const a = north + side * k * step, p = { x: d0.x + Math.cos(a) * R, z: d0.z + Math.sin(a) * R };
      if (Math.hypot(p.x - th.x, p.z - th.z) >= keep) out.push(p);
    }
  }
  return out;
}

/** The win itself (the lap home): the legends woken or lulled, everyone else a party animal in the conga, her leash let go. */
function win(g: Game, time: number): void {
  const w = g.win!, d0 = g.map.dancefloor;
  w.phase = "won"; w.wonAt = time; w.sigil = islandSigil(g);
  goneAtWin(g); // (a find not yet taken is gone; one on loan stays hers till she sleeps: rules/finds.ts)
  // Her leash let go: every one of them dances in the line now.
  for (const W of g.witches) { for (const id of [...W.leash.stack, ...W.leash.placed.map(p => p.id)]) g.creatures[id].leashed = false; W.leash.stack = []; W.leash.placed = []; W.leash.talk = null; }
  g.combat.busy.clear();
  // The night's legends: the enraged ones calm and sleep again; the rest wake and come home to dance.
  const legends = dealtLegends(g), woken: Creature[] = [];
  w.found = [...(g.islandsTonight ?? [])]; // (only the quests done tonight find islands: Ed, 2026-10-18)
  for (const c of legends) {
    if (c.legendState === "angry" || c.enraged) { lull(c, time); w.lost.push(c.species); continue; }
    woken.push(c);
  }
  // One still running for the beach (rules/runaway.ts): there at once, asleep, as it stays (Ed, 2026-10-28: "stay there if it's won");
  // nothing fights after the win, so its run would stop where it stood, and the line would have it back.
  for (const c of g.creatures) if (c.fleeUntil && c.beach && !c.gone) runawayArrives(c, time);
  // Every other animal: a party animal, in the line.
  w.lead = Math.atan2(g.witch.z - d0.z, g.witch.x - d0.x);
  const line = congaOrder(g, w.lead);
  w.congaSize = line.length;
  // The woken legends dance on the far side, north of the dancefloor beyond the line (legendPlaces), west of north first.
  const places = legendPlaces(g, woken.length);
  woken.forEach((c, k) => {
    Object.assign(c, { legendState: "happy", stateAt: time, enraged: false, state: "happy", partyLegend: true, fight: undefined, siege: undefined, charge: undefined, run: undefined, questOpen: false, asleep: false, napUntil: undefined, legend: undefined, finale: -(k + 1) });
    Object.assign(c, { anchorX: places[k].x, anchorZ: places[k].z, range: 3, dancing: true });
  });
  line.forEach((c, i) => { befriend(c, time); Object.assign(c, { friendly: true, asleep: false, napUntil: undefined, wakeUntil: undefined, bed: undefined, travelling: undefined, finale: i, dancing: true, fleeUntil: undefined, dazed: undefined, dazedUntil: undefined, watchUntil: undefined, hunting: undefined, swoop: undefined }); });
  g.byArea = null;
}

/** Moves a finale dancer toward `to`: at `speed` (win.joinSpeed) in her sight, at once out of it; there, it keeps its place. */
function toward(g: Game, c: Creature, to: { x: number; z: number }, dt: number, T: WinTuning, speed = T.joinSpeed): void {
  const dx = to.x - c.x, dz = to.z - c.z, d = Math.hypot(dx, dz), wx = g.witch.x, wz = g.witch.z;
  const unseen = Math.hypot(c.x - wx, c.z - wz) > T.seen && Math.hypot(to.x - wx, to.z - wz) > T.seen;
  const step = speed * dt;
  if (unseen || d <= step) { c.x = to.x; c.z = to.z; } else { c.x += (dx / d) * step; c.z += (dz / d) * step; if (Math.abs(dx) > 1e-6) c.facing = dx < 0 ? -1 : 1; c.away = dz < 0; }
  c.tx = c.x; c.tz = c.z; c.moving = d > 0.05;
}

/** Whether the line follows her now: the night won, and she's on the ground in the home area, off the treehouse. */
export function congaFollows(g: Game): boolean {
  const W = g.witch;
  return tuningOf(g).follow && won(g) && W.mode === "ground" && !W.perch && !W.seated && !W.falling && homeArea(g.map).inside(W.x, W.z);
}

/** The places `first`, `first + gap`, ... metres back along her trail from her at (x, z), `n` of them, into `out` (flat x, z),
 *  in one walk along it; past its far end, its far end. */
export function trailPlaces(trail: readonly number[], x: number, z: number, first: number, gap: number, n: number, out: number[]): number[] {
  out.length = n * 2;
  let px = x, pz = z, done = 0, at = 0; // (at: how far back (px, pz) is)
  for (let i = 0; i < trail.length && done < n; i += 2) {
    const qx = trail[i], qz = trail[i + 1], seg = Math.hypot(qx - px, qz - pz);
    while (done < n && first + done * gap <= at + seg && seg > 1e-9) { const k = (first + done * gap - at) / seg; out[done * 2] = px + (qx - px) * k; out[done * 2 + 1] = pz + (qz - pz) * k; done++; }
    at += seg; px = qx; pz = qz;
  }
  for (; done < n; done++) { out[done * 2] = px; out[done * 2 + 1] = pz; }
  return out;
}
const PLACES: number[] = [];

/** The end of the route, a step (after everything else has moved: the finale's dancers keep their places). */
export function stepWin(g: Game, dt: number): void {
  if (g.partyOver && g.win?.phase !== "won") return; // (lost first: the afterparty's)
  const time = g.clock.time, T = tuningOf(g);
  if (!g.win) {
    if (!routeDone(g) && !islandCleared(g)) return;
    g.win = { phase: "stragglers", lastWaveAt: time, target: null, pickedAt: -Infinity, lap: [], fired: 0, sigil: islandSigil(g), found: [], lost: [], settled: false, lead: 0, congaSize: 0 };
  }
  const w = g.win;
  if (w.phase === "stragglers") {
    if (time - w.pickedAt >= T.retarget) { w.target = nearestStraggler(g)?.id ?? null; w.pickedAt = time; }
    if (w.target === null) { w.phase = "lap"; w.lapAt = time; const R = lapRuns(g, time, T.lapSpeed); w.lap = R.home; w.out = R.out; w.fired = 0; w.firedOut = 0; }
    else return;
  }
  // each stone a pulse passes fires its fireworks (the route's stones, either way; home's at the win, below)
  const fire = (R: LapPoint[], i: number, upTo: number): number => {
    for (; i < upTo && time >= R[i].at; i++) if (R[i].key) g.waveEvents.push({ kind: "waveCelebrate", key: R[i].key, x: R[i].x, z: R[i].z, at: time, wave: g.party.wave });
    return i;
  };
  if (w.out) w.firedOut = fire(w.out, w.firedOut ?? 0, w.out.length);
  if (w.phase === "lap") {
    w.fired = fire(w.lap, w.fired, w.lap.length - 1);
    if (time < w.lap[w.lap.length - 1].at) return;
    w.fired = w.lap.length;
    win(g, time);
    // fireworks from every standing soundsystem, home's ring among them
    for (const [key, h] of g.combat.sounds) if (h.hp > 0) g.waveEvents.push({ kind: "waveCelebrate", key, x: h.x, z: h.z, at: time, wave: g.party.wave });
  }
  // Won: the line goes round (or follows her), the legends dance at home; then it settles.
  const n = w.congaSize, W = g.witch, follow = congaFollows(g);
  if (!follow) w.trail = undefined;
  else {
    if (!w.trail) { // (begun through the line as it stands, leader first, so they file after her from where they are)
      const at: Creature[] = [];
      for (const c of g.creatures) if (c.finale !== undefined && c.finale >= 0 && !c.gone) at[c.finale] = c;
      w.trail = []; for (const c of at) if (c) w.trail.push(c.x, c.z);
    }
    w.trail = updateTrail(w.trail, W.x, W.z, T.followLead + n * T.congaGap + 10);
    trailPlaces(w.trail, W.x, W.z, T.followLead, T.congaGap, n, PLACES);
  }
  const pace = follow ? Math.max(T.joinSpeed, T.followSpeed * Math.hypot(W.vx, W.vz)) : T.joinSpeed;
  for (const c of g.creatures) {
    if (c.finale === undefined || c.gone) continue;
    if (c.finale >= 0 && follow) {
      const p = { x: PLACES[c.finale * 2], z: PLACES[c.finale * 2 + 1] };
      toward(g, c, p, dt, T, pace);
      if (Math.hypot(p.x - c.x, p.z - c.z) < 0.5 && c.finale > 0) { const a = c.finale - 1, ax = PLACES[a * 2] - c.x, az = PLACES[a * 2 + 1] - c.z; if (Math.abs(ax) > 0.05) c.facing = ax < 0 ? -1 : 1; c.away = az < 0; }
      else if (c.finale === 0 && Math.hypot(p.x - c.x, p.z - c.z) < 0.5) { const ax = W.x - c.x; if (Math.abs(ax) > 0.05) c.facing = ax < 0 ? -1 : 1; c.away = W.z - c.z < 0; }
    } else if (c.finale >= 0) { const p = congaPlace(g, c.finale, n, time); toward(g, c, p, dt, T); if (Math.hypot(p.x - c.x, p.z - c.z) < 0.5) { c.facing = p.facing; c.away = p.away; c.moving = true; } }
    else { toward(g, c, { x: c.anchorX, z: c.anchorZ }, dt, T); if (!c.moving) c.away = false; } // (there: facing us, dancing in place)
  }
  if (!w.settled && time >= (w.wonAt ?? Infinity) + T.settleAfter) w.settled = true;
}

/** Whether the night's won (nothing fights, no waves, nothing hurts her). */
export const won = (g: Game): boolean => g.win?.phase === "won";

/** Whether the waves are done for the night: the route's end, or the party's over. */
export const wavesOver = (g: Game): boolean => !!g.partyOver || won(g);
