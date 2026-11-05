// The broom's other kinds (Ed, 2026-10-06: "create some different kinds of broom; a missile, a curled tip, handlebars, hobby horse,
// jet bike, oar, mop, pitchfork, canoe, wicker basket, ladder, speeder bike, bicycle, quad drone"; later: "a gyrocopter", and the
// wicker basket left out). Each is drawn where her broom is
// (art/witch.js broomHandle and broomBristles: the handle from its binding a to its nose b, the bristles' end at c, o.dir toward the
// nose), so every pose that holds or rides a broom rides these too. Two colours, the creator's Broom box's two pickers: the body
// (M.BROOM, the handle's) and the trim (M.STRAW, the bristles'); flames, exhausts and lights glow in her magic (M.MAGIC, MAGIC2).
// The length knob stretches every one; the bend bows those still on a stick; the bristles knob grows its back end (the flame, the
// blade, the mop, the tines). Moving bits turn with the frame (L.frame): the rotors, the wheels, the flames, the drips.
import { TIPS } from "./brooms/tips.js";
import { CHASSIS } from "./brooms/chassis.js";
import { EXHAUSTS } from "./brooms/exhausts.js";
import { broomStick } from "./brooms/common.js";

/** The kinds after hers (classic, fan, twig, round), in the creator's order. */
export const NEW_BROOMS = ["missile", "curl", "handlebars", "hobbyhorse", "jetbike", "oar", "mop", "pitchfork", "canoe", "ladder", "speeder", "bicycle", "drone", "gyrocopter"];
/** She sits in these (knees up) rather than astride. */
export const SIT_IN = new Set(["canoe"]);
/** On foot these stand on the ground beside her (how high their binding is) rather than being held like a staff. */
export const PARKED = { canoe: .15, gyrocopter: .3, bicycle: .35, jetbike: .14, speeder: .1, drone: .11 };

// Kind order and optional body/tail membership remain the public entry point.
// Each kind: body(m, L, a, b, r1, r2) in place of the handle, and tail(m, L, c, r, o) in place of the bristles (either may be absent:
// a plain stick, no back end).
export const BROOM_KINDS = {
  // a missile: a fat body with a pointed nose, fins at the back and a flame
  missile: { body: TIPS["missile"].body, tail: EXHAUSTS["missile"].tail },
  // a curled tip: hers, the nose rolled up into a curl
  curl: { bristles: true, body: TIPS["curl"].body },
  // handlebars: a stem up from the nose and a bar across it with grips
  handlebars: { bristles: true, body: TIPS["handlebars"].body },
  // a hobby horse: a horse's head on the nose, a little wheel at the back
  hobbyhorse: { body: TIPS["hobbyhorse"].body, tail: EXHAUSTS["hobbyhorse"].tail },
  // a jet bike: a fat fairing under her, a windscreen, twin nozzles glowing at the back
  jetbike: { body: CHASSIS["jetbike"].body, tail: EXHAUSTS["jetbike"].tail },
  // an oar: hers, its back end a flat blade
  oar: { body: broomStick, tail: EXHAUSTS["oar"].tail },
  // a mop: a shaggy head of strands, dripping
  mop: { body: broomStick, tail: EXHAUSTS["mop"].tail },
  // a pitchfork: its back end three tines
  pitchfork: { body: broomStick, tail: EXHAUSTS["pitchfork"].tail },
  // a canoe: a hollow hull she sits in, its inside in the trim colour
  canoe: { body: CHASSIS["canoe"].body },
  // a ladder: two rails and rungs
  ladder: { body: CHASSIS["ladder"].body },
  // a speeder bike: a slim body, two prongs out front with vanes, an engine glowing at the back
  speeder: { body: CHASSIS["speeder"].body, tail: EXHAUSTS["speeder"].tail },
  // a bicycle: a frame under the handle, two wheels turning, a saddle and handlebars
  bicycle: { body: CHASSIS["bicycle"].body },
  // a quad drone: a plate under her, four arms, rotors spinning, lights at their ends
  drone: { body: CHASSIS["drone"].body },
  // a gyrocopter: a keel under her with a bubble nose, a mast behind her up past her hat, a big rotor turning on it, a tail fin and a
  // pusher propeller at the back
  gyrocopter: { body: CHASSIS["gyrocopter"].body, tail: EXHAUSTS["gyrocopter"].tail }
};
