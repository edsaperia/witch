// The bench's declared differences (tools/bench/expect.cjs): green on what a PR declares it changes, red on anything else.
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
const { readExpect, judge, startingDifferences } = createRequire(import.meta.url)("./expect.cjs") as {
  readExpect(f: typeof fs, file: string | null): Record<string, unknown> | null;
  judge(bad: { key: string | null; text: string }[], e: unknown): { ok: { key: string; why: string }[]; left: { key: string | null }[]; unseen: string[] };
  startingDifferences(name: string, before: unknown, after: unknown): { key: string | null; text: string }[];
};

const bad = [
  { key: "rules:creatures", text: "rules seed 123: creatures" },
  { key: "frames:boot", text: "frames boot: 120 pixels differ" },
  { key: "frames:wave-fight", text: "frames wave-fight: 40 pixels differ" },
  { key: null, text: "frames: bedroom missing after" },
];
const file = (o: unknown) => { const f = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "bench-expect-")), "e.json"); fs.writeFileSync(f, JSON.stringify(o)); return f; };

describe("the bench's declared differences", () => {
  it("with nothing declared, every mismatch is one", () => {
    expect(readExpect(fs, null)).toBeNull();
    expect(readExpect(fs, "/no/such/file.json")).toBeNull();
    expect(judge(bad, null).left).toHaveLength(4);
  });
  it("only what's declared passes, with its reason; the rest, and what can't be declared, still fail", () => {
    const e = readExpect(fs, file({ reason: "the boot's trees recoloured", frames: { boot: "the trees' new colours" }, rules: { creatures: "a new species" } }));
    const r = judge(bad, e);
    expect(r.ok.map(b => [b.key, b.why])).toEqual([["rules:creatures", "a new species"], ["frames:boot", "the trees' new colours"]]);
    expect(r.left.map(b => b.key)).toEqual(["frames:wave-fight", null]);
  });
  it("* declares every scene (or every part) of its kind", () => {
    const r = judge(bad.slice(0, 3), readExpect(fs, file({ reason: "a new look everywhere", frames: { "*": "every scene's art" } })));
    expect(r.ok.map(b => b.key)).toEqual(["frames:boot", "frames:wave-fight"]);
    expect(r.left.map(b => b.key)).toEqual(["rules:creatures"]);
  });
  it("says what was declared but didn't differ", () => {
    const r = judge([bad[1]], readExpect(fs, file({ reason: "x", frames: { boot: "a", bedroom: "b" }, rules: { "*": "c" } })));
    expect(r.unseen.sort()).toEqual(["frames:bedroom", "rules:*"]);
  });
  it("refuses a declaration with no reason, a reason missing, or a field it doesn't know", () => {
    expect(() => readExpect(fs, file({ frames: { boot: "x" } }))).toThrow(/reason/);
    expect(() => readExpect(fs, file({ reason: "x", frames: { boot: "" } }))).toThrow(/boot/);
    expect(() => readExpect(fs, file({ reason: "x", scenes: {} }))).toThrow(/unknown field/);
  });
});

describe("named-scene initial position declarations", () => {
  const start = { time: 0, herTime: 0, acc: 0, alpha: 1, x: 4, z: 5, mode: "ground", seated: true, wave: 0, islandReady: false, paused: false, artPending: 0, manual: true, ready: true };
  const moved = { ...start, x: 8, z: 9 };
  const declaration = () => readExpect(fs, file({ reason: "authored seat moved", start: { boot: "new seat" } }));
  it("rejects undeclared initial position drift, including when only pixels or another scene were declared", () => {
    const bad = startingDifferences("boot", start, moved);
    for (const e of [null, { frames: { boot: "new art", "*": "all art" } }, { start: { bedroom: "new seat" } }, { start: { "*": "invalid bypass" } }]) expect(judge(bad, e).left).toHaveLength(1);
  });
  it("accepts declared finite initial x/z only, and reports unused declarations", () => {
    const e = declaration(), result = judge(startingDifferences("boot", start, moved), e);
    expect(result.left).toEqual([]); expect(result.ok.map(b => b.key)).toEqual(["start:boot"]);
    expect(judge(startingDifferences("boot", start, start), e).unseen).toEqual(["start:boot"]);
  });
  it("rejects every other boundary field's drift even alongside declared position drift", () => {
    for (const key of Object.keys(start).filter(k => k !== "x" && k !== "z")) {
      const value = start[key as keyof typeof start];
      const changed = { ...moved, [key]: typeof value === "number" ? value + 1 : typeof value === "boolean" ? !value : "changed" };
      expect(judge(startingDifferences("boot", start, changed), declaration()).left.map(b => b.key), key).toEqual([null]);
    }
    expect(judge(startingDifferences("boot", start, { ...moved, extra: true }), declaration()).left).toHaveLength(1);
    const { ready: _ready, ...missing } = moved;
    expect(judge(startingDifferences("boot", start, missing), declaration()).left).toHaveLength(1);
  });
  it("cannot declare missing boundaries or missing/non-finite coordinates", () => {
    for (const b of [undefined, null, { ...moved, x: undefined }, { ...moved, x: NaN }, { ...moved, z: Infinity }]) expect(judge(startingDifferences("boot", start, b), declaration()).left).toHaveLength(1);
  });
  it("rejects start wildcards, blank scene names and missing reasons at parsing", () => {
    for (const start of [{ "*": "all scenes" }, { " ": "blank" }, { boot: "" }, null]) expect(() => readExpect(fs, file({ reason: "seat", start }))).toThrow();
  });
});
