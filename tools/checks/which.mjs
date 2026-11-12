// Which checks the current change needs, from its changed files and config/checks.json (Ed, 2026-11-12: "is there text that
// could be data?"; it was CLAUDE.md's Testing prose): the builder's before a FINAL, and the coordinator's on the combined build.
// Changed files: those since the merge base with --base (default origin/claude/prototype), plus uncommitted and untracked
// ones; or the paths given. --json prints the selection as JSON; --all lists every check.
//   node tools/checks/which.mjs [--base <ref>] [--json] [--all] [path ...]
// tools/checks/which.test.ts checks the rule and the registry.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { scope as artScope } from "../art-check/scope.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const REGISTRY = path.join(ROOT, "config/checks.json");
export const RUNNERS = ["builder", "coordinator"];

/** The registry (config/checks.json). */
export const loadChecks = (file = REGISTRY) => JSON.parse(fs.readFileSync(file, "utf8"));

/** A glob as a RegExp over repository paths: `**` any depth (`**\/` none too), `*` and `?` within a folder, `{a,b}` either. */
export function globRegExp(glob) {
  let re = "";
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === "*" && glob[i + 1] === "*") { if (glob[i + 2] === "/") { re += "(?:.*/)?"; i += 2; } else { re += ".*"; i++; } }
    else if (c === "*") re += "[^/]*";
    else if (c === "?") re += "[^/]";
    else if (c === "{") { const end = glob.indexOf("}", i); re += `(?:${glob.slice(i + 1, end).split(",").map(s => s.replace(/[.+^$()|[\]\\]/g, "\\$&")).join("|")})`; i = end; }
    else re += c.replace(/[.+^$()|[\]\\]/g, "\\$&");
  }
  return new RegExp(`^${re}$`);
}

const matchesAny = (file, globs = []) => globs.some(g => globRegExp(g).test(file));

/** The changed files a check's paths call for (its except left out). */
export const matchedFiles = (check, files) => files.filter(f => matchesAny(f, check.paths) && !matchesAny(f, check.except));

/** The checks a change needs: [{ ...check, files, command }] by runner, in the registry's order; the command filled in. */
export function select(files, registry = loadChecks()) {
  const out = Object.fromEntries(RUNNERS.map(r => [r, []]));
  for (const check of registry.checks) {
    const hit = matchedFiles(check, files);
    if (!hit.length) continue;
    const command = check.command.replace("{files}", hit.join(" ")).replace("{art-scope}", artScope(hit).flags).replace(/\s+$/, "");
    out[check.runner].push({ ...check, files: hit, command });
  }
  return out;
}

/** The change's files: since the merge base with `base`, uncommitted and untracked; forward slashes, each once, sorted. */
export function changedFiles(base = "origin/claude/prototype", git = args => execFileSync("git", args, { cwd: ROOT, encoding: "utf8" })) {
  const lines = s => s.split("\n").map(l => l.trim()).filter(Boolean);
  const mergeBase = git(["merge-base", base, "HEAD"]).trim();
  return [...new Set([...lines(git(["diff", "--name-only", `${mergeBase}...HEAD`])), ...lines(git(["diff", "--name-only", "HEAD"])),
    ...lines(git(["ls-files", "--others", "--exclude-standard"]))].map(f => f.replaceAll("\\", "/")))].sort();
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2), registry = loadChecks();
  const at = args.indexOf("--base"), base = at >= 0 ? args[at + 1] : undefined;
  const paths = args.filter((a, i) => !a.startsWith("--") && !(at >= 0 && i === at + 1));
  const files = args.includes("--all") ? ["**"] : paths.length ? paths : changedFiles(base);
  const picked = args.includes("--all") ? Object.fromEntries(RUNNERS.map(r => [r, registry.checks.filter(c => c.runner === r)])) : select(files, registry);
  if (args.includes("--json")) console.log(JSON.stringify({ files, ...picked }, null, 2));
  else {
    if (!args.includes("--all")) console.log(`${files.length} changed file${files.length === 1 ? "" : "s"}${paths.length ? "" : ` (since ${base ?? "origin/claude/prototype"}, and uncommitted)`}.`);
    const head = { builder: "Builder, before your FINAL", coordinator: "Coordinator, on the combined build (not the builder, unless a brief asks)" };
    for (const r of RUNNERS) {
      console.log(`\n${head[r]}:`);
      if (!picked[r].length) console.log("  (none)");
      for (const c of picked[r]) console.log(`  ${c.command}\n      ${c.what}${c.note ? ` (${c.note})` : ""}`);
    }
  }
}
