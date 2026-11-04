import type { Game } from "../../rules/game";
import type { View } from "../../render/view";
import type { WitchLookLease } from "../../render/witchLookLease";
import { appearance, type Appearance } from "./appearance";
import { otherWitches } from "./otherWitches";
import { remoteWornLook } from "../../render/remoteWitch";

/** Page-instance art ownership: validated profiles in, bounded leases out; no local atlas replacement. */
export function remoteAppearance(view: Pick<View, "assets">, draw: (game: Game, player: number, looks: ReadonlyMap<number, WitchLookLease>, profiles: ReadonlyMap<number, Appearance>) => () => void) {
  const profiles = new Map<number, Appearance>(), leases = new Map<number, WitchLookLease>();
  const loading = new Map<number, { json: string; promise: Promise<void> }>();
  const requested = new Map<number, string>();
  let source: Game | null = null, local = 0, epoch = 0, controller = new AbortController(), removeDraw = () => {}, removeAbort = () => {};
  const clear = (forgetProfiles = true) => {
    epoch++; removeDraw(); removeDraw = () => {}; removeAbort(); removeAbort = () => {}; controller.abort();
    for (const lease of leases.values()) lease.release(); leases.clear(); loading.clear(); requested.clear(); source = null;
    if (forgetProfiles) profiles.clear();
  };
  const load = (player: number): Promise<void> => {
    if (!source || player === local) return Promise.resolve();
    const approved = profiles.get(player); if (!approved) return Promise.reject(new Error("The other witch's appearance isn't ready."));
    const W = source.witches.find(w => w.id === player);
    const genome = W?.body && W.hat ? remoteWornLook(source, W, approved) : approved;
    const json = JSON.stringify(genome), pending = loading.get(player); if (pending?.json === json) return pending.promise;
    requested.set(player, json);
    const generation = epoch;
    const promise = view.assets.leaseWitchLook(genome, controller.signal).then(lease => {
      if (generation !== epoch || requested.get(player) !== json) { lease.release(); return; }
      leases.get(player)?.release(); leases.set(player, lease);
    }).catch(error => { if (generation === epoch && requested.get(player) === json) throw error; });
    loading.set(player, { json, promise }); return promise;
  };
  return {
    has(player: number) { return profiles.has(player); },
    refresh(): Promise<void> { return source ? Promise.all(source.witches.filter(w => w.id !== local).map(w => load(w.id))).then(() => {}) : Promise.resolve(); },
    look(player: 0 | 1, value: unknown): Promise<void> {
      const genome = appearance(value); if (!genome) return Promise.reject(new Error("Invalid remote witch appearance."));
      profiles.set(player, genome); return load(player);
    },
    async start(game: Game, player: 0 | 1, signal?: AbortSignal): Promise<void> {
      signal?.throwIfAborted();
      if (source !== game || local !== player) {
        clear(false); controller = new AbortController(); source = game; local = player;
        const abort = () => clear(); signal?.addEventListener("abort", abort, { once: true }); removeAbort = () => signal?.removeEventListener("abort", abort);
        removeDraw = draw(game, player, leases, profiles);
      }
      await Promise.all(game.witches.filter(w => w.id !== player).map(w => load(w.id)));
      signal?.throwIfAborted();
    },
    clear,
  };
}
export const remoteWitchAppearance = (view: View) => remoteAppearance(view, (game, player, looks, profiles) => otherWitches(view, game, player, looks, profiles));
