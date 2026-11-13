// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. Added with the hoofed kinds (docs/plans/creature-mesh-rollout.md, batch C).
import { bound, pace } from "./gaits.js";

/** A deer's or a wild goat's way of going: one foot after another going slowly, and at speed a stot, a stiff springing bound
 *  that lands and leaves almost on the spot, long in the air (the coordinator's brief, 2026-11-13: "deer can also bound
 *  (pronk/stot)"). Its back hardly gathers, unlike a stoat's or a hare's (kit/gaits.js `hop`): the spring is in its legs.
 *  o as kit/gaits.js's gaits: { tails, lively, walk: its slow pace's own numbers, run: its fast pace's }. */
export const stots = (o = {}) => { const { walk: w = {}, run: r = {}, ...rest } = o;
  const run = pace("bound", { seconds: 0.55, duty: 0.26, reach: 0.8, leap: 0.36, legs: bound(), ...r, body: { pitch: 0.07, flex: 0.07, bob: 0.06, ...r.body } });
  return { type: run.type, seconds: run.seconds, legs: run.legs, ...rest, paces: { walk: pace("amble", w), run } }; };
