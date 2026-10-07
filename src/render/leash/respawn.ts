// The wait behind her decks after a knockout (knockout.respawn, rules/knockout.ts; DECISION FOR ED): a countdown over her at the
// decks, in the party's neon and pulsing on the beat, so it reads as the party carrying on, not a game-over screen.
import * as THREE from "three";
import { respawnLeft } from "../../rules/knockout";
import { beatAt } from "../../rules/beat";
import { placed } from "../height";
import type { LeashView } from "../leash";

const v = new THREE.Vector3();

export function drawRespawn(lv: LeashView, camera: THREE.Camera, width: number, height: number): void {
  const host = lv.bubbleWitch?.parentElement, g = lv.game, left = respawnLeft(g.witches[0].ko, g.herTime);
  let el = lv.respawnEl;
  if (left === null || !host) { if (el) el.style.display = "none"; return; }
  if (!el) {
    el = document.createElement("div"); el.className = "respawn";
    el.innerHTML = `<span class="lead">back to the party in</span><span class="n"></span>`;
    host.append(el); lv.respawnEl = el;
  }
  const n = String(Math.ceil(left)), num = el.querySelector(".n") as HTMLElement;
  if (num.textContent !== n) num.textContent = n;
  const seat = lv.seatAt; // (her seat behind the decks, a storey up in the treehouse: view/witch.ts)
  placed(seat ? v.set(seat.x, seat.y + 3.4, seat.z) : v.set(g.witch.x, 3.4, g.witch.z)).project(camera); // (over her head, clear of her hand thrown up on the last beat: art builder 4's hype frames)
  el.style.display = v.z > 1 ? "none" : "";
  el.style.left = `${((v.x + 1) / 2) * width}px`;
  el.style.top = `${((1 - v.y) / 2) * height}px`;
  const pulse = Math.pow(1 - (beatAt(g.beat, g.clock.time) % 1), 3); // (a kick on every beat)
  el.style.setProperty("--pulse", pulse.toFixed(3));
}
