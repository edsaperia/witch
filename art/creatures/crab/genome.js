// the mangrove swamp's crab (Ed, 2026-10-12, unknown-26): a mudflat fiddler that scuttles sideways, its shell orange-red, one great claw
// on an adult, barnacles; its legend the elder of its kind: one colossal gleaming claw bigger than its body, waved in a slow beckoning display, its eyes lit, its shell aged like a reef
export const GENOME_CRAB = { id: "crab", name: "Crab", template: "insectoid", builder: "crab", palette: { hue: .02, sat: .62, val: .58 }, legend: ["wave", "reef"], texture: { kind: "plates", size: 3 },
  levels: [{ body: { shell: .85, claw: 1 } }, { body: { shell: 1, claw: 1.25 } }, { body: { shell: 1, claw: 1.8, barnacles: true } }, { body: { shell: 1.05, claw: 3.2, barnacles: true } }] };
