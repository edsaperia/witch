// The creatures and berries (from render/view.ts, issue #122): each creature's look, dance, glow and
// shadow every frame, and the berries growing back and nibbled.
import type { CreatureArt } from "../assets";
import { ENRAGED_TINT, dances, expression, lookOf } from "../looks";

/** The party's dances (dealt by id): a bounce, a sway, a hop every other beat, a quick bob. */
const DANCE_STYLES = ["bounce", "sway", "hop", "bob"] as const;
import type { RigGear } from "../rig/rigBuild";
import type { ShadowInstance } from "../shadows";
import { SpriteBatch, type SpriteInstance } from "../sprites";
import { beatTime } from "../../rules/beat";
import { bossBreath } from "../leash";
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
  const per = new Map<string, SpriteInstance[]>(), arts = new Map<string, CreatureArt>(), creatureShadows: ShadowInstance[] = [];
  const beat = 60 / g.tuning.beat.bpm, bt = beatTime(g.beat, time); // beat-time, on the beat clock
  let n = 0;
  v.rig?.begin(time, g.tuning.rig, g.witch.mode !== "rising" && g.witch.mode !== "treetop");
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
    const sleeping = st === "asleep" || st === "restless";
    let lying = 0, droop = 0;
    if (st) {
      let tr = v.legendSleeps.get(c.id);
      if (!tr) v.legendSleeps.set(c.id, (tr = newSleepTrack(sleeping)));
      legendSleep(tr, sleeping, st === "angry", time, g.tuning.rig ?? {}, SLEEP); lying = SLEEP.sleep; droop = SLEEP.droop;
    }
    // Its expression, part of its face (art/genome/expressions.js; render/looks.ts expression): the party looks are happy and the woken one angry already.
    const face = sleeping ? "neutral" : expression(c, time), faced = !party && !woken && face !== "neutral" ? v.assets.faceArt(c.species, face) : undefined;
    // Asleep, its own sleeping form (art/legends.js), drawn once it's baked; until then the awake one sunk, as before.
    const slept = sleeping ? v.assets.sleepArt(c.species) : undefined;
    const art = party ?? woken ?? slept ?? faced ?? v.assets.creatureArt(c.species), key = party ? `${look === "happy" ? "happy" : "party"}-${c.id}` : slept ? `sleep-${c.species}` : sleeping ? `sunk-${c.species}` : woken ? `woken-${c.species}` : faced ? `face-${face}-${c.species}` : c.species;
    if (!art) continue;
    arts.set(key, art);
    const fi = slept ? Math.floor(time / 2.5 + c.id * 0.37) % 2 : art.frame(c.level, c.moving ? Math.floor(c.walk) % 2 : 0, c.away), frame = art.atlas.frames[fi]; // (asleep: a slow breath, in and out)
    // A wild legend (Ed, 2026-10-04): bigger and imposing, swelling slowly as it breathes (slower asleep).
    const boss = c.boss && !c.leashed ? g.tuning.wildLegends : null;
    const bossScale = boss ? boss.scale * (1 + boss.breathe * bossBreath(time, c.id, boss.breathEvery * (dormant(g, c) ? 1.5 : 1))) : 1;
    if (!inView(v, c.x, c.z, frame.w * v.mpp * bossScale, frame.h * v.mpp * bossScale, 4)) continue;
    const fresh = mark(v, "creature", c.x, c.z, frame.h * v.mpp * (boss ? boss.scale : 1), c.id);
    let l = per.get(key);
    if (!l) per.set(key, (l = []));
    // Party animals never stand still: a bounce and a sway on the beat when idle, a little
    // bounce as they go. (Wild ones roam, graze and pause.)
    const ph = (bt / beat + (c.id % 4) * 0.25) * Math.PI;
    const party2 = dances(g, c), idle = party2 && !c.moving;
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
    if (!c.leashed) { const ph = time * 0.7 + c.id * 0.37; if (hash2(c.id, Math.floor(ph), 41) < g.tuning.find.eyeshine.blink * 6 && ph % 1 < 1 / 6) glow = -1; }
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
    const form = !!slept && lying >= 0.999, fh = (frame.h - (frame.pad ?? 0)) * v.mpp * scale;
    const sunk = form ? -(frame.h - (frame.pad ?? 0) - (slept!.ground?.[fi] ?? frame.h)) * v.mpp * scale : -W.sink * lying * fh, rigSunk = -(g.tuning.rig?.sink ?? 0.1) * lying * fh;
    if (form) glow = -2; else if (lying > 0) glow = -2 - W.moss * lying;
    // Restless in its sleep (#87, a nightmare): it tosses in bursts, and turns over when it's bad (on the rig, its legs paddle and its head jerks).
    const toss = sleeping ? restlessness(c) : 0, fit = toss ? toss * Math.max(0, Math.sin(time * 1.3 + c.id)) ** 2 : 0;
    if (!(v.rig && !form && v.rig.add(c, { y: dance + hop + (st ? rigSunk : sunk), tap, scale, glow, fresh, h: frame.h - (frame.pad ?? 0), face: lying > 0.5 ? "asleep" : face, sleep: lying, droop, twitch: toss, sx: feel.sx, sy: feel.sy, crouch: feel.crouch, lunging: feel.lunging, gear: party ? v.rigGear(c, look === "leashed") : c.enraged ? WOKEN_GEAR : undefined }))) // the rig draws it, if it can
      l.push({ x: c.x + sway + fit * 0.35 * Math.sin(time * 11 + c.id), y: dance + hop + sunk, z: c.z, frame, flip: ((c.facing < 0) !== (toss > 0.5 && Math.floor(time * 0.35 + c.id * 0.13) % 2 === 1)) !== feel.flip, fresh, glow, scale, sx: feel.sx, sy: feel.sy });
    v.leashView.tops.set(c.id, (frame.h - (frame.pad ?? 0)) * v.mpp * scale + dance + hop + sunk); // its health bar goes over it
    creatureShadows.push({ x: c.x, z: c.z, w: frame.w * v.mpp * 0.7, d: frame.w * v.mpp * 0.25 });
    n++;
  }
  v.rig?.end();
  for (const [s, b] of v.creatureBatches) if (!per.has(s)) b.set([]);
  for (const [s, list] of per) {
    const b = v.batchFor(v.creatureBatches, s, () => { const a = arts.get(s); return a && new SpriteBatch(a.atlas, v.mpp, { solid: true, rim: true, find: !s.startsWith("party-") && !s.startsWith("happy-") && !s.startsWith("woken-") && !s.startsWith("sleep-"), tint: s.startsWith("woken-") ? ENRAGED_TINT : undefined }); }); // (enraged ones glow red-eyed already) creatures stay solid round her (Ed, v149); wild ones findable in the dark (Ed, v244)
    b?.set(list);
  }
  v.stats.creatures = n;
  if (v.game.tuning.shadows.on) v.shadows.set(v.shadowList.concat(creatureShadows));
}
