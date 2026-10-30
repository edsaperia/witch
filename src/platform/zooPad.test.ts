import { expect, it } from "vitest";
import { newGame, stepGame, STEP } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { zooExitSpot } from "../rules/zoo";
import { padControls } from "./input";

it("Square uses the zoo's in-world exit; Circle is not a parent-side exit action", () => {
  const g = newGame(7, { ...TUNING, map: { ...TUNING.map!, shape: "zoo", island: "", islandAreas: 0, found: ["*"] } });
  g.clock.paused = false;
  const exit = zooExitSpot(g.map)!;
  g.witch = { ...g.witch, x: exit.x + 1, z: exit.z + 1, vx: 0, vz: 0, seated: false, perch: undefined, mode: "ground", lift: 0 };
  const press = (button: number) => padControls(Array.from({ length: 17 }, (_, i) => i === button), [0, 0, 0, 0], [], false, false);
  const circle = press(1);
  expect(circle.sigil).toBe(false);
  const square = press(2);
  expect(square.sigil).toBe(true);
  stepGame(g, square, STEP);
  expect(g.zooExit).toBeDefined();
});
