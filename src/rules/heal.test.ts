// Every heal fires the view's green "+"s (Ed, 2026-10-09: "Whenever a creature is healed they should get the green +s, not just
// from berries"): each path sets healedAt through heal or healBy (rules/creatures.ts).
import { describe, expect, it } from "vitest";
import { heal, healBy, HEAL_TRICKLE_GAP, LEGEND, type Creature } from "./creatures";
import { newGame, type Game } from "./game";
import { TUNING } from "./tuning";
import { feed } from "./berries";
import { befriend } from "./creatureStates";
import { inviteCreature } from "./leash";
import { anger, cheer, lull } from "./legends";
import { startPartyOver } from "./partyOver";
import { creatureMaxHp } from "./combat";

const game = (): Game => newGame(77, TUNING);
const hurt = (g: Game, i: number, patch: Partial<Creature> = {}): Creature => { const c = g.creatures.filter(k => !k.gone)[i]; Object.assign(c, { healedAt: undefined, healedSmall: undefined, ...patch }); c.hp = creatureMaxHp(c) * 0.3; return c; };

describe("every heal shows", () => {
  it("heal: whole again, healedAt set, a full heal; nothing for one already whole", () => {
    const g = game(), c = hurt(g, 0);
    expect(heal(c, 12)).toBe(true);
    expect(c.hp).toBeUndefined(); expect(c.healedAt).toBe(12); expect(c.healedSmall).toBe(false);
    expect(heal(c, 20)).toBe(false); expect(c.healedAt).toBe(12);
  });
  it("a berry", () => {
    const g = game(), c = hurt(g, 1, { leashed: true });
    feed(g.berries, c, 5, TUNING);
    expect(c.healedAt).toBe(5); expect(c.hp).toBeUndefined();
  });
  it("invited (happy)", () => {
    const g = game(), c = hurt(g, 2);
    befriend(c, 6);
    expect(c.healedAt).toBe(6);
  });
  it("leashed", () => {
    const g = game(), c = hurt(g, 3);
    inviteCreature(g.leash, c, c.x, c.z, 7);
    expect(c.healedAt).toBe(7);
  });
  it("a legend turning happy or angry, or back to sleep", () => {
    const g = game(), a = hurt(g, 4, { level: LEGEND }), b = hurt(g, 5, { level: LEGEND }), z = hurt(g, 8, { level: LEGEND });
    cheer(a, 8); anger(b, 9); lull(z, 11);
    expect(a.healedAt).toBe(8); expect(b.healedAt).toBe(9); expect(z.healedAt).toBe(11);
  });
  it("bedtime when the party's over", () => {
    const g = game(), c = hurt(g, 6);
    startPartyOver(g, 10);
    expect(c.healedAt).toBe(10); expect(c.hp).toBeUndefined();
  });
  it("a slow mend (a happy legend's regeneration, game.ts): a small one every HEAL_TRICKLE_GAP, a full one when whole", () => {
    const g = game(), c = hurt(g, 7), max = creatureMaxHp(c), step = 1 / 60, per = (max * 0.05) * step;
    const at: number[] = [];
    for (let t = 0; c.hp !== undefined && t < 60; t += step) { const was = c.healedAt; healBy(c, per, max, t); if (c.healedAt !== was) at.push(c.healedAt!); }
    expect(at.length).toBeGreaterThan(3);
    for (let i = 1; i < at.length - 1; i++) expect(at[i] - at[i - 1]).toBeGreaterThanOrEqual(HEAL_TRICKLE_GAP - 1e-9);
    expect(c.hp).toBeUndefined(); expect(c.healedSmall).toBe(false); // (the last: whole)
  });
});
