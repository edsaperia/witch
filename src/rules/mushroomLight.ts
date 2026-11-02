import raw from '../../config/tuning.json';
/** Canonical tuning owns live defaults; the historical capture file retains its original comparison values. */
export const MUSHROOM_LIGHT_DEFAULTS = {...raw.mushroomLight};
export type MushroomLight = typeof MUSHROOM_LIGHT_DEFAULTS;
