// The treehouse's plan as the game reads it (housekeeping, Ed 2026-10-23: one file a room, so pull requests on different rooms stop
// colliding): config/house/base.json and every config/house/rooms/<id>.json, put together by config/house/assemble.js (rules/houseRooms.ts HouseConfig:
// the rooms, the branches, the objects and the floor's one shape, config/house/shape.js). The tools read the same files from disk (config/house/load.mjs).
// Each room file imported by name, not by Vite's import.meta.glob: the rules are bundled by esbuild too (the bench, the Music Lab, the
// sound tools), which has none. A new room: add its import here and to ROOM_FILES (src/rules/houseConfig.test.ts fails on one missed).
import base from "../../config/house/base.json";
import { assemble } from "../../config/house/assemble.js";
import bedroom from "../../config/house/rooms/bedroom.json";
import bedroom2 from "../../config/house/rooms/bedroom2.json";
import bedroom3 from "../../config/house/rooms/bedroom3.json";
import bestiary from "../../config/house/rooms/bestiary.json";
import boudoir from "../../config/house/rooms/boudoir.json";
import cloakroom from "../../config/house/rooms/cloakroom.json";
import dining from "../../config/house/rooms/dining.json";
import kitchen from "../../config/house/rooms/kitchen.json";
import parlour from "../../config/house/rooms/parlour.json";
import solarium from "../../config/house/rooms/solarium.json";
import studio from "../../config/house/rooms/studio.json";
import terrace from "../../config/house/rooms/terrace.json";
import turret from "../../config/house/rooms/turret.json";
import workshop from "../../config/house/rooms/workshop.json";

const ROOM_FILES: unknown[] = [bedroom, bedroom2, bedroom3, bestiary, boudoir, cloakroom, dining, kitchen, parlour, solarium, studio, terrace, turret, workshop];
/** The house, assembled (rooms, branches, objects and the base's numbers). */
export const HOUSE_CONFIG: unknown = assemble(base, ROOM_FILES as never);
