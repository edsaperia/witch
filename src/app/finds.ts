// What she has found, kept on this browser: the page's half of a find (rules/finds.ts claims it in the rules; this keeps it for
// good). Each kind of find has a keeper: what of it she owns, keeping one and letting one go, through the kind's own save
// (a wearable app/owned.ts's witch.owned, a broom part app/broomSave.ts's witch.broom). The "found" event of a real find, the
// dev control (ui/findsPanel.ts) and ?own= all go through grantFind/keepFound, so a granted find is exactly a found one (Ed,
// 2026-10-23: "we will need a debug control that allows devs to give themselves collectible items"). A new kind of find (hats,
// bags, records) adds its keeper here: KEEPERS is a record of every FindKindId, so the typecheck asks for it.
import { FIND_KINDS, findKind, type FindKindId } from "../rules/finds";
import { SLOTS, bareBroom, partById, spellOfParts } from "../rules/broomParts";
import { setParts, type SpellState } from "../rules/spells";
import { itemById } from "../rules/wardrobe";
import { loadOwned, saveOwned } from "./owned";
import { loadBroom, partFound, saveBroom } from "./broomSave";

/** What a keeper works on: her spells (a broom part's claim fits it there) and what she owns to wear (the page's set, kept). */
export interface FindsCtx { spells: Pick<SpellState, "parts" | "broom" | "activeUntil" | "readyAt" | "castAt">; owned(): Set<string> }
export interface Keeper {
  /** an item's name, as the game shows it */
  label(id: string): string;
  /** what of this kind she owns */
  has(c: FindsCtx): ReadonlySet<string>;
  /** kept for good, as a find (after the kind's claim in the rules) */
  keep(c: FindsCtx, id: string): void;
  /** let go (the dev control): no longer hers, off her if it's on */
  drop(c: FindsCtx, id: string): void;
}

export const KEEPERS: Record<FindKindId, Keeper> = {
  wearable: {
    label: id => itemById(id)?.name ?? id,
    has: c => c.owned(),
    keep: (c, id) => { const o = c.owned(); o.add(id); saveOwned(o); },
    // (one she's wearing still counts as hers: app/owned.ts's loadOwned)
    drop: (c, id) => { const o = c.owned(); o.delete(id); saveOwned(o); },
  },
  part: {
    label: id => partById(id)?.name ?? id,
    has: () => new Set(loadBroom().found),
    keep: (c, id) => { partFound(id, c.spells.parts); },
    drop: (c, id) => {
      const b = loadBroom(), slot = partById(id)?.slot;
      b.found = b.found.filter(p => p !== id);
      if (slot && b.fitted[slot] === id) b.fitted[slot] = null;
      saveBroom(b);
      if (slot && c.spells.parts[slot] === id) setParts(c.spells as SpellState, { ...c.spells.parts, [slot]: null });
    },
  },
};

/** The page's half of a find: kept for good (the "found" event, after the rules' claim). */
export const keepFound = (c: FindsCtx, kind: FindKindId, id: string): void => KEEPERS[kind].keep(c, id);

/** A find given (the dev control, ?own=): the kind's claim in the rules, then kept, as a real find is. */
export function grantFind(c: FindsCtx, kind: FindKindId, id: string): void {
  if (!findKind(kind).items.includes(id)) return;
  findKind(kind).claim?.(c.spells as SpellState, id);
  keepFound(c, kind, id);
}
/** A find let go (the dev control, ?own=none). */
export function dropFind(c: FindsCtx, kind: FindKindId, id: string): void { if (findKind(kind).items.includes(id)) KEEPERS[kind].drop(c, id); }

/** Every find of a kind given, or let go. */
export function grantAll(c: FindsCtx, kind: FindKindId, own: boolean): void { for (const id of findKind(kind).items) (own ? grantFind : dropFind)(c, kind, id); }

/** What ?own= asks for (e.g. all, none, part:missile-nose,wearable:*, hat:helmet): every item of every kind, none, or each
 *  kind:item (kind:* every item of the kind; a bare item id, whichever kind has it). Unknown ones are ignored. */
export function ownWanted(spec: string): { none: boolean; grants: { kind: FindKindId; id: string }[] } {
  const grants: { kind: FindKindId; id: string }[] = [];
  let none = false;
  for (const raw of spec.split(",").map(s => s.trim()).filter(Boolean)) {
    if (raw === "none") { none = true; continue; }
    if (raw === "all") { for (const k of FIND_KINDS) for (const id of k.items) grants.push({ kind: k.id, id }); continue; }
    const [a, b] = raw.includes(":") ? raw.split(":") : [null, raw];
    const kinds = a ? FIND_KINDS.filter(k => k.id === a) : FIND_KINDS;
    for (const k of kinds) for (const id of k.items) if (b === "*" || id === b) grants.push({ kind: k.id, id });
  }
  return { none, grants };
}

/** ?own= at load, before the night reads the saves (app/linkParams.ts): written to this browser's saves, as the dev control
 *  writes them (none first: "none,part:x" leaves only that). Her broom's fitted parts change as a find's claim fits them. */
export function applyOwn(spec: string): void {
  const { none, grants } = ownWanted(spec);
  const b = loadBroom(), spells = { parts: b.fitted, broom: spellOfParts(b.fitted), activeUntil: -Infinity, readyAt: 0, castAt: -Infinity };
  let owned: Set<string> | null = null;
  const c: FindsCtx = { spells, owned: () => (owned ??= loadOwned(null)) };
  if (none) { for (const k of FIND_KINDS) grantAll(c, k.id, false); spells.parts = bareBroom(); saveBroom({ v: 1, found: [], fitted: bareBroom() }); }
  for (const g of grants) grantFind(c, g.kind, g.id);
}

/** Every slot's part as `ids` (the dev control's line under the broom parts). */
export const fittedLine = (c: FindsCtx): string => SLOTS.map(s => `${s} ${partById(c.spells.parts[s])?.name ?? "—"}`).join(" · ");
