// The attack look (config/attack-look.json, art/attackLook.js; the gallery mock, previews/ed/spell-gallery): every attack dressed
// in its creature's element, whatever its delivery, from one baked atlas and one pool of instanced quads (four layers: light
// added, standing and on the ground; paint blended over, standing and on the ground; and the danger frame over everything from
// the treetops). Its parts, each placed by a delivery: core (what flies), trail (left behind it), impact (the hit: a flash, a
// shock ring, its bits flying its element's way, and a mark left on the ground), beam (beads strung along it), area (a quake's or
// a pulse's ground, its tiles spreading with the front) and motif (a side effect, by shape). And the shared DANGER FRAME every
// wild attack wears, whatever its element (Ed, 2026-10-27: "composability and telegraphing"): white = warning, a dark edge each
// side, marching = live, fill = the time left, a flash = now, brackets = you; its element shows only at the hit. Seeded from
// each attack's id and time (hash2), so a shot or a replay draws the same.
import * as THREE from "three";
import { attackLookAtlas } from "../../../art/attackLook.js";
import { ATTACK_LOOK, elementOf, rgbOf, spellPower, type SpellElement } from "../../rules/attackLook";
import { SPECIES_ATTACKS } from "../../rules/attacks/species";
import { hash2 } from "../../rules/random";
import type { Game } from "../../rules/game";
import { LIGHT_UNIFORMS } from "../lighting";
import { HEIGHT_UNIFORMS } from "../height";
import { SPRITE_UNIFORMS, metresPerArtPixel } from "../sprites";
import { Instances, VERT, FRAG, PIXEL_DOT_MAX } from "./glyphs";
import { comfort } from "../comfort";
import { indexedTexture } from "../atlas";
import { fxFor, type MagicFx } from "../fx/system";

type RGB = [number, number, number];
/** How an attack is dressed: its element, its creature's level, and (a party animal's) its neon, which tints the element's grey. */
/** look: a body's look tag (config/attack-look.json looks: an acorn, a feather...), its core drawn as that thing. */
export interface Dress { el: string; level: number; tint?: RGB | null; look?: string }

const PPM = 16; // art pixels a metre (the atlas's)
let K = 2; // whole art pixels an atlas pixel draws (config scale)
const TAU = Math.PI * 2;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
/** Who goes which way when an impact's bits fly: up (fire's tongues), out and falling (frost's shards, venom's drops, earth's
 *  rubble), rings (moonlight), forks (storm), in then out (shadow), drifting (bloom). */
const FALLS: Record<string, number> = { burst: -3, shatter: 9, splash: 10, ring: -1.5, crackle: 0, rubble: 12, poof: -1, blossom: 1.2 };

/** A telegraph's place, in plain geometry: the attack grammar's live telegraph's shape (src/rules/attacks/engine.ts Telegraph): a
 *  point (x, z), a segment from (x, z) to (ax, az) its width wide, a path (points: x, z pairs), a disc or ring r round (with inner,
 *  a donut's), a cone from (x, z) along heading (radians), angle wide (degrees) and r long; y (the look's own), how high over the
 *  ground a mark on someone goes (their top). */
export interface TelegraphShape { type?: string; x: number; z: number; x2?: number; z2?: number; ax?: number; az?: number; r?: number; inner?: number; width?: number; angle?: number; heading?: number; points?: number[]; y?: number }
/** A live telegraph (the grammar's s.telegraphs): its kind, its shape, when it began and when it fires; n, a countdown's pips. */
export interface LiveTelegraph { kind: string; shape: TelegraphShape; start: number; fire: number; n?: number }

interface LookFx { kind: "impact" | "mark" | "area"; d: Dress; x: number; y: number; z: number; at: number; life: number; seed: number; size: number }

/** The species the showcase flies (?lookdemo=species): one of each look, and the new elements. */
const DEMO_SPECIES = ["squirrel", "marten", "beaver", "otter", "raccoon", "owl", "raven", "polarbear", "heron", "scorpion", "stegosaurus", "armadillo", "redpanda", "beetle", "fennec", "griffin"];

export class AttackLook {
  readonly magic: MagicFx;
  /** light, added (glows); standing and on the ground */
  readonly glow: Instances; readonly glowFlat: Instances;
  /** painted over (solid cores, rubble, smoke, marks, the danger frame's dark edges and white dashes) */
  readonly paint: Instances; readonly paintFlat: Instances;
  /** the danger frame from the treetops: over the crowns */
  readonly over: Instances;
  private uvs = new Map<string, number[]>();
  private cells: Record<string, number[]>;
  private size: number;
  private fx: LookFx[] = [];
  private pal = new Map<string, RGB[]>();
  /** Shots seen in flight last frame, by id: where each was and its dress (one gone has hit: leash/combat.ts). */
  readonly shots = new Map<number, { x: number; z: number; d: Dress }>();
  readonly cfg = ATTACK_LOOK;

  constructor(scene: THREE.Scene, game: Game) {
    this.magic = fxFor(scene);
    const A = attackLookAtlas(this.cfg);
    K = this.cfg.scale;
    this.cells = A.cells; this.size = A.size;
    // (as palette indices where it fits, 256 values or fewer: a quarter of the bytes, the colours exact; render/palette.ts)
    const { tex, pal, indexed } = indexedTexture(new Uint8Array(A.rgba.buffer, A.rgba.byteOffset, A.rgba.length), A.size, A.size, "ui");
    const mat = (flat: number, solid: boolean, depthTest = true) => new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      uniforms: { ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, uRight: SPRITE_UNIFORMS.uRight, uUp: SPRITE_UNIFORMS.uUp, uRes: SPRITE_UNIFORMS.uRes, uMpp: { value: metresPerArtPixel(game.tuning) }, uDotMax: { value: PIXEL_DOT_MAX }, uFlat: { value: flat }, uGlyphs: { value: tex }, uGlyphsPal: { value: pal }, uGlyphIdx: { value: indexed ? 1 : 0 }, uSolid: { value: solid ? 1 : 0 }, uPull: { value: 0 }, uRgb: { value: 1 } },
      transparent: true, depthWrite: false, depthTest, blending: solid ? THREE.NormalBlending : THREE.AdditiveBlending,
    });
    this.paintFlat = new Instances(mat(1, true)); this.paintFlat.mesh.renderOrder = 2.97; // (over the ground, under the creatures)
    this.glowFlat = new Instances(mat(1, false)); this.glowFlat.mesh.renderOrder = 2.98;
    this.paint = new Instances(mat(0, true));
    this.glow = new Instances(mat(0, false));
    this.over = new Instances(mat(1, true, false)); this.over.mesh.renderOrder = 11.4;
    scene.add(this.paintFlat.mesh, this.glowFlat.mesh, this.paint.mesh, this.glow.mesh, this.over.mesh);
  }

  /** Another night: the effects in flight forgotten. */
  reset(): void { this.fx = []; this.shots.clear(); }
  begin(): void { for (const L of this.layers()) L.begin(); }
  end(): void { for (const L of this.layers()) L.end(); }
  private layers(): Instances[] { return [this.glow, this.glowFlat, this.paint, this.paintFlat, this.over]; }
  /** How many quads it drew this frame (the cost, for the debug overlay and the bench). */
  get count(): number { return this.layers().reduce((n, L) => n + (L.mesh.geometry as THREE.InstancedBufferGeometry).instanceCount, 0); }

  /** A cell's rect in the atlas: u0, v0 (its top), u1, v1 (its bottom); the data texture's row 0 is its v 0. */
  uv(name: string): number[] {
    let r = this.uvs.get(name);
    if (!r) { const c = this.cells[name] ?? this.cells.px, N = this.size; r = [c[0] / N, c[1] / N, (c[0] + c[2]) / N, (c[1] + c[3]) / N]; this.uvs.set(name, r); }
    return r;
  }
  private flips = new Map<string, number[]>();
  /** A cell's rect mirrored left to right (a look flying left). */
  private flipped(name: string, uv: number[]): number[] {
    let r = this.flips.get(name);
    if (!r) this.flips.set(name, (r = [uv[2], uv[1], uv[0], uv[3]]));
    return r;
  }
  private px(name: string): number { return (this.cells[name] ?? this.cells.px)[2]; }
  private el(d: Dress): SpellElement { return this.cfg.elements[d.el] ?? this.cfg.elements[this.cfg.default]; }
  /** Its four colours, dark to hot, 0 to 1 (a party animal's: its neon over the grey steps). */
  colours(d: Dress): RGB[] {
    if (d.tint) { const t = d.tint, s = [0.36, 0.62, 0.85, 1]; return s.map((k, i) => (i === 3 ? [Math.min(1, t[0] * 0.4 + 0.6), Math.min(1, t[1] * 0.4 + 0.6), Math.min(1, t[2] * 0.4 + 0.6)] : [t[0] * k, t[1] * k, t[2] * k]) as RGB); }
    let p = this.pal.get(d.el);
    if (!p) this.pal.set(d.el, (p = this.el(d).palette.map(rgbOf)));
    return p;
  }
  private name(d: Dress, part: string): string { return `${this.cfg.elements[d.el] ? d.el : this.cfg.default}.${d.tint ? "g" : "c"}.${part}`; }
  /** A cell drawn whole at its art pixels (times scale), standing or flat. */
  private put(L: Instances, cell: string, x: number, y: number, z: number, scale: number, a: number, rgb: RGB = [1, 1, 1]): void {
    if (a <= 0.01) return;
    L.add(x, y, z, ((this.px(cell) * K) / PPM) * scale, this.uv(cell), rgb[0], rgb[1], rgb[2], Math.min(1, a));
  }
  private tinted(d: Dress): RGB { return d.tint ? [d.tint[0] * 1.15, d.tint[1] * 1.15, d.tint[2] * 1.15] : [1, 1, 1]; }
  private solid(d: Dress): boolean { return !!this.el(d).solid; }

  // ---- the parts ----

  /** What flies: its core (in its frame), a halo of its light, and its trail behind it along -v (seconds of flight back). */
  core(d: Dress, x: number, y: number, z: number, vx: number, vy: number, vz: number, time: number, seed: number): void {
    this.magic.draw(d.el, vy > 1 ? "lob" : "projectile", x, y, z, d.level, 1, d.look ? 0.45 : 1, 0, seed, d.tint);
    const P = this.colours(d), legend = d.level >= 3, pw = spellPower(d.level), f = Math.floor(time * 12 + seed) % 4, t = this.tinted(d);
    this.glow.add(x, y, z, 1.5 * pw, this.uv("dot"), P[1][0], P[1][1], P[1][2], 0.5);
    const L = d.look ? this.cfg.looks[d.look] : undefined;
    if (L) {
      // its look's own core (painted: a thing, not light), its own colours or its element's (a party animal's: its neon), facing its way
      const cell = `look.${d.look}.${L.palette && !d.tint ? "c" : "g"}.core.${legend ? "l" : "a"}.${f}`, R = SPRITE_UNIFORMS.uRight.value, left = vx * R.x + vz * R.z < 0;
      const tint: RGB = L.palette && !d.tint ? [1, 1, 1] : d.tint ? t : [Math.min(1, P[2][0] * 1.1), Math.min(1, P[2][1] * 1.1), Math.min(1, P[2][2] * 1.1)];
      const uv = this.uv(cell), px = (this.px(cell) * K) / PPM;
      this.paint.add(x, y, z, px, left ? this.flipped(cell, uv) : uv, tint[0], tint[1], tint[2], 1);
    } else if (!this.magic.enabled) {
      this.put(this.solid(d) ? this.paint : this.glow, this.name(d, `core.${legend ? "l" : "a"}.${f}`), x, y, z, 1, 1, t);
      if (this.solid(d)) this.put(this.glow, this.name(d, `core.${legend ? "l" : "a"}.${f}`), x, y, z, 1, 0.35, t);
    }
    this.trail(d, x, y, z, vx, vy, vz, time, seed);
  }

  /** Bits left along its way, each born at a moment of its flight (whole steps of time, so they stay put as it flies on) and
   *  drifting its element's way: embers rise, drips fall, sparkles wink, smoke grows. */
  trail(d: Dress, x: number, y: number, z: number, vx: number, vy: number, vz: number, time: number, seed: number): void {
    const e = this.el(d), P = this.colours(d), n = Math.round(this.cfg.particles.trail * spellPower(d.level) * 0.35), dt = 1 / this.cfg.particles.trail, life = n * dt;
    const now = Math.floor(time / dt), solid = this.solid(d), t = this.tinted(d);
    for (let i = 1; i <= n; i++) {
      const born = now - i, age = time - born * dt, k = age / life;
      if (k >= 1) continue;
      const h1 = hash2(seed, born, 11), h2 = hash2(seed, born, 13), h3 = hash2(seed, born, 17);
      let X = x - vx * age + (h1 - 0.5) * 0.35, Y = y - vy * age + (h2 - 0.5) * 0.3, Z = z - vz * age + (h3 - 0.5) * 0.35;
      const tr = e.trail;
      if (tr === "embers") Y += age * 1.6; else if (tr === "drips") Y -= age * age * 5; else if (tr === "wisps") { X += Math.sin(age * 9 + h1 * 6) * 0.3; Y += age * 0.6; }
      else if (tr === "dust") Y -= age * 0.6; else if (tr === "smoke") Y += age * 0.5; else if (tr === "petals") { X += Math.sin(age * 5 + h1 * 6) * 0.4; Y -= age * 0.8; }
      else if (tr === "sparks") { X += (hash2(seed, born, Math.floor(time * 20)) - 0.5) * 0.5; Y += (hash2(seed, born, Math.floor(time * 20) + 1) - 0.5) * 0.4; }
      if (tr === "sparkles" && (born + Math.floor(time * 10)) % 3) continue; // (winking)
      const cell = this.name(d, `bit.${h1 < 0.7 ? 0 : 1}.${Math.floor(time * 10 + h2 * 2) % 2}`), a = (1 - k) * (tr === "smoke" || tr === "dust" ? 0.85 : 1);
      this.put(solid ? this.paint : this.glow, cell, X, Math.max(0.05, Y), Z, tr === "smoke" ? 1 + k : 1, a, t);
      if (i % 3 === 0 && !solid) this.glow.add(X, Y, Z, 0.5, this.uv("dot"), P[2][0], P[2][1], P[2][2], 0.25 * (1 - k));
    }
  }

  /** A hit, k 0 (the moment) to 1 (gone): a flash, a shock ring in its colours, its bits flying its element's way, a glow. */
  impact(d: Dress, x: number, y: number, z: number, k: number, seed: number, size = 1): void {
    this.magic.draw(d.el, d.level >= 3 ? "eruption" : "burst", x, y, z, d.level, size, Math.min(1, k * 8, (1-k)*2), k, seed, d.tint);
    const e = this.el(d), P = this.colours(d), pw = spellPower(d.level) * size, solid = this.solid(d), t = this.tinted(d);
    const n = Math.round(this.cfg.particles.impact * pw), fall = FALLS[e.impact] ?? 0;
    // the flash and its light (every element)
    if (d.level >= 3 && k < 0.25 && !comfort.reduceFlashing) this.put(this.glow, `flash${Math.min(2, Math.floor(k * 12))}`, x, y, z, Math.max(1, Math.round(pw)), 1 - k * 3, P[3]);
    this.glow.add(x, y, z, 3.2 * pw * (0.6 + k), this.uv("dot"), P[1][0], P[1][1], P[1][2], (comfort.reduceFlashing ? 0.3 : 0.7) * (1 - k) * (1 - k));
    // its shock ring, on the ground, in its bright colour (two for the ring element, moonlight's)
    const rings = e.impact === "ring" ? 2 : 1;
    for (let r = 0; r < rings; r++) {
      const R = (0.6 + k * 2.6 * (1 - r * 0.35)) * pw, m = Math.round((R * 14) / K), a = (1 - k) * (r ? 0.6 : 0.95);
      if (k < 0.7 || e.impact === "ring") for (let i = 0; i < m; i++) { const q = (i / m) * TAU; this.glowFlat.add(x + Math.cos(q) * R, 0, z + Math.sin(q) * R, (2 * K) / PPM, this.uv("px"), P[2 + r][0], P[2 + r][1], P[2 + r][2], a); }
    }
    // the bits
    for (let i = 0; i < n; i++) {
      const h = hash2(seed, i, 3), a0 = h * TAU, sp = (1.2 + hash2(seed, i, 5) * 2.4) * pw, up = (0.5 + hash2(seed, i, 7) * 2.5) * pw, big = hash2(seed, i, 9);
      let r = sp * k, Y = y + up * k - fall * k * k * 0.5, fade = 1 - k;
      if (e.impact === "burst") { r = sp * 0.6 * Math.sqrt(k); Y = y + (up + 1.5) * k; fade = 1 - k * k; } // tongues of flame, rising
      else if (e.impact === "shatter") { r = sp * 1.5 * Math.sqrt(k); } // shards flying fast
      else if (e.impact === "poof") { r = k < 0.25 ? sp * (0.25 - k) * 3 : sp * (k - 0.25) * 0.9; Y = y + k * 1.2; } // in, then out
      else if (e.impact === "blossom") { r = sp * 0.8 * Math.sqrt(k); Y = y + up * 0.5 * Math.sin(k * Math.PI) - k * 0.6; }
      else if (e.impact === "crackle") { if (k > 0.65) continue; r = sp * 0.9 * Math.min(1, k * 3); Y = y + (hash2(seed, i, 15) - 0.5) * 1.2; }
      else if (e.impact === "ring") { r = sp * 0.7 * k; Y = y + up * 0.6 * k; }
      const ang = a0 + (e.impact === "blossom" ? k * 2 : 0), X = x + Math.cos(ang) * r, Z = z + Math.sin(ang) * r * 0.8;
      if (Y < 0.04) { if (e.impact === "splash" || e.impact === "rubble") Y = 0.04; else continue; }
      const cell = this.name(d, `bit.${big < 0.45 ? 0 : big < 0.8 ? 1 : 2}.${Math.floor(k * 8 + h * 2) % 2}`);
      this.put(solid ? this.paint : this.glow, cell, X, Y, Z, 1, fade * 1.1, t);
      if (e.impact === "crackle" && i % 2 === 0) this.put(this.glow, this.name(d, `bit.2.${Math.floor(k * 20) % 2}`), x + Math.cos(ang) * r * 0.5, Y, z + Math.sin(ang) * r * 0.4, 1, 1 - k, t);
    }
  }

  /** What a hit leaves on the ground, fading (k 0 to 1); its glowing marks (halo, rime, flowers) lit, the rest painted. */
  mark(d: Dress, x: number, z: number, k: number, size = 1): void {
    const m = this.el(d).mark, lit = m === "halo" || m === "rime" || m === "flowers", a = (1 - k) * (lit ? 0.9 : 0.8);
    this.put(lit ? this.glowFlat : this.paintFlat, this.name(d, "mark"), x, 0.02, z, size * spellPower(d.level), a, this.tinted(d));
  }

  /** A beam from (x0, z0) to (x1, z1), width wide: a hot core line, its element's beads strung along it (scrolling, licking,
   *  forking, dripping its way), a glow as wide as it hurts, a flare at its mouth and sparks where it ends. */
  beam(d: Dress, x0: number, z0: number, x1: number, z1: number, y: number, width: number, time: number, seed: number, fade = 1): void {
    this.magic.beam(d.el, x0, z0, x1, z1, y, width, d.level, fade*0.65, seed, d.tint);
    const e = this.el(d), P = this.colours(d), t = this.tinted(d), solid = this.solid(d), pw = spellPower(d.level);
    const dx = x1 - x0, dz = z1 - z0, L = Math.hypot(dx, dz) || 1, ux = dx / L, uz = dz / L, fl = comfort.reduceFlashing ? 1 : 0.9 + 0.1 * Math.sin(time * 3 + seed);
    for (let s = 0.4; s < L; s += 0.6) this.glow.add(x0 + ux * s, y, z0 + uz * s, Math.max(0.7, width) * 1.1, this.uv("dot"), P[1][0], P[1][1], P[1][2], 0.16 * fl * fade);
    for (let s = 0.3; s < L; s += K / PPM) this.glow.add(x0 + ux * s, y, z0 + uz * s, K / PPM, this.uv("px"), P[3][0], P[3][1], P[3][2], 0.8 * fade); // (its hot core, an art pixel thin)
    const step = (this.px(this.name(d, "beam.0.0")) * 0.55 * K) / PPM, scroll = (time * 6) % step, beam = e.beam, ft = Math.floor(time * 10);
    let j = 0;
    for (let s = 0.5 + scroll; s < L; s += step, j++) {
      const h = hash2(seed, j, 21), i = Math.floor(h * 3), f = (ft + j) % 2;
      let off = 0, Y = y;
      if (beam === "fork") off = (hash2(seed, j, ft) - 0.5) * width * 0.9;
      else if (beam === "ripple") Y += Math.sin(s * 2 - time * 8) * 0.15;
      else if (beam === "smoke") Y += ((time * 0.8 + h) % 1) * 0.4;
      else if (beam === "flame") Y += 0.08 * Math.sin(time * 20 + j);
      this.put(solid ? this.paint : this.glow, this.name(d, `beam.${i}.${f}`), x0 + ux * s - uz * off, Y, z0 + uz * s + ux * off, Math.max(1, Math.round(pw)), fade, t);
      // drips falling off it (venom), petals and embers drifting off it (bloom, fire)
      if ((beam === "drip" || beam === "petal" || beam === "flame") && h < 0.3) {
        const ph = (time * 1.4 + h * 7) % 1, dy = beam === "drip" ? -ph * ph * Y : beam === "flame" ? ph * 1.2 : -ph * 0.6;
        this.put(this.glow, this.name(d, `bit.0.${f}`), x0 + ux * s + (beam === "petal" ? Math.sin(ph * 6) * 0.3 : 0), Math.max(0.05, Y + dy), z0 + uz * s, 1, 1 - ph, t);
      }
    }
    this.put(solid ? this.paint : this.glow, this.name(d, `core.${d.level >= 3 ? "l" : "a"}.${ft % 4}`), x0 + ux * 0.4, y, z0 + uz * 0.4, 1, fade, t);
    for (let i = 0; i < 4; i++) { const q = hash2(seed, ft, i), a = q * TAU, r = 0.3 + q * 0.6 * pw; this.put(this.glow, this.name(d, `bit.${i % 3}.${(ft + i) % 2}`), x1 + Math.cos(a) * r, y + Math.sin(a) * r * 0.6 + 0.2, z1, 1, fade, t); }
  }

  /** A quake's or a pulse's ground, k 0 (the moment) to 1 (gone): a front running out to R, its element's tiles spread behind it
   *  (scorch, rime, puddles, cracks...), a ring of its light on the front, and bits thrown up along it. */
  area(d: Dress, x: number, z: number, R: number, k: number, seed: number): void {
    this.magic.draw(d.el, "zone", x, 0, z, d.level, R, Math.min(1,k*8,(1-k)*3), k, seed, d.tint);
    const P = this.colours(d), t = this.tinted(d), front = R * Math.min(1, Math.sqrt(k * 2.2)), fade = k < 0.6 ? 1 : 1 - (k - 0.6) / 0.4, m = this.el(d).area, lit = m === "halo" || m === "rime" || m === "flowers";
    const n = Math.min(70, Math.round(R * R * 0.9) + 6);
    for (let i = 0; i < n; i++) {
      const q = Math.sqrt(hash2(seed, i, 31)) * R, a = hash2(seed, i, 37) * TAU;
      if (q > front) continue;
      this.put(lit ? this.glowFlat : this.paintFlat, this.name(d, `area.${i % 2}`), x + Math.cos(a) * q, 0.02, z + Math.sin(a) * q, 1, fade * 0.85, t);
    }
    if (k < 0.75) {
      const m2 = Math.round((front * 12) / K);
      for (let i = 0; i < m2; i++) { const q = (i / m2) * TAU; this.glowFlat.add(x + Math.cos(q) * front, 0, z + Math.sin(q) * front, (3 * K) / PPM, this.uv("px"), P[2][0], P[2][1], P[2][2], 0.95 * (1 - k)); }
      for (let i = 0; i < 14; i++) { const q = hash2(seed, i, 41) * TAU, up = hash2(seed, i, 43) * 1.4 * Math.sin(Math.min(1, k * 3) * Math.PI); this.put(this.solid(d) ? this.paint : this.glow, this.name(d, `bit.${i % 3}.${Math.floor(k * 10 + i) % 2}`), x + Math.cos(q) * front, 0.15 + up, z + Math.sin(q) * front, 1, 1 - k, t); }
    }
    this.glowFlat.add(x, 0, z, front * 2.2, this.uv("dot"), P[1][0], P[1][1], P[1][2], 0.35 * fade);
  }

  /** A side effect over a creature, by shape (slow chains at its feet, stun stars round its head, knockback's shock arcs, confuse's
   *  spiral), in its attacker's bright colour. */
  motif(effect: string, d: Dress | null, x: number, top: number, z: number, time: number, seed: number): void {
    const m = this.cfg.effects[effect], c = d ? this.colours(d)[2] : ([0.85, 0.9, 1] as RGB), R = SPRITE_UNIFORMS.uRight.value;
    if (m === "chains") for (let i = 0; i < 4; i++) { const a = time * 1.6 + (i / 4) * TAU; this.put(this.paint, `chain${(Math.floor(time * 6) + i) % 4}`, x + Math.cos(a) * 0.8, 0.25, z + Math.sin(a) * 0.55, 1, 0.95, c); }
    else if (m === "stars") for (let i = 0; i < 3; i++) { const a = time * 5 + (i / 3) * TAU; this.put(this.glow, `star${Math.floor(time * 8 + i) % 2}`, x + Math.cos(a) * 0.6, top + 0.25 + Math.sin(a * 2) * 0.08, z + Math.sin(a) * 0.4, 1, 1, c); }
    else if (m === "shockwave") this.put(this.glow, `shock${Math.floor(time * 10 + seed) % 3}`, x - R.x * 0.6, top * 0.5, z - R.z * 0.6, 1, 0.9, c);
    else if (m === "spiral") this.put(this.glow, `spiral${Math.floor(time * 8) % 4}`, x, top + 0.45, z, 1, 1, c);
  }

  // ---- what's in flight: impacts, marks and areas, each drawn till its life is out ----

  /** A hit's impact and the mark it leaves. */
  hit(d: Dress, x: number, y: number, z: number, time: number, seed: number, size = 1): void {
    this.fx.push({ kind: "impact", d, x, y, z, at: time, life: 0.75, seed, size });
    this.fx.push({ kind: "mark", d, x, y: 0, z, at: time, life: 2.6, seed, size });
  }
  /** A quake's or pulse's ground spreading out to R. */
  burst(d: Dress, x: number, z: number, R: number, time: number, seed: number): void {
    this.fx.push({ kind: "area", d, x, y: 0, z, at: time, life: 1.4, seed, size: R });
    this.fx.push({ kind: "impact", d, x, y: 0.6, z, at: time, life: 0.6, seed: seed + 1, size: 1.3 });
  }
  drawFx(time: number): void {
    let j = 0;
    for (const f of this.fx) if (time - f.at < f.life && time >= f.at - 0.5) this.fx[j++] = f;
    this.fx.length = j;
    for (const f of this.fx) {
      const k = clamp01((time - f.at) / f.life);
      if (f.kind === "impact") this.impact(f.d, f.x, f.y, f.z, k, f.seed, f.size);
      else if (f.kind === "mark") this.mark(f.d, f.x, f.z, k * k, f.size);
      else this.area(f.d, f.x, f.z, f.size, k, f.seed);
    }
  }

  // ---- the danger frame: the same whatever the element ----

  /** The danger layer: on the ground, or over the crowns from the treetops. */
  private dl(up: boolean): Instances { return up ? this.over : this.paintFlat; }
  /** A "now" blink: off for a moment, flash seconds before it lands. */
  private blink(left: number, time: number): number { return !comfort.reduceFlashing && left < this.cfg.danger.flash && Math.floor(time * 16) % 2 ? 0.35 : 1; } // (none with reduce flashing: the Settings page)
  /** A dashed path of warn pixels along f(s), s 0 to L metres, its dashes marching (forward: along it). */
  private dashes(L: number, at: (s: number) => [number, number], time: number, a: number, up: boolean, scale = 1): void {
    const D = this.cfg.danger, step = (2 * K * scale) / PPM, period = ((D.dash + D.gap) * 2 * K * scale) / PPM, on = (D.dash * 2 * K * scale) / PPM, march = ((time * D.march * K) / PPM) % period;
    for (let s = 0; s < L; s += step) { if ((s - march + period * 4) % period > on) continue; const [x, z] = at(s); this.put(this.dl(up), "warn", x, 0.03, z, scale, a); }
  }
  /** A ring: R metres round (x, z); fill 0 to 1 a second ring closing in from it (the time left), left seconds to go. */
  ring(x: number, z: number, R: number, fill: number, left: number, time: number, up = false): void {
    const a = this.blink(left, time), sc = up ? 2.6 : 1, C = TAU * R;
    this.dashes(C, s => [x + Math.cos(s / R) * R, z + Math.sin(s / R) * R], time, a, up, sc);
    const r2 = R * (1 - clamp01(fill));
    if (r2 > 0.3) { const C2 = TAU * r2, n = Math.round(C2 / ((3 * K * sc) / PPM)); for (let i = 0; i < n; i++) { const q = (i / n) * TAU; this.put(this.dl(up), "px", x + Math.cos(q) * r2, 0.03, z + Math.sin(q) * r2, sc * 0.5, 0.55 * a); } }
    if (left < this.cfg.danger.flash && !comfort.reduceFlashing) this.put(up ? this.over : this.glow, `flash${Math.floor(time * 12) % 3}`, x, up ? 0.04 : 0.6, z, sc, 0.9);
  }
  /** A lane from (x0, z0) to (x1, z1), half its width each side: its two edges dashed and marching, chevrons filling it from the
   *  caster as time runs out (fill 0 to 1). */
  lane(x0: number, z0: number, x1: number, z1: number, half: number, fill: number, left: number, time: number, up = false): void {
    const dx = x1 - x0, dz = z1 - z0, L = Math.hypot(dx, dz) || 1, ux = dx / L, uz = dz / L, a = this.blink(left, time), sc = up ? 2.6 : 1;
    for (const side of [-1, 1]) this.dashes(L, s => [x0 + ux * s - uz * half * side, z0 + uz * s + ux * half * side], time, a, up, sc);
    const gap = 0.9 * sc, upto = L * clamp01(fill), shift = (time * 3) % gap;
    for (let s = 0.6 + shift; s < upto; s += gap) this.put(this.dl(up), "chev", x0 + ux * s, 0.03, z0 + uz * s, sc, a * 0.9);
  }
  /** A beam's line, thin to full: one dashed line, then wider dashes, then (the last warning) a solid white bar. */
  beamLine(x0: number, z0: number, x1: number, z1: number, half: number, k: number, left: number, time: number, up = false): void {
    const dx = x1 - x0, dz = z1 - z0, L = Math.hypot(dx, dz) || 1, ux = dx / L, uz = dz / L, a = this.blink(left, time), sc = up ? 2.6 : 1;
    if (k < 0.4) this.dashes(L, s => [x0 + ux * s, z0 + uz * s], time, a, up, sc);
    else if (k < 0.8) { const w = half * 0.5; for (const side of [-1, 0, 1]) this.dashes(L, s => [x0 + ux * s - uz * w * side, z0 + uz * s + ux * w * side], time, a, up, sc); }
    else { const w = half * 0.7, step = (2 * K * sc) / PPM; for (let s = 0; s < L; s += step) for (let q = -w; q <= w; q += step) this.put(this.dl(up), Math.abs(q) > w - step ? "warn" : "px", x0 + ux * s - uz * q, 0.03, z0 + uz * s + ux * q, Math.abs(q) > w - step ? sc : sc * 0.5, a); }
  }
  /** A cone from (x, z) along angle, spread radians each side, out to R: its two sides and its arc dashed, its fill sweeping out. */
  cone(x: number, z: number, angle: number, spread: number, R: number, fill: number, left: number, time: number, up = false): void {
    const a = this.blink(left, time), sc = up ? 2.6 : 1;
    for (const side of [-1, 1]) { const q = angle + spread * side; this.dashes(R, s => [x + Math.cos(q) * s, z + Math.sin(q) * s], time, a, up, sc); }
    this.dashes(R * spread * 2, s => { const q = angle - spread + s / R; return [x + Math.cos(q) * R, z + Math.sin(q) * R]; }, time, a, up, sc);
    const r = R * clamp01(fill), n = Math.max(3, Math.round((r * spread * 2) / 0.5));
    for (let i = 0; i <= n; i++) { const q = angle - spread + (2 * spread * i) / n; this.put(this.dl(up), "px", x + Math.cos(q) * r, 0.03, z + Math.sin(q) * r, sc * 0.5, 0.6 * a); }
  }
  /** A delayed blast's countdown: n pips over (x, y, z), the ones left lit. */
  pips(x: number, y: number, z: number, n: number, lit: number, up = false): void {
    const R = SPRITE_UNIFORMS.uRight.value, sc = up ? 2.6 : 1, gap = (6 * K * sc) / PPM;
    for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * gap; this.put(up ? this.over : this.paint, i < lit ? "pip" : "pipOff", x + R.x * o, y, z + R.z * o, sc, 1); }
  }
  /** Brackets closing on someone (a lock-on, the next in a chain): four corners r metres out. */
  brackets(x: number, y: number, z: number, r: number, a: number, up = false): void {
    const R = SPRITE_UNIFORMS.uRight.value, sc = up ? 2.6 : 1;
    for (let q = 0; q < 4; q++) { const ox = q & 1 ? r : -r, oy = q & 2 ? -r : r; this.put(up ? this.over : this.paint, `bracket${q}`, x + R.x * ox, y + oy, z + R.z * ox, sc, a); }
  }
  /** A tether's line before it goes live: dashed, flickering as it's about to. */
  tether(x0: number, z0: number, x1: number, z1: number, left: number, time: number, up = false): void {
    const dx = x1 - x0, dz = z1 - z0, L = Math.hypot(dx, dz) || 1;
    if (left < this.cfg.danger.flash * 2 && !comfort.reduceFlashing && Math.floor(time * 20) % 2) return;
    this.dashes(L, s => [x0 + (dx * s) / L, z0 + (dz * s) / L], time, 1, up, up ? 2.6 : 1);
  }
  /** The ground outside a shrinking safe circle: dark hatch from R out to Rout. */
  hatch(x: number, z: number, R: number, Rout: number, up = false): void {
    const tile = (16 * K * (up ? 2.6 : 1)) / PPM;
    for (let gx = -Rout; gx <= Rout; gx += tile) for (let gz = -Rout; gz <= Rout; gz += tile) { const d = Math.hypot(gx, gz); if (d > R && d < Rout) this.put(this.dl(up), "hatch", x + gx, 0.025, z + gz, up ? 2.6 : 1, this.cfg.danger.hatch * 2); }
  }
  /** A mine arming: dim and dashed, a slow pulse, while it arms (k 0 to 1); armed, a solid ring at its trigger radius, pulsing
   *  fast. */
  arming(x: number, z: number, r: number, k: number, time: number, up = false): void {
    const armed = k >= 1, sc = up ? 2.6 : 1, R = armed ? r * (1 + 0.04 * Math.sin(time * 18)) : r * (0.45 + 0.1 * Math.sin(time * 4)), n = Math.round((TAU * R) / ((2 * K * sc) / PPM));
    for (let i = 0; i < n; i++) { if (!armed && Math.floor(i / 3) % 2) continue; const q = (i / n) * TAU; this.put(this.dl(up), "warn", x + Math.cos(q) * R, 0.03, z + Math.sin(q) * R, sc, armed ? (Math.floor(time * 10) % 2 ? 1 : 0.7) : 0.55 + 0.45 * k); }
    this.put(up ? this.over : this.paint, "pip", x, 0.2, z, sc, armed ? 1 : 0.6);
  }
  /** The next in a chain: a dashed link from the one struck to the next, brackets closing on it (k 0 to 1). */
  chainNext(x0: number, z0: number, x1: number, z1: number, top: number, k: number, time: number, up = false): void {
    const dx = x1 - x0, dz = z1 - z0, L = Math.hypot(dx, dz) || 1;
    this.dashes(L, s => [x0 + (dx * s) / L, z0 + (dz * s) / L], time, 1, up, up ? 2.6 : 1);
    this.brackets(x1, top * 0.6, z1, 0.9 - 0.4 * k, 0.6 + 0.4 * k, up);
  }

  /** Any live telegraph, by its kind (the attack grammar's TelegraphKind), drawn from its shape alone. */
  telegraph(t: LiveTelegraph, time: number, up = false): void {
    const S = t.shape, k = clamp01((time - t.start) / Math.max(0.01, t.fire - t.start)), left = t.fire - time;
    const seg = (): [number, number, number, number] => [S.x, S.z, S.x2 ?? S.ax ?? S.x, S.z2 ?? S.az ?? S.z];
    if (S.type === "polygon" && S.points && t.kind !== "none") { this.polygon(S.points, k, left, time, up); return; }
    switch (t.kind) {
      case "lane": if (S.points && S.points.length >= 4) { const P = S.points; for (let i = 0; i + 3 < P.length; i += 2) this.lane(P[i], P[i + 1], P[i + 2], P[i + 3], (S.width ?? 1) / 2, k, left, time, up); } else { const [a, b, c, d] = seg(); this.lane(a, b, c, d, (S.width ?? 1) / 2, k, left, time, up); } break;
      case "landing": this.ring(S.x, S.z, S.r ?? 2, k, left, time, up); break;
      case "ring": this.ring(S.x, S.z, S.r ?? 3, k, left, time, up); if (S.inner) this.ring(S.x, S.z, S.inner, 0, left, time, up); break;
      case "cone": this.cone(S.x, S.z, S.heading ?? 0, ((S.angle ?? 60) * Math.PI) / 360, S.r ?? 6, k, left, time, up); break;
      case "beamLine": { const [a, b, c, d] = seg(); this.beamLine(a, b, c, d, (S.width ?? 1) / 2, k, left, time, up); break; }
      case "countdown": { const n = t.n ?? 3; this.pips(S.x, (S.y ?? 1) + 0.6, S.z, n, Math.ceil(n * (1 - k))); if (S.r) this.ring(S.x, S.z, S.r, k, left, time, up); break; }
      case "arming": this.arming(S.x, S.z, S.r ?? 1.5, k, time, up); break;
      case "chainNext": { const [a, b, c, d] = seg(); this.chainNext(a, b, c, d, S.y ?? 1.4, k, time, up); break; }
      case "tetherLine": { const [a, b, c, d] = seg(); this.tether(a, b, c, d, left, time, up); break; }
      case "lockOn": this.brackets(S.x, (S.y ?? 1.6) * 0.6, S.z, 1.1 - 0.5 * k, k > 0.8 || comfort.reduceFlashing || Math.floor(time * 10) % 3 ? 1 : 0.55, up); break;
      case "flash": this.tell(S.x, S.z, S.y ?? 1.4, S.r ?? 1.2, k, time, up); break;
      case "safeCircle": this.hatch(S.x, S.z, S.r ?? 4, (S.r ?? 4) + 2.5, up); this.ring(S.x, S.z, S.r ?? 4, 0, left, time, up); break;
      default: break; // ("none")
    }
  }

  /** A polygon's edges dashed (a triangulation's ground, points x, z pairs), a second outline closing on its middle (fill). */
  polygon(P: number[], fill: number, left: number, time: number, up = false): void {
    const n = P.length >> 1, a = this.blink(left, time), sc = up ? 2.6 : 1;
    let cx = 0, cz = 0; for (let i = 0; i < n; i++) { cx += P[i * 2] / n; cz += P[i * 2 + 1] / n; }
    for (let i = 0; i < n; i++) {
      const x0 = P[i * 2], z0 = P[i * 2 + 1], x1 = P[((i + 1) % n) * 2], z1 = P[((i + 1) % n) * 2 + 1], L = Math.hypot(x1 - x0, z1 - z0) || 1, q = 1 - clamp01(fill);
      this.dashes(L, s => [x0 + ((x1 - x0) * s) / L, z0 + ((z1 - z0) * s) / L], time, a, up, sc);
      if (q > 0.05) { const m = Math.round((L * q) / ((3 * K * sc) / PPM)); for (let j = 0; j <= m; j++) { const u = j / Math.max(1, m); this.put(this.dl(up), "px", cx + (x0 + (x1 - x0) * u - cx) * q, 0.03, cz + (z0 + (z1 - z0) * u - cz) * q, sc * 0.5, 0.55 * a); } }
    }
    if (left < this.cfg.danger.flash && !comfort.reduceFlashing) this.put(up ? this.over : this.glow, `flash${Math.floor(time * 12) % 3}`, cx, up ? 0.04 : 0.6, cz, sc, 0.9);
  }
  /** A lingering zone (a puddle, fire, frost, a web): its element's tiles over its shape, a slow shimmer of its light, fading in
   *  and out; inside(x, z) says which of the tiles' places are in it (a ring's, a cone's, a polygon's shape). */
  zone(d: Dress, x: number, z: number, r: number, k: number, seed: number, inside: (x: number, z: number) => boolean, time: number): void {
    const P = this.colours(d), t = this.tinted(d), m = this.el(d).area, lit = m === "halo" || m === "rime" || m === "flowers", fade = Math.min(1, k * 6, (1 - k) * 4);
    const n = Math.min(80, Math.round(r * r * 1.1) + 4);
    for (let i = 0; i < n; i++) {
      const q = Math.sqrt(hash2(seed, i, 31)) * r, a = hash2(seed, i, 37) * TAU, X = x + Math.cos(a) * q, Z = z + Math.sin(a) * q;
      if (!inside(X, Z)) continue;
      if (i % 4 === 0) this.magic.draw(d.el, "trap", X, 0, Z, d.level, 0.6, fade*0.6, k, seed+i, d.tint);
      this.put(lit ? this.glowFlat : this.paintFlat, this.name(d, `area.${i % 2}`), X, 0.02, Z, 1, fade * 0.85, t);
      if (i % 5 === 0) { const ph = (time * 0.7 + hash2(seed, i, 41)) % 1; this.put(this.solid(d) ? this.paint : this.glow, this.name(d, `bit.0.${Math.floor(time * 6 + i) % 2}`), X, 0.1 + ph * 0.8, Z, 1, fade * (1 - ph), t); }
    }
    this.glowFlat.add(x, 0, z, r * 2, this.uv("dot"), P[1][0], P[1][1], P[1][2], 0.18 * fade);
  }

  /** The wind-up tell: a white ring at its feet tightening, and the "!" over its head as it's about to (k 0 to 1). */
  tell(x: number, z: number, top: number, r: number, k: number, time: number, up = false): void {
    const R = r * (1.6 - 0.6 * k), sc = up ? 2.6 : 1, n = Math.round((TAU * R) / ((3 * K * sc) / PPM));
    for (let i = 0; i < n; i++) { const q = (i / n) * TAU + time; this.put(this.dl(up), i % 2 ? "warn" : "px", x + Math.cos(q) * R, 0.03, z + Math.sin(q) * R, i % 2 ? sc : sc * 0.5, 0.4 + 0.6 * k); }
    if (k > 0.55) this.put(up ? this.over : this.paint, "tick", x, top + 0.5 + (up ? 1 : 0), z, sc, k > 0.85 && !comfort.reduceFlashing && Math.floor(time * 16) % 2 ? 0.5 : 1);
  }

  /** A showcase round (x, z) (?lookdemo=telegraphs|elements: render/leash/combat.ts), looping every few seconds: every
   *  telegraph kind from first warning to its hit, in a 4 × 3 grid, each in a different element; or every element's bolt, hit,
   *  beam and quake, a column each. For judging the look without an attack in the rules that makes each one. */
  demo(which: string, x: number, z: number, time: number): void {
    if (which === "fx" || which.startsWith("fx:")) { this.magic.gallery(which.split(":")[1] || "fire", x, z, time); return; }
    const els = Object.keys(this.cfg.elements), wild = (i: number): Dress => ({ el: els[i % els.length], level: 2 });
    if (which === "species") {
      // sixteen species' attacks, each in its element and look, flying past and landing: a 4 × 4 grid round her
      const T = 1.6, ph = time % T, loop = Math.floor(time / T);
      DEMO_SPECIES.forEach((sp, i) => {
        const A = SPECIES_ATTACKS[sp], tag = A?.body?.element, d: Dress = { el: elementOf(sp, undefined, undefined, tag), level: 2, ...(A?.body?.look && this.cfg.looks[A.body.look] ? { look: A.body.look } : {}) };
        const cx = x + ((i % 4) - 1.5) * 5, cz = z + (Math.floor(i / 4) - 1.5) * 4, k = Math.min(1, ph / 1.1), bx = cx - 2 + k * 4;
        if (ph < 1.1) this.core(d, bx, 0.9, cz, 4 / 1.1, 0, 0, time, i * 17 + 5);
        else if (!this.fx.some(f => f.seed === loop * 100 + i)) this.hit(d, cx + 2, 0.9, cz, time, loop * 100 + i);
      });
      this.drawFx(time);
      return;
    }
    if (which === "elements") {
      const T = 2.4, ph = time % T, loop = Math.floor(time / T);
      els.forEach((el, i) => {
        const d: Dress = { el, level: i % 4 === 3 ? 3 : 2 }, cx = x + (i - 3.5) * 3.6;
        const fly = Math.min(1, ph / 0.8), bx = cx, bz = z - 9 + fly * 6;
        if (ph < 0.8) this.core(d, bx, 1, bz, 0, 0, 7.5, time, i * 13 + 1); else if (ph < 0.85 && !this.fx.some(f => f.seed === loop * 100 + i)) this.hit(d, bx, 1, bz, time, loop * 100 + i);
        this.beam(d, cx - 1.6, z, cx + 1.6, z + 1, 0.7, 1.6, time, i * 7 + 3);
        if (ph < 0.05 && !this.fx.some(f => f.seed === loop * 100 + 50 + i)) this.burst(d, cx, z + 7, 2.2, time, loop * 100 + 50 + i);
      });
      this.drawFx(time);
      return;
    }
    const kinds = ["flash", "lane", "landing", "cone", "beamLine", "countdown", "arming", "chainNext", "tetherLine", "lockOn", "safeCircle", "ring"];
    const T = 3, start = Math.floor(time / T) * T, fire = start + T * 0.8, loop = Math.floor(time / T);
    kinds.forEach((kind, i) => {
      const cx = x + ((i % 4) - 1.5) * 7, cz = z + (Math.floor(i / 4) - 1) * 6, sh: TelegraphShape = { x: cx - 2.5, z: cz, ax: cx + 2.5, az: cz, r: 2, width: 1.4, heading: 0, angle: 60, y: 1.4, inner: 0 };
      if (kind === "landing" || kind === "arming" || kind === "lockOn" || kind === "flash" || kind === "countdown") { sh.x = cx; sh.r = kind === "landing" ? 2.2 : 1.6; }
      if (kind === "safeCircle") { sh.x = cx; sh.r = 2.6 - 1.2 * clamp01((time - start) / (fire - start)); }
      if (kind === "ring") { sh.x = cx; sh.r = 2.4; sh.inner = 1; }
      if (kind === "cone") { sh.x = cx - 2.5; sh.r = 5; }
      if (time < fire) this.telegraph({ kind, shape: sh, start, fire, n: 3 }, time);
      else if (!this.fx.some(f => f.seed === loop * 100 + i)) {
        const d = wild(i), hx = kind === "lane" || kind === "beamLine" || kind === "tetherLine" || kind === "chainNext" || kind === "cone" ? cx + 2 : cx;
        if (kind === "ring" || kind === "safeCircle") this.burst(d, cx, cz, 3, time, loop * 100 + i); else this.hit(d, hx, 0.8, cz, time, loop * 100 + i);
      }
    });
    this.drawFx(time);
  }
}
