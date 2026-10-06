import { describe, expect, it } from "vitest";
import styleJson from "../../config/music-style.json";
import { Conductor, barSeconds, bootLayers, legendNear, musicCue, partyNear, planBlock, type MusicCue } from "./musicPlan";
import { newGame } from "./game";
import { TUNING } from "./tuning";
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

  it("adds the party's parts near a woken area that has joined the party, never doubling the section's own", () => {
    const plan: BlockPlan = { section: "whisper", start: 0, bars: 8, wave: 1, arc: 1 };
    const notes = (party: number) => Array.from({ length: 16 }, (_, s) => notesAt(style, plan, null, s, { seed: 1, siege: 0, party })).flat();
    const own = new Set(notes(0).map(e => e.part)), added = new Set(notes(1).map(e => e.part));
    for (const p of Object.keys(style.party ?? {})) if (!own.has(p)) expect(added.has(p)).toBe(true);
    for (const p of own) expect(notes(1).filter(e => e.part === p).length).toBe(notes(0).filter(e => e.part === p).length);
    // quieter the further it is
    const vel = (party: number) => notes(party).filter(e => !own.has(e.part)).reduce((a, e) => a + e.vel, 0);
    expect(vel(0.3)).toBeLessThan(vel(1));
  });
});

describe("a woken area joining the party (partyNear)", () => {
  it("is heard near a standing soundsystem with happy animals by it, not near home's, a ruined one or one with none", () => {
    const g = newGame(123, TUNING), c = g.creatures.find(c => c.boss && c.cell.join(",") !== g.map.centreCell.join(","))!, key = c.cell.join(",");
    g.combat.sounds.set(key, { hp: 100, max: 100, x: c.x, z: c.z, radius: 8 });
    g.witch.x = c.x + 10; g.witch.z = c.z;
    expect(partyNear(g, g.witch)).toBe(0); // nobody dancing yet
    c.legendState = "happy"; // (its legend at peace)
    expect(partyNear(g, g.witch)).toBe(1);
    g.witch.x = c.x + (TUNING.music.nearDist + TUNING.music.farDist) / 2;
    expect(partyNear(g, g.witch)).toBeGreaterThan(0.2);
    expect(partyNear(g, g.witch)).toBeLessThan(0.8);
    g.combat.ruined.add(key);
    expect(partyNear(g, g.witch)).toBe(0);
  });
});

describe("variety over a long run (overnight, 2026-10-06: a 30-minute run shouldn't loop audibly)", () => {
  // the notes of a block, as a fingerprint
  const block = (p: BlockPlan) => Array.from({ length: 16 * p.bars }, (_, i) => notesAt(style, p, null, p.start * 16 + i, { seed: 7, siege: 0 }).map(e => `${i}:${e.part}:${e.midi}`).join(",")).join("|");

  it("takes an arc step's variants in turn on later passes round its loop", () => {
    const plans = run(2 * 60 / spBar + 300 / spBar, t => cueAt(t, 0, 1e6)); // the first wave's music held for many passes
    const passes = new Set(plans.map(p => p.pass ?? 0)), sections = new Set(plans.map(p => p.section));
    expect(passes.size).toBeGreaterThan(2);
    for (const v of style.arc[0].variants ?? []) for (const [s] of v) expect(sections.has(s)).toBe(true);
  });

  it("never plays a pass's block note for note again on the next pass", () => {
    for (const arc of [0, 3, 7]) {
      const a = style.arc[arc], loops = [a.loop, ...(a.variants ?? [])];
      for (let pass = 0; pass < 4; pass++) {
        // the same section's first block on two passes in a row, wherever it falls in each
        const [section, bars] = loops[pass % loops.length][0], next = loops[(pass + 1) % loops.length].find(([s]) => s === section);
        if (!next) continue;
        const p0: BlockPlan = { section, start: 0, bars, wave: arc, arc, pass }, p1: BlockPlan = { ...p0, pass: pass + 1 };
        expect(block(p1), `${a.name} ${section} pass ${pass}`).not.toBe(block(p0));
      }
    }
  });

  it("turns a new phrase every 16 bars through the boot's long intro, and leaves a wave's short blocks be", () => {
    const bars = 128, intro: BlockPlan = { section: style.intro, start: 0, bars, wave: 0, arc: 0 };
    // the melodies (motif parts) of 16 bars from bar `from`
    const melody = (p: BlockPlan, from: number) => Array.from({ length: 16 * 16 }, (_, i) => notesAt(style, p, null, (p.start + from) * 16 + i, { seed: 7, siege: 0 })
      .filter(e => style.parts[e.part].role === "motif").map(e => `${i}:${e.part}:${e.midi}`)).flat();
    // late in the boot, with the pluck in: each 16 bars' melody mostly new (it was almost all the same before)
    for (let k = 4; k < bars / 16 - 1; k++) {
      const was = new Set(melody(intro, k * 16)), now = melody(intro, (k + 1) * 16);
      expect(now.length).toBeGreaterThan(0);
      expect(now.filter(x => was.has(x)).length / now.length, `phrase ${k + 1}`).toBeLessThan(0.5);
    }
    const short: BlockPlan = { section: "deep", start: 0, bars: 32, wave: 1, arc: 1 };
    expect(melody(short, 16)).toEqual(melody({ ...short, start: 16, bars: 16 }, 0));
  });

  it("keeps the first pass as it was (pass 0 is the music before variants)", () => {
    const p: BlockPlan = { section: "deep", start: 0, bars: 16, wave: 1, arc: 1 };
    expect(block({ ...p, pass: 0 })).toBe(block(p));
  });
});

describe("an angry legend near (legendNear and the style's legend parts)", () => {
  it("darkens the music near an angry or charging legend, by how near, and not near a sleeping or happy one", () => {
    const g = newGame(123, TUNING), L = g.creatures.find(c => c.boss)!;
    g.witch.x = L.x + 10; g.witch.z = L.z;
    expect(legendNear(g, g.witch)).toBe(0); // asleep
    L.legendState = "angry";
    expect(legendNear(g, g.witch)).toBe(1);
    g.witch.x = L.x + (TUNING.music.nearDist + TUNING.music.farDist) / 2;
    expect(legendNear(g, g.witch)).toBeGreaterThan(0.2);
    expect(legendNear(g, g.witch)).toBeLessThan(0.8);
    L.legendState = "happy";
    expect(legendNear(g, g.witch)).toBe(0);
    const plan: BlockPlan = { section: "deep", start: 0, bars: 16, wave: 1, arc: 1 };
    const parts = (legend: number) => new Set(Array.from({ length: 32 }, (_, s) => notesAt(style, plan, null, s, { seed: 1, siege: 0, legend })).flat().map(e => e.part));
    for (const p of Object.keys(style.legend ?? {})) { expect(parts(0).has(p)).toBe(false); expect(parts(1).has(p)).toBe(true); }
  });
});

describe("the music building with the home speakers' boot (Ed, 2026-10-06)", () => {
  const intro: BlockPlan = { section: style.intro, start: 0, bars: 64, wave: 0, arc: 0 };
  /** The parts heard over 4 bars of the intro with `k` of 12 speakers booted. */
  const heard = (k: number) => {
    const parts = new Set<string>();
    for (let s = 0; s < 64; s++) for (const e of notesAt(style, intro, null, 16 * 8 + s, { seed: 7, siege: 0, build: k / 12 })) parts.add(e.part);
    return parts;
  };

  it("is silent before the first speaker, then adds a layer a speaker until the twelfth makes it whole", () => {
    expect(heard(0).size).toBe(0);
    let last = 0;
    for (let k = 1; k <= 12; k++) {
      const n = heard(k).size;
      expect(n, `${k} speakers`).toBe(k);
      expect(n).toBeGreaterThan(last);
      last = n;
    }
    // the whole intro, as it plays with no boot to follow
    const whole = new Set<string>();
    for (let s = 0; s < 64; s++) for (const e of notesAt(style, intro, null, 16 * 60 + s, { seed: 7, siege: 0 })) whole.add(e.part);
    expect([...heard(12)].sort()).toEqual([...whole].sort());
  });

  it("brings each speaker's layer in on the bar line after it turns, and is whole without a boot to follow", () => {
    expect(bootLayers({}, 3)).toBe(1);
    const cue = { speakerBars: [2.4, 3, 5.9], speakers: 12 };
    expect(bootLayers(cue, 2)).toBe(0);
    expect(bootLayers(cue, 3)).toBeCloseTo(2 / 12); // (2.4 from bar 3; 3 on its own bar line)
    expect(bootLayers(cue, 5)).toBeCloseTo(2 / 12);
    expect(bootLayers(cue, 6)).toBeCloseTo(3 / 12);
  });

  it("follows the game's speakers: none booted, silent; each the pulse reaches, a layer", () => {
    const g = newGame(123, TUNING);
    g.speakerBoot = g.speakerBoot.map(() => null);
    const cue0 = musicCue(g);
    expect(bootLayers(cue0, 100)).toBe(0);
    g.speakerBoot[0] = 0; g.speakerBoot[1] = 0.5;
    const cue2 = musicCue(g);
    expect(bootLayers(cue2, 100)).toBeCloseTo(2 / g.speakerBoot.length);
    g.speakerBoot = g.speakerBoot.map(() => 0);
    expect(bootLayers(musicCue(g), 100)).toBe(1);
  });
});
