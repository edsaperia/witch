import { expect, it, vi } from "vitest";
import type { Game } from "../rules/game";
import { visitLifecycle } from "./visitLifecycle";

it("waits for cancelled late borrowed preparation before restoring own page and never confirms it", async () => {
  const order: string[] = [], controller = new AbortController();
  let finish!: () => void;
  const saves = { phase: "solo" as const, prepare: vi.fn(async () => {}), confirm: vi.fn(async () => {}), returnOwn: vi.fn(async (adopt: (fresh: boolean) => Promise<void>) => adopt(false)) };
  const lifecycle = visitLifecycle({ saves, own: () => "own night", adoptBorrowed: async () => { order.push("borrowed:start"); await new Promise<void>(r => { finish = r; }); order.push("borrowed:done"); },
    adoptOwn: async (own, fresh) => { expect(own).toBe("own night"); expect(fresh).toBe(false); order.push("own:ready"); }, playing: vi.fn(),
  });
  const preparing = lifecycle.prepare({} as Game, controller.signal, () => {}); const rejected = expect(preparing).rejects.toThrow();
  await vi.waitFor(() => expect(finish).toBeTypeOf("function"));
  controller.abort(); const returned = lifecycle.end(); expect(lifecycle.end()).toBe(returned);
  expect(order).toEqual(["borrowed:start"]); finish(); await rejected; await returned;
  expect(order).toEqual(["borrowed:start", "borrowed:done", "own:ready"]); expect(saves.confirm).not.toHaveBeenCalled();
});
it("confirms after preparation and waits for confirmation before playing or returning", async () => {
  const order: string[] = []; let confirm!: () => void;
  const saves = { phase: "solo" as const, prepare: async () => {}, confirm: () => new Promise<void>(r => { confirm = r; }), returnOwn: async (adopt: (fresh: boolean) => Promise<void>) => { order.push("return"); await adopt(true); } };
  const lifecycle = visitLifecycle({ saves, own: () => 1, adoptBorrowed: async () => { order.push("prepared"); }, adoptOwn: async (_own, fresh) => { expect(fresh).toBe(true); order.push("fresh"); }, playing: () => { order.push("playing"); } });
  const borrowed = {} as Game;
  await lifecycle.prepare(borrowed, new AbortController().signal, () => {});
  const synchronized = lifecycle.synchronized(borrowed);
  await vi.waitFor(() => expect(confirm).toBeTypeOf("function")); const returned = lifecycle.end();
  expect(order).toEqual(["prepared"]); confirm(); await synchronized; await returned;
  expect(order).toEqual(["prepared", "return", "fresh"]);
});
