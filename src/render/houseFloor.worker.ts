// The house's floor painted off the page's thread (the boot freeze, 2026-10-25: painted on it, the oak's floor held the page for over
// a minute at the start): a band of its rows (render/houseArt.ts paintFloorRows), its two pictures sent back.
import { HOUSE_ROOMS } from "../rules/houseRooms";
import { paintFloorRows } from "./houseArt";

/** The page's ask: the band of rows j0 to j1 for texels `mpp` metres. */
export type FloorAsk = { mpp: number; j0: number; j1: number };

self.onmessage = (e: MessageEvent<FloorAsk>) => {
  const { mpp, j0, j1 } = e.data, { rest, terrace } = paintFloorRows(HOUSE_ROOMS, mpp, j0, j1);
  (self as unknown as Worker).postMessage({ j0, rest, terrace }, [rest.buffer, terrace.buffer]);
};
