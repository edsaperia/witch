// The other config files' schemas (housekeeping, issue #122): which file, where its schema lives,
// which of its objects are records keyed by name (species, attacks, area types...), and the string
// choices the code reads. tools/config/schema.mjs --init infers each schema from its file with these;
// configs.test.ts checks every file, and that the names they use point at real things.
// (style.json is the art builders', music-style.json and creature-voices.json the audio's: not here.)
import type { Delivery, Modifier } from "./combat";
import type { BehaviourKind, Move, TacticKind } from "./movement";
import type { Schema } from "./schema";

// The string choices, as lists; the checks below fail to compile if one drifts from its type.
export const DELIVERIES = ["melee", "shot", "quake", "lob", "beam", "pulse"] as const;
export const MODIFIERS = ["none", "knockback", "slow"] as const;
export const BEHAVIOURS = ["arrive", "keepRange", "orbit", "strafe", "slot", "separation", "cohesion", "wander", "dodge", "light"] as const;
export const TACTICS = ["surround", "pincer", "hitAndRun", "volley", "swarm", "flank", "none"] as const;
export const MOVES = ["charge", "ambush", "burrow", "leap", "dig", "block", "trail", "flash", "swoop"] as const;
export const HOUSE_USES = ["creator", "hats", "bed", "zoo", "telescope", "say", "chart", "instrument", "pile"] as const;
export const BROOM_SLOTS = ["tip", "chassis", "exhaust"] as const;
/** The broom spells a set can give (rules/spells.ts BroomSpellId, but none). */
export const SET_SPELLS = ["speed", "battering", "leyjump", "pound", "stealth"] as const;
import type { Slot } from "./broomParts";
import type { BroomSpellId } from "./spells";
type Same<A, B> = [A] extends [B] ? ([B] extends [A] ? true : never) : never;
export const _check2: [Same<(typeof BROOM_SLOTS)[number], Slot>, Same<(typeof SET_SPELLS)[number], Exclude<BroomSpellId, "none">>] = [true, true];
export const _check: [Same<(typeof DELIVERIES)[number], Delivery>, Same<(typeof MODIFIERS)[number], Modifier>, Same<(typeof BEHAVIOURS)[number], BehaviourKind>, Same<(typeof TACTICS)[number], TacticKind>, Same<(typeof MOVES)[number], Move["kind"]>] = [true, true, true, true, true];

export interface ConfigSchema { name: string; file: string; schema: string; records: readonly string[]; over: Record<string, Partial<Schema>> }

export const CONFIGS: readonly ConfigSchema[] = [
  {
    name: "combat", file: "config/combat.json", schema: "config/schema/combat.schema.json",
    records: ["strength.species", "attacks", "bySpecies", "traits", "counters"],
    over: { "attacks.*.delivery": { enum: DELIVERIES }, "attacks.*.modifier": { enum: MODIFIERS } },
  },
  {
    name: "movement", file: "config/movement.json", schema: "config/schema/movement.schema.json",
    records: ["profiles", "legends.bySpecies", "bodies.radius"],
    over: { "profiles.*.fight[].kind": { enum: BEHAVIOURS }, "profiles.*.tactics[].kind": { enum: TACTICS }, "profiles.*.move.kind": { enum: MOVES } },
  },
  { name: "travel", file: "config/travel.json", schema: "config/schema/travel.schema.json", records: [], over: {} },
  { name: "area-types", file: "config/area-types.json", schema: "config/schema/area-types.schema.json", records: ["types"], over: {} },
  { name: "legend-buffs", file: "config/legend-buffs.json", schema: "config/schema/legend-buffs.schema.json", records: ["limits", "species"], over: {} },
  { name: "house", file: "config/house/", /* (assembled from base.json and rooms/*.json: rules/houseConfig.ts) */ schema: "config/schema/house.schema.json", records: [], over: { "objects[].use.kind": { enum: HOUSE_USES } } },
  {
    name: "broom-parts", file: "config/broom-parts.json", schema: "config/schema/broom-parts.schema.json",
    records: ["parts", "sets", "parts.*.stats"],
    over: { "parts.*.slot": { enum: BROOM_SLOTS }, "parts.*.look.piece": { enum: ["body", "tail"] }, "sets.*.spell": { enum: SET_SPELLS } },
  },
];
