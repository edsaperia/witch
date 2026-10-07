import { describe, expect, it } from "vitest";
import { attackOf, COMBAT, maxHp } from "./combat";
import { LEGEND, type Creature, type Level } from "./creatures";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { TUNING, withTuning, type Tuning } from "./tuning";
import { AREA_TYPES } from "./map";
import { canEat, feed } from "./berries";
import { invitable } from "./leash";
import { hasRune } from "./creatureStates";
import { candleCount, candleMelt, candleRed, hurt, knockOut, newHealth, nextStreak, repair, respawnWait } from "./knockout";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
const run = (g: Game, secs: number, c = idle) => { for (let i = 0; i < Math.round(secs / STEP); i++) stepGame(g, c, STEP); };
/** A game with the witch off her seat, on the ground, somewhere quiet (no creature within 60 m). */
/** The proximity chat, as before the 💌s (invites.on false). */
const CHAT = withTuning({ invites: { ...TUNING.invites, on: false } });

function quiet(t: Tuning = TUNING): Game {
  const g = newGame(77, t);
  g.clock.paused = false;
  const d = g.map.dancefloor;
  g.witch = { ...g.witch, seated: false, x: d.x, z: d.z + 20, mode: "ground", lift: 0 };
  for (const c of g.creatures) if (Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 60) c.gone = true; // out of the way
  return g;
}
/** A party animal put down on a sigil where it stands (in its posse there with her in the treetops:
 *  following her up there, it would be travelling, rules/travel.ts). */
function park(g: Game, c: Creature): void { g.leash.stack = g.leash.stack.filter(i => i !== c.id); g.leash.placed.push({ id: c.id, x: c.x, z: c.z, at: g.clock.time }); }
/** Put a creature at (x, z) as a given kind and level, wild or in the witch's party. */
function place(g: Game, i: number, species: string, level: Level, x: number, z: number, party = false): Creature {
  const c = g.creatures.find(k => !k.gone && !k.leashed && !k.boss && k.id >= i && Math.hypot(k.x - g.witch.x, k.z - g.witch.z) > 80)!;
  Object.assign(c, { circle: undefined, species, level, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, safeR: undefined, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, rest: 0 });
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
    park(g, mine);
    g.witch = { ...g.witch, mode: "treetop", lift: 1 }; // (on the ground she'd chat the boar into her party)
    run(g, 40);
    expect(mine.hp).toBeLessThan(maxHp(2)); // it was hit too
    expect(wild.fleeUntil).toBeTruthy(); // running for the map's edge (Ed: beaten creatures run off the map)
    const x0 = wild.x, z0 = wild.z; run(g, 3);
    expect(Math.hypot(wild.x - x0, wild.z - z0)).toBeGreaterThan(5);
    expect(wild.fight).toBeUndefined();
    expect(mine.gone).toBeFalsy();
    expect(g.leash.placed.map(p => p.id)).toContain(mine.id);
  }, 60000);

  it("loses a beaten party animal for the run: it runs off the map, off its leash", () => {
    const g = quiet(), w = g.witch;
    const mine = place(g, 0, "hedgehog", 1, w.x + 2, w.z, true);
    park(g, mine);
    place(g, 0, "bear", 2, w.x + 4, w.z); place(g, 0, "bear", 2, w.x + 3, w.z + 2);
    g.witch = { ...g.witch, mode: "treetop", lift: 1 }; // out of reach herself
    run(g, 60);
    expect(mine.fleeUntil).toBeTruthy();
    expect(mine.leashed).toBe(false);
    expect(g.leash.placed.map(p => p.id)).not.toContain(mine.id);
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
    const down = g.clock.time;
    run(g, 14); // (lobs land a second or two after they're thrown, and the first may miss)
    expect(g.witches[0].health.hurtAt).toBeGreaterThan(down); // (hit: by the end she may have been knocked out and be back whole)
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
  const RESPAWN = (TUNING.knockout.respawn?.max ?? 0) + (TUNING.knockout.hatFloat ?? 0); // (the most the wait can add: rules/knockout.ts respawnWait)
  const NO_WAIT = { base: 0, step: 0, max: 0, cooldown: 0, minScratch: 0 };
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

  it("puts her carried sigils down where their animals stand, bottom first, a second each with knockout.releaseEach 1 (#87: leashed is for good); then she's back at the treehouse, whole", () => {
    const { g, a, b, l, parked } = setUp(withTuning(t => { t.knockout.releaseEach = 1; })), W = g.witches[0];
    expect(W.ko).not.toBeNull();
    const down = g.clock.time, bottomFirst = [l.id, b.id, a.id]; // stack order a, b, l: l is the bottom
    const put = new Map<number, number>();
    for (let i = 0; i < (10 + RESPAWN) / STEP && W.ko; i++) {
      stepGame(g, { moveX: 1, moveZ: 0, toggleMode: true, zoom: 0, dash: true }, STEP); // input is ignored meanwhile
      for (const c of [a, b, l]) if (!g.leash.stack.includes(c.id) && !put.has(c.id)) put.set(c.id, g.clock.time - down);
    }
    expect([...put.keys()]).toEqual(bottomFirst);
    bottomFirst.map(id => put.get(id)!).forEach((s, i) => expect(s).toBeCloseTo(i + 1, 1));
    for (const c of [a, b, l]) {
      expect(c.leashed).toBe(true); // still hers
      const p = g.leash.placed.find(q => q.id === c.id)!;
      expect(p).toBeDefined();
      expect(c.wanderTo).toBeUndefined();
    }
    expect(g.leash.placed.map(p => p.id)).toContain(parked.id);
    expect(W.ko).toBeNull();
    expect(Math.hypot(g.witch.x - g.map.start.x, g.witch.z - g.map.start.z)).toBeLessThan(0.5);
    expect(W.health.hp).toBe(TUNING.witchHealth.hits);
  }, 120000);

  it("brings her back behind her decks, seated as at the start but at the game's zoom, near home or far off; her first move gets her up", () => {
    for (const far of [false, true]) {
      const { g } = setUp(), W = g.witches[0];
      if (far) W.body = { ...W.body, x: W.body.x + 900, z: W.body.z + 400 }; // (knocked down far from home)
      g.camera = { ...g.camera, intro: 0 }; // (knocked down well into a game: the start's close-up long gone; seated, it's held as it is)
      const intro0 = g.camera.intro ?? 0;
      for (let i = 0; i < (30 + RESPAWN) / STEP && W.ko; i++) stepGame(g, idle, STEP);
      expect(W.ko).toBeNull();
      expect(g.witch.seated, `far ${far}: behind her decks`).toBe(true);
      expect(Math.hypot(g.witch.x - g.map.start.x, g.witch.z - g.map.start.z)).toBeLessThan(0.5);
      run(g, 2); // (sitting there: she waits)
      expect(g.witch.seated).toBe(true);
      expect(g.camera.intro ?? 0, "not the opening close-up").toBeLessThanOrEqual(intro0);
      expect(g.camera.intro ?? 0).toBe(0);
      stepGame(g, { ...idle, moveX: 1 }, STEP);
      expect(g.witch.seated, "up and away").toBeFalsy();
    }
  }, 120000);

  it("holds her scratching behind her decks for the rest of the wait after the sparkle-in (Ed, 2026-10-07), input ignored, then lets her go (no wait: as before)", () => {
    for (const wait of [true, false]) {
      const { g } = setUp(withTuning(t => { if (!wait) t.knockout.respawn = NO_WAIT; })), W = g.witches[0], K = W.ko!, R = g.tuning.knockout.respawn ?? NO_WAIT;
      expect(K.backAt, "the whole wait counted from going down, at least minScratch scratching").toBeCloseTo(Math.max(K.inAt + R.minScratch, K.at + respawnWait(0, g.tuning)), 6);
      const go = { ...idle, moveX: 1, toggleMode: true, dash: true };
      while (!K.moved) stepGame(g, go, STEP);
      const at = { x: g.witch.x, z: g.witch.z };
      expect(Math.hypot(at.x - g.map.start.x, at.z - g.map.start.z), "at the decks from the sparkle-in").toBeLessThan(0.5);
      let held = 0, scratches = 0;
      while (W.ko) { stepGame(g, go, STEP); held += STEP; scratches += g.koEvents.filter(e => e.kind === "scratch").length; if (W.ko) { expect(Math.hypot(g.witch.x - at.x, g.witch.z - at.z), "held while she waits").toBeLessThan(1e-6); expect(g.witch.seated).toBe(true); } }
      expect(held, "the sparkle-in's second half, then the scratching").toBeCloseTo(K.backAt - (K.teleportAt + K.inAt) / 2, 0);
      expect(scratches, "her scratching starts once (the sound's hook), only if she waits").toBe(K.backAt > K.inAt ? 1 : 0);
      if (!wait) expect(K.backAt).toBe(K.inAt);
      expect(W.ko).toBeNull();
      stepGame(g, { ...idle, moveX: 1 }, STEP);
      expect(g.witch.seated, `wait ${wait}: up and away once it's over`).toBeFalsy();
    }
  }, 120000);

  it("makes the wait longer for knockdowns close together, to a cap, and short again after the cooldown (Ed, 2026-10-07)", () => {
    const t = TUNING, R = t.knockout.respawn!;
    expect(respawnWait(0, t)).toBe(R.base);
    expect(respawnWait(1, t)).toBe(Math.min(R.max, R.base + R.step));
    expect(respawnWait(99, t)).toBe(R.max);
    let last: { n: number; at: number } | null = null;
    const downs = [0, 20, 40, 60, 60 + R.cooldown + 1], ns: number[] = [];
    for (const at of downs) { const n = nextStreak(last, at, t); ns.push(n); last = { n, at }; }
    expect(ns).toEqual([0, 1, 2, 3, 0]);
  });

  it("drops all her sigils at once as she goes down (Ed, 2026-10-07)", () => {
    const { g } = setUp(), W = g.witches[0], K = W.ko!;
    expect(K.order.length).toBeGreaterThan(1);
    for (const at of K.times) expect(at).toBe(K.at);
    stepGame(g, idle, STEP);
    expect(g.leash.stack.filter(id => K.order.includes(id))).toEqual([]);
  });

  it("lights a loading bar of candles on her desk, one a candleStep of the wait, the extra red, melting one after another as she scratches (Ed, 2026-10-07)", () => {
    const { g } = setUp(), W = g.witches[0], t = withTuning(x => { x.knockout.candleStep = 1; });
    const kos = [0, 1, 2, 3, 9].map(streak => knockOut(W.leash, g.creatures, 100, t, { hatFloats: true, streak }));
    expect(kos.map(k => candleCount(k, t))).toEqual([6, 8, 10, 12, 12]); // (6, 8, 10, 12 s: the cap)
    expect(kos.map(k => candleRed(k, t))).toEqual([0, 2, 4, 6, 6]); // (the base's 6 s white)
    const half = withTuning(x => { x.knockout.candleStep = 0.5; });
    expect([candleCount(kos[0], half), candleCount(kos[4], half), candleRed(kos[4], half)]).toEqual([12, 24, 12]);
    const K = kos[1], n = candleCount(K, t);
    expect([0, 1, 7].map(i => candleMelt(K, K.inAt, i, t))).toEqual([0, 0, 0]); // (all whole as she arrives)
    expect([0, 1, 7].map(i => candleMelt(K, K.backAt, i, t))).toEqual([1, 1, 1]); // (all gone as she can move)
    const mid = K.inAt + (K.backAt - K.inAt) / n * 1.5;
    expect(candleMelt(K, mid, 0, t)).toBe(1); expect(candleMelt(K, mid, 1, t)).toBeCloseTo(0.5, 6); expect(candleMelt(K, mid, 2, t)).toBe(0);
    expect(candleCount(knockOut(W.leash, g.creatures, 100, withTuning(x => { x.knockout.respawn = NO_WAIT; }), {}), t)).toBe(0);
  });

  it("floats her hat down first, then lets her sigils go within it; a first knockdown with her hat stays near Ed's six seconds", () => {
    const { g } = setUp(), W = g.witches[0], t = g.tuning;
    const K = knockOut(W.leash, g.creatures, 100, t, { hatFloats: true, streak: 0 });
    expect(K.floatUntil).toBeCloseTo(100 + (t.knockout.hatFloat ?? 0), 6);
    expect(K.teleportAt).toBeGreaterThanOrEqual(K.floatUntil);
    expect(Math.max(...K.times)).toBeLessThanOrEqual(K.floatUntil + 1e-6); // (her sigils come down while it floats)
    expect(K.backAt - K.at, "her whole wait, down to moving again").toBeLessThanOrEqual(6.5);
    expect(K.backAt - K.inAt, "some scratching shows").toBeGreaterThanOrEqual(t.knockout.respawn!.minScratch - 1e-6);
    const bare = knockOut(W.leash, g.creatures, 100, t, { hatFloats: false, streak: 0 });
    expect(bare.floatUntil).toBe(100);
    expect(bare.backAt - bare.at, "without a hat, the same wait: more scratching").toBeCloseTo(K.backAt - K.at, 0);
  });

  it("keeps her legends if knockout.legendsLoyal: they come home with her", () => {
    const { g, l } = setUp(withTuning(t => { t.knockout.legendsLoyal = true; })), W = g.witches[0];
    for (let i = 0; i < 30 / STEP && (W.ko || g.clock.time < 1); i++) stepGame(g, idle, STEP);
    expect(l.leashed).toBe(true);
    expect(Math.hypot(l.x - g.map.start.x, l.z - g.map.start.z)).toBeLessThan(8);
  }, 120000);

  it("leaves her carried animals as a parked group where they stood, near their own sigils, hers (#87)", () => {
    const { g, a, b } = setUp(), W = g.witches[0], at = new Map([a, b].map(c => [c.id, { x: c.x, z: c.z }]));
    for (let i = 0; i < 30 / STEP && (W.ko || g.clock.time < 1); i++) stepGame(g, idle, STEP);
    run(g, 5);
    for (const c of [a, b]) {
      const p = g.leash.placed.find(q => q.id === c.id)!, was = at.get(c.id)!;
      expect(Math.hypot(p.x - was.x, p.z - was.z)).toBeLessThan(TUNING.leash.spacing * 3); // put down about where it stood
      expect(Math.hypot(c.x - p.x, c.z - p.z)).toBeLessThan(TUNING.leash.length * 2 + 5); // and it keeps to it
      expect(c.leashed).toBe(true);
    }
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
    const mine = place(g, 0, "wolf", 2, w.x + 2, w.z, true), idler = place(g, 0, "boar", 1, w.x + 60, w.z); // beyond its aggro of the wolf
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

  it("leaves a woken area's babies out of its siege: they stay home, happy, and can still be leashed (their rune)", () => {
    const g = newGame(77, TUNING);
    g.clock.paused = false;
    g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
    const next = g.party.next[0], here = g.creatures.filter(c => c.cell[0] === next[0] && c.cell[1] === next[1] && !c.boss); // (its legend sleeps on: legends.test.ts)
    here.slice(1).forEach(c => { c.level = 1; });
    const baby = here[0]; baby.level = 0;
    stepGame(g, { ...idle, nextWave: true }, STEP);
    expect(baby.siege).toBeUndefined();
    expect(here.slice(1).every(c => c.siege)).toBe(true);
    expect(invitable(baby) || hasRune(baby, g.clock.time)).toBe(true); // (happy at its soundsystem: leashed by picking up its rune, Ed 2026-10-06)
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
    expect(g.partyOver).toBeNull();
    g.combat.sounds.get("home")!.hp = 0.0001;
    for (const c of besiegers) if (!c.gone) { c.x = g.map.dancefloor.x + 6; c.z = g.map.dancefloor.z + 6; }
    for (let i = 0; i < 30 / STEP && !g.partyOver; i++) stepGame(g, idle, STEP);
    expect(g.partyOver).not.toBeNull(); // every soundsystem down: the party's over
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
    const g = quiet(CHAT), w = g.witch;
    const owl = place(g, 0, "owl", 2, w.x + 6, w.z);
    run(g, 6);
    expect(g.leash.talk?.id).toBe(owl.id);
    expect(owl.fight?.target ?? null).toBeNull();
    expect(g.witches[0].health.hp).toBe(TUNING.witchHealth.hits);
    const friend = place(g, 0, "owl", 2, w.x - 7, w.z);
    run(g, 5);
    expect(friend.fight?.target).toEqual({ kind: "witch", id: 0 });
  }, 60000);

  it("can't invite a creature enraged by a wave (besieging); a woken area's babies can still be had (invited, or happy with their rune)", () => {
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
    expect(invitable(here[0]) || hasRune(here[0], g.clock.time)).toBe(true);
  }, 60000);

  it("has a beaten creature run off, out of sight, and then it's gone for good", () => {
    const g = quiet(), w = g.witch;
    const wild = place(g, 0, "boar", 1, w.x + 4, w.z);
    wild.hp = 1;
    const mine = place(g, 0, "wolf", 2, w.x + 2, w.z, true);
    park(g, mine);
    g.witch = { ...g.witch, mode: "treetop", lift: 1 };
    for (let i = 0; i < (TUNING.combat.daze + 12) / STEP && !wild.fleeUntil; i++) stepGame(g, idle, STEP);
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
    const g = quiet(CHAT), w = g.witch;
    // (a beetle: it walks straight in; a fox flanks round her wolf)
    const fox = place(g, 0, "beetle", 2, w.x + 3, w.z), wolf = place(g, 0, "wolf", 2, w.x - 1, w.z, true);
    g.witches[0].health.hp = 1e6;
    // (she keeps beside it, as a player would: its blows knock her wolf about and it follows)
    for (let i = 0; i < 6 / STEP; i++) { stepGame(g, { ...idle, autoTalk: true }, STEP); g.witch = { ...g.witch, x: fox.x - 3, z: fox.z }; } // (an adult takes 12 s to invite)
    expect(g.leash.talk?.id).toBe(fox.id);
    expect(fox.hp).toBeUndefined(); // untouched while they chat
    expect(wolf.fight?.target?.kind === "creature" && wolf.fight.target.id === fox.id).toBe(false);
    // She rises: the chat's off, and it's fair game again.
    g.witch = { ...g.witch, mode: "treetop", lift: 1 };
    for (let i = 0; i < 10 / STEP && fox.hp === undefined; i++) stepGame(g, idle, STEP);
    expect(fox.hp).toBeDefined();
  }, 60000);
});

describe("the motion scale pass (Ed, 2026-10-04)", () => {
  it("has an area's creatures onto her within a few seconds of her landing in it, from across the area", () => {
    const g = quiet(), W = g.witches[0];
    W.health.hp = 1e6;
    // An adult wolf at its area's far side, and her landing at the other.
    const site = g.map.siteOf(g.map.centreCell[0] + 2, g.map.centreCell[1]), cell: [number, number] = [g.map.centreCell[0] + 2, g.map.centreCell[1]];
    const wolf = place(g, 0, "wolf", 2, site.x, site.z);
    wolf.cell = cell;
    let spot: { x: number; z: number } | null = null;
    for (let r = 70; r > 20 && !spot; r -= 5) for (let k = 0; k < 24 && !spot; k++) { const a = (k / 24) * Math.PI * 2, x = site.x + Math.cos(a) * r, z = site.z + Math.sin(a) * r, c = g.map.cellSafe(x, z).cell; if (c[0] === cell[0] && c[1] === cell[1]) spot = { x, z }; }
    g.witch = { ...g.witch, x: spot!.x, z: spot!.z, mode: "ground", lift: 0, seated: false };
    const d0 = Math.hypot(wolf.x - g.witch.x, wolf.z - g.witch.z);
    let t = 0;
    for (; t < 10 && Math.hypot(wolf.x - g.witch.x, wolf.z - g.witch.z) > 18; t += STEP) stepGame(g, { ...idle, autoTalk: false }, STEP);
    expect(d0).toBeGreaterThan(20);
    expect(t).toBeLessThan(0.5 + d0 / 15); // (a moment's reaction, then about 20 m/s)
  }, 60000);

  it("scales a fight live: lengths with fight.scale, speeds with fight.speed", () => {
    const g = quiet();
    const wolf = place(g, 0, "wolf", 2, g.witch.x + 30, g.witch.z);
    g.witches[0].health.hp = 1e6;
    g.tuning.fight.speed = 0.5;
    let top = 0, px = wolf.x, pz = wolf.z;
    for (let i = 0; i < 3 / STEP; i++) { stepGame(g, { ...idle, autoTalk: false }, STEP); top = Math.max(top, Math.hypot(wolf.x - px, wolf.z - pz) / STEP); px = wolf.x; pz = wolf.z; }
    g.tuning.fight.speed = 1;
    expect(top).toBeLessThan(60 * 0.5 + 1); // (its fastest, a lunge, at half speed)
    expect(top).toBeGreaterThan(TUNING.combat.pursuitRun * 0.5 - 1);
    g.tuning.fight.scale = 2;
    stepGame(g, idle, STEP);
    expect(attackOf("wolf", 2)!.attack.lunge).toBeCloseTo(COMBAT.attacks.maul.lunge! * 2);
    g.tuning.fight.scale = 1;
  }, 60000);

  it("has a wild creature chasing her give up soon after she leaves its area, and go home (Ed, 2026-10-05)", () => {
    const g = quiet(), W = g.witches[0];
    W.health.hp = 1e6;
    const cell: [number, number] = [g.map.centreCell[0] + 2, g.map.centreCell[1]], site = g.map.siteOf(cell[0], cell[1]);
    const wolf = place(g, 0, "wolf", 2, site.x, site.z);
    wolf.cell = cell;
    g.witch = { ...g.witch, x: site.x + 8, z: site.z, mode: "ground", lift: 0, seated: false };
    for (let i = 0; i < 2 / STEP; i++) stepGame(g, { ...idle, autoTalk: false }, STEP);
    expect(wolf.fight?.target?.kind).toBe("witch");
    // She runs out of its area, far east, and keeps going.
    let maxOut = 0;
    for (let i = 0; i < 12 / STEP; i++) {
      stepGame(g, { ...idle, autoTalk: false, moveX: 1 }, STEP);
      const k = g.map.cellSafe(wolf.x, wolf.z).cell;
      if (k[0] !== cell[0] || k[1] !== cell[1]) maxOut++;
    }
    expect(wolf.fight?.target?.kind ?? null).not.toBe("witch");
    expect(maxOut * STEP).toBeLessThan(4); // out of its area only briefly
    for (let i = 0; i < 15 / STEP; i++) stepGame(g, idle, STEP);
    expect(g.map.cellSafe(wolf.x, wolf.z).cell).toEqual(cell); // back home
  }, 60000);
});

describe("sieges far from her (found by the overnight playthrough)", () => {
  it("march from the wave on, wherever she is: their besiegers are stepped, not only once she comes near", () => {
    const g = newGame(7, TUNING);
    g.clock.paused = false;
    const B = g.map.bounds;
    g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1, x: B.minX + 5, z: B.minZ + 5 }; // (far off, in a corner)
    stepGame(g, { ...idle, nextWave: true }, STEP);
    run(g, 1);
    const sieging = g.creatures.filter(c => !c.gone && c.siege && !c.boss);
    expect(sieging.length).toBeGreaterThan(0);
    const at = new Map(sieging.map(c => [c.id, { x: c.x, z: c.z }]));
    run(g, 20);
    let moved = 0;
    for (const c of sieging) { const p = at.get(c.id)!; if (c.gone || Math.hypot(c.x - p.x, c.z - p.z) > 2) moved++; }
    expect(moved).toBe(sieging.length); // (every one on its way: none left standing where the wave found it)
  });
});
