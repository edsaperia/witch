import { describe, expect, it, vi } from "vitest";
import { VeilReadback } from "./veilReadback";

function fixture() {
  let signalled = false;
  const old = {}, buffer = {}, fence = {};
  const gl = {
    PIXEL_PACK_BUFFER: 1, PIXEL_PACK_BUFFER_BINDING: 2, STREAM_READ: 3, RGBA: 4, UNSIGNED_BYTE: 5,
    SYNC_GPU_COMMANDS_COMPLETE: 6, SYNC_STATUS: 7, SIGNALED: 8,
    isContextLost: vi.fn(() => false), getParameter: vi.fn(() => old),
    createBuffer: vi.fn(() => buffer), bindBuffer: vi.fn(), bufferData: vi.fn(), readPixels: vi.fn(),
    fenceSync: vi.fn(() => fence), deleteSync: vi.fn(),
    getSyncParameter: vi.fn(() => signalled ? 8 : 0), getBufferSubData: vi.fn(), flush: vi.fn(),
  };
  return { gl, old, ready: () => { signalled = true; }, reader: new VeilReadback(gl as unknown as WebGL2RenderingContext, 256) };
}
describe("smoke veil readback", () => {
  it("never copies a pending frame or flushes, and restores the caller's buffer binding", () => {
    const { gl, old, reader, ready } = fixture(), pixels = new Uint8Array(256);
    expect(reader.issue(64)).toBe(true);
    expect(reader.issue(64)).toBe(false);
    expect(reader.poll(pixels)).toBe(false);
    expect(gl.getSyncParameter).toHaveBeenCalledTimes(1);
    expect(gl.getBufferSubData).not.toHaveBeenCalled();
    ready(); expect(reader.poll(pixels)).toBe(true);
    expect(reader.poll(pixels)).toBe(false);
    expect(gl.getBufferSubData).toHaveBeenCalledTimes(1);
    expect(gl.bindBuffer).toHaveBeenLastCalledWith(gl.PIXEL_PACK_BUFFER, old);
    expect(gl.flush).not.toHaveBeenCalled();
  });
  it("cancels an old night and reuses its allocation", () => {
    const { gl, reader, ready } = fixture();
    reader.issue(64); reader.cancel(); ready();
    expect(reader.poll(new Uint8Array(256))).toBe(false);
    expect(gl.deleteSync).toHaveBeenCalledTimes(1);
    reader.issue(64);
    expect(gl.createBuffer).toHaveBeenCalledTimes(1);
    expect(gl.bufferData).toHaveBeenCalledTimes(1);
  });
  it("does not issue GPU work after context loss or allocation failure", () => {
    const { gl, reader } = fixture();
    gl.isContextLost.mockReturnValue(true);
    expect(reader.issue(64)).toBe(false);
    expect(gl.readPixels).not.toHaveBeenCalled();
  });
});
