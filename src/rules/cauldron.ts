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

export interface CauldronStock {
  baskets: MushroomCounts;
  ingredients: MushroomKind[];
}

export interface CauldronInventory extends CauldronStock {
  bag: MushroomCounts;
}

/** Ed, 2026-10-30: shared baskets and one shared pot in the host's treehouse. */
export function newCauldronStock(): CauldronStock {
  return { baskets: emptyMushrooms(), ingredients: [] };
}

/** Each witch carries her own bag; pass the same host stock to every visitor. */
export function newCauldronInventory(stock: CauldronStock = newCauldronStock()): CauldronInventory {
  return { bag: emptyMushrooms(), baskets: stock.baskets, ingredients: stock.ingredients };
}

/** Ed, 2026-10-30: unlimited bag; nothing is lost on knockout. */
export function collectMushroom(inventory: CauldronInventory, kind: MushroomKind): void {
  inventory.bag[kind]++;
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
