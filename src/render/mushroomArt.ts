// Shared art choices approved in the mushroom explorer. Physical pixels and glow stay native to the game.
import { bakeMushroom } from '../../art/mushrooms.js';
import type { Style } from './style';
import type { Baked } from './atlas';

export const MUSHROOM_COLOURS: Record<string, string> = {
  blue: '#438bff', purple: '#ae5bff', pink: '#ff74bc', red: '#ff4055', orange: '#ff983b',
  yellow: '#ffe452', green: '#82ee4a', turquoise: '#4be7d3', white: '#fff6da',
};
export const MUSHROOM_ART_RANGES = { height: [.6, 1], pointiness: [.5, .6], width: [.8, 1.6], cap: [.5, .65],
  bend: [-.04, .04], twist: [-.05, .05], lean: [-.1, .1], curl: [0, .3], stem: [.22, .35],
  spotCount: [5, 6], spotRadius: [.09, .1], spotVariation: [.2, .4], bigSpots: [.3, .4] };
export function mushroomArt(style: Style, type: string, seed: number): Baked {
  return bakeMushroom(style, { type, seed, ranges: MUSHROOM_ART_RANGES }) as Baked;
}
