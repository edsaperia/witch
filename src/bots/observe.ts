// PR #1477: coordinator 6512711766 permits this documented approximate view.
// This is the only expert module allowed to read Game. Never return live references.
import type { Game } from "../rules/game";
import { newCamera, cameraPose } from "../rules/camera";
import { cellKey } from "../rules/party";
import { castOf, castOn, castReady, castSpot, stoneOpen } from "../rules/stoneStacks";
import { stateOf, hasRune } from "../rules/creatureStates";
import { runeOffset } from "../rules/runeOffset";
import { bagTuning } from "../rules/bags";
import { winTarget, winPulse, won } from "../rules/win";
import { pointerShown, leyReachTimes } from "../rules/leypulse";
import { leyChain } from "../rules/leylines";
import { rainbowKnobs, rainbowRuns, routePoint } from "../rules/rainbow";
import { questOpen, dreamStone, dreamWay } from "../rules/dream";
import { ALARM_DEFAULTS, newAlarms, shownAlarms, stepAlarms } from "../rules/alarms";

export interface Point { x: number; z: number }
export interface SeenCreature extends Point { id: number; species: string; level: number; boss: boolean; friendly: boolean; angry: boolean; stunned: boolean; area: string; rune: Point | null }
export interface SeenStone extends Point { key: string; open: boolean; ready: boolean; cast: Point }
export interface Observation {
  campaign?: {
    equipment?: { hat: string; hatDown: Point | null; broom: string; ready: boolean };
    legendTrails?: (Point & { id: number; way: Point | null })[];
    berries: Point[]; flasks: Point[];
    troops: (Point & { id: number; species: string; level: number; hurt: boolean; placed: Point | null })[];
    route: (Point & { key: string; captured: boolean })[];
    areas?: (Point & { key: string; captured: boolean })[];
    rainbow?: (Point & { way: Point })[];
    sigils: (Point & { id: number; species: string; level: number })[];
  };
  view: { halfWidth: number; halfDepth: number };
  playerTime: number; worldTime: number; self: Point & { mode: Game["witches"][number]["body"]["mode"]; hp: number; ko: boolean; seated: boolean; perched: boolean; grounded: boolean };
  range: number; pickRadius: number; spacing: number; castRadius: number; castBlocked: boolean; waiting: boolean; home: Point;
  carried: { id: number; species: string; level: number }[];
  creatures: SeenCreature[]; stones: SeenStone[]; loose: (Point & { id: number })[]; placed: Point[];
  next: Point | null; straggler: Point | null; victoryPointer: boolean; legends: Point[]; alarms: Point[]; windups: Point[];
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
  let rainbowAt = -Infinity;
  let rainbowParty: Game["party"] | null = null;
  let rainbowBars: (Point & { way: Point })[] = [];
  return (g: Game): Observation => {
    const w = g.witches[0], b = w.body, t = g.tuning, time = g.clock.time, ext = viewRectangle(g);
    const visible = (p: Point) => Math.abs(p.x - b.x) <= ext.halfWidth && Math.abs(p.z - b.z) <= ext.halfDepth;
    const creatures: SeenCreature[] = g.creatures.filter(c => !c.gone && !c.leashed && visible(c)).map(c => ({
      id: c.id, species: c.species, level: c.level, x: c.x, z: c.z, boss: !!c.boss,
      friendly: stateOf(c) === "happy" || c.legendState === "happy", angry: !!c.enraged || c.legendState === "angry", stunned: !!c.dazed, area: cellKey(c.cell),
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
    // Only columns whose public reveal has happened AND whose position is in
    // the approximate camera rectangle. Never export the hidden wave plan.
    const reach = leyReachTimes(g.party, g.map, time);
    const routeSeer = w.hat.has && !w.hat.down && w.spells.hat === "routeseer";
    const route = leyChain(g.party, g.map).stones.filter(s => visible(s) && (routeSeer && g.party.spellAt !== null || (reach?.get(cellKey(s.cell)) ?? Infinity) <= time))
      .map(s => ({ x: s.x, z: s.z, key: cellKey(s.cell), captured: g.party.areas.has(cellKey(s.cell)) }));
    // Sample actual rainbow bar locations via the renderer's rule fallback.
    // No wave start, route distance/index, hidden endpoint or full path escapes.
    // This shares the documented approximate-camera/no-occlusion boundary, not
    // a claim of exact bent-world/frustum visibility or renderer curve parity.
    if (rainbowParty !== g.party) { rainbowAt = -Infinity; rainbowParty = g.party; }
    if (time < rainbowAt || time - rainbowAt >= 0.125) {
      rainbowAt = time; rainbowBars = [];
      const K = rainbowKnobs(t);
      if (K.on && !g.partyOver) for (const r of rainbowRuns(g.party, g.map, g.rainbows ?? [], time)) {
        const n = Math.max(4, Math.min(128, Math.round(K.bars ?? 84)));
        for (let i = 0; i < n; i += 4) {
          const m = r.head - r.dir * i * (K.spacing ?? 1.4);
          if (m < r.lo || m > r.hi) continue;
          const p = routePoint(g.party, g.map, m);
          if (p) rainbowBars.push({ x: p.x, z: p.z, way: { x: p.x + p.dx * 30, z: p.z + p.dz * 30 } });
        }
      }
    }
    const straggler = winTarget(g); // The public straggler pointer, not a full entity.
    const quests: Observation["quests"] = [];
    const dreamers = g.creatures.filter(c => c.boss && !c.gone && c.quest && visible(c) && Math.hypot(c.x - b.x, c.z - b.z) <= t.dreams.range).sort((a, c) => Math.hypot(a.x - b.x, a.z - b.z) - Math.hypot(c.x - b.x, c.z - b.z)).slice(0, 4);
    if (b.mode === "ground" && !b.perch) for (const c of dreamers) {
      const open = questOpen(g.party, c);
      const clearing = g.map.legendClearing?.(c.cell[0], c.cell[1]);
      const destination = open ? dreamStone(g.map, c.quest!.species, b.x, b.z) : null;
      const way = destination ? dreamWay(b, destination) : null;
      // The bubble gives eight-way direction and rounded distance, not an exact
      // unseen target coordinate. The approximation treats its cycling sigil as readable.
      const precision = way && way.metres >= 1000 ? 100 : 10;
      const metres = way && way.metres > 20 ? Math.round(way.metres / precision) * precision : 0, angle = way ? way.point * Math.PI / 4 : 0;
      quests.push({ id: c.id, wants: open ? c.quest!.species : "", open, delivery: clearing ? { x: clearing.x, z: clearing.z } : { x: c.x + 4, z: c.z + 4 }, hint: way ? { x: b.x + Math.sin(angle) * metres, z: b.z - Math.cos(angle) * metres } : null });
    }
    return {
      campaign: {
        // A loose crowned sigil reveals no legend location. Only after picking
        // it up does its drawn tether supply a direction, not a remote endpoint.
        legendTrails: w.leash.tether ? (() => {
          const c = g.creatures[w.leash.tether!.id], d = Math.hypot(c.x - b.x, c.z - b.z) || 1;
          return [{ id: c.id, x: b.x, z: b.z, way: { x: b.x + (c.x - b.x) / d * 40, z: b.z + (c.z - b.z) / d * 40 } }];
        })() : g.loose.filter(p => p.legend && visible(p)).map(p => ({ id: p.id, x: p.x, z: p.z, way: null })),
        equipment: { hat: w.spells.hat, hatDown: w.hat.down ? { x: w.hat.down.x, z: w.hat.down.z } : null, broom: w.spells.broom, ready: time >= w.spells.readyAt },
        route,
        rainbow: rainbowBars.filter(visible).map(p => ({ x: p.x, z: p.z, way: { ...p.way } })),
        areas: stones.map(s => ({ key: s.key, x: s.x, z: s.z, captured: g.party.areas.has(s.key) })),
        berries: g.berries.berries.filter(r => !r.gone && r.claimedBy === null && visible(g.berries.bushes[r.bush])).map(r => { const p = g.berries.bushes[r.bush]; return { x: p.x, z: p.z }; }),
        flasks: g.relics.filter(r => r.state === "lying" && visible({ x: r.sx, z: r.sz })).map(r => ({ x: r.sx, z: r.sz })),
        troops: g.creatures.filter(c => c.leashed && !c.gone && (w.leash.stack.includes(c.id) || visible(c))).map(c => {
          const p = w.leash.placed.find(p => p.id === c.id);
          return { id: c.id, species: c.species, level: c.level, hurt: visible(c) && !!c.drops, x: visible(c) ? c.x : b.x, z: visible(c) ? c.z : b.z, placed: p && visible(p) ? { x: p.x, z: p.z } : null };
        }),
        sigils: g.loose.filter(p => !p.legend && visible(p)).map(p => ({ id: p.id, species: g.creatures[p.id].species, level: g.creatures[p.id].level, x: p.x, z: p.z })),
      },
      view: { ...ext },
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
      // Exactly the visible disco-ball pointer gate in render/view/pointers.ts
      // partyPointer, not the internal phase, route length or enemy count.
      victoryPointer: !!winPulse(g) || (won(g) && !g.win?.settled),
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
