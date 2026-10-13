// the badlands' rattlesnake (Ed, 2026-10-13, unknown-21): a sandy sidewinder with dark diamonds, a wedge head and a rattle that grows a
// button a level; its legend the elder of its kind: great stacked coils, a colossal raised rattle whose shake ripples through the sand, great horns over its eyes, scarred
export const GENOME_RATTLESNAKE = { id: "rattlesnake", name: "Rattlesnake", template: "serpent", builder: "rattlesnake", idle: "rattle", palette: { hue: .08, sat: .38, val: .68 }, legend: ["rattleBig", "ripple", "horns"], texture: { kind: "scales", size: 2 },
  levels: [{ body: { thick: .8, rattle: 1 } }, { body: { thick: 1, rattle: 3 } }, { body: { thick: 1.2, rattle: 6 } }, { body: { thick: 1.3, rattle: 7, coil: 1 } }] };
