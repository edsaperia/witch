import { describe, expect, it } from "vitest";
import { newGame, stepGame, STEP } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { restoreGame, snapshotGame } from "../rules/nightSnapshot";
import { restoreSettingsBase } from "./playerSettings";
import { Breadcrumbs, captureComment, CommentBook, COMMENT_BYTES, COMMENT_COUNT, parseComment, parseCommentFile, encodeStoredComments, decodeStoredComments, type PlaytestComment } from "./playtestComments";
import { packLog } from "../platform/logCodec";
import { notable } from "../platform/playtestJournal";

function fixture() {
  const t = structuredClone(TUNING); t.map!.islandAreas = 10;
  const game = newGame(123, t); restoreSettingsBase(game.tuning, { voices: {}, shake: 1, legendFlash: 1 });
  game.clock.paused = false;
  for (let i = 0; i < 45; i++) stepGame(game, { moveX: 1, moveZ: 0, toggleMode: false, zoom: 0 }, STEP);
  game.clock.paused = true;
  const context = { build: "fixture", params: "seed=123", look: null, loan: null, flags: { chartRecorded: false, overRecorded: false } };
  return { game, context };
}

describe("paused playtest comments", () => {
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
  it("retains bounded whole comments across repository reload and exposes page-only storage failure", async () => {
    let saved: PlaytestComment[] = [];
    const store = { read: async () => structuredClone(saved), write: async (rows: PlaytestComment[]) => { saved = structuredClone(rows); } };
    const book = new CommentBook(store), { game, context } = fixture();
    const c = captureComment(game, "test", context, "", {}, []);
    for (let i = 0; i < COMMENT_COUNT + 2; i++) expect(await book.add({ ...c, id: String(i) })).toBe(true);
    const reloaded = await new CommentBook(store).all();
    expect(reloaded).toHaveLength(COMMENT_COUNT); expect(reloaded[0].id).toBe("2");
    const blocked = new CommentBook({ read: async () => { throw Error("blocked"); }, write: async () => { throw Error("blocked"); } });
    expect(await blocked.add(c)).toBe(false); expect(await blocked.all()).toEqual([c]);
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
