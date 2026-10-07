// Instance buffers that send the GPU only what changed (phase 2: most batches' instances are the same frame to frame, the
// prototype builder measured, yet every one went up every frame). A batch writes each instance's numbers only where they
// differ from what its array holds, noting the first and last instance it changed; what it hands three.js is that span,
// or nothing. The array always holds what the GPU has, so the picture is the same.
import type * as THREE from "three";

/** The span of instances changed since the last flush. */
export class Dirty {
  lo = Infinity;
  hi = -1;
  touch(i: number): void { if (i < this.lo) this.lo = i; if (i > this.hi) this.hi = i; }
  /** Ask three.js to upload the changed span of `a` (one range, merged with any still waiting), then start again. */
  flush(a: THREE.BufferAttribute): void {
    if (this.hi >= this.lo) {
      const k = a.itemSize, start = this.lo * k, end = (this.hi + 1) * k, r = a.updateRanges[0];
      if (r) { const s = Math.min(r.start, start), e = Math.max(r.start + r.count, end); a.clearUpdateRanges(); a.addUpdateRange(s, e - s); } // (set twice before a draw: one range covering both)
      else a.addUpdateRange(start, end - start);
      a.needsUpdate = true;
    }
    this.lo = Infinity; this.hi = -1;
  }
}
