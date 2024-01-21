import { LumineEvent } from "#lumine/builders";
import type { Lumine } from "#lumine/client";

export default class ReadyEvent extends LumineEvent<"ready"> {
	constructor() {
		super({ name: "ready", once: true });
	}

	public override async execute(client: Lumine) {
		await client.deployCommands();
		await client.database.connect();
		
		client.logger.info(`Client ~ Logged in as: ${client.user.username}.`);
	}
}
