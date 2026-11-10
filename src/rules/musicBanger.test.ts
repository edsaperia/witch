// Banger mode (Ed, 2026-11-10: "catchy spooky cute dancey witchy ravey bangers"; rules/musicBanger.ts): its properties, by the
// notes it writes. The score before it (?banger=0) has its own tests (musicPlan, musicForm, musicCompose, musicHaunted, musicSet,
// musicVictory), run with banger mode off.
import { describe, expect, it } from "vitest";
import styleJson from "../../config/music-style.json";
import { bangerChord, bangerOn, bangerRole, checkBanger, compOf, drumPatch, hookUse, kitName, kitOf, mixOf, nightHook, pentDeg, withBanger, withoutComp } from "./musicBanger";
import { Conductor, formClock, musicCue, stumpsBy, type MusicCue } from "./musicPlan";
import { arcStep, checkStyle, musicSeed, notesAt, resolveSection, tuneSeed, type MusicStyle, type NoteEvent } from "./musicScore";
import { nightStyle, planNight } from "./musicSet";
import { newGame } from "./game";
import { TUNING } from "./tuning";

const base = styleJson as unknown as MusicStyle, B = base.banger!;
const night = (seed: number, on = true) => withBanger(nightStyle(base, planNight(base, { seed, island: "owl", waves: 10 })), on);
/** A night with `before` waves landed before bar 0 and one more every 32 bars; a stump rises with each wave. */
const cueOf = (before: number, bar: number, later = [32, 64]): MusicCue => { const landed = [...Array(before).fill(0), ...later.filter(b => b <= bar)]; return { waves: landed, nextAt: later.find(b => b > bar) ?? Infinity, bootUntil: 0, knockedOut: false, siege: 0, stumps: landed }; };
function barNotes(style: MusicStyle, seed: number, before: number, bar: number, extra: Partial<MusicCue> = {}, ctx: object = {}): NoteEvent[] {
  const cue = { ...cueOf(before, bar), ...extra }, C = new Conductor(style), p = C.plan(cue, bar), f = formClock(style, cue, bar), out: NoteEvent[] = [];
  for (let s = 0; s < 16; s++) out.push(...notesAt(style, p, bar % 4 === 3 ? C.plan(cueOf(before, bar + 1), bar + 1) : null, bar * 16 + s, { seed: musicSeed(seed, f.n), formStart: f.start, siege: 0, only: "main", stumps: stumpsBy(cue, p.start, style.blockBars), ...ctx }));
  return out;
}
const SEEDS = [1, 7, 23, 101, 4242, 90001];
const kickLike = (style: MusicStyle, e: NoteEvent) => style.patches[e.patch]?.kind === "kick" && !style.patches[e.patch].noDuck;
const pitched = (e: NoteEvent) => e.midi !== null;

describe("banger mode's switch", () => {
  it("is on in the game's style and tuning, and one switch away: off, the score is the one before it, to the note", () => {
    expect(bangerOn(base)).toBeTruthy();
    expect(TUNING.music.banger).toBe(true);
    const off = withBanger(base, false), none = { ...base, banger: undefined } as MusicStyle;
    expect(bangerOn(off)).toBeNull();
    expect(withBanger(base, true)).toBe(base);
    expect(withBanger(base, false)).toBe(off); // (the same object each time: the engine isn't rebuilt)
    for (const seed of [7, 23]) for (const bar of [0, 5, 19, 27, 40]) {
      const c = cueOf(3, bar), p = new Conductor(off).plan(c, bar), q = new Conductor(none).plan(c, bar);
      for (let s = 0; s < 16; s++) expect(notesAt(off, p, null, bar * 16 + s, { seed, siege: 0, formStart: 0 })).toEqual(notesAt(none, q, null, bar * 16 + s, { seed, siege: 0, formStart: 0 }));
    }
    // (its mix is its own only while it's on)
    expect(mixOf(off)).toBe(off.mix);
    expect(mixOf(base).duck).toBe(B.mix.duck);
  });
  it("is sound: every patch, lead, fill, kit and family it names exists, in whole bars", () => {
    expect(checkBanger(base)).toEqual([]);
    expect(checkStyle(base)).toEqual([]);
    for (const seed of SEEDS) expect(checkStyle(night(seed))).toEqual([]);
  });
  it("is the same music for the same seed, whatever was asked for before", () => {
    const style = night(7), a = [3, 17, 30, 45, 70].map(b => barNotes(style, 7, 2, b));
    barNotes(night(23), 23, 4, 50); barNotes(style, 99, 1, 3);
    expect([3, 17, 30, 45, 70].map(b => barNotes(style, 7, 2, b))).toEqual(a);
    expect(barNotes(style, 8, 2, 3)).not.toEqual(a[0]);
  });
});

describe("the night's hook", () => {
  it("is eight bars: a one-bar motif three times with a changed ending, a question, the same again and an answer home", () => {
    for (const seed of SEEDS) {
      const h = nightHook(B, seed), bar = (b: number) => h.period.slice(b * 16, b * 16 + 16);
      expect(h.period.length).toBe(128);
      expect(bar(2)).toEqual(bar(0)); expect(bar(4)).toEqual(bar(0)); expect(bar(6)).toEqual(bar(0)); expect(bar(5)).toEqual(bar(1));
      // (its varied ending: the same rhythm, only its last note moved)
      const n0 = bar(0).filter(x => x), n1 = bar(1).filter(x => x);
      expect(bar(1).map(x => !!x)).toEqual(bar(0).map(x => !!x));
      expect(n1.slice(0, -1)).toEqual(n0.slice(0, -1));
      expect(n1[n1.length - 1]!.deg).not.toBe(n0[n0.length - 1]!.deg);
      // (the question ends off the root, the answer on it)
      const lastOf = (b: number) => bar(b).filter(x => x).pop()!.deg;
      expect(((lastOf(7) % 7) + 7) % 7).toBe(0);
      expect(((lastOf(3) % 7) + 7) % 7).not.toBe(0);
      expect(bar(3)).not.toEqual(bar(7));
    }
  });
  it("has a rhythm of its own: four to seven notes a bar, off the beat somewhere, with room to breathe, all in the minor pentatonic", () => {
    const PENT = new Set([0, 2, 3, 4, 6]);
    for (const seed of SEEDS) {
      const h = nightHook(B, seed), motif = h.period.slice(0, 16), on = motif.map((x, i) => (x ? i : -1)).filter(i => i >= 0);
      expect(on.length).toBeGreaterThanOrEqual(4); expect(on.length).toBeLessThanOrEqual(7);
      expect(on.some(i => i % 4 !== 0)).toBe(true); // (syncopated)
      const sounding = motif.reduce((n, x) => n + (x ? x.dur : 0), 0);
      expect(sounding).toBeLessThanOrEqual(14); // (a rest of an eighth at least)
      for (const n of h.period) if (n) expect(PENT.has(((n.deg % 7) + 7) % 7)).toBe(true);
      // (the reply only where the hook is silent)
      for (let i = 0; i < 128; i++) if (h.reply[i]) for (let j = Math.max(0, i - 15); j <= i + 1 && j < 128; j++) { const n = h.period[j]; if (n && Math.floor(j / 16) === Math.floor(i / 16)) expect(j + n.dur <= i || j >= i + h.reply[i]!.dur).toBe(true); }
    }
    expect(pentDeg(5)).toBe(7); expect(pentDeg(-1)).toBe(-1);
  });
  it("differs from night to night, and a knockdown's new record has a new one", () => {
    const sig = (s: number) => JSON.stringify(nightHook(B, s).period);
    expect(new Set(SEEDS.map(sig)).size).toBeGreaterThanOrEqual(SEEDS.length - 1);
    expect(sig(musicSeed(7, 1))).not.toBe(sig(7));
    expect(nightHook(B, 7)).toBe(nightHook(B, 7));
  });
  it("comes back at the key moments and rests between them (Ed, 2026-11-10: \"bring it back at key moments\")", () => {
    expect(hookUse("drop", 0, 16, 0, 0, false)).toBe("whole");
    expect(hookUse("drop", 7, 16, 0, 0, false)).toBe("whole");
    expect(hookUse("drop", 8, 16, 0, 0, false)).toBeNull(); // (the wave's own riff)
    expect(hookUse("drop", 0, 16, 1, 0, false)).toBeNull(); // (a later pass round the form)
    expect(hookUse("breaks", 0, 8, 0, 0, false)).toBeNull();
    expect(hookUse("breakdown", 0, 8, 0, 4, false)).toBe("slow");
    expect(hookUse("breakdown", 4, 8, 0, 4, false)).toBe("whole"); // (the drum & bass drop)
    expect(hookUse("build", 0, 8, 0, 0, false)).toBe("slow");
    expect(hookUse("build", 6, 8, 0, 0, false)).toBe("tease");
    expect(hookUse("victory", 5, 4, 0, 0, false)).toBe("whole");
    // (gentle: never whole)
    for (const role of ["drop", "breaks", "breakdown", "build"] as const) for (let b = 0; b < 16; b++) expect(hookUse(role, b, 16, 0, 4, true)).not.toBe("whole");
  });
  it("lands with every wave in that wave's key, the same tune each time, on the wave's lead; from the ninth bar the wave's own riff", () => {
    for (const seed of [7, 23, 101]) {
      const style = night(seed), h = nightHook(B, seed), lines: string[] = [];
      for (const before of [3, 5, 8]) {
        const a = arcStep(style, before), scale = style.scales[a.scale ?? style.scale], K = kitOf(B, kitName(style, a, "")), E = Math.max(B.energyFloor, a.energy);
        const leads = new Set((E < B.softBelow ? K.leads.soft : K.leads.hard).map(l => B.leads[l].patch));
        // (the landing's first two bars: the hook's own notes, a note for a note)
        for (const b of [0, 1, 3, 7]) {
          const got = barNotes(style, seed, before, b).filter(e => pitched(e) && leads.has(e.patch) && e.dur >= 1 && !style.patches[e.patch].duck || (pitched(e) && leads.has(e.patch)));
          const want = h.period.slice(b * 16, b * 16 + 16).map((n, i) => (n ? i : -1)).filter(i => i >= 0);
          const lead = got.filter(e => want.includes(e.step % 16));
          expect(lead.length).toBeGreaterThanOrEqual(want.length);
          // (its pitch classes the hook's steps in the wave's key)
          const pcs = want.map(i => (style.root + (a.transpose ?? 0) + scale[((h.period[b * 16 + i]!.deg % 7) + 7) % 7]) % 12);
          for (const [k, i] of want.entries()) expect(lead.some(e => e.step % 16 === i && ((e.midi! % 12) + 12) % 12 === ((pcs[k] % 12) + 12) % 12)).toBe(true);
          if (b === 0) lines.push(want.map((i, k) => `${i}:${(pcs[k] - (a.transpose ?? 0) + 120) % 12}`).join(","));
        }
      }
      expect(new Set(lines).size).toBe(1); // (the same tune, wave after wave, its key apart)
      // (bars 9 on: another tune, the wave's own)
      const riff = nightHook(B, (tuneSeed(seed, arcStep(style, 5).tune ?? 0) ^ 0x5bd1e995) >>> 0);
      expect(JSON.stringify(riff.period)).not.toBe(JSON.stringify(h.period));
    }
  });
});

describe("banger mode's blocks", () => {
  it("takes its roles from the form as the conductor deals it, and leaves the boot's intro and the knockout as they were", () => {
    const style = night(7), C = new Conductor(style);
    const roleAt = (bar: number, cue = cueOf(4, bar)) => { const p = new Conductor(style).plan(cue, bar); return bangerRole(style, p, arcStep(style, p.arc), resolveSection(style, p.section), formClock(style, cue, bar).start); };
    expect(roleAt(0)).toBe("drop"); expect(roleAt(15)).toBe("drop");
    expect(roleAt(16)).toBe("breaks");
    expect(roleAt(24)).toBe("build"); // (the next wave is due on bar 32: the build takes the breakdown's place)
    expect(roleAt(24, { ...cueOf(4, 24), nextAt: Infinity })).toBe("breakdown");
    expect(roleAt(40, { ...cueOf(4, 0), victory: 36 })).toBe("victory");
    const boot: MusicCue = { waves: [], nextAt: Infinity, bootUntil: 40, knockedOut: false, siege: 0 }, p = C.plan(boot, 8);
    expect(p.section).toBe(style.intro);
    expect(bangerRole(style, p, arcStep(style, p.arc), resolveSection(style, p.section), 0)).toBeNull();
    // (the intro: the old parts, layer by layer, its melody the hook at half speed)
    const intro: NoteEvent[] = [];
    for (let s = 0; s < 64; s++) intro.push(...notesAt(style, p, null, 8 * 16 + s, { seed: 7, siege: 0, formStart: 0, only: "main" }));
    expect(intro.length).toBeGreaterThan(0);
    expect(intro.every(e => !e.part.startsWith("b:"))).toBe(true);
  });
  it("drops with a crash, and an impact as a wave lands; the kick and bass out for a phrase's last beat, a fill dealt from the bank", () => {
    for (const seed of [7, 23, 101]) {
      const style = night(seed), first = barNotes(style, seed, 5, 0), eighth = barNotes(style, seed, 5, 7), third = barNotes(style, seed, 5, 2);
      expect(first.some(e => e.patch === "bgCrash" && e.step % 16 === 0)).toBe(true);
      expect(first.some(e => e.patch === "impact")).toBe(true);
      expect(barNotes(style, seed, 5, 8).some(e => e.patch === "bgCrash")).toBe(true);
      expect(third.some(e => e.patch === "bgCrash" || e.patch === "impact")).toBe(false);
      // (the eighth bar: nothing low in its last beat, and drums the third bar doesn't have)
      const low = (e: NoteEvent) => kickLike(style, e) && e.vel > 0.5 || (pitched(e) && e.midi! < 52);
      expect(eighth.filter(e => e.step % 16 >= 12 && low(e) && !e.part.includes("Tom")).filter(e => !B.fills.kicks.some(v => v.patch === e.patch))).toEqual([]);
      const drumSig = (es: NoteEvent[]) => es.filter(e => !pitched(e) && e.step % 16 >= 8).map(e => `${e.patch}@${e.step % 16}`).sort().join(" ");
      expect(drumSig(eighth)).not.toBe(drumSig(third));
    }
    // (the fills vary: more than one of the bank over a night's phrases)
    const style = night(7), sigs = new Set<string>();
    for (const b of [7, 15, 23, 39, 47]) sigs.add(barNotes(style, 7, 5, b, { nextAt: Infinity }).filter(e => !pitched(e) && e.step % 16 >= 8).map(e => `${e.patch}@${e.step % 16}`).sort().join(" "));
    expect(sigs.size).toBeGreaterThan(1);
  });
  it("gives the drums accents and ghosts, and each kit its own swing", () => {
    const style = night(23), vels = new Set(barNotes(style, 23, 7, 1).filter(e => !pitched(e)).map(e => Math.round(e.vel * 10)));
    expect(vels.size).toBeGreaterThanOrEqual(3);
    expect(kitOf(B, "garage").swing).toBeGreaterThan(kitOf(B, "house").swing);
    expect(kitOf(B, "trance").swing).toBe(0);
    // (the swing is the kit's own: its notes carry their place, the engine's global swing left out)
    const es = barNotes(style, 23, 7, 1), K = kitOf(B, kitName(style, arcStep(style, 7), ""));
    for (const e of es.filter(e => e.part.startsWith("b:") && e.patch !== "bgCrash" && e.dur !== 16)) { expect(e.straight).toBe(true); if (e.offset < 0.5) expect(e.offset).toBeCloseTo(e.step % 2 ? K.swing : 0); }
    // (organic takes the house kit's bass, chords and fills where it doesn't give its own)
    expect(kitOf(B, "acid").drums).toBe(kitOf(B, "house").drums);
    expect(kitOf(B, "acid").bass.patch).toEqual(["acid"]);
  });
  it("builds by taking away: the bass out from the half, the kick thinner then gone, the roll doubling, the last beat silent but the riser's tail", () => {
    for (const seed of [7, 23, 101]) {
      const style = night(seed), bars = [24, 25, 26, 27, 28, 29, 30, 31].map(b => barNotes(style, seed, 4, b, {}, {}));
      const kicks = bars.map(es => es.filter(e => kickLike(style, e)).length), bass = bars.map(es => es.filter(e => pitched(e) && e.midi! < 52).length);
      const rolls = bars.map(es => es.filter(e => e.patch === "snare").length);
      expect(kicks[0]).toBeGreaterThan(0); expect(kicks[4]).toBeLessThanOrEqual(2); expect(kicks[6]).toBe(0); expect(kicks[7]).toBe(0);
      expect(bass[0]).toBeGreaterThan(0); expect(bass.slice(4)).toEqual([0, 0, 0, 0]);
      expect(rolls[0]).toBe(4); expect(rolls[2]).toBe(8); expect(rolls[4]).toBe(16); expect(rolls[7]).toBeGreaterThan(16);
      expect(bars[7].filter(e => e.step % 16 >= 12)).toEqual([]);
      for (const es of bars) expect(es.some(e => e.patch === "bgRiser")).toBe(true);
      // (and the wave lands: more low end in its first bar than the build's last)
      const land = barNotes(style, seed, 4, 32);
      expect(land.filter(e => kickLike(style, e)).length).toBeGreaterThan(0);
      expect(land.some(e => e.patch === "impact")).toBe(true);
    }
  });
  it("keeps the breakdown's shape (Ed, 2026-11-08: no drums, then drum & bass): the singer on the hook at half speed, then the hook whole", () => {
    const style = night(7), cue = { nextAt: Infinity }, quiet = [24, 25, 26, 27].flatMap(b => barNotes(style, 7, 5, b, cue)), loud = [28, 29, 30].flatMap(b => barNotes(style, 7, 5, b, cue));
    expect(quiet.filter(e => !pitched(e) && e.patch !== "riser")).toEqual([]);
    const sung = quiet.filter(e => e.part === style.form!.sung.part && !e.ghost && !e.double), h = nightHook(B, 7);
    expect(sung.length).toBe(h.period.slice(0, 32).filter(x => x).length);
    expect(sung.every(e => e.dur >= 2 && e.step % 2 === 0)).toBe(true);
    expect(quiet.some(e => e.ghost)).toBe(true);
    expect(loud.some(e => e.patch === "dnbKick")).toBe(true); expect(loud.some(e => e.patch === "dnbSnare")).toBe(true);
    expect(barNotes(style, 7, 5, 28, cue).some(e => e.patch === "impact")).toBe(true);
    for (const e of sung) { expect(e.midi!).toBeGreaterThanOrEqual(53); expect(e.midi!).toBeLessThanOrEqual(81); }
  });
  it("lifts the victory a whole step with its conga claps, the hook whole throughout", () => {
    const style = night(7), cue = { victory: 8, nextAt: Infinity }, v = barNotes(style, 7, 6, 12, cue), d = barNotes(style, 7, 6, 4, cue);
    expect(v.some(e => e.patch === "clap")).toBe(true);
    const lowest = (es: NoteEvent[]) => Math.min(...es.filter(e => e.patch === "bgSub" || (pitched(e) && e.midi! < 40)).map(e => e.midi!));
    expect(((lowest(v) - lowest(d)) % 12 + 12) % 12).toBe(2);
  });
});

describe("gentle till the second stump (Ed, 2026-11-10: \"keep things gentle before the second stump\")", () => {
  it("counts the stumps by the block's start, a rise within the line's snap counting, and with no word of them plays whole", () => {
    expect(stumpsBy({}, 16, 4)).toBeUndefined();
    expect(stumpsBy({ stumps: [] }, 16, 4)).toBe(0);
    expect(stumpsBy({ stumps: [3.9, 16.1, 40] }, 16, 4)).toBe(2);
    expect(stumpsBy({ stumps: [3.9, 17, 40] }, 16, 4)).toBe(1);
  });
  it("reads them from the game: a stump a woken area, home's not one", () => {
    const g = newGame(123, TUNING);
    expect(musicCue(g).stumps).toEqual([]);
    const first = musicCue(g);
    expect(musicCue(g, first).stumps).toBe(first.stumps); // (kept while none is new)
    const cell = [...g.map.cells].find(c => !g.party.areas.has(`${c[0]},${c[1]}`))!;
    g.party.areas.set(`${cell[0]},${cell[1]}`, { cell, wave: 1, at: 8, from: null, soundsystem: null });
    expect(musicCue(g, first).stumps).toEqual([8 * (g.tuning.beat.bpm / 60) / 4]);
  });
  it("is soft, kickless of the hard kits, without impacts or rolls, the hook only slow; then opens up on the block after the second stump", () => {
    for (const seed of [7, 23, 101]) {
      const style = night(seed), gentle = (b: number) => barNotes(style, seed, 0, b), all = [0, 3, 7, 12, 20, 33, 40, 56, 60, 63].flatMap(gentle);
      expect(all.length).toBeGreaterThan(0);
      expect(all.some(e => e.patch === "impact" || e.patch === "kickHard" || e.patch === "bgRide")).toBe(false);
      expect(all.filter(e => e.patch === "snare" && e.vel > 0.5).length).toBeLessThan(6);
      for (const e of all.filter(e => e.part.startsWith("b:"))) expect(e.vel).toBeLessThanOrEqual(3.4 * 0.72 * 0.95);
      // (still music: a beat, a bass and a tune in every gentle groove bar)
      for (const b of [0, 9, 33]) { const es = gentle(b); expect(es.some(e => kickLike(style, e))).toBe(true); expect(es.some(e => pitched(e) && e.midi! < 52)).toBe(true); expect(es.some(e => pitched(e) && e.midi! >= 60)).toBe(true); }
      // (the second wave lands on bar 64, its stump with it: the impact, the hook whole)
      const open = barNotes(style, seed, 0, 64);
      expect(open.some(e => e.patch === "impact")).toBe(true);
      const slowAt = gentle(0).filter(e => pitched(e) && e.midi! >= 60 && e.dur >= 2).map(e => e.step % 2);
      expect(slowAt.every(x => x === 0)).toBe(true);
    }
  });
});

describe("banger mode's chords and bass", () => {
  it("loops four chords a bar each, none on dorian's diminished sixth step, the breakdown two bars a chord", () => {
    for (const P of B.progressions.dorian.a.concat(B.progressions.dorian.b)) { expect(P.length).toBe(4); expect(P).not.toContain(5); }
    const a = { scale: undefined };
    for (const seed of SEEDS) {
      const roots = [0, 1, 2, 3, 4, 5, 6, 7].map(b => bangerChord(base, a, seed, b).root);
      expect(roots.slice(4)).toEqual(roots.slice(0, 4));
      expect(roots[0]).toBe(0);
      expect(bangerChord(base, a, seed, 24).root).toBe(bangerChord(base, a, seed, 25).root);
      expect(bangerChord(base, a, seed, 0, true).tones.length).toBe(4);
    }
  });
  it("plays every note in the wave's scale (but a haunted place's own colour), the stabs inside one octave, the bass and its sub low", () => {
    for (const seed of [7, 23, 101]) for (const before of [2, 5, 8]) {
      const style = night(seed), a = arcStep(style, before), scale = style.scales[a.scale ?? style.scale], pcs = new Set(scale.map(x => (style.root + (a.transpose ?? 0) + x) % 12));
      for (const b of [0, 5, 9, 17, 22]) {
        const es = barNotes(style, seed, before, b);
        for (const e of es.filter(pitched)) expect(pcs.has(((e.midi! % 12) + 12) % 12)).toBe(true);
        const K = kitOf(B, kitName(style, a, ""));
        if (!K.chords.arp) { const ch = es.filter(e => e.patch === K.chords.patch && e.step % 16 === es.find(x => x.patch === K.chords.patch)?.step! % 16).map(e => e.midi!); if (ch.length) expect(Math.max(...ch) - Math.min(...ch)).toBeLessThan(12); }
        for (const e of es.filter(e => e.patch === "bgSub")) { expect(e.midi!).toBeGreaterThanOrEqual(28); expect(e.midi!).toBeLessThan(40); }
      }
    }
  });
});

describe("the game's hooks under banger mode", () => {
  it("keeps the siege's and the angry legend's parts, adds the party's sparkle, and plays a clearing's layer humming the hook", () => {
    const style = night(7), plain = barNotes(style, 7, 5, 2), siege = barNotes(style, 7, 5, 2, {}, { siege: 1 }), legend = barNotes(style, 7, 5, 2, {}, { legend: 1 }), party = barNotes(style, 7, 5, 9, {}, { party: 1 });
    expect(siege.filter(e => e.hook === "siege").length).toBeGreaterThan(0);
    expect(legend.filter(e => e.hook === "legend").length).toBeGreaterThan(0);
    expect(party.filter(e => e.hook === "party").length).toBeGreaterThan(0);
    expect(siege.filter(e => !e.hook)).toEqual(plain); // (the rest untouched: what's drawn ahead never changes with them)
    // (a clearing: its layer alone on its own clock, the species' parts, its melody the hook's pitches in turn)
    const C = new Conductor(style), cue = cueOf(5, 2), p = C.plan(cue, 2), layer: NoteEvent[] = [];
    for (let s = 0; s < 256; s++) layer.push(...notesAt(style, p, null, 32 + s, { seed: 7, siege: 0, formStart: 0, only: "circle", circleStep: s, circle: { species: "owl", level: 1 } }));
    expect(layer.length).toBeGreaterThan(0);
    expect(layer.every(e => e.layer === "circle")).toBe(true);
    const a = arcStep(style, 5), scale = style.scales[a.scale ?? style.scale], hookPcs = new Set(nightHook(B, 7).seq.map(d => (style.root + (a.transpose ?? 0) + scale[((d % 7) + 7) % 7]) % 12));
    const tune = layer.filter(e => style.parts[e.part]?.role === "motif" && !e.ghost);
    expect(tune.length).toBeGreaterThan(0);
        expect(tune.filter(e => hookPcs.has(((e.midi! % 12) + 12) % 12)).length).toBeGreaterThanOrEqual(Math.ceil(tune.length * 0.7)); // (a haunted clearing colours a note now and then)
  });
});

describe("thump, squares and vocals (Ed, 2026-11-10: \"lacks 'thump'\", \"squares and vocals as the main sound with some families keeping their own character\")", () => {
  it("has compressors of its own, in its block, off with banger mode or by themselves", () => {
    const C = compOf(base)!;
    expect(C.drums!.attack).toBeGreaterThanOrEqual(0.01); // (the hit's front through)
    expect(C.drums!.mix).toBeGreaterThan(0); expect(C.drums!.mix).toBeLessThanOrEqual(1);
    expect(C.glue!.ratio).toBeLessThanOrEqual(3); expect(C.glue!.attack).toBeGreaterThanOrEqual(0.02);
    expect(compOf(withBanger(base, false))).toBeNull();
    expect(compOf(withoutComp(base))).toBeNull();
    expect(withoutComp(base)).toBe(withoutComp(base));
    expect(bangerOn(withoutComp(base))).toBeTruthy();
    expect(drumPatch(base, "bgKick")).toBe(true); expect(drumPatch(base, "bgHat")).toBe(true); expect(drumPatch(base, "bgSub")).toBe(false); expect(drumPatch(base, "riser")).toBe(false);
  });
  it("gives the kick a body but not a note (Ed: \"Tone of the kick sounds like a note rather than a kick\"): a slower fall to about 45 Hz, a short tail, the drive on its front only, the click defining it; the soft kick stays soft; the duck deeper, holding through the body", () => {
    const k = base.patches.bgKick, s = base.patches.bgSoftKick;
    expect(k.pitchTime!).toBeGreaterThanOrEqual(0.06); expect(k.pitchTime!).toBeLessThanOrEqual(0.08);
    expect(k.pitchEnd!).toBeGreaterThanOrEqual(42); expect(k.pitchEnd!).toBeLessThanOrEqual(48);
    expect(k.decay!).toBeLessThanOrEqual(0.28); expect(k.decay!).toBeGreaterThanOrEqual(0.2);
    expect(k.driveTime!).toBeLessThan(0.1); // (saturated for the hit's front only: the tail a clean sine)
    expect(k.click!).toBeLessThan(0.5); expect(k.drive!).toBeGreaterThan(s.drive!); expect(s.click!).toBeLessThan(k.click!);
    expect(mixOf(base).duck).toBeGreaterThan(base.mix.duck); expect(mixOf(base).duckHold!).toBeGreaterThan(0.03);
    // (only the kick and the bass live low: every lead, chord and pad banger mode plays is high-passed at 120 Hz or over)
    const used = new Set<string>();
    for (const n of Object.keys(B.kits)) { const K = kitOf(B, n); if (K.chords.patch) used.add(K.chords.patch); if (K.pad) used.add(K.pad.patch); }
    for (const L of Object.values(B.leads)) used.add(L.patch);
    for (const p of [...used, B.vocals!.double, B.vocals!.pad]) expect(base.patches[p].hp ?? 0, p).toBeGreaterThanOrEqual(120);
  });
  it("leads on squares in most families, a narrow pulse replying; hand drums, ritual, dub, witch house and phonk keep their own", () => {
    const OWN = ["organic", "ritual", "dub", "trap", "phonk"], sq = (l: string) => /^bg(Square|Pulse)/.test(B.leads[l].patch) || B.leads[l].patch === "pwmArp";
    for (const n of Object.keys(B.kits)) {
      const K = kitOf(B, n);
      if (OWN.includes(n)) { expect(K.leads.hard.some(l => /^bgSquare/.test(B.leads[l].patch)), n).toBe(false); continue; }
      expect(sq(K.leads.hard[0]), n).toBe(true); expect(sq(K.leads.soft[0]), n).toBe(true);
      expect(K.reply.some(l => /^bgPulse/.test(B.leads[l].patch)), n).toBe(true);
    }
    expect(base.patches.bgSquare.waves).toEqual(["square", "square"]);
    expect(base.patches.bgSquare.cutoff2!).toBeLessThanOrEqual(9000); // (filtered up high: not harsh)
    // (a narrow pulse: an eighth of the cycle, its eighth harmonic gone)
    const h = base.patches.bgPulse.harmonics!;
    expect(h[0]).toBe(1); expect(Math.abs(h[7])).toBeLessThan(0.001); expect(Math.abs(base.patches.bgPulse25.harmonics![3])).toBeLessThan(0.001);
  });
  it("has the singer double the hook wherever it's whole, hold an ooh under the grooves and stab the riff, in her range; never before the second stump", () => {
    const V = B.vocals!;
    for (const seed of [7, 23, 101]) {
      const style = night(seed), h = nightHook(B, seed), land = [0, 1, 2, 3].flatMap(b => barNotes(style, seed, 5, b)), later = [9, 10, 11].flatMap(b => barNotes(style, seed, 5, b));
      const dbl = land.filter(e => e.patch === V.double);
      expect(dbl.length).toBe(h.period.slice(0, 64).filter(x => x).length);
      expect(land.filter(e => e.patch === V.pad).length).toBe(8); // (root and fifth, a bar each)
      expect(later.filter(e => e.patch === V.double).length).toBe(3); // (a stab a bar)
      for (const e of [...land, ...later].filter(e => e.patch === V.double || e.patch === V.pad)) { expect(e.midi!).toBeGreaterThanOrEqual(V.range[0]); expect(e.midi!).toBeLessThanOrEqual(V.range[1]); }
      const gentle = [0, 5, 9, 33, 40].flatMap(b => barNotes(style, seed, 0, b));
      expect(gentle.filter(e => e.patch === V.double || e.patch === V.pad)).toEqual([]);
    }
  });
});

describe("the tunes' register and level (Ed, 2026-11-10: \"Lead melody gets very high, and it's loud vs the drums\")", () => {
  it("keeps every lead's line at or under C6 and the reply's under E6, in every family, key, gentle or not, and the victory's lift; never below A3", () => {
    const R = B.register!, replyPatches = new Set(Object.keys(B.kits).flatMap(n => kitOf(B, n).reply.map(l => B.leads[l].patch)));
    const tunePatches = new Set(Object.values(B.leads).map(L => L.patch));
    let seen = 0, top = 0;
    for (const seed of [1, 7, 23, 101, 4242, 90001]) {
      const style = night(seed);
      for (const before of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) for (const bar of [0, 3, 7, 9, 12, 17, 22, 27, 30]) for (const extra of [{}, { victory: 0 }, { nextAt: Infinity }]) {
        const kit = kitOf(B, kitName(style, arcStep(style, before), "")), replies = new Set(kit.reply.map(l => B.leads[l].patch));
        for (const e of barNotes(style, seed, before, bar, extra)) {
          if (e.midi === null || !e.part.startsWith("b:") || !tunePatches.has(e.patch) || e.patch === B.vocals!.double) continue;
          seen++; top = Math.max(top, e.midi);
          expect(e.midi, `${e.patch} seed ${seed} wave ${before} bar ${bar}`).toBeLessThanOrEqual(replies.has(e.patch) || replyPatches.has(e.patch) ? R.reply : R.lead);
          expect(e.midi).toBeGreaterThanOrEqual(R.floor - 12);
        }
      }
    }
    expect(seen).toBeGreaterThan(2000);
    expect(R.lead).toBeLessThanOrEqual(84); expect(R.reply).toBeLessThanOrEqual(88);
    expect(top).toBeLessThanOrEqual(88);
  });
  it("plays the main lead's own line under C6 exactly (the hook on each kit's lead voices), a whole line moved by octaves, its shape kept", () => {
    for (const seed of [7, 23, 101]) {
      const style = night(seed), h = nightHook(B, seed);
      for (const before of [3, 5, 8]) {
        const a = arcStep(style, before), K = kitOf(B, kitName(style, a, "")), E = Math.max(B.energyFloor, a.energy), leads = new Set((E < B.softBelow ? K.leads.soft : K.leads.hard).map(l => B.leads[l].patch));
        const line = [0, 1, 2, 3].flatMap(b => barNotes(style, seed, before, b)).filter(e => e.midi !== null && leads.has(e.patch) && e.patch !== B.vocals!.double && h.period[e.step % 128]);
        expect(line.length).toBeGreaterThan(8);
        for (const e of line) expect(e.midi!).toBeLessThanOrEqual(84);
        // (the intervals between its notes are the hook's own: nothing folded note by note)
        const scale = style.scales[a.scale ?? style.scale], semis = (d: number) => 12 * Math.floor(d / 7) + scale[((d % 7) + 7) % 7];
        const byStep = new Map(line.map(e => [e.step, e.midi!])), steps = [...byStep.keys()].sort((x, y) => x - y);
        for (let i = 1; i < steps.length; i++) expect(byStep.get(steps[i])! - byStep.get(steps[i - 1])!).toBe(semis(h.period[steps[i] % 128]!.deg) - semis(h.period[steps[i - 1] % 128]!.deg));
      }
    }
    expect(B.register!.level).toBeLessThan(0.75); // (the tunes sit in the groove: about 3.5 dB down)
  });
});
