// The crystal ball in the treehouse's hub (Ed, 2026-10-21: "It shows what item is on the island you're on that night and the
// direction (not distance)"): E at it, and its vision comes up over the game: tonight's trunk's wearable as a silhouette (her
// wearing it, blacked out: ui/stationPanel.ts wearPicture) and an arrow and a compass point the way from the treehouse to the
// trunk (rules/finds.ts wayTo), never how far; with nothing to find tonight, or once she's found it, it says so. It goes again
// as she walks off, or at E again (main.ts).
import type { Style } from "../render/style";
import { itemById, shelfOf } from "../rules/wardrobe";
import { wayTo, type Trunk } from "../rules/finds";
import { wearPicture } from "./stationPanel";

export class CrystalBall {
  private readonly root = document.createElement("div");
  private st: Style;
  /** Whether its vision is up. */
  get open(): boolean { return this.root.classList.contains("on"); }

  constructor(style: Style, pixel = 3) {
    this.st = { ...style, pixel } as Style;
    this.root.id = "crystal-ball";
    installCss();
    document.body.append(this.root);
  }

  /** Its vision of tonight's trunk (null: none tonight), seen from the treehouse at (fromX, fromZ), in her look `g`. */
  show(trunk: Trunk | null, fromX: number, fromZ: number, g: Record<string, unknown>): void {
    const it = trunk?.item ? itemById(trunk.item) : undefined, shelf = it ? shelfOf(it.id) : undefined;
    this.root.replaceChildren();
    const orb = document.createElement("div"); orb.className = "cb-orb";
    const say = document.createElement("p");
    if (!trunk || !it || !shelf) say.textContent = "The ball is clear. Nothing more lies hidden on this island tonight.";
    else if (trunk.found) say.textContent = "The ball is clear. You found tonight's trunk.";
    else {
      const pic = wearPicture(this.st, g, it, shelf.id); pic.className = "cb-item";
      const way = wayTo(fromX, fromZ, trunk.x, trunk.z), arrow = document.createElement("div");
      arrow.className = "cb-arrow"; arrow.textContent = "↑"; arrow.style.transform = `rotate(${way.bearing}rad)`;
      orb.append(pic, arrow);
      say.textContent = `Something to wear lies in an old trunk to the ${way.point}.`;
    }
    const head = document.createElement("h3"); head.textContent = "The crystal ball";
    this.root.append(head, orb, say);
    this.root.classList.add("on");
  }
  hide(): void { this.root.classList.remove("on"); }
}

let cssDone = false;
function installCss(): void {
  if (cssDone) return; cssDone = true;
  const s = document.createElement("style");
  s.textContent = `
#crystal-ball { position: fixed; left: 50%; top: 18%; transform: translateX(-50%); z-index: 18; display: none; width: min(300px, 80vw); padding: 12px 16px 14px; border-radius: 12px; background: var(--panel, rgba(14,11,28,.86)); border: 1px solid rgba(232,180,106,.45); color: var(--ink, #e8e2f4); font: 13px/1.4 ui-monospace, Menlo, Consolas, monospace; text-align: center; pointer-events: none; }
#crystal-ball.on { display: block; }
#crystal-ball h3 { margin: 0 0 8px; color: var(--accent, #e8b46a); font-size: 15px; letter-spacing: 1px; }
#crystal-ball .cb-orb { position: relative; width: 140px; height: 140px; margin: 0 auto 8px; border-radius: 50%; background: radial-gradient(circle at 38% 32%, rgba(220,210,255,.5), rgba(120,90,200,.35) 45%, rgba(30,20,60,.9) 75%); box-shadow: 0 0 24px rgba(160,130,255,.45), inset 0 0 18px rgba(0,0,0,.6); display: grid; place-items: center; }
#crystal-ball .cb-item { height: 84px; width: auto; image-rendering: pixelated; filter: brightness(0) drop-shadow(0 0 6px rgba(200,180,255,.8)); opacity: .85; }
#crystal-ball .cb-arrow { position: absolute; inset: 0; display: grid; place-items: start center; font-size: 22px; color: var(--accent, #e8b46a); text-shadow: 0 0 6px rgba(0,0,0,.8); padding-top: 2px; }
#crystal-ball p { margin: 0; color: var(--dim, #9a93b4); }
`;
  document.head.append(s);
}
