// The lighting's mood (Ed, 2026-10-06: "make it a spooky dark forest with a party in it"): the night
// grade every material shares, as numbers in the tuning file (light.spooky), laid over the Art Lab's
// light (the style) and the tuning's own. Spooky: deep blue-green shadows, a colder moon that rims
// what it lights, a violet fog that comes in close and swallows the far trees, thicker mist, and a
// warmer glow round the witch, so the party is the warm light in the dark wood. light.mood "plain"
// (or ?light=plain) is the light as it was. Drawing only: the rules never see it.
import type { Mood, Tuning } from "../rules/tuning";
export type { Mood };


/** The mood in force, or null for the plain light. */
export function moodOf(t: Pick<Tuning, "light">): Mood | null {
  const L = t.light;
  return L && L.mood === "spooky" ? L.spooky : null;
}
