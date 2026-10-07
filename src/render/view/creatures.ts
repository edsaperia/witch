// The creatures and berries (from render/view.ts, issue #122): each creature's look, dance, glow and
// shadow every frame, and the berries growing back and nibbled.
import * as THREE from "three";
import type { Tuning } from "../../rules/tuning";
import type { CreatureArt } from "../assets";
import { ENRAGED_TINT, dances, expression, lookOf } from "../looks";

/** The party's dances (dealt by id): a bounce, a sway, a hop every other beat, a quick bob. */
const DANCE_STYLES = ["bounce", "sway", "hop", "bob"] as const;
import type { RigGear } from "../rig/rigBuild";
import type { ShadowInstance } from "../shadows";
import { SPRITE_UNIFORMS, SpriteBatch, type SpriteInstance } from "../sprites";
import { beatTime } from "../../rules/beat";
import { bossBreath, legendNeon } from "../leash";
import { dormant } from "../../rules/game";
import { hash2 } from "../../rules/random";
import { restlessness } from "../../rules/dream";
import { sigilColour } from "../../../art/generator.js";
import type { View } from "../view";
import { inView } from "./culling";
import { mark } from "./pops";
import { attackFeel, newFeel } from "../attackFeel";
import { legendSleep, newSleepTrack, type SleepPose } from "../legendSleep";

const FEEL = newFeel(); // (filled per creature, never kept)
const SLEEP: SleepPose = { sleep: 0, droop: 0 }; // (likewise)

/** The baked walk's frame (0 or 1) by how far it has gone as drawn (Ed's playtest: feet walking in place, or not walking while it
 *  moves): a step every `step` metres, standing (frame 0) once it has stopped for a quarter of a second. One small record per creature. */
function strideFrame(v: View, c: { id: number; x: number; z: number }, time: number, step: number): number {
  let o = v.strides.get(c.id);
  if (!o) v.strides.set(c.id, (o = { x: c.x, z: c.z, d: 0, at: -1 }));
  const d = Math.hypot(c.x - o.x, c.z - o.z);
  if (d > 1e-3 && d < 3) { o.d += d; o.at = time; } // (a jump of metres is a teleport, not a step)
  o.x = c.x; o.z = c.z;
  return time - o.at < 0.25 ? Math.floor(o.d / Math.max(0.05, step)) % 2 : 0;
}

const WOKEN_GEAR: RigGear = { woken: true };

export function drawBerries(v: View, time: number): void {
  const g = v.game, B = g.berries, w = g.witch, R = g.tuning.haze.far, f = v.berryBatch.atlas.frames[0], items: SpriteInstance[] = [];
  for (const e of B.events) {
    if (e.kind === "regrew") v.regrewAt.set(e.id, time);
    if (e.kind === "evolved") v.evolvedAt.set(e.id, time);
    if (e.kind === "ate") v.nibbles.push({ x: e.x, z: e.z, at: time });
  }
  for (const [id, at] of v.regrewAt) if (time - at > 0.6) v.regrewAt.delete(id);
  // The nibble (Ed, v233): a quick sparkle where a berry was eaten, white bits bursting out and fading.
  v.nibbles = v.nibbles.filter(n => time - n.at < 0.45);
  for (const n of v.nibbles) {
    const k = (time - n.at) / 0.45;
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + n.x, r = 0.25 + k * 0.9;
      items.push({ x: n.x + Math.cos(a) * r, y: 0.75 + Math.sin(a) * r * 0.7 + k * 0.4, z: n.z + 0.3, frame: f, flip: false, scale: 0.45 * (1 - k), glow: 1 });
    }
  }
  for (const [id, at] of v.evolvedAt) if (time - at > 1.2) v.evolvedAt.delete(id);
  const V = v.lastView, VH = V ? V.half + 4 : Infinity; // (the scenery's square first: much cheaper than inView)
  for (const b of B.berries) {
    const p = B.bushes[b.bush];
    if (Math.abs(p.x - w.x) > R || Math.abs(p.z - w.z) > R || (V && (Math.abs(p.x - V.x) > VH || Math.abs(p.z - V.z) > VH)) || !inView(v, p.x, p.z, 0.5, 1.2, 2)) continue;
    const at = v.regrewAt.get(b.id), grow = at === undefined ? 1 : Math.min(1, (time - at) / 0.5);
    if (grow <= 0.05) continue;
    items.push({ x: p.x, y: 0.75, z: p.z + 0.25, frame: f, flip: false, scale: grow });
  }
  v.berryBatch.set(items);
  v.stats.berries = items.length;
}

export function drawCreatures(v: View, time = 0): void {
  const g = v.game, R = g.tuning.haze.far + 20;
  const per = new Map<string, SpriteInstance[]>(), arts = new Map<string, CreatureArt>(), creatureShadows: ShadowInstance[] = [], legendKeys = new Map<string, string>();
  const beat = 60 / g.tuning.beat.bpm, bt = beatTime(g.beat, time); // beat-time, on the beat clock
  let n = 0;
  v.rig?.begin(time, g.tuning.rig, g.witch.mode !== "rising" && g.witch.mode !== "treetop");
  if (v.rig && !v.rig.legendLook) v.rig.legendLook = sp => legendLook(sp, g.tuning);
  for (const c of g.creatures) {
    if (c.gone || Math.abs(c.x - g.witch.x) > R || Math.abs(c.z - g.witch.z) > R) continue;
    if (c.burrow) continue; // under the ground (Stage 5: the mole), a mound shows where (leash view)
    // Invited creatures are party animals: their party gear once it's drawn (the wild look till then).
    // Happy ones (issue #87) in party clothes without the collar; legends never dressed up (render/looks.ts).
    const look = lookOf(c), party = look === "leashed" && !c.boss ? v.assets.partyArt(c.species, c.id, sigilColour(c.species)) : look === "happy" ? v.assets.happyArt(c.species, c.id) : undefined;
    // Enraged by a wave (besieging, marching on): angry red eyes, and it can't be invited (Ed's playtest).
    const woken = !party && c.enraged ? v.assets.wokenArt(c.species) : undefined;
    // A sleeping area legend (Ed, 2026-10-04: "ancient creatures, half sunken into the ground,
    // they could almost be mistaken for scenery"): sunk and mossed over, in a batch of its own
    // with no find-in-the-dark look. Woken, it gets up drowsily and heaves itself out of the ground;
    // lulled, it settles back down (render/legendSleep.ts: how far asleep it is, 0..1, as `lying`).
    const W = g.tuning.wildLegends, st = c.boss && !c.leashed ? c.legendState : undefined;
    // (Walking home to lie down, Ed 2026-10-06: awake till it gets there, then it settles: c.homing.)
    const sleeping = (st === "asleep" || st === "restless") && !c.homing;
    // Any other creature asleep (c.asleep: the party's over, Ed 2026-10-06): it lies down where it is, the same settling as a legend's,
    // then its own sleeping form (art/naps.js), curled, tucked, coiled or flat; cleared, it gets up again. (Tracked only once it's slept; first seen asleep, it's already lying down.)
    const napping = !st && !!c.asleep;
    let lying = 0, droop = 0;
    if (st || napping || v.legendSleeps.has(c.id)) {
      let tr = v.legendSleeps.get(c.id);
      if (!tr) v.legendSleeps.set(c.id, (tr = newSleepTrack(st ? sleeping : napping)));
      legendSleep(tr, st ? sleeping : napping, st === "angry", time, g.tuning.rig ?? {}, SLEEP); lying = SLEEP.sleep; droop = SLEEP.droop;
      if (!st && !napping && lying <= 0 && droop <= 0) v.legendSleeps.delete(c.id); // (up again: forgotten)
    }
    // Its expression, part of its face (art/genome/expressions.js; render/looks.ts expression): the party looks are happy and the woken one angry already.
    const face = sleeping || lying > 0.5 ? "neutral" : expression(c, time), faced = !party && !woken && face !== "neutral" ? v.assets.faceArt(c.species, face) : undefined;
    // Asleep, its own sleeping form (art/legends.js), drawn once it's baked; until then the awake one sunk, as before.
    // (Ed's round 14 playtest, "it's hard to make out what it is at all": with wildLegends.seen.nap its nap, art/naps.js, the animal itself lying asleep, not a mound)
    const slept = sleeping ? (g.tuning.wildLegends.seen?.nap ? v.assets.napArt(c.species) : v.assets.sleepArt(c.species)) : undefined;
    // Lain down asleep (more than half way: the rig, where it draws, carries it there and back), its nap (art/naps.js), its level's frames.
    const napped = !st && lying > 0.5 ? v.assets.napArt(c.species, party ? { id: c.id, colour: look === "leashed" ? sigilColour(c.species) : null } : undefined) : undefined; // (a party animal asleep in its party gear: Ed, 2026-10-06)
    const art = napped ?? party ?? woken ?? slept ?? faced ?? v.assets.creatureArt(c.species), key = napped ? (party ? `nap-${look === "happy" ? "happy" : "party"}-${c.id}` : `nap-${c.species}`) : party ? `${look === "happy" ? "happy" : "party"}-${c.id}` : slept ? `sleep-${c.species}` : sleeping ? `sunk-${c.species}` : woken ? `woken-${c.species}` : faced ? `face-${face}-${c.species}` : c.species;
    if (!art) continue;
    const lk = c.boss && !c.leashed && g.tuning.wildLegends.seen ? `legend-${key}` : key; // (a wild legend in a batch of its own: its rim and its light in steps)
    if (lk !== key) legendKeys.set(lk, c.species);
    arts.set(lk, art);
    const fi = slept || napped ? art.frame(c.level, Math.floor(time / (slept ? 2.5 : 1.8) + c.id * 0.37)) : art.frame(c.level, strideFrame(v, c, time, art.atlas.frames[art.frame(c.level, 0, c.away)].w * v.mpp * 0.3), c.away), frame = art.atlas.frames[fi]; // (asleep: a slow breath, in and out)
    // A wild legend (Ed, 2026-10-04): bigger and imposing, swelling slowly as it breathes (slower asleep).
    const boss = c.boss && !c.leashed ? g.tuning.wildLegends : null;
    // (its size a constant, so its pixels stay the scene's: its breath a squash in whole art pixels, sy, not a swelling; Ed's round 14 playtest)
    const breath = boss ? 1 + boss.breathe * bossBreath(time, c.id, boss.breathEvery * (dormant(g, c) ? 1.5 : 1)) : 1, bossScale = boss ? boss.scale * (boss.seen ? 1 : breath) : 1, breathY = boss?.seen ? breath : 1;
    if (!inView(v, c.x, c.z, frame.w * v.mpp * bossScale, frame.h * v.mpp * bossScale, 4)) continue;
    const fresh = mark(v, "creature", c.x, c.z, frame.h * v.mpp * (boss ? boss.scale : 1), c.id);
    let l = per.get(lk);
    if (!l) per.set(lk, (l = []));
    // Party animals never stand still: a bounce and a sway on the beat when idle, a little
    // bounce as they go. (Wild ones roam, graze and pause.)
    const ph = (bt / beat + (c.id % 4) * 0.25) * Math.PI;
    const party2 = dances(g, c) && lying <= 0, idle = party2 && !c.moving; // (asleep: still)
    // Each guest its own dance, all up-and-down or side to side, never toward anyone, so a dance never
    // reads as an attack: a bounce, a sway, a hop every other beat, a quick bob; and a foot tapping on the beat (the rig's).
    let dance = party2 ? Math.abs(Math.sin(ph)) * (c.moving ? 0.15 : 0.4) : 0, sway = idle ? Math.sin(ph * 0.5) * 0.12 : 0, tap = 0;
    if (idle) {
      const style = DANCE_STYLES[c.id % DANCE_STYLES.length], b = bt / beat + (c.id % 4) * 0.25, k = b - Math.floor(b);
      if (style === "sway") { dance = Math.abs(Math.sin(ph)) * 0.12; sway = Math.sin(ph * 0.5) * 0.22; }
      else if (style === "hop") { dance = Math.floor(b) % 2 === 0 ? Math.sin(k * Math.PI) * 0.55 : 0; sway = 0; }
      else if (style === "bob") { dance = Math.abs(Math.sin(ph * 2)) * 0.12; sway = Math.sin(ph * 0.25) * 0.06; }
      if (style !== "hop") tap = (Math.floor(b) % 2 ? 1 : -1) * (k < 0.4 ? Math.sin((k / 0.4) * Math.PI) : 0); // left foot, right foot
    }
    // Evolving: glowing white, pulsing on the beat, brighter toward the bar line; then the flash
    // as it becomes its next level, and a pop from 1.3 times its size back to its own.
    const ev = g.berries.evolving.get(c.id), done = v.evolvedAt.get(c.id);
    let glow = 0, scale = bossScale;
    if (ev) {
      const k = Math.min(1, (time - ev.since) / Math.max(0.1, ev.at - ev.since)), pulse = 0.5 + 0.5 * Math.cos((bt / beat) * Math.PI * 2);
      glow = Math.min(1, (0.25 + 0.5 * k) * (0.55 + 0.45 * pulse) + (ev.at - time < 0.12 ? 1 : 0));
    } else if (done !== undefined) {
      const d = time - done;
      glow = Math.max(0, 1 - d / 0.2);
      scale = 1 + 0.3 * Math.max(0, 1 - d / 0.5) ** 2;
    }
    // Wild creatures blink now and then: their eyeshine goes out about find.eyeshine.blink of the time (Ed, v244).
    if (!c.leashed && lying <= 0) { const ph = time * 0.7 + c.id * 0.37; if (hash2(c.id, Math.floor(ph), 41) < g.tuning.find.eyeshine.blink * 6 && ph % 1 < 1 / 6) glow = -1; }
    // Hit: a white flash; the blow's feel (render/attackFeel.ts): crouching in its wind-up, stretched in its lunge, squashed
    // and springing back when hit, tumbling when knocked back.
    if (c.hurtAt !== undefined && time - c.hurtAt < 0.25) glow = Math.max(glow, (1 - (time - c.hurtAt) / 0.25) * (c.level === 3 ? 0.5 : 1)); // (a legend's at half: whole, it whites out the screen; the contact star marks the blow)
    const feel = attackFeel(c, time, g.tuning.attackFx, FEEL);
    // Leaping (Stage 5: the toad): up in an arc over its shadow.
    let hop = c.leap ? Math.sin(Math.min(1, Math.max(0, (time - c.leap.at) / Math.max(0.01, c.leap.lands - c.leap.at))) * Math.PI) * c.leap.height : 0;
    hop += feel.hop; // (a tumble's arc: render/attackFeel.ts)
    // Just joined the party: two little hops of joy, the second smaller (straight up, nothing like a pounce).
    const joined = v.leashView.joined.get(c.id);
    if (joined !== undefined && time - joined < 0.7) { const k = (time - joined) / 0.7; hop += Math.abs(Math.sin(k * Math.PI * 2)) * 0.45 * (1 - k * 0.6); }
    // Fully asleep with its own sleeping form baked (#224, art/legends.js): that, dressed and grown over, its ground line on the
    // ground and no moss tint over its own. Getting up or lying down (render/legendSleep.ts) the rig draws it, sunk a little and
    // mossed by how far asleep it is; so does the baked frame, sunk, until the rig's parts are ready.
    const form = (!!slept && lying >= 0.999) || (!!napped && lying >= 0.999), fh = (frame.h - (frame.pad ?? 0)) * v.mpp * scale;
    const sunk = form || napped ? -(frame.h - (frame.pad ?? 0) - ((slept ?? napped)!.ground?.[fi] ?? frame.h)) * v.mpp * scale * SPRITE_UNIFORMS.uUp.value.y : // (rows run up the screen, tilted: its ground row exactly on the ground)
      st ? -W.sink * lying * fh : 0, rigSunk = st ? -(g.tuning.rig?.sink ?? 0.1) * lying * fh : 0;
    if (form && st) glow = -2; else if (lying > 0 && st) glow = -2 - W.moss * lying; // (a legend's moss; a napping creature is itself)
    // Restless in its sleep (#87, a nightmare): it tosses in bursts, and turns over when it's bad (on the rig, its legs paddle and its head jerks).
    const toss = sleeping ? restlessness(c) : 0, fit = toss ? toss * Math.max(0, Math.sin(time * 1.3 + c.id)) ** 2 : 0;
    if (!(v.rig && !form && v.rig.add(c, { y: dance + hop + (st ? rigSunk : sunk), tap, scale, glow, fresh, h: frame.h - (frame.pad ?? 0), face: lying > 0.5 ? "asleep" : face, sleep: lying, droop, twitch: toss, sx: feel.sx, sy: feel.sy * breathY, crouch: feel.crouch, lunging: feel.lunging, gear: party ? v.rigGear(c, look === "leashed") : c.enraged ? WOKEN_GEAR : undefined }))) // the rig draws it, if it can
    { // (lying down, its body's middle on its place, under which its shadow lies: a sleeping form's frame is often off-centre, a curl, a legend's tails)
      const flip = ((c.facing < 0) !== (toss > 0.5 && Math.floor(time * 0.35 + c.id * 0.13) % 2 === 1)) !== feel.flip, mid = (slept ?? napped)?.centre?.[fi] ?? 0, R = SPRITE_UNIFORMS.uRight.value, k = -mid * v.mpp * scale * (flip ? -1 : 1);
      l.push({ x: c.x + sway + fit * 0.35 * Math.sin(time * 11 + c.id) + R.x * k, y: dance + hop + sunk, z: c.z + R.z * k, frame, flip, fresh, glow, scale, sx: feel.sx, sy: feel.sy * breathY });
    }
    v.leashView.tops.set(c.id, (frame.h - (frame.pad ?? 0)) * v.mpp * scale + dance + hop + sunk); // its health bar goes over it
    // Its shadow under it as drawn (its sway and a nightmare's tossing too), as big as it's drawn (a legend's size, an evolving
    // pop); off the ground (a hop, a leap, a tumble) still on the ground under it, smaller the higher it goes.
    const air = Math.max(0, dance + hop), sk = scale / (1 + air * 0.35);
    creatureShadows.push({ x: c.x + sway + fit * 0.35 * Math.sin(time * 11 + c.id), z: c.z, w: frame.w * v.mpp * 0.7 * sk, d: frame.w * v.mpp * 0.25 * sk });
    n++;
  }
  v.rig?.end();
  for (const [s, b] of v.creatureBatches) if (!per.has(s)) b.set([]);
  for (const [s, list] of per) {
    const k = legendKeys.has(s) ? s.slice(7) : s; // (a legend's batch: as its own key's, plus its look)
    const b = v.batchFor(v.creatureBatches, s, () => { const a = arts.get(s); return a && new SpriteBatch(a.atlas, v.mpp, { solid: true, rim: true, find: !k.startsWith("party-") && !k.startsWith("happy-") && !k.startsWith("woken-") && !k.startsWith("sleep-") && !k.startsWith("nap-"), tint: k.startsWith("woken-") ? ENRAGED_TINT : undefined, ...(legendKeys.has(s) ? legendLook(legendKeys.get(s)!, v.game.tuning) : {}) }); }); // (enraged ones glow red-eyed already) creatures stay solid round her (Ed, v149); wild ones findable in the dark (Ed, v244)
    b?.set(list);
  }
  v.stats.creatures = n;
  if (v.game.tuning.shadows.on) v.shadows.set(v.shadowList.concat(creatureShadows, v.witchShadows));
}

/** A wild legend's batch (Ed's round 14 playtest: "Legends in the circle are not very distinct"; "the same pixel density and palette
 *  discipline as the rest of the scene"): its sleeping outline in its sigil's neon (a little toward white, so a deep colour still shows
 *  at night) and a light floor (render/sprites.ts uLegend: on instances drawn asleep, glow -2), and its light in steps of brightness. */
export function legendLook(species: string, t: Tuning): { legend?: THREE.Vector4; legendFloor?: number; steps?: number } {
  const S = t.wildLegends.seen;
  if (!S) return {};
  return { legend: new THREE.Vector4(...legendNeon(species), S.rim), legendFloor: S.floor, steps: S.steps ?? 0 };
}
