import { expect, it } from "vitest";
import { createHash } from "node:crypto";
import { attackObserverErrors, observeAttacks, type AttackOutcome, type WitchHitState } from "./attackObservation";
import { COMBAT, newCombat, type CombatWorld } from "./combat/data";
import { land } from "./combat/hits";
import { spellWorld } from "./attacks/combatWorld";
import { cast, newSpells, stepSpells, type Hittable } from "./attacks/engine";
import { TUNING } from "./tuning";
import { newGame, stepGame, STEP } from "./game";
import { setupArena } from "./arena";
import { withCombatRoles } from "../test/combatRoles";

function port() {
  const current: WitchHitState = { hp: 4, hurtAt: -Infinity, down: false, dashing: false, damageEnabled: true,
    stunUntil: 0, slowUntil: 0, slowMult: 1, x: 4, z: 0, kx: 0, kz: 0 };
  const creatures = [] as CombatWorld["creatures"];
  creatures[1] = { id: 1, species: "wolf", level: 2, x: 0, z: 0 } as CombatWorld["creatures"][number];
  const w = { creatures, witches: [{ id: 0, x: 4, z: 0, onGround: true, down: false }], time: 10, t: TUNING, asleep: () => false,
    witchHitState: () => ({ ...current }),
    hitWitch: () => { if (!current.dashing) { current.hp--; current.hurtAt = w.time; } },
    stunWitch: (_id: number, until: number) => { if (!current.dashing) current.stunUntil = until; },
  } as unknown as CombatWorld;
  const s = newCombat(), W = spellWorld(w, s, { near: () => [] } as never, 5, COMBAT);
  const target: Hittable = { kind: "witch", id: 0, x: 4, z: 0, r: 0.3, side: "party" };
  const rows: Readonly<AttackOutcome>[] = [], dispose = observeAttacks(s, row => rows.push(row));
  const hit = () => W.harm(target, 1, { stun: 0.2 }, 0, 0, 1, "fixture", "bolt", { cast: 7, body: 3 });
  return { current, w, s, W, target, rows, hit, dispose };
}

it("records accepted health and stun changes, or an actual blink dodge, not just contact", () => {
  const p = port(); p.hit();
  expect(p.rows[0]).toMatchObject({ attack: "fixture", source: 1, cast: 7, body: 3, targetKind: "witch", targetId: 0,
    phase: "contact", damageAccepted: true, healthLost: 1, stunApplied: true, damageDodged: false });
  p.current.dashing = true; p.hit();
  expect(p.rows[1]).toMatchObject({ damageAccepted: false, healthLost: 0, stunApplied: false, damageDodged: true });
  p.current.damageEnabled = false; p.hit();
  expect(p.rows[2].damageDodged).toBe(false);
});

it("keeps unknown callback-only outcomes null and sheltered rejection distinct from a dodge", () => {
  const p = port(); delete p.w.witchHitState; p.hit();
  expect(p.rows[0]).toMatchObject({ damageAccepted: null, healthLost: null, stunApplied: null, damageDodged: null });
  p.w.witches[0].shelter = 42; p.hit();
  expect(p.rows[1]).toMatchObject({ sheltered: true, damageAccepted: false, healthLost: null, damageDodged: null });
});

it("retains exact legacy parameters without guessing a named attack", () => {
  const p = port();
  const attack = { delivery: "shot" as const, range: 4, windup: 0.5, cooldown: 2, modifier: "none" as const };
  land(p.w, p.s, p.w.creatures[1], { kind: "witch", id: 0 }, 1, attack, 0, 0);
  land(p.w, p.s, p.w.creatures[1], { kind: "witch", id: 0 }, 1, { ...attack, range: 8 }, 0, 0);
  expect(p.rows.map(row => row.attack)).toEqual([null, null]);
  expect(p.rows.map(row => JSON.parse(row.definition!).range)).toEqual([4, 8]);
  expect(p.rows.every(row => row.damageAccepted && row.delivery === "shot")).toBe(true);
});

it("forwards the engine's cast and body identity without changing its hit events", () => {
  const p = port(), S = newSpells(5);
  const id = cast(S, p.W, { cast: { windup: 0.5 }, speed: { v: 20 }, life: { range: 10 } }, "engine-fixture",
    { id: 1, x: 0, z: 0, side: "wild", species: "wolf" }, p.target, 0, 1);
  p.w.creatures[1].fight = { target: { kind: "witch", id: 0 }, spellCast: id } as never;
  for (let i = 1; i <= 60; i++) { p.w.time = i * STEP; stepSpells(S, p.W, {}, p.w.time, STEP); }
  expect(p.rows).toHaveLength(1);
  expect(p.rows[0]).toMatchObject({ cast: id, body: S.bodies[0].id, attack: "engine-fixture", damageAccepted: true });
  expect(S.events.find(e => e.kind === "hit")).not.toHaveProperty("cast");
});

it("disposes only its own registration and never reads snapshots when disabled", () => {
  const p = port(); p.dispose();
  p.w.witchHitState = () => { throw Error("disabled observer read"); };
  p.hit(); expect(p.rows).toEqual([]);
  const second: Readonly<AttackOutcome>[] = [];
  delete p.w.witchHitState;
  const dispose = observeAttacks(p.s, row => second.push(row)); p.dispose(); p.hit();
  expect(second).toHaveLength(1); dispose();
});

it("measures accepted orbit fill and separates a missed charge's self-stun", () => {
  const g = newGame(7, TUNING); g.clock.paused = false; g.party.paused = true;
  setupArena(g, "boar*3@2,fox*3@2"); g.witches[0].body.mode = "treetop"; g.witches[0].body.lift = 1;
  const ids = new Set(g.arena!.ids); for (const c of g.creatures) if (!ids.has(c.id)) c.gone = true;
  g.byArea = null; const rows: Readonly<AttackOutcome>[] = [];
  observeAttacks(g.combat, row => rows.push(row));
  for (let i = 0; i < 20 / STEP; i++) stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, STEP);
  expect(rows.some(row => row.targetKind === "creature" && row.damageAccepted && (row.orbitAdded ?? 0) > 0)).toBe(true);
  expect(rows.filter(row => row.attack === null).every(row => typeof row.definition === "string")).toBe(true);
  expect(rows.some(row => row.phase === "self-miss" && row.stunApplied && row.source === row.targetId)).toBe(true);
  const p = port(); p.w.creatures = g.creatures; p.w.time = g.clock.time;
  const target = g.creatures[g.arena!.ids[0]];
  target.stunUntil = undefined; // isolate this explicit effect from a preceding charge's winded state
  p.W.harm({ kind: "creature", id: target.id, x: target.x, z: target.z, r: 1, side: "party" },
    0, { stun: 0.4 }, 0, 0, 1, "explicit-stun", "bolt");
  expect(p.rows[0]).toMatchObject({ phase: "contact", attack: "explicit-stun", damageAccepted: false, stunApplied: true });
  expect(attackObserverErrors(g.combat)).toBe(0);
}, 60000);

it("leaves actual Game state, cues, events and RNG identical even if a diagnostic mutates and throws", () => {
  function run(enabled: boolean) {
    const g = newGame(5, TUNING); g.clock.paused = false; g.party.paused = true;
    setupArena(g, "pack-wolf", { wildOnly: true });
    const ids = new Set(g.arena!.ids); for (const c of g.creatures) if (!ids.has(c.id)) c.gone = true;
    g.byArea = null;
    const outcomes: Readonly<AttackOutcome>[] = [];
    if (enabled) observeAttacks(g.combat, row => { outcomes.push(row); Object.assign(row, { source: -999 }); });
    const trajectory = createHash("sha256");
    for (let i = 0; i < 12 / STEP; i++) {
      stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, STEP);
      trajectory.update(JSON.stringify({ events: g.combat.events, spells: g.combat.spells,
        witches: g.witches.map(w => [w.health.hp, w.body.x, w.body.z, w.dash.at, w.dash.until, !!w.ko]) }));
    }
    const seen = new WeakMap<object, number>(); let reference = 0;
    const state = JSON.stringify(g, function (key, value) {
      if (this === g.forest && key === "buildMs") return undefined; // wall-clock performance counter, not rule state
      if (!value || typeof value !== "object") return value;
      if (seen.has(value)) return { reference: seen.get(value) };
      seen.set(value, reference++);
      if (value instanceof Map) return { map: [...value] };
      if (value instanceof Set) return { set: [...value] };
      return value;
    });
    return { state, trajectory: trajectory.digest("hex"), rng: g.creatures.map(c => c.rand()), outcomes, errors: attackObserverErrors(g.combat) };
  }
  const off = run(false), on = run(true);
  if (on.state !== off.state) {
    let at = 0; while (at < Math.min(on.state.length, off.state.length) && on.state[at] === off.state[at]) at++;
    throw Error(`State differs at ${at}: OFF ${off.state.slice(Math.max(0, at - 60), at + 90)} ON ${on.state.slice(Math.max(0, at - 60), at + 90)}`);
  }
  expect(on.rng).toEqual(off.rng);
  expect(on.trajectory).toBe(off.trajectory);
  expect(on.outcomes.length).toBeGreaterThan(0); expect(on.errors).toBe(on.outcomes.length);
  expect(on.outcomes.some(row => row.targetKind === "witch" && row.damageAccepted && row.healthLost === 1)).toBe(true);
  expect(on.outcomes.every(Object.isFrozen)).toBe(true);
}, 60000);

it("attributes her pack's accepted mind stun to its actual source", withCombatRoles({ unicorn: "special" }, () => {
  const g = newGame(5, TUNING); g.clock.paused = false; g.party.paused = true;
  setupArena(g, "unicorn*3@2,wolf*3@2"); g.witches[0].body.mode = "treetop"; g.witches[0].body.lift = 1;
  const ids = new Set(g.arena!.ids); for (const c of g.creatures) if (!ids.has(c.id)) c.gone = true;
  g.byArea = null; const rows: Readonly<AttackOutcome>[] = [];
  observeAttacks(g.combat, row => rows.push(row));
  for (let i = 0; i < 20 / STEP; i++) stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, STEP);
  const stun = rows.find(row => row.attack === "pack:mind" && row.stunApplied);
  expect(stun).toBeDefined();
  expect(g.creatures[stun!.source!].species).toBe("unicorn");
  expect(g.creatures[stun!.targetId as number].species).toBe("wolf");
}), 60000);
