// Hostile creatures idle near the runestone (Ed, 2026-10-08: "if you enter a hostile area and the animals are at the very
// opposite end, it can be quite a long time before they reach you, and so it feels like nothing is happening. I think we can
// solve this by having the hostile creatures tend to idle near the runestone"): rules/creatures.ts idlesAtStone.
import { describe, expect, it } from "vitest";
import { newGame } from "./game";
import { TUNING, type Tuning } from "./tuning";
import { cellKey } from "./party";
import { LEGEND, stepCreaturesNear, type Creature } from "./creatures";

const S = TUNING.stoneIdle!;
const wildAreas = (g: ReturnType<typeof newGame>) => {
  const home = cellKey(g.map.centreCell), by = new Map<string, Creature[]>();
  for (const c of g.creatures) { const k = cellKey(c.cell); if (k !== home) by.set(k, [...(by.get(k) ?? []), c]); }
  return [...by];
};
const stoneOf = (g: ReturnType<typeof newGame>, c: Creature) => g.map.soundsystemSpot(c.cell[0], c.cell[1]);
const fromStone = (g: ReturnType<typeof newGame>, c: Creature) => { const s = stoneOf(g, c); return Math.hypot(c.x - s.x, c.z - s.z); };
/** How far from its stone the spot it's heading for (or idling at) is. */
const goalFromStone = (g: ReturnType<typeof newGame>, c: Creature) => { const s = stoneOf(g, c); return Math.hypot(c.tx - s.x, c.tz - s.z); };
const hostile = (c: Creature) => c.level > 0 && c.level !== LEGEND && !c.circle;
/** Roams every creature (her far away, so no watch or hunt) for `secs`, calling `each` after every step. */
function roam(g: ReturnType<typeof newGame>, secs: number, each: () => void) {
  for (let i = 0; i < secs * 10; i++) {
    stepCreaturesNear(g.creatures, 0, 0, 1e9, 0.1, (g.clock.time += 0.1), g.map);
    each();
  }
}

describe("hostile creatures idle near the runestone (Ed, 2026-10-08)", () => {
  it("they start and roam in a loose cluster round it, never on it; babies, legends and the circle's baby as before", () => {
    const g = newGame(123, TUNING);
    let n = 0, out = 0, onStone = 0;
    // where they start, and every spot they pick to go to and idle (or nap) at (they walk across the disc between them)
    for (const [, list] of wildAreas(g)) for (const c of list) if (hostile(c) && fromStone(g, c) > S.radius + 1) out++;
    const check = () => { for (const [, list] of wildAreas(g)) for (const c of list) if (hostile(c)) { n++; const d = goalFromStone(g, c); if (d > S.radius + 1) out++; if (d < S.clear - 1) onStone++; } };
    roam(g, 120, check);
    expect(n).toBeGreaterThan(1000);
    expect(out / n, "outside the cluster (only where the disc leaves its area)").toBeLessThan(0.03);
    expect(onStone / n, "idling on the stone (only one stopped at its area's border as it walked across)").toBeLessThan(0.001);
    // a loose cluster: spread over the disc, not a ring or a pile
    const ds = wildAreas(g).flatMap(([, l]) => l.filter(hostile).map(c => goalFromStone(g, c))).sort((a, b) => a - b);
    expect(ds[Math.floor(ds.length * 0.25)]).toBeLessThan(S.radius * 0.65);
    expect(ds[Math.floor(ds.length * 0.75)]).toBeGreaterThan(S.radius * 0.6);
    // the rest keep the whole area: some babies far from the stone
    const babies = wildAreas(g).flatMap(([, l]) => l.filter(c => c.level === 0 && !c.circle));
    expect(babies.filter(c => goalFromStone(g, c) > S.radius * 1.5).length).toBeGreaterThan(babies.length * 0.3);
  });

  it("a friendly area's creatures, and every creature with stoneIdle off, roam the whole area as before", () => {
    for (const off of [false, true]) {
      const t: Tuning = off ? { ...TUNING, stoneIdle: { ...S, on: false } } : TUNING;
      const g = newGame(123, t);
      const list = g.creatures.filter(c => hostile(c) && cellKey(c.cell) !== cellKey(g.map.centreCell));
      if (!off) for (const c of list) c.friendly = true;
      let far = 0, n = 0;
      roam(g, 60, () => { for (const c of list) { n++; if (goalFromStone(g, c) > S.radius * 1.5) far++; } });
      expect(far / n, off ? "off" : "friendly").toBeGreaterThan(0.3);
    }
  });
});
