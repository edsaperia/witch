import { afterEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
// @ts-expect-error the CI tool is plain JavaScript
import { firstDifference, sameStamp, treeHashes } from "./same-game.mjs";

const dirs: string[] = [];
afterEach(() => { for (const d of dirs.splice(0)) fs.rmSync(d, { recursive: true, force: true }); });
const tree = (files: Record<string, string>) => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "witch-same-")); dirs.push(d);
  for (const [f, text] of Object.entries(files)) { fs.mkdirSync(path.dirname(path.join(d, f)), { recursive: true }); fs.writeFileSync(path.join(d, f), text); }
  return d;
};
const ignore = new Set(["version.json", "online/version.json"]);

describe("same game build", () => {
  it("ignores only the build time in version.json", () => {
    const a = tree({ "index.html": "x", "assets/main-A.js": "1", "version.json": '{"version":"v1 · abc","built":"t1"}', "online/version.json": "t1" });
    const b = tree({ "index.html": "x", "assets/main-A.js": "1", "version.json": '{"version":"v1 · abc","built":"t2"}', "online/version.json": "t2" });
    expect(firstDifference(treeHashes(a, ignore), treeHashes(b, ignore))).toBeNull();
    expect(sameStamp(a, b)).toBe(true);
  });
  it("reports any changed, added or removed built file", () => {
    const a = treeHashes(tree({ "index.html": "x", "assets/main-A.js": "1" }), ignore);
    expect(firstDifference(a, treeHashes(tree({ "index.html": "x", "assets/main-A.js": "2" }), ignore))).toBe("changed assets/main-A.js");
    expect(firstDifference(a, treeHashes(tree({ "index.html": "x" }), ignore))).toBe("removed assets/main-A.js");
    expect(firstDifference(a, treeHashes(tree({ "index.html": "x", "assets/main-A.js": "1", "assets/new.js": "" }), ignore))).toBe("added assets/new.js");
  });
  it("refuses builds stamped differently or unstamped", () => {
    expect(sameStamp(tree({ "version.json": '{"version":"v1 · abc"}' }), tree({ "version.json": '{"version":"dev"}' }))).toBe(false);
    expect(sameStamp(tree({}), tree({}))).toBe(false);
  });
});
