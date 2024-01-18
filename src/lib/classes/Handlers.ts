import { pathToFileURL } from "node:url";
import type { EventBuilder } from "#lumine/builders";
import { searchFilesRecursive } from "taskwizard";
import type { Lumine } from "#lumine/client";
import type { ClientEvents } from "oceanic.js";

export class Handlers {
	private client: Lumine;

	constructor(client: Lumine) {
		this.client = client;
	}

	private async import(file: string): Promise<any> {
		return (await import(`${pathToFileURL(file)}?update=${Date.now()}`)).default;
	}

	public async loadEvents(): Promise<void> {
		const { client } = this;

		const files: string[] = await searchFilesRecursive("./build/events");

		for await (const file of files) {
			const event: EventBuilder<keyof ClientEvents> = await this.import(file);

			if (!event.execute) throw new Error(`Event ${event.name} doesn't have an execute function.`);

			const execute = (...args: []) => event.execute(client, ...args);

			if (event.once) client.once(event.name, execute);
			else client.on(event.name, execute);
		}
	}
}
