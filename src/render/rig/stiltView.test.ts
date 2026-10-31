import { expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { RigView, type RigLook } from './rigView';
import type { AssetLibrary } from '../assets';
import type { Creature } from '../../rules/creatures';

it('requests isolated stilt parts for tiny and treetop animals, then restores ordinary rig selection', () => {
  const rigArt = vi.fn(() => undefined), view = new RigView(new THREE.Scene(), {rigArt} as unknown as AssetLibrary, .1);
  const animal = {id:1,species:'sparrow',level:0} as Creature;
  const gear = {hat:2};
  const ordinary: RigLook = {y:0,scale:1,glow:0,fresh:false,h:10,gear};
  view.begin(1,undefined,false);
  view.add(animal,ordinary); expect(rigArt).not.toHaveBeenCalled();
  view.add(animal,{...ordinary,stiltLength:6,stiltTip:.08,stiltStrength:1});
  expect(rigArt).toHaveBeenLastCalledWith('sparrow',0,{hat:2,stilt:true});
  expect(gear).toEqual({hat:2});
  const requested = rigArt.mock.calls.length;
  view.add(animal,{...ordinary,stiltLength:1,stiltTip:1,stiltStrength:0});
  expect(rigArt).toHaveBeenCalledTimes(requested);
  view.stiltRises.set(1,12); view.reset(); expect(view.stiltRises.size).toBe(0);
});
