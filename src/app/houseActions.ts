import type { LeashEvent } from "../rules/leash";
/** Ordinary actions are local; the all-in-bed verdict ends the shared night for both pages. */
export const localHouseAction = (event: Pick<LeashEvent, "id"> & Partial<Pick<LeashEvent, "kind" | "obj">>, player: number | null): boolean =>
  player === null || event.id === player || event.kind === "house" && event.obj === "slept";
