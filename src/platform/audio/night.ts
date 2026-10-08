// The afterparty's night (Ed, 2026-10-06: "when the soundsystems and speakers are all destroyed, the dance
// music stops ... all the animals go to sleep ... and you can walk the map safely. We can have nice
// environmental music and sounds that match each area"): once the party's over, each area is heard as a
// quiet night: a soft bed in the music's key (a slow pad and a bell now and then, in the legends' circles'
// harmonic world) and its own night sounds: wind in the pines, frogs and water in the wet places, a stream,
// owls, crickets and rustling in the woods, crickets, moths and chimes in the meadows, drips at the cave,
// and at home just the crickets and the sea far off. Only the area she's in plays, crossfading as she
// crosses a border (the one she left fading out, then let go): a layer is a handful of nodes, and its
// sounds are a few short notes now and then. And the sleeping animals snore softly near her.
// The same layers are each area's ambience in play (Ed, 2026-10-07: "Each area gets its own ambient soundscape that gives
// it individual character": a ravine's wind, a marsh's frogs and drips, standing stones' low hum, old oaks creaking), quiet,
// without the bed's pad and bells (the party's music is playing), dipping under the party near it: Night(K, knobs, false),
// the tuning's sfx.ambience (sfxCues.ts ambience).
import type { SfxKit } from "./sfxKit";
import { degree, mtof } from "./dsp";

/** The nights an area can have. */
export type NightKind = "pine" | "wood" | "oaks" | "wet" | "stream" | "ravine" | "meadow" | "open" | "stones" | "cave" | "home";

/** Each area type's night, by its id. */
export const AREA_NIGHTS: Record<string, NightKind> = {
  norway: "pine", "old-pinewood": "pine", "holly-thicket": "pine",
  "fern-forest": "wood", "tangly-forest": "wood", "wispy-forest": "wood", "hazel-forest": "wood", "twiggy-forest": "wood",
  "alder-forest": "wood", "berry-thicket": "wood", deadwood: "wood", "log-pile": "wood", "honeysuckle-tangle": "wood",
  "old-oaks": "oaks", ancient: "oaks",
  "muddy-forest": "wet", wetland: "wet", bog: "wet", "beaver-pond": "wet", fen: "wet", heronry: "wet",
  stream: "stream", ravine: "ravine",
  meadow: "meadow", garden: "meadow", grassland: "meadow", "bluebell-glade": "meadow", heath: "meadow",
  "rocky-slope": "open", moor: "stones", "stone-shrine": "stones", "cave-mouth": "cave",
  home: "home",
};
/** An area type's night (by its id; a wet area unlisted is a wet night, the rest woods). */
export function nightKind(areaId: string, wet = false): NightKind {
  return AREA_NIGHTS[areaId] ?? (wet ? "wet" : "wood");
}

/** Each night's bed (its pad's two degrees of the scale and octave, how often a bell rings) and its sounds. */
type Noise = "wind" | "water" | "stream" | "sea" | "air" | "gust" | "hollow";
const NIGHTS: Record<NightKind, { pad: [number, number]; oct: number; bellEvery: number; noise: Noise; events: [Ev, number][] }> = {
  pine: { pad: [0, 4], oct: -1, bellEvery: 9, noise: "wind", events: [["owl", 11], ["rustle", 6]] },
  wood: { pad: [0, 2], oct: 0, bellEvery: 7, noise: "air", events: [["owl", 9], ["crickets", 4], ["rustle", 5]] },
  oaks: { pad: [0, 2], oct: -1, bellEvery: 10, noise: "air", events: [["creak", 7], ["owl", 11], ["rustle", 6]] },
  ravine: { pad: [0, 4], oct: -1, bellEvery: 12, noise: "gust", events: [["drip", 4], ["rustle", 9]] },
  stones: { pad: [0, 4], oct: -1, bellEvery: 11, noise: "wind", events: [["hum", 12], ["chime", 17]] },
  cave: { pad: [0, 4], oct: -1, bellEvery: 13, noise: "hollow", events: [["drip", 2.5]] },
  wet: { pad: [0, 4], oct: -1, bellEvery: 10, noise: "water", events: [["frog", 3.5], ["rustle", 7]] },
  stream: { pad: [2, 4], oct: 0, bellEvery: 8, noise: "stream", events: [["frog", 9], ["crickets", 6]] },
  meadow: { pad: [0, 2], oct: 1, bellEvery: 5, noise: "air", events: [["crickets", 2.5], ["moth", 6], ["chime", 8]] },
  open: { pad: [0, 4], oct: -1, bellEvery: 12, noise: "wind", events: [["drip", 5], ["chime", 13]] },
  home: { pad: [0, 4], oct: 0, bellEvery: 14, noise: "sea", events: [["crickets", 3.5]] },
};
type Ev = "owl" | "rustle" | "crickets" | "frog" | "moth" | "chime" | "drip" | "creak" | "hum";
/** A layer's knobs: its volume, its bed's (the pad and bells; 0 for none), its noise's and its sounds'. */
export interface NightKnobs { volume: number; bed: number; noise: number; sounds: number }

/** One area's night: its bed and noise (built once), its sounds' next times. */
class Layer {
  readonly gain: GainNode;
  private nodes: AudioScheduledSourceNode[] = [];
  private noiseF: BiquadFilterNode;
  private noiseG: GainNode;
  private next = new Map<Ev | "bell", number>();
  level = 0;
  silentSince = -1;

  constructor(private K: SfxKit, readonly kind: NightKind, private knobs: () => NightKnobs) {
    const c = K.ctx, now = c.currentTime, N = NIGHTS[kind], T = knobs();
    this.gain = c.createGain(); this.gain.gain.value = 0; this.gain.connect(K.out);
    // the pad: two soft sines in the key, each breathing slowly, out of step (none without a bed)
    if (T.bed > 0) for (const [i, d] of N.pad.entries()) {
      const g = c.createGain(), lfo = c.createOscillator(), lg = c.createGain(), o = c.createOscillator();
      o.type = "sine"; o.frequency.value = mtof(degree(K.root - 24 + 12 * N.oct, d));
      g.gain.value = T.bed * 0.5; lfo.frequency.value = 0.05 + i * 0.031; lg.gain.value = T.bed * 0.4;
      lfo.connect(lg); lg.connect(g.gain); o.connect(g); g.connect(this.gain);
      o.start(now); lfo.start(now); this.nodes.push(o, lfo);
    }
    // the noise bed: wind, water lapping, a stream, the sea far off, or still night air
    const s = K.loopNoise(N.noise === "stream" ? 1.1 : N.noise === "gust" || N.noise === "hollow" ? 0.4 : 0.6);
    this.noiseF = c.createBiquadFilter(); this.noiseG = c.createGain(); this.noiseG.gain.value = 0;
    this.noiseF.type = N.noise === "sea" || N.noise === "air" || N.noise === "hollow" ? "lowpass" : "bandpass";
    this.noiseF.frequency.value = { wind: 600, water: 450, stream: 1400, sea: 300, air: 900, gust: 380, hollow: 240 }[N.noise];
    this.noiseF.Q.value = N.noise === "stream" ? 1.4 : N.noise === "hollow" ? 4 : N.noise === "gust" ? 1.1 : 0.6; // (the cave's hollow rings a little)
    s.connect(this.noiseF); this.noiseF.connect(this.noiseG); this.noiseG.connect(this.gain); s.start(now); this.nodes.push(s);
    for (const [e, every] of N.events) this.next.set(e, now + every * Math.random());
    if (T.bed > 0) this.next.set("bell", now + N.bellEvery * (0.3 + Math.random()));
  }

  update(now: number): void {
    const N = NIGHTS[this.kind], T = this.knobs(), L = this.level;
    // the noise bed's own motion (a ravine's gusts: long deep swells funnelled down the cleft, rising in pitch as they come)
    const slow = 0.5 + 0.3 * Math.sin(now * 0.29) + 0.2 * Math.sin(now * 0.11 + 1), gust = Math.pow(Math.max(0, Math.sin(now * 0.21) * Math.sin(now * 0.13 + 2)), 1.5);
    const amt = { wind: 0.9 * slow, water: 0.35 + 0.35 * Math.max(0, Math.sin(now * 1.7)), stream: 0.55 + 0.15 * Math.random(), sea: 0.5 * slow, air: 0.25, gust: 0.25 + 1.3 * gust, hollow: 0.5 + 0.2 * slow }[N.noise];
    this.noiseG.gain.setTargetAtTime(T.noise * amt, now, N.noise === "stream" ? 0.05 : 0.4);
    if (N.noise === "wind") this.noiseF.frequency.setTargetAtTime(400 + 500 * slow, now, 0.6);
    if (N.noise === "gust") this.noiseF.frequency.setTargetAtTime(260 + 520 * gust, now, 0.5);
    if (N.noise === "stream") this.noiseF.frequency.setTargetAtTime(1100 + 700 * Math.random(), now, 0.04);
    if (L < 0.05) return;
    for (const [e, at] of this.next) {
      if (now < at) continue;
      const every = e === "bell" ? N.bellEvery : N.events.find(x => x[0] === e)![1];
      this.next.set(e, now + every * (0.5 + Math.random()));
      this.event(e, T.sounds, Math.random() * 1.4 - 0.7, T.bed);
    }
  }

  /** Let go of its nodes (faded out). */
  stop(): void { for (const n of this.nodes) { try { n.stop(); } catch { /* stopped */ } } this.gain.disconnect(); }

  private out(pan: number): GainNode {
    const c = this.K.ctx, g = c.createGain(), p = c.createStereoPanner();
    p.pan.value = Math.max(-1, Math.min(1, pan)); g.connect(p); p.connect(this.gain);
    return g;
  }

  private event(e: Ev | "bell", vol: number, pan: number, bed: number): void {
    const K = this.K, c = K.ctx, at = c.currentTime + 0.02, r = Math.random, out = this.out(pan);
    switch (e) {
      case "bell": { // a soft bell in the key, high, ringing on in the space
        const f = mtof(degree(K.root + 12, [0, 2, 4, 7, 9][Math.floor(r() * 5)])), g = c.createGain();
        g.connect(out); g.connect(K.space()); K.env(g, at, bed * 0.6, 0.01, 2.6);
        K.osc("sine", f, at, 2.8, g); K.osc("sine", f * 2.01, at, 1.2, g);
        break;
      }
      case "owl": { // two hoots, the second lower and longer
        const f = 360 + r() * 60;
        for (const [k, d, m] of [[0, 0.35, 1], [0.55, 0.6, 0.9]] as const) {
          const g = c.createGain(), bp = c.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = f * m; bp.Q.value = 8;
          g.connect(out); g.connect(K.space()); K.env(g, at + k, vol * 0.8, 0.06, d);
          const o = K.osc("triangle", f * m, at + k, d + 0.1, bp); o.frequency.exponentialRampToValueAtTime(f * m * 0.94, at + k + d); bp.connect(g);
        }
        break;
      }
      case "rustle": { // leaves or reeds stirring
        const hp = c.createBiquadFilter(), g = c.createGain(); hp.type = "bandpass"; hp.frequency.value = 2400 + r() * 2000; hp.Q.value = 0.7;
        g.connect(out); K.env(g, at, vol * 0.5, 0.15, 0.5 + r() * 0.5); hp.connect(g); K.noiseBurst(at, 0.9, hp, r());
        break;
      }
      case "crickets": { // a few quick high chirps
        const f = 4200 + r() * 900, n = 3 + Math.floor(r() * 4);
        for (let i = 0; i < n; i++) { const g = c.createGain(), t = at + i * 0.09; g.connect(out); K.env(g, t, vol * 0.25, 0.004, 0.05); K.osc("sine", f, t, 0.07, g); }
        break;
      }
      case "frog": { // a croak or two: a buzz through a low throat
        const f = 120 + r() * 70;
        for (let i = 0, n = 1 + Math.floor(r() * 2); i < n; i++) {
          const t = at + i * 0.28, bp = c.createBiquadFilter(), g = c.createGain(); bp.type = "bandpass"; bp.frequency.value = f * 3; bp.Q.value = 4;
          g.connect(out); K.env(g, t, vol * 0.7, 0.01, 0.16); bp.connect(g); K.osc("sawtooth", f, t, 0.18, bp);
        }
        break;
      }
      case "moth": { // wings fluttering past: a soft flutter of air
        const lp = c.createBiquadFilter(), g = c.createGain(), am = c.createGain(), lfo = c.createOscillator(), d = c.createGain();
        lp.type = "bandpass"; lp.frequency.value = 700; lp.Q.value = 0.8; am.gain.value = 0.5; d.gain.value = 0.5;
        lfo.frequency.value = 24 + r() * 10; lfo.connect(d); d.connect(am.gain); lfo.start(at); lfo.stop(at + 0.8);
        g.connect(out); K.env(g, at, vol * 0.35, 0.2, 0.5); lp.connect(am); am.connect(g); K.noiseBurst(at, 0.8, lp, r());
        break;
      }
      case "chime": { // a little wind chime: three quick notes in the key
        for (let i = 0; i < 3; i++) {
          const t = at + i * (0.12 + r() * 0.1), f = mtof(degree(K.root + 24, [0, 2, 4, 7][Math.floor(r() * 4)])), g = c.createGain();
          g.connect(out); g.connect(K.space()); K.env(g, t, vol * 0.18, 0.003, 1.2); K.osc("sine", f, t, 1.3, g);
        }
        break;
      }
      case "creak": { // an old bough creaking in the wind: a slow, rough, low glide (as the treehouse's timber, places.ts)
        const f = 70 + r() * 50, dur = 0.7 + r() * 0.8, bp = c.createBiquadFilter(), g = c.createGain(), am = c.createGain(), lfo = c.createOscillator(), d = c.createGain();
        bp.type = "bandpass"; bp.frequency.value = f * 6; bp.Q.value = 5; am.gain.value = 0.6; d.gain.value = 0.4;
        lfo.type = "square"; lfo.frequency.value = 16 + r() * 12; lfo.connect(d); d.connect(am.gain); lfo.start(at); lfo.stop(at + dur + 0.05);
        g.connect(out); g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol * 0.5, at + dur * 0.4); g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
        bp.connect(am); am.connect(g);
        const o = K.osc("sawtooth", f, at, dur, bp); o.frequency.linearRampToValueAtTime(f * (r() < 0.5 ? 1.3 : 0.75), at + dur);
        break;
      }
      case "hum": { // the stones humming: a low root and fifth swelling and ebbing, a breath of overtone over it
        const dur = 5 + r() * 3, g = c.createGain();
        g.connect(out); g.connect(K.space()); g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol * 0.35, at + dur * 0.45); g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
        for (const [d, w, v] of [[0, "sine", 1], [4, "sine", 0.6], [7, "triangle", 0.15]] as [number, OscillatorType, number][]) {
          const og = c.createGain(); og.gain.value = v; og.connect(g); K.osc(w, mtof(degree(K.root - 36, d)), at, dur, og);
        }
        break;
      }
      case "drip": { // water dripping in the cave or off the rocks
        const f = 900 + r() * 700, g = c.createGain(); g.connect(out); g.connect(K.space()); K.env(g, at, vol * 0.35, 0.002, 0.1);
        const o = K.osc("sine", f, at, 0.12, g); o.frequency.exponentialRampToValueAtTime(f * 1.8, at + 0.05);
        break;
      }
    }
  }
}

/** The night over the map: the area she's in, crossfading from the one before; and the snores. */
export class Night {
  private layers = new Map<NightKind, Layer>();
  private nextSnore = 0;

  /** `knobs`: its levels (the afterparty's night, sfx.night; play's ambience, sfx.ambience with no bed). */
  constructor(private K: SfxKit, private knobs: () => NightKnobs | undefined = () => K.T.night) {}

  /** Whether any of it is built (none until the party's over). */
  get built(): boolean { return this.layers.size > 0; }

  /** Each frame: the area's night `kind` (null: none), heard at `level` (0-1, by how far the party's over). */
  update(kind: NightKind | null, level: number): void {
    const K = this.K, T = this.knobs(), now = K.ctx.currentTime;
    if (!T || (!this.layers.size && (level <= 0.001 || !kind))) return;
    if (kind && level > 0.001 && !this.layers.has(kind)) this.layers.set(kind, new Layer(K, kind, () => this.knobs()!));
    for (const [k, l] of this.layers) {
      const want = k === kind ? Math.max(0, Math.min(1, level)) : 0;
      l.level += (want - l.level) * 0.05; // (crossfading over about a second and a half at 60 frames)
      l.gain.gain.setTargetAtTime(T.volume * l.level, now, 0.2);
      l.update(now);
      if (want === 0 && l.level < 0.01) { if (l.silentSince < 0) l.silentSince = now; else if (now - l.silentSince > 3) { l.stop(); this.layers.delete(k); } }
      else l.silentSince = -1;
    }
  }

  /** A sleeping animal snoring softly (`size` 0 a baby to 1 a legend: bigger, lower and slower), now and then. */
  snore(size: number, pan = 0, near = 1): void {
    const K = this.K, S = K.T.night?.snore, c = K.ctx, now = c.currentTime;
    if (!S || near <= 0.02 || now < this.nextSnore) return;
    this.nextSnore = now + S.gap * (0.6 + 0.8 * Math.random());
    const at = now + 0.02, inhale = 0.9 + size * 0.8, f = 520 - size * 300, vol = S.volume * near;
    // breathing in through the nose: a low buzzing rasp rising; out: a soft whoosh falling
    const bp = c.createBiquadFilter(), g = c.createGain(), out = K.voice(pan);
    bp.type = "bandpass"; bp.Q.value = 2.5; bp.frequency.setValueAtTime(f * 0.8, at); bp.frequency.linearRampToValueAtTime(f, at + inhale);
    g.connect(out); g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol, at + inhale); g.gain.exponentialRampToValueAtTime(0.0001, at + inhale + 0.15);
    const am = c.createGain(), lfo = c.createOscillator(), d = c.createGain(); am.gain.value = 0.6; d.gain.value = 0.4;
    lfo.frequency.value = 26 - size * 12; lfo.connect(d); d.connect(am.gain); lfo.start(at); lfo.stop(at + inhale + 0.2);
    bp.connect(am); am.connect(g);
    const s = K.loopNoise(); s.connect(bp); s.start(at, Math.random() * 0.5); s.stop(at + inhale + 0.2);
    const lp = c.createBiquadFilter(), g2 = c.createGain(); lp.type = "lowpass"; lp.frequency.value = 900 - size * 400;
    g2.gain.value = 0.0001; g2.connect(out); K.env(g2, at + inhale + 0.1, vol * 0.6, 0.15, 1 + size); // (silent until its breath out)
    const s2 = K.loopNoise(); s2.connect(lp); lp.connect(g2); s2.start(at + inhale, Math.random() * 0.5); s2.stop(at + inhale + 1.4 + size);
  }
}
