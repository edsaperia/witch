import type { Plugin } from "vite";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { loadHouse } from "../config/house/load.mjs";
import { standing, type Upright } from "../src/render/houseArt";

/** Lossless vertical quads: repeated corners and palette colours need not ride in the download. */
export function packStanding(quads: Upright[]) {
  const colours: [number, number, number][] = [];
  const rows = quads.map(({ p, rgb, layer }) => {
    const [[ax, az, low], [bx, bz, lowB], [cx, cz, high], [dx, dz, highD]] = p;
    if (low !== lowB || high !== highD || ax !== dx || az !== dz || bx !== cx || bz !== cz)
      throw new Error("House upright is not a vertical quad");
    let colour = colours.findIndex(c => c.every((v, i) => v === rgb[i]));
    if (colour < 0) { colour = colours.length; colours.push(rgb); }
    return [ax, az, bx, bz, low, high, colour, layer];
  });
  return { colours, rows };
}

export function standingModule(quads: Upright[]): string {
  const { colours, rows } = packStanding(quads);
  return `const colours=${JSON.stringify(colours)};\nexport default ${JSON.stringify(rows)}.map(([ax,az,bx,bz,lo,hi,c,layer])=>({p:[[ax,az,lo],[bx,bz,lo],[bx,bz,hi],[ax,az,hi]],rgb:colours[c],layer}));\n`;
}

/** Shipped geometry only. Furniture switches, hats and world placement remain in the game. */
export function houseStanding(): Plugin {
  const publicId = "virtual:house-standing", id = "\0" + publicId;
  return {
    name: "house-standing",
    resolveId(source) { return source === publicId ? id : null; },
    load(source) {
      if (source !== id) return null;
      for (const file of ["base.json", "assemble.js", "shape.js", "load.mjs"])
        this.addWatchFile(resolve("config/house", file));
      for (const file of readdirSync("config/house/rooms").filter(f => f.endsWith(".json")))
        this.addWatchFile(resolve("config/house/rooms", file));
      this.addWatchFile(resolve("src/render/houseArt.ts"));
      return standingModule(standing(loadHouse()));
    },
  };
}
