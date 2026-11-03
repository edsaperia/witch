// Her trail follows the path she really took through her blinks (Ed, 2026-11-03, v7314: "when I dash in a ^ shape, the trail doesn't
// follow that shape"). A blink is a teleport in one rules step, but the view draws her eased between the last two steps
// (rules/game.ts interpolated), so for a frame she's drawn part-way back along the blink's line: the trail must not take that frame's
// place into her path (it folded the trail back over the blink, eating its length, so the first leg of a ^ went missing), nor draw
// its head from there. Both looks: the dotted cooldown trail and the old smooth one.
import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { STEPS_DEFAULT, TRAIL_DEFAULT, WitchTrail, type TrailCounter } from "./trail";

const RED = new THREE.Vector3(1, 0, 0), S = Math.SQRT1_2, DT = 1 / 60;
const counter = (): TrailCounter => ({ left: 2, room: 2, dash: 1, rise: 2, landing: 3, top: 48 });

/** Flies her east, blinks up-right, flies on a moment, blinks down-right, flies on: a ^. Each blink's frame draws her half-way along
 *  its line, as the view's easing between steps does. Returns the blinks' ends. */
function caret(tr: WitchTrail, stepped: boolean) {
  let x = 0, z = 0, t = 0, at = -Infinity, line: { fromX: number; fromZ: number; toX: number; toZ: number; until: number } | null = null;
  const frame = (dx: number, dz: number) => { tr.counter = stepped ? counter() : null; tr.update(dx, 2, dz, 10, 19.25, 0, RED, t, DT, at, line, 1); t += DT; };
  const fly = (n: number) => { for (let i = 0; i < n; i++) { x += 10 * DT; z += 0; frame(x, z); } };
  const blink = (ux: number, uz: number) => {
    const from = { x, z }; x += 15 * ux; z += 15 * uz; at = t; line = { fromX: from.x, fromZ: from.z, toX: x, toZ: z, until: t + 0.05 };
    frame(from.x + (x - from.x) * 0.5, from.z + (z - from.z) * 0.5); // (drawn eased between the steps: half-way along the line)
    return { from, to: { x, z } };
  };
  fly(60);
  const a = blink(S, -S); fly(12);
  const b = blink(S, S); fly(12);
  return { a, b, her: { x, z } };
}
/** The ribbon's centre line, her end first. */
function line(tr: WitchTrail): { x: number; z: number }[] {
  const g = tr.mesh.geometry, n = g.drawRange.count / 6 + 1, p = g.getAttribute("position").array as Float32Array;
  return Array.from({ length: n }, (_, i) => ({ x: p[i * 6], z: p[i * 6 + 2] }));
}
/** How near the polyline comes to a point. */
function near(L: { x: number; z: number }[], q: { x: number; z: number }): number {
  let best = Infinity;
  for (let i = 1; i < L.length; i++) {
    const a = L[i - 1], b = L[i], dx = b.x - a.x, dz = b.z - a.z, l2 = dx * dx + dz * dz, k = l2 > 0 ? Math.max(0, Math.min(1, ((q.x - a.x) * dx + (q.z - a.z) * dz) / l2)) : 0;
    best = Math.min(best, Math.hypot(a.x + dx * k - q.x, a.z + dz * k - q.z));
  }
  return best;
}
const mid = (p: { x: number; z: number }, q: { x: number; z: number }) => ({ x: (p.x + q.x) / 2, z: (p.z + q.z) / 2 });

describe("her trail through a ^ of blinks (Ed, 2026-11-03)", () => {
  for (const stepped of [true, false]) it(`follows both legs and the apex, never folding back (${stepped ? "the dotted cooldown trail" : "the old smooth trail"})`, () => {
    const tr = new WitchTrail({ ...TRAIL_DEFAULT, cooldown: 40, steps: { ...STEPS_DEFAULT, on: stepped } });
    const { a, b, her } = caret(tr, stepped), L = line(tr);
    expect(Math.hypot(L[0].x - her.x, L[0].z - her.z)).toBeLessThan(1); // (from her broom)
    expect(near(L, mid(a.from, a.to))).toBeLessThan(0.5); // (the first leg, up)
    expect(near(L, a.to)).toBeLessThan(0.5); // (its apex)
    expect(near(L, mid(b.from, b.to))).toBeLessThan(0.5); // (the second leg, down)
    // never doubling back on itself: each stretch of the line goes on from the last, not back over it
    for (let i = 2; i < L.length; i++) {
      const ux = L[i - 1].x - L[i - 2].x, uz = L[i - 1].z - L[i - 2].z, vx = L[i].x - L[i - 1].x, vz = L[i].z - L[i - 1].z, lu = Math.hypot(ux, uz), lv = Math.hypot(vx, vz);
      if (lu > 1e-3 && lv > 1e-3) expect((ux * vx + uz * vz) / (lu * lv), `at ${i}`).toBeGreaterThan(-0.5);
    }
  });
  it("draws its head at the landing, not part-way back along the blink, on the blink's own frame", () => {
    const tr = new WitchTrail({ ...TRAIL_DEFAULT, cooldown: 40, steps: { ...STEPS_DEFAULT } });
    for (let i = 0; i < 60; i++) { tr.counter = counter(); tr.update(i * 10 * DT, 2, 0, 10, 19.25, 0, RED, i * DT, DT, -Infinity); }
    tr.counter = counter(); tr.update(10 + 7.5, 2, 0, 10, 19.25, 0, RED, 1, DT, 1, { fromX: 10, fromZ: 0, toX: 25, toZ: 0, until: 1.05 });
    const L = line(tr);
    expect(L[0].x).toBeCloseTo(25, 1);
  });
});
