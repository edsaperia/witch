// What the art check should run for a change (.github/workflows/art-check.yml): node tools/art-check/scope.mjs <changed path>...
// (or --file <list>, a path a line)
// prints one line, the flags for node art/check.mjs: an empty line for the full run; `--only a,b --no-lab` when the change
// touches only creature and area folders (art/creatures/<id>/, art/areas/<id>/: their own checks, about a minute); or `skip`
// when nothing of the art changed. Shared art code (anything else under art/, the Art Lab, config/style.json, the check
// itself) means the full run: a builder's species draws through it. The workflow runs the full check on every push to
// claude/prototype regardless. scope(paths) is the rule, for src/artCheckScope.test.ts.
export function scope(paths) {
  const ids = new Set();
  let full = false, any = false;
  for (const p of paths) {
    const m = /^art\/(creatures|areas)\/([^/]+)\/[^/]+$/.exec(p);
    if (m) { ids.add(m[2]); any = true; continue; }
    if (/^art\/creatures\/index\.js$|^art\/areas\/index\.js$/.test(p)) { any = true; continue; } // (the generated indexes: a folder added, nothing shared)
    if (/^(art\/|tools\/art-lab\/|tools\/art-check\/|config\/style\.json$|\.github\/workflows\/art-check\.yml$)/.test(p)) { full = true; any = true; }
  }
  if (!any) return { mode: "skip", only: [], flags: "skip" };
  if (full) return { mode: "full", only: [], flags: "" };
  const only = [...ids].sort();
  return { mode: "only", only, flags: `--only ${only.join(",")} --no-lab` };
}
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2), at = args.indexOf("--file"); // (--file <list>: a path a line, as git diff --name-only writes it)
  const paths = at >= 0 ? (await import("node:fs")).readFileSync(args[at + 1], "utf8").split("\n").map(l => l.trim()).filter(Boolean) : args;
  console.log(scope(paths).flags);
}
