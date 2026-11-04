// The isolated project's files (tools/ci/mockingTests.mjs, vite.config.ts): every test that vi.mocks a module, and no other.
import { describe, expect, it } from "vitest";
import { MOCKS, mockingTests } from "./mockingTests.mjs";

describe("the tests run isolated", () => {
  it("are the ones with a hoisted vi.mock, not a commented one or vi.doMock", () => {
    const mock = ["vi", "mock"].join("."); // (spelt apart, so this file isn't one of them)
    expect(MOCKS.test(`${mock}("./dom", () => ({}));`)).toBe(true);
    expect(MOCKS.test(`import x from "y";\n${mock}("../height", async importOriginal => ({}));`)).toBe(true);
    expect(MOCKS.test(`// ${mock}("./dom") would leak`)).toBe(false);
    expect(MOCKS.test('vi.doMock("./artBuild", () => ({}));')).toBe(false);
  });
  it("include the files that mocked shared modules (scenery's leaked into zooPad, 2026-11-03)", () => {
    const files = mockingTests(".");
    expect(files).toContain("src/render/view/scenery.test.ts");
    expect(files).toContain("src/ui/nightSaveNotice.test.ts");
    expect(files).not.toContain("tools/ci/mockingTests.test.ts");
    expect(files.every(f => f.endsWith(".test.ts") && !f.includes("\\"))).toBe(true);
  });
});
