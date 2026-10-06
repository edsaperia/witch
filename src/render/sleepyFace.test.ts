import { describe, expect, it } from "vitest";
import { sleepyFace } from "./sleepyFace";

const Z = { face: "😴", weight: 0.8, every: 3.5, faces: ["🥱", "😑", "😌", "🫠", "😮‍💨", "😔", "😪", "☺️"] };
describe("a sleeping legend's sleepy face", () => {
  it("is mostly 😴, now and then each of the others", () => {
    const seen = new Map<string, number>();
    for (let id = 0; id < 40; id++) for (let t = 0; t < 400; t += 3.5) { const f = sleepyFace(id, t, Z); seen.set(f, (seen.get(f) ?? 0) + 1); }
    const all = [...seen.values()].reduce((a, b) => a + b, 0);
    expect(seen.get("😴")! / all).toBeGreaterThan(0.74); expect(seen.get("😴")! / all).toBeLessThan(0.86);
    for (const f of Z.faces) expect(seen.get(f) ?? 0).toBeGreaterThan(0);
  });
  it("holds a face for a turn, and legends don't change together", () => {
    expect(sleepyFace(3, 10.1, Z)).toBe(sleepyFace(3, 10.2, Z));
    let differ = 0;
    for (let t = 0; t < 200; t += 1) if ((sleepyFace(1, t, Z) === "😴") !== (sleepyFace(2, t, Z) === "😴")) differ++;
    expect(differ).toBeGreaterThan(10);
  });
});
