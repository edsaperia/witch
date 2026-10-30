import { describe, expect, it, vi } from "vitest";
import { SettingsMenu } from "./settingsMenu";
import { DEFAULTS } from "../app/playerSettings";

function menu() {
  const choose = vi.fn(async (_id: string | null) => null as string | null);
  const host = { get: () => DEFAULTS, canPickScreen: () => false, saves: { active: () => "s1", list: () => [{ id: "s1", name: "Save 1", created: 1, updated: 2, island: "home", nights: 3 }], choose } };
  const m = Object.assign(Object.create(SettingsMenu.prototype) as object, { host, device: "keys", render: vi.fn(), state: { tab: 5, row: 0 } }) as unknown as SettingsMenu;
  return { m, choose, press: (id: string) => (m as unknown as { press(id: string): Promise<void> }).press(id) };
}
describe("Saves settings tab", () => {
  it("lists the active save with island/night/date summary and a new-save action", () => {
    const { m } = menu(), rows = m.tabs()[5];
    expect(rows.map(r => r.id)).toEqual(["save:s1", "save:new"]);
    expect(rows[0].label).toContain("Current"); expect(rows[0].sub).toContain("home · 3 nights recorded");
    expect(rows[1].sub).toContain("default settings");
  });
  it("opens new/different slots through the host and does not restart the current slot", async () => {
    const { press, choose } = menu();
    await press("save:s1"); expect(choose).not.toHaveBeenCalled();
    await press("save:new"); expect(choose).toHaveBeenLastCalledWith(null);
    await press("save:s2"); expect(choose).toHaveBeenLastCalledWith("s2");
  });
});
