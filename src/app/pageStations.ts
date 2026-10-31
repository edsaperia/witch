// A4 mechanical extraction from src/main.ts; body identity is checked by tools/refactor/a4-split.mjs.
import type { PageHost } from "../main";
import { spinStep } from "../render/spin";
import { bagOf, setBag } from "../rules/bags";
import { startParty } from "../rules/wakeUp";
import { wearFromStation } from "../rules/clothesPile";
import { saveGenome } from "../ui/creator";
import { BOT_KINDS, type BotKind } from "../rules/botKinds";
import { saveLoadout } from "./loadout";
import { setParts } from "../rules/spells";
import { changeLoadout } from "../rules/hatSpells";
import { HOUSE_ROOMS } from "../rules/houseRooms";
import { fitBroom } from "./broomSave";
import { loadOwned } from "./owned";
import { partsToChoose, unlockAll } from "./debugUnlock";
import { type FindsCtx } from "./finds";
import { hatWithoutLoan, lookWithoutLoan, partsWithoutLoan, withLoan } from "./loan";
import { BagPreview } from "../ui/bagPreview";
import { BAGS } from "../rules/bags";
import { type WorkshopCtx } from "../ui/stationPanel";
import { chooseRecord } from "./recordSave";
import { integratedGpu } from "./telescope";
import { nightOver } from "./chartSave";

export function shutStation(pageHost: PageHost, why: string): void {
  pageHost.stationShuts.push({ why, at: Math.round(performance.now()), frozen: pageHost.freeze.frozen, station: pageHost.stations.station }); if (pageHost.stationShuts.length > 8) pageHost.stationShuts.shift();
  pageHost.stations.close();
}

export function findsCtx(pageHost: PageHost): FindsCtx { return ({ spells: pageHost.N().game.spells, owned: () => (pageHost.owned ??= withLoan("wearable", loadOwned((pageHost.page.look() ?? pageHost.creator.genome()) as Record<string, unknown>), pageHost.loan)) }); }

export function workshopNow(pageHost: PageHost): WorkshopCtx { const { game, tuning } = pageHost.N(), t = game.trunk; return { found: partsToChoose(pageHost.partsNow()), fitted: game.witches[0].spells.parts, tonight: t && t.kind === "part" && !t.found ? t.item : null, tuning }; }

export function useHouse(pageHost: PageHost, obj: string): void { return pageHost.mutate("house: use", () => {
  const { game, tuning, flags: { chartRecorded, overRecorded } } = pageHost.N();
  if (obj === "slept") { if (!chartRecorded && !overRecorded) nightOver(tuning.map?.island ?? "", { won: false }, undefined, tuning.map?.world ?? 0); setTimeout(() => pageHost.newNight("bed"), 0); return; } // (the sea chart: played, as the afterparty records it; then a new seed: app/newForest.ts; after this frame, in place)
  const o = HOUSE_ROOMS.objects.find(q => q.id === obj);
  if (!o || pageHost.creator.open || game.witches[0].ko) return;
  if (o.use.kind === "zoo") pageHost.zoo.open(); // (a station's E and an instrument's: their panels, below in the frame and app/studio.ts)
  else if (o.use.kind === "telescope" && tuning.telescope && !pageHost.telescope.on) { pageHost.scopeAt = o.id; pageHost.telescope.open(game, tuning.telescope); }
}); }

export function installStations1(pageHost: PageHost): void {
pageHost.creator.loadout = { hat: pageHost.N().game.spells.hat };
}

export function installStations2(pageHost: PageHost): void {
pageHost.creator.hats = unlockAll() ? undefined : pageHost.N().game.spells.hats;
}

export function installStations3(pageHost: PageHost): void {
pageHost.creator.onLoadout = l => pageHost.mutate("dressing: loadout", () => { const { game } = pageHost.N(); changeLoadout(game.witches[0], l.hat); saveLoadout({ hat: hatWithoutLoan(game.spells.hat, pageHost.loan) as typeof game.spells.hat }); pageHost.wearHat(pageHost.page.look()); });
}

export function installStations4(pageHost: PageHost): void {
pageHost.stations.preview = id => (BAGS.some(b => b.id === id) ? new BagPreview(id, { w: 220, h: 110, tuning: pageHost.N().tuning }) : null);
}

export function installStations5(pageHost: PageHost): void {
pageHost.stations.onLook = g => pageHost.mutate("dressing: station look and bag", () => {
  saveGenome(lookWithoutLoan(g as Record<string, unknown>, pageHost.loan) as never); pageHost.creator.adopt(g); // (saved without the loan: app/loan.ts)
  // (not yet dressed: a station's choice puts its piece on her, out of last night's pile: rules/clothesPile.ts; Ed, 2026-10-23)
  const w = pageHost.N().game.wake; if (w && pageHost.stations.station) wearFromStation(w, pageHost.stations.station);
  if (JSON.stringify(g) !== pageHost.lookNow) { pageHost.lookNow = JSON.stringify(g); pageHost.wearHat(g); setBag(pageHost.N().game.witches[0].spells, bagOf(g as Record<string, unknown>)); } // (her bag's 💌 stats follow the bag she wears: rules/bags.ts)
  pageHost.showLook();
});
}

export function installStations6(pageHost: PageHost): void {
pageHost.stations.onBack = () => pageHost.shutStation("back");
}

export function installStations7(pageHost: PageHost): void {
pageHost.booth.onBack = () => pageHost.booth.close();
}

export function installStations8(pageHost: PageHost): void {
pageHost.booth.onStart = r => pageHost.mutate("house: DJ party start", () => { chooseRecord(r.id); pageHost.booth.close(); startParty(pageHost.N().game, r.bpm); });
}

export function installStations9(pageHost: PageHost): void {
pageHost.stations.onChange = () => { const { game } = pageHost.N(); pageHost.view.turnUntil = game.herTime + 0.8; };
}

export function installStations10(pageHost: PageHost): void {
pageHost.stations.onDress = () => { pageHost.view.spin = spinStep(pageHost.view.spin, pageHost.N().game.herTime); };
}

export function installStations11(pageHost: PageHost): void {
pageHost.stations.onFit = f => pageHost.mutate("dressing: broom fitting", () => { const { game } = pageHost.N(); setParts(game.witches[0].spells, f); fitBroom(partsWithoutLoan(f, pageHost.loan)); });
}

export function installStations12(pageHost: PageHost): void {
pageHost.telescope.onChange = on => {
  const T = pageHost.N().tuning.telescope, res = Number(new URLSearchParams(location.search).get("telescopeRes")) || (T && integratedGpu(pageHost.view.renderer.getContext()) ? T.lowGpuResolution : T?.resolution ?? 1);
  pageHost.view.pixelScale = on ? 1 / Math.max(0.25, Math.min(3, res)) : 1; // (finer than the game's pixels too: Ed, 2026-10-23, "too pixellated")
  pageHost.fit();
  pageHost.input.clearPresses();
};
}

export function installStations13(pageHost: PageHost): void {
pageHost.creator.progress = () => { const a = pageHost.view.assets; return { done: a.done, total: a.done + a.pending, ready: !pageHost.sailing && pageHost.N().flags.ready }; };
}

export function installStations14(pageHost: PageHost): void {
pageHost.creator.onGesture = () => pageHost.sound.wake();
}

export function installStations15(pageHost: PageHost): void {
pageHost.creator.onStart = g => {
  const who = pageHost.playerPick?.value ?? "human"; // (the dev "Player:" pick: a bot plays the run instead of her)
  if (who !== "human" && BOT_KINDS.includes(who as BotKind)) { pageHost.botGame(who as BotKind); return; }
  if (JSON.stringify(g) !== pageHost.lookNow) { pageHost.lookNow = JSON.stringify(g); pageHost.showLook(); pageHost.wearHat(g); }
  if (pageHost.start()) pageHost.queueCast();
};
}

export function installStations16(pageHost: PageHost): void {
pageHost.creator.spellSound = (cue, v) => pageHost.sound.sfx?.spell(cue, v);
}
