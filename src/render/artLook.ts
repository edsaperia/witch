// Whole helpers moved from artBuild; drawing bodies are unchanged.
import * as Art from "./artLook.primitives";
import type { Style } from "./style";
import type { FrameGround } from "./artBuild";

/** A witch sprite's ground from its anchors (art/witch.js liftShadow), or null. */
export function groundOf(anchors?: Record<string, number[]> | null): FrameGround | null {
  const g = anchors?.ground, s = anchors?.shadow;
  return g ? { x: g[0], y: g[1], w: s?.[0] ?? 0, d: s?.[1] ?? 0 } : null;
}

/** Our witch's look and colours from her genome (art/witchGenome.js; null: the classic witch, the style's hues on top). */
export function witchLookOf(st: Style, genome: unknown): { look: object | undefined; colours: object } {
  if (!genome) return { look: undefined, colours: Art.witchColours(st) };
  const { look, outfit } = (Art.genomeLook as (g: unknown) => { look: object; outfit: object | null })(genome);
  const colours = Art.witchColours as (st: Style, outfit?: object, o?: { styleHues?: boolean }) => object;
  return { look, colours: outfit ? colours(st, outfit, { styleHues: false }) : colours(st) };
}
