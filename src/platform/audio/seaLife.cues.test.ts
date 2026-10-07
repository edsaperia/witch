// The sea life's sounds (Ed, 2026-10-07: dolphins off the east coast, a kraken off the west), cued from art builder 4's
// timetable (rules/seaLife.ts): lying by the east coast she hears the dolphins' splashes, by the west the kraken now and then,
// and inland neither.
import { describe, expect, it } from "vitest";
import { newGame } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { beachOf } from "../../rules/mapShape";
import { SfxCues } from "./sfxCues";
import type { Sfx } from "./sfx";

const heard = (at: "east" | "west" | "inland", secs: number) => {
  const g = newGame(123, TUNING), B = beachOf(g.map.bounds, g.tuning)!, a = at === "east" ? 0 : Math.PI;
  const r = at === "inland" ? 200 : B.edge(a) - 5;
  g.witch = { ...g.witch, x: B.x + Math.cos(a) * r, z: B.z + Math.sin(a) * r, seated: false, mode: "ground", lift: 0, stargazing: true };
  const n = { splash: 0, groan: 0, pour: 0 };
  const sfx = new Proxy({}, { get: (_, k: string) => k === "splash" ? () => n.splash++ : k === "krakenGroan" ? () => n.groan++ : k === "krakenPour" ? () => n.pour++ : () => {} }) as unknown as Sfx;
  const cues = new SfxCues(sfx);
  for (let t = 0; t < secs; t += 0.1) { g.clock.time = t; cues.update(g, t); }
  return n;
};

describe("the sea life's sounds", () => {
  it("by the east coast, the dolphins' splashes, now and then", () => {
    const n = heard("east", 60);
    expect(n.splash).toBeGreaterThanOrEqual(3);
    expect(n.groan).toBe(0);
  });
  it("by the west coast, the kraken's groan and the water pouring off it, rarely", () => {
    const n = heard("west", 600);
    expect(n.groan).toBeGreaterThanOrEqual(1);
    expect(n.pour).toBeGreaterThanOrEqual(n.groan);
    expect(n.splash).toBe(0);
  });
  it("inland, nothing", () => {
    expect(heard("inland", 120)).toEqual({ splash: 0, groan: 0, pour: 0 });
  });
});
