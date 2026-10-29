// Her records kept (app/recordSave.ts; Ed, 2026-10-29: "Start with 100 and 120"): the starting ones always hers, finds added and
// dropped, the last chosen remembered, Unlock everything offering every one.
import { describe, expect, it } from "vitest";
import { chooseRecord, lastRecord, ownedRecords, recordDropped, recordFound } from "./recordSave";
import { RECORDS, RECORD_FINDS, START_RECORDS } from "../rules/records";
import { FIND_KINDS } from "../rules/finds";
import { UNLOCK_KEY } from "./debugUnlock";

const store = () => { const m = new Map<string, string>(); return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), removeItem: (k: string) => void m.delete(k), m }; };

describe("her records", () => {
  it("are 100, 110, 120 and 130 bpm (Ed, 2026-10-29: \"just 100, 110, 120, 130 bpm records\"); she starts with 100 and 120, the others are finds", () => {
    expect(RECORDS.map(r => r.bpm)).toEqual([100, 110, 120, 130]);
    expect(START_RECORDS).toEqual(["record-100", "record-120"]);
    expect(RECORD_FINDS).toEqual(["record-110", "record-130"]);
    expect(FIND_KINDS.find(k => k.id === "record")!.items).toEqual(RECORD_FINDS);
  });
  it("keeps the starting ones always, adds and drops finds, remembers the last chosen while she has it", () => {
    const s = store();
    expect(ownedRecords(s)).toEqual(["record-100", "record-120"]);
    expect(lastRecord(s)).toBeNull();
    recordFound("record-130", s); recordFound("record-100", s); // (a starting one isn't a find: nothing changes)
    expect(ownedRecords(s)).toEqual(["record-100", "record-120", "record-130"]);
    chooseRecord("record-130", s); expect(lastRecord(s)).toBe("record-130");
    recordDropped("record-130", s); expect(ownedRecords(s)).toEqual(["record-100", "record-120"]); expect(lastRecord(s)).toBeNull();
    chooseRecord("no-such", s); expect(lastRecord(s)).toBeNull();
  });
  it("with Unlock everything on, offers every record, writing nothing", () => {
    const s = store(); s.setItem(UNLOCK_KEY, "1");
    expect(ownedRecords(s)).toEqual(RECORDS.map(r => r.id));
    expect(s.m.has("witch.records")).toBe(false);
  });
});
