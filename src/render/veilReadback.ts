export interface VeilReadTiming {
  totalMs: number; contextMs: number; getSyncParameterMs: number; getParameterMs: number;
  bindBufferMs: number; unbindBufferMs: number; getBufferSubDataMs: number; deleteSyncMs: number; applyMs: number;
  fencePending: boolean; fenceSignalled: boolean; copied: boolean; skipped: boolean; fenceAge: number;
}
export function emptyVeilReadTiming(): VeilReadTiming {
  return { totalMs: 0, contextMs: 0, getSyncParameterMs: 0, getParameterMs: 0, bindBufferMs: 0, unbindBufferMs: 0,
    getBufferSubDataMs: 0, deleteSyncMs: 0, applyMs: 0, fencePending: false, fenceSignalled: false, copied: false, skipped: false, fenceAge: 0 };
}
/** Owns a short PIXEL_PACK_BUFFER scope, always ending unbound; no synchronous binding getter. */
export class VeilReadback {
  private buffer: WebGLBuffer | null = null;
  private fence: WebGLSync | null = null;
  private issuedFrame = -1;
  private polledFrame = -1;
  readonly timing = emptyVeilReadTiming();
  constructor(private gl: WebGL2RenderingContext, private bytes: number, private now = () => performance.now()) {}
  cancel(): void {
    if (this.fence) this.gl.deleteSync(this.fence);
    this.fence = null;
  }
  issue(width: number, frame = 0): boolean {
    const gl = this.gl;
    if (this.fence || gl.isContextLost()) return false;
    try {
      if (!this.buffer) {
        this.buffer = gl.createBuffer();
        if (!this.buffer) return false;
        gl.bindBuffer(gl.PIXEL_PACK_BUFFER, this.buffer);
        gl.bufferData(gl.PIXEL_PACK_BUFFER, this.bytes, gl.STREAM_READ);
      } else gl.bindBuffer(gl.PIXEL_PACK_BUFFER, this.buffer);
      gl.readPixels(0, 0, width, 1, gl.RGBA, gl.UNSIGNED_BYTE, 0);
      this.fence = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      this.issuedFrame = frame;
      return this.fence !== null;
    } finally { gl.bindBuffer(gl.PIXEL_PACK_BUFFER, null); }
  }
  poll(target: Uint8Array, frame: number): boolean {
    const gl = this.gl, m = this.timing;
    m.totalMs = m.contextMs = m.getSyncParameterMs = m.getParameterMs = m.bindBufferMs = m.unbindBufferMs = m.getBufferSubDataMs = m.deleteSyncMs = m.applyMs = 0;
    m.fencePending = !!this.fence; m.fenceSignalled = m.copied = m.skipped = false;
    m.fenceAge = this.fence ? frame - this.issuedFrame : 0;
    if (frame === this.polledFrame || !this.fence || frame <= this.issuedFrame) { m.skipped = true; return false; }
    this.polledFrame = frame;
    let start = this.now(); const lost = gl.isContextLost(); m.contextMs = this.now() - start;
    if (lost) return false;
    start = this.now(); const status = gl.getSyncParameter(this.fence, gl.SYNC_STATUS); m.getSyncParameterMs = this.now() - start;
    m.fenceSignalled = status === gl.SIGNALED;
    if (!m.fenceSignalled) return false;
    start = this.now(); this.cancel(); m.deleteSyncMs = this.now() - start;
    try {
      start = this.now(); gl.bindBuffer(gl.PIXEL_PACK_BUFFER, this.buffer); m.bindBufferMs += this.now() - start;
      start = this.now(); gl.getBufferSubData(gl.PIXEL_PACK_BUFFER, 0, target); m.getBufferSubDataMs = this.now() - start;
      m.copied = true;
    } finally { start = this.now(); gl.bindBuffer(gl.PIXEL_PACK_BUFFER, null); m.unbindBufferMs = this.now() - start; }
    return true;
  }
}
