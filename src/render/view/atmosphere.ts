// A4 mechanical extraction from src/render/view.ts; body identity is checked by tools/refactor/a4-split.mjs.
import type { View, ViewInternals, ViewShared } from "../view";
import type { Game } from "../../rules/game";
import { AREA_TYPES } from "../../rules/map";
import { moonState, type MoonState } from "../../rules/moon";
import { lakeLooksOf, steamVents } from "../lakeLooks";
import { lakeKnobs } from "../../rules/lakes";
import { groundHeight } from "../height";
import { LIGHT_UNIFORMS } from "../lighting";
import { moodOf } from "../mood";

export function updateMoon(view: View, internals: ViewInternals, _shared: ViewShared, g: Game): MoonState {
    const m = moonState(g.clock.time + view.moonShift, g.seed, g.tuning), k = m.kind === "red" ? g.tuning.moon.bloodTint : g.tuning.moon.tint, P = [0.92, 0.94, 0.86];
    const r = 1 + (m.rgb[0] / P[0] - 1) * k, gr = 1 + (m.rgb[1] / P[1] - 1) * k, b = 1 + (m.rgb[2] / P[2] - 1) * k, n = 3 / (r + gr + b); // its hue, not its brightness
    LIGHT_UNIFORMS.uMoon.value.set(internals.moonBase.x * r * n, internals.moonBase.y * gr * n, internals.moonBase.z * b * n);
    const U = LIGHT_UNIFORMS.uMoonUp.value;
    U.set(internals.moonUpBase.x * r * n, internals.moonUpBase.y * gr * n, internals.moonUpBase.z * b * n, U.w);
    LIGHT_UNIFORMS.uUnlitDim.value = moodOf(g.tuning)?.unlit ?? 1; // (what nothing lights, darker: live from the pause page)
    return m;
  }

export function updateSteam(_view: View, internals: ViewInternals, _shared: ViewShared, g: Game, time: number): void {
    const S = internals.steam, w = g.witch;
    if (internals.steamFor?.map !== g.map) { const k = lakeLooksOf(g.map); internals.steamFor = { map: g.map, vents: k ? steamVents(k, lakeKnobs(g.tuning).steam.spacing) : new Float32Array(0) }; }
    const v = internals.steamFor.vents;
    S.begin();
    for (let i = 0; i < v.length; i += 2) S.add(v[i], groundHeight(v[i], v[i + 1]), v[i + 1], 1, w.x, w.z);
    S.end(time);
  }

export function updateSmoke(view: View, internals: ViewInternals, _shared: ViewShared, g: Game, time: number): void {
    const S = internals.smoke, t = g.tuning, w = g.witch, R = t.smoke.range;
    S.begin();
    for (const f of view.worldFires) S.add(f.x, groundHeight(f.x, f.z), f.z, f.scale, w.x, w.z);
    view.partyObjects.fires(g, time, w.x, w.z, R, (x, z, size) => S.add(x, groundHeight(x, z), z, size, w.x, w.z));
    if (Math.hypot(w.x - view.moundsAt.x, w.z - view.moundsAt.z) > R * 0.25) { // the charcoal burner's mound smoulders by its hut (art/setpieces.js charcoal-hut: the mound to its right, a little nearer)
      view.moundsAt = { x: w.x, z: w.z }; view.mounds = [];
      const k = t.setPieceScale;
      for (const p of g.forest.setPiecesNear(w.x, w.z, R * 1.3)) if (AREA_TYPES[p.type]?.id === "twiggy-forest") view.mounds.push(p.x + 2.3 * k, p.z + 1.0 * k);
    }
    for (let i = 0; i < view.mounds.length; i += 2) S.add(view.mounds[i], groundHeight(view.mounds[i], view.mounds[i + 1]), view.mounds[i + 1], 1.2, w.x, w.z);
    S.end(time);
  }
