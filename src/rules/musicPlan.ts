// The music's conductor (Ed, 2026-10-04: sections per wave): which section the track plays, timed
// to the game's waves. The home speakers' boot is the intro; each wave's arrival brings that wave's
// arc step (gentle and sparse at first, building through drops to a frantic finale), which plays
// its arrival sections and then loops; a build (a riser, a sweep, a snare roll) leads into the
// next wave, ending as it lands. Sections change only on block lines (style.blockBars, 4 bars), so
// every change lands on a phrase. Bar 0 starts at game time 0, on the game's beat (beat.bpm).
// Hooks for later: knockedOut plays the knockout section (a breakdown under a filter); siege adds the
// style's siege parts (rules/musicScore.ts). Numbers only: the platform plays them.
import type { Game } from "./game";
import { arcStep, type BlockPlan, type MusicStyle } from "./musicScore";

export interface MusicCue {
  /** Game time each wave arrived: waves[0] is wave 1's. */
  waves: number[];
  /** Game time of the next wave (Infinity with waves off). */
  nextAt: number;
  /** Game time the home speakers finish booting (0: no boot). */
  bootUntil: number;
  /** Hooks: the witch is knocked out; how much a soundsystem nearby is under siege (0-1). */
  knockedOut: boolean;
  siege: number;
  /** ?music= previews: always this section; or this wave's arc step whatever the wave. */
  forceSection?: string;
  forceWave?: number;
}

/** The music's cue from the game: its waves' times, the next one's, the boot. */
export function musicCue(g: Game, prev?: MusicCue): MusicCue {
  const p = g.party;
  let waves = prev?.waves;
  if (!waves || waves.length !== p.wave) {
    waves = [];
    for (const a of p.areas.values()) if (a.wave > 0) waves[a.wave - 1] = Math.min(waves[a.wave - 1] ?? Infinity, a.at);
    for (let i = 0; i < p.wave; i++) waves[i] ??= i > 0 ? waves[i - 1] : 0;
  }
  return { waves, nextAt: g.tuning.party.interval >= 1e9 ? Infinity : p.nextAt, bootUntil: p.bootUntil, knockedOut: false, siege: 0, forceSection: prev?.forceSection, forceWave: prev?.forceWave };
}

/** Seconds a bar lasts at `bpm`. */
export const barSeconds = (bpm: number) => (4 * 60) / bpm;

/** The block line a time falls on or just after: a wave within `snap` bars after a line lands on it. */
function blockAfter(timeBars: number, B: number, snap = 0.25): number {
  const b = Math.floor(timeBars / B) * B;
  return timeBars - b <= snap ? b : b + B;
}

/** Walk a list of [section, bars] from bar `k` (0 its first bar); loop: wrap round. */
function walk(seq: [string, number][], k: number): { section: string; offset: number; bars: number } | null {
  for (const [section, bars] of seq) { if (k < bars) return { section, offset: k, bars }; k -= bars; }
  return null;
}

/** The plan for the block starting at bar `bar` (a multiple of style.blockBars), from the cue as
 *  known now. The same style, cue and bar always give the same plan. */
export function planBlock(style: MusicStyle, cue: MusicCue, bar: number, bpm: number): BlockPlan {
  const B = style.blockBars, spBar = barSeconds(bpm), t = bar * spBar;
  // the wave at that time (a wave due by then counts as come: the build leads straight into it)
  let w = 0;
  while (w < cue.waves.length && blockAfter(cue.waves[w] / spBar, B) <= bar) w++;
  let next = w < cue.waves.length ? cue.waves[w] : cue.nextAt;
  let arrival = w > 0 ? cue.waves[w - 1] : cue.bootUntil;
  if (w >= cue.waves.length && Number.isFinite(next) && blockAfter(next / spBar, B) <= bar && t >= cue.bootUntil) { arrival = next; next = Infinity; w++; }
  const arc = cue.forceWave ?? w, step = arcStep(style, arc);
  const plan = (section: string, start: number, bars: number): BlockPlan => ({ section, start, bars, wave: w, arc });
  if (cue.forceSection && style.sections[cue.forceSection]) return plan(cue.forceSection, bar - (bar % 16), 16);
  if (cue.knockedOut) return plan(style.knockout, bar - (bar % (2 * B)), 2 * B);
  // the boot: the intro, its parts coming in as the speakers power on
  if (t < cue.bootUntil) {
    const end = blockAfter(cue.bootUntil / spBar, B);
    return plan(style.intro, 0, Math.max(B, end));
  }
  // the build into the next wave
  const buildBars = step.buildBars ?? style.buildBars;
  if (Number.isFinite(next)) {
    const drop = blockAfter(next / spBar, B);
    if (drop > bar && drop - bar <= buildBars) return plan(step.build, drop - buildBars, buildBars);
  }
  // the wave's own sections: its arrival, then its loop
  const k = Math.max(0, bar - blockAfter(arrival / spBar, B));
  const arrive = step.arrive.reduce((n, [, b]) => n + b, 0), loop = step.loop.reduce((n, [, b]) => n + b, 0);
  const hit = walk(step.arrive, k) ?? walk(step.loop, (k - arrive) % Math.max(1, loop))!;
  return plan(hit.section, bar - hit.offset, hit.bars);
}

/** Plans blocks once and keeps them, so a block never changes once it has started sounding. */
export class Conductor {
  private cache = new Map<number, BlockPlan>();
  constructor(public style: MusicStyle) {}
  /** The plan for the block holding `bar`. */
  plan(cue: MusicCue, bar: number, bpm: number): BlockPlan {
    const B = this.style.blockBars, b = Math.floor(bar / B) * B;
    let p = this.cache.get(b);
    if (!p) {
      p = planBlock(this.style, cue, b, bpm);
      this.cache.set(b, p);
      for (const k of this.cache.keys()) if (k < b - 4 * B || k > b + 4 * B) this.cache.delete(k);
    }
    return p;
  }
  /** Forget the plans (a new style, a jump in time). */
  reset(style = this.style): void { this.style = style; this.cache.clear(); }
}
