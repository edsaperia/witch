import { describe, expect, it } from "vitest";
import { PlaytestJournal, JOURNAL_DEBUG_BYTES, journalPrunePlan, type JournalEntry, type JournalMarker, type JournalPage, type JournalStore } from "./playtestJournal";

function fixture() {
  const pages = new Map<string, JournalPage>(), entries = new Map<string, JournalEntry[]>();
  let marker: JournalMarker | null = null;
  const store: JournalStore = {
    list: async path => [...pages.values()].filter(p => p.path === path),
    append: async (page, rows, removed = []) => {
      pages.set(page.id, structuredClone(page));
      const merged = new Map((entries.get(page.id) ?? []).map(row => [row.seq, row]));
      for (const seq of removed) merged.delete(seq);
      for (const row of rows) merged.set(row.seq, structuredClone(row));
      entries.set(page.id, [...merged.values()]);
    },
    read: async id => structuredClone(entries.get(id) ?? []),
    prune: async ids => { for (const id of ids) { pages.delete(id); entries.delete(id); } },
  };
  const markers = { read: () => marker, write: (value: JournalMarker) => { marker = structuredClone(value); } };
  const open = (id: string, now = 1, session = "session") => new PlaytestJournal("/test", session, id, "build", store, markers, now);
  return { store, markers, open, pages, entries };
}

describe("incremental playtest journal", () => {
  it("bounds durable debug growth across a long pause and reload while preserving warnings and errors", async () => {
    const f = fixture(), journal = f.open("paused");
    journal.append("error", { message: "before pause" });
    journal.append("slowframe", { gap: 19533 });
    for (let second = 0; second < 600; second++) {
      journal.append("recording:event", { tick: second, debug: "x".repeat(2048) });
      if (second % 10 === 0) await journal.flush();
    }
    await journal.flush();
    const rows = f.entries.get("paused")!;
    expect(f.pages.get("paused")!.bytes).toBeLessThan(JOURNAL_DEBUG_BYTES + 32 * rows.length);
    expect(rows.some(r => r.level === "error" && (r.data as { message: string }).message === "before pause")).toBe(true);
    expect(rows.some(r => r.level === "warn" && (r.data as { gap: number }).gap === 19533)).toBe(true);
    const reloaded = f.open("reloaded", 2); expect((await reloaded.ready).unexpected).toBe(true);
    const bundle = await reloaded.download() as { previous: { entries: JournalEntry[] }[] };
    expect(bundle.previous[0].entries.filter(r => r.level === "error" || r.level === "warn")).toHaveLength(2);
    await journal.close(); await reloaded.close();
  });
  it("does not evict important records even when they alone exceed the debug budget", async () => {
    const f = fixture(), journal = new PlaytestJournal("/test", "session", "important", "build", f.store, f.markers, 1, { bytes: 400, count: 1 });
    for (let i = 0; i < 8; i++) journal.append(i % 2 ? "error" : "slowframe", { index: i });
    for (let i = 0; i < 20; i++) journal.append("recording:event", { tick: i });
    await journal.flush();
    expect(f.entries.get("important")).toHaveLength(8);
    expect(f.entries.get("important")!.every(r => r.level === "warn" || r.level === "error")).toBe(true);
    await journal.close();
  });
  it("keeps committed records and the last fifty notable events after an unexpected reload", async () => {
    const f = fixture(), first = f.open("first");
    first.append("input", { tick: 1 });
    for (let i = 0; i < 55; i++) first.notable({ build: "build", t: i, island: "fox", at: i, kind: "quest", message: String(i) });
    await first.flush();
    const second = f.open("second", 2);
    expect(await second.ready).toEqual({ unexpected: true, persistent: true });
    const saved = await second.download() as { previous: { entries: JournalEntry[] }[]; previousMarker: JournalMarker };
    expect(saved.previous[0].entries[0].data).toEqual({ tick: 1 });
    expect(saved.previousMarker.compact).toHaveLength(50);
    expect(saved.previousMarker.compact[0].message).toBe("5");
    await second.close();
  });
  it("distinguishes clean closure and never clears a newer page's marker", async () => {
    const f = fixture(), first = f.open("first"); await first.ready;
    const second = f.open("second", 2); await second.ready;
    await first.close(); expect(f.markers.read()?.owner).toBe("second");
    expect(f.markers.read()?.active).toBe(true);
    await second.close();
    const third = f.open("third", 3);
    expect((await third.ready).unexpected).toBe(false);
    await third.close();
  });
  it("an ordinary reload is not an unexpected end even though its pagehide write never commits (crash1823)", async () => {
    const f = fixture();
    // Chromium: IndexedDB work a page starts in pagehide never commits before the unload.
    let unloading = false;
    const dying: JournalStore = { ...f.store, append: (page, rows, removed) => unloading ? new Promise<void>(() => {}) : f.store.append(page, rows, removed) };
    const first = new PlaytestJournal("/test", "session", "first", "build", dying, f.markers, 1); await first.ready;
    first.append("input", { tick: 1 }); await first.flush();
    unloading = true; first.pageHidden();
    const second = f.open("second", 2);
    expect(await second.ready).toEqual({ unexpected: false, persistent: true });
    expect(f.pages.get("first")!.closed).toBe(true);
    expect(f.entries.get("first")).toHaveLength(1);
    // A page that dies without pagehide (a renderer crash or kill) still reads as unexpected.
    const third = f.open("third", 3);
    expect((await third.ready).unexpected).toBe(true);
    expect(f.pages.get("second")!.closed).toBe(false);
    await third.close();
  });
  it("leaves the unexpected-end marker after storage failure without throwing", async () => {
    const f = fixture(), page = f.open("first"); await page.ready;
    f.store.append = async () => { throw Error("quota"); };
    page.append("input", { tick: 1 }); await page.close();
    expect(f.markers.read()?.active).toBe(true);
    const log = await page.download() as { persistent: boolean; records: JournalEntry[] };
    expect(log.persistent).toBe(false);
    expect(log.records.map(row => row.data)).toEqual([{ tick: 1 }]);
  });
  it("retains two prior pages and prunes their records together", async () => {
    const f = fixture();
    for (let i = 0; i < 5; i++) { const page = f.open(String(i), i); page.append("input", i); await page.close(); }
    expect([...f.pages.keys()]).toEqual(["2", "3", "4"]);
    expect([...f.entries.keys()]).toEqual(["2", "3", "4"]);
  });
  it("does not prune an unclosed page or another tab's session", async () => {
    const f = fixture(), running = f.open("running", 0), other = f.open("other", 0, "other-session");
    await running.ready; await other.ready;
    for (let i = 1; i < 5; i++) { const page = f.open(String(i), i); await page.close(); }
    expect(f.pages.has("running")).toBe(true); expect(f.pages.has("other")).toBe(true);
    await running.close(); await other.close();
  });
  it("persists repeat updates and removes evicted debug records before errors", async () => {
    const f = fixture(), journal = new PlaytestJournal("/test", "session", "bounded", "build", f.store, f.markers, 1, { bytes: 2000, count: 2 });
    journal.append("error", "important"); journal.append("recording:event", "old input"); await journal.flush();
    journal.append("error", "important"); journal.append("run:update", "sample"); await journal.flush();
    const rows = f.entries.get("bounded")!;
    expect(rows.map(row => row.level)).toEqual(["error", "info"]);
    expect(rows[0].count).toBe(2);
    expect(f.pages.get("bounded")?.dropped).toBe(1);
    await journal.close();
  });
  it("enforces the shared storage budget by deleting closed pages only or refusing the write", () => {
    const f = fixture(), base: JournalPage = { id: "next", path: "/test", session: "s", build: "b", started: 1, updated: 1, closed: false, bytes: 30, dropped: 0 };
    const open = { ...base, id: "running", bytes: 60 }, closed = { ...base, id: "closed", closed: true, bytes: 40 };
    expect(journalPrunePlan([open, closed], base, 100)).toEqual(["closed"]);
    expect(journalPrunePlan([open], { ...base, bytes: 50 }, 100)).toBeNull();
    expect(f.pages.size).toBe(0);
  });
  it("reconciles evictions after a transient write failure instead of leaking stale rows", async () => {
    const f = fixture(), journal = new PlaytestJournal("/test", "session", "retry", "build", f.store, f.markers, 1, { bytes: 2000, count: 2 });
    journal.append("error", "keep"); journal.append("recording:event", "evict"); await journal.flush();
    const append = f.store.append;
    f.store.append = async () => { throw Error("transient quota"); };
    journal.append("run:update", "first"); await journal.flush();
    f.store.append = append;
    journal.append("run:update", "second"); await journal.flush();
    expect(f.entries.get("retry")?.map(row => row.data)).toEqual(["keep", "second"]);
    await journal.close();
  });
});
