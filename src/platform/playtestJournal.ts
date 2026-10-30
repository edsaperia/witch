// Incremental, per-page journal. A committed IDB transaction survives reload; an in-flight write cannot be guaranteed after a hard kill.
export interface LogContext { build: string; t: number | null; island: string }
export interface NotableEvent extends LogContext { at: number; kind: string; message: string; data?: unknown }
export interface JournalEntry { page: string; seq: number; at: number; kind: string; payload: unknown }
export interface JournalPage { id: string; path: string; session: string; build: string; started: number; updated: number; closed: boolean; bytes: number; dropped: number }
export interface JournalMarker { owner: string; active: boolean; build: string; at: number; compact: NotableEvent[] }
export interface MarkerStore { read(): JournalMarker | null; write(marker: JournalMarker): void }
export interface JournalStore {
  list(path: string): Promise<JournalPage[]>;
  append(page: JournalPage, entries: JournalEntry[]): Promise<void>;
  read(page: string): Promise<JournalEntry[]>;
  prune(ids: string[]): Promise<void>;
}
const LIMIT = 32 * 1024 * 1024;
const bytes = (v: unknown) => new TextEncoder().encode(JSON.stringify(v)).byteLength;
export class PlaytestJournal {
  readonly ready: Promise<{ unexpected: boolean; persistent: boolean }>;
  private pending: JournalEntry[] = [];
  private unsaved: JournalEntry[] = [];
  private queue: Promise<void> = Promise.resolve();
  private timer?: ReturnType<typeof setTimeout>;
  private seq = 0;
  private previous: JournalPage[] = [];
  private previousMarker: JournalMarker | null = null;
  private compact: NotableEvent[] = [];
  private persistent = true;
  private closing = false;
  private page: JournalPage;
  constructor(path: string, session: string, id: string, build: string, private store: JournalStore, private markers: MarkerStore, now = Date.now()) {
    const page = this.page = { id, path, session, build, started: now, updated: now, closed: false, bytes: 0, dropped: 0 };
    try { this.previousMarker = markers.read(); markers.write({ owner: id, active: true, build, at: now, compact: [] }); } catch { this.persistent = false; }
    this.ready = (async () => {
      try {
        const old = (await store.list(path)).filter(p => p.id !== id && p.session === session).sort((a, b) => b.started - a.started);
        // Never delete another tab/session or an unclosed page that may still be running.
        this.previous = old.slice(0, 2); await store.prune(old.slice(2).filter(p => p.closed).map(p => p.id));
        await store.append(page, []);
      } catch { this.persistent = false; }
      return { unexpected: this.previousMarker?.active === true, persistent: this.persistent };
    })();
  }
  append(kind: string, payload: unknown): void {
    if (this.closing) return;
    let copy: unknown, size: number;
    try { copy = structuredClone(payload); size = bytes(copy); } catch { this.page.dropped++; return; }
    if (this.page.bytes + size > LIMIT) { this.page.dropped++; return; }
    const entry = { page: this.page.id, seq: ++this.seq, at: Date.now(), kind, payload: copy };
    this.page.bytes += size; this.page.updated = entry.at; this.pending.push(entry);
    if (!this.timer) this.timer = setTimeout(() => { this.timer = undefined; void this.flush(); }, 100);
  }
  /** Small synchronous backup for errors/notable events, independently of larger queued input/snapshot writes. */
  notable(event: NotableEvent): void {
    if (this.closing) return;
    this.compact.push(structuredClone(event)); this.compact = this.compact.slice(-50);
    try { if (this.markers.read()?.owner === this.page.id) this.markers.write({ owner: this.page.id, active: true, build: this.page.build, at: event.at, compact: this.compact }); } catch { this.persistent = false; }
    this.append("notable", event);
  }
  async flush(): Promise<void> {
    if (this.timer) { clearTimeout(this.timer); this.timer = undefined; }
    const batch = this.pending.splice(0), page = { ...this.page };
    const job = this.queue.then(async () => {
      await this.ready;
      try { await this.store.append(page, batch); } catch { this.persistent = false; this.unsaved.push(...batch); }
    });
    this.queue = job; await job;
  }
  async close(): Promise<void> {
    this.closing = true; await this.flush();
    // A failed write must retain the unexpected-end hint: the queued records were not saved.
    if (!this.persistent) return;
    this.page.closed = true;
    try {
      await this.store.append(this.page, []);
      // A duplicated tab may inherit sessionStorage. One page must never clear a newer page's active marker.
      if (this.markers.read()?.owner === this.page.id) this.markers.write({ owner: this.page.id, active: false, build: this.page.build, at: Date.now(), compact: this.compact });
    } catch { this.persistent = false; }
  }
  async download(): Promise<unknown> {
    await this.flush();
    const read = async (page: JournalPage) => {
      try { return { page, entries: await this.store.read(page.id) }; } catch { return { page, entries: [], unavailable: true }; }
    };
    return { version: 1, persistent: this.persistent, current: await read({ ...this.page }), unsaved: structuredClone(this.unsaved), previous: await Promise.all(this.previous.map(read)), previousMarker: this.previousMarker, compact: this.compact };
  }
}

export function browserJournalStore(factory: IDBFactory): JournalStore {
  const db = new Promise<IDBDatabase>((resolve, reject) => {
    try {
      const r = factory.open("witch.playtest-journal", 1);
      r.onupgradeneeded = () => {
        r.result.createObjectStore("pages", { keyPath: "id" }).createIndex("path", "path");
        r.result.createObjectStore("entries", { keyPath: ["page", "seq"] }).createIndex("page", "page");
      };
      r.onsuccess = () => { r.result.onversionchange = () => r.result.close(); resolve(r.result); };
      r.onerror = () => reject(r.error); r.onblocked = () => reject(Error("Playtest log storage busy"));
    } catch (e) { reject(e); }
  });
  async function tx<T>(mode: IDBTransactionMode, action: (pages: IDBObjectStore, entries: IDBObjectStore) => () => T): Promise<T> {
    const d = await db;
    return new Promise((resolve, reject) => {
      const t = d.transaction(["pages", "entries"], mode), result = action(t.objectStore("pages"), t.objectStore("entries"));
      t.oncomplete = () => resolve(result()); t.onerror = t.onabort = () => reject(t.error);
    });
  }
  return {
    list: path => tx("readonly", pages => { const r = pages.index("path").getAll(path); return () => r.result as JournalPage[]; }),
    read: page => tx("readonly", (_pages, entries) => { const r = entries.index("page").getAll(page); return () => r.result as JournalEntry[]; }),
    append: (page, rows) => tx("readwrite", (pages, entries) => { pages.put(page); for (const row of rows) entries.put(row); return () => undefined; }),
    prune: ids => tx("readwrite", (pages, entries) => {
      for (const id of ids) { pages.delete(id); const r = entries.index("page").openCursor(id); r.onsuccess = () => { const c = r.result; if (c) { c.delete(); c.continue(); } }; }
      return () => undefined;
    }),
  };
}

let active: PlaytestJournal | undefined;
let context: () => LogContext = () => ({ build: "dev", t: null, island: "unknown" });
const trail: NotableEvent[] = [];
export function setLogContext(read: typeof context): void { context = read; }
export function recentNotables(): NotableEvent[] { return structuredClone(trail); }
function safeData(data: unknown): unknown {
  try { const text = JSON.stringify(data); return text && text.length <= 2048 ? JSON.parse(text) : String(data).slice(0, 500); } catch { return "[unserializable]"; }
}
export function notable(kind: string, message: string, data?: unknown): void {
  let at: LogContext; try { at = context(); } catch { at = { build: "dev", t: null, island: "unknown" }; }
  const event = { ...at, at: Date.now(), kind, message: message.slice(0, 1000), ...(data === undefined ? {} : { data: safeData(data) }) };
  trail.push(event); if (trail.length > 50) trail.shift(); active?.notable(event);
}
export function journalEntry(kind: string, payload: unknown): void { active?.append(kind, payload); }
export function currentJournal(): PlaytestJournal | undefined { return active; }
export function beginBrowserJournal(build: string): PlaytestJournal | undefined {
  if (active || typeof window === "undefined" || typeof location === "undefined") return active;
  let id: string;
  try { id = crypto.randomUUID(); } catch { return undefined; }
  let session = id;
  try { session = sessionStorage.getItem("witch.log-session") || id; sessionStorage.setItem("witch.log-session", session); } catch { /* separate page-only identity */ }
  const key = `witch.playtest-active:${location.pathname}:${session}`;
  const markers: MarkerStore = { read: () => {
    const value = JSON.parse(localStorage.getItem(key) ?? "null") as JournalMarker | null;
    return value && typeof value.owner === "string" && typeof value.active === "boolean" && Array.isArray(value.compact) ? { ...value, compact: value.compact.slice(-50) } : null;
  }, write: marker => localStorage.setItem(key, JSON.stringify(marker)) };
  active = new PlaytestJournal(location.pathname, session, id, build, browserJournalStore(globalThis.indexedDB), markers);
  window.addEventListener("pagehide", event => { if (event.persisted) void active?.flush(); else void active?.close(); });
  document.addEventListener("visibilitychange", () => { if (document.hidden) void active?.flush(); });
  return active;
}
