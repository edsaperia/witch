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
import { affectionOf } from "../rules/game";
import { witchHeight } from "../rules/witch";
import { hash2 } from "../rules/random";
import { placed } from "./height";
import { sizeBubble } from "./bubbles";
import { bodyRadius } from "../rules/spacing";
import type { Creature } from "../rules/creatures";
import { RingModel, ringOf } from "./inviteRing";
import { beachOf } from "../rules/mapShape";

const HERS = ["💌", "🎉", "🥳", "💃", "🎈", "😘", "🎶", "✨"];
// Replies by how full its meter is: unsure, warming, nearly, won over; and stung (blocked).
const REPLIES = [["😳", "🤨", "😶", "🫣"], ["😮", "🤭", "😊", "🙂"], ["😍", "🥰", "😆", "🤩"], ["🥳", "🎉", "💖", "💃"]];
const BLOCKED = ["😠", "🙅", "💢", "😤"];

/** A pixel emoji: drawn n pixels across with hard edges, as a data URL (cached). */
const pixelCache = new Map<string, string>();
export function pixelEmoji(e: string, n: number): string {
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
  /** The rings (render/inviteRing.ts): what each holds, and its envelopes and gap marks by creature. */
  private ringModel = new RingModel();
  private rings = new Map<number, { imgs: HTMLImageElement[]; dots: HTMLElement[]; joined: number[] }>();
  /** Envelopes falling out of orbit (then resting), and hearts rising off a full ring. */
  private falling: { x: number; y: number; z: number; at: number; tilt: number; el: HTMLImageElement }[] = [];
  private hearts: { x: number; y: number; z: number; at: number; el: HTMLImageElement }[] = [];
  private hers: Bubble;
  private replies = new Map<number, Bubble>();
  private lastHers = -Infinity;
  /** Little pops where letters land: { element, where, when }. */
  private pops: { el: HTMLImageElement; x: number; y: number; z: number; at: number }[] = [];
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
    const A = affectionOf(g), won: number[] = [];
    for (const e of I.events) {
      const key = `${e.kind}:${e.n ?? ""}:${e.id ?? ""}:${e.at}`;
      if (this.seen.has(key)) continue;
      this.seen.add(key);
      if (e.kind === "shot" && time - this.lastHers > 0.7) {
        this.lastHers = time;
        this.show(this.hers, pick(HERS, e.n ?? 0, 1), 0, 0, 0, time + 0.8);
      } else if (e.kind === "fizzled") {
        // (landed on the ground at its range: a soft rose puff, render/leash.ts drawLetters; and it rests there a while)
        this.rest(e.x, e.z, time, this.spins.get(e.n ?? -1) ?? (hash2(e.n ?? 0, 3, 29) - 0.5) * 50);
      } else if ((e.kind === "hit" || e.kind === "blocked" || e.kind === "happy") && e.id !== undefined) {
        // A blocked letter pops 💢; one that lands joins its ring (below); won over, the ring goes to hearts.
        if (e.kind === "blocked") this.pop("💢", e.x, head(e.id) * 0.6, e.z, time);
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
        im.style.opacity = String(Math.min(0.9, Math.max(0, (r.life - (time - r.at)) / r.fade) * 0.9));
        im.style.transform = `scale(0.9, ${(0.9 * flat).toFixed(2)}) rotate(${(r.tilt + bob * 8).toFixed(0)}deg)`; // (turned, then laid flat)
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

    // The rings: one slot a hit each creature's meter needs (invites.hits by its level), the envelopes it holds
    // orbiting it, flat and spinning, the gaps faint marks; turning slowly round it at about its middle.
    const near = g.creatures.filter(c => !c.gone && Math.abs(c.x - w.x) < 60 && Math.abs(c.z - w.z) < 60 && (c.affection || this.ringModel.rings.has(c.id)));
    const changes = this.ringModel.update(near, c => ringOf(c.level, A.affection(c), t.invites.hits), won);
    const ringAt = (c: Creature, slot: number, slots: number) => {
      const r = Math.max(bodyRadius(c) + 0.6, 1.1, (slots * 0.42) / (Math.PI * 2)), a = time * 0.7 + (slot / slots) * Math.PI * 2;
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
          const pop = Math.min(1, (time - (r.joined[s] ?? -9)) / 0.25), grow = pop < 1 ? 1.4 - 0.4 * pop : 1; // (joining: a little pop)
          const deg = ((Math.round((time * t.invites.spin * 0.5 + s * 0.13) * 16) / 16) % 1) * 360;
          im.style.transform = `scale(${(sz * grow).toFixed(2)}, ${(sz * grow * flat).toFixed(2)}) rotate(${deg.toFixed(1)}deg)`;
        } else place(d, p.x, p.y, p.z);
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
      f.el.style.transform = `scale(0.7, ${(0.7 * flat).toFixed(2)}) rotate(${(f.tilt + u * 200).toFixed(0)}deg)`;
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

/** Her hand's height (m), where a 💌 leaves from. */
const HAND = 1.3;
/** A letter's height (m) `flown` metres out (Ed, round 11: "they should arc a little and disappear when
 *  they hit the ground"): a gentle lob from her hand, rising `arc` over the straight line down to the
 *  ground at `range`, where the rules end it (fizzled) and it lands with a puff. */
export const lobHeight = (flown: number, range: number, arc: number) => {
  const f = Math.max(0, Math.min(1, flown / Math.max(1e-3, range)));
  return HAND * (1 - f) + 4 * arc * f * (1 - f);
};
