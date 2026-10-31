import type { ForestMap } from '../rules/map';
import { speakerRadius } from '../rules/speakers';
import { koiPonds, lakeKnobs } from '../rules/lakes';
import { groundDefines, groundExtras, groundFamily } from './groundFamily';
import { hasForcedLakeLook, lakeLooksOf } from './lakeLooks';
import {beachOf} from '../rules/mapShape';

/** The arrival flies in from the sea. Use the same coast descriptor BeachView demands. */
export const groundCoast = (map:ForestMap) => beachOf(map.bounds,map.tuning);
export const groundArrivalProgramDefines = (map:ForestMap,params=new URLSearchParams()) => groundProgramDefines(map,params,!!groundCoast(map));

/** The same plain-water selection used by the actual ground uniforms. No texture allocation. */
export function groundKoi(map: ForestMap, share: number) {
  const L = map.bounds.lakes, K = L && lakeLooksOf(map);
  if (!L || !K) return [];
  const plain = (x: number, z: number) => { const c = Math.round((x - L.x0) / L.step), r = Math.round((z - L.z0) / L.step); return c < 0 || r < 0 || c >= L.cols || r >= L.rows || K.near[r * L.cols + c] === 0; };
  return koiPonds(map.bounds, map.seed, share).filter(k => plain(k.x, k.z)).slice(0, 8);
}
export function groundPavementRadius(map: ForestMap): number {
  const t = map.tuning;
  return t.dancefloor.paving.on ? speakerRadius(t) + t.dancefloor.speakers.footprint + t.dancefloor.paving.beyond : 0;
}
/** Shared by normal ground and the map worker: only facts that affect the program, never uniforms. */
export function groundProgramDefines(map: ForestMap, params = new URLSearchParams(), beach = false): Record<string, string> {
  const forced = hasForcedLakeLook(), debug = params.has('debug') || params.get('creator') === '1', zoo = !!map.zoo?.layout;
  const extras = groundExtras({ zoo, dancefloor: !zoo && map.dancefloor.radius > 0,
    pavement: !zoo && groundPavementRadius(map) > 0, legends: map.legendClearings.length > 0,
    legendFloor: !!map.tuning.legendClearing.floor?.on, koi: groundKoi(map, lakeKnobs(map.tuning).koi).some(k => k.r > 0), bare: (map.tuning.bare ?? 0) > 1.5 }, forced || debug);
  return groundDefines(groundFamily(!!map.bounds.lakes, map.bounds.lakes ? lakeLooksOf(map)?.any ?? null : null, forced, zoo, debug), beach, extras);
}
