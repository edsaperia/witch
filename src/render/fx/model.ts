import elements from "../../../config/fx/elements.json";
import forms from "../../../config/fx/forms.json";
import settings from "../../../config/fx/intensity.json";
export { elements, forms, settings };
export type FxElement = keyof typeof elements;
export type FxForm = keyof typeof forms;
export const IMPRINTS = ["frost", "scorch", "wet", "bloom", "charge", "push"] as const;
export type Imprint = typeof IMPRINTS[number];
export const ELEMENT_KEYS = Object.keys(elements) as FxElement[];
export const FORM_KEYS = Object.keys(forms) as FxForm[];
export const intensityOf = (level: number): number => settings.levels[Math.max(0, Math.min(3, Math.round(level)))] ?? 0.65;
export const mixIntensity = (range: readonly number[], intensity: number): number => range[0]+(range[1]-range[0])*Math.max(0,Math.min(1,intensity));
export function fxElement(name: string): FxElement { return Object.hasOwn(elements,name) ? name as FxElement : "moonlight"; }
export function lightScore(x: number, z: number, strength: number, cx: number, cz: number): number {
  return Math.max(0,strength)/(1+Math.hypot(x-cx,z-cz)/12);
}
/** A toroidal world field, 8 channels per cell. No texture reads, allocations or growing history per stamp.
 * Coordinates are absolute cell indices: moving the window clears only cells that have left it. */
export class ImprintField {
  readonly data: Uint8Array;
  readonly values: Float32Array;
  x = 0; z = 0;
  readonly cell: number;
  private ready = false;
  constructor(readonly size = settings.fieldSize, readonly metres = settings.fieldMetres) {
    this.data = new Uint8Array(size*size*8); this.values=new Float32Array(this.data.length);this.cell=metres/size;
  }
  private index(x: number,z: number): number { return (((z%this.size+this.size)%this.size)*this.size+(x%this.size+this.size)%this.size)*8; }
  move(x: number,z: number): void {
    const nx=Math.floor(x/this.cell)-this.size/2,nz=Math.floor(z/this.cell)-this.size/2;
    if(this.ready && nx===this.x && nz===this.z)return;
    for(let iz=nz;iz<nz+this.size;iz++)for(let ix=nx;ix<nx+this.size;ix++) {
      if(!this.ready || ix<this.x || ix>=this.x+this.size || iz<this.z || iz>=this.z+this.size) {
        const i=this.index(ix,iz);this.values.fill(0,i,i+8);this.data.fill(0,i,i+8);
      }
    }
    this.x=nx;this.z=nz;this.ready=true;
  }
  decay(dt: number): void {
    const amount=Math.max(0,dt)*255/settings.imprintSeconds;
    if(!amount)return;
    for(let i=0;i<this.values.length;i++)this.values[i]=Math.max(0,this.values[i]-amount);
  }
  stamp(x: number,z: number,radius: number,kind: Imprint,strength: number): void {
    const channel=IMPRINTS.indexOf(kind);if(channel<0 || !(radius>0) || !this.ready)return;
    const loX=Math.max(this.x,Math.floor((x-radius)/this.cell)),hiX=Math.min(this.x+this.size-1,Math.floor((x+radius)/this.cell));
    const loZ=Math.max(this.z,Math.floor((z-radius)/this.cell)),hiZ=Math.min(this.z+this.size-1,Math.floor((z+radius)/this.cell));
    for(let iz=loZ;iz<=hiZ;iz++)for(let ix=loX;ix<=hiX;ix++) {
      const d=Math.hypot((ix+0.5)*this.cell-x,(iz+0.5)*this.cell-z),a=Math.max(0,1-d/radius)*Math.min(1,Math.max(0,strength))*255;
      const i=this.index(ix,iz)+channel;this.values[i]=Math.max(this.values[i],a);
    }
  }
  publish(): void { for(let i=0;i<this.data.length;i++)this.data[i]=Math.round(this.values[i]); }
  at(x: number,z: number,kind: Imprint): number {
    const ix=Math.floor(x/this.cell),iz=Math.floor(z/this.cell);
    return ix<this.x || ix>=this.x+this.size || iz<this.z || iz>=this.z+this.size ? 0 : this.values[this.index(ix,iz)+IMPRINTS.indexOf(kind)]/255;
  }
  reset(): void {this.values.fill(0);this.data.fill(0);this.ready=false;}
}
