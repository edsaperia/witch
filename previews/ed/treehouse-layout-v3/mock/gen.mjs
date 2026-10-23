// The v3 mock's plan: Ed's graph on the sketch's lattice (L m between centres along the plan's axes).
import { readFileSync, writeFileSync } from "node:fs";
const [src, out, Ls = "24"] = process.argv.slice(2), L = +Ls;
const H = JSON.parse(readFileSync(src, "utf8")), old = Object.fromEntries(H.objects.map(o => [o.id, o]));
const HUB = 7; // the Terrace: today's round hub (radius) + balcony
// id, label, lattice (i along x NE, j along z SE), size
const R = [
  ["workshop", "Workshop", 0, -1, 16], ["studio", "Studio", -1, 0, 14], ["kitchen", "Kitchen", 0, 1, 14],
  ["atrium", "Atrium", 1, 0, 10], ["drawingRoom", "Drawing Room", 2, 0, 14], ["bestiary", "Bestiary", 1, 1, 14],
  ["parlour", "Parlour", 1, -2, 12], ["solarium", "Solarium", 1, -3, 14], ["study", "Study", 0, -2, 14],
  ["boudoir", "Boudoir", 2, -2, 10], ["bedroom2", "Bedroom 2", 3, -2, 18], ["bedroom3", "Bedroom 3", 2, -1, 18],
  ["bedroom", "Bedroom", 2, -3, 18], ["crowsNest", "Crow's nest", 2, -4, 10],
];
const C = Object.fromEntries(R.map(([id, , i, j, s]) => [id, { x: i * L, z: j * L, s }]));
C.terrace = { x: 0, z: 0, s: 2 * HUB, hub: true };
const rooms = R.map(([id, label, , , s]) => ({ id, label, x0: C[id].x - s / 2, x1: C[id].x + s / 2, z0: C[id].z - s / 2, z1: C[id].z + s / 2 }));
const links = [["terrace", "atrium"], ["terrace", "workshop"], ["terrace", "studio"], ["terrace", "kitchen"], ["atrium", "drawingRoom"], ["atrium", "bestiary"], ["atrium", "parlour"],
  ["parlour", "solarium"], ["parlour", "study"], ["parlour", "boudoir"], ["boudoir", "bedroom"], ["boudoir", "bedroom2"], ["boudoir", "bedroom3"], ["bedroom", "crowsNest"]];
const W = 2, IN = 1.5, half = id => (C[id].hub ? HUB : C[id].s / 2);
const corridors = links.map(([a, b]) => {
  const A = C[a], B = C[b], alongX = A.z === B.z, s = Math.sign(alongX ? B.x - A.x : B.z - A.z);
  const p0 = (alongX ? A.x : A.z) + s * (half(a) - IN), p1 = (alongX ? B.x : B.z) - s * (half(b) - IN), lo = Math.min(p0, p1), hi = Math.max(p0, p1);
  return alongX ? { id: `${a}-${b}`, x0: lo, x1: hi, z0: A.z - W, z1: A.z + W } : { id: `${a}-${b}`, x0: A.x - W, x1: A.x + W, z0: lo, z1: hi };
});
const at = (id, room, lx, lz, more = {}) => ({ ...old[id], room, x: +(C[room].x + lx).toFixed(2), z: +(C[room].z + lz).toFixed(2), ...more });
const say = (id, room, label, lx, lz, w, d, h, line) => ({ id, room, label, x: C[room].x + lx, z: C[room].z + lz, w, d, h, use: { kind: "say", line } });
// the bedroom's things where they stood in today's 18 m bedroom (its middle then 39, 0), the dressing table off the crow's nest's doorway
const bed = (id, dx = 0) => at(id, "bedroom", old[id].x - 39 + dx, old[id].z);
const objects = [
  bed("bed"), bed("phone"), bed("dressingTable", 5), bed("wardrobe", -0.5), bed("cloakPegs"), bed("curtains"), bed("shoeRack"),
  at("crystalBall", "boudoir", 3, -3.6), at("telephone", "boudoir", -3, -4.6),
  at("mirror", "parlour", -3, -5.7), at("hats", "parlour", 2, 1.5),
  at("bags", "study", 2.5, -6.7, { w: 1.8, d: 0.4 }), at("invitations", "study", -3, -6),
  at("broomStand", "workshop", 3, -7.6), at("pegboard", "workshop", -2, -7.75),
  at("recordShelf", "studio", 0, -6.65, { w: 2.2, d: 0.5 }), at("cauldron", "kitchen", 1.5, -1.5),
  at("teaTable", "solarium", 0, -1), at("cardTable", "drawingRoom", 0, -1),
  at("book", "bestiary", 0, 0), at("specimens", "bestiary", 6.6, 0),
  at("telescope", "crowsNest", 0, -1.5),
  say("mapTable", "atrium", "Map table", 0, 0, 3.1, 3.1, 0.9, "(the sea chart)"),
  say("bed2", "bedroom2", "Bedroom 2", 0, -5, 2.6, 2, 0.8, "Someone else's room. Locked for now."),
  say("bed3", "bedroom3", "Bedroom 3", 0, -5, 2.6, 2, 0.8, "Someone else's room. Locked for now."),
];
const { reserved, ...rest } = H;
writeFileSync(out, JSON.stringify({ ...rest, rooms, corridors, objects }, null, 1));
console.log(rooms.length, "rooms", corridors.length, "corridors", objects.length, "objects");
