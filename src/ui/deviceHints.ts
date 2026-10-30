// Overlay readouts use one device at a time, and the bindings as they are now, rather than mixing keyboard words with pad glyphs.
import { keysName, padName } from "../platform/bindings";
import { padMoveName } from "./controlsText";

export type HintDevice = "keys" | "pad" | "touch";

export function telescopeHint(device: HintDevice): string {
  return device === "pad"
    ? `${padMoveName("menu")} or ${padMoveName("game.aim")} look round   ${padName("menu.zoomIn")} / ${padName("menu.zoomOut")} zoom   ${padName("menu.back")} ⏏`
    : device === "touch"
    ? "movement control looks round   + / − zoom   sigil to leave"
    : `mouse or arrow keys look round   wheel / ${keysName("menu.zoomIn")} / ${keysName("menu.zoomOut")} zoom   ${keysName("menu.back")} ⏏`;
}

export function chartHint(device: HintDevice, table: boolean, sailing: boolean): string {
  const legend = "sigils: islands you can sail to · gold rings: won";
  if (device === "pad") return `${padMoveName("menu")} to choose${sailing ? ` · ${table ? "hold " : ""}${padName("menu.choose")} to sail` : ""} · ${padName("menu.zoomIn")} / ${padName("menu.zoomOut")} zoom${table ? ` · ${padName("menu.back")} to put it down` : ""} · ${legend}`;
  if (device === "touch") return `Tap an island to look at it${sailing ? table ? " · hold it to sail" : ", again to sail" : ""} · pinch to zoom · ${legend}`;
  return `point or arrows to choose${sailing ? ` · ${table ? "hold the mouse or " : ""}Space / Enter to sail` : ""} · wheel to zoom${table ? ` · ${keysName("menu.back")} to put it down` : ""} · ${legend}`;
}
