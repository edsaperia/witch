// The treehouse's plan as the game reads it (housekeeping, Ed 2026-10-23: one file a room, so pull requests on different rooms stop
// colliding): config/house/base.json and every config/house/rooms/<id>.json, put together by config/house/assemble.js into the shape
// config/house.json had (rules/houseRooms.ts HouseConfig). The tools read the same files from disk (config/house/load.mjs).
// Each room file imported by name, not by Vite's import.meta.glob: the rules are bundled by esbuild too (the bench, the Music Lab, the
// sound tools), which has none. A new room: add its import here and to ROOM_FILES (src/rules/houseConfig.test.ts fails on one missed).
import base from "../../config/house/base.json";
import { assemble } from "../../config/house/assemble.js";
import atrium from "../../config/house/rooms/atrium.json";
import bedroom from "../../config/house/rooms/bedroom.json";
import bedroom2 from "../../config/house/rooms/bedroom2.json";
import bedroom3 from "../../config/house/rooms/bedroom3.json";
import bestiary from "../../config/house/rooms/bestiary.json";
import boudoir from "../../config/house/rooms/boudoir.json";
import crowsNest from "../../config/house/rooms/crowsNest.json";
import drawingRoom from "../../config/house/rooms/drawingRoom.json";
import kitchen from "../../config/house/rooms/kitchen.json";
import parlour from "../../config/house/rooms/parlour.json";
import solarium from "../../config/house/rooms/solarium.json";
import studio from "../../config/house/rooms/studio.json";
import study from "../../config/house/rooms/study.json";
import terrace from "../../config/house/rooms/terrace.json";
import workshop from "../../config/house/rooms/workshop.json";

const ROOM_FILES: unknown[] = [atrium, bedroom, bedroom2, bedroom3, bestiary, boudoir, crowsNest, drawingRoom, kitchen, parlour, solarium, studio, study, terrace, workshop];
/** The house, assembled (rooms, branches, objects and the base's numbers). */
export const HOUSE_CONFIG: unknown = assemble(base, ROOM_FILES as never);
