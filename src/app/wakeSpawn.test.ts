// Ed, 2026-11-05 (v7569): "I think the witch spawns in the wrong place and is then moved to the bed." A night's game starts her
// seated at her decks; the first load's wake-up (main.ts wakeFirst) put her beside her bed with the camera settled there, then into
// the bed, so the camera eased 2.5 m after her as the loading screen faded; and the view's seat ease (render/view/witch.ts View.seatK)
// drew her at the decks' seat, out over the forest, sliding into bed over a second. Now: tucked in before the start's made (as the
// bed's next night and a sail's landing are), drawn there from the first frame, and nothing moves as the wake-up starts.
import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { newGame as fullGame, poseOf } from "../rules/game";
import { smallWorld } from "../test/worlds";
import { TUNING } from "../rules/tuning";
import { startWake, tuckIn } from "../rules/wakeUp";
import { wakeInBedroom } from "../rules/opening";
import { seatShare } from "../render/view/witch";
const newGame = smallWorld(fullGame, "The first morning's wake-up: only the treehouse matters.");

it("the first load wakes her where she was tucked in: in bed from the first frame, the camera already on her, nothing moving", () => {
  const g = newGame(7569, TUNING), W = g.witches[0];
  expect(W.body.seated).toBe(true); // (a night's game starts her at her decks)
  // main.ts boot, before view.prepare: in her bed, the camera settled on her there
  expect(tuckIn(g)).toBe(true);
  const bed = { x: W.body.x, z: W.body.z }, pose0 = poseOf(g);
  expect(W.body.seated).toBe(false);
  // the first frame drawn after that (and so the first after prepare): no share of the decks' seat, however long she sat there
  expect(seatShare(!!W.body.seated, true, 1, 0)).toBe(0);
  // main.ts wakeFirst, under the loading screen's white: the wake-up starts where she lies, the camera where it was
  expect(tuckIn(g) && startWake(g, g.herTime, { mirrored: false })).toBe(true);
  expect({ x: W.body.x, z: W.body.z }).toEqual(bed);
  expect(poseOf(g)).toEqual(pose0);
  expect(g.wake?.beat).toBe("alarm");
  expect(seatShare(!!W.body.seated, true, 1, 0.1)).toBe(0);
});

it("the old wake-up order (beside the bed, then into it) moved the camera after her: the move the fade showed", () => {
  const g = newGame(7569, TUNING);
  expect(wakeInBedroom(g)).toBe(true);
  const pose0 = poseOf(g);
  expect(startWake(g, g.herTime, { mirrored: false })).toBe(true);
  const pose = poseOf(g);
  // (the camera's aim still beside the bed, she in it: the camera eases across as the game runs)
  expect(Math.hypot(pose.tx - g.witch.x, pose.tz - g.witch.z)).toBeGreaterThan(1);
  expect(pose).toEqual(pose0);
});

it("the seat ease: 1 seated, easing off over a second as she takes off, none in her bed", () => {
  expect(seatShare(true, false, 0, 0.1)).toBe(1);
  expect(seatShare(false, false, 1, 0.1)).toBeCloseTo(0.9);
  expect(seatShare(false, false, 0.05, 0.1)).toBe(0);
  expect(seatShare(false, true, 1, 0)).toBe(0);
});

it("main.ts tucks her in before the start is made, and wakes her where she was tucked in", () => {
  const main = readFileSync("src/main.ts", "utf8").replace(/\r\n/g, "\n");
  const boot = main.indexOf("if (night.arrival) bedFirst(night);"), prepare = main.indexOf("await view.prepare();", boot);
  expect(boot).toBeGreaterThan(0);
  expect(main.slice(boot, prepare)).toMatch(/else if \(inBedroom\) view\.asleepInBed = mutate\("wake: first bed", \(\) => tuckIn\(night\.game\)\)/);
  const wake = main.slice(main.indexOf("function wakeFirstNow(): void {"));
  expect(wake.slice(0, wake.indexOf("\n}\n"))).toMatch(/if \(!tuckIn\(n\.game\) \|\| !startWake\(/);
});
