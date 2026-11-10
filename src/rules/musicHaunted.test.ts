// The haunted treatment (Ed, 2026-11-08: "B, 1-6", of six ways to bring the music closer to the vocalise demo he liked, in the
// quiet sections and the legends' clearings; then "Instead of 50% of the time, make it a drop - no drums, and then drum and bass
// kicks in. (Agree, not in legend areas)"). The rules' half: the scale's colour only there, the ghost voice diatonic, the drop,
// the slower chords and held notes, and everything else exactly as it was.
import { describe, expect, it } from "vitest";
import { withBanger } from "./musicBanger"; // (the score as it was before banger mode, ?banger=0: banger mode's own tests are musicBanger.test.ts)
import styleJson from "../../config/music-style.json";
import { checkStyle, degreeToMidi, hauntedDrop, isHaunted, notesAt, resolveSection, withHaunted, type BlockPlan, type MusicStyle, type NoteEvent } from "./musicScore";

const style = withBanger(styleJson as unknown as MusicStyle, false), H = style.haunted!, F = style.form!, plain = withHaunted(style, false);
const HAUNTED = ["breakdown", "ether", "whisper"];
/** Every note of `bars` bars of a section from form bar `start` (a breakdown's: the form's C, bars 24-31). */
const play = (st: MusicStyle, section: string, arc: number, seed: number, start = 24, bars = 8, circle?: string): NoteEvent[] => {
  const plan: BlockPlan = { section, start, bars, wave: arc, arc };
  return Array.from({ length: bars * 16 }, (_, i) => notesAt(st, plan, null, start * 16 + i, { seed, siege: 0, formStart: 0, ...(circle ? { circle: { species: circle, level: 1 } } : {}) })).flat();
};
const pcOf = (st: MusicStyle, section: string, arc: number, midi: number) => (((midi - st.root - (st.arc[arc].transpose ?? 0) - (resolveSection(st, section).transpose ?? 0)) % 12) + 12) % 12;

describe("the haunted treatment's sections and switch", () => {
  it("is on, in the quiet sections only (breakdown, ether, whisper), and the style is sound", () => {
    expect(H.on).toBe(true);
    expect(H.sections).toEqual(HAUNTED);
    for (const s of Object.keys(style.sections)) expect(isHaunted(style, s), s).toBe(HAUNTED.includes(s));
    for (const s of HAUNTED) expect(isHaunted(plain, s)).toBe(false);
    expect(checkStyle(style)).toEqual([]);
    expect(withHaunted(style, true)).toBe(style);
    expect(withHaunted(style, false)).toBe(plain);
  });

  it("leaves the drops and the energetic sections exactly as they were", () => {
    for (const section of Object.keys(style.sections).filter(s => !HAUNTED.includes(s))) for (const arc of [1, 5, 8]) {
      expect(play(style, section, arc, 11, 0, 16), section).toEqual(play(plain, section, arc, 11, 0, 16));
      expect(play(style, section, arc, 11, 24, 8), section).toEqual(play(plain, section, arc, 11, 24, 8));
    }
  });
});

describe("the scale's colour (Ed, 2026-11-08, option 5: notes outside dorian in the haunted places only)", () => {
  it("is the flat 2nd or the raised 7th, only in a haunted section's melody or a clearing's layer; dorian everywhere else, and with the treatment off", () => {
    let coloured = 0;
    for (const section of Object.keys(style.sections)) for (const arc of [0, 3, 6]) for (const seed of [3, 7, 19, 40]) {
      const scale = style.scales[style.arc[arc].scale ?? style.scale];
      for (const e of play(style, section, arc, seed, 24, 8, "owl")) {
        if (e.midi === null) continue;
        const pc = pcOf(style, section, arc, e.midi);
        if (scale.includes(pc)) continue;
        coloured++;
        expect([1, 11], `${section} ${e.part} ${e.midi}`).toContain(pc);
        expect(e.layer === "circle" || (isHaunted(style, section) && !e.ghost && !["bass", "chord", "arp"].includes(style.parts[e.part]?.role ?? "")), `${section} ${e.part}`).toBe(true);
      }
      for (const e of play(plain, section, arc, seed, 24, 8, "owl")) if (e.midi !== null) expect(scale, `${section} ${e.part} (off)`).toContain(pcOf(plain, section, arc, e.midi));
    }
    expect(coloured).toBeGreaterThan(0);
  });
});

describe("the ghost voice", () => {
  it("sings each sung note again a sixth below, diatonic, quieter, in place of the wash", () => {
    let ghosts = 0;
    for (const seed of [7, 8, 9, 10, 11, 12]) for (const section of HAUNTED) {
      const ev = play(style, section, 1, seed).filter(e => e.part === F.sung.part), scale = style.scales[style.scale];
      expect(ev.some(e => e.double), "no wash where the ghost sings").toBe(false);
      const leads = ev.filter(e => !e.ghost);
      for (const g of ev.filter(e => e.ghost)) {
        ghosts++;
        const lead = leads.find(l => l.step === g.step && l.offset === g.offset)!;
        expect(lead).toBeDefined();
        expect(g.dur).toBe(lead.dur);
        expect(g.vel).toBeCloseTo(lead.vel * H.ghost.gain, 6);
        expect(scale).toContain(pcOf(style, section, 1, g.midi!)); // (diatonic: never coloured)
        const below = lead.midi! - g.midi!; // (a sixth: 8 or 9 semitones, 7 to 10 where the lead's coloured)
        expect(below).toBeGreaterThanOrEqual(7);
        expect(below).toBeLessThanOrEqual(10);
        // its scale step exactly `interval` under the lead's (the lead's colour taken out)
        const deg = (m: number) => { for (let d = -14; d <= 21; d++) if (degreeToMidi(style, scale, d, F.sung.octave, 0) === m) return d; return NaN; };
        const ld = deg(lead.midi!), gd = deg(g.midi!);
        if (!Number.isNaN(ld)) expect(gd).toBe(ld + H.ghost.interval);
      }
    }
    expect(H.ghost.interval).toBe(-5);
    expect(ghosts).toBeGreaterThan(10);
  });

  it("ghosts a clearing's lead, below and quieter, on its layer", () => {
    const ev = play(style, "deep", 1, 7, 0, 16, "owl").filter(e => e.layer === "circle");
    const ghosts = ev.filter(e => e.ghost);
    expect(ghosts.length).toBeGreaterThan(0);
    for (const g of ghosts) { const lead = ev.find(e => !e.ghost && e.part === g.part && e.step === g.step)!; expect(lead.midi! - g.midi!).toBeGreaterThanOrEqual(7); expect(g.vel).toBeLessThan(lead.vel); }
    expect(play(plain, "deep", 1, 7, 0, 16, "owl").some(e => e.ghost)).toBe(false);
  });
});

describe("room to breathe: no drums, then the drum & bass drop (Ed, 2026-11-08: \"make it a drop - no drums, and then drum and bass kicks in\")", () => {
  it("drops at most half way in, on a 4-bar line", () => {
    expect(hauntedDrop(style, 8)).toBe(4);
    expect(hauntedDrop(style, 16)).toBe(8);
    expect(hauntedDrop(style, 32)).toBe(H.drop.afterBars);
    expect(hauntedDrop(style, 4)).toBe(Infinity);
    for (const b of [8, 12, 16, 24, 32, 64]) { const d = hauntedDrop(style, b); if (Number.isFinite(d)) { expect(d % style.blockBars).toBe(0); expect(d).toBeLessThanOrEqual(b / 2); } }
  });

  it("has no drums before the drop, a riser into it, an impact on it, then drum & bass on the key's root", () => {
    for (const section of HAUNTED) for (const bars of [8, 16]) {
      const drop = hauntedDrop(style, bars), ev = play(style, section, 2, 7, 24, bars);
      const bar = (e: NoteEvent) => Math.floor(e.step / 16) - 24;
      const drums = ev.filter(e => style.parts[e.part]?.role === "drum");
      expect(drums.filter(e => bar(e) < drop), `${section}: drums before the drop`).toEqual([]);
      for (const p of ["dnbKick", "dnbSnare", "dnbHat", "dnbSub"]) expect(ev.some(e => e.part === p && bar(e) >= drop), `${section} ${p}`).toBe(true);
      expect(drums.every(e => e.part.startsWith("dnb")), `${section}: only the drum & bass kit after it`).toBe(true);
      expect(ev.some(e => e.part === "sub" && bar(e) >= drop)).toBe(false); // (the section's own sub gives way to the drop's)
      expect(ev.filter(e => e.part === "impact").map(bar)).toEqual([drop]);
      expect(ev.filter(e => e.part === "riser").map(bar)).toEqual(Array.from({ length: H.drop.riserBars }, (_, k) => drop - H.drop.riserBars + k));
      const subs = ev.filter(e => e.part === "dnbSub"), root = style.root + (style.arc[2].transpose ?? 0);
      for (const e of subs) expect([0, 12].map(o => root + o)).toContain(e.midi);
      expect(ev.some(e => e.part === "dnbSnare" && e.vel < 0.5), "ghost snares").toBe(true);
    }
  });

  it("keeps a clearing's layer free of the drop's drums", () => {
    for (const section of ["deep", "breakdown"]) for (const e of play(style, section, 1, 7, 24, 16, "wolf").filter(e => e.layer === "circle")) expect(e.part.startsWith("dnb"), e.part).toBe(false);
  });

  it("holds the sung notes (whole notes and ties, a rest at each half phrase's end) on slower chords", () => {
    for (const seed of [7, 8, 9]) for (const section of HAUNTED) {
      const ev = play(style, section, 1, seed), sung = ev.filter(e => e.part === F.sung.part && !e.ghost);
      if (!sung.length) continue;
      expect(sung.every(e => e.dur >= 8), `${section}: held notes`).toBe(true);
      for (const half of [0, 1]) { const end = 24 * 16 + (half + 1) * 4 * 16; expect(sung.some(e => e.step < end && e.step + e.dur > end - 4), "a beat's rest before the half phrase's line").toBe(false); }
      // the chords: two a phrase (its opening's and its cadence's), against four as before
      const pads = (st: MusicStyle) => new Set(play(st, section, 1, seed).filter(e => style.parts[e.part]?.role === "bass" && e.part === "sub").map(e => `${Math.floor((Math.floor(e.step / 16) - 24) / 4)}:${e.midi}`)).size;
      expect(pads(style)).toBeLessThanOrEqual(pads(plain));
    }
  });
});
