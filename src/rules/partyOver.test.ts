// The party's over (Ed, 2026-10-06; rules/partyOver.ts): every soundsystem and the home ring's speakers down, the run ends in
// a peaceful afterparty: the waves stop, nothing fights or hurts her, everyone walks home (or is home already) and sleeps.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { affectionOf, hitWitch, newGame, stepGame, STEP, type Game } from "./game";
import { endParty, partyOverEase } from "./partyOver";
import { cellKey } from "./party";
import { targetable } from "./combat";
import type { Creature } from "./creatures";

const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
const run = (g: Game, s: number, c: Partial<typeof C> = {}) => { for (let i = 0; i < s / STEP; i++) stepGame(g, { ...C, ...c }, STEP); };
function game(): Game {
  const g = newGame(123, TUNING);
  g.clock.paused = false; g.party.spellAt = undefined;
  g.witch = { ...g.witch, seated: false };
  return g;
}
const inOwnArea = (g: Game, c: Creature) => cellKey(g.map.cellSafe(c.x, c.z).cell) === cellKey(c.cell);

describe("the party's over", () => {
  it("starts when every soundsystem is down, the dancefloor's ring too, and not before", () => {
    const g = game();
    run(g, 0.5);
    expect(g.partyOver).toBeNull();
    g.combat.sounds.get("home")!.hp = 0;
    run(g, STEP);
    expect(g.partyOver).not.toBeNull();
    expect(g.partyOver!.at).toBeCloseTo(g.clock.time, 1);
  });

  it("eases in over partyOver.ease seconds", () => {
    expect(partyOverEase(10, 10, 6)).toBe(0);
    expect(partyOverEase(10, 13, 6)).toBeCloseTo(0.5, 5);
    expect(partyOverEase(10, 16, 6)).toBe(1);
    const g = game();
    endParty(g);
    run(g, TUNING.partyOver.ease / 2);
    expect(g.partyOver!.ease).toBeGreaterThan(0.2);
    expect(g.partyOver!.ease).toBeLessThan(0.8);
    run(g, TUNING.partyOver.ease);
    expect(g.partyOver!.ease).toBe(1);
  });

  it("stops the waves for good", () => {
    const g = game();
    endParty(g);
    const wave = g.party.wave;
    run(g, 2, { nextWave: true } as Partial<typeof C>);
    g.party.nextAt = g.clock.time; // (its countdown up: still nothing)
    run(g, 2);
    expect(g.party.wave).toBe(wave);
  });

  it("puts everyone to sleep: her leashed ones where they stand, the far ones (and the ones that ran off) at home, the near ones after walking home", () => {
    const g = game(), w = g.witch;
    const wild = g.creatures.filter(c => !c.boss && !c.gone);
    // One leashed to her, beside her; one that ran off the map earlier; one near her, away from home and mid-fight.
    const leashed = wild[0], ran = wild[1], near = wild.find(c => c !== leashed && c !== ran && c.level > 0)!;
    Object.assign(leashed, { x: w.x + 2, z: w.z, leashed: true }); g.leash.stack.push(leashed.id);
    Object.assign(ran, { gone: true, x: 99999, z: 99999 });
    Object.assign(near, { x: w.x + 8, z: w.z + 4, enraged: true, siege: "home", fight: { target: { kind: "witch", id: 0 } } });
    const at = { x: leashed.x, z: leashed.z };
    endParty(g);
    // Her leash lets go: asleep where it stood.
    expect(g.leash.stack).toEqual([]);
    expect(leashed.leashed).toBe(false);
    expect(leashed.asleep).toBe(true);
    expect(leashed.x).toBe(at.x); expect(leashed.z).toBe(at.z);
    // The one that ran off is back, at home, asleep.
    expect(ran.gone).toBe(false);
    expect(ran.asleep).toBeTruthy();
    expect(inOwnArea(g, ran)).toBe(true);
    // The near one is calm and walking home to bed; far ones are in bed already.
    expect(near.enraged).toBe(false); expect(near.siege).toBeUndefined(); expect(near.fight).toBeUndefined();
    expect(near.asleep).toBeUndefined();
    expect(near.bed).toBeTruthy();
    const far = g.creatures.filter(c => !c.gone && Math.hypot(c.x - w.x, c.z - w.z) > TUNING.haze.far + 200);
    expect(far.length).toBeGreaterThan(10);
    expect(far.every(c => !!c.asleep)).toBe(true);
    // It strolls home at partyOver.walk times its pace, and lies down there.
    const b = near.bed!, from = { x: b.x + 6, z: b.z }, wasAt = { x: near.x, z: near.z };
    run(g, 1);
    expect(Math.hypot(near.x - wasAt.x, near.z - wasAt.z)).toBeCloseTo(near.speed * TUNING.partyOver.walk, 1);
    Object.assign(near, from); g.witch = { ...g.witch, x: b.x + 10, z: b.z + 6 }; // (her beside its bed, watching)
    run(g, 6 / (near.speed * TUNING.partyOver.walk) + 1);
    expect(near.asleep).toBeTruthy();
    expect(Math.hypot(near.x - b.x, near.z - b.z)).toBeLessThan(0.1);
    expect(inOwnArea(g, near)).toBe(true);
    const lay = { x: near.x, z: near.z };
    run(g, 5);
    expect(near.x).toBe(lay.x); expect(near.z).toBe(lay.z);
    // The others still walking home are put to bed once she's away and can't see them.
    g.witch = { ...g.witch, x: g.map.bounds.minX + 50, z: g.map.bounds.minZ + 50 };
    run(g, 1);
    expect(g.creatures.filter(c => !c.gone && !c.asleep && Math.hypot(c.x - g.witch.x, c.z - g.witch.z) > TUNING.haze.far + 60).length).toBe(0);
  }, 120000);

  it("legends sleep too, and nobody fights, attacks her or takes 💌s", () => {
    const g = game(), W = g.witches[0];
    const L = g.creatures.find(c => c.boss)!;
    L.legendState = "angry"; L.enraged = true;
    endParty(g);
    run(g, 60);
    expect(L.legendState).toBe("asleep");
    expect(L.asleep).toBeTruthy();
    const A = affectionOf(g);
    expect(g.creatures.every(c => c.gone || (!targetable(c) && !A.invitable(c) && !c.fight?.target))).toBe(true);
    const hp = W.health.hp;
    hitWitch(g, 0, g.clock.time + 5);
    expect(W.health.hp).toBe(hp);
    expect(W.ko).toBeNull();
  }, 60000);
});
