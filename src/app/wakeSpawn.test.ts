// Ed, 2026-11-05 (v7569): "I think the witch spawns in the wrong place and is then moved to the bed." A night's game starts her
// seated at her decks; the first load's wake-up (main.ts wakeFirst) put her beside her bed with the camera settled there, then into
// the bed, so the camera eased 2.5 m after her as the loading screen faded; and the view's seat ease (render/view/witch.ts View.seatK)
// drew her at the decks' seat, out over the forest, sliding into bed over a second. Now: tucked in before the start's made (as the
// bed's next night and a sail's landing are), drawn there from the first frame, and nothing moves as the wake-up starts.
import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { interpolated, newGame as fullGame, poseOf } from "../rules/game";
import { smallWorld } from "../test/worlds";
import { TUNING } from "../rules/tuning";
import { fallAsleep, startWake, tuckIn } from "../rules/wakeUp";
import { bedside, wakeInBedroom } from "../rules/opening";
import { footShare, seatShare } from "../render/view/witch";
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

// Ed's "Fix 2" (2026-11-06): the bed's next night. The page draws nothing while the next night is made (main.ts: it isn't ready), so
// the old night's last picture is held under the sleep's veil; it showed her standing beside the bed, the camera there, and the new
// night's first frame (the wake-up's) had her tucked in, the camera 2.3 m across and the house's drawing slid 16 px with her
// (render/view/witch.ts houseShiftOf, by her place): the framing jumped under the veil. Now she falls asleep tucked in, that drawn
// as the veil comes down, so the held picture and the wake-up's first frame are framed alike.
it("the bed's next night: the picture held under the veil is framed as the wake-up's first frame", () => {
  const old = newGame(7569, TUNING), W = old.witches[0];
  expect(tuckIn(old) && startWake(old, old.herTime, { mirrored: false })).toBe(true);
  old.wake!.beat = "up"; old.wake!.open = true; // (the night played: up and about)
  // she's come to the bed's front and held E there, the camera following her (as wakeInBedroom settles it beside the bed)
  expect(wakeInBedroom(old)).toBe(true);
  const side = bedside(old)!;
  expect({ x: W.body.x, z: W.body.z }).toEqual(side);
  old.prev.witches = [{ x: side.x, z: side.z, lift: 0 }]; old.prev.camera = { ...old.camera }; old.alpha = 0.5;
  expect(fallAsleep(old)).toBe(true);
  // drawn now (between the last two steps): in her bed, the camera on her there, nothing part way
  const drawn = interpolated(old, () => ({ x: old.witch.x, z: old.witch.z, pose: poseOf(old) }));
  // the next night, as main.ts nightInPlace makes it: tucked in, then woken (its own game on the same island: the treehouse where it
  // was; the small test world's seed is its island)
  const next = newGame(7569, TUNING);
  expect(tuckIn(next) && startWake(next, next.herTime, { mirrored: false, yesterday: true })).toBe(true);
  expect({ x: drawn.x, z: drawn.z }).toEqual({ x: next.witch.x, z: next.witch.z });
  const a = drawn.pose, b = poseOf(next);
  for (const k of ["tx", "ty", "tz", "distance", "angle"] as const) expect(Math.abs(a[k] - b[k])).toBeLessThan(1e-6);
});

it("main.ts puts her to sleep in her bed, drawn, before the veil comes down", () => {
  const main = readFileSync("src/main.ts", "utf8").replace(/\r\n/g, "\n");
  const night = main.slice(main.indexOf("async function nightInPlace("));
  const asleep = night.indexOf('mutate("wake: asleep in bed", () => fallAsleep(N().game))'), veil = night.indexOf("(wakeCard ??= new WakeCard()).sleep();");
  expect(asleep).toBeGreaterThan(0);
  expect(veil).toBeGreaterThan(asleep);
  expect(night.slice(asleep, veil)).toMatch(/view\.asleepInBed = true; drawFrame\(displayedTime\)/);
});

// Ed, 2026-11-06: the wake-up's first frame drew her in her flying frame for one frame before she sat up in bed (the bed's next night,
// a sail's landing, the first load). A new night starts the view's on-foot share at 0 (View.setGame), and that frame comes with her
// clock still, so it hadn't eased. In bed she's on foot at once; the take-off and landing eases are as they were.
it("the first frame of a night woken in bed draws her on foot (the sit pose), not flying", () => {
  const SIT = 0.6; // (render/view/witch.ts: over this share she takes her foot poses, the sit in bed among them; under it, flying)
  expect(footShare(1, true, 0, 0)).toBeGreaterThan(SIT); // (a new night's view: 0; the first frame: no time gone)
  expect(footShare(1, true, 0, 0)).toBe(1);
  // landing and taking off ease as before
  expect(footShare(1, false, 0, 0)).toBe(0);
  expect(footShare(1, false, 0, 0.05)).toBeCloseTo(0.4);
  expect(footShare(0, false, 1, 0.05)).toBeCloseTo(0.6);
  expect(footShare(1, false, 0.995, 0.01)).toBe(1);
  const witch = readFileSync("src/render/view/witch.ts", "utf8");
  expect(witch).toMatch(/v\.foot = footShare\(wantFoot, !!bedPose, v\.foot, fdt\);/);
  expect(readFileSync("src/render/view.ts", "utf8")).toMatch(/foot: 0,/); // (what a new night's view starts at, View.setGame's nightState)
});
