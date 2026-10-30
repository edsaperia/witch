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
  recording?: InputRecording;
  trail?: NotableEvent[];
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
  if (bytes(comment) > COMMENT_BYTES) throw Error("This moment is too large to save as a comment. Download the log and report this limit.");
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
  if (!c || c.version !== 1 || c.build !== build || typeof c.text !== "string" || c.text.length > COMMENT_TEXT || typeof c.repro !== "string" || !Number.isFinite(c.at) || !savedNight(c.night, build, new URLSearchParams()) || bytes(c) > COMMENT_BYTES) throw Error("No valid comment for this build. Open the build named in the log, then restore it there.");
  return c;
}
export async function parseCommentFile(text: string, build: string): Promise<PlaytestComment> {
  if (new TextEncoder().encode(text).byteLength > LOG_EXPANDED_BYTES) throw Error("This log file is too large.");
  return selectComment(await unpackLog(JSON.parse(text)), build);
}
interface StoredComments { format: "witch-comments/v1"; bundles: PackedLog[] }
export async function encodeStoredComments(rows: PlaytestComment[]): Promise<StoredComments> {
  const bundles: PackedLog[] = [];
  for (const row of rows) {
    const bundle = await packLog(row);
    if (jsonBytes(bundle) > COMMENT_PACKED_BYTES) throw Error("This compressed comment exceeds its size limit");
    bundles.push(bundle);
  }
  const result: StoredComments = { format: "witch-comments/v1", bundles };
  if (jsonBytes(result) > COMMENT_PACKED_TOTAL) throw Error("Compressed comments exceed their storage limit");
  return result;
}
export async function decodeStoredComments(value: unknown): Promise<PlaytestComment[]> {
  if (Array.isArray(value)) return value as PlaytestComment[]; // Existing uncompressed session rows.
  const stored = value as StoredComments;
  if (!stored || stored.format !== "witch-comments/v1" || !Array.isArray(stored.bundles) || stored.bundles.length > COMMENT_COUNT || jsonBytes(stored) > COMMENT_PACKED_TOTAL) throw Error("Invalid stored comments");
  const rows: PlaytestComment[] = [];
  for (const bundle of stored.bundles) {
    if (jsonBytes(bundle) > COMMENT_PACKED_BYTES) throw Error("Stored comment exceeds its size limit");
    const row = await unpackLog(bundle) as PlaytestComment;
    rows.push(selectComment(row, row?.build));
    if (jsonBytes(rows) > COMMENT_TOTAL) throw Error("Expanded comments exceed their storage limit");
  }
  return rows;
}
export interface CommentStore { read(): Promise<PlaytestComment[]>; write(rows: PlaytestComment[]): Promise<void> }
export class CommentBook {
  private rows: PlaytestComment[] = [];
  private queue: Promise<unknown>;
  private persistent = true;
  constructor(private store: CommentStore) {
    this.queue = store.read().then(rows => { this.rows = this.cap(Array.isArray(rows) ? rows : []); }).catch(() => { this.persistent = false; });
  }
  private cap(rows: PlaytestComment[]): PlaytestComment[] {
    const out = rows.slice(-COMMENT_COUNT);
    while (out.length && bytes(out) > COMMENT_TOTAL) out.shift();
    return out;
  }
  add(comment: PlaytestComment): Promise<boolean> {
    const action = this.queue.then(async () => {
      this.rows = this.cap([...this.rows, comment]);
      try { await this.store.write(this.rows); this.persistent = true; } catch { this.persistent = false; }
      return this.persistent;
    });
    this.queue = action;
    return action;
  }
  async all(): Promise<PlaytestComment[]> { await this.queue; return structuredClone(this.rows); }
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
  return { read: async () => decodeStoredComments(await act("readonly")), write: async rows => { await act("readwrite", await encodeStoredComments(rows)); } };
}
