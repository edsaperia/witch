// Deletes the remote branches whose work is already merged (Ed, 2026-11-11: about 1,700 branches, nearly all merged
// leftovers). Lists what it would delete and stops; --go deletes. Needs git and an authenticated gh, run from a checkout.
//   node tools/ci/prune-merged-branches.mjs            the list only: branch, tip, its last merged pull request
//   node tools/ci/prune-merged-branches.mjs --go       deletes them, 50 a push
// A branch goes only if every pull request from it is merged and its tip is still a merged pull request's head (nothing
// pushed since). Kept: main, gh-pages, claude/prototype, claude/ed-shots, claude/publish-snapshot; any branch with an open
// or closed-unmerged pull request, or none; and every branch named in docs/active-builders.md (a parked builder's branch
// is never deleted). GitHub keeps each merged pull request, with a Restore branch button; the list printed has every tip.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const KEEP = new Set(["main", "gh-pages", "claude/prototype", "claude/ed-shots", "claude/publish-snapshot"]);
const run = (cmd, args) => execFileSync(cmd, args, { encoding: "utf8", maxBuffer: 1 << 28 });

/** The branches to delete, as [branch, tip, pull request], and why each of the others stays (a count a reason). */
export function prunable(tips, pulls, register, keep = KEEP) {
  const by = new Map();
  for (const p of pulls) { if (!by.has(p.ref)) by.set(p.ref, []); by.get(p.ref).push(p); }
  const out = [], kept = {}, stay = why => { kept[why] = (kept[why] ?? 0) + 1; };
  for (const [branch, tip] of tips) {
    const mine = by.get(branch);
    if (keep.has(branch)) stay("kept by name");
    else if (!mine) stay("no pull request");
    else if (mine.some(p => p.state === "open")) stay("open pull request");
    else if (!mine.every(p => p.merged)) stay("closed unmerged pull request");
    else if (register.has(branch)) stay("in the builders register");
    else if (!mine.some(p => p.sha === tip)) stay("pushed to since its merge");
    else out.push([branch, tip, Math.max(...mine.map(p => p.number))]);
  }
  return { out: out.sort((a, b) => (a[0] < b[0] ? -1 : 1)), kept };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const repo = /github\.com[:/]([^/]+\/[^/]+?)(?:\.git)?$/.exec(run("git", ["remote", "get-url", "origin"]).trim())?.[1];
  if (!repo) throw Error("origin is not a GitHub repository");
  const tips = run("git", ["ls-remote", "--heads", "origin"]).trim().split("\n").map(l => l.split(/\s+/)).map(([sha, ref]) => [ref.replace("refs/heads/", ""), sha]);
  const pulls = [];
  for (let page = 1; ; page++) {
    const got = JSON.parse(run("gh", ["api", `repos/${repo}/pulls?state=all&per_page=100&page=${page}`]));
    for (const p of got) if (p.head.repo?.full_name === repo) pulls.push({ number: p.number, state: p.state, merged: !!p.merged_at, ref: p.head.ref, sha: p.head.sha });
    if (got.length < 100) break;
  }
  const register = new Set(fs.existsSync("docs/active-builders.md") ? fs.readFileSync("docs/active-builders.md", "utf8").match(/`(?:claude|codex|coord)\/[\w./-]+`/g)?.map(s => s.slice(1, -1)) : []);
  const { out, kept } = prunable(tips, pulls, register);
  for (const [branch, tip, number] of out) console.log(`${branch}\t${tip}\t#${number}`);
  console.error(`${tips.length} branches: ${out.length} to delete; kept: ${Object.entries(kept).map(([k, n]) => `${n} ${k}`).join(", ")}`);
  if (!process.argv.includes("--go")) { console.error("Nothing deleted. Add --go to delete them."); process.exit(0); }
  let done = 0;
  for (let i = 0; i < out.length; i += 50) {
    const batch = out.slice(i, i + 50);
    // (--force-with-lease: a branch pushed to since the list was made is refused, not deleted)
    run("git", ["push", "--quiet", "origin", ...batch.map(([b, tip]) => `--force-with-lease=refs/heads/${b}:${tip}`), ...batch.map(([b]) => `:refs/heads/${b}`)]);
    done += batch.length; console.error(`deleted ${done} of ${out.length}`);
  }
}
