// Skill in fights and creature commands, the first slice (docs/plans/combat-skill-and-commands.md; config/combat-skill.json; Ed,
// 2026-11-17): profiles merge per level; a letter is still one hit while it wears poise; a sit after attacking; a poise break staggers,
// cancels a wind-up and dazes; berry pips are charges (several a berry, no drain, a full youth's next berry evolves it, a legend's never
// run out); a press spends a charge and starts the creature's own cooldown, aims at a foe, and each verb acts in play.
import { describe, expect, it } from "vitest";
import { TUNING, withTuning } from "../tuning";
import { commandOf, openingsOf, PROFILED } from "../skill/profile";
import { openness, poiseHit, sitAfter } from "../skill/openings";
import { chargeRoom, chargesOf, feedCharges, spendCharge } from "./charges";
import { homeKinds } from "../rosters";
import raw from "../../../config/species-attacks.json";
import { buffsOf, drainPips, groupOf } from "../buffs";
import { newGame as fullGame, stepGame, STEP, type Controls, type Game } from "../game";
import { smallWorld } from "../../test/worlds";
import type { Creature } from "../creatures";
import { feed, feedRoom } from "../berries";

const newGame = smallWorld(fullGame, "Commands check one witch with a creature on her stack and a foe near her.");
const ON = withTuning({ skill: { on: true }, commands: { on: true } });
const crit = (id: number, species: string, level: number, extra: Partial<Creature> = {}) => ({ id, x: 0, z: 0, vx: 0, vz: 0, species, level, leashed: true, gone: false, ...extra }) as unknown as Creature;

describe("profiles", () => {
  it("the first slice is the home island's kinds, each with an attack", () => {
    expect([...PROFILED].sort()).toEqual([...homeKinds()].sort());
    for (const k of PROFILED) expect(k in raw, k).toBe(true);
  });
  it("a level's numbers win over the species', which win over the globals", () => {
    const y = commandOf("dormouse", 1)!, a = commandOf("dormouse", 2)!, L = commandOf("dormouse", 3)!;
    expect([y.max, y.perBerry, y.cooldown]).toEqual([6, 4, 1]);
    expect([a.max, a.perBerry, a.cooldown]).toEqual([16, 6, 0.7]);
    expect(L.max).toBe(16); // (a legend: its adult's, then its own)
    expect(y.reach).toBe(24); // (a global)
    expect(commandOf("dormouse", 0)).toBeNull();
    expect(commandOf("wolf", 2)).toBeNull(); // (not in the slice)
    expect(openingsOf("hare").sit.time).toBe(0.8);
    expect(openingsOf("fox").stagger.time).toBe(1); // (a global)
  });
});

describe("openings (?skill=1)", () => {
  it("off, nothing happens", () => {
    const c = crit(0, "hare", 1, { leashed: false });
    expect(sitAfter(c, false, 10, TUNING)).toBe(false);
    expect(poiseHit(c, 10, 7, TUNING)).toBe(false);
    expect(openness(c, 10, TUNING)).toBe(0);
  });
  it("a wild creature sits its profile's time after attacking; hers never", () => {
    const c = crit(0, "hare", 1, { leashed: false });
    expect(sitAfter(c, false, 10, ON)).toBe(true);
    expect(c.sitUntil).toBeCloseTo(10.8);
    expect(openness(c, 10.5, ON)).toBe(1);
    expect(sitAfter(crit(1, "hare", 1), false, 10, ON)).toBe(false);
  });
  it("letters wear poise; broken, it staggers, its wind-up cancelled, then it's dazed, and can't break again at once", () => {
    const P = openingsOf("fox"), hits = 7, need = Math.ceil(P.poise.share * hits / P.poise.windup); // (in a wind-up each letter wears windup times as much)
    const c = crit(0, "fox", 1, { leashed: false, fight: { target: null, readyAt: 0, windupUntil: 20, aimX: 0, aimZ: 0, spellCast: 3 } });
    let broke = false;
    for (let i = 0; i < need; i++) broke = poiseHit(c, 10 + i * 0.1, hits, ON);
    expect(broke).toBe(true);
    expect(c.fight!.windupUntil).toBe(0);
    expect(c.fight!.spellCast).toBeUndefined();
    const t = 10 + (need - 1) * 0.1;
    expect(c.stunUntil).toBeCloseTo(t + P.stagger.time);
    expect(c.slowUntil).toBeCloseTo(t + P.stagger.time + P.daze.time);
    for (let i = 0; i < 10; i++) expect(poiseHit(c, t + 0.2 + i * 0.05, hits, ON)).toBe(false); // (immune a while)
  });
  it("a letter is still exactly one hit on the meter", async () => {
    const { hit } = await import("../affection");
    const on = crit(0, "fox", 1, { leashed: false }), off = crit(1, "fox", 1, { leashed: false }), hits = [4, 7, 14, 100];
    for (let i = 0; i < 2; i++) { hit({ time: i, leash: () => {}, skill: { on: true }, hits }, on, 1, i); hit({ time: i, leash: () => {}, hits }, off, 1, i); }
    expect(on.fills).toBeDefined();
    expect(on.fills).toEqual(off.fills); // (the same two letters on the meter)
    expect(on.poise!.left).toBeLessThan(1); // (and its poise worn)
  });
});

describe("charges (?commands=1)", () => {
  const berries = () => ({ charges: new Map<number, number>() });
  it("a berry gives its level's perBerry charges up to its max; a youth full evolves on the next", () => {
    const s = berries(), y = crit(0, "fox", 1);
    expect(chargesOf(s, y, ON)).toBe(1); // (start)
    expect(chargeRoom(s, y, ON)).toBe(Math.ceil(5 / 3) + 1);
    expect(feedCharges(s, y, ON)).toBe("charged"); expect(chargesOf(s, y, ON)).toBe(4);
    expect(feedCharges(s, y, ON)).toBe("charged"); expect(chargesOf(s, y, ON)).toBe(6);
    expect(chargeRoom(s, y, ON)).toBe(1);
    expect(feedCharges(s, y, ON)).toBe("evolve");
  });
  it("an adult's bar fills and then has no room; a legend's charges never run out; off, the old rules", () => {
    const s = berries(), a = crit(0, "dormouse", 2), L = crit(1, "fox", 3);
    for (let i = 0; i < 5; i++) feedCharges(s, a, ON);
    expect(chargesOf(s, a, ON)).toBe(16);
    expect(chargeRoom(s, a, ON)).toBe(0);
    expect(chargesOf(s, L, ON)).toBe(Infinity);
    expect(spendCharge(s, L, ON)).toBe(true);
    expect(chargeRoom(s, a, TUNING)).toBeNull();
    expect(feedCharges(s, a, TUNING)).toBeNull();
  });
  it("feeding in the game's berries: charges, then the full youth evolves", () => {
    const g = newGame(7, ON), y = g.creatures.find(k => !k.boss && k.level >= 1)!;
    y.species = "fox"; y.level = 1; y.leashed = true; g.witches[0].leash.stack.push(y.id);
    expect(feedRoom(y, g.berries, ON)).toBe(3);
    feed(g.berries, y, 1, ON); feed(g.berries, y, 2, ON);
    expect(chargesOf(g.berries, y, ON)).toBe(6);
    feed(g.berries, y, 3, ON);
    expect(g.berries.evolving.get(y.id)?.to).toBe(2);
  });
  it("a commanding adult's pips never drain, and it gives no passive buff", () => {
    const cs = [crit(0, "bee", 2)], s = { pips: new Map([[0, 1]]) };
    drainPips(s, [0], cs, 5, ON);
    expect(s.pips.get(0)).toBe(1);
    expect(buffsOf([0], cs, s, ON).stacks.darters).toBe(0);
    expect(buffsOf([0], cs, s, TUNING).stacks.darters).toBe(1);
  });
});

describe("in play (?commands=1)", () => {
  const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
  /** A game with her on foot, one of hers of `species` (level) at the bottom of her stack with `charges`, and a wild foe 10 m east. */
  function setUp(species: string, level = 2, charges = 4): { g: Game; c: Creature; foe: Creature } {
    const g = newGame(7, ON), W = g.witches[0];
    g.clock.paused = false; g.party.paused = true;
    const [c, foe] = g.creatures.filter(k => !k.boss && k.level >= 1);
    Object.assign(c, { species, level, leashed: true, state: "leashed", asleep: false, x: W.body.x + 2, z: W.body.z });
    W.leash.stack.push(c.id);
    Object.assign(foe, { species: species === "wolf" ? "fox" : "wolf", level: 1, leashed: false, state: "wild", asleep: false, napUntil: undefined, x: W.body.x + 10, z: W.body.z });
    g.combat.busy.add(foe.id); // (stepped in the fight wherever its own area is: moved here, it's still indexed by its home area)
    (g.berries.charges ??= new Map()).set(c.id, charges);
    for (const b of g.berries.berries) b.gone = true; // (no berry in reach: the button commands, not eats)
    W.body = { ...W.body, mode: "ground", seated: false, perch: undefined };
    return { g, c, foe };
  }
  /** A press, then a step: the fight's step comes before the button's in a step, so the command acts in the next. */
  const press = (g: Game, aim = { aimX: 1, aimZ: 0 }) => { stepGame(g, { ...idle, command: true, ...aim }, STEP); stepGame(g, idle, STEP); };

  it("a press spends one charge, starts its cooldown, and its shots home on the foe; pressed again too soon, nothing", () => {
    const { g, c, foe } = setUp("fox");
    press(g);
    expect(chargesOf(g.berries, c, ON)).toBe(3);
    expect(g.witches[0].leash.cmd!.ready[c.id]).toBeGreaterThan(g.clock.time);
    const mine = g.combat.shots.filter(s => s.from === c.id);
    expect(mine.length).toBe(4); // (an adult fox: four)
    expect(mine.every(s => s.home === foe.id)).toBe(true);
    press(g);
    expect(chargesOf(g.berries, c, ON)).toBe(3);
  });
  it("no charges, no action", () => {
    const { g, c } = setUp("fox", 2, 0);
    press(g);
    expect(g.combat.shots.some(s => s.from === c.id)).toBe(false);
  });
  it("a Surge buffs her for a while; a Guard's shield stops a blow", () => {
    const { g } = setUp("bee");
    press(g);
    expect(buffsOf(g.witches[0].leash.stack, g.creatures, g.berries, ON, g.witches[0].leash.cmd, g.clock.time).stacks.darters).toBe(3);
    const h = setUp("hedgehog");
    press(h.g);
    const W = h.g.witches[0], hp = W.health.hp;
    expect(W.leash.cmd!.shield?.blows).toBe(2);
    return import("../game").then(({ hitWitch }) => { hitWitch(h.g, 0, h.g.clock.time); expect(W.health.hp).toBe(hp); expect(W.leash.cmd!.shield?.blows).toBe(1); });
  });
  it("a Snare's lob stuns what it lands on; a Guard's barge taunts the foes round her", () => {
    const { g, foe } = setUp("squirrel");
    press(g);
    for (let i = 0; i < 0.8 / STEP; i++) stepGame(g, idle, STEP);
    expect(foe.stunUntil ?? 0).toBeGreaterThan(0);
    const b = setUp("badger");
    b.foe.x = b.g.witches[0].body.x + 6;
    press(b.g);
    expect(b.foe.taunt?.by).toBe(b.c.id);
  });
  it("in the treetops the button does nothing", () => {
    const { g, c } = setUp("fox");
    g.witches[0].body = { ...g.witches[0].body, mode: "treetop" };
    press(g);
    expect(chargesOf(g.berries, c, ON)).toBe(4);
  });
  it("groups still come from the buff table (a bee is a darter)", () => expect(groupOf("bee", TUNING)).toBe("darters"));
});
