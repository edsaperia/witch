// The comparability key (Ed, 2026-10-26: "only compare like with like"; tools/lib/comparable.cjs compares two): what a run of the
// game was, where, on what and with what, so a tool comparing two runs can refuse a pair that differs in more than what's being
// tested. In the playtest log's run (the L key, platform/playtestLog.ts) and every browser bench's result (window.witch.compareKey).
import type { Game } from "../rules/game";
import { browserOs } from "./repro";

export interface CompareKey {
  /** The build's label (vite.config.ts: v4871 and its commit). */
  build: string;
  seed: number;
  /** The campaign's world seed and the island (a kind's, or "home"; "zoo" in the zoo). */
  world: number;
  island: string;
  /** The wave and her mode (ground, treetops, house, zoo) as the key was taken; a playtest log's samples carry their own. */
  scene: string;
  /** Where the samples were taken: "play" for a playtest; a tool names its route or spot. */
  spot: string;
  /** The window in CSS pixels; the art pixel's size, the device's pixel ratio and the canvas it makes. */
  viewport: string;
  pixelScale: string;
  /** The GPU as WebGL names it (unmasked where it can). */
  renderer: string;
  /** The browser and OS, cores and memory. */
  machine: string;
  /** Every setting changed from the build's (the decision sliders, the link's set=) and the link's own switches but where. */
  knobs: Record<string, unknown>;
}

/** The link's switches that say where, not how: the key has them in its own fields. */
const WHERE = new Set(["seed", "world", "island", "at", "wave", "mode", "zoom", "found", "cleared", "hat", "parts", "spell", "set", "decide"]);

/** Her mode as a scene: the zoo, the treehouse (perched), the treetops or the ground. */
export function sceneMode(g: Game): string {
  if (g.tuning.map?.shape === "zoo") return "zoo";
  const w = g.witches[0]?.body;
  return w?.perch ? "house" : w?.mode === "treetop" ? "treetops" : "ground";
}

export function compareKey(o: { build: string; game: Game; canvas: { width: number; height: number }; window?: { width: number; height: number }; renderer: string; changed: [string, unknown][]; params: URLSearchParams; spot?: string; dpr?: number; nav?: { userAgent: string; hardwareConcurrency?: number; deviceMemory?: number } }): CompareKey {
  const g = o.game, t = g.tuning, nav = o.nav;
  const knobs: Record<string, unknown> = Object.fromEntries(o.changed);
  for (const [k, v] of o.params) if (!WHERE.has(k)) knobs[`?${k}`] = v;
  return {
    build: o.build, seed: g.seed, world: t.map?.world ?? 0, island: t.map?.shape === "zoo" ? "zoo" : t.map?.island || "home",
    scene: `wave ${g.party.wave} · ${sceneMode(g)}`, spot: o.spot ?? "play",
    viewport: o.window ? `${o.window.width}x${o.window.height}` : "?", pixelScale: `${t.pixelSize} @${o.dpr ?? 1} (canvas ${o.canvas.width}x${o.canvas.height})`,
    renderer: o.renderer,
    machine: nav ? [browserOs(nav.userAgent), nav.hardwareConcurrency ? `${nav.hardwareConcurrency} cores` : "", nav.deviceMemory ? `${nav.deviceMemory} GB` : ""].filter(Boolean).join(" · ") : "?",
    knobs,
  };
}

/** The GPU's name as WebGL gives it (unmasked where the browser allows). */
export function rendererOf(gl: WebGLRenderingContext | WebGL2RenderingContext): string {
  const dbg = gl.getExtension("WEBGL_debug_renderer_info");
  return `${gl.getParameter(dbg ? dbg.UNMASKED_RENDERER_WEBGL : gl.RENDERER)}`;
}
