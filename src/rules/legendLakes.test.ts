// Legends walk round lakes (Ed, 2026-11-03: "Legends walk round lakes"): a happy legend following the ley route, one walking home
// to where it lay, and a charger's walk back after its long charge all go round a lake's shore, never onto the water, and get
// there (no looping at the shore while the game's creaturesAshore keeps pushing it back).
import { describe, expect, it } from "vitest";
import { TUNING, type Tuning } from "./tuning";
import { generateMap, type ForestMap } from "./map";
import { creaturesAshore, lakeDepth, lakeKnobs, roundLakes } from "./lakes";
import { dryRoute, stepLongCharge, walkFriendlyRoute } from "./combat/legend";
import { stepLegendStates, LEGENDS } from "./legends";
import type { Creature } from "./creatures";
import { FIGHT } from "./movement";
import { newCombat } from "./combat";
import { Grid } from "./combat/targeting";
import type { CombatWorld, Fight } from "./combat/data";

// A 40-area phase-4 island (as rules/lakes.test.ts): a real lake with land either side of its deepest water.
const isle: Tuning = { ...TUNING, map: { ...TUNING.map!, islandAreas: 40, island: "", phase: 4 } };
let made: ForestMap | undefined;
const mapOf = () => (made ??= generateMap(1, isle));
const DT = 1 / 60;
/** Metres of a polyline over a lake's water (every 2 m along it). */
const wetMetres = (B: ForestMap["bounds"], pts: readonly { x: number; z: number }[]) => { let w = 0; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i], d = Math.hypot(b.x - a.x, b.z - a.z), n = Math.max(1, Math.ceil(d / 2)); for (let k = 1; k <= n; k++) if (lakeDepth(B, a.x + ((b.x - a.x) * k) / n, a.z + ((b.z - a.z) * k) / n) > 0) w += d / n; } return w; };
/** Two points ashore either side of the map's deepest lake water, the straight way between them across it. */
function across(m: ForestMap) {
  const L = m.bounds.lakes!;
  let best = 0;
  for (let k = 0; k < L.dist.length; k++) if (L.dist[k] > L.dist[best]) best = k;
  const p = { x: L.x0 + (best % L.cols) * L.step, z: L.z0 + Math.floor(best / L.cols) * L.step }, s = L.shore(p.x, p.z);
  const a = { x: s.x + s.nx * 40, z: s.z + s.nz * 40 }, b = { x: p.x - (a.x - p.x), z: p.z - (a.z - p.z) };
  return { a, b };
}
const legend = (x: number, z: number, more: Partial<Creature> = {}) => ({ id: 0, species: "boar", level: 3, boss: true, x, z, tx: x, tz: z, gone: false, leashed: false, walk: 0, cell: [0, 0], ...more }) as Creature;

describe("legends walk round lakes", () => {
  it("has a lake between the two ends to test on", () => {
    const m = mapOf(), { a, b } = across(m), B = m.bounds;
    expect(lakeDepth(B, a.x, a.z)).toBeLessThan(-lakeKnobs(isle).pad);
    expect(lakeDepth(B, b.x, b.z)).toBeLessThan(-lakeKnobs(isle).pad);
    expect(wetMetres(B, [a, b])).toBeGreaterThan(20);
  }, 120000);

  it("a friendly legend whose route crosses a lake walks round it and on past it, never in the water, in good time", () => {
    const m = mapOf(), B = m.bounds, { a, b } = across(m), pad = lakeKnobs(isle).pad, clear = lakeKnobs(isle).shore + 4;
    const n = Math.ceil(Math.hypot(b.x - a.x, b.z - a.z) / 3), line = Array.from({ length: n + 1 }, (_, i) => [a.x + ((b.x - a.x) * i) / n, a.z + ((b.z - a.z) * i) / n] as const);
    const dry = dryRoute(B, line, clear, 4);
    // (the route kept off the water, its ends where the line's are, its metres along the ley line rising from 0 to the line's whole)
    expect(wetMetres(B, dry.line.map(([x, z]) => ({ x, z })))).toBe(0);
    expect(dry.line[0]).toEqual(line[0]); expect(dry.line[dry.line.length - 1]).toEqual(line[line.length - 1]);
    for (let i = 1; i < dry.source.length; i++) expect(dry.source[i]).toBeGreaterThanOrEqual(dry.source[i - 1]);
    expect(dry.source[0]).toBe(0); expect(dry.source[dry.source.length - 1]).toBeCloseTo(Math.hypot(b.x - a.x, b.z - a.z), 6);
    // (no lakes in the way: the very line, unchanged)
    const clearLine = [[a.x, a.z], [a.x + 1, a.z]] as const;
    expect(dryRoute(B, clearLine, clear, 4).line).toBe(clearLine);
    // Walking it, as the game does (the front past its end, the shore stop after every step): past the lake, never on the water.
    FIGHT.speed = 1;
    const c = legend(a.x, a.z), speed = TUNING.combat.legendRun, round = (x: number, z: number, tx: number, tz: number) => roundLakes(B, x, z, tx, tz, clear);
    let length = 0;
    for (let i = 1; i < dry.line.length; i++) length += Math.hypot(dry.line[i][0] - dry.line[i - 1][0], dry.line[i][1] - dry.line[i - 1][1]);
    const bound = (length / speed) * 1.2 + 5;
    let t = 0;
    for (; t < bound && Math.hypot(c.x - b.x, c.z - b.z) > 1; t += DT) {
      walkFriendlyRoute(c, dry.line, Infinity, DT, speed, round);
      c.tx = c.x; c.tz = c.z; creaturesAshore([c], B, pad);
      expect(lakeDepth(B, c.x, c.z)).toBeLessThan(0);
    }
    expect(t).toBeLessThan(bound);
  }, 120000);

  it("a legend walking home across a lake goes round its shore and lies down at home, never in the water, in good time", () => {
    const m = mapOf(), B = m.bounds, { a, b } = across(m), pad = lakeKnobs(isle).pad;
    const c = legend(a.x, a.z, { homing: true, lairX: b.x, lairZ: b.z, legendState: "asleep" });
    const w = { creatures: [c], map: m, time: 0, dt: DT, partified: () => false, areaOf: () => "0,0" };
    const bound = (Math.hypot(b.x - a.x, b.z - a.z) * 3) / LEGENDS.homeSpeed + 5;
    for (; w.time < bound && c.homing; w.time += DT) {
      stepLegendStates(w, [0]);
      creaturesAshore([c], B, pad);
      expect(lakeDepth(B, c.x, c.z)).toBeLessThan(0);
    }
    expect(c.homing).toBeUndefined();
    expect([c.x, c.z]).toEqual([b.x, b.z]);
  }, 120000);

  it("a charger's walk back home after its long charge goes round the lake, never in the water", () => {
    const m = mapOf(), B = m.bounds, { a, b } = across(m), pad = lakeKnobs(isle).pad, clear = lakeKnobs(isle).shore + 4;
    FIGHT.speed = 1; FIGHT.scale = 1;
    const c = legend(a.x, a.z, { lairX: b.x, lairZ: b.z, run: { phase: "home", at: 0, angle: 0, speed: 0, turn: 1, target: null, tx: 0, tz: 0, ran: 0, hit: [], fromX: a.x, fromZ: a.z } });
    const f: Fight = { target: null, readyAt: 0, windupUntil: 0, aimX: 0, aimZ: 0 };
    const w = { creatures: [c], active: [c], witches: [], time: 0, dt: DT, t: TUNING, asleep: () => false, inArea: () => true, round: (x: number, z: number, tx: number, tz: number) => roundLakes(B, x, z, tx, tz, clear) } as unknown as CombatWorld;
    const s = newCombat(), grid = new Grid([c]), bound = (Math.hypot(b.x - a.x, b.z - a.z) * 3) / LEGENDS.charge.returnSpeed + 5;
    for (; w.time < bound && c.run; w.time += DT) {
      stepLongCharge(w, s, c, f, grid, true);
      creaturesAshore([c], B, pad);
      expect(lakeDepth(B, c.x, c.z)).toBeLessThan(0);
    }
    expect(c.run).toBeUndefined();
    expect(Math.hypot(c.x - b.x, c.z - b.z)).toBeLessThan(1);
  }, 120000);
});
