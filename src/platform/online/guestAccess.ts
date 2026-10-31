import type { RoomFloor } from "../../rules/houseRooms";
/** Exact house-owner contract (6549185373 /1565). Bind actual export after its dependency lands. */
export interface GuestAccessHooks {
  roomAccessFor(floor: RoomFloor, player: number, assignment?: { player: number; room: string }): RoomFloor;
}
/** Local availability is separate from the house API; a passthrough stub never grants access. */
export const pendingGuestAccess: GuestAccessHooks & { readonly ready: boolean } = {
  ready: false,
  roomAccessFor: floor => floor,
};
