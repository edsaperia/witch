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
