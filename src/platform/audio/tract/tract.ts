// The vocal-tract voice on Web Audio (Ed's singer review, 2026-10-14: "a vocal-tract model in a worklet", A/B'd against the
// sampled alto): Pink Trombone's physics (tools/voice/pink-trombone, MIT) as our own AudioWorklet (tools/voice/tract/worklet.js,
// bundled into tractModule.ts), a pool of voices in one worklet, notes started and stopped on the audio clock. The bundled
// worklet (21 kB) is loaded only when the voice is first wanted (a dynamic import); the formant voice sings until it's in.
const ready = new WeakSet<BaseAudioContext>(), loading = new WeakMap<BaseAudioContext, Promise<boolean>>();

/** Loads the worklet on `ctx` (once): true once its voices can be made. */
export function tractReady(ctx: BaseAudioContext): Promise<boolean> {
  let p = loading.get(ctx);
  if (!p) {
    p = (async () => {
      try {
        if (!ctx.audioWorklet) return false;
        const m = await import("./tractModule");
        const url = URL.createObjectURL(new Blob([m.TRACT_SOURCE], { type: "application/javascript" }));
        await ctx.audioWorklet.addModule(url);
        URL.revokeObjectURL(url);
        ready.add(ctx);
        return true;
      } catch { return false; }
    })();
    loading.set(ctx, p);
  }
  return p;
}
export const tractLoaded = (ctx: BaseAudioContext): boolean => ready.has(ctx);

/** A vowel as the tongue's place: frontness (0 back to 1 front) and openness (0 close to 1 open); tools/voice/sing.mjs's. */
export const TRACT_VOWELS: Record<string, [number, number]> = { ah: [0.35, 0.95], aa: [0.35, 0.95], a: [0.35, 0.95], oh: [0.12, 0.6], o: [0.12, 0.6], oo: [0.05, 0.25], u: [0.05, 0.25], eh: [0.75, 0.7], e: [0.75, 0.7], ee: [0.95, 0.15], i: [0.95, 0.15], uh: [0.4, 0.6] };

export interface TractSettings {
  /** The tract's length (44 a man's, about 36 a soprano's, 40 an alto's). */
  tractLength?: number;
  /** Tenseness from a note's start to its body (0 breathy to 1 clear and sharp). */
  tense?: [number, number];
  /** Vibrato's depth (a share of the pitch), rate (Hz) and how long after a note's start it creeps in (s). */
  vibrato?: number; vibratoRate?: number; vibratoAfter?: number;
  /** How long the tongue takes to reach a note's vowel (s). */
  glide?: number;
  /** How much of the model's own slow pitch drift is kept (1 as Pink Trombone has it, up to 6%: out of tune; 0 none). */
  wander?: number;
}

interface NoteOn { type: "on"; t: number; id: number; midi: number; dur: number; gain: number; vowel: [number, number]; tense: [number, number]; vibrato: number; vibratoAfter: number; glide: number }
let nextId = 1;

/** A pool of vocal-tract voices on one worklet (a part's): notes on the audio clock. Only once tractReady(ctx) resolved true. */
export class TractVoices {
  readonly node: AudioWorkletNode;
  private pending: object[] = [];
  private flushAt = -1;
  constructor(ctx: BaseAudioContext, dest: AudioNode, voices = 3, private s: TractSettings = {}) {
    this.node = new AudioWorkletNode(ctx, "witch-tract", { numberOfInputs: 0, numberOfOutputs: 1, outputChannelCount: [1], processorOptions: { voices, tractLength: s.tractLength ?? 40, vibratoRate: s.vibratoRate ?? 5.2, wander: s.wander ?? 0.15 } });
    const level = ctx.createGain(); level.gain.value = 1.6; // (the model sings quietly: brought up to the formant voice's)
    this.node.connect(level).connect(dest);
  }
  /** A note from `t` for `dur` seconds at `midi`, `gain` 0-1, on `vowel` (a name, or the tongue's place). */
  note(t: number, midi: number, dur: number, gain: number, vowel: string | [number, number]): void {
    const v = typeof vowel === "string" ? TRACT_VOWELS[vowel] ?? TRACT_VOWELS.ah : vowel, id = nextId++;
    const on: NoteOn = { type: "on", t, id, midi, dur: Math.max(0.05, dur), gain: Math.min(1, gain), vowel: v, tense: this.s.tense ?? [0.45, 0.72], vibrato: this.s.vibrato ?? 0.012, vibratoAfter: this.s.vibratoAfter ?? 0.3, glide: this.s.glide ?? 0.09 };
    this.post([on]);
  }
  private post(evs: object[]): void {
    this.pending.push(...evs);
    if (this.flushAt >= 0) return;
    this.flushAt = 1;
    const flush = () => { this.node.port.postMessage(this.pending); this.pending = []; this.flushAt = -1; };
    if (typeof queueMicrotask === "function") queueMicrotask(flush); else flush();
  }
  dispose(): void { try { this.node.disconnect(); } catch { /* gone */ } }
}
