// Ed, 2026-10-09/10: six kinds, hidden bag, six baskets, three ingredients;
// order does not matter and repeats are allowed. No world or renderer dependencies.
export const MUSHROOM_KINDS = ["A", "B", "north", "south", "east", "west"] as const;
export type MushroomKind = typeof MUSHROOM_KINDS[number];
export type MushroomCounts = Record<MushroomKind, number>;
export type Recipe = readonly [MushroomKind, MushroomKind, MushroomKind];
export type TutorialTrip = "superhot" | "orbit" | "drift" | "mirrorFloor";

/** The only assigned recipes: journey.md, Mushrooms on the journey (Ed, 2026-10-10). */
export const TUTORIAL_RECIPES: Readonly<Record<string, TutorialTrip>> = {
  "A/A/A": "superhot", "A/A/B": "orbit", "A/B/B": "drift", "B/B/B": "mirrorFloor",
};

export function recipeKey(recipe: Recipe): string {
  return [...recipe].sort((a, b) => MUSHROOM_KINDS.indexOf(a) - MUSHROOM_KINDS.indexOf(b)).join("/");
}

export function tutorialTrip(recipe: Recipe): TutorialTrip | undefined {
  return TUTORIAL_RECIPES[recipeKey(recipe)];
}

export function emptyMushrooms(): MushroomCounts {
  return { A: 0, B: 0, north: 0, south: 0, east: 0, west: 0 };
}

export interface CauldronInventory {
  bag: MushroomCounts;
  baskets: MushroomCounts;
  ingredients: MushroomKind[];
}

/** Allocate per witch; sharing baskets or retaining this across nights is not decided. */
export function newCauldronInventory(): CauldronInventory {
  return { bag: emptyMushrooms(), baskets: emptyMushrooms(), ingredients: [] };
}

/** Capacity is supplied by the caller: no default until Ed rules on bag size. */
export function collectMushroom(inventory: CauldronInventory, kind: MushroomKind, capacity: number): boolean {
  if (!Number.isSafeInteger(capacity) || capacity < 0) throw new RangeError("Invalid mushroom capacity");
  const held = MUSHROOM_KINDS.reduce((sum, k) => sum + inventory.bag[k], 0);
  if (held >= capacity) return false;
  inventory.bag[kind]++;
  return true;
}

/** Entering the kitchen empties the hidden bag into the six matching baskets. */
export function depositMushrooms(inventory: CauldronInventory): void {
  for (const kind of MUSHROOM_KINDS) {
    inventory.baskets[kind] += inventory.bag[kind];
    inventory.bag[kind] = 0;
  }
}

/** One use consumes one mushroom. The third emits a recipe immediately, with no bottle/button. */
export function addIngredient(inventory: CauldronInventory, kind: MushroomKind): Recipe | null {
  if (inventory.baskets[kind] === 0) return null;
  inventory.baskets[kind]--;
  inventory.ingredients.push(kind);
  if (inventory.ingredients.length < 3) return null;
  const recipe: Recipe = [inventory.ingredients[0], inventory.ingredients[1], inventory.ingredients[2]];
  inventory.ingredients.length = 0;
  return recipe;
}
