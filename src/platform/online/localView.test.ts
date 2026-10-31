import { expect, it } from "vitest";
import { newGame } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { localView } from "./localView";

it("presents the assigned guest without swapping authoritative host aliases or camera", () => {
  // Four-area home fixture: enough for two players and a camera target; this tests aliases, not world coverage.
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const source = newGame(123, tuning, 2), camera = { ...source.camera }, host = source.witch;
  source.witches[1].time = 42;
  const presentation = localView(source, 1);
  expect(presentation.game.witch).toBe(source.witches[1].body);
  expect(presentation.game.witches[0].id).toBe(1);
  expect(presentation.game.leash).toBe(source.witches[1].leash);
  expect(presentation.game.herTime).toBe(42);
  source.witches[1].body.x += 100;
  for (let i = 0; i < 60; i++) presentation.update(1 / 30);
  expect(presentation.game.camera.tx).toBeGreaterThan(camera.tx);
  expect(source.camera).toEqual(camera); expect(source.witch).toBe(host);
  expect(source.witches.map(w => w.id)).toEqual([0, 1]);
});
