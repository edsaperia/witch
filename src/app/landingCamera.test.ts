// A sail's landing in her bedroom (app/arrive.ts, render/view/camera.ts; the coordinator's brief, 2026-11-03): the dive's last frame
// and the game's first have the same camera. The dive aimed at her place in the rules over the ground there; the game's camera aims
// over the ground its ride reads (under the house, its middle's) and, in a room off the house's hub, where she's drawn (houseCam:
// tens of metres away), so it jumped as it landed; the last frame the dive drew was a step short of its end shot; and the wake-up
// moved her from beside her bed into it as it started, the camera following her across the room. (Headless: the View a stand-in
// round its own landingShot.)
import { afterEach, expect, it, vi } from "vitest";
import { ArrivalFlight } from "./arrive";
import type { Arrival } from "./arrival";
import { View } from "../render/view";
import { gameAim, rideCamera, ridePoint } from "../render/view/camera";
import { Ride } from "../render/ride";
import { groundHeight } from "../render/height";
import { newGame as fullGame, poseOf } from "../rules/game";
import { smallWorld } from "../test/worlds";
import { TUNING } from "../rules/tuning";
import { startWake, tuckIn } from "../rules/wakeUp";
import type { Shot } from "../rules/arrive";
const newGame = smallWorld(fullGame, "A sail's landing in the house: only the treehouse and the dive's path matter.");

afterEach(() => { vi.unstubAllGlobals(); });

it("the dive lands on the game's own camera: its last frame and the game's first share their aim, distance, angle and field of view, and nothing moves as the wake-up starts", () => {
  vi.stubGlobal("document", { getElementById: () => null });
  vi.stubGlobal("innerWidth", 960); vi.stubGlobal("innerHeight", 540);
  const g = newGame(456, TUNING), W = g.witches[0];
  g.party.spellAt = null;
  expect(tuckIn(g)).toBe(true); // (main.ts bedFirst: in her bed before the dive)
  // (the view as the dive leaves it: in the house, she drawn far from her place in the rules, as in the capture: 78 m south)
  const v = Object.assign(Object.create(View.prototype) as View, { game: g, fly: null as Shot | null, homeDone: true, limitedLandingReady: () => false, houseCam: { x: 0.4, y: -1.5, z: 78 }, herOffset: { on: true, x: 0, y: 0, z: 0 } });
  Object.defineProperty(v, "lookDrawn", { value: true });
  const f = new ArrivalFlight({ v: 1, island: "fox", world: 0, at: 0, still: "", cam: { x: 0, z: 700, height: 260, pitch: 0.45, fov: 40, speed: 60 } } as unknown as Arrival, TUNING.arrive!, null);
  f.begin(g, true);
  let last: Shot | null = null, now = 0, frames = 0;
  while (!f.frame(v, g, (now += 50))) { last = { ...v.fly! }; if (++frames > 20000) throw Error("never landed"); }
  expect(v.fly).toBeNull(); // (landed: the game's camera from this frame)
  const before = { ...W.body }, pose0 = poseOf(g);
  expect(startWake(g, g.herTime, { yesterday: true })).toBe(true); // (the landing: main.ts wakeArrival)
  expect([W.body.x, W.body.z]).toEqual([before.x, before.z]); // (already in bed: she isn't moved)
  const pose = poseOf(g);
  expect(pose).toEqual(pose0);
  // the game's first frame (render/view/camera.ts placeCamera): her pose's aim, over the ride's ground (she's lying still), moved
  // to where she's drawn
  // (its ride as the dive left it: drawn with the night's clock still, the first ground it read under the house before the island's
  // heights were in; the capture's first frame after landing aimed 8.6 m low, the ride still that ground)
  const R = ridePoint(v, pose), ride = new Ride(), full = g.tuning.groundSpeed, still = { vx: 0, vz: 0 };
  rideCamera(ride, true, 0, R, still, full, () => -9, g.tuning.witch); // (a dive frame: the heights not in yet)
  rideCamera(ride, true, 0, R, still, full, groundHeight, g.tuning.witch); // (the dive's last frames)
  rideCamera(ride, false, 0, R, still, full, groundHeight, g.tuning.witch); // (the game's first frame: the same instant)
  const aim = gameAim(pose, ride.h, v.houseCam), eps = 1e-6;
  expect(Math.abs(last!.tx - aim.x)).toBeLessThan(eps);
  expect(Math.abs(last!.ty - aim.y)).toBeLessThan(eps);
  expect(Math.abs(last!.tz - aim.z)).toBeLessThan(eps);
  expect(Math.abs(last!.distance - pose.distance)).toBeLessThan(eps); // (the zoom)
  expect(Math.abs(last!.angle - pose.angle)).toBeLessThan(eps);
  expect(Math.abs(last!.fov - g.tuning.camera.fov)).toBeLessThan(eps);
  expect(last!.bend ?? 0).toBe(0); // (the dive's own bend relaxed to none: the night's own)
});
