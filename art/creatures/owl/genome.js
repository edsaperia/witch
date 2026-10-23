// the cold rainforest's spotted owl (the biome roster, 2026-10-23): dark chocolate brown, white spots over its crown and wings, its
// chest barred in broken white bars from the young on
export const GENOME_OWL = { id: "owl", name: "Spotted owl", template: "avian", builder: "owl", palette: { hue: .07, sat: .5, val: .38, belly: [.1, .12, .9] }, legend: ["eyesRing", "wings"],
  // its evolution (docs/art-guide/EVOLUTIONS.md): a downy owlet with huge eyes and no tufts, a smooth young with short tufts, an
  // adult with a dark-rimmed disc, long tufts, a barred chest and patterned wing tips, and the legend: wings half spread like a
  // cloak edged in moonlight, tufts swept back like horns, a ring of glowing eyes round its disc
  levels: [
    { body: { down: true }, head: { tufts: 0 } },
    { body: { spotted: true }, head: { tufts: .7 } },
    { body: { bars: true, spotted: true, wingTips: true }, head: { tufts: 1.5, discRim: true } },
    { body: { bars: true, spotted: true, cloak: true }, head: { tufts: 2.2, tuftsBack: true, discRim: true, dish: true } }, // (its disc grown into a great dish, eyes like moons: docs/ART-GUIDE.md §0c)
  ] };
