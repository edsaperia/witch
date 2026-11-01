import { expect, it } from "vitest";
import type { Game } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { visitPreferences } from "./visitPreferences";

it("keeps personal preference edits isolated from host rules and resets on return/redial", () => {
  const game = { tuning: structuredClone(TUNING) } as Game;
  const before = structuredClone(game.tuning);
  const preferences = visitPreferences(tuning => { tuning.music.volume = .2; });
  const local = preferences.tuning(game); local.sfx.volume = .1;
  expect(preferences.tuning(game)).toBe(local);
  expect(local.music.volume).toBe(.2); expect(game.tuning).toEqual(before);
  preferences.clear();
  expect(preferences.tuning(game)).not.toBe(local);
  expect(preferences.tuning(game).sfx.volume).toBe(before.sfx.volume);
  expect(game.tuning).toEqual(before);
});
