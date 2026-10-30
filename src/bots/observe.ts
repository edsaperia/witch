// PR #1477: coordinator 6512711766 permits this documented approximate view.
// This is the only expert module allowed to read Game. Never return live references.
import type { Game } from "../rules/game";
import { newCamera, cameraPose } from "../rules/camera";
import { cellKey } from "../rules/party";
import { castOf, castOn, castReady, castSpot, stoneOpen } from "../rules/stoneStacks";
import { stateOf, hasRune } from "../rules/creatureStates";
import { runeOffset } from "../rules/runeOffset";
import { bagTuning } from "../rules/bags";
import { winTarget } from "../rules/win";
import { pointerShown } from "../rules/leypulse";
import { questOpen, dreamStone, dreamWay } from "../rules/dream";
import { ALARM_DEFAULTS, newAlarms, shownAlarms, stepAlarms } from "../rules/alarms";

export interface Point { x: number; z: number }
export interface SeenCreature extends Point { id: number; species: string; level: number; boss: boolean; friendly: boolean; angry: boolean; stunned: boolean; area: string; rune: Point | null }
export interface SeenStone extends Point { key: string; open: boolean; ready: boolean; cast: Point }
export interface Observation {
  playerTime: number; worldTime: number; self: Point & { mode: Game["witches"][number]["body"]["mode"]; hp: number; ko: boolean; seated: boolean; perched: boolean; grounded: boolean };
  range: number; pickRadius: number; spacing: number; castRadius: number; castBlocked: boolean; waiting: boolean; home: Point;
  carried: { id: number; species: string; level: number }[];
  creatures: SeenCreature[]; stones: SeenStone[]; loose: (Point & { id: number })[]; placed: Point[];
  next: Point | null; straggler: Point | null; legends: Point[]; alarms: Point[]; windups: Point[];
  quests: { id: number; wants: string; open: boolean; delivery: Point; hint: Point | null }[];
  find: Point | null; relics: Point[];
}

export function viewRectangle(g: Game): { halfWidth: number; halfDepth: number } {
  const w = g.witches[0].body, c = newCamera(g.tuning, w.x, 0, w.z);
  c.intro = 0;
  const p = cameraPose(c, w.mode === "treetop" ? 1 : 0, g.tuning);
  const h = p.distance * Math.tan(g.tuning.camera.fov * Math.PI / 360);
  return { halfWidth: h * 16 / 9, halfDepth: h / Math.max(0.1, Math.sin(p.angle * Math.PI / 180)) };
}

export function newObserver() {
  const alarms = newAlarms();
  return (g: Game): Observation => {
    const w = g.witches[0], b = w.body, t = g.tuning, time = g.clock.time, ext = viewRectangle(g);
    const visible = (p: Point) => Math.abs(p.x - b.x) <= ext.halfWidth && Math.abs(p.z - b.z) <= ext.halfDepth;
    const creatures: SeenCreature[] = g.creatures.filter(c => !c.gone && !c.leashed && visible(c)).map(c => ({
      id: c.id, species: c.species, level: c.level, x: c.x, z: c.z, boss: !!c.boss,
      friendly: stateOf(c) === "happy", angry: !!c.enraged, stunned: !!c.dazed, area: cellKey(c.cell),
      rune: hasRune(c, time) ? { x: c.x, z: c.z + runeOffset(c, t) } : null,
    }));
    const stones: SeenStone[] = [];
    for (const [i, j] of g.map.cells) {
      const s = g.map.soundsystemSpot(i, j), key = cellKey([i, j]);
      if (visible(s)) stones.push({ key, x: s.x, z: s.z, open: stoneOpen(g, key), ready: castOn(t) && castReady(g, key), cast: castSpot(s, t) });
    }
    const A = t.alarms ?? ALARM_DEFAULTS;
    stepAlarms(alarms, g.combat.sounds, g.combat.events, time, A);
    const nextCell = pointerShown(g.party, g.map, time) > 0 ? g.party.next?.[0] : undefined;
    const next = nextCell ? g.map.soundsystemSpot(nextCell[0], nextCell[1]) : null;
    const straggler = winTarget(g); // The public straggler pointer, not a full entity.
    const quests: Observation["quests"] = [];
    if (b.mode === "ground" && !b.perch) for (const c of g.creatures) {
      if (!c.boss || c.gone || !c.quest || !visible(c) || Math.hypot(c.x - b.x, c.z - b.z) > t.dreams.range) continue;
      const clearing = g.map.legendClearing?.(c.cell[0], c.cell[1]);
      const destination = dreamStone(g.map, c.quest.species, b.x, b.z);
      const way = destination ? dreamWay(b, destination) : null;
      // The bubble gives eight-way direction and rounded distance, not an exact
      // unseen target coordinate. The approximation treats its cycling sigil as readable.
      const metres = way ? Math.round(way.metres / 10) * 10 : 0, angle = way ? way.point * Math.PI / 4 : 0;
      quests.push({ id: c.id, wants: c.quest.species, open: questOpen(g.party, c), delivery: clearing ? { x: clearing.x, z: clearing.z } : { x: c.x + 4, z: c.z + 4 }, hint: way ? { x: b.x + Math.sin(angle) * metres, z: b.z - Math.cos(angle) * metres } : null });
    }
    return {
      playerTime: g.herTime, worldTime: time,
      self: { x: b.x, z: b.z, mode: b.mode, hp: w.health.hp, ko: !!w.ko, seated: !!b.seated, perched: !!b.perch,
        grounded: w.leash.stack.some(id => g.creatures[id].level >= 2) },
      range: bagTuning(t, w.spells.bag).invites.range, pickRadius: t.leash.pickRadius, castRadius: castOf(t).radius,
      spacing: t.leash.spacing,
      castBlocked: !!w.castBlocked,
      waiting: g.party.spellAt === null, home: { x: g.map.dancefloor.x, z: g.map.dancefloor.z },
      carried: w.leash.stack.map(id => { const c = g.creatures[id]; return { id, species: c.species, level: c.level }; }),
      creatures, stones, loose: g.loose.filter(p => !p.legend && visible(p)).map(p => ({ id: p.id, x: p.x, z: p.z })),
      placed: w.leash.placed.filter(visible).map(p => ({ x: p.x, z: p.z })),
      next: next ? { x: next.x, z: next.z } : null, straggler: straggler ? { x: straggler.x, z: straggler.z } : null,
      // Same public awake-legend pointer gate as render/view/pointers.ts.
      legends: g.win?.wonAt !== undefined ? [] : g.creatures.filter(c => c.boss && !c.gone && c.legendState && c.legendState !== "asleep").map(c => ({ x: c.x, z: c.z })),
      alarms: shownAlarms(alarms, A).map(a => ({ x: a.x, z: a.z })),
      quests,
      find: b.mode === "ground" && g.trunk?.item && !g.trunk.found && visible(g.trunk) && Math.hypot(g.trunk.x - b.x, g.trunk.z - b.z) <= 120 ? { x: g.trunk.x, z: g.trunk.z } : null,
      relics: b.mode === "ground" ? g.relics.filter(r => r.state === "lying" && visible(r)).map(r => ({ x: r.sx, z: r.sz })) : [],
      // Approximate hearing: only an audible tell's source within 25 m. No target,
      // exact deadline, future aim/landing point, or game random state escapes.
      windups: g.creatures.filter(c => !c.gone && Math.hypot(c.x - b.x, c.z - b.z) <= 25 && (c.fight?.windupUntil ?? 0) > time).map(c => ({ x: c.x, z: c.z })),
    };
  };
}
