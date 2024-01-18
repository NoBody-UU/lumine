import "dotenv/config";

import { Client } from "oceanic.js";
import { Handlers } from "./Handlers.js";

export class Lumine extends Client {
	public handlers: Handlers;

	constructor() {
		super({
			auth: `Bot ${process.env.TOKEN}`,
			gateway: {
				intents: ["ALL"],
			},
		});

		this.handlers = new Handlers(this);

		this.run();
	}

	public async loadHandlers(): Promise<void> {
		await this.handlers.loadEvents();
	}

	public async run(): Promise<"🐔🐧🐐"> {
		await this.loadHandlers();
		await this.connect();
		return "🐔🐧🐐";
	}
}
