import { describe, expect, it } from "vitest";
import { BUFF_KINDS, LEGEND_BUFFS, buffedTuning, newBuffs, noBuffs, stepBuffs, totalsOf } from "./buffs";
import { LEGEND, spawnCreatures } from "./creatures";
import { AREA_TYPES, generateMap } from "./map";
import { newGame, stepGame } from "./game";
import { TUNING } from "./tuning";

const t = TUNING, B = LEGEND_BUFFS;

describe("legend buffs", () => {
  it("every one of the 30 species has one buff, of a known kind, inside its limits", () => {
    const species = new Set(AREA_TYPES.map(a => a.creature));
    expect(species.size).toBe(30);
    for (const s of species) {
      const d = B.species[s];
      expect(d, s).toBeTruthy();
      expect(BUFF_KINDS).toContain(d.kind);
      const [lo, hi] = B.limits[d.kind];
      expect(d.value).toBeGreaterThanOrEqual(lo);
      expect(d.value).toBeLessThanOrEqual(hi);
      expect(d.label.length).toBeGreaterThan(0);
    }
    expect(Object.keys(B.species).every(s => species.has(s))).toBe(true);
  });

  it("stack: one kind's values multiply (forecastAhead adds), held inside the limits", () => {
    const T = totalsOf([B.species.hare, B.species.raven, B.species.owl, B.species.owl]);
    expect(T.flightSpeed).toBeCloseTo(B.species.hare.value * B.species.raven.value);
    expect(T.forecastAhead).toBe(2);
    expect(T.talkTime).toBe(1);
    const many = totalsOf(Array(20).fill(B.species.hare));
    expect(many.flightSpeed).toBe(B.limits.flightSpeed[1]);
    const fewer = totalsOf(Array(20).fill(B.species.fox));
    expect(fewer.talkTime).toBe(B.limits.talkTime[0]);
  });

  it("the buffed tuning changes only the buffed numbers", () => {
    expect(buffedTuning(t, noBuffs())).toEqual({ ...t, leash: { ...t.leash, pace: 1 } });
    const b = buffedTuning(t, totalsOf([B.species.hare, B.species.fox, B.species.bear, B.species.snail]));
    expect(b.groundSpeed).toBeCloseTo(t.groundSpeed * B.species.hare.value);
    expect(b.treetopSpeed).toBeCloseTo(t.treetopSpeed * B.species.hare.value);
    expect(b.invite.talkTime[2]).toBeCloseTo(t.invite.talkTime[2] * B.species.fox.value);
    expect(b.berries.toEvolve[2]).toBe(Math.round(t.berries.toEvolve[2] * B.species.bear.value));
    expect(b.party.interval).toBeCloseTo(t.party.interval * B.species.snail.value);
    expect(b.leash).toEqual({ ...t.leash, pace: 1 });
  });

  it("is on only while a party legend lives: gained when one joins, lost when it goes", () => {
    const map = generateMap(123, t), cs = spawnCreatures(map), s = newBuffs(t), [a, b, wild] = cs;
    Object.assign(a, { leashed: true, level: LEGEND }); Object.assign(b, { leashed: true, level: 2 }); Object.assign(wild, { leashed: false, level: LEGEND });
    stepBuffs(s, cs, [], t);
    expect(s.active).toEqual([]); expect(s.tuning).toBe(t);
    stepBuffs(s, cs, [a.id, b.id, wild.id], t);
    expect(s.active.map(x => x.id)).toEqual([a.id]); // not the adult, not the wild legend
    expect(s.events).toEqual([{ kind: "gained", id: a.id, species: a.species, label: B.species[a.species].label }]);
    expect(s.totals[B.species[a.species].kind]).toBe(totalsOf([B.species[a.species]])[B.species[a.species].kind]);
    stepBuffs(s, cs, [a.id, b.id], t);
    expect(s.events).toEqual([]);
    a.leashed = false; // gone from the party
    stepBuffs(s, cs, [b.id], t);
    expect(s.events.map(e => e.kind)).toEqual(["lost"]);
    expect(s.active).toEqual([]); expect(s.tuning).toBe(t); expect(s.totals).toEqual(noBuffs());
  });

  it("a hare legend in the party makes her fly faster in the game", () => {
    const fly = (legend: boolean) => {
      const g = newGame(7, t), c = g.creatures.find(c => c.species !== "hare")!;
      g.clock.paused = false; g.witch = { ...g.witch, seated: false };
      if (legend) { Object.assign(c, { species: "hare", leashed: true, level: LEGEND }); g.leash.stack.push(c.id); }
      for (let i = 0; i < 120; i++) stepGame(g, { moveX: 1, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 30);
      return g.witch.x;
    };
    const x0 = newGame(7, t).witch.x, plain = fly(false) - x0, buffed = fly(true) - x0;
    expect(buffed / plain).toBeGreaterThan(1.05);
  });
});
