// The telescope in the crow's nest (Ed, 2026-10-21; rules/telescope.ts): E at it looks through it, full screen, with a soft
// vignette and a small readout of its bearing and zoom and the keys (his answer to the mock: "full screen with a soft vignette,
// not the brass lens"); E or Esc leaves. While she looks she stands still (main.ts holds her controls) and the night runs on at
// the house's tenth round her; the view draws from the crow's nest (render/view/camera.ts placeTelescope), at half resolution on
// an integrated GPU (Ed's Intel UHD).
import { compassPoint, newTelescope, stepTelescope, telescopeAim, telescopeFov, telescopeMagnification, telescopePitch, type Telescope, type TelescopeTuning } from "../rules/telescope";

export class TelescopeView {
  private aim: Telescope | null = null;
  private readonly el: HTMLDivElement;
  private readonly readout: HTMLDivElement;
  /** The night it was opened on: another night closes it (main.ts). */
  night: unknown = null;
  /** Called as she starts and stops looking. */
  onChange: (on: boolean) => void = () => {};

  constructor(host: HTMLElement, vignette: number) {
    this.el = document.createElement("div");
    this.el.className = "telescope";
    Object.assign(this.el.style, {
      position: "fixed", inset: "0", pointerEvents: "none", zIndex: "6", display: "none",
      background: `radial-gradient(ellipse 75% 80% at 50% 50%, rgba(0,0,0,0) 55%, rgba(2,1,6,${vignette}) 100%)`,
    });
    this.readout = document.createElement("div");
    Object.assign(this.readout.style, {
      position: "absolute", left: "0", right: "0", bottom: "18px", textAlign: "center", color: "rgba(240,226,190,0.8)",
      font: "12px ui-monospace, monospace", letterSpacing: "0.5px", textShadow: "0 1px 2px #000", whiteSpace: "pre",
    });
    this.el.append(this.readout);
    host.append(this.el);
    // Esc leaves (ahead of the freeze's Esc: platform/freeze.ts), only while she looks.
    addEventListener("keydown", e => { if (this.aim && e.code === "Escape") { e.preventDefault(); e.stopImmediatePropagation(); this.close(); } }, { capture: true });
  }

  get on(): boolean { return this.aim !== null; }

  open(night: unknown): void {
    if (this.aim) return;
    this.aim = newTelescope();
    this.night = night;
    this.el.style.display = "";
    this.onChange(true);
  }

  close(): void {
    if (!this.aim) return;
    this.aim = null;
    this.el.style.display = "none";
    this.onChange(false);
  }

  /** Point it (the tools' shots: tools/telescope/shots.cjs). */
  point(heading: number, zoom: number, T: TelescopeTuning): void { if (this.aim) { this.aim = { heading, zoom }; this.show(T); } }

  /** A frame (real seconds): her stick or keys pan and zoom it, the wheel zooms, E leaves. */
  step(c: { moveX: number; moveZ: number; zoom?: number; sigil?: boolean }, dt: number, T: TelescopeTuning): void {
    if (!this.aim) return;
    if (c.sigil) { this.close(); return; }
    this.aim = stepTelescope(this.aim, c, dt, T);
    this.show(T);
  }

  /** The readout: its bearing and zoom, and the keys. */
  private show(T: TelescopeTuning): void {
    if (!this.aim) return;
    const h = Math.round(this.aim.heading) % 360;
    this.readout.textContent = `${compassPoint(h)} ${String(h).padStart(3, " ")}°  ·  ×${telescopeMagnification(T, this.aim.zoom).toFixed(1)}\n◀ ▶ look round   ▲ ▼ zoom   E leave`;
  }

  /** Where the view looks this frame (render/view.ts telescope), or null when she isn't looking. */
  look(eye: number, T: TelescopeTuning): { heading: number; fov: number; pitch: number } | null {
    if (!this.aim) return null;
    return { heading: this.aim.heading, fov: telescopeFov(T, this.aim.zoom), pitch: telescopePitch(eye, telescopeAim(T, this.aim.zoom), T.bend) };
  }
}

/** Whether the page draws on an integrated GPU (Intel's: Ed's laptop), where the telescope draws at lowGpuResolution. */
export function integratedGpu(gl: WebGLRenderingContext | WebGL2RenderingContext): boolean {
  try {
    const ext = gl.getExtension("WEBGL_debug_renderer_info"), name = String(gl.getParameter(ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER) ?? "");
    return /intel/i.test(name);
  } catch { return false; }
}
