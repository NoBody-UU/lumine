import { Client, type CreateApplicationCommandOptions } from "oceanic.js";
import { config } from "#lumine/config/config.js";

import { Handlers } from "./Handlers.js";
import { Database } from "./Database.js";
import { Logger } from "./Logger.js";

import type { BotConfig } from "#lumine/types";
import type { LumineCommand } from "#lumine/builders";

export class Lumine extends Client {
	readonly config: BotConfig;

	public handlers: Handlers;
	public database: Database;
	public logger: Logger;
	public commands: Map<string, LumineCommand>;

	readonly appCommands: {
		global: CreateApplicationCommandOptions[];
		dev: CreateApplicationCommandOptions[];
	};

	constructor() {
		super({
			auth: `Bot ${process.env.TOKEN}`,
			gateway: {
				intents: ["ALL"],
				autoReconnect: true,
			},
			allowedMentions: { everyone: false, roles: false, users: false, repliedUser: false },
		});
		this.config = config;

		this.handlers = new Handlers(this);
		this.database = new Database(this);
		this.logger = new Logger();
		this.commands = new Map();

		this.appCommands = {
			dev: [],
			global: [],
		};

		this.run();
	}

	public async loadHandlers(): Promise<void> {
		await this.handlers.loadCommands();
		await this.handlers.loadEvents();
	}

	public async run(): Promise<"🐔🐧🐐"> {
		await this.loadHandlers();
		await this.connect();
		return "🐔🐧🐐";
	}

	public async deployCommands(): Promise<void> {
		const { dev, global } = this.appCommands;
		const { guildId } = this.config;

		this.logger.warn("Commands ~ Attemping to refresh commands...");

		try {
			await this.application.bulkEditGuildCommands(guildId, dev);
			await this.application.bulkEditGlobalCommands(global);

			this.logger.info("Commands ~ Commands refreshed.")
		} catch (error) {
			this.logger.error(`Commands ~ ${error}`)
		}
	}
}
