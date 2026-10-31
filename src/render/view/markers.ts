// A4 mechanical extraction from src/render/view.ts; body identity is checked by tools/refactor/a4-split.mjs.
import type { View, ViewInternals, ViewShared } from "../view";
import type { Game } from "../../rules/game";
import { FALLBACK_LOOK, floorLook } from "../legendFloor";
import { AREA_TYPES, nearestClearings } from "../../rules/map";
import { ZOO_CONFIG } from "../../rules/zoo";
import { groundHeight } from "../height";
import { HAND, letterAt } from "../invites";
import { Pin, type PinLook, type PinTarget } from "../pins";

export function legendRings(view: View, internals: ViewInternals, _shared: ViewShared, g: Game, time: number): { x: number; z: number; r: number; edge: number; glow: number }[] {
    // (the zoo's plaza, Ed 2026-10-26: "Home appears as a stone plaza with the ent's sigil on it (drawn like the floor of a legend
    // circle)": a floor of its own round the dancefloor, the World Tree carved in, drawn after the legends' nearest five)
    const plaza = null as { x: number; z: number } | null; // (the zoo's plaza draws its own sigil now: render/ground.ts uZooPlaza)
    const w = g.witch, dt = Math.min(0.1, Math.max(0, time - view.lastRingTime)), near = nearestClearings(g.map.legendClearings, w.x, w.z, internals.nearRings, plaza ? 5 : 6);
    view.lastRingTime = time;
    for (const e of g.leashEvents) if (e.kind === "outsideCircle") {
      const L = g.creatures[e.id], c = L && g.map.legendClearing(L.cell[0], L.cell[1]);
      if (c) { const s = view.ringGlow.get(c) ?? { k: 0, flash: -9 }; s.flash = time; view.ringGlow.set(c, s); }
    }
    const out = internals.ringItems;
    for (let i = 0; i < near.length; i++) {
      const c = near[i], s = view.ringGlow.get(c) ?? { k: 0, flash: -9 };
      const inside = w.mode === "ground" && Math.hypot(w.x - c.x, w.z - c.z) <= c.r ? 1 : 0;
      s.k += (inside - s.k) * Math.min(1, dt * 4);
      if (!view.ringGlow.has(c)) view.ringGlow.set(c, s);
      const f = time - s.flash, flash = f >= 0 && f < 1.5 ? (1 - f / 1.5) * (0.6 + 0.4 * Math.cos(f * 12)) : 0;
      Object.assign(out[i], { x: c.x, z: c.z, r: c.r, edge: c.edge, glow: Math.min(1, Math.max(s.k, flash)) });
    }
    view.ringCount = near.length;
    if (plaza) { Object.assign(out[near.length], { x: plaza.x, z: plaza.z, r: ZOO_CONFIG.plaza ?? 60, edge: g.tuning.legendClearing.edge, glow: 0.7 }); view.ringCount++; } // (lit always: the coordinator, 2026-10-26, "as clear as a legend circle's floor")
    // Their floors (render/ground.ts): each carving its legend's kind; its grooves' glint (the tuning's knob, 0 off) while it sleeps.
    const glint = g.tuning.legendClearing.floor?.glint ?? 0;
    for (let i = 0; i < near.length; i++) {
      const c = near[i], f = internals.floorItems[i];
      const A = AREA_TYPES[g.map.typeOf(c.cell[0], c.cell[1])];
      f.species = A.creature; f.look = floorLook(A.id);
      let id = view.ringLegend.get(c);
      if (id === undefined) { id = (g.legendIds ?? []).find(k => { const L = g.creatures[k]; return L && L.cell[0] === c.cell[0] && L.cell[1] === c.cell[1]; }) ?? -1; view.ringLegend.set(c, id); }
      const L = id >= 0 ? g.creatures[id] : undefined;
      f.glint = glint > 0 && L && !L.gone && (L.legendState === "asleep" || L.legendState === "restless") ? glint : 0;
    }
    if (plaza) { const f = internals.floorItems[near.length]; f.species = "worldTree"; f.look = FALLBACK_LOOK; f.glint = 4; } // (its grooves glinting, so the World Tree reads)
    return out;
  }

export function pin(view: View, _internals: ViewInternals, _shared: ViewShared, target: PinTarget, look: PinLook): Pin & { remove(): void } {
    const p = Object.assign(new Pin(target, look), { remove: () => { view.pins.delete(p); p.dispose(); } });
    view.pins.add(p);
    return p;
  }

export function inviteStart(view: View, _internals: ViewInternals, _shared: ViewShared, g: Game): { x: number; y: number; z: number; world: boolean } {
    const [x, y, z] = letterAt(view.herOffset, g.witch.x, HAND, g.witch.z);
    return { x, y: y + groundHeight(x, z), z, world: true };
  }
