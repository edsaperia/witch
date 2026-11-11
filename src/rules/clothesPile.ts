// Last night's clothes (Ed, 2026-10-23: "When waking up she wears only a nightie; last night's clothes are in a pile on the floor
// (pick all up with x/e)"): on every wake-up she's in her nightie, her outfit in a pile by her bed, piece by piece. E at the pile
// puts on whatever's still in it. A dressing station before then puts its own piece on her (Ed: "Changing her look at the station
// puts that item on her; the pile then doesn't have it (e.g. if she puts on a top via the menu, the pile then puts on everything else
// except yesterday's top)"). She's dressed when the pile's empty; dressed or not, the bedroom's door lets her out once she's up (Ed,
// 2026-10-25: "I should be able to leave regardless"; rules/wakeUp.ts), and a hat she picks up off the hats' floor meanwhile is on her
// head, out of the pile (rules/game.ts).
// Rules only: how she's drawn meanwhile is `wornGenome` (her look with what's still in the pile taken off), which the page shows.
import { WITCH_GENOME } from "../../art/witchGenome.js";

/** A piece of her outfit, as it lies in the pile: her top (the jacket and top), her trousers (her jeans), her shoes, her cloak (and
 *  scarf), her hat, and her bits (headphones, glasses, bags and the rest she wears). Her trousers are their own piece since Ed's
 *  report, 2026-11-11: "When I go to the wardrobe and put top/jacket on, trousers are put on too" (the wardrobe holds only the
 *  Jacket and Top shelves; the Trousers shelf is the shoe rack's, config/wardrobe.json). */
export type PileSlot = "top" | "trousers" | "shoes" | "cloak" | "hat" | "bits";
/** Every piece, as the pile starts each wake-up. */
export const PILE_SLOTS: readonly PileSlot[] = ["top", "trousers", "shoes", "cloak", "hat", "bits"];

/** The piece each dressing station puts on (config/house/'s station ids) when its choice names no shelf of its own (SHELF_SLOT; an
 *  older online message, which named none). The dressing table (her hair, skin, face, earrings) dresses nothing: those are hers in
 *  the nightie too. */
export const STATION_SLOT: Readonly<Record<string, PileSlot>> = { wardrobe: "top", bedroom2Wardrobe: "top", bedroom3Wardrobe: "top", shoeRack: "shoes", bedroom2ShoeRack: "shoes", bedroom3ShoeRack: "shoes", cloakPegs: "cloak", bags: "bits" };
/** The piece a shelf's choice puts on, where it isn't its station's own (STATION_SLOT): the shoe rack holds the Trousers and the
 *  Shoes shelves (config/wardrobe.json), and puts on only what was chosen there (Ed, 2026-11-11: "When I go to the wardrobe and put
 *  top/jacket on, trousers are put on too"). */
export const SHELF_SLOT: Readonly<Record<string, PileSlot>> = { trousers: "trousers", shoes: "shoes" };
/** The piece a choice at `station` on its shelf `shelf` puts on: the shelf's own (SHELF_SLOT), else the station's (STATION_SLOT; a
 *  shelf with none of its own, e.g. the cloak pegs' scarf, or no shelf named); none at a station that dresses nothing. */
export const slotOf = (station: string, shelf?: string): PileSlot | undefined => {
  const own = STATION_SLOT[station];
  return own && shelf && Object.hasOwn(SHELF_SLOT, shelf) ? SHELF_SLOT[shelf] : own;
};
/** The shelves at `station` (their ids) whose piece is still in the pile `pile`, each with that piece, for its panel to show none of
 *  them worn till it's on (ui/stationChoice.ts awaitingDress): the wardrobe's Jacket and Top wait for her top together; at the shoe
 *  rack its Trousers and its Shoes each wait for their own. */
export const awaitingShelves = (pile: readonly PileSlot[] | undefined, station: string, shelves: readonly string[]): Record<string, PileSlot> => {
  const out: Record<string, PileSlot> = {};
  for (const id of shelves) { const slot = slotOf(station, id); if (slot && pile?.includes(slot)) out[id] = slot; }
  return out;
};
/** A station's home namesake: a guests' bedroom's piece (`bedroom2Basin`) holds what the home's (`basin`) does (Ed, 2026-11-07: "their
 *  wardrobe becomes a wardrobe rail (jacket, top), and their dressing table holds hair, sunglasses and earrings"; "Guests need basins
 *  and shoe racks"); the home's own id as it is. */
export const homeStation = (id: string): string => { const m = /^bedroom[23]([A-Z].*)$/.exec(id); return m ? m[1][0].toLowerCase() + m[1].slice(1) : id; };
export const isDressingTable = (id: string | undefined): boolean => !!id && homeStation(id) === "dressingTable";
/** The basin, hers or a guest bedroom's (the first morning's first step: rules/guidance.ts FIRST_MORNING). */
export const isBasin = (id: string | undefined): boolean => !!id && homeStation(id) === "basin";

/** She's dressed: nothing of last night's left in the pile (an old wake-up, with no pile, counts as dressed). */
export const dressed = (w: { pile?: PileSlot[] } | null | undefined): boolean => !w?.pile?.length;
/** Last night's clothes lie by her bed, to put on with E: only after a night played in this game (Ed, 2026-10-26: "if it's the
 *  first night, there won't be any last night's clothes"; "the hat she wore yesterday should be in the clothes pile - but on the
 *  first, there was no yesterday": rules/wakeUp.ts `yesterday`). On a game's first morning she's in her nightie all the same, `pile`
 *  the pieces still to put on, each at its station (her guidance pins lead her round them: rules/guidance.ts), her hat on the hats'
 *  floor. */
export const pileOut = (w: { pile?: PileSlot[]; yesterday?: boolean } | null | undefined): boolean => !!w?.yesterday && !dressed(w);

/** A station's choice before she's dressed: its piece goes on her, out of the pile (the piece of the shelf it was chosen on,
 *  `shelf`: slotOf). True when the pile changed. */
export function wearFromStation(w: { pile?: PileSlot[] }, station: string, shelf?: string): boolean {
  const slot = slotOf(station, shelf);
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

/** Her look with what's still in the pile taken off (the nightie for her top and trousers, bare feet for her shoes, and no cloak,
 *  scarf, hat or bits), for the page to draw her by; `pile` empty, her genome as it is. A null genome (the classic witch) is hers, art/witchGenome.js WITCH_GENOME.
 *  `hatLying`: her hat lies somewhere (rules/hat.ts down: a game's first morning's on the hats' floor, rules/wakeUp.ts hatOnFloor), so it
 *  keeps its shape: she's drawn without it all the same (her hat-off frames), and those frames' hat lying on the floor is drawn from it
 *  (render/assets.ts witchHatFrame; with the shape "none" there was no hat to draw: Ed's playtest of v7061, "hat has not appeared"). */
export function wornGenome<G extends Genome | null>(g: G, pile: readonly PileSlot[] | undefined, hatLying = false): G {
  if (!pile?.length) return g;
  const base = (g ?? WITCH_GENOME) as Genome, acc: Record<string, unknown> = { ...(base.accessories ?? {}) }, has = (s: PileSlot) => pile.includes(s) && !(s === "hat" && hatLying);
  // Her nightie in halves (Ed, 2026-11-11, the wardrobe's top putting her trousers on too): both still in the pile, `nightie` (the
  // whole chemise, bare arms and legs: art/witch.js footModel); her top only, `nightieTop` (the chemise over her jeans); her trousers
  // only, `nightieSkirt` (her top pulled on over it, its skirt over her bare legs). One of the three at most.
  const top = has("top"), legs = has("trousers");
  if (top && legs) acc.nightie = true; else if (top) acc.nightieTop = true; else if (legs) acc.nightieSkirt = true;
  if (has("shoes")) { acc.barefoot = true; acc.chunky = false; }
  if (has("cloak")) { acc.scarf = false; acc.patches = false; }
  if (has("bits")) for (const k of BITS) acc[k] = false;
  return { ...base, accessories: acc, ...(has("hat") ? { hat: { ...(base.hat ?? {}), shape: "none" } } : {}), ...(has("cloak") ? { cloak: "none" } : {}), ...(has("bits") ? { backpackSize: 0 } : {}) } as G;
}

/** What of her outfit is off as the page draws her (main.ts showLook, for wornGenome): a wake-up's pile, her hat lying somewhere while
 *  it's still to put on; before a game's first morning has started, `ahead`, that morning as it will start (rules/wakeUp.ts
 *  firstMorning: the boot's, asleep under the loading screen), so the look her art is made in at the boot is the one she wakes in. */
export function wornNow(wake: { pile?: readonly PileSlot[] } | undefined, hatDown: boolean, ahead?: { pile: readonly PileSlot[]; hatLying: boolean } | null): { pile: readonly PileSlot[] | undefined; hatLying: boolean } {
  if (!wake && ahead) return { pile: ahead.pile, hatLying: ahead.hatLying };
  const pile = wake?.pile;
  return { pile, hatLying: !!pile?.includes("hat") && hatDown };
}
