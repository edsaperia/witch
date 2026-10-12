// The treehouse deck (Ed, 2026-10-11: "a circle with a wooden floor and a balustrade sitting on the ent. You land on it by being at
// treetop height, and during the night time slower 10x"; rules/treehouse.ts).
import { describe, expect, it } from "vitest";
import { TUNING, withTuning } from "./tuning";
import { newGame, stepGame, STEP, type Game } from "./game";
import { carrierOf, deckOf, keepOnDeck, onTreehouse } from "./treehouse";
import { witchHeight } from "./witch";

const run = (g: Game, secs: number, c: object = {}) => { for (let i = 0; i < Math.round(secs / STEP); i++) stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...c } as Parameters<typeof stepGame>[1], STEP); };
const press = (g: Game, c: object) => run(g, STEP, c);
const D = TUNING.treehouse.deck!;
const game = () => { const g = newGame(123, TUNING); g.clock.paused = false; return g; };
const events = (g: Game, kind: string) => g.leashEvents.filter(e => e.kind === kind);

describe("the treehouse deck", () => {
  it("starts her at her decks on the deck, 22 m up, by the south rail behind the decks", () => {
    const g = game(), d = deckOf(g.map, TUNING)!, w = g.witch;
    expect(d.h).toBe(22);
    expect(w.seated).toBe(true); expect(w.perch).toBe(true);
    expect(w.x).toBeCloseTo(d.x, 6); expect(w.z).toBeCloseTo(d.z + D.seat, 6);
    expect(witchHeight(w, TUNING)).toBeCloseTo(22 + TUNING.groundHeight, 6);
    expect(onTreehouse(g)).toBe(false); // (at her decks: not yet walking the deck)
  });

  it("keeps her on it as she walks: inside the rail, round the map table, out of the decks", () => {
    const g = game(), d = deckOf(g.map, TUNING)!;
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
    expect(g.timeScale).toBeCloseTo(TUNING.legendCircle!.slow.scale, 6);
    const t0 = g.clock.time; run(g, 1);
    expect(g.clock.time - t0).toBeCloseTo(TUNING.legendCircle!.slow.scale, 2);
    press(g, { toggleMode: true });
    run(g, 2);
    expect(g.witch.mode).toBe("treetop"); expect(g.witch.perch).toBeFalsy();
    expect(g.timeScale).toBe(1);
  });

  it("takes her off it rising, and lands her back on it coming down over it; elsewhere she lands on the ground", () => {
    const g = game(), d = deckOf(g.map, TUNING)!;
    run(g, 0.2, { moveX: 1 });
    press(g, { toggleMode: true });
    expect(events(g, "perch").map(e => e.on)).toEqual([false]);
    run(g, 2);
    expect(g.witch.mode).toBe("treetop");
    press(g, { toggleMode: true });
    expect(events(g, "perch")).toEqual([]);
    run(g, 2);
    expect(g.witch.mode).toBe("ground"); expect(g.witch.perch).toBe(true);
    expect(witchHeight(g.witch, TUNING)).toBeCloseTo(D.height + TUNING.groundHeight, 6);
    expect(Math.hypot(g.witch.x - d.x, g.witch.z - d.z)).toBeLessThanOrEqual(d.r);
    // up (once the rise cooldown's done), away east 40 m, down: the ground
    run(g, 2); press(g, { toggleMode: true }); run(g, 2);
    run(g, 1.2, { moveX: 1 }); run(g, 1);
    expect(Math.hypot(g.witch.x - d.x, g.witch.z - d.z)).toBeGreaterThan(d.r + d.grace);
    press(g, { toggleMode: true }); run(g, 2);
    expect(g.witch.mode).toBe("ground"); expect(g.witch.perch).toBeFalsy();
    expect(witchHeight(g.witch, TUNING)).toBeCloseTo(TUNING.groundHeight, 6);
  });

  it("tells of landing on it (the 'perch' event) and of E at the map table (the 'chart' event); nothing goes down up there", () => {
    const g = game(), d = deckOf(g.map, TUNING)!;
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
    const T = withTuning({ treehouse: { ...TUNING.treehouse, deck: { ...D, on: false } } }), g = newGame(123, T);
    expect(g.witch.perch).toBeFalsy();
    expect(g.witch.z).toBeCloseTo(g.map.treehouse.z + 1, 6);
    expect(witchHeight(g.witch, T)).toBeCloseTo(T.groundHeight, 6);
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
