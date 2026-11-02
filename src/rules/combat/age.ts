import raw from "../../../config/combat-age.json";
export type AgeProfile = typeof raw.neutral;
export const AGE: {neutral: AgeProfile; youth: AgeProfile; adult: AgeProfile; legend: AgeProfile} = raw;
/** Age modifies numerical traits, not a creature's movement/attack identity. Babies stay neutral. */
export const ageProfile = (level?: number): AgeProfile => level === 1 ? AGE.youth : level === 2 ? AGE.adult : level === 3 ? AGE.legend : AGE.neutral;
