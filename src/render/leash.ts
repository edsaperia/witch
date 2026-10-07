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
import { dreamStone, dreamWay, questOpen, restlessness } from "../rules/dream";
import { compassArrow } from "./compass";
import { moodOf } from "./mood";
import { beatTime } from "../rules/beat";
import * as THREE from "three";
import { drawSigil, sigilColour, speciesColours, defaultStyle, M, LEGEND_SCALE } from "../../art/generator.js";
import { dormant, type Game } from "../rules/game";
import type { Creature } from "../rules/creatures";
import { attackNamed, attackOf, creatureMaxHp, traitsOf, type Trait } from "../rules/combat";

/** Each trait's mark over a fighting creature (placeholders until the art lands): flier sky blue,
 *  armoured a steel square, swarm violet, heavy a brown square, nimble green, burrower earth. */
/** A legend mid-charge (it throws up more dust than a boar). */
const legendCharging = (c: { level: number; charge?: { until: number } }, time: number) => c.level === 3 && !!c.charge && time < c.charge.until;

const TRAIT_MARKS: Record<Trait, { r: number; g: number; b: number; size: number; square?: boolean }> = {
  flier: { r: 0.55, g: 0.85, b: 1, size: 0.26 },
  armoured: { r: 0.75, g: 0.78, b: 0.85, size: 0.26, square: true },
  swarm: { r: 0.8, g: 0.5, b: 1, size: 0.22 },
  heavy: { r: 0.7, g: 0.45, b: 0.25, size: 0.3, square: true },
  nimble: { r: 0.5, g: 1, b: 0.55, size: 0.22 },
  burrower: { r: 0.6, g: 0.42, b: 0.3, size: 0.26 },
};
import { blocked, leashPoint, talkTime, talkTurn } from "../rules/leash";
import { toEvolve } from "../rules/berries";
import { hash2 } from "../rules/random";
import { emojiOr, sleepyFace } from "./sleepyFace";
import { FIGHT, profileOf } from "../rules/movement";
import { bodyRadius } from "../rules/spacing";
import { hasRune, huntsWitch, runeNear } from "../rules/creatureStates";
import { LOAD_DEFAULT, newLoadView, type LoadView } from "./load";
import { LEGENDS, relicGlints } from "../rules/legends";
import { circleLines, circleShown, legendCircleNear } from "../rules/legendCircle";
import { witchHeight } from "../rules/witch";
import { SPRITE_UNIFORMS } from "./sprites";
import { PIXEL_SNAP_GLSL } from "./shaders";
import { lobHeight } from "./invites";

/** The join burst's colours (the art director, #188 and #200): the lanterns' amber, light and deep, with the creature's own
 *  neon; nothing white (white is a hit's). */
/** Her magic's colours in the night (the art director's palette, #188 and round 2): the lanterns' amber and the 💌s' rose. */
const AMBER = [0.91, 0.71, 0.42], ROSE = [0.85, 0.47, 0.62];
const JOIN_PALETTE = [[0.91, 0.71, 0.42], [0.82, 0.52, 0.28], [0.91, 0.71, 0.42]];
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "./lighting";
import { HEIGHT_UNIFORMS, HEIGHT_VERT_GLSL, placed } from "./height";
import { tiltFilter } from "./overlayTilt";

/** The party's over: 😴 bubbles over at most this many sleepers, within this many metres of her. */
const SNORES = 6, SNORE_RANGE = 40;
/** Seconds a legend's charge ruts take to fade. */
const RUTS = 12;
/** How far from her (m) happy creatures' runes are drawn. */
const RUNE_VIEW = 70;
/** The party legend's giant hat's stripes (the Easter egg): the party neons, in pairs of rows. */
const PARTY_HAT = [[1, 0.35, 0.72], [0.35, 0.95, 1], [1, 0.85, 0.3], [0.7, 0.45, 1]];

/** A soft dot bigger than this (metres) is light (a halo, an aura, a glow) and stays smooth; smaller, an object in art pixels. */
const PIXEL_DOT_MAX = 1.4;
const SLOT = 32, SLOTS = 16; // the glyph atlas: 16 x 16 slots of 32 px; slot 0 is a soft dot
const SQ = SLOTS * SLOTS - 1; // and the last a solid square
const LEGEND_LEVEL = 3, LEGEND_ROW = 10; // legendary sigils' 2 × 2 blocks fill rows 10 to 13 (16 of them); the rest from slot 1 up
/** Whether a creature's sigil in the stack, as a leash point and its ghost, is the legendary one (art/sigils.js `legendary`):
 *  every legend's (in the stack only once she can carry one: a party legend, or a legend let go and invited). */
export const legendarySigil = (c: Pick<Creature, "level">): boolean => c.level >= LEGEND_LEVEL;

// Ed, round 14: "Creature projectiles and the leyline and pulse are not pixelated. Lighting effects can be non-pixel but they
// should be lighting objects that are pixels." The soft dot (slot 0) drawn as an object (a shot, a spark, a thread's bead, a
// telegraph's ring) is a disc of the art's own pixels, a bright core and a dimmer rim, hard-edged, its middle on the screen's
// pixel grid; drawn as light (a halo, an aura, a glow: bigger than PIXEL_DOT_MAX metres, or marked glow), it stays smooth.
const VERT = /* glsl */ `
uniform vec3 uRight, uUp;
uniform float uFlat;
uniform vec2 uRes;
uniform float uMpp, uDotMax;
attribute vec3 iPos;
attribute float iSize;
attribute vec4 iUv;
attribute vec4 iCol;
attribute float iDraw;
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw;
varying vec3 vWorld;
varying float vPix, vN;
${HEIGHT_VERT_GLSL}
${PIXEL_SNAP_GLSL}
void main() {
  vec2 p = position.xy;
  // On the rolling ground: a rune lying flat follows it corner by corner; the rest stand above it.
  vec3 w = uFlat > 0.5 ? onGround(iPos + vec3(p.x * iSize, 0.04, -p.y * iSize)) : onGround(iPos) + uRight * (p.x * iSize) + uUp * (p.y * iSize);
  vUv = vec2(mix(iUv.x, iUv.z, uv.x), mix(iUv.w, iUv.y, uv.y));
  bool glow = iDraw > 1.5;
  vP = p; vCol = iCol; vDraw = glow ? iDraw - 2.0 : iDraw; vWorld = w;
  vPix = !glow && iUv.z < 0.07 && iUv.y > 0.99 && iSize <= uDotMax ? 1.0 : 0.0; // (the soft dot, as an object)
  vN = max(1.0, floor(iSize / uMpp + 0.5)); // its art pixels across
  gl_Position = clipOf(w);
  if (vPix > 0.5) gl_Position.xy += pixelSnap(clipOf(onGround(iPos))) * gl_Position.w;
  if (overBend(onGround(iPos)) < 0.5) gl_Position = vec4(2.0, 2.0, 2.0, 1.0); // (the glows seen through the canopy: never through the earth)
}`;

const FRAG = /* glsl */ `
uniform sampler2D uGlyphs;
uniform float uSolid;
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw;
varying vec3 vWorld;
varying float vPix, vN;
${LIGHT_GLSL}
void main() {
  float a = texture2D(uGlyphs, vUv).a * vCol.a;
  if (vPix > 0.5) {
    // A disc of art pixels: each fragment takes its art pixel's middle; a full core, a half rim, nothing past it (one or two
    // pixels across: solid).
    vec2 q = (floor((vP + 0.5) * vN) + 0.5) / vN - 0.5;
    float r = length(q) * 2.0;
    a = (vN < 2.5 ? 1.0 : r < 0.55 ? 1.0 : r < 0.95 ? 0.5 : 0.0) * vCol.a;
  }
  // Written on: revealed clockwise from the top as vDraw goes 0 to 1.
  float ang = fract(atan(vP.x, vP.y) / 6.2831853 + 1.0);
  if (ang > vDraw || a < 0.02) discard;
  gl_FragColor = uSolid > 0.5 ? vec4(haze(vCol.rgb, vWorld), a) : vec4(haze(vCol.rgb * a, vWorld), 1.0); // (solid: dust and bits, blended, not glowing)
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
  /** glow: drawn as light, smooth (a soft dot otherwise draws as an object, in art pixels, up to PIXEL_DOT_MAX metres). */
  add(x: number, y: number, z: number, size: number, uv: number[], r: number, g: number, b: number, a: number, draw = 1, glow = false): void {
    if (this.n >= this.cap) this.grow(this.cap * 2);
    const i = this.n++;
    this.pos.set([x, y, z], i * 3); this.size[i] = size; this.uv.set(uv, i * 4); this.col.set([r, g, b, a], i * 4); this.draw[i] = draw + (glow ? 2 : 0);
  }
  end(): void {
    this.geo.instanceCount = this.n;
    for (const k of ["iPos", "iSize", "iUv", "iCol", "iDraw"]) (this.geo.getAttribute(k) as THREE.InstancedBufferAttribute).needsUpdate = true;
  }
}

/** Bubbles grow with who's talking (Ed, 2026-10-05): the pixel bubble's game pixel (its --px, in
 *  screen px) by level, babies smallest, legends (dreams and nightmares) largest. One style for
 *  every bubble: index.html's .bubble. */
export const BUBBLE_PX = 3;
/** How far she goes (metres) before a dream's pointer works out her nearest runestone again. */
const DREAM_REFRESH = 15;
export const bubblePx = (level: number): number => BUBBLE_PX + Math.max(0, Math.min(3, level));

const PARTY = ["🎉", "🎈", "💃", "🎊", "🥳", "😛", "🍉", "🍒", "🍷", "🍸", "🍹", "🥂", "🍺", "😁", "😆"];
// A creature's moods, bored to delighted: adults start at the first, young at the middle, babies
// at the last, and the conversation warms them up toward delighted.
const MOODS = [["😴", "🫩", "🥱", "💼"], ["😐", "😐", "🥱"], ["😮", "🤭", "🫢", "😛"], ["🙂", "🍷", "🍺", "😁"], ["🥳", "🎉", "🎈", "😆", "🥂", "💃"]];

/** What a hit throws off a creature (render: the contact's bits): feathers off birds, chips off a shell or plates, tufts of fur
 *  off the rest; confetti (in its neon) off a party animal. */
const HIT_BITS = { feather: { r: 0.95, g: 0.95, b: 0.9 }, chip: { r: 0.72, g: 0.78, b: 0.86 }, fur: { r: 0.85, g: 0.7, b: 0.52 }, confetti: { r: 1, g: 1, b: 1 } };
const FEATHERED = new Set(["owl", "raven", "heron"]), SHELLED = new Set(["beetle", "spider", "woodlouse", "snail", "glowworm", "moth", "hedgehog"]);
const hitBits = (species: string, party: boolean) => party ? HIT_BITS.confetti : FEATHERED.has(species) ? HIT_BITS.feather : SHELLED.has(species) ? HIT_BITS.chip : HIT_BITS.fur;
/** A species' coat, for the bits a hit throws off it (the art director, #193: a wolf throws grey, a fox rust): its lit coat
 *  material (BODYL) from its palette row, toned down toward the night floor; worked out once per species. */
const coats = new Map<string, { r: number; g: number; b: number }>();
function coatOf(species: string, tone: number): { r: number; g: number; b: number } {
  let c = coats.get(species);
  if (!c) { const pal = speciesColours(species, defaultStyle()) as Record<number, number[]>, rgb = pal[M.BODYL] ?? pal[M.BODY] ?? [200, 180, 150]; coats.set(species, (c = { r: (rgb[0] / 255) * tone, g: (rgb[1] / 255) * tone, b: (rgb[2] / 255) * tone })); }
  return c;
}

export class LeashView {
  /** Her seat behind the decks, as drawn (the view sets it): where she sparkles back in after a knockout. */
  seatAt: { x: number; y: number; z: number } | null = null;
  private canvas = document.createElement("canvas");
  private tex: THREE.CanvasTexture;
  private slots = new Map<string, number>();
  /** The creatures whose sigils are projected over the treetops this frame (kept, not made anew each frame). */
  private projected: { c: Creature; d: number }[] = [];
  private nextSlot = 1; // the next free atlas slot
  private legendSlots = 0; // legendary blocks taken
  private colours = new Map<string, THREE.Color>();
  private standing: Instances;
  private flat: Instances;
  /** Drawn over everything (no depth test): the berries' glints seen from the treetops. */
  private over: Instances;
  /** Not glowing (Ed's art director, #193): an attack's dust and the bits it throws, blended over the ground like the creatures. */
  private solid: Instances;
  /** Where charging legends have run (churned ground, fading over RUTS seconds). */
  private ruts = new Map<number, { x: number; z: number; at: number }[]>();
  private evolved = new Map<number, number>();
  private berryRgb: [number, number, number];
  private fizzles: { x: number; z: number; at: number }[] = [];
  /** When each sigil came to the bottom of the stack by a cycle (E in the treetops): it flares a moment. */
  private cycledAt = new Map<number, number>();
  private bursts: { x: number; z: number; at: number; seed: number; rgb: number[] }[] = [];
  /** When each creature joined the party (invited or befriended), for its little hop (render/view/creatures.ts). */
  readonly joined = new Map<number, number>();
  /** Each stacked sigil's eased height above her hat, by creature. */
  private stackY = new Map<number, number>();
  private chain: { x: number; z: number; vx: number; vz: number }[] = [];
  private lastTime = 0;
  /** The load she carries as the art reads it (render/load.ts; the view sets it each frame), and where her broom's bristles are. */
  load: LoadView = newLoadView();
  bristle = { x: 0, y: 0, z: 0, on: false };
  private bubbleWitch = document.getElementById("bubble-witch");
  private bubbleCreature = document.getElementById("bubble-creature");
  private v = new THREE.Vector3();
  /** Where each stacked sigil was last frame (a knockout's release splashes from there). */
  private lastSlots = new Map<number, THREE.Vector3>();
  /** Short-lived effects: hit sparks, puffs, splashes, released leashes, teleport sparkles, quake rings. */
  /** Whether each party animal was travelling last frame (to pop as it joins her posse again). */
  private travelling = new Map<number, boolean>();
  private fx: { kind: string; x: number; y: number; z: number; at: number; life: number; r: number; g: number; b: number; seed: number; tx?: number; tz?: number; size?: number; /** a ring's dots (else 36) and their size (else 0.7) */ n?: number; dot?: number }[] = [];
  /** The screen shake (a legend's quake): when it started and how hard. */
  private shakeAt = -Infinity;
  private shakeAmp = 0;
  private pips: HTMLElement | null = null;
  /** Each creature's height as drawn (the view sets it), so its health bar sits just over it. */
  readonly tops = new Map<number, number>();
  /** When she last hit a party legend's edge (its boing played). */
  private boingAt = -Infinity;

  constructor(scene: THREE.Scene, private game: Game) {
    this.canvas.width = this.canvas.height = SLOT * SLOTS;
    const g = this.canvas.getContext("2d")!;
    const dot = g.createRadialGradient(SLOT / 2, SLOT / 2, 0, SLOT / 2, SLOT / 2, SLOT / 2);
    dot.addColorStop(0, "rgba(255,255,255,1)"); dot.addColorStop(0.35, "rgba(255,255,255,.55)"); dot.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = dot; g.fillRect(0, 0, SLOT, SLOT);
    // The last slot: a solid square (health bars).
    g.fillStyle = "#ffffff"; g.fillRect((SQ % SLOTS) * SLOT + 4, Math.floor(SQ / SLOTS) * SLOT + 4, SLOT - 8, SLOT - 8);
    this.tex = new THREE.CanvasTexture(this.canvas);
    this.tex.magFilter = THREE.NearestFilter; this.tex.minFilter = THREE.NearestFilter; this.tex.generateMipmaps = false;
    const mat = (flat: number, depthTest = true, solid = false) => new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      uniforms: { ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, uRight: SPRITE_UNIFORMS.uRight, uUp: SPRITE_UNIFORMS.uUp, uRes: SPRITE_UNIFORMS.uRes, uMpp: { value: 1 / (game.tuning.artPixelsPerMetre * (2 / game.tuning.pixelSize)) }, uDotMax: { value: PIXEL_DOT_MAX }, uFlat: { value: flat }, uGlyphs: { value: this.tex }, uSolid: { value: solid ? 1 : 0 } },
      transparent: true, depthWrite: false, depthTest, blending: solid ? THREE.NormalBlending : THREE.AdditiveBlending,
    });
    this.standing = new Instances(mat(0));
    this.flat = new Instances(mat(1));
    this.over = new Instances(mat(0, false));
    this.solid = new Instances(mat(0, true, true));
    scene.add(this.standing.mesh, this.flat.mesh, this.over.mesh, this.solid.mesh);
    const hex = game.tuning.berries.colour.replace("#", "");
    this.berryRgb = [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number];
  }

  /** A species' sigil at a level (it grows more ornate with level), white in the atlas, tinted
   *  by its neon colour when drawn. */
  private slotOf(species: string, level = 0, legendary = false): number {
    const key = `${species}:${legendary ? "legendary" : level}`;
    let s = this.slots.get(key);
    if (s !== undefined) return s;
    // a legendary one: a block of 2 × 2 slots from LEGEND_ROW down (8 a row pair), its top left slot
    s = legendary ? LEGEND_ROW * SLOTS + Math.floor(this.legendSlots / 8) * 2 * SLOTS + (this.legendSlots++ % 8) * 2 : this.nextSlot++;
    this.slots.set(key, s);
    const g = this.canvas.getContext("2d")!, ox = (s % SLOTS) * SLOT, oy = Math.floor(s / SLOTS) * SLOT, W = legendary ? SLOT * 2 : SLOT;
    g.clearRect(ox, oy, W, W);
    drawSigil(g, species, { x: ox + 1, y: oy + 1, size: (W - 2) / (legendary ? LEGEND_SCALE : 1), level: level as unknown as null, colour: [255, 255, 255], glow: false, legendary });
    // Crisp: no soft edges, so it reads as pixel art.
    const img = g.getImageData(ox, oy, W, W);
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
    // The mood's halo (the art director's round 2: big soft red discs after bloom read as warning lights; a crisp berry with a small glow).
    const M = moodOf(t), hs = M?.berryHalo ?? 1, hg = glow * (M?.berryGlow ?? 1);
    for (const e of B.events) if (e.kind === "evolved") this.evolved.set(e.id, time);
    for (const [id, at] of this.evolved) if (time - at > 1) this.evolved.delete(id);
    for (const berry of B.berries) {
      const p = B.bushes[berry.bush];
      if (Math.abs(p.x - w.x) > near || Math.abs(p.z - w.z) > near) continue;
      const tw = 0.85 + 0.15 * Math.sin(time * 2.3 + berry.id);
      if (treetops) this.over.add(p.x, 1, p.z + 0.25, 0.9, dot, r * 1.6 * tw, gg * 1.6, b * 1.6, 0.8 * glow);
      else {
        this.standing.add(p.x, 0.8, p.z + 0.3, 2.8 * hs, dot, r * 1.5, gg * 1.5, b * 1.5, 0.95 * hg * tw); // the soft halo, easy to spot
        this.standing.add(p.x, 0.8, p.z + 0.31, 1.1 * hs, dot, r * 1.8, gg * 1.4, b * 1.4, 0.8 * hg); // its warm core
        this.standing.add(p.x - 0.07, 0.86, p.z + 0.32, 0.3, dot, 1, 0.92, 0.92, 0.8 * tw); // the shine
      }
    }
    // How near each party animal is to evolving: always while she's within 20 m, and for a few
    // seconds after it eats.
    for (const c of g.creatures) {
      if (!c.leashed || B.evolving.has(c.id)) continue;
      const need = toEvolve(c.level, t, c.species), ate = B.ateAt.get(c.id);
      if (!Number.isFinite(need)) continue;
      if (Math.hypot(c.x - w.x, c.z - w.z) > 20 && !(ate !== undefined && time - ate < 3)) continue;
      // One segment for each berry it needs (Ed, 2026-10-05: "segment the ring"), small gaps
      // between, clockwise from the top; each berry eaten lights one (the newest flashes).
      const fed = B.fed.get(c.id) ?? 0, segs = Math.max(1, Math.ceil(need)), per = Math.max(2, Math.round(28 / segs)), gap = segs > 1 ? Math.min(0.4, 1.2 / segs) : 0;
      const flash = ate !== undefined && time - ate < 0.6 ? 1 - (time - ate) / 0.6 : 0;
      for (let s = 0; s < segs; s++) {
        const lit = s < fed, newest = lit && s === Math.ceil(fed) - 1;
        for (let i = 0; i < per; i++) {
          const f = (s + gap / 2 + (1 - gap) * (per > 1 ? i / (per - 1) : 0.5)) / segs, a = Math.PI / 2 - f * Math.PI * 2, b = newest ? flash : 0;
          // (the berries still to eat show as pale segments, so how many it needs reads at a glance)
          this.flat.add(c.x + Math.cos(a) * 1.5, 0, c.z + Math.sin(a) * 1.1, 0.4 + b * 0.2, dot, lit ? 1 : 0.85, lit ? 0.25 + b * 0.6 : 0.85, lit ? 0.3 + b * 0.5 : 0.95, lit ? 0.95 : 0.55);
        }
      }
    }
    // Evolving: motes spiralling up round it through the bar, quicker and tighter toward the line.
    for (const [id, e] of B.evolving) {
      const c = g.creatures[id], k = Math.min(1, (time - e.since) / Math.max(0.1, e.at - e.since)), pulse = 0.6 + 0.4 * Math.cos((beatTime(g.beat, time) / beat) * Math.PI * 2);
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

  /** A legend in its circle, read at a glance (Ed's round 14 playtest: "Legends in the circle are not very distinct"): asleep,
   *  restless or happy, a soft glow on the ground under it in its sigil's neon, breathing with it, and a few motes of it
   *  drifting up (an angry one has its own red aura); the sleeping form's neon outline is the sprite's (render/sprites.ts). */
  private legendSeen(c: Creature, time: number, k: number): void {
    const S = this.game.tuning.wildLegends.seen;
    if (!S || S.aura <= 0) return;
    const dot = this.uv(0), [r, gg, b] = legendNeon(c.species), br = bossBreath(time, c.id, this.game.tuning.wildLegends.breathEvery * 1.5), a = S.aura * k * (0.75 + 0.25 * br);
    const R = Math.min(7, (this.tops.get(c.id) ?? 4) * 0.7 + 1.5); // (about its own breadth: under it, not over the whole circle)
    this.flat.add(c.x, 0, c.z, R * 1.5, dot, r * 0.45, gg * 0.45, b * 0.45, a * 0.5); // (added light: soft, so the circle's own twilight still shows)
    this.flat.add(c.x, 0, c.z, R * 0.8, dot, r * 0.6, gg * 0.6, b * 0.6, a * 0.55);
    for (let i = 0; i < 6; i++) { // motes rising slowly off it, its dream's breath
      const ph = (time * 0.12 + hash2(c.id, i, 51)) % 1, ang = hash2(c.id, i, 53) * Math.PI * 2 + time * 0.05, d = R * 0.6 * (0.3 + 0.7 * hash2(c.id, i, 57));
      this.standing.add(c.x + Math.cos(ang) * d, 0.5 + ph * 5, c.z + Math.sin(ang) * d * 0.7, 0.3, dot, r * 1.3, gg * 1.3, b * 1.3, 0.9 * k * Math.sin(ph * Math.PI));
    }
  }

  /** Wild legends (Ed, 2026-10-04): a slow, breathing aura on the ground round each, in a dark
   *  mix of its sigil's colour and blood red, with motes drifting up; from the treetops a glow
   *  over the canopy, so they read as special from above. Dimmer while they sleep. */
  private drawBosses(time: number): void {
    const g = this.game, W = g.tuning.wildLegends, w = g.witch, dot = this.uv(0), treetops = w.lift > 0.5, near = treetops ? 420 : 110;
    this.dreams = [];
    for (const c of g.creatures) {
      if (!c.boss || c.leashed || Math.abs(c.x - w.x) > near || Math.abs(c.z - w.z) > near) continue;
      // Asleep (or asleep for good), it's scenery: nothing marks it (Ed, 2026-10-04). Waking, a burst
      // of soil as it heaves up; happy, a few hearts' worth of rosy motes rising.
      if (c.legendState === "asleep" || c.legendState === "restless") {
        // Its dream shows while its quest can still be done (#87: rules/legends.ts sets c.questOpen); restless, it's a nightmare (the music builder's).
        if (c.questOpen ?? (c.legendState === "asleep" && c.quest && c.quest.done === undefined)) this.dreams.push(c);
        if (!treetops) this.legendSeen(c, time, 0.8);
        continue;
      }
      if (c.legendState === "happy") {
        if (!treetops) this.legendSeen(c, time, 1);
        for (let i = 0; i < 5; i++) { const ph = (time * 0.3 + hash2(c.id, i, 31)) % 1, a = hash2(c.id, i, 37) * Math.PI * 2; this.standing.add(c.x + Math.cos(a) * 1.4, 0.8 + ph * 4, c.z + Math.sin(a) * 1, 0.3, dot, 1, 0.55, 0.75, 0.8 * Math.sin(ph * Math.PI)); }
        continue;
      }
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

  /** Each dreaming legend's runestone to point at (rules/dream.ts): the nearest of its dreamt kind's areas to her, worked out
   *  again once she's gone `DREAM_REFRESH` metres from where it last was (Ed, 2026-10-06: it points the way as she moves). */
  private dreamStones = new Map<number, { to: { x: number; z: number } | null; fx: number; fz: number }>();

  /** Sleeping legends dreaming this frame (the first quest), drawn as thought bubbles by drawDreams. */
  private dreams: Creature[] = [];
  private dreamEls: HTMLElement[] = [];
  /** Each dream's way (its caption: the arrow and the words), pooled with the bubbles. */
  private wayEls: HTMLElement[] = [];
  /** The party's over (render/partyOver.ts; the view sets it each frame): its ease, 0 to 1. */
  partyOverEase = 0;
  /** The sleepers' 😴 bubbles (pooled), and the nearest sleepers this frame (reused). */
  private snoreEls: HTMLElement[] = [];
  private snoreNear: { c: Creature; d: number }[] = [];

  /** A sleeping legend's dream (the first quest, Ed 2026-10-04): a bubble over it holding the
   *  sigil of the creature it wants, in its colour, drawn in that level's variant (Ed, 2026-10-05:
   *  the sigil's own level look, no pips). Only to a witch on the ground near it (dreams.range;
   *  Ed, 2026-10-05: never from the treetops). HTML, like the talk bubbles, so it reads at any zoom. */
  /** The party's over (Ed, 2026-10-06: "all the animals go to sleep and make little 😴 speech bubbles"): over the nearest few
   *  sleepers within SNORE_RANGE of her on the ground, a little dream bubble with a sleepy face (mostly 😴, now and then a yawn
   *  or a sigh: sleepyFace), bobbing and drifting. A sleeper is one the rules have put to sleep (c.asleep: builder hotel's
   *  party's-over rules, legends too), or, before those rules, any creature not hers once the party's well over. */
  private drawSnores(camera: THREE.Camera, width: number, height: number): void {
    const host = this.bubbleWitch?.parentElement, g = this.game, w = g.witch, near = this.snoreNear;
    let used = 0;
    near.length = 0;
    if (host && this.partyOverEase > 0.3 && w.mode === "ground" && w.lift < 0.5) {
      for (const c of g.creatures) {
        if (c.gone || c.leashed) continue;
        // (asleep: the rules' c.asleep, legends too; before builder hotel's party's-over rules, any creature not hers once it's well over)
        const asleep = (c as { asleep?: boolean }).asleep, rules = "partyOver" in g, dx = c.x - w.x, dz = c.z - w.z;
        if (!(asleep || (!rules && asleep === undefined && this.partyOverEase >= 0.6 && c.level !== 3 && !c.boss)) || Math.abs(dx) > SNORE_RANGE || Math.abs(dz) > SNORE_RANGE) continue;
        const d = Math.hypot(dx, dz);
        if (d > SNORE_RANGE) continue;
        if (near.length < SNORES) near.push({ c, d });
        else { let far = 0; for (let i = 1; i < near.length; i++) if (near[i].d > near[far].d) far = i; if (d < near[far].d) near[far] = { c, d }; }
      }
      const Z = g.tuning.dreams.sleepy, time = g.clock.time;
      for (const { c } of near) {
        const bob = Math.sin(time * 1.6 + c.id * 1.7) * 0.18, y = Math.min(this.tops.get(c.id) ?? 1.5, 4) + 0.35 + bob;
        placed(this.v.set(c.x + Math.sin(time * 0.7 + c.id) * 0.15, y, c.z)).project(camera);
        if (this.v.z > 1 || Math.abs(this.v.x) > 1.1 || Math.abs(this.v.y) > 1.1) continue;
        let el = this.snoreEls[used];
        if (!el) { el = document.createElement("div"); el.className = "bubble dream on snore"; host.append(el); this.snoreEls.push(el); }
        el.style.display = "";
        const face = Z ? emojiOr(sleepyFace(c.id, time, Z), Z.fallback) : "😴";
        if (el.dataset.e !== face) { el.dataset.e = face; const f = this.pixelEmoji(face, 0.9, 18); f.classList.add("face"); el.replaceChildren(f); }
        el.style.setProperty("--px", `${Math.max(1, bubblePx(c.level) * 0.8)}px`);
        el.style.left = `${((this.v.x + 1) / 2) * width}px`;
        el.style.top = `${((1 - this.v.y) / 2) * height}px`;
        el.style.opacity = `${Math.min(1, (this.partyOverEase - 0.3) * 4).toFixed(2)}`;
        el.style.transform = "translate(-50%, calc(-100% - var(--px) * 9))";
        used++;
      }
    }
    for (let i = used; i < this.snoreEls.length; i++) this.snoreEls[i].style.display = "none";
  }

  private drawDreams(camera: THREE.Camera, width: number, height: number): void {
    const host = this.bubbleWitch?.parentElement, g = this.game, w = g.witch, range = g.tuning.dreams.range;
    if (!host) return;
    const list = w.mode !== "ground" || w.lift > 0.5 ? [] : this.dreams.map(c => ({ c, d: Math.hypot(c.x - w.x, c.z - w.z) })).filter(p => p.d <= range).sort((p, q) => p.d - q.d).slice(0, 4);
    let used = 0;
    for (const { c } of list) {
      const y = Math.min(this.tops.get(c.id) ?? 2, 4.5) + 0.5; // (low over it, so its puffs rise from just above the sleeper's head: the art director, #238)
      placed(this.v.set(c.x, y, c.z)).project(camera);
      if (this.v.z > 1 || Math.abs(this.v.x) > 1.1 || Math.abs(this.v.y) > 1.1) continue;
      // Restless (#87: its area has none of its kind), the dream turns to a nightmare (Ed, 2026-10-05):
      // one face by the sigil it wants, slightly sad at first, sadder, upset, then angry
      // (dreams.nightmare), the sigil fading (bring one back). Once its quest has closed (its
      // area's soundsystem on) the dream is gone, but not a nightmare: just the face then.
      const q = c.quest!, r = restlessness(c), N = g.tuning.dreams.nightmare, open = questOpen(g.party, c);
      let step = -1;
      for (let k = 0; k < N.at.length; k++) if (r >= N.at[k]) step = k;
      const faces = step >= 0 ? 1 : 0, ire = r * r; // (the reddening and the shake gentle while it's only sad)
      if (!open && !faces) continue;
      // Asleep giving its quest (Ed, 2026-10-06): a sleepy face by the sigil, mostly 😴, now and then a yawn or a sigh for a turn.
      const Z = g.tuning.dreams.sleepy, zzz = !faces && open && Z ? sleepyFace(c.id, g.clock.time, Z) : null;
      let el = this.dreamEls[used];
      if (!el) { el = document.createElement("div"); el.className = "bubble dream on"; host.append(el); this.dreamEls.push(el); }
      el.style.display = "";
      const key = `${q.species}:${q.level}:${step}:${open}:${zzz ?? ""}`;
      if (el.dataset.e !== key) {
        el.dataset.e = key;
        const cv = document.createElement("canvas"), n = 44;
        cv.width = cv.height = n;
        cv.style.width = cv.style.height = `calc(var(--px) * ${(n / BUBBLE_PX).toFixed(2)})`;
        const x = cv.getContext("2d");
        if (x) {
          drawSigil(x, q.species, { x: 1, y: 1, size: n - 2, level: q.level as unknown as null, colour: sigilColour(q.species), glow: false });
          const d = x.getImageData(0, 0, n, n);
          for (let i = 3; i < d.data.length; i += 4) d.data[i] = d.data[i] > 90 ? 255 : 0;
          x.putImageData(d, 0, 0);
        }
        // (its face in finer pixels than a chat face: its brows must read)
        const face = step >= 0 ? this.pixelEmoji(N.faces[step] ?? "😠", 0.9, 18) : zzz ? this.pixelEmoji(emojiOr(zzz, Z!.fallback), 0.9, 18) : null;
        face?.classList.add("face");
        el.replaceChildren(...(open ? [cv] : []), ...(face ? [face] : []));
        el.classList.toggle("nightmare", faces > 0);
      }
      el.style.setProperty("--px", `${bubblePx(c.level)}px`);
      (el.querySelector("canvas:not(.face)") as HTMLElement | null)?.style.setProperty("opacity", `${1 - 0.75 * r}`);
      if (faces) el.style.setProperty("--ink", `rgba(${Math.round(232 - 42 * ire)}, ${Math.round(180 - 130 * ire)}, ${Math.round(106 - 76 * ire)}, ${(0.55 + 0.35 * ire).toFixed(2)})`); // (from the dream's amber to a deep ember: never the enraged eyes' bright red, the art director #238)
      else el.style.removeProperty("--ink");
      const bx = ((this.v.x + 1) / 2) * width, ly = ((1 - this.v.y) / 2) * height, by = Math.max(ly, el.offsetHeight + 56); // (kept on screen when she's close, below the top edge's cues)
      el.style.left = `${bx}px`;
      el.style.top = `${by}px`;
      tiltFilter(el, by - el.offsetHeight * 0.5 - bubblePx(c.level) * 12.5); // (its middle, blurred as the world is there: render/overlayTilt.ts)
      const shake = faces ? ire * 2.5 * Math.sin(performance.now() * 0.05 + c.id) : 0; // (a nightmare shakes)
      el.style.transform = `translate(calc(-50% + ${shake.toFixed(1)}px), calc(-100% - var(--px) * 12.5))`; // (lifted by its puffs, the lowest just above the sleeper)
      // Its direction (rules/dream.ts; Ed, 2026-10-06: "the legend speech bubble should tell you in what direction you can find
      // the runestone for the area that has the quest animal in it"): the nearest area of the kind it dreams of to her, explored,
      // partified or not; a pixel arrow on the bubble's edge that way (the eight compass points: the camera looks north, so north
      // is up the screen), and its compass point and distance under the sigil, kept up as she moves.
      let st = this.dreamStones.get(c.id);
      if (!st || Math.hypot(w.x - st.fx, w.z - st.fz) > DREAM_REFRESH) { st = { to: dreamStone(g.map, q.species, w.x, w.z), fx: w.x, fz: w.z }; this.dreamStones.set(c.id, st); }
      const to = open ? st.to : null;
      // (its own caption under the bubble, not inside it: the bubble takes the tilt-shift's blur, the way must stay sharp)
      let cap = this.wayEls[used];
      if (!cap) { cap = document.createElement("div"); cap.className = "dream-way"; const cv = document.createElement("canvas"); cv.className = "dream-dir"; cap.append(cv, document.createElement("span")); host.append(cap); this.wayEls.push(cap); }
      if (to) {
        const wy = dreamWay(w, to), col = this.colours.get(q.species) ?? (this.slotOf(q.species, 0), this.colours.get(q.species));
        const rgb: [number, number, number] = col ? [Math.round(col.r * 255), Math.round(col.g * 255), Math.round(col.b * 255)] : [225, 215, 255];
        const cv = cap.firstChild as HTMLCanvasElement, text = cap.lastChild as HTMLElement, akey = wy.word === "here" ? "here" : `${wy.point}:${rgb}`;
        if (cv.dataset.k !== akey) { cv.dataset.k = akey; compassArrow(cv, wy.word === "here" ? -1 : wy.point, rgb); }
        if (text.textContent !== wy.word) text.textContent = wy.word;
        cap.style.setProperty("--px", `${bubblePx(c.level)}px`);
        cap.style.left = `${bx}px`; cap.style.top = `${Math.round(by - bubblePx(c.level) * 12.5 + 2)}px`;
        cap.style.display = "";
      } else cap.style.display = "none";
      used++;
    }
    for (let i = used; i < this.dreamEls.length; i++) this.dreamEls[i].style.display = "none";
    for (let i = used; i < this.wayEls.length; i++) this.wayEls[i].style.display = "none";
  }

  /** How far to shake the camera now (metres): a legend's quake nearby. */
  shake(time: number): number {
    const k = (time - this.shakeAt) / 0.5;
    return k < 0 || k > 1 ? 0 : this.shakeAmp * (1 - k) * (1 - k);
  }

  /** The newest 💌 event already shown (a frame with no step keeps its step's events: shown once). */
  private lettersSeen = -Infinity;
  /** Her 💌s in the night (the coordinator's brief: "the witch's own magic in the night palette"): a faint warm trail
   *  behind each letter in flight, amber and rose, so it reads in the dark; a soft rose puff and a little ring where one
   *  lands on the ground; on a creature, a rose ring at its feet and a few amber sparks (nothing white: white is a hit's). */
  private drawLetters(time: number): void {
    const g = this.game, dot = this.uv(0), arc = g.tuning.invites.arc ?? 0, seen = this.lettersSeen;
    let newest = seen;
    for (const W of g.witches) {
      for (const L of W.invites.letters) {
        if (L.kind === "cache") continue;
        const sp = Math.hypot(L.vx, L.vz);
        if (sp < 1e-3) continue;
        const ux = L.vx / sp, uz = L.vz / sp;
        for (let j = 1; j <= 9; j++) {
          const back = j * 0.4, f = L.flown - back;
          if (f < 0) break;
          const c = j % 2 ? AMBER : ROSE, y = L.kind === "orbit" ? 1.3 : lobHeight(f, L.range, arc);
          this.standing.add(L.x - ux * back, y, L.z - uz * back, (L.small ? 0.5 : 0.8) * (1 - j * 0.07), dot, c[0], c[1], c[2], 0.9 * (1 - j / 10));
        }
      }
      for (const e of W.invites.events) {
        if (e.at <= seen) continue;
        newest = Math.max(newest, e.at);
        if (e.kind === "fizzled") {
          this.fx.push({ kind: "puff", x: e.x, y: 0.25, z: e.z, at: time, life: 0.5, r: ROSE[0], g: ROSE[1], b: ROSE[2], seed: e.at * 23 + (e.n ?? 0), size: 0.5 });
          this.fx.push({ kind: "ring", x: e.x, y: 0, z: e.z, at: time, life: 0.4, r: ROSE[0], g: ROSE[1], b: ROSE[2], seed: 0, size: 0.9, n: 12, dot: 0.3 });
        } else if (e.kind === "hit" && e.id !== undefined) {
          const c = g.creatures[e.id], top = (c && this.tops.get(c.id)) ?? 1.2;
          this.fx.push({ kind: "ring", x: e.x, y: 0, z: e.z, at: time, life: 0.45, r: ROSE[0], g: ROSE[1], b: ROSE[2], seed: 0, size: e.spent ? 1 : 1.6, n: e.spent ? 12 : 18, dot: 0.4 });
          if (!e.spent) this.fx.push({ kind: "spark", x: e.x, y: top * 0.6, z: e.z, at: time, life: 0.45, r: AMBER[0], g: AMBER[1], b: AMBER[2], seed: e.at * 61 + e.id, size: 0.9 });
        }
      }
    }
    this.lettersSeen = newest;
  }

  /** Combat (rules/combat.ts) and knockouts (rules/knockout.ts): shots and their telegraphs, hits,
   *  health bars (only when hurt), puffs as beaten creatures flee, the knockout's splashing sigils
   *  and teleport, the marker on creatures walking home, and the witch's hit pips. */
  private drawCombat(time: number, camera: THREE.Camera, width: number, height: number, hatTop: number): void {
    const g = this.game, w = g.witch, W = g.witches[0], dot = this.uv(0), sq = this.uv(SQ), near = 90, t = g.tuning;
    const artPx = 1 / (t.artPixelsPerMetre * (2 / t.pixelSize)); // one art pixel, in metres (the pixel star and bits sit on it)
    const close = (x: number, z: number, r = near) => Math.abs(x - w.x) < r && Math.abs(z - w.z) < r;
    // A legend's long-range attack (rules/combat.ts stepLegendAttack: it reaches legends.json attack.range, 420 m) is drawn as
    // far as the legend itself shows (Ed, 2026-10-06: "I see an angry legend probably doing an attack animation but I don't
    // see it firing anything": its wind-up pose showed from the treetops, its telegraph, lob and beam were culled at 90 to
    // 150 m), and bigger from up there, where the camera is far off.
    const up = w.lift > 0.5, far = up ? t.haze.far + 60 : 150, big = up ? 2.6 : 1.2;
    // (on the ground, and from the treetops through the crowns too, as the ley lines and leash routes do)
    const mark = (x: number, z: number, size: number, r: number, gg: number, b: number, a: number) => { this.flat.add(x, 0, z, size, dot, r, gg, b, a); if (up) this.over.add(x, 0.3, z, size * 0.8, dot, r, gg, b, Math.min(1, a * 1.1)); };
    const neon = (sp: string) => this.colours.get(sp) ?? (this.slotOf(sp, 0), this.colours.get(sp)!);
    // New happenings become effects.
    for (const e of g.combat.events) {
      const c = e.id !== undefined ? g.creatures[e.id] : null;
      if (e.kind === "hit" && close(e.x, e.z)) {
        // Counters (Stage 5): strong against its traits, a big gold burst and "!!"; resisted, a small grey tink.
        if (e.counter === 1) { const top = (c && this.tops.get(c.id)) ?? 1.8; this.fx.push({ kind: "spark", x: e.x, y: 1, z: e.z, at: time, life: 0.5, r: 1, g: 0.8, b: 0.2, seed: e.at * 97 + (e.id ?? 0), size: 1.8 }); this.fx.push({ kind: "bang", x: e.x, y: top + 0.4, z: e.z, at: time, life: 0.8, r: 1, g: 0.85, b: 0.25, seed: 0 }); }
        else if (e.counter === -1) this.fx.push({ kind: "tink", x: e.x, y: 1, z: e.z, at: time, life: 0.35, r: 0.7, g: 0.72, b: 0.78, seed: e.at * 97 + (e.id ?? 0), size: 0.7 });
        else this.fx.push({ kind: "spark", x: e.x, y: 1, z: e.z, at: time, life: 0.35, r: 1, g: 0.95, b: 0.7, seed: e.at * 97 + (e.id ?? 0) });
        // The contact (Ed, 2026-10-06: attacks that read): a white star at its chest, a puff of dust at its feet, and bits of it
        // thrown up: feathers off a bird, tufts off fur, chips off a shell, confetti in its neon off a party animal (a party,
        // nobody hurt). A legend's blow, all bigger.
        const top = (c && this.tops.get(c.id)) ?? 1.6, big = e.big ? 2 : 1, bits = c ? hitBits(c.species, c.leashed || c.legendState === "happy") : HIT_BITS.fur, col = bits === HIT_BITS.confetti && c ? neon(c.species) : c ? coatOf(c.species, 0.75) : bits;
        const lf = e.big ? 1 + 2 * t.attackFx.legendFlash : 1; // (a legend's flash: attackFx.legendFlash, 0.5 twice anyone's)
        this.fx.push({ kind: "flash", x: e.x, y: Math.min(3.5, top * 0.55), z: e.z, at: time, life: 0.16 * lf, r: 1, g: 1, b: 0.95, seed: e.at * 53 + (e.id ?? 0), size: 0.9 * lf });
        if (e.big) this.fx.push({ kind: "ring", x: e.x, y: 0, z: e.z, at: time, life: 0.45, r: 1, g: 0.85, b: 0.6, seed: 0, size: 3.2, n: 28, dot: 0.8 }); // a legend's blow: a shockwave along the ground
        this.fx.push({ kind: "dust", x: e.x, y: 0.2, z: e.z, at: time, life: 0.5, r: 0.5, g: 0.45, b: 0.38, seed: e.at * 59 + (e.id ?? 0), size: 0.7 * big });
        this.fx.push({ kind: "bits", x: e.x, y: Math.min(3, top * 0.6), z: e.z, at: time, life: 0.8, r: col.r, g: col.g, b: col.b, seed: e.at * 61 + (e.id ?? 0), size: big, n: bits === HIT_BITS.confetti ? 12 : 8 });
      }
      if (e.kind === "witchHit") { this.fx.push({ kind: "spark", x: e.x, y: 1.4, z: e.z, at: time, life: 0.5, r: 1, g: 0.25, b: 0.35, seed: e.at * 31, size: 1.6 }); this.fx.push({ kind: "flash", x: e.x, y: 1.3, z: e.z, at: time, life: 0.18, r: 1, g: 0.9, b: 0.92, seed: e.at * 67, size: 1.1 }); }
      if (e.kind === "fled" && close(e.x, e.z)) this.fx.push({ kind: "puff", x: e.x, y: 0.5, z: e.z, at: time, life: 0.8, r: 0.8, g: 0.75, b: 0.7, seed: e.at * 13 });
      if (e.kind === "lost" && c) { const col = neon(c.species); this.fx.push({ kind: "spark", x: e.x, y: 1, z: e.z, at: time, life: 1.2, r: col.r, g: col.g, b: col.b, seed: e.at * 7, size: 2.5 }); }
      if ((e.kind === "quake" || e.kind === "phase") && close(e.x, e.z, 150)) {
        // A quake's ring; a legend's roar into its second phase, a bigger, redder one.
        const phase = e.kind === "phase";
        this.fx.push({ kind: "ring", x: e.x, y: 0, z: e.z, at: time, life: phase ? 1.2 : 0.7, r: 1, g: phase ? 0.2 : 0.55, b: phase ? 0.25 : 0.3, seed: 0, size: phase ? 10 : (c && c.fight?.move && attackNamed(c.fight.move)?.radius) || (attackNamed("quake").radius ?? 5) });
        if (phase) this.fx.push({ kind: "spark", x: e.x, y: 2, z: e.z, at: time, life: 1, r: 1, g: 0.3, b: 0.3, seed: e.at * 3, size: 5 });
        const d = Math.hypot(e.x - w.x, e.z - w.z);
        if (d < 60) { this.shakeAt = time; this.shakeAmp = t.combat.shake * (1 - d / 60); } // screen shake: legends only
      }
      // Stage 5: a lob lands in a ring the size of its splash; an ambusher springs; a charge slams home.
      if (e.kind === "landed" && close(e.x, e.z, c?.level === 3 ? far : 150)) { const sh = c ? attackOf(c.species, c.level) : null; this.fx.push({ kind: "ring", x: e.x, y: 0, z: e.z, at: time, life: c?.level === 3 ? 0.9 : 0.5, r: 1, g: 0.5, b: 0.35, seed: 0, size: c?.level === 3 ? LEGENDS.attack.lobRadius * FIGHT.scale : sh?.attack.radius ?? 1.8, ...(c?.level === 3 ? { n: 36, dot: 0.7 * big } : {}) }); this.fx.push({ kind: "puff", x: e.x, y: 0.4, z: e.z, at: time, life: 0.6, r: 0.9, g: 0.7, b: 0.6, seed: e.at * 17 }); }
      // A pulse (a screech, an upheaval) or a toad's slam: a ring out to its reach; burrowing or surfacing, a spray of earth.
      if ((e.kind === "pulse" || e.kind === "slammed") && c && close(e.x, e.z)) { const A = attackOf(c.species, c.level)?.attack, col = c.leashed || c.legendState === "happy" ? neon(c.species) : { r: 1, g: 0.45, b: 0.4 }; this.fx.push({ kind: "ring", x: e.x, y: 0, z: e.z, at: time, life: 0.45, r: col.r, g: col.g, b: col.b, seed: 0, size: A?.radius ?? 2.5 }); }
      if (e.kind === "slept" && close(e.x, e.z, 150)) for (let i = 0; i < 3; i++) this.fx.push({ kind: "puff", x: e.x + (i - 1) * 1.2, y: 0.4, z: e.z, at: time, life: 1.4, r: 0.5, g: 0.4, b: 0.28, seed: e.at * 7 + i });
      if ((e.kind === "burrowed" || e.kind === "surfaced" || e.kind === "slammed") && close(e.x, e.z)) this.fx.push({ kind: "puff", x: e.x, y: 0.3, z: e.z, at: time, life: 0.6, r: 0.55, g: 0.42, b: 0.3, seed: e.at * 41 + (e.id ?? 0) });
      if (e.kind === "sprung" && close(e.x, e.z)) this.fx.push({ kind: "spark", x: e.x, y: 0.8, z: e.z, at: time, life: 0.4, r: 1, g: 0.3, b: 0.3, seed: e.at * 23, size: 1.4 });
      // Ed's species pass: a glow-worm's flash (a burst of its light), a block (a white glint), digging in (earth thrown up).
      // (Ed, 2026-10-05: the new moves' feedback bigger and brighter, to read at normal zoom on dark ground)
      if (e.kind === "flash" && c && close(e.x, e.z)) {
        const col = neon(c.species), R = (profileOf(c.species)?.move?.radius ?? 9) * FIGHT.scale, hot = { r: col.r * 0.4 + 0.6, g: col.g * 0.4 + 0.6, b: col.b * 0.4 + 0.6 };
        this.fx.push({ kind: "ring", x: e.x, y: 0, z: e.z, at: time, life: 0.9, ...hot, seed: 0, size: R, n: Math.round(R * 9), dot: 1.1 });
        this.fx.push({ kind: "ring", x: e.x, y: 0, z: e.z, at: time, life: 0.7, ...col, seed: 0, size: R * 0.6, n: Math.round(R * 6), dot: 0.9 });
        this.fx.push({ kind: "spark", x: e.x, y: 1, z: e.z, at: time, life: 0.7, ...hot, seed: e.at * 37, size: 7 });
      }
      if (e.kind === "blocked" && close(e.x, e.z)) { this.fx.push({ kind: "spark", x: e.x, y: 1.1, z: e.z, at: time, life: 0.5, r: 0.9, g: 0.97, b: 1, seed: e.at * 43, size: 3 }); this.fx.push({ kind: "ring", x: e.x, y: 0, z: e.z, at: time, life: 0.4, r: 0.7, g: 0.85, b: 1, seed: 0, size: 2.2, n: 20, dot: 0.6 }); }
      if (e.kind === "dug" && close(e.x, e.z)) { this.fx.push({ kind: "puff", x: e.x, y: 0.4, z: e.z, at: time, life: 1, r: 0.95, g: 0.7, b: 0.4, seed: e.at * 47, size: 2 }); this.fx.push({ kind: "ring", x: e.x, y: 0, z: e.z, at: time, life: 0.5, r: 1, g: 0.65, b: 0.3, seed: 0, size: 2.6, n: 24, dot: 0.7 }); }
      if (e.kind === "charged" && close(e.x, e.z)) this.fx.push({ kind: "puff", x: e.x, y: 0.4, z: e.z, at: time, life: 0.7, r: 0.8, g: 0.7, b: 0.55, seed: e.at * 29 });
      if (e.kind === "soundHit" && close(e.x, e.z, 150) && (e.at * 10) % 3 < 1) this.fx.push({ kind: "spark", x: e.x, y: 2.5, z: e.z, at: time, life: 0.3, r: 1, g: 0.6, b: 0.3, seed: e.at * 3 });
      if (e.kind === "soundDestroyed") this.fx.push({ kind: "spark", x: e.x, y: 3, z: e.z, at: time, life: 2, r: 1, g: 0.4, b: 0.6, seed: e.at, size: 6 });
    }
    // A quest done: the dream bubble pops in sparkles, the creature brought joins its new area.
    for (const e of g.questEvents) {
      const L = g.creatures[e.id], top = Math.min(this.tops.get(e.id) ?? 2, 4.5) + 1.5;
      this.fx.push({ kind: "spark", x: L.x, y: top, z: L.z, at: time, life: 1.2, r: 1, g: 0.75, b: 0.95, seed: e.at * 11 + e.id, size: 3 });
      this.fx.push({ kind: "spark", x: L.x, y: top, z: L.z, at: time, life: 0.8, r: 1, g: 1, b: 1, seed: e.at * 13 + e.id, size: 1.6 });
      this.fx.push({ kind: "ring", x: L.x, y: 0, z: L.z, at: time, life: 1, r: 1, g: 0.6, b: 0.85, seed: 0, size: 5 });
      const j = g.creatures[e.joined]; if (j) this.fx.push({ kind: "puff", x: j.x, y: 0.5, z: j.z, at: time, life: 0.8, r: 1, g: 0.7, b: 0.9, seed: e.at * 17 });
    }
    for (const e of g.koEvents) {
      if (e.kind === "released" && e.id !== undefined) {
        const c = g.creatures[e.id], col = neon(c.species), from = this.lastSlots.get(e.id);
        const fx = from ? from.x : w.x, fy = from ? from.y : hatTop + 1, fz = from ? from.z : w.z;
        this.fx.push({ kind: "splash", x: fx, y: fy, z: fz, at: time, life: 1.1, r: col.r, g: col.g, b: col.b, seed: e.id * 17 + 3 });
        this.fx.push({ kind: "snap", x: fx, y: fy, z: fz, at: time, life: 0.9, r: col.r, g: col.g, b: col.b, seed: e.id, tx: c.x, tz: c.z });
        this.fx.push({ kind: "puff", x: c.x, y: 0.6, z: c.z, at: time, life: 0.8, r: col.r, g: col.g, b: col.b, seed: e.id * 5 });
      }
      if (e.kind === "sparkleOut" || e.kind === "sparkleIn") {
        const at = e.kind === "sparkleIn" && this.seatAt ? this.seatAt : { x: e.x, y: 0, z: e.z }; // (back behind her decks: there)
        this.fx.push({ kind: "teleport", x: at.x, y: at.y, z: at.z, at: time, life: t.knockout.teleport * 0.6, r: 0.75, g: 0.6, b: 1, seed: e.at });
      }
    }
    { let j = 0; for (const f of this.fx) if (time - f.at < f.life) this.fx[j++] = f; this.fx.length = j; } // (in place: no new array a frame)
    for (const f of this.fx) {
      const k = (time - f.at) / f.life, n = f.kind === "flash" ? 13 : f.kind === "dust" ? 10 : f.kind === "bits" ? f.n ?? 8 : f.kind === "spark" ? 10 : f.kind === "splash" ? 22 : f.kind === "puff" ? 12 : f.kind === "teleport" ? 40 : f.kind === "ring" ? f.n ?? 36 : f.kind === "motes" ? 16 : 14, sz = f.size ?? 1;
      for (let i = 0; i < n; i++) {
        const a = hash2(f.seed, i, 3) * Math.PI * 2, r1 = hash2(f.seed, i, 5), r2 = hash2(f.seed, i, 7);
        if (f.kind === "spark") this.standing.add(f.x + Math.cos(a) * sz * k * (0.5 + r1), f.y + sz * k * r2, f.z + Math.sin(a) * sz * k * (0.5 + r1), 0.22 * Math.sqrt(sz), dot, f.r, f.g, f.b, 1 - k);
        else if (f.kind === "dust") this.solid.add(f.x + Math.cos(a) * k * 1.1 * sz, f.y + k * r2 * 0.8 * sz, f.z + Math.sin(a) * k * 1.1 * sz, (0.45 + k * 0.8) * sz, dot, f.r, f.g, f.b, 0.55 * (1 - k)); // a hit's dust, toned to the floor, not glowing
        else if (f.kind === "puff") this.standing.add(f.x + Math.cos(a) * k * 1.2 * sz, f.y + k * r2 * 1.2 * sz, f.z + Math.sin(a) * k * 1.2 * sz, (0.5 + k) * sz, dot, f.r * 0.5, f.g * 0.5, f.b * 0.5, 0.6 * (1 - k));
        else if (f.kind === "splash") this.standing.add(f.x + Math.cos(a) * (0.5 + r1 * 2) * k, f.y + (1 + r2 * 2) * k - 5 * k * k, f.z + Math.sin(a) * (0.5 + r1 * 2) * k, 0.3, dot, f.r * 1.4, f.g * 1.4, f.b * 1.4, 1 - k * k);
        else if (f.kind === "snap") { const q = (i + 0.5) / n, cut = q > k; if (cut) this.standing.add(f.x + (f.tx! - f.x) * q, f.y + (0.6 - f.y) * q + Math.sin(q * Math.PI) * 1.2 - k * 2 * q, f.z + (f.tz! - f.z) * q, 0.24, dot, f.r, f.g, f.b, (1 - k) * 0.9); }
        else if (f.kind === "teleport") this.standing.add(f.x + Math.cos(a + k * 6) * (0.4 + r1), r2 * 3 + k * 2, f.z + Math.sin(a + k * 6) * (0.4 + r1), 0.25, dot, f.r * 1.3, f.g * 1.3, f.b * 1.3, Math.sin(k * Math.PI));
        else if (f.kind === "bang") { if (i < 8) { const col = i < 4 ? -1 : 1, row = i % 4, R = SPRITE_UNIFORMS.uRight.value; if (row !== 2) this.over.add(f.x + R.x * col * 0.22, f.y + k * 0.6 + (3 - row) * 0.17, f.z + R.z * col * 0.22, 0.2, sq, f.r, f.g, f.b, 1 - k * k); } }
        else if (f.kind === "tink") { const aa = (i / n) * Math.PI * 2, R = sz * (0.4 + 0.6 * k); this.standing.add(f.x + Math.cos(aa) * R, f.y + Math.sin(aa) * R * 0.6, f.z, 0.16, dot, f.r, f.g, f.b, 1 - k); }
        else if (f.kind === "flash") { // a pixel star (the art director, #193): a cross of art-pixel squares, its arms growing 1 to 3 pixels, a pale ring of 8 in its last frame
          const R = SPRITE_UNIFORMS.uRight.value, px = artPx * Math.max(1, Math.round(sz)), arm = Math.min(3, 1 + Math.floor(k * 3));
          if (i === 0) this.over.add(f.x, f.y, f.z, px, sq, f.r, f.g, f.b, 1);
          else if (i <= 12) { const ray = (i - 1) % 4, step = Math.floor((i - 1) / 4) + 1; if (step <= arm) { const ox = ray === 0 ? step : ray === 2 ? -step : 0, oy = ray === 1 ? step : ray === 3 ? -step : 0; this.over.add(f.x + R.x * ox * px, f.y + oy * px, f.z + R.z * ox * px, px, sq, f.r, f.g, f.b, 1 - k * 0.5); } }
          if (i === 0 && k > 0.6) for (let j = 0; j < 8; j++) { const aa = (j / 8) * Math.PI * 2, ox = Math.round(Math.cos(aa) * 4), oy = Math.round(Math.sin(aa) * 4); this.over.add(f.x + R.x * ox * px, f.y + oy * px, f.z + R.z * ox * px, px, sq, 0.85, 0.9, 1, 0.6); }
        }
        else if (f.kind === "bits") { // thrown up and out and falling, art-pixel squares in its coat, not glowing
          const sp = (0.8 + r1 * 1.4) * sz, up = (2 + r2 * 2.5) * sz, px = artPx * (r1 > 0.6 ? 2 : 1);
          this.solid.add(f.x + Math.cos(a) * sp * k, Math.max(0.05, f.y + up * k - 6 * k * k), f.z + Math.sin(a) * sp * k, px, sq, f.r, f.g, f.b, 1 - k * k * k);
        }
        else if (f.kind === "motes") { const R = sz * (0.3 + r1 * 0.7), h = (f.tx ?? 3) * (0.2 + 0.8 * r2) * Math.sqrt(k); this.standing.add(f.x + Math.cos(a) * R, f.y + h, f.z + Math.sin(a) * R * 0.8, 0.7 * (1 - k * 0.5), dot, f.r, f.g, f.b, Math.sin(Math.PI * Math.min(1, k * 1.4)) * 0.9); } // (a sigil's motes rising: tx their height)
        else if (f.kind === "ring") { const aa = (i / n) * Math.PI * 2, R = sz * (0.3 + 0.7 * k); this.flat.add(f.x + Math.cos(aa) * R, 0, f.z + Math.sin(aa) * R * 0.8, f.dot ?? 0.7, dot, f.r, f.g, f.b, 1 - k); }
      }
    }
    // Shots in flight: a bright core and a halo, red for the wild, the party's in their neon.
    for (const sh of g.combat.shots) {
      if (!close(sh.x, sh.z, sh.lob ? far : 150) && !(sh.lob && close(sh.lob.tx, sh.lob.tz, far))) continue;
      const col = huntsWitch(sh.side) ? { r: 1, g: 0.25, b: 0.35 } : neon(sh.species);
      if (sh.lob) {
        // A lob: high over everything, and a ring tightening where it'll land (get out of it).
        // (a legend's: a great arc, as high as a fifth of its throw, a bomb the size of a boulder with a trail of embers)
        const L = sh.lob, k = Math.max(0, Math.min(1, (time - L.at) / Math.max(0.01, L.lands - L.at))), legend = sh.attack === "legendLob";
        const hi = legend ? Math.max(8, Math.hypot(L.tx - L.fx, L.tz - L.fz) * 0.2) : 5, y = 1 + Math.sin(k * Math.PI) * hi, sz = legend ? big : 1;
        const air = legend && up ? this.over : this.standing; // (over the crowns from the treetops)
        air.add(sh.x, y, sh.z, (legend ? 1.1 : 0.7) * sz, dot, 1, 1, 1, 0.95);
        air.add(sh.x, y, sh.z, (legend ? 2.6 : 1.8) * sz, dot, col.r, col.g, col.b, 0.75, 1, legend);
        if (legend) for (let i = 1; i <= 6; i++) { const q = Math.max(0, k - i * 0.025), x = L.fx + (L.tx - L.fx) * q, z = L.fz + (L.tz - L.fz) * q; air.add(x, 1 + Math.sin(q * Math.PI) * hi, z, (1.2 - i * 0.13) * sz, dot, col.r, col.g * 0.8, col.b * 0.6, 0.6 - i * 0.08, 1, true); }
        const R = sh.radius * (1.4 - 0.4 * k), n = legend ? 40 : 24;
        for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; if (legend) mark(L.tx + Math.cos(a) * R, L.tz + Math.sin(a) * R * 0.8, 0.4 * sz, col.r, col.g, col.b, 0.3 + 0.6 * k); else this.flat.add(L.tx + Math.cos(a) * R, 0, L.tz + Math.sin(a) * R * 0.8, 0.4 * sz, dot, col.r, col.g, col.b, 0.3 + 0.6 * k); }
        continue;
      }
      this.standing.add(sh.x, 1, sh.z, 0.55, dot, 1, 1, 1, 0.9);
      this.standing.add(sh.x, 1, sh.z, 1.6, dot, col.r, col.g, col.b, 0.7);
      this.standing.add(sh.x - sh.vx * 0.05, 1, sh.z - sh.vz * 0.05, 1, dot, col.r, col.g, col.b, 0.3, 1, true); // (its trail: light)
    }
    // Beams: a burning line from the creature, as wide as it hurts.
    for (const b of g.combat.beams) {
      const c = g.creatures[b.from];
      if (!c || !close(c.x, c.z, b.attack === "legendBeam" ? far : 150)) continue;
      const col = huntsWitch(b.side) ? { r: 1, g: 0.3, b: 0.3 } : neon(b.species), ex = Math.cos(b.angle), ez = Math.sin(b.angle), fl = 0.75 + 0.25 * Math.sin(time * 40 + b.id);
      for (let s2 = 0.6; s2 < b.length; s2 += 0.45) {
        this.standing.add(c.x + ex * s2, 0.7, c.z + ez * s2, Math.max(0.5, b.width * 0.9), dot, col.r, col.g, col.b, 0.45 * fl, 1, true); // (its glow: light)
        this.standing.add(c.x + ex * s2, 0.7, c.z + ez * s2, 0.3, dot, 1, 1, 1, 0.8 * fl);
      }
    }
    // A snail's slime: glistening patches on the ground, fading as they dry.
    for (const tr of g.combat.trails) {
      if (!close(tr.x, tr.z)) continue;
      const left = Math.min(1, (tr.until - time) / 2), wild = huntsWitch(tr.side);
      // A glossy patch (bigger and brighter: Ed, 2026-10-05), a rim round it, and glints that wink.
      const sd = Math.round(tr.until * 10), [sr, sg, sb] = wild ? [0.6, 1, 0.35] : [0.45, 1, 0.85];
      for (let i = 0; i < 7; i++) { const a = hash2(tr.from, sd + i, 31) * Math.PI * 2, q = hash2(tr.from, sd + i, 37) * tr.r * 0.6; this.flat.add(tr.x + Math.cos(a) * q, 0, tr.z + Math.sin(a) * q * 0.8, tr.r * 0.75, dot, sr, sg, sb, 0.45 * left); }
      for (let i = 0; i < 14; i++) { const a = (i / 14) * Math.PI * 2; this.flat.add(tr.x + Math.cos(a) * tr.r, 0, tr.z + Math.sin(a) * tr.r * 0.8, 0.45, dot, sr, sg, sb, 0.7 * left); }
      for (let i = 0; i < 3; i++) { const tw = 0.5 + 0.5 * Math.sin(time * 5 + i * 2.1 + tr.from), a = hash2(tr.from, sd + i, 43) * Math.PI * 2, q = hash2(tr.from, sd + i, 47) * tr.r * 0.7; this.standing.add(tr.x + Math.cos(a) * q, 0.12, tr.z + Math.sin(a) * q * 0.8, 0.35, dot, 1, 1, 0.9, tw * left); }
    }
    for (const c of g.creatures) {
      if (c.gone || !close(c.x, c.z, c.level === 3 ? far : near)) continue;
      // Dug in (the badger): a ring of thrown-up earth round its feet.
      if (c.dug !== undefined && time < c.dug) { // (bigger and brighter: Ed, 2026-10-05)
        for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; this.standing.add(c.x + Math.cos(a) * 1.4, 0.15 + hash2(c.id, i, 41) * 0.25, c.z + Math.sin(a) * 0.95, 0.6, dot, 0.95, 0.62, 0.32, 0.95); }
        const pk = 0.6 + 0.4 * Math.sin(time * 6 + c.id);
        for (let i = 0; i < 24; i++) { const a = (i / 24) * Math.PI * 2; this.flat.add(c.x + Math.cos(a) * 1.9, 0, c.z + Math.sin(a) * 1.5, 0.5, dot, 1, 0.6, 0.25, 0.7 * pk); }
      }
      // Braced (the beaver): its tail up as a shield, an arc on the side it faces.
      if (c.brace !== undefined && time < c.brace) for (let i = -5; i <= 5; i++) for (let row = 0; row < 3; row++) { // (a shield: bigger and brighter, Ed 2026-10-05)
        const a = (c.facing > 0 ? 0 : Math.PI) + i * 0.2; this.standing.add(c.x + Math.cos(a) * 1.5, 0.35 + row * 0.45 - Math.abs(i) * 0.04, c.z + Math.sin(a) * 1.1, 0.5, dot, 0.75, 0.9, 1, row === 1 ? 1 : 0.8);
      }
      // Rolling curled up (a hedgehog, a woodlouse): spikes whirling round it.
      if (c.charge?.curl && (c.charge.from === undefined || time >= c.charge.from)) for (let i = 0; i < 14; i++) { // (bigger and brighter: Ed, 2026-10-05)
        const a = (i / 14) * Math.PI * 2 + time * 14, R = i % 2 ? 1.35 : 0.95; this.standing.add(c.x + Math.cos(a) * R, 0.7 + Math.sin(a) * R * 0.7, c.z + 0.3, i % 2 ? 0.6 : 0.45, dot, 0.85, 0.95, 1, 1); // (white-blue: it shows against its own brown spines)
      }
      if (c.charge?.curl && (c.charge.from === undefined || time >= c.charge.from)) for (let i = 0; i < 20; i++) { const a = (i / 20) * Math.PI * 2 - time * 10; this.flat.add(c.x + Math.cos(a) * 1.6, 0, c.z + Math.sin(a) * 1.25, 0.45, dot, 0.7, 0.85, 1, i % 4 === 0 ? 0.95 : 0.4); } // (a whirling ring on the ground under it)
      // Burrowed (the mole): a mound of earth moving over the ground, flecks thrown up.
      if (c.burrow) for (let i = 0; i < 7; i++) { const a = (i / 7) * Math.PI * 2, q = hash2(c.id, Math.floor(time * 12) + i, 19); this.standing.add(c.x + Math.cos(a) * 0.45, 0.1 + (i === 0 ? 0.25 : 0) + q * 0.12, c.z + Math.sin(a) * 0.3, 0.45, dot, 0.42, 0.3, 0.2, 0.9); }
      // Leaping (the toad): a ring tightening where it'll land.
      if (c.leap) { const L = c.leap, k = Math.max(0, Math.min(1, (time - L.at) / Math.max(0.01, L.lands - L.at))), A = attackOf(c.species, c.level)?.attack, R = (A?.radius ?? 2.4) * (1.3 - 0.3 * k), col = c.leashed ? neon(c.species) : { r: 1, g: 0.35, b: 0.35 }; for (let i = 0; i < 20; i++) { const a = (i / 20) * Math.PI * 2; this.flat.add(L.tx + Math.cos(a) * R, 0, L.tz + Math.sin(a) * R * 0.8, 0.35, dot, col.r, col.g, col.b, 0.3 + 0.6 * k); } }
      // A wild legend in its second phase: a red aura pulsing round its feet.
      if (c.legend?.phase === 2 && !c.leashed) { const pk = 0.5 + 0.5 * Math.sin(time * 6 + c.id); for (let i = 0; i < 28; i++) { const a = (i / 28) * Math.PI * 2 + time * 0.5, R = 2.6 + pk * 0.4; this.flat.add(c.x + Math.cos(a) * R, 0, c.z + Math.sin(a) * R * 0.8, 0.45, dot, 1, 0.2, 0.25, 0.3 + 0.4 * pk); } }
      if (legendCharging(c, time)) for (let i = 0; i < 3; i++) this.standing.add(c.x + (hash2(c.id, Math.floor(time * 15) + i, 23) - 0.5) * 2, 0.4, c.z + (hash2(c.id, Math.floor(time * 15) + i, 29) - 0.5) * 1.2, 0.8, dot, 0.7, 0.6, 0.5, 0.4);
      // A friendly area's creature (its legend's quest done): a rosy heart-mote over it now and then.
      if (c.friendly && !c.leashed && c.level > 0) { const top = (this.tops.get(c.id) ?? 1.2 + c.level * 0.6) + 0.35, ph = (time * 0.5 + c.id * 0.37) % 1; this.standing.add(c.x, top + ph * 0.6, c.z, 0.28, dot, 1, 0.5, 0.75, Math.sin(ph * Math.PI) * 0.9); }
      // About to charge (the boar lowering its head): the lane it will run down, brightening.
      if (c.charge?.from !== undefined && time < c.charge.from) { const ch = c.charge, k = 1 - Math.max(0, ch.from! - time) / 0.5, L = ch.speed * (ch.until - ch.from!), col = c.leashed ? neon(c.species) : { r: 1, g: 0.3, b: 0.3 }; for (let s2 = 1.5; s2 < L; s2 += 1.2) for (const side of [-1, 1]) this.flat.add(c.x + ch.dx * s2 - ch.dz * side * 1.6, 0, c.z + ch.dz * s2 + ch.dx * side * 1.6, 0.35, dot, col.r, col.g, col.b, 0.15 + 0.55 * k); }
      // A legend's long charge (legends.json charge): head down, its first lane on the ground, brightening;
      // then dust and churned ground behind it as it runs and brakes in its arc (the ruts fade slowly).
      if (c.run) {
        const run = c.run, K = LEGENDS.charge, col = c.legendState === "happy" ? neon(c.species) : { r: 1, g: 0.3, b: 0.3 };
        if (run.phase === "windup") {
          const k = Math.min(1, (time - run.at) / Math.max(0.05, K.windup)), ux = Math.cos(run.angle), uz = Math.sin(run.angle), half = (K.laneWidth * FIGHT.scale) / 2;
          for (let s2 = 2; s2 < K.laneShown * FIGHT.scale; s2 += 1.4) for (const side of [-1, 1]) this.flat.add(c.x + ux * s2 - uz * side * half, 0, c.z + uz * s2 + ux * side * half, 0.45, dot, col.r, col.g, col.b, (0.15 + 0.6 * k) * (1 - s2 / (K.laneShown * FIGHT.scale * 1.1)));
          for (let i = 0; i < 20; i++) { const a = (i / 20) * Math.PI * 2, R = 4 - 2 * k; this.flat.add(c.x + Math.cos(a) * R, 0, c.z + Math.sin(a) * R * 0.8, 0.5, dot, col.r, col.g, col.b, 0.3 + 0.6 * k); }
        } else if (run.phase !== "home") {
          let ruts = this.ruts.get(c.id);
          if (!ruts) this.ruts.set(c.id, (ruts = []));
          if (!ruts.length || Math.hypot(ruts[ruts.length - 1].x - c.x, ruts[ruts.length - 1].z - c.z) > 1.5) ruts.push({ x: c.x, z: c.z, at: time });
          for (let i = 0; i < 6; i++) { const q = hash2(c.id, Math.floor(time * 20) + i, 17), ux = Math.cos(run.angle), uz = Math.sin(run.angle); this.standing.add(c.x - ux * (2 + i * 1.2), 0.4 + q * 0.8, c.z - uz * (2 + i * 1.2), 0.9 + i * 0.25, dot, 0.75, 0.65, 0.5, 0.55 - i * 0.08); }
        }
      }
      // Charging (the boar): dust kicked up behind it.
      if (c.charge && (c.charge.from === undefined || time >= c.charge.from)) for (let i = 0; i < (c.charge.braking ? 6 : 4); i++) { const q = hash2(c.id, Math.floor(time * 20) + i, 17); this.standing.add(c.x - c.charge.dx * (0.8 + i * 0.5), 0.3 + q * 0.4, c.z - c.charge.dz * (0.8 + i * 0.5), 0.5 + i * 0.15, dot, 0.75, 0.65, 0.5, 0.5 - i * 0.1); }
      // The boar's charge throws up petals with its dust (Ed, 2026-10-06: dust and petals for the boar, a party).
      if (c.charge && c.species === "boar" && (c.charge.from === undefined || time >= c.charge.from)) for (let i = 0; i < 4; i++) { const q = hash2(c.id, Math.floor(time * 12) + i, 29), age = (time * 12) % 1; this.solid.add(c.x - c.charge.dx * (1 + i * 0.7) + (q - 0.5) * 1.2, 0.5 + q * 1.2 + age * 0.5, c.z - c.charge.dz * (1 + i * 0.7) + (hash2(c.id, i, 31) - 0.5) * 1.2, artPx * 2, sq, 0.85, 0.45 + q * 0.25, 0.6, 0.9 - i * 0.15); } // (petals: art-pixel squares, not glowing)
      // A lunge (the dash-strike): dust kicked up behind it and a streak of speed along its way.
      const lg = c.fight?.lunge;
      if (lg && lg.left > 0.05) for (let i = 0; i < 5; i++) { const q = hash2(c.id, Math.floor(time * 30) + i, 37); this.solid.add(c.x - lg.dx * (0.6 + i * 0.6), 0.25 + q * 0.3, c.z - lg.dz * (0.6 + i * 0.6), 0.45 + i * 0.12, dot, 0.5, 0.45, 0.38, 0.45 - i * 0.08); this.standing.add(c.x - lg.dx * (0.4 + i * 0.5), 0.9 + (q - 0.5) * 0.5, c.z - lg.dz * (0.4 + i * 0.5), 0.12, dot, 1, 1, 0.95, 0.7 - i * 0.13); }
      // Slowed (a barb, a web): a cold drift of motes round its feet while it lasts.
      if (c.slowUntil !== undefined && time < c.slowUntil) for (let i = 0; i < 6; i++) { const a = time * 1.5 + (i / 6) * Math.PI * 2; this.standing.add(c.x + Math.cos(a) * 0.8, 0.15 + 0.15 * Math.sin(time * 3 + i), c.z + Math.sin(a) * 0.55, 0.18, dot, 0.55, 0.75, 1, 0.75); }
      // Telegraphs: winding up, a ring tightens at its feet; a shot shows its line; the quake its reach.
      const f = c.fight, longRange = !!(f && f.windupUntil > 0 && c.aims?.length && !f.move), atk = f && f.windupUntil > 0 && !longRange ? attackOf(c.species, c.level) : null;
      if (longRange && f) {
        // A legend's long-range throw or beam winding up (stepLegendAttack): a ring closing in round it and, at each it aims
        // at, a line on the ground filling in from it and a target ring tightening there (a beam's lane its own width), all
        // brightening till it fires: where it's going to land, readable from the treetops, time to get out of it.
        const K = LEGENDS.attack, k = Math.max(0, Math.min(1, 1 - (f.windupUntil - time) / Math.max(0.05, K.windup))), happy = c.legendState === "happy";
        const col = happy ? neon(c.species) : { r: 1, g: 0.3, b: 0.3 }, beam = K.beam.includes(c.species), S = FIGHT.scale;
        const R0 = (bodyRadius(c) + 3) * (1.6 - 0.6 * k);
        for (let i = 0; i < 36; i++) { const a = (i / 36) * Math.PI * 2 + time * 0.6; mark(c.x + Math.cos(a) * R0, c.z + Math.sin(a) * R0 * 0.8, 0.45 * big, col.r, col.g, col.b, 0.35 + 0.6 * k); }
        for (const a of c.aims!) {
          if (!close(a.x, a.z, far) && !close(c.x, c.z, far)) continue;
          const dx = a.x - c.x, dz = a.z - c.z, d = Math.hypot(dx, dz) || 1, ux = dx / d, uz = dz / d, gap = 1.5 * big;
          for (let s2 = R0; s2 < d * k; s2 += gap) mark(c.x + ux * s2, c.z + uz * s2, 0.55 * big, col.r, col.g, col.b, 0.4 + 0.55 * k);
          if (beam) { const half = (K.beamWidth * S) / 2; for (let s2 = R0; s2 < d; s2 += gap) for (const side of [-1, 1]) mark(c.x + ux * s2 - uz * half * side, c.z + uz * s2 + ux * half * side, 0.3 * big, col.r, col.g, col.b, 0.1 + 0.45 * k); }
          else { const R = K.lobRadius * S * (1.5 - 0.5 * k); for (let i = 0; i < 40; i++) { const q = (i / 40) * Math.PI * 2; mark(a.x + Math.cos(q) * R, a.z + Math.sin(q) * R * 0.8, 0.45 * big, col.r, col.g, col.b, 0.3 + 0.65 * k); } }
        }
      }
      if (atk && f) {
        const A = (f.move && attackNamed(f.move)) || atk.attack, k = Math.max(0, Math.min(1, 1 - (f.windupUntil - time) / Math.max(0.05, A.windup))), wild = !c.leashed && c.legendState !== "happy"; // (a happy legend fights for her, in her colours)
        const [r, gg, b] = wild ? [1, 0.3, 0.3] : [neon(c.species).r, neon(c.species).g, neon(c.species).b];
        // The anticipation's cue: a glint over its head as it starts winding up (Ed, 2026-10-06: wind-ups that read).
        if (k < 0.35) { const y = (this.tops.get(c.id) ?? 1.4) + 0.5, R = SPRITE_UNIFORMS.uRight.value, e = 1 - k / 0.35, L = 0.35 * (0.5 + 0.5 * Math.sin(k * 30)) + 0.2;
          this.over.add(c.x, y, c.z, 0.32 * e + 0.1, dot, 1, 1, 0.85, e); for (const [ox, oy] of [[L, 0], [-L, 0], [0, L], [0, -L]]) this.over.add(c.x + R.x * ox, y + oy, c.z + R.z * ox, 0.12, dot, 1, 0.95, 0.7, e); }
        if (A.delivery === "quake" || A.delivery === "pulse") {
          const R = A.radius ?? 5;
          for (let i = 0; i < 40; i++) { const a = (i / 40) * Math.PI * 2; this.flat.add(c.x + Math.cos(a) * R, 0, c.z + Math.sin(a) * R * 0.8, 0.5, dot, r, gg * 0.6, b * 0.6, 0.25 + 0.6 * k); }
        } else if (f.move && A.delivery === "shot") {
          // A legend's nova: spokes out all round, growing as it winds up.
          const n = A.shots ?? 8, aim = Math.atan2(f.aimZ - c.z, f.aimX - c.x);
          for (let i = 0; i < n; i++) { const a = aim + (i / n) * Math.PI * 2; for (let s2 = 1.5; s2 < 1.5 + 4 * k; s2 += 0.7) this.flat.add(c.x + Math.cos(a) * s2, 0, c.z + Math.sin(a) * s2 * 0.8, 0.35, dot, r, gg, b, 0.25 + 0.6 * k); }
        } else if (f.move && A.delivery === "beam") {
          // A legend's spin: the whole circle it will sweep, and where the beam starts.
          const R = A.range, aim = Math.atan2(f.aimZ - c.z, f.aimX - c.x);
          for (let i = 0; i < 48; i++) { const a = (i / 48) * Math.PI * 2; this.flat.add(c.x + Math.cos(a) * R, 0, c.z + Math.sin(a) * R * 0.8, 0.4, dot, r, gg, b, 0.2 + 0.5 * k); }
          for (let s2 = 1.2; s2 < R; s2 += 0.7) this.flat.add(c.x + Math.cos(aim) * s2, 0, c.z + Math.sin(aim) * s2, 0.35, dot, 1, 0.3, 0.3, 0.2 + 0.6 * k);
        } else if (f.move && A.delivery === "melee") {
          // A legend's charge: the long lane it will run down.
          const dx = f.aimX - c.x, dz = f.aimZ - c.z, d = Math.hypot(dx, dz) || 1, L = (A.speed ?? 8) * (A.duration ?? 1.5);
          for (let s2 = 1.5; s2 < L; s2 += 0.8) for (const side of [-1, 1]) this.flat.add(c.x + (dx / d) * s2 - (dz / d) * side * 1.4, 0, c.z + (dz / d) * s2 + (dx / d) * side * 1.4, 0.32, dot, r, gg, b, 0.15 + 0.55 * k);
        } else {
          const R = 1.8 - 0.9 * k;
          for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; this.flat.add(c.x + Math.cos(a) * R, 0, c.z + Math.sin(a) * R * 0.8, 0.35, dot, r, gg, b, 0.4 + 0.5 * k); }
          if (A.delivery === "melee" && (A.lunge ?? 0) > 3) {
            // A lunge's line (Ed's motion scale pass: a dash-strike of 12 to 16 m): where it will go.
            const dx = f.aimX - c.x, dz = f.aimZ - c.z, d = Math.hypot(dx, dz) || 1, L = Math.min(A.lunge ?? 0, d);
            for (let s2 = 1; s2 < L; s2 += 0.8) this.flat.add(c.x + (dx / d) * s2, 0, c.z + (dz / d) * s2, 0.35, dot, r, gg, b, 0.15 + 0.5 * k);
            this.flat.add(c.x + (dx / d) * L, 0, c.z + (dz / d) * L, 0.9, dot, r, gg, b, 0.3 + 0.6 * k);
          }
          if ((A.delivery === "shot" || A.delivery === "beam") && wild) {
            const dx = f.aimX - c.x, dz = f.aimZ - c.z, d = Math.hypot(dx, dz) || 1, L = Math.min(A.range, d + 2);
            for (let s2 = 1.2; s2 < L; s2 += 0.9) this.flat.add(c.x + (dx / d) * s2, 0, c.z + (dz / d) * s2, 0.28, dot, 1, 0.3, 0.3, 0.12 + 0.3 * k);
          }
        }
      }
      // Healed (a berry, or invited: Ed, 2026-10-04): a green sparkle, and its bar shows full a moment.
      const healed = c.healedAt !== undefined && time - c.healedAt < 0.8;
      if (healed) for (let i = 0; i < 10; i++) { const k = (time - c.healedAt!) / 0.8, a = hash2(c.id, i, 11) * Math.PI * 2; this.standing.add(c.x + Math.cos(a) * 0.9 * (0.4 + k), 0.4 + k * 2 + hash2(c.id, i, 13), c.z + Math.sin(a) * 0.6 * (0.4 + k), 0.3, dot, 0.4, 1, 0.5, 1 - k); }
      // Health bars, only when hurt: ten squares over its head.
      const max = creatureMaxHp(c), hp = c.hp ?? max;
      // Stunned (an armoured one knocked over): stars round its head.
      if (c.stunUntil !== undefined && time < c.stunUntil) { const y = (this.tops.get(c.id) ?? 1.4) + 0.2; for (let i = 0; i < 3; i++) { const a = time * 5 + (i / 3) * Math.PI * 2; this.standing.add(c.x + Math.cos(a) * 0.6, y + Math.sin(a * 2) * 0.08, c.z + Math.sin(a) * 0.4, 0.22, dot, 1, 0.95, 0.5, 0.9); } }
      // Its traits' marks (Stage 5, readable counters), left of its health bar, while it fights or is hurt.
      if ((hp < max || healed || c.fight?.target) && !c.fleeUntil && c.level > 0) {
        const tr = traitsOf(c.species);
        if (tr.length) {
          const y = (this.tops.get(c.id) ?? 1.6 + c.level * 0.7) + 0.5, R = SPRITE_UNIFORMS.uRight.value, wide = 1 + c.level * 0.25;
          tr.forEach((m, j) => { const o = -5.2 * 0.17 * wide - 0.3 - j * 0.35, px = c.x + R.x * o, pz = c.z + R.z * o, M = TRAIT_MARKS[m]; this.over.add(px, y, pz, M.size, M.square ? sq : dot, M.r, M.g, M.b, 0.95); });
        }
      }
      if ((hp < max || healed) && !c.fleeUntil) {
        const y = (this.tops.get(c.id) ?? 1.6 + c.level * 0.7) + 0.5, share = Math.max(0, hp / max), R = SPRITE_UNIFORMS.uRight.value, wide = 1 + c.level * 0.25;
        for (let i = 0; i < 10; i++) { // drawn over everything, so a big creature's own sprite doesn't hide it
          const o = (i - 4.5) * 0.17 * wide, lit = (i + 0.5) / 10 <= share;
          this.over.add(c.x + R.x * o, y, c.z + R.z * o, 0.2 * wide, sq, lit ? 1 - share * 0.7 : 0.3, lit ? 0.3 + share * 0.7 : 0.3, lit ? 0.3 : 0.35, lit ? 0.95 : 0.35);
        }
      }
      // Let go on a knockout and walking home: a faint marker and its sigil, grey and flickering.
      if (c.wanderTo) {
        const col = neon(c.species), fl = 0.25 + 0.15 * Math.sin(time * 5 + c.id);
        this.standing.add(c.x, (this.tops.get(c.id) ?? 1.4 + c.level * 0.6) + 0.6 + Math.sin(time * 2 + c.id) * 0.1, c.z, 1.1, this.uv(this.slotOf(c.species, c.level)), col.r * 0.6 + 0.3, col.g * 0.6 + 0.3, col.b * 0.6 + 0.3, fl);
        for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2 + time; if (i % 2) this.flat.add(c.x + Math.cos(a) * 1.4, 0, c.z + Math.sin(a) * 1.1, 0.25, dot, 0.8, 0.8, 0.9, 0.35); }
      }
    }
    // Soundsystems under siege: a long bar over each, when hurt.
    for (const [, h] of g.combat.sounds) {
      if (h.hp >= h.max || h.hp <= 0 || !close(h.x, h.z, 200)) continue;
      const share = h.hp / h.max, R = SPRITE_UNIFORMS.uRight.value, n = 20, y = h.radius > 5 ? 9 : 7;
      for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * 0.35, lit = (i + 0.5) / n <= share; this.over.add(h.x + R.x * o, y, h.z + R.z * o, 0.32, sq, lit ? 1 : 0.3, lit ? 0.35 + 0.5 * share : 0.3, lit ? 0.55 : 0.35, lit ? 1 : 0.35); }
    }
    // Knocked out: dizzy stars over her while she's down.
    if (W.ko && time < W.ko.teleportAt) for (let i = 0; i < 5; i++) { const a = time * 3 + (i / 5) * Math.PI * 2; this.standing.add(w.x + Math.cos(a) * 0.7, 1.6 + Math.sin(a * 2) * 0.1, w.z + Math.sin(a) * 0.5, 0.25, dot, 1, 0.95, 0.5, 0.9); }
    this.drawPips(time, camera, width, height);
  }

  /** Her hits, as pips under her feet, only once she's been hit: the next to come back fills as it repairs. */
  private drawPips(time: number, camera: THREE.Camera, width: number, height: number): void {
    const g = this.game, W = g.witches[0], H = W.health, max = g.tuning.witchHealth.hits;
    if (!this.pips) {
      this.pips = document.createElement("div");
      Object.assign(this.pips.style, { position: "fixed", transform: "translate(-50%, 8px)", display: "none", gap: "3px", pointerEvents: "none", zIndex: "2" });
      document.body.append(this.pips);
    }
    const el = this.pips;
    if (H.hp >= max || W.ko) { el.style.display = "none"; return; }
    el.style.display = "flex";
    while (el.children.length < max) { const p = document.createElement("div"); Object.assign(p.style, { width: "10px", height: "10px", border: "1px solid rgba(255,140,170,.9)", borderRadius: "50%", overflow: "hidden", position: "relative", background: "rgba(14,11,28,.6)" }); p.innerHTML = '<div style="position:absolute;left:0;right:0;bottom:0;background:#ff5d8f"></div>'; el.append(p); }
    const fill = H.repairAt === Infinity ? 0 : 1 - Math.max(0, H.repairAt - time) / g.tuning.witchHealth.repairTime;
    [...el.children].forEach((p, i) => { (p.firstChild as HTMLElement).style.height = `${i < H.hp ? 100 : i === H.hp ? fill * 100 : 0}%`; (p as HTMLElement).style.opacity = i === H.hp ? "0.85" : "1"; });
    const w = g.witch;
    placed(this.v.set(w.x, 0, w.z)).project(camera); // under her feet (the stack is over her hat)
    el.style.left = `${((this.v.x + 1) / 2) * width}px`;
    el.style.top = `${((1 - this.v.y) / 2) * height}px`;
  }

  private uv(slot: number, span = 1): number[] {
    const N = SLOT * SLOTS, x = (slot % SLOTS) * SLOT, y = Math.floor(slot / SLOTS) * SLOT;
    // u0, v0 (top), u1, v1 (bottom); the canvas texture is flipped in v.
    return [x / N, 1 - y / N, (x + SLOT * span) / N, 1 - (y + SLOT * span) / N];
  }

  /** A creature's sigil in the stack and on the ground: a legend's is its legendary sigil (Ed, 2026-10-06: "huge, twice as
   *  wide and more detailed", a magic circle with the animal in the centre), LEGEND_SCALE times a legend's (`scale`). */
  private sigilOf(c: Creature): { uv: number[]; scale: number } {
    if (legendarySigil(c)) return { uv: this.uv(this.slotOf(c.species, LEGEND_LEVEL, true), 2), scale: LEGEND_SCALE };
    return { uv: this.uv(this.slotOf(c.species, c.level)), scale: 1 };
  }

  /** hatTop: the height of the tip of her hat this frame (the stack floats above it). */
  update(time: number, camera: THREE.Camera, width: number, height: number, hatTop: number): void {
    const g = this.game, s = g.leash, t = g.tuning, w = g.witch, B = t.bond, L = t.leash, dot = this.uv(0);
    this.standing.begin(); this.flat.begin(); this.over.begin(); this.solid.begin();
    this.drawBerries(time);
    this.drawBosses(time);
    this.drawLetters(time);
    this.drawCombat(time, camera, width, height, hatTop);
    for (const e of g.leashEvents) { // (the whole frame's, not only its last step's)
      if (e.kind === "fizzled") this.fizzles.push({ x: e.x, z: e.z, at: time });
      if (e.kind === "invited" || e.kind === "befriended") {
        // its own colour for the burst: its sigil's neon, calmed toward the night (as the HUD's, #188)
        const sc = sigilColour(g.creatures[e.id]?.species ?? "fox"), m = (sc[0] + sc[1] + sc[2]) / 3;
        this.bursts.push({ x: e.x, z: e.z, at: time, seed: e.id, rgb: sc.map((v: number) => (v * 0.6 + m * 0.4) / 255) });
        this.joined.set(e.id, time);
      }
      // Sigils in the night palette (the coordinator's brief): put down, a rune written in with an amber ring opening on the
      // ground and motes of its creature's neon rising; picked up, its motes rising back to her; cycled (E in the treetops),
      // the new bottom sigil of the stack flares (drawn with the stack).
      const sc = (e.kind === "placed" || e.kind === "picked") && e.id !== undefined ? g.creatures[e.id] : undefined;
      if (sc) {
        const col = (this.slotOf(sc.species, sc.level), this.colours.get(sc.species)!), R = 3 + sc.level * 0.8;
        if (e.kind === "placed") this.fx.push({ kind: "ring", x: e.x, y: 0, z: e.z, at: time, life: 0.6, r: 0.62, g: 0.4, b: 0.2, seed: 0, size: R * 0.8, n: 20, dot: 0.8 }); // (a deep amber: its dots overlap and add up, and it mustn't reach white)
        this.fx.push({ kind: "motes", x: e.x, y: 0.2, z: e.z, at: time, life: e.kind === "placed" ? 0.9 : 0.7, r: col.r, g: col.g, b: col.b, seed: e.at * 53 + e.id!, size: e.kind === "placed" ? R * 0.35 : R * 0.25, tx: e.kind === "placed" ? 3 : 4.5 });
      }
      if (e.kind === "cycled" && e.id !== undefined) this.cycledAt.set(e.id, time);
    }
    this.fizzles = this.fizzles.filter(f => time - f.at < 0.7);
    this.bursts = this.bursts.filter(b => time - b.at < 1.1);
    for (const [id, at] of this.joined) if (time - at > 1) this.joined.delete(id);
    // Joining the party (an invite, or made happy): a short burst in the night's party palette (the art director's: the
    // lanterns' amber and the creature's own neon): confetti thrown up and falling, a few sparkles drifting up.
    // (Thrown from just in front of it, toward the camera, so its own body doesn't hide the burst.)
    for (const b of this.bursts) {
      const k = (time - b.at) / 1.1;
      for (let i = 0; i < 28; i++) {
        const a = hash2(b.seed, i, 3) * Math.PI * 2, sp = 2 + hash2(b.seed, i, 5) * 2.4, up = 2.2 + hash2(b.seed, i, 7) * 2.6;
        const c = i % 3 === 2 ? b.rgb : JOIN_PALETTE[i % 3], spark = i % 5 === 0;
        const y = spark ? 0.9 + k * 2.6 : 0.7 + up * k - 4 * k * k, r = spark ? sp * 0.3 : sp;
        this.standing.add(b.x + Math.cos(a) * r * k, y, b.z + 1.2 + Math.sin(a) * r * k * 0.7, spark ? 0.5 : 0.62, dot, c[0], c[1], c[2], 0.85 * (spark ? 1 - k * k : Math.min(1, 1.6 * (1 - k)))); // (under 1: overlapping, they add up toward amber, not white)
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
    const LV = this.load, LT = t.load ?? LOAD_DEFAULT;
    this.lastTime = time;
    while (this.chain.length < s.stack.length) this.chain.push({ x: 0, z: 0, vx: 0, vz: 0 });
    let below = { x: 0, z: 0 }, y = hatTop;
    for (const id of [...this.stackY.keys()]) if (!s.stack.includes(id)) this.stackY.delete(id);
    for (let k = s.stack.length - 1; k >= 0; k--) {
      const id = s.stack[k], c = g.creatures[id], j = s.stack.length - 1 - k, link = this.chain[j]; // j: 0 at the bottom
      const sg = this.sigilOf(c), size = (2 + c.level * 0.4) * S.scale * sg.scale;
      const idle = Math.sin(time * 1.7 + j * 0.9) * S.idleSway * (1 + j * 0.5) * (1 - 0.6 * LV.load);
      // (under a load it leans toward the pull, each sigil a little further: render/load.ts)
      const lean = LT.stackLean * LV.load;
      const tx = below.x - w.vx * S.trail + idle + LV.dx * lean, tz = below.z - w.vz * S.trail + LV.dz * lean;
      link.vx += ((tx - link.x) * S.stiffness - link.vx * S.damping) * dt; link.vz += ((tz - link.z) * S.stiffness - link.vz * S.damping) * dt;
      link.x += link.vx * dt; link.z += link.vz * dt;
      below = link;
      y += ((j === 0 ? S.offset * size : S.gap * size) + size / 2) * (1 - LT.stackSag * LV.load); // (and sags, its gaps closing)
      // Each sigil eases to its height in the stack, so when the cycle button sends the bottom one
      // to the top (Ed, 2026-10-04) it rises past the others and they settle down a place.
      const rel = y - hatTop, had = this.stackY.get(id), sy = had === undefined ? rel : had + (rel - had) * (1 - Math.exp(-dt * 9));
      this.stackY.set(id, sy);
      const pos = new THREE.Vector3(w.x + link.x, hatTop + sy, w.z + link.z);
      y += size / 2;
      slotPos.set(id, pos);
      const col = (this.slotOf(c.species, c.level), this.colours.get(c.species)!);
      // Down to her last hit, the leash frays: the stack flickers (Ed, 2026-10-04).
      const fray = g.witches[0].health.hp === 1 && !g.witches[0].ko ? (Math.sin(time * 23 + j * 3.1) > 0.2 ? 1 : 0.25) : 1;
      this.standing.add(pos.x, pos.y, pos.z, size, sg.uv, col.r, col.g, col.b, fray);
      const cyc = this.cycledAt.get(id);
      if (cyc !== undefined) {
        const k = (time - cyc) / 0.45;
        if (k >= 1 || k < 0) this.cycledAt.delete(id);
        else this.standing.add(pos.x, pos.y, pos.z, size * (2 + k * 1.6), dot, col.r, col.g, col.b, 0.75 * (1 - k)); // (its flare: a halo of its neon, opening and fading)
      }
    }
    this.lastSlots = slotPos;

    // Placed sigils, written on the ground, a little brighter than they were so they read in the
    // grass (Ed, v233; the grass is trampled clear round them, grass.ts).
    for (const p of s.placed) {
      const c = g.creatures[p.id], sg = this.sigilOf(c), col = this.colours.get(c.species)!;
      const pulse = 1.05 + 0.25 * Math.sin(time * 2 + p.id);
      this.flat.add(p.x, 0.02, p.z, (3 + c.level * 0.8) * sg.scale, sg.uv, col.r * pulse, col.g * pulse, col.b * pulse, 1, Math.min(1, (time - p.at) / 0.8));
      this.flat.add(p.x, 0.01, p.z, 5.5, dot, col.r, col.g, col.b, 0.38);
    }

    // Happy creatures' runes (Ed, 2026-10-06; states.leash "pickup"): each carries its sigil as a dim rune at its feet,
    // moving with it; it pops out with its hearts (up off it and down, growing, written in) and settles. Ready to pick up
    // (pickupDelay after), a little brighter. Only near her (RUNE_VIEW m), with the placed sigils' instances.
    for (const c of g.creatures) {
      if (Math.abs(c.x - w.x) > RUNE_VIEW || Math.abs(c.z - w.z) > RUNE_VIEW || !hasRune(c)) continue;
      const since = time - (c.happyAt ?? -Infinity), k = Math.min(1, Math.max(0, since / 0.45)), ready = hasRune(c, time);
      const slot = this.slotOf(c.species, c.level), col = this.colours.get(c.species)!, hop = since < 0.45 ? Math.sin(k * Math.PI) * 1.4 : 0, grow = k < 1 ? 0.4 + 0.75 * k - 0.15 * Math.sin(k * Math.PI) : 1;
      const a = ready ? 0.62 + 0.12 * Math.sin(time * 2 + c.id) : 0.3;
      this.flat.add(c.x, 0.03 + hop, c.z, (3 + c.level * 0.8) * 0.85 * grow, this.uv(slot), col.r * 0.8, col.g * 0.8, col.b * 0.8, a, k);
      if (ready) this.flat.add(c.x, 0.015, c.z, 4.2, dot, col.r, col.g, col.b, 0.18);
    }

    // The party legend (Ed's Easter egg, rules/partyLegend.ts): a giant party hat on its head, striped in party neons, a
    // pom-pom on top, bobbing on the beat. Pinned to one (she can't go past its reach), its leash goes ruler-straight and
    // bright, and hitting the edge gives a comic boing (a ring bouncing out round her).
    for (const c of g.creatures) {
      if (!c.partyLegend || c.gone || Math.abs(c.x - w.x) > RUNE_VIEW * 2 || Math.abs(c.z - w.z) > RUNE_VIEW * 2) continue;
      const top = this.tops.get(c.id) ?? 9, H = top * 0.5, R0 = top * 0.2, bob = 0.12 * top * Math.max(0, Math.sin(time * Math.PI * 2 * (t.beat.bpm / 60) * 0.5));
      for (let i = 0; i < 12; i++) {
        const k = i / 12, y = top * 0.92 + bob + k * H, r = R0 * (1 - k), col = PARTY_HAT[Math.floor(i / 2) % PARTY_HAT.length], n = Math.max(1, Math.round((r * 2) / 0.45));
        for (let j = 0; j < n; j++) this.standing.add(c.x - r + (n > 1 ? (j / (n - 1)) * 2 * r : r), y, c.z + 0.3, 0.6, dot, col[0], col[1], col[2], 1);
      }
      this.standing.add(c.x, top * 0.92 + bob + H + 0.35, c.z + 0.3, 1.3, dot, 1, 0.92, 0.62, 1);
    }
    const pin = g.witches[0].pinned;
    if (pin) {
      // (drawn a metre toward the camera, so the legend's own great sprite doesn't hide it)
      const col = null as { r: number; g: number; b: number } | null, from = { x: w.x, y: Math.max(0.6, hatTop * 0.5), z: w.z + 1 }, to = { x: pin.x, y: 1.2, z: pin.z + 1 };
      const d = Math.hypot(to.x - from.x, to.z - from.z), n = Math.max(8, Math.round(d / 0.35)), flash = 0.8 + 0.2 * Math.sin(time * 18);
      for (let i = 0; i <= n; i++) { const k = i / n; this.standing.add(from.x + (to.x - from.x) * k, from.y + (to.y - from.y) * k, from.z + (to.z - from.z) * k, 0.7, dot, col ? col.r : 1, col ? col.g : 0.82, col ? col.b : 0.45, flash); } // (the lanterns' amber, bright: ruler-straight and taut)
      if (pin.since !== this.boingAt) { this.boingAt = pin.since; this.fx.push({ kind: "ring", x: w.x, y: 0, z: w.z, at: time, life: 0.45, r: AMBER[0], g: AMBER[1], b: AMBER[2], seed: 0, size: 2.2, n: 16, dot: 0.5 }); }
    }

    // From the treetops, each placed sigil is projected up above the canopy over its spot, flat
    // and glowing, joined to its rune by a faint pulsing column of light (Ed, 2026-10-03). It
    // fades in as she rises; on the ground the real rune is enough.
    const P = t.sigilProjection, up = w.lift * w.lift * (3 - 2 * w.lift);
    if (up > 0.01) for (const p of s.placed) {
      const c = g.creatures[p.id], col = this.colours.get(c.species)!, top = t.treetopHeight - 4 + P.height;
      const pulse = 0.85 + 0.15 * Math.sin(time * 1.3 + p.id);
      const sg = this.sigilOf(c);
      this.flat.add(p.x, top, p.z, (3 + c.level * 0.8) * P.size * sg.scale, sg.uv, col.r, col.g, col.b, P.opacity * up * pulse);
      for (let y = 1; y < top; y += 1.5) this.standing.add(p.x, y, p.z, 0.3, dot, col.r, col.g, col.b, P.beam * up * pulse * (0.6 + 0.4 * Math.sin(y * 0.8 - time * 3)));
    }
    // And over every leashed or happy creature near her, its own sigil at the same height, moving with it (Ed's playtest,
    // 2026-10-06: "I should be able to see sigils of leashed creatures and happy creatures from treetop mode"): smaller and
    // without a beam, the nearest few only, fading out toward the edge of their range; a happy one's dimmer, as on the ground.
    if (up > 0.01) {
      const C = P.creatures, near = this.projected; near.length = 0;
      for (const c of g.creatures) {
        if (c.gone || !(c.leashed || hasRune(c)) || s.stack.includes(c.id) || s.placed.some(p => p.id === c.id && Math.hypot(p.x - c.x, p.z - c.z) < 6)) continue;
        const d = Math.hypot(c.x - w.x, c.z - w.z);
        if (d <= C.range) near.push({ c, d });
      }
      near.sort((a, b) => a.d - b.d);
      const top = t.treetopHeight - 4 + P.height;
      for (let i = 0; i < Math.min(near.length, C.max); i++) {
        const { c, d } = near[i], col = this.colours.get(c.species) ?? (this.slotOf(c.species, 0), this.colours.get(c.species)!), sg = this.sigilOf(c);
        const edge = Math.min(1, Math.max(0, (C.range - d) / (C.range * C.fade))), a = C.opacity * up * edge * (c.leashed ? 1 : C.happy) * (0.88 + 0.12 * Math.sin(time * 1.3 + c.id));
        if (a > 0.01) this.flat.add(c.x, top + 0.2 * Math.sin(time * 0.9 + c.id), c.z, (3 + c.level * 0.8) * C.size * sg.scale, sg.uv, col.r, col.g, col.b, a);
      }
    }

    // The ghost: where the bottom sigil would land, red where it can't.
    if (w.mode === "ground" && s.stack.length && !s.placed.some(p => Math.hypot(p.x - w.x, p.z - w.z) <= L.pickRadius) && !runeNear(g.creatures, w.x, w.z, L.runeRadius, time) && !g.relics.some(r => r.state === "lying" && Math.hypot(r.sx - w.x, r.sz - w.z) <= L.runeRadius)) { // (on a relic's sigil the button picks the relic up)
      const c = g.creatures[s.stack[s.stack.length - 1]], col = this.colours.get(c.species)!;
      const no = blocked(s, w.x, w.z, t);
      const sg = this.sigilOf(c);
      this.flat.add(w.x, 0, w.z, (3 + c.level * 0.8) * sg.scale, sg.uv, no ? 0.85 : col.r, no ? 0.38 : col.g, no ? 0.43 : col.b, 0.22); // (can't: the HUD's loss red, #188)
    }
    for (const f of this.fizzles) {
      const k = 1 - (time - f.at) / 0.7;
      this.flat.add(f.x, 0, f.z, 3 * (1 + (1 - k) * 0.6), dot, 0.85, 0.38, 0.43, k); // (the HUD's loss red, #188)
    }

    // Relics (#87; placeholder till the art builder's party relics are drawn): a gold mound where
    // one lies, and its glint, only through a gap in the canopy from the treetops (Ed, 2026-10-05:
    // "a rare find"), drawn among the scenery, never over the canopy; no markers. A gold glint
    // over her hat for each she carries.
    const aloft = w.lift > 0.5;
    for (const r of g.relics) {
      if (r.state !== "lying" || Math.abs(r.x - w.x) > 400 || Math.abs(r.z - w.z) > 400) continue;
      // Its relic sigil on the ground south of it, written like any placed sigil (Ed, 2026-10-06:
      // stand on it and press the sigil button to pick the relic up), gold.
      {
        const col = (this.slotOf("relic", 0), this.colours.get("relic")!), pulse = 1.05 + 0.25 * Math.sin(time * 2 + r.id);
        this.flat.add(r.sx, 0.02, r.sz, 3.4, this.uv(this.slotOf("relic", 0)), col.r * pulse, col.g * pulse, col.b * pulse, 1);
        this.flat.add(r.sx, 0.01, r.sz, 5.5, dot, col.r, col.g, col.b, 0.38);
      }
      if (!relicGlints(g.forest, g.map, r, aloft)) continue; // (under closed canopy, seen from above: nothing at all)
      for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; this.standing.add(r.x + Math.cos(a) * 2.5, 0.4 + (i % 3) * 0.5, r.z + Math.sin(a) * 1.8, 1.2, dot, 1, 0.78, 0.3, 0.8); }
      const tw = Math.max(0, Math.sin(time * 2.5 + r.id * 1.7)) ** 6;
      this.standing.add(r.x, 3.5, r.z, 2 + tw * 4, dot, 1, 0.95, 0.7, 0.4 + 0.6 * tw);
    }
    s.relics.forEach((id, i) => { const tw = 0.6 + 0.4 * Math.sin(time * 4 + id); this.over.add(w.x + (i - (s.relics.length - 1) / 2) * 0.6, hatTop + 2.2, w.z, 0.5, dot, 1, 0.85, 0.4, tw); });

    // The ruts of legends' long charges, fading.
    for (const [id, ruts] of this.ruts) {
      while (ruts.length && time - ruts[0].at > RUTS) ruts.shift();
      if (!ruts.length) { this.ruts.delete(id); continue; }
      for (const p of ruts) { const k = 1 - (time - p.at) / RUTS; this.flat.add(p.x, 0, p.z, 2.2, dot, 0.3, 0.22, 0.15, 0.55 * k); }
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
      // Travelling (rules/travel.ts; Ed, 2026-10-05: "the 'leash' graphic could become their travel
      // path"): the leash runs along its route to her or its sigil, a dotted line on the ground
      // flowing that way, shortening as it walks; joining her posse again, a pop and back to the thread.
      const was = this.travelling.get(id) ?? false;
      if (was && !c.travelling) { this.fx.push({ kind: "ring", x: c.x, y: 0, z: c.z, at: time, life: 0.5, r: col.r, g: col.g, b: col.b, seed: 0, size: 2.4, n: 18, dot: 0.6 }); this.fx.push({ kind: "spark", x: c.x, y: 1, z: c.z, at: time, life: 0.5, r: col.r, g: col.g, b: col.b, seed: id * 7 + time, size: 2 }); }
      this.travelling.set(id, !!c.travelling);
      if (c.travelling && c.route) {
        // (bigger from the treetops, where the camera is far off and the routes run far)
        const up = w.mode === "treetop", rd = up ? 1.8 : 0.45, gap = up ? 5 : 2.2, hi = up ? 0.35 : 0; // (and lighter, to show over dark crowns)
        const R = c.route, way = [{ x: c.x, z: c.z }, ...R.points.slice(Math.min(R.next, R.points.length - 1), -1), { x: lp.x, z: lp.z }], flow = (time * 3) % gap;
        let carry = gap - flow;
        for (let i = 1; i < way.length; i++) {
          const a = way[i - 1], b = way[i], seg = Math.hypot(b.x - a.x, b.z - a.z);
          let u = carry;
          for (; u < seg; u += gap) { const k = u / seg; const px = a.x + (b.x - a.x) * k, pz = a.z + (b.z - a.z) * k; this.flat.add(px, 0, pz, rd, dot, col.r, col.g, col.b, 0.85); if (up) this.over.add(px, 0.3, pz, rd * 0.8, dot, col.r + (1 - col.r) * hi, col.g + (1 - col.g) * hi, col.b + (1 - col.b) * hi, 0.9); } // (from the treetops it shows through the crowns, as the ley lines do)
          carry = u - seg; // (the spacing carries on round the corner)
        }
        continue;
      }
      const d = Math.hypot(c.x - lp.x, c.z - lp.z);
      // (under a load, carried leashes show sooner, taut and brighter: render/load.ts)
      const ld = s.stack.includes(id) ? this.load.load : 0, LT2 = t.load ?? LOAD_DEFAULT, from0 = 0.85 - (0.85 - LT2.threadFrom) * ld;
      if (B.thread && d > L.length * from0) {
        const strain = Math.min(1, (d - L.length * from0) / L.length + ld * 0.5), n = Math.min(60, Math.floor(d / 1.2)), lit = 1 + LT2.threadBright * ld;
        // An upward bow (Ed: "arc upwards a little"), high while it's slack and flattening to a near-straight line as it
        // goes taut (Ed, 2026-10-06: "The curve on slack leashes should be higher than it is now"), and the dots march from
        // the creature to the leash point.
        const arc = Math.min(B.threadArcMax, d * (B.threadArcTaut + (B.threadArcSlack - B.threadArcTaut) * (1 - strain)));
        for (let i = 1; i < n; i++) {
          const k = (i + 1 - (time * 2) % 1) / n;
          if (k >= 1) continue;
          this.standing.add(from.x + (c.x - from.x) * k, from.y + (0.5 - from.y) * k + Math.sin(k * Math.PI) * arc, from.z + (c.z - from.z) * k, 0.22 * (1 + 0.6 * ld), dot, Math.min(1, col.r * lit), Math.min(1, col.g * lit), Math.min(1, col.b * lit), Math.min(1, 0.25 + 0.75 * strain));
        }
      }
    }
    this.drawStrain(time, dot);
    this.standing.end(); this.flat.end(); this.over.end(); this.solid.end();
    this.bubbles(time, camera, width, height);
    this.drawDreams(camera, width, height);
    this.drawSnores(camera, width, height);
    this.drawCirclePanel(camera, width, height);
  }

  /** Her broom straining under a load (render/load.ts): sparks splaying back from its bristles, more the heavier; and over
   *  the treetops, sinking, a few sparks falling away below her. Each a fixed loop by its index, so nothing is made per frame. */
  private drawStrain(time: number, dot: number[]): void {
    const LV = this.load, LT = this.game.tuning.load ?? LOAD_DEFAULT, b = this.bristle, w = this.game.witch;
    if (!b.on || LV.load <= 0.02) return;
    const sp = Math.hypot(w.vx, w.vz), bx = sp > 0.3 ? -w.vx / sp : -LV.dx, bz = sp > 0.3 ? -w.vz / sp : -LV.dz;
    const n = Math.min(24, Math.round(LT.sparks * LV.load));
    for (let i = 0; i < n; i++) {
      const life = 0.35 + 0.25 * hash2(i, 1, 41), k = ((time / life) + hash2(i, 2, 41)) % 1, side = (hash2(i, 3, 41) - 0.5) * 2;
      const r = 0.25 + k * (0.9 + 0.6 * LV.load), fan = side * (0.5 + 0.7 * LV.load);
      this.standing.add(b.x + (bx - bz * fan) * r, b.y - 0.1 + side * 0.15 * k - 0.4 * k * k, b.z + (bz + bx * fan) * r, 0.16, dot, 1, 0.78, 0.42, (1 - k) * 0.9);
    }
    if (LV.sinking > 0.02) {
      const m = Math.round(10 * LV.sinking);
      for (let i = 0; i < m; i++) {
        const k = ((time / 1.3) + hash2(i, 5, 43)) % 1, a = hash2(i, 6, 43) * Math.PI * 2, r = 0.4 + 0.8 * hash2(i, 7, 43);
        this.over.add(w.x + Math.cos(a) * r, b.y - 0.3 - k * 3.5, w.z + Math.sin(a) * r, 0.22, dot, 1, 0.85, 0.55, (1 - k) * LV.sinking);
      }
    }
  }

  /** The legend circle's explainer (Ed, 2026-10-06: "when you go into a legend circle, text appears on the screen to the side of
   *  the circle explaining mechanics to do with legends"; rules/legendCircle.ts): a soft dark panel beside the clearing she stands
   *  in (on the ground), on its right on screen, or its left if that would run off; fading in and out (circleShown). Its icons:
   *  the sigil the legend dreams of, at its level, and a relic sigil in gold. */
  private circlePanel: HTMLElement | null = null;
  private circleFade = 0;
  private circleAt = 0;
  private circleLast: { legend: Creature; x: number; z: number; r: number } | null = null;
  private drawCirclePanel(camera: THREE.Camera, width: number, height: number): void {
    const host = this.bubbleWitch?.parentElement, g = this.game;
    if (!host) return;
    const now = performance.now() / 1000, dt = this.circleAt ? Math.min(0.1, now - this.circleAt) : 0;
    this.circleAt = now;
    const near = legendCircleNear(g, g.witch.lift > 0.5 ? { ...g.witch, mode: "treetop" } : g.witch);
    if (near) this.circleLast = near;
    this.circleFade = circleShown(this.circleFade, !!near, dt);
    let el = this.circlePanel;
    if (!this.circleFade || !this.circleLast) { if (el) el.style.display = "none"; return; }
    if (!el) { el = document.createElement("div"); el.className = "legend-panel"; host.append(el); this.circlePanel = el; }
    const { legend: c, x, z, r } = this.circleLast, lines = circleLines(c);
    const key = `${c.id}:${c.legendState}:${c.quest?.done !== undefined}:${c.quest?.species}:${c.quest?.level}`;
    if (el.dataset.k !== key) {
      el.dataset.k = key;
      el.dataset.state = c.legendState ?? "asleep";
      const icon = (id: string, level: number | null, colour: number[]) => {
        const cv = document.createElement("canvas"), n = 40;
        cv.width = cv.height = n; cv.className = "icon";
        const x2 = cv.getContext("2d");
        if (x2) drawSigil(x2, id, { x: 1, y: 1, size: n - 2, level: level as unknown as null, colour, glow: false });
        return cv;
      };
      el.replaceChildren(...lines.map(l => {
        const p = document.createElement("p");
        if (l.done) p.className = "done";
        l.text.split(/(\{sigil\}|\{relic\}|\{boon\})/).forEach(part => {
          if (part === "{sigil}" && c.quest) p.append(icon(c.quest.species, c.quest.level, sigilColour(c.quest.species)));
          else if (part === "{boon}") p.append(icon(c.species, null, sigilColour(c.species))); // (its own sigil: the buff's icon in the HUD)
          else if (part === "{relic}") p.append(icon("relic", null, [255, 205, 90]));
          else if (part) p.append(document.createTextNode(part));
        });
        if (l.done) p.prepend(document.createTextNode("✓ "));
        return p;
      }));
    }
    // beside the circle on screen: its middle and its edge (at about head height), the panel off its right side, or its left
    placed(this.v.set(x, 1.5, z)).project(camera);
    const cx = ((this.v.x + 1) / 2) * width, cy = ((1 - this.v.y) / 2) * height, behind = this.v.z > 1;
    placed(this.v.set(x + r, 1.5, z)).project(camera);
    const rx = Math.abs(((this.v.x + 1) / 2) * width - cx);
    el.style.display = behind ? "none" : "";
    const w = el.offsetWidth, h = el.offsetHeight, gap = 16;
    let left = cx + rx + gap;
    if (left + w > width - 8) left = cx - rx - gap - w; // (off the right edge: the other side)
    if (left < 8) left = width - w - 24; // (the circle wider than the screen: by its right edge)
    left = Math.max(8, Math.min(width - w - 8, left));
    const top = Math.max(56, Math.min(height - h - 70, Math.max(height * .3, Math.min(height * .6, cy)) - h / 2)); // (about level with the circle's middle, clear of the clock and the action bar)
    el.style.left = `${Math.round(left)}px`; el.style.top = `${Math.round(top)}px`;
    el.style.opacity = this.circleFade.toFixed(2);
  }

  /** Show an emoji in a bubble as a pixel sprite: drawn small (bubbles.emojiPixels across), its
   *  edges made hard (no half-see-through pixels), and scaled up by the game's pixel size. */
  private emoji(el: HTMLElement, e: string): void {
    if (el.dataset.e === e) return;
    el.dataset.e = e;
    el.replaceChildren(this.pixelEmoji(e));
  }
  /** An emoji as a pixel sprite, sized with its bubble (its --px: bubblePx). */
  private pixelEmoji(e: string, k = 1, n = this.game.tuning.bubbles.emojiPixels): HTMLCanvasElement {
    const B = this.game.tuning.bubbles, size = (B.emojiPixels * this.game.tuning.pixelSize * B.scale * k) / BUBBLE_PX;
    const c = document.createElement("canvas");
    c.width = c.height = n;
    c.style.width = c.style.height = `calc(var(--px) * ${size})`;
    const x = c.getContext("2d");
    if (x) {
      x.font = `${n - 1}px sans-serif`; x.textAlign = "center"; x.textBaseline = "middle";
      x.fillText(e, n / 2, n / 2 + 0.5);
      const d = x.getImageData(0, 0, n, n);
      for (let i = 3; i < d.data.length; i += 4) d.data[i] = d.data[i] < 110 ? 0 : 255;
      x.putImageData(d, 0, 0);
    }
    return c;
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
      tiltFilter(el, ((1 - this.v.y) / 2) * height);
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
    bc.style.setProperty("--px", `${bubblePx(c.level)}px`);
    place(bw, w.x - 1.2, witchHeight(w, g.tuning) + 2.2, w.z);
    place(bc, c.x, (this.tops.get(c.id) ?? 1.2 + c.level * 0.8) + 0.3, c.z); // over its head, however big it is drawn (#47)
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
/** A legend's neon (0-1): its sigil's colour at full brightness, a little toward white. */
export function legendNeon(species: string): [number, number, number] {
  const c = sigilColour(species) as number[], m = Math.max(1, c[0], c[1], c[2]);
  return [0, 1, 2].map(i => 0.82 * (c[i] / m) + 0.18) as [number, number, number];
}

export const bossBreath = (time: number, id: number, every: number) => 0.5 - 0.5 * Math.cos((time / Math.max(0.1, every) + (id % 7) / 7) * Math.PI * 2);

