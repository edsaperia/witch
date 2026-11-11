// The creature mesh's page (tools/creature-mesh/make.mjs): builds a plan and hands back its .glb, base64.
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { build } from "./quadruped.js";
import { FOX } from "./fox.js";

const PLANS = Object.fromEntries(Object.entries({ fox: FOX }).flatMap(([id, levels]) => Object.entries(levels).map(([level, make]) => [`${id}-${level}`, make])));
window.creatureMesh = async name => {
  const make = PLANS[name]; if (!make) throw Error(`no plan ${name}: ${Object.keys(PLANS).join(", ")}`);
  const plan = make(), { scene, clips } = build(plan);
  const glb = await new GLTFExporter().parseAsync(scene, { binary: true, animations: clips });
  let s = ""; const bytes = new Uint8Array(glb); for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return { glb: btoa(s), triangles: scene.children[0].geometry.attributes.position.count / 3, bones: plan.bones.length, clips: clips.map(c => c.name) };
};
