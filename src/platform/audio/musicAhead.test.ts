import { describe, expect, it, vi } from "vitest";
import { MusicAhead } from "./musicAhead";

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
