// Each legend circle's floor has some of its area's character (Ed, 2026-10-06: "Each legend circle floor should have
// some of the character of its area; different stone, different debris, etc."): its stone, the debris strewn over it
// from the area's own ground cover, and what grows over it, by area type (art/areas.js), drawn by the ground shader
// (render/ground.ts). Any area not listed takes the fallback.

type RGB = [number, number, number];
/** Debris shapes: 0 leaves (small blobs), 1 needles (fine streaks), 2 pebbles (little clumps), 3 flowers (bright specks). */
export type DebrisShape = 0 | 1 | 2 | 3;
export interface FloorLook {
  /** The flagstones' colour, before the area's own floor is mixed in. */
  stone: RGB;
  /** What lies on it, and how thick (0 to 1). */
  debris: RGB; shape: DebrisShape; litter: number;
  /** What grows over it: moss (damp: green, over the joints and the rim) or lichen and dry grass (open: pale, patchy). */
  growth: "moss" | "lichen"; cover: number;
  /** Puddles in the missing slabs and the low places. */
  wet: boolean;
}

const STONE = {
  limestone: [0.6, 0.58, 0.52] as RGB,
  granite: [0.42, 0.45, 0.42] as RGB,
  slate: [0.26, 0.28, 0.31] as RGB,
  redSandstone: [0.55, 0.38, 0.3] as RGB,
  buffSandstone: [0.56, 0.49, 0.37] as RGB,
};
const DEBRIS: Record<string, [RGB, DebrisShape]> = {
  leaves: [[0.5, 0.3, 0.15], 0], darkLeaves: [[0.32, 0.22, 0.13], 0], birch: [[0.66, 0.56, 0.2], 0],
  needles: [[0.45, 0.28, 0.14], 1], reeds: [[0.48, 0.44, 0.26], 1], grass: [[0.5, 0.48, 0.25], 1],
  pebbles: [[0.55, 0.55, 0.52], 2], heather: [[0.47, 0.26, 0.44], 3], bluebells: [[0.32, 0.34, 0.66], 3], flowers: [[0.75, 0.66, 0.32], 3],
};
const look = (stone: keyof typeof STONE, debris: keyof typeof DEBRIS, growth: "moss" | "lichen", cover: number, wet = false, litter = 0.5): FloorLook =>
  ({ stone: STONE[stone], debris: DEBRIS[debris][0], shape: DEBRIS[debris][1], litter, growth, cover, wet });

/** By area type: its stone, debris and growth. */
export const FLOOR_LOOKS: Record<string, FloorLook> = {
  "moor": look("granite", "heather", "lichen", 0.5, true),
  "fern-forest": look("granite", "needles", "moss", 0.55),
  "muddy-forest": look("buffSandstone", "leaves", "moss", 0.6, true, 0.6),
  "stone-shrine": look("limestone", "pebbles", "lichen", 0.4),
  "tangly-forest": look("granite", "darkLeaves", "moss", 0.62),
  "wispy-forest": look("limestone", "leaves", "lichen", 0.5, false, 0.65),
  "hazel-forest": look("limestone", "leaves", "moss", 0.5),
  "garden": look("limestone", "flowers", "lichen", 0.4, false, 0.35),
  "twiggy-forest": look("granite", "leaves", "moss", 0.5),
  "ancient": look("granite", "darkLeaves", "moss", 0.72),
  "norway": look("slate", "needles", "moss", 0.55, false, 0.6),
  "alder-forest": look("granite", "grass", "moss", 0.6, true),
  "meadow": look("limestone", "flowers", "lichen", 0.45, false, 0.45),
  "old-oaks": look("buffSandstone", "leaves", "moss", 0.6, false, 0.6),
  "berry-thicket": look("redSandstone", "needles", "lichen", 0.5),
  "wetland": look("granite", "reeds", "moss", 0.66, true),
  "stream": look("limestone", "pebbles", "moss", 0.5, true),
  "rocky-slope": look("slate", "pebbles", "lichen", 0.4),
  "bog": look("granite", "reeds", "moss", 0.75, true, 0.35),
  "deadwood": look("buffSandstone", "darkLeaves", "lichen", 0.45, false, 0.6),
  "cave-mouth": look("slate", "pebbles", "moss", 0.55),
  "grassland": look("limestone", "grass", "lichen", 0.5),
  "beaver-pond": look("limestone", "birch", "moss", 0.55, true, 0.6),
  "log-pile": look("buffSandstone", "leaves", "moss", 0.6, false, 0.65),
  "heath": look("redSandstone", "heather", "lichen", 0.45),
  "old-pinewood": look("redSandstone", "needles", "moss", 0.55, false, 0.65),
  "ravine": look("slate", "pebbles", "moss", 0.65, true),
  "bluebell-glade": look("limestone", "bluebells", "moss", 0.5),
  "holly-thicket": look("slate", "darkLeaves", "moss", 0.55),
  "honeysuckle-tangle": look("limestone", "flowers", "lichen", 0.5),
  "fen": look("granite", "reeds", "moss", 0.65, true),
  "heronry": look("granite", "reeds", "lichen", 0.55, true),
};
/** Any area not hand-tuned: weathered granite, leaf litter, moss. */
export const FALLBACK_LOOK: FloorLook = look("granite", "leaves", "moss", 0.5);

export const floorLook = (areaId: string): FloorLook => FLOOR_LOOKS[areaId] ?? FALLBACK_LOOK;
