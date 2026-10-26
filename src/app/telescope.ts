// The telescope in the crow's nest (Ed, 2026-10-21; rules/telescope.ts): walking up to it looks through it (Ed, 2026-10-23: "opens
// when you walk up to it, look around with aiming keys": main.ts, rules/stations.ts, as the map table's chart), full screen, with a
// compass strip along its top (Ed: "Telescope view has a compass at the top") and a soft
// vignette and a small readout of its bearing, its tilt and zoom and the keys (his answer to the mock: "full screen with a soft vignette,
// not the brass lens"); E or Esc leaves. While she looks she stands still (main.ts holds her controls) and the night runs on at
// the house's tenth round her; the view draws from the crow's nest (render/view/camera.ts placeTelescope), at telescope.resolution
// (lowGpuResolution on an integrated GPU, Ed's Intel UHD).
import { newTelescope, stepTelescope, telescopeFov, telescopeMagnification, turnTelescope, wrapBearing, type Telescope, type TelescopeTuning } from "../rules/telescope";

/** The arrow keys, while she looks: the telescope's (taken before the game's input sees them, as a station's panel takes them). */
const ARROWS: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
/** The compass strip: degrees across it, and its size in art pixels (drawn at 2 screen pixels each). */
const STRIP = { span: 120, w: 240, h: 15, px: 2 };

/** The vignette's CSS: dark toward the edges by `v` (0 none, 1 near black). */
const vignetteCss = (v: number): string => `radial-gradient(ellipse 75% 80% at 50% 50%, rgba(0,0,0,0) 55%, rgba(2,1,6,${v}) 100%)`;

export class TelescopeView {
  private aim: Telescope | null = null;
  private readonly el: HTMLDivElement;
  private readonly readout: HTMLDivElement;
  private readonly strip: HTMLCanvasElement;
  /** The arrow keys held, and the mouse's movement since the last step (CSS pixels). */
  private readonly held = new Set<string>();
  private mouse = { x: 0, y: 0, at: null as { x: number; y: number } | null };
  /** The night it was opened on: another night closes it (main.ts). */
  night: unknown = null;
  /** Called as she starts and stops looking. */
  onChange: (on: boolean) => void = () => {};

  /** Its vignette as drawn (telescope.vignette: how dark its edges). */
  private vignette: number;

  constructor(host: HTMLElement, vignette: number) {
    this.vignette = vignette;
    this.el = document.createElement("div");
    this.el.className = "telescope";
    Object.assign(this.el.style, {
      position: "fixed", inset: "0", pointerEvents: "none", zIndex: "6", display: "none",
      background: vignetteCss(vignette),
    });
    this.readout = document.createElement("div");
    Object.assign(this.readout.style, {
      position: "absolute", left: "0", right: "0", bottom: "18px", textAlign: "center", color: "rgba(240,226,190,0.8)",
      font: "12px ui-monospace, monospace", letterSpacing: "0.5px", textShadow: "0 1px 2px #000", whiteSpace: "pre",
    });
    this.strip = document.createElement("canvas");
    this.strip.width = STRIP.w; this.strip.height = STRIP.h;
    Object.assign(this.strip.style, { position: "absolute", top: "36px", left: "50%", width: `${STRIP.w * STRIP.px}px`, maxWidth: "80vw", height: `${STRIP.h * STRIP.px}px`, transform: "translateX(-50%)", imageRendering: "pixelated" });
    this.el.append(this.strip, this.readout);
    host.append(this.el);
    // The arrows look round while she looks (WASD too, through her controls: she stands still at it); the mouse as it moves.
    addEventListener("keydown", e => { if (!this.aim || !ARROWS[e.code]) return; e.preventDefault(); e.stopImmediatePropagation(); this.held.add(e.code); }, { capture: true });
    addEventListener("keyup", e => { if (ARROWS[e.code]) this.held.delete(e.code); }, { capture: true });
    addEventListener("blur", () => this.held.clear());
    addEventListener("pointermove", e => { if (e.pointerType !== "mouse") return; const m = this.mouse; if (this.aim && m.at) { m.x += e.clientX - m.at.x; m.y += e.clientY - m.at.y; } m.at = { x: e.clientX, y: e.clientY }; });
    // Esc leaves (ahead of the freeze's Esc: platform/freeze.ts), only while she looks.
    addEventListener("keydown", e => { if (this.aim && e.code === "Escape") { e.preventDefault(); e.stopImmediatePropagation(); this.close(); } }, { capture: true });
  }

  get on(): boolean { return this.aim !== null; }

  open(night: unknown, T: TelescopeTuning): void {
    if (this.aim) return;
    this.aim = newTelescope(T);
    this.night = night;
    this.mouse.x = 0; this.mouse.y = 0; this.held.clear();
    this.el.style.display = "";
    this.onChange(true);
  }

  close(): void {
    if (!this.aim) return;
    this.aim = null;
    this.el.style.display = "none";
    this.onChange(false);
  }

  /** Point it (the tools' shots: tools/telescope/shots.cjs, tools/stars/shots.cjs): its bearing, zoom and elevation (its lowest if
   *  not given). */
  point(heading: number, zoom: number, T: TelescopeTuning, elevation?: number): void { if (this.aim) { this.aim = { heading, zoom, elevation: elevation ?? newTelescope(T).elevation }; this.show(T); } }

  /** Where it points (its bearing, elevation and zoom), or null when she isn't looking. */
  get aiming(): Telescope | null { return this.aim; }

  /** A frame (real seconds), with her controls as read (WASD and the left stick in moveX/moveZ: the arrows are the telescope's):
   *  the aiming keys look round (the arrows, the right stick, the d-pad: main.ts gives it the d-pad), and the mouse as it moves;
   *  the wheel, Z and X and the shoulder buttons zoom; WASD and the left stick look round too (she stands still at it: Ed, 2026-10-26,
   *  "walking away shouldn't work - then we can use the movement keys as buttons"); E (the pad's □) or Esc leaves it. */
  step(c: { moveX: number; moveZ: number; zoom?: number; sigil?: boolean }, dt: number, T: TelescopeTuning): void {
    if (!this.aim) return;
    if (c.sigil) { this.close(); return; }
    let lx = Math.abs(c.moveX) > 0.15 ? c.moveX : 0, ly = Math.abs(c.moveZ) > 0.15 ? c.moveZ : 0;
    for (const k of this.held) { lx += ARROWS[k][0]; ly += ARROWS[k][1]; }
    const pad = [...(navigator.getGamepads?.() ?? [])].find(g => g?.connected);
    if (pad) {
      const b = (i: number) => !!pad.buttons[i]?.pressed, rx = pad.axes[2] ?? 0, ry = pad.axes[3] ?? 0;
      lx += (b(15) ? 1 : 0) - (b(14) ? 1 : 0) + (Math.abs(rx) > 0.18 ? rx : 0);
      ly += (b(13) ? 1 : 0) - (b(12) ? 1 : 0) + (Math.abs(ry) > 0.18 ? ry : 0);
    }
    const l = Math.hypot(lx, ly); if (l > 1) { lx /= l; ly /= l; }
    this.aim = stepTelescope(this.aim, { moveX: lx, moveZ: ly, zoom: c.zoom }, Math.min(dt, 0.1), T); // (a long frame doesn't swing it round)
    // the mouse: the view follows it, a pixel of movement a pixel of the view across (its field over the screen's width)
    const per = telescopeFov(T, this.aim.zoom) / Math.max(1, innerHeight);
    if (this.mouse.x || this.mouse.y) { this.aim = turnTelescope(this.aim, this.mouse.x * per, -this.mouse.y * per, T); this.mouse.x = 0; this.mouse.y = 0; }
    this.show(T);
  }

  /** The readout: its tilt and zoom, and the keys (its bearing is the compass strip's). */
  private show(T: TelescopeTuning): void {
    if (!this.aim) return;
    if (T.vignette !== this.vignette) { this.vignette = T.vignette; this.el.style.background = vignetteCss(T.vignette); } // (live: the pause page's slider)
    const up = Math.round(this.aim.elevation);
    this.drawStrip(this.aim.heading);
    this.readout.textContent = `${up >= 0 ? "up" : "down"} ${Math.abs(up)}°  ·  ×${telescopeMagnification(T, this.aim.zoom).toFixed(1)}\nthe mouse, ◀ ▶ ▲ ▼ or the right stick look round   wheel / Z X zoom   E □ Esc ⏏`;
  }

  /** The compass strip (Ed, 2026-10-23: "Telescope view has a compass at the top"): STRIP.span degrees across, ticks every 15°, the
   *  eight points named, scrolling as she looks round, her bearing marked in the middle with its degrees; drawn at art pixels,
   *  fading out at its ends. */
  private drawStrip(heading: number): void {
    const g = this.strip.getContext("2d"); if (!g) return;
    const { w, h, span } = STRIP, mid = w / 2, per = w / span, ink = "240,226,190";
    g.clearRect(0, 0, w, h);
    g.font = "7px ui-monospace, monospace"; g.textAlign = "center"; g.textBaseline = "alphabetic";
    const names: Record<number, string> = { 0: "N", 45: "NE", 90: "E", 135: "SE", 180: "S", 225: "SW", 270: "W", 315: "NW" };
    const deg = `${Math.round(wrapBearing(heading)) % 360}°`, clear = (x: number) => x > mid - 8 && x < mid + 8 + deg.length * 4; // (her degrees' room)
    const from = Math.ceil((heading - span / 2) / 15) * 15;
    for (let d = from; d <= heading + span / 2; d += 15) {
      const x = Math.round(mid + (d - heading) * per), b = wrapBearing(d), a = 1 - Math.pow(Math.abs(x - mid) / mid, 3) * 0.9, name = names[b];
      g.fillStyle = `rgba(${ink},${(name ? 0.85 : 0.45) * a})`;
      g.fillRect(x, name ? 2 : 4, 1, name ? 4 : 2);
      if (name && !clear(x)) { g.fillStyle = `rgba(${ink},${(b % 90 === 0 ? 0.95 : 0.7) * a})`; g.fillText(name, x, 14); }
    }
    g.fillStyle = `rgba(${ink},0.25)`; g.fillRect(8, 1, w - 16, 1); // (the strip's line)
    g.fillStyle = "rgba(255,214,140,0.95)"; g.fillRect(mid - 2, 0, 5, 1); g.fillRect(mid - 1, 1, 3, 1); g.fillRect(mid, 2, 1, 5); // (her bearing)
    g.fillStyle = "rgba(2,1,6,0.6)"; g.fillRect(mid + 4, 3, deg.length * 4 + 2, 8);
    g.fillStyle = "rgba(255,214,140,0.95)"; g.textAlign = "left"; g.fillText(deg, mid + 5, 10);
  }

  /** Where the view looks this frame (render/view.ts telescope), or null when she isn't looking. */
  look(T: TelescopeTuning): { heading: number; fov: number; pitch: number } | null {
    if (!this.aim) return null;
    return { heading: this.aim.heading, fov: telescopeFov(T, this.aim.zoom), pitch: -this.aim.elevation };
  }
}

/** Whether the page draws on an integrated GPU (Intel's: Ed's laptop), where the telescope draws at lowGpuResolution. */
export function integratedGpu(gl: WebGLRenderingContext | WebGL2RenderingContext): boolean {
  try {
    const ext = gl.getExtension("WEBGL_debug_renderer_info"), name = String(gl.getParameter(ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER) ?? "");
    return /intel/i.test(name);
  } catch { return false; }
}
