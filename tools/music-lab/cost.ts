// The music graph's cost (Ed's machine under-runs the audio thread while the music plays, and not with ?music=off): the
// game's own music engine rendered offline (OfflineAudioContext, 48 kHz stereo, as a device runs), timed against the audio
// it makes, with the nodes it builds and the sources it plays counted. Bundled into a page by tools/music-lab/cost.cjs.
//   sections: every section alone, 8 bars each (its intro and builds part-way in, as the music check renders them);
//   parts:    the costliest sections' parts, each alone in its section (the same render, the others taken out);
//   run:      a whole arrangement, the boot then every arc step's waves, 4 bars (a block) at a time, with the siege and
//             party hooks on for the second half of each wave.
// The cost is the render's wall time over the audio's (a load of 1 would be the whole audio thread); offline rendering
// runs as fast as it can on its own thread, so this is the graph's own work, without a device's deadlines.
import styleJson from "../../config/music-style.json";
import { MusicEngine } from "../../src/platform/audio/musicEngine";
import { newBeatClock, waveArrived, waveTempo, type BeatClock } from "../../src/rules/beat";
import { barSeconds, type MusicCue } from "../../src/rules/musicPlan";
import { resolveSection, type MusicStyle } from "../../src/rules/musicScore";

const STYLE = styleJson as unknown as MusicStyle;
const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x));
const RATE = 48000;

// ---- what the graph makes: nodes by kind, and every source's span (start to stop, or its buffer's end) ----
interface Tally { nodes: Record<string, number>; spans: [number, number][] }
let tally: Tally = { nodes: {}, spans: [] };
const P = BaseAudioContext.prototype as unknown as Record<string, unknown>;
for (const k of Object.getOwnPropertyNames(BaseAudioContext.prototype)) {
  if (!k.startsWith("create") || typeof P[k] !== "function") continue;
  const f = P[k] as (...a: unknown[]) => unknown;
  P[k] = function (this: BaseAudioContext, ...a: unknown[]) { const kind = k.slice(6); tally.nodes[kind] = (tally.nodes[kind] ?? 0) + 1; return f.apply(this, a); };
}
// (a buffer source has its own start: both wrapped)
const spanOf = new WeakMap<object, [number, number]>();
for (const proto of [AudioScheduledSourceNode.prototype, AudioBufferSourceNode.prototype] as unknown as { start: (...a: number[]) => void; stop: (...a: number[]) => void }[]) {
  const start0 = proto.start, stop0 = proto.stop;
  if (Object.prototype.hasOwnProperty.call(proto, "start")) proto.start = function (this: AudioScheduledSourceNode, when = 0, offset = 0, dur?: number) {
    if (!spanOf.has(this)) {
      const b = this instanceof AudioBufferSourceNode && !this.loop && this.buffer ? this.buffer.duration / Math.max(1e-3, this.playbackRate.value) : Infinity;
      const span: [number, number] = [when, when + Math.min(b - (offset || 0), dur ?? Infinity)];
      spanOf.set(this, span); tally.spans.push(span);
    }
    return dur === undefined ? start0.call(this, when, offset) : start0.call(this, when, offset, dur);
  };
  if (Object.prototype.hasOwnProperty.call(proto, "stop")) proto.stop = function (this: AudioScheduledSourceNode, when = 0) { const s = spanOf.get(this); if (s) s[1] = Math.min(s[1], when); return stop0.call(this, when); };
}

/** The sources sounding at once over [0, len): the most, and the mean, sampled every 10 ms. */
function concurrency(spans: [number, number][], len: number): { peak: number; mean: number } {
  const n = Math.ceil(len * 100), on = new Int32Array(n + 1);
  for (const [a, b] of spans) { const i = Math.max(0, Math.floor(a * 100)), j = Math.min(n, Math.ceil(Math.min(b, len) * 100)); if (j > i) { on[i]++; on[j]--; } }
  let c = 0, peak = 0, sum = 0;
  for (let i = 0; i < n; i++) { c += on[i]; peak = Math.max(peak, c); sum += c; }
  return { peak, mean: sum / Math.max(1, n) };
}

export interface Cost { name: string; seconds: number; renderMs: number; load: number; nodes: number; nodesPerSec: number; sourcesPerSec: number; peak: number; mean: number; byKind: Record<string, number> }

/** Render `seconds` of the engine from game time `from` offline, and what it cost. */
async function measure(name: string, style: MusicStyle, cue: MusicCue, from: number, seconds: number, clock: BeatClock): Promise<Cost> {
  tally = { nodes: {}, spans: [] };
  const oc = new OfflineAudioContext(2, Math.ceil(RATE * seconds), RATE);
  const e = new MusicEngine(oc, oc.destination, style, 7);
  e.renderAhead(cue, from, seconds, clock);
  const t0 = performance.now();
  await oc.startRendering();
  const renderMs = performance.now() - t0, nodes = Object.values(tally.nodes).reduce((a, b) => a + b, 0), c = concurrency(tally.spans, seconds);
  return { name, seconds, renderMs, load: renderMs / 1000 / seconds, nodes, nodesPerSec: nodes / seconds, sourcesPerSec: tally.spans.length / seconds, peak: c.peak, mean: c.mean, byKind: tally.nodes };
}

const quiet: MusicCue = { waves: [], nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0 };

/** Every section alone, `bars` bars each. */
async function sections(bars = 8, style = STYLE): Promise<Cost[]> {
  const spBar = barSeconds(style.bpm), steady = newBeatClock(style.bpm), out: Cost[] = [];
  for (const name of Object.keys(style.sections)) {
    const from = name === style.intro || resolveSection(style, name).riser ? 8 * spBar : 0;
    out.push(await measure(name, style, { ...quiet, forceSection: name, forceWave: 3 }, from, bars * spBar, steady));
  }
  return out;
}

/** Each part of section `name` alone in it (the section's own parts; the hooks' parts aren't in a forced section). */
async function parts(name: string, bars = 8): Promise<Cost[]> {
  const spBar = barSeconds(STYLE.bpm), steady = newBeatClock(STYLE.bpm), out: Cost[] = [];
  const own = Object.keys(resolveSection(STYLE, name).parts);
  const from = name === STYLE.intro || resolveSection(STYLE, name).riser ? 8 * spBar : 0;
  out.push(await measure(`${name} (none)`, emptied(name, []), { ...quiet, forceSection: name, forceWave: 3 }, from, bars * spBar, steady));
  for (const p of own) out.push(await measure(`${name}: ${p} (${STYLE.parts[p]?.patch ?? "?"})`, emptied(name, [p]), { ...quiet, forceSection: name, forceWave: 3 }, from, bars * spBar, steady));
  return out;
}
/** The style with section `name` keeping only `keep` of its parts (and no parent section's). */
function emptied(name: string, keep: string[]): MusicStyle {
  const st = clone(STYLE), sec = resolveSection(STYLE, name), def = st.sections[name] as unknown as Record<string, unknown>;
  delete def.base;
  def.parts = Object.fromEntries(Object.entries(sec.parts).filter(([k]) => keep.includes(k)));
  return st;
}

/** A whole arrangement: the boot (`boot` bars), then a wave every `every` bars through the arc (and `extra` waves past
 *  it), rendered a block (`block` bars) at a time; under siege and with a party near for the second half of each wave. */
async function run(boot = 16, every = 32, extra = 1, block = 4, onBlock?: (c: Cost & { bar: number; wave: number }) => void): Promise<(Cost & { bar: number; wave: number })[]> {
  const tun = { beat: { bpm: STYLE.bpm, tempos: STYLE.arc.map(a => a.bpm ?? STYLE.bpm), blockBars: STYLE.blockBars, rampBars: STYLE.tempoRampBars ?? 8 } };
  const spBar = barSeconds(STYLE.bpm), nWaves = STYLE.arc.length - 1 + extra, end = boot + nWaves * every + every / 2, out: (Cost & { bar: number; wave: number })[] = [];
  for (let bar = 0; bar < end; bar += block) {
    // the clock as the game's at this point: each wave's tempo eased in from its arrival (bars at the base tempo)
    const clock = newBeatClock(STYLE.bpm, waveTempo(tun, 0)), waves: number[] = [];
    for (let w = 1; w <= nWaves && boot + (w - 1) * every <= bar; w++) { waves.push(boot + (w - 1) * every); waveArrived(clock, tun, w, (boot + (w - 1) * every) * spBar); }
    const wave = waves.length, into = wave ? bar - waves[wave - 1] : 0, busy = wave > 0 && into >= every / 2 ? 1 : 0;
    const cue: MusicCue = { waves, nextAt: boot + wave * every, bootUntil: boot, knockedOut: false, siege: busy, party: busy };
    const c = { ...(await measure(`bar ${bar}`, STYLE, cue, bar * spBar, block * spBar, clock)), bar, wave };
    out.push(c); onBlock?.(c);
  }
  return out;
}

Object.assign(window, { musicCost: { sections, parts, run, sectionNames: Object.keys(STYLE.sections) } });
