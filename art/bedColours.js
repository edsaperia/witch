// The bed's covers' colours: its duvet, the duvet's stripe and its sheets and pillows' linen (art/furniture.js, the house's
// palette: CLOTH, BODY3 and BELLY), shared with her in-bed frames (art/witch.js inBed and bedStretch: the covers over her legs and lap), so
// the covers on her are the bed's own (Ed, 2026-11-07, on #1908: "maybe draw covers over her legs").
export const BED_COVERS = { duvet: [92, 40, 96], stripe: [110, 78, 132], sheet: [236, 226, 206] };
/** The duvet and its stripe on her: as the bed shows them in the house's warm light (render/housePieces.ts roomLight, baked into the
 *  bed's pixels: measured beside her at the alarm, about [143, 54, 59] and [184, 90, 82]), less what her own light does to a colour
 *  (her shading, render/witchLight.ts, warm and dimmer in blue), so her covers look the bed's own beside it. */
export const COVERS_ON_HER = { duvet: [146, 50, 82], stripe: [188, 84, 112] };
