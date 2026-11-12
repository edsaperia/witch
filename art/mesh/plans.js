// Every creature drawn as a mesh, by species and level: MESH_PLANS[species][level]() is its plan (art/mesh/shape.js builds it).
// The species' files hold their four levels, baby to legend. The bee and the turtle are not in the game's roster yet (Ed,
// 2026-11-12: "The bee can live in the marten's pinewood. It flies."; the turtle and the marten are kept for other islands).
import { FOX } from "./fox.js";
import { MARTEN_PLANS, STOAT_PLANS } from "./mustelids.js";
import { DORMOUSE_PLANS, HARE_PLANS, SQUIRREL_PLANS } from "./rodents.js";
import { BADGER_PLANS, HEDGEHOG_PLANS, MOLE_PLANS } from "./diggers.js";
import { SNAIL_PLANS } from "./snail.js";
import { TURTLE_PLANS } from "./turtle.js";
import { BEE_PLANS } from "./bee.js";

export const MESH_LEVELS = ["baby", "young", "adult", "legend"];
const BY = { fox: FOX, stoat: STOAT_PLANS, marten: MARTEN_PLANS, hare: HARE_PLANS, squirrel: SQUIRREL_PLANS, dormouse: DORMOUSE_PLANS, badger: BADGER_PLANS, mole: MOLE_PLANS, hedgehog: HEDGEHOG_PLANS, snail: SNAIL_PLANS, turtle: TURTLE_PLANS, bee: BEE_PLANS };
/** How a species curls up to sleep where it differs from the rest (art/mesh/gear.js `napping` reads gait.curl): the long ones turn
 *  further, so their ring closes with their head on their haunch; the hare's ears, longer than its ring is wide, lie back and
 *  swung in across its own back; the badger curls the other way round, so its striped face is on the side she sees it from and
 *  not behind its plates. */
const CURL = { stoat: { turn: 4.5 }, marten: { turn: 4.3 }, hare: { ears: 1.4, earsIn: 1.6 }, badger: { side: -1 } };
export const MESH_PLANS = Object.fromEntries(Object.entries(BY).map(([species, plans]) => [species, MESH_LEVELS.map(l => (CURL[species] ? () => { const p = plans[l](); p.gait.curl = CURL[species]; return p; } : plans[l]))]));
