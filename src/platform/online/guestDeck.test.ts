import { expect, it, vi } from "vitest";
import { newGame, newWitchPlayer, stepGame } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { deckOf } from "../../rules/treehouse";
import { startWakeFor } from "../../rules/wakeUp";
import { snapshotGame } from "../../rules/nightSnapshot";
import { guestDeck } from "./guestDeck";
const tuning = () => { const t = structuredClone(TUNING); t.map!.island = "home"; t.map!.islandAreas = 4; return t; };
it("preserves solo/host/default deck identity and copies only the assigned guest floor", () => {
  const game = newGame(123, tuning()), deck = deckOf(game.map, game.tuning)!, floor = deck.house!.rooms!;
  const alternate = { ...floor, inset: floor.inset + .1 }, access = { roomAccessFor: vi.fn(() => alternate) };
  expect(guestDeck(deck, game, game.witches[0], access)).toBe(deck); expect(access.roomAccessFor).not.toHaveBeenCalled();
  const guest = newWitchPlayer(1, 0, 0, game.tuning); game.witches.push(guest);
  expect(guestDeck(deck, game, game.witches[0], access)).toBe(deck);
  expect(guestDeck(deck, game, guest, access)).toBe(deck);
  startWakeFor(game, 0, { yesterday: true }, guest, { player: 1, room: "bedroom2" });
  const before = JSON.stringify(deck), view = guestDeck(deck, game, guest, access)!;
  expect(access.roomAccessFor).toHaveBeenLastCalledWith(floor, 1, { player: 1, room: "bedroom2" });
  expect(view).not.toBe(deck); expect(view.house!.rooms).toBe(alternate); expect(JSON.stringify(deck)).toBe(before);
  expect(deck.house!.rooms).toBe(floor); expect(deckOf(game.map, game.tuning)!.house!.rooms!.shape).toBe(floor.shape);
  const assigned = guestDeck(deck, game, guest)!;
  expect(assigned).not.toBe(deck); expect(assigned.house!.rooms!.shape.branches.find(r => r.id === "bedroom2")!.locked).toBe(false);
  expect(floor.shape.branches.find(r => r.id === "bedroom2")!.locked).toBe(true);
});
it("leaves a solo stepGame replay byte-identical after movement adapter reads", () => {
  const a = newGame(456, tuning()), b = newGame(456, tuning()); a.clock.paused = b.clock.paused = false;
  for (let i = 0; i < 12; i++) {
    const controls = { moveX: i < 6 ? .4 : -.3, moveZ: .2, toggleMode: false, zoom: 0 };
    const deck = deckOf(b.map, b.tuning); expect(guestDeck(deck, b, b.witches[0])).toBe(deck);
    stepGame(a, controls, .05); stepGame(b, controls, .05);
  }
  expect(JSON.stringify(snapshotGame(b))).toBe(JSON.stringify(snapshotGame(a)));
});
