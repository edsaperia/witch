// The soundsystems' laser shows (rules in rules/lasers.ts): thin beams fanned from each playing
// soundsystem's top far up into the sky, sweeping to the beat, coming and going in bursts. Drawn
// as 1 px additive lines (glow and bloom only: no light), fading along their length and with
// distance from the witch, so many partified areas in view stay readable. A newly partified
// area's first burst fires as it finishes rising: the reveal.
import { beatTime } from "../rules/beat";
import * as THREE from "three";
import type { Game } from "../rules/game";
import { beatClock, laserShow } from "../rules/lasers";
import type { Playing } from "./party";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";

const VERT = /* glsl */ `
attribute vec4 aCol; // rgb, alpha
attribute float aU;  // 0 at the source, 1 at the far end
varying vec4 vCol;
varying float vU;
${HEIGHT_VERT_GLSL}
void main() { vCol = aCol; vU = aU; gl_Position = clipOf(onGround(position)); }`;
const FRAG = /* glsl */ `
varying vec4 vCol;
varying float vU;
// (Ed, round 14: objects in pixels, their light smooth: a beam is a line one pixel wide, its fade along it in flat steps.)
void main() { float a = vCol.a * floor(pow(1.0 - vU, 0.6) * 5.0 + 0.5) / 5.0; gl_FragColor = vec4(vCol.rgb * a, 1.0); }`;

// Cyan at the core, through blue, violet and magenta to green: the party palette for beams.
const RAMP = [[0.3, 0.95, 1], [0.35, 0.55, 1], [0.7, 0.4, 1], [1, 0.3, 0.85], [0.45, 1, 0.55]];
const ramp = (h: number): number[] => {
  const x = (((h % 1) + 1) % 1) * RAMP.length, i = Math.floor(x), f = x - i, a = RAMP[i % RAMP.length], b = RAMP[(i + 1) % RAMP.length];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
};

/** A dancefloor ring speaker, for its single laser: its top, its state, and whether it has booted. */
export interface RingSpeaker { x: number; y: number; z: number; state: "playing" | "damaged" | "destroyed"; powered: boolean }

export class Lasers {
  private geo = new THREE.BufferGeometry();
  private pos = new Float32Array(0);
  private col = new Float32Array(0);
  private u = new Float32Array(0);
  readonly mesh: THREE.LineSegments;

  constructor(scene: THREE.Scene, private game: Game) {
    this.mesh = new THREE.LineSegments(this.geo, new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms: { ...HEIGHT_UNIFORMS }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    this.mesh.frustumCulled = false;
    scene.add(this.mesh);
  }

  update(time: number, playing: Playing[], wx: number, wz: number, ring: RingSpeaker[] = [], centre = { x: 0, z: 0 }): void {
    const t = this.game.tuning, L = t.lasers, { bar } = beatClock(t), blockLen = bar * L.blockBars;
    const verts: number[] = [], cols: number[] = [], us: number[] = [];
    // The dancefloor's ring (Ed, 2026-10-04): one laser from the top of each speaker, mostly
    // upwards, sweeping slowly on the beat, neighbours out of phase, so the ring wears a crown of
    // moving beams in the party neons. Damaged ones flicker; destroyed ones (and ones not yet booted) have none.
    const S = t.speakerLasers, bt = beatTime(this.game.beat, time), beats = (bt * t.beat.bpm) / 60;
    if (L.on && S.on) ring.forEach((sp, i) => {
      if (!sp || !sp.powered || sp.state === "destroyed") return;
      if (sp.state === "damaged" && Math.sin(time * 23 + i * 5.1) + Math.sin(time * 37 + i) < 0.4) return;
      const out = Math.atan2(sp.z - centre.z, sp.x - centre.x), ph = (beats / S.sweepBeats) * Math.PI * 2 + (i % 2) * Math.PI + i * 0.4;
      const tilt = ((S.tilt * (0.55 + 0.45 * Math.sin(ph))) * Math.PI) / 180, swing = ((S.sweep * Math.cos(ph * 0.5 + i)) * Math.PI) / 180;
      const az = out + swing, dx = Math.sin(tilt) * Math.cos(az), dz = Math.sin(tilt) * Math.sin(az), dy = Math.cos(tilt);
      const c = ramp(i / ring.length + time * 0.03), alpha = S.opacity * (0.75 + 0.25 * Math.cos(beats * Math.PI * 2));
      verts.push(sp.x, sp.y, sp.z, sp.x + dx * S.length, sp.y + dy * S.length, sp.z + dz * S.length);
      cols.push(...c, alpha, ...c, alpha);
      us.push(0, 1);
    });
    if (L.on) for (const s of playing) {
      const fade = 1 - Math.min(1, Math.max(0, (Math.hypot(s.x - wx, s.z - wz) - L.fadeNear) / Math.max(1, L.fadeFar - L.fadeNear)));
      if (fade <= 0) continue;
      const show = laserShow(bt, s.seed, 1, t), since = time - s.ready;
      // The reveal: a newly partified area's lasers come on as its soundsystem finishes rising.
      const reveal = since >= 0 && since < blockLen ? Math.min(1, since / L.fadeIn) * Math.min(1, (blockLen - since) / L.fadeOut) : 0;
      // Full party (a wave celebrated it: Ed, 2026-10-07): fully on for good, every beam, eased in as the fireworks start.
      const full = s.full !== undefined && time >= s.full ? Math.min(1, (time - s.full) / Math.max(0.5, L.fadeIn * 8)) : 0;
      const on = Math.max(show.on, reveal, full), n = full > 0 || reveal > show.on ? L.maxCount : show.count;
      if (on <= 0.01) continue;
      const spread = (L.spread * Math.PI / 180) * show.open;
      for (let i = 0; i < n; i++) {
        // Up into the sky, never along the ground: within maxTilt of straight up.
        const k = n === 1 ? 0 : i / (n - 1) - 0.5, lim = (L.maxTilt * Math.PI) / 180, a = Math.max(-lim, Math.min(lim, k * spread + show.sweep));
        const dx = Math.sin(a), dy = Math.cos(a), dz = -0.15 * Math.cos(a * 3 + s.seed);
        const c = ramp(show.hue + i * 0.07), alpha = L.opacity * on * fade;
        verts.push(s.x, s.y, s.z, s.x + dx * L.length, s.y + dy * L.length, s.z + dz * L.length);
        cols.push(...c, alpha, ...c, alpha);
        us.push(0, 1);
      }
    }
    if (verts.length > this.pos.length) { this.pos = new Float32Array(verts.length * 2); this.col = new Float32Array(cols.length * 2); this.u = new Float32Array(us.length * 2);
      this.geo.setAttribute("position", new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
      this.geo.setAttribute("aCol", new THREE.BufferAttribute(this.col, 4).setUsage(THREE.DynamicDrawUsage));
      this.geo.setAttribute("aU", new THREE.BufferAttribute(this.u, 1).setUsage(THREE.DynamicDrawUsage)); }
    if (!this.geo.getAttribute("position")) return;
    this.pos.set(verts); this.col.set(cols); this.u.set(us);
    for (const k of ["position", "aCol", "aU"]) this.geo.getAttribute(k).needsUpdate = true;
    this.geo.setDrawRange(0, verts.length / 3);
  }
}
