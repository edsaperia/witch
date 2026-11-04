// The changelog stamper (tools/config/stampChangelog.mjs): a release's null fragments get its build, nothing else does.
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { liveNulls, nullFragments, stamp, stampRelease } from "./stampChangelog.mjs";

const made: string[] = [];
afterEach(() => { for (const d of made.splice(0)) rmSync(d, { recursive: true, force: true }); });

/** A scratch repository with a config/changelog/ of these files. */
function repo(files: Record<string, string>): { root: string; dir: string } {
  const root = mkdtempSync(join(tmpdir(), "stamp-")), dir = join(root, "config/changelog");
  made.push(root);
  mkdirSync(dir, { recursive: true });
  for (const [f, text] of Object.entries(files)) writeFileSync(join(dir, f), text);
  return { root, dir };
}
const git = (root: string, ...args: string[]) => execFileSync("git", ["-c", "user.name=t", "-c", "user.email=t@t", ...args], { cwd: root, encoding: "utf8" });

describe("stampChangelog", () => {
  it("finds the null fragments, never the archive or a stamped one", () => {
    const { dir } = repo({
      "2026-11-03-a.json": '{\n  "version": null,\n  "items": ["A"]\n}\n',
      "2026-11-03-b.json": '{ "version": 7200, "items": ["B"] }',
      "2026-11-03-c.json": '{"version":null,"items":["C"]}',
      "archive.json": '{ "entries": [{ "version": null, "items": ["old"] }] }',
    });
    expect(nullFragments(dir)).toEqual(["2026-11-03-a.json", "2026-11-03-c.json"]);
    expect(liveNulls(new Set(["2026-11-03-a.json", "2026-11-03-b.json"]), dir)).toEqual(["2026-11-03-a.json"]);
  });

  it("writes only the version, keeping each file's own layout", () => {
    const { dir } = repo({ "2026-11-03-a.json": '{\n  "version": null,\n  "items": ["A \\"quoted\\""]\n}\n', "2026-11-03-c.json": '{"version":null,"items":["C"]}' });
    expect(stamp(["2026-11-03-a.json", "2026-11-03-c.json"], 7314, dir)).toEqual(["2026-11-03-a.json", "2026-11-03-c.json"]);
    expect(readFileSync(join(dir, "2026-11-03-a.json"), "utf8")).toBe('{\n  "version": 7314,\n  "items": ["A \\"quoted\\""]\n}\n');
    expect(readFileSync(join(dir, "2026-11-03-c.json"), "utf8")).toBe('{"version": 7314,"items":["C"]}');
    expect(stamp(["2026-11-03-a.json"], 7400, dir)).toEqual([]); // (stamped once, never again)
    expect(() => stamp(["2026-11-03-a.json"], 0, dir)).toThrow();
  });

  it("stamps what a release commit holds, not what came after it", () => {
    const { root, dir } = repo({ "2026-11-02-old.json": '{ "version": 7100, "items": ["old"] }', "2026-11-03-live.json": '{ "version": null, "items": ["live"] }' });
    git(root, "init", "-q");
    git(root, "add", ".");
    git(root, "commit", "-q", "-m", "release");
    const release = git(root, "rev-parse", "HEAD").trim();
    writeFileSync(join(dir, "2026-11-04-next.json"), '{ "version": null, "items": ["not yet"] }');
    git(root, "add", ".");
    git(root, "commit", "-q", "-m", "after");
    expect(stampRelease(release, 7335, root)).toEqual(["2026-11-03-live.json"]);
    expect(JSON.parse(readFileSync(join(dir, "2026-11-03-live.json"), "utf8")).version).toBe(7335);
    expect(JSON.parse(readFileSync(join(dir, "2026-11-04-next.json"), "utf8")).version).toBeNull();
    expect(JSON.parse(readFileSync(join(dir, "2026-11-02-old.json"), "utf8")).version).toBe(7100);
  });
});
