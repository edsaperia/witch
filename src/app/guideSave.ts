// What guidance keeps on this browser (localStorage witch.guide; rules/guidance.ts): the new things in the treehouse she hasn't
// been to yet. Storage blocked: this run only. (A save from before 2026-10-26 also has chartSeen, the islands seen on the chart: unread.)
import { emptyGuide, type GuideSave, type NewThing } from "../rules/guidance";

export const GUIDE_KEY = "witch.guide";
type Store = Pick<Storage, "getItem" | "setItem">;
const storeOf = (s?: Store | null): Store | null => { try { return s ?? globalThis.localStorage ?? null; } catch { return null; } };
const KINDS = ["hat", "part", "wearable"];

export function loadGuide(storage?: Store | null): GuideSave {
  try {
    const o = JSON.parse(storeOf(storage)?.getItem(GUIDE_KEY) ?? "null") as Partial<GuideSave> | null;
    if (!o) return emptyGuide();
    const ok = (n: NewThing) => n && KINDS.includes(n.kind) && typeof n.id === "string" && typeof n.at === "string";
    return {
      unseen: (Array.isArray(o.unseen) ? o.unseen : []).filter(ok).map(n => ({ kind: n.kind, id: n.id, at: n.at === "broomBay" || n.at === "pegboard" ? "lathe" : n.at === "mirror" ? "wardrobe" : n.at })), // (the broom one station at the lathe since 2026-10-29: a part found before waits there; the hat's colours and fit at the wardrobe since the same day, the mirror only scenery)
    };
  } catch { return emptyGuide(); }
}

export function storeGuide(save: GuideSave, storage?: Store | null): void {
  try { storeOf(storage)?.setItem(GUIDE_KEY, JSON.stringify(save)); } catch { /* storage blocked: this run only */ }
}

/** A new thing found: pinned till she's been to it (one entry an item, the newest last). */
export function addNew(save: GuideSave, n: NewThing): void {
  save.unseen = [...save.unseen.filter(q => q.id !== n.id), n];
}
/** A thing gone (a find back to the sky after a lost night): no longer pinned. */
export function dropNew(save: GuideSave, id: string): void {
  save.unseen = save.unseen.filter(q => q.id !== id);
}
