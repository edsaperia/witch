// The DJ booth's choosing (ui/djBooth.ts BoothNav; Ed, 2026-10-29: "select a record ... Underneath there's a button that says
// 'Get this party started' which you can press once a record is selected").
import { describe, expect, it } from "vitest";
import { BoothNav } from "./djBooth";
import { RECORDS } from "../rules/records";

const own = new Set(["record-100", "record-120"]), at = (id: string) => RECORDS.findIndex(r => r.id === id);

describe("the DJ booth", () => {
  it("starts on her first record, none chosen; the button does nothing till one is", () => {
    const n = new BoothNav(own);
    expect(n.focus).toBe(0); expect(n.ready).toBe(false);
    n.move(0, 1); expect(n.onButton).toBe(true);
    expect(n.pick().did).toBe("none");
  });
  it("chooses a record she has, not one she hasn't found; then the button starts the party with it", () => {
    const n = new BoothNav(own);
    n.move(1, 0); expect(n.pick()).toMatchObject({ did: "locked" }); expect(n.ready).toBe(false); // (110: a find)
    n.move(1, 0); expect(n.pick()).toMatchObject({ did: "chose", record: { bpm: 120 } });
    n.move(0, 1); expect(n.pick()).toMatchObject({ did: "start", record: { id: "record-120", bpm: 120 } });
    n.move(0, -1); expect(n.focus).toBe(at("record-120")); // (back up onto the record chosen)
  });
  it("opens with last time's record chosen and in focus, if she still has it", () => {
    expect(new BoothNav(own, "record-120")).toMatchObject({ chosen: "record-120", focus: at("record-120") });
    expect(new BoothNav(own, "record-150").chosen).toBeNull();
  });
});
