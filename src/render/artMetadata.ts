// Whole helpers moved from artBuild; drawing bodies are unchanged.
import type { StumpSpec } from "../rules/stumps";
import type { Carving } from "./artBuild";

/** The dancefloor speakers in their atlas: the frame for "angle:state:frame", and each angle's ground point. */
/** A home speaker's runestone: an area's rune stone, as tall and carved the same, at this share of its width (Ed, 2026-10-08:
 *  "similar to normal runestones but half the width"; it was a 0.55 miniature). */
export const SPEAKER_STONE_WIDTH = 0.5;

export const RING_STONE_CARVING: Carving = { dots: true };

export const RING_STONE_CARVINGS: Record<number, Carving> = {};

export const carvingKey = (c?: Carving) => (c?.sigil ? `s:${c.sigil}` : c?.rune !== undefined ? `r:${c.rune}` : "");

/** A ring stone's frame key in SpeakerArt.stones: its drawn angle and its carving. */
export const ringStoneKey = (i: number, angle: number): string => `${angle}|${carvingKey(RING_STONE_CARVINGS[i])}`;

/** A baked stump: the ground under its middle and its cut's middle on the sprite (art pixels from its top-left), the cut's height
 *  and the trunk's radius (m). */
/** A stump spec's id: its art job's, and its key in the asset library. */
export const stumpId = (s: StumpSpec): string => `${s.species}:${s.area ?? ""}:${s.seed}:${s.yaw.toFixed(3)}:${s.biome ?? ""}${s.irregular ? `:i${s.irregular}` : ""}`;

/** The Harvest hat's sprouts (art/country.js scene pieces), one under each of its berries by its place in the ring. */
export const HARVEST_SPROUTS = ["harvest-sprout-1", "harvest-sprout-2", "harvest-sprout-3"];

/** The Cyclone's whirlwind's effects and their frames (art/effects.js), and the spell's neon its wind and motes take. */
export const CYCLONE_FRAMES: [string, number][] = [["cycloneRise", 3], ["cyclone", 8], ["cycloneFall", 3]];

export const CYCLONE_TINT = [190, 150, 255];
