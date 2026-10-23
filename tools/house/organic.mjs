// The Ent's own house (Ed, 2026-10-23: "The layout doesn't have to be all right-angles; the corridors are tree branches, the rooms are
// probably round"; previews/ed/treehouse-layout-v3/mock2): writes config/house.json's rooms, branches and objects from the plan
// below, keeping its other fields. Each room is placed by its parent: a bearing (degrees from north, clockwise), the branch's length
// between their rims (m) and its own radius (m), the branch bowed `bend` metres to one side. Metres from the hub's centre, x east,
// z south (the plan unturned: turn 0). Objects are boxes on the plan (Alpha draws furniture by id and footprint), each placed at a
// bearing from its room's middle, `in` metres in from its rim. Checks no two rooms crowd (2 m apart unless joined) and prints the walk
// from the Terrace to the bedroom's door.
//   node tools/house/organic.mjs [--check]
import { readFileSync, writeFileSync } from "node:fs";

const FILE = new URL("../../config/house.json", import.meta.url);
const HUB = 7; // (the Terrace: the hub's own radius, tuning treehouse.house.hub)
// id, label, parent, bearing, branch, radius, bend; locked: drawn, its door shut (Ed, 2026-10-23: "The branch stops at the door")
const PLAN = [
  ["atrium", "Atrium", "terrace", 48, 3.2, 4.5, 0.8],
  ["kitchen", "Kitchen", "terrace", 0, 2.5, 6.5, -1],
  ["studio", "Studio", "terrace", -50, 4.5, 6.5, 1],
  ["workshop", "Workshop", "terrace", -100, 4.5, 7.5, -1],
  ["drawingRoom", "Drawing Room", "atrium", 103, 4.5, 6.5, 1],
  ["bestiary", "Bestiary", "atrium", 160, 4.5, 6.5, -1],
  ["parlour", "Parlour", "atrium", 1.5, 4.5, 5.5, -0.8],
  ["solarium", "Solarium", "parlour", -70, 4.5, 6.5, 1],
  ["study", "Study", "parlour", -14, 2.6, 6.5, -1],
  ["boudoir", "Boudoir", "parlour", 43, 3.1, 4.5, 0.8],
  ["bedroom2", "Bedroom 2", "boudoir", 72, 4.5, 8, -1, true],
  ["bedroom3", "Bedroom 3", "boudoir", 136, 4.5, 8, 1, true],
  ["bedroom", "Bedroom", "boudoir", 2.5, 2.5, 9, -0.8],
  ["crowsNest", "Crow's nest", "bedroom", 76, 2.5, 4.5, 0.6],
];
const f2 = v => +v.toFixed(2), BW = 3.2;
const P = { terrace: { id: "terrace", x: 0, z: 0, r: HUB } };
for (const [id, label, parent, b, g, r, bend, locked] of PLAN) {
  const q = P[parent], d = q.r + g + r, a = (b * Math.PI) / 180;
  P[id] = { id, label, parent, x: f2(q.x + d * Math.sin(a)), z: f2(q.z - d * Math.cos(a)), r, bend, locked: !!locked };
}
const L = Object.values(P), crowd = [];
for (let i = 0; i < L.length; i++) for (let j = i + 1; j < L.length; j++) { const a = L[i], b = L[j], gap = Math.hypot(a.x - b.x, a.z - b.z) - a.r - b.r; if (gap < (a.parent === b.id || b.parent === a.id ? 1 : 1.4)) crowd.push(`${a.id}~${b.id} ${gap.toFixed(1)} m`); }
const path = ["terrace", "atrium", "parlour", "boudoir", "bedroom"];
let walk = -P.bedroom.r; for (let i = 1; i < path.length; i++) walk += Math.hypot(P[path[i]].x - P[path[i - 1]].x, P[path[i]].z - P[path[i - 1]].z);
console.log(`the walk from the Terrace's middle to the bedroom's door: ${walk.toFixed(0)} m${crowd.length ? `; crowded: ${crowd.join(", ")}` : ""}`);
if (crowd.length) process.exit(1);
if (process.argv.includes("--check")) process.exit(0);

const H = JSON.parse(readFileSync(FILE, "utf8")), old = Object.fromEntries(H.objects.map(o => [o.id, o]));
const rooms = L.filter(p => p.parent).map(p => ({ id: p.id, label: p.label, x0: f2(p.x - p.r), x1: f2(p.x + p.r), z0: f2(p.z - p.r), z1: f2(p.z + p.r), r: p.r, ...(p.locked ? { locked: true } : {}) }));
// a branch from its parent's floor into its room's (1.4 m in each end, so the walk runs on through), or, to a locked room, to its door
// (its line ending its half-width short of the rim, so its walked end, round, stops at the door)
const doors = {};
const corridors = L.filter(p => p.parent).map(p => {
  const q = P[p.parent], dx = p.x - q.x, dz = p.z - q.z, len = Math.hypot(dx, dz), ux = dx / len, uz = dz / len;
  const a = [q.x + ux * (q.r - 1.4), q.z + uz * (q.r - 1.4)], b = p.locked ? [p.x - ux * (p.r + 1.45), p.z - uz * (p.r + 1.45)] : [p.x - ux * (p.r - 1.4), p.z - uz * (p.r - 1.4)];
  if (p.locked) doors[p.id] = { x: f2(p.x - ux * (p.r - 0.15)), z: f2(p.z - uz * (p.r - 0.15)) };
  const c = [(a[0] + b[0]) / 2 - uz * p.bend * 1.5, (a[1] + b[1]) / 2 + ux * p.bend * 1.5], pts = [];
  for (let i = 0; i <= 8; i++) { const t = i / 8, m = (1 - t) * (1 - t), n = 2 * t * (1 - t), o = t * t; pts.push([f2(m * a[0] + n * c[0] + o * b[0]), f2(m * a[1] + n * c[1] + o * b[1])]); }
  const xs = pts.map(v => v[0]), zs = pts.map(v => v[1]);
  return { id: `${p.parent}-${p.id}`, x0: f2(Math.min(...xs) - BW / 2), x1: f2(Math.max(...xs) + BW / 2), z0: f2(Math.min(...zs) - BW / 2), z1: f2(Math.max(...zs) + BW / 2), w: BW, pts };
});
const at = (id, room, b, inn, more = {}) => { const p = P[room], a = (b * Math.PI) / 180, R = p.r - inn; return { ...old[id], room, x: f2(p.x + R * Math.sin(a)), z: f2(p.z - R * Math.cos(a)), ...more }; };
const make = (id, room, label, b, inn, w, d, h, use) => at("", room, b, inn, { id, label, w, d, h, use });
const door = (id, room) => ({ id: `${room}Door`, room: "boudoir", label: "Door", ...doors[room], w: 1.4, d: 1.4, h: 2.4, use: { kind: "say", line: "A friend's room. Locked for now." } });
old[""] = {};
const objects = [
  at("wardrobe", "bedroom", -55, 1.2), at("dressingTable", "bedroom", -20, 1), at("curtains", "bedroom", 18, 0.6, { w: 1.8, d: 0.3 }),
  at("bed", "bedroom", 42, 3.2), at("phone", "bedroom", 30, 1.4), at("cloakPegs", "bedroom", -95, 0.8, { w: 0.3, d: 1.3 }), at("shoeRack", "bedroom", -125, 1),
  at("crystalBall", "boudoir", -30, 1.2), at("telephone", "boudoir", 100, 1.1),
  at("mirror", "parlour", -10, 1, { w: 1.1, d: 0.3 }), at("hats", "parlour", 0, 0, { x: P.parlour.x, z: f2(P.parlour.z + 1) }),
  at("bags", "study", -30, 1.3, { w: 1.8, d: 0.4 }), at("invitations", "study", 30, 1.6),
  at("broomStand", "workshop", -20, 1.2), at("pegboard", "workshop", 25, 0.9),
  at("recordShelf", "studio", -15, 1, { w: 2.2, d: 0.5 }), at("cauldron", "kitchen", 0, 3.5),
  at("teaTable", "solarium", 0, 4), at("cardTable", "drawingRoom", 0, 4.2),
  at("book", "bestiary", 0, 4.5), at("specimens", "bestiary", 70, 0.9),
  at("telescope", "crowsNest", 30, 2),
  make("mapTable", "atrium", "Map table", 0, 4.5, 2.6, 2.6, 0.9, { kind: "chart" }),
  door("bedroom2Door", "bedroom2"), door("bedroom3Door", "bedroom3"),
];
const { reserved, ...rest } = H;
// (as the file was laid out: a key a line, each room, branch and object on one line)
const one = v => JSON.stringify(v).replace(/([{,])"([^"]+)":/g, "$1 \"$2\": ").replace(/^\{ /, "{ ").replace(/\}$/, " }").replace(/\{ "/g, "{ \"").replace(/,(?=[\[{"-\d])/g, ", ");
const out = { ...rest, turn: 0, organic: true, rooms, corridors, objects };
writeFileSync(FILE, "{\n" + Object.entries(out).map(([k, v]) => `  ${JSON.stringify(k)}: ${Array.isArray(v) ? `[\n${v.map(o => `    ${one(o)}`).join(",\n")}\n  ]` : JSON.stringify(v)}`).join(",\n") + "\n}\n");
console.log(`wrote ${rooms.length} rooms, ${corridors.length} branches, ${objects.length} objects`);
