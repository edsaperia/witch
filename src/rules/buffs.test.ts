// Follower buffs (Ed, 2026-11-03; rules/buffs.ts, tuning buffs): one buff a group (by each kind's retreat), its stack count the
// distinct leashed adult kinds of that group with berry pips; a leashed legend three, no berries, counted once with an adult of its
// kind; pips drain one at a time and gate the buff; each group's effect; the Heavies' shots round her at 1, 2 and 3 stacks.
import { describe, expect, it } from "vitest";
import { TUNING, withTuning } from "./tuning";
import { addPip, buffsOf, dashBuff, drainPips, groupOf, heavyWays, invitesBuffed, noBuffs, pipCount, pipFading, pipFuel, setBuffs, speedBuff, speedMultiplierBuffed, stepInvitesBuffed, wantsPip, type BuffStacks } from "./buffs";
import { canEat, feed, type BerryState } from "./berries";
import { bagTuning } from "./bags";
import { newInvites, type Affection } from "./invites";
import { newSpells } from "./spells";
import { blinkCharges, newGame as fullGame, stepGame, STEP, type Controls } from "./game";
import { smallWorld } from "../test/worlds";
import type { Creature } from "./creatures";
const newGame = smallWorld(fullGame, "Follower buffs check one witch with a few creatures on her stack.");

const B = TUNING.buffs!, LIFE = B.pips.life;
const crit = (id: number, species: string, level: number, extra: Partial<Creature> = {}) => ({ id, x: 0, z: 0, species, level, leashed: true, gone: false, ...extra }) as unknown as Creature;
const fed = (ids: number[], pips = 1): Pick<BerryState, "pips"> => ({ pips: new Map(ids.map(id => [id, pips * LIFE])) });
const stacks = (over: Partial<BuffStacks>): BuffStacks => ({ ...noBuffs(), ...over });

describe("groups, by retreat", () => {
  it("each kind's group comes from its creature.js retreat and the table", () => {
    const want: Record<string, string> = {
      cat: "climbers", owl: "climbers", moth: "climbers", griffin: "climbers",
      bat: "darters", ibex: "darters", toad: "darters",
      lynx: "stalkers", frostwyrm: "stalkers",
      bear: "heavies", badger: "heavies", hydra: "heavies", sphinx: "heavies", frosttroll: "heavies", stegosaurus: "heavies",
      wolf: "packHunters", fox: "packHunters", cheetah: "packHunters", unicorn: "packHunters",
      hedgehog: "shells", beetle: "shells", snail: "shells", mole: "shells", otter: "shells",
    };
    for (const [k, g] of Object.entries(want)) expect(groupOf(k, TUNING), k).toBe(g);
  });
  it("the table is a knob", () => {
    const t = withTuning({ buffs: { ...B, groups: { ...B.groups, climbers: [], darters: [...B.groups.darters, "trees"] } } });
    expect(groupOf("cat", t)).toBe("darters");
  });
});

describe("stacking", () => {
  it("one stack a distinct kind: two of a kind count once, two kinds of a group twice", () => {
    const cs = [crit(0, "wolf", 2), crit(1, "wolf", 2), crit(2, "fox", 2), crit(3, "bear", 2)];
    expect(buffsOf([0, 1], cs, fed([0, 1]), TUNING).stacks).toEqual(stacks({ packHunters: 1 }));
    expect(buffsOf([0, 1, 2, 3], cs, fed([0, 1, 2, 3]), TUNING).stacks).toEqual(stacks({ packHunters: 2, heavies: 1 }));
  });
  it("a legend gives three, needs no berries, and with an adult of its kind still counts once", () => {
    const cs = [crit(0, "wolf", 3, { partyLegend: true }), crit(1, "wolf", 2), crit(2, "fox", 2)];
    expect(buffsOf([0], cs, fed([]), TUNING).stacks.packHunters).toBe(3);
    expect(buffsOf([0, 1], cs, fed([1]), TUNING).stacks.packHunters).toBe(3);
    expect(buffsOf([0, 1, 2], cs, fed([1, 2]), TUNING).stacks.packHunters).toBe(4);
  });
  it("only adults and legends on her leash: youths, babies, parked ones and the gone give nothing", () => {
    const cs = [crit(0, "wolf", 1), crit(1, "wolf", 0), crit(2, "fox", 2, { gone: true }), crit(3, "bear", 2)];
    expect(buffsOf([0, 1, 2], cs, fed([0, 1, 2]), TUNING).stacks).toEqual(noBuffs());
    expect(buffsOf([], cs, fed([3]), TUNING).stacks).toEqual(noBuffs()); // (the bear parked: not in her stack)
  });
  it("icons: a legend shows three, an adult one, whatever its state", () => {
    const cs = [crit(0, "wolf", 3, { partyLegend: true }), crit(1, "wolf", 2), crit(2, "bear", 2), crit(3, "bear", 2), crit(4, "fox", 2)];
    const b = buffsOf([0, 1, 2, 3, 4], cs, fed([1, 2, 3, 4]), TUNING);
    expect(B.legend).toBe(3);
    expect([0, 1, 2, 3, 4].map(id => b.iconCount.get(id) ?? 0)).toEqual([3, 1, 1, 1, 1]);
    expect([...b.givers.keys()]).toEqual([0, 1, 2, 3, 4]); // (every fed one's chain glows)
  });
  describe("each icon's state (Ed: \"the inactive buff icons are blue. When a buff is inactive, it twinkles in pink\")", () => {
    const states = (cs: Creature[], fedIds: number[], stack = cs.map(c => c.id)) => { const b = buffsOf(stack, cs, { pips: new Map(stack.map(id => [id, fedIds.includes(id) ? LIFE : 0])) }, TUNING); return stack.map(id => b.iconState.get(id)); }; // (the unfed ones' pips run out: none, not the starting one)
    it("two fed bears: the first leashed active, the other blue", () => {
      expect(states([crit(0, "bear", 2), crit(1, "bear", 2)], [0, 1])).toEqual(["active", "redundant"]);
    });
    it("one fed and one starved bear: the fed one active, wherever it is, the starved one pink", () => {
      expect(states([crit(0, "bear", 2), crit(1, "bear", 2)], [1])).toEqual(["unfed", "active"]);
      expect(states([crit(0, "bear", 2), crit(1, "bear", 2)], [0])).toEqual(["active", "unfed"]);
    });
    it("a legend and a fed adult of a kind: the legend active (its three), the adult blue; a second legend blue too", () => {
      expect(states([crit(0, "wolf", 2), crit(1, "wolf", 3)], [0])).toEqual(["redundant", "active"]);
      const two = [crit(0, "wolf", 3), crit(1, "wolf", 3)], b = buffsOf([0, 1], two, fed([]), TUNING);
      expect([b.iconState.get(0), b.iconState.get(1), b.iconCount.get(1)]).toEqual(["active", "redundant", 3]);
      expect(b.stacks.packHunters).toBe(3);
    });
    it("all starved: every one pink, and no buff; legends never starve", () => {
      const cs = [crit(0, "bear", 2), crit(1, "bear", 2)], b = buffsOf([0, 1], cs, { pips: new Map([[0, 0], [1, 0]]) }, TUNING);
      expect([b.iconState.get(0), b.iconState.get(1)]).toEqual(["unfed", "unfed"]);
      expect(b.stacks.heavies).toBe(0);
      expect(states([crit(0, "wolf", 3)], [])).toEqual(["active"]);
    });
    it("the active one starving, the next fed one of its kind takes over", () => {
      const cs = [crit(0, "bear", 2), crit(1, "bear", 2)], s: Pick<BerryState, "pips"> = { pips: new Map([[0, 5], [1, 2 * LIFE]]) };
      expect([0, 1].map(id => buffsOf([0, 1], cs, s, TUNING).iconState.get(id))).toEqual(["active", "redundant"]);
      drainPips(s, [0, 1], cs, 6, TUNING);
      expect([0, 1].map(id => buffsOf([0, 1], cs, s, TUNING).iconState.get(id))).toEqual(["unfed", "active"]);
    });
    it("youths and babies show none; the colours and the twinkle are knobs", () => {
      const b = buffsOf([0, 1], [crit(0, "bear", 1), crit(1, "bear", 0)], fed([0, 1]), TUNING);
      expect(b.icons.size).toBe(0);
      expect(B.icons).toEqual({ blue: [0.176, 0.431, 1], pink: [0.784, 0.133, 0.549], twinkle: 0.8 });
    });
  });
});

describe("berry pips", () => {
  it("a new adult starts with one pip (Ed, #1722): buffing at once, for its two minutes, then not till it eats", () => {
    const cs = [crit(0, "wolf", 2)], s: Pick<BerryState, "pips"> = {};
    expect(B.pips.start).toBe(1);
    expect(pipCount(pipFuel(s, 0, TUNING), TUNING)).toBe(1);
    expect(buffsOf([0], cs, s, TUNING).stacks.packHunters).toBe(1);
    drainPips(s, [0], cs, LIFE, TUNING);
    expect(buffsOf([0], cs, s, TUNING).stacks.packHunters).toBe(0);
    addPip(s, 0, TUNING);
    expect(buffsOf([0], cs, s, TUNING).stacks.packHunters).toBe(1);
  });
  it("five at most, two minutes each, draining one at a time while it follows her; the last one off, the buff's gone", () => {
    expect([B.pips.max, B.pips.life, B.pips.warn]).toEqual([5, 120, 10]);
    const cs = [crit(0, "wolf", 2)], s: Pick<BerryState, "pips"> = {};
    for (let i = 0; i < 7; i++) addPip(s, 0, TUNING);
    expect(pipCount(pipFuel(s, 0, TUNING), TUNING)).toBe(5);
    drainPips(s, [0], cs, LIFE, TUNING);
    expect(pipCount(pipFuel(s, 0, TUNING), TUNING)).toBe(4);
    drainPips(s, [0], cs, 3.5 * LIFE, TUNING);
    expect(pipCount(pipFuel(s, 0, TUNING), TUNING)).toBe(1);
    expect(buffsOf([0], cs, s, TUNING).stacks.packHunters).toBe(1);
    drainPips(s, [0], cs, LIFE, TUNING);
    expect(pipFuel(s, 0, TUNING)).toBe(0);
    expect(buffsOf([0], cs, s, TUNING).stacks.packHunters).toBe(0);
  });
  it("the draining pip twinkles in its last 10 s", () => {
    expect(pipFading(2 * LIFE, TUNING)).toBe(false);
    expect(pipFading(LIFE + 11, TUNING)).toBe(false);
    expect(pipFading(LIFE + 9, TUNING)).toBe(true);
    expect(pipFading(0, TUNING)).toBe(false);
  });
  it("parked (not in her stack), an adult's pips don't drain", () => {
    const cs = [crit(0, "wolf", 2)], s = fed([0], 2);
    drainPips(s, [], cs, LIFE, TUNING);
    expect(pipFuel(s, 0, TUNING)).toBe(2 * LIFE);
  });
  it("adults feed themselves as youths do: a pip short, it wants a berry, and one eaten is a pip", () => {
    const g = newGame(7, TUNING), c = g.creatures.find(k => !k.boss)!, s = g.berries;
    c.level = 2; c.leashed = true;
    expect(wantsPip(c, s, TUNING)).toBe(true);
    expect(canEat(c, s, TUNING)).toBe(true);
    feed(s, c, 1, TUNING);
    expect(pipCount(pipFuel(s, c.id, TUNING), TUNING)).toBe(2); // (its first, and the berry's)
    for (let i = 0; i < 3; i++) feed(s, c, 1, TUNING);
    expect(canEat(c, s, TUNING)).toBe(false); // (full)
  });
  it("pip count, life and warning are knobs", () => {
    const t = withTuning({ buffs: { ...B, pips: { max: 3, life: 10, warn: 2, start: 3 } } }), s: Pick<BerryState, "pips"> = {};
    expect(pipCount(pipFuel(s, 0, t), t)).toBe(3);
    expect(pipFading(21, t)).toBe(true);
  });
});

describe("each group's buff", () => {
  it("Climbers and fliers: a dash charge a stack", () => {
    expect(dashBuff(stacks({ climbers: 2 }), TUNING)).toBe(2);
    const g = newGame(7, TUNING), W = g.witches[0], base = blinkCharges(g, W), c = g.creatures.find(k => !k.boss && groupOf(k.species, TUNING) === "climbers")!;
    c.level = 2; c.leashed = true; W.leash.stack.push(c.id);
    expect(blinkCharges(g, W)).toBe(base + 1); // (its first pip)
    g.berries.pips = new Map([[c.id, 0]]);
    expect(blinkCharges(g, W)).toBe(base); // (its pips gone)
  });
  it("Darters: faster movement, 20% a stack (Ed, 2026-11-03)", () => {
    expect(speedBuff(stacks({ darters: 2 }), TUNING)).toBeCloseTo(1.4, 9);
    const S = newSpells(TUNING), W = { spells: S, invites: newInvites() };
    setBuffs(W, stacks({ darters: 1 }));
    expect(speedMultiplierBuffed(S, 0, TUNING)).toBeCloseTo(1.2, 9);
  });
  it("Stalkers: invites fly 20% faster and further a stack", () => {
    const I = invitesBuffed(TUNING, stacks({ stalkers: 2 })).invites;
    expect(I.speed).toBeCloseTo(TUNING.invites.speed * 1.4, 9);
    expect(I.range).toBeCloseTo(TUNING.invites.range * 1.4, 9);
  });
  it("Pack hunters: a faster rate of fire with more spread", () => {
    const I = invitesBuffed(TUNING, stacks({ packHunters: 1 })).invites;
    expect(I.cooldown).toBeCloseTo(TUNING.invites.cooldown / 1.1, 9);
    expect(I.inaccuracy).toBeCloseTo((TUNING.invites.inaccuracy ?? 0) + B.packHunters.spread, 9);
  });
  it("Shells, diggers and swimmers: a chain hop a stack, on top of the chaining bag's", () => {
    expect(invitesBuffed(TUNING, stacks({ shells: 2 })).invites.chain).toBe((TUNING.invites.chain ?? 0) + 2);
    const bag = bagTuning(TUNING, "messenger");
    expect(invitesBuffed(bag, stacks({ shells: 1 })).invites.chain).toBe((bag.invites.chain ?? 0) + 1);
    expect(bag.invites.chain).toBeGreaterThan(TUNING.invites.chain ?? 0);
  });
  it("no buffs: her own numbers, the same tuning", () => {
    expect(invitesBuffed(TUNING, noBuffs())).toBe(TUNING);
  });
});

describe("Heavies: shots round her", () => {
  const A: Affection = { invitable: () => false, blocksLetters: () => false, hit: () => {}, affection: () => null };
  /** Her shots over `secs` holding fire aimed east: each new letter's angle (degrees, 0 east, 90 down the screen) and time. */
  function shots(heavies: number, secs: number) {
    const s = newInvites(), W = { spells: newSpells(TUNING), invites: s }, out: { a: number; at: number }[] = [], seen = new Set<number>();
    setBuffs(W, stacks({ heavies }));
    for (let i = 0, time = 0; time < secs; i++, time = i * STEP) {
      stepInvitesBuffed(s, { fire: true, aimX: 1, aimZ: 0 }, { x: 0, z: 0, facing: 1 }, true, [], A, time, STEP, TUNING);
      for (const L of s.letters) if (!seen.has(L.n)) { seen.add(L.n); out.push({ a: ((Math.round((Math.atan2(L.vz, L.vx) * 180) / Math.PI) % 360) + 360) % 360, at: time }); }
    }
    return out;
  }
  const C = TUNING.invites.cooldown;
  it("1 stack: between each shot a second in the opposite direction, at twice the rate", () => {
    expect(heavyWays(stacks({ heavies: 1 }), TUNING)).toBe(2);
    const s = shots(1, C * 2 - 1e-6);
    expect(s.map(q => q.a)).toEqual([0, 180, 0, 180]);
    expect(s[1].at - s[0].at).toBeCloseTo(C / 2, 1);
  });
  it("2 stacks: three at 120° clockwise, at three times the rate", () => {
    const s = shots(2, C * 2 - 1e-6);
    expect(s.map(q => q.a)).toEqual([0, 120, 240, 0, 120, 240]);
    expect(s[1].at - s[0].at).toBeCloseTo(C / 3, 1);
  });
  it("3 stacks: four at 90° clockwise, at four times the rate", () => {
    const s = shots(3, C * 2 - 1e-6);
    expect(s.map(q => q.a)).toEqual([0, 90, 180, 270, 0, 90, 180, 270]);
    expect(s[1].at - s[0].at).toBeCloseTo(C / 4, 1);
  });
  it("let go, the next shot is at her aim again; no Heavies, every shot is", () => {
    const s = newInvites(), W = { spells: newSpells(TUNING), invites: s };
    setBuffs(W, stacks({ heavies: 1 }));
    stepInvitesBuffed(s, { fire: true, aimX: 1, aimZ: 0 }, { x: 0, z: 0, facing: 1 }, true, [], A, 0, STEP, TUNING);
    expect(s.turn).toBe(1);
    stepInvitesBuffed(s, {}, { x: 0, z: 0, facing: 1 }, true, [], A, STEP, STEP, TUNING);
    expect(s.turn).toBeUndefined();
    expect(shots(0, C * 3 - 1e-6).map(q => q.a)).toEqual([0, 0, 0]);
  });
});

describe("in play", () => {
  it("a leashed adult's pips drain on the game's clock, and the buff goes with the last", () => {
    const g = newGame(7, TUNING), W = g.witches[0], c = g.creatures.find(k => !k.boss && groupOf(k.species, TUNING) === "darters")!;
    g.clock.paused = false; g.party.paused = true;
    c.level = 2; c.leashed = true; c.state = "leashed"; W.leash.stack.push(c.id);
    g.berries.pips = new Map([[c.id, 1]]); // (a second left)
    const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
    stepGame(g, idle, STEP);
    expect(buffsOf(W.leash.stack, g.creatures, g.berries, TUNING).stacks.darters).toBe(1);
    for (let i = 0; i < 1.5 / STEP; i++) stepGame(g, idle, STEP);
    expect(pipFuel(g.berries, c.id, TUNING)).toBe(0);
    expect(buffsOf(W.leash.stack, g.creatures, g.berries, TUNING).stacks.darters).toBe(0);
  });
});
