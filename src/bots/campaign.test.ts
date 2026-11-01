import { expect, test } from "vitest";
import { newCampaign } from "./campaign";
import type { Observation } from "./observe";
import { useBroom } from "./equipment";
const frame = (): Observation => ({ playerTime: 0, worldTime: 0, view: { halfWidth: 50, halfDepth: 50 },
  self: { x: 0, z: 0, hp: 4, mode: "ground", ko: false, seated: false, perched: false, grounded: false },
  range: 30, pickRadius: 4, spacing: 8, castRadius: 5, castBlocked: false, waiting: false, home: { x: 0, z: -100 },
  carried: [], creatures: [], stones: [], loose: [], placed: [], next: { x: 100, z: 0 }, straggler: null, victoryPointer: false,
  legends: [], alarms: [], windups: [], quests: [], find: null, relics: [],
  campaign: { berries: [], flasks: [], troops: [], route: [{ key: "front", x: 100, z: 0, captured: false }], sigils: [] } });
const animal = (id: number, level = 1, species = "fox") => ({ id, level, species });
function carry(o: Observation, ...animals: ReturnType<typeof animal>[]) {
  o.carried = animals; o.campaign!.troops = animals.map(a => ({ ...a, x: 0, z: 0, hurt: false, placed: null }));
}
test("a mixed youth is preferred to another fighter of the coming enemy's species", () => {
  const o = frame(), p = newCampaign(); carry(o, animal(1, 1, "wolf"));
  o.creatures = [{ ...animal(2, 1, "wolf"), x: 100, z: 0, area: "front", boss: false, friendly: false, angry: false, stunned: false, rune: null }];
  p.observe(o);
  expect(p.recruitScore(o, { ...animal(3, 1, "fox"), x: 10, z: 0 })).toBeLessThan(p.recruitScore(o, { ...animal(4, 1, "wolf"), x: 10, z: 0 }));
});
test("babies are useful with berries and a small force, less useful after a mobile force exists", () => {
  const o = frame(), p = newCampaign(), baby = { ...animal(9, 0), x: 10, z: 0 };
  o.campaign!.berries = [{ x: 10, z: 0 }];
  const first = p.recruitScore(o, baby); carry(o, animal(1), animal(2), animal(3));
  expect(p.recruitScore(o, baby)).toBeGreaterThan(first);
});
test("baby feeding waits for actual growth then retrieves its observed sigil", () => {
  const o = frame(), p = newCampaign(); carry(o, animal(1, 0)); o.campaign!.berries = [{ x: 8, z: 0 }]; p.observe(o);
  expect(p.choose(o)?.kind).toBe("drop");
  o.carried = []; o.campaign!.troops[0].placed = { x: 8, z: 0 }; o.playerTime = 1; p.observe(o);
  expect(p.choose(o)?.kind).toBe("wait");
  o.campaign!.troops[0].level = 1; o.playerTime = 2; p.observe(o);
  expect(p.choose(o)).toMatchObject({ kind: "pickup", id: 1, at: { x: 8, z: 0 } });
  carry(o, animal(1)); p.observe(o); expect(p.choose(o)).toBeNull();
});

test("a carried hurt adult heals before being posted, then is retrieved without growing", () => {
  const o = frame(), p = newCampaign(); carry(o, animal(1, 2));
  o.campaign!.troops[0].hurt = true; o.campaign!.berries = [{ x: 8, z: 0 }]; p.observe(o);
  expect(p.choose(o)).toMatchObject({ kind: "drop", id: 1, at: { x: 8, z: 0 }, doing: "taking a hurt animal to berries" });
  o.carried = []; o.campaign!.troops[0].placed = { x: 8, z: 0 }; o.playerTime = 1; p.observe(o);
  expect(p.choose(o)?.kind).toBe("wait");
  o.campaign!.troops[0].hurt = false; o.playerTime = 2; p.observe(o);
  expect(p.choose(o)).toMatchObject({ kind: "pickup", id: 1 });
  expect(o.campaign!.troops[0].level).toBe(2);
});

test("adult healing keeps danger cancellation and feeding timeout cooldown", () => {
  const o = frame(), p = newCampaign(); carry(o, animal(1, 2));
  o.campaign!.troops[0].hurt = true; o.campaign!.berries = [{ x: 8, z: 0 }]; p.observe(o);
  o.windups = [{ x: 20, z: 0 }]; expect(p.choose(o)).toBeNull();
  o.windups = []; p.choose(o); // Begin healing safely.
  o.playerTime = 41; p.observe(o); // Existing40s deadline expires.
  expect(p.choose(o)?.doing).toBe("positioning an adult for an upcoming fight");
  expect(p.snapshot().feeding).toBeNull();
});
test("retains three travelling youths, and only deliberately grows a surplus youth near its post", () => {
  const o = frame(), p = newCampaign(); o.next = { x: 30, z: 0 }; o.campaign!.berries = [{ x: 10, z: 0 }];
  carry(o, animal(1), animal(2), animal(3)); p.observe(o); expect(p.choose(o)).toBeNull();
  carry(o, animal(1), animal(2), animal(3), animal(4)); p.observe(o);
  expect(p.choose(o)).toMatchObject({ kind: "drop", doing: "growing an animal for its role" });
});
test("a nearer revealed future area can receive a slow adult before the next route area", () => {
  const o = frame(), p = newCampaign(); o.next = { x: 300, z: 0 };
  o.campaign!.route.push({ key: "later", x: 40, z: 0, captured: false }); carry(o, animal(1, 2)); p.observe(o);
  const action = p.choose(o)!; expect(action.at.x).toBe(64);
  // Attempt is not a confirmed deployment. The same placement stays stable.
  o.playerTime = 0.5; p.observe(o); expect(p.choose(o)?.at).toEqual(action.at);
  o.carried = []; o.campaign!.troops[0].placed = action.at; p.observe(o);
  expect(p.snapshot().posted).toHaveLength(1); expect(p.reserve(o, 1)).toBe(true);
});
test("distant flasks are left alone; nearby growth is reserved for a compatible battlefield force", () => {
  const o = frame(), p = newCampaign(); carry(o, animal(1), animal(2), animal(3)); o.campaign!.flasks = [{ x: 100, z: 0 }]; p.observe(o);
  expect(p.choose(o)).toBeNull();
  o.next = { x: 35, z: 0 }; o.campaign!.flasks = [{ x: 30, z: 0 }];
  expect(p.choose(o)?.kind).toBe("flask");
});
test("unsafe feeding cancels, and expired jobs cannot immediately repeat", () => {
  const o = frame(), p = newCampaign(); carry(o, animal(1, 0)); o.campaign!.berries = [{ x: 8, z: 0 }]; p.observe(o); p.choose(o);
  o.windups = [{ x: 20, z: 0 }]; expect(p.choose(o)).toBeNull();
  o.windups = []; o.playerTime = 1; p.observe(o); expect(p.choose(o)).toBeNull();
});
test("carry choices leave heavy incompatible animals and surplus babies, but retain quest offerings", () => {
  const o = frame(), p = newCampaign(); carry(o, animal(1), animal(2), animal(3)); p.observe(o);
  expect(p.carryUseful(o, animal(9, 0))).toBe(false);
  o.next = { x: 400, z: 0 };
  expect(p.carryUseful(o, animal(9, 2))).toBe(false);
  expect(p.carryUseful(o, animal(9, 2), "fox")).toBe(true);
});
test("equipped broom use follows public cooldown and tactical conditions", () => {
  const o = frame(), c = { moveX: 1, moveZ: 0, toggleMode: false, zoom: 0, spell: false };
  o.campaign!.equipment = { hat: "none", hatDown: null, broom: "speed", ready: true };
  useBroom(o, c); expect(c.spell).toBe(true);
  c.spell = false; o.campaign!.equipment.ready = false; useBroom(o, c); expect(c.spell).toBe(false);
  o.campaign!.equipment.ready = true; o.campaign!.equipment.broom = "pound";
  o.creatures = [1, 2].map(id => ({ ...animal(id), x: id * 2, z: 0, area: "front", boss: false, friendly: false, angry: true, stunned: false, rune: null }));
  useBroom(o, c); expect(c.spell).toBe(true);
});
test("early capture advances to another revealed route area instead of waiting at the old wave pointer", () => {
  const o = frame(), p = newCampaign();
  o.campaign!.route[0].captured = true;
  o.campaign!.route.push({ key: "future", x: 180, z: 20, captured: false }); p.observe(o);
  expect(p.destination(o)).toMatchObject({ x: 180, z: 20 });
  o.campaign!.route = []; p.observe(o); // remembered discovery survives leaving the view
  expect(p.destination(o)).toMatchObject({ x: 180, z: 20 });
});
test("a visible early-clear rainbow supplies a direction without a future endpoint, then expires", () => {
  const o = frame(), p = newCampaign(); o.campaign!.route[0].captured = true;
  o.campaign!.rainbow = [{ x: 10, z: 0, way: { x: 40, z: 0 } }]; p.observe(o);
  expect(p.destination(o)).toEqual({ x: 40, z: 0 });
  o.campaign!.rainbow = []; o.playerTime = 16; p.observe(o);
  expect(p.destination(o)).toBeNull();
});
test("training parameters change the actual mobile reserve and adult carry decisions", () => {
  const o = frame(); carry(o, animal(1), animal(2), animal(3));
  const small = newCampaign({ mobileYouths: 1 }), large = newCampaign({ mobileYouths: 5 }); small.observe(o); large.observe(o);
  expect(small.choose(o)?.kind).toBe("drop"); expect(large.choose(o)).toBeNull();
  o.next = { x: 100, z: 0 };
  expect(newCampaign({ adultPostRange: 60 }).carryUseful(o, animal(9, 2))).toBe(false);
  expect(newCampaign({ adultPostRange: 200 }).carryUseful(o, animal(9, 2))).toBe(true);
});
