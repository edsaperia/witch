// Coordinator6520033543: bounded priority for actually observed requests only.
// No Game, quest totals, map or ending phase enters this module.
import type { Observation } from "./observe";

type Quest = Observation["quests"][number];
export type QuestAction = { quest: Quest; kind: "deliver" | "pickup" | "recruit" | "hint"; creatureId?: number; pickup?: { x: number; z: number } };
const distance = (a: { x: number; z: number }, b: { x: number; z: number }) => Math.hypot(a.x - b.x, a.z - b.z);
export const KNOWN_QUEST_LIMITS = { seconds: 60, freshSeconds: 30, minimumHp: 3, threatMetres: 25, handoffSeconds: .25 } as const;

export function newKnownQuestJob(enabled: boolean) {
  const known = new Map<number, { quest: Quest; seenAt: number }>();
  let id: number | null = null, deadline: number | null = null, released = false, reason = "not started", previousHp: number | null = null;
  const snapshot = () => ({ enabled, id, deadline, released, reason });
  function update(o: Observation, healing: boolean, visiting: boolean, questRange: number): QuestAction | null {
    const damaged = previousHp !== null && o.self.hp < previousHp; previousHp = o.self.hp;
    if (!enabled) return null;
    for (const q of o.quests) {
      if (q.open && q.wants) known.set(q.id, { quest: structuredClone(q), seenAt: o.playerTime });
      else known.delete(q.id);
    }
    for (const c of o.creatures) if (c.friendly || c.angry) known.delete(c.id);
    const unsafe = damaged ? "damage" : o.self.ko ? "KO" : healing ? "healing" : o.self.hp < KNOWN_QUEST_LIMITS.minimumHp ? "low HP"
      : o.alarms.length ? "alarm" : o.windups.length ? "windup"
      : o.creatures.some(c => c.angry && !c.stunned && !c.rune && distance(c, o.self) <= KNOWN_QUEST_LIMITS.threatMetres) ? "nearby threat" : null;
    // A single absolute deadline counts interruptions, switching and idle gaps.
    // Release early enough that held controls cannot run beyond sixty seconds.
    if (deadline !== null && o.playerTime >= deadline - KNOWN_QUEST_LIMITS.handoffSeconds) { released = true; id = null; reason = "timeout"; }
    if (deadline !== null && unsafe) { released = true; id = null; reason = unsafe; }
    if (o.victoryPointer) { if (deadline !== null) released = true; id = null; reason = "visible victory pointer"; return null; }
    if (released || unsafe) return null;
    // Existing safety/deck/party startup and a committed dream visit keep priority.
    if (visiting || o.waiting || o.self.seated || o.self.perched) { id = null; reason = visiting ? "dream visit" : "startup"; return null; }
    const action = (entry: { quest: Quest; seenAt: number }): QuestAction | null => {
      const q = entry.quest;
      if (o.playerTime - entry.seenAt > KNOWN_QUEST_LIMITS.freshSeconds || distance(o.self, q.delivery) > questRange) return null;
      if (o.carried.some(c => c.species === q.wants)) return { quest: q, kind: "deliver" };
      const rune = o.creatures.filter(c => !c.boss && c.rune && c.species === q.wants)
        .sort((a, b) => distance(o.self, a.rune!) - distance(o.self, b.rune!) || a.id - b.id)[0];
      if (rune?.rune) return { quest: q, kind: "pickup", creatureId: rune.id, pickup: { ...rune.rune } };
      const target = o.creatures.filter(c => !c.boss && !c.friendly && !c.rune && c.species === q.wants)
        .sort((a, b) => distance(o.self, a) - distance(o.self, b) || a.id - b.id)[0];
      if (target) return { quest: q, kind: "recruit", creatureId: target.id };
      if (q.hint && distance(o.self, q.hint) > 12) return { quest: q, kind: "hint" };
      return null;
    };
    const selected = id === null ? null : known.get(id);
    let next = selected ? action(selected) : null;
    if (!next) {
      id = null;
      const choices = [...known.values()].map(action).filter((a): a is QuestAction => a !== null);
      // Prefer carried offerings, then their visible sigils/animals, then a
      // public direction hint. Commit to that request until it becomes unavailable.
      const order = { deliver: 0, pickup: 1, recruit: 2, hint: 3 };
      next = choices.sort((a, b) => order[a.kind] - order[b.kind] || distance(o.self, a.quest.delivery) - distance(o.self, b.quest.delivery) || a.quest.id - b.quest.id)[0] ?? null;
    }
    if (!next) { reason = "closed, stale or unavailable"; return null; }
    if (deadline === null) deadline = o.playerTime + KNOWN_QUEST_LIMITS.seconds;
    id = next.quest.id; reason = next.kind;
    return structuredClone(next);
  }
  return { update, snapshot };
}
