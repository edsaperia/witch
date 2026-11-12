// Which checks a change needs (tools/checks/which.mjs, config/checks.json): the rule picks by changed paths and runner, and every
// record in the registry is whole (an id once, a runner, a one-line what, paths, a command whose script exists).
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
// @ts-expect-error (a plain .mjs tool, no types)
import { changedFiles, globRegExp, loadChecks, REGISTRY, RUNNERS, select } from "./which.mjs";

type Check = { id: string; command: string; what: string; paths: string[]; except?: string[]; runner: string; ci?: string; from?: string; note?: string };
const ids = (picked: Record<string, Check[]>, runner: string) => picked[runner].map(c => c.id);

describe("which checks a change needs", () => {
  it("reads globs: ** any depth, * within a folder, {a,b} either", () => {
    expect(globRegExp("src/**").test("src/a/b.ts")).toBe(true);
    expect(globRegExp("**/*.md").test("README.md")).toBe(true);
    expect(globRegExp("**/*.md").test("docs/notes/x.md")).toBe(true);
    expect(globRegExp("*.html").test("index.html")).toBe(true);
    expect(globRegExp("*.html").test("tools/x.html")).toBe(false);
    expect(globRegExp("src/rules/music*.ts").test("src/rules/musicPlan.ts")).toBe(true);
    expect(globRegExp("src/rules/music*.ts").test("src/rules/sub/musicPlan.ts")).toBe(false);
    expect(globRegExp("tools/music-lab/tune.{ts,cjs}").test("tools/music-lab/tune.cjs")).toBe(true);
  });

  it("asks a builder for typecheck, the related tests and the art check when the art changes; the rest is the coordinator's", () => {
    const picked = select(["art/creatures/fox/genome.js"]);
    expect(ids(picked, "builder")).toEqual(["typecheck", "related-tests", "art-check"]);
    expect(picked.builder.find((c: Check) => c.id === "art-check").command).toBe("node art/check.mjs --only fox --no-lab");
    expect(picked.builder.find((c: Check) => c.id === "related-tests").command).toContain("art/creatures/fox/genome.js");
    expect(ids(picked, "coordinator")).toEqual(["unit-full", "build", "smoke-quick", "smoke-full"]);
  });

  it("names the music check and the singer's tuning check for the singer's code", () => {
    const picked = select(["src/platform/audio/voiceFx.ts"]);
    expect(ids(picked, "coordinator")).toEqual(expect.arrayContaining(["music-check", "singer-tune", "sfx-check"]));
    expect(ids(select(["src/rules/musicPlan.ts"]), "coordinator")).toContain("music-check");
    expect(ids(select(["src/rules/musicPlan.ts"]), "coordinator")).not.toContain("balance-playthrough");
    expect(ids(select(["src/rules/combat/packs.ts"]), "coordinator")).toContain("balance-playthrough");
  });

  it("asks only typecheck and the docs' freshness of a docs change, and no build or smoke of the coordinator", () => {
    const picked = select(["docs/notes/run.md"]);
    expect(ids(picked, "builder")).toEqual(["typecheck", "config-docs"]);
    expect(ids(picked, "coordinator")).toEqual(["unit-full"]);
  });

  it("reads the change's files from git: since the merge base, uncommitted and untracked, each once", () => {
    const answers: Record<string, string> = { "merge-base": "abc\n", diff: "", "ls-files": "new\\file.ts\n" };
    const git = (args: string[]) => args[0] === "diff" ? (args[2] === "abc...HEAD" ? "src/a.ts\nsrc/b.ts\n" : "src/b.ts\n") : answers[args[0]];
    expect(changedFiles("origin/x", git)).toEqual(["new/file.ts", "src/a.ts", "src/b.ts"]);
  });
});

describe("the checks registry (config/checks.json)", () => {
  const registry = loadChecks() as { runners: Record<string, string>; checks: Check[] };
  it("has each check once, whole, with a runner the rules name", () => {
    const seen = new Set<string>();
    expect(Object.keys(registry.runners)).toEqual(RUNNERS);
    for (const c of registry.checks) {
      expect(seen.has(c.id), c.id).toBe(false);
      seen.add(c.id);
      expect(RUNNERS, c.id).toContain(c.runner);
      expect(c.what, c.id).toMatch(/^[A-Z].*[.)]$/);
      expect(c.paths.length, c.id).toBeGreaterThan(0);
      if (c.note) expect(fs.existsSync(path.resolve(REGISTRY, "../..", c.note)), `${c.id}: ${c.note}`).toBe(true);
    }
  });

  it("names scripts that exist", () => {
    for (const c of registry.checks) for (const m of c.command.matchAll(/(?:^|\s)node (?:--test )?((?:tools|art)\/\S+\.[cm]?js)/g))
      expect(fs.existsSync(path.resolve(REGISTRY, "../..", m[1])), `${c.id}: ${m[1]}`).toBe(true);
  });
});
