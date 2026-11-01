// Pack combat (docs/backlog/combat.md, build step 1; Ed, 2026-10-15 and 2026-10-19): behind the tuning's combat.packs.on, a pack
// of a kind with a `pack` (its creature.js; config/packs.json the rest) (one kind, one side, one target) fights in phases: it closes in (approach), every member glows and
// its call plays (the tell), it combos (the nearest lunges, the ones at range fire where a dodge would go, the one behind her or the
// furthest throws the special), then it falls back by its kind's retreat pattern (the lull, longer for a bigger pack; her own pack
// holds instead), and again. Roles come from position every step; how many may wind up or strike at her at once is the kind's
// pressure, under the tuning's dodge.a tokens (rules/combat.ts; Ed, 2026-10-20). Against a soundsystem there's no pack: each fights
// as before. A new kind is a data entry (its moves, special, retreat, rhythm, pressure), not new code. The director runs once a step
// before the fight loop (rules/combat.ts) and hands each member a directive; the loop reads it. No drawing here.
// Phase 1's kinds (Echo, 2026-10-19: wolf, boar, bat, raven, newt, moth, heron, beetle, woodlouse, otter, toad) add two specials
// (mirage, sync), a kind's own variant of a special (`specialWith`: the bat's confusion turns her movement, the moth's cloud flashes,
// the toad's cloud comes down from a leap, the beetle's cover locks two shells), a ranged move on a kind's own attack (the raven's
// spit and barb) or a lob that leaves a patch (the toad's spores), and retreats (flanks, backLine, branches, water, huddle, arcs, swirl).
// Kinds keep their own moves (config/movement.json) inside a pack (Ed, 2026-10-20: "charges, dives, burrowing, screeches, slime and
// the wolves surrounding her"): a member's strike, its turn come, is its kind's own move where it has one (a charger charges, a
// toad leaps, a mole burrows in, a wild flyer dives), taking the pack's turn and her dodge token like any strike (strikingNow; its
// pack engages from that move's reach, reachOf); a kiter's strike is its shot, never a lunge; the slime trail runs on; and while it
// waits its turn its kind's tactic places it (the wolves' surround: rules/combat.ts).
import raw from "../../../config/packs.json";
import { observeAttack } from "../attackObservation";
import { sectionOf } from "../creatureConfig";
import { type Creature, type Level } from "../creatures";
import { foes, huntsWitch } from "../creatureStates";
import { hash2 } from "../random";
import { FIGHT, type Move as OwnMove, profileOf, startCharge, swoopStriking } from "../movement";
import { type Attack, COMBAT, type CombatState, type CombatWorld, type Target, scaled, strengthOf, stunWorth } from "./data";
import { fighting, sideOf, targetPos, targetable } from "./targeting";
import { SPACING, bodyGap, drawnRadius, spacingOn } from "../combatSpacing";
import type { Tuning } from "../tuning";
import { stepTeams, teamOf, type TeamState } from "./teams";

export type Role = "lunger" | "shooter" | "special" | "hold" | "hurt";
export type Phase = "approach" | "tell" | "combo" | "lull";
export type SpecialKind = "stampede" | "scatter" | "call" | "feint" | "confusion" | "cloud" | "wall" | "rally" | "cover" | "mirage" | "sync" | "knockback" | "pull" | "decoy" | "mind";
/** A special's numbers (packs.json specials), and a kind's own variant over them (its `specialWith`). */
export interface SpecialData { time?: number; radius?: number; cooldown: number; tint: string; lead?: number; drift?: number; length?: number; ahead?: number; slow?: number; heal?: number; reach?: number; armour?: number; ring?: number;
  /** confusion: her movement turned, not her aim (the bat's screech) */ move?: boolean; /** cloud: a flash inside it confuses her aim (the moth's) */ flash?: boolean; /** cloud: its thrower leaps and it comes down where it lands (the toad's) */ leap?: boolean;
  /** cover: the coverer and its packmate both dig in, shells locked (the beetle's) */ both?: boolean; /** mirage: images by level [young, adult] */ images?: number[]; /** sync: how many blink with her */ count?: number;
  /** knockback: metres its ram throws her */ throw?: number; /** pull: metres it drags her toward it (within reach) */ pull?: number }
export type Move = "melee" | "ranged";
type Rhythm = { tell: number; gap: number; lull: number; perMember: number; timeout: number };
export interface PackKind {
  melee: { attacks?: (string | null)[]; knockback?: number } | null;
  ranged: { name: string; range: number; shots: number[]; spread?: number; size?: number[]; speed?: number; tint: string; mound?: boolean;
    /** its own attack by level as the base, not the magic bolt (the raven's spit and barb "as today") */ attacks?: (string | null)[];
    /** "lob": thrown to land, hitting all round where it lands (the toad's spores); its flight seconds */ delivery?: "shot" | "lob"; flight?: number;
    /** a lob's landing leaves a patch slowing the other side (radius m, slow, time s) */ patch?: { radius: number; slow: number; time: number } } | null;
  special: SpecialKind; /** its own variant of the special (over packs.json specials) */ specialWith?: Partial<SpecialData>; retreat: string; rhythm: string; pressure: number; call: string; tells: Record<string, string>;
}
export interface PacksData {
  rhythms: Record<string, Rhythm>;
  young: { windup: number; speed: number; range: number; special: number; lull: number };
  limits: { combo: number; lanes: number; lines: number; shots: number; hurt: number; engage: number; split: number; close?: number };
  bolt: Attack;
  specials: Record<SpecialKind, SpecialData>;
  retreats: Record<string, { out: number; hide?: boolean | "half"; still?: boolean }>;
  kinds: Record<string, PackKind>;
  hers: { hold: number; stun: number };
  /** The lull's prowl round her once at its place: near (m), pace (times its speed); freeze, the share of the lull a freeze holds first. */
  prowl: { near: number; pace: number; freeze: number };
  /** The styles' numbers (packs.json _styles) and each kind's style. */
  styles: StylesData;
  style: Record<string, Style>;
}
/** A kind's way of moving in a fight (Ed's playtest, 2026-10-29; packs.json _styles). */
export type Style = "charger" | "circler" | "flanker" | "hopper" | "steady";
export interface StylesData {
  lullOut: number; lullGap: number; jitter: number;
  charger: { wheel: number; carrot: number };
  circler: { orbit: number; carrot: number; spiral: number };
  flanker: { from: number; to: number; out: number };
  hopper: { length: number; time: number; height: number; pause: number; ring: number };
  friends: { on: boolean };
}
/** packs.json, its kinds each creature's own `pack` (art/creatures/<id>/creature.js, 2026-10-23: so builders adding kinds don't
 *  collide), spread over any the file still holds. */
export const PACKS = { ...(raw as unknown as PacksData), kinds: { ...(raw as unknown as PacksData).kinds, ...(sectionOf("pack") as Record<string, PackKind>) } } as PacksData;
/** A kind's style (packs.json style; steady if not listed). */
export const styleOf = (species: string, data: PacksData = PACKS): Style => data.style?.[species] ?? "steady";
/** A kind's pack entry, or null (it fights as before). */
export const packKindOf = (species: string, data: PacksData = PACKS): PackKind | null => data.kinds[species] ?? null;
/** A kind's special's numbers: the special's, with the kind's own variant over them. */
export const specialOf = (K: PackKind, data: PacksData = PACKS): SpecialData => ({ ...data.specials[K.special], ...K.specialWith });
/** A kind's own strike move from config/movement.json, which a pack member uses for its strike (a charge, a leap, a burrow, a
 *  dive), or null. */
export function ownStrike(species: string): OwnMove | null {
  const mv = profileOf(species)?.move;
  return mv && (mv.kind === "charge" || mv.kind === "leap" || mv.kind === "burrow" || mv.kind === "swoop") ? mv : null;
}
/** A kiting kind (combat.json kite: the raven) keeps its distance and shoots: in a pack its strike is its shot, never a lunge. */
export const kites = (species: string, K: PackKind): boolean => !!K.ranged && COMBAT.kite.species.includes(species);
/** The move the nearest member strikes with: its melee, a kiter's (or a kind's without melee) its shot. */
export const lungeMove = (species: string, K: PackKind): Move => (K.melee && !kites(species, K) ? "melee" : "ranged");
/** Striking now (for the pressure and the dodge's tokens): winding up, lunging, or in its own move's strike (its charge before it
 *  brakes, a leap but the toad's cloud leap, a dive from its telegraph to its bottom). */
export const strikingNow = (c: Creature): boolean => !!c.fight && (c.fight.windupUntil > 0 || !!c.fight.lunge) || (!!c.charge && !c.charge.braking) || (!!c.leap && !c.leap.cloud) || swoopStriking(c);
/** Whether the switch is on (the tuning's combat.packs.on). */
export const packsOn = (t: { combat: { packs?: { on?: boolean } } }): boolean => !!t.combat.packs?.on;

/** One pack's state, kept between steps (CombatState.packs, by its key: side, kind, target). */
export interface PackState {
  key: string; species: string; hers: boolean; phase: Phase; at: number; until: number;
  /** The combo's step: 0 the lunge (a feint first, for a feinting kind), 1 the shots, 2 the special; when each began. */
  step: number; stepAt: number;
  /** Combos run so far (members strike once a combo: struck), and its members last step. */
  combo: number; struck: number[]; members: number[]; size: number;
  specialReadyAt: number; specialDone: boolean;
  /** The call (all strike together till then), the feint (a fake tell till then, by whom), what a 💌 or her party animal made it do this combo. */
  callUntil?: number; feintUntil?: number; feintBy?: number; answered?: number; split?: number;
  /** The lull after a loss (the rest scatter): its pattern. */
  lost?: boolean;
  /** The heron's sync: blinking where she blinks till then, from her blinks after syncFrom. The toad's leap: its cloud comes down then, where it lands. */
  syncUntil?: number; syncFrom?: number; cloudAt?: { id: number; at: number };
  seed: number;
  /** When a member whose turn it was last waited only on her dodge token (rules/combat.ts, tuning dodge.a): the combo runs on while
   *  they wait, so its strikes at her go one after another (Ed, 2026-10-20: the dodge's limit holds inside a pack). */
  held?: number;
  /** This step's strikers at her (winding up or lunging), by slot, and how many may be at once (packGate; markStrike counts each new one). */
  live?: { all: number; lanes: number; lines: number; cap: number; calling: boolean };
}
/** What the director tells a member this step. */
export interface Directive {
  team?: TeamState;
  member?: number;
  role: Role; phase: Phase; state: PackState;
  /** Is it its turn to strike (its role's step of the combo, not struck this combo)? packGate adds the pressure. */
  may: boolean;
  /** The move it uses (by its role; a wind-up or lunge under way keeps the one it began). */
  move: Move;
  /** Where to go instead of fighting (the lull's pattern, a hurt one keeping away, her pack holding), and whether it stands still. */
  slot?: { x: number; z: number }; still?: boolean;
  /** A freeze (its retreat "freeze"), for the lull's first part (prowl.freeze): at its place it holds, hard to see, then prowls. */
  freeze?: boolean;
}

// ---- Moves on the level's budget -------------------------------------------------------------------------------------------

/** A kind's move at a level: its attack (scaled to the fight), the name the shot carries, and its damage (the level's dps times its
 *  cooldown, split over its shots: three moves from young stay on the level's power budget, combat.md). Null: the kind has none. */
export function packAttack(species: string, level: Level, move: Move, data: PacksData = PACKS): { name: string; attack: Attack; damage: number; shots: number; spread: number } | null {
  const K = packKindOf(species, data);
  if (!K || level < 1 || level > 2) return null;
  const young = level === 1 ? data.young : null, dps = COMBAT.levels.dps[level] * strengthOf(species, level);
  if (move === "melee") {
    if (!K.melee) return null;
    const base = K.melee.attacks?.[level] ?? (level === 1 ? "nip" : "maul");
    if (!base) return null;
    const name = `pack:${species}:melee:${level}`;
    let A = COMBAT.attacks[name];
    if (!A) {
      const B = COMBAT.attacks[base];
      A = { ...B, windup: B.windup * (young?.windup ?? 1), ...(K.melee.knockback ? { modifier: "knockback" as const, knockback: K.melee.knockback } : {}) };
      COMBAT.attacks[name] = A;
    }
    const S = scaled(name, A);
    return { name, attack: S, damage: dps * S.cooldown * (S.factor ?? 1), shots: 1, spread: 0 };
  }
  const R = K.ranged;
  if (!R) return null;
  const shots = Math.max(1, R.shots[level] ?? 1), name = `pack:${species}:ranged:${level}`;
  let A = COMBAT.attacks[name];
  if (!A) {
    const own = R.attacks?.[level], B: Attack = own && COMBAT.attacks[own] ? COMBAT.attacks[own] : R.delivery === "lob" ? { ...data.bolt, delivery: "lob", flight: R.flight ?? 1.1 } : data.bolt;
    A = { ...B, range: R.range * (young?.range ?? 1), speed: (B.speed ?? 20) * (R.speed ?? 1) * (young?.speed ?? 1), windup: B.windup * (young?.windup ?? 1), radius: (B.radius ?? 0.6) * (R.size?.[level] ?? 1) };
    COMBAT.attacks[name] = A;
  }
  const S = scaled(name, A);
  return { name, attack: S, damage: (dps * S.cooldown) / shots, shots, spread: ((R.spread ?? 0) * Math.PI) / 180 };
}
/** The move a member's wind-up or lunge uses now (for the view's telegraphs): its pack's, or null if it isn't in one. */
export const packMoveOf = (c: Creature): { attack: Attack; name: string } | null => {
  const m = c.fight?.packMove;
  return m ? packAttack(c.species, c.level, m) : null;
};

// ---- Roles by position -----------------------------------------------------------------------------------------------------

/** Whether a member is hurt (under limits.hurt of its health): it leaves the combo and keeps away. */
/** Hurt: its slots filled past the share limits.hurt leaves (hearts on one of the wild, 💧s on one of hers: rules/orbit.ts). */
export const hurt = (c: Creature, data: PacksData = PACKS): boolean => (c.leashed || c.state === "happy" ? c.drops ?? 0 : c.dazed ? 1 : c.affection ?? 0) > 1 - data.limits.hurt + 1e-9;

/** Roles by position (Ed: 2b): the nearest healthy member lunges (and any other within limits.close of her), the one behind her
 *  (else the furthest) throws the special, the rest at range fire; the hurt keep away while a healthy one fights (all of them hurt,
 *  they fight on as if whole); past limits.combo the furthest hold back. `heading`: which way she's going (her back is
 *  the other way). Pure, for the tests. */
export function assignRoles(members: readonly Creature[], p: { x: number; z: number }, heading: { x: number; z: number } | null, data: PacksData = PACKS): Map<number, Role> {
  const out = new Map<number, Role>(), dist = (c: Creature) => Math.hypot(c.x - p.x, c.z - p.z);
  // (a hurt one keeps away only while a healthy packmate fights: a lone one, or a pack all hurt, fights on, so a fight comes to an
  // end: Ed, 2026-10-20, a boar at 1 hp kept off her parked wolf for good)
  const fightOn = members.every(c => hurt(c, data));
  const healthy = members.filter(c => { if (!fightOn && hurt(c, data)) { out.set(c.id, "hurt"); return false; } return true; }).sort((a, b) => dist(a) - dist(b) || a.id - b.id);
  const inCombo = healthy.slice(0, data.limits.combo);
  for (const c of healthy.slice(data.limits.combo)) out.set(c.id, "hold");
  if (!inCombo.length) return out;
  out.set(inCombo[0].id, "lunger");
  const rest = inCombo.slice(1);
  if (rest.length) {
    // (behind her: the most nearly opposite her heading, if well behind; else the furthest)
    let sp = rest[rest.length - 1];
    if (heading) {
      let best = 0.3;
      for (const c of rest) { const dx = c.x - p.x, dz = c.z - p.z, d = Math.hypot(dx, dz) || 1, back = -(dx * heading.x + dz * heading.z) / d; if (back > best) { best = back; sp = c; } }
    }
    // (the ones at range fire; the ones right on her, within limits.close, lunge too: Ed's playtest, v3893, "they miss me")
    const close = (data.limits.close ?? 0) * FIGHT.scale;
    for (const c of rest) out.set(c.id, c === sp ? "special" : dist(c) <= close ? "lunger" : "shooter");
  }
  return out;
}

// ---- The director ----------------------------------------------------------------------------------------------------------

const rhythmOf = (K: PackKind, data: PacksData) => data.rhythms[K.rhythm] ?? data.rhythms.steady;
const keyOf = (c: Creature, tg: Target) => `${c.leashed ? "h" : "w"}|${c.species}|${tg.kind}:${tg.kind === "sound" ? tg.key : tg.id}`;
/** The lull's length (Ed: 8c): its rhythm's, longer for each member past the first, and for a young pack. */
export function lullOf(K: PackKind, n: number, young: boolean, data: PacksData = PACKS): number {
  const R = rhythmOf(K, data);
  return (R.lull + R.perMember * Math.max(0, n - 1)) * (young ? data.young.lull : 1);
}

/** The world the director reads beyond combat's own (her dodge and 💌s, her confusion): optional, so the tests can leave it out. */
export interface PackWorld {
  /** Where each witch's last blink went, and when. */
  dash?: (id: number) => { at: number; x: number; z: number } | null;
  /** Whether one of her 💌s reached this creature just now. */
  lettered?: (id: number) => boolean;
  /** She's dragged `metres` toward (x, z), no hurt (the spider's web line, the crocodile's current, the griffin's gust); a blink dodges it. */
  pull?: (id: number, x: number, z: number, metres: number) => void;
  /** Her aim turns up to `drift` radians, wavering, till then (the stoat's war dance); `move`: her movement instead (the bat's screech). */
  confuse?: (id: number, until: number, drift: number, move?: boolean) => void;
}

/** One step of every pack: group the fighters of pack kinds, run each pack's phases and specials, and give each member its directive.
 *  `s.packs` keeps the packs' states between steps; a pack none of whose members is left is let go. */
export function stepPacks(s: CombatState, w: CombatWorld, pw: PackWorld = {}, data: PacksData = PACKS): Map<number, Directive> {
  const time = w.time, out = new Map<number, Directive>(), states = (s.packs ??= new Map());
  const coordinated = spacingOn(w.t);
  if (coordinated) stepTeams(s, w, data, c => strikingNow(c) || !!c.burrow);
  const groups = new Map<string, Creature[]>();
  for (const c of w.active) {
    const tg = c.fight?.target;
    // (a soundsystem or speaker doesn't fight back or dodge: at one a creature fights as before packs, its own attack at full rate,
    // no combo, lull or retreat: Ed, 2026-10-20, a lone boar dealt under half its damage a second to a home speaker)
    if (!tg || tg.kind === "sound" || c.mind || c.gone || c.level < 1 || c.level > 2 || c.boss || c.fleeUntil || c.dazed || !fighting(c) || !packKindOf(c.species, data)) continue;
    const k = keyOf(c, tg);
    let l = groups.get(k);
    if (!l) groups.set(k, (l = []));
    l.push(c);
  }
  // Hidden ones come back down round her (the squirrels' scatter, the trees, the burrow) once their time is up.
  for (const c of w.active) {
    if (c.packHide && time >= c.packHide.until) c.packHide = undefined; // (where its way round got it to: rules/combat.ts)
    if (c.packShell !== undefined && time >= c.packShell) c.packShell = undefined;
    if (c.packSync !== undefined && time >= c.packSync) c.packSync = undefined;
    if (c.mind && time >= c.mind.until) { c.mind = undefined; if (c.fight?.target?.kind === "witch" && c.leashed) c.fight.target = null; } // (her animal turned on her is hers again)
  }
  if (s.mirages?.length) s.mirages = s.mirages.filter(m => time < m.until);
  if (s.decoys?.length) s.decoys = s.decoys.filter(q => time < q.until && !!w.creatures[q.id] && !w.creatures[q.id].gone);
  for (const k of [...states.keys()]) if (!groups.has(k)) states.delete(k);
  for (const [key, members] of groups) {
    members.sort((a, b) => a.id - b.id);
    const c0 = members[0], K = packKindOf(c0.species, data)!, R = rhythmOf(K, data), tg = c0.fight!.target!, p = targetPos(w, s, tg);
    if (!p) continue;
    let st = states.get(key);
    if (!st) states.set(key, (st = { key, species: c0.species, hers: !!c0.leashed, phase: "approach", at: time, until: Infinity, step: 0, stepAt: time, combo: 0, struck: [], members: members.map(m => m.id), size: members.length, specialReadyAt: time, specialDone: false, seed: hash2(c0.id, Math.floor(time), 4421) }));
    const team = coordinated ? teamOf(s, c0.id) : undefined;
    const heading = headingFor(w, tg), roles = team ? new Map(members.map(m => [m.id, team.roles[m.id] ?? "hold"])) : assignRoles(members, p, heading, data), young = members.every(m => m.level === 1);
    // A loss (one of them knocked down, invited or run off): the rest scatter and regroup (Ed: 7d).
    // (lost: one of last step's members knocked down, run off, dazed or invited away; not one that has only turned on someone else)
    const lostOne = st.members.some((id: number) => { const o = w.creatures[id]; return !o || o.gone || !!o.fleeUntil || !!o.dazed || !!o.leashed !== st!.hers; });
    st.size = members.length; st.members = members.map(m => m.id);
    const healthy = members.filter(m => roles.get(m.id) !== "hurt" && roles.get(m.id) !== "hold");
    // (a member whose strike is its own move engages from that move's reach: a charge's or a leap's furthest, a burrow's start, a
    // flyer's circle: so it sets off from there, its turn come)
    const reachOf = (m: Creature) => {
      const lunge = roles.get(m.id) === "lunger", mv = lunge && lungeMove(m.species, K) === "melee" ? ownStrike(m.species) : null, S = FIGHT.scale;
      if (mv) return (mv.kind === "charge" ? mv.to ?? 40 : mv.kind === "leap" ? (mv.to ?? 30) * FIGHT.leap.reach : mv.kind === "burrow" ? mv.from ?? 10 : (mv.radius ?? 12) * 1.2) * S;
      const a = packAttack(m.species, m.level, lunge ? lungeMove(m.species, K) : K.ranged ? "ranged" : "melee", data); return a ? a.attack.range + (a.attack.lunge ?? 0) : 4;
    };
    const near = healthy.length ? Math.min(...healthy.map(m => Math.hypot(m.x - p.x, m.z - p.z) - reachOf(m))) : Infinity;
    const enter = (ph: Phase, until = Infinity) => { st!.phase = ph; st!.at = time; st!.until = until; };
    if (!team && lostOne && !st.hers && (st.phase === "combo" || st.phase === "tell")) { st.lost = true; enter("lull", time + lullOf(K, members.length, young, data)); }
    // The toad's cloud comes down where its thrower lands from its leap.
    if (st.cloudAt && time >= st.cloudAt.at) { const b = w.creatures[st.cloudAt.id]; st.cloudAt = undefined; if (b && !b.gone) cloud(s, w, pw, K, b, tg, young, data); }
    // The heron's sync: while it lasts, a blink of hers since it began brings `count` of the pack blinking in round where it put her.
    if (st.syncUntil !== undefined && time < st.syncUntil && tg.kind === "witch" && pw.dash) {
      const dsh = pw.dash(tg.id);
      if (dsh && dsh.at > (st.syncFrom ?? Infinity)) {
        st.syncFrom = dsh.at;
        const sp = specialOf(K, data), S = FIGHT.scale, ring = (sp.ring ?? 2.5) * S;
        const who = members.filter(m => roles.get(m.id) !== "hurt" && !m.packHide && !(m.fight && (m.fight.windupUntil > 0 || m.fight.lunge))).sort((a, b) => Math.hypot(a.x - dsh.x, a.z - dsh.z) - Math.hypot(b.x - dsh.x, b.z - dsh.z)).slice(0, Math.max(1, sp.count ?? 1));
        for (const m of who) {
          const a = Math.atan2(m.z - dsh.z, m.x - dsh.x);
          s.events.push({ kind: "packSync", x: m.x, z: m.z, at: time, id: m.id });
          m.x = dsh.x + Math.cos(a) * ring; m.z = dsh.z + Math.sin(a) * ring; m.vx = 0; m.vz = 0; m.charge = undefined;
          m.packSync = time + 1.5; st.struck = st.struck.filter((id: number) => id !== m.id);
          if (m.fight) m.fight.readyAt = Math.min(m.fight.readyAt, time);
          s.events.push({ kind: "packSync", x: m.x, z: m.z, at: time, id: m.id });
        }
      }
    }
    if (team) {
      const newRound = st.combo !== team.round + 1, oldPhase = st.phase;
      st.phase = team.phase; st.at = team.at; st.until = team.nextAt; st.step = 1;
      if (newRound) { st.combo = team.round + 1; st.struck = []; st.specialDone = false; st.callUntil = undefined; st.feintUntil = undefined; st.feintBy = undefined; st.answered = undefined; st.split = undefined; st.lost = undefined; }
      if (st.phase === "tell" && (newRound || oldPhase !== "tell")) for (const m of members) { m.packGlow = st.until; s.events.push({ kind: "packTell", x: m.x, z: m.z, at: time, id: m.id }); }
      if (st.phase === "combo" && !st.specialDone && time >= st.specialReadyAt) {
        special(s, w, pw, st, K, members, roles, tg, p, young, data);
        st.specialDone = members.some(m => roles.get(m.id) === "special" && team.used.includes(m.id));
      }
    } else switch (st.phase) {
      case "approach": if (near <= data.limits.engage * FIGHT.scale) { enter("tell", time + R.tell); for (const m of members) { m.packGlow = time + R.tell; s.events.push({ kind: "packTell", x: m.x, z: m.z, at: time, id: m.id }); } } break;
      case "tell": if (time >= st.until) { enter("combo", time + R.timeout); st.combo++; st.feintUntil = undefined; st.feintBy = undefined; st.struck = []; st.step = 0; st.stepAt = time; st.specialDone = false; st.callUntil = undefined; st.answered = undefined; st.split = undefined; st.lost = undefined;
        // A feinting kind (the fox) feints first: the special member fakes the lunge's tell, then the lunger's real one lands.
        if (K.special === "feint" && time >= st.specialReadyAt) {
          const by = [...roles].find(([, r]) => r === "special")?.[0] ?? null;
          if (by !== null) {
            const sp = data.specials.feint, f = w.creatures[by], isYoung = young;
            st.feintBy = by; st.feintUntil = time + (sp.lead ?? 0.45) * (isYoung ? 1 / data.young.special : 1); st.specialReadyAt = time + sp.cooldown;
            f.feintUntil = st.feintUntil;
            s.events.push({ kind: "windup", x: f.x, z: f.z, at: time, id: by }); s.events.push({ kind: "packSpecial", x: f.x, z: f.z, at: time, id: by }); st.specialDone = true;
          }
        }
      } break;
      case "combo": {
        const busy = strikingNow;
        const lungerId = [...roles].find(([, r]) => r === "lunger")?.[0];
        const lunger = lungerId !== undefined ? w.creatures[lungerId] : null;
        // Step 1 (the shots) as the lunger commits (its lunge under way, or it has struck), or after two gaps if it can't get in.
        if (st.step === 0 && (time >= (st.feintUntil ?? -Infinity)) && ((lunger && (lunger.fight?.lunge || st.struck.includes(lunger.id))) || !lunger || time - st.stepAt > R.gap * 2 + (st.feintUntil ? (st.feintUntil - st.stepAt) : 0))) { st.step = 1; st.stepAt = time; }
        // Step 2 (the special) a gap after the shots.
        // (and only once one of them has struck: a special never opens a combo; a combo nobody could strike in ends without one)
        // (with its shooters waiting their turns on her dodge token, once the first shot's gone too: the shots still before the special)
        const waiting = st.held !== undefined && time - st.held <= R.gap;
        const shot = st.struck.some((id: number) => w.creatures[id]?.fight?.packMove === "ranged") || !members.some(m => roles.get(m.id) === "shooter");
        const onlySpecial = !!team && !members.some(m => roles.get(m.id) === "lunger" || roles.get(m.id) === "shooter");
        if (st.step === 1 && time - st.stepAt >= R.gap && (st.struck.length > 0 || onlySpecial) && (shot || !waiting)) { st.step = 2; st.stepAt = time; }
        if (st.step === 2 && !st.specialDone) { if (time >= st.specialReadyAt) special(s, w, pw, st, K, members, roles, tg, p, young, data); st.specialDone = true; }
        // The end: the special thrown and a gap on with nobody mid-strike, or its time up.
        // (and nobody waiting its turn on her dodge token: they strike one after another till the combo's timeout)
        if ((st.step === 2 && time - st.stepAt >= R.gap && !members.some(busy) && !waiting) || time >= st.until) {
          if (st.hers) enter("lull", time + data.hers.hold);
          else enter("lull", time + lullOf(K, members.length, young, data));
        }
        break;
      }
      case "lull": if (time >= st.until) { st.lost = undefined; if (near <= data.limits.engage * FIGHT.scale) { enter("tell", time + R.tell); for (const m of members) { m.packGlow = time + R.tell; s.events.push({ kind: "packTell", x: m.x, z: m.z, at: time, id: m.id }); } } else enter("approach"); } break;
    }
    // Reactive (Ed: 3c). A 💌 at one of them: cover for it (a covering kind), else the special onto her now.
    if (st.phase === "combo" && st.answered !== st.combo && pw.lettered && tg.kind === "witch") {
      const hit = members.find(m => pw.lettered!(m.id));
      if (hit && time >= st.specialReadyAt) { st.answered = st.combo; special(s, w, pw, st, K, members, roles, tg, p, young, data, hit); st.specialDone = true; }
    }
    // Her party animal engaging one of them: the pack splits, the half nearest it turning on it.
    if (!st.hers && st.split !== st.combo && st.phase !== "lull") {
      const side = sideOf(c0);
      for (const o of w.active) {
        const ot = o.fight?.target;
        if (!o.leashed || ot?.kind !== "creature" || !members.some(m => m.id === ot.id) || !targetable(o) || !foes(sideOf(o), side)) continue;
        if (Math.hypot(o.x - w.creatures[ot.id].x, o.z - w.creatures[ot.id].z) > data.limits.split * FIGHT.scale || members.length < 2) continue;
        st.split = st.combo;
        const half = [...members].sort((a, b) => Math.hypot(a.x - o.x, a.z - o.z) - Math.hypot(b.x - o.x, b.z - o.z)).slice(0, Math.floor(members.length / 2));
        for (const m of half) if (m.fight && !m.fight.lunge && m.fight.windupUntil === 0) m.fight.target = { kind: "creature", id: o.id };
        s.events.push({ kind: "packSplit", x: o.x, z: o.z, at: time, id: o.id });
        break;
      }
    }
    // Each member's directive.
    const strikingAt = members.filter(m => m.fight && strikingNow(m));
    const lanes = strikingAt.filter(m => m.fight!.packMove === "melee").length, lines = strikingAt.filter(m => m.fight!.packMove === "ranged").length;
    const calling = st.callUntil !== undefined && time < st.callUntil, cap = calling ? members.length : K.pressure;
    st.live = { all: strikingAt.length, lanes, lines, cap, calling };
    const R2 = data.retreats[st.lost ? "zigzagApart" : K.retreat] ?? data.retreats.rollApart;
    const n = members.length;
    members.forEach((m, i) => {
      const role = roles.get(m.id)!;
      const own = m.fight?.packMove;
      const move: Move = own && m.fight && strikingNow(m) ? own : role === "lunger" ? lungeMove(m.species, K) : K.ranged ? "ranged" : "melee";
      const d: Directive = { role, phase: st!.phase, state: st!, may: false, move, ...(team ? { team, member: m.id } : {}) };
      const own2 = profileOf(m.species)?.move;
      if (m.packSync !== undefined && time < m.packSync) {
        // Blinked in where she blinked (the heron's sync): it strikes at once, whatever the pack's phase.
        d.may = true;
      } else if (own2?.kind === "ambush" && own2.strike && m.sprung !== undefined && time - m.sprung < (own2.time ?? 0.5) && !st!.struck.includes(m.id) && !st!.hers) {
        // Sprung from lying in wait (the snake, its move's strike): it strikes as it springs, whatever the pack's phase (Ed, 2026-10-20:
        // kinds keep their own moves in a pack), taking a token like any strike.
        d.may = true; d.move = "melee";
      } else if (role === "hurt" && !st!.hers) {
        // Hurt members run while the healthy attack (Ed): out of reach, on its own bearing from her.
        const a = Math.atan2(m.z - p.z, m.x - p.x), out2 = 18 * FIGHT.scale;
        d.slot = { x: p.x + Math.cos(a) * out2, z: p.z + Math.sin(a) * out2 };
      } else if (st!.phase === "lull" && !st!.hers) {
        const k = Math.min(1, (time - st!.at) / Math.max(0.1, st!.until - st!.at));
        d.slot = styleOf(m.species, data) === "charger" && tg.kind === "witch" && !R2.still && !st!.lost ? wheelSlot(st!, R2, m, p, data, spacingOn(w.t) ? w.t : undefined) : retreatSlot(K.retreat, st!, R2, m, i, n, p, k, time);
        d.still = !!R2.still; d.freeze = K.retreat === "freeze" && !st!.lost && k < data.prowl.freeze; // (a freeze holds only the lull's first part, then prowls: Ed, 2026-10-23)
        // Out of sight in the trees or underground for the lull's middle, back down from another side (rules here, drawing: not drawn).
        if ((R2.hide === true || (R2.hide === "half" && i % 2 === 0)) && !m.packHide && k > 0.3 && k < 0.5) { const a = st!.seed * Math.PI * 2 + Math.PI + (i / n) * Math.PI * 2, r = (R2.out * 0.8) * FIGHT.scale; m.packHide = { until: st!.until, tx: p.x + Math.cos(a) * r, tz: p.z + Math.sin(a) * r, at: time }; }
        if (K.retreat === "shell" && !m.packShell) m.packShell = Math.min(st!.until, time + 2); // (the snail: into its shell, untouchable 2 s)
        if (K.retreat === "hold" && (m.dug === undefined || time >= m.dug)) m.dug = st!.until; // (the badger: digs in and waits)
      } else if (st!.phase === "combo") {
        const struck = st!.struck.includes(m.id), feinting = st!.feintBy === m.id && time < (st!.feintUntil ?? 0);
        const turn = calling || (role === "lunger" ? time >= (st!.feintUntil ?? -Infinity) : (role === "shooter" || role === "special") && st!.step >= 1);
        d.may = turn && !struck && !feinting && role !== "hold" && (!team || role !== "special");
      }
      out.set(m.id, d);
    });
    if (st.phase === "lull" && !st.hers && !R2.still && tg.kind === "witch") spreadLull(members.map(m => ({ m, d: out.get(m.id)! })).filter(e => e.d.slot && e.d.role !== "hurt"), p, data, K.retreat === "freeze" && !st.lost ? 1 : undefined, spacingOn(w.t) ? w.t : undefined); // (a freeze holds near its own place: only spread apart)
  }
  return out;
}

/** A charger's place in the lull (packs.json styles.charger): on past her and wheeling round wide, `carrot` radians ahead of where it
 *  is round her at `wheel` times the lull's distance, the pack all one way round (by its seed), so it comes again from the far side. */
export function wheelSlot(st: { seed: number }, R: { out: number }, m: Creature, p: { x: number; z: number }, data: PacksData = PACKS, tuning?: Tuning): { x: number; z: number } {
  const C = data.styles.charger, dir = st.seed < 0.5 ? 1 : -1, a = Math.atan2(m.z - p.z, m.x - p.x) + dir * (tuning ? SPACING.charger.carrot : C.carrot), r = R.out * C.wheel * FIGHT.scale * (tuning ? SPACING.charger.out : 1) + (tuning ? drawnRadius(m, tuning) : 0);
  return { x: p.x + Math.cos(a) * r, z: p.z + Math.sin(a) * r };
}

/** The lull's places spread out (Ed's playtest, 2026-10-29: "their lulls are too close"): each member's place out lullOut times as far
 *  from her (`out`: a freeze 1), its own radius within jitter (by its id), then pushed apart to at least lullGap metres from each other. Pure but for the
 *  slots it moves. */
export function spreadLull(es: { m: Creature; d: { slot?: { x: number; z: number } } }[], p: { x: number; z: number }, data: PacksData = PACKS, out = data.styles.lullOut, tuning?: Tuning): void {
  const Y = data.styles;
  for (const { m, d } of es) {
    const ox = d.slot!.x - p.x, oz = d.slot!.z - p.z, k = out === 1 ? 1 : out * (1 - Y.jitter + 2 * Y.jitter * hash2(m.id, 3, 1029));
    d.slot = { x: p.x + ox * k, z: p.z + oz * k };
  }
  for (let it = 0; it < (tuning ? SPACING.slotPasses : 4); it++) for (let a = 0; a < es.length; a++) for (let b = a + 1; b < es.length; b++) {
    const A = es[a].d.slot!, B = es[b].d.slot!, dx = B.x - A.x, dz = B.z - A.z, dd = Math.hypot(dx, dz);
    const gap = tuning ? bodyGap(es[a].m, es[b].m, tuning) : Y.lullGap * FIGHT.scale;
    if (dd >= gap) continue;
    const ux = dd > 1e-3 ? dx / dd : Math.cos(a + b), uz = dd > 1e-3 ? dz / dd : Math.sin(a + b), push = (gap - dd) / 2;
    es[a].d.slot = { x: A.x - ux * push, z: A.z - uz * push }; es[b].d.slot = { x: B.x + ux * push, z: B.z + uz * push };
  }
}

/** May it start a wind-up now: its turn, and room under its pack's pressure (Ed: 5), never more than limits.lanes melee strikes and
 *  limits.lines shots at her at once (combat.md: readability), the call lifting both? */
export function packGate(d: Directive, data: PacksData = PACKS): boolean {
  if (d.team && d.member !== undefined && d.team.used.includes(d.member)) return false;
  const L = d.state.live;
  if (!d.may || !L) return d.may && !L;
  if (L.calling) return L.all < L.cap;
  return L.all < L.cap && (d.move === "melee" ? L.lanes < data.limits.lanes : L.lines < data.limits.lines);
}

/** A member has begun a wind-up (rules/combat.ts): it strikes once a combo, with this move, and counts against the pressure. */
export function markStrike(d: Directive, c: Creature): void {
  if (d.team && !d.team.used.includes(c.id)) d.team.used.push(c.id);
  if (!d.state.struck.includes(c.id)) d.state.struck.push(c.id);
  c.packSync = undefined; // (the heron's synced strike begun)
  if (c.fight) c.fight.packMove = d.move;
  const L = d.state.live;
  if (L) { L.all++; if (d.move === "melee") L.lanes++; else L.lines++; }
}

/** Her heading for the roles (her back), or a creature's. */
function headingFor(w: CombatWorld, tg: Target): { x: number; z: number } | null {
  const v = tg.kind === "witch" ? w.witches[tg.id] : tg.kind === "creature" ? w.creatures[tg.id] : null;
  const vx = v?.vx ?? 0, vz = v?.vz ?? 0, m = Math.hypot(vx, vz);
  return m > 1.5 ? { x: vx / m, z: vz / m } : null;
}

/** Where a member makes for in the lull, by its kind's retreat pattern (Ed: 20), k of the way through it: round her at the pattern's
 *  distance. Pure, for the tests. */
export function retreatSlot(pattern: string, st: { seed: number; at: number }, R: { out: number }, m: Creature, i: number, n: number, p: { x: number; z: number }, k: number, time: number): { x: number; z: number } {
  const S = FIGHT.scale, out = R.out * S, base = st.seed * Math.PI * 2, from = Math.atan2(m.z - p.z, m.x - p.x);
  const at = (a: number, r: number) => ({ x: p.x + Math.cos(a) * r, z: p.z + Math.sin(a) * r });
  switch (pattern) {
    case "shell": case "hold": return { x: m.x, z: m.z };
    case "circle": return at(base + (i / n) * Math.PI * 2 + k * Math.PI * 1.5, out); // (all one way round her)
    case "splitBack": { const side = i % 2 ? 1 : -1; return at(base + Math.PI + side * (0.6 + k * 0.6), out); } // (two groups, round to her back)
    case "leapfrog": return at(from, (i % 2 ? out : out * 0.5)); // (half falls back behind the other half)
    case "zigzagApart": { const a = base + (i / n) * Math.PI * 2 + Math.sin(time * 4 + i) * 0.35; return at(a, out); } // (different ways, zigzagging)
    // Phase 1's (Echo, 2026-10-19):
    case "flanks": { const side = i % 2 ? 1 : -1; return at(base + side * (Math.PI / 2) + side * k * 0.4, out); } // (the wolves: split in two, circling to her flanks)
    case "backLine": { const ux = Math.cos(base), uz = Math.sin(base), off = (i - (n - 1) / 2) * 3 * S, r = out * (0.4 + 0.6 * k); return { x: p.x + ux * r - uz * off, z: p.z + uz * r + ux * off }; } // (the boars: backing off slowly in a line, facing her)
    case "huddle": { const a = (i / n) * Math.PI * 2; return { x: p.x + Math.cos(base) * out + Math.cos(a) * 1.6 * S, z: p.z + Math.sin(base) * out + Math.sin(a) * 1.6 * S }; } // (the beetles: plodding back into a huddle)
    case "arcs": return at(base + (i / n) * Math.PI * 2 + Math.sin(k * Math.PI) * 0.8 * (i % 2 ? 1 : -1), out); // (the toads: hopping off apart in arcs)
    case "swirl": return at(base + (i / n) * Math.PI * 2 + k * Math.PI * 3, out); // (the moths: a swirl round her, quicker than a circle)
    default: return at(base + (i / n) * Math.PI * 2, out); // rollApart, trees, burrowApart, freeze, branches, water: all different ways
  }
}

/** A pack's special (Ed: 13c, 19), by the member whose role it is (or `hit`, the one a 💌 reached, for cover). */
function special(s: CombatState, w: CombatWorld, pw: PackWorld, st: PackState, K: PackKind, members: Creature[], roles: Map<number, Role>, tg: Target, p: { x: number; z: number; r: number }, young: boolean, data: PacksData, hit?: Creature): void {
  const time = w.time, S = FIGHT.scale, sp = specialOf(K, data);
  const byId = [...roles].find(([, r]) => r === "special")?.[0] ?? [...roles].find(([, r]) => r === "lunger")?.[0];
  const by = byId !== undefined ? w.creatures[byId] : members[0], side = sideOf(by);
  const team = spacingOn(w.t) ? teamOf(s, by.id) : undefined;
  if (spacingOn(w.t) && (!team || roles.get(by.id) !== "special" || team.used.includes(by.id))) return;
  if (team) { team.used.push(by.id); young = by.level === 1; }
  const scale = young ? data.young.special : 1;
  const healthy = members.filter(m => roles.get(m.id) !== "hurt");
  st.specialReadyAt = time + sp.cooldown;
  s.events.push({ kind: "packSpecial", x: by.x, z: by.z, at: time, id: by.id });
  const T = (sp.time ?? 2) * scale, Rr = (sp.radius ?? 6) * S * scale;
  switch (K.special) {
    case "stampede": {
      // At her, every member's turn to charge for its time, as a call: one after another as her dodge tokens free up (Ed, 2026-10-20:
      // the dodge's limit holds inside a pack; each charge is a member's own, rules/combat.ts). Hers on the wild: all at once.
      if (tg.kind === "witch" && huntsWitch(side)) { st.callUntil = time + T; st.struck = []; break; }
      const P = profileOf(by.species)?.move; for (const m of healthy) if (P?.kind === "charge" && !m.charge && m.fight && !m.fight.lunge && m.fight.windupUntil === 0) startCharge(m, P, p.x, p.z, time); break;
    }
    case "scatter": { const n = healthy.length; healthy.forEach((m, i) => { const a = st.seed * Math.PI * 2 + (i / Math.max(1, n)) * Math.PI * 2, r = Math.max(6 * S, (packAttack(m.species, m.level, "ranged", data)?.attack.range ?? 10) * 0.6) * (sp.ring ?? 1); if (m.fight && !m.fight.lunge && m.fight.windupUntil === 0) m.packHide = { until: time + T, tx: p.x + Math.cos(a) * r, tz: p.z + Math.sin(a) * r, at: time }; }); break; }
    case "call": st.callUntil = time + T; st.struck = []; break;
    case "feint": {
      if (team) { st.feintBy = by.id; st.feintUntil = time + (sp.lead ?? 0.45) / scale; by.feintUntil = st.feintUntil; s.events.push({ kind: "windup", x: by.x, z: by.z, at: time, id: by.id }); }
      break;
    }
    case "confusion": {
      if (tg.kind === "witch" && huntsWitch(side)) { const v = w.witches[tg.id]; if (v && healthy.some(m => Math.hypot(m.x - v.x, m.z - v.z) <= Rr)) pw.confuse?.(tg.id, time + T, ((sp.drift ?? 35) * Math.PI) / 180, !!sp.move); }
      else for (const o of w.active) if (o !== by && targetable(o) && foes(sideOf(o), side) && Math.hypot(o.x - by.x, o.z - by.z) <= Rr) o.slowUntil = Math.max(o.slowUntil ?? 0, time + T); // (hers on the wild: they're slowed)
      break;
    }
    case "cloud": {
      // The toad's: it leaps at her and the cloud comes down where it lands (stepPacks); else at the thrower, now.
      if (sp.leap && !by.leap && !by.charge) {
        const d = Math.hypot(p.x - by.x, p.z - by.z) || 1, short = Math.min(d, 2 * S), fly = 0.9 / FIGHT.speed;
        by.leap = { fx: by.x, fz: by.z, tx: p.x + ((by.x - p.x) / d) * short, tz: p.z + ((by.z - p.z) / d) * short, at: time, lands: time + fly, height: 6 * S, cloud: true };
        by.facing = p.x >= by.x ? 1 : -1;
        st.cloudAt = { id: by.id, at: time + fly };
        s.events.push({ kind: "leapt", x: by.x, z: by.z, at: time, id: by.id });
      } else cloud(s, w, pw, K, by, tg, young, data);
      break;
    }
    case "mirage": {
      // Images of the flock round her (the raven's black shimmers): each takes a 💌 meant for the flock and bursts (rules/invites.ts).
      const n = Math.max(1, sp.images?.[young ? 0 : 1] ?? 3), r = Math.max(6 * S, (sp.ring ?? 1) * 8 * S);
      for (let k = 0; k < n; k++) {
        const a = st.seed * Math.PI * 2 + time + (k / n) * Math.PI * 2, rr = r * (0.75 + 0.5 * hash2(by.id, k + Math.floor(time), 61));
        (s.mirages ??= []).push({ id: s.nextShot++, x: p.x + Math.cos(a) * rr, z: p.z + Math.sin(a) * rr, until: time + T, species: by.species, level: by.level, side, from: by.id });
      }
      break;
    }
    case "sync": st.syncUntil = time + T; st.syncFrom = time; break; // (blinking where she blinks: stepPacks)
    case "knockback": {
      // The run-up and ram (the ram's, the ibex's off a slope, the rhino's): it charges her by its own charge, and that blow throws her
      // `throw` m (hers on the wild: a charge as ever).
      const P = profileOf(by.species)?.move;
      if (P?.kind === "charge" && !by.charge && by.fight && !by.fight.lunge && by.fight.windupUntil === 0) {
        startCharge(by, P, p.x, p.z, time);
        if (tg.kind === "witch") by.packThrow = { until: time + T + (P.windup ?? 0.5) + (P.time ?? 1), metres: (sp.throw ?? 10) * S * scale };
      }
      break;
    }
    case "pull": {
      // Dragged toward the puller (the spider's web line, the crocodile's current, the griffin's gust): her, within its reach; hers on
      // the wild, the foes round it.
      const M = (sp.pull ?? 6) * S * scale, reach = (sp.reach ?? 18) * S * (young ? data.young.range : 1);
      if (tg.kind === "witch" && huntsWitch(side)) {
        // (the special one if she's in its reach, else the nearest of them that has her in its)
        const v = w.witches[tg.id], dOf = (m: Creature) => (v ? Math.hypot(v.x - m.x, v.z - m.z) : Infinity), puller = v && dOf(by) <= reach ? by : healthy.filter(m => dOf(m) <= reach).sort((a, b) => dOf(a) - dOf(b))[0];
        if (v && puller) { pw.pull?.(tg.id, puller.x, puller.z, M); s.events.push({ kind: "packPull", x: v.x, z: v.z, at: time, id: puller.id }); }
      }
      else for (const o of w.active) if (o !== by && targetable(o) && foes(sideOf(o), side) && !o.boss && Math.hypot(o.x - by.x, o.z - by.z) <= reach) { const d = Math.hypot(by.x - o.x, by.z - o.z) || 1, k = Math.min(M, Math.max(0, d - 2 * S)); o.kx = ((by.x - o.x) / d) * k * 6; o.kz = ((by.z - o.z) / d) * k * 6; }
      break;
    }
    case "mind": {
      // Adults only (combat.md): a stare or a glow turns one of her animals on her for its time: the one it's fighting, else the nearest
      // of hers within its radius; none, and she's within it, her aim drifts instead. Hers on the wild: the foe it's on is stunned
      // (packs.json hers.stun).
      if (by.level < 2) break;
      if (huntsWitch(side)) {
        const owner = tg.kind === "witch" ? tg.id : 0, v = w.witches[owner], d = (o: Creature) => Math.hypot(o.x - by.x, o.z - by.z);
        const fought = tg.kind === "creature" ? w.creatures[tg.id] : null;
        const turn = fought && fought.leashed && !fought.boss && !fought.mind ? fought : w.active.filter(o => o.leashed && !o.gone && !o.boss && o.level > 0 && !o.mind && d(o) <= Rr).sort((a, b) => d(a) - d(b))[0];
        if (turn && v) { turn.mind = { until: time + T, of: owner }; s.events.push({ kind: "packMind", x: turn.x, z: turn.z, at: time, id: turn.id }); }
        else if (v && tg.kind === "witch" && healthy.some(m => Math.hypot(m.x - v.x, m.z - v.z) <= Rr)) pw.confuse?.(owner, time + T, ((sp.drift ?? 30) * Math.PI) / 180);
      } else if (tg.kind === "creature") { const o = w.creatures[tg.id]; if (o && !o.boss) observeAttack(w, s, tg, { source: by.id, attack: "pack:mind", delivery: "special", phase: "effect" }, 0, () => { o.stunUntil = Math.max(o.stunUntil ?? 0, time + data.hers.stun); if (o.fight) o.fight.windupUntil = 0; s.events.push({ kind: "stunned", x: o.x, z: o.z, at: time, id: o.id }); }); }
      break;
    }
    case "decoy": (s.decoys ??= []).push({ id: by.id, until: time + T, r: Rr, side }); break; // (the raccoon waving: her 💌s in its way go to it: rules/game.ts)
    case "wall": {
      // Across her path: her heading, else the way from the pack to her.
      const v = tg.kind === "witch" ? w.witches[tg.id] : null, hv = Math.hypot(v?.vx ?? 0, v?.vz ?? 0);
      let hx = hv > 1 ? v!.vx! / hv : p.x - by.x, hz = hv > 1 ? v!.vz! / hv : p.z - by.z; const hd = Math.hypot(hx, hz) || 1; hx /= hd; hz /= hd;
      const cx = p.x + hx * (sp.ahead ?? 4) * S, cz = p.z + hz * (sp.ahead ?? 4) * S, L = (sp.length ?? 10) * S * scale, r = (sp.radius ?? 1.5) * S;
      for (let q = -L / 2; q <= L / 2 + 1e-6; q += r * 1.2) s.trails.push({ x: cx - hz * q, z: cz + hx * q, r, until: time + T, side, slow: sp.slow ?? 0.5, from: by.id });
      break;
    }
    case "rally": for (const m of members) if (Math.hypot(m.x - by.x, m.z - by.z) <= Rr) { const max = stunWorth(m), one = COMBAT.levels.dps[m.level] * 1.5 * (sp.heal ?? 1); const off = one / max; if (m.leashed || m.state === "happy") m.drops = Math.max(0, (m.drops ?? 0) - off) || undefined; else m.affection = Math.max(0, (m.affection ?? 0) - off) || undefined; m.slowUntil = undefined; } break; // (its 💧s taken off, or its slots' newest: rules/orbit.ts)
    case "cover": {
      // Digs in by a hurt packmate (else the one her 💌 reached, else where it stands) and takes its hits.
      const ward = members.find(m => roles.get(m.id) === "hurt") ?? hit ?? null, coverer = ward ? healthy.filter(m => m !== ward).sort((a, b) => Math.hypot(a.x - ward.x, a.z - ward.z) - Math.hypot(b.x - ward.x, b.z - ward.z))[0] ?? by : by;
      if (ward && coverer !== ward) { const a = Math.atan2(p.z - ward.z, p.x - ward.x), r = 1.2 * S; coverer.x = ward.x + Math.cos(a) * r; coverer.z = ward.z + Math.sin(a) * r; ward.coverBy = { id: coverer.id, until: time + T }; }
      coverer.dug = time + T; s.events.push({ kind: "dug", x: coverer.x, z: coverer.z, at: time, id: coverer.id });
      // The beetles lock shells: its packmate (the one it covers, else the nearest) digs in beside it too, both armoured.
      if (sp.both) {
        const mate = ward && ward !== coverer ? ward : healthy.filter(m => m !== coverer).sort((a, b) => Math.hypot(a.x - coverer.x, a.z - coverer.z) - Math.hypot(b.x - coverer.x, b.z - coverer.z))[0];
        if (mate) { mate.dug = time + T; s.events.push({ kind: "dug", x: mate.x, z: mate.z, at: time, id: mate.id }); }
      }
      break;
    }
  }
}

/** A pack's cloud at its thrower (the mole's dust, the moth's, the toad's spores): it hides the tells inside it; a flashing one (the
 *  moth's) confuses her aim if she's in it. */
function cloud(s: CombatState, w: CombatWorld, pw: PackWorld, K: PackKind, by: Creature, tg: Target, young: boolean, data: PacksData): void {
  const time = w.time, sp = specialOf(K, data), scale = young ? data.young.special : 1, side = sideOf(by);
  const T = (sp.time ?? 2) * scale, Rr = (sp.radius ?? 6) * FIGHT.scale * scale;
  (s.clouds ??= []).push({ x: by.x, z: by.z, r: Rr, until: time + T, side, from: by.id, ...(sp.flash ? { flash: time } : {}) });
  if (sp.flash && tg.kind === "witch" && huntsWitch(side)) {
    const v = w.witches[tg.id], C = data.specials.confusion;
    if (v && Math.hypot(v.x - by.x, v.z - by.z) <= Rr) pw.confuse?.(tg.id, time + (C.time ?? 2.5) * scale, ((C.drift ?? 35) * Math.PI) / 180);
  }
}

/** A 💌 of hers reached a mirage image: it bursts (the raven's mirage). */
export function burstMirage(s: CombatState, id: number, time: number): void {
  const m = s.mirages?.find(q => q.id === id);
  if (!m) return;
  s.mirages = s.mirages!.filter(q => q !== m);
  s.events.push({ kind: "mirageBurst", x: m.x, z: m.z, at: time, id: m.from });
}

/** A blow on `o` lands on whoever covers it (the badger dug in beside it), if it's still there. */
export function coverOf(w: CombatWorld, o: Creature): Creature | null {
  const cv = o.coverBy;
  if (!cv || w.time >= cv.until) return null;
  const c = w.creatures[cv.id];
  if (!c || c.gone || !targetable(c) || Math.hypot(c.x - o.x, c.z - o.z) > (PACKS.specials.cover.reach ?? 4) * FIGHT.scale) return null;
  return c;
}

/** Whether a dust cloud hides (x, z) now (the mole's: the tells inside it don't show; the bodies do, and 💌s still land). */
export const clouded = (s: CombatState, x: number, z: number, time: number): boolean => !!s.clouds?.some(k => time < k.until && Math.hypot(k.x - x, k.z - z) <= k.r);

/** Where a shooter at her aims (Ed: "the crossfire aims where the blink went"): just after a blink, where it put her; else null, and
 *  the shot leads her as anyone's does (rules/combat.ts: where she'll be when it gets there). (It aimed half a blink ahead of where
 *  she stood, whatever the shot's flight: at her walk she's 10 m on by the time a bolt from 12 m arrives, so it landed behind her and a
 *  pack missed her walking away: Ed's playtest, v3893, "they miss me".) */
export function dodgeAim(dash: { at: number; x: number; z: number } | null, time: number): { x: number; z: number } | null {
  return dash && time - dash.at < 0.8 ? { x: dash.x, z: dash.z } : null;
}

/** Pack combat's own state in the fight (CombatState). */
export interface Cloud { x: number; z: number; r: number; until: number; side: string; from: number; /** a flashing cloud's flash (the moth's) */ flash?: number }
/** A mirage image (the raven's): where it stands round her, till when, whose image, and who threw it. */
export interface Mirage { id: number; x: number; z: number; until: number; species: string; level: Level; side: string; from: number }
