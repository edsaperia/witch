// Drawing the party witches (rules/partyWitches.ts) and our witch idling into the party: sprites
// like the creatures (solid round her, never cut away), each look its own batch (the art's
// partyWitch(seed), #37). On foot she plays her activity's pose, dance moves in time with the
// beat; flying in, out or round the floor, her hover frames. A pair's two sprites are lined up so
// their meeting anchors (WITCH_PAIRS: hands, a hug, a toast, a conga's shoulders) land on the
// same pixel.
import * as THREE from "three";
import * as Art from "../../art/generator.js";
import type { Game } from "../rules/game";
import type { PartyWitch } from "../rules/partyWitches";
import type { AssetLibrary } from "./assets";
import type { Atlas } from "./atlas";
import type { PartyWitchArt } from "./artBuild";
import { SPRITE_UNIFORMS, SpriteBatch, type SpriteInstance } from "./sprites";

/** How many different looks are drawn: party witches beyond that share them (each look is a set of sprites to draw). */
export const LOOKS = 12;
const PAIRS = Art.WITCH_PAIRS as Record<string, { meet: string; partner?: string; mirror: boolean; frame?: number }>;
const DANCE = new Set(["twoStep", "bounce", "shuffle", "spin", "headbang", "jump", "dancePair", "conga"]);

type WitchArt = PartyWitchArt & { atlas: Atlas };

export class PartyWitchView {
  private batches = new Map<string, SpriteBatch>();
  /** Whether our witch is drawn here this frame (idling in a party pose), so the view leaves her out. */
  herIdle = false;

  constructor(private scene: THREE.Scene, private assets: AssetLibrary, private mpp: number, private light: { lightFloor: number; lightTint: number; lightRim: number }) {}

  private batch(key: string, art: WitchArt): SpriteBatch {
    let b = this.batches.get(key);
    // Lit as our witch is (witchLight.ts): by the world's lights, tinted and rimmed by coloured ones, never lost in the dark.
    if (!b) { b = new SpriteBatch(art.atlas, this.mpp, { solid: true, witchLight: this.light }); this.batches.set(key, b); this.scene.add(...b.meshes); }
    return b;
  }

  /** Which frame of a pose: dance moves in whole beats, the rest at the art's own rate. */
  private frameOf(art: WitchArt, pose: string, time: number, bpm: number, phase: number): number {
    const fr = art.poses[pose] ?? art.poses.stand, n = fr.length, fps = art.fps[pose] ?? 3;
    if (DANCE.has(pose)) { const beats = (time * bpm) / 60 + phase, perCycle = Math.max(1, Math.round((n / fps) * (bpm / 60))); return fr[Math.floor(((beats % perCycle) / perCycle) * n) % n]; }
    return fr[Math.floor(time * fps + phase * 7) % n];
  }

  update(g: Game, time: number, visible: (x: number, z: number, w: number, h: number) => boolean): void {
    const per = new Map<string, { art: WitchArt; list: SpriteInstance[] }>(), bpm = g.tuning.beat.bpm, R = SPRITE_UNIFORMS.uRight.value;
    const placed = new Map<number, { x: number; z: number; frame: number; art: WitchArt; flip: boolean }>();
    const put = (key: string, art: WitchArt, inst: SpriteInstance) => { let e = per.get(key); if (!e) per.set(key, (e = { art, list: [] })); e.list.push(inst); };
    const lookOf = (w: PartyWitch) => this.assets.partyWitchArt(w.seed % LOOKS);
    // Leads first, so a partner can line up with her.
    const list = [...g.partyWitches.list].sort((a, b) => Number(b.lead) - Number(a.lead));
    for (const w of list) {
      const art = lookOf(w);
      if (!art) continue;
      const flying = w.state !== "floor" || w.activity === "fly" || w.y > 0.2;
      let fi: number, x = w.x, z = w.z;
      const flip = w.facing < 0;
      if (flying) fi = art.hover[w.away ? "away" : "towards"][Math.floor(time * 4 + w.id) % 3];
      else {
        fi = this.frameOf(art, w.pose, time, bpm, (w.id % 4) * 0.25);
        // A partner lines up with her lead: their meeting anchors on the same pixel.
        const pair = PAIRS[w.pose], lead = w.partner !== null && w.partner >= 0 && !w.lead ? placed.get(w.partner) : undefined;
        if (pair && lead) {
          fi = this.frameOf(art, w.pose, time, bpm, 0); // in step with her
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
      placed.set(w.id, { x, z, frame: fi, art, flip });
      if (!visible(x, z, f.w * this.mpp, f.h * this.mpp)) continue;
      put(`pw-${w.seed % LOOKS}`, art, { x, y: w.y, z, frame: f, flip });
    }
    // Our witch, idling into the party (any input stops it: rules/partyWitches.ts).
    const I = g.partyWitches.players[0], wt = g.witch;
    this.herIdle = false;
    if (I?.activity && I.pose && wt.mode === "ground" && !wt.seated) {
      const art = this.assets.partyWitchArt(null);
      if (art) {
        const fi = this.frameOf(art, I.pose, time, bpm, 0), f = art.atlas.frames[fi];
        put("her", art, { x: wt.x, y: 0, z: wt.z, frame: f, flip: I.facing < 0 });
        this.herIdle = true;
      }
    }
    for (const [k, b] of this.batches) if (!per.has(k)) b.set([]);
    for (const [k, e] of per) this.batch(k, e.art).set(e.list);
  }
}
