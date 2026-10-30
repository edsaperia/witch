import type { Controls, Game, Witch } from "./game";
import { collectMushroom, newCauldronInventory, newCauldronStock, type CauldronStock, type MushroomKind } from "./cauldron";
import { enterKitchen, leaveKitchen, newCauldronKitchen, stepKitchen, useKitchenBasket, type CauldronKitchen, type KitchenEvent } from "./cauldronKitchen";
import { fromPlan, HOUSE_ROOMS, roomAt } from "./houseRooms";
import { deckOf } from "./treehouse";

export interface MushroomPickup { id: number; kind: MushroomKind; x: number; z: number; collected: boolean }
export interface CauldronNight {
  stock: CauldronStock;
  kitchen: CauldronKitchen;
  pickups: MushroomPickup[];
  events: KitchenEvent[];
}

/** Additive gate: a normal night has null here. Placement is supplied by the host, not forest generation. */
export function enableCauldron(g: Game, pickups: readonly MushroomPickup[]): void {
  if (g.cauldron) return;
  const stock = newCauldronStock();
  g.cauldron = { stock, kitchen: newCauldronKitchen(), pickups: pickups.map(p => ({ ...p })), events: [] };
  for (const W of g.witches) W.mushrooms = newCauldronInventory(stock);
}

export function inKitchen(g: Game, W: Witch): boolean {
  const deck = deckOf(g.map, g.tuning);
  return !!deck?.house?.rooms && !!W.body.perch && W.body.mode === "ground" && !W.body.seated && !W.ko
    && roomAt(deck, W.body.x, W.body.z)?.id === "kitchen";
}

/** Six basket interaction spots on the kitchen's plan; rendering uses these same points. */
export function kitchenBasketPoints(g: Game): { x: number; z: number }[] {
  const room = HOUSE_ROOMS.rooms.find(r => r.id === "kitchen");
  if (!room) return [];
  return Array.from({ length: 6 }, (_, i) => fromPlan(g.map.treehouse, room.x + (i - 2.5) * 1.8, room.z + 1, HOUSE_ROOMS.turn ?? 0));
}

export function kitchenBasketNear(g: Game, W: Witch): number {
  if (!g.cauldron || !inKitchen(g, W)) return -1;
  let closest = -1, distance = 0.9;
  kitchenBasketPoints(g).forEach((p, i) => {
    const d = Math.hypot(p.x - W.body.x, p.z - W.body.z);
    if (d < distance) { distance = d; closest = i; }
  });
  return closest;
}

/** Fixed-step hook after every witch has moved, before their use buttons are routed elsewhere. */
export function stepCauldronNight(g: Game, inputs: readonly Controls[], dt: number): Controls[] {
  const state = g.cauldron;
  if (!state) return [...inputs];
  // Finish an existing smoke sequence before accepting this step's ingredients. A new brew
  // gets its full second beginning at the third ingredient, not one timestep less.
  state.events = stepKitchen(state.kitchen, dt);
  for (const W of g.witches) {
    const inventory = W.mushrooms ??= newCauldronInventory(state.stock);
    if (inKitchen(g, W)) state.events.push(...enterKitchen(state.kitchen, inventory, W.id));
    else leaveKitchen(state.kitchen, W.id);
    if (W.body.mode !== "ground" || W.body.perch || W.body.seated || W.ko) continue;
    for (const mushroom of state.pickups) {
      if (!mushroom.collected && Math.hypot(mushroom.x - W.body.x, mushroom.z - W.body.z) <= g.tuning.leash.runeRadius) {
        collectMushroom(inventory, mushroom.kind);
        mushroom.collected = true;
      }
    }
  }
  const kinds: MushroomKind[] = ["A", "B", "north", "south", "east", "west"];
  return g.witches.map((W, i) => {
    const c = inputs[i], basket = kitchenBasketNear(g, W);
    if (basket < 0) return c;
    if ((c.place || c.sigil) && !W.ko) state.events.push(...useKitchenBasket(state.kitchen, W.mushrooms!, kinds[basket], W.id));
    return { ...c, place: false, sigil: false, sigilHeld: false, hatHold: false };
  });
}
