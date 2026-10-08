// What the leash view projects over the canvas as HTML (render/leash.ts): the talk's emoji bubbles, the dreams' thought
// bubbles and their pointers, the 😴s when the party's over, a legend's circle panel, and her health as claw slashes.
import { DX, DY, SLASH_H, SLASH_W, paintSlashes, slashPixels, slashSize, slashState, slashStrokes } from "./slashes";
import { SPRITE_UNIFORMS } from "../sprites";
import { dreamStone, dreamWay, questOpen, restlessness } from "../../rules/dream";
import { compassArrow } from "../compass";
import * as THREE from "three";
import { drawSigil, sigilColour } from "../../../art/generator.js";
import { talkTurn } from "../../rules/leash";
import { hash2 } from "../../rules/random";
import { emojiOr, sleepyFace } from "../sleepyFace";
import { broughtLine, circleLines, circleShown, legendCircleNear } from "../../rules/legendCircle";
import { witchHeight } from "../../rules/witch";
import { placed } from "../height";
import { tiltFilter } from "../overlayTilt";
import { GRID, dreamSymbol, paintThought, snap, thoughtShape, type DreamSymbol, type ThoughtShape } from "../thoughtCloud";
import type { LeashView } from "../leash";

/** The party's over: 😴 bubbles over at most this many sleepers, within this many metres of her. */
const SNORES = 6, SNORE_RANGE = 40;

/** Bubbles grow with who's talking (Ed, 2026-10-05): the pixel bubble's game pixel (its --px, in
 *  screen px) by level, babies smallest, legends (dreams and nightmares) largest. One style for
 *  every bubble: index.html's .bubble. */
export const BUBBLE_PX = 3;
/** A dream's thought bubble (render/thoughtCloud.ts): its symbol's square in cloud pixels (each GRID screen px), its face's
 *  pixels (centred in that square), and a snore's (Ed, 2026-10-06: the party's over, the sleepers' little bubbles). */
const DREAM_INNER = 30, DREAM_EMOJI = 20, SNORE_INNER = 12;
/** Its ink and flat fill (no gradient, no glow): the HUD's amber, as before but crisp; a nightmare's fill a deep ember. */
const DREAM_INK: [number, number, number, number] = [232, 180, 106, 0.8], DREAM_FILL: [number, number, number, number] = [20, 14, 34, 0.55], NIGHTMARE_FILL: [number, number, number, number] = [44, 8, 14, 0.6];
const DREAM_CYCLE = { hold: 1.8, fade: 0.3, flask: 0.25 };
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
      if (!el) { el = thoughtEl("thought snore"); host.append(el); lv.snoreEls.push(el); }
      el.style.display = "";
      const face = Z ? emojiOr(sleepyFace(c.id, time, Z), Z.fallback) : "😴", S = thoughtShape(SNORE_INNER, 2);
      paintCloud(el, S, DREAM_INK, DREAM_FILL);
      showSymbol(el, S, "emoji", face, () => emojiCanvas(face, SNORE_INNER), 1);
      el.style.left = `${snap(((lv.v.x + 1) / 2) * width - (S.foot.x + 0.5) * GRID)}px`;
      el.style.top = `${snap(((1 - lv.v.y) / 2) * height - (S.foot.y + 0.5) * GRID)}px`;
      el.style.opacity = `${Math.min(1, (lv.partyOverEase - 0.3) * 4).toFixed(2)}`;
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
    // its face slightly sad at first, sadder, upset, then angry (dreams.nightmare), by turns with
    // the sigil it wants, fading (bring one back). Once its quest has closed (its
    // area's soundsystem on) the dream is gone, but not a nightmare: just the face then.
    const q = c.quest!, r = restlessness(c), N = g.tuning.dreams.nightmare, open = questOpen(g.party, c);
    let step = -1;
    for (let k = 0; k < N.at.length; k++) if (r >= N.at[k]) step = k;
    const faces = step >= 0 ? 1 : 0, ire = r * r; // (the reddening and the shake gentle while it's only sad)
    if (!open && !faces) continue;
    // Asleep giving its quest (Ed, 2026-10-06): a sleepy face, mostly 😴, now and then a yawn or a sigh for a turn.
    const Z = g.tuning.dreams.sleepy, zzz = !faces && open && Z ? sleepyFace(c.id, g.clock.time, Z) : null;
    let el = lv.dreamEls[used];
    if (!el) { el = thoughtEl("thought dream"); host.append(el); lv.dreamEls.push(el); }
    el.style.display = "";
    // A pixel thought bubble (Ed, 2026-10-08, relayed by the coordinator: "drawn in the same way as the speech bubbles ... small
    // clouds going up to a large cloud"; render/thoughtCloud.ts), holding one symbol at a time: its face (sleepy, or the
    // nightmare's), then the sigil it dreams of (fading as it grows restless), then its face again, now and then the flask's
    // relic sigil instead of the sigil; each fading in and out (dreams.cycle). A nightmare's ink reddens.
    const S = thoughtShape(DREAM_INNER, 3), tone = faces ? Math.round(ire * 8) / 8 : -1;
    paintCloud(el, S, tone < 0 ? DREAM_INK : [Math.round(232 - 42 * tone), Math.round(180 - 130 * tone), Math.round(106 - 76 * tone), 0.8 + 0.2 * tone], tone < 0 ? DREAM_FILL : NIGHTMARE_FILL);
    const faceE = step >= 0 ? N.faces[step] ?? "😠" : zzz ? emojiOr(zzz, Z!.fallback) : "😴";
    const sym = dreamSymbol(performance.now() / 1000, c.id, g.tuning.dreams.cycle ?? DREAM_CYCLE, open); // (the screen's clock: game time slows to a crawl in a legend's clearing)
    if (sym.kind === "emoji") showSymbol(el, S, "emoji", faceE, () => emojiCanvas(faceE, DREAM_EMOJI), sym.alpha);
    else if (sym.kind === "flask") showSymbol(el, S, "flask", "relic", () => sigilCanvas("relic", null, [255, 205, 90], DREAM_INNER), sym.alpha);
    else showSymbol(el, S, "sigil", `${q.species}:${q.level}`, () => sigilCanvas(q.species, q.level, sigilColour(q.species), DREAM_INNER), sym.alpha * (1 - 0.75 * r));
    const bx = ((lv.v.x + 1) / 2) * width, ly = ((1 - lv.v.y) / 2) * height;
    const shake = faces ? snap(ire * 3 * Math.sin(performance.now() * 0.05 + c.id)) : 0; // (a nightmare shakes, a whole grid step)
    const left = snap(bx - (S.foot.x + 0.5) * GRID) + shake, top = Math.max(snap(ly - (S.foot.y + 0.5) * GRID), 57); // (its smallest puff over the sleeper; kept on screen when she's close, below the top edge's cues)
    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
    tiltFilter(el, top + S.box.y * GRID + S.box.n * GRID * 0.5); // (its middle, blurred as the world is there: render/overlayTilt.ts)
    // Its direction (rules/dream.ts; Ed, 2026-10-06: "the legend speech bubble should tell you in what direction you can find
    // the runestone for the area that has the quest animal in it"): the nearest area of the kind it dreams of to her, explored,
    // partified or not; a pixel arrow that way (the eight compass points: the camera looks north, so north is up the
    // screen) and its compass point and distance, under the big cloud, kept up as she moves.
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
      cap.style.left = `${left + snap(S.box.x * GRID + S.box.n * GRID * 0.4)}px`; cap.style.top = `${top + snap(S.box.y * GRID + S.box.n * GRID + GRID * 6)}px`; // (under the big cloud, right of its puffs, on the grid)
      cap.style.display = "";
    } else cap.style.display = "none";
    used++;
  }
  for (let i = used; i < lv.dreamEls.length; i++) lv.dreamEls[i].style.display = "none";
  for (let i = used; i < lv.wayEls.length; i++) lv.wayEls[i].style.display = "none";
}

/** A thought bubble's element: its cloud on one canvas (a cloud pixel to GRID screen px) and its symbols over the big cloud. */
function thoughtEl(cls: string): HTMLElement {
  const el = document.createElement("div"), cv = document.createElement("canvas");
  el.className = cls; cv.className = "cloud"; el.append(cv);
  return el;
}

/** Paint its cloud, once for each shape and colour. */
function paintCloud(el: HTMLElement, S: ThoughtShape, ink: [number, number, number, number], fill: [number, number, number, number]): void {
  const key = `${S.w}x${S.h}:${ink}:${fill}`;
  if (el.dataset.c === key) return;
  el.dataset.c = key;
  const cv = el.firstChild as HTMLCanvasElement, x = cv.getContext("2d");
  cv.width = S.w; cv.height = S.h;
  cv.style.width = `${S.w * GRID}px`; cv.style.height = `${S.h * GRID}px`;
  el.style.width = cv.style.width; el.style.height = cv.style.height;
  if (!x) return;
  const d = x.createImageData(S.w, S.h);
  paintThought(S, ink, fill, d.data);
  x.putImageData(d, 0, 0);
}

/** Show one symbol of a bubble (`kind`, made by `make` when `key` changes), centred in its big cloud on the grid, `alpha` faded;
 *  the others hidden. */
function showSymbol(el: HTMLElement, S: ThoughtShape, kind: DreamSymbol, key: string, make: () => HTMLCanvasElement, alpha: number): void {
  let cv = el.querySelector(`canvas.${kind}`) as HTMLCanvasElement | null;
  if (!cv || cv.dataset.k !== key) {
    const made = make();
    made.classList.add(kind); made.dataset.k = key;
    const n = made.width, at = (S.box.n - n) / 2;
    made.style.width = made.style.height = `${n * GRID}px`;
    made.style.left = `${(S.box.x + Math.floor(at)) * GRID}px`; made.style.top = `${(S.box.y + Math.floor(at)) * GRID}px`;
    if (cv) cv.replaceWith(made); else el.append(made);
    cv = made;
  }
  for (const o of el.querySelectorAll("canvas:not(.cloud)") as NodeListOf<HTMLCanvasElement>) o.style.display = o === cv ? "" : "none";
  cv.style.opacity = alpha.toFixed(2);
}

/** A sigil, `n` pixels across, its edges hard (no half-see-through pixels). */
function sigilCanvas(id: string, level: number | null, colour: number[], n: number): HTMLCanvasElement {
  const cv = document.createElement("canvas");
  cv.width = cv.height = n;
  const x = cv.getContext("2d", { willReadFrequently: true });
  if (x) {
    drawSigil(x, id, { x: 1, y: 1, size: n - 2, level: level as unknown as null, colour, glow: false });
    const d = x.getImageData(0, 0, n, n);
    for (let i = 3; i < d.data.length; i += 4) d.data[i] = d.data[i] > 90 ? 255 : 0;
    x.putImageData(d, 0, 0);
  }
  return cv;
}

/** An emoji, `n` pixels across, its edges hard. */
function emojiCanvas(e: string, n: number): HTMLCanvasElement {
  const cv = document.createElement("canvas");
  cv.width = cv.height = n;
  const x = cv.getContext("2d", { willReadFrequently: true });
  if (x) {
    x.font = `${n - 1}px sans-serif`; x.textAlign = "center"; x.textBaseline = "middle";
    x.fillText(e, n / 2, n / 2 + 0.5);
    const d = x.getImageData(0, 0, n, n);
    for (let i = 3; i < d.data.length; i += 4) d.data[i] = d.data[i] < 110 ? 0 : 255;
    x.putImageData(d, 0, 0);
  }
  return cv;
}

/** Her hits, as claw slashes over her body (leash/slashes.ts), screen-aligned: one per hit taken, the newest slashing in
 *  with a flash and draining from its upper tip as its hit heals; none while she's whole or knocked out. */
export function drawSlashes(lv: LeashView, time: number, camera: THREE.Camera, width: number, height: number): void {
  const g = lv.game, W = g.witches[0], T = g.tuning.witchHealth, px = g.tuning.pixelSize; // (a game pixel on screen)
  let cv = lv.slashCanvas;
  if (!cv) {
    cv = document.createElement("canvas"); cv.width = SLASH_W; cv.height = SLASH_H; cv.className = "claw-slashes";
    Object.assign(cv.style, {
      position: "fixed", width: `${SLASH_W * px}px`, height: `${SLASH_H * px}px`, imageRendering: "pixelated", pointerEvents: "none", zIndex: "2", display: "none",
      // (opaque over her, Ed 2026-10-08: "less transparent and more opaque"; its glow is light in the scene itself, below)
    });
    document.body.append(cv); lv.slashCanvas = cv;
  }
  const st = slashState(W.health, T.hits, T.repairTime, time);
  if (!st.count || W.ko?.out) { cv.style.display = "none"; return; } // (the third, the knockdown, shows as she goes down, until she sparkles out)
  const w = g.witch;
  // (sized to her and on the game's pixel grid, Ed 2026-10-08: "slashes: scale with her", "It should be on the same pixel
  // grid": each slash pixel is one game pixel (pixelSize screen pixels, snapped to the scene's grid, which starts at the
  // canvas's top left); their drawing is scaled by her art pixel in game pixels, her frame's height on screen over its height
  // in art pixels, so they sit over her body in the same proportion at every camera, in fewer pixels when she's smaller)
  placed(lv.v.set(w.x, lv.feetY, w.z)).project(camera); const feet = lv.v.y;
  placed(lv.v.set(w.x, lv.hatTop, w.z)).project(camera); const top = lv.v.y;
  const herPx = lv.frameH > 0 ? (Math.abs(top - feet) / 2) * height / lv.frameH : px;
  const k = T.slashScale ?? 1, geo = Math.min(k, Math.max(0.25, Math.round((herPx / px) * k * 16) / 16)), { w: cw, h: ch } = slashSize(geo); // (in steps, so it isn't redrawn every frame; witchHealth.slashScale their size against her, Ed 2026-10-08: "the slashes should be twice as large")
  if (geo !== lv.slashGeo) { lv.slashGeo = geo; lv.slashPx = slashPixels(geo); lv.slashKey = ""; cv.width = cw; cv.height = ch; cv.style.width = `${cw * px}px`; cv.style.height = `${ch * px}px`; }
  const key = `${st.count}:${Math.round(st.cut * 24)}:${Math.round(st.flash * 6)}:${Math.round(st.drained * 30)}`;
  if (key !== lv.slashKey) {
    lv.slashKey = key;
    const ctx = cv.getContext("2d");
    if (ctx) { const im = ctx.createImageData(cw, ch); paintSlashes(im.data, st, (lv.slashPx ??= slashPixels(geo)), cw); ctx.putImageData(im, 0, 0); }
  }
  // The glow (Ed, 2026-10-08: "The slashes should glow brighter as well - similar to the berries"): the berries' light, drawn in
  // the scene so the bloom takes it, along every stroke that shows: a soft halo and a hot core every couple of slash pixels,
  // placed over her body as the slashes are (a slash pixel is `m` metres there; right along the camera, up the world's up).
  const m = lv.frameH > 0 && herPx > 0 ? ((lv.hatTop - lv.feetY) / lv.frameH) * (px / herPx) : 0.05, R = SPRITE_UNIFORMS.uRight.value, dot = lv.uv(0);
  const G = T.slashGlow ?? 1, tw = 0.9 + 0.1 * Math.sin(time * 2.3), [r, gg, b] = [0.62, 0.05, 0.08]; // (the slashes' deeper red)
  slashStrokes(geo).forEach((S, i) => {
    if (i >= st.count) return;
    const newest = i === st.count - 1, t0 = newest ? st.drained : 0, t1 = newest ? st.cut : 1, flash = newest ? st.flash : 0;
    const n = Math.max(2, Math.ceil(((t1 - t0) * S.len) / 4)); // (a dot every four slash pixels: they overlap and add up)
    for (let j = 0; j < n && t1 > t0; j++) {
      const t = t0 + ((j + 0.5) / n) * (t1 - t0), taper = Math.pow(Math.sin(Math.PI * t), 0.7);
      const sx = S.x + DX * S.len * t - cw / 2, sy = S.y + DY * S.len * t - ch / 2; // (from the canvas's middle, slash pixels)
      const x = w.x + R.x * sx * m, z = w.z + R.z * sx * m, y = lv.bodyY - sy * m;
      lv.over.add(x, y, z, S.w * 4 * m * taper, dot, r * 1.5, gg * 1.5 + flash, b * 1.5 + flash, 0.16 * G * tw * taper); // the soft halo
      lv.over.add(x, y, z, S.w * 1.6 * m * taper, dot, 1.15 + flash, 0.1 + flash, 0.12 + flash, 0.22 * G * taper); // its warm core, just over the bloom's threshold, as a berry's
    }
  });
  placed(lv.v.set(w.x, lv.bodyY, w.z)).project(camera); // (over her body, wherever she flies)
  cv.style.display = lv.v.z > 1 ? "none" : "";
  cv.style.left = `${Math.round((((lv.v.x + 1) / 2) * width) / px - cw / 2) * px}px`;
  cv.style.top = `${Math.round((((1 - lv.v.y) / 2) * height) / px - ch / 2) * px}px`;
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
  const { legend: c, x, z, r } = lv.circleLast, brought = broughtLine(g, lv.circleLast), lines = brought ? [...circleLines(c), brought] : circleLines(c);
  const key = `${c.id}:${c.legendState}:${c.quest?.done !== undefined}:${c.quest?.species}:${c.quest?.level}:${brought?.text ?? ""}`;
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
      if (l.done) p.className = "done"; else if (l === brought) p.className = "wrong";
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
  // its size read only when its lines or the screen change (a layout forced every frame otherwise, after the frame's style writes)
  const wh = `${key}:${width}x${height}`;
  if (!behind && el.dataset.wh !== wh) { el.dataset.wh = wh; el.dataset.w = String(el.offsetWidth); el.dataset.h = String(el.offsetHeight); }
  const w = Number(el.dataset.w ?? 0), h = Number(el.dataset.h ?? 0), gap = 16;
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
