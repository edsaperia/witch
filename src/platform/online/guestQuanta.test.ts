import { expect, it } from "vitest";
import { newGame, STEP, type Controls } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { withGuestInputSteps, holdGuestMotion } from "../../rules/onlineInputSteps";
import { guestInput } from "./guestInput";
import { replayStart, replayGuest, replayHostStep, type ReplayFrame } from "./replay";

it("holds position and momentum on missing quanta and records the same hold in the replica", () => {
  const t = structuredClone(TUNING); t.map!.island = "home"; t.map!.islandAreas = 4;
  const host = newGame(123, t, 2); host.clock.paused = false;
  host.witches.forEach(w => { w.body.seated = false; w.body.perch = false; });
  const replica = replayGuest(replayStart(host, "quanta", 0), "quanta"), buffer = guestInput(250, 0);
  const neutral: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
  let tick = 0;
  const step = () => {
    const consumed = buffer.consume(tick * 16), steps: NonNullable<ReplayFrame["guestSteps"]> = [];
    const frame = withGuestInputSteps(host, () => {
      if (!consumed.motion) holdGuestMotion(host); steps.push(consumed); return consumed.controls;
    }, () => replayHostStep(host, [neutral, neutral], STEP, ++tick));
    frame.guestSteps = steps; frame.guestSequence = buffer.sequence;
    expect(replica.apply(frame)).toBe(true);
  };
  buffer.accept({ sequence: 0, controls: { moveX: 1 } }, 0); step();
  const before = { ...host.witches[1].body }, time = host.witches[1].time;
  expect(before.vx).toBeGreaterThan(0);
  for (let n = 0; n < 8; n++) step();
  expect(host.witches[1].body.x).toBe(before.x); expect(host.witches[1].body.vx).toBe(before.vx);
  expect(host.witches[1].time).toBe(time);
  expect(replica.game.witches[1].body).toEqual(host.witches[1].body);
  buffer.accept({ sequence: 1, controls: { moveX: 1 } }, 200); step();
  expect(host.witches[1].body.x).toBeGreaterThan(before.x);
  expect(replica.game.witches[1].body).toEqual(host.witches[1].body);
});
