// Resolve the smoke's sleep interaction from the game's selected layout and shared bed geometry, without constructing a game or art.
const fs = require("node:fs"), os = require("node:os"), path = require("node:path");
let api;
function activeBedStart(url, hub) {
  if (!api) {
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), "witch-smoke-bed-"));
    const file = path.join(temp, "bed.cjs");
    try {
      require("esbuild").buildSync({
        stdin: { contents: 'export { HOUSE_ROOMS, installEdLayout, objectFrontAt, objectAt } from "./src/rules/houseRooms.ts"; export { usesEdLayout } from "./src/app/houseLayout.ts";', resolveDir: path.resolve(__dirname, "../.."), loader: "ts" },
        bundle: true, platform: "node", format: "cjs", outfile: file, logLevel: "warning"
      });
      api = require(file);
      delete require.cache[require.resolve(file)];
    } finally { fs.rmSync(temp, { recursive: true, force: true }); }
  }
  api.installEdLayout(api.usesEdLayout(new URL(url).searchParams));
  const H = api.HOUSE_ROOMS, bed = H.objects.find(o => o.use.kind === "bed");
  if (!bed) throw Error("Active layout has no sleep bed");
  const point = api.objectFrontAt(bed, hub, 0.4);
  if (![point.x, point.z].every(Number.isFinite) || api.objectAt(hub, point.x, point.z) !== bed) throw Error("Active bed fixture does not select the actual sleep bed");
  return { ...point, id: bed.id, room: bed.room, layout: H.layout?.id ?? "classic" };
}
module.exports = { activeBedStart };
