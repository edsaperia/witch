// Banger mode (Ed, 2026-11-10: "catchy spooky cute dancey witchy ravey bangers"; rules/musicBanger.ts): its properties, by the
// notes it writes. The score before it (?banger=0) has its own tests (musicPlan, musicForm, musicCompose, musicHaunted, musicSet,
// musicVictory), run with banger mode off.
import { describe, expect, it } from "vitest";
import styleJson from "../../config/music-style.json";
import { bangerChord, bangerOn, bangerRole, bangerScaleName, checkBanger, compOf, drumPatch, hookUse, kitName, kitOf, mixOf, nightHook, ostinato, ostinatoHeard, pentDeg, withBanger, withoutComp, xyloFigure } from "./musicBanger";
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
/** The scale a wave plays in (banger mode's: natural minor but a wave of dorian now and then, or the night's own for it). */
const scaleOf = (style: MusicStyle, a: ReturnType<typeof arcStep>, seed: number) => style.scales[bangerScaleName(style, a, seed)];
/** A wave's bass patches (and the sub). */
const bassOf = (style: MusicStyle, before: number) => new Set([...kitOf(B, kitName(style, arcStep(style, before), "")).bass.patch, "bgSub", ...B.dnb.bass.patch]);
/** A note of the singer's harmony (its middle voice, or its left or right). */
const isPad = (e: NoteEvent) => !!B.vocals && [B.vocals.pad, B.vocals.pad + "L", B.vocals.pad + "R"].includes(e.patch);
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
  /** A hook's notes in time order: [sixteenth of its period, the note]. */
  const notesOf = (h: ReturnType<typeof nightHook>) => h.period.flatMap((n, i) => [...(n ? [[i, n] as const] : []), ...h.orn[i].map(o => [i + o.off!, o] as const)]).sort((x, y) => x[0] - y[0]);
  const MANY = Array.from({ length: 60 }, (_, i) => 3 + i * 7919);
  const m7 = (d: number) => ((d % 7) + 7) % 7;
  it("is eight bars, long then run (Ed, 2026-11-11): a one-bar motif three times with a changed ending, a question, the same again and an answer home; each bar a held note or two, the runs between them by step into the next", () => {
    for (const seed of [...SEEDS, ...MANY]) {
      const h = nightHook(B, seed), all = notesOf(h), bar = (b: number, into = false) => all.filter(([t, n]) => Math.floor(t / 16) === b && (into || !n.into)).map(([t, n]) => [Math.round((t - b * 16) * 1000), n.deg, n.dur]);
      expect(h.period.length).toBe(128);
      expect(bar(2)).toEqual(bar(0)); expect(bar(4)).toEqual(bar(0)); expect(bar(6)).toEqual(bar(0)); expect(bar(5, true)).toEqual(bar(1, true));
      // (its varied ending: the same rhythm, its last long note moved)
      const longs = (b: number) => all.filter(([t, n]) => Math.floor(t / 16) === b && n.long).map(([t, n]) => [t - b * 16, n.deg]);
      expect(longs(1).map(x => x[0])).toEqual(longs(0).map(x => x[0]));
      expect(longs(1).slice(0, -1)).toEqual(longs(0).slice(0, -1));
      expect(longs(1).at(-1)![1]).not.toBe(longs(0).at(-1)![1]);
      // (the question ends off the root, the answer on it)
      expect(m7(longs(7).at(-1)![1])).toBe(0); expect(m7(longs(3).at(-1)![1])).not.toBe(0);
      for (let b = 0; b < 8; b++) {
        // (a long note in every bar, a quarter note or more, landing on an eighth; the motif's on the minor triad)
        expect(all.some(([t, n]) => Math.floor(t / 16) === b && n.long && n.dur >= 4)).toBe(true);
        for (const [t, deg] of longs(b)) { expect(t % 2).toBe(0); if (b % 2 === 0) expect([0, 2, 4]).toContain(m7(deg)); }
      }
      // (room to breathe: the motif rests an eighth at least)
      expect(bar(0).reduce((n, x) => n + x[2], 0)).toBeLessThanOrEqual(14);
      // (every run, turn and pair leads by step to a long note: no note that isn't long is left hanging, none leaps)
      all.forEach(([t, n], i) => { if (n.long) return; const [t2, nx] = all[(i + 1) % all.length]; expect(Math.abs(nx.deg - n.deg), `seed ${seed} at ${t}`).toBeLessThanOrEqual(2); expect((t2 - t + 128) % 128).toBeCloseTo(n.dur, 5); });
      // (the reply only where the hook is silent)
      for (let i = 0; i < 128; i++) if (h.reply[i]) for (const [t, n] of all) if (Math.floor(t / 16) === Math.floor(i / 16)) expect(t + n.dur <= i + 1e-9 || t >= i + h.reply[i]!.dur).toBe(true);
    }
    expect(pentDeg(5)).toBe(7); expect(pentDeg(-1)).toBe(-1);
  });
  it("writes its ornaments as exact rhythms on the grid, never slides: sixteenth runs, thirty-second pairs, triplet turns; rests and pickups; no lead patch glides or bends", () => {
    let pickups = 0, triplets = 0, pairs = 0, runs = 0;
    for (const seed of MANY) {
      const h = nightHook(B, seed), all = notesOf(h);
      for (const [t, n] of all) {
        const f = t - Math.floor(t);
        expect([0, 0.5, 1 / 3, 2 / 3].some(x => Math.abs(x - f) < 1e-9), `seed ${seed}`).toBe(true); // (a sixteenth, its half, or a third of two)
        if (!n.long) expect([1, 0.5, 2 / 3].some(x => Math.abs(x - n.dur) < 1e-9)).toBe(true);
      }
      if (!h.period[0]) pickups++; // (enters after a rest, its first notes a pickup into the long one)
      if (all.some(([, n]) => Math.abs(n.dur - 2 / 3) < 1e-9)) triplets++;
      if (all.some(([, n]) => n.dur === 0.5)) pairs++;
      if (all.some(([, n]) => n.dur === 1 && !n.long)) runs++;
    }
    expect(pickups).toBeGreaterThan(5); expect(triplets).toBeGreaterThan(8); expect(pairs).toBeGreaterThan(8); expect(runs).toBeGreaterThan(40);
    // (no slide in any lead: the patches banger mode's tunes play have no glide and no bend, and no tune note asks for one)
    for (const L of Object.values(B.leads)) { const P = base.patches[L.patch], Q = P.from ? { ...base.patches[P.from], ...P } : P; expect(Q.glide ?? 0, L.patch).toBe(0); expect(Q.bend ?? 0, L.patch).toBe(0); }
    for (const seed of [7, 23, 101]) { const style = night(seed); for (const before of [3, 5, 8]) for (const bar of [0, 1, 9, 17, 28]) { const leads = new Set(Object.values(B.leads).map(l => l.patch)); for (const e of barNotes(style, seed, before, bar, { nextAt: Infinity })) if (leads.has(e.patch)) expect(e.glide).toBeUndefined(); } }
    // (and in the score: an ornament's place is the swung grid's own, a fraction of the way from its sixteenth to the next)
    for (const seed of [7, 23, 101]) { const style = night(seed), K = kitOf(B, kitName(style, arcStep(style, 5), "")); for (const b of [0, 1, 3, 7]) for (const e of barNotes(style, seed, 5, b).filter(e => e.part.startsWith("b:") && e.dur < 16 && !isPad(e))) { const sw = e.step % 2 ? K.swing : 0, f = e.step % 2 ? (e.offset - K.swing) / (1 - K.swing) : e.offset / (1 + K.swing); expect([0, 0.5, 1 / 3, 2 / 3].some(x => Math.abs(x - f) < 1e-6) || Math.abs(e.offset - sw) < 1e-6 || Math.abs(e.offset - sw - 0.5) < 1e-6, `${e.patch} ${e.offset}`).toBe(true); } }
  });
  it("has harmonic minor's colour: the leading note raised where a run or a turn rises to the root, an augmented second from the flat sixth, sounded where the bar's chord has no seventh of its own", () => {
    let sharp = 0, aug = 0, heard = 0;
    for (const seed of MANY) {
      const h = nightHook(B, seed), all = notesOf(h).map(x => x[1]);
      if (all.some(n => n.sharp)) sharp++;
      if (all.some((n, i) => n.sharp && m7(all[(i + all.length - 1) % all.length].deg) === 5)) aug++;
      for (const [i, n] of all.entries()) if (n.sharp) { expect(m7(n.deg)).toBe(6); if (!n.long) expect(all[(i + 1) % all.length].deg).toBe(n.deg + 1); }
    }
    expect(sharp / MANY.length).toBeGreaterThan(0.5); expect(aug / MANY.length).toBeGreaterThan(0.15);
    // (in the notes: over the first chord, the root's, a raised seventh sounds a semitone under the root)
    for (const seed of MANY.slice(0, 30)) {
      const style = night(seed), h = nightHook(B, seed), a = arcStep(style, 5), scale = scaleOf(style, a, seed);
      if (scale[6] !== 10) continue;
      for (const b of [0, 1, 3, 7]) { const ch = bangerChord(style, a, tuneSeed(seed, a.tune ?? 0), b, false, false, bangerScaleName(style, a, seed)); if (ch.tones.some(t => m7(t) === 6)) continue; const want = notesOf(h).filter(([t, n]) => Math.floor(t / 16) === b && n.sharp).length; if (!want) continue; const pc = (style.root + (a.transpose ?? 0) + 11) % 12; if (barNotes(style, seed, 5, b).some(e => pitched(e) && !e.part.includes("Sub") && e.midi! % 12 === pc && e.dur <= 8)) heard++; }
    }
    expect(heard).toBeGreaterThan(5);
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
        const a = arcStep(style, before), scale = scaleOf(style, a, seed), K = kitOf(B, kitName(style, a, "")), E = Math.max(B.energyFloor, a.energy);
        const leads = new Set((E < B.softBelow ? K.leads.soft : K.leads.hard).map(l => B.leads[l].patch));
        // (the landing's first two bars: the hook's own notes, a note for a note)
        for (const b of [0, 1, 3, 7]) {
          const got = barNotes(style, seed, before, b).filter(e => pitched(e) && leads.has(e.patch) && e.dur >= 1 && !style.patches[e.patch].duck || (pitched(e) && leads.has(e.patch)));
          const want = h.period.slice(b * 16, b * 16 + 16).map((n, i) => (n ? i : -1)).filter(i => i >= 0);
          const lead = got.filter(e => want.includes(e.step % 16));
          expect(lead.length).toBeGreaterThanOrEqual(want.length);
          // (its pitch classes the hook's steps in the wave's key)
          const pcs = want.map(i => (style.root + (a.transpose ?? 0) + scale[((h.period[b * 16 + i]!.deg % 7) + 7) % 7]) % 12);
          // (the seventh step a semitone up as a leading note, or over a cadence's major chord)
          for (const [k, i] of want.entries()) expect(lead.some(e => e.step % 16 === i && [0, 1].includes((((e.midi! - pcs[k]) % 12) + 12) % 12))).toBe(true);
          if (b === 0) lines.push(want.map(i => `${i}:${((h.period[i]!.deg % 7) + 7) % 7}`).join(","));
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
      const kicks = bars.map(es => es.filter(e => kickLike(style, e)).length), bass = bars.map(es => es.filter(e => bassOf(style, 4).has(e.patch)).length);
      const rolls = bars.map(es => es.filter(e => e.patch === "snare").length);
      expect(kicks[0]).toBeGreaterThan(0); expect(kicks[4]).toBeLessThanOrEqual(2); expect(kicks[6]).toBe(0); expect(kicks[7]).toBe(0);
      expect(bass[0]).toBeGreaterThan(0); expect(bass.slice(4)).toEqual([0, 0, 0, 0]);
      // (its first half light: finger snaps on two and four, no snare; the roll from the half, doubling into the last bar)
      expect(rolls.slice(0, 4)).toEqual([0, 0, 0, 0]); expect(rolls[4]).toBe(16); expect(rolls[7]).toBeGreaterThan(16);
      for (const es of bars.slice(0, 4)) expect(es.filter(e => e.patch === B.spice!.snap).map(e => e.step % 16)).toEqual([4, 12]);
      for (const es of bars.slice(4)) expect(es.filter(e => e.patch === B.spice!.snap)).toEqual([]);
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
    expect(quiet.filter(e => !pitched(e) && e.patch !== "riser" && e.patch !== B.dream!.riser && e.patch !== B.spice!.snap)).toEqual([]); // (no drums but, now and then, a finger snap)
    const sung = quiet.filter(e => e.part === style.form!.sung.part && !e.ghost && !e.double), h = nightHook(B, 7);
    expect(sung.length).toBe(h.period.slice(0, 32).filter(x => x?.long).length); // (its long notes: the runs are left to the bed)
    expect(sung.every(e => e.dur >= 6 && e.step % 2 === 0)).toBe(true);
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
      expect(all.filter(e => e.patch === "snare" && e.vel > 0.5 * B.space!.balance.drums).length).toBeLessThan(6);
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
      const style = night(seed), a = arcStep(style, before), scale = scaleOf(style, a, seed), pcs = new Set(scale.map(x => (style.root + (a.transpose ?? 0) + x) % 12));
      pcs.add((style.root + (a.transpose ?? 0) + 11) % 12); // (the leading note, over a cadence's major chord)
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
    const a = arcStep(style, 5), scale = scaleOf(style, a, 7), hookPcs = new Set(nightHook(B, 7).seq.map(d => (style.root + (a.transpose ?? 0) + scale[((d % 7) + 7) % 7]) % 12));
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
    expect(k.pitchEnd!).toBeGreaterThanOrEqual(38); expect(k.pitchEnd!).toBeLessThanOrEqual(44); // (Ed, 2026-11-11: "Kick tone is too high")
    expect(k.pitch!).toBeLessThanOrEqual(125);
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
  it("has the singer double the hook's long notes wherever it's whole, exactly with the lead (its runs and turns the lead's alone), a second voice a third under her; hold an ooh under the grooves; in her range; never before the second stump", () => {
    const V = B.vocals!;
    for (const seed of [7, 23, 101]) {
      const style = night(seed), h = nightHook(B, seed), land = [0, 1, 2, 3].flatMap(b => barNotes(style, seed, 5, b)), later = [9, 10, 11].flatMap(b => barNotes(style, seed, 5, b));
      const a = arcStep(style, 5), K = kitOf(B, kitName(style, a, "")), E = Math.max(B.energyFloor, a.energy), leads = new Set((E < B.softBelow ? K.leads.soft : K.leads.hard).map(l => B.leads[l].patch));
      const dbl = land.filter(e => e.patch === V.double), longs = h.period.slice(0, 64).filter(x => x?.long).length;
      expect(dbl.length).toBe(longs * 2); // (her note and the third under it)
      expect(new Set(dbl.map(e => e.step)).size).toBe(longs);
      // (each on the lead's own sixteenth, the same place in it: one attack)
      for (const e of dbl) expect(land.some(l => leads.has(l.patch) && l.step === e.step && Math.abs(l.offset - e.offset) < 1e-9 && l.dur >= 3), `${seed} step ${e.step}`).toBe(true);
      for (const st of new Set(dbl.map(e => e.step))) { const two = dbl.filter(e => e.step === st).map(e => e.midi!).sort((x, y) => x - y), d = two[1] - two[0]; expect([3, 4, 8, 9]).toContain(d); } // (a third, or its sixth: inside the scale)
      expect(land.filter(e => isPad(e)).length).toBe(12); // (three voices, a bar each)
      for (const e of later.filter(e => e.patch === V.double)) expect(later.some(l => leads.has(l.patch) && l.step === e.step && Math.abs(l.offset - e.offset) < 1e-9)).toBe(true);
      for (const e of [...land, ...later].filter(e => e.patch === V.double)) { expect(e.midi!).toBeGreaterThanOrEqual(V.range[0]); expect(e.midi!).toBeLessThanOrEqual(V.range[1]); }
      for (const e of [...land, ...later].filter(isPad)) { expect(e.midi!).toBeGreaterThanOrEqual(60); expect(e.midi!).toBeLessThanOrEqual(79); } // (a woman's register, inside her recorded G3 to G5)
      const gentle = [0, 5, 9, 33, 40].flatMap(b => barNotes(style, seed, 0, b));
      expect(gentle.filter(e => e.patch === V.double)).toEqual([]); // (before the second stump: no doubling or stabs, her harmony soft)
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
        const line = [0, 1, 2, 3].flatMap(b => barNotes(style, seed, before, b)).filter(e => e.midi !== null && leads.has(e.patch) && e.patch !== B.vocals!.double && e.offset < 0.3 && h.period[e.step % 128]);
        expect(line.length).toBeGreaterThan(8);
        for (const e of line) expect(e.midi!).toBeLessThanOrEqual(84);
        // (the intervals between its notes are the hook's own: nothing folded note by note)
        const scale = scaleOf(style, a, seed), semis = (d: number) => 12 * Math.floor(d / 7) + scale[((d % 7) + 7) % 7], sev = (st: number) => ((h.period[st % 128]!.deg % 7) + 7) % 7 === 6;
        const byStep = new Map(line.map(e => [e.step, e.midi!])), steps = [...byStep.keys()].sort((x, y) => x - y);
        for (let i = 1; i < steps.length; i++) { const d = byStep.get(steps[i])! - byStep.get(steps[i - 1])! - (semis(h.period[steps[i] % 128]!.deg) - semis(h.period[steps[i - 1] % 128]!.deg)); if (sev(steps[i]) || sev(steps[i - 1])) expect(Math.abs(d)).toBeLessThanOrEqual(1); else expect(d).toBe(0); } // (but the seventh step raised at a cadence)
      }
    }
    expect(B.register!.level).toBeLessThan(0.75); // (the tunes sit in the groove: about 3.5 dB down)
  });
});

describe("the sprinkles (Ed, 2026-11-10: \"Some Xylophone and Finger snap snares help with the spooky vibe; sprinkle some of these in sometimes\")", () => {
  it("come and go by the phrase: the finger snaps in some phrases, a quarter to a half of them, never all; the xylophone under the lead's ceiling", () => {
    const SP = B.spice!, xy = B.leads[SP.xylo].patch;
    let phrases = 0, withXylo = 0, withSnap = 0, alone = 0;
    for (const seed of [1, 7, 23, 101, 4242, 90001]) {
      const style = night(seed);
      for (const before of [2, 3, 4, 5, 6, 7, 8]) for (const p0 of [0, 8, 16]) {
        const es = [0, 1, 2, 3, 4, 5, 6, 7].flatMap(k => barNotes(style, seed, before, p0 + k, { nextAt: Infinity }));
        phrases++;
        if (es.some(e => e.patch === xy)) withXylo++;
        if (es.some(e => e.patch === SP.snap)) { withSnap++; if (!es.some(e => ["bgClap", "clap", "snare", "dnbSnare"].includes(e.patch) && e.step % 16 < 8)) alone++; }
        // (the xylophone under the lead's ceiling: mid-high, never shrill; the snaps where a backbeat is)
        for (const e of es.filter(e => e.patch === xy)) { expect(e.midi!).toBeLessThanOrEqual(B.register!.lead); expect(e.midi!).toBeGreaterThanOrEqual(50); }
      }
    }
    expect(withXylo / phrases).toBeGreaterThan(0.5); // (the xylophone has the rolling bed, or the ostinato with the lead, in most phrases; the families with their own pluck have theirs)
    expect(withSnap / phrases).toBeGreaterThan(0.15); expect(withSnap / phrases).toBeLessThan(0.6);
    expect(alone).toBe(withSnap); // (always in the clap's or snare's place: a phrase is one or the other)
  });
  it("makes them of synthesis, the snap a drum of the drum bus", () => {
    const SP = B.spice!;
    expect(base.patches[SP.snap].kind).toBe("noise"); expect(drumPatch(base, SP.snap)).toBe(true);
    expect(base.patches[B.leads[SP.xylo].patch].kind).toBe("synth");
    expect(base.patches[B.leads[SP.xylo].patch].decay!).toBeLessThan(0.25); // (a short wooden bar)
    for (const n of Object.keys(B.kits)) expect([...kitOf(B, n).leads.soft, ...kitOf(B, n).leads.hard], n).not.toContain(SP.xylo); // (a sprinkle, not a kit's lead)
  });
});

describe("space, the xylophone's chords, her harmony and the rhythm section (Ed, 2026-11-11: \"more space in general, more xylophone chords and arpeggios, and the rhythm section bigger in the mix\"; \"increase vocals in the harmony, which can stack with the xylophone, and also tend towards snares that are claps or snaps\")", () => {
  const S = B.space!, V = B.vocals!, X = S.xylo, xyPatches = new Set([B.leads[X.voice].patch, B.leads[X.low].patch].flatMap(p => [p, p + "L", p + "R"]));
  /** A groove's bars after the second stump, between the hook's returns: [style, seed, wave, bar, its notes]. */
  function* grooves(): Generator<[MusicStyle, number, number, number, NoteEvent[]]> {
    for (const seed of [1, 7, 23, 101, 4242, 90001]) { const style = night(seed); for (const before of [2, 3, 4, 5, 6, 7, 8, 9]) for (const bar of [8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 20, 21, 22]) yield [style, seed, before, bar, barNotes(style, seed, before, bar, { nextAt: Infinity })]; }
  }
  /** Whether a wave's grooves have the ostinato (a four-on-the-floor kit's). */
  const ostKit = (K: ReturnType<typeof kitOf>) => !!B.ostinato && !!K.four && !K.half;
  it("leaves room in the grooves: no pad there; a long-then-run riff resting in its third bar of four, its voices taking turns; the kit's chords only where the tune rests, without their root", () => {
    let rests = 0, bars = 0;
    for (const [style, seed, before, bar, es] of grooves()) {
      const a = arcStep(style, before), K = kitOf(B, kitName(style, a, "")), E = Math.max(B.energyFloor, a.energy), tune = new Set([...(E < B.softBelow ? K.leads.soft : K.leads.hard), ...K.reply].map(l => B.leads[l].patch));
      bars++;
      if (K.pad) expect(es.filter(e => e.patch === K.pad!.patch && e.dur === 16), `${seed} ${before} ${bar}`).toEqual([]);
      if (ostKit(K) && bar < 16) continue; // (the ostinato's grooves: their own test)
      const line = es.filter(e => pitched(e) && tune.has(e.patch) && e.patch !== K.chords.patch && !e.hook && !xyPatches.has(e.patch) && e.patch !== V.double && e.patch !== (K.bed ? B.leads[K.bed].patch : "") && e.step % 16 < 12);
      if (bar % 4 === 2 && bar < 16) { rests++; expect(line, `${seed} ${before} ${bar}`).toEqual([]); }
      // (one voice of the tune at a time: never two starting on the same sixteenth)
      const at = new Map<number, Set<string>>();
      for (const e of line) (at.get(e.step) ?? at.set(e.step, new Set()).get(e.step)!).add(e.patch);
      for (const [st, v] of at) expect([...v].join("+") + (v.size > 1 ? ` seed ${seed} wave ${before} bar ${bar} step ${st % 16}` : ""), "one voice of the tune at a time").toBe([...v][0]);
      // (the kit's stabs: only in the bar the riff rests, two notes a hit where it isn't an arpeggio)
      const stabs = es.filter(e => e.patch === K.chords.patch && !tune.has(e.patch) && e.patch !== (K.bed ? B.leads[K.bed].patch : ""));
      if (bar < 16 && bar % 4 !== 2) expect(stabs, `${seed} ${before} ${bar}`).toEqual([]);
      if (K.chords.patch && !K.chords.arp) { const hits = new Map<number, number>(); for (const e of stabs) hits.set(e.step, (hits.get(e.step) ?? 0) + 1); for (const n of hits.values()) expect(n).toBeLessThanOrEqual(2); }
    }
    expect(rests).toBeGreaterThan(15); expect(bars).toBeGreaterThan(400);
    // (the landing keeps its pad: the drop stays full)
    const style = night(23), K = kitOf(B, kitName(style, arcStep(style, 5), ""));
    if (K.pad) expect(barNotes(style, 23, 5, 0).some(e => e.patch === K.pad!.patch)).toBe(true);
  });
  it("keeps the xylophone's chord figures (block chords, arpeggios, the skeleton dance, tremolos, echoing right then left) for where the lead rests, in the phrases dealt to it: a breakbeat phrase's first half, the bar a riff rests; never in the families that keep their sound", () => {
    expect(Object.keys(X.figures).sort()).toEqual(["arp", "bones", "off", "push", "roll", "skeleton", "wide"]);
    for (const n of ["organic", "ritual", "dub", "trap", "phonk", "hard"]) expect(kitOf(B, n).xylo, n).toBe(0);
    for (const n of ["house", "soft", "garage", "breaks", "chip", "techno"]) expect(kitOf(B, n).xylo, n).toBeGreaterThan(0.2);
    const seen = new Set<string>();
    let withIt = 0, echoes = 0, without = 0;
    for (const [style, seed, before, bar, es] of grooves()) {
      const a = arcStep(style, before), K = kitOf(B, kitName(style, a, "")), fig = xyloFigure(B, K.xylo, tuneSeed(seed, a.tune ?? 0), bar, 0);
      const rests = bar >= 16 ? bar < 20 : !ostKit(K) && bar % 4 === 2, xs = es.filter(e => xyPatches.has(e.patch));
      if (!fig || !rests || K.bed) { without++; expect(xs.filter(e => /[LR]$/.test(e.patch) && e.step % 16 >= 6), `${seed} ${before} ${bar}`).toEqual([]); continue; } // (elsewhere the bed or the ostinato: no echoes but the bar before's last)
      withIt++; seen.add(fig);
      expect(K.xylo).toBeGreaterThan(0);
      expect(xs.filter(e => e.patch === B.leads[X.voice].patch && e.step % 16 < 12).length, `${fig} ${seed} ${before} ${bar}`).toBeGreaterThan(0);
      echoes += xs.filter(e => /[LR]$/.test(e.patch)).length;
      for (const e of xs) { expect(e.midi!).toBeLessThanOrEqual(B.register!.lead); expect(e.midi!).toBeGreaterThanOrEqual(43); }
      // (the kit's own chords rest while it plays)
      if (K.chords.patch) expect(es.filter(e => e.patch === K.chords.patch)).toEqual([]);
    }
    expect(withIt).toBeGreaterThan(15); expect(without).toBeGreaterThan(withIt);
    expect(seen.size).toBeGreaterThanOrEqual(4); expect(echoes).toBeGreaterThan(40);
    // (the gentle waves: the darker, lower bar)
    const low = B.leads[X.low].patch;
    expect(base.patches[low].cutoff!).toBeLessThan(2500); expect(X.lowWindow).toBeLessThan(X.window);
    for (const p of [B.leads[X.voice].patch, low]) for (const side of ["L", "R"]) expect(Math.abs(base.patches[p + side].pan!)).toBeGreaterThan(0.6);
  });
  it("gives the singer the harmony: three voices under the grooves (root, fifth and a third or seventh), in her notes and under the xylophone's octave, two softly before the second stump, and stabs with the xylophone's block chords now and then", () => {
    const H = V.harmony!;
    let stabs = 0, stacked = 0;
    for (const [style, seed, before, bar, es] of grooves()) {
      const pad = es.filter(e => isPad(e));
      expect(pad.length).toBe(H.voices);
      expect(new Set(pad.map(e => e.midi)).size).toBe(H.voices);
      for (const e of pad) { expect(e.midi!).toBeGreaterThanOrEqual(55); expect(e.midi!).toBeLessThanOrEqual(79); expect(e.midi!).toBeGreaterThanOrEqual(H.window); expect(e.midi!).toBeLessThan(H.window + 12); expect(e.dur).toBe(16); } // (a woman's register: C4 to B4)
      const a = arcStep(style, before), K = kitOf(B, kitName(style, a, "")), fig = xyloFigure(B, K.xylo, tuneSeed(seed, a.tune ?? 0), bar, 0);
      if (fig) { stacked++; const blocks = es.filter(e => e.patch === B.leads[X.voice].patch && e.step % 16 < 12); for (const e of blocks.filter(e => blocks.filter(f => f.step === e.step).length > 2)) expect(e.midi!).toBeGreaterThanOrEqual(X.window); }
      stabs += es.filter(e => e.patch === V.double && e.dur === 2 && es.filter(f => f.patch === V.double && f.step === e.step).length === 2).length;
    }
    expect(stacked).toBeGreaterThan(20); expect(stabs).toBeGreaterThan(0);
    for (const seed of [7, 23]) for (const bar of [0, 9, 33]) { const pad = barNotes(night(seed), seed, 0, bar).filter(e => isPad(e)); expect(pad.length).toBe(H.gentleVoices); for (const e of pad) expect(e.vel).toBeLessThan(0.4); }
  });
  it("keeps the backbeat on claps and snaps; a snare only in breaks, jungle and hard techno, the drum & bass, and the fills, turns and rolls", () => {
    const SNARE = ["breaks", "jungle", "hard"];
    for (const n of Object.keys(B.kits)) {
      const K = kitOf(B, n), hits = K.drums.filter(v => v.patch === "snare" && /[Xx]/.test(v.p));
      if (SNARE.includes(n)) expect(hits.length, n).toBeGreaterThan(0); else expect(hits, n).toEqual([]);
      expect(K.drums.some(v => /[Xx]/.test(v.p) && ["bgClap", "bgSnap", "snap"].includes(v.patch)) || SNARE.includes(n), n).toBe(true);
    }
    expect(B.dnb.drums.some(v => v.patch === "dnbSnare")).toBe(true);
    expect(compOf(base)!.drums!.room!.time).toBeLessThan(0.6); // (a short room on the drum bus's top: the clap's and the snap's)
  });
  it("turns the rhythm section up against the rest, and gives the room a pre-delay", () => {
    expect(S.balance.drums).toBeGreaterThan(1.2); expect(S.balance.bass).toBeGreaterThan(1.1);
    expect(S.balance.pad).toBeLessThan(0.8); expect(S.balance.chords).toBeLessThan(0.85);
    expect(mixOf(base).reverbPre!).toBeGreaterThan(0.02); expect(mixOf(base).reverbTime).toBeGreaterThan(base.mix.reverbTime);
    expect(mixOf(withBanger(base, false)).reverbTime).toBe(base.mix.reverbTime);
    expect(compOf(base)!.drums!.mix).toBeGreaterThan(0.5);
    // (the wider tops)
    for (const p of ["bgHat", "bgHatB", "bgTom", "bgTomLo", "bgRim", "bgRide", "bgShaker"]) expect(Math.abs(base.patches[p].pan!), p).toBeGreaterThanOrEqual(0.45);
  });
});

describe("heard, and low (Ed, 2026-11-11, of the space clip: \"I don't hear any xylophones or clicks at all. Drums are good. The Bassline is best when it's lower.\")", () => {
  const S = B.space!, SP = B.spice!, X = S.xylo;
  it("plays the xylophone's hits well over the lead's and the snaps' over the clap's (measured: at a third of this they were lost in the mix)", () => {
    // (a hit's strength: its patch's gain by its note's level; tools/music-lab/heard.mjs measures the sound itself, in CI's smoke job)
    const strength = (e: NoteEvent) => base.patches[e.patch].gain * e.vel;
    let phrases = 0;
    for (const seed of [7, 23, 101]) {
      const style = night(seed);
      for (const before of [2, 3, 4, 5, 6, 7, 8]) for (const bar of [8, 16, 20]) {
        const a = arcStep(style, before), K = kitOf(B, kitName(style, a, "")), fig = xyloFigure(B, K.xylo, tuneSeed(seed, a.tune ?? 0), bar, 0);
        if (!fig || fig === X.roll) continue;
        const es = [0, 1].flatMap(k => barNotes(style, seed, before, bar + k, { nextAt: Infinity })), E = Math.max(B.energyFloor, a.energy), leads = new Set((E < B.softBelow ? K.leads.soft : K.leads.hard).map(l => B.leads[l].patch));
        const xs = es.filter(e => e.patch === B.leads[X.voice].patch), ls = es.filter(e => pitched(e) && leads.has(e.patch) && e.patch !== B.leads[X.voice].patch);
        if (!xs.length || !ls.length) continue;
        phrases++;
        expect(Math.max(...xs.map(strength)), `${seed} ${before} ${bar}`).toBeGreaterThan(2.5 * Math.max(...ls.map(strength)));
      }
    }
    expect(phrases).toBeGreaterThan(5);
    expect(base.patches[SP.snap].gain * SP.snapLevel * S.balance.drums).toBeGreaterThan(2.5 * base.patches.bgClap.gain * S.balance.drums);
    // (and with presence: the snap's band and the xylophone's in the upper mids)
    expect(base.patches[SP.snap].cutoff!).toBeGreaterThanOrEqual(3000); expect(base.patches[SP.snap].cutoff!).toBeLessThanOrEqual(5000);
    expect(base.patches[B.leads[X.voice].patch].cutoff!).toBeGreaterThanOrEqual(2500);
  });
  it("keeps the main basslines low: E1 to E2 but brief moves up, in every family but acid and chiptune (their lines are their genre)", () => {
    for (const n of Object.keys(B.kits)) expect(kitOf(B, n).bass.octave, n).toBe(n === "acid" || n === "chip" ? 1 : 0);
    for (const n of Object.keys(B.kits)) for (const p of kitOf(B, n).bass.patch) expect(p.startsWith("bgBass"), p).toBe(false); // (the brighter stand-ins gone)
    let low = 0, all = 0, top = 0;
    for (const seed of [1, 7, 23, 101, 4242, 90001]) {
      const style = night(seed);
      for (const before of [0, 2, 3, 4, 5, 6, 7, 8, 9]) {
        const K = kitOf(B, kitName(style, arcStep(style, before), ""));
        if (K.bass.octave !== 0) continue;
        for (const bar of [0, 1, 5, 9, 12, 17, 21]) for (const e of barNotes(style, seed, before, bar, { nextAt: Infinity }).filter(e => K.bass.patch.includes(e.patch) || e.patch === "bgSub")) { all++; if (e.midi! <= 40) low++; top = Math.max(top, e.midi!); expect(e.midi!).toBeGreaterThanOrEqual(28); }
      }
    }
    expect(all).toBeGreaterThan(500);
    expect(low / all).toBeGreaterThan(0.8); // (mostly E1 to E2)
    expect(top).toBeLessThanOrEqual(47);
  });
});

describe("snaps and claps at different times (Ed, 2026-11-11: \"Don't need claps and snaps at the same time - try them at different times, snaps during lighter periods\")", () => {
  const SNAPS = new Set([B.spice!.snap, "snap"]), HEAVY = new Set(["bgClap", "clap", "snare", "dnbSnare"]);
  const backbeat = (es: NoteEvent[]) => { const b = es.filter(e => e.step % 16 < 8 && e.vel > 0.3 * B.space!.balance.drums * 0.72); return { snap: b.some(e => SNAPS.has(e.patch)), heavy: b.some(e => HEAVY.has(e.patch)) }; };
  it("never sounds a finger snap on the same sixteenth as a clap or a snare, in any family, wave, section or pass", () => {
    let snaps = 0;
    for (const seed of [1, 7, 23, 101, 4242, 90001]) {
      const style = night(seed);
      for (const before of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) for (const extra of [{ nextAt: Infinity }, {}, { victory: 4 }]) for (let bar = 0; bar < 40; bar++) {
        const es = barNotes(style, seed, before, bar, extra), heavy = new Set(es.filter(e => HEAVY.has(e.patch)).map(e => e.step));
        for (const e of es.filter(e => SNAPS.has(e.patch))) { snaps++; expect(heavy.has(e.step), `seed ${seed} wave ${before} bar ${bar} step ${e.step % 16} (${JSON.stringify(extra)}: ${e.patch} with ${es.filter(f => HEAVY.has(f.patch) && f.step === e.step).map(f => f.patch).join()})`).toBe(false); }
      }
    }
    expect(snaps).toBeGreaterThan(1000);
    // (no kit layers one on the other)
    for (const n of Object.keys(B.kits)) { const K = kitOf(B, n); for (const v of K.drums.filter(v => SNAPS.has(v.patch))) for (const w of K.drums.filter(w => HEAVY.has(w.patch))) for (let i = 0; i < 32; i++) expect(/[Xx]/.test(v.p[i % v.p.length]) && /[Xx]/.test(w.p[i % w.p.length]), n).toBe(false); }
  });
  it("gives the lighter periods the snaps and the heavier ones the clap or snare, a phrase one or the other whole", () => {
    for (const seed of [7, 23, 101]) {
      const style = night(seed), cue = { nextAt: Infinity };
      // (gentle, before the second stump: snaps, never a clap)
      for (const bar of [1, 9, 17, 33, 41]) { const b = backbeat(barNotes(style, seed, 0, bar)); expect(b.heavy, `gentle ${seed} ${bar}`).toBe(false); expect(b.snap).toBe(true); }
      for (const before of [3, 5, 8]) {
        const K = kitOf(B, kitName(style, arcStep(style, before), ""));
        if (!K.drums.some(v => HEAVY.has(v.patch) && /[Xx]/.test(v.p))) continue; // (a kit whose own backbeat is the finger snap)
        // (the landing's hook: the clap or snare; the breakbeat phrase: the snare; the breakdown's quiet half: soft snaps on two and four)
        for (const bar of [0, 1, 2, 5]) { const b = backbeat(barNotes(style, seed, before, bar, cue)); expect(b.snap, `landing ${seed} ${before} ${bar}`).toBe(false); if (/[Xx]/.test(K.drums.find(v => HEAVY.has(v.patch))!.p.slice(0, 8))) expect(b.heavy).toBe(true); }
        if (!K.breaks.some(v => SNAPS.has(v.patch))) for (const bar of [17, 18]) expect(backbeat(barNotes(style, seed, before, bar, cue)).snap).toBe(false); // (but a kit whose own breakbeat is snapped)
        for (const bar of [24, 25, 26, 27]) { const es = barNotes(style, seed, before, bar, cue); expect(es.filter(e => SNAPS.has(e.patch)).map(e => e.step % 16)).toEqual([4, 12]); expect(es.some(e => HEAVY.has(e.patch))).toBe(false); }
        for (const bar of [28, 29]) expect(barNotes(style, seed, before, bar, cue).some(e => SNAPS.has(e.patch))).toBe(false); // (the drum & bass: its snare)
        // (the groove where the hook rests, bars 9 to 15: one or the other for the whole phrase)
        const kinds = [9, 10, 11, 12, 13, 14].map(bar => backbeat(barNotes(style, seed, before, bar, cue)));
        expect(new Set(kinds.filter(k => k.snap || k.heavy).map(k => (k.snap ? "snap" : "heavy"))).size).toBeLessThanOrEqual(1);
        for (const k of kinds) expect(k.snap && k.heavy).toBe(false);
      }
      // (the victory: claps)
      expect(backbeat(barNotes(style, seed, 6, 12, { victory: 8, nextAt: Infinity })).snap).toBe(false);
    }
    // (both kinds of groove phrase are dealt)
    let light = 0, heavy = 0;
    for (const seed of SEEDS) for (const before of [2, 3, 4, 5, 6, 7, 8, 9]) { const b = backbeat(barNotes(night(seed), seed, before, 9, { nextAt: Infinity })); if (b.snap) light++; else if (b.heavy) heavy++; }
    expect(light).toBeGreaterThan(5); expect(heavy).toBeGreaterThan(5);
  });
});

describe("lower, darker, tighter (Ed, 2026-11-11, of the v3 clip: a more female vocal, a lower kick, the xylophones and the harmony down, \"More 'minor feel'\", \"Too much shaker\", \"The melody lines somehow don't feel 'tight'\")", () => {
  it("sings where a woman sings: her harmony C4 to B4, her doubling and stabs D4 to G5, her own line C4 to F5, all inside her recorded notes, brighter", () => {
    const V = B.vocals!;
    expect(V.harmony!.window).toBeGreaterThanOrEqual(60); expect(V.range[0]).toBeGreaterThanOrEqual(60); expect(V.range[1]).toBeLessThanOrEqual(79);
    expect(V.line![0]).toBeGreaterThanOrEqual(60); expect(V.line![1]).toBeLessThanOrEqual(79);
    for (const p of [V.double, V.pad]) { expect(base.patches[p].presence!).toBeGreaterThanOrEqual(3); expect(base.patches[p].hp!).toBeGreaterThanOrEqual(350); }
    for (const seed of [7, 23, 101]) for (const before of [3, 5, 8]) {
      const style = night(seed), sung = [24, 25, 26, 27].flatMap(b => barNotes(style, seed, before, b, { nextAt: Infinity })).filter(e => e.part === style.form!.sung.part && !e.ghost && !e.double);
      expect(sung.length).toBeGreaterThan(0);
      for (const e of sung) { expect(e.midi!).toBeGreaterThanOrEqual(V.line![0]); expect(e.midi!).toBeLessThanOrEqual(V.line![1]); }
    }
  });
  it("puts her doubling on the grid: a fast attack, the recording's soft onset skipped", () => {
    const p = base.patches[B.vocals!.double];
    expect(p.attack!).toBeLessThanOrEqual(0.01); expect(p.skip!).toBeGreaterThanOrEqual(0.04);
    expect(base.patches.bgSquare.glide).toBeUndefined(); expect(base.patches.bgSquare.attack!).toBeLessThanOrEqual(0.005);
    // (every lead banger mode plays speaks within 12 ms: the slow ones have quicker copies)
    for (const L of Object.values(B.leads)) { const P = base.patches[L.patch], Q = P.from ? { ...base.patches[P.from], ...P } : P; if (Q.kind === "synth") expect(Q.attack ?? 0, L.patch).toBeLessThanOrEqual(0.012); }
    // (the drums and every tune swung alike: a kit's own swing on the off sixteenths of both)
    for (const seed of [7, 23]) { const style = night(seed), K = kitOf(B, kitName(style, arcStep(style, 5), "")); for (const e of barNotes(style, seed, 5, 1).filter(e => e.part.startsWith("b:") && e.dur < 16 && e.offset < 0.5 && !isPad(e))) expect(e.offset).toBeCloseTo(e.step % 2 ? K.swing : 0); }
  });
  it("voices the harmony low and the xylophone an octave down, clear of the bass and under the lead's ceiling", () => {
    expect(B.space!.chordWindow).toBe(48); expect(B.space!.xylo.window).toBe(55); expect(B.space!.xylo.lowWindow).toBeLessThanOrEqual(55);
    for (const seed of [7, 23, 101]) for (const before of [2, 3, 5, 8]) {
      const style = night(seed), K = kitOf(B, kitName(style, arcStep(style, before), "")), xy = new Set([B.leads[B.space!.xylo.voice].patch, B.leads[B.space!.xylo.low].patch].flatMap(p => [p, p + "L", p + "R"]));
      for (const bar of [0, 9, 13, 17, 21]) for (const e of barNotes(style, seed, before, bar, { nextAt: Infinity })) {
        if ((e.patch === K.chords.patch && e.patch !== "marimba") || (K.pad && e.patch === K.pad.patch && e.dur === 16)) { expect(e.midi!, `${e.patch} ${seed} ${before} ${bar}`).toBeGreaterThanOrEqual(42); expect(e.midi!).toBeLessThanOrEqual(72); }
        if (xy.has(e.patch) && e.step % 16 < 12) { expect(e.midi!).toBeGreaterThanOrEqual(43); expect(e.midi!).toBeLessThanOrEqual(72); }
      }
    }
  });
  it("leans minor: natural minor for most waves and dorian for a few, loops with the minor fourth and the flat sixth, a major chord on the fifth only at a loop's end", () => {
    const M = B.minor!;
    expect(M.scale).toBe("aeolian"); expect(M.dorian).toBeLessThan(0.35);
    let minor = 0, dorian = 0, own = 0;
    for (const seed of SEEDS) { const style = night(seed); for (let w = 0; w < 10; w++) { const a = arcStep(style, w), n = bangerScaleName(style, a, seed); if (a.scale) { own++; expect(n).toBe(a.scale); } else if (n === "aeolian") minor++; else { dorian++; expect(n).toBe("dorian"); } } }
    expect(minor).toBeGreaterThan(2 * dorian); expect(dorian).toBeGreaterThan(0);
    expect(bangerScaleName(withBanger(base, false), arcStep(base, 2), 7)).toBe(base.scale); // (off: the style's own)
    const P = B.progressions.aeolian;
    for (const loop of [...P.a, ...P.b]) { expect(loop.length).toBe(4); expect(loop.some(r => r === 3 || r === 5)).toBe(true); }
    expect(P.a.filter(l => l[3] === 4).length).toBeGreaterThanOrEqual(4);
    // (the cadence: the fifth step's chord major at a loop's end in natural minor, never elsewhere, never in dorian)
    let raised = 0;
    for (const seed of SEEDS) for (let fb = 0; fb < 16; fb++) {
      const c = bangerChord(base, {}, seed, fb, false, false, "aeolian");
      if (c.raise) { raised++; expect(c.root).toBe(4); expect(fb % 4).toBe(3); }
      expect(bangerChord(base, {}, seed, fb, false, false, "dorian").raise).toBeUndefined();
    }
    expect(raised).toBeGreaterThan(4);
  });
  it("cuts the shaker hard: one kit family's, sparse, quiet and late in a section", () => {
    const withIt = Object.keys(B.kits).filter(n => kitOf(B, n).drums.some(v => /shaker/i.test(v.patch)));
    expect(withIt.sort()).toEqual(["acid", "house", "organic"]);
    for (const n of withIt) for (const v of kitOf(B, n).drums.filter(v => /shaker/i.test(v.patch))) { expect(v.level!).toBeLessThanOrEqual(0.25); expect([...v.p].filter(c => c !== ".").length).toBeLessThanOrEqual(4); expect(v.from).toBe(8); expect(v.e![0]).toBeGreaterThanOrEqual(0.6); }
    expect(B.victory.some(v => /shaker/i.test(v.patch))).toBe(false);
  });
});

describe("the leads' new style, the house ostinato, dreamy against aggressive (Ed, 2026-11-11: \"our lead melodies are weak currently; can we fashion them all in this style?\"; \"a great ostinato riff that we should learn from for house sections\"; \"Dreamy then aggressive\"; \"The drums drive everything\")", () => {
  const S = B.space!, BED = S.bed!, DR = B.drive!, DM = B.dream!, V = B.vocals!;
  const kitAt = (style: MusicStyle, before: number) => kitOf(B, kitName(style, arcStep(style, before), ""));
  /** Waves (after the second stump) whose kit passes `ok`: [style, seed, wave]. */
  const waves = (ok: (K: ReturnType<typeof kitOf>) => boolean) => [1, 7, 23, 101, 4242, 90001].flatMap(seed => { const style = night(seed); return [3, 4, 5, 6, 7, 8, 9].filter(w => ok(kitAt(style, w))).map(w => [style, seed, w] as const); });
  const bedPatch = (K: ReturnType<typeof kitOf>) => B.leads[K.bed ?? BED.voice].patch;
  it("rolls a bed under the long-then-run tunes: a broken chord in even sixteenths (eighths in a half-time kit or a gentle wave), the same figure all phrase, on the swung grid, low; the xylophone's, or the kit's own pluck", () => {
    let own = 0, n = 0;
    for (const [style, seed, w] of waves(() => true)) {
      const K = kitAt(style, w), bp = bedPatch(K), bars = [0, 1, 2, 3, 4, 5, 6].map(b => barNotes(style, seed, w, b).filter(e => e.patch === bp && e.dur === 1 && !e.hook));
      if (K.bed) own++;
      n++;
      for (const es of bars) {
        const steps = [...new Set(es.map(e => e.step % 16))].sort((x, y) => x - y);
        expect(steps, `${seed} ${w}`).toEqual(K.half ? [0, 2, 4, 6, 8, 10, 12, 14] : [...Array(16).keys()]);
        for (const e of es) expect(e.offset).toBeCloseTo(e.step % 2 ? K.swing : 0);
      }
      // (the same figure bar after bar: which of the chord's tones on each sixteenth)
      const fig = (es: NoteEvent[]) => { const ts = [...new Set(es.map(e => e.midi!))].sort((x, y) => x - y); return [...Array(16).keys()].map(st => { const e = es.find(x => x.step % 16 === st && bedRange(x)); return e ? ts.indexOf(e.midi!) : -1; }).join(); };
      const bedRange = (e: NoteEvent) => e.midi! >= BED.window && e.midi! < BED.window + 25;
      if (!K.leads.hard.concat(K.leads.soft).some(l => B.leads[l].patch === bp)) { expect(new Set(bars.slice(0, 4).map(fig)).size, `${seed} ${w} ${bars.slice(0, 4).map(fig).join(" / ")}`).toBeLessThanOrEqual(2); for (const es of bars) for (const e of es) expect(bedRange(e)).toBe(true); }
    }
    expect(n).toBeGreaterThan(20); expect(own).toBeGreaterThan(0);
    for (const f of BED.figures) expect(/^[abcd]{16}$/.test(f)).toBe(true); // (no rests: it rolls)
    // (a gentle wave's: eighths, on the low bar)
    const g = barNotes(night(7), 7, 1, 1).filter(e => e.patch === B.leads[BED.low].patch && e.dur === 1);
    if (!kitOf(B, B.gentle.kit).bed) { expect(g.length).toBe(8); expect(g.every(e => e.step % 2 === 0)).toBe(true); }
  });
  it("gives the house grooves a two-bar ostinato: two accented hits, a chain of threes across the bar line, short and held notes, on the grid; its first bar the same every time, its second bar's contour changing; chants and tresillos among the hooks", () => {
    let varied = 0, crossing = 0, chains = 0;
    const MANY = Array.from({ length: 80 }, (_, i) => 11 + i * 7919);
    for (const seed of MANY) {
      const o0 = ostinato(B, seed, 0), o1 = ostinato(B, seed, 1), ons = o0.period.map((n, i) => (n ? i : -1)).filter(i => i >= 0);
      expect(o0.period.length).toBe(32);
      if (o0.motif.startsWith("tresillo")) continue; // (the other house riff: its own test below)
      chains++;
      expect(o0.period[0]!.acc).toBe(true); expect(o0.period[ons[1]]!.acc).toBe(true); expect(ons[1]).toBeLessThanOrEqual(4);
      expect(o1.period.slice(0, 16)).toEqual(o0.period.slice(0, 16));
      expect(o1.period.map(n => !!n)).toEqual(o0.period.map(n => !!n)); // (the rhythm the same: only where it goes)
      if (JSON.stringify(o1.period.slice(16)) !== JSON.stringify(o0.period.slice(16))) varied++;
      expect(ostinato(B, seed, 2).period).toEqual(o0.period);
      const gaps = ons.slice(1).map((x, i) => x - ons[i]);
      expect(gaps.filter(g => g === 3 || g === 6).length).toBeGreaterThanOrEqual(4);
      if (ons.some(i => i > 12 && i < 16 && i + 3 > 16) || !o0.period[16]) crossing++;
      expect(new Set(o0.period.filter(n => n).map(n => `${n!.dur}:${n!.vel}`)).size).toBeGreaterThanOrEqual(2); // (accented, short, held)
      expect(o0.period.filter(n => n).length).toBeLessThanOrEqual(14);
      for (const n of o0.period) if (n) { expect(Number.isInteger(n.dur)).toBe(true); expect(n.off).toBeUndefined(); }
      // (its answer: two long falling notes over its second bar; later, repeated accented hits)
      const ans = o0.reply.filter(n => n), hits = ostinato(B, seed, 0, true).reply.filter(n => n);
      expect(ans.length).toBe(2); expect(ans[1]!.deg).toBe(ans[0]!.deg - 1); expect(ans.every(n => n!.dur >= 4)).toBe(true);
      expect(hits.length).toBe(4); expect(hits.every(n => n!.dur === 1 && n!.acc)).toBe(true);
    }
    expect(chains).toBeGreaterThan(30);
    expect(varied / chains).toBeGreaterThan(0.8); expect(crossing / chains).toBeGreaterThan(0.6);
    // (the hooks' bank has the chant too: three long notes on three, three and two, the same note struck again)
    const chant = B.hook.motifs.filter(m => !/[rgt]/.test(m));
    expect(chant.length).toBeGreaterThan(0);
    for (const m of chant) expect([...m].map((c, i) => (c === "L" ? i : -1)).filter(i => i >= 0)).toEqual([0, 6, 12]);
    expect(B.hook.chants!.some(sh => sh[0] === sh[1])).toBe(true);
  });
  it("has the tresillo as a template of its own (Ed, 2026-11-11, \"Another great melody\": the traits only): hooks and riffs that chant three long notes on three, three and two, the same note struck again, their ending a step away; a share of the house riffs a narrow chant on it, tied over the bar line, the singer on every note", () => {
    const MANY = Array.from({ length: 200 }, (_, i) => 3 + i * 7919), m7 = (d: number) => ((d % 7) + 7) % 7;
    // the tunes: a chant's bar is three long notes at 0, 6 and 12 with a rest, two of them the same note at least; its varied ending a step from its own last note
    for (const p of B.hook.tresillos!) { expect([...p].map((c, i) => (c === "L" ? i : -1)).filter(i => i >= 0)).toEqual([0, 6, 12]); expect(p).toContain("."); }
    let chants = 0, same3 = 0;
    for (const seed of MANY) {
      const h = nightHook(B, seed);
      if (/[rgt]/.test(h.motif)) continue;
      chants++;
      const bar = (b: number) => h.period.slice(b * 16, b * 16 + 16).filter(n => n).map(n => n!.deg);
      expect(bar(0).length).toBe(3); expect(h.period.slice(0, 16).every(n => !n || n.long)).toBe(true);
      expect(new Set(bar(0)).size).toBeLessThanOrEqual(2); expect(bar(0)[0]).toBe(bar(0)[1]);
      if (new Set(bar(0)).size === 1) same3++;
      expect(bar(1).slice(0, 2)).toEqual(bar(0).slice(0, 2)); expect(Math.abs(bar(1)[2] - bar(0)[2])).toBe(1);
      for (const d of bar(0)) expect([0, 2, 4]).toContain(m7(d));
    }
    expect(chants / MANY.length).toBeGreaterThan(0.1); expect(chants / MANY.length).toBeLessThan(0.4); expect(same3).toBeGreaterThan(3);
    // the house riff: of a share of the waves; three, three and two (a note tied over the bar line in most of the bank), a range of a third, steps alone, every note an accent
    const T = B.ostinato!.tresillo!;
    expect(T.groups.some(g => { let pos = 0; return g.some(x => { const over = pos < 16 && pos + x > 16; pos += x; return over; }); })).toBe(true);
    let tres = 0;
    for (const seed of MANY) {
      const o0 = ostinato(B, seed, 0), o1 = ostinato(B, seed, 1);
      if (!o0.motif.startsWith("tresillo")) continue;
      tres++;
      const ons = o0.period.map((n, i) => (n ? i : -1)).filter(i => i >= 0), ns = o0.period.filter(n => n).map(n => n!);
      expect(ons.slice(0, 2)).toEqual([0, 6]); expect(ons.every(i => [0, 6, 12].includes(i % 16))).toBe(true);
      expect(ns.length).toBeGreaterThanOrEqual(5); expect(ns.length).toBeLessThanOrEqual(6);
      expect(ns[0].deg).toBe(ns[1].deg); // (the same note struck again)
      const degs = ns.map(n => n.deg);
      expect(Math.max(...degs) - Math.min(...degs)).toBeLessThanOrEqual(2);
      for (let i = 1; i < degs.length; i++) expect(Math.abs(degs[i] - degs[i - 1])).toBeLessThanOrEqual(2);
      expect(degs.some((d, i) => i > 0 && Math.abs(d - degs[i - 1]) === 1)).toBe(true); // (a step's answer)
      for (const n of ns) { expect(n.acc).toBe(true); expect(n.dur).toBeGreaterThanOrEqual(3); expect(n.dur).toBeLessThanOrEqual(4); expect(n.off).toBeUndefined(); }
      expect([0, 2, 4]).toContain(m7(ns[0].deg));
      expect(o1.period.slice(0, 16)).toEqual(o0.period.slice(0, 16)); expect(o1.period.map(n => !!n)).toEqual(o0.period.map(n => !!n)); expect(ostinato(B, seed, 2).period).toEqual(o0.period);
      expect(o0.reply.filter(n => n).length).toBe(2);
    }
    expect(tres / MANY.length).toBeGreaterThan(0.25); expect(tres / MANY.length).toBeLessThan(0.55);
  });
  it("stacks the ostinato in unison (the lead, the xylophone an octave under, the singer on its accents: one sixteenth, one place in it), over off-beat stabs and a bass bouncing low on the beat; each repeat adds a layer", () => {
    const four = waves(K => !!K.four && !K.half);
    expect(four.length).toBeGreaterThan(8);
    let sung = 0;
    for (const [style, seed, w] of four) {
      const K = kitAt(style, w), a = arcStep(style, w), E = Math.max(B.energyFloor, a.energy), leads = new Set((E < B.softBelow ? K.leads.soft : K.leads.hard).map(l => B.leads[l].patch)), xy = B.leads[B.spice!.xylo].patch;
      if (K.reply.some(l => leads.has(B.leads[l].patch)) || leads.has(xy)) continue; // (told apart by their patches here)
      const bar = (b: number) => barNotes(style, seed, w, b, { nextAt: Infinity, waves: Array(w).fill(0), stumps: Array(w).fill(0) }); // (no wave after it: the form goes round again)
      const plan = new Conductor(style).plan({ ...cueOf(w, 9), nextAt: Infinity }, 9);
      expect(ostinatoHeard(style, plan, resolveSection(style, plan.section), 9, 0, 9)).toBe(1);
      for (const b of [8, 9]) {
        const es = bar(b), ld = es.filter(e => leads.has(e.patch) && pitched(e)), xs = es.filter(e => e.patch === xy);
        expect(ld.length).toBeGreaterThanOrEqual(2); // (a tresillo's bar with its note tied over has two)
        expect(xs.length).toBe(ld.length);
        for (const e of ld) { const x = xs.find(q => q.step === e.step)!; expect(x, `${seed} ${w} ${b}`).toBeTruthy(); expect(x.offset).toBe(e.offset); expect([0, 12]).toContain(e.midi! - x.midi!); expect(e.offset).toBeCloseTo(e.step % 2 ? K.swing : 0); }
        for (const e of es.filter(e => e.patch === V.double)) { sung++; expect(ld.some(l => l.step === e.step && l.offset === e.offset)).toBe(true); }
        // (oom-chk: the kit's chords on the off-beats alone, two notes a hit; the bass on every beat, E1 to E2)
        if (K.chords.patch && !leads.has(K.chords.patch)) expect([...new Set(es.filter(e => e.patch === K.chords.patch && e.step % 16 < 12).map(e => e.step % 16))]).toEqual([2, 6, 10]);
        if (K.bass.bounce) { const bs = es.filter(e => K.bass.patch.includes(e.patch)); for (const st of [0, 4, 8]) expect(bs.some(e => e.step % 16 === st)).toBe(true); for (const e of bs) { expect(e.midi!).toBeGreaterThanOrEqual(28); expect(e.midi!).toBeLessThanOrEqual(40); } }
        expect(es.filter(e => e.patch === bedPatch(K) && e.dur === 1 && !ld.some(l => l.step === e.step))).toEqual([]); // (no bed under it: the xylophone is on the riff)
      }
      // (the second time round the form: a line a third under; then the answer in accented hits, the bass busier)
      const count = (b: number) => bar(b).filter(e => leads.has(e.patch) && pitched(e)).length, base8 = count(8);
      expect(base8).toBeGreaterThanOrEqual(2); expect(count(32) + count(33)).toBe(2 * (count(8) + count(9)));
      const third = bar(32).filter(e => leads.has(e.patch) && pitched(e)), st0 = third[0].step, pair = third.filter(e => e.step === st0).map(e => e.midi!).sort((x, y) => x - y);
      expect(pair.length).toBe(2); expect([2, 3, 4, 5]).toContain(pair[1] - pair[0]);
      if (K.bass.bounce) expect(bar(40).filter(e => K.bass.patch.includes(e.patch)).length).toBeGreaterThan(bar(8).filter(e => K.bass.patch.includes(e.patch)).length);
    }
    expect(sung).toBeGreaterThan(10);
    // (the fills' bank has the tom sweeps: one, and the longer one with a rim shot closing it)
    expect(B.fills.sweep.length).toBe(4); expect(B.fills.sweep2.some(v => v.patch === "bgRim" && v.p[15] === "X")).toBe(true);
    expect(B.fills.sweep2.length).toBeGreaterThan(B.fills.sweep.length);
  });
  it("sets dreamy against aggressive inside the form as it was: a breakdown's quiet half and a build's first half her stacked long notes over the soft bed, no kick; the breakbeat phrase and the drum & bass ghost snares, running hats and the distorted mid bass over the sub; a touch of it under a landing, none in a groove or before the second stump", () => {
    const cue = { nextAt: Infinity }, grit = DR.bass.patch;
    for (const seed of [7, 23, 101]) {
      const style = night(seed), K = kitAt(style, 5), bar = (b: number, w = 5) => barNotes(style, seed, w, b, cue);
      const quiet = [24, 25, 26, 27].flatMap(b => bar(b)), dnb = [28, 29, 30].flatMap(b => bar(b)), brk = [16, 17, 18, 19, 20, 21, 22].flatMap(b => bar(b)), land = [0, 1, 2, 3].flatMap(b => bar(b)), groove = [8, 9, 10, 11].flatMap(b => bar(b));
      // (dreamy: the stack on her sixteenth, the same note left and right and its octave; the bed; no kick, snare or clap)
      const st = quiet.filter(e => DM.stack.includes(e.patch)), oc = quiet.filter(e => e.patch === DM.octave), sung = quiet.filter(e => e.part === style.form!.sung.part && !e.ghost && !e.double);
      expect(st.length).toBeGreaterThan(0); expect(st.length).toBe(2 * oc.length);
      for (const e of st) { const m = sung.find(q => q.step === e.step); if (m) { expect(e.midi).toBe(m.midi); expect(e.offset).toBe(m.offset); } expect(e.dur).toBeGreaterThanOrEqual(6); }
      for (const e of oc) expect([12, -12]).toContain(e.midi! - st.find(q => q.step === e.step)!.midi!);
      for (const e of [...st, ...oc]) { expect(e.midi!).toBeGreaterThanOrEqual(55); expect(e.midi!).toBeLessThanOrEqual(79); }
      expect(quiet.filter(e => kickLike(style, e) || ["snare", "bgClap", "dnbSnare"].includes(e.patch))).toEqual([]);
      expect(quiet.filter(e => e.patch === bedPatch(K) && e.dur === 1).length).toBeGreaterThan(30);
      expect(Math.abs(base.patches[DM.stack[0]].pan!)).toBeGreaterThan(0.5); expect(base.patches[DM.stack[0]].pan!).toBe(-base.patches[DM.stack[1]].pan!);
      // (aggressive: the distorted bass E2 to D#3 over the sub, ghost snares on the off-beats, many more notes a bar)
      for (const es of [dnb, brk]) { const g = es.filter(e => e.patch === grit); expect(g.length).toBeGreaterThan(3); for (const e of g) { expect(e.midi!).toBeGreaterThanOrEqual(40); expect(e.midi!).toBeLessThan(52); } expect(es.some(e => e.patch === "snare" && e.vel < 0.45 && e.step % 4 === 2)).toBe(true); }
      expect(dnb.length / 3).toBeGreaterThan(2 * (quiet.length / 4));
      expect(groove.filter(e => e.patch === grit)).toEqual([]);
      const lg = land.filter(e => e.patch === grit), bg = brk.filter(e => e.patch === grit);
      expect(lg.length).toBeGreaterThan(0); expect(Math.max(...lg.map(e => e.vel))).toBeLessThan(0.6 * Math.max(...bg.map(e => e.vel)));
      // (the sub stays where it was under it)
      for (const e of [...dnb, ...brk].filter(e => e.patch === "bgSub" || B.dnb.bass.patch.includes(e.patch))) expect(e.midi!).toBeLessThanOrEqual(47);
      // (before the second stump: none of it)
      const gentle = [0, 9, 17, 20, 33].flatMap(b => barNotes(style, seed, 0, b));
      expect(gentle.filter(e => e.patch === grit || DR.groove.some(v => v.patch === e.patch) && e.patch !== "bgRim")).toEqual([]);
    }
    expect(base.patches[grit].drive!).toBeGreaterThan(0.7); expect(base.patches[grit].hp!).toBeGreaterThanOrEqual(100);
    // (the build's first half: the bass galloping, then no kick; the stack and the bed)
    const style = night(7), b0 = barNotes(style, 7, 4, 24, {}, {}), b2 = barNotes(style, 7, 4, 26, {}, {}), K = kitAt(style, 4);
    if (!K.half) for (const e of b0.filter(e => K.bass.patch.includes(e.patch))) expect([2, 3]).toContain(e.step % 4);
    expect(b2.filter(e => kickLike(style, e))).toEqual([]);
    expect([24, 25, 26, 27].flatMap(b => barNotes(style, 7, 4, b, {}, {})).some(e => DM.stack.includes(e.patch))).toBe(true);
  });
});

