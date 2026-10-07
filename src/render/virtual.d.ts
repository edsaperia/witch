// Modules the build makes (vite.config.ts).
declare module "virtual:art-overrides" {
  /** Hand-drawn frames by species/pose: their size and RGBA pixels, base64 (src/render/overrides.ts). */
  const raw: Record<string, { w: number; h: number; px: string }>;
  export default raw;
}
