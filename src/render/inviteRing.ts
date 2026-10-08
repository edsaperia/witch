// The 💌 ring (Ed, 2026-10-06: "When you successfully hit an animal with your envelope in the process of inviting it, the
// envelope starts orbiting it. Each hit is another orbiting envelope. The envelopes space out around the creature to show
// how many are needed in total, like segments, with gaps where they need to be hit more. When you had hit them enough
// times, the ring is full, and as the animal becomes happy ... they become ❤️s that rise up and disappear ... If left
// alone, the envelopes fall out of orbit to the floor one by one to show the invite meter cooling down."): what the ring
// round each creature being invited holds, from its real meter (rules/affection.ts), and what changed since the last
// frame: an envelope joining the next gap, one dropping out of orbit as the meter drains, a full ring turning to hearts.
// No drawing here (render/invites.ts draws it), so it can be tested.
import type { Creature } from "../rules/creatures";

/** A creature's ring now: its slots (the hits its level's meter takes) and how many are filled. */
export interface RingNow { slots: number; filled: number }

/** The ring the meter shows: one slot a hit its level needs (`hits`, by level), filled as far as its affection
 *  (0..1) reaches. A slot empties only once the meter has drained below it, so they drop one at a time. */
export function ringOf(level: number, affection: number | null, hits: readonly number[]): RingNow {
  const slots = Math.max(1, Math.round(hits[Math.min(level, hits.length - 1)] ?? 1));
  const a = Math.max(0, Math.min(1, affection ?? 0));
  return { slots, filled: Math.max(0, Math.min(slots, Math.ceil(a * slots - 1e-6))) };
}

export type RingChange =
  | { kind: "join"; id: number; slot: number; slots: number }
  | { kind: "drop"; id: number; slot: number; slots: number }
  | { kind: "hearts"; id: number; slots: number };

/** Each creature's ring as last drawn, and what changed this frame. */
export class RingModel {
  readonly rings = new Map<number, RingNow & { level: number }>();

  /** This frame: `now` gives each creature near her with a meter its ring (null: none); `won` the creatures won over
   *  this frame (made happy, or leashed), whose rings go to hearts whole. Returns the changes, in order. */
  update(creatures: Iterable<Creature>, now: (c: Creature) => RingNow | null, won: Iterable<number>): RingChange[] {
    const out: RingChange[] = [], seen = new Set<number>();
    for (const id of won) {
      const r = this.rings.get(id);
      out.push({ kind: "hearts", id, slots: r?.slots ?? 1 });
      this.rings.delete(id);
      seen.add(id);
    }
    for (const c of creatures) {
      if (seen.has(c.id)) continue;
      const r = now(c);
      if (!r || r.filled <= 0) continue;
      seen.add(c.id);
      let was = this.rings.get(c.id);
      // A new meter (or a new level's: it evolved, a fresh ring).
      if (was && (was.slots !== r.slots || was.level !== c.level)) { this.rings.delete(c.id); was = undefined; }
      const before = was?.filled ?? 0;
      for (let s = before; s < r.filled; s++) out.push({ kind: "join", id: c.id, slot: s, slots: r.slots });
      for (let s = before - 1; s >= r.filled; s--) out.push({ kind: "drop", id: c.id, slot: s, slots: r.slots });
      this.rings.set(c.id, { ...r, level: c.level });
    }
    // Emptied (or gone, or out of reach): what's left falls.
    for (const [id, r] of this.rings) if (!seen.has(id)) {
      for (let s = r.filled - 1; s >= 0; s--) out.push({ kind: "drop", id, slot: s, slots: r.slots });
      this.rings.delete(id);
    }
    return out;
  }
}
