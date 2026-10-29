// The Settings page in the game (ui/settingsMenu.ts; Ed, 2026-10-28: on the pause page, opened for now by "Show settings page" at
// the top of its dev menu): the player's settings (app/playerSettings.ts) put on the page's live pieces at load and as they change
// (the night's tuning, screen shake, Talk's hold or toggle, the comfort flags, text size, the quality ladder, muting in the
// background), fullscreen and the screen it goes to, and the page itself, its code loaded on the first open.
import { applySettings, currentSettings, ladderChoice, padGlyphs, setCurrentSettings, type PlayerSettings } from "./playerSettings";
import { padGlyphStyle } from "../ui/keyHint";
import { RUNGS } from "../rules/ladder";
import { comfort } from "../render/comfort";
import type { Input } from "../platform/input";
import type { ScreenShake } from "./shake";
import type { QualityLadder } from "./ladder";
import type { Freeze } from "../platform/freeze";
import type { SettingsMenu } from "../ui/settingsMenu";

/** The page's text panels text size scales (CSS zoom; Chrome, Safari and Firefox 126 on). */
const TEXT = ["#station-panel", "#studio-panel", ".corner-panel", ".legend-panel", ".boot-pop", ".loss-pop", "#sound-note", "#pause-btns", "#settings-page .win"];

export interface SettingsPageHost {
  input: Input; shake: ScreenShake; ladder: QualityLadder; freeze: Freeze;
  /** the context's suspend or resume (Sound.freeze): muted in the background, and while paused as ever */
  audio(on: boolean): void;
  tuning(): object;
  version: string;
}

type ScreenDetails = { screens: { label?: string }[] };
const getDetails = (): Promise<ScreenDetails> | null => { const w = window as unknown as { getScreenDetails?: () => Promise<ScreenDetails> }; return w.getScreenDetails ? w.getScreenDetails() : null; };

/** Muted in the background: the setting on, and the page hidden or its window not focused (the audio watchdog, main.ts, keeps out too). */
export const mutedAway = (): boolean => currentSettings().muteBackground && typeof document !== "undefined" && (document.hidden || !document.hasFocus());

export class SettingsPage {
  private menu: SettingsMenu | null = null;
  private loading = false;
  private quality = "";
  private readonly style = document.createElement("style");

  constructor(private host: SettingsPageHost) {
    document.head.append(this.style);
    this.live(currentSettings(), true);
    const gate = () => this.gate();
    window.addEventListener("blur", gate); window.addEventListener("focus", gate); document.addEventListener("visibilitychange", gate);
  }

  get open(): boolean { return !!this.menu?.open; }

  /** The page's sound: suspended while paused (as ever) or, with mute in the background, while the page is hidden or unfocused. */
  gate(): void { this.host.audio(!(this.host.freeze.frozen || mutedAway())); }

  /** The settings on to everything live (at load: `boot`, the ladder left to start where it would unless one is fixed). */
  private live(s: PlayerSettings, boot = false): void {
    applySettings(s, this.host.tuning());
    this.host.shake.shake.on = s.shake;
    this.host.input.talkMode = s.talk;
    comfort.reduceFlashing = s.reduceFlashing;
    this.style.textContent = s.textSize === 1 ? "" : `${TEXT.join(", ")} { zoom: ${s.textSize}; }`;
    const q = ladderChoice(s.quality, RUNGS.length - 1);
    if (!(boot && s.quality === "auto") && q !== this.quality) this.host.ladder.choose(q);
    this.quality = q;
    if (!boot) this.gate();
  }

  /** New settings: saved, and on to everything at once. */
  set(s: PlayerSettings): void { setCurrentSettings(s); this.live(currentSettings()); }

  /** Opened from the pause page (its code loaded the first time). */
  show(): void {
    if (this.menu) { this.menu.show(); return; }
    if (this.loading) return;
    this.loading = true;
    void import("../ui/settingsMenu").then(({ SettingsMenu }) => {
      this.menu = new SettingsMenu({
        get: () => currentSettings(), set: s => this.set(s), version: this.host.version,
        fullscreen: () => !!document.fullscreenElement,
        setFullscreen: async (on, screen) => {
          try {
            if (!on) { if (document.fullscreenElement) await document.exitFullscreen(); return null; }
            const details = screen ? await getDetails() : null, scr = details?.screens.find((x, i) => (x.label || `Screen ${i + 1}`) === screen);
            await document.documentElement.requestFullscreen(scr ? ({ screen: scr } as FullscreenOptions) : undefined);
            return null;
          } catch { return "The browser wants a key or a click for fullscreen: press Enter on it, or click it (a pad can't start it)."; }
        },
        canPickScreen: () => !!getDetails,
        screens: async () => { try { const d = await getDetails(); return d ? d.screens.map((x, i) => x.label || `Screen ${i + 1}`) : null; } catch { return null; } },
        pad: () => this.host.freeze.pad(),
      });
      this.menu.show();
    }, () => { this.loading = false; });
  }
  close(): void { this.menu?.close(); }
  /** Each frame: the pad, while it's open. */
  update(now: number): void {
    padGlyphStyle.xbox = padGlyphs(currentSettings().glyphs, this.host.freeze.pad()?.id) === "xbox"; // (the prompts' pad buttons: ui/keyHint.ts)
    this.menu?.update(now);
  }
}
