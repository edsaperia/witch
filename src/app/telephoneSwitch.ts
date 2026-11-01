import { HOUSE_ROOMS, type HouseUse } from "../rules/houseRooms";
import boudoir from "../../config/house/rooms/boudoir.json";

/** Canonical6552743521: unfinished calls are visible only on an explicitly opted-in proof page. */
export const telephoneEnabled = (params: URLSearchParams): boolean => params.get("telephone") === "1";
/** Canonical1538-T: explicit two-client proof only; neither switch enables ordinary calls by default. */
export const telephoneCallsEnabled = (params: URLSearchParams): boolean => telephoneEnabled(params) && params.get("telephoneCalls") === "1";
const originalUse = boudoir.objects.find(o => o.id === "telephone")!.use as HouseUse;
/** Page boot, after the chosen house arrangement is installed. The authored default stays untouched. */
export function installTelephone(enabled: boolean): void {
  const phone = HOUSE_ROOMS.objects.find(o => o.id === "telephone"); if (!phone) return;
  if (enabled) { if (phone.use.kind !== "telephone") phone.use = { kind: "telephone" }; }
  else if (phone.use.kind === "telephone") phone.use = originalUse;
}
