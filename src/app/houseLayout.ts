/** The published default is Ed's arrangement; only the explicit classic switch selects the old one. */
export const houseLayoutIdentity = (params: URLSearchParams): string => params.get("layout") ?? "ed";
export const usesEdLayout = (params: URLSearchParams): boolean => houseLayoutIdentity(params) !== "classic";
