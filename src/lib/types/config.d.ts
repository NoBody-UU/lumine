//I HATE THIS FILE.

interface BotColors {
	main: number | string;
	error: number | string;
}

interface BotChannels {
	logsId: string;
	errorId: string;
}

export interface BotConfig {
	ownerId: string[];
	prefixes: string[];
	colors: BotColors;
	channels: BotChannels;
}
