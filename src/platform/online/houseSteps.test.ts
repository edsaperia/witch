import { expect, it } from "vitest";
import type { Game } from "../../rules/game";
import { houseSteps } from "./houseSteps";
it("preserves intermediate local events once, ignores remote actions and clears on departure", () => {
  const game = { witches: [{}, { wake: { events: ["booth"] } }], leashEvents: [
    { kind: "house", id: 0, obj: "telephone" }, { kind: "house", id: 1, obj: "wardrobe" }, { kind: "found", id: 1 },
  ] } as unknown as Game;
  const steps = houseSteps(); steps.capture(game, 1, 10); steps.capture(game, 1, 10);
  game.leashEvents = [{ kind: "chart", id: 1, x: 0, z: 0, at: 0 }]; game.witches[1].wake!.events = ["dressed"];
  steps.capture(game, 1, 11); const events = steps.take();
  expect(events.leash.map(e => e.kind === "house" ? e.obj : e.kind)).toEqual(["wardrobe", "chart"]);
  expect(events.wake).toEqual(["booth", "dressed"]); expect(steps.take()).toEqual({ leash: [], wake: [] });
  steps.capture(game, 1, 11); expect(steps.take().wake).toEqual([]);
  steps.clear(); steps.capture(game, 1, 0); expect(steps.take().wake).toEqual(["dressed"]);
});
it("bounds pending events but permits empty received steps while drawing is suspended", () => {
  const game = { witches: [{}, { wake: { events: [] } }], leashEvents: [] } as unknown as Game, steps = houseSteps();
  for (let tick = 0; tick < 150; tick++) steps.capture(game, 1, tick);
  game.witches[1].wake!.events = Array(129).fill("booth");
  expect(() => steps.capture(game, 1, 150)).toThrow("Online house events were not consumed.");
});
