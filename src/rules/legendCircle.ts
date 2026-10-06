// The legend circle's explainer (Ed, 2026-10-06: "when you go into a legend circle, text appears on the screen to the side of the
// circle explaining mechanics to do with legends. Something like: "This is a slumbering elder. If you bring a [sigil] and place it
// in this circle, it will grant you a boon. If you bring a [relic sigil] and place it in this circle, you will gain a powerful
// ally. It becomes angered if none of its children are nearby.""): which legend's clearing she stands in (any state), what the
// panel says for its state, and how far it has faded in. No drawing here (render/leash.ts draws it).
import { LEGEND_BUFFS } from "./buffs";
import type { Creature } from "./creatures";
import type { Game } from "./game";

type Clearing = { x: number; z: number; r: number; legend: { x: number; z: number } };

/** The legend whose clearing `at` stands in, on the ground (the treetops never), whatever its state, with its clearing's middle
 *  and radius (the map's `legendClearings`; else a circle of `music.circle.radius` metres round it, as the music's). Null outside them all. */
export function legendCircleNear(g: Game, at: { x: number; z: number; mode?: string }): { legend: Creature; x: number; z: number; r: number } | null {
  if (at.mode !== "ground") return null;
  const R = g.tuning.music.circle.radius, clearings = (g.map as { legendClearings?: readonly Clearing[] }).legendClearings;
  let best: { legend: Creature; x: number; z: number; r: number } | null = null, bd = Infinity;
  for (const c of g.creatures) {
    if (!c.boss || c.gone || c.leashed) continue;
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

/** One line of the panel: its words, with `{sigil}` (the dreamt creature's sigil), `{relic}` (a relic sigil) or `{boon}` (the
 *  legend's own sigil, the buff's icon in the HUD: render/buffhud.ts) where an icon goes; done: ticked and dimmed (its boon
 *  already hers). */
export interface CircleLine { text: string; done?: boolean }

/** What a legend's boon does, in its own plain words (Ed, 2026-10-06: "The legend circle text should tell you what the boon
 *  will be"): its buff's name and line from config/legend-buffs.json (the label after its "Species's Name: "), so it says
 *  what the game gives; null for a species with no buff. */
export function boonWords(species: string): string | null {
  const def = LEGEND_BUFFS.species[species];
  if (!def) return null;
  const what = def.label.includes(": ") ? def.label.slice(def.label.indexOf(": ") + 2) : def.label;
  return `${def.name}, ${what}`;
}

/** What the panel says for a legend in its state (keeping Ed's words where they hold; party tone). */
export function circleLines(c: Creature): CircleLine[] {
  const st = c.legendState ?? "asleep", q = c.quest, done = q?.done !== undefined;
  const words = boonWords(c.species);
  const boon: CircleLine | null = q ? (done ? { text: words ? `Its boon is yours: {boon} ${words}.` : "Its boon is yours.", done: true }
    : { text: words ? `If you bring a {sigil} and place it in this circle, it will grant you its boon for the rest of the night: {boon} ${words}.` : "If you bring a {sigil} and place it in this circle, it will grant you a boon." }) : null;
  const ally: CircleLine = { text: "If you bring a {relic} and place it in this circle, you will gain a powerful ally." };
  if (st === "happy") return [{ text: "This elder is your ally now." }, { text: "It guards its area and anyone partying in it." }, ...(boon?.done ? [boon] : [])];
  if (st === "angry") return [{ text: "This elder is angry!" }, { text: "Wear it out, or bring one of its children back, and it will settle back to sleep." }, ...(boon?.done ? [boon] : [])];
  if (st === "restless") return [{ text: "This elder is restless." }, ...(boon ? [boon] : []), ally, { text: "Bring one of its children back here to calm it." }];
  return [{ text: "This is a slumbering elder." }, ...(boon ? [boon] : []), ally, { text: "It becomes angered if none of its children are nearby." }];
}

/** The panel's fade: towards 1 inside a circle and 0 outside, over `fade` seconds. */
export function circleShown(prev: number, inside: boolean, dt: number, fade = 0.4): number {
  const step = fade > 0 ? dt / fade : 1;
  return inside ? Math.min(1, prev + step) : Math.max(0, prev - step);
}
