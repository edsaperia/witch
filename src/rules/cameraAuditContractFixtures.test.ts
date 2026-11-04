// U7 local fixtures execute the same assertions as rules.test.ts without its unrelated full-world fixtures.
import {it} from "vitest";
import {assertFollowingCameraContract,assertGameCameraCoupling,assertIntroCameraContract} from "../test/cameraAuditContracts";
import {smallWorldTuning} from "../test/worlds";
import {newGame} from "./game";
import {TUNING} from "./tuning";

it("keeps seated intro framing, termination and monotonic return",()=>assertIntroCameraContract(TUNING));
it("keeps every overshoot bound, settled tracking and capped look-ahead",()=>assertFollowingCameraContract(TUNING));
it("couples rightward input to actual witch and camera movement in one controlled game step",()=>{
  const t=smallWorldTuning(TUNING,"Single-step camera/input coupling needs one local floor, not distant populations.");
  assertGameCameraCoupling(newGame(5,t));
});
