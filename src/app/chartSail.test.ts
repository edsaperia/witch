// The sail's zoom and dive can't be skipped; the chart's back stops a sail during the zoom till it's committed (app/chartSail.ts;
// Ed, 2026-11-06: "Remove the ability to skip the zoom. But you can press circle to close the map and stop the sail while it's
// happening"; "Both the zoom and the dive are loading screens; they shouldn't be skippable because loading must happen. If it happens
// much faster than the two animations, we should be deciding their minimum length.").
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { ChartSail } from "./chartSail";
import { flyLegs } from "../render/chart/seaChart";
import { arrivePlan, planLength } from "../rules/arrive";
import { TUNING } from "../rules/tuning";
import { newGame } from "../rules/game";

const src = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");

describe("a sail's flight on the chart (ChartSail)", () => {
  it("nothing pressed during the zoom skips it or stops it: any key, held or not, any button", () => {
    const s = new ChartSail("fox", true);
    for (let i = 0; i < 60; i++) { expect(s.press(false)).toBe("none"); expect(s.press(false, true)).toBe("none"); }
    expect(s.committed).toBe(false);
  });
  it("its back (circle, E at a table, Esc over the game) stops the sail before it's committed, never on a held key's repeat", () => {
    const s = new ChartSail("fox", true);
    expect(s.frame(false)).toBe(false); // (still gliding in to frame the island: nothing made yet)
    expect(s.press(true, true)).toBe("none");
    expect(s.press(true)).toBe("cancel");
    expect(s.committed).toBe(false); // (stopped: no night made, departFromChart never called)
  });
  it("commits once, at the end of the zoom's first leg; from then the back does nothing and it flies on to the hand-off", () => {
    const s = new ChartSail("fox", true);
    expect(s.frame(true)).toBe(true); // (the one frame the next night starts being made under it)
    expect(s.frame(true)).toBe(false);
    expect(s.press(true)).toBe("none");
    s.handOver();
    expect(s.press(true)).toBe("none");
  });
  it("a flight with no night made under it commits only at its hand-off", () => {
    const s = new ChartSail("fox", false);
    expect(s.frame(true)).toBe(false);
    expect(s.press(true)).toBe("cancel");
    s.handOver();
    expect(s.press(true)).toBe("none");
  });
});

describe("the zoom's and the dive's lengths (the tuning's arrive.zoom, arrive.dive)", () => {
  it("the zoom's three legs scale together to arrive.zoom, its own 5.6 s the default", () => {
    const sum = (l: ReturnType<typeof flyLegs>) => l.frame + l.swoop + l.run;
    expect(TUNING.arrive?.zoom).toBe(5.6);
    expect(sum(flyLegs())).toBeCloseTo(5.6, 6);
    expect(sum(flyLegs(TUNING.arrive?.zoom))).toBeCloseTo(5.6, 6);
    const ten = flyLegs(10);
    expect(sum(ten)).toBeCloseTo(10, 6);
    expect(ten.frame / ten.run).toBeCloseTo(1.6 / 1.2, 6);
  });
  it("the dive is its legs' own length with arrive.dive 0 (the default), and exactly arrive.dive seconds when it's set", () => {
    const A = TUNING.arrive!, g = newGame(4242, TUNING);
    expect(A.dive).toBe(0);
    const rec = { v: 1 as const, island: "home", world: 0, at: 0, cam: { x: 0, z: 400, height: 300, pitch: 0.66, fov: 40 } };
    const end = { tx: g.map.treehouse.x, ty: 20, tz: g.map.treehouse.z, angle: 40, distance: 30, fov: 40 };
    const own = planLength(arrivePlan(rec, g.map, A, () => 0, end));
    expect(own).toBeGreaterThan(A.rise + A.settle);
    const set = arrivePlan(rec, g.map, { ...A, dive: 30 }, () => 0, end);
    expect(planLength(set)).toBeCloseTo(30, 6);
    expect(set.times.every((t, i) => i === 0 || t > set.times[i - 1])).toBe(true);
  });
});

describe("how the game takes input during the zoom and the dive", () => {
  it("the chart: no key, button, tap or click skips the flight; only its back stops it, through ChartSail", () => {
    const chart = src("./chartView.ts");
    expect(chart).not.toMatch(/skipFlight/);
    expect(chart).toMatch(/if \(chart\.flying\) \{ e\.preventDefault\(\); if \(flight\?\.press\(backKey\(e\), e\.repeat\) === "cancel"\) putDown\(\); return; \}/);
    expect(chart).toMatch(/if \(chart\.flying\) \{ if \(flight\?\.press\(back\) === "cancel"\) putDown\(\); return; \}/);
    const down = chart.slice(chart.indexOf('canvas.addEventListener("pointerdown"'), chart.indexOf('canvas.addEventListener("pointermove"'));
    expect(down).toMatch(/if \(chart\.flying\) return;/);
    // the next night is made only from the commit (never as the flight sets off), and a committed sail can't be put down
    expect(chart).toMatch(/const commitFrame = \(\) => \{ if \(flight\?\.frame\(chart\.flightFramed\)\) void depart\(flight\.island\); \};/);
    expect(chart.match(/void depart\(/g)).toHaveLength(1);
    expect(chart).toMatch(/if \(flight\?\.committed\) return false;/);
    expect(chart).toMatch(/closable: \(\) => !flight\?\.committed,/);
    expect(src("../render/chart/seaChart.ts")).not.toMatch(/skipFlight/);
  });
  it("the game: E or circle at the table puts the chart down only while it may; nothing skips the dive", () => {
    const main = src("../main.ts");
    expect(main).toMatch(/function frameBody\(now: number\): void \{ return a4_frameBody\(pageHost, now\); \}/);
    expect(main).toMatch(/get chartAt\(\): typeof chartAt \{ return chartAt; \}, set chartAt\(value: typeof chartAt\) \{ chartAt = value; \}/);
    expect(src("./pageFrame.ts")).toMatch(/if \(pageHost\.chartAt && chartOpen\(\) && putChartDown\(\)\) pageHost\.chartAt = null;/);
    expect(main).not.toMatch(/armSkip|arrival\.skip\(\); \}, \{ capture/);
    expect(main).toMatch(/const armGesture = \(\): void => a4_armGesture\(pageHost\);/);
    const night = src("./pageNight.ts"), gesture = night.slice(night.indexOf("export function armGesture("), night.indexOf("export function armBack("));
    expect(gesture).toMatch(/pageHost\.gestured = true;/);
    expect(gesture).not.toMatch(/skip/);
    expect(src("../ui/chartOverlay.ts")).toMatch(/if \(!open \|\| !open\.view\.closable\(\)\) return false;/);
  });
});
