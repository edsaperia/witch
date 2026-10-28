// Guidance pins (Ed, 2026-10-26: "Pointers: let's work out what they help with and build it"; his list, approved the same day):
// the house showing her what to do next, one pin at a time, icons only, no words (render/view/guidance.ts draws it with
// render/pins.ts). What each pin is for, highest first:
//   1. after a night, lost or won (once its finale's settled): the map table while there's an island found she can sail to and
//      hasn't been to, else the bed (both shown from anywhere: they lead her home; Ed, 2026-10-26: "No 💤 if there are new
//      islands, just 🧭 towards islands the player can go to and hasn't visited yet");
//   2. a game's first morning (no pile of last night's clothes: rules/wakeUp.ts yesterday): the dressing stations, the first whose
//      piece she still has to put on (the wardrobe first; her hat on the hats' floor), until she's dressed (Ed: "if it's the first
//      night, there won't be any last night's clothes"; with a pile, E there dresses her, and there's no dressing pin);
//   3. every night, before the party: the invitations desk, then the lathe (her broom), each until it's done tonight (her night's
//      kit, rules/kit.ts, through GUIDANCE_HOOKS; a night with no kit, the tools' and the bots', has both, so those pins never show);
//   4. something new in the treehouse (a find), each until she's been to where it is, newest first;
//   5. the decks, until the party spell's cast.
// The map table's 🧭 is never shown during the night, only once it's over (Ed, 2026-10-26: "you only see 🧭 when the party is over
// or if the night is won, and there are islands you haven't visited yet. You don't see it all night").
// The party's own pointers (render/view/hud.ts) are unchanged. The pin shows wherever she is (Ed, 2026-10-28: "Whatever pin you had
// before leaving the treehouse still shows"), off screen at the edge pointing the way as every pin does (render/pins.ts); and at its
// target it stays, over the object pointing down at it (Ed: "The pin should no longer hide but point downwards at the object"). Each
// witch has her own: guidanceOf is per witch, from the night and what her browser keeps (GuideSave, app/guideSave.ts).
// Rules only: no three.js.
import type { Game } from "./game";
import { dressed, pileOut, type PileSlot } from "./clothesPile";
import { deckOf } from "./treehouse";
import { hasRooms, objectAt } from "./houseRooms";
import { hasBroom, hasInvites } from "./kit";

/** What a guidance pin is for (render/view/guidance.ts gives each its glyph). */
export type GuideKind = "bed" | "dress" | "desk" | "lathe" | "hat" | "part" | "wearable" | "chart" | "decks";

/** Where it points: a house object (config/house/) or a point in the world (the decks' seat, on the house's floor). */
export type GuideTarget = { object: string } | { x: number; z: number };

export interface Guide { kind: GuideKind; target: GuideTarget }

/** Something new in the treehouse she hasn't been to: a find's kind and the object it's at. */
export interface NewThing { kind: "hat" | "part" | "wearable"; id: string; at: string }

/** What her browser keeps for guidance (app/guideSave.ts): the new things she hasn't been to (oldest first). */
export interface GuideSave { unseen: NewThing[] }

export const emptyGuide = (): GuideSave => ({ unseen: [] });

/** The pickups the getting-ready steps wait on: her night's kit (rules/kit.ts), tonight's invitations taken from the desk and her
 *  broom taken off the lathe. */
export const GUIDANCE_HOOKS = {
  invitationsReady: (g: Game, w: number): boolean => !g.witches[w] || hasInvites(g.witches[w]),
  broomTaken: (g: Game, w: number): boolean => !g.witches[w] || hasBroom(g.witches[w]),
};

/** The dressing stations in the order her first night's pin takes them, by the piece each puts on (rules/clothesPile.ts
 *  STATION_SLOT; her hat off the hats' floor). */
export const DRESS_ORDER: readonly [PileSlot, string][] = [["top", "wardrobe"], ["shoes", "shoeRack"], ["cloak", "cloakPegs"], ["bits", "bags"], ["hat", "hats"]];

/** How near the decks' seat she's at them (m): rules/wakeUp.ts atDecks's reach. */
const AT_DECKS = 2.5;

/** What's in front of her, `w`'s pin, or null (nothing to guide). `unvisited` the islands found she can sail to and hasn't been to
 *  (app/chartSave.ts unvisited). */
export function guidanceOf(g: Game, w: number, save: GuideSave, unvisited: readonly string[] = [], hooks = GUIDANCE_HOOKS): Guide | null {
  // The night over, lost (the afterparty) or won (its finale settled: rules/win.ts), home: the map table while there's an island
  // found she can sail to and hasn't been to (`unvisited`: app/chartSave.ts unvisited; Ed, 2026-10-26: "No 💤 if there are new
  // islands, just 🧭 towards islands the player can go to and hasn't visited yet"), even once she's looked at the chart; then the bed.
  if (nightOver(g)) return unvisited.length ? { kind: "chart", target: { object: "mapTable" } } : { kind: "bed", target: { object: "bed" } };
  const k = g.wake;
  if (!k?.open || g.party.spellAt !== null) return null; // (still in bed, or the party's on: the party's pointers guide her)
  if (!pileOut(k) && !dressed(k)) { // (no pile to put on at once: a game's first morning)
    const next = DRESS_ORDER.find(([slot]) => k.pile!.includes(slot));
    if (next) return { kind: "dress", target: { object: next[1] } };
  }
  if (!hooks.invitationsReady(g, w)) return { kind: "desk", target: { object: "invitations" } };
  if (!hooks.broomTaken(g, w)) return { kind: "lathe", target: { object: "lathe" } };
  const n = save.unseen[save.unseen.length - 1];
  if (n) return { kind: n.kind, target: { object: n.at } };
  const d = deckOf(g.map, g.tuning);
  const at = d?.house?.desk ?? d?.seat; // (over the decks' desk in the house; her seat behind it is where she's at them)
  return at ? { kind: "decks", target: { x: at.x, z: at.z } } : null;
}

/** Whether `w` is at a guide's target now (its tag up, the pin over it still: Ed, 2026-10-28). */
export function atGuide(g: Game, w: number, guide: Guide): boolean {
  const b = g.witches[w]?.body, d = deckOf(g.map, g.tuning);
  if (!b || !d) return false;
  const T = guide.target;
  if (!("object" in T)) return Math.hypot(b.x - d.seat.x, b.z - d.seat.z) <= AT_DECKS; // (the decks: at her seat)
  return !!b.perch && hasRooms(d) && objectAt(d, b.x, b.z)?.id === T.object;
}

/** The night's over: lost (the afterparty), or won and its finale settled (rules/win.ts settled): the pins lead her home from anywhere. */
const nightOver = (g: Game): boolean => !!g.partyOver || (g.win?.phase === "won" && !!g.win.settled);

/** Marks done what she's at: a new thing she's been to. True when the save changed. */
export function seeGuide(g: Game, w: number, save: GuideSave): boolean {
  const b = g.witches[w]?.body, d = deckOf(g.map, g.tuning);
  if (!b?.perch || !d || !hasRooms(d) || !save.unseen.length) return false;
  const here = objectAt(d, b.x, b.z)?.id;
  const left = save.unseen.filter(n => n.at !== here);
  if (left.length === save.unseen.length) return false;
  save.unseen = left;
  return true;
}
