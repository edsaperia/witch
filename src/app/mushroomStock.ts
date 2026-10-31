// Campaign supplies travel with the kitchen. In-flight unloading is credited once on a night change.
import { MUSHROOM_COLOURS, emptyBaskets, type MushroomColour, type MushroomState } from '../rules/mushrooms';
type Stock = Pick<MushroomState, 'baskets' | 'carried'>;
type Store = Pick<Storage, 'getItem' | 'setItem'>;
const known = (v: unknown): v is MushroomColour => MUSHROOM_COLOURS.includes(v as MushroomColour);
export function mushroomStock(s: MushroomState): Stock {
  const baskets = { ...s.baskets }, carried = Object.fromEntries(Object.entries(s.carried).map(([id, bag]) => [id, [...bag]]));
  for (const f of s.flights) if (f.kind === 'unload') baskets[f.type]++;
  return { baskets, carried };
}
export function restoreMushroomStock(s: MushroomState, raw: unknown): void {
  if (!raw || typeof raw !== 'object') return;
  const r = raw as Partial<Stock>;
  s.baskets = emptyBaskets();
  for (const c of MUSHROOM_COLOURS) {
    const n = r.baskets?.[c];
    if (typeof n === 'number' && Number.isSafeInteger(n) && n >= 0) s.baskets[c] = n;
  }
  s.carried = {};
  if (r.carried && typeof r.carried === 'object') for (const [id, bag] of Object.entries(r.carried)) {
    if (/^\d+$/.test(id) && Array.isArray(bag)) s.carried[+id] = bag.filter(known);
  }
}
export function saveMushroomStock(s: MushroomState, world: number, storage?: Store): void {
  try { (storage ?? globalThis.localStorage)?.setItem(`witch.mushrooms.${world}`, JSON.stringify(mushroomStock(s))); } catch { /* private/blocked storage still permits in-memory travel */ }
}
export function loadMushroomStock(s: MushroomState, world: number, storage?: Store): void {
  try { restoreMushroomStock(s, JSON.parse((storage ?? globalThis.localStorage)?.getItem(`witch.mushrooms.${world}`) ?? 'null')); } catch { /* absent/corrupt storage starts empty */ }
}
