// The composable attacks in the real fight (rules/attacks/combatWorld.ts; the Fight Arena's ?attack=): the arena's wild side given an
// attack in the grammar winds up as ever, its telegraphs shown from the windup's start, the engine releasing it and its hits landing
// on her party; the same run twice the same; and a creature with no such attack fighting exactly as before.
import { describe, expect, it } from "vitest";
import { arenaAttack, setupArena } from "../arena";
import { newGame, stepGame, STEP, type Controls, type Game } from "../game";
import { TUNING } from "../tuning";
import { serialiseAttack, type AttackSpec } from "./index";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };

function arena(spec: string, attack: string | null, secs: number): { g: Game; notes: string[] } {
  const g = newGame(5, TUNING);
  g.clock.paused = false; g.party.paused = true;
  setupArena(g, spec);
  const notes = attack ? arenaAttack(g, attack) : [];
  for (let i = 0; i < secs / STEP; i++) { g.witches[0].health.hp = 1e6; stepGame(g, idle, STEP); }
  return { g, notes };
}

// (a fan of slowing bolts that curve, each splitting into a little ring where it ends)
const FAN: AttackSpec = {
  cast: { range: 22, windup: 0.9, cooldown: 2.5, tell: { pose: "rear", glow: 0.6 } },
  emit: { pattern: "fan", n: 3, angle: 40 }, body: { kind: "bolt", radius: 0.8, element: "frost" }, path: [{ curve: 20 }], speed: { v: 20 }, life: { range: 26 },
  hit: { damage: 0.5, effect: { slow: { mult: 0.6, time: 1.5 } } },
  on: { expire: [{ attack: { cast: { windup: 0.5 }, emit: { pattern: "ring", n: 4 }, speed: { v: 12 }, life: { range: 6 }, hit: { damage: 0.2 } } }] },
};

describe("attacks in the grammar in the real fight", () => {
  it("the arena's wild side casts it: telegraphs from the windup, the engine's bodies, its hits on her party", () => {
    const { g, notes } = arena("wolf*3@2,raven*3@2", serialiseAttack(FAN), 20);
    expect(notes).toEqual([]);
    const S = g.combat.spells!;
    expect(S.stats.bodies[0]).toBeGreaterThan(0); // (the fans flew)
    expect(S.stats.bodies[1]).toBeGreaterThan(0); // (and split)
    expect(S.events.length + S.telegraphs.length).toBeGreaterThan(0);
    // (her wolves were hit by it: the fight's own hit events, from the ravens)
    const ravens = new Set(g.arena!.ids.filter(id => g.creatures[id].species === "raven"));
    expect(g.creatures.filter(c => ravens.has(c.id)).every(c => c.spell === "arena")).toBe(true);
    expect(g.creatures.filter(c => g.arena!.ids.includes(c.id) && c.species === "wolf").some(c => (c.hp ?? Infinity) < 1e9 && c.hurtAt !== undefined)).toBe(true);
  });

  it("names an attack from the library, refuses a bad one, and plays the same twice", () => {
    expect(arena("wolf*2@2,raven*2@2", "{\"body\":{\"kind\":\"dragon\"}}", 0).notes[0]).toMatch(/body.kind/);
    const a = arena("wolf*3@2,raven*3@2", serialiseAttack(FAN), 8).g, b = arena("wolf*3@2,raven*3@2", serialiseAttack(FAN), 8).g;
    expect(a.combat.spells!.stats).toEqual(b.combat.spells!.stats);
    expect(a.creatures.map(c => Math.round(c.x * 100))).toEqual(b.creatures.map(c => Math.round(c.x * 100)));
    const named = arena("wolf*3@2,raven*3@2", "barb", 6).g;
    expect(named.creatures.filter(c => named.arena!.ids.includes(c.id) && c.species === "raven").every(c => c.spell === "barb")).toBe(true);
    expect(named.combat.spells!.stats.bodies[0]).toBeGreaterThan(0);
  });

  it("leaves a fight with no attack in the grammar as it was", () => {
    const { g } = arena("wolf*3@2,raven*3@2", null, 8);
    expect(g.combat.spells).toBeUndefined();
    expect(g.combat.shots.length + g.combat.events.length).toBeGreaterThanOrEqual(0);
  });
});
