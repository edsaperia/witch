import { describe, expect, it } from "vitest";
import { contentFingerprint, dependencyGraph, jobFingerprints, type SourceTree } from "../tools/artDependencies";

const fixture = (sources: Record<string, string>): SourceTree => ({ exists: f => f in sources, read: f => { if (!(f in sources)) throw new Error(f); return Buffer.from(sources[f]); } });
describe("art dependency graph foundation (no drawing)", () => {
  it("isolates roots, follows deep JSON and cycles, and exposes the reverse map", () => {
    const source = { "house.ts": 'import "./core"; import type { Gone } from "./missing";', "creature.ts": 'import "./core"; import "./nested/model";', "core.ts": 'export const colour = 1;', "nested/model.js": 'import "../creature"; import data from "./form.json"; export {data};', "nested/form.json": '{"size":1}' };
    const roots = { house: ["house.ts"], creature: ["creature.ts"] };
    const before = dependencyGraph(fixture(source), roots), keys = jobFingerprints(fixture(source), before);
    expect(before.shared).toEqual(["core.ts"]);
    expect(before.files["nested/form.json"]).toEqual(["creature"]);
    source["nested/form.json"] = '{"size":2}';
    const after = jobFingerprints(fixture(source), before);
    expect(after.house).toBe(keys.house); expect(after.creature).not.toBe(keys.creature);
    source["core.ts"] += "\n// shared edit";
    const shared = jobFingerprints(fixture(source), before);
    expect(shared.house).not.toBe(after.house); expect(shared.creature).not.toBe(after.creature);
  });
  it("skips mixed syntax containing only type bindings but follows runtime reexports", () => {
    const tree = fixture({ "a.ts": 'import { type T } from "./absent"; export {type U} from "./absent2"; export {x} from "./b";', "b.ts": "export const x = 1" });
    expect(dependencyGraph(tree, { job: ["a.ts"] }).jobs.job).toEqual(["a.ts", "b.ts"]);
  });
  it("declares virtual binary inputs and tracks additions through a fresh map", () => {
    const tree = fixture({ "a.ts": 'import frames from "virtual:frames"; export {frames};', "one.png": "pixels", "two.png": "more pixels" });
    const one = dependencyGraph(tree, { job: ["a.ts"] }, { virtual: { "virtual:frames": ["one.png"] } });
    const two = dependencyGraph(tree, { job: ["a.ts"] }, { virtual: { "virtual:frames": ["one.png", "two.png"] } });
    expect(jobFingerprints(tree, one).job).not.toBe(jobFingerprints(tree, two).job);
  });
  it("fails closed for missing, undeclared, dynamic or escaping imports", () => {
    for (const code of ['import "./missing";', 'import "unknown-package";', 'import(target);', 'require(name);', 'import "../escape";']) expect(() => dependencyGraph(fixture({ "a.ts": code }), { job: ["a.ts"] })).toThrow();
  });
  it("normalizes text line endings, preserves binary bytes and binds paths/schema", () => {
    const a = fixture({ "a.ts": "one\r\ntwo\r\n", "b.ts": "one\ntwo\n", "a.png": "one\r\ntwo" });
    const b = fixture({ "a.ts": "one\ntwo\n", "a.png": "one\ntwo" });
    expect(contentFingerprint(a, ["a.ts"])).toBe(contentFingerprint(b, ["a.ts"]));
    expect(contentFingerprint(a, ["a.ts"])).not.toBe(contentFingerprint(a, ["b.ts"]));
    expect(contentFingerprint(a, ["a.ts"], "v2")).not.toBe(contentFingerprint(a, ["a.ts"]));
    expect(contentFingerprint(a, ["a.png"])).not.toBe(contentFingerprint(b, ["a.png"]));
  });
});
