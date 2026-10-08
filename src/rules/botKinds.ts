// The bots' names (rules/bot.ts), apart from the bots themselves: the game's start needs only these (the dev Player pick, ?bot=),
// so the bots' code loads only for a bot game.
export type BotKind = "skilled" | "champion" | "crude" | "novice" | "idle" | "hover";
export const BOT_KINDS: readonly BotKind[] = ["skilled", "champion", "crude", "novice", "idle", "hover"];
