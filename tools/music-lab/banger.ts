// Banger mode's A/B (Ed, 2026-11-10: "catchy spooky cute dancey witchy ravey bangers"; tools/music-lab/banger.mjs): the game's
// engine renders, offline and with the game's singer, a window of a night (its waves landing where the passage wants them, a
// knockdown, a victory, a legend's clearing) with banger mode on and off, the same seed, so they can be heard side by side.
// Lab-only: nothing here changes the game.
import { Music } from "../../src/platform/audio/music";
import { MusicEngine, type MusicSink } from "../../src/platform/audio/musicEngine";
import { TUNING } from "../../src/rules/tuning";
import { mixAt, nearness } from "../../src/rules/music";
import { newBeatClock, timeAt } from "../../src/rules/beat";
import { Conductor, formClock, stumpsBy, type MusicCue } from "../../src/rules/musicPlan";
import { nightStyle, planNight } from "../../src/rules/musicSet";
import { arcStep, hauntedDrop, isHaunted, musicSeed, notesAt, resolveSection, withMelody, type MusicStyle } from "../../src/rules/musicScore";
import { bangerOn, bangerRole, compOf, drumPatch, hookHeard, kitName, kitOf, nightHook, ostinatoHeard, riffHeard, withBanger, withoutComp, xyloHeard } from "../../src/rules/musicBanger";
import styleJson from "../../config/music-style.json";

const base = styleJson as unknown as MusicStyle;
const RATE = 44100, FRAME = 1 / 30;
const b64 = (s: string) => { const bin = atob(s), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u.buffer; };
async function decode(oc: BaseAudioContext, samples: Record<string, string>): Promise<Record<string, AudioBuffer>> {
  const out: Record<string, AudioBuffer> = {};
  for (const [id, data] of Object.entries(samples)) out[id] = await oc.decodeAudioData(b64(data));
  return out;
}
function result(buf: AudioBuffer, extra: object = {}) {
  const L = buf.getChannelData(0), R = buf.getChannelData(1), pcm = new Int16Array(L.length * 2);
  let peak = 0, nan = 0;
  for (let i = 0; i < L.length; i++) for (const [c, x] of [[0, L[i]], [1, R[i]]] as const) {
    if (!Number.isFinite(x)) { nan++; continue; }
    peak = Math.max(peak, Math.abs(x)); pcm[2 * i + c] = Math.max(-32767, Math.min(32767, Math.round(x * 32767)));
  }
  const bytes = new Uint8Array(pcm.buffer);
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return { rate: buf.sampleRate, peak, nan, seconds: buf.duration, pcm: btoa(s), ...extra };
}
function frames(oc: OfflineAudioContext, seconds: number, each: (t: number) => void): void {
  const at = new Map<number, (() => void)[]>(), on = (sec: number, f: () => void) => { const k = Math.round((sec * RATE) / 128) * 128; (at.get(k) ?? at.set(k, []).get(k)!).push(f); };
  for (let f = 0; f * FRAME < seconds - 0.05; f++) { const t = f * FRAME; on(t, () => each(t)); }
  for (const [k, fs] of at) void oc.suspend(k / RATE).then(() => { for (const f of fs) f(); return oc.resume(); });
}
const mmss = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toFixed(1).padStart(4, "0")}`;
const NOTE = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export interface WindowJob {
  seed: number; island: string; banger: boolean;
  /** The bar each wave lands on (waves at bar 0 have landed before the window: the night's later steps). */
  landings: number[]; from: number; to: number;
  knock?: { at: number; back: number }; victory?: number;
  /** A legend's clearing: its species, the seconds into the window she walks in and out (the world slowed between). */
  circle?: { species: string; in: number; out: number };
  /** Only these parts (a balance check). */
  solo?: string[];
  /** Banger mode's compressors off (their A/B); only the drums (what the drum bus does). */
  comp?: boolean; drums?: boolean;
  /** A balance check: only the rhythm section (the drums, the bass and its sub) or only the melodic parts; `linear`: the
   *  compressors off and the level into the limiter far under its threshold, so the two can be compared as they're mixed. */
  group?: "rhythm" | "melodic"; linear?: boolean;
  /** Only these patches' parts (a proof that a part reaches the output: the xylophone alone, the snaps alone). */
  only?: string[];
  /** A long clip: at the dancefloor throughout (a clearing's stretch too), every block's notes kept beside the clearing's. */
  long?: boolean;
  samples: Record<string, string>;
}

/** The night's style as the game plays it (its set dealt for the island), banger mode on or off. */
function styled(o: Pick<WindowJob, "seed" | "island" | "banger" | "comp" | "linear">): { style: MusicStyle; families: string[] } {
  const n = planNight(base, { seed: o.seed, island: o.island, waves: 10 }), s0 = withBanger(withMelody(nightStyle(base, n), "dance"), o.banger);
  const s = o.linear && s0.banger ? { ...s0, banger: { ...s0.banger, comp: { ...s0.banger.comp, on: false }, mix: { ...s0.banger.mix, drive: 0.1 } } } : s0;
  return { style: o.comp === false ? withoutComp(s) : s, families: n.steps.map(s => s.family) };
}

/** Bars `from` to `to` of a night, through Music at the dancefloor (its level full, a clearing's at the game's own: the same for old and new), and where each
 *  section starts and what plays there. */
async function windowRender(o: WindowJob) {
  const Z0 = o.circle, { style } = styled(o), clock = newBeatClock(style.bpm), t0 = timeAt(clock, o.from * 4), seconds = timeAt(clock, o.to * 4) - t0 + 2.5 + (o.circle ? (o.circle.out - o.circle.in) * 0.9 : 0);
  const oc = new OfflineAudioContext(2, Math.ceil(seconds * RATE), RATE), recs = await decode(oc, o.samples);
  const M = TUNING.music, m = new Music(oc, Z0 ? M.volume : 1, style, o.seed), near = mixAt(M, 1, 0, 10), far = o.long ? near : mixAt(M, nearness(M, 40), 0, 40);
  m.engine!.setRecordings(recs); if (recs.whispers) m.engine!.setWhisper(recs.whispers);
  if (o.solo) m.engine!.solo = new Set(o.solo);
  if (o.group && style.banger) {
    const Bg = style.banger, low = new Set<string>(["bgSub", ...Bg.dnb.bass.patch, ...Object.keys(Bg.kits).flatMap(k => kitOf(Bg, k).bass.patch)]);
    const rhythm = (p: string) => drumPatch(style, p) || low.has(p) || p === "impact";
    m.engine!.solo = new Set(o.group === "rhythm" ? [...Object.keys(style.patches).filter(rhythm).map(p => "b:" + p), "impact"] : [...Object.keys(style.patches).filter(p => !rhythm(p)).map(p => "b:" + p), style.form?.sung.part ?? ""]);
  }
  if (o.only) m.engine!.solo = new Set(o.only.flatMap(p => ["b:" + p, p]));
  if (o.drums) m.engine!.solo = new Set(Object.keys(style.patches).filter(p => drumPatch(style, p)).map(p => "b:" + p));
  // (the compressors' gain reduction, read each frame: dB, 0 none)
  const gr = { drums: [] as number[], glue: [] as number[] }, E = m.engine as unknown as { drumComp?: { comp: DynamicsCompressorNode; on: boolean } | null; master?: { glue?: { comp: DynamicsCompressorNode; on: boolean } } | null };
  const cue: MusicCue = { waves: o.landings, nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, ...(o.victory !== undefined ? { victory: o.victory } : {}), ...(o.knock ? { knockdowns: [o.knock] } : {}) };
  // (a wave not yet landed is "due": the conductor builds into it)
  const cueAt = (bar: number): MusicCue => { const landed = o.landings.filter(b => b <= bar), due = o.landings.find(b => b > bar); return { ...cue, waves: landed, nextAt: due ?? Infinity, stumps: landed }; };
  const Z = o.circle, scale = (t: number) => !Z ? 1 : t < Z.in ? 1 : t < Z.out ? Math.max(0.1, 1 - 0.9 * (t - Z.in) / 0.5) : Math.min(1, 0.1 + 0.9 * (t - Z.out) / 0.5);
  let game = t0;
  const track: [number, number][] = [];
  for (let f = 0, g = t0; f * FRAME < seconds; f++) { track.push([f * FRAME, g]); g += scale(f * FRAME) * FRAME; }
  /** The clip's time a game time is heard at. */
  const at = (g: number) => { let lo = 0, hi = track.length - 1; while (lo < hi) { const mid = (lo + hi) >> 1; if (track[mid][1] < g) lo = mid + 1; else hi = mid; } return track[lo][0]; };
  frames(oc, seconds, t => {
    const k = scale(t), g = game; game += k * FRAME;
    if (E.drumComp?.on) gr.drums.push(-E.drumComp.comp.reduction);
    if (E.master?.glue?.on) gr.glue.push(-E.master.glue.comp.reduction);
    const c = cueAt(g / (240 / style.bpm) + 1e-6);
    m.update(Z ? far : near, { ...c, circle: Z && t >= Z.in && t < Z.out ? { species: Z.species, level: M.circle.level } : undefined }, g, clock, true, M, k);
  });
  const marks: string[] = [];
  if (!Z || o.long) {
    const C = new Conductor(style);
    let last = "";
    for (let b = o.from; b < o.to; b++) {
      if (o.knock && b >= Math.floor(o.knock.at) && b < Math.ceil(o.knock.back)) { if (last !== "ko") marks.push(`${mmss(at(timeAt(clock, o.knock.at * 4))).padStart(7)}  she's knocked down: the record scratches, silence`); last = "ko"; continue; }
      const c = cueAt(b), p = C.plan(c, b), key = `${p.section}@${p.start}`;
      if (key === last) continue;
      last = key;
      marks.push(`${mmss(at(timeAt(clock, b * 4))).padStart(7)}  ${describe(style, c, p.start, b, o.seed)}`);
      // (the sprinkles in this block, a phrase at a time: the xylophone, the finger snaps)
      const SPb = bangerOn(style)?.spice, xyp = SPb ? bangerOn(style)!.leads[SPb.xylo].patch : "";
      if (SPb) for (let k = b; k < Math.min(o.to, p.start + p.bars); k += 8 - ((k - p.start) % 8)) {
        const fc = formClock(style, c, k), fig = xyloHeard(style, p, resolveSection(style, p.section), k, musicSeed(o.seed, fc.n), fc.start, stumpsBy(c, p.start, style.blockBars));
        const FIG: Record<string, string> = { off: "block chords on the off-beats", push: "pushed block chords", arp: "a broken-chord arpeggio", wide: "a wide arpeggio (3+3+2)", skeleton: "the skeleton dance (a low note, then two chord notes)", bones: "the skeleton dance, busier", roll: "a tremolo roll" };
        const got = new Set<string>(), runs: number[] = [], pair = new Map<number, number>(), bedCount = new Map<number, number>();
        const BD = bangerOn(style)!, bedPatches = new Set([BD.space?.bed?.voice, BD.space?.bed?.low, ...Object.values(BD.kits).map(K => K.bed)].filter(x => x && BD.leads[x]).map(x => BD.leads[x!].patch));
        for (let q = k; q < Math.min(o.to, p.start + p.bars, k + 8 - ((k - p.start) % 8)); q++) {
          if (o.knock && q >= Math.floor(o.knock.at) && q < Math.ceil(o.knock.back)) continue;
          const f = formClock(style, c, q);
          for (let s = 0; s < 16; s++) for (const e of notesAt(style, p, null, q * 16 + s, { seed: musicSeed(o.seed, f.n), formStart: f.start, siege: 0, only: "main", stumps: stumpsBy(c, p.start, style.blockBars) })) { const BB = bangerOn(style)!; if (e.patch === BB.drive?.bass.patch) got.add("grit"); if (BB.dream?.stack.includes(e.patch)) got.add("stack"); if (e.midi === null && e.patch === "snare" && e.vel < 0.45 && BB.drive?.breaks.some(v => v.patch === "snare") && s % 4 === 2) got.add("ghost"); if (e.midi !== null && e.dur === 1 && bedPatches.has(e.patch)) bedCount.set(q, (bedCount.get(q) ?? 0) + 1); if (e.patch === xyp + "L" || e.patch === xyp + "R" || /^bgXyloLow[LR]$/.test(e.patch)) got.add("echo"); if (e.patch === xyp) { got.add(s >= 12 && (q - p.start) % 8 === 7 || q === p.start + p.bars - 1 && s >= 12 ? "run" : "xylo"); if (s === 12) runs.push(q); } if (e.midi === null && s < 8 && e.vel > 0.2) { if (e.patch === SPb.snap || e.patch === "snap") got.add("snap"); else if (e.patch === "bgClap" || e.patch === "clap") got.add("clap"); else if (e.patch === "snare" || e.patch === "dnbSnare") got.add("snare"); } if (e.patch === bangerOn(style)!.vocals?.double && e.dur === 2 && fig && (pair.set(q * 16 + s, (pair.get(q * 16 + s) ?? 0) + 1), pair.get(q * 16 + s)! > 1)) got.add("stab"); }
        }
        const T = (bar: number, step = 0) => mmss(at(timeAt(clock, bar * 4 + step / 4))).padStart(7);
        const bedBars = [...bedCount.entries()].filter(([, n]) => n >= 8).map(([q]) => q), ostN = ostinatoHeard(style, p, resolveSection(style, p.section), k, formClock(style, c, k).start, stumpsBy(c, p.start, style.blockBars));
        if (fig && got.has("echo")) marks.push(`${T(k)}    + XYLOPHONE CHORDS where the lead rests in this phrase: ${FIG[fig] ?? fig}, echoing right then left`);
        const RH = riffHeard(style, p, musicSeed(o.seed, fc.n)), roleK = bangerRoleOf(style, c, k);
        if (ostN) marks.push(`${T(k)}    + OSTINATO (house): a two-bar riff, ${RH?.ostinato === "tresillo" ? "the TRESILLO CHANT (three, three and two: the same note struck again, then a step's answer, then a rest; a narrow range)" : "two accented hits then a chain of threes across the bar line, short and held notes"}; lead + xylophone an octave under in unison${got.has("snap") ? "" : RH?.ostinato === "tresillo" ? " + the singer chanting every note" : " + the singer on its accents"}; off-beat chord stabs (oom-chk), the bass bouncing on the beat; bar 1 the same each time, bar 2's contour changing; a held answer over bar 2${["", "", "; REPEAT 2 adds a line a third under the riff", "; REPEAT 3 adds: the answer as repeated accented hits, the bass busier (eighth pickups into the beat)", "; REPEAT 4 adds: longer fills (two tom sweeps and a rim shot)"][ostN]}`);
        else if (bedBars.length >= 2) marks.push(`${T(Math.min(...bedBars))}    + ROLLING BED: a broken chord in even ${[...bedCount.values()].some(n => n >= 14) ? "sixteenths" : "eighths"} under the tune, the same figure all phrase`);
        if (!ostN && RH?.chant && (roleK === "drop" || roleK === "breaks") && hookHeard(style, p, resolveSection(style, p.section), k, fc.start, stumpsBy(c, p.start, style.blockBars)) === null) marks.push(`${T(k)}    + TRESILLO CHANT: this wave's own riff is three long notes on three, three and two, the same note struck again, its ending a step away`);
        if (got.has("stack")) marks.push(`${T(k)}    + STACKED FALSETTO: her long notes doubled left and right and at the octave, on the same sixteenth`);
        const bd = bangerRoleOf(style, c, k) === "breakdown"; // (its drum & bass drop has its own line)
        if (got.has("grit") && !bd) marks.push(`${T(k)}    + DISTORTED MID BASS over the sub${ostN || bangerRoleOf(style, c, k) === "drop" ? " (a touch, under the landing's hook)" : ""}`);
        if (got.has("ghost") && bangerRoleOf(style, c, k) === "breaks") marks.push(`${T(k)}    + ghost snares on the off-beats and running hats (the breakbeat doubled up)`);
        if (got.has("stab")) marks.push(`${mmss(at(timeAt(clock, k * 4))).padStart(7)}    + SUNG CHORD STABS with the xylophone's hits in this phrase`);
        if (got.has("xylo") && !fig && !ostN && bedBars.length < 2) marks.push(`${mmss(at(timeAt(clock, k * 4))).padStart(7)}    + XYLOPHONE answering in the gaps for this phrase`);
        if (got.has("run")) marks.push(`${mmss(at(timeAt(clock, (runs[runs.length - 1] ?? k) * 4 + 3))).padStart(7)}    + XYLOPHONE run into the next phrase`);
        const bb = got.has("snap") ? (got.has("clap") || got.has("snare") ? "FINGER SNAPS, then the " + (got.has("snare") ? "snare" : "clap") : "FINGER SNAPS (a lighter phrase)") : got.has("clap") ? "clap" : got.has("snare") ? "snare" : "";
        if (bb) marks.push(`${mmss(at(timeAt(clock, k * 4))).padStart(7)}    . backbeat: ${bb}`);
      }
      // (where the night's hook is heard in this block)
      let was: string | null = null;
      for (let k = b; k < Math.min(o.to, p.start + p.bars); k++) {
        if (o.knock && k >= Math.floor(o.knock.at) && k < Math.ceil(o.knock.back)) break;
        const u = hookHeard(style, p, resolveSection(style, p.section), k, formClock(style, c, k).start, stumpsBy(c, p.start, style.blockBars));
        if (u !== was && u) marks.push(`${mmss(at(timeAt(clock, k * 4))).padStart(7)}    HOOK ${u === "whole" ? "returns, whole, on the lead; the singer on its long notes with it, a second voice a third under her" : u === "slow" ? "at half speed (sung where there's a singer)" : "teased: its first long note, faster and faster"}`);
        else if (u !== was && was) marks.push(`${mmss(at(timeAt(clock, k * 4))).padStart(7)}    (the hook rests: the wave's own riff)`);
        if (u !== was && u === "whole" && bangerOn(style) && k === p.start && p.bars >= 8) {
          // (the hook's shape, the first time round: its first long note, its first run and where that lands, a pickup after a rest)
          const h = nightHook(bangerOn(style)!, o.seed), ti = (i: number) => mmss(at(timeAt(clock, k * 4 + i / 4))).padStart(7);
          const firstLong = h.period.findIndex(x => x?.long), run = h.period.findIndex((x, i) => x && !x.long && i > firstLong), land = h.period.findIndex((x, i) => x?.long && i > run);
          if (firstLong >= 0) marks.push(`${ti(firstLong)}      > the hook's first LONG NOTE lands`);
          if (run >= 0 && land >= 0) marks.push(`${ti(run)}      > a RUN (${h.orn[run].length || h.period[run]!.dur < 1 ? "a quick turn" : "sixteenths by step"}) into the long note at ${ti(land).trim()}`);
          const pick = [1, 3, 7].map(b => b * 16).find(b0 => !h.period[b0] && h.period.slice(b0, b0 + 16).some(x => x));
          if (!h.period[0] && firstLong > 0) marks.push(`${ti(h.period.findIndex(x => x))}      > a PICKUP entry: after a rest, a run into the long note`);
          else if (pick !== undefined) marks.push(`${ti(pick + h.period.slice(pick, pick + 16).findIndex(x => x))}      > a PICKUP entry: after a rest, a run into the long note`);
        }
        was = u;
      }
      const d = isHaunted(style, p.section) ? hauntedDrop(style, p.bars) : Infinity;
      if (Number.isFinite(d) && p.start + d < o.to && p.start + d > b && bangerRoleOf(style, c, p.start + d) !== "build") marks.push(`${mmss(at(timeAt(clock, (p.start + d) * 4))).padStart(7)}  ${bangerOn(style) ? ">>> DREAMY -> AGGRESSIVE: " : ""}the drum & bass drop${bangerOn(style) ? ": the hook whole on the lead over the bed, ghost snares, the distorted mid bass" : ""}`);
    }
    if (cue.victory !== undefined) marks.push(`${mmss(at(timeAt(clock, cue.victory * 4))).padStart(7)}  THE NIGHT IS WON: the victory from the next block line`);
    if (Z) marks.push(`${mmss(Z.in).padStart(7)}  >> into a sleeping ${Z.species}'s clearing: the world slows, the music muffles, the ${Z.species}'s own layer hums tonight's hook`, `${mmss(Z.out).padStart(7)}  << out of the clearing: the music back at speed`);
    marks.sort((a, b) => { const s = (x: string) => { const m = x.trim().match(/^(\d+):([\d.]+)/)!; return +m[1] * 60 + +m[2]; }; return s(a) - s(b); });
  } else marks.push(`${mmss(0).padStart(7)}  the music nearby`, `${mmss(Z.in).padStart(7)}  into the ${Z.species}'s clearing: the world slows, the music muffles, its own layer plays${bangerOn(style) ? " (humming tonight's hook)" : ""}`, `${mmss(Z.out).padStart(7)}  out of the clearing`);
  const stat = (xs: number[]) => { const s = xs.filter(x => x > 0.05).sort((a, b) => a - b); return s.length ? `median ${s[Math.floor(s.length / 2)].toFixed(1)} dB, 90th percentile ${s[Math.floor(s.length * 0.9)].toFixed(1)} dB, most ${s[s.length - 1].toFixed(1)} dB (${Math.round((100 * s.length) / xs.length)}% of the time working)` : "none"; };
  return result(await oc.startRendering(), { marks, hook: hookText(style, o.seed), gr: compOf(style) ? `gain reduction: drum bus ${stat(gr.drums)}; master glue ${stat(gr.glue)}` : "" });
}
const bangerRoleOf = (style: MusicStyle, cue: MusicCue, bar: number) => { const p = new Conductor(style).plan(cue, bar); return bangerOn(style) ? bangerRole(style, p, arcStep(style, p.arc), resolveSection(style, p.section), formClock(style, cue, bar).start) : null; };

/** A block in words: its wave and family, its section, and in banger mode its role, kit and voices. */
function describe(style: MusicStyle, cue: MusicCue, start: number, bar: number, seed: number): string {
  const p = new Conductor(style).plan(cue, bar), a = arcStep(style, p.arc), f = formClock(style, cue, bar);
  const head = `wave ${p.wave} (${a.family ?? a.name}, energy ${a.energy.toFixed(2)}): ${p.section}`;
  const B = bangerOn(style);
  if (!B) return `${head}${isHaunted(style, p.section) ? " (haunted: the held sung line)" : ""}`;
  const role = bangerRole(style, p, a, resolveSection(style, p.section), f.start);
  if (!role) return `${head} (as before: banger mode leaves the boot and the knockout)`;
  const st = stumpsBy(cue, p.start, style.blockBars), gentle = st !== undefined && st < B.gentle.stumps;
  const kn0 = kitName(style, a, p.section), kn = gentle && !B.gentle.keep.includes(kn0) ? B.gentle.kit : kn0, K = kitOf(B, kn), parts = new Set<string>();
  for (let s = 0; s < 32; s++) for (const e of notesAt(style, p, null, (start + (role === "build" ? 0 : Math.min(p.bars - 1, 2))) * 16 + s, { seed: musicSeed(seed, f.n), formStart: f.start, siege: 0, only: "main", stumps: st })) if (e.midi !== null && !/Sub|pad|choir|strings/i.test(e.patch)) parts.add(e.patch);
  const what = role === "drop" ? (gentle ? "the groove" : "HOUSE GROOVE (as before, four on the floor where the family's is; busier tops)") : role === "breaks" ? (gentle ? "the breakbeat phrase" : ">>> AGGRESSIVE: the breakbeat phrase: ghost snares and running hats, the distorted mid bass; the reply voice has the wave's riff, then the lead joins") : role === "breakdown" ? "<<< DREAMY: the breakdown: no drums but finger snaps, her stacked long notes, the rolling bed soft; then drum & bass" : role === "build" ? (gentle ? "a gentle build: a shaker rising, the kick out for the last bar" : "the build: <<< DREAMY first half (the bass galloping, then no kick or bass: the bed, her stacked long notes, finger snaps), then the snare roll doubling, a beat of silence, and the landing") : "the victory: a whole step up, conga claps";
  // (the backbeat's drums, and the singer's harmony)
  const NAME: Record<string, string> = { bgClap: "clap", clap: "clap", bgSnap: "finger snap", snap: "finger snap", snare: "snare", dnbSnare: "snare" };
  const back = [...new Set((role === "breaks" ? K.breaks : K.drums).filter(v => NAME[v.patch] && /[Xx]/.test(v.p)).map(v => NAME[v.patch]))];
  const HV = B.vocals?.harmony, harmony = !HV || role === "build" || role === "breakdown" ? "" : gentle ? `; VOCAL HARMONY: ${HV.gentleVoices} soft voices` : `; VOCAL HARMONY: ${HV.voices} sung voices under the chords`;
  return `${head} -> ${gentle ? "GENTLE (before the second stump): " : ""}${what}; kit "${kn}" (swing ${K.swing})${harmony}; playing ${[...parts].join(", ")}`;
}
function hookText(style: MusicStyle, seed: number): string {
  const B = bangerOn(style);
  if (!B) return "";
  const h = nightHook(B, seed), sc = style.scales[B.minor?.scale ?? style.scale] ?? style.scales[style.scale], name = (n: { deg: number; sharp?: true }) => NOTE[(style.root + sc[((n.deg % 7) + 7) % 7] + (n.sharp ? 1 : 0)) % 12];
  const bars: string[] = [];
  for (const b of [0, 1, 3, 7]) {
    let row = "", held = 0;
    for (let i = 0; i < 16; i++) { const n = h.period[b * 16 + i], os = h.orn[b * 16 + i]; const cell = n || os.length ? [...(n ? [n] : []), ...os].map(x => (x.long ? name(x).toUpperCase() : name(x).toLowerCase())).join("") : held > 0 ? "-" : "."; if (n) held = Math.ceil(n.dur); held--; row += cell.padEnd(5); }
    bars.push(`  bar ${b + 1}: ${row}`);
  }
  return `tonight's hook, "long, then run" (in the home key, natural minor with the leading note raised where it rises to the root; a column a sixteenth; CAPITALS the long notes the singer doubles, small letters the runs, two or three letters in a column a thirty-second pair or a triplet; bars 1, 2, 4 and 8 of its eight; bars 3, 5 and 7 are bar 1 again):\n${bars.join("\n")}`;
}

/** The score alone, no sound: every note of bars `from` to `to` as text (the review's print-outs), and counts. */
function scoreText(o: Omit<WindowJob, "samples">): string {
  const { style } = styled(o), C = new Conductor(style), cue: MusicCue = { waves: o.landings, nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0 };
  const nm = (m: number) => NOTE[m % 12] + (Math.floor(m / 12) - 1), lines: string[] = [];
  for (let b = o.from; b < o.to; b++) {
    const landed = o.landings.filter(x => x <= b), c = { ...cue, waves: landed, nextAt: o.landings.find(x => x > b) ?? Infinity }, p = C.plan(c, b), f = formClock(style, c, b), rows = new Map<string, string[]>();
    for (let s = 0; s < 16; s++) for (const e of notesAt(style, p, b % 4 === 3 ? C.plan(c, b + 1) : null, b * 16 + s, { seed: musicSeed(o.seed, f.n), formStart: f.start, siege: 0, only: "main", stumps: stumpsBy({ stumps: landed }, p.start, style.blockBars) })) {
      const r = rows.get(e.patch) ?? rows.set(e.patch, Array(16).fill(".")).get(e.patch)!;
      r[s] = r[s] === "." ? (e.midi === null ? (e.vel > 0.7 ? "X" : e.vel > 0.35 ? "x" : "o") : nm(e.midi)) : e.midi === null ? r[s] : r[s] + "+" + nm(e.midi);
    }
    lines.push(`bar ${b} ${p.section}`);
    for (const [k, r] of rows) lines.push(`  ${k.padEnd(14)} ${r.map(x => x.padEnd(3)).join(" ")}`);
  }
  return lines.join("\n");
}

/** When each note of the patches `only` should start in bars `from` to `to` (seconds from the window's start: its sixteenth
 *  and its own offset, the kit's swing in it), for the timing check (tools/music-lab/tight.mjs). */
function noteTimes(o: Pick<WindowJob, "seed" | "island" | "landings" | "from" | "to" | "only">): { patch: string; t: number; dur: number }[] {
  const { style } = styled({ ...o, banger: true }), C = new Conductor(style), spb = 60 / style.bpm / 4, out: { patch: string; t: number; dur: number }[] = [];
  for (let b = o.from; b < o.to; b++) {
    const landed = o.landings.filter(x => x <= b), c: MusicCue = { waves: landed, nextAt: o.landings.find(x => x > b) ?? Infinity, bootUntil: 0, knockedOut: false, siege: 0, stumps: landed }, p = C.plan(c, b), f = formClock(style, c, b);
    for (let s = 0; s < 16; s++) for (const e of notesAt(style, p, null, b * 16 + s, { seed: musicSeed(o.seed, f.n), formStart: f.start, siege: 0, only: "main", stumps: stumpsBy(c, p.start, style.blockBars) })) if (o.only?.includes(e.patch)) out.push({ patch: e.patch, t: ((b - o.from) * 16 + s + e.offset + (e.straight ? 0 : s % 2 ? style.swing : 0)) * spb, dur: e.dur * spb });
  }
  return out;
}

/** The render-ahead path's routing, for a part alone (tools/music-lab/heard.mjs): bars `from` to `to` drawn as
 *  platform/audio/musicAhead.ts draws a bar (a renderer engine into the stems: the ducked parts, the rest, the reverb's send,
 *  the delay's, the ghost voice, banger mode's drums; the voice line), only the patches `only` sounding; each stem's level (dB). */
async function stemsProof(o: Pick<WindowJob, "seed" | "island" | "landings" | "from" | "to" | "only" | "samples">) {
  const { style } = styled({ ...o, banger: true }), clock = newBeatClock(style.bpm), g = timeAt(clock, o.from * 4), dur = timeAt(clock, o.to * 4) - g, STEMS = 13;
  const oc = new OfflineAudioContext(STEMS, Math.ceil(RATE * (dur + 2.5)), RATE), merge = oc.createChannelMerger(STEMS), recs = await decode(oc, o.samples);
  merge.connect(oc.destination);
  const pair = (i: number) => { const n = oc.createGain(), sp = oc.createChannelSplitter(2); n.channelCount = 2; n.channelCountMode = "explicit"; n.connect(sp); sp.connect(merge, 0, 2 * i); sp.connect(merge, 1, 2 * i + 1); return n; };
  const voice = oc.createGain(); voice.channelCount = 1; voice.channelCountMode = "explicit"; voice.connect(merge, 0, 12);
  const sink: MusicSink = { duck: pair(0), dry: pair(1), reverb: pair(2), delay: pair(3), ghost: pair(4), drums: pair(5), voice: () => voice, tone: () => {}, duckAt: () => {}, gate: () => {} };
  const r = new MusicEngine(oc, oc.destination, style, o.seed, oc.destination, sink);
  r.setRecordings(recs);
  if (o.only) r.solo = new Set(o.only.flatMap(p => ["b:" + p, p]));
  const landed = o.landings.filter(b => b <= o.from);
  r.renderAhead({ waves: landed, nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, stumps: landed }, g, dur, clock);
  const buf = await oc.startRendering(), out: Record<string, number> = {};
  ["duck", "dry", "reverb", "delay", "ghost", "drums"].forEach((name, i) => { let q = 0; for (const c of [2 * i, 2 * i + 1]) { const d = buf.getChannelData(c); for (let k = 0; k < d.length; k++) q += d[k] * d[k]; } out[name] = 10 * Math.log10(q / (2 * buf.length) + 1e-15); });
  return out;
}

Object.assign(window as unknown as { windowRender: typeof windowRender; scoreText: typeof scoreText; stemsProof: typeof stemsProof; noteTimes: typeof noteTimes }, { windowRender, scoreText, stemsProof, noteTimes });
