// The legend circle's explainer (Ed, 2026-10-06: "when you go into a legend circle, text appears on the screen to the side of the
// circle explaining mechanics to do with legends"; its words rewritten to today's rules, Ed 2026-10-19): which legend's clearing
// she stands in (any state), what the panel says for its state, and how far it has faded in. No drawing here (render/leash.ts
// draws it).
import { LEGEND_BUFFS } from "./buffs";
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

/** One line of the panel: its words, with `{sigil}` (the dreamt creature's sigil), `{relic}` (a relic sigil) or `{boon}` (the
 *  legend's own sigil, the buff's icon in the HUD: render/buffhud.ts) where an icon goes; done: ticked and dimmed (its boon
 *  already hers). */
export interface CircleLine { text: string; done?: boolean }

/** What a legend's boon does, in its own plain words (Ed, 2026-10-06: "The legend circle text should tell you what the boon
 *  will be"): its buff's name and line from config/legend-buffs.json (the label after its "Species's Name: "), so it says
 *  what the game gives; null for a species with no buff. */
// (Unused since Ed's 2026-10-18 change, the panel naming no boon: kept for when legends' powers come back, rules/legends.ts buffing.)
export function boonWords(species: string): string | null {
  const def = LEGEND_BUFFS.species[species];
  if (!def) return null;
  const what = def.label.includes(": ") ? def.label.slice(def.label.indexOf(": ") + 2) : def.label;
  return `${def.name}, ${what}`;
}

const NAMES: Record<string, string> = { beetle: "stag beetle", cat: "wildcat" };

/** A kind's name: "hare", "stag beetle". */
const nameOf = (species: string): string => NAMES[species] ?? species;
/** A kind's sigil in words: "a hare's sigil"; `bare`, only "a hare's" (Ed, 2026-10-19: "you put down a fox's"). */
export function sigilWords(species: string, bare = false): string {
  const w = nameOf(species);
  return `${/^[aeiou]/.test(w) ? "an" : "a"} ${w}'s${bare ? "" : " sigil"}`;
}

/** What the panel says for a legend in its state (Ed, 2026-10-19: "We need to rewrite the helper text": short, plain, one idea a
 *  line, the action said exactly). A dream asks for a kind's sigil put down inside the circle, any age (Ed, 2026-10-18), named in
 *  words beside its icon (Ed's playtest, 2026-10-07: a look-alike kind was easy to bring); only the drop does it (Ed, 2026-10-19).
 *  Done, the legend fights for her and shows her its island (found tonight, kept if the night is won). Once the party's over no
 *  quest is taken (its dream closed: c.questOpen false while it sleeps), nor before it (`before`: Ed, 2026-10-26), nor in the zoo
 *  (`before` "zoo": its legends sleep for show, Ed 2026-10-26). */
export function circleLines(c: Creature, before: boolean | "zoo" = false): CircleLine[] {
  const st = c.legendState ?? "asleep", q = c.quest, done = q?.done !== undefined, name = nameOf(c.species);
  const found: CircleLine = { text: "Its island is found: win the night to keep it.", done: true };
  if (st === "happy") return [{ text: `Your ally: the ${name}.` }, { text: "It fights for you and guards its area." }, ...(done ? [found] : [])];
  if (st === "angry") return [{ text: `An angry legend: the ${name}!` }, { text: "Wear it down, or bring one of its kind back to its area, and it will settle." }];
  const head: CircleLine = { text: st === "restless" ? `A restless legend: the ${name}.` : `A sleeping legend: the ${name}.` };
  if (before === "zoo") return [head, { text: "In the zoo it sleeps on, for you to see." }];
  if (q && !done && c.questOpen === false) return [head, { text: before ? "It sleeps till the party starts." : "The party's over: it sleeps on." }]; // (Ed, 2026-10-18: no quest taken then)
  const ask: CircleLine[] = q && !done ? [{ text: `Put down {sigil} ${sigilWords(q.species)}, any age, inside this circle.` }, { text: "It will wake, fight for you and show you its island." }] : [];
  if (st === "restless") return [head, ...ask, { text: "Bring one of its kind back to its area to calm it." }];
  return [head, ...ask, { text: "Leave none of its kind in its area and it grows restless." }];
}

/** The panel's fade: towards 1 inside a circle and 0 outside, over `fade` seconds. */
export function circleShown(prev: number, inside: boolean, dt: number, fade = 0.4): number {
  const step = fade > 0 ? dt / fade : 1;
  return inside ? Math.min(1, prev + step) : Math.max(0, prev - step);
}

/** Her sigils put down in this legend's circle that aren't of the kind it dreams of: a line saying so, naming both (Ed, 2026-10-19:
 *  "Not this one: it wants a hare's sigil, and you put down a fox's"), so a look-alike kind reads at once; null when there are
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
  return { text: `Not this one: it wants ${sigilWords(q.species)}, and you put down ${put}.` };
}
