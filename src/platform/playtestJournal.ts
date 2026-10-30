// Incremental, per-page journal. A committed IDB transaction survives reload; an in-flight write cannot be guaranteed after a hard kill.
import { LogRecords, readableRecords, recordBytes, type LogRecord, type LogLevel } from "./logRecords";
export interface LogContext { build: string; t: number | null; island: string }
export interface NotableEvent extends LogContext { at: number; kind: string; message: string; data?: unknown }
export interface JournalEntry extends LogRecord { page: string }
export interface JournalPage { id: string; path: string; session: string; build: string; started: number; updated: number; closed: boolean; bytes: number; dropped: number }
export interface JournalMarker { owner: string; active: boolean; build: string; at: number; compact: NotableEvent[] }
export interface MarkerStore { read(): JournalMarker | null; write(marker: JournalMarker): void }
export interface JournalStore {
  list(path: string): Promise<JournalPage[]>;
  append(page: JournalPage, entries: JournalEntry[], removed?: number[]): Promise<void>;
  read(page: string): Promise<JournalEntry[]>;
  prune(ids: string[]): Promise<void>;
}
export const JOURNAL_TOTAL_BYTES = 96 * 1024 * 1024;
/** All paths share one DB budget. Closed pages can go; live/unknown pages never get deleted to make room. */
export function journalPrunePlan(pages: JournalPage[], next: JournalPage, budget = JOURNAL_TOTAL_BYTES): string[] | null {
  let total = pages.filter(p => p.id !== next.id).reduce((n, p) => n + p.bytes, next.bytes);
  const removed: string[] = [];
  for (const page of pages.filter(p => p.id !== next.id && p.closed).sort((a, b) => a.updated - b.updated)) {
    if (total <= budget) break;
    total -= page.bytes; removed.push(page.id);
  }
  return total <= budget ? removed : null;
}
export class PlaytestJournal {
  readonly ready: Promise<{ unexpected: boolean; persistent: boolean }>;
  private pending = new Map<number, JournalEntry>();
  private removed = new Set<number>();
  private records: LogRecords;
  private committed = new Map<number, number>();
  private queue: Promise<void> = Promise.resolve();
  private timer?: ReturnType<typeof setTimeout>;
  private previous: JournalPage[] = [];
  private previousMarker: JournalMarker | null = null;
  private compact: NotableEvent[] = [];
  private persistent = true;
  private closing = false;
  private page: JournalPage;
  constructor(path: string, session: string, id: string, build: string, private store: JournalStore, private markers: MarkerStore, now = Date.now(), limits?: { bytes: number; count: number }) {
    this.records = new LogRecords(limits?.bytes, limits?.count);
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
  append(kind: string, payload: unknown, details?: { level?: LogLevel; message?: string; context?: LogContext; at?: number }): void {
    if (this.closing) return;
    const level = details?.level ?? (kind === "error" ? "error" : kind.startsWith("recording:") ? "debug" : "info");
    const { record, removed } = this.records.add(level, details?.message ?? kind, payload, details?.context ?? { build: this.page.build, t: null, island: "unknown" }, details?.at);
    for (const id of removed) { this.pending.delete(id); this.removed.add(id); }
    if (record) this.pending.set(record.seq, { ...record, page: this.page.id });
    this.page.bytes = this.records.bytes + this.records.count * (8 + JSON.stringify(this.page.id).length);
    this.page.dropped = Object.values(this.records.dropped).reduce((a, b) => a + b, 0);
    this.page.updated = Date.now();
    if (!this.timer) this.timer = setTimeout(() => { this.timer = undefined; void this.flush(); }, 100);
  }
  /** Small synchronous backup for errors/notable events, independently of larger queued input/snapshot writes. */
  notable(event: NotableEvent): void {
    if (this.closing) return;
    this.compact.push(structuredClone(event)); this.compact = this.compact.slice(-50);
    try { if (this.markers.read()?.owner === this.page.id) this.markers.write({ owner: this.page.id, active: true, build: this.page.build, at: event.at, compact: this.compact }); } catch { this.persistent = false; }
    this.append("notable", { kind: event.kind, data: event.data }, { level: event.kind === "error" ? "error" : event.kind === "warning" ? "warn" : "info", message: event.message, context: event, at: event.at });
  }
  async flush(): Promise<void> {
    if (this.timer) { clearTimeout(this.timer); this.timer = undefined; }
    const batch = [...this.pending.values()], removed = [...this.removed], page = { ...this.page };
    this.pending.clear(); this.removed.clear();
    const job = this.queue.then(async () => {
      await this.ready;
      // A failed deletion must not leave stale rows accumulating behind a smaller metadata budget.
      const deleted = [...new Set([...removed, ...[...this.committed.keys()].filter(seq => !this.records.has(seq))])];
      const rows = batch.flatMap(row => { const current = this.records.get(row.seq); return current ? [{ ...current, page: page.id }] : []; });
      const sizes = new Map(this.committed);
      for (const seq of deleted) sizes.delete(seq);
      for (const row of rows) sizes.set(row.seq, recordBytes(row));
      try {
        await this.store.append({ ...page, bytes: [...sizes.values()].reduce((a, b) => a + b, 0) }, rows, deleted);
        this.committed = sizes;
      } catch {
        this.persistent = false;
        for (const row of rows) { const current = this.records.get(row.seq); if (current) this.pending.set(row.seq, { ...current, page: page.id }); }
      }
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
    const records = this.records.all();
    return { version: 2, persistent: this.persistent, current: await read({ ...this.page }), records, text: readableRecords(records), dropped: { ...this.records.dropped }, previous: await Promise.all(this.previous.map(read)), previousMarker: this.previousMarker, compact: this.compact };
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
  async function tx<T>(mode: IDBTransactionMode, action: (pages: IDBObjectStore, entries: IDBObjectStore, transaction: IDBTransaction) => () => T): Promise<T> {
    const d = await db;
    return new Promise((resolve, reject) => {
      const t = d.transaction(["pages", "entries"], mode), result = action(t.objectStore("pages"), t.objectStore("entries"), t);
      t.oncomplete = () => resolve(result()); t.onerror = t.onabort = () => reject(t.error);
    });
  }
  function prune(pages: IDBObjectStore, entries: IDBObjectStore, ids: string[]): void {
    for (const id of ids) { pages.delete(id); const r = entries.index("page").openCursor(id); r.onsuccess = () => { const c = r.result; if (c) { c.delete(); c.continue(); } }; }
  }
  return {
    list: path => tx("readonly", pages => { const r = pages.index("path").getAll(path); return () => r.result as JournalPage[]; }),
    read: page => tx("readonly", (_pages, entries) => { const r = entries.index("page").getAll(page); return () => r.result as JournalEntry[]; }),
    append: (page, rows, removed = []) => tx("readwrite", (pages, entries, transaction) => {
      const request = pages.getAll();
      request.onsuccess = () => {
        const ids = journalPrunePlan(request.result as JournalPage[], page);
        if (!ids) { transaction.abort(); return; }
        prune(pages, entries, ids); pages.put(page);
        for (const seq of removed) entries.delete([page.id, seq]);
        for (const row of rows) entries.put(row);
      };
      return () => undefined;
    }),
    prune: ids => tx("readwrite", (pages, entries) => {
      prune(pages, entries, ids);
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
export function journalEntry(kind: string, payload: unknown): void {
  let at: LogContext; try { at = context(); } catch { at = { build: "dev", t: null, island: "unknown" }; }
  const message = kind === "error" && payload && typeof payload === "object" && "message" in payload && typeof payload.message === "string" ? payload.message : kind;
  active?.append(kind, payload, { context: at, message });
}
export function currentJournal(): PlaytestJournal | undefined { return active; }
export function beginBrowserJournal(build: string): PlaytestJournal | undefined {
  if (active || typeof window === "undefined" || typeof location === "undefined") return active;
  context = () => ({ build, t: null, island: "unknown" });
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
