// The soundsystems' laser shows (rules in rules/lasers.ts): thin beams fanned from each playing
// soundsystem's top far up into the sky, sweeping to the beat, coming and going in bursts. Drawn
// as 1 px additive lines (glow and bloom only: no light), fading along their length and with
// distance from the witch, so many partified areas in view stay readable. A newly partified
// area's first burst fires as it finishes rising: the reveal.
import * as THREE from "three";
import type { Game } from "../rules/game";
import { beatClock, laserShow } from "../rules/lasers";
import type { Playing } from "./party";

const VERT = /* glsl */ `
attribute vec4 aCol; // rgb, alpha
attribute float aU;  // 0 at the source, 1 at the far end
varying vec4 vCol;
varying float vU;
void main() { vCol = aCol; vU = aU; gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }`;
const FRAG = /* glsl */ `
varying vec4 vCol;
varying float vU;
void main() { float a = vCol.a * pow(1.0 - vU, 0.6); gl_FragColor = vec4(vCol.rgb * a, 1.0); }`;

// Cyan at the core, through blue, violet and magenta to green: the party palette for beams.
const RAMP = [[0.3, 0.95, 1], [0.35, 0.55, 1], [0.7, 0.4, 1], [1, 0.3, 0.85], [0.45, 1, 0.55]];
const ramp = (h: number): number[] => {
  const x = (((h % 1) + 1) % 1) * RAMP.length, i = Math.floor(x), f = x - i, a = RAMP[i % RAMP.length], b = RAMP[(i + 1) % RAMP.length];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
};

export class Lasers {
  private geo = new THREE.BufferGeometry();
  private pos = new Float32Array(0);
  private col = new Float32Array(0);
  private u = new Float32Array(0);
  readonly mesh: THREE.LineSegments;

  constructor(scene: THREE.Scene, private game: Game) {
    this.mesh = new THREE.LineSegments(this.geo, new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    this.mesh.frustumCulled = false;
    scene.add(this.mesh);
  }

  update(time: number, playing: Playing[], wx: number, wz: number): void {
    const t = this.game.tuning, L = t.lasers, { bar } = beatClock(t), blockLen = bar * L.blockBars;
    const verts: number[] = [], cols: number[] = [], us: number[] = [];
    if (L.on) for (const s of playing) {
      const fade = 1 - Math.min(1, Math.max(0, (Math.hypot(s.x - wx, s.z - wz) - L.fadeNear) / Math.max(1, L.fadeFar - L.fadeNear)));
      if (fade <= 0) continue;
      const show = laserShow(time, s.seed, 1, t), since = time - s.ready;
      // The reveal: a newly partified area's lasers come on as its soundsystem finishes rising.
      const reveal = since >= 0 && since < blockLen ? Math.min(1, since / L.fadeIn) * Math.min(1, (blockLen - since) / L.fadeOut) : 0;
      const on = Math.max(show.on, reveal), n = reveal > show.on ? L.maxCount : show.count;
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
