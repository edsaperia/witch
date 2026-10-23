// The Ent's own house (Ed, 2026-10-23: "The layout doesn't have to be all right-angles; the corridors are tree branches, the rooms are
// probably round"; previews/ed/treehouse-layout-v3/mock2): writes config/house.json's rooms, branches and objects from the plan
// below, keeping its other fields. Each room is placed by its parent: a bearing (degrees from north, clockwise), the branch's length
// between their rims (m) and its own radius (m), the branch bowed `bend` metres to one side. Metres from the hub's centre, x east,
// z south (the plan unturned: turn 0). Objects are boxes on the plan (art/furniture.js draws each by id and footprint), each placed
// at a bearing from its room's middle, its back to the rim: its size (FOOT: along the wall it backs on, out from it, and up, in metres,
// twice a real piece's: Ed, 2026-10-23, the furniture "about 2x, as big as in her old creator bedroom") turned into the plan's box by
// the way it faces (w along x: a piece facing mostly east or west has its depth along x), `in` metres in from the rim to its middle
// (by default half its depth and a little: its back against the rail). Checks no two rooms crowd (2 m apart unless joined) and prints the walk
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
  ["bedroom2", "Bedroom 2", "boudoir", 76, 10, 9, -1, true],
  ["bedroom3", "Bedroom 3", "boudoir", 133, 2.5, 9, 1, true],
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
// each object's size (m): along the wall it backs on, out from it, up; twice a real piece's (the map table's and the hats' rug as they
// were: the Atrium's table already its size, the rug the hats' slots)
const FOOT = {
  wardrobe: [4, 1.2, 4.4], dressingTable: [2.8, 1.2, 3.4], curtains: [3.6, 0.6, 4.2], bed: [4, 5.2, 1.6], phone: [1.2, 1.2, 1.2], cloakPegs: [2.6, 0.6, 4],
  shoeRack: [3, 1.1, 1.6], crystalBall: [1.4, 1.4, 2.6], telephone: [1, 1, 2.2], mirror: [2.2, 0.6, 4.2], hats: [3.6, 1.8, 0], bags: [3.6, 0.8, 3.2],
  invitations: [3.4, 1.8, 1.8], broomStand: [2.4, 0.8, 3.6], pegboard: [5, 0.5, 4.4], recordShelf: [4.4, 1, 4], cauldron: [2.8, 2.8, 1.8], teaTable: [2.8, 2.8, 1.4],
  cardTable: [3.4, 3.4, 1.5], broomBay: [6, 2.4, 2.2], lathe: [4.8, 1.6, 2], book: [1.6, 1.2, 2.2], specimens: [6, 0.8, 4], telescope: [1.6, 1.6, 3.2], mapTable: [2.6, 2.6, 0.9],
  drumKit: [4.4, 4, 2.6], synthRack: [4.8, 1.4, 3.8], microphone: [1, 1, 3.4],
  clothesPile: [2, 1.6, 0.6],
  // the other two bedrooms' placeholders under dust sheets (art/sheeted.js), the same in both
  ...Object.fromEntries(["bedroom2", "bedroom3"].flatMap(r => [[`${r}Bed`, [4, 5.2, 1.2]], [`${r}Wardrobe`, [4, 1.4, 4.4]], [`${r}Chest`, [2.8, 1.6, 1.8]], [`${r}Crates`, [3, 1.6, 2.6]]])),
};
const at = (id, room, b, inn, more = {}) => {
  const p = P[room], a = (b * Math.PI) / 180, [W, D, Hh] = FOOT[id] ?? [old[id].w, old[id].d, old[id].h], side = Math.abs(Math.sin(a)) > Math.abs(Math.cos(a));
  const R = p.r - (inn ?? D / 2 + 0.35);
  return { ...old[id], room, x: f2(p.x + R * Math.sin(a)), z: f2(p.z - R * Math.cos(a)), w: side ? D : W, d: side ? W : D, h: Hh, ...more };
};
const make = (id, room, label, b, inn, use) => ({ ...at(id, room, b, inn), id, label, use });
const SHEETED = { Bed: ["A bare bed frame", 3.4], Wardrobe: ["Something under a dust sheet"], Chest: ["Something under a dust sheet"], Crates: ["Packing crates"] };
const sheeted = (room, at) => Object.entries(at).map(([k, b]) => make(`${room}${k}`, room, SHEETED[k][0], b, SHEETED[k][1], { kind: "say", line: "Waiting for its witch." }));
const door = (id, room) => ({ id: `${room}Door`, room: "boudoir", label: "Door", ...doors[room], w: 1.4, d: 1.4, h: 4.4, use: { kind: "say", line: "A friend's room. Locked for now." } });
const objects = [
  at("wardrobe", "bedroom", -62), at("dressingTable", "bedroom", -25), at("curtains", "bedroom", 8),
  at("bed", "bedroom", 45, 3.4), at("phone", "bedroom", 85, 1.2), at("cloakPegs", "bedroom", -100), at("shoeRack", "bedroom", -138),
  at("crystalBall", "boudoir", -30, 2.4), at("telephone", "boudoir", 100),
  at("mirror", "parlour", -25), at("hats", "parlour", 0, 0, { x: P.parlour.x, z: f2(P.parlour.z + 1) }),
  at("bags", "study", -40), at("invitations", "study", 32),
  // (the Workshop, Hotel's, Ed's OK 2026-10-23: the biome board where it was, the broom bay and the lathe along the back wall either side
  // of it; the old broom stand to the side till Hotel's Workshop takes it away, the bay replacing it)
  at("broomStand", "workshop", -112), at("pegboard", "workshop", 25, 0.9),
  make("broomBay", "workshop", "Broom bay", -38, undefined, { kind: "say", line: "Her broom rests here." }), make("lathe", "workshop", "Lathe", 88, undefined, { kind: "say", line: "The lathe waits for her broom." }),
  // the Studio's instruments (Ed, 2026-10-23: "a drumkit (top left), modular synth setup (top right), microphone (middle, spotlit)";
  // rules/studio.ts), and the record shelf beside the DJ booth (Ed: "the record collection is actually next to the DJ booth"): on the
  // Terrace by the balcony, beside the decks, its long side north to south (Alpha's art/furniture.js)
  make("drumKit", "studio", "Drum kit", -45, 2.5, { kind: "instrument", instrument: "drums" }),
  make("synthRack", "studio", "Modular synth", 45, 2, { kind: "instrument", instrument: "synth" }),
  make("microphone", "studio", "Microphone", 0, 6.5, { kind: "instrument", instrument: "mic" }),
  at("recordShelf", "terrace", 146, 0.73, { w: 1.2, d: 3.2, h: 3.2 }), at("cauldron", "kitchen", 0, 5),
  at("teaTable", "solarium", 0, 5.4), at("cardTable", "drawingRoom", 0, 5.4),
  at("book", "bestiary", 0, 4.5), at("specimens", "bestiary", 70, 1.9),
  at("telescope", "crowsNest", 30, 2),
  make("mapTable", "atrium", "Map table", 0, 4.5, { kind: "chart" }),
  // last night's clothes, on the floor by her bed, between it and the room's middle (rules/clothesPile.ts; Ed, 2026-10-23)
  make("clothesPile", "bedroom", "Last night's clothes", 110, 5, { kind: "pile" }),
  door("bedroom2Door", "bedroom2"), door("bedroom3Door", "bedroom3"),
  // the other two bedrooms (Ed, 2026-10-23: one per witch, "fill the other two with placeholders for now; the key thing is to reserve
  // the space"): her room's size, locked, their furniture under dust sheets (art/sheeted.js), the way in from the Boudoir left clear
  ...sheeted("bedroom2", { Bed: 76, Wardrobe: 150, Chest: 10, Crates: -170 }),
  ...sheeted("bedroom3", { Bed: 133, Wardrobe: -135, Chest: 40, Crates: 85 }),
];
const { reserved, ...rest } = H;
// (as the file was laid out: a key a line, each room, branch and object on one line)
const one = v => JSON.stringify(v).replace(/([{,])"([^"]+)":/g, "$1 \"$2\": ").replace(/^\{ /, "{ ").replace(/\}$/, " }").replace(/\{ "/g, "{ \"").replace(/,(?=[\[{"-\d])/g, ", ");
const out = { ...rest, turn: 0, organic: true, rooms, corridors, objects };
writeFileSync(FILE, "{\n" + Object.entries(out).map(([k, v]) => `  ${JSON.stringify(k)}: ${Array.isArray(v) ? `[\n${v.map(o => `    ${one(o)}`).join(",\n")}\n  ]` : JSON.stringify(v)}`).join(",\n") + "\n}\n");
console.log(`wrote ${rooms.length} rooms, ${corridors.length} branches, ${objects.length} objects`);
