// The guardrails (docs/notes/guardrails.md): the import-loop check (tools/checks/loops.mjs) and the size ratchet
// (tools/checks/size.mjs), on small made-up file sets: what counts as a value import, what a new loop edge is, what may grow;
// and test honesty (tools/checks/testHonesty.mjs): what counts as a raised limit, a module mock and a fixed sleep, and what rises.
import { describe, expect, it } from "vitest";
// @ts-expect-error (a plain .mjs tool, no types)
import { graphOf, loopsOf, newLoopEdges, valueImports } from "./loops.mjs";
// @ts-expect-error (a plain .mjs tool, no types)
import { functionsOf, grown, lineCount } from "./size.mjs";
// @ts-expect-error (a plain .mjs tool, no types)
import { GLOBAL_FILES, countsOf, globalRaises, risen } from "./testHonesty.mjs";
import { existsSync, readFileSync } from "node:fs";

describe("import loops", () => {
  it("counts value imports and re-exports, not type-only ones or packages", () => {
    const text = [
      `import type { A } from "./a";`, `import { type B } from "./b";`, `import { type C, d } from "./c";`, `import e from "./e";`,
      `import "./f";`, `export { g } from "./g";`, `export type { H } from "./h";`, `import * as three from "three";`,
      `const lazy = () => import("./lazy");`,
    ].join("\n");
    expect(valueImports(text)).toEqual(["./c", "./e", "./f", "./g"]);
  });

  it("finds the loops and only new edges inside them", () => {
    const base = { "src/a.ts": `import "./b";`, "src/b.ts": `import "./a";`, "src/c.ts": `import "./a";` };
    const baseG = graphOf(base);
    expect(loopsOf(baseG)).toEqual([["src/a.ts", "src/b.ts"]]);
    // a new loop (a -> c closes c -> a), and removing an edge passes
    const worse = graphOf({ ...base, "src/a.ts": `import "./b"; import "./c";` });
    expect(newLoopEdges(baseG, worse).map((e: { from: string; to: string }) => `${e.from}>${e.to}`)).toEqual(["src/a.ts>src/c.ts"]);
    expect(newLoopEdges(baseG, graphOf({ ...base, "src/b.ts": `` }))).toEqual([]);
    // a new edge outside any loop is fine
    expect(newLoopEdges(baseG, graphOf({ ...base, "src/d.ts": `import "./a";` }))).toEqual([]);
    // a renamed file keeps its edges
    const renamed = graphOf({ "src/a2.ts": `import "./b";`, "src/b.ts": `import "./a2";`, "src/c.ts": `import "./a2";` });
    expect(newLoopEdges(baseG, renamed, new Map([["src/a.ts", "src/a2.ts"]]))).toEqual([]);
    // an excused importer
    expect(newLoopEdges(baseG, worse, new Map(), ["src/a.ts"])[0].excused).toBe(true);
  });
});

describe("the size ratchet", () => {
  const body = (n: number) => Array.from({ length: n }, (_, i) => `  const v${i} = ${i};`).join("\n");
  const fn = (name: string, n: number) => `export function ${name}() {\n${body(n - 2)}\n}\n`;

  it("measures top-level functions and class methods", () => {
    const fns = functionsOf(`${fn("big", 160)}const arrow = () => {\n  return 1;\n};\nclass K {\n  m() {\n    return 2;\n  }\n}\n`);
    expect(Object.fromEntries(fns)).toEqual({ big: 160, arrow: 3, "K.m": 3 });
    expect(lineCount("a\nb\n")).toBe(2);
  });

  it("lets big things shrink, not grow; fails new big ones; follows moves; honours an excuse", () => {
    const base = { "src/x.ts": fn("big", 160) };
    expect(grown(base, { "src/x.ts": fn("big", 155) })).toEqual([]);
    expect(grown(base, { "src/x.ts": fn("big", 161) })).toMatchObject([{ file: "src/x.ts", fn: "big", was: 160, now: 161 }]);
    expect(grown(base, { ...base, "src/y.ts": fn("fresh", 151) })).toMatchObject([{ file: "src/y.ts", fn: "fresh", was: 0 }]);
    expect(grown(base, { "src/y.ts": fn("big", 160) })).toEqual([]); // moved to another file
    expect(grown(base, { "src/x.ts": fn("big", 161) }, new Map(), ["src/x.ts#big"])[0].excused).toBe(true);
    const longFile = (n: number) => Array.from({ length: n }, (_, i) => `export const c${i} = ${i};`).join("\n") + "\n";
    expect(grown({ "src/f.ts": longFile(900) }, { "src/f.ts": longFile(850) })).toEqual([]);
    expect(grown({ "src/f.ts": longFile(900) }, { "src/f.ts": longFile(901) })).toMatchObject([{ file: "src/f.ts", was: 900, now: 901 }]);
    expect(grown({ "src/f.ts": longFile(700) }, { "src/f.ts": longFile(801) })).toMatchObject([{ file: "src/f.ts", was: 700, now: 801 }]);
    expect(grown({ "src/f.ts": longFile(900) }, { "src/g.ts": longFile(900) }, new Map([["src/f.ts", "src/g.ts"]]))).toEqual([]);
  });
});

describe("no new module state in the rules (tools/checks/moduleState.mjs; docs/notes/module-state.md)", () => {
  it("finds top-level lets and consts written after load, not read-only ones or locals", async () => {
    // @ts-expect-error (a plain .mjs tool, no types)
    const { bindingsOf } = await import("./moduleState.mjs");
    const text = [
      `let a = 1, [b, c] = [2, 3];`, `const TABLE = new Map([[1, 2]]);`, `const cache = new Map();`, `const list: number[] = [];`,
      `const obj = { n: 0 };`, `const buf = new Float64Array(4);`, `const read = new Set([1]);`, `const marked = new Map(); // module-state: keyed by all its inputs`,
      `// module-state: scratch, reset each step`, `const above: number[] = [];`,
      `export function f(k: number) { let local = 0; cache.set(k, 1); list.push(k); obj.n++; buf[0] = k; marked.set(k, k); above.length = 0; return read.has(local) || TABLE.get(k); }`,
    ].join("\n");
    const found = bindingsOf(text, "src/rules/x.ts").map((b: { name: string; kind: string; marked: boolean }) => `${b.name}:${b.kind}${b.marked ? ":marked" : ""}`);
    expect(found).toEqual(["a:let", "b:let", "c:let", "cache:written", "list:written", "obj:written", "buf:written", "marked:written:marked", "above:written:marked"]);
  });

  it("fails only a new, unmarked binding in src/rules/: an old one, a renamed file's, or one elsewhere passes", async () => {
    // @ts-expect-error (a plain .mjs tool, no types)
    const { newBindings } = await import("./moduleState.mjs");
    const base = { "src/rules/a.ts": `let old = 0; export const f = () => old++;` };
    const names = (head: Record<string, string>, renames = new Map()) => newBindings(base, head, renames).map((b: { file: string; name: string }) => `${b.file}#${b.name}`);
    expect(names({ "src/rules/a.ts": `let old = 0; export const f = () => old++;` })).toEqual([]);
    expect(names({ "src/rules/a.ts": `let old = 0, fresh = 1; export const f = () => old + fresh++;` })).toEqual(["src/rules/a.ts#fresh"]);
    expect(names({ "src/rules/a.ts": `let old = 0;\nlet fresh = 1; // module-state: page wiring, set once at boot` })).toEqual([]);
    expect(names({ "src/rules/b.ts": `let old = 0;` }, new Map([["src/rules/a.ts", "src/rules/b.ts"]]))).toEqual([]);
    expect(names({ "src/render/a.ts": `let anything = 0;` })).toEqual([]);
  });
});

describe("test honesty", () => {
  const VI = "vi"; // (spelt apart so this file isn't itself read as one that mocks a module: tools/ci/mockingTests.mjs)
  const counts = (text: string) => { const { raised, mocks, sleeps } = countsOf(text) as Record<string, number>; return [raised, mocks, sleeps]; };

  it("counts time limits over the default, retries and raised config; not limits within it", () => {
    expect(counts(`it("a", () => {}, 120_000);`)).toEqual([1, 0, 0]);
    expect(counts(`const LONG = 3 * 60_000;\nit("a", async () => {}, LONG);`)).toEqual([1, 0, 0]);
    expect(counts(`it("a", () => {}, someLimit());`)).toEqual([1, 0, 0]); // (can't be read: can't be shown to be under)
    expect(counts(`it("a", { timeout: 90000 }, () => {});\ndescribe("b", { retry: 2 }, () => {});\nbeforeAll(() => {}, 61_000);`)).toEqual([3, 0, 0]);
    expect(counts(`it.each([1, 2])("a %s", () => {}, 180000);\ntest.skip("b", () => {}, 0);`)).toEqual([2, 0, 0]); // (0: no limit at all)
    expect(counts(`vi.setConfig({ testTimeout: 120_000 });\nvi.setConfig({ retry: 1 });`)).toEqual([2, 0, 0]);
    expect(counts(`it("a", () => {}, 60000);\nit("b", () => {}, 5_000);\nit("c", { timeout: 30_000, retry: 0 }, () => {});\nvi.setConfig({ testTimeout: 1000 });`)).toEqual([0, 0, 0]);
    expect(counts(`it("a", () => { step(g, STEP); fetchAll({ timeout: 300000 }); await vi.waitFor(() => {}, { timeout: 90_000 }); });\nit.each(rows)("b", () => {});`)).toEqual([0, 0, 0]);
  });

  it("counts module mocks, not spies or stubbed globals", () => {
    expect(counts(`${VI}.mock("./a");\n${VI}.mock("./b", () => ({}));\nit("x", () => { vi.doMock("./c"); });`)).toEqual([0, 3, 0]);
    expect(counts(`const f = vi.fn(() => 1); vi.spyOn(o, "m"); vi.stubGlobal("fetch", f); const s = "${VI}.mock(";`)).toEqual([0, 0, 0]);
  });

  it("counts fixed sleeps, not timers that do something or a promise resolved by hand", () => {
    expect(counts(`await new Promise(r => setTimeout(r, 10));`)).toEqual([0, 0, 1]);
    expect(counts(`const turn = () => new Promise<void>(resolve => { setTimeout(() => resolve(), 0); });`)).toEqual([0, 0, 1]);
    expect(counts(`import { setTimeout as nap } from "node:timers/promises";\nawait nap(5);\nawait scheduler.wait(5);`)).toEqual([0, 0, 2]);
    expect(counts(`new Promise(res => setTimeout(() => { log.push("made"); res(); }, 30));\nnew Promise(r => { done = r; });\nsetTimeout(tick, 0);`)).toEqual([0, 0, 0]);
  });

  it("fails a count that rises, per file and kind; falling, renaming and an excused file pass", () => {
    const base = { "src/a.test.ts": `${VI}.mock("./a");\nit("x", () => {}, 120000);`, "src/b.test.ts": `it("y", () => {});` };
    const up = (head: Record<string, string>, renames = new Map<string, string>(), ok: string[] = []) =>
      (risen(base, head, renames, ok) as { file: string; kind: string; was: number; now: number; excused: boolean }[]).map(o => `${o.file} ${o.kind} ${o.was}>${o.now}${o.excused ? " ok" : ""}`);
    expect(up(base)).toEqual([]);
    expect(up({ ...base, "src/a.test.ts": `it("x", () => {});` })).toEqual([]); // (fell: the base it is next compared with has fewer)
    expect(up({ ...base, "src/b.test.ts": `${VI}.mock("./b");\nit("y", () => {}, 90000);` })).toEqual(["src/b.test.ts raised 0>1", "src/b.test.ts mocks 0>1"]);
    expect(up({ ...base, "src/c.test.ts": `await new Promise(r => setTimeout(r, 5));` })).toEqual(["src/c.test.ts sleeps 0>1"]); // (a new file starts at none)
    expect(up({ "src/a2.test.ts": base["src/a.test.ts"], "src/b.test.ts": base["src/b.test.ts"] }, new Map([["src/a.test.ts", "src/a2.test.ts"]]))).toEqual([]);
    expect(up({ ...base, "src/a.test.ts": base["src/a.test.ts"] + `\n${VI}.mock("./z");` }, new Map(), ["src/a.test.ts"])).toEqual(["src/a.test.ts mocks 1>2 ok"]);
  });

  it("fails raised global limits and retries, in the config or on a command line", () => {
    const what = (files: Record<string, string>) => (globalRaises(files) as { file: string; line: number }[]).map(g => `${g.file}:${g.line}`);
    expect(what({ "vite.config.ts": `export default { test: { testTimeout: 60_000, hookTimeout: 60_000, retry: 0 } };` })).toEqual([]);
    expect(what({ "vite.config.ts": `export default { test: {\n testTimeout: 120_000,\n hookTimeout: LIMIT,\n retry: 2 } };` })).toEqual(["vite.config.ts:2", "vite.config.ts:3", "vite.config.ts:4"]);
    expect(what({ "package.json": `{\n"scripts": { "test": "vitest run --retry=2" } }` })).toEqual(["package.json:2"]);
  });

  it("holds for the repository's own config today", () => {
    const files = Object.fromEntries((GLOBAL_FILES as string[]).filter(f => existsSync(f)).map(f => [f, readFileSync(f, "utf8")]));
    expect(Object.keys(files)).toContain("vite.config.ts");
    expect(globalRaises(files)).toEqual([]);
  });
});
