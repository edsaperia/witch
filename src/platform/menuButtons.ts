// The menus' buttons, in one place so remapping them is one line (the coordinator, 2026-10-28: Ed is deciding PlayStation-style
// defaults, likely cross opens and chooses, circle goes back): `confirm` chooses what's in focus in a station's panel (ui/stationPanel.ts,
// ui/stationLines.ts panelPad), `back` closes it (the panel's own keys; the pad's through platform/input.ts padControls while a menu
// owns the pad, the telescope's too). Keys by KeyboardEvent.code; pad buttons by the standard gamepad's index (0 cross / A, 1 circle /
// B, 2 square / X, 3 triangle / Y). Today's as they were: Space or Enter and cross choose, E and square close.
export const MENU_BUTTONS = {
  confirm: { keys: ["Space", "Enter", "NumpadEnter"], pad: [0] },
  back: { keys: ["KeyE"], pad: [2] },
} as const;
