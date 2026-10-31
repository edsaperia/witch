// A4 mechanical extraction from src/main.ts; body identity is checked by tools/refactor/a4-split.mjs.
import type { PageHost } from "../main";
import { chartOpen } from "../ui/chartOverlay";
import { endDream } from "../rules/wakeUp";
import { saveGenome } from "../ui/creator";
import { saveLoadout } from "./loadout";
import { shelfOf, stationsShowing } from "../rules/wardrobe";
import { findKind, type FindKindId } from "../rules/finds";
import { fitBroom, loadBroom } from "./broomSave";
import { keepFound } from "./finds";
import { homeOf, lend, loanName, settle, withLoan, type Loan } from "./loan";
import { DreamView, dreamArt } from "../render/dream";
import { loadSave, unvisited } from "./chartSave";
import { guidanceOf, seeGuide } from "../rules/guidance";
import { addNew, dropNew, storeGuide } from "./guideSave";

export function lendFind(pageHost: PageHost, kind: FindKindId, id: string): void {
  const { game } = pageHost.N();
  pageHost.loan = lend(kind, id, { look: (pageHost.page.look() ?? pageHost.creator.genome()) as Record<string, unknown> | null, hat: game.spells.hat, parts: game.witches[0].spells.parts });
  if (kind === "wearable" || kind === "bag") pageHost.findsCtx().owned().add(id); // (in what she owns tonight, not in her save)
  pageHost.view.partsFound = pageHost.partsNow();
  // (new in the treehouse: her guidance pin over where it is till she's been there, rules/guidance.ts)
  const at = kind === "part" ? "lathe" : kind === "hat" ? "hats" : stationsShowing(shelfOf(id)?.id ?? "")[0];
  if (at) { addNew(pageHost.guide, { kind: kind === "part" || kind === "hat" ? kind : "wearable", id, at }); storeGuide(pageHost.guide); }
}

export function settleLoan(pageHost: PageHost, won: boolean): { loan: Loan; won: boolean } | null {
  return pageHost.mutate("finds: settle loan", () => pageHost.settleLoanNow(won));
}

export function settleLoanNow(pageHost: PageHost, won: boolean): { loan: Loan; won: boolean } | null {
  const l = pageHost.loan, { game } = pageHost.N();
  if (!l) return null;
  pageHost.loan = null;
  const look = (pageHost.page.look() ?? pageHost.creator.genome()) as Record<string, unknown> | null;
  const woke = settle(l, won, { look, hat: game.spells.hat, parts: game.witches[0].spells.parts }, {
    keep: (kind, id) => keepFound(pageHost.findsCtx(), kind, id), look: g => saveGenome(g as never), hat: h => saveLoadout({ hat: h as typeof game.spells.hat }), parts: f => fitBroom(f),
  });
  if (woke && woke !== look) { pageHost.creator.adopt(woke); pageHost.lookNow = JSON.stringify(woke); }
  if (!won) { pageHost.owned = null; dropNew(pageHost.guide, l.id); storeGuide(pageHost.guide); } // (read afresh from her save, the loan not in it; gone back to the sky, no longer new)
  pageHost.view.partsFound = pageHost.partsNow();
  return { loan: l, won };
}

export function startDream(pageHost: PageHost, s: { loan: Loan; won: boolean }, veil: NonNullable<Parameters<PageHost["startDream"]>[1]>): void {
  pageHost.dream?.dispose();
  const of = { item: s.loan.id, name: loanName(s.loan), piece: findKind(s.loan.kind).piece(s.loan.id), won: s.won, home: homeOf(s.loan, id => stationsShowing(shelfOf(id)?.id ?? "")) };
  pageHost.dream = new DreamView(of, dreamArt(of, pageHost.view.assets.style), veil, pageHost.herHead).play(veil && pageHost.params.has("shot"));
  pageHost.dreamAsleep = !veil; // (asleep: its end rings the next night's alarm; shown over a night, ?dream= or the dev panel, nothing)
  pageHost.dream.onOver = () => { const n = pageHost.page.night; if (pageHost.dreamAsleep && n?.game.wake) pageHost.mutate("wake: dream dismissed", () => endDream(n.game, n.game.herTime)); };
  (window as unknown as { __dream?: DreamView }).__dream = pageHost.dream; // (the shot tools draw it at a time: tools/loan/dream-shots.cjs)
}

export function herHead(pageHost: PageHost): { x: number; y: number } | null {
  const H = pageHost.view.herHouseHead, w = pageHost.N().game.witch;
  if (w.perch && H.at > 0) return { x: H.x, y: H.y }; // (in the house: as its labels are placed; kept while the next island is made)
  const h = pageHost.view.herHead, r = pageHost.canvas.getBoundingClientRect();
  return h.on ? { x: r.left + h.x * r.width, y: r.top + (1 - h.y) * r.height } : null;
}

export function stepGuide(pageHost: PageHost, now: number): void {
  const { game } = pageHost.N();
  if (seeGuide(game, 0, pageHost.guide)) storeGuide(pageHost.guide);
  if (now - pageHost.chartFound.at > 1000) pageHost.chartFound = { at: now, unvisited: unvisited(loadSave(), pageHost.N().tuning.map?.island ?? "home") }; // (where she is counts as been to: app/chartSave.ts unvisited)
  const G = guidanceOf(game, 0, pageHost.guide, pageHost.chartFound.unvisited);
  pageHost.guidePin.update(G, !!G && !pageHost.creator.open && !chartOpen() && !pageHost.sailing); // (wherever she is, at its target too: Ed, 2026-10-28)
}

export function partsNow(pageHost: PageHost): Set<string> { return withLoan("part", new Set(loadBroom().found), pageHost.loan); }
