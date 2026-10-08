// Her flight trail (render/trail.ts): as long as Ed asked at full speed (5 m on the ground, 20 m over the treetops), shorter
// slower, gone when she stops, fading to nothing at its tail, and in the colour of the area she's over.
import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { TRAIL_DEFAULT, WitchTrail } from "./trail";

/** Flies her east at speed for secs (60 frames a second); returns the trail's length (m) and its vertex data. */
function fly(tr: WitchTrail, speed: number, top: number, lift: number, secs: number, colour = new THREE.Vector3(1, 0, 0), from = 0) {
  let x = from;
  for (let i = 0; i < secs * 60; i++) { x += speed / 60; tr.update(x, 2, 0, speed, top, lift, colour, i / 60, 1 / 60, -Infinity); }
  const g = tr.mesh.geometry, n = g.drawRange.count / 6 + 1, pos = g.getAttribute("position").array as Float32Array, t = g.getAttribute("aT").array as Float32Array, col = g.getAttribute("aCol").array as Float32Array;
  return { x, length: g.drawRange.count ? x - pos[(n - 1) * 2 * 3] : 0, n, t, col };
}

describe("her flight trail", () => {
  it("is 5 m at full speed on the ground and 20 m over the treetops", () => {
    expect(fly(new WitchTrail(), 19.25, 19.25, 0, 3).length).toBeCloseTo(TRAIL_DEFAULT.ground, 0);
    expect(fly(new WitchTrail(), 48, 48, 1, 3).length).toBeCloseTo(TRAIL_DEFAULT.treetops, 0);
  });
  it("is shorter slower, and shrinks to nothing when she stops", () => {
    const half = fly(new WitchTrail(), 10, 19.25, 0, 3).length;
    expect(half).toBeGreaterThan(1); expect(half).toBeLessThan(TRAIL_DEFAULT.ground * 0.6);
    const tr = new WitchTrail(), r = fly(tr, 19.25, 19.25, 0, 3);
    for (let i = 0; i < 240; i++) tr.update(r.x, 2, 0, 0, 19.25, 0, new THREE.Vector3(1, 0, 0), 3 + i / 60, 1 / 60, -Infinity);
    expect(tr.mesh.geometry.drawRange.count).toBe(0);
  });
  it("runs from her (0) to its tail (1)", () => {
    const r = fly(new WitchTrail(), 48, 48, 1, 3);
    expect(r.t[0]).toBe(0);
    expect(r.t[(r.n - 1) * 2]).toBeCloseTo(1, 3);
    for (let i = 1; i < r.n; i++) expect(r.t[i * 2]).toBeGreaterThanOrEqual(r.t[(i - 1) * 2]);
  });
  it("takes the colour of the area she's over, and runs from the new into the old as she crosses", () => {
    const tr = new WitchTrail(), red = new THREE.Vector3(1, 0, 0), blue = new THREE.Vector3(0, 0, 1);
    const a = fly(tr, 48, 48, 1, 3, red);
    expect(a.col[0]).toBeCloseTo(1, 2);
    const b = fly(tr, 48, 48, 1, 0.3, blue, a.x);
    expect(b.col[2]).toBeGreaterThan(0.3); // her end turning blue...
    expect(b.col[(b.n - 1) * 2 * 3]).toBeGreaterThan(0.9); // ...its tail still red
  });
  it("starts again after a blink", () => {
    const tr = new WitchTrail(), r = fly(tr, 48, 48, 1, 2);
    tr.update(r.x + 30, 2, 0, 48, 48, 1, new THREE.Vector3(1, 0, 0), 2, 1 / 60, 1.99);
    const pos = tr.mesh.geometry.getAttribute("position").array as Float32Array, n = tr.mesh.geometry.drawRange.count / 6 + 1;
    expect(r.x + 30 - pos[(n - 1) * 6]).toBeLessThan(1);
  });
});
