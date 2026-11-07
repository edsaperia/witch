// Her night's kit (Ed, 2026-10-26; docs/notes/house.md "Invitations and brooms"): her invitations, taken from the Parlour's desk, and a
// broom, taken from the broom rack (Ed, 2026-11-07: "E takes her plain broom for the night. No menu, like the invitations desk. Move
// the night's broom pickup here from the lathe"), before she sets off. A night that waits for her party spell starts with neither: her
// invitations are a pile on the desk, one a witch, and three plain brooms wait on the rack, one for each. One E at the desk and she
// has tonight's invitations (Ed: "just has them for the night, no ammo that runs out"); without them her 💌s and her Sentry hat's
// throw nothing. One E at the rack and she has a broom; without one, stepping off the Terrace she falls (rules/witch.ts), a thud
// below, and comes back at the magic circle. A knockout keeps both; a new night puts them back. A night that never waits (the tools,
// the bots, `?creator=0`) has no kit: she has both, as before. She takes her invitations only once she carries a bag (Ed, 2026-10-29:
// "you can't pick up invitations until you're carrying a bag"; rules/bags.ts): without one the desk says so (NEED_BAG).
import type { Game, Witch } from "./game";
import { partById } from "./broomParts";

/** The broom's three modding stations (Ed, 2026-11-07: the workbench for its tip, the lathe for its chassis, the hydraulic lift for its
 *  exhaust): "The modding stations only light up and open while she is carrying her broom" (rules/guestFurniture.ts furnitureFor). */
export const BROOM_STATIONS: readonly string[] = ["broomBay", "lathe", "broomLift"];
/** Each slot's modding station: a part found waits at its slot's (its new 🎁 pin there: rules/guidance.ts). */
export const SLOT_STATION: Readonly<Record<"tip" | "chassis" | "exhaust", string>> = { tip: "broomBay", chassis: "lathe", exhaust: "broomLift" };
/** The modding station a broom part waits at (its slot's; the lathe for one not known). */
export const partStation = (id: string): string => { const p = partById(id); return p ? SLOT_STATION[p.slot] : "lathe"; };

export interface Kit { invites: boolean; broom: boolean }

/** The brooms on the rack, one a witch (Ed, 2026-10-26: "three basic brooms"; on the rack since Ed, 2026-11-07). */
export const KIT_BROOMS = 3;

/** A new night's kit: nothing taken yet when the night waits for her party spell, else none (she has both). */
export const newKit = (waitsForSpell: boolean): Kit | undefined => (waitsForSpell ? { invites: false, broom: false } : undefined);

/** Has she her invitations (or no kit to want them)? */
export const hasInvites = (W: Pick<Witch, "kit">): boolean => !W.kit || W.kit.invites;
/** Has she a broom (or no kit to want one)? */
export const hasBroom = (W: Pick<Witch, "kit">): boolean => !W.kit || W.kit.broom;

/** The brooms still on the rack. */
export const broomsLeft = (g: Pick<Game, "witches">): number => KIT_BROOMS - g.witches.filter(w => w.kit?.broom).length;

/** What the desk says when she has no bag to carry them in (Ed, 2026-10-29: "you can't pick up invitations until you're carrying a
 *  bag"; rules/bags.ts). */
export const NEED_BAG = "You need a bag to carry invitations";
/** Is she at the desk without a bag: her invitations still there and no bag on her (rules/bags.ts: her look's, spells.bag)? */
export const needsBag = (W: Pick<Witch, "kit" | "spells">): boolean => !!W.kit && !W.kit.invites && !W.spells.bag;
/** Does she carry a bag (or has no kit to want one)? */
export const hasBag = (W: Pick<Witch, "kit" | "spells">): boolean => !W.kit || W.kit.invites || !!W.spells.bag;

/** E at the invitations desk: her pile's hers, once she carries a bag to put them in. Whether she took them. */
export function takeInvites(W: Witch): boolean {
  if (!W.kit || W.kit.invites || needsBag(W)) return false;
  W.kit.invites = true;
  return true;
}

/** E at the broom rack: a broom's hers, while one's left. Whether she took one. */
export function takeBroom(g: Pick<Game, "witches">, W: Witch): boolean {
  if (!W.kit || W.kit.broom || broomsLeft(g) <= 0) return false;
  W.kit.broom = true;
  return true;
}
