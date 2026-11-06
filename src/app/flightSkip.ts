// What skips a sail's flight (the sea chart's zoom in, app/chartView.ts; the game's dive after it, main.ts armSkip): any key, tap
// or pad button pressed while it flies, but only a fresh press. The press that sailed doesn't count while it's still held: at the
// map table a sail is a hold (Space or Enter, the mouse or the pad's cross, over the tuning's chart.sailHold seconds), so when the
// flight sets off that key is still down and repeating, that button still pressed, and the mouse comes up after it. Those used to
// skip the whole zoom at once (Ed, 2026-11-06, v7569: "When I start sailing, I do not zoom into the map at all but cut immediately
// to a blue loading screen": the chart's last frame, the game's sea blue, held while the night was made).

/** A key down while the flight flies skips it unless it's the key's auto-repeat (still held from the sail). */
export const keySkipsFlight = (e: Pick<KeyboardEvent, "repeat">): boolean => !e.repeat;

/** The pad skips the flight on a button newly pressed this frame (`before`, the last frame's), not on one still held. */
export const padSkipsFlight = (pressed: readonly boolean[], before: readonly boolean[]): boolean => pressed.some((b, i) => b && !before[i]);

