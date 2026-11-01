// Shared mixed-species youth/adult attack rounds. Movement remains per animal; team identity is side + target.
import type { Creature } from "../creatures";
import { attackOf, type CombatState, type CombatWorld } from "./data";
import type { PacksData, Role, Phase } from "./packs";
import { SPACING } from "../combatSpacing";
import { hash2 } from "../random";
import { fighting } from "./targeting";
import { FIGHT, profileOf } from "../movement";

export interface RolePreferences { melee: number; ranged: number; special: number; tempo: number; youngMelee: number; youngRanged: number; youngSpecial: number; withdraw: number; rejoin: number; rest: number }
export interface TeamState { seed: number; round: number; phase: Phase; at: number; cycleAt: number; nextAt: number; members: number[]; roles: Record<number, Role>; used: number[]; withdrawn: Record<number, number> }
export const rolePreferences = (species: string): RolePreferences => ({ ...SPACING.preferences.default, ...SPACING.preferences.species[species] });
/** The selected intent's useful reach, shared by admission and approach planning. */
export function intentReach(c: Creature, role: Role, data: PacksData): number {
  const kind = data.kinds[c.species], move = profileOf(c.species)?.move;
  if (!kind || role === "hold" || role === "hurt") return 0;
  if (role === "shooter") return (kind.ranged?.range ?? 4) * FIGHT.scale;
  if (role === "special") {
    const effect = { ...data.specials[kind.special], ...kind.specialWith };
    const range = kind.specialWith?.range ?? (effect.leap ? move?.to : undefined) ?? effect.range ?? effect.reach ?? effect.radius ?? kind.ranged?.range ?? move?.to ?? 20;
    return range * FIGHT.scale * (c.level === 1 ? data.young.special : 1);
  }
  const ordinary = attackOf(c.species, c.level)?.attack;
  const preparation = move?.to ?? move?.from ?? move?.trigger ?? (move?.kind === "swoop" ? move.radius : undefined);
  return preparation !== undefined ? preparation * FIGHT.scale : (ordinary?.range ?? 4) + (ordinary?.lunge ?? 0);
}
const damage = (c: Creature): number => c.leashed || c.state === "happy" ? c.drops ?? 0 : c.dazed ? 1 : c.affection ?? 0;
export function teamOf(state: CombatState, id: number): TeamState | undefined { return [...(state.waitingTeams?.values() ?? [])].find(team => team.members.includes(id)); }

/** One seeded choice per round, capability-filtered and subject to shared role capacity. */
export function chooseTeamRoles(members: readonly Creature[], seed: number, round: number, data: PacksData, specialReady: (c: Creature) => boolean = () => true): Record<number, Role> {
  const roles: Record<number, Role> = {}, capacity = { lunger: SPACING.team.melee, shooter: SPACING.team.ranged, special: SPACING.team.special };
  let active = 0;
  const priority = (c: Creature) => -Math.log(Math.max(1e-9, hash2(c.id, round, seed))) / Math.max(0.1, rolePreferences(c.species).tempo);
  const order = [...members].sort((a, b) => priority(a) - priority(b) || a.id - b.id);
  for (const c of order) {
    const K = data.kinds[c.species], P = rolePreferences(c.species), young = c.level === 1;
    const choices = [
      { role: "lunger" as const, weight: K?.melee && capacity.lunger > 0 ? P.melee * (young ? P.youngMelee : 1) : 0 },
      { role: "shooter" as const, weight: K?.ranged && capacity.shooter > 0 ? P.ranged * (young ? P.youngRanged : 1) : 0 },
      { role: "special" as const, weight: K?.special && !(young && K.special === "mind") && capacity.special > 0 && specialReady(c) ? P.special * (young ? P.youngSpecial : 1) : 0 },
    ];
    const total = choices.reduce((n, x) => n + Math.max(0, x.weight), 0);
    if (!total || active >= SPACING.team.active) { roles[c.id] = "hold"; continue; }
    let pick = hash2(c.id, round, seed + 1620) * total;
    const chosen = choices.find(choice => { pick -= Math.max(0, choice.weight); return pick < 0; }) ?? choices.filter(x => x.weight > 0).at(-1)!;
    roles[c.id] = chosen.role; capacity[chosen.role]--; active++;
  }
  return roles;
}

export function stepTeams(state: CombatState, w: CombatWorld, data: PacksData, committed: (c: Creature) => boolean): void {
  const groups = new Map<string, Creature[]>(), teams = (state.waitingTeams ??= new Map());
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
    if (!team) teams.set(key, (team = { seed: Math.floor(hash2(members[0].id, 1620, 73) * 0x7fffffff), round: -1, phase: "approach", at: w.time, cycleAt: w.time, nextAt: Infinity, members: [], roles: {}, used: [], withdrawn: {} }));
    team.members = members.map(c => c.id);
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
    const specialReady = (c: Creature) => ([...(state.packs?.values() ?? [])].find(p => p.members.includes(c.id))?.specialReadyAt ?? 0) <= w.time;
    if (changed) { team.round = round; team.phase = "approach"; team.at = w.time; team.nextAt = Infinity; team.roles = chooseTeamRoles(available, team.seed, round, data, specialReady); team.used = []; }
    for (const c of members) if (!available.includes(c) && !committed(c)) team.roles[c.id] = "hurt";
    // Replace a withdrawn member from reserves without rerolling the whole team.
    const active = available.filter(c => team!.roles[c.id] && team!.roles[c.id] !== "hold" && team!.roles[c.id] !== "hurt");
    if (!active.length) Object.assign(team.roles, chooseTeamRoles(available, team.seed, round, data, specialReady));
    for (const c of members) if (team.roles[c.id] === undefined) team.roles[c.id] = "hold";
    const target = members[0].fight!.target!;
    const position = target.kind === "witch" ? w.witches?.find(v => v.id === target.id) : target.kind === "creature" ? w.creatures?.[target.id] : undefined;
    const rhythms = members.map(c => data.rhythms[data.kinds[c.species].rhythm] ?? data.rhythms.steady);
    const tempo = Math.max(0.1, members.reduce((sum, c) => sum + rolePreferences(c.species).tempo, 0) / members.length);
    const tell = rhythms.reduce((sum, rhythm) => sum + rhythm.tell, 0) / rhythms.length / tempo;
    const rest = rhythms.reduce((sum, rhythm) => sum + rhythm.lull, 0) / rhythms.length / tempo;
    const enter = (phase: Phase, until: number) => { team!.phase = phase; team!.at = w.time; team!.nextAt = until; };
    if (team.phase === "approach" && !busy && available.every(c => team!.roles[c.id] === "hold" || team!.roles[c.id] === "hurt")) enter("lull", w.time + SPACING.team.roundTime / tempo);
    else if (team.phase === "approach" && position && available.some(c => {
      const role = team!.roles[c.id];
      return role !== "hold" && role !== "hurt" && Math.hypot(c.x - position.x, c.z - position.z) <= intentReach(c, role, data) + data.limits.engage * FIGHT.scale;
    })) { team.cycleAt = w.time; enter("tell", w.time + tell); }
    else if (team.phase === "tell" && w.time >= team.nextAt && !busy) enter("combo", w.time + SPACING.team.attackWindow / tempo);
    else if (team.phase === "combo" && !busy) {
      const done = available.every(c => team!.roles[c.id] === "hold" || team!.roles[c.id] === "hurt" || team!.used.includes(c.id));
      if (done || w.time >= team.nextAt) enter("lull", Math.max(w.time + rest, team.cycleAt + SPACING.team.roundTime / tempo));
    }
  }
}
