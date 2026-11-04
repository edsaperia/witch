// Shared mixed-species youth/adult attack rounds. Movement remains per animal; team identity is side + target.
import type { Creature } from "../creatures";
import { type CombatState, type CombatWorld } from "./data";
import type { PacksData, Role, Phase } from "./packs";
import { SPACING } from "../combatSpacing";
import { hash2 } from "../random";
import { aloftHunted, fighting } from "./targeting";
import { FIGHT } from "../movement";
import { actionsOf, actionRole, actionReach, type CreatureAction } from "./actions";

export interface RolePreferences { tempo: number; withdraw: number; rejoin: number; rest: number }
export interface TeamState { seed: number; round: number; phase: Phase; at: number; cycleAt: number; nextAt: number; members: number[]; actions: Record<number, CreatureAction | undefined>; ready: Record<number, Record<string, number>>; roles: Record<number, Role>; used: number[]; withdrawn: Record<number, number>;
  /** A big team's coming rounds' attackers, drawn `teamRounds.ahead` rounds ahead (as each round starts), each with when its window
   *  should open (an estimate kept up each step): its picks close in to be ready by then (rules/combat.ts movingGoal). */
  next?: { round: number; actions: Record<number, CreatureAction | undefined>; readyBy: number }[];
  /** A team past its ring cap (teamRounds.ring): its members in waiting order, this round's unused attackers first, then the coming
   *  rounds' picks, then the rest, the hurt last; each `ring` of them shares one waiting ring, the first the inner (waitingPlace). */
  order?: number[] }
export const rolePreferences = (species: string): RolePreferences => ({ ...SPACING.preferences.default, ...SPACING.preferences.species[species] });
const damage = (c: Creature): number => c.leashed || c.state === "happy" ? c.drops ?? 0 : c.dazed ? 1 : c.affection ?? 0;
export function teamOf(state: CombatState, id: number): TeamState | undefined { return [...(state.waitingTeams?.values() ?? [])].find(team => team.members.includes(id)); }

/** Seeded action choice: arbitrary repertoires, independent readiness, one total pressure budget. */
export function chooseTeamActions(members: readonly Creature[], seed: number, round: number, ready: (c: Creature, action: CreatureAction) => boolean = () => true): Record<number, CreatureAction | undefined> {
  const actions: Record<number, CreatureAction | undefined> = {};
  let active = 0;
  const priority = (c: Creature) => -Math.log(Math.max(1e-9, hash2(c.id, round, seed))) / Math.max(0.1, rolePreferences(c.species).tempo);
  const order = [...members].sort((a, b) => priority(a) - priority(b) || a.id - b.id);
  for (const c of order) {
    const choices = actionsOf(c.species).filter(a => ready(c, a)).map(action => ({action, weight: action.weight * (c.level === 1 ? action.youngWeight : 1)}));
    const total = choices.reduce((n, x) => n + Math.max(0, x.weight), 0);
    if (!total || active >= SPACING.team.active) { actions[c.id] = undefined; continue; }
    let pick = hash2(c.id, round, seed + 1620) * total;
    const chosen = choices.find(choice => { pick -= Math.max(0, choice.weight); return pick < 0; }) ?? choices.filter(x => x.weight > 0).at(-1)!;
    actions[c.id] = chosen.action; active++;
  }
  return actions;
}
/** How much of its round a team of `size` gets (Ed, 2026-11-03: "how about we have the attack round length decrease gradually as the
 *  pack gets larger"; the tuning's teamRounds): 1 at or under `reference` animals (today's 5 s round, 3 s attack window and its kinds'
 *  lull), then (reference / size) ^ strength (0.5: one over the square root), never under `floor`. Smooth and falling with size; the
 *  tell and the dodge token are untouched (rules/combat.ts: still one strike at her at once). */
export const ROUND_DEFAULT = { reference: 20, strength: 0.5, floor: 0.4, ahead: 3, ring: 20, window: 1 };
export function roundScale(size: number, r: { reference: number; strength: number; floor: number; ahead?: number; ring?: number; window?: number } = ROUND_DEFAULT): number {
  if (!(size > r.reference) || !(r.reference > 0)) return 1;
  return Math.min(1, Math.max(r.floor, Math.pow(r.reference / size, r.strength)));
}
export function consumeAction(team: TeamState, id: number, time: number): void {
  if (!team.used.includes(id)) team.used.push(id);
  const action = team.actions[id];
  if (action) (team.ready[id] ??= {})[action.id] = time + Math.max(0, action.cooldown ?? 0);
}

export function stepTeams(state: CombatState, w: CombatWorld, data: PacksData, committed: (c: Creature) => boolean): void {
  const groups = new Map<string, Creature[]>(), teams: Map<string, TeamState> = (state.waitingTeams ??= new Map());
  for (const c of w.active) {
    const target = c.fight?.target;
    if (!target || target.kind === "sound" || c.level < 1 || c.level > 2 || c.boss || !fighting(c) || !data.kinds[c.species]) continue;
    const key = `${c.leashed || c.state === "happy" ? "party" : "wild"}|${target.kind}:${target.id}`;
    const group = groups.get(key); if (group) group.push(c); else groups.set(key, [c]);
  }
  for (const key of teams.keys()) if (!groups.has(key)) teams.delete(key);
  for (const [key, members] of groups) {
    members.sort((a, b) => a.id - b.id);
    let team = teams.get(key);
    if (!team) teams.set(key, (team = { seed: Math.floor(hash2(members[0].id, 1620, 73) * 0x7fffffff), round: -1, phase: "approach", at: w.time, cycleAt: w.time, nextAt: Infinity, members: [], actions: {}, ready: (state.actionReady ??= {}), roles: {}, used: [], withdrawn: {} }));
    team.members = members.map(c => c.id);
    // She's up out of their reach (rules/combat/targeting.ts aloftHunted): they wait round under her and the round holds in its lull,
    // nothing drawn, so her landing starts a fresh round (approach, the tell, the combo) as a new hunt would (Ed, 2026-11-03).
    if (members.every(c => aloftHunted(w, c, c.fight!.target))) { if (team.phase !== "lull") { team.phase = "lull"; team.at = w.time; } team.nextAt = w.time; continue; }
    for (const c of members) {
      const P = rolePreferences(c.species), hurt = damage(c);
      if (!committed(c) && hurt > P.withdraw && team.withdrawn[c.id] === undefined) team.withdrawn[c.id] = w.time + P.rest;
      if (team.withdrawn[c.id] !== undefined && w.time >= team.withdrawn[c.id] && hurt <= P.rejoin) delete team.withdrawn[c.id];
    }
    let available = members.filter(c => team!.withdrawn[c.id] === undefined);
    // A lone/all-hurt team still has an attacker: withdrawal cannot stall the fight forever.
    if (!available.length) available = [[...members].sort((a, b) => damage(a) - damage(b) || a.id - b.id)[0]];
    // One encounter clock drives all species. Recovery completes before a new
    // draw; a committed trajectory always finishes before changing the phase.
    const busy = members.some(committed);
    const opening = team.round < 0, changed = opening || team.phase === "lull" && w.time >= team.nextAt && !busy;
    const round = changed ? team.round + 1 : team.round;
    const ready = (c: Creature, a: CreatureAction) => (team!.ready[c.id]?.[a.id] ?? 0) <= w.time;
    const draw = () => { team!.actions = chooseTeamActions(available, team!.seed, round, ready); team!.roles = Object.fromEntries(Object.entries(team!.actions).map(([id, a]) => [id, a ? actionRole(a) : "hold"])); };
    const rhythms = members.map(c => data.rhythms[data.kinds[c.species].rhythm] ?? data.rhythms.steady);
    const tempo = Math.max(0.1, members.reduce((sum, c) => sum + rolePreferences(c.species).tempo, 0) / members.length);
    const tell = rhythms.reduce((sum, rhythm) => sum + rhythm.tell, 0) / rhythms.length / tempo;
    const rest = rhythms.reduce((sum, rhythm) => sum + rhythm.lull, 0) / rhythms.length / tempo;
    // (a big team's round, attack window and least rest shortened together: the round's shape kept, only quicker; the rest too, as
    // else it held the round at about 7 s whatever the round time; the tell, the warning, never)
    const RT = w.t?.teamRounds ?? ROUND_DEFAULT, scale = roundScale(members.length, RT), roundTime = SPACING.team.roundTime * scale / tempo, attackWindow = SPACING.team.attackWindow * Math.max(scale, RT.window ?? ROUND_DEFAULT.window) / tempo, least = rest * scale;
    // Roles decided in advance (Ed, 2026-11-03, on #1782: "can we decide the roles in advance and have them move in sooner, in time for
    // their attack?"): a team past the reference size (20) keeps its next `teamRounds.ahead` rounds' attackers drawn, each drawn as the
    // round that many before it starts, the same seeded draw that round would make (chooseTeamActions, its round number, each action
    // ready by when that round should start), so they leave the waiting ring in time, each by its own pace, and are at their ready
    // distance as their window opens (movingGoal, rules/combat.ts). Nothing's struck sooner: the tell, the window, the rest and her dodge
    // token are as they were. 20 or fewer: drawn as their round starts, as before; ahead 0, off.
    const ahead = members.length > RT.reference ? Math.max(0, Math.floor(RT.ahead ?? ROUND_DEFAULT.ahead)) : 0;
    // (a round's nominal length: its round time, or its tell, window and least rest if longer; for estimating the ones to come)
    const nominal = Math.max(roundTime, tell + attackWindow + least);
    if (changed) {
      team.round = round; team.phase = "approach"; team.at = w.time; team.nextAt = Infinity; team.used = [];
      const picked = team.next?.[0]?.round === round ? team.next.shift()! : null;
      if (picked) {
        // (picked rounds ago: kept, but for any withdrawn since or whose action isn't ready after all; none left, the reserves' draw below)
        team.actions = {}; team.roles = {};
        for (const c of available) { const a = picked.actions[c.id]; if (a && ready(c, a)) { team.actions[c.id] = a; team.roles[c.id] = actionRole(a); } }
      } else { draw(); team.next = undefined; }
      const next = (team.next ??= []);
      next.length = Math.min(next.length, ahead);
      for (let k = next.length + 1; k <= ahead; k++) { const by = w.time + nominal * k; next.push({ round: round + k, actions: chooseTeamActions(available, team.seed, round + k, (c, a) => (team!.ready[c.id]?.[a.id] ?? 0) <= by), readyBy: Infinity }); }
      if (!next.length) team.next = undefined;
    }
    for (const c of members) if (!available.includes(c) && !committed(c)) team.roles[c.id] = "hurt";
    // Replace a withdrawn member from reserves without rerolling the whole team.
    const active = available.filter(c => team!.roles[c.id] && team!.roles[c.id] !== "hold" && team!.roles[c.id] !== "hurt");
    if (!active.length && !busy) draw();
    for (const c of members) if (team.roles[c.id] === undefined) team.roles[c.id] = "hold";
    const target = members[0].fight!.target!;
    const position = target.kind === "witch" ? w.witches?.find(v => v.id === target.id) : target.kind === "creature" ? w.creatures?.[target.id] : undefined;
    const enter = (phase: Phase, until: number) => { team!.phase = phase; team!.at = w.time; team!.nextAt = until; };
    if (team.phase === "approach" && !busy && available.every(c => team!.roles[c.id] === "hold" || team!.roles[c.id] === "hurt")) enter("lull", w.time + roundTime);
    else if (team.phase === "approach" && position && available.some(c => {
      const role = team!.roles[c.id];
      const action = team!.actions[c.id];
      return role !== "hold" && role !== "hurt" && action && Math.hypot(c.x - position.x, c.z - position.z) <= actionReach(c, action, data) + data.limits.engage * FIGHT.scale;
    })) { team.cycleAt = w.time; enter("tell", w.time + tell); }
    else if (team.phase === "tell" && w.time >= team.nextAt && !busy) enter("combo", w.time + attackWindow);
    else if (team.phase === "combo" && !busy) {
      const done = available.every(c => team!.roles[c.id] === "hold" || team!.roles[c.id] === "hurt" || team!.used.includes(c.id));
      if (done || w.time >= team.nextAt) enter("lull", Math.max(w.time + least, team.cycleAt + roundTime));
    }
    // (when the next round's window should open, from where this one is: its picks' deadline, kept up each step, so it moves with the
    // fight and nothing's committed early; the round's own end at its shortest, then the next tell)
    // Its waiting rings (Ed, 2026-11-04: "Resolve the attack rate limit for 128"): past `ring` members (20) one ring would grow with the
    // team (waitingSlot's gap x count / 2 pi: 90 to 150 m at 128), so they wait in rings of `ring`, the inner one this round's attackers
    // and the coming rounds' picks first, the rest behind in rings further out, rotating in as those ahead strike, withdraw or go.
    const cap = Math.floor(RT.ring ?? ROUND_DEFAULT.ring);
    if (cap > 0 && members.length > cap) {
      const order: number[] = [], seen = new Set<number>(), put = (id: number) => { if (!seen.has(id)) { seen.add(id); order.push(id); } };
      for (const c of available) if (team.actions[c.id] && !team.used.includes(c.id)) put(c.id);
      for (const n of team.next ?? []) for (const c of available) if (n.actions[c.id]) put(c.id);
      for (const c of available) put(c.id);
      for (const c of members) put(c.id);
      team.order = order;
    } else team.order = undefined;
    if (team.next) {
      const first = team.phase === "lull" ? team.nextAt + tell
        : team.phase === "combo" ? Math.max(team.cycleAt + roundTime, team.nextAt + least) + tell
        : team.phase === "tell" ? Math.max(team.cycleAt + roundTime, team.nextAt + attackWindow + least) + tell
        : w.time + nominal + tell;
      team.next.forEach((n, k) => { n.readyBy = first + k * nominal; });
    }
  }
}
