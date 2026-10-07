// Her knocked-off hat on its way down (Ed, 2026-10-07: "the hat slowly floats to the floor over about 4 seconds"):
// drawn by render/view/witch.ts over knockout.hatFloat seconds from the knockdown.

/** k 0 at her head (`from` metres up, where it sat) to 1 lying `beside` metres over from where she went down. It comes
 *  down a little faster at first and settles gently, drifting over to its spot, swaying side to side (two and a half
 *  swings, smaller as it settles), turned as it swings back. */
export function hatFlight(x: number, z: number, k: number, from: number, beside: number): { x: number; y: number; z: number; flip: boolean } {
  const fall = 1 - (1 - k) * (1 - k) * (1 - k) * 0.35 - (1 - k) * 0.65, swing = Math.sin(k * Math.PI * 5);
  return { x: x + beside * k + swing * 0.7 * (1 - k), y: from * (1 - fall), z, flip: k < 1 && Math.cos(k * Math.PI * 5) < 0 };
}
