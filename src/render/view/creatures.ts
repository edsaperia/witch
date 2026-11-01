// The creatures and berries (from render/view.ts, issue #122): each creature's look, dance, glow and
// shadow every frame, and the berries growing back and nibbled.
import { characterOf, quirkAt, bounceAt, spriteQuirk } from "../character";
import * as THREE from "three";
import type { Tuning } from "../../rules/tuning";
import { cycloneLift } from "../../rules/hatSpells";
import type { CreatureArt } from "../assets";
import { ENRAGED_TINT, dances, expression, lookOf } from "../looks";

/** The party's dances (dealt by id): a bounce, a sway, a hop every other beat, a quick bob. */
const DANCE_STYLES = ["bounce", "sway", "hop", "bob"] as const;
import type { RigGear } from "../rig/rigBuild";
import type { RigLook } from "../rig/rigView";
import type { ShadowInstance } from "../shadows";
import { SHADOW_LOOK, SPRITE_UNIFORMS, SpriteBatch, type SpriteInstance } from "../sprites";
import { beatTime } from "../../rules/beat";
import { congaBody, congaPose, newCongaPose } from "../conga";
import { bossBreath, legendNeon } from "../leash";
import { dormant } from "../../rules/game";
import { hash2 } from "../../rules/random";
import { restlessness } from "../../rules/dream";
import { glideOf } from "../../rules/movement";
import { sigilColour } from "../../../art/generator.js";
import type { View } from "../view";
import type { Style } from "../style";
import { coatLuminance, legendFloor } from "../legendLight";
import { legendGlow, outlineIn } from "../legendOutline";
import { aggroAmount, aggroFadeOut, aggroGlow } from "../aggro";
import { cellKey } from "../../rules/party";
import { legendRings } from "../../rules/slowTime";
import { flightHeight } from "../../rules/movement";
import { inView } from "./culling";
import { mark } from "./pops";
import { attackFeel, newFeel } from "../attackFeel";
import { impactOf } from "../impact";
import { creatureHeat } from '../thermalVision';
import { cheerKind, cheerPose, type CheerPose } from "../cheer";
import { legendSleep, newSleepTrack, type SleepPose } from "../legendSleep";
import { potionStrength, stiltwalkerShape } from '../potionEffects';
/** How near her (m) a rattlesnake rattles its warning (config/character.json's "rattle" quirk). */
const RATTLE_NEAR = 14;
const SQ = { hop: 0, x: 0, sx: 1, sy: 1, turned: false }; // (a baked frame's idle quirk, filled each creature: no allocation)
const CP = newCongaPose(); // (a conga dancer's step, filled each creature: no allocation)

const FEEL = newFeel(); // (filled per creature, never kept)
const IMPACT = { flash: 0, sx: 1, sy: 1 }; // (likewise: render/impact.ts)
const CHEER: CheerPose = { y: 0, x: 0, sx: 1, sy: 1, flip: false }; // (likewise: render/cheer.ts)
const SLEEP: SleepPose = { sleep: 0, droop: 0 }; // (likewise)
const FWD = new THREE.Vector3(), CAM_UP = new THREE.Vector3(); // (the camera's look and up, a frame's working)

/** The baked walk's frame (0 or 1) by how far it has gone as drawn (Ed's playtest: feet walking in place, or not walking while it
 *  moves): a step every `step` metres, standing (frame 0) once it has stopped for a quarter of a second. One small record per creature. */
function strideFrame(v: View, c: { id: number; x: number; z: number }, time: number, step: number, frames = 2): number {
  let o = v.strides.get(c.id);
  if (!o) v.strides.set(c.id, (o = { x: c.x, z: c.z, d: 0, at: -1 }));
  const d = Math.hypot(c.x - o.x, c.z - o.z);
  if (d > 1e-3 && d < 3) { o.d += d; o.at = time; } // (a jump of metres is a teleport, not a step)
  o.x = c.x; o.z = c.z;
  return time - o.at < 0.25 ? Math.floor(o.d / Math.max(0.05, step)) % frames : 0;
}

const WOKEN_GEAR: RigGear = { woken: true };

// The frame's lists and records, kept and refilled (the churn hunt, 2026-10-13: four maps, every list, a record a creature and a
// record a berry were made each frame, and the scenery's whole shadow list copied to add the creatures' to it).
const NONE: SpriteInstance[] = []; // (a batch with nothing in it this frame: one shared empty list)
const PER = new Map<string, SpriteInstance[]>(), ARTS = new Map<string, CreatureArt>(), LEGEND_KEYS = new Map<string, string>();
const RING_OF = new Map<number, ReturnType<typeof legendRings>[number]>();
const SHADOWS: ShadowInstance[] = [], SHADOW_POOL: ShadowInstance[] = [], INST_POOL: SpriteInstance[] = [], BERRY_ITEMS: SpriteInstance[] = [], BERRY_POOL: SpriteInstance[] = [];
const emptyList = (l: SpriteInstance[]): void => { l.length = 0; };
let LAST_VIEW: View | null = null; // (the maps are the view's: another view starts them afresh; within one they're only ever written over, never cleared, as clearing a Map makes a new table each frame)
/** Another night in the same view (View.setGame): its batches' lists, art, legends' keys and circles, kept by creature, all forgotten. */
export function resetCreatureCaches(): void { PER.clear(); ARTS.clear(); LEGEND_KEYS.clear(); RING_OF.clear(); LAST_VIEW = null; }
/** How many records the caches hold (the test's). */
export const creatureCacheSizes = (): number[] => [PER.size, ARTS.size, LEGEND_KEYS.size, RING_OF.size];
/** A sprite instance from a pool, every field written (so one from a past frame carries nothing over). */
function inst(pool: SpriteInstance[], i: number, x: number, y: number, z: number, frame: SpriteInstance["frame"], flip: boolean, fresh: boolean | undefined, glow: number | undefined, scale: number | undefined, sx: number | undefined, sy: number | undefined): SpriteInstance {
  let o = pool[i];
  if (!o) pool[i] = o = { x, y, z, frame, flip, fresh, glow, scale, sx, sy };
  else { o.x = x; o.y = y; o.z = z; o.frame = frame; o.flip = flip; o.fresh = fresh; o.glow = glow; o.scale = scale; o.sx = sx; o.sy = sy; }
  return o;
}
/** A batch's key, "<a>-<b>", made once (a string a creature a frame before). */
const KEYS = new Map<string, Map<string | number, string>>();
function keyOf(a: string, b: string | number): string {
  let m = KEYS.get(a);
  if (!m) KEYS.set(a, (m = new Map()));
  let k = m.get(b);
  if (k === undefined) m.set(b, (k = `${a}-${b}`));
  return k;
}
const FACE_KEY: Record<string, string> = {};
/** The rig's look record, one for every creature in turn (the rig reads it as it adds the creature and keeps nothing of it). */
const LOOK: RigLook = { y: 0, tap: 0, scale: 1, glow: 0, fresh: false, h: 0, face: "neutral", sleep: 0, droop: 0, twitch: 0, sx: 1, sy: 1, dx: 0, dz: 0, crouch: 0, lunging: false, gear: undefined, posture: undefined, quirk: undefined, quirkK: -1, lookAt: undefined } as RigLook;

export function drawBerries(v: View, time: number): void {
  const g = v.game, B = g.berries, w = g.witch, R = g.tuning.haze.far, f = v.berryBatch.atlas.frames[0], items = BERRY_ITEMS;
  let n = 0;
  for (const e of B.events) {
    if (e.kind === "regrew") v.regrewAt.set(e.id, time);
    if (e.kind === "evolved") v.evolvedAt.set(e.id, time);
    if (e.kind === "ate") v.nibbles.push({ x: e.x, z: e.z, at: time });
  }
  if (v.regrewAt.size) for (const [id, at] of v.regrewAt) if (time - at > 0.6) v.regrewAt.delete(id);
  // The nibble (Ed, v233): a quick sparkle where a berry was eaten, white bits bursting out and fading.
  if (v.nibbles.length) v.nibbles = v.nibbles.filter(n => time - n.at < 0.45);
  for (const nb of v.nibbles) {
    const k = (time - nb.at) / 0.45;
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + nb.x, r = 0.25 + k * 0.9;
      items[n] = inst(BERRY_POOL, n, nb.x + Math.cos(a) * r, 0.75 + Math.sin(a) * r * 0.7 + k * 0.4, nb.z + 0.3, f, false, undefined, 1, 0.45 * (1 - k), undefined, undefined); n++;
    }
  }
  if (v.evolvedAt.size) for (const [id, at] of v.evolvedAt) if (time - at > 1.2) v.evolvedAt.delete(id);
  const V = v.lastView, VH = V ? V.half + 4 : Infinity; // (the scenery's square first: much cheaper than inView)
  const bs = B.berries;
  for (let i = 0; i < bs.length; i++) { // (by index: no iterator a frame)
    const b = bs[i];
    if (b.gone) continue; // (a Harvest berry eaten)
    const p = B.bushes[b.bush];
    if (Math.abs(p.x - w.x) > R || Math.abs(p.z - w.z) > R || (V && (Math.abs(p.x - V.x) > VH || Math.abs(p.z - V.z) > VH)) || !inView(v, p.x, p.z, 0.5, 1.2, 2)) continue;
    const at = v.regrewAt.get(b.id), grow = at === undefined ? 1 : Math.min(1, (time - at) / 0.5);
    if (grow <= 0.05) continue;
    items[n] = inst(BERRY_POOL, n, p.x, 0.75, p.z + 0.25, f, false, undefined, undefined, grow, undefined, undefined); n++;
  }
  items.length = n;
  v.berryBatch.set(items);
  v.stats.berries = n;
}

export function drawCreatures(v: View, time = 0): void {
  const g = v.game, R = g.tuning.haze.far + 20;
  const stilts = stiltwalkerShape(potionStrength(g, 'stiltwalkers'));
  const per = PER, arts = ARTS, legendKeys = LEGEND_KEYS; // (kept and refilled)
  if (v !== LAST_VIEW) { LAST_VIEW = v; per.clear(); arts.clear(); legendKeys.clear(); RING_OF.clear(); }
  per.forEach(emptyList);
  const beat = 60 / g.tuning.beat.bpm, bt = beatTime(g.beat, time); // beat-time, on the beat clock
  let n = 0, ni = 0, ns = 0; // (drawn; instances and shadows taken from the pools)
  v.rig?.begin(time, g.tuning.rig, g.witch.mode !== "rising" && g.witch.mode !== "treetop");
  if (v.rig && !v.rig.legendLook) v.rig.legendLook = sp => legendLook(sp, g.tuning, v.style);
  const WW = g.tuning.wildWatch?.on ? g.tuning.wildWatch : null; // (the wild watch's rising aggro)
  const ringOf = RING_OF, rings = legendRings(g); // (each legend's circle: its outline shows only with her in it)
  for (let i = 0; i < rings.length; i++) ringOf.set(rings[i].id, rings[i]);
  // How far towards the camera a sprite's rows below its ground line land, a metre of rows (as soundsystemGen.ts stands them, #564).
  const U = SPRITE_UNIFORMS.uUp.value, F = v.camera.getWorldDirection(FWD), toward = U.dot(CAM_UP.set(0, 1, 0).applyQuaternion(v.camera.quaternion)) / Math.max(0.2, -F.y);
  for (let i = 0; i < g.creatures.length; i++) { // (by index: no iterator object a creature)
    const c = g.creatures[i];
    if ((c.gone && !c.beached) || Math.abs(c.x - g.witch.x) > R || Math.abs(c.z - g.witch.z) > R) continue;
    if (c.burrow) continue; // under the ground (Stage 5: the mole), a mound shows where (leash view)
    // Up the trees, underground or under water in a pack's lull (rules/combat/packs.ts; Ed, 2026-10-29: "'hiding' maybe should look like
    // the animal becoming a shadow (dark and transparent), rather than teleporting"): a shadow of itself running round to where it comes
    // back, fading to it as it hides and back as it comes out (combat.packs.shadow); with no shadow look, out of sight as before.
    const hide = c.packHide, SH = g.tuning.combat.packs?.shadow;
    if (hide && !SH) continue;
    const shadowK = hide && SH ? Math.max(0, Math.min(1, (g.clock.time - (hide.at ?? -Infinity)) / Math.max(1e-3, SH.fade), (hide.until - g.clock.time) / Math.max(1e-3, SH.fade))) : 0;
    // (its species' art asked for only once it may be on screen, by the biggest a creature is drawn, a legend's: the first
    // frame's creatures first, not every one within the haze; the island's own come ahead of need, view.ts askIsland)
    if (!v.assets.hasCreature(c.species) && !inView(v, c.x, c.z, 40, 50 * stilts.length, 4)) continue;
    if (g.map.zoo?.layout && !v.assets.hasCreature(c.species)) v.assets.hurryCreature(c.species); // (the zoo: on screen, ahead of all its islands' art asked ahead)
    // Invited creatures are party animals: their party gear once it's drawn (the wild look till then).
    // Happy ones (issue #87) in party clothes without the collar; legends never dressed up (render/looks.ts).
    const look = lookOf(c), party = look === "leashed" && !c.boss ? v.assets.partyArt(c.species, c.id, sigilColour(c.species), c.level) : look === "happy" ? v.assets.happyArt(c.species, c.id, c.level) : undefined;
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
    const asleepArt = !st && lying > 0.5 ? v.assets.napArt(c.species, party ? { id: c.id, colour: look === "leashed" ? sigilColour(c.species) : null } : undefined) : undefined; // (a party animal asleep in its party gear: Ed, 2026-10-06)
    // Its idle pose (Ed, 2026-10-12: the meerkat "sits up as a sentinel when idle"; config/character.json's "sentinel" quirk, art/creatures.js
    // IDLE_BUILDERS): while the quirk plays and it stands still, wild, its own baked frames stand in for the rig, as a nap's do. The
    // rattlesnake's "rattle" (Ed, 2026-10-13: "it rattles only near the witch, as a warning"): its rattle raised and shaking while she's
    // within RATTLE_NEAR metres of it or its area is watching her.
    const ch0 = characterOf(c.species), still = !asleepArt && !party && !woken && !st && lying <= 0 && !c.moving && !c.charge && !c.leap;
    const warns = ch0.quirk === "rattle" && ((c.watchUntil !== undefined && g.clock.time < c.watchUntil) || Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < RATTLE_NEAR);
    const idlePose = still && ((ch0.quirk === "sentinel" && quirkAt(c.id, ch0, time) >= 0) || warns) ? v.assets.idleArt(c.species) : undefined;
    const napped = asleepArt ?? idlePose;
    // Gliding (Profile.glide: the flying squirrel's roam and its pounce, Ed 2026-10-12): in the air, spread out, its membrane taut; the rig leaves it to the baked frames.
    const glided = !napped && !st && !!c.leap && time >= c.leap.at && !!glideOf(c.species) ? v.assets.glideArt(c.species) : undefined;
    const art = glided ?? napped ?? party ?? woken ?? slept ?? faced ?? v.assets.creatureArt(c.species), key = glided ? keyOf("glide", c.species) : idlePose && !asleepArt ? keyOf("idle", c.species) : napped ? (party ? keyOf(keyOf(look === "happy" ? "nap-happy" : "nap-party", c.species), c.id) : keyOf("nap", c.species)) : party ? party.key! : slept ? keyOf("sleep", c.species) : sleeping ? keyOf("sunk", c.species) : woken ? keyOf("woken", c.species) : faced ? keyOf((FACE_KEY[face] ??= `face-${face}`), c.species) : c.species;
    if (!art) continue;
    const lk = hide ? keyOf("shadow", key) : c.boss && !c.leashed && g.tuning.wildLegends.seen ? keyOf("legend", key) : key; // (a wild legend in a batch of its own: its rim and its light in steps; one hiding, in a shadow batch)
    if (lk !== key) legendKeys.set(lk, c.species);
    arts.set(lk, art);
    const gait = art.walk, fi = glided ? art.frame(c.level, Math.floor(time * 3 + c.id * 0.37) % 2) : slept || napped ? art.frame(c.level, Math.floor(time / (slept ? 2.5 : 1.8) + c.id * 0.37) % 2) : art.frame(c.level, strideFrame(v, c, time, art.atlas.frames[art.frame(c.level, 0, c.away)].w * v.mpp * (gait?.step ?? 0.3), gait?.frames ?? 2), c.away), frame = art.atlas.frames[fi]; // (walking: its cycle by the distance it's gone, a planted foot staying put) // (asleep: a slow breath, in and out)
    // A wild legend (Ed, 2026-10-04): bigger and imposing, swelling slowly as it breathes (slower asleep).
    const boss = c.boss && !c.leashed ? g.tuning.wildLegends : null;
    // (its size a constant, so its pixels stay the scene's: its breath a squash in whole art pixels, sy, not a swelling; Ed's round 14 playtest)
    const breath = boss ? 1 + boss.breathe * bossBreath(time, c.id, boss.breathEvery * (dormant(g, c) ? 1.5 : 1)) : 1, bossScale = boss ? boss.scale * (boss.seen ? 1 : breath) : 1, breathY = boss?.seen ? breath : 1;
    if (!inView(v, c.x, c.z, frame.w * v.mpp * bossScale, frame.h * v.mpp * bossScale * stilts.length, 4)) continue;
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
    // The win's conga (rules/win.ts: c.finale its place in the line, going anticlockwise round the dancefloor): its body's step on the
    // beat instead of its dance (render/conga.ts), leaning forward along the line onto the back of the one ahead, swaying across it.
    let cx = 0, cz = 0, csx = 1, csy = 1;
    if (c.finale !== undefined && c.finale >= 0 && g.win?.phase === "won" && lying <= 0) {
      const P = congaPose(congaBody(c.species), bt / beat, c.finale, CP), hM = (frame.h - (frame.pad ?? 0)) * v.mpp, wM = frame.w * v.mpp;
      const d0 = g.map.dancefloor, a = Math.atan2(c.z - d0.z, c.x - d0.x), fx = -Math.sin(a), fz = Math.cos(a); // (along the line, and across it: out from the floor)
      dance = P.y * hM; sway = 0; tap = P.tap; csx = P.sx; csy = P.sy;
      cx = fx * P.lean * wM + Math.cos(a) * P.sway * hM; cz = fz * P.lean * wM + Math.sin(a) * P.sway * hM;
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
    // A wild area watching her come down (rules/wildWatch.ts): its watchers redden together as their minds make up (render/aggro.ts).
    // When it ends (it attacks, is invited, gives up, she leaves), the red eases out from where it was (v.aggroLast).
    if (glow <= 0 && WW) {
      const e = c.watchUntil !== undefined && g.clock.time < c.watchUntil ? g.wildEntry.get(cellKey(c.cell)) : undefined;
      if (e) { const a = aggroAmount(1 - (c.watchUntil! - g.clock.time) / Math.max(1e-6, WW.time), e.danger, WW.tint); const r = v.aggroLast.get(c.id); if (r) { r.a = a; r.at = time; } else v.aggroLast.set(c.id, { a, at: time }); glow = aggroGlow(a); }
      else { const l = v.aggroLast.get(c.id); if (l) { const a = aggroFadeOut(l.a, time - l.at, WW.fade); if (a > 0.005) glow = aggroGlow(a); else v.aggroLast.delete(c.id); } }
    }
    const feel = attackFeel(c, time, g.tuning.attackFx, FEEL);
    // A 💌 just landed on it (render/impact.ts): an instant's white flash and a little squash, springing back.
    const imp = impactOf(g.clock, c.id, g.tuning.invites.impact, IMPACT);
    if (imp.flash > 0) glow = Math.max(glow, imp.flash);
    feel.sx *= imp.sx; feel.sy *= imp.sy;
    // Leaping (Stage 5: the toad): up in an arc over its shadow.
    const L = c.leap ?? c.hop; // (a leap, or a hopper's bound: rules/movement.ts)
    let hop = L ? Math.sin(Math.min(1, Math.max(0, (time - L.at) / Math.max(0.01, L.lands - L.at))) * Math.PI) * L.height : 0;
    hop += feel.hop; // (a tumble's arc: render/attackFeel.ts)
    hop += flightHeight(c, time); // (a wild flyer swooping: up out of reach over its shadow, rules/movement.ts stepSwoop)
    // Won over just now: it celebrates by its body, a jump-spin, a roll-over, a loop or a wiggle (render/cheer.ts; rules/affection.ts).
    if (c.cheerUntil !== undefined && time < c.cheerUntil) {
      const P2 = cheerPose(cheerKind(c.species), 1 - (c.cheerUntil - time) / (g.tuning.invites.cheer?.secs ?? 1), CHEER), hM2 = (frame.h - (frame.pad ?? 0)) * v.mpp * scale, R2 = SPRITE_UNIFORMS.uRight.value;
      hop += P2.y * hM2; cx += R2.x * P2.x * hM2; cz += R2.z * P2.x * hM2;
      feel.sx *= P2.sx; feel.sy *= P2.sy; if (P2.flip) feel.flip = !feel.flip;
    }
    for (let wi = 0; wi < g.witches.length; wi++) { const W = g.witches[wi]; if (W.spells.cyc) hop += cycloneLift(W.spells, c.id, g.clock.time, g.tuning); } // (whirled up by her Cyclone hat: rules/hatSpells.ts)
    // Just joined the party: two little hops of joy, the second smaller (straight up, nothing like a pounce).
    const joined = v.leashView.joined.get(c.id);
    if (joined !== undefined && time - joined < 0.7) { const k = (time - joined) / 0.7; hop += Math.abs(Math.sin(k * Math.PI * 2)) * 0.45 * (1 - k * 0.6); }
    // Fully asleep with its own sleeping form baked (#224, art/legends.js): that, dressed and grown over, its ground line on the
    // ground and no moss tint over its own. Getting up or lying down (render/legendSleep.ts) the rig draws it, sunk a little and
    // mossed by how far asleep it is; so does the baked frame, sunk, until the rig's parts are ready.
    const form = (!!slept && lying >= 0.999) || (!!napped && lying >= 0.999), fh = (frame.h - (frame.pad ?? 0)) * v.mpp * scale;
    // Its own sleeping form stands on its lowest drawn pixel, the rows below its ground line on the ground nearer the camera (Ed,
    // 2026-10-08: legends "tend to be halfway in the floor": slid down the billboard instead, those rows went under the ground and
    // were cut off, as the soundsystems' were, #564); its frame's empty rows (pad) taken off. Lying down without one, sunk by sink.
    const below = form || napped ? Math.max(0, frame.h - (frame.pad ?? 0) - ((slept ?? napped)!.ground?.[fi] ?? frame.h)) * v.mpp * scale : 0, padM = (frame.pad ?? 0) * v.mpp * scale;
    const sunk = form || napped ? -U.y * padM : st ? -W.sink * lying * fh : 0, rigSunk = st ? -(g.tuning.rig?.sink ?? 0.1) * lying * fh : 0;
    // (a legend's moss, and its outline only while she's in its circle: render/legendOutline.ts; a napping creature is itself)
    if (st && (form || lying > 0)) { const ring = ringOf.get(c.id); glow = legendGlow(form ? 0 : W.moss * lying, ring ? outlineIn(Math.hypot(g.witch.x - ring.x, g.witch.z - ring.z), ring.r) : 0); }
    // Restless in its sleep (#87, a nightmare): it tosses in bursts, and turns over when it's bad (on the rig, its legs paddle and its head jerks).
    const toss = sleeping ? restlessness(c) : 0, fit = toss ? toss * Math.max(0, Math.sin(time * 1.3 + c.id)) ** 2 : 0;
    // Its character (render/character.ts, config/character.json): the posture it holds, its idle quirk while it stands about (not
    // fighting, dancing or asleep), and a happy creature's bounce now and then (a party or happy one not dancing).
    const ch = characterOf(c.species), standing = !c.moving && !c.charge && !c.leap && lying <= 0 && !party2 && !feel.crouch && !feel.lunging;
    const watching = c.watchUntil !== undefined && g.clock.time < c.watchUntil; // (a wild area watching her come down, rules/wildWatch.ts: still, no idle quirk, turned to her)
    const quirkK = standing && !watching ? quirkAt(c.id, ch, time) : -1;
    if (standing && (look === "leashed" || look === "happy") && !c.boss) hop += bounceAt(c.id, time);
    // How its frame is drawn: mirrored for its facing (a nightmare tossing, a tumble, a look back turn it over), and how far its
    // body's middle lies from its place (a sleeping form's frame is often off-centre: a curl, a legend's tails).
    const flip = ((c.facing < 0) !== (toss > 0.5 && Math.floor(time * 0.35 + c.id * 0.13) % 2 === 1)) !== feel.flip, mid = (slept ?? napped)?.centre?.[fi] ?? 0, RT = SPRITE_UNIFORMS.uRight.value;
    let rigged = false;
    const heat = creatureHeat(c, feel.lunging || feel.crouch > 0);
    if (hide) glow = shadowK; // (a shadow batch's glow: how far gone to its shadow)
    if (v.rig && !hide && (stilts.length > 1 || (!form && !idlePose && !glided))) { // the rig draws it, if it can (its look record filled in place: one for every creature)
      const L = LOOK;
      L.heat = heat;
      L.stiltLength = stilts.length; L.stiltTip = stilts.tip; L.stiltStrength = stilts.strength;
      L.y = dance + hop + (st ? rigSunk : stilts.length > 1 ? 0 : sunk); L.tap = tap; L.scale = scale; L.glow = glow; L.fresh = fresh; L.h = frame.h - (frame.pad ?? 0); L.face = lying > 0.5 ? "asleep" : face; L.sleep = lying; L.droop = droop; L.twitch = toss;
      L.sx = feel.sx * csx; L.sy = feel.sy * breathY * csy; L.dx = cx; L.dz = cz; L.crouch = feel.crouch; L.lunging = feel.lunging; L.gear = party ? v.rigGear(c, look === "leashed") : c.enraged ? WOKEN_GEAR : undefined; L.posture = ch.rig; L.quirk = ch.quirk; L.quirkK = quirkK; L.lookAt = watching ? g.witch : undefined;
      rigged = v.rig.add(c, L);
    }
    if (!rigged) { // (lying down, its body's middle on its place, under which its shadow lies: a sleeping form's frame is often off-centre, a curl, a legend's tails)
      spriteQuirk(ch.sprite, quirkK, time, SQ); // (its idle quirk as a whole frame can show it: a hop, a puff, a look back, a shiver)
      const turned = flip !== SQ.turned, k = -mid * v.mpp * scale * (turned ? -1 : 1) + SQ.x * fh;
      const near = below * toward - (form || napped ? U.z * padM : 0), nx = form || napped ? -U.x * padM : 0;
      l.push(inst(INST_POOL, ni++, c.x + cx + sway + fit * 0.35 * Math.sin(time * 11 + c.id) + RT.x * k + nx, dance + hop + sunk + SQ.hop * fh, c.z + cz + RT.z * k + near, frame, turned, fresh, glow, scale, feel.sx * SQ.sx * csx, feel.sy * breathY * SQ.sy * csy));
      l[l.length - 1].heat = heat;
    }
    v.leashView.tops.set(c.id, (frame.h - (frame.pad ?? 0)) * v.mpp * scale + dance + hop + sunk + (rigged ? v.rig!.stiltRises.get(c.id) ?? 0 : 0)); // its health bar goes over it
    v.leashView.halfW.set(c.id, frame.w * v.mpp * scale * 0.5);
    // Where its head is (Ed, 2026-10-12: bubbles' tails "point at creatures' heads"): its frame's head point (render/artBuild.ts
    // headPoint), mirrored with it, along the camera's right from where it's drawn; bubbles stand over it.
    const hd = frame.head ? ((frame.head[0] - frame.w / 2) * (flip ? -1 : 1) - mid * (flip ? -1 : 1)) * v.mpp * scale : 0;
    const rh = rigged ? v.rig!.heads.get(c.id) : undefined; // (drawn by the rig: its head piece, turned to its real heading)
    let hp = v.leashView.heads.get(c.id); if (!hp) v.leashView.heads.set(c.id, (hp = { x: 0, z: 0 })); // (its record kept, read each frame)
    if (rh) { hp.x = rh.x; hp.z = rh.z; } else { hp.x = c.x + cx + sway + RT.x * hd; hp.z = c.z + cz + RT.z * hd; }
    // Its shadow under it as drawn (its sway and a nightmare's tossing too), as big as it's drawn (a legend's size, an evolving
    // pop); off the ground (a hop, a leap, a tumble) still on the ground under it, smaller the higher it goes.
    const air = Math.max(0, dance + hop), sk = scale / (1 + air * 0.35);
    { let s = SHADOW_POOL[ns]; if (!s) SHADOW_POOL[ns] = s = { x: 0, z: 0, w: 0, d: 0 }; ns++; s.x = c.x + cx + sway + fit * 0.35 * Math.sin(time * 11 + c.id); s.z = c.z + cz; s.w = frame.w * v.mpp * 0.7 * sk; s.d = frame.w * v.mpp * 0.25 * sk; }
    n++;
  }
  v.rig?.end();
  { const SH = g.tuning.combat.packs?.shadow; if (SH) SHADOW_LOOK.value.set(1, SH.shade, SH.opacity, 0); } // (the shadows' look, live from the knobs)
  v.creatureBatches.forEach(clearUnused);
  const now = performance.now();
  per.forEach((list, s) => {
    if (!list.length) return;
    v.creatureUsed.set(s, now); // (drawn: kept by the GPU budget, view/gpuBudget.ts)
    let b = v.creatureBatches.get(s);
    if (!b) {
      if (s.startsWith("shadow-")) { b = v.batchFor(v.creatureBatches, s, () => { const a = arts.get(s); return a && new SpriteBatch(a.atlas, v.mpp, { solid: true, rim: true, shadow: true }); }); b?.set(list); return; } // (pack members hiding: render/sprites.ts SHADOW_LOOK)
      const k = legendKeys.has(s) ? s.slice(7) : s; // (a legend's batch: as its own key's, plus its look)
      b = v.batchFor(v.creatureBatches, s, () => { const a = arts.get(s); return a && new SpriteBatch(a.atlas, v.mpp, { solid: true, rim: true, find: !k.startsWith("party-") && !k.startsWith("happy-") && !k.startsWith("woken-") && !k.startsWith("sleep-") && !k.startsWith("nap-"), tint: k.startsWith("woken-") ? ENRAGED_TINT : undefined, ...(legendKeys.has(s) ? legendLook(legendKeys.get(s)!, v.game.tuning, v.style) : {}) }); }); // (enraged ones glow red-eyed already) creatures stay solid round her (Ed, v149); wild ones findable in the dark (Ed, v244)
    }
    b?.set(list);
  });
  v.stats.creatures = n;
  if (v.game.tuning.shadows.on) { // (the scenery's shadows, the creatures', then hers: one list refilled, not the scenery's copied each frame)
    const all = SHADOWS, sl = v.shadowList, ws = v.witchShadows; all.length = 0;
    for (let i = 0; i < sl.length; i++) all.push(sl[i]);
    for (let i = 0; i < ns; i++) all.push(SHADOW_POOL[i]);
    for (let i = 0; i < ws.length; i++) all.push(ws[i]);
    v.shadows.set(all);
  }
}
/** A batch with no creature in it this frame shows nothing. */
const clearUnused = (b: SpriteBatch, s: string): void => { const l = PER.get(s); if (!l || !l.length) b.set(NONE); };

/** A wild legend's batch (Ed's round 14 playtest: "Legends in the circle are not very distinct"; "the same pixel density and palette
 *  discipline as the rest of the scene"): its sleeping outline in its sigil's neon (a little toward white, so a deep colour still shows
 *  at night) and a light floor (render/sprites.ts uLegend: on instances drawn asleep, glow -2), and its light in steps of brightness. */
export function legendLook(species: string, t: Tuning, style: Style): { legend?: THREE.Vector4; legendFloor?: number; legendAwake?: number; steps?: number } {
  const S = t.wildLegends.seen;
  if (!S) return {};
  const floor = legendFloor(S.floor, coatLuminance(species, style), S.dark, S.liftMax); // (a dark coat's floor raised: render/legendLight.ts)
  return { legend: new THREE.Vector4(...legendNeon(species), S.rim), legendFloor: floor, legendAwake: floor > S.floor ? floor : 0, steps: S.steps ?? 0 }; // (and awake too, only for those raised)
}
