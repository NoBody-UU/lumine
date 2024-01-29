import type { Lumine } from "#lumine/client";
import {
	type CreateChatInputApplicationCommandOptions,
	ApplicationCommandTypes,
	type PermissionName,
	type CommandInteraction,
	type AutocompleteInteraction,
} from "oceanic.js";
import type { Awaitable } from "#lumine/types";

export interface CommandOptions {
	/** Send the command to the developer guild. */
	toGuild?: boolean;
	/** The user command permissions. */
	userPermissions?: PermissionName[];
	/** The bot command permissions. */
	botPermissions?: PermissionName[];
}

export interface CommandData {
	/** The command data. */
	data: Partial<CreateChatInputApplicationCommandOptions>;
	/** The command handler options. */
	options?: CommandOptions;
	/** The command execute. */
	execute?: CommandExecuteFn;
	autocomplete?: AutocompleteFn;
}

export type CommandExecuteFn = (client: Lumine, interaction: CommandInteraction) => Awaitable<any>;
export type AutocompleteFn = (client: Lumine, interaction: AutocompleteInteraction) => Awaitable<any>;
