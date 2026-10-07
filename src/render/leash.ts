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
import { ROUTE_SAMPLES, type RouteShape } from "./routeEase";
import { moodOf } from "./mood";
import { beatTime } from "../rules/beat";
import * as THREE from "three";
import { drawSigil, sigilColour, LEGEND_SCALE } from "../../art/generator.js";
import { dormant, type Game } from "../rules/game";
import type { Creature } from "../rules/creatures";

import { blocked, talkTime } from "../rules/leash";
import { toEvolve } from "../rules/berries";
import { hash2 } from "../rules/random";
import { hasRune, runeNear } from "../rules/creatureStates";
import { newLoadView, type LoadView } from "./load";
import { relicGlints } from "../rules/legends";
import { SPRITE_UNIFORMS, metresPerArtPixel } from "./sprites";
import { lobHeight } from "./invites";

import { LIGHT_UNIFORMS } from "./lighting";
import { HEIGHT_UNIFORMS } from "./height";
import { AMBER, ROSE, JOIN_PALETTE, PIXEL_DOT_MAX, SLOT, SLOTS, SQ, LEGEND_LEVEL, LEGEND_ROW, Instances, VERT, FRAG, legendarySigil } from "./leash/glyphs";
import { drawCombat } from "./leash/combat";
import { bubbles, drawCirclePanel, drawDreams, drawSnores } from "./leash/bubbles";
import { drawRespawn } from "./leash/respawn";
import { drawBond, drawStack, drawStrain } from "./leash/stack";
import { drawProjection } from "./leash/projection";
export { BUBBLE_PX, bubblePx } from "./leash/bubbles";
export { legendarySigil } from "./leash/glyphs";

/** Seconds a legend's charge ruts take to fade. */
const RUTS = 12;
/** How far from her (m) happy creatures' runes are drawn. */
const RUNE_VIEW = 70;
/** The party legend's giant hat's stripes (the Easter egg): the party neons, in pairs of rows. */
const PARTY_HAT = [[1, 0.35, 0.72], [0.35, 0.95, 1], [1, 0.85, 0.3], [0.7, 0.45, 1]];

export class LeashView {
  /** Her seat behind the decks, as drawn (the view sets it): where she sparkles back in after a knockout. */
  seatAt: { x: number; y: number; z: number } | null = null;
  canvas = document.createElement("canvas");
  tex: THREE.CanvasTexture;
  slots = new Map<string, number>();
  /** The creatures whose sigils are projected over the treetops this frame (kept, not made anew each frame). */
  projected: { c: Creature; d: number }[] = [];
  /** Its records, kept and refilled each frame. */
  projectedPool: { c: Creature; d: number }[] = [];
  nextSlot = 1; // the next free atlas slot
  legendSlots = 0; // legendary blocks taken
  colours = new Map<string, THREE.Color>();
  standing: Instances;
  flat: Instances;
  /** Drawn over everything (no depth test): the berries' glints seen from the treetops. */
  over: Instances;
  /** Not glowing (Ed's art director, #193): an attack's dust and the bits it throws, blended over the ground like the creatures. */
  solid: Instances;
  /** Where charging legends have run (churned ground, fading over RUTS seconds). */
  ruts = new Map<number, { x: number; z: number; at: number }[]>();
  evolved = new Map<number, number>();
  berryRgb: [number, number, number];
  fizzles: { x: number; z: number; at: number }[] = [];
  /** When each sigil came to the bottom of the stack by a cycle (E in the treetops): it flares a moment. */
  cycledAt = new Map<number, number>();
  bursts: { x: number; z: number; at: number; seed: number; rgb: number[] }[] = [];
  /** When each creature joined the party (invited or befriended), for its little hop (render/view/creatures.ts). */
  readonly joined = new Map<number, number>();
  /** Each stacked sigil's eased height above her hat, by creature. */
  stackY = new Map<number, number>();
  chain: { x: number; z: number; vx: number; vz: number }[] = [];
  lastTime = 0;
  /** The load she carries as the art reads it (render/load.ts; the view sets it each frame), and where her broom's bristles are. */
  load: LoadView = newLoadView();
  bristle = { x: 0, y: 0, z: 0, on: false };
  bubbleWitch = document.getElementById("bubble-witch");
  bubbleCreature = document.getElementById("bubble-creature");
  v = new THREE.Vector3();
  /** Where each stacked sigil was last frame (a knockout's release splashes from there). */
  lastSlots = new Map<number, THREE.Vector3>();
  /** Short-lived effects: hit sparks, puffs, splashes, released leashes, teleport sparkles, quake rings. */
  /** Whether each party animal was travelling last frame (to pop as it joins her posse again). */
  travelling = new Map<number, boolean>();
  /** Each traveller's drawn route, eased between the rules' re-plans (render/routeEase.ts). */
  routes = new Map<number, RouteShape>();
  routeScratch = new Float32Array((ROUTE_SAMPLES + 1) * 2);
  fx: { kind: string; x: number; y: number; z: number; at: number; life: number; r: number; g: number; b: number; seed: number; tx?: number; tz?: number; size?: number; /** a ring's dots (else 36) and their size (else 0.7) */ n?: number; dot?: number }[] = [];
  /** The screen shake (a legend's quake): when it started and how hard. */
  shakeAt = -Infinity;
  shakeAmp = 0;
  pips: HTMLElement | null = null;
  /** Each creature's height as drawn (the view sets it), so its health bar sits just over it. */
  readonly tops = new Map<number, number>();
  /** When she last hit a party legend's edge (its boing played). */
  boingAt = -Infinity;

  constructor(scene: THREE.Scene, readonly game: Game) {
    this.canvas.width = this.canvas.height = SLOT * SLOTS;
    const g = this.canvas.getContext("2d", { willReadFrequently: true })!;
    const dot = g.createRadialGradient(SLOT / 2, SLOT / 2, 0, SLOT / 2, SLOT / 2, SLOT / 2);
    dot.addColorStop(0, "rgba(255,255,255,1)"); dot.addColorStop(0.35, "rgba(255,255,255,.55)"); dot.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = dot; g.fillRect(0, 0, SLOT, SLOT);
    // The last slot: a solid square (health bars).
    g.fillStyle = "#ffffff"; g.fillRect((SQ % SLOTS) * SLOT + 4, Math.floor(SQ / SLOTS) * SLOT + 4, SLOT - 8, SLOT - 8);
    this.tex = new THREE.CanvasTexture(this.canvas);
    this.tex.magFilter = THREE.NearestFilter; this.tex.minFilter = THREE.NearestFilter; this.tex.generateMipmaps = false;
    const mat = (flat: number, depthTest = true, solid = false) => new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG,
      uniforms: { ...LIGHT_UNIFORMS, ...HEIGHT_UNIFORMS, uRight: SPRITE_UNIFORMS.uRight, uUp: SPRITE_UNIFORMS.uUp, uRes: SPRITE_UNIFORMS.uRes, uMpp: { value: metresPerArtPixel(game.tuning) }, uDotMax: { value: PIXEL_DOT_MAX }, uFlat: { value: flat }, uGlyphs: { value: this.tex }, uSolid: { value: solid ? 1 : 0 } },
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
  slotOf(species: string, level = 0, legendary = false): number {
    const key = `${species}:${legendary ? "legendary" : level}`;
    let s = this.slots.get(key);
    if (s !== undefined) return s;
    // a legendary one: a block of 2 × 2 slots from LEGEND_ROW down (8 a row pair), its top left slot
    s = legendary ? LEGEND_ROW * SLOTS + Math.floor(this.legendSlots / 8) * 2 * SLOTS + (this.legendSlots++ % 8) * 2 : this.nextSlot++;
    this.slots.set(key, s);
    const g = this.canvas.getContext("2d", { willReadFrequently: true })!, ox = (s % SLOTS) * SLOT, oy = Math.floor(s / SLOTS) * SLOT, W = legendary ? SLOT * 2 : SLOT;
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
  drawBerries(time: number): void {
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
  legendSeen(c: Creature, time: number, k: number): void {
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
  drawBosses(time: number): void {
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
  dreamStones = new Map<number, { to: { x: number; z: number } | null; fx: number; fz: number }>();

  /** Sleeping legends dreaming this frame (the first quest), drawn as thought bubbles by drawDreams. */
  dreams: Creature[] = [];
  dreamEls: HTMLElement[] = [];
  /** Each dream's way (its caption: the arrow and the words), pooled with the bubbles. */
  wayEls: HTMLElement[] = [];
  /** The party's over (render/partyOver.ts; the view sets it each frame): its ease, 0 to 1. */
  partyOverEase = 0;
  /** The sleepers' 😴 bubbles (pooled), and the nearest sleepers this frame (reused). */
  snoreEls: HTMLElement[] = [];
  snoreNear: { c: Creature; d: number }[] = [];

  /** How far to shake the camera now (metres): a legend's quake nearby. */
  shake(time: number): number {
    const k = (time - this.shakeAt) / 0.5;
    return k < 0 || k > 1 ? 0 : this.shakeAmp * (1 - k) * (1 - k);
  }

  /** The newest 💌 event already shown (a frame with no step keeps its step's events: shown once). */
  lettersSeen = -Infinity;
  /** Her 💌s in the night (the coordinator's brief: "the witch's own magic in the night palette"): a faint warm trail
   *  behind each letter in flight, amber and rose, so it reads in the dark; a soft rose puff and a little ring where one
   *  lands on the ground; on a creature, a rose ring at its feet and a few amber sparks (nothing white: white is a hit's). */
  drawLetters(time: number): void {
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

  uv(slot: number, span = 1): number[] {
    const N = SLOT * SLOTS, x = (slot % SLOTS) * SLOT, y = Math.floor(slot / SLOTS) * SLOT;
    // u0, v0 (top), u1, v1 (bottom); the canvas texture is flipped in v.
    return [x / N, 1 - y / N, (x + SLOT * span) / N, 1 - (y + SLOT * span) / N];
  }

  /** A creature's sigil in the stack and on the ground: a legend's is its legendary sigil (Ed, 2026-10-06: "huge, twice as
   *  wide and more detailed", a magic circle with the animal in the centre), LEGEND_SCALE times a legend's (`scale`). */
  sigilOf(c: Creature): { uv: number[]; scale: number } {
    if (legendarySigil(c)) return { uv: this.uv(this.slotOf(c.species, LEGEND_LEVEL, true), 2), scale: LEGEND_SCALE };
    return { uv: this.uv(this.slotOf(c.species, c.level)), scale: 1 };
  }

  /** hatTop: the height of the tip of her hat this frame (the stack floats above it). */
  update(time: number, camera: THREE.Camera, width: number, height: number, hatTop: number): void {
    const g = this.game, s = g.leash, t = g.tuning, w = g.witch, L = t.leash, dot = this.uv(0);
    this.standing.begin(); this.flat.begin(); this.over.begin(); this.solid.begin();
    this.drawBerries(time);
    this.drawBosses(time);
    this.drawLetters(time);
    drawCombat(this, time, camera, width, height, hatTop);
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

    const slotPos = drawStack(this, time, hatTop, dot); // (the stack above her hat: render/leash/stack.ts)

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

    drawProjection(this, time, dot); // (the sigils over the canopy from the treetops: render/leash/projection.ts)

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

    drawBond(this, time, slotPos, dot); // (the bond: render/leash/stack.ts)
    drawStrain(this, time, dot);
    this.standing.end(); this.flat.end(); this.over.end(); this.solid.end();
    bubbles(this, time, camera, width, height);
    drawDreams(this, camera, width, height);
    drawSnores(this, camera, width, height);
    drawCirclePanel(this, camera, width, height);
    drawRespawn(this, camera, width, height); // (the wait behind her decks after a knockout: render/leash/respawn.ts)
  }

  /** The legend circle's explainer (Ed, 2026-10-06: "when you go into a legend circle, text appears on the screen to the side of
   *  the circle explaining mechanics to do with legends"; rules/legendCircle.ts): a soft dark panel beside the clearing she stands
   *  in (on the ground), on its right on screen, or its left if that would run off; fading in and out (circleShown). Its icons:
   *  the sigil the legend dreams of, at its level, and a relic sigil in gold. */
  circlePanel: HTMLElement | null = null;
  /** The countdown at her decks after a knockout (render/leash/respawn.ts). */
  respawnEl: HTMLElement | null = null;
  circleFade = 0;
  circleAt = 0;
  circleLast: { legend: Creature; x: number; z: number; r: number } | null = null;

}

/** A wild legend's slow breath, 0 out to 1 in, once every `every` seconds (offset by its id). */
/** A legend's neon (0-1): its sigil's colour at full brightness, a little toward white. */
export function legendNeon(species: string): [number, number, number] {
  const c = sigilColour(species) as number[], m = Math.max(1, c[0], c[1], c[2]);
  return [0, 1, 2].map(i => 0.82 * (c[i] / m) + 0.18) as [number, number, number];
}

export const bossBreath = (time: number, id: number, every: number) => 0.5 - 0.5 * Math.cos((time / Math.max(0.1, every) + (id % 7) / 7) * Math.PI * 2);

