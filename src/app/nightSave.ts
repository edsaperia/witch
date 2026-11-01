// A resumable night belongs to a format and a slot/path, independent of its build number.
// IndexedDB keeps the large rules snapshot off localStorage's small, synchronous quota.
import { snapshotGame, type NightSnapshot } from "../rules/nightSnapshot";
import type { Game } from "../rules/game";
import type { Loan } from "./loan";
import { settingsBase, type SettingsBase } from "./playerSettings";
import { houseLayoutIdentity } from "./houseLayout";

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

/** Suspend before adopting a borrowed game. Confirmation alone discards the interrupted solo checkpoint;
 * a failed/preparing call can resume its own game without having deleted that checkpoint. */
export function borrowedNightSaves(original: NightStore) {
  let held = false, tail = Promise.resolve(), barrier: Promise<void> | null = null, confirmation: Promise<void> | null = null;
  const queue = (action: () => Promise<void>) => {
    const operation = tail.then(action); tail = operation.catch(() => {}); return operation;
  };
  const store: NightStore = {
    read: () => held ? Promise.resolve(undefined) : original.read(),
    write: value => held ? Promise.resolve() : queue(() => held ? Promise.resolve() : original.write(value)),
    clear: () => held ? Promise.resolve() : queue(() => held ? Promise.resolve() : original.clear()),
  };
  return {
    store,
    get suspended() { return held; },
    suspendForVisit(): Promise<void> { if (!held) { held = true; barrier = tail; } return barrier ?? Promise.resolve(); },
    confirmVisit(): Promise<void> {
      if (!held) return Promise.reject(new Error("Suspend own night saves before confirming a visit."));
      return confirmation ??= (barrier ?? tail).then(() => original.clear());
    },
    /** Only after an own solo game has replaced the borrowed game. Never flush borrowed snapshots. */
    async resumeSolo(): Promise<void> {
      await (confirmation ?? barrier)?.catch(() => {}); held = false; barrier = confirmation = null;
    },
  };
}

/** Hiding the loading card also happens while she is still asleep: wait until she's up before saving. */
export function nightHasStarted(game: Pick<Game, "wake">, playStarted: boolean): boolean {
  return playStarted && (!game.wake || game.wake.open);
}

/** Debug/reproduction links never read or replace a player's night, unless explicitly requested. */
export function savesEnabled(params: URLSearchParams, automated = false): boolean {
  if (params.get("resume") === "0") return false;
  if (params.get("resume") === "1") return true;
  if (automated || params.get("creator") === "0") return false;
  return !["bot", "shot", "zoo", "arena", "debug", "compare", "set", "at", "wave", "own", "found", "tuning"].some(k => params.has(k));
}

/** An explicit link to another night keeps its meaning; a plain game link may resume any saved island. */
export function nightLinkConflicts(n: Pick<SavedNight, "params">, link: URLSearchParams): string[] {
  const p = new URLSearchParams(n.params);
  const keys = ["seed", "island", "world"].filter(key => link.has(key) && link.get(key) !== p.get(key));
  // (layout: compared by the house it selects, so a default-layout save matches a link naming that same layout: app/houseLayout.ts)
  if (link.has("layout") && houseLayoutIdentity(link) !== houseLayoutIdentity(p)) keys.push("layout");
  return keys;
}
/** Use the retained save's own identity rather than retrying the conflicting incoming link. */
export function savedNightResumeLink(n: Pick<SavedNight, "params">, path: string): string {
  const params = new URLSearchParams(n.params); params.set("resume", "1"); params.delete("restore");
  return path + "?" + params.toString();
}
export function savedNight(value: unknown, _build: string, link: URLSearchParams): SavedNight | null {
  if (!value || typeof value !== "object") return null;
  const n = value as SavedNight;
  if (n.version !== 1 || typeof n.build !== "string" || !Number.isFinite(n.at) || typeof n.params !== "string" ||
      !n.game || n.game.version !== 1 || !Number.isFinite(n.game.seed) || !n.game.tuning || !n.game.state ||
      !n.flags || typeof n.flags.chartRecorded !== "boolean" || typeof n.flags.overRecorded !== "boolean" || !n.settingsBase ||
      (n.look !== null && (!n.look || typeof n.look !== "object" || Array.isArray(n.look))) ||
      (n.loan !== null && (!n.loan || typeof n.loan !== "object" || typeof n.loan.id !== "string" || !n.loan.before))) return null;
  if (nightLinkConflicts(n, link).length) return null;
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
  private settled: Promise<void> = Promise.resolve();
  constructor(private store: NightStore, private capture: () => SavedNight | null, private failed: (error: unknown) => void) {}
  async save(now: number, force = false, allowEmpty = false): Promise<boolean> {
    if (this.busy || (!force && now - this.last < 5000)) return false;
    this.last = now; this.busy = true;
    let release!: () => void;
    this.settled = new Promise<void>(resolve => { release = resolve; });
    const generation = this.generation;
    try {
      const value = this.capture();
      if (!value) return allowEmpty;
      if (generation !== this.generation) return false;
      await this.store.write(value);
      return generation === this.generation;
    } catch (e) { this.failed(e); return false; }
    finally { this.busy = false; release(); }
  }
  /** Await an in-flight autosave, then capture the final paused state before leaving its slot. */
  async flush(now: number): Promise<boolean> { await this.settled; return this.save(now, true, true); }
  async clear(): Promise<void> {
    this.generation++;
    try { await this.store.clear(); } catch (e) { this.failed(e); }
  }
}
