import { expect, test } from "vitest";
import { newKnownQuestJob } from "./knownQuest";
import type { Observation } from "./observe";
const frame = (t = 0): Observation => ({ playerTime: t, worldTime: t, view: { halfWidth: 40, halfDepth: 40 },
  self: { x: 0, z: 0, hp: 4, mode: "ground", ko: false, seated: false, perched: false, grounded: false },
  range: 30, pickRadius: 4, castRadius: 5, spacing: 4, castBlocked: false, waiting: false, home: { x: 0, z: 0 },
  carried: [], creatures: [], stones: [], loose: [], placed: [], next: null, straggler: null, victoryPointer: false,
  legends: [], alarms: [], windups: [], quests: [], find: null, relics: [] });
const request = (id = 1) => ({ id, wants: "hare", open: true, delivery: { x: 100, z: 0 }, hint: { x: 200, z: 0 } });
const step = (job: ReturnType<typeof newKnownQuestJob>, o: Observation, healing = false, visiting = false) => job.update(o, healing, visiting, 700);
test("empty observations and closed bubbles never invent unseen requests; output is detached", () => {
  const job = newKnownQuestJob(true), o = frame();
  expect(step(job,o)).toBeNull(); o.quests = [{ ...request(), open: false, wants: "" }]; expect(step(job,o)).toBeNull();
  o.quests = [request()]; const chosen = step(job,o)!; chosen.quest.wants = "mutated";
  o.quests = []; o.playerTime = 1; expect(step(job,o)?.quest.wants).toBe("hare");
});
test("only fresh actual cues can keep a job active; closed/angry/friendly cues end it", () => {
  for (const closure of ["stale","closed","angry","friendly"]) {
    const job = newKnownQuestJob(true), o = frame(); o.quests = [request()]; expect(step(job,o)).not.toBeNull();
    o.quests = []; o.playerTime = closure === "stale" ? 30.01 : 1;
    if (closure === "closed") o.quests = [{ ...request(), open: false }];
    if (closure === "angry" || closure === "friendly") o.creatures = [{ id:1, species:"fox", level:3, boss:true, friendly:closure==="friendly", angry:closure==="angry", stunned:false, area:"0,0", rune:null, x:100, z:0 }];
    expect(step(job,o),closure).toBeNull(); expect(job.snapshot().id).toBeNull();
  }
});
test("a carried offering beats other hints, and a chosen request remains committed", () => {
  const job = newKnownQuestJob(true), o = frame(); o.quests = [request(1), { ...request(2), wants:"fox" }];
  o.carried = [{ id:9, species:"fox", level:1 }]; expect(step(job,o)).toMatchObject({ kind:"deliver", quest:{id:2} });
  o.carried = []; expect(step(job,o)).toMatchObject({ kind:"hint", quest:{id:2} });
  // An actual closure allows the other known quest, using the original deadline.
  o.playerTime = 2; o.quests = [{ ...request(2), open:false }]; expect(step(job,o)?.quest.id).toBe(1);
  expect(job.snapshot().deadline).toBe(60);
});
test("unavailable targets release priority without manufacturing an arrival/completion cue", () => {
  const job = newKnownQuestJob(true), o = frame(); o.quests = [request()]; step(job,o);
  o.playerTime = 1; o.quests = [{ ...request(), hint: { x:0,z:0 } }];
  expect(step(job,o)).toBeNull(); expect(job.snapshot().reason).toBe("closed, stale or unavailable");
});
test("the fixed deadline counts gaps, dream-visit interruptions and quest switches; no restart", () => {
  const job = newKnownQuestJob(true), o = frame(); o.quests=[request()]; step(job,o);
  o.playerTime=10; expect(step(job,o,false,true)).toBeNull();
  o.playerTime=20; o.quests=[{...request(),open:false},request(2)]; expect(step(job,o)?.quest.id).toBe(2);
  expect(job.snapshot().deadline).toBe(60);
  o.playerTime=59.75; expect(step(job,o)).toBeNull(); expect(job.snapshot().released).toBe(true);
  o.playerTime=100; o.quests=[request(3)]; expect(step(job,o)).toBeNull(); expect(job.snapshot().deadline).toBe(60);
});
const aborts: [string, (o: Observation) => void, boolean?][] = [
  ["damage",o=>{o.self.hp=3;}], ["KO",o=>{o.self.ko=true;}], ["healing",()=>{},true],
  ["low HP",o=>{o.self.hp=2;}], ["alarm",o=>{o.alarms=[{x:100,z:0}];}],
  ["windup",o=>{o.windups=[{x:20,z:0}];}], ["nearby threat",o=>{o.creatures=[{id:9,species:"fox",level:1,boss:false,friendly:false,angry:true,stunned:false,area:"0,0",rune:null,x:20,z:0}];}],
  ["visible victory pointer",o=>{o.victoryPointer=true;}],
];
for (const [reason, change, healing] of aborts) test(`${reason} releases deferral for the rest of the night`, () => {
  const job = newKnownQuestJob(true), o=frame();o.quests=[request()];expect(step(job,o)).not.toBeNull();
  o.playerTime=1; change(o);expect(step(job,o,healing)).toBeNull();expect(job.snapshot().released).toBe(true);
  // Low HP is also damage here; either is the approved safety release.
  if (reason !== "low HP") expect(job.snapshot().reason).toBe(reason);
  const safe=frame(2);safe.quests=[request()];expect(step(job,safe)).toBeNull();
});
test("unsafe entry and an active dream visit cannot begin a budget; opt-out is inert", () => {
  const o=frame();o.quests=[request()];o.self.hp=2;
  const job=newKnownQuestJob(true);expect(step(job,o)).toBeNull();expect(job.snapshot().deadline).toBeNull();
  o.self.hp=4;expect(step(job,o,false,true)).toBeNull();expect(job.snapshot().deadline).toBeNull();
  const off=newKnownQuestJob(false);expect(step(off,o)).toBeNull();expect(off.snapshot().deadline).toBeNull();
});
