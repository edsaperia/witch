export type LogLevel = "debug" | "info" | "warn" | "error";
export interface RecordContext { build: string; t: number | null; island: string }
export interface LogRecord extends RecordContext {
  seq: number; level: LogLevel; at: number; lastAt: number; lastT: number | null;
  message: string; data?: unknown; count: number;
}
const levels: LogLevel[] = ["debug", "info", "warn", "error"];
export const recordBytes = (value: unknown): number => new TextEncoder().encode(JSON.stringify(value)).byteLength;
/** JSON severs references and rejects executable/cyclic data. The caller reports omissions explicitly. */
function copy(value: unknown): unknown {
  if (value === undefined) return undefined;
  return JSON.parse(JSON.stringify(value, (_key, v: unknown) => {
    if (typeof v === "function" || typeof v === "symbol" || typeof v === "bigint" || typeof v === "number" && !Number.isFinite(v)) throw Error("Non-JSON diagnostic data");
    return v;
  }));
}
export class LogRecords {
  private rows = new Map<number, LogRecord>();
  private priority = Object.fromEntries(levels.map(level => [level, new Map<number, true>()])) as Record<LogLevel, Map<number, true>>;
  private sizes = new Map<number, number>();
  private recent = new Map<string, number>();
  private keys = new Map<number, string>();
  private seq = 0;
  bytes = 0;
  readonly dropped: Record<LogLevel | "invalid", number> = { debug: 0, info: 0, warn: 0, error: 0, invalid: 0 };
  constructor(readonly maxBytes = 8 * 1024 * 1024, readonly maxCount = 10_000) {}
  get count(): number { return this.rows.size; }
  has(seq: number): boolean { return this.rows.has(seq); }
  get(seq: number): LogRecord | undefined { const row = this.rows.get(seq); return row && structuredClone(row); }
  add(level: LogLevel, message: string, data: unknown, context: RecordContext, at = Date.now()): { record?: LogRecord; removed: number[] } {
    let safe: unknown;
    try { safe = copy(data); } catch { this.dropped.invalid++; safe = { omitted: "Non-JSON diagnostic data" }; }
    const text = message.slice(0, 2000);
    // Attached recent history changes each occurrence; it must not prevent equivalent errors from folding.
    const comparable = safe && typeof safe === "object" && !Array.isArray(safe) ? Object.fromEntries(Object.entries(safe).filter(([name]) => name !== "trail")) : safe;
    const key = JSON.stringify([level, context.build, context.island, text, comparable]);
    const previous = this.rows.get(this.recent.get(key) ?? -1);
    let row: LogRecord;
    if (previous && at >= previous.lastAt && at - previous.lastAt <= 5000) {
      row = { ...previous, data: safe, lastAt: at, lastT: context.t, count: Math.min(Number.MAX_SAFE_INTEGER, previous.count + 1) };
      this.bytes -= this.sizes.get(row.seq)!;
      this.priority[level].delete(row.seq);
    } else {
      row = { seq: ++this.seq, level, at, lastAt: at, ...context, lastT: context.t, message: text, ...(safe === undefined ? {} : { data: safe }), count: 1 };
    }
    const size = recordBytes(row);
    this.rows.set(row.seq, row); this.sizes.set(row.seq, size); this.bytes += size;
    this.priority[level].set(row.seq, true); this.recent.set(key, row.seq); this.keys.set(row.seq, key);
    const removed: number[] = [];
    while (this.bytes > this.maxBytes || this.rows.size > this.maxCount) {
      const victimLevel = levels.find(l => this.priority[l].size)!;
      const id = this.priority[victimLevel].keys().next().value!;
      this.priority[victimLevel].delete(id); this.bytes -= this.sizes.get(id)!; this.sizes.delete(id); this.rows.delete(id);
      const oldKey = this.keys.get(id)!; if (this.recent.get(oldKey) === id) this.recent.delete(oldKey); this.keys.delete(id);
      removed.push(id); this.dropped[victimLevel]++;
    }
    return { record: this.rows.has(row.seq) ? structuredClone(row) : undefined, removed };
  }
  all(): LogRecord[] { return structuredClone([...this.rows.values()].sort((a, b) => a.at - b.at || a.seq - b.seq)); }
}
export function readableRecords(rows: readonly LogRecord[]): string {
  return rows.map(row => {
    const stack = row.data && typeof row.data === "object" && "stack" in row.data && typeof row.data.stack === "string" ? row.data.stack : "";
    return `${new Date(row.at).toISOString()} ${row.level.toUpperCase()} ${row.build} ${row.island} game=${row.t ?? "unknown"} ${row.message}${row.count > 1 ? ` ×${row.count} (last ${new Date(row.lastAt).toISOString()}, game=${row.lastT ?? "unknown"})` : ""}${stack ? `\n${stack}` : ""}${row.data === undefined ? "" : `\n${JSON.stringify(row.data, null, 2)}`}`;
  }).join("\n");
}
