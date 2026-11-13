// The telescope's whole circle ready as she wakes (Ed, 2026-11-12, v7872: "Just after waking, I look through the telescope and I see
// missing trees - I think these should be loaded during the loading screen, or if not, be covered in mist"; 2026-11-13: "fix the
// others"). After prepare's warm (render/view/scenery.ts telescopeWarmSteps), a look in any of 8 directions has, after its first
// frame, no tree chunk in its picture left to make or to list (scopeMissing: the count the scope's mist stands for): the listing is
// finished in the frame it opens or turns in (refresh), reading only its wedge's chunks. On a machine too slow for that (the clock
// here run fast), the listing goes on a slice a frame, the rest under the mist meanwhile, and still ends with nothing missing.
// Headless: the real listing over a real night's forest, with no art (nothing drawn: what's counted is what's listed).
import * as THREE from "three";
import { afterEach, expect, it, vi } from "vitest";
import type { View } from "../view";
import { newGame } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { deckOf } from "../../rules/treehouse";
import { HOUSE_ROOMS, objectWorld } from "../../rules/houseRooms";
import { groundHeight } from "../height";

afterEach(() => vi.restoreAllMocks());

/** What the listing reads of a view, the telescope up at the crow's nest: no art (every kind's art missing), nothing drawn. */
async function wake() {
  vi.resetModules(); // (the real scenery module: scenery.test.ts mocks its neighbours, and test files share module state)
  const S = await import("./scenery");
  const g = newGame(81808, TUNING), T = TUNING.telescope!, d = deckOf(g.map, TUNING)!;
  // (she stands a step off the telescope; its view is from over the deck's middle: render/view/camera.ts placeTelescope)
  const o = HOUSE_ROOMS.objects.find(o => o.use.kind === "telescope")!, at = objectWorld(o, d);
  g.witch.x = at.x + 2; g.witch.z = at.z - 2; g.witch.vx = 0; g.witch.vz = 0;
  const none = () => null, maps = () => new Map();
  const v = {
    game: g, quick: false, telescope: null as View["telescope"], width: 1280, height: 800, mpp: 0.1, canopyNow: T.reach, camStep: 0, bendTo: T.bend,
    camera: Object.assign(new THREE.PerspectiveCamera(T.fovWide, 1.6, 1, 2000), {}), v3: new THREE.Vector3(),
    lastBuild: { x: 0, y: 0, z: 0, radius: 0, version: 0 }, lastPose: {}, budget: { fps: 60, radius: 100 },
    assets: new Proxy({ version: 1 } as Record<string, unknown>, { get: (o, k: string) => (k in o ? o[k] : none) }),
    typeBatches: maps(), decorBatches: maps(), trunkShadowBatches: maps(), typeUsed: maps(), batchFor: none, stats: {}, appearing: new Set(), pops: [], kindNames: [], kindIds: maps(),
    tracks: { placed: { now: maps(), before: maps(), nowAt: [], beforeAt: [] }, moving: { now: maps(), before: maps(), nowAt: [], beforeAt: [] } },
    scene: { add: none, remove: none },
  } as unknown as View;
  v.camera.position.set(d.x, groundHeight(d.x, d.z) + T.eye, d.z);
  for (const _ of S.telescopeWarmSteps(v)); // (prepare's part, under the loading screen)
  const look = (heading: number) => { v.telescope = { heading, fov: T.fovWide, pitch: 20 }; };
  return { S, v, g, look };
}

it("has nothing left to make or list after the first frame of a look in any direction", async () => {
  const { S, v, g, look } = await wake();
  // (each look 135° on from the last: turned at once right out of the wedge that one listed)
  const T = TUNING.telescope!, e = v.camera.position, trees = () => g.forest.treeChunks(e.x, e.z, T.reach + 200).filter(k => k.made).length;
  for (const heading of [0, 135, 270, 45, 180, 315, 90, 225]) {
    look(heading);
    expect(S.scopeMissing(v), `before its first frame, ${heading}`).toBeGreaterThan(50); // (the count counts: nothing listed there yet)
    const made = trees();
    S.refresh(v);
    expect(S.scopeMissing(v), `after its first frame, ${heading}`).toBe(0);
    expect(trees(), `tree chunks made by the look, ${heading}`).toBe(made); // (all made under the loading screen)
    expect(S.sceneryListing(v)).toBe(false);
  }
}, 120000);

it("on a slow machine lists on a slice a frame, and still ends with nothing missing", async () => {
  const { S, v, look } = await wake();
  let now = 0;
  vi.spyOn(performance, "now").mockImplementation(() => (now += 1)); // (a clock a millisecond a reading: a frame's allowance gone in no time)
  look(90);
  S.refresh(v);
  expect(S.scopeMissing(v)).toBeGreaterThan(50); // (not done in its first frame: under the mist, render/view/frame.ts scopeMist)
  expect(S.sceneryListing(v)).toBe(true);
  let frames = 1;
  while (S.scopeMissing(v) > 0 && frames < 5000) { S.refresh(v); frames++; }
  expect(S.scopeMissing(v)).toBe(0);
  expect(frames).toBeGreaterThan(2);
}, 120000);
