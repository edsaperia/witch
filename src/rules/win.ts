// The end of the route (Ed, 2026-10-10; docs/backlog/journey.md "The end of the route"): the night won.
//   Last call: the next wave's stone is the route's last (finalStone): the wave pointer shows 🎉 for it.
//   Stragglers: the last wave landed, while any enraged animal lives, a pointer to the one nearest the centre (winTarget).
//     Enraged legends don't count (Ed, 2026-10-11): they never hold the win up.
//   Victory lap: none left, the pulse races back along the route to home (winPulse), every stone it passes firing its
//     fireworks (a waveCelebrate event, as a celebrated wave's), the music on to its victory section (musicPlan's cue).
//   The win, as the lap reaches home: the island's sigil (islandSigil), the night's legends woken (Ed, 2026-10-11: not in the
//     conga, but they come home and dance there as party legends) save any still enraged, which calm and go back to sleep in
//     their clearing, their islands not found; every other animal on the island a party animal in one giant conga line round
//     the dancefloor; fireworks from every standing soundsystem. Nothing fights after; the waves are over.
//   Then the "Night won" card (card), listing the islands found (found; lost: the enraged legends' kinds).
// The losing still comes first: home's speakers down before the win, the party's over as ever (rules/partyOver.ts). No drawing.
import type { Game } from "./game";
import type { Creature } from "./creatures";
import { LEGEND } from "./creatures";
import { befriend } from "./creatureStates";
import { lull } from "./legends";

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
  /** The lap's stones, last reached first, home last: where each stands and when the pulse passes it. */
  lap: { key: string; x: number; z: number; at: number }[];
  /** Fired so far (the lap's stones passed). */
  fired: number;
  /** The island's sigil (its legend kind's; home's own for now: "worldTree", art4's islandSigil hook). */
  sigil: string;
  /** The night's dealt legends won (woken, their islands found: the card's, and the sea chart's), and those still enraged at the
   *  end (calmed, back to sleep; their islands not found), by kind (species). */
  found: string[];
  lost: string[];
  /** The "Night won" card is up (win.cardAfter seconds after the win). */
  card: boolean;
  /** The conga: the leader's starting angle round the dancefloor (towards her, as the night's won), and how many dance in it. */
  lead: number;
  congaSize: number;
}

export interface WinTuning {
  /** The lap's pulse, m/s along the route back to home. */
  lapSpeed: number;
  /** The conga: its pace round the dancefloor (m/s), the gap between dancers (m), and its smallest radius (m). */
  congaSpeed: number;
  congaGap: number;
  congaRadius: number;
  /** Joining: how fast a dancer walks to its place (m/s); out of her sight (this far from her, m) it's simply there. */
  joinSpeed: number;
  seen: number;
  /** The woken legends' ring round the dancefloor (m). */
  legendRing: number;
  /** Seconds from the win to the card; how often the stragglers' pointer re-picks. */
  cardAfter: number;
  retarget: number;
}

export const WIN_DEFAULT: WinTuning = { lapSpeed: 120, congaSpeed: 2.5, congaGap: 2.4, congaRadius: 34, joinSpeed: 14, seen: 120, legendRing: 22, cardAfter: 20, retarget: 0.25 };
const tuningOf = (g: Game): WinTuning => ({ ...WIN_DEFAULT, ...(g.tuning.win ?? {}) });

/** A legend (an area's, or any at the legend level). */
const isLegend = (c: Creature) => !!c.boss || c.level === LEGEND;

/** The route's last wave has landed: no stone left to wake. */
export const routeDone = (g: Game): boolean => g.party.wave > 0 && g.party.next.length === 0;

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

/** The night's dealt legends (part A's rosters to come: every area legend on this island for now). */
export const dealtLegends = (g: Game): Creature[] => g.creatures.filter(c => !!c.boss);

/** The island's own sigil (part A: its legend kind's; for now home's, the World Tree). */
export const islandSigil = (_g: Game): string => "worldTree";

/** The lap's stones: the route's, last reached first, then home. */
function lapStones(g: Game, from: number, speed: number): WinState["lap"] {
  const p = g.party, order = [...(p.waveReached ?? new Map()).entries()].sort((a, b) => b[1].wave - a[1].wave || b[1].at - a[1].at);
  const pts: { key: string; x: number; z: number }[] = [];
  for (const [key] of order) { const [cx, cy] = key.split(",").map(Number); const s = g.map.soundsystemSpot(cx, cy); pts.push({ key, x: s.x, z: s.z }); }
  pts.push({ key: "home", x: g.map.dancefloor.x, z: g.map.dancefloor.z });
  let d = 0;
  return pts.map((q, i) => { if (i > 0) d += Math.hypot(q.x - pts[i - 1].x, q.z - pts[i - 1].z); return { ...q, at: from + d / speed }; });
}

/** Where the lap's pulse is: between which stones and how far (0 to 1), or null outside the lap. */
export function winPulse(g: Game): { from: { x: number; z: number }; to: { x: number; z: number }; share: number; x: number; z: number } | null {
  const w = g.win;
  if (!w || w.phase !== "lap" || w.lap.length < 2) return null;
  const t = g.clock.time;
  let i = 0;
  while (i < w.lap.length - 2 && t >= w.lap[i + 1].at) i++;
  const a = w.lap[i], b = w.lap[i + 1], share = Math.max(0, Math.min(1, (t - a.at) / Math.max(1e-6, b.at - a.at)));
  return { from: a, to: b, share, x: a.x + (b.x - a.x) * share, z: a.z + (b.z - a.z) * share };
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

/** The win itself (the lap home): the legends woken or lulled, everyone else a party animal in the conga, her leash let go. */
function win(g: Game, time: number): void {
  const w = g.win!, T = tuningOf(g), d0 = g.map.dancefloor;
  w.phase = "won"; w.wonAt = time; w.sigil = islandSigil(g);
  // Her leash let go: every one of them dances in the line now.
  for (const W of g.witches) { for (const id of [...W.leash.stack, ...W.leash.placed.map(p => p.id)]) g.creatures[id].leashed = false; W.leash.stack = []; W.leash.placed = []; W.leash.talk = null; }
  g.combat.busy.clear();
  // The night's legends: the enraged ones calm and sleep again (their islands not found); the rest wake and come home to dance.
  const legends = dealtLegends(g), woken: Creature[] = [];
  for (const c of legends) {
    if (c.legendState === "angry" || c.enraged) { lull(c, time); w.lost.push(c.species); continue; }
    woken.push(c); w.found.push(c.species);
  }
  woken.forEach((c, k) => {
    Object.assign(c, { legendState: "happy", stateAt: time, enraged: false, state: "happy", partyLegend: true, fight: undefined, siege: undefined, charge: undefined, run: undefined, questOpen: false, asleep: false, napUntil: undefined, legend: undefined, finale: -(k + 1) });
    const a = (k / Math.max(1, woken.length)) * Math.PI * 2;
    Object.assign(c, { anchorX: d0.x + Math.cos(a) * T.legendRing, anchorZ: d0.z + Math.sin(a) * T.legendRing, range: 3, dancing: true });
  });
  // Every other animal: a party animal, in the line.
  w.lead = Math.atan2(g.witch.z - d0.z, g.witch.x - d0.x);
  const line = congaOrder(g, w.lead);
  line.forEach((c, i) => { befriend(c, time); Object.assign(c, { friendly: true, asleep: false, napUntil: undefined, wakeUntil: undefined, bed: undefined, travelling: undefined, finale: i, dancing: true, fleeUntil: undefined, dazed: undefined, dazedUntil: undefined, watchUntil: undefined, hunting: undefined, swoop: undefined }); });
  w.congaSize = line.length;
  g.byArea = null;
}

/** Moves a finale dancer toward `to`: at win.joinSpeed in her sight, at once out of it; there, it keeps its place. */
function toward(g: Game, c: Creature, to: { x: number; z: number }, dt: number, T: WinTuning): void {
  const dx = to.x - c.x, dz = to.z - c.z, d = Math.hypot(dx, dz), wx = g.witch.x, wz = g.witch.z;
  const unseen = Math.hypot(c.x - wx, c.z - wz) > T.seen && Math.hypot(to.x - wx, to.z - wz) > T.seen;
  const step = T.joinSpeed * dt;
  if (unseen || d <= step) { c.x = to.x; c.z = to.z; } else { c.x += (dx / d) * step; c.z += (dz / d) * step; if (Math.abs(dx) > 1e-6) c.facing = dx < 0 ? -1 : 1; c.away = dz < 0; }
  c.tx = c.x; c.tz = c.z; c.moving = d > 0.05;
}

/** The end of the route, a step (after everything else has moved: the finale's dancers keep their places). */
export function stepWin(g: Game, dt: number): void {
  if (g.partyOver && g.win?.phase !== "won") return; // (lost first: the afterparty's)
  const time = g.clock.time, T = tuningOf(g);
  if (!g.win) {
    if (!routeDone(g)) return;
    g.win = { phase: "stragglers", lastWaveAt: time, target: null, pickedAt: -Infinity, lap: [], fired: 0, sigil: islandSigil(g), found: [], lost: [], card: false, lead: 0, congaSize: 0 };
  }
  const w = g.win;
  if (w.phase === "stragglers") {
    if (time - w.pickedAt >= T.retarget) { w.target = nearestStraggler(g)?.id ?? null; w.pickedAt = time; }
    if (w.target === null) { w.phase = "lap"; w.lapAt = time; w.lap = lapStones(g, time, T.lapSpeed); }
    return;
  }
  if (w.phase === "lap") {
    // each stone the pulse passes fires its fireworks (the route's stones; home's at the win, below)
    while (w.fired < w.lap.length - 1 && time >= w.lap[w.fired].at) {
      const s = w.lap[w.fired++];
      g.waveEvents.push({ kind: "waveCelebrate", key: s.key, x: s.x, z: s.z, at: time, wave: g.party.wave });
    }
    if (time < w.lap[w.lap.length - 1].at) return;
    w.fired = w.lap.length;
    win(g, time);
    // fireworks from every standing soundsystem, home's ring among them
    for (const [key, h] of g.combat.sounds) if (h.hp > 0) g.waveEvents.push({ kind: "waveCelebrate", key, x: h.x, z: h.z, at: time, wave: g.party.wave });
  }
  // Won: the line goes round, the legends dance at home; the card comes up.
  const n = w.congaSize;
  for (const c of g.creatures) {
    if (c.finale === undefined || c.gone) continue;
    if (c.finale >= 0) { const p = congaPlace(g, c.finale, n, time); toward(g, c, p, dt, T); if (Math.hypot(p.x - c.x, p.z - c.z) < 0.5) { c.facing = p.facing; c.away = p.away; c.moving = true; } }
    else toward(g, c, { x: c.anchorX, z: c.anchorZ }, dt, T);
  }
  if (!w.card && time >= (w.wonAt ?? Infinity) + T.cardAfter) w.card = true;
}

/** Whether the night's won (nothing fights, no waves, nothing hurts her). */
export const won = (g: Game): boolean => g.win?.phase === "won";

/** Whether the waves are done for the night: the route's end, or the party's over. */
export const wavesOver = (g: Game): boolean => !!g.partyOver || won(g);
