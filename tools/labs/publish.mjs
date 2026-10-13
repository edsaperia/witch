// The two self-contained lab pages, built and put with the game (Ed, 2026-10-13: the built pages were committed, and every PR
// that rebuilt one conflicted with every other): tools/art-lab/build.mjs writes tools/art-lab/dist/witch-art-lab.html and
// tools/music-lab/build.mjs tools/music-lab/dist/witch-music-lab.html (both git-ignored now), and this copies them into
// dist/, so the Pages deploy publishes them beside the game: https://edsaperia.github.io/witch/witch-art-lab.html and
// /witch-music-lab.html (a pull request's under /pr-<number>/). The last step of `npm run build`.
//   node tools/labs/publish.mjs [dist dir]
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../.."), dist = resolve(process.argv[2] ?? join(ROOT, "dist"));
mkdirSync(dist, { recursive: true });
for (const [script, built] of [["tools/art-lab/build.mjs", "tools/art-lab/dist/witch-art-lab.html"], ["tools/music-lab/build.mjs", "tools/music-lab/dist/witch-music-lab.html"]]) {
  execFileSync("node", [script], { cwd: ROOT, stdio: "inherit" });
  if (!existsSync(join(ROOT, built))) throw new Error(`${script} wrote no ${built}`);
  copyFileSync(join(ROOT, built), join(dist, built.split("/").pop()));
}
console.log(`lab pages in ${dist.slice(ROOT.length + 1) || dist}/: witch-art-lab.html, witch-music-lab.html`);
