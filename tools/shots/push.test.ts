// Publishing previews to claude/ed-shots (tools/shots/push.mjs; the coordinator, 2026-10-26: a stale staged deletion in a
// builder's checkout went out with their frames, twice): only the named files go, nothing is ever removed, a beaten push is
// built again on the new tip. Against a throwaway bare repository standing in for origin.
import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
// @ts-expect-error (a plain .mjs tool, no types)
import { branchPath, deletions, plan, publish } from "./push.mjs";

const git = (cwd: string, ...args: string[]) => execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim();
const ID = ["-c", "user.name=t", "-c", "user.email=t@t", "-c", "commit.gpgsign=false"];
const quiet = () => {};

/** A bare origin with claude/ed-shots holding others' previews, and a clone of it (a builder's checkout). */
function setup() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "shots-test-")), origin = path.join(root, "origin.git"), seed = path.join(root, "seed"), me = path.join(root, "me");
  git(root, "init", "-q", "--bare", origin);
  fs.mkdirSync(seed); git(seed, "init", "-q"); git(seed, "checkout", "-q", "-b", "claude/ed-shots");
  for (const f of ["previews/alpha/a.png", "previews/beta/b.png", "previews/beta/c.png"]) { fs.mkdirSync(path.dirname(path.join(seed, f)), { recursive: true }); fs.writeFileSync(path.join(seed, f), f); }
  git(seed, "add", "-A"); git(seed, ...ID, "commit", "-q", "-m", "others' previews"); git(seed, "remote", "add", "origin", origin); git(seed, "push", "-q", "origin", "claude/ed-shots");
  git(root, "clone", "-q", "-b", "claude/ed-shots", origin, me);
  for (const k of ["user.name", "user.email"]) git(me, "config", k, "t");
  const files = (ref = "claude/ed-shots") => git(origin, "ls-tree", "-r", "--name-only", ref).split("\n").sort();
  return { root, origin, seed, me, files };
}

describe("publishing previews to claude/ed-shots", () => {
  it("adds only the named files, whatever is staged or missing in the checkout", () => {
    const { me, files } = setup();
    git(me, "rm", "-q", "-r", "previews/beta"); // (a stale staged deletion of others' previews, as went out twice)
    fs.writeFileSync(path.join(me, "new.png"), "mine");
    const c = publish({ files: plan([path.join(me, "new.png")], "previews/mine"), cwd: me, message: "mine", log: quiet });
    expect(c).toMatch(/^[0-9a-f]{40}$/);
    expect(files()).toEqual(["previews/alpha/a.png", "previews/beta/b.png", "previews/beta/c.png", "previews/mine/new.png"]);
  });

  it("replaces a file of its own, and a second publish of the same bytes changes nothing", () => {
    const { me, origin } = setup();
    fs.writeFileSync(path.join(me, "x.png"), "v2");
    publish({ files: plan([`${path.join(me, "x.png")}:previews/alpha/a.png`], "previews"), cwd: me, log: quiet });
    expect(git(origin, "show", "claude/ed-shots:previews/alpha/a.png")).toBe("v2");
    expect(publish({ files: plan([`${path.join(me, "x.png")}:previews/alpha/a.png`], "previews"), cwd: me, log: quiet })).toBeNull();
  });

  it("built again on the new tip when another builder pushes first, keeping theirs", () => {
    const { me, seed, files } = setup();
    fs.writeFileSync(path.join(me, "m.png"), "mine");
    let raced = false;
    publish({ files: plan([path.join(me, "m.png")], "previews/mine"), cwd: me, log: quiet, beforePush: () => {
      if (raced) return; raced = true;
      fs.writeFileSync(path.join(seed, "previews/theirs.png"), "theirs"); git(seed, "add", "-A"); git(seed, ...ID, "commit", "-q", "-m", "theirs"); git(seed, "push", "-q", "origin", "claude/ed-shots");
    } });
    expect(files()).toContain("previews/theirs.png");
    expect(files()).toContain("previews/mine/m.png");
  });

  it("refuses a commit that would delete a path", () => {
    const { origin } = setup();
    const tip = git(origin, "rev-parse", "claude/ed-shots"), tree = git(origin, "rev-parse", "claude/ed-shots^{tree}");
    // (a tree with previews/beta gone, as a stale deletion would make it)
    const beta = git(origin, "rev-parse", "claude/ed-shots:previews/beta"), alpha = git(origin, "rev-parse", "claude/ed-shots:previews/alpha");
    const previews = execFileSync("git", ["mktree"], { cwd: origin, input: `040000 tree ${alpha}\talpha\n`, encoding: "utf8" }).trim();
    const less = execFileSync("git", ["mktree"], { cwd: origin, input: `040000 tree ${previews}\tpreviews\n`, encoding: "utf8" }).trim();
    expect(deletions(tip, tree, origin)).toEqual([]);
    expect(deletions(tip, less, origin)).toEqual(["previews/beta/b.png", "previews/beta/c.png"]);
    expect(beta).toMatch(/^[0-9a-f]{40}$/);
  });

  it("never puts a file where a directory of others' previews is (git won't, and nothing is pushed)", () => {
    const { me, files } = setup();
    fs.writeFileSync(path.join(me, "b.png"), "mine");
    const before = files();
    expect(() => publish({ files: plan([`${path.join(me, "b.png")}:previews/beta`], "previews"), cwd: me, log: quiet })).toThrow();
    expect(files()).toEqual(before);
  });

  it("keeps to paths on the branch", () => {
    expect(branchPath("previews/x/a.png")).toBe("previews/x/a.png");
    for (const bad of ["", "/etc/a", "previews/../a", "a//b", ".git/config"]) expect(() => branchPath(bad)).toThrow();
    expect(() => plan(["/no/such/file.png"], "previews")).toThrow(/no such file/);
  });
});
