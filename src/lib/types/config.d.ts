//I HATE THIS FILE.

interface BotColors {
	main: number;
	error: number;
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
	version: string;
	colors: BotColors;
	channels: BotChannels;
	cache: BotCache;
}
