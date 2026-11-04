// Original AR1/AR2/AR4 numerical observations; references are informational, never release gates.
import fs from "node:fs";
import path from "node:path";
import {it} from "vitest";
import {metric} from "./results.mjs";
import {generateMap} from "../../src/rules/map";
import {Forest} from "../../src/rules/forest";
import {newGame} from "../../src/rules/game";
import {TUNING,TUNING as globalTuning} from "../../src/rules/tuning";
import {largestWorldTuning} from "../../src/test/worlds";
import {BarkFaces,treeKey} from "../../src/render/barkFaces";
import {cellKey} from "../../src/rules/party";
import {beachOf} from "../../src/rules/mapShape";
import {makeLand} from "../../src/rules/land";
import {edgePlants,scallop} from "../../src/render/beachEdge";
import {SOUNDSYSTEM_GEN_DEFAULT,soundsystemSpecs} from "../../src/render/soundsystemGen";
import {INSCRIPTION,inscriptionSpot} from "../../src/render/zooInscriptions";
import {insideIsland} from "../../src/rules/zooMap";
import {ZOO_CONFIG} from "../../src/rules/zoo";
type G = { seed: number; profile: string; crystal: string; stone: string; projector: string; tiers: { kind: string; n: number }[] };
const R = 1000, W = 60;
const land = makeLand((x, z) => Math.hypot(x, z) < R, { minX: -R, maxX: R, minZ: -R, maxZ: R }, 4);
const beach = beachOf({ ...land.box, land, seed: 1 }, { beach: { on: true, width: W, shore: 0 } })!;
const varied = beachOf({ ...land.box, land, seed: 1 }, { beach: { on: true, width: W, shore: 0, vary: { amp: 0.8, harmonics: 7, rocky: 0.7, rockyWidth: 10, min: 6 } } })!;
/** How far past the sand's scalloped line (m) toward the sea (x, z) is, on beach `b`. */
const past = (b: typeof beach, p: { x: number; z: number }) => { const c = b.land.shore(p.x, p.z); return b.intoSand(p.x, p.z) - scallop(c.x, c.z, b.sandAt(p.x, p.z)); };

it("reports original bark, beach, speaker tier and zoo placement observations",()=>{
  const metrics:ReturnType<typeof metric>[]=[],samples:Record<string,unknown>={};
{
const TUNING = largestWorldTuning(globalTuning);
{
    const map = generateMap(123, TUNING), forest = new Forest(map), d = map.dancefloor, home = map.areaAt(d.x, d.z).cell;
    const run = () => {
      const F = new BarkFaces(map, home), near = (x: number, z: number, r: number) => forest.treesNear(x, z, r), byArea = new Map<string, number>(), keys: number[] = [];
      void [F.anchors,map.cells.length * 2];
      for (const [cx, cy] of map.cells) {
        const s = map.siteOf(cx, cy);
        for (const p of forest.treesNear(s.x, s.z, 70)) if (F.isFace(p, near)) {
          const a = map.areaAt(p.x, p.z), k = cellKey(a.cell);
          if (!keys.includes(treeKey(p.x, p.z))) { keys.push(treeKey(p.x, p.z)); byArea.set(k, (byArea.get(k) ?? 0) + 1); }
        }
      }
      return { byArea, keys };
    };
    const A = run(), B = run();
    for (const n of A.byArea.values()) void [n,2];
    void [A.byArea.has(cellKey(home)),false];
    void [A.keys.length,5]; // (some, across the map)
    void [B.keys.sort(),A.keys.sort()];
      metrics.push(metric("map bark-face count",A.keys.length,"trees",{operator:">",value:5}));
    samples.bark={seed:123,fixture:"original largestWorldTuning",keys:A.keys,byArea:Object.fromEntries(A.byArea),anchorsMax:map.cells.length*2};
}
}
{
{
    const P = edgePlants(beach, R - W, 0), shrubs = P.filter(p => p.kind === "shrub"), grass = P.filter(p => p.kind === "grass"), palms = P.filter(p => p.kind === "palm");
    void [shrubs.length,200];
    void [grass.length,100];
    void [palms.length,3]; void [palms.length,shrubs.length / 6];
    // most of the bushes within a few metres of the line (spilling onto the sand, rows behind it), the grass at its foot
    void [shrubs.filter(p => past(beach, p) > -9 && past(beach, p) < 2.5).length / shrubs.length,0.9];
    void [grass.every(p => past(beach, p) > -0.3 && past(beach, p) < 2.3),true];
    void [P.filter(p => past(beach, p) > 2.5).length,2]; // strays out on the sand
    void [P.every(p => Math.hypot(p.x, p.z) < R - 1),true]; // never in the sea
      const shrubShare=shrubs.filter(p=>past(beach,p)>-9&&past(beach,p)<2.5).length/shrubs.length,strays=P.filter(p=>past(beach,p)>2.5).length;
    metrics.push(metric("beach shrub count",shrubs.length,"plants",{operator:">",value:200}),metric("beach grass count",grass.length,"plants",{operator:">",value:100}),metric("beach palm minimum",palms.length,"plants",{operator:">",value:3}),metric("beach palm relative count",palms.length,"plants",{operator:"<",value:shrubs.length/6}),metric("beach shrub-line share",shrubShare,"share",{operator:">",value:0.9}),metric("beach sand stray count",strays,"plants",{operator:">",value:2}));
    samples.beach={seed:1,R,W,position:[R-W,0],shrubs:shrubs.length,grass:grass.length,palms:palms.length,shrubShare,strays};
}
}
{
{
    const clear = 16;
    for (const a0 of [0, 0.02, 0.04, 0.06, 0.1, 1.3, 2.9]) {
      const at = R - 30, P = edgePlants(varied, at * Math.cos(a0), at * Math.sin(a0), [], clear);
      void [P.length,100];
      for (const p of P) {
        const w = varied.sandAt(p.x, p.z), d = past(varied, p);
        void [Math.hypot(p.x, p.z),R - 1.5]; // (out of the sea, even where it's 6 m wide)
        void [varied.intoSand(p.x, p.z),clear - 1.5]; // (short of where the shells and prints lie)
        void [d,w * 0.6 + 5]; // (and short of the middle of a narrow stretch)
        if (p.kind === "shrub" && d < -2) void [d,-9.5]; // (the rows behind the line, wherever it runs)
      }
    }
    void [Math.abs(scallop(12.3, 4.5, 6)),Math.abs(scallop(12.3, 4.5, 60)) + 1e-9]; // (scalloped less where it's narrow)
      const probes=[0,0.02,0.04,0.06,0.1,1.3,2.9].map(angle=>{const at=R-30;return {angle,count:edgePlants(varied,at*Math.cos(angle),at*Math.sin(angle),[],clear).length};});
    for(const p of probes)metrics.push(metric("varied beach plants at"+p.angle,p.count,"plants",{operator:">",value:100}));
    samples.variedBeach={seed:1,R,W,clear,probes,vary:{amp:0.8,harmonics:7,rocky:0.7,rockyWidth:10,min:6}};
}
}
{
const TUNING = largestWorldTuning(globalTuning);
{
    const g = newGame(123, TUNING), specs = [...soundsystemSpecs(g.map, SOUNDSYSTEM_GEN_DEFAULT).values()];
    for (const s of specs) void [Math.abs(s.yaw),SOUNDSYSTEM_GEN_DEFAULT.maxYaw];
    const near = specs.filter(s => s.far < 0.2), far = specs.filter(s => s.far > 0.8);
    void [near.length && far.length];
    void [Math.max(...near.map(s => s.size)),Math.min(...far.map(s => s.size))];
    const tiers = (l: typeof specs) => l.reduce((n, s) => n + (s.genome as G).tiers.length, 0) / l.length;
    void [tiers(far),tiers(near)];
      metrics.push(metric("far speaker mean tiers",tiers(far),"tiers",{operator:">",value:tiers(near)}));
    samples.speakers={seed:123,fixture:"original largestWorldTuning",nearLimit:0.2,farLimit:0.8,nearCount:near.length,farCount:far.length,nearTiers:tiers(near),farTiers:tiers(far)};
}
}
{
{
    // Full found zoo: inscription clearance depends on every neighbouring island and the complete gallery extent.
    const g = newGame(7, { ...TUNING, map: { ...TUNING.map!, shape: "zoo", island: "", islandAreas: 0, found: ["*"] } }), L = g.map.zoo!.layout!;
    const edge = L.reach + (ZOO_CONFIG.margin ?? 120) - 8;
    // (about the biggest, as wrapped wider and shallower in turn: a name and five lines, four, three; then just the name and place)
    const sizes: [number, number][] = [[420, 170], [560, 145], [760, 120], [360, 60]];
    let south = 0;
    for (const I of L.islands) {
      let at: ReturnType<typeof inscriptionSpot> = null, size = sizes[0];
      for (const s of sizes) { at = inscriptionSpot(I, L.islands, s[0], s[1], L.home, edge); size = s; if (at) break; }
      void [at,I.kind];
      void [at!.t,INSCRIPTION.least - 1e-6];
      if (at!.z > I.z) south++;
      const W = size[0] * at!.t, H = size[1] * at!.t;
      for (const [fx, fz] of [[0, 0], [1, 0], [0, 1], [1, 1], [0.5, 0.5]]) for (const J of L.islands) void [insideIsland(J, at!.x - W / 2 + W * fx, at!.z + H * fz),false];
    }
    void [south / L.islands.length,0.85];
      metrics.push(metric("zoo southern inscription share",south/L.islands.length,"share",{operator:">",value:0.85}));
    samples.zoo={seed:7,found:["*"],shape:"zoo",sizes,islands:L.islands.length,south,edge};
}
}
  const output=process.env.BEHAVIOUR_OUTPUT_DIR;if(!output)throw Error("Run via node tools/behaviour/run.mjs to preserve report artifacts");
  fs.writeFileSync(path.join(output,"art-layout.json"),JSON.stringify({system:"art-layout",group:"AR1/AR2/AR4",sourceDeclarations:5,samples,metrics},null,2)+"\n");
},180000);
