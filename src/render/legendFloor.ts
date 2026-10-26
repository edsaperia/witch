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
  "jungle-understory": look("limestone", "leaves", "moss", 0.65), // leaf litter and moss over pale stone (Norway's slate and needles till the roster)
  "alder-forest": look("granite", "grass", "moss", 0.6, true),
  "meadow": look("limestone", "flowers", "lichen", 0.45, false, 0.45),
  "old-oaks": look("buffSandstone", "leaves", "moss", 0.6, false, 0.6),
  "berry-thicket": look("redSandstone", "needles", "lichen", 0.5),
  "wetland": look("granite", "reeds", "moss", 0.66, true),
  "stream": look("limestone", "pebbles", "moss", 0.5, true),
  "rocky-slope": look("slate", "pebbles", "lichen", 0.4),
  "trollwood": look("granite", "needles", "moss", 0.45),
  "icefall": look("granite", "pebbles", "lichen", 0.35),
  "crags": look("slate", "pebbles", "lichen", 0.4),
  "bog": look("granite", "reeds", "moss", 0.75, true, 0.35),
  "deadwood": look("buffSandstone", "darkLeaves", "lichen", 0.45, false, 0.6),
  "jungle-cave": look("limestone", "pebbles", "moss", 0.65), // the cave's mossy limestone (the cave mouth's slate till the roster)
  "grassland": look("limestone", "grass", "lichen", 0.5),
  "beaver-pond": look("limestone", "birch", "moss", 0.55, true, 0.6),
  "log-pile": look("buffSandstone", "leaves", "moss", 0.6, false, 0.65),
  "heath": look("redSandstone", "heather", "lichen", 0.45),
  "old-pinewood": look("redSandstone", "needles", "moss", 0.55, false, 0.65),
  "ravine": look("slate", "pebbles", "moss", 0.65, true),
  "bluebell-glade": look("limestone", "bluebells", "moss", 0.5),
  "thorn-scrub": look("buffSandstone", "pebbles", "lichen", 0.3), // dry red earth, thorny litter (the holly thicket's till the roster)
  "honeysuckle-tangle": look("limestone", "flowers", "lichen", 0.5),
  "mossy-dell": look("granite", "leaves", "moss", 0.7, false, 0.6),
  "misty-terraces": look("granite", "needles", "moss", 0.6, false, 0.5),
  "fen": look("granite", "reeds", "moss", 0.65, true),
  "moonpool-glade": look("granite", "reeds", "moss", 0.6, true),
  "snowfield": look("granite", "needles", "lichen", 0.4),
  "bamboo-jungle": look("limestone", "leaves", "moss", 0.6), // old shrine stone, bamboo litter over it
  "river-jungle": look("granite", "darkLeaves", "moss", 0.75, true), // dark wet stone by the river, moss over it
  "temple-jungle": look("redSandstone", "darkLeaves", "moss", 0.7), // temple flagstones, red earth and roots over them
  "heronry": look("granite", "reeds", "lichen", 0.55, true),
  "cactus-flats": look("buffSandstone", "pebbles", "lichen", 0.25), // pale sandstone, drifted over
  "red-canyon": look("buffSandstone", "pebbles", "lichen", 0.35), // red rock, scree over it
  "mangrove-pools": look("granite", "reeds", "moss", 0.6, true), // dark wet stone among the roots,
  "mudflat": look("granite", "pebbles", "lichen", 0.5, true), // mud-washed stone, barnacled,
  "mangrove": look("buffSandstone", "reeds", "moss", 0.6, true, 0.6),
  "eyrie": look("buffSandstone", "pebbles", "lichen", 0.45), // wind-scoured stone, feathers in the cracks
  "frostcave": look("slate", "pebbles", "lichen", 0.4, true), // blue-grey slate under the ice
  "bushveld": look("redSandstone", "grass", "lichen", 0.4), // baked red stone, dry grass and thorns blown over it
  "drowned-wood": look("slate", "reeds", "moss", 0.6, true, 0.6), // black wet stone, reeds and moss in still dark water
  "packice": look("slate", "pebbles", "lichen", 0.25, true), // dark slate, rimed and puddled with meltwater
  "plains": look("redSandstone", "grass", "lichen", 0.35), // red earth and short grass
  "savanna": look("redSandstone", "grass", "lichen", 0.45), // sun-baked sandstone, the long grass over it
  "erg": look("buffSandstone", "pebbles", "lichen", 0.3), // sand-scoured sandstone, drifted over
};
/** Any area not hand-tuned: weathered granite, leaf litter, moss. */
export const FALLBACK_LOOK: FloorLook = look("granite", "leaves", "moss", 0.5);

export const floorLook = (areaId: string): FloorLook => FLOOR_LOOKS[areaId] ?? FALLBACK_LOOK;
