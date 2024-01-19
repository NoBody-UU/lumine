import { BotConfig } from "#lumine/types";

export const config: BotConfig = {
	prefixes: ["!lumine", "lumine", "l!"],
	guildId: "1075885077529120798",
	channels: {
		errorId: "1181753936454090803",
		logsId: "1181753936454090803",
	},
	colors: {
		error: 0xED4245,
		main: 0xf2dbbe,
	},
	ownerId: [
		"391283181665517568", // JustEvil
		"838338447932391436", // Nobody
		"388415190225518602", // Sagiri
	],
	cache: {
		guilds: 10,
		users: 100,
	},
};