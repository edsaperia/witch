// The composable attacks (docs/plans/attack-grammar.md): the library in config/attacks.json, read once, and the grammar's tools.
import raw from "../../../config/attacks.json";
import type { AttackSpec } from "./types";
import type { Library } from "./parse";

export * from "./types";
export { parseAttack, serialiseAttack, withBase, childSpec, check, merge, type Library, type Parsed } from "./parse";
export { readability, liftToFloor, ownWarning, telegraphKind, REACTION_FLOOR, TELEGRAPH_OF } from "./timeline";
export { compileLegacy, fromLegacy } from "./legacy";
export { attackSchema, ATTACK_FILE_SCHEMA, MAX_DEPTH } from "./schema";

/** Every attack in config/attacks.json by name (its "_" notes left out). */
export const ATTACK_LIB: Library = Object.fromEntries(Object.entries(raw as Record<string, unknown>).filter(([k]) => !k.startsWith("_"))) as Record<string, AttackSpec>;
