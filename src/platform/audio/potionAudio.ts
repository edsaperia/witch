import type { SfxKit } from './sfxKit';

/** Two complementary windowed delay taps, as in voiceFx's shimmer, transposing the whole creature bus.
 * Increasing delay at 1-ratio halves all frequencies at ratio .5. Existing calls and reverb pass through too. */
export class CreaturePitch {
  readonly input: GainNode;
  private readonly dry: GainNode;
  private readonly wet: GainNode;
  private taps: { sources: AudioBufferSourceNode[]; nodes: AudioNode[] } | null = null;
  private amount = 0;
  constructor(private readonly ctx: AudioContext | OfflineAudioContext, destination: AudioNode) {
    this.input = ctx.createGain(); this.dry = ctx.createGain(); this.wet = ctx.createGain();
    this.input.connect(this.dry); this.dry.connect(destination); this.wet.connect(destination); this.wet.gain.value = 0;
  }
  set(amount: number): void {
    amount = Math.max(0, Math.min(1, amount));
    if (amount === this.amount) return;
    this.amount = amount;
    const c = this.ctx, at = c.currentTime;
    if (!amount) {
      this.dry.gain.setValueAtTime(1, at); this.wet.gain.setValueAtTime(0, at);
      this.stopTaps(); return;
    }
    if (!this.taps) {
      const sources: AudioBufferSourceNode[] = [], nodes: AudioNode[] = [];
      const ramp = c.createBuffer(1, c.sampleRate, c.sampleRate), window = c.createBuffer(1, c.sampleRate, c.sampleRate);
      const r = ramp.getChannelData(0), w = window.getChannelData(0);
      for (let i = 0; i < r.length; i++) { r[i] = i / r.length; w[i] = Math.sin(Math.PI * i / r.length) ** 2; }
      for (const phase of [0, .5]) {
        const delay = c.createDelay(.1), gain = c.createGain(), depth = c.createGain();
        delay.delayTime.value = .003; gain.gain.value = 0; depth.gain.value = .06;
        this.input.connect(delay); delay.connect(gain); gain.connect(this.wet); depth.connect(delay.delayTime);
        for (const [buffer, target] of [[ramp, depth], [window, gain.gain]] as const) {
          const source = c.createBufferSource(); source.buffer = buffer; source.loop = true;
          source.playbackRate.value = creaturePitchRate(amount); source.connect(target as AudioNode);
          source.start(at, phase); sources.push(source);
        }
        nodes.push(delay, gain, depth);
      }
      this.taps = { sources, nodes };
    }
    for (const source of this.taps.sources) source.playbackRate.setValueAtTime(creaturePitchRate(amount), at);
    // A tiny dry crossfade at the very end removes the delay before returning to the untouched route.
    const wet = Math.min(1, amount * 50);
    this.dry.gain.setValueAtTime(1 - wet, at); this.wet.gain.setValueAtTime(wet, at);
  }
  private stopTaps(): void {
    if (!this.taps) return;
    // Only tap connections are removed; the ordinary dry route remains connected.
    for (const node of this.taps.nodes) { try { this.input.disconnect(node); } catch { /* not a direct input */ } node.disconnect(); }
    for (const source of this.taps.sources) { source.stop(); source.disconnect(); }
    this.taps = null;
  }
  dispose(): void { this.stopTaps(); this.input.disconnect(); this.dry.disconnect(); this.wet.disconnect(); }
}
export const creaturePitchRate = (strength: number): number => (1 - 2 ** -strength) / .06;

/** Quiet close mask breathing; its envelope follows game time, not wall time or a timer. */
export function maskBreath(time: number, rate: number): number {
  const phase = ((time * rate) % 1 + 1) % 1;
  const inhale = phase < .43 ? Math.sin(Math.PI * phase / .43) : 0;
  const exhale = phase > .53 && phase < .96 ? Math.sin(Math.PI * (phase - .53) / .43) * .72 : 0;
  return Math.max(0, inhale + exhale);
}
export class PotionAudio {
  private breath: { source: AudioBufferSourceNode; filter: BiquadFilterNode; gain: GainNode } | null = null;
  constructor(private readonly kit: SfxKit) {}
  /** The sole non-creature cue allowed through Night Vision isolation. Original synthesised whine. */
  startup(): void {
    const k = this.kit, at = k.ctx.currentTime + .005, out = k.voice(0, 1, .65), gain = k.ctx.createGain();
    gain.connect(out); k.env(gain, at, .065, .035, .5);
    const tone = k.osc('sine', 380, at, .58, gain);
    tone.frequency.exponentialRampToValueAtTime(2100, at + .37);
    tone.frequency.exponentialRampToValueAtTime(1600, at + .55);
  }
  breathing(level: number, rate: number, time: number): void {
    if (level <= 0) { this.dispose(); return; }
    const k = this.kit, at = k.ctx.currentTime;
    if (!this.breath) {
      const source = k.loopNoise(.72), filter = k.ctx.createBiquadFilter(), gain = k.ctx.createGain();
      filter.type = 'bandpass'; filter.frequency.value = 430; filter.Q.value = .8; gain.gain.value = 0;
      source.connect(filter); filter.connect(gain); gain.connect(k.out); source.start(at);
      this.breath = { source, filter, gain };
    }
    const shape = maskBreath(time, rate);
    this.breath.gain.gain.setTargetAtTime(.14 * level * shape, at, .035);
    this.breath.filter.frequency.setTargetAtTime(280 + shape * 280, at, .06);
  }
  dispose(): void {
    if (!this.breath) return;
    const { source, filter, gain } = this.breath; this.breath = null;
    source.stop(); source.disconnect(); filter.disconnect(); gain.disconnect();
  }
}
