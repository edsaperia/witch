// IP2 direct NPC contracts use supplied states, not long-run activity occurrence or a generated game.
import {describe,expect,it} from "vitest";
import {newPartyWitches,stepPartyWitches,type Activity} from "./partyWitches";
import {TUNING} from "./tuning";
const floor={x:100,z:200,radius:15};
const fixture=(n:number)=>{
  const s=newPartyWitches(3),areas=Array.from({length:n},(_,i)=>({key:`a${i}`,x:floor.x+150,z:floor.z+i}));
  stepPartyWitches(s,areas,floor,[],0,0.05,TUNING);
  s.list.forEach((w,i)=>Object.assign(w,{state:"floor",x:floor.x+20+i,z:floor.z,y:0,tx:floor.x+20+i,tz:floor.z,until:1000,since:0,activity:"dance",pose:"twoStep",partner:null,lead:false}));
  return {s,areas};
};
describe("IP2 direct party contracts",()=>{
  it("retains reciprocal supplied pairs within roam and off the floor",()=>{
    const {s,areas}=fixture(2),[a,b]=s.list;
    Object.assign(a,{activity:"pair",pose:"holdHands",partner:b.id,lead:true});
    Object.assign(b,{activity:"pair",pose:"holdHands",partner:a.id,lead:false});
    stepPartyWitches(s,areas,floor,[],1,0.05,TUNING);
    expect(a.partner).toBe(b.id);expect(b.partner).toBe(a.id);
    for(const w of [a,b]){const d=Math.hypot(w.x-floor.x,w.z-floor.z);expect(d).toBeLessThanOrEqual(TUNING.partyWitches.roam+1e-6);expect(d).toBeGreaterThanOrEqual(floor.radius-1e-6);}
  });
  it("keeps a supplied third limbo dancer attached to its actual holder",()=>{
    const {s,areas}=fixture(3),[holder,helper,third]=s.list;
    Object.assign(holder,{activity:"pair",pose:"limboHold",partner:helper.id,lead:true});
    Object.assign(helper,{activity:"pair",pose:"limboHelp",partner:holder.id,lead:false});
    Object.assign(third,{activity:"pair",pose:"limbo",partner:holder.id,third:true});
    stepPartyWitches(s,areas,floor,[],1,0.05,TUNING);
    expect(holder.partner).toBe(helper.id);expect(helper.partner).toBe(holder.id);
    expect(third.third).toBe(true);expect(third.partner).toBe(holder.id);expect(holder.pose).toBe("limboHold");
  });
  it("moves every supplied off-floor activity out of the dancefloor",()=>{
    for(const activity of ["drink","rest","chat"] as Activity[]){
      const {s,areas}=fixture(1),w=s.list[0];
      Object.assign(w,{activity,x:floor.x+1,z:floor.z,tx:floor.x+1,tz:floor.z});
      stepPartyWitches(s,areas,floor,[],1,0.05,TUNING);
      expect(w.activity).toBe(activity);expect(Math.hypot(w.x-floor.x,w.z-floor.z)).toBeGreaterThanOrEqual(floor.radius-1e-6);
    }
  });
});
