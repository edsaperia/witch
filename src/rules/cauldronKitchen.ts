import { addIngredient, depositMushrooms, type CauldronInventory, type MushroomKind, type Recipe } from "./cauldron";

export interface KitchenBrew {
  recipe: Recipe;
  elapsed: number;
  /** Every witch the smoke has taken, each once: those in reach at the third ingredient, then any who came into it while it lasts. */
  recipients: number[];
  /** When the smoke took each recipient (her `elapsed`, in recipients' order; absent in an older save: all at 0). */
  taken?: number[];
  /** Those of them already sent out (each a second after she was taken). */
  out?: number[];
  /** How long the smoke hangs (s; the tuning's treehouse.house.cauldronSmoke). Absent in an older save: a second. */
  smoke?: number;
}

/** Isolated kitchen sequence; callers choose inventory ownership, the reach's geometry (rules/mushrooms.ts inCauldronReach) and rendering. */
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

/** Call on crossing into the cauldron's reach (it's safe every frame in it: only the crossing deposits). While a brew's smoke hangs,
 *  she's taken by it too, once (Ed, 2026-11-03: "if you walk into it you are affected by the potion"). */
export function enterKitchen(kitchen: CauldronKitchen, inventory: CauldronInventory, witch = 0): KitchenEvent[] {
  const brew = kitchen.brew;
  if (brew && !brew.recipients.includes(witch) && brew.elapsed < (brew.smoke ?? 1) - 1e-9) {
    (brew.taken ??= brew.recipients.map(() => 0)).push(brew.elapsed);
    brew.recipients.push(witch);
  }
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

/** One use edge at the nearby basket; the host owns proximity and input debouncing. `smoke`: how long the brew's smoke hangs (s). */
export function useKitchenBasket(kitchen: CauldronKitchen, inventory: CauldronInventory, mushroom: MushroomKind, witch = 0, smoke = 1): KitchenEvent[] {
  if (!kitchen.occupants.includes(witch) || kitchen.brew || inventory.baskets[mushroom] === 0) return [];
  const recipe = addIngredient(inventory, mushroom);
  const events: KitchenEvent[] = [{ kind: "ingredient", mushroom }];
  if (recipe) {
    // Everyone in reach at the third ingredient is taken now; one who walks in while the smoke hangs is taken then (enterKitchen;
    // Ed, 2026-11-03, in place of the snapshot at the third, the coordinator's ruling of 2026-10-30). Leaving doesn't untake her.
    const recipients = [...kitchen.occupants];
    kitchen.brew = { recipe, elapsed: 0, recipients, taken: recipients.map(() => 0), out: [], smoke };
    events.push({ kind: "brewing", recipe, recipients: [...recipients] });
  }
  return events;
}

/** Advance on her simulation clock, not slowed world time or wall time. */
export function stepKitchen(kitchen: CauldronKitchen, dt: number): KitchenEvent[] {
  if (!Number.isFinite(dt) || dt < 0) throw new RangeError("Invalid kitchen timestep");
  const brew = kitchen.brew;
  if (!brew) return [];
  brew.elapsed += dt;
  // Ed, 2026-10-09/10: the smoke takes her and a second later she staggers outside; it hangs over the reach for brew.smoke seconds
  // (Ed, 2026-11-03), taking whoever comes into it meanwhile, each a second later out
  const taken = brew.taken ?? brew.recipients.map(() => 0), out = brew.out ?? [];
  const recipients = brew.recipients.filter((id, i) => !out.includes(id) && brew.elapsed >= taken[i] + 1 - 1e-9);
  brew.out = [...out, ...recipients];
  if (recipients.length) kitchen.occupants = kitchen.occupants.filter(id => !recipients.includes(id));
  if (brew.elapsed >= (brew.smoke ?? 1) - 1e-9 && brew.out.length === brew.recipients.length) kitchen.brew = null;
  return recipients.length ? [{ kind: "exit", recipe: brew.recipe, recipients }] : [];
}
