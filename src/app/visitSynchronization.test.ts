import { expect, it, vi } from "vitest";
import type { Game } from "../rules/game";
import { borrowedNightSaves } from "./nightSave";
import { SaveSlots } from "./saveSlots";
import { visitSaves } from "./visitSaves";
import { visitLifecycle, synchronizeVisit } from "./visitLifecycle";
import { checkpointFixture, memoryVisitStorage } from "../test/visitAcceptance";

it("does not let A's already-rejected synchronization hang up B when its catch runs later", async () => {
  const a = { seed: 1 } as Game, b = { seed: 2 } as Game, hangUpCurrent = vi.fn(), playing = vi.fn();
  const memory = memoryVisitStorage(), checkpoint = checkpointFixture();
  const saves = visitSaves(new SaveSlots(memory.storage), borrowedNightSaves(checkpoint.store));
  const lifecycle = visitLifecycle({ saves, own: () => "own", adoptBorrowed: async game => { if (game === a) throw Error("A preparation failed"); }, adoptOwn: async () => {}, playing });
  await expect(lifecycle.prepare(a, new AbortController().signal, () => {})).rejects.toThrow("A preparation failed");
  await lifecycle.end();
  // The real main.ts adapter. A rejects while inactive; B starts before the catch microtask executes.
  const stale = synchronizeVisit(lifecycle, a, hangUpCurrent);
  const preparingB = lifecycle.prepare(b, new AbortController().signal, () => {});
  try {
    await stale; await preparingB;
    expect(hangUpCurrent).not.toHaveBeenCalled();
    await lifecycle.synchronized(b); expect(playing).toHaveBeenCalledExactlyOnceWith(b);
    expect(saves.phase).toBe("visiting");
  } finally { await preparingB; await lifecycle.end(); }
});

it("keeps an ended A ended, but still reports a genuine current-admission failure", async () => {
  const a = { seed: 1 } as Game, failed = vi.fn(), playing = vi.fn();
  const memory = memoryVisitStorage(), checkpoint = checkpointFixture();
  const saves = visitSaves(new SaveSlots(memory.storage), borrowedNightSaves(checkpoint.store));
  const lifecycle = visitLifecycle({ saves, own: () => "own", adoptBorrowed: async () => { throw Error("Current preparation failed"); }, adoptOwn: async () => {}, playing });
  await expect(lifecycle.prepare(a, new AbortController().signal, () => {})).rejects.toThrow("Current preparation failed");
  await synchronizeVisit(lifecycle, a, failed);
  expect(failed).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ message: "Current preparation failed" }));
  await lifecycle.end(); await synchronizeVisit(lifecycle, a, failed);
  expect(failed).toHaveBeenCalledOnce(); expect(playing).not.toHaveBeenCalled(); expect(saves.phase).toBe("solo");
});
