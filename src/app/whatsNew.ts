import type { ChangelogVersion } from "../changelogData";
const BATCH_BYTES = 512 * 1024;
async function json(fetcher: typeof fetch, url: URL, limit: number): Promise<unknown> {
  const response = await fetcher(url, { cache: "no-store" });
  if (!response.ok || !response.body) throw Error("Update notes could not load");
  const reader = response.body.getReader(), chunks: Uint8Array[] = []; let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read(); if (done) break;
      size += value.byteLength;
      if (size > limit) { await reader.cancel(); throw Error("Update notes exceed the batch limit"); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const data = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { data.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(data));
}
function manifest(value: unknown): string[] {
  const v = value as { version?: unknown; total?: unknown; batches?: unknown };
  if (!v || v.version !== 1 || !Number.isSafeInteger(v.total) || (v.total as number) < 0 || !Array.isArray(v.batches) || v.batches.length > 1024 || (v.total as number) > v.batches.length * 3 || !v.batches.every(file => typeof file === "string" && /^batch-\d+-[a-f0-9]{12}\.json$/.test(file))) throw Error("Invalid update index");
  return v.batches;
}
function entries(value: unknown): ChangelogVersion[] {
  const v = value as { version?: unknown; entries?: unknown };
  const text = (s: unknown) => s === null || typeof s === "string" && s.length <= 4096;
  if (!v || v.version !== 1 || !Array.isArray(v.entries) || v.entries.length > 3 || !v.entries.every(entry => entry && (entry.version === null || Number.isSafeInteger(entry.version) && entry.version >= 0) && text(entry.date) && Array.isArray(entry.changes) && entry.changes.every((change: { title?: unknown; date?: unknown; items?: unknown }) => change && text(change.title) && text(change.date) && Array.isArray(change.items) && change.items.every(item => typeof item === "string" && item.length <= 4096)))) throw Error("Invalid update batch");
  return v.entries;
}
/** Constructing/opening Settings fetches nothing. The selected tab asks for one index and one batch, then explicit Load more. */
export class WhatsNew {
  readonly entries: ChangelogVersion[] = [];
  busy = false;
  error = false;
  done = false;
  started = false;
  private files: string[] | null = null;
  private cursor = 0;
  constructor(private base: URL, private changed: () => void, private fetcher: typeof fetch = fetch) {}
  async more(): Promise<void> {
    if (this.busy || this.done) return;
    this.busy = this.started = true; this.error = false; this.changed();
    try {
      this.files ??= manifest(await json(this.fetcher, new URL("index.json", this.base), 32 * 1024));
      if (this.cursor < this.files.length) {
        const batch = entries(await json(this.fetcher, new URL(this.files[this.cursor], this.base), BATCH_BYTES));
        this.entries.push(...batch); this.cursor++;
      }
      this.done = this.cursor >= this.files.length;
    } catch { this.error = true; }
    finally { this.busy = false; this.changed(); }
  }
}
