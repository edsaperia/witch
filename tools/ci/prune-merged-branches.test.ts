import { expect, it } from "vitest";
import { prunable } from "./prune-merged-branches.mjs";

const pull = (number: number, ref: string, sha: string, state = "closed", merged = true) => ({ number, ref, sha, state, merged });

it("deletes only a branch whose every pull request is merged and whose tip is still a merged head", () => {
  const tips: [string, string][] = [["main", "m"], ["claude/done", "a2"], ["claude/open", "b"], ["claude/dropped", "c"], ["claude/moved", "d2"], ["claude/none", "e"], ["codex/parked", "f"], ["claude/half", "g"]];
  const pulls = [pull(1, "claude/done", "a1"), pull(2, "claude/done", "a2"), pull(3, "claude/open", "b", "open", false), pull(4, "claude/dropped", "c", "closed", false),
    pull(5, "claude/moved", "d1"), pull(6, "codex/parked", "f"), pull(7, "claude/half", "g"), pull(8, "claude/half", "g0", "closed", false), pull(9, "main", "m")];
  const { out, kept } = prunable(tips, pulls, new Set(["codex/parked"]));
  expect(out).toEqual([["claude/done", "a2", 2]]);
  expect(kept).toEqual({ "kept by name": 1, "open pull request": 1, "closed unmerged pull request": 2, "pushed to since its merge": 1, "no pull request": 1, "in the builders register": 1 });
});
