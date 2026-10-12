import { describe, expect, it } from "vitest";
import { ARRIVE_FRESH, ARRIVE_KEY, readArrival, writeArrival } from "./arrival";

const memory = (limit = Infinity) => {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => { if (v.length > limit) throw new Error("quota"); m.set(k, v); },
    removeItem: (k: string) => void m.delete(k),
    raw: m,
  };
};
const end = { cam: { x: 3, z: 1800, height: 174, pitch: 0.73, fov: 20, speed: 73 }, still: "data:image/jpeg;base64,AAAA" };

describe("the sail's hand-over (app/arrival.ts)", () => {
  it("carries the flight's end to the island's page, once", () => {
    const s = memory();
    writeArrival("wolf", 7, end, s, 1000);
    const a = readArrival("wolf", s, 2000)!;
    expect(a).toMatchObject({ v: 1, island: "wolf", world: 7, at: 1000, ...end });
    expect(readArrival("wolf", s, 2000)).toBeNull(); // (read once)
  });
  it("ignores another island's, a stale one, and none", () => {
    const s = memory();
    writeArrival("wolf", 0, end, s, 0);
    expect(readArrival("stag", s, 10)).toBeNull();
    writeArrival("wolf", 0, end, s, 0);
    expect(readArrival("wolf", s, ARRIVE_FRESH + 1)).toBeNull();
    expect(readArrival("wolf", memory(), 0)).toBeNull();
    expect(readArrival("wolf", null, 0)).toBeNull();
  });
  it("keeps the camera without the still when the still won't fit", () => {
    const s = memory(400);
    writeArrival("wolf", 0, { ...end, still: "x".repeat(1000) }, s, 0);
    expect(JSON.parse(s.raw.get(ARRIVE_KEY)!).still).toBe("");
    expect(readArrival("wolf", s, 1)?.cam.height).toBe(174);
  });
});
