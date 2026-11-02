import { afterEach, describe, expect, it } from "vitest";
import { lungeAdvance, lungeWarning, lungeWave, type LungePoint } from "./lungeMotion";
import { FIGHT, resetFight } from "./movement";

afterEach(resetFight);
function contains(points: LungePoint[], x: number, z: number): boolean {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const a = points[i], b = points[j];
    if ((a.z > z) !== (b.z > z) && x < (b.x - a.x) * (z - a.z) / (b.z - a.z) + a.x) inside = !inside;
  }
  return inside;
}
describe("lunge reachable warning", () => {
  it("moves one dotted front from the animal to the far edge during preparation", () => {
    const corridor = lungeWarning(20, 20, 90, 1);
    expect(lungeWave(corridor, 0)).toEqual([{ x: 0, z: 0 }]);
    const middle = lungeWave(corridor, 0.5), end = lungeWave(corridor, 1);
    expect(new Set(middle.map(p => p.x)).size).toBe(1);
    expect(middle[0].x).toBeCloseTo(10.5);
    expect(end[0].x).toBeCloseTo(21);
    expect(Math.max(...end.map(p => p.z))).toBeGreaterThan(Math.max(...middle.map(p => p.z)));
    expect(lungeWave(corridor, 2)).toEqual(end);
  });
  it("widens with turning and collapses to a narrow corridor for a straight lunge", () => {
    const width = (turn: number) => Math.max(...lungeWarning(15, 20, turn, 1).map(p => p.z));
    expect(width(0)).toBe(1);
    expect(width(90)).toBeGreaterThan(width(30));
    expect(width(150)).toBeGreaterThan(width(90));
  });
  it("contains actual straight, maximum-turn and changing-course trajectories", () => {
    for (const turn of [0, 35, 90, 150, 360]) for (const initialSpeed of [0, 20, 60]) for (const heavy of [0.5, 1, 2]) {
      FIGHT.momentum = heavy;
      const length = 20, half = 1, points = lungeWarning(length, initialSpeed, turn, half);
      for (const style of [-1, 0, 1, 2]) {
        let x = 0, z = 0, angle = 0, left = length, speed = initialSpeed, step = 0;
        while (left > 1e-6) {
          const travel = lungeAdvance(left, speed, 1 / 60);
          angle += turn * Math.PI / 180 / 60 / heavy * (style === 2 ? Math.sin(step++ * 0.7) : style);
          x += Math.cos(angle) * travel.step; z += Math.sin(angle) * travel.step;
          expect(contains(points, x, z)).toBe(true);
          left -= travel.step; speed = travel.speed;
        }
      }
    }
  });
});
