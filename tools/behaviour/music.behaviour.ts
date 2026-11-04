// Informational M4 surveys: original sample sizes, cadence and historical references, never outcome assertions.
import fs from "node:fs";
import path from "node:path";
import { it } from "vitest";
import styleJson from "../../config/music-style.json";
import { formPhrase, type MusicStyle } from "../../src/rules/musicScore";
import { sampleSeaLife } from "../../src/test/seaLifeCues";
import { metric } from "./results.mjs";

it("reports music cue occurrence and generated melody pace (M4)", () => {
  const east = sampleSeaLife("east", 60), west = sampleSeaLife("west", 600);
  let notes = 0, whole = 0, triplet = 0, short = 0, phrases = 0;
  for (let seed = 0; seed < 60; seed++) for (const letter of "ABC") {
    phrases++;
    for (const n of formPhrase(styleJson as unknown as MusicStyle, seed, letter)) if (n) {
      notes++;
      if (n.dur >= 12) whole++;
      if (n.dur % 1) triplet++;
      if (n.dur <= 2) short++;
    }
  }
  const metrics = [
    metric("east dolphin splashes / 60 s", east.splash, "cues", {operator: ">=", value: 3}),
    metric("west kraken groans / 600 s", west.groan, "cues", {operator: ">=", value: 1}),
    metric("west water pours / 600 s", west.pour, "cues", {operator: ">=", value: west.groan}),
    metric("melody pace", notes / (phrases * 8), "notes/bar", {operator: "<", value: 3.5}),
    metric("whole notes", whole / phrases, "notes/phrase", {operator: ">", value: 1}),
    metric("triplets", triplet / notes, "share", {operator: ">", value: 0.15}),
    metric("short notes", short, "notes", {operator: ">", value: 0})
  ];
  const out = process.env.BEHAVIOUR_OUTPUT_DIR;
  if (!out) throw Error("Run via node tools/behaviour/run.mjs to preserve report artifacts");
  fs.writeFileSync(path.join(out, "music.json"), JSON.stringify({system:"music",sample:{gameSeed:123,eastSeconds:60,westSeconds:600,stepSeconds:0.1,melodySeeds:60,letters:"ABC",phrases,notes},metrics,counts:{east,west,whole,triplet,short}},null,2)+"\n");
});
