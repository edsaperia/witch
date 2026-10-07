// The soundsystem alarm (Ed, 2026-10-06: "We should have an indicator for when a soundsystem or speaker is being attacked
// offscreen. It can look like the 🎶 indicator, but with 🔇"): for each soundsystem under attack (rules/alarms.ts, the
// newest few) that is off screen, a cue on the screen's edge toward it like the wave pointer's (render/indicator.ts): a
// ring, 🔇 in pixels in the middle, an arrowhead toward it and its distance. The ring is its health, draining clockwise
// as it is hit; each blow shakes the cue and swells it a moment; a fallen one flashes once and fades. It hides when the
// soundsystem comes on screen and a few seconds after the blows stop, in either mode (treetops or ground).
import * as THREE from "three";
import type { Alarm, AlarmTuning } from "../rules/alarms";
import { arrowPixels, edgeLayout, edgeSpot, N, PixelCue } from "./indicator";

/** 🔇 in pixels: a speaker, its cone opening right, and a cross (`+`, in the alarm's red) beside it. */
export const MUTED = [
  ".....##........",
  "....###........",
  "...####........",
  "######..+...+..",
  "######...+.+...",
  "######....+....",
  "######....+....",
  "######...+.+...",
  "######..+...+..",
  "...####........",
  "....###........",
  ".....##........",
];
const INK = [236, 228, 214], RED = [238, 86, 74], DIM = [120, 52, 48], WHITE = [255, 250, 240];
const SHAKE = 0.35; // seconds a blow shakes it
const SCALE = 3, TOP = 3; // screen pixels per art pixel (as the wave pointer); the soundsystem's top, metres up

export class AlarmIndicators {
  private cues: PixelCue[] = [];
  private v = new THREE.Vector3();
  constructor(private parent: HTMLElement) {}

  /** Draw `list` (rules/alarms.ts shownAlarms), seen from the witch at (wx, wz); width and height: the screen (CSS pixels). */
  update(camera: THREE.Camera, width: number, height: number, list: readonly Alarm[], wx: number, wz: number, time: number, T: AlarmTuning): void {
    while (this.cues.length < list.length) this.cues.push(new PixelCue(this.parent, SCALE));
    this.cues.forEach((c, i) => {
      const a = list[i];
      if (!a) { c.hide(); return; }
      const e = edgeSpot(this.v, camera, width, height, a.x, a.z, wx, wz, TOP);
      if (e.show <= 0.01) { c.hide(); return; } // (on screen: she can see it)
      const fell = a.fellAt !== null ? time - a.fellAt : -1, age = time - a.hitAt, kick = fell < 0 ? Math.max(0, 1 - age / SHAKE) : 0;
      const flash = fell >= 0 && fell < 0.25 ? 1 : 0;
      const fade = fell >= 0 ? Math.max(0, 1 - Math.max(0, fell - 0.25) / Math.max(0.05, T.fall - 0.25)) : Math.min(1, Math.max(0, (T.linger - age) / 0.6));
      // Kept clear of the other cues on the edge (render/indicator.ts edgeLayout): the wave pointer, her hat's, each other.
      const { x, y } = edgeLayout.claim(e.ex, e.ey, e.angle, N * SCALE * 0.42), tx = -Math.sin(e.angle), ty = Math.cos(e.angle);
      const shake = kick * Math.sin(time * 70) * 5;
      c.place(x + tx * shake, y + ty * shake, 1 + 0.18 * kick);
      c.canvas.style.opacity = c.label.style.opacity = `${(e.show * fade).toFixed(2)}`;
      c.clear();
      // The ring: its health, clockwise from 12 o'clock, red; what's lost, dim. Brighter on a blow; white as it falls.
      const R = 13, left = a.hp / Math.max(1, a.max), hot = RED.map(v => Math.min(255, v + 60 * kick));
      for (let py = 0; py < N; py++) for (let px = 0; px < N; px++) {
        const dx = px + 0.5 - N / 2, dy = py + 0.5 - N / 2;
        if (Math.abs(Math.hypot(dx, dy) - R) > 0.7) continue;
        const turn = ((Math.atan2(dx, -dy) / (Math.PI * 2)) + 1) % 1;
        c.dot(px, py, flash ? WHITE : turn <= left ? hot : DIM, 1);
      }
      const ox = Math.floor((N - MUTED[0].length) / 2), oy = Math.floor((N - MUTED.length) / 2);
      MUTED.forEach((row, ry) => [...row].forEach((ch, rx) => { if (ch === "#") c.dot(ox + rx, oy + ry, flash ? WHITE : INK, 1); else if (ch === "+") c.dot(ox + rx, oy + ry, flash ? WHITE : hot, 1); }));
      for (const [px, py] of arrowPixels(e.angle, N, R + 2, R + 7, 3.5)) c.dot(px, py, flash ? WHITE : hot, 1);
      c.flush();
      // Its distance, on the far side from the arrow.
      const dist = Math.hypot(a.x - wx, a.z - wz);
      c.say(`${Math.round(dist)} m`, `rgb(${RED.join(",")})`, x, y, -Math.cos(e.angle), -Math.sin(e.angle), (R + 1.5) * SCALE);
    });
  }
}
