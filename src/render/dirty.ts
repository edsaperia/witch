// Instance buffers that send the GPU only what changed (phase 2: most batches' instances are the same frame to frame, the
// prototype builder measured, yet every one went up every frame). A batch writes each instance's numbers only where they
// differ from what its array holds, noting the first and last instance it changed; what it hands three.js is that span,
// or nothing. The array always holds what the GPU has, so the picture is the same.
import type * as THREE from "three";

/** The span of instances changed since the last flush. */
export class Dirty {
  lo = Infinity;
  hi = -1;
  /** The range handed to three.js (its addUpdateRange makes a new record each call, hundreds a frame over the batches; it only
   *  reads start and count, and lets go of the list after the upload, so one record a tracker serves every flush). */
  private readonly range = { start: 0, count: 0 };
  touch(i: number): void { if (i < this.lo) this.lo = i; if (i > this.hi) this.hi = i; }
  /** Ask three.js to upload the changed span of `a` (one range, merged with any still waiting), then start again. */
  flush(a: THREE.BufferAttribute): void {
    if (this.hi >= this.lo) {
      const k = a.itemSize, R = this.range, r = a.updateRanges[0];
      let start = this.lo * k, end = (this.hi + 1) * k;
      if (r) { start = Math.min(r.start, start); end = Math.max(r.start + r.count, end); a.clearUpdateRanges(); } // (set twice before a draw: one range covering both)
      R.start = start; R.count = end - start;
      a.updateRanges.push(R);
      a.needsUpdate = true;
    }
    this.lo = Infinity; this.hi = -1;
  }
}
