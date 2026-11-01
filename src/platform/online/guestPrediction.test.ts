import { expect, it } from "vitest";
import { newGame, newWitchPlayer, type Controls } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { snapshotGame } from "../../rules/nightSnapshot";
import { guestPrediction } from "./guestPrediction";
import { localView } from "./localView";
import { roomAt } from "../../rules/houseRooms";

const input = (moveX: number): Controls => ({ moveX, moveZ: 0, toggleMode: false, zoom: 0 });
function fixture() {
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const game = newGame(123, tuning); game.witches.push(newWitchPlayer(1, game.witch.x + 30, game.witch.z + 30, tuning));
  game.clock.paused = false; game.witches[1].body.seated = false; game.witches[1].body.perch = false;
  return game;
}
it("shows immediate guest input and braking through a private actor without advancing canonical shared state", () => {
  const game = fixture(), original = snapshotGame(game), p = guestPrediction(game, 1);
  const start = p.actor.body.x;
  for (let n = 0; n < 15; n++) p.input(n, input(1), 1 / 60);
  expect(p.actor.body.x).toBeGreaterThan(start);
  const moving = p.actor.body.vx;
  p.input(15, input(0), 1 / 60);
  expect(p.actor.body.vx).toBeLessThan(moving);
  expect(p.actor.body.vx).toBeGreaterThan(0); // Preserve natural braking, not a physical instant stop.
  const facade = localView(game, 1).update(0, 0, p.actor);
  expect(facade.witches.map(w => w.id)).toEqual([1, 0]);
  expect(facade.witch.x).toBe(p.actor.body.x);
  expect(snapshotGame(game)).toEqual(original);
});
it("snaps a host-forced relocation and clears pending locomotion on sleep", () => {
  const game = fixture(), corrections: unknown[] = [], p = guestPrediction(game, 1, c => corrections.push(c));
  p.input(0, input(1), 1 / 60);
  game.witches[1].body.x += 20;
  game.witches[1].house = { slept: true, lastBed: "bedroom2Bed" };
  p.reconcile(0);
  expect(p.pending).toBe(0); expect(p.actor.body.x).toBe(game.witches[1].body.x);
  expect(corrections).toContainEqual(expect.objectContaining({ snapped: true, reason: "authoritative-transition" }));
});
it("does not call ordinary forest movement below a house outline an authoritative room change", () => {
  const game = fixture(), W = game.witches[1], at = game.map.treehouse;
  const candidates: number[] = [];
  for (let n = -1200; n <= 1200; n++) {
    const x = at.x + n * .05;
    if ((roomAt(at, x, at.z)?.id ?? null) !== (roomAt(at, x + .125, at.z)?.id ?? null)) candidates.push(x);
  }
  expect(candidates.length).toBeGreaterThan(0);
  const x = candidates.sort((a, b) => Math.abs(a - at.x) - Math.abs(b - at.x))[0];
  Object.assign(W.body, { x, z: at.z, vx: 7.5, vz: 0, perch: false, seated: false });
  const before = roomAt(at, W.body.x, W.body.z)?.id ?? null;
  const p = guestPrediction(game, 1); p.input(0, input(1), 1 / 60);
  expect(roomAt(at, p.actor.body.x, p.actor.body.z)?.id ?? null).not.toBe(before);
  p.reconcile(-1);
  expect(p.stats.snaps).toBe(0); expect(p.pending).toBe(1);
});
it("treats absent and false perch flags as the same authoritative ground state", () => {
  const game = fixture(), p = guestPrediction(game, 1);
  delete game.witches[1].body.perch;
  p.reconcile(-1); expect(p.stats.snaps).toBe(0);
});
