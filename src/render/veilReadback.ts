/** One retained pixel-pack buffer; poll once per rendered frame, without flushing or timers. */
export class VeilReadback {
  private buffer: WebGLBuffer | null = null;
  private fence: WebGLSync | null = null;
  constructor(private gl: WebGL2RenderingContext, private bytes: number) {}
  cancel(): void {
    if (this.fence) this.gl.deleteSync(this.fence);
    this.fence = null;
  }
  issue(width: number): boolean {
    const gl = this.gl;
    if (this.fence || gl.isContextLost()) return false;
    const previous = gl.getParameter(gl.PIXEL_PACK_BUFFER_BINDING);
    try {
      if (!this.buffer) {
        this.buffer = gl.createBuffer();
        if (!this.buffer) return false;
        gl.bindBuffer(gl.PIXEL_PACK_BUFFER, this.buffer);
        gl.bufferData(gl.PIXEL_PACK_BUFFER, this.bytes, gl.STREAM_READ);
      } else gl.bindBuffer(gl.PIXEL_PACK_BUFFER, this.buffer);
      gl.readPixels(0, 0, width, 1, gl.RGBA, gl.UNSIGNED_BYTE, 0);
      this.fence = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      return this.fence !== null;
    } finally { gl.bindBuffer(gl.PIXEL_PACK_BUFFER, previous); }
  }
  poll(target: Uint8Array): boolean {
    const gl = this.gl;
    if (!this.fence || gl.isContextLost() || gl.getSyncParameter(this.fence, gl.SYNC_STATUS) !== gl.SIGNALED) return false;
    this.cancel();
    const previous = gl.getParameter(gl.PIXEL_PACK_BUFFER_BINDING);
    try {
      gl.bindBuffer(gl.PIXEL_PACK_BUFFER, this.buffer);
      gl.getBufferSubData(gl.PIXEL_PACK_BUFFER, 0, target);
    } finally { gl.bindBuffer(gl.PIXEL_PACK_BUFFER, previous); }
    return true;
  }
}
