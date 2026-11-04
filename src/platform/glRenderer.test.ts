// The GPU's name (platform/glRenderer.ts) asked of WebGL once a context, not each time the playtest log or a tool wants it: each
// ask waits on the GPU (the frame-sync hunt, 2026-11-04). A lost context's null isn't kept.
import { describe, expect, it } from "vitest";
import { glRendererName } from "./glRenderer";
import { rendererOf } from "../app/compareKey";
import { gpuName } from "../app/ladder";

function fakeGL(names: (string | null)[]) {
  let asks = 0;
  const gl = { RENDERER: 0x1f01, getExtension: () => ({ UNMASKED_RENDERER_WEBGL: 0x9246 }), getParameter: (p: number) => { asks++; expect(p).toBe(0x9246); return names.shift() ?? null; } };
  return { gl: gl as unknown as WebGL2RenderingContext, asks: () => asks };
}

describe("the GPU's name", () => {
  it("is asked of WebGL once a context, however often it's wanted", () => {
    const { gl, asks } = fakeGL(["ANGLE (Intel, Iris)", "something else"]);
    for (let i = 0; i < 50; i++) expect(rendererOf(gl)).toBe("ANGLE (Intel, Iris)");
    expect(gpuName(gl)).toBe("ANGLE (Intel, Iris)");
    expect(asks()).toBe(1);
  });
  it("asks again after a lost context's null", () => {
    const { gl, asks } = fakeGL([null, "SwiftShader"]);
    expect(glRendererName(gl)).toBe(null);
    expect(glRendererName(gl)).toBe("SwiftShader");
    expect(glRendererName(gl)).toBe("SwiftShader");
    expect(asks()).toBe(2);
  });
});
