// Builds the soundsystem preview (tools/soundsystem/preview.html) as one self-contained page: five real maps' soundsystems, dealt by
// the game's own soundsystemSpecs (render/soundsystemGen.ts: genome, yaw, size, distance), and the art modules inlined as the Art
// Lab's build inlines them (tools/art-lab/build.mjs), so the page draws every one live and rerolls in the browser.
// Writes tools/soundsystem/dist/witch-soundsystems.html.
//   node tools/soundsystem/build-preview.mjs [seeds]
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { openRules } from "../balance/lib.mjs";

const here = dirname(fileURLToPath(import.meta.url)), root = resolve(here, "../.."), src = resolve(here, "preview.html"), out = resolve(here, "dist/witch-soundsystems.html");
const seeds = (process.argv[2] || "123,7,2026,42,999").split(",").map(Number);
const R = await openRules();
const { newGame } = await R.load("/src/rules/game.ts"), { TUNING } = await R.load("/src/rules/tuning.ts"), { soundsystemSpecs, SOUNDSYSTEM_GEN_DEFAULT } = await R.load("/src/render/soundsystemGen.ts");
const MAPS = seeds.map(seed => {
  const g = newGame(seed, TUNING), d = g.map.dancefloor, K = { ...SOUNDSYSTEM_GEN_DEFAULT, ...(TUNING.soundsystemGen ?? {}) }, list = [];
  for (const s of soundsystemSpecs(g.map, K).values()) {
    const [cx, cy] = s.key.split(",").map(Number), p = g.map.soundsystemSpot(cx, cy);
    list.push({ key: s.key, seed: s.genome.seed - s.genome.salt * 0, far: s.far, dist: Math.hypot(p.x - d.x, p.z - d.z), dx: p.x - d.x, dz: p.z - d.z, yaw: s.yaw, size: s.size, genome: s.genome });
  }
  return { seed, radius: Math.max(...list.map(a => Math.hypot(a.dx, a.dz))) * 1.05, list };
});
await R.close();

const inlined = new Set();
function inline(path) {
  if (inlined.has(path)) return "";
  inlined.add(path);
  let code = readFileSync(path, "utf8");
  code = code.replace(/^import\s*\{[^}]*\}\s*from\s*"(\.[^"]+)";\s*$/gm, (_, rel) => inline(resolve(dirname(path), rel)));
  if (/^\s*import\s/m.test(code)) throw new Error(`${path}: an import the build cannot inline`);
  code = code.replace(/^export\s*\{[^}]*\};?\s*$/gm, "");
  return `// ---- inlined from ${path.slice(root.length + 1)} ----\n` + code.replace(/^export\s+(?=(async\s+)?(function|const|let|class)\b)/gm, "") + "\n";
}
let page = readFileSync(src, "utf8");
page = page.replace(/^import\s*\{[^}]*\}\s*from\s*"(\.[^"]+)";\s*$/gm, (_, rel) => inline(resolve(dirname(src), rel)));
if (/^import\s/m.test(page)) throw new Error("the page still has an import the build cannot inline");
// every inlined module shares the page script's scope: two top-level declarations of one name would break it
const seen = new Map();
for (const chunk of page.split(/^\/\/ ---- inlined from /m)) {
  const from = chunk.split("\n")[0].replace(/ ----$/, "") || "page";
  for (const m of chunk.matchAll(/^(?:async\s+)?(?:function\*?|const|let|class)\s+([A-Za-z_$][\w$]*)/gm)) { if (seen.has(m[1])) throw new Error(`"${m[1]}" is declared in both ${seen.get(m[1])} and ${from}`); seen.set(m[1], from); }
}
page = page.replace("/*MAPS*/[]/*END*/", JSON.stringify(MAPS)).replace("/*STYLE*/{}/*END*/", readFileSync(resolve(root, "config/style.json"), "utf8").trim());
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, page);
console.log(`wrote ${out.slice(root.length + 1)} (${(page.length / 1024).toFixed(1)} KB; ${MAPS.length} maps, ${MAPS.map(m => m.list.length).join("/")} soundsystems; inlined ${inlined.size} modules)`);
