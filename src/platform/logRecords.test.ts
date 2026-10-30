import { expect, it } from "vitest";
import { LogRecords, readableRecords } from "./logRecords";
const context = { build: "test", t: 1, island: "fox" };
it("keeps full context and folds equivalent repeated records with both time ranges", () => {
  const log = new LogRecords();
  log.add("warn", "fixture", { value: 2 }, context, 1000);
  log.add("warn", "fixture", { value: 2 }, { ...context, t: 2 }, 2000);
  expect(log.all()).toEqual([{ seq: 1, level: "warn", at: 1000, lastAt: 2000, ...context, lastT: 2, message: "fixture", data: { value: 2 }, count: 2 }]);
  expect(readableRecords(log.all())).toContain("WARN test fox game=1 fixture ×2");
  log.add("warn", "fixture", { value: 2 }, { ...context, island: "bear" }, 2100);
  expect(log.all()).toHaveLength(2);
});
it("evicts debug then info before warning/error under both count and byte caps", () => {
  const log = new LogRecords(1500, 3);
  log.add("error", "important", {}, context, 1);
  log.add("info", "info", {}, context, 2);
  log.add("debug", "debug", {}, context, 3);
  log.add("warn", "warning", {}, context, 4);
  expect(log.all().map(r => r.level)).toEqual(["error", "info", "warn"]);
  log.add("error", "large", "x".repeat(650), context, 5);
  expect(log.bytes).toBeLessThanOrEqual(1500);
  expect(log.all().some(r => r.message === "important")).toBe(true);
  expect(log.dropped.debug).toBe(1); expect(log.dropped.info).toBe(1);
});
it("reports invalid data and an entry too large to retain without throwing or executing it", () => {
  const log = new LogRecords(500, 3), cyclic: { self?: unknown } = {}; cyclic.self = cyclic;
  log.add("error", "cyclic", cyclic, context, 1);
  expect(log.all()[0].data).toEqual({ omitted: "Non-JSON diagnostic data" });
  log.add("debug", "oversize", "x".repeat(1000), context, 2);
  expect(log.all()).toHaveLength(1); expect(log.dropped).toMatchObject({ debug: 1, invalid: 1 });
  expect(log.bytes).toBeLessThanOrEqual(500);
});
it("folds errors despite changing attached trails and renders their stack with actual line breaks", () => {
  const log = new LogRecords();
  log.add("error", "failure", { stack: "failure\n  at fixture", trail: [1] }, context, 1);
  log.add("error", "failure", { stack: "failure\n  at fixture", trail: [2] }, context, 2);
  expect(log.all()[0]).toMatchObject({ count: 2, data: { trail: [2] } });
  expect(readableRecords(log.all())).toContain("failure\n  at fixture");
});
