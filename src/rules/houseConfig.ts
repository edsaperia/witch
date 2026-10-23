// The treehouse's plan as the game reads it (housekeeping, Ed 2026-10-23: one file a room, so pull requests on different rooms stop
// colliding): config/house/base.json and every config/house/rooms/<id>.json, put together by config/house/assemble.js into the shape
// config/house.json had (rules/houseRooms.ts HouseConfig). The tools read the same files from disk (config/house/load.mjs).
import base from "../../config/house/base.json";
import { assemble } from "../../config/house/assemble.js";

const ROOM_FILES = Object.values(import.meta.glob("../../config/house/rooms/*.json", { eager: true, import: "default" }));
/** The house, assembled (rooms, branches, objects and the base's numbers). */
export const HOUSE_CONFIG: unknown = assemble(base, ROOM_FILES);
