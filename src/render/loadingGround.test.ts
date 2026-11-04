// The loading ground (Ground.loadingFallback: drawn while the ground's own program compiles, by the coast's handover and the sail's
// shader gate) in each area's own floor colour. Ed's "red floor" (v7114, 2026-11-02, seed 690974 at 3028,2833 in the Old pinewood):
// the stand-in painted the first look's floor (hue, saturation, value) straight out as RGB, the moor's (0.95, 0.28, 0.36): a strong
// red over the whole view, while the coast's program linked on his machine.
import { expect, it } from "vitest";
import { LOOKS } from "../rules/map";
import { LOADING_GROUND_FRAG, loadingFloorColours } from "./ground";

const SAT = 1;
/** The textbook HSV to RGB, by sextant (a second way to the same numbers as the shader's hsv()). */
function hsvToRgb(h: number, s: number, v: number): number[] {
  const f = (((h % 1) + 1) % 1) * 6, i = Math.floor(f) % 6, r = f - Math.floor(f), p = v * (1 - s), q = v * (1 - s * r), t = v * (1 - s * (1 - r));
  return [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][i];
}
it("gives every area its floor's colour as RGB, the ground shader's hsv() of its floor", () => {
  const colours = loadingFloorColours(SAT);
  LOOKS.forEach((look, i) => {
    const [h, s, v] = look.floor;
    expect([colours[i].x, colours[i].y, colours[i].z].map(c => +c.toFixed(4)), look.id).toEqual(hsvToRgb(h, s * SAT, v).map(c => +c.toFixed(4)));
  });
});
it("draws the Old pinewood's loading ground pine-needle brown, not red", () => {
  const i = LOOKS.findIndex(l => l.id === "old-pinewood"), c = loadingFloorColours(SAT)[i];
  expect(c.x).toBeGreaterThan(c.y); expect(c.y).toBeGreaterThan(c.z); // (brown: red over green over blue)
  expect(c.x - c.z).toBeLessThan(0.15); // (muted, as its floor's saturation 0.4 at value 0.3 makes it: Ed's was 0.95 red to 0.36 blue)
});
it("reads the loading floor by the area under each spot, never uTypeFloor (HSV) as a colour", () => {
  expect(LOADING_GROUND_FRAG).toMatch(/uLoadingFloor\[int\(area\.r \* 255\.0 \+ 0\.5\)\]/);
  expect(LOADING_GROUND_FRAG).not.toMatch(/uTypeFloor/);
});
