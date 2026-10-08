// The party's tempo over her decks (Ed, 2026-10-07: "The BPM is shown on the sparkler marker, and above the decks"): a small
// DJ-controller display over the booth, its number the beat clock's tempo now, pulsing up when a knockdown raises it (rules/beat.ts
// knockdownTempo: the DJ's off the decks and the crowd gets restless).
import * as THREE from "three";
import { bpmAt } from "../../rules/beat";
import { placed } from "../height";
import type { LeashView } from "../leash";

const v = new THREE.Vector3();
/** Its height over her seat (m): above her and the decks, under the respawn countdown (3.4). */
const LIFT = 2.5;

export function drawDeckBpm(lv: LeashView, camera: THREE.Camera, width: number, height: number): void {
  const host = lv.bubbleWitch?.parentElement, g = lv.game, seat = lv.seatAt;
  let el = lv.deckBpmEl;
  if (!host || !seat || g.partyOver) { if (el) el.style.display = "none"; return; }
  if (!el) {
    el = document.createElement("div"); el.className = "deck-bpm";
    el.innerHTML = `<span class="n"></span><span class="u">BPM</span>`;
    host.append(el); lv.deckBpmEl = el;
  }
  const n = String(Math.round(bpmAt(g.beat, g.clock.time))), num = el.querySelector(".n") as HTMLElement;
  if (num.textContent !== n) num.textContent = n;
  const bonus = g.beat.bonus ?? 0;
  if (bonus > lv.deckBonus) { lv.deckBonus = bonus; el.classList.remove("up"); void el.offsetWidth; el.classList.add("up"); } // (a knockdown's rise: it pulses)
  placed(v.set(seat.x, seat.y + LIFT, seat.z)).project(camera);
  el.style.display = v.z > 1 ? "none" : "";
  el.style.left = `${((v.x + 1) / 2) * width}px`;
  el.style.top = `${((1 - v.y) / 2) * height}px`;
}
