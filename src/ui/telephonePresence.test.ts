import { afterEach, expect, it, vi } from "vitest";
import { TelephonePresence } from "./telephonePresence";
import type { TelephoneState } from "./telephone";
afterEach(() => vi.unstubAllGlobals());
class Element {
  style: Record<string, string> = {}; children: unknown[] = []; onclick: (() => void) | null = null; removed = false; textContent = "";
  append(...items: unknown[]) { this.children.push(...items); }
  replaceChildren(...items: unknown[]) { this.children = items; }
  remove() { this.removed = true; }
  setAttribute() {}
}
it("adds no default DOM and removes call presentation; only the host bubble can hang up", () => {
  const nodes: Element[] = [], createElement = vi.fn(() => { const e = new Element(); nodes.push(e); return e; }), body = new Element();
  vi.stubGlobal("document", { createElement, body });
  const hang = vi.fn(), face = vi.fn(() => null), presence = new TelephonePresence(face, hang);
  const state: TelephoneState = { own: "1234567", status: "ended", recent: [], saved: true };
  presence.update(state, false, false, null); expect(createElement).not.toHaveBeenCalled();
  presence.update({ ...state, peer: "7654321", status: "joining" }, true, true, [10, 20]); expect(nodes).toHaveLength(1);
  presence.update({ ...state, peer: "7654321", status: "connected" }, true, false, [10, 20]);
  expect(nodes).toHaveLength(3); expect(face).toHaveBeenCalledWith("7654321"); nodes[2].onclick!(); expect(hang).toHaveBeenCalledTimes(1);
  presence.update(state, false, false, null); expect(nodes[0].removed).toBe(true); expect(nodes[1].removed).toBe(true);
});
