import { afterAll, expect, test, vi } from "vitest";
import type { Game } from "../rules/game";
import type { Observation } from "./observe";
import { EXPERT_LIMITS, newExpert, type ExpertTrace } from "./expert";

// Pure scripted observations: no newGame, stepping, map generation or simulation.
// The project uses isolate:false: expert.test may already have cached the real
// observer. Reset before this file's imports, then leave no mock/cache behind.
vi.hoisted(() => vi.resetModules());
vi.mock("./observe", () => ({ newObserver: () => (g: { fixture: Observation }) => structuredClone(g.fixture) }));
afterAll(() => { vi.doUnmock("./observe"); vi.resetModules(); });
const observation = (): Observation => ({ playerTime: 0, worldTime: 0,
  view: { halfWidth: 40, halfDepth: 40 },
  self: { x: 0, z: 0, mode: "ground", hp: 3, ko: false, seated: false, perched: false, grounded: false },
  range: 30, pickRadius: 4, spacing: 4, castRadius: 5, castBlocked: false, waiting: false, home: { x: 0, z: 0 },
  carried: [], creatures: [], stones: [], loose: [], placed: [], next: null, straggler: null, victoryPointer: false,
  legends: [], alarms: [], windups: [], quests: [], find: null, relics: [] });
const fixtures = Array.from({ length: 960 }, (_, i) => {
  const o = observation(); o.playerTime = i / 60; o.worldTime = i / 60;
  const phase = Math.floor(i / 60);
  if (phase === 0) o.self.seated = true;
  if (phase === 1) o.waiting = true;
  if (phase === 2) o.self.ko = true;
  if (phase === 3) o.self.hp = 1;
  if (phase === 4) o.find = { x: 10, z: 0 };
  if (phase >= 5 && phase < 12) o.quests = [{ id: 1, wants: "hare", open: phase !== 11, delivery: { x: 20, z: 0 }, hint: { x: 100, z: 0 } }];
  if (phase === 6) o.carried = [{ id: 8, species: "hare", level: 1 }];
  if (phase === 7) o.loose = [{ id: 8, x: 2, z: 0 }];
  if (phase === 8) o.stones = [{ key: "1,1", x: 0, z: 0, open: true, ready: true, cast: { x: 0, z: 0 } }];
  if (phase === 9) o.creatures = [{ id: 8, species: "hare", level: 1, boss: false, friendly: false, angry: false, stunned: false, area: "1,1", rune: null, x: 20, z: 0 }];
  if (phase === 10) o.windups = [{ x: 2, z: 0 }];
  if (phase === 12) o.creatures = [{ id: 2, species: "fox", level: 3, boss: true, friendly: false, angry: false, stunned: false, area: "2,2", rune: null, x: 30, z: 0 }];
  if (phase === 13) o.next = { x: 100, z: 0 };
  if (phase === 14) o.self.mode = "treetop";
  return o;
});
for (const questMax of [1, 2]) for (const coverageExploration of [false, true]) for (const knownQuestPriority of [false, true]) for (const questDeliveryRepair of [false, true]) test(`diagnostic output preserves every control, questMax=${questMax}, coverage=${coverageExploration}, questJob=${knownQuestPriority}, delivery=${questDeliveryRepair}`, () => {
  const events: ExpertTrace[] = [];
  const plain = newExpert({ questMax }, 123, EXPERT_LIMITS, undefined, { coverageExploration, knownQuestPriority, questDeliveryRepair }), logged = newExpert({ questMax }, 123, EXPERT_LIMITS, e => events.push(e), { coverageExploration, knownQuestPriority, questDeliveryRepair });
  const mutating = newExpert({ questMax }, 123, EXPERT_LIMITS, e => {
    e.controls.moveX = 999; e.observation.self.hp = -999; e.knownQuests.length = 0; e.heardDreams.push(999);
    e.questJob.id = 999; e.questJob.deadline = -999;
    e.deliverySelection.pending = "mutated";
  }, { coverageExploration, knownQuestPriority, questDeliveryRepair });
  for (const fixture of fixtures) {
    const g = { fixture } as unknown as Game, expected = plain.decide(g);
    expect(logged.decide(g)).toEqual(expected); expect(mutating.decide(g)).toEqual(expected);
  }
  expect(events.length).toBeGreaterThan(80);
  expect(events.every(e => e.playerTime - e.observation.playerTime >= .25 - 1e-9)).toBe(true);
  expect(events.some(e => e.selectedQuest === 1)).toBe(true);
  expect(events.some(e => e.controls.fire)).toBe(true);
  expect(events.some(e => e.doing === "bringing a requested sigil to a legend")).toBe(true);
});

const legend = () => ({ id: 9, species: "fox", level: 3, boss: true, friendly: false, angry: false,
  stunned: false, area: "1,1", rune: null, x: 30, z: 0 });
function visitScript(rememberDreamVisits: boolean, change: (o: Observation, t: number) => void, end = 6) {
  const events: ExpertTrace[] = [], bot = newExpert({}, 123, EXPERT_LIMITS, e => events.push(e), { rememberDreamVisits });
  for (let i = 0; i <= end * 60; i++) {
    const o = observation(), t = i / 60; o.playerTime = t; o.worldTime = t;
    o.next = { x: -100, z: 0 }; if (t < .5) o.creatures = [legend()]; change(o, t);
    bot.decide({ fixture: o } as unknown as Game);
  }
  return events;
}
test("a selected dream visit remembers only its observed position after it leaves view", () => {
  const on = visitScript(true, () => {}), off = visitScript(false, () => {});
  const at2 = (events: ExpertTrace[]) => events.find(e => e.observation.playerTime >= 2)!;
  expect(at2(on).observation.creatures).toEqual([]);
  expect(at2(on).dreamVisit).toEqual({ id: 9, x: 30, z: 0, until: 30 });
  expect(at2(on).visitingLegend).toBe(9); expect(at2(on).controls.moveX).toBeGreaterThan(0);
  expect(at2(off).visitingLegend).toBeNull(); expect(at2(off).controls.moveX).toBeLessThan(0);
});
for (const open of [true, false]) test(`arrival alone never marks a dream read; real ${open ? "open" : "closed"} cue releases job`, () => {
  const events = visitScript(true, (o, t) => {
    if (t >= 1) { o.self.x = 34; o.self.z = 4; }
    if (t >= 3) o.quests = [{ id: 9, wants: open ? "hare" : "", open, delivery: { x: 34, z: 4 }, hint: null }];
  });
  const arrived = events.find(e => e.observation.playerTime >= 2)!;
  expect(arrived.visitingLegend).toBe(9); expect(arrived.heardDreams).toEqual([]);
  const read = events.find(e => e.observation.playerTime >= 3)!;
  expect(read.dreamVisit).toBeNull(); expect(read.heardDreams).toContain(9);
  expect(read.knownQuests.map(q => q.id)).toEqual(open ? [9] : []);
});
test("healing, KO and audible dodge interrupt the visit without replacing its destination", () => {
  const events = visitScript(true, (o, t) => {
    if (t >= 1 && t < 2) o.self.hp = 1;
    if (t >= 2 && t < 3) o.self.ko = true;
    if (t >= 3 && t < 4) o.windups = [{ x: 2, z: 0 }];
  });
  for (const [t, doing] of [[1.2, "rising to heal"], [2.2, "recovering"], [3.2, "dodging an audible wind-up"]] as const) {
    const e = events.find(e => e.observation.playerTime >= t)!;
    expect(e.doing).toBe(doing); expect(e.dreamVisit?.id).toBe(9); expect(e.dreamVisit?.until).toBe(30);
  }
  expect(events.find(e => e.observation.playerTime >= 4.2)!.visitingLegend).toBe(9);
});
for (const interrupted of [false, true]) test(`the 30-second deadline cannot renew or restart, interrupted=${interrupted}`, () => {
  const events = visitScript(true, (o, t) => {
    o.creatures = [{ ...legend(), x: t > 1 ? 40 : 30 }];
    if (interrupted && t >= 1 && t < 31) o.self.ko = true;
  }, 32);
  expect(events.filter(e => e.dreamVisit).every(e => e.dreamVisit!.until === 30)).toBe(true);
  const expired = events.filter(e => e.observation.playerTime >= 30);
  expect(expired.length).toBeGreaterThan(1);
  expect(expired.every(e => e.dreamVisit === null && e.visitingLegend === null)).toBe(true);
  expect(expired.at(-1)!.heardDreams).toEqual([]);
});

function coverageScript(change: (o: Observation) => void, enabled = true, end = 2) {
  const events: ExpertTrace[] = [], durations = new Map<number, number>();
  const bot = newExpert({}, 1, EXPERT_LIMITS, e => events.push(e), { coverageExploration: enabled });
  for (let i = 0; i < end * 60; i++) {
    const o = observation(); o.playerTime = i / 60; o.worldTime = o.playerTime; o.self.x = o.playerTime * 10;
    change(o); bot.decide({ fixture: o } as unknown as Game);
    if (bot.doing === "exploring a less-seen direction") { const epoch = Math.floor(o.playerTime / 30); durations.set(epoch, (durations.get(epoch) ?? 0) + 1 / 60); }
  }
  return { events, durations };
}
test("scheduled coverage can preempt ordinary loot but respects every higher priority", () => {
  const loot = (o: Observation) => { o.loose = [{ id: 1, x: o.self.x + 2, z: 0 }]; };
  expect(coverageScript(loot).events.some(e => e.doing === "exploring a less-seen direction")).toBe(true);
  expect(coverageScript(loot, false).events.every(e => e.doing === "gathering a sigil")).toBe(true);
  const priorities: [string, (o: Observation) => void][] = [
    ["recovering", o => { o.self.ko = true; }],
    ["rising to heal", o => { o.self.hp = 1; }],
    ["dodging an audible wind-up", o => { o.windups = [{ x: o.self.x + 2, z: 0 }]; }],
    ["visiting a visible legend's dream", o => { o.creatures = [legend()]; }],
    ["casting at a ready stone", o => { o.stones = [{ key: "1,1", x: 0, z: 0, open: true, ready: true, cast: { x: 0, z: 0 } }]; }],
    ["bringing a requested sigil to a legend", o => { o.quests = [{ id: 9, wants: "hare", open: true, delivery: { x: 100, z: 0 }, hint: null }]; o.carried = [{ id: 10, species: "hare", level: 1 }]; }],
    ["inviting hare", o => { o.quests = [{ id: 9, wants: "hare", open: true, delivery: { x: 100, z: 0 }, hint: null }]; o.creatures = [{ ...legend(), id: 10, species: "hare", boss: false, level: 1 }]; }],
  ];
  for (const [doing, change] of priorities) {
    const { events } = coverageScript(change);
    expect(events.some(e => e.doing === doing), doing).toBe(true);
    expect(events.some(e => e.doing === "exploring a less-seen direction"), doing).toBe(false);
  }
});
test("scheduled coverage stays under five seconds per thirty-second interval at real input cadence", () => {
  const { events, durations } = coverageScript(() => {}, true, 95);
  expect(durations.size).toBe(4);
  expect([...durations.values()].every(t => t <= 5 + 1e-9)).toBe(true);
  expect(events.every(e => e.playerTime - e.observation.playerTime >= .25 - 1e-9)).toBe(true);
});

function questScript(enabled: boolean, change: (o: Observation, t: number) => void, end = 3) {
  const events: ExpertTrace[] = [], bot = newExpert({questMax:0},123,EXPERT_LIMITS,e=>events.push(e),{knownQuestPriority:enabled});
  for(let i=0;i<=end*60;i++) {
    const o=observation();o.playerTime=i/60;o.worldTime=o.playerTime;o.self.hp=4;
    o.quests=[{id:9,wants:"hare",open:true,delivery:{x:100,z:0},hint:{x:200,z:0}}];
    o.stones=[{key:"1,1",x:0,z:0,open:true,ready:true,cast:{x:0,z:0}}];
    o.loose=[{id:3,x:-2,z:0}];change(o,o.playerTime);bot.decide({fixture:o} as unknown as Game);
  }
  return events;
}
test("known requests beyond questMax preempt optional loot/cast and recruit only the requested animal",()=>{
  const change=(o:Observation)=>{o.creatures=[{...legend(),id:10,boss:false,level:1,species:"hare",x:20},{...legend(),id:11,boss:false,level:1,species:"fox",x:2}];};
  const on=questScript(true,change),off=questScript(false,change);
  expect(on.every(e=>e.doing==="inviting hare")).toBe(true);expect(on.some(e=>e.controls.fire)).toBe(true);
  expect(on.every(e=>!e.controls.place&&!e.controls.sigilHeld)).toBe(true);
  expect(off.every(e=>e.doing==="gathering a sigil")).toBe(true);
  expect(on.every(e=>e.questJob.id===9)).toBe(true);
});
test("known-quest hints precede straggler pursuit, and a safety abort restores baseline controls",()=>{
  const change=(o:Observation,t:number)=>{o.loose=[];o.straggler={x:-100,z:0};if(t>=1)o.alarms=[{x:-40,z:0}];};
  const on=questScript(true,change),off=questScript(false,change);
  expect(on.find(e=>e.observation.playerTime>=.5)?.doing).toBe("following a known quest's dream hint");
  for(let i=0;i<on.length;i++)if(on[i].observation.playerTime>=1){expect(on[i].questJob.released).toBe(true);expect(on[i].controls).toEqual(off[i].controls);}
});
test("actual offering placement does not claim completion; a closed cue releases the job",()=>{
  const events=questScript(true,(o,t)=>{o.carried=[{id:10,species:"hare",level:1}];o.self.x=100;if(t>=1)o.quests=[{id:9,wants:"",open:false,delivery:{x:100,z:0},hint:null}];});
  const delivery=events.find(e=>e.observation.playerTime>=.5)!;
  expect(delivery.doing).toBe("bringing a requested sigil to a legend");expect(delivery.controls.sigil).toBe(true);
  expect(delivery.knownQuests.map(q=>q.id)).toEqual([9]);
  const closed=events.find(e=>e.observation.playerTime>=1)!;expect(closed.questJob.id).toBeNull();expect(closed.knownQuests).toEqual([]);
});

test("real reaction/input cadence releases held quest controls before sixty seconds and never restarts",()=>{
  const on=questScript(true,o=>{o.loose=[];},63),off=questScript(false,o=>{o.loose=[];},63);
  const first=on.find(e=>e.questJob.id!==null)!;
  const released=on.find(e=>e.questJob.released)!;
  expect(released.playerTime-first.playerTime).toBeLessThanOrEqual(60);
  expect(released.questJob.reason).toBe("timeout");
  for(let i=0;i<on.length;i++)if(on[i].playerTime>=released.playerTime){
    expect(on[i].questJob.id).toBeNull();expect(on[i].controls).toEqual(off[i].controls);
  }
});

test("stale requests release optional casting even while remembered by the ordinary policy",()=>{
  const events=questScript(true,(o,t)=>{o.loose=[];if(t>.5)o.quests=[];},32);
  expect(events.find(e=>e.observation.playerTime>=2)!.doing).toBe("following a known quest's dream hint");
  const stale=events.find(e=>e.observation.playerTime>=31)!;
  expect(stale.questJob.id).toBeNull();expect(stale.controls.sigilHeld).toBe(true);
  expect(stale.knownQuests.map(q=>q.id)).toEqual([9]);
});

test("a requested recruit's visible sigil is picked up before following its dream hint",()=>{
  const events=questScript(true,(o,t)=>{
    o.creatures=[{...legend(),id:10,boss:false,level:1,species:"hare",x:2,rune:t>=1?{x:2,z:0}:null}];
    if(t>=2){o.creatures=[];o.carried=[{id:10,species:"hare",level:1}];}
  });
  const at=(t:number)=>events.find(e=>e.observation.playerTime>=t)!;
  expect(at(.5).doing).toBe("inviting hare");expect(at(1.5).controls.place).toBe(true);
  expect(at(1.5).questJob.reason).toBe("pickup");
  expect(at(2.5).doing).toBe("bringing a requested sigil to a legend");
  expect(at(2.5).questJob.deadline).toBe(at(.5).questJob.deadline);
});

function offeringScript(repaired:boolean,change:(o:Observation,t:number)=>void) {
  const events:ExpertTrace[]=[],bot=newExpert({},1,EXPERT_LIMITS,e=>events.push(e),{questDeliveryRepair:repaired});
  for(let i=0;i<=3*60;i++){
    const o=observation();o.playerTime=i/60;o.worldTime=o.playerTime;
    o.quests=[{id:297,wants:"tiger",open:true,delivery:{x:0,z:0},hint:null}];
    o.carried=[{id:338,species:"tiger",level:0},{id:340,species:"tiger",level:1}];
    change(o,o.playerTime);bot.decide({fixture:o} as unknown as Game);
  }
  return events;
}
test("the duplicate-tiger delivery regression places either matching bottom rather than cycling forever",()=>{
  for(const reverse of [false,true]){
    const change=(o:Observation)=>{if(reverse)o.carried.reverse();};
    const off=offeringScript(false,change),on=offeringScript(true,change);
    expect(off.every(e=>e.controls.cycle&&!e.controls.sigil)).toBe(true);
    expect(on.every(e=>e.controls.sigil&&!e.controls.cycle)).toBe(true);
    expect(on.every(e=>!e.questJob.enabled)).toBe(true);
  }
});
test("mixed delivery sends only one cycle while waiting for the actual delayed stack change",()=>{
  const events=offeringScript(true,(o,t)=>{
    const tiger={id:338,species:"tiger",level:0},fox={id:20,species:"fox",level:1};
    o.carried=t<1?[tiger,fox]:[fox,tiger];
  });
  expect(events.filter(e=>e.controls.cycle).length).toBe(1);
  expect(events.filter(e=>e.observation.playerTime<1).slice(1).every(e=>!e.controls.sigil&&!e.controls.cycle)).toBe(true);
  expect(events.find(e=>e.observation.playerTime>=1)?.controls.sigil).toBe(true);
});
test("healing and KO keep precedence while a cycle acknowledgement is outstanding",()=>{
  const events=offeringScript(true,(o,t)=>{
    o.carried=[{id:338,species:"tiger",level:0},{id:20,species:"fox",level:1}];
    if(t>=.5&&t<1.5)o.self.hp=1;
    if(t>=1.5&&t<2)o.self.ko=true;
    if(t>=2)o.carried.reverse();
  });
  expect(events.find(e=>e.observation.playerTime>=.6)?.doing).toBe("rising to heal");
  expect(events.find(e=>e.observation.playerTime>=1.6)?.doing).toBe("recovering");
  expect(events.filter(e=>e.controls.cycle).length).toBe(1);
  expect(events.find(e=>e.observation.playerTime>=2.1)?.controls.sigil).toBe(true);
});
