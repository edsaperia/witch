import { fillTrunk } from "../rules/finds";

/** Only the host chooses the shared night's find, using its own collections. Guests await the ordered checkpoint. */
export function fillNightTrunk(game: Parameters<typeof fillTrunk>[0], role: "solo" | "host" | "guest", found: () => Parameters<typeof fillTrunk>[1], changed: () => void): boolean {
  if (role === "guest" || !game.trunk || game.trunk.item !== null) return false;
  fillTrunk(game, found());
  if (role === "host") changed();
  return true;
}
