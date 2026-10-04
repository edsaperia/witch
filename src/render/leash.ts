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
// The sigils are the art builder's (art/sigils.js), drawn per species and level into an atlas.
import * as THREE from "three";
import { drawSigil, sigilColour } from "../../art/generator.js";
import { dormant, type Game } from "../rules/game";
import { blocked, leashPoint, talkTime, talkTurn } from "../rules/leash";
import { toEvolve } from "../rules/berries";
import { hash2 } from "../rules/random";
import { witchHeight } from "../rules/witch";
import { SPRITE_UNIFORMS } from "./sprites";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL, placed } from "./height";

const SLOT = 32, SLOTS = 16; // the glyph atlas: 16 x 16 slots of 32 px; slot 0 is a soft dot

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
${HEIGHT_VERT_GLSL}
void main() {
  vec2 p = position.xy;
  // On the rolling ground: a rune lying flat follows it corner by corner; the rest stand above it.
  vec3 w = uFlat > 0.5 ? onGround(iPos + vec3(p.x * iSize, 0.04, -p.y * iSize)) : onGround(iPos) + uRight * (p.x * iSize) + uUp * (p.y * iSize);
  vUv = vec2(mix(iUv.x, iUv.z, uv.x), mix(iUv.w, iUv.y, uv.y));
  vP = p; vCol = iCol; vDraw = iDraw; vWorld = w;
  gl_Position = clipOf(w);
  if (overBend(onGround(iPos)) < 0.5) gl_Position = vec4(2.0, 2.0, 2.0, 1.0); // (the glows seen through the canopy: never through the earth)
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
    this.geo.dispose(); // or three.js keeps drawing only the old capacity (see SpriteBatch.grow)
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

const PARTY = ["🎉", "🎈", "💃", "🎊", "🥳", "😛", "🍉", "🍒", "🍷", "🍸", "🍹", "🥂", "🍺", "😁", "😆"];
// A creature's moods, bored to delighted: adults start at the first, young at the middle, babies
// at the last, and the conversation warms them up toward delighted.
const MOODS = [["😴", "🫩", "🥱", "💼"], ["😐", "😐", "🥱"], ["😮", "🤭", "🫢", "😛"], ["🙂", "🍷", "🍺", "😁"], ["🥳", "🎉", "🎈", "😆", "🥂", "💃"]];

export class LeashView {
  private canvas = document.createElement("canvas");
  private tex: THREE.CanvasTexture;
  private slots = new Map<string, number>();
  private colours = new Map<string, THREE.Color>();
  private standing: Instances;
  private flat: Instances;
  /** Drawn over everything (no depth test): the berries' glints seen from the treetops. */
  private over: Instances;
  private evolved = new Map<number, number>();
  private berryRgb: [number, number, number];
  private fizzles: { x: number; z: number; at: number }[] = [];
  private bursts: { x: number; z: number; at: number; seed: number }[] = [];
  /** Each stacked sigil's eased height above her hat, by creature. */
  private stackY = new Map<number, number>();
  private chain: { x: number; z: number; vx: number; vz: number }[] = [];
  private lastTime = 0;
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
    const mat = (flat: number, depthTest = true) => new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      uniforms: { ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, uRight: SPRITE_UNIFORMS.uRight, uUp: SPRITE_UNIFORMS.uUp, uFlat: { value: flat }, uGlyphs: { value: this.tex } },
      transparent: true, depthWrite: false, depthTest, blending: THREE.AdditiveBlending,
    });
    this.standing = new Instances(mat(0));
    this.flat = new Instances(mat(1));
    this.over = new Instances(mat(0, false));
    scene.add(this.standing.mesh, this.flat.mesh, this.over.mesh);
    const hex = game.tuning.berries.colour.replace("#", "");
    this.berryRgb = [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number];
  }

  /** A species' sigil at a level (it grows more ornate with level), white in the atlas, tinted
   *  by its neon colour when drawn. */
  private slotOf(species: string, level = 0): number {
    const key = `${species}:${level}`;
    let s = this.slots.get(key);
    if (s !== undefined) return s;
    s = this.slots.size + 1;
    this.slots.set(key, s);
    const g = this.canvas.getContext("2d")!, ox = (s % SLOTS) * SLOT, oy = Math.floor(s / SLOTS) * SLOT;
    g.clearRect(ox, oy, SLOT, SLOT);
    drawSigil(g, species, { x: ox + 1, y: oy + 1, size: SLOT - 2, level: level as unknown as null, colour: [255, 255, 255], glow: false });
    // Crisp: no soft edges, so it reads as pixel art.
    const img = g.getImageData(ox, oy, SLOT, SLOT);
    for (let i = 3; i < img.data.length; i += 4) img.data[i] = img.data[i] > 90 ? 255 : 0;
    g.putImageData(img, ox, oy);
    const c = sigilColour(species);
    this.colours.set(species, new THREE.Color(c[0] / 255, c[1] / 255, c[2] / 255));
    this.tex.needsUpdate = true;
    return s;
  }

  /** Berries (rules/berries.ts): each one's soft red halo, and from the treetops a red glint over
   *  the canopy; the ring of how near a party animal is to evolving; and evolving itself: motes
   *  spiralling up through the bar, a flash on the bar line as it becomes its next level, a burst
   *  of party sparkles. */
  private drawBerries(time: number): void {
    const g = this.game, B = g.berries, t = g.tuning, w = g.witch, dot = this.uv(0), [r, gg, b] = this.berryRgb, glow = t.berries.glow;
    const treetops = w.lift > 0.5, near = treetops ? 260 : 90, beat = 60 / t.beat.bpm;
    for (const e of B.events) if (e.kind === "evolved") this.evolved.set(e.id, time);
    for (const [id, at] of this.evolved) if (time - at > 1) this.evolved.delete(id);
    for (const berry of B.berries) {
      const p = B.bushes[berry.bush];
      if (Math.abs(p.x - w.x) > near || Math.abs(p.z - w.z) > near) continue;
      const tw = 0.85 + 0.15 * Math.sin(time * 2.3 + berry.id);
      if (treetops) this.over.add(p.x, 1, p.z + 0.25, 0.9, dot, r * 1.6 * tw, gg * 1.6, b * 1.6, 0.8 * glow);
      else {
        this.standing.add(p.x, 0.8, p.z + 0.3, 2.8, dot, r * 1.5, gg * 1.5, b * 1.5, 0.95 * glow * tw); // the soft halo, easy to spot
        this.standing.add(p.x, 0.8, p.z + 0.31, 1.1, dot, r * 1.8, gg * 1.4, b * 1.4, 0.8 * glow); // its warm core
        this.standing.add(p.x - 0.07, 0.86, p.z + 0.32, 0.3, dot, 1, 0.92, 0.92, 0.8 * tw); // the shine
      }
    }
    // How near each party animal is to evolving: always while she's within 20 m, and for a few
    // seconds after it eats.
    for (const c of g.creatures) {
      if (!c.leashed || B.evolving.has(c.id)) continue;
      const need = toEvolve(c.level, t), ate = B.ateAt.get(c.id);
      if (!Number.isFinite(need)) continue;
      if (Math.hypot(c.x - w.x, c.z - w.z) > 20 && !(ate !== undefined && time - ate < 3)) continue;
      const fed = B.fed.get(c.id) ?? 0, n = 28;
      for (let i = 0; i < n; i++) {
        const a = Math.PI / 2 - (i / n) * Math.PI * 2, lit = i / n < fed / need;
        this.flat.add(c.x + Math.cos(a) * 1.5, 0, c.z + Math.sin(a) * 1.1, 0.35, dot, lit ? 1 : 0.9, lit ? 0.25 : 0.9, lit ? 0.3 : 1, lit ? 0.9 : 0.15);
      }
    }
    // Evolving: motes spiralling up round it through the bar, quicker and tighter toward the line.
    for (const [id, e] of B.evolving) {
      const c = g.creatures[id], k = Math.min(1, (time - e.since) / Math.max(0.1, e.at - e.since)), pulse = 0.6 + 0.4 * Math.cos((time / beat) * Math.PI * 2);
      for (let i = 0; i < 18; i++) {
        const f = (time * (0.5 + k) + i / 18) % 1, a = i * 2.4 + time * (2 + 4 * k), rad = 1.6 * (1 - 0.6 * k) * (1 - f * 0.4);
        this.standing.add(c.x + Math.cos(a) * rad, 0.2 + f * 3.2, c.z + Math.sin(a) * rad * 0.7, 0.3, dot, 1, 0.95, 0.75, (1 - f) * pulse);
      }
    }
    // The flash on the bar line, and a burst of party sparkles.
    for (const [id, at] of this.evolved) {
      const c = g.creatures[id], d = time - at;
      if (d < 0.25) this.standing.add(c.x, 1.2, c.z, 6 * (1 - d / 0.25) + 1, dot, 1, 1, 1, 1 - d / 0.25);
      const k = d / 1;
      for (let i = 0; i < 36; i++) {
        const a = hash2(id, i, 13) * Math.PI * 2, sp = 2.5 + hash2(id, i, 17) * 3.5, up = 2 + hash2(id, i, 19) * 4;
        const col = [[1, 0.4, 0.8], [0.3, 0.95, 1], [1, 0.9, 0.3], [0.6, 1, 0.4], [1, 1, 1]][i % 5];
        this.standing.add(c.x + Math.cos(a) * sp * k, 0.8 + up * k - 4 * k * k, c.z + Math.sin(a) * sp * k, 0.35, dot, col[0], col[1], col[2], 1 - k);
      }
    }
  }

  /** Wild legends (Ed, 2026-10-04): a slow, breathing aura on the ground round each, in a dark
   *  mix of its sigil's colour and blood red, with motes drifting up; from the treetops a glow
   *  over the canopy, so they read as special from above. Dimmer while they sleep. */
  private drawBosses(time: number): void {
    const g = this.game, W = g.tuning.wildLegends, w = g.witch, dot = this.uv(0), treetops = w.lift > 0.5, near = treetops ? 420 : 110;
    for (const c of g.creatures) {
      if (!c.boss || c.leashed || Math.abs(c.x - w.x) > near || Math.abs(c.z - w.z) > near) continue;
      const asleep = dormant(g, c), b = bossBreath(time, c.id, W.breathEvery * (asleep ? 1.5 : 1)), k = (asleep ? 0.7 : 1) * W.glow;
      const sc = sigilColour(c.species), rgb = [0.5 * sc[0] / 255 + 0.45, 0.5 * sc[1] / 255 + 0.02, 0.5 * sc[2] / 255 + 0.08];
      if (treetops) {
        this.over.add(c.x, 1, c.z, W.aura * 2.2 * (1 + 0.1 * b), dot, rgb[0], rgb[1], rgb[2], 0.6 * k * (0.7 + 0.3 * b));
        this.over.add(c.x, 1, c.z, W.aura * 0.6, dot, rgb[0] * 1.6, rgb[1] * 1.6, rgb[2] * 1.6, 0.8 * k * (0.6 + 0.4 * b));
        continue;
      }
      const R = W.aura * 0.5 * (1 + 0.06 * b), n = 40, turn = time * 0.15 * (c.id % 2 ? 1 : -1);
      this.flat.add(c.x, 0, c.z, W.aura * 1.3, dot, rgb[0], rgb[1], rgb[2], 0.6 * k * (0.6 + 0.4 * b));
      for (let i = 0; i < n; i++) {
        const a = turn + (i / n) * Math.PI * 2, gap = Math.sin(a * 3 + time * 0.4) > 0.6 ? 0.25 : 1; // a broken, slowly turning ring
        this.flat.add(c.x + Math.cos(a) * R, 0, c.z + Math.sin(a) * R * 0.8, 0.55, dot, rgb[0] * 1.6, rgb[1] * 1.6, rgb[2] * 1.6, 1 * k * gap * (0.6 + 0.4 * b));
      }
      for (let i = 0; i < 7; i++) { // motes drifting slowly up round it
        const ph = (time * 0.18 + hash2(c.id, i, 5)) % 1, a = hash2(c.id, i, 9) * Math.PI * 2 + time * 0.1, r = R * (0.4 + 0.6 * hash2(c.id, i, 13));
        this.standing.add(c.x + Math.cos(a) * r, ph * 4.5, c.z + Math.sin(a) * r * 0.8, 0.28, dot, rgb[0] * 1.5, rgb[1] * 1.5, rgb[2] * 1.5, 0.8 * k * Math.sin(ph * Math.PI));
      }
    }
  }

  private uv(slot: number): number[] {
    const N = SLOT * SLOTS, x = (slot % SLOTS) * SLOT, y = Math.floor(slot / SLOTS) * SLOT;
    // u0, v0 (top), u1, v1 (bottom); the canvas texture is flipped in v.
    return [x / N, 1 - y / N, (x + SLOT) / N, 1 - (y + SLOT) / N];
  }

  /** hatTop: the height of the tip of her hat this frame (the stack floats above it). */
  update(time: number, camera: THREE.Camera, width: number, height: number, hatTop: number): void {
    const g = this.game, s = g.leash, t = g.tuning, w = g.witch, B = t.bond, L = t.leash, dot = this.uv(0);
    this.standing.begin(); this.flat.begin(); this.over.begin();
    this.drawBerries(time);
    this.drawBosses(time);
    for (const e of s.events) {
      if (e.kind === "fizzled") this.fizzles.push({ x: e.x, z: e.z, at: time });
      if (e.kind === "invited") this.bursts.push({ x: e.x, z: e.z, at: time, seed: e.id });
    }
    this.fizzles = this.fizzles.filter(f => time - f.at < 0.7);
    this.bursts = this.bursts.filter(b => time - b.at < 0.9);
    // An invite: a little burst of sparkles and confetti as the party gear appears.
    for (const b of this.bursts) {
      const k = (time - b.at) / 0.9;
      for (let i = 0; i < 28; i++) {
        const a = hash2(b.seed, i, 3) * Math.PI * 2, sp = 2 + hash2(b.seed, i, 5) * 3, up = 2 + hash2(b.seed, i, 7) * 3;
        const c = [[1, 0.4, 0.8], [0.3, 0.95, 1], [1, 0.9, 0.3], [0.6, 1, 0.4], [1, 1, 1]][i % 5];
        this.standing.add(b.x + Math.cos(a) * sp * k, 0.6 + up * k - 4 * k * k, b.z + Math.sin(a) * sp * k, 0.3, dot, c[0], c[1], c[2], 1 - k);
      }
    }
    // Talking: a faint ring round the creature she's talking to, filling as the chat goes on; a
    // chat she has left drains, its ring dimmer and see-through, until it's gone.
    const ring = (id: number, p: number, live: boolean) => {
      const c = g.creatures[id], n = 28, k = live ? 1 : 0.45;
      for (let i = 0; i < n; i++) {
        const a = Math.PI / 2 - (i / n) * Math.PI * 2, lit = i / n < p;
        if (!live && !lit) continue;
        this.flat.add(c.x + Math.cos(a) * 1.5, 0, c.z + Math.sin(a) * 1.1, 0.35, dot, 1, lit ? 0.6 : 0.9, lit ? 0.9 : 1, (lit ? 0.9 : 0.18) * k);
      }
    };
    if (s.talk) ring(s.talk.id, s.talk.refused ? 0 : Math.min(1, s.talk.t / s.talk.total), true);
    for (const [id, p] of s.progress) if (s.talk?.id !== id) ring(id, Math.min(1, p / talkTime(g.creatures[id], t)), false);

    // The stack above her hat: newest at the bottom. A chain of springs: each sigil follows the
    // one below with lag, so the stack trails behind her flight in proportion to speed, overshoots
    // when she stops or turns, and settles into a gentle idle sway; higher ones swing more.
    const S = t.stack, dt = Math.min(0.1, Math.max(0, time - this.lastTime)), slotPos = new Map<number, THREE.Vector3>();
    this.lastTime = time;
    while (this.chain.length < s.stack.length) this.chain.push({ x: 0, z: 0, vx: 0, vz: 0 });
    let below = { x: 0, z: 0 }, y = hatTop;
    for (const id of [...this.stackY.keys()]) if (!s.stack.includes(id)) this.stackY.delete(id);
    for (let k = s.stack.length - 1; k >= 0; k--) {
      const id = s.stack[k], c = g.creatures[id], j = s.stack.length - 1 - k, link = this.chain[j]; // j: 0 at the bottom
      const size = (2 + c.level * 0.4) * S.scale;
      const idle = Math.sin(time * 1.7 + j * 0.9) * S.idleSway * (1 + j * 0.5);
      const tx = below.x - w.vx * S.trail + idle, tz = below.z - w.vz * S.trail;
      link.vx += ((tx - link.x) * S.stiffness - link.vx * S.damping) * dt; link.vz += ((tz - link.z) * S.stiffness - link.vz * S.damping) * dt;
      link.x += link.vx * dt; link.z += link.vz * dt;
      below = link;
      y += (j === 0 ? S.offset * size : S.gap * size) + size / 2;
      // Each sigil eases to its height in the stack, so when the cycle button sends the bottom one
      // to the top (Ed, 2026-10-04) it rises past the others and they settle down a place.
      const rel = y - hatTop, had = this.stackY.get(id), sy = had === undefined ? rel : had + (rel - had) * (1 - Math.exp(-dt * 9));
      this.stackY.set(id, sy);
      const pos = new THREE.Vector3(w.x + link.x, hatTop + sy, w.z + link.z);
      y += size / 2;
      slotPos.set(id, pos);
      const col = (this.slotOf(c.species, c.level), this.colours.get(c.species)!);
      this.standing.add(pos.x, pos.y, pos.z, size, this.uv(this.slotOf(c.species, c.level)), col.r, col.g, col.b, 1);
    }

    // Placed sigils, written on the ground, a little brighter than they were so they read in the
    // grass (Ed, v233; the grass is trampled clear round them, grass.ts).
    for (const p of s.placed) {
      const c = g.creatures[p.id], slot = this.slotOf(c.species, c.level), col = this.colours.get(c.species)!;
      const pulse = 1.05 + 0.25 * Math.sin(time * 2 + p.id);
      this.flat.add(p.x, 0.02, p.z, 3 + c.level * 0.8, this.uv(slot), col.r * pulse, col.g * pulse, col.b * pulse, 1, Math.min(1, (time - p.at) / 0.8));
      this.flat.add(p.x, 0.01, p.z, 5.5, dot, col.r, col.g, col.b, 0.38);
    }

    // From the treetops, each placed sigil is projected up above the canopy over its spot, flat
    // and glowing, joined to its rune by a faint pulsing column of light (Ed, 2026-10-03). It
    // fades in as she rises; on the ground the real rune is enough.
    const P = t.sigilProjection, up = w.lift * w.lift * (3 - 2 * w.lift);
    if (up > 0.01) for (const p of s.placed) {
      const c = g.creatures[p.id], col = this.colours.get(c.species)!, top = t.treetopHeight - 4 + P.height;
      const pulse = 0.85 + 0.15 * Math.sin(time * 1.3 + p.id);
      this.flat.add(p.x, top, p.z, (3 + c.level * 0.8) * P.size, this.uv(this.slotOf(c.species, c.level)), col.r, col.g, col.b, P.opacity * up * pulse);
      for (let y = 1; y < top; y += 1.5) this.standing.add(p.x, y, p.z, 0.3, dot, col.r, col.g, col.b, P.beam * up * pulse * (0.6 + 0.4 * Math.sin(y * 0.8 - time * 3)));
    }

    // The ghost: where the bottom sigil would land, red where it can't.
    if (w.mode === "ground" && s.stack.length && !s.placed.some(p => Math.hypot(p.x - w.x, p.z - w.z) <= L.pickRadius)) {
      const c = g.creatures[s.stack[s.stack.length - 1]], col = this.colours.get(c.species)!;
      const no = blocked(s, w.x, w.z, t);
      this.flat.add(w.x, 0, w.z, 3 + c.level * 0.8, this.uv(this.slotOf(c.species, c.level)), no ? 1 : col.r, no ? 0.1 : col.g, no ? 0.1 : col.b, 0.22);
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
          // From the creature back to the leash point (Ed: the dots flow towards you).
          const k = 1 - ph / 0.7;
          this.standing.add(from.x + (c.x - from.x) * k, from.y + (0.6 - from.y) * k + Math.sin(k * Math.PI) * 1.2, from.z + (c.z - from.z) * k, 0.35, dot, col.r, col.g, col.b, 1);
        }
      }
      const d = Math.hypot(c.x - lp.x, c.z - lp.z);
      if (B.thread && d > L.length * 0.85) {
        const strain = Math.min(1, (d - L.length * 0.85) / L.length), n = Math.min(60, Math.floor(d / 1.2));
        // A gentle upward bow (Ed: "arc upwards a little"), and the dots march from the creature
        // to the leash point.
        const arc = Math.min(B.threadArcMax, B.threadArc * d);
        for (let i = 1; i < n; i++) {
          const k = (i + 1 - (time * 2) % 1) / n;
          if (k >= 1) continue;
          this.standing.add(from.x + (c.x - from.x) * k, from.y + (0.5 - from.y) * k + Math.sin(k * Math.PI) * arc, from.z + (c.z - from.z) * k, 0.22, dot, col.r, col.g, col.b, 0.25 + 0.75 * strain);
        }
      }
    }
    this.standing.end(); this.flat.end(); this.over.end();
    this.bubbles(time, camera, width, height);
  }

  /** Show an emoji in a bubble as a pixel sprite: drawn small (bubbles.emojiPixels across), its
   *  edges made hard (no half-see-through pixels), and scaled up by the game's pixel size. */
  private emoji(el: HTMLElement, e: string): void {
    if (el.dataset.e === e) return;
    el.dataset.e = e;
    const B = this.game.tuning.bubbles, n = B.emojiPixels, k = this.game.tuning.pixelSize * B.scale;
    const c = document.createElement("canvas");
    c.width = c.height = n;
    c.style.width = c.style.height = `${n * k}px`;
    const x = c.getContext("2d");
    if (x) {
      x.font = `${n - 1}px sans-serif`; x.textAlign = "center"; x.textBaseline = "middle";
      x.fillText(e, n / 2, n / 2 + 0.5);
      const d = x.getImageData(0, 0, n, n);
      for (let i = 3; i < d.data.length; i += 4) d.data[i] = d.data[i] < 110 ? 0 : 255;
      x.putImageData(d, 0, 0);
    }
    el.replaceChildren(c);
  }
  private say(el: HTMLElement, text: string): void { if (el.dataset.e !== text) { el.dataset.e = text; el.textContent = text; } }

  /** The emoji conversation: bubbles taking turns over the witch and the creature. */
  private bubbles(time: number, camera: THREE.Camera, width: number, height: number): void {
    const g = this.game, talk = g.leash.talk, bw = this.bubbleWitch, bc = this.bubbleCreature;
    if (!bw || !bc) return;
    const w = g.witch, place = (el: HTMLElement, x: number, y: number, z: number) => {
      placed(this.v.set(x, y, z)).project(camera);
      el.style.left = `${((this.v.x + 1) / 2) * width}px`;
      el.style.top = `${((1 - this.v.y) / 2) * height}px`;
    };
    const line = bc.querySelector("span")!, bar = bc.querySelector(".bar") as HTMLElement;
    if (!talk) {
      // (No prompt over creatures in range: Ed, 2026-10-03; she talks to them by herself, Ed v244.)
      bar.style.display = "none";
      bc.classList.remove("on");
      bw.classList.remove("on");
      return;
    }
    const c = g.creatures[talk.id];
    place(bw, w.x - 1.2, witchHeight(w, g.tuning) + 2.2, w.z);
    place(bc, c.x, 1.2 + c.level * 0.8, c.z);
    if (talk.refused) {
      // A legend: one unimpressed look, and nothing more.
      bw.classList.remove("on");
      this.emoji(line, hash2(talk.id, 1, 9) < 0.5 ? "😒" : "🙄");
      bar.style.display = "none";
      bc.classList.toggle("on", talk.t < 1.6);
      bc.style.opacity = "1";
      return;
    }
    bar.style.display = "";
    const turn = Math.floor(talk.t / talkTurn(c, g.tuning)), progress = Math.min(1, talk.t / talk.total);
    const pick = (list: string[], k: number) => list[Math.floor(hash2(talk.id, k, 5) * list.length) % list.length];
    // Hers on even turns, always party; theirs on odd turns, from a mood that warms up from where
    // its level starts (babies delighted, young curious, adults bored and busy) to delighted.
    const start = [4, 2, 0][Math.min(2, c.level)], mood = Math.round(start + (4 - start) * progress);
    this.emoji(bw, pick(PARTY, turn - (turn % 2)));
    bw.classList.toggle("on", turn % 2 === 0);
    if (turn >= 1) this.emoji(line, pick(MOODS[mood], turn - ((turn + 1) % 2))); else this.say(line, "…");
    (bar.querySelector("i") as HTMLElement).style.width = `${progress * 100}%`;
    bc.classList.add("on");
    bc.style.opacity = turn % 2 === 1 ? "1" : "0.6";
    void time;
  }
}

/** A wild legend's slow breath, 0 out to 1 in, once every `every` seconds (offset by its id). */
export const bossBreath = (time: number, id: number, every: number) => 0.5 - 0.5 * Math.cos((time / Math.max(0.1, every) + (id % 7) / 7) * Math.PI * 2);
