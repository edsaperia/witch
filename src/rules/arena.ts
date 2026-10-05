// The debug arena (Stage 5; DESIGN.md "Creature movement"): ?arena=wolf*4,beetle*3 puts the first
// group down as hers, parked at sigils, facing the second, wild, across the home clearing, so Ed can
// see and judge how kinds fight one another. `wolf*4@2` sets the level (default young); hers at @3
// are happy legends ("home": home's own), and a wild group ending "!" besieges home's soundsystem. It's set
// below the dancefloor, hers on the left, the wild on the right, and she stands behind hers. Creatures are borrowed from the far
// edge of the map. No drawing here.
import { LEGEND, speedFactor, wanderRange, type Level } from "./creatures";
import { newCamera } from "./camera";
import type { Game } from "./game";
import { witchHeight } from "./witch";

export interface ArenaGroup { species: string; count: number; level: Level; /** (wild) besieging home's soundsystem */ siege?: boolean }

/** "wolf*4@2,beetle*3!" → groups; unknown bits are skipped. At most 12 a group. A group of hers at
 *  @3 is happy area legends, guarding the arena; "home" is home's own happy legend; a wild group
 *  ending "!" marches on home's soundsystem (a siege). */
export function parseArena(spec: string): ArenaGroup[] {
  const out: ArenaGroup[] = [];
  for (const part of spec.split(",")) {
    const m = /^\s*([a-z]+)\s*(?:\*\s*(\d+))?\s*(?:@\s*(\d))?\s*(!)?\s*$/i.exec(part);
    if (!m) continue;
    const home = m[1].toLowerCase() === "home";
    out.push({ species: m[1].toLowerCase(), count: home ? 1 : Math.max(1, Math.min(12, Number(m[2] ?? 3))), level: (home ? LEGEND : Math.max(0, Math.min(LEGEND, Number(m[3] ?? 1)))) as Level, ...(m[4] ? { siege: true } : {}) });
  }
  return out;
}

/** Set the arena up (again: R restarts it, sending the last one's creatures off). */
export function setupArena(g: Game, spec: string): void {
  const groups = parseArena(spec);
  if (!groups.length) return;
  const L = g.witches[0].leash;
  if (g.arena) {
    const old = new Set(g.arena.ids);
    for (const id of old) g.creatures[id].gone = true;
    L.placed = L.placed.filter(p => !old.has(p.id)); L.stack = L.stack.filter(id => !old.has(id));
  }
  // In the home clearing, below the dancefloor; hers on the left, the wild on the right.
  const d = g.map.dancefloor, cx = d.x, cz = d.z + d.radius + 18, cell = g.map.cellSafe(cx, cz).cell as [number, number], ids: number[] = [];
  const t = g.tuning, time = g.clock.time;
  // Borrow creatures from far off (the map's edge holds plenty).
  const spare = g.creatures.filter(c => !c.gone && !c.leashed && !c.boss && Math.hypot(c.x - cx, c.z - cz) > 200).sort((a, b) => Math.hypot(b.x - cx, b.z - cz) - Math.hypot(a.x - cx, a.z - cz));
  groups.forEach((gr, side) => {
    const party = side === 0, sx = party ? -5.5 : 5.5; // (within the wild's aggro of hers)
    for (let i = 0; i < gr.count; i++) {
      // "home": home's own happy legend; else a creature borrowed from far off.
      const c = gr.species === "home" ? g.creatures.find(k => k.boss && k.cell[0] === g.map.centreCell[0] && k.cell[1] === g.map.centreCell[1]) : spare.shift();
      if (!c) return;
      const row = Math.floor(i / 4), col = i % 4, x = cx + sx + (party ? -row : row) * 2.2, z = cz + (col - 1.5) * 2.4 + (row % 2) * 1.2;
      Object.assign(c, {
        species: gr.species === "home" ? c.species : gr.species, level: gr.level, x, z, tx: x, tz: z, cell, homeX: cx, homeZ: cz, anchorX: x, anchorZ: z, range: wanderRange(g.map),
        speed: (gr.level === LEGEND ? t.legendSpeed : t.creatureSpeed * speedFactor(gr.species, gr.level, t)) * (0.85 + c.rand() * 0.3),
        gone: false, seen: time, hp: undefined, boss: false, siege: undefined, enraged: false, rest: 2, fight: undefined, fleeUntil: undefined, wanderTo: undefined, sprung: undefined, charge: undefined, vx: 0, vz: 0, facing: party ? 1 : -1,
      });
      // Hers at legend level: a happy area legend guarding the arena (round its home: the arena's middle).
      if (party && gr.level === LEGEND) Object.assign(c, { leashed: false, boss: true, legendState: "happy", stateAt: time, legend: undefined });
      else if (party) { c.leashed = true; L.placed.push({ id: c.id, x, z, at: time }); }
      else { c.leashed = false; if (gr.siege) Object.assign(c, { siege: "home", enraged: true }); }
      ids.push(c.id);
    }
  });
  g.arena = { spec, ids };
  g.legendIds = undefined; // (found again: the arena may have made some)
  g.byArea = null;
  // She stands behind her side (the wild go for the nearest, so hers first; out of talking range), the camera on her.
  g.witch = { ...g.witch, x: cx - 13, z: cz + 3, mode: "ground", lift: 0, seated: false, vx: 0, vz: 0 };
  g.camera = newCamera(t, g.witch.x, witchHeight(g.witch, t), g.witch.z);
  g.introFocus = undefined;
}
