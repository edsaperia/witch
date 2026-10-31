// Only precompile offers seeds. Ordinary chart visits retain random per-visit seeds.
const offered = new Map<string, number>();
let context = '';
const charts = new Set<{world:()=>number; seeds:Map<string,number>}>();
/** A chart may have chosen/baked a seed before precompile became eligible. Never replace that seed. */
export function registerTravelSeeds(world:()=>number,seeds:Map<string,number>):()=>void {
  const chart={world,seeds}; charts.add(chart); return ()=>{charts.delete(chart);};
}
export function resetTravelSeeds(key: string): void { if (key !== context) { offered.clear(); context = key; } }
export const offeredTravelSeed = (world: number, id: string): number | undefined => context ? offered.get(`${world}|${id}`) : undefined;
export function rememberTravelSeed(world: number, id: string, seed: number): void { if (context && !offered.has(`${world}|${id}`)) offered.set(`${world}|${id}`, seed); }
export function offerTravelSeed(world: number, id: string): number {
  const key = `${world}|${id}`;
  for (const chart of charts) if (chart.world() === world && chart.seeds.has(id)) { const seed=chart.seeds.get(id)!; offered.set(key,seed); return seed; }
  let seed = offered.get(key); if (seed === undefined) { seed = Math.floor(Math.random() * 1000000); offered.set(key, seed); }
  return seed;
}
