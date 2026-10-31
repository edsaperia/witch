import { expect, it, vi } from "vitest";
import { partFound, loadBroom } from "./broomSave";
import { chooseRecord, lastRecord } from "./recordSave";
import { PART_IDS } from "../rules/broomParts";
import { START_RECORDS } from "../rules/records";
import { fallbackStorage } from "./storageFallback";
import { DEFAULTS, loadSettings, saveSettings } from "./playerSettings";

it("keeps broom finds and record choices when storage reads old data but refuses writes", () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  const store = { getItem: () => null, setItem: () => { throw new Error("quota"); } };
  try {
    expect(partFound(PART_IDS[0], store).found).toContain(PART_IDS[0]);
    expect(loadBroom(store).found).toContain(PART_IDS[0]);
    chooseRecord(START_RECORDS[0], store);
    expect(lastRecord(store)).toBe(START_RECORDS[0]);
    expect(warn).toHaveBeenCalled();
    expect(loadBroom({ getItem: () => null, setItem: () => {} }).found).not.toContain(PART_IDS[0]);
  } finally { warn.mockRestore(); }
});

it("retains settings after refused writes and resumes reading shared storage after a successful retry", () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  let raw: string | null = JSON.stringify(DEFAULTS), blocked = true;
  const underlying = { getItem: () => raw, setItem: (_key: string, value: string) => { if (blocked) throw new Error("quota"); raw = value; } };
  const store = fallbackStorage(underlying);
  try {
    expect(saveSettings({ ...DEFAULTS, music: 0.2 }, store)).toBe(false);
    expect(loadSettings(store).music).toBe(0.2);
    blocked = false;
    expect(saveSettings({ ...DEFAULTS, music: 0.3 }, store)).toBe(true);
    raw = JSON.stringify({ ...DEFAULTS, music: 0.7 }); // another tab's successful change
    expect(loadSettings(store).music).toBe(0.7);
    expect(warn).toHaveBeenCalledTimes(1);
  } finally { warn.mockRestore(); }
});

it("plays with no accessible browser storage, keeping failed writes in this page", () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.stubGlobal("localStorage", undefined);
  try {
    const store = fallbackStorage();
    expect(() => store.setItem("test.missing", "choice")).toThrow();
    expect(fallbackStorage().getItem("test.missing")).toBe("choice");
    const warnings = warn.mock.calls.length;
    expect(warnings).toBeGreaterThan(0);
    expect(() => store.setItem("test.missing", "new choice")).toThrow();
    expect(fallbackStorage().getItem("test.missing")).toBe("new choice");
    expect(warn.mock.calls).toHaveLength(warnings); // Failed keys are logged once, never on every autosave.
  } finally { vi.unstubAllGlobals(); warn.mockRestore(); }
});
