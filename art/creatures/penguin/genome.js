// the penguin (unknown-14's icy shore, Ed 2026-10-12: more animals for later islands; art builder 2's record and builder): upright,
// black and white, a downy grey chick, a brown-grey young, an adult with an orange patch at its neck, and the island's legend
// (the elder of its kind, docs/ART-GUIDE.md §0c: an elder god all penguins worship, that has survived epochs): a towering
// emperor weathered like sea-worn stone, ice-rimed along its back, old scars across its breast, a necklace of offerings (pebbles
// and shells from the rookery), its flippers flung wide like oars, its gorget blazing, a longer beak, its chick at its feet
export const GENOME_PENGUIN = { id: "penguin", name: "Penguin", template: "avian", builder: "penguin", palette: { hue: .62, sat: .2, val: .2, belly: "white", flower: [242, 150, 38] }, sizes: { head: [.34, .27, .24, .24], headY: [.98, 1.18, 1.24, 1.24] }, texture: { kind: "feathers" },
  levels: [{ body: { down: true } }, { body: { young: true } }, null, { body: { oars: true, gorget: true, beak: 1.35, chick: true, elder: true } }] };
