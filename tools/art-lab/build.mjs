// Builds the Witch Art Lab as one self-contained page (an artifact page cannot load other
// files): each `import … from "../../art/<module>.js"` in the source page is replaced by
// that module's code, with its `export` keywords and its own relative imports removed, so
// every module shares the page script's scope. Writes tools/art-lab/dist/witch-art-lab.html.
//   node tools/art-lab/build.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = resolve(here, "witch-art-lab.html"), out = resolve(here, "dist/witch-art-lab.html");
const inlined = new Set();

function inline(path) {
  if (inlined.has(path)) return "";
  inlined.add(path);
  let code = readFileSync(path, "utf8");
  // a module's own imports come first: inline what it depends on, then drop the import line
  code = code.replace(/^import\s*\{[^}]*\}\s*from\s*"(\.[^"]+)";\s*$/gm, (_, rel) => inline(resolve(dirname(path), rel)));
  if (/^\s*import\s/m.test(code)) throw new Error(`${path}: an import the build cannot inline`);
  code = code.replace(/^export\s*\{[^}]*\};?\s*$/gm, ""); // re-exports: the names are already in scope
  return `// ---- inlined from ${path.slice(resolve(here, "../..").length + 1)} ----\n` + code.replace(/^export\s+(?=(async\s+)?(function|const|let|class)\b)/gm, "") + "\n";
}

let page = readFileSync(src, "utf8");
page = page.replace(/^import\s*\{[^}]*\}\s*from\s*"(\.[^"]+)";\s*$/gm, (_, rel) => inline(resolve(dirname(src), rel)));
if (/^import\s/m.test(page)) throw new Error("the page still has an import the build cannot inline");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, page);
console.log(`wrote ${out.slice(resolve(here, "../..").length + 1)} (${(page.length / 1024).toFixed(1)} KB; inlined ${[...inlined].length} modules)`);
