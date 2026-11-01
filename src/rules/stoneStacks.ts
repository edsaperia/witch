// Runestone stacks and the soundsystem spell (Ed, 2026-10-28; the tuning's `cast`). Every wild creature belongs to its area's
// runestone: above the stone a sigil stack, one sigil a creature (friends above enemies, each group babies at the top, then
// youths, adults and the legend at the bottom). Inviting one turns its sigil friend-coloured where it is, in the stack (no rune
// at its feet: c.atStone); one that runs off leaves it. There's no auto-clearing: she converts a stone herself by standing at
// it and holding the sigil button (the cast), or a wave does. Either way (rules/game.ts stepFights) the stone becomes a
// soundsystem, the babies turn friendly, the leftover wild young and adults besiege it, and every friend sigil falls and
// scatters round it on the ground (g.loose), for any witch to pick up and leash. A legend's sigil among them, picked up, tethers
// her to the sleeping legend at the distance it lay from it (her leash's `tether`). With `cast.on` false (the default till the view
// lands; ?cast=1 turns it on) the game is as it was: areas clear when their wild are gone (rules/clear.ts), no stacks, no scatter.
// No drawing here.
import type { Creature } from "./creatures";
import { LEGEND } from "./creatures";
import type { Game, Witch } from "./game";
import type { Cell } from "./partition";
import type { Tuning } from "./tuning";
import type { LeashEvent, PlacedSigil } from "./leash";
import { hexCell, hexCentre } from "./leash";
import { hash2 } from "./random";
import { stateOf } from "./creatureStates";
import type { WitchState } from "./witch";
import type { Pinned } from "./partyLegend";
import { CUT_BOUND, pastCut, stumpCutOf } from "./stumps";

const keyOf = (c: Cell) => `${c[0]},${c[1]}`;

/** A sigil lying on the ground for anyone to pick up, scattered at a stone's conversion (one a creature; `legend`: a sleeping
 *  legend's, which tethers whoever carries it). */
export interface LooseSigil extends PlacedSigil {
  legend?: boolean;
  /** Where it fell from (for the view's arc): its stone's x and z, and y its slot in the stack, 0 at the bottom (stoneStack's order). */
  from?: { x: number; y: number; z: number };
  /** "circle": a legend circle's baby's, landed in its circle (Ed, 2026-10-28: "this baby's sigil should land in the legend circle
   *  instead of near the soundsystem"), not seen in flight: it fades out leaving the stack and in where it lands ("I don't think you
   *  should see this sigil in flight"). */
  to?: "circle";
}

/** The cast's knobs (the tuning's `cast`). */
export interface CastTuning {
  /** Off: the game as before the stacks (auto-clearing, runes at the feet). Off by default till the view of them lands (the
   *  coordinator, 2026-10-28: Rendering's PR turns it on); ?cast=1 turns it on, ?cast=0 off. */
  on: boolean;
  /** Seconds of holding to convert a stone. */
  time: number;
  /** How much of a full cast drains a second while she isn't casting it. */
  drain: number;
  /** How far south of its stone (m) the spell's spot lies (the 🎶 drawn on the ground: render/leash/stones.ts). */
  spot: number;
  /** How near the spot's middle (m) she casts (Ed's playtest, 2026-10-29: "I should have to stand on the soundsystem spell sigil
   *  when casting it"): about the drawn spot's own radius. */
  radius: number;
  /** How near the spot (m) the spell's sigil shows (castShown). */
  show: number;
  /** Where its friend sigils scatter (Ed, 2026-10-28: "scattered around the whole runestone clearing"): free hex cells of its open
   *  ground (a tree's chance there under `open` of the forest's density) between min and reach metres from the stone, in a seeded
   *  order; never in the hidden wedge just north of it, where the soundsystem's sprite hides the ground from the camera (which looks
   *  north): `hide.width` metres either side of it, `hide.depth` metres behind. */
  scatter: { min: number; reach: number; open: number; hide: { width: number; depth: number } };
}
export const CAST_DEFAULT: CastTuning = { on: false, time: 6, drain: 0.15, spot: 4, radius: 2.2, show: 6, scatter: { min: 4, reach: 20, open: 0.25, hide: { width: 5, depth: 14 } } };
export const castOf = (t: Tuning): CastTuning => ({ ...CAST_DEFAULT, ...t.cast, scatter: { ...CAST_DEFAULT.scatter, ...t.cast?.scatter, hide: { ...CAST_DEFAULT.scatter.hide, ...t.cast?.scatter?.hide } } });
/** Whether the stacks and the spell are on (else the game as before them). */
export const castOn = (t: Tuning): boolean => !!t.cast?.on;

/** One sigil in a stone's stack. */
export interface StackEntry { id: number; level: number; friend: boolean; legend: boolean }

/** Whether a creature has its sigil in its stone's stack: about (not gone, not run off for good, not wandering off as its own kind's
 *  spare), not leashed, not let go here at a knockout, not a party legend or a dancer in the won night's line. */
const inStack = (c: Creature) => !c.homeGuard && !c.gone && !c.leashed && !c.dropped && c.fleeUntil !== Infinity && !c.wanderTo && !c.partyLegend && c.finale === undefined;

/** Whether a stone (an area's key) has a stack: not home's, not partified, not ruined. */
export function stoneOpen(g: Game, key: string): boolean {
  return key !== keyOf(g.map.centreCell) && !g.party.areas.has(key) && !g.party.ruined?.has(key);
}

/** The order of a stack, bottom first: the enemy fighters, then the friend fighters (Ed, 2026-10-28: friends above enemies, "you
 *  mostly care about how many creatures are still hostile"), each in rank order from the bottom (the legend, adults, youths), then
 *  every baby on top whatever its state (Ed, 2026-10-29: "baby sigils are purple (neither friend nor enemy) ... And they're always at
 *  the top of the stack"), by id within a rank. */
const isBaby = (e: StackEntry) => e.level === 0 && !e.legend;
const stackOrder = (a: StackEntry, b: StackEntry) => (+isBaby(a) - +isBaby(b)) || (isBaby(a) ? 0 : a.friend === b.friend ? 0 : a.friend ? 1 : -1) || b.level - a.level || a.id - b.id;

/** The sigil stack above an area's stone (Ed, 2026-10-28), in draw order, bottom first: the enemy fighters, then the friend
 *  fighters above them, each the legend, adults, youths; then the babies at the top (stackOrder). Empty for a stone that's converted (its friends' sigils lie on the
 *  ground: g.loose), home, a ruined one, or with the stacks off. */
export function stoneStack(g: Game, key: string): StackEntry[] {
  if (!castOn(g.tuning) || !stoneOpen(g, key)) return [];
  const out: StackEntry[] = [], own = g.byArea?.get(key) ?? g.creatures;
  for (const c of own) {
    if (keyOf(c.cell) !== key || !inStack(c)) continue;
    out.push({ id: c.id, level: c.boss ? LEGEND : c.level, friend: stateOf(c) === "happy", legend: !!c.boss });
  }
  return out.sort(stackOrder);
}

/** Whether a stone's spell can be cast (Ed, 2026-10-29: "Stop you from casting until all wild animals are invited"): no enemy
 *  fighter left on its stack, every wild youth and adult of its area invited (happy, or leashed and so off it). Its babies don't
 *  count (they turn friendly at the conversion), nor its sleeping legend. A wave converts it whatever. */
export function castReady(g: Game, key: string): boolean {
  return !stoneStack(g, key).some(e => !e.friend && !e.legend && e.level > 0);
}

/** Where a stone at (x, z)'s spell spot lies: cast.spot m south of it. */
// (on a great stump, its cut's middle: Ed, 2026-10-29, "the spell and the audio circle effect can be on top of the stump"; runeMarkers.stump)
export const castSpot = (s: { x: number; z: number }, t: Tuning): { x: number; z: number } => ({ x: s.x, z: s.z + (t.runeMarkers?.stump?.on ? 0 : castOf(t).spot) });

/** How far (m) (x, z) lies outside a stone's casting ground: a great stump's whole cut (Ed, 2026-10-29: "The area in which I can cast
 *  the soundsystem spell should be the whole trunk. (cut part, not the roots)": rules/stumps.ts), else cast.radius round its spell spot;
 *  0 or less on it. */
export function pastCasting(g: Game, cell: Cell, x: number, z: number): number {
  const t = g.tuning, s = g.map.soundsystemSpot(cell[0], cell[1]);
  if (t.runeMarkers?.stump?.on) {
    if (Math.hypot(x - s.x, z - s.z) > CUT_BOUND + castOf(t).show) return Infinity; // (too far to matter: its cut not built)
    const cut = stumpCutOf(t, g.map, cell);
    if (cut) return pastCut(cut, x - s.x, z - s.z);
  }
  const p = castSpot(s, t);
  return Math.hypot(p.x - x, p.z - z) - castOf(t).radius;
}

/** The stone she'd cast at from (x, z): her area's (a legend area's pair's), if it has a stack, is ready to cast (castReady) and
 *  she's within `reach` m of its casting ground (pastCasting: 0, on it). Its x, z the stone's own.
 *  `requireReady` false also finds hostile stones: Use belongs to them even before she can cast. */
export function stoneNear(g: Game, x: number, z: number, reach: number, requireReady = true): { key: string; cell: Cell; x: number; z: number } | null {
  // (her area's stone, or a neighbour's: a stone can stand near its area's edge, and a step either way of the line mustn't lose it)
  const here = g.map.cellSafe(x, z).cell, keys = [keyOf(here), ...(g.map.neighbours.get(keyOf(here)) ?? [])];
  let best: { key: string; cell: Cell; x: number; z: number } | null = null, bd = reach;
  for (const k of keys) {
    const [cx, cy] = k.split(",").map(Number), cell = g.map.areaOf ? g.map.areaOf([cx, cy]) : ([cx, cy] as Cell), key = keyOf(cell);
    if (!g.map.playable(cell[0], cell[1]) || !stoneOpen(g, key)) continue;
    const d = pastCasting(g, cell, x, z);
    if (d <= bd && (!requireReady || castReady(g, key))) { const s = g.map.soundsystemSpot(cell[0], cell[1]); bd = d; best = { key, cell, x: s.x, z: s.z }; }
  }
  return best;
}

/** Her record on a stone: her progress (p, 0 to 1) and when it last changed (at); after a hit, the progress it had (lostFrom) and
 *  when (hitAt), for the view to draw the drain from there. */
export interface CastRecord { p: number; at: number; lostFrom?: number; hitAt?: number }

/** Her progress on a stone (0 to 1) at her time `ht`: what she cast, drained since she stopped. */
export function castProgress(W: Witch, key: string, ht: number, t: Tuning): number {
  const r = W.casts?.[key];
  if (!r) return 0;
  return W.casting === key ? r.p : Math.max(0, r.p - castOf(t).drain * Math.max(0, ht - r.at));
}

/** What the view shows of her spell (Ed, 2026-10-28: "The music-note sigil becomes visible only as you enter the clearing and get near
 *  the runestone, and disappears as you leave"): the stone she's near on foot (its spot within cast.show), her progress there and whether
 *  she's casting it now; else null. */
export function castShown(g: Game, W: Witch): { key: string; x: number; z: number; k: number; lostFrom?: number; hitAt?: number; casting: boolean } | null {
  const t = g.tuning, b = W.body;
  if (!castOn(t) || b.mode !== "ground" || b.seated || b.perch || W.ko) return null;
  const s = stoneNear(g, b.x, b.z, castOf(t).show - castOf(t).radius); // (as near its casting ground as the spot's edge was)
  if (!s) return null;
  const r = W.casts?.[s.key];
  return { key: s.key, x: s.x, z: s.z, k: castProgress(W, s.key, W.time ?? g.herTime, t), ...(r?.lostFrom !== undefined ? { lostFrom: r.lostFrom, hitAt: r.hitAt } : {}), casting: W.casting === s.key };
}

/** The stone she casts at where she stands: on foot, not knocked out, on its casting ground (a great stump's cut, else within cast.radius
 *  of a stone's spot: pastCasting), a stone with a stack (the sigil button
 *  then casts, rather than putting down or picking up: rules/sigilButton.ts); else null. */
export function castingStone(g: Game, W: Witch): { key: string; cell: Cell; x: number; z: number } | null {
  const b = W.body;
  if (!castOn(g.tuning) || b.mode !== "ground" || b.seated || b.perch || W.ko) return null;
  return stoneNear(g, b.x, b.z, 0);
}

/** One step of her spell, on her clock (ht, hdt): held at a stone, it fills (1/time a second); let go, or moved off, it stops and
 *  her progress there drains (cast.drain a second); hit (hurt, or a blow thrown at her, since it began), it stops, and holding on
 *  does nothing till she lets go and holds again. Full: `convert` partifies the stone's area as a wave would (party.ts clearArea).
 *  Returns the converted stone's key, else null. Two witches at one stone each fill their own, no faster for it. */
export function stepCast(g: Game, W: Witch, held: boolean, ht: number, hdt: number, convert: (cell: Cell) => void, events: LeashEvent[] = W.leash.events): string | null {
  if (!castOn(g.tuning)) return null; // (the stacks off: nothing of hers changes)
  const t = g.tuning, C = castOf(t), stone = castingStone(g, W);
  const casts = (W.casts ??= {});
  for (const k of Object.keys(casts)) if (k !== W.casting && castProgress(W, k, ht, t) <= 0) delete casts[k]; // (drained to nothing)
  if (!held) W.castBlocked = undefined;
  const from = W.castFrom ?? Infinity, hit = !!W.casting && (W.health.hurtAt >= from || (W.knock?.at ?? -Infinity) >= from);
  const stop = (kind: "castStop" | "castBroken") => {
    const k = W.casting!, p = casts[k]?.p ?? 0;
    casts[k] = { p, at: ht, ...(kind === "castBroken" ? { lostFrom: p, hitAt: ht } : {}) };
    W.casting = null; W.castFrom = undefined;
    events.push({ kind, id: W.id, x: W.body.x, z: W.body.z, at: ht });
  };
  if (hit) { stop("castBroken"); W.castBlocked = true; return null; }
  if (!stone || !held || W.castBlocked) { if (W.casting) stop("castStop"); return null; }
  if (W.casting && W.casting !== stone.key) stop("castStop");
  if (W.casting !== stone.key) {
    casts[stone.key] = { p: castProgress(W, stone.key, ht, t), at: ht };
    W.casting = stone.key; W.castFrom = ht;
    events.push({ kind: "castStart", id: W.id, x: stone.x, z: stone.z, at: ht });
  }
  const r = casts[stone.key];
  r.p = Math.min(1, r.p + hdt / Math.max(1e-6, C.time)); r.at = ht;
  if (r.p < 1 - 1e-9) return null;
  delete casts[stone.key]; W.casting = null; W.castFrom = undefined;
  convert(stone.cell);
  events.push({ kind: "castDone", id: W.id, x: stone.x, z: stone.z, at: ht });
  return stone.key;
}

/** The friend sigils of a converting area, as they scatter (its happy natives' and its legend's, unless angry), in its stack's
 *  order from the bottom, each with its slot (0 at the bottom, under the enemies' left: stoneStack's order). */
export function friendSigils(g: Game, key: string): { c: Creature; slot: number }[] {
  const all: StackEntry[] = [], byId = new Map<number, Creature>();
  for (const c of g.creatures) {
    // (one whose sigil is in the stack though it's off about its business just now, a happy one walking to its dance: its sigil falls
    // too, else it'd be left with none, neither in a stack nor on the ground)
    if (keyOf(c.cell) !== key || !(inStack(c) || (c.atStone && !c.gone && !c.leashed))) continue;
    const friend = c.boss ? c.legendState !== "angry" : stateOf(c) === "happy"; // (an angry legend keeps its sigil)
    all.push({ id: c.id, level: c.boss ? LEGEND : c.level, friend, legend: !!c.boss }); byId.set(c.id, c);
  }
  return all.sort(stackOrder).map((e, slot) => ({ e, slot })).filter(x => x.e.friend).map(x => ({ c: byId.get(x.e.id)!, slot: x.slot }));
}

/** Where `n` sigils fall round a stone at (x, z) (Ed, 2026-10-28: "It's fine if they're scattered around the whole runestone
 *  clearing", not "immediately behind the soundsystem where they could be hidden"): free hex cells (leash.hex) of its open ground
 *  between scatter.min and scatter.reach metres, in an order seeded by the area's key (no Math.random), so they spread over the
 *  clearing however many there are; never in the hidden wedge north of the stone; none where `free` says no (barred, taken, off the
 *  land). Open ground first (`open`: the clearing's), then any free cell; with the hex grid off, seeded spots leash.spacing apart. */
export function scatterSpots(key: string, x: number, z: number, n: number, t: Tuning, free: (x: number, z: number) => boolean, open: (x: number, z: number) => boolean = () => true): { x: number; z: number }[] {
  const C = castOf(t), S = C.scatter, H = t.leash.hex && t.leash.hex.size > 0 ? t.leash.hex : null, [kx, ky] = key.split(",").map(Number), out: { x: number; z: number }[] = [];
  if (!n) return out;
  const hidden = (px: number, pz: number) => pz < z && z - pz < S.hide.depth && Math.abs(px - x) < S.hide.width; // (north: behind it on screen)
  const cells: { x: number; z: number; o: number }[] = [];
  if (H) {
    const h0 = hexCell(x, z, H.size), span = Math.ceil(S.reach / H.size) + 2;
    for (let dr = -span; dr <= span; dr++) for (let dq = -span; dq <= span; dq++) {
      const p = hexCentre(h0.q + dq, h0.r + dr, H.size), d = Math.hypot(p.x - x, p.z - z);
      if (d >= S.min && d <= S.reach && !hidden(p.x, p.z)) cells.push({ ...p, o: hash2(kx * 131 + h0.q + dq, ky * 131 + h0.r + dr, 7741) });
    }
  } else {
    for (let i = 0; i < 400; i++) {
      const a = hash2(kx * 97 + i, ky * 97, 811) * Math.PI * 2, r = S.min + Math.sqrt(hash2(kx * 97 + i, ky * 97, 812)) * (S.reach - S.min);
      const p = { x: x + Math.cos(a) * r, z: z + Math.sin(a) * r };
      if (!hidden(p.x, p.z)) cells.push({ ...p, o: i });
    }
  }
  cells.sort((a, b) => a.o - b.o);
  const gap = H ? 0 : t.leash.spacing, spaced = (p: { x: number; z: number }) => gap === 0 || out.every(o => Math.hypot(o.x - p.x, o.z - p.z) >= gap);
  for (const pass of [true, false]) for (const p of cells) {
    if (out.length >= n) break;
    if ((pass && !open(p.x, p.z)) || out.some(o => o.x === p.x && o.z === p.z) || !spaced(p) || !free(p.x, p.z)) continue;
    out.push({ x: p.x, z: p.z });
  }
  while (out.length < n) out.push({ x, z: z + S.min }); // (nowhere left: in front of the stone, still to pick up)
  return out;
}

/** Where a legend circle's baby's sigil lands at its stone's conversion (Ed, 2026-10-28): on its circle's open floor, clear of the
 *  sleeping legend's body (`clear` metres round where it lies) and of anything `free` says no to (barred, another sigil near): the
 *  free spot nearest where its baby dances (the circle's middle, a little south), a seeded jitter between equals; the circle can sit
 *  across its area's edge, so no area or clearing test. With nowhere free, that dancing spot. */
export function circleSpot(circle: { x: number; z: number; r: number; legendX: number; legendZ: number }, clear: number, seed: number, free: (x: number, z: number) => boolean): { x: number; z: number } {
  const dance = { x: circle.x, z: circle.z + circle.r * 0.3 }, cands: { x: number; z: number; o: number }[] = [];
  for (const k of [0, 0.3, 0.55, 0.8]) for (let i = 0; i < (k ? 16 : 1); i++) {
    const a = (i / 16) * Math.PI * 2, x = dance.x + Math.cos(a) * circle.r * k, z = dance.z + Math.sin(a) * circle.r * k;
    if (Math.hypot(x - circle.x, z - circle.z) > circle.r * 0.85 || Math.hypot(x - circle.legendX, z - circle.legendZ) < clear) continue;
    cands.push({ x, z, o: Math.hypot(x - dance.x, z - dance.z) + hash2(seed, i * 7 + k * 100, 4417) * 0.5 });
  }
  cands.sort((a, b) => a.o - b.o);
  return cands.find(p => free(p.x, p.z)) ?? dance;
}

/** The loose sigil nearest (x, z) within r: its index, or -1. */
export function looseNear(loose: readonly LooseSigil[], x: number, z: number, r: number): number {
  let best = -1, bd = r;
  for (let i = 0; i < loose.length; i++) { const p = loose[i], d = Math.hypot(p.x - x, p.z - z); if (d <= bd) { bd = d; best = i; } }
  return best;
}

/** Whether a loose sigil lies in the hex cell centred at (x, z) (or, off the grid, within leash.spacing of it). */
export function looseAt(loose: readonly LooseSigil[], x: number, z: number, t: Tuning): boolean {
  const H = t.leash.hex && t.leash.hex.size > 0 ? t.leash.hex : null;
  if (!H) return loose.some(p => Math.hypot(p.x - x, p.z - z) < t.leash.spacing);
  const h = hexCell(x, z, H.size);
  return loose.some(p => { const q = hexCell(p.x, p.z, H.size); return q.q === h.q && q.r === h.r; });
}

/** Keep her within the tether of the legend whose sigil she carries (Ed, 2026-10-28: "too heavy to drag ... she can't go further than
 *  one leash length from the sleeping legend"; its length the distance its sigil lay from it when she picked it up): past it she's put
 *  back on its edge and her speed outward taken away, as a party legend's leash does (rules/partyLegend.ts). */
export function tetherWitch(body: WitchState, tether: { id: number; length: number } | null | undefined, creatures: readonly Creature[], time: number, was: Pinned | null): { body: WitchState; pinned: Pinned | null } {
  const L = tether ? creatures[tether.id] : undefined;
  if (!tether || !L || L.gone) return { body, pinned: null };
  const dx = body.x - L.x, dz = body.z - L.z, d = Math.hypot(dx, dz), reach = tether.length;
  if (d <= reach - 1e-6) return { body, pinned: null };
  const nx = d > 1e-9 ? dx / d : 1, nz = d > 1e-9 ? dz / d : 0, out = body.vx * nx + body.vz * nz;
  return {
    body: { ...body, x: L.x + nx * reach, z: L.z + nz * reach, vx: out > 0 ? body.vx - nx * out : body.vx, vz: out > 0 ? body.vz - nz * out : body.vz },
    pinned: { id: L.id, x: L.x, z: L.z, since: was?.id === L.id ? was.since : time },
  };
}
