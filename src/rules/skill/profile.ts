// Skill profiles (docs/plans/combat-skill-and-commands.md; config/combat-skill.json): every creature's openings (its sit after an
// attack, its poise, stagger and daze) and its command, by species and level. Ed, 2026-11-17: "We should aim for a lot of distinct
// parameters and maximum expressiveness, and then we can have 'what creatures have what settings' as design and balancing." Every
// parameter has a global default; a species may set any of them; a command parameter may also be set per level (youth, adult,
// legend), the level's value winning. Pure data lookups: no state, no drawing.
import table from "../../../config/combat-skill.json";

export type Verb = "strike" | "daze" | "snare" | "guard" | "surge";
export type Shape = "shot" | "lob" | "patch";

/** The openings: when a creature is easier to hit (a letter is always one hit: Ed, 2026-11-17). */
export interface Openings {
  /** Seconds it holds still after it attacks, and after which attacks ("all", "melee" or "ranged"). */
  sit: { time: number; after: string };
  /** Poise: its share of the meter's letters that break it; how much more a letter wears it during a wind-up; seconds after the last
   *  hit before it refills, and seconds to refill from empty. */
  poise: { share: number; windup: number; regenDelay: number; regenTime: number };
  /** Staggered when poise breaks: seconds it stands still; whether a break in a wind-up cancels the attack; seconds before it can
   *  break again. */
  stagger: { time: number; cancels: boolean; immune: number };
  /** Seconds it's slowed after a stagger. */
  daze: { time: number };
}

/** One level's command: every parameter (docs/plans/combat-skill-and-commands.md, section 1, Commands). */
export interface Command {
  verb: Verb; name: string;
  /** Charges held, charges a berry gives, charges when it joins her; seconds before it acts again; legends' cooldown times this. */
  max: number; perBerry: number; start: number; cooldown: number; legendCooldown: number;
  /** Metres it acts at; how far off her aim (degrees) a target may be; seconds a letter's hit keeps a creature its target. */
  reach: number; cone: number; lastHit: number;
  /** Times the creature's own damage a second, per hit. */
  power: number;
  shape?: Shape; count?: number; speed?: number; radius?: number;
  /** Effects on what it hits: seconds stunned, slowed, dazed; a patch's speed share and life. */
  stun?: number; slow?: number; daze?: number; slowMult?: number; slowTime?: number;
  /** Guard: blows its shield on her stops and how long it waits; quills shot round her when it stops one; taunt seconds and metres;
   *  metres it throws the nearest. */
  shield?: number; shieldTime?: number; quills?: number; taunt?: number; tauntRadius?: number; knock?: number;
  /** Surge: her buff group, its stacks and seconds. */
  buff?: string; buffStacks?: number; buffTime?: number;
}

type Raw = Record<string, unknown>;
const T = table as unknown as { global: Raw & { command: Raw }; species: Record<string, Raw & { command?: Raw }> };
const LEVELS = ["baby", "youth", "adult", "legend"] as const;

const merge = (...xs: (Raw | undefined)[]): Raw => {
  const out: Raw = {};
  for (const x of xs) if (x) for (const [k, v] of Object.entries(x)) out[k] = v && typeof v === "object" && !Array.isArray(v) && out[k] && typeof out[k] === "object" ? { ...(out[k] as Raw), ...(v as Raw) } : v;
  return out;
};

/** The species with a profile (the first slice: the home island's kinds). */
export const PROFILED: readonly string[] = Object.keys(T.species);

// module-state: a cache keyed by all its inputs (the species; the table is fixed at load)
const openCache = new Map<string, Openings>();
/** A species' openings: the globals with its own over them. */
export function openingsOf(species: string): Openings {
  let o = openCache.get(species);
  if (!o) { const { command: _g, ...G } = T.global, { command: _s, ...S } = T.species[species] ?? {}; o = merge(G, S) as unknown as Openings; openCache.set(species, o); }
  return o;
}

// module-state: a cache keyed by all its inputs (species and level; the table is fixed at load)
const cmdCache = new Map<string, Command | null>();
/** A species' command at a level (1 youth, 2 adult, 3 legend: a legend uses its adult's numbers, then its own); null for a baby or a
 *  species with no command. */
export function commandOf(species: string, level: number): Command | null {
  const key = `${species}:${level}`;
  if (cmdCache.has(key)) return cmdCache.get(key)!;
  const S = T.species[species]?.command;
  let out: Command | null = null;
  if (S && level >= 1) {
    const G = T.global.command, lv = (x: Raw | undefined, l: string) => (x?.[l] as Raw | undefined);
    const strip = (x: Raw | undefined) => { if (!x) return x; const { youth: _y, adult: _a, legend: _l, ...rest } = x; return rest; };
    const at = LEVELS[Math.min(3, level)];
    out = merge(strip(G), lv(G, level >= 2 ? "adult" : "youth"), strip(S), level >= 2 ? lv(S, "adult") : lv(S, "youth"), at === "legend" ? lv(S, "legend") : undefined) as unknown as Command;
  }
  cmdCache.set(key, out);
  return out;
}
