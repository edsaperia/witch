import { expect, it } from "vitest";
import { houseLayoutIdentity, usesEdLayout } from "./houseLayout";

it("defaults to Ed, keeps the ed alias and selects classic only explicitly", () => {
  expect(usesEdLayout(new URLSearchParams())).toBe(true);
  expect(usesEdLayout(new URLSearchParams("seed=123"))).toBe(true);
  expect(usesEdLayout(new URLSearchParams("layout=ed"))).toBe(true);
  expect(usesEdLayout(new URLSearchParams("layout=classic"))).toBe(false);
  expect(houseLayoutIdentity(new URLSearchParams())).toBe("ed");
  expect(houseLayoutIdentity(new URLSearchParams("layout=classic"))).toBe("classic");
});
