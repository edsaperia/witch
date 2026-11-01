import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { setCombatRoles } from "../test/combatRoles";
import { FIGHT, profileOf, startCharge, stepLeap } from "./movement";
import { type Creature, type Level } from "./creatures";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { TUNING, withTuning, type Tuning } from "./tuning";

// Ed's round 13 (2026-10-06): "Charging and jumping creatures should charge or jump much further. At
// the moment it feels like they always stop short. They should be damaging whenever they're touched
// while in attack mode. Charging creatures should have much more momentum, travelling in wide arcs."
const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
// Ed, 2026-11-01: a charge is the chosen melee, not every attack a ram/boar makes.
let restoreRoles: () => void;
beforeEach(() => { restoreRoles = setCombatRoles({ boar: "melee", stag: "melee", lynx: "melee", toad: "melee" }); });
afterEach(() => restoreRoles());
const D = TUNING.dodge!;
/** The dodge changes off (Ed, 2026-10-08; tuning dodge): the heavies' homing run and committed strikes as before. */
const NO_DODGE = withTuning({ dodge: { a: { ...D.a, on: false }, b: { ...D.b, on: false }, c: { ...D.c, on: false } } });
const OLD = withTuning({ fight: { ...TUNING.fight, charge: { reach: 1, turn: 1, brake: 1, contact: false, chase: 0, miss: 0 }, leap: { reach: 1, through: -1.5, contact: false, lead: 0 } }, dodge: NO_DODGE.dodge });

/** A quiet game, the witch on the ground away from everything, too tough to knock out. */
function quiet(t: Tuning = TUNING): Game {
  // Keep the spatial fixture: attacks recruit creatures over 200 m away and test pursuit across area edges.
  const g = newGame(77, t);
  g.clock.paused = false;
  const d = g.map.dancefloor;
  g.witch = { ...g.witch, seated: false, x: d.x, z: d.z + 20, mode: "ground", lift: 0 };
  for (const c of g.creatures) if (Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 120) c.gone = true;
  g.witches[0].health.hp = 1e6;
  return g;
}
function pick(g: Game, species: string, level: Level, dx: number, dz: number, party = false): Creature {
  const w = g.witch, x = w.x + dx, z = w.z + dz;
  const c = g.creatures.find(k => !k.gone && !k.leashed && !k.boss && !(k as unknown as { used?: boolean }).used && Math.hypot(k.x - w.x, k.z - w.z) > 200)!;
  (c as unknown as { used: boolean }).used = true;
  Object.assign(c, { species, level, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, safeR: undefined, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, rest: 0 });
  c.cell = g.map.cellSafe(w.x, w.z).cell as [number, number];
  if (party) { c.leashed = true; g.leash.stack.push(c.id); }
  g.byArea = null;
  return c;
}
const run = (g: Game, secs: number, each?: () => void) => { for (let i = 0; i < Math.round(secs / STEP); i++) { stepGame(g, idle, STEP); each?.(); } };

/** A boar's first charge at her from 25 m off: how far past her it gets, how far out it swings, the hits she takes. */
function charge(t: Tuning) {
  const g = quiet(t), boar = pick(g, "boar", 2, 25, 0), W = g.witches[0], hp0 = W.health.hp;
  let past = 0, out = 0, started = false, done = false;
  run(g, 8, () => {
    if (done) return;
    const ch = boar.charge;
    if (ch && ch.from !== undefined && g.clock.time >= ch.from) started = true;
    if (started && !ch) done = true;
    if (!started || !ch) return;
    const along = (boar.x - g.witch.x) * ch.dx + (boar.z - g.witch.z) * ch.dz;
    past = Math.max(past, along); out = Math.max(out, Math.hypot(boar.x - g.witch.x, boar.z - g.witch.z));
  });
  return { past, out, hits: hp0 - W.health.hp, started };
}

describe("charges and leaps go further (Ed, 2026-10-06)", () => {
  it("runs a boar's charge much further past her, swinging out wider, with the knobs up", () => {
    const before = charge(OLD), after = charge(TUNING);
    expect(before.started && after.started).toBe(true);
    expect(TUNING.fight.charge.reach).toBeGreaterThan(1);
    expect(after.past).toBeGreaterThan(before.past * 1.5);
    expect(after.out).toBeGreaterThan(before.out);
  }, 60000);

  it("hurts whoever it touches on the way, once each: a party animal in its lane, and her once a charge", () => {
    const t = TUNING, g = quiet(t), boar = pick(g, "boar", 2, 25, 0), mate = pick(g, "hare", 1, 8, 0.5, true), W = g.witches[0], hp0 = W.health.hp;
    mate.anchorX = mate.x; mate.anchorZ = mate.z;
    // A contact fixture fixes the intended lane and holds its bystander still;
    // the real committed attack, collision and damage paths remain in use.
    mate.stunUntil = g.clock.time + 20;
    g.leash.stack = g.leash.stack.filter(id => id !== mate.id);
    g.leash.placed.push({ id: mate.id, x: mate.x, z: mate.z, at: g.clock.time });
    boar.hunting = 0;
    boar.fight = { target: { kind: "witch", id: 0 }, readyAt: 0, windupUntil: 0, aimX: W.body.x, aimZ: W.body.z, seenAt: -10 };
    startCharge(boar, profileOf("boar")!.move!, W.body.x, W.body.z, g.clock.time);
    // (a pack's charge comes after its pack's tell, by when her hare may have run in at it, the lane missing her: so till its second)
    let hits = 0, most = 0, last = W.health.hp, charging = false, was = false;
    run(g, 10, () => {
      if (boar.charge && boar.charge.from !== undefined && g.clock.time >= boar.charge.from) charging = true;
      if (boar.charge && !was) hits = 0;
      was = !!boar.charge;
      if (boar.charge && W.health.hp < last) most = Math.max(most, ++hits);
      last = W.health.hp;
    });
    expect(charging).toBe(true);
    expect(mate.drops ?? 0).toBeGreaterThan(0); // (struck: 💧s in its slots, rules/orbit.ts)
    expect(most).toBeLessThanOrEqual(1); // (one charge, one hit: the grace, #197)
    expect(W.health.hp).toBeLessThan(hp0);
  }, 60000);

  it("lands a lynx's pounce past her, carrying on through, its touch landing the blow", () => {
    const g = quiet(TUNING), lynx = pick(g, "lynx", 2, 15, 0), W = g.witches[0], hp0 = W.health.hp;
    let past = -Infinity;
    run(g, 5, () => { const L = lynx.leap; if (L) { const d = Math.hypot(L.tx - L.fx, L.tz - L.fz) || 1; past = Math.max(past, ((L.tx - g.witch.x) * (L.tx - L.fx) + (L.tz - g.witch.z) * (L.tz - L.fz)) / d); } });
    expect(past).toBeGreaterThan(0);
    expect(W.health.hp).toBeLessThan(hp0);
  }, 60000);
});

describe("a chase given up (Ed, 2026-10-06: 'pursue you 30 m outside of their area ... instead they should retreat and go back to idling')", () => {
  it("follows her on the ground past its old 30 m band, then retreats home after take-off (hunt off)", () => {
    expect(TUNING.combat.leaveArea).toBe(30);
    const g = newGame(1000, { ...TUNING, hunt: { on: false } }), w = g.witches[0];
    g.clock.paused = false; g.party.paused = true;
    const [hx, hy] = g.map.centreCell, cell: [number, number] = [hx + 2, hy], site = g.map.siteOf(cell[0], cell[1]);
    w.body = { ...w.body, seated: false, mode: "ground", lift: 0, x: site.x, z: site.z };
    w.health.hp = 1e6;
    const wolf = g.creatures.find(c => !c.gone && !c.boss && c.level > 0)!;
    Object.assign(wolf, { species: "wolf", level: 2, x: site.x + 10, z: site.z, tx: site.x + 10, tz: site.z, cell, homeX: site.x, homeZ: site.z, anchorX: site.x, anchorZ: site.z, hp: undefined });
    g.byArea = null;
    const inArea = (x: number, z: number) => { const k = g.map.cellSafe(x, z).cell; return k[0] === cell[0] && k[1] === cell[1]; };
    let retreated = false, outFar = 0;
    const watch = g.tuning.wildWatch?.on ? g.tuning.wildWatch.time + 1 : 0; // (she waits out its area's watch first, rules/wildWatch.ts: leaving before, it wouldn't chase)
    for (let i = 0; i < (30 + watch) / STEP; i++) {
      const t = i * STEP - watch;
      stepGame(g, { ...idle, moveX: t >= 0 && t < 12 ? -1 : 0 }, STEP); // (she walks 200 m west out of its area, then stands)
      if (wolf.retreat) retreated = true;
      if (!inArea(wolf.x, wolf.z)) outFar = Math.max(outFar, Math.hypot(wolf.x - site.x, wolf.z - site.z));
    }
    expect(retreated, "ground pursuit crosses the old band").toBe(false);
    expect(wolf.fight?.target).toEqual({ kind: "witch", id: 0 });
    w.body = { ...w.body, mode: "treetop", lift: 1 };
    for (let i = 0; i < 30 / STEP; i++) { stepGame(g, idle, STEP); retreated ||= !!wolf.retreat; }
    expect(retreated).toBe(true);
    expect(wolf.fight?.target ?? null).toBe(null);
    expect(inArea(wolf.x, wolf.z)).toBe(true); // (back in its area, not on its edge)
    expect(Math.hypot(wolf.x - site.x, wolf.z - site.z)).toBeLessThan(TUNING.combat.retreatHome + 10);
    expect(wolf.retreat).toBeFalsy(); // (roaming again)
  }, 60000);
});

describe("walking away is no escape (Ed, 2026-10-06: \"Charging creatures can easily be evaded by just walking away from them\")", () => {
  /** A charger or leaper `dist` m off; she stands till its head goes down (its tell), then walks straight away or steps aside. */
  function escape(species: string, dist: number, how: "away" | "aside", t: Tuning = TUNING) {
    const g = quiet(t), c = pick(g, species, 2, -dist, 0), W = g.witches[0], hp0 = W.health.hp;
    let seen = false;
    for (let i = 0; i < 8 / STEP; i++) {
      if ((c.charge && c.charge.from !== undefined) || c.leap) seen = true;
      const ax = g.witch.x - c.x, az = g.witch.z - c.z, ad = Math.hypot(ax, az) || 1;
      stepGame(g, seen ? (how === "away" ? { ...idle, moveX: ax / ad, moveZ: az / ad } : { ...idle, moveZ: 1 }) : idle, STEP);
      if (W.health.hp < hp0) return true;
    }
    return false;
  }
  it("runs a boar's or a stag's charge on till it catches her walking straight down its lane, from near or far", () => {
    expect(TUNING.fight.charge.chase).toBeGreaterThan(1);
    for (const sp of ["boar", "stag"]) for (const d of [15, 30]) expect(escape(sp, d, "away"), `${sp} ${d} m`).toBe(true);
    expect(escape("boar", 30, "away", OLD)).toBe(false); // (as it was: she walked clear)
  }, 120000);
  it("still misses her if she steps out of its lane at its tell (with the dodge changes off: a heavy's run swings after her, so a blink beats it, below)", () => {
    for (const sp of ["boar", "stag"]) expect(escape(sp, 25, "aside", NO_DODGE), sp).toBe(false);
  }, 120000);
  it("runs her down as she walks aside, a heavy's lane swinging after her (Ed, 2026-10-09: \"heavies can have a higher top speed, but slow acceleration\")", () => {
    expect(D.a.heavy.species).toContain("boar");
    expect(escape("boar", 25, "aside")).toBe(true);
  }, 120000);
  it("is beaten by a blink at the right moment, sideways or straight through, and it stands winded after (Ed, 2026-10-06: \"reward skilful use of blink\")", () => {
    expect(TUNING.fight.charge.miss).toBeGreaterThan(0);
    for (const [sp, how] of [["boar", "side"], ["stag", "through"]] as const) {
      const g = quiet(), c = pick(g, sp, 2, -25, 0), W = g.witches[0], hp0 = W.health.hp;
      let blinked = false, winded = false, ran = false;
      for (let i = 0; i < 6 / STEP; i++) {
        const coming = !!c.charge && (c.charge.from === undefined || g.clock.time >= c.charge.from), near = Math.hypot(c.x - g.witch.x, c.z - g.witch.z);
        if (c.charge) ran = true;
        let ctl: Controls = idle;
        if (coming && !blinked && near < (how === "side" ? 8 : 5)) { blinked = true; const ax = c.x - g.witch.x, az = c.z - g.witch.z, ad = Math.hypot(ax, az) || 1; ctl = how === "side" ? { ...idle, moveZ: 1, dash: true } : { ...idle, moveX: ax / ad, moveZ: az / ad, dash: true }; }
        stepGame(g, ctl, STEP);
        if (c.stunUntil !== undefined && g.clock.time < c.stunUntil) winded = true;
        if (ran && !c.charge) break; // (its charge over: what it does next is another fight, committed strikes and all, tuning dodge.a)
      }
      expect(blinked, sp).toBe(true);
      expect(W.health.hp, `${sp}: blinked ${how}`).toBe(hp0);
      expect(winded, sp).toBe(true);
    }
  }, 120000);
  it("leads a toad's leap to where she's going", () => {
    expect(TUNING.fight.leap.lead).toBeGreaterThan(0);
    const before = { scale: FIGHT.scale, speed: FIGHT.speed, leap: FIGHT.leap };
    try {
      FIGHT.scale = TUNING.fight.scale; FIGHT.speed = TUNING.fight.speed; FIGHT.leap = TUNING.fight.leap;
      const moving = { x: -20, z: 0, moveReadyAt: 0 } as Creature, unled = { ...moving };
      const move = profileOf("toad")!.move!;
      expect(stepLeap(moving, move, 0, 0, true, 0, 8, 0)).toBe("leapt");
      FIGHT.leap = { ...FIGHT.leap, lead: 0 };
      expect(stepLeap(unled, move, 0, 0, true, 0, 8, 0)).toBe("leapt");
      expect(moving.leap!.tx - unled.leap!.tx).toBeCloseTo(8 * (moving.leap!.lands - moving.leap!.at) * TUNING.fight.leap.lead, 8);
      expect(moving.leap!.tx).toBeGreaterThan(unled.leap!.tx);
    } finally { Object.assign(FIGHT, before); }
  }, 120000);
});
