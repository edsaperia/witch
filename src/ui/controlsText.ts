// The controls list (index.html's `.keys`: the start card's, the creator's ❔ Controls tab and the pause page's) as bound now (Ed,
// 2026-10-28: a remap shows everywhere): each `data-key` span the action's first key, each `data-pad` its pad inputs, each
// `data-pad-move` its four directions' (game.move: moveUp...; game.aim; menu: menu.up...), filled at the boot and again on a change.
import { bindings, keyName, PAD_SIGNS, padName, type ActionId } from "../platform/bindings";

/** The four directions' pad inputs in words, the d-pad's as one ("d-pad or left stick"). */
export function padMoveName(prefix: string): string {
  const ids = (prefix === "menu" ? ["menu.up", "menu.down", "menu.left", "menu.right"] : ["Up", "Down", "Left", "Right"].map(d => `${prefix}${d}`)) as ActionId[];
  const names = [...new Set(ids.flatMap(id => bindings.pad(id).map(p => (PAD_SIGNS[p] ?? p).replace(/^d-pad .*/, "d-pad"))))];
  return names.length ? names.join(" or ") : "none";
}

/** Fills `root`'s spans from the bindings now. */
export function fillControls(root: ParentNode): void {
  for (const el of root.querySelectorAll<HTMLElement>("[data-key]")) { const k = bindings.keys(el.dataset.key as ActionId)[0]; el.textContent = k ? keyName(k) : "(none)"; }
  for (const el of root.querySelectorAll<HTMLElement>("[data-pad]")) el.textContent = padName(el.dataset.pad as ActionId);
  for (const el of root.querySelectorAll<HTMLElement>("[data-pad-move]")) el.textContent = padMoveName(el.dataset.padMove!);
}
