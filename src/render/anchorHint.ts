// The anchor chains' hint (Ed, 2026-11-03; rules/anchor.ts): the first time she tries to take off with an adult on her leash (the
// "grounded" leash event its obj "anchor", rules/game.ts), besides the hop, the flashing chains and the thud every refusal has
// (render/view/witch.ts, render/leash/stack.ts, platform/audio/sfxCues.ts), a short line says why, in the house's word bubble's
// look (render/houseRooms.ts), for ANCHOR_HINT_FOR seconds. Once on this browser (localStorage witch.hint.anchor; blocked: once a page).
import type { Game } from "../rules/game";

export const ANCHOR_HINT = "Adults are too heavy to fly with. Put their sigils down to take off.";
export const ANCHOR_HINT_KEY = "witch.hint.anchor";
/** Seconds the line shows. */
export const ANCHOR_HINT_FOR = 4;

type Store = Pick<Storage, "getItem" | "setItem">;
const store = (): Store | null => { try { return typeof localStorage === "undefined" ? null : localStorage; } catch { return null; } };
let seen = false, shownAt = -Infinity, box: HTMLDivElement | null = null;

/** Whether this refusal should bring the hint: the anchor's, hers, and not yet seen. Marks it seen. */
export function anchorHintDue(events: Game["leashEvents"], witchId: number, storage: Store | null = store()): number | null {
  const e = events.find(k => k.kind === "grounded" && k.obj === "anchor" && k.id === witchId);
  if (!e || seen) return null;
  seen = true;
  try { if (storage?.getItem(ANCHOR_HINT_KEY)) return null; storage?.setItem(ANCHOR_HINT_KEY, "1"); } catch { /* blocked: once a page */ }
  return e.at;
}
/** (tests) */
export const resetAnchorHint = () => { seen = false; shownAt = -Infinity; };

/** This frame's hint: shown from the first anchored refusal for ANCHOR_HINT_FOR seconds of her clock. */
export function updateAnchorHint(g: Game, ht: number): void {
  if (typeof document === "undefined") return;
  const at = anchorHintDue(g.leashEvents, g.witches[0].id);
  if (at !== null) shownAt = at;
  const on = ht >= shownAt && ht - shownAt < ANCHOR_HINT_FOR;
  if (!on) { if (box) box.hidden = true; return; }
  if (!box) {
    box = document.createElement("div"); box.id = "anchor-hint"; box.setAttribute("role", "status"); box.textContent = ANCHOR_HINT;
    box.style.cssText = "position:fixed;left:50%;top:30%;transform:translate(-50%,-100%);z-index:11;pointer-events:none;font:600 14px/1.2 inherit;background:rgba(250,244,255,.94);color:#2a1d38;border-radius:12px;padding:6px 12px;max-width:320px;white-space:normal;text-align:center";
    document.body.append(box);
  }
  box.hidden = false;
}
