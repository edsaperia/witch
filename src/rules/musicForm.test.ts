// Ed's brief (2026-10-09): "Keep it all in the dorian. Melodies should be 8 bars long, with a 32 bar ABAC structure, and
// include rests. The B and C melodies should be (simulated) female voice, with the A a random instrument from (pluck, lead,
// chip, voice, bell or horn). The tempo should stay the same as knockdown tempo, i.e. it stays at 120 unless you are knocked
// down, in which case it gains 5bpm. Being knocked down changes the music to a random new seed."
import { describe, expect, it } from "vitest";
import styleJson from "../../config/music-style.json";
import { bpmAt, waveArrived, waveTempo } from "./beat";
import { hitWitch, newGame } from "./game";
import { musicCue } from "./musicPlan";
import { formBars, formChord, formInstrument, formNoteAt, formPhrase, formSeedAt, notesAt, type BlockPlan, type MusicStyle } from "./musicScore";
import { TUNING, type Tuning } from "./tuning";

const style = styleJson as unknown as MusicStyle, F = style.form!;
const P = F.phraseBars * 16, seeds = [1, 7, 42, 123, 9001, 31337];
const melodyOf = (seed: number, from: number, bars: number) =>
  Array.from({ length: bars * 16 }, (_, i) => { const n = formNoteAt(style, seed, from * 16 + i); return n ? `${n.part}:${n.midi}:${n.dur}` : "."; });

describe("the melodies' 32-bar ABAC form", () => {
  it("is ABAC in 8-bar phrases, A coming back exactly, B and C different", () => {
    expect(F.order).toBe("ABAC");
    expect(F.phraseBars).toBe(8);
    expect(formBars(F)).toBe(32);
    for (const seed of seeds) {
      const A1 = melodyOf(seed, 0, 8), B = melodyOf(seed, 8, 8), A2 = melodyOf(seed, 16, 8), C = melodyOf(seed, 24, 8);
      expect(A2).toEqual(A1);
      expect(B).not.toEqual(A1);
      expect(C).not.toEqual(B);
      expect(C).not.toEqual(A1);
      // the form goes round: the next 32 bars the same
      expect(melodyOf(seed, 32, 32)).toEqual(melodyOf(seed, 0, 32));
      // the chords under A the same both times too
      for (let b = 0; b < 8; b++) expect(formChord(style, seed, 16 + b)).toEqual(formChord(style, seed, b));
    }
  });

  it("rests in every phrase, every half-phrase ending on rests", () => {
    for (const seed of seeds) for (const L of F.order) {
      const ph = formPhrase(style, seed, L);
      expect(ph.length).toBe(P);
      // silent sixteenths: neither a note starting nor one held over them
      const sounding = new Array(P).fill(false);
      ph.forEach((n, i) => { if (n) for (let k = 0; k < n.dur; k++) sounding[i + k] = true; });
      const silent = sounding.filter(x => !x).length;
      expect(silent, `${seed} ${L}`).toBeGreaterThanOrEqual(P / 8); // (a bar's rest a phrase at least)
      for (const end of [P / 2 - 1, P - 1]) expect(sounding[end], `${seed} ${L} at ${end}`).toBe(false);
      expect(ph.filter(Boolean).length).toBeGreaterThanOrEqual(6);
    }
  });

  it("plays A on one instrument of Ed's six by the seed, B and C sung", () => {
    const seen = new Set<string>();
    for (let seed = 0; seed < 200; seed++) {
      const inst = formInstrument(F, seed);
      seen.add(inst);
      const parts = new Set(melodyOf(seed, 0, 32).filter(x => x !== ".").map(x => x.split(":")[0]));
      expect(parts).toEqual(new Set([inst, F.sung.part]));
    }
    expect([...seen].sort()).toEqual(["bell", "chiplead", "lead", "lgHorn", "pluck", "vox"]);
    expect(style.patches[F.sung.patch].kind).toBe("voice");
    expect(style.patches[F.sung.patch].formantShift!).toBeGreaterThan(style.patches.vox.formantShift!); // (a higher voice than the old vox)
  });

  it("asks a question in B and answers it on the root in C", () => {
    for (const seed of seeds) {
      const last = (L: string) => formPhrase(style, seed, L).filter(Boolean).pop()!.deg;
      const mod7 = (d: number) => ((d % 7) + 7) % 7;
      expect([1, 4]).toContain(mod7(last("B")));
      expect(mod7(last("C"))).toBe(0);
      expect(mod7(last("A"))).not.toBe(0);
      expect(formChord(style, seed, 15).root).toBe(F.question);
      expect(formChord(style, seed, 31).root).toBe(F.answer);
    }
  });
});

describe("everything in A dorian", () => {
  const dorian = new Set(style.scales.dorian.map(d => (d + style.root) % 12));
  it("every arc step, section and layer", () => {
    expect(style.scale).toBe("dorian");
    for (const a of style.arc) { expect(a).not.toHaveProperty("scale"); expect(a).not.toHaveProperty("transpose"); }
    for (const section of Object.keys(style.sections)) for (const arc of [0, 4, 5, 8]) {
      const plan: BlockPlan = { section, start: 0, bars: 32, wave: arc, arc };
      for (let step = 0; step < 32 * 16; step += 1) {
        for (const e of notesAt(style, plan, null, step, { seed: 5 + arc, siege: 1, party: 1, legend: 1, circle: { species: "elk", level: 1 } })) {
          if (e.midi !== null) expect(dorian.has(e.midi % 12), `${section} ${e.part} ${e.midi}`).toBe(true);
        }
      }
    }
  });
});

describe("the tempo: 120, and 5 more a knockdown", () => {
  const t: Tuning = { ...TUNING, beat: { ...TUNING.beat, bpm: style.bpm, tempos: style.arc.map(a => a.bpm ?? style.bpm) } };
  it("stays at 120 through every wave", () => {
    expect(style.bpm).toBe(120);
    for (let w = 0; w < 40; w++) expect(waveTempo(t, w)).toBe(120);
    const g = newGame(3, t);
    for (let w = 1; w <= 9; w++) waveArrived(g.beat, t, w, w * 60);
    expect(bpmAt(g.beat, 1000)).toBe(120);
  });

  it("gains 5 a knockdown, with no cap", () => {
    expect(t.knockout.bpmStep).toBe(5);
    const g = newGame(3, t), W = g.witches[0];
    for (let k = 1; k <= 6; k++) {
      W.ko = null; W.health.hp = 1; W.health.hurtAt = -Infinity; W.dash = { ...W.dash, until: -Infinity } as typeof W.dash;
      g.clock.time = g.herTime = k * 40;
      hitWitch(g, 0, g.clock.time, t);
      expect(W.ko, `knockdown ${k}`).toBeTruthy();
      expect(bpmAt(g.beat, k * 40 + 30)).toBeCloseTo(120 + 5 * k, 6);
    }
    expect(g.knockdowns.length).toBe(6);
  });
});

describe("a knockdown re-seeds the music", () => {
  it("changes the seed from the next phrase line, its form starting there with a new A", () => {
    const base = 77, P8 = F.phraseBars;
    expect(formSeedAt(style, base, [], 100)).toEqual({ seed: base, formStart: 0 });
    const k = formSeedAt(style, base, [13.2], 15), after = formSeedAt(style, base, [13.2], 16);
    expect(k).toEqual({ seed: base, formStart: 0 }); // (till the phrase line)
    expect(after.formStart).toBe(2 * P8);
    expect(after.seed).not.toBe(base);
    const twice = formSeedAt(style, base, [13.2, 40], 48);
    expect(twice.seed).not.toBe(after.seed);
    expect(twice.seed).not.toBe(base);
    // the melody after it is new (seeded anew, not the old one's A)
    const plan: BlockPlan = { section: "forest", start: 16, bars: 32, wave: 1, arc: 0 };
    const play = (ctx: { seed: number; formStart: number }) => Array.from({ length: 8 * 16 }, (_, i) => notesAt(style, plan, null, 16 * 16 + i, { ...ctx, siege: 0 }).map(e => `${e.part}:${e.midi}`).join()).join("|");
    expect(play(after)).not.toBe(play({ seed: base, formStart: 0 }));
  });

  it("is in the game's music cue, by the bars the knockdowns came in", () => {
    const g = newGame(3, TUNING), W = g.witches[0];
    expect(musicCue(g).knockdowns).toEqual([]);
    W.health.hp = 1; g.clock.time = g.herTime = 30;
    hitWitch(g, 0, 30);
    const cue = musicCue(g);
    expect(cue.knockdowns!.length).toBe(1);
    expect(cue.knockdowns![0]).toBeCloseTo(15, 3); // (30 s at 120: 15 bars)
  });
});
