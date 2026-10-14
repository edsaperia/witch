// What a builder needs to reproduce a bug from a screenshot of the debug overlay (~) alone (Ed, 2026-10-14: "put as much as you
// need in the overlay to help debugging"): a link that rebuilds the world as she saw it and puts her where she was, the machine
// it ran on, and every setting changed from the build's. The same goes in the playtest log (L). The link's switches are
// honoured by applyRepro (the game, once made) and by tuningFromLink (?found=, ?set=: before the map is made).
import { STEP, stepGame, type Controls, type Game } from "../rules/game";
import { clearArea, resetPulse } from "../rules/party";
import { bootSeconds } from "../rules/bootRing";
import { newCamera } from "../rules/camera";
import { witchHeight } from "../rules/witch";
import { setKnob, knobAt } from "../ui/decisions";

/** The link's switches the repro link writes itself (anything else on the page's own link is carried over as it was). */
export const REPRO_KEYS = ["seed", "world", "found", "hat", "broom", "wave", "cleared", "at", "mode", "zoom", "creator", "spell", "set"] as const;
/** Tuning paths every load sets from elsewhere: never listed as changed. The link's own switches, the chart's save and her loadout
 *  (app/linkParams.ts); the beat from the music style (the same); the prop generator, always on (app/viewParams.ts). */
const SET_ELSEWHERE = new Set(["map.found", "map.world", "spells.hat", "spells.broom", "paths.fingerposts", "beat.bpm", "beat.tempos", "beat.blockBars", "beat.rampBars", "partyObjects.generated"]);

/** Every leaf (a number, string, boolean or list) where `live` differs from `base`, by its dotted path; `_` notes skipped. */
export function tuningDiff(live: unknown, base: unknown, prefix = "", out: [string, unknown][] = []): [string, unknown][] {
  if (live && base && typeof live === "object" && typeof base === "object" && !Array.isArray(live) && !Array.isArray(base)) {
    const keys = new Set([...Object.keys(live), ...Object.keys(base)]);
    for (const k of keys) if (!k.startsWith("_")) tuningDiff((live as Record<string, unknown>)[k], (base as Record<string, unknown>)[k], prefix ? `${prefix}.${k}` : k, out);
  } else if (JSON.stringify(live) !== JSON.stringify(base) && !SET_ELSEWHERE.has(prefix)) out.push([prefix, live]);
  return out;
}

/** ?set=path=value;path=value: tuning overrides for this load, each value as JSON (else as a string), only on paths that exist. */
export function applySet(tuning: object, raw: string | null): void {
  if (!raw) return;
  for (const part of raw.split(";")) {
    const i = part.indexOf("=");
    if (i <= 0) continue;
    const path = part.slice(0, i), text = part.slice(i + 1);
    if (knobAt(tuning, path.split(".").slice(0, -1).join(".") || "") === undefined && path.includes(".")) continue; // (its parent must exist)
    let v: unknown = text;
    try { v = JSON.parse(text); } catch { /* a plain string */ }
    setKnob(tuning, path, v);
  }
}
export const setText = (diff: [string, unknown][]): string => diff.map(([p, v]) => `${p}=${JSON.stringify(v)}`).join(";");

/** The game state the link rebuilds. */
export interface ReproState { seed: number; world?: number; found: string[]; hat: string; broom: string; wave: number; cleared: string[]; at?: [number, number]; mode?: "ground" | "treetop"; zoom: number; set: string }
export function reproState(g: Game, changed: [string, unknown][]): ReproState {
  const w = g.witch, m = g.tuning.map, onDecks = !!w.seated || !!w.perch;
  return {
    seed: g.seed, world: m?.world, found: [...(m?.found ?? [])], hat: g.spells.hat, broom: g.spells.broom,
    wave: g.party.wave, cleared: [...(g.party.ahead ?? [])].map(k => k.replace(",", "_")),
    ...(onDecks ? {} : { at: [Math.round(w.x), Math.round(w.z)] as [number, number], mode: w.lift >= 0.5 ? "treetop" as const : "ground" as const }),
    zoom: g.camera.zoomStep, set: setText(changed),
  };
}
/** The repro link's query: the page's own switches carried over, then the state's. */
export function reproQuery(s: ReproState, page: URLSearchParams): string {
  const p = new URLSearchParams(page);
  for (const k of REPRO_KEYS) p.delete(k);
  for (const k of [...p.keys()]) if (k === "debug" || k === "playtest") p.delete(k);
  const q: [string, string][] = [["seed", String(s.seed)]];
  if (s.world !== undefined) q.push(["world", String(s.world)]);
  q.push(["found", s.found.join(",")], ["hat", s.hat], ["broom", s.broom]); // (always: a builder's own save would stand in otherwise)
  if (s.wave > 0) q.push(["wave", String(s.wave)]);
  if (s.cleared.length) q.push(["cleared", s.cleared.join(",")]);
  if (s.at) q.push(["at", s.at.join(",")], ["mode", s.mode!]);
  q.push(["zoom", String(s.zoom)], ["creator", "0"]);
  if (s.set) q.push(["set", s.set]);
  const tail = p.toString(), head = q.map(([k, v]) => `${k}=${encodeURIComponent(v).replace(/%2C/g, ",").replace(/%3D/g, "=").replace(/%3B/g, ";")}`).join("&");
  return `?${head}${tail ? "&" + tail : ""}&debug`;
}

/** The repro link's switches on a game just made (before play): the waves brought on as N brings them (`?wave=N`: the party's
 *  areas, its soundsystems and the route as at that wave; the fights between aren't replayed), the boot over, the areas
 *  cleared early (`?cleared=cx_cy,...`), her place and mode (`?at=x,z&mode=ground|treetop`, off her decks) and the zoom step. */
export function applyRepro(g: Game, params: URLSearchParams): void {
  const wave = Math.round(Number(params.get("wave")));
  const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
  if (Number.isFinite(wave) && wave > 0) {
    const was = g.clock.paused;
    g.clock.paused = false;
    for (let i = 0; i < Math.min(wave, 200) && g.party.wave < wave; i++) stepGame(g, { ...idle, nextWave: true }, STEP);
    // (the boot long over, the home ring all speakers, the pulse on from the last stone)
    g.party.bootFrom = g.clock.time - bootSeconds(g.map) - 1; g.party.bootUntil = g.clock.time;
    for (let i = 0; i < g.speakerBoot.length; i++) g.speakerBoot[i] ??= g.clock.time - 10;
    resetPulse(g.party, g.map, g.clock.time);
    g.clock.paused = was;
  }
  for (const c of (params.get("cleared") ?? "").split(",").filter(Boolean)) {
    const [cx, cy] = c.split("_").map(Number);
    if (Number.isFinite(cx) && Number.isFinite(cy)) clearArea(g.party, g.map, [cx, cy], g.clock.time);
  }
  const at = (params.get("at") ?? "").split(",").map(Number);
  if (at.length === 2 && at.every(Number.isFinite)) {
    const treetop = params.get("mode") === "treetop";
    g.witch = { ...g.witch, x: at[0], z: at[1], mode: treetop ? "treetop" : "ground", lift: treetop ? 1 : 0, seated: false, perch: undefined, vx: 0, vz: 0 };
    g.camera = newCamera(g.tuning, at[0], witchHeight(g.witch, g.tuning), at[1]);
    g.camera.intro = 0;
    g.introFocus = undefined;
  }
  const zoom = params.get("zoom");
  if (zoom !== null && Number.isFinite(Number(zoom))) {
    const steps = Math.max(1, g.tuning.camera.zoomSteps), s = Math.max(0, Math.min(steps - 1, Math.round(Number(zoom))));
    g.camera.zoomStep = s; g.camera.zoom = steps > 1 ? s / (steps - 1) : 0;
  }
}

/** The machine (once): the GPU and WebGL, the browser and OS, the screen and the canvas. */
export function machineLines(gl: WebGLRenderingContext | WebGL2RenderingContext, canvas: HTMLCanvasElement, pixelSize: number): string[] {
  const dbg = gl.getExtension("WEBGL_debug_renderer_info");
  const gpu = dbg ? `${gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)}` : `${gl.getParameter(gl.RENDERER)}`;
  const vendor = dbg ? `${gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL)}` : `${gl.getParameter(gl.VENDOR)}`;
  const hp = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT), highp = !!hp && hp.precision > 0;
  const webgl = typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext ? "WebGL2" : "WebGL1";
  const max = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  return [
    `gpu    ${gpu.slice(0, 90)} (${vendor.slice(0, 30)})`,
    `gl     ${webgl}  highp ${highp ? "yes" : "NO"}  max tex ${max}  ${browserOs()}`,
    `screen ${screen.width}×${screen.height} @${devicePixelRatio}  window ${innerWidth}×${innerHeight}  canvas ${canvas.width}×${canvas.height} (px ${pixelSize})`,
  ];
}
/** The browser and its version, and the OS, from the user agent (compact). */
export function browserOs(ua = navigator.userAgent): string {
  const m = ua.match(/(Edg|OPR|Firefox|Chrome|Version)\/(\d+)/), safari = /Safari\//.test(ua) && !/Chrome\//.test(ua);
  const name = !m ? "?" : m[1] === "Edg" ? "Edge" : m[1] === "OPR" ? "Opera" : m[1] === "Version" && safari ? "Safari" : m[1];
  const os = /Windows NT/.test(ua) ? "Windows" : /iPhone|iPad/.test(ua) ? "iOS" : /Mac OS X/.test(ua) ? "macOS" : /Android/.test(ua) ? "Android" : /CrOS/.test(ua) ? "ChromeOS" : /Linux/.test(ua) ? "Linux" : "?";
  return `${name} ${m?.[2] ?? ""} ${os}`.replace(/\s+/g, " ").trim();
}

/** Text cut into lines of at most `width` characters, the first after `label`, the rest indented to match. */
export function wrapLines(label: string, text: string, width = 96): string[] {
  const out: string[] = [], pad = " ".repeat(label.length);
  for (let i = 0; i < text.length || i === 0; i += width) out.push((i ? pad : label) + text.slice(i, i + width));
  return out;
}
/** The settings changed, compact: path=value, a few a line, at most `max` (then how many more). */
export function settingsLines(diff: [string, unknown][], max = 12): string[] {
  if (!diff.length) return ["set    (all as built)"];
  const items = diff.slice(0, max).map(([p, v]) => `${p}=${JSON.stringify(v).slice(0, 40)}`);
  const lines: string[] = [];
  for (let i = 0; i < items.length; i += 3) lines.push((i ? "       " : "set    ") + items.slice(i, i + 3).join("  "));
  if (diff.length > max) lines.push(`       +${diff.length - max} more (in the link and the L log)`);
  return lines;
}
