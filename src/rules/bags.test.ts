// The starting bags (Ed, 2026-10-29: "We should start with a choice of two bags; faster rate of fire but shorter range, and slower
// rate of fire but longer range"; then "Remove none", "You can add 'purse' which has the stats of the 'none' option", and "The 'base'
// bag that comes at the top of the list should have a medium rate of fire, medium range, and a little homing to help beginner
// players. Probably a satchel."; rules/bags.ts, config/wardrobe.json): each hers from the start, each its own 💌 stats, no None.
import { describe, expect, it } from "vitest";
import { BAGS, bagLine, bagOf, bagTuning } from "./bags";
import { ownedOf, wear, itemById, SHELVES } from "./wardrobe";
import { pleasingWitch } from "../ui/looks";
import { newGame, stepGame, STEP, witchTuning, type Controls } from "./game";
import { TUNING, withTuning } from "./tuning";
import { newBot } from "./bot";
import { BAG_ITEMS } from "./finds";

const starter = itemById("satchel")!, quick = itemById("bumbag")!, far = itemById("purse")!;

describe("the starting bags", () => {
  it("are the satchel (the starter, at the top), the Bumbag and the Purse: all hers from the start, no None", () => {
    expect(SHELVES.bag.items.map(i => i.id)).toEqual(["satchel", "bumbag", "purse", "tote", "duffel", "briefcase", "backpack"]); // (the starter, the other starting bags, then the found ones: Ed, 2026-10-29)
    expect(BAGS.length).toBe(7);
    expect(itemById("bag-none")).toBeUndefined();
    const own = ownedOf([], null);
    for (const b of BAGS) expect(own.has(b.id), b.id).toBe(!!b.start);
    expect(BAGS.filter(b => b.start).map(b => b.id)).toEqual(["satchel", "bumbag", "purse"]);
    expect(bagLine("satchel")).toBe("Satchel: steady throws, a little homing");
    expect(bagLine("bumbag")).toBe("Bumbag: faster throws, shorter reach");
    expect(bagLine("purse")).toBe("Purse: slower throws, longer reach");
    expect(bagLine("")).toBe("");
  });

  it("the satchel throws at the base rate and reach with a little more homing; the Bumbag faster and shorter; the purse slower and further", () => {
    const I = TUNING.invites, s = bagTuning(TUNING, "satchel").invites, q = bagTuning(TUNING, "bumbag").invites, f = bagTuning(TUNING, "purse").invites;
    expect([s.cooldown, s.range]).toEqual([I.cooldown, I.range]);
    expect(s.homing).toBeGreaterThan(I.homing); expect(s.homingCone).toBeGreaterThan(I.homingCone);
    expect(q.cooldown).toBeCloseTo(0.418, 3); expect(q.range).toBeCloseTo(25.08, 2); expect(q.homing).toBe(I.homing);
    expect(f.cooldown).toBeCloseTo(0.6985, 3); expect(f.range).toBeCloseTo(42.9, 2);
    expect(bagTuning(TUNING, "")).toBe(TUNING);
    // neither of the quick and far strictly better: the quick one throws more a second, the far one reaches further
    expect(1 / q.cooldown).toBeGreaterThan(1 / f.cooldown);
    expect(f.range).toBeGreaterThan(q.range);
  });

  it("is the bag she wears; with none on, none", () => {
    const g = pleasingWitch(7) as unknown as Record<string, unknown>;
    expect(bagOf(wear(g, starter))).toBe("satchel");
    expect(bagOf(wear(g, quick))).toBe("bumbag");
    expect(bagOf(wear(g, far))).toBe("purse");
    expect(bagOf({ ...g, accessories: { ...(g.accessories as object), satchel: false, bumbag: false, purse: false } })).toBe("");
    expect(bagOf(null)).toBe("");
  });

  it("sets her 💌s in play: the Bumbag's letters fly 25 m and come every 0.42 s, the purse's 43 m every 0.7 s", () => {
    for (const [bag, range, every] of [["bumbag", 25.08, 0.418], ["purse", 42.9, 0.6985]] as const) {
      const g = newGame(5, withTuning({ spells: { ...TUNING.spells, bag } }));
      g.clock.paused = false; g.party.paused = true;
      g.witch = { ...g.witch, seated: false, mode: "ground", lift: 0, vx: 0, vz: 0 }; g.witches[0].health.hp = 1e6;
      const W = g.witches[0];
      expect(W.spells.bag).toBe(bag);
      expect(witchTuning(g, W).invites.range).toBeCloseTo(range, 2);
      const fire: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, fire: true, aimX: 1, aimZ: 0 };
      const shots: number[] = [];
      for (let i = 0; i < 3 / STEP; i++) { const n = W.invites.next; stepGame(g, fire, STEP); if (W.invites.next > n) shots.push(i * STEP); }
      expect(shots.length, bag).toBeGreaterThan(2);
      const gaps = shots.slice(1).map((t, i) => t - shots[i]);
      for (const d of gaps) expect(d, bag).toBeGreaterThanOrEqual(every - STEP - 1e-6);
      expect(Math.min(...gaps), bag).toBeLessThan(every + 2 * STEP);
    }
  });

  it("the starting three aren't found in the forest; the rest are, each its own way to throw (Ed, 2026-10-29)", () => {
    expect([...BAG_ITEMS].sort()).toEqual(["backpack", "briefcase", "duffel", "tote"]);
    const I = TUNING.invites, tote = bagTuning(TUNING, "tote").invites, duffel = bagTuning(TUNING, "duffel").invites, brief = bagTuning(TUNING, "briefcase").invites, pack = bagTuning(TUNING, "backpack").invites;
    expect([tote.multiShot, tote.spread]).toEqual([5 * I.multiShot, 3 * I.spread]); expect(tote.range).toBeLessThan(I.range);
    expect(duffel.burst).toBe(4 * I.burst); expect(duffel.cooldown).toBeGreaterThan(2 * I.cooldown);
    expect(brief.homing).toBe(3 * I.homing); expect(brief.speed).toBeLessThan(I.speed);
    expect(pack.cooldown).toBeLessThan(0.5 * I.cooldown); expect(pack.fireSlow).toBeLessThan(I.fireSlow!);
    // a bag at a time: the backpack is one of them now, not worn as well
    for (const b of BAGS) expect(bagOf(wear(wear(pleasingWitch(3) as never, itemById("backpack")!), b)), b.id).toBe(b.id);
  });

  it("every bot carries one, the same every game: the careful ones the Purse, the others the satchel", () => {
    for (const seed of [1, 2]) {
      const g = newGame(seed, TUNING); newBot("skilled").decide(g);
      expect(g.witches[0].spells.bag).toBe("purse");
    }
    const n = newGame(3, TUNING); newBot("novice").decide(n);
    expect(n.witches[0].spells.bag).toBe("satchel");
    const g = newGame(3, TUNING); newBot("skilled", { bag: "bumbag" }).decide(g);
    expect(g.witches[0].spells.bag).toBe("bumbag");
  });
});
