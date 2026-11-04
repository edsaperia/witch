// Original L3/L5 samples; outcome references are informational, not release gates.
import fs from "node:fs";
import path from "node:path";
import {it} from "vitest";
import {metric} from "./results.mjs";
import {generateMap} from "../../src/rules/map";
import {TUNING,withTuning} from "../../src/rules/tuning";
import {Forest,legendGrove} from "../../src/rules/forest";
it("reports original grove, rim coverage and five-seed stone-gap samples",()=>{
  const metrics:ReturnType<typeof metric>[]=[],samples:Record<string,unknown>={};
{
    // (half the areas with legends, as when this was written: enough clearings to average the grove's shape over, whatever legends.share)
    const map = generateMap(123, withTuning({ legends: { ...TUNING.legends, share: 0.5 } })), forest = new Forest(map), G = TUNING.legendClearing.grove, bins = 6, w = G.reach / bins;
    const sum = new Array(bins + 1).fill(0), n = new Array(bins + 1).fill(0);
    for (const lc of map.legendClearings) {
      for (const p of forest.treesNear(lc.x, lc.z, lc.r + 1.5 + G.reach + w)) {
        const d = Math.hypot(p.x - lc.x, p.z - lc.z), out = d - lc.r - 1.5, s = p.grove ?? 0, g0 = legendGrove(map, p.x, p.z);
        if (out < 0) continue;
        // each tree's strength is the grove's here, jittered by at most G.jitter either way
        void [s,Math.min(1, g0 * (1 + G.jitter)) + 0.011];
        if (g0 * (1 - G.jitter) > 0.03) void [s,g0 * (1 - G.jitter) - 0.011];
        if ((p.z - lc.z) / d > Math.cos((G.gap * Math.PI) / 180)) continue;
        const k = Math.min(bins, Math.floor(out / w));
        sum[k] += s; n[k]++;
      }
    }
    const mean = sum.map((v, k) => v / Math.max(1, n[k]));
    // strong at the edge, gone past its reach (but for another clearing's near by), and easing down step by step between (no wall, no cliff)
    void [mean[0],0.6];
    void [mean[bins],0.08];
    for (let k = 1; k <= bins; k++) { void [mean[k],mean[k - 1]]; void [mean[k - 1] - mean[k],0.4]; }
    // and thicker near it than out where the area's own forest stands (per metre of ring)
    const perArea = (k: number) => n[k] / (k + 0.5);
    void [perArea(0),perArea(bins) * 0.9];
      metrics.push(metric("grove edge mean",mean[0],"strength",{operator:">",value:0.6}),metric("grove past-reach mean",mean[bins],"strength",{operator:"<",value:0.08}));
    for(let k=1;k<=bins;k++)metrics.push(metric("grove mean decrease bin"+k,mean[k-1]-mean[k],"strength",{operator:">",value:0}),metric("grove mean step bin"+k,mean[k-1]-mean[k],"strength",{operator:"<",value:0.4}));
    metrics.push(metric("grove edge density",perArea(0),"count/ring index",{operator:">",value:perArea(bins)*0.9}));
    samples.grove={seed:123,legendShare:0.5,bins,width:w,sum,n,mean,edgeDensity:perArea(0),outerDensity:perArea(bins)};
}
{
    const map = generateMap(123, TUNING), forest = new Forest(map), R = TUNING.legendClearing.rim;
    let edged = 0, south = 0;
    for (const lc of map.legendClearings) {
      const mine = forest.rimNear(lc.x, lc.z, lc.r + R.out + R.spread + 1).filter(p => Math.abs(Math.hypot(p.x - lc.x, p.z - lc.z) - lc.r - R.out - R.spread / 2) <= R.spread / 2 + 1e-6);
      for (const p of mine) {
        const d = Math.hypot(p.x - lc.x, p.z - lc.z);
        void [d,lc.r + R.out - 1e-6];
        void [(p.z - lc.z) / d,Math.cos((R.gap * Math.PI) / 180) + 1e-6];
        void [map.paths.at(p.x, p.z, 1.5)];
        void [p.type,map.typeOf(lc.cell[0], lc.cell[1])];
      }
      if (mine.length >= Math.round((2 * Math.PI * lc.r) / R.spacing) * R.chance * 0.5) edged++;
      if (mine.some(p => (p.z - lc.z) / Math.hypot(p.x - lc.x, p.z - lc.z) > Math.cos(Math.PI / 12))) south++; // (within 15 degrees of due south)
    }
    void [edged,map.legendClearings.length * 0.8];
    void [south,map.legendClearings.length * 0.8];
      metrics.push(metric("legend rim edged share",edged/map.legendClearings.length,"share",{operator:">",value:0.8}),metric("legend rim south share",south/map.legendClearings.length,"share",{operator:">",value:0.8}));
    samples.rim={seed:123,clearings:map.legendClearings.length,edged,south,tuning:R};
}
{
    const D = TUNING.legendClearing.minFromStone;
    let n = 0, near = 0;
    for (const seed of [1, 42, 123, 2024, 90210]) {
      const map = generateMap(seed, TUNING);
      for (const c of map.legendClearings) {
        const s = map.soundsystemSpot(c.cell[0], c.cell[1]), d = Math.hypot(c.x - s.x, c.z - s.z) - c.r;
        n++;
        if (d < D - 1e-6) near++;
        void [d,10]; // (never on the stone's own clearing)
      }
    }
    void [near / n,0.015]; // (5 of 465 on these seeds since the island's paths changed with its coast, 2026-10-11)
      metrics.push(metric("legend stone-gap exception share",near/n,"share",{operator:"<",value:0.015}));
    samples.stones={seeds:[1,42,123,2024,90210],minFromStone:D,clearings:n,near};
}
  const output=process.env.BEHAVIOUR_OUTPUT_DIR;if(!output)throw Error("Run via node tools/behaviour/run.mjs to preserve report artifacts");
  fs.writeFileSync(path.join(output,"legends-scenery.json"),JSON.stringify({system:"legends-scenery",group:"L3/L5",sourceDeclarations:3,samples,metrics},null,2)+"\n");
});
