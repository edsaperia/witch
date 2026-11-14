// The hare stamps, then sits; the badger's barge throws her far (Ed, 2026-11-13, after the attack legibility audit,
// docs/plans/attack-legibility-audit.md: "Stamp, then sit 0.8 s"; "20m"; "let's start with big numbers and dial it down, at least we
// can then perceive the effects!"). The audit found the hare's own stamp almost never fired (it bounded past her and out the other
// side, never within the 4 m its stamp starts from) and the badger's barge threw her 6.4 m against every blow's 2.5.
import { describe, expect, it } from "vitest";
import { setupArena } from "./arena";
import { actionsOf } from "./combat/actions";
import { STEP, stepGame, treehouseWall, type Controls } from "./game";
import { knockOf, knockWitch, newKnock, stepWitchKnock, stunned } from "./knock";
import { TUNING } from "./tuning";
import { newWitch } from "./witch";
import { preppedGame } from "../test/preppedGame"; // (games on a map made once a file from its prep)

const STILL: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };

describe("the hare stamps, then sits (Ed, 2026-11-13)", () => {
  it("has no bolt: its strike is its own stamp", () => {
    const acts = actionsOf("hare");
    expect(acts.some(a => a.delivery === "ranged")).toBe(false);
    expect(acts.find(a => a.delivery === "melee")?.id).toBe("stamp");
  });

  it("a youth bounds in, stamps her, and sits still for hareStamp.sit seconds after each stamp", () => {
    const g = preppedGame(5, TUNING), w = g.witches[0];
    g.clock.paused = false; g.party.paused = true;
    setupArena(g, "hare*1@1", { wildOnly: true });
    const c = g.creatures[g.arena!.ids[0]];
    let stamps = 0, blows = 0, hp = (w.health.hp = 1e6), sitting: { from: number; x: number; z: number; until: number } | null = null;
    const sits: number[] = [];
    for (let i = 0; i < 30 / STEP; i++) {
      w.health.hp = hp = Math.max(w.health.hp, 1e5);
      stepGame(g, STILL, STEP);
      if (w.health.hp < hp) blows++;
      const time = g.clock.time, cast = g.combat.spells?.tells.get(c.id);
      if (cast && cast.pose === "stamp" && Math.abs(cast.from - (time - STEP)) < STEP / 2) stamps++; // (a new stamp's tell)
      if (c.sitUntil !== undefined && !sitting) { sitting = { from: time, x: c.x, z: c.z, until: c.sitUntil }; expect(c.hop).toBeUndefined(); }
      if (sitting && c.sitUntil !== undefined) { // (where it sat down, to the step: no bound, no dodge, no shove)
        expect(Math.hypot(c.x - sitting.x, c.z - sitting.z)).toBeLessThan(1e-6);
        expect(c.hop).toBeUndefined(); expect(c.fight?.windupUntil ?? 0).toBe(0);
      }
      if (sitting && c.sitUntil === undefined) { sits.push(time - sitting.from); sitting = null; }
    }
    expect(stamps).toBeGreaterThanOrEqual(3); // (about one a round: before, none)
    expect(blows).toBeGreaterThanOrEqual(2); // (she stood in them)
    expect(sits.length).toBeGreaterThanOrEqual(3);
    for (const s of sits) { expect(s).toBeGreaterThan(TUNING.hareStamp!.sit - 2 * STEP); expect(s).toBeLessThan(TUNING.hareStamp!.sit + 3 * STEP); }
  }, 120000);
});

describe("the badger's barge throws her far (Ed, 2026-11-13: \"20m\")", () => {
  const B = { minX: -1e4, maxX: 1e4, minZ: -1e4, maxZ: 1e4 }, BB = TUNING.badgerBarge!;
  const barge = { x: -1, z: 0, knockback: 7, rams: false, metres: BB.throw, far: true, stagger: BB.stagger };

  it("in the game, nobody watching its attacks: a badger's barge on her standing still throws her badgerBarge.throw metres", () => {
    // (the first build threw her 20 m only while a tool observed the attacks, rules/attackObservation.ts: unobserved, land dropped the
    // blow's context, which is how the barge is known; the clip of the real game showed 6.3 m)
    for (const level of [1, 2]) {
      const g = preppedGame(5, TUNING), w = g.witches[0], throws: number[] = [];
      g.clock.paused = false; g.party.paused = true;
      setupArena(g, `badger*1@${level}`, { wildOnly: true });
      let at = -Infinity;
      for (let i = 0; i < 40 / STEP && throws.length < 3; i++) {
        w.health.hp = 1e6;
        stepGame(g, STILL, STEP);
        const k = w.knock;
        if (k && k.at !== at && Number.isFinite(k.at)) { at = k.at; throws.push(Math.hypot(k.kx, k.kz) / TUNING.witch.knock.ease); } // (its speed as it begins is its metres times the ease: rules/knock.ts)
      }
      expect(throws.some(m => Math.abs(m - BB.throw) < 0.5), `level ${level}: ${throws.map(m => m.toFixed(1))}`).toBe(true);
    }
  }, 240000);

  it("its throw is past the cap on the others, and its stagger its own", () => {
    const k = knockOf(barge, TUNING);
    expect(k.metres).toBe(BB.throw); expect(k.metres).toBeGreaterThan(TUNING.witch.knock.max);
    expect(k.stun).toBe(BB.stagger);
    // (a pack's ram, exact metres but not far, is still held to the cap)
    expect(knockOf({ ...barge, far: false, stagger: undefined }, TUNING).metres).toBe(TUNING.witch.knock.max);
  });

  it("she really covers it, quickly, and has her feet again about as she lands", () => {
    const k = newKnock();
    let body = newWitch(0, 0), at90 = Infinity;
    knockWitch(k, body, barge, 0, TUNING);
    for (let i = 0; i < 3 / STEP; i++) { body = stepWitchKnock(k, body, STEP, TUNING, B, () => true); if (body.x >= BB.throw * 0.9 && !Number.isFinite(at90)) at90 = (i + 1) * STEP; }
    expect(body.x).toBeGreaterThan(BB.throw * 0.97); expect(body.x).toBeLessThan(BB.throw * 1.01); expect(body.z).toBeCloseTo(0, 6);
    expect(at90).toBeLessThan(0.3); // (nine tenths of it in under a third of a second)
    expect(stunned(k, BB.stagger - 0.01)).toBe(true); expect(stunned(k, BB.stagger + 0.01)).toBe(false);
  });

  it("lands clear of what's solid, and stops at a wall in her way", () => {
    // (a trunk where she'd come to rest: nudged clear of it)
    const k = newKnock(), solid = (x: number, z: number) => Math.hypot(x - BB.throw, z) >= 1.2;
    let body = newWitch(0, 0);
    knockWitch(k, body, barge, 0, TUNING);
    for (let i = 0; i < 3 / STEP; i++) body = stepWitchKnock(k, body, STEP, TUNING, B, solid);
    expect(solid(body.x, body.z)).toBe(true); expect(Math.hypot(body.x - BB.throw, body.z)).toBeLessThan(3);
    // (a wall across her way at x = 8: she stops there, her throw over)
    const k2 = newKnock(), wall = (x0: number, z0: number, x1: number, z1: number) => (x0 < 8 && x1 >= 8 ? { x: 8, z: z0 + ((z1 - z0) * (8 - x0)) / (x1 - x0) } : null);
    let b2 = newWitch(0, 0);
    knockWitch(k2, b2, barge, 0, TUNING);
    for (let i = 0; i < 3 / STEP; i++) b2 = stepWitchKnock(k2, b2, STEP, TUNING, B, () => true, wall);
    expect(b2.x).toBeCloseTo(8, 6); expect(k2.kx).toBe(0);
  });

  it("never throws her through the treehouse, or off the island", () => {
    const g = preppedGame(5, TUNING), T = g.map.treehouse, R = TUNING.dash.clear.treehouse;
    // (the wall: a throw across the treehouse stops at its near side; one past it, or from inside it, isn't stopped)
    const met = treehouseWall(g, T.x - 12, T.z, T.x + 8, T.z);
    expect(met).not.toBeNull(); expect(met!.x).toBeLessThan(T.x - R); expect(met!.x).toBeGreaterThan(T.x - R - 0.2);
    expect(treehouseWall(g, T.x - 12, T.z + R + 1, T.x + 8, T.z + R + 1)).toBeNull();
    expect(treehouseWall(g, T.x, T.z, T.x + 8, T.z)).toBeNull();
    // (the whole throw, in the game: from 6 m short of it, thrown at it, she ends on its near side and clear of it)
    const w = g.witches[0], k = (w.knock = newKnock());
    w.body = { ...w.body, seated: false, mode: "ground", lift: 0, x: T.x - R - 6, z: T.z };
    g.clock.paused = false; g.party.paused = true;
    knockWitch(k, w.body, { ...barge, x: w.body.x - 1, z: w.body.z }, g.herTime, TUNING);
    for (let i = 0; i < 2 / STEP; i++) stepGame(g, STILL, STEP);
    expect(w.body.x).toBeLessThan(T.x); expect(Math.hypot(w.body.x - T.x, w.body.z - T.z)).toBeGreaterThanOrEqual(R - 1e-6);
    // (off the island: thrown outward from near its edge, she is kept on it)
    const bounds = g.map.bounds, edge = { ...newWitch(bounds.maxX - 3, (bounds.minZ + bounds.maxZ) / 2) }, k3 = newKnock();
    let b3 = edge;
    knockWitch(k3, b3, { ...barge, x: b3.x - 1, z: b3.z }, 0, TUNING);
    for (let i = 0; i < 2 / STEP; i++) b3 = stepWitchKnock(k3, b3, STEP, TUNING, bounds, () => true);
    expect(b3.x).toBeLessThanOrEqual(bounds.maxX + 1e-6);
  }, 120000);
});
