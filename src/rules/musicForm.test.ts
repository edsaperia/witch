// Ed's brief (2026-10-09): "Keep it all in the dorian. Melodies should be 8 bars long, with a 32 bar ABAC structure, and
// include rests. The B and C melodies should be (simulated) female voice, with the A a random instrument from (pluck, lead,
// chip, voice, bell or horn). The tempo should stay the same as knockdown tempo, i.e. it stays at 120 unless you are knocked
// down, in which case it gains 5bpm. Being knocked down changes the music to a random new seed."
import { describe, expect, it } from "vitest";
import styleJson from "../../config/music-style.json";
import { bpmAt, timeAt, waveArrived, waveTempo } from "./beat";
import { hitWitch, newGame } from "./game";
import { Conductor, formClock, musicCue, silentAt, type MusicCue } from "./musicPlan";
import { formBars, formChord, formInstrument, formNoteAt, formPhrase, musicSeed, notesAt, resolveSection, type BlockPlan, type MusicStyle } from "./musicScore";
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

describe("everything in dorian, each stage in its own key", () => {
  it("every arc step, section and layer", () => {
    expect(style.scale).toBe("dorian");
    // (the key changes between stages stay: Ed, 2026-10-09, via the coordinator)
    expect(style.arc.map(a => a.transpose ?? 0)).toEqual([0, 0, 0, 0, 2, 3, 5, 0, 1]);
    for (const a of style.arc) expect(a).not.toHaveProperty("scale");
    for (const section of Object.keys(style.sections)) for (const arc of [0, 4, 5, 8]) {
      const plan: BlockPlan = { section, start: 0, bars: 32, wave: arc, arc }, tr = style.arc[arc].transpose ?? 0;
      const dorian = new Set(style.scales.dorian.map(d => (d + style.root + tr) % 12));
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

describe("a knockdown: the record scratched, silence, a new record from the top (Ed, 2026-10-09)", () => {
  const cue = (knockdowns: { at: number; back: number }[], waves: number[] = []): MusicCue => ({ waves, nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, knockdowns });
  it("is silent from the knockdown till the new record, which starts its form there on a new seed", () => {
    const base = 77;
    expect(formClock(style, cue([]), 100)).toEqual({ start: 0, n: 0 });
    const k = cue([{ at: 13.2, back: 17 }]);
    expect(silentAt(k, 13.1)).toBe(false);
    expect(silentAt(k, 13.2)).toBe(true);
    expect(silentAt(k, 16.99)).toBe(true);
    expect(silentAt(k, 17)).toBe(false);
    expect(formClock(style, k, 16)).toEqual({ start: 0, n: 0 });
    expect(formClock(style, k, 17)).toEqual({ start: 17, n: 1 });
    expect(formClock(style, cue([{ at: 13.2, back: 17 }, { at: 40.5, back: 43 }]), 48)).toEqual({ start: 43, n: 2 });
    expect(musicSeed(base, 1)).not.toBe(base);
    expect(musicSeed(base, 2)).not.toBe(musicSeed(base, 1));
    // a wave landing later starts the form again (the seed as it was)
    expect(formClock(style, cue([{ at: 13.2, back: 17 }], [37]), 40)).toEqual({ start: 40, n: 1 });
    // the new record plays from the top: the wave's landing section, its form's A
    const c = new Conductor(style), wave: MusicCue = { ...cue([{ at: 50.3, back: 53 }], [36]) };
    expect(c.plan(wave, 53)).toMatchObject({ section: style.arc[1].sections!.land, start: 53, pass: 0 });
    // the melody after it is new (seeded anew, not the old one's A)
    const plan: BlockPlan = { section: "forest", start: 16, bars: 32, wave: 1, arc: 0 };
    const play = (ctx: { seed: number; formStart: number }) => Array.from({ length: 8 * 16 }, (_, i) => notesAt(style, plan, null, 16 * 16 + i, { ...ctx, siege: 0 }).map(e => `${e.part}:${e.midi}`).join()).join("|");
    expect(play({ seed: musicSeed(base, 1), formStart: 16 })).not.toBe(play({ seed: base, formStart: 0 }));
  });

  it("goes down and comes back in the game: her wait ends on a bar line, the cue silent till then", () => {
    const g = newGame(3, TUNING), W = g.witches[0];
    expect(musicCue(g).knockdowns).toEqual([]);
    W.health.hp = 1; g.clock.time = g.herTime = 30.3;
    hitWitch(g, 0, 30.3);
    const ko = W.ko!, cue = musicCue(g), [k] = cue.knockdowns!;
    expect(k.at).toBeCloseTo(30.3 / 2, 3); // (30.3 s at 120: 15.15 bars)
    expect(k.back % 1).toBeCloseTo(0, 3); // a bar line, at the new tempo
    expect(timeAt(g.beat, k.back * 4)).toBeCloseTo(ko.backAt, 6);
    expect(ko.backAt).toBeGreaterThanOrEqual(ko.inAt! + TUNING.knockout.respawn!.minScratch - 1e-6);
    expect(Math.abs(ko.backAt - (30.3 + TUNING.knockout.respawn!.base))).toBeLessThan(2.1); // (the nearest bar line to the wait: one bar is 2 s or less)
    expect(silentAt(cue, k.at)).toBe(true);
    expect(silentAt(cue, k.back - 0.01)).toBe(true);
    expect(silentAt(cue, k.back)).toBe(false);
    expect(formClock(style, cue, k.back)).toEqual({ start: k.back, n: 1 });
    expect(g.knockdowns).toEqual([{ at: 30.3, back: ko.backAt }]);
  });
});

describe("the melodies' pace (Ed, 2026-10-09: \"keep the melodies relatively slow, but not always. Use whole notes and triplets quite often\")", () => {
  it("is mostly slow, with whole notes and triplets often, and some busier bars", () => {
    let notes = 0, whole = 0, triplet = 0, short = 0, phrases = 0;
    for (let seed = 0; seed < 60; seed++) for (const L of "ABC") {
      phrases++;
      for (const n of formPhrase(style, seed, L)) if (n) {
        notes++;
        if (n.dur >= 12) whole++;
        if (n.dur % 1) triplet++;
        if (n.dur <= 2) short++;
      }
    }
    const perBar = notes / (phrases * 8);
    expect(perBar).toBeLessThan(3.5); // (relatively slow: a few notes a bar)
    expect(whole / phrases).toBeGreaterThan(1); // (a whole note or more a phrase)
    expect(triplet / notes).toBeGreaterThan(0.15);
    expect(short).toBeGreaterThan(0); // (not always slow)
  });

  it("plays triplets straight, three in the time of two", () => {
    for (const seed of seeds) {
      const ph = formPhrase(style, seed, "A");
      for (const n of ph) if (n && n.off) { expect(n.dur % 1).not.toBe(0); expect(n.off).toBeGreaterThan(0); expect(n.off).toBeLessThan(1); }
    }
    const plan: BlockPlan = { section: "deep", start: 0, bars: 32, wave: 1, arc: 1 };
    const ev = Array.from({ length: 32 * 16 }, (_, s) => notesAt(style, plan, null, s, { seed: 7, siege: 0 })).flat().filter(e => e.straight);
    expect(ev.length).toBeGreaterThan(0);
    for (const e of ev) expect(e.dur % 1).not.toBe(0);
  });
});

describe("the form's sections (Ed, 2026-10-09: \"ABAC; the first two sections should be 4 on the floor, the third sections breakbeats, and the fourth a breakdown\")", () => {
  const KICKS = ["kick", "softkick", "hardkick", "boom"];
  /** The bars of a section's kick-drum patterns, each as 16 steps hit or not. */
  const kicks = (section: string) => Object.entries(resolveSection(style, section).parts).filter(([k]) => KICKS.includes(k))
    .map(([k, u]) => style.parts[k].patterns[typeof u === "string" ? u : u.p]);
  const fourOnTheFloor = (pat: string) => Array.from({ length: pat.length / 16 }, (_, b) => pat.slice(b * 16, b * 16 + 16)).every(bar => [...bar].every((c, i) => (i % 4 === 0) === (c !== "." && c !== "-")));
  it("names a four-on-the-floor, a breakbeat and a breakdown section for every wave", () => {
    for (const a of style.arc) {
      const S = a.sections!;
      for (const s of [S.land!, ...S.four]) expect(kicks(s).some(fourOnTheFloor), `${a.name} ${s}`).toBe(true);
      for (const s of S.breaks) {
        expect(kicks(s).length, `${a.name} ${s}`).toBeGreaterThan(0);
        expect(kicks(s).some(fourOnTheFloor), `${a.name} ${s}`).toBe(false);
        expect(Object.keys(resolveSection(style, s).parts).some(k => k === "snare"), `${a.name} ${s}`).toBe(true);
      }
      for (const s of S.breakdown) expect(kicks(s), `${a.name} ${s}`).toEqual([]);
      // the melody plays in all of them
      for (const s of [S.land!, ...S.four, ...S.breaks, ...S.breakdown]) expect(Object.keys(resolveSection(style, s).parts).some(k => style.parts[k]?.role === "motif"), `${a.name} ${s}`).toBe(true);
    }
  });

  it("plays them on the form: A and B four on the floor, A breakbeats, C a breakdown, from where each wave lands", () => {
    const c = new Conductor(style), landed = 36; // (wave 1 at bar 36: the build before it, then the form)
    const cue: MusicCue = { waves: [landed], nextAt: Infinity, bootUntil: 8, knockedOut: false, siege: 0 }, S = style.arc[1].sections!;
    for (let pass = 0; pass < 3; pass++) for (let b = 0; b < 32; b++) {
      const bar = landed + pass * 32 + b, p = c.plan(cue, bar), kind = b < 16 ? "four" : b < 24 ? "breaks" : "breakdown";
      const want = kind === "four" ? (pass === 0 ? S.land! : S.four[pass % S.four.length]) : S[kind][pass % S[kind].length];
      expect(p.section, `bar ${bar}`).toBe(want);
      expect(formClock(style, cue, bar).start).toBe(landed);
    }
  });
});
