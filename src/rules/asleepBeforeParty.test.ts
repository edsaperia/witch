// The world before the party is the afterparty's (Ed, 2026-10-26: "If you leave the treehouse before starting the party, it should be
// the same as after a party is lost; creatures are asleep in their areas and you can't invite them, the night's permanent upgrade
// find is not placed yet"): rules/partyOver.ts worldAsleep, putToBed and stepWorldAsleep. A night waiting for her party spell and a
// night lost lie the same: every creature asleep in its own area, no 💌 taking, nothing attacking her, tonight's find not there; the
// spell cast, everything gets up as a night that never waited has it.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { cellKey } from "./party";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { fillTrunk } from "./finds";
import { endParty, nightEase, relicsOut, worldAsleep } from "./partyOver";
import type { Creature } from "./creatures";
import { circleLines } from "./legendCircle";

const C: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
const run = (g: Game, s: number, c: Partial<Controls> = {}) => { for (let i = 0; i < Math.round(s / STEP); i++) stepGame(g, { ...C, ...c }, STEP); };
/** On foot out in the forest, away from the treehouse: at (x, z). */
const out = (g: Game, x: number, z: number) => { g.witch = { ...g.witch, x, z, vx: 0, vz: 0, seated: false, perch: undefined, mode: "ground", lift: 0 }; };
/** Asleep for good (the afterparty's sleep), not a nap. */
const deepAsleep = (c: Creature) => !!c.asleep && c.napUntil === undefined;
const them = (g: Game) => g.creatures.filter(c => !c.gone && !c.leashed);

/** A night waiting for the spell (as every night from her bedroom: app/gameParams.ts), its find in the trunk, a moment on. */
function beforeParty(): Game {
  const g = newGame(123, TUNING);
  g.party.spellAt = null; g.clock.paused = false;
  fillTrunk(g, {});
  run(g, 0.5);
  return g;
}
/** The same night lost (the home ring down: the afterparty), every creature in bed. */
function lost(): Game {
  const g = newGame(123, TUNING);
  g.clock.paused = false;
  fillTrunk(g, {});
  endParty(g);
  // (those in her sight walk home to bed at their own pace, slow ones for minutes: out of their sight, every one's in bed at once,
  // rules/partyOver.ts stepPartyOver; then back at her decks)
  const W = { ...g.witch };
  out(g, g.map.bounds.minX + 5, g.map.bounds.minZ + 5);
  run(g, 0.5);
  g.witch = W;
  return g;
}
/** A wild young or adult one away from home, to stand by. */
const someone = (g: Game) => them(g).find(c => !c.boss && c.level >= 1 && cellKey(c.cell) !== cellKey(g.map.centreCell))!;

describe("the world before the party is the afterparty's (Ed, 2026-10-26)", () => {
  it("every creature asleep in its own area, as after a loss, the legends too", () => {
    for (const g of [beforeParty(), lost()]) {
      expect(worldAsleep(g)).toBe(true);
      const all = them(g);
      expect(all.length).toBeGreaterThan(20);
      for (const c of all) {
        expect(deepAsleep(c), `${c.species} ${c.id}`).toBe(true);
        expect(cellKey(g.map.cellSafe(c.x, c.z).cell), `${c.species} ${c.id} in its own area`).toBe(cellKey(c.cell));
        if (c.boss) expect(c.legendState).toBe("asleep");
      }
    }
    // (the same creatures, by the same areas)
    const a = beforeParty(), b = lost(), key = (g: Game) => them(g).map(c => `${c.id}:${cellKey(c.cell)}`).sort();
    expect(key(a)).toEqual(key(b));
  });

  it("out of the house she can't invite them, and nothing attacks her, as after a loss", () => {
    for (const g of [beforeParty(), lost()]) {
      const c = someone(g);
      out(g, c.x - 6, c.z);
      const hp = g.witches[0].health.hp;
      run(g, 4, { fire: true, aimX: 1, aimZ: 0 });
      run(g, 6);
      expect(c.leashed).toBeFalsy();
      expect(c.state === "happy").toBe(false);
      expect(deepAsleep(c)).toBe(true);
      expect(g.witches[0].invites.events.some(e => e.kind === "hit" || e.kind === "happy")).toBe(false);
      expect(g.witches[0].health.hp).toBe(hp);
    }
  });

  it("tonight's find isn't there yet: E at its trunk does nothing, as after a loss", () => {
    for (const g of [beforeParty(), lost()]) {
      const T = g.trunk!;
      expect(T.item).toBeTruthy();
      out(g, T.x, T.z);
      run(g, 0.2, { place: true, sigil: true });
      expect(T.found).toBeFalsy();
      expect(g.leashEvents.some(e => e.kind === "found")).toBe(false);
    }
  });

  it("casting the party spell gets everyone up as a night that never waited has them, and the find is there", () => {
    const g = beforeParty();
    stepGame(g, { ...C, castParty: true }, STEP);
    run(g, 0.5);
    const castAt = g.party.spellAt;
    expect(typeof g.party.spellAt).toBe("number");
    expect(worldAsleep(g)).toBe(false);
    const never = newGame(123, TUNING);
    never.clock.paused = false;
    run(never, 0.5);
    expect(them(g).filter(deepAsleep).length).toBe(them(never).filter(deepAsleep).length); // (none asleep for good: naps are their own)
    expect(them(g).length).toBe(them(never).length);
    for (const c of them(g)) if (c.boss) expect(c.legendState).toBe("asleep");
    expect(castAt).not.toBeNull();
    // (the find's there now: E at its trunk takes it, once the cast and her routine at the decks have let her go)
    run(g, 10);
    const T = g.trunk!;
    out(g, T.x, T.z);
    run(g, 0.2, { place: true, sigil: true });
    expect(T.found).toBe(true);
  });

  it("a legend only snores before the party, no dream (Ed, 2026-10-26): its quest closed, as after a loss, open again once it's cast", () => {
    const g = beforeParty(), dreamers = g.creatures.filter(c => c.boss && c.quest && c.quest.done === undefined);
    expect(dreamers.length).toBeGreaterThan(3);
    for (const c of dreamers) {
      // (asleep, so render/leash/bubbles.ts gives it a snore; questOpen false, so render/leash.ts gives it no dream)
      expect(deepAsleep(c), `${c.species} ${c.id}`).toBe(true);
      expect(c.questOpen, `${c.species} ${c.id}`).toBe(false);
      expect(circleLines(c, true).map(l => l.text)).toContain("It sleeps till the party starts.");
    }
    for (const c of them(lost())) if (c.boss && c.quest && c.quest.done === undefined) expect(c.questOpen).toBe(false);
    stepGame(g, { ...C, castParty: true }, STEP);
    run(g, 0.5);
    for (const c of dreamers) expect(c.questOpen, `${c.species} ${c.id}`).toBe(true);
  });

  it("no relics before the party (Ed, 2026-10-26: \"Relics, like finds, only appear once the party starts\"); out once it's cast", () => {
    const g = beforeParty();
    expect(g.relics.length).toBeGreaterThan(0);
    expect(relicsOut(g)).toEqual([]);
    // (standing on a flask's sigil with a baby following, E drinks nothing: no growth spurt, no fizzle)
    const r = g.relics.find(k => k.state === "lying")!;
    out(g, r.sx, r.sz);
    run(g, 0.2, { place: true, sigil: true });
    expect(r.state).toBe("lying");
    expect(g.leashEvents.some(e => e.kind === "flaskDrunk" || e.kind === "fizzled")).toBe(false);
    stepGame(g, { ...C, castParty: true }, STEP);
    expect(relicsOut(g)).toBe(g.relics);
    const L = lost();
    expect(relicsOut(L)).toBe(L.relics); // (a lost night's are as today's: its relics still lie where they lay)
  });

  it("the night sounds as after a loss before the party (Ed, 2026-10-26, Q-c), easing out as it's cast; a night that never waited has none", () => {
    const g = beforeParty();
    expect(nightEase(g, 0)).toBe(1); // (all the way in, as the afterparty's eased in)
    stepGame(g, { ...C, castParty: true }, STEP);
    const at = g.party.spellAt as number;
    expect(nightEase(g, 0)).toBeGreaterThan(0.9);
    g.clock.time = at + 2; expect(nightEase(g, 0)).toBeCloseTo(0.5);
    g.clock.time = at + 10; expect(nightEase(g, 0)).toBe(0);
    expect(nightEase(g, 0.7)).toBe(0.7); // (a lost night later on: the party's over's own ease)
    const never = newGame(123, TUNING);
    expect(nightEase(never, 0)).toBe(0);
    expect(nightEase(lost(), 1)).toBe(1);
  });

  it("a night that never waits for the spell (the tools, the bots) is as before: awake from the start", () => {
    const g = newGame(123, TUNING);
    g.clock.paused = false;
    run(g, 0.5);
    expect(worldAsleep(g)).toBe(false);
    expect(them(g).some(deepAsleep)).toBe(false);
  });
});
