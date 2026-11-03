// The treehouse's landing cooldown in a shared night (Ed, 2026-11-03; rules/witch.ts perchCool): each witch her own, held in the
// game state on game time, so the guest's replay of the host's frames matches it exactly.
import { expect, it } from "vitest";
import { newGame, stepGame, STEP, type Controls } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { snapshotGame } from "../../rules/nightSnapshot";
import { deckOf } from "../../rules/treehouse";
import { fromPlan, HOUSE_ROOMS } from "../../rules/houseRooms";
import { replayGuest, replayHostStep, replayStart } from "./replay";

it("gives the host and the guest each her own treehouse cooldown, and the guest's replay matches the host's", () => {
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const host = newGame(123, tuning, 2), d = deckOf(host.map, tuning)!, COOL = tuning.treehouse.landCooldown!;
  host.clock.paused = false; host.party.spellAt = -100; host.witches.forEach(w => { w.paused = false; });
  const at = (id: string) => { const r = HOUSE_ROOMS.rooms.find(q => q.id === id)!; return fromPlan(d, r.x, r.z); };
  // Both on the Terrace's floor with brooms; the guest (witch 1) just landed, the host not.
  host.witches.forEach((W, i) => { W.kit = { invites: true, broom: true }; W.body = { ...W.body, ...at("terrace"), x: at("terrace").x + (i ? 2 : -2), seated: false, perch: true, mode: "ground", lift: 0, vx: 0, vz: 0 }; });
  const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
  for (let i = 0; i < 3 / STEP; i++) stepGame(host, [idle, idle], STEP); // (the night's first dodge's worth of the shared cooldown over)
  host.witches[1].body.perchCool = 2;
  replayHostStep(host, [idle, idle], STEP, 1);
  const guest = replayGuest(JSON.parse(JSON.stringify(replayStart(host, "test-build", 1))), "test-build");
  let tick = 1;
  const step = (a: Partial<Controls>, b: Partial<Controls>) => { const frame = replayHostStep(host, [{ ...idle, ...a }, { ...idle, ...b }], STEP, ++tick); expect(guest.apply(JSON.parse(JSON.stringify(frame)))).toBe(true); };
  const [H, G] = host.witches;
  // Both press to rise: the host takes off, her cooldown starting; the guest's press is dropped by her own.
  step({ toggleMode: true }, { toggleMode: true });
  expect(H.body.mode).toBe("rising"); expect(H.body.perchCool).toBe(COOL);
  expect([G.body.mode, G.body.perch]).toEqual(["ground", true]); expect(G.body.perchCool).toBeCloseTo(2 - 2 * STEP, 9);
  for (let i = 0; i < Math.round(2 / STEP); i++) step({}, {});
  expect(G.body.perchCool).toBeUndefined(); expect(H.body.perchCool).toBeCloseTo(COOL - 2, 6);
  // The guest's out: she takes off, her own cooldown starting; the host's runs on, untouched.
  step({}, { toggleMode: true });
  expect(G.body.mode).toBe("rising"); expect(G.body.perchCool).toBe(COOL); expect(H.body.perchCool).toBeCloseTo(COOL - 2 - STEP, 6);
  // The host, up and cooling, presses to come down over the Terrace: dropped; the guest likewise a moment later.
  step({ toggleMode: true }, {});
  expect(H.body.mode).toBe("treetop"); expect(H.body.perch).toBeFalsy();
  for (let i = 0; i < 30; i++) step({}, {});
  step({}, { toggleMode: true });
  expect(G.body.mode === "rising" || G.body.mode === "treetop").toBe(true);
  // The host's out first: her press now lands her, while the guest is still held up.
  for (let i = 0; i < Math.round(1 / STEP); i++) step({}, {});
  expect(H.body.perchCool).toBeUndefined(); expect(G.body.perchCool).toBeGreaterThan(0);
  step({ toggleMode: true }, { toggleMode: true });
  expect([H.body.mode, H.body.perch]).toEqual(["descending", true]); expect(G.body.mode).toBe("treetop");
  for (let i = 0; i < Math.round(1 / STEP); i++) step({}, {});
  expect([H.body.mode, H.body.perch, H.body.perchCool! > 0]).toEqual(["ground", true, true]);
  expect(snapshotGame(guest.game)).toEqual(snapshotGame(host));
});
