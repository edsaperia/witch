// The vocal-tract voice's AudioWorklet (Ed's singer review, 2026-10-14, docs/backlog/music.md "The singer, and the music
// round it": "a vocal-tract model in a worklet"): Pink Trombone's physics (tools/voice/pink-trombone, Neil Thapen's model,
// MIT; its offline renderer, so no ScriptProcessor) as a pool of voices in one worklet, notes started and stopped on the
// audio clock. Bundled by tools/voice/tract/build.mjs into src/platform/audio/tract/tractModule.ts (a string the game loads
// as a Blob URL only when the voice is first wanted). Each voice: the pitch glides (the glottis' own smoothing), the tongue
// glides to each note's vowel, tenseness firms up through the note (breathy to clear: `tense`), vibrato creeps in after
// `vibratoAfter`, breath is the model's own aspiration (low tenseness), and a short gain ramp in and out keeps clicks away;
// between notes the folds are still and the tract rings down.
import { PinkTrombone, setClock } from "../pink-trombone/index.js";

const BLOCK = 128;
class WitchTract extends AudioWorkletProcessor {
  constructor(options) {
    super();
    const o = options.processorOptions || {};
    // (globalThis: the bundle shares one scope with the library, whose own `sampleRate` variable would shadow the worklet's)
    setClock(() => globalThis.currentTime * 1000); // (the model's timers: the tract's reshaping, the glottis' vibrato)
    this.N = o.voices || 3;
    this.v = [];
    for (let k = 0; k < this.N; k++) {
      const pt = new PinkTrombone(null, { offline: { sampleRate: globalThis.sampleRate }, tractLength: o.tractLength || 40 });
      pt.isVoiced = false; pt.vibrato.frequency = o.vibratoRate || 5.2; pt.vibrato.amount = 0;
      pt.glottis.wander = o.wander ?? 0.15; // (the model's own pitch drift, scaled: as written it wanders up to 6%, out of tune)
      this.v.push({ pt, note: null, env: 0, fr: 0.35, op: 0.95, from: [0.35, 0.95], offAt: -1e12, onAt: -1e12 });
    }
    this.events = [];
    this.port.onmessage = e => { for (const ev of e.data) this.events.push(ev); this.events.sort((a, b) => a.t - b.t); };
  }
  /** A free voice (the longest silent), else the oldest sounding one. */
  pick() {
    let best = 0, score = Infinity;
    for (let k = 0; k < this.N; k++) { const v = this.v[k], s = v.note ? 1e15 + v.onAt : v.offAt; if (s < score) { score = s; best = k; } }
    return this.v[best];
  }
  handle(ev, t) {
    if (ev.type === "on") {
      const v = this.pick();
      v.note = { ...ev, start: t }; v.onAt = t; v.from = [v.fr, v.op];
      v.pt.isVoiced = true; v.pt.pitch = ev.midi; v.pt.glottis.UITenseness = ev.tense[0]; v.pt.glottis.loudness = Math.pow(ev.tense[0], 0.25); v.pt.vibrato.amount = 0;
    } else if (ev.type === "off") {
      for (const v of this.v) if (v.note && v.note.id === ev.id) { v.note = null; v.offAt = t; v.pt.isVoiced = false; v.pt.vibrato.amount = 0; }
    } else if (ev.type === "set") {
      for (const v of this.v) { if (ev.name === "vibratoRate") v.pt.vibrato.frequency = ev.value; if (ev.name === "wander") v.pt.glottis.wander = ev.value; }
    }
  }
  process(inputs, outputs) {
    try { return this.render(outputs[0][0]); } catch (e) { if (!this.failed) { this.failed = true; this.port.postMessage({ error: String(e && e.stack || e) }); } return true; }
  }
  render(out) {
    const rate = globalThis.sampleRate, t0 = globalThis.currentTime, tEnd = t0 + BLOCK / rate;
    while (this.events.length && this.events[0].t < tEnd) { const ev = this.events.shift(); this.handle(ev, Math.max(t0, ev.t)); }
    out.fill(0);
    for (const v of this.v) {
      const n = v.note;
      if (n) {
        const into = t0 - n.start, g = Math.max(1e-3, Math.min(n.glide, n.dur / 2)), k = Math.min(1, into / g);
        v.fr = v.from[0] + (n.vowel[0] - v.from[0]) * k; v.op = v.from[1] + (n.vowel[1] - v.from[1]) * k;
        v.pt.vowel.frontness = v.fr; v.pt.vowel.openness = v.op;
        const tn = n.tense[0] + (n.tense[1] - n.tense[0]) * Math.min(1, into / Math.max(0.2, n.dur));
        v.pt.glottis.UITenseness = tn; v.pt.glottis.loudness = Math.pow(tn, 0.25);
        v.pt.vibrato.amount = into > n.vibratoAfter ? n.vibrato * Math.min(1, (into - n.vibratoAfter) / 0.3) : 0;
        if (into >= n.dur) { v.note = null; v.offAt = t0; v.pt.isVoiced = false; v.pt.vibrato.amount = 0; }
      } else if (v.env <= 1e-4 && t0 - v.offAt > 1.5) continue; // (silent and rung down: nothing to render)
      const block = v.pt.render(BLOCK), gain = n ? n.gain : 0, up = 1 / (0.02 * rate), down = 1 / (0.08 * rate);
      for (let i = 0; i < BLOCK; i++) {
        v.env += v.env < gain ? Math.min(up, gain - v.env) : -Math.min(down, v.env - gain);
        out[i] += block[i] * v.env;
      }
    }
    return true;
  }
}
registerProcessor("witch-tract", WitchTract);
