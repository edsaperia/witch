// The legend circle's explainer (Ed, 2026-10-06: "when you go into a legend circle, text appears on the screen to the side of the
// circle explaining mechanics to do with legends"; its words rewritten to today's rules, Ed 2026-10-19, and rewritten again in
// Ed's words, 2026-11-04: "A sleeping elder [name]!" and the rest, in circleLines): which legend's clearing she stands in (any
// state), what the panel says for its state, and how far it has faded in. No drawing here (render/leash/bubbles.ts draws it).
import type { Creature } from "./creatures";
import type { Game } from "./game";

type Clearing = { x: number; z: number; r: number; legend: { x: number; z: number } };

const REACH = new WeakMap<readonly Clearing[], number>();
/** How far from a legend a point can be and still stand in its circle (legendCircleNear, musicPlan's legendCircleAt): its own
 *  radius R, or a clearing's (its legend within r of the clearing's legend spot, the point within r of its middle: 2r + that
 *  spot's way from its middle), plus a metre for rounding; worked out once a map. Legends past it are skipped without the
 *  search for their clearing (every legend x every clearing, twice a frame, was a frame's biggest allocator). */
export function circleReach(clearings: readonly Clearing[] | undefined, R: number): number {
  let b = clearings ? REACH.get(clearings) : 0;
  if (b === undefined) { b = 0; for (const k of clearings!) b = Math.max(b, 2 * k.r + Math.hypot(k.x - k.legend.x, k.z - k.legend.z)); REACH.set(clearings!, b); }
  return Math.max(R, b) + 1;
}

/** The legend whose clearing `at` stands in, on the ground (the treetops never), whatever its state, with its clearing's middle
 *  and radius (the map's `legendClearings`; else a circle of `music.circle.radius` metres round it, as the music's). Null outside them all. */
export function legendCircleNear(g: Game, at: { x: number; z: number; mode?: string }): { legend: Creature; x: number; z: number; r: number } | null {
  if (at.mode !== "ground") return null;
  const R = g.tuning.music.circle.radius, clearings = (g.map as { legendClearings?: readonly Clearing[] }).legendClearings;
  const B = circleReach(clearings, R);
  let best: { legend: Creature; x: number; z: number; r: number } | null = null, bd = Infinity;
  for (const c of g.creatures) {
    if (!c.boss || c.gone || c.leashed || Math.abs(at.x - c.x) > B || Math.abs(at.z - c.z) > B) continue;
    let cx = c.x, cz = c.z, r = R;
    if (clearings) {
      let ring: Clearing | null = null, rd = Infinity;
      for (const k of clearings) { const d = Math.hypot(k.legend.x - c.x, k.legend.z - c.z); if (d < rd) { rd = d; ring = k; } }
      if (ring && rd <= ring.r) { cx = ring.x; cz = ring.z; r = ring.r; }
    }
    const d = Math.hypot(at.x - cx, at.z - cz);
    if (d <= r && d < bd) { bd = d; best = { legend: c, x: cx, z: cz, r }; }
  }
  return best;
}

/** One line of the panel: its words, with `{sigil}` (the dreamt creature's sigil) or `{relic}` (a relic sigil) where an
 *  icon goes; done: ticked and dimmed. */
export interface CircleLine { text: string; done?: boolean }

const NAMES: Record<string, string> = { beetle: "stag beetle", cat: "wildcat" };

/** A kind's name: "hare", "stag beetle". */
const nameOf = (species: string): string => NAMES[species] ?? species;
/** A kind's sigil in words: "a hare's sigil"; `bare`, only "a hare's" (Ed, 2026-10-19: "you put down a fox's"). */
export function sigilWords(species: string, bare = false): string {
  const w = nameOf(species);
  return `${/^[aeiou]/.test(w) ? "an" : "a"} ${w}'s${bare ? "" : " sigil"}`;
}

/** What the panel says for a legend in its state, in Ed's words (Ed, 2026-11-04, his rewrite of the panel: "A sleeping elder
 *  [name]!" / "If you place [sigil] inside this circle it will join your party, and invite you to its island if you survive the
 *  night." / "Taking its children away will anger it."; restless "An unhappy elder [name]. Bring one of its children here to calm
 *  it."; angry "An angry elder [name]!" / "Bring one of its children home to calm it."; woken "A friendly elder [name]!"; quest
 *  not open, "A sleeping elder [name]."). A dream asks for a kind's sigil put down inside the circle, any age (Ed, 2026-10-18),
 *  named in words beside its icon (Ed's playtest, 2026-10-07: a look-alike kind was easy to bring); only the drop does it (Ed,
 *  2026-10-19). Done, the legend fights for her and shows her its island (found tonight, kept if the night is won). Once the
 *  party's over no quest is taken (its dream closed: c.questOpen false while it sleeps), nor before it (`before`: Ed,
 *  2026-10-26), nor in the zoo (`before` "zoo": its legends sleep for show, Ed 2026-10-26): then only its heading. */
export function circleLines(c: Creature, before: boolean | "zoo" = false): CircleLine[] {
  const st = c.legendState ?? "asleep", q = c.quest, done = q?.done !== undefined, name = nameOf(c.species);
  if (st === "happy") return [{ text: `A friendly elder ${name}!` }, ...(done ? [{ text: "It will invite you to its island if you survive the night.", done: true }] : [])];
  if (st === "angry") return [{ text: `An angry elder ${name}!` }, { text: "Bring one of its children home to calm it." }];
  const open = !before && !!q && !done && c.questOpen !== false; // (no quest taken before the party, after it or in the zoo: Ed, 2026-10-18, 2026-10-26)
  const ask: CircleLine[] = open ? [{ text: `If you place {sigil} ${sigilWords(q!.species)} inside this circle it will join your party, and invite you to its island if you survive the night.` }] : [];
  if (st === "restless") return [{ text: `An unhappy elder ${name}. Bring one of its children here to calm it.` }, ...ask];
  return open ? [{ text: `A sleeping elder ${name}!` }, ...ask, { text: "Taking its children away will anger it." }] : [{ text: `A sleeping elder ${name}.` }];
}

/** The panel's fade: towards 1 inside a circle and 0 outside, over `fade` seconds. */
export function circleShown(prev: number, inside: boolean, dt: number, fade = 0.4): number {
  const step = fade > 0 ? dt / fade : 1;
  return inside ? Math.min(1, prev + step) : Math.max(0, prev - step);
}

/** Her sigils put down in this legend's circle that aren't of the kind it dreams of: a line saying so, naming both (Ed, 2026-11-04:
 *  "The elder [name] wants [a hare's sigil] - (this is [a fox's])"; first Ed, 2026-10-19), so a look-alike kind reads at once; null when there are
 *  none, or its quest is done or gone. Only a sigil put down counts (Ed, 2026-10-19: the reward comes with the drop, not when the
 *  animal walks in); the right one finishes the quest as it's put down (rules/sigilButton.ts questsFromPlaced), so never lingers. */
export function broughtLine(g: Game, near: { legend: Creature; x: number; z: number; r: number }): CircleLine | null {
  const q = near.legend.quest, st = near.legend.legendState ?? "asleep";
  if (!q || q.done !== undefined || (st !== "asleep" && st !== "restless")) return null;
  const wrong = new Set<string>();
  for (const p of g.leash.placed) {
    const c = g.creatures[p.id];
    if (!c || c.gone || c.boss || Math.hypot(p.x - near.x, p.z - near.z) > near.r) continue;
    if (c.species !== q.species) wrong.add(sigilWords(c.species, true));
  }
  if (!wrong.size) return null;
  const list = [...wrong].sort(), put = list.length > 2 ? `${list.slice(0, 2).join(", ")} and others` : list.join(" and ");
  return { text: `The elder ${nameOf(near.legend.species)} wants ${sigilWords(q.species)} - (this is ${put}).` };
}
