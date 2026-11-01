// Last night's clothes (Ed, 2026-10-23: "When waking up she wears only a nightie; last night's clothes are in a pile on the floor
// (pick all up with x/e)"): on every wake-up she's in her nightie, her outfit in a pile by her bed, piece by piece. E at the pile
// puts on whatever's still in it. A dressing station before then puts its own piece on her (Ed: "Changing her look at the station
// puts that item on her; the pile then doesn't have it (e.g. if she puts on a top via the menu, the pile then puts on everything else
// except yesterday's top)"). She's dressed when the pile's empty; dressed or not, the bedroom's door lets her out once she's up (Ed,
// 2026-10-25: "I should be able to leave regardless"; rules/wakeUp.ts), and a hat she picks up off the hats' floor meanwhile is on her
// head, out of the pile (rules/game.ts).
// Rules only: how she's drawn meanwhile is `wornGenome` (her look with what's still in the pile taken off), which the page shows.
import { WITCH_GENOME } from "../../art/witchGenome.js";

/** A piece of her outfit, as it lies in the pile: her top (the jacket, top and jeans), her shoes, her cloak (and scarf), her hat, and
 *  her bits (headphones, glasses, bags and the rest she wears). */
export type PileSlot = "top" | "shoes" | "cloak" | "hat" | "bits";
/** Every piece, as the pile starts each wake-up. */
export const PILE_SLOTS: readonly PileSlot[] = ["top", "shoes", "cloak", "hat", "bits"];

/** The piece each dressing station puts on (config/house/'s station ids). The dressing table (her hair, skin, face, earrings)
 *  dresses nothing: those are hers in the nightie too. */
export const STATION_SLOT: Readonly<Record<string, PileSlot>> = { wardrobe: "top", bedroom2Wardrobe: "top", bedroom3Wardrobe: "top", shoeRack: "shoes", cloakPegs: "cloak", bags: "bits" };

/** She's dressed: nothing of last night's left in the pile (an old wake-up, with no pile, counts as dressed). */
export const dressed = (w: { pile?: PileSlot[] } | null | undefined): boolean => !w?.pile?.length;
/** Last night's clothes lie by her bed, to put on with E: only after a night played in this game (Ed, 2026-10-26: "if it's the
 *  first night, there won't be any last night's clothes"; "the hat she wore yesterday should be in the clothes pile - but on the
 *  first, there was no yesterday": rules/wakeUp.ts `yesterday`). On a game's first morning she's in her nightie all the same, `pile`
 *  the pieces still to put on, each at its station (her guidance pins lead her round them: rules/guidance.ts), her hat on the hats'
 *  floor. */
export const pileOut = (w: { pile?: PileSlot[]; yesterday?: boolean } | null | undefined): boolean => !!w?.yesterday && !dressed(w);

/** A station's choice before she's dressed: its piece goes on her, out of the pile. True when the pile changed. */
export function wearFromStation(w: { pile?: PileSlot[] }, station: string): boolean {
  const slot = STATION_SLOT[station];
  return !!slot && wearPiece(w, slot);
}
/** A piece put on her before she's dressed (a station's, or a hat picked up): out of the pile. True when the pile changed. */
export function wearPiece(w: { pile?: PileSlot[] }, slot: PileSlot): boolean {
  if (!w.pile?.includes(slot)) return false;
  w.pile = w.pile.filter(s => s !== slot);
  return true;
}

/** Her genome's shape as far as the pile cares (art/witchGenome.js; anything else on it is kept as it is). */
interface Genome { hat?: { shape?: string }; cloak?: string; backpackSize?: number; accessories?: Record<string, unknown> }

/** Her accessories that lie in the pile as her bits (the earrings stay on: the dressing table's, hers in the nightie too). */
const BITS = ["phones", "shades", "glowsticks", "satchel", "pendant", "lantern", "vial", "book", "bumbag", "purse", "tote", "duffel", "briefcase", "clutch", "messenger", "wristband"];

/** Her look with what's still in the pile taken off (the nightie for her top, bare feet for her shoes, and no cloak, scarf, hat or
 *  bits), for the page to draw her by; `pile` empty, her genome as it is. A null genome (the classic witch) is hers, art/witchGenome.js WITCH_GENOME. */
export function wornGenome<G extends Genome | null>(g: G, pile: readonly PileSlot[] | undefined): G {
  if (!pile?.length) return g;
  const base = (g ?? WITCH_GENOME) as Genome, acc: Record<string, unknown> = { ...(base.accessories ?? {}) }, has = (s: PileSlot) => pile.includes(s);
  if (has("top")) acc.nightie = true;
  if (has("shoes")) { acc.barefoot = true; acc.chunky = false; }
  if (has("cloak")) { acc.scarf = false; acc.patches = false; }
  if (has("bits")) for (const k of BITS) acc[k] = false;
  return { ...base, accessories: acc, ...(has("hat") ? { hat: { ...(base.hat ?? {}), shape: "none" } } : {}), ...(has("cloak") ? { cloak: "none" } : {}), ...(has("bits") ? { backpackSize: 0 } : {}) } as G;
}
