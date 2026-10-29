// Her night's kit (Ed, 2026-10-26; docs/notes/house.md "Invitations and brooms"): her invitations, taken from the Parlour's desk, and a
// broom, taken from the Workshop's lathe, before she sets off. A night that waits for her party spell starts with neither: her
// invitations are a pile on the desk, one a witch, and three plain brooms wait at the lathe, one for each. One E at the desk and she
// has tonight's invitations (Ed: "just has them for the night, no ammo that runs out"); without them her 💌s and her Sentry hat's
// throw nothing. One E at the lathe and she has a broom; without one, stepping off the Terrace she falls (rules/witch.ts), a thud
// below, and comes back at the magic circle. A knockout keeps both; a new night puts them back. A night that never waits (the tools,
// the bots, `?creator=0`) has no kit: she has both, as before. She takes her invitations only once she carries a bag (Ed, 2026-10-29:
// "you can't pick up invitations until you're carrying a bag"; rules/bags.ts): without one the desk says so (NEED_BAG).
import type { Game, Witch } from "./game";

export interface Kit { invites: boolean; broom: boolean }

/** The brooms at the lathe, one a witch (Ed: "three basic brooms, one on the lathe, two resting nearby"). */
export const KIT_BROOMS = 3;

/** A new night's kit: nothing taken yet when the night waits for her party spell, else none (she has both). */
export const newKit = (waitsForSpell: boolean): Kit | undefined => (waitsForSpell ? { invites: false, broom: false } : undefined);

/** Has she her invitations (or no kit to want them)? */
export const hasInvites = (W: Pick<Witch, "kit">): boolean => !W.kit || W.kit.invites;
/** Has she a broom (or no kit to want one)? */
export const hasBroom = (W: Pick<Witch, "kit">): boolean => !W.kit || W.kit.broom;

/** The brooms still at the lathe. */
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

/** E at the lathe: a broom's hers, while one's left. Whether she took one. */
export function takeBroom(g: Pick<Game, "witches">, W: Witch): boolean {
  if (!W.kit || W.kit.broom || broomsLeft(g) <= 0) return false;
  W.kit.broom = true;
  return true;
}
