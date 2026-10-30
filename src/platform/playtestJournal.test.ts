import { describe, expect, it } from "vitest";
import { PlaytestJournal, type JournalEntry, type JournalMarker, type JournalPage, type JournalStore } from "./playtestJournal";

function fixture() {
  const pages = new Map<string, JournalPage>(), entries = new Map<string, JournalEntry[]>();
  let marker: JournalMarker | null = null;
  const store: JournalStore = {
    list: async path => [...pages.values()].filter(p => p.path === path),
    append: async (page, rows) => { pages.set(page.id, structuredClone(page)); entries.set(page.id, [...(entries.get(page.id) ?? []), ...structuredClone(rows)]); },
    read: async id => structuredClone(entries.get(id) ?? []),
    prune: async ids => { for (const id of ids) { pages.delete(id); entries.delete(id); } },
  };
  const markers = { read: () => marker, write: (value: JournalMarker) => { marker = structuredClone(value); } };
  const open = (id: string, now = 1, session = "session") => new PlaytestJournal("/test", session, id, "build", store, markers, now);
  return { store, markers, open, pages, entries };
}

describe("incremental playtest journal", () => {
  it("keeps committed records and the last fifty notable events after an unexpected reload", async () => {
    const f = fixture(), first = f.open("first");
    first.append("input", { tick: 1 });
    for (let i = 0; i < 55; i++) first.notable({ build: "build", t: i, island: "fox", at: i, kind: "quest", message: String(i) });
    await first.flush();
    const second = f.open("second", 2);
    expect(await second.ready).toEqual({ unexpected: true, persistent: true });
    const saved = await second.download() as { previous: { entries: JournalEntry[] }[]; previousMarker: JournalMarker };
    expect(saved.previous[0].entries[0].payload).toEqual({ tick: 1 });
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
  it("leaves the unexpected-end marker after storage failure without throwing", async () => {
    const f = fixture(), page = f.open("first"); await page.ready;
    f.store.append = async () => { throw Error("quota"); };
    page.append("input", { tick: 1 }); await page.close();
    expect(f.markers.read()?.active).toBe(true);
    const log = await page.download() as { persistent: boolean; unsaved: JournalEntry[] };
    expect(log.persistent).toBe(false);
    expect(log.unsaved.map(row => row.payload)).toEqual([{ tick: 1 }]);
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
});
