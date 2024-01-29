import { Client, type ComponentTypes, type SelectMenuTypes } from "oceanic.js";

import { config } from "#lumine/config/config.js";

import { Handlers } from "./Handlers.js";
import { Database } from "./Database.js";
import { Logger } from "./Logger.js";

import type { BotConfig } from "#lumine/types";
import type { LumineCommand, LumineComponent } from "#lumine/builders";

export class Lumine extends Client {
	readonly config: BotConfig;

	public handlers: Handlers;
	public database: Database;
	public logger: Logger;
	public commands: Map<string, LumineCommand>;
	public components: {
		buttons: Map<string, LumineComponent<ComponentTypes.BUTTON>>;
		modals: Map<string, LumineComponent<ComponentTypes.TEXT_INPUT>>;
		menus: Map<string, LumineComponent<SelectMenuTypes>>;
	};

	readonly arrays: {
		global: any[];
		guilds: any[];
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

		this.components = {
			buttons: new Map(),
			menus: new Map(),
			modals: new Map(),
		};

		this.arrays = {
			guilds: [],
			global: [],
		};

		this.run();
	}

	public async loadHandlers(): Promise<void> {
		await this.handlers.loadCommands();
		await this.handlers.loadEvents();
		await this.handlers.loadComponents();
	}

	public async run(): Promise<"🐔🐧🐐"> {
		await this.loadHandlers();
		await this.connect();
		return "🐔🐧🐐";
	}

	public async deployCommands(): Promise<void> {
		const { guilds, global } = this.arrays;
		const { guildId } = this.config;

		this.logger.warn("Commands ~ Attemping to refresh commands...");

		try {
			await this.application.bulkEditGuildCommands(guildId, guilds);
			await this.application.bulkEditGlobalCommands(global);

			this.logger.info("Commands ~ Commands refreshed.");
		} catch (error) {
			this.logger.error(`Commands ~ ${error}`);
		}
	}
}
