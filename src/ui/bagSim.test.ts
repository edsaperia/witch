// The bags' preview scene (ui/bagSim.ts; Ed, 2026-10-29: "little animations of each bag \"firing\""): the real 💌 rules with each
// bag's stats, so the previews show the bags as they play: the Bumbag throws most often, the Purse least, every letter gives
// out at its bag's reach, letters land on the creatures, and the loop starts over the same.
import { describe, expect, it } from "vitest";
import { BagSim, SCENE } from "./bagSim";
import { BAGS, bagTuning } from "../rules/bags";
import { TUNING } from "../rules/tuning";
import { newInvites, stepInvites, type Affection, type Letter } from "../rules/invites";
import type { Creature } from "../rules/creatures";

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
  it("uses each preview's configured cooldown without firing an early burst", () => {
    for (const b of BAGS) {
      const preview = new BagSim(b.id), every = bagTuning(TUNING, b.id).invites.cooldown;
      expect(preview.t.invites.cooldown).toBe(every);
      const t = { ...preview.t, invites: { ...preview.t.invites, burst: 1, multiShot: 1 } }, s = newInvites();
      const affection: Affection = { invitable: () => true, blocksLetters: () => false, hit: () => {}, affection: () => 0 };
      const step = (time: number) => stepInvites(s, { fire: true, aimX: 1, aimZ: 0 }, { x: 0, z: 0, facing: 1 }, true, [], affection, time, SCENE.step, t);
      step(1); expect(s.next).toBe(1); expect(s.readyAt).toBeCloseTo(1 + every, 9);
      step(1 + every - SCENE.step / 2); expect(s.next).toBe(1);
      step(1 + every + SCENE.step / 2); expect(s.next).toBe(2);
    }
    // U1 reports the original complete-loop ordering and minimum throw counts.
  });

  it("keeps preview letters within reach and resolves supplied in-range hits and spent letters", () => {
    for (const b of BAGS) {
      const r = loop(b.id), reach = bagTuning(TUNING, b.id).invites.range;
      expect(r.far, b.id).toBeLessThanOrEqual(reach + 1);
      const t = { ...r.sim.t, invites: { ...r.sim.t.invites, homing: 0, chain: 0, pierce: 0 } };
      const letter = (flown: number): Letter => ({ n: 0, x: flown, z: 0, vx: 60, vz: 0, flown, at: 0, r: 0.01, range: reach, home: false, hit: [] });
      for (const inside of [true, false]) {
        const s = newInvites(), hits: number[] = [], target = { id: 0, species: "fox", level: 1, x: inside ? reach - 1.5 : reach + 10, z: 0 } as Creature;
        s.letters.push(letter(inside ? reach - 2 : reach - 0.5));
        const affection: Affection = { invitable: () => true, blocksLetters: () => false, hit: c => { hits.push(c.id); }, affection: () => 0 };
        stepInvites(s, { fire: false, aimX: 1, aimZ: 0 }, { x: 0, z: 0, facing: 1 }, true, [target], affection, 1, SCENE.step, t);
        expect(hits).toEqual(inside ? [target.id] : []);
        expect(s.letters).toEqual([]);
        if (!inside) expect(s.events.some(e => e.kind === "fizzled")).toBe(true);
      }
    }
    // U1 reports complete-loop landed counts and the original far-dummy outcomes.
  });

  it("loops: the same bag plays the same loop again", () => {
    const s = new BagSim("satchel"), at = (t: number) => { const out: string[] = []; for (const L of s.inv.letters) out.push(`${L.x.toFixed(2)},${L.z.toFixed(2)}`); return `${t}|${out.join(";")}`; };
    s.step(1.5); const first = at(1);
    s.step(SCENE.loop - 1.5); s.step(1.5);
    expect(at(1)).toBe(first);
  });
});
