// The player's settings (the Settings page, ui/settingsMenu.ts; Ed, 2026-10-28: "a game settings menu where the player can [remap
// keys] as well as other common settings things (volume, choose monitor, etc)"; his picks from the mock, previews/ed/settings-menu):
// one record, saved on this browser (localStorage witch.player, a blocked storage this load only), each change applied at once with
// no Apply button. Today's saved volumes (app/settings.ts, the pause page's Volume sliders) and the start screen's screen shake
// (witch.shake) carry over the first time. What each one changes in the game: `applySettings` here for the tuning's knobs, the rest
// read where they act (the comfort flags, render/comfort.ts; the hold or toggle, platform/input.ts; text size, the page's CSS).

export type Quality = "auto" | "high" | "medium" | "low";
export type HoldMode = "hold" | "toggle";
export type Glyphs = "auto" | "ps" | "xbox";
export interface PlayerSettings {
  /** volumes, 0 to 1: everything, the music, the sound effects, the voices (the witch's and the animals' babble) */
  master: number; music: number; effects: number; voices: number;
  /** the sound muted while the page is hidden or the window isn't focused */
  muteBackground: boolean;
  /** the quality ladder: auto (its own), or a fixed high (full quality), medium or low */
  quality: Quality;
  /** screen shake: her hits and the legends' quakes */
  shake: boolean;
  /** the screen to go fullscreen on (a label from the browser's screen list; "" this window's) */
  screen: string;
  /** reduce flashing: the danger frame's "now" blink, the hit flashes, a legend's flash */
  reduceFlashing: boolean;
  /** Talk: held (as today) or a press to start and another to stop */
  talk: HoldMode;
  /** menus and hints' text, times */
  textSize: 1 | 1.25 | 1.5;
  /** the pad's button names: from its name, or PlayStation's or Xbox's */
  glyphs: Glyphs;
  /** short event feedback on gamepads that support vibration */
  rumble: boolean;
}

export const DEFAULTS: PlayerSettings = { master: 1, music: 0.5, effects: 1, voices: 1, muteBackground: true, quality: "auto", shake: true, screen: "", reduceFlashing: false, talk: "hold", textSize: 1, glyphs: "auto", rumble: true };
export const KEY = "witch.player";
/** (the pause page's saved volumes and the start screen's shake: carried over the first time) */
const OLD_VOLUMES = "witch.settings", OLD_SHAKE = "witch.shake";

/** A storage (localStorage, or a test's stand-in). */
export interface Store { getItem(k: string): string | null; setItem(k: string, v: string): void }
const local = (): Store | null => { try { return typeof localStorage === "undefined" ? null : localStorage; } catch { return null; } };

/** Each value checked against its kind and range; anything else is its default. */
export function clean(raw: unknown): PlayerSettings {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>, out = { ...DEFAULTS };
  const num = (k: keyof PlayerSettings) => { const v = r[k]; if (typeof v === "number" && v >= 0 && v <= 1) (out as Record<string, unknown>)[k] = v; };
  const bool = (k: keyof PlayerSettings) => { if (typeof r[k] === "boolean") (out as Record<string, unknown>)[k] = r[k]; };
  const one = <T>(k: keyof PlayerSettings, opts: readonly T[]) => { if (opts.includes(r[k] as T)) (out as Record<string, unknown>)[k] = r[k]; };
  num("master"); num("music"); num("effects"); num("voices");
  bool("muteBackground"); bool("shake"); bool("reduceFlashing"); bool("rumble");
  one("quality", ["auto", "high", "medium", "low"]); one("talk", ["hold", "toggle"]); one("textSize", [1, 1.25, 1.5]); one("glyphs", ["auto", "ps", "xbox"]);
  if (typeof r.screen === "string") out.screen = r.screen.slice(0, 80);
  return out;
}

/** The saved settings; the first time, today's saved volumes and screen shake carried over. */
export function loadSettings(store: Store | null = local()): PlayerSettings {
  if (!store) return { ...DEFAULTS };
  try {
    const t = store.getItem(KEY);
    if (t) return clean(JSON.parse(t));
    const old = JSON.parse(store.getItem(OLD_VOLUMES) ?? "{}") as Record<string, unknown>, s = { ...DEFAULTS };
    if (typeof old.musicVolume === "number" && old.musicVolume >= 0 && old.musicVolume <= 1) s.music = old.musicVolume;
    if (typeof old.sfxVolume === "number" && old.sfxVolume >= 0 && old.sfxVolume <= 1) s.effects = old.sfxVolume;
    if (store.getItem(OLD_SHAKE) === "0") s.shake = false;
    return s;
  } catch { return { ...DEFAULTS }; }
}

/** Saved (false: the storage refused; the settings still hold for this load). */
export function saveSettings(s: PlayerSettings, store: Store | null = local()): boolean {
  if (!store) return false;
  try { store.setItem(KEY, JSON.stringify(s)); if (!s.shake) store.setItem(OLD_SHAKE, "0"); else store.setItem(OLD_SHAKE, "1"); return true; } catch { return false; }
}

/** The tuning's knobs the settings set, and what each was as the tuning was made (so a change is from the built value, not
 *  compounded). */
interface Knobs { music: { volume: number }; sfx: { volume: number; voice: Record<string, { volume?: number }> }; combat: { shake: number }; attackFx: { legendFlash: number } }
export interface SettingsBase { voices: Record<string, number>; shake: number; legendFlash: number }
const BASE = new WeakMap<object, SettingsBase>();
/** A resumed tuning has settings baked in already; retain the original levels so applying settings doesn't compound them. */
export function settingsBase(tuning: object): SettingsBase | undefined { const b = BASE.get(tuning); return b ? structuredClone(b) : undefined; }
export function restoreSettingsBase(tuning: object, base: SettingsBase): void {
  if (!base || !base.voices || typeof base.voices !== "object" || !Number.isFinite(base.shake) || !Number.isFinite(base.legendFlash) || Object.values(base.voices).some(v => !Number.isFinite(v))) throw new Error("Invalid saved settings levels.");
  BASE.set(tuning, structuredClone(base));
}

/** The settings on to a night's tuning: the volumes (master times each; the voices on every babbling voice's own level), a legend's
 *  quake shake (off with screen shake), a legend's flash (none with reduce flashing). */
export function applySettings(s: PlayerSettings, tuning: object): void {
  const t = tuning as Knobs;
  let b = BASE.get(t);
  if (!b) BASE.set(t, (b = { voices: Object.fromEntries(Object.entries(t.sfx.voice ?? {}).map(([k, v]) => [k, v.volume ?? 0])), shake: t.combat.shake, legendFlash: t.attackFx?.legendFlash ?? 0 }));
  t.music.volume = s.music * s.master;
  t.sfx.volume = s.effects * s.master;
  for (const [k, v] of Object.entries(t.sfx.voice ?? {})) if (typeof v.volume === "number") v.volume = (b.voices[k] ?? v.volume) * s.voices;
  t.combat.shake = s.shake ? b.shake : 0;
  if (t.attackFx) t.attackFx.legendFlash = s.reduceFlashing ? 0 : b.legendFlash;
}

/** The quality ladder's choice (app/ladder.ts QualityLadder.choose) for a setting: auto its own; high full quality (off); medium and
 *  low pinned at the middle and the top rung of `last`. */
export function ladderChoice(q: Quality, last: number): string {
  return q === "auto" ? "auto" : q === "high" ? "off" : String(q === "medium" ? Math.round(last / 2) : last);
}

/** A pad's glyphs from its name (Gamepad.id): Microsoft's or "xbox"/"xinput" Xbox, else PlayStation (Sony's and the rest). */
export function padGlyphs(setting: Glyphs, padId: string | undefined): "ps" | "xbox" {
  if (setting !== "auto") return setting;
  return padId && /xbox|xinput|045e/i.test(padId) ? "xbox" : "ps";
}

// This page's settings: loaded once, then kept here as they change (so a blocked storage still holds them for the page's nights).
let current: PlayerSettings | null = null;
/** The page's settings now. */
export function currentSettings(): PlayerSettings { return (current ??= loadSettings()); }
/** New settings for the page, saved (false: not saved, this page only). */
export function setCurrentSettings(s: PlayerSettings): boolean { current = clean(s); return saveSettings(current); }
/** The pause page's own Volume sliders (ui/decide.ts, the music and sound effects knobs) moved: the settings follow, so the next night
 *  (which puts the settings on last) keeps what was chosen there. */
export function devVolume(knob: string | undefined, v: unknown): void {
  if (typeof v !== "number" || (knob !== "music.volume" && knob !== "sfx.volume")) return;
  const s = currentSettings(), x = s.master > 0 ? Math.min(1, Math.max(0, v / s.master)) : v;
  setCurrentSettings(knob === "music.volume" ? { ...s, music: x } : { ...s, effects: x });
}
