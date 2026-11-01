// Ed, 2026-10-30: a paused comment saves the actual moment, not only a seed/link approximation.
import { captureNight, savedNight, type SavedNight } from "./nightSave";
import type { Game } from "../rules/game";
import type { InputRecording } from "../platform/inputRecording";
import { recentNotables, type NotableEvent } from "../platform/playtestJournal";
import { jsonBytes, LOG_EXPANDED_BYTES, packLog, unpackLog, type PackedLog } from "../platform/logCodec";

export const COMMENT_TEXT = 2000, COMMENT_BYTES = 32 * 1024 * 1024, COMMENT_TOTAL = 64 * 1024 * 1024, COMMENT_COUNT = 8;
export const COMMENT_PACKED_BYTES = 8 * 1024 * 1024, COMMENT_PACKED_TOTAL = 32 * 1024 * 1024;
export interface Breadcrumb { at: number; t: number; island: string; kind: string; data: unknown }
export interface PlaytestComment {
  version: 1; id: string; at: number; text: string; build: string; repro: string;
  t: number; island: string; wave: number; witch: { x: number; z: number; hp: number };
  changed: Record<string, unknown>; breadcrumbs: Breadcrumb[]; night: SavedNight;
  context?: Omit<SavedNight, "game">;
  recording?: InputRecording;
  trail?: NotableEvent[];
}
/** Authored reports have no automatic count/byte eviction. Only their expensive attachments do. */
export type RetainedComment = Omit<PlaytestComment, "night"> & {
  night?: SavedNight;
  context?: Omit<SavedNight, "game">;
  omission?: string;
};
function withoutMoment(row: RetainedComment, reason: string): RetainedComment {
  const { night, recording: _recording, ...report } = row;
  const context = row.context ?? (night ? (({ game: _game, ...context }) => context)(night) : undefined);
  return { ...report, ...(context ? { context } : {}), omission: reason };
}
/** Newest complete moments get the replay budget; every written report stays in order. */
export function retainComments(rows: RetainedComment[]): RetainedComment[] {
  let used = 0, count = 0;
  const out = rows.slice();
  for (let i = out.length - 1; i >= 0; i--) {
    const row = out[i];
    if (!row.night) continue;
    const size = bytes(row);
    if (size > COMMENT_BYTES || count >= COMMENT_COUNT || used + size > COMMENT_TOTAL)
      out[i] = withoutMoment(row, "Saved moment and input replay omitted: replay retention limit. Written report and context kept.");
    else { used += size; count++; }
  }
  return out;
}
const bytes = (v: unknown) => new TextEncoder().encode(JSON.stringify(v)).byteLength;
export class Breadcrumbs {
  private rows: Breadcrumb[] = [];
  private game?: Game;
  add(game: Game, kind: string, data: unknown): void {
    if (this.game !== game) { this.rows = []; this.game = game; }
    // JSON severs live references. Controls/events have bounded scalar fields; never retain rules objects.
    let safe: unknown;
    try { safe = JSON.parse(JSON.stringify(data)) as unknown; } catch { return; } // Diagnostics must not break play on a cyclic payload.
    if (bytes(safe) > 2048) return;
    this.rows.push({ at: Date.now(), t: game.clock.time, island: game.tuning.map?.island || "home", kind, data: safe });
    this.rows = this.rows.filter(r => r.island === (game.tuning.map?.island || "home") && r.t >= game.clock.time - 30).slice(-512);
  }
  recent(game: Game): Breadcrumb[] { return this.game !== game ? [] : structuredClone(this.rows.filter(r => r.island === (game.tuning.map?.island || "home") && r.t >= game.clock.time - 30 && r.t <= game.clock.time)); }
}
export function captureComment(game: Game, text: string, context: Parameters<typeof captureNight>[1], repro: string, changed: Record<string, unknown>, breadcrumbs: Breadcrumb[], at = Date.now(), recording?: InputRecording): PlaytestComment {
  if (!text.trim() || text.length > COMMENT_TEXT) throw Error(`Write a comment of 1–${COMMENT_TEXT} characters.`);
  const comment: PlaytestComment = { version: 1, id: `${at}-${crypto.randomUUID()}`, at, text: text.trim(), build: context.build, repro,
    t: game.clock.time, island: game.tuning.map?.island || "home", wave: game.party.wave,
    witch: { x: game.witch.x, z: game.witch.z, hp: game.witches[0].health.hp },
    changed: structuredClone(changed), breadcrumbs: structuredClone(breadcrumbs), trail: recentNotables(), night: captureNight(game, context, at), ...(recording ? { recording } : {}) };
  const { game: _snapshot, ...savedContext } = comment.night;
  comment.context = savedContext;
  return comment;
}
/** A builder may select an individual bundle or a Download log file; the latter restores its latest comment. */
export function parseComment(text: string, build: string): PlaytestComment {
  if (new TextEncoder().encode(text).byteLength > LOG_EXPANDED_BYTES) throw Error("This log file is too large.");
  const raw: unknown = JSON.parse(text);
  return selectComment(raw, build);
}
function selectComment(raw: unknown, build: string): PlaytestComment {
  const candidates: unknown[] = Array.isArray(raw) ? raw.flatMap(r => r && typeof r === "object" && Array.isArray(r.comments) ? r.comments : []) : [raw];
  const c = candidates.sort((a, b) => Number((a as PlaytestComment)?.at ?? 0) - Number((b as PlaytestComment)?.at ?? 0)).at(-1) as PlaytestComment | undefined;
  if (c && !c.night && (c as RetainedComment).omission) throw Error(`This written report is kept, but cannot restore its moment. ${(c as RetainedComment).omission}`);
  if (!c || c.version !== 1 || c.build !== build || typeof c.text !== "string" || c.text.length > COMMENT_TEXT || typeof c.repro !== "string" || !Number.isFinite(c.at) || !savedNight(c.night, build, new URLSearchParams()) || bytes(c) > COMMENT_BYTES) throw Error("No valid comment for this build. Open the build named in the log, then restore it there.");
  return c;
}
export async function parseCommentFile(text: string, build: string): Promise<PlaytestComment> {
  if (new TextEncoder().encode(text).byteLength > LOG_EXPANDED_BYTES) throw Error("This log file is too large.");
  return selectComment(await unpackLog(JSON.parse(text)), build);
}
interface StoredComments { format: "witch-comments/v2"; reports: RetainedComment[]; moments: { id: string; bundle: PackedLog }[] }
const errorText = (e: unknown) => e instanceof Error ? `${e.name}: ${e.message}` : String(e);
export async function encodeStoredComments(rows: RetainedComment[]): Promise<StoredComments> {
  const retained = retainComments(rows), reports = retained.map(row => withoutMoment(row, row.omission ?? "Saved moment unavailable."));
  const moments: StoredComments["moments"] = [];
  let used = 0;
  for (let i = retained.length - 1; i >= 0; i--) {
    const row = retained[i];
    if (!row.night) continue;
    try {
      const bundle = await packLog({ night: row.night, ...(row.recording ? { recording: row.recording } : {}) });
      const size = jsonBytes(bundle);
      if (size > COMMENT_PACKED_BYTES || used + size > COMMENT_PACKED_TOTAL) throw Error("Compressed replay retention limit");
      used += size; moments.push({ id: row.id, bundle });
      // Context is also in the moment, avoiding a second copy on successful roundtrip.
      const { omission: _omission, ...report } = reports[i];
      reports[i] = report;
    } catch (e) { reports[i] = withoutMoment(row, `Saved moment and input replay omitted: ${errorText(e)}. Written report and context kept.`); }
  }
  return { format: "witch-comments/v2", reports, moments };
}
export async function decodeStoredComments(value: unknown): Promise<RetainedComment[]> {
  if (Array.isArray(value)) return retainComments(value as PlaytestComment[]); // Legacy uncompressed rows.
  const stored = value as StoredComments;
  if (stored?.format === "witch-comments/v2") {
    if (!Array.isArray(stored.reports) || !Array.isArray(stored.moments) || stored.moments.length > COMMENT_COUNT || jsonBytes(stored.moments) > COMMENT_PACKED_TOTAL + 4096) throw Error("Invalid stored comments");
    const rows = stored.reports.map(row => {
      if (!row || row.version !== 1 || typeof row.id !== "string" || typeof row.text !== "string" || row.text.length > COMMENT_TEXT || typeof row.build !== "string" || !Number.isFinite(row.at)) throw Error("Invalid stored report");
      return { ...row };
    });
    for (const { id, bundle } of stored.moments) {
      const row = rows.find(row => row.id === id);
      if (!row) throw Error("Unknown stored report moment");
      try {
        if (jsonBytes(bundle) > COMMENT_PACKED_BYTES) throw Error("Stored replay exceeds its limit");
        const moment = await unpackLog(bundle) as Pick<PlaytestComment, "night" | "recording">;
        const restored = selectComment({ ...row, ...moment }, row.build);
        Object.assign(row, restored);
      } catch (e) { row.omission = `Saved moment could not be read: ${errorText(e)}. Written report kept.`; }
    }
    return retainComments(rows);
  }
  const legacy = value as { format: string; bundles: PackedLog[] };
  if (!legacy || legacy.format !== "witch-comments/v1" || !Array.isArray(legacy.bundles) || legacy.bundles.length > COMMENT_COUNT || jsonBytes(legacy) > COMMENT_PACKED_TOTAL) throw Error("Invalid stored comments");
  const rows: PlaytestComment[] = [];
  for (const bundle of legacy.bundles) {
    if (jsonBytes(bundle) > COMMENT_PACKED_BYTES) throw Error("Stored comment exceeds its size limit");
    const row = await unpackLog(bundle) as PlaytestComment;
    rows.push(selectComment(row, row?.build));
  }
  return retainComments(rows);
}
export interface CommentStore { read(): Promise<RetainedComment[]>; write(rows: RetainedComment[]): Promise<RetainedComment[] | void> }
export class CommentBook {
  private rows: RetainedComment[] = [];
  private queue: Promise<unknown>;
  private persistent = true;
  private readFailed = false;
  private error?: string;
  constructor(private store: CommentStore) {
    this.queue = store.read().then(rows => { this.rows = retainComments(Array.isArray(rows) ? rows : []); }).catch(e => { this.persistent = false; this.readFailed = true; this.error = errorText(e); });
  }
  add(comment: PlaytestComment): Promise<boolean> {
    const action = this.queue.then(async () => {
      this.rows = retainComments([...this.rows, comment]);
      try {
        // Never overwrite an unread legacy store with only this page's new reports.
        if (this.readFailed) throw Error(`Previous reports could not be read; storage left unchanged. ${this.error}`);
        const saved = await this.store.write(this.rows);
        if (saved) this.rows = saved;
        this.persistent = true; this.error = undefined;
      } catch (e) { this.persistent = false; this.error = errorText(e); }
      return this.persistent;
    });
    this.queue = action;
    return action;
  }
  status(): { persistent: boolean; error?: string; omitted: number; omissionReasons: string[] } { return { persistent: this.persistent, ...(this.error ? { error: this.error } : {}), omitted: this.rows.filter(row => row.omission).length, omissionReasons: [...new Set(this.rows.flatMap(row => row.omission ? [row.omission] : []))] }; }
  async all(moments = true): Promise<RetainedComment[]> { await this.queue; return structuredClone(moments ? this.rows : this.rows.map(row => withoutMoment(row, row.omission ?? "Saved moment omitted from this reports-only download."))); }
}
/** Session identity survives reload in this tab. IDB avoids localStorage's small synchronous quota. */
export function browserCommentStore(): CommentStore {
  let session: string;
  try { session = sessionStorage.getItem("witch.comment-session") || crypto.randomUUID(); sessionStorage.setItem("witch.comment-session", session); }
  catch { return { read: async () => [], write: async () => { throw Error("Session storage unavailable"); } }; }
  const key = `${location.pathname}:${session}`;
  const db = new Promise<IDBDatabase>((resolve, reject) => {
    try {
      const r = indexedDB.open("witch.playtest-comments", 1);
      r.onupgradeneeded = () => r.result.createObjectStore("sessions");
      r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error); r.onblocked = () => reject(Error("Comment storage busy"));
    } catch (e) { reject(e); }
  });
  const act = async (mode: IDBTransactionMode, write?: StoredComments) => {
    const d = await db;
    return new Promise<unknown>((resolve, reject) => {
      const tx = d.transaction("sessions", mode), store = tx.objectStore("sessions"), r = write ? store.put(write, key) : store.get(key);
      tx.oncomplete = () => resolve(write ?? r.result?.rows ?? r.result ?? []);
      tx.onerror = tx.onabort = () => reject(tx.error ?? r.error);
    });
  };
  return { read: async () => decodeStoredComments(await act("readonly")), write: async rows => {
    // Commit authored text before compression or expensive attachment writes can fail.
    const textOnly: StoredComments = { format: "witch-comments/v2", reports: rows.map(row => withoutMoment(row, row.omission ?? "Saved moment not persisted; written report and context kept.")), moments: [] };
    await act("readwrite", textOnly);
    try {
      const encoded = await encodeStoredComments(rows);
      await act("readwrite", encoded);
      return await decodeStoredComments(encoded);
    } catch (e) {
      textOnly.reports = textOnly.reports.map(row => ({ ...row, omission: `Saved moment storage failed: ${errorText(e)}. Written report and context kept.` }));
      try { await act("readwrite", textOnly); } catch { /* The first text-only transaction already committed. */ }
      return textOnly.reports;
    }
  } };
}
