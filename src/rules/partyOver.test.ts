// The party's over (rules/partyOver.ts; Ed, 2026-10-06): once every soundsystem and the home ring have fallen, no end screen,
// the world goes quiet: no more waves, nothing attacks her, every creature goes home and sleeps, her 💌s are harmless.
import { describe, expect, it } from "vitest";
import { affectionOf, newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { TUNING } from "./tuning";
import { endParty, sleepingNow } from "./partyOver";
import { inOwnArea } from "./creatures";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const run = (g: Game, secs: number, c: Controls = idle) => { for (let i = 0; i < Math.round(secs / STEP); i++) stepGame(g, c, STEP); };
const E = TUNING.partyOver!.ease;

/** A game under way, the witch on the ground at home, and its party ended. */
function ended(prep?: (g: Game) => void): Game {
  const g = newGame(123, TUNING);
  g.clock.paused = false; g.party.spellAt = -100;
  g.witches[0].body = { ...g.witch, seated: false, mode: "ground", lift: 0 };
  run(g, 1);
  prep?.(g);
  endParty(g);
  return g;
}

describe("the party's over", () => {
  it("comes when every soundsystem has fallen, easing in over partyOver.ease seconds, and the game runs on", () => {
    const g = ended();
    expect(g.over).not.toBeNull();
    run(g, E / 2);
    expect(g.partyOver).toBeGreaterThan(0.3);
    expect(g.partyOver).toBeLessThan(0.7);
    run(g, E);
    expect(g.partyOver).toBe(1);
    expect(g.clock.paused).toBe(false);
  }, 60_000);

  it("stops the waves for good", () => {
    const g = ended(), wave = g.party.wave, areas = g.party.areas.size;
    run(g, TUNING.party.interval * 2.5);
    run(g, STEP, { ...idle, nextWave: true }); // (not even the debug key)
    expect(g.party.wave).toBe(wave);
    expect(g.party.areas.size).toBe(areas);
  }, 120_000);

  it("puts every creature to sleep in its own area, legends back in their circles; nothing stirs them", () => {
    const g = ended();
    run(g, 2);
    const live = g.creatures.filter(c => !c.gone);
    for (const c of live.filter(c => c.boss && !c.leashed)) expect(["asleep"]).toContain(c.legendState);
    const restless = live.filter(c => !c.boss && !c.sleeping);
    expect(restless.length).toBeLessThan(live.length * 0.02); // (a few still walking home in her sight)
    for (const c of live.filter(c => c.sleeping && !c.leashed)) expect(inOwnArea(g.map, c, c.x, c.z), `creature ${c.id}`).toBe(true);
    const at = live.filter(c => c.sleeping).slice(0, 50).map(c => [c.x, c.z]);
    run(g, 20);
    expect(live.filter(c => c.sleeping).slice(0, 50).map(c => [c.x, c.z])).toEqual(at); // (asleep: not a step)
    for (const c of live.filter(c => c.boss && !c.leashed)) expect(c.legendState).toBe("asleep"); // (with no kin about, none grows restless)
    expect(live.filter(c => sleepingNow(c)).length).toBeGreaterThan(live.length * 0.9);
  }, 120_000);

  it("sends a creature that ran off home in her sight, and it lies down there", () => {
    let c!: Game["creatures"][number];
    const g = ended(g => {
      c = g.creatures.find(k => !k.boss && !k.gone && k.level >= 1 && Math.hypot(k.x - g.witch.x, k.z - g.witch.z) > 200)!;
      const nb = [...g.map.neighbours.get(`${c.cell[0]},${c.cell[1]}`)!][0].split(",").map(Number), s = g.map.siteOf(nb[0], nb[1]);
      Object.assign(c, { x: s.x, z: s.z, enraged: true, state: "enraged", siege: "home" });
      g.witches[0].body = { ...g.witch, x: s.x + 10, z: s.z }; // (she's watching)
    });
    run(g, STEP * 2);
    expect(c.sleeping).toBeFalsy();
    expect(c.enraged).toBe(false);
    run(g, 120);
    expect(c.sleeping).toBe(true);
    expect(inOwnArea(g.map, c, c.x, c.z)).toBe(true);
  }, 120_000);

  it("lets nothing attack her: enraged adults beside her on the ground", () => {
    const g = ended(g => {
      for (const k of g.creatures.filter(k => !k.boss && !k.gone && k.level >= 2).slice(0, 6)) Object.assign(k, { x: g.witch.x + 2, z: g.witch.z + 1, enraged: true, state: "enraged" });
    });
    const hp = g.witches[0].health.hp;
    run(g, 10);
    expect(g.witches[0].health.hp).toBe(hp);
    expect(g.witches[0].ko).toBeNull();
  }, 60_000);

  it("leaves her leashed ones asleep where they are when she flies off", () => {
    let id = -1;
    const g = ended(g => { const k = g.creatures.find(c => !c.boss && !c.gone && c.level === 1)!; id = k.id; k.leashed = true; g.leash.stack.push(k.id); k.x = g.witch.x + 3; k.z = g.witch.z; });
    run(g, STEP * 2);
    const k = g.creatures[id], at = [k.x, k.z];
    expect(k.sleeping).toBe(true);
    run(g, 5, { ...idle, moveX: 1 });
    expect([k.x, k.z]).toEqual(at);
  }, 60_000);

  it("keeps her 💌s harmless", () => {
    const g = ended();
    run(g, 1);
    const c = g.creatures.find(k => !k.boss && !k.gone)!, A = affectionOf(g), before = { ...c };
    expect(A.invitable(c)).toBe(false);
    A.hit(c, 5, g.herTime);
    expect(c.state).toBe(before.state);
    expect(c.leashed).toBe(before.leashed);
  }, 60_000);
});
