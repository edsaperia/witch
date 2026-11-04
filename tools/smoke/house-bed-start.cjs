// Resolve smoke sleep and overlay interaction points from the game's selected layout and shared geometry, without constructing a game or art.
const fs = require("node:fs"), os = require("node:os"), path = require("node:path");
let api;
function activeHouseStart(url, hub, id, gap) {
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
  const H = api.HOUSE_ROOMS, object = H.objects.find(o => id ? o.id === id : o.use.kind === "bed");
  if (!object) throw Error(`Active layout has no ${id ?? "sleep bed"}`);
  const point = api.objectFrontAt(object, hub, gap);
  if (![point.x, point.z].every(Number.isFinite) || api.objectAt(hub, point.x, point.z) !== object) throw Error(`Active house fixture does not select ${object.id}`);
  return { ...point, id: object.id, room: object.room, layout: H.layout?.id ?? "classic" };
}
const activeBedStart = (url, hub) => activeHouseStart(url, hub, undefined, 0.4);
const activeObjectStart = (url, hub, id, gap = 0.7) => activeHouseStart(url, hub, id, gap);
module.exports = { activeBedStart, activeObjectStart };
