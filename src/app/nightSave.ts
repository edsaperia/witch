// A resumable night belongs to this build and this game's URL path (PR previews stay separate).
// IndexedDB keeps the large rules snapshot off localStorage's small, synchronous quota.
import { snapshotGame, type NightSnapshot } from "../rules/nightSnapshot";
import type { Game } from "../rules/game";
import type { Loan } from "./loan";
import { settingsBase, type SettingsBase } from "./playerSettings";

export interface SavedNight {
  version: 1;
  build: string;
  at: number;
  params: string;
  look: Record<string, unknown> | null;
  loan: Loan | null;
  flags: { chartRecorded: boolean; overRecorded: boolean };
  game: NightSnapshot;
  settingsBase: SettingsBase;
}
export interface NightStore {
  read(): Promise<unknown>;
  write(value: SavedNight): Promise<void>;
  clear(): Promise<void>;
}

/** Hiding the loading card also happens while she is still asleep: wait until she's up before saving. */
export function nightHasStarted(game: Pick<Game, "wake">, startScreenHidden: boolean): boolean {
  return startScreenHidden && (!game.wake || game.wake.open);
}

/** Debug/reproduction links never read or replace a player's night, unless explicitly requested. */
export function savesEnabled(params: URLSearchParams, automated = false): boolean {
  if (params.get("resume") === "0") return false;
  if (params.get("resume") === "1") return true;
  if (automated || params.get("creator") === "0") return false;
  return !["bot", "shot", "zoo", "arena", "debug", "compare", "set", "at", "wave", "own", "found", "tuning"].some(k => params.has(k));
}

/** An explicit link to another night keeps its meaning; a plain game link may resume any saved island. */
export function savedNight(value: unknown, build: string, link: URLSearchParams): SavedNight | null {
  if (!value || typeof value !== "object") return null;
  const n = value as SavedNight;
  if (n.version !== 1 || n.build !== build || !Number.isFinite(n.at) || typeof n.params !== "string" ||
      !n.game || n.game.version !== 1 || !Number.isFinite(n.game.seed) || !n.game.tuning || !n.game.state ||
      !n.flags || typeof n.flags.chartRecorded !== "boolean" || typeof n.flags.overRecorded !== "boolean" || !n.settingsBase ||
      (n.look !== null && (!n.look || typeof n.look !== "object" || Array.isArray(n.look))) ||
      (n.loan !== null && (!n.loan || typeof n.loan !== "object" || typeof n.loan.id !== "string" || !n.loan.before))) return null;
  const p = new URLSearchParams(n.params);
  for (const key of ["seed", "island", "world"]) if (link.has(key) && link.get(key) !== p.get(key)) return null;
  return n;
}

export function captureNight(game: Game, context: Omit<SavedNight, "version" | "at" | "game" | "settingsBase">, at = Date.now()): SavedNight {
  // Clone page state too: an asynchronous IDB write must describe one instant, not a later edited outfit.
  const base = settingsBase(game.tuning);
  if (!base) throw new Error("Settings aren't ready to save yet.");
  return { ...structuredClone(context), version: 1, at, game: snapshotGame(game), settingsBase: base };
}

export function browserNightStore(path: string, factory: IDBFactory = indexedDB): NightStore {
  let opened: Promise<IDBDatabase> | null = null;
  const db = () => (opened ??= new Promise<IDBDatabase>((resolve, reject) => {
    const r = factory.open("witch.nights", 1);
    r.onupgradeneeded = () => r.result.createObjectStore("nights");
    r.onerror = () => reject(r.error);
    r.onblocked = () => reject(new Error("Night storage is busy in another tab."));
    r.onsuccess = () => { r.result.onversionchange = () => { r.result.close(); opened = null; }; resolve(r.result); };
  }));
  // Keep writes and clears ordered, including when the old night ends while a write is pending.
  let queue: Promise<unknown> = Promise.resolve();
  function run<T>(mode: IDBTransactionMode, action: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
    const next = queue.catch(() => undefined).then(async () => {
      const d = await db();
      return new Promise<T>((resolve, reject) => {
        const tx = d.transaction("nights", mode), r = action(tx.objectStore("nights"));
        tx.oncomplete = () => resolve(r.result);
        tx.onerror = tx.onabort = () => reject(tx.error ?? r.error ?? new Error("The night could not be saved."));
      });
    });
    queue = next;
    return next;
  }
  return {
    read: () => run("readonly", s => s.get(path)),
    write: async value => { await run("readwrite", s => s.put(value, path)); },
    clear: async () => { await run("readwrite", s => s.delete(path)); },
  };
}

/** Throttled saves, with a final best-effort transaction on pagehide/visibilitychange. */
export class NightAutosave {
  private last = -Infinity;
  private busy = false;
  private generation = 0;
  constructor(private store: NightStore, private capture: () => SavedNight | null, private failed: (error: unknown) => void) {}
  async save(now: number, force = false): Promise<boolean> {
    if (this.busy || (!force && now - this.last < 5000)) return false;
    this.last = now; this.busy = true;
    const generation = this.generation;
    try {
      const value = this.capture();
      if (!value || generation !== this.generation) return false;
      await this.store.write(value);
      return generation === this.generation;
    } catch (e) { this.failed(e); return false; }
    finally { this.busy = false; }
  }
  async clear(): Promise<void> {
    this.generation++;
    try { await this.store.clear(); } catch (e) { this.failed(e); }
  }
}
