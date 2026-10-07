// The legend circle's explainer (Ed, 2026-10-06: "when you go into a legend circle, text appears on the screen to the side of the
// circle explaining mechanics to do with legends. Something like: "This is a slumbering elder. If you bring a [sigil] and place it
// in this circle, it will grant you a boon. If you bring a [relic sigil] and place it in this circle, you will gain a powerful
// ally. It becomes angered if none of its kin are nearby."" ("kin", not "children": Ed, 2026-10-06)): which legend's clearing she stands in (any state), what the
// panel says for its state, and how far it has faded in. No drawing here (render/leash.ts draws it).
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
export function boonWords(species: string): string | null {
  const def = LEGEND_BUFFS.species[species];
  if (!def) return null;
  const what = def.label.includes(": ") ? def.label.slice(def.label.indexOf(": ") + 2) : def.label;
  return `${def.name}, ${what}`;
}

const AGES = ["baby", "young", "adult"], NAMES: Record<string, string> = { glowworm: "glow-worm", beetle: "stag beetle" };
/** A creature in words, its age first: "a young elk", "an adult otter". */
export function creatureWords(species: string, level: number): string {
  const w = `${AGES[level] ?? ""} ${NAMES[species] ?? species}`.trim();
  return `${/^[aeiou]/.test(w) ? "an" : "a"} ${w}`;
}

/** What the panel says for a legend in its state (keeping Ed's words where they hold; party tone). The dream is named in words
 *  beside its sigil (Ed's playtest, 2026-10-07: a look-alike kind or the wrong age was easy to bring). */
export function circleLines(c: Creature): CircleLine[] {
  const st = c.legendState ?? "asleep", q = c.quest, done = q?.done !== undefined;
  const words = boonWords(c.species), wants = q ? creatureWords(q.species, q.level) : "";
  const boon: CircleLine | null = q ? (done ? { text: words ? `Its boon is yours: {boon} ${words}.` : "Its boon is yours.", done: true }
    : { text: words ? `If you bring {sigil} ${wants} into this circle, it will grant you its boon for the rest of the night: {boon} ${words}.` : `If you bring {sigil} ${wants} into this circle, it will grant you a boon.` }) : null;
  const ally: CircleLine = { text: "If you bring a {relic} and place it in this circle, you will gain a powerful ally." };
  if (st === "happy") return [{ text: "This elder is your ally now." }, { text: "It guards its area and anyone partying in it." }, ...(boon?.done ? [boon] : [])];
  if (st === "angry") return [{ text: "This elder is angry!" }, { text: "Wear it out, or bring one of its kin back, and it will settle back to sleep." }, ...(boon?.done ? [boon] : [])];
  if (st === "restless") return [{ text: "This elder is restless." }, ...(boon ? [boon] : []), ally, { text: "Bring one of its kin back here to calm it." }];
  return [{ text: "This is a slumbering elder." }, ...(boon ? [boon] : []), ally, { text: "It becomes angered if none of its kin are nearby." }];
}

/** The panel's fade: towards 1 inside a circle and 0 outside, over `fade` seconds. */
export function circleShown(prev: number, inside: boolean, dt: number, fade = 0.4): number {
  const step = fade > 0 ? dt / fade : 1;
  return inside ? Math.min(1, prev + step) : Math.max(0, prev - step);
}

/** Her sigils put down in this legend's circle, and her animals standing in it, that aren't what it dreams of (Ed's playtest, 2026-10-07: "I brought a quest
 *  animal into the legend circle and I wasn't granted the buff"): a line saying so, naming both, so a look-alike kind or the
 *  wrong age reads at once; null when none of hers is in it, or its quest is done or gone. The right one finishes the quest by
 *  standing there (rules/sigilButton.ts questsFromStanding), so never lingers to be named. */
export function broughtLine(g: Game, near: { legend: Creature; x: number; z: number; r: number }): CircleLine | null {
  const q = near.legend.quest, st = near.legend.legendState ?? "asleep";
  if (!q || q.done !== undefined || (st !== "asleep" && st !== "restless")) return null;
  const wrong = new Set<string>(), inside = (x: number, z: number) => Math.hypot(x - near.x, z - near.z) <= near.r;
  const check = (id: number, sigilIn = false) => {
    const c = g.creatures[id];
    if (!c || c.gone || c.boss || !(sigilIn || inside(c.x, c.z))) return;
    if (c.species !== q.species || c.level !== q.level) wrong.add(creatureWords(c.species, c.level));
  };
  // her animals standing in it, and (Ed, 2026-10-07: the drop is the moment) her sigils put down in it, their animals anywhere
  for (const id of g.leash.stack) check(id);
  for (const p of g.leash.placed) check(p.id, inside(p.x, p.z));
  if (!wrong.size) return null;
  const list = [...wrong].sort(), brought = list.length > 2 ? `${list.slice(0, 2).join(", ")} and others` : list.join(" and ");
  return { text: `Not this one: it dreams of ${creatureWords(q.species, q.level)}, and you've brought ${brought}.` };
}
