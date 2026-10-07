// The fight as the leash view draws it (render/leash.ts): attacks' wind-ups, shots, beams and pulses, hits and their bits,
// trait marks, health bars, the knockout's release and the quake's shake.
import * as THREE from "three";
import { speciesColours, defaultStyle, M } from "../../../art/generator.js";
import { attackNamed, attackOf, creatureMaxHp, traitsOf, type Trait } from "../../rules/combat";
import { hash2 } from "../../rules/random";
import { FIGHT, profileOf } from "../../rules/movement";
import { bodyRadius } from "../../rules/spacing";
import { huntsWitch } from "../../rules/creatureStates";
import { LEGENDS } from "../../rules/legends";
import { SPRITE_UNIFORMS } from "../sprites";
import { SQ } from "./glyphs";
import type { LeashView } from "../leash";
import { drawPips } from "./bubbles";

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

/** Combat (rules/combat.ts) and knockouts (rules/knockout.ts): shots and their telegraphs, hits,
 *  health bars (only when hurt), puffs as beaten creatures flee, the knockout's splashing sigils
 *  and teleport, the marker on creatures walking home, and the witch's hit pips. */
export function drawCombat(lv: LeashView, time: number, camera: THREE.Camera, width: number, height: number, hatTop: number): void {
  const g = lv.game, w = g.witch, W = g.witches[0], dot = lv.uv(0), sq = lv.uv(SQ), near = 90, t = g.tuning;
  const artPx = 1 / (t.artPixelsPerMetre * (2 / t.pixelSize)); // one art pixel, in metres (the pixel star and bits sit on it)
  const close = (x: number, z: number, r = near) => Math.abs(x - w.x) < r && Math.abs(z - w.z) < r;
  // A legend's long-range attack (rules/combat.ts stepLegendAttack: it reaches legends.json attack.range, 420 m) is drawn as
  // far as the legend itself shows (Ed, 2026-10-06: "I see an angry legend probably doing an attack animation but I don't
  // see it firing anything": its wind-up pose showed from the treetops, its telegraph, lob and beam were culled at 90 to
  // 150 m), and bigger from up there, where the camera is far off.
  const up = w.lift > 0.5, far = up ? t.haze.far + 60 : 150, big = up ? 2.6 : 1.2;
  // (on the ground, and from the treetops through the crowns too, as the ley lines and leash routes do)
  const mark = (x: number, z: number, size: number, r: number, gg: number, b: number, a: number) => { lv.flat.add(x, 0, z, size, dot, r, gg, b, a); if (up) lv.over.add(x, 0.3, z, size * 0.8, dot, r, gg, b, Math.min(1, a * 1.1)); };
  const neon = (sp: string) => lv.colours.get(sp) ?? (lv.slotOf(sp, 0), lv.colours.get(sp)!);
  // New happenings become effects.
  for (const e of g.combat.events) {
    const c = e.id !== undefined ? g.creatures[e.id] : null;
    if (e.kind === "hit" && close(e.x, e.z)) {
      // Counters (Stage 5): strong against its traits, a big gold burst and "!!"; resisted, a small grey tink.
      if (e.counter === 1) { const top = (c && lv.tops.get(c.id)) ?? 1.8; lv.fx.push({ kind: "spark", x: e.x, y: 1, z: e.z, at: time, life: 0.5, r: 1, g: 0.8, b: 0.2, seed: e.at * 97 + (e.id ?? 0), size: 1.8 }); lv.fx.push({ kind: "bang", x: e.x, y: top + 0.4, z: e.z, at: time, life: 0.8, r: 1, g: 0.85, b: 0.25, seed: 0 }); }
      else if (e.counter === -1) lv.fx.push({ kind: "tink", x: e.x, y: 1, z: e.z, at: time, life: 0.35, r: 0.7, g: 0.72, b: 0.78, seed: e.at * 97 + (e.id ?? 0), size: 0.7 });
      else lv.fx.push({ kind: "spark", x: e.x, y: 1, z: e.z, at: time, life: 0.35, r: 1, g: 0.95, b: 0.7, seed: e.at * 97 + (e.id ?? 0) });
      // The contact (Ed, 2026-10-06: attacks that read): a white star at its chest, a puff of dust at its feet, and bits of it
      // thrown up: feathers off a bird, tufts off fur, chips off a shell, confetti in its neon off a party animal (a party,
      // nobody hurt). A legend's blow, all bigger.
      const top = (c && lv.tops.get(c.id)) ?? 1.6, big = e.big ? 2 : 1, bits = c ? hitBits(c.species, c.leashed || c.legendState === "happy") : HIT_BITS.fur, col = bits === HIT_BITS.confetti && c ? neon(c.species) : c ? coatOf(c.species, 0.75) : bits;
      const lf = e.big ? 1 + 2 * t.attackFx.legendFlash : 1; // (a legend's flash: attackFx.legendFlash, 0.5 twice anyone's)
      lv.fx.push({ kind: "flash", x: e.x, y: Math.min(3.5, top * 0.55), z: e.z, at: time, life: 0.16 * lf, r: 1, g: 1, b: 0.95, seed: e.at * 53 + (e.id ?? 0), size: 0.9 * lf });
      if (e.big) lv.fx.push({ kind: "ring", x: e.x, y: 0, z: e.z, at: time, life: 0.45, r: 1, g: 0.85, b: 0.6, seed: 0, size: 3.2, n: 28, dot: 0.8 }); // a legend's blow: a shockwave along the ground
      lv.fx.push({ kind: "dust", x: e.x, y: 0.2, z: e.z, at: time, life: 0.5, r: 0.5, g: 0.45, b: 0.38, seed: e.at * 59 + (e.id ?? 0), size: 0.7 * big });
      lv.fx.push({ kind: "bits", x: e.x, y: Math.min(3, top * 0.6), z: e.z, at: time, life: 0.8, r: col.r, g: col.g, b: col.b, seed: e.at * 61 + (e.id ?? 0), size: big, n: bits === HIT_BITS.confetti ? 12 : 8 });
    }
    if (e.kind === "witchHit") { lv.fx.push({ kind: "spark", x: e.x, y: 1.4, z: e.z, at: time, life: 0.5, r: 1, g: 0.25, b: 0.35, seed: e.at * 31, size: 1.6 }); lv.fx.push({ kind: "flash", x: e.x, y: 1.3, z: e.z, at: time, life: 0.18, r: 1, g: 0.9, b: 0.92, seed: e.at * 67, size: 1.1 }); }
    if (e.kind === "fled" && close(e.x, e.z)) lv.fx.push({ kind: "puff", x: e.x, y: 0.5, z: e.z, at: time, life: 0.8, r: 0.8, g: 0.75, b: 0.7, seed: e.at * 13 });
    if (e.kind === "lost" && c) { const col = neon(c.species); lv.fx.push({ kind: "spark", x: e.x, y: 1, z: e.z, at: time, life: 1.2, r: col.r, g: col.g, b: col.b, seed: e.at * 7, size: 2.5 }); }
    if ((e.kind === "quake" || e.kind === "phase") && close(e.x, e.z, 150)) {
      // A quake's ring; a legend's roar into its second phase, a bigger, redder one.
      const phase = e.kind === "phase";
      lv.fx.push({ kind: "ring", x: e.x, y: 0, z: e.z, at: time, life: phase ? 1.2 : 0.7, r: 1, g: phase ? 0.2 : 0.55, b: phase ? 0.25 : 0.3, seed: 0, size: phase ? 10 : (c && c.fight?.move && attackNamed(c.fight.move)?.radius) || (attackNamed("quake").radius ?? 5) });
      if (phase) lv.fx.push({ kind: "spark", x: e.x, y: 2, z: e.z, at: time, life: 1, r: 1, g: 0.3, b: 0.3, seed: e.at * 3, size: 5 });
      const d = Math.hypot(e.x - w.x, e.z - w.z);
      if (d < 60) { lv.shakeAt = time; lv.shakeAmp = t.combat.shake * (1 - d / 60); } // screen shake: legends only
    }
    // Stage 5: a lob lands in a ring the size of its splash; an ambusher springs; a charge slams home.
    if (e.kind === "landed" && close(e.x, e.z, c?.level === 3 ? far : 150)) { const sh = c ? attackOf(c.species, c.level) : null; lv.fx.push({ kind: "ring", x: e.x, y: 0, z: e.z, at: time, life: c?.level === 3 ? 0.9 : 0.5, r: 1, g: 0.5, b: 0.35, seed: 0, size: c?.level === 3 ? LEGENDS.attack.lobRadius * FIGHT.scale : sh?.attack.radius ?? 1.8, ...(c?.level === 3 ? { n: 36, dot: 0.7 * big } : {}) }); lv.fx.push({ kind: "puff", x: e.x, y: 0.4, z: e.z, at: time, life: 0.6, r: 0.9, g: 0.7, b: 0.6, seed: e.at * 17 }); }
    // A pulse (a screech, an upheaval) or a toad's slam: a ring out to its reach; burrowing or surfacing, a spray of earth.
    if ((e.kind === "pulse" || e.kind === "slammed") && c && close(e.x, e.z)) { const A = attackOf(c.species, c.level)?.attack, col = c.leashed || c.legendState === "happy" ? neon(c.species) : { r: 1, g: 0.45, b: 0.4 }; lv.fx.push({ kind: "ring", x: e.x, y: 0, z: e.z, at: time, life: 0.45, r: col.r, g: col.g, b: col.b, seed: 0, size: A?.radius ?? 2.5 }); }
    if (e.kind === "slept" && close(e.x, e.z, 150)) for (let i = 0; i < 3; i++) lv.fx.push({ kind: "puff", x: e.x + (i - 1) * 1.2, y: 0.4, z: e.z, at: time, life: 1.4, r: 0.5, g: 0.4, b: 0.28, seed: e.at * 7 + i });
    if ((e.kind === "burrowed" || e.kind === "surfaced" || e.kind === "slammed") && close(e.x, e.z)) lv.fx.push({ kind: "puff", x: e.x, y: 0.3, z: e.z, at: time, life: 0.6, r: 0.55, g: 0.42, b: 0.3, seed: e.at * 41 + (e.id ?? 0) });
    if (e.kind === "sprung" && close(e.x, e.z)) lv.fx.push({ kind: "spark", x: e.x, y: 0.8, z: e.z, at: time, life: 0.4, r: 1, g: 0.3, b: 0.3, seed: e.at * 23, size: 1.4 });
    // Ed's species pass: a glow-worm's flash (a burst of its light), a block (a white glint), digging in (earth thrown up).
    // (Ed, 2026-10-05: the new moves' feedback bigger and brighter, to read at normal zoom on dark ground)
    if (e.kind === "flash" && c && close(e.x, e.z)) {
      const col = neon(c.species), R = (profileOf(c.species)?.move?.radius ?? 9) * FIGHT.scale, hot = { r: col.r * 0.4 + 0.6, g: col.g * 0.4 + 0.6, b: col.b * 0.4 + 0.6 };
      lv.fx.push({ kind: "ring", x: e.x, y: 0, z: e.z, at: time, life: 0.9, ...hot, seed: 0, size: R, n: Math.round(R * 9), dot: 1.1 });
      lv.fx.push({ kind: "ring", x: e.x, y: 0, z: e.z, at: time, life: 0.7, ...col, seed: 0, size: R * 0.6, n: Math.round(R * 6), dot: 0.9 });
      lv.fx.push({ kind: "spark", x: e.x, y: 1, z: e.z, at: time, life: 0.7, ...hot, seed: e.at * 37, size: 7 });
    }
    if (e.kind === "blocked" && close(e.x, e.z)) { lv.fx.push({ kind: "spark", x: e.x, y: 1.1, z: e.z, at: time, life: 0.5, r: 0.9, g: 0.97, b: 1, seed: e.at * 43, size: 3 }); lv.fx.push({ kind: "ring", x: e.x, y: 0, z: e.z, at: time, life: 0.4, r: 0.7, g: 0.85, b: 1, seed: 0, size: 2.2, n: 20, dot: 0.6 }); }
    if (e.kind === "dug" && close(e.x, e.z)) { lv.fx.push({ kind: "puff", x: e.x, y: 0.4, z: e.z, at: time, life: 1, r: 0.95, g: 0.7, b: 0.4, seed: e.at * 47, size: 2 }); lv.fx.push({ kind: "ring", x: e.x, y: 0, z: e.z, at: time, life: 0.5, r: 1, g: 0.65, b: 0.3, seed: 0, size: 2.6, n: 24, dot: 0.7 }); }
    if (e.kind === "charged" && close(e.x, e.z)) lv.fx.push({ kind: "puff", x: e.x, y: 0.4, z: e.z, at: time, life: 0.7, r: 0.8, g: 0.7, b: 0.55, seed: e.at * 29 });
    if (e.kind === "soundHit" && close(e.x, e.z, 150) && (e.at * 10) % 3 < 1) lv.fx.push({ kind: "spark", x: e.x, y: 2.5, z: e.z, at: time, life: 0.3, r: 1, g: 0.6, b: 0.3, seed: e.at * 3 });
    if (e.kind === "soundDestroyed") lv.fx.push({ kind: "spark", x: e.x, y: 3, z: e.z, at: time, life: 2, r: 1, g: 0.4, b: 0.6, seed: e.at, size: 6 });
  }
  // A quest done: the dream bubble pops in sparkles, the creature brought joins its new area.
  for (const e of g.questEvents) {
    const L = g.creatures[e.id], top = Math.min(lv.tops.get(e.id) ?? 2, 4.5) + 1.5;
    lv.fx.push({ kind: "spark", x: L.x, y: top, z: L.z, at: time, life: 1.2, r: 1, g: 0.75, b: 0.95, seed: e.at * 11 + e.id, size: 3 });
    lv.fx.push({ kind: "spark", x: L.x, y: top, z: L.z, at: time, life: 0.8, r: 1, g: 1, b: 1, seed: e.at * 13 + e.id, size: 1.6 });
    lv.fx.push({ kind: "ring", x: L.x, y: 0, z: L.z, at: time, life: 1, r: 1, g: 0.6, b: 0.85, seed: 0, size: 5 });
    const j = g.creatures[e.joined]; if (j) lv.fx.push({ kind: "puff", x: j.x, y: 0.5, z: j.z, at: time, life: 0.8, r: 1, g: 0.7, b: 0.9, seed: e.at * 17 });
  }
  for (const e of g.koEvents) {
    if (e.kind === "released" && e.id !== undefined) {
      const c = g.creatures[e.id], col = neon(c.species), from = lv.lastSlots.get(e.id);
      const fx = from ? from.x : w.x, fy = from ? from.y : hatTop + 1, fz = from ? from.z : w.z;
      lv.fx.push({ kind: "splash", x: fx, y: fy, z: fz, at: time, life: 1.1, r: col.r, g: col.g, b: col.b, seed: e.id * 17 + 3 });
      lv.fx.push({ kind: "snap", x: fx, y: fy, z: fz, at: time, life: 0.9, r: col.r, g: col.g, b: col.b, seed: e.id, tx: c.x, tz: c.z });
      lv.fx.push({ kind: "puff", x: c.x, y: 0.6, z: c.z, at: time, life: 0.8, r: col.r, g: col.g, b: col.b, seed: e.id * 5 });
    }
    if (e.kind === "sparkleOut" || e.kind === "sparkleIn") {
      const at = e.kind === "sparkleIn" && lv.seatAt ? lv.seatAt : { x: e.x, y: 0, z: e.z }; // (back behind her decks: there)
      lv.fx.push({ kind: "teleport", x: at.x, y: at.y, z: at.z, at: time, life: t.knockout.teleport * 0.6, r: 0.75, g: 0.6, b: 1, seed: e.at });
    }
  }
  { let j = 0; for (const f of lv.fx) if (time - f.at < f.life) lv.fx[j++] = f; lv.fx.length = j; } // (in place: no new array a frame)
  for (const f of lv.fx) {
    const k = (time - f.at) / f.life, n = f.kind === "flash" ? 13 : f.kind === "dust" ? 10 : f.kind === "bits" ? f.n ?? 8 : f.kind === "spark" ? 10 : f.kind === "splash" ? 22 : f.kind === "puff" ? 12 : f.kind === "teleport" ? 40 : f.kind === "ring" ? f.n ?? 36 : f.kind === "motes" ? 16 : 14, sz = f.size ?? 1;
    for (let i = 0; i < n; i++) {
      const a = hash2(f.seed, i, 3) * Math.PI * 2, r1 = hash2(f.seed, i, 5), r2 = hash2(f.seed, i, 7);
      if (f.kind === "spark") lv.standing.add(f.x + Math.cos(a) * sz * k * (0.5 + r1), f.y + sz * k * r2, f.z + Math.sin(a) * sz * k * (0.5 + r1), 0.22 * Math.sqrt(sz), dot, f.r, f.g, f.b, 1 - k);
      else if (f.kind === "dust") lv.solid.add(f.x + Math.cos(a) * k * 1.1 * sz, f.y + k * r2 * 0.8 * sz, f.z + Math.sin(a) * k * 1.1 * sz, (0.45 + k * 0.8) * sz, dot, f.r, f.g, f.b, 0.55 * (1 - k)); // a hit's dust, toned to the floor, not glowing
      else if (f.kind === "puff") lv.standing.add(f.x + Math.cos(a) * k * 1.2 * sz, f.y + k * r2 * 1.2 * sz, f.z + Math.sin(a) * k * 1.2 * sz, (0.5 + k) * sz, dot, f.r * 0.5, f.g * 0.5, f.b * 0.5, 0.6 * (1 - k));
      else if (f.kind === "splash") lv.standing.add(f.x + Math.cos(a) * (0.5 + r1 * 2) * k, f.y + (1 + r2 * 2) * k - 5 * k * k, f.z + Math.sin(a) * (0.5 + r1 * 2) * k, 0.3, dot, f.r * 1.4, f.g * 1.4, f.b * 1.4, 1 - k * k);
      else if (f.kind === "snap") { const q = (i + 0.5) / n, cut = q > k; if (cut) lv.standing.add(f.x + (f.tx! - f.x) * q, f.y + (0.6 - f.y) * q + Math.sin(q * Math.PI) * 1.2 - k * 2 * q, f.z + (f.tz! - f.z) * q, 0.24, dot, f.r, f.g, f.b, (1 - k) * 0.9); }
      else if (f.kind === "teleport") lv.standing.add(f.x + Math.cos(a + k * 6) * (0.4 + r1), r2 * 3 + k * 2, f.z + Math.sin(a + k * 6) * (0.4 + r1), 0.25, dot, f.r * 1.3, f.g * 1.3, f.b * 1.3, Math.sin(k * Math.PI));
      else if (f.kind === "bang") { if (i < 8) { const col = i < 4 ? -1 : 1, row = i % 4, R = SPRITE_UNIFORMS.uRight.value; if (row !== 2) lv.over.add(f.x + R.x * col * 0.22, f.y + k * 0.6 + (3 - row) * 0.17, f.z + R.z * col * 0.22, 0.2, sq, f.r, f.g, f.b, 1 - k * k); } }
      else if (f.kind === "tink") { const aa = (i / n) * Math.PI * 2, R = sz * (0.4 + 0.6 * k); lv.standing.add(f.x + Math.cos(aa) * R, f.y + Math.sin(aa) * R * 0.6, f.z, 0.16, dot, f.r, f.g, f.b, 1 - k); }
      else if (f.kind === "flash") { // a pixel star (the art director, #193): a cross of art-pixel squares, its arms growing 1 to 3 pixels, a pale ring of 8 in its last frame
        const R = SPRITE_UNIFORMS.uRight.value, px = artPx * Math.max(1, Math.round(sz)), arm = Math.min(3, 1 + Math.floor(k * 3));
        if (i === 0) lv.over.add(f.x, f.y, f.z, px, sq, f.r, f.g, f.b, 1);
        else if (i <= 12) { const ray = (i - 1) % 4, step = Math.floor((i - 1) / 4) + 1; if (step <= arm) { const ox = ray === 0 ? step : ray === 2 ? -step : 0, oy = ray === 1 ? step : ray === 3 ? -step : 0; lv.over.add(f.x + R.x * ox * px, f.y + oy * px, f.z + R.z * ox * px, px, sq, f.r, f.g, f.b, 1 - k * 0.5); } }
        if (i === 0 && k > 0.6) for (let j = 0; j < 8; j++) { const aa = (j / 8) * Math.PI * 2, ox = Math.round(Math.cos(aa) * 4), oy = Math.round(Math.sin(aa) * 4); lv.over.add(f.x + R.x * ox * px, f.y + oy * px, f.z + R.z * ox * px, px, sq, 0.85, 0.9, 1, 0.6); }
      }
      else if (f.kind === "bits") { // thrown up and out and falling, art-pixel squares in its coat, not glowing
        const sp = (0.8 + r1 * 1.4) * sz, up = (2 + r2 * 2.5) * sz, px = artPx * (r1 > 0.6 ? 2 : 1);
        lv.solid.add(f.x + Math.cos(a) * sp * k, Math.max(0.05, f.y + up * k - 6 * k * k), f.z + Math.sin(a) * sp * k, px, sq, f.r, f.g, f.b, 1 - k * k * k);
      }
      else if (f.kind === "motes") { const R = sz * (0.3 + r1 * 0.7), h = (f.tx ?? 3) * (0.2 + 0.8 * r2) * Math.sqrt(k); lv.standing.add(f.x + Math.cos(a) * R, f.y + h, f.z + Math.sin(a) * R * 0.8, 0.7 * (1 - k * 0.5), dot, f.r, f.g, f.b, Math.sin(Math.PI * Math.min(1, k * 1.4)) * 0.9); } // (a sigil's motes rising: tx their height)
      else if (f.kind === "ring") { const aa = (i / n) * Math.PI * 2, R = sz * (0.3 + 0.7 * k); lv.flat.add(f.x + Math.cos(aa) * R, 0, f.z + Math.sin(aa) * R * 0.8, f.dot ?? 0.7, dot, f.r, f.g, f.b, 1 - k); }
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
      const air = legend && up ? lv.over : lv.standing; // (over the crowns from the treetops)
      air.add(sh.x, y, sh.z, (legend ? 1.1 : 0.7) * sz, dot, 1, 1, 1, 0.95);
      air.add(sh.x, y, sh.z, (legend ? 2.6 : 1.8) * sz, dot, col.r, col.g, col.b, 0.75, 1, legend);
      if (legend) for (let i = 1; i <= 6; i++) { const q = Math.max(0, k - i * 0.025), x = L.fx + (L.tx - L.fx) * q, z = L.fz + (L.tz - L.fz) * q; air.add(x, 1 + Math.sin(q * Math.PI) * hi, z, (1.2 - i * 0.13) * sz, dot, col.r, col.g * 0.8, col.b * 0.6, 0.6 - i * 0.08, 1, true); }
      const R = sh.radius * (1.4 - 0.4 * k), n = legend ? 40 : 24;
      for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; if (legend) mark(L.tx + Math.cos(a) * R, L.tz + Math.sin(a) * R * 0.8, 0.4 * sz, col.r, col.g, col.b, 0.3 + 0.6 * k); else lv.flat.add(L.tx + Math.cos(a) * R, 0, L.tz + Math.sin(a) * R * 0.8, 0.4 * sz, dot, col.r, col.g, col.b, 0.3 + 0.6 * k); }
      continue;
    }
    lv.standing.add(sh.x, 1, sh.z, 0.55, dot, 1, 1, 1, 0.9);
    lv.standing.add(sh.x, 1, sh.z, 1.6, dot, col.r, col.g, col.b, 0.7);
    lv.standing.add(sh.x - sh.vx * 0.05, 1, sh.z - sh.vz * 0.05, 1, dot, col.r, col.g, col.b, 0.3, 1, true); // (its trail: light)
  }
  // Beams: a burning line from the creature, as wide as it hurts.
  for (const b of g.combat.beams) {
    const c = g.creatures[b.from];
    if (!c || !close(c.x, c.z, b.attack === "legendBeam" ? far : 150)) continue;
    const col = huntsWitch(b.side) ? { r: 1, g: 0.3, b: 0.3 } : neon(b.species), ex = Math.cos(b.angle), ez = Math.sin(b.angle), fl = 0.75 + 0.25 * Math.sin(time * 40 + b.id);
    for (let s2 = 0.6; s2 < b.length; s2 += 0.45) {
      lv.standing.add(c.x + ex * s2, 0.7, c.z + ez * s2, Math.max(0.5, b.width * 0.9), dot, col.r, col.g, col.b, 0.45 * fl, 1, true); // (its glow: light)
      lv.standing.add(c.x + ex * s2, 0.7, c.z + ez * s2, 0.3, dot, 1, 1, 1, 0.8 * fl);
    }
  }
  // A snail's slime: glistening patches on the ground, fading as they dry.
  for (const tr of g.combat.trails) {
    if (!close(tr.x, tr.z)) continue;
    const left = Math.min(1, (tr.until - time) / 2), wild = huntsWitch(tr.side);
    // A glossy patch (bigger and brighter: Ed, 2026-10-05), a rim round it, and glints that wink.
    const sd = Math.round(tr.until * 10), [sr, sg, sb] = wild ? [0.6, 1, 0.35] : [0.45, 1, 0.85];
    for (let i = 0; i < 7; i++) { const a = hash2(tr.from, sd + i, 31) * Math.PI * 2, q = hash2(tr.from, sd + i, 37) * tr.r * 0.6; lv.flat.add(tr.x + Math.cos(a) * q, 0, tr.z + Math.sin(a) * q * 0.8, tr.r * 0.75, dot, sr, sg, sb, 0.45 * left); }
    for (let i = 0; i < 14; i++) { const a = (i / 14) * Math.PI * 2; lv.flat.add(tr.x + Math.cos(a) * tr.r, 0, tr.z + Math.sin(a) * tr.r * 0.8, 0.45, dot, sr, sg, sb, 0.7 * left); }
    for (let i = 0; i < 3; i++) { const tw = 0.5 + 0.5 * Math.sin(time * 5 + i * 2.1 + tr.from), a = hash2(tr.from, sd + i, 43) * Math.PI * 2, q = hash2(tr.from, sd + i, 47) * tr.r * 0.7; lv.standing.add(tr.x + Math.cos(a) * q, 0.12, tr.z + Math.sin(a) * q * 0.8, 0.35, dot, 1, 1, 0.9, tw * left); }
  }
  for (const c of g.creatures) {
    if (c.gone || !close(c.x, c.z, c.level === 3 ? far : near)) continue;
    // Dug in (the badger): a ring of thrown-up earth round its feet.
    if (c.dug !== undefined && time < c.dug) { // (bigger and brighter: Ed, 2026-10-05)
      for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; lv.standing.add(c.x + Math.cos(a) * 1.4, 0.15 + hash2(c.id, i, 41) * 0.25, c.z + Math.sin(a) * 0.95, 0.6, dot, 0.95, 0.62, 0.32, 0.95); }
      const pk = 0.6 + 0.4 * Math.sin(time * 6 + c.id);
      for (let i = 0; i < 24; i++) { const a = (i / 24) * Math.PI * 2; lv.flat.add(c.x + Math.cos(a) * 1.9, 0, c.z + Math.sin(a) * 1.5, 0.5, dot, 1, 0.6, 0.25, 0.7 * pk); }
    }
    // Braced (the beaver): its tail up as a shield, an arc on the side it faces.
    if (c.brace !== undefined && time < c.brace) for (let i = -5; i <= 5; i++) for (let row = 0; row < 3; row++) { // (a shield: bigger and brighter, Ed 2026-10-05)
      const a = (c.facing > 0 ? 0 : Math.PI) + i * 0.2; lv.standing.add(c.x + Math.cos(a) * 1.5, 0.35 + row * 0.45 - Math.abs(i) * 0.04, c.z + Math.sin(a) * 1.1, 0.5, dot, 0.75, 0.9, 1, row === 1 ? 1 : 0.8);
    }
    // Rolling curled up (a hedgehog, a woodlouse): spikes whirling round it.
    if (c.charge?.curl && (c.charge.from === undefined || time >= c.charge.from)) for (let i = 0; i < 14; i++) { // (bigger and brighter: Ed, 2026-10-05)
      const a = (i / 14) * Math.PI * 2 + time * 14, R = i % 2 ? 1.35 : 0.95; lv.standing.add(c.x + Math.cos(a) * R, 0.7 + Math.sin(a) * R * 0.7, c.z + 0.3, i % 2 ? 0.6 : 0.45, dot, 0.85, 0.95, 1, 1); // (white-blue: it shows against its own brown spines)
    }
    if (c.charge?.curl && (c.charge.from === undefined || time >= c.charge.from)) for (let i = 0; i < 20; i++) { const a = (i / 20) * Math.PI * 2 - time * 10; lv.flat.add(c.x + Math.cos(a) * 1.6, 0, c.z + Math.sin(a) * 1.25, 0.45, dot, 0.7, 0.85, 1, i % 4 === 0 ? 0.95 : 0.4); } // (a whirling ring on the ground under it)
    // Burrowed (the mole): a mound of earth moving over the ground, flecks thrown up.
    if (c.burrow) for (let i = 0; i < 7; i++) { const a = (i / 7) * Math.PI * 2, q = hash2(c.id, Math.floor(time * 12) + i, 19); lv.standing.add(c.x + Math.cos(a) * 0.45, 0.1 + (i === 0 ? 0.25 : 0) + q * 0.12, c.z + Math.sin(a) * 0.3, 0.45, dot, 0.42, 0.3, 0.2, 0.9); }
    // Leaping (the toad): a ring tightening where it'll land.
    if (c.leap) { const L = c.leap, k = Math.max(0, Math.min(1, (time - L.at) / Math.max(0.01, L.lands - L.at))), A = attackOf(c.species, c.level)?.attack, R = (A?.radius ?? 2.4) * (1.3 - 0.3 * k), col = c.leashed ? neon(c.species) : { r: 1, g: 0.35, b: 0.35 }; for (let i = 0; i < 20; i++) { const a = (i / 20) * Math.PI * 2; lv.flat.add(L.tx + Math.cos(a) * R, 0, L.tz + Math.sin(a) * R * 0.8, 0.35, dot, col.r, col.g, col.b, 0.3 + 0.6 * k); } }
    // A wild legend in its second phase: a red aura pulsing round its feet.
    if (c.legend?.phase === 2 && !c.leashed) { const pk = 0.5 + 0.5 * Math.sin(time * 6 + c.id); for (let i = 0; i < 28; i++) { const a = (i / 28) * Math.PI * 2 + time * 0.5, R = 2.6 + pk * 0.4; lv.flat.add(c.x + Math.cos(a) * R, 0, c.z + Math.sin(a) * R * 0.8, 0.45, dot, 1, 0.2, 0.25, 0.3 + 0.4 * pk); } }
    if (legendCharging(c, time)) for (let i = 0; i < 3; i++) lv.standing.add(c.x + (hash2(c.id, Math.floor(time * 15) + i, 23) - 0.5) * 2, 0.4, c.z + (hash2(c.id, Math.floor(time * 15) + i, 29) - 0.5) * 1.2, 0.8, dot, 0.7, 0.6, 0.5, 0.4);
    // A friendly area's creature (its legend's quest done): a rosy heart-mote over it now and then.
    if (c.friendly && !c.leashed && c.level > 0) { const top = (lv.tops.get(c.id) ?? 1.2 + c.level * 0.6) + 0.35, ph = (time * 0.5 + c.id * 0.37) % 1; lv.standing.add(c.x, top + ph * 0.6, c.z, 0.28, dot, 1, 0.5, 0.75, Math.sin(ph * Math.PI) * 0.9); }
    // About to charge (the boar lowering its head): the lane it will run down, brightening.
    if (c.charge?.from !== undefined && time < c.charge.from) { const ch = c.charge, k = 1 - Math.max(0, ch.from! - time) / 0.5, L = ch.speed * (ch.until - ch.from!), col = c.leashed ? neon(c.species) : { r: 1, g: 0.3, b: 0.3 }; for (let s2 = 1.5; s2 < L; s2 += 1.2) for (const side of [-1, 1]) lv.flat.add(c.x + ch.dx * s2 - ch.dz * side * 1.6, 0, c.z + ch.dz * s2 + ch.dx * side * 1.6, 0.35, dot, col.r, col.g, col.b, 0.15 + 0.55 * k); }
    // A legend's long charge (legends.json charge): head down, its first lane on the ground, brightening;
    // then dust and churned ground behind it as it runs and brakes in its arc (the ruts fade slowly).
    if (c.run) {
      const run = c.run, K = LEGENDS.charge, col = c.legendState === "happy" ? neon(c.species) : { r: 1, g: 0.3, b: 0.3 };
      if (run.phase === "windup") {
        const k = Math.min(1, (time - run.at) / Math.max(0.05, K.windup)), ux = Math.cos(run.angle), uz = Math.sin(run.angle), half = (K.laneWidth * FIGHT.scale) / 2;
        for (let s2 = 2; s2 < K.laneShown * FIGHT.scale; s2 += 1.4) for (const side of [-1, 1]) lv.flat.add(c.x + ux * s2 - uz * side * half, 0, c.z + uz * s2 + ux * side * half, 0.45, dot, col.r, col.g, col.b, (0.15 + 0.6 * k) * (1 - s2 / (K.laneShown * FIGHT.scale * 1.1)));
        for (let i = 0; i < 20; i++) { const a = (i / 20) * Math.PI * 2, R = 4 - 2 * k; lv.flat.add(c.x + Math.cos(a) * R, 0, c.z + Math.sin(a) * R * 0.8, 0.5, dot, col.r, col.g, col.b, 0.3 + 0.6 * k); }
      } else if (run.phase !== "home") {
        let ruts = lv.ruts.get(c.id);
        if (!ruts) lv.ruts.set(c.id, (ruts = []));
        if (!ruts.length || Math.hypot(ruts[ruts.length - 1].x - c.x, ruts[ruts.length - 1].z - c.z) > 1.5) ruts.push({ x: c.x, z: c.z, at: time });
        for (let i = 0; i < 6; i++) { const q = hash2(c.id, Math.floor(time * 20) + i, 17), ux = Math.cos(run.angle), uz = Math.sin(run.angle); lv.standing.add(c.x - ux * (2 + i * 1.2), 0.4 + q * 0.8, c.z - uz * (2 + i * 1.2), 0.9 + i * 0.25, dot, 0.75, 0.65, 0.5, 0.55 - i * 0.08); }
      }
    }
    // Charging (the boar): dust kicked up behind it.
    if (c.charge && (c.charge.from === undefined || time >= c.charge.from)) for (let i = 0; i < (c.charge.braking ? 6 : 4); i++) { const q = hash2(c.id, Math.floor(time * 20) + i, 17); lv.standing.add(c.x - c.charge.dx * (0.8 + i * 0.5), 0.3 + q * 0.4, c.z - c.charge.dz * (0.8 + i * 0.5), 0.5 + i * 0.15, dot, 0.75, 0.65, 0.5, 0.5 - i * 0.1); }
    // The boar's charge throws up petals with its dust (Ed, 2026-10-06: dust and petals for the boar, a party).
    if (c.charge && c.species === "boar" && (c.charge.from === undefined || time >= c.charge.from)) for (let i = 0; i < 4; i++) { const q = hash2(c.id, Math.floor(time * 12) + i, 29), age = (time * 12) % 1; lv.solid.add(c.x - c.charge.dx * (1 + i * 0.7) + (q - 0.5) * 1.2, 0.5 + q * 1.2 + age * 0.5, c.z - c.charge.dz * (1 + i * 0.7) + (hash2(c.id, i, 31) - 0.5) * 1.2, artPx * 2, sq, 0.85, 0.45 + q * 0.25, 0.6, 0.9 - i * 0.15); } // (petals: art-pixel squares, not glowing)
    // A lunge (the dash-strike): dust kicked up behind it and a streak of speed along its way.
    const lg = c.fight?.lunge;
    if (lg && lg.left > 0.05) for (let i = 0; i < 5; i++) { const q = hash2(c.id, Math.floor(time * 30) + i, 37); lv.solid.add(c.x - lg.dx * (0.6 + i * 0.6), 0.25 + q * 0.3, c.z - lg.dz * (0.6 + i * 0.6), 0.45 + i * 0.12, dot, 0.5, 0.45, 0.38, 0.45 - i * 0.08); lv.standing.add(c.x - lg.dx * (0.4 + i * 0.5), 0.9 + (q - 0.5) * 0.5, c.z - lg.dz * (0.4 + i * 0.5), 0.12, dot, 1, 1, 0.95, 0.7 - i * 0.13); }
    // Slowed (a barb, a web): a cold drift of motes round its feet while it lasts.
    if (c.slowUntil !== undefined && time < c.slowUntil) for (let i = 0; i < 6; i++) { const a = time * 1.5 + (i / 6) * Math.PI * 2; lv.standing.add(c.x + Math.cos(a) * 0.8, 0.15 + 0.15 * Math.sin(time * 3 + i), c.z + Math.sin(a) * 0.55, 0.18, dot, 0.55, 0.75, 1, 0.75); }
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
      if (k < 0.35) { const y = (lv.tops.get(c.id) ?? 1.4) + 0.5, R = SPRITE_UNIFORMS.uRight.value, e = 1 - k / 0.35, L = 0.35 * (0.5 + 0.5 * Math.sin(k * 30)) + 0.2;
        lv.over.add(c.x, y, c.z, 0.32 * e + 0.1, dot, 1, 1, 0.85, e); for (const [ox, oy] of [[L, 0], [-L, 0], [0, L], [0, -L]]) lv.over.add(c.x + R.x * ox, y + oy, c.z + R.z * ox, 0.12, dot, 1, 0.95, 0.7, e); }
      if (A.delivery === "quake" || A.delivery === "pulse") {
        const R = A.radius ?? 5;
        for (let i = 0; i < 40; i++) { const a = (i / 40) * Math.PI * 2; lv.flat.add(c.x + Math.cos(a) * R, 0, c.z + Math.sin(a) * R * 0.8, 0.5, dot, r, gg * 0.6, b * 0.6, 0.25 + 0.6 * k); }
      } else if (f.move && A.delivery === "shot") {
        // A legend's nova: spokes out all round, growing as it winds up.
        const n = A.shots ?? 8, aim = Math.atan2(f.aimZ - c.z, f.aimX - c.x);
        for (let i = 0; i < n; i++) { const a = aim + (i / n) * Math.PI * 2; for (let s2 = 1.5; s2 < 1.5 + 4 * k; s2 += 0.7) lv.flat.add(c.x + Math.cos(a) * s2, 0, c.z + Math.sin(a) * s2 * 0.8, 0.35, dot, r, gg, b, 0.25 + 0.6 * k); }
      } else if (f.move && A.delivery === "beam") {
        // A legend's spin: the whole circle it will sweep, and where the beam starts.
        const R = A.range, aim = Math.atan2(f.aimZ - c.z, f.aimX - c.x);
        for (let i = 0; i < 48; i++) { const a = (i / 48) * Math.PI * 2; lv.flat.add(c.x + Math.cos(a) * R, 0, c.z + Math.sin(a) * R * 0.8, 0.4, dot, r, gg, b, 0.2 + 0.5 * k); }
        for (let s2 = 1.2; s2 < R; s2 += 0.7) lv.flat.add(c.x + Math.cos(aim) * s2, 0, c.z + Math.sin(aim) * s2, 0.35, dot, 1, 0.3, 0.3, 0.2 + 0.6 * k);
      } else if (f.move && A.delivery === "melee") {
        // A legend's charge: the long lane it will run down.
        const dx = f.aimX - c.x, dz = f.aimZ - c.z, d = Math.hypot(dx, dz) || 1, L = (A.speed ?? 8) * (A.duration ?? 1.5);
        for (let s2 = 1.5; s2 < L; s2 += 0.8) for (const side of [-1, 1]) lv.flat.add(c.x + (dx / d) * s2 - (dz / d) * side * 1.4, 0, c.z + (dz / d) * s2 + (dx / d) * side * 1.4, 0.32, dot, r, gg, b, 0.15 + 0.55 * k);
      } else {
        const R = 1.8 - 0.9 * k;
        for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; lv.flat.add(c.x + Math.cos(a) * R, 0, c.z + Math.sin(a) * R * 0.8, 0.35, dot, r, gg, b, 0.4 + 0.5 * k); }
        if (A.delivery === "melee" && (A.lunge ?? 0) > 3) {
          // A lunge's line (Ed's motion scale pass: a dash-strike of 12 to 16 m): where it will go.
          const dx = f.aimX - c.x, dz = f.aimZ - c.z, d = Math.hypot(dx, dz) || 1, L = Math.min(A.lunge ?? 0, d);
          for (let s2 = 1; s2 < L; s2 += 0.8) lv.flat.add(c.x + (dx / d) * s2, 0, c.z + (dz / d) * s2, 0.35, dot, r, gg, b, 0.15 + 0.5 * k);
          lv.flat.add(c.x + (dx / d) * L, 0, c.z + (dz / d) * L, 0.9, dot, r, gg, b, 0.3 + 0.6 * k);
        }
        if ((A.delivery === "shot" || A.delivery === "beam") && wild) {
          const dx = f.aimX - c.x, dz = f.aimZ - c.z, d = Math.hypot(dx, dz) || 1, L = Math.min(A.range, d + 2);
          for (let s2 = 1.2; s2 < L; s2 += 0.9) lv.flat.add(c.x + (dx / d) * s2, 0, c.z + (dz / d) * s2, 0.28, dot, 1, 0.3, 0.3, 0.12 + 0.3 * k);
        }
      }
    }
    // Healed (a berry, or invited: Ed, 2026-10-04): a green sparkle, and its bar shows full a moment.
    const healed = c.healedAt !== undefined && time - c.healedAt < 0.8;
    if (healed) for (let i = 0; i < 10; i++) { const k = (time - c.healedAt!) / 0.8, a = hash2(c.id, i, 11) * Math.PI * 2; lv.standing.add(c.x + Math.cos(a) * 0.9 * (0.4 + k), 0.4 + k * 2 + hash2(c.id, i, 13), c.z + Math.sin(a) * 0.6 * (0.4 + k), 0.3, dot, 0.4, 1, 0.5, 1 - k); }
    // Health bars, only when hurt: ten squares over its head.
    const max = creatureMaxHp(c), hp = c.hp ?? max;
    // Stunned (an armoured one knocked over): stars round its head.
    if (c.stunUntil !== undefined && time < c.stunUntil) { const y = (lv.tops.get(c.id) ?? 1.4) + 0.2; for (let i = 0; i < 3; i++) { const a = time * 5 + (i / 3) * Math.PI * 2; lv.standing.add(c.x + Math.cos(a) * 0.6, y + Math.sin(a * 2) * 0.08, c.z + Math.sin(a) * 0.4, 0.22, dot, 1, 0.95, 0.5, 0.9); } }
    // Its traits' marks (Stage 5, readable counters), left of its health bar, while it fights or is hurt.
    if ((hp < max || healed || c.fight?.target) && !c.fleeUntil && c.level > 0) {
      const tr = traitsOf(c.species);
      if (tr.length) {
        const y = (lv.tops.get(c.id) ?? 1.6 + c.level * 0.7) + 0.5, R = SPRITE_UNIFORMS.uRight.value, wide = 1 + c.level * 0.25;
        tr.forEach((m, j) => { const o = -5.2 * 0.17 * wide - 0.3 - j * 0.35, px = c.x + R.x * o, pz = c.z + R.z * o, M = TRAIT_MARKS[m]; lv.over.add(px, y, pz, M.size, M.square ? sq : dot, M.r, M.g, M.b, 0.95); });
      }
    }
    if ((hp < max || healed) && !c.fleeUntil) {
      const y = (lv.tops.get(c.id) ?? 1.6 + c.level * 0.7) + 0.5, share = Math.max(0, hp / max), R = SPRITE_UNIFORMS.uRight.value, wide = 1 + c.level * 0.25;
      for (let i = 0; i < 10; i++) { // drawn over everything, so a big creature's own sprite doesn't hide it
        const o = (i - 4.5) * 0.17 * wide, lit = (i + 0.5) / 10 <= share;
        lv.over.add(c.x + R.x * o, y, c.z + R.z * o, 0.2 * wide, sq, lit ? 1 - share * 0.7 : 0.3, lit ? 0.3 + share * 0.7 : 0.3, lit ? 0.3 : 0.35, lit ? 0.95 : 0.35);
      }
    }
    // Let go on a knockout and walking home: a faint marker and its sigil, grey and flickering.
    if (c.wanderTo) {
      const col = neon(c.species), fl = 0.25 + 0.15 * Math.sin(time * 5 + c.id);
      lv.standing.add(c.x, (lv.tops.get(c.id) ?? 1.4 + c.level * 0.6) + 0.6 + Math.sin(time * 2 + c.id) * 0.1, c.z, 1.1, lv.uv(lv.slotOf(c.species, c.level)), col.r * 0.6 + 0.3, col.g * 0.6 + 0.3, col.b * 0.6 + 0.3, fl);
      for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2 + time; if (i % 2) lv.flat.add(c.x + Math.cos(a) * 1.4, 0, c.z + Math.sin(a) * 1.1, 0.25, dot, 0.8, 0.8, 0.9, 0.35); }
    }
  }
  // Soundsystems under siege: a long bar over each, when hurt.
  for (const [, h] of g.combat.sounds) {
    if (h.hp >= h.max || h.hp <= 0 || !close(h.x, h.z, 200)) continue;
    const share = h.hp / h.max, R = SPRITE_UNIFORMS.uRight.value, n = 20, y = h.radius > 5 ? 9 : 7;
    for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * 0.35, lit = (i + 0.5) / n <= share; lv.over.add(h.x + R.x * o, y, h.z + R.z * o, 0.32, sq, lit ? 1 : 0.3, lit ? 0.35 + 0.5 * share : 0.3, lit ? 0.55 : 0.35, lit ? 1 : 0.35); }
  }
  // Knocked out: dizzy stars over her while she's down.
  if (W.ko && time < W.ko.teleportAt) for (let i = 0; i < 5; i++) { const a = time * 3 + (i / 5) * Math.PI * 2; lv.standing.add(w.x + Math.cos(a) * 0.7, 1.6 + Math.sin(a * 2) * 0.1, w.z + Math.sin(a) * 0.5, 0.25, dot, 1, 0.95, 0.5, 0.9); }
  drawPips(lv, time, camera, width, height);
}
