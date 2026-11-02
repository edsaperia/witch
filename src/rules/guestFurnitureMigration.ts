/** Catalogue migration v1, Ed's ruling 1609#6557564092 (2026-11-01).
 * Published layout files keep their original IDs and bytes; only loaded objects change.
 * The replacement inherits the chest's authored pose and horizontal footprint.
 */
export const guestFurnitureMigration = {
  version: 1,
  replacements: { bedroom2Chest: "bedroom2DressingTable", bedroom3Chest: "bedroom3DressingTable" },
} as const;
export const migratedGuestFurnitureId = (id: string): string =>
  guestFurnitureMigration.replacements[id as keyof typeof guestFurnitureMigration.replacements] ?? id;
export const publishedGuestFurnitureId = (id: string): string =>
  Object.entries(guestFurnitureMigration.replacements).find(([, replacement]) => replacement === id)?.[0] ?? id;
