// Original L3/L5 samples; outcome references are informational, not release gates.
import fs from "node:fs";
import path from "node:path";
import {it} from "vitest";
import {metric} from "./results.mjs";
import {AREA_TYPES,generateMap} from "../../src/rules/map";
import {spawnCreatures} from "../../src/rules/creatures";
import {cellKey,routeOf} from "../../src/rules/party";
import {TUNING,withTuning} from "../../src/rules/tuning";
  /** Each legend's distance (in areas) to the nearest area of the kind it dreams of, and its quest's far. */
  // (half the areas with legends, as when this was written: enough dreams to see the spread, whatever legends.share, Ed 2026-10-08)
  const dists = (questCap: number, seed = 8919) => {
    const map = generateMap(seed, withTuning({ legends: { ...TUNING.legends, questCap, questLater: false, share: 0.5 } })), out: { d: number; far: number }[] = [];
    for (const L of spawnCreatures(map).filter(c => c.boss && c.quest)) {
      const s = map.siteOf(L.cell[0], L.cell[1]);
      out.push({ far: L.quest!.far!, d: Math.min(...map.cells.filter(([cx, cy]) => !(cx === map.centreCell[0] && cy === map.centreCell[1]) && AREA_TYPES[map.typeOf(cx, cy)].creature === L.quest!.species).map(([cx, cy]) => { const t = map.siteOf(cx, cy); return Math.hypot(t.x - s.x, t.z - s.z); })) / map.areaSize });
    }
    return out.sort((a, b) => a.d - b.d);
  };
it("reports original capped quest spread and later-route depth comparisons",()=>{
  const metrics:ReturnType<typeof metric>[]=[],samples:Record<string,unknown>={};
{
    void [TUNING.legends.questCap,0]; // Ed, 2026-10-31: no tail cut by default.
    const cap = 6, capped = dists(cap), any = dists(0), med = (a: { d: number }[]) => a[a.length >> 1].d;
    void [capped[capped.length - 1].d,cap + 1e-9];
    void [any[any.length - 1].d,cap]; // (there was a tail to cut)
    // (the gamble kept: most dreams as far as ever; over a few maps, one map's few legends being too few to say)
    const ratios = [8919, 1, 123, 4242, 77].map(seed => med(dists(cap, seed)) / med(dists(0, seed)));
    void [ratios.reduce((a, b) => a + b, 0) / ratios.length,0.85];
    for (const q of any) { void [Number.isFinite(q.far),true]; void [q.far,0]; void [q.far,1]; }
    for (const q of capped) { void [q.far,0]; void [q.far,1]; void [q.far,q.d / cap,6]; }
    for (const L of spawnCreatures(generateMap(8919, TUNING)).filter(c => c.boss && c.quest)) void [L.quest!.species,L.species]; // (and with questLater on)
      metrics.push(metric("uncapped quest tail exceeds explicit6 cap",any[any.length-1].d,"areas",{operator:">",value:cap}),metric("five-seed capped/uncapped median-distance ratio",ratios.reduce((a,b)=>a+b,0)/ratios.length,"ratio",{operator:">",value:0.85}));
    samples.cap={seeds:[8919,1,123,4242,77],explicitCap:cap,questLater:false,legendShare:0.5,capped,uncapped:any,ratios};
}
{
    let on = 0, off = 0;
    for (const seed of [1, 123, 4242]) for (const later of [true, false]) {
      const map = generateMap(seed, withTuning({ legends: { ...TUNING.legends, questLater: later } })), order = routeOf(map).order;
      const kindAt = (k: string) => { const [x, y] = k.split(",").map(Number); return AREA_TYPES[map.typeOf(x, y)].creature; };
      for (const L of spawnCreatures(map).filter(c => c.boss && c.quest)) {
        const i = order.indexOf(cellKey(L.cell)), j = order.findIndex((k, n) => n > i && kindAt(k) === L.quest!.species);
        const pos = j >= 0 ? j : order.findIndex(k => kindAt(k) === L.quest!.species);
        if (later) on += pos - i; else off += pos - i;
      }
    }
    void [on,off];
      metrics.push(metric("later minus old quest summed route depth",on-off,"route steps",{operator:">",value:0}));
    samples.later={seeds:[1,123,4242],settings:[true,false],on,off};
}
  const output=process.env.BEHAVIOUR_OUTPUT_DIR;if(!output)throw Error("Run via node tools/behaviour/run.mjs to preserve report artifacts");
  fs.writeFileSync(path.join(output,"legends-quests.json"),JSON.stringify({system:"legends-quests",group:"L3/L5",sourceDeclarations:2,samples,metrics},null,2)+"\n");
},180_000);
