// The treehouse deck's placeholder (rules/treehouse.ts; Ed, 2026-10-11: "a circle with a wooden floor and a balustrade sitting on
// the ent"): plain meshes standing in until the Ent's art (art builder Bravo's, art/treehouse.js) is baked: a trunk, the round deck
// at its height, a balustrade of posts and a rail, the map table in its middle (its top the sea's blue) and the curved decks table
// along its south edge with two turntables. Flat colours, no bend: only for playing it now.
import * as THREE from "three";
import type { Deck } from "../rules/treehouse";
import { groundHeight } from "./height";

const WOOD = 0xc08a54, WOOD_DARK = 0x8a5d36, BARK = 0x6e5638, SEA = 0x3d8fbf, DECKS = 0x5a5266, PLATTER = 0x22222a, LED = 0xff4fd0; // (bright: the night grade darkens them)

export class TreehouseDeck {
  readonly group = new THREE.Group();
  private readonly deck: Deck;

  constructor(deck: Deck) {
    this.deck = deck;
    const d = deck, g = this.group, mat = (c: number) => new THREE.MeshBasicMaterial({ color: c });
    const add = (geo: THREE.BufferGeometry, c: number, x = 0, y = 0, z = 0) => { const m = new THREE.Mesh(geo, mat(c)); m.position.set(x, y, z); g.add(m); return m; };
    add(new THREE.CylinderGeometry(2.2, 3.4, d.h, 12), BARK, 0, d.h / 2, 0); // the trunk (the Ent's, to come)
    add(new THREE.CylinderGeometry(d.r, d.r * 0.92, 0.5, 48), WOOD, 0, d.h - 0.25, 0); // the deck
    const posts = 36, rr = d.r - 0.2;
    for (let i = 0; i < posts; i++) { const a = (i / posts) * Math.PI * 2; add(new THREE.BoxGeometry(0.14, 1.0, 0.14), WOOD_DARK, Math.cos(a) * rr, d.h + 0.5, Math.sin(a) * rr); }
    add(new THREE.TorusGeometry(rr, 0.07, 6, 72), WOOD_DARK, 0, d.h + 1.0, 0).rotation.x = Math.PI / 2; // the rail
    add(new THREE.CylinderGeometry(d.table.r, d.table.r * 0.7, 0.9, 32), WOOD_DARK, 0, d.h + 0.45, 0); // the map table
    add(new THREE.CylinderGeometry(d.table.r * 0.92, d.table.r * 0.92, 0.04, 32), SEA, 0, d.h + 0.92, 0); // its top, the sea (the chart to come)
    // the decks' table: a ring sector along the south arc (90 degrees round: +z, toward the camera)
    const { inner, outer, from, to } = d.decks, DEG = Math.PI / 180, shape = new THREE.Shape();
    const pt = (r: number, a: number) => [r * Math.cos(a * DEG), -r * Math.sin(a * DEG)] as const; // (the shape's y is the world's -z)
    shape.moveTo(...pt(inner, from));
    for (let a = from; a <= to; a += 5) shape.lineTo(...pt(outer, a));
    for (let a = to; a >= from; a -= 5) shape.lineTo(...pt(inner, a));
    const table = add(new THREE.ExtrudeGeometry(shape, { depth: 1.0, bevelEnabled: false }), DECKS, 0, d.h, 0);
    table.rotation.x = -Math.PI / 2;
    const mid = (inner + outer) / 2;
    for (const a of [80, 100]) add(new THREE.CylinderGeometry(0.35, 0.35, 0.06, 20), PLATTER, Math.cos(a * DEG) * mid, d.h + 1.03, Math.sin(a * DEG) * mid);
    const led = add(new THREE.TorusGeometry(outer, 0.05, 4, 48, (to - from) * DEG), LED, 0, d.h + 0.5, 0); // the decks' LED front
    led.rotation.x = Math.PI / 2; led.rotation.z = from * DEG;
    g.position.set(d.x, 0, d.z);
  }

  /** Stand it on the ground at its spot (the heights load after the map). */
  update(): void { this.group.position.y = groundHeight(this.deck.x, this.deck.z); }
}
