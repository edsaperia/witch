// Drawing the party witches (rules/partyWitches.ts) and our witch idling into the party: sprites
// like the creatures (solid round her, never cut away), each look its own batch (the art's
// partyWitch(seed), #37). On foot she plays her activity's pose, dance moves in time with the
// beat; flying in, out or round the floor, her hover frames. A pair's two sprites are lined up so
// their meeting anchors (WITCH_PAIRS: hands, a hug, a toast, a conga's shoulders) land on the
// same pixel.
import { beatTime } from "../rules/beat";
import * as THREE from "three";
import * as Art from "../../art/generator.js";
import type { Game } from "../rules/game";
import type { PartyWitch, PlayerIdle } from "../rules/partyWitches";

/** Who to draw: the party witches and how our witch idles in (the dancefloor's, or the beach's). */
export interface WitchGroup { list: PartyWitch[]; her?: Pick<PlayerIdle, "activity" | "pose" | "facing"> | null }
import type { AssetLibrary } from "./assets";
import { groundOf, type Atlas } from "./atlas";
import type { PartyWitchArt } from "./artBuild";
import { SPRITE_UNIFORMS, SpriteBatch, type SpriteInstance } from "./sprites";
import type { ShadowInstance } from "./shadows";
import { placed } from "./height";
import { tiltFilter } from "./overlayTilt";

/** How many different looks are drawn: party witches beyond that share them (each look is a set of sprites to draw). */
export const LOOKS = 12;
const PAIRS = Art.WITCH_PAIRS as Record<string, { meet: string; partner?: string; mirror: boolean; frame?: number }>;
const DANCE = new Set(["twoStep", "bounce", "shuffle", "spin", "headbang", "jump", "dancePair", "conga", "twirl", "twirled", "limbo"]);
const CHAT = ["🎉", "😆", "🍹", "💃", "🥳", "😂", "🎶", "✨", "🍕", "😎", "🙌", "🤭"];

type WitchArt = PartyWitchArt & { atlas: Atlas };

export class PartyWitchView {
  private batches = new Map<string, SpriteBatch>();
  /** The chats' emoji bubbles (HTML over the canvas, lighter than her own conversations). */
  private bubblePool: HTMLDivElement[] = [];
  private v = new THREE.Vector3();
  /** Whether our witch is drawn here this frame (idling in a party pose), so the view leaves her out. */
  herIdle = false;
  /** Their shadows this frame (hers too while she's drawn here), for the view's shadow batch: under each one's feet on the
   *  ground, as wide as her pose; up in the air, still on the ground under her, smaller the higher she flies. */
  shadows: ShadowInstance[] = [];

  constructor(private scene: THREE.Scene, private assets: AssetLibrary, private mpp: number, private light: { lightFloor: number; lightTint: number; lightRim: number }) {}

  private batch(key: string, art: WitchArt): SpriteBatch {
    let b = this.batches.get(key);
    // Lit as our witch is (witchLight.ts): by the world's lights, tinted and rimmed by coloured ones, never lost in the dark.
    if (!b) { b = new SpriteBatch(art.atlas, this.mpp, { solid: true, witchLight: this.light }); this.batches.set(key, b); this.scene.add(...b.meshes); }
    return b;
  }

  /** Gone from the scene for good (the beach's, as she leaves it): its batches and bubbles let go, the looks' atlases kept. */
  dispose(): void {
    for (const b of this.batches.values()) { this.scene.remove(...b.meshes); b.release(); }
    this.batches.clear();
    for (const el of this.bubblePool) el.remove();
    this.bubblePool.length = 0;
  }

  /** Which frame of a pose: dance moves in whole beats, the rest at the art's own rate. */
  private frameOf(art: WitchArt, pose: string, time: number, bpm: number, phase: number, bt = time): number {
    const fr = art.poses[pose] ?? art.poses.stand, n = fr.length, fps = art.fps[pose] ?? 3;
    if (DANCE.has(pose)) { const beats = (bt * bpm) / 60 + phase, perCycle = Math.max(1, Math.round((n / fps) * (bpm / 60))); return fr[Math.floor(((beats % perCycle) / perCycle) * n) % n]; }
    return fr[Math.floor(time * fps + phase * 7) % n];
  }

  /** The chats: a small emoji over whoever's turn it is in each chatting pair, taking turns. */
  bubbles(g: Game, time: number, camera: THREE.Camera, width: number, height: number, list = g.partyWitches.list): void {
    let n = 0;
    for (const w of list) {
      if (w.state !== "floor" || w.activity !== "chat" || w.partner === null || n >= 8) continue;
      const turn = Math.floor(time / 1.4 + (w.lead ? 0 : 0.5));
      if ((turn + (w.lead ? 0 : 1)) % 2) continue; // their turn or their partner's
      let el = this.bubblePool[n];
      if (!el) {
        el = document.createElement("div");
        el.style.cssText = "position:absolute;transform:translate(-50%,-100%);font-size:13px;padding:1px 4px;border-radius:8px;background:rgba(255,255,255,.55);pointer-events:none;z-index:4";
        document.body.appendChild(el); this.bubblePool.push(el);
      }
      placed(this.v.set(w.x, 2.4, w.z)).project(camera); // (on the bent, rolling ground, as they are)
      const y = ((1 - this.v.y) / 2) * height;
      el.style.left = `${((this.v.x + 1) / 2) * width}px`; el.style.top = `${y}px`;
      tiltFilter(el, y);
      const e = CHAT[(turn * 7 + w.id * 3) % CHAT.length];
      if (el.textContent !== e) el.textContent = e;
      el.style.display = this.v.z < 1 ? "" : "none";
      n++;
    }
    for (let i = n; i < this.bubblePool.length; i++) this.bubblePool[i].style.display = "none";
  }

  update(g: Game, time: number, visible: (x: number, z: number, w: number, h: number) => boolean, group: WitchGroup = { list: g.partyWitches.list, her: g.partyWitches.players[0] }): void {
    const per = new Map<string, { art: WitchArt; list: SpriteInstance[] }>(), bpm = g.tuning.beat.bpm, bt = beatTime(g.beat, time), R = SPRITE_UNIFORMS.uRight.value;
    const placed = new Map<number, { x: number; z: number; frame: number; art: WitchArt; flip: boolean; pose: string }>();
    const put = (key: string, art: WitchArt, inst: SpriteInstance) => { let e = per.get(key); if (!e) per.set(key, (e = { art, list: [] })); e.list.push(inst); };
    // Each stood by her frame's ground (art/witch.js liftShadow: the point under her on the model's ground on the ground, not
    // the bottom of her box), her shadow laid there.
    const U = SPRITE_UNIFORMS.uUp.value, shadows: ShadowInstance[] = (this.shadows = []);
    const stand = (art: WitchArt, fi: number, x: number, y: number, z: number, flip: boolean): SpriteInstance => {
      const f = art.atlas.frames[fi], gr = groundOf(art.anchors[fi]), sink = gr ? (f.h - gr.y) * this.mpp : 0, side = gr ? (gr.x - f.w / 2) * this.mpp * (flip ? -1 : 1) : 0;
      const ref = groundOf(art.anchors[art.hover.towards[0]]), wide = gr && ref && ref.w > 0 ? Math.max(0.6, Math.min(3, gr.w / ref.w)) : 1, k = Math.max(0.35, 1 - Math.max(0, y) / 12);
      shadows.push({ x: x + R.x * side, z: z + R.z * side, w: 1.4 * wide * k, d: 0.7 * k });
      return { x: x - U.x * sink, y: y - U.y * sink, z: z - U.z * sink, frame: f, flip };
    };
    const lookOf = (w: PartyWitch) => this.assets.partyWitchArt(w.seed % LOOKS);
    // Leads first, so a partner can line up with her.
    const list = [...group.list].sort((a, b) => Number(b.lead) - Number(a.lead));
    for (const w of list) {
      const art = lookOf(w);
      if (!art) continue;
      const flying = w.state !== "floor" || w.activity === "fly" || w.y > 0.2;
      let fi: number, x = w.x, z = w.z;
      const flip = w.facing < 0;
      if (flying) fi = art.hover[w.away ? "away" : "towards"][Math.floor(time * 4 + w.id) % 3];
      else {
        fi = this.frameOf(art, w.pose, time, bpm, (w.id % 4) * 0.25, bt);
        // A partner lines up with her lead: their meeting anchors on the same pixel.
        // (By the lead's pose: a partner's own may differ: twirled, limboHelp.)
        const lead = w.partner !== null && w.partner >= 0 && !w.lead && !w.third ? placed.get(w.partner) : undefined, pair = lead ? PAIRS[lead.pose] : undefined;
        if (pair && lead) {
          fi = this.frameOf(art, w.pose, time, bpm, 0, bt); // in step with her
          const la = art.anchors[lead.frame] ? lead : null, A = la ? lead.art.anchors[lead.frame]?.[pair.partner ?? pair.meet] : undefined, B = art.anchors[fi]?.[pair.meet];
          if (A && B) {
            const lf = lead.art.atlas.frames[lead.frame], pf = art.atlas.frames[fi];
            const ax = (lead.flip ? lf.w - A[0] : A[0]) - lf.w / 2, bx = (flip ? pf.w - B[0] : B[0]) - pf.w / 2;
            const dx = (ax - bx) * this.mpp;
            if (Math.hypot(lead.x + R.x * dx - x, lead.z + R.z * dx - z) < 1.5) { x = lead.x + R.x * dx; z = lead.z + R.z * dx; }
          }
        }
      }
      const f = art.atlas.frames[fi];
      placed.set(w.id, { x, z, frame: fi, art, flip, pose: w.pose });
      if (!visible(x, z, f.w * this.mpp, f.h * this.mpp)) continue;
      put(`pw-${w.seed % LOOKS}`, art, stand(art, fi, x, w.y, z, flip));
    }
    // Our witch, idling into the party (any input stops it: rules/partyWitches.ts).
    const I = group.her, wt = g.witch;
    this.herIdle = false;
    if (I?.activity && I.pose && wt.mode === "ground" && !wt.seated) {
      const art = this.assets.partyWitchArt(null);
      if (art) {
        const fi = this.frameOf(art, I.pose, time, bpm, 0, bt);
        put("her", art, stand(art, fi, wt.x, 0, wt.z, I.facing < 0));
        this.herIdle = true;
      }
    }
    for (const [k, b] of this.batches) if (!per.has(k)) b.set([]);
    for (const [k, e] of per) this.batch(k, e.art).set(e.list);
  }
}
