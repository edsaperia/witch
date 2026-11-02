import { expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { buildSync } from "esbuild";
import ts from "typescript";
import { LEGEND } from "./creatureLevels";
import { LEGEND as legacyLegend, type Level as LegacyLevel } from "./creatures";
import { COMBAT, strengthOf } from "./combat/data";
import { FIGHT } from "./movement";
import { ageProfile } from "./combat/age";
import { CREATURE_IDS, sectionOf, speciesWith } from "./creatureConfig";
import raw from "../../config/combat.json";
import tuning from "../../config/tuning.json";

it("preserves the legacy literal/export and identical default combat data and level strengths", () => {
  const level: LegacyLevel = LEGEND;
  expect(level).toBe(3); expect(legacyLegend).toBe(LEGEND);
  // Replay only the old data module's import boundary with its original LEGEND=3,
  // not a rewritten expected-value fixture or a second simulation instance.
  const current = readFileSync("src/rules/combat/data.ts", "utf8").replace(/\r\n/g, "\n");
  const before = current.replace('import type { Creature, Level } from "../creatures";\nimport { LEGEND } from "../creatureLevels";', 'import { LEGEND, type Creature, type Level } from "../creatures";');
  expect(before).not.toBe(current);
  const code = ts.transpileModule(before, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  const exports: Record<string, any> = {};
  const require = (name: string) => {
    if (name.endsWith("config/combat.json")) return raw;
    if (name.endsWith("config/tuning.json")) return tuning;
    if (name === "../creatures") return { LEGEND: 3 };
    if (name === "../movement") return { FIGHT };
    if (name === "./age") return { ageProfile };
    if (name === "../creatureConfig") return { sectionOf, speciesWith };
    throw Error(`Unexpected new runtime dependency ${name}`);
  };
  new Function("require", "exports", code)(require, exports);
  expect(COMBAT).toEqual(exports.COMBAT);
  for (const species of CREATURE_IDS) for (const level of [0, 1, 2, 3] as const)
    expect(strengthOf(species, level)).toBe(exports.strengthOf(species, level));
});

it("keeps the schema data runtime graph independent of creatures, wildWatch and game", () => {
  const result = buildSync({ entryPoints: ["src/rules/configData.ts"], bundle: true, platform: "node", format: "cjs", write: false, metafile: true, logLevel: "silent" });
  const files = Object.keys(result.metafile!.inputs).map(p => p.replaceAll("\\", "/"));
  expect(files).toContain("src/rules/creatureLevels.ts");
  for (const runtime of ["src/rules/creatures.ts", "src/rules/wildWatch.ts", "src/rules/game.ts"]) expect(files).not.toContain(runtime);
});
