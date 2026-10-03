// What inviting and leashing look like (rules in rules/leash.ts; DESIGN.md, "The leash"):
// - the stack: each leashed creature's sigil floating above the witch's head, newest at the
//   bottom, swaying gently when she is still and trailing behind her when she flies fast;
// - placed sigils: a neon rune on the ground, written on stroke by stroke (here: swept round);
//   a ghost under her shows where the bottom sigil would land, red where it can't, and a blocked
//   spot fizzles;
// - the bond, each switchable in the tuning file (bond): a glow at the creature's feet in its
//   sigil's colour, a spark now and then from sigil to creature (staggered), and a dotted thread
//   only while the leash is under strain;
// - the talk: emoji speech bubbles taking turns over the witch and the creature (HTML, over the
//   canvas), with a bar for how far the conversation has got.
// The sigils are placeholders (a stave and a few strokes from the species' id) until the art
// builder's art/sigils.js lands.
import * as THREE from "three";
import type { Game } from "../rules/game";
import { blocked, leashPoint } from "../rules/leash";
import { hash2 } from "../rules/random";
import { witchHeight } from "../rules/witch";
import { SPRITE_UNIFORMS } from "./sprites";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";

const SLOT = 32, SLOTS = 8; // the glyph atlas: 8 x 8 slots of 32 px; slot 0 is a soft dot

const VERT = /* glsl */ `
uniform vec3 uRight, uUp;
uniform float uFlat;
attribute vec3 iPos;
attribute float iSize;
attribute vec4 iUv;
attribute vec4 iCol;
attribute float iDraw;
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw;
varying vec3 vWorld;
void main() {
  vec2 p = position.xy;
  vec3 w = uFlat > 0.5 ? iPos + vec3(p.x * iSize, 0.04, -p.y * iSize) : iPos + uRight * (p.x * iSize) + uUp * (p.y * iSize);
  vUv = vec2(mix(iUv.x, iUv.z, uv.x), mix(iUv.w, iUv.y, uv.y));
  vP = p; vCol = iCol; vDraw = iDraw; vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`;

const FRAG = /* glsl */ `
uniform sampler2D uGlyphs;
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw;
varying vec3 vWorld;
${LIGHT_GLSL}
void main() {
  float a = texture2D(uGlyphs, vUv).a * vCol.a;
  // Written on: revealed clockwise from the top as vDraw goes 0 to 1.
  float ang = fract(atan(vP.x, vP.y) / 6.2831853 + 1.0);
  if (ang > vDraw || a < 0.02) discard;
  gl_FragColor = vec4(haze(vCol.rgb * a, vWorld), 1.0);
}`;

class Instances {
  readonly mesh: THREE.Mesh;
  private geo = new THREE.InstancedBufferGeometry();
  private cap = 0;
  private n = 0;
  private pos!: Float32Array; private size!: Float32Array; private uv!: Float32Array; private col!: Float32Array; private draw!: Float32Array;

  constructor(mat: THREE.ShaderMaterial) {
    const q = new THREE.PlaneGeometry(1, 1);
    this.geo.index = q.index;
    this.geo.setAttribute("position", q.getAttribute("position"));
    this.geo.setAttribute("uv", q.getAttribute("uv"));
    this.grow(256);
    this.mesh = new THREE.Mesh(this.geo, mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 3;
  }

  private grow(cap: number): void {
    const keep = (a: Float32Array | undefined, k: number) => { const b = new Float32Array(cap * k); if (a) b.set(a); return b; };
    this.pos = keep(this.pos, 3); this.size = keep(this.size, 1); this.uv = keep(this.uv, 4); this.col = keep(this.col, 4); this.draw = keep(this.draw, 1);
    this.cap = cap;
    const at = (name: string, a: Float32Array, k: number) => this.geo.setAttribute(name, new THREE.InstancedBufferAttribute(a, k).setUsage(THREE.DynamicDrawUsage));
    at("iPos", this.pos, 3); at("iSize", this.size, 1); at("iUv", this.uv, 4); at("iCol", this.col, 4); at("iDraw", this.draw, 1);
  }

  begin(): void { this.n = 0; }
  add(x: number, y: number, z: number, size: number, uv: number[], r: number, g: number, b: number, a: number, draw = 1): void {
    if (this.n >= this.cap) this.grow(this.cap * 2);
    const i = this.n++;
    this.pos.set([x, y, z], i * 3); this.size[i] = size; this.uv.set(uv, i * 4); this.col.set([r, g, b, a], i * 4); this.draw[i] = draw;
  }
  end(): void {
    this.geo.instanceCount = this.n;
    for (const k of ["iPos", "iSize", "iUv", "iCol", "iDraw"]) (this.geo.getAttribute(k) as THREE.InstancedBufferAttribute).needsUpdate = true;
  }
}

const PARTY = ["🎉", "🎈", "💃", "🎊", "🥳", "🍉", "🍒", "🍷", "🍸", "🍹", "🥂"];
const BORED = ["😴", "🫩", "🥱", "💼"], CURIOUS = ["😮", "🤭", "🫢", "😛"], HAPPY = ["😁", "😆", "🎉", "🥳", "💃", "🍹", "🍺"];

export class LeashView {
  private canvas = document.createElement("canvas");
  private tex: THREE.CanvasTexture;
  private slots = new Map<string, number>();
  private colours = new Map<string, THREE.Color>();
  private standing: Instances;
  private flat: Instances;
  private fizzles: { x: number; z: number; at: number }[] = [];
  private bubbleWitch = document.getElementById("bubble-witch");
  private bubbleCreature = document.getElementById("bubble-creature");
  private v = new THREE.Vector3();

  constructor(scene: THREE.Scene, private game: Game) {
    this.canvas.width = this.canvas.height = SLOT * SLOTS;
    const g = this.canvas.getContext("2d")!;
    const dot = g.createRadialGradient(SLOT / 2, SLOT / 2, 0, SLOT / 2, SLOT / 2, SLOT / 2);
    dot.addColorStop(0, "rgba(255,255,255,1)"); dot.addColorStop(0.35, "rgba(255,255,255,.55)"); dot.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = dot; g.fillRect(0, 0, SLOT, SLOT);
    this.tex = new THREE.CanvasTexture(this.canvas);
    this.tex.magFilter = THREE.NearestFilter; this.tex.minFilter = THREE.NearestFilter; this.tex.generateMipmaps = false;
    const mat = (flat: number) => new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      uniforms: { ...LIGHT_UNIFORMS, uRight: SPRITE_UNIFORMS.uRight, uUp: SPRITE_UNIFORMS.uUp, uFlat: { value: flat }, uGlyphs: { value: this.tex } },
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    this.standing = new Instances(mat(0));
    this.flat = new Instances(mat(1));
    scene.add(this.standing.mesh, this.flat.mesh);
  }

  /** A placeholder sigil: a stave with a few strokes off it, chosen from the species' id. */
  private slotOf(species: string): number {
    let s = this.slots.get(species);
    if (s !== undefined) return s;
    s = this.slots.size + 1;
    this.slots.set(species, s);
    let h = 7;
    for (const ch of species) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const r = (k: number) => hash2(h % 9973, k, 911);
    const g = this.canvas.getContext("2d")!, ox = (s % SLOTS) * SLOT, oy = Math.floor(s / SLOTS) * SLOT;
    g.save();
    g.translate(ox, oy);
    g.strokeStyle = "#fff"; g.lineWidth = 3; g.lineCap = "square";
    g.beginPath(); g.moveTo(16, 4); g.lineTo(16, 28);
    const n = 2 + Math.floor(r(1) * 3);
    for (let i = 0; i < n; i++) {
      const y = 6 + r(10 + i) * 18, side = r(20 + i) < 0.5 ? -1 : 1, len = 5 + r(30 + i) * 6, up = r(40 + i) < 0.5 ? -1 : 1;
      g.moveTo(16, y); g.lineTo(16 + side * len, y + up * len * 0.8);
      if (r(50 + i) < 0.35) { g.moveTo(16 - side * len * 0.8, y + 4); g.lineTo(16, y); }
    }
    if (r(60) < 0.4) { g.moveTo(16 + 5, 26); g.arc(16, 26, 5, 0, Math.PI * 2); }
    g.stroke();
    // Crisp: no soft edges, so it reads as pixel art.
    const img = g.getImageData(0, 0, SLOT, SLOT);
    for (let i = 3; i < img.data.length; i += 4) img.data[i] = img.data[i] > 90 ? 255 : 0;
    g.putImageData(img, 0, 0);
    g.restore();
    this.colours.set(species, new THREE.Color().setHSL(r(70), 1, 0.6));
    this.tex.needsUpdate = true;
    return s;
  }

  private uv(slot: number): number[] {
    const N = SLOT * SLOTS, x = (slot % SLOTS) * SLOT, y = Math.floor(slot / SLOTS) * SLOT;
    // u0, v0 (top), u1, v1 (bottom); the canvas texture is flipped in v.
    return [x / N, 1 - y / N, (x + SLOT) / N, 1 - (y + SLOT) / N];
  }

  update(time: number, camera: THREE.Camera, width: number, height: number): void {
    const g = this.game, s = g.leash, t = g.tuning, w = g.witch, B = t.bond, L = t.leash, dot = this.uv(0);
    this.standing.begin(); this.flat.begin();
    for (const e of s.events) if (e.kind === "fizzled") this.fizzles.push({ x: e.x, z: e.z, at: time });
    this.fizzles = this.fizzles.filter(f => time - f.at < 0.7);

    // The stack above her head: bottom (newest) nearest; sways, and trails behind when she's fast.
    const head = witchHeight(w, t) + 1.4, slotPos = new Map<number, THREE.Vector3>();
    for (let k = 0; k < s.stack.length; k++) {
      const id = s.stack[k], c = g.creatures[id], j = s.stack.length - 1 - k; // j: 0 at the bottom
      const sway = Math.sin(time * 1.7 + j * 0.9) * 0.12 * (1 + j * 0.5);
      const trail = 0.02 * Math.pow(j + 1, 1.3);
      const x = w.x + sway - w.vx * trail, z = w.z - w.vz * trail, y = head + 1.3 + j * 2.4;
      slotPos.set(id, new THREE.Vector3(x, y, z));
      const col = this.colours.get(c.species) ?? (this.slotOf(c.species), this.colours.get(c.species)!);
      this.standing.add(x, y, z, 2 + c.level * 0.4, this.uv(this.slotOf(c.species)), col.r, col.g, col.b, 1);
    }

    // Placed sigils, written on the ground.
    for (const p of s.placed) {
      const c = g.creatures[p.id], slot = this.slotOf(c.species), col = this.colours.get(c.species)!;
      const pulse = 0.8 + 0.2 * Math.sin(time * 2 + p.id);
      this.flat.add(p.x, 0, p.z, 3 + c.level * 0.8, this.uv(slot), col.r * pulse, col.g * pulse, col.b * pulse, 1, Math.min(1, (time - p.at) / 0.8));
      this.flat.add(p.x, 0, p.z, 5, dot, col.r, col.g, col.b, 0.25);
    }

    // The ghost: where the bottom sigil would land, red where it can't.
    if (w.mode === "ground" && s.stack.length && !s.placed.some(p => Math.hypot(p.x - w.x, p.z - w.z) <= L.pickRadius)) {
      const c = g.creatures[s.stack[s.stack.length - 1]], col = this.colours.get(c.species)!;
      const no = blocked(s, w.x, w.z, t);
      this.flat.add(w.x, 0, w.z, 3 + c.level * 0.8, this.uv(this.slotOf(c.species)), no ? 1 : col.r, no ? 0.1 : col.g, no ? 0.1 : col.b, 0.22);
    }
    for (const f of this.fizzles) {
      const k = 1 - (time - f.at) / 0.7;
      this.flat.add(f.x, 0, f.z, 3 * (1 + (1 - k) * 0.6), dot, 1, 0.15, 0.1, k);
    }

    // The bond.
    const leashed = [...s.stack, ...s.placed.map(p => p.id)];
    for (const id of leashed) {
      const c = g.creatures[id], col = this.colours.get(c.species);
      if (!col) continue;
      const lp = leashPoint(s, id, w.x, w.z)!;
      if (B.rim) this.flat.add(c.x, 0, c.z, 1.8, dot, col.r, col.g, col.b, 0.35);
      const from = slotPos.get(id) ?? new THREE.Vector3(lp.x, 0.2, lp.z);
      if (B.sparks) {
        const period = Math.max(0.5, B.sparkEvery), ph = (time + ((id * 0.618) % 1) * period) % period;
        if (ph < 0.7) {
          const k = ph / 0.7;
          this.standing.add(from.x + (c.x - from.x) * k, from.y + (0.6 - from.y) * k + Math.sin(k * Math.PI) * 1.2, from.z + (c.z - from.z) * k, 0.35, dot, col.r, col.g, col.b, 1);
        }
      }
      const d = Math.hypot(c.x - lp.x, c.z - lp.z);
      if (B.thread && d > L.length * 0.85) {
        const strain = Math.min(1, (d - L.length * 0.85) / L.length), n = Math.min(60, Math.floor(d / 1.2));
        for (let i = 1; i < n; i++) {
          const k = (i + (time * 2) % 1) / n;
          this.standing.add(from.x + (c.x - from.x) * k, from.y + (0.5 - from.y) * k, from.z + (c.z - from.z) * k, 0.22, dot, col.r, col.g, col.b, 0.25 + 0.75 * strain);
        }
      }
    }
    this.standing.end(); this.flat.end();
    this.bubbles(time, camera, width, height);
  }

  /** The emoji conversation: bubbles taking turns over the witch and the creature. */
  private bubbles(time: number, camera: THREE.Camera, width: number, height: number): void {
    const g = this.game, talk = g.leash.talk, bw = this.bubbleWitch, bc = this.bubbleCreature;
    if (!bw || !bc) return;
    if (!talk) { bw.classList.remove("on"); bc.classList.remove("on"); return; }
    const c = g.creatures[talk.id], w = g.witch, turn = Math.floor(talk.t / 0.9), progress = talk.t / talk.total;
    const place = (el: HTMLElement, x: number, y: number, z: number) => {
      this.v.set(x, y, z).project(camera);
      el.style.left = `${((this.v.x + 1) / 2) * width}px`;
      el.style.top = `${((1 - this.v.y) / 2) * height}px`;
    };
    const pick = (list: string[], k: number) => list[Math.floor(hash2(talk.id, k, 5) * list.length) % list.length];
    // The witch speaks on even turns; the creature answers on odd ones, warming up as it goes:
    // older creatures start bored and busy.
    const witchLine = pick(PARTY, turn - (turn % 2));
    const mood = progress - 0.3 * c.level, moodList = mood < 0.05 ? BORED : mood < 0.45 ? CURIOUS : HAPPY;
    const creatureLine = turn >= 1 ? pick(moodList, turn - ((turn + 1) % 2)) : "…";
    bw.textContent = witchLine;
    bw.classList.toggle("on", turn % 2 === 0);
    bc.querySelector("span")!.textContent = creatureLine;
    (bc.querySelector(".bar i") as HTMLElement).style.width = `${Math.min(100, progress * 100)}%`;
    bc.classList.add("on");
    bc.style.opacity = turn % 2 === 1 ? "1" : "0.6";
    place(bw, w.x - 1.2, witchHeight(w, g.tuning) + 2.2, w.z);
    place(bc, c.x, 2.2, c.z);
    void time;
  }
}
