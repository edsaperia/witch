import {expect,it} from "vitest";
import {DEFAULT_ROSTER_IDS,selectedCreatureGenome} from "../art/genome/selection.js";
import {GENOME_BY_ID,genomeHash} from "../art/genome/index.js";
import {speciesFor} from "../art/creatures.js";
import {defaultStyle} from "../art/generator.js";
it("enables exactly Ed's twenty kept redesigns, with immutable Current fallback",()=>{
  expect(DEFAULT_ROSTER_IDS.slice().sort()).toEqual(["fennec","dragonfly","wolf","dormouse","bat","woodlouse","frosttroll","hydra","crocodile","crab","meerkat","flyingsquirrel","marten","raccoon","badger","stoat","otter","jaguar","bear","arcticfox"].sort());
  const before=JSON.stringify(GENOME_BY_ID);
  for(const [id,g]of Object.entries(GENOME_BY_ID)){
    expect(selectedCreatureGenome(g)!==g,id).toBe(DEFAULT_ROSTER_IDS.includes(id));
    expect(selectedCreatureGenome(g,{creatureModels:`${id}:current`},3)).toBe(g);
  }
  for(const id of ["snowleopard","beetle","lion","raven","frostwyrm","polarbear","unicorn","mole"])expect(selectedCreatureGenome(GENOME_BY_ID[id])).toBe(GENOME_BY_ID[id]);
  expect(JSON.stringify(GENOME_BY_ID)).toBe(before);
});
it("keeps redesigned and explicit Current species/cache identities separate",()=>{
  const current={...defaultStyle(),creatureModels:"fennec:current"};
  const key=genomeHash(GENOME_BY_ID.fennec,current,2),live=speciesFor("fennec",defaultStyle(),2),fallback=speciesFor("fennec",current,2);
  expect(fallback).toHaveProperty("genomeKey",key);expect(live).not.toHaveProperty("genomeKey",key);
});
