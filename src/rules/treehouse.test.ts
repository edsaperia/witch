// The treehouse deck (Ed, 2026-10-11: "a circle with a wooden floor and a balustrade sitting on the ent. You land on it by being at
// treetop height, and during the night time slower 10x"; rules/treehouse.ts).
import { describe, expect, it } from "vitest";
import { TUNING, withTuning } from "./tuning";
import { newGame, stepGame, STEP, type Game } from "./game";
import { atTakeoff, carrierOf, deckOf, flyOnto, keepInHouse, keepOnDeck, onFloor, onTerrace, onTreehouse, seatOffset } from "./treehouse";
import { hitWitch } from "./game";
import { witchHeight } from "./witch";
import { HOUSE_ROOMS, objectFront } from "./houseRooms";

const run = (g: Game, secs: number, c: object = {}) => { for (let i = 0; i < Math.round(secs / STEP); i++) stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...c } as Parameters<typeof stepGame>[1], STEP); };
const press = (g: Game, c: object) => run(g, STEP, c);
const D = TUNING.treehouse.deck!, HS = TUNING.treehouse.house!;
/** The deck as first built: the house off (treehouse.house.on false keeps it, for a build or two). */
// (on the Jet nozzles: these runs were timed by the take-off's and landing's halved cooldowns, the plain broom's before the bare
// broom lost them, Ed 2026-10-23; rules/broomParts.ts)
const JETS = withTuning({ spells: { ...TUNING.spells, parts: "nozzles" } });
const T0 = withTuning({ treehouse: { ...TUNING.treehouse, house: { ...HS, on: false } }, spells: JETS.spells });
const game = (T = T0) => { const g = newGame(123, T); g.clock.paused = false; return g; };
const events = (g: Game, kind: string) => g.leashEvents.filter(e => e.kind === kind);

describe("the treehouse deck", () => {
  it("starts her at her decks on the deck, 22 m up, by the south rail behind the decks", () => {
    const g = game(), d = deckOf(g.map, T0)!, w = g.witch;
    expect(d.h).toBe(22);
    expect(w.seated).toBe(true); expect(w.perch).toBe(true);
    expect(w.x).toBeCloseTo(d.x, 6); expect(w.z).toBeCloseTo(d.z + D.seat, 6);
    expect(witchHeight(w, T0)).toBeCloseTo(22 + T0.groundHeight, 6);
    expect(onTreehouse(g)).toBe(false); // (at her decks: not yet walking the deck)
  });

  it("keeps her on it as she walks: inside the rail, round the map table, out of the decks", () => {
    const g = game(), d = deckOf(g.map, T0)!;
    for (const [mx, mz] of [[1, 0], [0, -1], [-1, 0], [0, 1], [0.7, 0.7]]) {
      run(g, 2, { moveX: mx, moveZ: mz });
      const r = Math.hypot(g.witch.x - d.x, g.witch.z - d.z);
      expect(r).toBeLessThanOrEqual(d.r - d.rail + 1e-6);
      expect(r).toBeGreaterThanOrEqual(d.table.r);
      expect([g.witch.perch, g.witch.mode]).toEqual([true, "ground"]);
    }
    // the decks' arc is solid: no place in it is kept
    const a = (D.decks.from + D.decks.to) / 2 * Math.PI / 180, mid = (D.decks.inner + D.decks.outer) / 2;
    const p = keepOnDeck(d, d.x + Math.cos(a) * mid, d.z + Math.sin(a) * mid), pr = Math.hypot(p.x - d.x, p.z - d.z);
    expect([pr, pr <= D.decks.inner + 1e-6 || pr > D.decks.outer]).toEqual([pr, true]); // (behind them, where she stands to play, or past their front)
    expect(onTreehouse(g)).toBe(true);
  });

  it("slows the world to a tenth while she stands on it, as a calm legend's circle does, and lets it go when she rises", () => {
    const g = game();
    run(g, 0.2, { moveX: 1 }); // (off her seat, onto the deck)
    run(g, 2);
    expect(g.timeScale).toBeCloseTo(T0.legendCircle!.slow.scale, 6);
    const t0 = g.clock.time; run(g, 1);
    expect(g.clock.time - t0).toBeCloseTo(T0.legendCircle!.slow.scale, 2);
    press(g, { toggleMode: true });
    run(g, 2);
    expect(g.witch.mode).toBe("treetop"); expect(g.witch.perch).toBeFalsy();
    expect(g.timeScale).toBe(1);
  });

  it("takes her off it rising, and lands her back on it coming down over it; elsewhere she lands on the ground", () => {
    const g = game(), d = deckOf(g.map, T0)!;
    run(g, 0.2, { moveX: 1 });
    press(g, { toggleMode: true });
    expect(events(g, "perch").map(e => e.on)).toEqual([false]);
    run(g, 2);
    expect(g.witch.mode).toBe("treetop");
    press(g, { toggleMode: true });
    expect(events(g, "perch")).toEqual([]);
    run(g, 2);
    expect(g.witch.mode).toBe("ground"); expect(g.witch.perch).toBe(true);
    expect(witchHeight(g.witch, T0)).toBeCloseTo(D.height + T0.groundHeight, 6);
    expect(Math.hypot(g.witch.x - d.x, g.witch.z - d.z)).toBeLessThanOrEqual(d.r);
    // up (once the rise cooldown's done), away east 40 m, down: the ground
    run(g, 2); press(g, { toggleMode: true }); run(g, 2);
    run(g, 1.2, { moveX: 1 }); run(g, 1);
    expect(Math.hypot(g.witch.x - d.x, g.witch.z - d.z)).toBeGreaterThan(d.r + d.grace);
    press(g, { toggleMode: true }); run(g, 2);
    expect(g.witch.mode).toBe("ground"); expect(g.witch.perch).toBeFalsy();
    expect(witchHeight(g.witch, T0)).toBeCloseTo(T0.groundHeight, 6);
  });

  it("tells of landing on it (the 'perch' event) and of E at the map table (the 'chart' event); nothing goes down up there", () => {
    const g = game(), d = deckOf(g.map, T0)!;
    run(g, 0.2, { moveX: 1 });
    press(g, { toggleMode: true }); run(g, 2);
    press(g, { toggleMode: true });
    let landed = false;
    for (let i = 0; i < 200 && !landed; i++) { press(g, {}); landed = events(g, "perch").some(e => e.on); }
    expect(landed).toBe(true);
    // walk to the map table and press E
    for (let i = 0; i < 400 && Math.hypot(g.witch.x - d.x, g.witch.z - d.z) > d.table.r + 0.8; i++) press(g, { moveX: (d.x - g.witch.x), moveZ: (d.z - g.witch.z) });
    press(g, { place: true });
    expect(events(g, "chart").length).toBe(1);
    expect(g.leash.placed.length).toBe(0);
  });

  it("keeps her out of every fight up there", () => {
    const g = game(), cs = g.creatures.filter(c => !c.boss && c.level > 0).slice(0, 4);
    run(g, 0.2, { moveX: 1 });
    for (const c of cs) Object.assign(c, { x: g.witch.x + 3, z: g.witch.z, enraged: true, leashed: false });
    const hp = g.witches[0].health.hp;
    run(g, 6);
    expect(g.witches[0].health.hp).toBe(hp);
  });

  it("with the deck off, she starts on the ground by the old treehouse as before", () => {
    const T = withTuning({ treehouse: { ...T0.treehouse, deck: { ...D, on: false } } }), g = newGame(123, T);
    expect(g.witch.perch).toBeFalsy();
    expect(g.witch.z).toBeCloseTo(g.map.treehouse.z + 1, 6);
    expect(witchHeight(g.witch, T)).toBeCloseTo(T.groundHeight, 6);
  });
});


// The house (Ed, 2026-10-14, docs/backlog/treehouse.md step 1; the oak since 2026-10-24, config/house/): the Terrace among the trunk's
// rooms, its decks and its take-off on its open south-east rim, towards the dancefloor.
describe("the treehouse's house", () => {
  const SEAT = HOUSE_ROOMS.terrace.seat, DEG = Math.PI / 180;
  /** Out from the Terrace's middle at `a` degrees (clockwise from east) till just past the floor's edge. */
  const pastEdge = (d: ReturnType<typeof deckOf> & object, a: number, by = 1) => {
    let r = 0;
    while (r < 60 && onFloor(d, d.x + Math.cos(a * DEG) * r, d.z + Math.sin(a * DEG) * r)) r += 0.05;
    return { x: d.x + Math.cos(a * DEG) * (r + by), z: d.z + Math.sin(a * DEG) * (r + by), r };
  };
  const K = HOUSE_ROOMS.terrace.takeoff;
  it("starts her behind the decks on the Terrace, 22 m up; the deck's rules carry over", () => {
    const g = game(JETS), d = deckOf(g.map, TUNING)!, w = g.witch;
    expect(d.house).toBeTruthy(); expect(d.h).toBe(22);
    expect(seatOffset(TUNING)).toEqual(SEAT);
    expect(w.seated).toBe(true); expect(w.perch).toBe(true);
    expect(w.x).toBeCloseTo(d.x + SEAT.x, 6); expect(w.z).toBeCloseTo(d.z + SEAT.z, 6);
    expect(witchHeight(w, TUNING)).toBeCloseTo(22 + TUNING.groundHeight, 6);
    expect(onFloor(d, w.x, w.z)).toBe(true); expect(onTerrace(d, w.x, w.z)).toBe(true);
    expect(d.house!.desk.z).toBeGreaterThan(w.z); // (the desk in front of her, south, towards the camera)
    run(g, 0.2, { moveZ: -1 }); run(g, 2);
    expect(g.timeScale).toBeCloseTo(TUNING.legendCircle!.slow.scale, 6); // (time at a tenth on its floor)
    expect(onTreehouse(g)).toBe(true);
  });

  it("faces the dancefloor: the house north-west of it, the Terrace's take-off towards it (Ed, 2026-10-24)", () => {
    const g = game(JETS), d = deckOf(g.map, TUNING)!, f = g.map.dancefloor;
    expect(d.x).toBeLessThan(f.x); expect(d.z).toBeLessThan(f.z);
    const a = Math.atan2(f.z - d.z, f.x - d.x) / DEG;
    expect(Math.abs(a - K.angle)).toBeLessThan(K.half); // (the dancefloor within the open rim's span)
    const p = pastEdge(d, a); expect(atTakeoff(d, p.x, p.z)).toBe(true);
  });

  it("is one floor: from the Terrace she walks up the trunk and out along the branches, kept in by its edge but for the take-off", () => {
    const g = game(JETS), d = deckOf(g.map, TUNING)!;
    run(g, 0.2, { moveZ: -1 });
    run(g, 2, { moveZ: -1 }); // north, off her seat across the Terrace
    expect([g.witch.perch, g.witch.mode]).toEqual([true, "ground"]);
    for (const [mx, mz] of [[-1, 0], [0, -1], [1, 0], [0.7, -0.7], [-0.6, -0.8]]) {
      run(g, 2, { moveX: mx, moveZ: mz });
      expect(onFloor(d, g.witch.x, g.witch.z, 1e-6), `${mx}, ${mz}`).toBe(true);
      expect([g.witch.perch, g.witch.mode]).toEqual([true, "ground"]);
    }
    const mid = keepInHouse(d, d.x, d.z); expect([mid.x, mid.z]).toEqual([d.x, d.z]);
    // the edge keeps her, all round but the take-off: there she's off
    for (let a = 0; a < 360; a += 15) {
      const p = pastEdge(d, a);
      if (p.r > HOUSE_ROOMS.rooms.find(r => r.id === "terrace")!.r * 1.4) continue; // (along a limb, not the Terrace's own edge)
      const k = keepInHouse(d, p.x, p.z), da = Math.abs((((a - K.angle) % 360) + 540) % 360 - 180), T = HOUSE_ROOMS.rooms.find(r => r.id === "terrace")!;
      if (da < K.half - 3 && p.r + 1.5 < T.r + 3) expect(k.off, `${a}°: the take-off`).toBe(true); // (its open rim: within its span and 3 m of its size, as drawn)
      else if (da > K.half + 3) expect(k.off, `${a}°: kept`).toBe(false);
      if (!k.off) expect(onFloor(d, k.x, k.z, 1e-6)).toBe(true);
    }
    // the decks' desk is solid
    const b = d.house!.desk, k = keepInHouse(d, b.x, b.z);
    expect(Math.abs(k.x - b.x) >= b.w / 2 || Math.abs(k.z - b.z) >= b.d / 2).toBe(true);
  });

  it("lands her when she flies onto the Terrace at treetop height from the dancefloor's side, no button; over the other rooms she only flies past", () => {
    const g = game(JETS), d = deckOf(g.map, TUNING)!;
    run(g, 0.2, { moveZ: -1 }); press(g, { toggleMode: true }); run(g, 2);
    expect(g.witch.mode).toBe("treetop"); expect(g.witch.perch).toBeFalsy();
    const a = K.angle * DEG;
    g.witch = { ...g.witch, x: d.x + Math.cos(a) * 60, z: d.z + Math.sin(a) * 60, vx: 0, vz: 0 };
    expect(flyOnto(d, g.witch.x, g.witch.z)).toBe(false);
    let landed = false;
    for (let i = 0; i < 900 && !landed; i++) { press(g, { moveX: -Math.cos(a), moveZ: -Math.sin(a) }); landed = g.witch.mode === "ground" && !!g.witch.perch; }
    expect(landed).toBe(true);
    expect(onTerrace(d, g.witch.x, g.witch.z)).toBe(true);
    expect(witchHeight(g.witch, TUNING)).toBeCloseTo(22 + TUNING.groundHeight, 6);
    expect(events(g, "perch").map(e => e.on)).toEqual([true]); // (the landing's step: its own events)
    // and over the trunk's upper rooms, west to east across the Boudoir: no landing
    press(g, { toggleMode: true }); run(g, 2);
    const B = HOUSE_ROOMS.rooms.find(r => r.id === "boudoir")!;
    g.witch = { ...g.witch, x: d.x + B.x - 40, z: d.z + B.z, vx: 20, vz: 0, mode: "treetop", lift: 1, perch: undefined };
    for (let i = 0; i < 180; i++) press(g, { moveX: 1 });
    expect(g.witch.x).toBeGreaterThan(d.x + B.x + B.r);
    expect(g.witch.mode).toBe("treetop"); expect(g.witch.perch).toBeFalsy();
  });

  it("takes her flying again when she walks off the Terrace's open rim; with no broom she falls and comes back at the circle", () => {
    const out = { moveX: Math.cos(40 * DEG), moveZ: Math.sin(40 * DEG) }; // (south-east, past the desk's east end)
    const g = game(JETS);
    run(g, 0.2, { moveZ: -1 }); run(g, 0.7, { moveX: 1 }); // (off her seat, along behind the desk to its end)
    let off = false;
    for (let i = 0; i < 600 && !off; i++) { press(g, out); off = g.witch.mode === "rising" || g.witch.mode === "treetop"; }
    expect(off).toBe(true);
    run(g, 2); expect(g.witch.mode).toBe("treetop"); expect(g.witch.perch).toBeFalsy();
    const T = withTuning({ treehouse: { ...TUNING.treehouse, house: { ...HS, fall: { on: true, time: 0.9 } } } }), g2 = game(T), d2 = deckOf(g2.map, T)!;
    run(g2, 0.2, { moveZ: -1 }); run(g2, 0.7, { moveX: 1 });
    let falling = false;
    for (let i = 0; i < 600 && !falling; i++) { press(g2, out); falling = g2.witch.falling !== undefined; }
    expect(falling).toBe(true);
    expect(witchHeight(g2.witch, T)).toBeCloseTo(22 + T.groundHeight, 6); // (the camera stays up: her height is the floor's)
    let fell = 0;
    for (let i = 0; i < Math.round(1.2 / STEP); i++) { press(g2, {}); fell += events(g2, "fell").length; } // (the events are each step's own)
    expect(g2.witch.falling).toBeUndefined();
    expect(fell).toBe(1);
    expect(g2.witch.x).toBeCloseTo(d2.house!.circle.x, 6); expect(g2.witch.z).toBeCloseTo(d2.house!.circle.z, 6);
    expect([g2.witch.perch, g2.witch.mode]).toEqual([true, "ground"]);
  });

  it("opens the chart with E at the map table (in the Solarium), and nothing goes down up there", () => {
    const g = game(JETS), d = deckOf(g.map, TUNING)!, t = HOUSE_ROOMS.objects.find(o => o.use.kind === "chart")!, f = objectFront(t, d, 0.4);
    expect(t.room).toBe("solarium");
    run(g, 0.2, { moveZ: -1 });
    g.witch = { ...g.witch, x: f.x, z: f.z, vx: 0, vz: 0 }; run(g, 0.2);
    press(g, { place: true });
    expect(events(g, "chart").length).toBe(1);
    expect(g.leash.placed.length).toBe(0);
  });

  it("brings her back at the magic circle after a knockout, up out of its floor, then walks her to her decks to scratch", () => {
    const g = game(JETS), d = deckOf(g.map, TUNING)!, c = d.house!.circle;
    run(g, 0.2, { moveZ: -1 }); press(g, { toggleMode: true }); run(g, 2); run(g, 1.5, { moveX: 1 }); press(g, { toggleMode: true }); run(g, 2); // (away on the ground)
    expect(g.witch.perch).toBeFalsy();
    for (let i = 0; i < TUNING.witchHealth.hits; i++) { g.witches[0].health.hurtAt = -Infinity; hitWitch(g, 0, g.clock.time); }
    const ko = g.witches[0].ko!;
    expect(ko.riseUntil).toBeGreaterThan(ko.inAt); expect(ko.seatAt).toBeGreaterThan(ko.riseUntil!); expect(ko.backAt).toBeGreaterThanOrEqual(ko.seatAt + TUNING.knockout.respawn!.minScratch - 1e-6);
    while (g.herTime < ko.riseUntil! - 0.05) press(g, {});
    expect(g.witch.x).toBeCloseTo(c.x, 3); expect(g.witch.z).toBeCloseTo(c.z, 3); expect(g.witch.seated).toBeFalsy(); expect(g.witch.perch).toBe(true);
    while (g.herTime < (ko.riseUntil! + ko.seatAt) / 2) press(g, {});
    expect(Math.hypot(g.witch.x - c.x, g.witch.z - c.z)).toBeGreaterThan(1); // (on her way)
    let scratch = 0;
    while (g.herTime < ko.seatAt + 0.05) { press(g, {}); scratch += g.koEvents.filter(e => e.kind === "scratch").length; }
    expect(g.witch.x).toBeCloseTo(g.map.start.x, 3); expect(g.witch.z).toBeCloseTo(g.map.start.z, 3); expect(g.witch.seated).toBe(true);
    expect(scratch).toBe(1);
  });

  it("pushes the camera in while she's on its floor, and lets it back out as she flies off", () => {
    const g = game(JETS);
    run(g, 0.2, { moveZ: -1 }); run(g, 4);
    expect(g.camera.house ?? 0).toBeGreaterThan(0.95);
    press(g, { toggleMode: true }); run(g, 4);
    expect(g.camera.house ?? 0).toBeLessThan(0.05);
  });
});

describe("who carries the Ent (art/carrier.js)", () => {
  const isl = (kind: string) => ({ island: { kind } }), t = (carrier?: string) => ({ ...TUNING, treehouse: { ...TUNING.treehouse, carrier } });
  it("is the island's own kind's legend, none at home or off an island", () => {
    expect(carrierOf(isl("bear"), t("island"))).toBe("bear");
    expect(carrierOf(isl("bear"), t())).toBe("bear");
    expect(carrierOf(isl("home"), t("island"))).toBeNull();
    expect(carrierOf({ island: null }, t("island"))).toBeNull();
  });
  it("can be set to a kind everywhere, or to no one", () => {
    expect(carrierOf({ island: null }, t("owl"))).toBe("owl");
    expect(carrierOf(isl("home"), t("owl"))).toBe("owl");
    expect(carrierOf(isl("bear"), t("none"))).toBeNull();
  });
});
