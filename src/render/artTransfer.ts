import type { ArtResult } from "./artBuild";

/** The buffers a result can hand over to the page without copying. No drawing imports. */
export const transferables = (r: ArtResult): ArrayBuffer[] =>
  [r.px.albedo.buffer, r.px.normal.buffer, ...(r.px.albedoPal ? [r.px.albedoPal.buffer] : []), ...(r.px.normalPal ? [r.px.normalPal.buffer] : []), ...(r.floor ? [r.floor.albedo.buffer, r.floor.normal.buffer] : []), ...(r.disco ? [r.disco.base.px.buffer, r.disco.lit.px.buffer] : []), ...(r.housePiece ? [r.housePiece.px.buffer] : []), ...(r.mask ? [r.mask.buffer] : [])] as ArrayBuffer[];
