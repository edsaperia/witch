import { afterEach, expect, it, vi } from "vitest";
import { canPickScreen, SettingsPage, type SettingsPageHost } from "./settingsPage";

const menuImport = vi.hoisted(() => {
  let resolve!: () => void;
  const ready = new Promise<void>(done => { resolve = done; });
  return { ready, resolve, constructed: vi.fn(), shown: vi.fn() };
});
vi.mock("../ui/settingsMenu", async () => {
  await menuImport.ready;
  return { SettingsMenu: class {
    open = false;
    constructor() { menuImport.constructed(); }
    show() { this.open = true; menuImport.shown(); }
    close() { this.open = false; }
  } };
});

afterEach(() => vi.unstubAllGlobals());
it("offers screen selection only when the browser implements screen details, without prompting", () => {
  vi.stubGlobal("window", {});
  expect(canPickScreen()).toBe(false);
  const getScreenDetails = vi.fn();
  vi.stubGlobal("window", { getScreenDetails });
  expect(canPickScreen()).toBe(true);
  expect(getScreenDetails).not.toHaveBeenCalled();
  vi.stubGlobal("window", { getScreenDetails: true });
  expect(canPickScreen()).toBe(false);
});

it("closing during the first Settings import cancels the open but keeps the loaded menu reusable", async () => {
  vi.stubGlobal("window", { addEventListener() {} });
  vi.stubGlobal("document", { createElement: () => ({ textContent: "" }), head: { append() {} }, addEventListener() {} });
  const tuning = { music: { volume: 1 }, sfx: { volume: 1, voice: {} }, combat: { shake: 1 }, attackFx: { legendFlash: 1 } };
  const page = new SettingsPage({ input: {}, shake: { shake: {} }, ladder: { choose() {} }, freeze: {}, audio() {}, tuning: () => tuning, version: "test" } as unknown as SettingsPageHost);
  page.show(); page.close(); menuImport.resolve();
  await vi.waitFor(() => expect(menuImport.constructed).toHaveBeenCalledOnce());
  expect(menuImport.shown).not.toHaveBeenCalled();
  expect(page.open).toBe(false);
  page.show();
  expect(menuImport.shown).toHaveBeenCalledOnce();
  expect(page.open).toBe(true);
  page.close(); expect(page.open).toBe(false);
});
