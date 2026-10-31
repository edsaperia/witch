import type { Game } from "../../rules/game";
import { BAGS, setBag } from "../../rules/bags";
import { partById, type Fitted } from "../../rules/broomParts";
import { changeLoadout } from "../../rules/hatSpells";
import { hatSpell, setParts } from "../../rules/spells";
import { STATION_SLOT, wearFromStation } from "../../rules/clothesPile";
import { wakeOf } from "../../rules/wakeUp";

/** Data requests only: no player ID, callbacks, tuning, inventory or replacement world from a visitor. */
export type StationChoice = { kind: "bag"; id: string } | { kind: "hat"; id: string } | { kind: "broom"; fitted: Fitted } | { kind: "dress"; station: string };
const fields = (value: Record<string, unknown>, names: string[]) => Object.keys(value).length === names.length && names.every(name => Object.hasOwn(value, name));
export function stationChoice(value: unknown): StationChoice | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const c = value as Record<string, unknown>;
  if (c.kind === "bag" && fields(c, ["kind", "id"]) && typeof c.id === "string" && (c.id === "" || BAGS.some(b => b.id === c.id))) return { kind: "bag", id: c.id };
  if (c.kind === "hat" && fields(c, ["kind", "id"]) && typeof c.id === "string" && (c.id === "none" || hatSpell(c.id)?.built)) return { kind: "hat", id: c.id };
  if (c.kind === "dress" && fields(c, ["kind", "station"]) && typeof c.station === "string" && Object.hasOwn(STATION_SLOT, c.station)) return { kind: "dress", station: c.station };
  if (c.kind === "broom" && fields(c, ["kind", "fitted"]) && c.fitted && typeof c.fitted === "object" && !Array.isArray(c.fitted)) {
    const fitted = c.fitted as Record<string, unknown>, slots = ["tip", "chassis", "exhaust"] as const;
    if (fields(fitted, [...slots]) && slots.every(slot => fitted[slot] === null || typeof fitted[slot] === "string" && partById(fitted[slot] as string)?.slot === slot)) return { kind: "broom", fitted: { tip: fitted.tip as string | null, chassis: fitted.chassis as string | null, exhaust: fitted.exhaust as string | null } };
  }
  return null;
}

/** Deterministic rules effect only, after host approval. No browser storage or avatar artwork writes. */
export function applyStationChoice(game: Game, player: 0 | 1, choice: StationChoice): boolean {
  const witch = game.witches[player]; if (!witch || witch.id !== player) return false;
  if (choice.kind === "bag") setBag(witch.spells, choice.id);
  else if (choice.kind === "hat") changeLoadout(witch, choice.id);
  else if (choice.kind === "broom") {
    // Shared fitted parts cannot also be mounted on the other witch's broom.
    if (game.witches.some(other => other !== witch && Object.values(choice.fitted).some(id => id !== null && Object.values(other.spells.parts ?? {}).includes(id)))) return false;
    setParts(witch.spells, choice.fitted);
  } else {
    const wake = wakeOf(game, witch); if (!wake) return false;
    wearFromStation(wake, choice.station);
  }
  return true;
}
