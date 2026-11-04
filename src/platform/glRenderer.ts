// The GPU's name as WebGL gives it (unmasked where the browser allows), asked once a context. Each ask is a round trip to the GPU
// that waits for everything drawn so far (the frame-sync hunt, 2026-11-04: the playtest log's comparability key asked every
// sample, 0.7 s of a cloud run's JavaScript, a frame's GPU time where the graphics are the bottleneck), and it never changes.
type GL = Pick<WebGLRenderingContext, "getExtension" | "getParameter" | "RENDERER">;
const names = new WeakMap<object, unknown>();

/** The renderer's name (getParameter's own value: a string, or null on a lost context, which isn't kept). */
export function glRendererName(gl: GL): unknown {
  if (names.has(gl)) return names.get(gl);
  const dbg = gl.getExtension("WEBGL_debug_renderer_info") as { UNMASKED_RENDERER_WEBGL: number } | null;
  const name = gl.getParameter(dbg ? dbg.UNMASKED_RENDERER_WEBGL : gl.RENDERER) as unknown;
  if (name !== null && name !== undefined) names.set(gl, name);
  return name;
}
