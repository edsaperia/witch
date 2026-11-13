// Friendly legends follow the actual ley drawing front; their ordinary idle must never replace that movement.
import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP } from "./game";
import { heldByCombat, stepCreaturesNear } from "./creatures";
import { cheer } from "./legends";
import { TUNING } from "./tuning";
import { smallWorldTuning } from "../test/worlds";
import { friendlyLegendRoute } from "./combat/legend";
import { frontMetres, pulseRouteMetres, TIP_PACE } from "./leypulse";
import { leyChain } from "./leylines";
import { linkLine } from "./pulseRoute";
import { homeArea } from "./homeArea";
import { guardsHome } from "./creatures";
import { restoreGame, snapshotGame } from "./nightSnapshot";

const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
function scene() {
  const g = newGame(123, smallWorldTuning(TUNING, "Friendly legend route wiring and idle ownership require a dealt legend and an actual ley curve, not world extent."));
  g.clock.paused = false; g.party.paused = true; g.party.spellAt = 0; g.party.bootFrom = 0; g.party.bootUntil = 0; g.clock.time = 120;
  const c = g.creatures.find(c => c.boss)!;
  for (const other of g.creatures) if (other !== c) other.gone = true;
  cheer(c, g.clock.time); Object.assign(c, { seen: g.clock.time, fight: undefined, asleep: false, bed: undefined, napUntil: undefined, homing: undefined });
  g.byArea = null;
  g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
  return { g, c };
}

describe("friendly legend route integration", () => {
  it("uses the actual curved ley route and drawing front, distinct from the wave pulse", () => {
    const { g } = scene(), route = friendlyLegendRoute(g), { stones } = leyChain(g.party, g.map);
    const expected = stones.slice(1).flatMap((stone, i) => {
      const line = linkLine(g.map, stones[i], stone); return i ? line.slice(1) : line;
    });
    expect(route.line).toEqual(expected);
    expect(route.tip).toBe(frontMetres(g.party, g.map, g.clock.time, g.tuning.leyLines.reveal ?? TIP_PACE));
    expect(route.tip).toBeGreaterThan(pulseRouteMetres(g.party, g.map, g.clock.time));
    expect(friendlyLegendRoute(g).line).toBe(route.line);
  });

  it("stepGame walks an idle happy legend along the route without its ordinary roam overriding the move", () => {
    const { g, c } = scene(), route = friendlyLegendRoute(g), start = route.line[0];
    expect(start).toBeDefined(); expect(route.tip).toBeGreaterThan(0);
    Object.assign(c, { x: start[0], z: start[1], tx: start[0] - 100, tz: start[1], rest: 0 });
    g.witch = { ...g.witch, x: c.x + 100, z: c.z };
    expect(heldByCombat(c)).toBe(true);
    stepGame(g, idle, STEP);
    expect(Math.hypot(c.x - start[0], c.z - start[1]), JSON.stringify({ time: g.clock.time, state: c.legendState, level: c.level, asleep: c.asleep, bed: c.bed, fight: c.fight, moving: c.moving, win: g.win?.phase, partyOver: g.partyOver, tip: friendlyLegendRoute(g).tip, run: c.run, homing: c.homing, gone: c.gone, scale: g.timeScale })).toBeCloseTo(g.tuning.combat.legendRun * STEP, 3);
    expect(c.moving).toBe(true);
  });

  it("walks on past the drawing tip to the route's far end, turns back there, guards home once back, and a saved night keeps its stage (Ed, 2026-11-13)", () => {
    const { g, c } = scene(), route = friendlyLegendRoute(g), line = route.line, end = line[line.length - 1], near = line[line.length - 2];
    let metres = 0; for (let i = 1; i < line.length - 1; i++) metres += Math.hypot(line[i][0] - line[i - 1][0], line[i][1] - line[i - 1][1]);
    expect(metres).toBeGreaterThan(route.tip); // (the line isn't drawn this far yet)
    g.witch = { ...g.witch, x: line[0][0] + 5000, z: line[0][1] };
    Object.assign(c, { x: near[0], z: near[1] });
    const far = () => Math.hypot(c.x - end[0], c.z - end[1]), before = far();
    stepGame(g, idle, STEP);
    expect(far()).toBeLessThan(before); expect(c.journey).toBeUndefined();
    Object.assign(c, { x: end[0], z: end[1] });
    stepGame(g, idle, STEP);
    expect(c.journey).toEqual({ stage: "back" });
    stepGame(g, idle, STEP);
    expect(far()).toBeCloseTo(g.tuning.combat.legendRun * STEP, 3);
    expect(restoreGame(JSON.parse(JSON.stringify(snapshotGame(g)))).creatures[c.id].journey).toEqual({ stage: "back" });
    Object.assign(c, { x: line[0][0], z: line[0][1] });
    stepGame(g, idle, STEP);
    const H = homeArea(g.map);
    expect(c.journey?.stage).toBe("guard"); expect(H.inside(c.journey!.x!, c.journey!.z!)).toBe(true); expect(guardsHome(c)).toBe(true);
    const off = () => Math.hypot(c.x - c.journey!.x!, c.z - c.journey!.z!);
    for (let i = 0; i < 60 * 40 && (off() > 0.01 || c.moving); i++) stepGame(g, idle, STEP);
    expect(off()).toBeLessThan(0.01); expect(c.moving).toBe(false); expect(H.inside(c.x, c.z)).toBe(true);
    expect(restoreGame(JSON.parse(JSON.stringify(snapshotGame(g)))).creatures[c.id].journey).toEqual(c.journey);
    // (its party egg and the win's dance take it off guard: rules/creatures.ts guardsHome)
    c.partyLegend = true; expect(guardsHome(c)).toBe(false);
  });

  it("does not teleport an unseen route legend home or apply ordinary roam; party and leashed legends keep their old ownership", () => {
    const { g, c } = scene();
    Object.assign(c, { x: c.homeX + 200, z: c.homeZ + 100, seen: -100, tx: c.homeX, tz: c.homeZ, rest: 0 });
    const at = { x: c.x, z: c.z };
    stepCreaturesNear([c], c.homeX, c.homeZ, Infinity, STEP, g.clock.time, g.map);
    expect({ x: c.x, z: c.z }).toEqual(at); expect(c.seen).toBe(g.clock.time);
    c.partyLegend = true; expect(heldByCombat(c)).toBe(false);
    c.partyLegend = undefined; c.leashed = true; expect(heldByCombat(c)).toBe(false);
  });
});
