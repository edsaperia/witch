// The telescope's forest made under the loading screen (Ed, 2026-11-12, v7872: "Just after waking, I look through the telescope and
// I see missing trees - I think these should be loaded during the loading screen"): render/view/scenery.ts telescopeWarmSteps, run
// by prepare (render/view/lifecycle.ts) while the art workers draw the island. After it, the telescope's first look round from where
// she stands at it makes no chunk of trees (making them, about 2.7 s of the page's thread, was its far forest's hole), and the
// forest keeps them all through the house's own listings and the next look (rules/forest.ts Forest.KEEP: at 2,500 a look made 1,400
// of them again). Headless: no View, only what the warm reads.
import { expect, it, vi } from "vitest";
import type { View } from "../view";
import { Forest } from "../../rules/forest";
import { generateMap } from "../../rules/map";
import { TUNING } from "../../rules/tuning";
import { deckOf } from "../../rules/treehouse";
import { HOUSE_ROOMS, objectWorld } from "../../rules/houseRooms";

it("leaves nothing of the telescope's forest to make on its first look, or its next", async () => {
  vi.resetModules(); // (the real scenery module: scenery.test.ts mocks its neighbours, and test files share module state)
  const { telescopeWarmSteps } = await import("./scenery");
  const map = generateMap(763086, TUNING), forest = new Forest(map), T = TUNING.telescope!;
  const v = { game: { map, forest, tuning: TUNING }, quick: false } as unknown as View;
  let steps = 0;
  for (const _ of telescopeWarmSteps(v)) steps++;
  expect(steps).toBeGreaterThan(3000); // (a chunk a step: the page gets its frames between)
  // Where she stands to look (a step off the telescope), and its listing round her: its reach and the view's margin
  // (render/view/scenery.ts rebuild's `round`).
  const o = HOUSE_ROOMS.objects.find(o => o.use.kind === "telescope")!, at = objectWorld(o, deckOf(map, TUNING)!);
  const look = () => { let n = 0; for (const c of forest.treesNearChunks(at.x + 2, at.z - 2, T.reach + TUNING.viewMargin)) n += c.length; return n; };
  forest.buildMs = 0;
  const trees = look();
  expect(trees).toBeGreaterThan(1000);
  expect(forest.buildMs).toBe(0); // (no chunk made: buildMs counts only the making)
  for (const _ of forest.treesNearChunks(at.x, at.z, 200)); // (the house's own view after)
  expect(look()).toBe(trees);
  expect(forest.buildMs).toBe(0);
}, 60000);
