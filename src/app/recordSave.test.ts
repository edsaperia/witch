// Her records kept (app/recordSave.ts; Ed, 2026-10-29: "Start with 100 and 120"): the starting ones always hers, finds added and
// dropped, the last chosen remembered, Unlock everything offering every one.
import { describe, expect, it } from "vitest";
import { chooseRecord, lastRecord, ownedRecords, recordDropped, recordFound } from "./recordSave";
import { RECORDS, RECORD_FINDS, START_RECORDS } from "../rules/records";
import { FIND_KINDS } from "../rules/finds";
import { UNLOCK_KEY } from "./debugUnlock";

const store = () => { const m = new Map<string, string>(); return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), removeItem: (k: string) => void m.delete(k), m }; };

describe("her records", () => {
  it("are every 10 bpm from 100 to 200 (Ed, 2026-10-29: \"full set from 100 to 200, but only every 10 bpm\"); she starts with 100 and 120, the other 9 are finds", () => {
    expect(RECORDS.map(r => r.bpm)).toEqual([100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200]);
    expect(START_RECORDS).toEqual(["record-100", "record-120"]);
    expect(RECORD_FINDS.length).toBe(9); expect(RECORD_FINDS).not.toContain("record-100"); expect(RECORD_FINDS).not.toContain("record-120");
    expect(FIND_KINDS.find(k => k.id === "record")!.items).toEqual(RECORD_FINDS);
  });
  it("keeps the starting ones always, adds and drops finds, remembers the last chosen while she has it", () => {
    const s = store();
    expect(ownedRecords(s)).toEqual(["record-100", "record-120"]);
    expect(lastRecord(s)).toBeNull();
    recordFound("record-130", s); recordFound("record-100", s); // (a starting one isn't a find: nothing changes)
    expect(ownedRecords(s)).toEqual(["record-100", "record-120", "record-130"]); // (slowest first)
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
