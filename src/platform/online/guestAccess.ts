/** Provisional house-owner contract (6549097540). Unknown result until the actual additive export lands. */
export interface GuestAccessHooks { roomAccessFor(witchId: number, room: string): unknown }
/** Deliberately unavailable: never infer permission from a global room unlock or alter house geometry. */
export const pendingGuestAccess: GuestAccessHooks = { roomAccessFor: () => undefined };
