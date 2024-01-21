//I HATE THIS FILE.
import type { ColorResolvable } from "#lumine/types";

interface BotColors {
	main: ColorResolvable;
	error: ColorResolvable;
}

interface BotChannels {
	logsId: string;
	errorId: string;
}

interface BotCache {
	users: number;
	guilds: number;
}

export interface BotConfig {
	ownerId: string[];
	guildId: string;
	prefixes: string[];
	colors: BotColors;
	channels: BotChannels;
	cache: BotCache;
}
