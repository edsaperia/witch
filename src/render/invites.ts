// The 💌 invite's look (issue #87; the rules are rules/invites.ts): each letter in flight a pixel 💌
// lying flat and spinning like a frisbee (Ed, 2026-10-06), then resting flat where it comes down; a speech bubble from the witch when she
// fires and an emoji reply from a creature a letter lands on (warming up with its meter), each
// rate-limited and replacing its last so a burst isn't a blizzard; and over each creature being
// invited, a small pink meter of hearts filling as letters land and draining slowly (distinct from
// the berry ring round a party animal: that's on the ground, round leashed ones only). DOM, like
// the talk bubbles, drawn as pixel art.
import * as THREE from "three";
import type { Game } from "../rules/game";
import { affectionOf } from "../rules/game";
import { witchHeight } from "../rules/witch";
import { hash2 } from "../rules/random";
import { placed } from "./height";
import { sizeBubble } from "./bubbles";

const HERS = ["💌", "🎉", "🥳", "💃", "🎈", "😘", "🎶", "✨"];
// Replies by how full its meter is: unsure, warming, nearly, won over; and stung (blocked).
const REPLIES = [["😳", "🤨", "😶", "🫣"], ["😮", "🤭", "😊", "🙂"], ["😍", "🥰", "😆", "🤩"], ["🥳", "🎉", "💖", "💃"]];
const BLOCKED = ["😠", "🙅", "💢", "😤"];

/** A pixel emoji: drawn n pixels across with hard edges, as a data URL (cached). */
const pixelCache = new Map<string, string>();
function pixelEmoji(e: string, n: number): string {
  const key = `${e}:${n}`;
  let url = pixelCache.get(key);
  if (url) return url;
  const c = document.createElement("canvas");
  c.width = c.height = n;
  const x = c.getContext("2d");
  if (x) {
    x.font = `${n - 1}px sans-serif`; x.textAlign = "center"; x.textBaseline = "middle";
    x.fillText(e, n / 2, n / 2 + 0.5);
    const d = x.getImageData(0, 0, n, n);
    for (let i = 3; i < d.data.length; i += 4) d.data[i] = d.data[i] < 110 ? 0 : 255;
    x.putImageData(d, 0, 0);
  }
  url = c.toDataURL();
  pixelCache.set(key, url);
  return url;
}

interface Bubble { el: HTMLElement; img: HTMLImageElement; until: number; x: number; y: number; z: number; id: number }

export class InviteView {
  private root = document.createElement("div");
  private letters: HTMLImageElement[] = [];
  private lanterns: HTMLElement[] = [];
  private meters = new Map<number, HTMLElement>();
  private hers: Bubble;
  private replies = new Map<number, Bubble>();
  private lastHers = -Infinity;
  /** Little pops where letters land: { element, where, when }. */
  private pops: { el: HTMLImageElement; x: number; y: number; z: number; at: number }[] = [];
  /** 💌s that met no one, resting where they came down (Ed's playtest, 2026-10-06: "invitations
   *  should sit on the ground for a little while before they fade away"): drawn only (the rules ended
   *  them; they're no hits), at most invites.lingerMax, their images pooled and reused. */
  private resting: { x: number; z: number; at: number; tilt: number }[] = [];
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

  private bubble(id: number): Bubble {
    const el = document.createElement("div"), img = document.createElement("img");
    el.className = "bubble";
    el.style.zIndex = "2";
    img.style.imageRendering = "pixelated"; img.style.display = "block";
    el.append(img);
    this.root.append(el);
    return { el, img, until: -Infinity, x: 0, y: 0, z: 0, id };
  }

  /** Show emoji `e` in bubble b until then: sized for its speaker (a creature by its level, the witch at 1). */
  private show(b: Bubble, e: string, x: number, y: number, z: number, until: number, level?: number): void {
    b.img.src = pixelEmoji(e, this.game.tuning.bubbles.emojiPixels);
    sizeBubble(b.el, b.img, this.game.tuning, level);
    b.x = x; b.y = y; b.z = z; b.until = until;
    b.el.classList.add("on");
  }

  private pop(e: string, x: number, y: number, z: number, at: number): void {
    const n = 7, k = this.game.tuning.pixelSize * this.game.tuning.bubbles.scale, el = document.createElement("img");
    el.src = pixelEmoji(e, n);
    Object.assign(el.style, { position: "absolute", imageRendering: "pixelated", width: `${n * k}px`, height: `${n * k}px`, marginLeft: `${(-n * k) / 2}px`, marginTop: `${(-n * k) / 2}px` });
    this.root.append(el);
    this.pops.push({ el, x, y, z, at });
    if (this.pops.length > 40) this.pops.shift()!.el.remove();
  }

  update(time: number, camera: THREE.Camera, width: number, height: number, tops: Map<number, number>): void {
    const g = this.game, W = g.witches[0], I = W.invites, t = g.tuning, w = g.witch;
    const place = (el: HTMLElement, x: number, y: number, z: number) => {
      placed(this.v.set(x, y, z)).project(camera);
      const vis = this.v.z < 1 && Math.abs(this.v.x) < 1.2 && Math.abs(this.v.y) < 1.2;
      el.style.left = `${((this.v.x + 1) / 2) * width}px`;
      el.style.top = `${((1 - this.v.y) / 2) * height}px`;
      el.style.visibility = vis ? "visible" : "hidden";
    };
    const head = (id: number) => (tops.get(id) ?? 1.2 + g.creatures[id].level * 0.8) + 0.3;
    const pick = (list: string[], a: number, b: number) => list[Math.floor(hash2(a, b, 17) * list.length) % list.length];

    // The bubbles: hers on a shot (at most one every bubbleEvery seconds, replacing the last); a
    // creature's reply on a hit or a block (one per creature, replacing its last).
    const A = affectionOf(g);
    for (const e of I.events) {
      const key = `${e.kind}:${e.n ?? ""}:${e.id ?? ""}:${e.at}`;
      if (this.seen.has(key)) continue;
      this.seen.add(key);
      if (e.kind === "shot" && time - this.lastHers > 0.7) {
        this.lastHers = time;
        this.show(this.hers, pick(HERS, e.n ?? 0, 1), 0, 0, 0, time + 0.8);
      } else if (e.kind === "fizzled") {
        // (landed on the ground at its range: a soft rose puff, render/leash.ts drawLetters; and it rests there a while)
        if ((t.invites.linger ?? 0) > 0) {
          this.resting.push({ x: e.x, z: e.z, at: time, tilt: this.spins.get(e.n ?? -1) ?? (hash2(e.n ?? 0, 3, 29) - 0.5) * 50 });
          if (this.resting.length > t.invites.lingerMax) this.resting.shift();
        }
      } else if ((e.kind === "hit" || e.kind === "blocked" || e.kind === "happy") && e.id !== undefined) {
        // Every letter that lands pops; one inside the creature's gap (spent) adds nothing, and gets no reply.
        if (e.kind === "blocked" || (e.kind === "hit" && !e.spent)) this.pop(e.kind === "blocked" ? "💢" : "💖", e.x, head(e.id) * 0.6, e.z, time); // (a spent one: only its ring, render/leash.ts; no white ✨)
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
      const k = (time - p.at) / 0.35;
      if (k >= 1 || k < 0) { p.el.remove(); return false; }
      place(p.el, p.x, p.y + k * 0.5, p.z);
      p.el.style.opacity = String(1 - k);
      p.el.style.transform = `scale(${(0.6 + 0.6 * Math.sin(Math.min(1, k * 2) * Math.PI / 2)).toFixed(2)})`;
      return true;
    });
    // Hers follows her; theirs follow them.
    if (time < this.hers.until) place(this.hers.el, w.x - 1.2, witchHeight(w, t) + 2.2, w.z); else this.hers.el.classList.remove("on");
    for (const [id, b] of this.replies) {
      const c = g.creatures[id];
      if (time >= b.until || c.gone) { b.el.remove(); this.replies.delete(id); continue; }
      place(b.el, c.x, head(id) + 0.9, c.z);
    }

    // Flat on the ground, seen from the camera: squashed top to bottom by how steeply it looks down.
    (camera as THREE.Camera).getWorldDirection(this.fwd);
    const flat = Math.max(0.3, Math.min(1, Math.abs(this.fwd.y)));
    // The resting ones: lying flat where they came down, still at the turn they landed at, fading out at the end.
    {
      const life = t.invites.linger ?? 0, fade = Math.max(0.01, Math.min(life, t.invites.lingerFade)), n = Math.round(t.bubbles.emojiPixels * 0.8), k = t.pixelSize * t.bubbles.scale;
      this.resting = this.resting.filter(r => time - r.at < life && time >= r.at);
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
        place(im, r.x, 0.08, r.z);
        im.style.opacity = String(Math.min(0.9, Math.max(0, (life - (time - r.at)) / fade) * 0.9));
        im.style.transform = `scale(0.9, ${(0.9 * flat).toFixed(2)}) rotate(${r.tilt.toFixed(0)}deg)`; // (turned, then laid flat)
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
      // A cache waits on the ground, bobbing; an orbiting one circles at her hand; the rest fly.
      const y = L.kind === "cache" ? 0.35 + 0.12 * Math.sin((time - L.at) * 4 + L.n) : L.kind === "orbit" ? 1.3 : lobHeight(L.flown, L.range ?? this.game.tuning.invites.range, this.game.tuning.invites.arc ?? 0);
      place(im, L.x, y, L.z);
      // Like a frisbee (Ed, 2026-10-06: "the envelopes should spin like a frisbee"): lying flat, turning
      // about the upright at invites.spin turns a second (snapped to sixteenths, pixel-like), laid flat
      // for the camera; a small one (Spawn) smaller; a cache still.
      const turns = L.kind === "cache" ? 0 : Math.round(((time - L.at) * t.invites.spin + L.n * 0.37) * 16) / 16, deg = (turns % 1) * 360, sz = L.small ? 0.6 : 1;
      if (!L.kind) this.spins.set(L.n, deg);
      im.style.transform = `scale(${sz}, ${(sz * flat).toFixed(2)}) rotate(${deg.toFixed(1)}deg)`;
    });
    if (this.spins.size > 64) { const live = new Set(I.letters.map(L => L.n)); for (const n of this.spins.keys()) if (!live.has(n)) this.spins.delete(n); }
    // Lanterns (Glow-worm): little glowing hearts where the letters flew, fading out.
    while (this.lanterns.length < I.lanterns.length) {
      const d = document.createElement("div");
      Object.assign(d.style, { position: "absolute", width: `${k * 2}px`, height: `${k * 2}px`, marginLeft: `${-k}px`, marginTop: `${-k}px`, background: "#f3cf9a", boxShadow: "0 0 6px 2px rgba(217,120,158,.7)" });
      this.root.append(d);
      this.lanterns.push(d);
    }
    this.lanterns.forEach((d, i) => {
      const p = I.lanterns[i];
      if (!p) { d.style.display = "none"; return; }
      d.style.display = "block";
      place(d, p.x, 1.1, p.z);
      d.style.opacity = Math.max(0, Math.min(1, (p.until - time) / 0.3)).toFixed(2);
    });

    // The meters: a pill of hearts over each creature with some affection.
    const live = new Set<number>();
    // (Each creature's own meter, rules/affection.ts since #96: draining when it isn't being hit.)
    for (const c of g.creatures) {
      if (c.gone || !c.affection || Math.abs(c.x - w.x) > 60 || Math.abs(c.z - w.z) > 60) continue;
      const v = A.affection(c), id = c.id;
      if (v === null) continue;
      live.add(id);
      let el = this.meters.get(id);
      if (!el) {
        el = document.createElement("div");
        Object.assign(el.style, { position: "absolute", transform: "translate(-50%, -100%)", display: "flex", gap: "1px", padding: "2px", background: "rgba(14,11,28,.7)", border: "1px solid rgba(217,120,158,.6)", borderRadius: "3px", imageRendering: "pixelated" });
        this.root.append(el);
        this.meters.set(id, el);
      }
      const hearts = 5, full = v * hearts;
      const key = Math.round(full * 2) / 2;
      if (el.dataset.k !== String(key)) {
        el.dataset.k = String(key);
        el.innerHTML = Array.from({ length: hearts }, (_, i) => {
          const f = Math.max(0, Math.min(1, full - i));
          return `<i style="display:block;width:5px;height:5px;background:linear-gradient(90deg,#d9789e ${f * 100}%,rgba(217,120,158,.2) ${f * 100}%)"></i>`;
        }).join("");
      }
      place(el, c.x, head(id) + 0.15, c.z);
    }
    for (const [id, el] of this.meters) if (!live.has(id)) { el.remove(); this.meters.delete(id); }
  }
}

/** Her hand's height (m), where a 💌 leaves from. */
const HAND = 1.3;
/** A letter's height (m) `flown` metres out (Ed, round 11: "they should arc a little and disappear when
 *  they hit the ground"): a gentle lob from her hand, rising `arc` over the straight line down to the
 *  ground at `range`, where the rules end it (fizzled) and it lands with a puff. */
export const lobHeight = (flown: number, range: number, arc: number) => {
  const f = Math.max(0, Math.min(1, flown / Math.max(1e-3, range)));
  return HAND * (1 - f) + 4 * arc * f * (1 - f);
};
