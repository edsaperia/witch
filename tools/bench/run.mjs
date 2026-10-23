// The rules benchmark (tools/bench/rules.ts), bundled with esbuild and run in Node; writes
// <out>/rules.json. Then, unless --rules-only, the frame benchmark (tools/bench/frames.cjs, on the
// built game: `npm run build` first). Compare two outs with tools/bench/compare.cjs.
//   node tools/bench/run.mjs [out dir] [--rules-only] [--quick] [--seeds=123,165272] [--wave=30] [--steps=1800]
//   --quick (npm run bench:quick, about 5 minutes): the rules to wave 10 for 900 steps, and frames.cjs's three quick scenes.
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2), flags = argv.filter(a => a.startsWith("--")), out = path.resolve(argv.find(a => !a.startsWith("--")) ?? path.join(here, "../../bench-out"));
fs.mkdirSync(out, { recursive: true });
const bundle = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "witch-bench-")), "rules.mjs");
// Vite's eager `import.meta.glob` of JSON files (the house's rooms, config/house/rooms/*.json: rules/houseConfig.ts), as esbuild has
// none: each call becomes an object of static imports, keyed as Vite keys it (the path as written).
const globJson = { name: "glob-json", setup(b) {
  b.onLoad({ filter: /\.ts$/ }, args => {
    const src = fs.readFileSync(args.path, "utf8");
    if (!src.includes("import.meta.glob")) return undefined;
    const dir = path.dirname(args.path), heads = [];
    let n = 0;
    const code = src.replace(/import\.meta\.glob(?:<[^>]*>)?\(\s*"([^"]+)"\s*,\s*\{\s*eager:\s*true,\s*import:\s*"default"\s*\}\s*\)/g, (_, pat) => {
      const at = path.resolve(dir, path.dirname(pat)), ext = path.extname(pat), keys = fs.readdirSync(at).filter(f => f.endsWith(ext)).sort();
      const fields = keys.map(f => { const v = `__glob${n++}`; heads.push(`import ${v} from ${JSON.stringify(path.join(at, f))};`); return `${JSON.stringify(path.posix.join(path.posix.dirname(pat), f))}: ${v}`; });
      return `({ ${fields.join(", ")} })`;
    });
    return { contents: heads.join("\n") + "\n" + code, loader: "ts" };
  });
} };
await build({ entryPoints: [path.join(here, "rules.ts")], bundle: true, platform: "node", format: "esm", outfile: bundle, logLevel: "warning", plugins: [globJson] });
const quick = flags.includes("--quick"), given = k => flags.some(f => f.startsWith(`--${k}=`));
const ruleFlags = [...flags.filter(f => f !== "--rules-only" && f !== "--quick"), ...(quick && !given("wave") ? ["--wave=10"] : []), ...(quick && !given("steps") ? ["--steps=900"] : [])];
const rules = execFileSync(process.execPath, [bundle, ...ruleFlags], { encoding: "utf8", maxBuffer: 1 << 26 });
fs.writeFileSync(path.join(out, "rules.json"), rules);
for (const s of JSON.parse(rules).seeds) console.log(`rules seed ${s.seed}: wave ${s.wave}, ${s.creatures} creatures, step median ${s.step.median} ms, p99 ${s.step.p99} ms, worst ${s.step.worst} ms`);
if (!flags.includes("--rules-only")) execFileSync(process.execPath, [path.join(here, "frames.cjs"), out], { stdio: "inherit", env: { ...process.env, ...(quick ? { QUICK: "1" } : {}) } });
