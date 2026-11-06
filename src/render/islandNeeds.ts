// The island's own art, made under the loading screen (Ed, 2026-11-05: "Load the trees, creature art, and coast and lakes, during the
// loading screen."): what render/view.ts prepare asks for and waits for before the screen fades, so nothing on the island pops in
// after it: every area type's trees, every look its creatures can wear tonight but their faces, and the coast's and the lakes'
// dressing (Ed, 2026-11-05: "Skip the animal faces": asked for in the background as the screen fades, askIslandFaces). Only this
// island's: its area types' kinds, its legends and its challenge circle's pack (rules/challenge.ts packKinds), never another
// island's or every species' (Ed's log, 2026-10-14: the workers baking all sixty species starved the audio for minutes of play).
import { AREA_TYPES, type ForestMap } from "../rules/map";
import { packKinds } from "../rules/challenge";
import { LEGEND, type Level } from "../rules/creatureLevels";
import { glideOf } from "../rules/movement";
import { characterOf } from "./character";
import { hasOverride } from "./overrides";
import type { StumpSpec } from "../rules/stumps";

/** The faces drawn as sets of their own (render/looks.ts expression: neutral is the plain look). Not waited for (Ed, 2026-11-05: "Skip
 *  the animal faces"): till one's in, render/view/creatures.ts draws the plain look (the rig its own head piece's face). */
export const ISLAND_FACES = ["angry", "happy", "dazed", "bite", "yawn"] as const;
/** The levels a wild creature of the island's kinds is drawn at (baby to adult); a legend's is LEGEND. */
const WILD_LEVELS: readonly Level[] = [0, 1, 2];

/** This island's: its area types nearest first (prepare's `near`: each type by its nearest area), the kinds whose creatures can be
 *  on it tonight, and its legends' kinds. */
export interface IslandNeeds { types: number[]; kinds: string[]; legends: string[] }

export function islandNeeds(map: ForestMap, near: ReadonlyMap<number, number>): IslandNeeds {
  const types = [...near].sort((a, b) => a[1] - b[1]).map(([t]) => t), legends = [...new Set(map.legendKinds)], kinds = new Set<string>();
  for (const t of types) { const sp = AREA_TYPES[t]?.creature; if (sp) kinds.add(sp); }
  for (const sp of legends) kinds.add(sp);
  if (map.specialSites.some(s => s.kind === "challenge")) for (const sp of packKinds(map)) kinds.add(sp); // (its statues, and the pack they wake as)
  return { types, kinds: [...kinds], legends };
}

/** What askIslandArt asks of the art (render/assets.ts AssetLibrary): each asks for its set if it isn't held; `urgent` false: in
 *  the order asked, behind what's asked already (the ask ahead keeps its order: none of it jumps the queue). */
export interface IslandArtAsks {
  prefetchType(t: number): void;
  creatureArt(sp: string): unknown; wokenArt(sp: string): unknown; napArt(sp: string): unknown; faceArt(sp: string, face: string): unknown;
  idleArt(sp: string): unknown; glideArt(sp: string): unknown; sleepArt(sp: string): unknown; rigArt(sp: string, level: number, gear?: undefined, urgent?: boolean): unknown;
  beachEdgeArt(urgent?: boolean): unknown; beachArt(urgent?: boolean): unknown; lakeShoreArt(urgent?: boolean): unknown; partyWitchArt(seed: number | null, urgent?: boolean): unknown;
  stumpArt(spec: StumpSpec, urgent?: boolean): unknown; partyObjectArt(): unknown; decorArt(): unknown; pathPieceArt(): unknown;
}
/** How the island's drawn: a legend asleep as its nap (wildLegends.seen.nap) or its mound (sleepArt); a coast (and its decorations
 *  on); lakes; its areas' great stumps (render/markers.ts stumpDeal: none with the rune stones); `dive`: a sail's, under its dive, the
 *  decorations and the path pieces asked ahead too (else when they may be on screen: render/view/scenery.ts). */
export interface IslandLooks { legendNap: boolean; coast: boolean; beachDecor: boolean; lakes: boolean; stumps?: readonly StumpSpec[]; dive?: boolean }

/** The order the island's art is asked for (Ed, 2026-11-06, the dive: "Coast (waves, sand) is urgent because we cross it first but
 *  coast decorations (starfish) are tiny and can wait. Campfires are nice to see, as are stumps."). Ahead of all of it, the start's own
 *  (the house, her, the soundsystems and the props, the campfires among them: render/assets.ts `home`); the coast's sand and waves are
 *  the ground's program, made at the top of prepare (Ground.coastAhead). */
export const ART_ORDER = [
  "palms", // the coast's palms and shrubs: big, and the first land the dive crosses
  "trees", // each area type's, in `n.types`' order (a sail's: by their share of the dive's view, rules/arrive.ts diveShare)
  "stumps", // the areas' great stumps, and the party's campfires (the old fires and the magic stones came with the props)
  "creatures", // each kind's plain look
  "legends", // the sleeping legends
  "coast", // the beach's decorations (shells, starfish), her lying-down art
  "lakes", // the lakes' shore dressing
  "looks", // every other look the kinds can wear: woken, asleep, idle, gliding, their rig pages
  "decor", // the decorations and the path pieces (a dive's only: else as they come into view)
] as const;

/** Ask for everything `n` can show (render/view/creatures.ts's looks, the rig's pages, the coast's and lakes' dressing), in ART_ORDER,
 *  none of it urgent. Not the faces (askIslandFaces), a party animal's own outfit (by its id, once it's invited) or a stilted rig. */
export function askIslandArt(a: IslandArtAsks, n: IslandNeeds, o: IslandLooks): void {
  for (const step of ART_ORDER) switch (step) {
    case "palms": if (o.coast) a.beachEdgeArt(false); break;
    case "trees": for (const t of n.types) a.prefetchType(t); break;
    case "stumps": for (const s of o.stumps ?? []) a.stumpArt(s, false); a.partyObjectArt(); break;
    case "creatures": for (const sp of n.kinds) a.creatureArt(sp); break;
    case "legends": for (const sp of n.legends) if (o.legendNap) a.napArt(sp); else a.sleepArt(sp); break;
    case "coast": if (o.coast) { if (o.beachDecor) a.beachArt(false); a.partyWitchArt(null, false); } break; // (her lying-down art: render/beach.ts)
    case "lakes": if (o.lakes) a.lakeShoreArt(false); break;
    case "looks":
      for (const sp of n.kinds) {
        a.wokenArt(sp); a.napArt(sp);
        const q = characterOf(sp).quirk;
        if (q === "sentinel" || q === "rattle") a.idleArt(sp); // (its idle pose: render/view/creatures.ts)
        if (glideOf(sp)) a.glideArt(sp);
        for (const level of WILD_LEVELS) if (!hasOverride(sp, level)) a.rigArt(sp, level, undefined, false); // (only the four-legged and the snakes have rig pages: rigArt asks for no other)
      }
      for (const sp of n.legends) if (!hasOverride(sp, LEGEND)) a.rigArt(sp, LEGEND, undefined, false);
      break;
    case "decor": if (o.dive) { a.decorArt(); a.pathPieceArt(); } break;
  }
}
/** The island's kinds' faces, asked for in the background (not waited for): as the loading screen fades, or with a sail's dive. With
 *  the faces off (tuning looks.expressions: off for now, #1860), faceArt asks for nothing. */
export function askIslandFaces(a: Pick<IslandArtAsks, "faceArt">, n: IslandNeeds): void {
  for (const sp of n.kinds) for (const face of ISLAND_FACES) a.faceArt(sp, face);
}
