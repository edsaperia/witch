export const GENOME_OWL = { id: "owl", name: "Owl", template: "avian", builder: "owl", palette: { hue: .08, sat: .5, val: .55 }, legend: ["eyesRing", "wings"],
  // its evolution (docs/art-guide/EVOLUTIONS.md): a downy owlet with huge eyes and no tufts, a smooth young with short tufts, an
  // adult with a dark-rimmed disc, long tufts, a barred chest and patterned wing tips, and the legend: wings half spread like a
  // cloak edged in moonlight, tufts swept back like horns, a ring of glowing eyes round its disc
  levels: [
    { body: { down: true }, head: { tufts: 0 } },
    { head: { tufts: .7 } },
    { body: { bars: true, wingTips: true }, head: { tufts: 1.5, discRim: true } },
    { body: { bars: true, cloak: true }, head: { tufts: 2.2, tuftsBack: true, discRim: true, dish: true } }, // (its disc grown into a great dish, eyes like moons: docs/ART-GUIDE.md §0c)
  ] };
