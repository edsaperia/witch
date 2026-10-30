// Coordinator 6520208158 (2026-10-30): broad adult body-mass classes,
// overlapping species share ranks; fantastical placements are design choices.
// These ordinal starter classes are art direction, not measured mass estimates.
export const SIZE_CLASSES = [
  ["woodlouse", "snail", "moth", "dragonfly", "beetle", "scorpion"],
  ["newt", "salamander", "dormouse", "toad", "crab", "spider"],
  ["mole", "stoat", "squirrel", "flyingsquirrel"],
  ["hedgehog", "meerkat", "fennec", "marten", "owl", "raven", "heron", "rattlesnake", "bat"],
  ["cat", "arcticfox", "hare", "armadillo"],
  ["fox", "badger", "otter", "raccoon", "redpanda"],
  ["lynx", "beaver", "roe", "penguin", "snake"],
  ["wolf", "cheetah", "snowleopard", "jaguar", "ibex", "ram", "boar", "komodo"],
  ["tiger", "lion", "stag", "sphinx", "griffin"],
  ["bear", "polarbear", "elk", "crocodile", "unicorn", "featheredserpent"],
  ["rhino", "frosttroll", "hydra", "frostwyrm"],
  ["elephant", "stegosaurus"],
];
export const DESIGN_SIZE_RANKS = new Set(["sphinx", "griffin", "unicorn", "featheredserpent", "frosttroll", "hydra", "frostwyrm", "stegosaurus"]);
export const SIZE_CLASS_BY_ID = Object.fromEntries(SIZE_CLASSES.flatMap((ids,rank)=>ids.map(id=>[id,rank])));
export function sizeMultiplier(id, level) {
  const rank=SIZE_CLASS_BY_ID[id];
  if(rank==null)throw new Error(`No creature size class: ${id}`);
  const r=rank/(SIZE_CLASSES.length-1);
  const baby=r<=.9?.75+.2*r:.93+2.7*(r-.9),adult=1.8+1.2*r;
  return level===0?baby:level===1?1.1+.4*r:level===2?adult:adult*1.75;
}
export function sizeTargetPixels(id,level,witchHeight) {
  const adult=Math.round(witchHeight*sizeMultiplier(id,2));
  return level===3?Math.ceil(adult*1.75):Math.round(witchHeight*sizeMultiplier(id,level));
}
