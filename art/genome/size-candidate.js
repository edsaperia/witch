import { SIZE_CLASS_BY_ID } from "./size-ranks.js";

// Ed, 2026-10-31: readable small adults, distinct babies/youths, larger
// useful adults and less oversized legends. Review candidate only; callers
// must explicitly opt in. Values are native body pixels at a 43px witch.
export const SIZE_CANDIDATE = "body-range-2026-10-31";
export function candidateSizePixels(id, level, witchHeight = 43) {
  const rank = SIZE_CLASS_BY_ID[id];
  if (rank == null) throw new Error(`No creature size class: ${id}`);
  if (!Number.isInteger(level) || level < 0 || level > 3) throw new Error("Creature age must be 0..3");
  if (!Number.isFinite(witchHeight) || witchHeight <= 0) throw new Error("Witch height must be positive");
  // Piecewise interpolation keeps wolf's medium anchor while letting the
  // largest adults grow without making the small animals unreadable again.
  const adult = rank <= 7 ? 65 + 55 * rank / 7 : 120 + 80 * (rank - 7) / 4;
  const body = level === 0 ? adult * .45 : level === 1 ? adult * .7 : level === 2 ? adult : 200 + 80 * rank / 11;
  return Math.round(body * witchHeight / 43);
}
