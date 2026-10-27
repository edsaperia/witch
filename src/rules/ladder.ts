// The quality ladder (Ed, 2026-10-26: "scenery is not gameplay critical so it's better to preserve framerate and draw fewer
// things or draw slower if necessary"; the order his, from India's quality-ladder study, previews/ed/quality-ladder/): rungs from
// full quality down, each a little cheaper and a little plainer than the one before; the controller steps down quickly while the
// frames are over budget and back up slowly while there's room, and stops climbing for the night if it keeps flipping. Live rungs
// change the running night; load rungs (the forest's density, the area blend, the art pixel) only at the next load, so stepping
// over one marks it pending and goes on to the next live rung. The rules have no clock or GPU of their own: app/ladder.ts feeds
// one window a second (its GPU time, or frame time where the GPU can't be timed) and applies the rung. No Three.js here.

export interface Rung {
  id: string;
  /** What it changes, for the pause page. */
  label: string;
  /** "live": applied in the running night; "load": at the next load (the forest and the art are made then). */
  when: "live" | "load";
  /** Built yet: a rung not yet built is passed over (it changes nothing). */
  built: boolean;
}

/** Ed's order (the coordinator, 2026-10-27, his answer "a"). Index 0 is full quality. */
export const RUNGS: readonly Rung[] = [
  { id: "full", label: "full quality", when: "live", built: true },
  { id: "farDither", label: "the forest's far edge dithered, not faded", when: "live", built: true },
  { id: "density90", label: "trees ×0.9", when: "load", built: false },
  { id: "blend40", label: "area borders blend over 40 m", when: "load", built: false },
  { id: "squeeze", label: "tall trees squeezed", when: "live", built: true },
  { id: "still", label: "leaves still, no trunk shadows", when: "live", built: true },
  { id: "hardCut", label: "the cut-away's crowns solid", when: "live", built: true },
  { id: "density80", label: "trees ×0.8", when: "load", built: false },
  { id: "cap30", label: "a steady 30 fps", when: "live", built: true },
  { id: "px4", label: "chunkier pixels (px 4)", when: "load", built: false },
];

export interface LadderKnobs {
  /** Over this share of the budget, a window counts as slow; under `under`, as roomy. */
  over: number; under: number;
  /** Slow windows in a row before a step down; roomy seconds before a step up. */
  downAfter: number; upAfter: number;
  /** Seconds after any change before windows count again (the new rung settling). */
  settle: number;
  /** Reversals (down after up, or up after down) within `flipWindow` seconds that stop the climbing for the night. */
  flips: number; flipWindow: number;
  /** A rung above is only tried again if its last measured cost was under this share of the budget (unknown: tried). */
  fit: number;
}
export const LADDER_KNOBS: LadderKnobs = { over: 0.9, under: 0.7, downAfter: 3, upAfter: 10, settle: 2, flips: 3, flipWindow: 60, fit: 0.85 };

export interface LadderState {
  /** How far down the ladder (an index into RUNGS): every rung at or above it that's built is in effect, live ones now. */
  rung: number;
  /** The depth the load rungs were made at this load (load rungs at or above it are in the forest and the art). */
  loaded: number;
  mode: "auto" | "off" | "pinned";
  slow: number; roomy: number; since: number;
  /** When it last moved, and which way (-1 down the ladder to plainer, +1 up), for the reversals. */
  last: number; dir: number;
  reversals: number[];
  locked: boolean;
  /** Each rung's last measured cost (ms a frame), eased. */
  cost: number[];
  /** Seconds of windows seen. */
  t: number;
}

export const newLadder = (rung = 0, mode: LadderState["mode"] = "auto"): LadderState => {
  const r = clampRung(rung);
  return { rung: r, loaded: r, mode, slow: 0, roomy: 0, since: 0, last: -Infinity, dir: 0, reversals: [], locked: false, cost: RUNGS.map(() => NaN), t: 0 };
};

export const clampRung = (r: number): number => Math.max(0, Math.min(RUNGS.length - 1, Math.round(Number.isFinite(r) ? r : 0)));

/** Whether rung `i` is in effect now: built, and a live rung at or above the ladder's depth, or a load rung made at this load
 *  (the forest and the art keep what they were made with till the next load, wherever the ladder has gone since). */
export function inEffect(s: LadderState, i: number): boolean {
  const R = RUNGS[i];
  if (!R?.built || i === 0) return false;
  return R.when === "live" ? i <= s.rung : i <= s.loaded;
}

/** The load rungs wanted but not made at this load (they come at the next), and those made but no longer wanted. */
export function pending(s: LadderState): { adds: number[]; drops: number[] } {
  const adds: number[] = [], drops: number[] = [];
  RUNGS.forEach((R, i) => {
    if (R.when !== "load" || !R.built) return;
    if (i <= s.rung && i > s.loaded) adds.push(i);
    if (i > s.rung && i <= s.loaded) drops.push(i);
  });
  return { adds, drops };
}

/** The next rung down that changes something now (a built live rung), or -1. The load rungs it passes over are wanted from the
 *  next load (pending). */
function nextDown(s: LadderState): number {
  for (let i = s.rung + 1; i < RUNGS.length; i++) if (RUNGS[i].built && RUNGS[i].when === "live") return i;
  return -1;
}
/** Up past the nearest live rung in effect (to the rung just above it), or -1 when none is: the load rungs it passes back over
 *  are dropped from the next load. */
function nextUp(s: LadderState): number {
  for (let i = s.rung; i > 0; i--) if (RUNGS[i].built && RUNGS[i].when === "live") return i - 1;
  return s.rung > 0 ? 0 : -1; // (only load rungs left above: back to full, those dropped from the next load)
}

/** One window of `seconds` (about one second): `ms` the frames' cost (GPU time a frame, or frame time), `budget` the frame's
 *  budget (ms), `skip` a window that says nothing (paused, loading, a hidden tab, a hitch). Returns the new state. */
export function stepLadder(s: LadderState, ms: number, budget: number, seconds = 1, skip = false, K: LadderKnobs = LADDER_KNOBS): LadderState {
  const n: LadderState = { ...s, t: s.t + seconds, since: s.since + seconds, cost: s.cost.slice(), reversals: s.reversals.filter(t => s.t + seconds - t <= K.flipWindow) };
  if (n.mode !== "auto" || skip || !(ms > 0) || !(budget > 0) || n.since <= K.settle) return n;
  const c = n.cost[n.rung];
  n.cost[n.rung] = Number.isFinite(c) ? c + (ms - c) * 0.3 : ms;
  n.slow = ms > budget * K.over ? n.slow + 1 : 0;
  n.roomy = ms < budget * K.under ? n.roomy + seconds : 0;
  const move = (to: number, dir: number): LadderState => {
    if (n.dir && dir !== n.dir && n.t - n.last <= K.flipWindow) n.reversals.push(n.t);
    const locked = n.locked || n.reversals.length >= K.flips;
    return { ...n, rung: to, dir, last: n.t, since: 0, slow: 0, roomy: 0, locked };
  };
  if (n.slow >= K.downAfter) {
    const d = nextDown(n);
    if (d >= 0) return move(d, -1);
    n.slow = 0;
  } else if (n.roomy >= K.upAfter && !n.locked) {
    const u = nextUp(n);
    if (u >= 0) {
      // (tried again only if it fitted last time it was measured, or it never was)
      const known = n.cost[u];
      if (!Number.isFinite(known) || known < budget * K.fit) return move(u, 1);
      n.roomy = 0;
    }
  }
  return n;
}

/** The ladder pinned at a rung (the pause page, ?ladder=<n>), off (?ladder=off: full quality, never stepping), or back on auto. */
export function setMode(s: LadderState, mode: LadderState["mode"], rung = s.rung): LadderState {
  const r = mode === "off" ? 0 : clampRung(rung);
  return { ...s, mode, rung: r, since: 0, slow: 0, roomy: 0, locked: mode === "auto" ? false : s.locked, reversals: mode === "auto" ? [] : s.reversals };
}
