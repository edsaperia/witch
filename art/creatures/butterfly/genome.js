// the temperate meadow's butterfly (the biome roster, 2026-10-23: the moth turned a swallowtail, then under the moth's id; its own
// id since Ed, 2026-11-13: "can we actually rename it in the files and put the moth on the bench?"; a save or link naming the moth
// still means it: art/creatures/renamed.js): yellow wings veined and bordered black, tails, blue crescents; its legend's hind
// wings two great eyes. `builder` is the flyers' shared one (art/creatures3d.js moth3d, which hands a `look.butterfly` to
// butterfly3d); what is drawn from an id's letters is drawn from its old id's (renamed.js seedId), so it looks as it did.
export const GENOME_BUTTERFLY = { id: "butterfly", name: "Swallowtail", template: "flyer", builder: "moth", palette: { hue: .13, sat: .72, val: .95, accent: [.6, .7, .9] }, look: { butterfly: true }, legend: ["eyespots"] };
