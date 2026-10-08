// Hand-drawn sprites (overnight phase 3): a PNG at art/overrides/<species>/<pose>.png takes the place of the generated frame of
// that name, the one art/export.mjs writes as <species>-<pose>.png (<level>-walk<frame>, -away for the back view: adult-walk0,
// adult-walk1-away...). The build reads them (vite.config.ts, virtual:art-overrides) and the art workers bake them in as they
// are (art/overrides/README.md). A level with any of them is drawn from its frames everywhere: the live rig leaves it be.
import RAW from "virtual:art-overrides";

export interface Override { w: number; h: number; rgba: Uint8ClampedArray }

const LEVEL_NAMES = ["baby", "young", "adult", "legend"];
const decoded = new Map<string, Override>();

/** The pose name of a creature frame, as art/export.mjs names it: adult-walk0, baby-walk1-away. */
export const poseName = (level: number, frame: number, away: boolean) => `${LEVEL_NAMES[level]}-walk${frame}${away ? "-away" : ""}`;

/** The hand-drawn frame for a species' pose, if there is one. */
export function overrideFor(species: string, pose: string): Override | undefined {
  const k = `${species}/${pose}`, raw = RAW[k];
  if (!raw) return undefined;
  let o = decoded.get(k);
  if (!o) {
    const bin = atob(raw.px), rgba = new Uint8ClampedArray(bin.length);
    for (let i = 0; i < bin.length; i++) rgba[i] = bin.charCodeAt(i);
    decoded.set(k, (o = { w: raw.w, h: raw.h, rgba }));
  }
  return o;
}

/** Whether any frame of this species at this level is hand-drawn (so the live rig doesn't draw it). */
export const hasOverride = (species: string, level: number): boolean => LEVELS_DRAWN.has(`${species}/${LEVEL_NAMES[level]}`);
const LEVELS_DRAWN = new Set(Object.keys(RAW).map(k => k.slice(0, k.indexOf("-"))));

/** Every hand-drawn frame's key (species/pose). */
export const OVERRIDES = Object.keys(RAW);
