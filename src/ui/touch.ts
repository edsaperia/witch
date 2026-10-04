// Phone controls: a joystick wherever the left thumb lands, a rise/descend button on the right,
// zoom buttons above it, Talk (held) and Sigil buttons beside it, and a three-finger tap for the
// debug overlay.
import type { TouchInput } from "../platform/input";

export function setupTouch(root: HTMLElement, touch: TouchInput): void {
  const pad = root.querySelector<HTMLElement>("#stick")!, knob = pad.querySelector<HTMLElement>(".knob")!;
  const R = 56;
  let stickId: number | null = null, ox = 0, oy = 0;
  const show = () => root.classList.add("touch");

  const zone = root.querySelector<HTMLElement>("#stick-zone")!;
  zone.addEventListener("pointerdown", e => {
    if (e.pointerType === "mouse" || stickId !== null) return;
    show();
    stickId = e.pointerId; ox = e.clientX; oy = e.clientY;
    pad.style.left = ox + "px"; pad.style.top = oy + "px"; pad.classList.add("on");
    try { zone.setPointerCapture(e.pointerId); } catch { /* the stick still follows moves over the zone */ }
    e.preventDefault();
  });
  zone.addEventListener("pointermove", e => {
    if (e.pointerId !== stickId) return;
    let dx = e.clientX - ox, dy = e.clientY - oy;
    const d = Math.hypot(dx, dy);
    if (d > R) { dx *= R / d; dy *= R / d; }
    knob.style.transform = `translate(${dx}px, ${dy}px)`;
    const m = Math.min(1, d / R), dz = 0.15;
    const s = m < dz ? 0 : (m - dz) / (1 - dz) / Math.max(1e-6, m);
    touch.x = (dx / R) * s; touch.y = (dy / R) * s;
  });
  const end = (e: PointerEvent) => {
    if (e.pointerId !== stickId) return;
    stickId = null; touch.x = 0; touch.y = 0;
    knob.style.transform = ""; pad.classList.remove("on");
  };
  zone.addEventListener("pointerup", end);
  zone.addEventListener("pointercancel", end);

  const button = (id: string, act: () => void) => {
    const b = root.querySelector<HTMLElement>(id)!;
    b.addEventListener("pointerdown", e => { e.preventDefault(); e.stopPropagation(); act(); b.classList.add("down"); });
    b.addEventListener("pointerup", () => b.classList.remove("down"));
    b.addEventListener("pointerleave", () => b.classList.remove("down"));
  };
  button("#rise", () => (touch.toggle = true));
  button("#zoom-in", () => (touch.zoom -= 1));
  button("#zoom-out", () => (touch.zoom += 1));
  button("#sigil", () => (touch.sigil = true));
  button("#spell", () => (touch.spell = true));
  button("#cycle", () => (touch.cycle = true));
  button("#dash", () => (touch.dash = true));
  // Talk is held: on while the finger is down.

  window.addEventListener("touchstart", e => { show(); if (e.touches.length === 3) touch.debug = true; }, { passive: true });
}
