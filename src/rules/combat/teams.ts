// Shared mixed-species youth/adult attack rounds. Movement remains per animal; team identity is side + target.
import type { Creature } from "../creatures";
import type { CombatState, CombatWorld } from "./data";
import type { PacksData, Role } from "./packs";
import { SPACING } from "../combatSpacing";
import { hash2 } from "../random";
import { fighting } from "./targeting";

export interface RolePreferences { melee: number; ranged: number; special: number; youngMelee: number; youngRanged: number; youngSpecial: number; withdraw: number; rejoin: number; rest: number }
export interface TeamState { seed: number; round: number; members: number[]; roles: Record<number, Role>; used: number[]; withdrawn: Record<number, number> }
export const rolePreferences = (species: string): RolePreferences => ({ ...SPACING.preferences.default, ...SPACING.preferences.species[species] });
const damage = (c: Creature): number => c.leashed || c.state === "happy" ? c.drops ?? 0 : c.dazed ? 1 : c.affection ?? 0;
export function teamOf(state: CombatState, id: number): TeamState | undefined { return [...(state.waitingTeams?.values() ?? [])].find(team => team.members.includes(id)); }

/** One seeded choice per round, capability-filtered and subject to shared role capacity. */
export function chooseTeamRoles(members: readonly Creature[], seed: number, round: number, data: PacksData, specialReady: (c: Creature) => boolean = () => true): Record<number, Role> {
  const roles: Record<number, Role> = {}, capacity = { lunger: SPACING.team.melee, shooter: SPACING.team.ranged, special: SPACING.team.special };
  let active = 0;
  const order = [...members].sort((a, b) => hash2(a.id, round, seed) - hash2(b.id, round, seed) || a.id - b.id);
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
    if (!team) teams.set(key, (team = { seed: Math.floor(hash2(members[0].id, 1620, 73) * 0x7fffffff), round: -1, members: [], roles: {}, used: [], withdrawn: {} }));
    team.members = members.map(c => c.id);
    for (const c of members) {
      const P = rolePreferences(c.species), hurt = damage(c);
      if (!committed(c) && hurt > P.withdraw && team.withdrawn[c.id] === undefined) team.withdrawn[c.id] = w.time + P.rest;
      if (team.withdrawn[c.id] !== undefined && w.time >= team.withdrawn[c.id] && hurt <= P.rejoin) delete team.withdrawn[c.id];
    }
    let available = members.filter(c => team!.withdrawn[c.id] === undefined);
    // A lone/all-hurt team still has an attacker: withdrawal cannot stall the fight forever.
    if (!available.length) available = [[...members].sort((a, b) => damage(a) - damage(b) || a.id - b.id)[0]];
    const round = Math.floor(w.time / SPACING.team.roundTime), changed = team.round !== round;
    const specialReady = (c: Creature) => ([...(state.packs?.values() ?? [])].find(p => p.members.includes(c.id))?.specialReadyAt ?? 0) <= w.time;
    if (changed) { team.round = round; team.roles = chooseTeamRoles(available, team.seed, round, data, specialReady); team.used = []; }
    for (const c of members) if (!available.includes(c) && !committed(c)) team.roles[c.id] = "hurt";
    // Replace a withdrawn member from reserves without rerolling the whole team.
    const active = available.filter(c => team!.roles[c.id] && team!.roles[c.id] !== "hold" && team!.roles[c.id] !== "hurt");
    if (!active.length) Object.assign(team.roles, chooseTeamRoles(available, team.seed, round, data, specialReady));
    for (const c of members) if (team.roles[c.id] === undefined) team.roles[c.id] = "hold";
  }
}
