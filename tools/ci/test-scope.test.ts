import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
// @ts-expect-error the CI tool is plain JavaScript
import { changedScope, testScope } from "./test-scope.mjs";

const pr = { event: "pull_request", branch: "codex/small-render", title: "Furniture spacing", files: ["src/render/houseFurniture.ts"] };
describe("conservative PR unit-test selection", () => {
  it("allows related tests only for ordinary module-only PRs", () => expect(testScope(pr).mode).toBe("related"));
  it.each(["push", "workflow_dispatch", ""])("keeps %s full", event => expect(testScope({ ...pr, event }).mode).toBe("full"));
  it.each(["release/combined", "claude/release/combined", "claude/rel-combo", "claude/release-1101c", "claude/publish-snapshot"])("keeps release/publish branch %s full", branch => expect(testScope({ ...pr, branch }).mode).toBe("full"));
  it.each(["Release check: combined", "Release: report retention (#1572)"])("keeps title-based release %s full", title => expect(testScope({ ...pr, title }).mode).toBe("full"));
  it("does not treat an ordinary title mentioning release as a release", () => expect(testScope({ ...pr, title: "Releases the dodge echoes" }).mode).not.toBe("full"));
  it("keeps title-based publication checks full", () => expect(testScope({ ...pr, title: "Publish: combined" }).mode).toBe("full"));
  it.each(["config/tuning.json", "config/fx/elements.json", "src/rules/game.ts", "src/render/sprites.ts", "src/main.ts", "package-lock.json", "vite.config.mjs", "tools/ci/test-scope.mjs", "docs/notes/view.md", "unknown.js"])("falls back for %s", file => expect(testScope({ ...pr, files: [file] }).mode).toBe("full"));
  it("cannot pass missing history or an empty diff as a related run", () => {
    expect(testScope({ ...pr, history: false }).mode).toBe("full");
    expect(testScope({ ...pr, files: [] }).mode).toBe("full");
  });
  const payload = { pull_request: { base: { sha: "base" }, head: { ref: pr.branch }, title: pr.title } };
  it("uses the merge base and keeps renamed path separators intact", () => {
    const calls: string[][] = [];
    const result = changedScope({ event: "pull_request", payload, git: (args: string[]) => { calls.push(args); return args[0] === "merge-base" ? "merge\n" : args.includes("--diff-filter=D") ? "" : "src/render/houseFurniture.ts\0"; } });
    expect(result).toMatchObject({ mode: "related", base: "merge", files: pr.files });
    expect(calls[1]).toEqual(["diff", "--name-only", "-z", "merge...HEAD"]);
  });
  it("falls back when a changed module was deleted", () => {
    expect(changedScope({ event: "pull_request", payload, git: (args: string[]) => args[0] === "merge-base" ? "merge" : "src/render/old.ts" }).mode).toBe("full");
  });
  it("falls back on a shallow or broken git history", () => {
    expect(changedScope({ event: "pull_request", payload, git: () => { throw Error("missing history"); } }).mode).toBe("full");
  });
  it("selects safely from a real two-parent depth-two PR checkout and falls back at depth one", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "witch-shallow-"));
    const source = path.join(dir, "source");
    fs.mkdirSync(source);
    const gitAt = (cwd: string, args: string[]) => execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    try {
      gitAt(source, ["init", "-b", "base"]);
      gitAt(source, ["config", "user.name", "fixture"]);
      gitAt(source, ["config", "user.email", "fixture@example.invalid"]);
      fs.mkdirSync(path.join(source, "src/render"), { recursive: true });
      fs.writeFileSync(path.join(source, "src/render/houseFurniture.ts"), "export const x = 1;\n");
      gitAt(source, ["add", "."]); gitAt(source, ["commit", "-m", "base"]);
      const base = gitAt(source, ["rev-parse", "HEAD"]).trim();
      gitAt(source, ["checkout", "-b", "feature"]);
      fs.writeFileSync(path.join(source, "src/render/houseFurniture.ts"), "export const x = 2;\n");
      gitAt(source, ["commit", "-am", "feature"]);
      gitAt(source, ["checkout", "base"]);
      gitAt(source, ["merge", "--no-ff", "feature", "-m", "PR merge"]);
      for (const depth of [1, 2]) {
        const clone = path.join(dir, `depth-${depth}`);
        gitAt(dir, ["clone", "--depth", String(depth), pathToFileURL(source).href, clone]);
        const result = changedScope({ event: "pull_request", payload: { ...payload, pull_request: { ...payload.pull_request, base: { sha: base } } }, git: (args: string[]) => gitAt(clone, args) });
        expect(result.mode).toBe(depth === 2 ? "related" : "full");
        if (depth === 2) expect(result.files).toEqual(pr.files);
      }
    } finally { fs.rmSync(dir, { recursive: true, force: true }); }
  });
});
