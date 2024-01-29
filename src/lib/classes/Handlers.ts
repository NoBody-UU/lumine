import { pathToFileURL } from "node:url";
import { searchFilesRecursive } from "taskwizard";
import { AsciiTable3 } from "ascii-table3";
import { InvalidCommand, InvalidComponent, InvalidEvent } from "#lumine/errors";

import { type ClientEvents, ApplicationCommandTypes, ComponentTypes } from "oceanic.js";

import type { LumineEvent, LumineCommand, LumineComponent } from "#lumine/builders";
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
			const event: LumineEvent<keyof ClientEvents> = await this.import(file);

			if (!event.name) throw new InvalidEvent("A event doesn't have a name.");
			if (!event.execute) throw new InvalidEvent("A event doesn't have a name.");

			const execute = (...args: []) => event.execute!(client, ...args);

			if (event.once) client.once(event.name, execute);
			else client.on(event.name, execute);

			table.addRow(event.name, "Loaded");
		}

		return console.log(table.toString());
	}

	public async loadCommands(): Promise<void> {
		const { client } = this;

		const files: string[] = await searchFilesRecursive("./build/commands");
		const table = new AsciiTable3("Commands");

		for await (const file of files) {
			const command: LumineCommand = await this.import(file);

			if (!command.data.name) throw new InvalidCommand("A command doesn't have a name.");
			if (command.data.type !== ApplicationCommandTypes.CHAT_INPUT)
				throw new InvalidCommand(`"${command.data.name}" have a invalid command type.`);
			if (!command.data.description)
				throw new InvalidCommand(`"${command.data.name}" doesn't have a description.`);
			if (!command.execute) throw new InvalidCommand(`"${command.data.name}" doesn't have a execute.`);

			if (command.options?.toGuild) client.arrays.guilds.push(command.data);
			else client.arrays.global.push(command.data);

			client.commands.set(command.data.name, command);
			table.addRow(command.data.name, "Loaded");
		}

		return console.log(table.toString());
	}

	public async loadComponents() {
		const { client } = this;

		const files: string[] = await searchFilesRecursive("./build/components");
		const table = new AsciiTable3("Components");

		for await (const file of files) {
			const component: LumineComponent<ComponentTypes> = await this.import(file);

			if (!component.data.customId) throw new InvalidComponent("A component doesn't have a customId.");
			if (!component.data.type)
				throw new InvalidComponent(`"${component.data.customId}" doesn't have a component type.`);

			if (component.data.type === ComponentTypes.ACTION_ROW)
				throw new InvalidComponent(`"${component.data.customId}" doesn't have a component type.`);

			if (!component.execute) throw new InvalidComponent(`"${component.data.customId}" doesn't have a execute.`);

			const rowTypes: Record<ComponentTypes, string | null> = {
				"1": null,
				"2": "buttons",
				"3": "menus",
				"4": "modals",
				"5": "menus",
				"6": "menus",
				"7": "menus",
				"8": "menus",
			};

			const rowType = rowTypes[component.data.type] as keyof typeof client.components;

			client.components[rowType]?.set(component.data.customId, component);
			table.addRow(component.data.customId, "Loaded", rowType);
		}

		return console.log(table.toString());
	}
}
