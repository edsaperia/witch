import type { LeashEvent } from "../rules/leash";
/** Solo retains its original events; an online page responds only to its assigned witch's house actions. */
export const localHouseAction = (event: Pick<LeashEvent, "id">, player: number | null): boolean => player === null || event.id === player;
