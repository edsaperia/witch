import { expect, it, vi } from "vitest";
import { WhatsNew } from "./whatsNew";
import { changelogAssets } from "../../tools/changelogBatches";
import { CHANGELOG_VERSIONS } from "../changelog";
const reply = (data: unknown) => new Response(JSON.stringify(data), { status: 200 });
const row = (version: number) => ({ version, date: "2026-10-30", changes: [{ title: "Fixture", date: null, items: ["🦊 New notes"] }] });
const files = ["batch-0-aaaaaaaaaaaa.json", "batch-1-bbbbbbbbbbbb.json"];
it("fetches nothing until selected, loads only one batch, caches it, and retries a failed next batch without losing notes", async () => {
  let fail = true;
  const calls: string[] = [];
  const fetcher = vi.fn(async (url: URL | RequestInfo) => {
    const path = String(url); calls.push(path);
    if (path.endsWith("index.json")) return reply({ version: 1, total: 2, batches: files });
    if (path.endsWith(files[0])) return reply({ version: 1, entries: [row(2)] });
    if (fail) return new Response("failed", { status: 503 });
    return reply({ version: 1, entries: [row(1)] });
  }) as typeof fetch;
  const news = new WhatsNew(new URL("https://fixture.test/pr-1493/news/"), () => {}, fetcher);
  expect(calls).toEqual([]);
  await Promise.all([news.more(), news.more()]);
  expect(calls).toHaveLength(2); expect(news.entries.map(r => r.version)).toEqual([2]);
  await news.more(); expect(news.error).toBe(true); expect(news.entries).toHaveLength(1);
  fail = false; await news.more(); expect(news.entries.map(r => r.version)).toEqual([2, 1]); expect(news.done).toBe(true);
  await news.more(); expect(calls).toHaveLength(4);
});
it("rejects foreign index paths and oversized data while leaving retry available", async () => {
  const foreign = new WhatsNew(new URL("https://fixture.test/news/"), () => {}, vi.fn(async () => reply({ version: 1, total: 1, batches: ["https://other.test/data"] })) as typeof fetch);
  await foreign.more(); expect(foreign.error).toBe(true); expect(foreign.done).toBe(false);
  let n = 0;
  const large = new WhatsNew(new URL("https://fixture.test/news/"), () => {}, vi.fn(async () => n++ ? new Response("x".repeat(512 * 1024 + 1)) : reply({ version: 1, total: 1, batches: [files[0]] })) as typeof fetch);
  await large.more(); expect(large.error).toBe(true); expect(large.entries).toEqual([]);
});
it("emits and fetches the entire existing changelog in newest-first batches of at most three", async () => {
  const assets = changelogAssets(), index = JSON.parse(assets["news/index.json"]);
  const entries = index.batches.flatMap((file: string) => {
    expect(file).toMatch(/^batch-\d+-[a-f0-9]{12}\.json$/);
    const batch = JSON.parse(assets[`news/${file}`]); expect(batch.entries.length).toBeLessThanOrEqual(3); return batch.entries;
  });
  expect(entries).toEqual(CHANGELOG_VERSIONS); expect(index.total).toBe(entries.length);
  const news = new WhatsNew(new URL("https://fixture.test/news/"), () => {}, vi.fn(async (input: RequestInfo | URL) => new Response(assets[new URL(String(input)).pathname.slice(1)])) as typeof fetch);
  for (let i = 0; i <= index.batches.length && !news.done; i++) { await news.more(); expect(news.error).toBe(false); }
  expect(news.entries).toEqual(CHANGELOG_VERSIONS);
});
