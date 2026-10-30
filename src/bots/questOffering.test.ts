import { expect, test } from "vitest";
import { newQuestOffering } from "./questOffering";
const tiger=(id:number)=>({id,species:"tiger",level:id%2});
test("either of two matching requested sigils can be put down, independent of age or ID",()=>{
  const choose=newQuestOffering();
  expect(choose.choose("tiger",[tiger(338),tiger(340)])).toBe("place");
  expect(choose.choose("tiger",[tiger(340),tiger(338)])).toBe("place");
});
test("one cycle pulse waits for the delayed stack acknowledgement before placement",()=>{
  const choose=newQuestOffering(),fox={id:1,species:"fox",level:1};
  const before=[tiger(338),fox];
  expect(choose.choose("tiger",before)).toBe("cycle");
  for(let i=0;i<8;i++)expect(choose.choose("tiger",structuredClone(before))).toBe("wait");
  expect(choose.choose("tiger",[fox,tiger(338)])).toBe("place");
  expect(before).toEqual([tiger(338),fox]);
});
test("a longer mixed stack cycles once per acknowledged rotation, never against stale input",()=>{
  const choose=newQuestOffering(),fox={id:1,species:"fox",level:1},hare={id:2,species:"hare",level:1};
  expect(choose.choose("tiger",[tiger(338),fox,hare])).toBe("cycle");
  expect(choose.choose("tiger",[tiger(338),fox,hare])).toBe("wait");
  expect(choose.choose("tiger",[hare,tiger(338),fox])).toBe("cycle");
  expect(choose.choose("tiger",[hare,tiger(338),fox])).toBe("wait");
  expect(choose.choose("tiger",[fox,hare,tiger(338)])).toBe("place");
});
test("missing requested species does not cycle, and a detached diagnostic cannot acknowledge it",()=>{
  const choose=newQuestOffering(),fox={id:1,species:"fox",level:1};
  expect(choose.choose("tiger",[fox])).toBe("wait");
  expect(choose.choose("tiger",[tiger(338),fox])).toBe("cycle");
  const output=choose.snapshot();output.pending=null;
  expect(choose.choose("tiger",[tiger(338),fox])).toBe("wait");
  // A newly selected request whose species is already at the observed bottom
  // needs no cycling, even if the previous request had an outstanding pulse.
  expect(choose.choose("fox",[tiger(338),fox])).toBe("place");
});
