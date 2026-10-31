// A long build split into short steps (render/slices.ts; Ed's laptop, 2026-10-20: the View's island build was one 10 s task): run
// straight through or a slice at a time it does the same steps in the same order, the page gets its turns between the slices, and
// the builds split into steps make exactly what they made in one go.
import { describe, expect, it } from "vitest";
import { generateMap } from "../rules/map";
import { Forest } from "../rules/forest";
import { TUNING } from "../rules/tuning";
import { HeightField } from "./height";
import { runSliced, runSync, sliceLog, type Steps } from "./slices";

// Keep the seeded radius map for the height integration: its 400 m sample window and moved terrain window need the original spatial extent.
/** A clock of the test's own (ms): a step's work moves it on, so the slicing is the same however loaded the machine is. */
const clock = { t: 0, now: () => clock.t };
function* counted(log: string[], n: number, spin = 0): Steps<number> {
  for (let i = 0; i < n; i++) {
    if (i === 3) yield "half";
    else yield;
    clock.t += spin; // (a step's work)
    log.push(`step ${i}`);
  }
  return n;
}

describe("a build in steps (render/slices.ts)", () => {
  it("runs every step in order, straight through or sliced, and returns what it makes", async () => {
    const a: string[] = [], b: string[] = [];
    expect(runSync(counted(a, 7))).toBe(7);
    expect(await runSliced(counted(b, 7), "test")).toBe(7);
    expect(b).toEqual(a);
    expect(a).toHaveLength(7);
  });
  it("gives the page its turns between slices of about the budget, and logs its longest step", async () => {
    const log: string[] = [];
    let turns = 0, running = true;
    const tick = () => { if (!running) return; turns++; setTimeout(tick, 0); }; // (the page's other work: a task between the build's)
    setTimeout(tick, 0);
    await runSliced(counted(log, 12, 4), "test", 8, clock.now);
    running = false;
    expect(turns).toBeGreaterThanOrEqual(4); // (12 steps of 4 ms in 8 ms slices: about 6 slices, the page's turns between)
    const s = sliceLog.at(-1)!;
    expect(s.what).toBe("test");
    expect(s.slices).toBe(6); // (two 4 ms steps fill each 8 ms slice)
    expect(s.longest).toBe(4);
    expect(s.ms).toBe(48);
  });
  it("fills the height field's window in steps exactly as follow fills it at once", { timeout: 120000 }, () => {
    const map = generateMap(6, TUNING), forest = new Forest(map), df = map.dancefloor;
    const H = { on: true, amplitude: 40, scale: 170, octaves: 2, maxSlope: Math.tan((30 * Math.PI) / 180) };
    const once = new HeightField(map, forest, H), stepped = new HeightField(map, forest, H);
    once.follow(df.x + 30, df.z - 20);
    let steps = 0;
    for (const s = stepped.fillSteps(df.x + 30, df.z - 20); !s.next().done;) steps++;
    expect(steps).toBeGreaterThan(8);
    const half = (f: HeightField) => (f.texture.image as { data: Uint16Array }).data;
    expect(Buffer.from(half(stepped).buffer).equals(Buffer.from(half(once).buffer))).toBe(true);
    for (let k = 0; k < 400; k++) { const x = df.x + ((k * 37.7) % 400) - 200, z = df.z + ((k * 91.3) % 400) - 200; expect(stepped.heightAt(x, z)).toBe(once.heightAt(x, z)); }
    // and both move on alike
    once.follow(df.x + 90, df.z + 40); stepped.follow(df.x + 90, df.z + 40);
    expect(Buffer.from(half(stepped).buffer).equals(Buffer.from(half(once).buffer))).toBe(true);
  });
});
