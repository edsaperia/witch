import { expect, it } from "vitest";
import { newGame, stepGame } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { snapshotGame } from "../rules/nightSnapshot";
import { pageFocus } from "./recordingHooks";
import { introFocus } from "./introFocus";
import { localView } from "../platform/online/localView";
it("keeps solo camera/state byte-identical and isolates online renderer focus for both players", () => {
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const original = newGame(123, tuning), solo = newGame(123, tuning), focus = { x: 5, y: 3, z: 7 };
  pageFocus(original, focus); introFocus(solo, solo, focus, false, pageFocus);
  const controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
  stepGame(original, controls, .02); stepGame(solo, controls, .02);
  expect(JSON.stringify(snapshotGame(solo))).toBe(JSON.stringify(snapshotGame(original)));
  const game = newGame(123, tuning, 2), before = JSON.stringify(snapshotGame(game));
  introFocus(game, game, focus, true, pageFocus); expect(game.introFocus).toBeUndefined();
  for (const player of [0, 1]) {
    const local = localView(game, player), shown = local.update(0);
    introFocus(shown, game, focus, true, pageFocus); expect(local.update(.02).introFocus).toEqual(focus);
  }
  expect(JSON.stringify(snapshotGame(game))).toBe(before);
});
