import { describe, expect, it } from "vitest";
import styleJson from "../../config/music-style.json";
import { Conductor, barSeconds, planBlock, type MusicCue } from "./musicPlan";
import { checkStyle, notesAt, type BlockPlan, type MusicStyle } from "./musicScore";

const style = styleJson as unknown as MusicStyle;
const bpm = style.bpm, spBar = barSeconds(bpm);

/** The cue as the game knows it at `time`: boot, then a wave every `interval` seconds (or at `times`). */
function cueAt(time: number, boot = 60, interval = 300, times?: number[]): MusicCue {
  const all = times ?? Array.from({ length: 40 }, (_, i) => boot + interval * (i + 1));
  const waves = all.filter(t => t <= time);
  const bar = (t: number) => t / spBar; // the cue is in bars (a steady tempo here)
  return { waves: waves.map(bar), nextAt: bar(all[waves.length] ?? Infinity), bootUntil: bar(boot), knockedOut: false, siege: 0 };
}

/** Play a run like the engine: each block planned a bar before it starts, from the cue known then. */
function run(bars: number, cue: (time: number) => MusicCue = cueAt): BlockPlan[] {
  const c = new Conductor(style), out: BlockPlan[] = [];
  for (let bar = 0; bar < bars; bar++) out.push(c.plan(cue(Math.max(0, (bar - 1) * spBar)), bar));
  return out;
}

describe("music style", () => {
  it("is sound: every section, part, pattern and patch it names exists, in whole bars and blocks", () => {
    expect(checkStyle(style)).toEqual([]);
  });
});

describe("music sections", () => {
  it("change only on block lines (every 4 bars), and run whole blocks", () => {
    const plans = run(30 * 60 / spBar); // a 30-minute run
    const B = style.blockBars;
    expect(B).toBe(4);
    plans.forEach((p, bar) => {
      expect(p.start % B).toBe(0);
      expect(p.bars % B).toBe(0);
      if (bar % B !== 0) expect(p).toEqual(plans[bar - 1]);
      expect(bar).toBeGreaterThanOrEqual(p.start);
      expect(bar).toBeLessThan(p.start + p.bars);
    });
  });

  it("map waves to sections the same way every time", () => {
    const a = run(1200), b = run(1200);
    expect(a).toEqual(b);
    const withSiege = run(1200, t => ({ ...cueAt(t), siege: 0.7 }));
    expect(withSiege.map(p => p.section)).toEqual(a.map(p => p.section));
  });

  it("boots with the intro, then the forest; builds into each wave and drops as it lands", () => {
    const plans = run(1000);
    const bootBars = 60 / spBar; // 30 bars: the intro to the block line after
    for (let bar = 0; bar < 32; bar++) expect(plans[bar].section).toBe(style.intro);
    expect(bootBars).toBe(30);
    expect(plans[32].section).toBe(style.arc[0].arrive[0][0]);
    expect(plans[32].wave).toBe(0);
    // wave 1 at 360 s (bar 180), wave 2 at 660 s (bar 330, so its drop's block line is bar 332)
    for (const [w, drop] of [[1, 180], [2, 332], [3, 480]]) {
      const prev = style.arc[w - 1], buildBars = prev.buildBars ?? style.buildBars;
      for (let bar = drop - buildBars; bar < drop; bar++) { expect(plans[bar].section).toBe(prev.build); expect(plans[bar].wave).toBe(w - 1); }
      expect(plans[drop - buildBars - 1].section).not.toBe(prev.build);
      expect(plans[drop].section).toBe(style.arc[w].arrive[0][0]);
      expect(plans[drop].wave).toBe(w);
      expect(plans[drop].start).toBe(drop);
    }
  });

  it("goes through the whole arc and stays on its last step", () => {
    const plans = run(30 * 60 / spBar, t => cueAt(t, 60, 120)); // waves every 2 minutes
    const arcs = new Set(plans.map(p => p.arc));
    for (let i = 0; i < style.arc.length; i++) expect(arcs.has(i)).toBe(true);
    const last = plans[plans.length - 1];
    expect(last.arc).toBeGreaterThanOrEqual(style.arc.length - 1);
    expect(planBlock(style, cueAt(1e5), 50000).arc).toBeGreaterThan(style.arc.length);
  });

  it("drops on the next block line when a wave comes early (N)", () => {
    // N at 400.3 s (bar 200.15), with the wave due at 660 s: no build, the drop on bar 204
    const plans = run(260, t => t < 400.3 ? { ...cueAt(t, 60, 300, [660]) } : cueAt(t, 60, 300, [400.3, 700.3]));
    expect(plans[200].wave).toBe(0);
    expect(plans[203].wave).toBe(0);
    expect(plans[204].wave).toBe(1);
    expect(plans[204].section).toBe(style.arc[1].arrive[0][0]);
  });

  it("lets a wave a moment late still land on the line it was due on", () => {
    const plans = run(200, t => cueAt(t, 60, 300, [360.05, 9999]));
    expect(plans[180].wave).toBe(1);
    expect(plans[180].section).toBe(style.arc[1].arrive[0][0]);
  });

  it("never builds with waves off, and starts straight in the forest with no boot", () => {
    const plans = run(400, t => ({ ...cueAt(t, 0, 1e9), nextAt: Infinity }));
    expect(plans[0].section).toBe(style.arc[0].arrive[0][0]);
    expect(plans.some(p => p.section === style.arc[0].build)).toBe(false);
  });

  it("keeps a block's plan once made, whatever comes after", () => {
    const c = new Conductor(style);
    const before = c.plan(cueAt(370), 184);
    expect(c.plan({ ...cueAt(370), knockedOut: true }, 186)).toEqual(before);
    expect(c.plan({ ...cueAt(370), knockedOut: true }, 188).section).toBe(style.knockout);
  });

  it("previews: ?music=<section> loops it, ?music=wave<N> plays wave N's music", () => {
    const forced = planBlock(style, { ...cueAt(10), forceSection: "phonk" }, 8);
    expect(forced.section).toBe("phonk");
    const w = planBlock(style, { ...cueAt(500), forceWave: 7 }, 260);
    expect(w.arc).toBe(7);
  });
});

describe("music score", () => {
  const sections = Object.keys(style.sections);
  it("plays notes in every section, in the scale, at sane levels, the same every time", () => {
    for (const section of sections) {
      for (const arc of [0, 3, 5, 8]) {
        const plan: BlockPlan = { section, start: 0, bars: 16, wave: arc, arc };
        let n = 0;
        for (let step = 0; step < 16 * 8; step++) {
          const notes = notesAt(style, plan, null, step, { seed: 42, siege: 0 });
          expect(notesAt(style, plan, null, step, { seed: 42, siege: 0 })).toEqual(notes);
          const a = style.arc[arc], scale = style.scales[a.scale ?? style.scale];
          for (const e of notes) {
            n++;
            expect(e.vel).toBeGreaterThan(0);
            expect(e.vel).toBeLessThanOrEqual(1.01);
            expect(e.dur).toBeGreaterThan(0);
            if (e.midi !== null) {
              expect(e.midi).toBeGreaterThanOrEqual(21);
              expect(e.midi).toBeLessThanOrEqual(108);
              const pc = (((e.midi - style.root - (a.transpose ?? 0)) % 12) + 12) % 12;
              expect(scale).toContain(pc);
            }
          }
        }
        expect(n, `${section} at arc ${arc}`).toBeGreaterThan(8);
      }
    }
  });

  it("fills the bar before a new section, and brings the intro's parts in as the speakers boot", () => {
    const plan: BlockPlan = { section: "deep", start: 0, bars: 16, wave: 1, arc: 1 };
    const next: BlockPlan = { section: "breakdown", start: 16, bars: 8, wave: 1, arc: 1 };
    const bar = (b: number, nx: BlockPlan | null) => Array.from({ length: 16 }, (_, s) => notesAt(style, plan, nx, b * 16 + s, { seed: 1, siege: 0 })).flat();
    expect(bar(15, next).filter(e => e.part === style.fill.part).length).toBeGreaterThan(3);
    expect(bar(15, next).some(e => e.part === "kick" && e.step % 16 >= 12)).toBe(false);
    expect(bar(15, null).some(e => e.part === "kick" && e.step % 16 >= 12)).toBe(true);
    const intro: BlockPlan = { section: style.intro, start: 0, bars: 32, wave: 0, arc: 0 };
    const partsIn = (b: number) => new Set(Array.from({ length: 16 }, (_, s) => notesAt(style, intro, null, b * 16 + s, { seed: 1, siege: 0 })).flat().map(e => e.part));
    expect(partsIn(0).size).toBeLessThan(partsIn(31).size);
  });

  it("adds the siege's parts under siege", () => {
    const plan: BlockPlan = { section: "deep", start: 0, bars: 16, wave: 1, arc: 1 };
    const parts = (siege: number) => new Set(Array.from({ length: 16 }, (_, s) => notesAt(style, plan, null, s, { seed: 1, siege })).flat().map(e => e.part));
    for (const p of Object.keys(style.siege)) { expect(parts(0).has(p)).toBe(false); expect(parts(1).has(p)).toBe(true); }
  });
});
