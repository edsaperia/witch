import { afterEach, describe, expect, it, vi } from "vitest";
import { DELETE_HOLD, SettingsMenu } from "./settingsMenu";
import { DEFAULTS } from "../app/playerSettings";

function menu(locked = false) {
  const choose = vi.fn(async (_id: string | null) => null as string | null);
  let slots = [{ id: "s1", name: "Save 1", created: 1, updated: 2, island: "home", nights: 3 }, { id: "s2", name: "Save 2", created: 1, updated: 3 }];
  const remove = vi.fn(async (id: string) => { slots = slots.filter(s => s.id !== id); return null as string | null; });
  const host = { get: () => DEFAULTS, canPickScreen: () => false, saves: { active: () => "s1", list: () => slots, choose, delete: remove, locked: () => locked } };
  const m = Object.assign(Object.create(SettingsMenu.prototype) as object, { host, device: "keys", mode: "keys", render: vi.fn(), state: { tab: 5, row: 0 }, el: { querySelector: () => null } }) as unknown as SettingsMenu;
  return { m, choose, remove, press: (id: string) => (m as unknown as { press(id: string): Promise<void> }).press(id) };
}
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });
describe("Saves settings tab", () => {
  it("lists the active save with island/night/date summary and a new-save action", () => {
    const { m } = menu(), rows = m.tabs()[5];
    expect(rows.map(r => r.id)).toEqual(["save:s1", "save:s2", "save:new"]);
    expect(rows[0].label).toContain("Current"); expect(rows[0].sub).toContain("home · 3 nights recorded");
    expect(rows[2].sub).toContain("default settings");
  });
  it("opens new/different slots through the host and does not restart the current slot", async () => {
    const { press, choose } = menu();
    await press("save:s1"); expect(choose).not.toHaveBeenCalled();
    await press("save:new"); expect(choose).toHaveBeenLastCalledWith(null);
    await press("save:s2"); expect(choose).toHaveBeenLastCalledWith("s2");
  });
  // (Ed, 2026-11-02: "a way to delete saves in the settings menu. (probably a 🗑️ next to each save file, hold to delete)")
  it("Delete (or △) held on a save's row deletes it after the hold; let go sooner, or move, and nothing is deleted", async () => {
    vi.useFakeTimers(); vi.stubGlobal("requestAnimationFrame", (f: () => void) => setTimeout(f, 16)); vi.stubGlobal("cancelAnimationFrame", (id: number) => clearTimeout(id));
    const { m, remove } = menu();
    m.input("reset"); vi.advanceTimersByTime(DELETE_HOLD / 2); m.input("down"); vi.advanceTimersByTime(DELETE_HOLD * 2);
    expect(remove).not.toHaveBeenCalled();
    m.input("reset"); vi.advanceTimersByTime(DELETE_HOLD + 50); await vi.runAllTimersAsync();
    expect(remove).toHaveBeenCalledExactlyOnceWith("s2");
    expect((m as unknown as { status: string }).status).toBe("Save 2 deleted.");
    expect(m.tabs()[5].map(r => r.id)).toEqual(["save:s1", "save:new"]);
    expect(m.tabs()[5][(m as unknown as { state: { row: number } }).state.row].id).toBe("save:new"); // (the focus stays on the row below)
    m.input("reset"); vi.advanceTimersByTime(DELETE_HOLD * 2);
    expect(remove).toHaveBeenCalledOnce(); // ("New save" has no 🗑️)
  });
  it("deleting the current save goes through the host (which reloads); nothing is deleted during a visit", async () => {
    const { m, remove } = menu(), del = (menu: SettingsMenu, id: string) => (menu as unknown as { deleteSave(id: string): Promise<void> }).deleteSave(id);
    await del(m, "s1"); expect(remove).toHaveBeenCalledWith("s1");
    expect((m as unknown as { status: string }).status).toContain("Opening your most recent save");
    const visiting = menu(true);
    await del(visiting.m, "s2"); visiting.m.input("reset");
    expect(visiting.remove).not.toHaveBeenCalled();
  });
});
