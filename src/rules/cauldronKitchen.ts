import { addIngredient, depositMushrooms, type CauldronInventory, type MushroomKind, type Recipe } from "./cauldron";

export interface KitchenBrew {
  recipe: Recipe;
  elapsed: number;
}

/** Isolated kitchen sequence; callers choose inventory ownership, room geometry and rendering. */
export interface CauldronKitchen {
  inside: boolean;
  brew: KitchenBrew | null;
}

export type KitchenEvent =
  | { kind: "deposited" }
  | { kind: "ingredient"; mushroom: MushroomKind }
  | { kind: "brewing"; recipe: Recipe }
  | { kind: "exit"; recipe: Recipe };

export function newCauldronKitchen(): CauldronKitchen {
  return { inside: false, brew: null };
}

/** Call on crossing into the kitchen, not on every frame spent in it. */
export function enterKitchen(kitchen: CauldronKitchen, inventory: CauldronInventory): KitchenEvent[] {
  if (kitchen.inside || kitchen.brew) return [];
  kitchen.inside = true;
  depositMushrooms(inventory);
  return [{ kind: "deposited" }];
}

/** Room tracking only; inventory ownership and persistence remain the host's responsibility. */
export function leaveKitchen(kitchen: CauldronKitchen): void {
  kitchen.inside = false;
}

/** One use edge at the nearby basket; the host owns proximity and input debouncing. */
export function useKitchenBasket(kitchen: CauldronKitchen, inventory: CauldronInventory, mushroom: MushroomKind): KitchenEvent[] {
  if (!kitchen.inside || kitchen.brew || inventory.baskets[mushroom] === 0) return [];
  const recipe = addIngredient(inventory, mushroom);
  const events: KitchenEvent[] = [{ kind: "ingredient", mushroom }];
  if (recipe) {
    kitchen.brew = { recipe, elapsed: 0 };
    events.push({ kind: "brewing", recipe });
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
  kitchen.brew = null;
  kitchen.inside = false;
  return [{ kind: "exit", recipe }];
}
