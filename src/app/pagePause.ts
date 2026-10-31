// A4 mechanical extraction from src/main.ts; body identity is checked by tools/refactor/a4-split.mjs.
import type { PageHost } from "../main";
import { toggleCornerPanel, closeCornerPanel, cornerPanelRoot } from "../ui/cornerPanel";
import { setUnlockAll, stockMushroomBaskets, syncHatUnlock, unlockAll } from "./debugUnlock";
import { defaultsText, newWitchLink } from "./defaultLook";
import { lookWithoutLoan, partsWithoutLoan } from "./loan";
import { fightLink, newFightSeed } from "./fightArena";
import { mutedAway } from "./settingsPage";
import { gpuLine } from "../render/view/gpuBudget";
import { notable } from "../platform/playtestJournal";
import { recordedStep } from "./recordingHooks";

export async function openPotionLab(pageHost: PageHost): Promise<void> {
  const { PotionLab } = await import("../ui/potionLab");
  pageHost.potionLab ??= new PotionLab(() => pageHost.N().game, pageHost.style, pageHost.BUILD, () => { if (pageHost.freeze.frozen) pageHost.freeze.toggle(); }, pageHost.mutate);
  if (pageHost.freeze.frozen) pageHost.potionLab.show();
}

export function pauseControls(pageHost: PageHost, on: boolean): void {
  if (!on || pageHost.dressed) { if (pageHost.pauseBtns) pageHost.pauseBtns.style.display = "none"; closeCornerPanel(); return; }
  if (!pageHost.pauseBtns) {
    pageHost.pauseBtns = document.createElement("div");
    pageHost.pauseBtns.id = "pause-btns"; pageHost.pauseBtns.style.cssText = "position:fixed;right:12px;top:12px;z-index:61;display:flex;gap:8px";
    const keys = pageHost.startEl.querySelector<HTMLElement>(".keys");
    for (const [label, id, title, el] of [["❔ Controls", "controls", "CONTROLS", keys], ["⚙ Options", "options", "OPTIONS", pageHost.shakeEl]] as const) {
      if (!el) continue;
      const b = document.createElement("button");
      b.type = "button"; b.textContent = label;
      b.style.cssText = "font:13px ui-monospace,monospace;color:#e8e2f4;background:rgba(10,9,22,.86);border:1px solid #3a2f5c;border-radius:6px;padding:6px 12px;cursor:pointer";
      b.addEventListener("click", () => toggleCornerPanel(document.body, id, title, [el]));
      pageHost.pauseBtns.append(b);
    }
    document.body.append(pageHost.pauseBtns);
  }
  pageHost.pauseBtns.style.display = "";
}

export function updatePauseMenus(pageHost: PageHost, now: number): void {
  pageHost.settingsPage.update(now / 1000);
  const corner = cornerPanelRoot(), pauseRoots = pageHost.freeze.frozen && !pageHost.settingsPage.open ? (corner ? [corner] : [document.getElementById('pause-sliders'), pageHost.pauseBtns].filter((el): el is HTMLElement => !!el)) : [];
  const opened = pauseRoots.length ? pageHost.freeze.takeOpenPad() : undefined;
  if (pageHost.pauseFocus.update(pauseRoots, pageHost.freeze.pad(), now / 1000, () => { if (corner) closeCornerPanel(); else pageHost.freeze.toggle(); }, corner ? undefined : opened)) pageHost.input.device = 'pad';
}

export function openMusicLab(pageHost: PageHost): void {
  if (pageHost.musicLabPanel) { pageHost.musicLabPanel.show(true); return; }
  if (pageHost.musicLabLoading) return;
  pageHost.musicLabLoading = true;
  void Promise.all([import("../ui/musicLabPanel"), import("./musicLab")]).then(([{ MusicLabPanel }, { MusicLab }]) => {
    const lab = pageHost.sound.lab ?? (pageHost.sound.lab = new MusicLab(pageHost.N().musicStyle));
    pageHost.musicLabPanel = new MusicLabPanel({ lab, sound: pageHost.sound, game: () => pageHost.N().game, nextWave: () => { pageHost.input.touch.nextWave = true; }, noNight: () => !pageHost.N().game.speakerBoot.some(t => t !== null) });
    pageHost.musicLabPanel.show(true);
  }, () => { pageHost.musicLabLoading = false; window.alert("The Music Lab's code couldn't load (a newer build may be up: reload the page)."); });
}

export function installPause1(pageHost: PageHost): void {
pageHost.freeze.mutate = pageHost.mutate;
}

export function installPause2(pageHost: PageHost): void {
pageHost.freeze.advance = (game, controls, dt) => recordedStep(game, controls, dt, pageHost.BUILD, pageHost.captureRecording);
}

export function installPause3(pageHost: PageHost): void {
pageHost.freeze.started = () => (pageHost.startEl.style.display === "none" || pageHost.creator.open) && !pageHost.studio.at;
}

export function installPause4(pageHost: PageHost): void {
pageHost.freeze.ownsEsc = () => !pageHost.bot && !document.querySelector("#settings-page.open, #potion-lab.open");
}

export function installPause5(pageHost: PageHost): void {
pageHost.sound.watch(() => !pageHost.N().game.clock.paused && !pageHost.freeze.frozen && !document.hidden && !mutedAway(), () => pageHost.N().game.speakerBoot.some(t => t !== null), () => pageHost.N().playtest);
}

export function installPause6(pageHost: PageHost): void {
pageHost.freeze.quiet = true;
}

export function installPause7(pageHost: PageHost): void {
pageHost.freeze.onStamp = text => pageHost.pauseSliders?.setStamp(text);
}

export function installPause8(pageHost: PageHost): void {
pageHost.freeze.onToggle = on => {
  notable("screen", on ? "Paused" : "Resumed");
  pageHost.input.release(); // Held keys and pending presses belong to the old input owner, never to the resumed game.
  pageHost.settingsPage.gate(); // (suspended while paused, and muted in the background if so set: app/settingsPage.ts)
  if (!on) { pageHost.settingsPage.close(); pageHost.potionLab?.close(); }
  pageHost.pauseControls(on);
  pageHost.musicLabPanel?.frozen(on);
  pageHost.creator.frozen = on; // (paused in her room: its keys and clicks wait, Esc resumes; the sliders backed over its panel)
  if (on) void pageHost.newBuild.check();
  if (pageHost.pauseSliders) { pageHost.pauseSliders.show(on, pageHost.creator.open); return; }
  if (!on || pageHost.pauseLoading) return;
  pageHost.pauseLoading = true;
  void import("../ui/decide").then(({ PauseSliders }) => {
    const report = () => import("../ui/visualReport").then(({ report }) => report(pageHost.reportHost()));
    pageHost.pauseSliders = new PauseSliders({ mutate: pageHost.mutate, saveComment: pageHost.saveComment, restoreComment: pageHost.restoreComment, downloadReadableLog: () => { void pageHost.N().playtest.download("text"); }, settings: () => pageHost.settingsPage.show(), get tuning() { return pageHost.N().game.tuning; }, get seed() { return pageHost.N().game.seed; }, version: pageHost.BUILD, live: pageHost.knobLive, report, potionLab: () => { void pageHost.openPotionLab(); }, musicLab: pageHost.openMusicLab, audioTest: () => { window.open("audio-test/", "_blank", "noopener"); }, downloadLog: () => pageHost.N().playtest.download(), unlockAll: { get: () => unlockAll(), set: on => pageHost.mutate("debug: unlock all", () => { setUnlockAll(on); if (on) stockMushroomBaskets(pageHost.N().game); for (const W of pageHost.N().game.witches) syncHatUnlock(W, on, pageHost.params); pageHost.creator.hats = pageHost.N().game.spells.hats; }) }, defaults: { text: () => defaultsText(lookWithoutLoan((pageHost.page.look() ?? pageHost.creator.genome()) as Record<string, unknown> | null, pageHost.loan), partsWithoutLoan(pageHost.N().game.witches[0].spells.parts, pageHost.loan)), tryIt: () => { window.open(newWitchLink(location.href), "_blank", "noopener"); }, shown: () => pageHost.N().hud.debugOn || unlockAll() }, fightArena: () => { window.open(fightLink(newFightSeed()), "_blank", "noopener"); }, finds: () => pageHost.findsPanel.toggle(true), findsShown: () => pageHost.N().hud.debugOn || pageHost.devFinds, quality: { lines: () => pageHost.ladder.lines(), options: () => pageHost.ladder.options(), current: () => pageHost.ladder.current(), choose: v => { pageHost.ladder.choose(v); pageHost.ladder.apply(pageHost.N().game.tuning); } } });
    requestAnimationFrame(() => pageHost.pauseSliders!.show(pageHost.freeze.frozen, pageHost.creator.open)); // (a frame shut first, so it slides in)
  }, () => { // (its files replaced under it: Ed, 2026-10-14, "the menu does not appear")
    pageHost.pauseLoading = false;
    void pageHost.newBuild.check().then(() => { if (pageHost.newBuild.latest) pageHost.menuGone = true; else window.alert("A newer build of the game is up, so the pause page can't load: reload the page (Shift+Reload)."); });
  });

};
}

export function installPause9(pageHost: PageHost): void {
pageHost.freeze.extra = () => [gpuLine(pageHost.view)];
}
