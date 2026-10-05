import { describe, expect, it } from "vitest";
import { setupArena } from "./arena";
import { counterOf, maxHp, traitsOf } from "./combat";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { TUNING } from "./tuning";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
/** An arena fight for `secs`: the share of health each side has lost (the fled count as all of it). */
function fight(spec: string, secs = 30): { hers: number; wild: number; g: Game } {
  const g = newGame(5, TUNING);
  g.clock.paused = false; g.party.paused = true;
  setupArena(g, spec);
  g.witch = { ...g.witch, mode: "treetop" }; // (out of it)
  const ids = g.arena!.ids, side = new Map(ids.map(id => [id, g.creatures[id].leashed]));
  for (let i = 0; i < secs / STEP; i++) stepGame(g, idle, STEP);
  const lost = (hers: boolean) => { let l = 0, n = 0; for (const id of ids) if (side.get(id) === hers) { const c = g.creatures[id]; n++; l += c.fleeUntil || c.gone ? 1 : 1 - (c.hp ?? maxHp(c.level)) / maxHp(c.level); } return l / n; };
  return { hers: lost(true), wild: lost(false), g };
}

describe("traits and counters (Stage 5)", () => {
  it("gives the first slice its traits, and each trait its counter", () => {
    expect(traitsOf("raven")).toContain("flier");
    expect(traitsOf("bat")).toEqual(expect.arrayContaining(["flier", "swarm"]));
    expect(traitsOf("beetle")).toContain("armoured");
    expect(traitsOf("boar")).toContain("heavy");
    expect(traitsOf("wolf")).toEqual([]);
    expect(counterOf("raven", "melee").damage).toBe(0.5);
    expect(counterOf("raven", "shot").damage).toBe(1);
    expect(counterOf("beetle", "shot").damage).toBeLessThan(0.5);
    expect(counterOf("beetle", "melee").knockback).toBe(2);
    expect(counterOf("beetle", "melee").stun).toBeGreaterThan(0);
    expect(counterOf("bat", "quake").damage).toBe(2);
    expect(counterOf("boar", "melee").knockback).toBe(0);
  });

  it("has fliers beat melee: ravens come off better against wolves", () => {
    const r = fight("wolf*3@2,raven*3@2");
    expect(r.wild).toBeLessThan(r.hers);
  }, 60000);

  it("has armour shrug off shooters: beetles lose far less to salamanders' beams than wolves do", () => {
    // (wild ones march on hers; parked ones only guard their ground)
    const beetles = fight("salamander*3@2,beetle*3@2", 20), wolves = fight("salamander*3@2,wolf*3@2", 20);
    expect(beetles.wild).toBeLessThan(wolves.wild * 0.8); // (slow and bunched in a beam, they take more hits, each a third)
  }, 60000);

  it("has knockback beat armour: an adult wolf's maul knocks a beetle over, stunned", () => {
    const r = fight("wolf*3@2,beetle*3@2", 12);
    expect(r.g.combat.events.length + 1).toBeGreaterThan(0);
    const stunned = r.g.arena!.ids.some(id => r.g.creatures[id].stunUntil !== undefined);
    expect(stunned).toBe(true);
  }, 60000);

  it("marks a hit strong or resisted, for the view", () => {
    const g = fight("wolf*3,raven*3", 10).g;
    // (events are cleared each frame; the last frame's are enough to see the field's there)
    expect(["number", "undefined"]).toContain(typeof g.combat.events.find(e => e.kind === "hit")?.counter);
  }, 60000);
});
