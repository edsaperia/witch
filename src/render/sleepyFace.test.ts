import { describe, expect, it } from "vitest";
import { sleepyFace } from "./sleepyFace";

const Z = { face: "😴", weight: 0.8, every: 3.5, faces: ["🥱", "😑", "😌", "🫠", "😮‍💨", "😔", "😪", "☺️"] };
describe("a sleeping legend's sleepy face", () => {
  it("is mostly 😴, now and then each of the others", () => {
    const valid = new Set([Z.face, ...Z.faces]);
    for (let id = 0; id < 40; id++) for (let t = 0; t < 400; t += 3.5) {
      const face = sleepyFace(id, t, Z);
      expect(valid.has(face)).toBe(true);
      expect(sleepyFace(id, t, Z)).toBe(face);
    }
    // Original primary-face share and observed alternative diversity are in art-animation.
  });
  it("holds a face for a turn, and legends don't change together", () => {
    expect(sleepyFace(3, 10.1, Z)).toBe(sleepyFace(3, 10.2, Z));
    // Between-ID dephasing frequency is an informational art-animation observation.
  });
});
