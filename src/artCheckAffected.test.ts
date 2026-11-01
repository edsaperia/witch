import { afterEach, describe, expect, it } from "vitest";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import ts from "typescript";
import { artJobFingerprints, affectedArtJobs } from "../tools/artJobFingerprints";
import { diskTree, type SourceTree } from "../tools/artDependencies";
import { execute, fullCheck, resultHit, saveSuccess, sha, snapshotHash, taskDispatcher } from "../tools/art-check/affected.mjs";

const dirs: string[] = [];
afterEach(() => { for (const d of dirs.splice(0)) rmSync(d, { recursive: true, force: true }); });
const temp = () => { const d = mkdtempSync(join(tmpdir(), "witch-art-check-")); dirs.push(d); return d; };

describe("affected art checks", () => {
  it("allows exact successful fingerprints on releases and pushes, retaining full fallback for unknown events", () => {
    expect(fullCheck("push", "claude/prototype")).toBe(false);
    expect(fullCheck("push", "main")).toBe(false);
    expect(fullCheck("pull_request", "claude/rel-test", "ordinary")).toBe(false);
    expect(fullCheck("pull_request", "codex/x", "Release check: x")).toBe(false);
    expect(fullCheck("pull_request", "codex/x", "ordinary")).toBe(false);
    expect(fullCheck("unexpected")).toBe(true);
  });
  it("derives every real registered task once without executing the check", () => {
    const source = readFileSync("art/check.mjs", "utf8");
    const d = taskDispatcher(source);
    expect(d.names.length).toBeGreaterThan(30);
    expect(d.names.length).toBe([...source.matchAll(/\btask\("([^"]+)"/g)].length);
    expect(d.source).not.toContain('import("/art/');
    expect(d.source).toContain("export function runJob");
    expect(() => taskDispatcher("const SPRITE_CHECKS = () => 0")).toThrow();
    expect(() => taskDispatcher(source.replace('task("species-sprites", async', 'task(name, async'))).toThrow();
    expect(() => taskDispatcher(source.replace('task("species-sprites", async', 'if (true) task("species-sprites", async'))).toThrow();
    const workflow = readFileSync(".github/workflows/art-check.yml", "utf8");
    expect(workflow).toContain("branches: [claude/prototype, main]");
    expect(workflow).toContain("types: [opened, synchronize, reopened]");
    expect(workflow).not.toContain("claude/rel-*");
    expect(workflow).toContain('if: steps.checked.outputs.run == \'\'');
  });
  it("binds each fetched config file only to the task that reads it, and refuses unknown fetches", () => {
    const source = readFileSync("art/check.mjs", "utf8"), d = taskDispatcher(source);
    expect(d.configs["sleeping-legends"]).toEqual(["config/style.json", "config/tuning.json"]);
    expect(d.configs["effects"]).toEqual(["config/combat.json"]);
    expect(d.configs["finds"]).toEqual(["config/broom-parts.json"]);
    expect(Object.entries(d.configs).filter(([, f]) => f.includes("config/tuning.json")).map(([n]) => n)).toEqual(["sleeping-legends"]);
    expect(() => taskDispatcher(source.replace('fetch("/config/combat.json")', 'fetch(path)'))).toThrow("Unknown art check fetch");
    expect(() => taskDispatcher(source.replace('fetch("/config/combat.json")', 'fetch("/elsewhere/combat.json")'))).toThrow("Unknown art check fetch");
  });
  const fixture = async () => {
    const root = temp(), { cpSync } = await import("node:fs");
    for (const f of ["art/headless.mjs", "art/headless-blank.html", "tools/artDependencies.ts", "tools/artJobFingerprints.ts", "tools/artHash.ts", "package.json", "package-lock.json", ".github/workflows/art-check.yml"]) {
      mkdirSync(join(root, f, ".."), { recursive: true }); writeFileSync(join(root, f), readFileSync(f));
    }
    for (const dir of ["art", "src", "config", "tools/art-cache", "tools/art-check", "tools/art-check-legacy", "tools/art-lab", "tools/overrides"]) cpSync(dir, join(root, dir), { recursive: true, filter: s => !/(node_modules|art\/out|art-lab\/dist)/.test(s) });
    const { plan } = await import("../tools/art-check/affected.mjs");
    const keys = async () => Object.fromEntries((await plan(root, join(root, "cache"), {})).tasks.map((t: { id: string; key: string }) => [t.id, t.key]));
    const edit = (f: string, change: (text: string) => string) => { const text = readFileSync(join(root, f), "utf8"), next = change(text); expect(next).not.toBe(text); writeFileSync(join(root, f), next); };
    return { root, plan, keys, edit, changed: (a: Record<string, string>, b: Record<string, string>) => Object.keys(a).filter(id => a[id] !== b[id]).sort() };
  };
  it("re-keys only the tasks that fetch a changed config file", async () => {
    const { keys, edit, changed } = await fixture(), before = await keys();
    edit("config/tuning.json", t => t + "\n");
    expect(changed(before, await keys())).toEqual(["sleeping-legends"]);
  }, 120_000);
  it("re-keys one edited task (and the auxiliary unit), but every task for a shared helper or scaffolding edit", async () => {
    const { keys, edit, changed } = await fixture(), before = await keys();
    edit("art/check.mjs", t => t.replace('task("bushes", async () => {', 'task("bushes", async () => { void 0;'));
    const one = await keys();
    expect(changed(before, one)).toEqual(["auxiliary-and-labs", "bushes"]);
    edit("art/check.mjs", t => t.replace("  // --only: a builder", "  const sharedProbe = 1;\n  // --only: a builder"));
    const helper = await keys();
    expect(changed(one, helper)).toEqual(Object.keys(one).sort());
    edit("art/check.mjs", t => t.replace("const report = flag(", "const unusedProbe = 0;\nconst report = flag("));
    expect(changed(helper, await keys())).toEqual(Object.keys(one).sort());
  }, 180_000);
  it("keeps every result through planner and workflow edits that only choose what runs", async () => {
    const { keys, edit, changed } = await fixture(), before = await keys();
    edit("tools/art-check/affected.mjs", t => t + "\n// selection-only edit\n");
    edit(".github/workflows/art-check.yml", t => t + "\n# workflow edit\n");
    expect(changed(before, await keys())).toEqual([]);
  }, 180_000);
  it("bridges exact v1 results once, never across a changed art input", async () => {
    const { root, plan, edit } = await fixture(), cache = join(root, "v1cache"), current = readFileSync(join(root, "tools/art-check/affected.mjs"));
    // The v1 planner, run as it ran in CI: its own bytes at its own path.
    writeFileSync(join(root, "tools/art-check/affected.mjs"), readFileSync("tools/art-check-legacy/affected-v1.mjs.txt"));
    const { pathToFileURL } = await import("node:url");
    const v1 = await import(pathToFileURL(join(root, "tools/art-check/affected.mjs")).href + "?v1");
    const old = await v1.plan(root, cache, {});
    for (const t of old.tasks) saveSuccess(cache, t.id, t.key);
    writeFileSync(join(root, "tools/art-check/affected.mjs"), current);
    const bridged: any = await plan(root, cache, {});
    expect(bridged.tasks.filter((t: any) => !t.cached)).toEqual([]);
    for (const t of bridged.tasks) expect(resultHit(cache, t.id, t.key)).toBe(true);
    // A real art edit after migration: only v1 results for the old bytes exist, so the touched task must rerun.
    const fresh = join(root, "v1only"); mkdirSync(fresh);
    for (const t of old.tasks) saveSuccess(fresh, t.id, t.key);
    edit("art/flora/variants.js", t => t + "\n// drawing edit\n");
    const after: any = await plan(root, fresh, {}), rerun = after.tasks.filter((t: any) => !t.cached).map((t: { id: string }) => t.id);
    expect(rerun).toContain("tree-species");
    expect(rerun).toContain("auxiliary-and-labs");
    expect(rerun.length).toBeLessThan(after.tasks.length);
  }, 240_000);
  it("ignores npm script edits in package.json but keys every task on its dependencies", async () => {
    const { keys, edit, changed } = await fixture(), before = await keys();
    edit("package.json", t => t.replace('"scripts": {', '"scripts": {\n    "probe": "node -e 0",'));
    const scripts = await keys();
    expect(changed(before, scripts)).toEqual([]);
    edit("package.json", t => t.replace('"devDependencies": {', '"devDependencies": {\n    "left-pad": "1.3.0",'));
    expect(changed(scripts, await keys())).toEqual(Object.keys(before).sort());
  }, 180_000);
  it("accepts only an exact successful result and reruns misses, failures and corrupt entries", () => {
    const d = temp(), key = sha("inputs");
    expect(resultHit(d, "trees", key)).toBe(false);
    writeFileSync(join(d, key + ".json"), "broken"); expect(resultHit(d, "trees", key)).toBe(false);
    saveSuccess(d, "trees", key); expect(resultHit(d, "trees", key)).toBe(true);
    expect(resultHit(d, "other", key)).toBe(false); expect(resultHit(d, "trees", sha("changed"))).toBe(false);
    writeFileSync(join(d, key + ".json"), JSON.stringify({ schema: 1, id: "trees", key, passed: false }));
    expect(resultHit(d, "trees", key)).toBe(false);
  });
  it("isolates real creature-only edits using the production file-to-job analyzer", () => {
    const disk = diskTree("."), file = "tools/art-check/.task-dispatcher.ts";
    const source = taskDispatcher(readFileSync("art/check.mjs", "utf8")).source;
    const tree = (edit = ""): SourceTree => ({ exists: f => f === file || disk.exists(f), read: f => {
      if (f === file) return Buffer.from(source + (edit === file ? "\n//shared checker edit\n" : ""));
      const bytes = disk.read(f);
      if (f !== edit) return bytes;
      if (edit === "art/flora/variants.js") return Buffer.from(Buffer.from(bytes).toString("utf8") + "\n//dynamic module drawing edit\n");
      const text = Buffer.from(bytes).toString("utf8"), ast = ts.createSourceFile(f, text, ts.ScriptTarget.Latest, true);
      const fn = ast.statements.find(n => ts.isFunctionDeclaration(n) && n.name?.text === "quad3d");
      if (!fn || !ts.isFunctionDeclaration(fn) || !fn.body) throw Error("drawing fixture missing");
      const at = fn.body.getStart(ast) + 1;
      return Buffer.from(text.slice(0, at) + '\nthrow Error("virtual only");\n' + text.slice(at));
    } });
    const before = artJobFingerprints(tree(), {}, file), after = artJobFingerprints(tree("art/creatures3d.js"), {}, file);
    const affected = affectedArtJobs(before, after);
    expect(affected).toContain("species-sprites");
    expect(affected.length).toBeLessThan(Object.keys(before.fingerprints).length);
    const dynamic = artJobFingerprints(tree("art/flora/variants.js"), {}, file);
    expect(affectedArtJobs(before, dynamic)).toContain("tree-species");
    const shared = artJobFingerprints(tree(file), {}, file);
    expect(affectedArtJobs(before, shared)).toEqual(Object.keys(before.fingerprints).sort());
    for (const [name, files] of Object.entries(before.dependencies.jobs)) for (const f of files)
      expect(before.dependencies.files[f]).toContain(name);
  });
  it("groups affected sprite tasks, keeps auxiliary coverage, and caches only successful groups", () => {
    const root = temp(), cache = join(root, "cache"); mkdirSync(join(root, "art")); writeFileSync(join(root, "art/input.js"), "one");
    const files = ["art/input.js"], tasks = ["one", "two", "auxiliary-and-labs"].map(id => ({ id, key: sha(id) }));
    const p = { files, snapshot: snapshotHash(root, files), tasks };
    const calls: string[][] = [];
    execute(p, root, cache, (a: string[]) => { calls.push(a); return { status: 0 }; });
    expect(calls).toEqual([["--tasks", "one,two", "--sprite-only", "--no-lab", "--times"], ["--aux-only", "--times"]]);
    execute(p, root, cache, () => { throw Error("should be cached"); });
    const changed = { ...p, tasks: [{ id: "one", key: sha("new") }] };
    expect(() => execute(changed, root, cache, () => ({ status: 1 }))).toThrow("Art check failed");
    expect(resultHit(cache, "one", sha("new"))).toBe(false);
    writeFileSync(join(root, "art/input.js"), "two");
    expect(() => execute(p, root, cache, () => ({ status: 0 }))).toThrow("inputs changed");
  });
});
