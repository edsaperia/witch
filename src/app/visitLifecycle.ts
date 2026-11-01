import type { Game } from "../rules/game";
import type { visitSaves } from "./visitSaves";

export interface VisitLifecycleOptions<Own> {
  saves: ReturnType<typeof visitSaves>;
  own(): Own;
  adoptBorrowed(game: Game, signal: AbortSignal, advanced: () => void): Promise<void>;
  adoptOwn(own: Own, fresh: boolean): Promise<void>;
  playing(game: Game): void;
}
/** One ordinary page/View: serialize late preparation before return, never race two night replacements. */
export function visitLifecycle<Own>(options: VisitLifecycleOptions<Own>) {
  let own: Own | undefined, active = false, ending = false, synchronizationStarted = false;
  let preparing: Promise<void> = Promise.resolve(), synchronizing: Promise<void> = Promise.resolve(), returning: Promise<void> | null = null;
  return {
    prepare(game: Game, signal: AbortSignal, advanced: () => void): Promise<void> {
      if (active) return Promise.reject(new Error("A visit is already being prepared."));
      own = options.own(); active = true; ending = synchronizationStarted = false;
      preparing = (async () => {
        await options.saves.prepare(); signal.throwIfAborted();
        await options.adoptBorrowed(game, signal, advanced); signal.throwIfAborted();
      })();
      return preparing;
    },
    synchronized(game: Game): Promise<void> {
      if (synchronizationStarted) return synchronizing;
      synchronizationStarted = true;
      synchronizing = (async () => {
        await preparing;
        if (!active || ending) return;
        await options.saves.confirm();
        if (!ending) options.playing(game);
      })();
      return synchronizing;
    },
    end(): Promise<void> {
      if (!active) return Promise.resolve();
      if (returning) return returning;
      ending = true;
      returning = (async () => {
        try {
          await preparing.catch(() => {}); await synchronizing.catch(() => {});
          await options.saves.returnOwn(fresh => options.adoptOwn(own!, fresh));
          active = false; own = undefined;
        } finally { returning = null; }
      })();
      return returning;
    },
  };
}
