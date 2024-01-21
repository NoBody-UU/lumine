import type { CreateApplicationCommandOptions, CommandInteraction, AutocompleteInteraction } from "oceanic.js";
import type { Awaitable, CommandData, CommandOptions } from "#lumine/types";
import type { Lumine } from "#lumine/client";

export abstract class LumineCommand {
	readonly data: CreateApplicationCommandOptions;
	readonly options?: CommandOptions;

	constructor(command: CommandData) {
		const { data, options } = command;

		this.data = data;
		this.options = options;
	}

	public abstract autocomplete?(client: Lumine, interaction: AutocompleteInteraction): Awaitable<any>;
	public abstract execute(client: Lumine, interaction: CommandInteraction): Awaitable<any>;
}
