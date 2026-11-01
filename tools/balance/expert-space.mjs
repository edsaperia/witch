// Bounds cover existing skilled choices; perception/human floors are not searched.
export const POLICY_SPACE = [
  ["mobileYouths", 1, 6, true], ["feedRange", 20, 160], ["adultPostRange", 60, 240],
  ["speciesPenalty", 0, 500], ["flaskGroup", 2, 8, true],
  ["healAt", 1, 3, true], ["healTo", 2, 5, true], ["kite", 4, 20], ["dashAt", 2, 10],
  ["fireFrac", 0.6, 1], ["closeFrac", 0.4, 0.95], ["stick", 0, 500], ["ahead", 0, 800],
  ["homeRange", 40, 200], ["follow", 2, 20, true], ["homeStand", 8, 40],
  ["castMoveFrac", 0.2, 0.9], ["pickRadiusFrac", 0.3, 0.9], ["retargetSeconds", 0.5, 6],
  ["questRange", 150, 900], ["questBias", 0, 800],
  ["questMax", 0, 6, true],
];
export const INITIAL_POLICY = { mobileYouths: 3, feedRange: 80, adultPostRange: 140, speciesPenalty: 250, flaskGroup: 3, healAt: 1, healTo: 3, kite: 9, dashAt: 5, fireFrac: 0.95, closeFrac: 0.8, stick: 250, ahead: 400, homeRange: 120, follow: 10, homeStand: 22, castMoveFrac: 0.5, pickRadiusFrac: 0.6, retargetSeconds: 3, questRange: 700, questBias: 400, questMax: 1 };
export const CAMPAIGN_NAMES = ["mobileYouths", "feedRange", "adultPostRange", "speciesPenalty", "flaskGroup"];
export const policySpace = (deferQuests = false, campaignOnly = false) => POLICY_SPACE.filter(([name]) => (!deferQuests || !name.startsWith("quest")) && (!campaignOnly || CAMPAIGN_NAMES.includes(name)));
export function equipmentSpace(catalogue) {
  return Object.entries(catalogue).map(([name, values]) => {
    if (!Array.isArray(values) || values.length < 2) throw Error(`Insufficient equipment choices: ${name}`);
    return [name, 0, values.length - 1, true];
  });
}
export function policyOf(point) { return Object.fromEntries(POLICY_SPACE.map(([k]) => [k, point[k]])); }
export function equipmentOf(point, catalogue) {
  const selected = Object.fromEntries(Object.entries(catalogue).map(([k, values]) => {
    const i = point[k]; if (!Number.isInteger(i) || i < 0 || i >= values.length) throw Error(`Invalid equipment index ${k}`);
    return [k, values[i]];
  }));
  return { bag: selected.bag, hat: selected.hat, wearsHat: selected.hat !== "none", parts: [selected.tip, selected.chassis, selected.exhaust].filter(Boolean) };
}
export function trainingCases(seeds, equipment) {
  return seeds.flatMap(seed => [100, 200].flatMap(bpm => [
    ...["home", "tiger", "komodo"].map(island => ({ worldSeed: 0, seed, bpm, island, condition: "matched", bag: "satchel", hat: "none", wearsHat: false, parts: [] })),
    { worldSeed: 0, seed, bpm, island: "home", condition: "home-everything", ...equipment },
  ]));
}
