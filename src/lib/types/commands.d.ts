import { type CreateApplicationCommandOptions, ApplicationCommandTypes, type PermissionName } from "oceanic.js";

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
	data: CreateApplicationCommandOptions;
	/** The command handler options. */
	options?: CommandOptions;
}
