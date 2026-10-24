// Tonight's find on loan till she sleeps (Ed, 2026-10-24, previews/ed/finds-on-loan): taken, it's hers to wear or use at once, but
// kept only if the night is won. The page holds the loan here, in memory, never written: what she owns tonight is her saves plus
// the loan, and every save made during the night is made as if the loan weren't hers (her look, her hat, her broom's parts: what she
// had in its place before she took it), so a reload, a closed tab or a lost night leaves nothing of it behind. When she sleeps
// (the bed; a sail) the loan's settled (settleLoan): the night won, it's kept for good (app/finds.ts keepFound, the kind's own
// save), and her dream shows it falling into its place in the treehouse (render/dream.ts); not won, it goes back to the sky, and
// what she has on goes back to what she had before. Pure but for keepFound's saves: main.ts wires it.
import type { FindKindId } from "../rules/finds";
import { itemById, wears, type WardrobeItem } from "../rules/wardrobe";
import { hatSpell } from "../rules/spells";
import { partById, type Fitted } from "../rules/broomParts";

type Genome = Record<string, unknown>;

/** Tonight's loan: the find she took, and what she had in its place when she took it (her look, her hat's spell, her broom's parts). */
export interface Loan {
  kind: FindKindId;
  id: string;
  before: { look: Genome | null; hat: string; parts: Fitted };
}

/** A loan of `kind`'s `id`, taken now: what she has on now is what a loss gives back. */
export function lend(kind: FindKindId, id: string, now: { look: Genome | null; hat: string; parts: Fitted }): Loan {
  return { kind, id, before: { look: now.look ? (JSON.parse(JSON.stringify(now.look)) as Genome) : null, hat: now.hat, parts: { ...now.parts } } };
}

/** The wardrobe item a loan is (a wearable or a bag), else null. */
const itemOf = (loan: Loan | null): WardrobeItem | null => (loan && (loan.kind === "wearable" || loan.kind === "bag") ? itemById(loan.id) ?? null : null);

const get = (g: Genome | null, path: string): unknown => path.split(".").reduce<unknown>((o, k) => (o as Record<string, unknown> | null | undefined)?.[k], g);
const put = (g: Genome, path: string, v: unknown): void => {
  const keys = path.split("."), last = keys.pop()!;
  let o = g as Record<string, unknown>;
  for (const k of keys) o = (o[k] ??= {}) as Record<string, unknown>;
  if (v === undefined) delete o[last]; else o[last] = v;
};

/** Her look as if the loan weren't hers: wearing the loaned item, each thing it sets back to what she had before she took it (a
 *  copy); not wearing it, her look as it is. What every save of her look is made from during the night, and her look after a loss. */
export function lookWithoutLoan<G extends Genome | null>(look: G, loan: Loan | null): G {
  const it = itemOf(loan);
  if (!look || !it || !wears(look, it)) return look;
  const out = JSON.parse(JSON.stringify(look)) as Genome;
  for (const p of Object.keys(it.set)) put(out, p, get(loan!.before.look, p));
  return out as G;
}

/** Her hat's spell as if the loan weren't hers: the loaned hat, the one she had before. */
export const hatWithoutLoan = (hat: string, loan: Loan | null): string => (loan?.kind === "hat" && hat === loan.id ? loan.before.hat : hat);

/** Her broom's parts as if the loan weren't hers: the loaned part's slot back to the part she had there before (a copy). */
export function partsWithoutLoan(parts: Fitted, loan: Loan | null): Fitted {
  if (loan?.kind !== "part") return parts;
  const slot = partById(loan.id)?.slot;
  return slot && parts[slot] === loan.id ? { ...parts, [slot]: loan.before.parts[slot] } : parts;
}

/** What she owns of a kind tonight: her saves', and the loan if it's of that kind (a copy). */
export function withLoan(kind: FindKindId, saved: ReadonlySet<string>, loan: Loan | null): Set<string> {
  const out = new Set(saved);
  if (loan && (loan.kind === kind || (kind === "wearable" && loan.kind === "bag"))) out.add(loan.id);
  return out;
}

/** The loan's verdict as she sleeps: the night won, kept (the caller's keepFound); else gone back to the sky. */
export type Verdict = "kept" | "lost";
export const verdictOf = (won: boolean): Verdict => (won ? "kept" : "lost");

/** Its name as the dream says it ("the Sentry hat", "the Velvet jacket", "the Missile nose"). */
export function loanName(loan: Pick<Loan, "kind" | "id">): string {
  const n = loan.kind === "part" ? partById(loan.id)?.name : loan.kind === "hat" ? `${hatSpell(loan.id)?.name ?? loan.id} hat` : itemById(loan.id)?.name;
  return `the ${n ?? loan.id}`;
}

/** Where in the treehouse the find will live, kept (Ed, 2026-10-24: "the hats' floor for a hat, the pegboard or broom bay for a
 *  broom part, the wardrobe, shoe rack or cloak pegs for clothes, the bags for a bag"): a house object's id (config/house/). */
export function homeOf(loan: Pick<Loan, "kind" | "id">, stationsFor: (item: string) => string[]): string {
  if (loan.kind === "hat") return "hats";
  if (loan.kind === "part") return "pegboard";
  if (loan.kind === "bag") return "bags";
  return stationsFor(loan.id)[0] ?? "wardrobe";
}

/** The page's saves a settled loan writes through (main.ts: app/finds.ts keepFound, ui/creator.ts saveGenome, app/loadout.ts
 *  saveLoadout, app/broomSave.ts fitBroom). */
export interface LoanSaves { keep(kind: FindKindId, id: string): void; look(g: Genome): void; hat(h: string): void; parts(f: Fitted): void }

/** The loan settled as she sleeps (Ed, 2026-10-24): the night won, kept for good (its kind's own save), and what she has on of it
 *  saved with it; not, gone back to the sky, what she has on of it back to what she had before (her look and her broom's parts
 *  saved so; a loaned hat was never saved, so her saved hat is already the one before). Her look as she'll wake to it. */
export function settle(l: Loan, won: boolean, now: { look: Genome | null; hat: string; parts: Fitted }, save: LoanSaves): Genome | null {
  if (won) {
    save.keep(l.kind, l.id);
    if (now.look) save.look(now.look);
    if (l.kind === "hat" && now.hat === l.id) save.hat(now.hat);
    if (l.kind === "part") save.parts(now.parts);
    return now.look;
  }
  const look = lookWithoutLoan(now.look, l);
  if (look && look !== now.look) save.look(look);
  if (l.kind === "part") save.parts(partsWithoutLoan(now.parts, l));
  return look;
}

/** The ways a night ends in her sleep, and so in her dream of a settled loan (Ed, 2026-10-24): the bed (asleep in the dark while
 *  the next island's made), and a sail (its flight in lands her asleep in bed, the dream there: "there's one dream, always in
 *  bed"). Any other way (a bot game's exit, a debug swap) settles nothing and dreams nothing. */
export const DREAM_WAYS = ["bed", "sail"] as const;
export const dreamsAfter = (way: string): boolean => (DREAM_WAYS as readonly string[]).includes(way);
