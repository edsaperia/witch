import {it,expect} from 'vitest';
import {maskCoverage} from './mask-coverage.mjs';
it('retains the actual nine-pixel failure while explicitly refusing an opacity inference',()=>{
 const image=(rgba:number[])=>({width:3,height:3,data:Buffer.from(Array.from({length:9},()=>rgba).flat())});
 const report=maskCoverage(image([215,170,115,255]),image([222,181,123,255]),image([240,193,129,255]),{points:[{x:1,y:1}]});
 expect(report.threshold).toBe(24);expect(report.changedPixels).toBe(9);expect(report.maxChange).toBe(11);
 expect(report.contrastHistogram[25]).toBe(9);expect(report.opacityProven).toBe(false);expect(report.samples[0].included).toBe(true);
 // Raising a threshold could hide the failure; it is not a repair or accepted measurement.
 expect(maskCoverage(image([215,170,115,255]),image([222,181,123,255]),image([240,193,129,255]),{threshold:32}).maskPixels).toBe(0);
});
