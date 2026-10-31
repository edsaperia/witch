// Only precompile offers seeds. Ordinary chart visits retain random per-visit seeds.
const offered = new Map<string, number>();
let context = '';
export function resetTravelSeeds(key: string): void { if (key !== context) { offered.clear(); context = key; } }
export const offeredTravelSeed = (world: number, id: string): number | undefined => context ? offered.get(`${world}|${id}`) : undefined;
export function rememberTravelSeed(world: number, id: string, seed: number): void { if (context && !offered.has(`${world}|${id}`)) offered.set(`${world}|${id}`, seed); }
export function offerTravelSeed(world: number, id: string): number {
  const key = `${world}|${id}`;
  let seed = offered.get(key); if (seed === undefined) { seed = Math.floor(Math.random() * 1000000); offered.set(key, seed); }
  return seed;
}
