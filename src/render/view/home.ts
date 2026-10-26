// Home's pieces (from render/view.ts, issue #122): the rune stones' markers, beacons, symbols and wave
// numbers, the dancefloor's ring of speakers, and the treehouse stood on its spot.
import * as Art from "../../../art/generator.js";
import * as THREE from "three";
import { LIGHT_UNIFORMS } from "../lighting";
import { AREA_TYPES } from "../../rules/map";
import { type Beacon, type Laser, MARKER_LEVELS, type Mote } from "../markers";
import { SPRITE_UNIFORMS, SpriteBatch, type SpriteInstance } from "../sprites";
import type { WaveNumber } from "../waveNumbers";
import { beatAt, beatTime } from "../../rules/beat";
import { candleCount, candleMelt, candleRed } from "../../rules/knockout";
import { canopyShown } from "../../rules/witch";
import { deckOf, type Deck } from "../../rules/treehouse";
import { atDecks } from "../../rules/wakeUp";
import { groundHeight } from "../height";
import { cellKey, spawnMarkers, waveCountdown, wavePlan } from "../../rules/party";
import { leyKey } from "../../rules/leylines";
import { columnShown, leyReachTimes } from "../../rules/leypulse";
import { routeSeen } from "../../rules/hatSpells";
import { speakerBoot } from "../../rules/game";
import type { ForestLight, View } from "../view";
import { inView, overBulge } from "./culling";
import { mark } from "./pops";
import { ringStoneKey } from "../artBuild";
import type { TrunkShadow } from "../trunkShadows";
import type { RingSpeaker } from "../lasers";

/** The wave numbers' colour over areas the party has reached (spent). */
const SPENT = new THREE.Vector3(0.7, 0.7, 0.8);

/** A 💌's sparkle as it vanishes at a slowed circle's edge: pink-white. */
const SPARKLE_RGB = new THREE.Vector3(1, 0.75, 0.9);

/** The markers' motes: one list, its records pooled (a record a mote a frame before, dozens a stone). */
const MOTES: Mote[] = [], MOTE_POOL: Mote[] = [];
let moteN = 0;
function mote(x: number, y: number, z: number, colour: THREE.Vector3, alpha: number): void {
  let m = MOTE_POOL[moteN];
  if (!m) MOTE_POOL[moteN] = m = { x, y, z, colour, alpha };
  else { m.x = x; m.y = y; m.z = z; m.colour = colour; m.alpha = alpha; }
  MOTES.push(m); moteN++;
}

/** The spawn markers (rune stones where soundsystems will come): their sprites, beacons and
 *  motes; returns the lights of the nearest. */
export function drawMarkers(v: View, time: number): ForestLight[] {
  const g = v.game, t = g.tuning, R = t.runeMarkers, w = g.witch, range = t.haze.far + 20, mc = v.markerCache;
  if (mc.wave !== g.party.wave || mc.n !== g.party.areas.size) { mc.wave = g.party.wave; mc.n = g.party.areas.size; mc.list = spawnMarkers(g.party, g.map); }
  const cd = waveCountdown(g.party, g.map, time), build = g.party.paused ? 0 : cd.gone;
  const phase = (beatTime(g.beat, time) * t.beat.bpm) / 60, beat = Math.pow(0.5 + 0.5 * Math.cos(phase * Math.PI * 2), 2); // 1 on the beat
  const inst: SpriteInstance[] = [], lights: ForestLight[] = [], beacons: Beacon[] = [], motes = MOTES, lasers: Laser[] = [];
  motes.length = 0; moteN = 0;
  const scale = R.scale / v.markerArt.scale; // (baked at its size: 1)
  const casts = !!t.shadows.trunks?.scenery, cast: TrunkShadow[] = [];
  const col = (cell: readonly [number, number]) => { const c = v.markerArt.colour.get(AREA_TYPES[g.map.typeOf(cell[0], cell[1])].creature); return c ? [c.x, c.y, c.z] : [0.8, 0.7, 1]; };
  const stone = (x: number, z: number, cell: readonly [number, number], level: number, y = 0) => {
    const frame = v.markerArt.atlas.frames[v.markerArt.frame(cell, level)];
    if (!inView(v, x, z, frame.w * v.mpp * scale, frame.h * v.mpp * scale, 6)) return false;
    inst.push({ x, y, z, frame, flip: false, scale, fresh: mark(v, "marker", x, z, frame.h * v.mpp * scale) });
    // its shadow from her glow and the fires, as the scenery's (render/view/scenery.ts), shorter as it sinks
    const h = frame.h * v.mpp * scale, up = Math.max(0, Math.min(1, 1 + y / h));
    if (up > 0.05 && casts) cast.push({ x, z, w: frame.w * v.mpp * scale, h: h * up, frame, flip: false, scenery: true, glow: { rgb: col(cell), k: level > 0 ? 1 : 0.6 } }); // (glowing: a soft shade of its own colour)
    return true;
  };
  const near: { d: number; l: ForestLight }[] = [];
  // Ed (2026-10-06): "The column of light above a runestone first appears when the leyline meets it": when the line's
  // tip reaches each stone (rules/leypulse.ts, the line's own reveal), worked out again when the line changes, and twice a second
  // (its times ahead are by the pulse's speed now, which a knockdown's BPM raises).
  const lp = v.leyParty ?? g.party, rk = `${leyKey(lp)}:${g.party.spellAt ?? "-"}:${g.party.bootUntil}:${Math.floor(g.clock.time * 2)}`; // (the line's own party: leyLines.advance)
  if (v.leyReach.key !== rk) v.leyReach = { key: rk, times: leyReachTimes(lp, g.map, g.clock.time) };
  const FLARE = R.flare.time, allSeen = g.party.spellAt !== null && routeSeen(g); // (the Route-seer hat worn: every beacon up, rules/hatSpells.ts; none before the party, as the line: Ed, 2026-10-26)
  for (const m of mc.list) {
    const d = Math.hypot(m.x - w.x, m.z - w.z);
    if (d > range) continue;
    const species = AREA_TYPES[g.map.typeOf(m.cell[0], m.cell[1])].creature, col = v.markerArt.colour.get(species)!;
    // Awake: brighter on the beat, more so as the countdown runs out; dormant: a steady glow.
    const level = m.awake ? 1 + Math.round(Math.min(1, beat * (0.4 + 0.6 * build)) * (MARKER_LEVELS - 2)) : 0;
    stone(m.x, m.z, m.cell, level);
    // The beam and laser rise from the top of the stone, not from inside it.
    const top = v.markerArt.height(m.cell) * v.mpp * scale;
    const A = R.awake, D = R.dormant;
    const strength = m.awake ? (A.light + A.lightBuild * build) * (0.55 + 0.45 * beat) : D.light;
    // (the trees, props and scenery round it cast shadows from it, as from a campfire, thrown from the stone itself, not from its
    // light's spot in front of it, so the stone casts none of its own: render/trunkShadows.ts; Ed, 2026-10-13)
    if (d < R.lightRange) near.push({ d, l: { x: m.x, y: 0.5, z: m.z + 1.5, reach: m.awake ? A.reach : D.reach, rgb: col, strength, shadow: { x: m.x, y: 1.5, z: m.z, k: m.awake ? 1 : 0.7 } } });
    // Awake: a column of light and a thin laser straight up (Ed, v149: "let's see both"); dormant:
    // only the faint column above the canopy. The beams grow as the
    // countdown to the stone's wake runs (Ed, 2026-10-04): the next stone's from half to full,
    // the after-next's up to half.
    const grow = m.stage === "next" ? 0.5 + 0.5 * build : m.stage === "afterNext" ? 0.15 + 0.35 * build : 1;
    // Not reached by the line yet: no column, no laser (its dim rune glow above is all, findable up close, not from the
    // treetops). Reached: the column shoots up with a flare-up as the line meets it, and stays.
    const shown = columnShown(allSeen ? -Infinity : v.leyReach.times?.get(m.key), time, FLARE);
    if (!shown) continue;
    const { up, flare } = shown;
    if (flare > 0) near.push({ d: d - 1e3, l: { x: m.x, y: 3, z: m.z, reach: R.awake.reach * 1.5, rgb: col, strength: R.flare.light * flare, shadow: { x: m.x, y: 3, z: m.z, k: flare } } });
    beacons.push({ x: m.x, z: m.z, colour: col, strength: (m.awake ? A.beam * (0.6 + 0.4 * beat) * (1 + build) : m.stage === "afterNext" ? A.beam * 0.6 : D.beam) * (1 + 2 * flare), base: top, height: R.beamHeight * grow * up });
    if (m.awake) lasers.push({ x: m.x, z: m.z, colour: col, strength: R.laser.opacity * (0.55 + 0.45 * beat) * (0.7 + 0.6 * build), width: R.laser.width, height: R.laser.length * grow * up, base: top });
    if (m.awake) {
      const n = Math.round(A.motes + A.moteBuild * build);
      for (let i = 0; i < n; i++) {
        const s = (m.cell[0] * 31 + m.cell[1] * 17 + i * 7.3) % 1 || 0.37 * (i + 1) % 1, rise = ((time * (0.25 + 0.15 * ((i * 0.618) % 1)) + i / n) % 1);
        const a = i * 2.399 + m.cell[0];
        mote(m.x + Math.cos(a) * (0.6 + rise * 1.4), 0.6 + rise * 7, m.z + Math.sin(a) * (0.6 + rise * 1.4), col, (1 - rise) * (0.5 + 0.5 * beat) * (0.6 + s * 0.4));
      }
    }
  }
  // The stones the party has just reached: they flare and sink as the soundsystems arrive.
  for (const a of g.party.areas.values()) {
    if (!a.soundsystem || time - a.at > R.flare.time || time < a.at) continue;
    const k = (time - a.at) / R.flare.time, species = AREA_TYPES[g.map.typeOf(a.cell[0], a.cell[1])].creature, col = v.markerArt.colour.get(species)!;
    const s0 = g.map.soundsystemSpot(a.cell[0], a.cell[1]);
    stone(s0.x, s0.z, a.cell, MARKER_LEVELS - 1, -k * k * 4 * scale);
    near.push({ d: 0, l: { x: s0.x, y: 2.5, z: s0.z, reach: R.awake.reach * 1.5, rgb: col, strength: R.flare.light * (1 - k), shadow: { x: s0.x, y: 2.5, z: s0.z, k: 1 - k } } });
  }
  near.sort((p, q) => p.d - q.d);
  for (const n of near.slice(0, 8)) lights.push(n.l);
  v.markerBatch.set(inst);
  if (casts || v.trunkShadowBatches.has("markers")) { // (a batch of their own: their atlas)
    let b = v.trunkShadowBatches.get("markers");
    if (!b) { b = v.island.markerShadowBatch(); v.trunkShadowBatches.set("markers", b); }
    b.set(cast);
  }
  // A 💌 that left a slowed circle outward vanishes in a small sparkle at its edge (render/slowtime.ts): 8 motes bursting
  // out and fading over SPARKLE seconds of real time.
  const now = LIGHT_UNIFORMS.uRealTime.value, SPARKLE = 0.45;
  if (v.edgeSparkles.length) v.edgeSparkles = v.edgeSparkles.filter(s => now - s.at < SPARKLE);
  for (const s of v.edgeSparkles) {
    const k = (now - s.at) / SPARKLE;
    for (let i = 0; i < 8; i++) { const a = i * 0.785 + s.at * 3, r = 0.2 + k * 1.1; mote(s.x + Math.cos(a) * r, 1 + Math.sin(a * 2) * 0.4 * k + k * 0.6, s.z + Math.sin(a) * r, SPARKLE_RGB, (1 - k) * (i % 2 ? 1 : 0.6)); }
  }
  for (let i = 0; i < v.fireSparks.length; i++) motes.push(v.fireSparks[i]); // (after the markers' own, as the joined list was)
  v.markerFx.update(beacons, R.beamHeight, canopyShown(w), motes, lasers);
  const up = canopyShown(w);
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
      const species = AREA_TYPES[g.map.typeOf(m.cell[0], m.cell[1])].creature, top = v.markerArt.height(m.cell) * v.mpp * scale;
      const k = shown(m.key, m.x, m.z, top);
      // the next stone's number as bright as its ring; the rest dimmer (the art director, #188)
      if (k > 0.02) nums.push({ x: m.x, z: m.z, y: lift(top), wave, colour: v.markerArt.colour.get(species)!, alpha: m.stage === "next" ? 1 : 0.5, show: k, top, pin: pin(m.x, m.z) });
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
/** The share of a home speaker's turn spent as its runestone (glowing, stretching) before the speaker springs up. (The stone's
 *  baked as tall as an area's rune stone at half its width, render/artBuild.ts SPEAKER_STONE_WIDTH, at the speakers' angles, and drawn at 1.) */
const TURN = 0.4;
/** How much the stone stretches up (and thins) as it charges: as tall as the speaker it becomes already, so a little. */
const STRETCH = { up: 0.15, thin: 0.1 };
/** A speaker's facing by its ring place, its frames' keys by angle, state and frame, the boot's light colour, and where one stands:
 *  each made once (a record a speaker a frame before: the churn hunt, 2026-10-13). */
const FACES = new Map<unknown, { angle: number; flip: boolean }>();
const faceOf = (ring: unknown): { angle: number; flip: boolean } => { let f = FACES.get(ring); if (!f) FACES.set(ring, (f = Art.dancefloorSpeakerFacing(ring as number) as { angle: number; flip: boolean })); return f; };
const FRAME_KEYS = new Map<number, Map<string, string[]>>();
const frameKey = (angle: number, state: string, frame: number): string => {
  let byState = FRAME_KEYS.get(angle); if (!byState) FRAME_KEYS.set(angle, (byState = new Map()));
  let ks = byState.get(state); if (!ks) byState.set(state, (ks = []));
  return (ks[frame] ??= `${angle}:${state}:${frame}`);
};
const BOOT_RGB = new THREE.Vector3(0.3, 0.9, 1);
const STAND = { x: 0, z: 0 };
const SPEAKER_LIST: SpriteInstance[] = [];
export function drawSpeakers(v: View, time: number, angle: number): ForestLight[] {
  const A = v.assets.speakerArt(), g = v.game, lights: ForestLight[] = [];
  if (!A || g.map.zoo?.layout) { v.leashView.ringGlows.length = 0; return lights; } // (the zoo has no speakers: Ed, 2026-10-26)
  // The boot-up (Ed, 2026-10-06): each starts as a runestone (as tall as an area's, half as wide: Ed, 2026-10-08), and when the boot pulse reaches it (g.speakerBoot,
  // rules/game.ts) it turns into its speaker: the stone glows white and stretches up, then the speaker springs up out of
  // the ground with a flare, overshooting a little and settling, its glow fading.
  if (!v.speakerBatch) {
    v.speakerBatch = new SpriteBatch(A.atlas, v.mpp, { solid: true });
    v.scene.add(...v.speakerBatch.meshes);
  }
  const mpp = v.mpp, U = SPRITE_UNIFORMS.uUp.value, R = SPRITE_UNIFORMS.uRight.value;
  const pitch = (angle * Math.PI) / 180, upOnScreen = U.dot(v.v3.set(0, Math.cos(pitch), -Math.sin(pitch)));
  const beat = (beatTime(g.beat, time) * g.tuning.beat.bpm) / 60, ph = beat - Math.floor(beat);
  const list = SPEAKER_LIST, glows = v.leashView.ringGlows;
  list.length = 0; glows.length = 0;
  // Where a sprite stands so its ground point (o, art pixels in its frame; mirrored with it) lands on the spot: the part drawn below
  // the ground point lies on the ground nearer the camera. (Into STAND: read before the next is asked.)
  const standAt = (sp: { x: number; z: number }, f: { w: number; h: number; pad?: number }, o: { x: number; y: number }, flip: boolean) => {
    const dx = ((flip ? f.w - o.x : o.x) - f.w / 2) * mpp, below = Math.max(0, f.h - (f.pad ?? 0) - o.y) * mpp;
    STAND.x = sp.x - R.x * dx; STAND.z = sp.z - R.z * dx + (below * upOnScreen) / Math.max(0.2, Math.sin(pitch));
    return STAND;
  };
  const top = (i: number, x: number, y: number, z: number, state: RingSpeaker["state"], powered: boolean) => { // (its record kept: the lasers read it this frame)
    const T = v.speakerTops[i];
    if (T) { T.x = x; T.y = y; T.z = z; T.state = state; T.powered = powered; } else v.speakerTops[i] = { x, y, z, state, powered };
  };
  const speakers = g.map.dancefloor.speakers;
  for (let i = 0; i < speakers.length; i++) {
    const sp = speakers[i], face = faceOf(sp.ring), state = g.speakers[i] ?? "playing", k = speakerBoot(g, i, time), powered = k >= TURN;
    const sk = ringStoneKey(i, face.angle), si = A.stones?.[sk];
    if (!powered && si !== undefined) { // still its runestone (charging once the pulse has reached it), turned as its speaker is
      const f = A.atlas.frames[si], o = A.stoneOrigin![sk], c = k / TURN, d = (f.pad ?? 0) * mpp, p = standAt(sp, f, o, face.flip);
      top(i, sp.x, o.y * mpp * (1 + STRETCH.up * c), sp.z, state, false);
      if (!inView(v, p.x, p.z, f.w * mpp, f.h * mpp, 6)) continue;
      if (c > 0) lights.push({ x: sp.x, y: 1.5, z: sp.z, reach: 8, rgb: BOOT_RGB, strength: 1.5 * c });
      list.push({ x: p.x - U.x * d, y: -U.y * d, z: p.z - U.z * d, frame: f, flip: face.flip, sx: 1 - STRETCH.thin * c, sy: 1 + STRETCH.up * c, glow: c, fresh: mark(v, "speaker", sp.x, sp.z, f.h * mpp) });
      // its dots' glow (Ed, 2026-10-09: "They should glow"): each dot's middle in the world, stretched with the stone, for the
      // soft halos LeashView draws (drawRingGlows), brighter as it charges
      for (const q of A.stoneDots?.[sk] ?? []) {
        const a = ((face.flip ? f.w - q.x : q.x) - f.w / 2) * mpp * (1 - STRETCH.thin * c), b = (f.h - q.y) * mpp * (1 + STRETCH.up * c);
        glows.push({ x: p.x - U.x * d + R.x * a + U.x * b, y: -U.y * d + R.y * a + U.y * b, z: p.z - U.z * d + R.z * a + U.z * b, k: 1 + c });
      }
      continue;
    }
    const u = si === undefined ? 1 : Math.min(1, (k - TURN) / (1 - TURN)), rise = u >= 1 ? 1 : 1 - Math.pow(1 - u, 3) * Math.cos(u * 4.2); // springs up, past full, settles
    if (powered && v.speakerFlare[i] === undefined) v.speakerFlare[i] = time;
    if (!powered) v.speakerFlare[i] = undefined;
    const flare = powered ? Math.max(0, 1 - (time - (v.speakerFlare[i] ?? time)) / 0.8) : 0;
    if (flare > 0) lights.push({ x: sp.x, y: 3, z: sp.z, reach: 14, rgb: BOOT_RGB, strength: 3 * flare });
    // Playing: rest, then the cones thump out and settle, once a beat; damaged: a slow stutter; off: still.
    const frame = !powered ? 0 : state === "playing" ? (ph < 0.12 ? 2 : ph < 0.3 ? 1 : 0) : state === "damaged" ? Math.floor(time * 2.5 + i) % 2 : 0;
    const fi = A.frames[frameKey(face.angle, state, frame)];
    if (fi === undefined) continue;
    const f = A.atlas.frames[fi], o = A.origin[face.angle];
    top(i, sp.x, o.y * mpp * 0.96, sp.z, state, powered); // its laser's source (lasers.ts)
    const d = (f.pad ?? 0) * mpp, { x, z } = standAt(sp, f, o, face.flip);
    if (!inView(v, x, z, f.w * mpp, f.h * mpp, 6)) continue;
    list.push({ x: x - U.x * d, y: -U.y * d, z: z - U.z * d, frame: f, flip: face.flip, fresh: mark(v, "speaker", sp.x, sp.z, f.h * mpp), sy: u < 1 ? Math.max(0.2, rise) : undefined, sx: u < 1 ? 1 + 0.15 * (1 - u) : undefined, glow: u < 1 ? 1 - u : undefined });
  }
  v.speakerBatch.set(list);
  return lights;
}

/** How far nearer the camera than the treehouse's own plane the booth's layers are drawn (metres, along the ray to the camera, so
 *  each lands on its own pixels): her, the DJ table over her, then her upper half over the table (her hands on the decks). */
export const DJ_DEPTH = { her: 0.25, fore: 0.5, upper: 0.75, candles: 1 };
/** A point `d` metres nearer the camera along the ray from it (so it lands on the same pixel on screen). */
export function nearerCamera(v: View, p: { x: number; y: number; z: number }, d: number): { x: number; y: number; z: number } {
  const c = v.camera.position, dx = p.x - c.x, dy = p.y - c.y, dz = p.z - c.z, l = Math.hypot(dx, dy, dz) || 1;
  return { x: p.x - (dx / l) * d, y: p.y - (dy / l) * d, z: p.z - (dz / l) * d };
}

/** The treehouse Ent's halves (rules/treehouse.ts, art/ent.js): drawn in the plane through the deck's middle, the far half (the Ent,
 *  the floor, the rail's far side, the map table) moved this far back along the rays from the camera and the near half (the rail's
 *  near side, the decks' desk) this far forward, each scaled to land on its own pixels, so she, anywhere on the deck, stands
 *  between them (metres: past the deck's radius and its rail). The DJ table's frames, her hands over it and the candles go in
 *  front of the near half as DJ_DEPTH says. */
export const ENT_DEPTH = { far: 8, near: 7.6 };
/** The halves' depths for the house (rules/treehouse.ts): the far half past the Terrace's back, the near half past the decks' desk
 *  on its open rim, so she stands between them on its floor; the deck's as ever. */
export const entDepth = (d: Deck | null): { far: number; near: number } => (d?.house ? { far: d.r + 4, near: d.house.desk.z - d.z + d.house.desk.d / 2 + 0.3 } : ENT_DEPTH); // (the far half's wall stands up the sprite, its top tilted toward the camera: a few metres more, so she's in front of it at the back wall)
/** The Ent's carrier (art/carrier.js): a breath's seconds and how much taller it stands at its top (its height's share). */
const CARRIER_BREATH = 4, CARRIER_SWELL = 0.006;
/** A point `d` metres nearer the camera along the ray from it, and how much smaller to draw what stands there to cover the same
 *  pixels as at `p` (negative `d`: farther, bigger). */
export function alongRay(v: View, p: { x: number; y: number; z: number }, d: number): { x: number; y: number; z: number; scale: number } {
  const c = v.camera.position, l = Math.hypot(p.x - c.x, p.y - c.y, p.z - c.z) || 1, q = nearerCamera(v, p, d);
  return { ...q, scale: Math.max(0.05, (l - d) / l) };
}

/** The knockdown candles last shown, per view: their count, how many red, and (once she's free) when their smoke is done. */
const candlesSeen = new WeakMap<View, { n: number; red: number; until: number }>();
/** Another night in the view (View.setGame): no candles burning down. */
export function forgetCandles(v: View): void { candlesSeen.delete(v); }

/** The ground a sprite `w` metres wide stands on at (x, z), as the sprites' shader finds it (render/sprites.ts: the lowest of five
 *  points across its foot, up to 5 m either side). */
export function underFoot(x: number, z: number, w: number): number {
  const R = SPRITE_UNIFORMS.uRight.value, fw = Math.min(w * 0.45, 5);
  let m = groundHeight(x, z);
  for (const f of [-1, -0.5, 0.5, 1]) m = Math.min(m, groundHeight(x + R.x * fw * f, z + R.z * fw * f));
  return m;
}

/** Where the Ent's deck middle (its art's anchor, art/ent.js) is drawn this frame, as the sprites' shader stands its far half: for
 *  tools/house/terrace-lock.cjs, which holds it to the house's floor's own middle of the Terrace (render/houseRooms.ts plan). */
export function entDeckDrawn(v: View): { x: number; y: number; z: number } | null {
  const T = v.assets.treehouse, it = v.treehouseBatch.items[0];
  if (!T.ent || !it) return null;
  const k = it.scale ?? 1, fr = it.frame, R = SPRITE_UNIFORMS.uRight.value, U = SPRITE_UNIFORMS.uUp.value;
  const ox = (T.ent.deck.x - fr.w / 2) * v.mpp * k, oy = (fr.h - T.ent.deck.y) * v.mpp * k, g = underFoot(it.x, it.z, fr.w * v.mpp * k);
  return { x: it.x + R.x * ox + U.x * oy, y: it.y + g + R.y * ox + U.y * oy, z: it.z + R.z * ox + U.z * oy };
}

/** Stand the treehouse with its trunk's foot (its base anchor) on its spot: like a set piece's
 *  origin, the roots drawn below the foot lie on the ground nearer the camera, its lowest drawn
 *  pixel on the ground. Returns where its sprite stands (the bottom middle of its box). */
export function placeTreehouse(v: View, angle: number, time: number): { x: number; y: number; z: number } {
  const T = v.assets.treehouse, f = T.atlas.frames, th = v.game.map.treehouse, mpp = v.mpp, U = SPRITE_UNIFORMS.uUp.value;
  const pitch = (angle * Math.PI) / 180, upOnScreen = U.dot(v.v3.set(0, Math.cos(pitch), -Math.sin(pitch)));
  const pad = f[0].pad ?? 0, below = Math.max(0, f[0].h - pad - T.base.y) * mpp, d = pad * mpp;
  const x = th.x - (T.base.x - f[0].w / 2) * mpp, z = th.z + (below * upOnScreen) / Math.max(0.2, Math.sin(pitch));
  let at = { x: x - U.x * d, y: -U.y * d, z: z - U.z * d };
  const deck = T.ent ? deckOf(v.game.map, v.game.tuning) : null, R0 = SPRITE_UNIFORMS.uRight.value, ED = entDepth(deck);
  // (in the house off the Terrace, slid up its plane with the house's floors, by v.houseShift (render/view/witch.ts houseShiftOf), so
  // the Terrace's art and her decks stay on the floor they're drawn on: Ed, 2026-10-26, "the DJ booth and maybe the whole terrace
  // behaves strangely as you walk around the treehouse"; the anchor returned isn't slid, as what's placed by it slides itself)
  const sh = deck?.house ? v.houseShift * mpp : 0, D = { x: -U.x * sh, y: -U.y * sh, z: -U.z * sh };
  const S = v.leashView?.seatSlide; if (S) { S.x = D.x; S.y = D.y; S.z = D.z; } // (the tempo over her decks with them: render/leash/deckBpm.ts)
  // The treehouse Ent: its deck's middle (its anchor) on the rules' deck, its two halves either side of her (ENT_DEPTH)
  const ent = (p: { x: number; y: number; z: number }, dd: number, frame: SpriteInstance["frame"], o: Partial<SpriteInstance> = {}): SpriteInstance => {
    const P = deckAt!, g0 = groundHeight(P.x, P.z);
    const put = (dx: number, dy: number, dz: number) => { // (the ray in the world's heights; sprites stand on the ground: p's offset from the deck's middle, shrunk or grown with it)
      const q = alongRay(v, { x: P.x + dx, y: P.y + dy + g0, z: P.z + dz }, dd), k = q.scale;
      return { x: q.x + (p.x - P.x) * k, y: q.y - g0 + (p.y - P.y) * k, z: q.z + (p.z - P.z) * k, k };
    };
    const a = put(D.x, D.y, D.z);
    // (slid, it's stood on the ground under where it's slid to (sprites.ts: the lowest ground under its foot): the ground it stood on
    // unslid kept, so it moves with the floors, which stand on the deck's ground)
    if (sh) { const b = put(0, 0, 0); a.y -= underFoot(a.x, a.z, frame.w * mpp * a.k) - underFoot(b.x, b.z, frame.w * mpp * b.k); }
    return { x: a.x, y: a.y, z: a.z, frame, flip: false, scale: a.k, ...o };
  };
  let deckAt: { x: number; y: number; z: number } | null = null;
  if (deck && T.ent) {
    deckAt = { x: deck.x, y: deck.h, z: deck.z }; // (over the ground, as every sprite's y)
    const ox = (T.ent.deck.x - f[0].w / 2) * mpp, oy = (f[0].h - T.ent.deck.y) * mpp;
    at = { x: deckAt.x - R0.x * ox - U.x * oy, y: deckAt.y - R0.y * ox - U.y * oy, z: deckAt.z - R0.z * ox - U.z * oy };
  }
  const items: SpriteInstance[] = deckAt ? [ent(at, -ED.far, f[0]), ent(at, ED.near, f[1])] : [{ ...at, frame: f[0], flip: false }, { ...at, frame: f[1], flip: false, top: true }];
  // The island's legend carrying the Ent (art/carrier.js; Ed, 2026-10-10): its back's top under the Ent's roots' foot (the base
  // anchor), its roots' foot planted T.carrier.sink pixels down in its fur, its feet on the ground (the art grows the Ent's trunk
  // to fit): in front of the Ent's far half (pushed back along the rays with it, it would sink into the ground). Breathing slowly (drawing only): a touch taller and shorter about
  // its feet, a breath every CARRIER_BREATH seconds.
  if (deckAt && T.carrier) {
    const C = T.carrier, fc = f[C.frame];
    const bx = T.base.x - C.back.x + fc.w / 2, by = T.base.y + C.sink + (fc.h - C.back.y); // (its sprite's bottom middle, in the Ent's pixels)
    const dx = (bx - f[0].w / 2) * mpp, dy = (f[0].h - by) * mpp;
    const p0 = { x: at.x + R0.x * dx + U.x * dy + D.x, y: at.y + R0.y * dx + U.y * dy + D.y, z: at.z + R0.z * dx + U.z * dy + D.z };
    // Stacked down the sprites' up (tilted back from the camera, steeply in the treetops) its feet would land under the ground:
    // slid along the ray from the camera until they stand on it, the same pixels on screen (nearer, so drawn smaller).
    const g0 = groundHeight(deckAt.x, deckAt.z), c = v.camera.position, Wy = p0.y + g0, t = p0.y < 0 && c.y > Wy ? -p0.y / (c.y - Wy) : 0;
    items.push({ x: p0.x + (c.x - p0.x) * t, y: 0, z: p0.z + (c.z - p0.z) * t, frame: fc, flip: false, scale: 1 - t, sy: 1 + CARRIER_SWELL * Math.sin((time * 2 * Math.PI) / CARRIER_BREATH) });
  }
  // The studio's DJ table over her (Ed, 2026-10-06): its crop where it shows in the base, a frame two to a beat (the platters
  // turning an eighth, the LEDs chasing), nearer the camera than her.
  if (T.hasFore) {
    const k = Math.floor(beatAt(v.game.beat, time) * 2) % T.foreFrames, ff = f[2 + Math.max(0, k)], R = SPRITE_UNIFORMS.uRight.value;
    const dx = (T.foreBox.x + ff.w / 2 - f[0].w / 2) * mpp, dy = (f[0].h - T.foreBox.y - ff.h) * mpp;
    const p0 = { x: at.x + R.x * dx + U.x * dy, y: at.y + R.y * dx + U.y * dy, z: at.z + R.z * dx + U.z * dy };
    // (lit while E there starts the party, as the house's objects she can use are: Ed's playtest, 2026-10-26; render/useGlow.ts's breath)
    const g = v.game, lit = !!g.wake?.open && g.party.spellAt === null && atDecks(g) ? 0.18 + 0.12 * Math.cos((2 * Math.PI * performance.now()) / 1400) : 0;
    items.push(deckAt ? ent(p0, ED.near + DJ_DEPTH.fore - DJ_DEPTH.her, ff, { overlay: true, glow: lit }) : { ...nearerCamera(v, p0, DJ_DEPTH.fore), frame: ff, flip: false, overlay: true, glow: lit });
  }
  // The knockdown candles along the front edge of the studio's terrace (Ed, 2026-10-07), a loading bar (rules/knockout.ts: candleCount, one for every knockout.candleStep
  // seconds of her wait; candleRed of them red, the wait past the base; candleMelt, burning down one after another as she
  // scratches, on her clock): white at the left, red at the right, the bar emptying from its right end, spaced evenly
  // along the row's line (T.candleRow, art/treehouse.js candleRow); nearest of all.
  // (the rules clear her knockout the moment she's free: the last count kept here, the stubs smoking out for a second after)
  const tu = v.game.tuning, ko = v.game.witches[0]?.ko, live = candleCount(ko, tu), ht = v.game.herTime, was = candlesSeen.get(v);
  if (live > 0) candlesSeen.set(v, { n: live, red: candleRed(ko, tu), until: Infinity }); else if (was && was.until === Infinity) was.until = ht + 1; else if (was && ht > was.until) candlesSeen.delete(v);
  const n = live || (candlesSeen.get(v)?.n ?? 0), red = candlesSeen.get(v)?.red ?? 0;
  if (n > 0 && T.candleRow.length >= 2) {
    const row = T.candleRow, R = SPRITE_UNIFORMS.uRight.value, lens = [0];
    for (let k = 1; k < row.length; k++) lens.push(lens[k - 1] + Math.hypot(row[k].x - row[k - 1].x, row[k].y - row[k - 1].y));
    const along = (u: number) => { // the point u (0 to 1) of the way along the row, by its length
      const d = u * lens[lens.length - 1]; let k = 1; while (k < row.length - 1 && lens[k] < d) k++;
      const t = (d - lens[k - 1]) / Math.max(1e-6, lens[k] - lens[k - 1]); return { x: row[k - 1].x + (row[k].x - row[k - 1].x) * t, y: row[k - 1].y + (row[k].y - row[k - 1].y) * t };
    };
    for (let i = 0; i < n; i++) {
      const j = n - 1 - i, m = live ? candleMelt(ko, ht, j, tu) : 1, { x: px, y: py } = along(n === 1 ? 0.5 : (i + 0.5) / n);
      const level = m >= 1 ? T.candleLevels - 1 : Math.min(T.candleLevels - 2, Math.floor(m * (T.candleLevels - 1)));
      const fr = f[T.candle0 + (j < red ? T.candleRed : 0) + level * T.candleFlicker + (Math.floor(time * 7 + i * 1.7) % T.candleFlicker)]; if (!fr) continue;
      const dx = (px - f[0].w / 2) * mpp, dy = (f[0].h - py) * mpp; // (the candle's foot on the row, in the base's pixels: its sprite's bottom middle there)
      const c0 = { x: at.x + R.x * dx + U.x * dy, y: at.y + R.y * dx + U.y * dy, z: at.z + R.z * dx + U.z * dy };
      items.push(deckAt ? ent(c0, ED.near + DJ_DEPTH.candles - DJ_DEPTH.her, fr, { overlay: true }) : { ...nearerCamera(v, c0, DJ_DEPTH.candles), frame: fr, flip: false, overlay: true });
    }
  }
  v.treehouseBatch.set(items);
  return at;
}

