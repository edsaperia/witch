// The two starting bags (Ed, 2026-10-29: "We should start with a choice of two bags; faster rate of fire but shorter range, and slower
// rate of fire but longer range"; rules/bags.ts, config/wardrobe.json): each hers from the start, each its own 💌 stats, neither
// strictly better, worn as she wears it, and the skilled bot carrying the same one every game.
import { describe, expect, it } from "vitest";
import { BAGS, bagLine, bagOf, bagTuning } from "./bags";
import { ownedOf, wear, itemById } from "./wardrobe";
import { pleasingWitch } from "../ui/looks";
import { newGame, stepGame, STEP, witchTuning, type Controls } from "./game";
import { TUNING, withTuning } from "./tuning";
import { newBot } from "./bot";
import { BAG_ITEMS } from "./finds";

const quick = itemById("bumbag")!, far = itemById("satchel")!;

describe("the two starting bags", () => {
  it("are the Quick bag (the bum bag) and the Far bag (the satchel), both hers from the start, each a name and a stat line", () => {
    expect(BAGS.map(b => b.id).sort()).toEqual(["bumbag", "satchel"]);
    expect([quick.name, far.name]).toEqual(["Quick bag", "Far bag"]);
    const own = ownedOf([], null);
    expect(own.has("bumbag") && own.has("satchel")).toBe(true);
    expect(bagLine("bumbag")).toBe("Quick bag: faster throws, shorter reach");
    expect(bagLine("satchel")).toBe("Far bag: slower throws, longer reach");
    expect(bagLine("")).toBe("");
  });

  it("the Quick bag throws faster and shorter, the Far bag slower and further; no bag, the tuning's own", () => {
    const I = TUNING.invites, q = bagTuning(TUNING, "bumbag").invites, f = bagTuning(TUNING, "satchel").invites;
    expect(q.cooldown).toBeCloseTo(0.418, 3); expect(q.range).toBeCloseTo(25.08, 2);
    expect(f.cooldown).toBeCloseTo(0.6985, 3); expect(f.range).toBeCloseTo(42.9, 2);
    expect(q.cooldown).toBeLessThan(I.cooldown); expect(q.range).toBeLessThan(I.range);
    expect(f.cooldown).toBeGreaterThan(I.cooldown); expect(f.range).toBeGreaterThan(I.range);
    expect(bagTuning(TUNING, "")).toBe(TUNING);
    expect(bagTuning(TUNING, "bag-none")).toBe(TUNING);
    // neither strictly better: the quick one throws more a second, the far one reaches further
    expect(1 / q.cooldown).toBeGreaterThan(1 / f.cooldown);
    expect(f.range).toBeGreaterThan(q.range);
  });

  it("is the bag she wears", () => {
    const g = pleasingWitch(7) as unknown as Record<string, unknown>;
    expect(bagOf(wear(g, quick))).toBe("bumbag");
    expect(bagOf(wear(g, far))).toBe("satchel");
    expect(bagOf(wear(g, itemById("bag-none")!))).toBe("");
    expect(bagOf(null)).toBe("");
  });

  it("sets her 💌s in play: the Quick bag's letters fly 25 m and come every 0.42 s, the Far bag's 43 m every 0.7 s", () => {
    for (const [bag, range, every] of [["bumbag", 25.08, 0.418], ["satchel", 42.9, 0.6985]] as const) {
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
      expect(W.invites.letters.every(L => L.range === undefined || Math.abs(L.range - range) < 0.01 || L.home), bag).toBe(true);
    }
  });

  it("are no longer found in the forest (they're hers from the start)", () => {
    expect(BAG_ITEMS).not.toContain("bumbag");
    expect(BAG_ITEMS).toContain("backpack"); // (the backpack still a find)
  });

  it("the skilled bot carries the Far bag every game", () => {
    for (const seed of [1, 2]) {
      const g = newGame(seed, TUNING), bot = newBot("skilled");
      g.clock.paused = false;
      bot.decide(g);
      expect(g.witches[0].spells.bag).toBe("satchel");
    }
    const g = newGame(3, TUNING); newBot("skilled", { bag: "bumbag" }).decide(g);
    expect(g.witches[0].spells.bag).toBe("bumbag");
  });
});
