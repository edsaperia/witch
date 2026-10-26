// The pointers on the screen's edge (moved out of view.ts's render, unchanged): toward the wave's pulse and the next stones,
// toward her hat where it lies, and toward a soundsystem under attack.
import type { View } from "../view";
import { beatTime, bpmAt } from "../../rules/beat";
import { AREA_TYPES } from "../../rules/map";
import { waveCountdown } from "../../rules/party";
import { hatMarkers } from "../../rules/hat";
import { hatInk, hatKey, noteHatLooks } from "./hatLooks";
import { leyPulse, pointerShown } from "../../rules/leypulse";
import { edgeLayout, FLASK, HAT, PARTY, StoneIndicator } from "../indicator";
import { dowseMarker } from "../../rules/hatSpells";
import { finalStone, winPulse, winTarget } from "../../rules/win";
import { AlarmIndicators } from "../alarm";
import { pinSpot } from "../pins";
import { groundHeight } from "../height";
import { ALARM_DEFAULTS, shownAlarms, stepAlarms } from "../../rules/alarms";
import { HAT_BESIDE, HAT_INK } from "../view";
import { slowAmount, slowest } from "../slowtime";

/** At most this many left before each gets a pointer (more would clutter the edge: the HUD's count says how many). */

/** Updates the pointers for this frame. */
/** How tall each pointer's subject stands (m): its pin hovers over that (render/indicator.ts). A runestone; the ley line's pulse
 *  (its sparkler, over the line); a hat or a relic's sigil on the ground; an enraged animal. */
const PIN_TOP = { stone: 3.2, pulse: 1.5, ground: 0.6, creature: 2.5 };

export function drawPointers(v: View, time: number): void {
  const g = v.game, t = g.tuning, w = g.witch;
  // The wave pointer (Ed, 2026-10-06): toward the ley line's pulse on its way to the next wave's stone (rules/leypulse.ts,
  // along the link as drawn), 🎶 in its ring as the countdown fills; for a second witch's next stone, its rune as before
  // (Ed, 2026-10-05: "We only need the UI indicator for the next one, not the next two"). None while home boots up (Ed,
  // 2026-10-06: "The wave pointer first appears when bootup finishes"; the dancefloor's boot ring shows the boot), fading
  // in as the pulse sets off.
  {
    const cw = v.canvas.clientWidth || window.innerWidth, ch = v.canvas.clientHeight || window.innerHeight, cd = waveCountdown(g.party, g.map, time);
    // In slowed time (a sleeping legend's circle) they fade out with the slowing (Ed, 2026-10-10: "fade out edge indicators while
    // you're in slow time areas"; render/slowtime.ts).
    // And none through the telescope (Ed, 2026-10-21: "nothing marked"; its view isn't hers, so the edges would point wrong).
    const calm = (1 - slowAmount(g.timeScale, slowest(t))) * (v.telescope ? 0 : 1);
    const shown = pointerShown(g.party, g.map, time) * (1 - (g.partyOver?.ease ?? 0)) * calm; // (none once the party's over: rules/partyOver.ts)
    edgeLayout.reset(); // (no two edge cues on one another: render/indicator.ts)
    const cue = (list: StoneIndicator[], cells: readonly (readonly [number, number])[], make: () => StoneIndicator, fill: number, label?: string) => {
      while (list.length < cells.length) list.push(make());
      list.forEach((ind, i) => {
        const c = cells[i];
        ind.fade(shown);
        if (!c || shown <= 0) { ind.update(v.camera, cw, ch, null, w.x, w.z, beatTime(g.beat, time), t.beat.bpm, 0); return; }
        const s = g.map.soundsystemSpot(c[0], c[1]), species = AREA_TYPES[g.map.typeOf(c[0], c[1])].creature;
        const pulse = i === 0 ? v.ley.pulseTip ?? leyPulse(g.party, g.map, time, v.ley.currentLink()) : null, at = pulse ?? s; // (the sparkler's own point, drawn this frame)
        ind.update(v.camera, cw, ch, { x: at.x, z: at.z, colour: v.markerArt.colour.get(species)!, species, notes: i === 0, glyph: i === 0 && finalStone(g) ? PARTY : undefined, gap: t.pins?.gap, top: pulse ? PIN_TOP.pulse : PIN_TOP.stone }, w.x, w.z, beatTime(g.beat, time), t.beat.bpm, fill, label);
      });
    };
    // Pausing holds the countdown. Its label is the party's tempo (Ed, 2026-10-07: "The BPM is shown on the sparkler
    // marker, and above the decks"), pulsing up when a knockdown raises it (rules/beat.ts knockdownTempo).
    cue(v.nextStones, g.win && g.win.phase !== "stragglers" ? [] : g.party.next, () => new StoneIndicator(document.body, 3), cd.gone, `${Math.round(bpmAt(g.beat, time))} bpm`);
    const bonus = g.beat.bonus ?? 0;
    if (bonus > v.pointerBonus) { v.pointerBonus = bonus; v.nextStones[0]?.pop(); }
    // Her hats on the ground (Ed, 2026-10-06: "there's a direction marker for it, so you can go back and find it"): toward each
    // off screen, over it on screen, while it lies there; the ring in the HUD's amber, and (Ed, 2026-10-12: "If there are multiple
    // hats on the ground, they each get a pointer"; "the pointer colour can be in the hat colour chosen in the character creator")
    // each 🎩 in its own hat's colour, the look it went down in (render/view/hatLooks.ts).
    noteHatLooks(v);
    const hats = hatMarkers(g.witches[0].hat);
    while (v.hatPointers.length < hats.length) v.hatPointers.push(new StoneIndicator(document.body, 3));
    v.hatPointers.forEach((P, i) => {
      const H = hats[i];
      P.fade(H ? calm : 0);
      P.update(v.camera, cw, ch, H ? { x: H.x + HAT_BESIDE, z: H.z, colour: HAT_INK, species: "", glyph: HAT, glyphColour: hatInk(v.hatLooks.get(hatKey(H))), gap: t.pins?.gap, top: PIN_TOP.ground } : null, w.x, w.z, beatTime(g.beat, time), t.beat.bpm, 1);
    });
    // The Dowsing hat (rules/hatSpells.ts): toward the nearest relic still to find, for a while after she puts it down.
    const D = dowseMarker(g, g.witches[0].spells, g.herTime);
    if (D || v.dowsePointer) {
      const P = (v.dowsePointer ??= new StoneIndicator(document.body, 3));
      P.fade(D ? calm : 0);
      P.update(v.camera, cw, ch, D ? { x: D.x, z: D.z, colour: HAT_INK, species: "", glyph: FLASK, gap: t.pins?.gap, top: PIN_TOP.ground } : null, w.x, w.z, beatTime(g.beat, time), t.beat.bpm, 1);
    }
    // The end of the route (rules/win.ts): toward the enraged animal nearest the centre while any lives (its sigil, in its
    // neon), then toward the victory lap's pulse racing home (🎉).
    const S = winTarget(g), L = winPulse(g);
    if (S || L || v.winPointer) {
      const P = (v.winPointer ??= new StoneIndicator(document.body, 3));
      P.fade(S || L ? calm : 0);
      const at = S ? { x: S.x, z: S.z, colour: v.markerArt.colour.get(S.species)!, species: S.species, gap: t.pins?.gap, top: PIN_TOP.creature } : L ? { x: v.ley.pulseTip?.x ?? L.x, z: v.ley.pulseTip?.z ?? L.z, colour: v.markerArt.colour.get(AREA_TYPES[g.map.typeOf(g.map.centreCell[0], g.map.centreCell[1])].creature) ?? HAT_INK, species: "", glyph: PARTY, gap: t.pins?.gap, top: PIN_TOP.pulse } : null;
      P.update(v.camera, cw, ch, at, w.x, w.z, beatTime(g.beat, time), t.beat.bpm, 1);
    }
    // Anyone's pins (render/pins.ts: view.pin), toward their targets as the pointers are, a house object's as the house is drawn.
    const ht = g.herTime, dt = Number.isFinite(v.pinsAt) ? Math.min(0.1, Math.max(0, ht - v.pinsAt)) : 0; v.pinsAt = ht; // (on her clock: the house's time runs at a tenth)
    // (in the house, where time runs slow too, they stay: they're there to guide her round it; the telescope's view still has none)
    const pinCalm = v.herOffset.on ? (v.telescope ? 0 : 1) : calm;
    for (const P of v.pins) P.draw(v.camera, cw, ch, pinSpot(P.target, g.map, t, v.herOffset, groundHeight), w.x, w.z, beatTime(g.beat, time), t.beat.bpm, dt, pinCalm, t.pins?.gap);
    // A soundsystem (or the home ring's speakers) under attack off screen (Ed, 2026-10-06): 🔇 at the edge toward it.
    const AT = t.alarms ?? ALARM_DEFAULTS;
    stepAlarms(v.alarms, g.combat.sounds, g.combat.events, time, AT);
    if (v.alarms.byKey.size || v.alarmCues) (v.alarmCues ??= new AlarmIndicators(document.body)).update(v.camera, cw, ch, shownAlarms(v.alarms, AT), w.x, w.z, time, AT, calm);
  }
}
