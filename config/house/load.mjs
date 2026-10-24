// The treehouse's plan for the tools, from disk (config/house/assemble.js; the game's own is src/rules/houseConfig.ts):
//   import { loadHouse } from "../../config/house/load.mjs"      (an ES module)
//   const { loadHouse } = require("../../config/house/load.mjs")  (CommonJS: Node 22 requires ES modules without top-level await)
import { readFileSync, readdirSync } from "node:fs";
import { assemble } from "./assemble.js";

const here = new URL(".", import.meta.url), read = u => JSON.parse(readFileSync(u, "utf8"));

/** The room files, as they lie (config/house/rooms/*.json). */
export function houseFiles() {
  const dir = new URL("rooms/", here);
  return { base: read(new URL("base.json", here)), rooms: readdirSync(dir).filter(f => f.endsWith(".json")).sort().map(f => read(new URL(f, dir))) };
}
/** The house as config/house.json held it: the base's numbers, its rooms, branches and objects. */
export function loadHouse() { const { base, rooms } = houseFiles(); return assemble(base, rooms); }
