// The prepped-game fixture (src/test/preppedGame.ts): each call a new game on its own new map, playing as newGame's does.
import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP, type Controls, type Game } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { prepFor, preppedGame } from "./preppedGame";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
/** JSON of a game's moving state with Maps, Sets and typed arrays spelled out (as rules/mapPrep.test.ts's play). */
const plain = (v: unknown): string => JSON.stringify(v, (_k, x) => (x instanceof Map ? { map: [...x.entries()] } : x instanceof Set ? { set: [...x] } : ArrayBuffer.isView(x) ? { typed: Array.from(x as unknown as ArrayLike<number>) } : typeof x === "function" ? undefined : x));
const played = (g: Game) => {
  g.clock.paused = false;
  for (let i = 0; i < 120; i++) stepGame(g, { ...idle, moveX: 1 }, STEP);
  return plain({ clock: g.clock, witches: g.witches, creatures: g.creatures, party: g.party, combat: g.combat, berries: g.berries, speakers: g.speakers, friendly: g.friendly });
};

describe("a prepped game (test fixture)", () => {
  it("plays as newGame's on the tests' radius map, each call its own map and game, one prep a seed and tuning", () => {
    const a = preppedGame(77, TUNING), b = preppedGame(77, TUNING);
    expect(a.map).not.toBe(b.map);
    expect(a.creatures).not.toBe(b.creatures);
    expect(prepFor(77, TUNING)).toBe(prepFor(77, TUNING));
    expect(prepFor(77, { ...TUNING, cast: { ...TUNING.cast, on: false } })).not.toBe(prepFor(77, TUNING));
    expect(played(a)).toBe(played(newGame(77, TUNING)));
  }, 60000);
});
