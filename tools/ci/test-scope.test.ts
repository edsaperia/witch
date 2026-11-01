import { describe, expect, it } from "vitest";
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
});
