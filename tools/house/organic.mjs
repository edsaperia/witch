// The oak's house (Ed, 2026-10-24, the layout v4: previews/ed/treehouse-layout-v4 on claude/treehouse-trunk-mock), checked: the plan
// is a file a room (config/house/rooms/<id>.json; put together by config/house/assemble.js, which says what a room file and an object
// hold; the floor one shape, config/house/shape.js), so edit a room's own file to move it or what's in it. Checks every object stands on
// its room's floor (no corner over the edge) and every limb's middle line runs on the floor, and prints the walk from her bed down the
// trunk to the Terrace and to the take-off.
//   node tools/house/organic.mjs [--write <file>] [--outline [<file>]]
// --write: the house assembled, as one file (for a look, or a tool that wants one).
// --outline: the floor's outlines for the crown's builder (the crown over the house is built apart, on claude/oak-crown), written to
// config/house/outline.json (or <file>): metres on the house's plan (x east, z south, the Terrace's middle 0, at the map's treehouse;
// no turn), the floor at treehouse.house.height; what each part is, its own `_` says (config/house/outline.js houseOutline).
// src/rules/houseShape.test.ts fails when it's out of date.
import { writeFileSync } from "node:fs";
import { loadHouse } from "../../config/house/load.mjs";
import { field, inRoom } from "../../config/house/shape.js";
import { houseOutline, houseWalk } from "../../config/house/outline.js";

const H = loadHouse(), S = H.shape, problems = [];
// every object on its room's floor: its middle and four corners on what she walks (a locked room's on its own drawn floor)
for (const o of H.objects) {
  if (o.id.endsWith("Door")) continue;
  const locked = H.rooms.find(r => r.id === o.room)?.locked;
  for (const [dx, dz] of [[0, 0], [-1, -1], [1, -1], [1, 1], [-1, 1]]) {
    const x = o.x + (dx * o.w) / 2, z = o.z + (dz * o.d) / 2, d = locked ? inRoom(S, o.room, x, z) : field(S, x, z, true);
    if (d > 0.05) { problems.push(`${o.id} hangs over its floor's edge (${d.toFixed(2)} m at ${x.toFixed(1)}, ${z.toFixed(1)})`); break; }
  }
}
// every limb's middle line on the floor, so every unlocked room is reached on foot (a locked room's up to its door, on its rim)
for (const c of H.corridors) for (const [x, z] of c.pts.slice(0, H.rooms.find(r => c.id.endsWith(`-${r.id}`))?.locked ? -1 : undefined)) if (field(S, x, z, true) > 0.05) { problems.push(`${c.id}: its middle line leaves the floor at ${x}, ${z}`); break; }
const W = houseWalk(H);
console.log(`the walk from her bed: to the Terrace's edge ${W.toTerrace.toFixed(0)} m, to its middle ${W.toMiddle.toFixed(0)} m, to the take-off ${W.toTakeoff.toFixed(0)} m (at 5 m/s: ${(W.toTerrace / 5).toFixed(1)} s, ${(W.toMiddle / 5).toFixed(1)} s, ${(W.toTakeoff / 5).toFixed(1)} s)${problems.length ? `\n${problems.join("\n")}` : ""}`);
if (problems.length) process.exit(1);
const to = process.argv.indexOf("--write");
if (to > 0) {
  // (a key a line, each room, branch and object on one line)
  const one = v => JSON.stringify(v).replace(/([{,])"([^"]+)":/g, "$1 \"$2\": ").replace(/,(?=[\[{"-\d])/g, ", ");
  writeFileSync(process.argv[to + 1], "{\n" + Object.entries(H).map(([k, v]) => `  ${JSON.stringify(k)}: ${Array.isArray(v) ? `[\n${v.map(o => `    ${one(o)}`).join(",\n")}\n  ]` : JSON.stringify(v)}`).join(",\n") + "\n}\n");
  console.log(`wrote ${H.rooms.length} rooms, ${H.corridors.length} branches, ${H.objects.length} objects to ${process.argv[to + 1]}`);
}
const ol = process.argv.indexOf("--outline");
if (ol > 0) {
  const file = process.argv[ol + 1] && !process.argv[ol + 1].startsWith("--") ? process.argv[ol + 1] : "config/house/outline.json";
  writeFileSync(file, JSON.stringify(houseOutline(H)) + "\n");
  console.log(`wrote the outlines to ${file}`);
}
