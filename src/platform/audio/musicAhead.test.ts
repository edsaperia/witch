import { describe, expect, it, vi } from "vitest";
import { MusicAhead, stemsHeard } from "./musicAhead";

describe("music drawn ahead", () => {
  it("a bar rendered across a reset (a new night: the timeline not anchored) is dropped, not started at a non-finite time", () => {
    const createBufferSource = vi.fn();
    const ctx = { currentTime: 12, createBufferSource } as unknown as AudioContext;
    const engine = { audioAt: () => NaN } as unknown as ConstructorParameters<typeof MusicAhead>[0];
    const ahead = new MusicAhead(engine, ctx) as unknown as { bars: Map<number, { bar: number; state: string; dur: number; g: number; asked: number; events: unknown[] }>; arrive(B: unknown, buf: unknown): void };
    const B = { bar: 3, state: "rendering", dur: 2, g: 6, asked: 0, events: [] };
    ahead.bars.set(3, B);
    ahead.arrive(B, {});
    expect(B.state).toBe("dropped");
    expect(createBufferSource).not.toHaveBeenCalled();
  });
});

describe("a bar's silent stems aren't connected (Ed, 2026-11-11: \"the sound crunches and cuts out\")", () => {
  /** A rendered bar whose channels `loud` have sound in them, the rest exact zeros. */
  const bar = (loud: number[]) => ({ numberOfChannels: 13, length: 64, getChannelData: (c: number) => { const d = new Float32Array(64); if (loud.includes(c)) d[40] = 0.1; return d; } }) as unknown as AudioBuffer;
  function arrived(loud: number[]) {
    const node = () => ({ connect: vi.fn(), disconnect: vi.fn() });
    const src = { ...node(), start: vi.fn(), buffer: null as unknown, onended: null as unknown };
    const merged: unknown[] = [], split = node();
    const ctx = { currentTime: 0, createBufferSource: () => src, createChannelSplitter: () => split, createChannelMerger: () => { const m = node(); merged.push(m); return m; } } as unknown as AudioContext;
    const bus = { duck: node(), dry: node(), reverb: node(), delay: node(), drums: node(), tone: vi.fn(), duckAt: vi.fn(), gate: vi.fn() };
    const voice = node(), voiceIn = vi.fn(() => voice), ghostIn = vi.fn(() => node());
    const engine = { audioAt: (g: number) => g + 1, bus, style: { form: { sung: { part: "sung" } }, haunted: {} }, voiceIn, ghostIn } as unknown as ConstructorParameters<typeof MusicAhead>[0];
    const ahead = new MusicAhead(engine, ctx) as unknown as { bars: Map<number, unknown>; arrive(B: unknown, buf: unknown): void };
    const B = { bar: 3, state: "rendering", dur: 2, g: 6, asked: 0, events: [] };
    ahead.bars.set(3, B);
    ahead.arrive(B, bar(loud));
    return { B, merged: merged as { connect: ReturnType<typeof vi.fn> }[], bus, voiceIn, ghostIn, split };
  }
  it("the voice line's stem, silent while she isn't singing, leaves its effects (their 5.5 s hall) to rest; the ghost's likewise", () => {
    const r = arrived([2, 3, 10, 11]); // (the rest and the drums)
    expect(r.B.state).toBe("queued");
    expect(r.voiceIn).not.toHaveBeenCalled();
    expect(r.ghostIn).not.toHaveBeenCalled();
    expect(r.merged).toHaveLength(2);
    expect(r.merged[0].connect).toHaveBeenCalledWith(r.bus.dry);
    expect(r.merged[1].connect).toHaveBeenCalledWith(r.bus.drums);
  });
  it("a stem with sound in it is connected as ever", () => {
    const r = arrived([0, 2, 4, 6, 8, 10, 12]);
    expect(r.voiceIn).toHaveBeenCalledWith("sung");
    expect(r.ghostIn).toHaveBeenCalled();
    expect(r.merged).toHaveLength(6);
    expect(r.split.connect).toHaveBeenCalledWith(r.voiceIn.mock.results[0].value, 12);
  });
  it("stemsHeard finds a single sample's sound and calls exact zeros silent", () => {
    expect(stemsHeard(bar([5]))).toEqual(Array.from({ length: 13 }, (_, i) => i === 5));
  });
});
