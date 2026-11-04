// Test files that mock a module with vi.mock, run apart in Vitest's isolated project (vite.config.ts).
// The suite shares one module cache per worker (isolate false), and vi.mock only redirects the mocked module itself: a module that
// imported the mock stays cached with the mock's exports for every later file in that worker, and one cached before the mocking
// file keeps the real exports, so its mock never applies. Either way a test passes or fails by file order (the zooPad flake,
// 2026-11-03, was the first; nightSaveNotice.test.ts fails whenever a file importing ui/resumeNight runs before it).
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

/** A hoisted vi.mock call (vi.doMock is not hoisted; its files reset modules themselves). */
export const MOCKS = /^[^/\n]*\bvi\.mock\(/m;

/** The test files under `dirs` (relative to root) that mock a module, as root-relative paths with forward slashes, sorted. */
export function mockingTests(root, dirs = ["src", "tools"]) {
  const out = [];
  for (const dir of dirs) {
    for (const rel of readdirSync(path.join(root, dir), { recursive: true })) {
      const file = String(rel).replaceAll("\\", "/");
      if (!file.endsWith(".test.ts") || file.split("/").includes("node_modules")) continue;
      if (MOCKS.test(readFileSync(path.join(root, dir, file), "utf8"))) out.push(`${dir}/${file}`);
    }
  }
  return out.sort();
}
