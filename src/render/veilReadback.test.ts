import { describe, expect, it, vi } from "vitest";
import { VeilReadback } from "./veilReadback";

function fixture() {
  let signalled = false, tick = 0;
  const old = {}, buffer = {}, fence = {};
  const gl = {
    PIXEL_PACK_BUFFER: 1, PIXEL_PACK_BUFFER_BINDING: 2, STREAM_READ: 3, RGBA: 4, UNSIGNED_BYTE: 5,
    SYNC_GPU_COMMANDS_COMPLETE: 6, SYNC_STATUS: 7, SIGNALED: 8,
    isContextLost: vi.fn(() => false), getParameter: vi.fn(() => old),
    createBuffer: vi.fn(() => buffer), bindBuffer: vi.fn(), bufferData: vi.fn(), readPixels: vi.fn(),
    fenceSync: vi.fn(() => fence), deleteSync: vi.fn(),
    getSyncParameter: vi.fn(() => signalled ? 8 : 0), getBufferSubData: vi.fn(), flush: vi.fn(),
  };
  return { gl, old, ready: () => { signalled = true; }, reader: new VeilReadback(gl as unknown as WebGL2RenderingContext, 256, () => ++tick) };
}
describe("smoke veil readback", () => {
  it("never copies a pending frame or flushes, and leaves its owned buffer scope unbound without a getter", () => {
    const { gl, reader, ready } = fixture(), pixels = new Uint8Array(256);
    expect(reader.issue(64)).toBe(true);
    expect(reader.issue(64)).toBe(false);
    expect(reader.poll(pixels, 1)).toBe(false);
    expect(gl.getSyncParameter).toHaveBeenCalledTimes(1);
    expect(gl.getBufferSubData).not.toHaveBeenCalled();
    ready(); expect(reader.poll(pixels, 2)).toBe(true);
    expect(reader.timing.fenceSignalled).toBe(true); expect(reader.timing.copied).toBe(true);
    expect(reader.timing.getSyncParameterMs).toBe(1); expect(reader.timing.getBufferSubDataMs).toBe(1);
    expect(reader.timing.bindBufferMs).toBe(1); expect(reader.timing.unbindBufferMs).toBe(1); expect(reader.timing.getParameterMs).toBe(0);
    expect(reader.poll(pixels, 3)).toBe(false);
    expect(gl.getBufferSubData).toHaveBeenCalledTimes(1);
    expect(gl.bindBuffer).toHaveBeenLastCalledWith(gl.PIXEL_PACK_BUFFER, null);
    expect(gl.getParameter).not.toHaveBeenCalled();
    expect(gl.flush).not.toHaveBeenCalled();
  });
  it("cancels an old night and reuses its allocation", () => {
    const { gl, reader, ready } = fixture();
    reader.issue(64); reader.cancel(); ready();
    expect(reader.poll(new Uint8Array(256), 1)).toBe(false);
    expect(gl.deleteSync).toHaveBeenCalledTimes(1);
    reader.issue(64);
    expect(gl.createBuffer).toHaveBeenCalledTimes(1);
    expect(gl.bufferData).toHaveBeenCalledTimes(1);
  });
  it("polls no earlier than the next frame and at most once per frame ID", () => {
    const {gl,reader,ready}=fixture(),pixels=new Uint8Array(256);
    reader.issue(64, 10); ready();
    expect(reader.poll(pixels, 10)).toBe(false); expect(gl.getSyncParameter).not.toHaveBeenCalled();
    expect(reader.poll(pixels, 11)).toBe(true); expect(reader.timing.fenceAge).toBe(1);
    expect(reader.poll(pixels, 11)).toBe(false); expect(gl.getSyncParameter).toHaveBeenCalledTimes(1);
  });
  it("unbinds the pixel-pack buffer when the synchronous copy throws", () => {
    const {gl,reader,ready}=fixture();reader.issue(64);ready();
    gl.getBufferSubData.mockImplementationOnce(()=>{throw Error('copy failed');});
    expect(()=>reader.poll(new Uint8Array(256),1)).toThrow('copy failed');
    expect(gl.bindBuffer).toHaveBeenLastCalledWith(gl.PIXEL_PACK_BUFFER,null);
  });
  it("does not issue GPU work after context loss or allocation failure", () => {
    const { gl, reader } = fixture();
    gl.isContextLost.mockReturnValue(true);
    expect(reader.issue(64)).toBe(false);
    expect(gl.readPixels).not.toHaveBeenCalled();
  });
});
