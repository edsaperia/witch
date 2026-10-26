// Publishing previews to claude/ed-shots safely (the coordinator, 2026-10-26: twice that day a builder's stale staged deletion went
// out with their own frames and briefly deleted hundreds of other builders' previews). Only the named files are added or replaced:
// the branch is fetched and the new commit built on it with git's plumbing (a temporary index read from the branch's tip, each file
// hashed in and placed, a tree written and committed on the tip), never from a checkout, so nothing staged or missing locally can
// ride along. It refuses a commit that would delete any path, and a push that's beaten (another builder pushed first) is fetched
// and built again on the new tip, up to `tries` times. Prints the commit and each file's link.
//   node tools/shots/push.mjs <local file>[:<path on the branch>] ... [--to <dir on the branch>] [-m <message>]
//     a file with no :path goes to <--to>/<its name> (--to defaults to previews/<today>); a directory's files go in by their
//     paths under it; --branch (claude/ed-shots), --remote (origin), --dry (build and check the commit, don't push)
//   e.g. node tools/shots/push.mjs out/a.png out/b.png --to previews/my-change -m "My change: before and after"
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const git = (args, o = {}) => execFileSync("git", args, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"], ...o }).trim();

/** A path on the branch, checked: relative, forward slashes, no `..` or empty parts, no .git. */
export function branchPath(p) {
  const q = p.replace(/\\/g, "/").replace(/^\.\//, "");
  const parts = q.split("/");
  if (!q || q.startsWith("/") || parts.some(s => !s || s === "." || s === ".." || s === ".git")) throw new Error(`not a path on the branch: ${p}`);
  return q;
}

/** What to publish, from the command line's files: [{ from: local file, to: path on the branch }], a directory's files by their
 *  paths under it, a file with no `:path` at `<to>/<its name>`. */
export function plan(items, to) {
  const out = [];
  for (const item of items) {
    const i = item.lastIndexOf(":"), [from, dest] = i > 1 ? [item.slice(0, i), item.slice(i + 1)] : [item, null]; // (i > 1: not a Windows drive letter)
    if (!fs.existsSync(from)) throw new Error(`no such file: ${from}`);
    if (fs.statSync(from).isDirectory()) {
      const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => (e.isDirectory() ? walk(path.join(d, e.name)) : e.isFile() ? [path.join(d, e.name)] : []));
      for (const f of walk(from)) out.push({ from: f, to: branchPath(path.posix.join(dest ?? path.posix.join(to, path.basename(from)), path.relative(from, f).split(path.sep).join("/"))) });
    } else out.push({ from, to: branchPath(dest ?? path.posix.join(to, path.basename(from))) });
  }
  const seen = new Set();
  for (const p of out) { if (seen.has(p.to)) throw new Error(`two files for ${p.to}`); seen.add(p.to); }
  return out;
}

/** The paths a commit deletes from its parent (a tree against a tree). */
export function deletions(parent, tree, cwd) {
  const s = git(["diff-tree", "-r", "--no-renames", "--name-only", "--diff-filter=D", parent, tree], { cwd });
  return s ? s.split("\n") : [];
}

/** Builds the commit on the remote branch's tip and pushes it; again on a newer tip if the push is beaten. Returns the commit,
 *  or null when nothing would change. `beforePush` is for the tests (another builder pushing in between). */
export function publish({ files, branch = "claude/ed-shots", remote = "origin", message, cwd = process.cwd(), dry = false, tries = 6, beforePush, log = console.log }) {
  if (!files.length) throw new Error("nothing to publish");
  const tracking = `refs/shots-push/${branch}`;
  const blobs = files.map(f => ({ ...f, blob: git(["hash-object", "-w", "--", path.resolve(cwd, f.from)], { cwd }) }));
  for (let attempt = 1; ; attempt++) {
    git(["fetch", "-q", remote, `+refs/heads/${branch}:${tracking}`], { cwd });
    const parent = git(["rev-parse", tracking], { cwd });
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "shots-push-")), env = { ...process.env, GIT_INDEX_FILE: path.join(tmp, "index") };
    let tree;
    try {
      git(["read-tree", parent], { cwd, env });
      for (const b of blobs) git(["update-index", "--add", "--cacheinfo", `100644,${b.blob},${b.to}`], { cwd, env });
      tree = git(["write-tree"], { cwd, env });
    } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
    const gone = deletions(parent, tree, cwd);
    if (gone.length) throw new Error(`refused: the commit would delete ${gone.length} path${gone.length > 1 ? "s" : ""} from ${branch}: ${gone.slice(0, 10).join(", ")}${gone.length > 10 ? ", ..." : ""}`);
    if (tree === git(["rev-parse", `${parent}^{tree}`], { cwd })) { log(`nothing to publish: ${branch} already has these files as they are`); return null; }
    const commit = git(["commit-tree", tree, "-p", parent, "-F", "-"], { cwd, input: message ?? `Previews: ${files.map(f => f.to).join(", ")}` });
    const changed = git(["diff-tree", "-r", "--no-renames", "--name-status", parent, commit], { cwd });
    if (dry) { log(`dry run: ${commit} on ${parent.slice(0, 9)}\n${changed}`); return commit; }
    beforePush?.(attempt);
    try {
      git(["push", "-q", remote, `${commit}:refs/heads/${branch}`], { cwd });
    } catch (e) {
      const why = String(e.stderr ?? e.message);
      if (attempt < tries && /non-fast-forward|fetch first|rejected|failed to push/i.test(why)) { log(`beaten to ${branch} (attempt ${attempt}): fetching it again`); continue; }
      throw new Error(`push failed: ${why.trim()}`);
    }
    log(`pushed ${commit} to ${branch} (on ${parent.slice(0, 9)})\n${changed}`);
    return commit;
  }
}

function main(argv) {
  const args = [...argv], opt = name => { const i = args.indexOf(name); return i >= 0 ? args.splice(i, 2)[1] : undefined; };
  const flag = name => { const i = args.indexOf(name); if (i >= 0) args.splice(i, 1); return i >= 0; };
  const to = opt("--to") ?? `previews/${new Date().toISOString().slice(0, 10)}`, message = opt("-m"), branch = opt("--branch") ?? "claude/ed-shots", remote = opt("--remote") ?? "origin", dry = flag("--dry");
  if (!args.length) { console.error("usage: node tools/shots/push.mjs <file>[:<path on the branch>] ... [--to <dir>] [-m <message>] [--branch b] [--remote r] [--dry]"); process.exit(1); }
  const files = plan(args, branchPath(to));
  const commit = publish({ files, branch, remote, message, dry });
  if (commit && !dry) for (const f of files) console.log(`https://github.com/edsaperia/witch/blob/${branch}/${f.to}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(process.argv.slice(2)); } catch (e) { console.error(e.message); process.exit(1); }
}
