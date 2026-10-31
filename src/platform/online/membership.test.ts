import { expect, it } from "vitest";
import { newGame, newWitchPlayer } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { attachGuest, detachGuest } from "./membership";
import { bedside } from "../../rules/opening";

it("joins a running night in the approved bedroom without resetting world or host", () => {
  // Four-area home fixture: enough for bedroom joins and two creatures, independent of distant area count.
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const game = newGame(123, tuning), host = game.witches[0], body = host.body;
  game.herTime = 123; game.clock.time = 100; game.pending = { dash: true };
  const party = game.party, guest = newWitchPlayer(1, 0, 0, tuning);
  attachGuest(game, guest);
  expect(game.witches.map(w => w.id)).toEqual([0, 1]);
  expect(game.witch).toBe(body); expect(game.party).toBe(party); expect(game.clock.time).toBe(100);
  expect(host.pending).toEqual({ dash: true }); expect(host.time).toBe(123);
  expect(guest.wake?.beat).toBe("alarm");
  const bed = bedside(game)!;
  expect(Math.hypot(guest.body.x - bed.x, guest.body.z - bed.z)).toBeLessThan(6);
  expect(guest.time).toBe(123); expect(guest.paused).toBe(false);
  expect(() => attachGuest(game, newWitchPlayer(1, 0, 0, tuning))).toThrow();
  const c = game.creatures.find(c => !c.boss)!;
  guest.leash.stack.push(c.id); c.leashed = true;
  guest.leash.placed.push({ id: game.creatures.find(q => q !== c && !q.boss)!.id, x: 10, z: 20, at: 100 });
  detachGuest(game);
  expect(game.witches).toHaveLength(1); expect(game.witch).toBe(body);
  expect(c.leashed).toBe(false); expect(c.state).toBe("happy");
  expect(game.loose).toContainEqual({ id: c.id, x: c.x, z: c.z, at: 100 });
  expect(host.leash.placed).toContainEqual(guest.leash.placed[0]);
  expect(host.time).toBeUndefined(); expect(game.pending).toEqual({ dash: true });
  detachGuest(game); expect(game.loose.filter(p => p.id === c.id)).toHaveLength(1);
});
