// the badlands' scorpion (Ed, 2026-10-13, unknown-22): a red-brown canyon scorpion, pincers ahead and its sting arched over its back; its
// legend the elder of its kind: a colossal curled tail, its young riding on its scarred back, glowing blue-green along its plates under the moon
export const GENOME_SCORPION = { id: "scorpion", name: "Scorpion", template: "insectoid", builder: "scorpion", palette: { hue: .06, sat: .5, val: .48, magic: .47 }, legend: ["fluoresce", "brood"], texture: { kind: "plates", size: 2 },
  levels: [{ body: { tail: .85, pincer: .85 } }, { body: { tail: 1, pincer: 1 } }, { body: { tail: 1.1, pincer: 1.3 } }, { body: { tail: 1.9, pincer: 1.4 } }] };
