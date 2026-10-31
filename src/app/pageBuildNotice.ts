// A4 mechanical extraction from src/main.ts; body identity is checked by tools/refactor/a4-split.mjs.
import type { PageHost } from "../main";


export function installBuildNotice1(pageHost: PageHost): void {
document.addEventListener("visibilitychange", () => { if (document.hidden) pageHost.N().flags.last = 0; });
}
