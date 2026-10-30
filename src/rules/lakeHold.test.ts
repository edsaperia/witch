// No coming down over a lake (Ed, 2026-10-23: "At the moment you can press x to leave treetop mode while over a lake; you go
// lower and move more slowly. I don't think you should be able to do that"): up in the treetops over the water, the press to
// come down is dropped (rules/game.ts), said by the "lakeHold" leash event, and she flies on at full height; ashore it works
// as ever; and her followers' pull never lands her on the water (rules/witch.ts).
import { describe, expect, it } from "vitest";
import { TUNING, type Tuning } from "./tuning";
import { newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { lakeDepth, lakeKnobs } from "./lakes";
import { newWitch, stepWitch, NO_INTENT, type WitchState } from "./witch";

// Keep this 40-area phase-4 seed: it supplies the real deep-water/ashore pair used by the lake landing regression.
const isle: Tuning = { ...TUNING, map: { ...TUNING.map!, islandAreas: 40, island: "", phase: 4 } };
const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };

/** Her in the treetops at (x, z), waves off. */
function upAt(g: Game, x: number, z: number): void {
  const W = g.witches[0];
  g.clock.paused = false; g.party.paused = true;
  W.body = { ...W.body, seated: false, mode: "treetop", lift: 1, x, z, vx: 0, vz: 0 };
}
/** The deepest point of the map's lakes, and a point well ashore of it. */
function spots(g: Game) {
  const L = g.map.bounds.lakes!;
  let best = 0;
  for (let k = 0; k < L.dist.length; k++) if (L.dist[k] > L.dist[best]) best = k;
  const water = { x: L.x0 + (best % L.cols) * L.step, z: L.z0 + Math.floor(best / L.cols) * L.step };
  const s = L.shore(water.x, water.z), land = { x: s.x + s.nx * 30, z: s.z + s.nz * 30 };
  return { water, land };
}

describe("no coming down over a lake", () => {
  const g0 = newGame(1, isle);

  it("has a lake to test on", () => {
    expect(g0.map.bounds.lakes).toBeTruthy();
    const { water, land } = spots(g0), pad = lakeKnobs(isle).pad;
    expect(lakeDepth(g0.map.bounds, water.x, water.z)).toBeGreaterThan(pad);
    expect(lakeDepth(g0.map.bounds, land.x, land.z)).toBeLessThan(-pad);
  });

  it("pressing to come down over the water leaves her in the treetops, said by the lakeHold event", () => {
    const g = newGame(1, isle), { water } = spots(g);
    upAt(g, water.x, water.z);
    stepGame(g, { ...idle, toggleMode: true }, STEP);
    expect(g.leashEvents.some(e => e.kind === "lakeHold")).toBe(true);
    for (let i = 0; i < 3 / STEP; i++) stepGame(g, idle, STEP);
    const W = g.witches[0].body;
    expect(W.mode).toBe("treetop");
    expect(W.lift).toBe(1);
  });

  it("ashore, the same press brings her down as ever", () => {
    const g = newGame(1, isle), { land } = spots(g);
    upAt(g, land.x, land.z);
    stepGame(g, { ...idle, toggleMode: true }, STEP);
    expect(g.leashEvents.some(e => e.kind === "lakeHold")).toBe(false);
    for (let i = 0; i < 5 / STEP; i++) stepGame(g, idle, STEP);
    expect(g.witches[0].body.mode).toBe("ground");
  });

  it("her followers' pull never lands her on the water", () => {
    const { water } = spots(g0), B = g0.map.bounds;
    let w: WitchState = { ...newWitch(water.x, water.z), mode: "treetop", lift: 1 };
    const load = { total: 12, over: 10, extreme: true, x: 0, z: 0 };
    for (let i = 0; i < 20 / STEP; i++) w = stepWitch(w, NO_INTENT, STEP, isle, B, load);
    expect(w.mode).toBe("treetop");
    expect(w.lift).toBeGreaterThan(0);
  });
});
