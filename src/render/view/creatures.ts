// The creatures and berries (from render/view.ts, issue #122): each creature's look, dance, glow and
// shadow every frame, and the berries growing back and nibbled.
import type { CreatureArt } from "../assets";
import { ENRAGED_TINT, dances, expression, lookOf } from "../looks";
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
  for (const b of B.berries) {
    const p = B.bushes[b.bush];
    if (Math.abs(p.x - w.x) > R || Math.abs(p.z - w.z) > R || !inView(v, p.x, p.z, 0.5, 1.2, 2)) continue;
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
    // with no find-in-the-dark look. Waking, it heaves up out of the ground.
    const W = g.tuning.wildLegends, st = c.boss && !c.leashed ? c.legendState : undefined;
    const sleeping = st === "asleep" || st === "restless" || st === "slept", rising = st === "waking" || (st === "happy" && (c.stateAt ?? 0) > 0) ? Math.min(1, (time - (c.stateAt ?? 0)) / Math.max(0.1, W.wake * 0.5)) : 1; // (made happy, it stirs and rises contentedly)
    // Its expression, part of its face (art/genome/expressions.js; render/looks.ts expression): the party looks are happy and the woken one angry already.
    const face = sleeping ? "neutral" : expression(c, time), faced = !party && !woken && face !== "neutral" ? v.assets.faceArt(c.species, face) : undefined;
    const art = party ?? woken ?? faced ?? v.assets.creatureArt(c.species), key = party ? `${look === "happy" ? "happy" : "party"}-${c.id}` : sleeping ? `sleep-${c.species}` : woken ? `woken-${c.species}` : faced ? `face-${face}-${c.species}` : c.species;
    if (!art) continue;
    arts.set(key, art);
    const frame = art.atlas.frames[art.frame(c.level, c.moving ? Math.floor(c.walk) % 2 : 0, c.away)];
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
    const party2 = dances(g, c), dance = party2 ? Math.abs(Math.sin(ph)) * (c.moving ? 0.15 : 0.4) : 0, sway = party2 && !c.moving ? Math.sin(ph * 0.5) * 0.12 : 0;
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
    // Hit: a white flash and a little pop (combat: medium hit feel).
    if (c.hurtAt !== undefined && time - c.hurtAt < 0.25) { const k = (time - c.hurtAt) / 0.25; glow = Math.max(glow, 1 - k); scale *= 1 + 0.15 * (1 - k); }
    // Leaping (Stage 5: the toad): up in an arc over its shadow.
    const hop = c.leap ? Math.sin(Math.min(1, Math.max(0, (time - c.leap.at) / Math.max(0.01, c.leap.lands - c.leap.at))) * Math.PI) * c.leap.height : 0;
    const sink = sleeping ? W.sink : W.sink * (1 - rising), sunk = -sink * (frame.h - (frame.pad ?? 0)) * v.mpp * scale;
    if (sleeping) glow = -2 - W.moss; else if (rising < 1) glow = -2 - W.moss * (1 - rising);
    // Restless in its sleep (#87): it tosses in bursts, and turns over when it's bad.
    const toss = st === "asleep" ? restlessness(c) : 0, fit = toss ? toss * Math.max(0, Math.sin(time * 1.3 + c.id)) ** 2 : 0;
    if (!(v.rig && !sleeping && rising >= 1 && v.rig.add(c, { y: dance + hop + sunk, scale, glow, fresh, h: frame.h - (frame.pad ?? 0), face, gear: party ? v.rigGear(c, look === "leashed") : c.enraged ? WOKEN_GEAR : undefined }))) // the rig draws it, if it can
      l.push({ x: c.x + sway + fit * 0.35 * Math.sin(time * 11 + c.id), y: dance + hop + sunk, z: c.z, frame, flip: (c.facing < 0) !== (toss > 0.5 && Math.floor(time * 0.35 + c.id * 0.13) % 2 === 1), fresh, glow, scale });
    v.leashView.tops.set(c.id, (frame.h - (frame.pad ?? 0)) * v.mpp * scale + dance + hop + sunk); // its health bar goes over it
    creatureShadows.push({ x: c.x, z: c.z, w: frame.w * v.mpp * 0.7, d: frame.w * v.mpp * 0.25 });
    n++;
  }
  v.rig?.end();
  for (const [s, b] of v.creatureBatches) if (!per.has(s)) b.set([]);
  for (const [s, list] of per) {
    const b = v.batchFor(v.creatureBatches, s, () => { const a = arts.get(s); return a && new SpriteBatch(a.atlas, v.mpp, { solid: true, find: !s.startsWith("party-") && !s.startsWith("happy-") && !s.startsWith("woken-") && !s.startsWith("sleep-"), tint: s.startsWith("woken-") ? ENRAGED_TINT : undefined }); }); // (enraged ones glow red-eyed already) creatures stay solid round her (Ed, v149); wild ones findable in the dark (Ed, v244)
    b?.set(list);
  }
  v.stats.creatures = n;
  if (v.game.tuning.shadows.on) v.shadows.set(v.shadowList.concat(creatureShadows));
}
