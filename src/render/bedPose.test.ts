// Ed's playtest of v7645 (2026-11-07), of her in bed as her alarm rang: "Is this meant to be the witch lying in bed?" She was drawn in
// the decks' seat's sit (her legs hanging from a seat's height down to the floor) and, stretching, the sigil's lift (standing), both
// stood on the floor in the middle of the bed: upright in it. In bed she now sits up on its mattress, her legs out along it.
import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { newGame as fullGame } from "../rules/game";
import { smallWorld } from "../test/worlds";
import { TUNING } from "../rules/tuning";
import { installEdLayout } from "../rules/houseRooms";
import { homeBed, startWake, stepWake, tuckIn, WAKE_DEFAULT } from "../rules/wakeUp";
import { bedLift, inBedPose } from "./bedPose";
import { witchModel, WITCH_FOOT_POSES } from "../../art/witch.js";
import { BED_MATTRESS } from "../../art/furniture.js";
const newGame = smallWorld(fullGame, "Her wake-up in bed: only the treehouse matters.");

type Part = { type: string; group: number; c?: number[]; a?: number[]; b?: number[] };
/** A frame's legs (art/witch.js footModel: groups 4 and 6, hip to knee to foot) as their points' heights, and her hips'. */
function legs(pose: string, frame: number) {
  const parts = ((witchModel as (o: object) => unknown)({ pose, frame, look: { nightie: true, barefoot: true } }) as { parts: Part[] }).parts;
  const ys = parts.filter(p => p.type === "cone" && (p.group === 4 || p.group === 6)).flatMap(p => [p.a![1], p.b![1]]);
  return { hip: Math.max(...ys), low: Math.min(...ys) };
}
const NOW = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };

it("every beat in bed draws her sitting up in it, her legs along the mattress, not hanging to the floor", () => {
  const g = newGame(7645, TUNING);
  expect(tuckIn(g)).toBe(true);
  const seen: string[] = [];
  const look = () => { const pose = inBedPose(g.wake, !g.wake); if (pose) seen.push(pose); return pose; };
  expect(look()).toBe("inBed"); // (tucked in under the loading screen, the wake-up not started: View.asleepInBed)
  expect(startWake(g, 0, { mirrored: false })).toBe(true);
  expect(look()).toBe("inBed"); // the alarm
  stepWake(g, { ...NOW, place: true }, 1, WAKE_DEFAULT); expect(g.wake!.beat).toBe("snooze"); expect(look()).toBe("inBed");
  stepWake(g, { ...NOW, moveX: 1 }, 2, WAKE_DEFAULT); expect(g.wake!.beat).toBe("stretch"); expect(look()).toBe("bedStretch");
  stepWake(g, NOW, 2 + WAKE_DEFAULT.stretch, WAKE_DEFAULT); expect(g.wake!.beat).toBe("up"); expect(look()).toBeNull(); // up: beside the bed, standing
  for (const pose of new Set(seen)) {
    const n = (WITCH_FOOT_POSES as Record<string, { frames: number }>)[pose].frames;
    for (let f = 0; f < n; f++) {
      const L = legs(pose, f);
      expect(L.hip - L.low, `${pose} ${f}: her legs drop from her hips`).toBeLessThan(.06);
      expect(L.low, `${pose} ${f}: she sits on the ground under her (bedLift puts that on the mattress)`).toBeLessThan(.1);
    }
  }
  // (what she was drawn in: the seat's sit hangs her legs some 0.3 down from her hips, and the lift stands her on them)
  expect(legs("sit", 0).hip - legs("sit", 0).low).toBeGreaterThan(.25);
  expect(legs("liftSigil", 2).hip - legs("liftSigil", 2).low).toBeGreaterThan(.3);
});

it("in bed she's drawn up on its mattress, in the bed she's in", () => {
  const g = newGame(7645, TUNING), bed = homeBed()!;
  expect(tuckIn(g) && startWake(g, 0, { mirrored: false })).toBe(true);
  expect(bedLift(g)).toBeGreaterThan(bed.h * BED_MATTRESS);
  expect(bedLift(g)).toBeLessThan(bed.h);
  // the view draws her bed poses there (render/view/witch.ts), a friend's too (platform/online/otherWitches.ts)
  const witch = readFileSync("src/render/view/witch.ts", "utf8");
  expect(witch).toMatch(/bedPose = inBedPose\(wk, v\.asleepInBed\)/);
  expect(witch).toMatch(/\+ \(bedPose \? bedLift\(g\) : 0\)/);
  expect(readFileSync("src/platform/online/otherWitches.ts", "utf8")).toMatch(/inBedPose\(wakeOf\(source, W\), false\)\) y \+= bedLift\(source, W\)/);
  expect(readFileSync("src/render/homeArt.ts", "utf8")).toMatch(/"inBed", "bedStretch"\]/);
});

it("sitting up in her bed she faces its foot (as Ed's layout turns it), her back to her pillows", () => {
  installEdLayout(true);
  try {
    const g = newGame(7645, TUNING), bed = homeBed()!, W = g.witches[0];
    expect(bed.placement).toBeTruthy();
    // the bed's front, its foot, as drawn (render/housePieces.ts: its yaw the placement's rotation, 0 its front to the camera, +z)
    const yaw = bed.placement!.rotation * Math.PI / 180, foot = { x: -Math.sin(yaw), z: Math.cos(yaw) };
    expect(tuckIn(g)).toBe(true);
    expect(W.body.facing).toBe(foot.x < 0 ? -1 : 1);
    expect(startWake(g, 0, { mirrored: false })).toBe(true);
    expect(W.body.facing).toBe(foot.x < 0 ? -1 : 1);
    expect(W.body.facing).toBe(-1); // (Ed's layout: its foot down the screen to the left; she faced right, across it)
  } finally { installEdLayout(false); }
});
