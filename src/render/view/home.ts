// Home's pieces (from render/view.ts, issue #122): the rune stones' markers, beacons, symbols and wave
// numbers, the dancefloor's ring of speakers, and the treehouse stood on its spot.
import * as Art from "../../../art/generator.js";
import * as THREE from "three";
import { AREA_TYPES } from "../../rules/map";
import { type Beacon, type Laser, MARKER_LEVELS, type Mote, type RingSymbol } from "../markers";
import { SPRITE_UNIFORMS, SpriteBatch, type SpriteInstance } from "../sprites";
import type { WaveNumber } from "../waveNumbers";
import { beatTime } from "../../rules/beat";
import { canopyShown } from "../../rules/witch";
import { cellKey, spawnMarkers, speakersOn, symbolCount, waveCountdown, wavePlan } from "../../rules/party";
import { hash2 } from "../../rules/random";
import type { ForestLight, View } from "../view";
import { inView, overBulge } from "./culling";
import { mark } from "./pops";

/** The wave numbers' colour over areas the party has reached (spent). */
const SPENT = new THREE.Vector3(0.7, 0.7, 0.8);

/** The spawn markers (rune stones where soundsystems will come): their sprites, beacons and
 *  motes; returns the lights of the nearest. */
export function drawMarkers(v: View, time: number): ForestLight[] {
  const g = v.game, t = g.tuning, R = t.runeMarkers, w = g.witch, range = t.haze.far + 20, mc = v.markerCache;
  if (mc.wave !== g.party.wave || mc.n !== g.party.areas.size) { mc.wave = g.party.wave; mc.n = g.party.areas.size; mc.list = spawnMarkers(g.party, g.map); }
  const cd = waveCountdown(g.party, g.map, time), build = g.party.paused ? 0 : cd.gone;
  const phase = (beatTime(g.beat, time) * t.beat.bpm) / 60, beat = Math.pow(0.5 + 0.5 * Math.cos(phase * Math.PI * 2), 2); // 1 on the beat
  const inst: SpriteInstance[] = [], lights: ForestLight[] = [], beacons: Beacon[] = [], motes: Mote[] = [], lasers: Laser[] = [], symbols: RingSymbol[] = [];
  const style = R.awakeStyle, column = style !== "beam", laser = style !== "column";
  const scale = R.scale;
  const stone = (x: number, z: number, species: string, level: number, y = 0) => {
    const frame = v.markerArt.atlas.frames[v.markerArt.frame(species, level)];
    if (!inView(v, x, z, frame.w * v.mpp * scale, frame.h * v.mpp * scale, 6)) return false;
    inst.push({ x, y, z, frame, flip: false, scale, fresh: mark(v, "marker", x, z, frame.h * v.mpp * scale) });
    return true;
  };
  const near: { d: number; l: ForestLight }[] = [];
  for (const m of mc.list) {
    const d = Math.hypot(m.x - w.x, m.z - w.z);
    if (d > range) continue;
    const species = AREA_TYPES[g.map.typeOf(m.cell[0], m.cell[1])].creature, col = v.markerArt.colour.get(species)!;
    // Awake: brighter on the beat, more so as the countdown runs out; dormant: a steady glow.
    const level = m.awake ? 1 + Math.round(Math.min(1, beat * (0.4 + 0.6 * build)) * (MARKER_LEVELS - 2)) : 0;
    stone(m.x, m.z, species, level);
    // The beam and laser rise from the top of the stone, not from inside it.
    const top = (v.markerArt.height.get(species) ?? 0) * v.mpp * scale;
    const A = R.awake, D = R.dormant;
    const strength = m.awake ? (A.light + A.lightBuild * build) * (0.55 + 0.45 * beat) : D.light;
    if (d < R.lightRange) near.push({ d, l: { x: m.x, y: 0.5, z: m.z + 1.5, reach: m.awake ? A.reach : D.reach, rgb: col, strength } });
    // Awake: a column of light (column), a thin laser straight up (beam), or both (Ed, v149: "let's
    // see both"); dormant: only the faint column above the canopy. The beams grow as the
    // countdown to the stone's wake runs (Ed, 2026-10-04): the next stone's from half to full,
    // the after-next's up to half.
    const grow = m.stage === "next" ? 0.5 + 0.5 * build : m.stage === "afterNext" ? 0.15 + 0.35 * build : 1;
    if (!m.awake || column) beacons.push({ x: m.x, z: m.z, colour: col, strength: m.awake ? A.beam * (0.6 + 0.4 * beat) * (1 + build) : m.stage === "afterNext" ? A.beam * 0.6 : D.beam, base: top, height: R.beamHeight * grow });
    if (m.awake && laser) lasers.push({ x: m.x, z: m.z, colour: col, strength: R.laser.opacity * (0.55 + 0.45 * beat) * (0.7 + 0.6 * build), width: R.laser.width, height: R.laser.length * grow, base: top });
    // The forecast's ring of symbols round it: all 12 on the next stone, the after-next filling
    // through the middle as the countdown runs, a flickering few on the probable ones. Each
    // appears with a flare and pulses on the beat.
    const flick = hash2(m.cell[0] * 7 + Math.floor(time * 1.3), m.cell[1], 991), count = symbolCount(m.stage, build, flick, t);
    if (count > 0) {
      const F = t.forecast, seen = v.symbolSeen.get(m.key) ?? [];
      for (let k = 0; k < count; k++) {
        if (seen[k] === undefined) seen[k] = time;
        const a = (k / F.symbols) * Math.PI * 2 - Math.PI / 2, fl = Math.max(0, 1 - (time - seen[k]) / F.flare);
        const alpha = (m.stage === "probable" ? 0.45 : m.stage === "afterNext" ? 0.75 : 1) * (0.7 + 0.3 * beat) + fl * 1.2;
        symbols.push({ x: m.x + Math.cos(a) * F.radius, z: m.z + Math.sin(a) * F.radius, size: F.size * (1 + fl * 0.6), glyph: k, colour: col, alpha });
      }
      seen.length = count;
      v.symbolSeen.set(m.key, seen);
    } else v.symbolSeen.delete(m.key);
    if (m.awake) {
      const n = Math.round(A.motes + A.moteBuild * build);
      for (let i = 0; i < n; i++) {
        const s = (m.cell[0] * 31 + m.cell[1] * 17 + i * 7.3) % 1 || 0.37 * (i + 1) % 1, rise = ((time * (0.25 + 0.15 * ((i * 0.618) % 1)) + i / n) % 1);
        const a = i * 2.399 + m.cell[0];
        motes.push({ x: m.x + Math.cos(a) * (0.6 + rise * 1.4), y: 0.6 + rise * 7, z: m.z + Math.sin(a) * (0.6 + rise * 1.4), colour: col, alpha: (1 - rise) * (0.5 + 0.5 * beat) * (0.6 + s * 0.4) });
      }
    }
  }
  // The stones the party has just reached: they flare and sink as the soundsystems arrive.
  for (const a of g.party.areas.values()) {
    if (!a.soundsystem || time - a.at > R.flare.time || time < a.at) continue;
    const k = (time - a.at) / R.flare.time, species = AREA_TYPES[g.map.typeOf(a.cell[0], a.cell[1])].creature, col = v.markerArt.colour.get(species)!;
    const s0 = g.map.soundsystemSpot(a.cell[0], a.cell[1]);
    stone(s0.x, s0.z, species, MARKER_LEVELS - 1, -k * k * 4 * scale);
    near.push({ d: 0, l: { x: s0.x, y: 2.5, z: s0.z, reach: R.awake.reach * 1.5, rgb: col, strength: R.flare.light * (1 - k) } });
  }
  near.sort((p, q) => p.d - q.d);
  for (const n of near.slice(0, 8)) lights.push(n.l);
  v.markerBatch.set(inst);
  v.markerFx.update(beacons, R.beamHeight, canopyShown(w), motes.concat(v.fireSparks), lasers);
  const up = canopyShown(w);
  v.rings.update(symbols, up * (t.treetopHeight - 2)); // above the canopy from the treetops
  // Wave numbers over the stones (Ed, 2026-10-04, a design aid): above the stone on the ground,
  // above the canopy from the treetops; the reached areas' dimmed.
  const WN = t.waveNumbers, nums: WaveNumber[] = [];
  if (WN.on) {
    const P = g.party, pk = `${P.wave}:${P.areas.size}:${P.ruined?.size ?? 0}:${P.areasPerWave}:${P.next.map(cellKey).join(";")}`;
    if (v.plan.key !== pk) v.plan = { key: pk, waves: wavePlan(P, g.map) };
    const lift = (top: number) => top + WN.lift + up * (t.treetopHeight + WN.lift - top - WN.lift);
    // Past the bent horizon (Ed, 2026-10-05: "the glowing numbers can be seen past the bend"): a
    // number shows as much as its stone does over the bulge, by the culling's own test, eased so
    // it fades out as the stone sinks behind the horizon and in as it rises, never popping.
    const dt = Math.min(0.1, Math.max(0, time - v.numbersAt)), seen = new Map<string, number>();
    v.numbersAt = time;
    const shown = (key: string, x: number, z: number, top: number) => {
      const target = overBulge(v, x, z, top), was = v.numberSeen.get(key) ?? target;
      const k = was + (target - was) * Math.min(1, dt * 4);
      seen.set(key, k);
      return k;
    };
    // On the ground the camera looks steeply down and a near stone's top is often above the
    // picture: its number is held inside the top of the screen. Only near ones, and never over
    // the treetops (where it put far stones' numbers in the sky, and on the ground piled far ones up).
    const pin = (x: number, z: number) => up < 0.5 && Math.hypot(x - w.x, z - w.z) < WN.pinRange;
    for (const m of mc.list) {
      const wave = v.plan.waves.get(m.key);
      if (wave === undefined || Math.hypot(m.x - w.x, m.z - w.z) > range) continue;
      const species = AREA_TYPES[g.map.typeOf(m.cell[0], m.cell[1])].creature, top = (v.markerArt.height.get(species) ?? 0) * v.mpp * scale;
      const k = shown(m.key, m.x, m.z, top);
      if (k > 0.02) nums.push({ x: m.x, z: m.z, y: lift(top), wave, colour: v.markerArt.colour.get(species)!, alpha: 1, show: k, top, pin: pin(m.x, m.z) });
    }
    for (const a of g.party.areas.values()) {
      if (!a.wave) continue;
      const s0 = g.map.soundsystemSpot(a.cell[0], a.cell[1]), key = cellKey(a.cell);
      if (Math.hypot(s0.x - w.x, s0.z - w.z) > range) continue;
      const k = shown(key, s0.x, s0.z, 4);
      if (k > 0.02) nums.push({ x: s0.x, z: s0.z, y: lift(4), wave: a.wave, colour: SPENT, alpha: WN.spent, show: k, top: 4, pin: pin(s0.x, s0.z) });
    }
    v.numberSeen = seen;
  }
  v.waveNumbers.update(nums, WN.size, v.width / v.height);
  return lights;
}

/** The dancefloor's ring of speakers (Ed, v160): gameplay, always drawn and never see-through.
 *  Each shows its front to the camera, the far half facing in and the near half out, so its
 *  sprite is the drawn angle nearest its yaw, flipped for the other side; a playing speaker's
 *  cones pump on the beat. Anchored by its ground point, like a path piece. */
export function drawSpeakers(v: View, time: number, angle: number): ForestLight[] {
  const A = v.assets.speakerArt(), g = v.game, lights: ForestLight[] = [];
  if (!A) return lights;
  // The boot-up (Ed, 2026-10-04): they power on one by one round the ring, each with a flare;
  // the ones still off stand silent.
  const on = speakersOn(g.party, g.map, time, g.map.dancefloor.speakers.length);
  if (!v.speakerBatch) {
    v.speakerBatch = new SpriteBatch(A.atlas, v.mpp, { solid: true });
    v.scene.add(...v.speakerBatch.meshes);
  }
  const mpp = v.mpp, U = SPRITE_UNIFORMS.uUp.value, R = SPRITE_UNIFORMS.uRight.value;
  const pitch = (angle * Math.PI) / 180, upOnScreen = U.dot(v.v3.set(0, Math.cos(pitch), -Math.sin(pitch)));
  const beat = (beatTime(g.beat, time) * g.tuning.beat.bpm) / 60, ph = beat - Math.floor(beat);
  const list: SpriteInstance[] = [];
  g.map.dancefloor.speakers.forEach((sp, i) => {
    const face = Art.dancefloorSpeakerFacing(sp.ring) as { angle: number; flip: boolean }, state = g.speakers[i] ?? "playing", powered = i < on;
    if (powered && v.speakerFlare[i] === undefined) v.speakerFlare[i] = time;
    if (!powered) v.speakerFlare[i] = undefined;
    const flare = powered ? Math.max(0, 1 - (time - (v.speakerFlare[i] ?? time)) / 0.8) : 0;
    if (flare > 0) lights.push({ x: sp.x, y: 3, z: sp.z, reach: 14, rgb: new THREE.Vector3(0.3, 0.9, 1), strength: 3 * flare });
    // Playing: rest, then the cones thump out and settle, once a beat; damaged: a slow stutter; off: still.
    const frame = !powered ? 0 : state === "playing" ? (ph < 0.12 ? 2 : ph < 0.3 ? 1 : 0) : state === "damaged" ? Math.floor(time * 2.5 + i) % 2 : 0;
    const fi = A.frames[`${face.angle}:${state}:${frame}`];
    if (fi === undefined) return;
    const f = A.atlas.frames[fi], o = A.origin[face.angle], ox = face.flip ? f.w - o.x : o.x;
    v.speakerTops[i] = { x: sp.x, y: o.y * mpp * 0.96, z: sp.z, state, powered }; // its laser's source (lasers.ts)
    const dx = (ox - f.w / 2) * mpp, below = Math.max(0, f.h - (f.pad ?? 0) - o.y) * mpp, d = (f.pad ?? 0) * mpp;
    const x = sp.x - R.x * dx, z = sp.z - R.z * dx + (below * upOnScreen) / Math.max(0.2, Math.sin(pitch));
    if (!inView(v, x, z, f.w * mpp, f.h * mpp, 6)) return;
    list.push({ x: x - U.x * d, y: -U.y * d, z: z - U.z * d, frame: f, flip: face.flip, fresh: mark(v, "speaker", sp.x, sp.z, f.h * mpp) });
  });
  v.speakerBatch.set(list);
  return lights;
}

/** Stand the treehouse with its trunk's foot (its base anchor) on its spot: like a set piece's
 *  origin, the roots drawn below the foot lie on the ground nearer the camera, its lowest drawn
 *  pixel on the ground. Returns where its sprite stands (the bottom middle of its box). */
export function placeTreehouse(v: View, angle: number): { x: number; y: number; z: number } {
  const T = v.assets.treehouse, f = T.atlas.frames, th = v.game.map.treehouse, mpp = v.mpp, U = SPRITE_UNIFORMS.uUp.value;
  const pitch = (angle * Math.PI) / 180, upOnScreen = U.dot(v.v3.set(0, Math.cos(pitch), -Math.sin(pitch)));
  const pad = f[0].pad ?? 0, below = Math.max(0, f[0].h - pad - T.base.y) * mpp, d = pad * mpp;
  const x = th.x - (T.base.x - f[0].w / 2) * mpp, z = th.z + (below * upOnScreen) / Math.max(0.2, Math.sin(pitch));
  const at = { x: x - U.x * d, y: -U.y * d, z: z - U.z * d };
  const items: SpriteInstance[] = [{ ...at, frame: f[0], flip: false }, { ...at, frame: f[1], flip: false, top: true }];
  // The studio's DJ table (v2) a little nearer the camera than her stool, so it stands in front of her.
  if (T.hasFore) { const fwd = v.camera.getWorldDirection(v.v3b); items.push({ x: at.x - fwd.x * 1.2, y: at.y - fwd.y * 1.2, z: at.z - fwd.z * 1.2, frame: f[2], flip: false, overlay: true }); }
  v.treehouseBatch.set(items);
  return at;
}
