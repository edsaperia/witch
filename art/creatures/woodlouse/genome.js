export const GENOME_WOODLOUSE = { id: "woodlouse", name: "Woodlouse", template: "insectoid", builder: "woodlouse", palette: { hue: .65, sat: .12, val: .45 }, legend: ["crystals"],
  // its evolution (docs/art-guide/EVOLUTIONS.md): a pale round baby of five plates, a slate-grey young of seven with pale edges, an
  // adult of ten raised-rimmed plates flecked at their edges with jointed feelers and two tail spikes, and the wispy forest's legend:
  // armoured like a fortress, shields with spiked edges, moonstones along its spine, dry leaves caught in its plates, whip feelers
  levels: [
    { body: { plates: 5, pale: true, feelers: .6 } },
    { body: { plates: 7, rim: true, feelers: 1 } },
    { body: { plates: 10, rim: true, flecks: true, feelers: 1.35, jointed: true, tailSpikes: true } },
    { body: { plates: 10, rim: true, flecks: true, feelers: 2, jointed: true, tailSpikes: true, shields: true, crystals: true, leaves: true } },
  ] };
