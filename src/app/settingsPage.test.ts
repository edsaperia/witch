import { afterEach, expect, it, vi } from "vitest";
import { canPickScreen } from "./settingsPage";

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
