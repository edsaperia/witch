import { describe, expect, it } from "vitest";
import { newGame, stepGame } from "./game";
import { TUNING } from "./tuning";

describe("hat presses across render frame rates", () => {
  for (const fps of [30, 60, 144]) it(`one press drops the hat once at ${fps} fps, and another picks it up once`, () => {
    const g = newGame(123, { ...TUNING, map: { ...TUNING.map!, islandAreas: 10 } });
    g.clock.paused = false; g.party.spellAt = undefined;
    Object.assign(g.witch, { seated: false, perch: false, mode: "ground", lift: 0 });
    const none = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    const press = () => { for (let frame = 0; frame < Math.ceil(fps / 10); frame++) stepGame(g, { ...none, hat: frame === 0 }, 1 / fps); };
    press();
    expect(g.witches[0].hat.down).toMatchObject({ x: g.witch.x, z: g.witch.z });
    press();
    expect(g.witches[0].hat.down).toBeNull();
  });
});
