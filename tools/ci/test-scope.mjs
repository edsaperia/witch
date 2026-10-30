// Conservative unit-test selection. Unknown inputs use the full suite, never a green empty run.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

export function testScope({ event = "", branch = "", title = "", files = [], history = true } = {}) {
  const full = reason => ({ mode: "full", reason });
  if (event !== "pull_request") return full("push or unrecognised event");
  if (/(^|\/)release\//i.test(branch) || /^claude\/rel-/i.test(branch) || branch === "claude/publish-snapshot" || /^Release check/i.test(title) || /^Publish:/i.test(title)) return full("release or publish check");
  if (!history) return full("merge base unavailable");
  if (!files.length) return full("no changed files resolved");
  for (const file of files) {
    if (/^(config\/|\.github\/|package(?:-lock)?\.json$|(?:tsconfig|vite|vitest|eslint)[^/]*|test(?:s)?\/|tools\/ci\/)/.test(file)) return full(`configuration or test infrastructure: ${file}`);
    if (/^src\/(?:rules\/|platform\/|app\/|main\.ts$|render\/(?:view|sprites|lighting|assets|height)\.ts$)/.test(file)) return full(`shared core: ${file}`);
    if (!/\.(?:[cm]?[jt]sx?)$/.test(file)) return full(`non-module input may be read dynamically: ${file}`);
    if (!/^(?:src|art|tools)\//.test(file)) return full(`unknown input: ${file}`);
  }
  return { mode: "related", reason: "module-only PR outside shared core" };
}

export function changedScope({ event = process.env.GITHUB_EVENT_NAME, payload = {}, git = args => execFileSync("git", args, { encoding: "utf8" }) } = {}) {
  const pr = payload.pull_request;
  let files = [], base = null, history = false;
  if (pr?.base?.sha) try {
    base = git(["merge-base", pr.base.sha, "HEAD"]).trim();
    files = git(["diff", "--name-only", "-z", `${base}...HEAD`]).split("\0").filter(Boolean);
    // Deleted modules may no longer be resolvable in Vitest's current import graph.
    if (git(["diff", "--diff-filter=D", "--name-only", `${base}...HEAD`]).trim()) return { mode: "full", reason: "deleted input", base, files };
    history = Boolean(base);
  } catch { /* missing/shallow history: full suite */ }
  return { ...testScope({ event, branch: pr?.head?.ref, title: pr?.title, files, history }), base, files };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === fs.realpathSync(process.argv[1])) {
  const payload = process.env.GITHUB_EVENT_PATH ? JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")) : {};
  const scope = changedScope({ payload });
  console.log(JSON.stringify(scope));
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `mode=${scope.mode}\nbase=${scope.base ?? ""}\n`);
}
