// The game's default look (Ed, 2026-10-29: "Please give me an easy way to select character creation defaults ... This is a dev
// tool - just so I can set the defaults for the game"): what a brand-new witch starts with, config/default-look.json (her genome,
// or null for the classic witch, art/witchGenome.js WITCH_GENOME; her broom's fitted parts, or null for a bare broom). The pause
// page's Copy look as defaults gives that file's text from how she's dressed now, to paste back; ?newWitch=1 plays a load as a
// brand-new witch (her saves' look, wardrobe, broom parts, hats and hat spell not read, and none of them written).
import * as Art from "../../art/generator.js";
import RAW from "../../config/default-look.json";
import { SLOTS, bareBroom, partById, type Fitted } from "../rules/broomParts";

type Genome = Record<string, unknown>;
/** The file's note (the build drops a config's "_" notes: vite.config.ts), written back into every copy. */
export const NOTE = "What a brand-new witch starts with (Ed, 2026-10-29: \"Please give me an easy way to select character creation defaults ... This is a dev tool - just so I can set the defaults for the game\"; src/app/defaultLook.ts). genome: her look (art/witchGenome.js's shape: hat, hair, top, cloak, broom's colours and fit, accessories, sizes, palette), or null for the classic witch (WITCH_GENOME, her colours DEFAULT_OUTFIT under the style's hues); whatever it wears is hers from the start, over config/wardrobe.json's start items. broom: the parts fitted in each slot (config/broom-parts.json), found from the start, or null for a bare broom. Made by the pause page's Copy look as defaults (with the debug overlay or Unlock everything on): paste its text over this file. A genome the generator's rules refuse is the classic witch. ?newWitch=1 plays a load as a brand-new witch, nothing saved.";
const problems = Art.witchGenomeProblems as (g: unknown) => string[];
const upgrade = Art.upgradeGenome as (g: unknown) => Genome;

/** The defaults file's text for a genome and a broom (the file's note kept), ready to paste over config/default-look.json. */
export function defaultsText(genome: Genome | null, broom: Fitted | null): string {
  const parts = broom && SLOTS.some(s => broom[s]) ? Object.fromEntries(SLOTS.map(s => [s, broom[s] ?? null])) : null;
  return JSON.stringify({ _: NOTE, genome: genome ? upgrade(JSON.parse(JSON.stringify(genome))) : null, broom: parts }, null, 2) + "\n";
}

/** The genome in a defaults file (`raw`, the game's own by default), a copy; null where it has none or the generator's rules refuse it (the classic witch). */
export function defaultGenome(raw: { genome?: unknown } = RAW): Genome | null {
  if (!raw.genome || typeof raw.genome !== "object") return null;
  const g = upgrade(JSON.parse(JSON.stringify(raw.genome)));
  return problems(g).length ? null : g;
}
/** The broom parts in a defaults file, each a known part in its own slot (a bare broom where it has none). */
export function defaultBroom(raw: { broom?: unknown } = RAW): Fitted {
  const out = bareBroom(), b = raw.broom as Partial<Record<string, unknown>> | null | undefined;
  if (b && typeof b === "object") for (const s of SLOTS) { const id = b[s]; if (typeof id === "string" && partById(id)?.slot === s) out[s] = id; }
  return out;
}

/** ?newWitch=1: this load as a brand-new witch, nothing of hers read or written. */
export const newWitch = (): boolean => { try { return new URLSearchParams(globalThis.location?.search ?? "").get("newWitch") === "1"; } catch { return false; } };
/** The link to try the default look: this one with ?newWitch=1 (and no ?hat=, ?parts= or ?bag= over it). */
export function newWitchLink(href: string): string {
  const u = new URL(href);
  for (const k of ["hat", "hats", "parts", "bag"]) u.searchParams.delete(k);
  u.searchParams.set("newWitch", "1");
  return u.toString();
}
