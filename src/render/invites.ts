// The 💌 invite's look (issue #87; the rules are rules/invites.ts): each letter in flight a pixel 💌
// lying flat and spinning like a frisbee (Ed, 2026-10-06), then resting flat where it comes down; a speech bubble from the witch when she
// fires and an emoji reply from a creature a letter lands on (warming up with its meter), each
// rate-limited and replacing its last so a burst isn't a blizzard; and round each creature being
// invited, the 💌 ring (Ed, 2026-10-06; render/inviteRing.ts): every letter that lands joins an orbit
// round it, one slot a hit its meter needs, the gaps the hits still to come; full, the envelopes
// vanish and leave their ❤️s rising; left alone, they fall out of orbit one by one as the meter
// drains and lie on the ground a moment. DOM, like the talk bubbles, drawn as pixel art.
import * as THREE from "three";
import type { Game } from "../rules/game";
import { affectionOf, meterHits } from "../rules/game";
import { witchHeight } from "../rules/witch";
import { hash2 } from "../rules/random";
import { groundHeight, placed, shownOverBend } from "./height";
import { pixelEmoji, pixelEmojiData, pixelSprite, sizeBubble, speechBubble } from "./bubbles";
import { BubbleFader, sightOf } from "./bubbleSight";

import { bodyRadius } from "../rules/spacing";
import type { Creature } from "../rules/creatures";
import { RingModel, ringOf } from "./inviteRing";
import { beachOf } from "../rules/mapShape";
import { tiltFilter } from "./overlayTilt";
import type { OcclusionProbes } from "./occlusion";

const HERS = ["💌", "🎉", "🥳", "💃", "🎈", "😘", "🎶", "✨"];
// Replies by how full its meter is: unsure, warming, nearly, won over; and stung (blocked).
const REPLIES = [["😳", "🤨", "😶", "🫣"], ["😮", "🤭", "😊", "🙂"], ["😍", "🥰", "😆", "🤩"], ["🥳", "🎉", "💖", "💃"]];
const BLOCKED = ["😠", "🙅", "💢", "😤"];

/** A 💌 refused by an enraged animal (Ed, 2026-10-12: "the invitation crumples into a ball of paper and is tossed away"; the
 *  rules' "blocked"): at the animal's face the letter scrunches up over CRUMPLE seconds, twitching, then the ball is flung back
 *  the way it came (TOSS m/s, TOSS_UP up, swung a little to one side), tumbling, bounces once, lies there BALL_REST seconds and
 *  fades over the last BALL_FADE. Its 💢 shakes meanwhile (the pops below). */
const CRUMPLE = 0.2, TOSS = 4.5, TOSS_UP = 3.2, GRAVITY = 10, BALL_REST = 1.1, BALL_FADE = 0.4, BALL = "crumpled";
/** The ball of paper, n pixels across: a lumpy round of cream lit from the top left, creases across it, a glimpse of its heart. */
function paintBall(x: CanvasRenderingContext2D, n: number): void {
  const c = (n - 1) / 2, R = n * 0.42;
  const r = (a: number) => R * (1 + 0.14 * Math.sin(a * 3 + 0.7) + 0.08 * Math.sin(a * 5 + 2.1));
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const dx = i - c, dy = j - c, d = Math.hypot(dx, dy);
    if (d > r(Math.atan2(dy, dx))) continue;
    const lit = (-dx - dy) / (2 * R), crease = Math.abs(Math.sin(dx * 0.9 + dy * 0.5 + 0.4)) < 0.14 || Math.abs(Math.sin(dx * 0.35 - dy * 1.1 + 1.3)) < 0.1;
    x.fillStyle = crease ? "#9a7b55" : lit > 0.25 ? "#fff6e2" : lit < -0.3 ? "#cdb38c" : "#f1e2c4";
    if (!crease && n > 6 && Math.abs(dx - 1) < 1 && Math.abs(dy + 1) < 1) x.fillStyle = "#d9789e";
    x.fillRect(i, j, 1, 1);
  }
}

/** Where pixel (i, j) of a W x H picture of an n-pixel sprite turned by (cos c, sin s) and scaled (sx, sy) comes from in
 *  the sprite: [x, y], or null outside it (nearest pixel: a CSS rotate, or a scale that isn't whole, would tilt and smear
 *  the art's pixels off the screen's). The turn as CSS's rotate (clockwise on the screen), then the scale. */
export function turnedFrom(i: number, j: number, W: number, H: number, n: number, c: number, s: number, sx: number, sy: number): [number, number] | null {
  const ux = (i + 0.5 - W / 2) / sx, uy = (j + 0.5 - H / 2) / sy;
  const x = Math.floor(c * ux + s * uy + n / 2), y = Math.floor(-s * ux + c * uy + n / 2);
  return x >= 0 && y >= 0 && x < n && y < n ? [x, y] : null;
}

/** A pixel emoji turned `deg` (in sixteenths of a turn) and scaled sx by sy (in tenths), drawn again in art pixels (Ed, round 14:
 *  "Invitations should be pixellated"): the 💌 spinning like a frisbee and lying flat for the camera, on the pixel grid. Cached. */
const turnedCache = new Map<string, { url: string; w: number; h: number }>();
export function pixelTurned(e: string, n: number, sx: number, sy: number, deg: number): { url: string; w: number; h: number; key: string } {
  const q = (v: number) => Math.max(0.1, Math.round(v * 10) / 10), a = ((Math.round(deg / 22.5) % 16) + 16) % 16;
  sx = q(sx); sy = q(sy);
  const key = `${e}:${n}:${sx}:${sy}:${a}`;
  let got = turnedCache.get(key);
  if (!got) {
    const th = (a * Math.PI) / 8, c = Math.cos(th), s = Math.sin(th);
    const W = Math.max(1, Math.round(sx * (Math.abs(c) + Math.abs(s)) * n)), H = Math.max(1, Math.round(sy * (Math.abs(c) + Math.abs(s)) * n));
    const src = pixelEmojiData(e, n), cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    const x = cv.getContext("2d", { willReadFrequently: true });
    if (x && src) {
      const out = x.createImageData(W, H);
      for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
        const p = turnedFrom(i, j, W, H, n, c, s, sx, sy);
        if (!p) continue;
        const from = (p[1] * n + p[0]) * 4, to = (j * W + i) * 4;
        for (let k = 0; k < 4; k++) out.data[to + k] = src.data[from + k];
      }
      x.putImageData(out, 0, 0);
    }
    got = { url: cv.toDataURL(), w: W, h: H };
    if (turnedCache.size > 4000) turnedCache.clear();
    turnedCache.set(key, got);
  }
  return { ...got, key };
}

/** Show pixel emoji `e` on image `im` turned and scaled (pixelTurned), each art pixel k CSS pixels: no CSS transform. */
function showTurned(im: HTMLImageElement, e: string, n: number, sx: number, sy: number, deg: number, k: number): void {
  const p = pixelTurned(e, n, sx, sy, deg);
  if (im.dataset.px === p.key) return;
  im.dataset.px = p.key;
  im.src = p.url;
  Object.assign(im.style, { transform: "", width: `${p.w * k}px`, height: `${p.h * k}px`, marginLeft: `${-Math.floor(p.w / 2) * k}px`, marginTop: `${-Math.floor(p.h / 2) * k}px` });
}

interface Bubble { el: HTMLElement; img: HTMLImageElement; until: number; x: number; y: number; z: number; id: number }

export class InviteView {
  /** Where she's drawn less the rules' place, in the house (the view's: render/view/witch.ts); its letters drawn by it. */
  herOffset?: HerOffset;
  private root = document.createElement("div");
  private letters: HTMLImageElement[] = [];
  /** The rings (render/inviteRing.ts): what each holds, and its envelopes and gap marks by creature. */
  private ringModel = new RingModel();
  private rings = new Map<number, { imgs: HTMLImageElement[]; dots: HTMLElement[]; joined: number[] }>();
  /** Envelopes falling out of orbit (then resting), and hearts rising off a full ring. */
  private falling: { x: number; y: number; z: number; at: number; tilt: number; el: HTMLImageElement }[] = [];
  private hearts: { x: number; y: number; z: number; at: number; el: HTMLImageElement }[] = [];
  private hers: Bubble;
  private replies = new Map<number, Bubble>();
  /** The replies faded in and out by how near she is, on the ground only (render/bubbleSight.ts; Ed, 2026-10-28). */
  private sight = new BubbleFader();
  private lastHers = -Infinity;
  /** Little pops where letters land: { element, where, when }. */
  private pops: { el: HTMLImageElement; e: string; x: number; y: number; z: number; at: number }[] = [];
  /** Refused letters: scrunching up, then flung away as balls of paper (CRUMPLE and after). */
  private crumples: { x: number; y: number; z: number; vx: number; vy: number; vz: number; at: number; landed: number; bounced: boolean; el: HTMLImageElement; seed: number }[] = [];
  private lastTime = -1;
  /** 💌s that met no one, resting where they came down (Ed's playtest, 2026-10-06: "invitations
   *  should sit on the ground for a little while before they fade away"): drawn only (the rules ended
   *  them; they're no hits), at most invites.lingerMax, their images pooled and reused. */
  private resting: { x: number; z: number; at: number; tilt: number; life: number; fade: number; sea: boolean }[] = [];
  /** A 💌 that came down at (x, z) at `at` starts resting: on the beach's sand or sea (Ed, 2026-10-06: "if you shoot invitations
   *  onto the beach or in the sea, they last longer and disappear more slowly (5 seconds)") for beach.letterLinger, fading over
   *  beach.letterFade, bobbing on the water; elsewhere invites.linger, fading over invites.lingerFade. */
  private rest(x: number, z: number, at: number, tilt: number): void {
    const t = this.game.tuning, B = t.beach, beach = B?.letterLinger ? beachOf(this.game.map.bounds, t) : null;
    const sand = !!beach && beach.intoSand(x, z) > 0, life = sand ? B!.letterLinger! : t.invites.linger ?? 0;
    if (life <= 0) return;
    this.resting.push({ x, z, at, tilt, life, fade: Math.max(0.01, Math.min(life, sand ? B!.letterFade ?? life : t.invites.lingerFade)), sea: sand && beach!.intoSea(x, z) > 0 });
    if (this.resting.length > t.invites.lingerMax) this.resting.shift();
  }
  /** Each flying letter's spin (degrees) when last drawn, by its number: where it stops when it lands. */
  private spins = new Map<number, number>();
  private fwd = new THREE.Vector3();
  private restImgs: HTMLImageElement[] = [];
  /** Events already shown (a frozen frame keeps its events: shown once). */
  private seen = new Set<string>();
  private v = new THREE.Vector3();

  constructor(private game: Game) {
    Object.assign(this.root.style, { position: "fixed", inset: "0", pointerEvents: "none", zIndex: "1" });
    this.root.id = "invites";
    document.body.append(this.root);
    this.hers = this.bubble(-1);
  }

  /** Another night's game (View.setGame): every letter, ring, bubble, pop and resting 💌 of the last one gone, as at the start. */
  setGame(game: Game): void {
    this.game = game;
    this.root.replaceChildren();
    this.letters = []; this.ringModel = new RingModel(); this.rings.clear(); this.falling = []; this.hearts = [];
    this.replies.clear(); this.lastHers = -Infinity; this.pops = []; this.crumples = []; this.lastTime = -1; this.resting = [];
    this.spins.clear(); this.restImgs = []; this.seen.clear();
    this.hers = this.bubble(-1);
  }

  private bubble(id: number): Bubble {
    const { el, img } = speechBubble(this.root);
    el.style.zIndex = "2";
    return { el, img, until: -Infinity, x: 0, y: 0, z: 0, id };
  }

  /** Show emoji `e` in bubble b until then: sized for its speaker (a creature by its level, the witch at 1). */
  private show(b: Bubble, e: string, x: number, y: number, z: number, until: number, level?: number): void {
    b.img.src = pixelEmoji(e, this.game.tuning.bubbles.emojiPixels);
    sizeBubble(b.el, b.img, this.game.tuning, level);
    b.x = x; b.y = y; b.z = z; b.until = until;
    b.el.classList.add("on");
  }

  /** What hides the 💌s and rings as the animals are hidden (render/occlusion.ts; Ed, 2026-10-19): set by the view. */
  probes?: OcclusionProbes;

  /** A 💌 gone out of a calm circle at (x, z): the view's sparkle (render/slowtime.ts). */
  onVanished?: (x: number, z: number) => void;

  private pop(e: string, x: number, y: number, z: number, at: number): void {
    const n = 7, k = this.game.tuning.pixelSize * this.game.tuning.bubbles.scale, el = document.createElement("img");
    el.src = pixelEmoji(e, n);
    Object.assign(el.style, { position: "absolute", imageRendering: "pixelated", width: `${n * k}px`, height: `${n * k}px`, marginLeft: `${(-n * k) / 2}px`, marginTop: `${(-n * k) / 2}px` });
    this.root.append(el);
    this.pops.push({ el, e, x, y, z, at });
    if (this.pops.length > 40) this.pops.shift()!.el.remove();
  }

  /** A letter refused at (x, z) by creature `id`, `y` up its face: flung back the way it came (its flight reversed; with
   *  none, away from the animal), swung to one side by its number. */
  private crumple(e: { x: number; z: number; id: number; n: number; vx?: number; vz?: number }, y: number, time: number): void {
    const c = this.game.creatures[e.id];
    let dx = -(e.vx ?? 0), dz = -(e.vz ?? 0), d = Math.hypot(dx, dz);
    if (d < 1e-3 && c) { dx = e.x - c.x; dz = e.z - c.z; d = Math.hypot(dx, dz); }
    if (d < 1e-3) { dx = 1; dz = 0; }
    const a = Math.atan2(dz, dx) + (hash2(e.n, 5, 41) - 0.5) * 1.2, el = document.createElement("img");
    Object.assign(el.style, { position: "absolute", imageRendering: "pixelated", filter: "drop-shadow(0 0 2px rgba(232,180,106,.6))" });
    this.root.append(el);
    this.crumples.push({ x: e.x, y, z: e.z, vx: Math.cos(a) * TOSS, vy: TOSS_UP, vz: Math.sin(a) * TOSS, at: time, landed: -1, bounced: false, el, seed: e.n });
    if (this.crumples.length > 24) this.crumples.shift()!.el.remove();
  }

  update(time: number, camera: THREE.Camera, width: number, height: number, tops: Map<number, number>, heads?: Map<number, { x: number; z: number }>): void {
    const g = this.game, W = g.witches[0], I = W.invites, t = g.tuning, w = g.witch, P = this.probes;
    P?.update(time);
    // (Pixel art (the 💌s, hearts and pops) on whole art pixels, each k CSS pixels: on the grid as it moves.)
    const kp = t.pixelSize * t.bubbles.scale;
    const place = (el: HTMLElement, x: number, y: number, z: number, grid = el.tagName === "IMG") => {
      placed(this.v.set(x, y, z)).project(camera);
      const vis = this.v.z < 1 && Math.abs(this.v.x) < 1.2 && Math.abs(this.v.y) < 1.2 && shownOverBend(x, y, z, camera.position); // (never past the bend)
      let sx = ((this.v.x + 1) / 2) * width, sy = ((1 - this.v.y) / 2) * height;
      if (grid) { sx = Math.round(sx / kp) * kp; sy = Math.round(sy / kp) * kp; }
      el.style.left = `${sx}px`;
      el.style.top = `${sy}px`;
      el.style.visibility = vis ? "visible" : "hidden";
      if (vis) tiltFilter(el, sy); // (blurred as the world is there: render/overlayTilt.ts)
    };
    // Hidden as the animals are (Ed, 2026-10-19: "envelopes are hidden by scenery (smoke also counts)"): a probe where it is
    // (render/occlusion.ts), its answer taken off the opacity it would have had; gone altogether once all but hidden.
    const hide = (el: HTMLElement, key: string, x: number, y: number, z: number, base = 1, half = 1) => {
      if (!P) return;
      P.probe(key, x, y, z, half);
      const k = P.shown(key);
      el.style.opacity = (base * k).toFixed(3);
      if (k < 0.03) el.style.visibility = "hidden";
    };
    const head = (id: number) => (tops.get(id) ?? 1.2 + g.creatures[id].level * 0.8) + 0.3;
    const pick = (list: string[], a: number, b: number) => list[Math.floor(hash2(a, b, 17) * list.length) % list.length];

    // The bubbles: hers on a shot (at most one every bubbleEvery seconds, replacing the last); a
    // creature's reply on a hit or a block (one per creature, replacing its last).
    const A = affectionOf(g), won: number[] = [];
    for (const e of I.events) {
      const key = `${e.kind}:${e.n ?? ""}:${e.id ?? ""}:${e.at}`;
      if (this.seen.has(key)) continue;
      this.seen.add(key);
      if (e.kind === "shot" && time - this.lastHers > 0.7) {
        this.lastHers = time;
        this.show(this.hers, pick(HERS, e.n ?? 0, 1), 0, 0, 0, time + 0.8);
      } else if (e.kind === "vanished") {
        this.pop("✨", e.x, 1.2, e.z, time); // (out of a sleeping legend's circle: gone in a sparkle, rules/slowTime.ts)
        this.onVanished?.(e.x, e.z); // (and a burst of pixel motes at the edge: render/view/home.ts)
      } else if (e.kind === "fizzled") {
        // (landed on the ground at its range: a soft rose puff, render/leash.ts drawLetters; and it rests there a while)
        this.rest(e.x, e.z, time, this.spins.get(e.n ?? -1) ?? (hash2(e.n ?? 0, 3, 29) - 0.5) * 50);
      } else if ((e.kind === "hit" || e.kind === "blocked" || e.kind === "happy") && e.id !== undefined) {
        // A blocked letter pops 💢; one that lands joins its ring (below); won over, the ring goes to hearts.
        if (e.kind === "blocked") { this.pop("💢", e.x, head(e.id) * 0.6 + 0.5, e.z, time); this.crumple(e, head(e.id) * 0.5, time); }
        if (e.kind === "happy") won.push(e.id);
        if (e.spent) continue;
        let b = this.replies.get(e.id);
        if (!b) { b = this.bubble(e.id); this.replies.set(e.id, b); }
        if (e.kind !== "happy" && b.until > time + 0.4) continue; // (still showing its last)
        const c = g.creatures[e.id], m = A.affection(c) ?? 0;
        const face = e.kind === "blocked" ? pick(BLOCKED, e.id, e.n ?? 0) : e.kind === "happy" ? pick(REPLIES[3], e.id, 3) : pick(REPLIES[Math.min(2, Math.floor(m * 3))], e.id, e.n ?? 0);
        this.show(b, face, 0, 0, 0, time + (e.kind === "happy" ? 1.6 : 0.9), c.boss ? 3 : c.level);
      }
    }
    if (this.seen.size > 400) this.seen = new Set([...this.seen].slice(-200));
    this.pops = this.pops.filter(p => {
      // (the 💢 of a refusal holds at the animal's face and vibrates, a whole art pixel round and round 30 times a second,
      // the rest rise and fade: Ed, 2026-10-12)
      const shake = p.e === "💢", k = (time - p.at) / (shake ? 0.7 : 0.35);
      if (k >= 1 || k < 0) { p.el.remove(); return false; }
      place(p.el, p.x, p.y + (shake ? 0.1 : k * 0.5), p.z);
      p.el.style.opacity = String(shake ? Math.min(1, (1 - k) * 3) : 1 - k);
      const sc = shake ? 1.3 - 0.3 * Math.min(1, k * 4) : 0.6 + 0.6 * Math.sin((Math.min(1, k * 2) * Math.PI) / 2);
      showTurned(p.el, p.e, 7, sc, sc, 0, kp);
      if (shake) { const ph = Math.floor((time - p.at) * 30) % 4; p.el.style.translate = `${[1, 0, -1, 0][ph] * kp}px ${[0, -1, 0, 1][ph] * kp}px`; }
      return true;
    });
    // The refused letters: scrunched up where they were stopped, then flung away as balls of paper, tumbling, one bounce,
    // a moment on the ground and gone.
    const dt = this.lastTime < 0 ? 0 : Math.max(0, Math.min(0.1, time - this.lastTime)), bn = Math.round(t.bubbles.emojiPixels * 0.8);
    this.lastTime = time;
    pixelSprite(BALL, bn, paintBall);
    this.crumples = this.crumples.filter(q => {
      const u = time - q.at;
      if (u < 0) { q.el.remove(); return false; }
      if (u < CRUMPLE) {
        const f = u / CRUMPLE, j = hash2(q.seed, Math.floor(u * 40), 9) - 0.5;
        place(q.el, q.x, q.y, q.z);
        showTurned(q.el, "💌", bn, 1 - 0.5 * f + 0.15 * j, 1 - 0.4 * f - 0.15 * j, j * 60, kp);
        hide(q.el, `c${q.seed}:${q.at}`, q.x, q.y, q.z);
        return true;
      }
      if (q.landed < 0) {
        q.vy -= GRAVITY * dt; q.x += q.vx * dt; q.y += q.vy * dt; q.z += q.vz * dt;
        if (q.y <= 0.15) { q.y = 0.15; if (!q.bounced) { q.bounced = true; q.vy = -q.vy * 0.35; q.vx *= 0.5; q.vz *= 0.5; } else q.landed = time; }
      }
      const rest = q.landed < 0 ? 0 : time - q.landed;
      if (rest > BALL_REST) { q.el.remove(); return false; }
      place(q.el, q.x, q.y, q.z);
      const flying = (q.landed < 0 ? u : q.landed - q.at) - CRUMPLE;
      showTurned(q.el, BALL, bn, 0.8, 0.8, flying * 540 + q.seed * 50, kp);
      q.el.style.opacity = rest > BALL_REST - BALL_FADE ? ((BALL_REST - rest) / BALL_FADE).toFixed(2) : "1";
      hide(q.el, `c${q.seed}:${q.at}`, q.x, q.y, q.z, Number(q.el.style.opacity));
      return true;
    });
    // Hers follows her; theirs follow them.
    if (time < this.hers.until) place(this.hers.el, w.x, witchHeight(w, t) + 2.2, w.z); else this.hers.el.classList.remove("on");
    for (const [id, b] of this.replies) {
      const c = g.creatures[id];
      if (time >= b.until || c.gone) { b.el.remove(); this.replies.delete(id); continue; }
      const hd = heads?.get(id); // (its tail over its head: Ed, 2026-10-12)
      place(b.el, hd?.x ?? c.x, head(id) + 0.9, hd?.z ?? c.z);
      const seen = this.sight.step(`r${id}`, sightOf(w, c.x, c.z, t.bubbles.near, t.bubbles.fade), performance.now() / 1000, t.bubbles.ease);
      b.el.style.opacity = seen.toFixed(2);
      if (seen < 0.01) b.el.style.visibility = "hidden";
    }

    // Flat on the ground, seen from the camera: squashed top to bottom by how steeply it looks down.
    (camera as THREE.Camera).getWorldDirection(this.fwd);
    const flat = Math.max(0.3, Math.min(1, Math.abs(this.fwd.y)));
    // The resting ones: lying flat where they came down, still at the turn they landed at, fading out at the end.
    {
      const n = Math.round(t.bubbles.emojiPixels * 0.8), k = t.pixelSize * t.bubbles.scale;
      this.resting = this.resting.filter(r => time - r.at < r.life && time >= r.at);
      while (this.restImgs.length < this.resting.length) {
        const im = document.createElement("img");
        Object.assign(im.style, { position: "absolute", imageRendering: "pixelated", width: `${n * k}px`, height: `${n * k}px`, marginLeft: `${(-n * k) / 2}px`, marginTop: `${(-n * k) / 2}px`, filter: "drop-shadow(0 1px 1px rgba(0,0,0,.6))" });
        im.src = pixelEmoji("💌", n);
        this.root.append(im);
        this.restImgs.push(im);
      }
      this.restImgs.forEach((im, i) => {
        const r = this.resting[i];
        if (!r) { if (im.style.display !== "none") im.style.display = "none"; return; }
        im.style.display = "block";
        const bob = r.sea ? Math.sin(time * 2.1 + r.tilt) : 0; // (floating on the sea, rocking gently)
        place(im, r.x, 0.08 + bob * 0.07, r.z);
        const op = Math.min(0.9, Math.max(0, (r.life - (time - r.at)) / r.fade) * 0.9);
        im.style.opacity = String(op);
        showTurned(im, "💌", n, 0.9, 0.9 * flat, r.tilt + bob * 8, k); // (turned, then laid flat, in art pixels)
        hide(im, `r${r.at}:${r.x}:${r.z}`, r.x, 0.15, r.z, op);
      });
    }
    // The letters in flight: a spinning pixel 💌 each.
    const n = Math.round(t.bubbles.emojiPixels * 0.8), k = t.pixelSize * t.bubbles.scale, src = pixelEmoji("💌", n);
    while (this.letters.length < I.letters.length) {
      const im = document.createElement("img");
      Object.assign(im.style, { position: "absolute", imageRendering: "pixelated", width: `${n * k}px`, height: `${n * k}px`, marginLeft: `${(-n * k) / 2}px`, marginTop: `${(-n * k) / 2}px`, filter: "drop-shadow(0 0 2px rgba(232,180,106,.75))" });
      im.src = src;
      this.root.append(im);
      this.letters.push(im);
    }
    this.letters.forEach((im, i) => {
      const L = I.letters[i];
      if (!L) { im.style.display = "none"; return; }
      im.style.display = "block";
      // One circling a Slingshot hat at hand height; the rest fly.
      const y = L.kind === "sling" ? 1.3 : lobHeight(L.flown, L.range ?? this.game.tuning.invites.range, this.game.tuning.invites.arc ?? 0);
      const [lx, ly, lz] = letterAt(this.herOffset, L.x, y, L.z); // (in the house, from her hand as drawn)
      place(im, lx, ly, lz);
      // Like a frisbee (Ed, 2026-10-06: "the envelopes should spin like a frisbee"): lying flat, turning
      // about the upright at invites.spin turns a second (snapped to sixteenths, pixel-like), laid flat
      // for the camera.
      const turns = Math.round(((time - L.at) * t.invites.spin + L.n * 0.37) * 16) / 16, deg = (turns % 1) * 360, sz = 1;
      if (!L.kind) this.spins.set(L.n, deg);
      showTurned(im, "💌", n, sz, sz * flat, deg, k); // (in art pixels, on the grid: Ed, round 14)
      hide(im, `l${L.n}`, lx, ly, lz);
    });
    if (this.spins.size > 64) { const live = new Set(I.letters.map(L => L.n)); for (const n of this.spins.keys()) if (!live.has(n)) this.spins.delete(n); }

    // The rings: one slot a hit each creature's meter needs (invites.hits by its level), the envelopes it holds
    // orbiting it, flat and spinning, the gaps faint marks; turning slowly round it at about its middle.
    const near = g.creatures.filter(c => !c.gone && Math.abs(c.x - w.x) < 60 && Math.abs(c.z - w.z) < 60 && (c.affection || this.ringModel.rings.has(c.id)));
    const changes = this.ringModel.update(near, c => ringOf(c.level, A.affection(c), meterHits(t)), won);
    // (clear of it, by its size: Ed's playtest, 2026-10-06, "Invitation orbits are too tight around the creature"; invites.orbit)
    const ringAt = (c: Creature, slot: number, slots: number) => {
      const O = t.invites.orbit, r = Math.max(bodyRadius(c) * O.scale + O.gap, O.min, (slots * 0.42) / (Math.PI * 2)), a = time * 0.7 + (slot / slots) * Math.PI * 2;
      return { x: c.x + Math.cos(a) * r, y: Math.max(0.5, head(c.id) * 0.55), z: c.z + Math.sin(a) * r };
    };
    const envSize = (slots: number) => (slots > 12 ? 0.55 : slots > 6 ? 0.7 : 0.85); // (smaller as they crowd: 18 still distinct)
    const img = (e: string, px: number) => {
      const im = document.createElement("img");
      Object.assign(im.style, { position: "absolute", imageRendering: "pixelated", width: `${px * k}px`, height: `${px * k}px`, marginLeft: `${(-px * k) / 2}px`, marginTop: `${(-px * k) / 2}px`, filter: "drop-shadow(0 0 2px rgba(232,180,106,.6))" });
      im.src = pixelEmoji(e, px);
      this.root.append(im);
      return im;
    };
    for (const ch of changes) {
      const c = g.creatures[ch.id], R = this.rings.get(ch.id);
      if (ch.kind === "join") {
        let r = R;
        if (!r) { r = { imgs: [], dots: [], joined: [] }; this.rings.set(ch.id, r); }
        r.joined[ch.slot] = time;
      } else if (ch.kind === "drop" && c) {
        // Out of orbit: it falls from where it was to the ground, then rests a moment there (no piling up).
        const p = ringAt(c, ch.slot, ch.slots);
        this.falling.push({ ...p, at: time, tilt: hash2(ch.id, ch.slot, 7) * 360, el: img("💌", n) });
      } else if (ch.kind === "hearts" && c) {
        // Full: the envelopes' paper vanishes, leaving each its ❤️, rising and fading.
        for (let s = 0; s < ch.slots; s++) this.hearts.push({ ...ringAt(c, s, ch.slots), at: time, el: img("❤️", Math.max(5, Math.round(n * envSize(ch.slots) * 0.75))) });
      }
    }
    for (const [id, r] of this.rings) {
      const now = this.ringModel.rings.get(id), c = g.creatures[id];
      if (!now || !c) { for (const el of [...r.imgs, ...r.dots]) el.remove(); this.rings.delete(id); continue; }
      const sz = envSize(now.slots);
      // (its ring hidden exactly when its animal is (Ed, 2026-10-19): one probe at the animal's middle, brought out of its own body
      // towards the camera, so the animal never hides its own ring but whatever stands in front of it does)
      const cx = camera.position.x - c.x, cz = camera.position.z - c.z, cd = Math.hypot(cx, cz) || 1, out = bodyRadius(c) + 0.3;
      const rx = c.x + (cx / cd) * out, ry = Math.max(0.5, head(id) * 0.5), rz = c.z + (cz / cd) * out, rkey = `ring${id}`;
      while (r.imgs.length < now.slots) { const im = img("💌", n); im.style.display = "none"; r.imgs.push(im); }
      while (r.dots.length < now.slots) {
        const d = document.createElement("div");
        Object.assign(d.style, { position: "absolute", width: `${k}px`, height: `${k}px`, marginLeft: `${-k / 2}px`, marginTop: `${-k / 2}px`, background: "rgba(243,207,154,.55)", boxShadow: "0 0 2px rgba(217,120,158,.6)" });
        this.root.append(d); r.dots.push(d);
      }
      for (let s = 0; s < r.imgs.length; s++) {
        const im = r.imgs[s], d = r.dots[s], on = s < now.filled, there = s < now.slots;
        im.style.display = on ? "block" : "none";
        d.style.display = there && !on ? "block" : "none";
        if (!there) continue;
        const p = ringAt(c, s, now.slots);
        if (on) {
          place(im, p.x, p.y, p.z);
          hide(im, rkey, rx, ry, rz);
          const pop = Math.min(1, (time - (r.joined[s] ?? -9)) / 0.25), grow = pop < 1 ? 1.4 - 0.4 * pop : 1; // (joining: a little pop)
          const deg = ((Math.round((time * t.invites.spin * 0.5 + s * 0.13) * 16) / 16) % 1) * 360;
          showTurned(im, "💌", n, sz * grow, sz * grow * flat, deg, k);
        } else { place(d, p.x, p.y, p.z); hide(d, rkey, rx, ry, rz); }
      }
    }
    // Falling out of orbit (0.45 s), then resting where it came down with the other resting 💌s.
    this.falling = this.falling.filter(f => {
      const u = (time - f.at) / 0.45;
      if (u >= 1 || u < 0) {
        f.el.remove();
        if (u >= 1) this.rest(f.x, f.z, time, f.tilt);
        return false;
      }
      place(f.el, f.x, f.y * (1 - u * u), f.z);
      showTurned(f.el, "💌", n, 0.7, 0.7 * flat, f.tilt + u * 200, k);
      hide(f.el, `f${f.at}:${f.tilt}`, f.x, f.y * (1 - u * u), f.z);
      return true;
    });
    // The hearts: rising a metre and a half over a second, fading.
    this.hearts = this.hearts.filter(h => {
      const u = (time - h.at) / 1.1;
      if (u >= 1 || u < 0) { h.el.remove(); return false; }
      place(h.el, h.x, h.y + 1.5 * u, h.z);
      h.el.style.opacity = (u < 0.6 ? 1 : (1 - u) / 0.4).toFixed(2);
      return true;
    });
  }
}

/** Where she's drawn less where the rules have her, while she's in the treehouse (render/view/witch.ts: the oak's rooms are drawn
 *  on the Ent's plane, slid up it with her, render/houseRooms.ts houseShift), and `y` her feet's height in the world as drawn
 *  (the house's floor, some 22 m up). Off anywhere else. */
export interface HerOffset { on: boolean; x: number; y: number; z: number }
/** Where to draw a letter the rules have at (x, z), `y` metres up from where she stands: as it is, or in the house moved with her,
 *  so a 💌 leaves her hand as drawn and flies on over the house's floor (Ed's playtest, 2026-10-25: "When you invite while you're
 *  in the treehouse, the invites come from a place where the witch isn't": from the ground 22 m below her rules' place). The height
 *  returned is over the ground there, as `placed` takes it. */
export function letterAt(O: HerOffset | undefined, x: number, y: number, z: number, ground: (x: number, z: number) => number = groundHeight): [number, number, number] {
  if (!O?.on) return [x, y, z];
  const X = x + O.x, Z = z + O.z;
  return [X, O.y + y - ground(X, Z), Z];
}

/** Her hand's height (m), where a 💌 leaves from. */
export const HAND = 1.3;
/** A letter's height (m) `flown` metres out (Ed, round 11: "they should arc a little and disappear when
 *  they hit the ground"): a gentle lob from her hand, rising `arc` over the straight line down to the
 *  ground at `range`, where the rules end it (fizzled) and it lands with a puff. */
export const lobHeight = (flown: number, range: number, arc: number) => {
  const f = Math.max(0, Math.min(1, flown / Math.max(1e-3, range)));
  return HAND * (1 - f) + 4 * arc * f * (1 - f);
};
