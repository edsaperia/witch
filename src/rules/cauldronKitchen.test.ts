import { describe, expect, it } from "vitest";
import { collectMushroom, newCauldronInventory, newCauldronStock, tutorialTrip } from "./cauldron";
import { enterKitchen, leaveKitchen, newCauldronKitchen, stepKitchen, useKitchenBasket } from "./cauldronKitchen";

function collected() {
  const inventory = newCauldronInventory();
  for (const kind of ["A", "B", "B", "B"] as const) collectMushroom(inventory, kind);
  return inventory;
}

describe("kitchen sequence", () => {
  it("deposits on entry, consumes one per use, starts the third immediately and exits once after a second", () => {
    const inventory = collected(), kitchen = newCauldronKitchen();
    expect(enterKitchen(kitchen, inventory)).toEqual([{ kind: "deposited" }]);
    expect(inventory.bag.A).toBe(0);
    expect(inventory.baskets).toMatchObject({ A: 1, B: 3 });
    expect(useKitchenBasket(kitchen, inventory, "B")).toEqual([{ kind: "ingredient", mushroom: "B" }]);
    expect(useKitchenBasket(kitchen, inventory, "A")).toEqual([{ kind: "ingredient", mushroom: "A" }]);
    expect(useKitchenBasket(kitchen, inventory, "B")).toEqual([
      { kind: "ingredient", mushroom: "B" }, { kind: "brewing", recipe: ["B", "A", "B"], recipients: [0] },
    ]);
    expect(inventory.ingredients).toEqual([]);
    expect(inventory.baskets.B).toBe(1);
    // No fourth ingredient while the smoke sequence runs.
    expect(useKitchenBasket(kitchen, inventory, "B")).toEqual([]);
    expect(inventory.baskets.B).toBe(1);
    for (let i = 0; i < 59; i++) expect(stepKitchen(kitchen, 1 / 60)).toEqual([]);
    const events = stepKitchen(kitchen, 1 / 60);
    expect(events).toEqual([{ kind: "exit", recipe: ["B", "A", "B"], recipients: [0] }]);
    const event = events[0];
    if (event.kind !== "exit") throw new Error("Expected exit");
    expect(tutorialTrip(event.recipe)).toBe("drift");
    expect(kitchen).toEqual({ occupants: [], brew: null });
    expect(stepKitchen(kitchen, 10)).toEqual([]);
  });

  it("does nothing outside or at an empty basket", () => {
    const inventory = collected(), kitchen = newCauldronKitchen();
    expect(useKitchenBasket(kitchen, inventory, "A")).toEqual([]);
    enterKitchen(kitchen, inventory);
    expect(useKitchenBasket(kitchen, inventory, "north")).toEqual([]);
    expect(inventory.ingredients).toEqual([]);
  });

  it("does not deposit repeatedly while inside, and preserves partial ingredients across a visit", () => {
    const inventory = collected(), kitchen = newCauldronKitchen();
    enterKitchen(kitchen, inventory);
    useKitchenBasket(kitchen, inventory, "A");
    collectMushroom(inventory, "A");
    expect(enterKitchen(kitchen, inventory)).toEqual([]);
    expect(inventory.bag.A).toBe(1);
    leaveKitchen(kitchen);
    expect(useKitchenBasket(kitchen, inventory, "B")).toEqual([]);
    enterKitchen(kitchen, inventory);
    expect(inventory.bag.A).toBe(0);
    expect(inventory.baskets.A).toBe(1);
    expect(inventory.ingredients).toEqual(["A"]);
  });

  it("supports a large simulation step and a second brew after returning", () => {
    const inventory = collected(), kitchen = newCauldronKitchen();
    enterKitchen(kitchen, inventory);
    for (let i = 0; i < 3; i++) useKitchenBasket(kitchen, inventory, "B");
    expect(stepKitchen(kitchen, 5)).toEqual([{ kind: "exit", recipe: ["B", "B", "B"], recipients: [0] }]);
    collectMushroom(inventory, "A");
    collectMushroom(inventory, "A");
    enterKitchen(kitchen, inventory);
    for (let i = 0; i < 3; i++) useKitchenBasket(kitchen, inventory, "A");
    expect(stepKitchen(kitchen, 1)).toEqual([{ kind: "exit", recipe: ["A", "A", "A"], recipients: [0] }]);
  });

  it("rejects invalid timesteps without advancing a brew", () => {
    const inventory = collected(), kitchen = newCauldronKitchen();
    enterKitchen(kitchen, inventory);
    for (let i = 0; i < 3; i++) useKitchenBasket(kitchen, inventory, "B");
    for (const dt of [-1, NaN, Infinity]) expect(() => stepKitchen(kitchen, dt)).toThrow(RangeError);
    expect(kitchen.brew?.elapsed).toBe(0);
  });

  // Ed, 2026-11-03: "The cauldron smoke effect should cover the 10m area for ten seconds or so, and if you walk into it you are
  // affected by the potion" (in place of the snapshot at the third ingredient, the coordinator's ruling of 2026-10-30).
  it("takes everyone in reach at the third, then whoever walks in while the smoke hangs, each once, a second later out", () => {
    const stock = newCauldronStock(), kitchen = newCauldronKitchen();
    const host = newCauldronInventory(stock), guest = newCauldronInventory(stock), late = newCauldronInventory(stock);
    for (let i = 0; i < 3; i++) collectMushroom(host, "B");
    enterKitchen(kitchen, host, 4);
    enterKitchen(kitchen, guest, 2);
    useKitchenBasket(kitchen, host, "B", 4, 10);
    useKitchenBasket(kitchen, guest, "B", 2, 10);
    // A witch who left before the third isn't taken then, even if she contributed.
    leaveKitchen(kitchen, 2);
    const events = useKitchenBasket(kitchen, host, "B", 4, 10);
    expect(events[1]).toMatchObject({ kind: "brewing", recipients: [4] });
    leaveKitchen(kitchen, 4); // (leaving doesn't untake her)
    expect(stepKitchen(kitchen, 1)).toEqual([{ kind: "exit", recipe: ["B", "B", "B"], recipients: [4] }]);
    // she comes back at 5 s: taken, out a second later
    expect(stepKitchen(kitchen, 4)).toEqual([]);
    enterKitchen(kitchen, guest, 2);
    expect(kitchen.brew?.recipients).toEqual([4, 2]);
    expect(stepKitchen(kitchen, 0.5)).toEqual([]);
    expect(stepKitchen(kitchen, 0.5)).toEqual([{ kind: "exit", recipe: ["B", "B", "B"], recipients: [2] }]);
    // nobody twice: the host back into the smoke at 7 s is not taken again
    expect(stepKitchen(kitchen, 1)).toEqual([]);
    enterKitchen(kitchen, host, 4);
    expect(kitchen.brew?.recipients).toEqual([4, 2]);
    // the smoke clears at 10 s: one who arrives at 10.5 s stays normal
    expect(stepKitchen(kitchen, 3)).toEqual([]);
    expect(kitchen.brew).toBeNull();
    stepKitchen(kitchen, 0.5); enterKitchen(kitchen, late, 7);
    expect(stepKitchen(kitchen, 5)).toEqual([]);
    expect(kitchen.occupants).toEqual([4, 7]);
  });

  it("includes every witch present, only once, regardless of who contributed", () => {
    const inventory = collected(), kitchen = newCauldronKitchen();
    enterKitchen(kitchen, inventory, 3);
    enterKitchen(kitchen, newCauldronInventory(), 1);
    enterKitchen(kitchen, inventory, 3);
    for (let i = 0; i < 3; i++) useKitchenBasket(kitchen, inventory, "B", 3);
    expect(kitchen.brew?.recipients).toEqual([1, 3]);
    expect(stepKitchen(kitchen, 1)).toEqual([{ kind: "exit", recipe: ["B", "B", "B"], recipients: [1, 3] }]);
    expect(kitchen.occupants).toEqual([]);
  });
});
