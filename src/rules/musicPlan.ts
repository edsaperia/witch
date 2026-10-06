// The music's conductor (Ed, 2026-10-04: sections per wave): which section the track plays, timed
// to the game's waves. The home speakers' boot is the intro; each wave's arrival brings that wave's
// arc step (gentle and sparse at first, building through drops to a frantic finale), which plays
// its arrival sections and then loops; a build (a riser, a sweep, a snare roll) leads into the
// next wave, ending as it lands. Sections change only on block lines (style.blockBars, 4 bars), so
// every change lands on a phrase. Bars are the beat clock's (rules/beat.ts): bar 0 at game time 0,
// the tempo rising wave by wave.
// Hooks for later: knockedOut plays the knockout section (a breakdown under a filter); siege adds the
// style's siege parts (rules/musicScore.ts); party, near a woken area that has joined the party,
// its party parts. Numbers only: the platform plays them.
import { beatAt, type BeatClock } from "./beat";
import type { Game } from "./game";
import { arcStep, type BlockPlan, type MusicStyle } from "./musicScore";

/** Everything the conductor needs, in bars of the beat clock (bar 0 at game time 0). */
export interface MusicCue {
  /** The bar each wave arrived on: waves[0] is wave 1's. */
  waves: number[];
  /** The bar the next wave is due on, as the beat clock sees it now (Infinity with waves off). */
  nextAt: number;
  /** The bar the home speakers finish booting on (0: no boot). */
  bootUntil: number;
  /** Hooks: the witch is knocked out; how much a soundsystem nearby is under siege (0-1). */
  knockedOut: boolean;
  siege: number;
  /** How near a woken area that has joined the party is (0-1): its soundsystem on, its happy animals dancing. */
  party?: number;
  /** How near an angry legend is (0-1): charging, or shooting from afar. */
  legend?: number;
  /** ?music= previews: always this section; or this wave's arc step whatever the wave. */
  forceSection?: string;
  forceWave?: number;
}

/** Bars gone by at game time `time` on the beat clock. */
export const barAt = (clock: BeatClock, time: number) => beatAt(clock, time) / 4;

/** The music's cue from the game: its waves, the next one's and the boot's, in bars. */
export function musicCue(g: Game, prev?: MusicCue): MusicCue {
  const p = g.party, bar = (time: number) => barAt(g.beat, time);
  let waves = prev?.waves;
  if (!waves || waves.length !== p.wave) {
    const times: number[] = [];
    for (const a of p.areas.values()) if (a.wave > 0) times[a.wave - 1] = Math.min(times[a.wave - 1] ?? Infinity, a.at);
    for (let i = 0; i < p.wave; i++) times[i] ??= i > 0 ? times[i - 1] : 0;
    waves = times.map(bar);
  }
  return {
    waves, nextAt: g.tuning.party.interval >= 1e9 ? Infinity : bar(p.nextAt), bootUntil: bar(p.bootUntil),
    knockedOut: !!g.witches[0]?.ko, siege: siegeNear(g, g.witch), party: partyNear(g, g.witch), legend: legendNear(g, g.witch), forceSection: prev?.forceSection, forceWave: prev?.forceWave,
  };
}

/** How much a soundsystem under siege is heard from `at` (0-1): the nearest standing one with wild
 *  creatures fighting at it, by how near it is (the music's nearDist to farDist). */
export function siegeNear(g: Game, at: { x: number; z: number }): number {
  const M = g.tuning.music, S = g.combat;
  if (!S || !S.busy.size) return 0;
  let best = 0;
  for (const h of S.sounds.values()) {
    if (h.hp <= 0) continue;
    const d = Math.hypot(h.x - at.x, h.z - at.z), near = 1 - Math.min(1, Math.max(0, (d - M.nearDist) / Math.max(1, M.farDist - M.nearDist)));
    if (near <= best) continue;
    for (const id of S.busy) {
      const c = g.creatures[id];
      if (!c.gone && !c.leashed && !c.fleeUntil && !c.wanderTo && Math.hypot(c.x - h.x, c.z - h.z) < h.radius + 15) { best = near; break; }
    }
  }
  return best;
}

/** How near an angry legend is to `at` (0-1, the music's nearDist to farDist): one shooting from
 *  afar, or charging (the legends' long charge). Adds the style's legend parts: the mood darkens. */
export function legendNear(g: Game, at: { x: number; z: number }): number {
  const M = g.tuning.music;
  let best = 0;
  for (const c of g.creatures) {
    if (!c.boss || c.gone || c.leashed) continue;
    if (c.legendState !== "angry" && !(c as { run?: unknown }).run) continue;
    const d = Math.hypot(c.x - at.x, c.z - at.z), near = 1 - Math.min(1, Math.max(0, (d - M.nearDist) / Math.max(1, M.farDist - M.nearDist)));
    if (near > best) best = near;
  }
  return best;
}

/** How much a woken area that has joined the party is heard from `at` (0-1): the nearest standing
 *  soundsystem (not home's: the track is home's) with happy animals dancing by it (its area's
 *  guards or happy legend, or party animals placed there), by how near it is (nearDist to farDist). */
export function partyNear(g: Game, at: { x: number; z: number }): number {
  const M = g.tuning.music, S = g.combat;
  if (!S) return 0;
  let best = 0, happy: Set<string> | null = null;
  for (const [key, h] of S.sounds) {
    if (key === "home" || h.hp <= 0 || S.ruined.has(key)) continue;
    const d = Math.hypot(h.x - at.x, h.z - at.z), near = 1 - Math.min(1, Math.max(0, (d - M.nearDist) / Math.max(1, M.farDist - M.nearDist)));
    if (near <= best) continue;
    if (!happy) { happy = new Set(); for (const c of g.creatures) if ((c.guard || (c.boss && c.legendState === "happy")) && !c.gone && !c.leashed) happy.add(`${c.cell[0]},${c.cell[1]}`); } // (one pass, only when one's in earshot)
    if (happy.has(key) || g.leash.placed.some(p => Math.hypot(p.x - h.x, p.z - h.z) < h.radius + 30)) best = near;
  }
  return best;
}

/** Seconds a bar lasts at `bpm`. */
export const barSeconds = (bpm: number) => (4 * 60) / bpm;

/** The block line a bar falls on or just after: a wave within `snap` bars after a line lands on it. */
export function blockAfter(bars: number, B: number, snap = 0.25): number {
  const b = Math.floor(bars / B) * B;
  return bars - b <= snap ? b : b + B;
}

/** Walk a list of [section, bars] from bar `k` (0 its first bar); loop: wrap round. */
function walk(seq: [string, number][], k: number): { section: string; offset: number; bars: number } | null {
  for (const [section, bars] of seq) { if (k < bars) return { section, offset: k, bars }; k -= bars; }
  return null;
}

/** The plan for the block starting at bar `bar` (a multiple of style.blockBars), from the cue as
 *  known now. The same style, cue and bar always give the same plan. */
export function planBlock(style: MusicStyle, cue: MusicCue, bar: number): BlockPlan {
  const B = style.blockBars;
  // the wave at that bar (a wave due by then counts as come: the build leads straight into it)
  let w = 0;
  while (w < cue.waves.length && blockAfter(cue.waves[w], B) <= bar) w++;
  let next = w < cue.waves.length ? cue.waves[w] : cue.nextAt;
  let arrival = w > 0 ? cue.waves[w - 1] : cue.bootUntil;
  if (w >= cue.waves.length && Number.isFinite(next) && blockAfter(next, B) <= bar && bar >= cue.bootUntil) { arrival = next; next = Infinity; w++; }
  const arc = cue.forceWave ?? w, step = arcStep(style, arc);
  const plan = (section: string, start: number, bars: number): BlockPlan => ({ section, start, bars, wave: w, arc });
  if (cue.forceSection && style.sections[cue.forceSection]) return plan(cue.forceSection, bar - (bar % 16), 16);
  if (cue.knockedOut) return plan(style.knockout, bar - (bar % (2 * B)), 2 * B);
  // the boot: the intro, its parts coming in as the speakers power on
  if (bar < cue.bootUntil) return plan(style.intro, 0, Math.max(B, blockAfter(cue.bootUntil, B)));
  // the build into the next wave
  const buildBars = step.buildBars ?? style.buildBars;
  if (Number.isFinite(next)) {
    const drop = blockAfter(next, B);
    if (drop > bar && drop - bar <= buildBars) return plan(step.build, drop - buildBars, buildBars);
  }
  // the wave's own sections: its arrival, then its loop
  const k = Math.max(0, bar - blockAfter(arrival, B));
  const arrive = step.arrive.reduce((n, [, b]) => n + b, 0);
  const first = walk(step.arrive, k);
  if (first) return plan(first.section, bar - first.offset, first.bars);
  // then round the loop, a variant each pass (overnight, 2026-10-06: a long wave mustn't loop audibly)
  const loops = [step.loop, ...(step.variants ?? [])], len = (l: [string, number][]) => Math.max(1, l.reduce((n, [, b]) => n + b, 0));
  let j = k - arrive, pass = 0;
  while (j >= len(loops[pass % loops.length])) { j -= len(loops[pass % loops.length]); pass++; }
  const hit = walk(loops[pass % loops.length], j)!;
  return { ...plan(hit.section, bar - hit.offset, hit.bars), pass };
}

/** Plans blocks once and keeps them, so a block never changes once it has started sounding. */
export class Conductor {
  private cache = new Map<number, BlockPlan>();
  constructor(public style: MusicStyle) {}
  /** The plan for the block holding `bar`. */
  plan(cue: MusicCue, bar: number): BlockPlan {
    const B = this.style.blockBars, b = Math.floor(bar / B) * B;
    let p = this.cache.get(b);
    if (!p) {
      p = planBlock(this.style, cue, b);
      this.cache.set(b, p);
      for (const k of this.cache.keys()) if (k < b - 4 * B || k > b + 4 * B) this.cache.delete(k);
    }
    return p;
  }
  /** Forget the plans (a new style, a jump in time). */
  reset(style = this.style): void { this.style = style; this.cache.clear(); }
}
