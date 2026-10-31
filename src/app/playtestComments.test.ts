import { describe, expect, it, vi, afterEach } from "vitest";
import { newGame, stepGame, STEP } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { restoreGame, snapshotGame } from "../rules/nightSnapshot";
import { restoreSettingsBase } from "./playerSettings";
import { Breadcrumbs, browserCommentStore, captureComment, CommentBook, COMMENT_BYTES, COMMENT_COUNT, parseComment, parseCommentFile, encodeStoredComments, decodeStoredComments, type RetainedComment } from "./playtestComments";
import { packLog, unpackLog, jsonBytes } from "../platform/logCodec";
import { InputRecorder } from "../platform/inputRecording";
import { readablePlaytest, type PlaytestRun } from "../platform/playtestLog";
import { notable } from "../platform/playtestJournal";

function fixture() {
  // Four areas suffice for comment storage/continuation; full-roster snapshot coverage lives in nightSnapshot.test.ts.
  const t = structuredClone(TUNING); t.map!.islandAreas = 4;
  const game = newGame(123, t); restoreSettingsBase(game.tuning, { voices: {}, shake: 1, legendFlash: 1 });
  game.clock.paused = false;
  for (let i = 0; i < 45; i++) stepGame(game, { moveX: 1, moveZ: 0, toggleMode: false, zoom: 0 }, STEP);
  game.clock.paused = true;
  const context = { build: "fixture", params: "seed=123", look: null, loan: null, flags: { chartRecorded: false, overRecorded: false } };
  return { game, context };
}

describe("paused playtest comments", () => {
  afterEach(() => vi.unstubAllGlobals());
  it("roundtrips the actual played moment and continues from the same random/state cursor", async () => {
    const { game, context } = fixture(), trail = new Breadcrumbs();
    trail.add(game, "input", { moveX: 1 });
    notable("quest", "Quest fixture");
    const c = captureComment(game, "She is stuck here", context, "?seed=123&at=1,2", { "music.volume": 0.2 }, trail.recent(game), 1234);
    const selected = parseComment(JSON.stringify([{ comments: [c] }]), "fixture");
    expect(await decodeStoredComments(await encodeStoredComments([c]))).toEqual([c]);
    expect(await parseCommentFile(JSON.stringify(await packLog([{ comments: [c] }])), "fixture")).toEqual(selected);
    expect(selected.trail?.at(-1)?.message).toBe("Quest fixture");
    const restored = restoreGame(selected.night.game);
    expect(snapshotGame(restored)).toEqual(snapshotGame(game));
    expect(selected).toMatchObject({ at: 1234, text: "She is stuck here", build: "fixture", t: game.clock.time, wave: game.party.wave, witch: { x: game.witch.x, z: game.witch.z, hp: game.witches[0].health.hp } });
    game.clock.paused = restored.clock.paused = false;
    const controls = { moveX: 0, moveZ: 1, toggleMode: false, zoom: 0 };
    for (let i = 0; i < 30; i++) { stepGame(game, controls, STEP); stepGame(restored, controls, STEP); }
    expect(snapshotGame(restored)).toEqual(snapshotGame(game));
  });
  it("rejects oversized, malformed and wrong-build bundles instead of restoring an approximate link", () => {
    const { game, context } = fixture();
    expect(() => captureComment(game, " ", context, "", {}, [])).toThrow();
    expect(() => captureComment(game, "x".repeat(2001), context, "", {}, [])).toThrow();
    const c = captureComment(game, "test", context, "", {}, []);
    expect(() => parseComment(JSON.stringify(c), "another build")).toThrow(/build/);
    expect(() => parseComment('{"version":1}', "fixture")).toThrow();
    expect(() => parseComment(JSON.stringify({ ...c, repro: "x".repeat(COMMENT_BYTES) }), "fixture")).toThrow();
  });
  it("keeps every report across count pressure and reload; unread storage is never overwritten", async () => {
    let saved: RetainedComment[] = [];
    const store = { read: async () => structuredClone(saved), write: async (rows: RetainedComment[]) => { saved = structuredClone(rows); } };
    const book = new CommentBook(store), { game, context } = fixture();
    const c = captureComment(game, "test", context, "", {}, []);
    for (let i = 0; i < COMMENT_COUNT + 2; i++) expect(await book.add({ ...c, id: String(i) })).toBe(true);
    const reloaded = await new CommentBook(store).all();
    expect(reloaded).toHaveLength(COMMENT_COUNT + 2); expect(reloaded[0].id).toBe("0");
    expect(reloaded.filter(row => row.night)).toHaveLength(COMMENT_COUNT);
    expect(reloaded[0]).toMatchObject({ text: "test", context: c.context, omission: expect.stringContaining("retention limit") });
    const write = vi.fn();
    const blocked = new CommentBook({ read: async () => { throw Error("legacy read failed"); }, write });
    expect(await blocked.add(c)).toBe(false); expect(await blocked.all()).toEqual([c]);
    expect(write).not.toHaveBeenCalled(); expect(blocked.status().error).toContain("legacy read failed");
    const quota = new CommentBook({ read: async () => saved, write: async () => { throw new DOMException("disk full", "QuotaExceededError"); } });
    expect(await quota.add({ ...c, id: "quota" })).toBe(false);
    expect((await quota.all()).at(-1)?.text).toBe("test"); expect(quota.status().error).toContain("QuotaExceededError: disk full");
  });
  it("preserves legacy report text through production-sized duplicated replay pressure, reload and both exports", async () => {
    const { game, context } = fixture();
    const c = captureComment(game, "unwanted hat marker", context, "?seed=123", { strength: 2 }, []);
    const recorder = new InputRecorder(game, "fixture", () => c.night), tape = recorder.export();
    // Observed reports: ~16.69 MiB each, ~16.18 MiB duplicated replay. This is synthetic storage data, not a gameplay simulation.
    const first = { kind: "frame" as const, fromStep: 0, toStep: 1, frame: { tick: 1, dt: STEP, inputs: [{ moveX: 1, moveZ: 0, toggleMode: false, zoom: 0, framePart: "synthetic storage fixture" }] } };
    const events = Array.from({ length: 80_000 }, (_, i) => ({ ...first, fromStep: i, toStep: i + 1, frame: { ...first.frame, tick: i + 1 } }));
    tape.events = events;
    // Add a legitimate-sized saved context to match the measured total without needing a large generated world.
    c.night.look = { fixture: "x".repeat(520_000) };
    c.context = { ...c.context!, look: c.night.look };
    c.recording = tape;
    const size = jsonBytes(c);
    expect(size).toBeGreaterThan(16 * 1024 * 1024); expect(size).toBeLessThan(18 * 1024 * 1024);
    const legacy = Array.from({ length: 7 }, (_, i) => ({ ...c, id: `report-${i}`, text: i === 1 ? "suggestion: try this" : `written report ${i}`, at: 1234 + i }));
    const migrated = await decodeStoredComments(legacy);
    expect(migrated).toHaveLength(7); expect(migrated.filter(row => row.night)).toHaveLength(3);
    let stored: unknown = await encodeStoredComments(migrated);
    const book = new CommentBook({ read: () => decodeStoredComments(stored), write: async rows => { stored = await encodeStoredComments(rows); return decodeStoredComments(stored); } });
    expect(await book.add({ ...c, id: "report-7", text: "new report", at: 1241 })).toBe(true);
    const rows = await new CommentBook({ read: () => decodeStoredComments(stored), write: async () => {} }).all();
    expect(rows.map(row => row.text)).toEqual([...legacy.map(row => row.text), "new report"]);
    expect(rows[1]).toMatchObject({ id: "report-1", at: 1235, build: "fixture", repro: "?seed=123", changed: { strength: 2 }, witch: c.witch, island: c.island, omission: expect.stringContaining("retention limit"), context: { params: context.params } });
    expect(rows.filter(row => row.night)).toHaveLength(3);
    const run = { seed: 123, build: "fixture", started: "2026-10-31", interval: 1, samples: [], comments: rows };
    const downloaded = await unpackLog(await packLog([run])) as typeof run[];
    expect(downloaded[0].comments.map(row => row.text)).toEqual(rows.map(row => row.text));
    expect(readablePlaytest([run as PlaytestRun])).toContain("suggestion: try this");
    expect(() => parseComment(JSON.stringify(rows[1]), "fixture")).toThrow(/cannot restore/);
    expect(await parseCommentFile(JSON.stringify(await packLog([run])), "fixture")).toMatchObject({ id: "report-7", night: c.night });
  }, 30_000);
  it("migrates v1 packed comments and retains oversized moments as written reports", async () => {
    const { game, context } = fixture(), c = captureComment(game, "keep my words", context, "", {}, []);
    const legacy = { format: "witch-comments/v1", bundles: [await packLog(c)] };
    expect(await decodeStoredComments(legacy)).toEqual([c]);
    const huge = { ...c, id: "huge", night: { ...c.night, look: { fixture: "x".repeat(COMMENT_BYTES) } } };
    const book = new CommentBook({ read: async () => [c], write: async () => {} });
    expect(await book.add(huge)).toBe(true);
    const rows = await book.all();
    expect(rows).toHaveLength(2); expect(rows[1].text).toBe("keep my words"); expect(rows[1].night).toBeUndefined();
    expect(rows[1].omission).toContain("retention limit");
  });
  it("commits text before attachments, exposes a real attachment-write error and reloads every word", async () => {
    const data = new Map<string, unknown>();
    let writes = 0;
    // Transaction-boundary fake: a failed transaction never commits its pending put.
    const db = { transaction: () => {
      const tx = { error: null as DOMException | null, oncomplete: () => {}, onerror: () => {}, onabort: () => {}, objectStore: () => ({
        get: (key: string) => ({ result: structuredClone(data.get(key)) }),
        put: (value: unknown, key: string) => {
          const fail = ++writes === 2;
          if (fail) tx.error = new DOMException("attachment disk full", "QuotaExceededError");
          else pending = () => data.set(key, structuredClone(value));
          return { error: tx.error };
        }
      }) };
      let pending = () => {};
      queueMicrotask(() => { if (tx.error) tx.onabort(); else { pending(); tx.oncomplete(); } });
      return tx;
    } };
    vi.stubGlobal("indexedDB", { open: () => {
      const request = { result: db, onsuccess: () => {}, onerror: () => {}, onblocked: () => {} };
      queueMicrotask(() => request.onsuccess()); return request;
    } });
    vi.stubGlobal("sessionStorage", { getItem: () => "fixture-session", setItem: () => {} });
    vi.stubGlobal("location", { pathname: "/pr-fixture/" });
    const { game, context } = fixture(), c = captureComment(game, "hat marker and suggestion survive", context, "?seed=123", {}, []);
    const book = new CommentBook(browserCommentStore());
    expect(await book.add(c)).toBe(true); // Text transaction succeeded; moment transaction did not.
    expect(book.status()).toMatchObject({ persistent: true, omitted: 1 });
    const rows = await new CommentBook(browserCommentStore()).all();
    expect(rows).toHaveLength(1); expect(rows[0]).toMatchObject({ text: c.text, context: c.context, omission: expect.stringContaining("QuotaExceededError: attachment disk full") });
    expect(rows[0].night).toBeUndefined(); expect(writes).toBe(3);
  });
  it("copies only the recent 30 seconds and caps a noisy breadcrumb stream", () => {
    const { game } = fixture(), trail = new Breadcrumbs();
    game.clock.time = 0; trail.add(game, "quest", { state: 1 });
    game.clock.time = 31; const control = { moveX: 1 }; trail.add(game, "input", control); control.moveX = 2;
    expect(trail.recent(game).map(r => r.data)).toEqual([{ moveX: 1 }]);
    for (let i = 0; i < 600; i++) trail.add(game, "input", { moveX: i });
    expect(trail.recent(game)).toHaveLength(512);
  });
});
