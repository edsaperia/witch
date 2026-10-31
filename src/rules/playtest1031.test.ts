// Ed's clarified 31 Oct playtest rules: invitation and soundsystem joins, independent of art.
import { describe, expect, it } from "vitest";
import type { Creature } from "./creatures";
import { affectionOf, newGame, stepGame, STEP } from "./game";
import { befriend, hasRune, invitableNow, STATES } from "./creatureStates";
import { inviteCreature, newLeash, talkTarget } from "./leash";
import { cellKey, clearArea } from "./party";
import { TUNING, withTuning } from "./tuning";
import { smallWorldTuning } from "../test/worlds";

const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const baby = (circle = false) => ({ id: 0, level: 0, species: "fox", x: 0, z: 0, leashed: false, gone: false,
  ...(circle ? { circle: { x: 0, z: 0, r: 10, legendX: 0, legendZ: -4 } } : {}) }) as Creature;

describe("31 Oct baby invitations", () => {
  it("rejects ordinary and circle babies in every invite mode, with no talk, rune or direct invitation", () => {
    for (const circle of [false, true]) for (const leash of ["pickup", "again", "hold"] as const) {
      const c = baby(circle), data = { ...STATES, leash }, s = newLeash();
      expect(invitableNow(c, data)).toBe(false);
      expect(talkTarget([c], 0, 0, TUNING)).toBeNull();
      inviteCreature(s, c, 0, 0, 0);
      expect(s.stack).toEqual([]);
      befriend(c, 0);
      expect(invitableNow(c, data)).toBe(false);
      expect(hasRune(c, 10, data)).toBe(false);
    }
  });

  it("has no baby meter or letter hit and befriends the circle baby at its area's soundsystem conversion", () => {
    const t = smallWorldTuning(withTuning({ cast: { ...TUNING.cast, on: true } }), "Baby invitation and paired circle conversion need one dealt legend, not world extent.");
    const g = newGame(123, t), c = g.creatures.find(c => c.circle && c.level === 0)!;
    expect(c).toBeDefined();
    g.clock.paused = false; g.party.paused = true;
    g.witch = { ...g.witch, mode: "treetop", lift: 1, seated: false };
    const a = affectionOf(g);
    expect(a.invitable(c)).toBe(false);
    a.hit(c, 1000, 0);
    expect(a.affection(c)).toBeNull();
    expect(c.state).not.toBe("happy");
    const circle = { ...c.circle! };
    clearArea(g.party, g.map, c.cell, g.clock.time);
    stepGame(g, idle, STEP);
    expect(g.party.areas.get(cellKey(c.cell))?.soundsystem).toBeTruthy();
    expect(c.state).toBe("happy");
    expect(c.circle).toEqual(circle);
    expect(hasRune(c)).toBe(false);
    expect(g.loose.some(s => s.id === c.id && s.to === "circle")).toBe(true);
    inviteCreature(g.leash, c, c.x, c.z, g.clock.time, "picked");
    expect(g.leash.stack).toContain(c.id);
  });
});
