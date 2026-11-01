/** Ed,2026-11-01: ground viewers cannot see the rooms; treetop visitors inside
 * the crown can see them beneath its leaves, as can someone standing on its floor. */
export function treehouseVisible(w: { perch?: boolean; mode: string }, insideCanopy: boolean): boolean {
  return !!w.perch && (w.mode === 'ground' || w.mode === 'descending') || w.mode === 'treetop' && insideCanopy;
}

export function insideTreehouseCanopy(p: { x: number; z: number }, dome: { cx: number; cz: number; rx: number; rz: number } | undefined): boolean {
  return !!dome && dome.rx > 0 && dome.rz > 0 && ((p.x - dome.cx) / dome.rx) ** 2 + ((p.z - dome.cz) / dome.rz) ** 2 < 1;
}
