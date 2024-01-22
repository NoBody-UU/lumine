//I HATE THIS FILE.
import type { ColorResolvable } from "#lumine/types";
import type { NodeOption } from "shoukaku";

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
	version: string;
	colors: BotColors;
	channels: BotChannels;
	cache: BotCache;
}
