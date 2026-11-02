import raw from '../../config/playtest-render.json';
/** Current render values are the single source of pause-control defaults. */
export const MUSHROOM_LIGHT_DEFAULTS = {
  haloStrength: raw.mushroomHaloStrength, poolStrength: raw.mushroomPoolStrength, capGlow: raw.mushroomSpotGain,
  radius: raw.mushroomHaloRadius, height: raw.mushroomHaloHeight, complement: raw.mushroomComplement, testRow: raw.mushroomTestRow,
};
export type MushroomLight = typeof MUSHROOM_LIGHT_DEFAULTS;
