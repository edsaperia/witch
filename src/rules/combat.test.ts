import { describe, expect, it } from "vitest";
import { attackOf, COMBAT, maxHp } from "./combat";
import { LEGEND, type Creature, type Level } from "./creatures";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { TUNING, type Tuning } from "./tuning";
import { AREA_TYPES } from "./map";
import { canEat, feed } from "./berries";
import { invitable } from "./leash";
import { hurt, knockOut, newHealth, repair } from "./knockout";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
const run = (g: Game, secs: number, c = idle) => { for (let i = 0; i < Math.round(secs / STEP); i++) stepGame(g, c, STEP); };
/** A game with the witch off her seat, on the ground, somewhere quiet (no creature within 60 m). */
function quiet(t: Tuning = TUNING): Game {
  const g = newGame(77, t);
  g.clock.paused = false;
  const d = g.map.dancefloor;
  g.witch = { ...g.witch, seated: false, x: d.x, z: d.z + 20, mode: "ground", lift: 0 };
  for (const c of g.creatures) if (Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 60) c.gone = true; // out of the way
  return g;
}
/** Put a creature at (x, z) as a given kind and level, wild or in the witch's party. */
function place(g: Game, i: number, species: string, level: Level, x: number, z: number, party = false): Creature {
  const c = g.creatures.find(k => !k.gone && !k.leashed && !k.boss && k.id >= i && Math.hypot(k.x - g.witch.x, k.z - g.witch.z) > 80)!;
  Object.assign(c, { species, level, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, safeR: undefined, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, rest: 0 });
  c.cell = g.map.cellSafe(x, z).cell as [number, number];
  if (party) { c.leashed = true; g.leash.stack.push(c.id); }
  g.byArea = null;
  return c;
}

describe("combat (Stage 4)", () => {
  it("gives babies no attack, the young one, adults a stronger one with a modifier, legends the quake", () => {
    for (const sp of ["wolf", "owl"]) {
      expect(attackOf(sp, 0)).toBeNull();
      const y = attackOf(sp, 1)!, a = attackOf(sp, 2)!, l = attackOf(sp, LEGEND)!;
      expect(a.damage / a.attack.cooldown).toBeGreaterThan(y.damage / y.attack.cooldown);
      expect(y.attack.modifier).toBe("none");
      expect(a.attack.modifier).not.toBe("none");
      expect(l.attack.delivery).toBe("quake");
      expect(l.attack.windup).toBeGreaterThan(a.attack.windup); // slow and heavy
    }
    expect(attackOf("moth", 1)!.attack.delivery).toBe("shot");
    expect(attackOf("toad", 1)!.attack.delivery).toBe("pulse"); // (Stage 5: the toad slams as it lands, the bat screeches)
    expect(attackOf("owl", 1)!.attack.delivery).toBe("lob"); // (Stage 5: the owl lobs, the salamander and spider beam)
    expect(attackOf("salamander", 1)!.attack.delivery).toBe("beam");
    expect(attackOf("wolf", 1)!.attack.delivery).toBe("melee");
  });

  it("gives every attack of a level the same power budget (damage a second)", () => {
    for (const level of [1, 2, 3] as Level[]) {
      const rates = AREA_TYPES.map(a => { const k = attackOf(a.creature, level)!; return k.damage / k.attack.cooldown / (k.attack.factor ?? 1); }); // (each delivery's factor allows for misses and area hits)
      for (const r of rates) expect(r).toBeCloseTo(COMBAT.levels.dps[level]);
    }
  });

  it("party animals and wild ones of other kinds fight until one side is beaten: the wild one runs off the map", () => {
    const g = quiet(), w = g.witch;
    const mine = place(g, 0, "wolf", 2, w.x + 2, w.z, true), wild = place(g, 0, "boar", 1, w.x + 4, w.z);
    g.witch = { ...g.witch, mode: "treetop", lift: 1 }; // (on the ground she'd chat the boar into her party)
    run(g, 40);
    expect(mine.hp).toBeLessThan(maxHp(2)); // it was hit too
    expect(wild.fleeUntil).toBeTruthy(); // running for the map's edge (Ed: beaten creatures run off the map)
    const x0 = wild.x, z0 = wild.z; run(g, 3);
    expect(Math.hypot(wild.x - x0, wild.z - z0)).toBeGreaterThan(5);
    expect(wild.fight).toBeUndefined();
    expect(mine.gone).toBeFalsy();
    expect(g.leash.stack).toContain(mine.id);
  }, 60000);

  it("loses a beaten party animal for the run: it runs off the map, off its leash", () => {
    const g = quiet(), w = g.witch;
    const mine = place(g, 0, "hedgehog", 1, w.x + 2, w.z, true);
    place(g, 0, "bear", 2, w.x + 4, w.z); place(g, 0, "bear", 2, w.x + 3, w.z + 2);
    g.witch = { ...g.witch, mode: "treetop", lift: 1 }; // out of reach herself
    run(g, 60);
    expect(mine.fleeUntil).toBeTruthy();
    expect(mine.leashed).toBe(false);
    expect(g.leash.stack).not.toContain(mine.id);
  }, 60000);

  it("keeps a truce between creatures of the same kind, whatever side", () => {
    const g = quiet(), w = g.witch;
    const mine = place(g, 0, "wolf", 2, w.x + 2, w.z, true), wild = place(g, 0, "wolf", 2, w.x + 3, w.z);
    g.witch = { ...g.witch, mode: "treetop", lift: 1 };
    run(g, 15);
    expect(mine.hp ?? maxHp(2)).toBe(maxHp(2));
    expect(wild.hp ?? maxHp(2)).toBe(maxHp(2));
  }, 60000);

  it("babies never attack; wild young and up shoot at the witch on the ground, never over the treetops", () => {
    const g = quiet(), w = g.witch;
    place(g, 0, "hare", 0, w.x + 3, w.z);
    run(g, 10);
    expect(g.witches[0].health.hp).toBe(TUNING.witchHealth.hits);
    const owl = place(g, 0, "owl", 1, w.x + 8, w.z);
    place(g, 0, "owl", 1, w.x - 8, w.z); // (two: the one she chats with holds its fire on her)
    g.witch = { ...g.witch, mode: "treetop", lift: 1 };
    run(g, 8);
    expect(g.witches[0].health.hp).toBe(TUNING.witchHealth.hits);
    g.witch = { ...g.witch, mode: "ground", lift: 0 };
    run(g, 8);
    expect(g.witches[0].health.hp).toBeLessThan(TUNING.witchHealth.hits);
    expect(owl.gone).toBeFalsy();
  }, 60000);

  it("keeps the wild ones' shots off their own kind and their own side", () => {
    const g = quiet(), w = g.witch;
    const a = place(g, 0, "owl", 2, w.x + 8, w.z), b = place(g, 0, "toad", 2, w.x + 4, w.z); // the toad between the owl and her
    run(g, 9); // (before she's chatted the toad into her party)
    expect(a.hp ?? maxHp(2)).toBe(maxHp(2));
    expect(b.hp ?? maxHp(1)).toBe(maxHp(1));
  }, 60000);
});

describe("the witch's health (Ed, 2026-10-04)", () => {
  it("takes three hits; one comes back every repairTime seconds, the timer starting over at each hit", () => {
    const h = newHealth(TUNING), R = TUNING.witchHealth.repairTime;
    expect(h.hp).toBe(3);
    expect(hurt(h, 0, TUNING)).toBe(false);
    expect(hurt(h, 5, TUNING)).toBe(false);
    repair(h, 5 + R - 1, TUNING);
    expect(h.hp).toBe(1); // not yet
    repair(h, 5 + R, TUNING);
    expect(h.hp).toBe(2); // one back, 20 s after the last hit
    expect(hurt(h, 30, TUNING)).toBe(false); // hit again: the timer starts over
    repair(h, 5 + 2 * R, TUNING);
    expect(h.hp).toBe(1);
    repair(h, 30 + R, TUNING);
    expect(h.hp).toBe(2);
    repair(h, 30 + 2 * R, TUNING);
    expect(h.hp).toBe(3);
    hurt(h, 100, TUNING); hurt(h, 101, TUNING);
    expect(hurt(h, 102, TUNING)).toBe(true); // the third: knocked out
  });
});

describe("knocked out (Ed, 2026-10-04)", () => {
  const withTuning = (patch: (t: Tuning) => void): Tuning => { const t = JSON.parse(JSON.stringify(TUNING)) as Tuning; patch(t); return t; };
  /** Three on her leash (a legend among them, bottom of the stack last) and one parked at a sigil; down to her last hit, an owl in range. */
  function setUp(t: Tuning = TUNING) {
    const g = quiet(t), w = g.witch;
    const a = place(g, 0, "wolf", 1, w.x - 2, w.z + 1, true), b = place(g, 0, "fox", 2, w.x - 3, w.z + 1, true), l = place(g, 0, "stag", LEGEND, w.x - 4, w.z + 1, true);
    const parked = place(g, 0, "badger", 1, w.x - 30, w.z, true);
    g.leash.stack = g.leash.stack.filter(id => id !== parked.id);
    g.leash.placed.push({ id: parked.id, x: parked.x, z: parked.z, at: 0 });
    // Knocked out now (a hit at her last point does this: tested below).
    const W = g.witches[0];
    W.health.hp = 0; W.ko = knockOut(W.leash, g.creatures, g.clock.time, t);
    return { g, a, b, l, parked };
  }

  it("lets her stack go from the bottom up, a second each; parked ones stay hers; then she's back at the treehouse, whole", () => {
    const { g, a, b, l, parked } = setUp(), W = g.witches[0];
    expect(W.ko).not.toBeNull();
    const down = g.clock.time, bottomFirst = [l.id, b.id, a.id]; // stack order a, b, l: l is the bottom
    const freed = new Map<number, number>();
    for (let i = 0; i < 10 / STEP && W.ko; i++) {
      stepGame(g, { moveX: 1, moveZ: 0, toggleMode: true, zoom: 0, dash: true }, STEP); // input is ignored meanwhile
      for (const c of [a, b, l]) if (!c.leashed && !freed.has(c.id)) freed.set(c.id, g.clock.time - down);
    }
    expect([...freed.keys()]).toEqual(bottomFirst);
    const times = bottomFirst.map(id => freed.get(id)!);
    times.forEach((s, i) => expect(s).toBeCloseTo((i + 1) * TUNING.knockout.releaseEach, 1));
    expect(parked.leashed).toBe(true);
    expect(g.leash.placed.map(p => p.id)).toContain(parked.id);
    expect(W.ko).toBeNull();
    expect(Math.hypot(g.witch.x - g.map.start.x, g.witch.z - g.map.start.z)).toBeLessThan(0.5);
    expect(W.health.hp).toBe(TUNING.witchHealth.hits);
    // Each let go walks off, neutral, toward an area of its own kind (still invitable on the way).
    for (const c of [a, b, l]) {
      expect(c.wanderTo).toBeDefined();
      expect(AREA_TYPES[g.map.typeOf(c.wanderTo!.cell[0], c.wanderTo!.cell[1])].creature).toBe(c.species);
      expect(c.fight?.target ?? null).toBeNull();
    }
  }, 120000);

  it("keeps her legends if knockout.legendsLoyal: they come home with her", () => {
    const { g, l } = setUp(withTuning(t => { t.knockout.legendsLoyal = true; })), W = g.witches[0];
    for (let i = 0; i < 30 / STEP && (W.ko || g.clock.time < 1); i++) stepGame(g, idle, STEP);
    expect(l.leashed).toBe(true);
    expect(Math.hypot(l.x - g.map.start.x, l.z - g.map.start.z)).toBeLessThan(8);
  }, 120000);

  it("turns those let go into wild creatures of their kind's area when they get there, keeping their level", () => {
    const { g, b } = setUp(), W = g.witches[0];
    for (let i = 0; i < 30 / STEP && (W.ko || g.clock.time < 1); i++) stepGame(g, idle, STEP);
    const to = b.wanderTo!;
    b.x = to.x + 5; b.z = to.z; // nearly there
    run(g, 10);
    expect(b.wanderTo).toBeUndefined();
    expect(b.cell).toEqual(to.cell);
    expect(b.level).toBe(2);
    expect(b.leashed).toBe(false);
  }, 120000);
});

describe("a hit at her last point", () => {
  it("knocks her out", () => {
    const g = quiet(), w = g.witch;
    g.witches[0].health.hp = 1;
    place(g, 0, "owl", 2, w.x + 11, w.z); place(g, 0, "owl", 2, w.x - 11, w.z); // (two: the one she chats with holds its fire on her)
    for (let i = 0; i < 20 / STEP && !g.witches[0].ko; i++) stepGame(g, idle, STEP);
    expect(g.witches[0].ko).not.toBeNull();
    expect(g.koEvents.length + 1).toBeGreaterThan(0);
  }, 60000);
});

describe("inviting under fire (Ed, 2026-10-04)", () => {
  it("keeps a chat's progress when she's hit (losing a hit is the cost)", () => {
    const g = quiet(), w = g.witch;
    place(g, 0, "fox", 2, w.x + 5, w.z); // an adult fox: a long chat
    place(g, 0, "owl", 1, w.x - 9, w.z);
    let hits = 0, last = TUNING.witchHealth.hits, prev = 0;
    for (let i = 0; i < 8 / STEP; i++) {
      stepGame(g, idle, STEP);
      const hp = g.witches[0].health.hp, t = g.leash.talk?.t ?? 0;
      if (hp < last) { hits++; expect(t).toBeGreaterThanOrEqual(prev); }
      last = hp; prev = t;
    }
    expect(hits).toBeGreaterThan(0);
  }, 60000);
});

describe("Ed's Stage 4 rulings", () => {
  it("never lets anything attack a baby: a party of babies is safe in a fight, and wild babies are left alone", () => {
    const g = quiet(), w = g.witch;
    const pup = place(g, 0, "hedgehog", 0, w.x + 2, w.z, true);
    const wildPup = place(g, 0, "boar", 0, w.x + 3, w.z + 1);
    place(g, 0, "bear", 2, w.x + 4, w.z); place(g, 0, "owl", 2, w.x + 6, w.z + 3);
    place(g, 0, "wolf", 2, w.x + 2, w.z - 1, true);
    g.witch = { ...g.witch, mode: "treetop", lift: 1 };
    run(g, 30);
    expect(pup.gone).toBeFalsy(); expect(pup.hp ?? maxHp(0)).toBe(maxHp(0));
    expect(wildPup.gone).toBeFalsy(); expect(wildPup.hp ?? maxHp(0)).toBe(maxHp(0));
  }, 60000);

  it("goes for her within 30 m and lets her go when she rises, or once she's out of its area, range and 30 m; then it walks back", () => {
    const g = quiet(), w = g.witch;
    const wolf = place(g, 0, "wolf", 1, w.x + 25, w.z);
    run(g, 1);
    expect(wolf.fight?.target).toEqual({ kind: "witch", id: 0 });
    g.witch = { ...g.witch, mode: "treetop", lift: 1 };
    run(g, 0.5);
    expect(wolf.fight?.target ?? null).toBeNull();
    g.witch = { ...g.witch, mode: "ground", lift: 0 };
    run(g, 0.5);
    expect(wolf.fight?.target).toEqual({ kind: "witch", id: 0 });
    // Away out of its area, past its range and 30 m: it gives up and heads home.
    const far = { x: wolf.homeX + 400, z: wolf.homeZ };
    g.witch = { ...g.witch, x: far.x, z: far.z };
    run(g, 1);
    expect(wolf.fight?.target ?? null).toBeNull();
    wolf.x = wolf.homeX + 150; wolf.z = wolf.homeZ; // (as if it had chased her out of its area)
    const d0 = Math.hypot(wolf.x - wolf.anchorX, wolf.z - wolf.anchorZ);
    g.witch = { ...g.witch, x: wolf.homeX + 120, z: wolf.homeZ + 200, mode: "treetop", lift: 1 }; // near enough to simulate it
    run(g, 5);
    expect(Math.hypot(wolf.x - wolf.anchorX, wolf.z - wolf.anchorZ)).toBeLessThan(d0);
  }, 60000);

  it("has party animals following her take on only what attacks her or them; parked ones guard round their sigil", () => {
    const g = quiet(), w = g.witch;
    g.witch = { ...g.witch, mode: "treetop", lift: 1 }; // nothing attacks her up there
    const mine = place(g, 0, "wolf", 2, w.x + 2, w.z, true), idler = place(g, 0, "boar", 1, w.x + 22, w.z); // beyond its aggro of the wolf
    idler.rest = 100;
    run(g, 3);
    expect(mine.fight?.target ?? null).toBeNull(); // the boar isn't attacking anyone: leave it
    // Parked by the boar, it guards.
    g.leash.stack = g.leash.stack.filter(id => id !== mine.id);
    g.leash.placed.push({ id: mine.id, x: idler.x - 3, z: idler.z, at: g.clock.time });
    run(g, 3);
    expect(mine.fight?.target).toEqual({ kind: "creature", id: idler.id });
  }, 60000);

  it("heals a party animal to full when it eats a berry (even a legend) or is invited", () => {
    const g = quiet(), w = g.witch;
    const a = place(g, 0, "fox", 1, w.x + 2, w.z, true), l = place(g, 0, "stag", LEGEND, w.x + 3, w.z, true);
    a.hp = 10; l.hp = 50;
    feed(g.berries, a, g.clock.time, TUNING); feed(g.berries, l, g.clock.time, TUNING);
    expect(a.hp).toBeUndefined(); expect(l.hp).toBeUndefined(); // undefined: full
    expect(a.healedAt).toBe(g.clock.time);
    expect(canEat(Object.assign(l, { hp: 1 }), g.berries)).toBe(true); // a hurt legend wants a berry
    expect(canEat(Object.assign(l, { hp: undefined }), g.berries)).toBe(false); // a whole one doesn't
    const wild = place(g, 0, "badger", 1, w.x + 4, w.z);
    wild.hp = 5;
    for (let i = 0; i < 10 / STEP && !wild.leashed; i++) stepGame(g, { ...idle, inviteNearest: i === 0 }, STEP);
    expect(wild.leashed).toBe(true);
    expect(wild.hp).toBeUndefined();
  }, 60000);

  it("leaves a woken area's babies out of its siege: they stay home and can still be invited", () => {
    const g = newGame(77, TUNING);
    g.clock.paused = false;
    g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
    const next = g.party.next[0], here = g.creatures.filter(c => c.cell[0] === next[0] && c.cell[1] === next[1]);
    here.slice(1).forEach(c => { c.level = 1; });
    const baby = here[0]; baby.level = 0;
    stepGame(g, { ...idle, nextWave: true }, STEP);
    expect(baby.siege).toBeUndefined();
    expect(here.slice(1).every(c => c.siege)).toBe(true);
    expect(invitable(baby)).toBe(true);
  }, 60000);

  it("has kiting kinds (the raven) keep their distance while they shoot", () => {
    const g = quiet(), w = g.witch;
    const raven = place(g, 0, "raven", 1, w.x + 4, w.z);
    run(g, 10, { ...idle, autoTalk: false }); // (auto-talk off: she doesn't chat with it, so it shoots)
    const d = Math.hypot(raven.x - g.witch.x, raven.z - g.witch.z), R = attackOf("raven", 1)!.attack.range;
    expect(d).toBeGreaterThan(R * COMBAT.kite.near * 0.8);
  }, 60000);
});

describe("sieges (Stage 4)", () => {
  it("sends a woken area's wild creatures against its new soundsystem; when it falls its party ends, and they march on", () => {
    const t = JSON.parse(JSON.stringify(TUNING)) as Tuning;
    t.combat.soundsystemHealth = 60;
    const g = newGame(77, t);
    g.clock.paused = false;
    g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
    const next = g.party.next[0]; // (the areas round home hold only babies, who don't attack: grow a few)
    g.creatures.filter(c => c.cell[0] === next[0] && c.cell[1] === next[1] && !c.boss).forEach(c => { c.level = 1; }); // (its legend wakes and guards it: sleeping.test.ts)
    stepGame(g, { ...idle, nextWave: true }, STEP);
    const [key, area] = [...g.party.areas].find(([, a]) => a.wave === 1)!;
    const sound = g.combat.sounds.get(key)!;
    expect(sound.hp).toBe(60);
    const besiegers = g.creatures.filter(c => c.siege === key && !c.boss);
    expect(besiegers.length).toBeGreaterThan(0);
    expect(besiegers.every(c => c.cell[0] === area.cell[0] && c.cell[1] === area.cell[1] && c.level > 0)).toBe(true);
    // March them close, then let the siege run.
    for (const c of besiegers) { c.x = sound.x + (c.rand() - 0.5) * 6; c.z = sound.z + 4 + c.rand() * 3; }
    for (let i = 0; i < 120 / STEP && sound.hp > 0; i++) stepGame(g, idle, STEP);
    expect(sound.hp).toBe(0);
    expect(g.party.areas.has(key)).toBe(false);
    expect(g.combat.ruined.has(key)).toBe(true);
    expect(besiegers.filter(c => !c.gone).every(c => c.siege === "home")).toBe(true); // on to the next-nearest: the dancefloor
    expect(g.over).toBeNull();
    g.combat.sounds.get("home")!.hp = 0.0001;
    for (const c of besiegers) if (!c.gone) { c.x = g.map.dancefloor.x + 6; c.z = g.map.dancefloor.z + 6; }
    for (let i = 0; i < 30 / STEP && !g.over; i++) stepGame(g, idle, STEP);
    expect(g.over).not.toBeNull(); // every soundsystem down: the run is over
  }, 180000);
});

describe("Ed's playtest (2026-10-04)", () => {
  /** A spot `d` metres from the witch in a given direction that's in her area (or not). */
  const spot = (g: Game, d: number, sameArea: boolean) => {
    const w = g.witch, k = g.map.cellSafe(w.x, w.z).cell;
    for (const r of sameArea ? [d, d - 8, d - 16, d - 24] : [d, d + 15, d + 30, d + 45, d + 60, d + 80]) for (let a = 0; a < 64; a++) {
      const x = w.x + Math.cos(a * 0.37) * r, z = w.z + Math.sin(a * 0.37) * r, c = g.map.cellSafe(x, z).cell;
      if ((c[0] === k[0] && c[1] === k[1]) === sameArea) return { x, z };
    }
    throw new Error("no such spot");
  };

  it("wild creatures go for her as soon as she's on the ground in their area, not before", () => {
    const g = quiet(), inside = spot(g, 40, true), outside = spot(g, 25, false);
    const a = place(g, 0, "wolf", 1, inside.x, inside.z), b = place(g, 0, "boar", 1, outside.x, outside.z);
    run(g, 1, { ...idle, autoTalk: false });
    expect(a.fight?.target).toEqual({ kind: "witch", id: 0 }); // well out of its range, but in her area
    expect(b.fight?.target ?? null).toBeNull(); // out of her area, and out of its range
  }, 60000);

  it("holds the fire of the one she's chatting with (its friends still shoot)", () => {
    const g = quiet(), w = g.witch;
    const owl = place(g, 0, "owl", 2, w.x + 6, w.z);
    run(g, 6);
    expect(g.leash.talk?.id).toBe(owl.id);
    expect(owl.fight?.target ?? null).toBeNull();
    expect(g.witches[0].health.hp).toBe(TUNING.witchHealth.hits);
    const friend = place(g, 0, "owl", 2, w.x - 7, w.z);
    run(g, 5);
    expect(friend.fight?.target).toEqual({ kind: "witch", id: 0 });
  }, 60000);

  it("can't invite a creature enraged by a wave (besieging); a woken area's babies stay invitable", () => {
    const g = newGame(77, TUNING);
    g.clock.paused = false;
    g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
    const next = g.party.next[0], here = g.creatures.filter(c => c.cell[0] === next[0] && c.cell[1] === next[1]);
    here.slice(1).forEach(c => { c.level = 1; }); here[0].level = 0;
    stepGame(g, { ...idle, nextWave: true }, STEP);
    const angry = here[1];
    expect(angry.enraged).toBe(true);
    expect(invitable(angry)).toBe(false);
    expect(here[0].enraged).toBeFalsy();
    expect(invitable(here[0])).toBe(true);
  }, 60000);

  it("has a beaten creature run off, out of sight, and then it's gone for good", () => {
    const g = quiet(), w = g.witch;
    const wild = place(g, 0, "boar", 1, w.x + 4, w.z);
    wild.hp = 1;
    const mine = place(g, 0, "wolf", 2, w.x + 2, w.z, true);
    g.witch = { ...g.witch, mode: "treetop", lift: 1 };
    for (let i = 0; i < 20 / STEP && !wild.fleeUntil; i++) stepGame(g, idle, STEP);
    expect(wild.fleeUntil).toBeTruthy();
    expect(wild.gone).toBeFalsy(); // not on the spot
    for (let i = 0; i < 600 / STEP && !wild.gone; i++) stepGame(g, idle, STEP / 1);
    expect(wild.gone).toBe(true);
    expect(Math.hypot(wild.x - g.witch.x, wild.z - g.witch.z)).toBeGreaterThan(TUNING.haze.far);
    expect(mine.gone).toBeFalsy();
  }, 180000);

  it("has creatures notice her: curious babies come up, skittish ones keep off, others turn to look", () => {
    const g = quiet(), w = g.witch, near = spot(g, 18, true), near2 = spot(g, 8, true);
    const pup = place(g, 0, "squirrel", 0, near.x, near.z), shy = place(g, 0, "hare", 0, near2.x, near2.z);
    const d0 = Math.hypot(pup.x - w.x, pup.z - w.z), s0 = Math.hypot(shy.x - w.x, shy.z - w.z);
    run(g, 6, { ...idle, autoTalk: false });
    expect(Math.hypot(pup.x - g.witch.x, pup.z - g.witch.z)).toBeLessThan(d0 - 2); // curious
    expect(Math.hypot(shy.x - g.witch.x, shy.z - g.witch.z)).toBeGreaterThan(s0); // skittish
  }, 60000);
});

describe("the invitee truce (Ed, 2026-10-04)", () => {
  it("has her party leave the creature she's inviting alone, and go for it once the chat's off", () => {
    const g = quiet(), w = g.witch;
    const fox = place(g, 0, "fox", 2, w.x + 3, w.z), wolf = place(g, 0, "wolf", 2, w.x - 1, w.z, true);
    g.witches[0].health.hp = 1e6;
    for (let i = 0; i < 6 / STEP; i++) stepGame(g, { ...idle, autoTalk: true }, STEP); // (an adult takes 12 s to invite)
    expect(g.leash.talk?.id).toBe(fox.id);
    expect(fox.hp).toBeUndefined(); // untouched while they chat
    expect(wolf.fight?.target?.kind === "creature" && wolf.fight.target.id === fox.id).toBe(false);
    // She rises: the chat's off, and it's fair game again.
    g.witch = { ...g.witch, mode: "treetop", lift: 1 };
    for (let i = 0; i < 10 / STEP && fox.hp === undefined; i++) stepGame(g, idle, STEP);
    expect(fox.hp).toBeDefined();
  }, 60000);
});
