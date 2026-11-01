import { roomAccessFor } from "../../rules/houseRooms";
/** Actual house-owner export, bound after the explicitly permitted1565 dependency merge. */
export interface GuestAccessHooks {
  roomAccessFor: typeof roomAccessFor;
}
export const guestAccess: GuestAccessHooks & { readonly ready: boolean } = { ready: true, roomAccessFor };
