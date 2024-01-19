import { pathToFileURL } from "node:url";
import { searchFilesRecursive } from "taskwizard";
import { type ClientEvents, ApplicationCommandTypes } from "oceanic.js";
import { AsciiTable3 } from "ascii-table3";

import type { LumineEvent, LumineCommand } from "#lumine/builders";
import type { Lumine } from "#lumine/client";

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
		const table = new AsciiTable3("Events");

		for await (const file of files) {
			const BaseEvent = await this.import(file);
			const event: LumineEvent<keyof ClientEvents> = new BaseEvent();

			const execute = (...args: []) => event.execute(client, ...args);

			if (event.once) client.once(event.name, execute);
			else client.on(event.name, execute);

			table.addRow(event.name, "Loaded");
		}

		console.log(table.toString());
	}

	public async loadCommands(): Promise<void> {
		const { client } = this;

		const files: string[] = await searchFilesRecursive("./build/commands");
		const table = new AsciiTable3("Commands");

		for await (const file of files) {
			const BaseCommand = await this.import(file);
			const command: LumineCommand = new BaseCommand();

			if (!command.data.name) throw new Error("A command doesn't have a name.");
			if (command.data.type !== ApplicationCommandTypes.CHAT_INPUT) throw new Error(`Command: "${command.data.name}" have a invalid command type.`);
			if (!command.data.description) throw new Error(`Command: "${command.data.name}" doesn't have a description.`);

			if (command.toGuild) client.appCommands.dev.push(command.data);
			else client.appCommands.global.push(command.data);

			client.commands.set(command.data.name, command);
			table.addRow(command.data.name, "Loaded");
		}

		console.log(table.toString());
	}
}
