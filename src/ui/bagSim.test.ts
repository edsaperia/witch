// The bags' preview scene (ui/bagSim.ts; Ed, 2026-10-29: "little animations of each bag \"firing\""): the real 💌 rules with each
// bag's stats, so the previews show the bags as they play: the Quick bag throws most often, the far purse least, every letter gives
// out at its bag's reach, letters land on the creatures, and the loop starts over the same.
import { describe, expect, it } from "vitest";
import { BagSim, SCENE } from "./bagSim";
import { BAGS, bagTuning } from "../rules/bags";
import { TUNING } from "../rules/tuning";

/** Letters thrown and landed in one loop, and the furthest any flew from her. */
function loop(bag: string) {
  const s = new BagSim(bag);
  let thrown = 0, landed = 0, far = 0;
  for (let t = 0; t < SCENE.loop - 0.05; t += SCENE.step) {
    const n = s.inv.next, hits = s.dummies.map(d => d.hitAt);
    s.step(SCENE.step);
    thrown += s.inv.next - n;
    landed += s.dummies.filter((d, i) => d.hitAt !== hits[i]).length;
    for (const L of s.inv.letters) far = Math.max(far, L.flown);
  }
  return { thrown, landed, far, sim: s };
}

describe("a bag's preview", () => {
  it("throws at its bag's rate: the Quick bag most, the far purse least", () => {
    const n = Object.fromEntries(BAGS.map(b => [b.id, loop(b.id).thrown]));
    expect(n.bumbag).toBeGreaterThan(n.satchel);
    expect(n.satchel).toBeGreaterThan(n.purse);
    for (const b of BAGS) { const every = bagTuning(TUNING, b.id).invites.cooldown; expect(n[b.id], b.id).toBeGreaterThanOrEqual(3 * Math.floor((SCENE.loop / 3 - SCENE.wait) / every)); }
  });

  it("gives out at its bag's reach, landing letters on the creatures in reach: the far one only for the far purse", () => {
    for (const b of BAGS) {
      const r = loop(b.id), reach = bagTuning(TUNING, b.id).invites.range;
      expect(r.far, b.id).toBeLessThanOrEqual(reach + 1);
      expect(r.landed, b.id).toBeGreaterThan(0); // (the near one's in every bag's reach)
    }
    const farHit = (bag: string) => { const s = new BagSim(bag); let hit = false; for (let t = 0; t < SCENE.loop - 0.05; t += SCENE.step) { const h = s.dummies[2].hitAt; s.step(SCENE.step); if (s.dummies[2].hitAt !== h) hit = true; } return hit; };
    expect([farHit("bumbag"), farHit("satchel"), farHit("purse")]).toEqual([false, false, true]);
  });

  it("loops: the same bag plays the same loop again", () => {
    const s = new BagSim("satchel"), at = (t: number) => { const out: string[] = []; for (const L of s.inv.letters) out.push(`${L.x.toFixed(2)},${L.z.toFixed(2)}`); return `${t}|${out.join(";")}`; };
    s.step(1.5); const first = at(1);
    s.step(SCENE.loop - 1.5); s.step(1.5);
    expect(at(1)).toBe(first);
  });
});
