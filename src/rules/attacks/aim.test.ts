// Creatures' shots aim where she's going (Ed, 2026-11-12: "the preparation time seems long, projectile speed is low, if you're moving
// at all they basically never hit you"; he chose option C with its sub-rules, the three fixes, and the treetops left alone;
// rules/attacks/aim.ts). Headless, on the real engine with her walking as a bot would: a led shot hits a straight walker, a zig-zag
// mostly dodges, the lock holds, the left-out attacks are untouched, a burst keeps its locked aim, the three fixes, ?ranged=old the
// old aim; and in the real fight, a species' shot keeps its own wind-up at the speed floor while the old pack bolt locks as every one.
import { describe, expect, it } from "vitest";
import { cast, newSpells, solveAim, stepSpells, type Hittable, type SpellWorld } from "./engine";
import { aimClass, fanOffsets, intercept, liftedWindup, packTrack, RANGED_DEFAULT, rangedOf, trackFor, wallOffsets, withSpeedFloor, type RangedTuning } from "./aim";
import { reachingFurther } from "./combatWorld";
import { speciesAttack } from "./species";
import { TUNING } from "../tuning";
import { tuningFromLink } from "../../app/linkParams";
import { setupArena } from "../arena";
import { newGame as fullGame, stepGame, STEP, type Controls } from "../game";
import { smallWorld } from "../../test/worlds";
import type { AttackSpec } from "./types";

const DT = 1 / 60, G = TUNING.groundSpeed, FLOOR = TUNING.attacks?.reactionFloor, ON = rangedOf(TUNING), OFF: RangedTuning = { ...ON, on: false };
const K = TUNING.dodge!.b.range * (TUNING.difficulty?.rangedRange ?? 1);
/** A species' attack as the fight throws it at her (rules/combat.ts thrown): reaching further, then (the rule on) the speed floor. */
const atHer = (sp: string, level: number, R = ON): AttackSpec => withSpeedFloor(reachingFurther(speciesAttack(sp, level, FLOOR)!, K), R, G);

type Move = "still" | "across" | "away" | "toward" | "zigzag";
/** One cast at her from `d` m, her walking at her ground speed as `move` says (zig-zag: 45° either side of across, turning every
 *  second from `phase`), cast with the rule `R` as the fight casts it (its wind-up lifted only where the lock needs it). */
function shoot(spec: AttackSpec, { d, move = "still", level = 1, R = ON, phase = 0, until = 6, opts = true }: { d: number; move?: Move; level?: number; R?: RangedTuning; phase?: number; until?: number; opts?: boolean }) {
  const her = { x: d, z: 0, vx: 0, vz: 0 }, caster = { x: 0, z: 0 };
  const dir = (t: number): [number, number] => {
    switch (move) {
      case "across": return [0, 1];
      case "away": return [1, 0];
      case "toward": return [-1, 0];
      case "zigzag": { const k = Math.floor(t + phase) % 2 === 0 ? 1 : -1; return [k * Math.SQRT1_2, Math.SQRT1_2]; }
      default: return [0, 0];
    }
  };
  const witch = (): Hittable => ({ kind: "witch", id: 0, x: her.x, z: her.z, r: 0.3, side: "party", vx: her.vx, vz: her.vz });
  let now = 0, hitAt: number | null = null;
  const W: SpellWorld = {
    seed: 3,
    near: (x, z, r) => (Math.hypot(her.x - x, her.z - z) <= r + 1 ? [witch()] : []),
    hostile: (_side, t) => t.kind === "witch",
    harm: (t, damage) => { if (t.kind === "witch" && damage > 0 && hitAt === null) hitAt = now; },
    where: (kind, id) => (kind === "witch" ? her : kind === "creature" && id === 1 ? caster : null),
  };
  [her.vx, her.vz] = dir(0).map(v => v * G);
  const S = newSpells(3), track = trackFor(spec, level, R);
  let windup = spec.cast?.windup ?? 0.6;
  if (track) windup = liftedWindup(windup, intercept(her, windup, track.lead, (qx, qz) => solveAim(spec, 0, 0, qx, qz, 1, W).time).flight, track);
  cast(S, W, spec, "t", { id: 1, x: 0, z: 0, side: "wild", species: "t", heading: 0 }, witch(), 0, 1, windup, opts ? { track, centre: R.on } : undefined);
  const headings: number[] = [];
  for (now = DT; now <= until + 1e-9 && hitAt === null; now += DT) {
    [her.vx, her.vz] = dir(now).map(v => v * G);
    her.x += her.vx * DT; her.z += her.vz * DT;
    stepSpells(S, W, {}, now, DT);
    for (const b of S.bodies) if (b.alive && b.depth === 0 && !headings[b.id]) headings[b.id] = Math.atan2(b.hz, b.hx);
  }
  return { hit: hitAt !== null, hitAt, lockAt: track?.at, windup, track, S, headings: headings.filter(h => h !== undefined) };
}
/** The share of `n` zig-zags (phases spread evenly) a cast hits. */
const zigzag = (spec: AttackSpec, d: number, level: number, n = 24) => { let h = 0; for (let i = 0; i < n; i++) if (shoot(spec, { d, move: "zigzag", level, phase: i / n }).hit) h++; return h / n; };

describe("shots aim where she's going (the ranged rule)", () => {
  it("a led shot hits her walking straight across, away or at it; the old aim missed her across", () => {
    for (const [sp, level, d] of [["dormouse", 1, 16], ["dormouse", 2, 17], ["fox", 2, 16], ["squirrel", 1, 17]] as const) {
      // (the fox's curving bolt can't reach where she'd be walking away from 16 m: 50 m off, past its 48 m; nor could it before)
      for (const move of ["still", "across", "away", "toward"] as const) if (!(sp === "fox" && move === "away")) expect(shoot(atHer(sp, level), { d, move, level }).hit, `${sp} ${level} ${move}`).toBe(true);
      expect(shoot(atHer(sp, level, OFF), { d, move: "across", level, R: OFF }).hit, `${sp} ${level} old, across`).toBe(false);
    }
  });

  it("a zig-zag every second mostly dodges it", () => {
    for (const [sp, level, d] of [["dormouse", 1, 16], ["dormouse", 2, 17], ["squirrel", 2, 19], ["fox", 1, 14]] as const) expect(zigzag(atHer(sp, level), d, level), `${sp} ${level}`).toBeLessThan(0.6);
  });

  it("locks at least ranged.commit before it lets go and ranged.lock (by level) before it can reach her; an area ranged.areaLock ahead", () => {
    for (const [sp, level, d] of [["dormouse", 1, 8], ["dormouse", 1, 16], ["dormouse", 2, 10], ["marten", 2, 16], ["squirrel", 1, 10]] as const) {
      const r = shoot(atHer(sp, level), { d, move: "across", level });
      expect(r.hit).toBe(true);
      expect(r.windup - r.lockAt!).toBeGreaterThanOrEqual(ON.commit - 1e-9);
      expect(r.hitAt! - r.lockAt!, `${sp} ${level} at ${d} m`).toBeGreaterThanOrEqual((level === 1 ? ON.lock.young : ON.lock.adult) - DT);
    }
    const mole = shoot(atHer("mole", 1), { d: 14, move: "across", level: 1 });
    expect(mole.hit).toBe(true);
    expect(mole.hitAt! - mole.lockAt!).toBeGreaterThanOrEqual(ON.areaLock - DT);
    // (an old pack bolt winds up 0.35 s, dodge.b.windup: lifted, so its lock still comes the youth's 0.75 s before it can reach her)
    const T = packTrack("shot", 1, ON)!;
    expect(liftedWindup(0.35, 0.15, T)).toBeCloseTo(0.6, 9);
    expect(liftedWindup(0.6, 0.4, T)).toBe(0.6); // (a wind-up that holds its lock already stays as it was)
  });

  it("leaves homing, spirals, boomerangs, beams and packmate interplay out of the lead and the speed floor", () => {
    for (const sp of ["owl", "hydra", "featheredserpent", "raccoon", "redpanda", "salamander", "sphinx", "frostwyrm", "unicorn", "raven", "crab"]) {
      for (const level of [1, 2]) {
        const a = speciesAttack(sp, level, FLOOR)!, far = reachingFurther(a, K);
        expect(aimClass(a), sp).toBeNull();
        expect(trackFor(a, level, ON), sp).toBeUndefined();
        expect(withSpeedFloor(far, ON, G), sp).toBe(far);
      }
    }
    // (the owl's homing bolt flies as before, rule or none)
    const owlNew = shoot(atHer("owl", 1), { d: 20, move: "across" }), owlOld = shoot(atHer("owl", 1, OFF), { d: 20, move: "across", R: OFF });
    expect(owlNew.hit).toBe(owlOld.hit); expect(owlNew.hitAt).toBe(owlOld.hitAt);
  });

  it("a burst's later shots keep the first shot's locked aim (the old one re-aimed each at where she is)", () => {
    const r = shoot(atHer("marten", 2), { d: 16, move: "across", level: 2, until: 3 }), old = shoot(atHer("marten", 2, OFF), { d: 16, move: "across", level: 2, R: OFF, until: 3 });
    expect(r.headings.length).toBeGreaterThanOrEqual(2);
    for (const h of r.headings) expect(h).toBeCloseTo(r.headings[0], 6);
    expect(Math.abs(old.headings[1] - old.headings[0])).toBeGreaterThan(0.01);
  });

  it("fixes an adult's even fan: one claw on the aim, so the tiger's four hit her standing (the old fan's hole let her be)", () => {
    expect(fanOffsets(4, 1, true, 1).some(o => Math.abs(o) < 1e-9)).toBe(true);
    expect(fanOffsets(4, 1, false).some(o => Math.abs(o) < 1e-9)).toBe(false);
    expect(fanOffsets(3, 1, true)).toEqual(fanOffsets(3, 1, false)); // (an odd fan as it was)
    for (const d of [6, 8, 10]) {
      expect(shoot(atHer("tiger", 2), { d, level: 2 }).hit, `new at ${d} m`).toBe(true);
      if (d > 6) expect(shoot(atHer("tiger", 2, OFF), { d, level: 2, R: OFF }).hit, `old at ${d} m`).toBe(false); // (at 6 m the old hole was narrow enough to touch her)
    }
  });

  it("fixes the young rhino's logs: the gap is beside her, a log on her (the old wall straddled her standing)", () => {
    expect(wallOffsets(3, 3, [1], true)).toContain(0);
    expect(wallOffsets(3, 3, [1], false)).toEqual([-3, 3]);
    expect(wallOffsets(3, 2.5, [], true)).toEqual(wallOffsets(3, 2.5, [], false)); // (a wall with a log in the middle as it was)
    for (const d of [10, 14]) {
      expect(shoot(atHer("rhino", 1), { d }).hit, `new at ${d} m`).toBe(true);
      expect(shoot(atHer("rhino", 1, OFF), { d, R: OFF }).hit, `old at ${d} m`).toBe(false);
    }
  });

  it("?ranged=old: the rule off, every cast aims as before, exactly", () => {
    expect(tuningFromLink(new URLSearchParams("ranged=old")).tuning.ranged?.on).toBe(false);
    expect(tuningFromLink(new URLSearchParams("")).tuning.ranged?.on).toBe(true);
    expect(RANGED_DEFAULT).toEqual(TUNING.ranged);
    for (const [sp, level] of [["dormouse", 1], ["marten", 2], ["tiger", 2], ["rhino", 1], ["squirrel", 1], ["mole", 2], ["fox", 1]] as const) {
      const spec = atHer(sp, level, OFF);
      expect(spec).toEqual(reachingFurther(speciesAttack(sp, level, FLOOR)!, K)); // (no speed floor)
      for (const move of ["across", "zigzag"] as const) {
        const a = shoot(spec, { d: 15, move, level, R: OFF }), b = shoot(spec, { d: 15, move, level, opts: false }); // (b: cast as before this rule)
        expect(a.hitAt).toBe(b.hitAt); expect(a.headings).toEqual(b.headings); expect(a.windup).toBe(b.windup);
      }
    }
  });
});

const newGame = smallWorld(fullGame, "The ranged rule's fight checks use one injected arena creature 18 m from her, independent of world extent.");
const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };

describe("the ranged rule in the real fight", () => {
  it("a species' shot keeps its own wind-up (not dodge.b.windup), flies at the speed floor (not dodge.b.speed), and its caster holds still from the lock", () => {
    const g = newGame(5, TUNING);
    g.clock.paused = false; g.party.paused = true;
    setupArena(g, "dormouse*1@1", { wildOnly: true });
    const c = g.creatures[g.arena!.ids[0]], W = g.witches[0];
    let windups = 0, bolts = 0, lockedAt: { x: number; z: number } | null = null, held = 0;
    const seen = new Set<number>();
    for (let i = 0; i < 20 / STEP; i++) {
      W.health.hp = 1e6; W.body = { ...W.body, x: c.x - 16, z: c.z };
      stepGame(g, idle, STEP);
      const f = c.fight;
      if (f && f.windupUntil > 0 && f.windupAt !== undefined && f.aim?.at === f.windupAt) {
        if (!seen.has(f.windupAt)) { seen.add(f.windupAt); windups++; expect(f.windupUntil - f.windupAt).toBeGreaterThanOrEqual(speciesAttack("dormouse", 1, FLOOR)!.cast!.windup! - 1e-9); lockedAt = null; } // (its own, or its pack shooters' longer: never dodge.b.windup)
        if (f.aim.track.locked) { if (!lockedAt) lockedAt = { x: c.x, z: c.z }; else { expect(Math.hypot(c.x - lockedAt.x, c.z - lockedAt.z)).toBeLessThan(1e-6); held++; } }
      }
      for (const b of g.combat.spells?.bodies ?? []) if (b.alive && b.source === c.id && b.depth === 0 && !seen.has(-b.id)) { seen.add(-b.id); bolts++; expect(b.v).toBeCloseTo(ON.speedFloor * G, 6); }
    }
    expect(windups).toBeGreaterThan(0); expect(bolts).toBeGreaterThan(0); expect(held).toBeGreaterThan(0);
  }, 120000);

  it("the old pack bolt (a stoat in a shooter's role) flies at least the speed floor and locks as every shot does, its 0.35 s wind-up lifted for it", () => {
    const g = newGame(5, TUNING);
    g.clock.paused = false; g.party.paused = true;
    setupArena(g, "stoat*1@1", { wildOnly: true });
    const c = g.creatures[g.arena!.ids[0]], W = g.witches[0];
    let shots = 0, locks = 0;
    const seen = new Set<number>();
    for (let i = 0; i < 30 / STEP && shots < 2; i++) {
      W.health.hp = 1e6; W.body = { ...W.body, x: c.x - 8, z: c.z };
      stepGame(g, idle, STEP);
      const f = c.fight;
      if (f?.aim && f.aim.at === f.windupAt && f.aim.track.locked && !seen.has(f.windupAt!)) {
        seen.add(f.windupAt!); locks++;
        expect(f.windupUntil - f.aim.track.at!).toBeGreaterThanOrEqual(ON.commit - 1e-9);
        expect(f.windupUntil - f.windupAt!).toBeGreaterThan(TUNING.dodge!.b.windup); // (lifted: 8 m at 38.5 m/s is 0.2 s of flight)
      }
      for (const s of g.combat.shots) if (s.from === c.id && !seen.has(-1 - s.id) && /:ranged:/.test(s.attack)) { seen.add(-1 - s.id); shots++; expect(Math.hypot(s.vx, s.vz)).toBeGreaterThanOrEqual(ON.speedFloor * G - 1e-6); }
    }
    expect(shots).toBeGreaterThan(0); expect(locks).toBeGreaterThan(0);
  }, 120000);
});
