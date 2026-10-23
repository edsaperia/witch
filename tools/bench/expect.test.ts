// The bench's declared differences (tools/bench/expect.cjs): green on what a PR declares it changes, red on anything else.
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
const { readExpect, judge } = createRequire(import.meta.url)("./expect.cjs") as {
  readExpect(f: typeof fs, file: string | null): Record<string, unknown> | null;
  judge(bad: { key: string | null; text: string }[], e: unknown): { ok: { key: string; why: string }[]; left: { key: string | null }[]; unseen: string[] };
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
