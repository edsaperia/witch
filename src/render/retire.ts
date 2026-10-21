// The last night's materials kept till the next night's have their programs (Ed's laptop, 2026-10-21, v4022: every sail in place
// compiled its shaders again, 4 s of it). three.js keeps a program, and the shader stages it's made from, only while some material
// uses it, and a material takes its program only when it's first compiled or drawn. A night in place (View.setGameSliced) made its
// island's materials, then let the last island's go before any of the new ones was compiled: every program the two shared was
// freed (its stages too) and made again, under new stage ids, when the new night was compiled. So through a night's build its
// materials' dispose() is held (they're out of the scene: never drawn), and let go once the new night's are compiled
// (View.compileAll): the programs both use are kept, and only what the new night alone uses is compiled.
import * as THREE from "three";

let held: THREE.Material[] | null = null, late: ReturnType<typeof setTimeout> | undefined;
const dispose = THREE.Material.prototype.dispose;

/** From now on a material's dispose() is held, not done, till releaseDisposals. */
export function holdDisposals(): void {
  if (held) return;
  held = [];
  THREE.Material.prototype.dispose = function (this: THREE.Material) { held!.push(this); };
  late = setTimeout(releaseDisposals, 120000); // (a night's start that never compiles mustn't hold them for good)
}

/** The held disposals done, and dispose() as ever. How many there were. */
export function releaseDisposals(): number {
  if (!held) return 0;
  const list = held;
  held = null;
  clearTimeout(late);
  THREE.Material.prototype.dispose = dispose;
  for (const m of new Set(list)) m.dispose();
  return list.length;
}
