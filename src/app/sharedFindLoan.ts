import type { Game } from "../rules/game";
import { FIND_KINDS, type FindKindId } from "../rules/finds";
import type { Fitted } from "../rules/broomParts";
import { lend, lookWithoutLoan, hatWithoutLoan, partsWithoutLoan, type Loan } from "./loan";

export interface PersonalKit { look: Record<string, unknown> | null; hat: string; parts: Fitted; hats?: string[] }
export function sharedFind(game: Pick<Game, "trunk">): { kind: FindKindId; id: string } | null {
  const find = game.trunk;
  return find?.found && find.item && FIND_KINDS.some(k => k.id === find.kind && k.items.includes(find.item!)) ? { kind: find.kind, id: find.item } : null;
}
/** Host catalogue availability only. No player, equipment or storage mutations. */
export function withSharedFind(game: Pick<Game, "trunk">, kind: FindKindId, saved: ReadonlySet<string>): Set<string> {
  const out = new Set(saved), find = sharedFind(game);
  if (find && (find.kind === kind || kind === "wearable" && find.kind === "bag")) out.add(find.id);
  return out;
}
/** Each browser's originals stay private; only a registered taken find grants temporary shared availability. */
export function sharedFindLoan() {
  let original: { kit: PersonalKit; loan: Loan | null } | null = null, current: Loan | null = null;
  const strip = (kit: PersonalKit, loan: Loan | null): PersonalKit => ({ ...kit, look: lookWithoutLoan(kit.look, loan), hat: hatWithoutLoan(kit.hat, loan), parts: partsWithoutLoan(kit.parts, loan) });
  return {
    begin(kit: PersonalKit, prior: Loan | null) { original = structuredClone({ kit, loan: prior }); current = null; },
    observe(game: Pick<Game, "trunk">, kit: PersonalKit) {
      const find = sharedFind(game);
      if (original && !current && find) current = lend(find.kind, find.id, kit);
    },
    /** Strip both this call's find and a pre-existing private loan from every host equipment save. */
    forSave(kit: PersonalKit): PersonalKit { return strip(strip(kit, current), original?.loan ?? null); },
    finish(success: boolean, kit: PersonalKit, visitor = false): { kit: PersonalKit; loan: Loan | null } {
      let restored = visitor && original ? structuredClone(original.kit) : success ? kit : strip(kit, current);
      if (!visitor && !success && current?.kind === "hat" && original?.kit.hats && restored.hats && !original.kit.hats.includes(current.id)) restored = { ...restored, hats: restored.hats.filter(id => id !== current!.id) };
      const prior = original ? structuredClone(original.loan) : null;
      original = null; current = null;
      return { kit: restored, loan: prior };
    },
  };
}
