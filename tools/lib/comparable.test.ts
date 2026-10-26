// Compare like with like (tools/lib/comparable.cjs; Ed, 2026-10-26): two runs' comparability keys may differ only in what's
// tested, a playtest log's medians go by scene, and the playtest compare refuses this morning's pair.
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
type Key = Record<string, unknown>;
type Seg = { scene: string; t0: number; t1: number; n: number; ms: number | null; gpu: number | null };
const { keyDiff, checkComparable, segments, byScene, compareFlags } = createRequire(import.meta.url)("./comparable.cjs") as {
  keyDiff(a: Key, b: Key, testing?: string[]): { field: string; a: unknown; b: unknown }[];
  checkComparable(a: Key | null, b: Key | null, o?: { testing?: string[]; override?: boolean; what?: string }): { ok: boolean; forced: boolean; diffs: { field: string }[]; text: string };
  segments(run: unknown): Seg[];
  byScene(run: unknown): Map<string, Seg>;
  compareFlags(args: string[]): { testing: string[]; override: boolean };
};

const key = (o: Key = {}): Key => ({ build: "v4522 abc", seed: 123, world: 0, island: "home", scene: "wave 0 · ground", spot: "play", viewport: "1280x720", pixelScale: "2 @1", renderer: "ANGLE (Apple M1)", machine: "Chrome 141 macOS · 8 cores", knobs: {}, ...o });
const sample = (t: number, wave: number, scene: string, ms: number) => ({ t, wave, scene, frames: { ms, p95: ms * 1.5, cpu: ms / 2, gpu: ms / 3 } });

describe("comparability keys", () => {
  it("differ in nothing but what's tested: the build by default", () => {
    expect(keyDiff(key(), key())).toEqual([]);
    expect(checkComparable(key(), key({ build: "v4821 def" })).ok).toBe(true);
    const d = keyDiff(key(), key({ build: "v4821", island: "fox", seed: 9 }), ["build"]);
    expect(d.map(x => x.field)).toEqual(["seed", "island"]);
  });
  it("compares the knobs one by one, a knob as built against one set", () => {
    const d = keyDiff(key({ knobs: { "occlusion.edge": 3, "?quick": "1" } }), key({ knobs: { "occlusion.edge": 4 } }));
    expect(d).toEqual([{ field: "knobs.?quick", a: "1", b: "(as built)" }, { field: "knobs.occlusion.edge", a: 3, b: 4 }]);
    expect(keyDiff(key({ knobs: { a: 1 } }), key({ knobs: { a: 2 } }), ["knobs"])).toEqual([]);
    expect(keyDiff(key({ knobs: { a: 1, b: 1 } }), key({ knobs: { a: 2, b: 2 } }), ["knobs.a"]).map(x => x.field)).toEqual(["knobs.b"]);
  });
  it("refuses a pair that differs in more, naming each field before and after; --override compares anyway", () => {
    const r = checkComparable(key(), key({ build: "v4821", island: "fox", renderer: "ANGLE (Intel)" }), { what: "the runs" });
    expect(r.ok).toBe(false);
    expect(r.text).toContain("REFUSED");
    expect(r.text).toContain("island: home → fox");
    expect(r.text).toContain("renderer: ANGLE (Apple M1) → ANGLE (Intel)");
    expect(r.text).not.toContain("  build:");
    const f = checkComparable(key(), key({ island: "fox" }), { override: true });
    expect(f.ok && f.forced).toBe(true);
  });
  it("can't judge a run made before keys: compares with a warning", () => {
    const r = checkComparable(null, key());
    expect(r.ok).toBe(true);
    expect(r.text).toMatch(/^warning/);
  });
  it("takes --testing and --override off the command line", () => {
    const args = ["a", "--testing", "build,knobs", "b", "--override"];
    expect(compareFlags(args)).toEqual({ testing: ["build", "knobs"], override: true });
    expect(args).toEqual(["a", "b"]);
  });
});

describe("a playtest log's segments", () => {
  // waves 0 to 2 after a sail, on the ground and in the treetops, and back on the ground
  const run = { key: key({ island: "fox" }), samples: [sample(10, 0, "ground", 10), sample(20, 0, "ground", 12), sample(30, 0, "treetops", 30), sample(40, 1, "treetops", 32), sample(50, 1, "ground", 14), sample(60, 1, "ground", 20), sample(70, 1, "ground", 16)] };
  it("splits where the island, wave or mode changes, with each segment's own medians", () => {
    const s = segments(run);
    expect(s.map(x => [x.scene, x.t0, x.t1, x.n, x.ms])).toEqual([
      ["fox · wave 0 · ground", 10, 20, 2, 10], ["fox · wave 0 · treetops", 30, 30, 1, 30], ["fox · wave 1 · treetops", 40, 40, 1, 32], ["fox · wave 1 · ground", 50, 70, 3, 16],
    ]);
  });
  it("falls back to the view's mode in a log from before scenes", () => {
    expect(segments({ samples: [{ t: 10, wave: 2, view: { mode: "treetop" }, frames: { ms: 5 } }] })[0].scene).toBe("? · wave 2 · treetops");
  });
  it("merges a scene's samples wherever they fall, for two runs side by side", () => {
    expect(byScene(run).get("fox · wave 1 · ground")?.n).toBe(3);
  });
});

describe("the playtest compare (tools/playtest/compare.cjs)", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "witch-cmp-"));
  const write = (n: string, runs: unknown[]) => { const p = path.join(dir, n); fs.writeFileSync(p, JSON.stringify(runs)); return p; };
  // this morning's pair: v4522 at wave 0 at home, v4821 at waves 0 to 4 after a sail to the fox's island
  const a = write("a.json", [{ build: "v4522", seed: 123, started: "2026-10-26T09:00", key: key(), samples: [sample(10, 0, "ground", 12), sample(20, 0, "ground", 13)] }]);
  const b = write("b.json", [{ build: "v4821", seed: 77, started: "2026-10-26T10:00", key: key({ build: "v4821", seed: 77, island: "fox" }), samples: [0, 1, 2, 3, 4].map(w => sample(10 + w * 10, w, "ground", 20)) }]);
  const same = write("c.json", [{ build: "v4821", seed: 123, started: "2026-10-26T11:00", key: key({ build: "v4821", scene: "wave 1 · ground" }), samples: [sample(10, 0, "ground", 11), sample(20, 1, "ground", 30)] }]);
  const tool = path.join(__dirname, "../playtest/compare.cjs");
  const run = (...args: string[]) => { try { return { code: 0, out: execFileSync(process.execPath, [tool, ...args], { encoding: "utf8" }) }; } catch (e) { const x = e as { status: number; stdout: string }; return { code: x.status, out: x.stdout }; } };
  it("refuses this morning's pair, saying which fields differ", () => {
    const r = run(a, b);
    expect(r.code).toBe(2);
    expect(r.out).toContain("seed: 123 → 77");
    expect(r.out).toContain("island: home → fox");
  });
  it("compares it with --override, and still only the scenes both runs have", () => {
    const r = run(a, b, "--override");
    expect(r.code).toBe(0);
    expect(r.out).toContain("| home · wave 0 · ground |");
    expect(r.out).toContain("not compared (in one run only)");
  });
  it("sets a like-for-like pair side by side by scene (the key's own scene, the last sampled, aside)", () => {
    const r = run(a, same);
    expect(r.code).toBe(0);
    expect(r.out).toContain("comparable");
    expect(r.out).toMatch(/\| home · wave 0 · ground \| 2 \/ 1 \| 12 → 11 \|/);
    expect(r.out).toContain("home · wave 1 · ground (b)");
  });
});
