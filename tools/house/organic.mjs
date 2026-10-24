// The Ent's own house (Ed, 2026-10-23: "The layout doesn't have to be all right-angles; the corridors are tree branches, the rooms are
// probably round"; previews/ed/treehouse-layout-v3/mock2), checked: the plan is a file a room (config/house/rooms/<id>.json; put
// together by config/house/assemble.js, which says what a room file and an object hold), so edit a room's own file to move it or what's
// in it. Checks no two rooms crowd (2 m apart unless joined; 1 m from its parent) and prints the walk from the Terrace to the bedroom's
// door; `--write <file>` writes the house as config/house.json used to hold it (for a look, or a tool that wants one file).
//   node tools/house/organic.mjs [--write <file>]
import { writeFileSync } from "node:fs";
import { houseFiles, loadHouse } from "../../config/house/load.mjs";
import { roomPlaces } from "../../config/house/assemble.js";

const { base, rooms } = houseFiles(), P = roomPlaces(base, rooms), L = Object.values(P), crowd = [];
for (let i = 0; i < L.length; i++) for (let j = i + 1; j < L.length; j++) { const a = L[i], b = L[j], gap = Math.hypot(a.x - b.x, a.z - b.z) - a.r - b.r; if (gap < (a.parent === b.id || b.parent === a.id ? 1 : 1.4)) crowd.push(`${a.id}~${b.id} ${gap.toFixed(1)} m`); }
const path = ["terrace", "atrium", "parlour", "boudoir", "bedroom"];
let walk = -P.bedroom.r; for (let i = 1; i < path.length; i++) walk += Math.hypot(P[path[i]].x - P[path[i - 1]].x, P[path[i]].z - P[path[i - 1]].z);
console.log(`the walk from the Terrace's middle to the bedroom's door: ${walk.toFixed(0)} m${crowd.length ? `; crowded: ${crowd.join(", ")}` : ""}`);
if (crowd.length) process.exit(1);
const to = process.argv.indexOf("--write");
if (to > 0) {
  const H = loadHouse();
  // (as config/house.json was laid out: a key a line, each room, branch and object on one line)
  const one = v => JSON.stringify(v).replace(/([{,])"([^"]+)":/g, "$1 \"$2\": ").replace(/^\{ /, "{ ").replace(/\}$/, " }").replace(/\{ "/g, "{ \"").replace(/,(?=[\[{"-\d])/g, ", ");
  writeFileSync(process.argv[to + 1], "{\n" + Object.entries(H).map(([k, v]) => `  ${JSON.stringify(k)}: ${Array.isArray(v) ? `[\n${v.map(o => `    ${one(o)}`).join(",\n")}\n  ]` : JSON.stringify(v)}`).join(",\n") + "\n}\n");
  console.log(`wrote ${H.rooms.length} rooms, ${H.corridors.length} branches, ${H.objects.length} objects to ${process.argv[to + 1]}`);
}
