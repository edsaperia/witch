// What the tuning schema (config/schema/tuning.schema.json) can't infer from the file's values:
// the string choices the code reads (from Tuning's unions in rules/tuning.ts), and the records
// keyed by name. tools/config/schema.mjs --init applies these on top of the inferred structure.
import type { Schema } from "./schema";

export const TUNING_OVER: Record<string, Partial<Schema>> = {
  "map.shape": { enum: ["circle", "square"] },
  "berries.cost.by": { enum: ["power", "value"] },
  "arena.curve": { enum: ["linear", "smooth"] },
  "partyObjects.home.weights": { additionalProperties: { type: "number", minimum: 0 } },
  "partyWitches.weights": { additionalProperties: { type: "number", minimum: 0 } },
  "grounds.radius": { additionalProperties: { type: "number", minimum: 0 } },
  "legendClearing.species": { additionalProperties: { type: "number", minimum: 0 } },
  "population.byRoute.profiles": { additionalProperties: { type: "array", items: { type: "number", minimum: 0 }, minItems: 3, maxItems: 3 } },
};
