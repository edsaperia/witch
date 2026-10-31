// Built separately with the prepared candidate. No renderer, browser or worker is started here.
import { HOUSE_ROOMS } from '../../src/rules/houseRooms';
import { homeIsland, homeKinds, islandOf } from '../../src/rules/rosters';
import { generateMap } from '../../src/rules/map';
import { tuningFromLink } from '../../src/app/linkParams';
import { sailTuning } from '../../src/app/mapPrep';
import { emptySave, SAVE_KEY, unlocked } from '../../src/app/chartSave';
import { islandAt } from '../../src/app/chartLayout';
import { nearestGroundTargets } from '../../src/app/groundWarm';
import { applyShot } from '../../src/app/shot';
import { groundArrivalProgramDefines } from '../../src/render/groundRecipe';
import {groundProgramMaterial} from '../../src/render/ground';
import {groundShaderKey} from './ground-warm-key.mjs';
import type { Game } from '../../src/rules/game';

export function groundWarmFixture(options: { rooms?: typeof HOUSE_ROOMS.rooms; found?: string[]; seed?: number } = {}) {
  const world = 0, rooms = options.rooms ?? HOUSE_ROOMS.rooms;
  // Select an unlocked trunk room from the actual plan, never a display label used as an ID.
  const room = rooms.find(r => r.trunk && !r.locked);
  if (!room || !HOUSE_ROOMS.rooms.some(r => r.id === room.id)) throw Error('No resolvable unlocked trunk room');
  const seed = options.seed ?? homeIsland(world).seed % 1000000;
  if (!Number.isInteger(seed) || seed < 0 || seed >= 1000000) throw Error('Invalid night seed');
  const found = options.found ?? homeKinds().slice(0, 2);
  if (found.length < 2 || found.some(id => !islandOf(id, world))) throw Error('Missing reachable target data');
  const save = { ...emptySave(world), found };
  const params = new URLSearchParams({creator:'0',quick:'1',seed:String(seed),world:String(world),warmChart:'0',prepChart:'0',ladder:'off'});
  const tuning = tuningFromLink(params).tuning, map = generateMap(seed, tuning);
  // applyShot only needs map/tuning/body for these two scenes. Use its real resolver, not a duplicate.
  const game = {map,tuning,witch:{}} as Game;
  const inside = `room:${room.id}`, outside = `at:${map.start.x + 100},${map.start.z + 100}`;
  for (const shot of [inside,outside]) {
    const result = applyShot(game, shot);
    if (!result.ok || !Number.isFinite(result.x) || !Number.isFinite(result.z)) throw Error(`Unresolved shot ${shot}: ${result.say}`);
    if (shot === inside && (!game.witch.perch || game.witch.mode !== 'ground')) throw Error('Room shot is not eligible');
    if (shot === outside && game.witch.perch) throw Error('Outside shot remained perched');
  }
  const from = islandAt('home',world);
  if (!from) throw Error('Home chart position missing');
  const targets = nearestGroundTargets(unlocked(save).map(id => {
    const at = islandAt(id,world); if (!at) throw Error(`Missing chart position ${id}`);
    return {id,...at};
  }),{id:'home',...from}).map(({id}) => {
    const targetMap = generateMap(seed,sailTuning(id,world,seed));
    const defines = groundArrivalProgramDefines(targetMap);
    if (!('GROUND_SPECIALIZED' in defines)) throw Error(`Missing ground descriptor ${id}`);
    const material=groundProgramMaterial(defines,{}),shaderKey=groundShaderKey(material);material.dispose();
    return {id,seed,defines,shaderKey};
  });
  if (!targets.length) throw Error('No reachable warm targets');
  return {world,seed,random:(seed + 0.5) / 1000000,inside,outside,targets,saveKey:SAVE_KEY,save,url:`?${params}`};
}
