// Coordinator6521109755: only consumed delayed HP and public visible/audible cues.
import type { Observation } from "./observe";
export function newCoverageGuard() {
  let previousHp: number | null = null, reason: string | null = null;
  function update(o: Observation, healing: boolean) {
    const damage = previousHp !== null && o.self.hp < previousHp; previousHp = o.self.hp;
    reason = damage ? "damage" : o.self.ko ? "KO" : healing ? "healing" : o.self.hp < 4 ? "not full health"
      : o.alarms.length ? "alarm" : o.windups.length ? "windup"
      : o.creatures.some(c => ((!c.boss && c.level > 0 && !c.friendly) || c.angry) && Math.hypot(c.x - o.self.x, c.z - o.self.z) <= 30) ? "nearby enemy" : null;
    return reason === null;
  }
  return { update, snapshot: () => ({ reason }) };
}
