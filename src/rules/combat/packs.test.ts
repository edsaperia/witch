// Ed, 2026-11-01: test rules directly; emergent fight outcomes are balancing input.
import { describe, expect, it } from "vitest";
import { setupArena } from "../arena";
import { type Creature } from "../creatures";
import { newGame, stepGame, STEP, type Controls } from "../game";
import { TUNING, withTuning } from "../tuning";
import { PACKS, packAttack } from "./packs";
import { FIGHT } from "../movement";
import { COMBAT } from "./data";
import { smallWorldTuning } from "../../test/worlds";
import { queueCombatHit } from "../../test/combatHit";
const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const ON = withTuning({ combat: { ...TUNING.combat, packs: { on: true } } });
describe("pack attack budgets and controlled effects", () => {
it("keeps three moves on the level's budget: a move's damage a second is its level's, however many shots it splits into", () => {
    for (const k of Object.keys(PACKS.kinds)) for (const level of [1, 2] as const) for (const mv of ["melee", "ranged"] as const) {
      const a = packAttack(k, level, mv);
      if (!a) continue;
      expect((a.damage * a.shots) / a.attack.cooldown).toBeCloseTo(COMBAT.levels.dps[level] * (COMBAT.strength?.species[k] ?? 1) * (a.attack.factor ?? 1), 6);
    }
    expect(packAttack("snail", 2, "ranged")).toBeNull(); // (the table's none)
    expect(packAttack("fox", 1, "ranged")!.attack.windup).toBeLessThan(packAttack("fox", 2, "ranged")!.attack.windup); // Youth soldiers act briskly; adult tanks are deliberate (Ed, 2026-11-02).
    expect(packAttack("fox", 1, "ranged")!.shots).toBeLessThan(packAttack("fox", 2, "ranged")!.shots); // (an adult's a volley)
  });
it("decoy: a 💌 the waving raccoon catches is wasted, its meter untouched (Ed, 2026-10-23: \"otherwise it's not a decoy\")", () => {
    // (one of the pack across the arena waving, she throwing straight at it: before it's on her and she's staggered)
    const g = newGame(5, smallWorldTuning(ON, "Decoy interception uses a manually assigned nearby target and two seconds of input.")); g.clock.paused = false; g.party.paused = true;
    setupArena(g, "pack-raccoon");
    const W = g.witches[0], c = g.creatures.filter(k => k?.species === "raccoon" && !k.leashed && k.level === 2).sort((p, q) => Math.hypot(p.x - W.body.x, p.z - W.body.z) - Math.hypot(q.x - W.body.x, q.z - W.body.z))[0];
    let caught = 0, landed = 0;
    const seen = new Set<object>(); // (her 💌s' events, each once: they run on her clock)
    for (let i = 0; i < 2 / STEP; i++) {
      g.combat.decoys = [{ id: c.id, until: g.clock.time + 1, r: (PACKS.specials.decoy.radius ?? 3) * FIGHT.scale, side: "wild" }];
      W.health.hp = 1e6; stepGame(g, { ...idle, fire: true, aimX: c.x - W.body.x, aimZ: c.z - W.body.z }, STEP);
      for (const e of W.invites.events) if (!seen.has(e)) { seen.add(e); if (e.kind === "fizzled") caught++; if (e.kind === "hit" && e.id === c.id) landed++; }
    }
    expect(caught).toBeGreaterThan(0);
    expect(landed).toBe(0);
  }, 120000);
it("the bat's screech turns her movement, not her aim", () => {
    const g = newGame(5, smallWorldTuning(ON, "Confused input steering is local to the witch and does not depend on world extent."));
    g.clock.paused = false; g.party.paused = true;
    setupArena(g, "pack-bat");
    for (let i = 0; i < 20; i++) stepGame(g, idle, STEP);
    const W = g.witches[0];
    W.confused = { until: g.clock.time + 5, drift: Math.PI / 3, move: true };
    const x0 = W.body.x, z0 = W.body.z;
    for (let i = 0; i < 30; i++) { W.health.hp = 1e6; stepGame(g, { ...idle, moveX: 1 }, STEP); }
    const dx = W.body.x - x0, dz = W.body.z - z0;
    expect(Math.hypot(dx, dz)).toBeGreaterThan(0.5);
    expect(Math.abs(dz) / Math.hypot(dx, dz)).toBeGreaterThan(0.05); // (steering east, she drifts off north or south)
  }, 60000);
it("a wild boar at 1 hp facing her parked wolf is knocked down (it kept off it for good)", () => {
    const g = newGame(77, ON), d = g.map.dancefloor;
    g.clock.paused = false; g.party.paused = true;
    g.witch = { ...g.witch, seated: false, x: d.x, z: d.z + 20, mode: "treetop", lift: 1 };
    for (const c of g.creatures) if (Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 60) c.gone = true;
    const spare = g.creatures.filter(c => !c.gone && !c.leashed && !c.boss && Math.hypot(c.x - g.witch.x, c.z - g.witch.z) > 80);
    const put = (c: Creature, species: string, level: 1 | 2, dx: number) => { const x = g.witch.x + dx, z = g.witch.z; Object.assign(c, { circle: undefined, species, level, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, safeR: undefined, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, rest: 0 }); c.cell = g.map.cellSafe(x, z).cell as [number, number]; return c; };
    const boar = put(spare[0], "boar", 1, 4), wolf = put(spare[1], "wolf", 2, 2);
    boar.affection = 0.99; boar.affectionAt = g.clock.time; // (its slots nearly full: rules/orbit.ts)
    wolf.leashed = true; g.leash.placed.push({ id: wolf.id, x: wolf.x, z: wolf.z, at: g.clock.time });
    g.byArea = null;
    queueCombatHit(g, wolf, boar);
    let downAt = -1;
    for (let i = 0; i < 20 / STEP && downAt < 0; i++) { stepGame(g, idle, STEP); if (boar.dazed || boar.fleeUntil) downAt = g.clock.time; }
    expect(downAt).toBeGreaterThan(0);
  }, 60000);
});
