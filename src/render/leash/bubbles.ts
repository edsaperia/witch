// What the leash view projects over the canvas as HTML (render/leash.ts): the talk's emoji bubbles, the dreams' thought
// bubbles and their pointers, the 😴s when the party's over, a legend's circle panel, and the health pips.
import { dreamStone, dreamWay, questOpen, restlessness } from "../../rules/dream";
import { compassArrow } from "../compass";
import * as THREE from "three";
import { drawSigil, sigilColour } from "../../../art/generator.js";
import { talkTurn } from "../../rules/leash";
import { hash2 } from "../../rules/random";
import { emojiOr, sleepyFace } from "../sleepyFace";
import { circleLines, circleShown, legendCircleNear } from "../../rules/legendCircle";
import { witchHeight } from "../../rules/witch";
import { placed } from "../height";
import { tiltFilter } from "../overlayTilt";
import type { LeashView } from "../leash";

/** The party's over: 😴 bubbles over at most this many sleepers, within this many metres of her. */
const SNORES = 6, SNORE_RANGE = 40;

/** Bubbles grow with who's talking (Ed, 2026-10-05): the pixel bubble's game pixel (its --px, in
 *  screen px) by level, babies smallest, legends (dreams and nightmares) largest. One style for
 *  every bubble: index.html's .bubble. */
export const BUBBLE_PX = 3;
/** How far she goes (metres) before a dream's pointer works out her nearest runestone again. */
const DREAM_REFRESH = 15;
export const bubblePx = (level: number): number => BUBBLE_PX + Math.max(0, Math.min(3, level));

const PARTY = ["🎉", "🎈", "💃", "🎊", "🥳", "😛", "🍉", "🍒", "🍷", "🍸", "🍹", "🥂", "🍺", "😁", "😆"];
// A creature's moods, bored to delighted: adults start at the first, young at the middle, babies
// at the last, and the conversation warms them up toward delighted.
const MOODS = [["😴", "🫩", "🥱", "💼"], ["😐", "😐", "🥱"], ["😮", "🤭", "🫢", "😛"], ["🙂", "🍷", "🍺", "😁"], ["🥳", "🎉", "🎈", "😆", "🥂", "💃"]];

/** A sleeping legend's dream (the first quest, Ed 2026-10-04): a bubble over it holding the
 *  sigil of the creature it wants, in its colour, drawn in that level's variant (Ed, 2026-10-05:
 *  the sigil's own level look, no pips). Only to a witch on the ground near it (dreams.range;
 *  Ed, 2026-10-05: never from the treetops). HTML, like the talk bubbles, so it reads at any zoom. */
/** The party's over (Ed, 2026-10-06: "all the animals go to sleep and make little 😴 speech bubbles"): over the nearest few
 *  sleepers within SNORE_RANGE of her on the ground, a little dream bubble with a sleepy face (mostly 😴, now and then a yawn
 *  or a sigh: sleepyFace), bobbing and drifting. A sleeper is one the rules have put to sleep (c.asleep: builder hotel's
 *  party's-over rules, legends too), or, before those rules, any creature not hers once the party's well over. */
export function drawSnores(lv: LeashView, camera: THREE.Camera, width: number, height: number): void {
  const host = lv.bubbleWitch?.parentElement, g = lv.game, w = g.witch, near = lv.snoreNear;
  let used = 0;
  near.length = 0;
  if (host && lv.partyOverEase > 0.3 && w.mode === "ground" && w.lift < 0.5) {
    for (const c of g.creatures) {
      if (c.gone || c.leashed) continue;
      // (asleep: the rules' c.asleep, legends too; before builder hotel's party's-over rules, any creature not hers once it's well over)
      const asleep = (c as { asleep?: boolean }).asleep, rules = "partyOver" in g, dx = c.x - w.x, dz = c.z - w.z;
      if (!(asleep || (!rules && asleep === undefined && lv.partyOverEase >= 0.6 && c.level !== 3 && !c.boss)) || Math.abs(dx) > SNORE_RANGE || Math.abs(dz) > SNORE_RANGE) continue;
      const d = Math.hypot(dx, dz);
      if (d > SNORE_RANGE) continue;
      if (near.length < SNORES) near.push({ c, d });
      else { let far = 0; for (let i = 1; i < near.length; i++) if (near[i].d > near[far].d) far = i; if (d < near[far].d) near[far] = { c, d }; }
    }
    const Z = g.tuning.dreams.sleepy, time = g.clock.time;
    for (const { c } of near) {
      const bob = Math.sin(time * 1.6 + c.id * 1.7) * 0.18, y = Math.min(lv.tops.get(c.id) ?? 1.5, 4) + 0.35 + bob;
      placed(lv.v.set(c.x + Math.sin(time * 0.7 + c.id) * 0.15, y, c.z)).project(camera);
      if (lv.v.z > 1 || Math.abs(lv.v.x) > 1.1 || Math.abs(lv.v.y) > 1.1) continue;
      let el = lv.snoreEls[used];
      if (!el) { el = document.createElement("div"); el.className = "bubble dream on snore"; host.append(el); lv.snoreEls.push(el); }
      el.style.display = "";
      const face = Z ? emojiOr(sleepyFace(c.id, time, Z), Z.fallback) : "😴";
      if (el.dataset.e !== face) { el.dataset.e = face; const f = pixelEmoji(lv, face, 0.9, 18); f.classList.add("face"); el.replaceChildren(f); }
      el.style.setProperty("--px", `${Math.max(1, bubblePx(c.level) * 0.8)}px`);
      el.style.left = `${((lv.v.x + 1) / 2) * width}px`;
      el.style.top = `${((1 - lv.v.y) / 2) * height}px`;
      el.style.opacity = `${Math.min(1, (lv.partyOverEase - 0.3) * 4).toFixed(2)}`;
      el.style.transform = "translate(-50%, calc(-100% - var(--px) * 9))";
      used++;
    }
  }
  for (let i = used; i < lv.snoreEls.length; i++) lv.snoreEls[i].style.display = "none";
}

export function drawDreams(lv: LeashView, camera: THREE.Camera, width: number, height: number): void {
  const host = lv.bubbleWitch?.parentElement, g = lv.game, w = g.witch, range = g.tuning.dreams.range;
  if (!host) return;
  const list = w.mode !== "ground" || w.lift > 0.5 ? [] : lv.dreams.map(c => ({ c, d: Math.hypot(c.x - w.x, c.z - w.z) })).filter(p => p.d <= range).sort((p, q) => p.d - q.d).slice(0, 4);
  let used = 0;
  for (const { c } of list) {
    const y = Math.min(lv.tops.get(c.id) ?? 2, 4.5) + 0.5; // (low over it, so its puffs rise from just above the sleeper's head: the art director, #238)
    placed(lv.v.set(c.x, y, c.z)).project(camera);
    if (lv.v.z > 1 || Math.abs(lv.v.x) > 1.1 || Math.abs(lv.v.y) > 1.1) continue;
    // Restless (#87: its area has none of its kind), the dream turns to a nightmare (Ed, 2026-10-05):
    // one face by the sigil it wants, slightly sad at first, sadder, upset, then angry
    // (dreams.nightmare), the sigil fading (bring one back). Once its quest has closed (its
    // area's soundsystem on) the dream is gone, but not a nightmare: just the face then.
    const q = c.quest!, r = restlessness(c), N = g.tuning.dreams.nightmare, open = questOpen(g.party, c);
    let step = -1;
    for (let k = 0; k < N.at.length; k++) if (r >= N.at[k]) step = k;
    const faces = step >= 0 ? 1 : 0, ire = r * r; // (the reddening and the shake gentle while it's only sad)
    if (!open && !faces) continue;
    // Asleep giving its quest (Ed, 2026-10-06): a sleepy face by the sigil, mostly 😴, now and then a yawn or a sigh for a turn.
    const Z = g.tuning.dreams.sleepy, zzz = !faces && open && Z ? sleepyFace(c.id, g.clock.time, Z) : null;
    let el = lv.dreamEls[used];
    if (!el) { el = document.createElement("div"); el.className = "bubble dream on"; host.append(el); lv.dreamEls.push(el); }
    el.style.display = "";
    const key = `${q.species}:${q.level}:${step}:${open}:${zzz ?? ""}`;
    if (el.dataset.e !== key) {
      el.dataset.e = key;
      const cv = document.createElement("canvas"), n = 44;
      cv.width = cv.height = n;
      cv.style.width = cv.style.height = `calc(var(--px) * ${(n / BUBBLE_PX).toFixed(2)})`;
      const x = cv.getContext("2d", { willReadFrequently: true });
      if (x) {
        drawSigil(x, q.species, { x: 1, y: 1, size: n - 2, level: q.level as unknown as null, colour: sigilColour(q.species), glow: false });
        const d = x.getImageData(0, 0, n, n);
        for (let i = 3; i < d.data.length; i += 4) d.data[i] = d.data[i] > 90 ? 255 : 0;
        x.putImageData(d, 0, 0);
      }
      // (its face in finer pixels than a chat face: its brows must read)
      const face = step >= 0 ? pixelEmoji(lv, N.faces[step] ?? "😠", 0.9, 18) : zzz ? pixelEmoji(lv, emojiOr(zzz, Z!.fallback), 0.9, 18) : null;
      face?.classList.add("face");
      el.replaceChildren(...(open ? [cv] : []), ...(face ? [face] : []));
      el.classList.toggle("nightmare", faces > 0);
    }
    el.style.setProperty("--px", `${bubblePx(c.level)}px`);
    (el.querySelector("canvas:not(.face)") as HTMLElement | null)?.style.setProperty("opacity", `${1 - 0.75 * r}`);
    if (faces) el.style.setProperty("--ink", `rgba(${Math.round(232 - 42 * ire)}, ${Math.round(180 - 130 * ire)}, ${Math.round(106 - 76 * ire)}, ${(0.55 + 0.35 * ire).toFixed(2)})`); // (from the dream's amber to a deep ember: never the enraged eyes' bright red, the art director #238)
    else el.style.removeProperty("--ink");
    const bx = ((lv.v.x + 1) / 2) * width, ly = ((1 - lv.v.y) / 2) * height, by = Math.max(ly, el.offsetHeight + 56); // (kept on screen when she's close, below the top edge's cues)
    el.style.left = `${bx}px`;
    el.style.top = `${by}px`;
    tiltFilter(el, by - el.offsetHeight * 0.5 - bubblePx(c.level) * 12.5); // (its middle, blurred as the world is there: render/overlayTilt.ts)
    const shake = faces ? ire * 2.5 * Math.sin(performance.now() * 0.05 + c.id) : 0; // (a nightmare shakes)
    el.style.transform = `translate(calc(-50% + ${shake.toFixed(1)}px), calc(-100% - var(--px) * 12.5))`; // (lifted by its puffs, the lowest just above the sleeper)
    // Its direction (rules/dream.ts; Ed, 2026-10-06: "the legend speech bubble should tell you in what direction you can find
    // the runestone for the area that has the quest animal in it"): the nearest area of the kind it dreams of to her, explored,
    // partified or not; a pixel arrow on the bubble's edge that way (the eight compass points: the camera looks north, so north
    // is up the screen), and its compass point and distance under the sigil, kept up as she moves.
    let st = lv.dreamStones.get(c.id);
    if (!st || Math.hypot(w.x - st.fx, w.z - st.fz) > DREAM_REFRESH) { st = { to: dreamStone(g.map, q.species, w.x, w.z), fx: w.x, fz: w.z }; lv.dreamStones.set(c.id, st); }
    const to = open ? st.to : null;
    // (its own caption under the bubble, not inside it: the bubble takes the tilt-shift's blur, the way must stay sharp)
    let cap = lv.wayEls[used];
    if (!cap) { cap = document.createElement("div"); cap.className = "dream-way"; const cv = document.createElement("canvas"); cv.className = "dream-dir"; cap.append(cv, document.createElement("span")); host.append(cap); lv.wayEls.push(cap); }
    if (to) {
      const wy = dreamWay(w, to), col = lv.colours.get(q.species) ?? (lv.slotOf(q.species, 0), lv.colours.get(q.species));
      const rgb: [number, number, number] = col ? [Math.round(col.r * 255), Math.round(col.g * 255), Math.round(col.b * 255)] : [225, 215, 255];
      const cv = cap.firstChild as HTMLCanvasElement, text = cap.lastChild as HTMLElement, akey = wy.word === "here" ? "here" : `${wy.point}:${rgb}`;
      if (cv.dataset.k !== akey) { cv.dataset.k = akey; compassArrow(cv, wy.word === "here" ? -1 : wy.point, rgb); }
      if (text.textContent !== wy.word) text.textContent = wy.word;
      cap.style.setProperty("--px", `${bubblePx(c.level)}px`);
      cap.style.left = `${bx}px`; cap.style.top = `${Math.round(by - bubblePx(c.level) * 12.5 + 2)}px`;
      cap.style.display = "";
    } else cap.style.display = "none";
    used++;
  }
  for (let i = used; i < lv.dreamEls.length; i++) lv.dreamEls[i].style.display = "none";
  for (let i = used; i < lv.wayEls.length; i++) lv.wayEls[i].style.display = "none";
}

/** Her hits, as pips under her feet, only once she's been hit: the next to come back fills as it repairs. */
export function drawPips(lv: LeashView, time: number, camera: THREE.Camera, width: number, height: number): void {
  const g = lv.game, W = g.witches[0], H = W.health, max = g.tuning.witchHealth.hits;
  if (!lv.pips) {
    lv.pips = document.createElement("div");
    Object.assign(lv.pips.style, { position: "fixed", transform: "translate(-50%, 8px)", display: "none", gap: "3px", pointerEvents: "none", zIndex: "2" });
    document.body.append(lv.pips);
  }
  const el = lv.pips;
  if (H.hp >= max || W.ko) { el.style.display = "none"; return; }
  el.style.display = "flex";
  while (el.children.length < max) { const p = document.createElement("div"); Object.assign(p.style, { width: "10px", height: "10px", border: "1px solid rgba(255,140,170,.9)", borderRadius: "50%", overflow: "hidden", position: "relative", background: "rgba(14,11,28,.6)" }); p.innerHTML = '<div style="position:absolute;left:0;right:0;bottom:0;background:#ff5d8f"></div>'; el.append(p); }
  const fill = H.repairAt === Infinity ? 0 : 1 - Math.max(0, H.repairAt - time) / g.tuning.witchHealth.repairTime;
  [...el.children].forEach((p, i) => { (p.firstChild as HTMLElement).style.height = `${i < H.hp ? 100 : i === H.hp ? fill * 100 : 0}%`; (p as HTMLElement).style.opacity = i === H.hp ? "0.85" : "1"; });
  const w = g.witch;
  placed(lv.v.set(w.x, 0, w.z)).project(camera); // under her feet (the stack is over her hat)
  el.style.left = `${((lv.v.x + 1) / 2) * width}px`;
  el.style.top = `${((1 - lv.v.y) / 2) * height}px`;
}

export function drawCirclePanel(lv: LeashView, camera: THREE.Camera, width: number, height: number): void {
  const host = lv.bubbleWitch?.parentElement, g = lv.game;
  if (!host) return;
  const now = performance.now() / 1000, dt = lv.circleAt ? Math.min(0.1, now - lv.circleAt) : 0;
  lv.circleAt = now;
  const near = g.witch.lift > 0.5 ? null : legendCircleNear(g, g.witch); // (the treetops never)
  if (near) lv.circleLast = near;
  lv.circleFade = circleShown(lv.circleFade, !!near, dt);
  let el = lv.circlePanel;
  if (!lv.circleFade || !lv.circleLast) { if (el) el.style.display = "none"; return; }
  if (!el) { el = document.createElement("div"); el.className = "legend-panel"; host.append(el); lv.circlePanel = el; }
  const { legend: c, x, z, r } = lv.circleLast, lines = circleLines(c);
  const key = `${c.id}:${c.legendState}:${c.quest?.done !== undefined}:${c.quest?.species}:${c.quest?.level}`;
  if (el.dataset.k !== key) {
    el.dataset.k = key;
    el.dataset.state = c.legendState ?? "asleep";
    const icon = (id: string, level: number | null, colour: number[]) => {
      const cv = document.createElement("canvas"), n = 40;
      cv.width = cv.height = n; cv.className = "icon";
      const x2 = cv.getContext("2d", { willReadFrequently: true });
      if (x2) drawSigil(x2, id, { x: 1, y: 1, size: n - 2, level: level as unknown as null, colour, glow: false });
      return cv;
    };
    el.replaceChildren(...lines.map(l => {
      const p = document.createElement("p");
      if (l.done) p.className = "done";
      l.text.split(/(\{sigil\}|\{relic\}|\{boon\})/).forEach(part => {
        if (part === "{sigil}" && c.quest) p.append(icon(c.quest.species, c.quest.level, sigilColour(c.quest.species)));
        else if (part === "{boon}") p.append(icon(c.species, null, sigilColour(c.species))); // (its own sigil: the buff's icon in the HUD)
        else if (part === "{relic}") p.append(icon("relic", null, [255, 205, 90]));
        else if (part) p.append(document.createTextNode(part));
      });
      if (l.done) p.prepend(document.createTextNode("✓ "));
      return p;
    }));
  }
  // beside the circle on screen: its middle and its edge (at about head height), the panel off its right side, or its left
  placed(lv.v.set(x, 1.5, z)).project(camera);
  const cx = ((lv.v.x + 1) / 2) * width, cy = ((1 - lv.v.y) / 2) * height, behind = lv.v.z > 1;
  placed(lv.v.set(x + r, 1.5, z)).project(camera);
  const rx = Math.abs(((lv.v.x + 1) / 2) * width - cx);
  el.style.display = behind ? "none" : "";
  const w = el.offsetWidth, h = el.offsetHeight, gap = 16;
  let left = cx + rx + gap;
  if (left + w > width - 8) left = cx - rx - gap - w; // (off the right edge: the other side)
  if (left < 8) left = width - w - 24; // (the circle wider than the screen: by its right edge)
  left = Math.max(8, Math.min(width - w - 8, left));
  const top = Math.max(56, Math.min(height - h - 70, Math.max(height * .3, Math.min(height * .6, cy)) - h / 2)); // (about level with the circle's middle, clear of the clock and the action bar)
  el.style.left = `${Math.round(left)}px`; el.style.top = `${Math.round(top)}px`;
  el.style.opacity = lv.circleFade.toFixed(2);
}

/** Show an emoji in a bubble as a pixel sprite: drawn small (bubbles.emojiPixels across), its
 *  edges made hard (no half-see-through pixels), and scaled up by the game's pixel size. */
export function emoji(lv: LeashView, el: HTMLElement, e: string): void {
  if (el.dataset.e === e) return;
  el.dataset.e = e;
  el.replaceChildren(pixelEmoji(lv, e));
}

/** An emoji as a pixel sprite, sized with its bubble (its --px: bubblePx). */
export function pixelEmoji(lv: LeashView, e: string, k = 1, n = lv.game.tuning.bubbles.emojiPixels): HTMLCanvasElement {
  const B = lv.game.tuning.bubbles, size = (B.emojiPixels * lv.game.tuning.pixelSize * B.scale * k) / BUBBLE_PX;
  const c = document.createElement("canvas");
  c.width = c.height = n;
  c.style.width = c.style.height = `calc(var(--px) * ${size})`;
  const x = c.getContext("2d", { willReadFrequently: true });
  if (x) {
    x.font = `${n - 1}px sans-serif`; x.textAlign = "center"; x.textBaseline = "middle";
    x.fillText(e, n / 2, n / 2 + 0.5);
    const d = x.getImageData(0, 0, n, n);
    for (let i = 3; i < d.data.length; i += 4) d.data[i] = d.data[i] < 110 ? 0 : 255;
    x.putImageData(d, 0, 0);
  }
  return c;
}

export function say(_lv: LeashView, el: HTMLElement, text: string): void { if (el.dataset.e !== text) { el.dataset.e = text; el.textContent = text; } }

/** The emoji conversation: bubbles taking turns over the witch and the creature. */
export function bubbles(lv: LeashView, time: number, camera: THREE.Camera, width: number, height: number): void {
  const g = lv.game, talk = g.leash.talk, bw = lv.bubbleWitch, bc = lv.bubbleCreature;
  if (!bw || !bc) return;
  const w = g.witch, place = (el: HTMLElement, x: number, y: number, z: number) => {
    placed(lv.v.set(x, y, z)).project(camera);
    el.style.left = `${((lv.v.x + 1) / 2) * width}px`;
    el.style.top = `${((1 - lv.v.y) / 2) * height}px`;
    tiltFilter(el, ((1 - lv.v.y) / 2) * height);
  };
  const line = bc.querySelector("span")!, bar = bc.querySelector(".bar") as HTMLElement;
  if (!talk) {
    // (No prompt over creatures in range: Ed, 2026-10-03; she talks to them by herself, Ed v244.)
    bar.style.display = "none";
    bc.classList.remove("on");
    bw.classList.remove("on");
    return;
  }
  const c = g.creatures[talk.id];
  bc.style.setProperty("--px", `${bubblePx(c.level)}px`);
  place(bw, w.x - 1.2, witchHeight(w, g.tuning) + 2.2, w.z);
  place(bc, c.x, (lv.tops.get(c.id) ?? 1.2 + c.level * 0.8) + 0.3, c.z); // over its head, however big it is drawn (#47)
  if (talk.refused) {
    // A legend: one unimpressed look, and nothing more.
    bw.classList.remove("on");
    emoji(lv, line, hash2(talk.id, 1, 9) < 0.5 ? "😒" : "🙄");
    bar.style.display = "none";
    bc.classList.toggle("on", talk.t < 1.6);
    bc.style.opacity = "1";
    return;
  }
  bar.style.display = "";
  const turn = Math.floor(talk.t / talkTurn(c, g.tuning)), progress = Math.min(1, talk.t / talk.total);
  const pick = (list: string[], k: number) => list[Math.floor(hash2(talk.id, k, 5) * list.length) % list.length];
  // Hers on even turns, always party; theirs on odd turns, from a mood that warms up from where
  // its level starts (babies delighted, young curious, adults bored and busy) to delighted.
  const start = [4, 2, 0][Math.min(2, c.level)], mood = Math.round(start + (4 - start) * progress);
  emoji(lv, bw, pick(PARTY, turn - (turn % 2)));
  bw.classList.toggle("on", turn % 2 === 0);
  if (turn >= 1) emoji(lv, line, pick(MOODS[mood], turn - ((turn + 1) % 2))); else say(lv, line, "…");
  (bar.querySelector("i") as HTMLElement).style.width = `${progress * 100}%`;
  bc.classList.add("on");
  bc.style.opacity = turn % 2 === 1 ? "1" : "0.6";
  void time;
}
