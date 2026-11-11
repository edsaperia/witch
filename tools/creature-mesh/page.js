// The creature mesh's page (tools/creature-mesh/make.mjs): builds a plan and hands back its .glb, base64.
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { build } from "./quadruped.js";
import { FOX } from "./fox.js";
import { MARTEN_PLANS, STOAT_PLANS } from "./mustelids.js";
import { DORMOUSE_PLANS, HARE_PLANS, SQUIRREL_PLANS } from "./rodents.js";
import { BADGER_PLANS, HEDGEHOG_PLANS, MOLE_PLANS } from "./diggers.js";
import { SNAIL_PLANS } from "./snail.js";
import { TURTLE_PLANS } from "./turtle.js";
import { BEE_PLANS } from "./bee.js";

const PLANS = Object.fromEntries(Object.entries({ fox: FOX, stoat: STOAT_PLANS, marten: MARTEN_PLANS, hare: HARE_PLANS, squirrel: SQUIRREL_PLANS, dormouse: DORMOUSE_PLANS, badger: BADGER_PLANS, mole: MOLE_PLANS, hedgehog: HEDGEHOG_PLANS, snail: SNAIL_PLANS, turtle: TURTLE_PLANS, bee: BEE_PLANS }).flatMap(([id, levels]) => Object.entries(levels).map(([level, make]) => [`${id}-${level}`, make])));
window.creatureMesh = async name => {
  const make = PLANS[name]; if (!make) throw Error(`no plan ${name}: ${Object.keys(PLANS).join(", ")}`);
  const plan = make(), { scene, clips } = build(plan);
  const glb = await new GLTFExporter().parseAsync(scene, { binary: true, animations: clips });
  let s = ""; const bytes = new Uint8Array(glb); for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return { glb: btoa(s), triangles: scene.children[0].geometry.attributes.position.count / 3, bones: plan.bones.length, clips: clips.map(c => c.name) };
};
