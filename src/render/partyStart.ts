// The party start (Ed, 2026-11-03: "Party start: agree. Isolate each of the effects so I can tweak. We could allow the player to
// press square at the decks after the party is started that replays the visual effects so it's easier for me to experiment (the dj
// says make some noise!!!)"): the party spell's look as she casts it at her decks, each piece on its own knobs (rules/partyStart.ts,
// config/tuning.json partyStart, the pause page's "Party start"):
//   - sparkles: amber and rose pixel stars bursting up and out of her, their centres glowing toward white;
//   - pillar: a column of party light rising out of her, its top above the crown (docs/backlog/magic-effects.md: "the night's
//     signature spell ... deserves a pillar or eruption with real light"; big spells "rise above crown height");
//   - dome: the magic's dome round her, its inside filled;
//   - light: a real light on what's round her; shake: the camera's; ground: the glow on the floor under her (and the bloom under
//     the house); refraction: the picture's heat ripple (render/refraction.ts).
// Drawn over the house (overHouse): its floors, walls and furniture (19.93 to 19.944) and the crown indoors (19.96, 19.97) draw with
// no depth after the magic (2.8 to 2.93) and painted over it; these draw after them, still depth-tested, so what's solid and in front
// of her (the decks, the Terrace's rail) still covers them. Drawing only: nothing here touches the game.
import * as THREE from "three";
import { FxBatches, fxLayerOrder } from "./fx/batch";
import { ELEMENT_KEYS, elements, forms, mixIntensity, settings } from "./fx/model";
import { FX_QUALITY, type MagicFx } from "./fx/system";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL } from "./height";
import { comfort } from "./comfort";
import { rng } from "../rules/random";
import { partyStartLength, partyStartOf, type PartyStartTuning } from "../rules/partyStart";
import type { Tuning } from "../rules/tuning";

/** The pieces' draw order over the house: after its floors, walls and furniture (rooms 19.93 to 19.944), her in a room (19.95), the
 *  crown indoors (19.96, 19.97) and its string lights (19.98); before the wave numbers and pops (20). The ground glow, the uprights
 *  (fxLayerOrder from here), then the sparkles. */
export const PARTY_START_ORDER = 19.985;
export const PARTY_START_SPARKLES_ORDER = PARTY_START_ORDER + 0.0095;
/** Under the house (overHouse off): the magic's own orders, and the sparkles' as the spell's motes were (render/spellfx.ts). */
const UNDER_SPARKLES = 0;
/** The most sparkles a show has (partyStart.sparkles.count's top). */
export const MAX_SPARKLES = 256;
/** A sparkle's fields: start (3), drift m/s (3), its start, its life, which colour (0 A, 1 B). */
const F = 9;
const PARTY = ELEMENT_KEYS.indexOf("party");

/** A hue and saturation (0 to 1) at full brightness, as rgb 0 to 1 (the pause page's swatch's: ui/decide.ts swatchCss). */
export function hueSat(hue: number, sat: number): [number, number, number] {
  const f = (n: number) => { const k = (n + hue * 6) % 6; return 1 - sat * Math.max(0, Math.min(1, k, 4 - k)); };
  return [f(5), f(3), f(1)];
}
const hex = (h: string): [number, number, number] => { const n = parseInt(h.slice(1), 16); return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]; };
/** The light's colour: the party element's own (config/fx/elements.json, the magic's lights' ramp[1]). */
const LIGHT_RGB = hex(elements.party.ramp[1]);

/** The sparkles' material: each a pixel star (a plus of cells, or a square under 3 px) whose centre goes toward white. */
function sparkleMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: `attribute vec4 color;\nvarying vec4 vCol;\nuniform float uSize;\n${HEIGHT_VERT_GLSL}\nvoid main() { vCol = color; gl_Position = clipOf(onGround(position)); gl_PointSize = uSize; }`,
    fragmentShader: `varying vec4 vCol;\nuniform float uCells, uCore;
void main() {
  vec2 d = abs(floor(gl_PointCoord * uCells) - floor(uCells * 0.5));
  if (uCells > 1.5 && d.x > 0.0 && d.y > 0.0) discard; // (a plus: the corners out)
  float centre = d.x + d.y < 0.5 ? 1.0 : 0.0;
  gl_FragColor = vec4(mix(vCol.rgb, vec3(1.0), uCore * centre), vCol.a * (centre > 0.5 || uCells < 1.5 ? 1.0 : 0.7)); // added on, as the motes are
}`,
    uniforms: { ...HEIGHT_UNIFORMS, uSize: { value: 9 }, uCells: { value: 3 }, uCore: { value: 0.7 } },
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
}

/** One show: where (her feet, y over the ground) and when (her clock), and whether its shake's been given. */
interface Show { x: number; y: number; z: number; at: number; kicked: boolean }

export class PartyStartFx {
  readonly batches: FxBatches;
  readonly sparkles: THREE.Points;
  private pos = new Float32Array(MAX_SPARKLES * 3);
  private col = new Float32Array(MAX_SPARKLES * 4);
  private pool = new Float32Array(MAX_SPARKLES * F);
  private n = 0;
  private lastN = 0;
  private show: Show | null = null;
  private shows = 0;
  private data = [0, 0, 0, 0];
  /** What the last frame drew, for the tests and the debug: each piece's alpha (0 when not drawn) and the sparkles drawn. */
  readonly drawn = { sparkles: 0, pillar: 0, dome: 0, light: 0, ground: 0, over: false };
  /** Where the decks' show plays: her drawn feet there, kept as she's drawn seated (render/view/witch.ts). */
  anchor: { x: number; y: number; z: number } | null = null;
  /** The last frame's clocks: hers (the show's) and the world's (the refraction's). */
  now = 0;
  worldNow = 0;

  constructor(scene: THREE.Scene) {
    this.batches = new FxBatches(scene, { order: PARTY_START_ORDER, name: "Magic party start" });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(this.pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(this.col, 4));
    this.sparkles = new THREE.Points(geo, sparkleMaterial());
    this.sparkles.name = "Magic party start sparkles"; this.sparkles.frustumCulled = false;
    geo.setDrawRange(0, 0);
    scene.add(this.sparkles);
  }

  /** Another night: nothing playing. */
  reset(): void { this.now = this.worldNow = 0; this.show = null; this.n = 0; this.shows = 0; this.anchor = null; this.pool.fill(0); this.sparkles.geometry.setDrawRange(0, 0); }

  /** Seconds left of the show playing (0: none). */
  left(t: Tuning, ht: number): number { return this.show ? Math.max(0, this.show.at + partyStartLength(partyStartOf(t)) - ht) : 0; }

  /** A show from `at` (her clock) at her feet (x, y over the ground, z): the cast's, or a replay's. Its sparkles made now. */
  start(t: Tuning, x: number, y: number, z: number, at: number): void {
    const k = partyStartOf(t), S = k.sparkles, r = rng(9157 + 7919 * this.shows++);
    this.show = { x, y, z, at, kicked: false };
    this.n = S.on ? Math.max(0, Math.min(MAX_SPARKLES, Math.round(S.count))) : 0;
    const p = this.pool, v = S.speed;
    for (let i = 0; i < this.n; i++) {
      // (as the spell's motes were, render/spellfx.ts partyBurst: round her, rising and spreading out, a third rose)
      const a = r() * Math.PI * 2, s = (1.5 + r() * 3.5) * v, h = 1.4 + r() * 1.4, o = i * F;
      p[o] = x + Math.cos(a) * 0.3; p[o + 1] = y + h; p[o + 2] = z + Math.sin(a) * 0.3;
      p[o + 3] = Math.cos(a) * s; p[o + 4] = (1.2 + r() * 2.4) * v; p[o + 5] = Math.sin(a) * s;
      p[o + 6] = at + r() * 0.5; p[o + 7] = S.life * (0.55 + r() * 0.45); p[o + 8] = i % 3 ? 0 : 1;
    }
  }

  /** A frame (between the magic's begin and finish): every piece of the show playing, at its age on her clock `ht`. */
  update(t: Tuning, magic: MagicFx, ht: number, time: number): void {
    this.now = ht; this.worldNow = time;
    const k = partyStartOf(t), b = this.batches, M = magic.batches, D = this.drawn;
    b.begin(M.time.value, comfort.reduceFlashing);
    b.mpp.value = M.mpp.value; b.secondary.value = M.secondary.value; b.distort.value = M.distort.value;
    D.sparkles = D.pillar = D.dome = D.light = D.ground = 0; D.over = k.overHouse;
    this.order(k.overHouse);
    const s = this.show, age = s ? ht - s.at : -1;
    if (s && age >= 0 && magic.enabled) this.pieces(k, magic, s, age);
    this.drawSparkles(k, ht);
    b.end();
  }

  /** Over the house, or under it as before. */
  private order(over: boolean): void {
    this.batches.layers.forEach((l, slot) => { l.mesh.renderOrder = fxLayerOrder(slot, over ? PARTY_START_ORDER : undefined); });
    this.sparkles.renderOrder = over ? PARTY_START_SPARKLES_ORDER : UNDER_SPARKLES;
  }

  private pieces(k: PartyStartTuning, magic: MagicFx, s: Show, age: number): void {
    const b = this.batches, D = this.drawn, data = this.data, pixel = b.mpp.value, particles = FX_QUALITY.particles > 0.5;
    const envelope = (life: number) => (age < life ? Math.max(0, Math.min(1, age / 0.2, (life - age) / 0.3)) : 0);
    // The pillar: from her feet up to `height` over them (rising over `rise` seconds), `width` across at its foot.
    const P = k.pillar, pa = P.on ? envelope(P.duration) * P.strength : 0;
    if (pa > 0.01) {
      const grow = P.rise > 0 ? Math.min(1, age / P.rise) : 1, H = Math.max(0.5, P.height * grow * grow * (3 - 2 * grow));
      // (the pillar form's core spans 86% of its quad's height and 55% of its width at its foot: render/fx/batch.ts form 5)
      const W = Math.max(pixel, P.width / 0.55), Q = H / 0.86;
      data[0] = forms.pillar.id; data[1] = PARTY; data[2] = 1; data[3] = age / P.duration;
      b.add(s.x, s.y + H / 2, s.z, W, data, pa, false, null, particles, Q / W);
      D.pillar = pa;
    }
    // The dome: the magic's (6 m times 1.4 at full strength, times `size`), its inside filled by `fill`.
    const O = k.dome, da = O.on ? envelope(O.duration) : 0;
    if (da > 0.01) {
      const size = forms.dome.size * O.size * mixIntensity(settings.size, 1), d = Math.max(pixel, Math.round(size / pixel) * pixel);
      data[0] = forms.dome.id; data[1] = PARTY; data[2] = 1; data[3] = O.fill > 0 ? -Math.min(1, O.fill) : age / O.duration;
      b.add(s.x, s.y + 2 * O.size, s.z, d, data, da, false, null, particles);
      D.dome = da;
    }
    // The glow on the floor under her, as long as the pillar; and the bloom it leaves on the ground (the magic's imprint field).
    const G = k.ground, ga = G.on ? envelope(P.duration) * G.alpha : 0;
    if (ga > 0.005 && G.size > 0) {
      data[0] = forms.zone.id; data[1] = PARTY; data[2] = 1; data[3] = 0;
      b.add(s.x, s.y, s.z, G.size, data, ga, true, null, false);
      if (FX_QUALITY.imprints) magic.field.stamp(s.x, s.z, Math.max(2, Math.min(18, G.size * 0.6)), "bloom", Math.min(1, ga / Math.max(0.01, G.alpha)));
      D.ground = ga;
    }
    // The light: at its brightest from the start (eased in over the magic's 0.2 s), falling away over its last 60%.
    const L = k.light;
    if (L.on && age < L.duration) {
      const strength = L.strength * Math.min(1, (L.duration - age) / (L.duration * 0.6));
      magic.lamp("partyStart", s.x, s.y + 4, s.z, LIGHT_RGB, L.reach, strength);
      D.light = strength;
    }
    // The shake: once, as it starts (not for a show seen long after its cast: a resumed night's).
    const K = k.shake;
    if (!s.kicked && K.on && age < Math.min(0.25, K.duration)) magic.kick(K.amount, K.duration - age);
    s.kicked = true;
  }

  private drawSparkles(k: PartyStartTuning, ht: number): void {
    const S = k.sparkles, p = this.pool, pos = this.pos, col = this.col, A = hueSat(S.hueA, S.satA), B = hueSat(S.hueB, S.satB);
    let n = 0;
    if (S.on && this.show) for (let i = 0; i < this.n; i++) {
      const o = i * F, age = ht - p[o + 6], life = p[o + 7];
      if (!(life > 0) || age >= life || age < -1 / 60) continue;
      const t = Math.max(0, age), c = p[o + 8] ? B : A;
      pos[n * 3] = p[o] + p[o + 3] * t; pos[n * 3 + 1] = p[o + 1] + p[o + 4] * t; pos[n * 3 + 2] = p[o + 2] + p[o + 5] * t;
      col[n * 4] = c[0]; col[n * 4 + 1] = c[1]; col[n * 4 + 2] = c[2]; col[n * 4 + 3] = (1 - t / life) * S.opacity;
      n++;
    }
    const m = this.sparkles.material as THREE.ShaderMaterial, size = Math.max(1, S.size), cell = Math.max(1, Math.round(size / 3));
    m.uniforms.uCells.value = size >= 3 ? 3 : 1; m.uniforms.uSize.value = size >= 3 ? cell * 3 : Math.round(size); m.uniforms.uCore.value = S.core;
    const geo = this.sparkles.geometry;
    geo.setDrawRange(0, n);
    if (n || this.lastN) { (geo.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true; (geo.getAttribute("color") as THREE.BufferAttribute).needsUpdate = true; }
    this.drawn.sparkles = this.lastN = n;
  }
}
