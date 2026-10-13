// The config files as the game reads them (housekeeping, 2026-10-13): three of them hold their per-species entries in each
// creature's folder (art/creatures/<id>/creature.js: rules/creatureConfig.ts), so their schema checks (configs.test.ts) and
// the schema tool (tools/config/schema.mjs) read the assembled tables, not the files alone.
import { readFileSync } from "node:fs";
import { COMBAT } from "./combat/data";
import { MOVEMENT } from "./movement";
import { LEGEND_BUFFS } from "./buffs";

/** The data a config file names, assembled (combat, movement, legend-buffs), else the file's own. */
export function configData(name: string, file: string): unknown {
  if (name === "combat") return COMBAT;
  if (name === "movement") return MOVEMENT;
  if (name === "legend-buffs") return LEGEND_BUFFS;
  return JSON.parse(readFileSync(file, "utf8"));
}
