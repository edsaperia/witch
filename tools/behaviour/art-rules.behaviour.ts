// Original AR1/AR2/AR4 numerical observations; references are informational, never release gates.
import fs from "node:fs";
import path from "node:path";
import {it} from "vitest";
import {metric} from "./results.mjs";
import {AREA_TYPES,generateMap} from "../../src/rules/map";
import {Forest} from "../../src/rules/forest";
import {TUNING as GAME_TUNING,type Tuning} from "../../src/rules/tuning";
import {stringsFor,segmentsCross} from "../../src/rules/strings";
import {laserShow} from "../../src/rules/lasers";
import {composeFloor,floorLevel,floorPatterns,newFloor,pickPattern,stepFloor,switchOn,type FloorInputs} from "../../src/rules/dancefloor";
const TUNING: Tuning = { ...GAME_TUNING, setPieceChance: 0.25, grounds: { ...GAME_TUNING.grounds, kinds: ["playground", "tennis", "baseball", "football", "basketball"] }, decor: { ...GAME_TUNING.decor, mix: { ruins: 1, rocks: 1, freak: 1 } }, paths: { ...GAME_TUNING.paths, pieces: true }, scenes: { ...GAME_TUNING.scenes, featured: undefined } };
const map = generateMap(123,TUNING);
  const forest = new Forest(map), all = forest.lightsNear((map.bounds.minX + map.bounds.maxX) / 2, (map.bounds.minZ + map.bounds.maxZ) / 2, (map.bounds.maxX - map.bounds.minX) / 2); // (most of the map: the areas are big)
  const beat = 60 / TUNING.beat.bpm, boot = 8 * beat; // the switch-on sequence is 8 beats
  const inputs = (time: number, o: Partial<FloorInputs> = {}): FloorInputs => ({ time, seed: 7, level: 2, partifiedAreas: new Set(), witch: { x: -50, y: -50, lift: 1, rgb: [255, 238, 70] }, dancers: [], ...o });
it("reports original wet ponds, string abundance, laser duty and floor variety",()=>{
  const metrics:ReturnType<typeof metric>[]=[],samples:Record<string,unknown>={};
{
{
    const wet = new Set(["wetland", "mangrove-channel", "tundra-bog", "beaver-pond", "moor"]);
    const ponds = all.filter(l => l.kind === "pond"), inWet = ponds.filter(l => wet.has(AREA_TYPES[map.areaAt(l.x, l.z).type].id)).length;
    void [inWet / ponds.length,0.35]; // (5 of the 30 kinds: about a sixth by chance)
      metrics.push(metric("wet-area pond share",inWet/ponds.length,"share",{operator:">",value:0.35}));
    samples.ponds={seed:123,fixture:"original rules opt-in scenery tuning",wet:[...wet],ponds:ponds.length,inWet};
}
}
{
{
    const forest = new Forest(map), L = TUNING.stringLights;
    let total = 0, junctions = 0;
    for (const cell of [[map.centreCell[0] + 1, map.centreCell[1]], [map.centreCell[0], map.centreCell[1] + 1], [3, 4]] as [number, number][]) {
      const lines = stringsFor(map, forest, cell), ends = new Map<string, number>();
      total += lines.length;
      for (const l of lines) {
        const d = Math.hypot(l.ax - l.bx, l.az - l.bz);
        void [d,L.spanMin]; void [d,L.spanMax];
        void [map.areaAt(l.ax, l.az).cell,cell];
        for (const k of [`${l.ax},${l.az}`, `${l.bx},${l.bz}`]) ends.set(k, (ends.get(k) ?? 0) + 1);
      }
      for (const n of ends.values()) { void [n,3]; if (n === 3) junctions++; }
      for (let i = 0; i < lines.length; i++) for (let j = i + 1; j < lines.length; j++) {
        const a = lines[i], b = lines[j];
        void [segmentsCross([a.ax, a.az], [a.bx, a.bz], [b.ax, b.az], [b.bx, b.bz]),false];
      }
      void [stringsFor(map, new Forest(map), cell),lines];
    }
    void [total,20]; // long runs, not a handful of spans
    void [junctions,total / 4];
      metrics.push(metric("three-area string span abundance",total,"spans",{operator:">",value:20}),metric("three-area string junction count",junctions,"junctions",{operator:"<",value:total/4}));
    samples.strings={seed:123,cells:[[map.centreCell[0]+1,map.centreCell[1]],[map.centreCell[0],map.centreCell[1]+1],[3,4]],total,junctions};
}
}
{
{
    const L = TUNING.lasers;
    let on = 0, n = 0, maxJump = 0;
    for (const seed of [3, 17, 99, 1234]) {
      let last = laserShow(0, seed, 1, TUNING).on;
      for (let t = 0; t < 600; t += 1 / 60) {
        const s = laserShow(t, seed, 1, TUNING);
        void [s.count,1]; void [s.count,L.maxCount];
        void [laserShow(t, seed, 1, TUNING),s];
        maxJump = Math.max(maxJump, Math.abs(s.on - last)); last = s.on;
        if (s.on > 0.5) on++;
        n++;
      }
    }
    void [on / n,L.duty * 0.5]; void [on / n,L.duty * 1.6];
    void [maxJump,0.35];
    // Neighbours aren't in lockstep.
    let same = 0;
    for (let t = 0; t < 300; t += 0.5) if ((laserShow(t, 3, 1, TUNING).on > 0.5) === (laserShow(t, 4, 1, TUNING).on > 0.5)) same++;
    void [same / 600,0.9];
      metrics.push(metric("laser duty lower",on/n,"share",{operator:">",value:L.duty*0.5}),metric("laser duty upper",on/n,"share",{operator:"<",value:L.duty*1.6}),metric("neighbouring laser agreement",same/600,"share",{operator:"<",value:0.9}));
    samples.lasers={seeds:[3,17,99,1234],seconds:600,dt:1/60,on,n,maxJump,neighbours:[3,4],neighbourSeconds:300,neighbourDt:0.5,same,config:L};
}
}
{
{
    const f = newFloor(); switchOn(f, 0);
    const seen: number[] = [];
    for (let t = 0; t < boot + 400 * beat; t += 1 / 30) { stepFloor(f, inputs(t, { level: 4 }), TUNING); if (seen[seen.length - 1] !== f.pattern) seen.push(f.pattern); }
    void [seen.length,8];
    for (let i = 1; i < seen.length; i++) void [seen[i],seen[i - 1]];
    for (let i = 0; i < 50; i++) void [pickPattern(5, i, 4, new Set(), 3),5];
    // Low levels keep to simple patterns; an area's shape only once its area has the party.
    for (let i = 0; i < 50; i++) { const p = floorPatterns()[pickPattern(-1, i, 1, new Set(), 3)]; void [p.level,1]; void [p.kind,"area"]; }
    const area = floorPatterns().find(p => p.kind === "area")!, picks = Array.from({ length: 400 }, (_, i) => floorPatterns()[pickPattern(-1, i, 4, new Set([area.area!]), 3)]);
    void [picks.some(p => p.id === area.id),true];
      metrics.push(metric("floor changes over400 beats",seen.length,"patterns",{operator:">",value:8}),metric("eligible area pattern observed in400 picks",+picks.some(p=>p.id===area.id),"boolean",{operator:">=",value:1}));
    samples.patterns={seed:7,boot,beats:400,beat,dt:1/30,seen,area:area.id,picks:picks.map(p=>p.id)};
}
}
{
{
    void [floorLevel(1, TUNING),1];
    void [floorLevel(TUNING.dancefloor.levels[0], TUNING),2];
    void [floorLevel(999, TUNING),4];
    const lit = (level: number) => { const f = newFloor(); switchOn(f, 0); let sum = 0; for (let t = boot + 1; t < boot + 120; t += 0.5) { stepFloor(f, inputs(t, { level }), TUNING); sum += composeFloor(f, inputs(t, { level }), TUNING).lit; } return sum; };
    void [lit(4),lit(1) * 1.5];
      const low=lit(1),high=lit(4);metrics.push(metric("level4 accumulated lit tiles",high,"lit tile samples",{operator:">",value:low*1.5}));
    samples.floorLevels={seed:7,boot,from:boot+1,toExclusive:boot+120,dt:0.5,low,high};
}
}
  const output=process.env.BEHAVIOUR_OUTPUT_DIR;if(!output)throw Error("Run via node tools/behaviour/run.mjs to preserve report artifacts");
  fs.writeFileSync(path.join(output,"art-rules.json"),JSON.stringify({system:"art-rules",group:"AR1/AR2/AR4",sourceDeclarations:5,samples,metrics},null,2)+"\n");
},180000);
