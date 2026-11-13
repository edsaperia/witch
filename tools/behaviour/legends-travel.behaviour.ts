// Original L3/L5 samples; outcome references are informational, not release gates.
import fs from "node:fs";
import path from "node:path";
import {it} from "vitest";
import {metric} from "./results.mjs";
import {generateMap} from "../../src/rules/map";
import {TUNING,withTuning} from "../../src/rules/tuning";
import {keepsToCircle,pointInArea,spawnCreatures,stepCreature} from "../../src/rules/creatures";
import {rng} from "../../src/rules/random";
import {joinParty,loseSoundsystem,newGame,stepGame,STEP,type Controls,type Game} from "../../src/rules/game";
import {befriend} from "../../src/rules/creatureStates";
import {inviteCreature} from "../../src/rules/leash";
const PEOPLED = withTuning({ population: { ...TUNING.population, start: { ...TUNING.population.start, young: 1 } }, cast: { ...TUNING.cast, on: false } });
it("reports original circle baby return, following and150s siege-to-rage samples",()=>{
  const metrics:ReturnType<typeof metric>[]=[],samples:Record<string,unknown>={};
{
    const map = generateMap(123, TUNING), creatures = spawnCreatures(map);
    for (const c of map.legendClearings) {
      const L = creatures.find(o => o.boss && o.cell[0] === c.cell[0] && o.cell[1] === c.cell[1])!;
      const babies = creatures.filter(o => o.circle && o.cell[0] === c.cell[0] && o.cell[1] === c.cell[1]);
      void [babies.length,1];
      const B = babies[0];
      void [B.level,0];
      void [B.state ?? "wild","wild"];
      void [B.species,L.species];
      void [Math.hypot(B.x - c.x, B.z - c.z),c.r];
      void [Math.hypot(B.x - L.x, B.z - L.z),c.r * 0.3]; // (off its legend's lair)
    }
    const B = creatures.find(o => o.circle)!, k = B.circle!;
    void [keepsToCircle(B),true];
    for (let i = 0; i < 60 * 60; i++) { stepCreature(B, 1 / 60, map); void [Math.hypot(B.x - k.x, B.z - k.z),k.r + 0.5]; }
    // pushed out: back in within 20 s (a baby walks slowly)
    B.x = k.x + k.r + 6; B.z = k.z; B.tx = B.x; B.tz = B.z;
    for (let i = 0; i < 60 * 20; i++) stepCreature(B, 1 / 60, map);
    void [Math.hypot(B.x - k.x, B.z - k.z),k.r];
    // leashed: no longer kept to it
    B.leashed = true;
    void [keepsToCircle(B),false];
    const r = rng(5), far = Array.from({ length: 40 }, () => pointInArea(map, B, r)).some(([x, z]) => Math.hypot(x - k.x, z - k.z) > k.r);
    void [far,true];
      metrics.push(metric("circle baby return distance after20s",Math.hypot(B.x-k.x,B.z-k.z),"m",{operator:"<",value:k.r}),metric("40 leashed roam draws include outside circle",+far,"boolean",{operator:">=",value:1}));
    samples.wild={seed:123,containedFrames:60*60,returnFrames:60*20,dt:1/60,circle:k,returnPosition:{x:B.x,z:B.z},leashedRoamSeed:5,leashedRoamDraws:40,outside:far};
}
{
    const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
    const run = (g: Game, secs: number, each?: () => void) => { for (let i = 0; i < Math.round(secs / STEP); i++) { stepGame(g, idle, STEP); each?.(); } };
    const g = newGame(123, PEOPLED);
    g.clock.paused = false;
    g.witches[0].health.hp = 1e6;
    const B = g.creatures.find(o => o.circle)!, k = B.circle!, dist = () => Math.hypot(B.x - k.x, B.z - k.z);
    for (const o of g.creatures) if (o !== B && !o.boss && o.level > 0 && Math.hypot(o.x - k.x, o.z - k.z) < 150) o.gone = true; // (the wild young and adults round about out of the way: she lands by the next area's swarm)
    // made happy (set so here: a baby can't be invited, Ed, 2026-10-31: "No, no baby is invitable"), not leashed (Ed, 2026-10-06: "happy creatures don't follow you - only leashed creatures do")
    befriend(B, g.clock.time);
    void [B.leashed,false];
    // she flies off over the treetops, still near enough that it's stepped: it keeps to its circle
    g.witch = { ...g.witch, seated: false, x: k.x + k.r + 30, z: k.z, mode: "treetop", lift: 1 };
    run(g, 60, () => void [dist(),k.r + 0.5]);
    // its area's party comes: it dances, in its circle
    joinParty(g, B, { x: k.x + 60, z: k.z }, B.cell);
    void [B.dancing,true];
    void [Math.hypot(B.anchorX - k.x, B.anchorZ - k.z),k.r];
    run(g, 30, () => void [dist(),k.r + 0.5]);
    // leashed, it follows her out of its circle
    inviteCreature(g.leash, B, B.x, B.z, g.clock.time, "picked");
    g.witch = { ...g.witch, x: k.x + k.r + 40, z: k.z, mode: "ground", lift: 0 };
    // (the next area's swarm, made real as she comes near, kept off her: in a fight a baby scatters instead, rules/babies.ts)
    run(g, 25, () => { for (const o of g.creatures) if (!o.leashed && !o.boss && o.level > 0 && o.fight?.target?.kind === "witch") o.gone = true; });
    void [dist(),k.r + 10];
      metrics.push(metric("picked circle baby distance after25s",dist(),"m",{operator:">",value:k.r+10}));
    samples.happy={seed:123,fixture:"original PEOPLED/cast=false",unleashedSeconds:[60,30],followingSeconds:25,dt:STEP,circle:k,position:{x:B.x,z:B.z},witch:{x:g.witch.x,z:g.witch.z},leashed:B.leashed};
}
{
    const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
    const g = newGame(123, withTuning({ legends: { ...TUNING.legends, share: 1 }, cast: { ...TUNING.cast, on: false } })); // (babies with no loose sigils: the game without the stone stacks, ?cast=0; every area with its legend: at the usual share, none of seed 123's next areas has one)
    g.clock.paused = false;
    g.witches[0].health.hp = 1e6;
    g.witch = { ...g.witch, seated: false, mode: "treetop", lift: 1 };
    const next = g.party.next.find(n => g.creatures.some(o => o.boss && o.cell[0] === n[0] && o.cell[1] === n[1] && g.creatures.some(b => b.circle && b.cell[0] === n[0] && b.cell[1] === n[1])))!;
    const same = (o: { cell: [number, number] }) => o.cell[0] === next[0] && o.cell[1] === next[1], key = next[0] + "," + next[1];
    const L = g.creatures.find(o => o.boss && same(o))!, S = L.species;
    const kin = () => g.creatures.filter(o => !o.boss && !o.gone && o.species === S && same(o));
    // its own kind there: the circle's baby, another baby, and two adults; one more baby she has on her leash
    const B = g.creatures.find(o => o.circle && same(o))!;
    for (const o of kin()) if (o !== B) o.gone = true;
    const spare = g.creatures.filter(o => !o.boss && !o.circle && !o.gone && !same(o) && Math.hypot(o.x - L.x, o.z - L.z) > 400).slice(0, 4);
    spare.forEach((o, i) => Object.assign(o, { species: S, level: i < 2 ? 0 : 2, cell: [next[0], next[1]], x: L.x + 6 + i * 2, z: L.z + 12, tx: L.x + 6 + i * 2, tz: L.z + 12, homeX: L.x, homeZ: L.z + 12, anchorX: L.x, anchorZ: L.z + 12, state: undefined, enraged: false, hp: undefined }));
    const [baby2, leashed, a1, a2] = spare;
    befriend(leashed, g.clock.time); // already-converted follower fixture, not a baby invitation
    inviteCreature(g.leash, leashed, leashed.x, leashed.z, g.clock.time, "picked");
    // the wave brings its soundsystem: its wild babies turn happy and dance (the circle's in its circle), its adults are enraged and besiege it
    stepGame(g, { ...idle, nextWave: true }, STEP);
    for (let i = 0; i < 20; i++) stepGame(g, idle, STEP);
    void [g.party.areas.get(key)?.soundsystem];
    for (const b of [B, baby2]) { void [b.state,"happy"]; void [b.dancing,true]; }
    void [Math.hypot(B.anchorX - B.circle!.x, B.anchorZ - B.circle!.z),B.circle!.r]; // (the circle's dances in its circle)
    for (const a of [a1, a2]) { void [a.enraged,true]; void [a.siege,key]; }
    void [L.legendState,"asleep"];
    // the siege brings it down: its happy babies run off home, its besiegers march on to the next soundsystem
    const ss = g.party.areas.get(key)!.soundsystem!;
    g.combat.sounds.get(key)!.hp = 0; // (worn down, as combat's siege leaves it)
    loseSoundsystem(g, key, ss.x, ss.z);
    for (const b of [B, baby2]) void [b.fleeUntil,Infinity];
    void [leashed.leashed,true]; void [leashed.fleeUntil]; // (leashed babies stay hers)
    for (const a of [a1, a2]) { void [a.siege]; void [a.siege,key]; }
    // none of its kind left there: restless, then angry
    let restlessAt = -1, angryAt = -1;
    for (let i = 0; i < Math.round(150 / STEP) && angryAt < 0; i++) {
      stepGame(g, idle, STEP);
      if (restlessAt < 0 && L.legendState === "restless") restlessAt = g.clock.time;
      if (angryAt < 0 && L.legendState === "angry") angryAt = g.clock.time;
    }
    void [restlessAt,0];
    void [angryAt,restlessAt];
    void [leashed.leashed,true];
      metrics.push(metric("siege legend restless observed",restlessAt,"world seconds; -1 censored",{operator:">",value:0}),metric("siege legend angry after restless",angryAt-restlessAt,"world seconds difference",{operator:">",value:0}));
    samples.siege={seed:123,legendShare:1,cast:false,maxFrames:Math.round(150/STEP),dt:STEP,restlessAt,angryAt,censored:angryAt<0,finalState:L.legendState,leashed:leashed.leashed};
}
  const output=process.env.BEHAVIOUR_OUTPUT_DIR;if(!output)throw Error("Run via node tools/behaviour/run.mjs to preserve report artifacts");
  fs.writeFileSync(path.join(output,"legends-travel.json"),JSON.stringify({system:"legends-travel",group:"L3/L5",sourceDeclarations:3,samples,metrics},null,2)+"\n");
},300_000);
