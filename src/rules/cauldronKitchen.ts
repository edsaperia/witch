import { addIngredient, depositMushrooms, type CauldronInventory, type MushroomKind, type Recipe } from "./cauldron";

export interface KitchenBrew {
  recipe: Recipe;
  elapsed: number;
  recipients: number[];
}

/** Isolated kitchen sequence; callers choose inventory ownership, room geometry and rendering. */
export interface CauldronKitchen {
  occupants: number[];
  brew: KitchenBrew | null;
}

export type KitchenEvent =
  | { kind: "deposited" }
  | { kind: "ingredient"; mushroom: MushroomKind }
  | { kind: "brewing"; recipe: Recipe; recipients: number[] }
  | { kind: "exit"; recipe: Recipe; recipients: number[] };

export function newCauldronKitchen(): CauldronKitchen {
  return { occupants: [], brew: null };
}

/** Call on crossing into the kitchen, not on every frame spent in it. */
export function enterKitchen(kitchen: CauldronKitchen, inventory: CauldronInventory, witch = 0): KitchenEvent[] {
  if (kitchen.occupants.includes(witch)) return [];
  kitchen.occupants.push(witch);
  kitchen.occupants.sort((a, b) => a - b);
  depositMushrooms(inventory);
  return [{ kind: "deposited" }];
}

/** Room tracking only; inventory ownership and persistence remain the host's responsibility. */
export function leaveKitchen(kitchen: CauldronKitchen, witch = 0): void {
  kitchen.occupants = kitchen.occupants.filter(id => id !== witch);
}

/** One use edge at the nearby basket; the host owns proximity and input debouncing. */
export function useKitchenBasket(kitchen: CauldronKitchen, inventory: CauldronInventory, mushroom: MushroomKind, witch = 0): KitchenEvent[] {
  if (!kitchen.occupants.includes(witch) || kitchen.brew || inventory.baskets[mushroom] === 0) return [];
  const recipe = addIngredient(inventory, mushroom);
  const events: KitchenEvent[] = [{ kind: "ingredient", mushroom }];
  if (recipe) {
    // Coordinator ruling, 2026-10-30 (#1472 comment6512476115): snapshot at the third
    // ingredient. Entering/leaving during the smoke cannot change who takes the trip.
    const recipients = [...kitchen.occupants];
    kitchen.brew = { recipe, elapsed: 0, recipients };
    events.push({ kind: "brewing", recipe, recipients: [...recipients] });
  }
  return events;
}

/** Advance on her simulation clock, not slowed world time or wall time. */
export function stepKitchen(kitchen: CauldronKitchen, dt: number): KitchenEvent[] {
  if (!Number.isFinite(dt) || dt < 0) throw new RangeError("Invalid kitchen timestep");
  if (!kitchen.brew) return [];
  kitchen.brew.elapsed += dt;
  // Ed, 2026-10-09/10: smoke fills the room and a second later she staggers outside.
  if (kitchen.brew.elapsed < 1 - 1e-9) return [];
  const recipe = kitchen.brew.recipe;
  const recipients = [...kitchen.brew.recipients];
  kitchen.brew = null;
  kitchen.occupants = kitchen.occupants.filter(id => !recipients.includes(id));
  return [{ kind: "exit", recipe, recipients }];
}
