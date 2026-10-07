// The pointers on the screen's edge (moved out of view.ts's render, unchanged): toward the wave's pulse and the next stones,
// toward her hat where it lies, and toward a soundsystem under attack.
import type { View } from "../view";
import { beatTime } from "../../rules/beat";
import { AREA_TYPES } from "../../rules/map";
import { waveCountdown } from "../../rules/party";
import { hatMarker } from "../../rules/hat";
import { leyPulse, pointerShown } from "../../rules/leypulse";
import { edgeLayout, HAT, StoneIndicator } from "../indicator";
import { AlarmIndicators } from "../alarm";
import { ALARM_DEFAULTS, shownAlarms, stepAlarms } from "../../rules/alarms";
import { HAT_BESIDE, HAT_INK } from "../view";
import { clearableAt, wildLeft } from "../../rules/clear";

/** At most this many left before each gets a pointer (more would clutter the edge: the HUD's count says how many). */
const WILD_POINTERS = 3;

/** Updates the pointers for this frame. */
export function drawPointers(v: View, time: number): void {
  const g = v.game, t = g.tuning, w = g.witch;
  // The wave pointer (Ed, 2026-10-06): toward the ley line's pulse on its way to the next wave's stone (rules/leypulse.ts,
  // along the link as drawn), 🎶 in its ring as the countdown fills; for a second witch's next stone, its rune as before
  // (Ed, 2026-10-05: "We only need the UI indicator for the next one, not the next two"). None while home boots up (Ed,
  // 2026-10-06: "The wave pointer first appears when bootup finishes"; the dancefloor's boot ring shows the boot), fading
  // in as the pulse sets off.
  {
    const cw = v.canvas.clientWidth || window.innerWidth, ch = v.canvas.clientHeight || window.innerHeight, cd = waveCountdown(g.party, g.map, time);
    const shown = pointerShown(g.party, g.map, time) * (1 - (g.partyOver?.ease ?? 0)); // (none once the party's over: rules/partyOver.ts)
    edgeLayout.reset(); // (no two edge cues on one another: render/indicator.ts)
    const cue = (list: StoneIndicator[], cells: readonly (readonly [number, number])[], make: () => StoneIndicator, fill: number, label?: string) => {
      while (list.length < cells.length) list.push(make());
      list.forEach((ind, i) => {
        const c = cells[i];
        ind.fade(shown);
        if (!c || shown <= 0) { ind.update(v.camera, cw, ch, null, w.x, w.z, beatTime(g.beat, time), t.beat.bpm, 0); return; }
        const s = g.map.soundsystemSpot(c[0], c[1]), species = AREA_TYPES[g.map.typeOf(c[0], c[1])].creature;
        const pulse = i === 0 ? leyPulse(g.party, g.map, time, v.ley.currentLink()) : null, at = pulse ?? s;
        ind.update(v.camera, cw, ch, { x: at.x, z: at.z, colour: v.markerArt.colour.get(species)!, species, notes: i === 0 }, w.x, w.z, beatTime(g.beat, time), t.beat.bpm, fill, label);
      });
    };
    // Pausing holds the countdown.
    cue(v.nextStones, g.party.next, () => new StoneIndicator(document.body, 3), cd.gone);
    // Her hat on the ground (Ed, 2026-10-06: "there's a direction marker for it, so you can go back and find it"): toward it
    // off screen, over it on screen, while it lies there; in the HUD's amber.
    const H = hatMarker(g.witches[0].hat);
    if (H || v.hatPointer) {
      const P = (v.hatPointer ??= new StoneIndicator(document.body, 3));
      P.fade(H ? 1 : 0);
      P.update(v.camera, cw, ch, H ? { x: H.x + HAT_BESIDE, z: H.z, colour: HAT_INK, species: "", glyph: HAT } : null, w.x, w.z, beatTime(g.beat, time), t.beat.bpm, 1);
    }
    // The last few wild animals holding the wild area she's in (Ed's playtest, 2026-10-07: clearing it needs every one of its
    // own invited or run off, and some were out of sight): their sigil in a ring, toward each off screen, over it on screen.
    {
      const L = v.wildLeftList, now = performance.now();
      if (now - L.at > 250) {
        L.at = now;
        const cell = g.partyOver || w.seated ? null : clearableAt(g.party, g.map, w.x, w.z);
        L.list = cell ? wildLeft(g.creatures, cell) : [];
        if (L.list.length > WILD_POINTERS) L.list = [];
      }
      while (v.wildPointers.length < L.list.length) v.wildPointers.push(new StoneIndicator(document.body, 2, 0.85));
      v.wildPointers.forEach((P, i) => {
        const c = L.list[i], colour = c && v.markerArt.colour.get(c.species);
        P.fade(colour ? 1 : 0);
        P.update(v.camera, cw, ch, c && colour ? { x: c.x, z: c.z, colour, species: c.species } : null, w.x, w.z, beatTime(g.beat, time), t.beat.bpm, 1);
      });
    }
    // A soundsystem (or the home ring's speakers) under attack off screen (Ed, 2026-10-06): 🔇 at the edge toward it.
    const AT = t.alarms ?? ALARM_DEFAULTS;
    stepAlarms(v.alarms, g.combat.sounds, g.combat.events, time, AT);
    if (v.alarms.byKey.size || v.alarmCues) (v.alarmCues ??= new AlarmIndicators(document.body)).update(v.camera, cw, ch, shownAlarms(v.alarms, AT), w.x, w.z, time, AT);
  }
}
