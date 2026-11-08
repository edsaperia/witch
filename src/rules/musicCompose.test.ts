// The composer (Ed, 2026-11-08: better melodies and basslines, "smarter rules": still made live from the seed, but written more
// as a person would). The melodies: one peak a phrase, 60-75% through; chord tones on the strong beats, notes off the chord only
// on the weak ones and left by a step; a leap filled in by a step back; no long runs of one note; the motif coming back. The
// basslines: stepping into a new chord, a four-bar phrase, sitting with the kick, each style's character kept. The same seed
// always the same music, and ?melody=old exactly the music before.
import { describe, expect, it } from "vitest";
import styleJson from "../../config/music-style.json";
import { bassBar, composeLine, LEAP, type BassRule, type LineSlot } from "./musicCompose";
import { composedMotif, composeOn, degreeToMidi, formChord, formPhrase, hauntedBar, hauntedPhrase, notesAt, resolveSection, withMelody, type BlockPlan, type MusicStyle, type NoteEvent, type PhraseNote } from "./musicScore";

const style = styleJson as unknown as MusicStyle, F = style.form!, C = style.compose!, old = withMelody(style, "old");
const P = F.phraseBars * 16, mod7 = (d: number) => ((d % 7) + 7) % 7;
const SEEDS = Array.from({ length: 160 }, (_, i) => i * 37 + 3);

type Note = PhraseNote & { pos: number };
const notesOf = (ph: (PhraseNote | null)[]): Note[] => ph.flatMap((n, i) => (n ? [{ ...n, pos: i + n.off }] : []));
/** A phrase's notes with whether each is on a strong beat and its chord's tones (the melody's: with the seventh). */
function annotated(seed: number, L: string, haunted: boolean, hook?: number) {
  const at = F.order.indexOf(L) * F.phraseBars;
  return notesOf((haunted ? hauntedPhrase : formPhrase)(style, seed, L, hook)).map(n => {
    const bar = Math.floor(n.pos / 16), chordBar = haunted ? hauntedBar(F, at + bar) : at + bar;
    return { ...n, strong: n.off === 0 && n.pos % (haunted ? 8 : 4) === 0, tones: formChord(style, seed, chordBar, !!C.sevenths).tones.map(mod7) };
  });
}
const phrases = function* () {
  for (const seed of SEEDS) for (const L of "ABC") for (const haunted of [false, true]) yield { seed, L, haunted, hook: seed % 3 ? 4242 : undefined };
};

describe("the composer's melodies", () => {
  it("is on in the game's style, and ?melody=old / tuning music.melody \"old\" brings back the old rules", () => {
    expect(composeOn(style)).toBe(C);
    expect(composeOn(old)).toBeNull();
    expect(withMelody(style, "new")).toBe(style);
    expect(withMelody(style, undefined)).toBe(style);
    expect(withMelody(style, "old")).toBe(old); // (the same object: the engine's style unchanged frame to frame)
    expect(withMelody(old, "new").compose!.on).toBe(true);
    let differ = 0;
    for (const seed of SEEDS.slice(0, 20)) if (JSON.stringify(formPhrase(style, seed, "A")) !== JSON.stringify(formPhrase(old, seed, "A"))) differ++;
    expect(differ).toBeGreaterThan(15);
  });

  it("reaches one peak a phrase, the highest note once, 60-75% through (a haunted phrase's in its second half)", () => {
    let late = 0, hn = 0;
    for (const { seed, L, haunted, hook } of phrases()) {
      const ns = annotated(seed, L, haunted, hook), top = Math.max(...ns.map(n => n.deg)), peaks = ns.filter(n => n.deg === top);
      expect(peaks.length, `${seed} ${L} ${haunted}: one peak`).toBe(1);
      const t = peaks[0].pos / P;
      if (haunted) { expect(t, `${seed} ${L} haunted peak`).toBeGreaterThanOrEqual(0.25); if (t >= 0.5) late++; } // (after the hook's bars; in the second half where its few held notes allow it)
      else { expect(t, `${seed} ${L} peak at ${t}`).toBeGreaterThanOrEqual(0.55); expect(t, `${seed} ${L} peak at ${t}`).toBeLessThanOrEqual(0.82); }
      expect(peaks[0].tones, `${seed} ${L}: the peak a chord tone`).toContain(mod7(top));
      if (haunted) hn++;
    }
    expect(late / hn).toBeGreaterThan(0.8);
  });

  it("puts chord tones on the strong beats; a note off the chord only on a weak one, reached by a step and left at once by a step to a chord tone", () => {
    let passing = 0;
    for (const { seed, L, haunted, hook } of phrases()) {
      const ns = annotated(seed, L, haunted, hook);
      ns.forEach((n, k) => {
        if (n.tones.includes(mod7(n.deg))) return;
        passing++;
        const why = `${seed} ${L} ${haunted} note ${k} (${n.deg} at ${n.pos})`;
        expect(n.strong, why).toBe(false);
        const prev = ns[k - 1], next = ns[k + 1];
        expect(prev && Math.abs(n.deg - prev.deg), why).toBe(1);
        expect(next, why).toBeDefined();
        expect(Math.abs(next.pos - (n.pos + n.dur)), `${why}: no rest before it resolves`).toBeLessThan(1e-6);
        expect(Math.abs(next.deg - n.deg), `${why}: resolved by step`).toBe(1);
        expect(next.tones, `${why}: to a chord tone`).toContain(mod7(next.deg));
      });
    }
    expect(passing).toBeGreaterThan(50); // (passing and neighbour notes are there, not only chord tones)
  });

  it("follows a leap (a fourth or wider) with a step back the other way, and never runs one note four times", () => {
    let leaps = 0, threes = 0, n = 0;
    for (const { seed, L, haunted, hook } of phrases()) {
      const d = annotated(seed, L, haunted, hook).map(x => x.deg);
      n++;
      for (let k = 1; k < d.length; k++) {
        const iv = d[k] - d[k - 1];
        if (Math.abs(iv) >= LEAP) { leaps++; if (k + 1 < d.length) expect(d[k + 1] - d[k], `${seed} ${L} ${haunted}: the leap at ${k} filled`).toBe(-Math.sign(iv)); }
        if (k >= 3) expect(d[k] === d[k - 1] && d[k - 1] === d[k - 2] && d[k - 2] === d[k - 3], `${seed} ${L} ${haunted}: four the same at ${k}`).toBe(false);
      }
      for (let k = 2; k < d.length; k++) if (d[k] === d[k - 1] && d[k - 1] === d[k - 2]) { threes++; break; }
      // the instrument's leaps a sixth at most; the singer's a fourth, into the peak only
      for (let k = 1; k < d.length; k++) expect(Math.abs(d[k] - d[k - 1])).toBeLessThanOrEqual(L === "A" && !haunted ? 5 : d[k] === Math.max(...d) ? 3 : 2);
    }
    expect(leaps).toBeGreaterThan(20);
    expect(threes / n).toBeLessThan(0.1); // (three of one note running only where the chords leave no other)
  });

  it("ends as before: A open, B on a question, C answering on the root; the singer within G3 to G4", () => {
    for (const seed of SEEDS) for (const haunted of [false, true]) {
      const last = (L: string) => notesOf((haunted ? hauntedPhrase : formPhrase)(style, seed, L)).pop()!.deg;
      expect([1, 4]).toContain(mod7(last("B")));
      expect(mod7(last("C"))).toBe(0);
      expect(mod7(last("A"))).not.toBe(0);
      for (const L of "BC") for (const n of notesOf((haunted ? hauntedPhrase : formPhrase)(style, seed, L))) {
        const m = degreeToMidi(style, style.scales[style.scale], n.deg, F.sung.octave, 0);
        expect(m).toBeGreaterThanOrEqual(55); expect(m).toBeLessThanOrEqual(67);
      }
    }
  });

  it("builds a phrase from its motif: its rhythm comes back to open the second half, and the A phrase returns exactly", () => {
    let back = 0;
    for (const seed of SEEDS) {
      const ph = formPhrase(style, seed, "A"), rh = (b: number) => ph.slice(b * 16, b * 16 + 16).map(n => (n ? "x" : ".")).join("");
      const r0 = rh(0), r4 = rh(4);
      // (the same rhythm, or a note split or two joined: at most two onsets apart)
      if ([...r0].filter((c, i) => c !== r4[i]).length <= 2) back++;
    }
    expect(back / SEEDS.length).toBeGreaterThan(0.75);
  });

  it("keeps the haunted rhythms (held notes, the cadence marks) and the returning hook", () => {
    for (const seed of SEEDS.slice(0, 40)) for (const L of "BC") {
      const ns = notesOf(hauntedPhrase(style, seed, L));
      expect(ns.every(n => n.dur >= 8)).toBe(true);
      expect(ns.filter(n => n.cad).length).toBe(4); // (each half's last two)
      const hookOf = (s: number) => formPhrase(style, s, L, 4242).slice(0, 32).map(n => (n ? `${n.deg}:${n.dur}` : ".")).join();
      if (L === "C") expect(hookOf(seed)).toBe(hookOf(4242));
    }
  });

  it("composes the clearing's (and the old styles') motifs the same way: chord tones on the beats, one peak, passing notes left by a step", () => {
    for (const seed of SEEDS.slice(0, 60)) for (const part of ["lgHorn", "lgFlute", "lgBell", "pluck"]) {
      const m = composedMotif(C, seed, seed % 9, part), top = Math.max(...m), tones = C.sevenths ? [0, 2, 4, 6] : [0, 2, 4];
      expect(m.length).toBe(32);
      expect(m.filter(v => v === top).length, `${seed} ${part}: one peak`).toBe(1);
      const at = m.indexOf(top) / 32;
      expect(at).toBeGreaterThanOrEqual(0.55); expect(at).toBeLessThanOrEqual(0.8);
      m.forEach((v, i) => {
        if (i % 4 === 0) expect(tones, `${seed} ${part} beat ${i}`).toContain(mod7(v));
        else if (!tones.includes(mod7(v))) expect(Math.abs(m[(i + 1) % 32] - v), `${seed} ${part} ${i}`).toBe(1);
      });
      expect(composedMotif(C, seed, seed % 9, part)).toEqual(m);
    }
  });

  it("finds a line that keeps every rule, or the plan's nearest chord tones when none can", () => {
    const tones = [0, 2, 4];
    const slots: LineSlot[] = [0, 4, 8, 12].map(pos => ({ pos, dur: 4, strong: true, tones, lo: 0, hi: 0, target: 0 }));
    expect(composeLine(slots, { maxStep: 2, peakStep: 2, peak: -1, maxLeaps: 0 }, true)).toEqual([0, 0, 0, 0]); // (four the same, if nothing else is allowed)
    expect(composeLine(slots, { maxStep: 2, peakStep: 2, peak: -1, maxLeaps: 0, ends: [4] }, true)).toBeNull();
    expect(composeLine(slots, { maxStep: 2, peakStep: 2, peak: -1, maxLeaps: 0, ends: [4] })).toEqual([0, 0, 0, 0]);
  });
});

// ---------------------------------------------------------------- the basslines

const play = (st: MusicStyle, section: string, arc: number, seed: number, start = 0, bars = 32): NoteEvent[] => {
  const plan: BlockPlan = { section, start, bars, wave: arc, arc };
  return Array.from({ length: bars * 16 }, (_, i) => notesAt(st, plan, null, start * 16 + i, { seed, siege: 0, formStart: 0 })).flat();
};

describe("the composer's basslines", () => {
  const rule = (r: Partial<BassRule>): BassRule => ({ ...r });
  const always = () => 0, never = () => 0.999;

  it("steps into a new chord on the last beat (or eighth): from a step above or below, or its fifth", () => {
    const bar = "..1-..1-..1-..1-";
    for (const [x, want] of [[0.1, 4 - 1], [0.5, 4 + 1], [0.8, 4 + 4], [0.95, 4 - 3]] as const) {
      const line = bassBar(bar, rule({}), 1, 0, 4, null, 0, k => (k === 6 ? x : 0.5));
      expect(line[14]).toMatchObject({ k: want, abs: true });
      for (let s = 0; s < 14; s++) if (line[s]) expect(line[s]!.abs).toBeUndefined();
    }
    // the chord staying, or the dice saying no: the pattern as it is
    expect(bassBar(bar, rule({}), 1, 0, null, null, 0, always)[14]).toMatchObject({ k: 0 });
    expect(bassBar(bar, rule({}), 0.6, 0, 4, null, 0, never)[14]).toMatchObject({ k: 0 });
    // a held pattern takes a note on the last eighth to step from, when the part may add one
    const held = "1-------5-------";
    expect(bassBar(held, rule({ insert: true }), 1, 0, 3, null, 0, always)[14]).toMatchObject({ abs: true, dur: 2 });
    expect(bassBar(held, rule({ insert: true }), 1, 0, 3, null, 0, always)[8]!.dur).toBe(6);
    expect(bassBar(held, rule({}), 1, 0, 3, null, 0, always).filter(Boolean).length).toBe(2);
    // "a" in a pattern: always into the next chord, the root when it stays
    expect(bassBar("1-------5-----a-", rule({ approach: 0 }), 0, 0, 5, null, 0, k => (k === 6 ? 0.1 : 0.5))[14]).toMatchObject({ k: 4, abs: true });
    expect(bassBar("1-------5-----a-", rule({ approach: 0 }), 0, 0, null, null, 0, always)[14]).toMatchObject({ k: 0 });
  });

  it("varies a four-bar phrase: the fourth bar's fill (a walk, an octave up, chip's arpeggio), an octave moved in the second or third", () => {
    const walk = bassBar("..1-..1-..1-..1-", rule({ fill: "walk" }), 0, 0, null, null, 3, always);
    expect([walk[12]?.k, walk[14]?.k]).toEqual([4, 7]);
    const oct = bassBar("1.18.51.8.1.5.18", rule({ fill: "octave" }), 0, 0, null, null, 3, always);
    for (let s = 12; s < 16; s++) if (oct[s]) expect(oct[s]!.k).toBeGreaterThanOrEqual(7);
    const arp = bassBar("1.8.1.8.1.8.1.8.", rule({ fill: "arp" }), 0, 0, null, null, 3, always);
    expect(arp.slice(12).map(n => n?.k)).toEqual([0, 2, 4, 7]);
    expect(bassBar("1.8.1.8.1.8.1.8.", rule({ fill: "arp" }), 0, 0, null, null, 2, always).slice(12).map(n => n?.k)).toEqual([0, undefined, 7, undefined]);
    const moved = bassBar("..1-..1-..1-..1-", rule({ octave: 1 }), 0, 0, null, null, 1, always);
    expect(moved.filter(n => n && n.k === 7).length).toBe(1);
    // in the game: the deep house bass's four bars not one bar four times
    const ev = play(style, "deep", 1, 7).filter(e => e.part === "bass"), barOf = (b: number) => ev.filter(e => Math.floor(e.step / 16) === b).map(e => `${e.step % 16}:${e.midi}`).join();
    let varied = 0;
    for (let p = 0; p < 8; p++) if (new Set([0, 1, 2, 3].map(q => barOf(p * 4 + q).replace(/:\d+/g, ""))).size > 1) varied++;
    expect(varied).toBeGreaterThan(3);
  });

  it("sits with the kick: ghost notes on it or just after it, never just before it; a breakbeat's held bass struck again on its kicks", () => {
    const kick = "x.........x.....";
    for (let t = 0; t < 40; t++) {
      const line = bassBar("1.......5.......", rule({ ghost: 1 }), 0, 0, null, kick, t % 4, k => ((k * 7919 + t * 104729) % 1000) / 1000);
      line.forEach((n, s) => {
        if (!n || n.vel > 0.5) return;
        expect(kick[s + 1] === "x", `ghost at ${s} before a kick`).toBe(false);
        expect(kick[s - 1] === "x" || kick[s] === "x", `ghost at ${s} with the kick`).toBe(true);
      });
    }
    const re = bassBar("1-------5-------", rule({ restrike: true }), 0, 0, null, kick, 0, never);
    expect(re[10]).toMatchObject({ k: 4 });
    expect(re[8]!.dur).toBe(2);
    expect(bassBar("1-------5-------", rule({ restrike: true }), 0, 0, null, "x...x...x...x...", 0, never).filter(Boolean).length).toBe(2); // (four on the floor: nothing to follow)
    // in the game: the jungle reese follows the jungle kick
    const ev = play(style, "jungle", 7, 7, 0, 8), kicks = new Set(ev.filter(e => e.part === "hardkick").map(e => e.step));
    expect(ev.filter(e => e.part === "reese" && e.step % 4 !== 0).some(e => kicks.has(e.step))).toBe(true);
  });

  it("steps into the chord changes in the game, about as often as the style says, and only from a step or a fifth", () => {
    let changes = 0, approached = 0;
    for (const seed of [3, 7, 11, 19]) for (const [section, part] of [["deep", "bass"], ["acidHouse", "acid"], ["dark", "darkbass"], ["breaks", "reese"], ["chip", "chipbass"]] as const) {
      const arc = 1, ev = play(style, section, arc, seed).filter(e => e.part === part), sc = style.scales[style.scale], tr = style.arc[arc].transpose ?? 0, oct = style.parts[part].octave ?? 0;
      for (let b = 0; b < 31; b++) {
        const now = formChord(style, seed, b).root, nx = formChord(style, seed, b + 1).root;
        if (now === nx) continue;
        changes++;
        const last = ev.filter(e => e.step >= b * 16 + 12 && e.step < b * 16 + 16).pop();
        if (last && [-1, 1, 4, -3].some(k => degreeToMidi(style, sc, nx + k, oct, tr) === last.midi)) approached++;
      }
    }
    expect(approached / changes).toBeGreaterThan(0.3);
    expect(approached / changes).toBeLessThan(0.9);
  });

  it("keeps each style's character: the drones, the plain subs and the drum & bass sub as they were", () => {
    for (const [section, arc, parts] of [["forest", 0, ["sub"]], ["whisper", 2, ["sub"]], ["breakdown", 2, ["dnbSub", "sub"]], ["ritual", 0, ["sub"]]] as const) {
      const pick = (st: MusicStyle) => play(st, section, arc, 7, 24, 8).filter(e => (parts as readonly string[]).includes(e.part));
      expect(pick(style), section).toEqual(pick(old));
    }
    const circle = (st: MusicStyle) => Array.from({ length: 256 }, (_, i) => notesAt(st, { section: "deep", start: 0, bars: 16, wave: 1, arc: 1 }, null, i, { seed: 7, siege: 0, circle: { species: "elk", level: 1 } })).flat().filter(e => e.layer === "circle" && style.parts[e.part]?.role === "bass");
    expect(circle(style)).toEqual(circle(old));
    expect(Object.keys(C.bass.parts).sort()).toEqual(["acid", "bass", "chipbass", "darkbass", "reese", "sub"]);
    // the acid line keeps its sixteenths: its notes where its pattern has them, but for the approach and the fill
    const acid = play(style, "acidHouse", 1, 7, 0, 16).filter(e => e.part === "acid"), pat = style.parts.acid.patterns.acid;
    expect(acid.filter(e => pat[e.step % 16] === "." && e.step % 16 < 12).length).toBe(0);
  });

  it("is the same music for the same seed, whatever was asked for before", () => {
    const a = play(style, "darkDrop", 3, 99, 0, 16), b0 = play(style, "deep", 1, 5, 0, 8);
    const b = play(style, "darkDrop", 3, 99, 0, 16);
    expect(b).toEqual(a);
    expect(play(style, "deep", 1, 5, 0, 8)).toEqual(b0);
    for (const seed of SEEDS.slice(0, 10)) for (const L of "ABC") expect(formPhrase(style, seed, L)).toEqual(formPhrase(style, seed, L));
    expect(resolveSection(style, "darkDrop").parts.darkbass).toBe("drive");
  });
});
