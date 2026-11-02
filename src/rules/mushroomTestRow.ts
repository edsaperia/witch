/** Move the whole row together, nearest clear 2 m grid offset first; never break its 10 m spacing. */
export function mushroomRow(centre: {x: number; z: number}, count: number, clear: (x: number, z: number) => boolean): {x: number; z: number}[] | null {
  const offsets = [{x: 0, z: 0}];
  for (let ring = 1; ring <= 50; ring++) for (let z = -ring; z <= ring; z++) for (let x = -ring; x <= ring; x++) {
    if (Math.max(Math.abs(x), Math.abs(z)) === ring) offsets.push({x: x * 2, z: z * 2});
  }
  offsets.sort((a, b) => a.x * a.x + a.z * a.z - b.x * b.x - b.z * b.z || a.z - b.z || a.x - b.x);
  for (const offset of offsets) {
    const row = Array.from({length: count}, (_, i) => ({x: centre.x + offset.x + (i - (count - 1) / 2) * 10, z: centre.z + 40 + offset.z}));
    if (row.every(p => clear(p.x, p.z))) return row;
  }
  return null; // No unsafe fallback onto water/scenery; callers can report that no clear row was found.
}
