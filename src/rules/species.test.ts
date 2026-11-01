import { describe, expect, it } from "vitest";
import { type Level } from "./creatures";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { MOVEMENT } from "./movement";
import { TUNING, withTuning, type Tuning } from "./tuning";
/** The old attacks (config/combat.json), not each species' own in the grammar (?attacks=old): for the tests that pin one of them. */
const OLD_ATTACKS = withTuning({ attacks: { reactionFloor: 0.45, species: false } });
import { attackOf, guardOf } from "./combat";
import { ARENA_PRESETS, setupArena } from "./arena";
import type { Creature } from "./creatures";
import { withCombatRoles } from "../test/combatRoles";

// Ed's species pass (2026-10-05): a fight profile for every species, and the new signature moves.
const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
/** A quiet game, the witch on the ground away from everything, too tough to knock out. */
function quiet(seed = 77, t: Tuning = TUNING): Game {
  // Retain distant recruits (>150 m), seeded terrain and the multi-seed arena fights for movement comparisons.
  const g = newGame(seed, t);
  g.clock.paused = false;
  const d = g.map.dancefloor;
  g.witch = { ...g.witch, seated: false, x: d.x, z: d.z + 20, mode: "ground", lift: 0 };
  for (const c of g.creatures) if (Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 80) c.gone = true;
  g.witches[0].health.hp = 1e6;
  return g;
}
const pick = (g: Game, species: string, level: Level, dx: number, dz: number) => {
  const w = g.witch, x = w.x + dx, z = w.z + dz;
  const c = g.creatures.find(k => !k.gone && !k.leashed && !k.boss && !(k as unknown as { used?: boolean }).used && Math.hypot(k.x - w.x, k.z - w.z) > 150)!;
  (c as unknown as { used: boolean }).used = true;
  Object.assign(c, { circle: undefined, species, level, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, safeR: undefined, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, rest: 0 });
  c.cell = g.map.cellSafe(w.x, w.z).cell as [number, number];
  g.byArea = null;
  return c;
};
const run = (g: Game, secs: number, each?: () => void, ctl: Controls = idle) => { for (let i = 0; i < Math.round(secs / STEP); i++) { stepGame(g, ctl, STEP); each?.(); } };
const evs = (g: Game, c: Creature, kind: string) => g.combat.events.some(e => e.id === c.id && e.kind === kind && e.at === g.clock.time);
const SPECIES = Object.keys(MOVEMENT.bodies.radius);

describe("fight profiles for every species (Ed's species pass)", () => {
  it("gives every species a profile, each with a speed, and an arena preset for each new move", () => {
    expect(SPECIES.length).toBeGreaterThanOrEqual(30);
    for (const sp of SPECIES) { expect(MOVEMENT.profiles[sp], sp).toBeTruthy(); expect(MOVEMENT.profiles[sp].speed, sp).toBeGreaterThan(0); }
    for (const k of ["swipe", "wide", "pair", "ram", "dig", "block", "flank", "pounce", "weave", "packflank", "otter", "squirrel", "dart", "roll", "slime", "woodlouse", "strike", "moth", "cat"]) expect(ARENA_PRESETS[k], k).toBeTruthy();
  });

  it("has a bear swipe: a heavy blow with a short lunge", () => {
    const a = attackOf("bear", 2)!;
    expect(a.name).toBe("bigswipe");
    expect(a.attack.lunge).toBeLessThan(attackOf("wolf", 2)!.attack.lunge!);
    expect(a.attack.knockback).toBeGreaterThan(attackOf("wolf", 2)!.attack.knockback!);
  });

  it("has a ram back off before it charges, then hit hard", withCombatRoles({ ram: "melee" }, () => {
    const g = quiet(), ram = pick(g, "ram", 2, 14, 0);
    let backed = 0, top = 0, px = ram.x;
    run(g, 4, () => {
      if (ram.charge && ram.charge.from !== undefined && g.clock.time < ram.charge.from) backed = Math.max(backed, ram.x - (g.witch.x + 14));
      if (ram.charge && !ram.charge.braking) top = Math.max(top, Math.abs(ram.x - px) / STEP);
      px = ram.x;
    });
    expect(backed).toBeGreaterThan(1); // it backed away from her first
    expect(top).toBeGreaterThan(25);
  }), 60000);

  it("has stags charge as a pair: side by side, setting off together", withCombatRoles({ stag: "melee" }, () => {
    const g = quiet(), a = pick(g, "stag", 2, 20, -3), b = pick(g, "stag", 2, 20, 3);
    const starts: [number, number][] = [];
    run(g, 5, () => { for (const s of [a, b]) if (s.charge && s.charge.from !== undefined && Math.abs(s.charge.from - (g.clock.time + (MOVEMENT.profiles.stag.move!.windup ?? 0))) < STEP / 2) starts.push([s.id, g.clock.time]); });
    expect(new Set(starts.map(s => s[0])).size).toBe(2);
    expect(Math.abs(starts[0][1] - starts.find(s => s[0] !== starts[0][0])![1])).toBeLessThan(STEP * 1.5);
  }), 60000);

  it("has an elk charge turn in a wider arc than a boar's", withCombatRoles({ elk: "melee" }, () => {
    expect(MOVEMENT.profiles.elk.move!.turn!).toBeLessThan(MOVEMENT.profiles.boar.move!.turn!);
    expect(MOVEMENT.profiles.elk.move!.overshoot!).toBeGreaterThan(MOVEMENT.profiles.boar.move!.overshoot!);
    const g = quiet(), elk = pick(g, "elk", 2, 25, 0);
    let charged = false;
    run(g, 5, () => { if (elk.charge && !elk.charge.braking && elk.charge.from! < g.clock.time) charged = true; });
    expect(charged).toBe(true);
  }), 60000);

  it("has a lynx pounce: a low leap landing its blow on her", withCombatRoles({ lynx: "melee" }, () => {
    const g = quiet(), W = g.witches[0], hp0 = W.health.hp, lynx = pick(g, "lynx", 2, 15, 0);
    let leapt = false, top = 0;
    run(g, 5, () => { if (lynx.leap) { leapt = true; top = Math.max(top, lynx.leap.height); } });
    expect(leapt).toBe(true);
    expect(top).toBeLessThan(MOVEMENT.profiles.toad.move!.height!);
    expect(W.health.hp).toBeLessThan(hp0);
  }), 60000);

  it("has foxes flank round to her back as she runs", () => {
    const g = quiet(), foxes = [0, 1, 2].map(i => pick(g, "fox", 2, -6 + i * 6, 14));
    let behind = 0, n = 0;
    run(g, 6, () => { if (g.clock.time > 3) for (const f of foxes) { n++; if (f.x < g.witch.x) behind++; } }, { ...idle, moveX: 0.6 });
    expect(behind / n).toBeGreaterThan(0.6); // she's heading east: mostly west of her
  }, 60000);

  it("has a snake lie in wait and strike the moment it springs", () => {
    const g = quiet(), sn = pick(g, "snake", 2, 25, 0);
    run(g, 2);
    expect(sn.sprung).toBeUndefined();
    g.witch = { ...g.witch, x: sn.x - 10 };
    let sprungAt = -1, windAt = -1;
    run(g, 2, () => { if (evs(g, sn, "sprung")) sprungAt = g.clock.time; if (windAt < 0 && sprungAt >= 0 && evs(g, sn, "windup")) windAt = g.clock.time; });
    expect(sprungAt).toBeGreaterThan(0);
    expect(windAt - sprungAt).toBeLessThan(0.1);
  }, 60000);

  it("has moths drawn to a light", () => {
    const near = (light: boolean) => {
      const saved = MOVEMENT.profiles.moth.fight;
      if (!light) MOVEMENT.profiles.moth.fight = saved.filter(b => b.kind !== "light");
      // (with the old attacks: a moth's own, the dust it throws, keeps it nearer her and the light's pull shows less, 1.2 m)
      const g = quiet(77, OLD_ATTACKS), moths = [0, 1, 2].map(i => pick(g, "moth", 2, 10, i * 2)), glow = pick(g, "wolf", 2, 16, 20);
      glow.gone = true; g.combat.sounds.set("lamp", { hp: 1e6, max: 1e6, x: glow.x, z: glow.z, radius: 2 });
      let sum = 0, n = 0;
      run(g, 6, () => { if (g.clock.time > 2) for (const m of moths) { sum += Math.hypot(m.x - glow.x, m.z - glow.z); n++; } });
      MOVEMENT.profiles.moth.fight = saved;
      return sum / n;
    };
    expect(near(true)).toBeLessThan(near(false)); // Cue attraction is independent of path shape and its strength is tunable.
  }, 60000);

  it("has a hedgehog roll curled up, taking far less while it rolls", withCombatRoles({ hedgehog: "melee" }, () => {
    const g = quiet(), hh = pick(g, "hedgehog", 2, 16, 0);
    let curled = false;
    run(g, 4, () => { if (hh.charge?.curl) { curled = true; expect(guardOf(hh, "melee", g.clock.time).damage).toBeLessThan(0.5); } });
    expect(curled).toBe(true);
  }), 60000);

  it("has a badger dig in when she's close: rooted, taking less, no knockback", withCombatRoles({ badger: "melee" }, () => {
    const g = quiet(), bd = pick(g, "badger", 2, 4, 0);
    let dugAt = -1, moved = 0, x0 = 0, z0 = 0;
    run(g, 3, () => {
      if (evs(g, bd, "dug")) { dugAt = g.clock.time; x0 = bd.x; z0 = bd.z; }
      if (dugAt >= 0 && bd.dug !== undefined && g.clock.time < bd.dug) { moved = Math.max(moved, Math.hypot(bd.x - x0, bd.z - z0)); const gd = guardOf(bd, "melee", g.clock.time); expect(gd.rooted).toBe(true); expect(gd.damage).toBeLessThan(1); }
    });
    expect(dugAt).toBeGreaterThan(0);
    expect(moved).toBeLessThan(0.3);
  }), 60000);

  it("has beavers brace against shots, blocking them, then slap back", () => {
    let braced = 0, blocked = 0;
    for (const seed of [77, 78, 79, 80, 1, 90210]) { // (over a few fights: in any one, the ravens may happen to shoot the other beaver)
      const g = quiet(seed);
      setupArena(g, "raven*3@2,beaver*2@2");
      const beavers = g.arena!.ids.map(i => g.creatures[i]).filter(c => c.species === "beaver"), ids = new Set(beavers.map(b => b.id));
      run(g, 20, () => { for (const e of g.combat.events) if (e.at === g.clock.time && ids.has(e.id!)) { if (e.kind === "braced") braced++; if (e.kind === "blocked") blocked++; } });
    }
    expect(braced).toBeGreaterThan(0);
    expect(blocked).toBeGreaterThan(0);
  }, 120000);

  it("has a snail leave a slime trail that slows her", withCombatRoles({ snail: "melee" }, () => {
    const g = quiet(77, TUNING), W = g.witches[0];
    const snail = pick(g, "snail", 2, 12, 0);
    let trails = 0;
    run(g, 8, () => { trails = Math.max(trails, g.combat.trails.length); });
    expect(trails).toBeGreaterThan(3);
    // The new waiting route need not cross a stationary witch. Test the slime
    // where it was actually laid, independently of the selected travel path.
    const trail = g.combat.trails.find(trail => trail.from === snail.id)!;
    expect(trail).toBeDefined();
    g.witch = { ...g.witch, x: trail.x, z: trail.z }; run(g, STEP);
    expect(W.slowUntil).toBeDefined();
    expect(W.slowMult).toBeLessThan(1);
  }), 60000);

  it("has otters, stoats, squirrels and dormice nimble: they weave", () => {
    for (const sp of ["otter", "stoat", "squirrel", "dormouse"]) {
      expect(MOVEMENT.profiles[sp].fight.some(b => b.kind === "dodge"), sp).toBe(true);
      expect(MOVEMENT.profiles[sp].accel, sp).toBeGreaterThan(100);
    }
  });
});
