/** Stage 0 only. Ed, 2026-10-28: pixel cores/halos, capped light, temporary imprints. */
export const MOCK_FORMS = ["bolt", "burst", "beam", "aura"] as const;
export const MOCK_INTENSITIES = [0.25, 0.6, 1] as const;
export const MOCK_LIGHT_CAP = 6;
export type MockForm = typeof MOCK_FORMS[number];
export const mockEnvelope = (time: number): number => {
  const t = ((time % 8) + 8) % 8;
  return Math.min(1, t / 0.35, Math.max(0, (3 - t) / 0.8));
};
/** Frost arrives after the blast and thaws completely before the next one. */
export const mockFrost = (time: number): number => {
  const t = ((time % 8) + 8) % 8;
  return Math.min(1, Math.max(0, (t - 0.5) / 0.5), Math.max(0, (6 - t) / 2));
};
export function frostPalette(palette: Uint8Array): Uint8Array {
  const out = new Uint8Array(256 * 4 * 2);
  out.set(palette.subarray(0, 1024));
  for (let i = 0; i < 256; i++) {
    const k = i * 4, l = (palette[k] * 0.3 + palette[k + 1] * 0.55 + palette[k + 2] * 0.15) / 255;
    out.set([Math.round(90 + l * 150), Math.round(145 + l * 105), Math.round(180 + l * 75), palette[k + 3]], 1024 + k);
  }
  return out;
}
export function mockLightSlots(existing: number, budget: number, requested: number): number {
  return Math.max(0, Math.min(MOCK_LIGHT_CAP, requested, Math.floor(budget) - existing));
}
