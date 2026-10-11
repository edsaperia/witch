// The dev Player pick shows only with the debug overlay on (Ed, 2026-10-11: "the Player dropdown moves into the debug overlay
// only"). No DOM in the tests: a stand-in document with just what playerPick touches.
import { afterEach, describe, expect, it, vi } from "vitest";
import { playerPick, showPlayerPick } from "./playerPick";
import type { Creator } from "../ui/creator";

type El = { id: string; textContent: string; value: string; style: Record<string, string>; options: El[]; children: El[]; append: (...e: El[]) => void; addEventListener: () => void };
function fakeDom(): { root: El; byId: (id: string) => El | null } {
  const all: El[] = [];
  const make = (): El => { const e: El = { id: "", textContent: "", value: "", style: {}, options: [], children: [], append: (...c) => { e.children.push(...c); e.options.push(...c); }, addEventListener: () => {} }; all.push(e); return e; };
  const byId = (id: string) => all.find(e => e.id === id) ?? null;
  vi.stubGlobal("document", { createElement: make, getElementById: byId });
  vi.stubGlobal("sessionStorage", { getItem: () => null, setItem: () => {} });
  return { root: make(), byId };
}

describe("the Player pick (app/playerPick.ts)", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("is hidden till the debug overlay comes on, and goes with it", () => {
    const { root, byId } = fakeDom();
    expect(playerPick(new URLSearchParams(""), { root } as unknown as Creator)).not.toBeNull();
    const box = byId("player-pick")!;
    expect(box.style.display).toBe("none");
    showPlayerPick(true); expect(box.style.display).toBe("");
    showPlayerPick(false); expect(box.style.display).toBe("none");
  });

  it("shows from the start with ?debug, and never with ?dev=0", () => {
    const { root, byId } = fakeDom();
    playerPick(new URLSearchParams("debug"), { root } as unknown as Creator);
    expect(byId("player-pick")!.style.display).toBe("");
    const two = fakeDom();
    expect(playerPick(new URLSearchParams("dev=0"), { root: two.root } as unknown as Creator)).toBeNull();
    expect(two.byId("player-pick")).toBeNull();
  });
});
