import { CREATURE_GENOMES } from "../creatures/index.js";
// Witch creature genomes (#79, stage 1): every species as data, not code. A record names its
// template (the body plan: which skeleton and which sockets it has), its builder (the 3D model
// code that draws that template, art/creatures3d.js), its palette, its proportions and its parts;
// its size levels come from its template's curves (templates.js). creatures.js reads SPECIES from
// these records (speciesOf in index.js), so editing a record changes the creature.
//   palette: hue, sat, val (its coat), belly ("white", "yellow" or its own lighter coat).
//   body (four-legged): hgt (height on screen, 1 = ordinary), len (body length, shoulder = 1),
//     chest and tuck (belly heights at the shoulder and the waist), neck, neckAng, neckW, hr (head
//     radius), bw (body width), legW (leg thickness), haunch, hindFoot, back ("hump" or "arch").
//   head: snout, snoutD (its depth), snoutTaper, face ("badger", "dark"), muzzle, cheeks, whiskers,
//     teeth, disc (a pig's nose), eyeK (eye size).
//   parts: the sockets' choices: ears { kind, size }, tail, feet, horns, antlers, tusks.
//   coat: markings: belly, saddle, spots, spotMat, socks, shaggy, wool, ridge, rump, legMat.
//   legend: what the legendary form grows (FEATURE_NAMES in creatures.js).
export const GENOMES = [
  ...CREATURE_GENOMES,
];

