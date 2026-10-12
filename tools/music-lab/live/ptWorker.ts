// Sings one note with Pink Trombone (tools/voice/sing.mjs, MIT) off the page's thread, for the live Music Lab's vocalise:
// a 2 s note is about 140 ms of work on a laptop, more on a phone, so never on the thread that schedules the music.
// In: { key, midi, dur, vowel, rate }. Out: { key, samples } (mono Float32Array, transferred).
import { sing } from "../../voice/sing.mjs";
import { SOPRANO } from "../ingredients";

self.onmessage = (ev: MessageEvent<{ key: string; midi: number; dur: number; vowel: string; rate: number }>) => {
  const { key, midi, dur, vowel, rate } = ev.data;
  const samples = sing([{ at: 0.01, dur, midi, vowel }], dur + 0.25, { ...SOPRANO, sampleRate: rate }) as Float32Array;
  (self as unknown as Worker).postMessage({ key, samples }, [samples.buffer]);
};
