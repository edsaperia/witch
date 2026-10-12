// The sound effects' voice budget (sfxKit.ts voice; Ed's playtest, 2026-10-12: "the sound is cutting out ... too many
// simultaneous sounds"), on a stand-in audio context: past the cap a lesser sound goes nowhere, a greater one cuts the least
// short, lasting ones aren't counted, and those done are let go.
import { describe, expect, it } from "vitest";
import { SfxKit, type SfxTuning } from "./sfxKit";

function fakeCtx() {
  const node = () => {
    const n = { connected: [] as unknown[], connect(d: unknown) { n.connected.push(d); return d; }, disconnect() { n.connected.length = 0; } };
    return n;
  };
  const param = () => ({ value: 1, setValueAtTime() {}, setTargetAtTime() {}, cancelScheduledValues() {}, exponentialRampToValueAtTime() {}, linearRampToValueAtTime() {} });
  const ctx = {
    currentTime: 0, sampleRate: 48000, destination: node(),
    createGain: () => Object.assign(node(), { gain: param() }),
    createStereoPanner: () => Object.assign(node(), { pan: param() }),
    createDynamicsCompressor: () => Object.assign(node(), { threshold: param(), knee: param(), ratio: param(), attack: param(), release: param() }),
    createBuffer: (ch: number, n: number) => ({ getChannelData: () => new Float32Array(n), numberOfChannels: ch, length: n }),
  };
  return ctx;
}

const kit = (cap: number) => { const ctx = fakeCtx(); return { ctx, k: new SfxKit(ctx as unknown as AudioContext, 1, { volume: 1, budget: { voices: cap } } as unknown as SfxTuning, 57) }; };
const heard = (g: { connected: unknown[] }) => g.connected.length > 0;

describe("the sound effects' voice budget", () => {
  it("plays up to the cap, then lets a lesser sound go nowhere", () => {
    const { k } = kit(3);
    const a = [k.voice(0, 0.5), k.voice(0, 0.5), k.voice(0, 0.5)];
    expect(a.every(g => heard(g as never))).toBe(true);
    expect(heard(k.voice(0, 0.2) as never)).toBe(false);
    expect(heard(k.voice(0, 0.5) as never)).toBe(false); // (no more than every one sounding)
    expect(k.budget).toMatchObject({ peak: 3, culled: 2, stolen: 0 });
  });
  it("lets a greater sound cut the least short", () => {
    const { k } = kit(2);
    k.voice(0, 0.2); k.voice(0, 0.6);
    expect(heard(k.voice(0, 1) as never)).toBe(true);
    expect(k.budget.stolen).toBe(1);
  });
  it("counts no lasting sound, and lets go of those done", () => {
    const { ctx, k } = kit(1);
    expect(heard(k.voice(0, 0.1, Infinity) as never)).toBe(true);
    expect(heard(k.voice(0, 0.5, 1) as never)).toBe(true);
    expect(heard(k.voice(0, 0.5, 1) as never)).toBe(false);
    ctx.currentTime = 1.5;
    expect(heard(k.voice(0, 0.5, 1) as never)).toBe(true);
  });
  it("has no limit at 0", () => {
    const { k } = kit(0);
    for (let i = 0; i < 100; i++) expect(heard(k.voice(0, 0) as never)).toBe(true);
    expect(k.budget.peak).toBe(100);
  });
});
