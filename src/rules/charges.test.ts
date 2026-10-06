import { describe, expect, it } from "vitest";
import { type Creature, type Level } from "./creatures";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { TUNING, withTuning, type Tuning } from "./tuning";

// Ed's round 13 (2026-10-06): "Charging and jumping creatures should charge or jump much further. At
// the moment it feels like they always stop short. They should be damaging whenever they're touched
// while in attack mode. Charging creatures should have much more momentum, travelling in wide arcs."
const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const OLD = withTuning({ fight: { ...TUNING.fight, charge: { reach: 1, turn: 1, brake: 1, contact: false, chase: 0 }, leap: { reach: 1, through: -1.5, contact: false, lead: 0 } } });

/** A quiet game, the witch on the ground away from everything, too tough to knock out. */
function quiet(t: Tuning = TUNING): Game {
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
    let hits = 0, last = W.health.hp, charging = false, firstEnd = -1;
    run(g, 6, () => {
      if (boar.charge && boar.charge.from !== undefined && g.clock.time >= boar.charge.from) charging = true;
      if (charging && !boar.charge && firstEnd < 0) firstEnd = g.clock.time;
      if (firstEnd < 0 && W.health.hp < last) hits++;
      last = W.health.hp;
    });
    expect(charging).toBe(true);
    expect(mate.hp ?? Infinity).toBeLessThan(1e9); // (struck: its health set below its whole)
    expect(hits).toBeLessThanOrEqual(1); // (one charge, one hit: the grace, #197)
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
  it("follows her about 30 m past its area's edge, then retreats into its area and roams again, not waiting on the edge", () => {
    expect(TUNING.combat.leaveArea).toBe(30);
    const g = newGame(1000, TUNING), w = g.witches[0];
    g.clock.paused = false; g.party.paused = true;
    const [hx, hy] = g.map.centreCell, cell: [number, number] = [hx + 2, hy], site = g.map.siteOf(cell[0], cell[1]);
    w.body = { ...w.body, seated: false, mode: "ground", lift: 0, x: site.x, z: site.z };
    w.health.hp = 1e6;
    const wolf = g.creatures.find(c => !c.gone && !c.boss && c.level > 0)!;
    Object.assign(wolf, { species: "wolf", level: 2, x: site.x + 10, z: site.z, tx: site.x + 10, tz: site.z, cell, homeX: site.x, homeZ: site.z, anchorX: site.x, anchorZ: site.z, hp: undefined });
    g.byArea = null;
    const inArea = (x: number, z: number) => { const k = g.map.cellSafe(x, z).cell; return k[0] === cell[0] && k[1] === cell[1]; };
    let retreated = false, outFar = 0;
    for (let i = 0; i < 30 / STEP; i++) {
      stepGame(g, { ...idle, moveX: i * STEP < 12 ? -1 : 0 }, STEP); // (she walks 200 m west out of its area, then stands)
      if (wolf.retreat) retreated = true;
      if (!inArea(wolf.x, wolf.z)) outFar = Math.max(outFar, Math.hypot(wolf.x - site.x, wolf.z - site.z));
    }
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
  it("still misses her if she steps out of its lane at its tell", () => {
    for (const sp of ["boar", "stag"]) expect(escape(sp, 25, "aside"), sp).toBe(false);
  }, 120000);
  it("leads a toad's leap to where she's going", () => {
    expect(TUNING.fight.leap.lead).toBeGreaterThan(0);
    expect(escape("toad", 20, "away")).toBe(true);
    expect(escape("toad", 20, "away", withTuning({ fight: { ...TUNING.fight, leap: { ...TUNING.fight.leap, lead: 0 } } }))).toBe(false); // (landing where she was)
  }, 120000);
});
