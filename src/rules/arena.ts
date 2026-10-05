// The debug arena (Stage 5; DESIGN.md "Creature movement"): ?arena=wolf*4,beetle*3 puts the first
// group down as hers, parked at sigils, facing the second, wild, across the home clearing, so Ed can
// see and judge how kinds fight one another. `wolf*4@2` sets the level (default young); hers at @3
// are happy legends ("home": home's own), and a wild group ending "!" besieges home's soundsystem.
// Presets for each pattern: ?arena=surround, pincer, hitandrun, charge, volley, kite, swarm, lob,
// beam, ambush, burrow, leap, armour, legend, siege (ARENA_PRESETS). It's set
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
/** Arena presets (Ed's motion scale pass): one for each pattern, at the fight's scale. ?arena=surround. */
export const ARENA_PRESETS: Record<string, string> = {
  surround: "beetle*2@2,wolf*5@2", pincer: "beetle*2@2,wolf*4@2", hitandrun: "beetle*2@2,hare*4@2", charge: "wolf*3@2,boar*2@2",
  volley: "wolf*4@2,raven*4@2", kite: "wolf*3@2,raven*2@2", swarm: "wolf*3@2,bat*6@2", lob: "wolf*3@2,owl*3@2",
  beam: "wolf*3@2,salamander*3@2", ambush: "wolf*3@2,spider*3@2", burrow: "wolf*3@2,mole*3@2", leap: "wolf*3@2,toad*3@2",
  armour: "wolf*3@2,beetle*3@2", legend: "wolf*5@2,bear@3", siege: "home,wolf*6@2!",
  // Ed's species pass (2026-10-05): one for each new move.
  swipe: "wolf*4@2,bear*2@2", wide: "wolf*3@2,elk*2@2", pair: "wolf*3@2,stag*2@2", ram: "wolf*3@2,ram*2@2",
  dig: "wolf*4@2,badger*2@2", block: "raven*3@2,beaver*3@2", flank: "wolf*3@2,fox*3@2", pounce: "wolf*3@2,lynx*2@2",
  weave: "raven*3@2,stoat*3@2", packflank: "wolf*3@2,marten*4@2", otter: "raven*3@2,otter*3@2", squirrel: "beetle*2@2,squirrel*4@2",
  dart: "beetle*2@2,dormouse*5@2", roll: "wolf*3@2,hedgehog*3@2", slime: "wolf*3@2,snail*3@2", woodlouse: "wolf*3@2,woodlouse*3@2",
  strike: "wolf*3@2,snake*3@2", moth: "glowworm*2@2,moth*6@2", flash: "wolf*4@2,glowworm*3@2",
};

export function setupArena(g: Game, spec: string): void {
  const groups = parseArena(ARENA_PRESETS[spec.trim().toLowerCase()] ?? spec);
  if (!groups.length) return;
  const L = g.witches[0].leash;
  if (g.arena) {
    const old = new Set(g.arena.ids);
    for (const id of old) g.creatures[id].gone = true;
    L.placed = L.placed.filter(p => !old.has(p.id)); L.stack = L.stack.filter(id => !old.has(id));
  }
  // In the home clearing, below the dancefloor; hers on the left, the wild on the right.
  // Beside the dancefloor, where the home area has the most room round it (fights now sweep about 50 m).
  const S = g.tuning.fight.scale, d = g.map.dancefloor, home = g.map.centreCell;
  let cx = d.x, cz = d.z + d.radius + 18, room = -1;
  for (let r = d.radius + 12; r <= d.radius + 60; r += 6) for (let k = 0; k < 16; k++) {
    const a = (k / 16) * Math.PI * 2, x = d.x + Math.cos(a) * r, z = d.z + Math.sin(a) * r, at = g.map.cellSafe(x, z);
    if (at.cell[0] === home[0] && at.cell[1] === home[1] && at.safe > room) { room = at.safe; cx = x; cz = z; }
  }
  const cell = g.map.cellSafe(cx, cz).cell as [number, number], ids: number[] = [];
  const t = g.tuning, time = g.clock.time;
  // Borrow creatures from far off (the map's edge holds plenty).
  const spare = g.creatures.filter(c => !c.gone && !c.leashed && !c.boss && Math.hypot(c.x - cx, c.z - cz) > 200).sort((a, b) => Math.hypot(b.x - cx, b.z - cz) - Math.hypot(a.x - cx, a.z - cz));
  groups.forEach((gr, side) => {
    const party = side === 0, sx = (party ? -14 : 14) * S; // (within the wild's aggro of hers, at the fight's scale)
    for (let i = 0; i < gr.count; i++) {
      // "home": home's own happy legend; else a creature borrowed from far off.
      const c = gr.species === "home" ? g.creatures.find(k => k.boss && k.cell[0] === g.map.centreCell[0] && k.cell[1] === g.map.centreCell[1]) : spare.shift();
      if (!c) return;
      const row = Math.floor(i / 4), col = i % 4, x = cx + sx + (party ? -row : row) * 5 * S, z = cz + (col - 1.5) * 6 * S + (row % 2) * 3 * S;
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
  // She stands just south of the middle, in view of both sides (the wild go for the nearest, so hers first), the camera on her.
  g.witch = { ...g.witch, x: cx, z: cz + Math.min(17 * S, Math.max(6, room - 3)), mode: "ground", lift: 0, seated: false, vx: 0, vz: 0 };
  g.camera = newCamera(t, g.witch.x, witchHeight(g.witch, t), g.witch.z);
  g.introFocus = undefined;
}
