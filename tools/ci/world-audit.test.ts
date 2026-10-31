import { expect, it } from "vitest";
// @ts-expect-error plain JavaScript audit tool
import { worldCalls } from "./world-audit.mjs";

it("finds imported constructor aliases and ignores comment/string lookalikes", () => {
  const got = worldCalls('import {newGame as game} from "../game"; // newGame(1,t)\nconst note="generateMap(1,t)"; const g=game(7, tuning);');
  expect(got.calls).toEqual([{ builder: "game", line: 2, seed: "7", tuning: "tuning" }]);
});
it("keeps each small-world factory reason with the calls it supplies", () => {
  const got = worldCalls('import{newGame as fullGame}from"../game";const newGame=smallWorld(fullGame,"Only local cue timing matters.");newGame(123,TUNING);');
  expect(got.reasons).toEqual(["Only local cue timing matters."]);
  expect(got.calls).toHaveLength(1);
});
it("does not treat type-only imports or unrelated methods as world creation", () => {
  expect(worldCalls('import type {newGame} from "../game"; object.newGame(1,t);').calls).toEqual([]);
});
