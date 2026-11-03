// Every way the game keeps things on this browser goes through here: localStorage, sessionStorage and IndexedDB (tools: the
// storageScope test fails on a direct use anywhere else, the derived caches below aside).
//
// A fresh game (Ed, 2026-11-03: "can you make a link that always starts a fresh game with the latest version?"): ?fresh=1 plays as a
// brand-new player's very first morning, every time, whatever this browser holds. Its storage is a throwaway namespace of its own:
// each key under witch.fresh.<token>. in the browser's localStorage and sessionStorage, each IndexedDB database's name under it
// too, so nothing of the real saves is read and nothing written over them, and the plain link plays them as ever.
// The boot writes the token into the link (?fresh=<token>), so a reload, a sail, a night in bed or a save switch in it carries on in
// the same throwaway game (freshHref); ?fresh=1 again starts another, wiping every earlier fresh namespace first. Settings, controls,
// the pause page's choices and the telephone's identity are the namespace's too: a fresh game has the defaults and a throwaway number.
// Storage refused altogether: the fresh game keeps its things in memory, for this page.
//
// Not scoped: the derived caches (the art cache, render/artCacheStorage.ts; the chart's coasts, app/chartCache.ts; the map prep,
// app/mapPrepStore.ts). They hold only what a build and a seed make, keyed by both, written and read by the art and map workers too,
// and a fresh game reading one draws exactly what it would have made.

/** The fresh games' namespace, in each store. */
export const FRESH_PREFIX = "witch.fresh.";
/** A fresh game's token: what the boot writes into ?fresh= (never "1", which starts a new one). */
const TOKEN = /^[a-z0-9]{8}$/;

/** The link's fresh switch: "new" to begin a fresh game (?fresh=1, or any value not a token), a fresh game's token to carry it on,
 *  null for the ordinary game (no ?fresh, or ?fresh=0). */
export function freshLink(search: string): "new" | string | null {
  const v = new URLSearchParams(search).get("fresh");
  if (v === null || v === "0") return null;
  return TOKEN.test(v) ? v : "new";
}

/** The keys under `prefix` of a browser Storage, as one Storage of their own (length/key list only those). */
export class PrefixedStorage {
  constructor(private readonly real: Storage, private readonly prefix: string) {}
  private own(): string[] {
    const out: string[] = [];
    for (let i = 0; i < this.real.length; i++) { const k = this.real.key(i); if (k !== null && k.startsWith(this.prefix)) out.push(k); }
    return out;
  }
  get length(): number { return this.own().length; }
  key(i: number): string | null { const k = this.own()[i]; return k === undefined ? null : k.slice(this.prefix.length); }
  getItem(key: string): string | null { return this.real.getItem(this.prefix + key); }
  setItem(key: string, value: string): void { this.real.setItem(this.prefix + key, String(value)); }
  removeItem(key: string): void { this.real.removeItem(this.prefix + key); }
  clear(): void { for (const k of this.own()) this.real.removeItem(k); }
}

/** A Storage in this page's memory (a fresh game where the browser refuses storage). */
export class MemoryStorage {
  private readonly m = new Map<string, string>();
  get length(): number { return this.m.size; }
  key(i: number): string | null { return [...this.m.keys()][i] ?? null; }
  getItem(key: string): string | null { return this.m.get(key) ?? null; }
  setItem(key: string, value: string): void { this.m.set(key, String(value)); }
  removeItem(key: string): void { this.m.delete(key); }
  clear(): void { this.m.clear(); }
}

/** IndexedDB with every database name under `prefix`. */
export function prefixedIdb(real: IDBFactory, prefix: string): IDBFactory {
  return {
    open: (name: string, version?: number) => version === undefined ? real.open(prefix + name) : real.open(prefix + name, version),
    deleteDatabase: (name: string) => real.deleteDatabase(prefix + name),
    cmp: (a: unknown, b: unknown) => real.cmp(a, b),
    databases: async () => (await real.databases()).filter(d => d.name?.startsWith(prefix)).map(d => ({ ...d, name: d.name!.slice(prefix.length) })),
  } as IDBFactory;
}

/** Where this page keeps things. */
export interface StorageScope {
  /** the fresh game's token, or null for the ordinary game */
  readonly fresh: string | null;
  /** this page began its fresh game (?fresh=1), wiping the earlier ones */
  readonly began: boolean;
  local(): Storage | null;
  session(): Storage | null;
  idb(): IDBFactory | undefined;
}

/** What a scope is made from: the page's link and its browser's stores (each read when asked: a test's stand-ins swap them). */
export interface ScopeEnv {
  search: string;
  local(): Storage | null;
  session(): Storage | null;
  idb(): IDBFactory | undefined;
  /** a new token (tests: a fixed one) */
  token?(): string;
  /** the page's link's ?fresh= set to the new game's token */
  relink?(token: string): void;
}

const newToken = (): string => Array.from(crypto.getRandomValues(new Uint8Array(8)), b => "abcdefghijklmnopqrstuvwxyz0123456789"[b % 36]).join("");
const tryGet = <T>(f: () => T | null | undefined): T | null => { try { return f() ?? null; } catch { return null; } };

/** Every earlier fresh game's keys and databases gone (only theirs: the names under FRESH_PREFIX). */
function wipeFresh(stores: (Storage | null)[], idb: IDBFactory | null, keep: string): void {
  for (const s of stores) {
    if (!s) continue;
    try {
      const gone: string[] = [];
      for (let i = 0; i < s.length; i++) { const k = s.key(i); if (k !== null && k.startsWith(FRESH_PREFIX)) gone.push(k); }
      for (const k of gone) s.removeItem(k);
    } catch { /* storage refused: nothing to wipe */ }
  }
  // (async: this game's own databases are under a new name, so nothing waits on it)
  try {
    void idb?.databases?.().then(list => { for (const d of list) if (d.name?.startsWith(FRESH_PREFIX) && !d.name.startsWith(keep)) idb.deleteDatabase(d.name); }).catch(() => undefined);
  } catch { /* no list of databases: they stay till a browser clears them */ }
}

export function makeStorageScope(env: ScopeEnv): StorageScope {
  const link = freshLink(env.search);
  if (link === null) return { fresh: null, began: false, local: () => tryGet(env.local), session: () => tryGet(env.session), idb: () => tryGet(env.idb) ?? undefined };
  const began = link === "new", token = began ? (env.token ?? newToken)() : link, prefix = `${FRESH_PREFIX}${token}.`;
  const realLocal = tryGet(env.local), realSession = tryGet(env.session), realIdb = tryGet(env.idb);
  if (began) wipeFresh([realLocal, realSession], realIdb, prefix);
  const local = (realLocal ? new PrefixedStorage(realLocal, prefix) : new MemoryStorage()) as unknown as Storage;
  const session = (realSession ? new PrefixedStorage(realSession, prefix) : new MemoryStorage()) as unknown as Storage;
  const idb = realIdb ? prefixedIdb(realIdb, prefix) : undefined;
  if (began) env.relink?.(token);
  return { fresh: token, began, local: () => local, session: () => session, idb: () => idb };
}

let current: StorageScope | undefined;
/** This page's scope, made on first use from its link (a worker's: the ordinary one, which only the derived caches use). */
export function storageScope(): StorageScope {
  return (current ??= makeStorageScope({
    search: typeof location === "undefined" ? "" : location.search,
    local: () => globalThis.localStorage,
    session: () => globalThis.sessionStorage,
    idb: () => globalThis.indexedDB,
    relink: token => { try { const p = new URLSearchParams(location.search); p.set("fresh", token); history.replaceState(history.state, "", "?" + p.toString() + location.hash); } catch { /* (a sandboxed page) */ } },
  }));
}

/** This page's localStorage (a fresh game's namespace), or null where the browser refuses it. */
export const localStore = (): Storage | null => storageScope().local();
/** This page's sessionStorage (a fresh game's namespace), or null where the browser refuses it. */
export const sessionStore = (): Storage | null => storageScope().session();
/** This page's IndexedDB (a fresh game's namespace), or undefined where there's none. */
export const pageIdb = (): IDBFactory | undefined => storageScope().idb();
/** Whether this page plays a fresh game (?fresh=). */
export const freshGame = (): boolean => storageScope().fresh !== null;

/** A link this page goes to, its ?fresh=<token> carried (a fresh game's reload, sail or save switch stays in it); as it was otherwise. */
export function freshHref(href: string, fresh: string | null = storageScope().fresh): string {
  if (!fresh) return href;
  const u = new URL(href, typeof location === "undefined" ? "https://witch.invalid/" : location.href);
  u.searchParams.set("fresh", fresh);
  return u.toString();
}
